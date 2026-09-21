---
sidebar_position: 8
title: "Persiapan Data: Feature Scaling"
---

Dalam Machine Learning, kita sering menemukan dataset yang memiliki fitur dengan **rentang nilai yang sangat berbeda**.

Contohnya pada data penjualan mobil:

```text
Odometer (KM)       → 6.000 sampai 345.000
Repair Cost         → 100 sampai 1.700
```

Kedua fitur tersebut sama-sama dapat memberikan informasi kepada model.

Namun, skala angkanya sangat berbeda.

Jika kita menggunakan algoritma Machine Learning tertentu, perbedaan skala tersebut dapat memengaruhi proses pembelajaran model.

Solusinya adalah menggunakan teknik yang disebut:

> **Feature Scaling**

## Apa Itu Feature Scaling?

**Feature Scaling** adalah proses mengubah skala nilai pada feature sehingga beberapa feature memiliki rentang atau distribusi nilai yang lebih sebanding.

Contoh sebelum scaling:

```text
Odometer

6000
50000
150000
345000
```

Sedangkan:

```text
Repair Cost

100
500
1000
1700
```

Setelah scaling, kedua feature dapat berada pada skala yang lebih sebanding.

Contoh sederhana:

```text
Odometer
   ↓
0.01
0.14
0.45
1.00

Repair Cost
   ↓
0.00
0.25
0.56
1.00
```

Angka di atas hanya ilustrasi untuk memahami konsep.

## Mengapa Feature Scaling Diperlukan?

Bayangkan kita memiliki dua feature:

```text
Odometer        Repair Cost
345000          1700
```

Perhatikan perbedaan nilainya:

```text
345000
```

dibandingkan:

```text
1700
```

Nilai Odometer jauh lebih besar.

Pada algoritma tertentu, perbedaan skala seperti ini dapat membuat feature dengan angka yang lebih besar memiliki pengaruh lebih besar terhadap perhitungan jarak atau optimisasi.

Padahal belum tentu feature tersebut lebih penting.

Feature scaling membantu membuat skala feature lebih sebanding sehingga algoritma tertentu dapat bekerja dengan lebih baik.

## Analogi Sederhana

Bayangkan kita ingin membandingkan dua orang berdasarkan:

```text
Tinggi badan
```

dan:

```text
Penghasilan tahunan
```

Misalnya:

```text
Tinggi       = 173 cm
Penghasilan  = 100000000
```

Jika kita langsung menggunakan angka tersebut dalam perhitungan jarak:

```text
173
100000000
```

perbedaan skala sangat besar.

Penghasilan dapat mendominasi perhitungan numerik hanya karena satuannya menghasilkan angka yang jauh lebih besar.

Scaling membantu mengurangi masalah seperti ini.

## Feature Scaling Tidak Mengubah Makna Data

Scaling tidak berarti:

```text
345000 km
```

menjadi:

```text
345000 km
```

dengan satuan baru.

Scaling mengubah **representasi numerik** feature untuk kebutuhan algoritma.

Informasi relatif dalam data tetap dipertahankan sesuai metode scaling yang digunakan.

Contohnya:

```text
100
200
300
```

setelah scaling mungkin menjadi:

```text
0.0
0.5
1.0
```

Urutan nilainya tetap:

```text
100 < 200 < 300
```

## Apakah Semua Machine Learning Membutuhkan Scaling?

Tidak.

Ini merupakan konsep penting.

Beberapa algoritma sangat dipengaruhi oleh skala feature.

Contohnya:

```text
K-Nearest Neighbors
K-Means
Support Vector Machine
Logistic Regression
Linear Regression
Neural Network
```

terutama algoritma yang menggunakan jarak atau optimisasi tertentu.

Sementara beberapa algoritma berbasis pohon biasanya tidak terlalu membutuhkan feature scaling.

Contohnya:

```text
Decision Tree
Random Forest
```

Jadi:

> **Feature scaling tidak wajib untuk semua algoritma Machine Learning.**

## Mengapa KNN Membutuhkan Scaling?

