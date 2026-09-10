---
sidebar_position: 12
title: "Sorting Arrays"
---

Selain melakukan operasi matematika dan perbandingan data, NumPy juga menyediakan berbagai fungsi untuk **mengurutkan array** dan **mencari posisi atau indeks elemen tertentu**.

Beberapa fungsi yang penting untuk dipahami adalah:

| Fungsi | Kegunaan |
|---|---|
| `np.sort()` | Mengurutkan nilai dalam array |
| `np.argsort()` | Mendapatkan indeks yang menghasilkan urutan |
| `np.argmin()` | Mendapatkan indeks dari nilai minimum |
| `np.argmax()` | Mendapatkan indeks dari nilai maksimum |

Fungsi-fungsi tersebut banyak digunakan dalam Data Science dan Machine Learning, misalnya untuk mencari nilai terbesar, menentukan ranking, atau mengetahui posisi data tertentu.

## Persiapan Data

Kita akan membuat sebuah array acak dengan ukuran **3 baris × 5 kolom**.

Gunakan `np.random.randint()` untuk menghasilkan bilangan bulat secara acak dari `0` sampai `9`.

```python
import numpy as np

random_array = np.random.randint(10, size=(3, 5))

print(random_array)
```

Contoh hasil:

```text
[[5 3 8 1 7]
 [2 9 4 6 0]
 [8 1 5 3 2]]
```

Perlu diperhatikan bahwa hasil angka akan berbeda setiap kali program dijalankan karena array dibuat secara acak.

Untuk memastikan hasil yang sama setiap kali program dijalankan, kita dapat menggunakan random seed.

```python
np.random.seed(42)

random_array = np.random.randint(10, size=(3, 5))

print(random_array)
```

## Mengurutkan Array dengan `np.sort()`

Fungsi `np.sort()` digunakan untuk mengurutkan nilai dalam array.

```python
np.sort(random_array)
```

Contoh:

```text
[[1 3 5 7 8]
 [0 2 4 6 9]
 [1 2 3 5 8]]
```

Pada array 2D, secara default NumPy mengurutkan elemen **pada setiap baris**.

Misalnya:

```text
Sebelum:

[5 3 8 1 7]

Sesudah:

[1 3 5 7 8]
```

Setiap baris diurutkan secara independen.

### `np.sort()` Tidak Mengubah Array Asli

Salah satu hal penting adalah `np.sort()` mengembalikan array yang sudah diurutkan tanpa mengubah array asli.

```python
random_array = np.array([5, 3, 8, 1, 7])

sorted_array = np.sort(random_array)

print("Array asli :", random_array)
print("Sorted     :", sorted_array)
```

Output:

```text
Array asli : [5 3 8 1 7]
Sorted     : [1 3 5 7 8]
```

Jika kita memang ingin mengubah array asli, hasilnya dapat diberikan kembali ke variabel:

```python
random_array = np.sort(random_array)
```

## Mengatur Arah Pengurutan dengan `axis`

Secara default, `np.sort()` menggunakan `axis=-1`.

Artinya, pada array 2D, pengurutan dilakukan sepanjang dimensi terakhir, yaitu setiap baris.

Kita juga dapat menentukan `axis` secara eksplisit.

### `axis=1`

Untuk array 2D, `axis=1` mengurutkan nilai pada setiap baris.

```python
np.sort(random_array, axis=1)
```

Contoh:

```text
[[5 3 8 1 7]
 [2 9 4 6 0]
 [8 1 5 3 2]]
```

menjadi:

```text
[[1 3 5 7 8]
 [0 2 4 6 9]
 [1 2 3 5 8]]
```

### `axis=0`

`axis=0` mengurutkan nilai sepanjang dimensi pertama.

Pada array 2D, secara praktis kita dapat melihatnya sebagai pengurutan **di setiap kolom**.

```python
np.sort(random_array, axis=0)
```

Contoh:

```text
[[5 3 8 1 7]
 [2 9 4 6 0]
 [8 1 5 3 2]]
```

menjadi:

```text
[[2 1 4 1 0]
 [5 3 5 3 2]
 [8 9 8 6 7]]
```

Pemahaman `axis` menjadi semakin penting ketika bekerja dengan array multidimensi.

## Mendapatkan Indeks dengan `np.argsort()`

Terkadang kita tidak hanya membutuhkan nilai yang sudah diurutkan.

Kita mungkin ingin mengetahui:

> "Elemen pada posisi mana yang harus diambil agar array menjadi terurut?"

Untuk kebutuhan tersebut kita dapat menggunakan `np.argsort()`.

```python
a1 = np.array([5, 3, 8, 1, 7])

np.argsort(a1)
```

Output:

```text
[3 1 0 4 2]
```

Mari kita perhatikan:

```text
Index :  0  1  2  3  4
Value :  5  3  8  1  7
```

Urutan nilai dari terkecil ke terbesar adalah:

```text
1 → 3 → 5 → 7 → 8
```

Posisi masing-masing nilai tersebut adalah:

```text
1 → index 3
3 → index 1
5 → index 0
7 → index 4
8 → index 2
```

Sehingga:

```text
np.argsort(a1)

[3 1 0 4 2]
```

### Menggunakan Hasil `argsort()` untuk Mengurutkan Data

Hasil `argsort()` dapat digunakan sebagai indeks untuk mengambil data.

```python
sorted_indices = np.argsort(a1)

print(a1[sorted_indices])
```

Output:

```text
[1 3 5 7 8]
```

Secara konsep:

```text
argsort()
     ↓
[3, 1, 0, 4, 2]
     ↓
digunakan sebagai indeks
     ↓
[1, 3, 5, 7, 8]
```

Perbedaan utama:

| Fungsi | Hasil |
|---|---|
| `np.sort()` | Nilai yang sudah diurutkan |
| `np.argsort()` | Indeks yang menghasilkan urutan |

## `np.argmin()` untuk Mencari Indeks Minimum

Fungsi `np.argmin()` digunakan untuk mencari **indeks dari nilai terkecil**.

Contoh:

```python
a1 = np.array([1, 2, 3])

np.argmin(a1)
```

Output:

```text
0
```

Karena:

```text
Index :  0  1  2
Value :  1  2  3
```

Nilai terkecil adalah `1`, dan nilai tersebut berada pada indeks `0`.

Contoh lain:

```python
a1 = np.array([10, 5, 20, 2, 15])

print(np.argmin(a1))
```

Output:

```text
3
```

Karena nilai minimum adalah `2` dan berada pada indeks `3`.

Jika yang dibutuhkan adalah **nilai minimumnya**, gunakan:

```python
np.min(a1)
```

Jadi:

```python
np.argmin(a1)
```

menghasilkan **indeks**, sedangkan:

```python
np.min(a1)
```

menghasilkan **nilai**.

## `np.argmax()` untuk Mencari Indeks Maksimum

Kebalikan dari `np.argmin()`, fungsi `np.argmax()` digunakan untuk mencari **indeks dari nilai terbesar**.

```python
a1 = np.array([1, 2, 3])

np.argmax(a1)
```

Output:

```text
2
```

Karena nilai terbesar adalah `3` dan berada pada indeks `2`.

Contoh lain:

```python
a1 = np.array([10, 5, 20, 2, 15])

print(np.argmax(a1))
```

Output:

```text
2
```

Karena nilai maksimum adalah `20` dan berada pada indeks `2`.

Jika yang dibutuhkan adalah nilai maksimumnya:

```python
np.max(a1)
```

Perbedaannya:

| Fungsi | Hasil |
|---|---|
| `np.argmax()` | Indeks nilai maksimum |
| `np.max()` | Nilai maksimum |
| `np.argmin()` | Indeks nilai minimum |
| `np.min()` | Nilai minimum |

## `argmin()` dan `argmax()` pada Array 2D

Fungsi `np.argmin()` dan `np.argmax()` juga dapat digunakan pada array 2D.

Contoh:

```python
random_array = np.array([
    [5, 3, 8, 1, 7],
    [2, 9, 4, 6, 0],
    [8, 1, 5, 3, 2]
])

print(random_array)
```

