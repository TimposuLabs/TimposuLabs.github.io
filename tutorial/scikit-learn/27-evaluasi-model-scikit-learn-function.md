---
sidebar_position: 28
title: "Evaluasi Model dengan Function sklearn.metrics"
---

Dalam proses Machine Learning, setelah model selesai dilatih dan menghasilkan prediksi, kita perlu mengetahui **seberapa baik performa model tersebut**.

Sebelumnya kita telah mempelajari beberapa cara untuk melakukan evaluasi model:

1. Menggunakan metode bawaan model seperti `.score()`.
2. Menggunakan parameter `scoring` pada `cross_val_score()`.
3. Menggunakan fungsi evaluasi dari modul `sklearn.metrics`.

Pada materi ini kita akan fokus pada cara ketiga, yaitu menggunakan berbagai fungsi yang tersedia di:

```python
sklearn.metrics
```

Pendekatan ini memberikan kontrol yang lebih jelas terhadap metrik yang ingin digunakan untuk mengevaluasi model.

Secara umum, proses evaluasi dapat digambarkan sebagai:

```text
Data
  │
  ├── X_test
  │
  └── y_test
       │
       ▼
     Model
       │
       ▼
   y_pred / y_preds
       │
       ▼
┌──────────────────────┐
│   sklearn.metrics    │
├──────────────────────┤
│ Accuracy             │
│ Precision            │
│ Recall               │
│ F1                   │
│ R²                   │
│ MAE                  │
│ MSE                  │
└──────────────────────┘
       │
       ▼
 Evaluation Score
```

---

## Modul `sklearn.metrics`

Scikit-Learn menyediakan berbagai fungsi evaluasi melalui modul:

```python
sklearn.metrics
```

Kita dapat mengimpor fungsi yang diperlukan secara langsung.

Contoh:

```python
from sklearn.metrics import accuracy_score
```

Atau beberapa fungsi sekaligus:

```python
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)
```

Untuk regresi:

```python
from sklearn.metrics import (
    r2_score,
    mean_absolute_error,
    mean_squared_error
)
```

---

## Konsep Dasar `y_true` dan `y_pred`

Hampir semua fungsi evaluasi pada `sklearn.metrics` bekerja dengan membandingkan dua hal:

```text
y_true
   │
   │ dibandingkan
   ▼
y_pred
```

### `y_true`

`y_true` adalah nilai sebenarnya atau ground truth.

Biasanya berasal dari:

```python
y_test
```

### `y_pred`

`y_pred` adalah hasil prediksi model.

Biasanya diperoleh dari:

```python
y_preds = model.predict(X_test)
```

Contohnya:

```python
y_preds = clf.predict(X_test)
```

Kemudian:

```python
accuracy_score(y_test, y_preds)
```

Artinya:

```text
y_test
  ↓
Nilai sebenarnya

y_preds
  ↓
Nilai prediksi model

       ↓

accuracy_score()
       ↓
   Evaluasi
```

---

## Classification Metrics

Classification metrics digunakan untuk mengevaluasi model yang menghasilkan **kelas atau label diskrit**.

Contohnya:

```text
0 = Tidak memiliki penyakit
1 = Memiliki penyakit
```

atau:

```text
0 = Tidak spam
1 = Spam
```

Beberapa metrik klasifikasi yang umum digunakan:

| Fungsi | Metrik |
|---|---|
| `accuracy_score()` | Accuracy |
| `precision_score()` | Precision |
| `recall_score()` | Recall |
| `f1_score()` | F1-score |

---

### `accuracy_score()`

Accuracy mengukur proporsi prediksi yang benar dibandingkan dengan seluruh data.

Rumus:

$$
Accuracy = \frac{TP + TN}{TP + TN + FP + FN}
$$

Keterangan:

- `TP` = True Positive
- `TN` = True Negative
- `FP` = False Positive
- `FN` = False Negative

Contoh:

```python
from sklearn.metrics import accuracy_score

accuracy = accuracy_score(
    y_test,
    y_preds
)

print(accuracy)
```

Jika hasil:

```text
0.82
```

maka model memiliki accuracy sebesar:

```text
82%
```

Untuk menampilkan sebagai persentase:

```python
print(f"Accuracy: {accuracy * 100:.2f}%")
```

Output:

```text
Accuracy: 82.00%
```

---

### `precision_score()`

Precision menjawab pertanyaan:

> Dari seluruh data yang diprediksi sebagai positif, berapa banyak yang benar-benar positif?

Rumus:

$$
Precision = \frac{TP}{TP + FP}
$$

Precision sangat berkaitan dengan **False Positive**.

Jika False Positive tinggi, precision akan menurun.

Contoh:

```python
from sklearn.metrics import precision_score

precision = precision_score(
    y_test,
    y_preds
)

print(f"Precision: {precision:.2f}")
```

Misalnya:

```text
Precision: 0.85
```

Artinya, sekitar 85% dari prediksi positif model merupakan prediksi positif yang benar.

---

### `recall_score()`

Recall menjawab pertanyaan:

> Dari seluruh data yang sebenarnya positif, berapa banyak yang berhasil ditemukan oleh model?

Rumus:

$$
Recall = \frac{TP}{TP + FN}
$$

Recall sangat berkaitan dengan **False Negative**.

Jika False Negative tinggi, recall akan menurun.

Contoh:

```python
from sklearn.metrics import recall_score

recall = recall_score(
    y_test,
    y_preds
)

print(f"Recall: {recall:.2f}")
```

Misalnya:

```text
Recall: 0.80
```

Artinya, model berhasil menemukan sekitar 80% dari seluruh kasus positif yang sebenarnya.

---

### `f1_score()`

F1-score merupakan harmonic mean antara precision dan recall.

Rumus:

$$
F1 = 2 \times \frac{Precision \times Recall}{Precision + Recall}
$$

F1-score berguna ketika kita ingin mempertimbangkan precision dan recall secara bersamaan.

Contoh:

```python
from sklearn.metrics import f1_score

f1 = f1_score(
    y_test,
    y_preds
)

print(f"F1 Score: {f1:.2f}")
```

Misalnya:

```text
F1 Score: 0.82
```

F1-score tidak hanya melihat jumlah prediksi benar secara keseluruhan, tetapi juga mempertimbangkan keseimbangan antara precision dan recall.

---

### Workflow Evaluasi Classification

Secara umum, workflow klasifikasi menggunakan `sklearn.metrics` adalah:

```text
Dataset
   │
   ▼
Pisahkan X dan y
   │
   ▼
Train/Test Split
   │
   ├── X_train
   ├── X_test
   ├── y_train
   └── y_test
        │
        ▼
     Training
        │
        ▼
      Model
        │
        ▼
     predict()
        │
        ▼
     y_preds
        │
        ▼
 sklearn.metrics
        │
        ├── Accuracy
        ├── Precision
        ├── Recall
        └── F1
```

---

### Contoh Lengkap Classification

Berikut contoh workflow lengkap menggunakan `RandomForestClassifier`.

```python
import numpy as np

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)
from sklearn.model_selection import train_test_split

# 1. Menyiapkan data
np.random.seed(42)

X = heart_disease.drop("target", axis=1)
y = heart_disease["target"]

# 2. Membagi data train dan test
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# 3. Membuat model
clf = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

# 4. Training model
clf.fit(X_train, y_train)

# 5. Membuat prediksi
y_preds = clf.predict(X_test)

# 6. Menghitung evaluation metrics
accuracy = accuracy_score(y_test, y_preds)
precision = precision_score(y_test, y_preds)
recall = recall_score(y_test, y_preds)
f1 = f1_score(y_test, y_preds)

# 7. Menampilkan hasil
print("Metrik Evaluasi Klasifikasi")
print(f"Accuracy : {accuracy * 100:.2f}%")
print(f"Precision: {precision:.2f}")
print(f"Recall   : {recall:.2f}")
print(f"F1 Score : {f1:.2f}")
```

Contoh output:

```text
Metrik Evaluasi Klasifikasi
Accuracy : 82.00%
Precision: 0.84
Recall   : 0.81
F1 Score : 0.82
```

Nilai tersebut hanya contoh. Hasil aktual bergantung pada dataset, pembagian data, model, dan konfigurasi yang digunakan.

---

## Regression Metrics

Regression metrics digunakan untuk mengevaluasi model yang menghasilkan **nilai kontinu**.

Contohnya:

```text
Prediksi harga rumah
Prediksi suhu
Prediksi penjualan
Prediksi jumlah permintaan
Prediksi waktu
```

Beberapa metrik regresi yang umum digunakan:

| Fungsi | Metrik |
|---|---|
| `r2_score()` | R² |
| `mean_absolute_error()` | MAE |
| `mean_squared_error()` | MSE |

