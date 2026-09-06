---
sidebar_position: 7
---

# Workflow Machine Learning

Machine Learning bukan hanya tentang memilih algoritma kemudian menjalankan kode Python. Dalam proyek Machine Learning yang sebenarnya, terdapat serangkaian tahapan yang perlu dilakukan agar proses penyelesaian masalah dapat berjalan secara terstruktur.

Salah satu cara sederhana untuk memahami alur kerja Machine Learning adalah menggunakan **6 Step Machine Learning Framework**.

Framework ini membantu kita menjawab enam pertanyaan utama:

1. Masalah apa yang ingin diselesaikan?
2. Data apa yang tersedia?
3. Bagaimana keberhasilan akan diukur?
4. Fitur apa yang digunakan?
5. Model apa yang akan dibuat?
6. Bagaimana cara meningkatkan hasilnya?

Secara sederhana, alurnya dapat digambarkan seperti berikut:

```text
Problem Definition
        ↓
      Data
        ↓
    Evaluation
        ↓
     Features
        ↓
     Modelling
        ↓
 Experimentation
        ↺
```

Hal penting yang perlu dipahami adalah bahwa framework ini **bukan proses yang selalu berjalan satu arah**.

Jika model belum memberikan hasil yang baik, kita dapat kembali ke langkah sebelumnya dan melakukan perbaikan.

---

## Mengapa Kita Membutuhkan Machine Learning Framework?

Ketika baru belajar Machine Learning, kita sering langsung berpikir:

> **_"Algoritma apa yang harus saya gunakan?"_**

Misalnya:

- Apakah menggunakan Linear Regression?
- Apakah menggunakan Logistic Regression?
- Apakah menggunakan Decision Tree?
- Apakah menggunakan Random Forest?
- Apakah menggunakan K-Nearest Neighbors?

Padahal, memilih algoritma seharusnya bukan langkah pertama.

Sebelum memilih model, kita perlu memahami:

- masalah yang ingin diselesaikan,
- data yang tersedia,
- target yang ingin diprediksi,
- cara mengukur keberhasilan,
- fitur yang dapat digunakan,
- dan batasan proyek.

Dengan framework, proses Machine Learning menjadi lebih terarah.

---

## Gambaran Umum 6 Langkah

Enam langkah utama dalam framework ini adalah:

| Langkah | Tahap | Pertanyaan Utama |
|---|---|---|
| 1 | Problem Definition | Masalah apa yang ingin kita selesaikan? |
| 2 | Data | Data apa yang kita miliki? |
| 3 | Evaluation | Bagaimana kita mengetahui model berhasil? |
| 4 | Features | Informasi apa yang dapat digunakan model? |
| 5 | Modelling | Model apa yang akan digunakan? |
| 6 | Experimentation | Bagaimana cara meningkatkan hasil? |

Mari kita bahas satu per satu.

---

## Step 1 - Problem Definition

Langkah pertama adalah menentukan **masalah yang ingin diselesaikan**.

Pertanyaan utama pada tahap ini adalah:

> **"What problem are we trying to solve?"**

atau:

> **"Masalah apa yang sedang kita coba selesaikan?"**

Ini merupakan salah satu tahap paling penting karena jenis masalah akan menentukan pendekatan Machine Learning yang digunakan.

---

### Menentukan Jenis Masalah

Beberapa pertanyaan yang dapat digunakan untuk mendefinisikan masalah:

- Apa tujuan proyek?
- Apa yang ingin diprediksi?
- Siapa yang akan menggunakan hasil prediksi?
- Apakah kita memiliki data target?
- Apakah target berupa kategori atau angka?
- Apakah kita ingin menemukan pola tanpa target?
- Apa batasan dari proyek tersebut?

Dari pertanyaan tersebut, kita dapat menentukan pendekatan Machine Learning.

---

### Supervised Learning

**Supervised Learning** digunakan ketika kita memiliki data yang sudah memiliki target atau label.

Contohnya kita memiliki dataset pasien:

| Usia | Tekanan Darah | Kolesterol | Penyakit Jantung |
|---:|---:|---:|---|
| 45 | 140 | 240 | Ya |
| 32 | 120 | 180 | Tidak |
| 61 | 150 | 270 | Ya |

Kolom `Penyakit Jantung` merupakan target.

Model akan mempelajari hubungan antara fitur:

```text
Usia
Tekanan Darah
Kolesterol
```

