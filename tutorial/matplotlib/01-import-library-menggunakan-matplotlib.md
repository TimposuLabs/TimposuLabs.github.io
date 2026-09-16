---
sidebar_position: 2
title: Import & menggunakan Matplotlib
---

Pada materi sebelumnya kita telah mengenal Matplotlib sebagai library Python untuk membuat visualisasi data.

Pada materi ini kita akan mulai menggunakan Matplotlib secara langsung dan memahami beberapa konsep dasar:

- Persiapan environment.
- Import library.
- Membuat plot sederhana.
- Penggunaan `pyplot`.
- Perbedaan Pyplot API dan Object-Oriented API.
- Konsep `Figure` dan `Axes`.
- Penggunaan `plt.subplots()`.

Pemahaman mengenai konsep tersebut akan menjadi dasar untuk membuat visualisasi yang lebih kompleks pada materi berikutnya.

## Persiapan Environment

Sebelum menggunakan Matplotlib, kita membutuhkan environment Python yang sudah memiliki library yang diperlukan.

Jika menggunakan Conda, kita dapat mengaktifkan environment terlebih dahulu.

Contoh:

```bash
conda activate data-science
```

Kemudian jalankan Jupyter Notebook:

```bash
jupyter notebook
```

Atau jika menggunakan JupyterLab:

```bash
jupyter lab
```

Nama environment dapat berbeda sesuai dengan environment yang dibuat pada komputer masing-masing.

## Import Library

Untuk menggunakan Matplotlib, kita biasanya mengimpor `pyplot` dengan alias `plt`.

```python
import matplotlib.pyplot as plt
```

Selain Matplotlib, kita juga sering menggunakan NumPy dan Pandas dalam workflow Data Science.

```python
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
```

Penggunaan alias yang umum:

| Library | Import | Alias |
|---|---|---|
| Matplotlib Pyplot | `import matplotlib.pyplot as plt` | `plt` |
| NumPy | `import numpy as np` | `np` |
| Pandas | `import pandas as pd` | `pd` |

Dengan import tersebut, kita dapat menggunakan ketiga library secara bersamaan.

Contohnya:

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.arange(0, 10)
y = x ** 2

plt.plot(x, y)
plt.show()
```

Workflow tersebut menunjukkan hubungan sederhana:

```text
NumPy
  ↓
Membuat / mengolah data
  ↓
Matplotlib
  ↓
Memvisualisasikan data
```

## Matplotlib di Jupyter Notebook

Ketika menggunakan Jupyter Notebook, visualisasi dapat ditampilkan langsung di dalam notebook.

Pada versi Matplotlib dan Jupyter modern, grafik biasanya sudah dapat ditampilkan secara inline tanpa harus menambahkan magic command secara manual.

Namun, Anda mungkin menemukan kode berikut pada notebook atau tutorial lama:

```python
%matplotlib inline
```

Magic command tersebut digunakan untuk mengatur backend Matplotlib agar output grafik ditampilkan di dalam notebook.

Contoh:

```python
%matplotlib inline

import matplotlib.pyplot as plt
```

Pada lingkungan Jupyter modern, kode tersebut umumnya tidak lagi diperlukan untuk penggunaan dasar.

Yang penting adalah memahami bahwa:

```text
Jupyter Notebook
      ↓
Matplotlib
      ↓
