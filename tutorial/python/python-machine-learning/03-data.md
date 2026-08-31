---
sidebar_position: 3
title: "Evolusi Data"
---

## Mengapa Machine Learning Dibutuhkan?

Machine Learning muncul bukan secara tiba-tiba. Perkembangannya berkaitan erat dengan **pertumbuhan data** dan kebutuhan manusia serta perusahaan untuk mengolah data tersebut menjadi informasi yang berguna.

Seiring bertambahnya jumlah data, cara manusia dalam menyimpan dan menganalisis data juga mengalami perubahan.

Secara sederhana, evolusinya dapat digambarkan sebagai berikut:

```text
Spreadsheet
    ↓
Database Relasional
    ↓
Big Data
    ↓
  NoSQL
    ↓
Machine Learning
```

Semakin besar dan kompleks data yang tersedia, semakin sulit jika seluruh proses analisis dilakukan secara manual.

---

## Evolusi Pengelolaan Data

### Spreadsheet

Pada tahap awal, banyak data bisnis disimpan menggunakan **spreadsheet** seperti Excel atau CSV.

Contohnya:

```text
Tanggal     Produk      Jumlah
------------------------------
01-12-2025  Laptop         10
02-12-2025  Mouse          25
03-12-2025  Keyboard       15
```

Data dalam bentuk baris dan kolom relatif mudah dikelola ketika jumlahnya masih kecil.

Manusia dapat membaca data tersebut dan melakukan analisis secara manual untuk membantu mengambil keputusan.

Misalnya, perusahaan dapat melihat data penjualan tahun sebelumnya:

```text
Data Penjualan
      ↓
Analisis Manual
      ↓
Menemukan Pola
      ↓
Keputusan Bisnis
```

Contohnya, jika penjualan selalu meningkat menjelang bulan Desember, perusahaan dapat memperkirakan bahwa permintaan pada Desember berikutnya juga akan meningkat.

Namun, pendekatan manual memiliki keterbatasan ketika jumlah data semakin besar.

---

## Database Relasional

Ketika data bisnis semakin banyak, spreadsheet mulai kurang ideal untuk mengelola data dalam skala besar.

Kemudian digunakan **database relasional** seperti MySQL.

Database memungkinkan data disimpan secara lebih terstruktur dan dapat diakses menggunakan **SQL (Structured Query Language)**.

Contohnya:

```text
Database
│
├── Customers
├── Products
├── Orders
└── Transactions
```

Dengan database, aplikasi dapat melakukan operasi terhadap data secara lebih terstruktur.

```text
Application
     ↓
    SQL
     ↓
 Database
     ↓
   Data
```

Database relasional menjadi solusi penting untuk menangani data bisnis yang terstruktur.

---

## Era Big Data

Perkembangan internet dan layanan digital kemudian menghasilkan jumlah data yang jauh lebih besar.

Perusahaan teknologi besar seperti:

```text
Google
Facebook
Amazon
```

dapat mengumpulkan data dari berbagai aktivitas pengguna.

Data tersebut tidak hanya berupa transaksi bisnis sederhana, tetapi juga dapat berupa:

```text
Riwayat pencarian
Like
Klik
Komentar
Riwayat pembelian
Aktivitas pengguna
Interaksi dengan konten
```

Jumlah data yang sangat besar ini sering disebut sebagai **Big Data**.

Masalahnya bukan hanya ukuran data, tetapi juga:

```text
Volume
Variety
Velocity
```

Data dapat memiliki jumlah yang sangat besar, format yang beragam, dan terus bertambah dengan cepat.

---

## Munculnya NoSQL

Database relasional tidak selalu menjadi solusi ideal untuk semua jenis data dalam skala yang sangat besar.

Kemudian berkembang berbagai teknologi **NoSQL** yang dirancang untuk menangani kebutuhan tertentu, termasuk data dengan struktur yang lebih fleksibel.

Salah satu contoh database NoSQL adalah:

```text
MongoDB
```

Berbeda dengan tabel relasional yang memiliki struktur kolom tertentu, database seperti MongoDB dapat menyimpan data dengan struktur yang lebih fleksibel.

Hal ini membantu aplikasi menangani berbagai jenis data dalam skala besar.

---

## Mengapa Data yang Besar Menjadi Masalah?

Bayangkan sebuah perusahaan memiliki:

```text
1.000 data
```

Manusia mungkin masih dapat melakukan analisis tertentu secara manual.

Namun bagaimana jika jumlahnya menjadi:

```text
1.000.000 data
```

