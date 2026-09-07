---
sidebar_position: 3
title: "Mendeskripsikan Data"
---

Setelah mengetahui cara membuat dan membaca DataFrame, langkah berikutnya adalah **memahami isi data yang kita miliki**.

Ketika mendapatkan sebuah dataset baru, kita biasanya belum mengetahui:

- Berapa banyak data yang tersedia?
- Apa saja nama kolomnya?
- Tipe data setiap kolom apa?
- Berapa jumlah baris?
- Apakah ada data yang kosong?
- Berapa nilai rata-rata suatu kolom?
- Berapa nilai minimum dan maksimum?
- Bagaimana gambaran statistik dari dataset?

Pandas menyediakan berbagai fitur untuk membantu kita menjawab pertanyaan tersebut.

Proses memahami karakteristik dataset ini sering disebut sebagai **describing data** atau mendeskripsikan data.

---

## Mengapa Mendeskripsikan Data Penting?

Dalam Data Science dan Machine Learning, kita sebaiknya tidak langsung membuat model setelah mendapatkan dataset.

Kita perlu memahami data terlebih dahulu.

Contohnya kita mendapatkan dataset penjualan mobil:

| Make | Colour | Odometer (KM) | Doors | Price |
|---|---|---:|---:|---:|
| Toyota | White | 150000 | 4 | 4000 |
| Honda | Red | 120000 | 4 | 5000 |
| BMW | Black | 80000 | 4 | 15000 |

Sebelum menggunakan dataset tersebut, kita perlu mengetahui:

```text
Apa isi datanya?
       ↓
Berapa jumlah datanya?
       ↓
Apa tipe setiap kolom?
       ↓
Apakah ada data kosong?
       ↓
Bagaimana karakteristik angka-angkanya?
```

Pandas menyediakan berbagai attribute dan method untuk melakukan pemeriksaan awal tersebut.

---

## Attribute vs Method

Salah satu konsep penting ketika belajar Pandas adalah membedakan **attribute** dan **method**.

Contoh:

```python
car_sales.dtypes
```

dan:

```python
car_sales.describe()
```

Keduanya terlihat mirip, tetapi memiliki fungsi yang berbeda.

---

## Apa Itu Attribute?

**Attribute** adalah informasi atau properti yang dimiliki oleh sebuah object.

Dalam Pandas, beberapa attribute DataFrame digunakan untuk melihat informasi yang sudah tersedia pada DataFrame.

Contohnya:

```python
car_sales.dtypes
```

```python
car_sales.columns
```

```python
car_sales.index
```

Perhatikan bahwa attribute tersebut **tidak menggunakan `()`**.

Contoh:

```python
car_sales.columns
```

bukan:

```python
car_sales.columns()
```

Cara mudah mengingatnya:

```text
Attribute
    ↓
Melihat informasi/properti object
    ↓
Tidak menggunakan ()
```

---

## Apa Itu Method?

**Method** adalah fungsi yang dimiliki oleh sebuah object dan dapat dipanggil untuk melakukan suatu operasi.

Contohnya:

```python
car_sales.describe()
```

```python
car_sales.info()
```

```python
car_sales.mean()
```

```python
car_sales.sum()
```

Method menggunakan tanda:

```text
()
```

Cara mudah mengingatnya:

```text
Method
   ↓
Menjalankan operasi
   ↓
Menggunakan ()
```

---

## Perbedaan Attribute dan Method

Perhatikan tabel berikut:

| Jenis | Contoh | Menggunakan `()`? | Tujuan |
|---|---|---|---|
| Attribute | `car_sales.dtypes` | Tidak | Melihat informasi |
| Attribute | `car_sales.columns` | Tidak | Melihat nama kolom |
| Attribute | `car_sales.index` | Tidak | Melihat index |
| Method | `car_sales.describe()` | Ya | Statistik deskriptif |
| Method | `car_sales.info()` | Ya | Informasi DataFrame |
| Method | `car_sales.mean()` | Ya | Menghitung rata-rata |
| Method | `car_sales.sum()` | Ya | Menghitung total |

Secara sederhana:

```text
Attribute
→ melihat properti

Method
→ melakukan operasi
```

---

