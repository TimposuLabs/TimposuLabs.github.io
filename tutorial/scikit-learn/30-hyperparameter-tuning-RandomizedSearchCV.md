---
sidebar_position: 31
title: "Hyperparameter Tuning dengan RandomizedSearchCV"
---

Pada materi sebelumnya, kita telah mempelajari **Hyperparameter Tuning by Hand**, yaitu mencoba beberapa kombinasi hyperparameter secara manual untuk mencari konfigurasi model yang memberikan performa terbaik.

Cara manual memang mudah dipahami, tetapi memiliki beberapa kekurangan:

- Membutuhkan banyak kode yang berulang.
- Sulit mencoba banyak kombinasi hyperparameter.
- Membutuhkan waktu jika jumlah kombinasi semakin banyak.
- Kita harus mengelola validation set secara manual.
- Evaluasi beberapa kombinasi model menjadi kurang efisien.

Scikit-Learn menyediakan solusi yang lebih otomatis melalui **RandomizedSearchCV**.

`RandomizedSearchCV` memungkinkan kita mencari kombinasi hyperparameter secara otomatis dengan:

1. Mengambil kombinasi hyperparameter secara acak.
2. Melatih model menggunakan kombinasi tersebut.
3. Melakukan cross-validation.
4. Membandingkan hasil setiap kombinasi.
5. Memilih kombinasi dengan skor terbaik.

---

## Apa Itu RandomizedSearchCV?

`RandomizedSearchCV` adalah metode hyperparameter tuning pada Scikit-Learn yang melakukan pencarian kombinasi hyperparameter secara **acak** dan mengevaluasinya menggunakan **cross-validation**.

![RandomizedSearchCV](/img/python/3.jpg)

Secara sederhana:

```text
Parameter Space
      │
      ▼
RandomizedSearchCV
      │
      ├── Random Combination 1
      ├── Random Combination 2
      ├── Random Combination 3
      ├── ...
      └── Random Combination N
              │
              ▼
       Cross-Validation
              │
              ▼
        Model Evaluation
              │
              ▼
        Best Parameters
```

Dengan pendekatan ini, kita tidak perlu mencoba semua kombinasi hyperparameter secara manual.

---

## RandomizedSearchCV vs Tuning Manual

Pada tuning manual, kita mungkin melakukan sesuatu seperti:

```python
model_1 = RandomForestClassifier(
    n_estimators=100,
    max_depth=10
)

model_2 = RandomForestClassifier(
    n_estimators=200,
    max_depth=10
)

model_3 = RandomForestClassifier(
    n_estimators=500,
    max_depth=20
)
```

Kemudian masing-masing model dilatih dan dievaluasi.

Jika jumlah hyperparameter bertambah, jumlah kombinasi yang harus dicoba juga dapat meningkat dengan cepat.

Dengan `RandomizedSearchCV`, kita cukup menentukan ruang pencarian:

```python
grid = {
    "n_estimators": [100, 200, 500],
    "max_depth": [None, 10, 20],
}
```

Kemudian Scikit-Learn yang memilih kombinasi secara otomatis.

---

## Mengapa Menggunakan RandomizedSearchCV?

Ada beberapa alasan menggunakan `RandomizedSearchCV`.

### 1. Mengurangi kode manual

Kita tidak perlu membuat banyak model secara manual.

### 2. Dapat mencoba banyak hyperparameter

Kita dapat memberikan banyak kemungkinan nilai hyperparameter.

### 3. Menggunakan Cross-Validation

Setiap kombinasi dapat dievaluasi menggunakan beberapa fold sehingga evaluasi lebih terstruktur dibandingkan hanya menggunakan satu validation split.

### 4. Lebih efisien daripada mencoba seluruh kombinasi

Jika ruang pencarian sangat besar, kita dapat menentukan jumlah percobaan menggunakan `n_iter`.

Misalnya terdapat 1.000 kemungkinan kombinasi, tetapi kita hanya ingin mencoba 20 kombinasi secara acak.

```python
RandomizedSearchCV(
    estimator=model,
    param_distributions=grid,
    n_iter=20
)
```

Dengan demikian, kita tidak harus menjalankan seluruh 1.000 kombinasi.

