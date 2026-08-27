---
sidebar_position: 7
title: "Python Package Index"
---

## Paket Pihak Ketiga dengan PyPI dan `pip`

Python menyediakan banyak functionality melalui **Standard Library**. Namun, dalam pengembangan aplikasi nyata, sering kali kita membutuhkan functionality yang tidak tersedia secara langsung di Standard Library.

Untuk kebutuhan tersebut, Python memiliki ekosistem **third-party packages** yang dikembangkan oleh komunitas.

Salah satu pusat distribusi package Python yang paling dikenal adalah **Python Package Index (PyPI)**.

## Tujuan Pembelajaran

Setelah mempelajari materi ini, kita diharapkan dapat:

- Memahami perbedaan antara Standard Library dan third-party packages.
- Mengenal Python Package Index (PyPI).
- Memahami fungsi `pip` sebagai package manager Python.
- Menginstal package Python melalui command line.
- Menginstal versi package tertentu.
- Menghapus package yang sudah tidak digunakan.
- Memahami pentingnya memilih package yang tepat dan tepercaya.
- Mengenal pentingnya virtual environment dalam pengelolaan dependency.

---

## Standard Library vs Third-Party Package

Sebelumnya kita telah mempelajari **Python Standard Library**.

Standard Library merupakan kumpulan module dan package yang tersedia bersama instalasi Python.

Contohnya:

```python
import random
import sys
import csv
import math
```

Kita tidak perlu menginstalnya menggunakan `pip`.

Namun, tidak semua kebutuhan pemrograman tersedia di Standard Library.

Misalnya kita ingin menggunakan functionality tertentu untuk:

- Data science.
- Machine learning.
- Web scraping.
- HTTP request.
- Image processing.
- ASCII art.
- Integrasi API.
- Web development.

Untuk kebutuhan tersebut, kita dapat menggunakan **third-party packages**.

Secara sederhana:

```text
Python
│
├── Standard Library
│     ↓
│   Sudah tersedia bersama Python
│
└── Third-Party Packages
      ↓
    Biasanya perlu di-install
```

## Apa Itu PyPI?

**PyPI** adalah singkatan dari **Python Package Index**.

PyPI merupakan repository publik yang digunakan untuk mendistribusikan berbagai package Python.

Developer dari seluruh dunia dapat membuat dan mempublikasikan package sehingga developer lain dapat menggunakannya dalam project mereka.

Secara sederhana:

```text
Developer
    ↓
Membuat package
    ↓
Publikasikan ke PyPI
    ↓
Developer lain mencari package
    ↓
Install menggunakan pip
    ↓
Gunakan dalam project
```

PyPI dapat dianggap sebagai salah satu pusat utama ekosistem package Python.

:::tip
Kunjungi link https://pypi.org/ repositori perangkat lunak untuk bahasa pemrograman Python.
:::

## Mengapa Membutuhkan Third-Party Package?

Salah satu prinsip penting dalam pengembangan software adalah:

> **Don't reinvent the wheel.**

Artinya, kita tidak selalu perlu membuat semuanya dari awal jika solusi yang sudah baik tersedia.

Misalnya kita membutuhkan functionality untuk melakukan HTTP request.

Daripada membuat seluruh implementasi HTTP client sendiri, kita dapat menggunakan package yang memang dibuat untuk kebutuhan tersebut.

Contoh package yang populer:

```text
requests
```

Setelah package tersedia di environment, kita dapat menggunakannya dari program Python.

## Contoh Kategori Package

Ekosistem Python memiliki package untuk berbagai kebutuhan.

Beberapa contoh kategori:

### Data Science

Contohnya:

```text
NumPy
pandas
```

Digunakan untuk berbagai kebutuhan pengolahan dan analisis data.

### Machine Learning

Contohnya:

```text
TensorFlow
```

Digunakan untuk kebutuhan machine learning dan artificial intelligence.

### Web Scraping

Contohnya:

```text
BeautifulSoup
Selenium
```

Digunakan untuk mengambil atau berinteraksi dengan data dari website.

### Image Processing

Contohnya:

```text
Pillow
```

Digunakan untuk berbagai kebutuhan pengolahan gambar.

### HTTP dan API

Contohnya:

```text
requests
```

Dapat digunakan untuk melakukan HTTP request dari aplikasi Python.

Daftar tersebut hanya merupakan contoh. PyPI memiliki ecosystem yang sangat luas dengan package untuk berbagai kebutuhan.

---

## Memilih Package di PyPI

Tidak semua package memiliki kualitas, dokumentasi, dan tingkat pemeliharaan yang sama.

