---
sidebar_position: 5
title: "Manipulasi & Visualisasi Data"
---

Setelah mempelajari cara melihat, memilih, dan melakukan filtering pada DataFrame, langkah berikutnya adalah mulai **menganalisis dan memvisualisasikan data**.

Ketika bekerja dengan dataset, kita tidak hanya ingin melihat datanya.

Kita juga ingin mengetahui:

- Apakah terdapat hubungan antar kolom?
- Bagaimana data dikelompokkan?
- Berapa nilai rata-rata setiap kelompok?
- Bagaimana persebaran data?
- Apakah terdapat pola tertentu?
- Apakah terdapat data yang perlu dibersihkan sebelum dianalisis?

Pandas menyediakan berbagai fitur untuk membantu proses tersebut.

Untuk visualisasi, Pandas juga dapat bekerja bersama **Matplotlib**.

Pada materi ini kita akan mempelajari:

- `pd.crosstab()`
- `.groupby()`
- `.plot()`
- `.hist()`
- Dasar penggunaan Matplotlib
- Data cleaning sederhana
- Mengubah data harga dari teks menjadi numerik

---

## Membandingkan Kolom

Salah satu aktivitas penting dalam analisis data adalah **membandingkan dua atau lebih variabel**.

Misalnya kita memiliki dataset penjualan mobil dengan kolom:

```text
Make
Colour
Odometer (KM)
Doors
Price
```

Kita mungkin ingin mengetahui:

```text
Apakah jumlah pintu berbeda berdasarkan merek mobil?
```

atau:

```text
Berapa banyak mobil dari setiap merek
yang memiliki jumlah pintu tertentu?
```

Pandas menyediakan `pd.crosstab()` untuk membantu melakukan analisis seperti ini.

---

## Menggunakan `pd.crosstab()`

`pd.crosstab()` digunakan untuk membuat **cross-tabulation**, yaitu tabel yang memperlihatkan hubungan atau frekuensi antara dua variabel kategorikal.

Contohnya:

```python
import pandas as pd

pd.crosstab(car_sales["Make"], car_sales["Doors"])
```

Secara sederhana, kita sedang meminta Pandas untuk membandingkan:

```text
Make
↓
Merek mobil

dengan

Doors
↓
Jumlah pintu
```

---

## Memahami Hasil `pd.crosstab()`

Misalnya hasilnya seperti:

```text
Doors   3   4   5
Make
BMW     0   3   0
Honda   0   4   0
Toyota  1   5   2
```

Kita dapat membaca tabel tersebut sebagai:

```text
Toyota
├── 1 mobil memiliki 3 pintu
├── 5 mobil memiliki 4 pintu
└── 2 mobil memiliki 5 pintu
```

Jadi `crosstab()` membantu kita melihat **frekuensi atau jumlah kemunculan kombinasi kategori**.

---

## Kapan Menggunakan `pd.crosstab()`?

`crosstab()` cocok digunakan ketika kita ingin mengetahui hubungan sederhana antara kategori.

Contohnya:

```text
Merek mobil vs jumlah pintu
Jenis kelamin vs kategori produk
Kota vs jenis pelanggan
Kategori produk vs status pembelian
```

Misalnya:

```python
pd.crosstab(
    car_sales["Make"],
    car_sales["Doors"]
)
```

Hasilnya dapat memberikan gambaran mengenai distribusi jumlah pintu berdasarkan merek mobil.

---

## Mengelompokkan Data dengan `.groupby()`

Selain `crosstab()`, Pandas menyediakan method:

```python
.groupby()
```

`groupby()` digunakan untuk **mengelompokkan data berdasarkan satu atau beberapa kolom**.

Setelah data dikelompokkan, kita dapat melakukan operasi tertentu terhadap masing-masing kelompok.

Misalnya:

```text
Toyota
Honda
BMW
Nissan
```

kemudian kita ingin menghitung:

```text
Rata-rata harga
Rata-rata odometer
```

untuk setiap merek.

---

## Contoh `.groupby()`

Contoh sederhana:

```python
car_sales.groupby(["Make"]).mean(numeric_only=True)
```

Kode tersebut dapat dibaca:

```text
Kelompokkan data berdasarkan Make
        ↓
Buat kelompok berdasarkan merek
        ↓
Hitung rata-rata
```

Misalnya terdapat:

```text
Toyota
Toyota
Honda
Honda
BMW
```

maka Pandas akan membuat kelompok:

```text
Toyota
Honda
BMW
```

dan menghitung nilai rata-rata untuk setiap kelompok.

---

## Memahami Konsep `groupby()`

Bayangkan kita memiliki data:

| Make | Price |
|---|---:|
| Toyota | 4000 |
| Toyota | 6000 |
| Honda | 5000 |
| Honda | 7000 |
| BMW | 15000 |

Dengan:

```python
car_sales.groupby(["Make"]).mean(numeric_only=True)
```

kita secara konseptual melakukan:

```text
Toyota
4000
6000
 ↓
Mean = 5000

Honda
5000
7000
 ↓
Mean = 6000

BMW
15000
 ↓
Mean = 15000
```

Dengan demikian, `groupby()` sangat berguna untuk melakukan analisis berdasarkan kelompok.

---

## `crosstab()` vs `groupby()`

Keduanya dapat digunakan untuk analisis data, tetapi tujuan utamanya berbeda.

| Method | Tujuan utama |
|---|---|
| `pd.crosstab()` | Melihat hubungan/frekuensi antar kategori |
| `.groupby()` | Mengelompokkan data untuk kemudian melakukan operasi |

Contoh:

```python
pd.crosstab(car_sales["Make"], car_sales["Doors"])
```

lebih cocok untuk melihat:

```text
Jumlah mobil berdasarkan Make dan Doors
```

Sedangkan:

```python
car_sales.groupby(["Make"]).mean(numeric_only=True)
```

lebih cocok untuk melihat:

```text
Rata-rata data numerik berdasarkan Make
```

---

## Visualisasi Data

Selain menggunakan angka dan tabel, kita juga perlu memvisualisasikan data.

Visualisasi membantu kita melihat pola yang mungkin sulit ditemukan hanya dengan membaca tabel.

Contohnya:

```text
Data
 ↓
Tabel
 ↓
Grafik
 ↓
Pola lebih mudah dilihat
```

Dalam Data Science dan Machine Learning, visualisasi dapat membantu kita memahami dataset sebelum melakukan modelling.

---

## Pandas dan Matplotlib

Pandas memiliki kemampuan plotting yang terintegrasi dengan **Matplotlib**.

Matplotlib adalah library Python yang digunakan untuk membuat berbagai jenis visualisasi.

Contohnya:

```python
import matplotlib.pyplot as plt
```

Pandas kemudian dapat menggunakan kemampuan plotting tersebut.

Secara sederhana:

```text
Pandas
  ↓
DataFrame
  ↓
Plotting
  ↓
Matplotlib
  ↓
Visualisasi
```

---

## Menampilkan Plot di Jupyter Notebook

Jika menggunakan Jupyter Notebook, kita dapat menggunakan:

```python
%matplotlib inline
```

Kemudian:

```python
import matplotlib.pyplot as plt
```

`%matplotlib inline` merupakan **magic command** Jupyter yang digunakan untuk menampilkan grafik secara langsung di dalam notebook.

Contoh:

```python
%matplotlib inline

import matplotlib.pyplot as plt
```

Pada banyak environment Jupyter modern, plot biasanya sudah dapat ditampilkan tanpa konfigurasi tambahan ini. Namun, memahami perintah tersebut tetap berguna karena sering ditemukan pada notebook pembelajaran dan project lama.

---

## Line Plot

Salah satu jenis visualisasi dasar adalah **line plot**.

Line plot dapat digunakan untuk melihat perubahan atau tren data.

Misalnya kita memiliki data:

```text
Odometer (KM)
```

Kita dapat membuat line plot:

```python
car_sales["Odometer (KM)"].plot()
```

Pandas akan membuat grafik berdasarkan nilai pada kolom tersebut.

---

## Memahami Line Plot

Secara sederhana:

```text
Odometer (KM)
      ↓
Line Plot
      ↓
Melihat pola perubahan data
```

Line plot dapat membantu kita melihat apakah nilai data:

```text
naik
turun
stabil
atau memiliki pola tertentu
```

Namun, tidak semua data cocok divisualisasikan menggunakan line plot.

Pemilihan jenis grafik harus disesuaikan dengan tujuan analisis.

---

## Histogram

Jenis visualisasi lain yang sangat berguna adalah **histogram**.

Histogram digunakan untuk melihat **distribusi atau persebaran data numerik**.

Contohnya:

```python
car_sales["Odometer (KM)"].hist()
```

