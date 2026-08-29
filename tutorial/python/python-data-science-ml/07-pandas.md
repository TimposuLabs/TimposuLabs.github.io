---
sidebar_position: 7
title: "Eksplor Dataset dengan Pandas"
---

Dalam Machine Learning, salah satu langkah pertama yang perlu dilakukan adalah **mengimpor dan memahami data**.

Sebelum membuat model, kita perlu mengetahui seperti apa dataset yang akan digunakan, berapa banyak data yang tersedia, kolom apa saja yang dimiliki, serta karakteristik dasar dari data tersebut.

Salah satu sumber dataset yang populer untuk belajar Data Science dan Machine Learning adalah **[Kaggle](https://www.kaggle.com/datasets)**.

Pada materi ini, kita akan menggunakan **Pandas** untuk memuat dan melakukan eksplorasi awal terhadap dataset.

---

## Kaggle sebagai Sumber Dataset

**[Kaggle](https://www.kaggle.com/datasets)** merupakan platform yang menyediakan berbagai dataset yang dapat digunakan untuk latihan dan eksperimen Data Science serta Machine Learning.

Dataset di Kaggle tersedia dalam berbagai bentuk. Salah satu format yang umum digunakan adalah:

```text
CSV (Comma-Separated Values)
```

Contoh dataset dapat berisi informasi mengenai pemain sepak bola:

```text
Name        Age    Nationality    Overall
------------------------------------------
Player A     22      Indonesia       75
Player B     28      Brazil          85
Player C     31      Spain           88
```

Dataset seperti ini dapat digunakan untuk mempelajari cara mengolah dan menganalisis data sebelum digunakan dalam proses Machine Learning.

---

## Menyiapkan Dataset

Setelah dataset diunduh dari Kaggle, letakkan file dataset di dalam folder proyek.

Contoh struktur sederhana:

```text
machine-learning/
│
├── soccer.ipynb
└── data.csv
```

File:

```text
soccer.ipynb
```

merupakan Jupyter Notebook yang digunakan untuk melakukan analisis.

Sedangkan:

```text
data.csv
```

merupakan dataset yang akan digunakan.

Dengan menempatkan keduanya dalam folder yang sama, file CSV dapat dipanggil menggunakan nama filenya secara langsung.

---

## Menggunakan Pandas

Untuk membaca dan mengolah dataset, kita menggunakan library **Pandas**.

Import Pandas menggunakan alias `pd`:

```python
import pandas as pd
```

Penggunaan alias `pd` merupakan konvensi yang umum digunakan ketika bekerja dengan Pandas.

Dengan demikian, kita dapat memanggil fungsi Pandas menggunakan:

```text
pd.nama_fungsi()
```

---

## Membaca File CSV

Pandas menyediakan fungsi:

```python
pd.read_csv()
```

untuk membaca file CSV.

Contohnya:

```python
df = pd.read_csv('data.csv')
```

Data dari file CSV kemudian disimpan ke dalam variabel:

```text
df
```

Variabel tersebut berisi sebuah **DataFrame**.

Secara sederhana:

```text
data.csv
   ↓
pd.read_csv()
   ↓
DataFrame
   ↓
   df
```

---

## Apa Itu DataFrame?

**DataFrame** adalah struktur data utama pada Pandas yang digunakan untuk merepresentasikan data dalam bentuk tabel.

Contohnya:

```text
       Name    Age    Country
0      Budi     25    Indonesia
1      Andi     30    Indonesia
2      John     28    England
3      Carlos   31    Spain
```

DataFrame terdiri dari:

```text
Baris
Kolom
```

Sehingga sangat cocok digunakan untuk mengolah dataset yang berbentuk tabel.

---

## Melihat Ukuran Data dengan `shape`

Setelah dataset berhasil dimuat, salah satu informasi pertama yang perlu diketahui adalah ukuran dataset.

Gunakan:

```python
df.shape
```

Contohnya:

```text
(1000, 15)
```

Angka tersebut menunjukkan:

```text
1000 → jumlah baris
15   → jumlah kolom
```

Secara umum:

```text
df.shape
   ↓
(jumlah_baris, jumlah_kolom)
```

### `shape` adalah Property

Perhatikan bahwa `shape` tidak menggunakan tanda kurung:

```python
df.shape
```

bukan:

```python
df.shape()
```

Hal ini karena `shape` merupakan **property**, bukan method.

---

## Melihat Statistik Data dengan `describe()`

Untuk memperoleh ringkasan statistik dari kolom numerik, kita dapat menggunakan:

```python
df.describe()
```

Method tersebut menghasilkan informasi statistik seperti:

```text
count
mean
std
min
25%
50%
75%
max
```

Contohnya:

```text
             Age     Overall
count       1000      1000
mean          25        72
min           18        50
max           40        90
```

Informasi tersebut dapat membantu kita memahami karakteristik dasar dataset.

Misalnya:

```text
min
```

dapat menunjukkan nilai terkecil.

Sedangkan:

```text
max
```

menunjukkan nilai terbesar.

Dan:

```text
mean
```

menunjukkan nilai rata-rata.

---

## Mengakses Data dengan `values`

Pandas juga menyediakan property:

```python
df.values
```

Property tersebut mengembalikan isi DataFrame dalam bentuk struktur array.

Contohnya:

```python
df.values
```

Hasilnya dapat terlihat seperti:

```text
[
    ['Budi', 25, 'Indonesia'],
    ['Andi', 30, 'Indonesia'],
    ['John', 28, 'England']
]
```

Struktur tersebut memiliki karakteristik seperti array NumPy.

Hal ini memungkinkan data DataFrame untuk digunakan dalam proses pemrosesan numerik atau algoritma tertentu yang bekerja dengan struktur array.

---

## Melakukan Filtering Data

Salah satu kemampuan penting Pandas adalah melakukan **filtering**.

Filtering digunakan untuk mengambil data yang memenuhi kondisi tertentu.

Misalnya kita memiliki kolom:

```text
Age
```

dan ingin mencari pemain yang berusia lebih dari 40 tahun.

Kita dapat menggunakan kondisi:

```python
df['Age'] > 40
```

Kondisi tersebut menghasilkan nilai boolean untuk setiap baris:

```text
True
False
False
True
...
```

Kemudian kondisi tersebut dapat digunakan untuk mengambil baris yang memenuhi kriteria:

```python
df[df['Age'] > 40]
```

Secara sederhana:

```text
DataFrame
    ↓
Kondisi Age > 40
    ↓
Filter
    ↓
Data yang memenuhi kondisi
```

---

## Menggunakan `head()`

Hasil filtering dapat berisi banyak baris.

Agar lebih mudah dilihat, kita dapat menggunakan method:

```python
.head()
```

Contohnya:

```python
df[df['Age'] > 40].head()
```

Method `head()` digunakan untuk menampilkan beberapa baris pertama dari hasil tersebut.

Dengan demikian, kita tidak perlu menampilkan seluruh data ketika hanya ingin melakukan pemeriksaan awal.

---

## Contoh Eksplorasi Dataset

Berikut alur sederhana eksplorasi dataset:

```python
import pandas as pd

df = pd.read_csv('data.csv')

print(df.shape)

print(df.describe())

print(df.values)

print(df[df['Age'] > 40].head())
```

Urutan prosesnya:

```text
Import Pandas
      ↓
Load CSV
      ↓
DataFrame
      ↓
Cek ukuran data
      ↓
Cek statistik
      ↓
Cek isi data
      ↓
Filtering
```

---

## Memahami Workflow Eksplorasi Data

Pada tahap awal, kita belum membuat model Machine Learning.

Fokus utama tahap ini adalah **memahami dataset**.

Alurnya:

```text
Dataset
   ↓
Import
   ↓
DataFrame
   ↓
Eksplorasi
   ├── Shape
   ├── Statistics
   ├── Values
   └── Filtering
```

Tujuannya adalah mendapatkan gambaran mengenai data sebelum masuk ke tahap pemrosesan berikutnya.

---

## Mengapa Eksplorasi Data Penting?

Jangan langsung menggunakan dataset untuk melatih model.

Kita perlu mengetahui terlebih dahulu:

```text
Berapa banyak data?
Kolom apa saja yang tersedia?
Berapa nilai minimum?
Berapa nilai maksimum?
Bagaimana distribusi data?
Apakah terdapat pola tertentu?
```

Informasi tersebut membantu kita memahami dataset sebelum melakukan proses lebih lanjut.

Contohnya, jika dataset ternyata hanya memiliki sedikit data, kita perlu mempertimbangkan dampaknya terhadap proses Machine Learning.

---

## Ringkasan Fungsi Pandas

| Perintah | Fungsi |
| --- | --- |
| `import pandas as pd` | Mengimpor Pandas |
| `pd.read_csv()` | Membaca file CSV |
| `df` | DataFrame yang berisi dataset |
| `df.shape` | Melihat jumlah baris dan kolom |
| `df.describe()` | Melihat statistik deskriptif |
| `df.values` | Mengakses data dalam bentuk array |
| `df[...]` | Melakukan filtering berdasarkan kondisi |
| `.head()` | Menampilkan beberapa baris pertama |

---

## Contoh Alur Lengkap

Misalkan kita memiliki:

```text
data.csv
```

Langkah pertama:

```python
import pandas as pd
```

Kemudian membaca dataset:

```python
df = pd.read_csv('data.csv')
```

Memeriksa ukurannya:

```python
df.shape
```

Melihat statistik:

```python
df.describe()
```

Mengakses data:

```python
df.values
```

Kemudian melakukan filtering:

```python
df[df['Age'] > 40].head()
```

Dengan beberapa perintah sederhana tersebut, kita sudah dapat melakukan eksplorasi awal terhadap dataset.

---

## Kesimpulan

Sebelum membangun model Machine Learning, kita perlu memahami data yang akan digunakan.

Kaggle dapat menjadi salah satu sumber dataset untuk latihan, sedangkan Pandas menyediakan berbagai tools untuk membaca dan mengeksplorasi dataset tersebut.

Workflow dasar yang perlu dipahami adalah:

```text
Kaggle
   ↓
Download Dataset
   ↓
CSV
   ↓
Pandas
   ↓
DataFrame
   ↓
Explorasi Data
   ├── shape
   ├── describe()
   ├── values
   └── filtering
```

Pada tahap ini, tujuan utama bukan membuat model, melainkan **memahami data terlebih dahulu**. Setelah memahami struktur dan karakteristik dataset, barulah kita dapat melanjutkan ke tahap berikutnya seperti **data cleaning dan preprocessing**.

:::tip
**Baca Juga:** [Cara Kerja Pandas](/blog/cara-kerja-pandas)
:::