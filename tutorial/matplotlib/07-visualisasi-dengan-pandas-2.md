---
sidebar_position: 8
title: "Visualisasi Data dari Pandas - 2"
---

## Manipulasi Data dan Visualisasi dari Pandas DataFrame (Line Plot dan Scatter Plot)

Dalam proyek **Data Science**, data yang diperoleh dari sumber eksternal sering kali belum siap untuk langsung dianalisis.

Salah satu contoh yang umum adalah data harga yang masih disimpan sebagai string dan memiliki karakter tambahan seperti:

```text
$4,000.00
$5,500.00
$12,000.00
```

Data seperti ini belum dapat diperlakukan sebagai angka secara langsung.

Sebelum melakukan analisis atau visualisasi, kita perlu melakukan beberapa proses:

```text
Raw Data
   ↓
Data Cleaning
   ↓
Data Transformation
   ↓
Data Analysis
   ↓
Visualization
```

Pada materi ini kita akan menggunakan **Pandas DataFrame** untuk melakukan cleaning, manipulasi data, membuat kolom baru, menghitung cumulative sum, dan membuat visualisasi.

---

## Dataset yang Digunakan

Kita akan menggunakan dataset kendaraan:

```python
car_sales = pd.read_csv("car-sales.csv")
```

Import Pandas:

```python
import pandas as pd
```

Kemudian membaca dataset:

```python
car_sales = pd.read_csv("car-sales.csv")
```

Untuk melihat data:

```python
car_sales.head()
```

Contoh struktur dataset:

| Make | Colour | Odometer (KM) | Doors | Price |
|---|---|---:|---:|---:|
| Toyota | White | 150000 | 4 | $4,000.00 |
| Honda | Red | 120000 | 4 | $5,000.00 |
| BMW | Black | 80000 | 4 | $12,000.00 |

Perhatikan bahwa kolom `Price` masih berupa data string karena terdapat simbol `$`, koma, dan desimal.

---

## Mengapa Data Cleaning Diperlukan?

Jika kita memeriksa tipe data:

```python
car_sales.dtypes
```

kemungkinan kolom `Price` akan terlihat sebagai:

```text
Price    object
```

Padahal secara konsep `Price` merupakan data numerik.

Kondisi ini dapat menyebabkan masalah ketika kita melakukan operasi matematika.

Misalnya:

```python
car_sales["Price"].mean()
```

Jika `Price` masih berupa string, Pandas tidak dapat memperlakukannya sebagai angka dengan benar.

Karena itu, kita perlu mengubah data tersebut menjadi numerik.

---

## Membersihkan Kolom Price

Misalnya data harga memiliki format:

```text
$4,000.00
```

Kita ingin mengubahnya menjadi:

```text
4000
```

Ada beberapa karakter yang harus dihapus:

- `$`
- `,`
- `.00`

---

## Menggunakan `str.replace()`

Pandas menyediakan method:

```python
.str.replace()
```

untuk melakukan manipulasi string pada seluruh nilai dalam sebuah Series.

Contoh:

```python
car_sales["Price"] = car_sales["Price"].str.replace(
    r"[\$\,\.]",
    "",
    regex=True
)
```

Regex tersebut akan menghapus karakter:

```text
$
,
.
```

Contohnya:

```text
$4,000.00
```

akan menjadi:

```text
400000
```

Perlu diperhatikan bahwa setelah menghapus titik, bagian `.00` juga ikut menjadi `00`.

---

## Memahami Regex

Bagian:

```python
r"[\$\,\.]"
```

merupakan regular expression.

Karakter yang berada di dalam:

```text
[ ... ]
```

menunjukkan sekumpulan karakter yang ingin dicari.

Dalam contoh ini:

```text
\$
```

mewakili simbol `$`.

```text
\,
```

mewakili koma.

```text
\.
```

mewakili titik.

Sehingga:

```python
r"[\$\,\.]"
```

berarti mencari karakter `$`, `,`, atau `.`.

Parameter:

```python
regex=True
```

