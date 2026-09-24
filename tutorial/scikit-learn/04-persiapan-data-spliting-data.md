---
sidebar_position: 5
title: "Persiapan Data: Splitting Data"
---

Sebelum sebuah model **Machine Learning** dapat dilatih, data harus dipersiapkan terlebih dahulu.

Model Machine Learning tidak langsung bekerja dengan dataset mentah. Data perlu disusun sehingga:

- fitur dan target dapat dibedakan;
- data training dan testing dapat dipisahkan;
- missing values ditangani;
- data kategorikal dapat diubah menjadi bentuk yang sesuai;
- data tidak mengalami data leakage.

Dalam Scikit-Learn, proses ini merupakan bagian penting dari workflow Machine Learning.

## Apa Itu Getting Data Ready?

**Getting data ready** berarti menyiapkan dataset agar dapat digunakan oleh algoritma Machine Learning.

Secara sederhana:

```text
Raw Data
   │
   ▼
Memahami Dataset
   │
   ▼
Memisahkan X dan y
   │
   ▼
Train-Test Split
   │
   ▼
Menangani Missing Values
   │
   ▼
Encoding Data Kategorikal
   │
   ▼
Data Siap untuk Modeling
```

Perlu diperhatikan bahwa urutan teknis dapat berbeda tergantung dataset dan metode preprocessing yang digunakan.

## Tiga Komponen Utama Data Machine Learning

Dalam supervised learning, dataset biasanya memiliki dua bagian utama:

```text
Dataset
│
├── Features (X)
│
└── Target / Label (y)
```

### Features - X

**Features** adalah variabel input yang digunakan model untuk membuat prediksi.

Misalnya kita memiliki dataset penyakit jantung:

| age | sex | cp | chol | target |
|---:|---:|---:|---:|---:|
| 63 | 1 | 1 | 233 | 1 |
| 37 | 1 | 3 | 250 | 1 |
| 41 | 0 | 2 | 204 | 1 |
| 56 | 1 | 2 | 236 | 1 |

Jika `target` adalah variabel yang ingin diprediksi, maka:

```text
X = age, sex, cp, chol, ...
y = target
```

Dengan kata lain:

```text
X → informasi yang digunakan untuk membuat prediksi

y → hasil yang ingin diprediksi
```

### Target - y

**Target** adalah variabel yang ingin diprediksi oleh model.

Target juga sering disebut:

- label;
- output;
- dependent variable;
- response variable.

Contohnya:

```text
Prediksi penyakit jantung
        │
        ▼
Target = target
```

Jika:

```text
target = 1
```

misalnya berarti pasien memiliki kondisi tertentu, sedangkan:

```text
target = 0
```

berarti tidak memiliki kondisi tersebut.

Makna angka tersebut tetap bergantung pada definisi dataset.

## Memisahkan X dan y dengan Pandas

Misalnya dataset disimpan dalam DataFrame bernama:

```python
heart_disease
```

dan kolom target bernama:

```text
target
```

Kita dapat memisahkan fitur dan target menggunakan:

```python
X = heart_disease.drop("target", axis=1)
y = heart_disease["target"]
```

Sekarang:

```text
X → seluruh kolom kecuali target

y → kolom target
```

## Memahami `axis=1`

Pada Pandas:

```python
axis=0
```

umumnya digunakan untuk operasi sepanjang index atau baris.

Sedangkan:

```python
axis=1
```

digunakan untuk operasi pada kolom.

Karena kita ingin menghapus kolom `target`, digunakan:

```python
heart_disease.drop("target", axis=1)
```

Kita juga dapat menggunakan bentuk yang lebih eksplisit:

```python
X = heart_disease.drop(columns="target")
```

Untuk pemula, bentuk `columns=` sering lebih mudah dibaca karena langsung menjelaskan bahwa yang dihapus adalah kolom.

## Memeriksa X dan y

Setelah memisahkan data, jangan langsung melakukan modeling.

Periksa terlebih dahulu:

```python
print(X.head())
```

Kemudian:

```python
print(y.head())
```

Periksa juga dimensinya:

```python
print(X.shape)
print(y.shape)
```

Contoh:

```text
(303, 13)
(303,)
```

Artinya:

```text
X memiliki 303 baris dan 13 fitur

y memiliki 303 nilai target
```

Jumlah sampel pada `X` dan `y` harus sesuai.

## Mengapa X dan y Harus Memiliki Jumlah Sampel yang Sama?

Setiap baris pada `X` harus memiliki target yang sesuai pada `y`.

Contohnya:

```text
X                         y
────────────────────────────────
Pasien 1                  1
Pasien 2                  0
Pasien 3                  1
Pasien 4                  0
```

Jika terdapat 303 baris pada `X`, maka `y` juga harus memiliki 303 target.

Secara sederhana:

```text
X.shape[0] == y.shape[0]
```

harus bernilai:

```text
True
```

## Memisahkan Data Training dan Testing

Setelah `X` dan `y` ditentukan, data perlu dibagi menjadi beberapa bagian.

Yang paling sederhana adalah:

```text
Dataset
│
├── Training Set
│
└── Test Set
```

### Training Set

Training set digunakan untuk melatih model.

Model mempelajari pola dari:

```text
X_train
y_train
```

### Test Set

Test set digunakan untuk mengevaluasi model terhadap data yang tidak digunakan untuk fitting model.

Data tersebut terdiri dari:

```text
X_test
y_test
```

## Mengapa Data Harus Dibagi?

Bayangkan kita ingin mengetahui kemampuan siswa.

Kita memberikan siswa soal:

```text
Soal latihan
```

kemudian siswa mempelajarinya.

Jika kita menguji siswa menggunakan soal yang sama persis, hasilnya belum tentu menunjukkan kemampuan siswa dalam menghadapi soal baru.

Konsep yang sama berlaku pada Machine Learning.

```text
Training Data
     │
     ▼
Model belajar
     │
     ▼
Test Data
     │
     ▼
Mengukur generalisasi
```

Tujuannya adalah mengetahui apakah model dapat bekerja pada data yang belum digunakan untuk fitting.

## `train_test_split`

Scikit-Learn menyediakan fungsi:

```python
train_test_split
```

yang berada pada:

```python
sklearn.model_selection
```

Import:

```python
from sklearn.model_selection import train_test_split
```

Kemudian:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2
)
```

## Memahami Hasil `train_test_split`

Kode:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2
)
```

menghasilkan empat bagian:

```text
X_train → fitur untuk training

X_test  → fitur untuk testing

y_train → target untuk training

y_test  → target untuk testing
```

Secara visual:

```text
                Dataset
                   │
          ┌────────┴────────┐
          │                 │
       80%                 20%
          │                 │
      Training             Test
          │                 │
     X_train/y_train    X_test/y_test
```

## Memahami `test_size`

Parameter:

```python
test_size=0.2
```

berarti sekitar **20% data digunakan sebagai test set**.

Sisanya digunakan sebagai training set.

Contohnya jika dataset memiliki:

```text
1000 samples
```

maka secara sederhana:

```text
Training ≈ 800 samples
Testing  ≈ 200 samples
```

Jika menggunakan:

```python
test_size=0.3
```

maka:

```text
Training ≈ 70%
Testing  ≈ 30%
```

Sedangkan:

```python
test_size=0.1
```

berarti sekitar:

```text
Training ≈ 90%
Testing  ≈ 10%
```

## Menggunakan `random_state`

`train_test_split()` melakukan pembagian secara acak secara default.