KNN atau **K-Nearest Neighbors** menggunakan jarak untuk menentukan tetangga terdekat.

Misalnya kita memiliki:

```text
Age
Income
```

Jika:

```text
Age    = 20–80
Income = 10.000–100.000.000
```

maka Income memiliki skala yang jauh lebih besar.

Ketika menghitung jarak, feature Income dapat mendominasi hasil perhitungan.

Scaling membantu membuat kedua feature berada pada skala yang lebih sebanding.

## Mengapa K-Means Membutuhkan Scaling?

K-Means juga menggunakan konsep jarak untuk menentukan kelompok.

Secara sederhana:

```text
Data
 ↓
Hitung jarak
 ↓
Tentukan cluster
```

Jika satu feature memiliki rentang:

```text
0–10
```

dan feature lain:

```text
0–1.000.000
```

feature kedua dapat sangat memengaruhi perhitungan jarak.

Feature scaling dapat membantu mengurangi masalah tersebut.

## Dua Metode Scaling yang Umum

Dua metode feature scaling yang sangat umum adalah:

```text
1. Normalization
2. Standardization
```

Keduanya memiliki tujuan yang mirip, tetapi cara kerjanya berbeda.

## 1. Normalization

Normalization sering digunakan untuk mengubah nilai ke rentang tertentu.

Salah satu metode yang umum adalah:

```text
Min-Max Scaling
```

Hasilnya biasanya berada pada rentang:

```text
0 sampai 1
```

### Rumus Min-Max Scaling

Rumus sederhananya:

```text
x_scaled = (x - x_min) / (x_max - x_min)
```

Keterangan:

```text
x       = nilai asli
x_min   = nilai minimum
x_max   = nilai maksimum
x_scaled = nilai setelah scaling
```

### Contoh Min-Max Scaling

Misalnya terdapat data:

```text
10
20
30
40
50
```

Nilai minimum:

```text
10
```

Nilai maksimum:

```text
50
```

Jika:

```text
x = 30
```

maka:

```text
x_scaled = (30 - 10) / (50 - 10)

         = 20 / 40

         = 0.5
```

Jadi:

```text
30 → 0.5
```

### Contoh Hasil Min-Max Scaling

Data:

```text
10
20
30
40
50
```

dapat menjadi:

```text
0.00
0.25
0.50
0.75
1.00
```

Perhatikan bahwa nilai terkecil menjadi:

```text
0
```

dan nilai terbesar menjadi:

```text
1
```

### MinMaxScaler pada Scikit-Learn

Scikit-Learn menyediakan:

```python
MinMaxScaler
```

Import:

```python
from sklearn.preprocessing import MinMaxScaler
```

Kemudian:

```python
scaler = MinMaxScaler()
```

### Contoh MinMaxScaler

Misalnya:

```python
import numpy as np

data = np.array([
    [10],
    [20],
    [30],
    [40],
    [50]
])
```

Buat scaler:

```python
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
```

Fit dan transform:

```python
scaled_data = scaler.fit_transform(data)
```

Kemudian:

```python
print(scaled_data)
```

Hasilnya kira-kira:

```text
[[0.  ]
 [0.25]
 [0.5 ]
 [0.75]
 [1.  ]]
```

## 2. Standardization

Metode kedua adalah **Standardization**.

Standardization mengubah data sehingga memiliki:

```text
Mean ≈ 0
Standard deviation ≈ 1
```

Metode ini sering disebut:

```text
Z-score standardization
```

### Rumus Standardization

Rumusnya:

```text
z = (x - μ) / σ
```

Keterangan:

```text
x = nilai asli

μ = mean atau rata-rata

σ = standard deviation

z = nilai setelah standardization
```

### Contoh Sederhana

Misalnya:

```text
Mean = 50
Standard deviation = 10
```

Jika:

```text
x = 70
```

maka:

```text
z = (70 - 50) / 10

  = 2
```

Artinya nilai tersebut berada sekitar:

```text
2 standard deviation
```

di atas mean.

