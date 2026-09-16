---
sidebar_position: 3
title: "Anatomi Matplotlib Figure"
---

Ketika membuat visualisasi menggunakan Matplotlib, kita tidak hanya membuat sebuah "grafik".

Di balik sebuah grafik terdapat beberapa objek dan komponen yang saling berhubungan.

Memahami struktur tersebut akan membantu kita ketika mulai melakukan:

- Kustomisasi grafik.
- Membuat beberapa grafik sekaligus.
- Mengatur ukuran Figure.
- Membuat subplot.
- Menambahkan title dan label.
- Menyimpan grafik.
- Mengatur layout visualisasi.

Struktur dasarnya dapat digambarkan sebagai:

```text
Figure
  │
  └── Axes
       │
       ├── X Axis
       ├── Y Axis
       ├── X Label
       ├── Y Label
       ├── Title
       ├── Plot
       └── Legend / Grid / Tick
```

Pemahaman struktur ini merupakan dasar penting untuk menggunakan **Object-Oriented API** pada Matplotlib.

![matplotlib](/img/python/12.png)

## Komponen Utama Matplotlib Figure

Beberapa komponen yang perlu dipahami:

| Komponen | Pengertian |
|---|---|
| Figure | Container atau canvas utama |
| Axes | Area tempat data diplot |
| Axis | Sumbu koordinat X atau Y |
| Title | Judul visualisasi |
| X Label | Keterangan sumbu X |
| Y Label | Keterangan sumbu Y |
| Plot | Representasi visual dari data |
| Tick | Penanda nilai pada Axis |
| Legend | Keterangan untuk data yang diplot |

## Figure

**Figure** adalah container atau canvas utama dari sebuah visualisasi Matplotlib.

Ketika kita membuat:

```python
fig, ax = plt.subplots()
```

variabel:

```python
fig
```

merupakan objek `Figure`.

Secara sederhana:

```text
Figure
┌───────────────────────────────────────┐
│                                       │
│              Canvas                   │
│                                       │
│       ┌───────────────────────┐       │
│       │                       │       │
│       │        Axes           │       │
│       │                       │       │
│       └───────────────────────┘       │
│                                       │
└───────────────────────────────────────┘
```

Sebuah Figure dapat memiliki satu atau beberapa Axes.

Contohnya:

```text
Figure
│
├── Axes 1
├── Axes 2
├── Axes 3
└── Axes 4
```

Konsep ini sangat penting ketika membuat beberapa grafik dalam satu Figure.

## Axes

**Axes** adalah area tempat data benar-benar diplot.

Ketika kita membuat:

```python
fig, ax = plt.subplots()
```

variabel:

```python
ax
```

merupakan objek `Axes`.

Di dalam Axes terdapat berbagai elemen visualisasi seperti:

- Data.
- X Axis.
- Y Axis.
- X Label.
- Y Label.
- Title.
- Tick.
- Grid.
- Legend.

Contoh:

```text
Figure
┌───────────────────────────────────────┐
│                                       │
│      Title                            │
│                                       │
│   Y Axis                              │
│     │     ●                           │
│     │   ●                             │
│     │ ●                               │
│     │                                 │
│     └──────────────────────── X Axis  │
│                                       │
└───────────────────────────────────────┘
```

Perhatikan bahwa **Axes bukan hanya sumbu**.

Axes adalah keseluruhan area plotting yang memiliki Axis sebagai bagian di dalamnya.

## Axes vs Axis

Istilah `Axes` dan `Axis` sering tertukar.

### Axes

`Axes` adalah area tempat data diplot.

```python
fig, ax = plt.subplots()
```

Variabel:

```python
ax
```

adalah objek Axes.

### Axis

`Axis` adalah sumbu koordinat.

Pada grafik 2D biasanya terdapat:

```text
X Axis
Y Axis
```

Secara konseptual:

```text
Figure
  ↓
Axes
  ├── X Axis
  └── Y Axis
```

Jadi:

```text
Axes ≠ Axis
```

`Axes` adalah area plotting, sedangkan `Axis` adalah sumbu yang terdapat di dalamnya.

## X Axis

**X Axis** merupakan sumbu horizontal.

Contohnya:

```text
                 X Axis
     ─────────────────────────────→
     1      2      3      4      5
```

