---
sidebar_position: 17
title: "Evaluasi Model: Score (Classification)"
---

Setelah model Machine Learning dilatih menggunakan `fit()` dan menghasilkan prediksi menggunakan `predict()`, langkah berikutnya adalah melakukan **evaluasi model**.

Evaluasi digunakan untuk mengetahui seberapa baik model bekerja terhadap data.

Secara sederhana, workflow Machine Learning dapat digambarkan sebagai:

```text
Data
  │
  ▼
Training
  │
  ▼
Model
  │
  ▼
Prediction
  │
  ▼
Evaluation
```

Evaluasi sangat penting karena model yang terlihat baik pada data training belum tentu dapat bekerja dengan baik pada data yang belum pernah dilihat sebelumnya.

---

## Mengapa Evaluasi Model Penting?

Bayangkan kita membuat model untuk memprediksi apakah seseorang memiliki suatu kondisi tertentu.

Model menghasilkan prediksi:

```text
Data → Model → Prediksi
```

Namun, kita tidak cukup hanya mengetahui bahwa model dapat menghasilkan prediksi.

Kita juga perlu mengetahui:

- Berapa banyak prediksi yang benar?
- Berapa banyak prediksi yang salah?
- Seberapa besar error model?
- Apakah model mampu bekerja pada data baru?
- Apakah model terlalu menyesuaikan diri dengan data training?
- Apakah terjadi data leakage?

Oleh karena itu, evaluasi merupakan bagian penting dari workflow Machine Learning.

---

## Training Performance dan Generalization

Ketika model dilatih, model mempelajari pola dari training set.

```text
Training Data
     │
     ▼
   Model
     │
     ▼
Learned Patterns
```

Setelah itu, model diuji menggunakan data yang tidak digunakan untuk fitting.

```text
Test Data
     │
     ▼
Trained Model
     │
     ▼
Prediction
     │
     ▼
Evaluation
```

Tujuannya adalah mengetahui kemampuan model dalam melakukan **generalization**, yaitu kemampuan untuk bekerja pada data baru yang belum digunakan ketika model dilatih.

---

## Tiga Pendekatan Evaluasi pada Scikit-Learn

Scikit-Learn menyediakan beberapa cara untuk melakukan evaluasi model.

Tiga pendekatan yang umum digunakan adalah:

1. Metode bawaan estimator menggunakan `.score()`
2. Parameter `scoring`
3. Fungsi metrik khusus dari `sklearn.metrics`

---

### 1. Metode Bawaan Estimator dengan `score()`

Banyak estimator Scikit-Learn menyediakan method:

```python
model.score(X, y)
```

Contohnya:

```python
clf.score(X_test, y_test)
```

Method tersebut memberikan nilai evaluasi berdasarkan definisi `score()` dari estimator yang digunakan.

Hal penting yang perlu dipahami:

> Arti `.score()` bergantung pada jenis estimator.

`.score()` bukan satu metrik universal yang selalu berarti hal yang sama.

---

### 2. Parameter `scoring`

Pendekatan kedua adalah menggunakan parameter `scoring`.

Parameter ini banyak digunakan dalam teknik evaluasi seperti:

- Cross-validation
- `cross_val_score()`
- `GridSearchCV`
- `RandomizedSearchCV`

Contohnya:

```python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(
    clf,
    X,
    y,
    cv=5,
    scoring="accuracy"
)

print(scores)
```

Dengan `scoring`, kita dapat menentukan metrik yang ingin digunakan.

Contohnya:

```text
accuracy
precision
recall
f1
roc_auc
neg_mean_absolute_error
r2
```

Nama scoring yang tersedia bergantung pada jenis problem dan estimator.

---

### 3. Fungsi Metrik dari `sklearn.metrics`

Scikit-Learn juga menyediakan fungsi evaluasi khusus melalui modul:

```python
sklearn.metrics
```

Contohnya:

```python
from sklearn.metrics import accuracy_score

accuracy = accuracy_score(y_test, y_preds)
```

Untuk regresi:

```python
from sklearn.metrics import mean_absolute_error

mae = mean_absolute_error(y_test, y_preds)
```

