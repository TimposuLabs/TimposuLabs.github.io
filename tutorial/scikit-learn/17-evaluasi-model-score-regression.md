---
sidebar_position: 18
title: "Evaluasi Model: Score (Regression)"
---

Setelah memahami penggunaan `score()` pada Scikit-Learn, langkah berikutnya adalah memahami bagaimana membaca **test score**, khususnya pada model regresi.

Dalam Machine Learning, kita tidak hanya ingin mengetahui apakah model mampu mempelajari data training.

Kita juga ingin mengetahui:

> Seberapa baik model bekerja pada data yang belum pernah digunakan saat proses training?

Data tersebut biasanya direpresentasikan sebagai **test set**.

Pada materi ini kita akan menggunakan `RandomForestRegressor` sebagai contoh untuk memahami:

- Perbedaan training score dan test score
- Pentingnya test score
- Pengaruh `n_estimators`
- Penggunaan `.score()` pada model regresi
- R² atau Coefficient of Determination
- Interpretasi nilai R²
- Independent variable dan dependent variable
- Hubungan antara `X` dan `y`

---

## Training Score vs Test Score

Ketika sebuah model Machine Learning dilatih, dataset biasanya dibagi menjadi:

```text
Dataset
   │
   ├───────────────┐
   ▼               ▼
Training Set     Test Set
   │               │
   ▼               │
  fit()            │
   │               │
   ▼               │
Trained Model ─────┘
         │
         ▼
       score()
```

Training set digunakan untuk melatih model.

Test set disimpan dan tidak digunakan dalam proses fitting.

Dengan demikian, test set dapat digunakan untuk mengukur bagaimana model bekerja pada data yang belum digunakan saat training.

---

## Mengapa Test Score Penting?

Misalnya sebuah model mendapatkan:

```text
Training Score = 0.98
```

Angka tersebut terlihat sangat baik.

Namun, jika:

```text
Test Score = 0.65
```

maka terdapat perbedaan performa yang cukup besar.

Hal tersebut dapat menjadi indikasi bahwa model memiliki kemampuan yang lebih baik pada data training dibandingkan data baru.

Sebaliknya, jika performanya relatif dekat:

```text
Training Score = 0.82
Test Score     = 0.80
```

maka hasil tersebut memberikan gambaran yang berbeda mengenai generalisasi model.

Perlu diperhatikan bahwa perbedaan training dan test score harus dianalisis bersama konteks dataset, ukuran data, variasi data, dan kompleksitas model.

---

## Test Set sebagai Simulasi Data Dunia Nyata

Salah satu tujuan penggunaan test set adalah mensimulasikan data yang akan diterima model setelah model digunakan dalam aplikasi nyata.

Misalnya kita membuat model untuk memprediksi harga rumah.

Data yang tersedia:

```text
Data Historis
     │
     ▼
Train-Test Split
     │
     ├───────────────┐
     ▼               ▼
Training Data     Test Data
     │               │
     ▼               ▼
Training          Evaluation
     │
     ▼
Trained Model
     │
     ▼
Data Baru
```

Training data digunakan untuk membangun model.

Test data digunakan untuk mengevaluasi model sebelum digunakan pada data baru.

---

## Jangan Menggunakan Test Set untuk Training

Test set sebaiknya tetap terpisah dari proses fitting model.

Contoh workflow yang benar:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model.fit(X_train, y_train)

test_score = model.score(X_test, y_test)
```

Perhatikan bahwa:

```python
model.fit(X_train, y_train)
```

hanya menggunakan training data.

Kemudian:

```python
model.score(X_test, y_test)
```

digunakan untuk mengevaluasi model pada test data.

---

## RandomForestRegressor

Untuk memahami evaluasi regresi, kita dapat menggunakan:

```python
from sklearn.ensemble import RandomForestRegressor
```

Kemudian membuat model:

```python
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)
```

Random Forest merupakan algoritma ensemble yang terdiri dari banyak decision tree.

```text
Random Forest
      │
      ├── Decision Tree 1
      ├── Decision Tree 2
      ├── Decision Tree 3
      ├── ...
      └── Decision Tree N
               │
               ▼
          Prediksi Gabungan
