---
slug: cara-kerja-pandas
title: Cara Kerja Pandas dalam Python
authors: topekox
tags: [manchine learning, data mining, ai, data science]
---

Pandas adalah library Python yang digunakan untuk mengolah, menganalisis, membersihkan, dan memanipulasi data. Pandas sangat populer dalam Data Science, Machine Learning, analisis data, dan pengolahan dataset.

Dokumen ini menjelaskan cara kerja Pandas dari konsep dasar sampai alur pengolahan data yang umum digunakan.

<!-- truncate -->

## 1. Apa Itu Pandas?

Pandas adalah library Python yang menyediakan struktur data dan fungsi untuk bekerja dengan data berbentuk tabel.

Jika data diibaratkan seperti tabel pada Microsoft Excel, maka Pandas menyediakan cara untuk melakukan operasi tersebut menggunakan kode
Python.

Contoh data:

```text
  Nama      Umur Kota
  ------- ------ ----------
  Andi        21 Palu
  Budi        22 Makassar
  Citra       20 Palu
```

Dengan Pandas, kita dapat:

-   membaca dataset
-   menampilkan data
-   memilih kolom dan baris
-   melakukan filtering
-   membersihkan data
-   menangani data kosong
-   mengubah tipe data
-   melakukan pengelompokan data
-   menghitung statistik
-   menggabungkan beberapa dataset
-   menyimpan hasil pengolahan data

## 2. Instalasi Pandas

Pandas dapat diinstal menggunakan `pip`.

``` bash
pip install pandas
```

Jika menggunakan Jupyter Notebook:

``` python
!pip install pandas
```

Setelah terinstal, Pandas dapat digunakan dengan:

``` python
import pandas as pd
```

`pd` merupakan alias yang umum digunakan untuk Pandas.

## 3. Konsep Utama Pandas

Pandas memiliki dua struktur data utama:

1.  Series
2.  DataFrame

Keduanya menjadi dasar hampir semua operasi pengolahan data menggunakan Pandas.

## 4. Series

Series adalah struktur data satu dimensi.

Contoh:

``` python
import pandas as pd

data = pd.Series([10, 20, 30, 40])

print(data)
```

Hasilnya kira-kira:

``` text
0    10
1    20
2    30
3    40
dtype: int64
```

Series terdiri dari:

-   index
-   value
-   data type

Index secara default dimulai dari `0`.

Kita juga dapat membuat Series dengan index sendiri:

``` python
data = pd.Series(
    [90, 85, 88],
    index=["Andi", "Budi", "Citra"]
)

print(data)
```

## 5. DataFrame

DataFrame adalah struktur data dua dimensi berbentuk tabel.

Contoh:

``` python
data = {
    "Nama": ["Andi", "Budi", "Citra"],
    "Umur": [21, 22, 20],
    "Kota": ["Palu", "Makassar", "Palu"]
}

df = pd.DataFrame(data)

print(df)
```

Hasil:

``` text
    Nama  Umur      Kota
0   Andi    21      Palu
1   Budi    22  Makassar
2  Citra    20      Palu
```

DataFrame memiliki:

-   baris
-   kolom
-   index
-   nilai
-   tipe data setiap kolom

## 6. Cara Kerja DataFrame

Secara sederhana, DataFrame dapat dibayangkan sebagai tabel yang memiliki koordinat.

``` text
             Kolom
          Nama   Umur   Kota
Index 0   Andi    21    Palu
Index 1   Budi    22    Makassar
Index 2   Citra   20    Palu
```

Ketika DataFrame dibuat, Pandas menyimpan struktur data tersebut sehingga kita dapat mengakses bagian tertentu berdasarkan:

-   nama kolom
-   index
-   kondisi tertentu
-   posisi baris dan kolom

```
DataFrame
│
├── Index
│   ├── 0
│   ├── 1
│   └── 2
│
├── Column
│   ├── Nama
│   ├── Umur
│   └── IPK
│
└── Data
    ├── Andi
    ├── Budi
    └── Citra
```

Contohnya:

``` python
df["Nama"]
```

akan mengambil satu kolom.

