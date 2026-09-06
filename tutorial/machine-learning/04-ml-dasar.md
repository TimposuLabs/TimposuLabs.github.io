---
sidebar_position: 5
title: "Machine Learning Dasar"
---

Machine Learning merupakan salah satu bidang dalam Artificial Intelligence yang memungkinkan komputer mempelajari pola dari data dan menggunakan pola tersebut untuk menghasilkan prediksi atau keputusan.

Sebelum memahami bagaimana Machine Learning bekerja secara teknis, kita perlu memahami terlebih dahulu perbedaan antara **pemrograman tradisional** dan **Machine Learning**.

## Pemrograman Tradisional

Dalam pemrograman tradisional, programmer menentukan aturan atau instruksi yang harus dijalankan oleh komputer.

Secara sederhana, prosesnya dapat digambarkan sebagai:

```text
Data + Rules
     ↓
  Komputer
     ↓
   Output
```

Programmer menentukan bagaimana komputer harus memproses data berdasarkan aturan yang telah dibuat.

Sebagai contoh, kita ingin membuat program untuk menentukan apakah seseorang sudah cukup umur.

```python
age = 20

if age >= 17:
    print("Dewasa")
else:
    print("Belum dewasa")
```

Pada contoh tersebut, programmer menentukan aturan:

> Jika umur lebih besar atau sama dengan 17, maka orang tersebut dianggap dewasa.

Komputer kemudian menjalankan aturan tersebut.

Pendekatan seperti ini sangat efektif apabila aturan untuk menyelesaikan suatu masalah dapat ditentukan dengan jelas.

## Keunggulan Pemrograman Tradisional

Komputer sangat baik dalam menjalankan instruksi yang sudah ditentukan.

Komputer dapat:

- melakukan perhitungan dengan cepat
- melakukan operasi berulang
- memproses data dalam jumlah besar
- menjalankan aturan secara konsisten
- melakukan proses otomatis berdasarkan logika yang telah ditentukan

Contohnya adalah program kalkulator.

Kita tidak perlu menggunakan Machine Learning untuk menghitung:

```text
10 + 20 = 30
```

Aturannya sudah jelas dan dapat diprogram secara langsung.

## Keterbatasan Pemrograman Tradisional

Masalah mulai muncul ketika kita menghadapi permasalahan yang **aturannya sulit dijelaskan secara eksplisit**.

Ada banyak hal yang mudah dilakukan manusia tetapi sangat sulit diterjemahkan menjadi sekumpulan aturan `if/else`.

Contohnya adalah mengenali gambar.

### Contoh: Membedakan Kucing dan Anjing

Manusia biasanya dapat melihat gambar dan dengan relatif mudah menentukan apakah gambar tersebut merupakan kucing atau anjing.

Kita mungkin menggunakan berbagai karakteristik seperti:

- bentuk wajah
- telinga
- mata
- hidung
- bulu
- bentuk tubuh
- ukuran
- dan karakteristik lainnya

Namun, bagaimana kita menuliskan aturan yang benar-benar lengkap untuk komputer?

Kita mungkin mencoba membuat aturan seperti:

```text
Jika memiliki kumis → kucing
Jika memiliki telinga panjang → anjing
Jika memiliki bulu tertentu → kucing
```

Masalahnya adalah aturan tersebut tidak selalu benar.

Ada kucing yang memiliki karakteristik berbeda dan ada anjing yang memiliki karakteristik yang mirip.

Selain itu, gambar dapat memiliki:

- pencahayaan berbeda
- sudut pengambilan berbeda
- ukuran berbeda
- latar belakang berbeda
- kualitas gambar berbeda
- posisi objek berbeda

Semakin kompleks masalahnya, semakin sulit bagi programmer untuk menentukan semua aturan secara manual.

## Contoh Lain: Mengenali Emosi

Manusia dapat memperkirakan apakah seseorang sedang:

- bahagia
- sedih
- marah
- takut
- terkejut

