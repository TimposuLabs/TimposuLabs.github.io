---
sidebar_position: 36
title: "Menggabungkan Seluruh Tahapan ML dengan Scikit-Learn Pipeline"
---

Dalam proses membangun model Machine Learning, data yang digunakan biasanya tidak langsung dapat diberikan kepada model.

Data mentah dapat memiliki berbagai masalah, seperti:

- Missing values.
- Data kategorikal berupa teks.
- Data numerik dengan format yang berbeda.
- Kolom yang membutuhkan preprocessing berbeda.
- Perbedaan preprocessing antara data training dan data testing.

Pada materi sebelumnya, kita telah mempelajari berbagai teknik preprocessing secara terpisah, seperti:

- Menangani missing values.
- Melakukan encoding pada data kategorikal.
- Melakukan scaling pada data numerik.
- Memisahkan data training dan testing.
- Melatih model Machine Learning.
- Melakukan prediksi dan evaluasi.

Pada praktiknya, kita dapat menggabungkan berbagai proses tersebut menjadi satu alur menggunakan **Scikit-Learn Pipeline**.

Pipeline membantu membuat proses Machine Learning menjadi lebih terstruktur, konsisten, dan lebih aman dari kesalahan preprocessing.

---

## Apa Itu Scikit-Learn Pipeline?

`Pipeline` adalah fitur Scikit-Learn yang memungkinkan kita menggabungkan beberapa tahap pemrosesan data dan model Machine Learning menjadi satu rangkaian proses.

Secara sederhana:

```text
Data Mentah
    ↓
Preprocessing
    ↓
Transformasi Data
    ↓
Model Machine Learning
    ↓
Prediksi
```

Tanpa Pipeline, kita mungkin harus menjalankan setiap proses secara manual:

```text
Data
 ↓
Imputer
 ↓
Encoder
 ↓
Scaler
 ↓
Model
```

Dengan Pipeline, seluruh proses tersebut dapat dikelompokkan menjadi satu objek:

```text
Data
 ↓
Pipeline
 ├── Preprocessing
 └── Model
       ↓
    Prediksi
```

Dengan demikian, Pipeline dapat dianggap sebagai **alur kerja Machine Learning yang terdiri dari beberapa tahapan yang dijalankan secara berurutan**.

---

## Mengapa Menggunakan Pipeline?

Pipeline memberikan beberapa keuntungan.

### 1. Menggabungkan Banyak Tahapan

Beberapa proses preprocessing dan model dapat dikelompokkan dalam satu objek.

Contohnya:

```text
Missing Value
      ↓
   Encoding
      ↓
   Scaling
      ↓
    Model
```

Semuanya dapat dimasukkan ke dalam satu Pipeline.

### 2. Mengurangi Kode Berulang

Tanpa Pipeline, preprocessing training dan testing harus dikelola secara manual.

Dengan Pipeline, kita cukup menjalankan:

```python
model.fit(X_train, y_train)
```

dan Pipeline akan menjalankan seluruh tahapan yang telah ditentukan.

### 3. Mencegah Kesalahan Preprocessing

Pipeline membantu memastikan transformasi data dilakukan dengan cara yang konsisten.

Misalnya, jika data kategorikal membutuhkan One-Hot Encoding, proses tersebut dapat dimasukkan ke dalam Pipeline.

Ketika melakukan prediksi pada data baru, preprocessing yang sama akan diterapkan secara otomatis.

### 4. Membuat Workflow Lebih Mudah Dipahami

Pipeline membuat alur Machine Learning lebih jelas:

```text
Data
 ↓
Preprocessing
 ↓
Model
 ↓
Prediction
```

### 5. Memudahkan Deployment

Pipeline dapat menjadi satu objek yang berisi preprocessing dan model.

Ketika model digunakan dalam aplikasi atau API, data baru dapat langsung diberikan kepada Pipeline.

```text
Data Baru
   ↓
Pipeline
   ↓
Preprocessing
   ↓
 Model
   ↓
Prediksi
```

---

## Konsep Dasar Pipeline

