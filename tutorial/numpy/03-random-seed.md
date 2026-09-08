---
sidebar_position: 4
title: "Random Seed"
---

Seperti yang sudah dibahas pada materi sebelumnya, NumPy menyediakan berbagai fungsi untuk membuat array secara cepat dan efisien.

Kita tidak selalu perlu memasukkan setiap angka secara manual. NumPy menyediakan fungsi seperti:

- `np.array()`
- `np.ones()`
- `np.zeros()`
- `np.arange()`
- `np.random.randint()`
- `np.random.random()`

Selain membuat array, NumPy juga menyediakan kemampuan untuk menghasilkan angka **pseudo-random**.

Angka random banyak digunakan dalam Data Science dan Machine Learning, misalnya untuk:

- membuat data simulasi,
- melakukan eksperimen,
- mengacak data,
- inisialisasi,
- pengujian algoritma,
- dan berbagai kebutuhan komputasi numerik.

Pada materi ini kita juga akan mempelajari **random seed**, yaitu konsep penting untuk membuat eksperimen dapat direproduksi.

---

## 1. Membuat Array dari Python List

Cara paling dasar untuk membuat NumPy array adalah menggunakan `np.array()`.

Contoh:

```python
import numpy as np

sample_array = np.array([1, 2, 3])

print(sample_array)
```

Output:

```text
[1 2 3]
```

`np.array()` dapat digunakan untuk mengubah struktur data seperti Python list menjadi NumPy `ndarray`.

Kita juga dapat memeriksa tipe objek:

```python
type(sample_array)
```

Hasil:

```text
numpy.ndarray
```

---

## 2. Membuat Array dengan `np.ones()`

Fungsi `np.ones()` digunakan untuk membuat array yang seluruh elemennya bernilai `1`.

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

Shape:

```text
(2, 3)
```

berarti:

```text
2 baris × 3 kolom
```

Secara visual:

```text
1   1   1
1   1   1
```

### Menentukan Tipe Data

Secara default, `np.ones()` menghasilkan floating point.

Jika membutuhkan integer, kita dapat menentukan `dtype`:

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

## 3. Membuat Array dengan `np.zeros()`

Fungsi `np.zeros()` digunakan untuk membuat array yang seluruh elemennya bernilai `0`.

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

Sama seperti `np.ones()`, kita juga dapat menentukan tipe datanya:

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

## 4. Kegunaan `np.zeros()` dan `np.ones()`

Array yang berisi nol atau satu sering digunakan sebagai array awal atau **placeholder**.

Misalnya kita ingin membuat array dengan ukuran tertentu terlebih dahulu:

```python
data = np.zeros(5)

print(data)
```

Hasil:

```text
[0. 0. 0. 0. 0.]
```

Array tersebut nantinya dapat digunakan dalam proses komputasi tertentu.

Dalam Machine Learning dan komputasi numerik, teknik inisialisasi seperti ini dapat muncul dalam berbagai konteks.

---

## 5. Membuat Array dengan `np.arange()`

Fungsi `np.arange()` digunakan untuk membuat array berdasarkan rentang angka.

Sintaks:

```python
np.arange(start, stop, step)
```

Parameter:

| Parameter | Keterangan |
|---|---|
| `start` | Nilai awal |
| `stop` | Batas akhir |
| `step` | Jarak antar nilai |

Contoh:

```python
range_array = np.arange(
    0,
    10,
    2
)

print(range_array)
```

Output:

```text
[0 2 4 6 8]
```

Perhatikan bahwa `10` tidak termasuk dalam hasil.

Dengan demikian:

```python
np.arange(0, 10, 2)
```

berarti:

```text
Mulai dari 0
Berhenti sebelum 10
Naik 2 setiap langkah
```

---

## 6. Contoh `np.arange()`

Jika hanya memberikan satu parameter:

```python
numbers = np.arange(5)

print(numbers)
```

hasilnya:

```text
[0 1 2 3 4]
```

Secara konsep:

```python
np.arange(5)
```

menggunakan:

```text
start = 0
step = 1
stop = 5
```

Nilai `5` tidak termasuk.

Kita juga dapat membuat urutan menurun:

```python
numbers = np.arange(
    10,
    0,
    -2
)

print(numbers)
```

Output:

```text
[10 8 6 4 2]
```

---

## 7. Membuat Array dengan Nilai Acak

NumPy menyediakan modul `random` untuk menghasilkan angka pseudo-random.

Istilah **pseudo-random** digunakan karena angka tersebut dihasilkan menggunakan algoritma komputer, bukan benar-benar muncul secara acak seperti fenomena fisik.

Contoh sederhana:

```python
np.random.randint(0, 10)
```

