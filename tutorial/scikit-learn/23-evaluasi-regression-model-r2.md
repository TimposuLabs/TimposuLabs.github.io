---
sidebar_position: 24
title: "Evaluasi Regression Model: R² Score"
---

Setelah sebuah model regresi dilatih, kita perlu mengetahui seberapa baik model tersebut melakukan prediksi.

Pada regresi, model menghasilkan nilai prediksi kontinu, misalnya:

```text
Harga rumah
Suhu
Pendapatan
Jarak
Jumlah penjualan
```

Evaluasi dilakukan dengan membandingkan:

```text
Nilai sebenarnya → y_test
Nilai prediksi   → y_preds
```

Salah satu metrik yang umum digunakan untuk mengevaluasi model regresi adalah:

> **R² Score (Coefficient of Determination)**

Scikit-Learn menyediakan beberapa metrik evaluasi regresi di dalam modul `sklearn.metrics`.

Pada materi ini kita akan berfokus pada **R² Score**.

MAE dan MSE juga merupakan metrik regresi yang penting, tetapi pembahasannya akan dilakukan pada materi khusus berikutnya.

:::info
**Metrik Regression yang sering digunakan:**
* $R^2$ Score (Coefficient of Determination)
    - Definisi: Mengukur proporsi variasi variabel terikat (target) yang dapat diprediksi dari variabel bebas (fitur).
    - Rentang Nilai:
        - **1.0** (Maksimal): Model membuat prediksi sempurna.
        - **0.0**: Model hanya memprediksi nilai rata-rata (mean) dari variabel target.
        - **Nilai Negatif**: Model bekerja sangat buruk (lebih buruk daripada sekadar memprediksi nilai rata-rata).
* Mean Absolute Error (MAE)
    - Mengukur rata-rata selisih absolut antara nilai prediksi dan nilai sebenarnya.
    - Memberikan gambaran seberapa jauh rata-rata prediksi model menyimpang dalam satuan unit yang sama dengan variabel target.
* Mean Squared Error (MSE)
    - Mengukur rata-rata kuadrat dari selisih antara nilai prediksi dan nilai sebenarnya.
    - Memberikan penalti (penalty) yang lebih berat terhadap eror/kesalahan yang bernilai besar karena nilainya dikuadratkan.
:::
---

## Apa Itu R² Score?

**R² Score**, atau **Coefficient of Determination**, merupakan metrik yang digunakan untuk mengukur seberapa baik model menjelaskan variasi pada target berdasarkan fitur yang digunakan.

Secara sederhana, R² membantu menjawab pertanyaan:

> Seberapa baik prediksi model dibandingkan dengan baseline yang hanya memprediksi nilai rata-rata target?

R² sering digunakan pada masalah regresi karena memberikan ukuran relatif terhadap baseline tersebut.

---

## Intuisi R² Score

Misalkan kita ingin memprediksi harga rumah.

Kita memiliki data:

```text
Harga sebenarnya:
300
350
400
450
500
```

Model kemudian menghasilkan:

```text
Prediksi model:
310
340
390
460
490
```

Model tidak menghasilkan prediksi yang sempurna, tetapi prediksinya cukup dekat dengan nilai sebenarnya.

R² dapat membantu kita mengukur seberapa baik model menjelaskan variasi harga tersebut dibandingkan dengan baseline sederhana.

---

## Baseline pada R²

Untuk memahami R², kita perlu memahami konsep **baseline**.

Baseline sederhana pada regresi adalah model yang selalu memprediksi **nilai rata-rata target**.

Misalnya:

```text
y = [10, 20, 30, 40, 50]
```

Rata-rata:

```text
mean = 30
```

Model baseline akan selalu menghasilkan:

```text
30
30
30
30
30
```

Model tersebut tidak mempelajari hubungan antara fitur dan target.

Model hanya menggunakan informasi berupa rata-rata target.

R² membandingkan performa model dengan baseline tersebut.

---

## Rumus R²

R² dapat dituliskan sebagai:

$$
R^2 = 1 - \frac{SS_{res}}{SS_{tot}}
$$

Dengan:

- `SS_res` = jumlah kuadrat residual atau error prediksi
- `SS_tot` = total variasi target terhadap nilai rata-ratanya

Secara lebih lengkap:

$$
R^2 =
1 -
\frac{
\sum_{i=1}^{n}(y_i-\hat{y}_i)^2
}{
\sum_{i=1}^{n}(y_i-\bar{y})^2
}
$$

Keterangan:

- `y_i` = nilai sebenarnya
- `ŷ_i` = nilai prediksi model
- `ȳ` = rata-rata nilai target
- `n` = jumlah sampel

---

## Memahami Bagian Rumus R²

Terdapat dua bagian penting:

### Total Variation

Bagian ini mengukur seberapa jauh nilai aktual dari rata-rata target.

```text
SS_tot = Σ(y - mean(y))²
```

Bagian ini menggambarkan variasi yang terdapat pada data target.

### Residual Error

Bagian ini mengukur seberapa jauh prediksi model dari nilai aktual.

```text
SS_res = Σ(y - y_pred)²
```

Semakin kecil error prediksi model, semakin kecil `SS_res`.

Akibatnya, nilai R² akan semakin mendekati `1`.

---

## Interpretasi Nilai R²

R² dapat memiliki beberapa nilai.

### R² = 1.0

Nilai:

```text
R² = 1.0
```

menunjukkan bahwa prediksi model cocok sempurna dengan nilai aktual pada data yang dievaluasi.

Secara matematis:

```text
SS_res = 0
```

sehingga:

$$
R^2 = 1
$$

Contoh:

```python
from sklearn.metrics import r2_score

y_true = [10, 20, 30, 40, 50]
y_pred = [10, 20, 30, 40, 50]

r2 = r2_score(y_true, y_pred)

print(r2)
```

Output:

```text
1.0
```

---

## R² = 0.0

Nilai:

```text
R² = 0.0
```

dapat terjadi ketika model memiliki performa yang setara dengan baseline yang selalu memprediksi rata-rata target pada data evaluasi.

Misalnya:

```python
import numpy as np
from sklearn.metrics import r2_score

y_test = np.array([10, 20, 30, 40, 50])

y_test_mean = np.full(
    len(y_test),
    y_test.mean()
)

r2 = r2_score(
    y_true=y_test,
    y_pred=y_test_mean
)

print(r2)
```

Output:

```text
0.0
```

Model tersebut tidak memanfaatkan pola fitur untuk menghasilkan prediksi yang lebih baik daripada baseline rata-rata.

---

## R² Negatif

Salah satu hal penting yang perlu dipahami adalah bahwa R² **dapat bernilai negatif**, terutama pada data evaluasi seperti validation atau test set.

Contoh:

```text
R² = -0.25
```

Nilai negatif menunjukkan bahwa prediksi model lebih buruk daripada baseline yang selalu memprediksi nilai rata-rata target pada data evaluasi tersebut.

Semakin negatif nilainya, semakin besar error relatif model dibandingkan baseline rata-rata.

Jadi, jangan menganggap bahwa R² selalu berada pada rentang:

```text
0 sampai 1
```

Untuk evaluasi pada data yang tidak digunakan untuk fitting, R² dapat bernilai negatif.

---

## Eksperimen R² dengan Prediksi Rata-Rata

Kita dapat membuat eksperimen sederhana untuk memahami konsep R².

```python
import numpy as np
from sklearn.metrics import r2_score

y_test = np.array([10, 20, 30, 40, 50])

y_test_mean = np.full(
    len(y_test),
    y_test.mean()
)

print("Actual values:")
print(y_test)

print("\nMean:")
print(y_test.mean())

print("\nPredictions:")
print(y_test_mean)

print("\nR² Score:")
print(r2_score(y_test, y_test_mean))
```

Output:

```text
Actual values:
[10 20 30 40 50]

Mean:
30.0

Predictions:
[30. 30. 30. 30. 30.]

R² Score:
0.0
```

