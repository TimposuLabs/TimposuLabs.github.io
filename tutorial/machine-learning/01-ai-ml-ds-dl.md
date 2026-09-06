---
sidebar_position: 2
title: "Hubungan AI, Machine Learning, Deep Learning & Data Science"
---

Dalam dunia teknologi modern, kita sering mendengar istilah **Artificial Intelligence (AI)**, **Machine Learning (ML)**, **Deep Learning**, dan **Data Science**.

Keempat istilah tersebut saling berhubungan, tetapi sebenarnya memiliki pengertian dan ruang lingkup yang berbeda.

Memahami hubungan di antara keempatnya penting sebelum mempelajari Machine Learning lebih jauh.

Secara sederhana, hubungan antara AI, Machine Learning, dan Deep Learning dapat digambarkan seperti berikut:

```text
Artificial Intelligence (AI)
│
└── Machine Learning (ML)
    │
    └── Deep Learning
        │
        └── Neural Networks
```

Sementara **Data Science** memiliki hubungan yang erat dengan Machine Learning, tetapi tidak sepenuhnya berada di dalam AI atau Machine Learning.

```text
                Artificial Intelligence
                         │
                  Machine Learning
                         │
                   Deep Learning


              ┌────────────────────┐
              │    Data Science    │
              │                    │
              │ Data + Statistics  │
              │ + Programming      │
              │ + Machine Learning │
              └────────────────────┘
```

Hubungan tersebut akan lebih mudah dipahami setelah kita membahas masing-masing konsep.

![hubungan data science, ai, manchine learning dan deep learning](/img/python/2.jpg)

## Artificial Intelligence

**Artificial Intelligence (AI)** atau **Kecerdasan Buatan** merupakan konsep yang paling luas di antara istilah-istilah tersebut.

Secara sederhana, AI adalah bidang yang berusaha membuat mesin atau komputer mampu melakukan tugas yang biasanya membutuhkan kecerdasan manusia.

Contohnya:

- memahami bahasa
- mengenali gambar
- mengambil keputusan
- bermain permainan
- memahami lingkungan
- melakukan perencanaan
- memecahkan masalah

Dengan kata lain, AI berusaha membuat mesin mampu melakukan tugas yang sebelumnya membutuhkan kemampuan manusia.

### Contoh Artificial Intelligence

Beberapa contoh penerapan AI antara lain:

- sistem pengenalan wajah
- asisten virtual
- sistem rekomendasi
- kendaraan otonom
- chatbot
- sistem diagnosis berbantuan komputer
- sistem permainan yang mampu mengambil keputusan

Namun, tidak semua AI harus menggunakan Machine Learning.

Sebuah sistem dapat dikategorikan sebagai AI apabila mampu melakukan tugas yang membutuhkan bentuk kecerdasan tertentu, meskipun pendekatan yang digunakan tidak selalu Machine Learning.

## Narrow AI

AI yang banyak digunakan saat ini umumnya termasuk dalam kategori **Narrow AI** atau **Weak AI**.

Narrow AI adalah sistem AI yang dirancang untuk melakukan tugas tertentu.

Sistem tersebut dapat memiliki kemampuan yang sangat tinggi pada satu tugas, tetapi tidak memiliki kemampuan umum seperti manusia.

Contohnya adalah sistem yang sangat baik dalam:

- bermain catur
- bermain Go
- mengenali objek dalam gambar
- menerjemahkan bahasa
- mendeteksi pola tertentu

Misalnya, sebuah sistem AI dapat mengalahkan manusia dalam permainan catur.

Namun, kemampuan tersebut tidak berarti sistem tersebut otomatis dapat melakukan semua pekerjaan yang dapat dilakukan manusia.

Kemampuan AI tersebut terbatas pada tujuan atau tugas yang dirancang untuknya.

### Contoh

Bayangkan terdapat sebuah sistem AI yang dirancang untuk mendeteksi penyakit dari gambar medis.

Sistem tersebut mungkin memiliki kemampuan yang sangat baik dalam menganalisis gambar medis.

Namun, sistem tersebut tidak otomatis dapat:

- mengendarai mobil
- menulis novel
- memasak
- memperbaiki komputer
- bermain sepak bola

Kemampuan sistem tetap bergantung pada tujuan dan kemampuan yang dirancang atau dilatih untuknya.

## General AI

Berbeda dengan Narrow AI, **Artificial General Intelligence (AGI)** atau **General AI** mengacu pada konsep AI yang memiliki kemampuan umum seperti manusia.

