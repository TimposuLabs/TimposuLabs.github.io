---
sidebar_position: 15
title: "Evaluasi Model Klasifikasi: ROC-AUC & Confusion Matrix"
---

Pada materi sebelumnya, kita telah melakukan *hyperparameter tuning* pada Logistic Regression menggunakan `GridSearchCV`. Setelah menemukan konfigurasi terbaik, langkah berikutnya adalah mengevaluasi model secara lebih menyeluruh.

Akurasi saja belum cukup untuk memahami kemampuan model klasifikasi. Kita perlu mengetahui apakah model mampu mengenali kelas positif, berapa banyak kesalahan prediksi yang terjadi, dan bagaimana model membedakan dua kelas pada berbagai ambang keputusan.

Pada materi ini, kita akan mempelajari:

- Membuat prediksi menggunakan model hasil tuning.
- Memahami ROC Curve dan ROC-AUC.
- Menghitung ROC-AUC menggunakan Scikit-Learn.
- Memahami True Positive, True Negative, False Positive, dan False Negative.
- Membuat visualisasi confusion matrix.
- Menggabungkan seluruh proses evaluasi dalam contoh kode lengkap.

## 1. Membuat Prediksi Menggunakan Model Hasil Tuning

Sebelum mengevaluasi model, kita perlu membuat prediksi menggunakan data testing.

Misalnya, pada materi sebelumnya kita telah membuat objek `gs_log_reg` menggunakan `GridSearchCV`.

Gunakan kode berikut:

```python
# Membuat prediksi menggunakan model hasil GridSearchCV
y_preds = gs_log_reg.predict(X_test)

# Melihat beberapa hasil prediksi
print("Prediksi:", y_preds[:10])
print("Label aktual:", y_test.iloc[:10].to_numpy())
```

Penjelasan:

- `gs_log_reg` merupakan objek `GridSearchCV` yang telah dilatih.
- `X_test` berisi fitur yang digunakan untuk evaluasi.
- `predict()` menghasilkan label prediksi untuk setiap sampel.
- `y_test` berisi label aktual yang digunakan untuk membandingkan prediksi.

Jika `y_test` berupa Pandas Series, kita dapat menggunakan `.iloc[:10]` untuk mengambil sepuluh baris pertama berdasarkan posisi.

Prediksi tersebut dapat digunakan untuk menghitung metrik seperti akurasi, precision, recall, F1-score, dan confusion matrix.

## 2. ROC Curve dan ROC-AUC

ROC Curve dan ROC-AUC merupakan metrik evaluasi yang membantu kita memahami kemampuan model dalam membedakan kelas positif dan negatif.

### 2.1 Apa Itu ROC Curve?

ROC merupakan singkatan dari *Receiver Operating Characteristic*.

ROC Curve adalah grafik yang membandingkan:

- **True Positive Rate (TPR):** Proporsi sampel positif yang berhasil diprediksi sebagai positif.
- **False Positive Rate (FPR):** Proporsi sampel negatif yang salah diprediksi sebagai positif.

Rumus True Positive Rate:

$$
TPR = \frac{TP}{TP + FN}
$$

Rumus False Positive Rate:

$$
FPR = \frac{FP}{FP + TN}
$$

ROC Curve menggambarkan perubahan TPR dan FPR ketika ambang keputusan (*decision threshold*) diubah.

Pada classifier probabilistik seperti Logistic Regression, model dapat menghasilkan probabilitas suatu sampel termasuk kelas positif. Ambang keputusan menentukan kapan probabilitas tersebut dikategorikan sebagai kelas positif.

### 2.2 Apa Itu ROC-AUC?

AUC merupakan singkatan dari *Area Under the Curve*, yaitu luas daerah di bawah ROC Curve.

Nilai ROC-AUC secara umum berada pada rentang 0 sampai 1 untuk kasus klasifikasi biner yang normal.

| Nilai ROC-AUC | Interpretasi Umum |
|---|---|
| 1.0 | Pemisahan kelas sempurna pada data evaluasi |
| Mendekati 1.0 | Kemampuan pemeringkatan kelas yang sangat baik |
| Sekitar 0.5 | Kemampuan pemeringkatan setara dengan tebakan acak |
| Di bawah 0.5 | Pemeringkatan cenderung berlawanan dengan label; periksa orientasi skor dan label |