Hasil:

```text
[[5 3 8 1 7]
 [2 9 4 6 0]
 [8 1 5 3 2]]
```

### Tanpa Menentukan `axis`

Jika `axis` tidak ditentukan, NumPy akan memperlakukan array sebagai array yang diratakan (*flattened*) untuk operasi tersebut.

```python
np.argmax(random_array)
```

Hasilnya adalah satu indeks pada array yang telah diratakan.

Untuk melihat prosesnya:

```python
random_array.flatten()
```

Hasil:

```text
[5 3 8 1 7 2 9 4 6 0 8 1 5 3 2]
```

Nilai maksimum adalah `9`.

Nilai tersebut berada pada posisi:

```text
6
```

Sehingga:

```python
np.argmax(random_array)
```

menghasilkan:

```text
6
```

Jika kita membutuhkan koordinat baris dan kolom, kita dapat menggunakan `np.unravel_index()`:

```python
np.unravel_index(np.argmax(random_array), random_array.shape)
```

Hasil:

```text
(1, 1)
```

Artinya nilai maksimum berada pada:

```text
baris 1
kolom 1
```

## `argmax()` dengan `axis=0`

Kita dapat menentukan `axis` untuk mencari posisi nilai maksimum pada dimensi tertentu.

```python
np.argmax(random_array, axis=0)
```

Untuk array:

```text
[[5, 3, 8, 1, 7],
 [2, 9, 4, 6, 0],
 [8, 1, 5, 3, 2]]
```

hasilnya menunjukkan **indeks baris** yang memiliki nilai maksimum pada masing-masing kolom.

Misalnya:

```text
Kolom 0:
5
2
8
```

Nilai maksimum adalah `8`, yang berada pada indeks baris `2`.

Dengan demikian, hasil `argmax(axis=0)` berisi indeks baris untuk setiap kolom.

```python
np.argmax(random_array, axis=0)
```

Contoh hasil:

```text
[2 1 0 1 0]
```

## `argmax()` dengan `axis=1`

Jika menggunakan:

```python
np.argmax(random_array, axis=1)
```

maka NumPy mencari indeks nilai maksimum **pada setiap baris**.

Contoh:

```text
Baris 0:
[5, 3, 8, 1, 7]
```

Nilai maksimum adalah `8`, yang berada pada indeks `2`.

```text
Baris 1:
[2, 9, 4, 6, 0]
```

Nilai maksimum adalah `9`, yang berada pada indeks `1`.

```text
Baris 2:
[8, 1, 5, 3, 2]
```

Nilai maksimum adalah `8`, yang berada pada indeks `0`.

Sehingga:

```python
np.argmax(random_array, axis=1)
```

menghasilkan:

```text
[2 1 0]
```

Hasil tersebut berarti:

```text
Baris 0 → maksimum pada index 2
Baris 1 → maksimum pada index 1
Baris 2 → maksimum pada index 0
```

## `argmin()` dengan `axis`

Konsep yang sama berlaku untuk `np.argmin()`.

Untuk mencari indeks nilai minimum pada setiap kolom:

```python
np.argmin(random_array, axis=0)
```

Sedangkan untuk mencari indeks nilai minimum pada setiap baris:

```python
np.argmin(random_array, axis=1)
```

Jadi:

```text
axis=0
→ cari posisi minimum/maksimum sepanjang kolom
→ hasil menunjukkan indeks baris

axis=1
→ cari posisi minimum/maksimum sepanjang baris
→ hasil menunjukkan indeks kolom
```

Cara memahami `axis` sebaiknya dikaitkan dengan **dimensi yang digunakan untuk melakukan operasi**, bukan hanya menghafalkan "axis 0 adalah baris" atau "axis 1 adalah kolom".

## Perbandingan `sort`, `argsort`, `argmin`, dan `argmax`

Keempat fungsi ini memiliki tujuan yang berbeda.

