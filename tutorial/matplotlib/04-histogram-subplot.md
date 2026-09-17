---
sidebar_position: 5
title: "Horizontal Bar Plot, Histogram & Subplots"
---

Pada materi sebelumnya kita telah mempelajari beberapa jenis visualisasi dasar menggunakan Matplotlib:

- Line Plot.
- Scatter Plot.
- Bar Plot.

Pada materi ini kita akan melanjutkan dengan tiga konsep penting:

1. **Horizontal Bar Plot** menggunakan `ax.barh()`.
2. **Histogram** menggunakan `ax.hist()`.
3. **Subplots** untuk membuat beberapa visualisasi dalam satu Figure.

Ketiga konsep ini sangat berguna dalam Exploratory Data Analysis atau EDA.

Secara sederhana:

```text
Matplotlib
    │
    ├── Bar Plot
    │
    ├── Horizontal Bar Plot
    │
    ├── Histogram
    │
    └── Subplots
```

## Horizontal Bar Plot

Pada materi sebelumnya kita telah menggunakan:

```python
ax.bar()
```

untuk membuat bar plot vertikal.

Contohnya:

```text
Harga
  │
12│        █
10│  █     █
 8│  █  █  █
  │──────────────
     A  P  C
```

Matplotlib juga menyediakan:

```python
ax.barh()
```

untuk membuat **horizontal bar plot**.

Hasilnya kurang lebih:

```text
Almond  ██████████ 10
Peanut  ████████    8
Cashew  ████████████ 12
```

## Menggunakan `ax.barh()`

Sintaks dasar:

```python
ax.barh(y, width)
```

Berbeda dengan `ax.bar()`, pada `barh()` kita menggunakan:

```text
 y
 ↓
Kategori

width
 ↓
Nilai / panjang batang
```

Sedangkan pada bar plot vertikal:

```python
ax.bar(x, height)
```

menggunakan:

```text
 x
 ↓
Kategori

height
 ↓
Nilai / tinggi batang
```

## Perbedaan `bar()` dan `barh()`

| Fungsi | Orientasi | Kategori | Nilai |
|---|---|---|---|
| `ax.bar()` | Vertikal | `x` | `height` |
| `ax.barh()` | Horizontal | `y` | `width` |

Secara visual:

```text
ax.bar()

      █
  █   █
  █ █ █
──────────
 A B C
```

Sedangkan:

```text
ax.barh()

A █████
B ███████
C ████
```

## Menyiapkan Data Dictionary

Kita akan menggunakan data harga nut butter.

```python
nut_butter_prices = {
    "Almond butter": 10,
    "Peanut butter": 8,
    "Cashew butter": 12,
}
```

Dictionary tersebut memiliki:

```text
Keys
 ↓
Nama produk

Values
 ↓
Harga
```

Kita dapat mengambil keys menggunakan:

```python
nut_butter_prices.keys()
```

dan values menggunakan:

```python
nut_butter_prices.values()
```

## Mengubah `keys()` dan `values()` Menjadi List

Untuk penggunaan `barh()`, kita dapat mengubah data dictionary menjadi list.

```python
list(nut_butter_prices.keys())
```

dan:

```python
list(nut_butter_prices.values())
```

Contohnya:

```python
categories = list(nut_butter_prices.keys())
prices = list(nut_butter_prices.values())
```

Sekarang:

```text
categories
→ ["Almond butter", "Peanut butter", "Cashew butter"]

prices
→ [10, 8, 12]
```

## Membuat Horizontal Bar Plot

Contoh lengkap:

```python
import matplotlib.pyplot as plt

nut_butter_prices = {
    "Almond butter": 10,
    "Peanut butter": 8,
    "Cashew butter": 12,
}

fig, ax = plt.subplots()

ax.barh(
    list(nut_butter_prices.keys()),
    width=list(nut_butter_prices.values())
)

ax.set(
    title="Harga Nut Butter",
    xlabel="Harga ($)",
    ylabel="Jenis Nut Butter"
)

plt.show()
```