X Axis biasanya digunakan untuk merepresentasikan:

- Waktu.
- Kategori.
- Nilai input.
- Variabel independen.
- Posisi.

Contohnya:

```python
x = [1, 2, 3, 4, 5]
```

## Y Axis

**Y Axis** merupakan sumbu vertikal.

```text
       Y Axis
          ↑
     50   │
     40   │
     30   │
     20   │
     10   │
          └────────────────────→
                   X Axis
```

Y Axis dapat digunakan untuk merepresentasikan:

- Nilai hasil.
- Jumlah.
- Harga.
- Suhu.
- Skor.
- Variabel dependen.

Contohnya:

```python
y = [10, 20, 30, 40, 50]
```

## X Label

X Label memberikan informasi mengenai apa yang direpresentasikan oleh sumbu X.

Contoh:

```python
ax.set_xlabel("Bulan")
```

Jika grafik menampilkan penjualan bulanan, label:

```text
Bulan
```

memberikan konteks kepada pembaca.

## Y Label

Y Label memberikan informasi mengenai apa yang direpresentasikan oleh sumbu Y.

Contoh:

```python
ax.set_ylabel("Penjualan")
```

Dengan demikian pembaca mengetahui bahwa nilai pada Y Axis merupakan data penjualan.

## Title

Title merupakan judul utama dari sebuah visualisasi.

Contoh:

```python
ax.set_title("Penjualan Bulanan")
```

Title membantu pembaca memahami konteks grafik tanpa harus membaca kode program.

## Plot

Plot adalah representasi visual dari data.

Beberapa jenis plot yang umum:

```text
Line Plot
Scatter Plot
Bar Plot
Histogram
Box Plot
```

Contoh line plot:

```python
ax.plot(x, y)
```

Contoh scatter plot:

```python
ax.scatter(x, y)
```

Contoh bar plot:

```python
ax.bar(x, y)
```

Jenis plot yang digunakan bergantung pada karakteristik data dan tujuan analisis.

## Tick

Tick merupakan penanda nilai pada Axis.

Contohnya:

```text
Y Axis

50 ┤
40 ┤
30 ┤
20 ┤
10 ┤
   └────────────────
      1  2  3  4  5
```

Angka:

```text
10
20
30
40
50
```

merupakan contoh tick pada Y Axis.

Sedangkan:

```text
1
2
3
4
5
```

merupakan contoh tick pada X Axis.

Tick membantu pembaca membaca nilai pada grafik.

## Legend

Jika sebuah grafik memiliki beberapa data, kita dapat menggunakan legend untuk menjelaskan masing-masing data.

Contoh:

```python
ax.plot(x, y1, label="Produk A")
ax.plot(x, y2, label="Produk B")

ax.legend()
```

Legend dapat membantu pembaca mengetahui garis atau marker mana yang mewakili masing-masing dataset.

## Grid

Grid merupakan garis bantu yang dapat digunakan untuk mempermudah pembacaan nilai.

Contoh:

```python
ax.grid()
```

Grid dapat membantu ketika pembaca perlu memperkirakan nilai data berdasarkan posisi pada grafik.

Namun, penggunaannya tetap perlu disesuaikan dengan kebutuhan visualisasi.

## Object-Oriented Workflow

Sekarang kita akan melihat workflow standar menggunakan Object-Oriented API.

Secara umum:

```text
1. Import library
       ↓
2. Siapkan data
       ↓
3. Buat Figure dan Axes
       ↓
4. Plot data
       ↓
5. Kustomisasi
       ↓
6. Simpan / tampilkan
```

## Step 1 - Import Library

Import Matplotlib:

```python
import matplotlib.pyplot as plt
```

Jika menggunakan NumPy:

```python
import numpy as np
import matplotlib.pyplot as plt
```

## Step 2 - Menyiapkan Data

Contoh sederhana:

```python
x = [1, 2, 3, 4]
y = [11, 22, 33, 44]
```

Data tersebut akan digunakan sebagai:

```text
X → [1, 2, 3, 4]

Y → [11, 22, 33, 44]
```

Sehingga titik yang diplot adalah:

```text
(1, 11)
(2, 22)
(3, 33)
(4, 44)
```

## Step 3 - Membuat Figure dan Axes

