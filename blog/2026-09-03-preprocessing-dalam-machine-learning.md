---
slug: preprocessing-dalam-machine-learning
title: "Preprocessing dalam Machine Learning: Panduan Lengkap dengan Python"
authors: topekox
tags: [manchine learning, data mining, ai, data science]
---

Model machine learning hanya sebaik data yang masuk ke dalamnya. Dalam praktik industri, sekitar 60 sampai 80 persen waktu proyek habis di tahap preprocessing, bukan di pemilihan algoritma. Artikel ini membahas setiap tahap preprocessing secara berurutan, dengan pola yang sama untuk tiap teknik: apa masalahnya, apa solusinya, bagaimana implementasinya, dan jebakan apa yang harus dihindari.

Semua contoh memakai Python dengan pandas, NumPy, dan scikit-learn versi 1.3 ke atas.

<!-- truncate -->

## Fondasi: Aturan Main Preprocessing

### Aturan Emas: Fit di Data Latih, Transform di Data Uji

#### Masalah

Kesalahan paling merusak dan paling sering terjadi adalah *data leakage*. Ketika rata-rata, standar deviasi, median, atau daftar kategori dihitung dari seluruh dataset sebelum pembagian data, informasi dari data uji ikut masuk ke proses pelatihan. Akibatnya skor validasi terlihat bagus, tetapi model gagal di dunia nyata.

#### Solusi

Semua parameter transformasi harus dipelajari hanya dari data latih (`fit`), lalu diterapkan ke data uji (`transform`). Cara paling aman memastikan hal ini adalah membungkus seluruh preprocessing dalam objek `Pipeline` scikit-learn, sehingga setiap fold validasi silang otomatis mempelajari ulang transformasinya.

#### Implementasi

```python
# SALAH: statistik dihitung dari seluruh data
scaler = StandardScaler()
X_all = scaler.fit_transform(X)              # kebocoran terjadi di sini
X_train, X_test = train_test_split(X_all)

# BENAR: split dulu, fit hanya di latih
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)    # belajar dari latih saja
X_test_s = scaler.transform(X_test)          # hanya menerapkan

# PALING BENAR: bungkus dalam Pipeline
pipe = Pipeline([("scaler", StandardScaler()), ("model", LogisticRegression())])
```

### Urutan Tahap yang Benar

Urutan berikut bukan sekadar konvensi, melainkan ketergantungan logis. Membalik urutannya menghasilkan hasil yang salah atau tidak stabil.

1. Audit data dan pemahaman struktur
2. Pembersihan (duplikat, tipe data, nilai tidak konsisten)
3. Pembagian data latih dan uji
4. Penanganan nilai hilang
5. Encoding kategorikal
6. Penskalaan numerik
7. Rekayasa fitur
8. Seleksi fitur
9. Penanganan ketidakseimbangan kelas (hanya pada data latih)

Perhatikan bahwa pembagian data terjadi di langkah ketiga, bukan terakhir. Langkah 4 sampai 9 semuanya mempelajari parameter dari data, sehingga harus berada setelah split.

### Kerangka Kode Dasar

```python
import numpy as np
import pandas as pd
from sklearn import set_config
from sklearn.compose import ColumnTransformer, make_column_selector
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import train_test_split, StratifiedKFold

set_config(transform_output="pandas")   # keluaran tetap DataFrame, memudahkan debug
RANDOM_STATE = 42

df = pd.read_csv("data.csv")
X = df.drop(columns=["target"])
y = df["target"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=RANDOM_STATE
)
```

Pengaturan `set_config(transform_output="pandas")` membuat setiap transformer mengembalikan DataFrame dengan nama kolom, bukan array NumPy tanpa identitas. Ini sangat membantu ketika harus melacak fitur mana yang bermasalah.

## Tahap 1: Audit dan Pemahaman Data Awal

### Inventarisasi Struktur Data

#### Masalah

Banyak proyek langsung melompat ke pemodelan tanpa mengetahui berapa banyak nilai hilang, apakah ada kolom konstan, atau apakah tipe data terbaca benar. Masalah yang tidak terlihat di awal akan muncul sebagai error atau performa buruk di akhir.

#### Solusi

Buat satu fungsi audit yang dijalankan sekali di awal dan menghasilkan ringkasan per kolom: tipe data, jumlah nilai unik, proporsi nilai hilang, dan contoh nilai.

#### Implementasi

```python
def audit(df: pd.DataFrame) -> pd.DataFrame:
    ringkasan = pd.DataFrame({
        "tipe": df.dtypes.astype(str),
        "n_unik": df.nunique(dropna=True),
        "n_hilang": df.isna().sum(),
        "pct_hilang": (df.isna().mean() * 100).round(2),
        "contoh": df.apply(lambda s: s.dropna().iloc[0] if s.notna().any() else None),
    })
    ringkasan["kardinalitas"] = np.where(
        ringkasan["n_unik"] == 1, "konstan",
        np.where(ringkasan["n_unik"] > 0.9 * len(df), "hampir-unik", "normal")
    )
    return ringkasan.sort_values("pct_hilang", ascending=False)

print(audit(X_train))
```

#### Cara Membaca Hasilnya

Kolom bertanda `konstan` tidak membawa informasi dan bisa dibuang. Kolom bertanda `hampir-unik` biasanya adalah ID atau timestamp mentah, yang jika dimasukkan ke model akan menyebabkan overfitting parah. Kolom dengan proporsi hilang di atas 60 persen perlu keputusan eksplisit, bukan diimputasi diam-diam.

### Deteksi Kebocoran Target

#### Masalah

Terkadang ada kolom yang berkorelasi hampir sempurna dengan target karena kolom itu sebenarnya dibuat *setelah* target diketahui. Contohnya kolom `tanggal_pelunasan` pada prediksi gagal bayar, atau `jumlah_penanganan_tiket` pada prediksi keluhan pelanggan. Model akan mencapai akurasi mendekati sempurna di validasi dan gagal total di produksi.

#### Solusi

