---
sidebar_position: 7
title: "Persiapan Data: Missing Values dengan Scikit-Learn"
---

Pada materi sebelumnya kita telah mempelajari beberapa cara menangani **missing values** menggunakan Pandas.

Pendekatan tersebut cukup mudah untuk eksplorasi data. Namun, ketika workflow Machine Learning menjadi lebih kompleks, kita membutuhkan pendekatan yang lebih terstruktur.

Scikit-Learn menyediakan beberapa tools untuk melakukan preprocessing secara sistematis, salah satunya adalah:

```python
SimpleImputer
```

Dengan `SimpleImputer`, kita dapat menentukan strategi untuk mengisi missing values.

Kemudian dengan:

```python
ColumnTransformer
```

kita dapat menerapkan strategi berbeda pada kolom yang berbeda.

Pada materi ini kita akan menggabungkan:

```text
SimpleImputer
        ↓
ColumnTransformer
        ↓
OneHotEncoder
        ↓
RandomForestRegressor
```

## Mengapa Menggunakan Scikit-Learn?

Pada materi sebelumnya kita dapat melakukan:

```python
df["Column"].fillna(...)
```

Pendekatan tersebut sangat berguna untuk eksplorasi.

Namun, dalam workflow Machine Learning kita sering memiliki banyak tahapan:

```text
Missing Values
      ↓
   Encoding
      ↓
   Scaling
      ↓
    Model
      ↓
  Evaluation
```

Jika semua dilakukan secara manual, semakin besar kemungkinan terjadi kesalahan.

Scikit-Learn menyediakan tools seperti:

```text
SimpleImputer
OneHotEncoder
ColumnTransformer
Pipeline
```

yang dapat digunakan untuk membuat workflow preprocessing yang lebih terstruktur.

## Apa Itu Imputation?

**Imputation** adalah proses mengganti missing values dengan nilai pengganti.

Misalnya:

```text
Odometer
---------
100000
120000
NaN
140000
```

Jika menggunakan mean:

```text
NaN → 120000
```

Nilai `120000` tersebut merupakan hasil perhitungan dari data yang tersedia.

## Apa Itu SimpleImputer?

`SimpleImputer` adalah class Scikit-Learn yang digunakan untuk menangani missing values menggunakan strategi tertentu.

Import:

```python
from sklearn.impute import SimpleImputer
```

Contoh:

```python
imputer = SimpleImputer(
    strategy="mean"
)
```

Artinya:

```text
Missing value
      ↓
Diganti dengan mean
```

## Strategi SimpleImputer

Beberapa strategi yang umum digunakan:

| Strategy | Penjelasan |
|---|---|
| `mean` | Menggunakan rata-rata |
| `median` | Menggunakan median |
| `most_frequent` | Menggunakan nilai yang paling sering muncul |
| `constant` | Menggunakan nilai tertentu |

Contoh:

```python
SimpleImputer(strategy="mean")
```

```python
SimpleImputer(strategy="median")
```

```python
SimpleImputer(strategy="most_frequent")
```

```python
SimpleImputer(
    strategy="constant",
    fill_value="missing"
)
```

## Contoh Dataset

Kita akan menggunakan dataset:

```text
car-sales-extended-missing-data.csv
```

Dataset tersebut memiliki beberapa kolom seperti:

```text
Make
Colour
Doors
Odometer (KM)
Price
```

Contoh data:

| Make | Colour | Doors | Odometer (KM) | Price |
|---|---|---:|---:|---:|
| Toyota | Blue | 4 | 150000 | 4000 |
| Honda | Red | 4 | 120000 | 5000 |
| BMW | NaN | 2 | 80000 | 12000 |
| NaN | Black | NaN | 100000 | 7000 |

Terdapat missing values pada beberapa feature.

## Membaca Dataset

Kita mulai dengan mengimpor Pandas:

```python
import pandas as pd
```

Kemudian membaca dataset:

```python
car_sales_missing = pd.read_csv(
    "car-sales-extended-missing-data.csv"
)
```

Periksa data:

```python
car_sales_missing.head()
```

## Memeriksa Missing Values

Gunakan:

```python
car_sales_missing.isna().sum()
```

Contoh:

```text
Make              50
Colour            50
Doors             50
Odometer (KM)     50
Price             50
dtype: int64
```

Jumlah sebenarnya bergantung pada dataset yang digunakan.

## Menghapus Baris dengan Target Missing

Misalnya:

```text
Price
```

merupakan target yang ingin diprediksi.

Jika `Price` missing, kita tidak memiliki label untuk sampel tersebut.

Kita dapat menghapus baris yang targetnya missing:

```python
car_sales_missing = car_sales_missing.dropna(
    subset=["Price"]
)
```

Atau:

```python
car_sales_missing.dropna(
    subset=["Price"],
    inplace=True
)
```

Untuk workflow modern, assignment seperti:

```python
car_sales_missing = car_sales_missing.dropna(
    subset=["Price"]
)
```

sering lebih eksplisit dan mudah dilacak.

## Mengapa Target Missing Dihapus?

Misalnya:

| Make | Colour | Doors | Odometer | Price |
|---|---|---:|---:|---:|
| Toyota | Blue | 4 | 150000 | 5000 |
| Honda | Red | 4 | 120000 | NaN |

Kita mengetahui:

```text
Make
Colour
Doors
Odometer
```

tetapi tidak mengetahui:

```text
Price
```

Untuk supervised learning, model membutuhkan pasangan:

```text
X → y
```

Jika `y` tidak tersedia, baris tersebut tidak dapat digunakan sebagai contoh training berlabel biasa.

## Memisahkan X dan y

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

Periksa:

```python
X.head()
```

dan:

```python
y.head()
```

## Menentukan Kolom

Sekarang kita perlu menentukan jenis feature.

Misalnya:

```text
Make
Colour
```

adalah categorical features.

Sedangkan:

```text
Doors
Odometer (KM)
```

merupakan numerical features secara tipe data, tetapi `Doors` dapat diperlakukan sebagai kategori jika angka tersebut merepresentasikan kategori jumlah pintu.

Dalam contoh ini kita akan mempertahankan pendekatan:

```text
Make
Colour
→ categorical

Doors
→ categorical

Odometer (KM)
→ numerical
```

## Membuat SimpleImputer untuk Categorical Features

Untuk:

```text
Make
Colour
```

kita dapat menggunakan:

```python
cat_imputer = SimpleImputer(
    strategy="constant",
    fill_value="missing"
)
```

Artinya:

```text
NaN
 ↓
missing
```

Contoh:

```text
Make

Toyota
Honda
NaN
BMW
```

menjadi:

```text
Toyota
Honda
missing
BMW
```

## Membuat SimpleImputer untuk Doors

Misalnya kita ingin menggunakan nilai:

```text
4
```

sebagai pengganti missing value pada `Doors`.

Kita dapat membuat:

```python
door_imputer = SimpleImputer(
    strategy="constant",
    fill_value=4
)
```

Maka:

```text
Doors

4
4
NaN
2
```

menjadi:

```text
4
4
4
2
```

Nilai `4` merupakan keputusan preprocessing berdasarkan konteks dataset. Pada dataset lain, strategi yang berbeda mungkin lebih sesuai.

## Membuat SimpleImputer untuk Numerical Features

Untuk:

```text
Odometer (KM)
```

kita dapat menggunakan mean:

```python
num_imputer = SimpleImputer(
    strategy="mean"
)
```

Jika:

```text
Odometer

100000
120000
NaN
140000
```

maka missing value akan diganti dengan mean yang dipelajari oleh imputer.

## Menentukan Kolom untuk Setiap Imputer

Kita dapat membuat list:

```python
cat_features = [
    "Make",
    "Colour"
]

door_feature = [
    "Doors"
]

num_features = [
    "Odometer (KM)"
]
```

Sekarang kita memiliki:

```text
cat_features
    ↓
Make, Colour

door_feature
    ↓
Doors

num_features
    ↓
Odometer (KM)
```

## Menggabungkan dengan ColumnTransformer

Import:

```python
from sklearn.compose import ColumnTransformer
```

Kemudian:

```python
imputer = ColumnTransformer(
    transformers=[
        (
            "cat_imputer",
            cat_imputer,
            cat_features
        ),
        (
            "door_imputer",
            door_imputer,
            door_feature
        ),
        (
            "num_imputer",
            num_imputer,
            num_features
        )
    ]
)
```

Sekarang kita memiliki satu object yang mengetahui:

```text
Make + Colour
       ↓
"missing"

Doors
       ↓
4

Odometer
       ↓
mean
```

## Mengapa Menggunakan ColumnTransformer?

Setiap kolom dapat membutuhkan strategi preprocessing yang berbeda.

Misalnya:

```text
Make
 ↓
"missing"

Colour
 ↓
"missing"

Doors
 ↓
4

Odometer
 ↓
mean
```

Daripada melakukan semuanya secara manual, `ColumnTransformer` memungkinkan kita menentukan preprocessing berdasarkan kelompok kolom.

## Train-Test Split Sebelum Fitting Imputer

Ini merupakan bagian yang sangat penting.

Kita sebaiknya membagi data terlebih dahulu:

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

Kemudian imputer di-fit menggunakan training data:

```python
X_train_filled = imputer.fit_transform(
    X_train
)
```

Test data hanya ditransformasi:

```python
X_test_filled = imputer.transform(
    X_test
)
```

Perhatikan perbedaannya:

```text
Training
    ↓
fit_transform()

Test
    ↓
transform()
```

## Mengapa Tidak Langsung `fit_transform(X)`?

Jika kita melakukan:

```python
filled_X = imputer.fit_transform(X)
```

sebelum train-test split, imputer mempelajari parameter dari seluruh dataset.

Misalnya `num_imputer` menggunakan:

```python
strategy="mean"
```

maka mean tersebut dihitung menggunakan data training dan test.

Hal tersebut dapat menyebabkan informasi dari test set masuk ke preprocessing.

Ini merupakan bentuk **data leakage**.

## Memahami Data Leakage

Data leakage terjadi ketika informasi yang seharusnya tidak tersedia pada saat training masuk ke proses pembelajaran atau preprocessing.

Contoh yang kurang tepat:

```text
Seluruh Dataset
      │
      ▼
Fit Imputer
      │
      ▼
Train-Test Split
```

Pendekatan yang lebih aman:

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
                  │
                  ▼
              Transform
```

## Melihat Hasil Imputation

Setelah:

```python
X_train_filled = imputer.fit_transform(
    X_train
)
```

hasilnya dapat berupa array atau sparse representation tergantung transformer yang digunakan.

Kita dapat melihat:

```python
print(X_train_filled)
```

Untuk memeriksa apakah masih terdapat missing values, kita dapat mengubah hasil menjadi DataFrame.

Contoh:

```python
X_train_filled_df = pd.DataFrame(
    X_train_filled,
    columns=X_train.columns
)
```

Kemudian:

```python
X_train_filled_df.isna().sum()
```

Hasilnya seharusnya:

```text
Make             0
Colour           0
Doors            0
Odometer (KM)    0
dtype: int64
```

## Menggabungkan Imputation dengan One-Hot Encoding

Setelah missing values ditangani, kita masih memiliki categorical features:

```text
Make
Colour
Doors
```

Model membutuhkan representasi numerik.

Karena itu kita dapat menggunakan:

```python
OneHotEncoder
```

Import:

```python
from sklearn.preprocessing import OneHotEncoder
```

Kemudian:

```python
one_hot = OneHotEncoder(
    handle_unknown="ignore"
)
```

## Mengapa `handle_unknown="ignore"`?

Bayangkan training data memiliki:

```text
Toyota
Honda
BMW
```

Kemudian ketika model digunakan pada data baru terdapat:

```text
Tesla
```

Jika encoder tidak dikonfigurasi untuk menangani kategori yang belum pernah dilihat, proses transformasi dapat menghasilkan error.

Dengan:

```python
handle_unknown="ignore"
```

kategori yang tidak dikenal dapat ditangani tanpa membuat proses transformasi gagal.

## ColumnTransformer untuk Encoding

Setelah imputation, kita dapat melakukan encoding.

Namun, ada pendekatan yang lebih baik daripada membuat dua tahap transformasi manual secara terpisah.

Kita dapat menggunakan **Pipeline** sehingga:

```text
Imputation
    ↓