Interpretasi tersebut perlu mempertimbangkan ukuran dataset, ketidakpastian statistik, distribusi kelas, dan karakteristik masalah.

Secara intuitif, ROC-AUC mengukur kemampuan model memberi skor lebih tinggi kepada sampel positif dibandingkan sampel negatif.

**Penting:** ROC-AUC bukan akurasi. Model dapat memiliki ROC-AUC tinggi, tetapi tetap menghasilkan banyak kesalahan pada ambang keputusan tertentu.

### 2.3 Mengapa Menggunakan ROC-AUC?

ROC-AUC berguna ketika kita ingin membandingkan kemampuan pemeringkatan dua kelas tanpa menetapkan satu ambang keputusan tertentu terlebih dahulu.

Dalam proyek Heart Disease Classification, ROC-AUC dapat membantu menilai apakah model mampu membedakan sampel dengan label positif dan negatif.

Namun, ROC-AUC tidak langsung menunjukkan berapa banyak pasien positif yang terlewat pada ambang keputusan yang digunakan. Untuk itu, kita tetap perlu memeriksa recall dan confusion matrix.

### 2.4 Membuat ROC Curve dengan Scikit-Learn

Pada versi Scikit-Learn modern, kita dapat menggunakan `RocCurveDisplay.from_estimator()` atau `RocCurveDisplay.from_predictions()`.

Contoh menggunakan estimator hasil GridSearchCV:

```python
import matplotlib.pyplot as plt
from sklearn.metrics import RocCurveDisplay

RocCurveDisplay.from_estimator(
    gs_log_reg,
    X_test,
    y_test
)

plt.title("ROC Curve - Logistic Regression")
plt.tight_layout()
plt.show()
```

![ROC-AUC](/img/python/70.webp)

Metode ini menggunakan skor dari estimator untuk membangun ROC Curve. Pada Logistic Regression, skor tersebut dapat diperoleh dari probabilitas kelas atau fungsi keputusan yang didukung estimator.

Fungsi `plot_roc_curve()` yang ditemukan pada sejumlah materi lama telah dihapus dari versi Scikit-Learn modern. Karena itu, gunakan `RocCurveDisplay` untuk kode baru.

### 2.5 Menghitung ROC-AUC Secara Terpisah

Kita juga dapat menghitung ROC-AUC secara langsung menggunakan probabilitas kelas positif.

```python
from sklearn.metrics import roc_auc_score

# Mengambil probabilitas untuk kelas positif, yaitu label 1
y_proba = gs_log_reg.predict_proba(X_test)[:, 1]

# Menghitung ROC-AUC
auc_score = roc_auc_score(y_test, y_proba)

print("ROC-AUC:", round(auc_score, 4))
```

Penjelasan:

- `predict_proba(X_test)` menghasilkan probabilitas untuk setiap kelas.
- `[:, 1]` mengambil probabilitas kelas dengan label `1`, dengan asumsi kelas tersebut tersedia pada estimator.
- `roc_auc_score()` menghitung luas di bawah ROC Curve berdasarkan label aktual dan skor prediksi.

Dalam ringkasan video kursus, model dilaporkan memperoleh ROC-AUC sekitar 0,93. Angka tersebut merupakan hasil yang dilaporkan dalam video, bukan jaminan hasil pada eksperimen Anda.

## 3. Confusion Matrix

ROC-AUC memberi gambaran tentang kemampuan pemeringkatan kelas. Sementara itu, confusion matrix membantu kita melihat jumlah prediksi benar dan salah pada ambang keputusan tertentu.

### 3.1 Apa Itu Confusion Matrix?

Confusion matrix adalah tabel yang membandingkan label aktual dengan label prediksi.

Dalam klasifikasi biner, terdapat empat komponen utama.

| Komponen | Kepanjangan | Penjelasan |
|---|---|---|
| TP | True Positive | Sampel positif diprediksi positif |
| TN | True Negative | Sampel negatif diprediksi negatif |
| FP | False Positive | Sampel negatif diprediksi positif |
| FN | False Negative | Sampel positif diprediksi negatif |

