---
sidebar_position: 1
---

# Pengenalan Matplotlib

![Matplotlib](https://matplotlib.org/stable/_images/sphx_glr_logos2_003.png)

**Matplotlib** adalah library Python yang digunakan untuk membuat **visualisasi data**.

Dengan Matplotlib, data yang awalnya berupa angka atau tabel dapat diubah menjadi bentuk visual seperti:

- Line chart
- Bar chart
- Scatter plot
- Histogram
- Pie chart
- Box plot
- Dan berbagai jenis visualisasi lainnya

Contoh sederhana:

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)
plt.show()
```

Kode tersebut menghasilkan grafik yang menunjukkan hubungan antara nilai `x` dan `y`.

Secara sederhana:

```text
Data
  ↓
Matplotlib
  ↓
Visualisasi
  ↓
Informasi lebih mudah dipahami
```

## Mengapa Visualisasi Data Penting?

Data dalam bentuk angka terkadang sulit dipahami jika hanya dilihat sebagai tabel.

Misalnya kita memiliki data:

```text
Hari    Penjualan
1       10
2       15
3       12
4       20
5       25
```

Dari tabel tersebut kita dapat membaca nilai satu per satu.

Namun, jika data tersebut divisualisasikan:

```text
Penjualan
  │
25│                ●
20│           ●
15│      ●
10│ ●          ●
  │
  └────────────────────
     1  2  3  4  5
          Hari
```

Pola kenaikan dan penurunan dapat terlihat lebih mudah.

Karena itu, visualisasi membantu kita:

- Melihat pola.
- Menemukan tren.
- Membandingkan data.
- Menemukan nilai yang tidak biasa.
- Memahami hubungan antarvariabel.
- Menyampaikan hasil analisis kepada orang lain.

![matplotlib](/img/python/10.png)

## Matplotlib dalam Data Science

Matplotlib merupakan salah satu library penting dalam ekosistem Data Science Python.

Secara sederhana, kita dapat melihat hubungan beberapa library utama sebagai berikut:

```text
             Data Science
                  │
        ┌─────────┼─────────┐
        ↓         ↓         ↓
      NumPy     Pandas   Matplotlib
        │         │         │
        │         │         ↓
        │         │     Visualisasi
        │         │
        ↓         ↓
    Data Numerik  Data Tabular
```

Ketiga library tersebut sering digunakan bersama.

### NumPy

NumPy berfokus pada:

- Array.
- Operasi numerik.
- Perhitungan matematis.
- Data multidimensi.

### Pandas

Pandas berfokus pada:

- DataFrame.
- Series.
- Data tabular.
- Membaca dan mengolah CSV.
- Cleaning dan analisis data.

### Matplotlib

Matplotlib berfokus pada:

- Visualisasi.
- Plot.
- Grafik.
- Penyajian hasil analisis secara visual.

Dalam praktik Data Science, ketiganya sering digunakan dalam satu workflow.

## Integrasi Matplotlib dengan NumPy

Matplotlib memiliki integrasi yang sangat baik dengan NumPy.

Contohnya:

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.arange(0, 10)

y = x ** 2

plt.plot(x, y)
plt.show()
```

Pada contoh tersebut:

```text
NumPy
  ↓
Membuat dan menghitung data
  ↓
Matplotlib
  ↓
Memvisualisasikan data
```

Karena Matplotlib dapat bekerja dengan NumPy Array, kita dapat langsung memberikan array sebagai data untuk plotting.

Contoh:

```python
x = np.array([1, 2, 3, 4, 5])
y = np.array([10, 20, 15, 30, 25])

plt.plot(x, y)
plt.show()
```

## Integrasi Matplotlib dengan Pandas

Matplotlib juga dapat digunakan bersama Pandas.

Misalnya kita memiliki DataFrame:

```python
import pandas as pd
import matplotlib.pyplot as plt

data = {
    "Month": ["Jan", "Feb", "Mar", "Apr", "May"],
    "Sales": [100, 120, 115, 150, 170]
}

df = pd.DataFrame(data)
```

Data tersebut dapat divisualisasikan menggunakan Pandas:

```python
df.plot(
    x="Month",
    y="Sales"
)

plt.show()
```

Pandas menyediakan interface plotting yang menggunakan Matplotlib di belakangnya untuk banyak jenis visualisasi.

Dengan demikian:

```text
Pandas DataFrame
       ↓
     .plot()
       ↓
  Matplotlib
       ↓
   Visualisasi
```

## Mengapa Menggunakan Matplotlib?

Ada beberapa alasan Matplotlib banyak digunakan dalam Data Science.

