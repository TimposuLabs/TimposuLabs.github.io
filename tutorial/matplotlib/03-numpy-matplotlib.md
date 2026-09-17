---
sidebar_position: 4
title: "Visualisasi Data dengan NumPy"
---

NumPy dan Matplotlib merupakan dua library yang sangat sering digunakan secara bersama-sama dalam Data Science.

**NumPy** digunakan untuk membuat dan mengolah data numerik dalam bentuk array, sedangkan **Matplotlib** digunakan untuk mengubah data tersebut menjadi visualisasi.

Secara sederhana:

```text
NumPy
  ↓
Membuat / mengolah data numerik
  ↓
Matplotlib
  ↓
Membuat visualisasi
  ↓
Memahami pola data
```

Contoh workflow:

```text
Data
 ↓
NumPy Array
 ↓
Matplotlib
 ↓
Line Plot / Scatter / Bar
 ↓
Analisis
```

Pemahaman hubungan antara NumPy dan Matplotlib merupakan dasar penting sebelum mempelajari visualisasi data yang lebih kompleks.

## Persiapan Library

Import library yang akan digunakan:

```python
import matplotlib.pyplot as plt
import numpy as np
```

Pada materi ini:

```text
np
 ↓
NumPy

plt
 ↓
Matplotlib Pyplot
```

Kita akan menggunakan NumPy untuk membuat data dan Matplotlib untuk memvisualisasikannya.

## Membuat Data dengan `np.linspace()`

Salah satu fungsi NumPy yang berguna untuk membuat data visualisasi adalah:

```python
np.linspace()
```

`linspace` merupakan singkatan dari **linear space**.

Fungsi ini digunakan untuk membuat sejumlah angka yang memiliki jarak yang sama antara nilai awal dan nilai akhir.

Sintaks dasarnya:

```python
np.linspace(start, stop, num)
```

Parameter:

| Parameter | Keterangan |
|---|---|
| `start` | Nilai awal |
| `stop` | Nilai akhir |
| `num` | Jumlah data yang ingin dibuat |

## Contoh `np.linspace()`

Misalnya kita ingin membuat 100 data poin dari `0` sampai `10`:

```python
x = np.linspace(0, 10, 100)
```

Kita dapat melihat hasilnya:

```python
print(x)
```

Hasilnya akan berupa array dengan 100 nilai yang tersebar secara merata dari `0` hingga `10`.

Kita juga dapat memeriksa jumlah elemennya:

```python
print(x.size)
```

Hasil:

```text
100
```

Memeriksa nilai awal:

```python
print(x[0])
```

Hasil:

```text
0.0
```

Memeriksa nilai terakhir:

```python
print(x[-1])
```

Hasil:

```text
10.0
```

## Memahami `linspace()` Secara Visual

Jika kita membuat:

```python
x = np.linspace(0, 10, 5)
```

maka kita mendapatkan lima titik yang tersebar secara merata:

```text
0 ───── 2.5 ───── 5 ───── 7.5 ───── 10
```

Contoh:

```python
print(x)
```

Hasil:

```text
[ 0.   2.5  5.   7.5 10. ]
```

Berbeda dengan `np.arange()`, `np.linspace()` memungkinkan kita menentukan **jumlah sampel** yang diinginkan.

## `linspace()` vs `arange()`

Kedua fungsi tersebut sama-sama dapat digunakan untuk membuat sequence angka, tetapi cara penggunaannya berbeda.

### `np.arange()`

Kita menentukan nilai:

```text
start
stop
step
```

Contoh:

```python
np.arange(0, 10, 2)
```

Hasil:

```text
[0 2 4 6 8]
```

### `np.linspace()`

Kita menentukan:

```text
start
stop
jumlah data
```

Contoh:

```python
np.linspace(0, 10, 5)
```

Hasil:

```text
[0.  2.5 5.  7.5 10.]
```

Perbandingan:

| Fungsi | Fokus |
|---|---|
| `np.arange()` | Menentukan step |
| `np.linspace()` | Menentukan jumlah sampel |

`np.linspace()` sangat berguna dalam visualisasi fungsi matematika karena kita dapat mengontrol jumlah titik yang digunakan untuk menggambar kurva.

## Membuat Line Plot

