---
sidebar_position: 3
title: "Workflow End-to-End Scikit-Learn"
---

Setelah memahami konsep dasar workflow Scikit-Learn, sekarang kita akan melihat bagaimana seluruh proses tersebut diterapkan dalam sebuah alur **End-to-End Machine Learning**.

End-to-End berarti kita melihat proses Machine Learning mulai dari:

```text
Data
 ↓
Persiapan Data
 ↓
Pemilihan Model
 ↓
Training
 ↓
Prediksi
 ↓
Evaluasi
 ↓
Improvement
 ↓
Penyimpanan Model
 ↓
Deployment
```

Dengan memahami alur ini, kita tidak hanya mengetahui syntax Scikit-Learn, tetapi juga memahami bagaimana setiap bagian saling berhubungan dalam sebuah proyek Machine Learning.

## Tujuan Pembelajaran

Setelah mempelajari materi ini, kita diharapkan dapat:

- Memahami workflow Machine Learning secara end-to-end.
- Menyiapkan environment Python untuk Machine Learning.
- Mengimpor library yang diperlukan.
- Membaca dataset menggunakan Pandas.
- Memisahkan features dan target.
- Membagi data menjadi training dan testing.
- Memilih estimator berdasarkan jenis permasalahan.
- Melatih model menggunakan `fit()`.
- Membuat prediksi menggunakan `predict()`.
- Mengevaluasi model menggunakan beberapa metric.
- Memahami perbedaan performa training dan testing.
- Memahami tahap lanjutan berupa hyperparameter tuning.
- Memahami konsep penyimpanan model.
- Mengenal `Pipeline` sebagai cara menggabungkan preprocessing dan model.

## Gambaran Besar Workflow

Workflow End-to-End Scikit-Learn dapat digambarkan sebagai berikut:

```text
                Dataset
                   │
                   ▼
          Prepare Environment
                   │
                   ▼
             Load Dataset
                   │
                   ▼
             Define X and y
                   │
                   ▼
            Train/Test Split
                   │
                   ▼
          Choose Estimator
                   │
                   ▼
              Fit Model
                   │
                   ▼
          Make Predictions
                   │
                   ▼
          Evaluate the Model
                   │
              ┌────┴────┐
              │         │
           Improve?    Good?
              │         │
              ▼         │
       Tune Parameters  │
              │         │
              └────┬────┘
                   │
                   ▼
             Save Model
                   │
                   ▼
              Deployment
```

Workflow tersebut merupakan kerangka umum. Implementasi sebenarnya dapat berbeda tergantung jenis data dan permasalahan.

## Step 0 - Mempersiapkan Environment

Sebelum menulis kode Machine Learning, kita membutuhkan environment Python yang memiliki library yang diperlukan.

Salah satu pendekatan yang dapat digunakan adalah Conda.

Secara sederhana:

```text
Operating System
       ↓
Conda Environment
       ↓
Python
       ↓
Jupyter Notebook
       ↓
Machine Learning Libraries
```

Tujuan penggunaan environment adalah menjaga dependency proyek tetap terisolasi dan lebih mudah dikelola.

### Mengapa Menggunakan Environment?

Bayangkan kita memiliki dua proyek:

```text
Project A
Python + Library versi tertentu

Project B
Python + Library versi berbeda
```

Jika semua dependency menggunakan satu environment, perubahan pada satu proyek dapat memengaruhi proyek lainnya.

Dengan environment terpisah:

```text
Environment A
└── Project A

Environment B
└── Project B
```

masing-masing proyek dapat memiliki dependency yang sesuai.

## Library Utama

Pada awal workflow Data Science, beberapa library yang sering digunakan adalah:

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
```

Masing-masing memiliki fungsi berbeda.

### Pandas

Pandas digunakan untuk mengelola data tabular.

```python
import pandas as pd
```

Contohnya:

```python
df = pd.read_csv("heart-disease.csv")
```

### NumPy

NumPy digunakan untuk operasi numerik dan array.

```python
import numpy as np
```

NumPy banyak digunakan sebagai fondasi operasi numerik di ekosistem Python.

### Matplotlib

Matplotlib digunakan untuk visualisasi.

```python
import matplotlib.pyplot as plt
```

Contoh:

```python
plt.plot(
    [1, 2, 3],
    [10, 20, 15]
)