Beberapa metrik yang umum digunakan:

| Problem | Metrik |
|---|---|
| Classification | Accuracy |
| Classification | Precision |
| Classification | Recall |
| Classification | F1-Score |
| Classification | ROC-AUC |
| Regression | MAE |
| Regression | MSE |
| Regression | RMSE |
| Regression | R² |

Pendekatan ini memberikan kontrol yang lebih eksplisit terhadap metrik yang digunakan.

---

## Memahami `score()` pada Classification

Untuk banyak classifier di Scikit-Learn, `.score()` menggunakan **accuracy** sebagai default scoring.

Contohnya:

```python
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

clf.fit(X_train, y_train)

score = clf.score(X_test, y_test)

print(score)
```

Jika hasilnya:

```text
0.85
```

maka accuracy pada data tersebut adalah sekitar:

```text
85%
```

---

## Apa Itu Accuracy?

Accuracy mengukur proporsi prediksi yang benar dari seluruh prediksi.

Rumusnya:

$$
Accuracy = \frac{Jumlah\ Prediksi\ Benar}{Jumlah\ Seluruh\ Prediksi}
$$

Contohnya terdapat 100 data:

```text
Prediksi benar = 85
Total data     = 100
```

Maka:

$$
Accuracy = \frac{85}{100} = 0.85
$$

atau:

```text
85%
```

---

## Contoh `score()` pada Random Forest Classifier

Berikut contoh lengkap:

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

clf = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

clf.fit(X_train, y_train)

print("Score Training:", clf.score(X_train, y_train))
print("Score Test:", clf.score(X_test, y_test))
```

Hasilnya misalnya:

```text
Score Training: 1.0
Score Test: 0.85
```

Artinya:

```text
Training → 100%
Test     → 85%
```

Perbedaan antara training score dan test score perlu diperhatikan.

---

## Training Score vs Test Score

Kita dapat menghitung:

```python
train_score = clf.score(X_train, y_train)
test_score = clf.score(X_test, y_test)

print(f"Training Score: {train_score}")
print(f"Test Score: {test_score}")
```

Misalnya:

```text
Training Score: 1.0
Test Score: 0.85
```

Model mendapatkan performa sangat tinggi pada training data, tetapi lebih rendah pada test data.

Hal ini dapat menjadi indikasi bahwa model lebih mampu menyesuaikan diri dengan training data dibandingkan data baru.

Namun, perbedaan tersebut tidak otomatis berarti overfitting. Besarnya gap, kompleksitas model, variasi data, dan evaluasi tambahan perlu dipertimbangkan.

---

## Mengapa Training Score Bisa Sangat Tinggi?

Model dilatih menggunakan:

```python
X_train
y_train
```

Kemudian kita mengukur performanya pada data yang sama:

```python
clf.score(X_train, y_train)
```

Artinya model dievaluasi menggunakan data yang sebelumnya sudah digunakan dalam proses fitting.

Untuk model yang fleksibel seperti Random Forest, training score yang sangat tinggi bahkan dapat mencapai:

```text
1.0
```

Hal ini tidak otomatis menunjukkan bahwa model akan memiliki performa yang sama pada data baru.

---

## Test Score Lebih Penting untuk Generalisasi

Untuk mengetahui kemampuan model terhadap data yang tidak digunakan saat training, kita dapat menggunakan:

```python
clf.score(X_test, y_test)
```

Test set tidak digunakan untuk fitting model.

Secara konseptual:

```text
Training Data
     │
     ▼
   fit()
     │
     ▼
Trained Model
     │
     │
     ▼
  Test Data
     │
     ▼
 score()
