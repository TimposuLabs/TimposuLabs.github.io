---
sidebar_position: 10
title: "Dot Product"
---

Pada materi sebelumnya kita telah mempelajari berbagai operasi pada NumPy, termasuk operasi aritmatika, broadcasting, aggregation, `reshape()`, dan transpose.

Selanjutnya kita akan mempelajari salah satu operasi matematika yang sangat penting dalam **Machine Learning**, yaitu **dot product**.

Dot product digunakan untuk menggabungkan sekumpulan nilai dengan cara melakukan perkalian kemudian menjumlahkan hasil perkalian tersebut.

Konsep ini menjadi dasar dari berbagai operasi dalam Machine Learning, terutama ketika berhubungan dengan:

- Feature.
- Weight.
- Matriks.
- Vektor.
- Linear regression.
- Neural network.
- Transformasi data.

Sebelum mempelajari dot product, kita perlu memahami perbedaannya dengan perkalian **element-wise**.

---

## Element-Wise Multiplication

**Element-wise multiplication** atau sering disebut **Hadamard product** adalah operasi perkalian setiap elemen dengan elemen lain pada posisi yang sama.

Contohnya:

```python
import numpy as np

A = np.array([1, 2, 3])
B = np.array([4, 5, 6])

result = A * B

print(result)
```

Output:

```text
[ 4 10 18]
```

Operasinya adalah:

```text
1 × 4 = 4
2 × 5 = 10
3 × 6 = 18
```

Sehingga:

```text
[1, 2, 3]
     ×
[4, 5, 6]
     ↓
[4, 10, 18]
```

Setiap elemen hanya dikalikan dengan elemen yang berada pada posisi yang sama.

---

## Operator `*` pada NumPy

Pada NumPy, operator `*` digunakan untuk melakukan perkalian **element-wise**.

Contohnya:

```python
A = np.array([
    [1, 2],
    [3, 4]
])

B = np.array([
    [5, 6],
    [7, 8]
])

print(A * B)
```

Hasil:

```text
[[ 5 12]
 [21 32]]
```

Perhitungannya:

```text
1 × 5 = 5
2 × 6 = 12
3 × 7 = 21
4 × 8 = 32
```

Jadi:

```text
A * B
```

bukan perkalian matriks.

---

## Dot Product

**Dot product** merupakan operasi yang melakukan perkalian terhadap pasangan elemen kemudian menjumlahkan hasilnya.

Untuk dua vektor:

```python
A = np.array([1, 2, 3])
B = np.array([4, 5, 6])
```

dot product menghasilkan:

```text
(1 × 4) + (2 × 5) + (3 × 6)
```

yaitu:

```text
4 + 10 + 18 = 32
```

Dengan NumPy:

```python
result = np.dot(A, B)

print(result)
```

Output:

```text
32
```

---

## Element-Wise vs Dot Product

![Dot Product vs element wise](/img/python/7.png)

Perhatikan perbedaan berikut.

### Element-Wise

```python
A * B
```

menghasilkan:

```text
[4, 10, 18]
```

### Dot Product

```python
np.dot(A, B)
```

menghasilkan:

```text
32
```

Perbedaannya:

```text
Element-wise:

[1, 2, 3]
 ×
[4, 5, 6]
 ↓
[4, 10, 18]
```

Sedangkan:

```text
Dot product:

[1, 2, 3]
 ×
[4, 5, 6]
 ↓
4 + 10 + 18
 ↓
32
```

Jadi element-wise multiplication menghasilkan array, sedangkan dot product untuk dua vektor dapat menghasilkan satu nilai.

![Dot Product](/img/python/8.png)

---

## Menggunakan `np.dot()`

NumPy menyediakan fungsi:

```python
np.dot()
```

Contohnya:

```python
A = np.array([1, 2, 3])
B = np.array([4, 5, 6])

result = np.dot(A, B)

print(result)
```

Output:

```text
32
```

Secara matematis:

```text
A · B = (1 × 4) + (2 × 5) + (3 × 6)
```

---

## Operator `@`

