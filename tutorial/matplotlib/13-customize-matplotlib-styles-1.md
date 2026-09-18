---
sidebar_position: 14
title: "Customizing Matplotlib Styles - 1"
---

Setelah mempelajari cara membuat visualisasi menggunakan Object-Oriented Matplotlib, langkah berikutnya adalah **mengatur tampilan grafik** agar lebih informatif, konsisten, dan mudah dibaca.

Matplotlib menyediakan berbagai fitur untuk melakukan kustomisasi, mulai dari:

- Style grafik.
- Judul.
- Label sumbu.
- Legenda.
- Grid.
- Warna.
- Marker.
- Ukuran grafik.
- Batas sumbu.
- Dan berbagai elemen visual lainnya.

Pada materi ini kita akan mempelajari dasar-dasar **customizing Matplotlib plots**.

## Tujuan Pembelajaran

Setelah mempelajari materi ini, kita diharapkan dapat:

- Mengetahui apa yang dimaksud dengan Matplotlib style.
- Melihat style yang tersedia.
- Menerapkan style pada visualisasi.
- Membuat DataFrame sederhana untuk latihan.
- Membuat bar plot dari DataFrame.
- Memberikan judul dan label menggunakan `ax.set()`.
- Mengatur legenda.
- Memahami perbedaan antara style global dan kustomisasi sebuah Axes.

## Apa Itu Customizing Plot?

Ketika kita membuat grafik menggunakan Matplotlib, grafik yang dihasilkan biasanya menggunakan pengaturan default.

Contohnya:

```python
import matplotlib.pyplot as plt

plt.plot([1, 2, 3, 4])
plt.show()
```

Grafik tersebut sudah dapat digunakan.

Namun, dalam praktik Data Science, grafik sering kali perlu disesuaikan agar:

- lebih mudah dibaca,
- memiliki konteks yang jelas,
- sesuai dengan laporan,
- sesuai dengan identitas visual,
- dan dapat menyampaikan informasi dengan lebih baik.

Proses mengubah tampilan tersebut disebut **customization**.

Contohnya:

```text
Default Plot
     ↓
Customizing
     ↓
    Title
    Labels
    Legend
    Grid
    Style
    Colors
    Markers
    Size
     ↓
Informative Visualization
```

## Menggunakan Matplotlib Style

Matplotlib menyediakan berbagai **style bawaan**.

Style merupakan sekumpulan pengaturan tampilan yang dapat diterapkan pada grafik.

Style dapat memengaruhi berbagai aspek seperti:

- warna,
- background,
- grid,
- font,
- garis,
- dan elemen visual lainnya.

Dengan style, kita tidak perlu mengatur setiap elemen satu per satu dari awal.

## Melihat Style yang Tersedia

Untuk melihat daftar style yang tersedia, gunakan:

```python
import matplotlib.pyplot as plt

plt.style.available
```

Hasilnya berupa daftar nama style yang tersedia pada versi Matplotlib yang digunakan.

Contohnya dapat berisi:

```text
[
 'Solarize_Light2',
 'bmh',
 'classic',
 'dark_background',
 'fast',
 'fivethirtyeight',
 'ggplot',
 'grayscale',
 'petroff10',
 'petroff6',
 'petroff8',
 'seaborn-v0_8',
 'seaborn-v0_8-bright',
 'seaborn-v0_8-colorblind',
 'seaborn-v0_8-dark',
 'seaborn-v0_8-dark-palette',
 'seaborn-v0_8-darkgrid',
 'seaborn-v0_8-deep',
 'seaborn-v0_8-muted',
 'seaborn-v0_8-notebook',
 'seaborn-v0_8-paper',
 'seaborn-v0_8-pastel',
 'seaborn-v0_8-poster',
 'seaborn-v0_8-talk',
 'seaborn-v0_8-ticks',
 'seaborn-v0_8-white',
 'seaborn-v0_8-whitegrid',
 'tableau-colorblind10'
]
```

Daftar tersebut dapat berbeda tergantung versi Matplotlib dan lingkungan Python yang digunakan.

Karena itu, sebaiknya jangan mengasumsikan bahwa setiap komputer memiliki nama style yang sama.

Gunakan:

```python
plt.style.available
```

untuk melihat style yang benar-benar tersedia di lingkungan kita.

## Menerapkan Style

Setelah mengetahui nama style yang tersedia, kita dapat menerapkannya menggunakan:

```python
plt.style.use("ggplot")
```

Contoh lengkap:

```python
import matplotlib.pyplot as plt

plt.style.use("ggplot")

plt.plot(
    [1, 2, 3, 4],
    [10, 20, 15, 30]
)

plt.show()
```

Style akan memengaruhi tampilan grafik yang dibuat setelah style tersebut diterapkan.

