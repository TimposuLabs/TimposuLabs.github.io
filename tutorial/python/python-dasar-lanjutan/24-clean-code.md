---
sidebar_position: 24
title: "Clean Code"
---

**Clean Code** adalah pendekatan dalam menulis kode yang tidak hanya menghasilkan program yang berjalan dengan benar, tetapi juga membuat kode tersebut **mudah dibaca, dipahami, diuji, dan dipelihara**.

Program yang baik bukan hanya program yang menghasilkan output yang benar. Ketika program berkembang, kode juga harus tetap mudah dipahami oleh developer lain maupun oleh kita sendiri ketika kembali mengerjakannya di masa depan.

---

## Mengapa Clean Code Penting?

Kode yang terlalu rumit dapat membuat proses pengembangan menjadi lebih sulit.

Clean Code membantu:

- meningkatkan keterbacaan kode;
- mengurangi kode yang tidak diperlukan;
- menghindari logika yang berulang;
- mempermudah proses debugging;
- mempermudah maintenance;
- mengurangi kemungkinan kesalahan;
- membuat kode lebih mudah dikembangkan.

Contohnya, dua program dapat menghasilkan output yang sama, tetapi salah satunya mungkin memiliki struktur yang jauh lebih sederhana dan mudah dipahami.

---

## Clean Code Bukan Berarti Kode Paling Pendek

Kode yang pendek belum tentu merupakan kode yang baik.

Tujuan Clean Code bukan sekadar mengurangi jumlah baris kode, tetapi membuat kode menjadi **sederhana, jelas, dan memiliki tujuan yang mudah dipahami**.

Contoh:

```python
def is_even(num):
    return num % 2 == 0
```

Kode tersebut singkat sekaligus jelas karena nama function dan ekspresinya sudah menjelaskan tujuan program.

Sebaliknya, kode yang dibuat sangat singkat tetapi sulit dipahami bukanlah contoh Clean Code.

---

## Refactoring

**Refactoring** adalah proses memperbaiki atau menyederhanakan struktur kode tanpa mengubah hasil atau perilaku utama program.

Refactoring sering dilakukan ketika kita menemukan kode yang:

- terlalu panjang;
- memiliki logika berulang;
- sulit dibaca;
- memiliki kondisi yang tidak diperlukan;
- dapat ditulis dengan cara yang lebih sederhana.

Sebagai contoh, kita akan memperbaiki function untuk menentukan apakah sebuah angka merupakan bilangan genap.

---

## Kode Awal

Perhatikan function berikut:

```python
def is_even(num):
    if num % 2 == 0:
        return True
    elif num % 2 != 0:
        return False
```

Function tersebut memang dapat menghasilkan hasil yang benar, tetapi terdapat logika yang tidak diperlukan.

Perhatikan kedua kondisi:

```text
num % 2 == 0
num % 2 != 0
```

Keduanya merupakan kondisi yang saling berlawanan.

Jika kondisi pertama `False`, maka secara otomatis kondisi kedua pasti `True`.

Karena itu, kita tidak perlu melakukan pemeriksaan kedua.

---

## Refactoring Tahap 1: Menggunakan `else`

Kode dapat disederhanakan menjadi:

```python
def is_even(num):
    if num % 2 == 0:
        return True
    else:
        return False
```

Sekarang tidak ada lagi pemeriksaan kedua menggunakan `elif`.

Jika angka genap:

```text
num % 2 == 0
```

hasilnya `True`.

Jika kondisi tersebut tidak terpenuhi, program masuk ke `else` dan mengembalikan `False`.

---

## Refactoring Tahap 2: Menghilangkan `else`

Kita sebenarnya tidak membutuhkan `else`.

Hal tersebut karena `return` akan langsung menghentikan eksekusi function.

Kode dapat ditulis menjadi:

```python
def is_even(num):
    if num % 2 == 0:
        return True

    return False
```

Alurnya menjadi:

```text
Jika angka genap
    ↓
return True
    ↓
function berhenti

Jika bukan angka genap
    ↓
return False
```

Tidak diperlukan `else` karena ketika `return True` dijalankan, function langsung selesai.

---

## Refactoring Tahap 3: Mengembalikan Ekspresi Boolean

Kita masih dapat menyederhanakan function tersebut.

Perhatikan ekspresi berikut:

```python
num % 2 == 0
```

Ekspresi tersebut sendiri sudah menghasilkan nilai Boolean.

Contoh:

```python
print(10 % 2 == 0)
```

Output:

```text
True
```

Sedangkan:

```python
print(7 % 2 == 0)
```

Output:

```text
False
```

Karena ekspresi tersebut sudah menghasilkan `True` atau `False`, kita dapat langsung mengembalikannya menggunakan `return`.

Hasil akhirnya:

```python
def is_even(num):
    return num % 2 == 0
```

Inilah bentuk yang lebih sederhana dan mudah dibaca.

---

## Perbandingan Sebelum dan Sesudah Refactoring

### Sebelum

```python
def is_even(num):
    if num % 2 == 0:
        return True
    elif num % 2 != 0:
        return False
```

### Sesudah

```python
def is_even(num):
    return num % 2 == 0
```

