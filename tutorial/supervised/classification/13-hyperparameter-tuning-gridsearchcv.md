---
sidebar_position: 14
title: "Hyperparameter Tuning dengan GridSearchCV"
---

Pada materi sebelumnya, kita telah mempelajari hyperparameter tuning menggunakan `RandomizedSearchCV` untuk Logistic Regression dan Random Forest.

Pada materi ini, kita akan menggunakan `GridSearchCV` untuk mencari kombinasi hyperparameter terbaik pada Logistic Regression. Pencarian dilakukan dengan mencoba seluruh kombinasi parameter yang ditentukan dalam *parameter grid*, kemudian mengevaluasi setiap kombinasi menggunakan *cross-validation*.

Tujuan pembelajaran:

- Memahami cara kerja `GridSearchCV`.
- Mengetahui perbedaan `GridSearchCV` dan `RandomizedSearchCV`.
- Membuat parameter grid untuk Logistic Regression.
- Melakukan pencarian hyperparameter menggunakan 5-fold cross-validation.
- Mengambil parameter terbaik dan mengevaluasi model pada test set.
- Memahami keterbatasan akurasi sebagai satu-satunya metrik evaluasi.

## 1. Memahami GridSearchCV

### 1.1 Apa Itu GridSearchCV?

`GridSearchCV` adalah fitur Scikit-Learn untuk melakukan pencarian menyeluruh (*exhaustive search*) terhadap kombinasi hyperparameter yang telah ditentukan.

Misalnya, kita ingin menguji Logistic Regression dengan beberapa nilai `C`. Daripada membuat dan melatih model satu per satu secara manual, kita dapat memberikan daftar nilai tersebut kepada `GridSearchCV`.

Scikit-Learn kemudian akan:

1. Membuat kombinasi parameter yang tersedia dalam grid.
2. Melatih dan mengevaluasi setiap kombinasi menggunakan cross-validation.
3. Menghitung skor rata-rata validasi untuk setiap kombinasi.
4. Memilih kombinasi dengan skor terbaik berdasarkan metrik yang digunakan.
5. Melatih ulang model terbaik pada seluruh data training secara default.

### 1.2 Perbedaan GridSearchCV dan RandomizedSearchCV

| Aspek | GridSearchCV | RandomizedSearchCV |
|---|---|---|
| Strategi pencarian | Mencoba semua kombinasi dalam grid | Mengambil sejumlah kombinasi dari ruang pencarian |
| Pengaturan jumlah kandidat | Ditentukan oleh isi `param_grid` | Ditentukan terutama oleh `n_iter` |
| Biaya komputasi | Dapat meningkat cepat ketika grid besar | Dapat dibatasi melalui jumlah iterasi |
| Penggunaan | Grid kecil dan pencarian terperinci | Pencarian awal atau ruang parameter besar |

Keduanya menggunakan cross-validation untuk mengevaluasi kandidat berdasarkan konfigurasi yang ditetapkan.

**Penting:** `GridSearchCV` tidak menjamin menemukan konfigurasi terbaik secara universal. Hasil terbaik hanya berlaku untuk ruang parameter, data, metrik, dan strategi validasi yang digunakan.

## 2. Memahami Parameter Logistic Regression

Sebelum membuat parameter grid, kita perlu memahami hyperparameter yang akan diuji.

### 2.1 Parameter C

`C` mengontrol kekuatan regularisasi dalam Logistic Regression Scikit-Learn.

Secara umum:

- Nilai `C` kecil menunjukkan regularisasi lebih kuat.
- Nilai `C` besar menunjukkan regularisasi lebih lemah.

Regularisasi membantu mengendalikan kompleksitas model. Nilai yang terlalu kecil dapat membatasi kemampuan model mempelajari pola, sedangkan nilai yang terlalu besar dapat mengurangi efek regularisasi.

Tidak ada satu nilai `C` yang selalu terbaik. Nilai yang sesuai harus ditemukan melalui eksperimen.

### 2.2 Parameter solver

`solver` menentukan algoritma optimasi yang digunakan untuk mempelajari parameter Logistic Regression.

Dalam materi ini, kita menggunakan:

```python
solver = "liblinear"
```

