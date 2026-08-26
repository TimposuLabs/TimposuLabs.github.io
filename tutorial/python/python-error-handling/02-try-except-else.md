---
sidebar_position: 2
title: "Try, Except & Else"
---

Python menyediakan mekanisme **Error Handling** untuk menangani exception yang terjadi ketika program sedang berjalan.

Dengan mekanisme ini, program dapat menentukan tindakan yang harus dilakukan ketika terjadi kesalahan sehingga program tidak langsung berhenti secara tiba-tiba.

Struktur dasar yang digunakan adalah:

```text
try
 ↓
Menjalankan kode yang berpotensi menghasilkan exception
 ↓
Terjadi exception?
 ├── Ya  → except
 └── Tidak → else
```

## Blok `try`

Blok `try` digunakan untuk membungkus kode yang berpotensi menghasilkan exception.

Contohnya:

```python
try:
    age = int(input("Berapa umur Anda? "))
```

Jika pengguna memasukkan nilai yang tidak dapat dikonversi menjadi integer, Python akan menghasilkan `ValueError`.

Kode yang berpotensi menghasilkan exception sebaiknya ditempatkan di dalam blok `try`.

## Blok `except`

Blok `except` digunakan untuk menangkap dan menangani exception yang terjadi di dalam blok `try`.

Contoh:

```python
try:
    age = int(input("Berapa umur Anda? "))
except ValueError:
    print("Harap masukkan angka yang valid.")
```

Jika pengguna memasukkan:

```text
abc
```

konversi tersebut akan menghasilkan `ValueError`.

Exception tersebut kemudian ditangkap oleh:

```python
except ValueError:
```

dan program menjalankan kode penanganannya.

## Menangani Beberapa Jenis Exception

Sebuah blok `try` dapat memiliki beberapa blok `except`.

Contohnya:

```python
try:
    age = int(input("Berapa umur Anda? "))
    result = 10 / age

except ValueError:
    print("Harap masukkan angka yang valid.")

except ZeroDivisionError:
    print("Harap masukkan angka yang lebih besar dari 0.")
```

Pada contoh tersebut terdapat dua kemungkinan exception.

### `ValueError`

Terjadi ketika input tidak dapat dikonversi menjadi integer.

Contoh input:

```text
abc
```

### `ZeroDivisionError`

Terjadi ketika pengguna memasukkan:

```text
0
```

sehingga program mencoba melakukan pembagian dengan nol.

Dengan menangani kedua exception secara terpisah, program dapat memberikan pesan yang sesuai dengan penyebab masalah.

## Blok `else`

Blok `else` dijalankan **hanya jika tidak terjadi exception** pada blok `try`.

Contoh:

```python
try:
    age = int(input("Berapa umur Anda? "))

except ValueError:
    print("Harap masukkan angka yang valid.")

else:
    print("Input berhasil diproses.")
```

Jika input valid, blok `else` akan dijalankan.

Jika terjadi `ValueError`, blok `else` tidak akan dijalankan.

Secara sederhana:

```text
try
 ↓
Berhasil?
 ├── Ya → else
 └── Tidak → except
```

## Contoh `try`, `except`, dan `else`

Berikut contoh yang menggabungkan ketiga blok tersebut:

```python
try:
    age = int(input("Berapa umur Anda? "))
    10 / age

except ValueError:
    print("Harap masukkan angka yang valid.")

except ZeroDivisionError:
    print("Harap masukkan angka yang lebih besar dari 0.")

else:
    print("Terima kasih!")
```

Alur program:

```text
Input pengguna
      ↓
     try
      ↓
   ┌──┴───┐
   ↓      ↓
 Error   Berhasil
   ↓      ↓
except   else
```

## Menggunakan `while True`

Error handling sering digunakan bersama perulangan ketika program harus terus meminta input sampai pengguna memberikan data yang valid.

Contohnya:

```python
while True:
    try:
        age = int(input("Berapa umur Anda? "))
        10 / age

    except ValueError:
        print("Harap masukkan angka yang valid.")

    except ZeroDivisionError:
        print("Harap masukkan angka yang lebih besar dari 0.")

    else:
        print("Terima kasih!")
        break
```

Pada contoh tersebut, `while True` membuat program terus melakukan perulangan.

Jika input tidak valid:

```text
Input
 ↓
Error
 ↓
except
 ↓
Kembali meminta input
```

Jika input valid:

```text
Input
 ↓
Tidak ada error
 ↓
else
 ↓
break
 ↓
Perulangan berhenti
```

Pola seperti ini berguna ketika program harus memastikan bahwa pengguna memberikan input yang sesuai sebelum proses dilanjutkan.

## Urutan `except`

Ketika sebuah exception terjadi, Python akan mencari blok `except` yang sesuai.

Jika terdapat beberapa blok `except`, Python akan menjalankan **blok `except` pertama yang cocok dengan jenis exception yang terjadi**.

Setelah exception berhasil ditangani, Python tidak menjalankan blok `except` berikutnya untuk exception yang sama.

Contohnya:

```python
try:
    age = int(input("Umur: "))

except ValueError:
    print("Input tidak valid.")

except ZeroDivisionError:
    print("Tidak boleh nol.")
```

Jika terjadi `ValueError`, hanya bagian berikut yang dijalankan:

```python
except ValueError:
    print("Input tidak valid.")
```

Python tidak kemudian menjalankan:

```python
except ZeroDivisionError:
```

## Mengapa Menangani Exception Secara Spesifik?

Sebaiknya exception ditangani berdasarkan jenis kesalahannya.

Misalnya:

```python
except ValueError:
    print("Input harus berupa angka.")
```

lebih informatif daripada menangkap semua kemungkinan exception tanpa mengetahui jenis masalahnya.

Penanganan yang spesifik memungkinkan program memberikan respons yang lebih sesuai dengan kondisi yang terjadi.

## Pola Dasar Error Handling

Struktur umum yang perlu diingat:

```python
try:
    # Kode yang berpotensi menghasilkan exception

except SomeException:
    # Penanganan ketika exception terjadi

else:
    # Dijalankan jika tidak ada exception
```

Ketiga blok tersebut memiliki fungsi yang berbeda:

| Blok | Fungsi |
| --- | --- |
| `try` | Menjalankan kode yang berpotensi menghasilkan exception |
| `except` | Menangani exception yang terjadi |
| `else` | Dijalankan jika tidak terjadi exception |

## Kesimpulan

`try`, `except`, dan `else` merupakan bagian penting dari mekanisme Error Handling Python.

Alur dasarnya adalah:

```text
try
 ↓
Kode dijalankan
 ↓
┌─────────────────┐
│ Terjadi error?  │
└─────────────────┘
      ↓
   ┌──┴───┐
   ↓      ↓
  Ya     Tidak
   ↓      ↓
except   else
```

`try` digunakan untuk menjalankan kode yang berpotensi menghasilkan exception, `except` digunakan untuk menangani exception tertentu, sedangkan `else` digunakan untuk menjalankan kode ketika proses pada `try` berhasil tanpa exception.

Kombinasi `while True` dengan `try`, `except`, dan `else` juga dapat digunakan untuk membuat program yang terus meminta input hingga mendapatkan data yang valid.

Pada materi berikutnya, konsep ini dapat dilanjutkan dengan **blok `finally` dan penggunaan `raise` untuk menangani exception secara lebih lanjut**.