Periksa korelasi setiap fitur dengan target di awal. Fitur tunggal yang mampu memprediksi target dengan akurasi mencurigakan tinggi harus diaudit asal-usulnya, bukan dirayakan.

#### Implementasi

```python
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import cross_val_score

for kolom in X_train.select_dtypes(include=np.number).columns:
    skor = cross_val_score(
        DecisionTreeClassifier(max_depth=3, random_state=RANDOM_STATE),
        X_train[[kolom]].fillna(-999), y_train,
        cv=3, scoring="roc_auc",
    ).mean()
    if skor > 0.95:
        print(f"CURIGA bocor: {kolom} -> AUC tunggal {skor:.4f}")
```

## Tahap 2: Pembersihan Data

### Duplikat

#### Masalah

Baris duplikat membuat model memberi bobot berlebih pada pola tertentu. Jika duplikat tersebar di data latih dan data uji, skor evaluasi menjadi terlalu optimistis karena model sebenarnya sudah pernah melihat baris uji itu.

#### Solusi

Bedakan duplikat penuh (semua kolom sama) dan duplikat kunci (identitas sama tetapi isi berbeda). Duplikat penuh biasanya aman dihapus. Duplikat kunci butuh keputusan bisnis: ambil yang terbaru, gabungkan, atau tandai sebagai anomali.

#### Implementasi

```python
print("Duplikat penuh:", df.duplicated().sum())
df = df.drop_duplicates()

# Duplikat berdasarkan kunci identitas, ambil catatan terbaru
df = (df.sort_values("tanggal_update")
        .drop_duplicates(subset=["id_pelanggan"], keep="last"))
```

Penghapusan duplikat harus dilakukan **sebelum** pembagian data, karena ini termasuk pembersihan struktural, bukan transformasi yang mempelajari parameter.

### Ketidakkonsistenan Nilai Kategorikal

#### Masalah

Kategori yang sebenarnya sama tertulis berbeda: `"Jakarta"`, `"jakarta"`, `"JAKARTA"`, `"Jakarta "`, `"DKI Jakarta"`. One-hot encoding akan memperlakukan semuanya sebagai kategori terpisah, memecah sinyal dan meledakkan dimensi.

#### Solusi

Normalisasi teks secara sistematis: pangkas spasi, seragamkan huruf, lalu petakan sinonim yang diketahui lewat kamus eksplisit. Jangan mengandalkan pencocokan fuzzy otomatis tanpa verifikasi, karena bisa menggabungkan kategori yang sebenarnya berbeda.

#### Implementasi

```python
def bersihkan_teks(s: pd.Series) -> pd.Series:
    return (s.astype("string")
             .str.strip()
             .str.lower()
             .str.replace(r"\s+", " ", regex=True))

kamus_kota = {
    "dki jakarta": "jakarta",
    "jkt": "jakarta",
    "bandung kota": "bandung",
}

df["kota"] = bersihkan_teks(df["kota"]).replace(kamus_kota)
print(df["kota"].value_counts(dropna=False).head(20))
```

### Tipe Data yang Salah Terbaca

#### Masalah

Kolom numerik terbaca sebagai teks karena ada pemisah ribuan, simbol mata uang, atau penanda nilai hilang berupa string seperti `"N/A"` atau `"-"`. Kolom tanggal terbaca sebagai objek. Kolom kategorikal berkode angka (misalnya `1=pria`, `2=wanita`) terbaca sebagai numerik dan diperlakukan seolah punya urutan.

#### Solusi

Konversi tipe secara eksplisit setelah membersihkan karakter pengganggu. Kolom kategorikal berkode angka harus dipaksa menjadi tipe kategorikal atau string.

#### Implementasi

```python
# Numerik yang terbaca sebagai teks
df["pendapatan"] = (df["pendapatan"].astype(str)
                    .str.replace(r"[^\d,.\-]", "", regex=True)
                    .str.replace(".", "", regex=False)
                    .str.replace(",", ".", regex=False))
df["pendapatan"] = pd.to_numeric(df["pendapatan"], errors="coerce")

# Tanggal
df["tanggal"] = pd.to_datetime(df["tanggal"], errors="coerce", format="mixed")

# Kategorikal berkode angka
df["kode_wilayah"] = df["kode_wilayah"].astype("category")

# Penanda nilai hilang yang tersamar
df = df.replace(["N/A", "n/a", "-", "", "NULL", "null", "?", -999], np.nan)
```

Parameter `errors="coerce"` mengubah nilai yang gagal dikonversi menjadi `NaN`, sehingga masalah menjadi terlihat sebagai nilai hilang alih-alih membuat proses berhenti.

### Outlier

#### Masalah

Outlier bisa berasal dari kesalahan input (usia 999 tahun), satuan yang tidak konsisten (tinggi dalam meter tercampur sentimeter), atau memang pengamatan ekstrem yang valid (transaksi besar dari nasabah korporat). Menghapus semuanya secara membabi buta akan membuang sinyal penting, terutama pada kasus deteksi penipuan dan deteksi anomali.

#### Solusi

Deteksi lebih dulu, klasifikasi asal-usulnya, baru tentukan tindakan. Ada empat pilihan tindakan: perbaiki jika jelas salah input, potong nilainya (winsorizing), transformasi distribusinya, atau biarkan dan gunakan model yang tahan outlier.

#### Implementasi

```python
def deteksi_outlier_iqr(s: pd.Series, k: float = 1.5):
    q1, q3 = s.quantile([0.25, 0.75])
    iqr = q3 - q1
    batas_bawah, batas_atas = q1 - k * iqr, q3 + k * iqr
    return (s < batas_bawah) | (s > batas_atas), batas_bawah, batas_atas

mask, bb, ba = deteksi_outlier_iqr(X_train["pendapatan"])
print(f"Outlier: {mask.sum()} ({mask.mean():.2%}), batas [{bb:.1f}, {ba:.1f}]")

# Winsorizing: potong ke persentil, batas dipelajari dari data latih saja
batas = X_train["pendapatan"].quantile([0.01, 0.99]).values
X_train["pendapatan"] = X_train["pendapatan"].clip(*batas)
X_test["pendapatan"] = X_test["pendapatan"].clip(*batas)   # pakai batas latih
```

