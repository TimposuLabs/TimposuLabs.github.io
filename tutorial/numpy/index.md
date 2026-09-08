---
sidebar_position: 1
---

# Pengenalan NumPy

![Numpy](https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/NumPy_logo_2020.svg/330px-NumPy_logo_2020.svg.png?utm_source=id.wikipedia.org&utm_campaign=index&utm_content=thumbnail)

**NumPy** merupakan singkatan dari **Numerical Python**, yaitu library Python yang dirancang untuk melakukan komputasi numerik secara efisien.

NumPy menjadi salah satu fondasi penting dalam ekosistem:

- Data Science
- Machine Learning
- Artificial Intelligence
- Scientific Computing
- Analisis data numerik

Ketika bekerja dengan data dalam jumlah besar, kita sering perlu melakukan berbagai operasi matematika terhadap banyak nilai sekaligus.

NumPy menyediakan struktur data dan operasi yang dirancang khusus untuk kebutuhan tersebut.

---

## Mengapa Perlu Belajar NumPy?

Machine Learning pada dasarnya bekerja dengan **data yang dapat direpresentasikan secara numerik**.

Misalnya, sebuah dataset kendaraan dapat memiliki informasi:

```text
Make       → Toyota
Colour     → White
Odometer   → 150000
Price      → 25000
```

Tidak semua informasi tersebut langsung berbentuk angka.

Sebelum digunakan oleh algoritma Machine Learning, data biasanya perlu diproses dan direpresentasikan dalam bentuk yang dapat dipahami oleh model.

NumPy menyediakan struktur data berupa **array numerik** yang sangat penting dalam proses tersebut.

Secara sederhana:

```text
Data
  ↓
Representasi numerik
  ↓
NumPy Array
  ↓
Pemrosesan data
  ↓
Machine Learning Model
```

Karena alasan tersebut, memahami NumPy akan membantu kita memahami bagaimana data numerik diproses sebelum digunakan dalam Machine Learning.

---

## Peran NumPy dalam Data Science

NumPy bukan library Machine Learning.

NumPy lebih tepat dianggap sebagai **fondasi komputasi numerik** yang digunakan oleh banyak library lainnya.

Dalam ekosistem Python, kita dapat menemukan hubungan seperti:

```text
NumPy
  ↓
Pandas
  ↓
Data Analysis
  ↓
Scikit-Learn
  ↓
Machine Learning
```

Hubungan tersebut tidak berarti semua library hanya bergantung pada NumPy secara langsung dalam setiap operasinya, tetapi NumPy merupakan salah satu fondasi penting dalam ekosistem komputasi data Python.

---

## Peran NumPy dalam Machine Learning

Dalam Machine Learning, kita akan sering bekerja dengan:

- angka,
- matriks,
- vektor,
- data berdimensi banyak,
- operasi matematika,
- transformasi data.

NumPy menyediakan berbagai kemampuan untuk bekerja dengan data tersebut.

Contohnya, sebuah dataset dapat direpresentasikan sebagai array:

```text
[
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
]
```

Struktur seperti ini dapat digunakan untuk merepresentasikan data dalam bentuk numerik.

Model Machine Learning kemudian dapat memproses data tersebut untuk menemukan pola.

Secara sederhana:

```text
Data
   ↓
NumPy Array
   ↓
Operasi numerik
   ↓
Machine Learning
   ↓
Prediksi
```

---

## Keunggulan NumPy

Salah satu alasan NumPy banyak digunakan adalah karena NumPy dirancang untuk melakukan operasi numerik dengan efisien.

### Kecepatan Komputasi

Python merupakan bahasa yang sangat fleksibel dan mudah digunakan, tetapi operasi numerik dalam jumlah sangat besar dapat menjadi kurang efisien jika dilakukan menggunakan Python murni dan loop satu per satu.