```

Dengan demikian, test score dapat memberikan informasi mengenai performa model pada data yang belum digunakan untuk fitting.

---

## Apakah Score 1.0 Selalu Bagus?

Nilai `1.0` memang berarti skor sempurna **untuk metrik yang digunakan oleh estimator tersebut**.

Namun, kita tidak boleh langsung menyimpulkan bahwa model pasti bagus hanya karena memperoleh:

```text
Score = 1.0
```

Konteks data dan cara evaluasi tetap penting.

---

## Training Score 1.0

Misalnya:

```text
Training Score = 1.0
Test Score     = 0.85
```

Training score 1.0 dapat terjadi karena model sangat mampu menyesuaikan diri dengan training data.

Hal tersebut tidak otomatis menjadi masalah.

Namun, jika terdapat gap besar antara training dan test score, kita perlu menyelidiki kemungkinan:

- Overfitting
- Dataset terlalu kecil
- Model terlalu kompleks
- Perbedaan distribusi data
- Masalah pada preprocessing
- Data leakage

---

## Test Score 1.0

Jika mendapatkan:

```text
Test Score = 1.0
```

hasil tersebut perlu diperiksa secara hati-hati.

Bukan berarti skor 1.0 pasti menunjukkan kesalahan.

Namun, kita perlu memastikan bahwa:

- Test set benar-benar terpisah dari training process
- Tidak terjadi data leakage
- Tidak ada fitur yang secara tidak sengaja mengandung target
- Preprocessing dilakukan dengan benar
- Test set tidak memiliki duplikasi atau data yang sangat mirip dengan training set
- Dataset memang memungkinkan model memperoleh performa tersebut

---

## Apa Itu Data Leakage?

**Data leakage** terjadi ketika informasi yang seharusnya tidak tersedia bagi model pada saat prediksi ikut masuk ke proses pembelajaran atau pemilihan model.

Contoh sederhana:

```text
Target
  │
  ▼
Tidak sengaja masuk ke Feature
  │
  ▼
Model
  │
  ▼
Score sangat tinggi
```

Model dapat terlihat sangat bagus karena mendapatkan informasi yang seharusnya tidak tersedia.

Contoh lainnya adalah melakukan preprocessing tertentu menggunakan seluruh dataset sebelum train-test split.

Kurang tepat:

```python
scaler.fit_transform(X)
```

kemudian baru melakukan:

```python
train_test_split(...)
```

Workflow yang lebih aman adalah melakukan split terlebih dahulu, kemudian fitting preprocessing hanya pada training data.

Untuk workflow yang lebih kompleks, penggunaan `Pipeline` dapat membantu mengurangi risiko leakage.

---

## `score()` pada Regression

`.score()` tidak selalu berarti accuracy.

Pada banyak estimator regresi di Scikit-Learn, `.score()` menggunakan **R² (coefficient of determination)**.

Contohnya:

```python
from sklearn.ensemble import RandomForestRegressor

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

score = model.score(X_test, y_test)

print(score)
```

Pada `RandomForestRegressor`, nilai tersebut adalah:

```text
R²
```

---

## Memahami R²

R² mengukur seberapa baik model menjelaskan variasi target dibandingkan dengan baseline tertentu.

Secara umum:

```text
R² mendekati 1
```

menunjukkan performa yang lebih baik dalam menjelaskan variasi target.

Nilai R² dapat dituliskan sebagai:

$$
R^2 = 1 - \frac{SS_{res}}{SS_{tot}}
$$

Keterangan:

- `SSres` = residual sum of squares
- `SStot` = total sum of squares

Salah satu hal penting adalah bahwa R² **tidak selalu terbatas antara 0 dan 1** pada data evaluasi.

R² dapat bernilai negatif jika performa model lebih buruk daripada baseline tertentu yang digunakan dalam definisi R².

---

## Jangan Menyamakan Semua `score()`

Perhatikan perbedaan berikut:

```python
clf.score(X_test, y_test)
```

pada classifier tertentu dapat berarti:

```text
Accuracy
```

Sedangkan:

```python
model.score(X_test, y_test)
```

pada `RandomForestRegressor` berarti:

```text
R²
```

Jadi, kita harus mengetahui estimator yang digunakan sebelum menginterpretasikan `.score()`.

---

## `score()` vs Metrics Function

Misalnya kita memiliki classifier:

```python
clf.score(X_test, y_test)
```

Untuk banyak classifier, hasilnya adalah accuracy.

Kita juga dapat menghitung accuracy secara eksplisit:

```python
from sklearn.metrics import accuracy_score

