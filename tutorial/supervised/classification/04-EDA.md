---
sidebar_position: 5
title: "Exploratory Data Analysis" 
---

**Exploratory Data Analysis (EDA)** adalah proses mengeksplorasi dan memahami dataset sebelum melakukan pemodelan Machine Learning.

Pada project **Heart Disease Classification** ini, EDA membantu kita memahami karakteristik data pasien, distribusi target, tipe data, statistik dasar, serta kemungkinan masalah yang perlu ditangani sebelum model dilatih.

Tujuan utama EDA adalah menjadi lebih memahami data (*subject matter understanding*) sehingga kita dapat mengambil keputusan yang tepat selama proses pengembangan model.

## 1. Memuat Dataset

Langkah pertama adalah memuat dataset Heart Disease ke dalam Pandas DataFrame.

Pastikan file `heart-disease.csv` berada di direktori kerja yang sesuai dengan lokasi Jupyter Notebook.

```python
import pandas as pd

df = pd.read_csv("heart-disease.csv")

df.head()
```

Penjelasan:

- `pd.read_csv()` digunakan untuk membaca file CSV.
- `df` merupakan variabel yang menyimpan dataset dalam bentuk DataFrame.
- `df.head()` menampilkan lima baris pertama secara default.

### Memeriksa Ukuran Dataset

Gunakan atribut `shape` untuk mengetahui jumlah baris dan kolom.

```python
df.shape
```

Pada dataset yang digunakan dalam project ini, hasil yang diharapkan adalah:

```text
(303, 14)
```

Artinya, dataset memiliki **303 baris dan 14 kolom**, termasuk kolom target.

Jumlah baris menunjukkan banyaknya sampel pasien, sedangkan jumlah kolom menunjukkan banyaknya variabel yang tersedia.

Hasil tersebut dapat berbeda apabila menggunakan versi dataset yang berbeda.

## 2. Tujuan Exploratory Data Analysis

EDA tidak hanya bertujuan untuk menampilkan data, tetapi juga membantu kita memahami informasi yang terkandung di dalamnya.

Beberapa tujuan utama EDA adalah:

- Memahami struktur dan karakteristik dataset.
- Mengetahui tipe data setiap kolom.
- Memeriksa distribusi kelas target.
- Mengidentifikasi missing values dan kemungkinan outliers.
- Menemukan pola atau hubungan antarvariabel.
- Menentukan langkah preprocessing dan feature engineering yang diperlukan.

Pemahaman data juga membantu kita melakukan *sanity check* terhadap hasil pemodelan. Misalnya, jika model memperoleh skor yang sangat tinggi, kita perlu memastikan bahwa hasil tersebut bukan disebabkan oleh data leakage atau kesalahan pembagian data.

## 3. Checklist Dasar EDA

Berikut checklist yang dapat digunakan ketika mengeksplorasi dataset:

| No. | Pertanyaan | Tujuan |
|---|---|---|
| 1 | Masalah apa yang ingin diselesaikan? | Memastikan eksplorasi sesuai dengan tujuan project |
| 2 | Jenis data apa yang tersedia? | Memahami data numerik dan kategorikal |
| 3 | Apakah terdapat missing values? | Menentukan kebutuhan penanganan data kosong |
| 4 | Apakah terdapat outliers? | Memeriksa nilai ekstrem dan kemungkinan penyebabnya |
| 5 | Apakah fitur perlu ditambah, diubah, atau dihapus? | Menentukan kemungkinan feature engineering |

Checklist ini bukan aturan yang kaku. Langkah EDA dapat disesuaikan dengan karakteristik dataset dan kebutuhan penelitian.

## 4. Memeriksa Baris Data

Pandas menyediakan beberapa fungsi untuk melihat isi DataFrame.

### Melihat Baris Pertama

```python
df.head()
```

Untuk menampilkan sepuluh baris pertama:

```python
df.head(10)
```

### Melihat Baris Terakhir

```python
df.tail()
```

Fungsi ini membantu kita melihat contoh data pada bagian akhir dataset dan memeriksa apakah struktur datanya konsisten.

## 5. Menganalisis Variabel Target

Pada project Heart Disease Classification, kolom `target` digunakan sebagai variabel yang ingin diprediksi oleh model.

Dalam versi dataset yang digunakan pada materi ini:

- `1` menunjukkan kelas positif atau adanya indikasi penyakit jantung menurut definisi dataset.
- `0` menunjukkan kelas negatif atau tidak adanya indikasi penyakit jantung menurut definisi dataset.

Label tersebut merupakan definisi dataset, bukan diagnosis medis terhadap seseorang.

### Menghitung Jumlah Setiap Kelas

Gunakan `value_counts()` untuk mengetahui jumlah sampel pada setiap kelas.

```python
df["target"].value_counts()
```

Hasil yang diharapkan:

```text
target
1    165
0    138
Name: count, dtype: int64
```

Hasil tersebut menunjukkan bahwa terdapat:

- 165 sampel pada kelas `1`.
- 138 sampel pada kelas `0`.

Jumlah sampel kedua kelas relatif berdekatan sehingga distribusi target pada dataset ini cukup seimbang. Namun, kondisi tersebut tidak otomatis menjamin model akan memiliki performa yang baik.

### Membuat Plot Jumlah Setiap Kelas

Gunalan `plot()` untuk melakukan visualisasi jumlah setiap kelas.

```python
df["target"].value_counts().plot(kind="bar", color=["salmon", "lightblue"]);
```

![Plot](/img/python/63.webp)

