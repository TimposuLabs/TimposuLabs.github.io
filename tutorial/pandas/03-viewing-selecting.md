---
sidebar_position: 4
title: "Viewing & Selecting Data"
---

Setelah mempelajari cara mendeskripsikan DataFrame, langkah berikutnya adalah belajar **melihat dan memilih data**.

Ketika bekerja dengan dataset, kita sering tidak membutuhkan seluruh data sekaligus.

Kita mungkin ingin:

- Melihat beberapa baris pertama.
- Melihat beberapa baris terakhir.
- Memilih satu baris tertentu.
- Memilih beberapa baris.
- Memilih satu kolom.
- Memilih beberapa kolom.
- Mencari data berdasarkan kondisi tertentu.

Pandas menyediakan berbagai cara untuk melakukan hal tersebut.

---

## Menyiapkan DataFrame

Sebagai contoh, kita akan menggunakan dataset sederhana mengenai penjualan mobil.

```python
import pandas as pd

car_sales = pd.read_csv("car-sales.csv")
```

Kita dapat membayangkan DataFrame seperti berikut:

| Index | Make | Colour | Odometer (KM) | Doors | Price |
|---:|---|---|---:|---:|---:|
| 0 | Toyota | White | 150000 | 4 | 4000 |
| 1 | Honda | Red | 120000 | 4 | 5000 |
| 2 | BMW | Black | 80000 | 4 | 15000 |
| 3 | Nissan | Blue | 90000 | 4 | 7000 |
| 4 | Toyota | Green | 110000 | 4 | 6000 |

Pada materi ini kita akan menggunakan DataFrame tersebut untuk memahami berbagai teknik pemilihan data.

---

## Melihat Sebagian Data

Ketika mendapatkan dataset yang besar, kita biasanya tidak perlu langsung menampilkan seluruh DataFrame.

Misalnya dataset memiliki:

```text
10.000 baris
```

Jika kita menjalankan:

```python
print(car_sales)
```

akan sangat tidak praktis untuk melihat seluruh data.

Sebagai gantinya, kita dapat melihat sebagian data.

Pandas menyediakan dua method yang sangat berguna:

```python
head()
```

dan:

```python
tail()
```

---

## Menggunakan `.head()`

Method:

```python
car_sales.head()
```

digunakan untuk menampilkan **5 baris pertama** DataFrame secara default.

Contohnya:

```python
car_sales.head()
```

Hasilnya kurang lebih:

| Index | Make | Colour | Odometer (KM) | Doors | Price |
|---:|---|---|---:|---:|---:|
| 0 | Toyota | White | 150000 | 4 | 4000 |
| 1 | Honda | Red | 120000 | 4 | 5000 |
| 2 | BMW | Black | 80000 | 4 | 15000 |
| 3 | Nissan | Blue | 90000 | 4 | 7000 |
| 4 | Toyota | Green | 110000 | 4 | 6000 |

Cara ini sangat berguna untuk mendapatkan gambaran cepat mengenai isi dataset.

---

## Mengubah Jumlah Baris dengan `.head()`

Secara default:

```python
car_sales.head()
```

menampilkan 5 baris.

Namun kita dapat menentukan jumlah baris yang ingin ditampilkan.

Contohnya:

```python
car_sales.head(7)
```

Artinya:

```text
Tampilkan 7 baris pertama
```

Contoh lainnya:

```python
car_sales.head(3)
```

akan menampilkan:

```text
Baris 0
Baris 1
Baris 2
```

Jadi angka yang diberikan kepada `head()` menentukan jumlah baris dari bagian awal DataFrame yang ingin kita lihat.

---

## Kapan Menggunakan `.head()`?

`.head()` sangat berguna ketika:

- baru membuka dataset.
- ingin mengetahui bentuk data.
- ingin memastikan file berhasil dibaca.
- ingin melihat beberapa contoh data.
- ingin memeriksa hasil manipulasi data.

Misalnya setelah membaca CSV:

```python
car_sales = pd.read_csv("car-sales.csv")
```

kita dapat langsung melakukan:

```python
car_sales.head()
```

Dengan begitu kita dapat memastikan apakah dataset berhasil dibaca dan terlihat seperti yang diharapkan.

---

## Menggunakan `.tail()`

Jika `head()` digunakan untuk melihat bagian awal DataFrame, maka `tail()` digunakan untuk melihat bagian akhir.

Contohnya:

```python
car_sales.tail()
```

Secara default, `tail()` menampilkan **5 baris terakhir**.

---

## Mengubah Jumlah Baris dengan `.tail()`

Sama seperti `head()`, kita dapat menentukan jumlah baris.

Contohnya:

```python
car_sales.tail(3)
```

Artinya:

```text
Tampilkan 3 baris terakhir
```

Misalnya DataFrame memiliki 10 baris, maka yang ditampilkan adalah:

```text
Baris 7
Baris 8
Baris 9
```

---

## `.head()` vs `.tail()`

Perbedaannya sederhana:

| Method | Fungsi |
|---|---|
| `df.head()` | Melihat 5 baris pertama |
| `df.head(n)` | Melihat `n` baris pertama |
| `df.tail()` | Melihat 5 baris terakhir |
| `df.tail(n)` | Melihat `n` baris terakhir |

Secara visual:

```text
DataFrame

┌─────────────────┐
│ Baris pertama   │ ← head()
│ Baris kedua     │
│ Baris ketiga    │
│ ...             │
│ Baris terakhir  │ ← tail()
└─────────────────┘
```

Keduanya merupakan cara cepat untuk melakukan pemeriksaan awal terhadap dataset.

---

## Memilih Data dengan `.loc` dan `.iloc`

Selain melihat bagian awal dan akhir data, kita juga dapat memilih data tertentu.

Pandas menyediakan dua cara penting:

```python
.loc
```

dan:

```python
.iloc
```

Keduanya digunakan untuk memilih data, tetapi memiliki konsep yang berbeda.

Perbedaan utama:

```text
.loc
↓
berdasarkan label

.iloc
↓
berdasarkan posisi
```

---

## `.loc` - Location

`.loc` digunakan untuk memilih data berdasarkan **label index**.

Misalnya DataFrame memiliki index:

```text
0
1
2
3
4
```

Kita dapat memilih data dengan:

```python
car_sales.loc[3]
```

Artinya:

```text
Ambil data dengan label index 3
```

Jika index tersebut memiliki data:

```text
Nissan | Blue | 90000 | 4 | 7000
```

maka baris tersebut akan dikembalikan.

---

## Memahami Label Index

Perhatikan DataFrame:

| Index | Make |
|---:|---|
| 0 | Toyota |
| 1 | Honda |
| 2 | BMW |
| 3 | Nissan |
| 4 | Toyota |

Jika kita menggunakan:

```python
car_sales.loc[3]
```

Pandas mencari:

```text
Label index = 3
```

Kemudian mengembalikan baris tersebut.

Jadi konsep utama `.loc` adalah:

```text
.loc
  ↓
Cari berdasarkan label
```

---

## `.iloc` - Integer Location

`.iloc` digunakan untuk memilih data berdasarkan **posisi**.

Posisi dimulai dari:

```text
0
```

Misalnya:

| Posisi | Index | Make |
|---:|---:|---|
| 0 | 0 | Toyota |
| 1 | 1 | Honda |
| 2 | 2 | BMW |
| 3 | 3 | Nissan |
| 4 | 4 | Toyota |

Jika kita menggunakan:

```python
car_sales.iloc[3]
```

maka Pandas mengambil data pada **posisi ke-3**.

Dalam contoh ini hasilnya kebetulan sama dengan `loc[3]` karena label index juga berurutan dari 0.

---

## Perbedaan `.loc` dan `.iloc`

Untuk DataFrame dengan index default:

```text
0, 1, 2, 3, 4
```

hasil `.loc` dan `.iloc` mungkin terlihat sama.

Contohnya:

```python
car_sales.loc[3]
```

dan:

```python
car_sales.iloc[3]
```

keduanya dapat menghasilkan baris yang sama.

Namun konsepnya berbeda:

```text
.loc
→ berdasarkan label

.iloc
→ berdasarkan posisi
```

Perbedaan ini menjadi sangat penting ketika index DataFrame tidak lagi menggunakan angka berurutan.

---

## Contoh Index Tidak Berurutan

Bayangkan DataFrame memiliki index:

| Index | Make |
|---:|---|
| 10 | Toyota |
| 20 | Honda |
| 30 | BMW |
| 40 | Nissan |

Sekarang:

```python
car_sales.loc[30]
```

berarti:

```text
Cari label index 30
```

Sedangkan:

```python
car_sales.iloc[3]
```

berarti:

```text
Ambil data pada posisi ke-3
```

Hasilnya:

```text
.loc[30]
→ BMW

.iloc[3]
→ Nissan
```

Ini menunjukkan mengapa memahami perbedaan `.loc` dan `.iloc` sangat penting.

---

## Slicing dengan `.iloc`

Slicing digunakan untuk mengambil sebagian data berdasarkan rentang posisi.

Contohnya:

```python
car_sales.iloc[:3]
```

Artinya:

```text
Ambil data dari posisi awal
sampai sebelum posisi 3
```

Maka posisi yang diambil:

```text
0
1
2
```

Posisi `3` tidak termasuk.

---

## Memahami Slicing

Perhatikan:

```python
car_sales.iloc[:3]
```

dapat dibaca:

```text
:
→ mulai dari awal

3
→ berhenti sebelum posisi 3
```

Sehingga:

```text
0 ✓
1 ✓
2 ✓
3 ✗
```

Ini mengikuti aturan slicing yang umum dalam Python.

---

## Contoh Slicing dengan `.iloc`

Misalnya:

```python
car_sales.iloc[1:4]
```

Maka posisi yang diambil:

```text
1
2
3
```

Posisi:

```text
4
```

tidak termasuk.

Secara umum:

```text
.iloc[start:stop]
```

mengambil data mulai dari `start` hingga sebelum `stop`.

---

## Slicing dengan `.loc`

Slicing menggunakan `.loc` memiliki aturan yang berbeda ketika menggunakan label.

Contohnya:

```python
car_sales.loc[:3]
```

Jika indexnya:

```text
0
1
2
3
4
```

maka label yang diambil adalah:

```text
0
1
2
3
```

Perhatikan bahwa label `3` **ikut termasuk**.

---

## Perbedaan Slicing `.loc` dan `.iloc`

Ini merupakan salah satu hal yang penting untuk diingat.

Dengan:

```python
car_sales.iloc[:3]
```

yang diambil:

```text
0
1
2
```

Sedangkan:

```python
car_sales.loc[:3]
```

yang diambil:

```text
0
1
2
3
```

Perbedaannya:

```text
.iloc
→ batas akhir tidak termasuk

.loc
→ label batas akhir termasuk
```

Untuk pemula, konsep ini perlu diperhatikan agar tidak salah mengambil data.

---

## Memilih Kolom

Selain memilih baris, kita juga sering perlu memilih kolom tertentu.

Misalnya DataFrame memiliki:

```text
Make
Colour
Odometer (KM)
Doors
Price
```

Kita mungkin hanya ingin mengambil kolom:

```text
Make
```

Pandas menyediakan beberapa cara untuk melakukannya.

Cara yang paling umum adalah menggunakan **bracket notation**.

---

## Bracket Notation

Contohnya:

```python
car_sales["Make"]
```

Perintah tersebut memilih kolom:

```text
Make
```

Hasilnya berupa Series.

Secara sederhana:

```text
DataFrame
    ↓
["Make"]
    ↓
Series
```

---

## Mengapa Bracket Notation Direkomendasikan?

Bracket notation merupakan cara yang umum dan aman untuk memilih kolom.

Contohnya:

```python
car_sales["Odometer (KM)"]
```

Cara ini tetap dapat digunakan meskipun nama kolom mengandung:

- spasi
- tanda kurung
- karakter tertentu

Misalnya:

```python
car_sales["Odometer (KM)"]
```

---

## Dot Notation

Pandas juga memungkinkan kita memilih kolom menggunakan dot notation.

Contohnya:

```python
car_sales.Make
```

Ini dapat digunakan untuk kolom sederhana seperti:

```text
Make
```

atau:

```text
Price
```

Contohnya:

```python
car_sales.Price
```

---

## Keterbatasan Dot Notation

Dot notation tidak cocok untuk semua nama kolom.

Misalnya nama kolom:

```text
Odometer (KM)
```

Kita tidak dapat menuliskannya seperti:

```python
car_sales.Odometer (KM)
```

Kode tersebut tidak valid.

Karena itu, gunakan bracket notation:

```python
car_sales["Odometer (KM)"]
```

---

## Bracket vs Dot Notation

Perbandingannya:

| Cara | Contoh | Keterangan |
|---|---|---|
| Bracket notation | `car_sales["Make"]` | Direkomendasikan |
| Dot notation | `car_sales.Make` | Ringkas tetapi memiliki keterbatasan |