Grafik ditampilkan di notebook
```

## Membuat Plot Sederhana

Cara paling sederhana untuk membuat grafik adalah menggunakan:

```python
plt.plot()
```

Jika dijalankan tanpa data:

```python
plt.plot()
```

Matplotlib akan membuat objek line plot, tetapi belum memiliki data yang bermakna untuk divisualisasikan.

Dalam beberapa lingkungan, terutama notebook, hasil ekspresi tersebut dapat menampilkan representasi objek seperti:

```text
[<matplotlib.lines.Line2D object at ...>]
```

Hal ini bukan error.

Itu merupakan representasi objek `Line2D` yang dikembalikan oleh fungsi plotting.

## Menghilangkan Output Representasi Objek

Pada Jupyter Notebook, kita dapat melihat representasi objek ketika sebuah ekspresi menjadi output terakhir dari sebuah cell.

Contohnya:

```python
plt.plot()
```

Jika ingin menghindari representasi tersebut, salah satu cara yang sering digunakan adalah menambahkan titik koma:

```python
plt.plot();
```

Namun, cara yang lebih jelas untuk workflow normal adalah menggunakan:

```python
plt.show()
```

Contoh:

```python
plt.plot()
plt.show()
```

`plt.show()` digunakan untuk menampilkan visualisasi secara eksplisit.

## Membuat Line Plot

Sekarang kita akan menggunakan data sederhana.

```python
x = [1, 2, 3, 4]
y = [11, 22, 33, 44]
```

Kita dapat membuat grafik menggunakan:

```python
plt.plot(x, y)
plt.show()
```

Secara sederhana, Matplotlib akan menghubungkan titik-titik data tersebut menjadi sebuah garis.

Data:

```text
x = [1, 2, 3, 4]
y = [11, 22, 33, 44]
```

dapat dipahami sebagai pasangan:

```text
(1, 11)
(2, 22)
(3, 33)
(4, 44)
```

![matplotlib](/img/python/11.png)

## Tiga Pendekatan dalam Menggunakan Matplotlib

Dalam pembelajaran Matplotlib kita sering menemukan beberapa gaya penggunaan API.

Secara praktis, kita dapat mengenal tiga pola:

```text
1. Pyplot API
2. Object-Oriented API secara eksplisit
3. Object-Oriented API menggunakan plt.subplots()
```

Ketiganya menggunakan library Matplotlib yang sama, tetapi cara kita mengelola objek grafik berbeda.

## Metode 1 - Pyplot API

Pyplot API menggunakan fungsi-fungsi dari `matplotlib.pyplot`.

Contoh:

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [11, 22, 33, 44]

plt.plot(x, y)
plt.show()
```

![matplotlib](/img/python/11.png)

Pendekatan ini sangat sederhana.

Kita dapat langsung menggunakan:

```python
plt.plot()
plt.title()
plt.xlabel()
plt.ylabel()
plt.legend()
plt.show()
```

Tanpa harus secara eksplisit membuat objek `Figure` dan `Axes` terlebih dahulu.

### Kelebihan Pyplot API

Pendekatan ini cocok untuk:

- Belajar dasar plotting.
- Eksperimen cepat.
- Visualisasi sederhana.
- Notebook interaktif.
- Script kecil.

Contohnya:

```python
plt.plot(x, y)
plt.title("Contoh Grafik")
plt.show()
```

### Kekurangan Pyplot API

Ketika visualisasi semakin kompleks, pengelolaan grafik dengan state global `pyplot` dapat menjadi lebih sulit.

Misalnya ketika kita memiliki:

- Banyak grafik.
- Banyak Axes.
- Beberapa subplot.
- Layout kompleks.
- Beberapa Figure.

Pada kondisi tersebut, Object-Oriented API biasanya lebih mudah dikelola.

## Metode 2 - Object-Oriented API secara Eksplisit

Pada pendekatan Object-Oriented, kita mengelola objek Matplotlib secara langsung.

Contoh:

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [11, 22, 33, 44]

fig = plt.figure()

ax = fig.add_subplot()

ax.plot(x, y)

plt.show()
```

![matplotlib](/img/python/11.png)

Pada kode tersebut kita membuat:

```python
fig = plt.figure()
```

untuk membuat sebuah `Figure`.

Kemudian:

```python
ax = fig.add_subplot()
```

untuk membuat `Axes`.

Setelah itu data diplot menggunakan:

```python
ax.plot(x, y)
```

Perhatikan bahwa sekarang kita tidak menggunakan:

```python
plt.plot(x, y)
```

melainkan:

```python
ax.plot(x, y)
```

Karena kita bekerja langsung dengan objek `Axes`.

## Memahami Figure

**Figure** dapat dipahami sebagai keseluruhan canvas atau wadah tempat visualisasi dibuat.

Secara sederhana:

```text
Figure
┌───────────────────────────────┐
│                               │
│                               │
│        Area visualisasi       │
│                               │
│                               │
└───────────────────────────────┘
```

Sebuah Figure dapat memiliki satu atau lebih Axes.

Contohnya:

```text
Figure
│
├── Axes
│
├── Axes
│
└── Axes
```

Hal ini sangat berguna ketika membuat beberapa grafik dalam satu Figure.

## Memahami Axes

**Axes** adalah area tempat data benar-benar diplot.

Sebuah Axes biasanya memiliki:

- Sumbu X.
- Sumbu Y.
- Data.
- Title.
- Label.
- Tick.
- Legend.

Contoh konseptual:

```text
Figure
┌─────────────────────────────────┐
│                                 │
│      Axes                       │
│    ┌─────────────────────┐      │
│    │              ●      │      │
│    │          ●          │      │
│    │      ●              │      │
│    │  ●                  │      │
│    └─────────────────────┘      │
│                                 │
└─────────────────────────────────┘
```

Jadi, kita dapat menyederhanakan:

```text
Figure
  ↓