```

![Random Forest](https://miro.medium.com/v2/1*R3oJiyaQwyLUyLZL-scDpw.png)

*Sumber: https://medium.com/@denizgunay/random-forest-af5bde5d7e1e*

Parameter `n_estimators` menentukan jumlah tree yang digunakan dalam ensemble.

---

## Apa Itu `n_estimators`?

Pada Random Forest:

```python
n_estimators=100
```

berarti model menggunakan 100 decision tree.

Contoh lainnya:

```python
n_estimators=10
```

berarti:

```text
10 decision trees
```

Sedangkan:

```python
n_estimators=500
```

berarti:

```text
500 decision trees
```

Semakin banyak tree, proses training dan prediksi umumnya membutuhkan lebih banyak sumber daya.

---

## Eksperimen dengan `n_estimators`

Kita dapat menguji beberapa nilai `n_estimators`.

```python
from sklearn.ensemble import RandomForestRegressor

for n in [2, 10, 50, 100]:

    model = RandomForestRegressor(
        n_estimators=n,
        random_state=42
    )

    model.fit(X_train, y_train)

    score = model.score(X_test, y_test)

    print(
        f"n_estimators={n}, "
        f"R²={score:.3f}"
    )
```

Hasil sebenarnya akan bergantung pada dataset, pembagian data, random state, versi Scikit-Learn, dan konfigurasi model.

Contoh ilustrasi:

```text
n_estimators=2    → R² = 0.70
n_estimators=10   → R² = 0.78
n_estimators=50   → R² = 0.80
n_estimators=100  → R² = 0.80
```

Angka tersebut hanya contoh untuk menunjukkan pola eksperimen, bukan hasil yang selalu diperoleh.

---

## Mengapa Menambah Estimator Dapat Meningkatkan Performa?

Random Forest merupakan ensemble.

Daripada hanya menggunakan satu decision tree:

```text
Tree 1
  │
  ▼
Prediction
```

Random Forest menggunakan banyak tree:

```text
Tree 1 ───┐
Tree 2 ───┤
Tree 3 ───┤
Tree 4 ───┼──► Combined Prediction
Tree 5 ───┤
Tree N ───┘
```

Penggabungan banyak tree dapat membuat prediksi ensemble menjadi lebih stabil dibandingkan menggunakan satu tree saja.

Namun, peningkatan jumlah tree tidak menjamin peningkatan skor secara terus-menerus.

---

## Diminishing Returns

Dalam eksperimen, kita mungkin melihat pola seperti:

```text
2 trees
   ↓
10 trees
   ↓
50 trees
   ↓
100 trees
   ↓
500 trees
```

Pada awalnya, penambahan tree mungkin memberikan peningkatan performa yang cukup terlihat.

Namun setelah jumlah tree tertentu, peningkatan performa dapat menjadi semakin kecil.

Contohnya:

```text
10 trees  → R² 0.78
50 trees  → R² 0.80
100 trees → R² 0.80
200 trees → R² 0.80
```

Dalam kondisi seperti ini, menambah jumlah tree dari 100 menjadi 200 belum tentu memberikan peningkatan yang berarti.

---

## Trade-Off Performa dan Waktu Komputasi

Jumlah estimator juga berkaitan dengan waktu komputasi.

Secara umum:

```text
Jumlah Tree ↑
      │
      ├── Training time dapat ↑
      ├── Prediction time dapat ↑
      └── Memory usage dapat ↑