NumPy menyediakan implementasi operasi numerik yang dioptimalkan, dengan banyak bagian inti library yang ditulis menggunakan bahasa pemrograman seperti C.

Akibatnya, kita dapat menulis kode Python yang relatif sederhana tetapi tetap memperoleh performa tinggi untuk banyak operasi numerik.

---

## Vektorisasi

Salah satu konsep penting dalam NumPy adalah **vectorization**.

Tanpa NumPy, kita mungkin melakukan operasi terhadap setiap nilai menggunakan loop.

Contohnya secara konsep:

```text
10 + 5
20 + 5
30 + 5
40 + 5
```

Dengan pendekatan NumPy, operasi dapat diterapkan langsung terhadap seluruh array.

Secara konsep:

```text
[10, 20, 30, 40]
        +
        5
        ↓
[15, 25, 35, 45]
```

Pendekatan seperti ini membuat kode menjadi lebih ringkas dan dapat memberikan performa yang baik untuk operasi numerik dalam jumlah besar.

---

## Broadcasting

NumPy juga memiliki konsep **broadcasting**.

Broadcasting memungkinkan operasi dilakukan antara array dengan bentuk tertentu dan nilai atau array lain tanpa harus menulis loop secara manual.

Contoh sederhana:

```text
[10, 20, 30, 40]
        +
        5
        ↓
[15, 25, 35, 45]
```

Nilai `5` secara konseptual diterapkan ke setiap elemen array.

Broadcasting merupakan salah satu kemampuan penting yang akan dipelajari lebih lanjut ketika mulai bekerja dengan array.

---

## Struktur Data Utama: `ndarray`

Struktur data utama yang disediakan NumPy adalah **`ndarray`** atau **N-dimensional array**.

Array ini dapat memiliki berbagai dimensi.

### Array 1 Dimensi

Contohnya:

```text
[10, 20, 30, 40]
```

Struktur ini dapat dianggap sebagai kumpulan angka dalam satu dimensi.

### Array 2 Dimensi

Contohnya:

```text
[
    [10, 20, 30],
    [40, 50, 60]
]
```

Struktur ini menyerupai tabel dengan baris dan kolom.

### Array Multidimensi

NumPy juga dapat digunakan untuk data dengan dimensi yang lebih tinggi.

Contohnya:

```text
[
    [
        [1, 2],
        [3, 4]
    ],
    [
        [5, 6],
        [7, 8]
    ]
]
```

Array multidimensi banyak digunakan dalam berbagai bidang seperti:

- Machine Learning
- Deep Learning
- Computer Vision
- Scientific Computing

---

## NumPy dan Pandas

NumPy dan Pandas memiliki hubungan yang sangat dekat dalam ekosistem Data Science.

Secara sederhana:

| Library | Fokus Utama |
|---|---|
| NumPy | Komputasi numerik dan array |
| Pandas | Manipulasi dan analisis data berbentuk tabel |
| Matplotlib | Visualisasi data |
| Scikit-Learn | Machine Learning |

Pandas sangat sering digunakan untuk mengolah dataset berbentuk tabel, sedangkan NumPy sangat kuat untuk operasi numerik dan array.

Contoh workflow:

```text
Data mentah
    ↓
Pandas
    ↓
Membersihkan dan memahami data
    ↓
NumPy
    ↓
Operasi numerik
    ↓
Scikit-Learn
    ↓
Machine Learning
```

Dalam praktiknya, library-library tersebut dapat digunakan bersama dalam satu workflow.

---

## Apa yang Akan Dipelajari di NumPy?

Setelah memahami pengenalan ini, kita akan mempelajari NumPy secara bertahap.

Beberapa topik utama yang akan dibahas antara lain:

### 1. Membuat NumPy Array

Kita akan belajar membuat array dari berbagai sumber data.

Contohnya:

```python
import numpy as np

a = np.array([1, 2, 3, 4])
```

### 2. Memahami Atribut Array

