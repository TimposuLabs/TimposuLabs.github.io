---
sidebar_position: 2
title: "Jenis-Jenis Data"
---

Pada tahap kedua dalam **Machine Learning Framework**, kita mulai berfokus pada data.

Setelah sebelumnya kita menentukan masalah yang ingin diselesaikan, pertanyaan berikutnya adalah:

> **"Data apa yang kita miliki dan seperti apa karakteristiknya?"**

Data merupakan salah satu komponen paling penting dalam Machine Learning karena model belajar menemukan pola berdasarkan data yang diberikan.

Secara sederhana:

```text
Problem
   ↓
Data
   ↓
Pattern
   ↓
Model
   ↓
Prediction
```

Semakin baik kita memahami data, semakin baik pula keputusan yang dapat kita ambil ketika melakukan preprocessing, memilih fitur, memilih model, dan mengevaluasi hasilnya.

---

## Mengapa Memahami Jenis Data Penting?

Tidak semua data memiliki bentuk dan karakteristik yang sama.

Kita dapat memiliki:

- data tabel,
- gambar,
- teks,
- audio,
- video,
- data sensor,
- data transaksi,
- dan berbagai bentuk lainnya.

Cara menangani masing-masing data tersebut dapat berbeda.

Misalnya:

```text
Data harga rumah
→ tabel
→ Structured Data

Foto kucing
→ gambar
→ Unstructured Data

Rekaman suara
→ audio
→ Unstructured Data
```

Memahami jenis data membantu kita menentukan teknik yang tepat untuk mengolah dan menggunakan data tersebut.

---

## Structured Data

**Structured Data** atau data terstruktur adalah data yang memiliki struktur yang jelas dan tersusun dalam format tertentu.

Bentuk yang paling umum adalah tabel dengan:

- baris,
- kolom,
- nama kolom,
- dan tipe data yang relatif jelas.

Contohnya:

| Nama | Usia | Berat | Tekanan Darah | Penyakit |
|---|---:|---:|---:|---|
| Andi | 25 | 65 | 120 | Tidak |
| Budi | 45 | 80 | 140 | Ya |
| Citra | 32 | 60 | 125 | Tidak |

Setiap baris biasanya merepresentasikan satu observasi atau entitas.

Setiap kolom merepresentasikan sebuah variabel atau fitur.

---

### Contoh Structured Data

Structured Data dapat ditemukan dalam berbagai bentuk, misalnya:

- file CSV,
- file Excel,
- tabel database,
- data transaksi,
- data pelanggan,
- data penjualan,
- data sensor yang sudah ditabulasikan.

Contoh file CSV:

```text
nama,usia,berat,tekanan_darah,penyakit
Andi,25,65,120,Tidak
Budi,45,80,140,Ya
Citra,32,60,125,Tidak
```

Data tersebut memiliki struktur yang jelas.

Kita mengetahui:

```text
Kolom:
nama
usia
berat
tekanan_darah
penyakit
```

---

### Structured Data dengan Pandas

Dalam Python, Structured Data sering diproses menggunakan **Pandas**.

Contoh:

```python
import pandas as pd

df = pd.read_csv("data_pasien.csv")

print(df.head())
```

Output secara konseptual akan terlihat seperti:

```text
    nama  usia  berat  tekanan_darah  penyakit
0   Andi    25     65            120     Tidak
1   Budi    45     80            140        Ya
2  Citra    32     60            125     Tidak
```

Kita kemudian dapat melakukan eksplorasi data:

```python
print(df.info())
print(df.describe())
```

---

### Karakteristik Structured Data

Beberapa karakteristik umum Structured Data:

- memiliki format yang relatif konsisten,
- tersusun dalam baris dan kolom,
- mudah disimpan dalam database,
- relatif mudah dianalisis menggunakan Pandas,
- dapat digunakan oleh banyak algoritma Machine Learning klasik.

Contoh sederhana:

```text
       Feature 1
          │
          ↓
┌───────────────┐
│      Data     │
├───────┬───────┤
│ Usia  │ Berat │
├───────┼───────┤
│  25   │  65   │
│  32   │  60   │
│  45   │  80   │
└───────┴───────┘
```

---

## Unstructured Data

**Unstructured Data** atau data tidak terstruktur adalah data yang tidak memiliki struktur tabel yang tetap seperti Structured Data.

Contohnya:

- gambar,
- teks,
- audio,
- video,
- dokumen,
- rekaman percakapan.

Contoh gambar:

```text
        Foto
          ↓
┌─────────────────┐
│                 │
│       🐱        │
│                 │
│     Kucing      │
│                 │
└─────────────────┘
```

Tidak terdapat kolom seperti:

```text
usia
berat
tinggi
```

seperti pada dataset tabel.

---

### Contoh Unstructured Data

* #### Gambar

Contohnya:

```text
Foto wajah
Foto kendaraan
Foto hewan
Foto produk
Foto X-Ray
```

Data gambar dapat digunakan untuk:

- image classification,
- object detection,
- face recognition,
- medical imaging.

---

* #### Teks

Contohnya:

```text
Email
Artikel
Pesan chat
Review pelanggan
Transkrip percakapan
Dokumen
```

Teks dapat digunakan untuk:

- sentiment analysis,
- spam detection,
- text classification,
- information extraction,
- natural language processing.

---

* #### Audio

Contohnya:

```text
Rekaman telepon
Podcast
Perintah suara
Rekaman wawancara
```

Audio dapat digunakan untuk:

- speech recognition,
- speaker identification,
- audio classification.

---

* #### Video

Video merupakan kumpulan frame gambar yang berlangsung sepanjang waktu.

Contohnya:

```text
CCTV
Video kendaraan
Video olahraga
Video pembelajaran
```

Video dapat digunakan untuk:

- object tracking,
- activity recognition,
- surveillance,
- video classification.

---

### Apakah Unstructured Data Benar-Benar Tidak Bisa Diproses?

Istilah **unstructured** bukan berarti data tersebut tidak dapat diproses oleh komputer.

Data tersebut tetap dapat diubah menjadi representasi numerik sehingga dapat diproses oleh Machine Learning.

Contohnya sebuah gambar pada akhirnya dapat direpresentasikan sebagai nilai pixel.

Secara sederhana:

```text
Gambar
   ↓
Pixel
   ↓
Nilai numerik
   ↓
Model Machine Learning
```

Begitu pula teks dapat diubah menjadi representasi numerik.

```text
Teks
 ↓
Tokenisasi
 ↓
Representasi numerik
 ↓
Model
```

Audio juga dapat diubah menjadi representasi numerik.

Jadi, perbedaan utamanya adalah **bentuk data asalnya**, bukan berarti data tersebut tidak dapat diproses.

---

## Structured vs Unstructured Data

Perbandingan sederhananya:

| Structured Data | Unstructured Data |
|---|---|
| Memiliki struktur tabel | Tidak memiliki struktur tabel tetap |
| Baris dan kolom | Gambar, teks, audio, video |
| CSV | Foto |
| Excel | Video |
| Database | Audio |
| Relatif mudah dianalisis | Biasanya membutuhkan preprocessing khusus |

Contoh:

```text
Structured
┌───────┬───────┬────────┐
│ Usia  │ Berat │ Tinggi │
├───────┼───────┼────────┤
│  25   │  65   │  170   │
│  30   │  70   │  175   │
└───────┴───────┴────────┘
```

Sedangkan:

```text
Unstructured

┌───────────────┐
│               │
│     FOTO      │
│               │
└───────────────┘
```

---

## Static Data

Selain membedakan data berdasarkan bentuknya, kita juga dapat melihat bagaimana data tersebut berubah dari waktu ke waktu.

Salah satu jenisnya adalah **Static Data**.

Static Data adalah data yang relatif tidak berubah setelah data tersebut dikumpulkan.

Contohnya:

```text
data.csv
```

yang berisi rekam medis pasien pada waktu tertentu.

Misalnya:

```text
patient_id,age,blood_pressure,cholesterol
001,45,140,240
002,32,120,180
003,61,150,270
```

Setelah file tersebut dibuat, datanya tidak otomatis berubah.

---

### Contoh Static Data

Contoh Static Data:

- dataset penelitian,
- file CSV,
- file Excel,
- data historis transaksi,
- dataset hasil survei,
- dataset Machine Learning.

Misalnya kita memiliki dataset:

```text
heart_disease.csv
```

Kemudian kita melakukan analisis menggunakan Jupyter Notebook.

```text
heart_disease.csv
       ↓
Jupyter Notebook
       ↓
Data Analysis
       ↓
Machine Learning
```

Dataset tersebut dapat digunakan berulang kali untuk eksperimen.

---

## Streaming Data

Berbeda dengan Static Data, **Streaming Data** adalah data yang terus masuk atau berubah seiring waktu.

Contohnya:

```text
Data Sensor
     ↓
Data masuk terus-menerus
     ↓
Sistem
     ↓
Model
     ↓
Prediction
```

