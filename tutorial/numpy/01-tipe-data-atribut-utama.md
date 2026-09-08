---
sidebar_position: 2
title: "Tipe Data & Atribut Utama"
---

Setelah memahami apa itu NumPy dan perannya dalam Data Science serta Machine Learning, langkah berikutnya adalah mulai bekerja secara langsung dengan NumPy.

Pada materi ini kita akan mempelajari struktur data utama NumPy, yaitu **`ndarray`**, serta berbagai atribut yang dapat digunakan untuk memahami karakteristik sebuah array.

Beberapa konsep yang akan dipelajari:

- Cara mengimpor NumPy.
- Mengenal `ndarray`.
- Array 1 dimensi, 2 dimensi, dan multidimensi.
- Memahami dimensi dan `axis`.
- Memahami `.shape`.
- Memahami `.ndim`.
- Memahami `.dtype`.
- Memahami `.size`.
- Memahami `type()`.
- Hubungan antara NumPy dan Pandas.

---

## 1. Persiapan Environment

Sebelum mulai menggunakan NumPy, kita membutuhkan environment Python yang dapat digunakan untuk menjalankan kode.

Jika menggunakan Conda, aktifkan environment yang digunakan untuk project.

Contoh:

```bash
conda activate nama-environment
```

Setelah environment aktif, jalankan Jupyter Notebook:

```bash
jupyter notebook
```

Kemudian buat notebook baru untuk mempraktikkan materi NumPy.

Misalnya kita dapat memberikan nama:

```text
Introduction to NumPy
```

> Nama notebook bebas disesuaikan dengan struktur project yang digunakan.

---

## 2. Mengimpor NumPy

Sebelum menggunakan NumPy, kita perlu mengimpornya terlebih dahulu.

Konvensi yang paling umum digunakan adalah:

```python
import numpy as np
```

Bagian:

```python
import numpy
```

digunakan untuk mengimpor library NumPy.

Sedangkan:

```python
as np
```

memberikan alias `np` sehingga kita dapat menggunakan NumPy dengan penulisan yang lebih singkat.

Contohnya:

```python
np.array([1, 2, 3])
```

Daripada harus menulis:

```python
numpy.array([1, 2, 3])
```

Dalam ekosistem Python, `np` merupakan alias yang sangat umum digunakan untuk NumPy.

---

## 3. Tipe Data Utama NumPy: `ndarray`

Struktur data utama NumPy adalah **`ndarray`**.

`ndarray` merupakan singkatan dari **N-dimensional array**, yaitu array yang dapat memiliki satu atau lebih dimensi.

Contohnya:

```python
a1 = np.array([1, 2, 3])
```

Kita dapat memeriksa tipe objek tersebut:

```python
type(a1)
```

Hasilnya:

```text
numpy.ndarray
```

Artinya, objek `a1` merupakan sebuah NumPy `ndarray`.

---

## 4. Array 1 Dimensi

Array satu dimensi merupakan bentuk array paling sederhana.

Contoh:

```python
a1 = np.array([1, 2, 3])
```

Jika ditampilkan:

```text
[1 2 3]
```

Array ini memiliki satu dimensi.

Secara sederhana, kita dapat membayangkannya sebagai sebuah barisan data:

```text
1   2   3
```

Array seperti ini sering disebut sebagai **vector** dalam konteks matematika dan Machine Learning.

Kita dapat memeriksa dimensinya:

```python
a1.ndim
```

Hasil:

```text
1
```

Kita juga dapat memeriksa bentuknya:

```python
a1.shape
```

Hasil:

```text
(3,)
```

Artinya terdapat 3 elemen pada satu dimensi.

---

## 5. Array 2 Dimensi

NumPy juga dapat membuat array dengan dua dimensi.

Contoh:

```python
a2 = np.array([
    [1, 2.0, 3.3],
    [4, 5.0, 6.5]
])
```

Hasilnya dapat dibayangkan sebagai:

```text
1    2.0    3.3
4    5.0    6.5
```

Array tersebut memiliki:

- 2 baris.
- 3 kolom.

Kita dapat memeriksa dimensinya:

```python
a2.ndim
```

Hasil:

```text
2
```

Sedangkan:

```python
a2.shape
```

menghasilkan:

```text
(2, 3)
```

Angka pertama menunjukkan jumlah baris, sedangkan angka kedua menunjukkan jumlah kolom.

Dalam konteks matematika, array dua dimensi sering disebut sebagai **matrix**.

---

## 6. Array 3 Dimensi

NumPy juga dapat bekerja dengan array tiga dimensi atau lebih.

Contoh:

```python
a3 = np.array([
    [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ],
    [
        [10, 11, 12],
        [13, 14, 15],
        [16, 17, 18]
    ]
])
```

Array tersebut memiliki struktur bertingkat.

Secara sederhana:

```text
Array
├── Layer 1
│   ├── [1, 2, 3]
│   ├── [4, 5, 6]
│   └── [7, 8, 9]
│
└── Layer 2
    ├── [10, 11, 12]
    ├── [13, 14, 15]
    └── [16, 17, 18]
```

Kita dapat memeriksa dimensinya:

```python
a3.ndim
```

Hasil:

```text
3
```

Sedangkan:

```python
a3.shape
```

menghasilkan:

```text
(2, 3, 3)
```

Artinya:

- 2 layer.
- Setiap layer memiliki 3 baris.
- Setiap baris memiliki 3 elemen.

---

## 7. Memahami Dimensi Array

Ketika bekerja dengan NumPy, penting untuk memahami apa yang dimaksud dengan **dimensi**.

Perhatikan contoh berikut.

### 1 Dimensi

```python
a1 = np.array([1, 2, 3])
```

Shape:

```text
(3,)
```

### 2 Dimensi

```python
a2 = np.array([
    [1, 2, 3],
    [4, 5, 6]
])
```

Shape:

```text
(2, 3)
```

### 3 Dimensi

```python
a3 = np.array([
    [
        [1, 2, 3],
        [4, 5, 6]
    ],
    [
        [7, 8, 9],
        [10, 11, 12]
    ]
])
```

Shape:

```text
(2, 2, 3)
```

Semakin tinggi dimensinya, semakin kompleks struktur data yang dapat direpresentasikan.

---

## 8. Memahami `axis`

Selain dimensi, kita akan sering menemukan istilah **axis** ketika bekerja dengan NumPy.

Axis menunjukkan arah atau dimensi yang menjadi acuan ketika melakukan operasi terhadap array.

Untuk array dua dimensi:

```text
       Kolom
        ↓
      0   1   2
    ┌─────────────
  0 │ 1   2   3
  1 │ 4   5   6
  2 │ 7   8   9
```

Secara umum:

- `axis=0` mengacu pada dimensi pertama.
- `axis=1` mengacu pada dimensi kedua.

Namun, penting untuk tidak menghafalkan `axis=0` sebagai sekadar "baris" dan `axis=1` sebagai sekadar "kolom" tanpa melihat operasi yang dilakukan.

Cara yang lebih tepat adalah memahami bahwa axis menunjukkan **arah/dimensi yang digunakan sebagai acuan operasi**.

Contohnya ketika melakukan operasi agregasi:

```python
a2.sum(axis=0)
```

Operasi tersebut melakukan penjumlahan sepanjang axis 0 sehingga menghasilkan penjumlahan untuk setiap kolom.

Sedangkan:

```python
a2.sum(axis=1)
```

melakukan penjumlahan sepanjang axis 1 sehingga menghasilkan penjumlahan untuk setiap baris.

---

### Anatomi NumPy array

![Anatomi NumPy Array](/img/python/numpy1.webp)

---

## 9. Memahami `.shape`

Atribut `.shape` digunakan untuk mengetahui bentuk atau ukuran setiap dimensi array.

Contoh:

```python
a2.shape
```

Jika hasilnya:

```text
(2, 3)
```

berarti array memiliki:

```text
2 baris × 3 kolom
```

Untuk array tiga dimensi:

```python
a3.shape
```

misalnya menghasilkan:

```text
(2, 3, 3)
```

Artinya terdapat tiga dimensi dengan ukuran:

```text
2 × 3 × 3
```

`.shape` sangat penting dalam Machine Learning karena banyak algoritma membutuhkan data dengan bentuk tertentu.

---

## 10. Memahami `.ndim`

Atribut `.ndim` digunakan untuk mengetahui jumlah dimensi sebuah array.

Contoh:

```python
a1.ndim
```

Hasil:

```text
1
```

Untuk array dua dimensi:

```python
a2.ndim
```

Hasil:

```text
2
```

Untuk array tiga dimensi:

```python
a3.ndim
```

Hasil:

```text
3
```

Dengan demikian:

```text
.ndim → berapa banyak dimensi?
.shape → berapa ukuran pada setiap dimensi?
```

Keduanya sangat sering digunakan bersama ketika memeriksa data.

---

## 11. Memahami `.dtype`

Atribut `.dtype` digunakan untuk mengetahui tipe data elemen yang disimpan dalam NumPy array.

Contoh:

```python
a1.dtype
```

Jika array berisi bilangan bulat:

```python
a1 = np.array([1, 2, 3])
```

hasilnya dapat berupa:

```text
int64
```