Wadah keseluruhan visualisasi

Axes
  ↓
Area tempat data diplot
```

## Figure, Axes, dan Axis

Ketiga istilah ini sering membingungkan.

Perhatikan perbedaannya:

| Istilah | Pengertian |
|---|---|
| Figure | Keseluruhan canvas / wadah visualisasi |
| Axes | Area tempat data diplot |
| Axis | Sumbu koordinat seperti X dan Y |

Hubungannya:

```text
Figure
  │
  └── Axes
       │
       ├── X Axis
       └── Y Axis
```

Jangan menyamakan `Axes` dengan `Axis`.

`Axes` adalah objek atau area plotting, sedangkan `Axis` merupakan sumbu koordinat di dalamnya.

:::tip
**Cara Lain** menggunakan axes:

```python
# metode 2
fig = plt.figure() # membuat figure
ax = fig.add_axes([1, 1, 1, 1])
ax.plot(x, y)
plt.show()
```

Maksud dari `[1, 1, 1, 1]` adalah:
* left = 1 -> Sisi kiri sumbu dimulai tepat di batas paling kanan figure (100% dari lebar figure).
* bottom = 1 -> Sisi bawah sumbu dimulai tepat di batas paling atas figure (100% dari tinggi figure).
* width = 1 -> Lebar sumbu sama dengan 100% dari lebar total figure.
* height = 1 -> Tinggi sumbu sama dengan 100% dari tinggi total figure.
:::

## Metode 3 - Object-Oriented dengan `plt.subplots()`

Cara yang sangat umum digunakan untuk Object-Oriented API adalah:

```python
fig, ax = plt.subplots()
```

Kode tersebut membuat:

```text
Figure
  +
Axes
```

sekaligus.

Contoh lengkap:

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [11, 22, 33, 44]

fig, ax = plt.subplots()

ax.plot(x, y)

plt.show()
```

![matplotlib](/img/python/11.png)

Pendekatan ini sangat nyaman karena kita langsung mendapatkan dua objek:

```python
fig
```

dan:

```python
ax
```

## Memahami `fig` dan `ax`

Ketika menjalankan:

```python
fig, ax = plt.subplots()
```

kita mendapatkan:

```text
fig
 ↓
Figure

ax
 ↓
Axes
```

Kita kemudian dapat mengatur Figure dan Axes sesuai kebutuhan.

Misalnya:

```python
fig, ax = plt.subplots()

ax.plot(x, y)

ax.set_title("Contoh Grafik")
ax.set_xlabel("X")
ax.set_ylabel("Y")

plt.show()
```

Perhatikan bahwa method untuk Axes menggunakan:

```python
ax.set_title()
ax.set_xlabel()
ax.set_ylabel()
```

bukan:

```python
plt.title()
plt.xlabel()
plt.ylabel()
```

Karena kita sedang menggunakan Object-Oriented API.

## Mengapa `plt.subplots()` Sangat Berguna?

`plt.subplots()` memudahkan kita ketika membuat visualisasi dengan banyak Axes.

Contohnya:

```python
fig, ax = plt.subplots(2, 2)
```

Kode tersebut dapat digunakan untuk membuat layout dengan:

```text
2 baris × 2 kolom
```

sehingga terdapat empat area Axes.

Secara konseptual:

```text
Figure
┌───────────────┬───────────────┐
│               │               │
│    Axes 1     │    Axes 2     │
│               │               │
├───────────────┼───────────────┤
│               │               │
│    Axes 3     │    Axes 4     │
│               │               │
└───────────────┴───────────────┘
```

Konsep ini akan menjadi sangat penting ketika mempelajari **subplots**.

## Perbandingan Tiga Pendekatan

| Pendekatan | Contoh | Karakteristik |
|---|---|---|
| Pyplot | `plt.plot(x, y)` | Sederhana dan cepat |
| OO eksplisit | `fig.add_subplot()` lalu `ax.plot()` | Kontrol objek secara langsung |
| OO dengan `subplots()` | `fig, ax = plt.subplots()` | Praktis dan cocok untuk visualisasi yang berkembang |