## Melihat Tipe Data dengan `.dtypes`

Salah satu informasi penting ketika pertama kali melihat dataset adalah **tipe data setiap kolom**.

Kita dapat menggunakan:

```python
car_sales.dtypes
```

Contohnya:

```text
Make             object
Colour           object
Odometer (KM)     int64
Doors             int64
Price           float64
dtype: object
```

Informasi ini memberitahu kita bagaimana Pandas membaca setiap kolom.

---

## Memahami Tipe Data

Beberapa tipe data yang sering ditemukan antara lain:

```text
object
int64
float64
bool
datetime
```

Secara sederhana:

| Tipe | Contoh | Penggunaan |
|---|---|---|
| `object` | `"Toyota"` | Teks |
| `int64` | `4` | Bilangan bulat |
| `float64` | `4500.5` | Bilangan desimal |
| `bool` | `True` / `False` | Nilai logika |
| `datetime` | tanggal/waktu | Data tanggal dan waktu |

Tipe data sangat penting karena akan memengaruhi bagaimana data dapat diproses.

---

## Kenapa Tipe Data Penting?

Bayangkan terdapat kolom:

```text
Price
```

dengan nilai:

```text
5000
7000
9000
```

Jika Pandas mengenalinya sebagai angka, kita dapat melakukan operasi matematika.

Misalnya:

```text
Rata-rata
Total
Minimum
Maksimum
```

Namun jika angka tersebut terbaca sebagai teks, proses analisis dapat menjadi bermasalah.

Karena itu, memeriksa tipe data merupakan salah satu langkah awal ketika memahami dataset.

---

## Melihat Nama Kolom dengan `.columns`

Untuk melihat nama seluruh kolom, gunakan:

```python
car_sales.columns
```

Contoh hasil:

```text
Index(['Make', 'Colour', 'Odometer (KM)', 'Doors', 'Price'], dtype='object')
```

Hasil tersebut menunjukkan bahwa DataFrame memiliki beberapa kolom:

```text
Make
Colour
Odometer (KM)
Doors
Price
```

---

## Apa Itu Column Names?

Column names adalah nama atau header dari setiap kolom.

Contohnya:

| Make | Colour | Odometer (KM) | Doors | Price |
|---|---|---:|---:|---:|
| Toyota | White | 150000 | 4 | 4000 |
| Honda | Red | 120000 | 4 | 5000 |

Column names:

```text
Make
Colour
Odometer (KM)
Doors
Price
```

Mengetahui nama kolom penting karena nantinya kita akan sering menggunakan nama tersebut ketika memilih atau mengolah data.

---

## Memahami `.index`

Selain column, DataFrame juga memiliki **index**.

Untuk melihat index:

```python
car_sales.index
```

Contoh hasil:

```text
RangeIndex(start=0, stop=10, step=1)
```

Artinya DataFrame menggunakan index berurutan.

Jika terdapat 10 baris, index default biasanya:

```text
0
1
2
3
4
5
6
7
8
9
```

Perhatikan bahwa index dimulai dari `0`.

---

## Memahami `RangeIndex`

Contoh:

```text
RangeIndex(start=0, stop=10, step=1)
```

dapat dibaca sebagai:

```text
start = 0
stop  = 10
step  = 1
```

Artinya index dimulai dari `0`, bertambah `1`, dan berhenti sebelum `10`.

Sehingga index yang digunakan adalah:

```text
0, 1, 2, 3, 4, 5, 6, 7, 8, 9
```

Jadi jumlah barisnya adalah:

```text
10
```

---

## Melihat Ringkasan Statistik dengan `.describe()`

Salah satu method Pandas yang sangat berguna adalah:

```python
car_sales.describe()
```

Method ini memberikan **statistik deskriptif** untuk kolom numerik.

Contoh:

```text
       Odometer (KM)        Doors         Price
count       10.000000    10.000000     10.000000
mean    100000.000000     4.000000   7500.000000
std      25000.000000     0.000000   2500.000000
min      60000.000000     4.000000   4000.000000
25%      80000.000000     4.000000   5500.000000
50%     100000.000000     4.000000   7000.000000
75%     120000.000000     4.000000   9000.000000
max     150000.000000     4.000000  15000.000000
```