Setiap kali dijalankan, kita dapat memperoleh angka yang berbeda.

Angka random banyak digunakan dalam:

- simulasi,
- eksperimen,
- pengujian,
- sampling,
- Machine Learning,
- dan berbagai proses numerik.

---

## 8. Membuat Integer Acak dengan `np.random.randint()`

Fungsi `np.random.randint()` digunakan untuk membuat bilangan bulat secara pseudo-random.

Sintaks:

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
[[3 8 1 6 4]
 [7 2 9 0 5]
 [1 4 6 8 2]]
```

Hasil sebenarnya dapat berbeda setiap kali kode dijalankan.

### Memahami `low` dan `high`

Pada:

```python
np.random.randint(0, 10)
```

nilai yang dapat dihasilkan adalah:

```text
0 sampai 9
```

Nilai `10` tidak termasuk.

Aturannya:

```text
low  → termasuk
high → tidak termasuk
```

---

## 9. Menentukan Ukuran Array Random

Parameter `size` menentukan bentuk array yang ingin dibuat.

Contoh:

```python
random_array = np.random.randint(
    0,
    10,
    size=(3, 5)
)
```

menghasilkan:

```text
3 baris × 5 kolom
```

Jika:

```python
size=(2, 4)
```

maka hasilnya:

```text
2 baris × 4 kolom
```

Sedangkan:

```python
size=5
```

akan menghasilkan array satu dimensi dengan 5 elemen.

---

## 10. Membuat Float Acak dengan `np.random.random()`

Fungsi `np.random.random()` digunakan untuk menghasilkan angka desimal pseudo-random dalam rentang:

```text
0.0 <= nilai < 1.0
```

Contoh:

```python
random_array = np.random.random((5, 3))

print(random_array)
```

Contoh output:

```text
[[0.21 0.74 0.35]
 [0.89 0.12 0.53]
 [0.46 0.67 0.08]
 [0.31 0.95 0.42]
 [0.73 0.16 0.58]]
```

Angka yang dihasilkan akan berbeda setiap kali program dijalankan jika kita tidak mengatur seed.

---

## 11. Perbandingan Array Random

Kita sekarang memiliki beberapa cara untuk membuat data random.

| Fungsi | Jenis Data | Rentang |
|---|---|---|
| `np.random.randint()` | Integer | `low` hingga sebelum `high` |
| `np.random.random()` | Float | `0.0` hingga kurang dari `1.0` |

Contoh:

```python
random_integer = np.random.randint(
    0,
    10,
    size=5
)

random_float = np.random.random(5)
```

Hasilnya dapat berupa:

```text
Integer:
[2 8 1 5 7]

Float:
[0.23 0.71 0.42 0.08 0.94]
```

---

## 12. Apa Itu Random Seed?

Ketika menggunakan fungsi random, hasilnya biasanya berubah setiap kali kode dijalankan.

Misalnya:

```python
np.random.randint(0, 10, size=5)
```

Pada eksekusi pertama:

```text
[3 8 1 6 4]
```

Pada eksekusi berikutnya:

```text
[7 2 9 0 5]
```

Pada eksekusi berikutnya lagi:

```text
[1 4 6 8 2]
```

Perubahan tersebut dapat menjadi masalah ketika kita sedang melakukan eksperimen.

Misalnya kita menemukan hasil Machine Learning yang bagus, tetapi ketika kode dijalankan kembali, data random berubah sehingga hasil eksperimen juga berubah.

Untuk mengatasi hal tersebut, kita dapat menggunakan **random seed**.

---

## 13. Menggunakan `np.random.seed()`

`np.random.seed()` digunakan untuk mengatur titik awal dari generator pseudo-random pada API random lama NumPy.

Contoh:

```python
np.random.seed(0)

random_array = np.random.randint(
    0,
    10,
    size=(3, 5)
)

print(random_array)
```

Jika kode tersebut dijalankan kembali dengan seed yang sama:

```python
np.random.seed(0)
```

sebelum menghasilkan angka random, urutan hasil pseudo-random akan dapat direproduksi.

Contoh:

```python
np.random.seed(0)

print(np.random.randint(0, 10, size=5))
```

Kemudian jalankan kembali:

```python
np.random.seed(0)

print(np.random.randint(0, 10, size=5))
```

Hasilnya akan sama.

---

## 14. Mengapa Random Seed Penting?

Random seed sangat berguna dalam eksperimen Data Science dan Machine Learning.

Misalnya kita sedang membandingkan dua model:

```text
Model A
    ↓
Eksperimen
    ↓
Score = 85%

Model B
    ↓
Eksperimen
    ↓
