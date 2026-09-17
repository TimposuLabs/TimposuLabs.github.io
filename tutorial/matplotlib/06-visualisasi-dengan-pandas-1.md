---
sidebar_position: 7
title: "Visualisasi Data dari Pandas - 1"
---

Dalam workflow **Data Science**, Pandas banyak digunakan untuk membaca, membersihkan, mengolah, dan menganalisis data dalam bentuk DataFrame.

Setelah data berada di dalam DataFrame, kita sering membutuhkan visualisasi untuk memahami pola, tren, distribusi, dan hubungan antar-data.

Pandas menyediakan integrasi langsung dengan **Matplotlib**, sehingga kita dapat membuat visualisasi hanya dengan menggunakan method:

```python
.plot()
```

Artinya, kita tidak selalu harus menulis kode Matplotlib secara langsung. Kita dapat membuat grafik langsung dari objek **Series** maupun **DataFrame** Pandas.

---

## Konsep Utama

Pandas dibangun di atas NumPy dan memiliki integrasi yang baik dengan Matplotlib.

Secara sederhana, hubungan ketiganya dapat digambarkan sebagai berikut:

```text
NumPy
  │
  │ Numerical computation
  ▼
Pandas
  │
  │ DataFrame / Series
  ▼
Matplotlib
  │
  │ Visualization
  ▼
Graph / Chart
```

Dalam workflow Data Science, alurnya sering menjadi:

```text
Dataset
   ↓
Pandas DataFrame
   ↓
Data Cleaning
   ↓
Data Analysis
   ↓
Pandas .plot()
   ↓
Matplotlib
   ↓
Visualization
```

---

## Import Library

Untuk menggunakan Pandas dan Matplotlib, kita dapat melakukan import:

```python
import matplotlib.pyplot as plt
import pandas as pd
```

Untuk eksperimen menggunakan data acak, kita juga membutuhkan NumPy:

```python
import numpy as np
```

Sehingga kode lengkap import menjadi:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

---

## Membaca Dataset dengan Pandas

Salah satu workflow yang umum adalah membaca dataset CSV menggunakan:

```python
pd.read_csv()
```

Contohnya:

```python
car_sales = pd.read_csv("car-sales.csv")
```

Kemudian kita dapat melihat DataFrame:

```python
car_sales
```

Atau menggunakan:

```python
car_sales.head()
```

untuk melihat beberapa baris pertama.

