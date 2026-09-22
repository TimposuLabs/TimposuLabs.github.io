---
sidebar_position: 13
title: "Membuat Prediksi"
---

Setelah model berhasil dilatih menggunakan method `.fit()`, langkah berikutnya dalam workflow Scikit-Learn adalah menggunakan model tersebut untuk **membuat prediksi**.

Pada tahap ini, model yang sudah dipelajari digunakan untuk menghasilkan output berdasarkan data yang belum digunakan untuk proses fitting.

Dalam classification, Scikit-Learn menyediakan beberapa method untuk menghasilkan prediksi.

Dua method yang penting untuk dipahami adalah:

```python
predict()
```

dan:

```python
predict_proba()
```

Secara sederhana:

```text
Data Baru
   ↓
Model Terlatih
   ↓
┌─────────────────┐
│    predict()    │ → Label
│ predict_proba() │ → Probabilitas
└─────────────────┘
```

## Posisi Membuat Prediksi dalam Workflow

Sampai tahap ini, workflow Scikit-Learn yang kita pelajari adalah:

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

Pada materi sebelumnya kita telah membahas:

```python
clf.fit(X_train, y_train)
```

Sekarang kita akan melanjutkan dengan:

```python
clf.predict(X_test)
```

dan:

```python
clf.predict_proba(X_test)
```

## Apa Itu Prediction?

**Prediction** adalah proses ketika model yang sudah dilatih digunakan untuk menghasilkan output berdasarkan input baru.

Misalnya kita memiliki model untuk memprediksi penyakit jantung.

Input:

```text
Age
Cholesterol
Blood Pressure
Heart Rate
...
```

Model kemudian menghasilkan:

```text
0 → Tidak terindikasi kelas 1
1 → Terindikasi kelas 1
```

Secara sederhana:

```text
Features
   ↓
Model Terlatih
   ↓
Prediction
   ↓
Target
```

## Model Terlatih vs Model Belum Terlatih

Sebelum melakukan prediction, model harus terlebih dahulu dilatih.

Contoh:

```python
clf = RandomForestClassifier(
    random_state=42
)
```

Pada tahap ini model belum belajar dari dataset.

Kemudian:

```python
clf.fit(X_train, y_train)
```

Setelah `.fit()` berhasil:

```text
Model
  ↓
Sudah mempelajari training data
  ↓
Siap digunakan untuk prediction
```

Barulah kita dapat menjalankan:

```python
y_preds = clf.predict(X_test)
```

## Menggunakan `predict()`

Method `predict()` digunakan untuk menghasilkan **prediksi akhir** dari model.

Contohnya:

```python
y_preds = clf.predict(X_test)
```

Jika masalah yang kita hadapi adalah binary classification, hasilnya dapat berupa:

```text
[1, 0, 1, 1, 0, 0, 1]
```

Setiap nilai merupakan kelas yang diprediksi oleh model.

## Cara Kerja `predict()`

Secara sederhana:

```text
X_test
   ↓
Model Terlatih
   ↓
predict()
   ↓
Predicted Labels
```

Misalnya:

```text
Input
   ↓
Model
   ↓
   0
```

atau:

```text
Input
   ↓
Model
   ↓
   1
```

Model memilih kelas berdasarkan pola yang telah dipelajari selama training.

## Contoh `predict()`

Gunakan:

```python
y_preds = clf.predict(X_test)
```

Lihat hasil prediksi:

```python
print(y_preds)
```

Untuk melihat beberapa prediksi pertama:

```python
print(y_preds[:10])
```

Kita juga dapat melihat nilai sebenarnya:

```python
print(y_test[:10].to_numpy())
```

Sekarang kita dapat membandingkan:

```text
Prediksi
[1, 0, 1, 1, 0]

Aktual
[1, 0, 0, 1, 0]
```

Pada contoh tersebut terdapat satu prediksi yang berbeda dari nilai sebenarnya.

## Membandingkan Prediksi dengan Nilai Aktual

Kita dapat menggunakan operasi perbandingan NumPy:

```python
y_preds == y_test
```

Hasilnya berupa array boolean:

```text
[ True, True, False, True, True, ... ]
```

