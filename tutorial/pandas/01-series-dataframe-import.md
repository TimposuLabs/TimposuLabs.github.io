---
sidebar_position: 2
title: "Series, DataFrame & Import"
---

Pada materi sebelumnya, kita sudah mengenal **Pandas** dan memahami perannya dalam Data Science dan Machine Learning.

Sekarang kita mulai menggunakan Pandas secara langsung.

Pada tahap awal, ada beberapa konsep penting yang perlu dipahami:

- Cara mengimpor Pandas
- Apa itu `Series`
- Apa itu `DataFrame`
- Cara membaca data dari file CSV
- Memahami struktur DataFrame
- Cara menyimpan DataFrame ke file CSV

Jangan terlalu fokus menghafalkan kode terlebih dahulu.

Yang lebih penting adalah memahami **bagaimana Pandas merepresentasikan data**.

---

## Mengimpor Pandas

Sebelum menggunakan Pandas, kita perlu mengimpor library tersebut ke dalam program Python.

Cara yang paling umum digunakan adalah:

```python
import pandas as pd
```

Di sini:

```text
pandas
```

adalah nama library yang kita impor.

Sedangkan:

```text
pd
```

adalah alias atau nama singkat yang digunakan untuk mengakses Pandas.

Dengan menggunakan alias `pd`, kita tidak perlu menulis `pandas` setiap kali menggunakan fungsi Pandas.

Contohnya:

```python
pd.Series(...)
pd.DataFrame(...)
pd.read_csv(...)
```

Daripada:

```python
pandas.Series(...)
pandas.DataFrame(...)
pandas.read_csv(...)
```

Penggunaan `pd` sudah menjadi konvensi yang sangat umum dalam Python Data Science.

---

## Apa Itu Series?

**Series** adalah struktur data Pandas yang berbentuk **satu dimensi**.

Cara sederhana untuk membayangkannya adalah sebagai **satu kolom data**.

Misalnya kita memiliki daftar merek mobil:

```text
BMW
Toyota
Honda
```

Data tersebut dapat direpresentasikan sebagai sebuah Series:

```python
import pandas as pd

car_brands = pd.Series(["BMW", "Toyota", "Honda"])

print(car_brands)
```

Hasilnya kurang lebih:

```text
0       BMW
1    Toyota
2     Honda
dtype: object
```

Perhatikan angka di sebelah kiri:

```text
0
1
2
```

Angka tersebut merupakan **index**.

Sedangkan data di sebelah kanan adalah nilai dari Series.

---

## Memahami Series dengan Analogi

Bayangkan sebuah tabel yang hanya memiliki satu kolom:

| Index | Brand |
|---:|---|
| 0 | BMW |
| 1 | Toyota |
| 2 | Honda |

Struktur seperti ini dapat dianggap sebagai sebuah **Series**.

Jadi secara sederhana:

```text
Series
  │
  ├── Index
  │
  └── Values
```

Series cocok untuk merepresentasikan satu kumpulan data atau satu kolom.

---

## Membuat Series dari List Python

Salah satu cara sederhana untuk membuat Series adalah menggunakan **list Python**.

Contohnya:

```python
car_brands = pd.Series(["BMW", "Toyota", "Honda"])
```

List Python:

```python
["BMW", "Toyota", "Honda"]
```

diubah menjadi Series menggunakan:

```python
pd.Series(...)
```

Ini merupakan salah satu cara paling sederhana untuk memahami hubungan antara Python dan Pandas.

---

## Apa Itu DataFrame?

Jika Series dapat dibayangkan sebagai satu kolom, maka **DataFrame** dapat dibayangkan sebagai sebuah **tabel yang memiliki baris dan kolom**.

Contohnya:

| Brand | Colour | Price |
|---|---|---:|
| BMW | Black | 50000 |
| Toyota | White | 30000 |
| Honda | Red | 25000 |

Tabel tersebut merupakan contoh struktur DataFrame.

Secara sederhana:

```text
DataFrame
│
├── Rows
│
├── Columns
│
└── Values
```

DataFrame adalah struktur data utama yang akan sangat sering kita gunakan ketika bekerja dengan Pandas.

---

## Series vs DataFrame

Perbedaan paling sederhana:

| Struktur | Dimensi | Gambaran |
|---|---:|---|
| Series | 1 dimensi | Satu kolom |
| DataFrame | 2 dimensi | Tabel dengan baris dan kolom |

Contoh Series:

```text
BMW
Toyota
Honda
```

Contoh DataFrame:

```text
Brand     Colour    Price
BMW       Black     50000
Toyota    White     30000
Honda     Red       25000
```

Dengan memahami perbedaan ini, kita sudah memiliki fondasi penting untuk mempelajari Pandas.

---

## Membuat DataFrame

DataFrame dapat dibuat dari berbagai sumber.

Salah satu cara sederhana adalah menggunakan **dictionary Python**.

Misalnya:

```python
car_brands = ["BMW", "Toyota", "Honda"]
colours = ["Black", "White", "Red"]
prices = [50000, 30000, 25000]
```

Kita dapat menggabungkannya menjadi DataFrame:

```python
car_sales = pd.DataFrame({
    "Brand": car_brands,
    "Colour": colours,
    "Price": prices
})

print(car_sales)
```

Hasilnya:

```text
    Brand  Colour  Price
0     BMW   Black  50000
1  Toyota   White  30000
2   Honda     Red  25000
```

Sekarang kita memiliki tabel dengan:

- 3 baris
- 3 kolom
- 1 index
- beberapa nilai data

---

## Dictionary dan DataFrame

Pada contoh sebelumnya:

```python
{
    "Brand": car_brands,
    "Colour": colours,
    "Price": prices
}
```

dictionary digunakan untuk menentukan nama kolom dan data yang berada di dalamnya.

Secara sederhana:

```text
Dictionary
     │
     ├── Brand  → BMW, Toyota, Honda
     │
     ├── Colour → Black, White, Red
     │
     └── Price  → 50000, 30000, 25000
                    │
                    ▼
                DataFrame
```

Ini membantu kita memahami bahwa DataFrame dapat terdiri dari beberapa Series yang disusun menjadi sebuah tabel.

---

## DataFrame sebagai Tabel

Untuk pemula, cara paling mudah memahami DataFrame adalah menganggapnya seperti tabel pada spreadsheet.

Misalnya:

| Index | Brand | Colour | Price |
|---:|---|---|---:|
| 0 | BMW | Black | 50000 |
| 1 | Toyota | White | 30000 |
| 2 | Honda | Red | 25000 |

Ada beberapa bagian penting:

```text
Index → 0, 1, 2

Columns → Brand, Colour, Price

Values → BMW, Black, 50000, dan seterusnya
```

Pemahaman terhadap bagian-bagian ini akan sangat membantu ketika mulai melakukan analisis data.

---

## Mengimpor Data dari File CSV

Dalam project nyata, kita biasanya tidak membuat seluruh data secara manual menggunakan Python.

Data dapat berasal dari file seperti:

```text
CSV
Excel
Database
API
```

Salah satu format yang paling umum digunakan dalam pembelajaran Data Science adalah **CSV**.

CSV merupakan singkatan dari **Comma-Separated Values**.

Contoh isi file:

```text
Brand,Colour,Price
BMW,Black,50000
Toyota,White,30000
Honda,Red,25000
```

Data seperti ini dapat dibaca menggunakan Pandas.

---

## Import CSV dari URL

Pandas memungkinkan Anda untuk membaca file CSV yang tersimpan di internet secara langsung tanpa harus mengunduhnya terlebih dahulu ke komputer. Anda hanya perlu memasukkan link (URL) file CSV tersebut ke dalam fungsi `pd.read_csv()`.


```python
import pandas as pd

# 1. Simpan URL file CSV ke dalam variabel
url = "https://githubusercontent.com/heart-disease.csv"

# 2. Baca file CSV langsung dari URL
df = pd.read_csv(url)
```

