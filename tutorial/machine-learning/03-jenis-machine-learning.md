---
sidebar_position: 4
title: "Jenis-jenis Machine Learning"
---

Machine Learning memiliki berbagai pendekatan yang digunakan untuk menyelesaikan masalah berdasarkan data.

Sebelum mempelajari algoritma seperti Linear Regression, Decision Tree, K-Means, atau Neural Network, kita perlu memahami terlebih dahulu **kategori utama dalam Machine Learning**.

Secara umum, Machine Learning dapat dibagi menjadi tiga kategori utama:

```text
Machine Learning
│
├── Supervised Learning
│
├── Unsupervised Learning
│
└── Reinforcement Learning
```

Ketiga pendekatan tersebut memiliki cara belajar yang berbeda.

Perbedaan utamanya terletak pada **bagaimana sistem mendapatkan informasi untuk belajar**.

## Inti Utama Machine Learning

Pada dasarnya, Machine Learning digunakan untuk membuat komputer mempelajari pola dari data sehingga dapat menghasilkan **prediksi atau keputusan**.

Secara sederhana:

```text
Input Data
    ↓
Machine Learning
    ↓
Pola yang Dipelajari
    ↓
Model
    ↓
Prediksi / Keputusan
```

Sebagai contoh, kita memiliki data mengenai rumah:

```text
Luas Rumah
Jumlah Kamar
Lokasi
Usia Bangunan
Harga
```

Machine Learning dapat digunakan untuk mempelajari hubungan antara karakteristik rumah dengan harganya.

Setelah model mempelajari pola dari data tersebut, model dapat digunakan untuk memperkirakan harga rumah baru.

Namun, tidak semua Machine Learning bekerja dengan cara yang sama.

Cara model memperoleh informasi untuk belajar bergantung pada kategori Machine Learning yang digunakan.

## Supervised Learning

**Supervised Learning** atau pembelajaran terawasi adalah pendekatan Machine Learning yang menggunakan **data yang memiliki label atau target**.

Model diberikan data input beserta jawaban yang diharapkan.

Secara sederhana:

```text
Input + Target
      ↓
   Training
      ↓
     Model
      ↓
 Prediksi
```

Contohnya kita memiliki dataset harga rumah:

| Luas Rumah | Jumlah Kamar | Harga |
|---:|---:|---:|
| 60 | 2 | 300 juta |
| 80 | 3 | 450 juta |
| 100 | 3 | 550 juta |
| 120 | 4 | 700 juta |

Pada dataset tersebut:

- `Luas Rumah` adalah feature
- `Jumlah Kamar` adalah feature
- `Harga` adalah target

Model mempelajari hubungan antara feature dan target.

Setelah proses training selesai, model dapat digunakan untuk melakukan prediksi terhadap data baru.

### Cara Kerja Supervised Learning

Secara sederhana:

```text
Dataset Berlabel
      ↓
Data Training
      ↓
Algoritma
      ↓
Model
      ↓
Data Baru
      ↓
Prediksi
```

Karena data training memiliki target, hasil prediksi model dapat dibandingkan dengan nilai sebenarnya.

Perbandingan tersebut digunakan untuk mengetahui seberapa baik model bekerja.

### Jenis Supervised Learning

Dua jenis masalah utama dalam Supervised Learning adalah:

```text
Supervised Learning
│
├── Classification
│
└── Regression
```

### Classification

**Classification** digunakan ketika target yang ingin diprediksi berupa kategori.

Contohnya:

- spam atau bukan spam
- kucing atau anjing
- lulus atau tidak lulus
- sakit atau sehat
- fraud atau bukan fraud

Misalnya kita memiliki data email:

| Panjang Email | Jumlah Link | Mengandung Kata Tertentu | Label |
|---:|---:|---:|---|
| 120 | 5 | Ya | Spam |
| 80 | 0 | Tidak | Bukan Spam |
| 200 | 7 | Ya | Spam |

