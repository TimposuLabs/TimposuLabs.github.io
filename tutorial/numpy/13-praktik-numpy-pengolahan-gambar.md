---
sidebar_position: 13
title: "Pengolahan Gambar dengan NumPy Array"
---

Pada materi sebelumnya kita telah mempelajari berbagai operasi pada NumPy Array, seperti:

- Membuat array.
- Indexing dan slicing.
- Operasi aritmatika.
- Aggregation.
- Reshape dan transpose.
- Comparison operators.
- Sorting dan pencarian indeks.

Sekarang kita akan melihat bagaimana NumPy digunakan pada **data nyata**, yaitu gambar.

Salah satu konsep penting dalam Machine Learning adalah bahwa data yang akan diproses oleh komputer pada akhirnya harus direpresentasikan dalam bentuk yang dapat dihitung secara numerik.

Gambar merupakan salah satu contoh data yang dapat diubah menjadi kumpulan angka menggunakan NumPy.

Secara sederhana:

```text
Gambar
  ↓
Pixel
  ↓
Nilai numerik
  ↓
NumPy Array
  ↓
Pemrosesan data
  ↓
Machine Learning / Computer Vision
```

## Bagaimana Komputer Merepresentasikan Gambar?

Manusia dapat melihat sebuah gambar dan langsung mengenali objek seperti:

- Anjing.
- Mobil.
- Pohon.
- Rumah.
- Manusia.

Komputer tidak memahami gambar dengan cara yang sama.

Komputer memproses gambar sebagai **kumpulan nilai numerik** yang merepresentasikan piksel.

Setiap gambar tersusun dari banyak piksel.

Sebagai contoh, sebuah gambar sederhana:

```text
+---+---+---+
| P | P | P |
+---+---+---+
| P | P | P |
+---+---+---+
| P | P | P |
+---+---+---+
```

Setiap `P` dapat merepresentasikan satu piksel.

Dalam gambar berwarna, setiap piksel biasanya memiliki beberapa nilai yang merepresentasikan warna.

Salah satu sistem warna yang paling umum adalah **RGB**:

```text
R → Red
G → Green
B → Blue
```

Setiap piksel dapat direpresentasikan sebagai kombinasi nilai:

```text
[R, G, B]
```

Misalnya:

```text
[255, 0, 0]
```

merepresentasikan warna merah dalam sistem RGB 8-bit.

Dengan demikian, gambar dapat direpresentasikan sebagai array multidimensi.

## Gambar sebagai NumPy Array

Ketika gambar dibaca menggunakan library Python tertentu, data gambar dapat direpresentasikan sebagai:

```python
numpy.ndarray
```

Contohnya, gambar RGB dapat memiliki bentuk:

```text
(height, width, channels)
```

Misalnya:

```text
(2330, 3500, 3)
```

Artinya:

```text
Height   = 2330 pixel
Width    = 3500 pixel
Channels = 3
```

Tiga channel tersebut adalah:

```text
Red
Green
Blue
```

Secara konseptual:

```text
Gambar
└── Height
    └── Width
        └── RGB
```

Inilah salah satu alasan NumPy sangat penting dalam Data Science dan Computer Vision.

## Membaca Gambar dengan `imread()`

Salah satu cara sederhana untuk membaca gambar menggunakan Python adalah menggunakan `imread()` dari Matplotlib.

Kita dapat mengimpor:

```python
import matplotlib.pyplot as plt
from matplotlib.image import imread
```

Kemudian membaca sebuah gambar:

```python
panda = imread("images/panda.png")
```

`imread()` merupakan singkatan dari **image read**.

Fungsi ini membaca file gambar dan menghasilkan data gambar yang dapat diproses sebagai array NumPy.

## Contoh Lengkap Membaca Gambar

Misalnya kita memiliki struktur folder:

```text
project/
├── images/
│   ├── panda.png
│   ├── car-photo.png
│   └── dog-photo.png
└── notebook.ipynb
```

Kita dapat membaca gambar panda:

```python
import matplotlib.pyplot as plt
from matplotlib.image import imread

panda = imread("images/panda.png")
```