#### Jebakan yang Sering Terjadi

Metode IQR mengasumsikan distribusi yang relatif simetris. Pada distribusi miring seperti pendapatan atau durasi sesi, metode ini akan menandai terlalu banyak nilai valid sebagai outlier. Untuk data miring, transformasi logaritma dulu baru deteksi, atau gunakan pendekatan berbasis kuantil murni.

## Tahap 3: Penanganan Nilai Hilang

### Diagnosis Mekanisme Kehilangan

#### Masalah

Strategi imputasi yang tepat bergantung pada *mengapa* nilai itu hilang. Mengisi semua nilai hilang dengan rata-rata tanpa memahami mekanismenya bisa menghapus sinyal atau menyuntikkan bias sistematis.

#### Tiga Mekanisme

**MCAR (Missing Completely At Random).** Kehilangan tidak berhubungan dengan apa pun, misalnya sensor mati acak. Imputasi sederhana aman.

**MAR (Missing At Random).** Kehilangan berhubungan dengan variabel lain yang teramati, misalnya pendapatan lebih sering kosong pada responden muda. Imputasi berbasis model yang memakai variabel lain lebih tepat.

**MNAR (Missing Not At Random).** Kehilangan berhubungan dengan nilai yang hilang itu sendiri, misalnya orang berpendapatan sangat tinggi menolak mengisi. Di sini, fakta bahwa nilainya hilang justru merupakan informasi dan harus dijadikan fitur tersendiri.

#### Cara Mendiagnosis

```python
# Apakah pola hilang berhubungan dengan target? (indikasi MNAR/MAR informatif)
for kolom in X_train.columns[X_train.isna().any()]:
    hilang = X_train[kolom].isna()
    print(f"{kolom:25s} target rate saat hilang={y_train[hilang].mean():.4f} "
          f"| saat ada={y_train[~hilang].mean():.4f}")
```

Jika tingkat target berbeda jauh antara baris yang hilang dan yang tidak, kehilangan itu informatif dan indikator biner harus dibuat.

### Solusi 1: Penghapusan

#### Kapan Dipakai

Hapus kolom jika proporsi hilangnya sangat tinggi (di atas 70 sampai 80 persen) dan tidak ada alasan domain untuk mempertahankannya. Hapus baris hanya jika proporsi baris yang terdampak sangat kecil (di bawah sekitar 5 persen) dan mekanismenya MCAR.

#### Risiko

Penghapusan baris pada mekanisme MAR atau MNAR menghasilkan sampel yang bias, karena yang terbuang bukan kelompok acak. Penghapusan baris juga tidak bisa dilakukan pada data uji atau data produksi, sehingga menciptakan ketidakcocokan antara pelatihan dan penerapan.

#### Implementasi

```python
# Buang kolom dengan kehilangan ekstrem
ambang = 0.7
kolom_buang = X_train.columns[X_train.isna().mean() > ambang]
X_train = X_train.drop(columns=kolom_buang)
X_test = X_test.drop(columns=kolom_buang)   # daftar kolom dari data latih
```

### Solusi 2: Imputasi Statistik Sederhana

#### Kapan Dipakai

Baseline default untuk sebagian besar kasus. Median untuk numerik karena tahan outlier, modus untuk kategorikal, dan konstanta khusus ketika kehilangan punya makna tersendiri.

#### Risiko

Imputasi rata-rata atau median mengecilkan varians dan melemahkan korelasi antar variabel. Pada proporsi hilang di atas sekitar 20 persen, distorsi ini menjadi signifikan.

#### Implementasi

```python
from sklearn.impute import SimpleImputer

imputer_num = SimpleImputer(strategy="median", add_indicator=True)
imputer_cat = SimpleImputer(strategy="most_frequent")
imputer_konstan = SimpleImputer(strategy="constant", fill_value="tidak_diketahui")
```

Parameter `add_indicator=True` menambahkan kolom biner yang menandai baris mana yang diimputasi. Ini cara termurah mempertahankan informasi MNAR dan sering menaikkan performa model secara nyata.

### Solusi 3: Imputasi Berbasis Model

#### Kapan Dipakai

Ketika mekanismenya MAR dan hubungan antar fitur cukup kuat sehingga nilai yang hilang bisa diprediksi dari fitur lain. `KNNImputer` mencari baris paling mirip; `IterativeImputer` memodelkan tiap kolom sebagai fungsi dari kolom lain secara bergantian.

#### Risiko

Jauh lebih lambat, terutama `KNNImputer` yang harus menghitung jarak antar seluruh baris. Keduanya juga bisa memperkenalkan korelasi palsu antar fitur yang sebenarnya independen.

#### Implementasi

```python
from sklearn.experimental import enable_iterative_imputer   # wajib diimpor lebih dulu
from sklearn.impute import IterativeImputer, KNNImputer
from sklearn.ensemble import HistGradientBoostingRegressor

knn_imp = KNNImputer(n_neighbors=5, weights="distance")

iter_imp = IterativeImputer(
    estimator=HistGradientBoostingRegressor(random_state=RANDOM_STATE),
    max_iter=10,
    random_state=RANDOM_STATE,
)
```

`KNNImputer` membutuhkan fitur yang sudah diskalakan, karena berbasis jarak. Urutannya: skalakan dulu, baru imputasi.

### Solusi 4: Membiarkan Model Menanganinya

#### Kapan Dipakai

`HistGradientBoostingClassifier` dan `HistGradientBoostingRegressor` menangani `NaN` secara native dengan mempelajari ke arah mana baris bernilai hilang harus dialirkan di tiap pemisahan. Ini sering lebih baik daripada imputasi manual, karena keputusannya dioptimalkan terhadap target.

#### Implementasi

```python
from sklearn.ensemble import HistGradientBoostingClassifier

model = HistGradientBoostingClassifier(random_state=RANDOM_STATE)
model.fit(X_train_numerik, y_train)   # NaN dibiarkan apa adanya
```