Kita akan mempelajari informasi mengenai array seperti:

- dimensi,
- bentuk,
- ukuran,
- tipe data.

### 3. Memilih dan Mengubah Data

Kita akan belajar mengambil elemen tertentu dan melakukan manipulasi terhadap array.

### 4. Operasi Matematika

NumPy menyediakan berbagai operasi numerik seperti:

- penjumlahan,
- pengurangan,
- perkalian,
- pembagian,
- statistik dasar,
- dan operasi matematika lainnya.

### 5. Membandingkan Array

Array dapat dibandingkan menggunakan berbagai operator untuk menghasilkan kondisi Boolean.

### 6. Mengurutkan Data

NumPy juga menyediakan kemampuan untuk melakukan sorting terhadap array.

### 7. Bekerja dengan Array Multidimensi

Kita akan mempelajari bagaimana array dengan lebih dari satu dimensi digunakan dan dimanipulasi.

---

## NumPy dalam Workflow Machine Learning

NumPy dapat muncul pada berbagai bagian workflow Machine Learning.

Contohnya:

```text
1. Mengumpulkan data
       ↓
2. Memahami data
       ↓
3. Membersihkan data
       ↓
4. Mengubah data menjadi numerik
       ↓
5. Memproses array
       ↓
6. Membagi dataset
       ↓
7. Melatih model
       ↓
8. Mengevaluasi model
       ↓
9. Melakukan eksperimen
```

NumPy dapat membantu pada berbagai tahap yang membutuhkan operasi numerik.

Namun, kita tidak harus menggunakan NumPy secara langsung untuk setiap operasi.

Library seperti Pandas dan Scikit-Learn juga menyediakan abstraksi yang lebih tinggi untuk berbagai kebutuhan.

---

## NumPy Bukan Pengganti Pandas

NumPy dan Pandas memiliki tujuan yang berbeda meskipun keduanya sering digunakan bersama.

Misalnya, ketika bekerja dengan dataset kendaraan:

```text
Make       Colour    Odometer    Price
Toyota     White     150000      25000
Honda      Black     120000      22000
BMW        Red        90000      40000
```

Pandas sangat nyaman digunakan untuk:

- membaca CSV,
- memilih kolom,
- menangani missing values,
- melakukan filtering,
- melakukan grouping,
- melakukan eksplorasi data.

Sedangkan NumPy lebih berfokus pada:

- array numerik,
- operasi matematika,
- manipulasi array,
- komputasi numerik.

Keduanya bukan kompetitor.

Keduanya dapat digunakan bersama.

---

## Strategi Belajar NumPy

Ketika mulai mempelajari NumPy, jangan hanya menghafalkan fungsi.

Lebih penting untuk memahami bagaimana sebuah array bekerja.

Fokuskan pembelajaran pada:

```text
Array
  ↓
Shape
  ↓
Index
  ↓
Data Type
  ↓
Operation
  ↓
Manipulation
```

Setelah memahami konsep tersebut, berbagai fungsi NumPy akan menjadi lebih mudah dipahami.

---

## Belajar dengan Praktik

Saat belajar NumPy, sebaiknya langsung mencoba setiap contoh menggunakan Jupyter Notebook.

Misalnya:

```python
import numpy as np

numbers = np.array([1, 2, 3, 4, 5])

numbers
```

Kemudian lakukan eksperimen sendiri:

```python
numbers * 2
```

Cobalah mengganti nilai:

```python
numbers + 10
```

Atau:

```python
numbers / 2
```

Dengan mencoba sendiri, kita dapat melihat bagaimana NumPy bekerja secara langsung.

---

## Strategi Menghadapi Error

Error merupakan bagian normal dalam proses belajar pemrograman.

Jika menemukan error ketika menggunakan NumPy, gunakan pendekatan berikut.

### 1. Jalankan Kode

Jangan hanya membaca kode.

Tulis dan jalankan kode tersebut di Jupyter Notebook.

