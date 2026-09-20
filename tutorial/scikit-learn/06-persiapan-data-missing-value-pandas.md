---
sidebar_position: 6
title: "Persiapan Data: Missing Values dengan Pandas"
---

Dalam dataset dunia nyata, tidak semua data selalu tersedia dengan lengkap.

Kita mungkin menemukan data seperti:

```text
Make       Colour    Doors    Odometer    Price
Toyota     Blue      4        150000      5000
Honda      NaN       4        120000      6000
BMW        Black     NaN      80000       12000
NaN        Red       4        NaN         7000
```

Nilai yang tidak tersedia tersebut disebut **missing values**.

Dalam Pandas, missing values biasanya direpresentasikan sebagai:

```text
NaN
```

atau bentuk missing lainnya tergantung tipe data.

Sebelum data digunakan untuk Machine Learning, missing values perlu ditangani dengan strategi yang sesuai.

## Apa Itu Missing Values?

**Missing value** adalah kondisi ketika suatu data pada sebuah feature atau target tidak memiliki nilai.

Contoh:

| Make | Colour | Doors | Odometer (KM) | Price |
|---|---|---:|---:|---:|
| Toyota | Blue | 4 | 150000 | 5000 |
| Honda | NaN | 4 | 120000 | 6000 |
| BMW | Black | NaN | 80000 | 12000 |
| NaN | Red | 4 | NaN | 7000 |

Pada contoh tersebut terdapat missing values pada:

```text
Colour
Doors
Make
Odometer (KM)
```

## Mengapa Missing Values Harus Ditangani?

Banyak algoritma Machine Learning tidak dapat langsung memproses nilai `NaN`.

Misalnya kita memiliki:

```python
X = car_sales_missing.drop("Price", axis=1)
```

Kemudian langsung menjalankan:

```python
model.fit(X, y)
```

Model tertentu dapat menghasilkan error karena masih terdapat nilai yang hilang.

Selain masalah teknis, missing values juga dapat memengaruhi kualitas model.

Karena itu, sebelum modeling kita perlu menentukan strategi untuk menangani data tersebut.

## Dua Pendekatan Utama

Secara umum terdapat dua pendekatan utama:

```text
Missing Values
      │
      ├───────────────┐
      │               │
      ▼               ▼
Imputation         Removal
      │               │
      ▼               ▼
Mengisi nilai      Menghapus data
yang hilang        yang hilang
```

Keduanya memiliki kelebihan dan kekurangan.

## Pendekatan 1 - Imputation

**Imputation** adalah proses mengisi missing values menggunakan nilai pengganti.

Contohnya:

```text
NaN
 ↓
Mean
```

atau:

```text
NaN
 ↓
Median
```

atau:

```text
NaN
 ↓
Missing
```

Nilai pengganti dipilih berdasarkan jenis feature dan karakteristik dataset.

## Kelebihan Imputation

Salah satu keuntungan utama imputation adalah jumlah sampel dapat dipertahankan.

Misalnya:

```text
Dataset awal = 1000 baris
```

Jika terdapat missing values pada 100 baris, kita tidak harus langsung menghapus 100 baris tersebut.

Dengan imputation:

```text
1000 baris
   ↓
1000 baris
```

Data yang hilang diganti dengan nilai yang dipilih.

## Kekurangan Imputation

Nilai yang kita masukkan bukan nilai asli yang sebenarnya.

Misalnya:

```text
Age

20
22
NaN
24
26
```

Jika `NaN` diganti dengan mean:

```text
23
```

kita tidak mengetahui apakah nilai sebenarnya memang `23`.

Artinya, imputation menghasilkan nilai estimasi.

## Pendekatan 2 - Removal

Pendekatan kedua adalah menghapus data yang memiliki missing values.

Contohnya:

```python
car_sales_missing.dropna()
```

Jika terdapat baris:

```text
Toyota | Blue | 4 | 150000 | 5000
Honda  | NaN  | 4 | 120000 | 6000
```

