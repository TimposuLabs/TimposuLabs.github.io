---
sidebar_position: 8
title: "Eksplorasi: Matriks Korelasi"
---

Setelah mempelajari Scatter Plot, Histogram, dan perbandingan antarfitur, kita akan melanjutkan Exploratory Data Analysis (EDA) menggunakan **Correlation Matrix (Matriks Korelasi)**.

Matriks korelasi merupakan tabel yang menunjukkan arah dan kekuatan hubungan statistik antara pasangan variabel. Dalam project Heart Disease Classification, matriks ini membantu kita memeriksa hubungan antarfitur dan hubungan setiap fitur dengan variabel target.

Untuk mempermudah pembacaan, kita akan memvisualisasikan matriks tersebut menggunakan **Heatmap** dari Seaborn.

## 1. Memahami Koefisien Korelasi

Koefisien korelasi Pearson memiliki nilai antara `-1` dan `1`.

| Nilai korelasi | Interpretasi umum |
|---|---|
| Mendekati `1` | Hubungan linear positif yang kuat |
| Mendekati `0` | Hubungan linear yang lemah atau tidak ada |
| Mendekati `-1` | Hubungan linear negatif yang kuat |

Interpretasi kekuatan korelasi bergantung pada konteks bidang penelitian. Nilai yang mendekati nol tidak selalu berarti kedua variabel tidak memiliki hubungan sama sekali, karena hubungan nonlinier mungkin tetap ada.

### Korelasi Positif

Korelasi positif menunjukkan bahwa ketika satu variabel meningkat, variabel lainnya cenderung meningkat juga.

Contoh sederhana:

- Usia dan variabel lain yang memiliki hubungan positif.
- Dua variabel numerik yang cenderung meningkat secara bersamaan.

Korelasi positif tidak selalu berarti satu variabel menyebabkan variabel lainnya meningkat.

### Korelasi Negatif

Korelasi negatif menunjukkan bahwa ketika satu variabel meningkat, variabel lainnya cenderung menurun.

Contohnya, pada dataset tertentu, usia dapat menunjukkan hubungan negatif dengan detak jantung maksimal (`thalach`).

### Korelasi Mendekati Nol

Korelasi yang mendekati nol menunjukkan bahwa hubungan linear antara dua variabel relatif lemah.

Namun, kedua variabel mungkin masih memiliki hubungan nonlinier atau pola lain yang tidak dapat dijelaskan oleh korelasi Pearson.

## 2. Menghitung Matriks Korelasi dengan Pandas

Pandas menyediakan fungsi `corr()` untuk menghitung korelasi antar kolom numerik.

### Kode Program

```python
corr_matrix = df.corr(numeric_only=True)

corr_matrix
```

### Penjelasan Kode

- `df` adalah DataFrame yang menyimpan dataset Heart Disease.
- `corr()` menghitung koefisien korelasi antar kolom.
- `numeric_only=True` membatasi perhitungan pada kolom numerik.
- `corr_matrix` adalah variabel yang menyimpan hasil matriks korelasi.

Secara default, Pandas menggunakan korelasi Pearson. Perhitungan dilakukan berdasarkan pasangan nilai yang tersedia untuk setiap pasangan kolom, dengan mengabaikan nilai yang hilang pada pasangan tersebut.

### Contoh Output

Berikut ilustrasi matriks korelasi sederhana:

```text
          age  thalach  exang  target
age      1.00    -0.40   0.10   -0.20
thalach -0.40     1.00  -0.38    0.42
exang    0.10    -0.38   1.00   -0.44
target  -0.20     0.42  -0.44    1.00
```

**Catatan:** Angka pada tabel di atas merupakan contoh ilustrasi untuk menjelaskan cara membaca matriks, bukan hasil perhitungan aktual dari dataset yang digunakan.

### Cara Membaca Matriks Korelasi

Misalnya, pada tabel ilustrasi:

- `age` dan `thalach` memiliki korelasi `-0.40`, yang menunjukkan hubungan linear negatif.
- `thalach` dan `target` memiliki korelasi `0.42`, yang menunjukkan hubungan positif dalam pengodean target tersebut.
- `exang` dan `target` memiliki korelasi `-0.44`, yang menunjukkan hubungan negatif dalam pengodean target tersebut.

