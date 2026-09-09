---
sidebar_position: 12
title: "Comparison Operators"
---

Pada materi sebelumnya kita telah mempelajari dot product dan bagaimana NumPy dapat digunakan untuk melakukan perhitungan terhadap array dan matriks.

Sekarang kita akan mempelajari **comparison operators** atau operator pembandingan pada NumPy.

Comparison operators digunakan untuk membandingkan nilai dalam array berdasarkan suatu kondisi.

Contohnya:

```text
Apakah nilai lebih besar dari 5?
Apakah nilai lebih kecil dari 10?
Apakah nilai sama dengan 20?
Apakah nilai tidak sama dengan 15?
```

NumPy memungkinkan operator pembandingan Python digunakan langsung pada array.

Hasilnya bukan satu nilai `True` atau `False`, tetapi **array Boolean** yang berisi hasil pembandingan untuk setiap elemen.

---

## Apa Itu Comparison Operators?

Comparison operators adalah operator yang digunakan untuk membandingkan dua nilai.

Python menyediakan beberapa operator pembandingan:

| Operator | Arti |
|---|---|
| `>` | Lebih besar dari |
| `<` | Lebih kecil dari |
| `>=` | Lebih besar atau sama dengan |
| `<=` | Lebih kecil atau sama dengan |
| `==` | Sama dengan |
| `!=` | Tidak sama dengan |

Operator tersebut juga dapat digunakan pada NumPy array.

---

## Element-Wise Comparison

Ketika melakukan pembandingan pada NumPy array, pembandingan dilakukan secara **element-wise**.

Artinya, setiap elemen dibandingkan dengan elemen lain yang berada pada posisi yang sama.

Contohnya:

```python
import numpy as np

a1 = np.array([1, 2, 3])
a2 = np.array([1, 2, 3.3])
```

Kita dapat membandingkan:

```python
a1 > a2
```

Hasil:

```text
[False False False]
```

NumPy melakukan:

```text
1 > 1   → False
2 > 2   → False
3 > 3.3 → False
```

---

## Operator Lebih Besar

Operator `>` digunakan untuk memeriksa apakah suatu nilai lebih besar dari nilai lainnya.

Contoh:

```python
a1 = np.array([1, 2, 3])
a2 = np.array([1, 2, 3.3])

result = a1 > a2

print(result)
```

Output:

```text
[False False False]
```

Karena:

```text
1 > 1   → False
2 > 2   → False
3 > 3.3 → False
```

---

## Operator Lebih Kecil

Operator `<` digunakan untuk memeriksa apakah suatu nilai lebih kecil dari nilai lainnya.

```python
result = a1 < a2

print(result)
```

Output:

```text
[False False  True]
```

Karena:

```text
1 < 1   → False
2 < 2   → False
3 < 3.3 → True
```

---

## Operator Lebih Besar atau Sama Dengan

Operator `>=` digunakan untuk memeriksa apakah nilai lebih besar atau sama dengan nilai lainnya.

```python
result = a1 >= a2

print(result)
```

Output:

```text
[ True  True False]
```

Penjelasannya:

```text
1 >= 1   → True
2 >= 2   → True
3 >= 3.3 → False
```

---

## Operator Lebih Kecil atau Sama Dengan

Operator `<=` digunakan untuk memeriksa apakah nilai lebih kecil atau sama dengan nilai lainnya.

```python
result = a1 <= a2

print(result)
```

Output:

```text
[ True  True  True]
```

Karena:

```text
1 <= 1   → True
2 <= 2   → True
3 <= 3.3 → True
```

---

## Operator Sama Dengan

Operator `==` digunakan untuk memeriksa apakah nilai pada kedua array sama.

```python
result = a1 == a2

print(result)
```

Output:

```text
[ True  True False]
```

Penjelasannya:

```text
1 == 1   → True
2 == 2   → True
3 == 3.3 → False
```

Perlu diperhatikan bahwa:

```python
a1 == a2
```

menghasilkan Boolean untuk **setiap elemen**, bukan satu Boolean untuk seluruh array.

