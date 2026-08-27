---
sidebar_position: 4
title: "Built-in Modules & Standard Library"
---

## Apa Itu Built-in Modules?

Python tidak hanya menyediakan fitur dasar seperti `list`, `dict`, function, class, dan control flow. Python juga menyediakan kumpulan module yang dapat langsung digunakan setelah Python diinstal.

Kumpulan module tersebut dikenal sebagai **Python Standard Library**.

Standard Library menyediakan berbagai functionality yang umum dibutuhkan dalam pengembangan program sehingga developer tidak perlu membuat semuanya dari awal atau memasang library pihak ketiga.

Contohnya:

```text
Python
  │
  └── Standard Library
       ├── random
       ├── math
       ├── datetime
       ├── os
       ├── json
       ├── pathlib
       └── dan banyak lainnya
```

## Built-in Module vs Standard Library

Istilah **built-in module** sering digunakan untuk menyebut module yang tersedia bersama instalasi Python.

Namun, secara teknis terdapat perbedaan antara **built-in modules** dan **Standard Library**.

- **Built-in module** adalah module yang tersedia sebagai bagian dari implementasi Python.
- **Standard Library** mencakup kumpulan package dan module standar yang didistribusikan bersama Python.

Dalam pembelajaran dasar, keduanya sering disebut secara umum sebagai **module bawaan Python** karena developer tidak perlu menginstalnya menggunakan package manager seperti `pip`.

Hal yang penting adalah memahami bahwa Python sudah menyediakan banyak functionality yang siap digunakan.

## Mengapa Menggunakan Module Bawaan?

Module bawaan membantu kita menghindari pembuatan functionality yang sebenarnya sudah tersedia.

Misalnya, daripada membuat sendiri sistem untuk menghasilkan angka acak, kita dapat menggunakan module `random`.

Daripada membuat sendiri berbagai operasi matematika, kita dapat menggunakan module `math`.

Secara sederhana:

```text
Kebutuhan program
       ↓
Apakah sudah tersedia?
       ↓
Python Standard Library
       ↓
Import module
       ↓
Gunakan functionality
```

Hal ini membuat proses pengembangan menjadi lebih cepat dan kode dapat memanfaatkan functionality yang sudah tersedia dan teruji.

## Cara Menggunakan Module Bawaan

Meskipun module tersebut sudah tersedia setelah Python diinstal, kita tetap perlu melakukan `import` sebelum menggunakannya.

Contohnya:

```python
import random
```

Setelah module diimpor, kita dapat menggunakan function yang disediakan oleh module tersebut.

Pola dasarnya:

```python
import nama_module
```

Kemudian:

```python
nama_module.nama_function()
```

## Contoh Module `random`

Module `random` menyediakan berbagai functionality untuk menghasilkan nilai atau memilih data secara acak.

Import terlebih dahulu:

```python
import random
```

### Menghasilkan Bilangan Desimal Acak

Function `random()` dapat digunakan untuk menghasilkan bilangan desimal acak antara `0.0` dan `1.0`.

```python
print(random.random())
```

Contoh output:

```text
0.438291734
```

Nilainya dapat berbeda setiap kali program dijalankan.

### Menghasilkan Bilangan Bulat Acak

Function `randint()` dapat digunakan untuk menghasilkan bilangan bulat dalam rentang tertentu.

```python
print(random.randint(1, 10))
```

Contoh output:

```text
7
```

Nilai yang dihasilkan berada dalam rentang `1` sampai `10`.

### Memilih Data Secara Acak

Function `choice()` dapat digunakan untuk memilih satu elemen secara acak dari sebuah sequence.

```python
pilihan = random.choice(["apel", "pisang", "jeruk"])

print(pilihan)
```

Contoh output:

```text
pisang
```

Setiap eksekusi dapat menghasilkan pilihan yang berbeda.

### Mengacak Isi List

Function `shuffle()` digunakan untuk mengacak urutan elemen pada list.

```python
items = [1, 2, 3, 4, 5]

random.shuffle(items)

print(items)
```

Contoh output:

```text
[3, 1, 5, 2, 4]
```

`shuffle()` mengubah urutan elemen pada list yang diberikan.

## Contoh Module Standard Library Lainnya

Selain `random`, Python menyediakan banyak module lain.

### `math`

Digunakan untuk berbagai operasi dan konstanta matematika.

```python
import math
```

Contohnya dapat digunakan untuk operasi seperti akar kuadrat, pembulatan, fungsi trigonometri, dan berbagai operasi matematika lainnya.

### `datetime`

Digunakan untuk bekerja dengan tanggal dan waktu.

```python
import datetime
```

### `os`

Menyediakan functionality untuk berinteraksi dengan sistem operasi.

```python
import os
```

### `json`

Digunakan untuk bekerja dengan data dalam format JSON.

```python
import json
```

### `pathlib`

Digunakan untuk bekerja dengan path dan file system secara lebih terstruktur.

```python
import pathlib
```

Module-module tersebut hanya sebagian kecil dari Standard Library Python.

## Tidak Perlu Menghafal Semua Module

Python memiliki Standard Library yang sangat luas. Karena itu, developer tidak perlu menghafal seluruh module dan function yang tersedia.

Yang lebih penting adalah mengetahui:

1. **Masalah apa yang sedang ingin diselesaikan.**
2. **Apakah Python Standard Library sudah menyediakan solusinya.**
3. **Module apa yang dapat digunakan.**
4. **Bagaimana membaca dokumentasi module tersebut.**

Contohnya, ketika membutuhkan functionality untuk menghasilkan nilai acak:

```text
Butuh random data
      ↓
Cari Standard Library
      ↓
    random
      ↓
Baca dokumentasi
      ↓
Gunakan function yang sesuai
```