---

## Membaca File CSV

Gunakan fungsi:

```python
pd.read_csv()
```

Contohnya:

```python
import pandas as pd

car_sales = pd.read_csv("car-sales.csv")
```

Sekarang isi file:

```text
car-sales.csv
```

akan dibaca oleh Pandas dan disimpan ke dalam variable:

```text
car_sales
```

Variable tersebut berisi sebuah DataFrame.

Secara sederhana:

```text
car-sales.csv
      │
      ▼
pd.read_csv()
      │
      ▼
DataFrame
      │
      ▼
car_sales
```

---

## Mengapa CSV Sering Digunakan?

CSV sangat populer karena bentuknya sederhana.

Contohnya:

```text
Brand,Colour,Price
BMW,Black,50000
Toyota,White,30000
Honda,Red,25000
```

Format tersebut dapat dibuka menggunakan berbagai aplikasi.

CSV juga sering digunakan sebagai format pertukaran data antar sistem.

Dalam pembelajaran Data Science dan Machine Learning, kita akan sering menemukan dataset dalam bentuk CSV.

---

## Lokasi File CSV

Ketika menggunakan:

```python
car_sales = pd.read_csv("car-sales.csv")
```

Pandas akan mencari file:

```text
car-sales.csv
```

berdasarkan lokasi kerja atau **working directory** saat program dijalankan.

Misalnya struktur project:

```text
machine-learning/
│
├── notebooks/
│   └── learning-pandas.ipynb
│
└── data/
    └── car-sales.csv
```

Jika notebook dijalankan dari folder `notebooks`, lokasi file dapat perlu dituliskan sesuai struktur folder.

Contohnya:

```python
car_sales = pd.read_csv("../data/car-sales.csv")
```

Untuk pemula, konsep yang penting adalah memahami bahwa **Pandas membutuhkan lokasi file yang benar** ketika membaca dataset.

---

## Tab Autocomplete di Jupyter Notebook

Ketika bekerja menggunakan Jupyter Notebook, kita dapat memanfaatkan fitur **Tab Autocomplete**.

Misalnya kita mengetik:

```python
pd.re
```

kemudian menekan tombol:

```text
Tab
```

Jupyter dapat membantu memberikan pilihan yang sesuai.

Fitur ini juga berguna ketika bekerja dengan nama file atau object tertentu.

Misalnya ketika kita mulai mengetik:

```text
car-
```

dan kemudian menekan `Tab`, Jupyter dapat membantu menemukan nama file yang tersedia pada lokasi tersebut.

Autocomplete dapat membantu:

- mengurangi kesalahan pengetikan
- menemukan fungsi
- menemukan variable
- menemukan file
- mempercepat proses coding

---

## Anatomi DataFrame

Sekarang kita perlu memahami bagian-bagian dari DataFrame.

Perhatikan contoh:

| Index | Brand | Colour | Price |
|---:|---|---|---:|
| 0 | BMW | Black | 50000 |
| 1 | Toyota | White | 30000 |
| 2 | Honda | Red | 25000 |

DataFrame tersebut memiliki beberapa komponen penting.

---

## Index

**Index** adalah penanda untuk setiap baris.

Secara default, Pandas biasanya memberikan index:

```text
0
1
2
3
...
```

Contoh:

| Index | Brand |
|---:|---|
| 0 | BMW |
| 1 | Toyota |
| 2 | Honda |

Index dimulai dari:

```text
0
```

bukan:

```text
1
```

Hal ini mengikuti kebiasaan indexing yang umum dalam pemrograman Python.

---

## Row atau Baris

**Row** adalah data yang tersusun secara horizontal.

Contohnya:

```text
BMW | Black | 50000
```

merupakan satu baris data.

Dalam Pandas, baris sering disebut berkaitan dengan:

```text
Axis = 0
```

Secara sederhana:

```text
       Brand    Colour    Price
         │        │         │
Row 0 → BMW     Black     50000
Row 1 → Toyota  White     30000
Row 2 → Honda   Red       25000
```

Untuk saat ini, cukup ingat:

```text
Row → Axis 0
```

Konsep `axis` akan menjadi lebih penting ketika kita mulai melakukan operasi pada DataFrame.

---

## Column atau Kolom

**Column** adalah data yang tersusun secara vertikal.

Contohnya:

```text
Brand
BMW
Toyota
Honda
```

merupakan satu kolom.

Dalam Pandas, kolom berkaitan dengan:

```text
Axis = 1
```

Secara sederhana:

```text
Brand
BMW
Toyota
Honda
```

adalah satu kolom.

Untuk saat ini, cukup ingat:

```text
Column → Axis 1
```

---

## Row vs Column

Perbedaan row dan column dapat dilihat seperti berikut:

```text
               Column
                 ↓
        Brand | Colour | Price
        -----------------------
Row →    BMW  | Black  | 50000
        Toyota| White  | 30000
        Honda | Red    | 25000
```

Atau:

```text
Row
→ horizontal

Column
↓ vertical
```

Konsep ini sederhana tetapi sangat penting karena hampir semua operasi DataFrame berkaitan dengan baris dan kolom.

---

## Column Names

Setiap kolom pada DataFrame memiliki nama.

Contoh:

```text
Brand
Colour
Price
```

Nama tersebut disebut **column names** atau nama kolom.

Nama kolom membantu kita memahami informasi yang terdapat di dalam data.

Misalnya:

```text
Brand
```

menunjukkan merek.

```text
Price
```

menunjukkan harga.

Dalam Machine Learning, nama kolom juga dapat membantu kita mengidentifikasi:

- feature
- target
- informasi tambahan
- data yang perlu diproses

---

## Values atau Data

**Values** adalah nilai yang terdapat di dalam DataFrame.

Contohnya:

```text
BMW
Black
50000
Toyota
White
30000
Honda
Red
25000
```

Nilai tersebut merupakan isi dari dataset.

Secara sederhana:

```text
Index       → Penanda baris
Column Name → Nama kolom
Values      → Isi data
```

---

## Gambaran Lengkap DataFrame

Perhatikan kembali:

| Index | Brand | Colour | Price |
|---:|---|---|---:|
| 0 | BMW | Black | 50000 |
| 1 | Toyota | White | 30000 |
| 2 | Honda | Red | 25000 |

Kita dapat mengidentifikasi:

```text
Index
  ↓
0, 1, 2

Column Names
  ↓
Brand, Colour, Price

Rows
  ↓
Setiap baris horizontal

Columns
  ↓
Setiap kolom vertikal

Values
  ↓
BMW, Black, 50000, dan seterusnya
```

Memahami anatomi ini akan membuat kita lebih mudah mengikuti materi Pandas berikutnya.

---

## Mengekspor DataFrame

Selain membaca data, Pandas juga dapat digunakan untuk menyimpan data.

Misalnya kita telah melakukan beberapa perubahan terhadap DataFrame dan ingin menyimpannya kembali sebagai CSV.

Kita dapat menggunakan:

```python
car_sales.to_csv("exported-car-sales.csv", index=False)
```

Perintah tersebut akan menghasilkan file:

```text
exported-car-sales.csv
```

Secara sederhana:

```text
DataFrame
    │
    ▼
to_csv()
    │
    ▼
CSV File
```

---

## Apa Fungsi `index=False`?

Perhatikan perintah:

```python
car_sales.to_csv("exported-car-sales.csv", index=False)
```

Bagian:

```text
index=False
```

digunakan agar index DataFrame tidak ikut disimpan sebagai kolom baru pada file CSV.

Misalnya DataFrame:

| Index | Brand | Price |
|---:|---|---:|
| 0 | BMW | 50000 |
| 1 | Toyota | 30000 |
| 2 | Honda | 25000 |