## Tahap 4: Encoding Variabel Kategorikal

### One-Hot Encoding

#### Masalah yang Diselesaikan

Sebagian besar algoritma hanya menerima angka. Kategori nominal seperti warna atau kota tidak punya urutan, sehingga tidak boleh diberi kode angka berurutan yang menyiratkan `merah < biru < hijau`.

#### Solusi

Buat satu kolom biner untuk tiap kategori. Model kemudian memperlakukan setiap kategori secara independen.

#### Implementasi

```python
from sklearn.preprocessing import OneHotEncoder

ohe = OneHotEncoder(
    handle_unknown="infrequent_if_exist",   # kategori baru masuk ke kelompok jarang
    min_frequency=0.01,                      # kategori <1% digabung jadi "infrequent"
    sparse_output=False,
    drop=None,                               # gunakan "first" untuk model linear
)
```

#### Jebakan

Pada model linear dengan intercept, one-hot penuh menimbulkan kolinearitas sempurna. Gunakan `drop="first"` untuk model linear, tetapi jangan gunakan pada model berbasis pohon karena justru mengurangi kualitas pemisahan.

### Ordinal Encoding

#### Kapan Dipakai

Hanya untuk kategori yang benar-benar punya urutan bermakna, misalnya tingkat pendidikan, ukuran baju, atau skala kepuasan. Urutannya harus ditentukan manual, bukan diserahkan pada urutan abjad.

#### Implementasi

```python
from sklearn.preprocessing import OrdinalEncoder

urutan_pendidikan = ["sd", "smp", "sma", "d3", "s1", "s2", "s3"]

ord_enc = OrdinalEncoder(
    categories=[urutan_pendidikan],
    handle_unknown="use_encoded_value",
    unknown_value=-1,
)
```

Untuk model berbasis pohon, ordinal encoding juga bisa dipakai pada kategori nominal berkardinalitas tinggi. Pohon mampu memisahkan kategori dengan beberapa pemisahan berurutan, sehingga urutan yang arbitrer tidak fatal seperti pada model linear.

### Target Encoding

#### Masalah yang Diselesaikan

Kategori berkardinalitas tinggi seperti kode pos, ID produk, atau nama kecamatan menghasilkan ribuan kolom jika di-one-hot. Dimensinya meledak dan sebagian besar kolom nyaris selalu bernilai nol.

#### Solusi

Ganti tiap kategori dengan rata-rata target pada kategori tersebut, dihaluskan terhadap rata-rata global agar kategori langka tidak menghasilkan estimasi ekstrem.

#### Risiko Utama

Ini teknik yang paling rawan menyebabkan kebocoran, karena menggunakan nilai target. Implementasi naif akan membuat model menghafal target lewat encoding. `TargetEncoder` scikit-learn memakai skema validasi silang internal untuk mencegah hal ini.

#### Implementasi

```python
from sklearn.preprocessing import TargetEncoder

te = TargetEncoder(
    target_type="binary",
    smooth="auto",       # penghalusan otomatis berdasarkan ukuran kategori
    cv=5,                # cross-fitting internal untuk mencegah kebocoran
    random_state=RANDOM_STATE,
)
```

Target encoding harus berada di dalam `Pipeline` dan divalidasi lewat validasi silang. Menghitungnya manual di luar pipeline hampir selalu menghasilkan skor yang menyesatkan.

### Menangani Kategori Tak Dikenal di Produksi

#### Masalah

Kategori yang muncul di data produksi tetapi tidak pernah ada di data latih akan menyebabkan error atau perilaku tak terduga.

#### Solusi

Setiap encoder harus dikonfigurasi eksplisit untuk kasus ini. `OneHotEncoder` dengan `handle_unknown="ignore"` menghasilkan baris nol semua; dengan `"infrequent_if_exist"` kategori baru dipetakan ke kelompok jarang, yang biasanya lebih baik. `OrdinalEncoder` memakai `unknown_value`.

#### Implementasi

```python
# Uji ketahanan pipeline terhadap kategori baru
X_baru = X_test.copy()
X_baru.loc[X_baru.index[0], "kota"] = "kota_yang_belum_pernah_ada"
pipe.predict(X_baru)   # harus berjalan tanpa error
```

## Tahap 5: Penskalaan dan Transformasi Numerik

### Mengapa Skala Penting

#### Masalah

Fitur `pendapatan` dalam jutaan dan fitur `usia` dalam puluhan berada pada skala yang berbeda ribuan kali. Algoritma berbasis jarak (KNN, K-Means, SVM) akan didominasi oleh fitur berskala besar. Algoritma berbasis gradien (regresi logistik, MLP) akan konvergen sangat lambat. Regularisasi L1 dan L2 juga menghukum fitur secara tidak adil jika skalanya berbeda.

#### Kapan Scaling Tidak Diperlukan

Model berbasis pohon (Decision Tree, Random Forest, Gradient Boosting) sama sekali tidak terpengaruh transformasi monoton, karena hanya membandingkan nilai terhadap ambang. Menskalakan data untuk model ini hanya membuang waktu komputasi tanpa manfaat.

### StandardScaler

#### Cara Kerja

Mengurangi rata-rata lalu membagi standar deviasi, menghasilkan distribusi dengan rata-rata nol dan standar deviasi satu.

#### Kapan Dipakai

Default untuk sebagian besar kasus, terutama ketika distribusi mendekati normal dan algoritma yang dipakai mengasumsikan data terpusat, seperti PCA, regresi logistik, dan SVM.

#### Batasan

Sangat sensitif terhadap outlier, karena rata-rata dan standar deviasi keduanya terpengaruh nilai ekstrem.

### MinMaxScaler

#### Cara Kerja

Memetakan nilai ke rentang tetap, biasanya 0 sampai 1.

#### Kapan Dipakai

Ketika algoritma menuntut rentang terbatas, misalnya jaringan saraf dengan aktivasi sigmoid, atau ketika data akan dipakai untuk pemrosesan citra.