```

Oleh karena itu, kita tidak hanya mengejar jumlah tree sebanyak mungkin.

Kita juga perlu mempertimbangkan:

- Performa
- Waktu training
- Waktu inference
- Penggunaan memory
- Kebutuhan aplikasi

---

## Mengukur Waktu Training

Kita dapat menggunakan modul `time` untuk melakukan eksperimen sederhana.

```python
import time
from sklearn.ensemble import RandomForestRegressor

for n in [10, 50, 100, 200]:

    start_time = time.perf_counter()

    model = RandomForestRegressor(
        n_estimators=n,
        random_state=42
    )

    model.fit(X_train, y_train)

    end_time = time.perf_counter()

    score = model.score(X_test, y_test)

    print(
        f"n_estimators={n}, "
        f"R²={score:.3f}, "
        f"time={end_time - start_time:.3f}s"
    )
```

Hasilnya dapat digunakan untuk membandingkan:

```text
Model
│
├── Performance
│
└── Computational Cost
```

Perlu diingat bahwa waktu eksekusi sangat dipengaruhi oleh hardware, ukuran dataset, konfigurasi parallelism, dan lingkungan Python.

---

## `score()` pada RandomForestRegressor

Setelah model dilatih:

```python
model.fit(X_train, y_train)
```

kita dapat menggunakan:

```python
model.score(X_test, y_test)
```

Pada `RandomForestRegressor`, `.score()` menggunakan **R²** sebagai metrik default.

Contoh:

```python
score = model.score(X_test, y_test)

print(f"R² Score: {score}")
```

---

## Apa Itu R²?

R² disebut:

- R-squared
- Coefficient of Determination
- Koefisien Determinasi

R² digunakan untuk mengevaluasi model regresi.

Secara umum, R² memberikan informasi tentang seberapa baik prediksi model menjelaskan variasi pada target dibandingkan baseline berupa prediksi nilai rata-rata target.

---

## Rumus R²

Rumus R² adalah:

$$
R^2 = 1 - \frac{SS_{res}}{SS_{tot}}
$$

dengan:

$$
SS_{res} = \sum (y_i-\hat{y}_i)^2
$$

dan:

$$
SS_{tot} = \sum (y_i-\bar{y})^2
$$

Keterangan:

- `yᵢ` = nilai aktual
- `ŷᵢ` = nilai prediksi
- `ȳ` = rata-rata nilai target
- `SSres` = residual sum of squares
- `SStot` = total sum of squares

---

## Interpretasi R²

Secara sederhana:

```text
R² mendekati 1
```

menunjukkan bahwa model memiliki performa yang lebih baik dalam menjelaskan variasi target dibandingkan baseline.

Sedangkan:

```text
R² = 0
```

berarti performa model setara dengan baseline yang selalu memprediksi rata-rata target, berdasarkan definisi R² tersebut.

---

## R² = 1

Jika:

```text
R² = 1.0
```

berarti prediksi model pada data evaluasi cocok sempurna dengan nilai aktual sehingga residual sum of squares bernilai nol.

Secara matematis:

$$
SS_{res}=0
$$

sehingga:

$$
R^2=1
$$

Namun, dalam Machine Learning, mendapatkan R² = 1 pada test set perlu dipahami dalam konteks dataset dan proses evaluasi.

Jika hasil sempurna terlihat tidak wajar, periksa kemungkinan:

- Data leakage
- Duplikasi data
- Test set terlalu kecil
- Masalah pada preprocessing
- Fitur yang secara tidak sengaja mengandung informasi target

---

## R² = 0

Jika:

```text
R² = 0
```

model memiliki performa yang setara dengan baseline yang memprediksi rata-rata target pada data evaluasi.

Misalnya rata-rata target adalah:

```text
50
```

Baseline akan memprediksi:

```text
50
50
50
50
...
```

untuk setiap sampel.

Jika model memperoleh R² sekitar 0, model belum memberikan peningkatan dalam menjelaskan variasi target dibandingkan baseline tersebut.

---

## Apakah R² Selalu Berada antara 0 dan 1?

Tidak.

Ini merupakan hal penting yang perlu diperhatikan.

Pada data evaluasi seperti test set, R² dapat bernilai negatif.

Contohnya:

```text
R² = -0.25
```

Nilai negatif dapat terjadi ketika model memiliki performa lebih buruk daripada baseline yang digunakan dalam definisi R².

Jadi, jangan menganggap:

```text
0 ≤ R² ≤ 1
```

sebagai aturan universal untuk hasil evaluasi pada data baru.

Secara umum:

```text
R² = 1
    → perfect fit pada data evaluasi