baris kedua dapat dihapus karena memiliki missing value.

## Kelebihan Removal

Data yang tersisa tidak mendapatkan nilai hasil imputasi.

Dengan kata lain, kita tidak memasukkan nilai pengganti ke dalam dataset.

## Kekurangan Removal

Jumlah data akan berkurang.

Misalnya:

```text
Dataset awal
1000 samples
     ↓
dropna()
     ↓
750 samples
```

Kita kehilangan:

```text
250 samples
```

Jika dataset kecil, kehilangan banyak sampel dapat menjadi masalah.

## Kapan Menggunakan Imputation atau Removal?

Tidak ada satu metode yang selalu benar.

Pemilihan strategi bergantung pada:

- jumlah missing values;
- ukuran dataset;
- jenis feature;
- distribusi data;
- pentingnya feature;
- apakah target memiliki missing value;
- kebutuhan model;
- konteks domain.

Secara sederhana:

| Metode | Kelebihan | Kekurangan |
|---|---|---|
| Imputation | Mempertahankan jumlah sampel | Nilai yang dimasukkan merupakan estimasi |
| Removal | Tidak memasukkan nilai hasil estimasi | Mengurangi jumlah data |

## Memeriksa Missing Values

Sebelum melakukan apa pun, kita harus mengetahui berapa banyak missing values yang terdapat dalam dataset.

Misalnya:

```python
import pandas as pd

car_sales_missing = pd.read_csv(
    "data/car-sales-extended-missing-data.csv"
)
```

Kemudian:

```python
car_sales_missing.isna().sum()
```

Contoh hasil:

```text
Make              50
Colour            50
Odometer (KM)     50
Doors             50
Price             50
dtype: int64
```

Artinya masing-masing kolom memiliki sejumlah missing values.

## `isna()`

Method:

```python
isna()
```

digunakan untuk mendeteksi missing values.

Contoh:

```python
car_sales_missing.isna()
```

Hasilnya berupa nilai Boolean:

```text
True
False
```

`True` menunjukkan bahwa nilai tersebut missing.

## Menghitung Missing Values

Untuk menghitung jumlah missing values:

```python
car_sales_missing.isna().sum()
```

Penjelasannya:

```text
isna()
  ↓
Mendeteksi missing value
  ↓
True / False
  ↓
sum()
  ↓
Menghitung jumlah True
```

Kita juga dapat menggunakan:

```python
car_sales_missing.isnull().sum()
```

Dalam Pandas, `isna()` dan `isnull()` dapat digunakan untuk tujuan yang sama dalam konteks ini.

## Memeriksa Persentase Missing Values

Selain jumlah, kita dapat menghitung persentasenya.

Contoh:

```python
missing_percentage = (
    car_sales_missing.isna().mean() * 100
)

print(missing_percentage)
```

Misalnya hasil:

```text
Make              5.0
Colour            5.0
Odometer (KM)     5.0
Doors             5.0
Price             5.0
```

Artinya sekitar 5% nilai pada masing-masing kolom tersebut missing.

Persentase ini dapat membantu menentukan strategi preprocessing.

## Imputation pada Data Kategorikal

Misalnya kolom:

```text
Make
Colour
```

merupakan categorical features.

Kita dapat mengganti missing value dengan kategori khusus:

```text
Missing
```

Contoh:

```python
car_sales_missing["Make"] = (
    car_sales_missing["Make"]
    .fillna("Missing")
)

car_sales_missing["Colour"] = (
    car_sales_missing["Colour"]
    .fillna("Missing")
)
```

Sekarang:

```text
NaN
```

berubah menjadi:

```text
Missing
```

## Mengapa Menggunakan `Missing`?

Jika kita mengganti:

```text
NaN → Toyota
```

kita seolah-olah menyatakan bahwa nilai yang hilang adalah Toyota.

Padahal kita tidak mengetahui nilai sebenarnya.

