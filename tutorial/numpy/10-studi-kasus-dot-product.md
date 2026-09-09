---
sidebar_position: 11
title: "Studi Kasus: Dot Product"
---

Pada materi sebelumnya kita telah mempelajari **dot product**, aturan dimensi matriks, transpose, serta perbedaan antara element-wise multiplication dan matrix multiplication.

Sekarang kita akan menerapkan konsep tersebut pada sebuah studi kasus sederhana:

> **Menghitung total pendapatan penjualan Nut Butter berdasarkan jumlah produk yang terjual dan harga setiap produk.**

Studi kasus ini akan membantu kita memahami bagaimana dot product dapat digunakan untuk menyelesaikan masalah yang lebih nyata.

Dalam kasus ini kita memiliki tiga jenis produk:

- Almond Butter
- Peanut Butter
- Cashew Butter

Data jumlah penjualan akan dikalikan dengan harga masing-masing produk untuk mendapatkan total pendapatan setiap hari.

---

## Studi Kasus Penjualan Nut Butter

Bayangkan sebuah toko menjual tiga jenis Nut Butter:

| Produk | Harga per Jar |
|---|---:|
| Almond Butter | $10 |
| Peanut Butter | $8 |
| Cashew Butter | $12 |

Toko tersebut mencatat jumlah jar yang terjual selama lima hari:

| Hari | Almond | Peanut | Cashew |
|---|---:|---:|---:|
| Monday | 20 | 30 | 15 |
| Tuesday | 25 | 35 | 20 |
| Wednesday | 30 | 25 | 18 |
| Thursday | 22 | 40 | 25 |
| Friday | 35 | 45 | 30 |

Pertanyaannya:

> **Berapa total pendapatan toko pada setiap hari?**

---

## Menyiapkan NumPy

Kita akan menggunakan NumPy untuk melakukan perhitungan.

```python
import numpy as np
```

Kemudian buat data penjualan:

```python
weekly_sales = np.array([
    [20, 30, 15],
    [25, 35, 20],
    [30, 25, 18],
    [22, 40, 25],
    [35, 45, 30]
])
```

Periksa shape:

```python
print(weekly_sales.shape)
```

Output:

```text
(5, 3)
```

Artinya:

- 5 baris → 5 hari.
- 3 kolom → 3 jenis produk.

---

## Data Harga Produk

Selanjutnya kita buat array yang berisi harga setiap produk.

```python
butter_prices = np.array([
    [10, 8, 12]
])
```

Periksa shape:

```python
print(butter_prices.shape)
```

Output:

```text
(1, 3)
```

Artinya:

- 1 baris.
- 3 kolom.
- Setiap kolom merepresentasikan harga satu jenis produk.

Susunannya:

```text
[Almond, Peanut, Cashew]

[10, 8, 12]
```

---

## Memahami Shape Kedua Array

Sekarang kita memiliki:

```text
weekly_sales  → (5, 3)

butter_prices → (1, 3)
```

Secara konsep:

```text
weekly_sales:

           Almond  Peanut  Cashew
Monday       20      30      15
Tuesday      25      35      20
Wednesday    30      25      18
Thursday     22      40      25
Friday       35      45      30
```

dan:

```text
butter_prices:

Almond  Peanut  Cashew
  10       8       12
```

Kita ingin mengalikan setiap jumlah penjualan dengan harga produk yang sesuai.

---

## Mengapa Menggunakan Dot Product?

Perhitungan pendapatan untuk satu hari dapat ditulis sebagai:

```text
Jumlah Almond × Harga Almond
+
Jumlah Peanut × Harga Peanut
+
Jumlah Cashew × Harga Cashew
```

Misalnya hari Senin:

```text
(20 × 10) + (30 × 8) + (15 × 12)
```

Hasil:

```text
200 + 240 + 180 = 620
```

Jadi pendapatan hari Senin adalah:

```text
$620
```

Perhitungan seperti ini merupakan bentuk **dot product**.

---

## Masalah Shape Mismatch

Kita mungkin mencoba melakukan:

```python
np.dot(weekly_sales, butter_prices)
```

Namun operasi tersebut akan menghasilkan error.

Mengapa?

Karena shape kedua array adalah:

```text
weekly_sales  → (5, 3)
butter_prices → (1, 3)
```

Aturan perkalian matriks:

```text
(m, n) × (n, p)
```

Dimensi bagian dalam harus sama.

