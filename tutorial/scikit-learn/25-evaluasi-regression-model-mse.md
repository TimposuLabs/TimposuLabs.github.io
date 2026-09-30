---
sidebar_position: 26
title: "Evaluasi Regression Model: Mean Squared Error (MSE)"
---

Pada materi sebelumnya kita telah mempelajari:

- **R² Score** untuk melihat performa model relatif terhadap baseline.
- **Mean Absolute Error (MAE)** untuk mengukur rata-rata besar error dalam satuan target.

Pada materi ini kita akan mempelajari metrik evaluasi regresi berikutnya:

> **Mean Squared Error (MSE)**

MSE merupakan salah satu metrik yang digunakan untuk mengukur besar error prediksi model dengan cara **mengkuadratkan error terlebih dahulu**, kemudian menghitung rata-ratanya.

Konsep dasarnya:

```text
Prediksi
   │
   ▼
Hitung Error
   │
   ▼
Kuadratkan Error
   │
   ▼
Hitung Rata-rata
   │
   ▼
  MSE
```

---

## Apa Itu Mean Squared Error?

**Mean Squared Error (MSE)** adalah rata-rata dari kuadrat selisih antara nilai aktual dan nilai prediksi.

Secara sederhana:

> MSE mengukur rata-rata kuadrat kesalahan prediksi model.

Formula MSE:

$$
MSE = \frac{1}{n}\sum_{i=1}^{n}(y_i-\hat{y}_i)^2
$$

Keterangan:

- `yᵢ` = nilai aktual
- `ŷᵢ` = nilai prediksi
- `n` = jumlah sampel
- `(yᵢ - ŷᵢ)²` = squared error

Karena error dikuadratkan, semua error menjadi tidak negatif.

---

## Mengapa Error Dikuadratkan?

Misalkan terdapat dua prediksi:

```text
Actual     = 100
Prediction = 90
```

Maka error:

```text
90 - 100 = -10
```

Jika error dikuadratkan:

```text
(-10)² = 100
```

Contoh lainnya:

```text
Actual     = 100
Prediction = 110
```

Error:

```text
110 - 100 = 10
```

Squared error:

```text
10² = 100
```

Baik error `-10` maupun `10` menghasilkan:

```text
100
```

Dengan demikian, error positif dan negatif tidak akan saling menghilangkan.

---

## Efek Kuadrat terhadap Error

Hal yang sangat penting dari MSE adalah bahwa **error besar mendapatkan kontribusi yang jauh lebih besar**.

Perhatikan contoh berikut:

| Error | Squared Error |
|---:|---:|
| 1 | 1 |
| 2 | 4 |
| 3 | 9 |
| 4 | 16 |
| 5 | 25 |
| 10 | 100 |
| 20 | 400 |

Perhatikan:

```text
Error = 2
Squared Error = 4
```

sedangkan:

```text
Error = 20
Squared Error = 400
```

Error `20` bukan hanya dua kali error `10` dalam kontribusinya terhadap MSE.

Karena dikuadratkan:

```text
10² = 100
20² = 400
```

Error `20` memberikan squared error **empat kali lebih besar** daripada error `10`.

Inilah alasan MSE memberikan perhatian yang lebih besar terhadap error yang besar.

---

## Contoh Perhitungan MSE Secara Manual

Misalkan kita memiliki data:

| Actual | Prediction |
|---:|---:|
| 100 | 110 |
| 200 | 190 |
| 300 | 320 |
| 400 | 380 |

### Langkah 1 - Hitung Error

Gunakan:

```text
Prediction - Actual
```

Hasil:

| Actual | Prediction | Error |
|---:|---:|---:|
| 100 | 110 | 10 |
| 200 | 190 | -10 |
| 300 | 320 | 20 |
| 400 | 380 | -20 |

---

## Langkah 2 - Kuadratkan Error

Sekarang setiap error dikuadratkan.