Dengan:

```text
NaN → Missing
```

kita mempertahankan informasi bahwa data tersebut memang tidak tersedia.

Contoh:

| Make |
|---|
| Toyota |
| Honda |
| Missing |
| BMW |

Model kemudian dapat mempelajari bahwa:

```text
Missing
```

merupakan kategori tersendiri.

## Imputation pada Data Numerik

Untuk feature numerik, salah satu strategi yang umum adalah menggunakan:

```text
Mean
Median
```

Misalnya:

```text
Odometer (KM)

100000
120000
NaN
140000
160000
```

Kita dapat menggunakan mean:

```python
odometer_mean = car_sales_missing["Odometer (KM)"].mean()

car_sales_missing["Odometer (KM)"] = (
    car_sales_missing["Odometer (KM)"]
    .fillna(odometer_mean)
)
```

## Mean

**Mean** atau rata-rata dihitung dengan:

```text
Mean = jumlah seluruh nilai / jumlah data
```

Misalnya:

```text
100
200
300
```

maka:

```text
Mean = (100 + 200 + 300) / 3
     = 200
```

Jika terdapat missing value:

```text
100
200
NaN
300
```

mean dihitung dari nilai yang tersedia.

## Median

Median adalah nilai tengah setelah data diurutkan.

Contoh:

```text
100
200
300
```

median:

```text
200
```

Untuk jumlah data genap:

```text
100
200
300
400
```

median:

```text
(200 + 300) / 2
= 250
```

Median sering digunakan ketika data memiliki outlier atau distribusi yang miring karena median lebih tahan terhadap nilai ekstrem dibandingkan mean.

## Mean vs Median

Pemilihan mean atau median bergantung pada karakteristik data.

| Metode | Karakteristik |
|---|---|
| Mean | Cocok ketika rata-rata representatif dan tidak terlalu dipengaruhi outlier |
| Median | Sering lebih robust terhadap outlier |

Contoh data:

```text
10
11
12
13
1000
```

Mean akan sangat dipengaruhi oleh:

```text
1000
```

Sedangkan median tetap berada di sekitar nilai tengah data.

## Imputation pada `Doors`

Misalnya:

```text
Doors
-----
4
4
NaN
4
5
```

Jika berdasarkan konteks dataset jumlah pintu yang paling umum adalah:

```text
4
```

kita dapat mengisinya dengan:

```python
car_sales_missing["Doors"] = (
    car_sales_missing["Doors"]
    .fillna(4)
)
```

Namun, nilai `4` bukan aturan universal.

Dalam dataset lain, nilai yang paling sesuai dapat berbeda.

## Menggunakan Modus

Untuk data kategorikal atau discrete data, kita juga dapat menggunakan nilai yang paling sering muncul.

Pandas menyediakan:

```python
car_sales_missing["Doors"].mode()
```

Hasilnya dapat berupa Series.

Untuk mengambil nilai pertama:

```python
car_sales_missing["Doors"].mode()[0]
```

Kemudian:

```python
doors_mode = car_sales_missing["Doors"].mode()[0]

car_sales_missing["Doors"] = (
    car_sales_missing["Doors"]
    .fillna(doors_mode)
)
```

Pendekatan ini lebih fleksibel dibandingkan menetapkan angka tertentu secara manual.

## Imputation Harus Memperhatikan Data Leakage

Ada satu konsep penting yang harus diperhatikan.

Jangan menghitung nilai imputasi dari seluruh dataset sebelum train-test split dalam workflow Machine Learning.

Misalnya:

```python
mean_value = X["Odometer (KM)"].mean()
```

Jika `X` masih berisi training dan test data, maka informasi dari test set ikut digunakan untuk menentukan mean.

Hal tersebut dapat menyebabkan **data leakage**.

## Workflow yang Lebih Aman

Gunakan workflow:

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
Fit Imputer       │
   │              │
   ▼              │