Data tidak hanya tersedia sebagai satu file yang selesai dibuat, tetapi terus diperbarui.

---

### Contoh Streaming Data

Beberapa contoh:

- harga saham,
- data sensor IoT,
- transaksi online,
- data lokasi kendaraan,
- data monitoring server,
- aktivitas pengguna,
- data cuaca,
- data lalu lintas.

Misalnya harga saham berubah:

```text
09:00 → 10.000
09:01 → 10.050
09:02 → 10.020
09:03 → 10.100
09:04 → 10.150
```

Data terus berubah berdasarkan waktu dan kondisi terbaru.

---

## Static Data vs Streaming Data

Perbedaannya:

| Static Data | Streaming Data |
|---|---|
| Relatif tetap | Terus berubah |
| Biasanya diproses dari dataset | Diproses saat data masuk |
| Contoh CSV | Sensor real-time |
| Data historis | Data terbaru |
| Cocok untuk eksperimen awal | Cocok untuk sistem real-time |

Contoh sederhana:

```text
Static Data

dataset.csv
     ↓
Analisis
     ↓
Training
     ↓
   Model
```

Sedangkan:

```text
Streaming Data

Data 1 ─┐
Data 2 ─┤
Data 3 ─┼──→ Sistem ──→ Model
Data 4 ─┤
Data 5 ─┘
```

---

## Prinsip Data dalam Machine Learning

Pada Machine Learning, kita sering membutuhkan contoh yang cukup agar model dapat menemukan pola.

Secara sederhana:

> **Semakin banyak data yang relevan dan berkualitas, semakin banyak contoh yang tersedia bagi model untuk mempelajari pola.**

Namun, **lebih banyak data tidak otomatis berarti model lebih baik**.

Kualitas data juga sangat penting.

Misalnya:

```text
1.000 data berkualitas
```

bisa lebih berguna daripada:

```text
100.000 data yang penuh kesalahan
```

Karena itu kita perlu memperhatikan:

- kualitas data,
- relevansi data,
- kelengkapan data,
- representasi data,
- dan kualitas label.

---

## Mengapa Biasanya Memulai dari Static Data?

Dalam pengembangan Machine Learning, kita sering memulai dari **Static Data**.

Alasannya karena static dataset lebih mudah digunakan untuk:

- eksplorasi,
- visualisasi,
- preprocessing,
- eksperimen,
- training,
- evaluasi,
- dan perbandingan model.

Contohnya:

```text
CSV
 ↓
Jupyter Notebook
 ↓
EDA
 ↓
Preprocessing
 ↓
Training
 ↓
Evaluation
```

Setelah model cukup matang, sistem dapat dikembangkan untuk menangani data yang masuk secara real-time.

---

## Workflow Data Science dan Machine Learning

Secara umum, proses Data Science dan Machine Learning dapat dimulai dari data yang tersedia.

Workflow sederhananya:

```text
Data
 ↓
Explore
 ↓
Analyze
 ↓
Visualize
 ↓
Prepare
 ↓
Model
 ↓
Evaluate
 ↓
Improve
 ↓
Deploy
```

Setiap tahap memiliki tujuan yang berbeda.

---

### Step 1 - Membuka Data

Pertama kita perlu membuka dataset.

Misalnya kita memiliki file:

```text
data.csv
```

Kita dapat menggunakan Pandas:

```python
import pandas as pd

df = pd.read_csv("data.csv")

print(df.head())
```

`head()` digunakan untuk melihat beberapa baris pertama dataset.

---

### Step 2 - Mengeksplorasi Data

Setelah data dibuka, kita perlu memahami isinya.

Beberapa perintah yang umum digunakan:

```python
print(df.shape)
print(df.columns)
print(df.info())
print(df.describe())
```

Kita juga dapat memeriksa missing value:

```python
print(df.isna().sum())
```

Tujuannya adalah mendapatkan gambaran awal mengenai dataset.

---

### Step 3 - Visualisasi Data

Data juga perlu divisualisasikan.

Visualisasi membantu kita melihat pola yang mungkin sulit ditemukan hanya dengan melihat tabel.

Contoh menggunakan Matplotlib:

```python
import matplotlib.pyplot as plt

df["usia"].hist()

plt.xlabel("Usia")
plt.ylabel("Jumlah")
plt.title("Distribusi Usia")
plt.show()
```

Dengan visualisasi kita dapat melihat:

- distribusi data,
- hubungan antarvariabel,
- outlier,
- pola,
- dan kemungkinan masalah pada dataset.