Kedua function memiliki tujuan yang sama, tetapi versi kedua lebih sederhana karena langsung mengembalikan hasil evaluasi Boolean.

---

## Mengapa Bentuk Terakhir Lebih Baik?

Bentuk berikut:

```python
return num % 2 == 0
```

dapat dibaca secara langsung sebagai:

> Kembalikan hasil apakah `num` habis dibagi 2.

Tidak diperlukan lagi:

- `if`;
- `elif`;
- `else`;
- `return True`;
- `return False`.

Kode menjadi lebih sederhana tanpa kehilangan makna.

---

## Prinsip: Jangan Gunakan `if-else` Jika Tidak Diperlukan

Salah satu pola yang sering ditemukan adalah:

```python
if condition:
    return True
else:
    return False
```

Jika `condition` sudah menghasilkan Boolean, pola tersebut biasanya dapat disederhanakan menjadi:

```python
return condition
```

Contoh:

```python
def is_adult(age):
    if age >= 18:
        return True
    else:
        return False
```

Dapat disederhanakan menjadi:

```python
def is_adult(age):
    return age >= 18
```

Contoh lainnya:

```python
def is_positive(number):
    return number > 0
```

Function tersebut langsung mengembalikan hasil evaluasi `number > 0`.

---

## Memanfaatkan Sifat `return`

`return` memiliki sifat penting: **langsung menghentikan eksekusi function**.

Contoh:

```python
def check_number(number):
    if number > 0:
        return 'Positif'

    return 'Bukan positif'
```

Jika `number` lebih besar dari `0`, function langsung mengembalikan:

```text
Positif
```

dan berhenti.

Karena itu, dalam beberapa kondisi kita tidak perlu menambahkan `else`.

---

## Hindari Kondisi yang Tidak Diperlukan

Contoh yang kurang efisien:

```python
def is_valid(age):
    if age >= 18:
        return True
    elif age < 18:
        return False
```

Kondisi kedua tidak perlu diperiksa.

Versi yang lebih sederhana:

```python
def is_valid(age):
    return age >= 18
```

---

## Clean Code dan Readability

Clean Code tidak selalu berarti menghilangkan semua baris kode.

Jika kode menjadi terlalu singkat dan sulit dipahami, penyederhanaan tersebut justru dapat mengurangi readability.

Contoh:

```python
def check(x):
    return x > 10 and x < 100 or x == 5
```

Kode tersebut memang singkat, tetapi bisa lebih sulit dipahami dibandingkan versi yang menggunakan nama function dan struktur yang lebih jelas.

Karena itu, prinsip utama Clean Code adalah:

> **Buat kode sesederhana mungkin tanpa mengorbankan keterbacaan.**

---

## Contoh Refactoring Function

Perhatikan function berikut:

```python
def can_drive(age):
    if age >= 17:
        return True
    else:
        return False
```

Function dapat disederhanakan menjadi:

```python
def can_drive(age):
    return age >= 17
```

Contoh penggunaan:

```python
print(can_drive(20))
print(can_drive(15))
```

Output:

```text
True
False
```

---

## Prinsip Utama Clean Code pada Function

Beberapa prinsip yang dapat diterapkan:

### 1. Hindari Logika yang Berulang

Jangan melakukan pemeriksaan yang sebenarnya sudah dapat diketahui dari kondisi sebelumnya.

Kurang baik:

```python
if number > 0:
    return True
elif number <= 0:
    return False
```

Lebih sederhana:

```python
return number > 0
```

### 2. Manfaatkan `return`

Jika `return` sudah menghentikan function, `else` tidak selalu diperlukan.

Kurang sederhana:

```python
if condition:
    return result_a
else:
    return result_b
```

Dapat ditulis:

```python
if condition:
    return result_a

return result_b
```

### 3. Gunakan Nama yang Deskriptif

Nama function sebaiknya menjelaskan tujuan function.

Contoh:

```python
def is_even(number):
    return number % 2 == 0
```

Lebih mudah dipahami dibandingkan:

```python
def check(number):
    return number % 2 == 0
```

Nama `is_even()` langsung memberikan informasi mengenai tujuan function.

### 4. Hindari Kompleksitas yang Tidak Diperlukan

Jika sebuah masalah dapat diselesaikan dengan ekspresi sederhana, tidak perlu menambahkan struktur kode yang terlalu kompleks.

---

## Kesimpulan

Clean Code adalah pendekatan untuk membuat kode yang **jelas, sederhana, mudah dibaca, dan mudah dipelihara**.

Dalam contoh `is_even()`, kita melakukan refactoring secara bertahap:

```python
def is_even(num):
    if num % 2 == 0:
        return True
    elif num % 2 != 0:
        return False
```

Menjadi:

```python
def is_even(num):
    if num % 2 == 0:
        return True
    return False
```

Dan akhirnya:

```python
def is_even(num):
    return num % 2 == 0
```

Dari contoh tersebut dapat dipelajari bahwa kode yang baik bukan sekadar kode yang berjalan, tetapi juga kode yang **memiliki struktur jelas, tidak berlebihan, dan mudah dipahami oleh developer lain**.