Transform         │
Training          │
                  │
                  ▼
             Transform
                Test
```

Artinya:

```text
Training → fit + transform
Test     → transform
```

Bukan:

```text
Training + Test → fit
```

## Menghapus Baris dengan `dropna()`

Jika kita ingin menghapus baris yang memiliki missing value:

```python
car_sales_missing = car_sales_missing.dropna()
```

Setelah itu kita dapat memeriksa kembali:

```python
car_sales_missing.isna().sum()
```

Jika semua missing values sudah dihapus, hasilnya dapat menjadi:

```text
Make              0
Colour            0
Odometer (KM)     0
Doors             0
Price             0
```

## Menghapus Hanya Baris dengan Target Missing

Target memiliki perlakuan yang sedikit berbeda.

Misalnya:

```text
Price
```

merupakan target yang ingin diprediksi.

Jika:

```text
Price = NaN
```

kita tidak memiliki label untuk baris tersebut.

Contohnya:

| Make | Colour | Doors | Odometer | Price |
|---|---|---:|---:|---:|
| Toyota | Blue | 4 | 100000 | 5000 |
| Honda | Red | 4 | 120000 | NaN |

Untuk supervised learning, baris kedua tidak memiliki target yang diketahui.

Jika tujuan kita adalah melatih model supervised learning menggunakan data berlabel, baris tersebut biasanya dikeluarkan dari dataset training.

Contoh:

```python
car_sales_missing = car_sales_missing.dropna(
    subset=["Price"]
)
```

Dengan:

```python
subset=["Price"]
```

kita hanya meminta Pandas memeriksa missing value pada kolom `Price`.

## Mengapa Target Missing Biasanya Dihapus?

Misalnya kita ingin melatih model:

```text
Features → Price
```

Model membutuhkan pasangan:

```text
X → y
```

Contoh:

```text
Mobil A → 5000
Mobil B → 6000
Mobil C → NaN
```

Untuk Mobil C, kita memiliki feature tetapi tidak memiliki target.

Model supervised learning tidak dapat menggunakan baris tersebut sebagai contoh training biasa karena labelnya tidak tersedia.

Karena itu, baris dengan target missing sering dikeluarkan dari dataset training.

## Memisahkan Features dan Target

Setelah target missing ditangani:

```python
X = car_sales_missing.drop(
    "Price",
    axis=1
)

y = car_sales_missing["Price"]
```

Sekarang:

```text
X → features
y → target
```

## Melakukan Encoding

Dataset masih dapat memiliki categorical features seperti:

```text
Make
Colour
Doors
```

Kita dapat menggunakan:

```python
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
```

Tentukan categorical features:

```python
categorical_features = [
    "Make",
    "Colour",
    "Doors"
]
```

Kemudian:

```python
one_hot = OneHotEncoder(
    handle_unknown="ignore"
)
```

Buat transformer:

```python
transformer = ColumnTransformer(
    transformers=[
        (
            "one_hot",
            one_hot,
            categorical_features
        )
    ],
    remainder="passthrough"
)
```

## Transformasi Data

Setelah transformer dibuat:

```python
transformed_X = transformer.fit_transform(X)
```

Data kategorikal akan diubah menjadi representasi numerik.

Namun, untuk workflow Machine Learning yang benar, kita perlu memperhatikan **kapan** `fit_transform()` dilakukan.

Jika data belum dibagi menjadi training dan test set, melakukan `fit_transform()` pada seluruh dataset dapat menyebabkan data leakage.

## Workflow yang Lebih Aman dengan Pipeline

Pendekatan yang lebih baik adalah menggabungkan imputation dan encoding dalam Pipeline.

Misalnya kita memiliki:

```text
Categorical Features
       │
       ▼
SimpleImputer
       │
       ▼
OneHotEncoder
       │
       ▼
Model
```

Sedangkan numeric features dapat memiliki pipeline sendiri:

```text
Numerical Features
       │
       ▼