---

### `r2_score()`

R² atau **Coefficient of Determination** mengukur seberapa baik variasi pada target dapat dijelaskan oleh model dibandingkan dengan baseline berupa prediksi rata-rata target.

Contoh:

```python
from sklearn.metrics import r2_score

r2 = r2_score(
    y_test,
    y_preds
)

print(f"R² Score: {r2:.4f}")
```

Interpretasi umum:

```text
R² = 1
```

berarti prediksi sempurna pada data evaluasi.

```text
R² = 0
```

berarti performa model setara dengan baseline yang selalu memprediksi rata-rata target.

Pada data evaluasi yang tidak terlihat sebelumnya, R² juga dapat bernilai negatif.

Contohnya:

```text
R² = -0.25
```

Ini menunjukkan bahwa model memiliki performa yang lebih buruk daripada baseline prediksi rata-rata menurut definisi R² pada data evaluasi tersebut.

---

### `mean_absolute_error()`

MAE atau **Mean Absolute Error** menghitung rata-rata nilai absolut dari error prediksi.

Rumus:

$$
MAE = \frac{1}{n}\sum_{i=1}^{n}|y_i-\hat{y}_i|
$$

Contoh:

```python
from sklearn.metrics import mean_absolute_error

mae = mean_absolute_error(
    y_test,
    y_preds
)

print(f"MAE: {mae:.4f}")
```

Misalnya:

```text
MAE: 2.3145
```

Artinya, rata-rata absolute error prediksi adalah sekitar 2.31 satuan target.

Jika target adalah harga rumah dalam juta rupiah, maka interpretasinya mengikuti satuan target tersebut.

MAE memiliki karakteristik:

```text
MAE lebih kecil → lebih baik
MAE = 0         → prediksi sempurna
```

---

### `mean_squared_error()`

MSE atau **Mean Squared Error** menghitung rata-rata kuadrat error.

Rumus:

$$
MSE = \frac{1}{n}\sum_{i=1}^{n}(y_i-\hat{y}_i)^2
$$

Contoh:

```python
from sklearn.metrics import mean_squared_error

mse = mean_squared_error(
    y_test,
    y_preds
)

print(f"MSE: {mse:.4f}")
```

MSE memberikan penalti lebih besar terhadap error yang besar karena error dikuadratkan.

Contoh:

```text
Error = 2
Squared Error = 4
```

sedangkan:

```text
Error = 10
Squared Error = 100
```

Oleh karena itu, MSE lebih sensitif terhadap error besar dibandingkan MAE.

Karakteristik MSE:

```text
MSE lebih kecil → lebih baik
MSE = 0         → prediksi sempurna
```

---

### RMSE dari MSE

Jika kita ingin mengubah MSE kembali ke skala target, kita dapat menggunakan akar kuadrat:

$$
RMSE = \sqrt{MSE}
$$

Contoh:

```python
import numpy as np

rmse = np.sqrt(mse)

print(f"RMSE: {rmse:.4f}")
```

Misalnya:

```text
MSE  = 9.00
RMSE = 3.00
```

RMSE memiliki satuan yang sama dengan target sehingga sering lebih mudah diinterpretasikan dibandingkan MSE.

---

### Workflow Evaluasi Regression

Workflow regresi menggunakan `sklearn.metrics` dapat digambarkan sebagai:

```text
Dataset
   │
   ▼
Pisahkan X dan y
   │
   ▼
Train/Test Split
   │
   ├── X_train
   ├── X_test
   ├── y_train
   └── y_test
        │
        ▼
     Training
        │
        ▼
      Model
        │
        ▼
     predict()
        │
        ▼
     y_preds
        │
        ▼
 sklearn.metrics
        │
        ├── R²
        ├── MAE
        ├── MSE
        └── RMSE
```

---

### Contoh Lengkap Regression

Berikut contoh menggunakan `RandomForestRegressor`.

```python
import numpy as np

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import (
    r2_score,
    mean_absolute_error,
    mean_squared_error
)
from sklearn.model_selection import train_test_split

# 1. Menyiapkan data
np.random.seed(42)

X = housing_df.drop("target", axis=1)
y = housing_df["target"]

# 2. Membagi data train dan test
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# 3. Membuat model
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

# 4. Training model
model.fit(X_train, y_train)

# 5. Membuat prediksi
y_preds = model.predict(X_test)

# 6. Menghitung evaluation metrics
r2 = r2_score(y_test, y_preds)
mae = mean_absolute_error(y_test, y_preds)
mse = mean_squared_error(y_test, y_preds)
rmse = np.sqrt(mse)

# 7. Menampilkan hasil
print("Metrik Evaluasi Regresi")
print(f"R²  : {r2:.4f}")
print(f"MAE : {mae:.4f}")
print(f"MSE : {mse:.4f}")
print(f"RMSE: {rmse:.4f}")
```

