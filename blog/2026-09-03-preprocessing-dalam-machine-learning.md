---
slug: preprocessing-dalam-machine-learning
title: "Preprocessing dalam Machine Learning: Panduan Lengkap dengan Python"
authors: topekox
tags: [manchine learning, data mining, ai, data science]
---

Banyak pemula mengira pekerjaan utama dalam machine learning adalah memilih algoritma yang tepat. Kenyataannya, sebagian besar waktu justru habis untuk membereskan data sebelum algoritma apa pun dijalankan. Proses membereskan itulah yang disebut **preprocessing**.
 
Artikel ini membahas setiap tahap preprocessing secara berurutan dengan bahasa sederhana. Tiap teknik dijelaskan dengan pola yang sama: apa masalahnya, kenapa itu jadi masalah, bagaimana solusinya, dan contoh kodenya.
 
Kita akan memakai satu dataset contoh yang sengaja dibuat berantakan, dan membereskannya bersama-sama dari awal sampai akhir.

<!-- truncate -->

## Apa Itu Preprocessing dan Kenapa Penting
 
### Analogi Sederhana
 
Bayangkan Anda mau memasak. Bahan yang baru dibeli dari pasar tidak bisa langsung dimasukkan ke wajan. Sayur harus dicuci, wortel harus dikupas, daging harus dipotong seukuran yang pas, dan bahan busuk harus dibuang.
 
Preprocessing adalah tahap persiapan bahan itu. Sehebat apa pun kokinya, kalau bahannya kotor dan busuk, masakannya tetap tidak enak.
 
Data mentah dari dunia nyata hampir selalu berantakan: ada yang kosong, ada yang salah ketik, ada satuan yang tidak konsisten, ada angka yang mustahil seperti umur 999 tahun. Model machine learning tidak bisa membereskan itu sendiri.
 
### Apa yang Terjadi Kalau Dilewati
 
Kalau preprocessing dilewati atau dikerjakan asal-asalan, tiga hal biasanya terjadi:
 
**Program berhenti dengan error.** Banyak algoritma langsung menolak data yang mengandung sel kosong atau berisi teks.
 
**Model jadi tidak akurat.** Kolom dengan angka besar akan mendominasi perhitungan, dan pola yang sebenarnya jadi tertutup.
 
**Hasilnya terlihat bagus padahal palsu.** Ini yang paling berbahaya, karena Anda tidak menyadarinya. Skor di layar tinggi, tapi begitu dipakai di dunia nyata modelnya gagal total.
 
## Istilah Dasar yang Perlu Dipahami
 
Sebelum lanjut, mari samakan dulu pemahaman beberapa istilah yang akan sering muncul.
 
### Baris, Kolom, Fitur, dan Label
 
Anggap data Anda berupa tabel seperti di Excel.
 
**Baris** adalah satu contoh data, misalnya satu orang pelanggan.
 
**Kolom** adalah satu jenis informasi, misalnya umur atau kota asal.
 
**Fitur** adalah kolom-kolom yang dipakai untuk memprediksi. Dalam kode biasanya diberi nama `X`.
 
**Label** atau **target** adalah kolom jawaban yang ingin diprediksi. Dalam kode biasanya diberi nama `y`.
 
### Nilai Hilang
 
Sel yang kosong dalam tabel. Dalam Python biasanya muncul sebagai `NaN`, singkatan dari *Not a Number*. Penyebabnya bisa macam-macam: responden tidak mengisi, sensor rusak, atau data memang tidak berlaku untuk baris itu.
 
### Outlier
 
Nilai yang jauh menyimpang dari kebanyakan data. Misalnya di kolom gaji yang isinya rata-rata 5 sampai 15 juta, tiba-tiba ada satu baris bernilai 900 juta. Bisa jadi itu salah ketik, bisa juga memang benar karena orang itu direktur.
 
### Encoding
 
Proses mengubah kata menjadi angka. Komputer tidak bisa menghitung kata "Jakarta", jadi harus diubah dulu jadi bentuk angka.
 
### Scaling atau Penskalaan
 
Proses menyamakan rentang angka antar kolom, supaya kolom bernilai besar tidak mendominasi kolom bernilai kecil.
 
### Pipeline
 
Wadah yang menggabungkan semua langkah persiapan data dan model menjadi satu kesatuan. Analoginya seperti resep tertulis: siapa pun yang menjalankannya akan melakukan langkah yang sama persis dengan urutan yang sama.
 
### Kebocoran Data
 
Istilah aslinya *data leakage*. Ini kondisi saat informasi dari data uji tanpa sengaja ikut masuk ke proses pelatihan. Akibatnya skor jadi bagus palsu. Bagian berikutnya membahas ini secara khusus karena sangat penting.
 
## Aturan Paling Penting: Jangan Sampai Data Bocor
 
### Analogi Sederhana
 
Bayangkan seorang guru menyiapkan ujian. Kalau soal ujiannya bocor duluan ke siswa, semua siswa akan dapat nilai tinggi. Tapi nilai itu tidak berarti apa-apa, karena tidak mengukur kemampuan sebenarnya.
 
Dalam machine learning, hal serupa terjadi kalau model secara tidak sengaja "mengintip" data uji saat masa persiapan.
 
### Kapan Kebocoran Terjadi
 
Ini contoh paling sering. Anda ingin menyamakan skala kolom gaji, jadi Anda hitung rata-rata gaji dari seluruh data, lalu baru membagi data jadi latih dan uji.
 
Masalahnya, rata-rata itu ikut menghitung baris-baris yang nanti akan jadi data uji. Artinya model sudah tahu sedikit tentang data uji sebelum ujian dimulai.
 
Kedengarannya sepele, tapi efeknya nyata: skor Anda akan lebih tinggi daripada yang seharusnya, dan Anda tidak akan sadar sampai model dipakai di dunia nyata.
 
### Aturannya
 
Semua perhitungan yang mempelajari sesuatu dari data — rata-rata, median, daftar kategori, nilai minimum dan maksimum — **hanya boleh dihitung dari data latih**, lalu diterapkan ke data uji.
 
Dalam scikit-learn, ini diwujudkan lewat dua perintah:
 
- `fit()` artinya mempelajari. Hanya dipanggil pada data latih.
- `transform()` artinya menerapkan. Dipanggil pada data latih dan data uji.
- `fit_transform()` adalah gabungan keduanya, dan hanya boleh dipakai di data latih.
### Contoh Salah dan Benar
 