AI jenis ini secara konseptual mampu memahami dan menyelesaikan berbagai macam tugas, bukan hanya satu tugas tertentu.

Contohnya secara konseptual:

```text
General AI
│
├── Memahami bahasa
├── Mengenali gambar
├── Belajar
├── Memecahkan masalah
├── Merencanakan
├── Mengambil keputusan
├── Beradaptasi
└── Mempelajari berbagai tugas
```

General AI merupakan konsep yang jauh lebih luas dibandingkan sistem AI yang dirancang untuk satu tugas tertentu.

Perkembangan menuju kemampuan AI yang benar-benar umum merupakan topik penelitian yang kompleks dan masih terus berkembang.

## Machine Learning

**Machine Learning (ML)** merupakan salah satu bagian atau pendekatan dalam Artificial Intelligence.

Jika AI adalah tujuan atau bidang yang lebih luas, Machine Learning merupakan salah satu cara yang dapat digunakan untuk membangun sistem yang memiliki kemampuan cerdas.

Secara sederhana:

> **Machine Learning adalah pendekatan yang memungkinkan komputer mempelajari pola dari data untuk menghasilkan prediksi atau keputusan.**

Pada pemrograman tradisional, programmer biasanya menentukan aturan secara eksplisit.

```text
Rules + Data
     ↓
  Program
     ↓
   Output
```

Sedangkan dalam Machine Learning:

```text
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

Dalam Machine Learning, komputer menggunakan data untuk mempelajari pola yang kemudian direpresentasikan dalam sebuah model.

Model tersebut dapat digunakan untuk menghasilkan prediksi terhadap data baru.

## Mengapa Machine Learning Merupakan Bagian dari AI?

Tujuan Artificial Intelligence adalah membuat mesin mampu melakukan tugas yang membutuhkan kemampuan tertentu.

Machine Learning menyediakan salah satu pendekatan untuk mencapai tujuan tersebut.

Sebagai contoh, kita ingin membuat sistem yang dapat mengenali apakah sebuah gambar berisi kucing atau anjing.

Dengan pendekatan pemrograman tradisional, kita mungkin mencoba menentukan berbagai aturan berdasarkan karakteristik gambar.

Namun, pendekatan tersebut menjadi sulit ketika jumlah variasi gambar sangat besar.

Dengan Machine Learning, kita dapat memberikan banyak contoh gambar kepada sistem.

```text
Gambar Kucing
Gambar Kucing
Gambar Kucing
Gambar Anjing
Gambar Anjing
Gambar Anjing
        ↓
   Machine Learning
        ↓
       Model
        ↓
    Gambar Baru
        ↓
    Kucing / Anjing
```

Model belajar mengenali pola dari data tersebut dan kemudian menggunakan pola yang dipelajari untuk melakukan prediksi.

## Deep Learning

**Deep Learning** merupakan salah satu pendekatan dalam Machine Learning yang menggunakan **Artificial Neural Networks** dengan banyak lapisan.

Secara sederhana, hubungannya dapat digambarkan:

```text
Artificial Intelligence
        ↓
Machine Learning
        ↓
Deep Learning
        ↓
Deep Neural Networks
```

Deep Learning menjadi sangat populer karena mampu menangani berbagai jenis data kompleks, terutama ketika tersedia data dan sumber daya komputasi yang cukup.

Deep Learning banyak digunakan dalam berbagai bidang seperti:

- Computer Vision
- Natural Language Processing
- Speech Recognition
- Generative AI
- Image Generation
- Recommendation System

## Neural Network

**Neural Network** atau jaringan saraf tiruan merupakan model komputasi yang terinspirasi secara sederhana dari cara jaringan neuron biologis bekerja.

Neural Network terdiri dari unit-unit yang saling terhubung dan dapat digunakan untuk mempelajari hubungan atau pola dari data.

Secara sederhana, sebuah neural network dapat digambarkan sebagai:

```text
Input
  ↓
Input Layer
  ↓
Hidden Layer
  ↓
Hidden Layer
  ↓
Output Layer
  ↓
Output
```

Pada Deep Learning, neural network biasanya memiliki banyak lapisan sehingga disebut **Deep Neural Network**.

Istilah "deep" mengacu pada banyaknya lapisan dalam jaringan tersebut.

Pembahasan mengenai Neural Network dan Deep Learning akan dilakukan pada materi yang lebih lanjut.

## Hubungan Machine Learning dan Deep Learning

Deep Learning bukanlah bidang yang terpisah sepenuhnya dari Machine Learning.

Deep Learning merupakan salah satu pendekatan yang digunakan dalam Machine Learning.

Contohnya:

```text
Machine Learning
│
├── Linear Regression
├── Logistic Regression
├── Decision Tree
├── Random Forest
├── Support Vector Machine
├── K-Means
└── Deep Learning
    └── Neural Networks
