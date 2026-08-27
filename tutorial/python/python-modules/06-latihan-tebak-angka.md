---
sidebar_position: 6
title: "Latihan: Tebak Angka"
---

Pada materi ini kita akan menggabungkan beberapa konsep Python yang telah dipelajari sebelumnya untuk membuat sebuah **game tebak angka interaktif**.

Project sederhana ini akan menggunakan module `random`, `sys`, `input()`, perulangan, conditional statement, serta error handling.

## Tujuan Pembelajaran

Setelah menyelesaikan project ini, kita diharapkan dapat memahami cara menggabungkan beberapa konsep Python dalam sebuah program sederhana.

Konsep yang digunakan meliputi:

- Menggunakan module `random` untuk menghasilkan angka secara acak.
- Menggunakan `input()` untuk menerima input dari pengguna.
- Menggunakan `sys.argv` untuk menerima argument dari command line.
- Menggunakan `while True` untuk membuat perulangan permainan.
- Menggunakan `if` dan `else` untuk menentukan kondisi permainan.
- Menggunakan `break` untuk menghentikan permainan ketika tebakan benar.
- Menggunakan `continue` untuk melanjutkan permainan setelah input tidak valid.
- Menggunakan `try` dan `except` untuk menangani `ValueError`.

## Gambaran Program

Program akan meminta pengguna menentukan rentang angka melalui command line.

Contohnya:

```text
python randomgame.py 1 10
```

Artinya:

```text
Angka minimum = 1
Angka maksimum = 10
```

Program kemudian memilih satu angka secara acak di antara `1` sampai `10`.

Pengguna harus menebak angka tersebut sampai mendapatkan jawaban yang benar.

Alur sederhananya:

```text
Command Line
     ↓
Menentukan rentang angka
     ↓
Menghasilkan angka acak
     ↓
Meminta tebakan pengguna
     ↓
Validasi input
     ↓
Apakah berada dalam rentang?
     ↓
Apakah tebakan benar?
   ↙          ↘
Tidak         Ya
 ↓             ↓
Coba lagi     Game selesai
```

## Mengambil Rentang Angka dari Command Line

Program menggunakan module `sys` untuk mengambil argument dari command line.

Contoh:

```text
python randomgame.py 1 10
```

Argument tersebut dapat diakses melalui:

```python
sys.argv
```

Nilai yang diterima oleh `sys.argv` berupa string sehingga perlu dikonversi menjadi integer.

```python
start = int(sys.argv[1])
end = int(sys.argv[2])
```

Setelah proses tersebut:

```text
start = 1
end = 10
```

## Menghasilkan Angka Acak

Setelah mendapatkan batas angka, program menggunakan `randint()` dari module `random`.

```python
from random import randint
```

Kemudian:

```python
answer = randint(start, end)
```

Jika:

```text
start = 1
end = 10
```

maka `answer` akan menjadi salah satu angka dari:

```text
1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

Angka tersebut menjadi jawaban yang harus ditebak pengguna.

## Membuat Perulangan Game

Game harus terus meminta tebakan selama pengguna belum menemukan jawaban yang benar.

Untuk kebutuhan tersebut digunakan:

```python
while True:
```

Contohnya:

```python
while True:
    # proses permainan
```

Perulangan akan terus berjalan sampai terdapat instruksi yang menghentikannya.

Dalam project ini, permainan akan dihentikan menggunakan:

```python
break
```

ketika tebakan pengguna benar.

## Mengambil Input Pengguna

Input pengguna dilakukan menggunakan:

```python
input()
```

Karena input dari `input()` berupa string, hasilnya dikonversi menjadi integer menggunakan `int()`.

```python
guess = int(input(f"Tebak angka antara {start} sampai {end}: "))
```

Contohnya pengguna menjalankan:

```text
python randomgame.py 1 10
```

Kemudian program menampilkan:

```text
Tebak angka antara 1 sampai 10:
```

Pengguna kemudian memasukkan tebakan.

## Validasi Input dengan `try` dan `except`

Pengguna tidak selalu memasukkan angka.

Misalnya program meminta angka:

```text
Tebak angka antara 1 sampai 10:
```

tetapi pengguna memasukkan:

```text
abc
```

Ketika program melakukan:

```python
int("abc")
```

Python akan menghasilkan:

```text
ValueError
```

Agar program tidak berhenti secara tiba-tiba, proses tersebut ditempatkan di dalam `try`.

```python
try:
    guess = int(input(f"Tebak angka antara {start} sampai {end}: "))

