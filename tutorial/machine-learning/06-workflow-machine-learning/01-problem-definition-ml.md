---
sidebar_position: 1
title: "Problem Definition"
---

**Problem Definition** atau definisi masalah merupakan langkah pertama dalam workflow Machine Learning.

Sebelum memilih algoritma, mengumpulkan dataset, atau menulis kode Python, kita harus terlebih dahulu memahami:

> **"Masalah apa yang sebenarnya ingin kita selesaikan?"**

Pertanyaan ini terlihat sederhana, tetapi sangat penting.

Banyak proyek Machine Learning gagal bukan karena algoritmanya buruk, tetapi karena sejak awal masalah yang ingin diselesaikan tidak didefinisikan dengan jelas.

Secara sederhana:

```text
Masalah
   ↓
Problem Definition
   ↓
Menentukan pendekatan
   ↓
Menentukan data
   ↓
Membangun model
```

Jadi, **jangan mulai dari algoritma**.

Mulailah dari masalah.

---

## Mengapa Problem Definition Penting?

Bayangkan seseorang berkata:

> "Saya ingin membuat Machine Learning."

Pernyataan tersebut belum menjelaskan apa pun tentang masalah yang akan diselesaikan.

Kita belum mengetahui:

- Apa tujuan model?
- Apa yang ingin diprediksi?
- Siapa pengguna model?
- Data apa yang tersedia?
- Apakah ada label?
- Apakah hasilnya berupa kategori atau angka?
- Apakah Machine Learning memang diperlukan?

Problem Definition membantu mengubah masalah yang masih umum menjadi masalah yang dapat diselesaikan secara sistematis.

Contohnya:

```text
Masalah umum:
"Penjualan perusahaan menurun."

    ↓

Pertanyaan:
"Apakah kita dapat memprediksi penjualan bulan depan
berdasarkan data penjualan sebelumnya?"
```

Sekarang masalah tersebut sudah mulai dapat diterjemahkan menjadi masalah Machine Learning.

---

## Pertanyaan Utama Problem Definition

Beberapa pertanyaan yang sebaiknya dijawab pada tahap ini:

1. Apa masalah yang ingin diselesaikan?
2. Apa tujuan dari sistem?
3. Apakah Machine Learning diperlukan?
4. Apakah kita memiliki data yang sesuai?
5. Apa yang ingin diprediksi atau ditemukan?
6. Apakah masalah termasuk supervised, unsupervised, transfer learning, atau reinforcement learning?
7. Jika supervised learning, apakah masalahnya classification atau regression?
8. Bagaimana hasil model akan digunakan?

Semakin jelas jawaban terhadap pertanyaan tersebut, semakin jelas pula arah proyek Machine Learning.

---

## Kapan Tidak Menggunakan Machine Learning?

Hal yang sangat penting untuk dipahami:

> **Machine Learning bukan solusi untuk semua masalah.**

Kadang-kadang masalah dapat diselesaikan menggunakan aturan sederhana.

Jika sebuah masalah dapat diselesaikan menggunakan:

- `if`
- `else`
- formula matematika,
- aturan bisnis,
- pencarian sederhana,
- database query,
- atau algoritma deterministik,

maka kita tidak selalu membutuhkan Machine Learning.

---

### Contoh Masalah yang Tidak Membutuhkan Machine Learning

Misalnya sebuah toko memberikan diskon:

```text
Jika total belanja >= Rp1.000.000
maka diskon = 10%

Jika total belanja < Rp1.000.000
maka diskon = 0%
```

Kita tidak membutuhkan Machine Learning.

Program sederhana sudah cukup:

```python
total = 1_200_000

if total >= 1_000_000:
    diskon = 0.10
else:
    diskon = 0

print(diskon)
```

Aturan tersebut jelas dan mudah ditulis.

Tidak ada alasan kuat untuk menggunakan Machine Learning.

---

### Contoh Masalah yang Cocok untuk Machine Learning

Sekarang bayangkan kita ingin menentukan apakah sebuah email merupakan spam.

Aturannya mungkin sangat kompleks.

Email spam dapat memiliki:

- kata-kata tertentu,
- pola tertentu,
- kombinasi kata,
- struktur kalimat,
- alamat pengirim,
- jumlah link,
- pola historis,
- dan karakteristik lainnya.