plt.show()
```

### Scikit-Learn

Setelah data dipersiapkan dan dieksplorasi, kita menggunakan Scikit-Learn untuk Machine Learning.

Contoh:

```python
from sklearn.model_selection import train_test_split
```

dan:

```python
from sklearn.ensemble import RandomForestClassifier
```

Serta metrics:

```python
from sklearn.metrics import accuracy_score
```

## Step 1 - Getting the Data Ready

Tahap pertama adalah mendapatkan dan mempersiapkan data.

Pada contoh ini kita menggunakan dataset Heart Disease.

Misalnya file:

```text
heart-disease.csv
```

dibaca menggunakan:

```python
import pandas as pd

heart_disease = pd.read_csv(
    "heart-disease.csv"
)
```

Setelah dataset dibaca, kita dapat melihat beberapa baris:

```python
heart_disease.head()
```

### Memeriksa Dataset

Sebelum membangun model, kita perlu memahami dataset.

Beberapa perintah yang berguna:

```python
heart_disease.head()
```

```python
heart_disease.info()
```

```python
heart_disease.describe()
```

dan:

```python
heart_disease.shape
```

Informasi tersebut membantu kita mengetahui:

- jumlah baris,
- jumlah kolom,
- nama fitur,
- tipe data,
- statistik dasar,
- dan kemungkinan masalah data.

### Memisahkan Feature dan Target

Misalnya dataset memiliki kolom:

```text
age
sex
cp
trestbps
chol
thalach
...
target
```

Kita ingin memprediksi:

```text
target
```

Maka:

```python
X = heart_disease.drop(
    "target",
    axis=1
)

y = heart_disease["target"]
```

Sekarang:

```text
X
↓
Features

y
↓
Target
```

### Memahami `X`

`X` berisi data yang akan digunakan model untuk membuat prediksi.

Contoh:

```text
age
sex
cp
trestbps
chol
thalach
...
```

Jika terdapat 13 fitur dan 303 baris, maka secara konseptual:

```text
X.shape
↓
(303, 13)
```

Artinya:

```text
303 samples
13 features
```

Jumlah sebenarnya bergantung pada dataset yang digunakan.

### Memahami `y`

`y` berisi target.

Contoh:

```python
y = heart_disease["target"]
```

Jika target merupakan klasifikasi biner, nilainya dapat berupa:

```text
0
1
```

Secara konseptual:

```text
X
│
├── Feature 1
├── Feature 2
├── Feature 3
└── ...

        ↓

      Model

        ↓

        y
```

## Step 1.1 - Train Test Split

Setelah `X` dan `y` ditentukan, kita membagi data.

Import:

```python
from sklearn.model_selection import train_test_split
```

Kemudian:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

Sekarang kita memiliki empat variabel:

```text
X_train
y_train
X_test
y_test
```

## Memahami Empat Variabel

### `X_train`

Features yang digunakan untuk training.

### `y_train`

Target yang digunakan untuk training.

### `X_test`

Features yang digunakan untuk evaluasi.

### `y_test`

Target sebenarnya yang digunakan untuk membandingkan hasil prediksi.

Secara sederhana:

```text
Training
├── X_train
└── y_train

Testing
├── X_test
└── y_test
```

## Mengapa Test Data Tidak Digunakan untuk Training?

Tujuannya adalah mengetahui kemampuan model pada data yang tidak digunakan untuk fitting.

Jika:

```python
model.fit(
    X_train,
    y_train
)
```

maka model belajar dari training data.

Kemudian:

```python
model.predict(
    X_test
)
```

digunakan untuk melihat bagaimana model bekerja pada data yang tidak digunakan untuk fitting.

## Step 2 - Choose the Right Estimator

Setelah data siap, kita memilih estimator.

Dalam Scikit-Learn, banyak algoritma Machine Learning diimplementasikan sebagai **estimator**.

Pemilihan estimator bergantung pada jenis permasalahan.

Secara sederhana:

```text
Problem
   │
   ├── Classification
   │       ↓
   │   Classifier
   │
   └── Regression
           ↓
       Regressor