memberitahu Pandas bahwa pola yang diberikan harus diperlakukan sebagai regular expression.

---

## Memotong Dua Karakter Terakhir

Setelah proses `replace()`, misalnya:

```text
$4,000.00
```

menjadi:

```text
400000
```

Jika format dataset memang menyimpan dua digit desimal yang ingin dibuang, kita dapat menggunakan slicing:

```python
car_sales["Price"] = car_sales["Price"].str[:-2]
```

Hasilnya:

```text
400000
```

menjadi:

```text
4000
```

---

## Memahami `str[:-2]`

Sintaks:

```python
.str[:-2]
```

berarti mengambil seluruh karakter kecuali dua karakter terakhir.

Contoh:

```text
"400000"
```

menjadi:

```text
"4000"
```

Secara konsep:

```text
400000
    ↑↑
    dua karakter terakhir dihapus
```

Namun teknik ini hanya benar jika dua karakter terakhir memang selalu merupakan bagian desimal yang ingin dihilangkan.

---

## Mengubah String Menjadi Integer

Setelah karakter yang tidak diperlukan dihapus, data masih berupa string.

Contoh:

```text
"4000"
```

Untuk mengubahnya menjadi integer:

```python
car_sales["Price"] = car_sales["Price"].astype(int)
```

Sekarang:

```python
car_sales["Price"].dtype
```

akan menghasilkan tipe integer, misalnya:

```text
int64
```

---

## Mengapa `astype(int)` Penting?

Setelah dikonversi menjadi integer, kita dapat melakukan operasi matematika.

Contohnya:

```python
car_sales["Price"].mean()
```

atau:

```python
car_sales["Price"].sum()
```

atau:

```python
car_sales["Price"].cumsum()
```

Data numerik juga lebih mudah digunakan dalam Machine Learning.

---

## Contoh Lengkap Data Cleaning

Berikut contoh proses cleaning berdasarkan format harga seperti `$4,000.00`:

```python
import pandas as pd

# Membaca dataset
car_sales = pd.read_csv("car-sales.csv")

# Menghapus $, koma, dan titik
car_sales["Price"] = car_sales["Price"].str.replace(
    r"[\$\,\.]",
    "",
    regex=True
)

# Menghapus dua karakter terakhir
car_sales["Price"] = car_sales["Price"].str[:-2]

# Mengubah menjadi integer
car_sales["Price"] = car_sales["Price"].astype(int)

# Memeriksa hasil
print(car_sales["Price"].head())
print(car_sales["Price"].dtype)
```

---

## Catatan Penting tentang Format Harga

Teknik:

```python
.str.replace(...)
.str[:-2]
```

bergantung pada format dataset.

Jika dataset menyimpan:

```text
$4,000.00
```

maka pendekatan tersebut dapat digunakan sebagai contoh pembelajaran.

Namun jika dataset menggunakan format yang berbeda, misalnya:

```text
$4,000
```

atau:

```text
4000.50
```

maka proses cleaning harus disesuaikan.

Dalam proyek nyata, jangan langsung melakukan slicing tanpa memeriksa format data terlebih dahulu.

---

## Memeriksa Data Sebelum Cleaning

Sebelum melakukan transformasi, kita dapat melihat beberapa nilai:

```python
car_sales["Price"].head()
```

Kita juga dapat memeriksa tipe datanya:

```python
car_sales["Price"].dtype
```

Dan memeriksa nilai unik:

```python
car_sales["Price"].unique()
```

Langkah ini membantu kita memahami struktur data sebelum melakukan cleaning.

---

## Menambahkan Kolom Sale Date

Setelah data harga bersih, kita dapat menambahkan informasi tanggal penjualan.

Gunakan:

```python
pd.date_range()
```

Contoh:

```python
car_sales["Sale Date"] = pd.date_range(
    "2021-01-01",
    periods=len(car_sales)
)
```

Kode tersebut membuat tanggal sebanyak jumlah baris dalam DataFrame.

---

## Memahami `len(car_sales)`

Bagian:

```python
len(car_sales)
```

