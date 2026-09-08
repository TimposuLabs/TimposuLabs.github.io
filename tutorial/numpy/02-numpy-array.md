---
sidebar_position: 3
title: "NumPy Array"
---

Setelah memahami `ndarray` dan atribut dasar NumPy, langkah berikutnya adalah mempelajari bagaimana cara membuat array.

NumPy menyediakan berbagai fungsi untuk membuat array tanpa harus menuliskan seluruh elemen secara manual.

Beberapa cara yang akan dipelajari:

- Membuat array dari Python list.
- Membuat array berisi angka `1`.
- Membuat array berisi angka `0`.
- Membuat array berdasarkan rentang angka.
- Membuat array dengan angka acak.
- Menggunakan dokumentasi fungsi melalui Jupyter Notebook.

Kemampuan membuat array merupakan dasar penting karena hampir seluruh operasi NumPy dilakukan terhadap array.

---

## 1. Membuat Array dari Python List

Cara paling sederhana untuk membuat NumPy array adalah menggunakan `np.array()`.

Kita dapat membuat Python list terlebih dahulu:

```python
numbers = [1, 2, 3]
```

Kemudian mengubahnya menjadi NumPy array:

```python
import numpy as np

sample_array = np.array([1, 2, 3])

print(sample_array)
```

Output:

```text
[1 2 3]
```

Berbeda dengan Python list yang biasanya ditampilkan dengan tanda koma, NumPy array ditampilkan dengan format khusus array.

Kita dapat memeriksa tipe objeknya:

```python
type(sample_array)
```

Output:

```text
numpy.ndarray
```

---

## 2. Memeriksa Tipe Data Array

Selain mengetahui tipe objek menggunakan `type()`, kita juga dapat mengetahui tipe data elemen menggunakan `.dtype`.

Contoh:

```python
sample_array = np.array([1, 2, 3])

print(sample_array.dtype)
```

Output dapat berupa:

```text
int64
```

Tipe data yang muncul dapat berbeda tergantung sistem atau platform yang digunakan.

Jika array berisi angka desimal:

```python
sample_array = np.array([1.5, 2.5, 3.5])

print(sample_array.dtype)
```

hasilnya dapat berupa:

```text
float64
```

Memahami `dtype` penting karena tipe data dapat memengaruhi cara NumPy menyimpan dan memproses data.

---

## 3. Membuat Array dengan `np.ones()`

NumPy menyediakan fungsi `np.ones()` untuk membuat array yang seluruh elemennya bernilai `1`.

Contoh:

```python
ones = np.ones((2, 3))

print(ones)
```

Output:

```text
[[1. 1. 1.]
 [1. 1. 1.]]
```

Pada contoh tersebut:

```text
(2, 3)
```

berarti:

- 2 baris.
- 3 kolom.

Secara visual:

```text
1   1   1
1   1   1
```

### Tipe Data Default

Secara default, `np.ones()` menghasilkan nilai bertipe floating point.

Contohnya:

```python
ones = np.ones((2, 3))

print(ones.dtype)
```

Hasilnya dapat berupa:

```text
float64
```

Jika kita membutuhkan tipe integer, kita dapat menentukan `dtype`:

```python
ones = np.ones(
    (2, 3),
    dtype=int
)

print(ones)
```

Output:

```text
[[1 1 1]
 [1 1 1]]
```

---

## 4. Membuat Array dengan `np.zeros()`

`np.zeros()` digunakan untuk membuat array yang seluruh elemennya bernilai `0`.

Contoh:

```python
zeros = np.zeros((2, 3))

print(zeros)
```

Output:

```text
[[0. 0. 0.]
 [0. 0. 0.]]
```

Sama seperti `np.ones()`, nilai default yang dihasilkan biasanya bertipe floating point.

Kita juga dapat menentukan tipe datanya:

```python
zeros = np.zeros(
    (2, 3),
    dtype=int
)

print(zeros)
```