Jika index ikut disimpan, hasil CSV dapat memiliki tambahan kolom index.

Padahal index tersebut sering kali hanya digunakan sebagai penanda baris di DataFrame.

Karena itu, ketika kita tidak ingin menyimpan index sebagai kolom CSV, gunakan:

```python
index=False
```

---

## Membaca dan Menyimpan Data

Secara umum, Pandas dapat digunakan untuk melakukan dua proses penting:

### Membaca Data

```python
car_sales = pd.read_csv("car-sales.csv")
```

Alurnya:

```text
CSV
 ↓
Pandas
 ↓
DataFrame
```

### Menyimpan Data

```python
car_sales.to_csv("exported-car-sales.csv", index=False)
```

Alurnya:

```text
DataFrame
 ↓
Pandas
 ↓
CSV
```

Dengan demikian, Pandas dapat menjadi jembatan antara file dataset dan program Python.

---

## Contoh Alur Sederhana

Berikut contoh workflow sederhana:

```python
import pandas as pd

car_sales = pd.read_csv("car-sales.csv")

car_sales.to_csv("exported-car-sales.csv", index=False)
```

Alurnya:

```text
car-sales.csv
      │
      ▼
pd.read_csv()
      │
      ▼
DataFrame
      │
      ▼
Pengolahan Data
      │
      ▼
to_csv()
      │
      ▼
exported-car-sales.csv
```

Pada materi ini kita belum melakukan pengolahan data secara mendalam.

Tujuannya adalah memahami bagaimana data masuk ke Pandas dan bagaimana data tersebut direpresentasikan sebagai DataFrame.

---

## Ringkasan Konsep

Beberapa konsep utama yang perlu diingat:

| Konsep | Penjelasan |
|---|---|
| Pandas | Library Python untuk bekerja dengan data |
| `pd` | Alias umum untuk Pandas |
| Series | Struktur data satu dimensi |
| DataFrame | Struktur data dua dimensi berbentuk tabel |
| Index | Penanda baris |
| Row | Baris data, berkaitan dengan Axis 0 |
| Column | Kolom data, berkaitan dengan Axis 1 |
| Values | Isi atau nilai data |
| Column Names | Nama atau header kolom |
| CSV | Format file yang umum digunakan untuk dataset |
| `pd.read_csv()` | Membaca CSV menjadi DataFrame |
| `to_csv()` | Menyimpan DataFrame menjadi CSV |

---

## Hal yang Perlu Dipahami Pemula

Pada tahap awal, jangan terlalu fokus menghafalkan semua fungsi Pandas.

Pastikan terlebih dahulu memahami konsep berikut:

```text
Series
  ↓
Satu dimensi / satu kolom

DataFrame
  ↓
Dua dimensi / tabel

Index
  ↓
Penanda baris

Row
  ↓
Baris

Column
  ↓
Kolom

Values
  ↓
Isi data
```

Jika konsep tersebut sudah dipahami, kita akan lebih mudah mempelajari operasi Pandas pada materi berikutnya.

---

## Kesimpulan

Pandas menyediakan struktur data yang memudahkan kita bekerja dengan dataset.

Dua struktur data utama yang perlu diketahui adalah:

```text
Series
  ↓
1 dimensi

DataFrame
  ↓
2 dimensi
```

DataFrame merupakan struktur yang paling sering kita gunakan ketika bekerja dengan dataset.

DataFrame dapat dibuat secara langsung menggunakan Python maupun diperoleh dari file seperti CSV.

Contohnya:

```python
car_sales = pd.read_csv("car-sales.csv")
```

Setelah data berada dalam DataFrame, kita dapat mengolahnya menggunakan berbagai fitur Pandas.

DataFrame juga dapat disimpan kembali ke CSV:

```python
car_sales.to_csv("exported-car-sales.csv", index=False)
```

Pemahaman terhadap **Series, DataFrame, index, row, column, dan values** merupakan fondasi penting sebelum kita masuk ke operasi Pandas yang lebih lanjut.
