---
slug: workflow-machine-learning-klasik
title: "Workflow Machine Learning Klasik"
authors: topekox
tags: [manchine learning, data mining, ai, data science, python]
---

Materi ini membahas tahapan Machine Learning dari awal sampai model siap digunakan, termasuk apa yang harus dilakukan, bagaimana cara melakukannya, contoh kode Python, dan output yang diharapkan.

Contoh yang digunakan adalah **prediksi kelulusan siswa berdasarkan jam belajar, kehadiran, dan nilai ujian**. Dataset pada contoh ini bersifat sintetis untuk pembelajaran, bukan data siswa nyata.

<!-- truncate -->

## Gambaran Besar Workflow

1. **Problem Definition** - menentukan masalah dan tujuan.
2. **Data Collection** - mengumpulkan data.
3. **Exploratory Data Analysis (EDA)** - memahami karakteristik data.
4. **Data Preprocessing** - membersihkan dan mentransformasikan data.
5. **Feature Engineering** - membuat atau mentransformasi fitur.
6. **Data Splitting** - memisahkan data training dan testing.
7. **Model Selection** - memilih algoritma.
8. **Model Training** - melatih model.
9. **Prediction & Evaluation** - membuat dan mengevaluasi prediksi.
10. **Optimization** - meningkatkan performa model.
11. **Model Saving** - menyimpan model.
12. **Deployment & Monitoring** - menggunakan dan memantau model.

Workflow ini tidak selalu berjalan lurus. Jika evaluasi menunjukkan hasil yang kurang baik, kita dapat kembali ke tahap preprocessing, feature engineering, atau pemilihan model. Beberapa tahap juga dapat digabung sesuai kebutuhan proyek.

## Tahap 1 - Problem Definition

Tujuan tahap ini adalah memastikan masalah yang ingin diselesaikan sudah jelas sebelum menulis kode Machine Learning.

### Langkah-langkah

1. Identifikasi masalah yang ingin diselesaikan.
2. Tentukan tujuan prediksi.
3. Tentukan objek yang akan diprediksi.
4. Tentukan fitur input (\(X\)).
5. Tentukan target (\(y\)).
6. Tentukan jenis Machine Learning.
7. Tentukan metrik untuk menilai keberhasilan.

### Contoh spesifikasi proyek

| Komponen | Keputusan |
|---|---|
| Masalah | Memprediksi kelulusan siswa |
| Tujuan | Memperkirakan status kelulusan |
| Fitur input | Jam belajar, kehadiran, nilai |
| Target | Kelulusan |
| Jenis ML | Supervised Learning |
| Tipe masalah | Classification |
| Metrik evaluasi | F1-score dan accuracy |

**Output tahap ini:** dokumen definisi masalah yang menjelaskan tujuan, input, target, batasan, dan metrik keberhasilan.

## Tahap 2 - Data Collection

Tujuan tahap ini adalah mendapatkan dataset yang relevan dan cukup berkualitas untuk menjawab masalah.

### Langkah-langkah

1. Tentukan kebutuhan data berdasarkan masalah.
2. Cari sumber data, misalnya CSV, database, API, atau dataset publik.
3. Periksa apakah fitur dan target tersedia.
4. Pastikan label target memiliki definisi yang jelas.
5. Periksa izin penggunaan dan privasi data.
6. Muat dataset ke Python.
7. Simpan data mentah agar sumber awal tidak berubah.

### Contoh membuat dataset sintetis

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(42)
n = 200

df = pd.DataFrame({
    "Jam_Belajar": rng.uniform(0, 8, n).round(1),
    "Kehadiran": rng.integers(40, 101, n),
    "Nilai": rng.uniform(35, 100, n).round(1)
})

# Membuat target sintetis untuk latihan
noise = rng.normal(0, 8, n)

skor_simulasi = (
    df["Jam_Belajar"] * 5
    + df["Kehadiran"] * 0.4
    + df["Nilai"] * 0.3
    + noise
)

df["Kelulusan"] = np.where(
    skor_simulasi >= 65,
    "Lulus",
    "Tidak Lulus"
)

df.to_csv("data_siswa.csv", index=False)

