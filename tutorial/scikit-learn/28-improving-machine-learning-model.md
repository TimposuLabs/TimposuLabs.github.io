---
sidebar_position: 29
title: "Improving a Machine Learning Model"
---

Membangun model Machine Learning tidak berhenti setelah model berhasil dilatih dan menghasilkan prediksi.

Dalam praktiknya, model pertama yang kita buat biasanya belum menjadi model terbaik yang dapat kita hasilkan.

Proses Machine Learning secara umum dapat digambarkan:

```text
Data
  │
  ▼
Baseline Model
  │
  ▼
Training
  │
  ▼
Prediction
  │
  ▼
Evaluation
  │
  ▼
Improvement
  │
  ├── Improve Data
  ├── More Data
  ├── Better Features
  ├── Better Model
  └── Hyperparameter Tuning
```

Prinsip penting dalam proses ini adalah:

> **First predictions are not necessarily the last predictions.**

Artinya, prediksi pertama yang kita dapatkan bukan berarti merupakan hasil akhir.

Model dapat terus diperbaiki melalui eksperimen yang sistematis.

---

## Apa Itu Improving a Model?

**Improving a Model** adalah proses meningkatkan performa model Machine Learning setelah kita memiliki baseline atau model awal.

Misalnya kita membuat model klasifikasi dan mendapatkan:

```text
Baseline Accuracy = 75%
```

Kita kemudian mencoba beberapa pendekatan:

```text
Baseline
   ↓
  75%

Improve Data
   ↓
  78%

Better Model
   ↓
  81%

Hyperparameter Tuning
   ↓
  84%
```

Tujuannya bukan sekadar mendapatkan angka yang lebih tinggi, tetapi menemukan konfigurasi model yang memberikan performa yang lebih baik pada data yang relevan dan belum pernah dilihat model.

---

## Baseline Model

**Baseline model** adalah model awal yang digunakan sebagai titik pembanding.

Model baseline biasanya dibuat dengan konfigurasi sederhana sebelum dilakukan optimasi lebih lanjut.

Contohnya:

```python
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier(
    random_state=42
)

clf.fit(X_train, y_train)

baseline_score = clf.score(
    X_test,
    y_test
)

print(baseline_score)
```

Misalnya hasilnya:

```text
0.78
```

Maka:

```text
Baseline Score = 78%
```

Angka tersebut menjadi titik awal untuk eksperimen berikutnya.

---

## Mengapa Baseline Penting?

Tanpa baseline, kita sulit mengetahui apakah perubahan yang dilakukan benar-benar memberikan peningkatan.

Misalnya:

```text
Baseline Model
Accuracy = 78%
```

Kemudian kita melakukan tuning:

```text
Tuned Model
Accuracy = 82%
```

Kita dapat melihat adanya perubahan:

```text
82% - 78% = 4%
```

Namun jika hasil tuning:

```text
Baseline = 78%
Tuned     = 76%
```

maka perubahan tersebut justru menghasilkan performa yang lebih rendah pada data evaluasi tersebut.

Karena itu, baseline berfungsi sebagai **titik pembanding**.

---

## Parameters vs Hyperparameters

Salah satu konsep penting dalam meningkatkan model adalah memahami perbedaan antara **parameters** dan **hyperparameters**.

Keduanya sering disebut secara bersamaan, tetapi memiliki fungsi yang berbeda.

---

### Parameters

**Parameters** adalah nilai atau pola yang dipelajari oleh algoritma dari data selama proses training.

Contohnya pada model Linear Regression:

```text
y = w₁x₁ + w₂x₂ + b
```

Model akan mempelajari:

```text
w₁
w₂
b
```

dari data training.

Kita tidak menentukan nilai tersebut secara manual sebelum training.

Model mempelajarinya:

```text
Training Data
      ↓
   Algorithm
      ↓
Learn Parameters
      ↓
Predictions
```

Karena itu, parameter merupakan bagian internal model yang dipelajari berdasarkan data.

