---
sidebar_position: 11
title: "Evaluasi & Perbandingan Model"
---

Setelah membuat fungsi `fit_and_score()` pada materi sebelumnya, kita dapat mulai membandingkan performa beberapa model klasifikasi untuk proyek **Heart Disease Classification**.

Pada tahap ini, kita akan mengevaluasi tiga model:

1. Logistic Regression
2. K-Nearest Neighbors (KNN)
3. Random Forest Classifier

Tujuan evaluasi bukan hanya menemukan model dengan akurasi tertinggi, tetapi juga memahami kelemahan setiap model, memeriksa apakah proses pelatihan berjalan dengan baik, dan menentukan eksperimen berikutnya.

## 1. Mengevaluasi Model Baseline

Model *baseline* adalah model awal yang digunakan sebagai titik pembanding sebelum kita melakukan optimasi parameter atau eksperimen lanjutan.

Pada proyek ini, baseline dibangun menggunakan tiga algoritma klasifikasi yang telah disiapkan sebelumnya.

### 1.1 Menjalankan Fungsi `fit_and_score()`

Pastikan variabel berikut sudah tersedia dari materi sebelumnya:

- `models`: dictionary yang berisi objek Logistic Regression, KNN, dan Random Forest.
- `X_train` dan `y_train`: fitur dan label data pelatihan.
- `X_test` dan `y_test`: fitur dan label data pengujian.
- `fit_and_score()`: fungsi untuk melatih dan mengevaluasi model.

Jalankan fungsi berikut:

```python
model_scores = fit_and_score(
    models=models,
    X_train=X_train,
    X_test=X_test,
    y_train=y_train,
    y_test=y_test
)

model_scores
```

Hasilnya berupa dictionary dengan nama model sebagai kunci dan akurasi sebagai nilai.

Contoh ilustratif:

```text
{
    'Logistic Regression': 0.88,
    'KNN': 0.65,
    'Random Forest': 0.82
}
```

Angka tersebut hanya contoh untuk menjelaskan bentuk hasil. Nilai aktual bergantung pada versi dataset, pembagian data, parameter, dan lingkungan eksperimen.

### 1.2 Memahami Hasil Evaluasi

Misalnya, hasil eksperimen menunjukkan bahwa Logistic Regression memiliki akurasi tertinggi.

Hal tersebut berarti Logistic Regression menghasilkan proporsi prediksi benar paling besar pada data pengujian yang digunakan dalam eksperimen tersebut.

Namun, kesimpulan itu hanya berlaku untuk hasil pengujian yang diamati. Kita belum dapat menyimpulkan bahwa Logistic Regression selalu lebih baik daripada KNN atau Random Forest pada semua dataset.

Perhatikan beberapa hal berikut:

- **Akurasi tinggi:** Menunjukkan proporsi prediksi benar yang tinggi pada data evaluasi.
- **Akurasi rendah:** Menunjukkan bahwa model masih memiliki keterbatasan pada konfigurasi atau data tersebut.
- **Perbedaan antar-model:** Menjadi alasan untuk memeriksa karakteristik algoritma, preprocessing, dan parameter.
- **Hasil yang konsisten:** Perlu diperiksa melalui validasi silang atau eksperimen tambahan.

Jangan langsung menghapus KNN hanya karena hasil baseline-nya lebih rendah. Model tersebut mungkin memberikan hasil berbeda setelah standardisasi fitur atau penyesuaian parameter.

## 2. Memeriksa Peringatan Logistic Regression

Saat melatih Logistic Regression, Scikit-Learn terkadang menampilkan peringatan seperti:

```text
ConvergenceWarning: lbfgs failed to converge
```

Peringatan ini menunjukkan bahwa algoritma optimasi belum mencapai kriteria konvergensi dalam batas iterasi yang diberikan.

### 2.1 Apa Itu Konvergensi?

Konvergensi terjadi ketika proses optimasi telah mencapai kondisi yang memenuhi kriteria penghentian algoritma.

Logistic Regression mencari parameter yang sesuai untuk meminimalkan fungsi kerugian (*loss function*). Jika proses optimasi belum konvergen, hasil model masih dapat dipengaruhi oleh keterbatasan proses pelatihan.