except ValueError:
    print("Harap masukkan angka yang valid!")
```

Dengan demikian, jika pengguna memasukkan teks yang tidak dapat dikonversi menjadi integer, program memberikan pesan dan permainan tetap berjalan.

## Validasi Rentang Angka

Selain memastikan input berupa angka, program juga harus memastikan angka tersebut berada dalam rentang yang telah ditentukan.

Misalnya rentangnya:

```text
1 sampai 10
```

Kemudian pengguna memasukkan:

```text
20
```

Input tersebut merupakan angka yang valid, tetapi berada di luar rentang permainan.

Python mendukung penulisan perbandingan seperti:

```python
start <= guess <= end
```

Contohnya:

```python
if start <= guess <= end:
    ...
else:
    print(f"Hei! Masukkan angka antara {start} dan {end} saja.")
```

Perbandingan tersebut berarti:

```text
start <= guess
dan
guess <= end
```

## Memeriksa Jawaban

Jika angka yang dimasukkan berada dalam rentang, program kemudian membandingkannya dengan jawaban.

```python
if guess == answer:
    print("Selamat! Kamu seorang jenius!")
    break
```

Jika:

```text
guess == answer
```

maka pengguna berhasil menebak angka.

Instruksi:

```python
break
```

digunakan untuk keluar dari `while True`.

## Ketika Tebakan Salah

Jika angka masih berada dalam rentang tetapi tidak sama dengan jawaban:

```python
else:
    print("Salah, coba lagi!")
```

Program tidak menjalankan `break`.

Akibatnya, `while True` akan melakukan iterasi berikutnya dan meminta tebakan kembali.

Alurnya:

```text
Tebakan salah
     ↓
"Salah, coba lagi!"
     ↓
Kembali meminta input
```

## Ketika Input Berada di Luar Rentang

Jika pengguna memasukkan angka yang berada di luar rentang:

```python
if start <= guess <= end:
    ...
else:
    print(f"Hei! Masukkan angka antara {start} dan {end} saja.")
```

Program memberikan peringatan dan kembali meminta tebakan.

Contohnya:

```text
Tebak angka antara 1 sampai 10: 20
Hei! Masukkan angka antara 1 dan 10 saja.
```

## Penggunaan `continue`

Ketika terjadi `ValueError`, kita dapat menggunakan `continue` untuk melanjutkan ke iterasi berikutnya.

Contohnya:

```python
except ValueError:
    print("Harap masukkan angka yang valid!")
    continue
```

`continue` membuat program kembali ke awal iterasi `while`.

Secara sederhana:

```text
Input tidak valid
      ↓
ValueError
      ↓
Tampilkan pesan
      ↓
continue
      ↓
Iterasi berikutnya
      ↓
Minta input kembali
```

## Kode Program Lengkap

Berikut implementasi lengkap game tebak angka:

```python
import sys
from random import randint

# Mengambil rentang angka dari argument command line
# Contoh:
# python randomgame.py 1 10

start = int(sys.argv[1])
end = int(sys.argv[2])

# Menghasilkan angka acak
answer = randint(start, end)

# Perulangan game
while True:
    try:
        # Mengambil input dari user
        guess = int(input(f"Tebak angka antara {start} sampai {end}: "))

        # Memastikan angka berada dalam rentang
        if start <= guess <= end:

            # Memeriksa apakah tebakan benar
            if guess == answer:
                print("Selamat! Kamu seorang jenius!")
                break

            else:
                print("Salah, coba lagi!")

        else:
            print(f"Hei! Masukkan angka antara {start} dan {end} saja.")

    except ValueError:
        print("Harap masukkan angka yang valid!")
        continue
```

## Menjalankan Program

Misalnya file disimpan dengan nama:

```text
randomgame.py
```

Jalankan melalui terminal:

```text
python randomgame.py 1 10
```

Program akan menentukan angka acak antara:

```text
1 sampai 10
```

Kemudian program meminta pengguna memasukkan tebakan.

Contoh interaksi:

```text
Tebak angka antara 1 sampai 10: 5
Salah, coba lagi!