## Style Berlaku pada Plot Berikutnya

Perhatikan bahwa:

```python
plt.style.use("ggplot")
```

mengubah konfigurasi style Matplotlib yang digunakan pada sesi tersebut.

Misalnya:

```python
plt.style.use("ggplot")

plt.plot([1, 2, 3])
plt.show()

plt.bar(
    ["A", "B", "C"],
    [10, 20, 15]
)

plt.show()
```

Kedua visualisasi tersebut akan menggunakan konfigurasi style yang aktif.

Karena itu, ketika bekerja di Jupyter Notebook, kita perlu berhati-hati karena perubahan style dapat memengaruhi cell berikutnya.

## Mengembalikan ke Default

Jika ingin kembali menggunakan style default, gunakan:

```python
plt.style.use("default")
```

Contoh:

```python
plt.style.use("default")

plt.plot([1, 2, 3])
plt.show()
```

Hal ini berguna ketika kita ingin mencoba beberapa style dalam satu notebook.

## Memilih Style

Tidak ada satu style yang selalu cocok untuk semua kebutuhan.

Misalnya:

```python
plt.style.use("ggplot")
```

dapat memberikan tampilan tertentu yang berbeda dari:

```python
plt.style.use("dark_background")
```

Pemilihan style sebaiknya mempertimbangkan:

- tujuan visualisasi,
- jenis data,
- media publikasi,
- keterbacaan,
- dan konsistensi dengan grafik lainnya.

Style sebaiknya membantu pembaca memahami data, bukan justru mengalihkan perhatian dari data.

## Membuat DataFrame untuk Latihan

Sekarang kita akan membuat dataset sederhana menggunakan NumPy dan Pandas.

Import library:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

Kemudian buat data acak:

```python
data = np.random.randn(10, 4)
```

Kode tersebut menghasilkan array NumPy dengan:

```text
10 baris
4 kolom
```

Secara konsep:

```text
       A      B      C      D
    ┌──────┬──────┬──────┬──────┐
 0  │      │      │      │      │
 1  │      │      │      │      │
 2  │      │      │      │      │
... │      │      │      │      │
 9  │      │      │      │      │
    └──────┴──────┴──────┴──────┘
```

Selanjutnya kita ubah array tersebut menjadi DataFrame:

```python
df = pd.DataFrame(
    data,
    columns=["A", "B", "C", "D"]
)
```

Kita dapat melihat DataFrame:

```python
df
```

## Membuat Bar Plot dari DataFrame

Pandas menyediakan method `.plot()` yang menggunakan Matplotlib sebagai backend plotting.

Kita dapat membuat bar plot:

```python
ax = df.plot(
    kind="bar"
)
```

Pada kode tersebut:

```python
kind="bar"
```

berarti kita ingin membuat **bar plot**.

Karena hasil `.plot()` adalah objek `Axes`, kita menyimpannya ke:

```python
ax
```

Hal ini memungkinkan kita melanjutkan kustomisasi menggunakan Object-Oriented Matplotlib.

## Mengapa Hasil `.plot()` Disimpan ke `ax`?

Perhatikan:

```python
ax = df.plot(kind="bar")
```

`ax` adalah objek `Axes`.

Dengan demikian kita dapat melakukan:

```python
ax.set(...)
```

atau:

```python
ax.legend(...)
```

atau:

```python
ax.grid(...)
```

Dengan pola ini, Pandas digunakan untuk membuat plot dengan mudah, sedangkan Matplotlib digunakan untuk mengontrol dan mengkustomisasi Axes.

Secara konsep:

```text
Pandas DataFrame
       ↓
   df.plot()
       ↓
   Matplotlib
       ↓
     Axes
       ↓
   ax.set(...)
   ax.legend(...)
   ax.grid(...)
```

## Menambahkan Judul dan Label

Kita dapat menggunakan `ax.set()`:

```python
ax.set(
    title="Random Bar Graph from DataFrame",
    xlabel="Row Number",
    ylabel="Random Number"
)
```

Tiga properti tersebut adalah:

| Properti | Fungsi |
|---|---|
| `title` | Judul grafik |
| `xlabel` | Label sumbu X |
| `ylabel` | Label sumbu Y |

Dengan `ax.set()`, beberapa pengaturan dapat dilakukan dalam satu pemanggilan fungsi.

## Cara Alternatif Mengatur Judul dan Label

Selain:

```python
ax.set(
    title="Random Bar Graph from DataFrame",
    xlabel="Row Number",
    ylabel="Random Number"
)
```

kita juga dapat menulis secara terpisah:

```python
ax.set_title("Random Bar Graph from DataFrame")
ax.set_xlabel("Row Number")
ax.set_ylabel("Random Number")
```

Keduanya dapat digunakan.

