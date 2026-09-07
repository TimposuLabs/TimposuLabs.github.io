---
sidebar_position: 6
title: "Manipulasi String & Missing Data"
---

Ketika bekerja dengan dataset, data yang kita dapatkan tidak selalu berada dalam kondisi yang ideal.

Kita dapat menemukan berbagai masalah seperti:

```text
Format teks tidak konsisten
Data kosong
Data dengan nilai NaN
Data yang perlu diubah
```

Contohnya, sebuah kolom `Make` mungkin memiliki data:

```text
Toyota
TOYOTA
toyota
Toyota
```

Walaupun secara makna semuanya menunjukkan merek yang sama, komputer dapat menganggapnya sebagai nilai yang berbeda karena perbedaan huruf besar dan kecil.

Kita juga dapat menemukan data yang kosong:

```text
Odometer
150000
120000
NaN
90000
```

Kondisi seperti ini perlu ditangani sebelum data digunakan untuk analisis atau Machine Learning.

Pada materi ini kita akan mempelajari dua konsep utama:

1. Manipulasi string pada kolom DataFrame.
2. Penanganan missing data atau data yang hilang.

---

## Manipulasi String pada Pandas

Pandas menyediakan fitur khusus untuk bekerja dengan data bertipe teks atau string.

Fitur tersebut dapat diakses melalui:

```python
.str
```

Dengan `.str`, kita dapat menggunakan berbagai operasi string pada sebuah Series.

Contohnya:

```python
car_sales["Make"].str.lower()
```

Kode tersebut digunakan untuk mengubah teks pada kolom `Make` menjadi huruf kecil.

---

## Mengubah String Menjadi Huruf Kecil

Misalnya kita memiliki data:

```text
Make
Toyota
HONDA
BMW
TOYOTA
```

Kita dapat mengubah seluruh nilai menjadi huruf kecil menggunakan:

```python
car_sales["Make"].str.lower()
```

Hasilnya secara konseptual:

```text
Toyota → toyota
HONDA  → honda
BMW    → bmw
TOYOTA → toyota
```

Hal ini dapat membantu membuat format data menjadi lebih konsisten.

---

## Menggunakan `.str.lower()`

Contoh:

```python
car_sales["Make"].str.lower()
```

`.str` memberitahu Pandas bahwa kita ingin melakukan operasi terhadap data string.

Sedangkan:

```text
lower()
```

digunakan untuk mengubah huruf menjadi lowercase.

Secara sederhana:

```text
Series
  ↓
.str
  ↓
lower()
  ↓
String menjadi huruf kecil
```

---

## Mengapa Data Teks Perlu Dibersihkan?

Data dari dunia nyata sering memiliki format yang tidak konsisten.

Misalnya:

```text
Toyota
toyota
TOYOTA
ToYoTa
```

Secara manusia, kita memahami bahwa semuanya adalah:

```text
Toyota
```

Tetapi komputer dapat memperlakukannya sebagai nilai yang berbeda.

Ketidakkonsistenan seperti ini dapat menyebabkan masalah ketika:

- melakukan filtering
- menghitung kategori
- melakukan grouping
- melakukan analisis
- melakukan preprocessing Machine Learning

Karena itu, standardisasi data teks merupakan bagian dari proses **data cleaning**.

---

## Pentingnya Reassignment

Salah satu konsep penting ketika bekerja dengan Pandas adalah **reassignment** atau penugasan ulang.

Misalnya kita menjalankan:

```python
car_sales["Make"].str.lower()
```

Operasi tersebut menghasilkan Series baru.

Namun, perubahan tersebut tidak otomatis berarti kolom asli pada DataFrame telah berubah.

Jika kita ingin menyimpan hasilnya ke kolom tersebut, lakukan reassignment:

```python
car_sales["Make"] = car_sales["Make"].str.lower()
```

Perhatikan bagian:

```python
car_sales["Make"] =
```

Hasil dari operasi `.str.lower()` diberikan kembali ke kolom `Make`.

---

## Memahami Reassignment

Secara sederhana:

```text
Data asli
   ↓
.str.lower()
   ↓
Hasil baru
   ↓
Ditugaskan kembali
   ↓
DataFrame berubah
```

Contohnya:

```python
car_sales["Make"] = car_sales["Make"].str.lower()
```

Sebelum:

```text
Toyota
Honda
BMW
```

Setelah:

```text
toyota
honda
bmw
```

---

## Operasi Pandas Tidak Selalu Mengubah Data Asli

Ini merupakan konsep yang sangat penting.

Ketika kita melakukan:

```python
car_sales["Make"].str.lower()
```

jangan langsung berasumsi bahwa DataFrame sudah berubah.

Untuk menyimpan hasilnya:

```python
car_sales["Make"] = car_sales["Make"].str.lower()
```

Konsep yang sama akan sering muncul ketika kita melakukan berbagai transformasi data lainnya.

Misalnya:

```python
car_sales["Price"] = car_sales["Price"] * 1000
```

atau:

```python
car_sales["Make"] = car_sales["Make"].str.lower()
```

Jadi, biasakan memperhatikan apakah hasil operasi perlu disimpan kembali.

---

## Missing Data

Selain masalah pada format data, dataset juga dapat memiliki **missing data** atau data yang hilang.

Contohnya:

| Make | Odometer |
|---|---:|
| Toyota | 150000 |
| Honda | 120000 |
| BMW | NaN |
| Nissan | 90000 |

Pada baris BMW, nilai `Odometer` tidak tersedia.

Pandas biasanya merepresentasikan nilai yang hilang sebagai:

```text
NaN
```

---

## Apa Itu NaN?

`NaN` merupakan singkatan dari:

**Not a Number**

Dalam Pandas, `NaN` sering digunakan untuk merepresentasikan nilai yang tidak tersedia atau missing value.

Contohnya:

```text
150000
120000
NaN
90000
```

Nilai `NaN` bukan berarti angka nol.

Perbedaannya:

```text
0
↓
Nilainya memang nol

NaN
↓
Nilainya tidak tersedia / hilang
```

Ini merupakan perbedaan yang sangat penting.

---

## Penyebab Missing Data

Missing data dapat terjadi karena berbagai alasan.

Misalnya:

```text
Pengguna tidak mengisi data
Sensor gagal membaca nilai
Kesalahan saat input
Data tidak tersedia
Proses penggabungan dataset
Kesalahan ketika mengumpulkan data
```

Dalam dataset nyata, missing data merupakan sesuatu yang cukup umum.

Karena itu, kemampuan menangani missing data merupakan bagian penting dari Data Science dan Machine Learning.

---

## Mengapa Missing Data Harus Ditangani?

Bayangkan kita memiliki data:

```text
Odometer
100000
120000
NaN
90000
```

Jika kita ingin membuat model Machine Learning, keberadaan `NaN` dapat menyebabkan beberapa algoritma tidak dapat memproses data tersebut secara langsung.

Karena itu, kita perlu menentukan apa yang harus dilakukan terhadap missing value.

Beberapa pilihan:

```text
Missing Data
     │
     ├── Diisi dengan nilai tertentu
     │
     └── Baris/kolom dihapus
```

Keputusan tersebut harus disesuaikan dengan karakteristik dataset.

---

## Mengisi Missing Data dengan `.fillna()`

Salah satu cara menangani missing data adalah menggunakan:

```python
.fillna()
```

Method ini digunakan untuk mengganti nilai `NaN` dengan nilai tertentu.

Contohnya:

```python
car_sales_missing["Odometer"].fillna(0)
```

Artinya:

```text
Jika terdapat NaN
↓
Ganti dengan 0
```

Namun, menggunakan `0` tidak selalu merupakan pilihan yang tepat.

Kita perlu mempertimbangkan makna dari data.

---

## Mengisi Missing Data dengan Mean

Salah satu pendekatan yang umum untuk data numerik adalah mengganti missing value menggunakan **mean atau rata-rata**.

Misalnya:

```text
Odometer
100000
120000
80000
```

Mean:

```text
100000
```

Jika terdapat:

```text
NaN
```

kita dapat menggantinya dengan nilai mean.

Contohnya:

```python
car_sales_missing["Odometer"].fillna(
    car_sales_missing["Odometer"].mean()
)
```

---

## Mengapa Menggunakan Mean?

Misalnya kita memiliki:

```text
100000
120000
80000
NaN
```

Rata-ratanya:

```text
(100000 + 120000 + 80000) / 3
```

hasilnya:

```text
100000
```

Sehingga:

```text
100000
120000
80000
NaN
```

menjadi:

```text
100000
120000
80000
100000
```

Dengan demikian, kita tetap mempertahankan jumlah baris dataset.

Namun, mean bukan selalu pilihan terbaik.

Jika data memiliki outlier yang besar, median mungkin lebih sesuai.

---

## Reassignment pada `.fillna()`

Sama seperti `.str.lower()`, `.fillna()` dapat menghasilkan data yang perlu disimpan kembali.

Contohnya:

```python
car_sales_missing["Odometer"] = car_sales_missing["Odometer"].fillna(
    car_sales_missing["Odometer"].mean()
)
```

Alurnya:

```text
Kolom Odometer
      ↓
Cari NaN
      ↓
Hitung Mean
      ↓
Ganti NaN dengan Mean
      ↓
Assign kembali ke Odometer
```

Pendekatan ini mudah dibaca dan jelas bagi pemula.

---

## Parameter `inplace`

Pandas juga menyediakan parameter:

```python
inplace=True
```

Parameter ini digunakan pada beberapa operasi Pandas untuk meminta operasi dilakukan langsung pada object yang bersangkutan.

Contohnya:

```python
car_sales_missing["Odometer"].fillna(
    car_sales_missing["Odometer"].mean(),
    inplace=True
)
```

Secara konsep:

```text
inplace=True
      ↓
Lakukan perubahan pada object
```

---

## `inplace=True` vs Reassignment

Ada dua pola yang perlu dipahami.

### Menggunakan Reassignment

```python
car_sales_missing["Odometer"] = car_sales_missing["Odometer"].fillna(
    car_sales_missing["Odometer"].mean()
)
```

Artinya hasil operasi disimpan kembali ke kolom.

### Menggunakan `inplace=True`

```python
car_sales_missing["Odometer"].fillna(
    car_sales_missing["Odometer"].mean(),
    inplace=True
)
```

Secara konsep meminta Pandas melakukan perubahan secara langsung pada object tersebut.

---

## Mana yang Sebaiknya Digunakan?

Untuk pembelajaran, **reassignment sering lebih mudah dipahami** karena alurnya eksplisit:

```text
Data
 ↓
Transformasi
 ↓
Simpan hasil
```

Contohnya:

```python
car_sales_missing["Odometer"] = car_sales_missing["Odometer"].fillna(
    car_sales_missing["Odometer"].mean()
)
```

Selain itu, penggunaan `inplace=True` pada operasi tertentu dapat memiliki perilaku yang perlu diperhatikan pada versi Pandas modern, terutama ketika operasi dilakukan melalui chained indexing.

Karena itu, sebagai kebiasaan umum:

```text
Gunakan assignment eksplisit
```

ketika ingin membuat kode yang lebih jelas dan mudah dipelihara.

---

## Menghapus Missing Data dengan `.dropna()`

Tidak semua missing value harus diisi.

Dalam kondisi tertentu, kita justru ingin menghapus baris yang memiliki missing value.

Pandas menyediakan:

```python
.dropna()
```

Contohnya:

```python
car_sales_missing.dropna()
```

Method tersebut akan menghasilkan DataFrame yang tidak memiliki baris dengan missing value berdasarkan aturan default.

---

## Contoh `.dropna()`

Misalnya:

| Make | Odometer |
|---|---:|
| Toyota | 150000 |
| Honda | NaN |
| BMW | 80000 |
| Nissan | NaN |

Jika menggunakan:

```python
car_sales_missing.dropna()
```

maka baris yang memiliki `NaN` akan dihilangkan.

Hasilnya:

| Make | Odometer |
|---|---:|
| Toyota | 150000 |
| BMW | 80000 |

---

## Reassignment dengan `.dropna()`

Jika kita ingin menyimpan hasilnya ke variable baru:

```python
car_sales_missing_dropped = car_sales_missing.dropna()
```

Sekarang:

```text
car_sales_missing
```

adalah data asli.

Sedangkan:

```text
car_sales_missing_dropped
```

berisi data setelah baris dengan missing value dihapus.

Ini merupakan pendekatan yang baik ketika kita ingin mempertahankan dataset asli.

---

## Mengapa Tidak Selalu Menghapus Missing Data?

Menghapus data memang sederhana, tetapi tidak selalu menjadi solusi terbaik.