Solver tersebut sesuai untuk contoh klasifikasi biner dan mendukung regularisasi L1 maupun L2 pada konfigurasi yang kompatibel.

Untuk mempermudah eksperimen, kita membatasi pencarian pada satu solver terlebih dahulu. Dengan demikian, pencarian berfokus pada pengaruh nilai `C`.

## 3. Membuat Parameter Grid

Kita akan menggunakan NumPy untuk menghasilkan 30 nilai `C` yang tersebar secara logaritmik.

```python
import numpy as np

log_reg_grid = {
    "C": np.logspace(-4, 4, 30),
    "solver": ["liblinear"]
}
```

### 3.1 Memahami `np.logspace()`

Fungsi `np.logspace()` menghasilkan angka berdasarkan pangkat dengan rentang eksponen tertentu.

Pada contoh ini:

```python
np.logspace(-4, 4, 30)
```

Artinya:

- Nilai awal berada pada skala \(10^{-4}\).
- Nilai akhir berada pada skala \(10^4\).
- Terdapat 30 nilai yang tersebar secara logaritmik.

Penyebaran logaritmik berguna ketika kita ingin menguji nilai hyperparameter pada rentang yang sangat lebar.

### 3.2 Memeriksa Parameter Grid

```python
print("Jumlah nilai C:", len(log_reg_grid["C"]))
print("Pilihan solver:", log_reg_grid["solver"])

print("\nNilai C:")
print(log_reg_grid["C"])
```

Karena terdapat 30 nilai `C` dan satu pilihan solver, total kombinasi yang diuji adalah:

$$
30 \times 1 = 30
$$

kombinasi hyperparameter.

## 4. Menginisialisasi GridSearchCV

Setelah membuat parameter grid, kita dapat membuat objek `GridSearchCV`.

```python
from sklearn.model_selection import GridSearchCV
from sklearn.linear_model import LogisticRegression

gs_log_reg = GridSearchCV(
    estimator=LogisticRegression(
        max_iter=2000,
        random_state=42
    ),
    param_grid=log_reg_grid,
    cv=5,
    scoring="accuracy",
    verbose=1,
    n_jobs=-1
)
```

Penjelasan parameter:

| Parameter | Fungsi |
|---|---|
| `estimator` | Model yang akan dioptimalkan |
| `param_grid` | Dictionary berisi hyperparameter yang diuji |
| `cv=5` | Menggunakan lima fold cross-validation |
| `scoring="accuracy"` | Menggunakan akurasi sebagai metrik pemilihan model |
| `verbose=1` | Menampilkan informasi kemajuan proses pencarian |
| `n_jobs=-1` | Menggunakan seluruh core CPU yang tersedia menurut konfigurasi joblib |

Kita menggunakan `max_iter=2000` agar proses optimasi memiliki batas iterasi yang memadai. Ini tidak menjamin konvergensi, sehingga peringatan konvergensi tetap harus diperiksa jika muncul.

## 5. Memahami 5-Fold Cross-Validation

Pada `cv=5`, data training dibagi menjadi lima bagian.

Setiap putaran menggunakan:

- Empat fold untuk pelatihan.
- Satu fold untuk validasi.

Proses diulang lima kali sehingga setiap fold pernah menjadi bagian validasi.

Jika parameter grid memiliki 30 kombinasi, jumlah pelatihan fold untuk mengevaluasi seluruh kandidat adalah:

$$
30 \times 5 = 150
$$

Artinya, terdapat 150 proses pelatihan untuk evaluasi kandidat. Secara default, `GridSearchCV` juga melakukan satu pelatihan ulang menggunakan seluruh data training dengan kombinasi terbaik setelah pencarian selesai.

Jumlah tersebut tidak termasuk pelatihan model lain di luar pencarian ini.

### 5.1 Mengapa Menggunakan Cross-Validation?

Jika kita hanya mengandalkan satu pembagian training dan validation, skor model dapat dipengaruhi oleh sampel yang kebetulan masuk ke bagian validasi.

Cross-validation memberikan beberapa pengukuran performa pada pembagian data yang berbeda, kemudian merangkumnya menjadi skor rata-rata.

