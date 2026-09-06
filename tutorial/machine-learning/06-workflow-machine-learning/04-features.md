---
sidebar_position: 4
title: "Features"
---

Pada langkah keempat dalam **Machine Learning Framework / Machine Learning Workflow**, kita masuk ke bagian **Features** atau fitur data.

Setelah sebelumnya kita:

1. mendefinisikan masalah,
2. memahami data,
3. menentukan bagaimana keberhasilan model diukur,

sekarang kita perlu menjawab pertanyaan:

> **"What do we already know about the data?"**

atau:

> **"Apa yang sudah kita ketahui tentang data tersebut?"**

Jawaban dari pertanyaan tersebut membantu kita memahami informasi apa saja yang dapat digunakan oleh Machine Learning untuk membuat prediksi.

---

## Apa Itu Feature?

**Feature** adalah karakteristik, atribut, atau informasi yang terdapat pada data dan dapat digunakan oleh model Machine Learning untuk mempelajari pola.

Feature juga sering disebut:

- feature variable,
- input variable,
- predictor,
- atau independent variable.

Misalnya kita ingin memprediksi apakah seorang pasien memiliki penyakit jantung.

Dataset:

| Berat | Jenis Kelamin | Tekanan Darah | Detak Jantung | Penyakit |
|---:|---|---:|---:|---|
| 65 | Laki-laki | 120 | 75 | Tidak |
| 80 | Laki-laki | 145 | 90 | Ya |
| 60 | Perempuan | 118 | 72 | Tidak |

Feature:

```text
Berat
Jenis Kelamin
Tekanan Darah
Detak Jantung
```

Target:

```text
Penyakit
```

Secara sederhana:

```text
Features
   ↓
Machine Learning Model
   ↓
Target / Prediction
```

---

## Feature dan Target

Dua istilah yang sangat penting untuk dibedakan adalah:

```text
Feature
→ informasi yang digunakan untuk membuat prediksi

Target
→ sesuatu yang ingin diprediksi
```

Misalnya kita ingin memprediksi harga rumah.

| Luas | Kamar | Kamar Mandi | Lokasi | Harga |
|---:|---:|---:|---|---:|
| 100 | 3 | 2 | Kota A | 700 jt |
| 150 | 4 | 2 | Kota A | 950 jt |
| 200 | 5 | 3 | Kota B | 1,4 M |

Features:

```text
Luas
Kamar
Kamar Mandi
Lokasi
```

Target:

```text
Harga
```

Dalam Python menggunakan Pandas:

```python
X = df[
    [
        "luas",
        "kamar",
        "kamar_mandi",
        "lokasi"
    ]
]

y = df["harga"]
```

Konvensi yang umum digunakan:

```text
X → Features
y → Target
```

---

## Mengapa Feature Penting?

Machine Learning belajar berdasarkan informasi yang diberikan kepadanya.

Jika feature memiliki informasi yang relevan, model memiliki peluang lebih besar untuk menemukan pola yang berguna.

Contohnya kita ingin memprediksi harga rumah.

Feature:

```text
Luas rumah
Jumlah kamar
Lokasi
Kondisi rumah
```

kemungkinan memiliki hubungan dengan:

```text
Harga rumah
```

Sedangkan feature seperti:

```text
Nomor baris dataset
```

belum tentu memiliki hubungan yang berarti dengan harga.

Karena itu, pemilihan feature merupakan bagian penting dalam Machine Learning.

---

## Jenis-Jenis Feature

Secara umum, feature dapat memiliki berbagai bentuk.

Dalam pembahasan dasar ini, kita akan mengenal:

1. **Numerical Features**
2. **Categorical Features**
3. **Derived Features**
4. **Features pada Unstructured Data**

---

### 1️⃣ Numerical Features

**Numerical Features** adalah feature yang memiliki nilai numerik atau angka.

Contohnya:

```text
Usia
Berat badan
Tinggi badan
Tekanan darah
Harga
Jumlah transaksi
Jarak
Suhu
```

Contoh dataset:

| Usia | Berat | Tekanan Darah |
|---:|---:|---:|
| 25 | 65 | 120 |
| 35 | 72 | 130 |
| 45 | 80 | 145 |

Semua feature tersebut memiliki nilai angka.

---

#### ✅ Contoh Numerical Features dalam Python

Misalnya:

```python
X = df[
    [
        "usia",
        "berat",
        "tekanan_darah"
    ]
]
```

Model Machine Learning dapat menggunakan nilai tersebut untuk mempelajari hubungan dengan target.

---

### ✔️ Continuous dan Discrete Numerical Features