Dengan asumsi label `1` merupakan kelas positif, susunan konseptualnya adalah:

| Label Aktual | Prediksi 0 | Prediksi 1 |
|---|---|---|
| Aktual 0 | True Negative (TN) | False Positive (FP) |
| Aktual 1 | False Negative (FN) | True Positive (TP) |

Perlu diingat bahwa susunan baris dan kolom pada visualisasi mengikuti konvensi library yang digunakan. Pada confusion matrix Scikit-Learn, baris menunjukkan label aktual dan kolom menunjukkan label prediksi.

### 3.2 Memahami False Positive dan False Negative

**False Positive (FP)** terjadi ketika model memprediksi kelas positif, padahal label aktualnya negatif.

Dalam konteks dataset penyakit jantung, model memberikan prediksi positif kepada sampel yang berlabel negatif.

**False Negative (FN)** terjadi ketika model memprediksi kelas negatif, padahal label aktualnya positif.

Dalam konteks yang sama, model gagal mengenali sampel yang berlabel positif.

Kedua kesalahan tersebut memiliki konsekuensi berbeda. Dalam konteks medis, false negative dapat menyebabkan kasus yang perlu diperhatikan tidak teridentifikasi, sedangkan false positive dapat memicu pemeriksaan lanjutan yang sebenarnya tidak diperlukan.

Namun, konsekuensi klinis tidak dapat ditentukan hanya dari label dataset. Model Machine Learning untuk pembelajaran ini tidak boleh digunakan sebagai pengganti diagnosis profesional.

### 3.3 Menghitung Confusion Matrix

Gunakan fungsi `confusion_matrix()` dari Scikit-Learn.

```python
from sklearn.metrics import confusion_matrix

y_preds = gs_log_reg.predict(X_test)

cm = confusion_matrix(
    y_test,
    y_preds,
    labels=[0, 1]
)

print(cm)
```

Output akan berupa matriks berukuran 2 × 2.

Formatnya:

```text
[[TN FP]
 [FN TP]]
```

Angka aktual bergantung pada prediksi model dan isi test set yang digunakan.

Parameter `labels=[0, 1]` menetapkan urutan kelas sehingga interpretasi setiap elemen konsisten dengan format di atas.

## 4. Membuat Visualisasi Confusion Matrix dengan Seaborn

Visualisasi heatmap membantu kita membaca confusion matrix dengan lebih mudah.

### 4.1 Membuat Fungsi `plot_conf_mat()`

Kita dapat membuat fungsi agar visualisasi confusion matrix mudah digunakan kembali.

```python
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix

def plot_conf_mat(y_true, y_preds):
    """
    Menampilkan confusion matrix sebagai heatmap.

    Parameters
    ----------
    y_true : array-like
        Label aktual.
    y_preds : array-like
        Label hasil prediksi.
    """

    cm = confusion_matrix(
        y_true,
        y_preds,
        labels=[0, 1]
    )

    fig, ax = plt.subplots(figsize=(4, 4))

    sns.heatmap(
        cm,
        annot=True,
        fmt="d",
        cmap="Blues",
        cbar=False,
        ax=ax
    )

    ax.set(
        xlabel="Predicted label",
        ylabel="True label",
        title="Confusion Matrix"
    )

    ax.set_xticklabels(["0", "1"])
    ax.set_yticklabels(["0", "1"], rotation=0)

    plt.tight_layout()
    plt.show()
```

Penjelasan parameter:

- `annot=True` menampilkan angka di setiap sel.
- `fmt="d"` menampilkan angka dalam format bilangan bulat.
- `cmap="Blues"` menentukan skema warna heatmap.
- `cbar=False` menyembunyikan colorbar agar visualisasi lebih sederhana.
- `xlabel` dan `ylabel` memberikan keterangan pada sumbu.

Perhatikan bahwa Python menggunakan `False` dengan huruf kapital, bukan `false`.

### 4.2 Menjalankan Fungsi

Setelah model dilatih dan prediksi tersedia, panggil fungsi berikut:

```python
y_preds = gs_log_reg.predict(X_test)

plot_conf_mat(
    y_true=y_test,
    y_preds=y_preds
)
```

![Visualisasi Confution Matrix](/img/python/71.webp)