Model mempelajari pola dari data tersebut.

Ketika mendapatkan email baru, model dapat memberikan prediksi:

```text
Email Baru
    ↓
Model Classification
    ↓
Spam / Bukan Spam
```

### Regression

**Regression** digunakan ketika target yang ingin diprediksi berupa nilai numerik atau nilai kontinu.

Contohnya:

- harga rumah
- harga kendaraan
- jumlah penjualan
- suhu
- pendapatan
- permintaan produk

Misalnya:

| Luas Rumah | Jumlah Kamar | Harga |
|---:|---:|---:|
| 60 | 2 | 300 juta |
| 80 | 3 | 450 juta |
| 100 | 3 | 550 juta |
| 120 | 4 | 700 juta |

Model dapat mempelajari hubungan antara karakteristik rumah dan harga.

Kemudian:

```text
Rumah Baru
    ↓
Model Regression
    ↓
Prediksi Harga
```

Hasilnya berupa nilai numerik.

### Contoh Algoritma Supervised Learning

Beberapa algoritma yang dapat digunakan untuk Supervised Learning antara lain:

- Linear Regression
- Logistic Regression
- K-Nearest Neighbors
- Decision Tree
- Random Forest
- Support Vector Machine
- Gradient Boosting

Tidak semua algoritma tersebut digunakan untuk jenis masalah yang sama.

Sebagai contoh:

```text
Regression
├── Linear Regression
├── Ridge Regression
├── Lasso Regression
└── Random Forest Regression

Classification
├── Logistic Regression
├── KNN
├── Decision Tree
├── Random Forest
└── Support Vector Machine
```

Pembahasan masing-masing algoritma akan dilakukan pada materi berikutnya.

## Unsupervised Learning

Berbeda dengan Supervised Learning, **Unsupervised Learning** menggunakan data yang tidak memiliki target atau label yang diketahui.

Sistem diberikan data dan diminta menemukan pola atau struktur yang terdapat di dalam data tersebut.

Secara sederhana:

```text
Data Tanpa Label
      ↓
  Algoritma
      ↓
Pola / Struktur
      ↓
   Hasil Analisis
```

Misalnya sebuah perusahaan memiliki data pelanggan:

| Usia | Pendapatan | Frekuensi Belanja |
|---:|---:|---:|
| 22 | 4 juta | 10 |
| 25 | 5 juta | 12 |
| 45 | 15 juta | 3 |
| 48 | 18 juta | 2 |

Tidak terdapat kolom seperti:

```text
Kategori Pelanggan
```

Model dapat digunakan untuk mencari pola dan mengelompokkan pelanggan berdasarkan karakteristik mereka.

### Clustering

Salah satu tugas utama dalam Unsupervised Learning adalah **Clustering**.

Clustering bertujuan mengelompokkan data yang memiliki karakteristik serupa.

Misalnya:

```text
Data Pelanggan
       ↓
   Clustering
       ↓
┌──────┼──────┐
↓      ↓      ↓
Grup A Grup B Grup C
```

Model menentukan kelompok berdasarkan pola yang ditemukan dari data.

Contohnya sebuah perusahaan dapat menemukan:

```text
Cluster 1 → Pelanggan dengan frekuensi belanja tinggi
Cluster 2 → Pelanggan dengan frekuensi belanja sedang
Cluster 3 → Pelanggan dengan frekuensi belanja rendah
```

Kelompok tersebut tidak harus ditentukan sebelumnya oleh manusia.

Salah satu algoritma clustering yang paling populer adalah **K-Means**.

Algoritma lainnya antara lain:

- Hierarchical Clustering
- DBSCAN
- Gaussian Mixture Model

### Association Rule Learning

Pendekatan lain dalam Unsupervised Learning adalah **Association Rule Learning**.

Tujuannya adalah menemukan hubungan atau pola keterkaitan antara berbagai item atau kejadian.

