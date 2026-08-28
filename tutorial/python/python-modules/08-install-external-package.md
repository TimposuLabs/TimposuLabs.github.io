---
sidebar_position: 8
title: "Menginstal External Packages"
---


Python memiliki Standard Library yang menyediakan banyak functionality bawaan. Namun, dalam pengembangan aplikasi, terkadang kita membutuhkan functionality yang tidak tersedia secara langsung dari Standard Library.

Untuk kebutuhan tersebut, kita dapat menggunakan **External Package** atau **Third-Party Package** yang dibuat dan dibagikan oleh developer lain maupun komunitas Python.

## Pengertian External Package

**External Package** adalah kumpulan kode yang dibuat oleh developer atau komunitas dan dapat digunakan kembali dalam project Python.

Dengan menggunakan package, kita tidak perlu membuat functionality tertentu dari awal.

Contohnya, daripada membuat sendiri library untuk menghasilkan lelucon secara acak, kita dapat menggunakan package seperti:

```text
pyjokes
```

Contoh package lainnya dapat digunakan untuk:

```text
Data Processing
Web Scraping
Automation
Machine Learning
Image Processing
Web Development
API
```

Secara sederhana:

```text
Kebutuhan Project
       ↓
Cari Package yang sesuai
       ↓
Install Package
       ↓
Import Package
       ↓
Gunakan Functionality
```

---

## PyPI

**PyPI (Python Package Index)** adalah repository publik yang digunakan untuk mendistribusikan package Python.

Developer dapat mempublikasikan package mereka di PyPI sehingga dapat digunakan oleh developer lain.

Secara sederhana:

```text
Developer
    ↓
Membuat Package
    ↓
Publish ke PyPI
    ↓
Developer lain
    ↓
Install Package
    ↓
Gunakan dalam Project
```

PyPI menyediakan berbagai package untuk kebutuhan yang sangat beragam.

---

## Menilai Popularitas Package

Ketika mencari external package, kita perlu mempertimbangkan apakah package tersebut cukup populer dan dapat dipercaya.

Salah satu indikator yang dapat diperhatikan ketika melihat project di GitHub adalah:

- **Stars**
- **Forks**

### Stars

Stars dapat menjadi salah satu indikator popularitas sebuah repository.

Semakin banyak stars, biasanya semakin banyak pengguna atau developer yang memberikan apresiasi terhadap project tersebut.

Namun, jumlah stars tidak dapat dijadikan satu-satunya indikator kualitas atau keamanan sebuah package.

### Forks

Fork menunjukkan bahwa repository telah disalin ke repository lain untuk dikembangkan atau digunakan sebagai dasar pengembangan.

Jumlah forks juga dapat memberikan gambaran mengenai tingkat perhatian komunitas terhadap sebuah project.

---

## Instalasi Package melalui PyCharm

Selain menggunakan terminal, package Python dapat diinstal melalui IDE seperti **PyCharm**.

Langkah umumnya:

1. Buka **Preferences** atau **Settings** di PyCharm.
2. Masuk ke bagian **Project**.
3. Pilih **Project Interpreter** atau pengaturan interpreter/package yang sesuai dengan versi PyCharm yang digunakan.
4. Klik tombol **`+`** untuk menambahkan package.
5. Cari nama package yang ingin digunakan.
6. Pilih package.
7. Klik **Install Package**.
8. Tunggu hingga proses instalasi selesai.

Contohnya kita ingin menggunakan:

```text
pyjokes
```

Cari:

```text
pyjokes
```

kemudian pilih package dan lakukan instalasi.

Package akan dipasang ke environment/interpreter yang sedang digunakan oleh project.

---

## Instalasi Package Menggunakan `pip`

Selain melalui IDE, cara yang umum digunakan adalah menggunakan **`pip`** melalui Terminal atau Command Prompt.

`pip` merupakan package installer yang digunakan untuk menginstal dan mengelola package Python.

Sintaks dasarnya:

```bash
pip install nama_package
```

Contohnya:

```bash
pip install pyjokes
```

Pada beberapa sistem, terutama ketika terdapat beberapa instalasi Python, kita juga dapat menggunakan:

```bash
pip3 install pyjokes
```