Gunakan:

```python
fig, ax = plt.subplots()
```

Sekarang kita memiliki:

```text
fig → Figure
ax  → Axes
```

Kita dapat memeriksa tipe objek tersebut:

```python
print(type(fig))
print(type(ax))
```

Secara umum:

```text
fig → matplotlib.figure.Figure
ax  → matplotlib.axes.Axes
```

## Step 4 - Menentukan Ukuran Figure

Ukuran Figure dapat diatur menggunakan parameter `figsize`.

Contoh:

```python
fig, ax = plt.subplots(figsize=(10, 5))
```

Formatnya:

```text
figsize=(width, height)
```

Satuannya adalah **inci**.

Jadi:

```python
figsize=(10, 5)
```

berarti:

```text
Width  = 10 inch
Height = 5 inch
```

Perlu diperhatikan bahwa `figsize` menentukan ukuran Figure, bukan jumlah pixel secara langsung.

## Step 5 - Plot Data

Setelah Axes dibuat, kita dapat memasukkan data:

```python
ax.plot(x, y)
```

Sekarang data berada di dalam Axes.

```text
Figure
└── Axes
     └── Line Plot
```

## Step 6 - Menambahkan Title dan Label

Kita dapat menambahkan title dan label.

```python
ax.set(
    title="Contoh Plot Sederhana",
    xlabel="Sumbu X",
    ylabel="Sumbu Y"
)
```

Method `set()` memungkinkan kita mengatur beberapa property Axes sekaligus.

Alternatifnya, kita dapat menuliskannya satu per satu:

```python
ax.set_title("Contoh Plot Sederhana")
ax.set_xlabel("Sumbu X")
ax.set_ylabel("Sumbu Y")
```

Kedua pendekatan tersebut dapat digunakan.

## Mengapa Menggunakan `ax.set()`?

Tanpa `set()`:

```python
ax.set_title("Contoh Plot")
ax.set_xlabel("Sumbu X")
ax.set_ylabel("Sumbu Y")
```

Dengan `set()`:

```python
ax.set(
    title="Contoh Plot",
    xlabel="Sumbu X",
    ylabel="Sumbu Y"
)
```

Untuk beberapa property sederhana, `set()` membuat kode lebih ringkas.

Namun, ketika konfigurasi semakin kompleks, memanggil method secara terpisah sering kali membuat kode lebih mudah dibaca.

## Step 7 - Menampilkan Grafik

Setelah selesai membuat grafik, kita dapat menampilkannya:

```python
plt.show()
```

Contoh lengkap:

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [11, 22, 33, 44]

fig, ax = plt.subplots(figsize=(10, 5))

ax.plot(x, y)

ax.set(
    title="Contoh Plot Sederhana",
    xlabel="Sumbu X",
    ylabel="Sumbu Y"
)

plt.show()
```

![matplotlib](/img/python/13.png)

## Step 8 - Menyimpan Grafik

Figure dapat disimpan menggunakan:

```python
fig.savefig("sample-plot.png")
```

Contoh lengkap:

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [11, 22, 33, 44]

fig, ax = plt.subplots(figsize=(10, 5))

ax.plot(x, y)

ax.set(
    title="Contoh Plot Sederhana",
    xlabel="Sumbu X",
    ylabel="Sumbu Y"
)

fig.savefig("sample-plot.png")

plt.show()
```

Perhatikan bahwa kita menggunakan:

```python
fig.savefig()
```

karena kita ingin menyimpan Figure yang telah dibuat.

## Workflow Lengkap

Seluruh proses dapat diringkas menjadi:

```python
# 1. Import
import matplotlib.pyplot as plt

# 2. Data
x = [1, 2, 3, 4]
y = [11, 22, 33, 44]

# 3. Figure dan Axes
fig, ax = plt.subplots(figsize=(10, 5))

# 4. Plot
ax.plot(x, y)

# 5. Customization
ax.set(
    title="Contoh Plot Sederhana",
    xlabel="Sumbu X",
    ylabel="Sumbu Y"
)

# 6. Save
fig.savefig("sample-plot.png")

# 7. Show
plt.show()
```

Workflow tersebut menjadi pola dasar yang akan digunakan pada banyak materi Matplotlib berikutnya.