Untuk pembelajaran dan project nyata, biasakan menggunakan:

```python
car_sales["Make"]
```

terutama jika nama kolom berasal dari dataset yang belum kita kontrol.

---

## Memilih Beberapa Kolom

Kita juga dapat memilih lebih dari satu kolom.

Contohnya:

```python
car_sales[["Make", "Price"]]
```

Perhatikan bahwa terdapat dua pasang bracket:

```text
car_sales[
    ["Make", "Price"]
]
```

Bracket bagian luar digunakan untuk memilih data dari DataFrame.

List bagian dalam berisi nama kolom yang ingin dipilih.

Hasilnya adalah DataFrame baru yang hanya memiliki:

```text
Make
Price
```

---

## Boolean Indexing

Salah satu fitur Pandas yang sangat penting adalah **Boolean Indexing**.

Boolean Indexing memungkinkan kita memilih baris berdasarkan kondisi tertentu.

Contohnya:

```python
car_sales[car_sales["Make"] == "Toyota"]
```

Artinya:

```text
Pilih baris
di mana Make sama dengan Toyota
```

---

## Filtering Berdasarkan Teks

Misalnya terdapat data:

| Make | Colour | Price |
|---|---|---:|
| Toyota | White | 4000 |
| Honda | Red | 5000 |
| BMW | Black | 15000 |
| Toyota | Green | 6000 |

Kita dapat mencari semua mobil Toyota:

```python
car_sales[car_sales["Make"] == "Toyota"]
```

Hasilnya hanya baris yang memenuhi kondisi:

```text
Make == Toyota
```

---

## Memahami Boolean Condition

Bagian:

```python
car_sales["Make"] == "Toyota"
```

akan menghasilkan nilai Boolean untuk setiap baris.

Secara sederhana:

```text
Toyota → True
Honda  → False
BMW    → False
Toyota → True
```

Pandas kemudian hanya mengambil baris yang memiliki:

```text
True
```

Sehingga:

```python
car_sales[car_sales["Make"] == "Toyota"]
```

menghasilkan data Toyota saja.

---

## Operator Perbandingan

Boolean Indexing dapat menggunakan berbagai operator perbandingan.

Beberapa yang umum:

| Operator | Arti |
|---|---|
| `==` | Sama dengan |
| `!=` | Tidak sama dengan |
| `>` | Lebih besar dari |
| `<` | Lebih kecil dari |
| `>=` | Lebih besar atau sama dengan |
| `<=` | Lebih kecil atau sama dengan |

Contoh:

```python
car_sales["Price"] > 5000
```

Artinya:

```text
Price lebih besar dari 5000
```

---

## Filtering Berdasarkan Nilai Numerik

Kita juga dapat melakukan filtering menggunakan angka.

Misalnya kita ingin mencari mobil dengan jarak tempuh lebih dari 100.000 km:

```python
car_sales[car_sales["Odometer (KM)"] > 100000]
```

Artinya:

```text
Ambil baris
yang memiliki Odometer (KM)
lebih besar dari 100000
```

---

## Contoh Boolean Filtering

Misalnya:

| Make | Odometer (KM) |
|---|---:|
| Toyota | 150000 |
| Honda | 80000 |
| BMW | 60000 |
| Nissan | 120000 |

Kondisi:

```python
car_sales["Odometer (KM)"] > 100000
```

secara konseptual menghasilkan:

```text
150000 → True
80000  → False
60000  → False
120000 → True
```

Kemudian:

```python
car_sales[car_sales["Odometer (KM)"] > 100000]
```

hanya mengambil baris dengan nilai `True`.

---

## Filtering sebagai Konsep Penting

Boolean Indexing sangat penting dalam Data Science karena kita sering perlu menemukan subset data.

Misalnya:

```text
Semua mobil Toyota
        ↓
Semua mobil dengan harga > 10.000
        ↓
Semua mobil dengan odometer > 100.000
        ↓
Semua data dengan kondisi tertentu
```

Konsep dasarnya:

```text
DataFrame
    ↓
Condition
    ↓
True / False
    ↓
Data yang memenuhi kondisi
```

---

## Contoh Workflow

Misalnya kita baru membaca dataset:

```python
import pandas as pd

car_sales = pd.read_csv("car-sales.csv")
```

Pertama, lihat data awal:

```python
car_sales.head()
```

Kemudian lihat data akhir:

```python
car_sales.tail()
```