Setelah membuat data `x`, kita dapat membuat line plot.

```python
x = np.linspace(0, 10, 100)

fig, ax = plt.subplots()

ax.plot(x, x**2)

plt.show()
```

![matplotlib](/img/python/14.png)

Pada contoh tersebut:

```python
x
```

merupakan data pada sumbu X.

Sedangkan:

```python
x**2
```

merupakan data pada sumbu Y.

Sehingga hubungan datanya adalah:

```text
y = x²
```

Matplotlib kemudian menghubungkan titik-titik tersebut menjadi sebuah garis.

## Mengapa Menggunakan Banyak Data Point?

Perhatikan:

```python
x = np.linspace(0, 10, 10)
```

dibandingkan:

```python
x = np.linspace(0, 10, 100)
```

Semakin banyak titik yang digunakan untuk merepresentasikan fungsi kontinu, biasanya visualisasi kurva akan terlihat semakin halus.

Contoh:

```text
10 points
●────●────●────●────●

100 points
●●●●●●●●●●●●●●●●●●●●
```

Namun, jumlah titik yang lebih banyak tidak selalu berarti lebih baik. Jumlah sampel tetap perlu disesuaikan dengan kebutuhan visualisasi dan ukuran data.

## Scatter Plot

Selain line plot, Matplotlib menyediakan **scatter plot**.

Scatter plot digunakan untuk menampilkan data sebagai kumpulan titik.

Sintaks:

```python
ax.scatter(x, y)
```

Contoh:

```python
x = np.linspace(0, 10, 100)

fig, ax = plt.subplots()

ax.scatter(x, x**2)

plt.show()
```

Berbeda dengan line plot:

```python
ax.plot(x, x**2)
```

scatter plot:

```python
ax.scatter(x, x**2)
```

tidak menghubungkan titik-titik tersebut dengan garis.

## Kapan Menggunakan Scatter Plot?

Scatter plot berguna ketika kita ingin melihat:

- Persebaran data.
- Hubungan antara dua variabel.
- Pola data.
- Outlier.
- Korelasi secara visual.

Contohnya:

```text
Y
│
│          ●
│       ●
│    ●
│ ●
│
└──────────────── X
```

Scatter plot sangat sering digunakan dalam Exploratory Data Analysis atau EDA.

## Contoh Scatter Plot dengan Fungsi Eksponensial

Kita dapat menggunakan NumPy untuk membuat fungsi eksponensial.

```python
x = np.linspace(0, 10, 100)

fig, ax = plt.subplots()

ax.scatter(x, np.exp(x))

plt.show()
```

![matplotlib](/img/python/15.png)

Fungsi:

```python
np.exp(x)
```

menghasilkan nilai:

```text
eˣ
```

Dengan scatter plot, kita dapat melihat bagaimana nilai tersebut meningkat seiring bertambahnya `x`.

## Contoh Scatter Plot dengan Fungsi Sinus

NumPy juga menyediakan fungsi trigonometri seperti:

```python
np.sin()
```

Contoh:

```python
x = np.linspace(0, 10, 100)

fig, ax = plt.subplots()

ax.scatter(x, np.sin(x))

plt.show()
```

![matplotlib](/img/python/16.png)

Fungsi:

```python
np.sin(x)
```

menghasilkan pola gelombang.

Visualisasi tersebut dapat membantu kita memahami hubungan antara fungsi matematika dan grafik.

## Line Plot vs Scatter Plot

Perbedaan dasar:

| Plot | Karakteristik | Penggunaan |
|---|---|---|
| Line Plot | Titik dihubungkan dengan garis | Tren dan data kontinu |
| Scatter Plot | Data ditampilkan sebagai titik | Persebaran dan hubungan antarvariabel |

Secara visual:

```text
Line Plot

●────●────●────●────●
```

Sedangkan:

```text
Scatter Plot

●       ●

    ●

          ●     ●
```

Pemilihan jenis plot harus disesuaikan dengan tujuan analisis.

## Bar Plot

Jenis visualisasi berikutnya adalah **bar plot**.

Bar plot digunakan untuk membandingkan nilai berdasarkan kategori.

Contohnya kita memiliki data harga produk:

```python
nut_butter_prices = {
    "Almond butter": 10,
    "Peanut butter": 8,
    "Cashew butter": 12,
}
```