| Actual | Prediction | Error | Squared Error |
|---:|---:|---:|---:|
| 100 | 110 | 10 | 100 |
| 200 | 190 | -10 | 100 |
| 300 | 320 | 20 | 400 |
| 400 | 380 | -20 | 400 |

---

## Langkah 3 - Hitung Rata-Rata

Jumlah squared error:

```text
100 + 100 + 400 + 400 = 1000
```

Jumlah data:

```text
n = 4
```

Maka:

$$
MSE = \frac{1000}{4}
$$

$$
MSE = 250
$$

Jadi:

```text
MSE = 250
```

---

## Implementasi MSE dengan Scikit-Learn

Scikit-Learn menyediakan fungsi:

```python
mean_squared_error()
```

yang berada di:

```python
sklearn.metrics
```

Import:

```python
from sklearn.metrics import mean_squared_error
```

Kemudian:

```python
mse = mean_squared_error(
    y_true=y_test,
    y_pred=y_preds
)

print(f"MSE: {mse}")
```

Parameter:

```text
y_true
```

adalah nilai aktual.

Sedangkan:

```text
y_pred
```

adalah nilai prediksi model.

---

## Contoh Lengkap dengan Model Regresi

Misalnya kita menggunakan `RandomForestRegressor`.

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split

# Menentukan fitur dan target
X = housing_df.drop("target", axis=1)
y = housing_df["target"]

# Membagi dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Membuat model
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

# Training
model.fit(X_train, y_train)

# Membuat prediksi
y_preds = model.predict(X_test)

# Menghitung MSE
mse = mean_squared_error(
    y_true=y_test,
    y_pred=y_preds
)

print(f"MSE: {mse:.4f}")
```

Contoh output:

```text
MSE: 0.2456
```

Nilai sebenarnya bergantung pada dataset, preprocessing, pembagian data, model, dan parameter yang digunakan.

---

## Menghitung MSE Secara Manual dengan NumPy

Kita juga dapat menghitung MSE tanpa menggunakan fungsi khusus Scikit-Learn.

```python
import numpy as np

mse_manual = np.square(
    y_preds - y_test
).mean()

print(f"MSE Manual: {mse_manual}")
```

Prosesnya terdiri dari tiga tahap:

```python
y_preds - y_test
```

menghasilkan error.

Kemudian:

```python
np.square(...)
```

mengkuadratkan error.

Terakhir:

```python
.mean()
```

menghitung rata-rata squared error.

---

## Menghitung MSE dengan Pandas

Jika kita memiliki DataFrame yang berisi error, MSE juga dapat dihitung menggunakan Pandas.

Misalnya:

```python
import pandas as pd

df = pd.DataFrame({
    "Actual values": y_test,
    "Predicted values": y_preds
})

df["Differences"] = (
    df["Predicted values"] -
    df["Actual values"]
)

df["Squared Error"] = (
    df["Differences"] ** 2
)

df.head()
```

Contoh struktur DataFrame:

```text
   Actual values  Predicted values  Differences  Squared Error
0          2.31              2.45         0.14           0.0196
1          1.82              1.76        -0.06           0.0036
2          3.15              3.02        -0.13           0.0169
3          2.76              2.81         0.05           0.0025
```

Kemudian:

```python
mse_manual = df["Squared Error"].mean()

print(f"MSE Manual: {mse_manual}")
```

---

## Membandingkan MSE Manual dan Scikit-Learn

Kita dapat memastikan hasil perhitungan manual dengan Scikit-Learn.

```python
from sklearn.metrics import mean_squared_error
import numpy as np

mse_sklearn = mean_squared_error(
    y_test,
    y_preds
)

mse_manual = np.square(
    y_preds - y_test
).mean()