### Kompatibel dengan Python

Matplotlib merupakan library Python sehingga dapat digunakan langsung dalam program Python.

Kita tidak perlu berpindah ke bahasa pemrograman lain hanya untuk membuat grafik.

### Kompatibel dengan NumPy

Matplotlib dapat bekerja dengan NumPy Array.

Hal ini sangat berguna karena banyak proses numerik dalam Data Science menggunakan NumPy.

### Terintegrasi dengan Pandas

Pandas memiliki kemampuan plotting yang terintegrasi dengan Matplotlib.

Hal ini memungkinkan kita membuat visualisasi langsung dari DataFrame.

### Fleksibel

Matplotlib memberikan banyak kontrol terhadap tampilan grafik.

Kita dapat mengatur:

- Judul.
- Label sumbu.
- Ukuran grafik.
- Legend.
- Grid.
- Marker.
- Line style.
- Warna.
- Batas sumbu.
- Dan berbagai parameter lainnya.

### Banyak Digunakan dalam Data Science

Matplotlib telah menjadi salah satu library visualisasi yang umum digunakan dalam ekosistem Python.

Konsep dasar Matplotlib juga menjadi fondasi untuk memahami library visualisasi lain yang menggunakan atau terintegrasi dengan Matplotlib.

## Import Matplotlib

Cara umum mengimpor Matplotlib adalah:

```python
import matplotlib.pyplot as plt
```

`pyplot` merupakan module yang menyediakan berbagai fungsi untuk membuat visualisasi.

`plt` adalah alias yang umum digunakan.

Dengan import tersebut kita dapat menggunakan:

```python
plt.plot()
plt.scatter()
plt.bar()
plt.hist()
plt.xlabel()
plt.ylabel()
plt.title()
plt.legend()
plt.show()
```

## Workflow Matplotlib

Ketika membuat visualisasi menggunakan Matplotlib, kita dapat mengikuti workflow berikut:

```text
1. Persiapkan data
       ↓
2. Buat Figure
       ↓
3. Buat / gunakan Axes
       ↓
4. Plot data
       ↓
5. Tambahkan informasi
       ↓
6. Kustomisasi
       ↓
7. Tampilkan grafik
       ↓
8. Simpan grafik
```

Workflow tersebut akan menjadi dasar untuk materi Matplotlib berikutnya.

## 1. Persiapkan Data

Langkah pertama adalah menyiapkan data.

Data dapat berasal dari berbagai sumber, misalnya:

- NumPy Array.
- Pandas DataFrame.
- File CSV.
- Database.
- API.
- Hasil eksperimen Machine Learning.

Contoh menggunakan NumPy:

```python
import numpy as np

x = np.array([1, 2, 3, 4, 5])
y = np.array([2, 4, 6, 8, 10])
```

## 2. Membuat Figure

**Figure** dapat dipahami sebagai keseluruhan area atau canvas tempat visualisasi dibuat.

Contoh:

```python
import matplotlib.pyplot as plt

fig = plt.figure()
```

Secara konseptual:

```text
Figure
┌───────────────────────────────┐
│                               │
│          Area grafik          │
│                               │
└───────────────────────────────┘
```

Dalam praktik sehari-hari, kita sering menggunakan `plt.subplots()` karena sekaligus dapat membuat Figure dan Axes.

Contoh:

```python
fig, ax = plt.subplots()
```

## 3. Axes

Istilah **Axes** dalam Matplotlib sering membingungkan bagi pemula.

Axes adalah area tempat data benar-benar diplot, termasuk sistem koordinat seperti sumbu X dan Y.

Contohnya:

```text
Figure
┌───────────────────────────────┐
│                               │
│      Axes                     │
│    ┌───────────────────┐      │
│    │       ●           │      │
│    │     ●             │      │
│    │   ●               │      │
│    └───────────────────┘      │
│                               │
└───────────────────────────────┘
```

Kita dapat membuatnya dengan:

```python
fig, ax = plt.subplots()
```

Kemudian melakukan plotting:

```python
ax.plot(x, y)
```

## Figure vs Axes

Perbedaan sederhana:

| Komponen | Pengertian |
|---|---|
| Figure | Keseluruhan canvas atau area visualisasi |
| Axes | Area tempat data diplot |
| Axis | Sumbu seperti X-axis dan Y-axis |

Perhatikan bahwa **Axes** dan **Axis** adalah istilah yang berbeda.

Secara sederhana:

```text
Figure
  │
  └── Axes
       ├── X Axis
       └── Y Axis
```

Pemahaman ini penting ketika mulai menggunakan pendekatan Object-Oriented Matplotlib.