Selain `np.dot()`, NumPy juga menyediakan operator `@` untuk operasi perkalian matriks.

Contohnya:

```python
A = np.array([1, 2, 3])
B = np.array([4, 5, 6])

print(A @ B)
```

Output:

```text
32
```

Untuk operasi matriks, `@` biasanya lebih mudah dibaca karena secara eksplisit menunjukkan operasi perkalian matriks.

Contohnya:

```python
A @ B
```

dibandingkan:

```python
np.dot(A, B)
```

Keduanya dapat digunakan, tetapi terdapat beberapa perbedaan perilaku `np.dot()` dan `@` pada array berdimensi lebih tinggi. Untuk operasi perkalian matriks, operator `@` sering menjadi pilihan yang lebih jelas.

---

## Dot Product pada Matriks

Dot product menjadi lebih menarik ketika bekerja dengan matriks.

Misalnya:

```python
A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])
```

Shape:

```text
(2, 3)
```

Dan:

```python
B = np.array([
    [7, 8],
    [9, 10],
    [11, 12]
])
```

Shape:

```text
(3, 2)
```

Kita dapat melakukan:

```python
C = A @ B

print(C)
```

Hasil:

```text
[[ 58  64]
 [139 154]]
```

---

## Aturan Dimensi Dot Product

Aturan utama perkalian matriks adalah:

```text
(m, n) × (n, p)
```

Dimensi bagian dalam harus sama.

Hasilnya akan memiliki shape:

```text
(m, p)
```

Contoh:

```text
A → (2, 3)
B → (3, 2)

        ↓

(2, 3) × (3, 2)

        ↓

Hasil → (2, 2)
```

Perhatikan angka yang dicocokkan:

```text
(2, 3)
    ↑
    3

(3, 2)
 ↑
 3
```

Angka `3` dan `3` merupakan **dimensi dalam** dan harus sama.

Sedangkan dimensi luar:

```text
2 dan 2
```

menjadi shape hasil:

```text
(2, 2)
```

---

## Rumus Umum Perkalian Matriks

Jika:

```text
A memiliki shape (m, n)
B memiliki shape (n, p)
```

maka:

```text
A × B
```

menghasilkan:

```text
(m, p)
```

Secara sederhana:

```text
(m, n) × (n, p) → (m, p)
```

Ini merupakan aturan penting yang harus diingat ketika melakukan dot product pada matriks.

---

## Contoh Perhitungan Dot Product Secara Manual

Misalnya:

```text
A:

[1  2]
[3  4]
```

dan:

```text
B:

[5  6]
[7  8]
```

Maka elemen pertama hasil dihitung dengan:

```text
(1 × 5) + (2 × 7)
```

Hasil:

```text
5 + 14 = 19
```

Elemen berikutnya:

```text
(1 × 6) + (2 × 8)
```

Hasil:

```text
6 + 16 = 22
```

Sehingga:

```text
A × B:

[19 22]
[43 50]
```

Proses tersebut dapat dipahami sebagai:

```text
Baris dari A
      ×
Kolom dari B
      ↓
Penjumlahan hasil perkalian
      ↓
Satu elemen pada matriks hasil
```

---

## Mengapa Dot Product Penting?

Dot product sangat penting karena banyak algoritma Machine Learning melakukan perhitungan yang pada dasarnya melibatkan perkalian dan penjumlahan seperti ini.

Misalnya sebuah data memiliki tiga fitur:

```text
Feature 1
Feature 2
Feature 3
```

dan setiap fitur memiliki weight:

```text
Weight 1
Weight 2
Weight 3
```

Perhitungan sederhana dapat berbentuk:

```text
(feature 1 × weight 1)
+
(feature 2 × weight 2)
+
(feature 3 × weight 3)
```

Bentuk tersebut merupakan dot product.

---

## Dot Product dalam Machine Learning

Misalnya terdapat data:

```text
X = [10, 20, 30]
```

dan weight:

```text
W = [0.2, 0.5, 0.3]
```

Dot product:

```python
X = np.array([10, 20, 30])
W = np.array([0.2, 0.5, 0.3])

result = X @ W

print(result)
```

Perhitungannya:

```text
(10 × 0.2)
+
(20 × 0.5)
+
(30 × 0.3)
```

menjadi:

```text
2 + 10 + 9
```

sehingga:

```text
21
```

Konsep seperti ini merupakan bagian dasar dari banyak perhitungan model Machine Learning.

---

## Contoh Dot Product dengan Random Matrix

Kita dapat membuat contoh menggunakan NumPy.

```python
np.random.seed(0)

mat1 = np.random.randint(
    10,
    size=(5, 3)
)

mat2 = np.random.randint(
    10,
    size=(3, 5)
)

print("Shape Mat1:", mat1.shape)
print("Shape Mat2:", mat2.shape)
```

Output shape:

```text
Shape Mat1: (5, 3)
Shape Mat2: (3, 5)
```

Karena:

```text
(5, 3) × (3, 5)
```

dimensi dalam cocok.

Maka:

```python
mat3 = mat1 @ mat2

print(mat3.shape)
```

Output:

```text
(5, 5)
```

---

## Mengapa Dua Matriks dengan Shape yang Sama Bisa Bermasalah?

Misalnya:

```python
mat1.shape
```

adalah:

```text
(5, 3)
```

dan:

```python
mat2.shape
```

juga:

```text
(5, 3)
```

Kita mungkin berpikir keduanya dapat dikalikan karena shape-nya sama.

Namun, untuk perkalian matriks:

```text
(5, 3) × (5, 3)
```

tidak valid.

Alasannya:

```text
(5, 3)
     ↑
     3

(5, 3)
 ↑
 5
```

Dimensi dalam:

```text
3 ≠ 5
```

sehingga perkalian matriks tidak dapat dilakukan.

---

## Solusi dengan Transpose

Jika memang secara logika data membutuhkan matriks kedua ditranspose, kita dapat menggunakan `.T`.

Misalnya:

```python
mat1 = np.random.randint(
    10,
    size=(5, 3)
)

mat2 = np.random.randint(
    10,
    size=(5, 3)
)
```

Shape awal:

```text
mat1 → (5, 3)
mat2 → (5, 3)
```

Transpose `mat2`:

```python
mat2_transpose = mat2.T

print(mat2_transpose.shape)
```

Output:

```text
(3, 5)
```

Sekarang:

```text
mat1           → (5, 3)
mat2_transpose → (3, 5)
```

Maka:

```text
(5, 3) × (3, 5)
```

valid.

Hasilnya:

```text
(5, 5)
```

---

## Contoh Lengkap

Berikut contoh lengkap menggunakan dua matriks.

```python
import numpy as np

np.random.seed(0)

mat1 = np.random.randint(
    10,
    size=(5, 3)
)

mat2 = np.random.randint(
    10,
    size=(5, 3)
)

print("Shape Mat1:", mat1.shape)
print("Shape Mat2:", mat2.shape)
```

### Element-Wise Multiplication

```python
mat_element_wise = mat1 * mat2

print("Shape Element-Wise:", mat_element_wise.shape)
print(mat_element_wise)
```

Karena:

```text
(5, 3)
```

dan:

```text
(5, 3)
```

memiliki shape yang sama, element-wise multiplication dapat dilakukan.

Hasilnya juga memiliki shape:

```text
(5, 3)
```

---

### Dot Product Tanpa Transpose

Jika kita melakukan:

```python
mat1 @ mat2
```

operasi tersebut akan gagal karena:

```text
(5, 3) × (5, 3)
```

dimensi dalam:

```text
3 ≠ 5
```

---

### Dot Product dengan Transpose

Transpose matriks kedua:

```python
mat2_transpose = mat2.T

print("Shape Mat2 Transpose:", mat2_transpose.shape)
```

Shape:

```text
(3, 5)
```

Kemudian:

```python
mat3 = mat1 @ mat2_transpose

print("Shape Hasil:", mat3.shape)
print(mat3)
```

Shape hasil:

```text
(5, 5)
```

---

