---
sidebar_position: 3
title: "File Paths"
---

## Konsep File Path di Python

Saat membaca atau menulis berkas, Python akan mencari berkas tersebut berdasarkan jalur direktori atau **file path** yang diberikan.

Jika berkas berada di folder yang sama dengan skrip Python, kita cukup menyebutkan nama berkasnya.

Contoh:

```python
with open("sad.txt", mode="r") as my_file:
    print(my_file.read())
```

Namun, jika berkas berada di folder yang berbeda, kita perlu menentukan lokasi berkas tersebut menggunakan file path.

Secara umum, file path dapat dibagi menjadi:

- **Relative Path**
- **Absolute Path**

## Relative Path

**Relative path** adalah jalur file yang ditentukan berdasarkan lokasi direktori tempat program Python sedang dijalankan atau **present working directory**.

Relative path tidak dimulai dari root sistem operasi, melainkan dari lokasi saat ini.

Struktur direktori sebagai contoh:

```text
project/
├── main.py
├── sad.txt
└── app/
    └── happy.txt
```

Jika `main.py` dijalankan dari direktori `project`, maka file `sad.txt` dapat diakses secara langsung:

```python
with open("sad.txt", mode="r") as my_file:
    print(my_file.read())
```

Sedangkan file yang berada di dalam folder `app` dapat diakses menggunakan:

```python
with open("app/happy.txt", mode="r") as my_file:
    print(my_file.read())
```

## Mengakses Folder di Dalam Direktori Saat Ini

Untuk mengakses file yang berada di dalam folder lain, tuliskan nama folder kemudian nama file.

Contoh:

```python
with open("app/sad.txt", mode="r") as my_file:
    print(my_file.read())
```

Struktur direktori:

```text
project/
├── main.py
└── app/
    └── sad.txt
```

Karena folder `app` berada di dalam direktori saat ini, kita dapat menggunakan:

```text
app/sad.txt
```

## Menggunakan `./`

Notasi `./` digunakan untuk menunjukkan **direktori saat ini**.

Contoh:

```python
with open("./app/sad.txt", mode="r") as my_file:
    print(my_file.read())
```

Pada contoh tersebut:

```text
./
```

menunjukkan direktori tempat program sedang berjalan.

Kemudian:

```text
app/sad.txt
```

menunjukkan folder dan file yang ingin diakses.

Dengan demikian:

```text
./app/sad.txt
```

dan:

```text
app/sad.txt
```

dapat merujuk ke lokasi yang sama ketika digunakan dari direktori saat ini.

## Menggunakan `../`

Notasi `../` digunakan untuk berpindah **satu tingkat ke direktori di atas direktori saat ini**.

Misalnya struktur direktori:

```text
project/
├── sad.txt
└── app/
    └── main.py
```

Jika `main.py` berada di dalam folder `app`, sedangkan `sad.txt` berada satu tingkat di atasnya, kita dapat menggunakan:

```python
with open("../sad.txt", mode="r") as my_file:
    print(my_file.read())
```

Pergerakannya dapat digambarkan sebagai:

```text
app/
└── main.py
    │
    └── ../
         ↓
project/
└── sad.txt
```

Dengan demikian, `../` digunakan untuk keluar dari direktori saat ini menuju direktori satu tingkat di atasnya.

## Beberapa Tingkat Direktori dengan `../`

Notasi `../` juga dapat digunakan beberapa kali jika perlu berpindah lebih dari satu tingkat.

Contoh:

```text
project/
├── data/
│   └── file.txt
└── src/
    └── app/
        └── main.py
```

Dari `main.py`, untuk menuju `data/file.txt`, kita dapat menggunakan:

```python
with open("../../data/file.txt", mode="r") as my_file:
    print(my_file.read())
```

Setiap `../` berarti berpindah satu tingkat ke atas.

## Absolute Path

**Absolute path** adalah jalur file yang dimulai dari lokasi paling dasar atau **root** sistem operasi sampai menuju lokasi file yang ingin diakses.

Berbeda dengan relative path, absolute path tidak bergantung pada direktori saat ini.

Contoh pada Unix, Mac, atau Linux:

```python
with open("/Users/username/Desktop/app/sad.txt", mode="r") as my_file:
    print(my_file.read())
```

Path tersebut menunjukkan lokasi file secara lengkap mulai dari root:

```text
/
└── Users/
    └── username/
        └── Desktop/
            └── app/
                └── sad.txt
```

## Relative Path vs Absolute Path

Perbedaan keduanya dapat dilihat dari titik awal path.

### Relative Path

Relative path dimulai dari direktori saat ini.

Contoh:

```text
app/sad.txt
```

atau:

```text
./app/sad.txt
```

Relative path dapat berubah maknanya jika program dijalankan dari direktori yang berbeda.

### Absolute Path

Absolute path menunjukkan lokasi lengkap file dari root sistem operasi.

Contoh:

```text
/Users/username/Desktop/app/sad.txt
```

Absolute path tidak bergantung pada lokasi direktori saat ini.

## Perbedaan Path pada Sistem Operasi

