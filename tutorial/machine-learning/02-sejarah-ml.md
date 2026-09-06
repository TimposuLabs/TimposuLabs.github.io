---
sidebar_position: 3
title: "Sejarah Machine Learning"
---

Machine Learning tidak muncul secara tiba-tiba.

Perkembangan Machine Learning sangat berkaitan dengan perkembangan **data**, **komputasi**, dan kebutuhan manusia untuk mengolah data dalam jumlah yang semakin besar.

Semakin banyak aktivitas manusia yang menghasilkan data, semakin besar pula kebutuhan untuk menemukan cara yang lebih efektif dalam menyimpan, mengolah, dan menganalisis data tersebut.

Secara sederhana, perkembangan tersebut dapat digambarkan sebagai:

```text
Data Semakin Banyak
        ↓
Penyimpanan Data
        ↓
Pengolahan Data
        ↓
Analisis Data
        ↓
Otomatisasi
        ↓
Machine Learning
```

Untuk memahami mengapa Machine Learning berkembang pesat, kita perlu melihat bagaimana cara manusia mengelola data dari waktu ke waktu.

## Awal Pengelolaan Data dengan Spreadsheet

Pada tahap awal, banyak bisnis menyimpan dan mengelola data menggunakan **spreadsheet**.

Contohnya adalah:

- Microsoft Excel
- Google Sheets

Data pelanggan, transaksi, penjualan, dan berbagai informasi bisnis dapat disimpan dalam bentuk baris dan kolom.

Contoh sederhana:

| Tanggal | Produk | Jumlah | Harga |
|---|---|---:|---:|
| 01-01-2025 | Laptop | 2 | 10.000.000 |
| 02-01-2025 | Mouse | 10 | 200.000 |
| 03-01-2025 | Keyboard | 5 | 500.000 |

Spreadsheet sangat berguna untuk data dalam jumlah kecil hingga menengah.

Pengguna dapat melakukan berbagai analisis menggunakan formula, filter, sorting, dan visualisasi.

### Contoh Penggunaan Spreadsheet

Sebuah perusahaan dapat menyimpan data penjualan selama beberapa tahun.

Kemudian seorang analis dapat melihat pola penjualan dan menemukan bahwa penjualan biasanya meningkat pada bulan Desember.

Dari informasi tersebut, perusahaan dapat mengambil keputusan seperti:

- meningkatkan persediaan
- menambah tenaga kerja
- meningkatkan promosi
- mempersiapkan distribusi

Pada tahap ini, **manusia masih menjadi bagian utama dalam proses analisis**.

Komputer membantu menyimpan dan menghitung data, tetapi manusia menentukan bagaimana data tersebut dianalisis dan bagaimana keputusan dibuat.

## Keterbatasan Spreadsheet

Seiring bertambahnya jumlah data, spreadsheet mulai memiliki keterbatasan.

Misalnya sebuah perusahaan memiliki jutaan transaksi.

Mengelola jutaan baris data menggunakan spreadsheet menjadi semakin sulit.

Beberapa masalah yang dapat muncul:

- file menjadi sangat besar
- proses pengolahan menjadi lambat
- sulit digunakan oleh banyak pengguna secara bersamaan
- sulit menjaga konsistensi data
- pengelolaan data menjadi kompleks
- analisis menjadi semakin sulit

Ketika kebutuhan terhadap data semakin besar, dibutuhkan sistem penyimpanan yang lebih terstruktur.

## Munculnya Relational Database

Untuk menangani data yang semakin besar dan kompleks, digunakan **relational database**.

Relational database menyimpan data dalam bentuk tabel yang memiliki hubungan satu sama lain.

Beberapa database relational yang populer antara lain:

- MySQL
- PostgreSQL
- Microsoft SQL Server
- Oracle Database

Data dapat diakses menggunakan bahasa **SQL (Structured Query Language)**.

Contohnya:

```sql
SELECT *
FROM customers;
```

SQL memungkinkan pengguna untuk melakukan berbagai operasi terhadap data, seperti:

- mengambil data
- menambahkan data
- memperbarui data
- menghapus data
- melakukan filtering
- melakukan agregasi
- menggabungkan beberapa tabel

Dengan database, pengelolaan data menjadi jauh lebih terstruktur dibandingkan hanya menggunakan spreadsheet.

## Contoh Data dalam Relational Database

Misalnya sebuah toko online memiliki beberapa tabel:

```text
customers
    │
    ├── customer_id
    ├── name
    └── email

products
    │
    ├── product_id
    ├── name
    └── price

orders
    │
    ├── order_id
    ├── customer_id
    └── order_date

order_items
    │
    ├── order_id
    ├── product_id
    └── quantity
```