Score = 88%
```

Jika proses pengacakan data berbeda pada setiap eksperimen, perbandingan tersebut dapat menjadi kurang konsisten.

Dengan random seed:

```text
Seed yang sama
      ↓
Data random yang dapat direproduksi
      ↓
Eksperimen
      ↓
Hasil dapat dibandingkan
```

Hal ini disebut **reproducibility**.

---

## 15. Reproducibility dalam Machine Learning

Reproducibility berarti eksperimen dapat dijalankan kembali dengan kondisi yang sama dan menghasilkan hasil yang konsisten atau dapat dijelaskan ulang.

Contohnya:

```text
Kode
  +
Dataset
  +
Parameter
  +
Random Seed
  ↓
Eksperimen
  ↓
Hasil
```

Jika salah satu komponen berubah, hasil eksperimen juga dapat berubah.

Karena itu, dalam project Machine Learning, kita sering mencatat:

- dataset yang digunakan,
- preprocessing,
- model,
- hyperparameter,
- random seed,
- evaluation metric,
- dan hasil eksperimen.

---

## 16. Random Seed Bukan Membuat Angka Menjadi Tidak Acak

Penting untuk dipahami bahwa random seed **tidak menghilangkan sifat pseudo-random**.

Seed hanya menentukan titik awal dari proses pembangkitan angka pseudo-random.

Contohnya:

```python
np.random.seed(42)

np.random.randint(0, 10, size=5)
```

dan:

```python
np.random.seed(100)

np.random.randint(0, 10, size=5)
```

dapat menghasilkan urutan berbeda karena seed yang digunakan berbeda.

Namun, jika seed yang sama digunakan kembali pada kondisi yang sama, urutan yang dihasilkan dapat direproduksi.

---

## 17. Menggunakan Random Generator Modern

Untuk kode baru, NumPy juga menyediakan API random modern menggunakan `np.random.default_rng()`.

Contoh:

```python
rng = np.random.default_rng(42)

random_array = rng.integers(
    0,
    10,
    size=(3, 5)
)

print(random_array)
```

Kita juga dapat menghasilkan float random:

```python
rng = np.random.default_rng(42)

random_array = rng.random((3, 5))

print(random_array)
```

Pendekatan ini lebih disarankan untuk kode baru karena memberikan generator random yang dapat digunakan secara eksplisit dan lebih mudah dikontrol.

Namun, `np.random.seed()` tetap penting untuk dipahami karena masih banyak ditemukan dalam tutorial, notebook, dan kode Machine Learning.

---

## 18. Perbandingan `np.random.seed()` dan `default_rng()`

| Pendekatan | Contoh | Keterangan |
|---|---|---|
| Legacy random state | `np.random.seed(42)` | Banyak ditemukan pada kode lama dan tutorial |
| Modern Generator | `np.random.default_rng(42)` | Direkomendasikan untuk kode baru |

Contoh legacy:

```python
np.random.seed(42)

numbers = np.random.randint(
    0,
    10,
    size=5
)
```

Contoh modern:

```python
rng = np.random.default_rng(42)