Namun, cross-validation bukan jaminan bahwa model bebas overfitting. Test set tetap diperlukan untuk evaluasi akhir yang independen.

## 6. Melatih GridSearchCV

Setelah objek pencarian dibuat, jalankan `fit()` menggunakan data training.

```python
gs_log_reg.fit(X_train, y_train)
```

Pada tahap ini, Scikit-Learn akan mengevaluasi setiap kombinasi parameter menggunakan cross-validation.

**Jangan memasukkan `X_test` atau `y_test` ke dalam proses pencarian.** Test set harus tetap disimpan untuk evaluasi akhir setelah pemilihan model selesai.

## 7. Menampilkan Parameter Terbaik

Setelah proses pencarian selesai, kita dapat mengambil kombinasi parameter terbaik menggunakan atribut `best_params_`.

```python
print(gs_log_reg.best_params_)
```

Contoh format output:

```text
{'C': 0.2..., 'solver': 'liblinear'}
```

Nilai di atas hanya ilustrasi format output. Hasil aktual ditentukan oleh eksperimen.

Atribut penting lainnya:

| Atribut | Fungsi |
|---|---|
| `best_params_` | Kombinasi hyperparameter terbaik |
| `best_score_` | Skor rata-rata cross-validation terbaik |
| `best_estimator_` | Estimator terbaik yang telah dilatih ulang pada seluruh training set secara default |
| `cv_results_` | Detail hasil evaluasi setiap kandidat parameter |

Untuk melihat skor validasi terbaik:

```python
print("Best CV accuracy:", gs_log_reg.best_score_)
```

Perlu dibedakan bahwa `best_score_` adalah skor cross-validation, bukan akurasi test set.

## 8. Mengevaluasi Model pada Test Set

Setelah pencarian selesai, kita dapat mengukur akurasi model terbaik pada data test.

```python
test_accuracy = gs_log_reg.score(X_test, y_test)

print("Test accuracy:", round(test_accuracy, 4))
print("Test accuracy (%):", round(test_accuracy * 100, 2), "%")
```

Metode `score()` pada classifier Scikit-Learn yang digunakan di sini menghasilkan akurasi.

Dalam ringkasan video kursus, Logistic Regression dilaporkan menghasilkan akurasi sekitar 88,5%. Hasil ini relatif setara dengan hasil eksperimen sebelumnya.

Angka tersebut merupakan hasil yang dilaporkan dalam materi kursus, bukan hasil yang dijamin oleh kode ini. Akurasi aktual dapat berbeda karena versi dataset, pembagian data, preprocessing, versi Scikit-Learn, dan konfigurasi model.

### 8.1 Membandingkan Hasil dengan Baseline

Untuk mengetahui apakah tuning memberikan peningkatan, bandingkan hasil model yang sudah dioptimalkan dengan baseline yang dievaluasi menggunakan test set yang sama.

Misalnya:

| Model | Test Accuracy |
|---|---:|
| Logistic Regression baseline | 88,5% |
| Logistic Regression setelah tuning | 88,5% |

Angka di atas merupakan ilustrasi berdasarkan skenario kursus.

Jika akurasi tidak berubah, hal itu tidak berarti proses tuning gagal. Bisa jadi konfigurasi default sudah kompetitif, atau perubahan parameter tidak cukup memengaruhi keputusan prediksi pada sampel test set.

Bandingkan pula skor cross-validation agar keputusan tidak hanya didasarkan pada satu hasil pengujian.

## 9. Praktik Baik dalam Eksperimen

### 9.1 Hindari Data Leakage

Jika preprocessing seperti scaling diperlukan, masukkan preprocessing dan model ke dalam `Pipeline`, kemudian lakukan pencarian parameter terhadap pipeline tersebut.

Dengan demikian, scaler dipelajari dari bagian training pada setiap fold, bukan dari seluruh dataset sebelum cross-validation.

Logistic Regression sering memperoleh manfaat dari standardisasi fitur. Contoh pada bagian sebelumnya tidak menggunakan scaler agar tetap dekat dengan alur materi kursus; untuk eksperimen yang lebih kuat, pipeline dengan `StandardScaler` dapat digunakan.

### 9.2 Jangan Hanya Mengandalkan Akurasi