Akibatnya, jika kita menjalankan kode berulang kali:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2
)
```

hasil pembagian dapat berbeda.

Untuk membuat pembagian yang dapat direproduksi, kita dapat menggunakan:

```python
random_state=42
```

Contoh:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

Angka `42` bukan angka khusus yang wajib digunakan.

Kita dapat menggunakan integer lain, misalnya:

```python
random_state=7
```

atau:

```python
random_state=123
```

Yang penting adalah menggunakan nilai yang sama ketika ingin mendapatkan pembagian acak yang sama.

## Mengapa Reproducibility Penting?

Misalnya kita melakukan eksperimen:

```text
Experiment 1
Accuracy = 0.84
```

Kemudian kita menjalankan ulang program dan mendapatkan:

```text
Experiment 2
Accuracy = 0.79
```

Perbedaan tersebut bisa terjadi karena data training dan testing yang berbeda.

Dengan:

```python
random_state=42
```

pembagian data dapat dibuat konsisten sehingga eksperimen lebih mudah dibandingkan.

## Memeriksa Ukuran Dataset

Setelah melakukan split:

```python
print(X_train.shape)
print(X_test.shape)
print(y_train.shape)
print(y_test.shape)
```

Misalnya hasilnya:

```text
(242, 13)
(61, 13)
(242,)
(61,)
```

Maka:

```text
Total data = 303

Training = 242
Testing  = 61
```

dan:

```text
242 + 61 = 303
```

## Menggunakan `stratify` pada Classification

Pada masalah classification, distribusi kelas perlu diperhatikan.

Misalnya target memiliki:

```text
Class 0 → 50%
Class 1 → 50%
```

Kita biasanya ingin agar proporsi tersebut tetap relatif terjaga pada training dan test set.

Scikit-Learn menyediakan:

```python
stratify=y
```

Contoh:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)
```

Dengan `stratify=y`, pembagian data mempertimbangkan distribusi kelas pada target.

Ini terutama berguna ketika dataset classification memiliki distribusi kelas yang perlu dipertahankan.

## Contoh Lengkap Memisahkan X dan y

Berikut contoh workflow sederhana:

```python
import pandas as pd
from sklearn.model_selection import train_test_split

# Membaca dataset
heart_disease = pd.read_csv("heart-disease.csv")

# Memisahkan features dan target
X = heart_disease.drop(columns="target")
y = heart_disease["target"]

# Membagi data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Melihat ukuran data
print("X:", X.shape)
print("y:", y.shape)

print("X_train:", X_train.shape)
print("X_test:", X_test.shape)

print("y_train:", y_train.shape)
print("y_test:", y_test.shape)
```

## Missing Values

Setelah memisahkan `X` dan `y`, masalah lain yang sering ditemukan adalah **missing values**.

Missing value adalah nilai yang tidak tersedia pada suatu kolom atau baris.

Contohnya:

| age | sex | cholesterol |
|---:|---:|---:|
| 63 | 1 | 233 |
| 37 | 1 | 250 |
| 41 | 0 | NaN |
| 56 | 1 | 236 |

`NaN` menunjukkan bahwa nilai pada kolom tersebut tidak tersedia.

## Mengapa Missing Values Perlu Ditangani?

Banyak algoritma Machine Learning tidak dapat langsung bekerja dengan missing values dalam bentuk `NaN`.

Karena itu, kita perlu menentukan strategi.

Dua pendekatan umum adalah:

```text
Missing Values
      │
      ├── Imputation
      │
      └── Remove
```

## Menghapus Data yang Missing

Salah satu cara sederhana adalah menghapus baris yang memiliki missing values.

Dengan Pandas:

```python
heart_disease.dropna()
```

Jika ingin menyimpan hasilnya:

```python
heart_disease = heart_disease.dropna()
```

Namun, menghapus data bukan selalu pilihan terbaik.

Jika terlalu banyak data yang dihapus, jumlah data training dapat berkurang secara signifikan.

## Mengisi Missing Values

Pendekatan lainnya adalah **imputation**.

Misalnya missing value pada fitur numerik dapat diisi menggunakan nilai tertentu seperti:

```text
Mean
Median
```

Contoh sederhana menggunakan Pandas:

```python
heart_disease["age"] = heart_disease["age"].fillna(
    heart_disease["age"].median()
)
```

Namun, dalam workflow Machine Learning, penggunaan Scikit-Learn `SimpleImputer` dan Pipeline sering lebih aman karena membantu mencegah data leakage.

## Data Leakage pada Missing Value Imputation

Misalnya kita ingin menggunakan median seluruh dataset:

```python
median = heart_disease["age"].median()
```