:::info
Download dataset [car-sales.csv](https://gitlab.com/topekox/belajar-machine-learning/-/raw/main/belajar-pandas/car-sales.csv?ref_type=heads&inline=false).
:::
---

## Membuat Visualisasi dari DataFrame

Setelah memiliki DataFrame, kita dapat menggunakan method:

```python
.plot()
```

Contoh:

```python
car_sales.plot()
```

Pandas akan menggunakan Matplotlib sebagai backend visualisasi untuk membuat grafik.

Kita juga dapat menggunakan:

```python
plt.show()
```

untuk menampilkan grafik secara eksplisit:

```python
car_sales.plot()

plt.show()
```

---

## Membuat Visualisasi dari Series

Selain DataFrame, method `.plot()` juga dapat digunakan pada Pandas Series.

Contohnya:

```python
prices = pd.Series([10, 20, 15, 25, 30])

prices.plot()

plt.show()
```

Dalam contoh tersebut, Pandas membuat line plot berdasarkan nilai yang terdapat pada Series.

---

## Membuat Time Series Sederhana

Untuk memahami bagaimana Pandas digunakan bersama Matplotlib, kita dapat membuat contoh **time series**.

Time series adalah data yang memiliki hubungan dengan waktu.

Contoh sederhananya:

```text
Tanggal        Nilai
2021-01-01       5
2021-01-02       8
2021-01-03       6
2021-01-04      10
2021-01-05      12
```

Pandas menyediakan fungsi:

```python
pd.date_range()
```

untuk membuat deret tanggal secara otomatis.

---

## Membuat Rentang Tanggal dengan `pd.date_range()`

Contoh:

```python
dates = pd.date_range(
    "2021-01-01",
    periods=1000
)
```

Parameter yang digunakan:

| Parameter | Keterangan |
|---|---|
| `"2021-01-01"` | Tanggal awal |
| `periods=1000` | Jumlah periode yang dibuat |

Kita dapat melihat beberapa nilai pertama:

```python
print(dates[:5])
```

Contoh hasil:

```text
DatetimeIndex([
    '2021-01-01',
    '2021-01-02',
    '2021-01-03',
    '2021-01-04',
    '2021-01-05'
], dtype='datetime64[ns]', freq='D')
```

Secara default, `pd.date_range()` menggunakan interval harian ketika frekuensi tidak ditentukan.

---

## Membuat Series dengan Index Tanggal

Selanjutnya kita dapat membuat Series menggunakan angka acak:

```python
ts = pd.Series(
    np.random.randn(1000),
    index=dates
)
```

Pada kode tersebut:

```python
np.random.randn(1000)
```

menghasilkan 1000 angka acak.

Sedangkan:

```python
index=dates
```

menjadikan tanggal sebagai index Series.

Struktur datanya menjadi seperti:

```text
Tanggal       Nilai
2021-01-01     0.52
2021-01-02    -0.31
2021-01-03     1.24
2021-01-04    -0.15
...
```

---

## Memahami `np.random.randn()`

Fungsi:

```python
np.random.randn()
```

digunakan untuk menghasilkan angka acak dari distribusi normal standar.

Contoh:

```python
np.random.randn(5)
```

Dapat menghasilkan nilai seperti:

```text
[ 0.32 -1.12  0.45  0.87 -0.24]
```

Nilai yang dihasilkan akan berbeda ketika kode dijalankan kembali jika random seed tidak ditentukan.

---

## Menggunakan `cumsum()`

Data acak sebelumnya dapat terlihat cukup tidak beraturan.

Untuk menghasilkan pola yang lebih menyerupai pergerakan data dari waktu ke waktu, kita dapat menggunakan:

```python
.cumsum()
```

`cumsum()` merupakan singkatan dari **cumulative sum** atau jumlah kumulatif.

Contoh:

```python
data = pd.Series([1, 2, 3, 4])

data.cumsum()
```

Hasil:

```text
1
3
6
10
```

Perhitungannya:

```text
1
1 + 2 = 3
1 + 2 + 3 = 6
1 + 2 + 3 + 4 = 10
```

---

## Menerapkan `cumsum()` pada Time Series

Kita dapat menerapkan cumulative sum pada Series:

```python
ts = ts.cumsum()
```

Sekarang nilai pada `ts` merupakan nilai kumulatif.

Kita dapat melihat beberapa data:

```python
ts.head()
```

Contoh:

```text
2021-01-01    0.52
2021-01-02    0.21
2021-01-03    1.45
2021-01-04    1.30
2021-01-05    2.10
dtype: float64
```

Nilai tersebut akan bergantung pada angka acak yang dihasilkan saat kode dijalankan.

---

## Membuat Line Plot dengan `.plot()`

Sekarang kita dapat langsung membuat visualisasi:

```python
ts.plot()
```

Pandas akan membuat line plot berdasarkan:

- index sebagai sumbu X;
- nilai Series sebagai sumbu Y.

Karena index kita berupa tanggal, sumbu X akan merepresentasikan waktu.

Kita dapat menampilkan grafik:

```python
ts.plot()

plt.show()
```

---

## Visualisasi Time Series

Secara konsep, grafik yang dihasilkan menggambarkan perubahan nilai terhadap waktu.

```text
Nilai
  │
  │              ╭───╮
  │         ╭────╯   ╰──╮
  │    ╭────╯             ╰──╮
  │────╯                       ╰──
  │
  └──────────────────────────────── Waktu
```

Grafik seperti ini berguna untuk melihat:

- tren;
- kenaikan dan penurunan;
- perubahan nilai;
- pola temporal;
- kemungkinan anomali.

---

## Contoh Lengkap

Berikut implementasi lengkap dari contoh time series:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Membuat rentang tanggal
dates = pd.date_range(
    "2021-01-01",
    periods=1000
)

# Membuat Series dengan data acak
ts = pd.Series(
    np.random.randn(1000),
    index=dates
)

# Menghitung cumulative sum
ts = ts.cumsum()

# Membuat visualisasi
ts.plot()

# Menampilkan grafik
plt.show()
```

![matplotlib](/img/python/23.png)

Kode tersebut melakukan beberapa tahap:

```text
Membuat tanggal
      ↓
Membuat data acak
      ↓
Membuat Pandas Series
      ↓
Menggunakan cumsum()
      ↓
Menggunakan .plot()
      ↓
Menampilkan grafik
```

---

## Menambahkan Judul dan Label

Walaupun Pandas dapat membuat grafik secara langsung, kita tetap dapat menggunakan API Matplotlib untuk melakukan customization.

Contohnya:

```python
ts.plot()

plt.title("Time Series Data")
plt.xlabel("Date")
plt.ylabel("Value")

plt.show()
```

Kita juga dapat menggunakan object-oriented API:

```python
fig, ax = plt.subplots(figsize=(10, 5))

ts.plot(ax=ax)

ax.set_title("Time Series Data")
ax.set_xlabel("Date")
ax.set_ylabel("Value")

plt.show()
```

Pendekatan kedua lebih fleksibel ketika kita bekerja dengan banyak subplot.

---

## Menggunakan `.plot()` pada Kolom DataFrame

Misalnya kita memiliki DataFrame:

```python
car_sales = pd.read_csv("car-sales.csv")
```

Kita dapat memilih satu kolom:

```python
car_sales["Price"]
```

Kemudian membuat visualisasi:

```python
car_sales["Price"].plot()
```

Karena `car_sales["Price"]` merupakan Pandas Series, method `.plot()` dapat langsung digunakan.

---

## Memilih Jenis Grafik

Pandas menyediakan parameter `kind` untuk menentukan jenis visualisasi.

Contoh line plot:

```python
car_sales["Price"].plot(kind="line")
```

Bar plot:

```python
car_sales["Price"].plot(kind="bar")
```

Histogram:

```python
car_sales["Price"].plot(kind="hist")
```

Scatter plot:

```python
car_sales.plot(
    x="Odometer (KM)",
    y="Price",
    kind="scatter"
)
```

Jenis grafik yang dipilih harus disesuaikan dengan karakteristik data dan tujuan analisis.

---

## Beberapa Jenis Plot yang Umum

| `kind` | Jenis Visualisasi | Kegunaan Umum |
|---|---|---|
| `"line"` | Line plot | Melihat tren |
| `"bar"` | Bar plot | Membandingkan kategori |
| `"barh"` | Horizontal bar | Membandingkan kategori |
| `"hist"` | Histogram | Melihat distribusi |
| `"scatter"` | Scatter plot | Melihat hubungan dua variabel |
| `"box"` | Box plot | Melihat distribusi dan outlier |
| `"area"` | Area plot | Melihat perubahan kumulatif/komposisi |

Contoh:

```python
car_sales.plot(
    x="Odometer (KM)",
    y="Price",
    kind="scatter"
)

plt.show()
```

---

## Pandas `.plot()` dan Matplotlib

Penting untuk memahami bahwa:

```python
ts.plot()
```

bukan berarti Pandas menggantikan Matplotlib.

Pandas menyediakan **interface yang lebih sederhana** untuk membuat visualisasi, sedangkan Matplotlib tetap digunakan sebagai library plotting di belakangnya.

Secara sederhana:

```text
Pandas
   │
   │ .plot()
   ▼
Matplotlib
   │
   ▼
Visualization
```

Karena itu, memahami Matplotlib tetap penting meskipun kita sering menggunakan Pandas `.plot()`.

---

## Kapan Menggunakan Pandas `.plot()`?

Pandas `.plot()` sangat nyaman digunakan ketika:

- data sudah berada dalam DataFrame;
- ingin membuat visualisasi dengan cepat;
- melakukan Exploratory Data Analysis;
- ingin melihat tren sebuah kolom;
- ingin membandingkan beberapa kolom;
- membutuhkan visualisasi sederhana.

Contohnya:

```python
car_sales["Price"].plot()
```

lebih praktis dibandingkan harus mengambil nilai kolom secara manual dan kemudian memberikan data tersebut ke Matplotlib.

---

## Pandas `.plot()` untuk Exploratory Data Analysis

Dalam Exploratory Data Analysis atau EDA, kita sering menggunakan visualisasi untuk memahami dataset sebelum membangun model Machine Learning.

Contoh workflow:

```text
Load Dataset
     ↓
Inspect Data
     ↓
Clean Data
     ↓
Analyze Data
     ↓
Visualize Data
     ↓
Find Patterns
     ↓
Feature Engineering
     ↓
Machine Learning
```

Pandas `.plot()` dapat digunakan pada tahap **Visualize Data**.

Contohnya:

```python
car_sales["Price"].plot(kind="hist")
plt.show()
```

Kita dapat melihat bagaimana harga kendaraan tersebar.

---

## Perbedaan Pandas `.plot()` dan Matplotlib

Keduanya dapat digunakan untuk membuat visualisasi, tetapi pendekatannya berbeda.

### Pandas `.plot()`

Lebih sederhana ketika data sudah berada dalam DataFrame atau Series.

Contoh:

```python
car_sales["Price"].plot()
```

### Matplotlib

Memberikan kontrol yang lebih detail terhadap Figure dan Axes.

Contoh:

```python
fig, ax = plt.subplots()

ax.plot(
    car_sales["Price"]
)

plt.show()
```

Dalam praktik Data Science, keduanya sering digunakan bersama.

---

## Contoh Workflow Praktis

Misalnya kita ingin melihat hubungan antara jarak tempuh kendaraan dan harga.

Kita dapat menggunakan:

```python
car_sales.plot(
    x="Odometer (KM)",
    y="Price",
    kind="scatter"
)

plt.show()
```

Workflow-nya:

```text
car-sales.csv
      ↓
pd.read_csv()
      ↓
car_sales DataFrame
      ↓
Pilih kolom
      ↓
   .plot()
      ↓
Scatter Plot
      ↓
Analisis hubungan Odometer dan Price
```

Visualisasi tersebut dapat membantu kita mengeksplorasi apakah terdapat pola hubungan antara jarak tempuh dan harga kendaraan.

Namun, visualisasi saja tidak cukup untuk menyimpulkan hubungan sebab-akibat.

---

## Konsep Penting yang Perlu Diingat

### `pd.date_range()`

Digunakan untuk membuat rangkaian tanggal.

```python
dates = pd.date_range(
    "2021-01-01",
    periods=1000
)
```

---

### `np.random.randn()`

Digunakan untuk menghasilkan angka acak dari distribusi normal standar.

```python
np.random.randn(1000)
```

---

### `pd.Series()`

Digunakan untuk membuat objek Series Pandas.

```python
ts = pd.Series(
    data,
    index=dates
)
```

---

### `.cumsum()`

Menghasilkan jumlah kumulatif.

```python
ts = ts.cumsum()
```

---

### `.plot()`

Membuat visualisasi dari Series atau DataFrame.

```python
ts.plot()
```

---

### `plt.show()`

Menampilkan Figure.

```python
plt.show()
```

---

## Ringkasan

Pada materi ini kita mempelajari bagaimana Pandas dapat digunakan untuk membuat visualisasi secara langsung.

Konsep utama yang dipelajari:

1. Pandas terintegrasi dengan Matplotlib.
2. Series dan DataFrame memiliki method `.plot()`.
3. `pd.date_range()` dapat digunakan untuk membuat index berupa tanggal.
4. `np.random.randn()` dapat digunakan untuk membuat data acak.
5. `.cumsum()` menghasilkan nilai kumulatif.
6. `.plot()` dapat digunakan untuk membuat visualisasi secara praktis.
7. Parameter `kind` dapat digunakan untuk memilih jenis grafik.
8. Pandas `.plot()` sangat berguna untuk Exploratory Data Analysis.
9. Matplotlib tetap penting untuk customization dan kontrol visualisasi yang lebih detail.

---

## Contoh Singkat yang Perlu Diingat

Workflow sederhana:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

dates = pd.date_range(
    "2021-01-01",
    periods=1000
)

ts = pd.Series(
    np.random.randn(1000),
    index=dates
)

ts = ts.cumsum()

ts.plot()

plt.show()
```

Pola dasarnya adalah:

```text
Data
 ↓
Pandas Series / DataFrame
 ↓
.plot()
 ↓
Matplotlib
 ↓
Visualization
```