```python
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
 
# SALAH: menghitung dari seluruh data sebelum dibagi
scaler = StandardScaler()
X_semua = scaler.fit_transform(X)                    # kebocoran terjadi di sini
X_train, X_test = train_test_split(X_semua)
 
# BENAR: bagi dulu, pelajari hanya dari data latih
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
scaler = StandardScaler()
X_train_siap = scaler.fit_transform(X_train)         # mempelajari dari latih
X_test_siap = scaler.transform(X_test)               # hanya menerapkan
```
 
### Cara Paling Aman: Pakai Pipeline
 
Mengingat aturan `fit` dan `transform` secara manual itu mudah keliru. Cara paling aman adalah membungkus semuanya dalam `Pipeline`, yang otomatis melakukannya dengan benar.
 
```python
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
 
model = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LogisticRegression()),
])
model.fit(X_train, y_train)     # semua langkah belajar dari data latih saja
model.predict(X_test)           # semua langkah hanya menerapkan
```
 
### Urutan Tahap yang Benar
 
Perhatikan bahwa pembagian data terjadi di urutan ketiga, bukan terakhir. Ini sering terbalik di tutorial yang kurang teliti.
 
1. Kenali data
2. Bersihkan hal-hal yang jelas salah (duplikat, salah ketik, tipe data)
3. **Bagi data latih dan data uji**
4. Isi data kosong
5. Tangani nilai ekstrem
6. Ubah kata menjadi angka
7. Samakan skala
8. Buat fitur baru
9. Pilih fitur yang berguna
10. Tangani kelas yang timpang (hanya di data latih)
## Menyiapkan Data Contoh
 
Supaya lebih mudah diikuti, mari buat satu dataset kecil yang sengaja dibuat berantakan. Semua masalah yang akan kita bahas ada di dalamnya.
 
```python
import numpy as np
import pandas as pd
 
np.random.seed(42)
n = 300
 
df = pd.DataFrame({
    "id_pelanggan": range(1, n + 1),
    "umur": np.random.randint(18, 70, n).astype(float),
    "gaji": np.random.randint(3_000_000, 20_000_000, n).astype(float),
    "lama_langganan": np.random.randint(1, 60, n).astype(float),
    "kota": np.random.choice(["Jakarta", "jakarta", "BANDUNG", "Surabaya ",
                              "Palu", "Medan"], n),
    "paket": np.random.choice(["basic", "premium", "vip"], n),
    "tanggal_daftar": pd.to_datetime("2023-01-01") +
                      pd.to_timedelta(np.random.randint(0, 900, n), unit="D"),
    "berhenti": np.random.choice([0, 1], n, p=[0.85, 0.15]),   # target
})
 
# Sengaja disisipi masalah
df.loc[df.sample(30, random_state=1).index, "gaji"] = np.nan       # sel kosong
df.loc[df.sample(15, random_state=2).index, "umur"] = np.nan
df.loc[df.sample(5, random_state=3).index, "umur"] = 999           # nilai mustahil
df.loc[df.sample(8, random_state=4).index, "gaji"] = 900_000_000   # outlier
df = pd.concat([df, df.head(10)], ignore_index=True)               # baris duplikat
 
print(df.head())
print("Ukuran data:", df.shape)
```
 
Data ini punya lima masalah sekaligus: sel kosong, nilai mustahil, outlier, duplikat, dan penulisan kota yang tidak seragam. Kita akan membereskannya satu per satu.
 
## Tahap 1: Mengenali Data Dulu
 
### Kenapa Tahap Ini Sering Dilewati Padahal Penting
 
Pemula sering langsung ingin melatih model. Padahal kalau Anda tidak tahu ada berapa sel kosong, kolom mana yang isinya sama semua, atau kolom mana yang jadi nomor urut, masalahnya akan muncul belakangan dalam bentuk yang membingungkan.
 
Anggap tahap ini seperti membuka semua kantong belanjaan dan memeriksa isinya sebelum mulai memasak.
 
### Melihat Gambaran Umum
 
```python
print(df.shape)          # berapa baris dan berapa kolom
print(df.dtypes)         # tipe tiap kolom: angka, teks, atau tanggal
print(df.head())         # 5 baris pertama
print(df.describe())     # ringkasan statistik kolom angka
```
 
Pada hasil `describe()`, langsung perhatikan baris `max` dan `min`. Kalau umur maksimalnya 999, itu jelas salah. Kalau gaji maksimalnya jauh sekali dari nilai tengahnya, berarti ada outlier.
 
### Membuat Ringkasan Per Kolom
 
Fungsi kecil ini merangkum semua yang perlu diketahui dalam satu tabel.
 
```python
def ringkas(data):
    hasil = pd.DataFrame({
        "tipe": data.dtypes.astype(str),
        "jumlah_kosong": data.isna().sum(),
        "persen_kosong": (data.isna().mean() * 100).round(1),
        "nilai_unik": data.nunique(),
        "contoh": data.apply(lambda kolom: kolom.dropna().iloc[0]
                             if kolom.notna().any() else None),
    })
    return hasil.sort_values("persen_kosong", ascending=False)
 
print(ringkas(df))
```
 
### Tanda Bahaya yang Harus Dicari
 
**Kolom dengan nilai unik hanya 1.** Isinya sama semua, jadi tidak membawa informasi apa pun. Buang saja.
 
**Kolom dengan nilai unik hampir sebanyak jumlah barisnya.** Biasanya ini nomor ID atau kode transaksi. Kalau dimasukkan ke model, model akan menghafal nomornya alih-alih belajar pola. Kolom `id_pelanggan` di data contoh kita termasuk kategori ini.
 
**Kolom dengan sel kosong di atas 60 persen.** Perlu keputusan sadar: dibuang, atau tetap dipakai tapi dengan penanda khusus.
 
**Kolom angka yang terbaca sebagai teks.** Biasanya karena ada pemisah ribuan atau simbol mata uang.
 
## Tahap 2: Membersihkan Data
 
### Baris Duplikat
 
#### Masalahnya
 
Baris yang persis sama muncul dua kali membuat model menganggap pola itu dua kali lebih penting. Lebih parah lagi, kalau salinannya tersebar di data latih dan data uji, model sebenarnya sudah pernah melihat soal ujiannya.
 
#### Solusinya
 
Hapus baris yang benar-benar identik. Ini dilakukan sebelum pembagian data, karena termasuk pembersihan struktural, bukan perhitungan yang mempelajari sesuatu.
 
#### Contoh Kode
 