---

### Step 4 - Mempersiapkan Data

Sebelum digunakan untuk training, data biasanya perlu dipersiapkan.

Tahapan preprocessing dapat mencakup:

```text
Missing Values
      ↓
Duplicate
      ↓
Outlier
      ↓
Encoding
      ↓
Scaling
      ↓
Feature Selection
```

Tidak semua dataset membutuhkan semua tahap tersebut.

Preprocessing bergantung pada karakteristik data dan algoritma yang digunakan.

---

### Step 5 - Membangun Model

Setelah data siap, kita dapat membangun model Machine Learning.

Salah satu library populer untuk Machine Learning klasik di Python adalah **scikit-learn**.

Contoh:

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()

model.fit(X_train, y_train)
```

Setelah model dilatih, kita dapat melakukan prediksi:

```python
predictions = model.predict(X_test)
```

---

### Step 6 - Mengevaluasi Model

Model harus dievaluasi menggunakan metric yang sesuai.

Contohnya untuk regression:

```python
from sklearn.metrics import mean_absolute_error

mae = mean_absolute_error(
    y_test,
    predictions
)

print("MAE:", mae)
```

Untuk classification kita dapat menggunakan metric seperti:

- Accuracy,
- Precision,
- Recall,
- F1 Score.

Sedangkan regression dapat menggunakan:

- MAE,
- MSE,
- RMSE,
- R².

---

### Step 7 - Eksperimen dan Improvement

Jika model belum memberikan hasil yang baik, kita tidak langsung berhenti.

Kita dapat melakukan eksperimen.

Misalnya:

```text
Model pertama
     ↓
Evaluation
     ↓
Hasil kurang baik
     ↓
Perbaiki preprocessing
     ↓
Coba feature lain
     ↓
Coba model lain
     ↓
Tuning
     ↓
Evaluation kembali
```

Proses ini merupakan bagian normal dari Machine Learning.

---

### Step 8 - Deployment

Setelah model dianggap cukup baik, model dapat digunakan dalam sistem nyata.

Misalnya:

```text
Jupyter Notebook
      ↓
    Training
      ↓
    Model
      ↓
     API
      ↓
Application
```

Contohnya model Machine Learning dapat dibuat menjadi API menggunakan FastAPI.

Aplikasi lain kemudian dapat mengirim data:

```text
Application
     ↓
HTTP Request
     ↓
  FastAPI
     ↓
  ML Model
     ↓
  Prediction
     ↓
HTTP Response
```

Dengan demikian model dapat digunakan oleh aplikasi lain.

---

## Dari Static Data ke Streaming Data

Pengembangan sistem Machine Learning tidak harus langsung menggunakan real-time data.

Biasanya proses dapat dimulai secara sederhana:

```text
Static Dataset
      ↓
Exploration
      ↓
Preprocessing
      ↓
Model Training
      ↓
Evaluation
      ↓
Deployment
```

Setelah model digunakan dalam sistem nyata, kita dapat mulai menangani data yang terus masuk:

```text
Streaming Data
      ↓
Data Processing
      ↓
Trained Model
      ↓
Real-time Prediction
      ↓
Application
```

Contohnya sistem rekomendasi dapat menerima aktivitas pengguna secara terus-menerus dan menghasilkan rekomendasi berdasarkan data terbaru.

---

## Contoh Perjalanan Data dalam Proyek Machine Learning

Misalnya kita ingin membangun model untuk memprediksi harga rumah.

### Data Awal

Kita memiliki:

```text
rumah.csv
```

dengan data:

```text
luas
kamar
kamar_mandi
lokasi
harga
```

---

### Eksplorasi

Kita membuka data:

```python
import pandas as pd

df = pd.read_csv("rumah.csv")

print(df.head())
print(df.info())
print(df.describe())
```

Kemudian melakukan visualisasi.

---

### Menentukan Feature dan Target

```python
X = df[
    [
        "luas",
        "kamar",
        "kamar_mandi"
    ]
]

y = df["harga"]
```

Di sini:

```text
X → Features
y → Target
```

---

### Training

Data kemudian dibagi menjadi training dan testing.

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

Kemudian model dilatih:

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()

model.fit(X_train, y_train)
```

---

### Prediction

Setelah training:

```python
y_pred = model.predict(X_test)
```

Model menghasilkan prediksi harga.

---

### Evaluation

Kemudian kita mengukur performanya:

```python
from sklearn.metrics import mean_absolute_error

mae = mean_absolute_error(
    y_test,
    y_pred
)

print("MAE:", mae)
```

Proses tersebut merupakan contoh sederhana workflow Machine Learning menggunakan Static Data.

---

## Hubungan Jenis Data dengan Machine Learning

Kita dapat mengelompokkan pembahasan data menjadi dua sudut pandang.

### Berdasarkan Bentuk

```text
Data
│
├── Structured Data
│   ├── CSV
│   ├── Excel
│   └── Database
│
└── Unstructured Data
    ├── Image
    ├── Text
    ├── Audio
    └── Video
```

### Berdasarkan Perubahan Waktu

```text
Data
│
├── Static Data
│
└── Streaming Data
```

Kedua klasifikasi tersebut berbeda.

Sebuah data dapat memiliki kombinasi karakteristik tertentu.

Misalnya:

```text
CSV historis
→ Structured + Static
```

Sedangkan data sensor yang masuk secara real-time:

```text
Sensor IoT
→ dapat berupa structured/semi-structured + streaming
```

Jadi, **Structured/Unstructured** menjelaskan bentuk data, sedangkan **Static/Streaming** menjelaskan bagaimana data tersedia atau berubah terhadap waktu.

---

## Hal Penting tentang Data

Ada beberapa prinsip yang perlu diingat.

### Data Adalah Bahan Bakar Machine Learning

Model Machine Learning belajar berdasarkan data.

```text
Data
 ↓
Learning
 ↓
Model
 ↓
Prediction
```

Tanpa data yang sesuai, model sulit menghasilkan prediksi yang dapat diandalkan.

---

### Lebih Banyak Tidak Selalu Lebih Baik

Kuantitas penting, tetapi kualitas juga sangat penting.

Misalnya:

```text
100.000 data buruk
```

tidak selalu lebih baik daripada:

```text
10.000 data berkualitas
```

Karena itu kita perlu memperhatikan kualitas dataset.

---

### Data Harus Relevan

Data harus berhubungan dengan masalah yang ingin diselesaikan.

Jika ingin memprediksi harga rumah, feature seperti:

```text
luas
jumlah kamar
lokasi
kondisi rumah
```

kemungkinan lebih relevan daripada informasi yang tidak memiliki hubungan dengan harga.

---

### Data Dunia Nyata Tidak Selalu Bersih

Dataset nyata dapat memiliki:

```text
Missing Value
Duplicate
Outlier
Kesalahan input
Format tidak konsisten
Data tidak seimbang
```

Karena itu, memahami data merupakan bagian penting dari workflow Machine Learning.

---

## Checklist Memahami Data

Sebelum melanjutkan ke proses Machine Learning, biasakan memeriksa:

```text
□ Apa sumber data?
□ Structured atau Unstructured?
□ Static atau Streaming?
□ Berapa jumlah data?
□ Apa saja feature yang tersedia?
□ Apa targetnya?
□ Apakah terdapat missing value?
□ Apakah terdapat duplicate?
□ Apakah terdapat outlier?
□ Apakah data relevan dengan masalah?
□ Apakah data cukup mewakili masalah?
□ Bagaimana data akan digunakan untuk training?
```

Checklist tersebut membantu kita memahami dataset sebelum melakukan modeling.

---

## Ringkasan

Pada tahap **Data**, kita perlu memahami jenis dan karakteristik data yang tersedia.

Berdasarkan bentuknya, data dapat dibagi menjadi:

```text
Structured Data
→ Data berbentuk tabel dengan struktur yang jelas

Unstructured Data
→ Data seperti gambar, teks, audio, dan video
```

Berdasarkan perubahan waktunya:

```text
Static Data
→ Data relatif tetap

Streaming Data
→ Data terus masuk atau berubah dari waktu ke waktu
```

Workflow sederhananya:

```text
Data
 ↓
Explore
 ↓
Analyze
 ↓
Visualize
 ↓
Prepare
 ↓
Model
 ↓
Evaluate
 ↓
Improve
 ↓
Deploy
```

Hal penting yang perlu diingat:

> **Machine Learning tidak dimulai dari algoritma, tetapi dari pemahaman terhadap masalah dan data.**

Semakin baik kita memahami data, semakin mudah menentukan preprocessing, feature, algoritma, dan strategi evaluasi yang sesuai.

Pada materi berikutnya, kita akan mulai membahas **Evaluation**, yaitu bagaimana menentukan ukuran keberhasilan sebuah model Machine Learning dan bagaimana memilih metric yang tepat untuk mengukur performanya.