Output:

```text
[[0 0 0]
 [0 0 0]]
```

---

## 5. Kegunaan `np.zeros()` dan `np.ones()`

Array yang berisi nol atau satu dapat digunakan dalam berbagai kebutuhan komputasi.

Contohnya:

- Membuat array awal.
- Menyediakan placeholder.
- Membuat struktur data dengan ukuran tertentu.
- Inisialisasi perhitungan numerik.
- Eksperimen algoritma.
- Membuat data sementara.

Contoh secara konseptual:

```text
Array awal
    ↓
[0, 0, 0, 0, 0]
    ↓
Diproses
    ↓
[10, 25, 15, 30, 20]
```

Dengan `np.zeros()`, kita dapat membuat struktur array terlebih dahulu sebelum mengisinya dengan nilai tertentu.

---

## 6. Membuat Array dengan `np.arange()`

Jika kita ingin membuat array berdasarkan urutan angka, kita dapat menggunakan `np.arange()`.

Sintaks:

```python
np.arange(start, stop, step)
```

Parameter tersebut berarti:

| Parameter | Fungsi |
|---|---|
| `start` | Angka awal |
| `stop` | Batas akhir |
| `step` | Jarak antar angka |

Contoh:

```python
range_array = np.arange(0, 10, 2)

print(range_array)
```

Output:

```text
[0 2 4 6 8]
```

Perhatikan bahwa nilai `10` **tidak termasuk** dalam hasil.

Jadi:

```python
np.arange(0, 10, 2)
```

berarti:

```text
Mulai dari 0
Berhenti sebelum 10
Lompat 2 angka setiap langkah
```

---

## 7. Contoh Penggunaan `np.arange()`

Tanpa menentukan `step`, kita dapat menggunakan:

```python
numbers = np.arange(5)

print(numbers)
```

Output:

```text
[0 1 2 3 4]
```

Secara default:

```text
start = 0
step = 1
```

Sehingga:

```python
np.arange(5)
```

setara secara konsep dengan:

```python
np.arange(0, 5, 1)
```

---

## 8. Menggunakan Step Negatif

`np.arange()` juga dapat digunakan untuk membuat urutan angka menurun.

Contoh:

```python
numbers = np.arange(10, 0, -2)

print(numbers)
```

Output:

```text
[10 8 6 4 2]
```

Artinya:

```text
Mulai dari 10
Berhenti sebelum 0
Kurangi 2 setiap langkah
```

---

## 9. Membuat Array dengan Angka Acak

NumPy juga menyediakan modul `random` untuk menghasilkan angka acak atau **pseudo-random**.

Angka acak sangat berguna dalam berbagai kebutuhan Data Science dan Machine Learning, misalnya:

- eksperimen,
- simulasi,
- pembuatan data contoh,
- inisialisasi,
- pengujian algoritma.

NumPy menyediakan beberapa fungsi untuk menghasilkan angka acak.

---

## 10. Angka Bulat Acak dengan `np.random.randint()`

Fungsi `np.random.randint()` digunakan untuk menghasilkan angka bulat secara acak.

Sintaks sederhananya:

```python
np.random.randint(low, high, size)
```

Contoh:

```python
random_array = np.random.randint(
    0,
    10,
    size=(3, 5)
)

print(random_array)
```

Contoh output:

```text
[[2 7 4 1 8]
 [5 0 3 9 6]
 [1 8 2 4 7]]
```

Karena prosesnya acak, hasil yang Anda dapatkan dapat berbeda.

### Memahami `low` dan `high`

Pada:

```python
np.random.randint(0, 10)
```

angka yang dapat dihasilkan berada pada rentang:

```text
0 sampai 9
```

Nilai `high`, yaitu `10`, tidak termasuk.

Dengan kata lain:

```text
low  → termasuk
high → tidak termasuk
```

---

## 11. Menentukan Ukuran Array Acak