![matplotlib](/img/python/19.png)

## Memahami Parameter `barh()`

Perhatikan:

```python
ax.barh(
    list(nut_butter_prices.keys()),
    width=list(nut_butter_prices.values())
)
```

Parameter pertama:

```python
list(nut_butter_prices.keys())
```

menentukan kategori pada sumbu Y.

Parameter:

```python
width=list(nut_butter_prices.values())
```

menentukan panjang masing-masing batang.

Secara sederhana:

```text
Y Axis
  ↓
Kategori

X Axis
  ↓
Nilai
```

## Kapan Menggunakan Horizontal Bar Plot?

Horizontal bar plot sangat berguna ketika:

- Nama kategori panjang.
- Banyak kategori yang harus dibandingkan.
- Label kategori sulit dibaca jika diletakkan secara horizontal.
- Kita ingin membandingkan ranking secara visual.

Contohnya:

```text
Harga Produk
│
Almond Butter   ██████████
Peanut Butter   ████████
Cashew Butter   ████████████
```

Nama kategori lebih mudah dibaca dibandingkan jika diputar atau dipadatkan pada sumbu X.

## Histogram

Jenis visualisasi berikutnya adalah **histogram**.

Histogram digunakan untuk melihat **distribusi data numerik** dengan membagi rentang nilai ke dalam beberapa interval yang disebut **bins**.

Contoh sederhana:

```text
Frekuensi
   │
   │       █
   │    █  █
   │    █  █  █
   │ █  █  █  █
   └────────────────
      Nilai
```

Histogram berbeda dari bar plot.

Bar plot biasanya digunakan untuk:

```text
Kategori → Nilai
```

Sedangkan histogram digunakan untuk:

```text
Nilai numerik → Distribusi frekuensi
```

## Membuat Data Acak dengan `np.random.randn()`

Untuk mempraktikkan histogram, kita dapat membuat data acak menggunakan:

```python
np.random.randn()
```

Contoh:

```python
x = np.random.randn(1000)
```

Kode tersebut menghasilkan 1000 nilai acak yang mengikuti distribusi normal standar.

Kita dapat memeriksa jumlah datanya:

```python
print(x.size)
```

Hasil:

```text
1000
```

## Apa Itu Distribusi Normal?

Distribusi normal sering digambarkan sebagai bentuk seperti lonceng:

```text
              █
           ███████
        █████████████
     ███████████████████
──────────────────────────
```

Distribusi normal memiliki nilai yang lebih banyak berada di sekitar pusat distribusi dibandingkan bagian ekstrem.

Namun, penting untuk memahami bahwa data nyata tidak selalu mengikuti distribusi normal.

## Membuat Histogram dengan `ax.hist()`

Fungsi yang digunakan:

```python
ax.hist()
```

Contoh:
f
```python
import numpy as np
import matplotlib.pyplot as plt

x = np.random.randn(1000)

fig, ax = plt.subplots()

ax.hist(x)

plt.show()
```

![matplotlib](/img/python/20.png)

Matplotlib akan membagi data ke dalam beberapa **bins** dan menghitung berapa banyak data yang masuk ke masing-masing interval.

## Memahami Bins

Misalnya kita memiliki data:

```text
1, 2, 3, 4, 5, 6, 7, 8, 9
```

Data dapat dibagi menjadi beberapa interval:

```text
1–3
4–6
7–9
```

Kemudian dihitung jumlah data dalam setiap interval.

Secara konseptual:

```text
Interval    Frekuensi

1–3         ███
4–6         ███
7–9         ███
```

Histogram melakukan proses tersebut secara otomatis.

## Mengatur Jumlah Bins

Jumlah bins dapat diatur menggunakan parameter:

```python
bins
```

Contoh:

```python
fig, ax = plt.subplots()

ax.hist(
    x,
    bins=20
)

plt.show()
```

Semakin banyak bins, interval menjadi semakin kecil.

Sebaliknya, semakin sedikit bins, interval menjadi lebih lebar.

