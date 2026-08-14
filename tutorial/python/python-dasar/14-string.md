---
sidebar_position: 14
title: "String"
---

**String** atau `str` adalah tipe data yang digunakan untuk menyimpan **teks atau sekumpulan karakter**.

String dapat berisi berbagai macam karakter, seperti:

- Huruf.
- Angka.
- Simbol.
- Spasi.
- Karakter khusus.

Contohnya:

```python
nama = "Andrei"
pesan = "Hello Python"
password = "super_secret_password"
```

Meskipun sebuah string berisi angka, nilai tersebut tetap dianggap sebagai string jika ditulis sebagai teks.

Contohnya:

```python
kode = "12345"
```

Variable `kode` memiliki tipe `str`, bukan `int`.

---

## 1. Membuat String

Python menyediakan beberapa cara untuk membuat string.

Cara yang paling umum adalah menggunakan:

- Single quote `'...'`
- Double quote `"..."`
- Triple quote `'''...'''`
- Triple double quote `"""..."""`

---

## 2. Single Quote

String dapat dibuat menggunakan tanda petik satu.

Contohnya:

```python
nama = 'Andrei'
pesan = 'Hello Python'
```

Tanda petik satu digunakan sebagai pembuka dan penutup string.

Contohnya:

```text
'Hello Python'
│             │
└── String ───┘
```

---

## 3. Double Quote

String juga dapat dibuat menggunakan tanda petik dua.

Contohnya:

```python
nama = "Andrei"
pesan = "Hello Python"
```

Dalam penggunaan umum, single quote dan double quote memiliki fungsi yang sama.

Contohnya:

```python
nama1 = 'Andrei'
nama2 = "Andrei"
```

Keduanya merupakan string.

Kita dapat memeriksa tipenya:

```python
print(type(nama1))
print(type(nama2))
```

Hasil:

```text
<class 'str'>
<class 'str'>
```

---

## 4. Memilih Single Quote atau Double Quote

Python tidak mengharuskan kita selalu menggunakan single quote atau double quote.

Yang penting adalah tanda pembuka dan penutup harus sesuai.

Contoh yang benar:

```python
nama = 'Andrei'
pesan = "Hello Python"
```

Contoh yang salah:

```python
nama = 'Andrei"
```

Pembuka menggunakan single quote, tetapi penutup menggunakan double quote.

Sebagai programmer, sebaiknya pilih satu gaya dan gunakan secara konsisten dalam sebuah project.

---

## 5. Triple Quote

Python juga menyediakan triple quote untuk membuat string yang dapat mencakup beberapa baris.

Triple quote dapat menggunakan:

```python
'''
...
'''
```

atau:

```python
"""
...
"""
```

Contohnya:

```python
pesan = '''
Hello Python
Selamat belajar
Mari menjadi programmer
'''
```

String tersebut dapat memiliki beberapa baris.

---

## 6. Multiline String

Triple quote sangat berguna ketika kita ingin membuat **multiline string**.

Contohnya:

```python
alamat = """
TimposuLabs
Palu
Sulawesi Tengah
Indonesia
"""
```

String tersebut terdiri dari beberapa baris.

Multiline string dapat digunakan untuk:

- Paragraf.
- Template teks.
- Pesan panjang.
- ASCII art.
- Teks yang memiliki format beberapa baris.

---

## 7. String dan Baris Baru

String juga dapat berisi karakter newline.

Salah satu cara merepresentasikan baris baru adalah menggunakan escape sequence:

```text
\n
```

Contohnya:

```python
pesan = "Hello\nPython"
```

Ketika ditampilkan:

```python
print(pesan)
```

hasilnya:

```text
Hello
Python
```

Karakter `\n` memberitahu Python untuk membuat baris baru.

Pembahasan mengenai escape sequence akan dibahas lebih lanjut pada materi string berikutnya.

---

## 8. String Concatenation

**String concatenation** adalah proses menggabungkan beberapa string menjadi satu string.

Python dapat menggunakan operator `+` untuk menggabungkan string.

Contohnya:

```python
first_name = "Andrei"
last_name = "Neagoie"

full_name = first_name + last_name

print(full_name)
```

Hasil:

```text
AndreiNeagoie
```

Perhatikan bahwa Python **tidak secara otomatis menambahkan spasi** di antara kedua string.

---

## 9. Menambahkan Spasi

Jika ingin memberikan spasi di antara dua string, kita perlu menambahkan string spasi secara eksplisit.

Contohnya:

```python
first_name = "Andrei"
last_name = "Neagoie"

full_name = first_name + " " + last_name

print(full_name)
```

Hasil:

```text
Andrei Neagoie
```

Prosesnya:

```text
"Andrei"
   +
" "
   +
"Neagoie"
   ↓
"Andrei Neagoie"
```

---

## 10. Menggabungkan Lebih dari Dua String

Kita juga dapat menggabungkan lebih dari dua string.