Untuk memastikan gambar berhasil dibaca:

```python
print(type(panda))
```

Hasilnya umumnya:

```text
<class 'numpy.ndarray'>
```

Hal ini menunjukkan bahwa gambar telah direpresentasikan sebagai **NumPy ndarray**.

## Melihat Gambar dengan Matplotlib

Selain membaca gambar, kita juga dapat menampilkannya menggunakan Matplotlib.

```python
plt.imshow(panda)
plt.axis("off")
plt.show()
```

`plt.imshow()` digunakan untuk menampilkan data gambar.

Sedangkan:

```python
plt.axis("off")
```

digunakan untuk menyembunyikan sumbu koordinat sehingga tampilan lebih menyerupai gambar asli.

## Memeriksa Ukuran Array Gambar

Setelah gambar menjadi NumPy Array, kita dapat menggunakan atribut NumPy yang sudah dipelajari sebelumnya.

### `size`

Atribut `.size` menunjukkan jumlah seluruh elemen dalam array.

```python
print(panda.size)
```

Misalnya gambar memiliki shape:

```text
(2330, 3500, 3)
```

maka jumlah elemennya adalah:

```text
2330 × 3500 × 3
```

yaitu:

```text
24,465,000
```

Jadi terdapat jutaan nilai numerik yang digunakan untuk merepresentasikan gambar tersebut.

## Memeriksa `shape`

Atribut `.shape` sangat penting ketika bekerja dengan gambar.

```python
print(panda.shape)
```

Contoh hasil:

```text
(2330, 3500, 3)
```

Kita dapat menginterpretasikannya sebagai:

```text
Height
  ↓
2330 pixel

Width
  ↓
3500 pixel

Color Channels
  ↓
3 channel
```

Sehingga:

```text
panda.shape

(2330, 3500, 3)
```

berarti:

```text
tinggi × lebar × channel
```

## Memeriksa Jumlah Dimensi dengan `ndim`

Atribut `.ndim` digunakan untuk mengetahui jumlah dimensi array.

```python
print(panda.ndim)
```

Jika hasilnya:

```text
3
```

berarti gambar tersebut direpresentasikan menggunakan **array 3 dimensi**.

Strukturnya dapat dibayangkan seperti:

```text
Dimension 1 → Height
Dimension 2 → Width
Dimension 3 → Color Channel
```

Dengan demikian:

```python
panda.ndim
```

memberikan informasi bahwa array gambar tersebut memiliki tiga dimensi.

## Melihat Nilai Piksel

Karena gambar telah menjadi NumPy Array, kita dapat menggunakan teknik indexing dan slicing untuk melihat sebagian datanya.

Misalnya:

```python
print(panda[:5])
```

Kode tersebut mengambil lima bagian pertama dari dimensi pertama array.

Namun perlu diperhatikan bahwa hasil yang ditampilkan dapat sangat besar karena setiap elemen berisi data piksel.

Untuk melihat bagian yang lebih kecil, kita dapat melakukan slicing pada beberapa dimensi.

Misalnya:

```python
print(panda[:2, :2])
```

Kode tersebut mengambil:

```text
2 baris pertama
2 kolom pertama
```

beserta seluruh channel warna pada bagian tersebut.

Jika menggunakan gambar RGB, hasilnya dapat berbentuk:

```text
[
    [
        [R, G, B],
        [R, G, B]
    ],
    [
        [R, G, B],
        [R, G, B]
    ]
]
```

Dengan demikian, kita dapat melihat bahwa gambar sebenarnya merupakan kumpulan angka.

## Memahami Nilai Piksel

Dalam gambar RGB 8-bit, setiap channel biasanya memiliki rentang:

```text
0 sampai 255
```

Contohnya:

```text
[255, 0, 0]
```

menunjukkan merah.

```text
[0, 255, 0]
```

menunjukkan hijau.

```text
[0, 0, 255]
```

menunjukkan biru.

Sedangkan:

```text
[0, 0, 0]
```

adalah hitam.

Dan:

```text
[255, 255, 255]
```

adalah putih.