---

### Hyperparameters

**Hyperparameters** adalah konfigurasi model yang ditentukan sebelum atau selama proses training dan tidak dipelajari langsung dari data sebagai parameter model.

Contoh pada Random Forest:

```python
RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    min_samples_split=5
)
```

Beberapa hyperparameter tersebut adalah:

```text
n_estimators
max_depth
min_samples_split
```

Kita dapat mengubah nilainya untuk melihat bagaimana perubahan konfigurasi memengaruhi performa model.

---

### Perbedaan Parameters dan Hyperparameters

| Aspek | Parameters | Hyperparameters |
|---|---|---|
| Dipelajari dari data | Ya | Tidak secara langsung |
| Ditentukan sebelum training | Umumnya tidak | Ya |
| Contoh | Weight, coefficient | `max_depth`, `n_estimators` |
| Tujuan | Membentuk pola yang dipelajari model | Mengatur cara model belajar |
| Dapat diubah melalui tuning | Bukan secara langsung | Ya |

Secara sederhana:

```text
Parameters
    ↓
Dipelajari model dari data

Hyperparameters
    ↓
Kita tentukan untuk mengatur model
```

---

## Perspektif Utama dalam Meningkatkan Model

Ada dua perspektif utama ketika ingin meningkatkan performa Machine Learning:

```text
Improving Model
      │
      ├───────────────┐
      ▼               ▼
 Data Perspective   Model Perspective
      │               │
      ├── More Data   ├── Better Model
      └── Better Data └── Hyperparameter Tuning
```

Keduanya dapat digunakan secara terpisah maupun dikombinasikan.

---

## Perspektif Data

Pendekatan pertama adalah memperbaiki model dari sisi data.

Data merupakan salah satu komponen paling penting dalam Machine Learning.

Model yang baik membutuhkan data yang relevan dan berkualitas.

---

### Mengumpulkan Lebih Banyak Data

Pendekatan pertama adalah **mengumpulkan lebih banyak data**.

Misalnya kita memiliki:

```text
1.000 samples
```

Kemudian kita memperoleh:

```text
10.000 samples
```

Dengan lebih banyak contoh, model memiliki lebih banyak informasi untuk mempelajari hubungan antara input dan target.

Secara sederhana:

```text
1.000 Data
    ↓
  Model

10.000 Data
    ↓
  Model
    ↓
Lebih banyak contoh untuk dipelajari
```

Namun, lebih banyak data **tidak otomatis** menjamin performa model meningkat.

Kualitas data, representasi masalah, distribusi data, noise, dan karakteristik dataset tetap sangat penting.

---

### Kapan Lebih Banyak Data Dapat Membantu?

Tambahan data dapat membantu terutama ketika model masih kekurangan contoh untuk mempelajari pola yang relevan.

Misalnya sistem klasifikasi gambar hanya memiliki:

```text
100 gambar kucing
100 gambar anjing
```

Kemudian dataset ditambah menjadi:

```text
10.000 gambar kucing
10.000 gambar anjing
```

Model mendapatkan lebih banyak variasi contoh.

Variasi tersebut dapat mencakup:

- Sudut pengambilan gambar
- Pencahayaan
- Ukuran objek
- Background
- Posisi objek
- Kondisi lingkungan

Namun, tambahan data sebaiknya juga representatif terhadap data yang nantinya akan ditemui model.

---

### Meningkatkan Kualitas Data

Selain jumlah data, kualitas data juga sangat penting.

Beberapa hal yang dapat dilakukan:

```text
Data Quality
    │
    ├── Menangani missing values
    ├── Mengurangi data duplikat
    ├── Memperbaiki label
    ├── Menangani outlier sesuai konteks
    ├── Memperbaiki kesalahan input
    └── Memastikan data representatif
```

Data yang lebih bersih dan relevan dapat membantu model mempelajari pola yang lebih bermakna.

---

### Menambahkan Features

Pendekatan lain dari perspektif data adalah menambahkan fitur.

