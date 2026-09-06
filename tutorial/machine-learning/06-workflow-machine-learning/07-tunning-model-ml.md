---
sidebar_position: 7
title: "Modelling: Model Tuning"
---

Setelah memilih dan melatih sebuah model, biasanya kita mendapatkan performa awal.

Misalnya:

```text
Random Forest
Accuracy = 82%
```

Hasil tersebut belum tentu merupakan performa terbaik yang dapat dicapai oleh model tersebut.

Model memiliki sejumlah pengaturan yang dapat kita ubah untuk mencari konfigurasi yang memberikan hasil lebih baik.

Proses tersebut disebut **Model Tuning** atau **Hyperparameter Tuning**.

Secara sederhana:

```text
Model
  ↓
Default Hyperparameters
  ↓
Training
  ↓
Evaluation
  ↓
Tuning
  ↓
Training ulang
  ↓
Evaluation
  ↓
Konfigurasi terbaik
```

Model tuning merupakan proses eksperimen untuk menemukan kombinasi hyperparameter yang sesuai dengan dataset dan tujuan Machine Learning.

---

## Apa Itu Hyperparameter?

Sebelum memahami tuning, kita perlu membedakan antara **parameter** dan **hyperparameter**.

### Parameter

Parameter adalah nilai yang **dipelajari oleh model selama proses training**.

Contohnya pada Linear Regression:

```text
y = w₁x₁ + w₂x₂ + b
```

Nilai:

```text
w₁
w₂
b
```

merupakan parameter yang dipelajari model dari training data.

Kita tidak menentukan nilai tersebut secara manual sebelum training.

Model akan mencarinya berdasarkan data.

---

### Hyperparameter

Hyperparameter adalah pengaturan yang **ditentukan sebelum atau selama proses training**, tetapi bukan nilai yang dipelajari langsung dari data oleh algoritma training.

Contohnya pada Random Forest:

```python
RandomForestClassifier(
    n_estimators=100,
    max_depth=10
)
```

Di sini:

```text
n_estimators = 100
max_depth   = 10
```

merupakan hyperparameter.

Kita menentukan nilainya sebelum model dilatih.

---

## Perbedaan Parameter dan Hyperparameter

Perhatikan perbedaan berikut:

| Aspek | Parameter | Hyperparameter |
|---|---|---|
| Dipelajari model | Ya | Tidak secara langsung |
| Ditentukan sebelum training | Tidak | Ya |
| Contoh | Weight, bias | `max_depth` |
| Diubah saat tuning | Biasanya tidak langsung | Ya |
| Bergantung algoritma | Ya | Ya |

Secara sederhana:

```text
Hyperparameter
      ↓
Mengatur bagaimana model belajar
      ↓
Training
      ↓
Parameter model
```

Hyperparameter dapat memengaruhi bagaimana proses training berlangsung dan seberapa kompleks model yang dihasilkan.

---

## Analogi Kenop Oven

Model tuning dapat dianalogikan seperti memasak menggunakan oven.

Bayangkan kita ingin memanggang ayam.

Pengaturan awal:

```text
Suhu      = 180°C
Waktu     = 60 menit
```

Setelah dipanggang, ternyata ayam masih belum matang.

Kita kemudian mengubah pengaturan:

```text
Suhu      = 200°C
Waktu     = 60 menit
```

Setelah dicoba, hasilnya lebih baik.

Dalam Machine Learning:

```text
Oven
  ↓
Model

Suhu
  ↓
Hyperparameter

Memanggang
  ↓
Training

Hasil masakan
  ↓
Model Performance
```

Kita mencoba berbagai konfigurasi untuk menemukan pengaturan yang menghasilkan performa terbaik.

---

## Mengapa Model Perlu Dituning?

Model dengan konfigurasi default belum tentu optimal untuk dataset tertentu.

Misalnya Random Forest menggunakan:

```python
RandomForestClassifier(
    n_estimators=100
)
```

Kemudian hasilnya:

```text
Accuracy = 84%
```

Kita dapat mencoba:

```python
RandomForestClassifier(
    n_estimators=300
)
```

Kemudian mendapatkan:

```text
Accuracy = 87%
```

Kita dapat melanjutkan eksperimen dengan hyperparameter lain.

Namun perlu diingat:

> Menambah nilai hyperparameter tidak selalu meningkatkan performa.

Tuning adalah proses mencari konfigurasi yang sesuai, bukan sekadar membuat angka hyperparameter menjadi semakin besar.