print(f"MSE Scikit-Learn: {mse_sklearn}")
print(f"MSE Manual:       {mse_manual}")
```

Hasilnya seharusnya sama atau sangat dekat.

Contoh:

```text
MSE Scikit-Learn: 0.2456
MSE Manual:       0.2456
```

---

## MSE dan Error Besar

Untuk memahami karakteristik MSE, perhatikan dua kondisi berikut.

### Kondisi 1 - Error Kecil

Misalnya:

```text
Error = 2
```

Squared error:

```text
2² = 4
```

### Kondisi 2 - Error Besar

Misalnya:

```text
Error = 20
```

Squared error:

```text
20² = 400
```

Perbedaannya:

```text
Error:
20 / 2 = 10 kali lebih besar
```

Tetapi:

```text
Squared Error:
400 / 4 = 100 kali lebih besar
```

Hal ini menunjukkan bahwa MSE memberikan kontribusi yang jauh lebih besar terhadap error yang besar.

---

## MSE dan Outlier

Karena menggunakan kuadrat error, MSE sangat sensitif terhadap error yang besar.

Misalnya terdapat error:

```text
1
2
3
4
50
```

Squared error:

```text
1
4
9
16
2500
```

Perhatikan error `50`.

Setelah dikuadratkan:

```text
50² = 2500
```

Nilai tersebut jauh lebih besar dibandingkan squared error lainnya.

Akibatnya, satu prediksi dengan error yang sangat besar dapat memberikan pengaruh besar terhadap nilai MSE.

---

## Apakah MSE Buruk karena Sensitif terhadap Outlier?

Tidak.

Sensitivitas terhadap error besar merupakan **karakteristik MSE**, bukan otomatis sebuah kelemahan.

Pada beberapa masalah, error besar memang harus mendapatkan penalti yang lebih besar.

Misalnya dalam suatu sistem:

```text
Error kecil → masih dapat ditoleransi
Error sangat besar → konsekuensi jauh lebih serius
```

Dalam kondisi tersebut, MSE dapat menjadi metrik yang relevan.

Namun jika kita tidak ingin error besar mendominasi evaluasi, MAE dapat menjadi alternatif yang perlu dipertimbangkan.

---

## MSE Memiliki Satuan Kuadrat

Ini merupakan karakteristik penting MSE.

Jika target memiliki satuan:

```text
Rupiah
```

maka MSE memiliki satuan:

```text
Rupiah²
```

Jika target:

```text
Meter
```

maka MSE:

```text
Meter²
```

Jika target:

```text
Derajat Celsius
```

maka secara satuan matematis:

```text
°C²
```

Hal ini dapat membuat MSE kurang intuitif untuk interpretasi langsung dalam satuan asli target.

Untuk mengembalikan nilai error ke skala target, kita dapat menggunakan **Root Mean Squared Error (RMSE)**.

---

## Root Mean Squared Error (RMSE)

**Root Mean Squared Error (RMSE)** merupakan akar kuadrat dari MSE.

Formula:

$$
RMSE = \sqrt{MSE}
$$

Jika:

```text
MSE = 100
```

maka:

$$
RMSE = \sqrt{100}
$$

```text
RMSE = 10
```

RMSE memiliki satuan yang sama dengan target.

---

## Menghitung RMSE dari MSE

Dengan NumPy:

```python
import numpy as np

rmse = np.sqrt(mse)

print(f"RMSE: {rmse}")
```

Atau pada versi Scikit-Learn yang mendukung parameter `squared`:

```python
rmse = mean_squared_error(
    y_test,
    y_preds,
    squared=False
)

print(f"RMSE: {rmse}")
```

Untuk kompatibilitas lintas versi Scikit-Learn, pendekatan eksplisit menggunakan akar kuadrat juga dapat digunakan:

```python
mse = mean_squared_error(
    y_test,
    y_preds
)