```python
print("Jumlah duplikat:", df.duplicated().sum())
df = df.drop_duplicates().reset_index(drop=True)
print("Setelah dibersihkan:", df.shape)
 
# Kalau yang duplikat adalah identitasnya, ambil yang paling baru
# df = df.sort_values("tanggal_daftar").drop_duplicates("id_pelanggan", keep="last")
```
 
### Tulisan yang Tidak Seragam
 
#### Masalahnya
 
Lihat kolom kota di data contoh kita. Ada `"Jakarta"`, `"jakarta"`, dan `"Surabaya "` dengan spasi di belakang. Bagi komputer ketiganya adalah tiga kategori berbeda, padahal `"Jakarta"` dan `"jakarta"` jelas kota yang sama.
 
Kalau dibiarkan, sinyal untuk Jakarta terpecah jadi dua bagian yang masing-masing lebih lemah.
 
#### Solusinya
 
Seragamkan penulisan: hapus spasi berlebih, samakan jadi huruf kecil semua, lalu petakan singkatan yang sudah diketahui.
 
#### Contoh Kode
 
```python
print("Sebelum:", df["kota"].unique())
 
df["kota"] = (df["kota"]
              .str.strip()                          # hapus spasi di ujung
              .str.lower()                          # semua jadi huruf kecil
              .str.replace(r"\s+", " ", regex=True))  # spasi ganda jadi tunggal
 
# Kalau ada penulisan berbeda untuk hal yang sama
kamus = {"dki jakarta": "jakarta", "jkt": "jakarta"}
df["kota"] = df["kota"].replace(kamus)
 
print("Sesudah:", df["kota"].unique())
```
 
### Tipe Data yang Salah Terbaca
 
#### Masalahnya
 
Kolom gaji yang ditulis `"Rp 5.000.000"` akan terbaca sebagai teks, bukan angka, sehingga tidak bisa dihitung. Kolom tanggal yang terbaca sebagai teks juga tidak bisa dipakai untuk menghitung selisih hari.
 
Ada juga jebakan sebaliknya: kolom kode wilayah berisi angka 1, 2, 3 terbaca sebagai angka, sehingga model mengira wilayah 3 "lebih besar" daripada wilayah 1. Padahal itu cuma kode.
 
#### Solusinya
 
Ubah tipe secara eksplisit setelah membersihkan karakter pengganggu.
 
#### Contoh Kode
 
```python
# Angka yang tertulis sebagai teks
contoh = pd.Series(["Rp 5.000.000", "Rp 12.500.000", "N/A"])
bersih = (contoh.str.replace(r"[^\d]", "", regex=True)   # sisakan digit saja
                 .replace("", np.nan))
print(pd.to_numeric(bersih, errors="coerce"))
 
# Tanggal
df["tanggal_daftar"] = pd.to_datetime(df["tanggal_daftar"], errors="coerce")
 
# Kode yang sebenarnya kategori, bukan angka
# df["kode_wilayah"] = df["kode_wilayah"].astype(str)
```
 
Bagian `errors="coerce"` artinya: kalau ada nilai yang gagal diubah jadi angka, jadikan saja sel kosong. Ini lebih baik daripada program berhenti dengan error, karena masalahnya berubah jadi sesuatu yang bisa ditangani di tahap berikutnya.
 
### Nilai Kosong yang Menyamar
 
#### Masalahnya
 
Kadang sel kosong tidak benar-benar kosong. Isinya berupa tulisan `"N/A"`, `"-"`, `"tidak ada"`, atau angka aneh seperti `-999` dan `9999`. Python menganggap itu nilai valid, padahal maksudnya kosong.
 
Di data contoh kita, ada umur bernilai 999 yang jelas mustahil.
 
#### Solusinya
 
Ubah semua penanda semacam itu menjadi `NaN` supaya bisa ditangani dengan cara yang benar.
 
#### Contoh Kode
 
```python
# Penanda berupa teks
df = df.replace(["N/A", "n/a", "-", "", "NULL", "?"], np.nan)
 
# Nilai yang mustahil secara logika
df.loc[df["umur"] > 120, "umur"] = np.nan
df.loc[df["umur"] < 0, "umur"] = np.nan
 
print("Sel kosong sekarang:")
print(df.isna().sum())
```
 
## Tahap 3: Membagi Data Latih dan Data Uji
 
### Kenapa Dilakukan Sekarang, Bukan Nanti
 
Semua tahap setelah ini melibatkan perhitungan yang mempelajari sesuatu dari data: rata-rata untuk mengisi sel kosong, daftar kategori untuk encoding, nilai minimum dan maksimum untuk penskalaan.
 
Kalau pembagian dilakukan belakangan, semua perhitungan itu sudah tercemar informasi dari data uji.
 
### Contoh Kode
 
```python
from sklearn.model_selection import train_test_split
 
X = df.drop(columns=["berhenti", "id_pelanggan"])   # id dibuang, tidak berguna
y = df["berhenti"]
 
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,          # 20 persen untuk data uji
    stratify=y,             # proporsi kelas dijaga sama di kedua bagian
    random_state=42,        # supaya hasilnya sama tiap dijalankan
)
 
print("Data latih:", X_train.shape)
print("Data uji  :", X_test.shape)
print("Proporsi kelas di latih:", y_train.value_counts(normalize=True).round(3).to_dict())
print("Proporsi kelas di uji  :", y_test.value_counts(normalize=True).round(3).to_dict())
```
 
### Kapan Pembagian Acak Tidak Boleh Dipakai
 
**Kalau data punya urutan waktu.** Misalnya memprediksi penjualan bulan depan. Pembagian acak akan membuat model belajar dari masa depan untuk menebak masa lalu, yang mustahil dilakukan di dunia nyata. Untuk kasus ini, bagi berdasarkan tanggal: data lama untuk latih, data baru untuk uji.
 
**Kalau satu orang punya banyak baris.** Misalnya satu pasien dengan beberapa kali kunjungan. Pembagian acak bisa menempatkan kunjungan pasien yang sama di dua sisi, sehingga model menghafal identitas pasien. Pakai `GroupKFold` untuk kasus ini.
 
```python
from sklearn.model_selection import TimeSeriesSplit, GroupKFold
 
# Untuk data berurutan waktu
df_urut = df.sort_values("tanggal_daftar")
batas = int(len(df_urut) * 0.8)
latih, uji = df_urut.iloc[:batas], df_urut.iloc[batas:]
```
 
## Tahap 4: Menangani Data Kosong
 
### Kenapa Ada Data Kosong
 
Memahami sebabnya menentukan cara menanganinya. Ada tiga kemungkinan.
 
