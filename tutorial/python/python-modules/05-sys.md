---
sidebar_position: 5
title: "Modul sys"
---

Modul `sys` (*system*) merupakan salah satu module yang tersedia di **Python Standard Library**.

Module ini menyediakan berbagai variable dan function yang memungkinkan program berinteraksi dengan **Python interpreter** serta lingkungan tempat program dijalankan.

Salah satu fitur yang penting untuk dipahami adalah:

```python
sys.argv
```

`sys.argv` memungkinkan sebuah program menerima **argument dari command line** ketika program dijalankan melalui Terminal atau Command Prompt.

## Apa Itu `sys.argv`?

`sys.argv` adalah sebuah `list` yang berisi argument yang diberikan ketika sebuah program Python dijalankan dari command line.

Misalnya kita menjalankan:

```text
python app.py Budi Santoso
```

Maka secara konseptual argument yang diterima program adalah:

```text
sys.argv
    ↓
["app.py", "Budi", "Santoso"]
```

Setiap argument dapat diakses menggunakan index.

```text
sys.argv[0] → app.py
sys.argv[1] → Budi
sys.argv[2] → Santoso
```

## Struktur `sys.argv`

`sys.argv` menggunakan index seperti `list` pada umumnya.

```text
Index       Isi
────────────────────────
[0]         Nama file/script
[1]         Argument pertama
[2]         Argument kedua
[3]         Argument ketiga
...
```

Hal penting yang perlu diingat adalah:

> `sys.argv[0]` berisi nama script yang sedang dijalankan, sedangkan argument yang diberikan pengguna dimulai dari `sys.argv[1]`.

## Contoh Sederhana

Misalnya kita memiliki file:

```text
app.py
```

Isi file:

```python
import sys

nama_depan = sys.argv[1]
nama_belakang = sys.argv[2]

print(f"Halo, {nama_depan} {nama_belakang}!")
```

Program tersebut dapat dijalankan melalui Terminal:

```text
python app.py Budi Santoso
```

Python akan menerima argument:

```text
sys.argv[0] → app.py
sys.argv[1] → Budi
sys.argv[2] → Santoso
```

Kemudian program menghasilkan:

```text
Halo, Budi Santoso!
```

## Argument Command Line Berupa String

Nilai yang terdapat dalam `sys.argv` diterima sebagai **string**.

Misalnya:

```text
python app.py 10 20
```

Nilainya secara konseptual adalah:

```python
sys.argv[1]  # "10"
sys.argv[2]  # "20"
```

Bukan:

```python
10
20
```

dalam bentuk integer.

Jika argument akan digunakan sebagai angka, kita perlu melakukan konversi tipe data.

Contohnya:

```python
angka = int(sys.argv[1])
```

Dengan demikian:

```text
"10"
  ↓
int()
  ↓
 10
```

## Mengapa Menggunakan Command-Line Arguments?

Command-line arguments memungkinkan kita memberikan input kepada program **tanpa harus mengubah source code**.

Tanpa command-line arguments:

```python
start = 1
end = 10
```

Jika ingin mengganti rentang:

```python
start = 10
end = 100
```

kita harus mengubah source code.

Dengan `sys.argv`, nilai dapat diberikan ketika program dijalankan:

```text
python game.py 1 10
```

Kemudian:

```text
python game.py 10 100
```

Program yang sama dapat digunakan dengan parameter yang berbeda.

## Contoh Penggunaan pada Program

Misalnya sebuah program membutuhkan nama pengguna.

Kita dapat menjalankannya:

```text
python app.py Budi
```

Kemudian program mengambil:

```python
nama = sys.argv[1]
```

dan menggunakan nilai tersebut:

```python
print(f"Halo, {nama}!")
```

Output:

```text
Halo, Budi!
```

Dengan demikian, input diberikan dari luar program.

## Contoh: Game Tebak Angka

`sys.argv` dapat dikombinasikan dengan module lain, misalnya `random`, untuk membuat program sederhana.

Pada contoh berikut, batas awal dan batas akhir angka diberikan melalui command line.

### `game.py`

```python
import sys
from random import randint

start = int(sys.argv[1])
end = int(sys.argv[2])

jawaban = randint(start, end)

while True:
    try:
        tebakan = int(input(f"Tebak angka antara {start} sampai {end}: "))

        if start <= tebakan <= end:
            if tebakan == jawaban:
                print("Selamat! Tebakan Anda benar!")
                break
            else:
                print("Salah, coba lagi!")
        else:
            print(f"Harap masukkan angka dalam rentang {start} - {end}.")

    except ValueError:
        print("Harap masukkan angka yang valid.")
```

