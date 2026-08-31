---
sidebar_position: 4
title: "Jenis-jenis Machine Learning"
---

Machine Learning memiliki beberapa pendekatan yang berbeda dalam mempelajari data.

Secara umum, kategori utama Machine Learning dapat dibagi menjadi:

```text
Machine Learning
│
├── Supervised Learning
│
├── Unsupervised Learning
│
└── Reinforcement Learning
```

Perbedaan utama ketiganya terletak pada **bagaimana model memperoleh informasi untuk belajar**.

```text
Supervised Learning
        ↓
Belajar menggunakan data berlabel

Unsupervised Learning
        ↓
Belajar menggunakan data tanpa label

Reinforcement Learning
        ↓
Belajar melalui interaksi dan reward
```

![type of manchine learning](https://dicoding-assets.sgp1.cdn.digitaloceanspaces.com/blog/wp-content/uploads/2025/11/image-30-1024x523-1.png)

*Sumber: [https://dicoding-assets.sgp1.cdn.digitaloceanspaces.com/](https://dicoding-assets.sgp1.cdn.digitaloceanspaces.com/blog/wp-content/uploads/2025/11/image-30-1024x523-1.png)*

---

## Supervised Learning

**Supervised Learning** atau pembelajaran terawasi adalah pendekatan Machine Learning yang menggunakan **data yang sudah memiliki label**.

Label tersebut berfungsi sebagai jawaban atau target yang ingin dipelajari oleh model.

Contohnya:

```text
Data                  Label
----------------------------
Pengalaman = 5 tahun  Diterima
Pengalaman = 1 tahun  Ditolak
Pengalaman = 3 tahun  Diterima
```

Model mempelajari hubungan antara data dan label tersebut.

Secara sederhana:

```text
Input + Label
     ↓
Training
     ↓
   Model
     ↓
Prediksi
```

Karena data training memiliki label, kita dapat membandingkan hasil prediksi model dengan jawaban sebenarnya.

```text
Prediksi Model
      vs
Label Sebenarnya
      ↓
  Evaluasi
```

---

### Classification

**Classification** merupakan salah satu bentuk Supervised Learning.

Tujuannya adalah menentukan **kategori atau kelas** dari suatu data.

Contohnya:

```text
Input
  ↓
Model
  ↓
Apel / Pir
```

Atau:

```text
Email
  ↓
Model
  ↓
Spam / Bukan Spam
```

Model mencoba mempelajari batas atau pola yang membedakan satu kategori dengan kategori lainnya.

Contoh sederhana:

```text
Data
 │
 ├── Kategori A
 │
 └── Kategori B
```

Setelah dilatih, model dapat digunakan untuk menentukan kategori data baru.

---

### Regression

**Regression** merupakan bentuk lain dari Supervised Learning yang digunakan untuk memprediksi **nilai numerik atau kontinu**.

Berbeda dengan Classification yang menghasilkan kategori, Regression menghasilkan nilai.

Contohnya:

```text
Data Rumah
    ↓
  Model
    ↓
Prediksi Harga
```

Contoh lainnya:

```text
Data Historis
     ↓
Regression Model
     ↓
Prediksi Harga
```

Regression dapat digunakan ketika output yang ingin diprediksi berupa angka.

---

### Contoh Supervised Learning dalam Perekrutan

Machine Learning juga dapat digunakan untuk membantu proses pengambilan keputusan, misalnya dalam memprediksi kelayakan seorang kandidat.

Data kandidat dapat memiliki beberapa fitur:

```text
Pengalaman kerja
Usia
Domisili
Perangkat yang digunakan
```

Data tersebut kemudian dapat digunakan sebagai input model.

```text
Data Kandidat
     ↓
Machine Learning
     ↓
 Prediksi
     ↓
Layak / Tidak Layak
```

Jika data training sudah memiliki label, pendekatan tersebut termasuk Supervised Learning.

---

## Unsupervised Learning

**Unsupervised Learning** atau pembelajaran tanpa pengawasan menggunakan data yang **tidak memiliki label**.

Pada pendekatan ini, komputer tidak diberikan jawaban benar atau salah secara eksplisit.

Contohnya:

```text
Data
 ↓
Machine Learning
 ↓
Pola yang ditemukan
```

Model mencoba menemukan struktur atau pola tersembunyi yang terdapat di dalam data.

Perbedaannya dengan Supervised Learning:

```text
Supervised
Data + Label
     ↓
Belajar dari jawaban

Unsupervised
Data tanpa Label
     ↓
Mencari pola sendiri
```

---

### Clustering

Salah satu penerapan utama Unsupervised Learning adalah **Clustering**.

Clustering digunakan untuk mengelompokkan data berdasarkan kemiripan karakteristik.

Misalnya terdapat data pelanggan:

```text
Pelanggan A
Pelanggan B
Pelanggan C
Pelanggan D
Pelanggan E
```

Model dapat menemukan kelompok berdasarkan pola tertentu:

```text
Data Pelanggan
      ↓
   Clustering
      ↓
┌─────────────┐
│  Cluster 1  │
├─────────────┤
│  Cluster 2  │
├─────────────┤
│  Cluster 3  │
└─────────────┘
```

Kita tidak perlu memberikan label `Cluster 1`, `Cluster 2`, atau `Cluster 3` sebelumnya.

Model mencoba menemukan kelompok tersebut berdasarkan karakteristik data.

---

### Association Rule Learning

Selain clustering, Unsupervised Learning juga dapat digunakan untuk menemukan hubungan atau pola antar data melalui **Association Rule Learning**.

Salah satu contoh sederhananya adalah analisis perilaku pembelian pelanggan.

Misalnya ditemukan pola:

```text
Membeli Laptop
      +
Membeli Mouse
      ↓
Kemungkinan membeli
Laptop Bag
```

Pola seperti ini dapat digunakan untuk membantu sistem memahami hubungan antar produk.

Dalam konteks bisnis, informasi tersebut dapat dimanfaatkan untuk:

```text
Rekomendasi Produk
Cross Selling
Analisis Perilaku Pelanggan
```

---

## Reinforcement Learning

**Reinforcement Learning** atau pembelajaran penguatan menggunakan pendekatan yang berbeda dari Supervised dan Unsupervised Learning.

Dalam Reinforcement Learning terdapat sebuah **agent** yang berinteraksi dengan **environment**.

Agent melakukan tindakan atau **action**, kemudian mendapatkan umpan balik berupa **reward** atau **punishment**.

Secara sederhana:

```text
       Environment
            ↑
            │
          Action
            │
          Agent
            │
          Reward
            ↓
         Learning
```

Agent belajar melalui proses **trial and error**.

---

### Trial and Error

Pada awal proses, agent mungkin belum mengetahui tindakan terbaik.

Agent mencoba berbagai tindakan:

```text
Action A → Reward kecil
Action B → Punishment
Action C → Reward besar
```

Dari pengalaman tersebut, agent belajar memilih tindakan yang lebih baik.

Tujuan utamanya adalah memperoleh reward sebanyak mungkin atau **memaksimalkan skor**.

```text
Trial
  ↓
Feedback
  ↓
Learning
  ↓
Better Action
  ↓
Higher Reward
```

Proses tersebut dapat dilakukan berulang kali hingga agent mempelajari strategi yang lebih baik.

---

### Contoh Reinforcement Learning

Salah satu contoh yang mudah dipahami adalah AI yang belajar bermain game.

```text
Game Environment
       ↓
      Agent
       ↓
     Action
       ↓
    Game State
       ↓
Reward / Punishment
       ↓
      Learning
```

Misalnya:

```text
Bergerak ke arah yang benar
        ↓
      Reward

Menabrak rintangan
        ↓
    Punishment
```

Setelah melakukan banyak percobaan, agent dapat belajar tindakan mana yang menghasilkan reward lebih besar.

---

## Perbandingan Tiga Kategori

| Kategori | Data | Cara Belajar | Contoh |
| --- | --- | --- | --- |
| **Supervised Learning** | Berlabel | Belajar dari input dan target | Classification, Regression |
| **Unsupervised Learning** | Tanpa label | Menemukan pola atau struktur | Clustering |
| **Reinforcement Learning** | Interaksi dengan environment | Trial and error berdasarkan reward | Game, kontrol agent |

Cara sederhana untuk mengingatnya:

```text
Supervised
"Berikut data dan jawabannya.
Pelajari hubungan keduanya."

Unsupervised
"Berikut datanya.
Temukan polanya."

Reinforcement
"Coba lakukan sesuatu.
Dapatkan reward atau punishment.
Belajarlah dari pengalaman."
```

---

## Algoritma Machine Learning

Setiap kategori Machine Learning memiliki berbagai algoritma yang dapat digunakan untuk menyelesaikan masalah tertentu.

Beberapa algoritma yang umum diperkenalkan antara lain:

```text
Decision Trees
Neural Networks
Support Vector Machines
K-Nearest Neighbors
```

Pemilihan algoritma bergantung pada:

```text
Jenis masalah
Karakteristik data
Jumlah data
Tujuan model
Kebutuhan performa
```

---

### Decision Trees

**Decision Tree** menggunakan struktur seperti pohon untuk mengambil keputusan.

Secara sederhana:

```text
             Apakah X?
             /       \
           Ya         Tidak
           ↓            ↓
       Kondisi A     Kondisi B
          /              \
      Output 1         Output 2
```

Decision Tree dapat digunakan untuk berbagai masalah Machine Learning, termasuk classification dan regression.

---

### Neural Networks

**Neural Network** merupakan model yang terinspirasi dari cara kerja jaringan neuron biologis.

Secara sederhana:

```text
Input Layer
     ↓
Hidden Layer
     ↓
Hidden Layer
     ↓
Output Layer
```

Neural Network dapat digunakan untuk mempelajari pola yang kompleks.

Teknologi Deep Learning menggunakan neural network dengan banyak lapisan.

---

### Support Vector Machines

**Support Vector Machine (SVM)** merupakan algoritma yang dapat digunakan untuk melakukan klasifikasi dengan mencari batas pemisah antar kelas.

Secara konseptual:

```text
Class A       |       Class B
● ● ● ●       |       ○ ○ ○ ○
● ● ●         |       ○ ○ ○
              ↑
        Decision Boundary
```

Model mencoba menemukan batas yang dapat memisahkan kategori data.

---

### K-Nearest Neighbors

**K-Nearest Neighbors (KNN)** menggunakan kedekatan atau kemiripan data untuk menentukan prediksi.

Secara sederhana:

```text
Data Baru
    ↓
Cari tetangga terdekat
    ↓
Lihat kategori tetangga
    ↓
Tentukan prediksi
```

Misalnya sebuah data baru memiliki beberapa tetangga terdekat:

```text
● ● ● ○ ○
    ↑
 Data baru
```

Jika sebagian besar tetangganya termasuk kategori tertentu, data baru dapat diklasifikasikan ke kategori tersebut.

---

## Hubungan Kategori dan Algoritma

Kategori Machine Learning dan algoritma merupakan dua hal yang berbeda.

**Kategori** menjelaskan bagaimana model belajar:

```text
Supervised
Unsupervised
Reinforcement
```

Sedangkan **algoritma** menjelaskan metode yang digunakan untuk membangun model.

Contohnya:

```text
Supervised Learning
│
├── Classification
│   ├── Decision Tree
│   ├── KNN
│   └── SVM
│
└── Regression
    └── Regression Algorithms
```

Sedangkan:

```text
Unsupervised Learning
│
└── Clustering
    └── Clustering Algorithms
```

Tidak semua algoritma cocok untuk semua kategori dan semua jenis masalah.

---

## Bagaimana Memilih Kategori?

Pertanyaan sederhana berikut dapat membantu menentukan pendekatan awal.

### Apakah data memiliki label?

```text
Ya
 ↓
Supervised Learning
```

Jika tidak:

```text
Tidak
 ↓
Unsupervised Learning
```

Jika masalahnya melibatkan agent yang belajar melalui interaksi dan reward:

```text
Environment
   ↓
Action
   ↓
Reward
   ↓
Reinforcement Learning
```

---

## Gambaran Besar

Seluruh kategori Machine Learning dapat dirangkum:

```text
                    MACHINE LEARNING
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
     Supervised      Unsupervised    Reinforcement
          │                │                │
     ┌────┴────┐           │          Trial & Error
     │         │           │                │
     ▼         ▼           ▼                ▼
Classification Regression Clustering      Reward
```

---

## Ringkasan

### Supervised Learning

```text
Data Berlabel
     ↓
  Training
     ↓
   Model
     ↓
Prediction
```

Digunakan untuk masalah seperti:

```text
Classification
Regression
```

### Unsupervised Learning

```text
Data Tanpa Label
      ↓
    Learning
      ↓
    Pattern
      ↓
Group / Structure
```

Contohnya:

```text
Clustering
Association Rule Learning
```

### Reinforcement Learning

```text
Agent
 ↓
Action
 ↓
Environment
 ↓
Reward / Punishment
 ↓
Learning
```

Pendekatan ini digunakan ketika sistem belajar berdasarkan interaksi dan pengalaman.

---

## Kesimpulan

Machine Learning tidak menggunakan satu metode yang sama untuk semua masalah.

Tiga kategori utama yang perlu dipahami adalah:

```text
Supervised Learning
→ Belajar dari data berlabel

Unsupervised Learning
→ Menemukan pola dari data tanpa label

Reinforcement Learning
→ Belajar melalui interaksi dan reward
```

Setelah memahami kategori tersebut, langkah berikutnya adalah mempelajari **jenis masalah Machine Learning**, terutama **Classification, Regression, dan Clustering**, kemudian memahami algoritma yang sesuai untuk masing-masing masalah.