dengan target:

```text
Penyakit Jantung
```

Kemudian model dapat digunakan untuk membuat prediksi terhadap pasien baru.

---

### Unsupervised Learning

**Unsupervised Learning** digunakan ketika data tidak memiliki target atau label yang diketahui.

Contohnya sebuah perusahaan memiliki data pelanggan:

| Usia | Pendapatan | Pengeluaran |
|---:|---:|---:|
| 22 | 4.000.000 | 3.500.000 |
| 25 | 4.500.000 | 3.800.000 |
| 45 | 15.000.000 | 5.000.000 |
| 48 | 17.000.000 | 5.500.000 |

Tidak terdapat kolom yang menunjukkan kelompok pelanggan.

Kita dapat menggunakan algoritma clustering untuk mencari pola atau kelompok pelanggan secara otomatis.

Misalnya model menemukan:

```text
Kelompok A → pelanggan muda dengan pengeluaran tinggi
Kelompok B → pelanggan dengan pendapatan tinggi
```

---

### Classification

**Classification** merupakan masalah Machine Learning ketika target yang ingin diprediksi berupa kategori.

Contohnya:

```text
Apakah pasien memiliki penyakit jantung?

Ya / Tidak
```

Atau:

```text
Apakah email merupakan spam?

Spam / Bukan Spam
```

Atau:

```text
Jenis hewan:

Kucing
Anjing
Burung
```

Output model berupa kategori.

Contoh:

```text
Input
↓
Data pasien
↓
Model
↓
"Berisiko terkena penyakit"
```

---

### Regression

**Regression** digunakan ketika target yang ingin diprediksi berupa nilai numerik.

Contohnya:

```text
Prediksi harga rumah
```

Misalnya:

```text
Luas rumah       = 120 m²
Jumlah kamar     = 3
Jumlah kamar mandi = 2
Lokasi           = pusat kota
```

Model dapat menghasilkan:

```text
Prediksi harga = Rp850.000.000
```

Contoh masalah regression lainnya:

- prediksi harga rumah,
- prediksi harga kendaraan,
- prediksi penjualan,
- prediksi suhu,
- prediksi pendapatan,
- prediksi jumlah permintaan produk.

---

### Classification vs Regression

Perbedaan sederhananya:

| Classification | Regression |
|---|---|
| Menghasilkan kategori | Menghasilkan angka |
| Spam / bukan spam | Harga rumah |
| Sakit / tidak sakit | Prediksi penjualan |
| Kucing / anjing | Prediksi suhu |
| Ya / tidak | Prediksi pendapatan |

Cara sederhana mengingatnya:

> **Classification → "termasuk kategori apa?"**

> **Regression → "berapa nilainya?"**

---

### Contoh Problem Definition

Misalnya sebuah rumah sakit memiliki data pasien dan ingin membantu dokter mengidentifikasi pasien yang memiliki risiko penyakit jantung.

Problem definition dapat ditulis:

> "Membangun model Machine Learning yang dapat memprediksi apakah seorang pasien memiliki risiko penyakit jantung berdasarkan karakteristik kesehatan yang tersedia."

Dari definisi tersebut kita dapat mengetahui bahwa:

```text
Jenis masalah
↓
Supervised Learning
↓
Classification
```

Karena kita memiliki target berupa kategori:

```text
Berisiko
Tidak berisiko
```

Definisi masalah yang jelas akan membantu proses pada tahap berikutnya.

---

## Step 2 - Data

Setelah mengetahui masalah yang ingin diselesaikan, langkah berikutnya adalah memahami **data**.

Pertanyaan utama:

> **"What data do we have?"**

atau:

> **"Data apa yang kita miliki?"**

Data merupakan bahan utama dalam Machine Learning.

Tanpa data yang sesuai, model Machine Learning tidak akan dapat belajar dengan baik.

---

### Sumber Data

Data dapat berasal dari berbagai sumber, misalnya:

- database perusahaan,
- file CSV,
- Excel,
- API,
- sensor,
- website,
- sistem transaksi,
- aplikasi,
- survei,
- perangkat IoT,
- gambar,
- audio,
- video,
- dan sumber lainnya.

Contohnya perusahaan memiliki data transaksi:

```text
tanggal
produk
harga
jumlah
lokasi
pelanggan
total_transaksi
```

Data tersebut kemudian dapat digunakan untuk membangun model prediksi.

---

