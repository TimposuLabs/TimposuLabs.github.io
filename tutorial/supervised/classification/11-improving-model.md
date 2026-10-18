---
sidebar_position: 12
title: "Hyperparameter Tuning Manual"
---

Pada materi sebelumnya, kita telah membandingkan tiga model klasifikasi, yaitu Logistic Regression, K-Nearest Neighbors (KNN), dan Random Forest.

Hasil evaluasi baseline memberikan gambaran awal mengenai kemampuan setiap model. Namun, performa model tidak hanya dipengaruhi oleh algoritma yang digunakan, tetapi juga oleh konfigurasi atau *hyperparameter*.

Pada materi ini, kita akan melakukan eksperimen manual terhadap KNN dengan mencoba beberapa nilai `n_neighbors`. Kita akan membandingkan skor training dan testing, membuat visualisasi, serta menentukan langkah eksperimen berikutnya.

Tujuan pembelajaran:

- Memahami konsep hyperparameter tuning.
- Memahami perbedaan underfitting dan overfitting.
- Menguji beberapa nilai `n_neighbors` pada KNN.
- Membandingkan skor training dan testing.
- Memvisualisasikan hasil eksperimen.
- Memahami keterbatasan tuning manual dan alasan menggunakan `RandomizedSearchCV`.

## 1. Evaluasi Model Baseline dan Tantangan Proyek

Pada tahap baseline, kita telah melatih model Logistic Regression, KNN, dan Random Forest.

Misalnya, hasil eksperimen awal menunjukkan bahwa Logistic Regression memberikan akurasi lebih tinggi dibandingkan KNN. Hal tersebut tidak berarti KNN harus langsung dihapus, karena konfigurasi awalnya belum tentu merupakan konfigurasi terbaik.

Dalam skenario proyek ini, kita perlu melakukan beberapa eksperimen lanjutan:

| Eksperimen | Tujuan |
|---|---|
| Hyperparameter tuning | Mencari konfigurasi model yang sesuai |
| Feature importance | Memahami kepentingan fitur menurut metode tertentu |
| Confusion matrix | Memeriksa jenis kesalahan prediksi |
| Cross-validation | Mengukur konsistensi performa pada beberapa pembagian data |
| Precision, recall, dan F1-score | Mengevaluasi kualitas prediksi dari berbagai sudut |
| Classification report | Merangkum metrik untuk setiap kelas |
| ROC Curve dan ROC-AUC | Mengevaluasi kemampuan pemeringkatan kelas berdasarkan skor probabilitas |

Setiap eksperimen menjawab pertanyaan yang berbeda. Hyperparameter tuning berfokus pada konfigurasi model, sedangkan metrik evaluasi membantu kita memahami hasil yang diperoleh.

## 2. Memahami Hyperparameter Tuning

### 2.1 Apa Itu Hyperparameter?

Hyperparameter adalah pengaturan yang ditentukan sebelum atau selama konfigurasi proses pelatihan model. Hyperparameter berbeda dari parameter internal yang dipelajari model dari data.

Contohnya pada KNN:

- `n_neighbors`: jumlah tetangga yang digunakan untuk menentukan prediksi.
- `weights`: cara memberikan bobot kepada tetangga.
- `p`: parameter yang menentukan jenis jarak Minkowski.

Contoh pada Random Forest:

- `n_estimators`: jumlah pohon keputusan.
- `max_depth`: kedalaman maksimum pohon.
- `min_samples_split`: jumlah minimum sampel yang diperlukan untuk membagi suatu simpul.

Contoh pada Logistic Regression:

- `C`: kebalikan dari kekuatan regularisasi.
- `solver`: algoritma optimasi yang digunakan.
- `max_iter`: batas maksimum iterasi optimasi.

Hyperparameter tuning adalah proses mencoba beberapa konfigurasi untuk menemukan konfigurasi yang memberikan performa baik berdasarkan metrik yang ditentukan.

### 2.2 Analogi Memasak

Bayangkan dua orang memasak hidangan dengan resep dan bahan yang sama.

- Orang pertama menggunakan oven pada suhu 180°C dengan mode grill.
- Orang kedua menggunakan suhu 200°C dengan mode kipas.