**Kosong karena kebetulan.** Sensor mati sesaat, atau petugas lupa mengisi. Tidak ada polanya. Kasus ini paling mudah, cukup diisi dengan nilai wajar.
 
**Kosong karena berkaitan dengan kolom lain.** Misalnya kolom gaji lebih sering kosong pada responden berusia muda karena mereka belum bekerja. Di sini, kolom lain bisa dipakai untuk menebak isinya.
 
**Kosong justru karena nilainya.** Misalnya orang berpenghasilan sangat tinggi cenderung menolak mengisi kolom gaji. Ini kasus paling penting, karena fakta bahwa selnya kosong justru merupakan informasi berharga. Kalau diisi begitu saja, informasi itu hilang.
 
### Cara Mengecek Apakah Kekosongan Itu Bermakna
 
Bandingkan target antara baris yang kosong dan yang terisi. Kalau angkanya berbeda jauh, berarti kekosongan itu membawa informasi.
 
```python
for kolom in ["gaji", "umur"]:
    kosong = X_train[kolom].isna()
    print(f"{kolom}: rata-rata target saat kosong = {y_train[kosong].mean():.3f}, "
          f"saat terisi = {y_train[~kosong].mean():.3f}")
```
 
### Cara 1: Menghapus
 
#### Kapan Dipakai
 
Buang kolomnya kalau lebih dari 70 persen isinya kosong dan tidak ada alasan kuat mempertahankannya.
 
Buang barisnya hanya kalau yang terdampak sangat sedikit, di bawah 5 persen, dan kekosongannya memang kebetulan.
 
#### Kenapa Harus Hati-hati
 
Menghapus baris tidak bisa dilakukan di dunia nyata. Kalau nanti ada pelanggan baru yang kolom gajinya kosong, Anda tidak bisa bilang "maaf, tidak bisa diprediksi". Model harus tetap bisa menjawab.
 
#### Contoh Kode
 
```python
# Buang kolom yang terlalu banyak kosong
batas = 0.7
kolom_buang = X_train.columns[X_train.isna().mean() > batas]
print("Kolom yang dibuang:", list(kolom_buang))
```
 
### Cara 2: Mengisi dengan Nilai Statistik
 
#### Kapan Dipakai
 
Ini pilihan default yang aman untuk sebagian besar kasus.
 
Untuk kolom angka, isi dengan **median** (nilai tengah), bukan rata-rata. Alasannya, rata-rata mudah tertarik oleh nilai ekstrem. Kalau ada satu gaji 900 juta di antara gaji 10 juta, rata-ratanya jadi tidak masuk akal, sementara median tetap wajar.
 
Untuk kolom kategori, isi dengan **modus** (nilai yang paling sering muncul), atau dengan kategori khusus seperti `"tidak_diketahui"`.
 
#### Contoh Kode
 
```python
from sklearn.impute import SimpleImputer
 
pengisi_angka = SimpleImputer(strategy="median")
pengisi_kategori = SimpleImputer(strategy="most_frequent")
 
kolom_angka = ["umur", "gaji", "lama_langganan"]
pengisi_angka.fit(X_train[kolom_angka])                  # belajar dari latih
 
X_train_isi = pengisi_angka.transform(X_train[kolom_angka])
X_test_isi = pengisi_angka.transform(X_test[kolom_angka])  # pakai nilai dari latih
 
print("Median yang dipakai:", pengisi_angka.statistics_.round(0))
```
 
### Cara 3: Menambahkan Penanda Kosong
 
#### Masalah yang Diselesaikan
 
Kalau sel kosong langsung diisi median, informasi bahwa sel itu tadinya kosong hilang selamanya. Padahal seperti dibahas tadi, kekosongan itu sendiri kadang membawa sinyal.
 
#### Solusinya
 
Tambahkan kolom baru berisi 0 atau 1 yang menandai baris mana yang tadinya kosong. Model bisa memakainya kalau ternyata berguna, dan mengabaikannya kalau tidak.
 
#### Contoh Kode
 
```python
pengisi = SimpleImputer(strategy="median", add_indicator=True)
hasil = pengisi.fit_transform(X_train[kolom_angka])
 
print("Kolom asli:", len(kolom_angka))
print("Kolom setelah ditambah penanda:", hasil.shape[1])
```
 
Ini trik murah yang sering menaikkan performa model secara nyata. Cukup tambahkan satu parameter.
 
### Cara 4: Membiarkan Model Menanganinya
 
#### Kapan Dipakai
 
Beberapa algoritma bisa menangani sel kosong sendiri tanpa perlu diisi. `HistGradientBoostingClassifier` adalah salah satunya, dan biasanya hasilnya lebih baik daripada pengisian manual.
 
#### Contoh Kode
 
```python
from sklearn.ensemble import HistGradientBoostingClassifier
 
model = HistGradientBoostingClassifier(random_state=42)
model.fit(X_train[kolom_angka], y_train)   # sel kosong dibiarkan apa adanya
print("Akurasi:", round(model.score(X_test[kolom_angka], y_test), 3))
```
 
## Tahap 5: Menangani Nilai Ekstrem
 
### Masalahnya
 
Di data contoh kita ada gaji bernilai 900 juta di antara gaji yang rata-rata 10 jutaan. Nilai seperti ini bisa membuat rata-rata jadi tidak mewakili, membuat penskalaan menjadi kacau, dan menarik garis prediksi jauh melenceng.
 
### Tapi Jangan Langsung Dibuang
 
Ini kesalahan pemula yang umum. Sebelum menghapus, tanyakan dulu asal-usulnya.
 
**Kalau salah ketik**, misalnya umur 999, perbaiki atau jadikan sel kosong.
 
**Kalau salah satuan**, misalnya tinggi badan tercampur antara meter dan sentimeter, konversikan.
 
**Kalau memang benar**, misalnya transaksi besar dari nasabah korporat, jangan dibuang. Pada kasus deteksi penipuan, outlier justru adalah hal yang ingin ditemukan. Membuangnya sama saja membuang jawabannya.
 
### Cara Mendeteksi dengan Metode IQR
 
IQR adalah singkatan dari *Interquartile Range*, yaitu rentang antara nilai di posisi 25 persen dan 75 persen ketika data diurutkan. Data yang jauh di luar rentang itu ditandai sebagai outlier.
 