```python
import numpy as np

numbers = np.array([1, 2, 3, 4, 5])

numbers
```

### 2. Eksperimen

Ubahlah kode dan lihat hasilnya.

Misalnya:

```python
numbers * 2
```

kemudian:

```python
numbers * 10
```

Perhatikan perubahan hasilnya.

### 3. Baca Pesan Error

Pesan error biasanya memberikan informasi mengenai masalah yang terjadi.

Jangan langsung mengabaikannya.

Biasakan membaca bagian akhir dari error terlebih dahulu untuk mengetahui jenis masalah yang terjadi.

### 4. Gunakan Dokumentasi

Dokumentasi resmi NumPy merupakan salah satu sumber utama ketika kita ingin memahami suatu fungsi atau mencari solusi.

Biasakan mencari:

- nama fungsi,
- parameter,
- tipe data yang diterima,
- contoh penggunaan,
- nilai yang dikembalikan.

### 5. Cari Referensi Tambahan

Selain dokumentasi, kita dapat menggunakan sumber pembelajaran lain seperti:

- forum pemrograman,
- Stack Overflow,
- GitHub,
- artikel teknis,
- komunitas Python.

Yang penting adalah memahami **mengapa** solusi tersebut bekerja, bukan sekadar menyalin kode.

---

## Prinsip Penting dalam Belajar NumPy

Beberapa prinsip yang perlu dibiasakan:

1. **Jalankan kode secara langsung.**
2. **Jangan takut melakukan eksperimen.**
3. **Baca pesan error.**
4. **Pahami konsep sebelum menghafalkan fungsi.**
5. **Gunakan dokumentasi sebagai referensi utama.**
6. **Hubungkan NumPy dengan kebutuhan Data Science dan Machine Learning.**

Prinsip sederhana yang sangat berguna adalah:

```text
Jika ragu, jalankan kode.
```

Dengan menjalankan kode, kita dapat melihat perilaku sebenarnya dan membandingkannya dengan apa yang kita pikirkan.

---

## Kesimpulan

NumPy atau **Numerical Python** merupakan library penting untuk komputasi numerik dalam Python.

Beberapa hal penting yang perlu dipahami:

- NumPy berfokus pada komputasi numerik.
- Struktur data utamanya adalah `ndarray`.
- NumPy dapat bekerja dengan array satu dimensi maupun multidimensi.
- NumPy mendukung operasi matematika secara efisien.
- Vectorization membantu melakukan operasi terhadap banyak data tanpa loop manual.
- Broadcasting memungkinkan operasi antara array dan nilai atau array lain dengan bentuk yang sesuai.
- NumPy merupakan salah satu fondasi penting dalam ekosistem Data Science dan Machine Learning.
- NumPy dan Pandas memiliki fokus berbeda tetapi sering digunakan bersama.
- Memahami NumPy akan membantu kita memahami bagaimana data numerik diproses dalam Machine Learning.

NumPy bukan sekadar library yang perlu dihafalkan. Yang lebih penting adalah memahami **cara data numerik direpresentasikan dan dimanipulasi menggunakan array**.

## Checklist

Sebelum melanjutkan ke materi berikutnya, pastikan Anda sudah memahami:

- [ ] Apa itu NumPy.
- [ ] Kepanjangan dari NumPy.
- [ ] Mengapa NumPy penting dalam Data Science.
- [ ] Mengapa NumPy penting dalam Machine Learning.
- [ ] Apa itu `ndarray`.
- [ ] Perbedaan array satu dimensi dan multidimensi.
- [ ] Konsep dasar vectorization.
- [ ] Konsep dasar broadcasting.
- [ ] Perbedaan fokus NumPy dan Pandas.
- [ ] Mengapa NumPy banyak digunakan dalam ekosistem Python.
- [ ] Cara belajar NumPy melalui eksperimen dan dokumentasi.