| Fungsi | Pertanyaan yang Dijawab | Hasil |
|---|---|---|
| `np.sort()` | Bagaimana nilai ini jika diurutkan? | Nilai terurut |
| `np.argsort()` | Indeks mana yang menghasilkan urutan tersebut? | Indeks |
| `np.argmin()` | Di mana posisi nilai terkecil? | Indeks |
| `np.argmax()` | Di mana posisi nilai terbesar? | Indeks |

Contoh:

```python
a1 = np.array([50, 20, 80, 10, 40])
```

### Mengurutkan Nilai

```python
np.sort(a1)
```

Hasil:

```text
[10 20 40 50 80]
```

### Mendapatkan Indeks Pengurutan

```python
np.argsort(a1)
```

Hasil:

```text
[3 1 4 0 2]
```

### Mencari Indeks Minimum

```python
np.argmin(a1)
```

Hasil:

```text
3
```

### Mencari Indeks Maksimum

```python
np.argmax(a1)
```

Hasil:

```text
2
```

## Contoh Penggunaan dalam Data Science

Fungsi-fungsi tersebut sangat berguna ketika bekerja dengan data nyata.

Misalnya kita memiliki skor beberapa siswa:

```python
scores = np.array([78, 92, 85, 96, 88])
```

Mencari skor tertinggi:

```python
scores.max()
```

Hasil:

```text
96
```

Mencari posisi siswa dengan skor tertinggi:

```python
scores.argmax()
```

Hasil:

```text
3
```

Mencari skor terendah:

```python
scores.min()
```

Hasil:

```text
78
```

Mencari posisi siswa dengan skor terendah:

```python
scores.argmin()
```

Hasil:

```text
0
```

Mendapatkan urutan siswa berdasarkan skor dari terendah ke tertinggi:

```python
scores.argsort()
```

Hasil:

```text
[0 2 4 1 3]
```

Sedangkan nilai yang sudah diurutkan:

```python
np.sort(scores)
```

Hasil:

```text
[78 85 88 92 96]
```

## Contoh Penggunaan untuk Ranking

Misalnya terdapat data skor model Machine Learning:

```python
model_scores = np.array([
    0.82,
    0.91,
    0.87,
    0.95,
    0.89
])
```

Kita dapat mengetahui model dengan performa terbaik:

```python
best_model_index = np.argmax(model_scores)

print(best_model_index)
```

Hasil:

```text
3
```

Nilainya:

```python
model_scores[best_model_index]
```

Hasil:

```text
0.95
```

Kita juga dapat mendapatkan ranking berdasarkan skor:

```python
ranking = np.argsort(model_scores)[::-1]

print(ranking)
```

Operator `[::-1]` digunakan untuk membalik urutan sehingga ranking dimulai dari skor terbesar.

Hasil:

```text
[3 1 4 2 0]
```

Dengan demikian:

```text
Ranking 1 → index 3 → 0.95
Ranking 2 → index 1 → 0.91
Ranking 3 → index 4 → 0.89
Ranking 4 → index 2 → 0.87
Ranking 5 → index 0 → 0.82
```

Teknik seperti ini sering digunakan ketika kita ingin mendapatkan **Top-N data** berdasarkan suatu skor.

## Hal yang Perlu Diperhatikan

### `sort()` Berbeda dengan `argsort()`

Jangan tertukar antara:

```python
np.sort(a1)
```

dan:

```python
np.argsort(a1)
```

Yang pertama memberikan **nilai yang sudah diurutkan**, sedangkan yang kedua memberikan **indeksnya**.

### `argmax()` dan `argmin()` Menghasilkan Indeks

Perhatikan bahwa:

```python
np.argmax(a1)
```

tidak menghasilkan nilai maksimum.

Untuk nilai maksimum gunakan:

```python
np.max(a1)
```

Begitu juga:

```python
np.argmin(a1)
```

menghasilkan indeks minimum, sedangkan:

```python
np.min(a1)
```

menghasilkan nilai minimum.

### Hasil `argmax()` dengan Nilai Duplikat

Jika terdapat beberapa nilai yang sama-sama merupakan nilai maksimum, `np.argmax()` akan mengembalikan indeks kemunculan pertama.