Tipe yang muncul dapat berbeda tergantung sistem dan platform yang digunakan.

Jika array berisi angka desimal:

```python
a2 = np.array([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0]
])
```

maka:

```python
a2.dtype
```

dapat menghasilkan:

```text
float64
```

---

## 12. NumPy dan Tipe Data Campuran

NumPy memiliki aturan mengenai tipe data yang disimpan dalam sebuah array.

Misalnya:

```python
a = np.array([1, 2, 3.5])
```

Array tersebut memiliki bilangan bulat dan bilangan desimal.

NumPy akan melakukan konversi sehingga elemen dapat disimpan dengan tipe data yang sesuai.

Kita dapat memeriksanya:

```python
a.dtype
```

Hasilnya dapat berupa:

```text
float64
```

Karena terdapat nilai desimal:

```text
3.5
```

maka nilai integer dapat dikonversi menjadi tipe floating point.

Hal ini penting untuk dipahami karena tipe data dapat memengaruhi bagaimana data disimpan dan diproses.

---

## 13. Memahami `.size`

Atribut `.size` digunakan untuk mengetahui **jumlah seluruh elemen** dalam array.

Contoh:

```python
a1 = np.array([1, 2, 3])
```

Kemudian:

```python
a1.size
```

menghasilkan:

```text
3
```

Untuk array:

```python
a2 = np.array([
    [1, 2, 3],
    [4, 5, 6]
])
```

terdapat:

```text
2 × 3 = 6
```

elemen.

Sehingga:

```python
a2.size
```

menghasilkan:

```text
6
```

Untuk array tiga dimensi:

```python
a3.shape
```

misalnya:

```text
(2, 3, 3)
```

Maka jumlah elemennya:

```text
2 × 3 × 3 = 18
```

dan:

```python
a3.size
```

akan menghasilkan:

```text
18
```

---

## 14. Memahami `type()`

Selain atribut NumPy, kita juga dapat menggunakan fungsi Python `type()`.

Contoh:

```python
type(a1)
```

Hasil:

```text
numpy.ndarray
```

Perhatikan perbedaan berikut:

```python
type(a1)
```

digunakan untuk mengetahui **tipe objek Python**.

Sedangkan:

```python
a1.dtype
```

digunakan untuk mengetahui **tipe data elemen di dalam NumPy array**.

Contohnya:

```python
type(a1)
```

dapat menghasilkan:

```text
numpy.ndarray
```

sedangkan:

```python
a1.dtype
```

dapat menghasilkan:

```text
int64
```

Jadi keduanya memberikan informasi yang berbeda.

---

## 15. Ringkasan Atribut NumPy

Beberapa atribut penting yang perlu diingat:

| Atribut/Fungsi | Kegunaan | Contoh hasil |
|---|---|---|
| `type(array)` | Mengetahui tipe objek | `numpy.ndarray` |
| `.ndim` | Mengetahui jumlah dimensi | `2` |
| `.shape` | Mengetahui ukuran setiap dimensi | `(2, 3)` |
| `.size` | Mengetahui jumlah seluruh elemen | `6` |
| `.dtype` | Mengetahui tipe data elemen | `int64` |

Cara sederhana untuk mengingatnya:

```text
type() → objeknya apa?
ndim   → berapa dimensi?
shape  → ukurannya bagaimana?
size   → berapa total elemennya?
dtype  → tipe data elemennya apa?
```

---

## 16. Memeriksa Beberapa Atribut Sekaligus

Ketika mendapatkan sebuah array baru, kita dapat langsung memeriksa karakteristiknya.

Contoh:

```python
import numpy as np

a2 = np.array([
    [1, 2.0, 3.3],
    [4, 5.0, 6.5]
])

print(type(a2))
print(a2.ndim)
print(a2.shape)
print(a2.size)
print(a2.dtype)
```

Dengan cara ini kita dapat memperoleh gambaran mengenai struktur array sebelum melakukan operasi lebih lanjut.

Kebiasaan memeriksa struktur data seperti ini sangat berguna ketika bekerja dengan dataset nyata.

---

## 17. Hubungan NumPy dan Pandas

NumPy dan Pandas memiliki hubungan yang sangat dekat dalam ekosistem Data Science Python.

Pandas menggunakan banyak konsep dan struktur berbasis NumPy dalam implementasinya, meskipun arsitektur internal Pandas modern juga menggunakan komponen lain.

Secara konseptual:

```text
NumPy
  ↓
Array numerik
  ↓
Pandas
  ↓
DataFrame dan Series
  ↓
Analisis Data
```

NumPy lebih berfokus pada komputasi numerik dan array.