Walaupun bahan dan resepnya sama, pengaturan oven yang berbeda dapat menghasilkan hidangan yang berbeda.

Hal serupa terjadi pada Machine Learning. Algoritmanya mungkin sama, tetapi konfigurasi hyperparameter yang berbeda dapat menghasilkan performa berbeda.

Analogi ini membantu menjelaskan mengapa kita perlu bereksperimen. Namun, tidak seperti memasak, hasil tuning harus diukur menggunakan prosedur evaluasi yang benar agar tidak sekadar memilih konfigurasi yang kebetulan cocok dengan data tertentu.

### 2.3 Mencari Model yang Tidak Underfitting atau Overfitting

Tujuan tuning bukan sekadar memperoleh skor training set tertinggi. Kita ingin model dapat mempelajari pola yang relevan dan tetap bekerja dengan baik pada data baru.

**Underfitting** terjadi ketika model belum mampu mempelajari pola data secara memadai.

Ciri yang mungkin terlihat:

- Skor training rendah.
- Skor validasi atau testing juga rendah.

**Overfitting** terjadi ketika model terlalu menyesuaikan diri dengan data training sehingga performanya menurun pada data yang tidak digunakan dalam pelatihan.

Ciri yang mungkin terlihat:

- Skor training sangat tinggi.
- Skor validasi atau testing jauh lebih rendah.

Kita ingin memperoleh konfigurasi yang memberikan performa generalisasi baik, bukan hanya skor training yang tinggi.

Perlu diperhatikan bahwa pola skor tersebut merupakan petunjuk, bukan diagnosis pasti. Untuk menilai generalisasi dengan lebih kuat, gunakan validasi silang pada training set.

## 3. Memahami Parameter `n_neighbors` pada KNN

KNN membuat prediksi berdasarkan tetangga terdekat suatu sampel.

Parameter `n_neighbors` menentukan jumlah tetangga yang dipertimbangkan.

Contoh:

```python
from sklearn.neighbors import KNeighborsClassifier

knn_3 = KNeighborsClassifier(n_neighbors=3)
knn_5 = KNeighborsClassifier(n_neighbors=5)
knn_11 = KNeighborsClassifier(n_neighbors=11)
```

Ketiga objek tersebut menggunakan algoritma KNN yang sama, tetapi memiliki konfigurasi berbeda.

### 3.1 Bagaimana Nilai K Memengaruhi Prediksi?

Misalnya, sebuah sampel memiliki tiga tetangga terdekat dengan label:

| Tetangga | Label |
|---|---:|
| Tetangga 1 | 1 |
| Tetangga 2 | 1 |
| Tetangga 3 | 0 |

Jika menggunakan `n_neighbors=3`, kelas mayoritas adalah `1`, sehingga prediksi berdasarkan pemungutan suara mayoritas adalah `1`.

Jika jumlah tetangga ditingkatkan, lebih banyak sampel akan memengaruhi prediksi.

Secara umum:

- Nilai K kecil membuat model lebih sensitif terhadap sampel di sekitarnya.
- Nilai K besar membuat prediksi mempertimbangkan lebih banyak tetangga sehingga batas keputusan dapat menjadi lebih halus.

Nilai K yang terlalu kecil dapat membuat model sensitif terhadap noise. Sebaliknya, nilai K yang terlalu besar dapat menghilangkan pola lokal yang penting.

Dampak sebenarnya bergantung pada dataset, skala fitur, metrik jarak, dan distribusi kelas.

### 3.2 Mengapa KNN Membutuhkan Standardisasi?

KNN menggunakan jarak untuk menentukan tetangga terdekat.

Bayangkan dataset memiliki fitur:

- Usia dengan rentang sekitar 29–77.
- Kolesterol dengan rentang ratusan.
- Denyut jantung maksimum dengan rentang sekitar puluhan hingga ratusan.

Jika fitur tidak distandardisasi, fitur dengan rentang angka besar dapat mendominasi perhitungan jarak.

Untuk mengurangi masalah tersebut, kita dapat menggunakan `StandardScaler`.

```python
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

knn = make_pipeline(
    StandardScaler(),
    KNeighborsClassifier(n_neighbors=5)
)
```