Akurasi menunjukkan proporsi prediksi yang benar, tetapi tidak menjelaskan semua jenis kesalahan model.

Untuk klasifikasi penyakit jantung, periksa juga:

- **Precision:** Ketepatan prediksi positif.
- **Recall:** Proporsi sampel positif yang berhasil ditemukan.
- **F1-score:** Ringkasan precision dan recall.
- **Confusion matrix:** Jumlah prediksi benar dan salah pada setiap kelas.
- **ROC-AUC:** Kemampuan pemeringkatan kelas berdasarkan skor probabilitas.

Metrik utama harus ditentukan sesuai tujuan penelitian. Dalam konteks medis, false negative perlu dianalisis secara khusus, dan prediksi model tidak boleh diperlakukan sebagai diagnosis klinis.

### 9.3 Memahami Batasan Grid Search

GridSearchCV hanya menguji kombinasi yang tercantum dalam parameter grid.

Jika kombinasi terbaik berada di batas ruang pencarian, kita dapat mempertimbangkan untuk memperluas atau menggeser rentang parameter. Namun, perubahan tersebut harus didasarkan pada hasil validasi dan bukan sekadar mengejar skor test set yang lebih tinggi.

Grid yang terlalu besar juga dapat menghabiskan waktu dan sumber daya komputasi tanpa peningkatan performa yang berarti.

## 10. Contoh Kode Lengkap: GridSearchCV untuk Logistic Regression

Kode berikut menggabungkan pembacaan dataset, pembagian data, pencarian hyperparameter, pemeriksaan hasil validasi silang, evaluasi test set, classification report, dan confusion matrix.

Pastikan file `heart-disease.csv` berada di direktori kerja notebook dan memiliki kolom target bernama `target`.

```python
# ============================================================
# 1. IMPORT LIBRARIES
# ============================================================

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import (
    train_test_split,
    GridSearchCV,
    StratifiedKFold
)

from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    ConfusionMatrixDisplay,
    roc_auc_score,
    RocCurveDisplay
)


# ============================================================
# 2. LOAD DATASET
# ============================================================

df = pd.read_csv("heart-disease.csv")

if "target" not in df.columns:
    raise ValueError(
        "Dataset harus memiliki kolom bernama 'target'."
    )

X = df.drop(columns=["target"])
y = df["target"]

print("Dataset shape:", df.shape)
print("\nTarget distribution:")
print(y.value_counts())


# ============================================================
# 3. SPLIT DATA INTO TRAINING AND TEST SETS
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTraining shape:", X_train.shape)
print("Testing shape:", X_test.shape)


# ============================================================
# 4. DEFINE PIPELINE
# ============================================================

# Scaling dipelajari secara terpisah pada setiap fold
# selama cross-validation untuk menghindari data leakage.

log_reg_pipeline = make_pipeline(
    StandardScaler(),
    LogisticRegression(
        max_iter=2000,
        random_state=42
    )
)


# ============================================================
# 5. DEFINE PARAMETER GRID
# ============================================================

log_reg_grid = {
    "logisticregression__C": np.logspace(-4, 4, 30),
    "logisticregression__solver": ["liblinear"]
}


# ============================================================
# 6. DEFINE CROSS-VALIDATION STRATEGY
# ============================================================

cv_strategy = StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)


# ============================================================
# 7. INITIALIZE GRIDSEARCHCV
# ============================================================

gs_log_reg = GridSearchCV(
    estimator=log_reg_pipeline,
    param_grid=log_reg_grid,
    cv=cv_strategy,
    scoring="accuracy",
    verbose=1,
    n_jobs=-1,
    refit=True
)


# ============================================================
# 8. FIT GRID SEARCH ON TRAINING DATA
# ============================================================

gs_log_reg.fit(X_train, y_train)


# ============================================================
# 9. DISPLAY BEST PARAMETERS AND CV SCORE
# ============================================================

print("\nBest parameters:")
print(gs_log_reg.best_params_)

print(
    "\nBest cross-validation accuracy:",
    round(gs_log_reg.best_score_, 4)
)


# ============================================================
# 10. EVALUATE ON TEST SET
# ============================================================

y_pred = gs_log_reg.predict(X_test)

test_accuracy = accuracy_score(
    y_test,
    y_pred
)

print("\nTest accuracy:", round(test_accuracy, 4))
print(
    "Test accuracy (%):",
    round(test_accuracy * 100, 2),
    "%"
)


# ============================================================
# 11. CLASSIFICATION REPORT
# ============================================================

print("\nClassification report:")

print(
    classification_report(
        y_test,
        y_pred,
        zero_division=0
    )
)


# ============================================================
# 12. CONFUSION MATRIX
# ============================================================

ConfusionMatrixDisplay.from_predictions(
    y_test,
    y_pred,
    cmap="Blues"
)

plt.title("Logistic Regression - GridSearchCV")
plt.tight_layout()
plt.show()


# ============================================================
# 13. ROC CURVE AND ROC-AUC
# ============================================================

# Mengambil probabilitas untuk kelas positif (label 1).

positive_class_index = list(
    gs_log_reg.classes_
).index(1)

y_proba = gs_log_reg.predict_proba(
    X_test
)[:, positive_class_index]

auc_score = roc_auc_score(
    y_test,
    y_proba
)

RocCurveDisplay.from_predictions(
    y_test,
    y_proba,
    name="Logistic Regression"
)

plt.title(
    f"ROC Curve - Logistic Regression (AUC = {auc_score:.3f})"
)

plt.tight_layout()
plt.show()

print("ROC-AUC:", round(auc_score, 4))


# ============================================================
# 14. INSPECT CROSS-VALIDATION RESULTS
# ============================================================

cv_results_df = pd.DataFrame(
    gs_log_reg.cv_results_
)

columns_to_show = [
    "param_logisticregression__C",
    "mean_test_score",
    "std_test_score",
    "rank_test_score"
]

print("\nTop 10 parameter combinations:")

print(
    cv_results_df[columns_to_show]
    .sort_values("rank_test_score")
    .head(10)
    .to_string(index=False)
)
```

