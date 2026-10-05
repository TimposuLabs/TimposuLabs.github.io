---
sidebar_position: 37
title: "Optimasi Hyperparameter Pipeline dengan GridSearchCV"
---

Pada materi sebelumnya, kita telah mempelajari bagaimana menggabungkan proses preprocessing dan model Machine Learning menggunakan **Scikit-Learn Pipeline**.

Pipeline memungkinkan kita membuat alur seperti:

```text
Data
 ↓
Preprocessing
 ↓
Transformasi
 ↓
Model
 ↓
Prediksi
```

Kita juga telah mempelajari bahwa sebuah Pipeline dapat terdiri dari beberapa tahapan, misalnya:

- `SimpleImputer`
- `OneHotEncoder`
- `ColumnTransformer`
- `RandomForestRegressor`

Setelah Pipeline berhasil dibuat, langkah berikutnya adalah mencari konfigurasi hyperparameter yang lebih baik.

Untuk melakukan proses tersebut, kita dapat menggunakan **GridSearchCV** atau yang lainnya.

Pada materi ini kita akan mempelajari bagaimana menggunakan `GridSearchCV` untuk melakukan hyperparameter tuning langsung pada Pipeline.

---

## Apa Itu Hyperparameter Tuning?

Hyperparameter tuning adalah proses mencari kombinasi hyperparameter yang memberikan performa terbaik untuk sebuah model.

Contohnya, Random Forest memiliki beberapa hyperparameter:

```text
n_estimators
max_depth
max_features
min_samples_split
min_samples_leaf
```

Misalnya kita ingin mencoba:

```text
n_estimators
→ 100
→ 500
→ 1000
```

dan:

```text
max_depth
→ None
→ 5
→ 10
```

Daripada mencoba semuanya secara manual, kita dapat menggunakan `GridSearchCV`.

---

## GridSearchCV

`GridSearchCV` merupakan fitur Scikit-Learn yang dapat mencoba berbagai kombinasi hyperparameter yang telah kita tentukan.

Misalnya kita memiliki:

```python
param_grid = {
    "n_estimators": [100, 500],
    "max_depth": [None, 5]
}
```

Maka terdapat beberapa kombinasi:

```text
n_estimators = 100
max_depth = None

n_estimators = 100
max_depth = 5

n_estimators = 500
max_depth = None

n_estimators = 500
max_depth = 5
```

GridSearchCV akan mencoba kombinasi tersebut sesuai konfigurasi yang kita berikan.

---

## GridSearchCV pada Pipeline

Ketika menggunakan Pipeline, terdapat satu hal penting yang harus diperhatikan.

Misalnya Pipeline kita memiliki struktur:

```text
Pipeline
│
├── preprocessor
│
│   ├── cat
│   ├── door
│   └── num
│
└── regressor
```

Kita mungkin ingin mengubah parameter pada:

- preprocessing
- imputer
- encoder
- model

Untuk mengakses parameter yang berada di dalam Pipeline, kita menggunakan tanda:

```text
__
```

atau disebut **double underscore**.

---

## Apa Itu Double Underscore?

Double underscore digunakan untuk menelusuri struktur step di dalam Pipeline.

Format dasarnya:

```text
nama_step__nama_parameter
```

Jika terdapat beberapa tingkatan:

```text
nama_step__sub_step__parameter
```

Bahkan jika strukturnya lebih dalam:

```text
step__sub_step__sub_sub_step__parameter
```

Double underscore memungkinkan kita mengakses parameter yang berada di dalam struktur Pipeline.

---

## Contoh Struktur Pipeline

Misalnya kita memiliki Pipeline utama:

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

Pipeline memiliki dua step:

```text
preprocessor
regressor
```

Kemudian `preprocessor` memiliki `ColumnTransformer`:

```text
preprocessor
│
├── cat
├── door
└── num
```

Kemudian `num` memiliki Pipeline:

```text
num
│
└── imputer
```

Sehingga struktur lengkapnya:

```text
model
│
├── preprocessor
│   │
│   ├── cat
│   │
│   ├── door
│   │
│   └── num
│       │
│       └── imputer
│
└── regressor
```