Data tersebut berbentuk Python dictionary.

Strukturnya:

```text
Kategori          Harga
-----------------------
Almond butter       10
Peanut butter        8
Cashew butter       12
```

Kita dapat mengubahnya menjadi bar plot.

```python
fig, ax = plt.subplots()

ax.bar(
    nut_butter_prices.keys(),
    height=nut_butter_prices.values()
)

plt.show()
```

![matplotlib](/img/python/17.png)

## Memahami `ax.bar()`

Pada kode:

```python
ax.bar(
    nut_butter_prices.keys(),
    height=nut_butter_prices.values()
)
```

bagian:

```python
nut_butter_prices.keys()
```

digunakan sebagai kategori pada sumbu X.

Sedangkan:

```python
nut_butter_prices.values()
```

digunakan sebagai tinggi batang.

Secara konsep:

```text
X
↓
Kategori

Y
↓
Nilai / tinggi batang
```

## Menambahkan Title dan Label

Agar grafik lebih informatif, tambahkan title dan label.

```python
fig, ax = plt.subplots()

ax.bar(
    nut_butter_prices.keys(),
    height=nut_butter_prices.values()
)

ax.set(
    title="Toko Mentega Kacang",
    xlabel="Jenis Mentega",
    ylabel="Harga ($)"
)

plt.show()
```

![matplotlib](/img/python/18.png)

Sekarang pembaca dapat memahami:

```text
Title
→ Apa yang ditampilkan?

X Label
→ Apa kategori pada sumbu X?

Y Label
→ Apa nilai pada sumbu Y?
```

## Contoh Lengkap Bar Plot

```python
import matplotlib.pyplot as plt

nut_butter_prices = {
    "Almond butter": 10,
    "Peanut butter": 8,
    "Cashew butter": 12,
}

fig, ax = plt.subplots(figsize=(10, 6))

ax.bar(
    nut_butter_prices.keys(),
    height=nut_butter_prices.values()
)

ax.set(
    title="Harga Nut Butter",
    xlabel="Jenis Nut Butter",
    ylabel="Harga ($)"
)

plt.show()
```

## Mengapa Bar Plot Cocok untuk Data Kategori?

Misalnya kita ingin membandingkan:

```text
Produk A → 10
Produk B → 8
Produk C → 12
```

Bar plot membuat perbandingan tersebut mudah dilihat:

```text
Produk A   ██████████ 10
Produk B   ████████    8
Produk C   ████████████ 12
```

Semakin tinggi atau panjang batang, semakin besar nilainya.

Karena itu, bar plot sangat cocok untuk membandingkan nilai antar kategori.

## Tiga Plot Dasar yang Perlu Dipahami

Pada tahap awal belajar Matplotlib, tiga jenis plot yang sangat penting adalah:

```text
Line Plot
    ↓
Melihat tren / hubungan kontinu

Scatter Plot
    ↓
Melihat persebaran data

Bar Plot
    ↓
Membandingkan kategori
```

Tabel perbandingan:

| Jenis | Fungsi Utama | Contoh |
|---|---|---|
| Line | Melihat tren | Penjualan dari waktu ke waktu |
| Scatter | Melihat hubungan/persebaran | Tinggi vs berat |
| Bar | Membandingkan kategori | Harga produk |

## Menggunakan Object-Oriented API

Pada materi sebelumnya kita telah membahas:

```python
fig, ax = plt.subplots()
```

Pola ini akan menjadi pola utama dalam materi Matplotlib.

Contoh:

```python
fig, ax = plt.subplots()

ax.plot(x, y)

plt.show()
```

Kita memiliki:

```text
fig
 ↓
Figure

ax
 ↓
Axes
```

Kemudian plotting dilakukan pada:

```python
ax
```

Contohnya:

```python
ax.plot()
ax.scatter()
ax.bar()
```

## Mengapa `fig, ax = plt.subplots()` Digunakan?

Pola:

```python
fig, ax = plt.subplots()
```

memberikan struktur yang jelas antara:

```text
Figure
  ↓
Axes
  ↓
Plot
```

Ketika visualisasi menjadi lebih kompleks, pendekatan ini memudahkan kita mengelola beberapa Axes.