## Dua Pendekatan Plotting Matplotlib

Matplotlib dapat digunakan dengan beberapa gaya pemrograman.

Dua pendekatan yang sering dijumpai adalah:

1. **Pyplot interface**
2. **Object-Oriented interface**

## Pyplot Interface

Pendekatan ini menggunakan fungsi dari `plt`.

Contoh:

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)
plt.title("Contoh Grafik")
plt.xlabel("X")
plt.ylabel("Y")
plt.show()
```

Pendekatan ini relatif mudah dipahami ketika baru belajar Matplotlib.

## Object-Oriented Interface

Pendekatan Object-Oriented menggunakan objek `Figure` dan `Axes`.

Contoh:

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

fig, ax = plt.subplots()

ax.plot(x, y)
ax.set_title("Contoh Grafik")
ax.set_xlabel("X")
ax.set_ylabel("Y")

plt.show()
```

Pendekatan ini memberikan kontrol yang lebih jelas terhadap objek visualisasi.

Pendekatan ini juga sangat berguna ketika membuat:

- Banyak grafik.
- Multiple Axes.
- Subplot.
- Visualisasi yang kompleks.
- Visualisasi dalam aplikasi atau laporan.

## Pendekatan Mana yang Digunakan?

Untuk pembelajaran awal, penggunaan `plt` dapat membantu memahami konsep dasar plotting.

Contohnya:

```python
plt.plot(x, y)
plt.show()
```

Namun, ketika visualisasi menjadi lebih kompleks, pendekatan Object-Oriented biasanya lebih mudah dikelola.

Contohnya:

```python
fig, ax = plt.subplots()

ax.plot(x, y)
```

Tidak perlu menganggap salah satu pendekatan sebagai satu-satunya cara yang benar.

Yang penting adalah memahami bagaimana `Figure`, `Axes`, dan data saling berhubungan.

## Membuat Plot Sederhana

Mari membuat visualisasi sederhana.

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)

plt.show()
```

Kode:

```python
plt.plot(x, y)
```

digunakan untuk membuat line plot.

Sedangkan:

```python
plt.show()
```

digunakan untuk menampilkan visualisasi.

## Menambahkan Judul

Judul membantu menjelaskan apa yang ditampilkan oleh grafik.

```python
plt.title("Pertumbuhan Data")
```

Contoh lengkap:

```python
plt.plot(x, y)

plt.title("Pertumbuhan Data")

plt.show()
```

## Menambahkan Label Sumbu

Kita dapat memberikan label untuk sumbu X dan Y.

```python
plt.xlabel("Hari")
plt.ylabel("Nilai")
```

Contoh lengkap:

```python
plt.plot(x, y)

plt.title("Pertumbuhan Data")
plt.xlabel("Hari")
plt.ylabel("Nilai")

plt.show()
```

Visualisasi yang baik sebaiknya memberikan konteks yang cukup sehingga pembaca dapat memahami apa yang direpresentasikan oleh masing-masing sumbu.

## Menambahkan Grid

Grid dapat membantu pembaca memperkirakan nilai pada grafik.

```python
plt.grid()
```

Contoh:

```python
plt.plot(x, y)

plt.title("Pertumbuhan Data")
plt.xlabel("Hari")
plt.ylabel("Nilai")
plt.grid()

plt.show()
```

## Menambahkan Legend

Jika terdapat lebih dari satu data dalam grafik, kita dapat menggunakan legend.

Contoh:

```python
plt.plot(x, y, label="Data Penjualan")

plt.title("Penjualan")
plt.xlabel("Bulan")
plt.ylabel("Jumlah")

plt.legend()

plt.show()
```

Parameter:

```python
label="Data Penjualan"
```

memberikan nama untuk data tersebut.

Kemudian:

```python
plt.legend()
```

menampilkan keterangannya.

## Menyimpan Visualisasi

Visualisasi tidak hanya dapat ditampilkan di layar.

Kita juga dapat menyimpannya menjadi file.

Contoh:

```python
plt.savefig("grafik.png")
```

Format yang dapat digunakan bergantung pada backend dan kebutuhan, tetapi format umum antara lain:

```text
PNG
JPG/JPEG
SVG
PDF
```

Contoh:

```python
plt.plot(x, y)

plt.title("Pertumbuhan Data")

plt.savefig("pertumbuhan-data.png")

plt.show()
```

Biasanya `savefig()` dilakukan sebelum `show()` agar kita dapat mengontrol proses penyimpanan dengan jelas.

## Contoh Workflow Lengkap

Berikut contoh sederhana dari awal hingga menyimpan grafik:

```python
import numpy as np
import matplotlib.pyplot as plt

