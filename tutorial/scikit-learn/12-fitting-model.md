---
sidebar_position: 13
title: "Fitting Model / Melatih Model"
---

Setelah memahami cara memilih estimator yang sesuai, langkah berikutnya dalam workflow Scikit-Learn adalah **melatih model menggunakan data**.

Proses melatih model dalam Scikit-Learn dilakukan menggunakan method:

```python
.fit()
```

Pada materi sebelumnya kita telah memilih `RandomForestClassifier` sebagai salah satu estimator untuk masalah classification.

Sekarang kita akan mempelajari bagaimana model tersebut **belajar dari data training**.

Secara sederhana, workflow-nya adalah:

```text
Data
  ↓
Features (X) + Target (y)
  ↓
Train/Test Split
  ↓
Pilih Model
  ↓
.fit()
  ↓
Model Terlatih
  ↓
.predict()
  ↓
Prediksi
```

## Apa Itu Fitting?

**Fitting** adalah proses ketika model machine learning menggunakan data training untuk mempelajari pola yang terdapat pada data.

Dalam Scikit-Learn, proses tersebut dilakukan menggunakan:

```python
model.fit(X_train, y_train)
```

Misalnya:

```python
clf.fit(X_train, y_train)
```

Pada proses ini:

```text
X_train
   +
y_train
   ↓
Model
   ↓
Belajar pola
   ↓
Model terlatih
```

Model kemudian dapat menggunakan pola yang telah dipelajari untuk membuat prediksi terhadap data baru.

## Apa yang Dimaksud dengan X dan y?

Dalam machine learning, kita sering menggunakan notasi:

```text
X → Features
y → Target
```

### X - Features

`X` berisi informasi atau atribut yang digunakan model untuk membuat prediksi.

Misalnya pada dataset penyakit jantung:

```text
Age
Sex
Cholesterol
Blood Pressure
Heart Rate
...
```

Contohnya:

```python
X = heart_disease.drop("target", axis=1)
```

Artinya kita mengambil seluruh kolom kecuali `target`.

### y - Target

`y` berisi nilai yang ingin diprediksi oleh model.

Contohnya:

```python
y = heart_disease["target"]
```

Misalnya:

```text
0 → Tidak memiliki penyakit
1 → Memiliki penyakit
```

Dengan demikian:

```text
X
↓
Informasi pasien

y
↓
Status penyakit
```

## Mengapa X dan y Dipisahkan?

Model membutuhkan dua jenis informasi:

1. Data yang digunakan sebagai input.
2. Jawaban atau target yang ingin dipelajari.

Contohnya:

| Age | Cholesterol | Heart Rate | Target |
|---:|---:|---:|---:|
| 45 | 220 | 150 | 1 |
| 32 | 180 | 165 | 0 |
| 61 | 250 | 140 | 1 |
| 39 | 170 | 155 | 0 |

Model menggunakan:

```text
Age
Cholesterol
Heart Rate
```

untuk mempelajari hubungan dengan:

```text
Target
```

Sehingga:

```text
Features
   ↓
Model
   ↓
Target
```

## Training Data dan Testing Data

Sebelum melakukan fitting, dataset biasanya dibagi menjadi dua bagian:

```text
Dataset
   │
   ├── Training Set
   │
   └── Test Set
```

Training set digunakan untuk melatih model.

Test set digunakan untuk mengukur kemampuan model pada data yang tidak digunakan untuk fitting.

Contohnya:

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)
```

Dengan `test_size=0.2`:

```text
80% → Training
20% → Testing
```

## Mengapa Tidak Menggunakan Semua Data untuk Training?

Jika kita menggunakan seluruh data untuk training, kita tidak memiliki data yang benar-benar baru untuk menguji kemampuan generalisasi model.

Misalnya:

```text
100% Data
   ↓
Training
   ↓
Model
```

Kita kemudian menguji model menggunakan data yang sama:

```text
Model
  ↓
Data Training
  ↓
Score tinggi
```

Masalahnya, skor tersebut belum tentu menggambarkan kemampuan model terhadap data baru.

Karena itu kita menyisihkan sebagian data:

```text
Dataset
   │
   ├── 80% Training
   │       ↓
   │     Model
   │
   └── 20% Testing
           ↓
        Evaluasi
```

## Membuat Model

Setelah data training dan testing tersedia, kita membuat estimator.

Contohnya menggunakan Random Forest Classifier:

```python
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier(
    random_state=42
)
```

Pada tahap ini model belum belajar dari data.

Kita baru membuat objek model.

Secara sederhana:

```text
RandomForestClassifier()
        ↓
