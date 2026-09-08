---
sidebar_position: 7
title: "Aggregation"
---

Setelah mempelajari operasi aritmatika, broadcasting, dan vectorization pada NumPy, langkah berikutnya adalah mempelajari **aggregation** atau agregasi.

Agregasi adalah proses melakukan perhitungan terhadap sekumpulan data untuk menghasilkan nilai yang lebih ringkas atau representatif.

Contohnya:

- Menghitung jumlah seluruh data.
- Menghitung nilai rata-rata.
- Mencari nilai terbesar.
- Mencari nilai terkecil.
- Mengukur penyebaran data menggunakan standar deviasi.
- Mengukur variasi data menggunakan varians.

Agregasi sangat penting dalam **Data Science** dan **Machine Learning** karena sering digunakan untuk memahami dataset sebelum melakukan pemodelan.

---

## Apa Itu Aggregation?

**Aggregation** adalah proses menggabungkan atau merangkum banyak nilai menjadi satu atau beberapa nilai statistik.

Misalnya terdapat array:

```python
import numpy as np

a1 = np.array([1, 2, 3, 4, 5])
```

Kita dapat menghitung jumlah seluruh elemen:

```python
np.sum(a1)
```

Hasilnya:

```text
15
```

Lima angka:

```text
1, 2, 3, 4, 5
```

diringkas menjadi satu nilai:

```text
15
```

Itulah contoh sederhana dari agregasi.

---

## Mengapa Aggregation Penting?

Dataset biasanya memiliki jumlah data yang cukup banyak sehingga sulit untuk memahami keseluruhan data hanya dengan melihat setiap nilai.

Agregasi membantu kita mendapatkan gambaran umum mengenai data.

Misalnya sebuah dataset memiliki data umur:

```text
18, 20, 21, 19, 25, 30, 22, ...
```

Daripada melihat seluruh nilai satu per satu, kita dapat menghitung:

- rata-rata umur,
- umur minimum,
- umur maksimum,
- standar deviasi,
- dan statistik lainnya.

Hasil agregasi tersebut dapat membantu kita memahami karakteristik dataset.

Dalam Machine Learning, proses ini sering menjadi bagian dari **Exploratory Data Analysis (EDA)**.

---

## `sum()` pada Python dan `np.sum()` pada NumPy

Python dan NumPy sama-sama menyediakan fungsi untuk menghitung jumlah data.

Python memiliki fungsi bawaan:

```python
sum()
```

Sedangkan NumPy menyediakan:

```python
np.sum()
```

Keduanya memiliki fungsi yang serupa, tetapi penggunaannya sebaiknya disesuaikan dengan jenis data yang sedang diproses.

### Python List

Untuk Python list, kita dapat menggunakan `sum()`:

```python
python_list = [1, 2, 3]

print(sum(python_list))
```

Output:

```text
6
```

### NumPy Array

Untuk NumPy array, gunakan fungsi NumPy:

```python
a1 = np.array([1, 2, 3])

print(np.sum(a1))
```

Output:

```text
6
```

### Rule of Thumb

Sebagai aturan praktis:

| Jenis Data | Fungsi yang Umum Digunakan |
|---|---|
| Python List | `sum()` |
| NumPy Array | `np.sum()` |

NumPy menyediakan berbagai fungsi agregasi yang dirancang untuk bekerja dengan struktur array dan operasi numerik.

---

## Performa `np.sum()`

Salah satu alasan NumPy banyak digunakan dalam Data Science adalah karena operasi numeriknya dioptimalkan untuk bekerja secara efisien pada array.

Untuk dataset yang besar, perbedaan performa antara operasi Python biasa dan operasi NumPy dapat menjadi signifikan.

Kita dapat melakukan percobaan sederhana menggunakan Jupyter Notebook.

```python
massive_array = np.random.random(100000)
```

Kemudian gunakan `%timeit`:

```python
%timeit sum(massive_array)
```

dan:

```python
%timeit np.sum(massive_array)
```

`%timeit` merupakan magic command pada Jupyter/IPython yang digunakan untuk mengukur waktu eksekusi suatu kode.

Hasil waktu eksekusi dapat berbeda-beda tergantung:

- Hardware komputer.
- Versi Python.
- Versi NumPy.
- Ukuran array.
- Kondisi sistem saat pengujian.

Karena itu, jangan menganggap angka tertentu seperti "500 kali lebih cepat" sebagai angka yang selalu berlaku.

Yang lebih penting adalah memahami bahwa **NumPy dirancang untuk operasi numerik pada array dan umumnya jauh lebih efisien untuk pekerjaan numerik skala besar dibandingkan melakukan iterasi elemen menggunakan Python secara langsung**.