Untuk pembelajaran dasar, Pyplot API tetap penting untuk dipahami karena sangat sering ditemukan pada tutorial dan notebook.

Namun, memahami Object-Oriented API akan membantu ketika mulai membuat visualisasi yang lebih kompleks.

## Rekomendasi Gaya Penulisan

Untuk materi selanjutnya, kita akan banyak menggunakan pola:

```python
fig, ax = plt.subplots()

ax.plot(x, y)

plt.show()
```

Mengapa?

Karena pola tersebut memberikan struktur yang jelas:

```text
Data
 ↓
Figure
 ↓
Axes
 ↓
Plot
 ↓
Customization
 ↓
Show / Save
```

Selain itu, pendekatan ini mempermudah pengembangan kode ketika jumlah grafik bertambah.

## Contoh Membuat Grafik dengan Object-Oriented API

Mari kita buat contoh yang lebih lengkap.

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

fig, ax = plt.subplots()

ax.plot(x, y)

ax.set_title("Pertumbuhan Data")
ax.set_xlabel("X")
ax.set_ylabel("Y")

plt.show()
```

Workflow kode tersebut:

```text
1. Import Matplotlib
       ↓
2. Menyiapkan data
       ↓
3. Membuat Figure dan Axes
       ↓
4. Plot data
       ↓
5. Memberikan title
       ↓
6. Memberikan label
       ↓
7. Menampilkan grafik
```

## Menggunakan NumPy sebagai Sumber Data

Matplotlib tidak hanya menerima Python list.

Kita juga dapat menggunakan NumPy Array.

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.arange(0, 10)
y = x ** 2

fig, ax = plt.subplots()

ax.plot(x, y)

ax.set_title("y = x²")
ax.set_xlabel("x")
ax.set_ylabel("y")

plt.show()
```

Di sini NumPy digunakan untuk membuat data, sedangkan Matplotlib digunakan untuk memvisualisasikan data.

```text
NumPy
 ↓
Membuat data numerik
 ↓
Matplotlib
 ↓
Visualisasi
```

## Memeriksa Objek Matplotlib

Karena Object-Oriented API bekerja dengan objek, kita dapat memeriksa tipe objek tersebut.

```python
fig, ax = plt.subplots()

print(type(fig))
print(type(ax))
```

Secara umum hasilnya akan menunjukkan bahwa:

```text
fig → matplotlib.figure.Figure
ax  → matplotlib.axes.Axes
```

Hal ini memperlihatkan bahwa `fig` dan `ax` bukan sekadar variabel biasa.

Keduanya merupakan objek Matplotlib yang memiliki berbagai attribute dan method.

## Stateless vs Stateful

Pyplot sering disebut menggunakan pendekatan yang bersifat **stateful**.

Contohnya:

```python
plt.plot(x, y)
plt.title("Data")
plt.xlabel("X")
plt.ylabel("Y")
```

Matplotlib mengelola state Figure dan Axes yang sedang aktif.

Sedangkan Object-Oriented API lebih eksplisit karena kita menentukan objek yang akan dimodifikasi:

```python
fig, ax = plt.subplots()

ax.plot(x, y)
ax.set_title("Data")
ax.set_xlabel("X")
ax.set_ylabel("Y")
```

Perbedaannya dapat digambarkan:

```text
Pyplot API

plt
 ↓
State aktif
 ↓
Plot


Object-Oriented API

Figure
 ↓
Axes
 ↓
Plot
```

Pemahaman ini akan sangat membantu ketika membuat banyak visualisasi.

## Troubleshooting Dasar

Ketika belajar Matplotlib, jangan hanya menghafalkan kode.

Biasakan melakukan eksperimen.

Prinsip sederhana:

> If in doubt, run the code.

Jika tidak yakin dengan suatu fungsi, jalankan contoh kecil.

Misalnya:

```python
plt.plot([1, 2, 3], [2, 4, 6])
plt.show()
```

Kemudian tambahkan elemen satu per satu.

```python
plt.plot([1, 2, 3], [2, 4, 6])

plt.title("Data")
plt.xlabel("X")
plt.ylabel("Y")

plt.show()
```

Dengan cara ini kita dapat memahami pengaruh setiap bagian kode.

## Memeriksa Dokumentasi Fungsi

