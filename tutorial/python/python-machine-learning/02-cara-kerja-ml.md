---
sidebar_position: 2
title: "Cara Kerja Machine Learning"
---

Untuk memahami Machine Learning, kita perlu memahami terlebih dahulu perbedaan antara cara komputer bekerja dalam **pemrograman tradisional** dan bagaimana komputer dapat "belajar" menggunakan Machine Learning.

Manusia dapat mengenali berbagai pola dengan mudah. Misalnya, ketika melihat gambar ular, manusia dapat mengenalinya meskipun gambar tersebut memiliki warna, bentuk, sudut pengambilan, atau gaya visual yang berbeda.

Bagi komputer, proses tersebut jauh lebih sulit.

---

## Tantangan Pemrograman Tradisional

Dalam pemrograman tradisional, programmer harus memberikan aturan yang jelas kepada komputer.

Misalnya kita ingin membuat program yang dapat mengenali gambar ular.

Kita mungkin mencoba membuat aturan seperti:

```text
Memiliki sisik
Memiliki tubuh panjang
Tidak memiliki kaki
Tidak memiliki tangan
```

Namun, aturan tersebut belum tentu cukup.

Misalnya:

```text
Tidak memiliki kaki
      ↓
    Ular?
    Pesawat?
    Ikan?
    Cacing?
```

Banyak objek lain yang juga tidak memiliki kaki.

Masalahnya semakin kompleks ketika kondisi gambar berubah:

```text
Ular berwarna hijau
Ular berwarna hitam
Ular dalam bentuk kartun
Ular dari sudut berbeda
Ular dengan pencahayaan berbeda
```

Kita akan membutuhkan semakin banyak aturan untuk menangani setiap kemungkinan.

---

## Manusia vs Komputer dalam Mengenali Pola

Manusia memiliki kemampuan alami untuk mengenali pola.

Ketika melihat sebuah gambar, manusia dapat menggunakan berbagai karakteristik secara bersamaan untuk menentukan apa yang sedang dilihat.

```text
Bentuk
Warna
Tekstur
Pola
Konteks
```

Kemudian otak manusia dapat mengambil keputusan:

```text
"Gambar tersebut adalah ular."
```

Komputer tidak memiliki pemahaman tersebut secara alami.

Jika menggunakan pemrograman tradisional, programmer harus mencoba menerjemahkan karakteristik tersebut menjadi aturan yang dapat dipahami komputer.

Inilah salah satu alasan mengapa pendekatan pemrograman tradisional menjadi sulit ketika berhadapan dengan data dan pola yang kompleks.

---

## Pemrograman Tradisional

Pada pemrograman tradisional, programmer menentukan **function atau aturan** yang digunakan untuk menghasilkan output.

Secara sederhana:

```text
Input + Function → Output
```

Contohnya:

```text
Input
  ↓
Function yang dibuat programmer
  ↓
Output
```

Programmer mengetahui aturan yang digunakan untuk mengubah input menjadi output.

Misalnya:

```text
Input:
Nilai = 80

Function:
Jika nilai >= 75 → Lulus

Output:
Lulus
```

Dalam pendekatan ini, **function dibuat oleh programmer**.

---

## Machine Learning

Machine Learning menggunakan paradigma yang berbeda.

Alih-alih programmer menentukan seluruh aturan, komputer diberikan contoh **input dan output** sehingga komputer dapat mempelajari hubungan di antara keduanya.

Secara sederhana:

```text
Input + Output → Function
```

Function tersebut kemudian dipelajari oleh komputer.

```text
Input + Output
      ↓
Machine Learning
      ↓
Function / Model
```

Dengan kata lain, programmer tidak perlu menuliskan seluruh aturan secara eksplisit.

Komputer mencoba menemukan pola dari data yang diberikan dan menghasilkan sebuah **model**.

---

## Perbandingan Paradigma

Perbedaan kedua pendekatan dapat digambarkan sebagai berikut.

### Pemrograman Tradisional

```text
Input
  +
Function
  ↓
Output
```

Function ditentukan oleh programmer.

### Machine Learning

```text
Input
  +
Output
  ↓
Machine Learning
  ↓
Function / Model
```

Function dipelajari oleh komputer berdasarkan data.

Perbedaan ini merupakan salah satu konsep paling penting untuk memahami Machine Learning.

---

## Contoh Sederhana

Bayangkan kita ingin membuat sistem untuk memprediksi harga rumah.

Dalam pemrograman tradisional, kita mungkin harus menentukan aturan:

```text
Jika luas > X
dan lokasi = A
dan kamar > Y
maka harga = Z
```

Semakin kompleks masalahnya, semakin banyak aturan yang harus dibuat.

Dalam Machine Learning, kita dapat memberikan data historis:

```text
Luas   Kamar   Lokasi   Harga
--------------------------------
100      3       A      500
120      3       A      600
150      4       B      800
200      5       B      1000
```

Model akan mempelajari hubungan antara karakteristik rumah dan harga.

Setelah model terbentuk:

```text
Data Rumah Baru
      ↓
    Model
      ↓
Prediksi Harga
```

Model tersebut menjadi function yang dipelajari berdasarkan data.

---

## Apa yang Dimaksud dengan Model?

Dalam Machine Learning, **model** dapat dipahami sebagai function yang dipelajari dari data.

Model menerima input dan menghasilkan output.

```text
Input
  ↓
Model
  ↓
Output
```

Contohnya:

```text
Data Rumah
    ↓
Model Machine Learning
    ↓
Prediksi Harga
```

Model tidak dibuat dengan menuliskan semua aturan secara manual.

Sebaliknya, model dibentuk melalui proses pembelajaran menggunakan data.

---