R² = 0
    → setara dengan baseline mean

R² < 0
    → lebih buruk daripada baseline tersebut
```

---

## Contoh Interpretasi R²

Misalnya kita mendapatkan:

```text
R² = 0.80
```

Secara sederhana, kita dapat mengatakan bahwa model menjelaskan sekitar 80% variasi target relatif terhadap baseline mean pada dataset evaluasi yang digunakan.

Namun, interpretasi R² tidak sama dengan mengatakan:

> Model memprediksi setiap nilai dengan akurasi 80%.

Pernyataan tersebut tidak tepat.

R² bukan persentase prediksi yang benar.

---

## R² vs Accuracy

Jangan menyamakan:

```text
R² = 0.80
```

dengan:

```text
Accuracy = 80%
```

Keduanya merupakan konsep berbeda.

### Classification

Classification sering menggunakan:

```text
Accuracy
Precision
Recall
F1-Score
ROC-AUC
```

### Regression

Regression dapat menggunakan:

```text
R²
MAE
MSE
RMSE
```

Contohnya:

```text
Classification
       │
       ▼
Accuracy = 0.80
       │
       ▼
80% prediksi benar
```

Sedangkan:

```text
  Regression
       │
       ▼
   R² = 0.80
       │
       ▼
Bukan berarti 80% prediksi benar
```

---

## Menggabungkan R² dengan MAE

R² bukan satu-satunya metrik untuk mengevaluasi regresi.

Kita dapat menggunakan R² bersama MAE.

```python
from sklearn.metrics import mean_absolute_error

y_preds = model.predict(X_test)

r2 = model.score(X_test, y_test)

mae = mean_absolute_error(
    y_test,
    y_preds
)

print(f"R²: {r2:.3f}")
print(f"MAE: {mae:.3f}")
```

Kedua metrik memberikan perspektif yang berbeda.

```text
R²
│
└── Menilai seberapa baik model menjelaskan variasi target

MAE
│
└── Menilai rata-rata absolute error prediksi
```

---

## Independent Variable dan Dependent Variable

Dalam Machine Learning, kita sering menemukan istilah:

- Independent variable
- Dependent variable

Dalam konteks supervised learning:

```text
Independent Variables
        │
        ▼
     Features
        │
        ▼
        X
```

Sedangkan:

```text
Dependent Variable
        │
        ▼
       Target
        │
        ▼
        y
```

---

## Independent Variable

**Independent variable** adalah variabel input yang digunakan untuk membantu model memprediksi target.

Dalam Machine Learning biasanya disebut:

- Feature
- Predictor
- Input variable
- Independent variable

Contoh dataset rumah:

| Feature |
|---|
| Median Income |
| House Age |
| Average Rooms |
| Population |
| Average Occupancy |

Variabel-variabel tersebut dapat digunakan sebagai fitur:

```python
X
```

---

## Dependent Variable

**Dependent variable** merupakan variabel yang ingin diprediksi.

Dalam Machine Learning biasanya disebut:

- Target
- Label
- Output
- Dependent variable

Misalnya:

```text
Harga Rumah
```

maka:

```python
y
```

berisi harga rumah yang ingin diprediksi.

---

## Hubungan `X` dan `y`

Secara sederhana:

```text
X
│
├── Feature 1
├── Feature 2
├── Feature 3
├── Feature 4
└── Feature 5
       │
       ▼
 Machine Learning Model
       │
       ▼
       y