```

### Classification

Classification digunakan ketika target berupa kategori.

Contohnya:

```text
0 / 1
Spam / Not Spam
Sakit / Tidak Sakit
Lulus / Tidak Lulus
```

Untuk contoh Heart Disease, kita dapat menggunakan:

```python
from sklearn.ensemble import RandomForestClassifier
```

Kemudian:

```python
clf = RandomForestClassifier(
    random_state=42
)
```

`clf` adalah objek estimator classification.

### Regression

Jika target berupa angka kontinu, kita dapat menggunakan estimator regression.

Contohnya:

```python
from sklearn.ensemble import RandomForestRegressor
```

Kemudian:

```python
model = RandomForestRegressor(
    random_state=42
)
```

Contoh target regression:

```text
Harga rumah
Penjualan
Suhu
Pendapatan
```

### Classification vs Regression

| Aspek | Classification | Regression |
|---|---|---|
| Target | Kategori | Nilai numerik |
| Contoh | Spam / Not Spam | Harga |
| Estimator | `RandomForestClassifier` | `RandomForestRegressor` |
| Output | Class | Nilai numerik |

Pemilihan estimator merupakan bagian penting dalam workflow Machine Learning.

### Hyperparameter

Estimator biasanya memiliki berbagai hyperparameter.

Contoh:

```python
RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    random_state=42
)
```

Di sini:

```text
n_estimators
max_depth
random_state
```

merupakan konfigurasi yang diberikan kepada estimator.

Hyperparameter dapat diubah untuk melakukan eksperimen dan meningkatkan performa.

## Step 3 - Fit the Model

Setelah memilih estimator:

```python
clf = RandomForestClassifier(
    random_state=42
)
```

kita melatih model:

```python
clf.fit(
    X_train,
    y_train
)
```

`fit()` merupakan method yang digunakan untuk melakukan training.

Secara sederhana:

```text
X_train
   +
y_train
   ↓
fit()
   ↓
Trained Estimator
```

### Apa yang Terjadi Saat `fit()`?

Detail proses internal bergantung pada algoritma.

Secara umum, estimator menggunakan training data untuk mempelajari parameter internal yang diperlukan model.

Kita tidak perlu mengimplementasikan seluruh algoritma secara manual.

Scikit-Learn menangani implementasi algoritma tersebut.

## Step 3.1 - Make Predictions

Setelah training:

```python
y_preds = clf.predict(
    X_test
)
```

Sekarang kita memiliki:

```text
y_test
↓
Actual Values

y_preds
↓
Predicted Values
```

Keduanya dapat dibandingkan.

### Bentuk Input `predict()`

Model yang telah dilatih mengharapkan struktur fitur yang sesuai dengan data saat training.

Misalnya:

```text
Training:
X_train
↓
13 features
```

Maka data yang diberikan ke:

```python
clf.predict(...)
```

harus memiliki struktur fitur yang sesuai.

Inilah salah satu alasan pentingnya memahami:

```python
X.shape
```

dan:

```python
X_train.shape
```

### Contoh Melihat Shape

Kita dapat menjalankan:

```python
print(X_train.shape)
print(X_test.shape)
print(y_train.shape)
print(y_test.shape)
```

Contoh hasil:

```text
(242, 13)
(61, 13)
(242,)
(61,)
```

Angka tersebut hanya ilustrasi dan dapat berbeda tergantung dataset dan pembagian data.

## Step 4 - Evaluate the Model

Setelah membuat prediksi:

```python
y_preds = clf.predict(
    X_test
)
```

kita perlu mengevaluasi performa model.

Salah satu cara sederhana adalah:

```python
clf.score(
    X_test,
    y_test
)
```

Untuk classifier tertentu, `score()` biasanya menghasilkan accuracy.

Namun, perilaku `score()` bergantung pada estimator yang digunakan.

Karena itu, ketika melakukan analisis yang lebih eksplisit, gunakan metric yang sesuai.

### Membandingkan Training dan Test Score

Kita dapat menghitung:

```python
clf.score(
    X_train,
    y_train
)
```

dan:

```python
clf.score(
    X_test,
    y_test
)
```

Contoh:

```python
train_score = clf.score(
    X_train,
    y_train
)