Numerical feature dapat memiliki karakteristik yang berbeda.

#### ✅ Continuous

Nilainya dapat berada pada rentang tertentu dan memiliki nilai pecahan.

Contoh:

```text
Berat = 65.5 kg
Tinggi = 172.4 cm
Suhu = 36.7 °C
```

#### ✅ Discrete

Biasanya berupa nilai yang dapat dihitung.

Contoh:

```text
Jumlah kamar = 3
Jumlah transaksi = 15
Jumlah anak = 2
```

Perbedaan ini penting untuk memahami karakteristik data, meskipun cara penggunaannya tetap bergantung pada model dan masalah yang dihadapi.

---

### 2️⃣ Categorical Features

**Categorical Features** adalah feature yang nilainya berupa kategori atau pilihan tertentu.

Contohnya:

```text
Jenis kelamin
Status pernikahan
Status merokok
Jenis kendaraan
Kota
Jenis produk
```

Contoh:

| Jenis Kelamin | Status Merokok | Kota |
|---|---|---|
| Laki-laki | Ya | Palu |
| Perempuan | Tidak | Makassar |
| Laki-laki | Tidak | Manado |

Feature tersebut tidak secara alami berupa angka.

---

#### ✅ Contoh Categorical Feature

Misalnya:

```text
jenis_kelamin
```

memiliki kategori:

```text
Laki-laki
Perempuan
```

Atau:

```text
status_merokok
```

memiliki kategori:

```text
Ya
Tidak
```

Model Machine Learning tertentu tidak dapat langsung menggunakan string sebagai input numerik.

Karena itu categorical feature biasanya perlu diproses terlebih dahulu.

---

### ✔️ Encoding Categorical Features

Salah satu cara mengubah categorical feature menjadi angka adalah **encoding**.

Misalnya:

```text
Laki-laki → 0
Perempuan → 1
```

atau:

```text
Tidak → 0
Ya    → 1
```

Contoh menggunakan Pandas:

```python
df["merokok"] = df["merokok"].map({
    "Tidak": 0,
    "Ya": 1
})
```

Setelah itu:

```text
Tidak → 0
Ya    → 1
```

dapat digunakan sebagai representasi numerik.

Namun, tidak semua categorical feature cocok menggunakan mapping sederhana.

---

### ✔️ One-Hot Encoding

Untuk categorical feature dengan banyak kategori, kita sering menggunakan **One-Hot Encoding**.

Misalnya:

```text
Kota:
Palu
Makassar
Manado
Jakarta
```

Dapat diubah menjadi:

| Kota_Palu | Kota_Makassar | Kota_Manado | Kota_Jakarta |
|---:|---:|---:|---:|
| 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 0 | 0 | 1 |

Contoh menggunakan Pandas:

```python
df_encoded = pd.get_dummies(
    df,
    columns=["kota"]
)
```

Dalam workflow Machine Learning yang lebih lanjut, encoding juga dapat dilakukan menggunakan transformer dari **Scikit-learn** agar preprocessing training dan data baru konsisten.

---

### 3️⃣ Derived Features

Feature tidak selalu harus berasal langsung dari kolom asli.

Kita dapat membuat feature baru berdasarkan informasi yang sudah tersedia.

Feature yang dibuat dari feature lain sering disebut **Derived Feature**.

Proses membuat atau mengubah feature disebut:

> **Feature Engineering**

---

### ✔️ Contoh Feature Engineering

Misalnya kita memiliki tanggal kunjungan pasien:

```text
tanggal_kunjungan
```

Kita dapat membuat feature:

```text
sudah_berkunjung_tahun_ini
```

dengan nilai:

```text
True
False
```

Contoh:

```python
df["sudah_berkunjung_tahun_ini"] = (
    df["jumlah_kunjungan_tahun_ini"] > 0
)
```

Sekarang kita memiliki informasi baru yang mungkin lebih mudah digunakan model.

---

### ✔️ Contoh Feature Engineering Lainnya

Dari:

```text
tanggal_lahir
```

kita dapat membuat:

```text
usia
```

Dari:

```text
harga
jumlah
```

kita dapat membuat:

```text
total_harga
```

Dari:

```text
tanggal_transaksi
```

kita dapat membuat:

```text
tahun
bulan
hari
hari_dalam_minggu
```

Dari:

```text
berat
tinggi
```

kita dapat membuat:

```text
BMI
```

Feature Engineering dapat membantu model memperoleh informasi yang lebih relevan.

---

### ✔️ Mengapa Feature Engineering Penting?

Data mentah tidak selalu berada dalam bentuk yang paling informatif untuk model.

Misalnya kita memiliki:

```text
Tanggal lahir
```

Model mungkin lebih mudah menggunakan:

```text
Usia
```

karena usia secara langsung menggambarkan karakteristik yang ingin digunakan.

Contoh lainnya:

```text
Tanggal transaksi
```

dapat diubah menjadi:

```text
Bulan transaksi
Hari transaksi
Hari dalam minggu
```

Informasi tersebut mungkin membantu model menemukan pola tertentu.

---

### 4️⃣ Features pada Unstructured Data

Feature tidak hanya terdapat pada data berbentuk tabel.

Gambar, teks, audio, dan video juga memiliki informasi yang dapat digunakan sebagai feature.

Namun feature pada data tidak terstruktur biasanya tidak langsung terlihat sebagai kolom.

---

### ✔️ Contoh Feature pada Gambar

Misalnya kita ingin membuat model untuk mengenali gambar anjing.

Gambar:

```text
Foto anjing
     ↓
Pola visual
     ↓
Features
     ↓
   Model
     ↓
Prediksi
```

Informasi visual yang dapat membantu model antara lain:

```text
Bentuk
Tekstur
Warna
Pola
Tepi objek
Struktur tubuh
```

Pada pendekatan computer vision modern, neural network dapat belajar representasi fitur tersebut secara otomatis dari data.

---

### ✔️ Feature pada Teks

Misalnya kita ingin menentukan apakah sebuah review pelanggan memiliki sentimen positif atau negatif.

Teks:

```text
"Produknya sangat bagus dan pengirimannya cepat."
```

Teks tersebut perlu diubah menjadi representasi yang dapat diproses model.

Secara sederhana:

```text
Teks
 ↓
Token / Representasi
 ↓
Numerical Features
 ↓
Model
 ↓
Sentiment
```

Dalam Natural Language Processing modern, representasi dapat dipelajari menggunakan model seperti neural network atau transformer.

---

## Feature Coverage

Selain mengetahui jenis feature, kita juga harus memperhatikan **feature coverage**.

Feature coverage berkaitan dengan seberapa lengkap sebuah feature tersedia pada seluruh sampel dalam dataset.

Misalnya kita memiliki 100 pasien.

Feature:

```text
berat_badan
```

tersedia pada:

```text
100 dari 100 pasien
```

Maka coverage:

```text
100%
```

Sedangkan feature:

```text
makanan_favorit
```

hanya tersedia pada:

```text
10 dari 100 pasien
```

Maka coverage:

```text
10%
```

Feature dengan coverage sangat rendah perlu dipertimbangkan kembali.

---

### Complete Feature Coverage

Jika sebuah feature tersedia untuk seluruh sampel, kita dapat menyebutnya memiliki **complete feature coverage**.

Contoh:

| Pasien | Usia | Berat | Tekanan Darah |
|---|---:|---:|---:|
| A | 25 | 65 | 120 |
| B | 35 | 72 | 130 |
| C | 45 | 80 | 145 |
| D | 50 | 85 | 150 |

Semua pasien memiliki:

```text
Usia
Berat
Tekanan Darah
```

Maka ketiga feature tersebut memiliki coverage penuh pada dataset tersebut.

---

### Feature Coverage yang Rendah

Sekarang lihat contoh:

| Pasien | Usia | Berat | Makanan Favorit |
|---|---:|---:|---|
| A | 25 | 65 | Nasi |
| B | 35 | 72 | - |
| C | 45 | 80 | - |
| D | 50 | 85 | - |

Feature:

```text
Makanan Favorit
```

hanya tersedia untuk sebagian kecil data.

Jika feature tersebut hanya tersedia pada 10 dari 100 sampel:

```text
Coverage = 10%
```

Kita perlu mempertimbangkan apakah feature tersebut layak digunakan.

---

## Apa yang Dilakukan Jika Feature Banyak Missing Value?

Ada beberapa pilihan.

### Pilihan 1 - Menghapus Feature

Jika sebuah feature memiliki terlalu banyak data kosong dan tidak terlalu penting, kita dapat menghapusnya.

Contoh:

```python
df = df.drop(
    columns=["makanan_favorit"]
)
```

---

### Pilihan 2 - Mengumpulkan Data Tambahan

Jika feature sangat penting, kita dapat mencoba memperoleh data yang lebih lengkap.

Misalnya:

```text
Feature penting
       ↓
Coverage hanya 20%
       ↓
Kumpulkan data tambahan
       ↓
Coverage meningkat
```

---

### Pilihan 3 - Mengisi Missing Value

Jika sesuai dengan karakteristik data, missing value dapat ditangani menggunakan teknik imputasi.