SimpleImputer
       │
       ▼
Model
```

Kemudian keduanya dapat digabungkan menggunakan:

```text
ColumnTransformer
```

## SimpleImputer

Scikit-Learn menyediakan:

```python
SimpleImputer
```

yang dapat digunakan untuk melakukan imputasi secara otomatis.

Import:

```python
from sklearn.impute import SimpleImputer
```

Contoh untuk numerical data:

```python
imputer = SimpleImputer(
    strategy="mean"
)
```

Strategi lain:

```python
SimpleImputer(strategy="median")
```

atau:

```python
SimpleImputer(strategy="most_frequent")
```

atau:

```python
SimpleImputer(
    strategy="constant",
    fill_value="Missing"
)
```

## Strategi `SimpleImputer`

Beberapa strategi umum:

| Strategy | Fungsi |
|---|---|
| `mean` | Menggunakan rata-rata |
| `median` | Menggunakan median |
| `most_frequent` | Menggunakan nilai yang paling sering muncul |
| `constant` | Menggunakan nilai yang ditentukan |

`mean` dan `median` terutama digunakan untuk data numerik.

`most_frequent` dan `constant` dapat digunakan pada berbagai jenis data sesuai kebutuhan.

## Contoh SimpleImputer untuk Data Numerik

Misalnya:

```python
from sklearn.impute import SimpleImputer

imputer = SimpleImputer(
    strategy="median"
)
```

Kemudian imputer dipelajari dari training data:

```python
imputer.fit(X_train)
```

Dan digunakan untuk transform:

```python
X_train_imputed = imputer.transform(X_train)
X_test_imputed = imputer.transform(X_test)
```

Perhatikan bahwa:

```text
fit → hanya training
transform → training dan test
```

## Mengapa Bukan `fit_transform()` pada Test?

Jangan melakukan:

```python
X_test_imputed = imputer.fit_transform(X_test)
```

Karena berarti imputer mempelajari parameter baru dari test set.

Workflow yang benar:

```python
X_train_imputed = imputer.fit_transform(X_train)

X_test_imputed = imputer.transform(X_test)
```

Dengan demikian test set tetap berfungsi sebagai data yang tidak digunakan untuk mempelajari parameter preprocessing.

## Menggabungkan Imputation dan Encoding

Untuk categorical features, kita dapat membuat Pipeline:

```python
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder

categorical_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="constant",
                fill_value="Missing"
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

Workflow tersebut berarti:

```text
Categorical Data
      │
      ▼
SimpleImputer
      │
      ▼
Missing → "Missing"
      │
      ▼
OneHotEncoder
      │
      ▼
Numerical Features
```

## Pipeline untuk Numerical Features

Untuk numerical features kita dapat menggunakan:

```python
numeric_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="median"
            )
        )
    ]
)
```

Workflow:

```text
Numerical Data
      │
      ▼
SimpleImputer
      │
      ▼
Missing → Median
```

## Menggabungkan dengan ColumnTransformer

Misalnya:

```python
from sklearn.compose import ColumnTransformer

categorical_features = [
    "Make",
    "Colour",
    "Doors"
]

numeric_features = [
    "Odometer (KM)"
]
```

Kemudian:

```python
preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            categorical_pipeline,
            categorical_features
        ),
        (
            "numeric",
            numeric_pipeline,
            numeric_features
        )
    ]
)
```

Sekarang kita memiliki preprocessing terstruktur:

```text
                 Dataset
                    │
          ┌─────────┴─────────┐
          │                   │
   Categorical             Numerical
          │                   │
          ▼                   ▼
   SimpleImputer        SimpleImputer
          │                   │
          ▼                   │
   OneHotEncoder              │
          │                   │
          └─────────┬─────────┘
                    │
                    ▼
              Preprocessed Data
```

## Menggabungkan Preprocessing dengan Model

Kita dapat memasukkan preprocessor ke dalam Pipeline bersama model.