digunakan untuk mendapatkan jumlah baris DataFrame.

Misalnya:

```python
len(car_sales)
```

menghasilkan:

```text
100
```

maka:

```python
pd.date_range(
    "2021-01-01",
    periods=100
)
```

akan menghasilkan 100 tanggal.

Dengan menggunakan:

```python
periods=len(car_sales)
```

jumlah tanggal akan otomatis menyesuaikan jumlah baris dataset.

---

## Contoh Hasil Sale Date

Jika dataset memiliki lima baris:

```text
Make      Price
Toyota    4000
Honda     5000
BMW       12000
Ford      7000
Audi      15000
```

maka kolom baru dapat menjadi:

```text
Sale Date
2021-01-01
2021-01-02
2021-01-03
2021-01-04
2021-01-05
```

Sehingga DataFrame memiliki informasi tambahan:

| Make | Price | Sale Date |
|---|---:|---|
| Toyota | 4000 | 2021-01-01 |
| Honda | 5000 | 2021-01-02 |
| BMW | 12000 | 2021-01-03 |
| Ford | 7000 | 2021-01-04 |
| Audi | 15000 | 2021-01-05 |


Data seluruh dataset:

![matplotlib](/img/python/34.png)

---

## Membuat Total Sales Kumulatif

Setelah memiliki kolom `Price`, kita dapat menghitung total penjualan secara kumulatif.

Gunakan:

```python
car_sales["Total Sales"] = car_sales["Price"].cumsum()
```

Method:

```python
.cumsum()
```

merupakan singkatan dari **cumulative sum**.

---

## Memahami Cumulative Sum

Misalnya harga kendaraan:

```text
4000
5000
12000
7000
15000
```

Maka cumulative sum menjadi:

```text
4000
9000
21000
28000
43000
```

Perhitungannya:

```text
4000

4000 + 5000 = 9000

4000 + 5000 + 12000 = 21000

4000 + 5000 + 12000 + 7000 = 28000

4000 + 5000 + 12000 + 7000 + 15000 = 43000
```

Dengan demikian, setiap baris menunjukkan total penjualan yang telah terakumulasi sampai baris tersebut.

---

## Menambahkan Total Sales ke DataFrame

Kode:

```python
car_sales["Total Sales"] = car_sales["Price"].cumsum()
```

akan membuat kolom baru.

Contoh:

| Price | Total Sales |
|---:|---:|
| 4000 | 4000 |
| 5000 | 9000 |
| 12000 | 21000 |
| 7000 | 28000 |
| 15000 | 43000 |

---

## Visualisasi dengan Pandas

Setelah data siap, kita dapat membuat visualisasi langsung menggunakan:

```python
.plot()
```

Pandas menyediakan interface yang praktis untuk membuat grafik menggunakan Matplotlib.

Import Matplotlib:

```python
import matplotlib.pyplot as plt
```

---

## Line Plot Total Sales

Kita dapat membuat line plot untuk melihat perkembangan total penjualan:

```python
car_sales.plot(
    x="Sale Date",
    y="Total Sales"
)
```

Kemudian:

```python
plt.show()
```

Contoh lengkap:

```python
car_sales.plot(
    x="Sale Date",
    y="Total Sales"
)

plt.show()
```

![matplotlib](/img/python/25.png)

Pada grafik:

- sumbu X menggunakan `Sale Date`;
- sumbu Y menggunakan `Total Sales`.

---

## Mengapa Line Plot Digunakan?

Line plot cocok digunakan untuk melihat perubahan nilai sepanjang suatu urutan, terutama ketika terdapat dimensi waktu.

Dalam contoh ini kita ingin melihat:

```text
Tanggal
   ↓
Perubahan
   ↓
Total Sales
```

Sehingga line plot dapat membantu memperlihatkan bagaimana penjualan kumulatif berkembang dari waktu ke waktu.

---

## Scatter Plot Odometer dan Price

Selain melihat tren penjualan, kita juga dapat mengeksplorasi hubungan antara jarak tempuh kendaraan dan harga.