Contoh sederhana:

```python
df["berat"] = df["berat"].fillna(
    df["berat"].median()
)
```

Namun imputasi harus dilakukan dengan hati-hati agar tidak menyebabkan data leakage dan tetap konsisten antara training dan data baru.

Pembahasan missing value dan preprocessing akan dibahas lebih mendalam pada materi preprocessing.

---

## Feature Coverage dan Kualitas Model

Feature coverage dapat memengaruhi kualitas data yang diberikan kepada model.

Misalnya:

```text
Feature A
Coverage = 100%

Feature B
Coverage = 95%

Feature C
Coverage = 20%
```

Feature C mungkin bermasalah jika model sangat bergantung pada informasi tersebut.

Namun coverage bukan satu-satunya faktor penentu apakah sebuah feature bagus atau buruk.

Kita juga perlu mempertimbangkan:

- relevansi,
- kualitas,
- distribusi,
- hubungan dengan target,
- missing value,
- dan risiko data leakage.

---

## Feature yang Tidak Relevan

Tidak semua feature harus digunakan.

Misalnya dataset:

| ID | Usia | Luas Rumah | Kamar | Harga |
|---|---:|---:|---:|---:|
| 001 | 30 | 100 | 3 | 700 jt |
| 002 | 40 | 150 | 4 | 950 jt |
| 003 | 35 | 120 | 3 | 800 jt |

Kita ingin memprediksi:

```text
Harga
```

Feature yang mungkin relevan:

```text
Usia
Luas Rumah
Kamar
```

Sedangkan:

```text
ID
```

biasanya hanya identifier.

Kita perlu mengevaluasi apakah ID memang memiliki informasi yang berguna atau justru hanya menambahkan noise.

---

## Data Leakage pada Features

Salah satu hal yang sangat penting ketika memilih feature adalah menghindari **data leakage**.

Data leakage terjadi ketika informasi yang seharusnya tidak tersedia pada saat prediksi masuk ke dalam feature.

Contoh kita ingin memprediksi:

```text
Apakah pelanggan akan berhenti berlangganan?
```

Kita menggunakan feature:

```text
Jumlah komplain
Lama berlangganan
Jumlah transaksi
```

Ini masuk akal.

Tetapi jika kita memasukkan:

```text
tanggal pelanggan berhenti
```

maka terjadi masalah.

Informasi tersebut baru diketahui setelah pelanggan benar-benar berhenti.

Model mendapatkan informasi yang seharusnya tidak tersedia ketika prediksi dilakukan.

---

### Prinsip Menghindari Data Leakage

Tanyakan:

> **"Apakah informasi ini benar-benar tersedia pada saat model membuat prediksi?"**

Jika jawabannya tidak, feature tersebut seharusnya tidak digunakan.

Secara sederhana:

```text
Informasi tersedia sebelum prediksi
        ↓
       Bisa
        ↓
Informasi baru diketahui setelah kejadian
        ↓
   Jangan gunakan
```

---

## Feature Selection

Setelah memahami feature, kita dapat melakukan **Feature Selection**.

Feature Selection adalah proses memilih feature yang paling relevan untuk digunakan oleh model.

Misalnya dataset memiliki:

```text
100 kolom
```

Setelah dianalisis, mungkin hanya:

```text
20 feature
```

yang benar-benar berguna.

Tujuannya dapat mencakup:

- mengurangi noise,
- mengurangi kompleksitas,
- mempercepat training,
- mengurangi risiko overfitting,
- meningkatkan interpretabilitas.

Feature selection akan dibahas lebih mendalam pada materi Feature Engineering.

---

## Contoh Analisis Features dengan Pandas

Misalnya kita memiliki dataset pasien:

```python
import pandas as pd

df = pd.read_csv("pasien.csv")
```

Kita dapat melihat daftar kolom:

```python
print(df.columns)
```

Melihat tipe data:

```python
print(df.dtypes)
```

Melihat jumlah missing value:

```python
print(df.isna().sum())
```

Melihat persentase missing value:

```python
missing_percentage = (
    df.isna().mean() * 100
)

print(missing_percentage)
```

Kita juga dapat melihat jumlah nilai unik:

```python
print(df.nunique())
```

Informasi tersebut membantu memahami karakteristik feature sebelum modeling.

---

## Contoh Memisahkan Features dan Target

Misalnya dataset:

```text
usia
berat
tekanan_darah
detak_jantung
penyakit
```

Target:

```text
penyakit
```

Kita dapat menulis:

```python
X = df.drop(
    columns=["penyakit"]
)

y = df["penyakit"]
```