Contoh:

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline

model = RandomForestRegressor(
    random_state=42
)

pipeline = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor
        ),
        (
            "model",
            model
        )
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

Untuk prediksi:

```python
y_preds = pipeline.predict(X_test)
```

Pipeline akan menjalankan preprocessing dan model secara berurutan.

## Mengapa Pipeline Lebih Aman?

Pipeline membantu menjaga urutan:

```text
Training Data
     │
     ▼
Fit Preprocessor
     │
     ▼
Transform Training
     │
     ▼
Fit Model
```

Ketika melakukan prediksi:

```text
Test Data
     │
     ▼
Transform menggunakan preprocessor yang sudah di-fit
     │
     ▼
Model
     │
     ▼
Prediction
```

Hal ini membantu menghindari kesalahan preprocessing dan data leakage.

## Contoh Workflow Lengkap

Berikut contoh lengkap penanganan missing values menggunakan Pipeline:

```python
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestRegressor

# Membaca dataset
car_sales = pd.read_csv(
    "data/car-sales-extended-missing-data.csv"
)

# Menghapus baris yang tidak memiliki target
car_sales = car_sales.dropna(
    subset=["Price"]
)

# Features dan target
X = car_sales.drop(
    "Price",
    axis=1
)

y = car_sales["Price"]

# Menentukan kolom
categorical_features = [
    "Make",
    "Colour",
    "Doors"
]

numeric_features = [
    "Odometer (KM)"
]

# Pipeline categorical
categorical_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="constant",
                fill_value="Missing"
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

# Pipeline numerical
numeric_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="median"
            )
        )
    ]
)

# Menggabungkan preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            categorical_pipeline,
            categorical_features
        ),
        (
            "numeric",
            numeric_pipeline,
            numeric_features
        )
    ]
)

# Model
model = RandomForestRegressor(
    random_state=42
)

# Pipeline utama
pipeline = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor
        ),
        (
            "model",
            model
        )
    ]
)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Training
pipeline.fit(
    X_train,
    y_train
)

# Evaluasi
score = pipeline.score(
    X_test,
    y_test
)

print("Model score:", score)
```

## Perbedaan Pendekatan Manual dan Pipeline

Ada dua pendekatan yang dapat kita gunakan.

### Pendekatan Manual

```text
Pandas
  │
  ├── fillna()
  ├── dropna()
  └── Encoding
       │
       ▼
   Model
```

Pendekatan ini mudah dipahami ketika pertama kali belajar.

### Pendekatan Scikit-Learn Pipeline

```text
Raw Data
   │
   ▼
ColumnTransformer
   │
   ├── Numerical Pipeline
   │      └── SimpleImputer
   │
   └── Categorical Pipeline
          ├── SimpleImputer
          └── OneHotEncoder
   │
   ▼
Model
```

Pendekatan Pipeline lebih cocok untuk workflow Machine Learning yang lebih terstruktur.

## Kapan Menggunakan Pandas?

Pandas sangat berguna ketika kita sedang:

- melakukan eksplorasi data;
- memahami dataset;
- membersihkan data secara manual;
- melakukan analisis awal;
- memvisualisasikan data.

Contohnya:

```python
car_sales_missing.isna().sum()
```

atau:

```python
car_sales_missing.describe()
```

## Kapan Menggunakan Scikit-Learn?

Scikit-Learn lebih cocok ketika preprocessing menjadi bagian dari workflow Machine Learning.

Contohnya:

```text
Train-Test Split
       ↓
Preprocessing
       ↓
Model
       ↓
Cross Validation
       ↓
Hyperparameter Tuning
```

Dalam workflow seperti ini, `Pipeline` sangat membantu.

## Kesalahan Umum dalam Missing Values

### Kesalahan 1 - Menghapus Semua Baris Secara Sembarangan

Contoh:

```python
car_sales.dropna()
```

Tidak selalu merupakan solusi terbaik.