Eksperimen ini menunjukkan bahwa prediksi yang selalu menggunakan rata-rata target menghasilkan R² sebesar `0`.

---

## Eksperimen Perfect Prediction

Sekarang kita buat prediksi yang sama persis dengan nilai aktual.

```python
from sklearn.metrics import r2_score

y_test = [10, 20, 30, 40, 50]

y_preds = [10, 20, 30, 40, 50]

r2 = r2_score(
    y_true=y_test,
    y_pred=y_preds
)

print(r2)
```

Output:

```text
1.0
```

Karena:

```text
y_test == y_preds
```

maka error prediksi adalah nol.

---

## Eksperimen Prediksi yang Buruk

Sekarang kita gunakan prediksi yang jauh dari nilai sebenarnya.

```python
from sklearn.metrics import r2_score

y_test = [10, 20, 30, 40, 50]

y_preds = [50, 40, 30, 20, 10]

r2 = r2_score(
    y_true=y_test,
    y_pred=y_preds
)

print(r2)
```

R² dapat menghasilkan nilai negatif.

Hal ini terjadi karena model menghasilkan error yang lebih besar dibandingkan baseline yang menggunakan rata-rata target.

---

## R² dengan Scikit-Learn

Scikit-Learn menyediakan fungsi `r2_score()`.

```python
from sklearn.metrics import r2_score

r2 = r2_score(
    y_true=y_test,
    y_pred=y_preds
)

print(r2)
```

Parameter utama:

```text
y_true
```

adalah nilai target sebenarnya.

Sedangkan:

```text
y_pred
```

adalah nilai prediksi model.

---

## R² pada RandomForestRegressor

R² juga dapat digunakan untuk mengevaluasi model seperti `RandomForestRegressor`.

Contoh menggunakan dataset housing:

```python
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

X = housing_df.drop("target", axis=1)
y = housing_df["target"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

r2_score = model.score(
    X_test,
    y_test
)

print(r2_score)
```

Untuk `RandomForestRegressor`, method `.score()` menggunakan **R² Score**.

---

## Menggunakan `r2_score()` Secara Eksplisit

Kita juga dapat menghitung R² menggunakan hasil prediksi secara langsung.

```python
from sklearn.metrics import r2_score

y_preds = model.predict(X_test)

r2 = r2_score(
    y_test,
    y_preds
)

print(f"R² Score: {r2:.2f}")
```

Dengan demikian terdapat dua cara umum:

### Menggunakan `.score()`

```python
model.score(X_test, y_test)
```

### Menggunakan `r2_score()`

```python
r2_score(y_test, y_preds)
```

Untuk `RandomForestRegressor`, keduanya menghasilkan nilai R² yang sama apabila diterapkan pada data dan prediksi yang sama.

---

## `.score()` pada Scikit-Learn

Penting untuk memahami bahwa:

```python
model.score()
```

tidak selalu berarti R².

Arti `.score()` bergantung pada estimator yang digunakan.

Contohnya:

| Estimator | `.score()` Umumnya |
|---|---|
| `RandomForestClassifier` | Accuracy |
| `RandomForestRegressor` | R² |
| `Ridge` | R² |
| `LogisticRegression` | Accuracy |

Karena itu, selalu periksa dokumentasi estimator ketika ingin mengetahui arti `.score()`.

Jika ingin menyatakan metrik secara eksplisit, kita dapat menggunakan:

```python
from sklearn.metrics import r2_score
```

kemudian:

```python
r2_score(y_test, y_preds)
```

---

## Membandingkan Model dengan R²

R² juga dapat digunakan untuk membandingkan beberapa model regresi.

Misalnya:

```text
Model A → R² = 0.72
Model B → R² = 0.81
Model C → R² = 0.65
```

Pada dataset evaluasi yang sama, nilai R² yang lebih tinggi menunjukkan bahwa model tersebut menjelaskan variasi target lebih baik relatif terhadap baseline rata-rata.

Namun pemilihan model tidak seharusnya hanya berdasarkan satu angka.