print(df.head())
```

Dataset ini dibuat secara sintetis, bukan data siswa nyata. Targetnya merupakan label simulasi, sehingga cocok untuk latihan teknis, bukan untuk menarik kesimpulan pendidikan.

**Output tahap ini:** file `data_siswa.csv` yang berisi fitur dan target.

## Tahap 3 - Exploratory Data Analysis (EDA)

EDA bertujuan memahami isi, distribusi, kualitas, dan hubungan antarvariabel dalam dataset.

### Langkah 1 - Memeriksa struktur dataset

```python
print(df.head())
print(df.shape)
print(df.info())
print(df.describe())
```

Yang diperiksa:

- `head()`: contoh baris.
- `shape`: jumlah baris dan kolom.
- `info()`: tipe data dan jumlah nilai non-null.
- `describe()`: statistik deskriptif fitur numerik.

### Langkah 2 - Memeriksa missing values dan duplikasi

```python
print(df.isnull().sum())
print("Duplikasi:", df.duplicated().sum())
```

### Langkah 3 - Memeriksa distribusi target

```python
print(df["Kelulusan"].value_counts())

df["Kelulusan"].value_counts().plot(
    kind="bar",
    title="Distribusi Kelulusan"
)
```

Tujuannya adalah melihat apakah kelas target seimbang atau ada kelas yang jauh lebih sedikit.

### Langkah 4 - Memeriksa distribusi fitur

```python
import matplotlib.pyplot as plt

df[["Jam_Belajar", "Kehadiran", "Nilai"]].hist(
    figsize=(10, 5)
)

plt.tight_layout()
plt.show()
```

### Langkah 5 - Memeriksa korelasi antarfitur numerik

```python
import seaborn as sns

corr = df[
    ["Jam_Belajar", "Kehadiran", "Nilai"]
].corr()

sns.heatmap(
    corr,
    annot=True,
    cmap="coolwarm",
    vmin=-1,
    vmax=1
)

plt.show()
```

### Langkah 6 - Merumuskan temuan EDA

Jawab pertanyaan berikut:

- Apakah ada nilai kosong?
- Apakah distribusi target timpang?
- Apakah terdapat outlier yang perlu diperiksa?
- Apakah ada hubungan antarfitur?
- Apakah ada data yang tidak masuk akal?

**Output tahap ini:** laporan EDA yang berisi grafik, statistik, temuan, dan keputusan untuk tahap preprocessing.

:::warning
EDA dapat digunakan untuk memahami dataset. Namun, parameter yang dipelajari dari data-seperti nilai imputasi, scaling, dan seleksi fitur-harus ditentukan dari training set untuk mencegah data leakage.
:::

## Tahap 4 - Data Preprocessing

Preprocessing adalah proses membersihkan dan mentransformasikan data agar sesuai dengan kebutuhan algoritma Machine Learning.

### Langkah-langkah

1. Tangani missing values.
2. Tangani duplikasi jika memang merupakan duplikasi yang tidak valid.
3. Perbaiki tipe data yang keliru.
4. Tangani kategori teks jika algoritma memerlukan input numerik.
5. Lakukan scaling apabila diperlukan.
6. Buat preprocessing yang konsisten untuk data training dan data baru.

### Contoh sederhana menangani missing values

```python
df["Nilai"] = df["Nilai"].fillna(df["Nilai"].median())
```

Kode tersebut cocok sebagai ilustrasi sederhana. Dalam workflow model yang benar, median sebaiknya dipelajari hanya dari data training menggunakan `SimpleImputer`, bukan dihitung dari keseluruhan dataset sebelum splitting.

### Contoh encoding target

```python
df["Kelulusan"] = df["Kelulusan"].map({
    "Tidak Lulus": 0,
    "Lulus": 1
})
```

Encoding di atas mengubah label target menjadi angka. Jika target masih berupa string, banyak estimator Scikit-learn juga dapat menanganinya langsung, sehingga encoding ini tidak selalu wajib.

**Output tahap ini:** data dengan tipe yang benar dan strategi preprocessing yang siap diterapkan secara konsisten.

## Tahap 5 - Feature Engineering

Feature engineering bertujuan membuat fitur baru atau mentransformasi fitur yang tersedia agar lebih informatif bagi model.

### Langkah-langkah

1. Tentukan fitur yang relevan dengan masalah.
2. Periksa apakah fitur perlu ditransformasi.
3. Buat fitur baru berdasarkan pengetahuan domain.
4. Pertimbangkan encoding dan scaling yang sesuai.
5. Periksa apakah fitur baru benar-benar membantu model.
6. Hindari fitur yang menggunakan informasi masa depan atau target secara tidak semestinya.

### Contoh membuat fitur tambahan

```python
df["Jam_Belajar_Per_Hari"] = df["Jam_Belajar"]