Pipeline terdiri dari beberapa langkah atau `steps`.

Contoh sederhana:

```python
from sklearn.pipeline import Pipeline

model = Pipeline(
    steps=[
        ("preprocessing", preprocessing),
        ("model", model)
    ]
)
```

Setiap step memiliki dua bagian:

```text
("nama_step", objek_transformer_atau_model)
```

Contohnya:

```python
("preprocessor", preprocessor)
("regressor", RandomForestRegressor())
```

Nama step digunakan untuk mengidentifikasi setiap bagian dari Pipeline.

---

## Pipeline Sederhana

Sebelum menggunakan dataset dengan berbagai tipe data, kita dapat melihat contoh Pipeline sederhana.

```python
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestRegressor

model = Pipeline(
    steps=[
        ("imputer", SimpleImputer(strategy="mean")),
        ("regressor", RandomForestRegressor(random_state=42))
    ]
)
```

Pipeline tersebut terdiri dari dua tahap:

```text
Data
 ↓
SimpleImputer
 ↓
RandomForestRegressor
```

Tahap pertama:

```python
SimpleImputer(strategy="mean")
```

digunakan untuk menangani missing values.

Tahap kedua:

```python
RandomForestRegressor(random_state=42)
```

digunakan sebagai model regresi.

Ketika kita menjalankan:

```python
model.fit(X_train, y_train)
```

Pipeline akan menjalankan kedua proses tersebut secara berurutan.

---

## Studi Kasus

Sekarang kita akan membuat contoh yang lebih realistis.

Misalkan kita memiliki dataset harga mobil.

Dataset memiliki beberapa kolom:

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| `Make` | Kategorikal | Merek mobil |
| `Colour` | Kategorikal | Warna mobil |
| `Doors` | Numerik | Jumlah pintu |
| `Odometer (KM)` | Numerik | Jarak tempuh |
| `Price` | Numerik | Harga mobil |

Contoh data:

| Make | Colour | Doors | Odometer (KM) | Price |
|---|---|---:|---:|---:|
| Honda | White | 4 | 120000 | 12500 |
| Toyota | Blue | 4 | 85000 | 15000 |
| BMW | Black | 4 | 60000 | 28000 |
| Honda | Red | 2 | 95000 | 11000 |
| Toyota | White | 4 | 105000 | 13500 |

Kita ingin menggunakan:

- `Make`
- `Colour`
- `Doors`
- `Odometer (KM)`

untuk memprediksi:

- `Price`

---

## Import Library

Kita mulai dengan mengimpor library yang diperlukan.

```python
import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder

from sklearn.ensemble import RandomForestRegressor

from sklearn.metrics import mean_absolute_error
```

---

## Membaca Dataset

Misalnya dataset disimpan dalam file CSV.

```python
data = pd.read_csv("car-sales-extended-missing-data.csv")
```

Kemudian kita dapat melihat beberapa baris pertama.

```python
data.head()
```

Untuk mengetahui informasi dataset:

```python
data.info()
```

Kita juga dapat melihat jumlah missing values:

```python
data.isna().sum()
```

Contohnya:

```text
Make             50
Colour           50
Doors            50
Odometer (KM)    50
Price             0
```

Kondisi seperti ini menunjukkan bahwa dataset membutuhkan preprocessing sebelum digunakan oleh model.

---

## Memisahkan Feature dan Target

Kolom `Price` akan menjadi target.

Sedangkan kolom lainnya menjadi feature.

```python
X = data.drop("Price", axis=1)
y = data["Price"]
```

Secara konsep:

```text
X
↓
Make
Colour
Doors
Odometer (KM)

y
↓
Price
```

---

## Membagi Data Training dan Testing

Selanjutnya kita membagi data menjadi data training dan testing.

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

Pada contoh ini:

- 80% data digunakan untuk training.
- 20% data digunakan untuk testing.

Parameter:

```python
random_state=42
```

digunakan agar pembagian data dapat direproduksi.

---

## Menentukan Kelompok Feature

Dataset kita memiliki beberapa jenis feature.