Pada kasus ini:

```text
(5, 3) × (1, 3)
      ↑     ↑
      3     1
```

Dimensi dalam:

```text
3 ≠ 1
```

Sehingga operasi tidak dapat dilakukan sebagai matrix multiplication.

---

## Memeriksa Shape Sebelum Operasi

Sebelum melakukan dot product, biasakan memeriksa shape:

```python
print("Weekly sales:", weekly_sales.shape)
print("Butter prices:", butter_prices.shape)
```

Output:

```text
Weekly sales: (5, 3)
Butter prices: (1, 3)
```

Dari sini kita dapat melihat bahwa dimensi dalam belum cocok.

---

## Solusi dengan Transpose

Kita dapat melakukan transpose pada `butter_prices`.

```python
butter_prices.T
```

Periksa shape:

```python
print(butter_prices.T.shape)
```

Output:

```text
(3, 1)
```

Shape berubah:

```text
Sebelum:

(1, 3)

↓

Sesudah transpose:

(3, 1)
```

---

## Mengapa Transpose Menyelesaikan Masalah?

Sekarang kita memiliki:

```text
weekly_sales  → (5, 3)

butter_prices.T → (3, 1)
```

Perhatikan dimensinya:

```text
(5, 3) × (3, 1)
```

Dimensi dalam:

```text
3 = 3
```

sehingga operasi valid.

Shape hasil:

```text
(5, 1)
```

Aturannya:

```text
(5, 3) × (3, 1) → (5, 1)
```

---

## Melakukan Dot Product

Sekarang kita dapat melakukan:

```python
total_sales = np.dot(
    weekly_sales,
    butter_prices.T
)

print(total_sales)
```

Hasilnya:

```text
[[ 620]
 [ 770]
 [ 740]
 [ 840]
 [ 980]]
```

Artinya:

| Hari | Total Pendapatan |
|---|---:|
| Monday | $620 |
| Tuesday | $770 |
| Wednesday | $740 |
| Thursday | $840 |
| Friday | $980 |

---

## Memahami Perhitungan Setiap Hari

Dot product secara otomatis melakukan perhitungan seperti berikut.

### Monday

```text
(20 × 10) + (30 × 8) + (15 × 12)

= 200 + 240 + 180

= 620
```

### Tuesday

```text
(25 × 10) + (35 × 8) + (20 × 12)

= 250 + 280 + 240

= 770
```

### Wednesday

```text
(30 × 10) + (25 × 8) + (18 × 12)

= 300 + 200 + 216

= 716
```

### Thursday

```text
(22 × 10) + (40 × 8) + (25 × 12)

= 220 + 320 + 300

= 840
```

### Friday

```text
(35 × 10) + (45 × 8) + (30 × 12)

= 350 + 360 + 360

= 1070
```

Jadi, jika dihitung secara manual, hasilnya adalah:

```text
Monday     → 620
Tuesday    → 770
Wednesday  → 716
Thursday   → 840
Friday     → 1070
```

Dot product memungkinkan seluruh perhitungan tersebut dilakukan sekaligus.

---

## Memeriksa Hasil dengan NumPy

Kita dapat memeriksa hasil secara langsung:

```python
total_sales = weekly_sales @ butter_prices.T

print(total_sales)
```

Output:

```text
[[ 620]
 [ 770]
 [ 716]
 [ 840]
 [1070]]
```

Perhatikan bahwa hasil berbentuk:

```text
(5, 1)
```

bukan:

```text
(5,)
```

Hal ini karena hasil perkalian matriks mempertahankan bentuk dua dimensi.

---

## Mengubah Hasil Menjadi Satu Dimensi

Jika kita ingin mendapatkan array satu dimensi, kita dapat menggunakan `reshape()` atau `ravel()`.

Contohnya menggunakan `reshape()`:

```python
total_sales = (
    weekly_sales @ butter_prices.T
).reshape(-1)

print(total_sales)
```

Output:

```text
[ 620  770  716  840 1070]
```

Kita sekarang memiliki shape:

```python
print(total_sales.shape)
```

Output:

```text
(5,)
```

Alternatif lainnya:

```python
total_sales = (
    weekly_sales @ butter_prices.T
).ravel()
```

Kedua pendekatan tersebut dapat digunakan untuk mengubah hasil `(5, 1)` menjadi array satu dimensi `(5,)`.

---

## Menggunakan DataFrame