#### Batasan

Nilai di luar rentang data latih akan keluar dari batas 0 sampai 1 di data uji. Satu outlier ekstrem memampatkan seluruh nilai lain ke wilayah sempit.

### RobustScaler

#### Cara Kerja

Menggunakan median dan rentang interkuartil alih-alih rata-rata dan standar deviasi.

#### Kapan Dipakai

Ketika data mengandung outlier yang tidak ingin dihapus tetapi tidak boleh mendominasi penskalaan. Ini pilihan yang lebih aman daripada `StandardScaler` pada data keuangan dan data sensor.

#### Perbandingan Implementasi

```python
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

kandidat = {
    "standard": StandardScaler(),
    "minmax": MinMaxScaler(feature_range=(0, 1)),
    "robust": RobustScaler(quantile_range=(25.0, 75.0)),
}

for nama, sc in kandidat.items():
    hasil = sc.fit_transform(X_train[["pendapatan"]])
    print(f"{nama:9s} mean={hasil.mean():7.3f} std={hasil.std():6.3f} "
          f"min={hasil.min():8.3f} max={hasil.max():8.3f}")
```

### Transformasi Distribusi

#### Masalah

Fitur dengan distribusi sangat miring, seperti pendapatan, durasi, atau jumlah transaksi, melanggar asumsi normalitas pada model linear dan membuat sebagian besar nilai menumpuk di satu sisi.

#### Solusi

Transformasi logaritma untuk data positif dengan kemiringan kanan, Box-Cox untuk data positif secara umum, Yeo-Johnson jika ada nilai nol atau negatif, dan `QuantileTransformer` sebagai opsi paling agresif yang memaksa distribusi apa pun menjadi normal atau seragam.

#### Implementasi

```python
from sklearn.preprocessing import PowerTransformer, QuantileTransformer

# Log sederhana, aman untuk nilai nol
X_train["log_pendapatan"] = np.log1p(X_train["pendapatan"])

# Yeo-Johnson: menerima nilai negatif, lambda dipelajari dari data
pt = PowerTransformer(method="yeo-johnson", standardize=True)

# Quantile: memaksa jadi normal, sangat efektif tapi menghancurkan interpretasi
qt = QuantileTransformer(
    output_distribution="normal",
    n_quantiles=min(1000, len(X_train)),
    random_state=RANDOM_STATE,
)

print("Skewness sebelum:", X_train["pendapatan"].skew().round(3))
print("Skewness sesudah:", np.log1p(X_train["pendapatan"]).skew().round(3))
```

#### Jebakan

`QuantileTransformer` memetakan berdasarkan peringkat, sehingga hubungan jarak asli hilang sepenuhnya dan interpretasi koefisien menjadi tidak mungkin. Gunakan hanya ketika performa prediktif lebih penting daripada interpretasi.

## Tahap 6: Rekayasa Fitur

### Fitur Interaksi dan Polinomial

#### Masalah yang Diselesaikan

Model linear tidak bisa menangkap efek interaksi. Jika pengaruh pendapatan terhadap target berbeda tergantung usia, model linear murni tidak akan menemukannya.

#### Solusi

Buat fitur perkalian atau pangkat secara eksplisit. Untuk model berbasis pohon, langkah ini biasanya tidak perlu karena interaksi ditemukan sendiri lewat pemisahan bertingkat.

#### Implementasi

```python
from sklearn.preprocessing import PolynomialFeatures

poly = PolynomialFeatures(degree=2, interaction_only=True, include_bias=False)

# Rasio dan selisih berbasis domain sering lebih berguna daripada polinomial buta
X_train["rasio_utang_pendapatan"] = X_train["utang"] / (X_train["pendapatan"] + 1)
X_train["selisih_saldo"] = X_train["saldo_akhir"] - X_train["saldo_awal"]
```

Jumlah fitur polinomial tumbuh sangat cepat. Dengan 50 fitur dan derajat 2, hasilnya lebih dari 1.200 kolom. Batasi dengan `interaction_only=True` atau pilih pasangan fitur berdasarkan pengetahuan domain.

### Diskretisasi (Binning)

#### Masalah yang Diselesaikan

Hubungan antara fitur dan target kadang tidak monoton. Misalnya risiko kredit tinggi pada usia sangat muda dan sangat tua, tetapi rendah di tengah. Model linear tidak bisa menangkap bentuk U seperti ini.

#### Solusi

Ubah fitur kontinu menjadi beberapa kelompok, lalu perlakukan sebagai kategorikal.

#### Implementasi

```python
from sklearn.preprocessing import KBinsDiscretizer

binner = KBinsDiscretizer(
    n_bins=5,
    encode="onehot-dense",
    strategy="quantile",     # tiap bin berisi jumlah sampel yang setara
    subsample=None,
)

# Binning manual berbasis domain sering lebih baik
X_train["kel_usia"] = pd.cut(
    X_train["usia"],
    bins=[0, 25, 35, 50, 65, 120],
    labels=["<25", "25-34", "35-49", "50-64", "65+"],
)
```

Binning membuang informasi di dalam tiap kelompok. Pada model berbasis pohon, teknik ini hampir selalu merugikan karena pohon sudah melakukan binning secara adaptif.

### Fitur Tanggal dan Waktu

#### Masalah

Timestamp mentah tidak berguna bagi model. Nilainya hampir unik untuk setiap baris, sehingga model akan menghafal alih-alih belajar pola.

#### Solusi

Uraikan menjadi komponen bermakna, dan encode komponen siklis (jam, bulan, hari) dengan sinus dan kosinus agar jarak antara jam 23 dan jam 0 dikenali sebagai dekat.

#### Implementasi