## Data Training

Untuk membuat model, kita membutuhkan data yang digunakan dalam proses pembelajaran.

Data tersebut disebut **training data** atau data pelatihan.

Training data berisi contoh input dan output yang digunakan model untuk mempelajari pola.

Secara sederhana:

```text
Training Data
      ↓
Learning Process
      ↓
    Model
```

Semakin baik data yang digunakan, semakin besar peluang model dapat mempelajari pola yang berguna.

Contohnya untuk prediksi harga rumah:

```text
Input:
- Luas rumah
- Jumlah kamar
- Lokasi

Output:
- Harga rumah
```

Model mempelajari hubungan antara input dan output tersebut.

---

## Proses Pembelajaran Machine Learning

Secara sederhana, proses Machine Learning dapat digambarkan:

```text
Training Data
     │
     ├── Input
     │
     └── Output
          ↓
    Machine Learning
          ↓
        Model
          ↓
     Data Baru
          ↓
       Prediksi
```

Pada tahap training, komputer mencoba menemukan pola yang dapat menjelaskan hubungan antara input dan output.

Setelah model selesai dipelajari, model dapat digunakan untuk menghasilkan prediksi pada data baru.

---

## Dari Data Menjadi Model

Proses utama Machine Learning dapat disederhanakan menjadi:

```text
Data
 ↓
Training
 ↓
Learning Patterns
 ↓
Model
```

Model kemudian digunakan:

```text
Data Baru
   ↓
 Model
   ↓
Prediction
```

Jadi, salah satu tujuan utama Machine Learning adalah menghasilkan model yang dapat melakukan generalisasi terhadap data baru.

---

## Black Box Phenomenon

Semakin kompleks sebuah model Machine Learning, semakin sulit bagi manusia untuk memahami seluruh proses internalnya.

Hal ini sering disebut sebagai **Black Box**.

Gambaran sederhananya:

```text
Input
  ↓
┌─────────────────┐
│      Model      │
│                 │
│   ???           │
│   ???           │
│   ???           │
└─────────────────┘
  ↓
Output
```

Kita mengetahui:

```text
Input → Model → Output
```

Namun, untuk model yang kompleks, memahami secara detail bagaimana setiap keputusan internal dibuat dapat menjadi sangat sulit.

---

## Mengapa Disebut Black Box?

Istilah **Black Box** digunakan untuk menggambarkan sistem yang:

```text
      Input
        ↓
[ Proses Internal ]
        ↓
      Output
```

Kita dapat melihat input dan output, tetapi proses internalnya sulit dipahami secara lengkap.

Dalam Machine Learning, fenomena ini semakin terlihat ketika model menjadi semakin kompleks.

Contohnya, model dapat menerima sebuah gambar:

```text
Gambar
  ↓
Model
  ↓
"Ular"
```

Kita mengetahui bahwa model menghasilkan prediksi "ular", tetapi memahami seluruh proses internal yang menghasilkan keputusan tersebut bisa menjadi sangat kompleks.

---

## Ringkasan Perbedaan

| Pemrograman Tradisional | Machine Learning |
| --- | --- |
| Programmer menentukan function | Komputer mempelajari function |
| Input + Function | Input + Output |
| Output dihasilkan berdasarkan aturan | Model dipelajari dari data |
| Aturan ditulis secara eksplisit | Pola dipelajari dari data |
| Cocok untuk aturan yang jelas | Cocok untuk pola yang sulit ditulis secara eksplisit |

Secara visual:

```text
Pemrograman Tradisional

Input + Function
       ↓
     Output
```

```text
Machine Learning

Input + Output
       ↓
  Learning Process
       ↓
     Model
```

---

## Konsep Penting

Beberapa istilah yang perlu dipahami:

### Input

Data yang diberikan kepada model.

Contoh:

```text
Gambar
Ukuran rumah
Jumlah kamar
Teks
Data sensor
```

### Output

Hasil yang ingin dihasilkan atau dipelajari oleh model.

Contoh:

```text
Kucing
Harga rumah
Spam
Bukan spam
```

### Training Data

Kumpulan data yang digunakan untuk melatih model.

```text
Input + Output
      ↓
Training Data
```

### Model

Function yang dipelajari dari training data.

```text
Training Data
      ↓
    Model
```

### Prediction

Output yang dihasilkan model ketika diberikan data baru.

```text
Data Baru
   ↓
 Model
   ↓
Prediction
```

### Black Box

Kondisi ketika proses internal model sulit dipahami secara lengkap, terutama pada model yang kompleks.

---

## Gambaran Besar

Seluruh konsep dapat dirangkum menjadi:

```text
            PEMROGRAMAN TRADISIONAL

              Input + Function
                     ↓
                   Output

────────────────────────────────────────

            MACHINE LEARNING

              Input + Output
                     ↓
             Learning Process
                     ↓
                   Model
                     ↓
                 Data Baru
                     ↓
                 Prediction
```

---

## Kesimpulan

Machine Learning memberikan pendekatan berbeda dalam menyelesaikan masalah yang sulit dijelaskan menggunakan aturan pemrograman tradisional.

Pada pemrograman tradisional:

```text
Programmer → Membuat Function
```

Sedangkan pada Machine Learning:

```text
Programmer → Menyediakan Data
Komputer   → Mempelajari Pola
Komputer   → Menghasilkan Model
```

Model yang dihasilkan kemudian dapat digunakan untuk memproses data baru dan menghasilkan prediksi.

Konsep sederhana yang perlu diingat adalah:

:::info
**Pemrograman tradisional memberikan aturan kepada komputer, sedangkan Machine Learning memberikan data agar komputer dapat mempelajari pola dan membentuk model.**
:::