# 1. Persiapkan data
x = np.arange(1, 6)
y = np.array([10, 15, 13, 20, 25])

# 2. Membuat plot
plt.plot(x, y, label="Penjualan")

# 3. Menambahkan informasi
plt.title("Data Penjualan")
plt.xlabel("Hari")
plt.ylabel("Jumlah")

# 4. Menambahkan legend dan grid
plt.legend()
plt.grid()

# 5. Menyimpan grafik
plt.savefig("penjualan.png")

# 6. Menampilkan grafik
plt.show()
```

Workflow tersebut dapat diringkas menjadi:

```text
Import
  ↓
Data
  ↓
Plot
  ↓
Title
  ↓
Labels
  ↓
Legend / Grid
  ↓
Save
  ↓
Show
```

## Troubleshooting Matplotlib

Ketika belajar Matplotlib, hasil grafik terkadang tidak sesuai dengan yang diharapkan.

Hal tersebut merupakan bagian normal dari proses belajar.

Salah satu prinsip yang berguna adalah:

> If in doubt, run the code.

Artinya, ketika ragu terhadap suatu kode, jalankan kode tersebut dan amati hasilnya.

## Langkah Troubleshooting

Jika grafik tidak sesuai, lakukan langkah berikut.

### 1. Periksa Data

Pastikan data yang digunakan memang benar.

```python
print(x)
print(y)
```

Periksa juga panjang data:

```python
print(len(x))
print(len(y))
```

Untuk line plot sederhana, jumlah nilai X dan Y harus sesuai.

### 2. Periksa Shape NumPy Array

Jika menggunakan NumPy:

```python
print(x.shape)
print(y.shape)
```

Shape yang tidak sesuai dapat menyebabkan error atau menghasilkan visualisasi yang tidak diharapkan.

### 3. Jalankan Kode Secara Bertahap

Daripada langsung menjalankan program yang panjang, coba jalankan bagian kecil terlebih dahulu.

Misalnya:

```python
plt.plot(x, y)
```

Jika berhasil, tambahkan:

```python
plt.title("Data")
```

Kemudian:

```python
plt.xlabel("X")
plt.ylabel("Y")
```

Dengan cara ini kita dapat mengetahui bagian mana yang menyebabkan masalah.

### 4. Baca Pesan Error

Jangan langsung mengabaikan pesan error.

Pesan error biasanya memberikan informasi tentang masalah yang terjadi.

Contohnya:

```text
ValueError
```

dapat mengindikasikan adanya masalah pada nilai atau bentuk data.

Gunakan pesan error sebagai petunjuk untuk mencari penyebabnya.

### 5. Gunakan Dokumentasi

Jika tidak mengetahui parameter suatu fungsi, dokumentasi resmi Matplotlib dapat menjadi sumber referensi.

Kita dapat memeriksa:

```python
help(plt.plot)
```

atau:

```python
help(plt.scatter)
```

Dokumentasi juga menjelaskan parameter yang tersedia dan contoh penggunaannya.

### 6. Cari Referensi Masalah

Jika masalah belum ditemukan, kita dapat mencari referensi dari komunitas pemrograman seperti Stack Overflow.

Namun, jangan hanya menyalin solusi.

Pahami:

```text
Masalah
  ↓
Penyebab
  ↓
Solusi
  ↓
Mengapa solusi tersebut bekerja?
```

Dengan demikian, kemampuan troubleshooting akan berkembang.

## Praktik Terbaik Saat Belajar Matplotlib

Beberapa kebiasaan yang baik:

### Mulai dari Data Sederhana

Jangan langsung menggunakan dataset yang sangat besar.

Mulailah dengan:

```python
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]
```

Setelah memahami konsep, gunakan dataset yang lebih kompleks.

### Periksa Data Sebelum Plotting

Biasakan memeriksa:

```python
print(x)
print(y)
```

atau:

```python
print(df.head())
```

jika menggunakan Pandas.

### Gunakan Label yang Jelas

Hindari grafik yang tidak memiliki konteks.

Lebih baik:

```python
plt.xlabel("Bulan")
plt.ylabel("Penjualan")
```

daripada hanya:

```python
plt.xlabel("X")
plt.ylabel("Y")
```

untuk visualisasi final.

### Gunakan Judul yang Informatif

Judul sebaiknya menjelaskan apa yang sedang ditampilkan.

Contoh:

```python
plt.title("Tren Penjualan Bulanan")
```

lebih informatif daripada:

```python
plt.title("Grafik")
```

### Jangan Berlebihan dalam Kustomisasi

Tujuan visualisasi adalah menyampaikan informasi.

Terlalu banyak elemen dekoratif dapat membuat grafik sulit dibaca.

Fokus utama:

```text
Data
 ↓