### Memahami Karakteristik Data

Tidak cukup hanya memiliki data.

Kita juga perlu memahami karakteristiknya.

Beberapa pertanyaan yang perlu dijawab:

- Berapa jumlah data?
- Apa saja kolomnya?
- Apa tipe setiap kolom?
- Apakah terdapat data kosong?
- Apakah terdapat data duplikat?
- Apakah terdapat data yang salah?
- Apakah terdapat outlier?
- Apakah distribusi datanya seimbang?
- Apakah data memiliki label?
- Apakah data cukup mewakili masalah yang ingin diselesaikan?

Contoh sederhana menggunakan Pandas:

```python
import pandas as pd

df = pd.read_csv("data.csv")

print(df.head())
print(df.info())
print(df.describe())
print(df.isna().sum())
```

Perintah tersebut membantu kita melakukan pemeriksaan awal terhadap dataset.

---

### Structured dan Unstructured Data

Data dapat memiliki berbagai bentuk.

#### 1. Structured Data

Data terstruktur biasanya berbentuk tabel.

Contohnya:

| Usia | Pendapatan | Jumlah Transaksi |
|---:|---:|---:|
| 25 | 5000000 | 10 |
| 31 | 7000000 | 15 |
| 42 | 9000000 | 21 |

Data seperti ini relatif mudah digunakan dalam banyak algoritma Machine Learning klasik.

#### 2. Unstructured Data

Data tidak terstruktur dapat berupa:

- gambar,
- video,
- audio,
- teks,
- dokumen.

Contohnya:

```text
Foto → Computer Vision
Suara → Speech Recognition
Teks → Natural Language Processing
```

Jenis data akan memengaruhi metode preprocessing dan model yang digunakan.

---

## Step 3 - Evaluation

Setelah memahami masalah dan data, kita perlu menentukan:

> **"What does success look like?"**

atau:

> **"Seperti apa keberhasilan proyek ini?"**

Tahap ini disebut **Evaluation**.

Evaluation digunakan untuk menentukan apakah model yang dibuat sudah memberikan hasil yang cukup baik.

---

### Mengapa Evaluation Penting?

Bayangkan kita membuat model untuk mendeteksi penyakit.

Model menghasilkan:

```text
Accuracy = 90%
```

Apakah model tersebut otomatis bagus?

Belum tentu.

Kita perlu mengetahui:

- bagaimana accuracy dihitung,
- berapa banyak data,
- apakah dataset seimbang,
- kesalahan apa yang dibuat model,
- dan metric apa yang paling sesuai dengan masalah.

Karena itu, metric harus ditentukan berdasarkan tujuan proyek.

---

### Contoh Evaluation pada Classification

Beberapa metric yang umum digunakan:

- Accuracy
- Precision
- Recall
- F1 Score
- ROC-AUC

Misalnya kita menentukan target:

```text
Accuracy minimal = 90%
```

Maka kita memiliki standar awal untuk mengevaluasi model.

Namun pada kasus tertentu, accuracy bukan metric terbaik.

Misalnya untuk mendeteksi penyakit serius, **Recall** mungkin lebih penting karena kita ingin meminimalkan jumlah pasien yang sebenarnya sakit tetapi diprediksi sehat.

---

### Contoh Evaluation pada Regression

Untuk regression, beberapa metric yang umum digunakan adalah:

- MAE
- MSE
- RMSE
- R²

Misalnya model digunakan untuk memprediksi harga rumah.

Kita dapat menetapkan target:

```text
RMSE harus serendah mungkin
```

atau:

```text
R² minimal 0.80
```

Dengan demikian kita memiliki standar untuk menentukan apakah model sudah cukup baik.

---

### Evaluation Harus Ditentukan Sebelum Modeling

Idealnya kita menentukan metric sebelum memilih dan melatih model.

Alurnya:

```text
Problem
   ↓
Data
   ↓
Evaluation Metric
   ↓
Features
   ↓
Model
```

Hal ini membantu mencegah kita memilih model hanya karena menghasilkan angka tertentu tanpa memahami apakah angka tersebut benar-benar relevan dengan tujuan proyek.

---

## Step 4 - Features

Setelah memahami data dan menentukan cara evaluasi, kita perlu menentukan **features**.

Pertanyaan utama:

> **"What features are important?"**

atau:

> **"Informasi apa yang dapat digunakan model?"**

---

### Apa Itu Feature?