Perlu diperhatikan bahwa representasi gambar tidak selalu menggunakan rentang `0–255`. Beberapa library atau format dapat menggunakan representasi lain, misalnya nilai floating-point dalam rentang `0–1`.

Karena itu, jangan mengasumsikan rentang nilai hanya berdasarkan jenis data tanpa memeriksa representasi yang digunakan.

## Memeriksa `dtype` Gambar

Kita juga dapat melihat tipe data array menggunakan `.dtype`.

```python
print(panda.dtype)
```

Contoh hasil dapat berupa:

```text
uint8
```

atau:

```text
float32
```

Tipe data bergantung pada format gambar dan cara gambar tersebut dibaca.

Untuk mengetahui informasi array secara lebih lengkap:

```python
print(type(panda))
print(panda.shape)
print(panda.ndim)
print(panda.size)
print(panda.dtype)
```

Ini merupakan kebiasaan yang baik ketika pertama kali menerima data baru.

## Membaca Gambar Mobil

Proses yang sama dapat diterapkan pada gambar lainnya.

Misalnya gambar mobil:

```python
car = imread("images/car-photo.png")
```

Kemudian kita dapat memeriksa tipenya:

```python
print(type(car))
```

Output umumnya:

```text
<class 'numpy.ndarray'>
```

Kita juga dapat melihat shape:

```python
print(car.shape)
```

dan menampilkan gambar:

```python
plt.imshow(car)
plt.axis("off")
plt.show()
```

## Membaca Gambar Anjing

Kita juga dapat membaca gambar anjing:

```python
dog = imread("images/dog-photo.png")
```

Kemudian:

```python
print(type(dog))
print(dog.shape)
print(dog.ndim)
```

dan menampilkannya:

```python
plt.imshow(dog)
plt.axis("off")
plt.show()
```

Prosesnya tetap sama:

```text
File gambar
    ↓
imread()
    ↓
NumPy ndarray
    ↓
shape / size / ndim / dtype
    ↓
Analisis dan manipulasi
```

## Mengapa Gambar Perlu Diubah Menjadi Angka?

Machine Learning bekerja dengan operasi matematika.

Model Machine Learning tidak menerima konsep seperti:

```text
"ini adalah gambar anjing"
```

sebagai informasi visual secara langsung.

Model menerima representasi numerik dari data.

Pada Computer Vision, representasi tersebut dapat berasal dari nilai-nilai piksel atau representasi fitur yang dipelajari model.

Secara sederhana:

```text
Gambar
  ↓
Pixel
  ↓
Angka
  ↓
Array
  ↓
Fitur / representasi
  ↓
Model Machine Learning
  ↓
Prediksi
```

## Contoh Sederhana Representasi Gambar

Misalnya kita memiliki gambar grayscale kecil berukuran `3 × 3`.

Gambar tersebut dapat direpresentasikan sebagai:

```text
[[  0,  50, 100],
 [150, 200, 250],
 [255, 100,  25]]
```

Setiap angka menunjukkan intensitas piksel.

Model dapat melakukan berbagai operasi matematika terhadap angka tersebut.

Untuk gambar RGB, setiap piksel memiliki beberapa nilai.

Contohnya:

```text
[
    [[255,   0,   0], [0, 255,   0]],
    [[  0,   0, 255], [255, 255, 255]]
]
```

Array tersebut dapat direpresentasikan sebagai array dengan shape:

```text
(2, 2, 3)
```

Artinya:

```text
2 pixel tinggi
2 pixel lebar
3 channel warna
```

## NumPy dalam Computer Vision

NumPy menjadi salah satu fondasi penting dalam pemrosesan data numerik.

Untuk gambar, NumPy memungkinkan kita melakukan berbagai operasi seperti:

- Mengakses piksel.
- Melakukan slicing.
- Mengubah shape.
- Mengubah tipe data.
- Melakukan operasi matematika.
- Membandingkan nilai piksel.
- Menghitung statistik.
- Memanipulasi channel warna.
- Melakukan transformasi data.

Contohnya, kita dapat mengambil satu channel warna dari gambar RGB:

```python
red_channel = panda[:, :, 0]
```

Dengan asumsi:

```text
Channel 0 → Red
Channel 1 → Green
Channel 2 → Blue
```

Kita dapat melihat shape channel tersebut:

```python
print(red_channel.shape)
```

Jika gambar memiliki shape:

```text
(2330, 3500, 3)
```

maka satu channel akan memiliki shape:

```text
(2330, 3500)
```

## Contoh Mengubah Gambar Menjadi Grayscale Secara Sederhana

Untuk memahami konsep array, kita dapat mengambil pendekatan sederhana dengan menghitung rata-rata tiga channel RGB.

Misalnya:

```python
gray = panda[:, :, :3].mean(axis=2)
```

Kode tersebut:

1. Mengambil tiga channel warna.
2. Menghitung rata-rata nilai RGB.
3. Menghasilkan array 2D.

Jika gambar awal memiliki shape:

```text
(height, width, 3)
```

maka hasilnya akan menjadi:

```text
(height, width)
```

Contohnya:

```python
print(panda.shape)
print(gray.shape)
```

Namun, ini merupakan pendekatan sederhana untuk pembelajaran. Dalam aplikasi Computer Vision nyata, konversi grayscale biasanya menggunakan metode atau library khusus agar sesuai dengan standar persepsi warna.

## Dari Data Piksel Menuju Machine Learning

Mengubah gambar menjadi NumPy Array baru merupakan **langkah awal**, bukan berarti gambar tersebut langsung siap digunakan oleh semua model Machine Learning.

Pipeline yang lebih realistis dapat berupa:

```text
Gambar
   ↓
Membaca gambar
   ↓
NumPy Array
   ↓
Validasi dan preprocessing
   ↓
Resize / normalisasi / transformasi
   ↓
Feature representation
   ↓
Model Machine Learning
   ↓
Prediksi
```

Untuk model Computer Vision modern, representasi fitur sering kali dipelajari secara otomatis oleh model, terutama pada Deep Learning.

Contohnya, Convolutional Neural Network atau CNN dapat belajar pola seperti:

```text
Pixel
  ↓
Edge
  ↓
Texture
  ↓
Pattern
  ↓
Object representation
  ↓
Classification
```

Jadi, konsep NumPy Array yang dipelajari di sini menjadi fondasi untuk memahami bagaimana data gambar dapat diproses sebelum masuk ke sistem Machine Learning atau Deep Learning.

## Eksplorasi Data Gambar dengan NumPy

Setelah gambar menjadi NumPy Array, berbagai operasi NumPy yang telah dipelajari sebelumnya dapat diterapkan.

Misalnya mencari nilai piksel minimum:

```python
panda.min()
```

Nilai piksel maksimum:

```python
panda.max()
```

Nilai rata-rata:

```python
panda.mean()
```

Standar deviasi:

```python
panda.std()
```

Kita juga dapat melakukan slicing:

```python
panda[:100, :100]
```

atau memeriksa distribusi nilai:

```python
print(panda.min())
print(panda.max())
print(panda.mean())
print(panda.std())
```

Hal ini menunjukkan bahwa materi NumPy sebelumnya tidak berdiri sendiri.

Konsep seperti:

- Array.
- Shape.
- Axis.
- Indexing.
- Slicing.
- Aggregation.
- Broadcasting.

semuanya dapat digunakan kembali ketika bekerja dengan data gambar.

## Hubungan NumPy dengan Data Science

NumPy merupakan salah satu fondasi penting dalam ekosistem Python untuk Data Science.

Hubungan sederhananya:

```text
NumPy
  ↓
Operasi numerik dan array
  ↓
Pandas
  ↓
Data tabular
  ↓
Matplotlib / Seaborn
  ↓
Visualisasi
  ↓
Scikit-learn
  ↓
Machine Learning
```

Pada data gambar, NumPy dapat menjadi representasi dasar sebelum data diproses menggunakan library Computer Vision atau Deep Learning lainnya.

## Hal yang Perlu Diingat

Beberapa poin penting dari studi kasus ini:

### 1. Gambar Dapat Direpresentasikan sebagai Angka

