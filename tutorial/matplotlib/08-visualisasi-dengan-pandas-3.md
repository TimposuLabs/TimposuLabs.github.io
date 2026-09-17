---
sidebar_position: 9
title: "Visualisasi Data dari Pandas - 3"
---

## Plotting Bar Graph dan Histogram dari Pandas DataFrame

Pada materi sebelumnya kita telah mempelajari bagaimana membuat **line plot** dan **scatter plot** menggunakan Pandas DataFrame.

Pandas juga menyediakan berbagai jenis visualisasi lain yang sangat berguna dalam proses **Exploratory Data Analysis (EDA)**.

Dua jenis visualisasi yang akan dipelajari pada materi ini adalah:

- **Bar Graph** untuk membandingkan nilai antar kategori atau observasi.
- **Histogram** untuk melihat distribusi data numerik.

Keduanya dapat dibuat langsung menggunakan Pandas tanpa harus menulis seluruh kode Matplotlib secara manual.

---

## Konsep Utama

Pandas menyediakan method:

```python
.plot()
```

yang terintegrasi dengan Matplotlib.

Untuk membuat bar graph, kita dapat menggunakan:

```python
df.plot.bar()
```

atau:

```python
df.plot(kind="bar")
```

Sedangkan untuk histogram:

```python
df["column"].plot.hist()
```

atau:

```python
df["column"].plot(kind="hist")
```

Secara sederhana:

```text
Pandas DataFrame
       │
       ├── .plot.bar()
       │       ↓
       │   Bar Graph
       │
       └── .plot.hist()
               ↓
           Histogram
```

---

## Persiapan Library

Kita membutuhkan NumPy dan Pandas:

```python
import numpy as np
import pandas as pd
```

Untuk visualisasi, Pandas akan menggunakan Matplotlib.

Jika ingin menampilkan grafik secara eksplisit:

```python
import matplotlib.pyplot as plt
```

Sehingga import lengkap:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

---

## Membuat DataFrame Contoh

Sebelum menggunakan dataset kendaraan, kita dapat membuat DataFrame sederhana menggunakan data acak.

```python
x = np.random.rand(10, 4)

df = pd.DataFrame(
    x,
    columns=["A", "B", "C", "D"]
)

df
```

DataFrame tersebut memiliki:

- 10 baris;
- 4 kolom;
- nilai numerik acak.

Strukturnya kurang lebih:

| A | B | C | D |
|---:|---:|---:|---:|
| 0.32 | 0.52 | 0.11 | 0.76 |
| 0.71 | 0.24 | 0.63 | 0.15 |
| ... | ... | ... | ... |

Nilai aktual akan berbeda karena data dibuat secara acak.

---

## Membuat Bar Graph

Bar graph atau grafik batang digunakan untuk membandingkan nilai antar kategori atau observasi.

Dengan Pandas, kita dapat membuat bar graph menggunakan:

```python
df.plot.bar()
```

Kemudian:

```python
plt.show()
```

Contoh:

```python
df.plot.bar()

plt.show()
```

![matplotlib](/img/python/27.png)

---

## Cara Kerja Bar Graph

Setiap baris DataFrame akan direpresentasikan sebagai kelompok batang, sedangkan kolom menjadi seri data yang dibandingkan.

Untuk DataFrame:

```text
A    B    C    D
```

akan terdapat empat seri:

```text
A
B
C
D
```

dan nilai dari masing-masing baris akan ditampilkan sebagai batang.

---

## Alternatif Menggunakan `kind="bar"`

Selain:

```python
df.plot.bar()
```

kita dapat menggunakan:

```python
df.plot(
    kind="bar"
)
```

Contoh lengkap:

```python
df.plot(
    kind="bar"
)

plt.show()
```

![matplotlib](/img/python/27.png)

Kedua pendekatan tersebut digunakan untuk menghasilkan bar plot.

---

## Perbandingan Sintaks Bar Plot

### Method `.plot.bar()`