Perbandingan:

```text
Sedikit bins:

███
██████
████

Banyak bins:

█ ██ ███ ██ █ ███ ██
```

Pemilihan jumlah bins dapat memengaruhi cara distribusi data terlihat, sehingga perlu disesuaikan dengan ukuran dan karakteristik dataset.

## Menambahkan Title dan Label Histogram

Contoh:

```python
fig, ax = plt.subplots()

ax.hist(
    x,
    bins=20
)

ax.set(
    title="Distribusi Data",
    xlabel="Nilai",
    ylabel="Frekuensi"
)

plt.show()
```

Sekarang grafik memiliki informasi yang lebih jelas.

## Histogram dalam Exploratory Data Analysis

Histogram sangat berguna dalam EDA.

Kita dapat menggunakannya untuk melihat:

- Distribusi data.
- Penyebaran data.
- Konsentrasi nilai.
- Kemungkinan skewness.
- Nilai ekstrem.
- Bentuk distribusi.

Contohnya:

```text
Dataset
   ↓
Histogram
   ↓
Distribusi
   ↓
Analisis karakteristik data
```

Histogram juga dapat membantu menentukan apakah suatu data terlihat:

```text
Simetris
Skewed ke kanan
Skewed ke kiri
Bimodal
Memiliki outlier
```

Interpretasi tersebut tetap perlu dilakukan dengan hati-hati dan tidak hanya berdasarkan satu grafik.

## Perbedaan Bar Plot dan Histogram

Bar plot dan histogram sama-sama menggunakan batang, tetapi tujuan dan datanya berbeda.

| Karakteristik | Bar Plot | Histogram |
|---|---|---|
| Data | Kategori | Numerik |
| Tujuan | Membandingkan kategori | Melihat distribusi |
| Sumbu X | Kategori | Interval nilai |
| Batang | Mewakili kategori | Mewakili bins |
| Contoh | Harga produk | Distribusi usia |

Contoh bar plot:

```text
Produk A ███████
Produk B █████
Produk C █████████
```

Contoh histogram:

```text
Frekuensi
  │
  │      ███
  │  ███████
  │ █████████
  └──────────────
      Nilai
```

## Subplots

Terkadang kita ingin menampilkan beberapa visualisasi sekaligus.

Misalnya:

```text
Line Plot
Scatter Plot
Bar Plot
Histogram
```

daripada membuat empat Figure terpisah, kita dapat menempatkannya dalam satu Figure menggunakan **subplots**.

Contoh:

```text
Figure
┌───────────────┬───────────────┐
│  Line Plot    │ Scatter Plot  │
├───────────────┼───────────────┤
│  Bar Plot     │ Histogram     │
└───────────────┴───────────────┘
```

## Membuat Grid Subplots

Kita dapat menggunakan:

```python
plt.subplots()
```

dengan parameter:

```python
nrows
ncols
```

Contoh:

```python
fig, ax = plt.subplots(
    nrows=2,
    ncols=2
)
```

Artinya:

```text
2 rows
×
2 columns
```

sehingga terdapat empat Axes.

```text
Axes[0, 0]    Axes[0, 1]

Axes[1, 0]    Axes[1, 1]
```

## Mengakses Axes dengan Tuple Unpacking

Jika kita mengetahui bahwa terdapat 2 × 2 Axes, kita dapat melakukan tuple unpacking:

```python
fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(
    nrows=2,
    ncols=2
)
```

Sekarang kita memiliki:

```text
ax1 → posisi [0, 0]

ax2 → posisi [0, 1]

ax3 → posisi [1, 0]

ax4 → posisi [1, 1]
```

Kita dapat menggunakan masing-masing Axes untuk visualisasi yang berbeda.

## Contoh Subplots 2 × 2

Gunakan data:

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 100)