Pola
 ↓
Informasi
```

## Hubungan Matplotlib dengan Machine Learning

Visualisasi merupakan bagian penting dalam workflow Machine Learning.

Contohnya:

```text
Dataset
   ↓
Exploratory Data Analysis
   ↓
Visualisasi
   ↓
Memahami data
   ↓
Preprocessing
   ↓
Training Model
   ↓
Evaluasi
   ↓
Visualisasi hasil
```

Matplotlib dapat digunakan untuk membantu:

- Memahami distribusi data.
- Melihat hubungan antarvariabel.
- Menemukan outlier.
- Membandingkan hasil model.
- Memvisualisasikan training history.
- Menampilkan hasil prediksi.

Karena itu, kemampuan membuat grafik merupakan bagian penting dari kemampuan Data Science.

## Ringkasan

Matplotlib adalah library Python untuk membuat visualisasi data.

Konsep utama yang perlu dipahami:

```text
Matplotlib
    ↓
Visualisasi Data
    ↓
Figure
    ↓
Axes
    ↓
Plot
    ↓
Customization
    ↓
Save / Show
```

Matplotlib memiliki integrasi yang baik dengan:

```text
NumPy → Data numerik
Pandas → Data tabular
Matplotlib → Visualisasi
```

Workflow dasarnya:

```text
1. Persiapkan data
2. Buat Figure / Axes
3. Plot data
4. Tambahkan title
5. Tambahkan label
6. Tambahkan legend jika diperlukan
7. Kustomisasi
8. Simpan atau tampilkan
```

## Fungsi Dasar yang Perlu Diingat

| Fungsi | Kegunaan |
|---|---|
| `plt.plot()` | Membuat line plot |
| `plt.scatter()` | Membuat scatter plot |
| `plt.bar()` | Membuat bar chart |
| `plt.hist()` | Membuat histogram |
| `plt.title()` | Memberikan judul |
| `plt.xlabel()` | Memberikan label sumbu X |
| `plt.ylabel()` | Memberikan label sumbu Y |
| `plt.legend()` | Menampilkan legend |
| `plt.grid()` | Menampilkan grid |
| `plt.show()` | Menampilkan grafik |
| `plt.savefig()` | Menyimpan grafik |
| `plt.subplots()` | Membuat Figure dan Axes |

## Checklist Pembelajaran

Setelah mempelajari materi ini, Anda seharusnya dapat:

- [ ] Menjelaskan apa itu Matplotlib.
- [ ] Menjelaskan fungsi visualisasi data.
- [ ] Menjelaskan hubungan NumPy, Pandas, dan Matplotlib.
- [ ] Mengimpor Matplotlib menggunakan `pyplot`.
- [ ] Membuat line plot sederhana.
- [ ] Memahami konsep Figure dan Axes.
- [ ] Menjelaskan perbedaan Axes dan Axis.
- [ ] Memahami pyplot interface.
- [ ] Memahami Object-Oriented interface.
- [ ] Menambahkan judul pada grafik.
- [ ] Menambahkan label sumbu.
- [ ] Menambahkan legend.
- [ ] Menambahkan grid.
- [ ] Menyimpan grafik menggunakan `savefig()`.
- [ ] Melakukan troubleshooting sederhana pada grafik.

## Latihan

### Latihan 1 — Line Plot

Buat data:

```python
x = [1, 2, 3, 4, 5, 6]
y = [10, 15, 12, 20, 25, 30]
```

Kemudian:

1. Buat line plot.
2. Tambahkan judul.
3. Tambahkan label X.
4. Tambahkan label Y.
5. Tambahkan grid.
6. Tampilkan grafik.

### Latihan 2 — NumPy dan Matplotlib

Gunakan NumPy untuk membuat data:

```python
import numpy as np

x = np.arange(0, 11)
y = x ** 2
```

Kemudian visualisasikan menggunakan Matplotlib.

### Latihan 3 — Figure dan Axes

Gunakan pendekatan Object-Oriented:

```python
fig, ax = plt.subplots()
```

Kemudian buat sebuah line plot menggunakan:

```python
ax.plot(x, y)
```

Tambahkan:

- Title.
- X label.
- Y label.
- Grid.

### Latihan 4 — Menyimpan Grafik

Buat sebuah grafik kemudian simpan menggunakan:

```python
plt.savefig("hasil-grafik.png")
```

Periksa apakah file berhasil dibuat pada folder kerja Anda.
