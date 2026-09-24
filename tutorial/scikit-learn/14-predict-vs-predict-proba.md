---
sidebar_position: 14
title: "predict() vs predict_proba()"
---

Setelah mempelajari cara melakukan training menggunakan `.fit()` dan membuat prediksi menggunakan `.predict()`, kita perlu memahami lebih dalam perbedaan antara:

```python
predict()
```

dan:

```python
predict_proba()
```

Keduanya digunakan untuk mendapatkan hasil dari model classification, tetapi informasi yang diberikan berbeda.

Secara sederhana:

```text
                 Model Terlatih
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
         predict()       predict_proba()
              │                 │
              ▼                 ▼
        Label Kelas        Probabilitas
```

Contohnya:

```text
predict()
→ 1
```

sedangkan:

```text
predict_proba()
→ [0.20, 0.80]
```

Artinya, `predict()` memberikan **hasil kelas**, sedangkan `predict_proba()` memberikan **estimasi probabilitas untuk setiap kelas** jika estimator tersebut mendukung method tersebut.

## Posisi dalam Workflow Scikit-Learn

Workflow machine learning classification yang telah kita pelajari:

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

Pada tahap **Make Predictions**, kita dapat menggunakan:

```python
predict()
```

atau:

```python
predict_proba()
```

tergantung informasi yang kita butuhkan.

## Apa Itu `predict()`?

Method:

```python
predict()
```

digunakan untuk menghasilkan **label prediksi** dari model.

Contohnya:

```python
y_preds = clf.predict(X_test)
```

Jika model melakukan binary classification, hasilnya dapat berupa:

```text
[0, 1, 1, 0, 1]
```

Setiap nilai mewakili kelas yang diprediksi untuk satu sampel.

Misalnya:

```text
0 → Tidak memiliki penyakit
1 → Memiliki penyakit
```

Maka:

```text
[0, 1, 1, 0, 1]
```

dapat dibaca sebagai:

```text
Sampel 1 → Kelas 0
Sampel 2 → Kelas 1
Sampel 3 → Kelas 1
Sampel 4 → Kelas 0
Sampel 5 → Kelas 1
```

## Contoh Penggunaan `predict()`

Misalnya kita memiliki:

```python
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier(
    random_state=42
)

clf.fit(X_train, y_train)
```

Setelah model selesai dilatih:

```python
y_preds = clf.predict(X_test)
```

Kemudian:

```python
print(y_preds[:10])
```

Contoh output:

```text
[1 0 1 1 0 0 1 0 1 1]
```

Output tersebut merupakan **label hasil prediksi**.

## `predict()` Menghasilkan Keputusan Kelas

Secara sederhana:

```text
Input Data
    ↓
  Model
    ↓
Evaluasi pola
    ↓
Prediksi kelas
```

Misalnya:

```text
Data Pasien
     ↓
Random Forest
     ↓
  Kelas 1
```

Model memberikan keputusan akhir berupa kelas.

## Apakah `predict()` Selalu Menggunakan Threshold 0.5?

Tidak selalu.

Ini merupakan konsep penting yang perlu diperhatikan.

Sering kali pada binary classification, kita menjelaskan prediksi menggunakan threshold:

```text
Probabilitas kelas 1 ≥ 0.5
        ↓
      Kelas 1

Probabilitas kelas 1 < 0.5
        ↓
      Kelas 0
```

Penjelasan tersebut berguna sebagai ilustrasi dasar.

Namun, secara teknis, **cara `predict()` menentukan kelas bergantung pada estimator yang digunakan**.

Tidak semua classifier melakukan proses:

```text
predict_proba()
      ↓
threshold 0.5
      ↓
predict()
```

dengan mekanisme yang persis sama.

Karena itu, jangan menganggap bahwa `predict()` selalu identik dengan menerapkan threshold `0.5` pada output `predict_proba()`.

## Apa Itu `predict_proba()`?

Method:

```python
predict_proba()
```

digunakan untuk mendapatkan **estimasi probabilitas untuk setiap kelas**.

Contohnya:

```python
probabilities = clf.predict_proba(X_test)
```

Hasilnya dapat berupa:

```text
[
    [0.89, 0.11],
    [0.20, 0.80],
    [0.45, 0.55]
]
```

Setiap baris mewakili satu sampel.

Setiap kolom mewakili satu kelas.

## Memahami Output `predict_proba()`

Sebelum membaca output probabilitas, periksa kelas yang digunakan model:

```python
print(clf.classes_)
```

Misalnya:

```text
[0 1]
```

Maka output:

```text
[0.89, 0.11]
```

dapat dibaca sebagai:

```text
Kelas 0 → 89%
Kelas 1 → 11%
```

Sedangkan:

```text
[0.20, 0.80]
```

berarti:

```text
Kelas 0 → 20%
Kelas 1 → 80%
```

Dan:

```text
[0.45, 0.55]
```

berarti:

```text
Kelas 0 → 45%
Kelas 1 → 55%
```

## Jumlah Probabilitas

Untuk satu sampel, probabilitas seluruh kelas umumnya berjumlah:

```text
1.0
```

atau:

```text
100%
```

Contoh:

```text
0.89 + 0.11 = 1.00
```

Contoh lainnya:

```text
0.20 + 0.80 = 1.00
```

Untuk binary classification:

```text
P(Kelas 0) + P(Kelas 1) = 1
```

Secara umum untuk multiclass classification:

$$
\sum_{k=1}^{K} P(y=k \mid x) = 1
$$

dengan:

- $K$ = jumlah kelas
- $P(y=k \mid x)$ = probabilitas sampel $x$ berada pada kelas $k$

## Contoh Binary Classification

Misalnya kita memiliki model untuk memprediksi penyakit:

```text
0 → Tidak memiliki penyakit
1 → Memiliki penyakit
```

Model menghasilkan:

```text
[0.89, 0.11]
```

Dengan:

```python
clf.classes_
```

menghasilkan:

```text
[0 1]
```

Maka:

```text
Kelas 0 → 89%
Kelas 1 → 11%
```

Prediksi kelasnya dapat berupa:

```text
0
```

Sedangkan model lain mungkin menghasilkan:

```text
[0.10, 0.90]
```

yang berarti:

```text
Kelas 0 → 10%
Kelas 1 → 90%
```

dan prediksinya dapat berupa:

```text
1
```

## Contoh Probabilitas yang Berdekatan dengan 50%

Perhatikan:

```text
[0.49, 0.51]
```

Jika:

```python
clf.classes_
```

adalah:

```text
[0 1]
```

maka:

```text
Kelas 0 → 49%
Kelas 1 → 51%
```

Model memberikan probabilitas yang sangat berdekatan.

Dalam konteks analisis sederhana, kondisi seperti ini dapat dianggap sebagai prediksi yang **kurang tegas** dibandingkan:

```text
[0.01, 0.99]
```

Namun, probabilitas tersebut bukan ukuran universal tentang "seberapa benar" model.

Interpretasi probabilitas harus mempertimbangkan **kalibrasi model** dan karakteristik estimator.

## Membandingkan `predict()` dan `predict_proba()`

Perhatikan contoh berikut:

```python
prediction = clf.predict(X_test[:1])

probability = clf.predict_proba(X_test[:1])

print(prediction)
print(probability)
```

Misalnya hasil:

```text
Prediction:
[1]

Probability:
[[0.20 0.80]]
```

Kita dapat membacanya:

```text
Prediction
→ Kelas 1

Probability
→ Kelas 0: 20%
→ Kelas 1: 80%
```

Dengan demikian, kedua method memberikan informasi yang berbeda.

## Tabel Perbandingan

| Fitur | `predict()` | `predict_proba()` |
|---|---|---|
| Output | Label kelas | Probabilitas setiap kelas |
| Contoh | `1` | `[0.20, 0.80]` |
| Informasi | Keputusan kelas | Distribusi probabilitas |
| Cocok untuk | Hasil klasifikasi langsung | Analisis probabilitas |
| Threshold | Bergantung pada estimator | Dapat digunakan untuk analisis threshold |
| Ketersediaan | Umumnya tersedia pada classifier | Tidak semua estimator menyediakan |

## Mengetahui Urutan Kelas

Salah satu kesalahan yang sering terjadi adalah langsung menganggap:

```text
Kolom pertama → kelas 0
Kolom kedua → kelas 1
```

Walaupun sering demikian pada binary classification, cara yang aman adalah memeriksa:

```python
clf.classes_
```

Contohnya:

```python
print(clf.classes_)
```

Jika output:

```text
[0 1]
```

maka:

```text
Kolom pertama → kelas 0
Kolom kedua → kelas 1
```

Jika model memiliki kelas:

```text
[1 2 3]
```

maka:

```text
Kolom pertama → kelas 1
Kolom kedua → kelas 2
Kolom ketiga → kelas 3
```