Karena itu, kita perlu mempertimbangkan beberapa hal sebelum memasang sebuah package.

### 1. Perhatikan Aktivitas Project

Periksa apakah package masih aktif dikembangkan.

Salah satu informasi yang dapat diperhatikan adalah **release history**.

Misalnya:

```text
Release History

1.4.0
1.3.0
1.2.0
1.1.0
```

Jika sebuah project masih mendapatkan release dan maintenance secara berkala, hal tersebut dapat menjadi salah satu indikator bahwa project masih aktif.

Namun, aktivitas release bukan satu-satunya indikator kualitas package.

### 2. Periksa Kompatibilitas Python

Pastikan package mendukung versi Python yang sedang digunakan.

Misalnya project kita menggunakan:

```text
Python 3.x
```

maka periksa versi Python yang didukung oleh package tersebut.

Kompatibilitas penting karena package tertentu mungkin membutuhkan versi Python tertentu.

### 3. Perhatikan Dokumentasi

Package yang baik biasanya memiliki dokumentasi yang membantu developer memahami:

- Cara instalasi.
- Cara penggunaan.
- Parameter function.
- Contoh kode.
- Konfigurasi.
- Dependency.
- Versi yang didukung.

Dokumentasi yang baik akan sangat membantu ketika package mulai digunakan dalam project.

### 4. Perhatikan Komunitas

Package yang banyak digunakan biasanya memiliki komunitas yang lebih besar.

Hal ini dapat membantu ketika kita mengalami masalah karena kemungkinan sudah tersedia:

- Dokumentasi.
- Tutorial.
- Contoh penggunaan.
- Discussion.
- Issue dan solusi.

Namun, popularitas saja tidak menjamin sebuah package selalu menjadi pilihan terbaik. Tetap periksa kebutuhan dan kondisi project.

---

# Mengenal `pip`

`pip` merupakan package installer yang umum digunakan dalam ekosistem Python.

Dengan `pip`, kita dapat menginstal package Python dari repository package seperti PyPI.

Secara sederhana:

```text
PyPI
  ↓
Package tersedia
  ↓
 pip
  ↓
Download & install
  ↓
Python environment
  ↓
Package dapat digunakan
```

## Menginstal Package

Sintaks dasar:

```text
pip install nama_package
```

Contohnya:

```text
pip install requests
```

Atau:

```text
pip install pyfiglet
```

Setelah package berhasil diinstal, package tersebut dapat digunakan dari program Python.

---

## Menginstal Versi Tertentu

Terkadang sebuah project membutuhkan versi package tertentu.

Kita dapat menentukan versinya menggunakan:

```text
pip install nama_package==versi
```

Contohnya:

```text
pip install pyfiglet==1.0.2
```

Dengan demikian, `pip` akan mencoba memasang versi yang ditentukan.

Penentuan versi dapat menjadi penting ketika sebuah project memiliki dependency yang harus konsisten.

---

## Menghapus Package

Package yang sudah tidak diperlukan dapat dihapus menggunakan:

```text
pip uninstall nama_package
```

Contohnya:

```text
pip uninstall pyfiglet
```

Biasanya `pip` akan meminta konfirmasi sebelum proses uninstall dilakukan.

---

# Contoh Menggunakan Package `pyfiglet`

Sebagai contoh sederhana, kita dapat menggunakan package:

```text
pyfiglet
```

Package ini dapat digunakan untuk menghasilkan teks dalam bentuk ASCII art.

### 1. Install Package

Jalankan:

```text
pip install pyfiglet
```

### 2. Import Package

Setelah berhasil diinstal:

```python
import pyfiglet
```

### 3. Menggunakan Package

```python
ascii_banner = pyfiglet.figlet_format("Hello Python!")

print(ascii_banner)
```

Package tersebut menyediakan functionality yang tidak tersedia sebagai bagian dari Python Standard Library.

Dengan demikian kita tidak perlu membuat sendiri algoritma untuk menghasilkan ASCII art tersebut.

---

# Dependency

Ketika sebuah project menggunakan third-party package, package tersebut menjadi salah satu **dependency** project.

Misalnya sebuah project membutuhkan:

```text
requests
pyfiglet
```

maka project tersebut memiliki dependency terhadap kedua package tersebut.

Secara konseptual:

```text
Project
│
├── main.py
│
├── requests
│
└── pyfiglet
```

Jika project dipindahkan ke komputer lain, dependency tersebut juga perlu tersedia agar program dapat berjalan dengan benar.

Inilah salah satu alasan mengapa pengelolaan dependency menjadi penting dalam project Python.

---