Histogram membantu kita melihat bagaimana nilai dalam sebuah kolom tersebar.

---

## Memahami Histogram

Misalnya kita memiliki data:

```text
60000
70000
80000
90000
100000
110000
120000
150000
```

Histogram akan mengelompokkan nilai ke dalam beberapa rentang.

Secara konseptual:

```text
Jumlah Data
   │
   │       ███
   │       ███
   │   ███ ███
   │   ███ ███ ███
   └──────────────────
       Rentang Nilai
```

Dari histogram, kita dapat melihat apakah data:

- terkonsentrasi pada rentang tertentu
- tersebar luas
- memiliki nilai ekstrem
- memiliki distribusi yang tidak seimbang

---

## Line Plot vs Histogram

Kedua grafik memiliki tujuan yang berbeda.

| Grafik | Tujuan |
|---|---|
| Line Plot | Melihat pola atau perubahan nilai |
| Histogram | Melihat distribusi data |

Contohnya:

```python
car_sales["Odometer (KM)"].plot()
```

digunakan untuk line plot.

Sedangkan:

```python
car_sales["Odometer (KM)"].hist()
```

digunakan untuk histogram.

---

## Mengapa Visualisasi Penting dalam Machine Learning?

Visualisasi bukan hanya untuk membuat data terlihat menarik.

Visualisasi dapat membantu kita menemukan masalah dan pola pada dataset.

Misalnya:

```text
Data
 ↓
Visualisasi
 ↓
Menemukan pola
 ↓
Menemukan outlier
 ↓
Memahami distribusi
 ↓
Membuat keputusan preprocessing
```

Sebelum membuat model Machine Learning, pemahaman seperti ini sangat berguna.

---

## Data Cleaning

Ketika melakukan analisis data, kita mungkin menemukan data yang belum memiliki format yang sesuai.

Misalnya kolom harga:

```text
Price
$4,000.00
$5,500.00
$12,000.00
```

Secara visual data tersebut memang terlihat seperti angka.

Namun bagi program, nilai tersebut sebenarnya merupakan **teks/string** karena mengandung:

```text
$
,
.
```

Akibatnya, kita tidak dapat memperlakukannya sebagai angka secara langsung.

---

## Masalah Data Numerik yang Berbentuk Teks

Misalnya:

```text
"$4,000.00"
```

Secara manusia, kita memahami bahwa nilai tersebut berarti:

```text
4000
```

Tetapi komputer dapat membaca nilai tersebut sebagai:

```text
string
```

bukan:

```text
number
```

Hal ini menjadi masalah ketika kita ingin melakukan:

```text
Perhitungan rata-rata
Penjumlahan
Visualisasi
Machine Learning
```

Karena itu, data perlu dibersihkan dan dikonversi menjadi tipe numerik.

---

## Membersihkan Kolom Price

Kita dapat menggunakan `.str.replace()` untuk menghapus karakter yang tidak diperlukan.

Contohnya:

```python
car_sales["Price"] = car_sales["Price"].str.replace(
    r"[\$\,\.]",
    "",
    regex=True
).astype(int)
```

Kode tersebut melakukan beberapa proses:

```text
"$4,000.00"
      ↓
    hapus $
      ↓
    hapus ,
      ↓
    hapus .
      ↓
   "400000"
      ↓
ubah menjadi integer
      ↓
    400000
```

---

## Mengapa Menggunakan `regex=True`?

Pada versi Pandas yang lebih baru, penggunaan pola regular expression pada `.str.replace()` perlu ditulis secara eksplisit dengan:

```python
regex=True
```

Contoh:

```python
car_sales["Price"].str.replace(
    r"[\$\,\.]",
    "",
    regex=True
)
```

`regex=True` memberitahu Pandas bahwa parameter pertama merupakan **regular expression**.

Ini penting karena kode lama seperti:

```python
car_sales["Price"].str.replace(r"[\$\,\.]", "")
```

dapat menghasilkan error atau warning pada versi Pandas tertentu.

Untuk kode yang lebih kompatibel dengan Pandas modern, gunakan:

```python
regex=True
```

---

## Memahami Regular Expression Secara Sederhana

Kita belum perlu mempelajari regular expression secara mendalam.

Pada contoh:

```text
r"[\$\,\.]"
```

pola tersebut digunakan untuk mencari karakter:

```text
$
,
.
```

Kemudian karakter tersebut diganti dengan string kosong:

```text
""
```

Sehingga:

```text
"$4,000.00"
```

menjadi:

```text
"400000"
```

---

## Mengubah String Menjadi Integer

Setelah karakter yang tidak diperlukan dihapus, data masih berupa string.

Contohnya:

```text
"400000"
```

Kita dapat mengubahnya menjadi integer menggunakan:

```python
.astype(int)
```

Sehingga:

```text
"400000"
```

menjadi:

```text
400000
```

Sekarang data sudah dapat diperlakukan sebagai angka.

---

## Menghilangkan Dua Angka Nol Terakhir

Pada dataset tertentu, setelah proses pembersihan:

```text
"$4,000.00"
```

dapat berubah menjadi:

```text
400000
```

Padahal nilai yang diinginkan adalah:

```text
4000
```

Hal ini terjadi karena titik desimal juga dihapus.

Salah satu pendekatan yang digunakan dalam dataset pembelajaran tersebut adalah membagi nilai dengan `100`.

Contohnya:

```python
car_sales["Price"] = car_sales["Price"] // 100
```

Hasil:

```text
400000
   ↓
 4000
```

Operator:

```text
//
```

merupakan **floor division** pada Python.

---

## Mengapa Menggunakan `//`?

Dalam kasus data harga yang sudah menjadi integer, kita dapat menggunakan:

```python
// 100
```

untuk membagi nilai dan mendapatkan hasil pembagian bulat.

Contoh:

```python
400000 // 100
```

hasil:

```text
4000
```

Namun, pendekatan ini hanya tepat jika kita memang memahami format data dan mengetahui bahwa dua digit terakhir merepresentasikan bagian desimal.

Jangan membagi data dengan `100` secara sembarangan tanpa memahami format dataset.

---

## Contoh Data Cleaning Lengkap

Misalnya:

```text
Price
$4,000.00
$5,500.00
$12,000.00
```

Kita dapat melakukan:

```python
car_sales["Price"] = car_sales["Price"].str.replace(
    r"[\$\,\.]",
    "",
    regex=True
).astype(int)

car_sales["Price"] = car_sales["Price"] // 100
```

Alurnya:

```text
"$4,000.00"
    ↓
"400000"
    ↓
 400000
    ↓
  4000
```

---

## Penting: Perhatikan Format Data

Data cleaning harus dilakukan berdasarkan format data yang sebenarnya.

Misalnya:

```text
$4,000.00
```

dapat dibersihkan dengan pendekatan di atas.

Tetapi jika format datanya:

```text
4.000,00
```

maka aturan pembersihannya berbeda karena titik dan koma memiliki fungsi yang berbeda.

Karena itu, jangan sekadar menyalin kode cleaning.

Biasakan memahami:

```text
Format Data
     ↓
  Masalah
     ↓
Transformasi yang Dibutuhkan
     ↓
Data Bersih
```

---

## Setelah Data Dibersihkan

Setelah kolom `Price` menjadi numerik, kita dapat melakukan operasi yang sebelumnya sulit atau tidak dapat dilakukan dengan benar.

Misalnya:

```python
car_sales["Price"].mean()
```

atau:

```python
car_sales["Price"].hist()
```

Sekarang kita dapat:

```text
Menghitung statistik
       ↓
Membuat visualisasi
       ↓
Menganalisis data
       ↓
Mempersiapkan Machine Learning
```

---

## Contoh Workflow Analisis

Secara sederhana, workflow yang kita lakukan adalah:

```text
Membaca Dataset
      ↓
Memahami Data
      ↓
Memilih Data
      ↓
Membersihkan Data
      ↓
Mengelompokkan Data
      ↓
Membandingkan Data
      ↓
Memvisualisasikan Data
      ↓
Menarik Insight
```

Pandas membantu banyak bagian dalam workflow tersebut.

---

## Contoh Kode Lengkap

Berikut contoh sederhana yang menggabungkan konsep pada materi ini:

```python
import pandas as pd
import matplotlib.pyplot as plt

# Membaca dataset
car_sales = pd.read_csv("car-sales.csv")

# Melihat perbandingan Make dan Doors
pd.crosstab(
    car_sales["Make"],
    car_sales["Doors"]
)

# Mengelompokkan berdasarkan Make
car_sales.groupby(["Make"]).mean(numeric_only=True)

# Membuat line plot
car_sales["Odometer (KM)"].plot()

# Membuat histogram
car_sales["Odometer (KM)"].hist()

plt.show()
```