Misalnya kita ingin memprediksi harga rumah.

Awalnya:

```text
Features:
- Luas rumah
- Jumlah kamar
```

Kemudian kita menambahkan:

```text
Features:
- Luas rumah
- Jumlah kamar
- Luas tanah
- Usia bangunan
- Jarak ke pusat kota
- Jumlah lantai
```

Model sekarang memiliki lebih banyak informasi untuk membuat prediksi.

Namun, menambahkan fitur tidak selalu meningkatkan performa.

Fitur harus:

- Relevan dengan problem.
- Memiliki kualitas yang baik.
- Tersedia ketika model digunakan.
- Tidak menyebabkan data leakage.
- Memberikan informasi yang berguna bagi model.

---

### Feature Engineering

Proses membuat, memilih, atau mengubah fitur agar lebih informatif disebut **Feature Engineering**.

Contohnya:

```text
Tanggal Lahir
     ↓
   Umur
```

atau:

```text
Tanggal Transaksi
     ↓
Hari dalam Minggu
     ↓
   Bulan
     ↓
  Kuartal
```

Tujuannya adalah memberikan representasi data yang lebih sesuai dengan problem yang ingin diselesaikan.

---

## Perspektif Model

Selain memperbaiki data, kita dapat meningkatkan performa dari sisi model.

Ada dua pendekatan utama:

```text
Model Perspective
      │
      ├── Better / Different Model
      │
      └── Hyperparameter Tuning
```

---

### Menggunakan Model yang Berbeda

Model pertama yang digunakan belum tentu merupakan model yang paling sesuai dengan dataset.

Misalnya pada classification kita dapat mencoba:

```text
Logistic Regression
        ↓
    LinearSVC
        ↓
  Random Forest
        ↓
Gradient Boosting
```

Setiap algoritma memiliki karakteristik yang berbeda.

Model sederhana dapat menjadi baseline yang baik, sedangkan model ensemble atau algoritma lain dapat dicoba jika baseline belum memenuhi kebutuhan evaluasi.

---

### Simple Model vs Complex Model

Secara umum kita dapat membandingkan model sederhana dan model yang lebih kompleks.

Contoh model sederhana:

```python
from sklearn.svm import LinearSVC

model = LinearSVC()
```

Contoh model ensemble:

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)
```

Random Forest merupakan ensemble method karena menggabungkan banyak decision tree untuk menghasilkan prediksi.

Namun, model yang lebih kompleks tidak otomatis lebih baik.

Model harus dibandingkan menggunakan evaluasi yang sesuai.

---

### Mengapa Mencoba Model yang Berbeda?

Algoritma Machine Learning membuat asumsi dan memiliki mekanisme pembelajaran yang berbeda.

Misalnya:

```text
Model A
Accuracy = 75%

Model B
Accuracy = 82%

Model C
Accuracy = 79%
```

Perbandingan tersebut dapat membantu kita memahami apakah algoritma tertentu lebih sesuai dengan karakteristik dataset.

Tetapi perbandingan harus dilakukan secara adil, misalnya menggunakan data evaluasi dan prosedur evaluasi yang sama.

---

### Hyperparameter Tuning

Jika kita sudah memiliki model yang cukup baik, langkah berikutnya adalah melakukan **hyperparameter tuning**.

Hyperparameter tuning adalah proses mencari konfigurasi hyperparameter yang menghasilkan performa model yang lebih baik berdasarkan metode evaluasi yang dipilih.

Contohnya:

```python
RandomForestClassifier(
    n_estimators=100,
    max_depth=10
)
```

Kita dapat mencoba:

```text
n_estimators = 50
n_estimators = 100
n_estimators = 200
```

atau:

```text
max_depth = 5
max_depth = 10
max_depth = 20
```

Kemudian membandingkan hasilnya.

---

### Analogi Hyperparameter dengan Oven

Hyperparameter dapat dianalogikan seperti pengaturan oven.

Misalnya kita ingin memanggang makanan.

Kita dapat mengatur:

```text
Temperature = 180°C
Time        = 60 menit
```

Jika hasilnya belum sesuai, kita dapat mencoba:

```text
Temperature = 200°C
Time        = 60 menit
```

atau:

```text
Temperature = 180°C
Time        = 70 menit
```

Dalam Machine Learning, kita melakukan hal serupa dengan konfigurasi model.

```text
Hyperparameters
      ↓
  Training
      ↓
  Evaluation
      ↓
   Adjust
      ↓