Hasilnya adalah heatmap yang menampilkan jumlah prediksi pada setiap kombinasi label aktual dan label prediksi.

Dengan visualisasi ini, kita dapat mengetahui apakah model lebih sering membuat false positive atau false negative.

## 5. Hubungan Confusion Matrix dengan Metrik Evaluasi

Confusion matrix merupakan dasar untuk menghitung beberapa metrik klasifikasi yang penting.

### 5.1 Accuracy

Akurasi adalah proporsi seluruh prediksi yang benar.

$$
Accuracy = \frac{TP + TN}{TP + TN + FP + FN}
$$

Akurasi mudah dipahami, tetapi dapat memberikan gambaran yang kurang lengkap ketika distribusi kelas tidak seimbang.

### 5.2 Precision

Precision mengukur proporsi prediksi positif yang benar.

$$
Precision = \frac{TP}{TP + FP}
$$

Precision tinggi berarti sebagian besar sampel yang diprediksi positif memang memiliki label positif.

### 5.3 Recall

Recall mengukur proporsi sampel positif yang berhasil dikenali model.

$$
Recall = \frac{TP}{TP + FN}
$$

Recall tinggi berarti model berhasil menemukan sebagian besar sampel yang berlabel positif.

### 5.4 F1-Score

F1-score merupakan rata-rata harmonik precision dan recall.

$$
F1 = 2 \times
\frac{Precision \times Recall}
{Precision + Recall}
$$

F1-score dapat membantu ketika kita ingin menyeimbangkan precision dan recall dalam satu metrik.

Jika penyebut suatu metrik bernilai nol, diperlukan penanganan khusus sesuai definisi dan implementasi evaluasi yang digunakan.

## 6. Hal yang Perlu Diperhatikan dalam Evaluasi

Beberapa prinsip penting untuk menjaga evaluasi model tetap valid:

- **Gunakan test set secara terpisah:** Jangan menggunakan test set berulang kali untuk memilih model atau mengatur hyperparameter.
- **Bedakan probabilitas dan label prediksi:** ROC-AUC menggunakan skor probabilitas atau skor keputusan, sedangkan confusion matrix umumnya menggunakan label hasil prediksi.
- **Perhatikan urutan kelas:** Pastikan kelas positif yang dievaluasi benar-benar label `1`.
- **Jangan hanya melihat ROC-AUC:** Periksa recall, precision, F1-score, dan confusion matrix untuk memahami jenis kesalahan.
- **Gunakan validasi silang:** Cross-validation pada training set membantu membandingkan model dengan lebih stabil.
- **Interpretasikan sesuai konteks:** Hasil pada dataset penelitian tidak otomatis berlaku untuk populasi pasien yang lebih luas.

## 7. Contoh Kode Lengkap: Evaluasi Logistic Regression dengan ROC-AUC dan Confusion Matrix

Kode berikut menggabungkan pembacaan dataset, pembagian data, pelatihan Logistic Regression menggunakan GridSearchCV, prediksi, ROC-AUC, ROC Curve, confusion matrix, dan classification report.

Kode menggunakan file `heart-disease.csv` yang memiliki kolom `target` dan fitur numerik yang sesuai dengan dataset yang digunakan.