Parameter `size` digunakan untuk menentukan bentuk array yang ingin dibuat.

Contoh:

```python
np.random.randint(
    0,
    10,
    size=(3, 5)
)
```

berarti kita meminta array dengan:

```text
3 baris × 5 kolom
```

Jika:

```python
size=(2, 4)
```

maka hasilnya memiliki:

```text
2 baris × 4 kolom
```

Jika:

```python
size=5
```

maka hasilnya berupa array satu dimensi dengan 5 elemen.

---

## 12. Angka Desimal Acak dengan `np.random.random()`

Untuk menghasilkan angka desimal acak dalam rentang `0.0` hingga kurang dari `1.0`, kita dapat menggunakan `np.random.random()`.

Contoh:

```python
random_array = np.random.random((5, 3))

print(random_array)
```

Contoh hasil:

```text
[[0.23 0.71 0.42]
 [0.18 0.95 0.37]
 [0.64 0.12 0.83]
 [0.45 0.56 0.09]
 [0.77 0.31 0.68]]
```

Nilai yang sebenarnya akan berbeda karena dihasilkan secara acak.

Rentangnya adalah:

```text
0.0 <= nilai < 1.0
```

---

## 13. Menggunakan `np.random.rand()`

Cara lain untuk menghasilkan angka desimal acak adalah `np.random.rand()`.

Contoh:

```python
random_array = np.random.rand(5, 3)

print(random_array)
```

Fungsinya mirip dengan:

```python
np.random.random((5, 3))
```

Keduanya dapat menghasilkan array berisi angka floating point acak dalam rentang `0.0` hingga kurang dari `1.0`.

Perbedaannya terutama terletak pada cara menentukan ukuran array.

Dengan `random()`:

```python
np.random.random((5, 3))
```

Sedangkan dengan `rand()`:

```python
np.random.rand(5, 3)
```

---

## 14. Perbandingan Fungsi Pembuatan Array

Berikut beberapa fungsi utama yang telah dipelajari:

| Fungsi | Kegunaan | Contoh |
|---|---|---|
| `np.array()` | Membuat array dari data yang tersedia | `np.array([1, 2, 3])` |
| `np.ones()` | Membuat array berisi `1` | `np.ones((2, 3))` |
| `np.zeros()` | Membuat array berisi `0` | `np.zeros((2, 3))` |
| `np.arange()` | Membuat array berdasarkan rentang | `np.arange(0, 10, 2)` |
| `np.random.randint()` | Membuat angka integer acak | `np.random.randint(0, 10, size=5)` |
| `np.random.random()` | Membuat angka float acak | `np.random.random((2, 3))` |
| `np.random.rand()` | Membuat angka float acak | `np.random.rand(2, 3)` |

---

## 15. Membandingkan Jenis Array

Kita dapat melihat perbedaan masing-masing fungsi melalui contoh berikut:

```python
import numpy as np

array_manual = np.array([1, 2, 3])

array_ones = np.ones((2, 3))

array_zeros = np.zeros((2, 3))

array_range = np.arange(0, 10, 2)

array_random_int = np.random.randint(
    0,
    10,
    size=(2, 3)
)

array_random_float = np.random.random((2, 3))
```

Sekarang kita memiliki beberapa jenis array dengan karakteristik berbeda.

Secara konsep:

```text
np.array()
    ↓
Data yang kita tentukan

np.ones()
    ↓
Semua nilai = 1

np.zeros()
    ↓
Semua nilai = 0

np.arange()
    ↓
Urutan angka

np.random.randint()
    ↓
Integer acak

np.random.random()
    ↓
Float acak
```

---

## 16. Memeriksa Shape Array

Setelah membuat array, biasakan memeriksa bentuknya menggunakan `.shape`.

Contoh:

```python
array_ones = np.ones((2, 3))

print(array_ones.shape)
```

Output:

```text
(2, 3)
```