Visualisasi data sangat efektif untuk melihat distribusi data karena mengubah angka-angka mentah yang kompleks menjadi bentuk grafis yang intuitif.

### Memeriksa Proporsi Kelas

Kita juga dapat melihat proporsi setiap kelas dalam bentuk persentase.

```python
df["target"].value_counts(normalize=True) * 100
```

Proporsi kelas berguna untuk memahami distribusi target sebelum memilih metrik evaluasi dan strategi pembagian data.

### Visualisasi Distribusi Target

Gunakan Matplotlib dan Seaborn untuk membuat diagram batang.

```python
import matplotlib.pyplot as plt
import seaborn as sns

sns.countplot(data=df, x="target")

plt.title("Distribution of Heart Disease Target")
plt.xlabel("Target Class")
plt.ylabel("Number of Patients")
plt.show()
```

Diagram batang membantu kita membandingkan jumlah sampel pada setiap kelas secara visual.

Visualisasi ini juga memudahkan penyampaian informasi kepada pembaca yang belum terbiasa membaca tabel statistik.

## 6. Memeriksa Informasi DataFrame

Gunakan `info()` untuk melihat informasi umum dataset.

```python
df.info()
```

Informasi yang ditampilkan meliputi:

- Jumlah baris.
- Nama kolom.
- Jumlah nilai non-null pada setiap kolom.
- Tipe data setiap kolom.
- Perkiraan penggunaan memori.

Contoh informasi yang dapat diperiksa adalah apakah kolom tertentu memiliki jumlah nilai non-null yang lebih sedikit daripada jumlah total baris.

Jika terdapat perbedaan, kolom tersebut mungkin memiliki missing values.

Perlu diingat bahwa `info()` menunjukkan jumlah nilai non-null, bukan seluruh pemeriksaan kualitas data. Nilai yang tidak valid atau nilai khusus seperti `?` masih dapat memerlukan pemeriksaan tambahan.

## 7. Memeriksa Statistik Deskriptif

Gunakan `describe()` untuk memperoleh ringkasan statistik kolom numerik.

```python
df.describe()
```

Statistik yang ditampilkan antara lain:

| Statistik | Penjelasan |
|---|---|
| `count` | Jumlah nilai non-null |
| `mean` | Nilai rata-rata |
| `std` | Standar deviasi |
| `min` | Nilai minimum |
| `25%` | Kuartil pertama |
| `50%` | Median atau kuartil kedua |
| `75%` | Kuartil ketiga |
| `max` | Nilai maksimum |

Statistik tersebut membantu kita memahami rentang nilai, pusat distribusi, dan variasi data.

Sebagai contoh, kolom `age` dapat diperiksa untuk mengetahui usia minimum, maksimum, median, dan rata-rata pasien.

Perlu diperhatikan bahwa angka statistik yang diperoleh bergantung pada versi dataset yang digunakan. Selain itu, rata-rata kode kategorikal tidak selalu memiliki makna praktis sehingga perlu ditafsirkan berdasarkan definisi masing-masing fitur.

## 8. Memeriksa Missing Values

Walaupun dataset pada materi ini sering dijelaskan tidak memiliki missing values, kita tetap perlu memeriksanya secara langsung.

```python
df.isna().sum()
```

Kode tersebut menampilkan jumlah nilai `NaN` pada setiap kolom.

Untuk mengetahui jumlah missing values secara keseluruhan:

```python
df.isna().sum().sum()
```

Jika hasilnya `0`, berarti tidak ditemukan nilai `NaN` dalam DataFrame.

Namun, pemeriksaan ini tidak selalu mendeteksi seluruh nilai yang secara semantik berarti kosong. Pada beberapa dataset, nilai seperti `?`, string kosong, atau kode khusus dapat digunakan untuk merepresentasikan data yang tidak tersedia.

## 9. Ringkasan Kode EDA

Berikut contoh urutan kode untuk melakukan pemeriksaan awal dataset dalam satu rangkaian.

```python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset
df = pd.read_csv("heart-disease.csv")

# Inspect dataset
print("Dataset shape:", df.shape)

display(df.head())
display(df.tail())

# Check target distribution
display(df["target"].value_counts())
display(df["target"].value_counts(normalize=True) * 100)

# Visualize target distribution
sns.countplot(data=df, x="target")
plt.title("Distribution of Heart Disease Target")
plt.xlabel("Target Class")
plt.ylabel("Number of Patients")
plt.show()

# Check DataFrame information
df.info()

# Descriptive statistics
display(df.describe())

# Check missing values
display(df.isna().sum())
```

Kode tersebut merupakan pemeriksaan awal. Pada tahap selanjutnya, kita akan melakukan eksplorasi lebih mendalam untuk memahami hubungan antarfitur.

## Ringkasan

Pada materi ini, kita telah mempelajari beberapa teknik dasar EDA menggunakan Pandas, Matplotlib, dan Seaborn:

1. Memuat dataset menggunakan `pd.read_csv()`.
2. Memeriksa ukuran data menggunakan `df.shape`.
3. Melihat baris pertama dan terakhir dengan `df.head()` dan `df.tail()`.
4. Menganalisis distribusi target menggunakan `value_counts()`.
5. Memvisualisasikan distribusi target dengan diagram batang.
6. Memeriksa struktur dataset menggunakan `df.info()`.
7. Memahami statistik deskriptif menggunakan `df.describe()`.
8. Memeriksa missing values menggunakan `df.isna().sum()`.

EDA membantu kita memahami data sebelum menentukan langkah preprocessing dan membangun model Machine Learning.
