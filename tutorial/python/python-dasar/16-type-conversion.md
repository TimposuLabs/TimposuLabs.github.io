---
sidebar_position: 16
title: "Type Conversion"
---

**Type Conversion** atau **Type Casting** adalah proses mengubah sebuah nilai dari satu tipe data ke tipe data lainnya.

Dalam Python, kita sering bekerja dengan berbagai tipe data seperti:

```text
int
float
str
bool
```

Terkadang sebuah nilai perlu diubah ke tipe data lain agar dapat digunakan sesuai kebutuhan program.

Contohnya, angka:

```python
100
```

dapat diubah menjadi string:

```python
"100"
```

Walaupun keduanya memiliki nilai yang terlihat sama, tipe datanya berbeda.

---

## 1. Mengapa Type Conversion Dibutuhkan?

Type conversion diperlukan ketika suatu data memiliki tipe yang berbeda dengan kebutuhan operasi yang akan dilakukan.

Misalnya kita memiliki:

```python
age = "25"
```

Nilai tersebut terlihat seperti angka, tetapi sebenarnya merupakan string.

```text
"25" → str
```

Jika kita membutuhkan nilai tersebut sebagai angka, kita dapat mengubahnya menjadi integer:

```python
age = int(age)
```

Sekarang:

```text
25 → int
```

Konversi seperti ini sangat umum dilakukan ketika program menerima data dari pengguna atau sumber data lainnya.

---

## 2. Fungsi Konversi Built-in

Python menyediakan beberapa built-in functions untuk melakukan type conversion.

| Fungsi | Hasil | Contoh |
| --- | --- | --- |
| `str()` | `str` | `str(100)` → `"100"` |
| `int()` | `int` | `int("100")` → `100` |
| `float()` | `float` | `float(100)` → `100.0` |

Fungsi tersebut dapat digunakan secara langsung tanpa perlu melakukan import module.

---

## 3. Menggunakan `str()`

Fungsi `str()` digunakan untuk mengubah sebuah nilai menjadi string.

Contohnya:

```python
angka = 100

teks = str(angka)

print(teks)
print(type(teks))
```

Hasil:

```text
100
<class 'str'>
```

Sebelum konversi:

```text
100 → int
```

Setelah konversi:

```text
"100" → str
```

---

## 4. Mengubah Float Menjadi String

`str()` juga dapat digunakan untuk mengubah float menjadi string.

Contohnya:

```python
nilai = 3.14

teks = str(nilai)

print(teks)
print(type(teks))
```

Hasil:

```text
3.14
<class 'str'>
```

---

## 5. Menggunakan `int()`

Fungsi `int()` dapat digunakan untuk mengubah nilai tertentu menjadi integer.

Contoh paling umum adalah mengubah string yang berisi angka menjadi integer.

```python
angka = "100"

hasil = int(angka)

print(hasil)
print(type(hasil))
```

Hasil:

```text
100
<class 'int'>
```

Sebelum konversi:

```text
"100" → str
```

Setelah konversi:

```text
100 → int
```

---

## 6. Menggunakan `float()`

Fungsi `float()` digunakan untuk mengubah nilai menjadi floating-point number.

Contohnya:

```python
angka = "10.5"

hasil = float(angka)

print(hasil)
print(type(hasil))
```

Hasil:

```text
10.5
<class 'float'>
```

Contoh lainnya:

```python
angka = 100

hasil = float(angka)

print(hasil)
```

Hasil:

```text
100.0
```

---

## 7. Konversi Antar Tipe Data

Type conversion dapat dilakukan dari satu tipe data ke tipe data lainnya selama nilai tersebut dapat dikonversi.

Contoh:

```text
int
 ↓
str
```

```python
str(100)
```

Hasil:

```text
"100"
```

Contoh:

```text
str
 ↓
int
```

```python
int("100")
```

Hasil:

```text
100
```

Contoh:

```text
int
 ↓
float
```

```python
float(100)
```

Hasil:

```text
100.0
```

---

## 8. Type Conversion pada String

Tidak semua string dapat dikonversi menjadi angka.

Contohnya:

```python
angka = "100"

hasil = int(angka)
```

Kode tersebut valid karena `"100"` berisi representasi angka.

Namun:

```python
angka = "Hello"

hasil = int(angka)
```

akan menghasilkan error karena `"Hello"` bukan representasi integer yang valid.

Python akan menghasilkan error seperti:

```text
ValueError
```

Hal ini menunjukkan bahwa type conversion tidak selalu berhasil.

Nilai yang akan dikonversi harus sesuai dengan tipe data tujuan.

---

## 9. Nested Function

Python memungkinkan kita menggunakan sebuah fungsi sebagai argument untuk fungsi lainnya.

Contohnya:

```python
print(type(int(str(100))))
```

Kode tersebut terlihat cukup panjang, tetapi dapat dipahami dengan mengevaluasinya dari **bagian paling dalam ke bagian paling luar**.