### Feature Kategorikal

Kolom:

```python
categorical_features = ["Make", "Colour"]
```

Kedua kolom tersebut berisi data berupa kategori atau teks.

Contohnya:

```text
Make
Honda
Toyota
BMW
```

dan:

```text
Colour
White
Black
Red
```

Model Machine Learning seperti Random Forest tidak dapat langsung menggunakan string tersebut sebagai input numerik.

Karena itu kita membutuhkan encoding.

---

## Feature Doors

Kolom `Doors` juga memiliki karakteristik khusus.

```python
door_feature = ["Doors"]
```

Kolom ini berupa angka yang menunjukkan jumlah pintu.

Misalnya:

```text
2
3
4
5
```

Kita tetap dapat membuat Pipeline khusus untuk menangani missing values pada kolom ini.

---

## Feature Numerik

Kolom:

```python
numeric_features = ["Odometer (KM)"]
```

merupakan feature numerik.

Contohnya:

```text
50000
75000
120000
150000
```

Kolom ini juga dapat memiliki missing values sehingga perlu ditangani.

---

## Membuat Pipeline untuk Feature Kategorikal

Kita akan membuat Pipeline khusus untuk feature kategorikal.

```python
categorical_transformer = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="constant",
                fill_value="missing"
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

Pipeline tersebut memiliki dua tahapan.

```text
Data Kategorikal
      ↓
SimpleImputer
      ↓
OneHotEncoder
```

### SimpleImputer

```python
SimpleImputer(
    strategy="constant",
    fill_value="missing"
)
```

digunakan untuk mengganti missing values dengan nilai:

```text
missing
```

Misalnya:

```text
Honda
Toyota
NaN
BMW
```

akan menjadi:

```text
Honda
Toyota
missing
BMW
```

### OneHotEncoder

Setelah missing values ditangani, data kategorikal diubah menjadi representasi numerik menggunakan:

```python
OneHotEncoder(
    handle_unknown="ignore"
)
```

Misalnya:

```text
Colour
------
Red
Blue
Black
```

dapat diubah menjadi representasi numerik seperti:

```text
Colour_Black
Colour_Blue
Colour_Red
```

Parameter:

```python
handle_unknown="ignore"
```

berguna ketika data baru memiliki kategori yang tidak ditemukan ketika model dilatih.

---

## Membuat Pipeline untuk Feature Doors

Selanjutnya kita membuat Pipeline untuk kolom `Doors`.

```python
door_transformer = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="constant",
                fill_value=4
            )
        )
    ]
)
```

Jika terdapat missing value pada `Doors`, kita menggantinya dengan:

```text
4
```

Contoh:

```text
2
4
NaN
4
```

menjadi:

```text
2
4
4
4
```

---

## Membuat Pipeline untuk Feature Numerik

Selanjutnya kita membuat Pipeline untuk feature numerik.

```python
numeric_transformer = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="mean"
            )
        )
    ]
)
```

Jika terdapat missing values pada `Odometer (KM)`, nilai tersebut akan diganti dengan nilai rata-rata.

Misalnya:

```text
50000
75000
NaN
100000
```

maka missing value akan diganti dengan rata-rata nilai yang tersedia.

---

## Menggabungkan Preprocessing dengan ColumnTransformer

Sekarang kita memiliki tiga Pipeline:

```text
categorical_transformer
door_transformer
numeric_transformer
```

Kita perlu menggabungkannya.

Untuk itu kita menggunakan:

```python
ColumnTransformer
```

Contoh:

```python
preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            categorical_transformer,
            categorical_features
        ),
        (
            "door",
            door_transformer,
            door_feature
        ),
        (
            "num",
            numeric_transformer,
            numeric_features
        )
    ]
)
```

`ColumnTransformer` memungkinkan kita memberikan preprocessing yang berbeda kepada kolom yang berbeda.

Secara visual:

```text
                    Dataset
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
     Make, Colour    Doors     Odometer (KM)
          │            │            │
          ▼            ▼            ▼
     Categorical     Door        Numeric
      Pipeline     Pipeline      Pipeline
          │            │            │
          └────────────┼────────────┘
                       ▼
                 Preprocessor