```python
# ============================================================
# 1. IMPORT LIBRARIES
# ============================================================

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

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
    roc_auc_score,
    RocCurveDisplay,
    confusion_matrix,
    classification_report
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
# 3. SPLIT DATA
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
# 4. CREATE LOGISTIC REGRESSION PIPELINE
# ============================================================

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
# 6. DEFINE CROSS-VALIDATION
# ============================================================

cv_strategy = StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)


# ============================================================
# 7. RUN GRIDSEARCHCV
# ============================================================

gs_log_reg = GridSearchCV(
    estimator=log_reg_pipeline,
    param_grid=log_reg_grid,
    cv=cv_strategy,
    scoring="accuracy",
    n_jobs=-1,
    verbose=1,
    refit=True
)

gs_log_reg.fit(X_train, y_train)

print("\nBest parameters:")
print(gs_log_reg.best_params_)

print(
    "Best cross-validation accuracy:",
    round(gs_log_reg.best_score_, 4)
)


# ============================================================
# 8. MAKE PREDICTIONS
# ============================================================

y_preds = gs_log_reg.predict(X_test)

# Mengambil probabilitas kelas positif (label 1)
positive_class_index = list(
    gs_log_reg.classes_
).index(1)

y_proba = gs_log_reg.predict_proba(
    X_test
)[:, positive_class_index]


# ============================================================
# 9. EVALUATE ACCURACY AND ROC-AUC
# ============================================================

accuracy = accuracy_score(
    y_test,
    y_preds
)

auc_score = roc_auc_score(
    y_test,
    y_proba
)

print("\nTest accuracy:", round(accuracy, 4))
print("Test ROC-AUC:", round(auc_score, 4))


# ============================================================
# 10. PLOT ROC CURVE
# ============================================================

RocCurveDisplay.from_predictions(
    y_test,
    y_proba,
    name="Logistic Regression"
)

plt.title(
    f"ROC Curve (AUC = {auc_score:.3f})"
)

plt.tight_layout()
plt.show()


# ============================================================
# 11. CREATE CONFUSION MATRIX
# ============================================================

cm = confusion_matrix(
    y_test,
    y_preds,
    labels=[0, 1]
)

print("\nConfusion matrix:")
print(cm)


# ============================================================
# 12. PLOT CONFUSION MATRIX
# ============================================================

def plot_conf_mat(y_true, y_preds):
    cm = confusion_matrix(
        y_true,
        y_preds,
        labels=[0, 1]
    )

    fig, ax = plt.subplots(figsize=(4, 4))

    sns.heatmap(
        cm,
        annot=True,
        fmt="d",
        cmap="Blues",
        cbar=False,
        ax=ax
    )

    ax.set(
        xlabel="Predicted label",
        ylabel="True label",
        title="Confusion Matrix"
    )

    ax.set_xticklabels(["0", "1"])
    ax.set_yticklabels(["0", "1"], rotation=0)

    plt.tight_layout()
    plt.show()


plot_conf_mat(
    y_true=y_test,
    y_preds=y_preds
)


# ============================================================
# 13. CLASSIFICATION REPORT
# ============================================================

print("\nClassification report:")

print(
    classification_report(
        y_test,
        y_preds,
        labels=[0, 1],
        zero_division=0
    )
)
```

### 7.1 Cara Membaca Hasil

Setelah menjalankan kode, periksa hasil berikut:

1. **Test accuracy:** Proporsi prediksi yang benar pada data testing.
2. **Test ROC-AUC:** Kemampuan model memeringkat sampel positif di atas sampel negatif.
3. **ROC Curve:** Perubahan TPR dan FPR pada berbagai ambang keputusan.
4. **Confusion matrix:** Jumlah true negative, false positive, false negative, dan true positive.
5. **Classification report:** Precision, recall, F1-score, dan support untuk setiap kelas.

Nilai aktual bergantung pada dataset dan eksperimen Anda. Jangan menggunakan angka dari video sebagai hasil aktual notebook tanpa menjalankan kode dan memeriksa outputnya.

## 8. Ringkasan Materi

Pada materi ini, kita telah mempelajari:

- Membuat prediksi dengan `predict()`.
- Memahami ROC Curve dan ROC-AUC.
- Menghitung ROC-AUC menggunakan probabilitas kelas positif.
- Membaca confusion matrix.
- Membedakan true positive, true negative, false positive, dan false negative.
- Membuat visualisasi confusion matrix dengan Seaborn.
- Memahami hubungan confusion matrix dengan accuracy, precision, recall, dan F1-score.
- Mengevaluasi model Logistic Regression hasil GridSearchCV secara lebih menyeluruh.

ROC-AUC membantu mengevaluasi kemampuan pemeringkatan kelas, sedangkan confusion matrix menunjukkan jenis kesalahan pada ambang keputusan yang digunakan. Kedua pendekatan tersebut saling melengkapi dan tidak sebaiknya menggantikan evaluasi lainnya.

## Baca Juga

* [Evaluasi Classification Model: ROC Curve & AUC](/scikit-learn/evaluasi-classification-model-roc-curve)
* [Evaluasi Classification Model: Confusion Matrix](/scikit-learn/evaluasi-classification-model-confusion-matrix)