---

## Mengakses Parameter Preprocessing

Misalnya kita ingin mengubah strategi `SimpleImputer` pada feature numerik.

Pipeline memiliki struktur:

```text
preprocessor
    ↓
   num
    ↓
 imputer
    ↓
strategy
```

Maka kita menggunakan:

```python
"preprocessor__num__imputer__strategy"
```

Formatnya:

```text
preprocessor
    ↓
   num
    ↓
 imputer
    ↓
 strategy
```

Contohnya:

```python
"preprocessor__num__imputer__strategy": [
    "mean",
    "median"
]
```

GridSearchCV kemudian akan mencoba:

```text
strategy = mean
strategy = median
```

---

## Mengakses Hyperparameter Model

Untuk mengakses hyperparameter model yang berada langsung di dalam Pipeline, kita menggunakan:

```text
nama_step_model__hyperparameter
```

Misalnya step model kita bernama:

```python
"regressor"
```

dan modelnya adalah:

```python
RandomForestRegressor
```

Maka:

```python
"regressor__n_estimators"
```

digunakan untuk mengakses `n_estimators`.

Contoh:

```python
"regressor__n_estimators": [
    100,
    500,
    1000
]
```

Begitu juga:

```python
"regressor__max_depth": [
    None,
    5,
    10
]
```

---

## Contoh Parameter Grid

Misalnya kita ingin melakukan tuning terhadap:

- strategi imputasi numerik
- jumlah tree
- kedalaman tree
- jumlah feature yang digunakan
- minimum sample untuk split

Kita dapat membuat:

```python
pipe_grid = {
    "preprocessor__num__imputer__strategy": [
        "mean",
        "median"
    ],
    "regressor__n_estimators": [
        100,
        500
    ],
    "regressor__max_depth": [
        None,
        5
    ],
    "regressor__max_features": [
        1.0,
        "sqrt"
    ],
    "regressor__min_samples_split": [
        2,
        4
    ]
}
```

Perhatikan bahwa kita menggunakan:

```python
"regressor__..."
```

karena nama step model pada Pipeline adalah:

```python
"regressor"
```

---

## Mengapa Menggunakan `max_features=1.0`?

Pada contoh materi lama, kita mungkin menemukan:

```python
"max_features": ["auto"]
```

Namun, parameter tersebut tidak lagi menjadi pilihan yang tepat untuk contoh `RandomForestRegressor` pada versi Scikit-Learn modern.

Untuk Random Forest Regressor, kita dapat menggunakan misalnya:

```python
1.0
```

atau:

```python
"sqrt"
```

`1.0` berarti seluruh feature dipertimbangkan ketika mencari split.

Sedangkan:

```python
"sqrt"
```

menggunakan akar kuadrat dari jumlah feature.

Dengan demikian, contoh yang lebih aman untuk versi Scikit-Learn modern adalah:

```python
"regressor__max_features": [
    1.0,
    "sqrt"
]
```

---

## Menghitung Jumlah Kombinasi

Sebelum menjalankan GridSearchCV, penting untuk mengetahui berapa banyak kombinasi yang akan dicoba.

Misalnya:

```python
pipe_grid = {
    "preprocessor__num__imputer__strategy": [
        "mean",
        "median"
    ],
    "regressor__n_estimators": [
        100,
        500
    ],
    "regressor__max_depth": [
        None,
        5
    ],
    "regressor__max_features": [
        1.0,
        "sqrt"
    ],
    "regressor__min_samples_split": [
        2,
        4
    ]
}
```

Masing-masing memiliki 2 pilihan.

Maka jumlah kombinasi:

```text
2 × 2 × 2 × 2 × 2
```

yaitu:

```text
32 kombinasi
```

Jika kita menggunakan:

```python
cv=5
```

maka setiap kombinasi akan dievaluasi menggunakan 5 fold.

Secara sederhana:

```text
32 kombinasi × 5 fold
= 160 proses fitting
```