atau:

```text
1.000.000.000 data
```

Menganalisis setiap baris secara manual menjadi tidak realistis.

Gambaran sederhananya:

```text
Data sedikit
    ↓
Manusia dapat menganalisis
```

sedangkan:

```text
Big Data
    ↓
Data terlalu banyak
    ↓
Analisis manual menjadi sulit
    ↓
Membutuhkan otomatisasi
```

Di sinilah Machine Learning menjadi semakin penting.

---

## Machine Learning sebagai Solusi

Machine Learning memungkinkan komputer membantu manusia menganalisis data dalam jumlah besar dan menemukan pola yang sulit ditemukan secara manual.

Secara sederhana:

```text
Data dalam jumlah besar
          ↓
   Machine Learning
          ↓
   Pattern / Pola
          ↓
      Insight
          ↓
   Decision / Action
```

Komputer dapat memproses data dalam jumlah yang sangat besar dan mempelajari pola berdasarkan data tersebut.

Tujuannya bukan sekadar menyimpan data, tetapi **mengubah data menjadi informasi yang dapat digunakan**.

---

## Dari Analisis Manual ke Analisis Otomatis

Perubahan pendekatannya dapat digambarkan sebagai berikut.

### Pendekatan Manual

```text
Data
 ↓
Manusia membaca data
 ↓
Manusia mencari pola
 ↓
Manusia mengambil keputusan
```

### Pendekatan Machine Learning

```text
Data
 ↓
Machine Learning
 ↓
Model mempelajari pola
 ↓
Prediksi / Insight
 ↓
Keputusan
```

Dengan demikian, Machine Learning membantu mengurangi ketergantungan pada analisis manual ketika jumlah data menjadi sangat besar.

---

## Dua Faktor Penting Perkembangan Machine Learning

Perkembangan Machine Learning didukung oleh setidaknya dua faktor utama.

### 1. Kelimpahan Data

Perkembangan teknologi digital menghasilkan data dalam jumlah yang sangat besar.

Contohnya:

```text
Website
Social Media
E-commerce
Smartphone
IoT
Aplikasi Digital
```

Semakin banyak aktivitas digital, semakin banyak pula data yang tersedia untuk dianalisis.

```text
Lebih banyak aktivitas digital
          ↓
Lebih banyak data
          ↓
Lebih banyak informasi untuk dipelajari
```

### 2. Peningkatan Kemampuan Komputasi

Komputer modern memiliki kemampuan komputasi yang jauh lebih tinggi dibandingkan komputer pada masa sebelumnya.

Perkembangan:

```text
CPU
GPU
Memory
Storage
Cloud Computing
```

membuat pemrosesan data dalam jumlah besar menjadi semakin memungkinkan.

Kombinasi antara **data yang melimpah** dan **kemampuan komputasi yang meningkat** menjadi salah satu faktor penting berkembangnya Machine Learning.

---

## Machine Learning dalam Bisnis

Machine Learning memberikan banyak manfaat bagi perusahaan karena dapat membantu mengolah data pengguna dan menghasilkan prediksi atau rekomendasi.

Salah satu contoh paling mudah ditemukan adalah **sistem rekomendasi**.

---

## Sistem Rekomendasi

Platform e-commerce dapat memiliki data seperti:

```text
Produk yang dilihat
Produk yang dibeli
Produk yang dicari
Produk yang disukai
Riwayat transaksi
```

Data tersebut dapat digunakan untuk mempelajari perilaku pengguna.

Secara sederhana:

```text
Aktivitas Pengguna
       ↓
      Data
       ↓
Machine Learning
       ↓
Pola Preferensi
       ↓
Rekomendasi Produk
```

Contohnya, jika seseorang sering membeli produk elektronik, sistem dapat memberikan rekomendasi produk elektronik yang mungkin menarik bagi pengguna tersebut.

---

## Personalisasi Konten

Machine Learning juga dapat digunakan untuk melakukan personalisasi pada platform digital.

Contohnya:

```text
Social Media
Streaming
Advertising
News Feed
```

Setiap pengguna dapat memiliki pengalaman yang berbeda karena sistem mempelajari pola interaksi masing-masing pengguna.

Misalnya:

```text
Pengguna
   ↓
Riwayat Interaksi
   ↓
Machine Learning
   ↓
Preferensi
   ↓
Konten yang Dipersonalisasi
```

Dengan pendekatan ini, sistem dapat memilih konten yang diperkirakan lebih relevan bagi pengguna tertentu.

---

## Contoh Alur dalam Platform Digital