Untuk mengetahui nilai sebenarnya, jalankan kode pada dataset yang sedang digunakan.

### Mengapa Diagonal Bernilai 1?

Nilai diagonal utama pada matriks korelasi selalu `1.0` untuk variabel numerik yang memiliki variasi dan dapat dihitung korelasinya.

Hal ini terjadi karena setiap variabel dibandingkan dengan dirinya sendiri.

Sebagai contoh:

- Korelasi `age` dengan `age` adalah `1.0`.
- Korelasi `thalach` dengan `thalach` adalah `1.0`.
- Korelasi `target` dengan `target` adalah `1.0`, jika target memiliki variasi nilai.

## 3. Membuat Heatmap dengan Seaborn

Matriks korelasi yang memiliki banyak kolom dapat sulit dibaca dalam bentuk tabel. Heatmap membantu menampilkan nilai korelasi menggunakan warna.

### Kode Program

```python
import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(15, 15))

sns.heatmap(
    corr_matrix,
    annot=True,
    linewidths=0.5,
    fmt=".2f",
    cmap="YlGnBu"
)

plt.title("Heart Disease Correlation Matrix")
plt.tight_layout()
plt.show()
```

![Scatter Plot](/img/python/69.webp)

### Penjelasan Kode

| Kode | Fungsi |
|---|---|
| `plt.figure(figsize=(15, 15))` | Menentukan ukuran gambar dalam inci |
| `sns.heatmap()` | Membuat visualisasi matriks dalam bentuk Heatmap |
| `annot=True` | Menampilkan angka korelasi di setiap sel |
| `linewidths=0.5` | Memberikan jarak atau garis pemisah antar sel |
| `fmt=".2f"` | Menampilkan angka dengan dua digit desimal |
| `cmap="YlGnBu"` | Menggunakan palet warna kuning, hijau, dan biru |
| `plt.title()` | Memberikan judul grafik |
| `plt.tight_layout()` | Mengatur tata letak agar elemen grafik tidak bertumpuk |
| `plt.show()` | Menampilkan grafik |

### Cara Membaca Heatmap

Setiap kotak pada Heatmap mewakili korelasi antara dua variabel.

- Angka positif menunjukkan arah hubungan positif.
- Angka negatif menunjukkan arah hubungan negatif.
- Angka yang mendekati nol menunjukkan hubungan linear yang relatif lemah.
- Angka pada diagonal utama menunjukkan korelasi variabel dengan dirinya sendiri.

Warna membantu kita mengenali pola secara visual, sedangkan angka di dalam kotak memberikan nilai yang lebih tepat.

Warna tertentu tidak selalu memiliki arti positif atau negatif yang universal karena bergantung pada palet warna yang digunakan. Karena itu, selalu perhatikan angka korelasi dan color bar pada grafik.

## 4. Mengatasi Heatmap yang Terpotong

Pada beberapa kombinasi versi Matplotlib dan Seaborn, batas sumbu dapat menyebabkan bagian Heatmap terlihat terpotong.

Jika hal ini terjadi, periksa batas sumbu Y dan sesuaikan bila diperlukan.

```python
bottom, top = plt.ylim()

plt.ylim(bottom + 0.5, top - 0.5)
```

Penjelasan:

- `plt.ylim()` mengambil batas bawah dan batas atas sumbu Y.
- `plt.ylim(bottom + 0.5, top - 0.5)` mengubah batas tersebut.

Kode ini merupakan penyesuaian tampilan yang dapat digunakan jika memang terjadi masalah pemotongan. Kode tersebut tidak wajib dijalankan pada setiap Heatmap.

Jika grafik sudah tampil dengan benar, cukup gunakan `plt.tight_layout()`.

## 5. Menganalisis Korelasi pada Dataset Heart Disease

Setelah Heatmap berhasil dibuat, kita dapat memeriksa hubungan beberapa fitur dengan target.

### Hubungan `cp` dengan `target`

Kolom `cp` merupakan kode kategori jenis nyeri dada, sedangkan `target` merupakan label kelas penyakit jantung.