Jangan khawatir jika beberapa istilah statistik tersebut belum dipahami sepenuhnya.

Untuk saat ini, yang penting adalah mengetahui bahwa `.describe()` memberikan gambaran umum mengenai data numerik.

---

## Memahami Output `.describe()`

Beberapa informasi yang biasanya ditampilkan:

| Statistik | Gambaran |
|---|---|
| `count` | Jumlah data |
| `mean` | Nilai rata-rata |
| `std` | Standar deviasi |
| `min` | Nilai terkecil |
| `25%` | Kuartil pertama |
| `50%` | Median |
| `75%` | Kuartil ketiga |
| `max` | Nilai terbesar |

Contohnya:

```text
mean
```

memberikan informasi mengenai rata-rata.

Sedangkan:

```text
min
```

menunjukkan nilai terkecil.

Dan:

```text
max
```

menunjukkan nilai terbesar.

---

## `.describe()` Hanya untuk Kolom Numerik?

Secara default, `.describe()` pada DataFrame terutama memberikan statistik deskriptif untuk kolom numerik.

Misalnya:

```text
Odometer (KM)
Doors
Price
```

sedangkan kolom seperti:

```text
Make
Colour
```

yang berisi teks tidak menjadi fokus output default tersebut.

Ini masuk akal karena statistik seperti:

```text
mean
std
min
max
```

secara langsung lebih relevan untuk data numerik.

---

## Melihat Informasi DataFrame dengan `.info()`

Method lain yang sangat penting adalah:

```python
car_sales.info()
```

`.info()` memberikan ringkasan struktur DataFrame.

Contohnya dapat memberikan informasi seperti:

```text
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 10 entries, 0 to 9
Data columns (total 5 columns):
 #   Column          Non-Null Count  Dtype
---  ------          --------------  -----
 0   Make            10 non-null     object
 1   Colour          10 non-null     object
 2   Odometer (KM)   10 non-null     int64
 3   Doors           10 non-null     int64
 4   Price           10 non-null     float64
```

Output sebenarnya dapat sedikit berbeda tergantung dataset dan versi Pandas.

---

## Apa yang Bisa Diketahui dari `.info()`?

Dengan `.info()`, kita dapat melihat beberapa informasi penting:

```text
Jumlah baris
Jumlah kolom
Nama kolom
Jumlah nilai non-null
Tipe data
```

Hal ini membuat `.info()` sangat berguna ketika pertama kali mendapatkan dataset.

---

## Memahami Non-Null Count

Salah satu bagian penting dari `.info()` adalah:

```text
Non-Null Count
```

Non-null berarti data tersebut **tidak kosong** atau memiliki nilai.

Misalnya:

```text
Make
10 non-null
```

berarti terdapat 10 nilai yang tidak kosong pada kolom tersebut.

Jika DataFrame memiliki 10 baris tetapi:

```text
Price
8 non-null
```

maka terdapat kemungkinan 2 baris memiliki nilai kosong pada kolom `Price`.

Ini merupakan informasi penting untuk proses **data cleaning**.

---

## Menghitung Rata-Rata dengan `.mean()`

Untuk menghitung rata-rata, kita dapat menggunakan:

```python
car_sales.mean(numeric_only=True)
```

Secara umum, `.mean()` digunakan untuk menghitung **mean atau nilai rata-rata**.

Misalnya kita hanya ingin menghitung rata-rata jumlah pintu:

```python
car_sales["Doors"].mean(numeric_only=True)
```

Contohnya:

```text
4.0
```

Artinya rata-rata jumlah pintu pada dataset tersebut adalah 4.

:::tip
`numeric_only=True` artinya hanya menghitung data berupa numerik, jika data non numerik maka menimbulkan error.
:::

---

## Apa Itu Mean?

Mean adalah salah satu cara untuk mencari nilai rata-rata.

Misalnya terdapat data:

```text
2
4
6
```

Rata-ratanya:

```text
(2 + 4 + 6) / 3
```

hasilnya:

```text
4
```

Dalam Pandas, kita dapat menghitungnya menggunakan:

```python
pd.Series([2, 4, 6]).mean()
```

Hasil:

```text
4.0
```

---

## Menghitung Total dengan `.sum()`