Kemudian menggunakan nilai tersebut sebelum melakukan train-test split.

Hal ini dapat menyebabkan informasi dari test set ikut memengaruhi preprocessing.

Pendekatan yang lebih aman adalah:

```text
Data
 │
 ├── Training
 │      │
 │      └── Fit imputer
 │
 └── Test
        │
        └── Transform menggunakan imputer training
```

Dengan kata lain:

> Parameter preprocessing sebaiknya dipelajari dari training data saja.

## Feature Encoding

Masalah berikutnya adalah data kategorikal.

Misalnya:

| color | price |
|---|---:|
| red | 100 |
| blue | 120 |
| green | 90 |

Kolom:

```text
color
```

berisi teks.

Banyak algoritma Machine Learning membutuhkan representasi numerik.

Karena itu kita perlu melakukan **encoding**.

## Contoh One-Hot Encoding

Misalnya terdapat kategori:

```text
red
blue
green
```

One-hot encoding dapat menghasilkan:

| color_red | color_blue | color_green |
|---:|---:|---:|
| 1 | 0 | 0 |
| 0 | 1 | 0 |
| 0 | 0 | 1 |

Dengan demikian data kategorikal dapat direpresentasikan sebagai angka tanpa menganggap:

```text
red < blue < green
```

sebagai hubungan numerik.

## Encoding dengan Scikit-Learn

Scikit-Learn menyediakan:

```python
from sklearn.preprocessing import OneHotEncoder
```

Contoh:

```python
from sklearn.preprocessing import OneHotEncoder

encoder = OneHotEncoder(
    handle_unknown="ignore"
)
```

Dalam project nyata, encoder biasanya digunakan bersama `ColumnTransformer` dan `Pipeline` agar preprocessing training dan test konsisten.

## Pipeline untuk Preprocessing

Untuk workflow Machine Learning yang lebih aman, preprocessing dapat dimasukkan ke dalam Pipeline.

Contoh konsep:

```text
Raw Data
   │
   ▼
Preprocessing
   │
   ├── Missing Value Imputation
   │
   ├── Encoding
   │
   └── Scaling
   │
   ▼
Machine Learning Model
   │
   ▼
Prediction
```

Pipeline membantu memastikan tahapan preprocessing dijalankan secara konsisten.

## Urutan Umum Persiapan Data

Workflow sederhana dapat digambarkan sebagai:

```text
Dataset
   │
   ▼
Pahami Data
   │
   ▼
Tentukan Target
   │
   ▼
Pisahkan X dan y
   │
   ▼
Train-Test Split
   │
   ▼
Preprocessing
   │
   ├── Missing Values
   ├── Encoding
   └── Scaling jika diperlukan
   │
   ▼
Training Model
```

Perlu diperhatikan bahwa detail urutan preprocessing dapat berbeda sesuai jenis data dan workflow yang digunakan.

## Jangan Melakukan Preprocessing Sebelum Split Secara Sembarangan

Kesalahan umum adalah melakukan seluruh preprocessing pada dataset sebelum membagi training dan testing.

Contohnya:

```text
Seluruh Dataset
      │
      ▼
Fit Scaler
      │
      ▼
Train-Test Split
```

Jika scaler atau imputer mempelajari parameter dari seluruh dataset, informasi dari test set dapat masuk ke proses preprocessing.

Workflow yang lebih aman:

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
Fit               │
Preprocessor      │
   │              │
   ▼              │
Transform         │
Training          │
                  │
                  ▼
             Transform Test
```

Parameter preprocessing dipelajari dari training data, kemudian diterapkan ke data test.

## Mengapa Data Leakage Berbahaya?

**Data leakage** terjadi ketika informasi yang seharusnya tidak tersedia bagi model pada saat training masuk ke proses pembelajaran atau preprocessing.

Akibatnya, performa model dapat terlihat lebih baik daripada kemampuan sebenarnya ketika menghadapi data baru.

Contoh:

```text
Test Data
   │
   ▼
Informasi masuk ke preprocessing
   │
   ▼