```

---

## Mengapa Menggunakan ColumnTransformer?

Bayangkan kita melakukan preprocessing secara manual.

Kita harus melakukan:

```text
Kolom Make
    ↓
 Imputer
    ↓
 Encoder

Kolom Colour
    ↓
 Imputer
    ↓
 Encoder

Kolom Doors
    ↓
 Imputer

Kolom Odometer
    ↓
 Imputer
```

Cara tersebut dapat menjadi sulit dikelola ketika jumlah kolom semakin banyak.

Dengan `ColumnTransformer`, kita dapat mendefinisikan seluruh aturan preprocessing secara terstruktur.

---

## Membuat Model Machine Learning

Sekarang kita membuat model Random Forest.

```python
model = RandomForestRegressor(
    random_state=42
)
```

Model ini akan digunakan untuk memprediksi harga mobil.

---

## Menggabungkan Preprocessing dan Model

Sekarang bagian penting dari materi ini.

Kita dapat menggabungkan `preprocessor` dan model menggunakan `Pipeline`.

```python
model = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor
        ),
        (
            "regressor",
            RandomForestRegressor(
                random_state=42
            )
        )
    ]
)
```

Sekarang kita memiliki satu objek yang berisi:

```text
Data
 ↓
Preprocessor
 ├── Categorical Pipeline
 ├── Door Pipeline
 └── Numeric Pipeline
 ↓
RandomForestRegressor
```

Dengan demikian, kita tidak perlu menjalankan preprocessing secara manual sebelum melatih model.

---

## Melatih Pipeline

Untuk melatih seluruh Pipeline, kita cukup menggunakan:

```python
model.fit(
    X_train,
    y_train
)
```

Di belakang layar, Pipeline akan menjalankan proses:

```text
X_train
   ↓
Preprocessing
   ↓
Transformasi Feature
   ↓
Random Forest
   ↓
Model Terlatih
```

Kita tidak perlu menjalankan:

```python
preprocessor.fit_transform(X_train)
```

secara manual.

Pipeline akan menangani proses tersebut.

---

## Membuat Prediksi

Setelah model dilatih, kita dapat menggunakan:

```python
predictions = model.predict(X_test)
```

Pipeline akan menjalankan preprocessing terhadap `X_test` terlebih dahulu.

Kemudian data hasil preprocessing akan diberikan kepada model Random Forest.

Prosesnya:

```text
X_test
   ↓
Preprocessor
   ↓
Feature hasil transformasi
   ↓
Random Forest
   ↓
Predictions
```

---

## Melihat Hasil Prediksi

Kita dapat melihat beberapa hasil prediksi:

```python
predictions[:10]
```

Kemudian membandingkannya dengan nilai sebenarnya:

```python
y_test[:10]
```

Kita dapat membuat DataFrame untuk melihat perbandingannya.

```python
results = pd.DataFrame({
    "Actual": y_test,
    "Predicted": predictions
})

results.head()
```

Contohnya:

| Actual | Predicted |
|---:|---:|
| 12500 | 13120 |
| 15000 | 14680 |
| 28000 | 27150 |
| 11000 | 11520 |

Hasil prediksi tentu tidak harus sama persis dengan nilai aktual.

Model Machine Learning mencoba menemukan pola dari data training untuk menghasilkan prediksi terhadap data yang belum dilihat sebelumnya.

---

## Evaluasi Model

Untuk evaluasi sederhana, kita dapat menggunakan Mean Absolute Error atau MAE.

```python
mae = mean_absolute_error(
    y_test,
    predictions
)