Pertimbangkan juga:

- jenis data,
- tujuan model,
- MAE,
- MSE,
- RMSE,
- waktu training,
- waktu inference,
- kompleksitas model,
- kebutuhan deployment,
- dan karakteristik error.

---

## R² pada Training dan Test Data

Kita dapat membandingkan R² pada data training dan testing.

```python
train_r2 = model.score(
    X_train,
    y_train
)

test_r2 = model.score(
    X_test,
    y_test
)

print(f"Training R²: {train_r2:.2f}")
print(f"Test R²: {test_r2:.2f}")
```

Misalnya menghasilkan:

```text
Training R²: 0.98
Test R²: 0.72
```

Terdapat perbedaan yang cukup besar antara performa training dan test.

Hal ini dapat menjadi indikasi bahwa model mempelajari data training dengan sangat baik tetapi performanya lebih rendah pada data yang belum pernah digunakan dalam training.

Kondisi tersebut perlu diperiksa lebih lanjut dalam konteks **overfitting**.

---

## Mengapa Test R² Lebih Penting?

Ketika kita ingin mengetahui kemampuan model terhadap data baru, test set memberikan evaluasi yang lebih relevan dibandingkan training set.

Contoh:

```text
Training R² = 0.99
Test R²     = 0.70
```

Model sangat baik pada data training, tetapi performanya menurun ketika menghadapi data yang tidak digunakan selama proses training.

Sebaliknya:

```text
Training R² = 0.78
Test R²     = 0.75
```

menunjukkan perbedaan yang lebih kecil antara performa training dan test.

Namun angka tersebut tetap harus dianalisis bersama metrik dan konteks lainnya.

---

## R² dan Variasi Target

R² sering dijelaskan sebagai proporsi variasi target yang dapat dijelaskan oleh model.

Misalnya:

```text
R² = 0.80
```

Secara informal, kita dapat mengatakan bahwa model menjelaskan sekitar **80% variasi target relatif terhadap baseline rata-rata** pada data evaluasi tersebut.

Namun perlu berhati-hati ketika menggunakan interpretasi ini.

R² bukan berarti:

> "Model memiliki akurasi 80%."

R² juga bukan:

> "80% prediksi model pasti benar."

R² adalah ukuran yang berbeda dari accuracy pada klasifikasi.

---

## R² Bukan Accuracy

Regresi dan klasifikasi memiliki karakteristik evaluasi yang berbeda.

### Classification

Contoh metrik:

```text
Accuracy
Precision
Recall
F1-Score
ROC-AUC
```

Model menghasilkan kelas seperti:

```text
0
1
```

atau:

```text
Kucing
Anjing
Burung
```

### Regression

Contoh metrik:

```text
R²
MAE
MSE
RMSE
```

Model menghasilkan nilai kontinu seperti:

```text
125.5
320.7
450.2
```

Karena itu:

```text
R² = 0.80
```

tidak sama dengan:

```text
Accuracy = 80%
```

---

## Kelebihan R²

R² memiliki beberapa kelebihan.

### Mudah Dibandingkan

R² memberikan ukuran performa relatif terhadap baseline rata-rata.

### Tidak Memiliki Satuan

R² tidak memiliki satuan seperti rupiah, kilogram, meter, atau derajat.

### Berguna untuk Membandingkan Model

Jika model dievaluasi pada target dan dataset evaluasi yang sama, R² dapat membantu membandingkan performa model.

---

## Keterbatasan R²

R² juga memiliki beberapa keterbatasan.

### Tidak Menunjukkan Besarnya Error dalam Satuan Target

Misalnya:

```text
R² = 0.80
```

tidak langsung memberi tahu apakah rata-rata error model adalah:

```text
1 rupiah
10 rupiah
100 rupiah
```

Untuk memahami besar error dalam satuan target, kita dapat menggunakan MAE atau RMSE.

MAE dan MSE/RMSE akan dibahas lebih lanjut pada materi berikutnya.

### R² Tidak Selalu Positif