---

## Hyperparameter pada Random Forest

Random Forest memiliki banyak hyperparameter yang dapat disesuaikan.

Beberapa yang penting:

- `n_estimators`
- `max_depth`
- `min_samples_split`
- `min_samples_leaf`
- `max_features`
- `max_samples`
- `bootstrap`

---

## `n_estimators`

`n_estimators` menentukan jumlah Decision Tree yang digunakan dalam Random Forest.

Contoh:

```python
RandomForestClassifier(
    n_estimators=10
)
```

berarti model menggunakan 10 tree.

Kita dapat mencoba:

```python
n_estimators = 10
n_estimators = 50
n_estimators = 100
n_estimators = 200
n_estimators = 500
```

Secara umum, semakin banyak tree:

- model dapat menjadi lebih stabil
- waktu training meningkat
- penggunaan memory meningkat
- peningkatan performa pada akhirnya dapat semakin kecil

Contoh eksperimen:

```python
from sklearn.ensemble import RandomForestClassifier

for n in [10, 50, 100, 200]:
    model = RandomForestClassifier(
        n_estimators=n,
        random_state=42
    )

    model.fit(X_train, y_train)

    score = model.score(X_test, y_test)

    print(n, score)
```

Contoh hasil:

```text
10   → 0.81
50   → 0.84
100  → 0.86
200  → 0.86
```

Dari contoh tersebut, menambah tree dari 100 menjadi 200 tidak memberikan peningkatan berarti.

---

## `max_depth`

`max_depth` menentukan kedalaman maksimum Decision Tree.

Contoh:

```python
RandomForestClassifier(
    max_depth=5
)
```

Tree yang lebih dalam dapat mempelajari pola yang lebih kompleks.

Namun tree yang terlalu dalam dapat meningkatkan risiko **overfitting**.

Contoh:

```text
max_depth = 2
    ↓
Model terlalu sederhana

max_depth = 10
    ↓
Model lebih kompleks

max_depth = None
    ↓
Tree dapat berkembang sangat dalam
```

Kita dapat menguji:

```python
for depth in [2, 5, 10, 20, None]:
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=depth,
        random_state=42
    )

    model.fit(X_train, y_train)

    score = model.score(X_test, y_test)

    print(depth, score)
```

---

## `min_samples_split`

Hyperparameter ini menentukan jumlah minimum sample yang dibutuhkan agar sebuah node dapat di-split.

Contoh:

```python
RandomForestClassifier(
    min_samples_split=10
)
```

Dengan nilai yang lebih besar, model menjadi lebih konservatif dalam melakukan pemisahan node.

Hal ini dapat membantu mengurangi kompleksitas model.

---

## `min_samples_leaf`

`min_samples_leaf` menentukan jumlah minimum sample yang harus ada pada sebuah leaf.

Contoh:

```python
RandomForestClassifier(
    min_samples_leaf=5
)
```

Nilai yang lebih besar dapat membuat model lebih sederhana dan dapat membantu mengurangi overfitting.

---

## Hyperparameter pada Neural Network

Neural Network juga memiliki berbagai hyperparameter.

Contohnya:

- jumlah hidden layer
- jumlah neuron
- learning rate
- batch size
- jumlah epoch
- optimizer
- dropout
- activation function

Contoh sederhana:

```text
Input
  ↓
Dense Layer
  ↓
Dense Layer
  ↓
Output
```

Kita dapat mengubah:

```text
Jumlah layer
Jumlah neuron
Learning rate
Batch size
Epoch
Dropout
```

---

## Jumlah Layer

Misalnya kita memiliki Neural Network:

```text
Input
  ↓
10 neuron
  ↓
Output
```

Kemudian kita mencoba:

```text
Input
  ↓
64 neuron
  ↓
32 neuron
  ↓
Output
```

Model kedua lebih kompleks.

Namun model yang lebih kompleks tidak otomatis lebih baik.

Jika dataset kecil, model yang terlalu kompleks dapat lebih mudah mengalami overfitting.

---

## Learning Rate

**Learning rate** merupakan salah satu hyperparameter penting dalam proses optimasi Neural Network.

Secara sederhana, learning rate menentukan seberapa besar langkah perubahan parameter model ketika melakukan proses optimasi.

Jika terlalu kecil:

```text
Training
   ↓
Perubahan sangat kecil
   ↓
Training sangat lama
```

Jika terlalu besar:

```text
Training
   ↓
Perubahan terlalu besar
   ↓
Sulit mencapai solusi yang baik
```

Kita ingin menemukan learning rate yang sesuai.

Contoh:

```text
0.1
0.01
0.001
0.0001
```

Nilai yang tepat sangat bergantung pada model dan dataset.

---

## Epoch

Epoch menunjukkan berapa kali model melakukan satu kali proses pembelajaran terhadap seluruh training dataset.

Misalnya:

```text
Dataset Training
      ↓
Epoch 1
      ↓
Epoch 2
      ↓
Epoch 3
      ↓
...
```

Jika menggunakan:

```python
epochs = 10
```

model akan melakukan training selama 10 epoch.

Terlalu sedikit epoch dapat menyebabkan model belum belajar dengan cukup.

Terlalu banyak epoch dapat menyebabkan model mengalami overfitting.

---

## Batch Size

Batch size menentukan berapa banyak sample yang diproses sebelum model melakukan satu langkah update parameter.

Misalnya dataset memiliki 1.000 sample.

Dengan:

```text
batch_size = 100
```

satu epoch membutuhkan sekitar:

```text
1000 / 100 = 10 batch
```

Contoh:

```text
Batch 1 → 100 data
Batch 2 → 100 data
Batch 3 → 100 data
...
Batch 10 → 100 data
```

---

## Tuning Menggunakan Validation Set

Idealnya, proses tuning tidak dilakukan berdasarkan Test Set.

Workflow yang lebih tepat:

```text
Dataset
   ↓
Training Set
Validation Set
Test Set
```

Kemudian:

```text
Training Set
     ↓
Training
     ↓
Model
     ↓
Validation Set
     ↓
Evaluation
     ↓
Tuning
     ↓
Training ulang
```

Test Set disimpan untuk evaluasi final.

---

## Mengapa Tidak Tuning Menggunakan Test Set?

Misalnya kita mencoba beberapa konfigurasi:

```text
Model 1 → Test Accuracy = 82%
Model 2 → Test Accuracy = 85%
Model 3 → Test Accuracy = 88%
Model 4 → Test Accuracy = 90%
```

Jika kita terus memilih model berdasarkan Test Set, maka informasi Test Set secara tidak langsung memengaruhi keputusan pengembangan model.

Akibatnya, Test Set tidak lagi benar-benar menjadi data yang independen untuk evaluasi akhir.

Lebih baik:

```text
Training Set
    ↓
Training

Validation Set
    ↓
Tuning & Model Selection

Test Set
    ↓
Final Evaluation
```

---

## Jika Tidak Memiliki Validation Set

Pada dataset tertentu, terutama ketika dataset relatif kecil, kita dapat menggunakan **Cross-Validation**.

Contohnya menggunakan K-Fold Cross-Validation:

```text
Dataset
├── Fold 1
├── Fold 2
├── Fold 3
├── Fold 4
└── Fold 5
```

Model dilatih dan dievaluasi beberapa kali menggunakan kombinasi fold yang berbeda.

Contohnya:

```text
Round 1:
Train → Fold 2, 3, 4, 5
Valid → Fold 1

Round 2:
Train → Fold 1, 3, 4, 5
Valid → Fold 2

Round 3:
Train → Fold 1, 2, 4, 5
Valid → Fold 3
```

Kemudian hasilnya dirata-ratakan.

---

## Hyperparameter Tuning dengan Grid Search

Scikit-learn menyediakan beberapa tools untuk membantu melakukan tuning.

Salah satunya adalah `GridSearchCV`.

Misalnya kita ingin menguji beberapa kombinasi Random Forest:

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV

model = RandomForestClassifier(
    random_state=42
)

param_grid = {
    "n_estimators": [100, 200],
    "max_depth": [None, 10, 20],
    "min_samples_split": [2, 5]
}
```

Kemudian:

```python
grid_search = GridSearchCV(
    estimator=model,
    param_grid=param_grid,
    cv=5,
    scoring="accuracy",
    n_jobs=-1
)