Karena itu, kita akan mempertahankan pola ini dalam materi berikutnya.

## Menggunakan Semicolon

Ketika menjalankan kode plotting di Jupyter Notebook, terkadang kita dapat melihat output berupa representasi objek.

Misalnya:

```python
ax.plot(x, x**2)
```

Notebook dapat menampilkan representasi objek `Line2D`.

Jika ingin menyembunyikan output tersebut, kita dapat menggunakan:

```python
ax.plot(x, x**2);
```

Titik koma hanya menghilangkan representasi output dari ekspresi tersebut pada notebook.

Alternatif yang lebih eksplisit adalah:

```python
ax.plot(x, x**2)

plt.show()
```

Perlu dipahami bahwa semicolon bukan bagian penting dari proses plotting itu sendiri.

## Contoh Workflow Lengkap

Berikut workflow sederhana yang menggabungkan NumPy dan Matplotlib:

```python
import numpy as np
import matplotlib.pyplot as plt

# 1. Membuat data
x = np.linspace(0, 10, 100)

# 2. Membuat Figure dan Axes
fig, ax = plt.subplots()

# 3. Membuat plot
ax.plot(x, x**2)

# 4. Menambahkan informasi
ax.set(
    title="Fungsi Kuadrat",
    xlabel="X",
    ylabel="Y"
)

# 5. Menampilkan grafik
plt.show()
```

Workflow:

```text
Import
  ↓
np.linspace()
  ↓
Membuat data X
  ↓
Membuat Figure + Axes
  ↓
Plot
  ↓
Customization
  ↓
Show
```

## Contoh Membandingkan Tiga Jenis Plot

Kita dapat menggunakan data yang sama untuk memahami perbedaan jenis visualisasi.

### Line Plot

```python
fig, ax = plt.subplots()

ax.plot(x, x**2)

ax.set(
    title="Line Plot",
    xlabel="X",
    ylabel="Y"
)

plt.show()
```

### Scatter Plot

```python
fig, ax = plt.subplots()

ax.scatter(x, x**2)

ax.set(
    title="Scatter Plot",
    xlabel="X",
    ylabel="Y"
)

plt.show()
```

### Bar Plot

Untuk bar plot, kita biasanya menggunakan data kategori:

```python
products = ["Almond", "Peanut", "Cashew"]
prices = [10, 8, 12]

fig, ax = plt.subplots()

ax.bar(products, prices)

ax.set(
    title="Harga Produk",
    xlabel="Produk",
    ylabel="Harga ($)"
)

plt.show()
```

Ketiga visualisasi tersebut memiliki tujuan yang berbeda meskipun sama-sama menggunakan Matplotlib.

## Memilih Jenis Plot

Pemilihan jenis visualisasi sebaiknya dimulai dari pertanyaan:

> Apa yang ingin saya komunikasikan dari data?

Gunakan **line plot** jika ingin melihat:

```text
Tren
Perubahan
Hubungan kontinu
Time series
```

Gunakan **scatter plot** jika ingin melihat:

```text
Persebaran
Hubungan dua variabel
Korelasi
Outlier
```

Gunakan **bar plot** jika ingin melihat:

```text
Perbandingan kategori
Nilai antar kelompok
Ranking sederhana
```

Visualisasi bukan hanya masalah membuat grafik terlihat bagus, tetapi juga memilih bentuk visual yang sesuai dengan informasi yang ingin disampaikan.

## Hubungan dengan Exploratory Data Analysis

Visualisasi menggunakan Matplotlib merupakan bagian penting dari **Exploratory Data Analysis (EDA)**.

Workflow sederhana:

```text
Dataset
   ↓
Memahami struktur data
   ↓
Cleaning
   ↓
Exploratory Data Analysis
   ↓
Visualisasi
   ↓
Menemukan pola
   ↓
Membangun model
```

Contohnya, kita dapat menggunakan scatter plot untuk melihat apakah dua variabel memiliki hubungan tertentu.

Kemudian bar plot dapat digunakan untuk membandingkan kelompok.

Line plot dapat digunakan untuk melihat perubahan suatu nilai dari waktu ke waktu.

## Ringkasan

NumPy dan Matplotlib dapat digunakan secara bersama-sama untuk membuat visualisasi data.