Dalam praktik Data Science, data penjualan biasanya lebih nyaman disimpan dalam **Pandas DataFrame**.

Kita dapat menggunakan:

```python
import pandas as pd
```

Kemudian membuat DataFrame:

```python
weekly_sales = pd.DataFrame(
    [
        [20, 30, 15],
        [25, 35, 20],
        [30, 25, 18],
        [22, 40, 25],
        [35, 45, 30]
    ],
    index=[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
    ],
    columns=[
        "Almond",
        "Peanut",
        "Cashew"
    ]
)

weekly_sales
```

Hasilnya:

| | Almond | Peanut | Cashew |
|---|---:|---:|---:|
| Monday | 20 | 30 | 15 |
| Tuesday | 25 | 35 | 20 |
| Wednesday | 30 | 25 | 18 |
| Thursday | 22 | 40 | 25 |
| Friday | 35 | 45 | 30 |

---

## Data Harga sebagai DataFrame

Kita juga dapat membuat DataFrame harga:

```python
butter_prices = pd.DataFrame(
    [[10, 8, 12]],
    columns=[
        "Almond",
        "Peanut",
        "Cashew"
    ]
)

butter_prices
```

Hasil:

| | Almond | Peanut | Cashew |
|---|---:|---:|---:|
| 0 | 10 | 8 | 12 |

---

## Menggunakan NumPy pada DataFrame

Kita dapat mengambil nilai NumPy dari DataFrame menggunakan `.to_numpy()`.

```python
sales_array = weekly_sales.to_numpy()
price_array = butter_prices.to_numpy()
```

Periksa shape:

```python
print(sales_array.shape)
print(price_array.shape)
```

Output:

```text
(5, 3)
(1, 3)
```

Kemudian transpose harga:

```python
price_array.T
```

Shape:

```text
(3, 1)
```

---

## Menghitung Total Pendapatan

Sekarang lakukan dot product:

```python
total_sales = sales_array @ price_array.T

print(total_sales)
```

Output:

```text
[[ 620]
 [ 770]
 [ 716]
 [ 840]
 [1070]]
```

Ubah menjadi satu dimensi:

```python
total_sales = total_sales.ravel()
```

Hasil:

```text
[ 620  770  716  840 1070]
```

---

## Menambahkan Hasil ke DataFrame

Sekarang kita dapat menambahkan hasil tersebut sebagai kolom baru.

```python
weekly_sales["Total ($)"] = total_sales
```

Tampilkan DataFrame:

```python
weekly_sales
```

Hasil:

| | Almond | Peanut | Cashew | Total ($) |
|---|---:|---:|---:|---:|
| Monday | 20 | 30 | 15 | 620 |
| Tuesday | 25 | 35 | 20 | 770 |
| Wednesday | 30 | 25 | 18 | 716 |
| Thursday | 22 | 40 | 25 | 840 |
| Friday | 35 | 45 | 30 | 1070 |

Sekarang DataFrame tidak hanya berisi jumlah penjualan, tetapi juga total pendapatan setiap hari.

---

## Contoh Lengkap

Berikut keseluruhan proses dari awal sampai akhir:

```python
import numpy as np
import pandas as pd

# Data jumlah penjualan
weekly_sales = pd.DataFrame(
    [
        [20, 30, 15],
        [25, 35, 20],
        [30, 25, 18],
        [22, 40, 25],
        [35, 45, 30]
    ],
    index=[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
    ],
    columns=[
        "Almond",
        "Peanut",
        "Cashew"
    ]
)

# Data harga
butter_prices = pd.DataFrame(
    [[10, 8, 12]],
    columns=[
        "Almond",
        "Peanut",
        "Cashew"
    ]
)

# Konversi menjadi NumPy array
sales_array = weekly_sales.to_numpy()
price_array = butter_prices.to_numpy()

# Dot product
total_sales = sales_array @ price_array.T

# Ubah menjadi 1D array
total_sales = total_sales.ravel()

# Tambahkan ke DataFrame
weekly_sales["Total ($)"] = total_sales

print(weekly_sales)
```

---

## Memahami Alur Perhitungan

Studi kasus ini dapat diringkas menjadi:

```text
Data Penjualan
       ↓
(5, 3)
       ↓
Jumlah Produk Terjual
       ×
Harga Produk
       ↓
Transpose Harga
       ↓
(3, 1)
       ↓
Dot Product
       ↓
(5, 1)
       ↓
Total Pendapatan per Hari
       ↓
Tambahkan ke DataFrame
```