Contoh di atas menunjukkan bagaimana Pandas dapat digunakan untuk:

```text
Membaca data
    ↓
Membandingkan data
    ↓
Mengelompokkan data
    ↓
Memvisualisasikan data
```

---

## Contoh Data Cleaning dan Visualisasi

Jika `Price` masih berupa string:

```python
car_sales["Price"] = car_sales["Price"].str.replace(
    r"[\$\,\.]",
    "",
    regex=True
).astype(int)

car_sales["Price"] = car_sales["Price"] // 100
```

Setelah itu kita dapat membuat histogram:

```python
car_sales["Price"].hist()

plt.show()
```

Dengan demikian, data yang awalnya tidak siap digunakan dapat dibersihkan terlebih dahulu sebelum dianalisis.

---

## Pandas sebagai Bagian dari Workflow Data Science

Pada tahap ini kita mulai melihat bahwa Pandas bukan sekadar library untuk membuat tabel.

Pandas dapat digunakan untuk:

```text
Membaca data
    ↓
Memeriksa data
    ↓
Memilih data
    ↓
Membersihkan data
    ↓
Mengelompokkan data
    ↓
Menganalisis data
    ↓
Mempersiapkan visualisasi
```

Karena itu Pandas menjadi salah satu tool penting dalam workflow Data Science.

---

## Hubungan Pandas, Matplotlib, dan Machine Learning

Ketiga tool tersebut dapat memiliki peran berbeda.

```text
Pandas
  ↓
Mengelola dan memahami data
  ↓
Matplotlib
  ↓
Memvisualisasikan data
  ↓
Scikit-Learn
  ↓
Membuat model Machine Learning
```

Contohnya:

```text
CSV Dataset
     ↓
   Pandas
     ↓
Data Cleaning
     ↓
Data Analysis
     ↓
Matplotlib
     ↓
Visualization
     ↓
Preprocessing
     ↓
Machine Learning
```

Workflow tersebut akan sering kita gunakan ketika membangun project Machine Learning.

---

## Checklist Pemula

Setelah mempelajari materi ini, pastikan sudah memahami:

- Apa fungsi `pd.crosstab()`?
- Apa fungsi `.groupby()`?
- Apa perbedaan `crosstab()` dan `groupby()`?
- Apa fungsi line plot?
- Apa fungsi histogram?
- Apa hubungan Pandas dengan Matplotlib?
- Mengapa data perlu divisualisasikan?
- Apa yang dimaksud dengan data cleaning?
- Mengapa `$4,000.00` dapat dianggap sebagai teks?
- Mengapa data numerik perlu memiliki tipe yang sesuai?
- Apa fungsi `.str.replace()`?
- Mengapa menggunakan `regex=True`?
- Apa fungsi `.astype(int)`?
- Mengapa pada dataset tertentu perlu membagi nilai dengan `100`?
- Mengapa kita harus memahami format data sebelum melakukan cleaning?

---

## Kesimpulan

Pada materi ini kita mulai menggunakan Pandas untuk melakukan analisis yang lebih bermakna terhadap dataset.

Untuk membandingkan data berdasarkan kategori, kita dapat menggunakan:

```python
pd.crosstab(car_sales["Make"], car_sales["Doors"])
```

Untuk mengelompokkan data:

```python
car_sales.groupby(["Make"]).mean(numeric_only=True)
```

Untuk visualisasi sederhana:

```python
car_sales["Odometer (KM)"].plot()
```

dan:

```python
car_sales["Odometer (KM)"].hist()
```

Kita juga belajar bahwa data mentah tidak selalu siap digunakan.

Contohnya:

```text
"$4,000.00"
```

perlu dibersihkan sebelum dapat diperlakukan sebagai angka.

Salah satu contoh prosesnya:

```python
car_sales["Price"] = car_sales["Price"].str.replace(
    r"[\$\,\.]",
    "",
    regex=True
).astype(int)
```

Kemudian, jika format dataset memang menyebabkan dua digit desimal menjadi bagian dari angka integer:

```python
car_sales["Price"] = car_sales["Price"] // 100
```

Konsep penting yang perlu diingat adalah:

```text
Raw Data
   ↓
Data Cleaning
   ↓
Data Analysis
   ↓
Visualization
   ↓
Data Preparation
   ↓
Machine Learning
```

Pandas membantu kita memahami dan mempersiapkan data sebelum data tersebut digunakan lebih jauh dalam proses Machine Learning.