Feature adalah informasi atau variabel yang digunakan model untuk membuat prediksi.

Misalnya kita ingin memprediksi harga rumah.

Dataset:

| Luas | Kamar | Kamar Mandi | Jarak ke Kota | Harga |
|---:|---:|---:|---:|---:|
| 100 | 3 | 2 | 5 km | 700 jt |
| 150 | 4 | 2 | 3 km | 950 jt |
| 200 | 5 | 3 | 2 km | 1,4 M |

Feature:

```text
Luas
Kamar
Kamar Mandi
Jarak ke Kota
```

Target:

```text
Harga
```

Secara sederhana:

```text
Features
    ↓
 Machine Learning Model
    ↓
 Prediction / Target
```

---

### Feature dan Target

Dalam Machine Learning kita sering memisahkan data menjadi:

```python
X = features
y = target
```

Contoh:

```python
X = df[["luas", "kamar", "kamar_mandi"]]
y = df["harga"]
```

`X` berisi informasi yang digunakan untuk melakukan prediksi.

`y` berisi nilai yang ingin diprediksi.

---

### Tidak Semua Kolom Harus Digunakan

Kesalahan umum ketika belajar Machine Learning adalah menganggap semua kolom harus dimasukkan ke model.

Padahal belum tentu.

Misalnya dataset memiliki:

```text
id
nama
alamat
luas
jumlah_kamar
harga
```

Belum tentu semua kolom berguna.

Kolom `id` mungkin hanya merupakan identifier.

Kolom `nama` mungkin tidak relevan.

Kolom `harga` merupakan target sehingga tidak boleh dimasukkan sebagai feature ketika kita ingin memprediksi harga.

Feature harus dipilih berdasarkan hubungan dan relevansinya terhadap masalah.

---

### Feature Engineering

Pada tahap feature, kita juga dapat melakukan **feature engineering**.

Feature engineering adalah proses membuat atau mengubah feature agar informasi yang diberikan kepada model menjadi lebih berguna.

Misalnya kita memiliki:

```text
tanggal_lahir
```

Kita dapat mengubahnya menjadi:

```text
umur
```

Atau memiliki:

```text
tanggal_transaksi
```

dan membuat:

```text
hari
bulan
tahun
hari_dalam_minggu
```

Feature engineering merupakan bagian penting dalam banyak proyek Machine Learning.

---

## Step 5 - Modelling

Setelah memahami masalah, data, evaluation, dan features, kita masuk ke tahap **Modelling**.

Pertanyaan utama:

> **"What model should we use?"**

atau:

> **"Model apa yang paling tepat dan bagaimana cara melatihnya?"**

Pada tahap ini kita mulai membangun dan melatih model Machine Learning.

---

### Proses Modelling

Modelling biasanya melibatkan beberapa aktivitas:

```text
Data
 ↓
Splitting
 ↓
Model Selection
 ↓
Training
 ↓
Evaluation
 ↓
Tuning
 ↓
Comparison
```

Mari kita bahas.

---

### 1. Splitting Data

Data biasanya perlu dibagi menjadi beberapa bagian.

Contoh:

```text
Dataset
   │
   ├── Training Set
   ├── Validation Set
   └── Test Set
```

* #### Training Set

Training set digunakan untuk melatih model.

Model mempelajari pola dari data ini.

* #### Validation Set

Validation set dapat digunakan untuk membantu memilih model atau melakukan tuning.

* #### Test Set

Test set digunakan untuk mengukur performa akhir model pada data yang belum pernah digunakan dalam proses training.

---

#### Contoh Pembagian Data

Misalnya kita memiliki:

```text
10.000 data
```

Kita dapat menggunakan pembagian seperti:

```text
Training = 70%
Validation = 15%
Test = 15%
```

Namun pembagian tidak selalu harus seperti ini.

Persentasenya dapat disesuaikan dengan ukuran dataset dan kebutuhan proyek.

Untuk dataset yang tidak terlalu besar, kita juga dapat menggunakan teknik seperti cross-validation.

---

### 2. Picking the Model

Setelah data dipersiapkan, kita memilih algoritma yang sesuai.

Contoh classification:

```text
Logistic Regression
K-Nearest Neighbors
Support Vector Machine
Decision Tree
Random Forest
```

Contoh regression:

```text
Linear Regression
Ridge
Lasso
Decision Tree Regressor
Random Forest Regressor
```

Pemilihan model bergantung pada:

- jenis masalah,
- ukuran data,
- jenis feature,
- hubungan antarvariabel,
- kebutuhan interpretasi,
- waktu training,
- kebutuhan deployment,
- dan performa yang dihasilkan.

---

### Jangan Langsung Menganggap Satu Model Pasti Terbaik

Misalnya kita memiliki masalah classification.

Kita mencoba:

```text
Logistic Regression
Decision Tree
Random Forest
KNN
```

Kemudian mendapatkan:

| Model | Accuracy |
|---|---:|
| Logistic Regression | 84% |
| Decision Tree | 81% |
| Random Forest | 89% |
| KNN | 85% |

Dari hasil tersebut, Random Forest terlihat paling baik berdasarkan accuracy.

Namun kita tetap perlu melihat metric lain dan mempertimbangkan karakteristik masalah.

Inilah alasan mengapa **model comparison** penting.

---

### 3. Training

Training adalah proses ketika model belajar dari training data.

Contoh sederhana menggunakan Scikit-learn:

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()

model.fit(X_train, y_train)
```

Pada proses tersebut, model mencoba menemukan pola hubungan antara:

```text
X_train
```

dan:

```text
y_train
```

Setelah training selesai, model dapat digunakan untuk melakukan prediksi.

```python
predictions = model.predict(X_test)
```

---

### 4. Tuning

Model biasanya memiliki parameter yang dapat diatur sebelum atau selama proses training.

Parameter tersebut disebut **hyperparameter**.

Contohnya pada Random Forest:

```python
RandomForestClassifier(
    n_estimators=100,
    max_depth=10
)
```

Kita dapat mencoba kombinasi nilai yang berbeda untuk mencari konfigurasi yang memberikan performa lebih baik.

Proses ini disebut **hyperparameter tuning**.

Beberapa teknik yang umum digunakan:

- Grid Search
- Random Search
- Cross-Validation
- teknik optimasi lainnya

---

### 5. Comparison

Dalam proyek Machine Learning, kita sering tidak hanya membuat satu model.

Kita dapat mencoba beberapa model dan membandingkan hasilnya.

Contoh:

```text
Model A → 82%
Model B → 87%
Model C → 90%
Model D → 85%
```

Kemudian kita menganalisis:

- performa,
- waktu training,
- ukuran model,
- interpretabilitas,
- kebutuhan komputasi,
- dan kebutuhan deployment.

Model terbaik bukan selalu model dengan skor tertinggi.

Model terbaik adalah model yang paling sesuai dengan **tujuan dan kebutuhan proyek**.

---

## Step 6 - Experimentation

Langkah terakhir adalah **Experimentation**.

Pertanyaan utama:

> **"Apakah hasil model sudah memenuhi target? Jika belum, apa yang dapat diperbaiki?"**

Machine Learning merupakan proses yang bersifat **iteratif**.

Artinya, kita kemungkinan besar tidak mendapatkan model terbaik hanya dalam satu percobaan.

---

### Machine Learning Adalah Proses Iteratif

Misalnya kita membuat model classification.

Target:

```text
Accuracy >= 90%
```

Hasil pertama:

```text
Accuracy = 78%
```

Model belum memenuhi target.

Kita kemudian melakukan eksperimen.

Misalnya:

```text
Coba preprocessing baru
        ↓
Coba feature baru
        ↓
Coba model lain
        ↓
Hyperparameter tuning
        ↓
Evaluasi ulang
```

Hasil kedua:

```text
Accuracy = 85%
```

Masih belum memenuhi target.

Kita kembali melakukan eksperimen.

```text
Feature Engineering
        ↓
Model Comparison
        ↓
Hyperparameter Tuning
        ↓
Evaluasi
```

Hasil:

```text
Accuracy = 92%
```

Sekarang model sudah melewati target awal.

---

### Kembali ke Langkah Sebelumnya

Hal penting dari framework ini adalah kita **tidak harus selalu kembali ke awal**.

Kita dapat kembali ke langkah tertentu berdasarkan masalah yang ditemukan.

Misalnya masalah terdapat pada data:

```text
Model buruk
   ↓
Periksa Data
   ↓
Data banyak missing value
   ↓
Perbaiki preprocessing
   ↓
Training kembali
```

Atau masalah terdapat pada feature:

```text
Model buruk
   ↓
Periksa Features
   ↓
Feature kurang informatif
   ↓