mae
```

MAE menunjukkan rata-rata besar kesalahan absolut prediksi dalam satuan target.

Misalnya:

```text
MAE = 1250
```

Jika target adalah harga mobil dalam satuan tertentu, maka secara sederhana model memiliki rata-rata kesalahan absolut sekitar 1250 satuan harga.

MAE tidak berarti setiap prediksi pasti meleset tepat sebesar nilai tersebut.

---

## Menggunakan Method score()

Kita juga dapat menggunakan:

```python
model.score(
    X_test,
    y_test
)
```

Karena model yang digunakan adalah:

```python
RandomForestRegressor
```

maka `score()` menggunakan **R² (coefficient of determination)**.

Contohnya:

```python
r2_score = model.score(
    X_test,
    y_test
)

r2_score
```

Semakin mendekati 1, semakin baik kemampuan model menjelaskan variasi target pada data evaluasi.

Perlu diperhatikan bahwa nilai R² pada data yang belum pernah dilihat model juga dapat bernilai negatif.

---

## Pipeline Menangani Data Baru

Salah satu keuntungan besar Pipeline adalah kita tidak perlu melakukan preprocessing secara manual ketika mendapatkan data baru.

Misalnya terdapat satu mobil baru:

```python
new_car = pd.DataFrame({
    "Make": ["Toyota"],
    "Colour": ["Blue"],
    "Doors": [4],
    "Odometer (KM)": [80000]
})
```

Kita dapat langsung memberikan data tersebut kepada Pipeline:

```python
prediction = model.predict(new_car)
```

Pipeline akan menjalankan:

```text
Data Mobil Baru
      ↓
 Preprocessing
      ↓
   Encoding
      ↓
    Model
      ↓
Prediksi Harga
```

Hal ini sangat berguna ketika model akan digunakan dalam aplikasi atau REST API.

---

## Pipeline untuk Deployment

Pipeline sangat cocok digunakan dalam proses deployment.

Misalnya kita memiliki REST API menggunakan FastAPI.

Tanpa Pipeline, API mungkin harus menjalankan:

```text
Request
 ↓
Validasi
 ↓
Imputer
 ↓
Encoder
 ↓
Transformasi
 ↓
Model
 ↓
Prediction
```

Dengan Pipeline, API dapat lebih sederhana:

```text
Request
 ↓
Pipeline
 ↓
Prediction
```

Contohnya:

```python
prediction = model.predict(data_baru)
```

Seluruh preprocessing yang telah didefinisikan dalam Pipeline akan dijalankan secara otomatis.

---

## Keuntungan Pipeline untuk Deployment

Pipeline membantu menjaga konsistensi antara proses training dan inference.

Misalnya ketika training:

```text
Data Training
 ↓
Imputer
 ↓
Encoder
 ↓
Model
```

Ketika digunakan untuk prediksi:

```text
Data Baru
 ↓
Imputer
 ↓
Encoder
 ↓
Model
```

Aturan preprocessing tetap sama.

Hal ini penting karena model seharusnya menerima data dengan transformasi yang konsisten dengan proses ketika model dilatih.

---

## Pipeline sebagai Satu Kesatuan

Tanpa Pipeline:

```text
Preprocessing
      +
Model
```

merupakan dua komponen yang harus dikelola secara terpisah.

Dengan Pipeline:

```text
┌─────────────────────────────┐
│          Pipeline           │
│                             │
│  Preprocessing              │
│       ↓                     │
│  Feature Transformation     │
│       ↓                     │
│  Machine Learning Model     │
│                             │
└─────────────────────────────┘
```

Pipeline menjadi satu kesatuan workflow.

---

## Struktur Lengkap Program

Berikut contoh lengkap dari proses yang telah kita pelajari.

```python
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error


# Load dataset
data = pd.read_csv(
    "car-sales-extended-missing-data.csv"
)


# Separate features and target
X = data.drop(
    "Price",
    axis=1
)

y = data["Price"]


# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# Define feature groups
categorical_features = [
    "Make",
    "Colour"
]

door_feature = [
    "Doors"
]

numeric_features = [
    "Odometer (KM)"
]


# Create categorical transformer
categorical_transformer = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="constant",
                fill_value="missing"
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


# Create door transformer
door_transformer = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="constant",
                fill_value=4
            )
        )
    ]
)


# Create numeric transformer
numeric_transformer = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="mean"
            )
        )
    ]
)