Semakin banyak parameter dan pilihan yang dimasukkan ke dalam grid, semakin besar waktu komputasi yang dibutuhkan.

---

## Import GridSearchCV

Sekarang kita dapat mengimpor:

```python
from sklearn.model_selection import GridSearchCV
```

---

## Membuat GridSearchCV

Kita dapat membuat objek `GridSearchCV`:

```python
gs_model = GridSearchCV(
    estimator=model,
    param_grid=pipe_grid,
    cv=5,
    verbose=2,
    n_jobs=-1
)
```

Mari kita pahami setiap parameter.

### estimator

```python
estimator=model
```

`model` merupakan Pipeline yang telah kita buat sebelumnya.

Artinya GridSearchCV akan melakukan tuning terhadap seluruh Pipeline.

### param_grid

```python
param_grid=pipe_grid
```

Berisi daftar parameter yang ingin dicoba.

### cv

```python
cv=5
```

Menentukan jumlah fold yang digunakan dalam proses evaluasi internal GridSearchCV.

Pembahasan lebih mendalam mengenai Cross-Validation akan dibahas pada materi khusus berikutnya.

Untuk materi ini, cukup pahami bahwa `cv=5` membuat setiap kombinasi parameter dievaluasi menggunakan 5 bagian data.

### verbose

```python
verbose=2
```

Digunakan untuk menampilkan informasi proses pencarian parameter.

Semakin tinggi nilainya, semakin banyak informasi yang ditampilkan.

### n_jobs

```python
n_jobs=-1
```

Memberitahu Scikit-Learn untuk menggunakan seluruh CPU core yang tersedia untuk proses paralel jika memungkinkan.

Hal ini dapat membantu mempercepat proses pencarian.

---

## Melatih GridSearchCV

Setelah objek GridSearchCV dibuat, kita menjalankannya dengan:

```python
gs_model.fit(
    X_train,
    y_train
)
```

GridSearchCV kemudian akan:

```text
Pipeline
    ↓
Parameter Combination 1
    ↓
Evaluasi

Pipeline
    ↓
Parameter Combination 2
    ↓
Evaluasi

Pipeline
    ↓
Parameter Combination 3
    ↓
Evaluasi

...
```

Proses tersebut berlangsung hingga seluruh kombinasi yang terdapat pada `pipe_grid` selesai diuji.

---

## Melihat Hyperparameter Terbaik

Setelah proses selesai, kita dapat melihat parameter terbaik menggunakan:

```python
gs_model.best_params_
```

Contohnya dapat menghasilkan:

```python
{
    "preprocessor__num__imputer__strategy": "median",
    "regressor__max_depth": 5,
    "regressor__max_features": "sqrt",
    "regressor__min_samples_split": 2,
    "regressor__n_estimators": 500
}
```

Hasil tersebut menunjukkan kombinasi parameter yang menghasilkan skor terbaik berdasarkan konfigurasi pencarian.

Perhatikan bahwa hasil aktual dapat berbeda tergantung dataset, versi library, dan konfigurasi yang digunakan.

---

## Melihat Skor Terbaik

Kita juga dapat melihat skor terbaik menggunakan:

```python
gs_model.best_score_
```

Nilai tersebut merupakan skor terbaik yang diperoleh selama proses pencarian.

Penting untuk dipahami bahwa:

```python
gs_model.best_score_
```

bukanlah skor dari data test akhir.

Skor tersebut merupakan hasil evaluasi internal selama proses pencarian parameter.

---

## Mengevaluasi Model pada Data Test

Setelah parameter terbaik ditemukan, kita dapat mengevaluasi model pada data test yang sebelumnya tidak digunakan sebagai bagian dari pencarian.

```python
test_score = gs_model.score(
    X_test,
    y_test
)

test_score
```

Karena model yang digunakan adalah:

```python
RandomForestRegressor
```

maka:

```python
score()
```

menghasilkan nilai:

```text
R²
```

---

## Memahami Alur GridSearchCV pada Pipeline

Secara keseluruhan, alurnya menjadi:

```text
Dataset
   ↓
Train-Test Split
   │
   ├───────────────┐
   │               │
   ▼               ▼
X_train          X_test
   │               │
   ▼               │
Pipeline           │
   │               │
   ├── Preprocessor│
   │               │
   └── Model       │
   │               │
   ▼               │
GridSearchCV       │
   │               │
   ▼               │
Parameter Terbaik  │
   │               │
   └───────────────┘
           ↓
     Evaluasi Test
```

Dengan pendekatan ini, kita dapat melakukan tuning terhadap Pipeline sebagai satu kesatuan.

---

## Contoh Lengkap

Berikut contoh lengkap berdasarkan Pipeline pada materi sebelumnya.

```python
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.model_selection import GridSearchCV

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder

from sklearn.ensemble import RandomForestRegressor


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


# Categorical pipeline
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


# Door pipeline
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


# Numeric pipeline
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


# ColumnTransformer
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


# Pipeline
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


# Parameter grid
pipe_grid = {
    "preprocessor__num__imputer__strategy": [
        "mean",
        "median"
    ],
    "regressor__n_estimators": [
        100,
        500
    ],
    "regressor__max_depth": [
        None,
        5
    ],
    "regressor__max_features": [
        1.0,
        "sqrt"
    ],
    "regressor__min_samples_split": [
        2,
        4
    ]
}


# GridSearchCV
gs_model = GridSearchCV(
    estimator=model,
    param_grid=pipe_grid,
    cv=5,
    verbose=2,
    n_jobs=-1
)


# Train GridSearchCV
gs_model.fit(
    X_train,
    y_train
)


# Best parameters
print("Best Parameters:")
print(gs_model.best_params_)


# Best CV score
print("Best Score:")
print(gs_model.best_score_)


# Test score
print("Test Score:")
print(gs_model.score(
    X_test,
    y_test
))
```

---

## Mendapatkan Model Terbaik

GridSearchCV menyediakan atribut:

```python
best_estimator_
```

yang berisi estimator terbaik yang ditemukan.

Kita dapat mengaksesnya:

```python
best_model = gs_model.best_estimator_
```

Sekarang:

```python
best_model
```

merupakan Pipeline dengan konfigurasi terbaik yang ditemukan oleh GridSearchCV.

---

## Menggunakan Model Terbaik untuk Prediksi

Setelah mendapatkan model terbaik:

```python
best_model = gs_model.best_estimator_
```

kita dapat membuat prediksi:

```python
predictions = best_model.predict(
    X_test
)
```

Pipeline terbaik akan tetap menjalankan preprocessing secara otomatis sebelum menghasilkan prediksi.

---

## Melihat Struktur Model Terbaik

Kita dapat melihat step dalam model terbaik:

```python
best_model.named_steps
```

Kita juga dapat mengakses model Random Forest:

```python
best_model.named_steps["regressor"]
```

Dengan demikian, kita dapat melihat konfigurasi Random Forest yang terpilih.

---

## Mengapa Double Underscore Sangat Penting?

Tanpa double underscore:

```python
"regressor_n_estimators"
```

Scikit-Learn tidak akan memahami bahwa kita ingin mengakses parameter `n_estimators` dari step `regressor`.

Format yang benar:

```python
"regressor__n_estimators"
```

Perhatikan perbedaannya:

```text
Salah:
regressor_n_estimators

Benar:
regressor__n_estimators
```

Ada **dua underscore** di antara nama step dan nama parameter.

---

## Parameter Bertingkat

Untuk parameter yang lebih dalam, jumlah level akan menentukan jumlah double underscore.

Misalnya:

```text
model
 ↓
preprocessor
 ↓
num
 ↓
imputer
 ↓
strategy
```

Maka:

```python
"preprocessor__num__imputer__strategy"
```

dapat dibaca:

```text
preprocessor
    ↓
   num
    ↓
 imputer
    ↓
 strategy
```

Sedangkan:

```text
model
 ↓
regressor
 ↓
n_estimators
```

menjadi:

```python
"regressor__n_estimators"
```

---

## Melihat Semua Parameter Pipeline