Selain rata-rata, kita juga dapat menghitung total menggunakan:

```python
car_sales.sum()
```

Method `.sum()` digunakan untuk menjumlahkan nilai.

Misalnya kita memiliki:

```text
Odometer (KM)
100000
120000
80000
```

Kita dapat menghitung totalnya:

```python
car_sales["Odometer (KM)"].sum()
```

Jika datanya seperti contoh tersebut, hasilnya:

```text
300000
```

---

## `.sum()` pada Kolom Tertentu

Kita dapat menggunakan `.sum()` pada kolom tertentu.

Contoh:

```python
car_sales["Odometer (KM)"].sum()
```

Artinya:

```text
Ambil kolom Odometer (KM)
        ↓
Jumlahkan seluruh nilainya
```

Hal ini berguna ketika kita ingin mendapatkan total dari sebuah variabel numerik.

---

## Fungsi `len()`

Selain method Pandas, kita juga dapat menggunakan fungsi bawaan Python:

```python
len(car_sales)
```

`len()` digunakan untuk mengetahui jumlah item atau panjang sebuah object.

Jika digunakan pada DataFrame, hasilnya menunjukkan **jumlah baris**.

Misalnya:

```python
len(car_sales)
```

menghasilkan:

```text
10
```

berarti DataFrame tersebut memiliki 10 baris.

---

## `len()` vs `.index`

Ada beberapa cara untuk mengetahui jumlah data.

Salah satunya:

```python
len(car_sales)
```

Jika DataFrame memiliki 10 baris:

```text
10
```

Kita juga dapat melihat index:

```python
car_sales.index
```

yang mungkin menghasilkan:

```text
RangeIndex(start=0, stop=10, step=1)
```

Untuk pemula, cara paling sederhana ketika ingin mengetahui jumlah baris adalah:

```python
len(car_sales)
```

---

## Kombinasi Pemeriksaan Data

Ketika pertama kali mendapatkan dataset, kita dapat menggunakan beberapa perintah berikut:

```python
car_sales.dtypes
```

untuk melihat tipe data.

```python
car_sales.columns
```

untuk melihat nama kolom.

```python
car_sales.index
```

untuk melihat index.

```python
car_sales.info()
```

untuk melihat informasi umum.

```python
car_sales.describe()
```

untuk melihat statistik deskriptif.

```python
len(car_sales)
```

untuk mengetahui jumlah baris.

---

## Contoh Pemeriksaan Awal Dataset

Misalnya kita memiliki:

```python
import pandas as pd

car_sales = pd.read_csv("car-sales.csv")
```

Kita dapat mulai memahami dataset dengan:

```python
car_sales.dtypes
```

Kemudian:

```python
car_sales.columns
```

Kemudian:

```python
car_sales.info()
```

Kemudian:

```python
car_sales.describe()
```

Dan:

```python
len(car_sales)
```

Dengan beberapa perintah sederhana tersebut, kita sudah dapat memperoleh gambaran awal mengenai dataset.

---

## Workflow Mendeskripsikan Data

Ketika mendapatkan dataset baru, kita dapat menggunakan alur sederhana:

```text
Dataset
   ↓
Melihat struktur
   ↓
Melihat nama kolom
   ↓
Melihat tipe data
   ↓
Melihat jumlah data
   ↓
Melihat data kosong
   ↓
Melihat statistik
   ↓
Memahami dataset
```

Contoh implementasinya:

```python
car_sales.dtypes
car_sales.columns
car_sales.info()
car_sales.describe()
len(car_sales)
```

Ini merupakan salah satu kebiasaan penting dalam Data Science.

---

## Mengapa Tidak Langsung Membuat Model?

Bayangkan kita mendapatkan dataset dan langsung melakukan:

```text
Dataset
   ↓
Machine Learning
   ↓
Model
```

Tanpa memahami datanya terlebih dahulu.

Kita mungkin tidak mengetahui:

```text
Ada data kosong?
Tipe data benar?
Ada kolom yang tidak diperlukan?
Data numerik atau kategorikal?
Berapa jumlah data?
Apakah distribusi data masuk akal?
```

Hal tersebut dapat menyebabkan masalah ketika model Machine Learning dibuat.

