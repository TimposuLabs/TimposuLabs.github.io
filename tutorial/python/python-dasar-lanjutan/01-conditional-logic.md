---
sidebar_position: 1
title: "Conditional Logic"
---

**Conditional Logic** atau logika kondisional adalah konsep dalam pemrograman yang digunakan untuk membuat program mengambil keputusan berdasarkan kondisi tertentu.

Program dapat menjalankan instruksi yang berbeda tergantung apakah suatu kondisi bernilai `True` atau `False`.

Contohnya, sebuah program dapat menentukan apakah seseorang boleh mengemudi berdasarkan usia dan kepemilikan SIM.

---

## Komponen Utama Conditional

Python menyediakan tiga keyword utama untuk membuat percabangan:

### `if`

`if` digunakan untuk memeriksa kondisi pertama.

Jika kondisi bernilai `True`, kode di dalam blok `if` akan dijalankan.

```python
age = 20

if age >= 18:
    print('Sudah dewasa')
```

Jika `age` bernilai `20`, kondisi `age >= 18` menghasilkan `True`, sehingga program menjalankan `print()`.

### `elif`

`elif` merupakan singkatan dari **else if**.

Keyword ini digunakan untuk memeriksa kondisi berikutnya apabila kondisi sebelumnya bernilai `False`.

```python
age = 15

if age >= 18:
    print('Sudah dewasa')
elif age >= 13:
    print('Remaja')
```

Python akan memeriksa kondisi dari atas ke bawah. Jika kondisi `if` tidak terpenuhi, Python akan memeriksa kondisi `elif`.

### `else`

`else` digunakan sebagai kondisi terakhir ketika seluruh kondisi sebelumnya tidak terpenuhi.

```python
age = 10

if age >= 18:
    print('Sudah dewasa')
elif age >= 13:
    print('Remaja')
else:
    print('Anak-anak')
```

Pada contoh tersebut, karena `age` tidak memenuhi kondisi `if` maupun `elif`, maka blok `else` dijalankan.

---

## Contoh Conditional Lengkap

Berikut contoh penggunaan `if`, `elif`, dan `else` secara bersamaan:

```python
is_old = True
is_licence = True

if is_old and is_licence:
    print('Boleh mengemudi!')
elif is_old:
    print('Belum punya SIM!')
else:
    print('Belum cukup umur!')
```

Alur pemeriksaannya adalah:

1. Python memeriksa kondisi `if`.
2. Jika kondisi `if` bernilai `True`, blok tersebut dijalankan.
3. Jika kondisi `if` bernilai `False`, Python memeriksa `elif`.
4. Jika semua kondisi sebelumnya `False`, Python menjalankan `else`.

Perlu diperhatikan bahwa Python hanya menjalankan **satu cabang** dari rangkaian `if`, `elif`, dan `else`.

---

## Operator Logika

Conditional sering membutuhkan lebih dari satu kondisi. Python menyediakan beberapa operator logika untuk menggabungkan kondisi.

### Operator `and`

Operator `and` menghasilkan `True` apabila **semua kondisi** bernilai `True`.

```python
is_old = True
is_licence = True

if is_old and is_licence:
    print('Boleh mengemudi!')
```

Pada contoh tersebut, kedua kondisi harus terpenuhi.

Jika salah satu kondisi bernilai `False`, hasil keseluruhan menjadi `False`.

```python
is_old = True
is_licence = False

if is_old and is_licence:
    print('Boleh mengemudi!')
```

Kode di dalam `if` tidak dijalankan karena `is_licence` bernilai `False`.

### Operator `or`

Operator `or` menghasilkan `True` apabila **setidaknya salah satu kondisi** bernilai `True`.

```python
is_weekend = True
is_holiday = False

if is_weekend or is_holiday:
    print('Libur')
```

Pada contoh tersebut, kondisi tetap terpenuhi karena `is_weekend` bernilai `True`.

### Operator `not`

Operator `not` digunakan untuk membalik nilai Boolean.

```python
is_raining = False

if not is_raining:
    print('Tidak sedang hujan')
```

