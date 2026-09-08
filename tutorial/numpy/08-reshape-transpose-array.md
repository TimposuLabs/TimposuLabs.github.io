---
sidebar_position: 9
title: "Reshape & Transpose Array"
---

Pada materi sebelumnya kita telah mempelajari operasi aritmatika, broadcasting, aggregation, variance, standard deviation, dan visualisasi data menggunakan NumPy.

Dalam praktik Data Science dan Machine Learning, kita akan sering menemukan data dengan bentuk atau **shape** yang berbeda.

Sebuah algoritma atau operasi tertentu mungkin membutuhkan data dengan bentuk tertentu. Jika shape tidak sesuai, operasi dapat menghasilkan error atau menghasilkan bentuk output yang tidak kita inginkan.

NumPy menyediakan beberapa fitur penting untuk mengatur bentuk array, di antaranya:

- `reshape()`
- Transpose dengan `.T`
- `np.transpose()`

Pada materi ini kita akan memahami bagaimana mengubah dan menukar dimensi array dengan benar.

---

## Mengapa Shape Penting?

Setiap NumPy array memiliki sebuah **shape** yang menunjukkan ukuran array pada setiap dimensinya.

Contohnya:

```python
import numpy as np

A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

print(A.shape)
```

Output:

```text
(2, 3)
```

Artinya:

- Memiliki 2 baris.
- Memiliki 3 kolom.
- Total terdapat 6 elemen.

Shape:

```text
(2, 3)
```

berbeda dengan:

```text
(3, 2)
```

Walaupun keduanya sama-sama memiliki 6 elemen.

---

## Mengapa Shape Penting dalam Machine Learning?

Banyak operasi numerik dan algoritma Machine Learning memiliki persyaratan tertentu terhadap bentuk data.

Misalnya sebuah model dapat mengharapkan input berbentuk:

```text
(samples, features)
```

Jika data memiliki shape yang berbeda, kita mungkin perlu menyesuaikannya terlebih dahulu.

Shape juga sangat penting ketika:

- Melakukan operasi matematika.
- Menggunakan broadcasting.
- Memproses dataset.
- Mengubah format input model.
- Melakukan operasi matriks.
- Mengolah data multidimensi.

Karena itu, `.shape` merupakan salah satu atribut yang sebaiknya selalu diperhatikan ketika bekerja dengan NumPy.

---

## Mengubah Shape dengan `reshape()`

Fungsi `reshape()` digunakan untuk mengubah bentuk array tanpa mengubah nilai elemen yang terdapat di dalamnya.

Contohnya:

```python
A = np.array([1, 2, 3, 4, 5, 6])

print(A.shape)
```

Output:

```text
(6,)
```

Array tersebut dapat diubah menjadi bentuk `(2, 3)`:

```python
A_reshaped = A.reshape(2, 3)

print(A_reshaped)
print(A_reshaped.shape)
```

Output:

```text
[[1 2 3]
 [4 5 6]]

(2, 3)
```

Nilai datanya tetap sama:

```text
1, 2, 3, 4, 5, 6
```

Yang berubah adalah **bentuk array**.

---

## Syarat Menggunakan `reshape()`

Jumlah total elemen sebelum dan sesudah `reshape()` harus sama.

Misalnya:

```text
6 elemen
```

dapat diubah menjadi:

```text
(2, 3)
```

karena:

```text
2 × 3 = 6
```

Kita juga dapat mengubahnya menjadi:

```text
(3, 2)
```

karena:

```text
3 × 2 = 6
```

Atau:

```text
(1, 6)
```

karena:

```text
1 × 6 = 6
```

Namun tidak dapat menjadi:

```text
(4, 2)
```

karena:

```text
4 × 2 = 8
```

sedangkan array hanya memiliki 6 elemen.

---

## Contoh `reshape()`

```python
A = np.array([1, 2, 3, 4, 5, 6])

A1 = A.reshape(2, 3)
A2 = A.reshape(3, 2)
A3 = A.reshape(1, 6)

print(A1)
print(A2)
print(A3)
```

