---
sidebar_position: 5
title: "Unique, Indexing & Slicing"
---

Setelah memahami cara membuat NumPy array, langkah berikutnya adalah belajar bagaimana **melihat, memilih, dan mengambil data tertentu dari array**.

Ketika bekerja dengan dataset, kita tidak selalu membutuhkan seluruh data sekaligus. Sering kali kita hanya ingin:

- Mengetahui nilai apa saja yang unik.
- Mengambil satu elemen.
- Mengambil satu baris.
- Mengambil satu kolom.
- Mengambil bagian tertentu dari array.
- Mengambil data dari array multidimensi.

NumPy menyediakan berbagai kemampuan untuk kebutuhan tersebut.

Pada materi ini kita akan mempelajari:

- `np.unique()`
- Konsep vector, matrix, dan `ndarray`.
- Indexing.
- Slicing.
- Indexing pada array 1D, 2D, 3D, dan 4D.
- Cara memahami `shape` ketika melakukan indexing dan slicing.

---

## 1. Mencari Elemen Unik dengan `np.unique()`

Ketika bekerja dengan dataset, kita sering ingin mengetahui nilai apa saja yang terdapat di dalam data.

Misalnya sebuah array memiliki data:

```python
numbers = np.array([
    1, 2, 2, 3, 3, 3, 4, 4
])
```

Jika kita ingin mengetahui nilai yang berbeda saja, kita dapat menggunakan:

```python
np.unique(numbers)
```

Hasil:

```text
[1 2 3 4]
```

`np.unique()` menghilangkan nilai yang duplikat dan mengembalikan nilai yang unik.

---

## 2. Contoh `np.unique()` pada Array 2D

`np.unique()` juga dapat digunakan pada array multidimensi.

Contoh:

```python
import numpy as np

np.random.seed(0)

random_array = np.random.randint(
    0,
    10,
    size=(5, 3)
)

print(random_array)
```

Misalnya menghasilkan:

```text
[[5 0 3]
 [3 7 9]
 [3 5 2]
 [4 7 6]
 [8 8 1]]
```

Kemudian:

```python
unique_numbers = np.unique(random_array)

print(unique_numbers)
```

Hasilnya akan berisi nilai unik yang terdapat di seluruh array:

```text
[0 1 2 3 4 5 6 7 8 9]
```

Perhatikan bahwa `np.unique()` pada contoh tersebut mencari nilai unik dari **seluruh elemen array**, bukan hanya satu baris atau satu kolom.

---

## 3. Kegunaan `np.unique()` dalam Data Science

Mengetahui nilai unik sangat berguna ketika melakukan eksplorasi data.

Misalnya kita memiliki data kategori:

```text
["Toyota", "Honda", "Toyota", "BMW", "Honda"]
```

Kita mungkin ingin mengetahui kategori yang tersedia:

```text
Toyota
Honda
BMW
```

Dalam NumPy, konsep tersebut dapat dilakukan menggunakan:

```python
np.unique(data)
```

Dalam proses Data Science, informasi nilai unik dapat membantu kita:

- Memahami kategori dalam dataset.
- Menemukan data yang tidak sesuai.
- Memeriksa hasil preprocessing.
- Memeriksa nilai pada data kategorikal.
- Melakukan eksplorasi awal terhadap dataset.

---

## 4. Vector, Matrix, dan Array

Sebelum mempelajari indexing, kita perlu memahami beberapa istilah.

### Vector

Vector biasanya digunakan untuk menyebut array satu dimensi.

Contoh:

```python
vector = np.array([1, 2, 3])
```

Shape:

```text
(3,)
```

Secara visual:

```text
[1 2 3]
```

---

### Matrix

Matrix biasanya digunakan untuk menyebut array dua dimensi.

Contoh:

```python
matrix = np.array([
    [1, 2, 3],
    [4, 5, 6]
])
```

Shape:

```text
(2, 3)
```

Secara visual:

```text
1  2  3
4  5  6
```

---

### `ndarray`