### 10.1 Penjelasan Alur Kode Lengkap

1. Dataset dibaca dan dipisahkan menjadi `X` dan `y`.
2. Data dibagi menjadi training set dan test set dengan stratifikasi.
3. `Pipeline` menggabungkan `StandardScaler` dan Logistic Regression.
4. Parameter grid menguji 30 nilai `C` dengan solver `liblinear`.
5. `GridSearchCV` mengevaluasi seluruh kombinasi menggunakan 5-fold cross-validation.
6. Parameter terbaik dipilih berdasarkan rata-rata akurasi validasi.
7. Model terbaik dievaluasi pada test set yang tidak digunakan selama pencarian.
8. Classification report, confusion matrix, dan ROC-AUC digunakan untuk analisis tambahan.
9. `cv_results_` diperiksa untuk melihat hasil dan peringkat setiap kombinasi parameter.

Karena pipeline menggunakan nama langkah `logisticregression`, parameter ditulis dengan awalan `logisticregression__`, misalnya `logisticregression__C`.

Kode ini mengasumsikan seluruh fitur dapat diproses sebagai fitur numerik dan tidak terdapat nilai hilang yang belum ditangani. Jika dataset memiliki fitur kategorikal berbentuk teks atau nilai hilang, preprocessing perlu disesuaikan sebelum menjalankan eksperimen.

## 11. Ringkasan Materi

Pada materi ini, kita telah mempelajari:

- Konsep dan cara kerja `GridSearchCV`.
- Perbedaan pencarian menyeluruh dan pencarian acak.
- Pengaruh parameter `C` dan `solver` pada Logistic Regression.
- Penggunaan 5-fold cross-validation.
- Cara menemukan `best_params_` dan `best_score_`.
- Evaluasi model hasil tuning pada test set.
- Penggunaan metrik tambahan untuk menilai performa klasifikasi.
- Praktik menghindari data leakage melalui pipeline.

GridSearchCV membantu melakukan eksperimen secara sistematis, tetapi kualitas hasil tetap bergantung pada data, pemilihan metrik, ruang pencarian, dan desain validasi.

## Baca Juga

* [Tutorial Scikit-learn Hyperparameter Tuning dengan GridSearchCV](/scikit-learn/hyperparameter-tuning-GridSearchCV)
