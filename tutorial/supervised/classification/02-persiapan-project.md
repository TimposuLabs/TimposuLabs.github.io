---
sidebar_position: 3
title: "Framework & Persiapan Project"
---

Pada materi ini, kita akan memulai project **End-to-End Heart Disease Classification**, yaitu project Machine Learning untuk memprediksi apakah seseorang memiliki penyakit jantung berdasarkan parameter klinis pasien.

Project ini menggunakan pendekatan **Supervised Learning**, khususnya **Binary Classification**, karena model akan memprediksi salah satu dari dua kelas: pasien terindikasi penyakit jantung atau tidak.

Sebelum menulis kode program, kita perlu memahami alur project dan menentukan tujuan yang ingin dicapai.

![End to End](/img/python/62.png)

## 6 Langkah Machine Learning Framework

Machine Learning Framework membantu kita mengerjakan project secara sistematis, mulai dari mendefinisikan masalah hingga melakukan eksperimen untuk meningkatkan performa model.

### 1. Problem Definition

**Problem Definition (definisi masalah)** merupakan tahap untuk menentukan masalah yang ingin diselesaikan menggunakan Machine Learning.

Pada project ini, pertanyaan utamanya adalah:

> Apakah parameter klinis pasien dapat digunakan untuk memprediksi apakah seseorang memiliki penyakit jantung atau tidak?

Tujuan project ini adalah membangun model klasifikasi yang dapat memprediksi kondisi pasien berdasarkan data yang tersedia.

Jenis masalah:
- **Supervised Learning**, karena model belajar dari data yang memiliki label.
- **Binary Classification**, karena target prediksi terdiri dari dua kelas.

### 2. Data

Tahap Data berfokus pada sumber data yang akan digunakan dalam project.

Dataset Heart Disease yang digunakan dalam project ini berkaitan dengan Cleveland database dari UCI Machine Learning Repository. Dataset dalam format CSV juga tersedia melalui berbagai sumber, termasuk Kaggle.

Data tersebut berisi informasi klinis pasien yang dapat digunakan sebagai fitur untuk membangun model prediksi.

Beberapa hal yang perlu diperhatikan:
- Sumber dan asal dataset.
- Jumlah baris dan kolom.
- Jenis data pada setiap kolom.
- Kolom yang akan digunakan sebagai fitur (*features*) dan target (*target*).

Sebelum melakukan pemodelan, pastikan dataset yang digunakan sesuai dengan sumber dan versi yang menjadi acuan project.

### 3. Evaluation

Evaluation merupakan tahap untuk menentukan bagaimana keberhasilan model akan diukur.

Dalam project ini, salah satu metrik yang dapat digunakan adalah **Accuracy (akurasi)**, yaitu persentase prediksi yang benar dibandingkan dengan seluruh prediksi.

Sebagai contoh, target awal dalam tahap *proof of concept* dapat ditetapkan sebesar 95% accuracy.

Namun, angka tersebut merupakan target eksperimen, bukan jaminan bahwa model akan mencapainya. Untuk kasus medis, accuracy saja juga belum cukup. Metrik seperti **Precision, Recall, dan F1-score** perlu dipertimbangkan, terutama untuk menilai kesalahan prediksi pada pasien yang benar-benar memiliki penyakit jantung.

### 4. Features

Features merupakan variabel atau kolom yang digunakan model untuk menghasilkan prediksi.

Pada project ini, fitur berasal dari parameter klinis pasien yang tersedia di dalam dataset.

Untuk memahami setiap fitur, kita perlu membuat atau mempelajari **Data Dictionary**, yaitu dokumentasi yang menjelaskan nama kolom, arti, tipe data, dan kemungkinan nilai dari setiap variabel.

Contoh format Data Dictionary:

| Feature | Description |
|---|---|
| `age` | Usia pasien |
| `sex` | Kode jenis kelamin sesuai definisi dataset |
| `cp` | Kode tipe nyeri dada |
| `thalach` | Denyut jantung maksimum yang dicapai |

Contoh di atas hanya sebagian fitur. Arti kode kategori harus diperiksa berdasarkan dokumentasi dataset yang digunakan.

Data Dictionary membantu kita memahami data sebelum melakukan eksplorasi, preprocessing, dan pemodelan.

### 5. Modelling

Modelling adalah tahap membangun dan melatih model Machine Learning menggunakan dataset.

Pada tahap ini, kita akan:
- Menentukan fitur dan target.
- Membagi data menjadi training set dan test set.
- Memilih algoritma klasifikasi.
- Melatih model menggunakan training set.
- Menguji performa model menggunakan test set.

Algoritma yang digunakan dapat dibandingkan untuk mengetahui model mana yang memberikan hasil terbaik pada data yang tersedia.

### 6. Experimentation

Experimentation merupakan proses melakukan eksperimen untuk meningkatkan performa model.

Eksperimen dapat dilakukan dengan:
- Membandingkan beberapa algoritma klasifikasi.
- Mencoba preprocessing yang berbeda.
- Menyesuaikan parameter model (*hyperparameter tuning*).
- Mengevaluasi hasil menggunakan metrik yang sesuai.
- Menganalisis kesalahan prediksi.

Hasil setiap eksperimen perlu dicatat agar kita dapat membandingkan pendekatan yang digunakan dan memahami alasan di balik perubahan performa model.

## Persiapan Jupyter Notebook

Sebelum mulai menulis kode program, buat sebuah Jupyter Notebook untuk mendokumentasikan proses project.

### 1. Membuat Judul Notebook

Buat sel Markdown di bagian paling atas notebook dengan judul berikut:

```markdown
# Predicting Heart Disease Using Machine Learning
```

Judul tersebut menggunakan heading level 1 karena merupakan judul utama di dalam Jupyter Notebook. Aturan heading pada dokumen Docusaurus tidak membatasi penggunaan heading di dalam contoh kode ini.

### 2. Menambahkan Deskripsi Project

Di bawah judul, tambahkan deskripsi singkat mengenai tujuan project.

Contoh:

```markdown
This project aims to build a machine learning model that predicts
the presence of heart disease based on clinical patient data.
```

Deskripsi ini membantu menjelaskan tujuan notebook sebelum pembaca melihat kode program.

### 3. Menambahkan Data Dictionary

Salin informasi Data Dictionary ke dalam sel Markdown agar arti setiap fitur mudah diperiksa selama proses coding.

Dengan demikian, notebook tidak hanya berisi kode, tetapi juga dokumentasi mengenai data, proses eksperimen, dan hasil yang diperoleh.

## Ringkasan

Pada materi ini, kita telah mempelajari enam langkah Machine Learning Framework:

1. **Problem Definition** — menentukan masalah yang akan diselesaikan.
2. **Data** — memahami sumber dan karakteristik dataset.
3. **Evaluation** — menentukan metrik keberhasilan model.
4. **Features** — memahami fitur melalui Data Dictionary.
5. **Modelling** — membangun dan melatih model.
6. **Experimentation** — melakukan eksperimen untuk meningkatkan performa.

Framework ini akan menjadi panduan selama kita mengembangkan project Heart Disease Classification dari awal hingga evaluasi model.