Model kosong
        ↓
Belum dilatih
```

## Melakukan Fitting

Sekarang kita melakukan proses training:

```python
clf.fit(X_train, y_train)
```

Inilah bagian penting dari materi ini.

Method `.fit()` memberikan data training kepada model.

```text
X_train
    +
y_train
    ↓
clf.fit()
    ↓
Model belajar
    ↓
Model terlatih
```

## Apa yang Terjadi Saat `.fit()`?

Ketika kita menjalankan:

```python
clf.fit(X_train, y_train)
```

model menerima:

```text
X_train
```

sebagai input features dan:

```text
y_train
```

sebagai target.

Model kemudian menggunakan algoritma yang dimilikinya untuk menemukan pola yang dapat digunakan dalam membuat prediksi.

Untuk Random Forest, proses tersebut melibatkan pembangunan banyak Decision Tree berdasarkan data training.

Secara sederhana:

```text
X_train + y_train
        ↓
Random Forest
        ↓
Decision Tree 1
Decision Tree 2
Decision Tree 3
...
Decision Tree N
        ↓
Model terlatih
```

Detail matematis dan algoritmik proses training berbeda-beda untuk setiap estimator.

Karena itu, `.fit()` memiliki fungsi yang sama secara umum, tetapi proses internalnya bergantung pada model yang digunakan.

## Setelah `.fit()`

Setelah:

```python
clf.fit(X_train, y_train)
```

berhasil dijalankan, `clf` sekarang berisi model yang sudah dilatih.

Sebelum fitting:

```text
clf
↓
Model belum dilatih
```

Setelah fitting:

```text
clf
↓
Model terlatih
```

Model tersebut kemudian dapat digunakan untuk:

```python
clf.predict(X_test)
```

atau dievaluasi:

```python
clf.score(X_test, y_test)
```

## Membuat Prediksi

Setelah model selesai dilatih, kita dapat menggunakan method:

```python
.predict()
```

Contohnya:

```python
y_preds = clf.predict(X_test)
```

Secara sederhana:

```text
X_test
   ↓
Model Terlatih
   ↓
.predict()
   ↓
y_preds
```

`y_preds` berisi hasil prediksi model.

Misalnya:

```text
[1, 0, 1, 1, 0, 0, 1]
```

Kemudian hasil tersebut dapat dibandingkan dengan:

```python
y_test
```

yang berisi nilai sebenarnya.

## Training vs Prediction

Penting untuk membedakan `.fit()` dan `.predict()`.

### `.fit()`

Digunakan untuk melatih model.

```python
clf.fit(X_train, y_train)
```

Tujuannya:

```text
Belajar dari data
```

### `.predict()`

Digunakan untuk menghasilkan prediksi.

```python
clf.predict(X_test)
```

Tujuannya:

```text
Menggunakan pola yang sudah dipelajari
```

Secara sederhana:

```text
.fit()
   ↓
Belajar

.predict()
   ↓
Memprediksi
```

## Training dan Testing

Workflow dasar machine learning dapat digambarkan sebagai berikut:

```text
                 Dataset
                    │
                    ▼
             Train/Test Split
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
      X_train, y_train    X_test, y_test
          │                   │
          ▼                   │
       .fit()                 │
          │                   │
          ▼                   │
    Model Terlatih            │
          │                   │
          └─────────┐         │
                    ▼         ▼
                 .predict()
                    │
                    ▼
                Prediksi
                    │
                    ▼
                Evaluasi
```

## Contoh Lengkap

Berikut contoh lengkap proses fitting menggunakan dataset Heart Disease.

```python
import numpy as np
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# 1. Random seed
np.random.seed(42)

# 2. Load dataset
heart_disease = pd.read_csv("heart-disease.csv")

# 3. Pisahkan features dan target
X = heart_disease.drop("target", axis=1)
y = heart_disease["target"]

# 4. Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# 5. Buat model
clf = RandomForestClassifier(
    random_state=42
)

# 6. Training / fitting
clf.fit(X_train, y_train)
```

Setelah kode tersebut dijalankan, model telah dilatih.

Tahap berikutnya adalah membuat prediksi:

```python
y_preds = clf.predict(X_test)
```

Kemudian mengevaluasi:

```python
score = clf.score(X_test, y_test)