Contoh yang sederhana adalah data transaksi toko:

```text
Transaksi 1 → Roti + Susu
Transaksi 2 → Roti + Telur
Transaksi 3 → Roti + Susu + Telur
Transaksi 4 → Susu + Telur
```

Dari banyak transaksi, sistem dapat menemukan pola bahwa beberapa produk sering muncul secara bersamaan.

Pola tersebut dapat digunakan untuk:

- rekomendasi produk
- penempatan produk
- analisis perilaku pelanggan
- strategi pemasaran

Konsep ini sering dikaitkan dengan **Market Basket Analysis**.

## Reinforcement Learning

Kategori ketiga adalah **Reinforcement Learning** atau pembelajaran penguatan.

Pendekatan ini memiliki konsep yang berbeda dari Supervised Learning dan Unsupervised Learning.

Dalam Reinforcement Learning, sebuah **agent** belajar melalui interaksi dengan lingkungan.

Secara sederhana:

```text
        Environment
             ↑
             │
          Action
             │
             ↓
           Agent
             ↑
             │
          Reward
```

Agent melakukan tindakan terhadap lingkungan dan mendapatkan feedback berupa **reward** atau **penalty**.

Agent kemudian belajar menentukan tindakan yang lebih baik berdasarkan pengalaman tersebut.

### Trial and Error

Salah satu karakteristik utama Reinforcement Learning adalah pembelajaran melalui **trial and error**.

Misalnya kita ingin melatih sebuah program untuk memainkan game.

Pada awalnya, agent mungkin belum mengetahui tindakan yang tepat.

```text
Agent
  ↓
Action
  ↓
Game
  ↓
Reward / Penalty
  ↓
Learning
  ↓
Action berikutnya
```

Jika suatu tindakan menghasilkan reward yang baik, agent akan belajar bahwa tindakan tersebut mungkin bermanfaat.

Jika menghasilkan penalty, agent dapat belajar untuk menghindari tindakan tersebut.

Proses tersebut dilakukan berulang kali.

### Contoh Reinforcement Learning

Reinforcement Learning dapat digunakan pada berbagai permasalahan yang melibatkan pengambilan keputusan berulang.

Contohnya:

- permainan game
- robotika
- kontrol sistem
- optimasi
- navigasi
- autonomous systems

Dalam game, misalnya:

```text
Agent
  ↓
Memilih Action
  ↓
Game State Berubah
  ↓
Mendapatkan Reward
  ↓
Belajar
  ↓
Memilih Action Berikutnya
```

Tujuannya adalah mempelajari strategi yang menghasilkan reward sebaik mungkin.

## Perbandingan Tiga Kategori Machine Learning

Perbedaan utama ketiganya dapat dilihat pada tabel berikut:

| Kategori | Data | Cara Belajar | Contoh |
|---|---|---|---|
| Supervised Learning | Berlabel | Belajar dari input dan target | Prediksi harga |
| Unsupervised Learning | Tidak berlabel | Mencari pola atau struktur | Segmentasi pelanggan |
| Reinforcement Learning | Feedback dari environment | Trial and error | Bermain game |

Cara sederhana untuk mengingatnya:

```text
Supervised
→ Belajar dengan jawaban

Unsupervised
→ Belajar tanpa jawaban

Reinforcement
→ Belajar dari reward dan penalty
```

## Bagaimana Memilih Kategori Machine Learning?

Pemilihan kategori Machine Learning bergantung pada jenis masalah dan data yang tersedia.

### Jika memiliki target

Gunakan pendekatan **Supervised Learning**.

Contohnya:

```text
Data Pelanggan
      +
Status Churn
      ↓
Supervised Learning
```

Kita mengetahui hasil yang ingin diprediksi.

### Jika tidak memiliki target

Gunakan pendekatan **Unsupervised Learning** apabila tujuan kita adalah menemukan pola atau struktur.