Feature Engineering
   ↓
Training kembali
```

Atau masalah terdapat pada model:

```text
Model buruk
   ↓
Model Comparison
   ↓
Coba algoritma lain
   ↓
Training kembali
```

Karena itu, framework sebenarnya lebih tepat dipahami sebagai sebuah **siklus**.

---

## Contoh Workflow Machine Learning

Misalnya kita ingin membuat model untuk memprediksi apakah seseorang memiliki risiko penyakit jantung.

Kita dapat menerapkan framework sebagai berikut.

### 1. Problem Definition

Tujuan:

> Memprediksi apakah seseorang memiliki risiko penyakit jantung berdasarkan data kesehatan.

Jenis masalah:

```text
Supervised Learning
        ↓
Classification
```

---

### 2. Data

Kita memiliki dataset:

```text
age
sex
blood_pressure
cholesterol
heart_rate
exercise
target
```

Target:

```text
target
```

---

### 3. Evaluation

Kita menentukan metric:

```text
Accuracy
Precision
Recall
F1 Score
```

Misalnya target awal:

```text
Recall >= 90%
```

karena kita ingin meminimalkan pasien berisiko yang terlewat oleh model.

---

### 4. Features

Features:

```text
age
sex
blood_pressure
cholesterol
heart_rate
exercise
```

Target:

```text
target
```

Dalam Python:

```python
X = df[
    [
        "age",
        "sex",
        "blood_pressure",
        "cholesterol",
        "heart_rate",
        "exercise"
    ]
]

y = df["target"]
```

---

### 5. Modelling

Data dibagi:

```text
Training
Validation
Test
```

Kemudian kita mencoba beberapa model:

```text
Logistic Regression
Random Forest
KNN
```

Setelah itu kita membandingkan hasilnya.

---

### 6. Experimentation

Misalnya hasil awal:

```text
Logistic Regression → Recall 84%
Random Forest       → Recall 88%
KNN                 → Recall 81%
```

Belum ada yang mencapai target:

```text
Recall >= 90%
```

Maka kita melakukan eksperimen.

Misalnya:

```text
Feature Engineering
        ↓
Preprocessing
        ↓
Hyperparameter Tuning
        ↓
Model Training
        ↓
Evaluation
```

Setelah beberapa eksperimen:

```text
Random Forest → Recall 92%
```

Model telah memenuhi target awal.

---

## Framework Bukan Proses Sekali Jalan

Kesalahan umum pemula adalah menganggap Machine Learning berjalan seperti:

```text
Step 1
 ↓
Step 2
 ↓
Step 3
 ↓
Step 4
 ↓
Step 5
 ↓
Step 6
 ↓
Selesai
```

Pada praktiknya lebih sering seperti:

```text
              ┌──────────────┐
              │    Problem   │
              └──────┬───────┘
                     ↓
              ┌──────────────┐
              │     Data     │
              └──────┬───────┘
                     ↓
              ┌──────────────┐
              │  Evaluation  │
              └──────┬───────┘
                     ↓
              ┌──────────────┐
              │   Features   │
              └──────┬───────┘
                     ↓
              ┌──────────────┐
              │   Modelling  │
              └──────┬───────┘
                     ↓
              ┌──────────────┐
              │Experimentation│
              └──────┬───────┘
                     │
                     │ Belum optimal
                     │
                     └───────────────→ kembali
```

Iterasi merupakan bagian normal dari Machine Learning.

---

## Contoh Implementasi Sederhana

Berikut contoh workflow sederhana menggunakan dataset classification dari Scikit-learn.

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# 1. Data
data = load_iris()

X = data.data
y = data.target

# 2. Splitting
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# 3. Modelling
model = RandomForestClassifier(
    random_state=42
)

# 4. Training
model.fit(X_train, y_train)

# 5. Prediction
y_pred = model.predict(X_test)

# 6. Evaluation
accuracy = accuracy_score(y_test, y_pred)

print(f"Accuracy: {accuracy:.2%}")
```

Walaupun kode tersebut terlihat sederhana, sebenarnya kita telah mengikuti beberapa bagian dari framework:

```text
Data
  ↓
Splitting
  ↓
Model Selection
  ↓
Training
  ↓
Prediction
  ↓
Evaluation
```

Pada proyek nyata, proses tersebut akan menjadi jauh lebih kompleks karena kita perlu menangani preprocessing, feature engineering, validasi, tuning, eksperimen, dan deployment.