print(f"Accuracy: {score:.3f}")
```

## Memahami Model sebagai Fungsi

Secara sederhana, kita dapat membayangkan model machine learning sebagai sebuah fungsi.

Misalnya:

```text
X
↓
Model
↓
ŷ
```

Secara matematis:

$$
\hat{y} = f(X)
$$

Keterangan:

- $X$ = features
- $f$ = model yang telah dipelajari
- $\hat{y}$ = prediksi

Pada proses training, model berusaha menemukan fungsi yang dapat menghasilkan prediksi yang sesuai dengan target.

Secara konseptual:

```text
Training Data
     ↓
X_train + y_train
     ↓
  Learning
     ↓
  Model f
     ↓
Prediction
```

## Model Belajar dari Contoh

Misalnya kita memiliki data:

| Age | Cholesterol | Target |
|---:|---:|---:|
| 45 | 220 | 1 |
| 32 | 180 | 0 |
| 61 | 250 | 1 |
| 39 | 170 | 0 |

Model diberikan:

```text
Age + Cholesterol
       ↓
    Target
```

Dari banyak contoh tersebut, model mencoba menemukan pola yang berguna untuk membedakan kelas.

Kemudian ketika mendapatkan data baru:

```text
Age = 50
Cholesterol = 230
```

model dapat menghasilkan:

```text
Prediction = 1
```

Prediksi tersebut berasal dari pola yang dipelajari pada training data.

## Apakah Model "Menghafal" Data?

Secara sederhana, kita sering mengatakan bahwa model **belajar pola**.

Namun, model machine learning dapat mengalami **overfitting**, yaitu ketika model terlalu menyesuaikan diri dengan training data sehingga performanya pada data baru menjadi buruk.

Contohnya:

```text
Training Accuracy
       ↓
      100%

Test Accuracy
       ↓
      65%
```

Perbedaan tersebut dapat menjadi indikasi bahwa model terlalu menyesuaikan diri dengan training data.

Karena itu, kita tidak cukup hanya melihat performa pada training set.

## Generalisasi

Tujuan penting machine learning adalah **generalization**.

Artinya, model diharapkan dapat bekerja dengan baik pada data baru yang memiliki karakteristik relevan dengan data yang digunakan dalam pengembangan model.

Secara sederhana:

```text
Training Data
     ↓
    Model
     ↓
Pola yang dipelajari
     ↓
Data Baru
     ↓
Prediksi
```

Model yang hanya bekerja dengan baik pada data training belum tentu memiliki generalisasi yang baik.

## `.fit()` Berbeda untuk Setiap Model

Salah satu kelebihan API Scikit-Learn adalah banyak estimator menggunakan pola yang serupa:

```python
model.fit(X_train, y_train)
```

Namun proses internalnya berbeda.

Misalnya:

```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X_train, y_train)
```

Berbeda dengan:

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier()
model.fit(X_train, y_train)
```

Keduanya menggunakan:

```python
.fit()
```

tetapi algoritma yang digunakan untuk belajar berbeda.

Inilah salah satu konsep penting dari API Scikit-Learn.

## `.fit()` Tidak Selalu Hanya untuk Model

Dalam Scikit-Learn, beberapa objek preprocessing juga menggunakan pola:

```python
.fit()
```

Misalnya:

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()

scaler.fit(X_train)
```

Kemudian:

```python
X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

Pada scaler, `.fit()` digunakan untuk mempelajari parameter preprocessing dari data training, seperti mean dan standar deviasi.

Hal ini penting untuk mencegah **data leakage**.

Jangan melakukan:

```python
scaler.fit(X)
```

sebelum train/test split jika tujuan kita adalah evaluasi model yang bebas dari informasi test set.

## Model dan Preprocessing

Dalam workflow machine learning yang lebih lengkap, prosesnya dapat menjadi:

```text
Raw Data
   ↓
Train/Test Split
   ↓
Preprocessing
   ↓
Model
   ↓
Training
   ↓
Prediction
   ↓
Evaluation
```

Untuk mengurangi risiko kesalahan preprocessing, Scikit-Learn menyediakan `Pipeline`.

Contohnya:

```python
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

model = make_pipeline(
    StandardScaler(),
    LogisticRegression()
)

model.fit(X_train, y_train)
```

Dengan pipeline, preprocessing dan model dapat diperlakukan sebagai satu workflow.

## Kesalahan Umum Saat Fitting

Ada beberapa kesalahan yang sering dilakukan pemula.

### Menggunakan Test Set untuk Training