`not False` menghasilkan `True`, sehingga kode di dalam `if` dijalankan.

---

## Conditional dengan Perbandingan Nilai

Conditional juga sering digunakan bersama operator perbandingan.

```python
age = 20

if age >= 18:
    print('Anda sudah dewasa')
```

Beberapa operator perbandingan yang umum digunakan:

| Operator | Arti |
| --- | --- |
| `==` | Sama dengan |
| `!=` | Tidak sama dengan |
| `>` | Lebih besar |
| `<` | Lebih kecil |
| `>=` | Lebih besar atau sama dengan |
| `<=` | Lebih kecil atau sama dengan |

Contoh:

```python
score = 80

if score >= 75:
    print('Lulus')
else:
    print('Tidak lulus')
```

---

## Indentasi pada Conditional

Salah satu karakteristik penting Python adalah penggunaan **indentasi** untuk menentukan blok kode.

```python
age = 20

if age >= 18:
    print('Sudah dewasa')
```

Baris `print()` memiliki indentasi sehingga Python mengetahui bahwa baris tersebut merupakan bagian dari blok `if`.

Indentasi biasanya menggunakan **4 spasi**.

Contoh yang salah:

```python
age = 20

if age >= 18:
print('Sudah dewasa')
```

Kode tersebut akan menghasilkan error karena `print()` seharusnya berada di dalam blok `if`.

Contoh yang benar:

```python
age = 20

if age >= 18:
    print('Sudah dewasa')
```

---

## Nested Conditional

Conditional juga dapat ditempatkan di dalam conditional lainnya. Konsep ini disebut **nested conditional**.

```python
age = 20
has_license = True

if age >= 18:
    if has_license:
        print('Boleh mengemudi')
    else:
        print('Belum memiliki SIM')
else:
    print('Belum cukup umur')
```

Namun, nested conditional yang terlalu dalam dapat membuat kode sulit dibaca. Dalam banyak kasus, beberapa kondisi dapat digabungkan menggunakan operator logika seperti `and` dan `or`.

Contohnya:

```python
if age >= 18 and has_license:
    print('Boleh mengemudi')
```

---

## Conditional Expression

Python juga menyediakan bentuk singkat untuk conditional sederhana yang disebut **conditional expression**.

```python
age = 20

status = 'Dewasa' if age >= 18 else 'Belum dewasa'

print(status)
```

Bentuk tersebut setara dengan:

```python
if age >= 18:
    status = 'Dewasa'
else:
    status = 'Belum dewasa'
```

Conditional expression sebaiknya digunakan untuk kondisi yang sederhana agar kode tetap mudah dibaca.

---

## Kesalahan Umum

### Lupa menggunakan `:`

Setiap blok `if`, `elif`, dan `else` harus diakhiri dengan titik dua (`:`).

```python
if age >= 18:
    print('Dewasa')
```

### Menggunakan `=` untuk perbandingan

Operator `=` digunakan untuk assignment, sedangkan `==` digunakan untuk membandingkan dua nilai.

```python
age = 18

if age == 18:
    print('Tepat 18 tahun')
```

### Salah indentasi

```python
if age >= 18:
print('Dewasa')
```

Gunakan indentasi:

```python
if age >= 18:
    print('Dewasa')
```

---

## Ringkasan

Conditional memungkinkan program mengambil keputusan berdasarkan kondisi.

Konsep utama yang perlu dipahami:

- `if` untuk kondisi utama.
- `elif` untuk kondisi alternatif.
- `else` untuk kondisi terakhir.
- `and` untuk memastikan beberapa kondisi terpenuhi.
- `or` ketika salah satu kondisi sudah cukup.
- `not` untuk membalik nilai Boolean.
- Operator perbandingan untuk membentuk kondisi.
- Indentasi untuk menentukan blok kode.
- Nested conditional untuk kondisi yang berada di dalam kondisi lainnya.
- Conditional expression untuk conditional sederhana dalam satu baris.

Conditional merupakan salah satu fondasi penting sebelum mempelajari **looping**, karena kedua konsep tersebut akan banyak digunakan bersama dalam membangun alur program Python.