Hubungan antar tabel memungkinkan perusahaan menyimpan data secara lebih terorganisir.

## Perkembangan Internet dan Big Data

Perkembangan internet kemudian menghasilkan perubahan yang jauh lebih besar.

Semakin banyak orang menggunakan:

- website
- mesin pencari
- media sosial
- marketplace
- aplikasi mobile
- layanan streaming
- perangkat IoT

Setiap aktivitas tersebut menghasilkan data.

Contohnya ketika seseorang menggunakan marketplace:

```text
Membuka aplikasi
       ↓
Melihat produk
       ↓
Mencari produk
       ↓
Mengklik produk
       ↓
Memasukkan ke keranjang
       ↓
Melakukan pembelian
```

Setiap aktivitas tersebut dapat menghasilkan data.

Dalam skala kecil, data tersebut mungkin masih mudah dikelola.

Namun, ketika dilakukan oleh jutaan atau bahkan miliaran pengguna, jumlah data yang dihasilkan menjadi sangat besar.

Kondisi tersebut kemudian dikenal dengan istilah **Big Data**.

## Apa Itu Big Data?

Big Data mengacu pada data yang memiliki ukuran, kecepatan pertumbuhan, dan kompleksitas yang sangat besar sehingga membutuhkan pendekatan dan teknologi khusus untuk menyimpan serta mengolahnya.

Big Data sering dibahas menggunakan beberapa karakteristik utama seperti:

- **Volume** - jumlah data sangat besar
- **Velocity** - data dihasilkan dengan sangat cepat
- **Variety** - bentuk data sangat beragam

Contohnya:

```text
Text
Images
Videos
Audio
Transactions
Logs
Sensor Data
User Activity
Location Data
```

Data tersebut tidak selalu berbentuk tabel sederhana seperti pada spreadsheet.

## Munculnya NoSQL

Relational database sangat kuat untuk data terstruktur.

Namun, perkembangan aplikasi modern menghasilkan banyak data dengan struktur yang lebih fleksibel.

Hal tersebut mendorong berkembangnya berbagai teknologi **NoSQL (Not Only SQL)**.

Contoh database NoSQL antara lain:

- MongoDB
- Cassandra
- Redis
- DynamoDB

Database NoSQL dapat digunakan untuk menangani berbagai kebutuhan data dengan struktur yang lebih fleksibel dan skala yang besar.

Namun, penting untuk dipahami bahwa NoSQL tidak berarti menggantikan relational database.

Keduanya memiliki karakteristik dan kebutuhan penggunaan yang berbeda.

## Dari Data Sedikit Menjadi Data Masif

Perkembangan pengelolaan data dapat digambarkan secara sederhana:

```text
Spreadsheet
     ↓
Relational Database
     ↓
Big Data
     ↓
Distributed Systems
     ↓
Data Engineering
     ↓
Data Science
     ↓
Machine Learning
```

Perkembangan tersebut tidak terjadi dalam satu langkah.

Berbagai teknologi berkembang secara bersamaan untuk menjawab kebutuhan yang semakin kompleks.

## Mengapa Machine Learning Dibutuhkan?

Pertanyaan penting berikutnya adalah:

> *Jika kita sudah memiliki database dan teknologi Big Data, mengapa kita masih membutuhkan Machine Learning?*

Jawabannya adalah karena **menyimpan data tidak sama dengan memahami data**.

Sebuah perusahaan mungkin memiliki miliaran baris data.

Namun, memiliki data dalam jumlah besar tidak otomatis membuat perusahaan mengetahui:

- pola apa yang terdapat di dalam data
- pelanggan mana yang akan berhenti
- produk apa yang akan dibeli
- transaksi mana yang mencurigakan
- berapa banyak produk yang akan terjual
- kondisi apa yang menyebabkan suatu kejadian

Manusia memiliki keterbatasan dalam menganalisis data dalam skala yang sangat besar.

## Keterbatasan Manusia

Manusia sangat baik dalam memahami konteks dan membuat keputusan.

Namun, manusia memiliki keterbatasan dalam memproses data dalam jumlah masif.

Bayangkan terdapat:

```text
1.000 data
```

Analisis manual mungkin masih memungkinkan.

Tetapi bagaimana jika terdapat:

```text
1.000.000 data
```

atau:

```text
1.000.000.000 data
```

Manusia tidak mungkin memeriksa setiap baris secara manual.

Bahkan dengan bantuan spreadsheet atau database, tetap diperlukan metode untuk menemukan pola secara otomatis.

Di sinilah Machine Learning menjadi sangat berguna.

## Machine Learning untuk Menemukan Pola