Misalnya dataset hanya memiliki:

```text
100 baris
```

dan:

```text
40 baris
```

memiliki missing value.

Jika kita menggunakan:

```python
dropna()
```

kita mungkin kehilangan sebagian besar dataset.

Akibatnya, jumlah data untuk Machine Learning menjadi jauh lebih sedikit.

Karena itu, kita perlu mempertimbangkan:

```text
Berapa banyak missing value?
Di kolom mana?
Mengapa data hilang?
Seberapa penting kolom tersebut?
Berapa banyak data yang akan hilang jika dihapus?
```

---

## Fillna vs Dropna

Dua pendekatan utama:

| Method | Fungsi |
|---|---|
| `fillna()` | Mengisi missing value |
| `dropna()` | Menghapus data yang memiliki missing value |

Secara sederhana:

```text
NaN
 │
 ├── fillna()
 │      ↓
 │   Diganti
 │
 └── dropna()
        ↓
      Dihapus
```

Pemilihan metode bergantung pada masalah dan karakteristik dataset.

---

## Contoh Penggunaan `fillna()`

Misalnya:

```python
car_sales_missing["Odometer"] = car_sales_missing["Odometer"].fillna(
    car_sales_missing["Odometer"].mean()
)
```

Artinya:

```text
Cari nilai NaN
      ↓
Hitung mean Odometer
      ↓
Ganti NaN dengan mean
      ↓
Simpan kembali
```

---

## Contoh Penggunaan `dropna()`

Jika ingin menghapus baris yang memiliki missing value:

```python
car_sales_missing_dropped = car_sales_missing.dropna()
```

Data hasilnya disimpan ke:

```text
car_sales_missing_dropped
```

Dataset asli:

```text
car_sales_missing
```

tetap tersedia.

---

## Mengekspor Data Hasil Cleaning

Setelah melakukan data cleaning, kita mungkin ingin menyimpan hasilnya ke dalam file CSV.

Contohnya:

```python
car_sales_missing_dropped.to_csv(
    "car_sales_missing_dropped.csv"
)
```

Pandas akan menghasilkan file:

```text
car_sales_missing_dropped.csv
```

yang berisi data setelah proses cleaning.

---

## Memperhatikan Index Saat Export

Ketika mengekspor DataFrame ke CSV, kita sering kali tidak ingin index DataFrame ikut menjadi kolom baru.

Karena itu, biasanya lebih baik menggunakan:

```python
car_sales_missing_dropped.to_csv(
    "car_sales_missing_dropped.csv",
    index=False
)
```

Dengan:

```text
index=False
```

index DataFrame tidak ikut ditulis sebagai kolom pada file CSV.

---

## Workflow Data Cleaning

Secara sederhana, workflow pada materi ini dapat digambarkan:

```text
Dataset
   ↓
Periksa Data
   ↓
Temukan Masalah
   ↓
Data Teks Tidak Konsisten
   ↓
.str.lower()
   ↓
Reassignment
   ↓
Cari Missing Data
   ↓
NaN
   ↓
┌───────────────┐
│               │
▼               ▼
fillna()      dropna()
│               │
▼               ▼
Isi Data       Hapus Data
│               │
└───────┬───────┘
        ▼
   Data Bersih
```

---

## Contoh Workflow Lengkap

Berikut contoh sederhana yang menggabungkan konsep pada materi ini:

```python
import pandas as pd

car_sales_missing = pd.read_csv("car-sales-missing.csv")

# Mengubah Make menjadi huruf kecil
car_sales_missing["Make"] = car_sales_missing["Make"].str.lower()

# Mengisi missing value pada Odometer dengan mean
car_sales_missing["Odometer"] = car_sales_missing["Odometer"].fillna(
    car_sales_missing["Odometer"].mean()
)

# Menyimpan hasil
car_sales_missing.to_csv(
    "car_sales_cleaned.csv",
    index=False
)
```

Workflow tersebut:

```text
CSV
 ↓
DataFrame
 ↓
Standardisasi teks
 ↓
Menangani missing value
 ↓
Data bersih
 ↓
Export CSV
```

---

## Alternatif Menghapus Missing Data

Jika keputusan analisis mengharuskan missing data dihapus:

```python
car_sales_missing_dropped = car_sales_missing.dropna()

car_sales_missing_dropped.to_csv(
    "car_sales_missing_dropped.csv",
    index=False
)
```