### StandardScaler pada Scikit-Learn

Scikit-Learn menyediakan:

```python
StandardScaler
```

Import:

```python
from sklearn.preprocessing import StandardScaler
```

Kemudian:

```python
scaler = StandardScaler()
```

### Contoh StandardScaler

```python
import numpy as np

data = np.array([
    [10],
    [20],
    [30],
    [40],
    [50]
])
```

Buat scaler:

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
```

Kemudian:

```python
scaled_data = scaler.fit_transform(data)
```

Hasilnya akan berada di sekitar:

```text
[-1.41]
[-0.71]
[ 0.00]
[ 0.71]
[ 1.41]
```

Nilai tepatnya bergantung pada perhitungan standard deviation.

## Perbedaan Normalization dan Standardization

Secara sederhana:

| Metode | Hasil Umum | Tool Scikit-Learn |
|---|---|---|
| Min-Max Scaling | Biasanya 0 sampai 1 | `MinMaxScaler` |
| Standardization | Mean sekitar 0 dan std sekitar 1 | `StandardScaler` |

## Kapan Menggunakan MinMaxScaler?

Min-Max Scaling berguna ketika kita ingin feature berada pada rentang tertentu.

Contohnya:

```text
0 sampai 1
```

Metode ini dapat sensitif terhadap outlier karena nilai minimum dan maksimum digunakan dalam perhitungan.

Misalnya:

```text
10
20
30
40
10000
```

Nilai:

```text
10000
```

dapat memengaruhi rentang scaling secara signifikan.

## Kapan Menggunakan StandardScaler?

StandardScaler sering menjadi pilihan ketika kita ingin melakukan standardization berdasarkan:

```text
mean
standard deviation
```

Metode ini juga tetap dipengaruhi oleh outlier karena mean dan standard deviation dapat berubah akibat nilai ekstrem.

Karena itu, StandardScaler bukan berarti otomatis kebal terhadap outlier.

## Apa Itu Outlier?

**Outlier** adalah nilai yang sangat berbeda atau jauh dari sebagian besar data.

Contoh:

```text
10
11
12
13
14
1000
```

Nilai:

```text
1000
```

dapat dianggap sebagai nilai ekstrem dalam konteks tertentu.

Outlier dapat memengaruhi:

- mean;
- standard deviation;
- Min-Max Scaling;
- model tertentu.

## Scaling dan Outlier

Misalnya:

```text
10
20
30
40
1000
```

Jika menggunakan Min-Max Scaling:

```text
10   → 0.00
20   → ...
30   → ...
40   → ...
1000 → 1.00
```

Sebagian besar data menjadi sangat dekat dengan:

```text
0
```

karena rentangnya didominasi oleh `1000`.

Jika dataset memiliki banyak outlier, kita perlu mempertimbangkan metode preprocessing yang sesuai.

Scikit-Learn juga menyediakan scaler yang lebih robust seperti:

```python
RobustScaler
```

yang menggunakan statistik berbasis median dan interquartile range.

## RobustScaler

Import:

```python
from sklearn.preprocessing import RobustScaler
```

Contoh:

```python
scaler = RobustScaler()
```

RobustScaler dapat menjadi pilihan ketika data memiliki outlier yang cukup kuat.

Namun, bukan berarti RobustScaler selalu lebih baik.

Pemilihan scaler tetap bergantung pada:

- karakteristik data;
- algoritma;
- tujuan eksperimen;
- distribusi feature.

## Contoh Dataset Mobil

Sekarang kita kembali ke contoh:

```text
Odometer (KM)
6.000 – 345.000

Repair Cost
100 – 1.700
```

Perbedaan rentangnya cukup besar.

Misalnya:

```text
Odometer = 200000
Repair Cost = 1000
```

Jika algoritma menggunakan perhitungan berbasis jarak, Odometer dapat memiliki pengaruh numerik jauh lebih besar.

Dengan scaling:

```text
Odometer
   ↓
nilai terstandardisasi

Repair Cost
   ↓
