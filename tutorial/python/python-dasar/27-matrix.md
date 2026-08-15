---
sidebar_position: 27
title: "Matrix"
---

## Matrix (List Multidimensi)

Dalam pemrograman, **matrix** dapat digunakan untuk merepresentasikan data yang memiliki lebih dari satu dimensi.

Dalam Python, matrix dapat dibuat menggunakan **nested list**, yaitu sebuah list yang berisi list lainnya.

Contohnya:

```python
matrix = [
    [1, 2, 3],
    [2, 4, 6],
    [7, 8, 9]
]
```

Matrix tersebut memiliki:

- 3 baris
- 3 kolom

Sehingga dapat disebut sebagai matrix **3 × 3**.

---

## 1. Apa Itu Matrix?

Secara sederhana, matrix adalah **list yang berisi list lain**.

Contohnya:

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
```

Struktur tersebut dapat digambarkan:

```text
        Column
        0  1  2
      ┌─────────
Row 0 │ 1  2  3
Row 1 │ 4  5  6
Row 2 │ 7  8  9
```

Setiap list di dalam `matrix` dapat dianggap sebagai sebuah **baris (row)**.

Sedangkan setiap item dalam baris tersebut dapat dianggap sebagai **kolom (column)**.

---

## 2. Nested List

Matrix dibangun menggunakan konsep **nested list**.

Contohnya:

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6]
]
```

List bagian luar:

```python
matrix
```

berisi dua list:

```text
[1, 2, 3]
[4, 5, 6]
```

Sehingga:

```text
matrix
  │
  ├── [1, 2, 3]
  │
  └── [4, 5, 6]
```

---

## 3. Matrix 2 Dimensi

Matrix yang memiliki baris dan kolom disebut matrix **dua dimensi (2D)**.

Contohnya:

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
```

Matrix tersebut memiliki:

```text
3 baris
3 kolom
```

Sehingga ukurannya:

```text
3 × 3
```

---

## 4. Mengakses Baris

Karena matrix merupakan list yang berisi list, kita dapat menggunakan index untuk mengambil sebuah baris.

Contohnya:

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(matrix[0])
```

Hasil:

```text
[1, 2, 3]
```

Index `0` mengacu pada baris pertama.

Mengakses baris kedua:

```python
print(matrix[1])
```

Hasil:

```text
[4, 5, 6]
```

---

## 5. Mengakses Elemen dalam Matrix

Untuk mengambil elemen tertentu, kita menggunakan **dua index**.

Sintaksnya:

```python
matrix[row][column]
```

Index pertama digunakan untuk memilih **baris**.

Index kedua digunakan untuk memilih **kolom**.

Contohnya:

```python
matrix = [
    [1, 5, 3],
    [2, 4, 6],
    [7, 8, 9]
]

print(matrix[0][1])
```

Hasil:

```text
5
```

Prosesnya:

```text
matrix[0]
      ↓
[1, 5, 3]
      ↓
matrix[0][1]
      ↓
5
```

---

## 6. Memahami `[row][column]`

Perhatikan matrix berikut:

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
```

Posisinya:

```text
        Column
          0  1  2
        ┌─────────
Row 0   │ 1  2  3
Row 1   │ 4  5  6
Row 2   │ 7  8  9
```

Untuk mengambil angka `5`:

```python
matrix[1][1]
```

Karena:

```text
Row 1
  ↓
[4, 5, 6]
     ↑
  Column 1
```

Hasil:

```text
5
```

---

## 7. Contoh Pengaksesan Elemen

Dengan matrix:

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
```

Kita dapat mengakses:

```python
print(matrix[0][0])
```

Hasil:

```text
1
```

```python
print(matrix[0][2])
```

Hasil:

```text
3
```

```python
print(matrix[1][0])
```

Hasil:

```text
4
```

```python
print(matrix[2][2])
```

Hasil:

```text
9
```

---

## 8. Matrix untuk Merepresentasikan Gambar

Salah satu contoh penggunaan matrix adalah untuk merepresentasikan **gambar**.

Secara sederhana, sebuah gambar dapat direpresentasikan sebagai kumpulan pixel.

Misalnya:

```text
1 → Pixel aktif
0 → Pixel tidak aktif
```

Kita dapat membuat gambar sederhana menggunakan matrix:

```python
picture = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1]
]
```

Jika `1` dianggap sebagai pixel yang aktif, struktur tersebut dapat dibayangkan seperti:

```text
1 0 1
0 1 0
1 0 1
```

Pola tersebut membentuk bentuk sederhana seperti huruf `X`.

---

## 9. Mengakses Pixel

Karena gambar direpresentasikan sebagai matrix, setiap pixel dapat diakses menggunakan index baris dan kolom.

Contohnya:

```python
picture = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1]
]

print(picture[1][1])
```

Hasil:

```text
1
```

Artinya pixel pada:

```text
row = 1
column = 1
```

memiliki nilai:

```text
1
```

---

## 10. Mengubah Elemen Matrix

Karena matrix dibuat menggunakan list, elemen di dalamnya dapat diubah.

Contohnya:

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

matrix[1][1] = 100

print(matrix)
```

Hasil:

```text
[[1, 2, 3], [4, 100, 6], [7, 8, 9]]
```

Kita mengubah:

```text
5
```

menjadi:

```text
100
```

---

## 11. Matrix Lebih dari Dua Dimensi

Nested list tidak hanya dapat digunakan untuk membuat matrix 2D.

Kita juga dapat membuat struktur dengan lebih banyak dimensi.

Contohnya:

```python
data = [
    [
        [1, 2],
        [3, 4]
    ],
    [
        [5, 6],
        [7, 8]
    ]
]
```

Struktur tersebut memiliki tiga tingkat list.

Kita dapat mengakses elemen tertentu menggunakan tiga index:

```python
print(data[0][1][0])
```

Hasil:

```text
3
```

Prosesnya:

```text
data[0]
   ↓
[
    [1, 2],
    [3, 4]
]

data[0][1]
   ↓
[3, 4]

data[0][1][0]
   ↓
3
```

---

## 12. Konsep Dimensi

Semakin banyak nested list yang digunakan, semakin banyak dimensi yang dapat direpresentasikan.

Secara sederhana:

```text
List
 ↓
1 Dimensi
```

```text
List di dalam List
 ↓
2 Dimensi
```

```text
List di dalam List di dalam List
 ↓
3 Dimensi
```

Contoh:

```python
# 1D
numbers = [1, 2, 3]
```

```python
# 2D
matrix = [
    [1, 2],
    [3, 4]
]
```

```python
# 3D
data = [
    [
        [1, 2],
        [3, 4]
    ]
]
```

---

## 13. Matrix dalam Machine Learning

Matrix merupakan konsep penting dalam berbagai bidang komputasi, termasuk **Machine Learning**.

Data yang digunakan dalam machine learning sering direpresentasikan dalam bentuk struktur multidimensi.

Misalnya:

```text
Data
 ↓
Baris → Data/Observasi
Kolom → Fitur
```

Contoh sederhana:

```python
data = [
    [20, 170],
    [25, 175],
    [30, 180]
]
```

Secara konseptual:

```text
        Umur  Tinggi
        0     1
      ┌─────────────
Row 0 │ 20    170
Row 1 │ 25    175
Row 2 │ 30    180
```

Walaupun implementasi machine learning modern biasanya menggunakan library khusus seperti NumPy, konsep dasarnya tetap berkaitan dengan struktur data multidimensi.

---

## 14. Matrix dalam Image Processing

Dalam pengolahan gambar, sebuah gambar dapat direpresentasikan sebagai kumpulan nilai pixel.

Untuk gambar sederhana:

```text
0 → kosong
1 → aktif
```

Kita dapat membuat:

```python
picture = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]
]
```

Matrix tersebut dapat dibayangkan sebagai:

```text
0 1 0
1 1 1
0 1 0
```

Pada gambar nyata, nilai pixel dapat jauh lebih kompleks daripada sekadar `0` dan `1`.

Namun konsep dasarnya tetap sama:

```text
Baris
  +
Kolom
  ↓
Posisi Pixel
```

---

## 15. Ringkasan Pengaksesan Matrix

Dengan matrix:

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
```

| Expression | Hasil | Keterangan |
| --- | --- | --- |
| `matrix[0]` | `[1, 2, 3]` | Mengambil baris pertama |
| `matrix[1]` | `[4, 5, 6]` | Mengambil baris kedua |
| `matrix[0][0]` | `1` | Baris 0, kolom 0 |
| `matrix[0][2]` | `3` | Baris 0, kolom 2 |
| `matrix[1][1]` | `5` | Baris 1, kolom 1 |
| `matrix[2][2]` | `9` | Baris 2, kolom 2 |

---

## Kesimpulan

**Matrix** dalam Python dapat direpresentasikan menggunakan **nested list**, yaitu list yang berisi list lainnya.

Contohnya:

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
```

Untuk mengakses elemen tertentu, gunakan:

```python
matrix[row][column]
```

Contohnya:

```python
print(matrix[1][2])
```

Hasil:

```text
6
```

Matrix dapat digunakan untuk merepresentasikan berbagai jenis data multidimensi, seperti:

- Data tabel.
- Pixel gambar.
- Data statistik.
- Struktur data multidimensi.
- Data yang digunakan dalam Machine Learning.

Konsep utama yang perlu diingat:

:::info
**Matrix adalah bentuk struktur data multidimensi yang dapat direpresentasikan di Python menggunakan nested list. Untuk mengakses elemen, gunakan index secara berurutan berdasarkan dimensinya.**
:::