Dengan pipeline, scaler dipelajari dari data training ketika `fit()` dipanggil. Data testing kemudian ditransformasikan menggunakan scaler yang sama tanpa mempelajari statistik baru dari data testing.

## 4. Melakukan Hyperparameter Tuning Manual

Kita akan mencoba nilai `n_neighbors` dari 1 sampai 20.

Untuk setiap nilai K, kita akan:

1. Membuat pipeline standardisasi dan KNN.
2. Melatih model menggunakan training set.
3. Menghitung skor pada training set.
4. Menghitung skor pada test set.
5. Menyimpan hasil ke dalam list.

Untuk pembelajaran, kita menggunakan akurasi sebagai metrik awal. Namun, karena kita akan mencoba banyak konfigurasi, penggunaan test set untuk memilih nilai K dapat membuat hasil evaluasi akhir terlalu optimistis.

**Praktik yang lebih baik:** gunakan validation set atau cross-validation pada training set untuk memilih nilai K. Test set sebaiknya disimpan untuk evaluasi akhir setelah konfigurasi ditentukan.

Pada eksperimen awal berikut, test score digunakan untuk memahami pendekatan tuning manual. Pada penelitian yang lebih kuat, gunakan pendekatan validasi yang dijelaskan di bagian berikutnya.

### 4.1 Menyiapkan List untuk Menyimpan Skor

```python
train_scores = []
test_scores = []
neighbors = range(1, 21)
```

Penjelasan:

- `train_scores` menyimpan akurasi training untuk setiap nilai K.
- `test_scores` menyimpan akurasi testing untuk setiap nilai K.
- `range(1, 21)` menghasilkan bilangan bulat dari 1 sampai 20.

Python tidak memasukkan batas akhir pada fungsi `range()`. Karena itu, `range(1, 21)` menghasilkan 20 nilai.

### 4.2 Membuat Loop Eksperimen

```python
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

for k in neighbors:
    knn = make_pipeline(
        StandardScaler(),
        KNeighborsClassifier(n_neighbors=k)
    )

    knn.fit(X_train, y_train)

    train_scores.append(knn.score(X_train, y_train))
    test_scores.append(knn.score(X_test, y_test))
```

Penjelasan setiap bagian:

| Kode | Penjelasan |
|---|---|
| `for k in neighbors` | Menguji setiap nilai K dari 1 sampai 20 |
| `make_pipeline()` | Menggabungkan standardisasi dan KNN |
| `StandardScaler()` | Menstandardisasi fitur berdasarkan data training |
| `KNeighborsClassifier(n_neighbors=k)` | Membuat model dengan nilai K pada iterasi saat ini |
| `knn.fit(X_train, y_train)` | Melatih pipeline menggunakan data training |
| `knn.score(X_train, y_train)` | Menghitung akurasi training |
| `knn.score(X_test, y_test)` | Menghitung akurasi test |
| `append()` | Menambahkan hasil ke dalam list |

Setiap iterasi membuat objek model baru. Dengan demikian, model pada iterasi sebelumnya tidak digunakan kembali dengan parameter K yang berbeda.

## 5. Membandingkan Skor Training dan Testing

Setelah loop selesai, kita dapat memeriksa hasilnya dalam bentuk tabel.

```python
import pandas as pd

knn_results = pd.DataFrame({
    "n_neighbors": list(neighbors),
    "train_accuracy": train_scores,
    "test_accuracy": test_scores
})

knn_results
```

Tabel tersebut akan menampilkan tiga kolom:

- `n_neighbors`: nilai K yang diuji.
- `train_accuracy`: akurasi pada data training.
- `test_accuracy`: akurasi pada data testing.

Nilai aktual bergantung pada dataset, pembagian data, dan konfigurasi eksperimen. Jangan menganggap contoh nilai dari video sebagai hasil yang pasti muncul pada semua lingkungan.

### 5.1 Mencari Skor Tertinggi

Jika kita menggunakan hasil test score untuk demonstrasi, nilai dengan akurasi tertinggi dapat dicari menggunakan:

```python
best_test_index = test_scores.index(max(test_scores))

print("Best K:", list(neighbors)[best_test_index])
print("Best test accuracy:", test_scores[best_test_index])
```