Kita dapat menggunakan:

```python
model.get_params()
```

untuk melihat seluruh parameter yang tersedia dalam Pipeline.

Contohnya:

```python
model.get_params()
```

akan menampilkan berbagai parameter dari:

- Pipeline.
- ColumnTransformer.
- SimpleImputer.
- OneHotEncoder.
- RandomForestRegressor.

Cara ini sangat berguna untuk mengetahui nama parameter yang dapat digunakan dalam `GridSearchCV`.

---

## Teknik Menemukan Nama Parameter

Jika kita tidak yakin dengan nama parameter yang harus dimasukkan ke `param_grid`, kita dapat menggunakan:

```python
model.get_params().keys()
```

Contohnya:

```python
for parameter in model.get_params().keys():
    print(parameter)
```

Kita dapat menemukan nama seperti:

```text
preprocessor__num__imputer__strategy
regressor__n_estimators
regressor__max_depth
regressor__max_features
regressor__min_samples_split
```

Nama-nama tersebut kemudian dapat digunakan di dalam `pipe_grid`.

---

## Pipeline + GridSearchCV

Sekarang kita dapat melihat hubungan antara Pipeline dan GridSearchCV.

### Pipeline

Pipeline menjawab pertanyaan:

> Bagaimana proses preprocessing dan model dijalankan secara berurutan?

```text
Data
 ↓
Preprocessing
 ↓
Model
```

### GridSearchCV

GridSearchCV menjawab pertanyaan:

> Kombinasi parameter mana yang memberikan hasil terbaik berdasarkan konfigurasi pencarian?

```text
Parameter A
Parameter B
Parameter C
      ↓
GridSearchCV
      ↓
Kombinasi Terbaik
```

### Digabungkan

```text
                    Pipeline
                       │
          ┌────────────┴────────────┐
          │                         │
    Preprocessing                 Model
          │                         │
          └────────────┬────────────┘
                       │
                  GridSearchCV
                       │
                       ▼
                Parameter Terbaik
```

---

## Keuntungan Menggunakan GridSearchCV pada Pipeline

### 1. Preprocessing dan Model Dikelola Bersama

Kita dapat melakukan tuning terhadap preprocessing dan model dalam satu workflow.

Contohnya:

```python
"preprocessor__num__imputer__strategy"
```

dan:

```python
"regressor__n_estimators"
```

dapat berada dalam parameter grid yang sama.

### 2. Workflow Lebih Terstruktur

Daripada melakukan tuning secara manual:

```text
Imputer
 ↓
Encoder
 ↓
Model 1
 ↓
Model 2
 ↓
Model 3
```

kita dapat mengatur semuanya melalui Pipeline dan GridSearchCV.

### 3. Mengurangi Risiko Kesalahan

Pipeline memastikan preprocessing tetap menjadi bagian dari workflow model.

### 4. Mudah Dikembangkan

Ketika preprocessing bertambah kompleks, struktur Pipeline tetap dapat digunakan.

Misalnya:

```text
Imputer
 ↓
Encoder
 ↓
Scaler
 ↓
Feature Selection
 ↓
Model
```

GridSearchCV dapat digunakan untuk mengatur parameter pada berbagai step tersebut.

---

## Perbedaan Tuning Model dan Tuning Pipeline

Tuning model secara langsung:

```python
grid = {
    "n_estimators": [100, 500],
    "max_depth": [None, 5]
}
```

Sedangkan ketika model berada dalam Pipeline:

```python
pipe_grid = {
    "regressor__n_estimators": [100, 500],
    "regressor__max_depth": [None, 5]
}
```

Perbedaannya adalah kita harus menyebutkan nama step terlebih dahulu.

Jika parameter berada lebih dalam:

```python
"preprocessor__num__imputer__strategy"
```

kita harus mengikuti seluruh struktur Pipeline.

---

## Hal yang Perlu Diperhatikan

GridSearchCV dapat menjadi sangat berat jika parameter grid terlalu besar.

Misalnya:

```python
n_estimators = [100, 200, 500, 1000]
max_depth = [None, 5, 10, 20]
max_features = [1.0, "sqrt"]
min_samples_split = [2, 4, 6]
```

Jumlah kombinasi:

```text
4 × 4 × 2 × 3
= 96 kombinasi
```

Jika menggunakan:

```python
cv=5
```

maka proses evaluasi internal menjadi:

```text
96 × 5
= 480 fitting
```

Jika model membutuhkan waktu lama untuk dilatih, proses ini dapat memakan waktu cukup lama.

Karena itu, parameter grid sebaiknya dirancang secara masuk akal.

---

## GridSearchCV Tidak Selalu Menghasilkan Model Terbaik Secara Absolut

GridSearchCV hanya mencari kombinasi parameter yang tersedia di dalam `param_grid`.

Misalnya:

```python
"regressor__n_estimators": [
    100,
    500
]
```

GridSearchCV hanya membandingkan:

```text
100
vs
500
```

Jika ternyata nilai terbaik adalah:

```text
750
```

GridSearchCV tidak akan menemukannya karena angka tersebut tidak berada dalam grid.

Karena itu, kualitas hasil GridSearchCV juga dipengaruhi oleh kualitas parameter grid yang kita tentukan.

---

## Menentukan Parameter Grid secara Bertahap

Salah satu pendekatan yang baik adalah tidak langsung membuat grid yang sangat besar.

Misalnya kita mulai dari:

```python
pipe_grid = {
    "regressor__n_estimators": [
        100,
        500
    ],
    "regressor__max_depth": [
        None,
        5,
        10
    ]
}
```

Setelah mendapatkan gambaran parameter yang baik, kita dapat mempersempit atau memperluas pencarian pada area tertentu.

Pendekatan seperti ini membantu mengurangi beban komputasi.

---

## GridSearchCV sebagai Bagian dari Workflow Machine Learning

Workflow Machine Learning sekarang menjadi lebih lengkap:

```text
1. Define Problem
       ↓
2. Collect Data
       ↓
3. Explore Data
       ↓
4. Prepare Data
       ↓
5. Build Pipeline
       ↓
6. Train Model
       ↓
7. Tune Hyperparameters
       ↓
8. Evaluate Model
       ↓
9. Save Model
       ↓
10. Deploy Model
```

Pada materi ini kita berfokus pada bagian:

```text
Build Pipeline
      ↓
Tune Hyperparameters
      ↓
Evaluate Model
```

---

## Ringkasan

Pada materi ini kita telah mempelajari bagaimana menggunakan `GridSearchCV` pada Scikit-Learn Pipeline.

Konsep utama yang perlu diingat:

1. `GridSearchCV` digunakan untuk mencari kombinasi hyperparameter terbaik dari parameter yang telah ditentukan.
2. Pipeline dapat digunakan sebagai `estimator` pada `GridSearchCV`.
3. Parameter dalam Pipeline diakses menggunakan **double underscore**.
4. Parameter langsung pada model menggunakan format seperti:
   ```python
   "regressor__n_estimators"
   ```
5. Parameter preprocessing yang lebih dalam dapat menggunakan format seperti:
   ```python
   "preprocessor__num__imputer__strategy"
   ```
6. `best_params_` digunakan untuk melihat kombinasi parameter terbaik.
7. `best_score_` digunakan untuk melihat skor terbaik selama pencarian.
8. `best_estimator_` digunakan untuk mendapatkan Pipeline dengan konfigurasi terbaik.
9. `get_params()` dapat digunakan untuk mengetahui nama parameter yang tersedia.
10. Grid yang terlalu besar dapat menyebabkan proses komputasi menjadi berat.

Konsep paling penting dari materi ini adalah:

```text
Pipeline
    ↓
Preprocessing + Model
    ↓
GridSearchCV
    ↓
Mencoba Kombinasi Parameter
    ↓
Parameter Terbaik
    ↓
Model Terbaik
```

Dengan memahami konsep ini, kita sudah dapat melakukan hyperparameter tuning pada workflow Machine Learning yang memiliki preprocessing dan model dalam satu Pipeline.