`ndarray` adalah struktur data utama NumPy yang dapat memiliki satu atau lebih dimensi.

Dengan demikian:

```text
1D → ndarray
2D → ndarray
3D → ndarray
4D → ndarray
...
```

Istilah vector dan matrix lebih banyak digunakan untuk menggambarkan struktur atau konteks matematis, sedangkan `ndarray` merupakan tipe objek yang digunakan NumPy.

---

## 5. Zero-Based Indexing

NumPy menggunakan **zero-based indexing**.

Artinya, index dimulai dari `0`.

Misalnya:

```python
numbers = np.array([10, 20, 30, 40])
```

Indexnya:

```text
Index     0    1    2    3
          ↓    ↓    ↓    ↓
Value    10   20   30   40
```

Sehingga:

```python
numbers[0]
```

menghasilkan:

```text
10
```

Sedangkan:

```python
numbers[2]
```

menghasilkan:

```text
30
```

---

## 6. Indexing pada Array 1D

Untuk array satu dimensi, kita hanya membutuhkan satu index.

Contoh:

```python
A1 = np.array([1, 2, 3])

print(A1[0])
```

Output:

```text
1
```

Untuk elemen kedua:

```python
print(A1[1])
```

Output:

```text
2
```

Untuk elemen terakhir:

```python
print(A1[2])
```

Output:

```text
3
```

Kita juga dapat menggunakan index negatif.

Contoh:

```python
print(A1[-1])
```

Hasil:

```text
3
```

Index `-1` berarti elemen terakhir.

---

## 7. Indexing pada Array 2D

Pada array dua dimensi, kita dapat mengakses data berdasarkan baris dan kolom.

Contoh:

```python
A2 = np.array([
    [1, 2, 3],
    [4, 5, 6]
])
```

Strukturnya:

```text
       Kolom
        0  1  2
       ─────────
Baris 0│ 1  2  3
Baris 1│ 4  5  6
```

Untuk mengambil baris pertama:

```python
A2[0]
```

hasilnya:

```text
[1 2 3]
```

Untuk mengambil elemen pada baris pertama dan kolom kedua:

```python
A2[0, 1]
```

hasilnya:

```text
2
```

Urutannya:

```text
array[baris, kolom]
```

---

## 8. Contoh Indexing 2D

Dengan array:

```python
A2 = np.array([
    [1, 2, 3],
    [4, 5, 6]
])
```

Beberapa contoh:

```python
A2[0, 0]
```

hasil:

```text
1
```

```python
A2[0, 2]
```

hasil:

```text
3
```

```python
A2[1, 0]
```

hasil:

```text
4
```

```python
A2[1, 2]
```

hasil:

```text
6
```

Pola yang perlu diingat:

```text
A2[row, column]
```

---

## 9. Indexing pada Array 3D

Ketika array memiliki tiga dimensi, kita membutuhkan tiga index.

Contoh:

```python
A3 = np.random.randint(
    10,
    size=(2, 3, 3)
)
```

Shape:

```text
(2, 3, 3)
```

Artinya:

```text
2 bagian
×
3 baris
×
3 kolom
```

Secara konsep:

```text
Array 3D
│
├── Bagian 0
│   ├── Baris 0
│   ├── Baris 1
│   └── Baris 2
│
└── Bagian 1
    ├── Baris 0
    ├── Baris 1
    └── Baris 2
```

Untuk mengambil bagian pertama:

```python
A3[0]
```

Hasilnya adalah sebuah array 2D berukuran:

```text
(3, 3)
```

---

## 10. Indexing Elemen pada Array 3D

Untuk mengambil satu elemen dari array 3D, kita dapat menggunakan:

```text
array[dimensi_pertama, dimensi_kedua, dimensi_ketiga]
```

Contoh:

```python
A3[0, 1, 2]
```

Cara membacanya:

```text
Bagian pertama
    ↓
Baris kedua
    ↓
Kolom ketiga
```

Dengan demikian, kita mengambil satu nilai tertentu dari array 3D.

---