Model mendapatkan informasi yang seharusnya tidak tersedia
```

Hal tersebut dapat menyebabkan evaluasi menjadi terlalu optimistis.

## Training Set dan Test Set dalam Workflow

Secara konseptual:

```text
                    Dataset
                       │
             ┌─────────┴─────────┐
             │                   │
          Training              Test
             │                   │
             ▼                   │
       Preprocessing             │
             │                   │
             ▼                   │
         Model Fit               │
             │                   │
             └─────────┬─────────┘
                       │
                       ▼
                 Final Evaluation
```

Test set sebaiknya diperlakukan sebagai data yang belum pernah digunakan untuk fitting model maupun mempelajari parameter preprocessing.

## Contoh Workflow Lengkap

Berikut contoh sederhana dari awal:

```python
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# 1. Membaca dataset
heart_disease = pd.read_csv("heart-disease.csv")

# 2. Memisahkan features dan target
X = heart_disease.drop(columns="target")
y = heart_disease["target"]

# 3. Membagi data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# 4. Membuat model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

# 5. Melatih model
model.fit(X_train, y_train)

# 6. Membuat prediksi
y_preds = model.predict(X_test)

# 7. Mengevaluasi model
score = model.score(X_test, y_test)

print("Test score:", score)
```

Pada contoh tersebut, kita sudah melakukan beberapa tahapan utama:

```text
Read Data
    ↓
 X dan y
    ↓
Train-Test Split
    ↓
  Model
    ↓
   Fit
    ↓
 Predict
    ↓
Evaluate
```

Jika dataset mengandung missing values atau data kategorikal, preprocessing tambahan perlu dilakukan sebelum model dilatih.

## Checklist Getting Data Ready

Sebelum masuk ke tahap modeling, gunakan checklist berikut.

### Memahami Dataset

- [ ] Sudah mengetahui jumlah baris dan kolom.
- [ ] Sudah mengetahui nama setiap kolom.
- [ ] Sudah mengetahui tipe data.
- [ ] Sudah mengetahui target yang ingin diprediksi.
- [ ] Sudah memeriksa missing values.

### Menyiapkan X dan y

- [ ] Features sudah dipisahkan menjadi `X`.
- [ ] Target sudah dipisahkan menjadi `y`.
- [ ] Jumlah sampel `X` dan `y` sama.

### Membagi Data

- [ ] Dataset sudah dibagi menjadi training dan testing.
- [ ] `random_state` digunakan jika membutuhkan reproducibility.
- [ ] `stratify=y` dipertimbangkan untuk classification.

### Preprocessing

- [ ] Missing values sudah ditangani.
- [ ] Data kategorikal sudah diencode jika diperlukan.
- [ ] Scaling dilakukan jika algoritma membutuhkannya.
- [ ] Preprocessing tidak menggunakan informasi dari test set.

### Sebelum Modeling

- [ ] Tidak terdapat data leakage.
- [ ] Training dan test set sudah dipisahkan.
- [ ] Data sudah sesuai dengan kebutuhan estimator yang digunakan.

## Ringkasan

Persiapan data merupakan salah satu tahap paling penting dalam Machine Learning.

Secara umum kita perlu:

```text
1. Memahami dataset
        ↓
2. Memisahkan X dan y
        ↓
3. Membagi training dan testing
        ↓
4. Menangani missing values
        ↓
5. Melakukan feature encoding
        ↓
6. Melakukan preprocessing yang diperlukan
        ↓
7. Memastikan tidak terjadi data leakage
        ↓
8. Data siap digunakan untuk modeling
```

Konsep yang perlu benar-benar dipahami adalah:

| Konsep | Fungsi |
|---|---|
| `X` | Features/input |
| `y` | Target/label |
| `train_test_split()` | Membagi data |
| `test_size` | Menentukan proporsi test set |
| `random_state` | Membantu reproducibility |
| `stratify` | Mempertahankan proporsi kelas |
| Missing values | Data yang tidak tersedia |
| Imputation | Mengisi missing values |
| Encoding | Mengubah data kategorikal menjadi representasi numerik |
| Data leakage | Masuknya informasi yang seharusnya tidak tersedia ke proses modeling |
