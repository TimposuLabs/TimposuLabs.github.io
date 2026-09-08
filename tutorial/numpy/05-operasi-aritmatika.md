---
sidebar_position: 6
title: "Operasi Aritmatika & Broadcasting"
---

Setelah mempelajari cara membuat array, mengenal atribut array, serta melakukan indexing dan slicing, langkah berikutnya adalah memanipulasi dan melakukan operasi matematika pada NumPy array.

Operasi aritmatika pada array merupakan salah satu kemampuan penting dalam **Data Science** dan **Machine Learning**, karena sebagian besar data yang digunakan dalam proses komputasi akan direpresentasikan dalam bentuk angka.

NumPy memungkinkan operasi matematika dilakukan secara efisien pada seluruh elemen array tanpa harus menuliskan perulangan secara manual.

Salah satu konsep penting yang akan dipelajari adalah **element-wise operation**, yaitu operasi yang dilakukan pada setiap elemen array berdasarkan posisinya.

---

## Element-Wise Operation

**Element-wise operation** berarti operasi dilakukan terhadap elemen-elemen array secara berpasangan berdasarkan posisi atau indeksnya.

Sebagai contoh, terdapat dua array:

```python
import numpy as np

A1 = np.array([1, 2, 3])
ones = np.ones(3)

print(A1)
print(ones)
```

Output:

```text
[1 2 3]
[1. 1. 1.]
```

Ketika kedua array dijumlahkan:

```python
A1 + ones
```

NumPy akan melakukan operasi:

```text
1 + 1 = 2
2 + 1 = 3
3 + 1 = 4
```

Sehingga hasilnya:

```text
[2. 3. 4.]
```

Operasi tersebut disebut **element-wise addition**.

---

## Penjumlahan Array

Penjumlahan dapat dilakukan menggunakan operator `+`.

```python
A1 = np.array([1, 2, 3])
ones = np.ones(3)

print(A1 + ones)
```

Output:

```text
[2. 3. 4.]
```

NumPy juga menyediakan fungsi `np.add()` untuk melakukan operasi yang sama.

```python
print(np.add(A1, ones))
```

Output:

```text
[2. 3. 4.]
```

Keduanya menghasilkan nilai yang sama.

### Operator vs Fungsi NumPy

Secara umum:

```python
A1 + ones
```

dan:

```python
np.add(A1, ones)
```

memiliki tujuan yang sama.

Operator biasanya lebih singkat dan mudah dibaca, sedangkan fungsi NumPy berguna ketika ingin menggunakan operasi tersebut sebagai bagian dari fungsi atau workflow NumPy yang lebih kompleks.

---

## Pengurangan Array

Pengurangan dilakukan menggunakan operator `-`.

```python
print(A1 - ones)
```

Output:

```text
[0. 1. 2.]
```

Operasi tersebut secara konsep adalah:

```text
1 - 1 = 0
2 - 1 = 1
3 - 1 = 2
```

Sehingga:

```text
[0. 1. 2.]
```

---

## Perkalian Array

Perkalian menggunakan operator `*`.

```python
print(A1 * ones)
```

Output:

```text
[1. 2. 3.]
```

Operasinya dilakukan secara element-wise:

```text
1 × 1 = 1
2 × 1 = 2
3 × 1 = 3
```

Perlu diperhatikan bahwa `*` pada NumPy array merupakan **element-wise multiplication**, bukan perkalian matriks.

Perkalian matriks memiliki konsep dan operator yang berbeda, yang akan dipelajari pada materi berikutnya jika diperlukan.

---

## Pembagian Array

NumPy juga mendukung pembagian menggunakan operator `/`.

Contohnya:

```python
A1 = np.array([1, 2, 3])

A2 = np.array([
    [1., 2., 3.3],
    [4., 5., 6.5]
])

print(A2 / A1)
```

Pada contoh tersebut, NumPy menggunakan **broadcasting** agar array `A1` dapat digunakan dalam operasi terhadap `A2`.

Hasilnya:

```text
[[1.         1.         1.1       ]
 [4.         2.5        2.16666667]]
```

---

## Floor Division

Selain pembagian standar menggunakan `/`, NumPy mendukung **floor division** menggunakan operator `//`.

```python
print(A2 // A1)
```

Floor division menghasilkan nilai pembagian yang dibulatkan ke bawah sesuai aturan floor pada Python.

Contoh sederhana:

```python
print(7 // 2)
```

Output:

```text
3
```

Sedangkan:

```python
print(10 // 3)
```

menghasilkan:

```text
3
```

Floor division berbeda dengan pembagian standar:

```python
print(7 / 2)
```

Output:

```text
3.5
```

Jadi:

| Operator | Keterangan |
|---|---|
| `/` | Pembagian standar |
| `//` | Floor division |

---

## Perpangkatan

NumPy mendukung operasi perpangkatan menggunakan operator `**`.

Contohnya:

```python
A1 = np.array([1, 2, 3])

print(A1 ** 2)
```

Output:

```text
[1 4 9]
```

Operasi dilakukan pada setiap elemen:

```text
1² = 1
2² = 4
3² = 9
```

NumPy juga menyediakan fungsi `np.square()`.

```python
print(np.square(A1))
```

Output:

```text
[1 4 9]
```

Dengan demikian:

```python
A1 ** 2
```

dan:

```python
np.square(A1)
```

menghasilkan hasil yang sama untuk kasus tersebut.

---

## Modulo

Operator `%` digunakan untuk mendapatkan **sisa hasil pembagian**.

Contohnya:

```python
A2 = np.array([
    [1., 2., 3.3],
    [4., 5., 6.5]
])

print(A2 % 2)
```

Hasilnya:

```text
[[1.  0.  1.3]
 [0.  1.  0.5]]
```

Contoh sederhana:

```python
print(7 % 2)
```

Output:

```text
1
```

Karena:

```text
7 ÷ 2 = 3 sisa 1
```

Modulo sering digunakan dalam pemrograman untuk mengetahui apakah sebuah angka memiliki sisa pembagian tertentu, misalnya dalam pemeriksaan bilangan genap dan ganjil.

---

## Broadcasting

Salah satu kemampuan penting NumPy adalah **broadcasting**.

Broadcasting memungkinkan operasi aritmatika dilakukan pada array yang memiliki shape berbeda selama shape tersebut memenuhi aturan broadcasting NumPy.

Contohnya:

```python
A1 = np.array([1, 2, 3])

A2 = np.array([
    [1., 2., 3.3],
    [4., 5., 6.5]
])
```

Shape kedua array:

```python
print(A1.shape)
print(A2.shape)
```

Output:

```text
(3,)
(2, 3)
```

Walaupun shape berbeda, operasi berikut dapat dilakukan:

```python
print(A1 * A2)
```

Hasilnya:

```text
[[ 1.   4.   9.9]
 [ 4.  10.  19.5]]
```

Mengapa bisa?

Karena:

```text
A1 → (3,)
A2 → (2, 3)
```

Shape `(3,)` kompatibel dengan dimensi terakhir `(3)` pada `(2, 3)`.

Secara konsep, NumPy memperlakukan `A1` seolah-olah nilainya tersedia untuk setiap baris:

```text
[1, 2, 3]

↓

[1, 2, 3]
[1, 2, 3]
```

Kemudian operasi dilakukan secara element-wise.

---

## Cara Kerja Broadcasting Secara Sederhana

Misalnya terdapat:

```python
A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

B = np.array([10, 20, 30])
```

Shape:

```text
A → (2, 3)
B → (3,)
```

Operasi:

```python
A + B
```

dapat dilakukan karena `B` kompatibel dengan dimensi terakhir `A`.

Secara konsep:

```text
[1, 2, 3]       [10, 20, 30]
[4, 5, 6]   +  [10, 20, 30]
```

Hasil:

```text
[11, 22, 33]
[14, 25, 36]
```

Dengan broadcasting, kita tidak perlu membuat array `B` secara manual sebanyak jumlah baris `A`.

---

## Broadcasting Tidak Selalu Berhasil

Tidak semua shape dapat digunakan bersama.

Contohnya:

```python
A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

B = np.array([10, 20])

A + B
```

Shape:

```text
A → (2, 3)
B → (2,)
```

Operasi tersebut akan menghasilkan error karena shape `(2,)` tidak kompatibel dengan dimensi terakhir `(3)` pada `A`.

Biasanya NumPy akan memberikan error seperti:

```text
ValueError: operands could not be broadcast together
```

Ketika menemukan error seperti ini, hal pertama yang sebaiknya dilakukan adalah memeriksa shape kedua array:

```python
print(A.shape)
print(B.shape)
```

---

## Mengubah Shape dengan `reshape()`

Salah satu cara untuk menyesuaikan shape adalah menggunakan `reshape()`.

Contohnya:

```python
A = np.array([1, 2, 3])

print(A.shape)
```