## 11. Memahami Shape Sebelum Indexing

Sebelum melakukan indexing pada array multidimensi, biasakan memeriksa `.shape`.

Contoh:

```python
A3.shape
```

Misalnya hasilnya:

```text
(2, 3, 3)
```

Kita dapat membaca:

```text
Dimensi 1 → 2
Dimensi 2 → 3
Dimensi 3 → 3
```

Kemudian indexing:

```python
A3[0, 1, 2]
```

menggunakan tiga index karena array memiliki tiga dimensi.

Memahami `.shape` terlebih dahulu dapat membantu menghindari kesalahan indexing.

---

## 12. Slicing pada NumPy

Selain mengambil satu elemen, kita juga dapat mengambil **sebagian data** menggunakan slicing.

Slicing digunakan untuk mengambil rentang elemen dari array.

Untuk array satu dimensi:

```python
numbers = np.array([
    10, 20, 30, 40, 50
])
```

Kita dapat mengambil tiga elemen pertama:

```python
numbers[:3]
```

Hasil:

```text
[10 20 30]
```

Aturan slicing secara umum:

```text
start : stop
```

Nilai `stop` tidak termasuk.

---

## 13. Slicing pada Array 2D

Untuk array dua dimensi, kita dapat melakukan slicing pada baris dan kolom.

Contoh:

```python
A2 = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])
```

Kita dapat mengambil dua baris pertama:

```python
A2[:2]
```

Hasil:

```text
[[1 2 3]
 [4 5 6]]
```

Kita juga dapat mengambil dua kolom pertama:

```python
A2[:, :2]
```

Hasil:

```text
[[1 2]
 [4 5]
 [7 8]]
```

Pola:

```text
array[baris, kolom]
```

Tanda `:` berarti mengambil seluruh bagian pada dimensi tersebut.

---

## 14. Slicing pada Array 3D

Untuk array 3D, kita dapat melakukan slicing pada setiap dimensi.

Misalnya:

```python
A3 = np.random.randint(
    10,
    size=(2, 3, 3)
)
```

Kita dapat mengambil sebagian data:

```python
A3[:2, :2, :2]
```

Cara membacanya:

```text
Dimensi pertama → ambil 2 bagian pertama
Dimensi kedua   → ambil 2 baris pertama
Dimensi ketiga  → ambil 2 kolom pertama
```

Dengan demikian, kita mendapatkan subset dari array asli.

---

## 15. Pola Slicing Multidimensi

Pada array multidimensi, pola umum slicing adalah:

```python
array[dimensi_1, dimensi_2, dimensi_3, ...]
```

Misalnya array 3D:

```python
A3[:2, :2, :2]
```

Terdapat tiga bagian slicing:

```text
:2
:2
:2
```

Masing-masing diterapkan pada dimensi yang sesuai.

---

## 16. Slicing Array 4D

NumPy juga dapat bekerja dengan array empat dimensi.

Contoh:

```python
A4 = np.random.randint(
    10,
    size=(2, 3, 4, 5)
)
```

Shape:

```text
(2, 3, 4, 5)
```

Artinya array memiliki empat dimensi:

```text
Dimensi 1 → 2
Dimensi 2 → 3
Dimensi 3 → 4
Dimensi 4 → 5
```

Untuk mengambil empat elemen pertama dari dimensi terdalam:

```python
A4[:, :, :, :4]
```

Tiga bagian pertama menggunakan `:` sehingga seluruh data pada dimensi tersebut dipertahankan.

Bagian terakhir:

```text
:4
```

mengambil empat elemen pertama pada dimensi terdalam.

---

## 17. Memahami Dimensi Terluar dan Terdalam

Pada shape:

```text
(2, 3, 4, 5)
```

angka yang paling kiri merupakan dimensi terluar, sedangkan angka yang paling kanan merupakan dimensi terdalam.

Secara sederhana:

```text
(2, 3, 4, 5)
 ↑        ↑
luar    dalam
```

Sehingga:

```python
A4[:, :, :, :4]
```

