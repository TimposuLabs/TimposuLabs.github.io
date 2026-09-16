---
sidebar_position: 5
title: "Latihan: Translator"
---

## Studi Kasus: Penerjemah Berkas Teks

Pada latihan ini, kita akan membuat sebuah alat atau **script Python** yang membaca berkas teks `.txt`, menerjemahkan isinya ke bahasa lain, misalnya bahasa Jepang, kemudian menyimpan hasil terjemahan tersebut ke dalam berkas baru.

Latihan ini menggabungkan beberapa konsep yang sudah dipelajari sebelumnya:

- File I/O.
- Membaca file menggunakan `open()`.
- Menulis file menggunakan mode `w`.
- Menggunakan `with` untuk mengelola file.
- Error handling menggunakan `try...except`.
- Menggunakan library eksternal Python.
- Menerjemahkan teks ke bahasa tujuan.

Alur sederhana program:

```text
File sumber
    │
    ▼
Baca teks
    │
    ▼
Proses penerjemahan
    │
    ▼
Hasil terjemahan
    │
    ▼
File baru
```

## Instalasi Modul `translate`

Untuk melakukan proses penerjemahan, kita menggunakan library eksternal bernama `translate`.

Library tersebut perlu diinstal terlebih dahulu menggunakan `pip`.

Jalankan perintah berikut pada terminal:

```bash
pip install translate
```

Setelah proses instalasi selesai, library dapat digunakan di dalam program Python.

## Struktur File

Sebagai contoh, kita memiliki file sumber bernama:

```text
test.txt
```

File tersebut berisi teks yang ingin diterjemahkan.

Kemudian program akan menghasilkan file baru:

```text
test-ja.txt
```

File `test-ja.txt` digunakan untuk menyimpan hasil terjemahan.

Struktur sederhananya:

```text
project/
├── test.txt
└── translator.py
```

Setelah program dijalankan, hasilnya menjadi:

```text
project/
├── test.txt
├── test-ja.txt
└── translator.py
```

## Mengimpor `Translator`

Library `translate` menyediakan class `Translator` yang digunakan untuk melakukan proses penerjemahan.

Import menggunakan:

```python
from translate import Translator
```

Setelah itu, `Translator` dapat digunakan untuk menentukan bahasa tujuan.

## Membaca File Sumber

Langkah pertama adalah membaca isi file `test.txt`.

Gunakan `with open()` dengan mode `r`:

```python
with open("./test.txt", mode="r") as my_file:
    text = my_file.read()
```

Penjelasan:

- `open()` digunakan untuk membuka file.
- `./test.txt` menunjukkan lokasi file menggunakan relative path.
- `mode="r"` digunakan untuk membaca file.
- `read()` membaca seluruh isi file.
- Hasil pembacaan disimpan ke dalam variabel `text`.
- `with` memastikan file ditutup secara otomatis setelah selesai digunakan.

## Membuat Translator

Setelah teks berhasil dibaca, kita membuat objek `Translator`.

Contoh:

```python
translator = Translator(to_lang="ja")
```

Parameter:

```text
to_lang="ja"
```

digunakan untuk menentukan bahasa tujuan, yaitu bahasa Jepang.

Setelah objek translator dibuat, kita dapat menggunakan objek tersebut untuk menerjemahkan teks.

## Menerjemahkan Teks

Gunakan method `translate()` untuk memproses teks.

```python
translation = translator.translate(text)
```

Variabel `text` berisi teks asli dari file.

Hasil penerjemahan kemudian disimpan dalam variabel:

```python
translation
```

Sehingga alurnya:

```text
test.txt
   │
   ▼
text
   │
   ▼
translator.translate()
   │
   ▼
translation
```

## Menyimpan Hasil Terjemahan

Setelah proses penerjemahan selesai, hasilnya perlu disimpan ke file baru.

Gunakan mode `w`:

```python
with open("./test-ja.txt", mode="w") as my_file_2:
    my_file_2.write(translation)
```

Mode `w` digunakan untuk menulis hasil terjemahan ke dalam file.

Jika `test-ja.txt` belum ada, Python akan membuat file tersebut.

Jika file sudah ada, isinya akan ditimpa dengan hasil terjemahan baru.

## Menambahkan Error Handling

Program File I/O dapat mengalami error, misalnya ketika file sumber tidak ditemukan.

Untuk menangani kondisi tersebut, gunakan `try...except`.

Contoh:

```python
try:
    with open("./test.txt", mode="r") as my_file:
        text = my_file.read()

except FileNotFoundError as err:
    print("File tidak ditemukan, periksa kembali path file Anda!")
    raise err
```

Jika `test.txt` tidak ditemukan, Python akan menghasilkan `FileNotFoundError`.