Contoh output:

```text
Metrik Evaluasi Regresi
R²  : 0.7800
MAE : 2.3100
MSE : 8.4200
RMSE: 2.9017
```

Nilai tersebut hanya contoh untuk menunjukkan format hasil evaluasi.

---

## Single Train/Test Split vs Cross-Validation

Terdapat perbedaan penting antara evaluasi menggunakan satu kali train/test split dan cross-validation.

| Evaluasi | Cara Kerja | Kelebihan | Kekurangan |
|---|---|---|---|
| Single Train/Test Split | Model dievaluasi pada satu test set | Cepat dan sederhana | Hasil dapat bergantung pada pembagian data |
| Cross-Validation | Model dievaluasi pada beberapa fold | Memberikan beberapa hasil evaluasi dan gambaran performa yang lebih stabil | Membutuhkan komputasi lebih banyak |

---

### Single Train/Test Split

Pada single train/test split, dataset dibagi satu kali.

Contoh:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

Kemudian model dilatih:

```python
model.fit(X_train, y_train)
```

Dan dievaluasi:

```python
y_preds = model.predict(X_test)

r2 = r2_score(y_test, y_preds)
```

Alurnya:

```text
Dataset
   │
   ▼
Train/Test Split
   │
   ├── Training Data
   │       ↓
   │     Model
   │       ↓
   │
   └── Test Data
           ↓
       Evaluation
```

Kelebihan pendekatan ini adalah sederhana dan cepat.

Kekurangannya adalah hasil evaluasi dapat berubah jika pembagian data berubah.

---

### Cross-Validation

Pada cross-validation, dataset dibagi menjadi beberapa fold.

Misalnya:

```python
from sklearn.model_selection import cross_val_score

scores = cross_val_score(
    model,
    X,
    y,
    cv=5,
    scoring="r2"
)
```

Model dievaluasi sebanyak 5 kali.

Contoh hasil:

```text
Fold 1 → 0.74
Fold 2 → 0.79
Fold 3 → 0.76
Fold 4 → 0.81
Fold 5 → 0.77
```

Kemudian kita dapat menghitung rata-rata:

```python
np.mean(scores)
```

Contoh:

```text
0.774
```

Cross-validation memberikan beberapa hasil evaluasi sehingga kita dapat melihat variasi performa antar-fold.

---

## Hubungan `sklearn.metrics` dengan Cross-Validation

Kedua pendekatan ini sebenarnya tidak saling bertentangan.

`sklearn.metrics` dapat digunakan untuk mengevaluasi hasil prediksi secara langsung:

```python
y_preds = model.predict(X_test)

accuracy_score(y_test, y_preds)
```

Sedangkan `cross_val_score()` mengotomatisasi proses evaluasi pada beberapa fold:

```python
cross_val_score(
    model,
    X,
    y,
    cv=5,
    scoring="accuracy"
)
```

Secara sederhana:

```text
sklearn.metrics
      │
      ▼
y_true + y_pred
      │
      ▼
Satu hasil evaluasi
```

Sedangkan:

```text
cross_val_score()
      │
      ▼
 Beberapa fold
      │
      ▼
   Scoring
      │
      ▼
Beberapa hasil evaluasi
```

---

## Kapan Menggunakan `sklearn.metrics`?

Fungsi `sklearn.metrics` sangat berguna ketika kita ingin mengetahui performa model pada hasil prediksi tertentu.

Contohnya:

```python
y_preds = model.predict(X_test)

accuracy_score(y_test, y_preds)
```

Kita juga dapat menghitung beberapa metrik sekaligus:

```python
accuracy_score(y_test, y_preds)
precision_score(y_test, y_preds)
recall_score(y_test, y_preds)
f1_score(y_test, y_preds)
```

Untuk regresi:

```python
r2_score(y_test, y_preds)
mean_absolute_error(y_test, y_preds)
mean_squared_error(y_test, y_preds)
```