Karena itu, proses memahami data harus dilakukan sebelum modelling.

---

## Hubungan dengan Machine Learning

Mendeskripsikan data merupakan bagian dari workflow Machine Learning.

Secara sederhana:

```text
Problem Definition
       ↓
Data Collection
       ↓
Data Understanding
       ↓
Data Exploration
       ↓
Data Cleaning
       ↓
Preprocessing
       ↓
Modelling
       ↓
Evaluation
```

Pandas banyak membantu pada tahap:

```text
Data Understanding
       ↓
Data Exploration
       ↓
Data Cleaning
       ↓
Data Preparation
```

Jadi, kemampuan menggunakan `.info()`, `.describe()`, `.dtypes`, dan berbagai fitur lainnya merupakan fondasi sebelum masuk ke tahap Machine Learning yang lebih kompleks.

---

## Ringkasan Attribute dan Method

Untuk mengingatnya:

```text
ATTRIBUTE
│
├── .dtypes
├── .columns
└── .index
```

Digunakan untuk melihat informasi atau properti DataFrame.

Sedangkan:

```text
METHOD
│
├── .describe()
├── .info()
├── .mean()
└── .sum()
```

Digunakan untuk menjalankan operasi.

Dan:

```text
PYTHON FUNCTION
│
└── len()
```

adalah fungsi bawaan Python yang dapat digunakan untuk mengetahui jumlah baris DataFrame.

---

## Ringkasan Perintah

| Perintah | Kegunaan |
|---|---|
| `car_sales.dtypes` | Melihat tipe data setiap kolom |
| `car_sales.columns` | Melihat nama kolom |
| `car_sales.index` | Melihat informasi index |
| `car_sales.describe()` | Melihat statistik deskriptif |
| `car_sales.info()` | Melihat informasi umum DataFrame |
| `car_sales.mean()` | Menghitung rata-rata |
| `car_sales["Doors"].mean()` | Menghitung rata-rata kolom tertentu |
| `car_sales.sum()` | Menjumlahkan data |
| `car_sales["Odometer (KM)"].sum()` | Menjumlahkan kolom tertentu |
| `len(car_sales)` | Menghitung jumlah baris |

---

## Checklist Pemula

Setelah mempelajari materi ini, pastikan sudah memahami:

- Apa yang dimaksud dengan attribute?
- Apa yang dimaksud dengan method?
- Mengapa attribute tidak menggunakan `()`?
- Mengapa method menggunakan `()`?
- Apa fungsi `.dtypes`?
- Apa fungsi `.columns`?
- Apa fungsi `.index`?
- Apa fungsi `.describe()`?
- Apa fungsi `.info()`?
- Apa fungsi `.mean()`?
- Apa fungsi `.sum()`?
- Apa fungsi `len()`?
- Mengapa kita perlu memahami dataset sebelum membuat model?

Tidak perlu menghafalkan seluruh output statistik `.describe()` pada tahap ini.

Yang lebih penting adalah memahami **fungsi setiap perintah dan kapan menggunakannya**.

---

## Kesimpulan

Sebelum melakukan analisis atau membuat model Machine Learning, kita perlu memahami dataset terlebih dahulu.

Pandas menyediakan berbagai cara untuk melakukan pemeriksaan awal.

Attribute:

```python
car_sales.dtypes
car_sales.columns
car_sales.index
```

digunakan untuk melihat informasi yang dimiliki DataFrame.

Sedangkan method:

```python
car_sales.describe()
car_sales.info()
car_sales.mean()
car_sales.sum()
```

digunakan untuk menjalankan operasi tertentu.

Kita juga dapat menggunakan fungsi Python:

```python
len(car_sales)
```

untuk mengetahui jumlah baris.

Secara sederhana:

```text
DataFrame
    ↓
Deskripsikan Data
    ↓
Pahami Struktur
    ↓
Pahami Tipe Data
    ↓
Periksa Data Kosong
    ↓
Pahami Statistik
    ↓
Siap untuk Analisis & Preprocessing
```

Kemampuan mendeskripsikan data merupakan langkah penting sebelum kita melakukan **data cleaning, data analysis, dan preprocessing untuk Machine Learning**.