```

Dengan demikian, **semua Deep Learning merupakan bagian dari Machine Learning, tetapi tidak semua Machine Learning merupakan Deep Learning**.

Machine Learning memiliki banyak algoritma dan pendekatan selain Deep Learning.

## Data Science

**Data Science** atau **Sains Data** merupakan bidang yang berfokus pada penggunaan data untuk memperoleh informasi, menemukan pola, menghasilkan insight, dan membantu pengambilan keputusan.

Data Science menggabungkan berbagai kemampuan, antara lain:

- programming
- statistik
- matematika
- data analysis
- data visualization
- domain knowledge
- machine learning

Secara sederhana:

```text
Data
 ↓
Data Collection
 ↓
Data Cleaning
 ↓
Data Analysis
 ↓
Data Visualization
 ↓
Machine Learning
 ↓
Insight / Prediction
 ↓
Decision
```

Namun, tidak setiap proyek Data Science harus menggunakan Machine Learning.

Analisis data sederhana dapat dilakukan tanpa Machine Learning.

## Tujuan Data Science

Data Science biasanya berfokus pada pertanyaan seperti:

- Apa yang terjadi?
- Mengapa hal tersebut terjadi?
- Pola apa yang terdapat dalam data?
- Apa yang kemungkinan terjadi selanjutnya?
- Tindakan apa yang sebaiknya dilakukan?

Sebagai contoh, sebuah perusahaan memiliki data transaksi pelanggan.

Data Science dapat digunakan untuk:

1. memahami pola pembelian pelanggan
2. mengetahui produk yang paling banyak dibeli
3. menganalisis perubahan penjualan
4. mengelompokkan pelanggan
5. membuat prediksi penjualan
6. membantu menentukan strategi bisnis

Machine Learning dapat menjadi salah satu tools yang digunakan dalam proses tersebut.

## Data Science dan Machine Learning

Data Science dan Machine Learning memiliki hubungan yang sangat erat.

Seorang Data Scientist dapat menggunakan Machine Learning untuk membuat model prediksi atau klasifikasi.

Namun, pekerjaan Data Scientist tidak hanya membuat model Machine Learning.

Data Scientist juga dapat melakukan:

- pengumpulan data
- pembersihan data
- analisis data
- visualisasi
- statistical analysis
- feature engineering
- eksperimen
- interpretasi hasil
- komunikasi insight

Oleh karena itu:

> **Machine Learning merupakan salah satu bagian penting dalam Data Science, tetapi Data Science memiliki ruang lingkup yang lebih luas daripada sekadar Machine Learning.**

## Contoh Hubungan Data Science dan Machine Learning

Misalnya sebuah perusahaan ingin mengetahui apakah pelanggan akan berhenti menggunakan layanan.

Data Science dapat mencakup seluruh proses:

```text
Data Pelanggan
      ↓
Data Cleaning
      ↓
Exploratory Data Analysis
      ↓
Feature Engineering
      ↓
Machine Learning
      ↓
Model Prediksi
      ↓
Evaluasi
      ↓
Insight
      ↓
Strategi Retensi Pelanggan
```

Machine Learning merupakan bagian dari keseluruhan proses tersebut.

## Perbedaan AI, ML, Deep Learning, dan Data Science

Secara sederhana, perbedaannya dapat dirangkum dalam tabel berikut:

| Konsep | Fokus Utama |
|---|---|
| Artificial Intelligence | Membuat mesin mampu melakukan tugas yang membutuhkan kecerdasan |
| Machine Learning | Membuat komputer belajar dari data |
| Deep Learning | Machine Learning menggunakan neural network dengan banyak lapisan |
| Data Science | Mengolah dan menganalisis data untuk memperoleh insight dan membantu pengambilan keputusan |

## Analogi Sederhana

Untuk mempermudah memahami hubungan keempat istilah tersebut, kita dapat menggunakan sebuah analogi.

Bayangkan **Artificial Intelligence** sebagai sebuah bidang besar.

Di dalamnya terdapat berbagai pendekatan untuk membuat sistem menjadi cerdas.

Salah satu pendekatan tersebut adalah **Machine Learning**.

Di dalam Machine Learning terdapat berbagai metode, salah satunya adalah **Deep Learning**.

Sementara itu, **Data Science** berada pada area yang sangat berkaitan dengan data dan dapat menggunakan Machine Learning sebagai salah satu alatnya.

Secara sederhana:

```text
                 ARTIFICIAL INTELLIGENCE
                          │
                          │
                  MACHINE LEARNING
                          │
                          │
                    DEEP LEARNING
                          │
                          │
                    NEURAL NETWORK


             DATA SCIENCE
                  │
       ┌──────────┼──────────┐
       │          │          │
    Statistics  Analysis   Machine
                           Learning