Contoh:

```python
a1 = np.array([10, 20, 30, 30, 15])

np.argmax(a1)
```

Hasil:

```text
2
```

Meskipun nilai `30` juga terdapat pada indeks `3`, yang dikembalikan adalah indeks pertama.

## Workflow Sorting dan Searching pada NumPy

Secara umum, kita dapat menggunakan fungsi-fungsi tersebut dengan alur berikut:

```text
Data
  ↓
NumPy Array
  ↓
Identifikasi kebutuhan
  ↓
┌───────────────────────────────┐
│ Ingin mengurutkan nilai?      │
│ → np.sort()                   │
│                               │
│ Ingin indeks urutan?          │
│ → np.argsort()                │
│                               │
│ Ingin posisi nilai minimum?   │
│ → np.argmin()                 │
│                               │
│ Ingin posisi nilai maksimum?  │
│ → np.argmax()                 │
└───────────────────────────────┘
  ↓
Gunakan hasil untuk analisis
```

## Ringkasan

NumPy menyediakan fungsi yang sangat berguna untuk melakukan sorting dan pencarian posisi data.

### `np.sort()`

Digunakan untuk mengurutkan nilai array.

```python
np.sort(a1)
```

Menghasilkan nilai yang sudah diurutkan.

### `np.argsort()`

Digunakan untuk mendapatkan indeks yang menghasilkan urutan tertentu.

```python
np.argsort(a1)
```

Menghasilkan array indeks.

### `np.argmin()`

Digunakan untuk mendapatkan indeks dari nilai minimum.

```python
np.argmin(a1)
```

### `np.argmax()`

Digunakan untuk mendapatkan indeks dari nilai maksimum.

```python
np.argmax(a1)
```

### Konsep Utama

```text
sort
→ nilai terurut

argsort
→ indeks untuk menghasilkan urutan

argmin
→ indeks nilai minimum

argmax
→ indeks nilai maksimum
```

## Checklist Pembelajaran

Setelah mempelajari materi ini, Anda seharusnya dapat:

- [ ] Menggunakan `np.sort()` untuk mengurutkan array.
- [ ] Memahami perbedaan `np.sort()` dan `np.argsort()`.
- [ ] Menggunakan `np.argsort()` untuk mendapatkan indeks berdasarkan urutan nilai.
- [ ] Menggunakan `np.argmin()` untuk mencari posisi nilai minimum.
- [ ] Menggunakan `np.argmax()` untuk mencari posisi nilai maksimum.
- [ ] Menggunakan `axis` pada `argmin()`, `argmax()`, dan `sort()`.
- [ ] Memahami perbedaan hasil `axis=0` dan `axis=1` pada array 2D.
- [ ] Menggunakan hasil `argsort()` untuk membuat ranking.
- [ ] Menggunakan `argmax()` untuk menemukan data dengan skor tertinggi.

## Latihan

### Latihan 1 — Sorting

Buat array berikut:

```python
numbers = np.array([45, 12, 78, 23, 90, 34])
```

Kemudian:

1. Urutkan array dari terkecil ke terbesar.
2. Dapatkan indeks yang menghasilkan urutan tersebut.
3. Cari indeks nilai minimum.
4. Cari indeks nilai maksimum.

### Latihan 2 — Ranking

Gunakan data berikut:

```python
scores = np.array([0.81, 0.95, 0.88, 0.79, 0.92])
```

Cari:

1. Model dengan skor tertinggi.
2. Indeks model dengan skor tertinggi.
3. Urutan model dari skor tertinggi ke terendah.
4. Tiga model dengan skor terbaik.

### Latihan 3 — Array 2D

Buat array:

```python
data = np.array([
    [10, 50, 30],
    [40, 20, 60],
    [70, 80, 90]
])
```

Kemudian cari:

1. Nilai maksimum seluruh array.
2. Indeks maksimum seluruh array.
3. Indeks maksimum setiap kolom.
4. Indeks maksimum setiap baris.
5. Indeks minimum setiap kolom.
6. Indeks minimum setiap baris.