Untuk array random:

```python
array_random = np.random.randint(
    0,
    10,
    size=(3, 5)
)

print(array_random.shape)
```

Output:

```text
(3, 5)
```

Memeriksa `.shape` sangat penting sebelum melakukan operasi lebih lanjut.

---

## 17. Memeriksa Ukuran dan Dimensi

Selain `.shape`, kita dapat menggunakan atribut yang telah dipelajari pada materi sebelumnya.

Contoh:

```python
array_random = np.random.randint(
    0,
    10,
    size=(3, 5)
)

print("Shape:", array_random.shape)
print("Dimensions:", array_random.ndim)
print("Size:", array_random.size)
print("Data type:", array_random.dtype)
```

Hasilnya secara konsep:

```text
Shape: (3, 5)
Dimensions: 2
Size: 15
Data type: int64
```

Dengan kebiasaan ini, kita dapat langsung memahami karakteristik array yang baru dibuat.

---

## 18. Menggunakan `Shift + Tab` di Jupyter Notebook

Ketika menggunakan Jupyter Notebook, kita dapat melihat dokumentasi fungsi secara langsung.

Misalnya:

```python
np.ones(
```

Letakkan kursor di dalam tanda kurung dan tekan:

```text
Shift + Tab
```

Jupyter akan menampilkan informasi mengenai fungsi tersebut.

Hal yang biasanya dapat kita lihat antara lain:

- nama fungsi,
- parameter,
- dokumentasi singkat,
- informasi mengenai penggunaan fungsi.

Teknik ini sangat berguna ketika kita lupa parameter sebuah fungsi.

---

## 19. Membaca Dokumentasi sebagai Kebiasaan Belajar

Kita tidak perlu menghafalkan seluruh fungsi NumPy.

Sebagai programmer, kemampuan menemukan dan membaca dokumentasi justru lebih penting.

Misalnya kita lupa bagaimana menggunakan:

```python
np.random.randint()
```

Daripada mencoba menghafalnya, kita dapat memeriksa dokumentasinya.

Kebiasaan yang baik:

```text
Lupa fungsi
    ↓
Cari dokumentasi
    ↓
Periksa parameter
    ↓
Buat contoh sederhana
    ↓
Jalankan kode
    ↓
Amati hasil
```

Dengan pendekatan ini, kita dapat mempelajari library baru dengan lebih mandiri.

---

## 20. Contoh Praktik Lengkap

Berikut contoh yang menggabungkan berbagai cara membuat array:

```python
import numpy as np

# Array dari list
array_manual = np.array([1, 2, 3, 4, 5])

# Array berisi satu
array_ones = np.ones((2, 3))

# Array berisi nol
array_zeros = np.zeros((2, 3))

# Array berdasarkan rentang
array_range = np.arange(0, 10, 2)

# Array integer acak
array_random_int = np.random.randint(
    0,
    10,
    size=(3, 5)
)

# Array float acak
array_random_float = np.random.random((3, 5))

print("Manual:")
print(array_manual)

print("\nOnes:")
print(array_ones)

print("\nZeros:")
print(array_zeros)

print("\nRange:")
print(array_range)

print("\nRandom Integer:")
print(array_random_int)

print("\nRandom Float:")
print(array_random_float)
```

Cobalah menjalankan kode tersebut beberapa kali.

Perhatikan bahwa hasil dari array random dapat berubah setiap kali kode dijalankan.

---

## 21. Randomness dan Reproducibility

Ketika menggunakan angka acak dalam eksperimen, terkadang kita ingin mendapatkan hasil yang sama setiap kali kode dijalankan.

Untuk itu, kita dapat menggunakan random seed.

Contoh dengan API random modern NumPy:

```python
rng = np.random.default_rng(42)

random_array = rng.integers(
    0,
    10,
    size=(3, 5)
)

print(random_array)
```

Dengan seed yang sama:

```python
42
```

generator akan menghasilkan urutan angka yang dapat direproduksi.

Konsep reproducibility sangat penting dalam eksperimen Data Science dan Machine Learning karena kita ingin dapat menjalankan kembali eksperimen dan memperoleh hasil yang konsisten.

---

## 22. Kesalahan yang Sering Terjadi

Beberapa kesalahan umum ketika mulai membuat NumPy array antara lain:

### Salah Memahami `stop` pada `np.arange()`

Perhatikan:

```python
np.arange(0, 10, 2)
```

Hasilnya:

```text
[0 2 4 6 8]
```

Bukan:

```text
[0 2 4 6 8 10]
```

Karena nilai `stop` tidak termasuk.

### Salah Menentukan `size`

Contoh:

```python
np.random.randint(
    0,
    10,
    size=(3, 5)
)
```

menghasilkan 3 baris dan 5 kolom.

Pastikan shape yang diberikan sesuai dengan kebutuhan.

### Menganggap Hasil Random Selalu Sama

Contoh:

```python
np.random.randint(0, 10, size=5)
```

dapat menghasilkan nilai berbeda setiap kali dijalankan.

Jika membutuhkan hasil yang dapat direproduksi, gunakan random seed.

---

## 23. Hubungan dengan Machine Learning

Kemampuan membuat array merupakan dasar penting untuk Machine Learning.

Data Machine Learning sering direpresentasikan dalam bentuk numerik seperti:

```text
[
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
]
```

Struktur tersebut dapat direpresentasikan menggunakan NumPy array.

Kemudian array dapat digunakan dalam berbagai proses seperti:

```text
Data
  ↓
NumPy Array
  ↓
Transformasi
  ↓
Preprocessing
  ↓
Machine Learning Model
```

Semakin memahami cara membuat dan memanipulasi array, semakin mudah memahami operasi data yang digunakan dalam Machine Learning.

---

## 24. Ringkasan

NumPy menyediakan banyak fungsi untuk membuat array dengan cepat.

Beberapa fungsi penting yang telah dipelajari:

- `np.array()` untuk membuat array dari data seperti Python list.
- `np.ones()` untuk membuat array berisi `1`.
- `np.zeros()` untuk membuat array berisi `0`.
- `np.arange()` untuk membuat array berdasarkan rentang angka.
- `np.random.randint()` untuk membuat integer acak.
- `np.random.random()` untuk membuat float acak antara `0.0` dan kurang dari `1.0`.
- `np.random.rand()` sebagai cara lain membuat float acak.
- `random_state` atau seed digunakan untuk membantu menghasilkan eksperimen yang dapat direproduksi.

Hal yang tidak kalah penting adalah membiasakan diri membaca dokumentasi fungsi menggunakan Jupyter Notebook maupun dokumentasi resmi NumPy.

## Checklist

Sebelum melanjutkan ke materi berikutnya, pastikan Anda sudah memahami:

- [ ] Cara membuat NumPy array dari Python list.
- [ ] Cara menggunakan `np.ones()`.
- [ ] Cara menggunakan `np.zeros()`.
- [ ] Cara menggunakan `np.arange()`.
- [ ] Perbedaan `start`, `stop`, dan `step`.
- [ ] Cara menggunakan `np.random.randint()`.
- [ ] Cara menentukan `size` pada array random.
- [ ] Cara menggunakan `np.random.random()`.
- [ ] Perbedaan `np.random.random()` dan `np.random.rand()`.
- [ ] Cara memeriksa `.shape`.
- [ ] Cara memeriksa `.ndim`, `.size`, dan `.dtype`.
- [ ] Mengapa random seed penting untuk reproducibility.
- [ ] Cara menggunakan `Shift + Tab` untuk melihat dokumentasi di Jupyter Notebook.
- [ ] Mengapa memahami dokumentasi lebih penting daripada sekadar menghafalkan fungsi.
