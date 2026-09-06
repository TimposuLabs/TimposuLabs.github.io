---
sidebar_position: 6
title: "Cara Kerja Machine Learning"
---

Pada materi sebelumnya, kita telah memahami bahwa Machine Learning merupakan salah satu pendekatan yang memungkinkan komputer mempelajari pola dari data.

Sekarang kita akan melihat lebih jauh:

> **Bagaimana sebenarnya Machine Learning belajar dari data?**

Untuk memahami hal tersebut, kita perlu membandingkan Machine Learning dengan pemrograman tradisional.

## Pengertian Machine Learning

Secara sederhana, Machine Learning adalah proses menggunakan algoritma untuk mempelajari pola yang terdapat dalam data sehingga pola tersebut dapat digunakan untuk membuat prediksi atau keputusan terhadap data baru.

Secara umum:

```text
Data
 ↓
Machine Learning Algorithm
 ↓
Pattern
 ↓
Model
 ↓
Prediction
```

Misalnya kita memiliki data rumah:

| Luas Rumah | Jumlah Kamar | Harga |
|---:|---:|---:|
| 60 | 2 | 300 juta |
| 80 | 3 | 450 juta |
| 100 | 3 | 550 juta |
| 120 | 4 | 700 juta |

Machine Learning dapat mempelajari hubungan antara karakteristik rumah dengan harga.

Setelah proses pembelajaran selesai, model dapat digunakan untuk memperkirakan harga rumah yang belum pernah dilihat sebelumnya.

## Model dan Algoritma

Dalam pembahasan Machine Learning, kita akan sering menemukan istilah **algorithm** dan **model**.

Keduanya berhubungan tetapi bukan sesuatu yang sama.

### Algorithm

Algoritma adalah metode atau prosedur yang digunakan untuk melakukan proses pembelajaran.

Contohnya:

- Linear Regression
- Decision Tree
- K-Nearest Neighbors
- K-Means
- Support Vector Machine

### Model

Model adalah hasil yang diperoleh setelah algoritma Machine Learning mempelajari data.

Secara sederhana:

```text
Dataset
   ↓
Algorithm
   ↓
Training
   ↓
Model
```

Model kemudian dapat digunakan untuk melakukan prediksi.

```text
Model
  +
Data Baru
  ↓
Prediction
```

Dalam percakapan sehari-hari, istilah algoritma dan model terkadang digunakan secara bergantian. Namun, dalam pembelajaran teknis, penting untuk memahami bahwa **algoritma merupakan metode pembelajaran, sedangkan model merupakan hasil pembelajaran tersebut**.

## Pemrograman Tradisional

Sebelum membahas proses Machine Learning, mari kita lihat kembali pemrograman tradisional.

Pada pemrograman tradisional, programmer menentukan aturan atau instruksi secara eksplisit.

Strukturnya:

```text
Data + Rules
     ↓
  Program
     ↓
   Output
```

Misalnya kita ingin menentukan apakah seseorang dapat dikategorikan sebagai dewasa.

```python
age = 20

if age >= 17:
    result = "Dewasa"
else:
    result = "Belum Dewasa"

print(result)
```

Programmer menentukan aturan:

```text
Jika age >= 17
→ Dewasa

Jika age < 17
→ Belum Dewasa
```

Komputer hanya menjalankan aturan yang telah dibuat.

### Karakteristik Pemrograman Tradisional

Dalam pendekatan tradisional:

- programmer menentukan aturan
- komputer menjalankan aturan
- data digunakan sebagai input
- output dihasilkan berdasarkan aturan

Contoh lain:

```text
Data Transaksi
      +
Aturan Fraud
      ↓
    Program
      ↓
Fraud / Bukan Fraud
```

Masalahnya muncul ketika aturan yang dibutuhkan terlalu kompleks untuk ditulis secara manual.

## Machine Learning

Machine Learning menggunakan pendekatan yang berbeda.

Daripada programmer menulis semua aturan secara manual, kita memberikan **contoh data** kepada algoritma.

Secara sederhana:

```text
Data + Jawaban Ideal
        ↓
     Algorithm
        ↓
      Training
        ↓
       Model
```

Model kemudian digunakan untuk data baru:

```text
Data Baru
    ↓
  Model
    ↓
Prediction
```

Perbedaan paling penting adalah **dari mana aturan diperoleh**.

Pada pemrograman tradisional:

```text
Programmer → menentukan rules
```

Pada Machine Learning:

```text
Algorithm → mempelajari pola dari data
```

### Contoh Prediksi Harga Rumah

Misalnya kita memiliki dataset:

| Luas | Kamar | Harga |
|---:|---:|---:|
| 50 | 2 | 250 juta |
| 70 | 2 | 350 juta |
| 90 | 3 | 500 juta |
| 110 | 4 | 650 juta |
| 130 | 4 | 750 juta |

Kita ingin membuat sistem yang dapat memprediksi harga rumah.

Dalam pemrograman tradisional, kita harus membuat aturan secara manual.

Misalnya:

```text
Jika luas 50–70 m² → harga sekitar ...
Jika luas 70–90 m² → harga sekitar ...
```

Aturan tersebut dapat menjadi sangat panjang dan sulit dipelihara.

Dengan Machine Learning, kita memberikan contoh:

```text
Luas + Kamar → Harga
```

Kemudian algoritma mempelajari pola dari contoh tersebut.

```text
Dataset
   ↓
Machine Learning Algorithm
   ↓
Training
   ↓
Model
```

Setelah model selesai dilatih:

```text
Rumah Baru
Luas = 85 m²
Kamar = 3
      ↓
    Model
      ↓
Prediksi Harga
```

Model menggunakan pola yang dipelajarinya untuk menghasilkan prediksi.

## Analogi Membuat Makanan

Untuk memahami perbedaan tersebut, kita dapat menggunakan analogi sederhana.

Bayangkan kita ingin membuat **Honey Mustard Chicken**.

### Program Tradisional

Dalam pendekatan tradisional, kita diberikan:

- bahan
- resep
- langkah-langkah memasak

Misalnya:

```text
Ayam
Mustard
Madu
Garam
Merica
Minyak
```

Kemudian diberikan instruksi:

```text
1. Potong ayam.
2. Tambahkan garam dan merica.
3. Campurkan madu dan mustard.
4. Masak ayam.
5. Tambahkan saus.
6. Panggang hingga matang.
```

Kita hanya perlu mengikuti resep tersebut.

```text
Bahan + Resep
      ↓
   Proses
      ↓
   Masakan
```

### Machine Learning

Dalam analogi Machine Learning, kita tidak diberikan resep secara langsung.

Kita diberikan:

```text
Bahan
 +
Contoh Masakan yang Benar
```

Kemudian sistem mencoba menemukan hubungan antara bahan dan hasil yang diinginkan.

Secara konseptual:

```text
Bahan
  +
Contoh Masakan
      ↓
   Learning
      ↓
  Pola / Recipe
      ↓
   Masakan Baru
```

Dalam Machine Learning yang sebenarnya, tentu prosesnya tidak dilakukan dengan mencoba memasak makanan secara literal.

Analogi tersebut hanya digunakan untuk menggambarkan ide bahwa **Machine Learning mempelajari pola dari contoh**, bukan menerima seluruh aturan secara eksplisit.

## Proses Training

Proses ketika Machine Learning mempelajari pola dari data disebut **training** atau pelatihan.

Secara sederhana:

```text
Training Data
      ↓
  Algorithm
      ↓
   Learning
      ↓
    Model
```

Misalnya kita memiliki data:

| Luas | Kamar | Harga |
|---:|---:|---:|
| 60 | 2 | 300 |
| 80 | 3 | 450 |
| 100 | 3 | 550 |
| 120 | 4 | 700 |

Algoritma mencoba menemukan hubungan antara:

```text
Feature
   ↓
Luas
Jumlah Kamar
   ↓
Target
   ↓
Harga
```

Hasil proses tersebut adalah model.

### Model Belajar dari Kesalahan

Dalam banyak algoritma Machine Learning, proses training melibatkan evaluasi terhadap hasil prediksi model.

Secara sederhana:

```text
Data
 ↓
Model membuat prediksi
 ↓
Prediksi dibandingkan dengan target
 ↓
Kesalahan dihitung
 ↓
Model diperbaiki
 ↓
Proses diulang
```

Misalnya target sebenarnya adalah:

```text
500 juta
```

tetapi model memprediksi:

```text
450 juta
```

Terdapat perbedaan antara prediksi dan nilai sebenarnya.

Perbedaan tersebut digunakan dalam proses pembelajaran untuk membantu model menghasilkan prediksi yang lebih baik.

Konsep mengenai **loss function**, **optimization**, dan bagaimana model diperbaiki akan dibahas lebih mendalam pada materi berikutnya.

## Data Baru dan Prediction

Setelah model selesai dilatih, model dapat digunakan untuk data yang belum pernah dilihat sebelumnya.

Misalnya:

```text
Training Data
     ↓
  Training
     ↓
    Model
```

Kemudian terdapat rumah baru:

```text
Luas = 90 m²
Kamar = 3
```

Model menerima data tersebut:

```text
Data Baru
    ↓
  Model
    ↓
Prediction
```

Hasilnya misalnya:

```text
Prediksi Harga = 500 juta
```

Angka tersebut merupakan contoh ilustrasi.

Model sebenarnya akan menghasilkan prediksi berdasarkan pola yang dipelajari dari dataset training.

## Data Analysis

Machine Learning memiliki hubungan yang erat dengan **Data Analysis**, tetapi keduanya bukan hal yang sama.

Data Analysis berfokus pada memahami data.

Contohnya:

- mencari rata-rata
- membandingkan kelompok
- mencari tren
- melihat distribusi
- membuat visualisasi
- menemukan hubungan antarvariabel

Misalnya kita ingin mengetahui:

> Produk apa yang paling banyak terjual?

Kita dapat menggunakan Data Analysis untuk menjawab pertanyaan tersebut.

