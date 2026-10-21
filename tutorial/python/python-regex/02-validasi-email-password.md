---
sidebar_position: 2
title: "Validasi Email & Password Checker"
---

## Aplikasi Nyata RegEx: Validasi Email & Latihan Password Checker

Pada materi kali ini, kita akan melihat bagaimana **Regular Expressions (Regex)** diterapkan dalam kasus nyata, seperti validasi format email.

Selain itu, kita akan membahas latihan membuat **Password Checker** untuk memvalidasi kata sandi berdasarkan beberapa kriteria tertentu.

## 1. Studi Kasus: Validasi Email dengan Regex

Saat membuat aplikasi atau platform web, validasi input sangat penting agar data yang masuk ke database memiliki format yang sesuai.

Salah satu contoh validasi yang sering ditemukan adalah **validasi alamat email**.

Dengan Regex, kita dapat membuat pola untuk memeriksa apakah sebuah input memiliki struktur email yang sesuai.

### Contoh Program Validasi Email

Berikut contoh pola Regex sederhana untuk mengecek format email:

```python
import re

# Pola regex umum untuk mengecek format email
email_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')

email_input = "user@example.com"
match = email_pattern.search(email_input)

if match:
    print("Email valid!")
else:
    print("Format email salah, silakan coba lagi.")
```

Output:

```text
Email valid!
```

Pada contoh tersebut, Regex digunakan untuk memastikan bahwa input memiliki struktur yang sesuai dengan pola email.

## 2. Memahami Pola Regex Email

Pola yang digunakan adalah:

```text
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

Pola tersebut dapat dibagi menjadi beberapa bagian agar lebih mudah dipahami.

### `^` - Awal String

Simbol `^` memastikan bahwa pencocokan dimulai dari awal string.

Contohnya:

```text
^user
```

berarti teks yang dicari harus dimulai dengan `user`.

Dengan demikian, karakter tambahan yang muncul sebelum bagian tersebut tidak akan dianggap sebagai pencocokan yang valid.

### `[a-zA-Z0-9._%+-]+` - Username

Bagian ini digunakan untuk mencocokkan bagian email sebelum simbol `@`.

Contoh:

```text
user
john.doe
john_doe
user123
```

Karakter yang diperbolehkan dalam pola tersebut meliputi:

- `a-z` → huruf kecil
- `A-Z` → huruf besar
- `0-9` → angka
- `.` → titik
- `_` → underscore
- `%` → persen
- `+` → plus
- `-` → minus

Tanda `+` setelah character class berarti bagian tersebut harus memiliki **minimal satu karakter atau lebih**.

### `@` - Pemisah Username dan Domain

Simbol `@` merupakan bagian wajib dalam struktur email.

Contoh:

```text
user@example.com
    ↑
    @
```

Regex akan memastikan karakter `@` berada setelah bagian username.

### `[a-zA-Z0-9.-]+` - Nama Domain

Bagian ini digunakan untuk mencocokkan nama domain.

Contoh:

```text
gmail
yahoo
example
```

Karakter yang diperbolehkan adalah:

- `a-z` → huruf kecil
- `A-Z` → huruf besar
- `0-9` → angka
- `.` → titik
- `-` → minus

Tanda `+` berarti domain harus memiliki minimal satu karakter.

### `\.` - Literal Dot

Dalam Regex, karakter `.` memiliki arti khusus, yaitu mencocokkan karakter apa saja kecuali newline dalam penggunaan normal.

Jika kita ingin mencocokkan **titik secara literal**, kita menggunakan backslash:

```text
\.
```

Contohnya:

```text
example\.com
```

Dengan demikian, titik tersebut diperlakukan sebagai karakter titik biasa.

### `[a-zA-Z]{2,}` - Ekstensi Domain

Bagian ini digunakan untuk mencocokkan ekstensi domain.

Contoh:

```text
com
org
id
net
```

Bagian:

```text
{2,}
```

berarti panjang karakter minimal adalah **2 karakter atau lebih**.

### `$` - Akhir String

Simbol `$` memastikan bahwa pencocokan berakhir pada posisi tersebut.

Artinya, tidak boleh ada karakter tambahan setelah bagian akhir pola.

Secara sederhana:

```text
^ pattern $
```

berarti seluruh string harus mengikuti pola yang ditentukan dari awal sampai akhir.

## 3. Struktur Regex Email Secara Keseluruhan

Jika pola tersebut dipecah:

```text
^
[a-zA-Z0-9._%+-]+
@
[a-zA-Z0-9.-]+
\.
[a-zA-Z]{2,}
$
```

Maka struktur sederhananya adalah:

```text
Awal
  ↓