Penyebabnya dapat meliputi:

- Jumlah iterasi terlalu sedikit.
- Skala fitur berbeda jauh.
- Kondisi optimasi sulit untuk dataset yang digunakan.
- Pengaturan solver atau parameter belum sesuai.

### 2.2 Meningkatkan Jumlah Iterasi

Salah satu langkah awal adalah meningkatkan `max_iter`.

```python
from sklearn.linear_model import LogisticRegression

log_reg = LogisticRegression(
    max_iter=2000,
    random_state=42
)

log_reg.fit(X_train, y_train)
```

Parameter `max_iter=2000` memberikan kesempatan kepada algoritma untuk menjalankan lebih banyak iterasi.

Namun, menambah iterasi tidak selalu menyelesaikan masalah. Jika fitur memiliki skala yang berbeda, standardisasi dapat membantu.

### 2.3 Menggunakan StandardScaler dan Pipeline

`StandardScaler` mengubah fitur numerik agar memiliki rata-rata mendekati 0 dan standar deviasi mendekati 1 berdasarkan data yang digunakan untuk proses `fit`.

Untuk menghindari *data leakage*, scaler harus dipelajari dari data training saja. Cara yang praktis adalah menggunakan `Pipeline`.

```python
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

log_reg_pipeline = make_pipeline(
    StandardScaler(),
    LogisticRegression(
        max_iter=2000,
        random_state=42
    )
)

log_reg_pipeline.fit(X_train, y_train)

print("Training accuracy:", log_reg_pipeline.score(X_train, y_train))
print("Testing accuracy:", log_reg_pipeline.score(X_test, y_test))
```

Penjelasan:

1. `StandardScaler()` mempelajari skala fitur dari data training.
2. `LogisticRegression()` mempelajari hubungan antara fitur dan label.
3. `Pipeline` menjalankan scaling dan pelatihan dalam satu alur.
4. Saat `score()` dipanggil pada test set, scaler yang telah dipelajari dari training set diterapkan tanpa mempelajari ulang statistik dari test set.

Nilai akurasi setelah standardisasi bisa meningkat, menurun, atau tetap sama. Perubahan tersebut perlu diukur, bukan diasumsikan.

## 3. Mengubah Hasil Evaluasi Menjadi DataFrame

Dictionary skor mudah digunakan oleh Python, tetapi DataFrame lebih praktis untuk mengurutkan dan menyajikan hasil.

### 3.1 Membuat DataFrame

```python
import pandas as pd

scores_df = pd.DataFrame(
    model_scores.items(),
    columns=["Model", "Accuracy"]
)

scores_df
```

Contoh tampilan ilustratif:

| Model | Accuracy |
|---|---:|
| Logistic Regression | 0.88 |
| KNN | 0.65 |
| Random Forest | 0.82 |

DataFrame ini memungkinkan kita melihat skor setiap model dalam format tabel.

### 3.2 Mengurutkan Model Berdasarkan Akurasi

```python
scores_df = scores_df.sort_values(
    by="Accuracy",
    ascending=False
)

scores_df
```

Penjelasan:

- `by="Accuracy"` menentukan kolom yang digunakan untuk pengurutan.
- `ascending=False` mengurutkan dari nilai terbesar ke terkecil.

Model yang berada di baris teratas memiliki akurasi tertinggi pada hasil evaluasi yang tercatat.

## 4. Membuat Visualisasi Perbandingan Model

Grafik batang membantu memperlihatkan perbedaan akurasi antar-model secara visual.

```python
import matplotlib.pyplot as plt

scores_df.plot(
    x="Model",
    y="Accuracy",
    kind="bar",
    figsize=(10, 6),
    legend=False
)

plt.title("Baseline Model Accuracy Comparison")
plt.xlabel("Machine Learning Model")
plt.ylabel("Accuracy")
plt.xticks(rotation=0)
plt.ylim(0, 1)
plt.tight_layout()
plt.show()
```

### 4.1 Penjelasan Kode Visualisasi