Program tersebut dapat dijalankan dengan:

```text
python game.py 1 10
```

Maka:

```text
sys.argv[0] → game.py
sys.argv[1] → 1
sys.argv[2] → 10
```

Setelah dikonversi menggunakan `int()`:

```python
start = int(sys.argv[1])
end = int(sys.argv[2])
```

program mendapatkan:

```text
start = 1
end = 10
```

Kemudian `randint()` menghasilkan angka acak di antara batas tersebut.

## Alur Program

Secara sederhana, program game tersebut bekerja seperti berikut:

```text
Terminal
   ↓
python game.py 1 10
   ↓
sys.argv
   ↓
["game.py", "1", "10"]
   ↓
Konversi string menjadi integer
   ↓
start = 1
end = 10
   ↓
random.randint()
   ↓
Angka jawaban
   ↓
User melakukan tebakan
```

## `sys.argv` dan `input()`

Python memiliki beberapa cara untuk mendapatkan input dari pengguna.

Salah satunya adalah:

```python
input()
```

Input tersebut diberikan ketika program sedang berjalan.

Sedangkan:

```python
sys.argv
```

menerima argument ketika program **dijalankan dari command line**.

Perbedaannya secara sederhana:

| Metode | Waktu Input |
| --- | --- |
| `input()` | Saat program sedang berjalan |
| `sys.argv` | Saat program dijalankan |

Contoh `input()`:

```text
Program berjalan
      ↓
Masukkan nama:
      ↓
User mengetik
```

Contoh `sys.argv`:

```text
Terminal
      ↓
python app.py Budi
      ↓
Program berjalan
```

Keduanya dapat digunakan secara bersamaan dalam sebuah program.

## Kelebihan `sys.argv`

Penggunaan command-line arguments memberikan beberapa keuntungan:

### Program Lebih Dinamis

Parameter dapat diberikan dari luar program tanpa mengubah source code.

### Cocok untuk Automation

Program dapat dijalankan dengan parameter tertentu dari script atau command line.

Contohnya:

```text
python process.py data.csv
```

### Cocok untuk Utility dan Script

Banyak program berbasis command line menggunakan argument untuk menentukan file, parameter, mode operasi, atau konfigurasi tertentu.

## Hal yang Perlu Diperhatikan

Karena `sys.argv` berbentuk `list` dan argument diterima sebagai string, kita perlu memperhatikan beberapa hal.

### Pastikan Argument Tersedia

Jika program mengakses:

```python
sys.argv[1]
```

tetapi pengguna menjalankan:

```text
python app.py
```

maka argument tersebut tidak tersedia.

Program dapat menghasilkan:

```text
IndexError
```

Karena itu, program yang lebih serius perlu melakukan validasi terhadap argument yang diberikan.

### Konversi Tipe Data

Jika argument akan digunakan sebagai angka:

```python
angka = int(sys.argv[1])
```

Jika tidak dikonversi, nilainya tetap berupa string.

## Keterbatasan `sys.argv`

`sys.argv` sangat sederhana dan cocok untuk memahami konsep command-line arguments.

Namun, ketika aplikasi memiliki banyak argument, pilihan argument yang kompleks, default value, atau kebutuhan validasi yang lebih lengkap, pendekatan ini dapat menjadi kurang nyaman.

Python menyediakan module lain seperti `argparse` untuk menangani command-line arguments dengan fitur yang lebih lengkap.

Konsep yang perlu dipahami terlebih dahulu adalah bagaimana argument dari command line masuk ke dalam program melalui `sys.argv`.

## Kesimpulan

Module `sys` menyediakan berbagai functionality yang berkaitan dengan Python interpreter dan lingkungan sistem.

Salah satu fitur pentingnya adalah:

```python
sys.argv
```

yang memungkinkan program menerima argument dari command line.

Struktur dasarnya:

```text
python app.py arg1 arg2
          ↓     ↓    ↓
      sys.argv[0] [1] [2]
```

Contohnya:

```text
python app.py Budi Santoso
```

menghasilkan konsep:

```text
sys.argv[0] → "app.py"
sys.argv[1] → "Budi"
sys.argv[2] → "Santoso"
```

Argument tersebut dapat digunakan untuk membuat program yang lebih dinamis tanpa harus mengubah source code setiap kali parameter program berubah.

Pemahaman `sys.argv` juga menjadi dasar sebelum mempelajari **command-line interface (CLI)** yang lebih kompleks menggunakan module seperti `argparse`.