Sekarang:

```text
X
→ seluruh feature

y
→ target
```

Kita dapat memeriksa bentuknya:

```python
print(X.shape)
print(y.shape)
```

---

## Contoh Workflow Features

Dalam proyek nyata, tahap Features dapat terlihat seperti:

```text
Dataset
   ↓
Identifikasi kolom
   ↓
Pisahkan feature dan target
   ↓
Identifikasi numerical feature
   ↓
Identifikasi categorical feature
   ↓
Periksa missing value
   ↓
Periksa feature coverage
   ↓
Hapus feature tidak relevan
   ↓
Feature Engineering
   ↓
Encoding
   ↓
Feature Selection
   ↓
Modeling
```

Tidak semua proyek membutuhkan seluruh tahapan tersebut.

Kebutuhan feature processing bergantung pada dataset dan algoritma yang digunakan.

---

## Contoh Kasus Lengkap

Misalnya kita ingin memprediksi apakah pasien memiliki risiko penyakit jantung.

Dataset awal:

| Usia | Berat | Jenis Kelamin | Merokok | Detak Jantung | Penyakit |
|---:|---:|---|---|---:|---|
| 45 | 80 | Laki-laki | Ya | 90 | Ya |
| 32 | 60 | Perempuan | Tidak | 72 | Tidak |
| 61 | 85 | Laki-laki | Ya | 95 | Ya |

Kita dapat mengidentifikasi:

### Numerical Features

```text
Usia
Berat
Detak Jantung
```

### Categorical Features

```text
Jenis Kelamin
Merokok
```

### Target

```text
Penyakit
```

Kemudian categorical feature dapat diproses:

```text
Jenis Kelamin
     ↓
Encoding

Merokok
     ↓
Encoding
```

Setelah preprocessing:

```text
Numerical Features
        +
Encoded Categorical Features
        ↓
        X
        ↓
Machine Learning Model
        ↓
        y
```

---

## Cara Berpikir dalam Memilih Feature

Jangan hanya bertanya:

> "Kolom apa yang tersedia?"

Tetapi tanyakan:

> "Kolom mana yang memberikan informasi yang relevan terhadap masalah?"

Kemudian:

> "Apakah informasi tersebut tersedia saat prediksi dilakukan?"

Dan:

> "Apakah datanya cukup lengkap dan berkualitas?"

Cara berpikir ini jauh lebih penting daripada sekadar memasukkan seluruh kolom ke dalam model.

---

## Checklist Features

Sebelum melanjutkan ke tahap modelling, periksa:

```text
□ Apa saja feature yang tersedia?
□ Apa target variable?
□ Mana numerical features?
□ Mana categorical features?
□ Apakah ada feature yang tidak relevan?
□ Apakah terdapat missing value?
□ Bagaimana feature coverage?
□ Apakah terdapat feature dengan coverage sangat rendah?
□ Apakah diperlukan feature engineering?
□ Apakah categorical feature perlu encoding?
□ Apakah terdapat data leakage?
□ Apakah ada feature yang dapat dihapus?
□ Apakah feature sudah sesuai dengan tujuan proyek?
```

---

## Ringkasan

**Features** adalah informasi atau karakteristik data yang digunakan oleh Machine Learning untuk membuat prediksi.

Hubungan sederhananya:

```text
Features
   ↓
Model
   ↓
Target / Prediction
```

Jenis feature yang umum:

```text
Features
│
├── Numerical
│   └── Data berupa angka
│
├── Categorical
│   └── Data berupa kategori
│
├── Derived Features
│   └── Feature hasil Feature Engineering
│
└── Features dari Unstructured Data
    ├── Image
    ├── Text
    ├── Audio
    └── Video
```

Selain jenis feature, kita juga perlu memperhatikan **feature coverage**.

Feature yang tersedia pada hampir seluruh atau seluruh sampel biasanya lebih mudah digunakan. Jika sebuah feature hanya tersedia pada sebagian kecil data, kita perlu mempertimbangkan apakah feature tersebut sebaiknya dihapus, dilengkapi datanya, atau ditangani menggunakan teknik preprocessing yang sesuai.

Hal penting lainnya adalah:

> **Tidak semua kolom adalah feature yang baik.**

Feature harus:

- relevan dengan masalah,
- tersedia ketika prediksi dilakukan,
- memiliki kualitas yang memadai,
- dan tidak menyebabkan data leakage.

Pada tahap berikutnya, feature yang sudah dipahami akan digunakan dalam **Modelling**, yaitu proses memilih algoritma, membagi dataset, melatih model, melakukan prediksi, dan mengevaluasi performanya.