Training kembali
```

Tujuannya adalah menemukan konfigurasi yang memberikan performa yang lebih baik berdasarkan prosedur evaluasi yang digunakan.

---

### Melihat Hyperparameters Model

Scikit-Learn menyediakan method:

```python
get_params()
```

untuk melihat parameter konfigurasi estimator.

Contohnya:

```python
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier()

clf.get_params()
```

Hasilnya berupa dictionary berisi berbagai konfigurasi.

Contoh sebagian:

```text
{
    'n_estimators': 100,
    'criterion': 'gini',
    'max_depth': None,
    'min_samples_split': 2,
    'min_samples_leaf': 1,
    ...
}
```

Jumlah dan nilai default dapat berbeda tergantung versi Scikit-Learn yang digunakan.

Karena itu, `get_params()` sangat berguna untuk melihat konfigurasi estimator pada environment yang sedang digunakan.

---

### Memahami `get_params()`

Method:

```python
clf.get_params()
```

digunakan untuk:

- Melihat hyperparameter yang tersedia.
- Mengetahui nilai konfigurasi saat ini.
- Mengetahui nama parameter yang dapat digunakan dalam tuning.
- Membantu memahami konfigurasi estimator.

Contoh mengambil satu hyperparameter:

```python
params = clf.get_params()

print(params["n_estimators"])
```

Output:

```text
100
```

---

## Tiga Pendekatan Hyperparameter Tuning

Secara umum kita dapat melakukan tuning dengan tiga pendekatan:

```text
Hyperparameter Tuning
        │
        ├── 1. By Hand
        │
        ├── 2. RandomizedSearchCV
        │
        └── 3. GridSearchCV
```

---

### 1. Hyperparameter Tuning by Hand

Pendekatan paling sederhana adalah mengubah hyperparameter secara manual.

Misalnya:

```python
model_1 = RandomForestClassifier(
    n_estimators=100,
    max_depth=5,
    random_state=42
)
```

Kemudian:

```python
model_2 = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    random_state=42
)
```

Lalu kita evaluasi:

```python
model_1.fit(X_train, y_train)
score_1 = model_1.score(X_test, y_test)