Encoding
    ↓
Model
```

dapat dikelola sebagai satu workflow.

## Pipeline untuk Categorical Features

Import:

```python
from sklearn.pipeline import Pipeline
```

Kemudian:

```python
categorical_pipeline = Pipeline(
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

Pipeline tersebut melakukan:

```text
Categorical Data
      │
      ▼
SimpleImputer
      │
      ▼
OneHotEncoder
      │
      ▼
Numerical Representation
```

## Pipeline untuk Numerical Features

Untuk `Odometer (KM)`:

```python
numeric_pipeline = Pipeline(
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

Workflow:

```text
Numerical Data
      │
      ▼
SimpleImputer
      │
      ▼
Mean
```

## Menggabungkan Pipeline dengan ColumnTransformer

Sekarang kita dapat membuat:

```python
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

Workflow menjadi:

```text
                       Dataset
                          │
             ┌────────────┴────────────┐
             │                         │
       Categorical                  Numerical
             │                         │
             ▼                         ▼
       SimpleImputer             SimpleImputer
             │                         │
             ▼                         │
       OneHotEncoder                   │
             │                         │
             └────────────┬────────────┘
                          │
                          ▼
                  Preprocessed Data
```

## Membuat Model

Kita akan menggunakan:

```python
RandomForestRegressor
```

Import:

```python
from sklearn.ensemble import RandomForestRegressor
```

Kemudian:

```python
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)
```

Parameter:

```text
n_estimators=100
```

berarti model menggunakan 100 decision trees dalam Random Forest.

Sedangkan:

```text
random_state=42
```

membantu reproducibility untuk proses yang menggunakan randomness.

## Menggabungkan Preprocessor dan Model

Sekarang kita dapat membuat Pipeline utama:

```python
model_pipeline = Pipeline(
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

Workflow:

```text
Raw Data
   │
   ▼
Preprocessor
   │
   ├── Categorical
   │     ├── Imputation
   │     └── One-Hot Encoding
   │
   └── Numerical
         └── Imputation
   │
   ▼
RandomForestRegressor
   │
   ▼
Prediction
```

## Training Model

Setelah Pipeline dibuat:

```python
model_pipeline.fit(
    X_train,
    y_train
)
```

Di belakang layar, Scikit-Learn akan melakukan:

```text
X_train
   │
   ▼
Fit Preprocessor
   │
   ▼
Transform X_train
   │
   ▼
Fit Random Forest
   │
   ▼
Model siap
```

## Evaluasi Model

Setelah model dilatih:

```python
score = model_pipeline.score(
    X_test,
    y_test
)
```

Kemudian:

```python
print(
    f"Model Score: {score:.4f}"
)
```

Perlu diingat bahwa arti `score()` bergantung pada estimator.

Untuk `RandomForestRegressor`, `score()` secara default menggunakan **R² score**.

## Apa Itu R²?

R² atau coefficient of determination mengukur seberapa besar variasi target yang dapat dijelaskan oleh model relatif terhadap baseline tertentu.

Secara sederhana:

```text
R² tinggi
→ model menjelaskan lebih banyak variasi target

R² rendah
→ model menjelaskan lebih sedikit variasi target
```

R² dapat bernilai negatif pada data test jika model bekerja lebih buruk daripada baseline tertentu.

Karena itu, jangan menganggap semua nilai `score()` sebagai accuracy.

## Contoh Lengkap

Berikut implementasi lengkap menggunakan `SimpleImputer`, `ColumnTransformer`, `OneHotEncoder`, `Pipeline`, dan `RandomForestRegressor`.

```python
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor

# ==========================================
# 1. Membaca dataset
# ==========================================

car_sales = pd.read_csv(
    "car-sales-extended-missing-data.csv"
)

# ==========================================
# 2. Menghapus baris yang tidak memiliki target
# ==========================================

car_sales = car_sales.dropna(
    subset=["Price"]
)

# ==========================================
# 3. Memisahkan X dan y
# ==========================================

X = car_sales.drop(
    "Price",
    axis=1
)

y = car_sales["Price"]

# ==========================================
# 4. Menentukan feature
# ==========================================

categorical_features = [
    "Make",
    "Colour",
    "Doors"
]

numeric_features = [
    "Odometer (KM)"
]

# ==========================================
# 5. Membuat categorical pipeline
# ==========================================

categorical_pipeline = Pipeline(
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

# ==========================================
# 6. Membuat numerical pipeline
# ==========================================

numeric_pipeline = Pipeline(
    steps=[
        (
            "imputer",
            SimpleImputer(
                strategy="mean"
            )
        )
    ]
)

# ==========================================
# 7. Menggabungkan preprocessing
# ==========================================

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

# ==========================================
# 8. Membuat model
# ==========================================

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

# ==========================================
# 9. Membuat pipeline utama
# ==========================================

model_pipeline = Pipeline(
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

# ==========================================
# 10. Train-test split
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ==========================================
# 11. Training
# ==========================================

model_pipeline.fit(
    X_train,
    y_train
)

# ==========================================
# 12. Evaluasi
# ==========================================

score = model_pipeline.score(
    X_test,
    y_test
)

print(
    f"Model Score: {score:.4f}"
)
```

## Mengapa Pipeline Ini Lebih Baik?

Pada pendekatan manual, kita mungkin melakukan:

```text
Fill Missing Values
        ↓
One-Hot Encoding
        ↓
Train-Test Split
        ↓
Model
```

Jika urutannya salah, kita dapat mengalami data leakage.

Dengan Pipeline dan train-test split yang benar:

```text
Raw Data
    │
    ▼
Train-Test Split
    │
    ├─────────────┐
    │             │
Training         Test
    │             │
    ▼             │
Preprocessor      │
    │             │
    ▼             │
Model             │
    │             │
    └──────┐      │
           │      │
           ▼      ▼
        Evaluation
```

Parameter preprocessing dipelajari dari training data.

Test data hanya melalui transformasi yang sama.

## Membandingkan Pendekatan Pandas dan Scikit-Learn

### Pandas

Contoh:

```python
df["Make"] = df["Make"].fillna(
    "Missing"
)

df["Odometer (KM)"] = df[
    "Odometer (KM)"
].fillna(
    df["Odometer (KM)"].mean()
)
```

Kelebihan:

- mudah dipahami;
- praktis untuk eksplorasi;
- cepat untuk manipulasi sederhana.

Kekurangan:

- preprocessing perlu dikelola secara manual;
- lebih mudah melakukan preprocessing dengan urutan yang salah;
- kurang praktis ketika workflow semakin kompleks.

### Scikit-Learn

Contoh:

```python
SimpleImputer
```

dikombinasikan dengan:

```python
ColumnTransformer
```

dan:

```python
Pipeline
```

Kelebihan:

- preprocessing terstruktur;
- dapat digabungkan dengan model;
- cocok untuk cross-validation;
- cocok untuk hyperparameter tuning;
- membantu menjaga konsistensi preprocessing;
- mengurangi risiko data leakage ketika workflow dirancang dengan benar.

## Perbedaan `fit`, `transform`, dan `fit_transform`

Memahami tiga method ini sangat penting.

### `fit()`

Digunakan untuk mempelajari parameter dari data.

Contoh:

```python
imputer.fit(X_train)
```

Jika menggunakan mean:

```text
Training Data
      ↓
fit()
      ↓
Belajar nilai mean
```

### `transform()`

Menggunakan parameter yang sudah dipelajari untuk mengubah data.

```python
X_test_filled = imputer.transform(
    X_test
)
```

### `fit_transform()`

Menggabungkan:

```text
fit()
+
transform()
```

Contoh:

```python
X_train_filled = imputer.fit_transform(
    X_train
)
```

## Aturan Penting

Gunakan:

```text
Training
→ fit_transform()
```

dan:

```text
Test
→ transform()
```

Jangan:

```text
Training
→ fit_transform()

Test
→ fit_transform()
```

karena test set tidak seharusnya digunakan untuk mempelajari parameter preprocessing.

## Mengapa Data Tanpa Label Dihapus?

Misalnya dataset memiliki:

```text
1000 rows
```

dan:

```text
50 rows
```

tidak memiliki `Price`.

Jika kita menghapusnya:

```text
1000
 ↓
950
```

Kita kehilangan 50 sampel.

Namun, untuk supervised learning, model membutuhkan target untuk setiap sampel training.

Karena itu:

```python
car_sales = car_sales.dropna(
    subset=["Price"]
)
```

dapat menjadi langkah yang masuk akal.

Perlu diingat bahwa kehilangan data juga dapat memengaruhi ukuran sampel dan representasi dataset. Karena itu, keputusan tersebut tetap perlu mempertimbangkan konteks dataset.

## Apakah Menghapus Data Selalu Lebih Buruk?

Tidak selalu.

Misalnya hanya:

```text
1%
```

data yang memiliki target missing.

Menghapus data tersebut mungkin tidak terlalu berdampak pada ukuran dataset.

Namun jika:

```text
40%
```

data tidak memiliki target, masalahnya menjadi jauh lebih serius.

Kita perlu mempertimbangkan:

- mengapa target hilang;
- berapa banyak data yang hilang;
- apakah missingness berkaitan dengan karakteristik tertentu;
- apakah ada sumber data lain;
- apakah dataset masih representatif setelah removal.

## Checklist

Sebelum menggunakan `SimpleImputer`, pastikan:

- [ ] Dataset sudah dipahami.
- [ ] Target sudah ditentukan.
- [ ] Baris dengan target missing sudah ditangani.
- [ ] Features dan target sudah dipisahkan.
- [ ] Categorical features sudah diidentifikasi.
- [ ] Numerical features sudah diidentifikasi.
- [ ] Strategi imputation sudah dipilih.
- [ ] Train-test split dilakukan sebelum fitting preprocessing.
- [ ] `SimpleImputer` digunakan sesuai tipe data.
- [ ] `OneHotEncoder` digunakan untuk categorical features.
- [ ] `ColumnTransformer` digunakan untuk menggabungkan transformasi.
- [ ] `Pipeline` digunakan untuk workflow yang terintegrasi.
- [ ] Test set tidak digunakan untuk fitting preprocessing.

## Ringkasan

Pada materi ini kita mempelajari cara menangani missing values menggunakan Scikit-Learn.

Konsep utamanya:

```text
SimpleImputer
      ↓
Mengisi Missing Values
```

Kemudian:

```text
ColumnTransformer
      ↓
Menerapkan preprocessing
pada kolom yang berbeda
```

Untuk categorical features:

```text
SimpleImputer
      ↓
OneHotEncoder
```

Untuk numerical features:

```text
SimpleImputer
```

Kemudian semuanya dapat digabungkan:

```text
Categorical Pipeline
          │
          ├── Imputation
          └── One-Hot Encoding
          │
          │
Numerical Pipeline
          │
          └── Imputation
          │
          ▼
   ColumnTransformer
          │
          ▼
        Model
```

Workflow lengkap:

```text
Dataset
   ↓
Remove missing target
   ↓
X dan y
   ↓
Train-Test Split
   ↓
ColumnTransformer
   ↓
SimpleImputer
   ↓
OneHotEncoder
   ↓
RandomForestRegressor
   ↓
Evaluation
```

Hal terpenting dari materi ini bukan hanya bagaimana mengisi `NaN`, tetapi bagaimana melakukan preprocessing dengan cara yang **konsisten dan bebas dari data leakage**.

## Cheat Sheet

| Kebutuhan | Kode |
|---|---|
| Import SimpleImputer | `from sklearn.impute import SimpleImputer` |
| Mean | `SimpleImputer(strategy="mean")` |
| Median | `SimpleImputer(strategy="median")` |
| Nilai konstan | `SimpleImputer(strategy="constant", fill_value=...)` |
| Import ColumnTransformer | `from sklearn.compose import ColumnTransformer` |
| Import Pipeline | `from sklearn.pipeline import Pipeline` |
| One-Hot Encoding | `OneHotEncoder(handle_unknown="ignore")` |
| Fit + Transform training | `fit_transform(X_train)` |
| Transform test | `transform(X_test)` |
| Train model | `pipeline.fit(X_train, y_train)` |
| Prediksi | `pipeline.predict(X_test)` |
| Evaluasi | `pipeline.score(X_test, y_test)` |