Prosesnya:

```text
100
 ↓
str(100)
 ↓
"100"
 ↓
int("100")
 ↓
100
 ↓
type(100)
 ↓
<class 'int'>
```

Hasil:

```text
<class 'int'>
```

---

## 10. Memecah Nested Function

Kode berikut:

```python
print(type(int(str(100))))
```

dapat ditulis dalam beberapa langkah agar lebih mudah dipahami.

### Langkah 1

```python
a = str(100)
```

Hasil:

```text
a → "100"
```

### Langkah 2

```python
b = int(a)
```

Hasil:

```text
b → 100
```

### Langkah 3

```python
c = type(b)
```

Hasil:

```text
c → <class 'int'>
```

### Langkah 4

```python
print(c)
```

Hasil:

```text
<class 'int'>
```

Kedua cara tersebut memiliki tujuan yang sama.

---

## 11. Konversi dari `int` ke `float`

Kita dapat mengubah integer menjadi float menggunakan `float()`.

Contohnya:

```python
angka = 10

hasil = float(angka)

print(hasil)
print(type(hasil))
```

Hasil:

```text
10.0
<class 'float'>
```

---

## 12. Konversi dari `float` ke `int`

Kita juga dapat mengubah float menjadi integer menggunakan `int()`.

Contohnya:

```python
angka = 10.9

hasil = int(angka)

print(hasil)
```

Hasil:

```text
10
```

Perlu diperhatikan bahwa `int()` tidak melakukan pembulatan ke angka terdekat.

Bagian desimal akan **dihilangkan**.

Contohnya:

```python
print(int(10.9))
print(int(10.1))
```

Hasil:

```text
10
10
```

Karena itu, jangan menganggap `int()` sebagai fungsi pembulatan.

---

## 13. Contoh dalam Program

Type conversion sering digunakan ketika program menerima data dalam bentuk string.

Contohnya:

```python
age = "25"

age = int(age)

print(age)
print(type(age))
```

Setelah dikonversi:

```text
25
<class 'int'>
```

Data yang awalnya berupa teks sekarang dapat diperlakukan sebagai integer.

Konsep seperti ini akan menjadi sangat penting ketika mempelajari **input dari pengguna**.

---

## 14. Type Conversion Tidak Mengubah Nilai Aslinya Secara Otomatis

Fungsi konversi menghasilkan nilai baru dari hasil konversi.

Contohnya:

```python
angka = "100"

int(angka)

print(type(angka))
```

Hasil:

```text
<class 'str'>
```

Variable `angka` masih merupakan string.

Jika ingin menyimpan hasil konversinya ke variable yang sama:

```python
angka = "100"

angka = int(angka)

print(type(angka))
```

Hasil:

```text
<class 'int'>
```

Jadi, hasil konversi perlu disimpan jika kita ingin menggunakan tipe data yang baru.

---

## 15. Gambaran Proses Type Conversion

Secara sederhana:

```text
Nilai
  ↓
Fungsi Konversi
  ↓
Tipe Data Baru
```

Contohnya:

```text
"100"
  ↓
int()
  ↓
100
```

atau:

```text
100
  ↓
str()
  ↓
"100"
```

atau:

```text
100
  ↓
float()
  ↓
100.0
```

---

## 16. Ringkasan Fungsi Konversi

| Fungsi | Dari | Menjadi | Contoh |
| --- | --- | --- | --- |
| `str()` | Nilai tertentu | `str` | `str(100)` → `"100"` |
| `int()` | Nilai numerik/string numerik | `int` | `int("100")` → `100` |
| `float()` | Nilai numerik/string numerik | `float` | `float("100")` → `100.0` |

---

## Kesimpulan

**Type Conversion** adalah proses mengubah sebuah nilai dari satu tipe data ke tipe data lainnya.

Beberapa fungsi konversi yang paling dasar dalam Python adalah:

```python
str()
int()
float()
```

Contohnya:

```python
str(100)
```

menghasilkan:

```text
"100"
```

Sedangkan:

```python
int("100")
```

menghasilkan:

```text
100
```

Dan:

```python
float("100")
```

menghasilkan:

```text
100.0
```

Type conversion sangat penting ketika program perlu menyesuaikan tipe data dengan kebutuhan tertentu.

Hal penting yang perlu diingat:

:::tip
**Type conversion memungkinkan kita mengubah representasi sebuah nilai agar sesuai dengan kebutuhan program.**
:::

Selain itu, ketika menggunakan nested function, Python mengevaluasi fungsi dari **bagian paling dalam kemudian bergerak ke bagian luar**.

Contohnya:

```python
type(int(str(100)))
```

dievaluasi dengan urutan:

```text
str(100)
   ↓
int(...)
   ↓
type(...)
```

Memahami type conversion akan menjadi dasar penting sebelum mempelajari **input, operasi data, dan pengolahan data dalam program Python**.