```python
def fitur_waktu(df: pd.DataFrame, kolom: str) -> pd.DataFrame:
    t = pd.to_datetime(df[kolom])
    out = pd.DataFrame(index=df.index)
    out["tahun"] = t.dt.year
    out["bulan"] = t.dt.month
    out["hari_dalam_minggu"] = t.dt.dayofweek
    out["jam"] = t.dt.hour
    out["akhir_pekan"] = (t.dt.dayofweek >= 5).astype(int)

    # Encoding siklis
    out["jam_sin"] = np.sin(2 * np.pi * out["jam"] / 24)
    out["jam_cos"] = np.cos(2 * np.pi * out["jam"] / 24)
    out["bulan_sin"] = np.sin(2 * np.pi * out["bulan"] / 12)
    out["bulan_cos"] = np.cos(2 * np.pi * out["bulan"] / 12)

    # Jarak waktu terhadap titik acuan
    out["umur_hari"] = (pd.Timestamp("2026-01-01") - t).dt.days
    return out
```

### Fitur Agregasi

#### Kapan Dipakai

Ketika satu entitas punya banyak baris riwayat, misalnya satu pelanggan dengan banyak transaksi. Model butuh ringkasan per entitas, bukan baris mentah.

#### Jebakan Kebocoran Temporal

Agregasi harus dihitung hanya dari periode sebelum titik prediksi. Menghitung rata-rata transaksi seorang pelanggan menggunakan seluruh riwayat, termasuk masa depan relatif terhadap label, adalah bentuk kebocoran yang sangat sering terlewat.

#### Implementasi

```python
agg = (transaksi[transaksi["tanggal"] < tanggal_potong]
       .groupby("id_pelanggan")
       .agg(
           total_transaksi=("nominal", "sum"),
           rata_transaksi=("nominal", "mean"),
           std_transaksi=("nominal", "std"),
           jumlah_transaksi=("nominal", "count"),
           nominal_maks=("nominal", "max"),
           hari_terakhir=("tanggal", "max"),
       )
       .reset_index())

X = X.merge(agg, on="id_pelanggan", how="left")
```

## Tahap 7: Seleksi Fitur

### Menghapus Fitur Tanpa Informasi

#### Masalah

Kolom konstan, kolom hampir konstan, dan kolom identitas menambah dimensi tanpa menambah sinyal, memperlambat pelatihan dan meningkatkan risiko overfitting.

#### Implementasi

```python
from sklearn.feature_selection import VarianceThreshold

vt = VarianceThreshold(threshold=0.0)   # buang kolom yang benar-benar konstan

# Fitur yang saling berkorelasi sangat tinggi
korelasi = X_train.select_dtypes(include=np.number).corr().abs()
segitiga_atas = korelasi.where(np.triu(np.ones(korelasi.shape), k=1).astype(bool))
redundan = [k for k in segitiga_atas.columns if any(segitiga_atas[k] > 0.95)]
print("Fitur redundan:", redundan)
```

### Metode Filter

#### Cara Kerja

Menilai tiap fitur secara independen terhadap target menggunakan uji statistik, tanpa melibatkan model.

#### Kapan Dipakai

Sebagai penyaring cepat pada data berdimensi sangat tinggi, sebelum metode yang lebih mahal.

#### Batasan

Karena menilai fitur satu per satu, metode ini melewatkan fitur yang hanya berguna dalam kombinasi dengan fitur lain.

#### Implementasi

```python
from sklearn.feature_selection import SelectKBest, mutual_info_classif, f_classif

# Mutual information menangkap hubungan non-linear, f_classif hanya linear
selector = SelectKBest(score_func=mutual_info_classif, k=30)
```

### Metode Embedded

#### Cara Kerja

Seleksi terjadi sebagai bagian dari pelatihan model, misalnya lewat penalti L1 yang mengenolkan koefisien, atau lewat ukuran kepentingan pada model pohon.

#### Kapan Dipakai

Pilihan paling praktis untuk sebagian besar kasus, karena mempertimbangkan interaksi antar fitur dan tidak memerlukan iterasi eksternal yang mahal.

#### Implementasi

```python
from sklearn.feature_selection import SelectFromModel
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

sfm_l1 = SelectFromModel(
    LogisticRegression(penalty="l1", solver="saga", C=0.1, max_iter=5000),
    threshold="median",
)

sfm_rf = SelectFromModel(
    RandomForestClassifier(n_estimators=300, random_state=RANDOM_STATE),
    threshold="1.25*mean",
)
```

### Metode Wrapper

#### Cara Kerja

Melatih model berulang kali dengan subset fitur berbeda dan memilih subset terbaik. `RFECV` menghapus fitur paling lemah satu per satu sambil mengukur performa lewat validasi silang.

#### Batasan

Sangat mahal secara komputasi. Untuk 100 fitur dengan validasi silang 5-fold, jumlah pelatihan model mencapai ratusan kali.

#### Implementasi

```python
from sklearn.feature_selection import RFECV

rfecv = RFECV(
    estimator=RandomForestClassifier(n_estimators=200, random_state=RANDOM_STATE),
    step=0.1,                 # buang 10% fitur tiap iterasi agar lebih cepat
    cv=StratifiedKFold(5),
    scoring="f1_macro",
    n_jobs=-1,
)
```

## Tahap 8: Penanganan Ketidakseimbangan Kelas

### Memahami Masalahnya

#### Masalah

Pada dataset dengan 1 persen kelas positif, model yang selalu memprediksi negatif mencapai akurasi 99 persen dan sama sekali tidak berguna. Fungsi kerugian standar memperlakukan semua kesalahan setara, padahal biaya melewatkan kasus positif sering jauh lebih besar.

#### Prasyarat Sebelum Memilih Solusi

Tentukan metrik yang benar lebih dulu. Untuk kelas langka, gunakan recall, F1, atau PR-AUC (`average_precision_score`), bukan akurasi. ROC-AUC bisa terlihat tinggi meski precision-nya buruk, karena mayoritas negatif yang besar membuat false positive rate tetap kecil.

### Solusi 1: Pembobotan Kelas

#### Kapan Dipakai

Ini pilihan pertama yang harus dicoba. Tidak menambah data, tidak menambah waktu pelatihan, dan tidak mengubah distribusi asli.

#### Implementasi