## Contoh Multiclass Classification

Misalnya model memiliki tiga kelas:

```text
0 → Kucing
1 → Anjing
2 → Burung
```

dan:

```python
clf.classes_
```

menghasilkan:

```text
[0 1 2]
```

Kemudian:

```python
clf.predict_proba(X_test[:1])
```

menghasilkan:

```text
[[0.10, 0.75, 0.15]]
```

Maka:

```text
Kelas 0 → 10%
Kelas 1 → 75%
Kelas 2 → 15%
```

Prediksi kelas dapat berupa:

```text
1
```

Karena kelas `1` memiliki probabilitas terbesar pada contoh tersebut.

## Mengapa `predict_proba()` Berguna?

`predict()` hanya memberikan:

```text
1
```

Sedangkan `predict_proba()` memberikan informasi yang lebih lengkap:

```text
Kelas 0 → 20%
Kelas 1 → 80%
```

Informasi tambahan tersebut dapat digunakan untuk berbagai kebutuhan analisis.

Misalnya kita ingin mengetahui:

```text
Apakah model memberikan prediksi yang sangat tegas?
```

atau:

```text
Apakah terdapat sampel yang probabilitasnya hampir seimbang?
```

## Analisis Ketidakpastian

Salah satu penggunaan `predict_proba()` adalah menganalisis prediksi yang memiliki probabilitas relatif berdekatan.

Misalnya:

```text
[0.50, 0.50]
```

atau:

```text
[0.49, 0.51]
```

Model memberikan distribusi probabilitas yang relatif seimbang.

Bandingkan dengan:

```text
[0.01, 0.99]
```

Dalam analisis sederhana, prediksi kedua terlihat jauh lebih tegas.

Kita dapat mencari sampel seperti ini untuk dianalisis lebih lanjut.

## Contoh Mencari Prediksi yang Kurang Tegas

Misalnya binary classification.

Kita dapat mengambil probabilitas kelas `1`:

```python
probability_class_1 = clf.predict_proba(X_test)[:, 1]
```

Kemudian melihat beberapa nilai:

```python
print(probability_class_1[:10])
```

Contoh:

```text
[0.92, 0.15, 0.51, 0.87, 0.49, 0.03]
```

Nilai yang dekat dengan `0.5` dapat menjadi kandidat untuk dianalisis lebih lanjut.

## Menghitung Jarak dari 0.5

Untuk mencari probabilitas yang paling dekat dengan 0.5:

```python
distance_from_05 = np.abs(
    probability_class_1 - 0.5
)
```

Kemudian:

```python
uncertain_index = distance_from_05.argsort()[:5]
```

Kita dapat melihat:

```python
print(probability_class_1[uncertain_index])
```

Contohnya:

```text
[0.49, 0.51, 0.48, 0.53, 0.46]
```

Sampel tersebut dapat diperiksa lebih lanjut.

## Threshold Tuning

Dalam beberapa aplikasi, kita mungkin tidak ingin menggunakan threshold default yang biasa digunakan dalam konteks binary classification.

Misalnya:

```text
Threshold = 0.50
```

Kita dapat menganalisis threshold lain:

```text
0.30
0.40
0.50
0.60
0.70
0.80
```

Misalnya kita mengambil probabilitas kelas `1`:

```python
probability_class_1 = clf.predict_proba(X_test)[:, 1]
```

Kemudian membuat keputusan berdasarkan threshold tertentu:

```python
threshold = 0.70

y_preds_custom = (
    probability_class_1 >= threshold
).astype(int)
```

Dengan demikian:

```text
Probability ≥ 0.70
        ↓
      Kelas 1

Probability < 0.70
        ↓
      Kelas 0
```

Perlu diperhatikan bahwa threshold seperti ini adalah **aturan keputusan yang kita tetapkan**, bukan berarti `predict()` dari semua classifier menggunakan threshold tersebut secara internal.

## Mengapa Threshold Bisa Diubah?

Threshold dapat digunakan ketika biaya kesalahan antar kelas tidak sama.

Misalnya:

```text
False Positive
vs
False Negative
```

memiliki konsekuensi yang berbeda.

Dalam situasi tertentu, kita mungkin lebih mementingkan:

```text
Recall
```

daripada:

```text
Precision
```

atau sebaliknya.

Karena itu, threshold dapat menjadi bagian dari proses optimasi sistem classification.

## Contoh Konteks Medis

Misalnya sebuah model digunakan sebagai sistem pendukung keputusan medis.