```python
def cari_outlier(kolom, pengali=1.5):
    q1 = kolom.quantile(0.25)
    q3 = kolom.quantile(0.75)
    iqr = q3 - q1
    bawah = q1 - pengali * iqr
    atas = q3 + pengali * iqr
    return (kolom < bawah) | (kolom > atas), bawah, atas
 
penanda, bawah, atas = cari_outlier(X_train["gaji"].dropna())
print(f"Outlier: {penanda.sum()} baris")
print(f"Batas wajar: {bawah:,.0f} sampai {atas:,.0f}")
```
 
### Cara Menanganinya: Memotong Nilai
 
Alih-alih membuang barisnya, potong nilainya sampai batas tertentu. Cara ini disebut *winsorizing*. Baris tetap ada, informasinya tetap terpakai, tapi nilai ekstremnya tidak lagi merusak.
 
```python
# Batas dipelajari dari data latih saja
batas_bawah, batas_atas = X_train["gaji"].quantile([0.01, 0.99])
 
X_train["gaji"] = X_train["gaji"].clip(batas_bawah, batas_atas)
X_test["gaji"] = X_test["gaji"].clip(batas_bawah, batas_atas)   # batas dari latih
 
print(f"Nilai dipotong pada rentang {batas_bawah:,.0f} - {batas_atas:,.0f}")
```
 
## Tahap 6: Mengubah Kata Menjadi Angka
 
### Masalahnya
 
Sebagian besar algoritma hanya bisa menghitung angka. Kolom `kota` yang berisi `"jakarta"` dan `"palu"` harus diubah bentuknya dulu.
 
### One-Hot Encoding
 
#### Cara Kerjanya
 
Buat satu kolom baru untuk tiap kategori, berisi 1 kalau cocok dan 0 kalau tidak.
 
Kolom `kota` yang berisi tiga kategori berubah menjadi:
 
| kota | kota_jakarta | kota_bandung | kota_palu |
|---|---|---|---|
| jakarta | 1 | 0 | 0 |
| palu | 0 | 0 | 1 |
 
#### Kapan Dipakai
 
Ini pilihan standar untuk kategori yang **tidak punya urutan**. Kota, warna, dan jenis produk tidak bisa diurutkan mana yang lebih besar.
 
#### Contoh Kode
 
```python
from sklearn.preprocessing import OneHotEncoder
 
ohe = OneHotEncoder(
    handle_unknown="ignore",   # kategori baru tidak bikin error
    sparse_output=False,
)
kolom_kategori = ["kota", "paket"]
hasil = ohe.fit_transform(X_train[kolom_kategori])
 
print("Kolom asli:", len(kolom_kategori))
print("Kolom setelah encoding:", hasil.shape[1])
print("Nama kolom baru:", ohe.get_feature_names_out()[:6])
```
 
### Ordinal Encoding
 
#### Cara Kerjanya
 
Tiap kategori diberi nomor urut: 0, 1, 2, dan seterusnya.
 
#### Kapan Dipakai
 
Hanya untuk kategori yang **memang punya urutan bermakna**. Contohnya tingkat pendidikan, ukuran baju, atau tingkat kepuasan.
 
Yang penting, urutannya harus Anda tentukan sendiri. Kalau diserahkan ke komputer, urutannya jadi berdasarkan abjad, sehingga "besar" bisa saja mendapat nomor lebih kecil daripada "kecil".
 
#### Contoh Kode
 
```python
from sklearn.preprocessing import OrdinalEncoder
 
urutan_paket = ["basic", "premium", "vip"]   # urutan ditentukan manual
 
ord_enc = OrdinalEncoder(
    categories=[urutan_paket],
    handle_unknown="use_encoded_value",
    unknown_value=-1,          # kategori tak dikenal jadi -1
)
hasil = ord_enc.fit_transform(X_train[["paket"]])
print("5 nilai pertama:", hasil[:5].ravel())
```
 
#### Jebakan Umum
 
Jangan memakai ordinal encoding untuk kategori tanpa urutan pada model linear. Kalau Jakarta diberi angka 1 dan Surabaya angka 3, model akan mengira Surabaya "tiga kali Jakarta", yang jelas tidak masuk akal.
 
Pengecualiannya adalah model berbasis pohon seperti Random Forest, yang bisa memisahkan kategori lewat beberapa pertanyaan berurutan sehingga urutan sembarang tidak terlalu merugikan.
 
### Kalau Kategorinya Terlalu Banyak
 
#### Masalahnya
 
Bayangkan kolom kode pos dengan 5.000 nilai berbeda. One-hot encoding akan menghasilkan 5.000 kolom baru yang hampir seluruhnya berisi nol. Data jadi sangat lebar, pelatihan jadi lambat, dan model mudah overfitting.
 
#### Solusi Sederhana
 
Gabungkan kategori yang jarang muncul menjadi satu kelompok bernama "lainnya".
 
```python
ohe = OneHotEncoder(
    handle_unknown="infrequent_if_exist",
    min_frequency=0.01,        # kategori di bawah 1 persen digabung
    sparse_output=False,
)
```
 
### Kategori Baru yang Belum Pernah Ada
 
#### Masalahnya
 
Model dilatih dengan data yang berisi 6 kota. Suatu hari datang pelanggan dari kota ketujuh yang belum pernah ada di data latih. Kalau tidak diantisipasi, program bisa berhenti dengan error.
 
#### Solusinya
 
Selalu atur parameter `handle_unknown` secara eksplisit. Lalu uji dengan sengaja memasukkan kategori palsu.
 
```python
X_uji_baru = X_test.copy()
X_uji_baru.loc[X_uji_baru.index[0], "kota"] = "kota_antah_berantah"
# pipeline.predict(X_uji_baru)   # seharusnya jalan tanpa error
```
 
## Tahap 7: Menyamakan Skala Angka
 
### Kenapa Perlu
 
Lihat dua kolom di data kita: `umur` yang isinya sekitar 18 sampai 70, dan `gaji` yang isinya jutaan.
 
Algoritma yang menghitung jarak antar data, seperti KNN dan SVM, akan menganggap perbedaan gaji 1 juta jauh lebih penting daripada perbedaan umur 40 tahun, semata-mata karena angkanya lebih besar. Padahal belum tentu begitu.
 
Penskalaan menyamakan rentangnya supaya semua kolom diperlakukan adil.
 
### StandardScaler
 
#### Cara Kerjanya
 
Mengubah tiap kolom sehingga rata-ratanya menjadi 0 dan sebarannya menjadi 1. Nilai di atas rata-rata jadi positif, di bawah rata-rata jadi negatif.
 
#### Kapan Dipakai
 
Pilihan default untuk sebagian besar kasus.
 
#### Kelemahan
 
Karena memakai rata-rata, metode ini mudah terganggu outlier.
 