---

## Hubungan 6 Step dengan Proses Machine Learning Nyata

Enam langkah tersebut dapat dihubungkan dengan aktivitas Machine Learning yang lebih detail.

| Framework | Aktivitas |
|---|---|
| Problem Definition | Menentukan tujuan dan jenis masalah |
| Data | Mengumpulkan dan memahami dataset |
| Evaluation | Menentukan metric dan target |
| Features | Memilih dan membuat feature |
| Modelling | Training, validasi, tuning, comparison |
| Experimentation | Iterasi dan improvement |

Dengan memahami framework ini, kita memiliki gambaran besar sebelum mempelajari setiap bagian secara lebih mendalam.

---

## Kesalahan Umum dalam Machine Learning Workflow

### Langsung Memilih Algoritma

Kesalahan:

> "Saya ingin menggunakan Random Forest."

sebelum memahami masalah.

Lebih baik:

```text
Problem
↓
Data
↓
Evaluation
↓
Features
↓
Model Selection
```

---

### Tidak Menentukan Target

Kita harus mengetahui apa yang ingin diprediksi.

Misalnya:

```text
Features → ?
```

Jika target tidak jelas, model juga tidak memiliki tujuan yang jelas.

---

### Menggunakan Semua Kolom

Tidak semua kolom otomatis menjadi feature yang baik.

Kita perlu memahami hubungan setiap feature dengan masalah.

---

### Tidak Menentukan Metric

Tanpa metric, kita tidak memiliki standar untuk menentukan apakah model sudah cukup baik.

---

### Hanya Menggunakan Satu Model

Model pertama yang dicoba belum tentu model terbaik.

Mencoba beberapa algoritma dan membandingkan hasilnya sering kali merupakan bagian dari proses yang wajar.

---

### Menganggap Model Pertama Harus Sempurna

Model pertama biasanya menjadi **baseline**.

Dari baseline tersebut kita dapat mengetahui apakah eksperimen berikutnya memberikan improvement.

---

## Cara Berpikir sebagai Machine Learning Engineer

Framework ini pada akhirnya bukan hanya tentang enam langkah teknis.

Yang lebih penting adalah cara berpikir ketika menyelesaikan masalah.

Daripada bertanya:

> "Algoritma apa yang harus saya gunakan?"

Biasakan bertanya:

> "Masalah apa yang ingin saya selesaikan?"

Kemudian:

> "Data apa yang tersedia?"

Lalu:

> "Bagaimana saya mengukur keberhasilan?"

Kemudian:

> "Informasi apa yang dapat digunakan model?"

Setelah itu:

> "Model apa yang cocok?"

Dan akhirnya:

> "Bagaimana saya dapat meningkatkan hasilnya?"

Cara berpikir tersebut akan sangat membantu ketika menghadapi dataset dan masalah yang belum pernah ditemui sebelumnya.

---

## Ringkasan

**6 Step Machine Learning Framework** terdiri dari:

```text
1. Problem Definition
2. Data
3. Evaluation
4. Features
5. Modelling
6. Experimentation
```

Penjelasan singkatnya:

### 1. Problem Definition

Menentukan masalah yang ingin diselesaikan dan jenis Machine Learning yang digunakan.

### 2. Data

Mengumpulkan, memahami, dan mengeksplorasi data yang tersedia.

### 3. Evaluation

Menentukan metric dan target keberhasilan model.

### 4. Features

Menentukan informasi yang digunakan model untuk melakukan prediksi.

### 5. Modelling

Memilih, melatih, mengevaluasi, melakukan tuning, dan membandingkan model.

### 6. Experimentation

Melakukan eksperimen dan mengulangi proses untuk meningkatkan performa model.

Hal terpenting yang perlu diingat:

> **Machine Learning adalah proses iteratif, bukan proses sekali jalan.**

Jika model belum memenuhi target, kita dapat kembali ke data, feature, preprocessing, model, atau parameter dan melakukan eksperimen kembali.

```text
Problem
   ↓
Data
   ↓
Evaluation
   ↓
Features
   ↓
Modelling
   ↓
Experimentation
   ↓
Improvement
   ↺
```

Dengan memahami framework ini, kita sudah memiliki **peta besar workflow Machine Learning**. Materi berikutnya dapat mulai masuk lebih dalam ke bagaimana data dipersiapkan sebelum digunakan untuk melatih model.