---

## Dataset yang Digunakan

Pada contoh ini kita menggunakan dataset **Heart Disease** yang memiliki kolom target:

```text
target
```

Target digunakan untuk memprediksi apakah seseorang termasuk kelas tertentu berdasarkan fitur-fitur yang tersedia.

Sebelumnya dataset telah diacak:

```python
heart_disease_shuffled = heart_disease.sample(
    frac=1,
    random_state=42
)
```

Mengacak dataset membantu menghindari ketergantungan terhadap urutan data asli.

---

## Menyiapkan Feature dan Target

Pisahkan dataset menjadi:

- `X` → features
- `y` → target

```python
X = heart_disease_shuffled.drop(
    "target",
    axis=1
)

y = heart_disease_shuffled["target"]
```

Secara konseptual:

```text
Dataset
   │
   ├── Features (X)
   │     ├── age
   │     ├── sex
   │     ├── cp
   │     ├── trestbps
   │     └── ...
   │
   └── Target (y)
         └── target
```

---

## Membagi Data Menjadi Training dan Test Set

Berbeda dengan tuning manual, kita tidak perlu membuat validation set secara manual.

Kita cukup membagi data menjadi:

```text
Training Set
      │
      └── RandomizedSearchCV
              │
              └── Cross-Validation
                      
Test Set
      │
      └── Evaluasi final
```

Gunakan `train_test_split()`:

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

Pada contoh tersebut:

- `test_size=0.2` → 20% data digunakan sebagai test set.
- 80% data digunakan sebagai training set.
- `random_state=42` → membuat pembagian data dapat direproduksi.
- `stratify=y` → menjaga proporsi kelas pada training dan test set.

---

## Mengapa Tidak Membuat Validation Set Secara Manual?

Pada tuning manual kita sebelumnya menggunakan:

```text
Training Set
Validation Set
Test Set
```

Sedangkan dengan `RandomizedSearchCV`, struktur sederhananya menjadi:

```text
Training Data
     │
     ▼
RandomizedSearchCV
     │
     ├── Fold 1
     ├── Fold 2
     ├── Fold 3
     ├── Fold 4
     └── Fold 5
           │
           ▼
     Best Parameters
           │
           ▼
       Test Set
```

Cross-validation mengambil sebagian data training sebagai validation secara bergantian.

Dengan demikian, kita tidak perlu membuat validation set secara manual.

---

## Membuat Hyperparameter Grid

Langkah berikutnya adalah menentukan hyperparameter yang ingin dicoba.

Gunakan dictionary:

```python
grid = {
    "n_estimators": [10, 100, 200, 500, 1000, 1200],
    "max_depth": [None, 5, 10, 20, 30],
    "max_features": ["sqrt", "log2"],
    "min_samples_split": [2, 4, 6],
    "min_samples_leaf": [1, 2, 4]
}
```

> Catatan: Pada beberapa versi Scikit-Learn lama, contoh kursus dapat menggunakan `max_features="auto"`. Pada versi Scikit-Learn modern, pilihan `"auto"` tidak lagi digunakan untuk `RandomForestClassifier`, sehingga `"sqrt"` atau `"log2"` lebih aman digunakan.

---

## Memahami Hyperparameter yang Digunakan

### `n_estimators`

Menentukan jumlah decision tree yang digunakan oleh Random Forest.

Contoh:

```python
"n_estimators": [10, 100, 200, 500]
```

Semakin banyak tree:

- Model biasanya menjadi lebih stabil.
- Waktu training meningkat.
- Penggunaan resource meningkat.

---

### `max_depth`

Menentukan kedalaman maksimum setiap decision tree.

Contoh:

```python
"max_depth": [None, 5, 10, 20, 30]
```

`None` berarti tree dapat tumbuh sampai kondisi penghentian lainnya terpenuhi.

Kedalaman yang terlalu besar dapat membuat model menjadi terlalu kompleks.

---

### `max_features`

Menentukan jumlah atau jenis features yang dipertimbangkan ketika mencari split pada setiap node.

Contoh:

```python
"max_features": ["sqrt", "log2"]
```

Pengaturan ini membantu menciptakan variasi antar-tree pada Random Forest.

---