Penggunaan `pip` atau `pip3` dapat bergantung pada konfigurasi Python pada sistem yang digunakan.

---

## Mengecek Versi `pip`

Untuk mengetahui versi `pip` yang sedang digunakan:

```bash
pip3 -V
```

Contoh output:

```text
pip 25.x from ... (python 3.x)
```

Informasi tersebut dapat membantu memastikan `pip` terhubung dengan instalasi Python yang sesuai.

---

## Meng-upgrade `pip`

`pip` juga dapat diperbarui menggunakan perintah:

```bash
pip3 install --upgrade pip
```

Perintah tersebut akan meminta `pip` untuk menggunakan versi yang lebih baru jika tersedia.

---

## Melihat Package yang Terinstal

Untuk melihat daftar package yang telah terinstal pada environment Python:

```bash
pip3 list
```

Contoh:

```text
Package    Version
---------- -------
pip        ...
pyjokes    ...
```

Perlu diperhatikan bahwa daftar package bergantung pada **environment Python** yang sedang digunakan.

---

## Menggunakan External Package

Setelah package berhasil diinstal, package tersebut dapat digunakan di dalam program Python dengan `import`.

Contohnya kita telah menginstal:

```text
pyjokes
```

Kemudian pada file Python:

```python
import pyjokes
```

Setelah itu, kita dapat menggunakan functionality yang disediakan oleh package tersebut.

---

## Contoh Menggunakan `pyjokes`

Package `pyjokes` dapat digunakan untuk menghasilkan lelucon secara acak.

Contoh:

```python
import pyjokes

joke = pyjokes.get_joke(
    language="en",
    category="neutral"
)

print(joke)
```

Program akan mengambil sebuah lelucon dan menampilkannya ke layar.

Alur penggunaannya:

```text
PyPI
  ↓
pyjokes
  ↓
pip install pyjokes
  ↓
import pyjokes
  ↓
pyjokes.get_joke()
  ↓
Output
```

---

## Perbedaan Instalasi melalui IDE dan Terminal

Package dapat diinstal dengan beberapa cara.

| Metode | Cara |
| --- | --- |
| PyCharm | Menggunakan menu package/interpreter |
| Terminal | Menggunakan `pip install` |
| Command Prompt | Menggunakan `pip install` |

Walaupun menggunakan interface yang berbeda, tujuan akhirnya sama, yaitu memasang package ke environment Python yang digunakan project.

---

## Masalah `ModuleNotFoundError`

Salah satu masalah yang sering terjadi setelah menginstal external package adalah:

```text
ModuleNotFoundError
```

Error tersebut dapat terjadi ketika Python tidak menemukan module yang ingin di-import.

Misalnya:

```python
import pyjokes
```

tetapi Python menghasilkan:

```text
ModuleNotFoundError: No module named 'pyjokes'
```

Salah satu penyebab yang umum adalah package diinstal pada **environment yang berbeda** dengan environment yang digunakan untuk menjalankan program.

---

## Masalah Perbedaan Environment

Misalnya kita memiliki:

```text
PyCharm
   ↓
Python Environment A
   ↓
pyjokes terinstal
```

Tetapi ketika menjalankan program melalui terminal:

```text
Terminal
   ↓
Python Environment B
   ↓
pyjokes tidak terinstal
```

Akibatnya:

```python
import pyjokes
```

dapat menghasilkan:

```text
ModuleNotFoundError
```

Karena package memang tidak tersedia pada environment yang digunakan oleh program.

---

## Memahami Python Environment

Ketika bekerja dengan package, penting untuk memahami bahwa package tidak selalu tersedia untuk seluruh instalasi Python pada komputer.

Package biasanya diinstal ke **environment tertentu**.

Contohnya:

```text
Python Environment A
├── requests
├── pyjokes
└── numpy

Python Environment B
├── requests
└── pandas
```

Kedua environment tersebut dapat memiliki package yang berbeda.

Karena itu, ketika terjadi `ModuleNotFoundError`, salah satu hal pertama yang perlu diperiksa adalah:

```text
Apakah package sudah diinstal
pada environment yang sedang digunakan?
```

---