### MinMaxScaler
 
#### Cara Kerjanya
 
Memetakan nilai terkecil menjadi 0 dan terbesar menjadi 1, sisanya di antaranya.
 
#### Kapan Dipakai
 
Saat Anda butuh angka yang pasti berada di rentang 0 sampai 1, misalnya untuk jaringan saraf atau pengolahan gambar.
 
#### Kelemahan
 
Satu outlier ekstrem bisa memampatkan semua nilai lain ke ruang yang sangat sempit.
 
### RobustScaler
 
#### Cara Kerjanya
 
Memakai median dan rentang tengah, bukan rata-rata.
 
#### Kapan Dipakai
 
Saat data mengandung outlier yang tidak ingin dibuang. Ini pilihan yang lebih aman untuk data gaji, harga, dan data keuangan pada umumnya.
 
#### Perbandingan Ketiganya
 
```python
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
 
data_uji = X_train[["gaji"]].fillna(X_train["gaji"].median())
 
for nama, alat in [("Standard", StandardScaler()),
                   ("MinMax", MinMaxScaler()),
                   ("Robust", RobustScaler())]:
    hasil = alat.fit_transform(data_uji)
    print(f"{nama:9s} rata-rata={hasil.mean():7.3f} "
          f"min={hasil.min():8.3f} max={hasil.max():8.3f}")
```
 
### Kalau Data Sangat Miring
 
#### Masalahnya
 
Kolom seperti gaji, harga, atau lama tunggu biasanya menumpuk di nilai kecil dengan ekor panjang ke kanan. Sebagian besar orang bergaji 5 sampai 15 juta, sedikit yang 100 juta, sangat sedikit yang 900 juta.
 
Bentuk seperti ini menyulitkan model linear.
 
#### Solusinya
 
Transformasi logaritma memampatkan ekor panjang itu sehingga bentuknya lebih seimbang.
 
```python
gaji = X_train["gaji"].dropna()
print("Kemiringan sebelum:", round(gaji.skew(), 2))
print("Kemiringan sesudah:", round(np.log1p(gaji).skew(), 2))
```
 
Fungsi `np.log1p` adalah logaritma yang aman untuk nilai nol. Semakin dekat angka kemiringan ke nol, semakin seimbang bentuk datanya.
 
### Algoritma yang Tidak Butuh Penskalaan
 
Semua algoritma berbasis pohon keputusan — Decision Tree, Random Forest, Gradient Boosting — tidak terpengaruh sama sekali oleh skala. Algoritma ini hanya bertanya "apakah gaji lebih dari 10 juta?", dan jawabannya tidak berubah meski satuannya diubah.
 
Jadi kalau Anda memakai Random Forest, langkah penskalaan bisa dilewati tanpa rugi apa pun.
 
## Tahap 8: Membuat Fitur Baru
 
### Apa Itu Rekayasa Fitur
 
Ini proses membuat kolom baru dari kolom yang sudah ada, supaya pola yang tersembunyi jadi lebih mudah ditemukan model.
 
Sering kali langkah ini memberi peningkatan lebih besar daripada mengganti algoritma.
 
### Fitur dari Tanggal
 
#### Masalahnya
 
Tanggal mentah seperti `2024-03-15` hampir tidak berguna bagi model, karena nilainya nyaris unik untuk tiap baris.
 
#### Solusinya
 
Uraikan menjadi bagian-bagian yang bermakna: tahun, bulan, hari dalam minggu, akhir pekan atau bukan, dan sudah berapa lama sejak tanggal itu.
 
#### Contoh Kode
 
```python
t = pd.to_datetime(X_train["tanggal_daftar"])
 
X_train["tahun_daftar"] = t.dt.year
X_train["bulan_daftar"] = t.dt.month
X_train["hari_minggu"] = t.dt.dayofweek          # 0=Senin, 6=Minggu
X_train["akhir_pekan"] = (t.dt.dayofweek >= 5).astype(int)
X_train["umur_akun_hari"] = (pd.Timestamp("2026-01-01") - t).dt.days
 
print(X_train[["tahun_daftar", "bulan_daftar", "akhir_pekan", "umur_akun_hari"]].head())
```
 
### Fitur Berupa Rasio dan Selisih
 
#### Kenapa Berguna
 
Kadang yang penting bukan nilai mentahnya, tapi perbandingannya. Gaji 10 juta itu besar atau kecil tergantung berapa cicilan yang harus dibayar. Rasio antara keduanya membawa informasi yang tidak ada di kolom mana pun secara terpisah.
 
#### Contoh Kode
 
```python
X_train["gaji_per_bulan_langganan"] = X_train["gaji"] / (X_train["lama_langganan"] + 1)
X_train["gaji_dibanding_umur"] = X_train["gaji"] / X_train["umur"]
```
 
Angka `+1` di penyebut mencegah pembagian dengan nol.
 
### Mengelompokkan Angka Menjadi Kategori
 
#### Kapan Berguna
 
Kadang hubungan antara kolom dan target tidak lurus. Misalnya risiko berhenti berlangganan tinggi pada pelanggan sangat baru dan sangat lama, tapi rendah di tengah. Bentuk seperti ini sulit ditangkap model linear.
 
Mengubah angka menjadi kelompok membuat pola seperti ini jadi terlihat.
 
#### Contoh Kode
 
```python
X_train["kelompok_umur"] = pd.cut(
    X_train["umur"],
    bins=[0, 25, 35, 50, 65, 120],
    labels=["<25", "25-34", "35-49", "50-64", "65+"],
)
print(X_train["kelompok_umur"].value_counts())
```
 
Perlu diingat, pengelompokan membuang detail di dalam tiap kelompok. Untuk model berbasis pohon, biasanya ini justru merugikan karena pohon sudah melakukan pengelompokan sendiri secara otomatis.
 
## Tahap 9: Memilih Fitur yang Berguna
 
### Kenapa Perlu
 
Kolom yang tidak berguna bukan cuma tidak membantu, tapi bisa merugikan. Pelatihan jadi lambat, model jadi lebih mudah overfitting, dan hasilnya lebih sulit dijelaskan.
 
### Membuang Kolom yang Jelas Tidak Berguna
 
```python
from sklearn.feature_selection import VarianceThreshold
 
# Kolom yang isinya sama semua
konstan = X_train.columns[X_train.nunique() <= 1]
print("Kolom konstan:", list(konstan))
 
# Kolom yang saling berhubungan sangat erat, salah satunya bisa dibuang
angka_saja = X_train.select_dtypes(include=np.number)
korelasi = angka_saja.corr().abs()
atas = korelasi.where(np.triu(np.ones(korelasi.shape), k=1).astype(bool))
kembar = [k for k in atas.columns if any(atas[k] > 0.95)]
print("Kolom yang isinya nyaris kembar:", kembar)
```
 
