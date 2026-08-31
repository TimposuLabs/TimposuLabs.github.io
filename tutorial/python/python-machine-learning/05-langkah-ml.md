---
sidebar_position: 5
title: "Langkah-Langkah Kerja Machine Learning"
---

Machine Learning sering terlihat seperti bidang yang sangat kompleks karena melibatkan data, algoritma, statistik, dan matematika. Namun, dalam praktiknya, alur kerja dasar seorang praktisi **Machine Learning** atau **Data Scientist** dapat dipahami melalui beberapa langkah utama.

Secara umum:

```text
Import Data
     ↓
Clean Data
     ↓
Split Data
     ↓
Create Model
     ↓
Check Output
     ↓
 Improve
```

Enam langkah tersebut menjadi gambaran dasar bagaimana sebuah proyek Machine Learning dikembangkan dari data mentah hingga menghasilkan model yang dapat digunakan.

---

## 1. Mengimpor Data

Langkah pertama adalah **mengambil dan memasukkan data** ke dalam program.

Data dapat berasal dari berbagai sumber, misalnya:

```text
CSV
Database
API
Dataset
```

Setelah data diperoleh, data tersebut dimuat ke dalam lingkungan Python agar dapat diproses lebih lanjut.

Secara sederhana:

```text
Sumber Data
    ↓
Import
    ↓
Python
    ↓
Dataset
```

Contohnya, sebuah dataset dapat berisi informasi seperti:

```text
Age
Experience
Salary
Location
```

Data tersebut nantinya akan digunakan untuk proses pembelajaran Machine Learning.

---

## 2. Membersihkan Data

Data yang diperoleh dari dunia nyata biasanya tidak langsung siap digunakan.

Data dapat memiliki berbagai masalah, seperti:

```text
Missing Values
Data Tidak Konsisten
Data Rusak
Data Duplikat
```

Oleh karena itu, sebelum digunakan untuk melatih model, data perlu diperiksa dan dibersihkan.

Secara sederhana:

```text
Raw Data
   ↓
Data Cleaning
   ↓
Clean Data
```

Tujuan utama proses ini adalah memastikan data yang digunakan memiliki kualitas yang cukup baik untuk proses Machine Learning.

Data yang bermasalah dapat menyebabkan:

- Error ketika program dijalankan.
- Model sulit mempelajari pola.
- Hasil prediksi menjadi kurang baik.

---

## 3. Membagi Data

Setelah data dibersihkan, dataset biasanya dibagi menjadi beberapa bagian untuk tujuan yang berbeda.

Dua bagian utama yang diperkenalkan adalah:

```text
Dataset
   │
   ├── Training Set
   │
   └── Test Set
```

### Training Set

**Training Set** adalah data yang digunakan untuk melatih model.

Model mempelajari pola berdasarkan data tersebut.

Contohnya, jika tersedia 1000 data:

```text
800 data
   ↓
Training
```

Sebagai gambaran sederhana, sekitar **80% data** dapat digunakan sebagai Training Set.

### Test Set

**Test Set** digunakan untuk menguji kemampuan model setelah proses training.

Misalnya:

```text
200 data
   ↓
Testing
```

Sebagai gambaran sederhana, sekitar **20% data** dapat digunakan sebagai Test Set.

### Mengapa Data Harus Dibagi?

Model tidak hanya harus mampu mempelajari data yang sudah diberikan saat training.

Model juga harus mampu menghasilkan prediksi terhadap data yang belum pernah digunakan dalam proses training.

Alurnya:

```text
Training Data
     ↓
Model belajar
     ↓
   Model
     ↓
 Test Data
     ↓
 Prediksi
```

Dengan cara ini, kita dapat mengetahui seberapa baik model bekerja terhadap data yang tidak digunakan selama proses pembelajaran.

---

## 4. Membuat Model

Setelah data siap, langkah berikutnya adalah membuat **Machine Learning Model**.

Dalam praktiknya, programmer tidak selalu perlu menulis algoritma Machine Learning dari nol.

Python memiliki berbagai library yang menyediakan algoritma siap digunakan.

Salah satu library yang populer adalah:

```text
scikit-learn
```

Dengan library tersebut, kita dapat memilih algoritma yang sesuai dengan masalah yang sedang dikerjakan.

Contohnya:

```text
Decision Tree
K-Nearest Neighbors
```

Secara sederhana:

```text
Training Data
      ↓
  Algoritma
      ↓
Machine Learning Model
```

Pemilihan algoritma merupakan bagian penting karena tidak semua algoritma cocok untuk setiap jenis masalah dan dataset.

---

## 5. Memeriksa Hasil Prediksi

Setelah model dibuat dan dilatih, langkah berikutnya adalah memeriksa hasil prediksinya.

Model diuji menggunakan **Test Set**.

```text
Test Set
   ↓
 Model
   ↓
Prediction
```

Hasil prediksi kemudian dibandingkan dengan jawaban sebenarnya.

Contohnya:

```text
Jawaban Sebenarnya
        ↓
     "Lulus"

Prediksi Model
        ↓
     "Lulus"
```

Jika hasilnya sama, model berhasil menghasilkan prediksi yang benar untuk data tersebut.

Proses ini dilakukan untuk mengetahui seberapa baik performa model.