test_score = clf.score(
    X_test,
    y_test
)

print("Train score:", train_score)
print("Test score:", test_score)
```

Jika training score jauh lebih tinggi daripada test score, hal tersebut dapat menjadi sinyal yang perlu diselidiki, termasuk kemungkinan overfitting.

Namun, perbedaan score tersebut tidak boleh langsung dianggap sebagai bukti tunggal overfitting tanpa melihat konteks eksperimen.

### Mengapa Training Score Saja Tidak Cukup?

Misalnya:

```text
Train Score = 1.00
Test Score  = 0.75
```

Model sangat baik pada training data.

Namun performanya lebih rendah pada test data.

Hal ini menunjukkan bahwa performa pada training data tidak cukup untuk menggambarkan kemampuan generalisasi model.

Karena itu, evaluasi perlu menggunakan data yang tidak digunakan untuk fitting.

### Accuracy Score

Kita juga dapat menggunakan:

```python
from sklearn.metrics import accuracy_score
```

Kemudian:

```python
accuracy = accuracy_score(
    y_test,
    y_preds
)

print(accuracy)
```

Accuracy mengukur proporsi prediksi yang benar.

Secara sederhana:

```text
Prediksi Benar
───────────────
Total Prediksi
```

Namun accuracy tidak selalu menjadi metric terbaik untuk setiap permasalahan.

### Classification Report

Scikit-Learn juga menyediakan:

```python
from sklearn.metrics import classification_report
```

Kemudian:

```python
print(
    classification_report(
        y_test,
        y_preds
    )
)
```

Classification report biasanya memberikan informasi seperti:

```text
precision
recall
f1-score
support
```

Metric tersebut memberikan informasi yang lebih detail dibandingkan hanya menggunakan accuracy.

### Confusion Matrix

Kita juga dapat menggunakan:

```python
from sklearn.metrics import confusion_matrix

cm = confusion_matrix(
    y_test,
    y_preds
)
```

Confusion matrix membantu melihat jumlah prediksi yang masuk ke kategori:

```text
True Positive
True Negative
False Positive
False Negative
```

Untuk binary classification, konsep sederhananya:

```text
                  Actual
               0         1
            ┌───────┬───────┐
Predicted 0 │  TN   │  FN   │
            ├───────┼───────┤
Predicted 1 │  FP   │  TP   │
            └───────┴───────┘
```

Confusion matrix sangat berguna untuk memahami jenis kesalahan model, bukan hanya jumlah prediksi yang benar.

### Workflow Evaluasi

Setelah model membuat prediksi:

```text
y_test
   │
   ├──────────────┐
   │              │
   ▼              ▼
Compare        Compare
   │              │
   ▼              ▼
Accuracy      Confusion Matrix
   │
   ▼