Username
  ↓
  @
  ↓
Domain
  ↓
  .
  ↓
Ekstensi
  ↓
Akhir
```

Contoh:

```text
user@example.com
──── ─────── ───
 │      │     │
 │      │     └── Ekstensi
 │      └──────── Domain
 └─────────────── Username
```

---

## 4. Menguji Email yang Valid

Contoh email yang dapat dicocokkan oleh pola tersebut:

```python
emails = [
    "user@example.com",
    "john.doe@gmail.com",
    "user123@yahoo.com",
    "admin@example.org"
]

for email in emails:
    if email_pattern.search(email):
        print(f"{email} → valid")
    else:
        print(f"{email} → tidak valid")
```

Contoh output:

```text
user@example.com → valid
john.doe@gmail.com → valid
user123@yahoo.com → valid
admin@example.org → valid
```

## 5. Menguji Email yang Tidak Sesuai

Kita juga dapat menguji beberapa input yang tidak mengikuti pola email.

Contoh:

```python
emails = [
    "user",
    "user@",
    "@example.com",
    "user@example",
    "user example.com"
]

for email in emails:
    if email_pattern.search(email):
        print(f"{email} → valid")
    else:
        print(f"{email} → tidak valid")
```

Contoh tersebut membantu kita memahami bagaimana Regex bekerja ketika input tidak memenuhi pola yang ditentukan.

## 6. Tips Workflow Menggunakan RegEx 101

Dalam praktik pengembangan, membuat Regex yang kompleks secara langsung di kode dapat menyulitkan proses debugging.

Karena itu, kita dapat menggunakan **RegEx 101** untuk menguji dan memahami pola sebelum memasukkannya ke dalam program.

> [RegEx 101](https://regex101.com)

Workflow yang dapat digunakan:

```text
Tentukan kebutuhan validasi
          ↓
Buat Regex Pattern
          ↓
Uji Pattern di RegEx 101
          ↓
Masukkan contoh input
          ↓
Periksa hasil Match
          ↓
Periksa Explanation
          ↓
Implementasikan di Python
```

RegEx 101 juga dapat membantu memahami setiap komponen pattern sebelum digunakan dalam program.

## 7. Latihan Mandiri: Password Checker

Setelah memahami validasi email, latihan berikutnya adalah membuat **Password Checker**.

Tujuannya adalah membuat program Python yang dapat memvalidasi apakah sebuah kata sandi memenuhi kriteria tertentu.

### Kriteria Password

Password harus memenuhi beberapa ketentuan:

1. Memiliki panjang minimal **8 karakter**.
2. Mengandung kombinasi huruf besar dan/atau huruf kecil.
3. Mengandung angka.
4. Mengandung simbol khusus, misalnya:
   - `@`
   - `#`
   - `$`
   - `%`
   - `*`
5. String harus diakhiri dengan **angka atau simbol**.

## 8. Contoh Password

Beberapa contoh input yang dapat digunakan untuk menguji program:

```text
Python@2026
Belajar#123
Password$99
```

Gunakan berbagai kombinasi password agar dapat mengetahui apakah pola Regex yang dibuat benar-benar bekerja sesuai kriteria.

## 9. Petunjuk Pengerjaan Password Checker

### Langkah 1 - Tentukan Kriteria

Sebelum membuat Regex, tuliskan terlebih dahulu aturan yang harus dipenuhi.