Jangan melakukan:

```python
clf.fit(X_test, y_test)
```

jika `X_test` dan `y_test` memang dimaksudkan sebagai test set.

Test set seharusnya digunakan untuk evaluasi setelah model dilatih.

### Melatih Model Sebelum Split

Hindari pola:

```text
Seluruh Dataset
      ↓
   Training
      ↓
    Split
```

Gunakan:

```text
Dataset
   ↓
Split
   ↓
Training Data → Fit
Test Data     → Evaluation
```

### Melakukan Preprocessing pada Seluruh Data

Misalnya:

```python
scaler.fit(X)
```

sebelum split.

Lebih aman:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

scaler.fit(X_train)

X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

Atau gunakan `Pipeline`.

## Fitting Bukan Berarti Model Sudah Selesai

Menjalankan:

```python
clf.fit(X_train, y_train)
```

bukan berarti workflow machine learning sudah selesai.

Setelah fitting, kita masih perlu:

```text
Fit
 ↓
Predict
 ↓
Evaluate
 ↓
Improve
```

Jika performa belum sesuai:

```text
Evaluate
   ↓
Perbaiki
   ↓
Training kembali
   ↓
Evaluate kembali
```

Inilah alasan machine learning sering disebut sebagai proses eksperimentasi.

## Workflow Scikit-Learn

Sampai tahap ini, workflow kita menjadi:

```text
1. Get Data
      ↓
2. Prepare Data
      ↓
3. Define X and y
      ↓
4. Train/Test Split
      ↓
5. Choose Estimator
      ↓
6. Fit Model
      ↓
7. Make Predictions
      ↓
8. Evaluate
      ↓
9. Improve
```

Pada materi ini kita berfokus pada langkah:

```text
Choose Estimator
      ↓
Fit Model
```

Langkah berikutnya adalah:

```text
Fit Model
    ↓
Make Predictions
```

## Ringkasan

Pada materi ini kita telah mempelajari proses **fitting model** menggunakan Scikit-Learn.

Hal-hal penting yang perlu diingat:

1. `.fit()` digunakan untuk melatih estimator.
2. `X` biasanya digunakan untuk menyimpan features.
3. `y` biasanya digunakan untuk menyimpan target atau label.
4. `X_train` dan `y_train` digunakan untuk proses training.
5. `X_test` dan `y_test` digunakan untuk evaluasi.
6. `.fit(X_train, y_train)` membuat model mempelajari pola dari training data.
7. `.predict(X_test)` digunakan untuk menghasilkan prediksi pada data baru.
8. Training dan testing memiliki tujuan yang berbeda.
9. Model yang memiliki performa tinggi pada training data belum tentu memiliki generalisasi yang baik.
10. Preprocessing juga dapat memiliki proses `.fit()`.
11. Preprocessing sebaiknya dipelajari dari training data untuk menghindari data leakage.
12. `Pipeline` dapat membantu menggabungkan preprocessing dan model secara aman.
13. Fitting hanyalah salah satu tahap dalam workflow machine learning.

## Tantangan Eksperimen

Gunakan dataset Heart Disease dan lakukan eksperimen berikut.

### Tantangan 1 - Training Model

Buat `RandomForestClassifier` dan lakukan:

```python
clf.fit(X_train, y_train)
```

Pastikan model berhasil dilatih tanpa error.

### Tantangan 2 - Buat Prediksi

Setelah fitting, gunakan:

```python
y_preds = clf.predict(X_test)
```

Periksa hasil prediksi:

```python
print(y_preds[:10])
```

### Tantangan 3 - Bandingkan dengan Nilai Aktual

Bandingkan:

```python
print(y_preds[:10])
print(y_test[:10].to_numpy())
```

Amati mana prediksi yang sesuai dan mana yang berbeda.

### Tantangan 4 - Hitung Training dan Test Score

Hitung:

```python
train_score = clf.score(X_train, y_train)
test_score = clf.score(X_test, y_test)

print(f"Train Score: {train_score:.3f}")
print(f"Test Score: {test_score:.3f}")
```

Kemudian perhatikan perbedaan antara performa training dan testing.

### Tantangan 5 - Eksperimen dengan Jumlah Tree

Coba:

```python
RandomForestClassifier(
    n_estimators=10,
    random_state=42
)
```

Kemudian bandingkan dengan:

```python
RandomForestClassifier(
    n_estimators=100,
    random_state=42
)
```

Catat perubahan performanya.