NumPy digunakan untuk membuat dan mengolah data:

```python
x = np.linspace(0, 10, 100)
```

Kemudian Matplotlib digunakan untuk memvisualisasikan data:

```python
fig, ax = plt.subplots()

ax.plot(x, x**2)

plt.show()
```

Tiga jenis plot dasar yang dipelajari:

### Line Plot

```python
ax.plot(x, y)
```

Digunakan untuk melihat tren atau hubungan kontinu.

### Scatter Plot

```python
ax.scatter(x, y)
```

Digunakan untuk melihat persebaran dan hubungan antarvariabel.

### Bar Plot

```python
ax.bar(categories, values)
```

Digunakan untuk membandingkan data berdasarkan kategori.

## Cheat Sheet

### Membuat Data

```python
x = np.linspace(0, 10, 100)
```

### Line Plot

```python
fig, ax = plt.subplots()

ax.plot(x, x**2)

plt.show()
```

### Scatter Plot

```python
fig, ax = plt.subplots()

ax.scatter(x, np.sin(x))

plt.show()
```

### Bar Plot

```python
fig, ax = plt.subplots()

ax.bar(
    ["Almond", "Peanut", "Cashew"],
    [10, 8, 12]
)

plt.show()
```

### Menambahkan Informasi

```python
ax.set(
    title="Judul Grafik",
    xlabel="Sumbu X",
    ylabel="Sumbu Y"
)
```

## Checklist Pembelajaran

Setelah menyelesaikan materi ini, Anda seharusnya dapat:

- [ ] Menjelaskan hubungan NumPy dan Matplotlib.
- [ ] Menggunakan `np.linspace()`.
- [ ] Menjelaskan parameter `start`, `stop`, dan `num`.
- [ ] Membedakan `np.linspace()` dan `np.arange()`.
- [ ] Membuat line plot.
- [ ] Membuat scatter plot.
- [ ] Membuat bar plot.
- [ ] Menentukan kapan menggunakan line plot.
- [ ] Menentukan kapan menggunakan scatter plot.
- [ ] Menentukan kapan menggunakan bar plot.
- [ ] Menggunakan `fig, ax = plt.subplots()`.
- [ ] Menambahkan title.
- [ ] Menambahkan X label.
- [ ] Menambahkan Y label.
- [ ] Menggunakan `ax.set()`.
- [ ] Menampilkan grafik menggunakan `plt.show()`.
- [ ] Memahami fungsi semicolon pada Jupyter Notebook.
- [ ] Menghubungkan visualisasi dengan Exploratory Data Analysis.

## Latihan

### Latihan 1 - `linspace()`

Buat array:

```python
x = np.linspace(0, 20, 200)
```

Kemudian periksa:

```python
print(x.size)
print(x[0])
print(x[-1])
```

Jelaskan hasilnya.

### Latihan 2 - Line Plot

Gunakan:

```python
x = np.linspace(0, 10, 100)
```

Buat line plot untuk fungsi:

```text
y = x²
```

Kemudian tambahkan:

- Title.
- X label.
- Y label.
- Grid.

### Latihan 3 - Scatter Plot

Gunakan data:

```python
x = np.linspace(0, 10, 100)
y = np.sin(x)
```

Buat scatter plot.

Kemudian ubah jumlah data menjadi:

```python
x = np.linspace(0, 10, 20)
```

Bandingkan hasil visualisasinya.

### Latihan 4 - Bar Plot

Gunakan data:

```python
products = {
    "Laptop": 1200,
    "Keyboard": 100,
    "Mouse": 50,
    "Monitor": 300
}
```

Buat bar plot yang menampilkan:

- Produk pada sumbu X.
- Harga pada sumbu Y.
- Title.
- X label.
- Y label.

### Latihan 5 - Eksperimen

Buat satu dataset kemudian visualisasikan menggunakan:

```text
Line Plot
Scatter Plot
```

Bandingkan kedua visualisasi tersebut.

Jelaskan:

1. Apa perbedaan tampilan?
2. Apa informasi yang lebih mudah dilihat pada line plot?
3. Apa informasi yang lebih mudah dilihat pada scatter plot?
4. Dalam kondisi apa masing-masing plot lebih sesuai digunakan?