grid_search.fit(X_train, y_train)
```

Setelah selesai:

```python
print(grid_search.best_params_)
```

Untuk melihat score terbaik:

```python
print(grid_search.best_score_)
```

Model terbaik:

```python
best_model = grid_search.best_estimator_
```

---

## Bagaimana Grid Search Bekerja?

Misalnya kita memiliki:

```python
"n_estimators": [100, 200]
"max_depth": [10, 20]
```

Maka kombinasi yang dicoba adalah:

```text
100 trees + depth 10
100 trees + depth 20
200 trees + depth 10
200 trees + depth 20
```

Jika menggunakan `cv=5`, setiap konfigurasi akan dievaluasi menggunakan 5-fold cross-validation.

Artinya jumlah training yang dilakukan dapat menjadi cukup besar.

---

## Kelemahan Grid Search

Grid Search dapat menjadi mahal secara komputasi jika jumlah hyperparameter dan kandidat nilainya banyak.

Misalnya:

```text
5 n_estimators
×
5 max_depth
×
4 min_samples_split
×
3 max_features
```

Jumlah kombinasi:

```text
5 × 5 × 4 × 3 = 300 kombinasi
```

Jika:

```text
cv = 5
```

maka dapat terjadi:

```text
300 × 5 = 1.500 training
```

Belum termasuk proses training ulang atau eksperimen lainnya.

Karena itu, Grid Search sebaiknya digunakan secara terkontrol.

---

## Randomized Search

Alternatifnya adalah **RandomizedSearchCV**.

Daripada mencoba seluruh kombinasi, Random Search memilih sejumlah kombinasi secara acak dari ruang pencarian.

Contoh:

```python
from sklearn.model_selection import RandomizedSearchCV

random_search = RandomizedSearchCV(
    estimator=model,
    param_distributions=param_grid,
    n_iter=20,
    cv=5,
    scoring="accuracy",
    random_state=42,
    n_jobs=-1
)

random_search.fit(X_train, y_train)
```

Parameter:

```python
n_iter=20
```

berarti hanya mencoba sekitar 20 konfigurasi yang dipilih dari ruang pencarian.

---

## Grid Search vs Random Search

| Aspek | Grid Search | Random Search |
|---|---|---|
| Strategi | Semua kombinasi | Kombinasi acak |
| Jumlah eksperimen | Dapat sangat besar | Dapat dibatasi |
| Kontrol | Sangat terstruktur | Lebih fleksibel |
| Cocok untuk | Ruang pencarian kecil | Ruang pencarian besar |
| Komputasi | Bisa mahal | Biasanya lebih efisien |

Secara umum:

```text
Search Space kecil
      ↓
Grid Search
```

Sedangkan:

```text
Search Space besar
      ↓
Random Search
```

---

## Jangan Tuning Semua Hyperparameter Sekaligus

Kesalahan umum adalah langsung melakukan tuning terhadap terlalu banyak hyperparameter.

Misalnya:

```text
n_estimators
max_depth
min_samples_split
min_samples_leaf
max_features
max_samples
bootstrap
criterion
...
```

Jika setiap parameter memiliki banyak kandidat, jumlah kombinasi dapat meningkat dengan sangat cepat.

Lebih baik memulai dari beberapa hyperparameter yang paling relevan.

Contoh:

```python
param_grid = {
    "n_estimators": [100, 200],
    "max_depth": [10, 20, None]
}
```

Setelah mendapatkan hasil yang masuk akal, kita dapat melakukan eksperimen lanjutan.

---

## Tuning Secara Bertahap

Pendekatan yang praktis:

```text
Default Model
      ↓
Baseline
      ↓
Identifikasi hyperparameter penting
      ↓
Tuning sederhana
      ↓
Evaluasi
      ↓
Persempit search space
      ↓
Tuning lanjutan
      ↓
Final Model
```

Contohnya:

### Tahap 1

```text
n_estimators:
100, 200, 300
```

### Tahap 2

Setelah mendapatkan hasil terbaik di sekitar 200:

```text
n_estimators:
150, 200, 250
```

Dengan cara tersebut, kita dapat mempersempit ruang pencarian.

---

## Tuning dan Overfitting

Tuning juga dapat menyebabkan overfitting jika dilakukan secara tidak hati-hati.

Misalnya kita melakukan banyak eksperimen terhadap validation set:

```text
Experiment 1 → Validation
Experiment 2 → Validation
Experiment 3 → Validation
...
Experiment 100 → Validation
```

Semakin sering kita mengambil keputusan berdasarkan validation set, semakin besar kemungkinan kita secara tidak langsung menyesuaikan model terhadap karakteristik validation set.

Karena itu, Test Set tetap harus disimpan dan hanya digunakan untuk evaluasi akhir.

---

## Contoh Lengkap Model Tuning

Berikut contoh sederhana menggunakan Random Forest dan Grid Search.

### Import Library

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import accuracy_score
```