nut_butter_prices = {
    "Almond butter": 10,
    "Peanut butter": 8,
    "Cashew butter": 12,
}
```

Kemudian:

```python
fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(
    nrows=2,
    ncols=2,
    figsize=(10, 5)
)
```

### Axes Pertama - Line Plot

```python
ax1.plot(x, x / 2)
```

### Axes Kedua - Scatter Plot

```python
ax2.scatter(
    np.random.random(10),
    np.random.random(10)
)
```

### Axes Ketiga - Bar Plot

```python
ax3.bar(
    nut_butter_prices.keys(),
    nut_butter_prices.values()
)
```

### Axes Keempat - Histogram

```python
ax4.hist(
    np.random.randn(1000)
)
```

Kode lengkap:

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 100)

nut_butter_prices = {
    "Almond butter": 10,
    "Peanut butter": 8,
    "Cashew butter": 12,
}

fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(
    nrows=2,
    ncols=2,
    figsize=(10, 5)
)

ax1.plot(x, x / 2)

ax2.scatter(
    np.random.random(10),
    np.random.random(10)
)

ax3.bar(
    nut_butter_prices.keys(),
    nut_butter_prices.values()
)

ax4.hist(
    np.random.randn(1000)
)

plt.show()
```

![matplotlib](/img/python/21.png)

## Mengatur Judul Setiap Subplot

Kita dapat memberikan judul berbeda untuk setiap Axes.

```python
ax1.set_title("Line Plot")
ax2.set_title("Scatter Plot")
ax3.set_title("Bar Plot")
ax4.set_title("Histogram")
```

Contoh:

```python
fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(
    2,
    2,
    figsize=(10, 6)
)

ax1.plot(x, x / 2)
ax1.set_title("Line Plot")

ax2.scatter(
    np.random.random(10),
    np.random.random(10)
)
ax2.set_title("Scatter Plot")

ax3.bar(
    nut_butter_prices.keys(),
    nut_butter_prices.values()
)
ax3.set_title("Bar Plot")

ax4.hist(np.random.randn(1000))
ax4.set_title("Histogram")

plt.show()
```

## Mengatur Ukuran Figure

Saat menggunakan banyak subplot, ukuran Figure biasanya perlu diperbesar.

Gunakan:

```python
figsize=(10, 6)
```

Contoh:

```python
fig, ax = plt.subplots(
    2,
    2,
    figsize=(10, 6)
)
```

Ingat bahwa:

```text
figsize=(width, height)
```

menggunakan satuan **inch**.

## Pendekatan Kedua - `plt.subplot()`

Selain:

```python
plt.subplots()
```

Matplotlib juga menyediakan:

```python
plt.subplot()
```

Perhatikan perbedaannya:

```text
plt.subplots()
     ↓
Membuat Figure + Axes

plt.subplot()
     ↓
Membuat / memilih satu subplot pada posisi tertentu
```

Sintaks:

```python
plt.subplot(nrows, ncols, index)
```

Parameter:

| Parameter | Fungsi |
|---|---|
| `nrows` | Jumlah baris |
| `ncols` | Jumlah kolom |
| `index` | Posisi subplot |

Index dimulai dari:

```text
1
```

bukan `0`.

## Contoh `plt.subplot()`

Kita dapat membuat Figure:

```python
fig = plt.figure(figsize=(10, 5))
```

Kemudian membuat subplot pertama:

```python
ax1 = fig.add_subplot(2, 2, 1)
```

Subplot kedua:

```python
ax2 = fig.add_subplot(2, 2, 2)
```

Strukturnya:

```text
┌───────────────┬───────────────┐
│       1       │       2       │
├───────────────┼───────────────┤
│       3       │       4       │
└───────────────┴───────────────┘
```

Contoh:

```python
fig = plt.figure(figsize=(10, 5))

ax1 = fig.add_subplot(2, 2, 1)
ax1.plot(x, x / 2)

ax2 = fig.add_subplot(2, 2, 2)
ax2.scatter(
    np.random.random(10),
    np.random.random(10)
)

plt.show()
```

## `plt.subplots()` vs `add_subplot()`

Keduanya dapat digunakan untuk membuat beberapa Axes.

Namun pendekatannya berbeda.