Sedangkan:

``` python
df[["Nama", "Kota"]]
```

akan mengambil beberapa kolom.

## 7. Membuat DataFrame

DataFrame dapat dibuat dari berbagai sumber.

Contoh dari dictionary:

``` python
df = pd.DataFrame({
    "Nama": ["Andi", "Budi", "Citra"],
    "Nilai": [80, 90, 85]
})
```

Contoh dari list:

``` python
df = pd.DataFrame([
    ["Andi", 80],
    ["Budi", 90],
    ["Citra", 85]
], columns=["Nama", "Nilai"])
```

## 8. Membaca Dataset

Salah satu fungsi Pandas yang paling sering digunakan adalah fungsi untuk membaca file.

### Membaca CSV

``` python
df = pd.read_csv("data.csv")
```

Setelah file dibaca, data akan disimpan dalam DataFrame.

Alurnya:

``` text
File CSV
   ↓
pd.read_csv()
   ↓
DataFrame
   ↓
Analisis dan manipulasi
```

### Membaca Excel

``` python
df = pd.read_excel("data.xlsx")
```

### Membaca JSON

``` python
df = pd.read_json("data.json")
```

## 9. Melihat Data

Setelah dataset dibaca, langkah pertama biasanya adalah memeriksa isinya.

Menampilkan lima baris pertama:

``` python
df.head()
```

Menampilkan sepuluh baris pertama:

``` python
df.head(10)
```

Menampilkan lima baris terakhir:

``` python
df.tail()
```

Melihat ukuran dataset:

``` python
df.shape
```

Contohnya:

``` text
(1000, 10)
```

Artinya terdapat:

-   1000 baris
-   10 kolom

## 10. Melihat Informasi Dataset

Gunakan:

``` python
df.info()
```

Fungsi ini memberikan informasi seperti:

-   jumlah baris
-   nama kolom
-   jumlah data yang tidak kosong
-   tipe data
-   penggunaan memori

Contoh:

``` text
RangeIndex: 1000 entries
Data columns:
Nama       1000 non-null object
Umur       995 non-null int64
Nilai      1000 non-null float64
```

Informasi ini sangat penting pada tahap awal analisis data.

## 11. Melihat Statistik Dataset

Gunakan:

``` python
df.describe()
```

Untuk kolom numerik, Pandas dapat menampilkan statistik seperti:

-   count
-   mean
-   standard deviation
-   minimum
-   quartile
-   maximum

Contoh:

``` python
print(df.describe())
```

## 12. Melihat Nama Kolom

Gunakan:

``` python
df.columns
```

Contoh hasil:

``` text
Index(['Nama', 'Umur', 'Kota'], dtype='object')
```

Kita juga dapat mengubah nama kolom:

``` python
df.columns = ["nama", "umur", "kota"]
```

Atau menggunakan:

``` python
df = df.rename(columns={
    "Nama": "nama",
    "Umur": "umur"
})
```

## 13. Mengakses Kolom

Untuk satu kolom:

``` python
df["Nama"]
```

Untuk beberapa kolom:

``` python
df[["Nama", "Umur"]]
```

Konsepnya:

``` text
DataFrame
   │
   ├── Nama
   ├── Umur
   └── Kota
```

Ketika kita memilih `df["Nama"]`, Pandas mengambil kolom tersebut dan mengembalikannya sebagai Series.

## 14. Mengakses Baris dengan loc

`loc` digunakan untuk mengakses data berdasarkan label index.

Contoh:

``` python
df.loc[0]
```

Mengambil beberapa baris:

``` python
df.loc[0:2]
```

Mengambil baris dan kolom tertentu:

``` python
df.loc[0:2, ["Nama", "Kota"]]
```

## 15. Mengakses Data dengan iloc

`iloc` digunakan untuk mengakses data berdasarkan posisi numerik.

Contoh:

``` python
df.iloc[0]
```

Mengambil tiga baris pertama:

``` python
df.iloc[0:3]
```

Mengambil baris pertama dan kolom pertama:

``` python
df.iloc[0, 0]
```

Perbedaan sederhana:

``` text
loc  → berdasarkan label
iloc → berdasarkan posisi
```

## 16. Filtering Data

Filtering digunakan untuk mengambil data berdasarkan kondisi.

Contoh:

``` python
df[df["Umur"] > 20]
```

Artinya:

> Ambil baris yang memiliki umur lebih dari 20.

Contoh kondisi lain:

``` python
df[df["Kota"] == "Palu"]
```

Kondisi gabungan:

``` python
df[
    (df["Umur"] > 20) &
    (df["Kota"] == "Palu")
]
```

Operator yang umum digunakan:

  Operator   Fungsi
  ---------- -----------------------
  `>`        lebih besar
  `<`        lebih kecil
  `>=`       lebih besar atau sama
  `<=`       lebih kecil atau sama
  `==`       sama dengan
  `!=`       tidak sama
  `&`        AND
  `|`        OR

## 17. Menambahkan Kolom

Kita dapat membuat kolom baru.

``` python
df["Status"] = "Mahasiswa"
```

Kolom baru berdasarkan perhitungan:

``` python
df["Nilai_Akhir"] = df["Tugas"] + df["Ujian"]
```

Contoh:

``` python
df["Lulus"] = df["Nilai"] >= 60
```

Hasil kolom tersebut akan berisi nilai Boolean:

``` text
True
False
True
```

## 18. Mengubah Nilai Kolom

Contoh:

``` python
df["Kota"] = df["Kota"].str.upper()
```

Semua nama kota akan diubah menjadi huruf besar.

Contoh:

``` text
Palu
Makassar
Palu
```

menjadi:

``` text
PALU
MAKASSAR
PALU
```

## 19. Menangani Missing Value

Missing value adalah data yang kosong atau tidak tersedia.

Untuk melihat jumlah data kosong:

``` python
df.isnull().sum()
```

Contoh:

``` text
Nama     0
Umur     5
Nilai    2
```

Artinya terdapat:

-   5 nilai kosong pada kolom Umur
-   2 nilai kosong pada kolom Nilai

## 20. Menghapus Missing Value

Untuk menghapus baris yang memiliki nilai kosong:

``` python
df = df.dropna()
```

Namun, menghapus data tidak selalu merupakan pilihan terbaik.

Tergantung konteks, data kosong dapat diisi menggunakan nilai tertentu.

## 21. Mengisi Missing Value

Contoh mengisi nilai kosong dengan `0`:

``` python
df["Nilai"] = df["Nilai"].fillna(0)
```

Mengisi dengan rata-rata:

``` python
df["Nilai"] = df["Nilai"].fillna(
    df["Nilai"].mean()
)
```

Pendekatan pengisian missing value harus disesuaikan dengan karakteristik dataset.

## 22. Menghapus Duplikasi

Untuk memeriksa data duplikat:

``` python
df.duplicated()
```

Menghapus duplikasi:

``` python
df = df.drop_duplicates()
```

Ini sering dilakukan dalam proses data cleaning.

## 23. Mengurutkan Data

Mengurutkan berdasarkan kolom:

``` python
df.sort_values("Nilai")
```

Dari terbesar ke terkecil:

``` python
df.sort_values(
    "Nilai",
    ascending=False
)
```

## 24. GroupBy

`groupby()` digunakan untuk mengelompokkan data berdasarkan kategori tertentu.

Contoh:

``` python
df.groupby("Kota")["Nilai"].mean()
```

Artinya:

> Kelompokkan data berdasarkan kota, kemudian hitung rata-rata nilai setiap kota.

Konsepnya:

``` text
Data
 ↓
GroupBy Kota
 ↓
Palu
Makassar
 ↓
Hitung rata-rata
```

## 25. Agregasi

Pandas menyediakan fungsi agregasi seperti:

``` python
df["Nilai"].mean()
df["Nilai"].sum()
df["Nilai"].min()
df["Nilai"].max()
df["Nilai"].count()
```

Beberapa fungsi penting:

  Fungsi       Kegunaan
  ------------ -----------------
  `mean()`     rata-rata
  `sum()`      jumlah
  `min()`      nilai minimum
  `max()`      nilai maksimum
  `count()`    jumlah data
  `median()`   nilai tengah
  `std()`      standar deviasi