df["Kehadiran_Desimal"] = df["Kehadiran"] / 100
```

Contoh ini hanya menunjukkan transformasi fitur. Belum tentu fitur tambahan tersebut meningkatkan performa karena informasinya mungkin sudah tersedia pada fitur asli.

Contoh feature engineering lainnya:

- Data rumah: luas per kamar.
- Data pelanggan: jumlah transaksi per bulan.
- Data waktu: hari, bulan, atau jam.
- Data teks: jumlah kata, TF-IDF, atau indikator kata tertentu.

**Output tahap ini:** daftar fitur yang akan diuji dan alasan mengapa fitur tersebut relevan.

## Tahap 6 - Data Splitting

Data splitting memisahkan dataset untuk melatih dan mengevaluasi model.

### Langkah-langkah

1. Tentukan proporsi data training dan testing.
2. Pisahkan fitur \(X\) dari target \(y\).
3. Bagi data menjadi training dan testing.
4. Gunakan stratifikasi untuk klasifikasi bila sesuai.
5. Simpan test set agar tidak digunakan untuk memilih model berulang kali.

### Contoh kode

```python
from sklearn.model_selection import train_test_split

X = df[[
    "Jam_Belajar",
    "Kehadiran",
    "Nilai"
]]

y = df["Kelulusan"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("Training:", X_train.shape)
print("Testing:", X_test.shape)
```

Dengan 200 baris, pembagian 80:20 menghasilkan 160 baris training dan 40 baris testing.

Penjelasan parameter:

- `test_size=0.2`: 20% data digunakan untuk testing.
- `random_state=42`: membuat pembagian dapat direproduksi.
- `stratify=y`: membantu mempertahankan proporsi kelas saat pembagian.

Untuk data time series, gunakan pembagian berdasarkan waktu, bukan pembagian acak biasa.

**Output tahap ini:** `X_train`, `X_test`, `y_train`, dan `y_test`.

## Tahap 7 - Model Selection

Model selection adalah proses memilih algoritma yang layak dicoba untuk menyelesaikan masalah.

### Langkah-langkah

1. Tentukan jenis masalah: classification, regression, atau clustering.
2. Pilih beberapa algoritma kandidat.
3. Tentukan baseline sebagai pembanding awal.
4. Pertimbangkan ukuran dataset, tipe fitur, interpretabilitas, dan kebutuhan komputasi.
5. Tentukan metrik untuk membandingkan kandidat.

### Contoh algoritma untuk klasifikasi

| Algoritma | Alasan mencoba |
|---|---|
| Logistic Regression | Baseline klasifikasi yang sederhana |
| KNN | Membandingkan berdasarkan kedekatan data |
| Decision Tree | Relatif mudah diinterpretasikan |
| Random Forest | Menggabungkan banyak decision tree |

Tidak perlu mencoba semua algoritma sekaligus. Mulailah dengan satu baseline dan tambahkan kandidat yang relevan.

**Output tahap ini:** daftar algoritma kandidat dan alasan pemilihannya.

## Tahap 8 - Model Training

Model training adalah proses ketika algoritma mempelajari pola dari data training.

### Langkah-langkah

1. Tentukan estimator.
2. Gabungkan preprocessing dan model jika diperlukan.
3. Panggil `fit()` menggunakan data training.
4. Periksa apakah pelatihan berhasil.
5. Catat konfigurasi model yang digunakan.

### Contoh menggunakan Pipeline

```python
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

model = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler()),
    ("classifier", LogisticRegression(max_iter=1000))
])

model.fit(X_train, y_train)
```

Apa yang terjadi ketika `fit()` dipanggil?

- Imputer mempelajari median dari training set.
- Scaler mempelajari rata-rata dan standar deviasi training set.
- Logistic Regression mempelajari parameter untuk klasifikasi.
- Seluruh tahapan tersebut disimpan dalam satu pipeline.

`StandardScaler` membantu algoritma yang sensitif terhadap skala, seperti Logistic Regression dan KNN. Scaling tidak selalu diperlukan untuk Decision Tree atau Random Forest.

**Output tahap ini:** model yang telah dilatih dan siap menghasilkan prediksi.

## Tahap 9 - Prediction dan Model Evaluation

Tahap ini terdiri atas dua pekerjaan berbeda: menghasilkan prediksi dan mengukur kualitasnya.

### A. Prediction

Gunakan model yang sudah dilatih untuk memprediksi target pada data testing.

```python
y_pred = model.predict(X_test)

