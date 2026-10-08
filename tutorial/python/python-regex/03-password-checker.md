---
sidebar_position: 3
title: "Validator Kata Sandi (Password Checker)"
---

Pada materi sebelumnya, kita telah membuat latihan untuk membangun validator kata sandi menggunakan Python dan Regular Expressions (RegEx).

Pada materi ini, kita akan membahas solusi lengkap berdasarkan persyaratan yang telah ditentukan, mulai dari formulasi pola RegEx hingga implementasinya dalam Python.

## 1. Spesifikasi Persyaratan Validator

Validator kata sandi harus memeriksa beberapa kriteria berikut:

- **Komposisi Karakter**: Memuat kombinasi huruf (`a-z`, `A-Z`), angka (`0-9`), dan karakter khusus atau simbol (`$`, `%`, `#`, `@`, `!`).
- **Panjang Minimal**: Memiliki panjang setidaknya **8 karakter atau lebih**.
- **Aturan Akhiran**: Harus **diakhiri dengan angka** (`0-9`).

Dengan demikian, sebuah password harus memenuhi aturan karakter yang diizinkan, memiliki panjang minimum, dan karakter terakhirnya harus berupa angka.

## 2. Formulasi Pola RegEx

Pola RegEx yang digunakan dalam latihan ini adalah:

```text
^[a-zA-Z0-9$%#@!]{8,}\d$
```

Pola tersebut terdiri dari beberapa komponen yang saling bekerja sama untuk melakukan validasi.

### `^` - Awal String

Simbol `^` digunakan untuk memastikan bahwa pencocokan dimulai dari awal string.

Dengan demikian, Regex tidak akan mengabaikan karakter yang berada sebelum pola.

### `[a-zA-Z0-9$%#@!]` - Karakter yang Diizinkan

Character class tersebut menentukan karakter yang boleh digunakan dalam password.

Karakter yang diizinkan meliputi:

- `a-z` → huruf kecil
- `A-Z` → huruf besar
- `0-9` → angka
- `$` → simbol dolar
- `%` → simbol persen
- `#` → simbol hash
- `@` → simbol at
- `!` → tanda seru

Dengan menggunakan character class, kita dapat membatasi password agar hanya menggunakan karakter yang telah ditentukan.

### `{8,}` - Minimal 8 Karakter

Quantifier `{8,}` berarti karakter sebelumnya harus muncul sebanyak **minimal 8 kali**.

Artinya, bagian tersebut harus memiliki panjang setidaknya 8 karakter.

### `\d` - Karakter Terakhir Berupa Angka

Bagian `\d` digunakan untuk mencocokkan satu digit atau angka.

Dalam pola ini, `\d` ditempatkan setelah character class sehingga karakter terakhir password harus berupa angka.

Alternatif penulisan yang memiliki makna serupa adalah:

```text
[0-9]
```

### `$` - Akhir String

Simbol `$` memastikan bahwa string berakhir tepat setelah bagian yang dicocokkan.

Dengan demikian, digit yang dicocokkan oleh `\d` harus menjadi karakter terakhir password.

## 3. Memahami Pola Secara Keseluruhan

Pola:

```text
^[a-zA-Z0-9$%#@!]{8,}\d$
```

dapat dibaca secara bertahap:

```text
^
↓
Mulai dari awal string

[a-zA-Z0-9$%#@!]{8,}
↓
Minimal 8 karakter dari karakter yang diizinkan

\d
↓
Karakter terakhir harus berupa angka

$
↓
Akhir string
```

Secara sederhana:

```text
Awal
  ↓
Minimal 8 karakter yang diizinkan
  ↓
Angka
  ↓
Akhir
```

## 4. Implementasi Kode Python

Gunakan modul `re` dan fungsi `re.fullmatch()` untuk melakukan validasi terhadap seluruh isi password.

```python
import re

# Kompilasi pola regex untuk validator kata sandi
password_pattern = re.compile(r'^[a-zA-Z0-9$%#@!]{8,}\d$')


def check_password(password):
    # Menggunakan fullmatch untuk validasi secara menyeluruh
    match = password_pattern.fullmatch(password)

    if match:
        return "Kata sandi valid!"
    else:
        return "Kata sandi tidak memenuhi syarat (minimal 8 karakter, berisi karakter yang diizinkan, dan diakhiri angka)."


# Contoh pengujian
print(check_password("Secret123#5"))
print(check_password("Short1!"))
print(check_password("Secret123#a"))
```

## 5. Hasil Pengujian

Contoh pengujian:

```python
print(check_password("Secret123#5"))
```

Password tersebut memenuhi pola karena:

- Memiliki panjang minimal 8 karakter.
- Menggunakan karakter yang diizinkan.
- Mengandung huruf.
- Mengandung angka.
- Mengandung simbol `#`.
- Diakhiri dengan angka `5`.

Hasil:

```text
Kata sandi valid!
```

Contoh berikut:

```python
print(check_password("Short1!"))
```

Tidak memenuhi persyaratan karena panjang password kurang dari 8 karakter.

Hasil:

```text
Kata sandi tidak memenuhi syarat (minimal 8 karakter, berisi karakter yang diizinkan, dan diakhiri angka).
```

Contoh lainnya:

```python
print(check_password("Secret123#a"))
```

Password tersebut tidak memenuhi aturan karena karakter terakhir adalah huruf `a`, bukan angka.

Hasil:

```text
Kata sandi tidak memenuhi syarat (minimal 8 karakter, berisi karakter yang diizinkan, dan diakhiri angka).
```

## 6. Mengapa Menggunakan `fullmatch()`?

Pada validator, kita ingin memastikan **seluruh password** mengikuti pola yang telah ditentukan.

Karena itu, `fullmatch()` sangat sesuai untuk kebutuhan tersebut.

Contoh:

```python
match = password_pattern.fullmatch(password)
```

Jika seluruh string sesuai dengan pattern, `fullmatch()` menghasilkan Match Object.

Jika ada bagian string yang tidak sesuai, hasilnya adalah `None`.

Secara sederhana:

```text
Password
    ↓
fullmatch()
    ↓
Apakah seluruh string sesuai?
    ↓
Ya → Valid
Tidak → Tidak valid
```

## 7. Perbandingan `search()`, `match()`, dan `fullmatch()`

Modul `re` menyediakan beberapa fungsi untuk melakukan pencocokan pola.

### `search()`

`search()` mencari kecocokan pola di posisi mana saja dalam teks.

Contoh:

```python
import re

hasil = re.search(r"\d+", "Password123")

if hasil:
    print("Angka ditemukan")
```

Fokus utama `search()` adalah **menemukan pola**, bukan memastikan seluruh string sesuai.

### `match()`

`match()` mencari kecocokan yang dimulai dari awal string.

Contoh:

```python
import re

hasil = re.match(r"Password", "Password123")

if hasil:
    print("Cocok dari awal string")
```

Fungsi ini memastikan pencocokan dimulai dari awal, tetapi tidak otomatis memastikan seluruh string telah cocok.

### `fullmatch()`

`fullmatch()` memastikan seluruh string cocok dengan pattern.

Contoh:

```python
import re

pattern = re.compile(r"\d+")

hasil = pattern.fullmatch("12345")

if hasil:
    print("Seluruh string berisi angka")
```

Jika string mengandung karakter lain:

```python
hasil = pattern.fullmatch("12345abc")
```

hasilnya adalah `None` karena seluruh string tidak sesuai dengan pola `\d+`.

## 8. Ringkasan Fungsi Pencocokan

| Fungsi | Perilaku |
|---|---|
| `search()` | Mencari kecocokan di posisi mana saja dalam string |
| `match()` | Mencari kecocokan yang dimulai dari awal string |
| `fullmatch()` | Memastikan seluruh string cocok dengan pattern |

Untuk kasus **validasi password**, `fullmatch()` merupakan pilihan yang tepat karena kita ingin memvalidasi keseluruhan input.

## 9. Catatan Penting tentang Solusi Latihan

Pola pada latihan ini mengikuti spesifikasi yang telah ditentukan, yaitu karakter yang diperbolehkan, panjang minimal, dan aturan bahwa password harus diakhiri angka.

Perlu diperhatikan bahwa pola tersebut berfokus pada **karakter yang diizinkan**, bukan memaksa setiap kategori karakter muncul setidaknya satu kali.

Sebagai contoh, berdasarkan pola tersebut, password yang hanya terdiri dari huruf dan angka tetap dapat memenuhi pattern selama panjangnya cukup dan karakter terakhir berupa angka.

Dengan demikian, terdapat perbedaan antara:

```text
Karakter yang diperbolehkan
```

dan:

```text
Setiap kategori karakter wajib digunakan
```

Jika suatu saat kebutuhan validasi berubah menjadi "wajib memiliki minimal satu huruf, satu angka, dan satu simbol", maka pattern Regex perlu dikembangkan menggunakan teknik seperti **lookahead**.

## 10. Kesimpulan

Pada latihan ini kita telah membuat validator kata sandi menggunakan Python dan RegEx.

Konsep utama yang dipelajari:

- Character class untuk menentukan karakter yang diperbolehkan.
- `{8,}` untuk menentukan panjang minimal 8 karakter.
- `\d` untuk memastikan karakter terakhir berupa angka.
- `^` untuk menandai awal string.
- `$` untuk menandai akhir string.
- `re.compile()` untuk membuat pattern Regex.
- `fullmatch()` untuk memastikan seluruh password sesuai dengan pattern.

Pemahaman terhadap `search()`, `match()`, dan `fullmatch()` sangat penting karena ketiganya memiliki perilaku pencocokan yang berbeda dan dapat digunakan untuk kebutuhan yang berbeda pula.
