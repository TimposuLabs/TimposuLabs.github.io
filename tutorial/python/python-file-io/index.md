---
sidebar_position: 10
---

# Python File I/O

## Pengertian File I/O (Input / Output)

**I/O** merupakan singkatan dari **Input/Output**. Dalam pemrograman, I/O adalah proses interaksi antara program dengan lingkungan di luar program, seperti file, database, atau server.

Secara sederhana:

- **Input** adalah proses mengambil atau membaca data dari luar ke dalam program.
- **Output** adalah proses mengirim atau menulis data dari program ke luar.

Contoh penggunaan File I/O dalam Python:

- Membaca file teks `.txt`.
- Membaca data dari file CSV.
- Menyimpan hasil pemrosesan program ke dalam file.
- Membuat atau memperbarui file.
- Membaca file gambar atau PDF menggunakan library tertentu.

### Input

Input terjadi ketika program **menerima data dari luar**.

Contoh:

```python
my_file = open("test.txt")
data = my_file.read()

print(data)
```

Program membaca isi file `test.txt` dan memasukkannya ke dalam program.

### Output

Output terjadi ketika program **menghasilkan atau menyimpan data ke luar**.

Contoh:

```python
my_file = open("output.txt", "w")
my_file.write("Hello Python!")

my_file.close()
```

Program menulis teks ke dalam file `output.txt`.

## Membuka File dengan `open()`

Python menyediakan fungsi bawaan bernama `open()` untuk mengakses file.

Sintaks dasar:

```python
open("nama_file")
```

Contoh:

```python
my_file = open("test.txt")

print(my_file)
```

Output yang dapat ditampilkan:

```text
<_io.TextIOWrapper name='test.txt' mode='r' encoding='UTF-8'>
```

Secara default, `open()` membuka file dalam mode **read (`r`)**, yaitu mode untuk membaca file.

## Membaca Seluruh Isi File dengan `read()`

Setelah file dibuka, kita dapat menggunakan metode `read()` untuk membaca seluruh isi file.

```python
my_file = open("test.txt")

print(my_file.read())
```

Metode `read()` akan membaca seluruh teks yang tersedia dari posisi cursor saat ini sampai akhir file.

Misalnya isi `test.txt` adalah:

```text
Hi, my name is Andre.
How are you?
```

Maka hasilnya:

```text
Hi, my name is Andre.
How are you?
```

## Memahami File Cursor

Ketika Python membaca sebuah file, terdapat posisi yang dapat dianggap sebagai **file cursor** atau kursor file.

Cursor menentukan dari posisi mana pembacaan berikutnya akan dilakukan.

Misalnya terdapat file:

```text
Hello Python
```

Ketika file pertama kali dibuka, cursor berada di awal:

```text
|Hello Python
^
Cursor
```

Setelah menjalankan:

```python
my_file.read()
```

seluruh isi file dibaca dan cursor berpindah ke akhir:

```text
Hello Python|
            ^
          Cursor
```

Jika `read()` dipanggil kembali:

```python
print(my_file.read())
```

hasilnya akan kosong karena cursor sudah berada di akhir file.

## Mengembalikan Cursor dengan `seek()`

Untuk mengembalikan posisi cursor ke awal file, gunakan metode `seek()`.

```python
my_file.seek(0)
```

Angka `0` menunjukkan posisi awal file.

Contoh:

```python
my_file = open("test.txt")

print(my_file.read())

my_file.seek(0)

print(my_file.read())
```

Dengan `seek(0)`, file dapat dibaca kembali dari awal.

## Membaca File Baris demi Baris dengan `readline()`

Selain `read()`, Python menyediakan metode `readline()` untuk membaca satu baris pada satu waktu.

Contoh:

```python
my_file = open("test.txt")

print(my_file.readline())
print(my_file.readline())
```

Jika file berisi:

```text
Hi, my name is Andre.
How are you?
I am learning Python.
```

Pemanggilan pertama:

```python
my_file.readline()
```

akan membaca baris pertama.

Pemanggilan berikutnya:

```python
my_file.readline()
```

akan membaca baris kedua.

Setiap pemanggilan `readline()` akan memindahkan cursor ke posisi berikutnya.

## Membaca Semua Baris dengan `readlines()`

Metode `readlines()` digunakan untuk membaca seluruh baris file dan mengembalikannya dalam bentuk **list**.

Contoh:

```python
my_file = open("test.txt")

lines = my_file.readlines()

print(lines)
```

Misalnya file berisi:

```text
Hi, my name is Andre.
How are you?
```

Hasilnya dapat berupa:

```python
[
    "Hi, my name is Andre.\n",
    "How are you?"
]
```

Karakter `\n` menunjukkan **newline**, yaitu perpindahan ke baris baru.

## Perbandingan Metode Pembacaan File

| Method | Fungsi |
|---|---|
| `read()` | Membaca seluruh isi file |
| `readline()` | Membaca satu baris |
| `readlines()` | Membaca seluruh baris dan mengembalikannya sebagai list |
| `seek()` | Memindahkan posisi cursor |

Contoh penggunaan:

```python
my_file = open("test.txt")

content = my_file.read()

my_file.seek(0)

line = my_file.readline()

my_file.seek(0)

lines = my_file.readlines()
```

## Menutup File dengan `close()`

Setelah selesai menggunakan file, file perlu ditutup menggunakan metode `close()`.

```python
my_file.close()
```

Contoh lengkap:

```python
my_file = open("test.txt")

print(my_file.read())

my_file.close()
```

Menutup file setelah selesai digunakan merupakan praktik yang baik agar resource yang digunakan oleh file dapat dilepaskan.

## Memeriksa Apakah File Sudah Ditutup

Python menyediakan atribut `closed` untuk memeriksa status file.

```python
my_file = open("test.txt")

print(my_file.closed)

my_file.close()

print(my_file.closed)
```

Hasilnya:

```text
False
True
```

Artinya:

- `False` berarti file masih terbuka.
- `True` berarti file sudah ditutup.

## Alur Dasar File I/O

Secara umum, proses membaca file menggunakan Python dapat digambarkan sebagai berikut:

```text
File
  │
  ▼
open()
  │
  ▼
File Object
  │
  ├── read()
  ├── readline()
  └── readlines()
  │
  ▼
Data
  │
  ▼
close()
```

Urutan dasarnya adalah:

1. Membuka file menggunakan `open()`.
2. Membaca atau memproses isi file.
3. Menggunakan `seek()` jika perlu kembali ke posisi tertentu.
4. Menutup file menggunakan `close()`.

## Contoh Program File I/O Sederhana

Misalnya terdapat file `test.txt`:

```text
Hello Python.
I am learning File I/O.
Python is fun.
```

Program:

```python
my_file = open("test.txt")

print("Isi file:")
print(my_file.read())

my_file.close()
```

Output:

```text
Isi file:
Hello Python.
I am learning File I/O.
Python is fun.
```

Program tersebut melakukan tiga langkah utama:

```text
open()
  ↓
read()
  ↓
close()
```

## Ringkasan

File I/O digunakan ketika program perlu berinteraksi dengan data yang berada di luar program.

Konsep penting yang perlu dipahami:

- **I/O** adalah Input/Output.
- **Input** mengambil data dari luar ke dalam program.
- **Output** mengirim atau menyimpan data dari program ke luar.
- `open()` digunakan untuk membuka file.
- `read()` digunakan untuk membaca seluruh isi file.
- `readline()` digunakan untuk membaca satu baris.
- `readlines()` digunakan untuk membaca seluruh baris sebagai list.
- `seek()` digunakan untuk memindahkan posisi file cursor.
- `close()` digunakan untuk menutup file setelah selesai digunakan.
- File cursor menentukan posisi pembacaan data dalam file.