# Create preprocessor
preprocessor = ColumnTransformer(
    transformers=[
        (
            "cat",
            categorical_transformer,
            categorical_features
        ),
        (
            "door",
            door_transformer,
            door_feature
        ),
        (
            "num",
            numeric_transformer,
            numeric_features
        )
    ]
)


# Create final Pipeline
model = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor
        ),
        (
            "regressor",
            RandomForestRegressor(
                random_state=42
            )
        )
    ]
)


# Train the Pipeline
model.fit(
    X_train,
    y_train
)


# Make predictions
predictions = model.predict(
    X_test
)


# Evaluate using MAE
mae = mean_absolute_error(
    y_test,
    predictions
)

print(f"MAE: {mae}")


# Evaluate using R²
r2 = model.score(
    X_test,
    y_test
)

print(f"R²: {r2}")
```

---

## Memahami Alur Program

Program tersebut dapat diringkas menjadi:

```text
                    Dataset
                       │
                       ▼
              Train-Test Split
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
         X_train              X_test
             │                   │
             ▼                   │
       ┌─────────────┐           │
       │ Preprocessor│           │
       └──────┬──────┘           │
              │                  │
       ┌──────┼───────┐          │
       ▼      ▼       ▼          │
     Categorical Door Numeric     │
       │      │       │          │
       └──────┼───────┘          │
              ▼                  │
       Transformed Data          │
              │                  │
              ▼                  │
       Random Forest             │
              │                  │
              ▼                  │
        Trained Model            │
                                 │
                                 ▼
                           Same Pipeline
                                 │
                                 ▼
                              Prediction
```

---

## Perbedaan Tanpa Pipeline dan Dengan Pipeline

### Tanpa Pipeline

Kita mungkin melakukan proses seperti:

```python
X_train = imputer.fit_transform(X_train)

X_test = imputer.transform(X_test)

X_train = encoder.fit_transform(X_train)

X_test = encoder.transform(X_test)

model.fit(X_train, y_train)

predictions = model.predict(X_test)
```

Semakin kompleks preprocessing, semakin banyak kode yang harus dikelola.

### Dengan Pipeline

Kita cukup menggunakan:

```python
model.fit(
    X_train,
    y_train
)
```

dan:

```python
predictions = model.predict(
    X_test
)
```

Pipeline menangani tahapan yang telah kita definisikan.

---

## Hal Penting: fit dan transform

Dalam Pipeline, kita tetap perlu memahami konsep:

```text
fit
transform
fit_transform
```

### fit

`fit()` digunakan untuk mempelajari parameter dari data.

Contohnya `SimpleImputer` dapat mempelajari nilai rata-rata dari data training.

### transform

`transform()` menggunakan parameter yang telah dipelajari untuk mengubah data.

### fit_transform

`fit_transform()` melakukan:

```text
fit
+
transform
```

secara berurutan.

Pipeline membantu mengatur proses tersebut secara otomatis.

---

## Mengapa Preprocessing Tidak Dilakukan Terpisah?

Misalnya kita memiliki:

```text
X_train
X_test
```

Preprocessing seharusnya dipelajari berdasarkan data training.

Secara konsep:

```text
X_train
   ↓
fit preprocessing
   ↓
transform X_train
```

Kemudian preprocessing yang sama digunakan untuk:

```text
X_test
   ↓
transform
```

Bukan mempelajari preprocessing baru dari `X_test`.

Pipeline membantu menjaga pola kerja tersebut secara konsisten.

---

## Melihat Struktur Pipeline

Kita dapat melihat Pipeline dengan:

```python
model
```

atau:

```python
model.named_steps
```

Contohnya:

```python
model.named_steps
```

akan memberikan akses terhadap step yang ada dalam Pipeline.

Kita juga dapat mengakses preprocessing:

```python
model.named_steps["preprocessor"]
```

dan model:

```python
model.named_steps["regressor"]
```

---

## Mengakses Model di Dalam Pipeline

Misalnya kita ingin mendapatkan Random Forest yang berada di dalam Pipeline.

```python
regressor = model.named_steps["regressor"]
```

Sekarang `regressor` merupakan objek:

```python
RandomForestRegressor
```

Kita juga dapat melihat parameter model:

```python
regressor.get_params()
```

Konsep ini akan menjadi penting ketika kita mulai mempelajari **pengaturan hyperparameter Pipeline** pada materi berikutnya.

---

## Kesalahan yang Sering Terjadi

### 1. Melakukan Encoding Secara Manual

Kesalahan umum adalah melakukan encoding training dan testing secara terpisah.

```text
Training
 ↓
