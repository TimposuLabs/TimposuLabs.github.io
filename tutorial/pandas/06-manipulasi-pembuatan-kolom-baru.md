---
sidebar_position: 7
title: "Manipulasi Data & Pembuatan Kolom Baru"
---

Setelah memahami cara melihat, memilih, membersihkan, dan memvisualisasikan data menggunakan Pandas, langkah berikutnya adalah melakukan **manipulasi data**.

Salah satu manipulasi yang paling sering dilakukan adalah membuat **kolom baru** berdasarkan data yang sudah ada.

Contohnya, pada dataset penjualan mobil kita mungkin memiliki kolom:

- `Make` - merek mobil
- `Colour` - warna mobil
- `Odometer` - jarak tempuh
- `Price` - harga mobil

Kemudian kita ingin menambahkan informasi baru seperti:

- jumlah kursi mobil,
- konsumsi bahan bakar,
- total bahan bakar yang digunakan,
- jumlah roda,
- status kelayakan kendaraan.

Pandas menyediakan beberapa cara untuk melakukan hal tersebut.

---

## 1. Membuat Kolom Baru dari Pandas Series

Salah satu cara membuat kolom baru adalah menggunakan `pd.Series`.

Contoh:

```python
import pandas as pd

seats_column = pd.Series([5, 5, 5, 5])

car_sales["Seats"] = seats_column
```

Kode tersebut membuat sebuah Series bernama `seats_column`, kemudian memasukkannya ke DataFrame sebagai kolom baru bernama `Seats`.

Jika jumlah data pada Series lebih sedikit daripada jumlah baris DataFrame, Pandas akan mengisi baris yang tidak memiliki nilai dengan `NaN`.

### Contoh

Misalnya DataFrame memiliki 10 baris:

```text
Make       Colour    Odometer
toyota     white     150000
honda      blue      120000
bmw        black      90000
ford       red       80000
...
```

Kemudian kita membuat Series yang hanya memiliki 4 nilai:

```python
seats_column = pd.Series([5, 5, 5, 5])
```

Ketika dimasukkan:

```python
car_sales["Seats"] = seats_column
```

Hasilnya kira-kira:

```text
Make       Colour    Odometer    Seats
toyota     white     150000      5
honda      blue      120000      5
bmw        black      90000      5
ford       red       80000      5
...                              NaN
...                              NaN
```

Baris yang tidak memiliki nilai akan mendapatkan `NaN`.

### Mengisi Nilai yang Hilang

Nilai `NaN` dapat ditangani menggunakan `fillna()`.

```python
car_sales["Seats"] = car_sales["Seats"].fillna(5)
```

Sekarang nilai yang kosong akan diganti dengan `5`.

Untuk pembelajaran dan kode yang lebih eksplisit, penggunaan assignment seperti di atas sering lebih mudah dipahami daripada mengubah data secara langsung menggunakan `inplace=True`.

---

## 2. Membuat Kolom Baru dari Python List

Selain `Series`, kita juga dapat menggunakan Python `list`.

Contoh:

```python
fuel_economy = [7.5, 9.2, 5.0, 9.6, 8.7, 4.7, 3.0, 8.7, 4.5, 4.0]

car_sales["Fuel per 100km"] = fuel_economy
```

Pada metode ini, jumlah elemen pada list **harus sama persis** dengan jumlah baris pada DataFrame.

Misalnya DataFrame memiliki 10 baris, maka list harus memiliki 10 nilai.

### Jika Jumlah Data Tidak Sama

Misalnya DataFrame memiliki 10 baris tetapi list hanya memiliki 4 nilai:

```python
fuel_economy = [7.5, 9.2, 5.0, 9.6]

car_sales["Fuel per 100km"] = fuel_economy
```

Pandas akan menghasilkan error:

```text
ValueError: Length of values does not match length of index
```

Hal ini berbeda dengan `pd.Series`, karena Series memiliki index sehingga Pandas dapat melakukan alignment berdasarkan index.

---

## 3. Membuat Kolom Berdasarkan Operasi Kolom Lain

Kolom baru juga dapat dibuat berdasarkan hasil perhitungan dari kolom yang sudah ada.

Misalnya kita memiliki:

- `Odometer` - jarak tempuh kendaraan dalam kilometer
- `Fuel per 100km` - konsumsi bahan bakar dalam liter per 100 kilometer

Kita dapat menghitung perkiraan total bahan bakar yang digunakan:

```python
car_sales["Total fuel used (L)"] = (
    car_sales["Odometer"] / 100
) * car_sales["Fuel per 100km"]
```

### Cara Kerja Perhitungan

Misalnya sebuah mobil memiliki:

```text
Odometer = 150000 km
Fuel per 100km = 7.5 liter
```

Maka:

```text
150000 / 100 × 7.5
= 1500 × 7.5
= 11250 liter
```

Sehingga nilai pada kolom `Total fuel used (L)` adalah `11250`.

Pandas melakukan operasi tersebut terhadap seluruh baris secara otomatis.

---