Classification Report
```

Kita dapat menggunakan beberapa metric untuk memperoleh gambaran yang lebih lengkap.

## Step 5 - Improve the Model

Jika performa model belum sesuai kebutuhan, kita dapat melakukan improvement.

Beberapa pendekatan:

```text
Improve Model
│
├── Change Model
├── Change Features
├── Feature Engineering
├── Preprocessing
├── Hyperparameter Tuning
└── Cross-Validation
```

Improvement merupakan proses eksperimen.

### Hyperparameter Tuning

Misalnya Random Forest memiliki:

```python
n_estimators
max_depth
```

Kita dapat mencoba beberapa konfigurasi.

Contoh:

```text
n_estimators
├── 50
├── 100
└── 200
```

dan:

```text
max_depth
├── 5
├── 10
└── 20
```

Kemudian kita membandingkan performanya menggunakan validasi yang sesuai.

### GridSearchCV

Scikit-Learn menyediakan:

```python
GridSearchCV
```

untuk melakukan pencarian kombinasi hyperparameter secara sistematis.

Contoh konsep:

```python
from sklearn.model_selection import GridSearchCV
```

Kemudian kita menentukan parameter:

```python
param_grid = {
    "n_estimators": [50, 100, 200],
    "max_depth": [5, 10, 20]
}
```

Grid search kemudian dapat mengevaluasi kombinasi yang tersedia menggunakan cross-validation.

Contoh:

```python
grid = GridSearchCV(
    estimator=clf,
    param_grid=param_grid,
    cv=5
)
```

Kemudian:

```python
grid.fit(
    X_train,
    y_train
)
```

GridSearchCV akan mengevaluasi kombinasi parameter berdasarkan proses cross-validation yang ditentukan.

### RandomizedSearchCV

Alternatif lainnya adalah:

```python
RandomizedSearchCV
```

Contoh:

```python
from sklearn.model_selection import RandomizedSearchCV
```

Pendekatan ini dapat digunakan ketika ruang pencarian hyperparameter cukup besar dan kita tidak ingin mencoba seluruh kombinasi.

## Step 6 - Save and Load Model

Setelah model selesai dikembangkan, kita dapat menyimpannya.

Salah satu library yang umum digunakan:

```python
import joblib
```

Kemudian:

```python
joblib.dump(
    clf,
    "heart-disease-model.pkl"
)
```

Model dapat dimuat kembali:

```python
clf = joblib.load(
    "heart-disease-model.pkl"
)
```

Kemudian digunakan untuk prediksi:

```python
predictions = clf.predict(
    X_test
)
```

:::tip

Selain joblib, bisa juga menggunakan standard library **pickle**:

```python
import pickle

# save
pickle.dump(clf, open("random_forest_model_1.pkl", "wb"))

# load
loaded_model = pickle.load(open("random_forest_model_1.pkl", "rb"))
loaded_model.score(X_test, y_test)
```
:::

### Mengapa Model Disimpan?

Tanpa penyimpanan:

```text
Start Application
       ↓
Train Model
       ↓
Prediction
```

Dengan model yang sudah disimpan:

```text
Training
   ↓
Save
   ↓
Model File
   ↓
Load
   ↓
Prediction
```

Hal ini penting ketika model ingin digunakan dalam aplikasi.

## Step 7 - Putting It All Together

Setelah memahami setiap bagian, kita dapat menggabungkannya.

Workflow lengkap:

```text
Environment
    ↓
Import Libraries
    ↓
Load Dataset
    ↓
Understand Data
    ↓
Define X and y
    ↓
Train/Test Split
    ↓
Choose Estimator
    ↓
   Fit
    ↓
Predict
    ↓
Evaluate
    ↓
Improve
    ↓
  Save
    ↓
Deploy
```

## Contoh End-to-End Sederhana

Berikut contoh sederhana:

```python
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# --------------------------------
# 1. Load dataset
# --------------------------------

heart_disease = pd.read_csv(
    "heart-disease.csv"
)

# --------------------------------
# 2. Define X and y
# --------------------------------

X = heart_disease.drop(
    "target",
    axis=1
)

y = heart_disease["target"]

# --------------------------------
# 3. Split dataset
# --------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# --------------------------------
# 4. Create model
# --------------------------------

clf = RandomForestClassifier(
    random_state=42
)

# --------------------------------
# 5. Train model
# --------------------------------

clf.fit(
    X_train,
    y_train
)

# --------------------------------
# 6. Make predictions
# --------------------------------

y_preds = clf.predict(
    X_test
)