```text
Dataset
   ↓
Data Analysis
   ↓
Insight
```

## Data Science

Data Science memiliki cakupan yang lebih luas.

Data Science dapat mencakup:

```text
Data Science
│
├── Data Collection
├── Data Cleaning
├── Data Analysis
├── Statistics
├── Data Visualization
├── Machine Learning
└── Communication / Decision Making
```

Machine Learning dapat menjadi salah satu bagian dari proses Data Science.

Misalnya perusahaan ingin meningkatkan penjualan.

Data Science dapat digunakan untuk:

```text
Data Penjualan
      ↓
Data Cleaning
      ↓
Data Analysis
      ↓
Visualization
      ↓
Machine Learning
      ↓
Prediksi Penjualan
      ↓
Business Decision
```

## Perbedaan Data Analysis, Data Science, dan Machine Learning

Ketiganya dapat dibedakan secara sederhana:

| Bidang | Fokus |
|---|---|
| Data Analysis | Memahami dan menganalisis data |
| Data Science | Menggunakan data untuk menghasilkan insight dan mendukung keputusan |
| Machine Learning | Mempelajari pola dari data untuk membuat prediksi atau keputusan |

Namun, dalam praktiknya batas antara ketiganya tidak selalu kaku.

Seorang Data Scientist dapat melakukan Data Analysis dan Machine Learning.

Seorang Machine Learning Engineer dapat bekerja sangat dekat dengan Data Scientist.

## Machine Learning sebagai Eksperimen

Machine Learning dapat dipandang sebagai proses eksperimen.

Kita tidak langsung mengetahui model atau algoritma mana yang akan memberikan hasil terbaik.

Kita dapat mencoba beberapa pendekatan.

Misalnya:

```text
Dataset
   ↓
Model A
   ↓
Evaluation

Dataset
   ↓
Model B
   ↓
Evaluation

Dataset
   ↓
Model C
   ↓
Evaluation
```

Kemudian hasilnya dibandingkan.

```text
Model A → Score 0.75
Model B → Score 0.82
Model C → Score 0.79
```

Berdasarkan evaluasi tersebut, kita dapat menentukan model yang lebih sesuai.

Nilai di atas hanya contoh ilustrasi.

Konsep perbandingan model akan menjadi bagian penting dalam pembelajaran Machine Learning.

## Machine Learning sebagai Proses Berulang

Machine Learning bukan proses sekali jalan.

Dalam proyek nyata, prosesnya sering dilakukan secara iteratif.

```text
Understand Problem
       ↓
Collect Data
       ↓
Prepare Data
       ↓
Train Model
       ↓
Evaluate
       ↓
Improve
       ↓
Train Again
       ↓
Evaluate Again
       ↓
Final Model
```

Kita mungkin menemukan bahwa performa model belum cukup baik.

Kemudian kita dapat:

- memperbaiki data
- memilih feature yang lebih baik
- mencoba algoritma lain
- mengubah hyperparameter
- menambah data
- melakukan feature engineering

Kemudian model dilatih kembali.

## Contoh Sederhana dengan Python

Sekarang kita dapat melihat gambaran sederhana proses Machine Learning menggunakan Python.

Kita menggunakan Linear Regression sebagai contoh.

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()

model.fit(X_train, y_train)

prediction = model.predict(X_test)
```

Secara sederhana:

```text
LinearRegression()
       ↓
     Model
       ↓
model.fit()
       ↓
   Training
       ↓
model.predict()
       ↓
  Prediction
```

Pada contoh tersebut:

- `LinearRegression()` membuat model
- `fit()` melakukan training
- `X_train` berisi feature untuk training
- `y_train` berisi target untuk training
- `predict()` menghasilkan prediksi
- `X_test` berisi data yang digunakan untuk melakukan prediksi

Pembahasan mengenai `X_train`, `y_train`, training data, testing data, dan evaluasi akan dilakukan secara bertahap.

## Kesimpulan

Machine Learning memungkinkan komputer mempelajari pola dari data dan menggunakan pola tersebut untuk membuat prediksi atau keputusan.

Perbedaan utama dengan pemrograman tradisional adalah cara aturan diperoleh.

Pemrograman tradisional:

```text
Rules + Data
     ↓
  Program
     ↓
  Output
```

Machine Learning:

```text
Data + Target
     ↓
  Algorithm
     ↓
  Training
     ↓
   Model
     ↓
Data Baru
     ↓
Prediction
```

Beberapa konsep penting yang perlu diingat:

- **Algorithm** adalah metode yang digunakan untuk melakukan pembelajaran.
- **Training** adalah proses ketika algoritma mempelajari pola dari data.
- **Model** adalah hasil dari proses training.
- **Feature** merupakan input yang digunakan model.
- **Target** merupakan nilai yang ingin diprediksi atau dipelajari.
- **Prediction** merupakan hasil model ketika diberikan data baru.

Machine Learning juga memiliki hubungan erat dengan Data Science dan Data Analysis, tetapi ketiganya memiliki fokus yang berbeda.