Jika tidak mengetahui cara menggunakan suatu fungsi, gunakan `help()`.

Contoh:

```python
help(plt.plot)
```

Untuk Object-Oriented API:

```python
help(ax.plot)
```

Dokumentasi sangat berguna untuk mengetahui:

- Parameter.
- Return value.
- Argument.
- Default value.
- Contoh penggunaan.

## Mencari Solusi Error

Jika menemukan error, gunakan pendekatan sistematis:

```text
Error
  ↓
Baca pesan error
  ↓
Identifikasi baris bermasalah
  ↓
Periksa data
  ↓
Coba contoh sederhana
  ↓
Baca dokumentasi
  ↓
Cari referensi
  ↓
Uji solusi
```

Sumber referensi yang dapat digunakan antara lain:

- Dokumentasi resmi Matplotlib.
- Dokumentasi Python.
- Stack Overflow.
- Notebook atau tutorial terpercaya.

Namun, tujuan troubleshooting bukan hanya membuat error hilang.

Tujuannya adalah memahami:

```text
Apa masalahnya?
       ↓
Mengapa terjadi?
       ↓
Bagaimana memperbaikinya?
       ↓
Bagaimana mencegahnya?
```

## Ringkasan

Matplotlib merupakan library Python untuk visualisasi data.

Pada materi ini kita mempelajari tiga pola penggunaan utama:

```text
Pyplot API
    ↓
plt.plot()

Object-Oriented API
    ↓
fig = plt.figure()
ax = fig.add_subplot()
ax.plot()

Object-Oriented API dengan subplots
    ↓
fig, ax = plt.subplots()
ax.plot()
```

Konsep penting:

```text
Figure
 ↓
Wadah keseluruhan visualisasi

Axes
 ↓
Area tempat data diplot

Axis
 ↓
Sumbu koordinat
```

Untuk materi-materi berikutnya, kita akan menggunakan pola Object-Oriented:

```python
fig, ax = plt.subplots()
```

kemudian melakukan plotting menggunakan:

```python
ax.plot(x, y)
```

## Checklist Pembelajaran

Setelah menyelesaikan materi ini, Anda seharusnya dapat:

- [ ] Menjelaskan fungsi Matplotlib.
- [ ] Mengimpor `matplotlib.pyplot`.
- [ ] Memahami alias `plt`.
- [ ] Menjelaskan penggunaan Matplotlib di Jupyter Notebook.
- [ ] Memahami `%matplotlib inline`.
- [ ] Membuat plot sederhana menggunakan `plt.plot()`.
- [ ] Memahami output objek `Line2D`.
- [ ] Menggunakan `plt.show()`.
- [ ] Menjelaskan Pyplot API.
- [ ] Menjelaskan Object-Oriented API.
- [ ] Memahami konsep Figure.
- [ ] Memahami konsep Axes.
- [ ] Membedakan Axes dan Axis.
- [ ] Membuat Figure dan Axes menggunakan `plt.subplots()`.
- [ ] Membuat plot menggunakan `ax.plot()`.
- [ ] Memahami hubungan NumPy dan Matplotlib.
- [ ] Melakukan troubleshooting sederhana pada Matplotlib.

## Latihan

### Latihan 1 - Pyplot API

Buat data berikut:

```python
x = [1, 2, 3, 4, 5]
y = [10, 20, 15, 30, 25]
```

Buat line plot menggunakan Pyplot API.

Tambahkan:

- Title.
- X label.
- Y label.
- Grid.
- `plt.show()`.

### Latihan 2 - Object-Oriented API

Gunakan data yang sama.

Buat Figure dan Axes:

```python
fig, ax = plt.subplots()
```

Kemudian gunakan:

```python
ax.plot(x, y)
```

Tambahkan title dan label menggunakan method dari `ax`.

### Latihan 3 - NumPy dan Matplotlib

Gunakan:

```python
x = np.arange(0, 10)
y = x ** 2
```

Kemudian buat visualisasi menggunakan Object-Oriented API.

### Latihan 4 - Eksperimen

Coba jalankan kode berikut:

```python
fig, ax = plt.subplots()

print(type(fig))
print(type(ax))
```

Kemudian jelaskan:

1. Apa tipe objek `fig`?
2. Apa tipe objek `ax`?
3. Apa hubungan antara `fig` dan `ax`?
4. Mengapa `ax.plot()` digunakan untuk membuat plot?