# --------------------------------
# 7. Evaluate
# --------------------------------

accuracy = accuracy_score(
    y_test,
    y_preds
)

print("Accuracy:", accuracy)

print(
    classification_report(
        y_test,
        y_preds
    )
)

print(
    confusion_matrix(
        y_test,
        y_preds
    )
)
```

## Memahami Kode End-to-End

Mari kita pecah kode tersebut.

### Import

```python
import pandas as pd
```

digunakan untuk membaca dataset.

Kemudian:

```python
from sklearn.model_selection import train_test_split
```

untuk membagi data.

Selanjutnya:

```python
from sklearn.ensemble import RandomForestClassifier
```

untuk membuat classifier.

Dan:

```python
from sklearn.metrics import ...
```

untuk evaluasi.

### Load Dataset

```python
heart_disease = pd.read_csv(
    "heart-disease.csv"
)
```

Dataset dimuat menjadi DataFrame.

### Define `X` dan `y`

```python
X = heart_disease.drop(
    "target",
    axis=1
)

y = heart_disease["target"]
```

Sekarang kita memiliki:

```text
X → Features
y → Target
```

### Split

```python
train_test_split(...)
```

membagi data menjadi training dan testing.

### Create Model

```python
clf = RandomForestClassifier(
    random_state=42
)
```

Membuat estimator classification.

### Fit

```python
clf.fit(
    X_train,
    y_train
)
```

Melatih model.

### Predict

```python
y_preds = clf.predict(
    X_test
)
```

Menghasilkan prediksi.

### Evaluate

```python
accuracy_score(
    y_test,
    y_preds
)
```

Membandingkan hasil prediksi dengan target sebenarnya.

## Memahami Aliran Data

Salah satu cara terbaik memahami Scikit-Learn adalah mengikuti perjalanan data.

```text
heart-disease.csv
        ↓
   DataFrame
        ↓
      X, y
        ↓
Train/Test Split
        ↓
 X_train, y_train
        ↓
      fit()
        ↓
  Trained Model
        ↓
     X_test
        ↓
    predict()
        ↓
     y_preds
        ↓
Compare with y_test
        ↓
   Evaluation
```

Jika kita memahami aliran ini, banyak syntax Scikit-Learn menjadi lebih mudah dipahami.

## Memahami Shape Data

Shape merupakan salah satu hal yang penting ketika bekerja dengan Scikit-Learn.

Periksa:

```python
print(X.shape)
print(y.shape)

print(X_train.shape)
print(X_test.shape)

print(y_train.shape)
print(y_test.shape)
```

Secara umum:

```text
X
↓
(samples, features)

y
↓
(samples,)
```

Misalnya:

```text
X.shape = (303, 13)
y.shape = (303,)
```

Setelah split:

```text
X_train.shape = (242, 13)
X_test.shape  = (61, 13)

y_train.shape = (242,)
y_test.shape  = (61,)
```

Angka tersebut merupakan contoh dan dapat berbeda berdasarkan pembagian dataset.

## Kesalahan yang Sering Terjadi

### Memasukkan Target ke Dalam `X`

Jangan melakukan:

```python
X = heart_disease
```

jika `target` masih berada di dalam DataFrame tersebut.

Lebih tepat:

```python
X = heart_disease.drop(
    "target",
    axis=1
)
```

dan:

```python
y = heart_disease["target"]
```

### Melatih Model Menggunakan Test Data

Hindari:

```python
clf.fit(
    X_test,
    y_test
)
```

Test data digunakan untuk evaluasi, bukan sebagai data utama untuk fitting model.

### Membandingkan Data dengan Shape yang Tidak Sesuai

Pastikan:

```text
X_test
```

memiliki struktur fitur yang sesuai dengan data yang digunakan saat training.

### Hanya Melihat Training Score

Training score yang tinggi belum menjamin model akan bekerja baik pada data baru.

Periksa juga data evaluasi.

### Menganggap `.score()` Selalu Berarti Accuracy

Arti `.score()` bergantung pada estimator.

Jika membutuhkan metric tertentu, gunakan fungsi metric yang eksplisit.

### Melakukan Tuning Menggunakan Test Set

Jangan terus-menerus memilih hyperparameter berdasarkan test set.

Gunakan validation set atau cross-validation untuk proses tuning, kemudian pertahankan test set untuk evaluasi akhir.

## Catatan tentang Data Leakage

Data leakage terjadi ketika informasi yang seharusnya tidak tersedia bagi model pada saat prediksi ikut memengaruhi proses training atau evaluasi.

Contoh sederhana preprocessing:

```text
Seluruh Dataset
       ↓