Pada data evaluasi, R² dapat bernilai negatif.

```text
R² = -0.5
```

bukan berarti "minus 50% akurasi".

Artinya adalah performa model lebih buruk daripada baseline yang memprediksi rata-rata target.

### R² Tidak Menentukan Penyebab Hubungan

R² menunjukkan seberapa baik model menjelaskan variasi target dalam konteks evaluasi, tetapi tidak membuktikan hubungan sebab-akibat antara fitur dan target.

---

## Contoh Lengkap Evaluasi Regresi

Berikut workflow lengkap menggunakan Random Forest Regressor.

```python
import numpy as np

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score
from sklearn.model_selection import train_test_split

# 1. Menentukan fitur dan target
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

# 4. Training
model.fit(X_train, y_train)

# 5. Membuat prediksi
y_preds = model.predict(X_test)

# 6. Menghitung R²
r2 = r2_score(
    y_test,
    y_preds
)

print(f"R² Score: {r2:.2f}")
```

---

## Workflow Evaluasi R²

Secara keseluruhan, workflow dapat digambarkan sebagai berikut:

```text
Dataset
   │
   ▼
Menentukan X dan y
   │
   ▼
Train-Test Split
   │
   ├───────────────┐
   ▼               ▼
Training Data    Test Data
   │               │
   ▼               │
Train Model        │
   │               │
   ▼               │
Predict ───────────┘
   │
   ▼
y_preds
   │
   ▼
R² Score
   │
   ▼
Interpretasi
```

Alur tersebut menunjukkan bahwa R² dihitung dengan membandingkan:

```text
y_test
   │
   │ dibandingkan
   ▼
y_preds
```

---

## Ringkasan Interpretasi R²

| Nilai R² | Interpretasi Umum |
|---|---|
| `1.0` | Prediksi sempurna pada data evaluasi |
| `0.0` | Setara dengan baseline prediksi rata-rata |
| `0 < R² < 1` | Model lebih baik daripada baseline, tetapi belum sempurna |
| `R² < 0` | Model lebih buruk daripada baseline rata-rata pada data evaluasi |

Perlu diingat bahwa nilai R² tidak dapat ditafsirkan tanpa mempertimbangkan konteks dataset, jenis model, dan data evaluasi.

---

## Checklist Evaluasi R²

Sebelum menyimpulkan performa model regresi, periksa:

- [ ] Dataset sudah dibagi menjadi training dan test data.
- [ ] Tidak terjadi data leakage.
- [ ] Model sudah dilatih menggunakan training data.
- [ ] Prediksi dibuat menggunakan test data.
- [ ] R² dihitung menggunakan data yang sesuai.
- [ ] Memahami bahwa `.score()` bergantung pada estimator.
- [ ] Memahami bahwa R² dapat bernilai negatif.
- [ ] Tidak menyamakan R² dengan accuracy.
- [ ] Membandingkan training R² dan test R².
- [ ] Tidak menggunakan R² sebagai satu-satunya dasar pemilihan model.
- [ ] Mempertimbangkan metrik error lain seperti MAE, MSE, atau RMSE.

---

## Kesimpulan

**R² Score (Coefficient of Determination)** merupakan salah satu metrik penting untuk mengevaluasi model regresi.

Inti dari R² adalah membandingkan performa model dengan baseline yang selalu memprediksi **rata-rata target**.

Secara sederhana:

```text
R² = 1
→ prediksi sempurna pada data evaluasi

R² = 0
→ setara dengan baseline rata-rata

R² < 0
→ lebih buruk daripada baseline rata-rata
```

R² yang lebih tinggi pada dataset evaluasi yang sama menunjukkan bahwa model menjelaskan variasi target dengan lebih baik relatif terhadap baseline.

Namun, R² tidak menunjukkan secara langsung **seberapa besar error dalam satuan target**. Oleh karena itu, evaluasi regresi biasanya perlu dilengkapi dengan metrik error lainnya.

## Referensi

* https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics
* https://scikit-learn.org/stable/modules/model_evaluation.html