Tebak angka antara 1 sampai 10: 8
Salah, coba lagi!

Tebak angka antara 1 sampai 10: 3
Selamat! Kamu seorang jenius!
```

## Konsep yang Digunakan

Project ini menggabungkan beberapa materi Python yang telah dipelajari.

### Module

Menggunakan:

```python
import sys
from random import randint
```

### Command-Line Arguments

Menggunakan:

```python
sys.argv
```

untuk menerima batas angka dari terminal.

### Random Number

Menggunakan:

```python
randint()
```

untuk menghasilkan angka secara acak.

### Input

Menggunakan:

```python
input()
```

untuk menerima tebakan pengguna.

### Loop

Menggunakan:

```python
while True:
```

untuk menjalankan permainan berulang kali.

### Conditional Statement

Menggunakan:

```python
if
```

dan:

```python
else
```

untuk memeriksa kondisi permainan.

### `break`

Digunakan untuk menghentikan permainan ketika pengguna berhasil menebak jawaban.

```python
break
```

### `continue`

Digunakan untuk melanjutkan permainan ketika input tidak valid.

```python
continue
```

### Error Handling

Menggunakan:

```python
try:
```

dan:

```python
except ValueError:
```

untuk menangani input yang tidak dapat dikonversi menjadi integer.

## Catatan Refactoring

Ada beberapa hal penting yang perlu diperhatikan ketika menulis program seperti ini.

### `input()` Harus Berada di Dalam Loop

Input harus berada di dalam:

```python
while True:
```

agar pengguna dapat memberikan tebakan baru pada setiap iterasi.

Jika `input()` berada di luar loop, pengguna hanya akan memberikan satu tebakan.

### `int(input())` Berada di Dalam `try`

Bagian:

```python
int(input(...))
```

berpotensi menghasilkan `ValueError`.

Karena itu, bagian tersebut diletakkan di dalam:

```python
try:
```

agar input yang tidak valid dapat ditangani.

### Gunakan Perbandingan Berantai

Python memungkinkan penulisan:

```python
start <= guess <= end
```

daripada:

```python
guess >= start and guess <= end
```

Keduanya memiliki maksud yang sama, tetapi bentuk pertama lebih ringkas dan idiomatis dalam Python.

## Tantangan Pengembangan

Setelah memahami program dasar ini, coba kembangkan game dengan beberapa fitur tambahan.

Contohnya:

1. Berikan petunjuk apakah tebakan terlalu tinggi atau terlalu rendah.
2. Hitung jumlah percobaan pengguna.
3. Berikan batas maksimal percobaan.
4. Tampilkan skor pengguna.
5. Tambahkan pilihan untuk bermain kembali.
6. Validasi argument command line sebelum program dimulai.
7. Pisahkan logic permainan ke dalam beberapa function.
8. Buat versi program menggunakan class.

Contoh petunjuk:

```text
Tebakan terlalu tinggi!
```

atau:

```text
Tebakan terlalu rendah!
```

Dengan demikian, project sederhana ini dapat dikembangkan menjadi latihan yang lebih kompleks.

## Kesimpulan

Game tebak angka merupakan mini project yang menggabungkan berbagai konsep Python yang telah dipelajari.

Alur utamanya:

```text
Argument Command Line
        ↓
Menentukan rentang angka
        ↓
Generate angka acak
        ↓
while True
        ↓
Minta tebakan
        ↓
Validasi input
        ↓
Validasi rentang
        ↓
Bandingkan dengan jawaban
     ↙           ↘
  Salah          Benar
    ↓              ↓
Coba lagi        break
```

Melalui project ini, beberapa konsep seperti **module, `sys.argv`, `random`, input, loop, conditional statement, `break`, `continue`, dan error handling** digunakan secara bersamaan dalam sebuah program yang nyata.

Project seperti ini penting karena membantu mengubah konsep-konsep Python yang sebelumnya dipelajari secara terpisah menjadi sebuah **aplikasi kecil yang dapat dijalankan dan digunakan**.