y_preds = clf.predict(X_test)

accuracy = accuracy_score(
    y_test,
    y_preds
)

print(accuracy)
```

Keduanya dapat memberikan nilai yang sama ketika `.score()` estimator tersebut memang menggunakan accuracy.

Perbedaannya adalah:

```text
.score()
   │
   └── Metrik ditentukan oleh estimator

accuracy_score()
   │
   └── Metrik ditentukan secara eksplisit
```

---

## Mengapa Menggunakan Fungsi Metrik Secara Eksplisit?

Dalam banyak kasus, kita membutuhkan metrik yang lebih spesifik.

Misalnya pada classification:

```python
from sklearn.metrics import precision_score

precision = precision_score(
    y_test,
    y_preds
)
```

Kita juga dapat menghitung recall:

```python
from sklearn.metrics import recall_score

recall = recall_score(
    y_test,
    y_preds
)
```

Atau F1-score:

```python
from sklearn.metrics import f1_score

f1 = f1_score(
    y_test,
    y_preds
)
```

Hal ini penting karena accuracy saja tidak selalu cukup untuk menggambarkan performa classifier.

---

## Eksperimen dengan Hyperparameter

Performa model dapat dipengaruhi oleh hyperparameter.

Salah satu hyperparameter Random Forest adalah:

```python
n_estimators
```

Parameter tersebut menentukan jumlah decision tree dalam Random Forest.

Misalnya:

```python
RandomForestClassifier(
    n_estimators=10,
    random_state=42
)
```

atau:

```python
RandomForestClassifier(
    n_estimators=100,
    random_state=42
)
```

atau:

```python
RandomForestClassifier(
    n_estimators=500,
    random_state=42
)
```

---

## Menguji Beberapa `n_estimators`

Kita dapat melakukan eksperimen sederhana.

```python
from sklearn.ensemble import RandomForestClassifier

for n in [2, 10, 50, 100, 200, 500]:

    clf = RandomForestClassifier(
        n_estimators=n,
        random_state=42
    )

    clf.fit(X_train, y_train)

    train_score = clf.score(X_train, y_train)
    test_score = clf.score(X_test, y_test)

    print(
        f"n_estimators={n}, "
        f"train={train_score:.3f}, "
        f"test={test_score:.3f}"
    )
```

Contoh output:

```text
n_estimators=2, train=0.91, test=0.76
n_estimators=10, train=0.98, test=0.81
n_estimators=50, train=1.00, test=0.84
n_estimators=100, train=1.00, test=0.85
n_estimators=200, train=1.00, test=0.85
n_estimators=500, train=1.00, test=0.85
```

Angka di atas hanya contoh ilustrasi.

Hasil sebenarnya dapat berbeda tergantung:

- Dataset
- Pembagian data
- Random state
- Fitur
- Preprocessing
- Versi Scikit-Learn
- Hyperparameter lainnya

---

## Apa yang Terjadi Jika `n_estimators` Terlalu Kecil?

Misalnya:

```python
n_estimators=2
```

Random Forest hanya menggunakan sedikit decision tree.

Jumlah tree yang sedikit dapat menghasilkan prediksi yang lebih bervariasi dan performa yang kurang stabil dibandingkan konfigurasi tertentu dengan lebih banyak tree.

Namun, tidak berarti semakin banyak tree selalu membuat model semakin baik tanpa batas.

---

## Apakah Semakin Banyak Tree Selalu Lebih Baik?

Tidak selalu.

Menambah `n_estimators` dapat meningkatkan stabilitas ensemble sampai titik tertentu, tetapi:

- Waktu training dapat bertambah
- Penggunaan memori dapat bertambah
- Waktu prediksi dapat bertambah
- Peningkatan performa dapat semakin kecil

Contohnya:

```text
10 trees
   ↓
50 trees
   ↓
100 trees
   ↓
200 trees
   ↓