```python
df.plot.bar()
```

### Parameter `kind`

```python
df.plot(
    kind="bar"
)
```

Keduanya merupakan cara yang valid.

Bentuk pertama lebih ringkas, sedangkan bentuk kedua berguna ketika kita ingin menentukan jenis plot melalui parameter `kind`.

---

## Horizontal Bar Graph

Pandas juga menyediakan horizontal bar graph menggunakan:

```python
df.plot.barh()
```

Contoh:

```python
df.plot.barh()

plt.show()
```

Perbedaannya:

```text
bar()
  │
  └── Batang vertikal

barh()
  │
  └── Batang horizontal
```

Horizontal bar graph sering berguna ketika label kategori cukup panjang.

---

## Menggunakan Dataset Car Sales

Sekarang kita dapat menggunakan dataset kendaraan yang telah digunakan pada materi sebelumnya.

```python
car_sales = pd.read_csv("car-sales.csv")
```

Periksa data:

```python
car_sales.head()
```

Misalnya dataset memiliki kolom:

```text
Make
Colour
Odometer (KM)
Doors
Price
Sale Date
Total Sales
```

![matplotlib](/img/python/34.png)

---

## Membuat Bar Graph dari Dataset

Kita dapat membandingkan merek kendaraan dengan nilai odometer menggunakan:

```python
car_sales.plot(
    x="Make",
    y="Odometer (KM)",
    kind="bar"
)

plt.show()
```

![matplotlib](/img/python/28.png)

Pada grafik:

- `Make` digunakan sebagai kategori pada sumbu X;
- `Odometer (KM)` digunakan sebagai nilai yang divisualisasikan.

---

## Memahami Bar Graph pada Data Kategori

Misalnya data:

| Make | Odometer (KM) |
|---|---:|
| Toyota | 150000 |
| Honda | 120000 |
| BMW | 80000 |
| Ford | 100000 |

Bar graph akan membantu membandingkan nilai odometer masing-masing kendaraan.

Secara konsep:

```text
Odometer
   │
   │ █
   │ █       █
   │ █       █
   │ █  █    █
   │ █  █    █    █
   └──────────────────
     Toyota Honda BMW Ford
```

Visualisasi seperti ini cocok ketika tujuan analisis adalah **membandingkan nilai antar kategori**.

---

## Kapan Menggunakan Bar Graph?

Bar graph cocok digunakan ketika kita ingin:

- membandingkan beberapa kategori;
- melihat nilai setiap kategori;
- melihat perbedaan antar kelompok;
- menampilkan data agregasi;
- membandingkan jumlah atau nilai antar observasi.

Contoh pertanyaan yang dapat dijawab:

> Merek mana yang memiliki nilai tertentu paling tinggi dalam dataset?

Namun, interpretasi akhirnya harus berdasarkan data aktual yang digunakan.

---

## Keterbatasan Bar Graph

Bar graph tidak selalu menjadi pilihan terbaik untuk setiap data.

Jika jumlah kategori sangat banyak, grafik dapat menjadi sulit dibaca.

Contohnya:

```text
Category 1
Category 2
Category 3
...
Category 100
```

Dalam kondisi tersebut, kita dapat mempertimbangkan:

- horizontal bar graph;
- memilih kategori tertentu;
- melakukan agregasi;
- mengurutkan data;
- menggunakan visualisasi lain.

Pemilihan visualisasi harus mengikuti tujuan analisis dan karakteristik dataset.

---

## Membuat Histogram

Berbeda dengan bar graph, histogram digunakan untuk melihat **distribusi data numerik**.

Contohnya kita ingin melihat distribusi jarak tempuh kendaraan:

```python
car_sales["Odometer (KM)"].plot.hist()

plt.show()
```

Alternatifnya:

```python
car_sales["Odometer (KM)"].plot(
    kind="hist"
)

plt.show()
```

![matplotlib](/img/python/29.png)

---

## Bar Graph vs Histogram