Pandas lebih berfokus pada manipulasi dan analisis data berbentuk tabel.

---

## 18. Mengubah NumPy Array Menjadi DataFrame

NumPy array dapat digunakan untuk membuat Pandas DataFrame.

Contoh:

```python
import numpy as np
import pandas as pd

a2 = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

df = pd.DataFrame(a2)

print(df)
```

Hasilnya:

```text
   0  1  2
0  1  2  3
1  4  5  6
```

Pandas memberikan index dan nama kolom secara otomatis.

Dengan demikian, NumPy array dapat menjadi salah satu sumber data untuk DataFrame.

---

## 19. NumPy dalam Workflow Data Science

Dalam project Data Science dan Machine Learning, NumPy dapat muncul pada berbagai tahap.

Contohnya:

```text
Data mentah
    ↓
Pandas
    ↓
Eksplorasi dan pembersihan
    ↓
NumPy
    ↓
Operasi numerik
    ↓
Preprocessing
    ↓
Machine Learning
```

Namun, workflow sebenarnya dapat berbeda tergantung project.

Kita tidak harus selalu mengubah seluruh data menjadi NumPy array secara manual.

Library seperti Pandas dan Scikit-Learn dapat menangani berbagai bentuk data dan melakukan konversi secara internal ketika diperlukan.

---

## 20. Contoh Praktik Dasar

Berikut latihan sederhana untuk memahami atribut NumPy.

```python
import numpy as np

numbers = np.array([
    [10, 20, 30],
    [40, 50, 60]
])

print("Array:")
print(numbers)

print("Tipe objek:")
print(type(numbers))

print("Jumlah dimensi:")
print(numbers.ndim)

print("Shape:")
print(numbers.shape)

print("Jumlah elemen:")
print(numbers.size)

print("Tipe data:")
print(numbers.dtype)
```

Cobalah mengubah isi array menjadi:

```python
numbers = np.array([
    [1.5, 2.5, 3.5],
    [4.5, 5.5, 6.5]
])
```

Kemudian perhatikan perubahan pada:

```python
numbers.dtype
```

Cobalah juga membuat array dengan tiga dimensi dan periksa:

```python
numbers.ndim
numbers.shape
numbers.size
numbers.dtype
```

Latihan sederhana seperti ini akan membantu membangun pemahaman mengenai struktur `ndarray`.

---

## 21. Hal yang Perlu Diperhatikan

Ketika mulai bekerja dengan NumPy, beberapa hal penting yang perlu diperhatikan adalah:

1. `ndarray` merupakan struktur data utama NumPy.
2. Array dapat memiliki satu atau banyak dimensi.
3. `.ndim` menunjukkan jumlah dimensi.
4. `.shape` menunjukkan ukuran pada setiap dimensi.
5. `.size` menunjukkan jumlah seluruh elemen.
6. `.dtype` menunjukkan tipe data elemen.
7. `type()` menunjukkan tipe objek Python.
8. `axis` digunakan untuk menentukan dimensi atau arah operasi.
9. Shape data sangat penting ketika bekerja dengan Machine Learning.
10. NumPy dan Pandas dapat digunakan bersama dalam workflow Data Science.

---

## 22. Kesimpulan

NumPy menyediakan struktur data yang sangat penting untuk komputasi numerik di Python.

Struktur utamanya adalah:

```text
numpy.ndarray
```

Array tersebut dapat memiliki berbagai bentuk:

```text
1D → Vector
2D → Matrix
3D+ → Multidimensional Array
```

Untuk memahami sebuah array, kita dapat menggunakan:

```text
type()
ndim
shape
size
dtype
```

Memahami kelima informasi tersebut merupakan dasar penting sebelum mempelajari manipulasi array yang lebih kompleks.

Selain itu, pemahaman mengenai **dimensi dan axis** akan menjadi sangat penting ketika mulai melakukan operasi terhadap array dan bekerja dengan data Machine Learning.

## Checklist

Sebelum melanjutkan ke materi berikutnya, pastikan Anda sudah memahami:

- [ ] Cara mengimpor NumPy menggunakan `import numpy as np`.
- [ ] Apa yang dimaksud dengan `ndarray`.
- [ ] Perbedaan array 1D, 2D, dan 3D.
- [ ] Apa yang dimaksud dengan dimensi.
- [ ] Konsep dasar `axis`.
- [ ] Fungsi `.shape`.
- [ ] Fungsi `.ndim`.
- [ ] Fungsi `.dtype`.
- [ ] Fungsi `.size`.
- [ ] Perbedaan `type()` dan `.dtype`.
- [ ] Hubungan NumPy dengan Pandas.
- [ ] Cara mengubah NumPy array menjadi DataFrame.