Model menghasilkan:

```text
Penyakit = 0.55
```

Jika kita hanya menggunakan:

```python
predict()
```

kita mungkin hanya melihat:

```text
1
```

Tetapi `predict_proba()` memungkinkan kita melihat:

```text
Penyakit → 55%
Tidak penyakit → 45%
```

Informasi ini dapat digunakan sebagai salah satu informasi tambahan untuk sistem pendukung keputusan.

Namun, **probabilitas model tidak boleh dianggap sebagai diagnosis medis**.

Dalam sistem nyata, threshold dan interpretasi output harus divalidasi secara menyeluruh sesuai tujuan klinis, kualitas data, dan konsekuensi kesalahan.

## Contoh Sistem Berbasis Threshold

Misalnya sebuah sistem membutuhkan probabilitas minimal:

```text
0.90
```

Kita dapat membuat aturan:

```python
probability_class_1 = clf.predict_proba(X_new)[:, 1]

threshold = 0.90

prediction = (
    probability_class_1 >= threshold
).astype(int)
```

Interpretasinya:

```text
Probability ≥ 0.90
        ↓
Prediksi kelas 1

Probability < 0.90
        ↓
Tidak memberikan keputusan kelas 1
```

Namun, jangan mengartikan:

```text
0.90 = 90% pasti benar
```

Threshold `0.90` hanya merupakan aturan keputusan berdasarkan output probabilitas model.

Jika sistem membutuhkan probabilitas yang dapat dipercaya, **calibration** perlu dievaluasi.

## Analisis Confidence vs Probability

Dalam pembelajaran machine learning, sering digunakan istilah:

```text
confidence
```

untuk menggambarkan seberapa besar probabilitas suatu kelas.

Namun, secara teknis:

```text
Probability output
≠
Jaminan model benar
```

Misalnya:

```text
Probability = 0.95
```

tidak otomatis berarti model memiliki tingkat kebenaran 95% untuk sampel tersebut.

Model yang terkalibrasi dengan baik memiliki interpretasi probabilitas yang lebih dapat diandalkan.

## Contoh Lengkap

Berikut contoh lengkap penggunaan `predict()` dan `predict_proba()`.

```python
import numpy as np
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# 1. Load data
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

# 6. Prediksi kelas
y_preds = clf.predict(X_test)

# 7. Probabilitas
y_probs = clf.predict_proba(X_test)

# 8. Lihat urutan kelas
print("Classes:")
print(clf.classes_)

# 9. Evaluasi accuracy
accuracy = accuracy_score(
    y_test,
    y_preds
)

print(f"Accuracy: {accuracy:.3f}")

# 10. Tampilkan beberapa hasil
print("Predictions:")
print(y_preds[:5])

print("Probabilities:")
print(y_probs[:5])
```

## Membuat Tabel Prediksi

Agar lebih mudah dianalisis, hasil prediction dan probability dapat digabungkan ke dalam DataFrame.

```python
results = pd.DataFrame({
    "actual": y_test.to_numpy(),
    "prediction": y_preds,
    "prob_class_0": y_probs[:, 0],
    "prob_class_1": y_probs[:, 1]
})

print(results.head())
```

Contoh struktur hasil:

| Actual | Prediction | Prob Class 0 | Prob Class 1 |
|---:|---:|---:|---:|
| 1 | 1 | 0.15 | 0.85 |
| 0 | 0 | 0.92 | 0.08 |
| 1 | 1 | 0.20 | 0.80 |
| 0 | 1 | 0.40 | 0.60 |
| 1 | 0 | 0.55 | 0.45 |

Dengan tabel tersebut kita dapat melihat:

- Nilai aktual.
- Prediksi model.
- Probabilitas setiap kelas.
- Sampel yang salah diprediksi.
- Sampel dengan probabilitas yang relatif dekat.

## Perbandingan Sederhana

Bayangkan terdapat dua prediksi:

```text
Prediksi A
Kelas 1 → 51%
Kelas 0 → 49%
```

dan:

```text
Prediksi B
Kelas 1 → 99%
Kelas 0 → 1%
```

Keduanya dapat menghasilkan:

```text
predict() → 1
```

Tetapi informasi dari:

```text
predict_proba()
```

sangat berbeda.

```text
A → [0.49, 0.51]

B → [0.01, 0.99]
```

Inilah salah satu alasan mengapa `predict_proba()` berguna untuk analisis lebih lanjut.

## Kapan Menggunakan `predict()`?