berdasarkan ekspresi wajah, suara, bahasa tubuh, dan konteks.

Tetapi sulit untuk membuat aturan seperti:

```text
Jika alis turun sekian derajat
dan mata menyipit
dan mulut membentuk pola tertentu
maka orang tersebut sedang marah.
```

Ekspresi setiap orang berbeda.

Karena itu, pendekatan berbasis aturan secara manual dapat menjadi sangat kompleks.

## Dari Rules ke Learning

Machine Learning memberikan pendekatan yang berbeda.

Daripada programmer menentukan seluruh aturan secara manual, komputer diberikan **data** dan metode pembelajaran sehingga komputer dapat menemukan pola dari data tersebut.

Perbandingan sederhananya:

```text
Pemrograman Tradisional

        Rules
          +
         Data
          ↓
      Program
          ↓
        Output
```

Sedangkan Machine Learning:

```text
         Data
          +
        Target
          ↓
  Algoritma Machine Learning
          ↓
        Model
          ↓
     Data Baru
          ↓
      Prediction
```

Perbedaan pentingnya terdapat pada bagaimana aturan atau pola diperoleh.

Pada pemrograman tradisional, aturan ditulis oleh programmer.

Pada Machine Learning, algoritma digunakan untuk **mempelajari pola dari data**.

## Apa Itu Machine Learning?

Secara sederhana:

> **Machine Learning adalah pendekatan dalam Artificial Intelligence yang memungkinkan komputer mempelajari pola dari data untuk menghasilkan prediksi atau keputusan.**

Istilah *learning* atau pembelajaran tidak berarti komputer belajar seperti manusia.

Dalam konteks Machine Learning, komputer melakukan proses komputasi terhadap data untuk menemukan pola atau hubungan tertentu.

Pola tersebut kemudian direpresentasikan dalam bentuk **model**.

Model tersebut dapat digunakan untuk melakukan prediksi terhadap data baru.

## Konsep Dasar Machine Learning

Secara umum, proses Machine Learning dapat digambarkan sebagai:

```text
Dataset
   ↓
Data Preparation
   ↓
Training
   ↓
Model
   ↓
Evaluation
   ↓
Prediction
```

Mari kita lihat setiap bagian secara sederhana.

### Dataset

Dataset adalah kumpulan data yang digunakan dalam proses Machine Learning.

Contohnya adalah dataset harga rumah:

| Luas Rumah | Jumlah Kamar | Harga |
|---:|---:|---:|
| 60 | 2 | 300 |
| 80 | 3 | 450 |
| 100 | 3 | 550 |
| 120 | 4 | 700 |

Dataset tersebut berisi informasi mengenai rumah dan harga jualnya.

### Feature

Feature adalah informasi yang digunakan sebagai input untuk membuat prediksi.

Pada contoh harga rumah, feature dapat berupa:

- luas rumah
- jumlah kamar
- jumlah kamar mandi
- lokasi
- usia bangunan

Misalnya:

```text
Luas Rumah
Jumlah Kamar
Jumlah Kamar Mandi
Lokasi
```

merupakan feature.

### Target

Target adalah nilai yang ingin diprediksi oleh model.

Pada contoh prediksi harga rumah:

```text
Feature
   ↓
Luas Rumah
Jumlah Kamar
Lokasi
   ↓
Target
   ↓
Harga Rumah
```

Harga rumah merupakan target.

## Training

Training adalah proses ketika algoritma Machine Learning mempelajari pola dari data.

Misalnya kita memiliki data:

```text
Luas Rumah → Harga
60 m²      → 300 juta
80 m²      → 450 juta
100 m²     → 550 juta
120 m²     → 700 juta
```

Algoritma Machine Learning menggunakan data tersebut untuk menemukan hubungan antara feature dan target.

Hasil proses tersebut adalah sebuah **model**.

```text
Training Data
      ↓
  Algoritma ML
      ↓
     Model
```

## Model