Walaupun bentuk visualnya sama-sama menggunakan batang, konsepnya berbeda.

### Bar Graph

Digunakan untuk:

```text
Kategori → Nilai
```

Contoh:

```text
Toyota → 150000
Honda  → 120000
BMW    → 80000
```

### Histogram

Digunakan untuk:

```text
Rentang nilai → Frekuensi
```

Contoh:

```text
0–50 ribu      → 10 kendaraan
50–100 ribu    → 25 kendaraan
100–150 ribu   → 40 kendaraan
150–200 ribu   → 15 kendaraan
```

Jadi, histogram mengelompokkan data numerik ke dalam interval.

---

## Memahami Distribusi Data

Histogram membantu kita memahami bagaimana data tersebar.

Misalnya:

```text
Frekuensi
   │
   │             █
   │          █  █
   │       █  █  █  █
   │    █  █  █  █  █
   │ █  █  █  █  █  █
   └────────────────────
      Nilai
```

Dari histogram kita dapat mengeksplorasi:

- pusat distribusi;
- penyebaran;
- bentuk distribusi;
- kemungkinan skewness;
- kemungkinan outlier;
- interval dengan frekuensi tinggi atau rendah.

Histogram merupakan salah satu alat penting dalam **Exploratory Data Analysis**.

---

## Mengatur Jumlah Bin

Histogram membagi rentang data menjadi beberapa kelompok yang disebut **bin**.

Secara sederhana:

```text
Data numerik
     ↓
Dibagi menjadi interval
     ↓
    Bin
     ↓
Hitung frekuensi
     ↓
Histogram
```

Kita dapat mengatur jumlah bin menggunakan parameter:

```python
bins
```

Contoh:

```python
car_sales["Odometer (KM)"].plot.hist(
    bins=20
)

plt.show()
```

---

## Apa Itu Bin?

Misalnya data memiliki rentang:

```text
0 sampai 200000 KM
```

Jika kita menggunakan:

```python
bins=4
```

maka rentang data akan dibagi menjadi beberapa interval.

Secara konseptual:

```text
0–50000
50000–100000
100000–150000
150000–200000
```

Histogram kemudian menghitung berapa banyak observasi yang berada pada setiap interval.

---

## Pengaruh Jumlah Bin

Jumlah bin memengaruhi tingkat detail histogram.

### Bin Terlalu Sedikit

Misalnya:

```python
bins=5
```

Distribusi akan terlihat lebih sederhana.

Kelebihannya:

- mudah melihat pola umum.

Kekurangannya:

- detail distribusi dapat hilang.

---

### Bin Lebih Banyak

Misalnya:

```python
bins=50
```

Distribusi akan terlihat lebih detail.

Kelebihannya:

- pola lokal lebih terlihat.

Kekurangannya:

- grafik dapat terlihat lebih berisik;
- pola umum dapat menjadi lebih sulit dilihat.

Karena itu, jumlah bin sebaiknya dipilih berdasarkan tujuan analisis dan karakteristik data.

---

## Membandingkan Histogram dengan Jumlah Bin Berbeda

Kita dapat mencoba beberapa konfigurasi.

Histogram dengan 10 bin:

```python
car_sales["Odometer (KM)"].plot.hist(
    bins=10
)

plt.show()
```

![matplotlib](/img/python/29.png)

Histogram dengan 20 bin:

```python
car_sales["Odometer (KM)"].plot.hist(
    bins=20
)

plt.show()
```

![matplotlib](/img/python/30.png)

Histogram dengan 50 bin:

```python
car_sales["Odometer (KM)"].plot.hist(
    bins=50
)

plt.show()
```

![matplotlib](/img/python/31.png)

Tujuannya bukan mencari jumlah bin yang selalu "paling benar", tetapi memahami bagaimana pilihan bin memengaruhi interpretasi visual.

---

## Mengapa Histogram Berguna dalam Data Science?

Histogram dapat digunakan untuk melakukan pemeriksaan awal terhadap distribusi data numerik.