nilai terstandardisasi
```

keduanya dapat memiliki skala yang lebih sebanding.

## Contoh Menggunakan Dataset Sederhana

Misalnya:

```python
import pandas as pd

data = pd.DataFrame({
    "Odometer": [
        6000,
        50000,
        150000,
        345000
    ],
    "Repair_Cost": [
        100,
        500,
        1000,
        1700
    ]
})
```

Lihat data:

```python
data
```

## Menggunakan StandardScaler

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()

scaled_data = scaler.fit_transform(data)
```

Hasilnya dapat dikonversi kembali menjadi DataFrame:

```python
scaled_df = pd.DataFrame(
    scaled_data,
    columns=data.columns
)

scaled_df
```

Sekarang kedua feature memiliki skala yang lebih sebanding.

## Jangan Melakukan Scaling Sebelum Train-Test Split

Ini adalah konsep yang sangat penting.

Jangan melakukan:

```python
scaler.fit_transform(X)
```

pada seluruh dataset sebelum melakukan train-test split.

Mengapa?

Karena scaler akan mempelajari statistik dari seluruh dataset.

Untuk:

```text
StandardScaler
```

statistik yang dipelajari meliputi:

```text
mean
standard deviation
```

Untuk:

```text
MinMaxScaler
```

statistik yang dipelajari meliputi:

```text
minimum
maximum
```

Jika test set ikut digunakan saat `fit`, maka informasi dari test set masuk ke preprocessing.

## Workflow Scaling yang Benar

Gunakan:

```text
Dataset
   │
   ▼
Train-Test Split
   │
   ├──────────────┐
   │              │
Training         Test
   │              │
   ▼              │
Fit Scaler        │
   │              │
   ▼              │
Transform         │
Training          │
                  │
                  ▼
              Transform
                 Test
```

Dalam kode:

```python
scaler.fit(X_train)

X_train_scaled = scaler.transform(X_train)

X_test_scaled = scaler.transform(X_test)
```

Atau:

```python
X_train_scaled = scaler.fit_transform(
    X_train
)

X_test_scaled = scaler.transform(
    X_test
)
```

## Mengapa Test Hanya Menggunakan `transform()`?

Karena test set berfungsi sebagai data yang belum digunakan untuk mempelajari parameter preprocessing.

Contohnya StandardScaler:

```text
X_train
   ↓
  fit
   ↓
mean dan std dipelajari
```

Kemudian:

```text
X_test
   ↓
transform
   ↓
menggunakan mean dan std dari training
```

Bukan menghitung mean dan std baru dari test.

## Scaling dengan Pipeline

Dalam workflow Machine Learning, kita dapat menggunakan Pipeline.

Contoh:

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipeline = Pipeline(
    steps=[
        ("scaler", StandardScaler()),
        ("model", LogisticRegression())
    ]
)
```

Kemudian:

```python
pipeline.fit(
    X_train,
    y_train
)
```

dan:

```python
pipeline.score(
    X_test,
    y_test
)
```

Pipeline akan menangani urutan:

```text
X_train
   ↓
StandardScaler
   ↓
Model
```

## Scaling dan ColumnTransformer

Jika dataset memiliki categorical dan numerical features, kita dapat menggabungkan scaling dengan encoding.

Contohnya:

```text
Dataset
   │
   ├── Numerical Features
   │       │
   │       ▼
   │   SimpleImputer
   │       │
   │       ▼
   │   StandardScaler
   │
   └── Categorical Features
           │
           ▼
       SimpleImputer
           │
           ▼
       OneHotEncoder
```

Kemudian semuanya dapat digabungkan dengan:

```python
ColumnTransformer
```

## Contoh Pipeline Lengkap

Misalnya dataset memiliki:

```text
Age
Income
City
```

Kita dapat membuat:

```python
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import (
    StandardScaler,
    OneHotEncoder
)
```

Tentukan feature:

```python
numeric_features = [
    "Age",
    "Income"
]