### Membagi Dataset

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)
```

Pada contoh ini kita menggunakan cross-validation pada training data untuk memilih hyperparameter.

### Membuat Model

```python
model = RandomForestClassifier(
    random_state=42
)
```

### Menentukan Search Space

```python
param_grid = {
    "n_estimators": [100, 200],
    "max_depth": [None, 10, 20],
    "min_samples_split": [2, 5]
}
```

### Membuat Grid Search

```python
grid_search = GridSearchCV(
    estimator=model,
    param_grid=param_grid,
    cv=5,
    scoring="accuracy",
    n_jobs=-1
)
```

### Training

```python
grid_search.fit(
    X_train,
    y_train
)
```

### Melihat Hyperparameter Terbaik

```python
print("Best Parameters:")
print(grid_search.best_params_)
```

### Melihat Validation Score Terbaik

```python
print("Best CV Score:")
print(grid_search.best_score_)
```

### Mendapatkan Model Terbaik

```python
best_model = grid_search.best_estimator_
```

### Evaluasi pada Test Set

```python
test_predictions = best_model.predict(X_test)

test_accuracy = accuracy_score(
    y_test,
    test_predictions
)

print(f"Test Accuracy: {test_accuracy:.2%}")
```

Perhatikan bahwa Test Set baru digunakan setelah proses pemilihan hyperparameter selesai.

---

## Membandingkan Baseline dengan Tuned Model

Setelah tuning selesai, kita dapat membandingkan model awal dengan model hasil tuning.

Misalnya:

```text
Baseline Model
Accuracy = 84%

Tuned Model
Accuracy = 89%
```

Maka tuning memberikan peningkatan:

```text
89% - 84% = 5 percentage points
```

Namun jangan hanya melihat peningkatan score.

Pertimbangkan juga:

```text
Accuracy
Precision
Recall
F1 Score
Training Time
Prediction Time
Model Size
Complexity
```

Metric yang digunakan harus sesuai dengan masalah yang sedang diselesaikan.

---

## Tuning Bukan Jaminan Performa Meningkat

Penting untuk dipahami bahwa tuning tidak selalu menghasilkan peningkatan performa.

Contohnya:

```text
Baseline
Accuracy = 89%

Tuned Model
Accuracy = 89%
```

Hal tersebut bukan berarti tuning gagal.

Bisa saja model default memang sudah memberikan konfigurasi yang sangat baik untuk dataset tersebut.

Tuning juga dapat menghasilkan model yang:

```text
lebih lambat
lebih kompleks
lebih besar
```

tanpa peningkatan performa yang berarti.

Dalam kondisi tersebut, model baseline mungkin justru lebih baik secara praktis.

---

## Model Tuning sebagai Eksperimen

Jangan melihat tuning sebagai:

```text
"Tuning = menaikkan accuracy"
```

Lebih tepat melihatnya sebagai:

```text
Tuning
  ↓
Eksperimen
  ↓
Menguji konfigurasi
  ↓
Mengukur performa
  ↓
Menganalisis hasil
  ↓
Memilih konfigurasi
```

Setiap eksperimen harus memiliki tujuan yang jelas.

Misalnya:

```text
Hipotesis:
Menambah jumlah tree dari 100 menjadi 300
akan meningkatkan stabilitas model.
```

Kemudian kita menguji:

```text
100 trees → 85%
200 trees → 87%
300 trees → 87%
```

Kesimpulannya:

```text
Peningkatan berhenti sekitar 200 trees.
```

Ini jauh lebih baik daripada sekadar mencoba angka secara acak tanpa mencatat hasil.

---

## Prinsip Eksperimen yang Baik

Saat melakukan tuning:

### 1. Catat Setiap Eksperimen

Contohnya:

| Experiment | n_estimators | max_depth | Score |
|---|---:|---:|---:|
| A | 100 | None | 84% |
| B | 200 | None | 87% |
| C | 300 | None | 87% |
| D | 200 | 10 | 88% |

Dengan catatan seperti ini, kita dapat memahami perkembangan eksperimen.

### 2. Gunakan Random State

Untuk eksperimen yang dapat dipengaruhi oleh randomization:

```python
random_state=42
```

Hal ini membantu menghasilkan eksperimen yang lebih reproducible.

### 3. Gunakan Validation atau Cross-Validation

Jangan menjadikan Test Set sebagai tempat mencoba semua konfigurasi.

### 4. Jangan Mencari Hyperparameter Secara Buta

Gunakan pemahaman tentang algoritma untuk menentukan search space.

### 5. Perhatikan Biaya Komputasi

Search space yang terlalu besar dapat menyebabkan training menjadi sangat lama.

---

## Workflow Model Tuning

Workflow yang dapat digunakan:

```text
Dataset
   ↓
