---
sidebar_position: 8
title: "Clean the Data"
---

Setelah data berhasil diimpor dan dieksplorasi, langkah berikutnya dalam workflow Machine Learning adalah **membersihkan dan mempersiapkan data**.

Data yang diperoleh dari dunia nyata sering kali belum berada dalam format yang siap digunakan. Selain mengatasi data yang bermasalah, proses *data cleaning* juga dapat mencakup **transformasi data** agar sesuai dengan kebutuhan analisis.

Pada materi ini, kita akan menggunakan dataset pemain sepak bola untuk mencari pemain yang memiliki **value for money**.

---

## Studi Kasus: Mencari Pemain "Value for Money"

Bayangkan kita ingin mencari pemain sepak bola yang memiliki:

- Nilai pasar (*Value*) tinggi.
- Gaji (*Wage*) relatif rendah.

Dengan kata lain, kita ingin mencari pemain yang memberikan nilai tinggi dibandingkan biaya yang harus dikeluarkan.

Secara sederhana:

```text
Value Tinggi
     +
Wage Rendah
     ↓
Value for Money
```

Untuk melakukan analisis tersebut, kita tidak membutuhkan seluruh kolom dalam dataset.

Kita hanya membutuhkan:

```text
Name
Wage
Value
```

---

## Memilih Kolom yang Dibutuhkan

Dataset asli dapat memiliki banyak kolom.

Misalnya:

```text
Name
Age
Nationality
Position
Wage
Value
Overall
...
```

Namun untuk studi kasus ini, hanya beberapa kolom yang relevan.

Kita dapat membuat DataFrame baru:

```python
df1 = pd.DataFrame(df, columns=['Name', 'Wage', 'Value'])
```

Hasilnya menjadi lebih sederhana:

```text
Name        Wage       Value
--------------------------------
Player A    €50K       €2.5M
Player B    €80K       €5M
Player C    €30K       €3M
```

Dengan memilih kolom yang relevan, proses analisis menjadi lebih fokus.

---

## Masalah Tipe Data

Setelah memilih kolom, kita mungkin ingin menghitung selisih antara `Value` dan `Wage`.

Secara matematis:

```text
Difference = Value - Wage
```

Kita mungkin mencoba:

```python
df1['Difference'] = df1['Value'] - df1['Wage']
```

Namun operasi tersebut dapat menghasilkan:

```text
TypeError
```

Mengapa?

Karena data `Wage` dan `Value` bukan angka murni.

Contohnya:

```text
€50K
€2.5M
```

Data tersebut masih berupa **string**.

Python tidak dapat melakukan operasi matematika secara langsung terhadap string seperti:

```text
"€2.5M" - "€50K"
```

Oleh karena itu, data harus dibersihkan dan diubah terlebih dahulu menjadi angka.

---

## Memahami Format Data

Kolom `Wage` dan `Value` memiliki beberapa komponen yang perlu diproses:

```text
€50K
│ │
│ └── Satuan ribuan
└──── Simbol mata uang
```

Contoh lainnya:

```text
€2.5M
│   │
│   └── Satuan jutaan
└────── Simbol mata uang
```

Beberapa suffix yang perlu dipahami:

| Suffix | Makna |
| --- | --- |
| `K` | Thousand / ribu |
| `M` | Million / juta |
| `B` | Billion / miliar |

Agar dapat digunakan dalam perhitungan, representasi tersebut perlu dikonversi menjadi angka.

---

## Menghapus Simbol Mata Uang

Langkah pertama adalah menghapus simbol `€`.

Pandas menyediakan operasi string melalui accessor:

```python
.str
```

Kita dapat menggunakan:

```python
wage = df1['Wage'].str.replace('€', '', regex=True)
```

Misalnya data awal:

```text
€50K
€80K
€30K
```

Setelah simbol mata uang dihapus:

```text
50K
80K
30K
```

Namun data tersebut masih belum berupa angka karena masih memiliki suffix `K`.

---

## Mengubah `K`, `M`, dan `B` Menjadi Angka

Kita perlu membuat fungsi yang dapat memahami format nilai tersebut.

Misalnya:

```text
50K  → 50.000
2.5M → 2.500.000
1B   → 1.000.000.000
```