print(y_pred[:10])
```

Jika target berupa label teks, hasilnya berupa `Lulus` atau `Tidak Lulus`. Jika target sudah di-encode, hasilnya berupa angka 0 dan 1.

Untuk melihat probabilitas kelas:

```python
y_proba = model.predict_proba(X_test)

print(y_proba[:5])
```

`predict_proba()` tersedia pada estimator yang mendukung probabilitas. Kolom probabilitas mengikuti urutan kelas pada `model.classes_`.

### B. Evaluation

Bandingkan prediksi dengan target sebenarnya.

```python
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

print("Accuracy:", accuracy_score(y_test, y_pred))

print(confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred))
```

Metrik yang perlu dipahami:

| Metrik | Fungsi |
|---|---|
| Accuracy | Proporsi seluruh prediksi yang benar |
| Precision | Proporsi prediksi positif yang benar |
| Recall | Proporsi kasus positif yang berhasil ditemukan |
| F1-score | Rata-rata harmonik precision dan recall |
| Confusion matrix | Rincian prediksi benar dan salah |

Contoh interpretasi: jika recall kelas `Lulus` tinggi, model berhasil menemukan banyak siswa yang benar-benar lulus. Namun, kita juga perlu memperhatikan precision dan hasil kelas `Tidak Lulus`.

**Output tahap ini:** hasil prediksi, nilai metrik evaluasi, dan confusion matrix.

## Tahap 10 - Optimization dan Hyperparameter Tuning

Jika hasil baseline belum memenuhi kebutuhan, lakukan perbaikan secara sistematis.

### Langkah-langkah

1. Identifikasi kelemahan model dari hasil evaluasi.
2. Tentukan apakah masalah berasal dari data, fitur, algoritma, atau parameter.
3. Pilih metode tuning.
4. Jalankan cross-validation pada training set.
5. Bandingkan hasil dengan baseline.
6. Pilih konfigurasi berdasarkan validation atau cross-validation.
7. Evaluasi model terpilih pada test set untuk penilaian akhir.

### Contoh menggunakan GridSearchCV

```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    "classifier__C": [0.01, 0.1, 1, 10]
}

search = GridSearchCV(
    estimator=model,
    param_grid=param_grid,
    cv=5,
    scoring="f1_macro",
    n_jobs=-1
)

search.fit(X_train, y_train)

print("Parameter terbaik:", search.best_params_)
print("Skor CV terbaik:", search.best_score_)
```

Penulisan `classifier__C` mengikuti pola `nama_tahap__nama_parameter` karena model menggunakan `Pipeline`.

Setelah tuning:

```python
best_model = search.best_estimator_

y_test_pred = best_model.predict(X_test)

print(classification_report(y_test, y_test_pred))
```

Gunakan test set hanya untuk evaluasi akhir, bukan untuk memilih parameter berulang kali.

Tuning tidak selalu meningkatkan performa. Model yang lebih kompleks juga tidak selalu lebih baik.

**Output tahap ini:** model terbaik berdasarkan proses validasi dan hasil evaluasi akhir pada test set.

## Tahap 11 - Model Saving

Setelah model dipilih, simpan model beserta preprocessing-nya agar dapat digunakan kembali.

### Langkah-langkah

1. Pastikan evaluasi model telah selesai.
2. Simpan pipeline lengkap.
3. Catat nama fitur, urutan fitur, dan tipe datanya.
4. Catat versi Python serta library yang digunakan.
5. Uji pemuatan model dan prediksi ulang.

### Menyimpan model

```python
import joblib

joblib.dump(
    best_model,
    "model_kelulusan.pkl"
)
```

### Memuat model kembali

```python
loaded_model = joblib.load(
    "model_kelulusan.pkl"
)

prediksi = loaded_model.predict(X_test.head())