Problem Definition
   ↓
Preprocessing
   ↓
Train / Validation / Test
   ↓
Baseline Model
   ↓
Evaluate
   ↓
Tentukan Hyperparameter
   ↓
Tuning
   ↓
Cross-Validation
   ↓
Pilih Konfigurasi Terbaik
   ↓
Final Model
   ↓
Test Set
   ↓
Final Evaluation
```

Jika hasil belum memuaskan:

```text
Final Evaluation
      ↓
Belum cukup baik
      ↓
Analisis masalah
      ↓
Perbaiki data / fitur / model
      ↓
Eksperimen kembali
```

---

## Kesalahan Umum Saat Model Tuning

### Menggunakan Test Set Berulang Kali

Salah:

```text
Training
  ↓
Test
  ↓
Tuning
  ↓
Test
  ↓
Tuning
  ↓
Test
```

Lebih baik:

```text
Training
  ↓
Validation / Cross-Validation
  ↓
Tuning
  ↓
Final Model
  ↓
Test sekali untuk evaluasi akhir
```

### Menganggap Hyperparameter Semakin Besar Semakin Baik

Contohnya:

```text
n_estimators = 100
```

tidak otomatis lebih buruk daripada:

```text
n_estimators = 1000
```

Nilai yang lebih besar juga dapat meningkatkan waktu dan penggunaan resource.

### Menggunakan Search Space Terlalu Besar

Search space yang terlalu besar dapat membuat eksperimen sangat mahal.

### Hanya Mengejar Satu Metric

Accuracy yang tinggi belum tentu berarti model lebih baik.

Gunakan metric yang sesuai dengan problem.

---

## Checklist Model Tuning

Sebelum menyelesaikan tahap tuning, pastikan:

- [ ] Sudah memahami perbedaan parameter dan hyperparameter
- [ ] Sudah memiliki baseline model
- [ ] Sudah mengetahui hyperparameter yang relevan
- [ ] Sudah menentukan metric evaluasi
- [ ] Tuning dilakukan menggunakan validation atau cross-validation
- [ ] Test Set tidak digunakan untuk memilih hyperparameter
- [ ] Search space sudah ditentukan
- [ ] Eksperimen dicatat
- [ ] Random state digunakan jika diperlukan
- [ ] Biaya komputasi dipertimbangkan
- [ ] Baseline dibandingkan dengan tuned model
- [ ] Model terbaik diuji pada Test Set setelah proses tuning selesai

---

## Ringkasan

**Model Tuning** adalah proses menyesuaikan hyperparameter model untuk menemukan konfigurasi yang sesuai dengan dataset.

Perbedaan penting:

```text
Parameter
    ↓
Dipela­jari model selama training

Hyperparameter
    ↓
Ditentukan oleh kita
```

Contoh hyperparameter Random Forest:

```text
n_estimators
max_depth
min_samples_split
min_samples_leaf
max_features
```

Contoh hyperparameter Neural Network:

```text
learning rate
number of layers
number of neurons
batch size
epochs
dropout
optimizer
```

Proses tuning dapat dilakukan secara manual maupun menggunakan tools seperti:

```text
GridSearchCV
RandomizedSearchCV
```

Workflow yang baik:

```text
Baseline
   ↓
Training
   ↓
Validation / Cross-Validation
   ↓
Tuning
   ↓
Model Selection
   ↓
Final Model
   ↓
Test Set
```

Hal yang paling penting untuk diingat:

> **Model tuning bukan sekadar mencari angka hyperparameter terbesar, tetapi mencari konfigurasi yang memberikan keseimbangan antara performa, generalisasi, kompleksitas, dan biaya komputasi.**

Dengan memahami tuning, kita tidak hanya menggunakan model dengan pengaturan default, tetapi mulai melakukan **eksperimen Machine Learning secara sistematis**.

Pada materi berikutnya, kita akan membahas **Model Comparison**, yaitu bagaimana membandingkan beberapa model secara objektif dan menentukan model yang paling sesuai untuk suatu permasalahan.