Misalnya sebelum membuat model Machine Learning, kita dapat melihat:

```text
Apakah data terdistribusi secara seimbang?
          ↓
Apakah terdapat nilai ekstrem?
          ↓
Apakah data sangat skewed?
          ↓
Apakah transformasi diperlukan?
```

Histogram tidak otomatis memberikan jawaban terhadap semua pertanyaan tersebut, tetapi membantu kita melakukan eksplorasi awal.

---

## Contoh Histogram untuk Price

Setelah kolom `Price` dibersihkan menjadi numerik, kita dapat membuat histogram:

```python
car_sales["Price"].plot.hist(
    bins=20
)

plt.show()
```

![matplotlib](/img/python/32.png)

Kita dapat melihat bagaimana harga kendaraan tersebar dalam dataset.

---

## Menggunakan `figsize`

Ukuran grafik dapat diatur menggunakan parameter `figsize`.

Contoh:

```python
ax = car_sales["Odometer (KM)"].plot.hist(
    bins=20,
    figsize=(10, 6)
)

plt.show()
```

Ukuran:

```python
figsize=(10, 6)
```

menggunakan satuan inch:

```text
lebar  = 10 inch
tinggi = 6 inch
```

---

## Menambahkan Judul Histogram

Kita dapat melakukan customization menggunakan Matplotlib:

```python
ax = car_sales["Odometer (KM)"].plot.hist(
    bins=20,
    figsize=(10, 6)
)

ax.set_title("Distribusi Odometer Kendaraan")
ax.set_xlabel("Odometer (KM)")
ax.set_ylabel("Frekuensi")

plt.show()
```

Pandas digunakan untuk membuat plot, sedangkan Matplotlib digunakan untuk melakukan pengaturan lebih lanjut.

---

## Contoh Lengkap Bar Graph

```python
import pandas as pd
import matplotlib.pyplot as plt

# Membaca dataset
car_sales = pd.read_csv("car-sales.csv")

# Membuat bar graph
ax = car_sales.plot(
    x="Make",
    y="Odometer (KM)",
    kind="bar",
    figsize=(10, 6)
)

# Memberikan judul
ax.set_title("Odometer Berdasarkan Merek Kendaraan")

# Menampilkan grafik
plt.show()
```

![matplotlib](/img/python/33.png)

---

## Contoh Lengkap Histogram

```python
import pandas as pd
import matplotlib.pyplot as plt

# Membaca dataset
car_sales = pd.read_csv("car-sales.csv")

# Membuat histogram
ax = car_sales["Odometer (KM)"].plot.hist(
    bins=20,
    figsize=(10, 6)
)

# Memberikan judul dan label
ax.set_title("Distribusi Odometer Kendaraan")
ax.set_xlabel("Odometer (KM)")
ax.set_ylabel("Frekuensi")

# Menampilkan grafik
plt.show()
```

![matplotlib](/img/python/35.png)

---

## Contoh dengan Data Acak

Kita juga dapat membuat histogram dari data acak menggunakan NumPy.

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

data = pd.Series(
    np.random.randn(1000)
)

data.plot.hist(
    bins=20,
    figsize=(10, 6)
)

plt.show()
```

![matplotlib](/img/python/36.png)

Data tersebut memiliki 1000 observasi yang berasal dari distribusi normal standar.

---

## Membandingkan Bar Graph dan Histogram

| Karakteristik | Bar Graph | Histogram |
|---|---|---|
| Tujuan | Membandingkan kategori | Melihat distribusi |
| Data | Kategori atau nilai per observasi/agregasi | Numerik kontinu/discretized |
| Sumbu X | Kategori | Interval nilai |
| Batang | Terpisah berdasarkan kategori | Mewakili interval yang berdekatan |
| `bins` | Tidak digunakan sebagai konsep utama | Digunakan |
| Contoh | Harga per merek | Distribusi harga |
| Analisis | Perbandingan | Distribusi frekuensi |

Perbedaan paling penting:

```text
Bar Graph
Kategori → Nilai