## Mengapa External Package Sangat Berguna?

Ekosistem Python memiliki banyak package yang dapat digunakan untuk mempercepat pengembangan.

Misalnya:

```text
Project
   │
   ├── Standard Library
   │
   └── External Packages
          │
          ├── Data Processing
          ├── Web Development
          ├── Automation
          ├── Machine Learning
          └── Image Processing
```

Dengan memanfaatkan package yang sudah tersedia, developer dapat lebih fokus pada **logika utama aplikasi** daripada membuat semua functionality dari awal.

---

## Standard Library atau External Package?

Sebelum menginstal external package, sebaiknya periksa terlebih dahulu apakah Python Standard Library sudah menyediakan functionality yang dibutuhkan.

Misalnya Python sudah menyediakan:

```python
import random
```

untuk kebutuhan random data.

Python juga menyediakan:

```python
import json
```

untuk bekerja dengan JSON.

Jika functionality yang dibutuhkan sudah tersedia dan cukup untuk kebutuhan project, kita tidak selalu membutuhkan external package.

Alur yang baik:

```text
Butuh functionality
        ↓
Cek Standard Library
        ↓
Sudah tersedia?
     ↙       ↘
   Ya        Tidak
   ↓           ↓
Gunakan      Cari External Package
               ↓
              PyPI
               ↓
              pip
```

---

## Best Practices

Beberapa kebiasaan yang baik ketika menggunakan external package:

### 1. Gunakan Package yang Dibutuhkan

Jangan menambahkan package hanya karena populer.

Pastikan package benar-benar memberikan functionality yang dibutuhkan project.

### 2. Periksa Package Sebelum Menggunakannya

Perhatikan beberapa hal seperti:

```text
Dokumentasi
Aktivitas Project
Popularitas
Komunitas
Kompatibilitas
Keamanan
```

Stars dan forks dapat menjadi salah satu informasi tambahan, tetapi jangan digunakan sebagai satu-satunya ukuran kualitas.

### 3. Gunakan Environment yang Tepat

Pastikan package diinstal pada environment yang digunakan untuk menjalankan program.

### 4. Jangan Menginstal Semua Package Secara Global

Untuk project yang lebih serius, sebaiknya gunakan **virtual environment** sehingga dependency setiap project dapat dikelola secara terpisah.

---

## Alur Lengkap External Package

Secara keseluruhan, proses menggunakan external package dapat digambarkan seperti berikut:

```text
Memiliki kebutuhan
       ↓
Cek Standard Library
       ↓
Tidak tersedia?
       ↓
Cari package di PyPI
       ↓
Evaluasi package
       ↓
Install menggunakan pip
       ↓
Package masuk ke environment
       ↓
Import ke program
       ↓
Gunakan functionality
```

Contohnya:

```text
Butuh ASCII Art
      ↓
Cari package
      ↓
pyfiglet
      ↓
pip install pyfiglet
      ↓
import pyfiglet
      ↓
Gunakan package
```

---

## Kesimpulan

**External Package** memungkinkan kita menggunakan kode yang dibuat oleh developer lain atau komunitas untuk mempercepat pengembangan aplikasi.

**PyPI** merupakan repository publik tempat berbagai package Python tersedia.

Sedangkan **`pip`** digunakan untuk menginstal dan mengelola package tersebut.

Perintah dasar yang perlu diketahui:

```bash
pip install nama_package
```

untuk menginstal package.

```bash
pip3 -V
```

untuk memeriksa versi `pip`.

```bash
pip3 install --upgrade pip
```

untuk memperbarui `pip`.

```bash
pip3 list
```

untuk melihat package yang terinstal.

Setelah package diinstal, package dapat digunakan melalui:

```python
import nama_package
```

Hal yang penting untuk dipahami bukan hanya cara menginstal package, tetapi juga **environment tempat package tersebut diinstal**. Perbedaan environment merupakan salah satu penyebab umum munculnya `ModuleNotFoundError`.

Setelah memahami external package dan `pip`, materi berikutnya yang penting dipelajari adalah **Virtual Environment (`venv`)**, karena virtual environment memungkinkan setiap project memiliki dependency yang terisolasi dan tidak saling mengganggu.