Konversi ini dapat dilakukan menggunakan sebuah fungsi khusus.

Contoh struktur fungsi:

```python
def value_to_float(value):
    # proses konversi
    ...
```

Fungsi tersebut bertugas menerima nilai seperti:

```text
50K
2.5M
1B
```

kemudian mengubahnya menjadi nilai numerik.

---

## Menggunakan `apply()`

Setelah fungsi `value_to_float()` dibuat, kita dapat menerapkannya ke seluruh nilai dalam sebuah kolom menggunakan:

```python
.apply()
```

Contohnya:

```python
df1['Wage'] = wage.apply(value_to_float)
```

Dengan demikian, setiap nilai dalam kolom `Wage` akan diproses oleh fungsi tersebut.

Secara sederhana:

```text
Kolom Wage
    ↓
 apply()
    ↓
value_to_float()
    ↓
Nilai Numerik
```

Hal yang sama dapat dilakukan pada kolom `Value`:

```python
df1['Value'] = (
    df1['Value']
    .str.replace('€', '', regex=True)
    .apply(value_to_float)
)
```

---

## Dari String Menjadi Data Numerik

Sebelum proses cleaning:

```text
Wage       Value
------------------
€50K       €2.5M
€80K       €5M
€30K       €3M
```

Setelah proses cleaning:

```text
Wage       Value
--------------------
50000      2500000
80000      5000000
30000      3000000
```

Sekarang kedua kolom sudah dapat digunakan dalam operasi matematika.

---

## Membuat Kolom `Difference`

Setelah `Wage` dan `Value` menjadi data numerik, kita dapat menghitung selisihnya.

Rumus:

```text
Difference = Value - Wage
```

Implementasinya:

```python
df1['Difference'] = df1['Value'] - df1['Wage']
```

Hasilnya:

```text
Name        Wage      Value      Difference
------------------------------------------------
Player A    50000     2500000    2450000
Player B    80000     5000000    4920000
Player C    30000     3000000    2970000
```

Kolom `Difference` sekarang dapat digunakan untuk membandingkan pemain.

---

## Mengurutkan Data

Setelah mendapatkan `Difference`, kita ingin mengetahui pemain dengan selisih terbesar.

Pandas menyediakan method:

```python
sort_values()
```

Contohnya:

```python
df1.sort_values(by='Difference', ascending=False)
```

Parameter:

```text
by='Difference'
```

berarti data diurutkan berdasarkan kolom `Difference`.

Sedangkan:

```text
ascending=False
```

berarti data diurutkan dari nilai terbesar ke nilai terkecil.

Hasilnya:

```text
Name        Wage      Value      Difference
------------------------------------------------
Player B    80000     5000000    4920000
Player C    30000     3000000    2970000
Player A    50000     2500000    2450000
```

Dengan demikian, pemain dengan `Difference` terbesar akan berada di bagian atas.

---

## Workflow Data Cleaning

Studi kasus ini menunjukkan bahwa *data cleaning* bukan hanya tentang menghapus data yang salah.

Kita melakukan beberapa tahapan:

```text
Dataset
   ↓
Pilih Kolom
   ↓
Periksa Tipe Data
   ↓
Hapus Simbol Mata Uang
   ↓
Konversi K / M / B
   ↓
Ubah Menjadi Numerik
   ↓
Buat Kolom Baru
   ↓
Sorting
```

---

## Contoh Kode Lengkap

Berikut gambaran proses dari awal hingga akhir:

```python
import pandas as pd

# Memilih kolom yang dibutuhkan
df1 = pd.DataFrame(
    df,
    columns=['Name', 'Wage', 'Value']
)

# Menghapus simbol mata uang
wage = df1['Wage'].str.replace('€', '', regex=True)

# Mengubah format nilai menjadi angka
df1['Wage'] = wage.apply(value_to_float)

df1['Value'] = (
    df1['Value']
    .str.replace('€', '', regex=True)
    .apply(value_to_float)
)

# Menghitung selisih Value dan Wage
df1['Difference'] = df1['Value'] - df1['Wage']

# Mengurutkan dari Difference terbesar
df1.sort_values(
    by='Difference',
    ascending=False
)
```

