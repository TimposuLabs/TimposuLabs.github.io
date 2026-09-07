---
sidebar_position: 1
---

# Pengenalan Pandas

![Pandas](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv70QF-eOvUFUmuIao3nA3gw12j6ToBmmXdcW2mGOZ1Q&s)

**Pandas** adalah salah satu library Python yang sangat populer untuk bekerja dengan data.

Dalam perjalanan belajar Data Science dan Machine Learning, kita akan sering berhadapan dengan data dalam jumlah besar dan bentuk yang beragam.

Data tersebut dapat berasal dari:

- File CSV
- Database
- Excel
- API
- Sistem aplikasi
- Hasil observasi
- Sensor
- Dataset penelitian
- Data transaksi
- Data pengguna

Sebelum data tersebut dapat digunakan untuk Machine Learning, biasanya kita perlu memahami dan mempersiapkannya terlebih dahulu.

Di sinilah Pandas memiliki peran penting.

---

## Kenapa Belajar Pandas?

Machine Learning pada dasarnya tidak hanya tentang memilih algoritma dan membuat model.

Salah satu bagian terbesar dalam pekerjaan Machine Learning justru berhubungan dengan **data**.

Kita dapat memiliki algoritma Machine Learning yang sangat baik, tetapi jika data yang digunakan bermasalah, hasil model juga dapat menjadi buruk.

Secara sederhana:

```text
Data
  ↓
Memahami Data
  ↓
Membersihkan Data
  ↓
Mempersiapkan Data
  ↓
Machine Learning
  ↓
Model
```

Pandas membantu kita terutama pada bagian yang berhubungan dengan data.

Karena itu, Pandas menjadi salah satu skill dasar yang penting untuk dipelajari sebelum masuk lebih jauh ke Machine Learning.

---

## Pandas dalam Data Science

Pandas tidak hanya digunakan untuk Machine Learning.

Pandas merupakan salah satu tool penting dalam ekosistem **Data Science**.

Secara umum, Data Science dapat melibatkan proses:

```text
Mengumpulkan Data
       ↓
Memahami Data
       ↓
Membersihkan Data
       ↓
Menganalisis Data
       ↓
Memvisualisasikan Data
       ↓
Membuat Model
       ↓
Menghasilkan Insight
```

Pandas banyak digunakan pada tahap yang berhubungan dengan:

- pengolahan data
- eksplorasi data
- pembersihan data
- transformasi data
- analisis data
- persiapan data

Dengan kata lain, Pandas merupakan salah satu jembatan antara **data mentah** dan **informasi yang siap digunakan**.

---

## Peran Pandas dalam Machine Learning

Dalam Machine Learning, data biasanya belum langsung siap diberikan kepada algoritma.

Misalnya kita memiliki data pelanggan:

```text
Nama | Umur | Kota | Pendapatan | Membeli Produk
```

Data tersebut mungkin memiliki berbagai masalah:

```text
Data kosong
Data duplikat
Format tidak konsisten
Tipe data tidak sesuai
Kategori yang berbeda
Outlier
Kolom yang tidak diperlukan
```

Sebelum digunakan untuk Machine Learning, data tersebut perlu dipahami dan dipersiapkan.

Pandas membantu proses tersebut.

Secara sederhana:

```text
Dataset
   ↓
 Pandas
   ↓
Data yang lebih terstruktur
   ↓
Preprocessing
   ↓
Machine Learning Model
```

---

## Pandas Bukan Algoritma Machine Learning

Hal penting yang perlu dipahami adalah **Pandas bukan algoritma Machine Learning**.

Pandas digunakan untuk bekerja dengan data.

Sedangkan algoritma Machine Learning digunakan untuk mempelajari pola dari data.

Contohnya:

```text
Pandas
  ↓
Mengolah dan mempersiapkan data
  ↓
Scikit-Learn
  ↓
Membuat dan melatih model Machine Learning
```

Jadi, Pandas dan library Machine Learning memiliki peran yang berbeda.

---

## Contoh Alur Sederhana

Bayangkan kita ingin membuat model untuk memprediksi harga rumah.

Kita mempunyai dataset:

```text
Luas Rumah
Jumlah Kamar
Lokasi
Usia Bangunan
Harga Rumah
```

Pandas dapat digunakan untuk membantu kita memahami dataset tersebut.

Misalnya kita ingin mengetahui:

- Berapa banyak data yang tersedia?
- Kolom apa saja yang tersedia?
- Apakah terdapat data kosong?
- Apakah terdapat data yang tidak masuk akal?
- Bagaimana distribusi data?
- Apakah ada data duplikat?
- Bagaimana hubungan antarvariabel?

Setelah data dipahami dan dipersiapkan, barulah data tersebut dapat diteruskan ke tahap Machine Learning.

---

## Pandas dan Data Preprocessing

Salah satu alasan utama Pandas penting dalam Machine Learning adalah karena **data preprocessing** merupakan bagian penting dari workflow Machine Learning.

Data mentah biasanya tidak langsung dapat digunakan.

Contohnya:

```text
Data Mentah
    ↓
Cleaning
    ↓
Transformation
    ↓
Feature Preparation
    ↓
Training Data
    ↓
Machine Learning
```

Pandas sering digunakan pada tahap awal sebelum data diproses lebih lanjut menggunakan library Machine Learning.

Namun, tidak semua preprocessing harus dilakukan menggunakan Pandas.