Jika jumlah missing values besar, kita dapat kehilangan banyak data.

### Kesalahan 2 - Mengisi Semua Kolom dengan Nilai yang Sama

Contoh:

```python
car_sales.fillna(0)
```

Ini dapat bermasalah karena:

```text
0
```

belum tentu memiliki arti yang sama untuk setiap feature.

### Kesalahan 3 - Menggunakan Mean untuk Semua Kolom

Mean tidak cocok untuk semua jenis data.

Contohnya:

```text
Make = "Toyota"
```

tidak dapat diisi menggunakan mean.

### Kesalahan 4 - Mengisi Target Missing Secara Sembarangan

Jika target:

```text
Price = NaN
```

mengisinya secara sembarangan dapat menghasilkan label yang tidak benar.

Untuk supervised learning, baris tanpa target sering kali lebih tepat dikeluarkan dari data training.

### Kesalahan 5 - Data Leakage

Kesalahan yang sangat penting:

```text
Seluruh Dataset
      ↓
Fit Imputer
      ↓
Train-Test Split
```

Sebaiknya:

```text
Dataset
   ↓
Train-Test Split
   ↓
Training → Fit Imputer
   ↓
Test → Transform
```

## Checklist Missing Values

Sebelum melanjutkan ke modeling, periksa:

- [ ] Sudah memeriksa jumlah missing values.
- [ ] Sudah menghitung persentase missing values jika diperlukan.
- [ ] Sudah membedakan categorical dan numerical features.
- [ ] Sudah menentukan strategi imputation atau removal.
- [ ] Target dengan missing value sudah ditangani.
- [ ] Tidak mengisi semua kolom dengan nilai yang sama tanpa alasan.
- [ ] Imputation dilakukan tanpa menggunakan informasi test set.
- [ ] `SimpleImputer` dipertimbangkan untuk workflow Machine Learning.
- [ ] Pipeline digunakan untuk preprocessing yang lebih kompleks.

## Ringkasan

Missing values merupakan masalah umum dalam dataset dunia nyata.

Dua strategi utama adalah:

```text
Missing Values
      │
      ├── Imputation
      │      └── Mengisi nilai yang hilang
      │
      └── Removal
             └── Menghapus data
```

Untuk categorical features, kita dapat menggunakan:

```python
SimpleImputer(
    strategy="constant",
    fill_value="Missing"
)
```

Untuk numerical features, kita dapat menggunakan:

```python
SimpleImputer(
    strategy="median"
)
```

atau:

```python
SimpleImputer(
    strategy="mean"
)
```

Untuk supervised learning, missing pada target sering ditangani dengan menghapus baris tersebut:

```python
data.dropna(
    subset=["target"]
)
```

Dalam workflow Machine Learning modern, pendekatan yang lebih terstruktur adalah:

```text
SimpleImputer
      +
OneHotEncoder
      +
ColumnTransformer
      +
Pipeline
      +
Machine Learning Model
```

Yang paling penting adalah memastikan parameter preprocessing dipelajari dari **training data**, bukan dari seluruh dataset, sehingga kita dapat mengurangi risiko **data leakage**.

## Cheat Sheet

| Kebutuhan | Kode |
|---|---|
| Cek missing values | `df.isna().sum()` |
| Cek missing values | `df.isnull().sum()` |
| Hapus baris missing | `df.dropna()` |
| Hapus jika target missing | `df.dropna(subset=["Price"])` |
| Isi dengan nilai tertentu | `df["Column"].fillna(value)` |
| Mean | `df["Column"].mean()` |
| Median | `df["Column"].median()` |
| Mode | `df["Column"].mode()[0]` |
| SimpleImputer | `SimpleImputer(strategy="median")` |
| Categorical constant | `SimpleImputer(strategy="constant", fill_value="Missing")` |
| Pipeline | `Pipeline(steps=[...])` |
| ColumnTransformer | `ColumnTransformer(transformers=[...])` |