Histogram
Interval Nilai → Frekuensi
```

---

## Kesalahan yang Sering Terjadi

### Menganggap Bar Graph dan Histogram Sama

Keduanya menggunakan batang, tetapi tujuan analisisnya berbeda.

Bar graph:

```text
Kategori → Nilai
```

Histogram:

```text
Interval Numerik → Frekuensi
```

Jangan memilih grafik hanya berdasarkan bentuk visualnya.

---

### Menggunakan Histogram untuk Data Kategori

Histogram dirancang untuk distribusi data numerik.

Jika kita ingin membandingkan:

```text
Toyota
Honda
BMW
Ford
```

bar graph lebih sesuai karena merek merupakan kategori.

---

### Menggunakan Terlalu Banyak Bin

Menggunakan jumlah bin yang sangat besar tidak selalu membuat histogram lebih baik.

Contoh:

```python
bins=100
```

dapat menghasilkan grafik yang sangat terfragmentasi, terutama jika dataset kecil.

---

### Menggunakan Terlalu Sedikit Bin

Sebaliknya:

```python
bins=3
```

mungkin terlalu sederhana sehingga detail distribusi hilang.

---

## Workflow EDA dengan Bar Graph dan Histogram

Dalam Exploratory Data Analysis, kita dapat menggunakan kedua grafik untuk tujuan yang berbeda.

Contohnya:

```text
Dataset
   ↓
DataFrame
   ↓
Data Cleaning
   ↓
     ┌───────────────┐
     │               │
     ▼               ▼
Bar Graph       Histogram
     │               │
     ▼               ▼
Compare          Distribution
Categories       Numerical Data
     │               │
     └───────┬───────┘
             ▼
       Data Understanding
```

Bar graph membantu menjawab pertanyaan perbandingan.

Histogram membantu memahami distribusi data numerik.

---

## Method Penting

### `df.plot.bar()`

Membuat bar graph dari DataFrame.

```python
df.plot.bar()
```

---

### `df.plot(kind="bar")`

Alternatif untuk membuat bar graph.

```python
df.plot(
    kind="bar"
)
```

---

### `df.plot.barh()`

Membuat horizontal bar graph.

```python
df.plot.barh()
```

---

### `Series.plot.hist()`

Membuat histogram dari Series.

```python
df["Price"].plot.hist()
```

---

### `kind="hist"`

Alternatif untuk membuat histogram.

```python
df["Price"].plot(
    kind="hist"
)
```

---

### `bins`

Menentukan jumlah kelompok interval histogram.

```python
df["Price"].plot.hist(
    bins=20
)
```

---

## Ringkasan

Pada materi ini kita mempelajari dua jenis visualisasi penting dari Pandas DataFrame:

### Bar Graph

Digunakan untuk membandingkan kategori atau nilai antar observasi.

Sintaks:

```python
df.plot.bar()
```

atau:

```python
df.plot(
    kind="bar"
)
```

---

### Histogram

Digunakan untuk melihat distribusi data numerik.

Sintaks:

```python
df["column"].plot.hist()
```

atau:

```python
df["column"].plot(
    kind="hist"
)
```

Jumlah bin dapat diatur:

```python
df["column"].plot.hist(
    bins=20
)
```

---

## Inti Materi

Hal utama yang perlu diingat:

```text
BAR GRAPH
→ Membandingkan kategori

HISTOGRAM
→ Melihat distribusi data numerik

BINS
→ Mengatur pembagian interval pada histogram
```

Contoh:

```python
# Bar Graph
car_sales.plot(
    x="Make",
    y="Odometer (KM)",
    kind="bar"
)

# Histogram
car_sales["Odometer (KM)"].plot.hist(
    bins=20
)
```

Dengan memahami perbedaan keduanya, kita dapat memilih visualisasi yang lebih sesuai dengan tujuan analisis data.