Fit Scaler
       ↓
Train/Test Split
```

Pendekatan tersebut dapat menyebabkan informasi dari test set ikut memengaruhi preprocessing.

Lebih aman:

```text
Dataset
   ↓
Train/Test Split
   │
   ├── Training
   │      ↓
   │   Fit Scaler
   │
   └── Test
          ↓
      Transform
```

Dalam Scikit-Learn, `Pipeline` dapat membantu menggabungkan preprocessing dan estimator sehingga workflow lebih aman dan konsisten.

## Preview Pipeline

`Pipeline` memungkinkan beberapa tahap Machine Learning digabungkan menjadi satu objek.

Contoh sederhana:

```python
from sklearn.pipeline import Pipeline
```

Secara konsep:

```text
Raw Features
     ↓
Preprocessing
     ↓
   Model
     ↓
Prediction
```

Contohnya:

```python
pipeline = Pipeline([
    ("scaler", scaler),
    ("model", model)
])
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
pipeline.predict(
    X_test
)
```

Pipeline akan menjadi bagian penting ketika kita mulai membahas preprocessing dan workflow Machine Learning yang lebih kompleks.

## Workflow Machine Learning yang Lebih Realistis

Workflow End-to-End dalam proyek nyata biasanya tidak sesederhana:

```text
Data → Model → Prediction
```

Melainkan:

```text
Data Collection
      ↓
Data Cleaning
      ↓
Exploratory Data Analysis
      ↓
Feature Engineering
      ↓
Train / Validation / Test
      ↓
Preprocessing
      ↓
Model Selection
      ↓
Cross-Validation
      ↓
Hyperparameter Tuning
      ↓
Final Evaluation
      ↓
Save Pipeline
      ↓
Deployment
      ↓
Monitoring
```

Tidak semua proyek membutuhkan setiap langkah dengan tingkat kompleksitas yang sama.

Namun memahami gambaran besar ini akan membantu ketika kita mulai mengembangkan proyek Machine Learning yang lebih realistis.

## Prinsip Eksperimen

Machine Learning merupakan proses yang bersifat iteratif.

Kita dapat membayangkannya sebagai:

```text
Experiment
  ↓
Train
  ↓
Evaluate
  ↓
Analyze
  ↓
Improve
  ↓
Experiment Again
```

Misalnya:

```text
Model A
   ↓
Evaluate
   ↓
Model B
   ↓
Evaluate
   ↓
Model C
   ↓