## 4. Membuat Kolom dari Nilai Tunggal

Jika kita ingin memberikan nilai yang sama kepada seluruh baris, kita tidak perlu membuat Series atau list.

Cukup berikan sebuah nilai tunggal.

Contoh:

```python
car_sales["Number of wheels"] = 4
```

Pandas akan mengisi seluruh baris dengan nilai `4`.

Hasilnya:

```text
Make       Number of wheels
toyota     4
honda      4
bmw        4
ford       4
...
```

Cara ini disebut menggunakan **scalar value**.

### Membuat Kolom Boolean

Kita juga dapat membuat kolom dengan nilai Boolean.

```python
car_sales["Passed road safety"] = True
```

Hasilnya seluruh baris akan memiliki nilai:

```text
True
```

Kolom Boolean dapat digunakan untuk merepresentasikan kondisi seperti:

- kendaraan lulus pemeriksaan,
- pelanggan aktif,
- transaksi berhasil,
- produk tersedia,
- data valid.

---

## 5. Menghapus Kolom

Selain menambahkan kolom, kita juga perlu mengetahui cara menghapus kolom yang tidak diperlukan.

Pandas menyediakan method `drop()`.

Contoh:

```python
car_sales = car_sales.drop("Total fuel used (L)", axis=1)
```

Kode tersebut menghapus kolom `Total fuel used (L)` dari DataFrame.

### Memahami Parameter `axis`

Parameter `axis` digunakan untuk menentukan arah operasi.

| Nilai | Arti |
|---|---|
| `axis=0` | Baris |
| `axis=1` | Kolom |

Karena kita ingin menghapus kolom, digunakan:

```python
axis=1
```

### Menghapus Beberapa Kolom

Kita juga dapat menghapus beberapa kolom sekaligus.

```python
car_sales = car_sales.drop(
    ["Number of wheels", "Passed road safety"],
    axis=1
)
```

---

## 6. Menyimpan Perubahan DataFrame

Beberapa operasi Pandas menghasilkan DataFrame baru dan tidak secara otomatis mengubah DataFrame asli.

Contohnya:

```python
car_sales.drop("Total fuel used (L)", axis=1)
```

Operasi tersebut menghasilkan DataFrame yang sudah tidak memiliki kolom tersebut, tetapi hasilnya perlu disimpan jika ingin perubahan digunakan selanjutnya.

Cara yang umum dan jelas adalah melakukan assignment kembali:

```python
car_sales = car_sales.drop("Total fuel used (L)", axis=1)
```

Cara lainnya adalah menggunakan `inplace=True` pada method yang mendukungnya:

```python
car_sales.drop("Total fuel used (L)", axis=1, inplace=True)
```

Untuk kode pembelajaran, assignment kembali sering lebih mudah dibaca karena terlihat jelas bahwa hasil operasi disimpan ke DataFrame.

---

## 7. Perbandingan Cara Membuat Kolom Baru

Ada beberapa cara utama untuk membuat kolom baru.

| Metode | Persyaratan Panjang Data | Penanganan Data Kosong |
|---|---|---|
| `pd.Series` | Dapat berbeda dari jumlah baris DataFrame | Baris yang tidak memiliki nilai dapat menjadi `NaN` |
| Python `list` | Harus sama dengan jumlah baris DataFrame | Error jika panjang berbeda |
| Single value | Hanya membutuhkan satu nilai | Nilai disalin ke seluruh baris |
| Operasi antar kolom | Mengikuti jumlah baris DataFrame | Bergantung pada data yang digunakan |

---

## 8. Kapan Menggunakan Masing-Masing Metode?

Pemilihan metode bergantung pada sumber data yang kita miliki.

### Gunakan `pd.Series`

Gunakan Series ketika data yang ingin dimasukkan memiliki index atau jumlah datanya tidak harus sama dengan DataFrame.

Contoh:

```python
seats_column = pd.Series([5, 5, 5, 5])
car_sales["Seats"] = seats_column
```

Pandas akan melakukan alignment berdasarkan index.

### Gunakan Python List

Gunakan list ketika kita sudah memiliki satu nilai untuk setiap baris DataFrame.

Contoh:

```python
fuel_economy = [7.5, 9.2, 5.0, 9.6, 8.7, 4.7, 3.0, 8.7, 4.5, 4.0]

car_sales["Fuel per 100km"] = fuel_economy
```

Pastikan jumlah elemennya sama dengan jumlah baris DataFrame.

### Gunakan Single Value

Gunakan nilai tunggal ketika seluruh baris memiliki nilai yang sama.

Contoh:

```python
car_sales["Number of wheels"] = 4
```

### Gunakan Operasi Antar Kolom

Gunakan operasi antar kolom ketika kolom baru merupakan hasil perhitungan dari data yang sudah tersedia.

Contoh:

```python
car_sales["Total fuel used (L)"] = (
    car_sales["Odometer"] / 100
) * car_sales["Fuel per 100km"]
```

---

## 9. Contoh Lengkap