mengubah bagian terakhir dari:

```text
5 elemen
```

menjadi:

```text
4 elemen
```

sedangkan dimensi lainnya tetap dipertahankan.

---

## 18. Slicing dengan Step

Slicing juga dapat menggunakan `step`.

Sintaks:

```text
start : stop : step
```

Contoh:

```python
numbers = np.array([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
])
```

Mengambil setiap dua elemen:

```python
numbers[::2]
```

Hasil:

```text
[0 2 4 6 8]
```

Contoh lainnya:

```python
numbers[1::2]
```

Hasil:

```text
[1 3 5 7 9]
```

---

## 19. Indexing Negatif

NumPy juga mendukung negative indexing.

Contoh:

```python
numbers = np.array([
    10, 20, 30, 40, 50
])
```

Elemen terakhir:

```python
numbers[-1]
```

hasil:

```text
50
```

Elemen kedua dari belakang:

```python
numbers[-2]
```

hasil:

```text
40
```

Negative indexing dapat digunakan pada array multidimensi.

Contoh:

```python
A2[-1]
```

akan mengambil baris terakhir.

Sedangkan:

```python
A2[:, -1]
```

akan mengambil kolom terakhir.

---

## 20. Perbedaan Indexing dan Slicing

Indexing dan slicing memiliki tujuan yang berbeda.

| Teknik | Tujuan |
|---|---|
| Indexing | Mengambil elemen atau bagian tertentu berdasarkan posisi |
| Slicing | Mengambil rentang atau subset data |

Contoh indexing:

```python
numbers[2]
```

mengambil satu elemen.

Contoh slicing:

```python
numbers[1:4]
```

mengambil beberapa elemen.

Secara sederhana:

```text
Indexing
    ↓
Ambil data tertentu

Slicing
    ↓
Ambil sebagian data
```

---

## 21. Memeriksa `.shape` dan `.ndim`

Sebelum melakukan indexing atau slicing yang kompleks, biasakan memeriksa:

```python
A4.shape
```

dan:

```python
A4.ndim
```

Misalnya:

```python
print(A4.shape)
print(A4.ndim)
```

Output:

```text
(2, 3, 4, 5)
4
```

Dari informasi tersebut kita mengetahui bahwa:

- Array memiliki 4 dimensi.
- Dimensi pertama berukuran 2.
- Dimensi kedua berukuran 3.
- Dimensi ketiga berukuran 4.
- Dimensi keempat berukuran 5.

Informasi ini membantu kita menentukan berapa banyak index yang dibutuhkan.

---

## 22. Error: Too Many Indices

Salah satu error yang mungkin muncul ketika melakukan indexing adalah:

```text
IndexError: too many indices for array
```

Contohnya kita memiliki array 1D:

```python
A1 = np.array([1, 2, 3])
```

Kemudian mencoba:

```python
A1[0, 1]
```

Ini salah karena `A1` hanya memiliki satu dimensi.

Kita hanya dapat menggunakan satu index:

```python
A1[0]
```

Untuk menghindari masalah seperti ini, periksa terlebih dahulu:

```python
A1.ndim
```

dan:

```python
A1.shape
```

---

## 23. Praktik: Membuat dan Memeriksa Array

Berikut contoh latihan sederhana:

```python
import numpy as np

np.random.seed(0)

A = np.random.randint(
    0,
    10,
    size=(5, 3)
)

print("Array:")
print(A)

print("\nShape:")
print(A.shape)

print("\nDimensions:")
print(A.ndim)

print("\nUnique values:")
print(np.unique(A))
```

Kode tersebut melakukan beberapa langkah:

```text
Membuat array
     ↓
Memeriksa shape
     ↓
Memeriksa dimensi
     ↓
Mencari nilai unik
```

---

## 24. Praktik Indexing

Gunakan array berikut:

```python
A = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])
```

Cobalah menjalankan:

```python
A[0]
```

Kemudian:

```python
A[1]
```

Kemudian:

```python
A[0, 1]
```

Dan:

```python
A[2, 2]
```

Perhatikan bagaimana perubahan index memengaruhi data yang diambil.

---

## 25. Praktik Slicing

Dengan array yang sama:

```python
A = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])
```

Cobalah:

```python
A[:2]
```

Kemudian:

```python
A[:, :2]
```

Dan:

```python
A[:2, :2]
```

Bandingkan hasil masing-masing operasi.

Latihan seperti ini akan membantu memahami bagaimana slicing bekerja pada array multidimensi.

---

## 26. Tips Belajar dengan Jupyter Notebook

Ketika lupa cara menggunakan sebuah fungsi NumPy, kita dapat menggunakan bantuan dokumentasi di Jupyter Notebook.

Misalnya:

```python
np.unique(
```

Letakkan kursor di dalam tanda kurung kemudian tekan:

```text
Shift + Tab
```

Jupyter akan menampilkan informasi mengenai fungsi tersebut.

Kebiasaan ini sangat berguna ketika kita belum hafal:

- nama parameter,
- urutan parameter,
- fungsi yang tersedia,
- dan cara menggunakan sebuah method atau function.

---

## 27. Best Practice saat Indexing dan Slicing

Beberapa kebiasaan yang baik ketika bekerja dengan NumPy:

### Periksa Shape

Selalu periksa:

```python
array.shape
```

sebelum melakukan operasi multidimensi yang kompleks.

### Periksa Dimensi

Gunakan:

```python
array.ndim
```

untuk mengetahui berapa dimensi yang tersedia.

### Mulai dari Contoh Sederhana

Sebelum menggunakan array 4D, pahami terlebih dahulu:

```text
1D → 2D → 3D → 4D
```

### Gunakan Print untuk Memeriksa Hasil

Contoh:

```python
print(array)
print(array.shape)
```

Dengan demikian kita dapat melihat apakah operasi yang dilakukan menghasilkan data sesuai harapan.

---

## 28. Ringkasan

Pada materi ini kita telah mempelajari bagaimana melihat dan mengambil data dari NumPy array.

Konsep utama yang perlu dipahami:

### `np.unique()`

Digunakan untuk mendapatkan nilai unik dari array.

```python
np.unique(array)
```

### Indexing

Digunakan untuk mengambil elemen atau bagian tertentu berdasarkan index.

```python
array[index]
```

Untuk array 2D:

```python
array[row, column]
```

Untuk array 3D:

```python
array[index_1, index_2, index_3]
```

### Slicing

Digunakan untuk mengambil sebagian data.

```python
array[start:stop]
```

Pada multidimensi:

```python
array[start:stop, start:stop]
```

### Shape dan Dimensi

Sebelum melakukan indexing dan slicing, pahami:

```python
array.shape
```

dan:

```python
array.ndim
```

Dengan memahami kedua informasi tersebut, kita dapat menentukan struktur array dan jumlah index yang dibutuhkan.

---

## Checklist

Sebelum melanjutkan ke materi berikutnya, pastikan Anda sudah memahami:

- [ ] Fungsi `np.unique()`.
- [ ] Cara mendapatkan nilai unik dari array.
- [ ] Perbedaan vector dan matrix.
- [ ] Apa yang dimaksud dengan `ndarray`.
- [ ] Konsep zero-based indexing.
- [ ] Cara melakukan indexing pada array 1D.
- [ ] Cara melakukan indexing pada array 2D.
- [ ] Cara melakukan indexing pada array 3D.
- [ ] Cara melakukan slicing pada array.
- [ ] Cara melakukan slicing pada array multidimensi.
- [ ] Cara menggunakan negative indexing.
- [ ] Cara menggunakan `step` pada slicing.
- [ ] Cara membaca `.shape`.
- [ ] Cara menggunakan `.ndim`.
- [ ] Mengapa memahami shape penting sebelum indexing.
- [ ] Penyebab error `too many indices for array`.
- [ ] Cara menggunakan `Shift + Tab` untuk melihat dokumentasi di Jupyter Notebook.