Gunakan:

```python
car_sales.plot(
    x="Odometer (KM)",
    y="Price",
    kind="scatter"
)
```

Kemudian:

```python
plt.show()
```

![matplotlib](/img/python/26.png)

---

## Memahami Scatter Plot

Scatter plot menampilkan setiap baris data sebagai sebuah titik.

Dalam contoh:

```python
x="Odometer (KM)"
```

digunakan sebagai sumbu X.

Sedangkan:

```python
y="Price"
```

digunakan sebagai sumbu Y.

Sehingga kita dapat melihat pola antara:

```text
Odometer (KM)
      ↕
Price
```

Misalnya, kita mungkin melihat bahwa kendaraan dengan jarak tempuh lebih tinggi cenderung memiliki harga yang berbeda dibandingkan kendaraan dengan jarak tempuh lebih rendah.

Namun, kesimpulan tersebut harus didasarkan pada pola aktual dataset dan tidak dapat ditentukan hanya dari kode.

---

## Mengapa Scatter Plot Membutuhkan Data Numerik?

Scatter plot menggunakan koordinat X dan Y.

Karena itu, variabel yang digunakan harus dapat direpresentasikan secara numerik.

Contohnya:

```python
x="Odometer (KM)"
y="Price"
```

keduanya merupakan data numerik.

Jika `Price` masih berupa:

```text
"$4,000.00"
```

maka proses plotting dapat mengalami masalah karena nilai tersebut masih berupa string.

Itulah alasan **data cleaning perlu dilakukan sebelum visualisasi**.

---

## Contoh Lengkap Manipulasi dan Visualisasi

Berikut workflow lengkap:

```python
import pandas as pd
import matplotlib.pyplot as plt

# Membaca dataset
car_sales = pd.read_csv("car-sales.csv")

# Membersihkan kolom Price
car_sales["Price"] = car_sales["Price"].str.replace(
    r"[\$\,\.]",
    "",
    regex=True
)

car_sales["Price"] = car_sales["Price"].str[:-2]

car_sales["Price"] = car_sales["Price"].astype(int)

# Membuat kolom tanggal
car_sales["Sale Date"] = pd.date_range(
    "2021-01-01",
    periods=len(car_sales)
)

# Membuat total penjualan kumulatif
car_sales["Total Sales"] = car_sales["Price"].cumsum()

# Line plot
car_sales.plot(
    x="Sale Date",
    y="Total Sales"
)

plt.show()

# Scatter plot
car_sales.plot(
    x="Odometer (KM)",
    y="Price",
    kind="scatter"
)

plt.show()
```

![matplotlib](/img/python/25.png)
![matplotlib](/img/python/26.png)

---

## Workflow Data Cleaning hingga Visualization

Materi ini dapat dirangkum menjadi workflow:

```text
CSV Dataset
     ↓
pd.read_csv()
     ↓
Inspect Data
     ↓
Clean Price
     ↓
str.replace()
     ↓
String Slicing
     ↓
astype(int)
     ↓
Data Numerik
     ↓
Tambah Sale Date
     ↓
cumsum()
     ↓
Visualization
     ↓
Line Plot / Scatter Plot
```

Workflow seperti ini merupakan bagian penting dari proses **Exploratory Data Analysis (EDA)**.

---

## Catatan Penting untuk Jupyter Notebook

Jupyter Notebook menjalankan cell secara berurutan dan mempertahankan state variabel.

Misalnya kita menjalankan:

```python
car_sales["Price"] = car_sales["Price"].str[:-2]
```

Kemudian menjalankan cell tersebut sekali lagi tanpa membaca ulang dataset.

Data akan dipotong lagi.

Contoh:

```text
400000
   ↓
4000
   ↓
40
```

Karena itu, hati-hati ketika menjalankan kembali cell transformasi.

---

## Cara Mengatasi Kesalahan karena Cell Dijalankan Berulang

Jika DataFrame sudah terlanjur berubah, kita dapat membaca ulang dataset:

```python
car_sales = pd.read_csv("car-sales.csv")
```

Kemudian menjalankan proses cleaning dari awal.

Alternatif lainnya adalah menggunakan:

```text
Kernel → Restart
```

kemudian menjalankan cell kembali dari awal secara berurutan.

Hal ini membantu menjaga state notebook tetap konsisten.

---

## Praktik yang Lebih Aman

Daripada langsung mengubah kolom asli berkali-kali selama eksperimen, kita dapat membuat salinan:

```python
car_sales_clean = car_sales.copy()
```

Kemudian melakukan transformasi pada salinan:

```python
car_sales_clean["Price"] = car_sales_clean["Price"].str.replace(
    r"[\$\,\.]",
    "",
    regex=True
)
```

Pendekatan ini membantu menjaga dataset awal tetap tersedia.

---

## Ringkasan Method Penting

| Method | Fungsi |
|---|---|
| `pd.read_csv()` | Membaca file CSV |
| `.str.replace()` | Mengganti atau menghapus pola string |
| `.str[:-2]` | Mengambil string tanpa dua karakter terakhir |
| `.astype(int)` | Mengubah data menjadi integer |
| `pd.date_range()` | Membuat rentang tanggal |
| `len(df)` | Mendapatkan jumlah baris |
| `.cumsum()` | Menghitung jumlah kumulatif |
| `.plot()` | Membuat visualisasi |
| `kind="scatter"` | Membuat scatter plot |
| `plt.show()` | Menampilkan grafik |

---

## Konsep yang Perlu Diingat

### Data Cleaning

Data mentah sering kali membutuhkan transformasi sebelum dapat dianalisis.

Contohnya:

```text
"$4,000.00"
```

perlu diubah menjadi data numerik sebelum digunakan dalam operasi matematika.

---

### Data Transformation

Transformasi dapat dilakukan menggunakan method Pandas seperti:

```python
.str.replace()
```

dan:

```python
.astype(int)
```

---

### Cumulative Sum

`cumsum()` menghasilkan nilai kumulatif dari suatu Series.

```python
df["Total"] = df["Price"].cumsum()
```

---

### Visualization

Pandas menyediakan cara sederhana untuk membuat visualisasi:

```python
df.plot()
```

Jenis grafik dapat ditentukan menggunakan:

```python
kind="scatter"
```

atau jenis plot lainnya.

---

## Contoh Pemilihan Visualisasi

| Tujuan | Visualisasi |
|---|---|
| Melihat tren waktu | Line plot |
| Membandingkan kategori | Bar plot |
| Melihat distribusi | Histogram |
| Melihat hubungan dua variabel numerik | Scatter plot |
| Melihat outlier dan distribusi | Box plot |

Pemilihan jenis grafik harus disesuaikan dengan pertanyaan analisis yang ingin dijawab.

---

## Kesimpulan

Pada materi ini kita mempelajari bagaimana melakukan **manipulasi data dan visualisasi menggunakan Pandas DataFrame**.

Tahapan utama yang dipelajari adalah:

1. Membaca dataset menggunakan `pd.read_csv()`.
2. Memeriksa data dan tipe data.
3. Membersihkan kolom `Price`.
4. Menghapus karakter `$`, koma, dan titik menggunakan `str.replace()`.
5. Menggunakan slicing untuk membuang dua digit desimal sesuai format dataset.
6. Mengubah data menjadi integer menggunakan `astype(int)`.
7. Membuat kolom `Sale Date` menggunakan `pd.date_range()`.
8. Membuat `Total Sales` menggunakan `cumsum()`.
9. Membuat line plot dari DataFrame.
10. Membuat scatter plot untuk mengeksplorasi hubungan `Odometer (KM)` dan `Price`.

Konsep penting yang perlu diingat:

```text
Clean → Transform → Analyze → Visualize
```

Pandas `.plot()` sangat membantu ketika data sudah berada dalam DataFrame, sedangkan Matplotlib tetap dapat digunakan untuk melakukan pengaturan dan customization visualisasi yang lebih detail.