Gambar digital pada dasarnya terdiri dari piksel yang memiliki nilai numerik.

### 2. NumPy Dapat Merepresentasikan Gambar

Gambar dapat direpresentasikan sebagai:

```python
numpy.ndarray
```

### 3. Shape Memberikan Informasi Struktur Gambar

Untuk gambar RGB yang umum:

```text
(height, width, channels)
```

### 4. Pixel Memiliki Nilai Numerik

Nilai tersebut merepresentasikan intensitas atau informasi warna.

### 5. NumPy Memudahkan Manipulasi Data

Operasi seperti slicing, aggregation, reshape, dan indexing dapat diterapkan pada data gambar.

### 6. Gambar Belum Tentu Langsung Siap untuk Model

Sebelum digunakan dalam Machine Learning atau Deep Learning, data gambar biasanya masih membutuhkan preprocessing dan representasi yang sesuai dengan model.

## Ringkasan

Pada materi ini kita melihat contoh nyata penggunaan NumPy untuk membaca dan merepresentasikan gambar.

Proses sederhananya:

```text
File Gambar
     ↓
imread()
     ↓
NumPy ndarray
     ↓
shape
size
ndim
dtype
     ↓
Manipulasi dengan NumPy
     ↓
Preprocessing
     ↓
Machine Learning / Computer Vision
```

Fungsi dan atribut penting yang digunakan:

| Fungsi / Atribut | Kegunaan |
|---|---|
| `imread()` | Membaca gambar |
| `type()` | Mengetahui tipe objek |
| `.shape` | Mengetahui dimensi/ukuran setiap axis |
| `.size` | Mengetahui jumlah seluruh elemen |
| `.ndim` | Mengetahui jumlah dimensi |
| `.dtype` | Mengetahui tipe data |
| `.min()` | Mencari nilai minimum |
| `.max()` | Mencari nilai maksimum |
| `.mean()` | Menghitung rata-rata |
| `.std()` | Menghitung standar deviasi |

## Checklist Pembelajaran

Setelah menyelesaikan materi ini, Anda seharusnya dapat:

- [ ] Menjelaskan bagaimana komputer merepresentasikan gambar.
- [ ] Menjelaskan konsep pixel dan RGB.
- [ ] Membaca gambar menggunakan `imread()`.
- [ ] Memahami bahwa gambar dapat direpresentasikan sebagai NumPy ndarray.
- [ ] Memeriksa `shape` sebuah gambar.
- [ ] Memeriksa `size` sebuah gambar.
- [ ] Memeriksa jumlah dimensi menggunakan `ndim`.
- [ ] Memeriksa tipe data menggunakan `dtype`.
- [ ] Mengakses sebagian data gambar menggunakan slicing.
- [ ] Menampilkan gambar menggunakan `plt.imshow()`.
- [ ] Memahami hubungan antara NumPy Array dan Computer Vision.
- [ ] Menjelaskan secara sederhana mengapa data gambar perlu direpresentasikan secara numerik untuk Machine Learning.

## Latihan

### Latihan 1 — Membaca Gambar

Siapkan sebuah gambar di dalam folder:

```text
images/
└── image.png
```

Kemudian:

1. Import `imread`.
2. Baca gambar.
3. Tampilkan gambar.
4. Periksa `type`.
5. Periksa `shape`.
6. Periksa `size`.
7. Periksa `ndim`.
8. Periksa `dtype`.

### Latihan 2 — Eksplorasi Nilai Piksel

Gunakan gambar yang sama dan cari:

```python
image.min()
image.max()
image.mean()
image.std()
```

Kemudian jelaskan apa arti masing-masing nilai tersebut.

### Latihan 3 — Slicing Gambar

Ambil sebagian kecil gambar menggunakan slicing.

Contoh:

```python
cropped = image[:200, :200]
```

Kemudian tampilkan hasilnya menggunakan:

```python
plt.imshow(cropped)
plt.axis("off")
plt.show()
```

Perhatikan bagaimana slicing pada NumPy dapat digunakan untuk mengambil bagian tertentu dari gambar.