```

Model mencoba mempelajari hubungan antara:

```text
X → y
```

Misalnya:

```text
Median Income
House Age
Average Rooms
Population
       │
       ▼
Random Forest Regressor
       │
       ▼
House Value
```

---

## Contoh Menentukan `X` dan `y`

Misalnya kita memiliki DataFrame:

```python
housing_df.head()
```

dengan kolom:

```text
MedInc
HouseAge
AveRooms
AveBedrms
Population
AveOccup
Latitude
Longitude
target
```

Kita dapat menentukan:

```python
X = housing_df.drop("target", axis=1)

y = housing_df["target"]
```

Dengan demikian:

```text
X
│
├── MedInc
├── HouseAge
├── AveRooms
├── AveBedrms
├── Population
├── AveOccup
├── Latitude
└── Longitude

y
│
└── target
```

---

## Workflow Lengkap Random Forest Regression

Workflow yang dipelajari dapat dirangkum menjadi:

```text
Dataset
   │
   ▼
Tentukan X dan y
   │
   ▼
Train-Test Split
   │
   ├────────────────┐
   ▼                ▼
X_train, y_train  X_test, y_test
   │                │
   ▼                │
Random Forest       │
   │                │
   ▼                │
fit()               │
   │                │
   ▼                │
Trained Model ──────┘
         │
         ▼
      predict()
         │
         ▼
      y_preds
         │
         ▼
    Evaluation
         │
      ┌──┴──┐
      ▼     ▼
     R²     MAE
```

---

## Contoh Lengkap

Berikut contoh implementasi lengkap menggunakan Random Forest Regressor.

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split

# 1. Menentukan features dan target
X = housing_df.drop("target", axis=1)
y = housing_df["target"]

# 2. Membagi dataset
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

# 4. Melatih model
model.fit(X_train, y_train)

# 5. Menghitung training score
train_score = model.score(
    X_train,
    y_train
)

# 6. Menghitung test score
test_score = model.score(
    X_test,
    y_test
)

# 7. Membuat prediksi
y_preds = model.predict(X_test)

# 8. Menghitung MAE
mae = mean_absolute_error(
    y_test,
    y_preds
)

print(f"Training R²: {train_score:.3f}")
print(f"Test R²: {test_score:.3f}")
print(f"MAE: {mae:.3f}")
```

---

## Eksperimen Beberapa `n_estimators`

Untuk memahami pengaruh jumlah tree, kita dapat membuat eksperimen.

```python
from sklearn.ensemble import RandomForestRegressor

results = []

for n in [2, 10, 50, 100, 200]:

    model = RandomForestRegressor(
        n_estimators=n,
        random_state=42
    )

    model.fit(X_train, y_train)

    train_score = model.score(
        X_train,
        y_train
    )

    test_score = model.score(
        X_test,
        y_test
    )

    results.append({
        "n_estimators": n,
        "train_score": train_score,
        "test_score": test_score
    })

for result in results:
    print(result)
```

Hasil eksperimen dapat digunakan untuk melihat:

```text
Jumlah Tree
     │
     ├── Training R²
     │
     └── Test R²
```

---

## Hal yang Perlu Diperhatikan

Ketika melakukan eksperimen model, jangan hanya melihat angka terbesar.

Perhatikan juga:

### 1. Generalisasi

Apakah performa pada test set cukup baik?

### 2. Gap Training dan Test

Apakah terdapat perbedaan yang sangat besar antara training dan test score?

### 3. Waktu Komputasi

Apakah peningkatan performa sebanding dengan tambahan waktu training?

### 4. Memory

Apakah model masih sesuai dengan resource yang tersedia?

### 5. Metrik yang Digunakan

Apakah R² memang sesuai dengan tujuan evaluasi?

MAE atau RMSE mungkin juga diperlukan.