Output:

```text
(3,)
```

Array tersebut dapat diubah menjadi array dua dimensi:

```python
A_reshaped = A.reshape(1, 3)

print(A_reshaped)
print(A_reshaped.shape)
```

Output:

```text
[[1 2 3]]
(1, 3)
```

Perubahan shape dapat membantu ketika kita ingin melakukan operasi terhadap array dengan dimensi tertentu.

Namun, `reshape()` sebaiknya tidak digunakan secara sembarangan hanya untuk menghilangkan error. Kita harus memahami bentuk data yang sebenarnya dibutuhkan oleh operasi tersebut.

---

## Fungsi Matematika NumPy

Selain operator matematika dasar, NumPy menyediakan berbagai fungsi matematika.

Beberapa fungsi yang sering digunakan antara lain:

| Fungsi | Kegunaan |
|---|---|
| `np.add()` | Penjumlahan |
| `np.subtract()` | Pengurangan |
| `np.multiply()` | Perkalian |
| `np.divide()` | Pembagian |
| `np.square()` | Pangkat dua |
| `np.power()` | Perpangkatan |
| `np.exp()` | Eksponensial |
| `np.log()` | Logaritma natural |
| `np.sqrt()` | Akar kuadrat |

Fungsi-fungsi tersebut umumnya bekerja secara element-wise.

---

## Fungsi Eksponensial

`np.exp()` digunakan untuk menghitung eksponensial berbasis bilangan Euler `e`.

Contohnya:

```python
A1 = np.array([1, 2, 3])

print(np.exp(A1))
```

Secara konsep, NumPy menghitung:

```text
e¹
e²
e³
```

untuk setiap elemen array.

Fungsi ini banyak digunakan dalam berbagai perhitungan numerik dan machine learning.

---

## Fungsi Logaritma

NumPy menyediakan `np.log()` untuk menghitung logaritma natural.

```python
A1 = np.array([1, 2, 3])

print(np.log(A1))
```

Operasi dilakukan pada setiap elemen array.

Selain `np.log()`, NumPy juga memiliki fungsi lain seperti:

```python
np.log10(A1)
```

untuk logaritma berbasis 10.

---

## Operasi Aritmatika Tanpa Perulangan Manual

Salah satu keunggulan NumPy adalah kita tidak perlu membuat loop secara manual untuk melakukan operasi terhadap setiap elemen.

Misalnya menggunakan Python biasa:

```python
numbers = [1, 2, 3, 4, 5]

result = []

for number in numbers:
    result.append(number * 2)

print(result)
```

Dengan NumPy, operasi tersebut dapat ditulis lebih sederhana:

```python
numbers = np.array([1, 2, 3, 4, 5])

result = numbers * 2

print(result)
```

Output:

```text
[ 2  4  6  8 10]
```

Pendekatan seperti ini disebut **vectorization**.

Vectorization merupakan salah satu alasan NumPy sangat banyak digunakan dalam Data Science dan Machine Learning.

---

## Vectorization

**Vectorization** adalah pendekatan melakukan operasi terhadap banyak data sekaligus menggunakan operasi array, daripada melakukan perulangan Python satu per satu.

Contohnya:

```python
A = np.array([1, 2, 3, 4, 5])

A * 10
```

Hasil:

```text
[10 20 30 40 50]
```

Kita tidak perlu membuat:

```python
for value in A:
    ...
```

untuk operasi sederhana tersebut.

Konsep ini sangat penting karena data dalam Machine Learning biasanya terdiri dari banyak nilai numerik yang perlu diproses secara bersamaan.

---

## Memeriksa Shape Sebelum Melakukan Operasi

Ketika bekerja dengan array multidimensi, biasakan memeriksa shape sebelum melakukan operasi.

Gunakan:

```python
print(A.shape)
```

Untuk mengetahui jumlah dimensi:

```python
print(A.ndim)
```

Contohnya:

```python
A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

print(A.shape)
print(A.ndim)
```

Output:

```text
(2, 3)
2
```

Informasi tersebut membantu kita memahami bentuk data sebelum melakukan operasi matematika.

---

## Workflow Operasi Array

Ketika melakukan operasi terhadap NumPy array, workflow sederhana yang dapat digunakan adalah:

```text
Membuat Array
     ↓
Memeriksa Shape
     ↓
Menentukan Operasi
     ↓
Melakukan Operasi
     ↓
Memeriksa Hasil
     ↓
Jika Error → Periksa Shape
     ↓
Gunakan reshape() jika memang diperlukan
```

