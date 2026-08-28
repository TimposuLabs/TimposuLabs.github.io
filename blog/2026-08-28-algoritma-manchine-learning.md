---
slug: algoritma-manchine-learning
title: Semua Algoritma Manchine Learning
authors: topekox
tags: [manchine learning, data mining, ai, data science]
---

## 1. Pengantar Machine Learning

Machine Learning (ML) adalah cabang dari **Artificial Intelligence (AI)** yang berfokus pada pengembangan algoritma statistik.

Algoritma Machine Learning belajar dari data untuk menemukan pola dan melakukan generalisasi terhadap data baru tanpa harus diprogram secara eksplisit untuk setiap kemungkinan.

Secara umum, Machine Learning terbagi menjadi dua kategori utama:

<!-- truncate -->

### Supervised Learning

**Supervised Learning** adalah metode Machine Learning yang menggunakan data yang memiliki **label** atau target output yang sudah diketahui.

Contoh:

- Memprediksi harga rumah.
- Mengklasifikasikan foto kucing dan anjing.
- Memprediksi apakah sebuah email merupakan spam atau bukan spam.

### Unsupervised Learning

**Unsupervised Learning** menggunakan data yang **tidak memiliki label atau jawaban yang diketahui**.

Algoritma akan mencari pola, struktur, atau kelompok berdasarkan kemiripan data secara mandiri.

Contoh:

- Mengelompokkan pelanggan berdasarkan perilaku belanja.
- Mengelompokkan dokumen berdasarkan kemiripan isi.
- Mengelompokkan email berdasarkan kategori tanpa label awal.