| Kode | Fungsi |
|---|---|
| `plot()` | Membuat grafik berdasarkan data dalam DataFrame |
| `x="Model"` | Menggunakan nama model sebagai label sumbu X |
| `y="Accuracy"` | Menggunakan akurasi sebagai nilai sumbu Y |
| `kind="bar"` | Membuat grafik batang |
| `figsize=(10, 6)` | Menentukan ukuran gambar |
| `legend=False` | Menyembunyikan legenda yang tidak diperlukan |
| `plt.title()` | Memberikan judul grafik |
| `plt.xlabel()` | Memberikan label sumbu X |
| `plt.ylabel()` | Memberikan label sumbu Y |
| `plt.xticks(rotation=0)` | Menampilkan label model tanpa rotasi |
| `plt.ylim(0, 1)` | Menetapkan rentang akurasi dari 0 sampai 1 |
| `plt.tight_layout()` | Mengatur tata letak agar elemen grafik tidak bertumpuk |

Karena akurasi berada pada rentang 0 sampai 1, sumbu Y menggunakan rentang tersebut. Jika ingin menampilkan persentase, nilai akurasi dapat dikalikan 100 dan label sumbu Y disesuaikan.

### 4.2 Mengapa Visualisasi Penting?

Visualisasi dapat membantu kita:

- Melihat model dengan akurasi tertinggi.
- Menilai seberapa besar perbedaan skor antar-model.
- Menyampaikan hasil eksperimen kepada pembaca atau kolega.
- Menentukan model yang perlu diperiksa lebih lanjut.

Meskipun demikian, grafik batang hanya menunjukkan metrik yang divisualisasikan. Grafik akurasi tidak menjelaskan jenis kesalahan yang dibuat model atau apakah model mampu menemukan seluruh kasus positif.

## 5. Memahami Target Akurasi 95%

Dalam skenario proyek ini, target awal yang ditetapkan adalah akurasi minimal 95%.

Target tersebut sebaiknya diperlakukan sebagai **sasaran eksperimen**, bukan jaminan performa dan bukan satu-satunya syarat kelayakan model.

Misalnya, model menghasilkan akurasi 88%. Hasil ini menunjukkan bahwa model belum mencapai target numerik 95% pada evaluasi yang dilakukan.

Namun, kita tidak boleh langsung menyimpulkan bahwa model tersebut tidak berguna. Kita perlu mengetahui:

- Apakah model telah dilatih dengan benar?
- Apakah ada peringatan konvergensi?
- Apakah preprocessing sudah sesuai?
- Apakah terdapat *data leakage*?
- Bagaimana nilai precision, recall, dan F1-score?
- Berapa jumlah false positive dan false negative?
- Apakah performa stabil pada validasi silang?

Dalam klasifikasi medis, model dengan akurasi 95% pun belum otomatis layak untuk penggunaan klinis. Validasi eksternal, analisis kesalahan, kalibrasi probabilitas bila diperlukan, dan evaluasi oleh pihak yang berkompeten tetap penting.

## 6. Tantangan Evaluasi Model Berikutnya

Setelah mendapatkan hasil baseline, kita perlu melakukan evaluasi yang lebih lengkap.

### 6.1 Hyperparameter Tuning

Hyperparameter adalah pengaturan model yang ditentukan sebelum atau selama konfigurasi proses pelatihan, bukan parameter yang dipelajari langsung dari data seperti koefisien Logistic Regression.

Contohnya:

| Model | Contoh Hyperparameter |
|---|---|
| Logistic Regression | `C`, `solver`, `max_iter` |
| KNN | `n_neighbors`, `weights`, `p` |
| Random Forest | `n_estimators`, `max_depth`, `min_samples_split` |

Hyperparameter tuning bertujuan mencari konfigurasi yang memberikan performa lebih baik berdasarkan metrik evaluasi yang telah ditentukan.

Pemilihan konfigurasi sebaiknya dilakukan menggunakan validasi silang pada training set, bukan dengan berulang kali memilih parameter berdasarkan test set.

### 6.2 Classification Report