Machine Learning memungkinkan komputer mempelajari pola dari data.

Secara sederhana:

```text
Data dalam jumlah besar
          ↓
     Algoritma ML
          ↓
     Pola dipelajari
          ↓
        Model
          ↓
 Prediksi / Keputusan
```

Misalnya perusahaan memiliki data pelanggan:

```text
Customer
Age
Location
Total Purchase
Number of Orders
Last Purchase
Subscription
```

Dari data tersebut, Machine Learning dapat digunakan untuk mempelajari pola tertentu.

Contohnya adalah memprediksi apakah pelanggan kemungkinan akan berhenti menggunakan layanan.

## Contoh: Prediksi Penjualan

Sebuah perusahaan memiliki data penjualan selama beberapa tahun.

Data tersebut dapat berisi:

```text
Tanggal
Produk
Harga
Jumlah Terjual
Promosi
Musim
Lokasi
```

Dengan Machine Learning, perusahaan dapat membangun model yang mempelajari hubungan antara berbagai faktor tersebut dengan jumlah penjualan.

Kemudian model dapat digunakan untuk menghasilkan prediksi:

```text
Data Historis
      ↓
Training
      ↓
Model
      ↓
Data Bulan Berikutnya
      ↓
Prediksi Penjualan
```

Hasil prediksi tersebut dapat membantu perusahaan dalam mengambil keputusan.

## Perkembangan Hardware

Perkembangan Machine Learning juga tidak dapat dipisahkan dari perkembangan hardware.

Komputer modern memiliki kemampuan komputasi yang jauh lebih tinggi dibandingkan komputer pada masa lalu.

Perkembangan tersebut mencakup:

- CPU yang semakin cepat
- GPU yang semakin powerful
- kapasitas RAM yang semakin besar
- penyimpanan yang semakin besar
- cloud computing
- distributed computing

Khususnya untuk beberapa jenis Machine Learning dan Deep Learning, GPU dapat memberikan peningkatan kemampuan komputasi yang sangat signifikan.

## CPU dan GPU

Secara sederhana, CPU dirancang sebagai prosesor serbaguna yang sangat baik untuk berbagai jenis pekerjaan.

GPU pada awalnya banyak digunakan untuk pemrosesan grafis, tetapi arsitekturnya juga sangat cocok untuk jenis perhitungan tertentu yang dapat dilakukan secara paralel.

Machine Learning, terutama Deep Learning, banyak melakukan operasi matematika dalam jumlah besar.

Karena itu, GPU menjadi salah satu komponen penting dalam perkembangan modern Machine Learning.

Secara sederhana:

```text
Data Semakin Besar
        +
Komputasi Semakin Cepat
        +
Algoritma Semakin Baik
        ↓
Machine Learning Berkembang
```

## Peran Data Science

Memiliki data dalam jumlah besar belum tentu berarti data tersebut siap digunakan untuk Machine Learning.

Data dunia nyata sering kali berantakan.

Contohnya:

```text
Nama        Umur    Kota        Pendapatan
Andi        25      Jakarta     5000000
Budi        -       Jakarta     6000000
Citra       27      jakarta     5500000
Deni        31      -           7000000
```

Kita dapat menemukan berbagai masalah:

- nilai kosong
- format tidak konsisten
- data duplikat
- kesalahan input
- outlier
- data tidak relevan
- format berbeda

Sebelum data digunakan untuk Machine Learning, data perlu dipahami dan dipersiapkan.

Di sinilah Data Science memiliki peran penting.

## Data Science sebagai Penghubung

Data Science membantu mengubah data mentah menjadi informasi yang dapat digunakan.

Secara sederhana:

```text
Raw Data
    ↓
Data Collection
    ↓
Data Cleaning
    ↓
Data Analysis
    ↓
Feature Engineering
    ↓
Machine Learning
    ↓
Model
    ↓
Insight / Prediction
```

Data Scientist dapat menggunakan berbagai tools dan teknik untuk memahami serta mempersiapkan data.

## Mengapa Data Cleaning Penting?

Machine Learning sangat bergantung pada kualitas data.

Jika data yang digunakan memiliki banyak kesalahan, model juga dapat menghasilkan prediksi yang buruk.

Prinsip sederhananya:

```text
Data Buruk
    ↓
Model
    ↓
Prediksi Buruk
```

Sebaliknya:

```text
Data Berkualitas
    ↓
Model
    ↓
Prediksi Lebih Baik
```

Namun, data yang bersih tidak secara otomatis menjamin model akan memiliki performa yang baik.

Kualitas model juga dipengaruhi oleh banyak faktor lain, seperti:

- pemilihan feature
- algoritma
- parameter
- kualitas dataset
- jumlah data
- evaluasi model
- dan cara training