---

## 6. Meningkatkan Performa

Model pertama yang dibuat belum tentu memberikan hasil yang optimal.

Jika performanya masih kurang baik, kita dapat melakukan proses **improvement** atau peningkatan.

Beberapa pendekatan yang dapat dilakukan antara lain:

```text
Memperbaiki Data
      ↓
Menambahkan Fitur
      ↓
Mengubah Model
      ↓
Melakukan Tuning
      ↓
Evaluasi Kembali
```

### Menambahkan Fitur

Fitur adalah informasi yang digunakan sebagai input model.

Misalnya awalnya model menggunakan:

```text
Age
Experience
```

Kemudian ditambahkan:

```text
Education
Location
Skill
```

Dengan tambahan informasi tersebut, model mungkin dapat menemukan pola yang lebih baik.

---

### Mengganti Algoritma

Jika algoritma yang digunakan belum memberikan hasil yang baik, kita dapat mencoba algoritma lain.

Contohnya:

```text
Model A
   ↓
Performa kurang baik
   ↓
Model B
   ↓
Evaluasi
```

Misalnya mencoba:

```text
Decision Tree
KNN
```

Algoritma yang berbeda dapat menghasilkan performa yang berbeda pada dataset yang sama.

---

## Siklus Machine Learning

Keenam langkah tersebut sebenarnya bukan proses yang hanya dilakukan satu kali.

Dalam proyek nyata, prosesnya dapat dilakukan berulang kali.

```text
Import Data
     ↓
Clean Data
     ↓
Split Data
     ↓
Create Model
     ↓
Check Output
     ↓
Improve
     │
     └───────────────┐
                     ↓
                Evaluasi Lagi
                     ↓
                Model Lebih Baik
```

Jika hasil belum memuaskan, kita kembali melakukan perbaikan.

Dengan demikian, pengembangan model Machine Learning merupakan proses **iteratif**.

---

## Gambaran Lengkap Workflow

Seluruh proses dapat dirangkum menjadi:

```text
┌─────────────────┐
│   Import Data   │
└────────┬────────┘
         ↓
┌─────────────────┐
│   Clean Data    │
└────────┬────────┘
         ↓
┌─────────────────┐
│   Split Data    │
└────────┬────────┘
         ↓
┌─────────────────┐
│   Create Model  │
└────────┬────────┘
         ↓
┌─────────────────┐
│  Check Output   │
└────────┬────────┘
         ↓
┌─────────────────┐
│    Improve      │
└────────┬────────┘
         │
         └──────→ Evaluasi dan perbaikan
```

---

## Tantangan Terbesar: Data

Meskipun algoritma Machine Learning sangat penting, salah satu tantangan terbesar dalam Machine Learning adalah **data**.

Model membutuhkan data untuk belajar.

```text
Data
 ↓
Training
 ↓
Model
 ↓
Prediction
```

Jika data yang digunakan berkualitas buruk, model juga dapat menghasilkan performa yang kurang baik.

Karena itu, memiliki data yang:

```text
Berkualitas
Relevan
Cukup banyak
```

merupakan bagian penting dalam proyek Machine Learning.

---

## Mengapa Perusahaan Besar Memiliki Keunggulan?

Perusahaan teknologi besar seperti:

```text
Google
Meta
Amazon
```

memiliki akses terhadap data dalam jumlah yang sangat besar.

Data tersebut dapat berasal dari berbagai aktivitas pengguna:

```text
Search
Click
Purchase
Like
View
Interaction
```

Data dalam jumlah besar memberikan sumber informasi yang sangat berharga untuk membangun dan meningkatkan model Machine Learning.

Dengan demikian, keunggulan Machine Learning tidak hanya berasal dari algoritma yang digunakan, tetapi juga dari **kualitas dan jumlah data yang tersedia**.

---

## Ringkasan Enam Langkah

| Langkah | Tujuan |
| --- | --- |
| **Import Data** | Mengambil dan memuat dataset |
| **Clean Data** | Membersihkan masalah pada data |
| **Split Data** | Membagi data menjadi training dan testing |
| **Create Model** | Membuat model menggunakan algoritma Machine Learning |
| **Check Output** | Mengevaluasi hasil prediksi |
| **Improve** | Meningkatkan performa model |

Cara mudah mengingatnya:

```text
1. Import
2. Clean
3. Split
4. Create
5. Check
6. Improve
```

---

## Kesimpulan

Workflow Machine Learning tidak selalu berarti menulis algoritma yang kompleks dari awal.

Dalam praktiknya, seorang praktisi Machine Learning lebih banyak bekerja dengan proses:

```text
Data
 ↓
Cleaning
 ↓
Training
 ↓
Model
 ↓
Evaluation
 ↓
Improvement
```

Hal yang sangat penting untuk dipahami adalah bahwa **Machine Learning merupakan proses iteratif**.

Model pertama yang dibuat belum tentu merupakan model terbaik. Kita perlu mengevaluasi hasilnya, memahami kekurangannya, memperbaiki data atau fitur, mencoba algoritma lain, kemudian mengevaluasinya kembali.

Pada akhirnya, kualitas **data** menjadi salah satu faktor terpenting yang menentukan keberhasilan sebuah proyek Machine Learning.