![Machine Learning](https://media.licdn.com/dms/image/v2/D5612AQHk_fl16EgD9w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1679029988995?e=2147483647&v=beta&t=47UKmYUd29Ymjli7bWMT1Pi5aPfF_IfvrXSG2cuLeRM)

---

## 2. Supervised Learning

Supervised Learning memiliki dua jenis tugas utama:

### Regresi

**Regresi** digunakan untuk memprediksi nilai numerik yang bersifat kontinu.

Contoh:

- Memprediksi harga rumah.
- Memprediksi suhu.
- Memprediksi jumlah penjualan.

Alur sederhana:

```text
Luas Rumah -> Model -> Prediksi Harga
```

### Klasifikasi

**Klasifikasi** digunakan untuk memprediksi kategori atau kelas yang bersifat diskret.

Contoh:

- Spam atau bukan spam.
- Kucing atau anjing.
- Lulus atau tidak lulus.
- Positif atau negatif.

Alur sederhana:

```text
Isi Email -> Model -> Spam atau Bukan Spam
```

### A. Linear Regression

**Linear Regression** digunakan untuk menemukan hubungan linier antara variabel input dan variabel output.

#### Konsep

Model mencoba membuat **garis lurus terbaik** atau *regression line* yang menggambarkan hubungan antara data input dan output.

Alur sederhana:

```text
Input -> Linear Regression -> Output
```

Persamaan dasar Linear Regression:

```text
y = mx + b
```

Keterangan:

- `y` = nilai yang diprediksi.
- `x` = variabel input.
- `m` = kemiringan garis atau *slope*.
- `b` = titik potong atau *intercept*.

#### Cara Kerja

Model mencari garis yang memiliki kesalahan prediksi sekecil mungkin.

Salah satu metode yang digunakan adalah **Least Squares**, yaitu meminimalkan jumlah kuadrat jarak antara nilai sebenarnya dengan nilai prediksi.

#### Contoh

Memprediksi ukuran sepatu berdasarkan tinggi badan.

```text
Tinggi Badan -> Linear Regression -> Ukuran Sepatu
```

### B. Logistic Regression

**Logistic Regression** merupakan algoritma yang digunakan untuk tugas **klasifikasi**.

Meskipun memiliki kata "Regression", algoritma ini umumnya digunakan untuk menentukan kelas suatu data.

#### Konsep

Logistic Regression menggunakan fungsi **sigmoid** untuk menghasilkan probabilitas antara `0` dan `1`.

Fungsi sigmoid:

```text
sigma(x) = 1 / (1 + e^(-x))
```

Contoh:

```text
Data
  |
  v
Logistic Regression
  |
  v
Probabilitas
  |
  v
Kelas
```

Misalnya:

```text
Probabilitas = 0.85
Threshold = 0.5

0.85 lebih besar dari 0.5
Hasil = Kelas Positif
```

#### Contoh Penggunaan

- Spam atau bukan spam.
- Lulus atau tidak lulus.
- Pelanggan membeli atau tidak membeli.
- Positif atau negatif.

### C. K-Nearest Neighbors (KNN)

**K-Nearest Neighbors (KNN)** adalah algoritma yang menentukan prediksi berdasarkan data yang berada paling dekat dengan data baru.

KNN termasuk algoritma **non-parametric**, yaitu tidak membuat asumsi kuat mengenai bentuk distribusi data.

#### Cara Kerja

1. Tentukan nilai `K`.
2. Hitung jarak data baru dengan data lainnya.
3. Ambil `K` data yang paling dekat.
4. Tentukan hasil berdasarkan tetangga tersebut.

Untuk klasifikasi, hasil biasanya ditentukan berdasarkan **mayoritas kelas**.

Untuk regresi, hasil dapat ditentukan berdasarkan **rata-rata nilai tetangga**.

Alur sederhana:

```text
Data Baru
   |
   v
Cari K Tetangga Terdekat
   |
   v
Lihat Mayoritas Kelas
   |
   v
Prediksi
```

#### Hyperparameter K

`K` merupakan **hyperparameter** yang menentukan jumlah tetangga yang digunakan.

Jika `K` terlalu kecil:

```text
K kecil
  |
  v
Model terlalu mengikuti data lokal
  |
  v
Risiko Overfitting
```

Jika `K` terlalu besar:

```text
K besar
  |
  v
Model terlalu general
  |
  v
Risiko Underfitting
```

### D. Support Vector Machine (SVM)

**Support Vector Machine (SVM)** adalah algoritma yang mencari batas keputusan atau *decision boundary* terbaik untuk memisahkan kelas-kelas data.

#### Konsep

SVM berusaha menemukan **hyperplane** yang memisahkan data dengan **margin terbesar**.

```text
Kelas A              Kelas B

O O O O              X X X
O O O                X X X
O O                  X X

          |
          |
          |
   Decision Boundary
```

#### Support Vectors

**Support Vectors** adalah titik data yang berada paling dekat dengan decision boundary.

Titik-titik tersebut memiliki peran penting dalam menentukan posisi batas pemisah.

#### Kernel Trick

**Kernel Trick** digunakan ketika data tidak dapat dipisahkan dengan garis lurus.

Data dapat dipetakan ke dimensi yang lebih tinggi sehingga pemisahan menjadi lebih mudah.

Alurnya:

```text
Data 2D
  |
  v
Kernel Trick
  |
  v
Dimensi Lebih Tinggi
  |
  v
Data Dapat Dipisahkan
```

### E. Naive Bayes Classifier

**Naive Bayes** adalah algoritma klasifikasi yang berdasarkan pada **Teorema Bayes**.

#### Konsep

Naive Bayes menghitung probabilitas suatu data termasuk ke dalam kelas tertentu berdasarkan fitur yang dimilikinya.

Algoritma ini memiliki asumsi sederhana bahwa setiap fitur dianggap **independen** satu sama lain.

Inilah alasan algoritma tersebut disebut **Naive**.

#### Contoh

Untuk menentukan apakah email merupakan spam:

```text
Email
  |
  v
Analisis Kata
  |
  v
Hitung Probabilitas
  |
  v
Spam atau Bukan Spam
```

#### Keunggulan

Naive Bayes memiliki beberapa keunggulan:

- Cepat dalam proses pelatihan.
- Efisien untuk data berdimensi tinggi.
- Cocok untuk klasifikasi teks.
- Banyak digunakan pada spam filtering.

#### Contoh Penggunaan

- Spam filter.
- Analisis sentimen.
- Klasifikasi dokumen.
- Kategorisasi berita.

### F. Decision Trees

**Decision Tree** adalah algoritma yang menggunakan struktur seperti pohon untuk mengambil keputusan.

Model membuat serangkaian pertanyaan untuk membagi data menjadi kelompok yang semakin spesifik.

Contoh sederhana:

```text
Apakah suhu lebih dari 30 C?
       /              \
     Ya                Tidak
     |                   |
     v                   v
   Panas             Tidak Panas
```

Struktur utama Decision Tree terdiri dari:

- **Root Node** - titik awal pengambilan keputusan.
- **Decision Node** - titik yang berisi pertanyaan atau kondisi.
- **Branch** - jalur hasil keputusan.
- **Leaf Node** - hasil akhir prediksi.

Tujuan pembagian data adalah menghasilkan kelompok yang semakin **homogen atau murni**.

### G. Bagging dan Random Forest

**Bagging** atau *Bootstrap Aggregating* adalah teknik ensemble yang melatih beberapa model menggunakan sampel data yang berbeda, kemudian menggabungkan hasil prediksi.

Salah satu algoritma terkenal yang menggunakan konsep ini adalah **Random Forest**.

#### Random Forest

Random Forest menggabungkan banyak **Decision Tree** yang bekerja secara paralel.

```text
                 Data
                   |
       +-----------+-----------+
       |           |           |
       v           v           v
    Tree 1      Tree 2      Tree 3
       |           |           |
       v           v           v
   Prediksi     Prediksi     Prediksi
       \           |           /
        \          |          /
         +---------+---------+
                   |
                   v
             Majority Vote
                   |
                   v
              Hasil Akhir
```

Untuk klasifikasi, setiap tree memberikan suara.

Kelas dengan suara terbanyak menjadi hasil akhir.

#### Keunggulan

Random Forest dapat membantu:

- Mengurangi risiko overfitting.
- Meningkatkan stabilitas model.
- Menangani banyak fitur.
- Menghasilkan prediksi yang lebih robust dibandingkan satu Decision Tree.

### H. Boosting

**Boosting** merupakan teknik ensemble yang melatih model secara **berurutan atau sequential**.

Model berikutnya berusaha memperbaiki kesalahan yang dibuat oleh model sebelumnya.

Konsepnya:

```text
Data
 |
 v
Model 1
 |
 v
Kesalahan
 |
 v
Model 2
 |
 v
Memperbaiki Kesalahan
 |
 v
Model 3
 |
 v
Model Akhir
```

Contoh algoritma boosting:

- AdaBoost.
- Gradient Boosting.
- XGBoost.

Perbedaan sederhana:

| Bagging | Boosting |
|---|---|
| Model dilatih secara paralel | Model dilatih secara berurutan |
| Fokus mengurangi variance | Fokus memperbaiki kesalahan |
| Contoh: Random Forest | Contoh: XGBoost |

---

## 3. Deep Learning dan Neural Networks

**Deep Learning** merupakan pengembangan dari konsep **Neural Network** yang menggunakan banyak lapisan untuk mempelajari pola kompleks dari data.

### Konsep Neural Network

Neural Network terinspirasi dari cara kerja neuron biologis.

Struktur sederhananya:

```text
Input Layer
     |
     v
Hidden Layer
     |
     v
Output Layer
```

Setiap neuron menerima input, melakukan perhitungan, kemudian meneruskan hasilnya ke neuron berikutnya.

### Deep Learning

Deep Learning menggunakan **banyak hidden layers**.

```text
Input
  |
  v
Hidden Layer 1
  |
  v
Hidden Layer 2
  |
  v
Hidden Layer 3
  |
  v
Hidden Layer
  |
  v
Output
```

Semakin dalam jaringan, model dapat mempelajari representasi data yang semakin kompleks.

### Implicit Feature Engineering

Salah satu keunggulan Deep Learning adalah kemampuannya untuk mempelajari fitur secara otomatis.

Pada Machine Learning tradisional, manusia sering perlu menentukan fitur yang penting.

Pada Deep Learning:

```text
Raw Data
   |
   v
Neural Network
   |
   v
Belajar Fitur
   |
   v
Belajar Pola
   |
   v
Prediksi
```

### Keunggulan

Deep Learning sangat cocok untuk data kompleks seperti:

- Gambar.
- Suara.
- Video.
- Bahasa alami.
- Data dengan dimensi tinggi.

Contoh:

```text
Foto Wajah
   |
   v
Neural Network
   |
   v
Belajar Pola Wajah
   |
   v
Identifikasi
```

---

## 4. Unsupervised Learning

**Unsupervised Learning** digunakan untuk menemukan struktur, pola, atau hubungan tersembunyi dalam data yang **tidak memiliki label**.

Berbeda dengan Supervised Learning:

```text
Supervised Learning

Data + Label
     |
     v
   Model
     |
     v
  Prediksi
```

Sedangkan:

```text
Unsupervised Learning

Data
 |
 v
Model
 |
 v
Cari Pola atau Struktur
```

Dua teknik penting dalam Unsupervised Learning adalah:

- Clustering.
- Dimensionality Reduction.

### A. Clustering

**Clustering** adalah teknik untuk mengelompokkan data berdasarkan kemiripan karakteristik.

Contoh:

```text
Data Pelanggan
      |
      v
  Clustering
      |
      v
+-----+-----+-----+
| C1  | C2  | C3  |
+-----+-----+-----+
```

Misalnya pelanggan dapat dikelompokkan menjadi:

- Pelanggan dengan pengeluaran rendah.
- Pelanggan dengan pengeluaran sedang.
- Pelanggan dengan pengeluaran tinggi.

### B. K-Means Clustering

**K-Means** merupakan salah satu algoritma clustering yang paling populer.

Huruf `K` menunjukkan jumlah cluster yang ingin dibuat.

#### Cara Kerja

Secara umum, K-Means bekerja melalui langkah berikut:

1. Menentukan jumlah cluster `K`.
2. Menentukan posisi awal centroid.
3. Menghitung jarak setiap data terhadap centroid.
4. Menempatkan data ke centroid terdekat.
5. Menghitung ulang posisi centroid.
6. Mengulangi proses sampai posisi cluster stabil.

Contoh:

```text
Data
 |
 v
Tentukan K
 |
 v
Pilih Centroid
 |
 v
Hitung Jarak
 |
 v
Kelompokkan Data
 |
 v
Update Centroid
 |
 v
Ulangi
 |
 v
Cluster Final
```

#### Contoh

Jika:

```text
K = 3
```

maka algoritma akan berusaha membagi data menjadi:

```text
Cluster 1
Cluster 2
Cluster 3
```

#### Algoritma Clustering Lain

Selain K-Means, terdapat beberapa algoritma clustering lain:

- **Hierarchical Clustering**
- **DBSCAN**

DBSCAN memiliki keunggulan karena dapat menemukan cluster dengan bentuk yang tidak beraturan dan tidak harus menentukan jumlah `K` terlebih dahulu.

### C. Dimensionality Reduction

**Dimensionality Reduction** adalah teknik untuk mengurangi jumlah fitur atau dimensi pada dataset dengan tetap mempertahankan informasi penting sebanyak mungkin.

Misalnya sebuah dataset memiliki:

```text
100 fitur
```

Dengan dimensionality reduction, data dapat direduksi menjadi:

```text
10 fitur utama
```

Tujuannya antara lain:

- Mengurangi kompleksitas data.
- Mengurangi noise.
- Mempercepat proses pelatihan.
- Mengurangi jumlah fitur.
- Mempermudah visualisasi data.

### D. Principal Component Analysis (PCA)

**Principal Component Analysis (PCA)** merupakan salah satu metode dimensionality reduction yang populer.

PCA mencari arah dengan **varians terbesar** dalam data yang disebut **Principal Components**.

Secara sederhana:

```text
Banyak Fitur
     |
     v
    PCA
     |
     v
Fitur Utama
     |
     v
Dimensi Lebih Rendah
```

### Contoh

Misalnya data ikan memiliki fitur:

```text
Panjang
Tinggi
Lebar
Berat
```

Beberapa fitur tersebut mungkin memiliki hubungan yang kuat.

PCA dapat mengubah atau menggabungkan informasi tersebut menjadi beberapa **Principal Components** yang tetap mempertahankan sebagian besar informasi penting.

Contoh sederhana:

```text
Panjang + Tinggi
       |
       v
      PCA
       |
       v
Komponen "Bentuk"
```

### Manfaat PCA

PCA dapat digunakan untuk:

- Mengurangi jumlah dimensi.
- Mengurangi noise.
- Menghilangkan redundansi fitur.
- Mempercepat proses Machine Learning.
- Membantu visualisasi dataset berdimensi tinggi.

---

## 5. Ringkasan Algoritma Machine Learning

| Algoritma | Jenis | Kegunaan Utama |
|---|---|---|
| Linear Regression | Supervised | Prediksi nilai numerik |
| Logistic Regression | Supervised | Klasifikasi |
| KNN | Supervised | Klasifikasi dan regresi |
| SVM | Supervised | Klasifikasi |
| Naive Bayes | Supervised | Klasifikasi, terutama teks |
| Decision Tree | Supervised | Klasifikasi dan regresi |
| Random Forest | Supervised / Ensemble | Klasifikasi dan regresi |
| Boosting | Supervised / Ensemble | Prediksi dengan memperbaiki kesalahan model |
| Neural Network | Supervised | Data kompleks |
| Deep Learning | Supervised | Gambar, suara, bahasa, dan data kompleks |
| K-Means | Unsupervised | Clustering |
| Hierarchical Clustering | Unsupervised | Clustering |
| DBSCAN | Unsupervised | Clustering berbentuk tidak beraturan |
| PCA | Unsupervised | Pengurangan dimensi |

---

## 6. Gambaran Besar Machine Learning

Secara keseluruhan, Machine Learning dapat dipahami melalui struktur berikut:

```text
Machine Learning
|
+-- Supervised Learning
|   |
|   +-- Regression
|   |   |
|   |   +-- Linear Regression
|   |
|   +-- Classification
|       |
|       +-- Logistic Regression
|       +-- KNN
|       +-- SVM
|       +-- Naive Bayes
|       +-- Decision Tree
|       +-- Random Forest
|       +-- Boosting
|
+-- Unsupervised Learning
|   |
|   +-- Clustering
|   |   |
|   |   +-- K-Means
|   |   +-- Hierarchical Clustering
|   |   +-- DBSCAN
|   |
|   +-- Dimensionality Reduction
|       |
|       +-- PCA
|
+-- Deep Learning
    |
    +-- Neural Networks
```

### Inti Pembelajaran

Secara sederhana:

- **Supervised Learning** belajar dari data yang memiliki jawaban.
- **Unsupervised Learning** mencari pola dari data tanpa jawaban.
- **Deep Learning** menggunakan neural network dengan banyak lapisan untuk mempelajari pola yang kompleks secara otomatis.

## Referensi

<iframe width="560" height="315" src="https://www.youtube.com/embed/E0Hmnixke2g?si=_JXpI9KLrsM96C0t" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>