categorical_features = [
    "City"
]
```

Numerical pipeline:

```python
numeric_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="median"
            )
        ),
        (
            "scaler",
            StandardScaler()
        )
    ]
)
```

Categorical pipeline:

```python
categorical_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="most_frequent"
            )
        ),
        (
            "onehot",
            OneHotEncoder(
                handle_unknown="ignore"
            )
        )
    ]
)
```

Kemudian gabungkan:

```python
preprocessor = ColumnTransformer(
    transformers=[
        (
            "numeric",
            numeric_pipeline,
            numeric_features
        ),
        (
            "categorical",
            categorical_pipeline,
            categorical_features
        )
    ]
)
```

Workflow menjadi:

```text
                 Dataset
                    │
          ┌─────────┴─────────┐
          │                   │
      Numerical           Categorical
          │                   │
          ▼                   ▼
     Imputation           Imputation
          │                   │
          ▼                   ▼
   StandardScaler       OneHotEncoder
          │                   │
          └─────────┬─────────┘
                    │
                    ▼
             Machine Learning
                 Model
```

## Algoritma yang Biasanya Membutuhkan Scaling

Beberapa algoritma yang sering sensitif terhadap skala:

### K-Nearest Neighbors

KNN menggunakan jarak untuk menentukan tetangga.

```text
Scaling
   ↓
Penting
```

### K-Means

K-Means menggunakan jarak untuk menentukan cluster.

```text
Scaling
   ↓
Penting
```

### Support Vector Machine

SVM dapat dipengaruhi oleh skala feature.

```text
Scaling
   ↓
Umumnya penting
```

### Logistic Regression

Logistic Regression menggunakan proses optimisasi yang dapat dipengaruhi oleh skala feature.

```text
Scaling
   ↓
Sering direkomendasikan
```

### Neural Network

Neural Network umumnya bekerja lebih baik ketika input berada pada skala yang sesuai.

```text
Scaling
   ↓
Sering penting
```

## Algoritma yang Biasanya Tidak Terlalu Membutuhkan Scaling

Beberapa algoritma berbasis tree:

```text
Decision Tree
Random Forest
```

biasanya tidak membutuhkan feature scaling seperti algoritma berbasis jarak.

Misalnya:

```python
RandomForestClassifier()
```

dapat bekerja dengan feature yang memiliki rentang berbeda tanpa harus melakukan StandardScaler terlebih dahulu.

Namun, preprocessing lain seperti missing value handling dan encoding tetap dapat diperlukan.

## Jangan Melakukan Scaling pada Target Secara Sembarangan

Feature scaling biasanya diterapkan pada:

```text
X
```

yaitu feature.

Sedangkan:

```text
y
```

adalah target.

Contohnya:

```python
X_train_scaled = scaler.fit_transform(
    X_train
)
```

bukan berarti kita harus selalu melakukan:

```python
y_train_scaled = scaler.fit_transform(
    y_train
)
```

Scaling target merupakan keputusan preprocessing yang berbeda dan bergantung pada jenis masalah serta algoritma.

Untuk tahap pemula, fokus terlebih dahulu pada:

```text
Feature Scaling → X
```

## Apakah Scaling Mengubah Hubungan Antar Data?

Scaling mengubah skala numerik tetapi mempertahankan hubungan tertentu sesuai metode transformasinya.

Misalnya:

```text
10
20
30
```

Min-Max Scaling menghasilkan:

```text
0
0.5
1
```

Urutan tetap:

```text
10 < 20 < 30
```

Namun, penting untuk memahami bahwa tidak semua hubungan statistik dipertahankan secara identik oleh semua transformasi.

Scaling adalah transformasi data, bukan sekadar mengganti satuan.

## Kesalahan Umum Feature Scaling

### Kesalahan 1 - Scaling Seluruh Dataset Sebelum Split

Jangan:

```python
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled,
    y
)
```

Karena scaler sudah mempelajari informasi dari seluruh dataset.

Gunakan:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

X_train_scaled = scaler.fit_transform(
    X_train
)

X_test_scaled = scaler.transform(
    X_test
)
```