# Standard Library Terlebih Dahulu

Sebelum mencari third-party package, sebaiknya periksa terlebih dahulu apakah Python Standard Library sudah menyediakan functionality yang dibutuhkan.

Misalnya kita membutuhkan functionality untuk membaca file CSV.

Python sudah menyediakan:

```python
import csv
```

Dalam kondisi seperti ini, kita tidak perlu memasang package tambahan hanya untuk kebutuhan dasar tersebut.

Prinsip sederhananya:

```text
Butuh functionality
       ↓
Cek Standard Library
       ↓
Sudah tersedia?
   ↙          ↘
 Ya           Tidak
 ↓              ↓
Gunakan       Cari package
               pihak ketiga
```

Hal ini dapat membantu mengurangi dependency yang tidak diperlukan.

---

# Mengapa Virtual Environment Penting?

Ketika mulai menggunakan third-party packages, kita akan menghadapi kemungkinan adanya perbedaan dependency antarproject.

Misalnya:

```text
Project A
    ↓
requests versi A

Project B
    ↓
requests versi B
```

Jika semua package diinstal secara global, versi package yang berbeda dapat menyebabkan konflik.

Karena itu, Python menyediakan konsep **virtual environment**.

Virtual environment memungkinkan setiap project memiliki environment dan dependency yang terisolasi.

Secara sederhana:

```text
Komputer
│
├── Project A
│     └── Virtual Environment
│          └── Package versi A
│
└── Project B
      └── Virtual Environment
           └── Package versi B
```

Pembahasan mengenai pembuatan dan pengelolaan virtual environment akan menjadi materi tersendiri.

---

# Alur Penggunaan Third-Party Package

Secara umum, workflow penggunaan package pihak ketiga dapat digambarkan:

```text
Tentukan kebutuhan
       ↓
Cek Standard Library
       ↓
Belum tersedia?
       ↓
Cari package di PyPI
       ↓
Evaluasi package
       ↓
Install menggunakan pip
       ↓
Import package
       ↓
Gunakan dalam program
       ↓
Kelola dependency
```

---

# Contoh Workflow

Misalnya kita ingin menggunakan `pyfiglet`.

### Langkah 1 — Tentukan kebutuhan

```text
Membuat ASCII art dari teks
```

### Langkah 2 — Cari solusi

Kita menemukan package:

```text
pyfiglet
```

### Langkah 3 — Install

```text
pip install pyfiglet
```

### Langkah 4 — Import

```python
import pyfiglet
```

### Langkah 5 — Gunakan

```python
print(pyfiglet.figlet_format("Python"))
```

Dengan workflow tersebut, functionality yang dibuat oleh developer lain dapat digunakan dalam project kita.

---

# Best Practices

Beberapa kebiasaan yang baik ketika menggunakan third-party packages:

### Gunakan Standard Library Jika Sudah Cukup

Jangan memasang dependency tambahan jika functionality yang dibutuhkan sudah tersedia di Standard Library dan sudah memenuhi kebutuhan project.

### Periksa Package Sebelum Menggunakannya

Perhatikan:

```text
Dokumentasi
Kompatibilitas
Maintenance
Release history
Komunitas
```

### Gunakan Virtual Environment

Hindari mengelola semua dependency project secara global.

Gunakan environment terpisah untuk project agar dependency lebih mudah dikontrol.

### Perhatikan Versi Dependency

Project yang serius perlu memperhatikan versi package yang digunakan agar environment dapat direproduksi secara konsisten.

---

# Ringkasan

Python memiliki dua sumber utama functionality yang perlu kita bedakan:

```text
Python
│
├── Standard Library
│      ↓
│   Disediakan bersama Python
│
└── Third-Party Packages
       ↓
    Dikembangkan oleh komunitas
       ↓
    Banyak tersedia melalui PyPI
```

**PyPI** merupakan repository publik untuk berbagai package Python.

**`pip`** digunakan untuk menginstal dan mengelola package tersebut.

Perintah dasar yang perlu diketahui:

```text
pip install nama_package
```

untuk menginstal package.

```text
pip install nama_package==versi
```

untuk menginstal versi tertentu.

```text
pip uninstall nama_package
```

untuk menghapus package.

Hal terpenting bukan menghafal semua package yang tersedia, tetapi mengetahui **kapan membutuhkan third-party package dan bagaimana menemukan, mengevaluasi, serta menggunakannya dengan benar**.

Pemahaman mengenai PyPI dan `pip` menjadi dasar sebelum mempelajari **Virtual Environment, dependency management, `requirements.txt`, dan pengelolaan environment project Python**.