### `plt.subplots()`

Contoh:

```python
fig, ax = plt.subplots(2, 2)
```

Kita langsung mendapatkan kumpulan Axes.

Pendekatan ini biasanya lebih nyaman ketika struktur layout sudah diketahui sejak awal.

### `fig.add_subplot()`

Contoh:

```python
fig = plt.figure()

ax1 = fig.add_subplot(2, 2, 1)
ax2 = fig.add_subplot(2, 2, 2)
```

Kita membuat atau menambahkan Axes satu per satu.

Pendekatan ini berguna ketika kita ingin mengelola Axes secara bertahap.

## Mana yang Digunakan?

Untuk workflow umum, kita akan lebih sering menggunakan:

```python
fig, ax = plt.subplots()
```

atau:

```python
fig, ax = plt.subplots(
    nrows=2,
    ncols=2
)
```

Karena struktur Figure dan Axes dapat dibuat dengan jelas sejak awal.

Sedangkan `add_subplot()` tetap penting untuk dipahami karena akan sering ditemukan dalam kode dan dokumentasi Matplotlib.

## Contoh Workflow Lengkap

Berikut contoh yang menggabungkan seluruh materi:

```python
import numpy as np
import matplotlib.pyplot as plt

# Data
x = np.linspace(0, 10, 100)

nut_butter_prices = {
    "Almond butter": 10,
    "Peanut butter": 8,
    "Cashew butter": 12,
}

# Membuat Figure dan 4 Axes
fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(
    nrows=2,
    ncols=2,
    figsize=(12, 8)
)

# Line Plot
ax1.plot(x, x**2)
ax1.set_title("Line Plot")

# Scatter Plot
ax2.scatter(x, np.sin(x))
ax2.set_title("Scatter Plot")

# Horizontal Bar Plot
ax3.barh(
    list(nut_butter_prices.keys()),
    width=list(nut_butter_prices.values())
)
ax3.set_title("Horizontal Bar Plot")

# Histogram
ax4.hist(np.random.randn(1000))
ax4.set_title("Histogram")

# Menampilkan Figure
plt.show()
```

![matplotlib](/img/python/22.png)

Hasilnya merupakan satu Figure dengan empat jenis visualisasi.

## Mengapa Subplots Berguna dalam EDA?

Dalam Exploratory Data Analysis, kita sering ingin membandingkan beberapa visualisasi.

Misalnya:

```text
Figure
│
├── Distribusi data
├── Hubungan variabel
├── Perbandingan kategori
└── Tren data
```

Dengan subplot, semua informasi tersebut dapat ditampilkan dalam satu Figure.

Hal ini membantu kita mendapatkan gambaran dataset secara lebih menyeluruh.

## Tips Membuat Subplots

### Gunakan Ukuran Figure yang Cukup

Jika jumlah subplot banyak, gunakan ukuran Figure yang lebih besar.

Contoh:

```python
fig, ax = plt.subplots(
    2,
    2,
    figsize=(12, 8)
)
```

### Berikan Judul

Setiap subplot sebaiknya memiliki konteks yang jelas.

```python
ax1.set_title("Distribusi Harga")
ax2.set_title("Hubungan X dan Y")
```

### Hindari Informasi yang Terlalu Padat

Jika terlalu banyak grafik ditempatkan dalam satu Figure, grafik dapat menjadi sulit dibaca.

Lebih banyak subplot tidak selalu berarti visualisasi lebih baik.

Fokus pada pertanyaan analisis yang ingin dijawab.

## Ringkasan

Pada materi ini kita mempelajari tiga konsep utama.

### Horizontal Bar Plot

Menggunakan:

```python
ax.barh(y, width)
```

Digunakan untuk membuat bar plot horizontal.

### Histogram

Menggunakan:

```python
ax.hist(x)
```

Digunakan untuk melihat distribusi data numerik.

### Subplots

Menggunakan:

```python
fig, ax = plt.subplots(
    nrows,
    ncols
)
```