### `min_samples_split`

Menentukan jumlah minimum sample yang diperlukan agar sebuah node dapat di-split.

Contoh:

```python
"min_samples_split": [2, 4, 6]
```

Nilai lebih besar dapat membuat tree lebih sederhana.

---

### `min_samples_leaf`

Menentukan jumlah minimum sample yang harus terdapat pada leaf node.

Contoh:

```python
"min_samples_leaf": [1, 2, 4]
```

Nilai yang lebih besar dapat membantu mengurangi kompleksitas model.

---

## Menghitung Jumlah Kemungkinan Kombinasi

Kita dapat menghitung jumlah seluruh kombinasi hyperparameter.

Misalnya:

```text
n_estimators  = 6 pilihan
max_depth     = 5 pilihan
max_features  = 2 pilihan
min_samples_split = 3 pilihan
min_samples_leaf  = 3 pilihan
```

Jumlah kombinasi:

```text
6 × 5 × 2 × 3 × 3
= 540 kombinasi
```

Jika menggunakan 5-fold cross-validation:

```text
540 × 5
= 2.700 fits
```

Artinya, Grid Search akan membutuhkan hingga 2.700 proses training.

Di sinilah `RandomizedSearchCV` menjadi menarik.

Kita dapat mengambil sebagian kombinasi secara acak.

---

## Membuat RandomForestClassifier

Import model:

```python
from sklearn.ensemble import RandomForestClassifier
```

Kemudian buat model:

```python
clf = RandomForestClassifier(
    n_jobs=1,
    random_state=42
)
```

### Apa Itu `n_jobs`?

`n_jobs` menentukan jumlah CPU core yang digunakan.

```python
n_jobs=1
```

Berarti menggunakan satu core.

Sedangkan:

```python
n_jobs=-1
```

berarti menggunakan seluruh CPU core yang tersedia.

Untuk proses tuning yang cukup berat, kita dapat menggunakan:

```python
clf = RandomForestClassifier(
    n_jobs=-1,
    random_state=42
)
```

Namun penggunaan seluruh core dapat meningkatkan beban CPU.

---

## Membuat RandomizedSearchCV

Import:

```python
from sklearn.model_selection import RandomizedSearchCV
```

Kemudian:

```python
rs_clf = RandomizedSearchCV(
    estimator=clf,
    param_distributions=grid,
    n_iter=10,
    cv=5,
    verbose=2,
    random_state=42,
    n_jobs=-1
)
```

Beberapa parameter penting:

| Parameter | Fungsi |
|---|---|
| `estimator` | Model yang akan dituning |
| `param_distributions` | Dictionary hyperparameter |
| `n_iter` | Jumlah kombinasi acak yang dicoba |
| `cv` | Jumlah fold cross-validation |
| `verbose` | Menampilkan proses training |
| `random_state` | Mengontrol pengacakan |
| `n_jobs` | Jumlah CPU core yang digunakan |

---

## Memahami `n_iter`

Parameter `n_iter` menentukan jumlah kombinasi hyperparameter yang akan dicoba.

Contoh:

```python
n_iter=10
```

berarti:

```text
10 kombinasi hyperparameter
```

Jika:

```python
n_iter=50
```

berarti:

```text
50 kombinasi hyperparameter
```

Semakin besar `n_iter`:

- semakin banyak kombinasi yang diuji,
- semakin lama proses,
- semakin besar kemungkinan menemukan konfigurasi yang baik.

Namun, lebih banyak percobaan tidak menjamin peningkatan performa yang besar.

---

## Memahami `cv`

Parameter:

```python
cv=5
```

berarti menggunakan **5-fold cross-validation**.

Misalnya sebuah kombinasi hyperparameter dipilih:

```text
Combination #1

Training data
     │
     ├── Fold 1 → Validation
     ├── Fold 2 → Validation
     ├── Fold 3 → Validation
     ├── Fold 4 → Validation
     └── Fold 5 → Validation
```

Setiap fold secara bergantian menjadi validation set.

Hasil akhirnya berupa rata-rata skor dari kelima fold.

---

## Menghitung Jumlah Fits

Misalnya:

```python
n_iter=10
cv=5
```

Maka secara sederhana:

```text
10 kombinasi × 5 fold
= 50 fits
```

Jika:

```python
n_iter=50
cv=5
```

maka:

```text
50 × 5
= 250 fits
```

Jika jumlah fits semakin besar, waktu training juga dapat meningkat.

---

## Melatih RandomizedSearchCV

Setelah objek dibuat, jalankan:

```python
rs_clf.fit(
    X_train,
    y_train
)
```

Pada tahap ini Scikit-Learn akan:

1. Mengambil kombinasi hyperparameter.
2. Membuat model.
3. Membagi training data berdasarkan cross-validation.
4. Melatih model pada setiap fold.
5. Menghitung skor.
6. Mengulangi proses untuk kombinasi lainnya.
7. Membandingkan hasil.
8. Menyimpan kombinasi terbaik.

Secara konseptual:

```text
X_train, y_train
       │
       ▼
RandomizedSearchCV
       │
       ├── Combination 1
       │      ├── Fold 1
       │      ├── Fold 2
       │      ├── Fold 3
       │      ├── Fold 4
       │      └── Fold 5
       │
       ├── Combination 2
       │      ├── Fold 1
       │      ├── ...
       │      └── Fold 5
       │
       ├── Combination 3
       │
       └── ...
              │
              ▼
       Best Hyperparameters
```

---

## Melihat Hyperparameter Terbaik

Setelah proses fitting selesai, gunakan:

```python
rs_clf.best_params_
```

Contoh hasil:

```python
{
    "n_estimators": 500,
    "min_samples_split": 2,
    "min_samples_leaf": 1,
    "max_features": "sqrt",
    "max_depth": 10
}
```

Hasil tersebut menunjukkan konfigurasi hyperparameter yang mendapatkan skor cross-validation terbaik dari kombinasi yang diuji.

> Hasil aktual dapat berbeda tergantung versi Scikit-Learn, pembagian data, `random_state`, dan konfigurasi komputer.

---

## Melihat Skor Terbaik

Gunakan:

```python
rs_clf.best_score_
```

Misalnya:

```text
0.84
```

Artinya skor rata-rata cross-validation terbaik yang diperoleh adalah sekitar `0.84`.

Karena kita menggunakan `RandomForestClassifier` dan tidak menentukan `scoring`, default scoring estimator digunakan.

Untuk `RandomForestClassifier`, `.score()` menggunakan **accuracy**.

---

## Mengapa `best_score_` Bukan Test Score?

Ini merupakan konsep penting.

```python
rs_clf.best_score_
```

merupakan skor terbaik dari proses **cross-validation pada training data**.

Sedangkan:

```python
rs_clf.score(X_test, y_test)
```

merupakan skor pada **test set** yang tidak digunakan dalam proses pencarian hyperparameter.

Strukturnya:

```text
Training Set
     │
     ▼
RandomizedSearchCV
     │
     ├── Cross-Validation
     │
     └── Best Parameters
              │
              ▼
         Best Model
              │
              ▼
Test Set ──────────────► Final Evaluation
```

Test set sebaiknya tetap disimpan untuk evaluasi final.

---

## Membuat Prediksi dengan Model Terbaik

Salah satu kelebihan `RandomizedSearchCV` adalah kita dapat menggunakan `.predict()` langsung:

```python
rs_y_preds = rs_clf.predict(X_test)
```

Secara default, `RandomizedSearchCV` menggunakan model dengan parameter terbaik untuk prediksi.

---

## Evaluasi Model

Jika sebelumnya telah membuat fungsi:

```python
def evaluate_preds(y_true, y_preds):
    accuracy = accuracy_score(y_true, y_preds)
    precision = precision_score(y_true, y_preds)
    recall = recall_score(y_true, y_preds)
    f1 = f1_score(y_true, y_preds)

    metric_dict = {
        "accuracy": round(accuracy, 2),
        "precision": round(precision, 2),
        "recall": round(recall, 2),
        "f1": round(f1, 2)
    }

    return metric_dict
```

kita dapat mengevaluasi model:

```python
rs_metrics = evaluate_preds(
    y_test,
    rs_y_preds
)

rs_metrics
```

Contoh hasil:

```python
{
    "accuracy": 0.82,
    "precision": 0.84,
    "recall": 0.80,
    "f1": 0.82
}
```

Nilai di atas hanya contoh.

---

## Evaluasi Menggunakan `.score()`

Cara lain:

```python
rs_clf.score(
    X_test,
    y_test
)
```

Untuk `RandomForestClassifier`, nilai tersebut merupakan accuracy.

Contoh:

```text
0.82
```

berarti sekitar 82% prediksi pada test set benar.

---

## Melihat Semua Hasil Eksperimen

`RandomizedSearchCV` menyimpan hasil pencarian pada:

```python
rs_clf.cv_results_
```

Data tersebut berbentuk dictionary yang dapat dikonversi menjadi DataFrame.

```python
import pandas as pd

results = pd.DataFrame(
    rs_clf.cv_results_
)

results.head()
```

Kita dapat melihat informasi seperti:

- parameter yang digunakan,
- waktu training,
- waktu scoring,
- skor setiap fold,
- mean test score,
- standard deviation,
- ranking hasil.

---

## Melihat Parameter dan Skor

Agar lebih mudah dibaca:

```python
results[
    [
        "params",
        "mean_test_score",
        "std_test_score",
        "rank_test_score"
    ]
].sort_values(
    "rank_test_score"
).head(10)
```

Contoh struktur hasil:

| params | mean_test_score | std_test_score | rank_test_score |
|---|---:|---:|---:|
| konfigurasi A | 0.84 | 0.04 | 1 |
| konfigurasi B | 0.83 | 0.05 | 2 |
| konfigurasi C | 0.82 | 0.04 | 3 |

`rank_test_score=1` menunjukkan konfigurasi dengan ranking terbaik berdasarkan scoring yang digunakan.

---

## RandomizedSearchCV Tidak Selalu Menemukan Global Best

Ini merupakan perbedaan penting dengan `GridSearchCV`.

Misalnya terdapat:

```text
500 kemungkinan kombinasi
```

dan kita menggunakan:

```python
n_iter=10
```

maka hanya 10 kombinasi yang dicoba.

Artinya:

```text
500 kombinasi
     │
     ├── Combination 1
     ├── Combination 2
     ├── ...
     ├── Combination 10
     │
     └── 490 kombinasi tidak dicoba
```

Maka `best_params_` adalah:

> kombinasi terbaik dari kombinasi yang dicoba.

Bukan jaminan bahwa kombinasi tersebut merupakan kombinasi terbaik dari seluruh ruang pencarian.

---

## RandomizedSearchCV vs GridSearchCV

Keduanya digunakan untuk hyperparameter tuning, tetapi memiliki pendekatan berbeda.

| Aspek | RandomizedSearchCV | GridSearchCV |
|---|---|---|
| Metode pencarian | Acak | Semua kombinasi |
| Jumlah eksperimen | Ditentukan `n_iter` | Semua kombinasi |
| Kecepatan pada grid besar | Biasanya lebih efisien | Dapat sangat lambat |
| Jaminan mencoba semua kombinasi | Tidak | Ya |
| Cocok untuk | Ruang pencarian besar | Ruang pencarian kecil |
| Parameter utama | `n_iter` | Tidak ada `n_iter` |

---

## Contoh Perbandingan Jumlah Eksperimen

Misalnya terdapat:

```text
540 kombinasi hyperparameter
```

Dengan `GridSearchCV`:

```text
540 kombinasi × 5 fold
= 2.700 fits
```

Dengan:

```python
RandomizedSearchCV(
    ...,
    n_iter=20,
    cv=5
)
```

maka:

```text
20 kombinasi × 5 fold
= 100 fits
```

Perbedaannya cukup besar.

```text
GridSearchCV
████████████████████████████████████████ 2700 fits

RandomizedSearchCV
██ 100 fits
```

Namun, `RandomizedSearchCV` tidak mengevaluasi seluruh kombinasi.

---

## Kapan Menggunakan RandomizedSearchCV?

`RandomizedSearchCV` sangat berguna ketika:

- jumlah hyperparameter banyak,
- jumlah kemungkinan kombinasi sangat besar,
- training model cukup mahal,
- ingin melakukan eksperimen lebih cepat,
- ingin mengeksplorasi ruang parameter yang luas.