Kode tersebut mencari nilai K yang memberikan akurasi tertinggi pada list `test_scores`.

Namun, jika kita menggunakan test set untuk memilih K, test set telah ikut memengaruhi keputusan pemodelan. Skor tertinggi tersebut bukan lagi estimasi akhir yang sepenuhnya independen.

Dalam workflow penelitian yang disarankan, pilih K menggunakan validation set atau cross-validation pada training set, kemudian evaluasi model terpilih pada test set satu kali setelah keputusan selesai.

## 6. Memvisualisasikan Hasil Tuning KNN

Grafik membantu kita melihat perubahan skor saat nilai K bertambah.

```python
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))

plt.plot(
    list(neighbors),
    train_scores,
    label="Training Accuracy",
    marker="o"
)

plt.plot(
    list(neighbors),
    test_scores,
    label="Testing Accuracy",
    marker="o"
)

plt.title("KNN Hyperparameter Tuning")
plt.xlabel("Number of Neighbors (K)")
plt.ylabel("Accuracy")
plt.xticks(list(neighbors))
plt.ylim(0, 1)
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

### 6.1 Penjelasan Grafik

- **Sumbu X:** nilai K atau jumlah tetangga.
- **Sumbu Y:** akurasi model.
- **Garis training:** menunjukkan performa pada data yang digunakan untuk melatih model.
- **Garis testing:** menunjukkan performa pada data pengujian yang digunakan dalam eksperimen ini.

Cara membaca grafik:

1. Jika skor training tinggi tetapi skor validasi jauh lebih rendah, model mungkin mengalami overfitting.
2. Jika kedua skor rendah, model mungkin belum mempelajari pola dengan baik.
3. Jika skor validasi meningkat lalu menurun, ada kemungkinan konfigurasi tertentu lebih sesuai daripada konfigurasi lainnya.
4. Jika kedua skor berdekatan, hal tersebut belum otomatis membuktikan model memiliki generalisasi yang baik. Besarnya skor dan stabilitasnya tetap perlu diperiksa.

Dalam workflow yang benar, kurva validasi atau skor cross-validation pada training set lebih tepat digunakan untuk memilih K dibandingkan berulang kali memeriksa test score.

## 7. Apakah KNN Perlu Dihapus dari Eksperimen?

Misalnya, eksperimen menunjukkan bahwa KNN memberikan skor terbaik pada nilai K tertentu, tetapi performanya masih di bawah Logistic Regression atau Random Forest.

Kita dapat mempertimbangkan untuk tidak melanjutkan tuning KNN jika:

- Performa validasinya konsisten lebih rendah.
- Hasilnya tidak memenuhi kebutuhan proyek.
- Biaya eksperimen tambahan tidak sebanding dengan manfaat yang diharapkan.

Namun, keputusan tersebut sebaiknya tidak hanya berdasarkan satu skor test set.

Pertimbangkan pula:

- Hasil cross-validation.
- Precision, recall, dan F1-score.
- Kebutuhan preprocessing.
- Waktu pelatihan dan prediksi.
- Stabilitas hasil pada pembagian data yang berbeda.

KNN tetap dapat berguna pada dataset atau konfigurasi lain. Menghentikan eksperimen KNN hanya merupakan keputusan efisiensi untuk proyek tertentu, bukan bukti bahwa algoritma ini selalu lebih buruk.

## 8. Menggunakan Validation Set dan Cross-Validation

Agar proses pemilihan hyperparameter lebih valid, kita dapat menggunakan cross-validation pada training set.

Dalam K-fold cross-validation:

1. Training set dibagi menjadi beberapa bagian (*fold*).
2. Model dilatih pada sebagian fold.
3. Fold yang tersisa digunakan untuk validasi.
4. Proses diulang sampai setiap fold mendapat giliran menjadi data validasi.
5. Skor dari beberapa fold diringkas, misalnya dengan menghitung rata-ratanya.

Pendekatan ini membantu mengurangi ketergantungan hasil terhadap satu pembagian validation set.

Contoh evaluasi KNN dengan cross-validation:

```python
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