## Hubungan Data, Data Science, dan Machine Learning

Kita dapat melihat hubungan sederhananya sebagai berikut:

```text
                 DATA
                   ↓
             Data Science
                   ↓
        Data Understanding
                   ↓
            Data Cleaning
                   ↓
        Feature Engineering
                   ↓
          Machine Learning
                   ↓
                Model
                   ↓
          Prediction / Insight
```

Data Science membantu mempersiapkan dan memahami data.

Machine Learning kemudian dapat digunakan untuk mempelajari pola dan membuat prediksi.

Dalam praktiknya, batas antara Data Science dan Machine Learning dapat saling tumpang tindih.

## Evolusi Secara Sederhana

Perjalanan perkembangan teknologi data dapat diringkas sebagai berikut:

```text
Spreadsheet
     ↓
Database
     ↓
Relational Database
     ↓
Big Data
     ↓
NoSQL / Distributed Systems
     ↓
Data Science
     ↓
Machine Learning
     ↓
Deep Learning
     ↓
AI Modern
```

Setiap tahap muncul karena adanya kebutuhan baru.

Ketika data masih sedikit, spreadsheet sudah cukup.

Ketika data semakin besar dan terstruktur, database menjadi penting.

Ketika data menjadi sangat besar dan beragam, dibutuhkan teknologi Big Data dan distributed systems.

Ketika jumlah data terlalu besar untuk dianalisis secara manual, dibutuhkan pendekatan Data Science dan Machine Learning untuk menemukan pola serta menghasilkan insight secara lebih otomatis.

## Faktor Utama Perkembangan Machine Learning

Ada beberapa faktor yang sangat berperan dalam perkembangan Machine Learning modern.

### 1. Pertumbuhan Data

Semakin banyak aktivitas digital menghasilkan data.

```text
Internet
   ↓
Aplikasi
   ↓
Pengguna
   ↓
Aktivitas
   ↓
Data
```

Semakin banyak data tersedia, semakin banyak pula informasi yang dapat digunakan untuk melatih model Machine Learning.

### 2. Perkembangan Komputasi

Kemampuan komputer terus meningkat.

CPU, GPU, cloud computing, dan distributed computing memungkinkan data dalam jumlah besar diproses dengan lebih cepat.

### 3. Perkembangan Algoritma

Algoritma Machine Learning juga terus berkembang.

Peneliti dan engineer mengembangkan berbagai metode baru untuk:

- meningkatkan akurasi
- mempercepat training
- menangani dataset yang lebih besar
- menangani data yang lebih kompleks

### 4. Kebutuhan Bisnis

Perusahaan memiliki kebutuhan untuk menggunakan data dalam pengambilan keputusan.

Contohnya:

- meningkatkan penjualan
- mengurangi fraud
- memahami pelanggan
- meningkatkan efisiensi
- memprediksi permintaan
- melakukan otomatisasi

Machine Learning dapat membantu memenuhi kebutuhan tersebut.

## Kesimpulan

Perkembangan Machine Learning tidak dapat dipisahkan dari perkembangan **data dan komputasi**.

Perjalanan sederhananya dapat digambarkan:

```text
Spreadsheet
     ↓
Database
     ↓
Big Data
     ↓
Data Science
     ↓
Machine Learning
```

Pada awalnya, manusia dapat menganalisis data secara manual menggunakan spreadsheet.

Ketika jumlah data semakin besar, database digunakan untuk menyimpan dan mengelolanya secara lebih efektif.

Kemudian perkembangan internet dan aplikasi digital menghasilkan data dalam jumlah yang sangat besar dan beragam.

Manusia akhirnya menghadapi keterbatasan dalam menganalisis seluruh data tersebut secara manual.

Machine Learning memberikan pendekatan untuk membuat komputer mempelajari pola dari data dan menghasilkan prediksi atau keputusan.

Namun, Machine Learning tidak dapat dipisahkan dari kualitas data.

Data Science memiliki peran penting dalam memahami, membersihkan, dan mempersiapkan data sebelum digunakan dalam proses Machine Learning.

Dengan demikian, perkembangan Machine Learning didorong oleh kombinasi beberapa faktor:

```text
Data Semakin Banyak
        +
Komputasi Semakin Kuat
        +
Algoritma Semakin Baik
        +
Kebutuhan Bisnis
        ↓
Machine Learning Berkembang
```

Pada materi berikutnya, kita akan mulai membahas **jenis-jenis Machine Learning**, termasuk Supervised Learning, Unsupervised Learning, dan bagaimana masing-masing pendekatan digunakan untuk menyelesaikan masalah yang berbeda.