Pilih satu kolom:

```python
car_sales["Make"]
```

Pilih beberapa kolom:

```python
car_sales[["Make", "Price"]]
```

Pilih baris berdasarkan index:

```python
car_sales.loc[3]
```

Pilih baris berdasarkan posisi:

```python
car_sales.iloc[3]
```

Filter berdasarkan teks:

```python
car_sales[car_sales["Make"] == "Toyota"]
```

Filter berdasarkan angka:

```python
car_sales[car_sales["Odometer (KM)"] > 100000]
```

---

## Ringkasan `head()` dan `tail()`

```text
head()
  ↓
Melihat bagian awal DataFrame

tail()
  ↓
Melihat bagian akhir DataFrame
```

Contoh:

```python
car_sales.head()
car_sales.head(7)

car_sales.tail()
car_sales.tail(3)
```

---

## Ringkasan `.loc` dan `.iloc`

```text
.loc
  ↓
Berdasarkan label

.iloc
  ↓
Berdasarkan posisi
```

Contoh:

```python
car_sales.loc[3]
```

berarti:

```text
Ambil label index 3
```

Sedangkan:

```python
car_sales.iloc[3]
```

berarti:

```text
Ambil posisi ke-3
```

---

## Ringkasan Slicing

Dengan `.iloc`:

```python
car_sales.iloc[:3]
```

mengambil:

```text
0
1
2
```

Sedangkan:

```python
car_sales.loc[:3]
```

mengambil:

```text
0
1
2
3
```

Perhatikan aturan:

```text
.iloc → stop tidak termasuk
.loc  → label stop termasuk
```

---

## Ringkasan Pemilihan Kolom

Cara yang direkomendasikan:

```python
car_sales["Make"]
```

Untuk beberapa kolom:

```python
car_sales[["Make", "Price"]]
```

Dot notation:

```python
car_sales.Make
```

dapat digunakan untuk nama kolom tertentu, tetapi memiliki keterbatasan.

Karena itu, bracket notation biasanya lebih fleksibel.

---

## Ringkasan Boolean Indexing

Boolean Indexing digunakan untuk melakukan filtering.

Berdasarkan teks:

```python
car_sales[car_sales["Make"] == "Toyota"]
```

Berdasarkan angka:

```python
car_sales[car_sales["Odometer (KM)"] > 100000]
```

Konsepnya:

```text
Condition
    ↓
True / False
    ↓
Filter
    ↓
Data yang sesuai
```

---

## Checklist Pemula

Setelah mempelajari materi ini, pastikan sudah memahami:

- Apa fungsi `head()`?
- Apa fungsi `tail()`?
- Bagaimana mengubah jumlah baris yang ditampilkan?
- Apa perbedaan `.loc` dan `.iloc`?
- Apa yang dimaksud label index?
- Apa yang dimaksud posisi?
- Bagaimana melakukan slicing dengan `.iloc`?
- Bagaimana melakukan slicing dengan `.loc`?
- Apa perbedaan aturan slicing `.loc` dan `.iloc`?
- Bagaimana memilih satu kolom?
- Bagaimana memilih beberapa kolom?
- Apa perbedaan bracket notation dan dot notation?
- Apa itu Boolean Indexing?
- Bagaimana melakukan filtering berdasarkan teks?
- Bagaimana melakukan filtering berdasarkan angka?

---

## Kesimpulan

Pandas menyediakan berbagai cara untuk melihat dan memilih data dari DataFrame.

Untuk melihat sebagian data, gunakan:

```python
car_sales.head()
car_sales.tail()
```

Untuk memilih data berdasarkan label atau posisi:

```python
car_sales.loc[3]
car_sales.iloc[3]
```

Untuk memilih kolom:

```python
car_sales["Make"]
```

atau beberapa kolom:

```python
car_sales[["Make", "Price"]]
```

Untuk melakukan filtering:

```python
car_sales[car_sales["Make"] == "Toyota"]
```

atau:

```python
car_sales[car_sales["Odometer (KM)"] > 100000]
```

Secara keseluruhan:

```text
Viewing
   ↓
head() / tail()
   ↓
Selecting
   ↓
loc / iloc
   ↓
Column Selection
   ↓
Boolean Indexing
   ↓
Filtering
```

Kemampuan memilih data merupakan dasar yang sangat penting sebelum kita mulai melakukan **data cleaning, manipulasi data, dan analisis dataset**.