Evaluate
```

Tujuannya bukan sekadar mendapatkan angka metric tertinggi, tetapi mendapatkan model yang sesuai dengan kebutuhan masalah.

## Jangan Hanya Mengejar Angka

Misalnya:

```text
Model A → Accuracy 0.85
Model B → Accuracy 0.87
```

Belum tentu Model B selalu menjadi pilihan yang tepat.

Kita juga perlu mempertimbangkan:

- metric yang relevan,
- false positive,
- false negative,
- latency,
- ukuran model,
- interpretabilitas,
- biaya komputasi,
- dan kebutuhan aplikasi.

Dalam Machine Learning, performa model harus dilihat dalam konteks masalah yang diselesaikan.

## Tips Belajar Scikit-Learn

### Gunakan Notebook untuk Eksperimen

Jupyter Notebook sangat berguna untuk mencoba kode secara bertahap.

Misalnya:

```python
X.shape
```

kemudian:

```python
X_train.shape
```

kemudian:

```python
clf.fit(
    X_train,
    y_train
)
```

kemudian:

```python
y_preds = clf.predict(
    X_test
)
```

Dengan cara ini kita dapat melihat bagaimana setiap tahap mengubah atau menggunakan data.

### Gunakan `Shift + Tab`

Ketika lupa parameter suatu fungsi, gunakan:

```text
Shift + Tab
```

di Jupyter Notebook.

Contohnya:

```python
train_test_split(
```

Kemudian gunakan `Shift + Tab` untuk melihat signature dan informasi fungsi.

### Jika Ragu, Jalankan Kode

Prinsip yang sangat berguna:

```text
If in doubt, run the code.
```

Contoh:

```python
print(X.shape)
```

atau:

```python
print(y_preds[:10])
```

Kemudian analisis outputnya.

## Ringkasan

Workflow End-to-End Scikit-Learn dapat diringkas menjadi:

1. Mempersiapkan environment.
2. Mengimpor library.
3. Membaca dataset.
4. Memahami dataset.
5. Memisahkan `X` dan `y`.
6. Membagi data menjadi training dan testing.
7. Memilih estimator.
8. Melatih model menggunakan `fit()`.
9. Membuat prediksi menggunakan `predict()`.
10. Mengevaluasi model.
11. Melakukan eksperimen dan improvement.
12. Melakukan hyperparameter tuning jika diperlukan.
13. Menyimpan model atau pipeline.
14. Menggunakan model untuk prediction/deployment.

## Fungsi dan Method Penting

| Fungsi / Method | Kegunaan |
|---|---|
| `pd.read_csv()` | Membaca dataset CSV |
| `train_test_split()` | Membagi dataset |
| `fit()` | Melatih estimator |
| `predict()` | Membuat prediksi |
| `predict_proba()` | Menghasilkan probabilitas kelas pada estimator yang mendukung |
| `score()` | Menghasilkan score default estimator |
| `accuracy_score()` | Menghitung accuracy |
| `classification_report()` | Menampilkan precision, recall, F1-score, dan support |
| `confusion_matrix()` | Menampilkan confusion matrix |
| `GridSearchCV` | Hyperparameter tuning sistematis |
| `RandomizedSearchCV` | Hyperparameter tuning berbasis sampling |
| `joblib.dump()` | Menyimpan model |
| `joblib.load()` | Memuat model |
| `Pipeline` | Menggabungkan beberapa tahap workflow |

## Konsep Utama yang Harus Diingat

Pola dasar Scikit-Learn:

```text
X, y
 ↓
train_test_split()
 ↓
X_train, X_test
y_train, y_test
 ↓
Choose Estimator
 ↓
fit(X_train, y_train)
 ↓
predict(X_test)
 ↓
y_preds
 ↓
Compare with y_test
 ↓
Evaluate
```

Jika performanya belum sesuai:

```text
Evaluate
   ↓
Improve
   ↓
Tune
   ↓
Evaluate Again
```

Jika sudah siap digunakan:

```text
Trained Model
     ↓
   Save
     ↓
   Load
     ↓
Prediction
     ↓
Deployment
```

## Kesimpulan

Workflow End-to-End Scikit-Learn memberikan kerangka untuk memahami bagaimana sebuah proyek Machine Learning dibangun dari awal hingga model siap digunakan.

Yang paling penting bukan menghafal setiap fungsi, tetapi memahami **alur data dan tujuan setiap tahap**:

```text
Data
 ↓
X dan y
 ↓
Train/Test Split
 ↓
Estimator
 ↓
Fit
 ↓
Predict
 ↓
Evaluate
 ↓
Improve
 ↓
Save
 ↓
Deploy
```

Setelah memahami workflow ini, kita dapat mulai mempelajari masing-masing tahap secara lebih mendalam, terutama **pemilihan estimator, preprocessing, evaluasi, dan hyperparameter tuning**.