Classification report menampilkan metrik klasifikasi untuk setiap kelas, termasuk precision, recall, F1-score, dan jumlah sampel (*support*).

Contoh penggunaannya:

```python
from sklearn.metrics import classification_report

model = models["Logistic Regression"]
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

print(classification_report(y_test, y_pred))
```

Interpretasi metrik:

- **Precision:** Dari seluruh prediksi suatu kelas, berapa proporsi yang benar.
- **Recall:** Dari seluruh sampel yang benar-benar termasuk suatu kelas, berapa proporsi yang berhasil ditemukan.
- **F1-score:** Ringkasan harmonik precision dan recall.
- **Support:** Jumlah sampel aktual untuk masing-masing kelas pada data evaluasi.

### 6.3 Confusion Matrix

Confusion matrix memperlihatkan jumlah prediksi yang benar dan salah untuk setiap kelas.

```python
from sklearn.metrics import ConfusionMatrixDisplay
import matplotlib.pyplot as plt

ConfusionMatrixDisplay.from_predictions(
    y_test,
    y_pred,
    cmap="Blues"
)

plt.title("Confusion Matrix - Logistic Regression")
plt.tight_layout()
plt.show()
```

Untuk klasifikasi biner, confusion matrix terdiri dari empat komponen:

| Komponen | Makna |
|---|---|
| True Positive (TP) | Label positif diprediksi positif |
| True Negative (TN) | Label negatif diprediksi negatif |
| False Positive (FP) | Label negatif diprediksi positif |
| False Negative (FN) | Label positif diprediksi negatif |

Dalam konteks dataset penyakit jantung, false negative berarti sampel berlabel positif diprediksi sebagai negatif. Kesalahan ini perlu dianalisis secara khusus, tetapi hasil model tetap bukan diagnosis medis.

### 6.4 Precision, Recall, dan F1-Score

Ketiga metrik tersebut membantu kita memahami jenis kesalahan yang tidak terlihat dari akurasi saja.

Precision:

$$
\text{Precision} = \frac{TP}{TP + FP}
$$

Recall:

$$
\text{Recall} = \frac{TP}{TP + FN}
$$

F1-score:

$$
F1 = 2 \times
\frac{\text{Precision} \times \text{Recall}}
{\text{Precision} + \text{Recall}}
$$

Jika penyebut bernilai nol, metrik memerlukan penanganan khusus sesuai definisi dan implementasi evaluasi yang digunakan.

Pemilihan metrik utama harus mengikuti tujuan proyek. Dalam konteks medis, recall kelas positif dapat menjadi salah satu perhatian penting, tetapi trade-off terhadap false positive juga perlu diperiksa.

### 6.5 Feature Importance

Feature importance membantu memahami fitur yang berkontribusi pada prediksi model, tetapi cara mengukurnya berbeda-beda menurut algoritma.

Contoh untuk Random Forest:

```python
import pandas as pd

rf = models["Random Forest"]
rf.fit(X_train, y_train)

feature_importance = pd.DataFrame({
    "Feature": X_train.columns,
    "Importance": rf.feature_importances_
})

feature_importance = feature_importance.sort_values(
    by="Importance",
    ascending=False
)

feature_importance
```

Kolom `feature_importances_` menunjukkan kepentingan fitur berdasarkan kriteria internal Random Forest.

Hal yang perlu diperhatikan:

- Nilai tersebut tidak membuktikan hubungan sebab-akibat.
- Fitur berkorelasi dapat memengaruhi interpretasi kepentingan.
- Feature importance Random Forest tidak sama dengan koefisien Logistic Regression.
- Hasilnya tidak otomatis menjelaskan alasan klinis suatu prediksi.

Metode tambahan seperti permutation importance dapat digunakan untuk memeriksa pengaruh fitur terhadap skor model.

### 6.6 ROC Curve dan ROC-AUC

ROC Curve menggambarkan hubungan antara *true positive rate* dan *false positive rate* pada berbagai ambang keputusan.

ROC-AUC merangkum kemampuan pemeringkatan model dalam membedakan kedua kelas pada berbagai ambang tersebut.

Contoh kode:

```python
import matplotlib.pyplot as plt
from sklearn.metrics import RocCurveDisplay, roc_auc_score

model = models["Logistic Regression"]
model.fit(X_train, y_train)

y_proba = model.predict_proba(X_test)[:, 1]

auc_score = roc_auc_score(y_test, y_proba)

RocCurveDisplay.from_predictions(
    y_test,
    y_proba,
    name="Logistic Regression"
)

plt.title(f"ROC Curve (AUC = {auc_score:.3f})")
plt.tight_layout()
plt.show()
```

Penjelasan:

- `predict_proba()` menghasilkan estimasi probabilitas kelas.
- `[:, 1]` mengambil probabilitas untuk kelas berlabel `1`.
- `roc_auc_score()` menghitung ROC-AUC dari label aktual dan skor probabilitas.
- `RocCurveDisplay.from_predictions()` menampilkan kurva ROC.

ROC-AUC berbeda dari akurasi. Nilai AUC yang tinggi tidak otomatis berarti model memiliki recall yang tinggi pada ambang keputusan tertentu. Pemilihan ambang keputusan harus mempertimbangkan kebutuhan aplikasi dan konsekuensi setiap jenis kesalahan.

## 7. Contoh Kode Lengkap: Evaluasi Baseline Models

Bagian ini menggabungkan persiapan data, pembagian training/testing, pelatihan tiga model, perbandingan akurasi, visualisasi, classification report, confusion matrix, feature importance Random Forest, dan ROC Curve Logistic Regression.

Kode menggunakan file `heart-disease.csv` yang berisi kolom `target` dan fitur yang sesuai dengan dataset Heart Disease. Pastikan file berada di direktori kerja notebook.

```python
# ============================================================
# 1. IMPORT LIBRARIES
# ============================================================

import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    ConfusionMatrixDisplay,
    RocCurveDisplay,
    roc_auc_score
)


# ============================================================
# 2. LOAD DATASET
# ============================================================

df = pd.read_csv("heart-disease.csv")

print("Dataset shape:", df.shape)
print("\nTarget distribution:")
print(df["target"].value_counts())


# ============================================================
# 3. SEPARATE FEATURES AND TARGET
# ============================================================

X = df.drop(columns=["target"])
y = df["target"]


# ============================================================
# 4. TRAIN/TEST SPLIT
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTraining features:", X_train.shape)
print("Testing features:", X_test.shape)


# ============================================================
# 5. DEFINE BASELINE MODELS
# ============================================================

models = {
    "Logistic Regression": make_pipeline(
        StandardScaler(),
        LogisticRegression(
            max_iter=2000,
            random_state=42
        )
    ),
    "KNN": make_pipeline(
        StandardScaler(),
        KNeighborsClassifier()
    ),
    "Random Forest": RandomForestClassifier(
        random_state=42
    )
}


# ============================================================
# 6. TRAIN AND EVALUATE MODELS
# ============================================================

model_scores = {}
trained_models = {}

for name, model in models.items():
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)

    model_scores[name] = accuracy
    trained_models[name] = model

    print(f"{name} accuracy: {accuracy:.4f}")


# ============================================================
# 7. CREATE COMPARISON TABLE
# ============================================================

scores_df = pd.DataFrame(
    model_scores.items(),
    columns=["Model", "Accuracy"]
)

scores_df = scores_df.sort_values(
    by="Accuracy",
    ascending=False
)

print("\nBaseline model comparison:")
print(scores_df.to_string(index=False))


# ============================================================
# 8. VISUALIZE ACCURACY COMPARISON
# ============================================================

ax = scores_df.plot(
    x="Model",
    y="Accuracy",
    kind="bar",
    figsize=(10, 6),
    legend=False
)

ax.set_title("Baseline Model Accuracy Comparison")
ax.set_xlabel("Machine Learning Model")
ax.set_ylabel("Accuracy")
ax.set_ylim(0, 1)

plt.xticks(rotation=0)
plt.tight_layout()
plt.show()


# ============================================================
# 9. SELECT A MODEL FOR FURTHER EVALUATION
# ============================================================

# Pemilihan ini hanya berdasarkan akurasi baseline.
# Untuk penelitian, keputusan akhir juga harus mempertimbangkan
# metrik lain dan prosedur validasi.

best_model_name = scores_df.iloc[0]["Model"]
best_model = trained_models[best_model_name]

print("\nModel with highest baseline accuracy:", best_model_name)

y_pred_best = best_model.predict(X_test)


# ============================================================
# 10. CLASSIFICATION REPORT
# ============================================================

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        y_pred_best,
        zero_division=0
    )
)


# ============================================================
# 11. CONFUSION MATRIX
# ============================================================

ConfusionMatrixDisplay.from_predictions(
    y_test,
    y_pred_best,
    cmap="Blues"
)

plt.title(f"Confusion Matrix - {best_model_name}")
plt.tight_layout()
plt.show()


# ============================================================
# 12. FEATURE IMPORTANCE - RANDOM FOREST
# ============================================================

rf_model = trained_models["Random Forest"]

feature_importance = pd.DataFrame({
    "Feature": X_train.columns,
    "Importance": rf_model.feature_importances_
})

feature_importance = feature_importance.sort_values(
    by="Importance",
    ascending=False
)

print("\nRandom Forest feature importance:")
print(feature_importance.to_string(index=False))

feature_importance.plot(
    x="Feature",
    y="Importance",
    kind="bar",
    figsize=(12, 6),
    legend=False
)

plt.title("Random Forest Feature Importance")
plt.xlabel("Feature")
plt.ylabel("Importance")
plt.xticks(rotation=45, ha="right")
plt.tight_layout()
plt.show()


# ============================================================
# 13. ROC CURVE AND ROC-AUC - LOGISTIC REGRESSION
# ============================================================

log_reg_model = trained_models["Logistic Regression"]

y_proba = log_reg_model.predict_proba(X_test)[:, 1]

auc_score = roc_auc_score(y_test, y_proba)

RocCurveDisplay.from_predictions(
    y_test,
    y_proba,
    name="Logistic Regression"
)

plt.title(f"Logistic Regression ROC Curve (AUC = {auc_score:.3f})")
plt.tight_layout()
plt.show()

print(f"Logistic Regression ROC-AUC: {auc_score:.4f}")
```