```

Diagram tersebut merupakan penyederhanaan untuk membantu memahami hubungan konsep. Dalam praktiknya, batas antara bidang-bidang tersebut dapat saling tumpang tindih.

## Contoh dalam Dunia Nyata

Bayangkan kita ingin membuat sistem rekomendasi produk pada sebuah toko online.

### Artificial Intelligence

Tujuan besarnya adalah membuat sistem yang mampu memberikan rekomendasi secara cerdas.

### Machine Learning

Machine Learning digunakan untuk mempelajari pola dari:

- riwayat pembelian
- produk yang dilihat
- produk yang disukai
- interaksi pengguna

Kemudian model menghasilkan rekomendasi.

### Deep Learning

Deep Learning dapat digunakan sebagai salah satu pendekatan untuk membangun sistem rekomendasi yang lebih kompleks.

### Data Science

Data Science dapat mencakup keseluruhan proses:

- mengumpulkan data
- membersihkan data
- menganalisis perilaku pengguna
- melakukan visualisasi
- membangun model
- mengevaluasi hasil
- menginterpretasikan hasil
- memberikan rekomendasi untuk keputusan bisnis

Dengan demikian, satu proyek dapat melibatkan keempat konsep tersebut dalam tingkat dan peran yang berbeda.

## Hubungan Keempat Konsep

Cara paling sederhana untuk mengingat hubungan tersebut adalah:

```text
AI
│
├── Machine Learning
│   │
│   └── Deep Learning
│
└── Pendekatan AI lainnya


Data Science
│
├── Programming
├── Statistics
├── Mathematics
├── Data Analysis
├── Data Visualization
└── Machine Learning
```

Machine Learning berada di dalam ruang lingkup AI, sedangkan Deep Learning merupakan salah satu pendekatan dalam Machine Learning.

Data Science memiliki hubungan erat dengan Machine Learning karena keduanya banyak bekerja dengan data, tetapi Data Science memiliki cakupan yang lebih luas.

## Mengapa Perlu Memahami Perbedaannya?

Memahami perbedaan ini penting karena istilah AI, Machine Learning, Deep Learning, dan Data Science sering digunakan secara bergantian.

Padahal, masing-masing memiliki fokus yang berbeda.

Jika seseorang mengatakan:

> "Saya sedang belajar AI."

Belum tentu berarti orang tersebut sedang belajar Machine Learning.

Jika seseorang mengatakan:

> "Saya menggunakan Deep Learning."

Artinya kemungkinan besar ia menggunakan salah satu pendekatan Machine Learning berbasis neural network.

Jika seseorang mengatakan:

> "Saya bekerja sebagai Data Scientist."

Pekerjaannya belum tentu hanya membuat model Machine Learning. Bisa saja sebagian besar pekerjaannya berfokus pada data analysis, statistik, eksperimen, dan komunikasi insight.

Pemahaman ini akan membantu kita menentukan jalur belajar yang tepat.

## Kesimpulan

Hubungan antara Artificial Intelligence, Machine Learning, Deep Learning, dan Data Science dapat disederhanakan sebagai berikut:

```text
Artificial Intelligence
        │
        └── Machine Learning
                │
                └── Deep Learning
```

Sedangkan:

```text
Data Science
    │
    ├── Programming
    ├── Statistics
    ├── Mathematics
    ├── Data Analysis
    ├── Data Visualization
    └── Machine Learning
```

Hal-hal utama yang perlu diingat:

- **Artificial Intelligence** merupakan konsep atau bidang yang paling luas untuk membuat mesin mampu melakukan tugas yang membutuhkan kecerdasan.
- **Machine Learning** merupakan salah satu pendekatan dalam AI yang memungkinkan komputer mempelajari pola dari data.
- **Deep Learning** merupakan salah satu pendekatan Machine Learning yang menggunakan neural network dengan banyak lapisan.
- **Data Science** merupakan bidang yang berfokus pada pengolahan, analisis, dan pemanfaatan data untuk menghasilkan insight dan membantu pengambilan keputusan.
- **Machine Learning dapat digunakan dalam Data Science**, tetapi Data Science tidak terbatas pada Machine Learning.