### Kesalahan 2 - Melakukan `fit` pada Test Set

Jangan:

```python
X_test_scaled = scaler.fit_transform(
    X_test
)
```

Gunakan:

```python
X_test_scaled = scaler.transform(
    X_test
)
```

### Kesalahan 3 - Menganggap Semua Model Membutuhkan Scaling

Tidak semua algoritma membutuhkan scaling.

Misalnya:

```text
Random Forest
Decision Tree
```

umumnya tidak membutuhkan scaling.

### Kesalahan 4 - Mengabaikan Outlier

MinMaxScaler dan StandardScaler dapat dipengaruhi oleh outlier.

Jika dataset memiliki banyak nilai ekstrem, pertimbangkan untuk memeriksa distribusi data terlebih dahulu.

## Workflow Feature Scaling

Workflow sederhana:

```text
Dataset
   │
   ▼
Memahami Data
   │
   ▼
Pisahkan X dan y
   │
   ▼
Train-Test Split
   │
   ▼
Apakah Model Sensitif terhadap Skala?
   │
   ├── Tidak ──► Scaling mungkin tidak diperlukan
   │
   └── Ya
        │
        ▼
   Pilih Scaler
        │
        ├── MinMaxScaler
        │
        ├── StandardScaler
        │
        └── RobustScaler
        │
        ▼
   Fit pada Training
        │
        ▼
   Transform Training
        │
        ▼
   Transform Test
        │
        ▼
   Train Model
        │
        ▼
   Evaluate
```

## Checklist Feature Scaling

Sebelum melakukan scaling, tanyakan:

- [ ] Apakah model yang digunakan sensitif terhadap skala?
- [ ] Apakah feature memiliki rentang yang sangat berbeda?
- [ ] Apakah terdapat outlier?
- [ ] Apakah menggunakan MinMaxScaler?
- [ ] Apakah menggunakan StandardScaler?
- [ ] Apakah RobustScaler lebih sesuai?
- [ ] Apakah train-test split sudah dilakukan?
- [ ] Apakah scaler hanya di-fit pada training data?
- [ ] Apakah test data hanya menggunakan `transform()`?
- [ ] Apakah scaling dimasukkan ke Pipeline?

## Ringkasan

**Feature Scaling** adalah proses mengubah skala feature agar berada pada skala yang lebih sesuai untuk algoritma tertentu.

Misalnya:

```text
Odometer
6.000 – 345.000

Repair Cost
100 – 1.700
```

Perbedaan skala tersebut dapat menjadi masalah terutama pada algoritma yang menggunakan jarak atau proses optimisasi.

Dua teknik yang umum:

```text
Min-Max Scaling
       ↓
Rentang biasanya 0–1
```

dan:

```text
Standardization
       ↓
Mean ≈ 0
Standard deviation ≈ 1
```

Scikit-Learn menyediakan:

```python
MinMaxScaler
```

```python
StandardScaler
```

dan:

```python
RobustScaler
```

Yang paling penting adalah **jangan melakukan `fit` scaler menggunakan test data**.

Workflow yang benar:

```text
Train-Test Split
       ↓
Fit Scaler pada Training
       ↓
Transform Training
       ↓
  Transform Test
       ↓
  Train Model
       ↓
    Evaluate
```

Untuk workflow yang lebih kompleks, gunakan:

```text
Pipeline
+
ColumnTransformer
```

sehingga preprocessing dapat dilakukan secara konsisten.

## Cheat Sheet

| Kebutuhan | Scikit-Learn |
|---|---|
| Min-Max Scaling | `MinMaxScaler()` |
| Standardization | `StandardScaler()` |
| Scaling yang lebih robust terhadap outlier | `RobustScaler()` |
| Fit scaler | `scaler.fit(X_train)` |
| Fit + transform training | `scaler.fit_transform(X_train)` |
| Transform test | `scaler.transform(X_test)` |
| Gabungkan preprocessing | `ColumnTransformer()` |
| Gabungkan preprocessing + model | `Pipeline()` |