Digunakan untuk membuat beberapa Axes dalam satu Figure.

## Cheat Sheet

### Horizontal Bar Plot

```python
fig, ax = plt.subplots()

ax.barh(
    categories,
    width=values
)

plt.show()
```

### Histogram

```python
fig, ax = plt.subplots()

ax.hist(data)

plt.show()
```

### Subplots

```python
fig, ax = plt.subplots(
    nrows=2,
    ncols=2
)
```

### Tuple Unpacking

```python
fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(
    2,
    2
)
```

### `add_subplot()`

```python
fig = plt.figure()

ax1 = fig.add_subplot(2, 2, 1)
ax2 = fig.add_subplot(2, 2, 2)
```

## Fungsi yang Perlu Diingat

| Fungsi | Kegunaan |
|---|---|
| `ax.bar()` | Bar plot vertikal |
| `ax.barh()` | Bar plot horizontal |
| `ax.hist()` | Histogram |
| `plt.subplots()` | Membuat Figure dan Axes |
| `fig.add_subplot()` | Menambahkan Axes ke Figure |
| `np.random.randn()` | Menghasilkan sampel acak dari distribusi normal standar |
| `np.linspace()` | Membuat angka yang berjarak merata |

## Checklist Pembelajaran

Setelah menyelesaikan materi ini, Anda seharusnya dapat:

- [ ] Menjelaskan perbedaan bar plot dan horizontal bar plot.
- [ ] Menggunakan `ax.barh()`.
- [ ] Memahami parameter `y` pada `barh()`.
- [ ] Memahami parameter `width` pada `barh()`.
- [ ] Mengubah dictionary keys dan values menjadi list.
- [ ] Membuat histogram menggunakan `ax.hist()`.
- [ ] Menjelaskan konsep bins.
- [ ] Mengatur jumlah bins menggunakan `bins`.
- [ ] Menjelaskan fungsi histogram dalam EDA.
- [ ] Membedakan histogram dan bar plot.
- [ ] Membuat beberapa Axes dalam satu Figure.
- [ ] Menggunakan `plt.subplots()`.
- [ ] Memahami parameter `nrows` dan `ncols`.
- [ ] Menggunakan tuple unpacking untuk Axes.
- [ ] Menggunakan `fig.add_subplot()`.
- [ ] Membedakan `plt.subplots()` dan `add_subplot()`.
- [ ] Mengatur ukuran Figure menggunakan `figsize`.
- [ ] Membuat Figure yang berisi beberapa jenis visualisasi.

## Latihan

### Latihan 1 - Horizontal Bar Plot

Gunakan data:

```python
programming_languages = {
    "Python": 95,
    "JavaScript": 85,
    "Java": 75,
    "C++": 65,
}
```

Buat horizontal bar plot.

Tambahkan:

- Title.
- X label.
- Y label.

### Latihan 2 - Histogram

Buat 1000 data acak:

```python
data = np.random.randn(1000)
```

Kemudian buat histogram dengan:

```python
bins=20
```

Tambahkan:

- Title.
- X label.
- Y label.

### Latihan 3 - Membandingkan Bins

Gunakan dataset yang sama.

Buat tiga histogram dengan jumlah bins:

```text
10
20
50
```

Bandingkan bagaimana perubahan jumlah bins memengaruhi tampilan distribusi.

### Latihan 4 - Subplots

Buat Figure dengan layout:

```text
2 × 2
```

Isi dengan:

```text
Line Plot
Scatter Plot
Bar Plot
Histogram
```

Berikan title untuk setiap subplot.

### Latihan 5 - EDA Mini

Buat sebuah dataset numerik menggunakan NumPy.

Kemudian tampilkan dalam satu Figure:

```text
┌───────────────────┬───────────────────┐
│   Line Plot       │   Scatter Plot    │
├───────────────────┼───────────────────┤
│   Bar Plot        │   Histogram       │
└───────────────────┴───────────────────┘
```

Kemudian jelaskan informasi apa yang dapat diperoleh dari masing-masing visualisasi.