knn_pipeline = make_pipeline(
    StandardScaler(),
    KNeighborsClassifier(n_neighbors=11)
)

cv_scores = cross_val_score(
    knn_pipeline,
    X_train,
    y_train,
    cv=5,
    scoring="accuracy"
)

print("Cross-validation scores:", cv_scores)
print("Mean CV accuracy:", cv_scores.mean())
print("Standard deviation:", cv_scores.std())
```

Penjelasan:

- `cv=5` menggunakan lima fold.
- `scoring="accuracy"` menentukan metrik yang dihitung.
- `cv_scores.mean()` menghitung rata-rata akurasi antar-fold.
- `cv_scores.std()` menunjukkan seberapa bervariasi skor antar-fold.

Nilai rata-rata memberikan gambaran performa validasi, sedangkan standar deviasi membantu melihat variasi skor. Hasil ini tetap harus ditafsirkan sesuai ukuran dan karakteristik dataset.

## 9. Mengapa Menggunakan RandomizedSearchCV?

Loop manual mudah dipahami untuk satu hyperparameter, tetapi menjadi kurang efisien jika kita ingin menguji banyak parameter dan kombinasi.

Misalnya, kita ingin menguji:

- Beberapa nilai `n_neighbors`.
- Beberapa nilai `weights`.
- Beberapa nilai `p`.

Jika setiap parameter memiliki banyak pilihan, jumlah kombinasi dapat meningkat dengan cepat.

Scikit-Learn menyediakan `RandomizedSearchCV` untuk mengambil sejumlah kombinasi hyperparameter dari ruang pencarian dan mengevaluasinya menggunakan cross-validation.

Keuntungannya:

- Mengurangi kebutuhan menulis loop secara manual.
- Mendukung pencarian banyak hyperparameter sekaligus.
- Mengintegrasikan cross-validation.
- Memudahkan perbandingan konfigurasi berdasarkan metrik yang dipilih.

RandomizedSearchCV tidak menjamin menemukan konfigurasi terbaik secara mutlak. Hasilnya bergantung pada ruang pencarian, jumlah kombinasi yang dicoba, metrik, dan data.

## 10. Contoh Kode Lengkap: Manual KNN Tuning dan Cross-Validation

Kode berikut dapat dijalankan sebagai satu bagian dalam Jupyter Notebook. Pastikan file `heart-disease.csv` tersedia di direktori kerja notebook.

Kode menggunakan training set untuk membandingkan konfigurasi KNN melalui cross-validation. Setelah konfigurasi dipilih, model dilatih pada seluruh training set dan dievaluasi pada test set.

```python
# ============================================================
# 1. IMPORT LIBRARIES
# ============================================================

import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import (
    train_test_split,
    cross_val_score
)

from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    ConfusionMatrixDisplay
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

print("\nTraining shape:", X_train.shape)
print("Testing shape:", X_test.shape)


# ============================================================
# 5. MANUAL KNN TUNING
#    Use cross-validation on training data
# ============================================================

neighbors = range(1, 21)

train_scores = []
cv_mean_scores = []
cv_std_scores = []

for k in neighbors:
    knn_pipeline = make_pipeline(
        StandardScaler(),
        KNeighborsClassifier(n_neighbors=k)
    )

    # Training accuracy for diagnostic purposes
    knn_pipeline.fit(X_train, y_train)
    train_scores.append(
        knn_pipeline.score(X_train, y_train)
    )

    # Cross-validation uses training data only
    cv_scores = cross_val_score(
        knn_pipeline,
        X_train,
        y_train,
        cv=5,
        scoring="accuracy"
    )

    cv_mean_scores.append(cv_scores.mean())
    cv_std_scores.append(cv_scores.std())


# ============================================================
# 6. CREATE RESULTS TABLE
# ============================================================

knn_results = pd.DataFrame({
    "n_neighbors": list(neighbors),
    "train_accuracy": train_scores,
    "cv_mean_accuracy": cv_mean_scores,
    "cv_std_accuracy": cv_std_scores
})

print("\nKNN tuning results:")
print(knn_results.to_string(index=False))


# ============================================================
# 7. VISUALIZE TRAINING AND CV ACCURACY
# ============================================================