Artinya:

```text
True
↓
Prediksi benar

False
↓
Prediksi salah
```

## Menghitung Akurasi dengan NumPy

Kita dapat menghitung rata-rata nilai boolean:

```python
import numpy as np

np.mean(y_preds == y_test)
```

Mengapa cara ini dapat digunakan?

Dalam NumPy:

```text
True  → 1
False → 0
```

Misalnya:

```text
[True, True, False, True]
```

secara numerik dapat dianggap sebagai:

```text
[1, 1, 0, 1]
```

Sehingga:

$$
Accuracy =
\frac{1+1+0+1}{4}
$$

atau:

$$
Accuracy = 0.75
$$

Artinya:

```text
75% prediksi benar
```

Cara ini berguna untuk memahami konsep accuracy secara sederhana.

Namun, dalam proyek machine learning kita biasanya menggunakan metric dari Scikit-Learn.

## Menggunakan `accuracy_score()`

Scikit-Learn menyediakan:

```python
accuracy_score()
```

Import:

```python
from sklearn.metrics import accuracy_score
```

Kemudian:

```python
accuracy = accuracy_score(
    y_test,
    y_preds
)

print(f"Accuracy: {accuracy:.3f}")
```

Secara sederhana:

```text
y_test
   +
y_preds
   ↓
accuracy_score()
   ↓
Accuracy
```

## `clf.score()` vs `accuracy_score()`

Untuk classifier tertentu, kita dapat menggunakan:

```python
clf.score(X_test, y_test)
```

atau:

```python
accuracy_score(y_test, y_preds)
```

Contohnya:

```python
score = clf.score(X_test, y_test)

print(f"Accuracy: {score:.3f}")
```

Sedangkan:

```python
y_preds = clf.predict(X_test)

accuracy = accuracy_score(
    y_test,
    y_preds
)

print(f"Accuracy: {accuracy:.3f}")
```

Untuk classifier yang `score()`-nya menggunakan accuracy, kedua pendekatan tersebut akan memberikan nilai yang sama secara konsep.

Namun, selalu periksa dokumentasi estimator karena arti `score()` bergantung pada estimator yang digunakan.

## Memahami `predict_proba()`

Selain mendapatkan label akhir, kita terkadang ingin mengetahui **probabilitas prediksi untuk setiap kelas**.

Untuk estimator yang mendukungnya, kita dapat menggunakan:

```python
predict_proba()
```

Contoh:

```python
probabilities = clf.predict_proba(X_test)
```

Hasilnya berupa array probabilitas.

Misalnya:

```text
[[0.80, 0.20],
 [0.15, 0.85],
 [0.70, 0.30]]
```

Setiap baris merepresentasikan satu sampel.

Setiap kolom merepresentasikan probabilitas terhadap suatu kelas.

## Memahami Hasil `predict_proba()`

Misalnya model menghasilkan:

```text
[0.80, 0.20]
```

dan:

```python
clf.classes_
```

menghasilkan:

```text
[0, 1]
```

Maka:

```text
Kelas 0 → 80%
Kelas 1 → 20%
```

Sedangkan:

```text
[0.15, 0.85]
```

berarti:

```text
Kelas 0 → 15%
Kelas 1 → 85%
```

Untuk setiap sampel, probabilitas tersebut umumnya berjumlah 1.

Contoh:

$$
0.80 + 0.20 = 1.00
$$

## Mengetahui Urutan Kelas

Jangan berasumsi bahwa kolom pertama selalu berarti kelas `0` dan kolom kedua selalu berarti kelas `1`.

Gunakan:

```python
clf.classes_
```

Contoh:

```python
print(clf.classes_)
```

Jika hasilnya:

```text
[0 1]
```

maka:

```text
Kolom 0 → kelas 0
Kolom 1 → kelas 1
```

Urutan tersebut digunakan untuk memahami output dari:

```python
clf.predict_proba(X_test)
```

## Contoh `predict_proba()`

Untuk melihat probabilitas lima data pertama:

```python
probabilities = clf.predict_proba(
    X_test[:5]
)

print(probabilities)
```

Contoh output:

```text
[[0.82 0.18]
 [0.10 0.90]
 [0.67 0.33]
 [0.25 0.75]
 [0.91 0.09]]
```

Jika:

```python
clf.classes_
```

menghasilkan:

```text
[0 1]
```

maka kita dapat membaca:

| Sampel | Probabilitas Kelas 0 | Probabilitas Kelas 1 |
|---|---:|---:|
| 1 | 82% | 18% |
| 2 | 10% | 90% |
| 3 | 67% | 33% |
| 4 | 25% | 75% |
| 5 | 91% | 9% |

## `predict()` dan `predict_proba()`

Perbedaan utama:

| Method | Output |
|---|---|
| `predict()` | Label prediksi |
| `predict_proba()` | Probabilitas setiap kelas |

Contoh:

```python
clf.predict(X_test[:5])
```

dapat menghasilkan:

```text
[0, 1, 0, 1, 0]
```

Sedangkan:

```python
clf.predict_proba(X_test[:5])
```

dapat menghasilkan:

```text
[
    [0.82, 0.18],
    [0.10, 0.90],
    [0.67, 0.33],
    [0.25, 0.75],
    [0.91, 0.09]
]
```

Dengan demikian:

```text
predict()
    ↓
Apa kelas prediksinya?

predict_proba()
    ↓
Bagaimana probabilitas model
untuk setiap kelas?
```

## Apakah Probabilitas Berarti "Keyakinan" Model?

Kita sering menggunakan istilah seperti:

> Model 90% yakin bahwa data termasuk kelas 1.

Untuk pembelajaran dasar, istilah tersebut dapat membantu memahami konsep.

Namun secara teknis, nilai pada `predict_proba()` adalah **probabilitas yang dihasilkan oleh estimator**, bukan jaminan bahwa model benar 90% pada setiap prediksi.

Contohnya:

```text
predict_proba()
→ 0.90
```

tidak berarti:

> Prediksi ini pasti benar dengan probabilitas 90%.

Interpretasi probabilitas perlu mempertimbangkan apakah model **terkalibrasi** dengan baik.

Model dapat menghasilkan probabilitas yang terlihat tinggi tetapi belum tentu memiliki kalibrasi yang baik.

## Bagaimana `predict()` Memilih Kelas?

Pada banyak classifier yang menyediakan `predict_proba()`, prediksi kelas berkaitan dengan kelas yang memiliki probabilitas tertinggi.

Misalnya:

```text
Kelas 0 → 0.20
Kelas 1 → 0.80
```

Maka prediksi umumnya:

```text
1
```

Karena:

```text
0.80 > 0.20
```

Namun, detail mekanisme `predict()` bergantung pada estimator.

Jadi jangan menganggap semua classifier menentukan prediksi dengan mekanisme probabilitas yang persis sama.

## Contoh Lengkap Workflow

Berikut contoh lengkap dari training hingga prediction.

```python
import numpy as np
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 1. Load dataset
heart_disease = pd.read_csv("heart-disease.csv")

# 2. Pisahkan features dan target
X = heart_disease.drop("target", axis=1)
y = heart_disease["target"]

# 3. Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# 4. Buat model
clf = RandomForestClassifier(
    random_state=42
)

# 5. Training
clf.fit(X_train, y_train)

# 6. Prediction
y_preds = clf.predict(X_test)

# 7. Accuracy
accuracy = accuracy_score(
    y_test,
    y_preds
)

print(f"Accuracy: {accuracy:.3f}")

# 8. Probabilitas
probabilities = clf.predict_proba(
    X_test[:5]
)

print("Classes:", clf.classes_)
print("Probabilities:")
print(probabilities)
```

Workflow tersebut dapat digambarkan:

```text
Dataset
   ↓
X dan y
   ↓
Train/Test Split
   ↓
Random Forest
   ↓
.fit()
   ↓
Model Terlatih
   │
   ├───────────────┐
   ↓               ↓
.predict()   .predict_proba()
   ↓               ↓
Label           Probabilitas
   │               │
   └───────┬───────┘
           ↓
       Evaluation
```

## Prediksi pada Satu Sampel

Kita juga dapat membuat prediksi untuk satu atau beberapa sampel.

Misalnya:

```python
X_sample = X_test.iloc[:1]
```

Kemudian:

```python
prediction = clf.predict(X_sample)

print(prediction)
```

Untuk probabilitas:

```python
probability = clf.predict_proba(X_sample)

print(probability)
```

Perhatikan bahwa bentuk input tetap harus sesuai dengan struktur features yang digunakan ketika model dilatih.

## Memahami Shape Data

Salah satu masalah yang sering dialami pemula adalah kesalahan bentuk data.

Misalnya model dilatih menggunakan:

```text
X_train
shape = (240, 13)
```

Artinya:

```text
240 samples
13 features
```

Kemudian model digunakan untuk data:

```text
X_test
shape = (60, 13)
```

Ini sesuai karena jumlah feature tetap:

```text
13 features
```

Jumlah sampel boleh berbeda.

```text
Training
(240, 13)

Testing
(60, 13)
```

Yang harus konsisten adalah jumlah dan susunan feature.

## Contoh Shape yang Salah

Misalnya model dilatih menggunakan:

```text
(240, 13)
```

kemudian kita memberikan:

```text
(10, 12)
```

Masalahnya:

```text
Training → 13 features
Prediction → 12 features
```

Model tidak mengetahui bagaimana menangani feature yang hilang tersebut.

Hal ini dapat menyebabkan error.

Karena itu, sebelum melakukan prediction kita dapat memeriksa:

```python
print(X_train.shape)
print(X_test.shape)
```

dan memastikan struktur features konsisten.

## Prediction pada Data Baru

Dalam aplikasi nyata, model biasanya digunakan pada data yang benar-benar baru.

Contohnya:

```text
Data Training
     ↓
Training Model
     ↓
Model Terlatih
     ↓
Data Baru
     ↓
Prediction
```

Misalnya sistem menerima data pasien baru:

```text
Age
Cholesterol
Blood Pressure
Heart Rate
...
```

Data tersebut diberikan kepada model:

```python
prediction = clf.predict(new_data)
```

Model kemudian menghasilkan prediksi.

Inilah yang sering disebut sebagai **inference**.

## Training vs Inference

Dua istilah penting:

### Training

Training adalah proses membangun atau menyesuaikan model menggunakan data training.

```python
clf.fit(X_train, y_train)
```

### Inference

Inference adalah proses menggunakan model yang sudah dilatih untuk menghasilkan output pada data baru.

```python
clf.predict(X_new)
```

Secara sederhana:

```text
Training
   ↓
Model belajar

Inference
   ↓
Model digunakan
```

## Prediction dalam Production

Dalam aplikasi production, workflow dapat terlihat seperti:

```text
User
 ↓
Input Data
 ↓
API
 ↓
Model Terlatih
 ↓
predict()
 ↓
Prediction
 ↓
API Response
 ↓
User
```

Misalnya menggunakan FastAPI:

```text
Frontend
    ↓
POST /predict
    ↓
FastAPI
    ↓
Load Model
    ↓
model.predict()
    ↓
JSON Response
```

Model yang digunakan di production biasanya telah dilatih sebelumnya dan kemudian disimpan menggunakan mekanisme seperti `joblib` atau format model lain yang sesuai.

## Kapan Menggunakan `predict()`?

Gunakan:

```python
predict()
```

ketika aplikasi membutuhkan hasil kelas secara langsung.

Contohnya:

```text
0 → Tidak
1 → Ya
```

Misalnya:

```python
prediction = clf.predict(X_new)
```

Kemudian aplikasi dapat memberikan response:

```text
Prediction: 1
```

## Kapan Menggunakan `predict_proba()`?

Gunakan:

```python
predict_proba()
```

ketika aplikasi membutuhkan informasi probabilitas setiap kelas dan estimator yang digunakan mendukung method tersebut.

Contohnya:

```text
Kelas 0 → 0.20
Kelas 1 → 0.80
```

Probabilitas dapat berguna untuk:

- Analisis risiko
- Menentukan threshold
- Ranking
- Sistem yang membutuhkan tingkat keyakinan probabilistik
- Analisis model
- Evaluasi calibration