Kemampuan menemukan functionality yang sudah tersedia merupakan skill penting dalam pemrograman.

## Menggunakan `help()`

Python menyediakan function `help()` yang dapat digunakan untuk melihat informasi mengenai module atau object.

Contohnya:

```python
import random

help(random)
```

Python akan menampilkan informasi dokumentasi mengenai module tersebut.

`help()` berguna ketika kita ingin memahami functionality yang tersedia tanpa harus menghafalnya.

## Menggunakan `dir()`

Function `dir()` dapat digunakan untuk melihat nama attribute dan method yang tersedia pada sebuah object atau module.

Contohnya:

```python
import random

print(dir(random))
```

Hasilnya berupa daftar nama attribute dan function yang tersedia dalam module tersebut.

Misalnya kita dapat menemukan nama seperti:

```text
choice
randint
random
shuffle
...
```

Perlu diperhatikan bahwa `dir()` hanya membantu melihat apa yang tersedia. Untuk mengetahui cara penggunaan dan parameter sebuah function, kita tetap perlu membaca dokumentasi.

## `help()` vs `dir()`

Keduanya memiliki tujuan yang berbeda.

| Function | Kegunaan |
| --- | --- |
| `dir()` | Melihat nama attribute dan method yang tersedia |
| `help()` | Melihat dokumentasi dan penjelasan mengenai object atau module |

Secara sederhana:

```text
dir()
 ↓
"Apa saja yang tersedia?"


help()
 ↓
"Bagaimana cara menggunakannya?"
```

Keduanya dapat digunakan sebagai alat eksplorasi ketika mempelajari module Python.

## Dokumentasi Standard Library

Selain menggunakan `help()` dan `dir()`, cara terbaik untuk memahami Standard Library adalah membaca **dokumentasi resmi Python**.

Dokumentasi memberikan informasi lebih lengkap mengenai:

- Module.
- Function.
- Class.
- Parameter.
- Return value.
- Exception.
- Contoh penggunaan.
- Perilaku khusus sebuah functionality.

Kemampuan membaca dokumentasi merupakan bagian penting dari kemampuan seorang Python developer.

## Standard Library vs Third-Party Library

Penting juga untuk membedakan module yang sudah tersedia bersama Python dengan library pihak ketiga.

### Standard Library

Sudah tersedia bersama instalasi Python.

Contohnya:

```python
import random
import math
import json
import datetime
```

Tidak perlu melakukan:

```text
pip install ...
```

untuk module tersebut.

### Third-Party Library

Dibuat dan didistribusikan oleh pihak lain di luar Standard Library Python.

Contohnya dapat mencakup berbagai library untuk:

- Data science.
- Machine learning.
- Web development.
- Scientific computing.
- Automation.
- dan kebutuhan lainnya.

Biasanya library pihak ketiga dikelola menggunakan package manager seperti `pip`.

Secara sederhana:

```text
Python
  │
  ├── Standard Library
  │      ↓
  │   tersedia bersama Python
  │
  └── Third-Party Library
         ↓
      biasanya di-install
```

## Mengapa Standard Library Penting?

Standard Library menjadi salah satu kekuatan Python karena menyediakan banyak functionality yang dapat langsung digunakan.

Developer dapat menggabungkan module-module tersebut untuk membangun aplikasi tanpa harus selalu bergantung pada library eksternal.

Misalnya:

```text
random
   ↓
Data acak

datetime
   ↓
Tanggal dan waktu

json
   ↓
Data JSON

pathlib
   ↓
File dan path

  os
   ↓
Sistem operasi
```

Dengan memahami keberadaan module-module tersebut, kita dapat menghindari pembuatan kode yang sebenarnya sudah tersedia di Python.

## Pola Belajar yang Disarankan

Jangan mencoba menghafal seluruh Standard Library.

Gunakan pendekatan:

```text
Temukan masalah
      ↓
Cari functionality yang dibutuhkan
      ↓
Cari module Standard Library
      ↓
Baca dokumentasi
      ↓
Pelajari contoh penggunaan
      ↓
Implementasikan
```

Misalnya:

```text
"Saya membutuhkan angka acak"
          ↓
Cari Python random
          ↓
Module random
          ↓
Baca dokumentasi
          ↓
Gunakan randint(), choice(), dll.
```

Pendekatan ini jauh lebih efektif dibandingkan menghafal semua function yang tersedia.

## Kesimpulan

**Python Standard Library** menyediakan berbagai module yang sudah tersedia bersama instalasi Python dan dapat digunakan untuk menyelesaikan berbagai kebutuhan pemrograman.

Contoh module yang perlu mulai dikenali:

```text
random      → nilai acak
math        → operasi matematika
datetime    → tanggal dan waktu
os          → sistem operasi
json        → data JSON
pathlib     → file dan path
```

Untuk menggunakannya, kita biasanya melakukan:

```python
import nama_module
```

Kemudian menggunakan functionality yang disediakan oleh module tersebut.

Dalam proses belajar, tidak perlu menghafal seluruh Standard Library. Yang lebih penting adalah mengetahui bahwa functionality tersebut **mungkin sudah tersedia**, kemudian mampu menemukan dan memahami penggunaannya melalui dokumentasi.

Tools seperti:

```python
dir()
```

dan:

```python
help()
```

dapat membantu mengeksplorasi module secara langsung.

Pemahaman mengenai Standard Library akan menjadi bekal penting sebelum masuk ke pembahasan **package pihak ketiga dan `pip`**, karena kita perlu memahami kapan harus menggunakan functionality bawaan Python dan kapan membutuhkan library eksternal.