Jika pengaturan yang ingin diberikan cukup banyak, `ax.set()` dapat membuat kode lebih ringkas.

## Mengatur Legenda

Karena DataFrame memiliki empat kolom:

```text
A
B
C
D
```

setiap kolom akan direpresentasikan sebagai seri pada bar plot.

Matplotlib/Pandas dapat membuat legenda secara otomatis.

Kita dapat mengakses objek legend dengan:

```python
ax.legend()
```

Kemudian legenda tersebut dapat diatur visibilitasnya:

```python
ax.legend().set_visible(True)
```

Jika ingin menyembunyikannya:

```python
ax.legend().set_visible(False)
```

Dalam banyak kasus, legenda sudah ditampilkan secara default ketika beberapa seri data diplot.

Karena itu, kode:

```python
ax.legend().set_visible(True)
```

lebih berguna sebagai contoh bahwa objek legend dapat dikontrol.

## Contoh Kode Lengkap

Berikut contoh lengkap dari materi yang telah kita pelajari:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Melihat style yang tersedia
print(plt.style.available)

# Menggunakan style
plt.style.use("ggplot")

# Membuat data acak
data = np.random.randn(10, 4)

# Membuat DataFrame
df = pd.DataFrame(
    data,
    columns=["A", "B", "C", "D"]
)

# Membuat bar plot
ax = df.plot(
    kind="bar",
    figsize=(10, 6)
)

# Kustomisasi plot
ax.set(
    title="Random Bar Graph from DataFrame",
    xlabel="Row Number",
    ylabel="Random Number"
)

# Mengatur legenda
ax.legend().set_visible(True)

plt.show()
```

![matplotlib](/img/python/45.png)

## Memahami Alur Kode

Kode tersebut dapat dibagi menjadi beberapa tahap.

### Tahap 1 - Import Library

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

Kita menggunakan:

- NumPy untuk membuat data numerik.
- Pandas untuk DataFrame.
- Matplotlib untuk visualisasi.

### Tahap 2 - Memilih Style

```python
plt.style.use("ggplot")
```

Style diterapkan sebelum membuat visualisasi.

### Tahap 3 - Membuat Data

```python
data = np.random.randn(10, 4)
```

Menghasilkan data acak sebanyak 10 baris dan 4 kolom.

### Tahap 4 - Membuat DataFrame

```python
df = pd.DataFrame(
    data,
    columns=["A", "B", "C", "D"]
)
```

Data tersebut diberi nama kolom:

```text
A
B
C
D
```

### Tahap 5 - Membuat Plot

```python
ax = df.plot(kind="bar")
```

Pandas membuat bar plot dan mengembalikan objek `Axes`.

### Tahap 6 - Kustomisasi

```python
ax.set(
    title="Random Bar Graph from DataFrame",
    xlabel="Row Number",
    ylabel="Random Number"
)
```

Kita memberikan konteks kepada grafik.

### Tahap 7 - Menampilkan Grafik

```python
plt.show()
```

Grafik ditampilkan.

## Style vs Customization

Penting untuk membedakan dua konsep ini.

### Style

Style mengatur tampilan secara lebih luas.

Contoh:

```python
plt.style.use("ggplot")
```

Style dapat memengaruhi banyak aspek visual sekaligus.

### Customization

Customization berarti kita mengatur elemen tertentu dari grafik.

Contohnya:

```python
ax.set_title(...)
```

atau:

```python
ax.set_xlabel(...)
```

atau:

```python
ax.set_ylabel(...)
```

atau:

```python
ax.legend(...)
```

Jadi:

```text
Style
  ↓
Pengaturan tampilan umum

Customization
  ↓
Pengaturan elemen tertentu
```

Keduanya dapat digunakan secara bersamaan.

## Contoh Menggabungkan Style dan Customization

Contoh:

```python
plt.style.use("ggplot")

fig, ax = plt.subplots(figsize=(10, 6))

ax.plot(
    [1, 2, 3, 4],
    [10, 20, 15, 30]
)

ax.set(
    title="Sales Trend",
    xlabel="Month",
    ylabel="Sales"
)

ax.grid(True)