Berikut contoh sederhana yang menggabungkan beberapa teknik sekaligus.

```python
import pandas as pd

car_sales = pd.DataFrame({
    "Make": ["toyota", "honda", "bmw", "ford"],
    "Odometer": [150000, 120000, 90000, 80000],
    "Price": [12000, 15000, 25000, 18000]
})

# Membuat kolom dari single value
car_sales["Number of wheels"] = 4

# Membuat kolom dari list
car_sales["Fuel per 100km"] = [7.5, 9.2, 5.0, 9.6]

# Membuat kolom berdasarkan operasi kolom lain
car_sales["Total fuel used (L)"] = (
    car_sales["Odometer"] / 100
) * car_sales["Fuel per 100km"]

# Membuat kolom Boolean
car_sales["Passed road safety"] = True

print(car_sales)
```

Hasilnya akan memiliki beberapa kolom tambahan:

```text
     Make  Odometer  Price  Number of wheels  Fuel per 100km  Total fuel used (L)  Passed road safety
0  toyota    150000  12000                 4              7.5              11250.0                True
1   honda    120000  15000                 4              9.2              11040.0                True
2     bmw     90000  25000                 4              5.0               4500.0                True
3    ford     80000  18000                 4              9.6               7680.0                True
```

Kemudian kita dapat menghapus kolom yang tidak lagi dibutuhkan:

```python
car_sales = car_sales.drop("Number of wheels", axis=1)
```

---

## 10. Peran Manipulasi Kolom dalam Machine Learning

Membuat kolom baru bukan hanya berguna untuk merapikan DataFrame.

Dalam Machine Learning, proses ini dapat digunakan untuk membuat **fitur baru** dari data yang sudah tersedia.

Misalnya kita memiliki:

```text
Odometer
Price
Year
Fuel consumption
```

Kita dapat membuat fitur tambahan seperti:

```text
Age
Price per kilometer
Total fuel used
```

Fitur tambahan tersebut dapat memberikan informasi yang lebih berguna bagi model.

Proses membuat atau mengubah fitur seperti ini nantinya akan menjadi bagian dari **feature engineering**.

Contohnya secara konsep:

```text
Data awal
    ↓
Membersihkan data
    ↓
Membuat kolom baru
    ↓
Memilih fitur
    ↓
Melatih Machine Learning model
```

Namun, pembuatan fitur harus dilakukan dengan hati-hati.

Jika fitur baru menggunakan informasi yang seharusnya tidak tersedia pada saat prediksi, kita dapat menyebabkan **data leakage**.

Karena itu, feature engineering tidak hanya tentang membuat sebanyak mungkin kolom, tetapi membuat fitur yang **relevan, valid, dan tersedia pada saat model digunakan**.

---

## 11. Hal yang Perlu Diperhatikan

Ketika membuat kolom baru, perhatikan beberapa hal berikut:

1. Pastikan nama kolom jelas dan konsisten.
2. Pastikan jumlah data pada list sesuai dengan jumlah baris DataFrame.
3. Pahami bagaimana Pandas melakukan alignment pada `Series`.
4. Periksa `NaN` setelah menambahkan Series.
5. Pastikan tipe data kolom sesuai dengan kebutuhan.
6. Periksa kembali hasil perhitungan kolom baru.
7. Jangan membuat fitur berdasarkan informasi yang tidak tersedia ketika prediksi dilakukan.
8. Ingat bahwa feature engineering dapat memengaruhi performa model Machine Learning.

---

## 12. Ringkasan

Pandas memungkinkan kita melakukan berbagai manipulasi terhadap DataFrame.

Beberapa teknik penting yang telah dipelajari:

- Membuat kolom dari `pd.Series`.
- Membuat kolom dari Python `list`.
- Membuat kolom menggunakan single value.
- Membuat kolom berdasarkan operasi antar kolom.
- Menghapus kolom menggunakan `drop()`.
- Memahami perbedaan `axis=0` dan `axis=1`.
- Menyimpan perubahan dengan assignment atau `inplace=True`.
- Menggunakan manipulasi kolom sebagai dasar feature engineering.

Konsep ini merupakan bagian penting dalam proses persiapan data karena dataset yang akan digunakan oleh Machine Learning sering kali perlu diubah sebelum dapat digunakan untuk melatih model.

## Checklist

Sebelum melanjutkan ke materi berikutnya, pastikan Anda sudah memahami:

- [ ] Cara membuat kolom menggunakan `pd.Series`.
- [ ] Perbedaan Series dan Python `list` ketika membuat kolom.
- [ ] Mengapa panjang list harus sama dengan jumlah baris DataFrame.
- [ ] Cara membuat kolom menggunakan nilai tunggal.
- [ ] Cara membuat kolom dari hasil perhitungan kolom lain.
- [ ] Cara menghapus kolom menggunakan `drop()`.
- [ ] Perbedaan `axis=0` dan `axis=1`.
- [ ] Pentingnya memeriksa `NaN` setelah manipulasi data.
- [ ] Hubungan manipulasi kolom dengan feature engineering.