### Membiarkan Model yang Memilih
 
Cara paling praktis adalah membiarkan model menilai sendiri kolom mana yang berguna.
 
```python
from sklearn.ensemble import RandomForestClassifier
 
kolom_angka = ["umur", "gaji", "lama_langganan"]
data_latih = X_train[kolom_angka].fillna(X_train[kolom_angka].median())
 
rf = RandomForestClassifier(n_estimators=200, random_state=42)
rf.fit(data_latih, y_train)
 
penting = pd.Series(rf.feature_importances_, index=kolom_angka)
print(penting.sort_values(ascending=False).round(4))
```
 
#### Jebakan Penting
 
Seleksi fitur harus jadi bagian dari `Pipeline`, bukan dikerjakan sekali di luar lalu baru divalidasi. Kalau dikerjakan di luar, informasi target dari seluruh data sudah ikut menentukan kolom mana yang dipilih, dan itu bentuk kebocoran juga.
 
## Tahap 10: Menangani Kelas yang Timpang
 
### Masalahnya
 
Di data contoh kita, hanya sekitar 15 persen pelanggan yang berhenti. Kalau perbandingannya lebih ekstrem lagi, misalnya 1 banding 99, model bisa mengambil jalan pintas: selalu menjawab "tidak berhenti".
 
Model seperti itu akan mencatat akurasi 99 persen dan sama sekali tidak berguna, karena tidak pernah berhasil menemukan satu pun kasus yang ingin kita temukan.
 
### Langkah Pertama: Ganti Cara Mengukur
 
Sebelum mengutak-atik data, ganti dulu ukuran keberhasilannya. Jangan pakai akurasi.
 
**Recall** menjawab: dari semua pelanggan yang benar-benar berhenti, berapa persen yang berhasil kita deteksi?
 
**Precision** menjawab: dari semua yang kita tebak akan berhenti, berapa persen yang benar?
 
**F1-score** menggabungkan keduanya secara seimbang.
 
### Solusi 1: Memberi Bobot Lebih pada Kelas Minoritas
 
#### Cara Kerjanya
 
Beri tahu model bahwa kesalahan pada kelas yang jarang itu lebih mahal. Model akan lebih berhati-hati untuk tidak melewatkannya.
 
#### Kenapa Ini Pilihan Pertama
 
Tidak menambah data, tidak menambah waktu, dan tidak mengubah distribusi asli. Cukup satu parameter.
 
```python
from sklearn.linear_model import LogisticRegression
 
model = LogisticRegression(class_weight="balanced", max_iter=5000)
```
 
Parameter ini juga tersedia di `DecisionTreeClassifier`, `RandomForestClassifier`, dan `SVC`.
 
### Solusi 2: Menambah Data Buatan dengan SMOTE
 
#### Cara Kerjanya
 
SMOTE membuat contoh baru untuk kelas yang jarang, dengan cara membuat data "di antara" dua data asli yang berdekatan. Bukan sekadar menggandakan, tapi membuat variasi baru.
 
#### Jebakan yang Wajib Diingat
 
SMOTE **hanya boleh diterapkan pada data latih**, tidak boleh pada data uji. Data uji harus mencerminkan kondisi dunia nyata yang memang timpang.
 
Kalau SMOTE dijalankan sebelum pembagian data, data buatan bisa muncul di kedua sisi, dan skor Anda akan terlihat luar biasa padahal palsu.
 
#### Contoh Kode
 
```python
# pip install imbalanced-learn
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline as PipelineImb
 
model = PipelineImb([
    ("scaler", StandardScaler()),
    ("smote", SMOTE(random_state=42)),      # otomatis nonaktif saat prediksi
    ("model", RandomForestClassifier(random_state=42)),
])
```
 
`PipelineImb` dari library imbalanced-learn secara otomatis mematikan langkah SMOTE saat memprediksi, jadi data uji tetap aman.
 
### Solusi 3: Mengubah Ambang Keputusan
 
#### Cara Kerjanya
 
Model sebenarnya menghasilkan probabilitas, misalnya 0,35. Secara bawaan, nilai di atas 0,5 dianggap positif. Tapi angka 0,5 itu tidak sakral.
 
Kalau Anda menurunkannya jadi 0,3, model jadi lebih mudah menyatakan positif, sehingga lebih banyak kasus terdeteksi meski salah tebaknya juga bertambah.
 
#### Kenapa Layak Dicoba
 
Ini solusi paling murah. Modelnya tidak perlu dilatih ulang sama sekali.
 
```python
from sklearn.metrics import classification_report
 
probabilitas = model.predict_proba(X_test_siap)[:, 1]
 
for ambang in [0.3, 0.5, 0.7]:
    tebakan = (probabilitas >= ambang).astype(int)
    print(f"\nAmbang {ambang}:")
    print(classification_report(y_test, tebakan, digits=3))
```
 
Perhatikan bagaimana recall naik dan precision turun saat ambang diturunkan. Pilih titik yang paling sesuai kebutuhan Anda.
 
## Menggabungkan Semuanya dengan Pipeline
 
### Kenapa Harus Pipeline
 
Tiga alasan.
 
**Mencegah kebocoran data secara otomatis.** Anda tidak perlu lagi mengingat kapan harus `fit` dan kapan harus `transform`.
 
**Kolom berbeda bisa diperlakukan berbeda.** Kolom angka diisi median lalu diskalakan, kolom kategori diisi modus lalu di-encode. Semuanya berjalan otomatis.
 
**Bisa disimpan sebagai satu berkas.** Saat dipakai nanti, urutan langkahnya dijamin sama persis dengan saat pelatihan.
 
### Contoh Lengkap dari Awal Sampai Akhir
 
```python
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
 
kolom_angka = ["umur", "gaji", "lama_langganan"]
kolom_kategori = ["kota", "paket"]
 
# Resep untuk kolom angka
alur_angka = Pipeline([
    ("isi", SimpleImputer(strategy="median", add_indicator=True)),
    ("skala", StandardScaler()),
])
 
# Resep untuk kolom kategori
alur_kategori = Pipeline([
    ("isi", SimpleImputer(strategy="constant", fill_value="tidak_diketahui")),
    ("encode", OneHotEncoder(handle_unknown="ignore", sparse_output=False)),
])
 
# Gabungkan: kolom mana pakai resep mana
persiapan = ColumnTransformer([
    ("angka", alur_angka, kolom_angka),
    ("kategori", alur_kategori, kolom_kategori),
])
 
# Gabungkan persiapan dengan model
model_lengkap = Pipeline([
    ("persiapan", persiapan),
    ("model", RandomForestClassifier(
        n_estimators=300, class_weight="balanced", random_state=42)),
])
 
model_lengkap.fit(X_train, y_train)
print(classification_report(y_test, model_lengkap.predict(X_test), digits=3))
```
 