plt.figure(figsize=(10, 6))

plt.plot(
    list(neighbors),
    train_scores,
    marker="o",
    label="Training Accuracy"
)

plt.plot(
    list(neighbors),
    cv_mean_scores,
    marker="o",
    label="Mean CV Accuracy"
)

plt.fill_between(
    list(neighbors),
    [
        mean - std
        for mean, std in zip(cv_mean_scores, cv_std_scores)
    ],
    [
        mean + std
        for mean, std in zip(cv_mean_scores, cv_std_scores)
    ],
    alpha=0.15,
    label="CV Mean ± 1 SD"
)

plt.title("KNN Manual Hyperparameter Tuning")
plt.xlabel("Number of Neighbors (K)")
plt.ylabel("Accuracy")
plt.xticks(list(neighbors))
plt.ylim(0, 1)
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()


# ============================================================
# 8. SELECT K USING CROSS-VALIDATION
# ============================================================

best_index = max(
    range(len(cv_mean_scores)),
    key=cv_mean_scores.__getitem__
)

best_k = list(neighbors)[best_index]
best_cv_score = cv_mean_scores[best_index]

print("\nBest K based on mean CV accuracy:", best_k)
print(f"Best mean CV accuracy: {best_cv_score:.4f}")


# ============================================================
# 9. TRAIN FINAL KNN MODEL ON TRAINING SET
# ============================================================

best_knn = make_pipeline(
    StandardScaler(),
    KNeighborsClassifier(n_neighbors=best_k)
)

best_knn.fit(X_train, y_train)


# ============================================================
# 10. FINAL TEST EVALUATION
# ============================================================

y_pred = best_knn.predict(X_test)

test_accuracy = accuracy_score(y_test, y_pred)

print(f"\nFinal test accuracy: {test_accuracy:.4f}")

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        y_pred,
        zero_division=0
    )
)


# ============================================================
# 11. CONFUSION MATRIX
# ============================================================

ConfusionMatrixDisplay.from_predictions(
    y_test,
    y_pred,
    cmap="Blues"
)

plt.title(f"KNN Confusion Matrix (K={best_k})")
plt.tight_layout()
plt.show()
```

### 10.1 Memahami Hasil Eksperimen

Setelah kode dijalankan, periksa hasilnya secara berurutan:

1. **Tabel tuning:** Bandingkan skor training dengan rata-rata cross-validation untuk setiap nilai K.
2. **Grafik:** Amati perubahan skor training dan validasi saat K bertambah.
3. **Nilai K terbaik:** Perhatikan konfigurasi yang memperoleh rata-rata akurasi cross-validation tertinggi.
4. **Final test accuracy:** Evaluasi model terpilih pada test set yang tidak digunakan untuk memilih K.
5. **Classification report:** Periksa precision, recall, dan F1-score untuk masing-masing kelas.
6. **Confusion matrix:** Identifikasi jumlah prediksi benar dan kesalahan untuk setiap kelas.

Kode ini memilih nilai K berdasarkan rata-rata akurasi cross-validation. Jika penelitian lebih mengutamakan recall kelas positif atau metrik lain, ganti `scoring="accuracy"` dengan metrik yang sesuai dan tentukan pilihan tersebut sebelum eksperimen.

Pemilihan konfigurasi berdasarkan hasil validasi tetap perlu mempertimbangkan variasi skor. Jika beberapa konfigurasi memiliki performa hampir sama, model yang lebih sederhana atau lebih stabil dapat menjadi pilihan yang masuk akal.

## 11. Ringkasan Materi

Pada materi ini, kita telah mempelajari:

- Konsep hyperparameter tuning dan analoginya.
- Perbedaan hyperparameter dan parameter model.
- Pengaruh `n_neighbors` terhadap prediksi KNN.
- Pentingnya standardisasi fitur untuk KNN.
- Eksperimen manual menggunakan loop.
- Perbandingan skor training dan testing.
- Visualisasi hasil tuning dengan Matplotlib.
- Keterbatasan memilih parameter berdasarkan test set.
- Penggunaan cross-validation untuk memilih konfigurasi.
- Peran `RandomizedSearchCV` dalam mengotomatisasi pencarian hyperparameter.