## 26. Menggabungkan Dataset

Dalam proyek nyata, data sering berasal dari beberapa file.

Pandas menyediakan beberapa cara untuk menggabungkannya.

### Concatenate

``` python
df = pd.concat([df1, df2])
```

Digunakan untuk menggabungkan data secara vertikal atau horizontal.

### Merge

``` python
df = pd.merge(
    df1,
    df2,
    on="id"
)
```

`merge()` mirip dengan operasi JOIN pada database.

Jenis merge yang umum:

-   inner
-   left
-   right
-   outer

Contoh:

``` python
pd.merge(
    df1,
    df2,
    on="id",
    how="left"
)
```

## 27. Mengubah Tipe Data

Untuk melihat tipe data:

``` python
df.dtypes
```

Mengubah tipe data:

``` python
df["Umur"] = df["Umur"].astype(int)
```

Mengubah menjadi string:

``` python
df["ID"] = df["ID"].astype(str)
```

Tipe data penting karena operasi yang dilakukan Pandas bergantung pada tipe data tersebut.

## 28. Operasi String

Pandas menyediakan fungsi string melalui `.str`.

Contoh:

``` python
df["Nama"].str.upper()
```

Mengubah menjadi huruf kecil:

``` python
df["Nama"].str.lower()
```

Menghapus spasi:

``` python
df["Nama"].str.strip()
```

Mencari teks:

``` python
df["Nama"].str.contains("Andi")
```

## 29. Operasi Matematika

Kolom numerik dapat digunakan langsung dalam operasi matematika.

Contoh:

``` python
df["Total"] = df["Harga"] * df["Jumlah"]
```

Atau:

``` python
df["Diskon"] = df["Harga"] * 0.10
```

Pandas memungkinkan operasi dilakukan pada satu kolom sekaligus tanpa harus menulis perulangan `for` untuk setiap baris.

## 30. Konsep Vectorization

Salah satu konsep penting dalam Pandas adalah vectorization.

Contoh:

``` python
df["Total"] = df["Harga"] * df["Jumlah"]
```

Operasi tersebut diterapkan pada seluruh nilai dalam kolom.

Secara konseptual:

``` text
Harga      Jumlah
10000   ×     2
20000   ×     3
15000   ×     4

        ↓

Total
20000
60000
60000
```

Pendekatan seperti ini biasanya lebih sederhana dan efisien daripada melakukan operasi baris demi baris menggunakan loop Python.

## 31. Apply

`apply()` dapat digunakan untuk menjalankan fungsi pada data.

Contoh:

``` python
def kategori(nilai):
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    else:
        return "C"

df["Grade"] = df["Nilai"].apply(kategori)
```

`apply()` berguna ketika transformasi yang dibutuhkan tidak dapat dilakukan dengan operasi Pandas sederhana.

## 32. Pivot Table

Pandas juga menyediakan `pivot_table()` untuk membuat ringkasan data.

Contoh:

``` python
pd.pivot_table(
    df,
    values="Nilai",
    index="Kota",
    aggfunc="mean"
)
```

Hasilnya dapat digunakan untuk melihat rata-rata nilai berdasarkan kota.

## 33. Export Data

Setelah data selesai diproses, hasilnya dapat disimpan kembali.

### Menyimpan ke CSV

``` python
df.to_csv("hasil.csv", index=False)
```

### Menyimpan ke Excel

``` python
df.to_excel("hasil.xlsx", index=False)
```

### Menyimpan ke JSON

``` python
df.to_json("hasil.json")
```

## 34. Alur Kerja Pandas

Dalam proyek Data Science, alur penggunaan Pandas biasanya seperti berikut:

``` text
Dataset
   ↓
Membaca Data
   ↓
Mengecek Data
   ↓
Memahami Struktur
   ↓
Membersihkan Data
   ↓
Transformasi Data
   ↓
Filtering
   ↓
Grouping / Aggregation
   ↓
Analisis
   ↓
Visualisasi
   ↓
Dataset Siap Digunakan
   ↓
Machine Learning / Reporting
```