Gunakan:

```python
predict()
```

ketika kita membutuhkan **label hasil klasifikasi**.

Contohnya:

```text
Spam
Non-Spam
```

atau:

```text
0
1
```

atau:

```text
Kelas A
Kelas B
Kelas C
```

Contoh:

```python
prediction = clf.predict(X_new)
```

## Kapan Menggunakan `predict_proba()`?

Gunakan:

```python
predict_proba()
```

ketika kita membutuhkan:

- Probabilitas setiap kelas.
- Analisis ketidakpastian.
- Analisis threshold.
- Ranking berdasarkan probabilitas.
- Evaluasi calibration.
- Informasi tambahan sebelum mengambil keputusan berdasarkan aturan tertentu.

Contoh:

```python
probability = clf.predict_proba(X_new)
```

## Catatan Penting tentang `predict_proba()`

Tidak semua estimator menyediakan:

```python
predict_proba()
```

Karena itu, kita perlu memeriksa estimator yang digunakan.

Jika method tersebut tidak tersedia, kita tidak dapat langsung memanggilnya.

Beberapa estimator juga menyediakan:

```python
decision_function()
```

yang menghasilkan decision score, tetapi **decision score bukan hal yang sama dengan probabilitas**.

## Ringkasan

Pada materi ini kita telah mempelajari perbedaan `predict()` dan `predict_proba()`.

### `predict()`

```python
clf.predict(X_test)
```

Menghasilkan:

```text
Label kelas
```

Contoh:

```text
[0, 1, 1, 0, 1]
```

### `predict_proba()`

```python
clf.predict_proba(X_test)
```

Menghasilkan:

```text
Probabilitas setiap kelas
```

Contoh:

```text
[
    [0.89, 0.11],
    [0.20, 0.80],
    [0.49, 0.51]
]
```

Perbedaan sederhananya:

```text
predict()
↓
"Apa kelas prediksinya?"

predict_proba()
↓
"Bagaimana distribusi probabilitas
untuk setiap kelas?"
```

Hal penting lainnya:

1. `predict()` menghasilkan label kelas.
2. `predict_proba()` menghasilkan estimasi probabilitas kelas jika estimator mendukungnya.
3. Gunakan `clf.classes_` untuk mengetahui urutan kelas pada output probabilitas.
4. Probabilitas seluruh kelas untuk satu sampel umumnya berjumlah `1`.
5. Probabilitas yang dekat dengan `0.5` pada binary classification dapat menjadi kandidat untuk analisis lebih lanjut.
6. Threshold dapat diubah jika kebutuhan aplikasi memerlukannya.
7. Threshold bukan berarti probabilitas tersebut adalah jaminan model benar.
8. Kualitas interpretasi probabilitas berkaitan dengan calibration.
9. Tidak semua classifier menyediakan `predict_proba()`.
10. `decision_function()` menghasilkan decision score, bukan otomatis probabilitas.

## Tantangan Eksperimen

Gunakan dataset Heart Disease dan lakukan eksperimen berikut.

### Tantangan 1 - Bandingkan `predict()` dan `predict_proba()`

Jalankan:

```python
predictions = clf.predict(X_test[:10])
probabilities = clf.predict_proba(X_test[:10])

print("Predictions:")
print(predictions)

print("Probabilities:")
print(probabilities)
```

Coba hubungkan setiap prediction dengan probabilitasnya.

### Tantangan 2 - Periksa Kelas

Jalankan:

```python
print(clf.classes_)
```

Kemudian tentukan kolom mana yang mewakili masing-masing kelas.

### Tantangan 3 - Cari Sampel yang Kurang Tegas

Ambil probabilitas kelas `1`:

```python
probability_class_1 = clf.predict_proba(
    X_test
)[:, 1]
```

Kemudian cari nilai yang paling dekat dengan `0.5`.

```python
distance = np.abs(
    probability_class_1 - 0.5
)

indices = distance.argsort()[:10]

print(probability_class_1[indices])
```

Analisis mengapa sampel tersebut memiliki probabilitas yang relatif berdekatan.

### Tantangan 4 - Eksperimen dengan Threshold

Bandingkan hasil menggunakan threshold:

```text
0.30
0.50
0.70
0.90
```

Untuk setiap threshold, hitung confusion matrix, precision, recall, dan F1-score.

Tujuan latihan ini bukan sekadar mencari threshold terbesar, tetapi memahami **trade-off** yang terjadi ketika threshold diubah.