print(prediksi)
```

Jika model disimpan dalam bentuk pipeline, proses imputasi dan scaling akan ikut digunakan ketika model menerima data baru.

**Output tahap ini:** file model yang dapat dimuat kembali dan digunakan untuk inferensi.

> **Keamanan:** file `joblib` atau pickle hanya boleh dimuat dari sumber tepercaya karena pemuatan file yang tidak tepercaya dapat mengeksekusi kode berbahaya.

## Tahap 12 - Deployment dan Monitoring

Deployment adalah proses mengintegrasikan model ke aplikasi atau sistem agar dapat digunakan. Monitoring memastikan sistem tetap bekerja dengan baik setelah diterapkan.

### A. Deployment

#### Langkah-langkah

1. Tentukan cara pengguna mengakses model.
2. Siapkan lingkungan aplikasi.
3. Muat model yang telah disimpan.
4. Buat fungsi prediksi atau API.
5. Validasi input pengguna.
6. Uji prediksi melalui aplikasi.
7. Terapkan aplikasi ke lingkungan yang dituju.

#### Contoh fungsi prediksi

```python
import joblib
import pandas as pd

model = joblib.load("model_kelulusan.pkl")

def prediksi_kelulusan(
    jam_belajar,
    kehadiran,
    nilai
):
    data_baru = pd.DataFrame([{
        "Jam_Belajar": jam_belajar,
        "Kehadiran": kehadiran,
        "Nilai": nilai
    }])

    hasil = model.predict(data_baru)

    return hasil[0]

print(prediksi_kelulusan(6, 90, 85))
```

Fungsi tersebut menerima input, membentuk DataFrame dengan nama fitur yang sesuai, lalu mengembalikan prediksi. Untuk aplikasi web atau API, fungsi ini dapat dijadikan bagian dari layanan prediksi.

### B. Monitoring

Setelah deployment, lakukan pemeriksaan berikut:

- Apakah aplikasi berjalan dengan baik?
- Apakah input pengguna valid?
- Apakah terjadi error saat prediksi?
- Apakah distribusi data baru berubah dibandingkan data training?
- Apakah kualitas prediksi menurun ketika label aktual tersedia?
- Apakah model perlu diperbarui?

**Output tahap ini:** aplikasi yang menggunakan model dan sistem pemantauan performa serta kualitas data.

## Checklist Praktik untuk Setiap Workflow

Gunakan checklist ini saat mengerjakan proyek Machine Learning di Jupyter Notebook.

### 1. Problem Definition

- [ ] Menentukan masalah dan tujuan.
- [ ] Menentukan fitur, target, dan metrik.

### 2. Data Collection

- [ ] Memperoleh dataset.
- [ ] Memeriksa sumber, label, dan kualitas data.

### 3. EDA

- [ ] Memeriksa struktur dan statistik data.
- [ ] Menganalisis distribusi, missing values, dan korelasi.

### 4. Data Preprocessing

- [ ] Menentukan penanganan missing values.
- [ ] Menyiapkan encoding dan scaling yang diperlukan.

### 5. Feature Engineering

- [ ] Memilih atau membuat fitur relevan.
- [ ] Memeriksa risiko data leakage.

### 6. Data Splitting

- [ ] Memisahkan X dan y.
- [ ] Membagi training dan testing dengan tepat.

### 7. Model Selection

- [ ] Menentukan baseline.
- [ ] Memilih algoritma kandidat.

### 8. Model Training

- [ ] Melatih pipeline menggunakan training set.
- [ ] Mencatat konfigurasi model.

### 9. Prediction & Evaluation

- [ ] Menghasilkan prediksi.
- [ ] Menghitung metrik dan confusion matrix.

### 10. Optimization

- [ ] Melakukan cross-validation dan tuning.
- [ ] Membandingkan model dan mengevaluasi test set.

### 11. Model Saving

- [ ] Menyimpan pipeline.
- [ ] Menguji pemuatan model.

### 12. Deployment & Monitoring

- [ ] Mengintegrasikan model ke aplikasi.
- [ ] Memantau error, perubahan data, dan performa.

## Urutan Belajar yang Direkomendasikan

Untuk pemula, prioritaskan alur berikut sebelum beralih ke deployment:

1. EDA dan preprocessing.
2. Pemisahan `X`, `y`, training, dan testing.
3. `fit()` dan `predict()`.
4. Evaluasi menggunakan accuracy, precision, recall, F1-score, dan confusion matrix.
5. Pipeline dan cross-validation.
6. Hyperparameter tuning.

Setelah mampu menjalankan seluruh alur tersebut pada satu dataset, ulangi dengan algoritma lain seperti KNN, Decision Tree, dan Random Forest.

Tujuan akhirnya bukan sekadar mendapatkan skor tinggi, tetapi memahami **mengapa model menghasilkan prediksi tertentu, bagaimana mengukur kesalahannya, dan bagaimana memastikan model bekerja pada data baru**.