Ketiga hasil tersebut memiliki bentuk yang berbeda, tetapi seluruhnya menggunakan enam elemen yang sama.

---

## `reshape()` dan Broadcasting

Salah satu penggunaan `reshape()` yang penting adalah membantu menyesuaikan shape array agar memenuhi aturan **broadcasting**.

Misalnya:

```python
A2 = np.random.randint(
    10,
    size=(2, 3)
)

A3 = np.random.randint(
    10,
    size=(2, 3, 3)
)
```

Periksa shape:

```python
print(A2.shape)
print(A3.shape)
```

Output:

```text
(2, 3)
(2, 3, 3)
```

Jika kita mencoba:

```python
A2 * A3
```

operasi tersebut tidak kompatibel secara langsung.

NumPy akan menghasilkan error broadcasting karena dimensi yang dibandingkan dari belakang tidak sesuai.

---

## Menyesuaikan Shape dengan `reshape()`

Kita dapat mengubah `A2` menjadi:

```python
A2_reshaped = A2.reshape(2, 3, 1)

print(A2_reshaped.shape)
```

Output:

```text
(2, 3, 1)
```

Sekarang kita memiliki:

```text
A2_reshaped → (2, 3, 1)
A3          → (2, 3, 3)
```

Pada dimensi terakhir:

```text
1
3
```

kedua dimensi tersebut kompatibel karena salah satunya bernilai `1`.

Maka:

```python
result = A2_reshaped * A3
```

dapat dilakukan menggunakan broadcasting.

---

## Memahami reshape dan Broadcasting

Perhatikan perubahan berikut:

```text
Sebelum:

A2 → (2, 3)
A3 → (2, 3, 3)

        ↓

Tidak kompatibel
```

Kemudian:

```text
A2.reshape(2, 3, 1)

        ↓

A2 → (2, 3, 1)
A3 → (2, 3, 3)

        ↓

Broadcasting
        ↓

Berhasil
```

Perlu dipahami bahwa `reshape()` tidak secara otomatis membuat semua operasi menjadi valid.

Shape yang baru tetap harus memenuhi aturan operasi yang ingin dilakukan.

---

## Menggunakan `-1` pada `reshape()`

NumPy memungkinkan kita menggunakan `-1` pada `reshape()` agar NumPy menghitung ukuran dimensi tersebut secara otomatis.

Contohnya:

```python
A = np.array([1, 2, 3, 4, 5, 6])

A_reshaped = A.reshape(2, -1)

print(A_reshaped)
```

NumPy mengetahui bahwa total elemen adalah 6.

Karena dimensi pertama adalah `2`, maka dimensi kedua harus:

```text
6 ÷ 2 = 3
```

Sehingga hasilnya:

```text
[[1 2 3]
 [4 5 6]]
```

Shape:

```text
(2, 3)
```

Contoh lain:

```python
A.reshape(-1, 2)
```

akan menghasilkan shape:

```text
(3, 2)
```

### Catatan

Dalam satu operasi `reshape()`, hanya satu dimensi yang sebaiknya menggunakan `-1` agar ukuran yang harus dihitung dapat ditentukan secara unik.

---

## Transpose

Selain `reshape()`, NumPy menyediakan operasi **transpose**.

Transpose digunakan untuk menukar urutan dimensi atau sumbu array.

Untuk array dua dimensi, transpose secara sederhana dapat dipahami sebagai:

```text
Baris ↔ Kolom
```

Contohnya:

```python
A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])
```

Shape awal:

```text
(2, 3)
```

---

## Menggunakan `.T`

Cara sederhana untuk melakukan transpose adalah menggunakan `.T`.

```python
A_transposed = A.T

print(A_transposed)
print(A_transposed.shape)
```

Output:

```text
[[1 4]
 [2 5]
 [3 6]]

(3, 2)
```