## Perbedaan Operasi pada Contoh Matriks

Misalnya:

```text
mat1 → (5, 3)
mat2 → (5, 3)
```

### Element-Wise

```text
(5, 3) * (5, 3)
```

valid.

Hasil:

```text
(5, 3)
```

### Dot Product

```text
(5, 3) @ (5, 3)
```

tidak valid.

### Dot Product Setelah Transpose

```text
(5, 3) @ (3, 5)
```

valid.

Hasil:

```text
(5, 5)
```

---

## Cara Cepat Memeriksa Dot Product

Sebelum melakukan perkalian matriks, periksa shape kedua array.

Misalnya:

```python
print(A.shape)
print(B.shape)
```

Kemudian gunakan aturan:

```text
(m, n) × (n, p) → (m, p)
```

Jika:

```text
A → (5, 3)
B → (3, 4)
```

maka:

```text
(5, 3) × (3, 4)
```

valid dan hasilnya:

```text
(5, 4)
```

Jika:

```text
A → (5, 3)
B → (5, 4)
```

maka:

```text
(5, 3) × (5, 4)
```

tidak valid karena:

```text
3 ≠ 5
```

---

## Dot Product dan Reshape

Pada materi sebelumnya kita telah mempelajari `reshape()`.

Perlu diperhatikan bahwa `reshape()` dan transpose memiliki tujuan yang berbeda ketika memperbaiki masalah shape.

`reshape()`:

```python
A.reshape(...)
```

mengubah bentuk array berdasarkan jumlah total elemen.

Sedangkan transpose:

```python
A.T
```

menukar urutan axis.

Dalam perkalian matriks, kita harus memilih transformasi berdasarkan **makna data dan bentuk operasi yang dibutuhkan**, bukan sekadar membuat error hilang.

---

## Dot Product dan Vector

Untuk dua array satu dimensi, dot product dapat menghasilkan satu nilai.

Contohnya:

```python
A = np.array([1, 2, 3])
B = np.array([4, 5, 6])

print(A @ B)
```

Hasil:

```text
32
```

Secara konsep:

```text
[1, 2, 3]
    ·
[4, 5, 6]

= (1 × 4) + (2 × 5) + (3 × 6)

= 32
```

---

## Dot Product dan Matriks

Untuk matriks dua dimensi:

```python
A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

B = np.array([
    [7, 8],
    [9, 10],
    [11, 12]
])
```

Shape:

```text
A → (2, 3)
B → (3, 2)
```

Operasi:

```python
C = A @ B
```

menghasilkan:

```text
C → (2, 2)
```

Dengan aturan:

```text
(2, 3) × (3, 2) → (2, 2)
```

---

## Kesalahan yang Sering Terjadi

### Menggunakan `*` untuk Perkalian Matriks

Jangan menganggap:

```python
A * B
```

sebagai perkalian matriks.

Operator tersebut melakukan **element-wise multiplication**.

Untuk perkalian matriks gunakan:

```python
A @ B
```

atau:

```python
np.matmul(A, B)
```

---

### Mengabaikan Shape

Sebelum melakukan dot product, periksa:

```python
print(A.shape)
print(B.shape)
```

Kemudian pastikan:

```text
(m, n) × (n, p)
```

---

### Menganggap Shape Sama Berarti Bisa Dot Product

Dua matriks dengan shape:

```text
(5, 3)
```

dan:

```text
(5, 3)
```

dapat melakukan element-wise multiplication.

Namun tidak dapat langsung melakukan perkalian matriks karena:

```text
3 ≠ 5
```

---

### Menggunakan Transpose Tanpa Memahami Data

Transpose dapat membuat operasi menjadi valid, tetapi bukan berarti transpose selalu merupakan solusi yang benar.

Sebelum melakukan transpose, pahami:

- Apa arti setiap dimensi.
- Apakah baris merepresentasikan sample.
- Apakah kolom merepresentasikan feature.
- Bentuk data yang dibutuhkan operasi.
- Bentuk input yang dibutuhkan model.

---

## Workflow Dot Product