### 7.1 Cara Membaca Hasil Kode Lengkap

Setelah menjalankan notebook, lakukan pemeriksaan berikut:

1. **Dataset shape:** Pastikan jumlah baris dan kolom sesuai dengan file yang digunakan.
2. **Baseline comparison:** Perhatikan perbedaan akurasi ketiga model.
3. **Classification report:** Bandingkan precision, recall, dan F1-score untuk setiap kelas.
4. **Confusion matrix:** Periksa jumlah false positive dan false negative.
5. **Feature importance:** Identifikasi fitur yang memiliki nilai kepentingan relatif tinggi pada Random Forest.
6. **ROC-AUC:** Evaluasi kemampuan Logistic Regression membedakan kelas berdasarkan skor probabilitas.

Model dengan akurasi tertinggi dipilih dalam contoh ini hanya untuk menunjukkan cara meneruskan evaluasi. Dalam penelitian, pemilihan model sebaiknya mempertimbangkan metrik utama yang telah ditentukan, validasi silang, serta kebutuhan aplikasi.

Feature importance Random Forest dan ROC-AUC Logistic Regression juga sengaja dihitung pada model masing-masing. Keduanya merupakan analisis khusus algoritma, bukan bukti bahwa model tersebut pasti menjadi model terbaik.

## 8. Ringkasan Materi

Pada materi ini, kita telah mempelajari:

- Mengevaluasi model baseline menggunakan fungsi `fit_and_score()`.
- Memeriksa peringatan konvergensi pada Logistic Regression.
- Menampilkan perbandingan model menggunakan DataFrame dan grafik batang.
- Memahami keterbatasan akurasi sebagai satu-satunya metrik.
- Mengenal hyperparameter tuning, classification report, confusion matrix, precision, recall, F1-score, feature importance, dan ROC-AUC.
- Menjalankan workflow evaluasi awal menggunakan kode lengkap.