## Visualisasi Struktur Figure

Struktur kode:

```text
fig, ax = plt.subplots()
        │
        ├──────────────┐
        ↓              ↓
      Figure          Axes
        │              │
        │              ├── Plot
        │              ├── X Axis
        │              ├── Y Axis
        │              ├── Title
        │              ├── X Label
        │              ├── Y Label
        │              ├── Tick
        │              └── Legend
        │
        └── Save / Layout / Size
```

Dengan memahami struktur ini, kode Matplotlib akan lebih mudah dipahami.

## Menggunakan NumPy dengan Matplotlib

Matplotlib dapat bekerja langsung dengan NumPy Array.

Contoh:

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.arange(0, 10)
y = x ** 2

fig, ax = plt.subplots(figsize=(10, 5))

ax.plot(x, y)

ax.set(
    title="Fungsi Kuadrat",
    xlabel="X",
    ylabel="Y"
)

plt.show()
```

Workflow:

```text
NumPy
 ↓
Membuat data
 ↓
Matplotlib
 ↓
Figure + Axes
 ↓
Plot
 ↓
Visualization
```

Ini merupakan salah satu kombinasi yang sangat umum dalam Data Science.

## Satu Figure dengan Satu Axes

Kasus paling sederhana adalah satu Figure dengan satu Axes.

```python
fig, ax = plt.subplots()
```

Strukturnya:

```text
Figure
└── Axes
```

Contoh:

```python
fig, ax = plt.subplots()

ax.plot(x, y)

plt.show()
```

## Satu Figure dengan Banyak Axes

Matplotlib juga memungkinkan kita membuat beberapa Axes dalam satu Figure.

Contoh:

```python
fig, ax = plt.subplots(2, 2)
```

Strukturnya:

```text
Figure
├── Axes 1
├── Axes 2
├── Axes 3
└── Axes 4
```

Secara visual:

```text
┌───────────────┬───────────────┐
│    Axes 1     │    Axes 2     │
│               │               │
├───────────────┼───────────────┤
│    Axes 3     │    Axes 4     │
│               │               │
└───────────────┴───────────────┘
```

Konsep ini akan dipelajari lebih lanjut ketika membahas **subplots**.

## Mengapa Memahami Anatomy Figure Penting?

Tanpa memahami struktur Figure dan Axes, kita mungkin hanya menghafalkan kode:

```python
plt.plot()
```

Namun ketika kebutuhan visualisasi bertambah, kita akan menemukan kode seperti:

```python
fig, ax = plt.subplots()
```

atau:

```python
fig, ax = plt.subplots(2, 2)
```

Kemudian:

```python
ax[0, 0].plot()
ax[0, 1].scatter()
ax[1, 0].bar()
ax[1, 1].hist()
```

Jika kita sudah memahami hubungan:

```text
Figure
  ↓
Axes
  ↓
Plot
```

maka struktur kode tersebut menjadi lebih mudah dipahami.

## Kesalahan Konsep yang Sering Terjadi

### Menganggap Figure sebagai Grafik

Figure bukan sekadar grafik.

Figure merupakan container utama yang dapat menampung satu atau beberapa Axes.

```text
Figure
├── Axes 1
├── Axes 2
└── Axes 3
```

### Menganggap Axes Sama dengan Axis

Ini juga sering terjadi.

```text
Axes
├── X Axis
└── Y Axis
```

Jadi Axes merupakan area plotting, sedangkan Axis merupakan sumbu.

### Menganggap `figsize` Menggunakan Pixel

Contoh:

```python
figsize=(10, 5)
```

bukan berarti:

```text
1000 × 500 pixel
```

`figsize` menggunakan satuan **inch**.

Resolusi output dapat dipengaruhi oleh parameter `dpi`.

Contohnya:

```python
fig, ax = plt.subplots(
    figsize=(10, 5),
    dpi=100
)
```

Secara konseptual ukuran raster dapat berkaitan dengan:

```text
width  = 10 × 100 = 1000 pixel
height = 5 × 100  = 500 pixel
```

## Ringkasan

Anatomy sebuah visualisasi Matplotlib dapat dipahami melalui struktur:

```text
Figure
  ↓
Axes
  ↓
