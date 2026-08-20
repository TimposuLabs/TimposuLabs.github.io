---
sidebar_position: 2
title: "Indentation"
---

**Indentation** atau indentasi adalah spasi yang berada di awal baris kode. Dalam Python, indentasi digunakan untuk menentukan **struktur dan hierarki blok kode**.

Berbeda dengan beberapa bahasa pemrograman yang menggunakan tanda kurung kurawal `{}` untuk menentukan blok kode, Python menggunakan indentasi.

Contohnya:

```python
if age >= 18:
    print('Sudah dewasa')
```

Indentasi pada `print()` menunjukkan bahwa kode tersebut merupakan bagian dari blok `if`.

---

## Mengapa Indentasi Penting?

Indentasi memiliki beberapa fungsi penting dalam Python.

### 1. Menentukan Struktur Kode

Indentasi menentukan statement mana yang termasuk ke dalam sebuah blok.

```python
is_old = True

if is_old:
    print('Sudah cukup umur')
    print('Silakan melanjutkan')
```

Kedua `print()` berada di dalam blok `if` karena memiliki indentasi yang sama.

### 2. Meningkatkan Keterbacaan

Indentasi membuat struktur program lebih mudah dilihat.

```python
if is_old:
    print('Sudah cukup umur')
    if has_license:
        print('Boleh mengemudi')
```

Dari struktur tersebut dapat terlihat bahwa `if has_license` berada di dalam `if is_old`.

### 3. Merupakan Bagian dari Sintaks Python

Indentasi bukan hanya aturan gaya penulisan. Python menggunakannya sebagai bagian dari sintaks.

Kesalahan indentasi dapat menyebabkan error seperti:

```text
IndentationError
```

---

## Aturan Standar Indentasi

Python mengikuti konvensi **PEP 8** yang merekomendasikan penggunaan **4 spasi** untuk setiap tingkat indentasi.

```python
is_old = True
is_license = True

if is_old and is_license:
    print('Boleh mengemudi!')
    print('Pastikan selalu memakai sabuk pengaman.')

print('Kode ini berada di luar conditional.')
```

Pada contoh tersebut:

- `if` tidak memiliki indentasi karena merupakan statement utama.
- Dua `print()` pertama memiliki indentasi 4 spasi sehingga menjadi bagian dari `if`.
- `print()` terakhir kembali ke posisi awal sehingga berada di luar blok `if`.

---

## Indentasi Setelah Colon (`:`)

Statement yang membuka sebuah blok biasanya diakhiri dengan tanda titik dua (`:`).

Contohnya:

```python
if age >= 18:
    print('Sudah dewasa')
```

Tanda `:` menunjukkan bahwa setelah statement tersebut akan terdapat sebuah blok kode.

Konsep yang sama berlaku pada berbagai struktur Python seperti:

```python
if condition:
    # blok kode
```

```python
for item in items:
    # blok kode
```

```python
while condition:
    # blok kode
```

```python
def calculate():
    # blok kode
```

---

## Nested Indentation

Indentasi juga digunakan ketika sebuah blok kode berada di dalam blok kode lainnya.

Konsep ini disebut **nested indentation**.

```python
is_old = True
has_car = True

if is_old:
    print('Cukup umur')

    if has_car:
        print('Bisa mengemudi mobil sendiri!')
```

Pada contoh tersebut terdapat dua tingkat blok:

```text
if is_old
└── print()
└── if has_car
    └── print()
```

`if has_car` memiliki indentasi lebih dalam karena berada di dalam blok `if is_old`.

---

## Indentasi Menentukan Ruang Lingkup Blok

Perhatikan contoh berikut:

```python
age = 20

if age >= 18:
    print('Sudah dewasa')
    print('Boleh membuat SIM')

print('Program selesai')
```

Output:

```text
Sudah dewasa
Boleh membuat SIM
Program selesai
```

`print('Program selesai')` tidak termasuk dalam blok `if` karena tidak memiliki indentasi.

Artinya, statement tersebut tetap dijalankan meskipun kondisi `if` bernilai `False`.