Menulis seluruh aturan secara manual akan menjadi sangat sulit.

Dalam kondisi seperti ini, Machine Learning dapat membantu.

```text
Data email
    ↓
Label spam / bukan spam
    ↓
Machine Learning
    ↓
  Model
    ↓
Prediksi email baru
```

Model mempelajari pola dari contoh yang tersedia.

---

## Prinsip Sederhana Memilih Machine Learning

Kita dapat menggunakan pertanyaan sederhana:

> **"Apakah aturan untuk menyelesaikan masalah ini mudah ditulis secara manual?"**

Jika jawabannya **ya**, sistem berbasis aturan mungkin sudah cukup.

Jika jawabannya **tidak**, Machine Learning mungkin menjadi salah satu pilihan.

Contohnya:

| Masalah | Pendekatan yang mungkin |
|---|---|
| Menghitung total harga | Program biasa |
| Menghitung pajak berdasarkan aturan tetap | Program biasa |
| Mengecek format email | Program biasa |
| Mendeteksi spam | Machine Learning |
| Memprediksi harga rumah | Machine Learning |
| Mengenali objek dalam gambar | Machine Learning |
| Memprediksi pelanggan berhenti berlangganan | Machine Learning |

Namun perlu diingat bahwa tabel tersebut bukan aturan mutlak.

Pemilihan teknologi tetap bergantung pada kebutuhan dan karakteristik masalah.

---

## 4 Tipe Utama Pendekatan Machine Learning

Setelah menentukan bahwa Machine Learning memang relevan, kita perlu menentukan jenis masalahnya.

Dalam pembahasan ini kita akan mengenal empat pendekatan:

1. **Supervised Learning**
2. **Unsupervised Learning**
3. **Transfer Learning**
4. **Reinforcement Learning**

Masing-masing memiliki cara belajar dan tujuan yang berbeda.

---

## 1️⃣ Supervised Learning

**Supervised Learning** adalah pendekatan Machine Learning ketika model belajar dari data yang memiliki **label atau target**.

Sederhananya:

```text
Input
  +
Label / Target
  ↓
Machine Learning
  ↓
Model
```

Model belajar hubungan antara input dan target.

Setelah belajar, model dapat digunakan untuk memprediksi target pada data baru.

---

### Contoh Supervised Learning

Misalnya kita memiliki dataset harga rumah:

| Luas | Kamar | Lokasi | Harga |
|---:|---:|---|---:|
| 100 | 3 | Kota A | 700 jt |
| 150 | 4 | Kota A | 950 jt |
| 200 | 5 | Kota B | 1,4 M |

Di sini:

```text
Features:
Luas
Kamar
Lokasi

Target:
Harga
```

Karena kita mengetahui target dari data training, masalah tersebut termasuk **Supervised Learning**.

---

### Dua Jenis Utama Supervised Learning

Supervised Learning biasanya dibagi menjadi:

```text
Supervised Learning
       │
       ├── Classification
       │
       └── Regression
```

Perbedaannya terletak pada jenis target yang ingin diprediksi.

---

## ✅ Classification

**Classification** digunakan ketika model harus memprediksi **kategori**.

Contoh:

```text
Spam / Bukan Spam
Sakit / Tidak Sakit
Lulus / Tidak Lulus
Kucing / Anjing
```

Model tidak menghasilkan angka kontinu sebagai target utama, tetapi memilih kategori.

---

### Binary Classification

**Binary Classification** adalah classification dengan hanya **dua kategori**.

Contoh:

```text
Penyakit jantung:
    Ya
    Tidak
```

Contoh lain:

```text
Email:
    Spam
    Bukan Spam
```

Secara sederhana:

```text
Input
  ↓
Model
  ↓
Kategori A atau Kategori B
```

---

### Contoh Binary Classification

Misalnya kita ingin memprediksi apakah seorang pasien memiliki penyakit jantung.

Dataset:

| Usia | Tekanan Darah | Kolesterol | Penyakit |
|---:|---:|---:|---|
| 45 | 140 | 240 | Ya |
| 32 | 120 | 180 | Tidak |
| 61 | 150 | 270 | Ya |

Model mempelajari hubungan antara:

```text
Usia
Tekanan Darah
Kolesterol
```