Untuk beberapa proses tertentu, kita juga dapat menggunakan tools dari library seperti Scikit-Learn.

---

## Pandas dan Eksplorasi Data

Sebelum membuat model, kita perlu memahami data terlebih dahulu.

Proses ini sering disebut **Exploratory Data Analysis (EDA)**.

Tujuannya bukan langsung membuat model, tetapi mencari tahu karakteristik dataset.

Contohnya:

```text
Apa isi dataset?
       ↓
Berapa jumlah data?
       ↓
Apa saja variabelnya?
       ↓
Apakah ada masalah pada data?
       ↓
Bagaimana distribusi datanya?
       ↓
Apakah terdapat pola tertentu?
```

Pandas menjadi salah satu tool utama yang sering digunakan dalam proses tersebut.

---

## Pandas sebagai Jembatan Menuju Machine Learning

Bagi seseorang yang baru belajar Machine Learning, Pandas dapat dipandang sebagai jembatan.

```text
Python
  ↓
NumPy
  ↓
Pandas
  ↓
Data Visualization
  ↓
Data Preprocessing
  ↓
Machine Learning
```

Pandas membantu kita beralih dari sekadar belajar pemrograman Python menjadi bekerja dengan dataset nyata.

Setelah memahami Pandas, kita akan lebih mudah memahami konsep seperti:

- feature
- target
- missing value
- categorical data
- numerical data
- dataset
- training data
- testing data
- preprocessing

---

## Hubungan Pandas dengan Tools Lain

Dalam workflow Data Science dan Machine Learning, Pandas biasanya tidak bekerja sendirian.

Ekosistem sederhananya dapat digambarkan seperti:

```text
Python
  │
  ├── NumPy
  │      └── Numerical Computing
  │
  ├── Pandas
  │      └── Data Manipulation
  │
  ├── Matplotlib / Seaborn
  │      └── Data Visualization
  │
  └── Scikit-Learn
         └── Machine Learning
```

Masing-masing memiliki fokus yang berbeda.

Pandas berfokus pada **data manipulation dan analysis**.

---

## Pandas dalam Workflow Machine Learning

Jika kita melihat workflow Machine Learning secara keseluruhan:

```text
Problem Definition
       ↓
Data Collection
       ↓
Data Understanding
       ↓
Data Exploration
       ↓
Data Cleaning
       ↓
Data Preprocessing
       ↓
Feature Engineering
       ↓
Model Training
       ↓
Model Evaluation
       ↓
Model Deployment
```

Pandas banyak berperan pada bagian:

```text
Data Understanding
        ↓
Data Exploration
        ↓
Data Cleaning
        ↓
Data Preparation
        ↓
Feature Engineering
```

Namun, Pandas bukan satu-satunya tool yang digunakan pada tahap tersebut.

---

## Kenapa Pandas Penting untuk Dipelajari Sebelum Machine Learning?

Ada alasan praktis mengapa Pandas sebaiknya dipelajari sebelum masuk terlalu jauh ke Machine Learning.

Ketika belajar Machine Learning, perhatian kita seharusnya tidak hanya tertuju pada algoritma.

Kita juga harus mampu menjawab pertanyaan:

> "Data seperti apa yang sedang saya berikan kepada model?"

Jika belum memahami data, kita akan kesulitan memahami mengapa sebuah model menghasilkan prediksi tertentu.

Karena itu, kemampuan mengolah dan memahami data merupakan fondasi penting sebelum mempelajari algoritma Machine Learning secara lebih mendalam.

---

## Pandas Bukan Pengganti Pemahaman Data

Menguasai Pandas bukan berarti otomatis memahami Data Science atau Machine Learning.

Pandas hanyalah sebuah **tool**.

Yang lebih penting adalah memahami:

```text
Data
  ↓
Masalah
  ↓
Informasi
  ↓
Transformasi
  ↓
Model
  ↓
Insight / Prediction
```

Pandas membantu kita melakukan sebagian proses tersebut, tetapi keputusan mengenai bagaimana data harus diperlakukan tetap membutuhkan pemahaman terhadap masalah dan karakteristik data.

---

## Gambaran Skill yang Akan Dibangun

Dalam pembelajaran berikutnya, Pandas akan membawa kita secara bertahap dari:

```text
Data Mentah
    ↓
Mengenali Struktur Data
    ↓
Memahami Isi Data
    ↓
Membersihkan Data
    ↓
Mengubah Data
    ↓
Menganalisis Data
    ↓
Menyiapkan Data
    ↓
Machine Learning
```

Dengan demikian, belajar Pandas bukan sekadar belajar library Python.

Tujuan utamanya adalah membangun **kemampuan bekerja dengan data**.

---

## Kesimpulan

Pandas adalah library Python yang digunakan untuk bekerja dengan data dan merupakan salah satu tool penting dalam ekosistem Data Science.

Dalam Machine Learning, Pandas terutama membantu kita pada tahap:

- memahami dataset
- eksplorasi data
- membersihkan data
- mengolah data
- melakukan transformasi
- mempersiapkan data untuk proses berikutnya

Pandas bukan algoritma Machine Learning.

Hubungannya dapat disederhanakan menjadi:

```text
Pandas
   ↓
Mengolah dan memahami data
   ↓
Data Preparation
   ↓
Machine Learning Library
   ↓
Model
```

Dengan memahami Pandas, kita akan memiliki fondasi yang lebih kuat untuk mempelajari **data preprocessing, feature engineering, dan Machine Learning**.