---

## Operator Tidak Sama Dengan

Operator `!=` digunakan untuk memeriksa apakah dua nilai berbeda.

```python
result = a1 != a2

print(result)
```

Output:

```text
[False False  True]
```

Karena:

```text
1 != 1   → False
2 != 2   → False
3 != 3.3 → True
```

---

## Tipe Data Hasil Comparison

Hasil comparison pada NumPy merupakan sebuah `ndarray`.

Contohnya:

```python
bool_array = a1 >= a2
```

Kita dapat memeriksa tipenya:

```python
print(type(bool_array))
```

Output:

```text
<class 'numpy.ndarray'>
```

Periksa tipe data elemennya:

```python
print(bool_array.dtype)
```

Output:

```text
bool
```

Jadi:

```text
Hasil comparison
       ↓
NumPy ndarray
       ↓
dtype = bool
       ↓
True / False
```

---

## Membandingkan Array dengan Skalar

NumPy juga memungkinkan kita membandingkan seluruh elemen array dengan satu nilai.

Nilai tunggal tersebut disebut **scalar**.

Contohnya:

```python
a1 = np.array([1, 2, 3])

print(a1 > 5)
```

Output:

```text
[False False False]
```

NumPy membandingkan setiap elemen dengan angka `5`:

```text
1 > 5 → False
2 > 5 → False
3 > 5 → False
```

---

## Contoh Operator `<` dengan Skalar

```python
print(a1 < 5)
```

Output:

```text
[ True  True  True]
```

Karena:

```text
1 < 5 → True
2 < 5 → True
3 < 5 → True
```

---

## Operator `>=` dengan Skalar

```python
print(a1 >= 2)
```

Output:

```text
[False  True  True]
```

Penjelasan:

```text
1 >= 2 → False
2 >= 2 → True
3 >= 2 → True
```

---

## Operator `<=` dengan Skalar

```python
print(a1 <= 2)
```

Output:

```text
[ True  True False]
```

Penjelasan:

```text
1 <= 2 → True
2 <= 2 → True
3 <= 2 → False
```

---

## Operator `==` dengan Skalar

```python
print(a1 == 2)
```

Output:

```text
[False  True False]
```

Hanya elemen dengan nilai `2` yang menghasilkan `True`.

---

## Operator `!=` dengan Skalar

```python
print(a1 != 2)
```

Output:

```text
[ True False  True]
```

Elemen yang nilainya bukan `2` menghasilkan `True`.

---

## Contoh Lengkap Comparison Operators

Kita dapat mencoba seluruh operator sekaligus:

```python
import numpy as np

a1 = np.array([1, 2, 3])

print("Lebih besar:", a1 > 2)
print("Lebih kecil:", a1 < 2)
print("Lebih besar atau sama:", a1 >= 2)
print("Lebih kecil atau sama:", a1 <= 2)
print("Sama dengan:", a1 == 2)
print("Tidak sama dengan:", a1 != 2)
```

Hasil:

```text
Lebih besar: [False False  True]
Lebih kecil: [ True False False]
Lebih besar atau sama: [False  True  True]
Lebih kecil atau sama: [ True  True False]
Sama dengan: [False  True False]
Tidak sama dengan: [ True False  True]
```

---

## Membandingkan Dua Array

Comparison juga dapat dilakukan antara dua array.

Contohnya:

```python
a1 = np.array([10, 20, 30])
a2 = np.array([5, 20, 40])

print(a1 > a2)
```

Hasil:

```text
[ True False False]
```

Karena:

```text
10 > 5  → True
20 > 20 → False
30 > 40 → False
```

---

## Syarat Shape dalam Comparison

Ketika membandingkan dua array, shape perlu diperhatikan.

Contohnya:

```python
a1 = np.array([1, 2, 3])
a2 = np.array([4, 5, 6])

print(a1 > a2)
```

Keduanya memiliki shape:

```text
(3,)
```

sehingga dapat dibandingkan element-wise.