model_2.fit(X_train, y_train)
score_2 = model_2.score(X_test, y_test)
```

Kita dapat membandingkan:

```text
Model 1 → Score 0.78
Model 2 → Score 0.82
```

Pendekatan ini mudah dipahami dan cocok untuk pembelajaran atau eksperimen sederhana.

Namun, jika jumlah hyperparameter dan kombinasi nilainya semakin banyak, tuning secara manual menjadi tidak efisien.

---

### 2. Randomized Search

Scikit-Learn menyediakan:

```python
RandomizedSearchCV
```

Randomized Search mencoba sejumlah kombinasi hyperparameter yang dipilih dari ruang pencarian.

Contohnya:

```python
from sklearn.model_selection import RandomizedSearchCV
```

Kita dapat menentukan ruang hyperparameter:

```python
param_distributions = {
    "n_estimators": [50, 100, 200, 300],
    "max_depth": [None, 5, 10, 20],
    "min_samples_split": [2, 5, 10]
}
```

Kemudian:

```python
rs_clf = RandomizedSearchCV(
    estimator=RandomForestClassifier(
        random_state=42
    ),
    param_distributions=param_distributions,
    n_iter=10,
    cv=5,
    random_state=42
)
```

Kemudian:

```python
rs_clf.fit(X_train, y_train)
```

Setelah selesai:

```python
print(rs_clf.best_params_)
```

Kita dapat melihat kombinasi hyperparameter yang memberikan hasil terbaik berdasarkan scoring yang digunakan selama pencarian.

---

### Mengapa Menggunakan Randomized Search?

Jika terdapat banyak kemungkinan kombinasi:

```text
Parameter A → 10 pilihan
Parameter B → 10 pilihan
Parameter C → 10 pilihan
Parameter D → 10 pilihan
```

Total kombinasi:

```text
10 × 10 × 10 × 10
= 10.000 kombinasi
```

Mencoba semuanya dapat membutuhkan waktu dan komputasi yang besar.

Randomized Search hanya mengevaluasi sejumlah kombinasi yang kita tentukan melalui:

```python
n_iter
```

Contohnya:

```python
n_iter=20
```

berarti pencarian akan mengevaluasi sejumlah konfigurasi yang dipilih secara acak dari ruang parameter yang diberikan.

---

### 3. Grid Search

Pendekatan lainnya adalah:

```python
GridSearchCV
```

Grid Search mencoba kombinasi hyperparameter yang ditentukan dalam grid secara sistematis.

Contohnya:

```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    "n_estimators": [100, 200],
    "max_depth": [5, 10],
    "min_samples_split": [2, 5]
}
```

Grid tersebut menghasilkan:

```text
2 × 2 × 2 = 8 kombinasi
```

Grid Search akan mengevaluasi seluruh kombinasi tersebut sesuai dengan prosedur cross-validation.

---

### Contoh `GridSearchCV`

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV

model = RandomForestClassifier(
    random_state=42
)

param_grid = {
    "n_estimators": [100, 200],
    "max_depth": [5, 10],
    "min_samples_split": [2, 5]
}

grid_search = GridSearchCV(
    estimator=model,
    param_grid=param_grid,
    cv=5,
    scoring="accuracy"
)

grid_search.fit(
    X_train,
    y_train
)
```

Setelah proses selesai:

```python
print(grid_search.best_params_)
```

Untuk melihat score terbaik:

```python
print(grid_search.best_score_)
```

---

### Randomized Search vs Grid Search

Kedua pendekatan tersebut sama-sama menggunakan cross-validation untuk mengevaluasi konfigurasi yang dicoba.

Perbedaannya:

| Aspek | RandomizedSearchCV | GridSearchCV |
|---|---|---|
| Cara memilih konfigurasi | Sejumlah konfigurasi dari ruang pencarian | Seluruh kombinasi dalam grid |
| Jumlah percobaan | Ditentukan oleh `n_iter` | Ditentukan oleh jumlah kombinasi |
| Efisiensi pada ruang besar | Dapat lebih hemat komputasi | Dapat sangat mahal |
| Eksplorasi | Tidak harus mencoba semua kombinasi | Mencoba semua kombinasi |
| Cocok untuk | Ruang parameter besar | Ruang parameter yang relatif kecil |

---

## Hubungan Cross-Validation dan Hyperparameter Tuning

Hyperparameter tuning sering dikombinasikan dengan cross-validation.

Contohnya:

```text
Hyperparameter
      │
      ▼
Combination 1
      │
      ├── Fold 1
      ├── Fold 2
      ├── Fold 3
      ├── Fold 4
      └── Fold 5
             │
             ▼
          Mean Score
```

Kemudian kombinasi lain diuji:

```text
Combination 2
      │
      ├── Fold 1
      ├── Fold 2
      ├── Fold 3
      ├── Fold 4
      └── Fold 5
             │
             ▼
          Mean Score
```

Proses tersebut berlanjut hingga seluruh konfigurasi yang dipilih selesai dievaluasi.

---

## Menggunakan `scoring` dalam Hyperparameter Tuning

Kita juga dapat menentukan metric yang digunakan saat tuning.

Contoh:

```python
grid_search = GridSearchCV(
    estimator=model,
    param_grid=param_grid,
    cv=5,
    scoring="accuracy"
)
```