Contohnya:

```text
Data Pelanggan
      ↓
Unsupervised Learning
      ↓
Kelompok Pelanggan
```

Kita tidak memberikan kategori pelanggan sebelumnya kepada model.

### Jika sistem belajar melalui interaksi

Gunakan pendekatan **Reinforcement Learning** ketika agent perlu belajar melalui interaksi dengan environment dan mendapatkan feedback berupa reward atau penalty.

Contohnya:

```text
Agent
  ↓
Action
  ↓
Environment
  ↓
Reward
  ↓
Learning
```

## Algoritma dalam Machine Learning

Kategori Machine Learning menentukan **pendekatan pembelajaran**, sedangkan algoritma merupakan metode yang digunakan untuk melakukan pembelajaran tersebut.

Contohnya:

```text
Machine Learning
│
├── Supervised Learning
│   ├── Linear Regression
│   ├── Logistic Regression
│   ├── Decision Tree
│   ├── Random Forest
│   ├── KNN
│   └── Support Vector Machine
│
├── Unsupervised Learning
│   ├── K-Means
│   ├── Hierarchical Clustering
│   ├── DBSCAN
│   └── PCA
│
└── Reinforcement Learning
    └── berbagai algoritma berbasis
        reward dan environment
```

Perlu diperhatikan bahwa beberapa algoritma atau teknik dapat memiliki variasi penggunaan yang berbeda.

Sebagai contoh, **Neural Network** dapat digunakan untuk berbagai jenis permasalahan, termasuk classification dan regression, serta menjadi dasar dari Deep Learning.

### Hubungan Algoritma dan Kategori

Jangan menganggap:

```text
Machine Learning = Algoritma
```

Machine Learning merupakan bidang yang lebih luas.

Di dalamnya terdapat berbagai pendekatan dan algoritma.

Strukturnya lebih tepat dipahami sebagai:

```text
Machine Learning
      ↓
   Kategori
      ↓
   Algoritma
      ↓
Implementasi
```

Contohnya:

```text
Machine Learning
      ↓
Supervised Learning
      ↓
Regression
      ↓
Linear Regression
      ↓
Implementasi dengan Python
```

## Machine Learning dengan Python

Dalam pembelajaran ini, kita akan menggunakan Python untuk mengimplementasikan berbagai algoritma Machine Learning.

Beberapa library yang umum digunakan antara lain:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

Untuk algoritma Machine Learning, salah satu library utama yang akan digunakan adalah Scikit-learn.

Contoh sederhana:

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
```

Kemudian model dapat dilatih menggunakan data:

```python
model.fit(X_train, y_train)
```

Dan digunakan untuk membuat prediksi:

```python
prediction = model.predict(X_test)
```

Contoh tersebut merupakan gambaran sederhana.

Pada materi selanjutnya, setiap bagian akan dipelajari secara lebih detail.

## Ringkasan

Machine Learning memiliki tiga kategori utama:

```text
Machine Learning
│
├── Supervised Learning
├── Unsupervised Learning
└── Reinforcement Learning
```

**Supervised Learning** menggunakan data yang memiliki label atau target.

Contoh:

```text
Feature + Target
       ↓
    Training
       ↓
      Model
       ↓
   Prediction
```

Supervised Learning umumnya digunakan untuk:

- Classification
- Regression

**Unsupervised Learning** menggunakan data tanpa target yang diketahui.

Contohnya:

- Clustering
- Association Rule Learning
- Anomaly Detection

**Reinforcement Learning** memungkinkan agent belajar melalui interaksi dengan environment menggunakan feedback berupa reward atau penalty.

```text
Action
  ↓
Environment
  ↓
Reward
  ↓
Learning
  ↓
Action yang lebih baik
```

Pemahaman mengenai tiga kategori ini merupakan fondasi penting sebelum mempelajari algoritma Machine Learning secara lebih mendalam.