Dalam project nyata, keputusan antara `fillna()` dan `dropna()` harus didasarkan pada karakteristik data, bukan sekadar karena salah satu metode lebih mudah digunakan.

---

## Data Cleaning dalam Machine Learning

Data cleaning merupakan bagian penting dari Machine Learning.

Secara umum:

```text
Raw Data
   ↓
Data Cleaning
   ↓
Data Transformation
   ↓
Data Preprocessing
   ↓
Feature Engineering
   ↓
Model Training
```

Jika data yang masuk ke model bermasalah, kualitas model juga dapat terpengaruh.

Contohnya:

```text
Missing Value
Inconsistent Text
Wrong Data Type
Duplicate Data
Outlier
```

Karena itu, sebelum membuat model Machine Learning, kita perlu memahami dan membersihkan data terlebih dahulu.

---

## Catatan Penting tentang Missing Value

Mengisi missing value dengan mean memang mudah, tetapi jangan menganggapnya sebagai aturan universal.

Contohnya:

```python
car_sales_missing["Odometer"].fillna(
    car_sales_missing["Odometer"].mean()
)
```

dapat masuk akal untuk contoh pembelajaran.

Namun dalam project Machine Learning nyata, kita perlu mempertimbangkan:

- distribusi data
- outlier
- jenis variabel
- alasan data hilang
- jumlah missing value
- kebutuhan model
- kemungkinan data leakage

Untuk preprocessing Machine Learning yang serius, proses pengisian missing value sebaiknya dilakukan dengan hati-hati dan hanya menggunakan informasi yang tersedia dari data training.

---

## Checklist Pemula

Setelah mempelajari materi ini, pastikan sudah memahami:

- Apa fungsi `.str`?
- Apa fungsi `.str.lower()`?
- Mengapa string perlu distandardisasi?
- Apa yang dimaksud dengan reassignment?
- Mengapa hasil operasi perlu disimpan kembali?
- Apa itu missing data?
- Apa itu `NaN`?
- Apa perbedaan `NaN` dengan `0`?
- Apa fungsi `.fillna()`?
- Apa fungsi `.dropna()`?
- Apa perbedaan `fillna()` dan `dropna()`?
- Apa fungsi `inplace=True`?
- Apa alternatif penggunaan `inplace=True`?
- Mengapa kita tidak selalu boleh menghapus semua missing data?
- Mengapa data cleaning penting dalam Machine Learning?

---

## Ringkasan Sintaks

### Mengubah teks menjadi lowercase

```python
car_sales["Make"] = car_sales["Make"].str.lower()
```

### Mengisi missing value dengan mean

```python
car_sales["Odometer"] = car_sales["Odometer"].fillna(
    car_sales["Odometer"].mean()
)
```

### Mengisi missing value menggunakan `inplace`

```python
car_sales["Odometer"].fillna(
    car_sales["Odometer"].mean(),
    inplace=True
)
```

### Menghapus baris dengan missing value

```python
car_sales_dropped = car_sales.dropna()
```

### Export DataFrame

```python
car_sales_dropped.to_csv(
    "car_sales_dropped.csv",
    index=False
)
```

---

## Kesimpulan

Dalam pengolahan data, dataset yang kita dapatkan tidak selalu bersih dan siap digunakan.

Pandas menyediakan berbagai fitur untuk melakukan data cleaning.

Untuk memanipulasi data string, kita dapat menggunakan `.str`.

Contohnya:

```python
car_sales["Make"] = car_sales["Make"].str.lower()
```

Untuk menangani missing value, kita dapat menggunakan:

```python
fillna()
```

atau:

```python
dropna()
```

Contohnya:

```python
car_sales["Odometer"] = car_sales["Odometer"].fillna(
    car_sales["Odometer"].mean()
)
```

atau:

```python
car_sales_dropped = car_sales.dropna()
```

Konsep penting dari materi ini:

```text
Data Mentah
    ↓
Data Cleaning
    ↓
Standardisasi Data
    ↓
Penanganan Missing Value
    ↓
Data Lebih Bersih
    ↓
Data Preprocessing
    ↓
Machine Learning
```

Kemampuan membersihkan data merupakan salah satu skill paling penting dalam Data Science dan Machine Learning.