Contohnya:

```python
RandomizedSearchCV(
    estimator=model,
    param_distributions=grid,
    n_iter=50,
    cv=5,
    random_state=42,
    n_jobs=-1
)
```

---

## Kapan Menggunakan GridSearchCV?

`GridSearchCV` dapat digunakan ketika:

- jumlah kombinasi relatif sedikit,
- kita ingin mengevaluasi semua kombinasi,
- ruang pencarian sudah dipersempit,
- kita ingin melakukan pencarian yang lebih sistematis.

Contoh:

```python
grid = {
    "n_estimators": [100, 200],
    "max_depth": [10, 20]
}
```

Jumlah kombinasi:

```text
2 × 2 = 4 kombinasi
```

Jika:

```python
cv=5
```

maka:

```text
4 × 5 = 20 fits
```

Ini masih relatif kecil.

---

## Strategi Dua Tahap

Dalam praktik, kita juga dapat menggunakan strategi:

```text
Tahap 1
RandomizedSearchCV
        │
        ▼
Eksplorasi ruang parameter
        │
        ▼
Parameter yang menjanjikan
        │
        ▼
Tahap 2
GridSearchCV
        │
        ▼
Pencarian lebih detail
```

Contohnya:

```text
RandomizedSearchCV
500 kemungkinan
      │
      ▼
20 kombinasi dicoba
      │
      ▼
Ditemukan area parameter yang baik
      │
      ▼
GridSearchCV
      │
      ▼
Pencarian lebih detail di sekitar area tersebut
```

Pendekatan ini dapat membantu mengurangi biaya komputasi dibandingkan langsung melakukan Grid Search pada ruang pencarian yang sangat besar.

---

## Full Code RandomizedSearchCV

Berikut contoh lengkap dari persiapan data hingga evaluasi.

```python
import pandas as pd

from sklearn.model_selection import (
    train_test_split,
    RandomizedSearchCV
)

from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)


# ==============================
# 1. Shuffle data
# ==============================

heart_disease_shuffled = heart_disease.sample(
    frac=1,
    random_state=42
)


# ==============================
# 2. Separate features and target
# ==============================

X = heart_disease_shuffled.drop(
    "target",
    axis=1
)

y = heart_disease_shuffled["target"]


# ==============================
# 3. Train-test split
# ==============================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# ==============================
# 4. Hyperparameter grid
# ==============================

grid = {
    "n_estimators": [10, 100, 200, 500, 1000, 1200],
    "max_depth": [None, 5, 10, 20, 30],
    "max_features": ["sqrt", "log2"],
    "min_samples_split": [2, 4, 6],
    "min_samples_leaf": [1, 2, 4]
}


# ==============================
# 5. Create model
# ==============================

clf = RandomForestClassifier(
    random_state=42,
    n_jobs=-1
)


# ==============================
# 6. Create RandomizedSearchCV
# ==============================

rs_clf = RandomizedSearchCV(
    estimator=clf,
    param_distributions=grid,
    n_iter=10,
    cv=5,
    verbose=2,
    random_state=42,
    n_jobs=-1
)


# ==============================
# 7. Fit RandomizedSearchCV
# ==============================

rs_clf.fit(
    X_train,
    y_train
)


# ==============================
# 8. Best hyperparameters
# ==============================

print("Best parameters:")
print(rs_clf.best_params_)


# ==============================
# 9. Best cross-validation score
# ==============================

print("Best CV score:")
print(rs_clf.best_score_)


# ==============================
# 10. Prediction
# ==============================

rs_y_preds = rs_clf.predict(
    X_test
)


# ==============================
# 11. Evaluation
# ==============================

rs_metrics = {
    "accuracy": accuracy_score(
        y_test,
        rs_y_preds
    ),
    "precision": precision_score(
        y_test,
        rs_y_preds
    ),
    "recall": recall_score(
        y_test,
        rs_y_preds
    ),
    "f1": f1_score(
        y_test,
        rs_y_preds
    )
}

print("Test metrics:")
print(rs_metrics)


# ==============================
# 12. View CV results
# ==============================

results = pd.DataFrame(
    rs_clf.cv_results_
)

print(
    results[
        [
            "params",
            "mean_test_score",
            "std_test_score",
            "rank_test_score"
        ]
    ].sort_values(
        "rank_test_score"
    ).head(10)
)
```