Contohnya:

```text
Minimal 8 karakter
       +
Mengandung huruf
       +
Mengandung angka
       +
Mengandung simbol
       +
Diakhiri angka atau simbol
```

Dengan cara tersebut, kita dapat mengubah setiap persyaratan menjadi bagian dari pattern Regex.

### Langkah 2 - Rancang Regex di RegEx 101

Sebelum menulis kode Python, buat dan uji terlebih dahulu pattern Regex menggunakan RegEx 101.

Tujuannya adalah memastikan pattern bekerja sesuai dengan kriteria yang telah ditentukan.

Pilih environment **Python** ketika melakukan pengujian.

### Langkah 3 - Gunakan Raw String

Ketika pattern sudah selesai, gunakan **raw string** ketika memasukkannya ke Python.

Contoh:

```python
import re

pattern = re.compile(r"...")
```

Penggunaan raw string membuat pattern Regex lebih mudah dibaca dan mengurangi kebingungan dengan karakter backslash.

### Langkah 4 - Gunakan `search()` atau `fullmatch()`

Untuk memeriksa apakah password memenuhi kriteria, kita dapat menggunakan:

```python
re.search()
```

atau:

```python
pattern.fullmatch()
```

Contoh struktur program:

```python
import re

pattern = re.compile(r"...")

password = input("Masukkan password: ")

if pattern.fullmatch(password):
    print("Password valid!")
else:
    print("Password tidak memenuhi kriteria.")
```

Pattern `...` pada contoh tersebut harus diganti dengan Regex yang Anda buat sendiri berdasarkan kriteria latihan.

## 10. Tantangan Latihan

Cobalah membuat Password Checker tanpa langsung melihat solusi Regex.

Gunakan pendekatan berikut:

```text
Kriteria
   ↓
Pecah menjadi beberapa pola
   ↓
Gabungkan pola
   ↓
Uji di RegEx 101
   ↓
Uji dengan password valid
   ↓
Uji dengan password tidak valid
   ↓
Implementasikan di Python
```

Uji program menggunakan berbagai kondisi, misalnya:

```text
Password terlalu pendek
Password tanpa angka
Password tanpa simbol
Password tanpa huruf
Password dengan format benar
Password yang tidak diakhiri angka atau simbol
```

Tujuannya bukan hanya membuat satu Regex yang bekerja, tetapi memahami bagaimana setiap bagian pattern digunakan untuk memenuhi sebuah persyaratan.

## 11. Konsep yang Perlu Dikuasai

Setelah menyelesaikan latihan ini, pastikan Anda memahami konsep berikut:

| Konsep | Fungsi |
|---|---|
| `^` | Menandai awal string |
| `$` | Menandai akhir string |
| `[]` | Membuat character class |
| `+` | Satu atau lebih karakter |
| `{2,}` | Minimal 2 karakter |
| `\.` | Mencocokkan titik secara literal |
| `re.compile()` | Membuat pattern Regex |
| `search()` | Mencari kecocokan dalam string |
| `fullmatch()` | Memastikan seluruh string sesuai pattern |
| `r"..."` | Membuat raw string |

## 12. Kesimpulan

Regex dapat digunakan untuk menyelesaikan berbagai kebutuhan validasi input dalam aplikasi.

Pada materi ini, kita menerapkan Regex untuk:

- Memvalidasi format email.
- Memahami struktur username, domain, dan ekstensi email.
- Menggunakan `^` dan `$` untuk membatasi pencocokan dari awal hingga akhir string.
- Menggunakan character class untuk menentukan karakter yang diperbolehkan.
- Menggunakan `\.` untuk mencocokkan titik secara literal.
- Menguji Regex menggunakan RegEx 101.
- Merancang latihan Password Checker dengan beberapa kriteria validasi.

Latihan Password Checker sangat baik untuk memperdalam pemahaman karena kita harus mengubah kebutuhan dalam bahasa manusia menjadi aturan Regex yang dapat dipahami oleh program.