Perhatikan:

```text
Sebelum:
(2, 3)

Sesudah transpose:
(3, 2)
```

Baris menjadi kolom dan kolom menjadi baris.

---

## Cara Memahami Transpose

Array awal:

```text
1  2  3
4  5  6
```

Setelah transpose:

```text
1  4
2  5
3  6
```

Dengan kata lain:

```text
Baris pertama → Kolom pertama
Baris kedua   → Kolom kedua
```

Transpose tidak mengubah nilai elemen, tetapi mengubah bagaimana elemen tersebut tersusun berdasarkan dimensinya.

---

## `np.transpose()`

Selain `.T`, NumPy menyediakan fungsi:

```python
np.transpose()
```

Contohnya:

```python
A_transposed = np.transpose(A)

print(A_transposed)
```

Hasilnya sama dengan:

```python
A.T
```

Untuk array dua dimensi, kedua pendekatan tersebut dapat digunakan.

```python
A.T
```

lebih singkat, sedangkan:

```python
np.transpose(A)
```

lebih eksplisit sebagai fungsi NumPy.

---

## Perbedaan `reshape` dan `transpose`

Walaupun keduanya dapat mengubah shape, `reshape()` dan transpose memiliki tujuan yang berbeda.

### `reshape()`

`reshape()` digunakan untuk mengatur ulang bentuk array dengan jumlah elemen yang tetap sama.

Contoh:

```python
A = np.array([1, 2, 3, 4, 5, 6])

A.reshape(2, 3)
```

dapat menghasilkan:

```text
[[1 2 3]
 [4 5 6]]
```

---

### Transpose

Transpose digunakan untuk menukar urutan dimensi atau axis.

Contoh:

```python
A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

A.T
```

menghasilkan:

```text
[[1 4]
 [2 5]
 [3 6]]
```

---

## Tabel Perbandingan

| Fitur | `reshape()` | `.T` / `np.transpose()` |
|---|---|---|
| Tujuan | Mengubah shape | Menukar urutan axis |
| Jumlah elemen | Tetap sama | Tetap sama |
| Bentuk baru | Dapat ditentukan | Ditentukan dari transpose |
| Array 2D | Bisa menjadi banyak bentuk | Baris ↔ kolom |
| Cocok untuk | Menyesuaikan struktur | Menukar orientasi dimensi |

Contoh sederhana:

```text
reshape:

(6,)
 ↓
(2, 3)
```

Sedangkan:

```text
transpose:

(2, 3)
 ↓
(3, 2)
```

---

## reshape Tidak Sama dengan Transpose

Perhatikan contoh berikut:

```python
A = np.array([
    [1, 2, 3],
    [4, 5, 6]
])
```

Jika menggunakan:

```python
A.reshape(3, 2)
```

hasilnya:

```text
[[1 2]
 [3 4]
 [5 6]]
```

Sedangkan:

```python
A.T
```

menghasilkan:

```text
[[1 4]
 [2 5]
 [3 6]]
```

Keduanya sama-sama menghasilkan shape:

```text
(3, 2)
```

tetapi susunan datanya berbeda.

Ini merupakan perbedaan yang sangat penting.

**Shape yang sama tidak selalu berarti susunan data yang sama.**

---

## Reshape pada Array Multidimensi

`reshape()` juga dapat digunakan pada array dengan lebih dari dua dimensi.

Contohnya:

```python
A = np.arange(24)

print(A.shape)
```

Output:

```text
(24,)
```

Array tersebut dapat diubah menjadi:

```python
A_3d = A.reshape(2, 3, 4)

print(A_3d.shape)
```

Output:

```text
(2, 3, 4)
```

Jumlah elemennya tetap:

```text
2 × 3 × 4 = 24
```

---

## Transpose pada Array Multidimensi

Pada array multidimensi, transpose tidak hanya berarti "baris menjadi kolom".

Transpose bekerja dengan **menukar urutan axis**.

Contohnya:

```python
A = np.zeros((2, 3, 4))

print(A.shape)
```

Output:

```text
(2, 3, 4)
```

Jika menggunakan:

```python
A.T
```

shape menjadi:

```text
(4, 3, 2)
```

Urutan axis dibalik:

```text
(2, 3, 4)
 ↓
(4, 3, 2)
```

Hal ini penting ketika bekerja dengan data multidimensi seperti:

- Gambar.
- Video.
- Tensor.
- Data scientific computing.
- Input neural network.

---

## Menentukan Urutan Axis dengan `np.transpose()`

Untuk kontrol yang lebih spesifik, `np.transpose()` dapat menerima urutan axis.

Contohnya:

```python
A = np.zeros((2, 3, 4))

B = np.transpose(A, (1, 0, 2))

print(B.shape)
```

Hasil:

```text
(3, 2, 4)
```

Artinya urutan axis:

```text
(0, 1, 2)
```

diubah menjadi:

```text
(1, 0, 2)
```

Konsep ini akan semakin penting ketika mulai bekerja dengan data yang memiliki tiga dimensi atau lebih.

---

## Memeriksa Shape Setelah Transformasi

Setiap kali melakukan `reshape()` atau transpose, biasakan memeriksa hasilnya.

```python
A = np.zeros((2, 3))

print("Original:", A.shape)

B = A.reshape(3, 2)

print("Reshaped:", B.shape)

C = A.T

print("Transposed:", C.shape)
```

Dengan cara tersebut kita dapat memastikan bahwa bentuk array sesuai dengan yang diharapkan.

---

## Reshape dan Machine Learning

Dalam Machine Learning, shape data sangat penting karena model biasanya mengharapkan format input tertentu.

Misalnya:

```text
(samples, features)
```

Jika terdapat:

```text
100 samples
5 features
```

maka bentuk data dapat berupa:

```text
(100, 5)
```

Jika data memiliki bentuk berbeda, kita mungkin perlu melakukan transformasi terlebih dahulu.

Namun, transformasi harus dilakukan berdasarkan **makna data**, bukan hanya untuk membuat error hilang.

Jangan melakukan:

```python
reshape()
```

secara sembarangan hanya karena sebuah operasi menghasilkan error.

Kita harus memahami:

- Apa arti setiap dimensi.
- Berapa jumlah sample.
- Berapa jumlah feature.
- Bentuk input yang dibutuhkan.
- Operasi apa yang sedang dilakukan.

---

## Debugging Shape

Ketika menemukan error yang berhubungan dengan shape, gunakan workflow berikut:

```text
Error
 ↓
Periksa shape
 ↓
print(array.shape)
 ↓
Periksa ndim
 ↓
Pahami arti setiap dimensi
 ↓
Periksa aturan broadcasting
 ↓
Tentukan apakah perlu reshape
 ↓
Tentukan apakah perlu transpose
 ↓
Jalankan kembali operasi
```

Contohnya:

```python
print(A.shape)
print(B.shape)
```

Jika masih belum jelas:

```python
print(A.ndim)
print(B.ndim)
```

Kebiasaan sederhana ini dapat membantu menemukan banyak masalah saat bekerja dengan NumPy.

---

## Kesalahan yang Sering Terjadi

### Menganggap reshape Mengubah Data

`reshape()` mengubah **bentuk** array, bukan nilai datanya.

Namun, susunan elemen pada hasil `reshape()` dapat terlihat berbeda karena cara elemen disusun dalam bentuk baru.

---

### Menganggap `reshape` dan `transpose` Sama

Keduanya dapat menghasilkan shape yang berbeda dari bentuk awal, tetapi cara kerjanya berbeda.

`reshape()` mengatur bentuk baru berdasarkan jumlah elemen.

Transpose menukar urutan axis.

---

### Hanya Melihat Shape

Dua array dapat memiliki shape yang sama tetapi susunan nilai yang berbeda.

Contoh:

```python
A.reshape(3, 2)
```

dan:

```python
A.T
```

dapat menghasilkan shape yang sama tetapi isi yang tersusun berbeda.

Karena itu, periksa juga isi array jika sedang melakukan debugging.

---

### Menggunakan reshape untuk Semua Error

Tidak semua error shape diselesaikan dengan `reshape()`.

Terkadang yang dibutuhkan adalah:

- Transpose.
- Memperbaiki cara indexing.
- Mengubah struktur data.
- Menyesuaikan operasi.
- Memastikan data memang memiliki bentuk yang benar.

---

## Ringkasan

Pada materi ini kita telah mempelajari:

- Shape menunjukkan ukuran array pada setiap dimensi.
- `reshape()` digunakan untuk mengubah bentuk array.
- Jumlah total elemen harus tetap sama setelah `reshape()`.
- `-1` dapat digunakan agar NumPy menghitung salah satu dimensi secara otomatis.
- `reshape()` dapat digunakan untuk membantu menyesuaikan shape dalam broadcasting.
- Transpose digunakan untuk menukar urutan axis.
- `.T` merupakan cara sederhana melakukan transpose.
- `np.transpose()` menyediakan fungsi transpose dengan kontrol yang lebih fleksibel.
- Pada array 2D, transpose dapat dipahami sebagai pertukaran baris dan kolom.
- Pada array multidimensi, transpose bekerja dengan menukar urutan axis.
- `reshape()` dan transpose memiliki tujuan yang berbeda.
- Dua array dengan shape yang sama belum tentu memiliki susunan data yang sama.
- `.shape` dan `.ndim` merupakan alat penting untuk debugging array.
- Shape sangat penting dalam Data Science dan Machine Learning.

---

## Checklist Pembelajaran

Pastikan Anda sudah memahami:

- [ ] Apa yang dimaksud dengan shape.
- [ ] Mengapa shape penting dalam NumPy.
- [ ] Cara menggunakan `reshape()`.
- [ ] Syarat jumlah elemen pada `reshape()`.
- [ ] Cara menggunakan `-1` pada `reshape()`.
- [ ] Hubungan `reshape()` dengan broadcasting.
- [ ] Apa yang dimaksud dengan transpose.
- [ ] Cara menggunakan `.T`.
- [ ] Cara menggunakan `np.transpose()`.
- [ ] Perbedaan `reshape()` dan transpose.
- [ ] Perbedaan transpose pada array 2D dan multidimensi.
- [ ] Cara menentukan urutan axis menggunakan `np.transpose()`.
- [ ] Cara menggunakan `.shape` untuk debugging.
- [ ] Mengapa tidak semua error shape dapat diselesaikan dengan `reshape()`.

---

## Latihan

Gunakan array berikut:

```python
A = np.arange(24)

print(A)
print(A.shape)
```

Kemudian lakukan latihan berikut:

1. Ubah `A` menjadi array dengan shape `(2, 12)`.
2. Ubah `A` menjadi shape `(3, 8)`.
3. Ubah `A` menjadi shape `(4, 6)`.
4. Gunakan `-1` untuk menghasilkan shape `(6, 4)`.
5. Ubah `A` menjadi array tiga dimensi dengan shape `(2, 3, 4)`.
6. Gunakan `.T` pada array tiga dimensi tersebut.
7. Periksa shape sebelum dan sesudah transpose.
8. Buat array 2D dengan shape `(3, 4)`.
9. Bandingkan hasil `reshape(4, 3)` dengan `.T`.
10. Perhatikan mengapa keduanya dapat memiliki shape yang sama tetapi susunan data berbeda.
11. Buat contoh broadcasting yang menghasilkan error.
12. Gunakan `reshape()` untuk membuat shape yang kompatibel dan coba kembali operasi tersebut.

Tujuan latihan ini bukan hanya membuat kode berjalan, tetapi memahami **bagaimana shape memengaruhi cara NumPy memperlakukan data**.