---

## Kesalahan Umum

### Menganggap R² Selalu 0 sampai 1

Kurang tepat:

```text
R² selalu berada antara 0 dan 1
```

Yang lebih tepat:

```text
R² dapat mencapai 1,
dapat bernilai 0,
dan dapat bernilai negatif pada data evaluasi.
```

---

### Menganggap R² 0.80 Berarti Accuracy 80%

Kurang tepat:

```text
R² = 0.80
→ accuracy = 80%
```

R² bukan accuracy.

Interpretasi R² berbeda dengan accuracy pada classification.

---

### Hanya Mengukur Training Score

Kurang tepat:

```python
model.score(X_train, y_train)
```

sebagai satu-satunya evaluasi.

Sebaiknya kita juga melihat performa pada data yang tidak digunakan untuk fitting:

```python
model.score(X_test, y_test)
```

---

### Menganggap Lebih Banyak Estimator Selalu Lebih Baik

Menambah `n_estimators` dapat meningkatkan stabilitas dan performa sampai titik tertentu, tetapi tidak menjamin peningkatan tanpa batas.

Selain performa, pertimbangkan:

```text
Performance
+
Training Time
+
Inference Time
+
Memory
```

---

## Ringkasan

Beberapa konsep penting dari materi ini:

1. Test set digunakan untuk mengevaluasi model pada data yang tidak digunakan saat fitting.
2. Test score memberikan informasi penting mengenai kemampuan generalisasi model.
3. Training score yang tinggi tidak otomatis berarti model akan bekerja baik pada data baru.
4. `RandomForestRegressor` merupakan ensemble yang terdiri dari banyak decision tree.
5. `n_estimators` menentukan jumlah tree pada Random Forest.
6. Menambah jumlah estimator dapat meningkatkan performa atau stabilitas sampai titik tertentu.
7. Penambahan estimator juga dapat meningkatkan waktu komputasi dan penggunaan resource.
8. Pada `RandomForestRegressor`, `.score()` menggunakan R² sebagai default metric.
9. R² disebut juga Coefficient of Determination.
10. R² = 1 menunjukkan kecocokan sempurna pada data evaluasi.
11. R² = 0 menunjukkan performa setara dengan baseline mean.
12. R² dapat bernilai negatif pada data evaluasi.
13. R² = 0.80 tidak berarti accuracy model adalah 80%.
14. MAE dapat digunakan bersama R² untuk memberikan perspektif berbeda mengenai performa regresi.
15. Independent variables dalam Machine Learning biasanya disebut features atau `X`.
16. Dependent variable biasanya disebut target atau `y`.
17. Evaluasi model sebaiknya mempertimbangkan performa, generalisasi, metrik, dan biaya komputasi.

---

## Latihan

### Latihan 1 - Training vs Test Score

Buat Random Forest Regressor dan tampilkan:

```text
Training R²
Test R²
```

Kemudian bandingkan keduanya.

### Latihan 2 - Eksperimen `n_estimators`

Gunakan:

```text
2
10
50
100
200
500
```

untuk nilai `n_estimators`.

Catat:

```text
Training R²
Test R²
```

### Latihan 3 - Bandingkan R² dan MAE

Hitung:

```text
R²
MAE
```

Kemudian jelaskan apa yang diukur oleh masing-masing metrik.

### Latihan 4 - Eksperimen Waktu Training

Gunakan `time.perf_counter()` untuk mengukur waktu training setiap konfigurasi `n_estimators`.

Kemudian bandingkan:

```text
n_estimators
R²
Training Time
```

### Latihan 5 - Interpretasi R²

Jelaskan arti dari:

```text
R² = 0.90
R² = 0.50
R² = 0.00
R² = -0.20
R² = 1.00
```

dalam konteks evaluasi model regresi.

## Baca Juga

* https://scikit-learn.org/stable/modules/model_evaluation.html