Fungsi `value_to_float()` digunakan untuk melakukan transformasi nilai seperti `K`, `M`, dan `B` menjadi angka.

---

## Konsep Penting yang Dipelajari

### Seleksi Kolom

Kita tidak selalu membutuhkan seluruh kolom dari dataset.

```python
df1 = pd.DataFrame(
    df,
    columns=['Name', 'Wage', 'Value']
)
```

Memilih kolom yang relevan membuat proses analisis lebih terarah.

---

### String Manipulation

Data yang terlihat seperti angka belum tentu bertipe numerik.

Contoh:

```text
"€50K"
```

merupakan string, bukan angka.

Kita perlu membersihkannya sebelum melakukan operasi matematika.

---

### `str.replace()`

Digunakan untuk mengganti atau menghapus bagian tertentu dari string.

```python
.str.replace('€', '', regex=True)
```

Dalam kasus ini, simbol `€` dihapus.

---

### `apply()`

Digunakan untuk menerapkan sebuah fungsi pada setiap nilai dalam Series.

```python
.apply(value_to_float)
```

Hal ini sangat berguna ketika transformasi data membutuhkan logika khusus.

---

### Membuat Kolom Baru

Pandas memungkinkan kita membuat kolom berdasarkan perhitungan dari kolom lain.

```python
df1['Difference'] = df1['Value'] - df1['Wage']
```

---

### `sort_values()`

Digunakan untuk mengurutkan data berdasarkan kolom tertentu.

```python
df1.sort_values(
    by='Difference',
    ascending=False
)
```

---

## Data Cleaning Bukan Sekadar Menghapus Data

Salah satu konsep penting dari materi ini adalah bahwa **cleaning data juga dapat berarti melakukan transformasi data**.

Contohnya:

```text
Data Awal
 "€2.5M"
    ↓
 Hapus €
    ↓
 "2.5M"
    ↓
Konversi M
    ↓
2500000
```

Data tersebut tidak dibuang.

Sebaliknya, data **diubah dari format yang tidak sesuai menjadi format yang dapat digunakan untuk analisis**.

---

## Hubungan dengan Machine Learning

Tahap ini merupakan bagian penting dari workflow Machine Learning.

Sebelumnya:

```text
Import Data
     ↓
Eksplorasi Data
```

Sekarang kita melakukan:

```text
Clean Data
     ↓
Transform Data
     ↓
Data Siap Dianalisis
```

Setelah data bersih dan berada dalam format yang sesuai, data dapat dilanjutkan ke tahap berikutnya seperti:

```text
Data Cleaning
     ↓
Feature Selection
     ↓
Data Splitting
     ↓
Model Training
```

---

## Ringkasan

Pada materi ini kita mempelajari proses membersihkan dan mentransformasi dataset menggunakan Pandas.

Konsep utama yang dipelajari:

- Memilih kolom yang relevan dari dataset.
- Memahami masalah tipe data.
- Menghapus simbol mata uang menggunakan `str.replace()`.
- Mengubah suffix `K`, `M`, dan `B` menjadi nilai numerik.
- Menggunakan `apply()` untuk menerapkan fungsi transformasi.
- Membuat kolom baru berdasarkan hasil perhitungan.
- Mengurutkan data menggunakan `sort_values()`.
- Memahami bahwa *data cleaning* juga mencakup **transformasi data**.

Workflow studi kasus:

```text
Name + Wage + Value
         ↓
    Data Cleaning
         ↓
Wage & Value → Numeric
         ↓
Difference = Value - Wage
         ↓
       Sorting
         ↓
Value for Money
```

---

## Kesimpulan

Data mentah sering kali belum siap digunakan untuk analisis maupun Machine Learning.

Dalam studi kasus pemain sepak bola, informasi `Wage` dan `Value` awalnya disimpan dalam format yang mudah dibaca manusia, seperti:

```text
€50K
€2.5M
```

Namun format tersebut perlu ditransformasikan menjadi angka agar komputer dapat melakukan perhitungan.

Proses tersebut menunjukkan salah satu prinsip penting dalam Data Science:

:::info
**Sebelum meminta model mempelajari data, pastikan data sudah berada dalam format yang dapat dipahami dan diproses dengan benar.**
:::