Bayangkan seseorang menggunakan platform e-commerce.

Aktivitas pengguna:

```text
Melihat laptop
     ↓
Mencari laptop
     ↓
Melihat aksesoris laptop
     ↓
Membeli laptop
```

Aktivitas tersebut menghasilkan data.

```text
User Activity
      ↓
Data Collection
      ↓
Machine Learning
      ↓
User Pattern
      ↓
Recommendation
```

Sistem kemudian dapat menggunakan pola tersebut untuk memberikan rekomendasi yang lebih relevan.

---

## Dari Data Menjadi Keputusan

Salah satu alasan utama Machine Learning digunakan adalah untuk membantu mengubah data menjadi sesuatu yang lebih berguna.

```text
Raw Data
   ↓
Processing
   ↓
Pattern
   ↓
Insight
   ↓
Prediction
   ↓
Decision
```

Dalam konteks bisnis:

```text
Data Pelanggan
    ↓
Analisis
    ↓
Pola Perilaku
    ↓
Prediksi
    ↓
Strategi Bisnis
```

Dengan demikian, nilai data tidak hanya terletak pada jumlahnya, tetapi juga pada kemampuan untuk memanfaatkannya.

---

## Mengapa Tidak Cukup Menggunakan Database?

Database dan Machine Learning memiliki tujuan yang berbeda.

Database terutama digunakan untuk:

```text
Menyimpan data
Mengorganisasi data
Mengambil data
Memperbarui data
```

Sedangkan Machine Learning digunakan untuk:

```text
Mempelajari pola
Membuat prediksi
Melakukan klasifikasi
Menemukan hubungan
Mendukung pengambilan keputusan
```

Keduanya dapat digunakan bersama.

Contohnya:

```text
Database
   ↓
Menyimpan data pengguna
   ↓
Data dikumpulkan
   ↓
Machine Learning
   ↓
Mempelajari pola
   ↓
Prediction / Recommendation
```

Database menyediakan data, sedangkan Machine Learning dapat membantu menemukan pola dari data tersebut.

---

## Gambaran Evolusi

Perkembangan kebutuhan pengolahan data dapat dirangkum sebagai berikut:

```text
Spreadsheet
     ↓
Data mulai bertambah
     ↓
Database Relasional
     ↓
Data semakin besar dan beragam
     ↓
Big Data & NoSQL
     ↓
Data terlalu kompleks untuk dianalisis manual
     ↓
Machine Learning
     ↓
Otomatisasi analisis dan prediksi
```

Perubahan tersebut menunjukkan bahwa Machine Learning merupakan salah satu respons terhadap meningkatnya jumlah dan kompleksitas data.

---

## Ringkasan

Beberapa poin penting yang perlu dipahami:

- Pada awalnya, data bisnis banyak dikelola menggunakan **spreadsheet** seperti Excel dan CSV.
- Ketika data semakin besar, digunakan **database relasional** seperti MySQL.
- Perkembangan layanan digital menghasilkan **Big Data** dengan volume dan variasi yang jauh lebih besar.
- Teknologi **NoSQL** berkembang untuk menangani kebutuhan penyimpanan data yang lebih fleksibel pada skala tertentu.
- Manusia memiliki keterbatasan dalam menganalisis data yang sangat besar secara manual.
- Machine Learning membantu komputer mempelajari pola dari data dan menghasilkan prediksi atau insight.
- Perkembangan Machine Learning didukung oleh **ketersediaan data dalam jumlah besar** dan **peningkatan kemampuan komputasi**.
- Contoh penerapannya antara lain **sistem rekomendasi** dan **personalisasi konten**.

---

## Kesimpulan

Kebutuhan terhadap Machine Learning semakin besar seiring dengan pertumbuhan data.

Dahulu:

```text
Data sedikit
   ↓
Manusia menganalisis
   ↓
Keputusan
```

Sekarang:

```text
Data sangat besar
     ↓
Machine Learning
     ↓
Pola & Prediksi
     ↓
Keputusan
```

Machine Learning tidak menggantikan seluruh fungsi database atau analisis data. Sebaliknya, Machine Learning menjadi salah satu teknologi yang membantu manusia **memanfaatkan data dalam skala yang tidak lagi praktis untuk dianalisis secara manual**.

Dengan memahami alasan mengapa Machine Learning dibutuhkan, kita dapat lebih mudah memahami tahap berikutnya: **bagaimana data digunakan untuk melatih sebuah model dan bagaimana model tersebut menghasilkan prediksi**.