Contohnya:

```python
first_name = "Andrei"
middle_name = "John"
last_name = "Neagoie"

full_name = first_name + " " + middle_name + " " + last_name

print(full_name)
```

Hasil:

```text
Andrei John Neagoie
```

Namun, untuk penggabungan string yang lebih kompleks, Python menyediakan teknik lain seperti **f-string** yang akan dipelajari pada materi string berikutnya.

---

## 11. Mengecek Tipe Data String

Kita dapat menggunakan `type()` untuk memastikan bahwa sebuah nilai merupakan string.

Contohnya:

```python
username = "super_coder"

print(type(username))
```

Hasil:

```text
<class 'str'>
```

Contoh lainnya:

```python
password = "super_secret_password"

print(type(password))
```

Hasil:

```text
<class 'str'>
```

---

## 12. Angka sebagai String

Perlu diperhatikan bahwa angka yang ditulis di dalam tanda kutip merupakan string.

Contohnya:

```python
angka = "100"
```

Variable `angka` memiliki tipe:

```text
str
```

bukan:

```text
int
```

Kita dapat membuktikannya:

```python
angka = "100"

print(type(angka))
```

Hasil:

```text
<class 'str'>
```

Bandingkan dengan:

```python
angka = 100

print(type(angka))
```

Hasil:

```text
<class 'int'>
```

Jadi:

```text
100   → int
"100" → str
```

Hal ini penting karena tipe data menentukan bagaimana Python memperlakukan sebuah nilai.

---

## 13. Contoh Penggunaan String

String digunakan hampir di semua jenis aplikasi.

Contohnya:

```python
username = "super_coder"
email = "user@example.com"
password = "super_secret_password"
```

String dapat digunakan untuk menyimpan:

- Nama pengguna.
- Email.
- Password.
- Alamat.
- Pesan.
- Nama produk.
- Deskripsi.
- URL.
- Data teks lainnya.

---

## 14. Contoh Program Sederhana

Berikut contoh penggunaan beberapa konsep string:

```python
username = "super_coder"
first_name = "Andrei"
last_name = "Neagoie"

full_name = first_name + " " + last_name

print(type(username))
print(full_name)
```

Hasil:

```text
<class 'str'>
Andrei Neagoie
```

Contoh multiline string:

```python
long_string = """
  o  o
   ||
  \__/
"""

print(long_string)
```

Triple quote memungkinkan teks tersebut ditulis dalam beberapa baris.

---

## 15. String Bersifat Immutable

String di Python bersifat **immutable**.

Artinya, setelah sebuah string dibuat, isi string tersebut tidak dapat diubah secara langsung.

Contohnya:

```python
nama = "Andrei"
```

Kita tidak dapat mengubah satu karakter di dalam string secara langsung.

Jika ingin mendapatkan string baru, kita perlu membuat nilai string baru.

Konsep **immutable** akan menjadi lebih jelas ketika kita mempelajari operasi dan method pada string.

---

## 16. String dalam Program

String merupakan salah satu tipe data yang paling sering digunakan dalam aplikasi.

Misalnya sebuah aplikasi memiliki data pengguna:

```python
name = "Andrei"
email = "andrei@example.com"
city = "Palu"
```

Semua data tersebut berupa teks sehingga direpresentasikan menggunakan tipe data `str`.

Secara sederhana:

```text
String
  ↓
Teks
  ↓
Informasi yang dibaca manusia
  ↓
Nama, email, alamat, pesan, dan sebagainya
```

---

## 17. Ringkasan Cara Membuat String

| Cara | Contoh | Kegunaan |
| --- | --- | --- |
| Single quote | `'Hello'` | String satu baris |
| Double quote | `"Hello"` | String satu baris |
| Triple single quote | `'''Hello'''` | Multiline string |
| Triple double quote | `"""Hello"""` | Multiline string |

---

## Kesimpulan

**String (`str`)** adalah tipe data yang digunakan untuk menyimpan teks atau sekumpulan karakter.

String dapat dibuat menggunakan:

```python
'Hello Python'
```

atau:

```python
"Hello Python"
```

Untuk teks yang terdiri dari beberapa baris, kita dapat menggunakan triple quote:

```python
"""
Hello
Python
"""
```

String juga dapat digabungkan menggunakan operator `+`:

```python
first_name + " " + last_name
```

Hal penting yang perlu diingat:

- String digunakan untuk menyimpan teks.
- Single quote dan double quote dapat digunakan untuk membuat string.
- Triple quote dapat digunakan untuk multiline string.
- Angka yang berada di dalam tanda kutip merupakan `str`, bukan `int`.
- String bersifat **immutable**.
- String merupakan salah satu tipe data yang paling sering digunakan dalam aplikasi.

Memahami string dengan baik merupakan fondasi penting sebelum mempelajari berbagai operasi dan fitur string yang lebih lanjut.