---

## Alur Kerja Lengkap

Workflow `RandomizedSearchCV` dapat diringkas menjadi:

```text
Dataset
   │
   ▼
Shuffle Data
   │
   ▼
Pisahkan X dan y
   │
   ▼
Train-Test Split
   │
   ├───────────────┐
   │               │
   ▼               ▼
X_train          X_test
y_train          y_test
   │               │
   ▼               │
RandomizedSearchCV │
   │               │
   ├── Random Combination
   │
   ├── Cross-Validation
   │
   ├── Evaluate
   │
   ├── Repeat
   │
   ▼
Best Parameters
   │
   ▼
Best Model
   │
   ▼
Prediction
   │
   ▼
X_test
   │
   ▼
Final Evaluation
```

---

## Hal yang Perlu Diperhatikan

### 1. Jangan menggunakan test set untuk tuning

Test set sebaiknya tidak digunakan untuk menentukan hyperparameter.

Gunakan:

```text
Training data
      ↓
RandomizedSearchCV
      ↓
Best parameters
```

Kemudian:

```text
Best model
    ↓
Test set
    ↓
Final evaluation
```

---

### 2. Gunakan `random_state`

Agar eksperimen dapat direproduksi:

```python
random_state=42
```

Sebaiknya digunakan pada:

```python
train_test_split()
```

dan:

```python
RandomizedSearchCV()
```

serta model jika estimator memiliki proses pengacakan:

```python
RandomForestClassifier(
    random_state=42
)
```

---

### 3. `n_iter` memengaruhi waktu training

Semakin besar:

```python
n_iter
```

semakin banyak kombinasi yang diuji.

Contoh:

```text
n_iter=10
→ 10 kombinasi

n_iter=50
→ 50 kombinasi

n_iter=100
→ 100 kombinasi
```

Jika:

```python
cv=5
```

maka jumlah fits secara sederhana menjadi:

```text
n_iter × cv
```

---

### 4. Jangan hanya melihat satu metrik

Untuk classification, jangan selalu hanya melihat accuracy.

Perhatikan juga:

- Precision
- Recall
- F1-score
- ROC-AUC
- Confusion Matrix

Pemilihan metric harus disesuaikan dengan tujuan problem.

---

## Menggunakan `scoring`

Secara default:

```python
RandomizedSearchCV(
    estimator=clf,
    param_distributions=grid,
    cv=5
)
```

akan menggunakan scoring default dari estimator.

Untuk `RandomForestClassifier`, default `.score()` adalah accuracy.

Namun kita dapat menentukan metric secara eksplisit:

```python
rs_clf = RandomizedSearchCV(
    estimator=clf,
    param_distributions=grid,
    n_iter=10,
    cv=5,
    scoring="f1",
    random_state=42,
    n_jobs=-1
)
```

Sekarang kombinasi hyperparameter terbaik dipilih berdasarkan F1-score.

Pilihan scoring dapat disesuaikan dengan tujuan penelitian.

Contoh:

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

atau:

```python
scoring="roc_auc"
```

---

## RandomizedSearchCV dan Data Leakage

Hyperparameter tuning harus dilakukan hanya menggunakan training data.

Struktur yang benar:

```text
Dataset
   │
   ├── Training Set
   │      │
   │      └── RandomizedSearchCV
   │
   └── Test Set
          │
          └── Evaluasi Final
```

Jangan melakukan:

```text
Dataset
   │
   └── RandomizedSearchCV
          │
          └── Test data ikut digunakan
```

Karena informasi dari test set dapat memengaruhi pemilihan model.

Untuk preprocessing seperti scaling atau encoding, gunakan `Pipeline` atau `ColumnTransformer` agar preprocessing dilakukan secara tepat di dalam proses cross-validation.

---

## Kelebihan RandomizedSearchCV

Beberapa kelebihan:

- Mengurangi kode manual.
- Dapat mencoba banyak kombinasi.
- Lebih efisien untuk ruang pencarian yang besar.
- Mendukung cross-validation.
- Menyimpan hasil eksperimen.
- Dapat menggunakan parallel processing.
- Dapat memilih metric menggunakan `scoring`.
- Menyediakan model dengan parameter terbaik.

---

## Kekurangan RandomizedSearchCV

RandomizedSearchCV juga memiliki beberapa keterbatasan:

- Tidak menjamin menemukan kombinasi terbaik dari seluruh ruang pencarian.
- Hasil bergantung pada kombinasi yang dipilih secara acak.
- Semakin besar `n_iter`, semakin lama proses.
- Cross-validation dapat membutuhkan resource komputasi cukup besar.
- Hyperparameter search tidak otomatis menjamin model menjadi lebih baik pada test set.

---

## Ringkasan Perbandingan Tiga Pendekatan

| Metode | Pencarian | Validation | Kelebihan |
|---|---|---|---|
| Manual | Manual | Manual | Mudah dipahami |
| RandomizedSearchCV | Acak | Cross-validation | Efisien untuk ruang besar |
| GridSearchCV | Semua kombinasi | Cross-validation | Sistematis dan menyeluruh |

Workflow pembelajaran:

```text
Tuning Manual
      │
      ▼
RandomizedSearchCV
      │
      ▼
GridSearchCV
```

---

## Checklist

Sebelum menggunakan `RandomizedSearchCV`, pastikan:

- [ ] Dataset sudah dibersihkan.
- [ ] Features dan target sudah dipisahkan.
- [ ] Training dan test set sudah dipisahkan.
- [ ] Test set tidak digunakan untuk tuning.
- [ ] Hyperparameter search space sudah ditentukan.
- [ ] `n_iter` sudah disesuaikan dengan resource.
- [ ] `cv` sudah ditentukan.
- [ ] `scoring` sudah sesuai dengan tujuan problem.
- [ ] `random_state` digunakan untuk reproducibility.
- [ ] `n_jobs` disesuaikan dengan kemampuan komputer.
- [ ] Hasil cross-validation dan test set dievaluasi secara terpisah.

---

## Kesimpulan

`RandomizedSearchCV` merupakan salah satu metode penting untuk melakukan **hyperparameter tuning secara otomatis** menggunakan Scikit-Learn.

Berbeda dengan tuning manual, kita tidak perlu mencoba satu per satu kombinasi hyperparameter.

Dengan:

```python
RandomizedSearchCV(
    estimator=clf,
    param_distributions=grid,
    n_iter=10,
    cv=5
)
```

Scikit-Learn akan:

1. Memilih kombinasi hyperparameter secara acak.
2. Menjalankan cross-validation.
3. Menghitung skor setiap kombinasi.
4. Membandingkan hasil eksperimen.
5. Menentukan kombinasi terbaik.
6. Menyediakan model terbaik untuk digunakan melakukan prediksi.

Konsep terpenting yang perlu diingat:

```text
RandomizedSearchCV
      │
      ├── Random Hyperparameter Search
      │
      ├── Cross-Validation
      │
      ├── Best Parameters
      │
      └── Best Model
```

`RandomizedSearchCV` sangat berguna ketika jumlah kombinasi hyperparameter sudah terlalu besar untuk dicoba secara manual atau menggunakan Grid Search secara menyeluruh.

---

## Pada Materi Berikutnya

Pada materi berikutnya kita akan mempelajari **Hyperparameter Tuning dengan GridSearchCV**.

Jika `RandomizedSearchCV` hanya mencoba sebagian kombinasi secara acak, `GridSearchCV` akan mencoba **seluruh kombinasi hyperparameter** yang telah kita tentukan.

Dengan demikian kita dapat memahami perbedaan:

```text
Manual Tuning
      ↓
RandomizedSearchCV
      ↓
GridSearchCV
```

hingga akhirnya dapat menentukan metode tuning yang sesuai dengan ukuran search space, kebutuhan eksperimen, dan resource komputasi.

## Referensi

* https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.RandomizedSearchCV.html
* https://www.analyticsvidhya.com/blog/2022/11/hyperparameter-tuning-using-randomized-search/
* https://scikit-learn.org/stable/modules/cross_validation.html