### Mengecek Hasil Persiapan
 
```python
nama_kolom = model_lengkap.named_steps["persiapan"].get_feature_names_out()
print("Jumlah kolom setelah persiapan:", len(nama_kolom))
print("Contoh nama kolom:", nama_kolom[:8])
```
 
Kalau jumlah kolomnya meledak, misalnya dari 6 kolom jadi 3.000, berarti ada kolom kategori dengan terlalu banyak nilai unik yang perlu ditangani.
 
### Menguji dengan Validasi Silang
 
```python
from sklearn.model_selection import cross_validate, StratifiedKFold
 
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
hasil = cross_validate(
    model_lengkap, X_train, y_train, cv=cv,
    scoring=["recall", "precision", "f1"],
)
 
for ukuran in ["test_recall", "test_precision", "test_f1"]:
    print(f"{ukuran:16s} {hasil[ukuran].mean():.3f} "
          f"(naik-turun {hasil[ukuran].std():.3f})")
```
 
### Menyimpan untuk Dipakai Nanti
 
```python
import joblib
 
joblib.dump(model_lengkap, "model_saya.joblib")
 
# Saat mau dipakai lagi
model_dimuat = joblib.load("model_saya.joblib")
hasil = model_dimuat.predict(data_pelanggan_baru)   # persiapan ikut jalan otomatis
```
 
Ini keuntungan besar dari `Pipeline`. Kalau Anda menyimpan modelnya saja tanpa langkah persiapan, Anda harus mengulang semua langkah persiapan secara manual saat memakainya, dan satu langkah yang terlewat akan membuat hasilnya kacau.
 
## Tabel Masalah dan Solusi
 
| Masalah | Tandanya | Solusinya |
|---|---|---|
| Data bocor | Skor bagus tapi gagal di dunia nyata | Bagi data dulu, bungkus semua dalam `Pipeline` |
| Sel kosong | Program error atau hasil bias | `SimpleImputer` dengan `add_indicator=True` |
| Kosong yang menyamar | Ada `"N/A"`, `"-"`, atau `999` | Ubah jadi `NaN` dengan `replace()` |
| Baris duplikat | Skor terlalu bagus | `drop_duplicates()` sebelum membagi data |
| Tulisan tidak seragam | Kategori pecah jadi banyak | `.str.strip().str.lower()` lalu petakan |
| Nilai ekstrem | Rata-rata jadi aneh, model tidak stabil | `RobustScaler` atau potong dengan `.clip()` |
| Data miring | Model linear kurang akurat | `np.log1p()` |
| Skala kolom beda jauh | KNN dan SVM hasilnya buruk | `StandardScaler` |
| Kategori terlalu banyak | Kolom meledak setelah encoding | `min_frequency` pada `OneHotEncoder` |
| Kategori baru saat dipakai | Error saat prediksi | `handle_unknown="ignore"` |
| Kelas timpang | Recall kelas minoritas nol | `class_weight="balanced"` atau SMOTE |
| Kolom ID ikut masuk | Overfitting parah | Buang kolom ID sebelum melatih |
| Tanggal mentah jadi fitur | Model menghafal | Uraikan jadi tahun, bulan, hari |
 
## Kesalahan Pemula yang Sering Terjadi
 
### Menskalakan Sebelum Membagi Data
 
Ini kesalahan nomor satu. Kelihatannya sepele, efeknya besar. Selalu bagi data dulu, atau lebih baik lagi pakai `Pipeline`.
 
### Menerapkan SMOTE pada Data Uji
 
Data uji harus mencerminkan kondisi nyata. Kalau diseimbangkan, semua ukuran performanya jadi tidak berarti.
 
### Menghapus Semua Outlier Tanpa Diperiksa
 
Pada deteksi penipuan dan deteksi kerusakan, outlier justru adalah target yang dicari. Membuangnya sama saja membuang jawabannya.
 
### Mengisi Sel Kosong Tanpa Memikirkan Sebabnya
 
Kadang kekosongan itu sendiri adalah petunjuk penting. Tambahkan `add_indicator=True` supaya informasi itu tidak hilang.
 
### Memasukkan Kolom ID ke Model
 
Nomor pelanggan atau nomor transaksi tidak punya makna, tapi model bisa menghafalnya. Buang kolom semacam ini di awal.
 
### Mengisi Sel Kosong dengan Rata-rata pada Data yang Ada Outlier
 
Rata-rata mudah tertarik nilai ekstrem. Gunakan median, yang tidak terpengaruh berapa besar nilai ekstremnya.
 
### Lupa Menetapkan random_state
 
Tanpa itu, hasil akan berbeda tiap kali dijalankan dan Anda tidak bisa membandingkan dua percobaan secara adil.
 
### Mengerjakan Semuanya Manual Tanpa Pipeline
 
Semakin banyak langkah manual, semakin besar peluang ada yang terlewat saat model dipakai di dunia nyata. Pipeline menghilangkan risiko itu.
 
## Penutup
 
Preprocessing bukan pekerjaan sampingan sebelum bagian yang "sesungguhnya" dimulai. Justru di sinilah sebagian besar perbedaan antara model yang berhasil dan yang gagal ditentukan.
 
Kalau harus mengingat tiga hal saja dari artikel ini, ingat ini:
 
**Pertama**, bagi data latih dan uji sebelum melakukan perhitungan apa pun yang mempelajari sesuatu dari data.
 
**Kedua**, pahami dulu penyebab masalahnya sebelum memilih solusi. Sel kosong karena sensor rusak dan sel kosong karena orang enggan menjawab butuh perlakuan berbeda.
 
**Ketiga**, bungkus semua langkah dalam satu `Pipeline`. Ini sekaligus mencegah kebocoran data, memudahkan pengujian, dan memastikan model bekerja sama persis saat dipakai nanti.
 
Preprocessing yang benar membuat model sederhana bekerja dengan baik. Preprocessing yang salah membuat model tercanggih sekalipun menghasilkan angka yang tidak bisa dipercaya.