Pada dataset klasik yang digunakan dalam project ini, nilai `target = 1` menunjukkan kelas positif.

Jika korelasi Pearson antara `cp` dan `target` bernilai positif, hal tersebut menunjukkan hubungan linear positif berdasarkan angka kode yang digunakan.

Namun, `cp` adalah fitur kategorikal yang direpresentasikan dengan angka. Angka `0`, `1`, `2`, dan `3` tidak otomatis menunjukkan tingkatan yang berurutan.

Karena itu, korelasi Pearson pada `cp` harus ditafsirkan dengan hati-hati. Tabel silang atau analisis berdasarkan kategori dapat memberikan pemahaman yang lebih sesuai.

### Hubungan `exang` dengan `target`

Kolom `exang` merepresentasikan exercise-induced angina, yaitu angina yang dipicu oleh aktivitas fisik, sesuai definisi dataset.

Dalam dataset klasik, pengodean yang umum digunakan adalah:

- `exang = 1`: kondisi tersebut tercatat ada.
- `exang = 0`: kondisi tersebut tercatat tidak ada.

Jika korelasi `exang` dengan `target` bernilai negatif, artinya nilai `exang` yang lebih tinggi cenderung berhubungan dengan nilai `target` yang lebih rendah dalam data.

Karena target menggunakan kode `0` dan `1`, arah korelasi bergantung pada pengodean tersebut. Hasil ini bukan bukti sebab-akibat dan bukan diagnosis medis.

### Hubungan `fbs` dengan `target`

Kolom `fbs` pada dataset klasik merepresentasikan kategori gula darah puasa berdasarkan ambang yang didefinisikan dalam dokumentasi dataset.

Jika korelasinya mendekati nol, hubungan linear antara kode `fbs` dan `target` pada dataset mungkin relatif lemah.

Namun, nilai korelasi yang kecil tidak otomatis berarti fitur tersebut tidak berguna bagi model. Kegunaan suatu fitur dapat bergantung pada interaksinya dengan fitur lain dan algoritma yang digunakan.

## 6. Hal yang Perlu Diperhatikan Saat Membaca Correlation Matrix

Correlation Matrix merupakan alat eksplorasi yang berguna, tetapi memiliki beberapa keterbatasan.

### Korelasi Bukan Sebab-Akibat

Korelasi menunjukkan hubungan statistik, bukan bukti bahwa satu variabel menyebabkan perubahan pada variabel lain.

### Korelasi Pearson Berfokus pada Hubungan Linear

Hubungan nonlinier dapat tidak terwakili dengan baik oleh koefisien Pearson.

### Kode Kategori Perlu Ditafsirkan Hati-hati

Fitur seperti `cp` merupakan kategori yang dikodekan menggunakan angka. Korelasi Pearson dapat memberikan gambaran awal, tetapi tidak selalu menjadi ukuran hubungan yang paling sesuai untuk kategori tersebut.

### Korelasi Tidak Langsung Menentukan Fitur Terbaik

Fitur dengan korelasi tinggi terhadap target belum tentu selalu menghasilkan model terbaik. Sebaliknya, fitur dengan korelasi rendah dapat membantu prediksi melalui interaksi dengan fitur lain.

Pemilihan fitur perlu diuji melalui eksperimen dan evaluasi model yang benar.

## 7. Ringkasan

Pada materi ini, kita telah mempelajari:

1. Pengertian koefisien korelasi dengan rentang nilai `-1` hingga `1`.
2. Cara menghitung matriks korelasi menggunakan `df.corr()`.
3. Cara membuat Heatmap dengan Seaborn.
4. Arti nilai diagonal utama pada matriks korelasi.
5. Cara menginterpretasikan hubungan fitur dengan target secara hati-hati.
6. Keterbatasan korelasi dalam menentukan hubungan sebab-akibat dan kegunaan fitur.

Matriks korelasi melengkapi EDA dengan memberikan gambaran ringkas mengenai hubungan antarvariabel. Hasilnya dapat menjadi dasar untuk merancang eksperimen Machine Learning, tetapi tetap perlu dikonfirmasi melalui pemodelan dan evaluasi.