---

## Kesalahan Indentasi

Kesalahan indentasi merupakan salah satu error yang sering ditemui ketika belajar Python.

### Lupa Memberikan Indentasi

Contoh yang salah:

```python
age = 20

if age >= 18:
print('Sudah dewasa')
```

Python akan menghasilkan error karena `print()` seharusnya berada di dalam blok `if`.

Penulisan yang benar:

```python
age = 20

if age >= 18:
    print('Sudah dewasa')
```

---

## Indentasi Tidak Konsisten

Indentasi dalam satu blok harus konsisten.

Contoh yang tidak baik:

```python
if age >= 18:
    print('Sudah dewasa')
        print('Boleh membuat SIM')
```

Statement kedua memiliki tingkat indentasi yang berbeda sehingga Python tidak dapat menentukan struktur blok dengan benar.

Gunakan tingkat indentasi yang konsisten:

```python
if age >= 18:
    print('Sudah dewasa')
    print('Boleh membuat SIM')
```

---

## Tab dan Spasi

Python memungkinkan editor menggunakan **Tab** atau **spasi** untuk melakukan indentasi, tetapi mencampurkan keduanya dapat menyebabkan masalah.

Contoh masalah yang dapat muncul:

```text
TabError: inconsistent use of tabs and spaces in indentation
```

Untuk menghindari masalah tersebut, gunakan **4 spasi** sebagai standar indentasi.

Sebagian besar code editor modern juga dapat dikonfigurasi untuk memasukkan 4 spasi ketika tombol `Tab` ditekan.

---

## Indentasi pada Conditional

Indentasi sangat penting ketika menggunakan `if`, `elif`, dan `else`.

```python
age = 20

if age >= 18:
    print('Dewasa')
elif age >= 13:
    print('Remaja')
else:
    print('Anak-anak')
```

Setiap blok memiliki tingkat indentasi yang sama karena masing-masing merupakan bagian dari struktur conditional yang sama.

---

## Indentasi pada Loop

Indentasi juga digunakan pada `for` dan `while`.

```python
for number in range(3):
    print(number)
```

`print(number)` merupakan bagian dari loop karena memiliki indentasi.

Jika terdapat statement setelah loop yang tidak ingin menjadi bagian dari loop, statement tersebut ditulis tanpa indentasi:

```python
for number in range(3):
    print(number)

print('Loop selesai')
```

---

## Indentasi pada Function

Function juga menggunakan indentasi untuk menentukan statement yang menjadi bagian dari function.

```python
def greet():
    print('Hello')
    print('Welcome to Python')

greet()
```

Kedua `print()` merupakan bagian dari function karena memiliki indentasi.

---

## Praktik Terbaik

Beberapa kebiasaan yang sebaiknya diterapkan ketika menulis kode Python:

1. Gunakan **4 spasi** untuk setiap tingkat indentasi.
2. Jangan mencampurkan Tab dan spasi.
3. Gunakan indentasi secara konsisten.
4. Gunakan code editor yang memiliki dukungan Python.
5. Perhatikan struktur blok ketika menggunakan `if`, `for`, `while`, function, dan struktur lainnya.
6. Jangan menambahkan indentasi secara sembarangan hanya untuk membuat kode terlihat rapi.

---

## Ringkasan

Indentasi merupakan bagian penting dari sintaks Python.

Hal-hal yang perlu diingat:

- Python menggunakan indentasi untuk menentukan **blok kode**.
- Standar umum Python adalah **4 spasi** setiap tingkat indentasi.
- Indentasi biasanya dimulai setelah tanda `:`.
- Nested block membutuhkan tingkat indentasi tambahan.
- Indentasi yang salah dapat menyebabkan `IndentationError` atau `TabError`.
- Hindari mencampurkan Tab dan spasi.
- Indentasi yang konsisten membuat struktur dan alur program lebih mudah dipahami.

Memahami indentasi dengan baik akan sangat membantu ketika mulai mempelajari **conditional, looping, function, class**, dan berbagai struktur Python lainnya.