Hasil:

```text
[False False False]
```

---

## Comparison dan Broadcasting

Seperti operasi aritmatika, comparison pada NumPy juga dapat memanfaatkan **broadcasting**.

Contohnya:

```python
a = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

print(a > 3)
```

Output:

```text
[[False False False]
 [ True  True  True]]
```

Satu nilai scalar `3` dibandingkan dengan seluruh elemen array.

Secara konsep:

```text
[1, 2, 3] > 3
[4, 5, 6] > 3
```

menghasilkan:

```text
[False, False, False]
[ True,  True,  True]
```

---

## Boolean Array

Hasil comparison disebut **Boolean array** karena setiap elemennya bernilai:

```text
True
```

atau:

```text
False
```

Contoh:

```python
a = np.array([10, 20, 30, 40, 50])

condition = a > 25

print(condition)
```

Output:

```text
[False False  True  True  True]
```

Boolean array tersebut dapat digunakan untuk menentukan elemen mana yang memenuhi kondisi tertentu.

---

## Boolean Array untuk Filtering

Salah satu penggunaan comparison yang paling penting adalah **filtering**.

Misalnya:

```python
a = np.array([10, 20, 30, 40, 50])

condition = a > 25

print(a[condition])
```

Output:

```text
[30 40 50]
```

Perhatikan prosesnya:

```text
Data:
[10, 20, 30, 40, 50]

Kondisi > 25:
[False, False, True, True, True]

Filtering:
[30, 40, 50]
```

Ini merupakan salah satu konsep dasar manipulasi data menggunakan NumPy.

---

## Filtering Tanpa Variabel Kondisi

Kita juga dapat menuliskan kondisi secara langsung:

```python
a = np.array([10, 20, 30, 40, 50])

print(a[a > 25])
```

Output:

```text
[30 40 50]
```

Cara ini sering digunakan ketika kondisi yang digunakan sederhana.

---

## Contoh Filtering Data

Misalnya terdapat data harga:

```python
prices = np.array([
    100,
    250,
    300,
    450,
    500
])
```

Kita ingin mendapatkan harga yang lebih besar dari `300`:

```python
print(prices[prices > 300])
```

Output:

```text
[450 500]
```

Dengan comparison operator, kita dapat memilih data berdasarkan kondisi.

---

## Comparison untuk Mendeteksi Kondisi

Boolean array juga dapat digunakan untuk memahami kondisi data.

Misalnya:

```python
scores = np.array([
    60,
    75,
    90,
    45,
    80
])
```

Cari nilai yang memenuhi syarat kelulusan:

```python
passed = scores >= 70

print(passed)
```

Output:

```text
[False  True  True False  True]
```

Kemudian ambil nilainya:

```python
print(scores[passed])
```

Output:

```text
[75 90 80]
```

---

## Menghitung Jumlah Data yang Memenuhi Kondisi

Boolean array juga dapat digunakan untuk menghitung jumlah elemen yang memenuhi kondisi.

Contohnya:

```python
scores = np.array([
    60,
    75,
    90,
    45,
    80
])

passed = scores >= 70

print(np.sum(passed))
```

Output:

```text
3
```

Mengapa?

Karena dalam konteks numerik NumPy:

```text
True  → 1
False → 0
```

Sehingga:

```text
[False, True, True, False, True]
```

dapat dijumlahkan sebagai:

```text
0 + 1 + 1 + 0 + 1 = 3
```

Cara ini sangat berguna untuk menghitung jumlah data yang memenuhi suatu kondisi.

---

## Any dan All

Selain `np.sum()`, NumPy menyediakan `np.any()` dan `np.all()` untuk mengevaluasi Boolean array.

### `np.any()`

`np.any()` digunakan untuk memeriksa apakah **setidaknya satu** elemen bernilai `True`.

```python
a = np.array([10, 20, 30])

print(np.any(a > 25))
```

Output:

```text
True
```

Karena terdapat nilai `30` yang lebih besar dari `25`.

---

### `np.all()`