## 35. Pandas dalam Machine Learning

Pandas sering digunakan pada tahap preprocessing sebelum data dimasukkan ke model Machine Learning.

Contoh alur:

``` text
Dataset CSV
     ↓
Pandas
     ↓
Data Cleaning
     ↓
Missing Value
     ↓
Duplicate Data
     ↓
Transformasi
     ↓
Feature Selection
     ↓
Dataset Bersih
     ↓
NumPy / Scikit-learn
     ↓
Machine Learning Model
```

Contoh:

``` python
import pandas as pd

df = pd.read_csv("dataset.csv")

df = df.drop_duplicates()

df["umur"] = df["umur"].fillna(
    df["umur"].mean()
)

df = df.dropna()

X = df[["umur", "pendapatan"]]
y = df["status"]
```

Pada contoh tersebut, Pandas bertugas mempersiapkan data sebelum digunakan oleh algoritma Machine Learning.

## 36. Pandas Bukan Database

Pandas bukan database.

Pandas adalah library untuk manipulasi dan analisis data di dalam program Python.

Perbandingan sederhana:

```
  Teknologi      Fungsi utama
  -------------- ------------------------------
  Pandas         manipulasi dan analisis data
  NumPy          komputasi numerik
  SQL            query database
  MySQL          sistem database
  PostgreSQL     sistem database
  Scikit-learn   Machine Learning
  Matplotlib     visualisasi
  Seaborn        visualisasi statistik

  ---------------------------------------------

   Database
   │
   ├── Menyimpan data secara persisten
   ├── Query data
   ├── Transaction
   └── Multi-user access

   Pandas
   │
   ├── Membaca data
   ├── Membersihkan data
   ├── Memanipulasi data
   ├── Menganalisis data
   └── Menyiapkan data untuk proses berikutnya
```

Pandas dapat bekerja bersama database.

Contoh membaca hasil query SQL:

``` python
df = pd.read_sql(
    "SELECT * FROM mahasiswa",
    connection
)
```

## 37. Cara Pandas Bekerja Secara Konseptual

Ketika kode berikut dijalankan:

``` python
df = pd.read_csv("data.csv")
```

proses sederhananya dapat dipahami sebagai:

``` text
File CSV
   ↓
Pandas membaca file
   ↓
Data diparsing
   ↓
Kolom dan baris dibentuk
   ↓
Tipe data ditentukan
   ↓
DataFrame dibuat
   ↓
DataFrame disimpan dalam variabel df
```

Ketika dilakukan:

``` python
df[df["Umur"] > 20]
```

Pandas secara konseptual:

``` text
DataFrame
   ↓
Ambil kolom Umur
   ↓
Bandingkan setiap nilai dengan 20
   ↓
Buat kondisi True / False
   ↓
Pilih baris yang True
   ↓
Hasil DataFrame baru
```

## 38. Contoh Proyek Sederhana

Misalkan terdapat dataset mahasiswa:

``` python
import pandas as pd

df = pd.DataFrame({
    "Nama": ["Andi", "Budi", "Citra", "Dedi"],
    "Umur": [21, 22, 20, 23],
    "Nilai": [85, 70, 90, 60],
    "Kota": ["Palu", "Palu", "Makassar", "Palu"]
})
```

Melihat data:

``` python
print(df)
```

Mengambil mahasiswa dengan nilai minimal 70:

``` python
lulus = df[df["Nilai"] >= 70]

print(lulus)
```

Menghitung rata-rata nilai:

``` python
rata_rata = df["Nilai"].mean()

print(rata_rata)
```

Mengelompokkan berdasarkan kota:

``` python
hasil = df.groupby("Kota")["Nilai"].mean()

print(hasil)
```

Menyimpan hasil:

``` python
hasil.to_csv("rata_rata_kota.csv")
```

## 39. Pola Belajar Pandas

Untuk mempelajari Pandas secara bertahap, gunakan urutan berikut:

``` text
1. Python dasar
      ↓
2. List, Dictionary, Tuple
      ↓
3. NumPy dasar
      ↓
4. Series
      ↓
5. DataFrame
      ↓
6. Membaca CSV / Excel
      ↓
7. Seleksi data
      ↓
8. Filtering
      ↓
9. Missing Value
      ↓
10. Data Cleaning
      ↓
11. GroupBy
      ↓
12. Aggregation
      ↓
13. Merge / Concat
      ↓
14. Transformasi Data
      ↓
15. Export Data
      ↓
16. Pandas untuk Machine Learning
```

## 40. Fungsi Pandas yang Wajib Dikuasai

Berikut fungsi yang sebaiknya dikuasai terlebih dahulu:

``` python
pd.read_csv()
pd.read_excel()
pd.DataFrame()
pd.Series()

df.head()
df.tail()
df.info()
df.describe()
df.shape
df.columns
df.dtypes

df["kolom"]
df[["kolom1", "kolom2"]]

df.loc[]
df.iloc[]

df.isnull()
df.dropna()
df.fillna()

df.drop_duplicates()
df.sort_values()

df.groupby()
df.mean()
df.sum()
df.min()
df.max()
df.count()

pd.concat()
pd.merge()

df.astype()
df.apply()

df.to_csv()
df.to_excel()
df.to_json()
```

## 41. Cara Berpikir Saat Menggunakan Pandas

Daripada menghafalkan ratusan fungsi, pahami pola berikut:

```text
1. LOAD
   ↓
2. INSPECT
   ↓
3. CLEAN
   ↓
4. SELECT
   ↓
5. FILTER
   ↓
6. TRANSFORM
   ↓
7. GROUP
   ↓
8. ANALYZE
   ↓
9. EXPORT
```

Contoh kode sederhananya:

```python
import pandas as pd

# 1. Load
df = pd.read_csv("data.csv")

# 2. Inspect
print(df.head())
print(df.info())

# 3. Clean
df = df.dropna()

# 4. Select
df = df[["Nama", "Umur", "IPK"]]

# 5. Filter
df = df[df["IPK"] >= 3.0]

# 6. Sort
df = df.sort_values("IPK", ascending=False)

# 7. Analyze
print(df["IPK"].mean())

# 8. Export
df.to_csv("hasil.csv", index=False)
```

**Inti cara kerja Pandas**: 

data masuk → menjadi DataFrame/Series → kita memilih, memfilter, membersihkan, mengubah, mengelompokkan, dan menganalisis data → menghasilkan dataset yang siap digunakan.

**Kalau tujuan Anda adalah belajar Pandas untuk Machine Learning, urutan belajarnya paling bagus adalah:**

DataFrame → Series → indexing → filtering → cleaning → sorting → groupby → merge → apply/map → EDA → feature engineering → integrasi dengan NumPy & Scikit-learn.

## 42. Kesimpulan

Pandas bekerja sebagai lapisan pengolahan data di dalam Python.

Konsep paling penting yang perlu dipahami adalah:

``` text
Data
 ↓
DataFrame / Series
 ↓
Seleksi
 ↓
Filtering
 ↓
Cleaning
 ↓
Transformation
 ↓
Aggregation
 ↓
Analysis
 ↓
Export / Machine Learning
```

Jika disederhanakan, Pandas memungkinkan kita mengubah data mentah menjadi data yang terstruktur dan siap dianalisis.

Contoh paling dasar:

``` python
import pandas as pd

df = pd.read_csv("dataset.csv")

print(df.head())

df = df.drop_duplicates()

df = df.dropna()

df["total"] = df["harga"] * df["jumlah"]

hasil = df.groupby("kategori")["total"].sum()

print(hasil)

hasil.to_csv("hasil.csv")
```

Kode tersebut sudah menggambarkan pola kerja Pandas yang sangat umum:

``` text
Read
 ↓
Inspect
 ↓
Clean
 ↓
Transform
 ↓
Group
 ↓
Analyze
 ↓
Export
```

Pola ini menjadi dasar yang sangat penting sebelum mempelajari tahap Data Science dan Machine Learning yang lebih lanjut.