```python
from sklearn.utils.class_weight import compute_class_weight

bobot = compute_class_weight("balanced", classes=np.unique(y_train), y=y_train)
print(dict(zip(np.unique(y_train), bobot.round(3))))

model = LogisticRegression(class_weight="balanced", max_iter=2000)
# Tersedia juga pada DecisionTree, RandomForest, SVC, dan HistGradientBoosting
```

### Solusi 2: Oversampling dengan SMOTE

#### Cara Kerja

SMOTE membuat sampel sintetis kelas minoritas dengan interpolasi antara sampel minoritas dan tetangga terdekatnya, bukan sekadar menduplikasi.

#### Jebakan Kritis

Resampling **hanya boleh dilakukan pada data latih**, dan harus berada di dalam pipeline validasi silang. Melakukan SMOTE sebelum split membuat sampel sintetis dari data latih bocor ke data uji, menghasilkan skor yang sangat menyesatkan.

#### Implementasi

```python
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline as ImbPipeline

pipe_smote = ImbPipeline([
    ("prep", preprocessor),
    ("smote", SMOTE(k_neighbors=5, random_state=RANDOM_STATE)),  # aktif saat fit saja
    ("model", RandomForestClassifier(random_state=RANDOM_STATE)),
])
```

`ImbPipeline` dari imbalanced-learn otomatis menonaktifkan langkah resampling saat `transform` dan `predict`, sehingga data uji tidak pernah ikut di-resample.

### Solusi 3: Penyesuaian Ambang Keputusan

#### Cara Kerja

Alih-alih mengubah data, ubah ambang probabilitas yang memisahkan kelas. Ambang bawaan 0,5 jarang optimal pada data tidak seimbang.

#### Kapan Dipakai

Hampir selalu layak dicoba, karena murah dan tidak mengubah model sama sekali. Ambang dipilih berdasarkan trade-off precision dan recall yang sesuai biaya bisnis.

#### Implementasi

```python
from sklearn.metrics import precision_recall_curve

proba = model.predict_proba(X_valid)[:, 1]
precision, recall, ambang = precision_recall_curve(y_valid, proba)

# Contoh: cari ambang terkecil yang masih menjamin recall minimal 0,90
target_recall = 0.90
layak = np.where(recall[:-1] >= target_recall)[0]
ambang_pilih = ambang[layak[-1]]
print(f"Ambang={ambang_pilih:.4f} recall={recall[layak[-1]]:.4f} "
      f"precision={precision[layak[-1]]:.4f}")

prediksi = (model.predict_proba(X_test)[:, 1] >= ambang_pilih).astype(int)
```

Ambang harus dipilih dari data validasi terpisah, bukan dari data uji akhir.

## Tahap 9: Pembagian Data yang Benar

### Pembagian Acak Berstrata

#### Kapan Dipakai

Data independen tanpa struktur waktu atau pengelompokan. Stratifikasi menjaga proporsi kelas tetap sama di setiap bagian, yang penting terutama pada data tidak seimbang.

#### Implementasi

```python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=RANDOM_STATE
)
```

### Pembagian Berbasis Waktu

#### Masalah

Pada data deret waktu, pembagian acak membuat model belajar dari masa depan untuk memprediksi masa lalu. Skor validasi menjadi jauh lebih baik daripada performa nyata.

#### Solusi

Bagi berdasarkan urutan waktu, dan gunakan `TimeSeriesSplit` untuk validasi silang yang menghormati urutan.

#### Implementasi

```python
from sklearn.model_selection import TimeSeriesSplit

df = df.sort_values("tanggal")
potong = int(len(df) * 0.8)
train, test = df.iloc[:potong], df.iloc[potong:]

tscv = TimeSeriesSplit(n_splits=5, gap=30)   # gap mencegah kebocoran antar fold
```

### Pembagian Berbasis Kelompok

#### Masalah

Jika satu pasien punya beberapa kunjungan atau satu pengguna punya beberapa sesi, pembagian acak menempatkan baris dari entitas yang sama di data latih dan data uji. Model menghafal identitas entitas, bukan pola umum.

#### Solusi

Pastikan seluruh baris dari satu entitas berada di satu sisi saja.

#### Implementasi

```python
from sklearn.model_selection import GroupKFold, StratifiedGroupKFold

sgkf = StratifiedGroupKFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)
for i_train, i_valid in sgkf.split(X, y, groups=df["id_pasien"]):
    ...
```

## Menyatukan Semuanya dalam Pipeline Produksi

### Menyusun ColumnTransformer Lengkap

```python
from sklearn.compose import ColumnTransformer, make_column_selector
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler, PowerTransformer

alur_numerik = Pipeline([
    ("imputer", SimpleImputer(strategy="median", add_indicator=True)),
    ("power", PowerTransformer(method="yeo-johnson", standardize=False)),
    ("scaler", StandardScaler()),
])

alur_kategorik = Pipeline([
    ("imputer", SimpleImputer(strategy="constant", fill_value="tidak_diketahui")),
    ("ohe", OneHotEncoder(handle_unknown="infrequent_if_exist",
                          min_frequency=0.01, sparse_output=False)),
])

preprocessor = ColumnTransformer(
    transformers=[
        ("num", alur_numerik, make_column_selector(dtype_include=np.number)),
        ("cat", alur_kategorik, make_column_selector(dtype_include=object)),
    ],
    remainder="drop",
    verbose_feature_names_out=True,
)

pipe = Pipeline([
    ("prep", preprocessor),
    ("model", LogisticRegression(class_weight="balanced", max_iter=2000)),
])
```

### Memvalidasi Pipeline

```python
from sklearn.model_selection import cross_validate

skor = cross_validate(
    pipe, X_train, y_train,
    cv=StratifiedKFold(5, shuffle=True, random_state=RANDOM_STATE),
    scoring=["recall", "precision", "f1_macro", "average_precision"],
    return_train_score=True,
    n_jobs=-1,
)

for k in ["test_recall", "test_f1_macro", "test_average_precision"]:
    print(f"{k:25s} {skor[k].mean():.4f} +/- {skor[k].std():.4f}")
```