Model adalah hasil dari proses pembelajaran Machine Learning.

Model dapat digunakan untuk menghasilkan prediksi terhadap data yang belum pernah dilihat sebelumnya.

Misalnya model telah dilatih menggunakan data harga rumah.

Kemudian diberikan rumah baru:

```text
Luas Rumah = 90 m²
Jumlah Kamar = 3
```

Model dapat menghasilkan perkiraan harga berdasarkan pola yang telah dipelajari.

```text
Data Baru
    ↓
  Model
    ↓
Prediksi Harga
```

## Prediction

Prediction adalah hasil yang diberikan oleh model ketika menerima data baru.

Sebagai contoh:

```text
Luas Rumah = 90 m²
Jumlah Kamar = 3
        ↓
      Model
        ↓
Prediksi = 500 juta
```

Angka tersebut hanyalah contoh ilustrasi.

Model sebenarnya akan menghasilkan prediksi berdasarkan pola yang dipelajari dari dataset yang digunakan untuk training.

## Machine Learning Bukan Sekadar Prediksi

Machine Learning memang sering digunakan untuk membuat prediksi, tetapi penerapannya lebih luas.

Machine Learning dapat digunakan untuk:

- **Regression** - memprediksi nilai numerik
- **Classification** - menentukan kategori
- **Clustering** - menemukan kelompok dalam data
- **Recommendation** - memberikan rekomendasi
- **Anomaly Detection** - menemukan data yang tidak biasa

Contohnya:

| Permasalahan | Contoh |
|---|---|
| Regression | Prediksi harga rumah |
| Classification | Kucing atau anjing |
| Classification | Spam atau bukan spam |
| Clustering | Mengelompokkan pelanggan |
| Recommendation | Rekomendasi produk |
| Anomaly Detection | Mendeteksi transaksi mencurigakan |

Jenis-jenis Machine Learning tersebut akan dibahas lebih mendalam pada materi berikutnya.

## Contoh Penerapan Machine Learning

Machine Learning telah digunakan dalam berbagai bidang.

### Recommendation System

Platform digital dapat menggunakan Machine Learning untuk memberikan rekomendasi berdasarkan pola aktivitas pengguna.

Contohnya:

- rekomendasi film
- rekomendasi musik
- rekomendasi produk
- rekomendasi video

### Computer Vision

Machine Learning dapat digunakan untuk memproses dan memahami informasi dari gambar atau video.

Contohnya:

- pengenalan wajah
- deteksi objek
- klasifikasi gambar
- pengenalan tulisan

### Natural Language Processing

Machine Learning juga digunakan untuk memproses bahasa manusia.

Contohnya:

- penerjemahan bahasa
- chatbot
- analisis sentimen
- speech recognition
- text classification

### Fraud Detection

Pada bidang keuangan, Machine Learning dapat digunakan untuk membantu mendeteksi transaksi yang memiliki pola tidak biasa.

### Predictive Maintenance

Pada industri, Machine Learning dapat digunakan untuk memprediksi kemungkinan terjadinya kerusakan mesin berdasarkan data sensor dan riwayat penggunaan.

## Machine Learning dan Artificial Intelligence

Machine Learning merupakan salah satu bagian dari Artificial Intelligence.

Secara sederhana:

```text
Artificial Intelligence
        │
        ├── Machine Learning
        │       ├── Regression
        │       ├── Classification
        │       └── Clustering
        │
        └── Deep Learning
                ├── Neural Network
                ├── Computer Vision
                └── Natural Language Processing
```

Struktur tersebut merupakan gambaran sederhana karena hubungan antara bidang-bidang tersebut sebenarnya lebih kompleks.

Namun, untuk tahap awal, kita dapat memahami bahwa Machine Learning merupakan salah satu pendekatan penting dalam membangun sistem Artificial Intelligence.

## Machine Learning dengan Python

Python menjadi salah satu bahasa pemrograman yang banyak digunakan dalam Machine Learning karena memiliki ekosistem library yang sangat luas.