Format file path dapat berbeda antara sistem operasi.

### Mac, Linux, dan Unix

Sistem operasi berbasis Unix menggunakan **forward slash** `/` sebagai pemisah direktori.

Contoh:

```text
/Users/username/Desktop/app/sad.txt
```

Contoh lainnya:

```text
/home/username/Documents/file.txt
```

### Windows

Windows menggunakan **backslash** `\` sebagai pemisah direktori.

Contoh:

```text
C:\Users\name\Desktop\file.txt
```

Perbedaan ini perlu diperhatikan ketika membuat program yang akan dijalankan pada sistem operasi yang berbeda.

## Masalah Path pada Windows

Dalam Python, karakter backslash `\` juga digunakan dalam escape sequence.

Contohnya:

```python
"\n"
```

digunakan untuk newline.

Karena itu, penggunaan Windows path secara langsung dapat membutuhkan perhatian khusus.

Contoh:

```python
path = "C:\\Users\\name\\Desktop\\file.txt"
```

Backslash perlu ditulis sebagai `\\` agar dianggap sebagai karakter backslash.

Salah satu alasan penggunaan `pathlib` adalah untuk menghindari permasalahan tersebut.

## Solusi Lintas Platform dengan `pathlib`

Python menyediakan modul bawaan bernama `pathlib` untuk bekerja dengan file path.

`pathlib` membantu membuat kode yang lebih mudah dibaca dan dapat menyesuaikan format path dengan sistem operasi yang digunakan.

Contoh:

```python
from pathlib import Path

folder_path = Path("app") / "sad.txt"

with open(folder_path, mode="r") as my_file:
    print(my_file.read())
```

Pada contoh tersebut:

```python
Path("app")
```

membuat objek path untuk folder `app`.

Kemudian:

```python
Path("app") / "sad.txt"
```

menggabungkan folder dan nama file menggunakan operator `/`.

Python akan menangani format path sesuai dengan sistem operasi.

## Mengapa Menggunakan `pathlib`?

`pathlib` memiliki beberapa keuntungan:

- Lebih mudah dibaca.
- Membantu menangani perbedaan format path antar sistem operasi.
- Tidak perlu menulis pemisah direktori secara manual.
- Merupakan modul bawaan Python.
- Memudahkan operasi yang berkaitan dengan file dan direktori.

Contoh:

```python
from pathlib import Path

file_path = Path("app") / "sad.txt"

with open(file_path, mode="r") as my_file:
    print(my_file.read())
```

Kode tersebut dapat digunakan pada berbagai sistem operasi tanpa perlu menulis format slash secara manual.

## Perbandingan Penulisan Path

Tanpa `pathlib`, kita dapat menulis:

```python
with open("app/sad.txt", mode="r") as my_file:
    print(my_file.read())
```

Dengan `pathlib`:

```python
from pathlib import Path

file_path = Path("app") / "sad.txt"

with open(file_path, mode="r") as my_file:
    print(my_file.read())
```

Pendekatan menggunakan `pathlib` menjadi lebih fleksibel ketika aplikasi harus berjalan pada beberapa sistem operasi.

## Alur Memahami File Path

Konsep file path dapat diringkas menjadi:

```text
File
 │
 ├── Relative Path
 │   ├── app/file.txt
 │   ├── ./app/file.txt
 │   └── ../file.txt
 │
 └── Absolute Path
     └── /Users/username/Desktop/app/file.txt
```

Kemudian untuk membuat path yang lebih mudah digunakan lintas platform:

```text
Pathlib
   │
   ▼
Path("app") / "file.txt"
   │
   ▼
File Path
```

## Contoh Program Lengkap

Misalnya struktur project:

```text
project/
├── main.py
└── app/
    └── sad.txt
```

Isi `sad.txt`:

```text
This is a text file.
```

Program menggunakan relative path:

```python
with open("app/sad.txt", mode="r") as my_file:
    print(my_file.read())
```

Program menggunakan `pathlib`:

```python
from pathlib import Path

file_path = Path("app") / "sad.txt"

with open(file_path, mode="r") as my_file:
    print(my_file.read())
```

Kedua pendekatan tersebut dapat digunakan untuk mengakses file yang sama.

## Ringkasan

Konsep penting pada materi **File Paths**:

- **File path** menunjukkan lokasi sebuah file atau direktori.
- **Relative path** menggunakan direktori saat ini sebagai titik awal.
- `./` menunjukkan direktori saat ini.
- `../` digunakan untuk berpindah satu tingkat ke direktori di atasnya.
- **Absolute path** menunjukkan lokasi file secara lengkap dari root sistem operasi.
- Mac, Linux, dan Unix menggunakan `/` sebagai pemisah direktori.
- Windows menggunakan `\` sebagai pemisah direktori.
- `pathlib` merupakan modul bawaan Python untuk menangani file path.
- `Path()` dapat digunakan untuk membuat objek path.
- Operator `/` pada `pathlib` dapat digunakan untuk menggabungkan direktori dan nama file.
- Penggunaan `pathlib` membantu membuat kode yang lebih mudah dibaca dan lintas platform.