Selisih besar antara `train_score` dan `test_score` menandakan overfitting. Selisih yang sama-sama rendah menandakan underfitting atau fitur yang kurang informatif.

### Memeriksa Nama Fitur Keluaran

```python
pipe.fit(X_train, y_train)
nama = pipe.named_steps["prep"].get_feature_names_out()
print(f"Jumlah fitur setelah preprocessing: {len(nama)}")
print(nama[:20])
```

Ledakan jumlah fitur setelah encoding adalah tanda bahaya. Jika 30 kolom asli menjadi 4.000 kolom, kemungkinan besar ada kolom berkardinalitas tinggi yang salah di-one-hot.

### Menyimpan dan Memuat Pipeline

```python
import joblib

joblib.dump(pipe, "pipeline_produksi.joblib")
pipe_dimuat = joblib.load("pipeline_produksi.joblib")
prediksi = pipe_dimuat.predict(data_baru)   # preprocessing ikut tersimpan
```

Menyimpan model tanpa preprocessing adalah sumber bug produksi yang sangat umum. Simpan seluruh pipeline sebagai satu objek agar transformasi di produksi identik dengan saat pelatihan. Catat juga versi library yang dipakai, karena objek yang di-pickle tidak selalu kompatibel antar versi scikit-learn.

## Katalog Masalah dan Solusi

| Masalah | Gejala | Solusi |
|---|---|---|
| Data leakage | Skor validasi tinggi, produksi buruk | Split lebih dulu, bungkus semua transformasi dalam `Pipeline` |
| Nilai hilang | Error saat fit, atau bias hasil | `SimpleImputer` + `add_indicator`, atau `HistGradientBoosting` |
| Nilai hilang tersamar | `-999`, `"N/A"`, `"-"` terbaca sebagai nilai valid | `replace()` ke `np.nan` di tahap pembersihan |
| Outlier ekstrem | Scaler terdistorsi, model tidak stabil | `RobustScaler`, winsorizing, atau transformasi log |
| Distribusi miring | Model linear underfit | `np.log1p`, `PowerTransformer`, `QuantileTransformer` |
| Skala fitur berbeda jauh | KNN/SVM buruk, gradien lambat konvergen | `StandardScaler` atau `RobustScaler` |
| Kardinalitas kategorikal tinggi | Dimensi meledak setelah one-hot | `min_frequency`, `TargetEncoder`, atau ordinal untuk model pohon |
| Kategori baru di produksi | Error saat inferensi | `handle_unknown="infrequent_if_exist"` atau `unknown_value` |
| Kelas tidak seimbang | Recall kelas minoritas mendekati nol | `class_weight="balanced"`, SMOTE dalam `ImbPipeline`, tuning ambang |
| Fitur redundan | Koefisien tidak stabil, pelatihan lambat | Hapus korelasi > 0,95, `VarianceThreshold`, `SelectFromModel` |
| Kebocoran temporal | Skor sempurna yang tidak masuk akal | `TimeSeriesSplit`, agregasi hanya dari periode sebelum label |
| Kebocoran antar entitas | Model menghafal identitas | `GroupKFold` atau `StratifiedGroupKFold` |
| Timestamp mentah jadi fitur | Overfitting parah | Uraikan menjadi komponen, encode siklis dengan sin/cos |
| Pipeline tidak tersimpan utuh | Prediksi produksi berbeda dari pelatihan | `joblib.dump` seluruh `Pipeline`, catat versi library |

## Kesalahan Umum yang Merusak Model

### Melakukan Preprocessing Sebelum Split

Ini penyebab nomor satu skor validasi yang menyesatkan. Bahkan `StandardScaler` sederhana pun membocorkan informasi jika di-fit pada seluruh data.

### Menerapkan SMOTE pada Data Uji

Data uji harus mencerminkan distribusi dunia nyata. Menyeimbangkannya membuat metrik kehilangan makna, karena proporsi kelas di produksi tidak akan seimbang.

### Menghapus Semua Outlier Tanpa Analisis

Pada deteksi penipuan dan deteksi anomali, outlier justru merupakan target yang ingin ditemukan. Menghapusnya sama saja dengan menghapus kelas positif.

### Mengimputasi Sebelum Memahami Mekanismenya

Fakta bahwa suatu nilai hilang sering merupakan sinyal kuat. Mengisinya dengan median tanpa menambahkan indikator akan menghapus informasi itu secara permanen.

### One-Hot Encoding pada Kardinalitas Sangat Tinggi

Kolom dengan 10.000 nilai unik menghasilkan 10.000 kolom yang hampir seluruhnya nol. Gunakan `min_frequency`, target encoding, atau pertimbangkan apakah kolom itu memang layak dipakai.

### Menyeleksi Fitur di Luar Validasi Silang

Jika seleksi fitur dilakukan sekali pada seluruh data latih lalu validasi silang dijalankan, informasi target dari semua fold sudah masuk ke pilihan fitur. Seleksi fitur harus menjadi salah satu langkah di dalam `Pipeline`.

### Mengabaikan Reproduktibilitas

Tanpa `random_state` yang tetap, hasil tidak bisa diulang dan perbandingan antar eksperimen menjadi tidak valid. Tetapkan seed pada split, model, dan setiap komponen yang mengandung keacakan.

## Penutup

Preprocessing bukan tahap persiapan yang bisa diselesaikan sambil lalu. Sebagian besar perbedaan performa antara model yang berhasil dan yang gagal berasal dari kualitas keputusan di tahap ini, bukan dari algoritma yang dipilih di akhir.

Tiga prinsip yang paling menentukan hasil: pastikan setiap transformasi dipelajari hanya dari data latih, pahami penyebab masalah sebelum memilih solusinya, dan bungkus seluruh proses dalam satu `Pipeline` yang bisa disimpan dan dijalankan ulang secara identik di produksi. Preprocessing yang benar membuat model sederhana bekerja baik; preprocessing yang salah membuat model paling canggih sekalipun menghasilkan angka yang tidak bisa dipercaya.