rmse = np.sqrt(mse)
```

---

## MSE vs RMSE

MSE dan RMSE berasal dari konsep yang sama.

| Metrik | Proses | Satuan |
|---|---|---|
| MSE | Rata-rata squared error | Satuan target² |
| RMSE | Akar dari MSE | Satuan target |

Contohnya jika target menggunakan juta Rupiah:

```text
MSE  = 4 juta Rupiah²
RMSE = 2 juta Rupiah
```

RMSE lebih mudah diinterpretasikan karena kembali ke skala target.

---

## MSE vs MAE

MAE dan MSE sama-sama mengukur error prediksi, tetapi memberikan penalti yang berbeda terhadap error besar.

### MAE

Formula:

$$
MAE = \frac{1}{n}\sum_{i=1}^{n}|y_i-\hat{y}_i|
$$

MAE menggunakan nilai absolut.

### MSE

Formula:

$$
MSE = \frac{1}{n}\sum_{i=1}^{n}(y_i-\hat{y}_i)^2
$$

MSE menggunakan kuadrat error.

Perbandingan:

| Karakteristik | MAE | MSE |
|---|---|---|
| Operasi pada error | Absolut | Kuadrat |
| Sensitivitas terhadap error besar | Lebih rendah | Lebih tinggi |
| Satuan | Satuan target | Satuan target² |
| Nilai ideal | `0` | `0` |
| Semakin kecil | Semakin baik | Semakin baik |
| Mudah diinterpretasikan | Ya | Lebih sulit |

---

## Contoh MAE dan MSE pada Error yang Sama

Misalkan terdapat error:

```text
1
2
10
```

### MAE

```text
MAE = (|1| + |2| + |10|) / 3
```

```text
MAE = (1 + 2 + 10) / 3
```

```text
MAE = 4.33
```

### MSE

```text
MSE = (1² + 2² + 10²) / 3
```

```text
MSE = (1 + 4 + 100) / 3
```

```text
MSE = 35
```

Perhatikan kontribusi error `10`.

Pada MAE:

```text
10
```

Pada MSE:

```text
100
```

Inilah alasan MSE memberikan perhatian lebih besar terhadap error besar.

---

## R² vs MAE vs MSE

Ketiga metrik memberikan perspektif yang berbeda.

| Metrik | Fokus Utama | Nilai Ideal |
|---|---|---:|
| R² | Performa relatif terhadap baseline | `1` |
| MAE | Rata-rata absolute error | `0` |
| MSE | Rata-rata squared error | `0` |

### R²

Menjawab:

> Seberapa baik model menjelaskan variasi target dibandingkan baseline rata-rata?

### MAE

Menjawab:

> Berapa besar rata-rata absolute error model dalam satuan target?

### MSE

Menjawab:

> Berapa besar rata-rata squared error model dan seberapa besar error besar memengaruhi evaluasi?

---

## Kapan Menggunakan MAE?

MAE dapat menjadi pilihan ketika kita ingin:

- Mengukur rata-rata besar error secara langsung.
- Mempertahankan interpretasi dalam satuan target.
- Memberikan penalti error secara linear.
- Mengurangi pengaruh relatif error ekstrem dibandingkan MSE.

Contohnya:

```text
Error 5 → penalti 5
Error 10 → penalti 10
```

Error `10` memberikan kontribusi dua kali error `5`.

---

## Kapan Menggunakan MSE?

MSE dapat menjadi pilihan ketika kita ingin:

- Memberikan penalti lebih besar terhadap error besar.
- Membuat model lebih sensitif terhadap prediksi yang sangat meleset.
- Menggunakan loss yang bersifat kuadratik.
- Memprioritaskan pengurangan error besar.

Contohnya:

```text
Error 5 → squared error 25
Error 10 → squared error 100
```

Error `10` memberikan squared error empat kali lebih besar daripada error `5`.

---

## Kapan Menggunakan RMSE?

RMSE dapat digunakan ketika kita menginginkan karakteristik penalti kuadrat seperti MSE tetapi ingin hasil akhirnya kembali ke **satuan target**.

Contohnya:

```text
Target = juta Rupiah