Untuk classification, kita dapat menggunakan:

```python
scoring="accuracy"
```

atau:

```python
scoring="precision"
```

atau:

```python
scoring="recall"
```

atau:

```python
scoring="f1"
```

Untuk regression, misalnya:

```python
scoring="r2"
```

atau:

```python
scoring="neg_mean_absolute_error"
```

Pemilihan scoring harus disesuaikan dengan tujuan evaluasi.

---

## Workflow Improving a Model

Keseluruhan proses peningkatan model dapat digambarkan:

```text
                 Dataset
                    │
                    ▼
              Problem Definition
                    │
                    ▼
              Baseline Model
                    │
                    ▼
                Evaluation
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
     Improve Data        Improve Model
          │                   │
     ┌────┴────┐         ┌────┴─────────┐
     ▼         ▼         ▼              ▼
More Data  Better Data  Better Model  Hyperparameter
                                       Tuning
          │                   │
          └─────────┬─────────┘
                    ▼
                Evaluation
                    │
                    ▼
             Compare Results
                    │
                    ▼
             Select Configuration
```

Proses ini bersifat iteratif.

Jika hasil belum sesuai kebutuhan, kita dapat kembali melakukan eksperimen.

---

## Contoh Eksperimen Sederhana

Misalnya baseline kita adalah:

```python
baseline = RandomForestClassifier(
    random_state=42
)
```

Hasil:

```text
Baseline Accuracy = 0.78
```

Kemudian kita mencoba meningkatkan jumlah tree:

```python
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)
```

Hasil:

```text
Accuracy = 0.81
```

Kemudian mencoba:

```python
model = RandomForestClassifier(
    n_estimators=300,
    max_depth=10,
    random_state=42
)
```

Hasil:

```text
Accuracy = 0.82
```

Eksperimen tersebut dapat dilanjutkan dengan metode tuning otomatis.

Namun, setiap perubahan harus dievaluasi dengan prosedur yang konsisten.

---

## Jangan Hanya Mengejar Score Tinggi

Meningkatkan score pada satu dataset evaluasi bukan berarti model otomatis lebih baik dalam penggunaan nyata.

Kita perlu memperhatikan:

- Apakah model overfitting?
- Apakah test set tetap benar-benar tidak digunakan dalam tuning?
- Apakah preprocessing menyebabkan data leakage?
- Apakah metrik yang digunakan sesuai dengan tujuan?
- Apakah performa konsisten pada cross-validation?
- Apakah model terlalu kompleks?
- Apakah performa tetap baik pada data yang representatif terhadap penggunaan sebenarnya?

Karena itu, peningkatan model harus dilakukan secara sistematis.

---

## Prinsip Eksperimen yang Baik

Setiap eksperimen sebaiknya dicatat.

Contoh:

| Experiment | Model | Hyperparameters | Score |
|---|---|---|---:|
| Baseline | Random Forest | Default | 0.78 |
| Exp 1 | Random Forest | `n_estimators=200` | 0.81 |
| Exp 2 | Random Forest | `n_estimators=300`, `max_depth=10` | 0.82 |

Dengan tabel seperti ini, kita dapat mengetahui perubahan yang sudah dilakukan dan hasilnya.

---

## Kesalahan yang Sering Terjadi

### Menganggap Model yang Lebih Kompleks Selalu Lebih Baik

Tidak selalu.

Model yang lebih kompleks dapat:

- Membutuhkan lebih banyak komputasi.
- Lebih sulit diinterpretasikan.
- Berpotensi overfitting jika tidak dikendalikan.
- Tidak selalu memberikan peningkatan pada data baru.

Karena itu, model harus dibandingkan berdasarkan evaluasi yang tepat.

---

### Menganggap Lebih Banyak Data Selalu Lebih Baik

Tambahan data yang tidak relevan, noisy, atau tidak representatif belum tentu membantu.

Yang penting bukan hanya:

```text
More Data
```

tetapi:

```text
More Relevant and High-Quality Data
```

---

### Tuning Menggunakan Test Set Berulang Kali

Test set sebaiknya disimpan untuk evaluasi final ketika memungkinkan.

Jangan menjadikan test set sebagai target tuning berulang kali karena keputusan model dapat secara tidak langsung menyesuaikan diri terhadap test set.

Untuk tuning, gunakan training data dengan cross-validation, misalnya:

```python
GridSearchCV(
    model,
    param_grid,
    cv=5
)
```

Setelah konfigurasi dipilih, model final kemudian dapat dievaluasi pada test set yang belum digunakan dalam proses tuning.

---

## Ringkasan

**Improving a Model** adalah proses iteratif untuk meningkatkan performa model Machine Learning.

Kita dapat memperbaiki model dari dua perspektif utama:

### Perspektif Data

```text
More Data
Better Data
Better Features
Feature Engineering
```

### Perspektif Model

```text
Try Different Models
Hyperparameter Tuning
```

Sebelum melakukan improvement, kita perlu memiliki:

```text
Baseline Model
```

Baseline menjadi titik pembanding untuk mengetahui apakah eksperimen berikutnya memberikan perubahan pada performa.

---

## Parameters vs Hyperparameters

Ingat perbedaannya:

```text
Parameters
↓
Dipelajari dari data

Hyperparameters
↓
Ditentukan untuk mengatur proses/model
```

Untuk melihat konfigurasi estimator:

```python
model.get_params()
```

---

## Tiga Metode Hyperparameter Tuning

### Manual

```text
By Hand
```

Kita menentukan nilai hyperparameter sendiri dan menjalankan eksperimen.

### Randomized Search

```python
RandomizedSearchCV
```

Mencoba sejumlah konfigurasi yang dipilih dari ruang pencarian.

### Grid Search

```python
GridSearchCV
```

Mencoba seluruh kombinasi yang ditentukan dalam grid.

---

## Cheat Sheet

### Melihat Hyperparameters

```python
model.get_params()
```

### Manual Tuning

```python
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    random_state=42
)
```

### Randomized Search

```python
from sklearn.model_selection import RandomizedSearchCV

search = RandomizedSearchCV(
    model,
    param_distributions=param_distributions,
    n_iter=10,
    cv=5,
    scoring="accuracy",
    random_state=42
)
```

### Grid Search

```python
from sklearn.model_selection import GridSearchCV

search = GridSearchCV(
    model,
    param_grid=param_grid,
    cv=5,
    scoring="accuracy"
)
```

### Mendapatkan Hyperparameter Terbaik

```python
search.best_params_
```

### Mendapatkan Score Cross-Validation Terbaik

```python
search.best_score_
```

---

## Kesimpulan

Model Machine Learning pertama yang dibuat sebaiknya dianggap sebagai **baseline**, bukan sebagai hasil akhir.

Untuk meningkatkan performa model, kita dapat melakukan eksperimen dari sisi:

```text
DATA
├── More Data
├── Better Data
└── Better Features

MODEL
├── Better / Different Model
└── Hyperparameter Tuning
```

Hyperparameter dapat diperiksa menggunakan:

```python
model.get_params()
```

dan tuning dapat dilakukan dengan tiga pendekatan utama:

```text
1. By Hand
2. RandomizedSearchCV
3. GridSearchCV
```

Hal terpenting adalah melakukan improvement secara **eksperimental dan terukur**: tentukan baseline, ubah satu atau beberapa konfigurasi secara terkontrol, evaluasi dengan metrik yang sesuai, dan bandingkan hasilnya menggunakan prosedur evaluasi yang konsisten.

Dengan pendekatan tersebut, proses Machine Learning tidak berhenti pada:

```text
Train → Predict
```

tetapi berkembang menjadi:

```text
Train
  ↓
Evaluate
  ↓
Improve
  ↓
Evaluate
  ↓
Compare
  ↓
Tune
  ↓
Evaluate Again
```