numbers = rng.integers(
    0,
    10,
    size=5
)
```

Keduanya memiliki tujuan yang berkaitan dengan reproducibility, tetapi API modern memberikan kontrol yang lebih eksplisit terhadap generator random.

---

## 19. Tips Menggunakan Random Seed

Beberapa kebiasaan yang baik ketika melakukan eksperimen:

### Gunakan Seed yang Konsisten

Misalnya:

```python
seed = 42
```

Kemudian gunakan seed tersebut secara konsisten pada eksperimen yang membutuhkan randomness.

### Catat Seed

Jika sebuah eksperimen menghasilkan hasil penting, catat seed yang digunakan.

Contoh:

```text
Random seed: 42
```

### Jangan Menganggap Seed sebagai Angka Khusus

Tidak ada keharusan menggunakan:

```python
42
```

Kita dapat menggunakan angka lain.

Contohnya:

```python
np.random.seed(0)
```

atau:

```python
rng = np.random.default_rng(123)
```

Yang penting adalah konsistensi ketika membutuhkan hasil yang dapat direproduksi.

---

## 20. Menggunakan `Shift + Tab` di Jupyter Notebook

Ketika lupa parameter sebuah fungsi, kita dapat menggunakan bantuan Jupyter Notebook.

Misalnya:

```python
np.random.randint(
```

Letakkan kursor di dalam tanda kurung dan tekan:

```text
Shift + Tab
```

Jupyter akan menampilkan informasi mengenai fungsi tersebut.

Teknik ini dapat digunakan untuk fungsi seperti:

```python
np.array()
np.ones()
np.zeros()
np.arange()
np.random.randint()
np.random.random()
```

Dengan demikian, kita tidak harus menghafalkan semua parameter.

---

## 21. Contoh Praktik Lengkap

Berikut contoh yang menggabungkan berbagai fungsi yang telah dipelajari:

```python
import numpy as np

# Membuat array dari list
array_manual = np.array([1, 2, 3, 4, 5])

# Membuat array berisi satu
array_ones = np.ones((2, 3))

# Membuat array berisi nol
array_zeros = np.zeros((2, 3))

# Membuat array berdasarkan rentang
array_range = np.arange(0, 10, 2)

# Membuat integer random
array_random_int = np.random.randint(
    0,
    10,
    size=(3, 5)
)

# Membuat float random
array_random_float = np.random.random((3, 5))

print("Array manual:")
print(array_manual)

print("\nArray ones:")
print(array_ones)

print("\nArray zeros:")
print(array_zeros)

print("\nArray range:")
print(array_range)

print("\nRandom integer:")
print(array_random_int)

print("\nRandom float:")
print(array_random_float)
```

---

## 22. Contoh Reproducibility

Sekarang kita dapat membuat eksperimen random yang dapat direproduksi.

Menggunakan API random modern:

```python
import numpy as np

rng = np.random.default_rng(42)

random_array = rng.integers(
    0,
    10,
    size=(3, 5)
)

print(random_array)
```

Jika notebook atau program dijalankan kembali dengan generator dan seed yang sama:

```python
rng = np.random.default_rng(42)
```

hasilnya dapat direproduksi.

Hal ini sangat berguna ketika kita ingin:

- membandingkan eksperimen,
- debugging,
- membuat tutorial,
- melakukan penelitian,
- atau membagikan notebook kepada orang lain.

---

## 23. Hubungan dengan Machine Learning

Randomness muncul dalam berbagai bagian Machine Learning.

Contohnya:

```text
Dataset
   ↓
Shuffle / Sampling
   ↓
Train-Test Split
   ↓
Model Training
   ↓
Evaluation
```

Beberapa algoritma dan proses Machine Learning juga dapat menggunakan randomness.

Jika random state tidak dikontrol, hasil eksperimen dapat berubah.

Karena itu, konsep random seed akan terus muncul ketika kita mempelajari:

- train-test split,
- cross-validation,
- model training,
- hyperparameter tuning,
- ensemble methods,
- dan eksperimen Machine Learning.

---

## 24. Ringkasan

Pada materi ini kita mempelajari berbagai cara membuat NumPy array.

### Array Dasar

```python
np.array()
```

digunakan untuk membuat array dari data yang tersedia seperti Python list.

### Array Berisi Satu

```python
np.ones()
```

digunakan untuk membuat array yang seluruh elemennya bernilai `1`.

### Array Berisi Nol

```python
np.zeros()
```

digunakan untuk membuat array yang seluruh elemennya bernilai `0`.

### Array Berdasarkan Rentang

```python
np.arange()
```

digunakan untuk membuat urutan angka berdasarkan `start`, `stop`, dan `step`.

### Integer Random

```python
np.random.randint()
```

digunakan untuk menghasilkan bilangan bulat pseudo-random.

### Float Random

```python
np.random.random()
```

digunakan untuk menghasilkan bilangan desimal pseudo-random antara `0.0` dan kurang dari `1.0`.

### Random Seed

```python
np.random.seed()
```

dapat digunakan untuk mengatur random state global pada API random lama sehingga hasil pseudo-random dapat direproduksi.

Untuk kode baru, kita juga dapat menggunakan:

```python
np.random.default_rng()
```

yang menyediakan pendekatan random generator modern.

---

## Checklist

Sebelum melanjutkan ke materi berikutnya, pastikan Anda sudah memahami:

- [ ] Cara membuat array menggunakan `np.array()`.
- [ ] Cara membuat array menggunakan `np.ones()`.
- [ ] Cara membuat array menggunakan `np.zeros()`.
- [ ] Cara menentukan `dtype`.
- [ ] Cara menggunakan `np.arange()`.
- [ ] Perbedaan `start`, `stop`, dan `step`.
- [ ] Cara membuat integer random dengan `np.random.randint()`.
- [ ] Cara menentukan `size` pada array random.
- [ ] Cara membuat float random dengan `np.random.random()`.
- [ ] Apa yang dimaksud dengan pseudo-random.
- [ ] Apa yang dimaksud dengan random seed.
- [ ] Mengapa random seed penting untuk reproducibility.
- [ ] Cara menggunakan `np.random.seed()`.
- [ ] Mengenal `np.random.default_rng()`.
- [ ] Mengapa random seed penting dalam eksperimen Machine Learning.
- [ ] Cara menggunakan `Shift + Tab` untuk melihat dokumentasi fungsi di Jupyter Notebook.