Namun, threshold tidak harus selalu 0.5. Threshold yang sesuai bergantung pada tujuan aplikasi dan konsekuensi false positive serta false negative.

## Tidak Semua Estimator Memiliki `predict_proba()`

Penting untuk diperhatikan bahwa tidak semua estimator classification menyediakan:

```python
predict_proba()
```

Jika method tersebut tidak tersedia, pemanggilan:

```python
clf.predict_proba(X_test)
```

dapat menghasilkan error.

Karena itu, periksa dokumentasi estimator yang digunakan.

Contohnya, banyak classifier seperti:

```text
RandomForestClassifier
LogisticRegression
```

menyediakan `predict_proba()`.

Sementara beberapa estimator dapat menggunakan mekanisme output lain seperti:

```python
decision_function()
```

sebagai alternatif informasi confidence atau decision score.

## Ringkasan

Pada materi ini kita telah mempelajari cara membuat prediksi menggunakan model machine learning.

Hal-hal penting yang perlu diingat:

1. Setelah `.fit()`, model dapat digunakan untuk membuat prediksi.
2. `.predict()` digunakan untuk menghasilkan label prediksi.
3. `.predict_proba()` digunakan untuk mendapatkan probabilitas setiap kelas jika estimator mendukungnya.
4. `y_preds` biasanya berisi hasil prediksi model.
5. `y_test` berisi label sebenarnya pada test set.
6. `accuracy_score()` dapat digunakan untuk menghitung accuracy.
7. `clf.score()` dapat digunakan untuk evaluasi, tetapi arti `score()` bergantung pada estimator.
8. `clf.classes_` dapat digunakan untuk mengetahui urutan kelas pada output `predict_proba()`.
9. Jumlah dan susunan features pada data input harus konsisten dengan data saat training.
10. Jumlah sampel boleh berbeda antara training dan prediction.
11. `predict()` menghasilkan keputusan kelas, sedangkan `predict_proba()` memberikan probabilitas kelas.
12. Probabilitas model bukan jaminan bahwa prediksi benar dengan probabilitas yang sama.
13. Tidak semua classifier menyediakan `predict_proba()`.
14. Training menggunakan `.fit()`, sedangkan inference menggunakan method seperti `.predict()`.
15. Dalam production, model terlatih dapat digunakan untuk melakukan inference terhadap data baru.

## Tantangan Eksperimen

Gunakan dataset Heart Disease dan model `RandomForestClassifier`.

### Tantangan 1 - Buat Prediksi

Latih model:

```python
clf.fit(X_train, y_train)
```

Kemudian:

```python
y_preds = clf.predict(X_test)
```

Tampilkan 10 prediksi pertama.

### Tantangan 2 - Bandingkan dengan Data Aktual

Bandingkan:

```python
print(y_preds[:10])
print(y_test[:10].to_numpy())
```

Identifikasi prediksi yang benar dan salah.

### Tantangan 3 - Hitung Accuracy

Gunakan:

```python
from sklearn.metrics import accuracy_score

accuracy = accuracy_score(
    y_test,
    y_preds
)

print(f"Accuracy: {accuracy:.3f}")
```

Bandingkan hasilnya dengan:

```python
clf.score(X_test, y_test)
```

### Tantangan 4 - Lihat Probabilitas

Gunakan:

```python
probabilities = clf.predict_proba(
    X_test[:10]
)

print(probabilities)
```

Kemudian periksa:

```python
print(clf.classes_)
```

Coba jelaskan arti setiap kolom probabilitas.

### Tantangan 5 - Cari Prediksi dengan Probabilitas Tertinggi

Ambil probabilitas kelas tertentu dan cari sampel yang memiliki probabilitas paling tinggi.

Sebagai contoh, jika kelas `1` berada pada kolom kedua:

```python
class_1_probability = clf.predict_proba(
    X_test
)[:, 1]

print(class_1_probability.max())
```

Kemudian cari indeks sampel dengan probabilitas tersebut:

```python
max_index = class_1_probability.argmax()

print(max_index)
```

Tujuan latihan ini adalah memahami bahwa model tidak hanya menghasilkan label, tetapi juga dapat memberikan informasi probabilistik jika estimator mendukungnya.