Beberapa library yang akan digunakan dalam pembelajaran ini antara lain:

- NumPy
- Pandas
- Matplotlib
- Seaborn
- Scikit-learn

Contoh sederhana penggunaan Scikit-learn:

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()

model.fit(X_train, y_train)

prediction = model.predict(X_test)
```

Kode tersebut menunjukkan gambaran sederhana proses training dan prediction.

Penjelasan mengenai setiap bagian akan dibahas secara bertahap pada materi berikutnya.

## Alur Belajar Machine Learning

Dalam pembelajaran Machine Learning, kita nantinya akan melewati beberapa tahap.

```text
Memahami Problem
       ↓
Mengumpulkan Data
       ↓
Memahami Dataset
       ↓
Data Preprocessing
       ↓
Exploratory Data Analysis
       ↓
Feature Engineering
       ↓
Memilih Algoritma
       ↓
Training Model
       ↓
Evaluasi Model
       ↓
Hyperparameter Tuning
       ↓
Model Final
       ↓
Deployment
```

Tidak semua proyek Machine Learning selalu mengikuti proses yang sama persis.

Namun, alur tersebut memberikan gambaran umum mengenai bagaimana sebuah proyek Machine Learning biasanya dikembangkan.

## Pemrograman Tradisional vs Machine Learning

Perbedaan keduanya dapat dirangkum sebagai berikut.

| Aspek | Pemrograman Tradisional | Machine Learning |
|---|---|---|
| Aturan | Ditentukan programmer | Dipelajari dari data |
| Input | Data dan rules | Data dan target/informasi pembelajaran |
| Proses | Menjalankan aturan | Mempelajari pola |
| Output | Hasil dari aturan | Model/prediksi |
| Cocok untuk | Aturan yang jelas | Pola yang sulit ditentukan secara manual |

Contoh sederhana:

```text
Pemrograman Tradisional

Rules + Data
     ↓
  Program
     ↓
  Output
```

Sedangkan:

```text
Machine Learning

Data + Target
     ↓
  Training
     ↓
   Model
     ↓
 Data Baru
     ↓
Prediction
```

## Apakah Machine Learning Selalu Lebih Baik?

Tidak.

Machine Learning bukan pengganti seluruh pemrograman tradisional.

Jika sebuah masalah dapat diselesaikan dengan aturan sederhana, pemrograman tradisional sering kali lebih mudah, cepat, dan mudah dipahami.

Contohnya:

```python
if age >= 17:
    status = "Dewasa"
```

Tidak ada alasan menggunakan Machine Learning untuk masalah sederhana seperti ini.

Machine Learning lebih tepat digunakan ketika terdapat pola atau hubungan yang sulit ditentukan secara manual dan tersedia data yang cukup untuk mempelajarinya.

## Kesimpulan

Pemrograman tradisional bekerja dengan pendekatan:

```text
Rules + Data → Output
```

Programmer menentukan aturan yang harus dijalankan oleh komputer.

Machine Learning menggunakan pendekatan yang berbeda:

```text
Data + Target → Training → Model → Prediction
```

Komputer menggunakan algoritma Machine Learning untuk mempelajari pola dari data.

Model yang dihasilkan kemudian dapat digunakan untuk membuat prediksi atau keputusan terhadap data baru.

Konsep-konsep penting yang perlu diingat:

- **Dataset** adalah kumpulan data yang digunakan dalam Machine Learning.
- **Feature** adalah informasi yang digunakan sebagai input model.
- **Target** adalah nilai yang ingin diprediksi atau dipelajari.
- **Training** adalah proses mempelajari pola dari data.
- **Model** adalah hasil dari proses pembelajaran.
- **Prediction** adalah hasil model ketika diberikan data baru.

Pada materi yang akan datang, kita akan membahas **jenis-jenis Machine Learning**, mulai dari **Supervised Learning, Unsupervised Learning, hingga pendekatan Machine Learning lainnya**.