plt.show()
```

Di sini:

```python
plt.style.use("ggplot")
```

mengatur style umum.

Sedangkan:

```python
ax.set(...)
```

melakukan kustomisasi khusus pada Axes.

## Kustomisasi yang Dapat Dilakukan

Matplotlib menyediakan banyak properti yang dapat dikustomisasi.

Beberapa di antaranya:

| Elemen | Contoh |
|---|---|
| Judul | `ax.set_title()` |
| Label X | `ax.set_xlabel()` |
| Label Y | `ax.set_ylabel()` |
| Batas X | `ax.set_xlim()` |
| Batas Y | `ax.set_ylim()` |
| Grid | `ax.grid()` |
| Legend | `ax.legend()` |
| Warna | `color=` |
| Transparansi | `alpha=` |
| Marker | `marker=` |
| Ukuran garis | `linewidth=` |
| Gaya garis | `linestyle=` |

Contoh:

```python
ax.plot(
    x,
    y,
    marker="o",
    linestyle="--",
    linewidth=2,
    alpha=0.8
)
```

Kita akan membahas berbagai properti tersebut lebih lanjut pada materi berikutnya.

## Mengapa Kustomisasi Penting?

Visualisasi bukan hanya tentang membuat grafik.

Tujuan utama visualisasi adalah membantu pembaca memahami informasi yang terdapat dalam data.

Bandingkan:

```text
Grafik tanpa judul
Grafik tanpa label
Grafik tanpa konteks
```

dengan:

```text
Judul yang jelas
      +
Label sumbu
      +
Legenda
      +
Style yang sesuai
      +
Skala yang tepat
```

Grafik yang dikustomisasi dengan baik dapat membantu pembaca menjawab:

- Apa yang sedang ditampilkan?
- Apa arti sumbu X?
- Apa arti sumbu Y?
- Apa arti setiap kelompok data?
- Bagaimana pola datanya?

## Prinsip Kustomisasi yang Baik

Kustomisasi bukan berarti semakin banyak elemen visual maka semakin baik.

Tujuan utama adalah **meningkatkan keterbacaan**.

Beberapa prinsip yang dapat digunakan:

### Gunakan Judul yang Informatif

Kurang informatif:

```text
Graph
```

Lebih informatif:

```text
Monthly Sales Trend
```

Judul sebaiknya memberikan gambaran mengenai isi grafik.

### Gunakan Label Sumbu

Hindari grafik yang membuat pembaca harus menebak arti angka.

Contoh:

```python
ax.set(
    xlabel="Month",
    ylabel="Sales (USD)"
)
```

### Gunakan Legenda Jika Diperlukan

Jika terdapat beberapa seri data, legenda membantu menjelaskan arti masing-masing seri.

Namun jika grafik hanya memiliki satu seri dan konteksnya sudah jelas, legenda mungkin tidak diperlukan.

### Jangan Berlebihan

Terlalu banyak:

- warna,
- garis,
- marker,
- teks,
- grid,
- atau dekorasi

dapat membuat grafik lebih sulit dibaca.

Kustomisasi harus membantu komunikasi data.

## Contoh Pola Object-Oriented

Pola yang perlu mulai dibiasakan adalah:

```python
fig, ax = plt.subplots()

ax.plot(...)

ax.set(
    title="...",
    xlabel="...",
    ylabel="..."
)

ax.legend()

fig.tight_layout()

plt.show()
```

Perhatikan bahwa sebagian besar pengaturan grafik diberikan kepada:

```python
ax
```

sedangkan pengaturan keseluruhan Figure diberikan kepada:

```python
fig
```

## Ringkasan

Pada materi ini kita telah mempelajari dasar-dasar **Customizing Matplotlib Plots**.

Konsep penting yang perlu diingat:

1. Matplotlib menyediakan berbagai style bawaan.
2. `plt.style.available` digunakan untuk melihat style yang tersedia.
3. `plt.style.use()` digunakan untuk menerapkan style.
4. `plt.style.use("default")` dapat digunakan untuk kembali ke style default.
5. `df.plot()` dari Pandas dapat menghasilkan objek `Axes`.
6. Objek `Axes` dapat disimpan ke variabel seperti `ax`.
7. `ax.set()` dapat digunakan untuk mengatur beberapa properti sekaligus.
8. `ax.legend()` digunakan untuk mengatur legenda.
9. Style mengatur tampilan secara lebih umum.
10. Customization mengatur elemen tertentu dari visualisasi.
11. Kustomisasi sebaiknya meningkatkan keterbacaan dan komunikasi data.
12. Tidak semua elemen visual harus digunakan pada setiap grafik.

## Pola Dasar yang Perlu Diingat

Untuk visualisasi menggunakan Pandas dan Object-Oriented Matplotlib, kita dapat menggunakan pola:

```python
plt.style.use("ggplot")

fig, ax = plt.subplots(figsize=(10, 6))

df.plot(
    kind="bar",
    ax=ax
)

ax.set(
    title="Judul Grafik",
    xlabel="Sumbu X",
    ylabel="Sumbu Y"
)

ax.legend()

fig.tight_layout()

plt.show()
```

Perhatikan bahwa:

```python
ax=ax
```

memberitahu Pandas untuk menggunakan `Axes` yang sudah kita buat.

Dengan pola ini, kita mendapatkan kemudahan plotting dari Pandas sekaligus kontrol dari Object-Oriented Matplotlib.