Blok `except` kemudian menangkap error tersebut dan menampilkan pesan yang lebih mudah dipahami.

## Program Lengkap

Berikut implementasi lengkap latihan Translator:

```python
from translate import Translator

try:
    # 1. Membaca file teks sumber
    with open("./test.txt", mode="r") as my_file:
        text = my_file.read()

        # 2. Inisialisasi translator ke bahasa tujuan
        translator = Translator(to_lang="ja")
        translation = translator.translate(text)

        # 3. Menulis hasil terjemahan ke file baru
        with open("./test-ja.txt", mode="w") as my_file_2:
            my_file_2.write(translation)

        print("Penerjemahan selesai! Hasil disimpan di test-ja.txt")

except FileNotFoundError as err:
    print("File tidak ditemukan, periksa kembali path file Anda!")
    raise err
```

## Penjelasan Program

Program dimulai dengan mengimpor `Translator`:

```python
from translate import Translator
```

Kemudian seluruh proses utama ditempatkan di dalam blok `try`:

```python
try:
    ...
```

Tujuannya adalah menangani kemungkinan `FileNotFoundError` ketika file sumber dibuka.

### Membaca File

Program membuka `test.txt` menggunakan mode `r`:

```python
with open("./test.txt", mode="r") as my_file:
    text = my_file.read()
```

Seluruh isi file kemudian disimpan ke dalam variabel `text`.

### Membuat Translator

Program membuat translator dengan bahasa tujuan Jepang:

```python
translator = Translator(to_lang="ja")
```

### Melakukan Penerjemahan

Isi file diterjemahkan menggunakan:

```python
translation = translator.translate(text)
```

Hasilnya disimpan di dalam variabel `translation`.

### Menulis Hasil

Hasil terjemahan kemudian disimpan ke `test-ja.txt`:

```python
with open("./test-ja.txt", mode="w") as my_file_2:
    my_file_2.write(translation)
```

### Menampilkan Pesan

Setelah proses selesai, program menampilkan:

```python
print("Penerjemahan selesai! Hasil disimpan di test-ja.txt")
```

Pesan tersebut memberikan informasi kepada pengguna bahwa proses penerjemahan telah selesai.

## Alur Kerja Program

Secara keseluruhan, program bekerja dengan alur berikut:

```text
                test.txt
                   │
                   ▼
             open(..., "r")
                   │
                   ▼
               read()
                   │
                   ▼
                 text
                   │
                   ▼
       Translator(to_lang="ja")
                   │
                   ▼
          translator.translate()
                   │
                   ▼
             translation
                   │
                   ▼
            open(..., "w")
                   │
                   ▼
              write()
                   │
                   ▼
              test-ja.txt
```

## Error Handling

Jika file sumber tidak tersedia:

```text
test.txt
   │
   ▼
open()
   │
   ▼
FileNotFoundError
   │
   ▼
except FileNotFoundError
   │
   ▼
Pesan error
```

Program menampilkan:

```text
File tidak ditemukan, periksa kembali path file Anda!
```

Dengan demikian, pengguna mendapatkan informasi mengenai masalah yang terjadi.

## Konsep yang Dipraktikkan

Latihan Translator menggabungkan beberapa konsep Python yang telah dipelajari.

| Konsep | Penggunaan |
|---|---|
| `open()` | Membuka file |
| `mode="r"` | Membaca file |
| `read()` | Mengambil isi file |
| `with` | Mengelola file secara aman |
| `Translator` | Membuat objek penerjemah |
| `translate()` | Menerjemahkan teks |
| `mode="w"` | Menulis file |
| `write()` | Menyimpan hasil terjemahan |
| `try...except` | Menangani error |
| `FileNotFoundError` | Menangani file yang tidak ditemukan |

## Ringkasan

Pada latihan **Exercise: Translator**, kita membuat program yang membaca teks dari sebuah file, menerjemahkannya, kemudian menyimpan hasilnya ke file baru.

Alur utamanya adalah:

1. Menginstal library `translate`.
2. Mengimpor `Translator`.
3. Membuka file sumber menggunakan mode `r`.
4. Membaca isi file menggunakan `read()`.
5. Membuat objek `Translator`.
6. Menentukan bahasa tujuan menggunakan `to_lang`.
7. Menerjemahkan teks menggunakan `translate()`.
8. Membuka file tujuan menggunakan mode `w`.
9. Menyimpan hasil menggunakan `write()`.
10. Menangani `FileNotFoundError` menggunakan `try...except`.

Latihan ini merupakan contoh penerapan beberapa konsep **File I/O**, **Error Handling**, dan **External Library** dalam satu program Python.