500 trees
```

Peningkatan performa mungkin semakin kecil setelah jumlah tree tertentu.

Karena itu, `n_estimators` sebaiknya diuji melalui eksperimen atau hyperparameter tuning, bukan dipilih hanya berdasarkan asumsi bahwa nilai yang lebih besar pasti lebih baik.

---

## Membandingkan Training dan Test Score

Salah satu eksperimen sederhana adalah melihat dua nilai sekaligus.

```python
train_score = clf.score(X_train, y_train)
test_score = clf.score(X_test, y_test)

print(f"Training Score: {train_score:.3f}")
print(f"Test Score: {test_score:.3f}")
```

Misalnya:

```text
Training Score: 1.000
Test Score: 0.850
```

Kita dapat melihat adanya perbedaan:

```text
Training → 100%
Test     → 85%
```

Perbedaan ini dapat menjadi bahan investigasi terhadap generalisasi model.

---

## Membandingkan Beberapa Model

Evaluasi juga dapat digunakan untuk membandingkan beberapa estimator.

Contohnya:

```python
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

models = {
    "Logistic Regression": LogisticRegression(max_iter=1000),
    "Random Forest": RandomForestClassifier(
        n_estimators=100,
        random_state=42
    )
}

for name, model in models.items():

    model.fit(X_train, y_train)

    score = model.score(X_test, y_test)

    print(f"{name}: {score:.3f}")
```

Hasilnya dapat digunakan sebagai bagian dari eksperimen model.

Namun, perbandingan model harus menggunakan dataset, split, preprocessing, dan metrik evaluasi yang konsisten agar perbandingan lebih bermakna.

---

## Jangan Hanya Melihat Satu Angka

Misalnya kita mendapatkan:

```text
Model A → Accuracy 90%
Model B → Accuracy 87%
```

Kita tidak selalu dapat langsung menyimpulkan bahwa Model A lebih sesuai untuk semua kebutuhan.

Kita perlu melihat konteks problem.

Pada classification, kita dapat melihat:

```text
Accuracy
Precision
Recall
F1-Score
Confusion Matrix
ROC-AUC
```

Sedangkan pada regression dapat digunakan:

```text
MAE
MSE
RMSE
R²
```

Pemilihan metrik harus disesuaikan dengan tujuan model.

---

## Contoh Workflow Evaluasi Classification

Workflow sederhana:

```text
Dataset
   │
   ▼
X dan y
   │
   ▼
Train-Test Split
   │
   ├───────────────┐
   ▼               ▼
Training Set     Test Set
   │               │
   ▼               │
Create Model       │
   │               │
   ▼               │
fit()              │
   │               │
   ▼               │
Trained Model      │
   │               │
   └───────┬───────┘
           ▼
       predict()
           │
           ▼
      y_predictions
           │
           ▼
       Evaluation
           │
     ┌─────┴─────┐
     ▼           ▼
   score()    Metrics
     │           │
     ▼           ▼
 Accuracy    Precision
             Recall
             F1
```

---

## Contoh Lengkap

Berikut contoh workflow classification menggunakan Random Forest.

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)
from sklearn.model_selection import train_test_split

# 1. Membagi data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# 2. Membuat model
clf = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

# 3. Melatih model
clf.fit(X_train, y_train)

# 4. Menghitung score
train_score = clf.score(X_train, y_train)
test_score = clf.score(X_test, y_test)

print(f"Training Score: {train_score:.3f}")
print(f"Test Score: {test_score:.3f}")

# 5. Membuat prediksi
y_preds = clf.predict(X_test)

# 6. Menghitung metrics
accuracy = accuracy_score(y_test, y_preds)
precision = precision_score(y_test, y_preds)
recall = recall_score(y_test, y_preds)
f1 = f1_score(y_test, y_preds)

print(f"Accuracy: {accuracy:.3f}")
print(f"Precision: {precision:.3f}")
print(f"Recall: {recall:.3f}")
print(f"F1-Score: {f1:.3f}")
```

Untuk klasifikasi multiclass, parameter seperti `average` mungkin perlu disesuaikan pada beberapa metrik seperti precision, recall, dan F1-score.

## Baca Juga

* https://scikit-learn.org/stable/modules/model_evaluation.html