Encoder A

Testing
 ↓
Encoder B
```

Hal tersebut dapat menyebabkan representasi feature tidak konsisten.

Pipeline membantu menjaga preprocessing tetap menjadi satu alur.

### 2. Melakukan Imputation pada Seluruh Dataset Sebelum Split

Sebaiknya jangan langsung mempelajari parameter preprocessing dari seluruh dataset sebelum membagi data.

Contoh yang perlu dihindari:

```text
Seluruh Dataset
      ↓
   Imputer
      ↓
Train-Test Split
```

Lebih baik:

```text
Dataset
   ↓
Train-Test Split
   ↓
Training → fit preprocessing
Testing  → transform
```

Pipeline membantu mengatur pola tersebut.

### 3. Melupakan handle_unknown

Untuk One-Hot Encoding, data baru mungkin memiliki kategori yang belum pernah muncul pada data training.

Karena itu kita menggunakan:

```python
OneHotEncoder(
    handle_unknown="ignore"
)
```

Hal ini sangat berguna ketika model digunakan untuk memproses data baru.

---

## Kapan Menggunakan Pipeline?

Pipeline sangat disarankan ketika workflow Machine Learning memiliki beberapa tahapan.

Contohnya:

```text
Missing Values
      ↓
   Encoding
      ↓
   Scaling
      ↓
Feature Selection
      ↓
    Model
```

Daripada mengelola semuanya secara manual, kita dapat menggabungkannya dalam Pipeline.

Pipeline juga sangat berguna untuk:

- Proyek Machine Learning.
- Eksperimen model.
- Deployment.
- REST API.
- Aplikasi Machine Learning.
- Production Machine Learning.

---

## Ringkasan

Pada materi ini kita telah mempelajari bagaimana menggabungkan berbagai proses Machine Learning menggunakan Scikit-Learn Pipeline.

Konsep utama yang perlu diingat:

1. `Pipeline` digunakan untuk menggabungkan beberapa tahapan Machine Learning.
2. `ColumnTransformer` digunakan ketika kolom membutuhkan preprocessing yang berbeda.
3. `SimpleImputer` digunakan untuk menangani missing values.
4. `OneHotEncoder` digunakan untuk mengubah data kategorikal menjadi representasi numerik.
5. Pipeline dapat menggabungkan preprocessing dengan model Machine Learning.
6. `fit()` digunakan untuk melatih Pipeline.
7. `predict()` digunakan untuk menghasilkan prediksi.
8. Preprocessing dapat diterapkan secara konsisten pada data baru.
9. Pipeline membantu mengurangi kode preprocessing manual.
10. Pipeline sangat berguna untuk deployment Machine Learning.

Secara sederhana:

```text
Data
 ↓
ColumnTransformer
 ↓
Preprocessing
 ↓
Machine Learning Model
 ↓
Prediction
```

Seluruh proses tersebut dapat dikemas menjadi:

```python
Pipeline(...)
```

Dengan demikian, Pipeline menjadi salah satu komponen penting untuk membangun workflow Machine Learning yang lebih terstruktur dan siap digunakan pada aplikasi nyata.

---

## Pada Materi Berikutnya

Pada materi berikutnya kita akan membahas **pengaturan dan optimasi hyperparameter pada model yang berada di dalam Pipeline**.

Pembahasan tersebut akan mencakup bagaimana menentukan parameter model, bagaimana mengatur parameter melalui Pipeline, serta bagaimana melakukan pencarian parameter secara sistematis.