Axis + Plot + Labels + Title + Tick + Legend
```

### Figure

Merupakan container atau canvas utama.

```python
fig
```

### Axes

Merupakan area tempat data diplot.

```python
ax
```

### Axis

Merupakan sumbu koordinat:

```text
X Axis
Y Axis
```

### Title

Memberikan judul visualisasi:

```python
ax.set_title("Judul")
```

### X Label

Memberikan keterangan sumbu X:

```python
ax.set_xlabel("X")
```

### Y Label

Memberikan keterangan sumbu Y:

```python
ax.set_ylabel("Y")
```

### `figsize`

Mengatur ukuran Figure dalam inci:

```python
fig, ax = plt.subplots(figsize=(10, 5))
```

### `ax.set()`

Memungkinkan beberapa property Axes diatur sekaligus:

```python
ax.set(
    title="Judul",
    xlabel="X",
    ylabel="Y"
)
```

### `fig.savefig()`

Menyimpan Figure:

```python
fig.savefig("sample-plot.png")
```

## Cheat Sheet

```python
import matplotlib.pyplot as plt

# Data
x = [1, 2, 3, 4]
y = [11, 22, 33, 44]

# Figure + Axes
fig, ax = plt.subplots(figsize=(10, 5))

# Plot
ax.plot(x, y)

# Customization
ax.set(
    title="Contoh Plot",
    xlabel="Sumbu X",
    ylabel="Sumbu Y"
)

# Save
fig.savefig("sample-plot.png")

# Show
plt.show()
```

Struktur utamanya:

```text
fig
 ↓
Figure

ax
 ↓
Axes
 ↓
plot()
set()
grid()
legend()
```

## Checklist Pembelajaran

Setelah menyelesaikan materi ini, Anda seharusnya dapat:

- [ ] Menjelaskan apa itu Figure.
- [ ] Menjelaskan apa itu Axes.
- [ ] Membedakan Axes dan Axis.
- [ ] Menjelaskan fungsi X Axis.
- [ ] Menjelaskan fungsi Y Axis.
- [ ] Menjelaskan fungsi X Label.
- [ ] Menjelaskan fungsi Y Label.
- [ ] Menjelaskan fungsi Title.
- [ ] Memahami Tick dan Legend.
- [ ] Membuat Figure menggunakan `plt.subplots()`.
- [ ] Membuat Axes menggunakan `plt.subplots()`.
- [ ] Mengatur ukuran Figure menggunakan `figsize`.
- [ ] Melakukan plotting menggunakan `ax.plot()`.
- [ ] Menggunakan `ax.set()`.
- [ ] Menyimpan Figure menggunakan `fig.savefig()`.
- [ ] Memahami hubungan Figure → Axes → Axis → Plot.

## Latihan

### Latihan 1 - Anatomy Figure

Buat sebuah Figure dan Axes:

```python
fig, ax = plt.subplots()
```

Kemudian periksa:

```python
print(type(fig))
print(type(ax))
```

Jelaskan perbedaan kedua objek tersebut.

### Latihan 2 - Membuat Plot

Gunakan:

```python
x = [1, 2, 3, 4, 5]
y = [10, 20, 15, 30, 25]
```

Buat sebuah line plot menggunakan:

```python
ax.plot(x, y)
```

Tambahkan:

- Title.
- X Label.
- Y Label.
- Grid.

### Latihan 3 - Mengatur Ukuran Figure

Buat Figure dengan ukuran:

```python
figsize=(12, 6)
```

Kemudian bandingkan hasilnya dengan:

```python
figsize=(6, 3)
```

Perhatikan perbedaan ukuran visualisasi.

### Latihan 4 - Menyimpan Figure

Buat sebuah grafik kemudian simpan sebagai:

```python
fig.savefig("latihan-matplotlib.png")
```

Pastikan file berhasil dibuat.

### Latihan 5 - Eksplorasi

Coba buat grafik menggunakan:

```python
fig, ax = plt.subplots()

ax.plot(x, y)

ax.set_title("Data Saya")
ax.set_xlabel("X")
ax.set_ylabel("Y")

ax.grid()

plt.show()
```

Kemudian identifikasi bagian berikut pada hasil visualisasi:

```text
Figure
Axes
X Axis
Y Axis
Title
X Label
Y Label
Tick
Plot
Grid
```