`np.all()` digunakan untuk memeriksa apakah **semua** elemen bernilai `True`.

```python
print(np.all(a > 5))
```

Output:

```text
True
```

Karena:

```text
10 > 5 → True
20 > 5 → True
30 > 5 → True
```

Namun:

```python
print(np.all(a > 15))
```

menghasilkan:

```text
False
```

karena `10` tidak lebih besar dari `15`.

---

## Comparison pada Data Machine Learning

Comparison operators banyak digunakan dalam preprocessing dan analisis data.

Contohnya kita memiliki fitur umur:

```python
ages = np.array([
    17,
    21,
    25,
    30,
    45,
    60
])
```

Kita dapat mencari data usia minimal 18 tahun:

```python
adult = ages >= 18

print(adult)
```

Hasil:

```text
[False  True  True  True  True  True]
```

Kemudian:

```python
print(ages[adult])
```

menghasilkan:

```text
[21 25 30 45 60]
```

Dalam dataset nyata, konsep yang sama dapat digunakan untuk membuat filter berdasarkan kondisi tertentu.

---

## Perbandingan dengan Nilai Rentang

Kita sering membutuhkan kondisi seperti:

```text
nilai >= 20
dan
nilai <= 40
```

Untuk kondisi seperti ini, kita dapat menggunakan operator logika NumPy.

Contohnya:

```python
a = np.array([
    10,
    20,
    25,
    30,
    40,
    50
])

condition = (a >= 20) & (a <= 40)

print(a[condition])
```

Output:

```text
[20 25 30 40]
```

Tanda kurung penting ketika menggabungkan kondisi pada NumPy.

Operator:

```text
&
```

digunakan untuk kondisi **AND** element-wise.

Operator:

```text
|
```

digunakan untuk kondisi **OR** element-wise.

Konsep kombinasi kondisi akan dipelajari lebih lanjut pada materi filtering.

---

## Perbedaan `&` dan `and`

Ketika bekerja dengan NumPy array, jangan menggunakan `and` untuk menggabungkan kondisi element-wise.

Gunakan:

```python
(a > 10) & (a < 50)
```

bukan:

```python
(a > 10) and (a < 50)
```

Untuk OR gunakan:

```python
(a < 10) | (a > 50)
```

bukan:

```python
(a < 10) or (a > 50)
```

Alasannya adalah `&` dan `|` dapat melakukan operasi Boolean secara element-wise pada array.

---

## Kesalahan yang Sering Terjadi

### Menganggap Hasil Comparison Hanya Satu Boolean

Pada NumPy:

```python
a > 5
```

dapat menghasilkan:

```text
[False, False, True, True]
```

bukan hanya satu `True` atau `False`.

Setiap elemen dievaluasi secara individual.

---

### Lupa Bahwa Comparison Bersifat Element-Wise

Jika:

```python
a1 = np.array([1, 2, 3])
a2 = np.array([2, 2, 2])
```

maka:

```python
a1 > a2
```

menghasilkan:

```text
[False False  True]
```

karena setiap posisi dibandingkan secara terpisah.

---

### Menggunakan `and` untuk Array

Jangan menggunakan:

```python
(a > 10) and (a < 50)
```

untuk kondisi NumPy array.

Gunakan:

```python
(a > 10) & (a < 50)
```

---

### Lupa Menggunakan Tanda Kurung

Gunakan:

```python
(a >= 20) & (a <= 40)
```

bukan:

```python
a >= 20 & a <= 40
```

Tanda kurung membuat setiap kondisi dievaluasi dengan jelas sebelum digabungkan.

---

### Mengabaikan Shape

Jika membandingkan dua array, selalu perhatikan shape.

Gunakan:

```python
print(a1.shape)
print(a2.shape)
```

Jika shape berbeda, pastikan keduanya tetap kompatibel berdasarkan aturan broadcasting.

---

## Workflow Comparison

Workflow sederhana untuk melakukan comparison pada NumPy:

```text
Data Array
    ↓
Tentukan Kondisi
    ↓
Gunakan Comparison Operator
    ↓
Boolean Array
    ↓
Evaluasi Hasil
    ↓
Filtering / Counting / Analisis
```

Contoh:

```python
data = np.array([10, 20, 30, 40, 50])

condition = data > 25

print(condition)
print(data[condition])
```

Hasil:

```text
[False False  True  True  True]
[30 40 50]
```

---

## Ringkasan

Pada materi ini kita telah mempelajari **comparison operators pada NumPy array**.

Hal-hal penting yang perlu diingat:

- Comparison digunakan untuk membandingkan nilai.
- NumPy mendukung operator `>`, `<`, `>=`, `<=`, `==`, dan `!=`.
- Comparison pada array dilakukan secara **element-wise**.
- Hasil comparison berupa `ndarray` dengan `dtype=bool`.
- Array dapat dibandingkan dengan array lain.
- Array juga dapat dibandingkan dengan scalar.
- Comparison dapat memanfaatkan broadcasting.
- Boolean array dapat digunakan untuk filtering.
- `np.sum()` dapat digunakan untuk menghitung jumlah kondisi yang bernilai `True`.
- `np.any()` digunakan untuk mengetahui apakah setidaknya satu kondisi bernilai `True`.
- `np.all()` digunakan untuk mengetahui apakah seluruh kondisi bernilai `True`.
- Operator `&` digunakan untuk AND element-wise.
- Operator `|` digunakan untuk OR element-wise.
- Tanda kurung penting ketika menggabungkan beberapa kondisi.
- Comparison dan Boolean filtering merupakan dasar penting dalam manipulasi data.

---

## Checklist Pembelajaran

Pastikan Anda sudah memahami:

- [ ] Apa yang dimaksud dengan comparison operator.
- [ ] Fungsi operator `>`.
- [ ] Fungsi operator `<`.
- [ ] Fungsi operator `>=`.
- [ ] Fungsi operator `<=`.
- [ ] Fungsi operator `==`.
- [ ] Fungsi operator `!=`.
- [ ] Apa yang dimaksud dengan element-wise comparison.
- [ ] Mengapa hasil comparison berupa Boolean array.
- [ ] Cara memeriksa `dtype` hasil comparison.
- [ ] Cara membandingkan array dengan scalar.
- [ ] Cara membandingkan dua array.
- [ ] Hubungan comparison dengan broadcasting.
- [ ] Cara menggunakan Boolean array untuk filtering.
- [ ] Fungsi `np.any()`.
- [ ] Fungsi `np.all()`.
- [ ] Cara menghitung jumlah kondisi `True` menggunakan `np.sum()`.
- [ ] Perbedaan `&` dengan `and`.
- [ ] Perbedaan `|` dengan `or`.
- [ ] Pentingnya tanda kurung pada kombinasi kondisi.

---

## Latihan

Buat array berikut:

```python
data = np.array([
    10,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    50
])
```

Kemudian lakukan latihan berikut:

1. Cari nilai yang lebih besar dari `30`.
2. Cari nilai yang lebih kecil dari `30`.
3. Cari nilai yang lebih besar atau sama dengan `25`.
4. Cari nilai yang lebih kecil atau sama dengan `40`.
5. Cari nilai yang sama dengan `30`.
6. Cari nilai yang tidak sama dengan `30`.
7. Cari nilai pada rentang `20` sampai `40`.
8. Hitung berapa banyak nilai yang lebih besar dari `30`.
9. Gunakan `np.any()` untuk memeriksa apakah ada nilai lebih besar dari `45`.
10. Gunakan `np.all()` untuk memeriksa apakah seluruh nilai lebih besar dari `5`.
11. Buat kondisi OR untuk mencari nilai kurang dari `15` atau lebih besar dari `40`.
12. Gunakan Boolean array untuk melakukan filtering.

Sebagai tantangan tambahan, buat dua array dengan data penjualan dan bandingkan keduanya untuk mengetahui pada hari mana penjualan array pertama lebih besar daripada array kedua.