Contohnya:

```python
A = np.array([1, 2, 3])
B = np.array([10, 20, 30])

print(A.shape)
print(B.shape)

result = A + B

print(result)
```

Output:

```text
(3,)
(3,)
[11 22 33]
```

---

## Kesalahan yang Sering Terjadi

### Menganggap `*` sebagai Perkalian Matriks

Pada NumPy:

```python
A * B
```

merupakan perkalian **element-wise**.

Jadi jangan langsung menganggap operator `*` sebagai perkalian matriks.

---

### Mengabaikan Shape

Ketika operasi array menghasilkan error, jangan langsung mencoba mengubah array secara acak.

Periksa terlebih dahulu:

```python
print(A.shape)
print(B.shape)
```

Kemudian pahami apakah operasi yang ingin dilakukan memang sesuai dengan struktur data.

---

### Menggunakan `reshape()` Tanpa Memahami Data

`reshape()` hanya mengubah bentuk array selama jumlah elemennya tetap sesuai.

Contohnya:

```python
A = np.array([1, 2, 3, 4, 5, 6])

A.reshape(2, 3)
```

valid karena:

```text
6 elemen → 2 × 3 = 6
```

Sedangkan:

```python
A.reshape(4, 2)
```

tidak valid karena:

```text
6 elemen ≠ 4 × 2
```

---

## Ringkasan

Pada materi ini kita telah mempelajari berbagai operasi aritmatika pada NumPy array.

Hal-hal penting yang perlu diingat:

- Operasi NumPy umumnya dapat dilakukan secara **element-wise**.
- Operator `+` digunakan untuk penjumlahan.
- Operator `-` digunakan untuk pengurangan.
- Operator `*` digunakan untuk perkalian element-wise.
- Operator `/` digunakan untuk pembagian.
- Operator `//` digunakan untuk floor division.
- Operator `**` digunakan untuk perpangkatan.
- Operator `%` digunakan untuk modulo.
- NumPy menyediakan berbagai fungsi matematika seperti `np.exp()`, `np.log()`, dan `np.square()`.
- **Broadcasting** memungkinkan operasi dilakukan pada array dengan shape yang berbeda selama shape tersebut kompatibel.
- `reshape()` dapat digunakan untuk mengubah shape array ketika memang sesuai dengan kebutuhan operasi.
- **Vectorization** memungkinkan operasi terhadap banyak data dilakukan tanpa loop Python secara manual.
- Memeriksa `.shape` merupakan kebiasaan penting ketika bekerja dengan array multidimensi.

---

## Checklist Pembelajaran

Pastikan Anda sudah memahami:

- [ ] Apa yang dimaksud dengan element-wise operation.
- [ ] Cara melakukan penjumlahan array.
- [ ] Cara melakukan pengurangan array.
- [ ] Cara melakukan perkalian array.
- [ ] Cara melakukan pembagian array.
- [ ] Perbedaan `/` dan `//`.
- [ ] Cara melakukan perpangkatan menggunakan `**`.
- [ ] Apa fungsi operator `%`.
- [ ] Apa yang dimaksud dengan broadcasting.
- [ ] Mengapa beberapa operasi array menghasilkan `ValueError`.
- [ ] Cara memeriksa `.shape`.
- [ ] Kegunaan `reshape()`.
- [ ] Apa yang dimaksud dengan vectorization.
- [ ] Kegunaan fungsi matematika seperti `np.exp()` dan `np.log()`.

---

## Latihan

Gunakan NumPy untuk membuat array berikut:

```python
A = np.array([10, 20, 30, 40, 50])
```

Kemudian lakukan:

1. Tambahkan angka `5` ke seluruh elemen.
2. Kurangi seluruh elemen dengan `2`.
3. Kalikan seluruh elemen dengan `3`.
4. Bagi seluruh elemen dengan `10`.
5. Hitung kuadrat setiap elemen.
6. Hitung sisa pembagian setiap elemen dengan `3`.
7. Hitung `np.exp()` untuk setiap elemen.
8. Periksa `shape` dan `ndim` array.
9. Buat array dua dimensi dan coba lakukan operasi broadcasting.
10. Sengaja gunakan dua shape yang tidak kompatibel dan amati error yang dihasilkan.

Tujuan latihan bukan hanya mendapatkan output yang benar, tetapi juga memahami **mengapa operasi tersebut dapat atau tidak dapat dilakukan oleh NumPy**.