Dengan demikian, kita dapat memilih sendiri metrik yang ingin dianalisis.

---

## Memilih Metrik Berdasarkan Problem

Tidak ada satu metrik yang selalu paling tepat untuk semua permasalahan.

### Classification

Jika ingin mengetahui proporsi prediksi yang benar secara keseluruhan:

```text
Accuracy
```

Jika biaya False Positive penting:

```text
Precision
```

Jika biaya False Negative penting:

```text
Recall
```

Jika ingin melihat keseimbangan precision dan recall:

```text
F1-score
```

Pemilihan metrik tetap harus mempertimbangkan karakteristik dataset dan tujuan aplikasi.

---

### Regression

Jika ingin mengukur proporsi variasi target yang dijelaskan model:

```text
R²
```

Jika ingin mengetahui rata-rata besar absolute error dalam satuan target:

```text
MAE
```

Jika ingin memberikan penalti lebih besar terhadap error yang besar:

```text
MSE
```

Jika ingin penalti seperti MSE tetapi hasil kembali ke satuan target:

```text
RMSE
```

---

## Perbedaan Tiga Cara Evaluasi Scikit-Learn

Dalam workflow Machine Learning, kita sekarang telah mempelajari tiga pendekatan evaluasi.

### 1. `.score()`

Menggunakan metode bawaan estimator.

Contoh:

```python
model.score(X_test, y_test)
```

Metrik yang digunakan bergantung pada estimator.

---

### 2. `scoring` pada Cross-Validation

Digunakan bersama fungsi seperti:

```python
cross_val_score()
```

Contoh:

```python
cross_val_score(
    model,
    X,
    y,
    cv=5,
    scoring="accuracy"
)
```

Pendekatan ini memungkinkan kita menentukan metrik sekaligus melakukan cross-validation.

---

### 3. `sklearn.metrics`

Menggunakan fungsi metrik secara langsung.

Contoh:

```python
y_preds = model.predict(X_test)

accuracy_score(y_test, y_preds)
```

Pendekatan ini sangat fleksibel karena kita dapat menghitung beberapa metrik berdasarkan prediksi yang sama.

---

## Tabel Perbandingan

| Pendekatan | Contoh | Fokus |
|---|---|---|
| `.score()` | `model.score()` | Scorer default estimator |
| `scoring` | `cross_val_score(..., scoring="f1")` | Evaluasi dengan cross-validation |
| `sklearn.metrics` | `f1_score(y_test, y_preds)` | Menghitung metrik secara langsung |

Ketiganya dapat digunakan dalam workflow Machine Learning yang berbeda sesuai kebutuhan.

---

## Penting: Evaluasi Harus Menggunakan Data yang Tepat

Pada evaluasi menggunakan test set, model seharusnya tidak dilatih menggunakan data test.

Workflow yang benar:

```text
Dataset
   │
   ▼
Train/Test Split
   │
   ├── Training Data
   │       │
   │       ▼
   │     Model
   │       │
   │       ▼
   │
   └── Test Data
           │
           ▼
        Predict
           │
           ▼
         y_pred
           │
           ▼
     sklearn.metrics
```

Jangan melakukan:

```python
model.fit(X_test, y_test)
```

kemudian menggunakan data yang sama untuk mengklaim performa pada test set.

Test set seharusnya digunakan untuk evaluasi terhadap data yang tidak digunakan dalam proses training model.

---

## Kebiasaan Penting dalam Evaluasi Model

### Selalu Bandingkan `y_true` dan `y_pred`

Sebagian besar fungsi metric menggunakan pola:

```python
metric_function(
    y_true,
    y_pred
)
```

Contoh:

```python
accuracy_score(y_test, y_preds)
```

atau:

```python
mean_absolute_error(y_test, y_preds)
```

---

### Gunakan Nama Variabel yang Jelas

Daripada:

```python
a = model.predict(X_test)
```

lebih baik:

```python
y_preds = model.predict(X_test)
```

Karena nama tersebut langsung menunjukkan bahwa variabel berisi hasil prediksi.

---

### Gunakan Random State

Untuk eksperimen yang dapat direproduksi:

```python
train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

Dan untuk model yang memiliki randomization:

```python
RandomForestClassifier(
    n_estimators=100,
    random_state=42
)
```

Dengan demikian, eksperimen lebih mudah diulang dan dibandingkan.

---

## Membaca Dokumentasi `sklearn.metrics`

Scikit-Learn memiliki banyak fungsi evaluasi.

Ketika membutuhkan metrik tertentu, biasakan mencari dokumentasi resmi dan memahami:

- Nama fungsi
- Parameter
- Return value
- Cara interpretasi
- Apakah metrik mendukung binary classification
- Apakah mendukung multiclass
- Apakah memerlukan parameter tambahan
- Apakah nilai lebih tinggi atau lebih rendah yang lebih baik

Contoh pola pencarian fungsi:

```python
from sklearn.metrics import nama_metric
```

Kemudian gunakan:

```python
nama_metric(y_true, y_pred)
```

Namun tidak semua metric memiliki signature yang sama, sehingga dokumentasi tetap perlu diperiksa sebelum digunakan.

:::tip
**Baca Dokumentasi:** https://scikit-learn.org/stable/api/sklearn.metrics.html
:::

---

## Ringkasan

Pada materi ini kita mempelajari cara ketiga untuk melakukan evaluasi model Scikit-Learn, yaitu menggunakan fungsi-fungsi dari:

```python
sklearn.metrics
```

Untuk classification, beberapa fungsi penting adalah:

```python
accuracy_score()
precision_score()
recall_score()
f1_score()
```

Untuk regression:

```python
r2_score()
mean_absolute_error()
mean_squared_error()
```

Pola dasarnya adalah:

```python
y_preds = model.predict(X_test)

metric_function(
    y_test,
    y_preds
)
```

---

## Cheat Sheet Classification

```python
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)

y_preds = clf.predict(X_test)

accuracy = accuracy_score(y_test, y_preds)
precision = precision_score(y_test, y_preds)
recall = recall_score(y_test, y_preds)
f1 = f1_score(y_test, y_preds)
```

---

## Cheat Sheet Regression

```python
from sklearn.metrics import (
    r2_score,
    mean_absolute_error,
    mean_squared_error
)

y_preds = model.predict(X_test)

r2 = r2_score(y_test, y_preds)
mae = mean_absolute_error(y_test, y_preds)
mse = mean_squared_error(y_test, y_preds)
```

Jika membutuhkan RMSE:

```python
import numpy as np

rmse = np.sqrt(mse)
```

---

## Key Takeaways

Hal-hal penting yang perlu diingat:

1. `sklearn.metrics` menyediakan fungsi evaluasi yang dapat digunakan secara langsung.
2. Evaluasi dilakukan dengan membandingkan `y_true` dengan `y_pred`.
3. `accuracy_score()` digunakan untuk menghitung accuracy.
4. `precision_score()` digunakan untuk menghitung precision.
5. `recall_score()` digunakan untuk menghitung recall.
6. `f1_score()` digunakan untuk menghitung F1-score.
7. `r2_score()` digunakan untuk menghitung R².
8. `mean_absolute_error()` digunakan untuk menghitung MAE.
9. `mean_squared_error()` digunakan untuk menghitung MSE.
10. Single train/test split lebih sederhana dan cepat, tetapi hasilnya bergantung pada pembagian data.
11. Cross-validation mengevaluasi model pada beberapa fold sehingga memberikan beberapa hasil evaluasi.
12. Tidak ada satu metrik yang selalu paling tepat; pemilihan metrik harus disesuaikan dengan tujuan problem.
13. Dokumentasi Scikit-Learn merupakan referensi penting untuk mengetahui fungsi metric dan parameter yang tersedia.

## Kesimpulan

Evaluasi model merupakan bagian penting dari workflow Machine Learning.

Setelah model menghasilkan prediksi:

```python
y_preds = model.predict(X_test)
```

kita dapat menggunakan `sklearn.metrics` untuk mengetahui kualitas prediksi tersebut.

Untuk classification:

```text
Accuracy
Precision
Recall
F1-score
```

Untuk regression:

```text
R²
MAE
MSE
RMSE
```

Dengan memahami berbagai metrik tersebut, kita tidak hanya mengetahui apakah model menghasilkan prediksi, tetapi juga dapat memahami **seberapa baik model bekerja dan dari sisi mana performanya perlu diperbaiki**.

Pada tahap berikutnya, metrik-metrik ini akan menjadi dasar untuk membandingkan model, memilih model yang sesuai, dan melakukan optimasi terhadap performa Machine Learning.

## Referensi

* https://scikit-learn.org/stable/modules/model_evaluation.html
* https://scikit-learn.org/stable/api/sklearn.metrics.html