Gunakan workflow berikut ketika bekerja dengan dot product:

```text
Memiliki Array / Matriks
        ↓
Periksa Shape
        ↓
Tentukan Jenis Operasi
        ↓
Element-Wise atau Dot Product?
        ↓
Jika Dot Product
        ↓
Periksa Dimensi Dalam
        ↓
Apakah Sama?
   ↙          ↘
Ya             Tidak
 ↓               ↓
Operasi       Evaluasi Shape
 ↓               ↓
Hasil          Reshape / Transpose
                  ↓
             Periksa Kembali
                  ↓
                Operasi
```

Workflow ini akan sangat membantu ketika mulai bekerja dengan data Machine Learning yang memiliki banyak dimensi.

---

## Ringkasan

Pada materi ini kita telah mempelajari:

- **Element-wise multiplication** melakukan perkalian pada elemen yang memiliki posisi sama.
- Operator `*` digunakan untuk element-wise multiplication.
- **Dot product** mengalikan pasangan nilai kemudian menjumlahkan hasilnya.
- `np.dot()` dapat digunakan untuk menghitung dot product.
- Operator `@` dapat digunakan untuk perkalian matriks.
- Perkalian matriks mengikuti aturan `(m, n) × (n, p) → (m, p)`.
- Dimensi bagian dalam harus sama.
- Shape hasil ditentukan oleh dimensi bagian luar.
- Dua array dengan shape sama dapat melakukan element-wise multiplication tetapi belum tentu dapat melakukan perkalian matriks.
- `.T` dapat digunakan untuk melakukan transpose.
- Transpose dapat membantu menyesuaikan dimensi untuk perkalian matriks jika sesuai dengan struktur data.
- Dot product merupakan konsep penting dalam Machine Learning.
- Perhitungan feature × weight kemudian dijumlahkan merupakan contoh konsep yang berkaitan dengan dot product.
- Shape merupakan hal yang sangat penting ketika melakukan operasi matriks.

---

## Checklist Pembelajaran

Pastikan Anda sudah memahami:

- [ ] Apa yang dimaksud dengan element-wise multiplication.
- [ ] Apa yang dimaksud dengan dot product.
- [ ] Perbedaan `*` dan `@`.
- [ ] Cara menggunakan `np.dot()`.
- [ ] Aturan dimensi perkalian matriks.
- [ ] Apa yang dimaksud dengan dimensi bagian dalam.
- [ ] Cara menentukan shape hasil dot product.
- [ ] Mengapa `(5, 3) × (5, 3)` tidak valid sebagai perkalian matriks.
- [ ] Mengapa transpose dapat mengubah `(5, 3)` menjadi `(3, 5)`.
- [ ] Hubungan dot product dengan feature dan weight.
- [ ] Mengapa dot product penting dalam Machine Learning.
- [ ] Cara melakukan debugging menggunakan `.shape`.

---

## Latihan

Gunakan NumPy untuk membuat dua array berikut:

```python
A = np.array([1, 2, 3])
B = np.array([4, 5, 6])
```

Kemudian:

1. Hitung `A * B`.
2. Hitung `A @ B`.
3. Hitung `np.dot(A, B)`.
4. Jelaskan perbedaan ketiga hasil tersebut.

Selanjutnya buat dua matriks:

```python
A = np.random.randint(
    10,
    size=(4, 3)
)

B = np.random.randint(
    10,
    size=(4, 3)
)
```

Lakukan:

1. Periksa shape kedua matriks.
2. Lakukan element-wise multiplication.
3. Coba lakukan dot product secara langsung.
4. Amati error yang muncul.
5. Transpose matriks `B`.
6. Periksa kembali shape `B`.
7. Lakukan dot product menggunakan `@`.
8. Periksa shape hasil.
9. Jelaskan mengapa operasi pertama gagal.
10. Jelaskan mengapa operasi setelah transpose berhasil.

Terakhir, buat contoh:

```text
(2, 4) × (4, 3)
```

dan tentukan terlebih dahulu shape hasilnya **sebelum menjalankan kode**.