RMSE = 2.5
```

Interpretasinya lebih mudah karena:

```text
RMSE = 2.5 juta Rupiah
```

Namun RMSE tetap sensitif terhadap error besar karena berasal dari MSE.

---

## Memilih Metrik Regresi

Tidak ada satu metrik yang selalu paling tepat untuk semua masalah regresi.

Pertimbangkan tujuan evaluasi.

| Kondisi | Metrik yang Dapat Dipertimbangkan |
|---|---|
| Ingin melihat performa relatif terhadap baseline | R² |
| Ingin mengetahui rata-rata error dalam satuan target | MAE |
| Error besar harus mendapatkan penalti lebih besar | MSE |
| Ingin penalti error besar tetapi tetap dalam satuan target | RMSE |

Pemilihan metrik harus disesuaikan dengan karakteristik masalah dan konsekuensi dari error.

---

## Jangan Hanya Melihat Satu Metrik

Dalam praktiknya, evaluasi model regresi sebaiknya tidak selalu bergantung pada satu metrik.

Misalnya sebuah model menghasilkan:

```text
R²   = 0.82
MAE  = 0.30
MSE  = 0.45
RMSE = 0.67
```

Kita mendapatkan beberapa perspektif:

```text
R²
→ performa relatif terhadap baseline

MAE
→ rata-rata absolute error

MSE
→ squared error dan sensitivitas terhadap error besar

RMSE
→ error pada skala target dengan karakteristik penalti kuadrat
```

Dengan demikian, evaluasi menjadi lebih informatif.

---

## Contoh Evaluasi Lengkap

Berikut contoh menghitung R², MAE, MSE, dan RMSE secara bersamaan.

```python
import numpy as np

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)
from sklearn.model_selection import train_test_split

# Menentukan fitur dan target
X = housing_df.drop("target", axis=1)
y = housing_df["target"]

# Membagi dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Membuat model
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

# Training
model.fit(X_train, y_train)

# Prediksi
y_preds = model.predict(X_test)

# R²
r2 = r2_score(
    y_test,
    y_preds
)

# MAE
mae = mean_absolute_error(
    y_test,
    y_preds
)

# MSE
mse = mean_squared_error(
    y_test,
    y_preds
)

# RMSE
rmse = np.sqrt(mse)

print(f"R²:   {r2:.4f}")
print(f"MAE:  {mae:.4f}")
print(f"MSE:  {mse:.4f}")
print(f"RMSE: {rmse:.4f}")
```

Contoh output:

```text
R²:   0.8200
MAE:  0.3200
MSE:  0.4500
RMSE: 0.6708
```

Nilai tersebut hanya contoh. Hasil aktual bergantung pada dataset dan konfigurasi model.

---

## Workflow Evaluasi Model Regresi

Secara keseluruhan, workflow evaluasi dapat digambarkan sebagai:

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
Prediksi ──────────┘
   │
   ▼
y_preds
   │
   ├───────────────┐
   ▼               ▼
  R²              Error
                   │
             ┌─────┼─────┐
             ▼     ▼     ▼
            MAE   MSE   RMSE
```

Workflow tersebut menunjukkan bahwa beberapa metrik dapat digunakan secara bersamaan untuk mendapatkan perspektif yang lebih lengkap.

---

## Kesalahan yang Sering Terjadi

### Menganggap MSE Lebih Baik karena Angkanya Lebih Kecil

Misalnya:

```text
Model A → MSE = 0.20
Model B → MAE = 0.15
```

Kita tidak dapat langsung mengatakan Model B lebih baik hanya berdasarkan angka tersebut.

MSE dan MAE adalah metrik yang berbeda.

Perbandingan harus dilakukan menggunakan **metrik yang sama** pada dataset evaluasi yang sama.

---

### Menganggap MSE Berada dalam Satuan Target