---

## Fungsi Agregasi pada NumPy

NumPy menyediakan berbagai fungsi agregasi yang sering digunakan dalam analisis data.

Beberapa di antaranya:

| Fungsi | Kegunaan |
|---|---|
| `np.sum()` | Menghitung jumlah |
| `np.mean()` | Menghitung rata-rata |
| `np.max()` | Mencari nilai maksimum |
| `np.min()` | Mencari nilai minimum |
| `np.std()` | Menghitung standar deviasi |
| `np.var()` | Menghitung varians |

Contoh:

```python
a2 = np.array([
    [1., 2., 3.3],
    [4., 5., 6.5]
])
```

---

## Menghitung Jumlah dengan `np.sum()`

Gunakan `np.sum()` untuk menghitung jumlah seluruh elemen.

```python
print(np.sum(a2))
```

Perhitungannya secara konsep:

```text
1 + 2 + 3.3 + 4 + 5 + 6.5
```

Hasil:

```text
21.8
```

---

## Menghitung Rata-Rata dengan `np.mean()`

`np.mean()` digunakan untuk menghitung nilai rata-rata.

```python
print(np.mean(a2))
```

Secara konsep:

```text
Jumlah seluruh nilai
--------------------
Jumlah elemen
```

Pada contoh tersebut:

```text
21.8 / 6 = 3.6333...
```

Sehingga hasilnya kira-kira:

```text
3.63333333
```

Rata-rata sering digunakan untuk mendapatkan gambaran umum mengenai pusat suatu kumpulan data.

---

## Mencari Nilai Maksimum dengan `np.max()`

Gunakan `np.max()` untuk mencari nilai terbesar.

```python
print(np.max(a2))
```

Output:

```text
6.5
```

Fungsi ini berguna ketika kita ingin mengetahui nilai tertinggi dalam dataset atau array.

---

## Mencari Nilai Minimum dengan `np.min()`

Gunakan `np.min()` untuk mencari nilai terkecil.

```python
print(np.min(a2))
```

Output:

```text
1.0
```

Dengan demikian:

```python
np.max(a2)
```

memberikan nilai terbesar, sedangkan:

```python
np.min(a2)
```

memberikan nilai terkecil.

---

## Standard Deviation

**Standard deviation** atau standar deviasi digunakan untuk mengukur seberapa tersebar data dari nilai rata-ratanya.

Gunakan:

```python
np.std(a2)
```

Contoh:

```python
print(np.std(a2))
```

Secara sederhana:

- Standar deviasi kecil → data cenderung lebih dekat dengan rata-rata.
- Standar deviasi besar → data cenderung lebih tersebar dari rata-rata.

Standar deviasi banyak digunakan dalam analisis statistik dan Data Science untuk memahami distribusi data.

---

## Variance

**Variance** atau varians juga digunakan untuk mengukur penyebaran data.

Gunakan:

```python
np.var(a2)
```

Contoh:

```python
print(np.var(a2))
```

Varians dapat dipahami sebagai ukuran seberapa besar variasi data terhadap rata-ratanya.

Secara umum:

- Varians kecil → data lebih terkonsentrasi di sekitar rata-rata.
- Varians besar → data lebih tersebar.

---

## Hubungan Variance dan Standard Deviation

Variance dan standard deviation memiliki hubungan yang sangat erat.

Rumusnya:

```text
Standard Deviation = √Variance
```

Sebaliknya:

```text
Variance = Standard Deviation²
```

Pada NumPy, hubungan tersebut dapat dibuktikan dengan:

```python
print(np.sqrt(np.var(a2)) == np.std(a2))
```

Untuk data pada contoh tersebut, hasilnya secara matematis akan bernilai:

```text
True
```

Namun, pada perhitungan floating-point tertentu, perbandingan menggunakan `==` dapat menghasilkan masalah presisi.

Untuk perbandingan numerik yang lebih aman, NumPy menyediakan:

```python
np.isclose(
    np.sqrt(np.var(a2)),
    np.std(a2)
)
```

Hasil:

```text
True
```

---

## Memahami Variance dan Standard Deviation

Misalnya terdapat dua kelompok data:

```text
Data A:
10, 10, 10, 10, 10

Data B:
2, 6, 10, 14, 18
```

Data A memiliki nilai yang sama sehingga penyebarannya sangat kecil.

Sementara Data B memiliki nilai yang lebih tersebar.

Secara konsep:

```text
    Data A
      ↓
Penyebaran kecil
      ↓
Variance kecil
      ↓
Standard deviation kecil
```

Sedangkan:

```text
    Data B
      ↓
Penyebaran besar
      ↓
Variance besar
      ↓
Standard deviation besar
```

Inilah alasan variance dan standard deviation berguna dalam analisis data.

---

## Aggregation pada Array Multidimensi

Agregasi tidak hanya dapat dilakukan pada array satu dimensi.

Kita juga dapat melakukan agregasi pada array multidimensi.

Contohnya:

```python
a2 = np.array([
    [1, 2, 3],
    [4, 5, 6]
])
```

Jika kita menjalankan:

```python
np.sum(a2)
```

maka NumPy menghitung seluruh elemen:

```text
1 + 2 + 3 + 4 + 5 + 6
```

Hasil:

```text
21
```

---

## Aggregation Berdasarkan Axis

Pada array multidimensi, kita juga dapat menentukan `axis`.

Contohnya:

```python
np.sum(a2, axis=0)
```

Hasil:

```text
[5 7 9]
```

Artinya NumPy menjumlahkan nilai berdasarkan arah axis yang ditentukan.

Secara konsep:

```text
[1, 2, 3]
[4, 5, 6]

↓ axis=0

1 + 4 = 5
2 + 5 = 7
3 + 6 = 9
```

Hasilnya:

```text
[5, 7, 9]
```

Sedangkan:

```python
np.sum(a2, axis=1)
```

menghasilkan:

```text
[ 6 15]
```

karena:

```text
1 + 2 + 3 = 6
4 + 5 + 6 = 15
```

Pemahaman tentang `axis` akan menjadi sangat penting ketika bekerja dengan array multidimensi.

---

## Contoh Beberapa Aggregation Sekaligus

Kita dapat menghitung beberapa statistik dari array yang sama.

```python
a2 = np.array([
    [1., 2., 3.3],
    [4., 5., 6.5]
])

print("Sum:", np.sum(a2))
print("Mean:", np.mean(a2))
print("Max:", np.max(a2))
print("Min:", np.min(a2))
print("Std:", np.std(a2))
print("Var:", np.var(a2))
```

Dengan cara ini kita dapat memperoleh gambaran statistik dasar dari data.

---

## Aggregation dalam Data Science

Agregasi merupakan bagian penting dari proses **Exploratory Data Analysis (EDA)**.

Misalnya kita memiliki dataset penjualan:

| Produk | Harga |
|---|---:|
| A | 100 |
| B | 150 |
| C | 200 |
| D | 125 |
| E | 175 |

Kita dapat menghitung:

- Total penjualan.
- Rata-rata harga.
- Harga tertinggi.
- Harga terendah.
- Penyebaran harga.

Informasi tersebut membantu kita memahami dataset sebelum melakukan proses lebih lanjut.

Dalam praktiknya, ketika bekerja dengan data berbentuk tabel, fungsi agregasi juga sering digunakan melalui **Pandas**.

---

## Aggregation dalam Machine Learning

Agregasi juga sering muncul dalam Machine Learning.

Contohnya:

- Menghitung rata-rata suatu fitur.
- Mengukur penyebaran data.
- Melakukan normalisasi.
- Menghitung statistik dataset.
- Membandingkan distribusi data.
- Melakukan preprocessing.
- Menghitung nilai statistik untuk evaluasi model.

Sebagai contoh, sebuah fitur mungkin memiliki nilai:

```text
10, 12, 15, 20, 25
```

Kita dapat menghitung:

```python
mean = np.mean(data)
std = np.std(data)
```

Nilai tersebut kemudian dapat digunakan untuk memahami karakteristik fitur atau menjadi bagian dari proses preprocessing tertentu.

---

## Rule of Thumb

Beberapa aturan praktis yang perlu diingat:

| Kebutuhan | Gunakan |
|---|---|
| Menjumlahkan data | `np.sum()` |
| Menghitung rata-rata | `np.mean()` |
| Mencari nilai terbesar | `np.max()` |
| Mencari nilai terkecil | `np.min()` |
| Mengukur penyebaran | `np.std()` |
| Mengukur variasi | `np.var()` |
| Agregasi per arah tertentu | Gunakan parameter `axis` |

Untuk NumPy array, biasakan menggunakan fungsi agregasi NumPy karena fungsi tersebut dirancang untuk bekerja dengan struktur array.

---

## Kesalahan yang Sering Terjadi

### Menganggap Semua Data Harus Dijumlahkan

Aggregation tidak hanya berarti `sum`.

Aggregation mencakup berbagai operasi untuk merangkum data, seperti:

```python
np.sum()
np.mean()
np.max()
np.min()
np.std()
np.var()
```

---

### Tidak Memahami Axis

Pada array multidimensi, hasil agregasi dapat berbeda tergantung `axis`.

Jika bingung, periksa terlebih dahulu:

```python
print(a2.shape)
```

Kemudian pahami arah dimensi array tersebut.

---

### Menganggap Standard Deviation dan Variance Sama

Keduanya berhubungan, tetapi bukan nilai yang sama.

Hubungannya:

```text
Standard Deviation = √Variance
```

dan:

```text
Variance = Standard Deviation²
```

---

### Menggunakan Angka Performa sebagai Nilai Mutlak

Performa `np.sum()` dibandingkan `sum()` dapat berbeda tergantung kondisi.

Jangan menganggap suatu angka benchmark tertentu selalu berlaku.

Jika ingin membandingkan performa, lakukan pengukuran sendiri menggunakan:

```python
%timeit
```

---

## Workflow Aggregation

Workflow sederhana ketika melakukan agregasi data menggunakan NumPy:

```text
Memiliki Dataset
       ↓
Membuat NumPy Array
       ↓
Memeriksa Shape
       ↓
Menentukan Statistik
       ↓
Memilih Fungsi Aggregation
       ↓
Menentukan Axis Jika Diperlukan
       ↓
Menginterpretasikan Hasil
```

Contohnya:

```python
data = np.array([
    [10, 20, 30],
    [40, 50, 60]
])

print("Shape:", data.shape)
print("Total:", np.sum(data))
print("Mean:", np.mean(data))
print("Minimum:", np.min(data))
print("Maximum:", np.max(data))
```

---

## Ringkasan

Pada materi ini kita telah mempelajari konsep **aggregation pada NumPy**.

Hal-hal penting yang perlu diingat:

- Aggregation digunakan untuk merangkum sekumpulan data.
- `sum()` merupakan fungsi bawaan Python.
- `np.sum()` merupakan fungsi NumPy untuk menjumlahkan elemen array.
- Untuk NumPy array, gunakan fungsi agregasi NumPy.
- `np.mean()` digunakan untuk menghitung rata-rata.
- `np.max()` digunakan untuk mencari nilai maksimum.
- `np.min()` digunakan untuk mencari nilai minimum.
- `np.std()` digunakan untuk menghitung standar deviasi.
- `np.var()` digunakan untuk menghitung varians.
- Standard deviation merupakan akar kuadrat dari variance.
- Aggregation dapat dilakukan pada array multidimensi.
- Parameter `axis` digunakan untuk menentukan arah agregasi.
- Aggregation merupakan bagian penting dalam EDA dan Machine Learning.
- `.shape` merupakan informasi penting ketika bekerja dengan aggregation pada array multidimensi.

---

## Checklist Pembelajaran

Pastikan Anda sudah memahami:

- [ ] Apa yang dimaksud dengan aggregation.
- [ ] Perbedaan `sum()` dan `np.sum()`.
- [ ] Cara menghitung total array.
- [ ] Cara menghitung rata-rata dengan `np.mean()`.
- [ ] Cara mencari nilai maksimum dengan `np.max()`.
- [ ] Cara mencari nilai minimum dengan `np.min()`.
- [ ] Apa yang dimaksud dengan standard deviation.
- [ ] Apa yang dimaksud dengan variance.
- [ ] Hubungan variance dan standard deviation.
- [ ] Apa fungsi parameter `axis`.
- [ ] Cara melakukan aggregation pada array multidimensi.
- [ ] Mengapa aggregation penting dalam Data Science dan Machine Learning.

---

## Latihan

Buat sebuah NumPy array berikut:

```python
data = np.array([
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
])
```

Kemudian lakukan latihan berikut:

1. Hitung jumlah seluruh elemen.
2. Hitung rata-rata seluruh elemen.
3. Cari nilai minimum.
4. Cari nilai maksimum.
5. Hitung standard deviation.
6. Hitung variance.
7. Hitung jumlah setiap kolom menggunakan `axis=0`.
8. Hitung jumlah setiap baris menggunakan `axis=1`.
9. Hitung rata-rata setiap kolom.
10. Hitung rata-rata setiap baris.
11. Periksa `shape` array.
12. Gunakan `%timeit` untuk membandingkan `sum()` Python dengan `np.sum()` pada array yang besar.

Setelah mendapatkan hasil, jangan hanya melihat angkanya. Coba jelaskan **apa arti setiap hasil aggregation terhadap dataset tersebut**.