Secara matematis:

```text
(5, 3) × (3, 1) = (5, 1)
```

---

## Mengapa Tidak Menggunakan Perulangan?

Kita sebenarnya dapat menghitung total pendapatan menggunakan loop.

Contohnya secara konsep:

```python
for day in weekly_sales:
    ...
```

Namun, untuk operasi numerik seperti perkalian matriks, NumPy memungkinkan kita melakukan perhitungan secara **vectorized**.

Dengan:

```python
sales_array @ price_array.T
```

seluruh perhitungan dapat dilakukan sekaligus.

Keuntungannya:

- Kode lebih ringkas.
- Operasi numerik lebih sesuai dengan struktur array.
- Dapat memanfaatkan optimasi NumPy.
- Lebih mudah diperluas ketika jumlah data bertambah.

---

## Dot Product sebagai Weighted Sum

Studi kasus ini juga dapat dipahami sebagai **weighted sum**.

Setiap produk memiliki harga sebagai bobot:

```text
Almond  → 10
Peanut  → 8
Cashew  → 12
```

Jumlah penjualan merupakan nilai yang dikalikan dengan bobot tersebut.

Secara umum:

```text
Total =

Almond Sales × Almond Price
+
Peanut Sales × Peanut Price
+
Cashew Sales × Cashew Price
```

Bentuk ini sangat mirip dengan konsep yang digunakan dalam berbagai algoritma Machine Learning.

---

## Hubungan dengan Machine Learning

Konsep pada studi kasus ini memiliki hubungan langsung dengan Machine Learning.

Dalam Machine Learning, kita sering memiliki:

```text
Features
   ×
Weights
   ↓
Weighted Sum
   ↓
Prediction
```

Contohnya:

```text
Feature 1 × Weight 1
+
Feature 2 × Weight 2
+
Feature 3 × Weight 3
```

yang secara matematis merupakan bentuk dot product.

Pada studi kasus Nut Butter:

```text
Jumlah Penjualan
       ×
Harga
       ↓
Total Pendapatan
```

Sedangkan pada Machine Learning:

```text
Feature
       ×
Weight
       ↓
Prediksi
```

Strukturnya serupa, walaupun tujuan dan konteksnya berbeda.

---

## Shape sebagai Alat Debugging

Studi kasus ini menunjukkan mengapa memahami shape sangat penting.

Awalnya:

```text
weekly_sales  → (5, 3)
butter_prices → (1, 3)
```

Tidak valid:

```text
(5, 3) × (1, 3)
```

Setelah transpose:

```text
weekly_sales  → (5, 3)
butter_prices → (3, 1)
```

Valid:

```text
(5, 3) × (3, 1)
```

Hasil:

```text
(5, 1)
```

Jadi ketika menemukan error dalam operasi matriks, jangan hanya melihat pesan error.

Periksa juga:

```python
array.shape
```

---

## Kesalahan yang Sering Terjadi

### Lupa Melakukan Transpose

Jika harga memiliki shape:

```text
(1, 3)
```

maka:

```python
weekly_sales @ butter_prices
```

tidak kompatibel dengan:

```text
weekly_sales → (5, 3)
```

Kita membutuhkan:

```text
(3, 1)
```

yang diperoleh melalui:

```python
butter_prices.T
```

---

### Menggunakan Element-Wise Multiplication

Jika menggunakan:

```python
weekly_sales * butter_prices
```

operasi tersebut merupakan **element-wise multiplication**, bukan dot product.

Tujuannya berbeda.

Untuk mendapatkan total pendapatan per hari, kita membutuhkan perkalian dan penjumlahan antarproduk, sehingga dot product lebih sesuai.

---

### Tidak Memeriksa Shape Hasil

Dot product menghasilkan:

```text
(5, 1)
```

bukan:

```text
(5,)
```

Jika kita ingin memasukkan hasil sebagai kolom DataFrame, kita dapat mengubahnya menjadi satu dimensi:

```python
total_sales = total_sales.ravel()
```

---

### Mengubah Shape Hanya Agar Error Hilang

Transpose dilakukan karena struktur data memang sesuai dengan operasi yang ingin dilakukan.

Jangan mengubah shape secara sembarangan.

Selalu pahami:

- Apa arti setiap baris.
- Apa arti setiap kolom.
- Apa yang direpresentasikan oleh setiap dimensi.
- Bentuk output yang diinginkan.

---

## Workflow Studi Kasus

Workflow yang dapat digunakan untuk kasus serupa:

```text
1. Identifikasi Data
       ↓
2. Tentukan Operasi Matematika
       ↓
3. Periksa Shape
       ↓
4. Pastikan Dimensi Kompatibel
       ↓
5. Gunakan Transpose jika Diperlukan
       ↓
6. Lakukan Dot Product
       ↓
7. Periksa Shape Hasil
       ↓
8. Sesuaikan Shape Jika Diperlukan
       ↓
9. Gabungkan dengan Dataset
       ↓
10. Interpretasikan Hasil
```

Workflow ini dapat digunakan tidak hanya untuk penjualan, tetapi juga berbagai permasalahan numerik lainnya.

---

## Ringkasan

Pada studi kasus ini kita telah menerapkan konsep dot product pada masalah penjualan nyata.

Hal-hal penting yang perlu diingat:

- `weekly_sales` menyimpan jumlah produk yang terjual.
- `butter_prices` menyimpan harga masing-masing produk.
- `weekly_sales` memiliki shape `(5, 3)`.
- `butter_prices` memiliki shape `(1, 3)`.
- Kedua array tersebut tidak dapat langsung dikalikan menggunakan matrix multiplication.
- Transpose mengubah `butter_prices` dari `(1, 3)` menjadi `(3, 1)`.
- `(5, 3) × (3, 1)` menghasilkan `(5, 1)`.
- Dot product menghitung jumlah perkalian antara jumlah penjualan dan harga.
- Hasilnya merupakan total pendapatan untuk setiap hari.
- Hasil dot product dapat diubah menjadi array satu dimensi menggunakan `ravel()` atau `reshape(-1)`.
- Hasil tersebut dapat ditambahkan sebagai kolom baru pada DataFrame.
- Studi kasus ini menunjukkan hubungan antara dot product dan konsep **weighted sum** dalam Machine Learning.

---

## Checklist Pembelajaran

Pastikan Anda sudah memahami:

- [ ] Apa tujuan studi kasus penjualan Nut Butter.
- [ ] Cara merepresentasikan data penjualan dalam NumPy.
- [ ] Cara merepresentasikan harga produk dalam NumPy.
- [ ] Cara memeriksa shape kedua array.
- [ ] Mengapa `(5, 3) × (1, 3)` tidak valid.
- [ ] Cara menggunakan `.T`.
- [ ] Mengapa transpose menghasilkan `(3, 1)`.
- [ ] Mengapa `(5, 3) × (3, 1)` valid.
- [ ] Cara melakukan dot product menggunakan `@`.
- [ ] Cara melakukan dot product menggunakan `np.dot()`.
- [ ] Cara menginterpretasikan hasil dot product.
- [ ] Cara mengubah hasil `(5, 1)` menjadi `(5,)`.
- [ ] Cara menambahkan hasil ke DataFrame.
- [ ] Hubungan dot product dengan weighted sum.
- [ ] Hubungan dot product dengan Machine Learning.
- [ ] Pentingnya shape dalam debugging.

---

## Latihan

Buat sebuah studi kasus penjualan dengan tiga produk:

```text
Almond → $12
Peanut → $9
Cashew → $15
```

Kemudian buat data penjualan selama lima hari:

```python
weekly_sales = np.array([
    [10, 20, 15],
    [12, 25, 18],
    [15, 22, 20],
    [18, 30, 25],
    [20, 35, 28]
])
```

Buat array harga:

```python
butter_prices = np.array([
    [12, 9, 15]
])
```

Kemudian:

1. Periksa shape `weekly_sales`.
2. Periksa shape `butter_prices`.
3. Coba lakukan dot product secara langsung.
4. Amati mengapa operasi tersebut gagal.
5. Gunakan transpose pada `butter_prices`.
6. Periksa shape setelah transpose.
7. Hitung dot product.
8. Periksa shape hasil.
9. Ubah hasil menjadi array satu dimensi.
10. Buat DataFrame dengan index Monday sampai Friday.
11. Tambahkan hasil dot product sebagai kolom `Total ($)`.
12. Verifikasi salah satu hasil dengan perhitungan manual.

Sebagai tantangan tambahan, tambahkan produk keempat dan hitung kembali total pendapatan menggunakan dot product.