Jika target memiliki satuan:

```text
Rupiah
```

maka MSE secara matematis memiliki satuan:

```text
Rupiah²
```

Untuk interpretasi pada skala target, RMSE dapat digunakan.

---

### Mengabaikan Error Besar

MSE sangat sensitif terhadap error besar.

Jika dataset memiliki beberapa error ekstrem, nilai MSE dapat meningkat secara signifikan.

Karena itu, penting untuk memahami distribusi error sebelum mengambil kesimpulan.

---

### Menganggap MSE Selalu Harus Digunakan

MSE bukan metrik yang wajib digunakan untuk semua masalah regresi.

Jika tujuan kita adalah mengetahui rata-rata error dalam satuan target, MAE dapat lebih mudah diinterpretasikan.

Jika error besar harus mendapatkan penalti lebih besar, MSE atau RMSE dapat menjadi pilihan yang relevan.

---

## Ringkasan

**Mean Squared Error (MSE)** adalah rata-rata dari kuadrat error antara nilai aktual dan prediksi.

Formula:

$$
MSE = \frac{1}{n}\sum_{i=1}^{n}(y_i-\hat{y}_i)^2
$$

Hal-hal penting:

- MSE mengkuadratkan setiap error.
- Error positif dan negatif tidak saling menghilangkan.
- Error besar mendapatkan penalti yang lebih besar.
- MSE sensitif terhadap error besar dan outlier.
- Nilai ideal MSE adalah `0`.
- Semakin kecil MSE, semakin kecil squared error rata-rata.
- MSE memiliki satuan kuadrat dari target.
- RMSE adalah akar kuadrat dari MSE.
- MAE memberikan penalti yang lebih linear terhadap error.
- Pemilihan metrik harus disesuaikan dengan tujuan evaluasi.

---

## Checklist Evaluasi MSE

Sebelum menggunakan MSE, pastikan:

- [ ] Model sudah dilatih menggunakan training data.
- [ ] Prediksi dibuat menggunakan data evaluasi.
- [ ] `y_test` dan `y_preds` memiliki jumlah sampel yang sama.
- [ ] MSE dihitung menggunakan `mean_squared_error()`.
- [ ] Memahami bahwa error dikuadratkan.
- [ ] Memahami bahwa error besar memberikan pengaruh lebih besar.
- [ ] Memahami bahwa MSE sensitif terhadap outlier.
- [ ] Memahami bahwa MSE memiliki satuan kuadrat target.
- [ ] Menggunakan RMSE jika ingin kembali ke skala target.
- [ ] Membandingkan model menggunakan metrik yang sama.
- [ ] Tidak menggunakan MSE sebagai satu-satunya dasar evaluasi tanpa mempertimbangkan konteks masalah.

---

## Kesimpulan

**Mean Squared Error (MSE)** merupakan metrik evaluasi regresi yang menghitung rata-rata kuadrat error prediksi.

Karakteristik paling penting dari MSE adalah:

```text
Error kecil
→ pengaruh relatif kecil

Error besar
→ pengaruh jauh lebih besar
```

Hal tersebut membuat MSE berguna ketika kita ingin memberikan **penalti yang lebih besar terhadap kesalahan prediksi yang besar**.

Perbedaan utama ketiga metrik yang telah dipelajari:

```text
R²
→ seberapa baik model dibandingkan baseline rata-rata

MAE
→ seberapa besar rata-rata absolute error

MSE
→ seberapa besar rata-rata squared error
```

Kemudian:

```text
RMSE = √MSE
```

mengembalikan hasil evaluasi ke skala satuan target.

Dengan memahami perbedaan R², MAE, MSE, dan RMSE, kita dapat memilih metrik evaluasi yang lebih sesuai dengan karakteristik dan tujuan model regresi.

## Referensi

* https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics
* https://scikit-learn.org/stable/modules/model_evaluation.html