dengan:

```text
Penyakit
```

Kemudian ketika diberikan pasien baru:

```text
Usia = 50
Tekanan Darah = 145
Kolesterol = 250
```

model dapat menghasilkan:

```text
Prediksi = Ya
```

---

### Multiclass Classification

**Multiclass Classification** digunakan ketika terdapat lebih dari dua kategori.

Contohnya sistem ingin mengenali jenis anjing dari sebuah gambar.

Kategori:

```text
Golden Retriever
Bulldog
Beagle
Poodle
Husky
```

Model harus memilih salah satu dari beberapa kategori.

Contoh lain:

```text
Jenis kendaraan:

Mobil
Motor
Bus
Truk
Sepeda
```

Berbeda dengan binary classification:

```text
Binary:
A / B

Multiclass:
A / B / C / D / ...
```

---

## ✅ Regression

**Regression** digunakan ketika target yang ingin diprediksi berupa **nilai numerik kontinu**.

Contoh:

- harga rumah,
- harga kendaraan,
- jumlah penjualan,
- suhu,
- pendapatan,
- permintaan produk.

Misalnya:

```text
Input
↓
Data rumah
↓
Model
↓
Rp850.000.000
```

Output berupa angka.

---

### Contoh Regression

Dataset:

| Luas | Kamar | Harga |
|---:|---:|---:|
| 100 | 3 | 700 jt |
| 150 | 4 | 950 jt |
| 200 | 5 | 1,4 M |

Kita ingin memprediksi harga rumah baru.

Input:

```text
Luas = 175 m²
Kamar = 4
```

Model dapat menghasilkan:

```text
Prediksi = Rp1.100.000.000
```

Karena target berupa nilai numerik, masalah tersebut termasuk **Regression**.

---

## 📝 Classification vs Regression

Perbedaan utama:

| Classification | Regression |
|---|---|
| Memprediksi kategori | Memprediksi angka |
| Spam / bukan spam | Harga rumah |
| Sakit / tidak sakit | Suhu |
| Kucing / anjing | Pendapatan |
| Lulus / tidak lulus | Penjualan |

Cara mudah mengingat:

> **Classification → "Kategori apa?"**

> **Regression → "Berapa nilainya?"**

---

## 2️⃣ Unsupervised Learning

Berbeda dengan Supervised Learning, **Unsupervised Learning** bekerja dengan data yang tidak memiliki label target.

Sederhananya:

```text
Data
 ↓
Machine Learning
 ↓
Mencari pola
 ↓
Kelompok / struktur / hubungan
```

Model mencoba menemukan pola dari data secara mandiri.

---

### Contoh Unsupervised Learning

Misalnya sebuah perusahaan memiliki data pelanggan:

| Usia | Pendapatan | Pengeluaran |
|---:|---:|---:|
| 22 | 4 jt | 3,5 jt |
| 25 | 4,5 jt | 3,8 jt |
| 45 | 15 jt | 5 jt |
| 48 | 17 jt | 5,5 jt |

Tidak terdapat kolom:

```text
Kelompok Pelanggan
```

Kita dapat menggunakan Unsupervised Learning untuk menemukan kelompok pelanggan berdasarkan kemiripan karakteristik mereka.

Misalnya model menemukan:

```text
Cluster 1
→ pelanggan muda dengan pengeluaran tinggi

Cluster 2
→ pelanggan dengan pendapatan tinggi

Cluster 3
→ pelanggan dengan pendapatan dan pengeluaran rendah
```

Kelompok tersebut ditemukan berdasarkan pola dalam data.

---

## ✅ Clustering

Salah satu teknik populer dalam Unsupervised Learning adalah **Clustering**.

Clustering bertujuan mengelompokkan data yang memiliki karakteristik serupa.

Contoh:

```text
Data Pelanggan
      ↓
   Clustering
      ↓
┌─────┼─────┐
↓     ↓     ↓
A     B     C
```

Contoh penggunaan:

- segmentasi pelanggan,
- pengelompokan produk,
- analisis perilaku pengguna,
- pengelompokan dokumen,
- analisis pola pembelian.

Salah satu algoritma clustering yang populer adalah **K-Means**.

Contoh sederhana menggunakan Scikit-learn:

```python
from sklearn.cluster import KMeans

model = KMeans(
    n_clusters=3,
    random_state=42
)

model.fit(X)

labels = model.labels_

print(labels)
```

Hasil `labels` menunjukkan kelompok yang diberikan model kepada setiap data.

---

## 3️⃣ Transfer Learning

**Transfer Learning** merupakan pendekatan ketika kita memanfaatkan pengetahuan atau pola yang sudah dipelajari oleh model sebelumnya untuk menyelesaikan tugas baru.

Konsep sederhananya:

```text
Model yang sudah dilatih
        ↓
Pengetahuan / pola
        ↓
Tugas baru
        ↓
Model baru
```

Kita tidak selalu harus melatih model dari awal.

---

### Mengapa Transfer Learning Berguna?

Melatih model dari awal dapat membutuhkan:

- dataset besar,
- waktu training panjang,
- GPU atau hardware yang lebih kuat,
- biaya komputasi,
- dan eksperimen yang lebih banyak.

Dengan Transfer Learning, kita dapat menggunakan model yang sudah memiliki kemampuan tertentu sebagai titik awal.

---

### Contoh Transfer Learning

Bayangkan sebuah model computer vision telah dilatih menggunakan jutaan gambar.

Model tersebut telah belajar mengenali pola seperti:

```text
tepi
tekstur
bentuk
warna
pola visual
```

Kemudian kita ingin membuat model untuk mengenali jenis anjing.

Daripada melatih model dari nol, kita dapat menggunakan model yang sudah dilatih tersebut sebagai dasar.

```text
Model pretrained
       ↓
Pengetahuan visual
       ↓
Fine-tuning
       ↓
Klasifikasi ras anjing
```

Model sebelumnya mungkin tidak secara khusus mengetahui ras anjing, tetapi pola visual yang telah dipelajarinya dapat membantu tugas baru.

---

### Pretrained Model

Model yang telah dilatih sebelumnya sering disebut **pretrained model**.

Dalam berbagai bidang kita dapat menemukan pretrained model untuk:

- computer vision,
- natural language processing,
- speech recognition,
- image generation,
- dan berbagai tugas lainnya.

Transfer Learning menjadi sangat penting terutama ketika dataset untuk tugas baru relatif terbatas.

---

## 4️⃣ Reinforcement Learning

**Reinforcement Learning** memiliki pendekatan yang berbeda dari supervised dan unsupervised learning.

Dalam Reinforcement Learning, sebuah **agent** belajar dengan berinteraksi dengan **environment**.

Agent melakukan tindakan atau **action**, kemudian menerima **reward** atau **penalty** berdasarkan tindakan tersebut.

Secara sederhana:

```text
        Environment
             ↑
             │
          Reward
             │
             │
          Agent
             │
           Action
             ↓
        Environment
```

Agent mencoba menemukan tindakan yang menghasilkan reward terbaik.

---

### Komponen Reinforcement Learning

Beberapa konsep penting:

* #### Agent

Agent adalah sistem yang belajar dan mengambil keputusan.

Contohnya:

```text
AI pemain catur
Robot
AI permainan
```

* #### Environment

Environment adalah lingkungan tempat agent berinteraksi.

Contohnya:

```text
Papan catur
Permainan Go
Lingkungan robot
Simulasi kendaraan
```

* #### Action

Action adalah tindakan yang dapat dilakukan agent.

Contohnya dalam permainan catur:

```text
Memindahkan bidak
```

* #### Reward

Reward merupakan nilai positif yang diberikan ketika agent melakukan tindakan yang dianggap baik.

Contohnya:

```text
Menang → reward besar
```

* #### Penalty

Penalty merupakan konsekuensi negatif dari tindakan tertentu.

Contohnya:

```text
Kalah → penalty
```

---

### Contoh Reinforcement Learning pada Game

Bayangkan kita ingin mengajari AI bermain game.

Pada awalnya AI belum mengetahui strategi terbaik.

AI mencoba berbagai tindakan:

```text
Action A → Reward kecil
Action B → Reward besar
Action C → Penalty
```

Setelah melakukan banyak percobaan, agent belajar bahwa beberapa tindakan menghasilkan reward yang lebih baik.

Proses tersebut dapat digambarkan:

```text
Coba tindakan
      ↓
Dapat reward / penalty
      ↓
Belajar dari hasil
      ↓
Coba lagi
      ↓
Perbaiki strategi
      ↓
Ulangi
```

Contoh terkenal dari penerapan Reinforcement Learning adalah sistem AI yang belajar memainkan permainan seperti catur dan Go.

---

## Perbandingan 4 Pendekatan

Keempat pendekatan tersebut memiliki karakteristik berbeda.

| Pendekatan | Data | Tujuan Utama | Contoh |
|---|---|---|---|
| Supervised Learning | Berlabel | Prediksi target | Prediksi harga |
| Unsupervised Learning | Tidak berlabel | Menemukan pola | Segmentasi pelanggan |
| Transfer Learning | Model pretrained + data baru | Memanfaatkan pengetahuan sebelumnya | Klasifikasi gambar |
| Reinforcement Learning | Interaksi + reward | Belajar mengambil tindakan | Game / robot |

Cara sederhana memahaminya:

```text
Supervised
→ Belajar dari contoh yang sudah memiliki jawaban

Unsupervised
→ Mencari pola tanpa jawaban

Transfer Learning
→ Menggunakan pengetahuan dari model sebelumnya

Reinforcement Learning
→ Belajar dari tindakan dan reward
```

---

## ✅ Decision Tree untuk Menentukan Pendekatan

Kita dapat menggunakan logika sederhana berikut ketika mulai mendefinisikan masalah:

```text
Apakah masalah dapat diselesaikan
dengan aturan sederhana?
        │
   ┌────┴────┐
  Ya        Tidak
  │           │
  ↓           ↓
Program     Machine Learning
biasa           │
                ↓
       Apakah memiliki label?
          │             │
         Ya           Tidak
          │             │
          ↓             ↓
    Supervised     Unsupervised
          │
     ┌────┴────┐
     ↓         ↓
Classification Regression
```

Transfer Learning dan Reinforcement Learning digunakan pada situasi yang berbeda sesuai karakteristik masalah.

---

## Contoh Problem Definition Lengkap

Mari kita lihat beberapa contoh bagaimana sebuah masalah dapat didefinisikan.

### Contoh 1 - Prediksi Harga Rumah

Masalah:

> Agen properti ingin memperkirakan harga rumah berdasarkan karakteristik rumah.

Pertanyaan:

```text
Apa yang ingin diprediksi?
→ Harga rumah

Apakah memiliki data historis?
→ Ya

Apakah target tersedia?
→ Ya

Target berupa apa?
→ Angka
```

Maka:

```text
Machine Learning
      ↓
Supervised Learning
      ↓
Regression
```

---

### Contoh 2 - Deteksi Spam

Masalah:

> Sistem email ingin mendeteksi apakah sebuah email merupakan spam.

Pertanyaan:

```text
Apa yang ingin diprediksi?
→ Spam atau bukan spam

Apakah memiliki data email sebelumnya?
→ Ya

Apakah memiliki label?
→ Ya

Target berupa apa?
→ Kategori
```

Maka:

```text
Machine Learning
      ↓
Supervised Learning
      ↓
Classification
      ↓
Binary Classification
```

---

### Contoh 3 - Segmentasi Pelanggan

Masalah:

> Perusahaan ingin mengetahui kelompok pelanggan berdasarkan perilaku pembelian.

Pertanyaan:

```text
Apakah terdapat label kelompok?
→ Tidak

Apa yang ingin ditemukan?
→ Pola / kelompok pelanggan
```

Maka:

```text
Machine Learning
      ↓
Unsupervised Learning
      ↓
Clustering
```

---

### Contoh 4 - Mengenali Ras Anjing

Masalah:

> Kita ingin membuat sistem yang dapat mengenali ras anjing dari gambar.

Jika tersedia model computer vision yang sudah dilatih, kita dapat mempertimbangkan:

```text
Pretrained Model
       ↓
Transfer Learning
       ↓
Fine-tuning
       ↓
Dog Breed Classification
```

---

### Contoh 5 - AI Bermain Catur

Masalah:

> Kita ingin membuat AI yang dapat belajar bermain catur.

Agent:

```text
AI
```

Environment:

```text
Papan catur
```

Action:

```text
Memindahkan bidak
```

Reward:

```text
Menang
```

Penalty:

```text
Kalah
```

Maka pendekatan yang sesuai dapat berupa:

```text
Reinforcement Learning
```

---

## Problem Definition yang Baik

Problem Definition yang baik sebaiknya tidak hanya mengatakan:

> "Kita ingin membuat model Machine Learning."

Tetapi menjelaskan tujuan secara lebih spesifik.

Contoh yang lebih baik:

> "Membangun model Machine Learning yang dapat memprediksi harga rumah berdasarkan luas bangunan, jumlah kamar, lokasi, dan karakteristik rumah lainnya."

Atau:

> "Membangun model classification yang dapat memprediksi apakah sebuah email termasuk spam berdasarkan karakteristik dan isi email."

Definisi seperti ini memberikan arah yang lebih jelas untuk tahap berikutnya.

---

## Hal yang Perlu Dihindari

### Memulai dari Algoritma

Kurang tepat:

```text
Saya ingin menggunakan Random Forest.
```

Sebelum mengetahui masalahnya.

Lebih baik:

```text
Definisikan masalah
        ↓
Pahami data
        ↓
Tentukan jenis masalah
        ↓
Pilih pendekatan
        ↓
Pilih algoritma
```

---

### Menggunakan Machine Learning untuk Semua Masalah

Machine Learning memiliki biaya.

Kita mungkin membutuhkan:

- pengumpulan data,
- preprocessing,
- training,
- evaluasi,
- deployment,
- monitoring,
- maintenance.

Jika sebuah masalah dapat diselesaikan dengan beberapa baris kode sederhana, Machine Learning mungkin justru membuat sistem menjadi lebih kompleks.

---

### Tidak Memikirkan Tujuan Akhir

Model Machine Learning bukan tujuan akhir.

Model dibuat untuk membantu menyelesaikan masalah tertentu.

Contohnya:

```text
Model prediksi harga
        ↓
Membantu agen menentukan estimasi harga
```

atau:

```text
Model deteksi spam
        ↓
Membantu sistem email menyaring pesan
```

Jadi selalu hubungkan model dengan kebutuhan nyata.

---

## Checklist Problem Definition

Sebelum melanjutkan ke tahap berikutnya, gunakan checklist berikut:

```text
□ Masalah sudah didefinisikan dengan jelas
□ Tujuan proyek sudah diketahui
□ Machine Learning memang diperlukan
□ Data yang dibutuhkan sudah dipertimbangkan
□ Target sudah ditentukan jika menggunakan supervised learning
□ Jenis masalah sudah ditentukan
□ Classification atau regression sudah ditentukan jika relevan
□ Cara model digunakan sudah dipahami
□ Batasan proyek sudah dipertimbangkan
```

Jika sebagian besar pertanyaan tersebut sudah terjawab, kita memiliki dasar yang cukup untuk melanjutkan ke tahap berikutnya.

---

## Ringkasan

**Problem Definition** adalah langkah pertama dalam workflow Machine Learning.

Pertanyaan utamanya adalah:

> **"Masalah apa yang ingin kita selesaikan?"**

Tidak semua masalah membutuhkan Machine Learning.

Jika masalah dapat diselesaikan dengan aturan sederhana, sistem tradisional sering kali menjadi pilihan yang lebih tepat.

Jika Machine Learning memang diperlukan, kita perlu menentukan pendekatan yang sesuai.

```text
Machine Learning
│
├── Supervised Learning
│   ├── Classification
│   │   ├── Binary Classification
│   │   └── Multiclass Classification
│   │
│   └── Regression
│
├── Unsupervised Learning
│   └── Clustering
│
├── Transfer Learning
│
└── Reinforcement Learning
```

Inti dari tahap ini adalah:

> **Jangan memulai Machine Learning dengan pertanyaan "algoritma apa yang digunakan?"**

Mulailah dengan:

> **"Masalah apa yang ingin diselesaikan?"**

Kemudian tentukan apakah Machine Learning memang diperlukan, jenis masalahnya, data yang dibutuhkan, dan pendekatan yang paling sesuai.

Setelah masalah berhasil didefinisikan, tahap berikutnya adalah memahami **data** yang akan digunakan untuk menyelesaikan masalah tersebut.
