---
sidebar_position: 25
title: "Evaluasi Regression Model: Mean Absolute Error (MAE)"
---

Setelah mempelajari **R² Score** pada materi sebelumnya, kita akan mempelajari metrik evaluasi regresi lainnya, yaitu:

> **Mean Absolute Error (MAE)**

MAE digunakan untuk mengukur **rata-rata besar kesalahan prediksi model** dibandingkan dengan nilai target sebenarnya.

Berbeda dengan R² yang memberikan ukuran relatif terhadap baseline, MAE memberikan informasi mengenai **seberapa besar kesalahan prediksi dalam satuan target**.

Misalnya kita membuat model untuk memprediksi harga rumah.

Jika:

```text
MAE = 0.32
```

dan target menggunakan satuan juta Rupiah, maka secara rata-rata selisih absolut antara prediksi dan nilai aktual adalah:

```text
0.32 juta Rupiah
```

atau sekitar:

```text
Rp320.000
```

Interpretasi tersebut bergantung pada satuan yang digunakan oleh target.

---

## R² Score vs MAE

R² dan MAE sama-sama dapat digunakan untuk mengevaluasi model regresi, tetapi memberikan informasi yang berbeda.

### R² Score

R² atau **Coefficient of Determination** mengukur seberapa baik model menjelaskan variasi target relatif terhadap baseline yang memprediksi rata-rata target.

Secara umum:

```text
R² = 1
→ prediksi sempurna pada data evaluasi

R² = 0
→ setara dengan baseline rata-rata

R² < 0
→ lebih buruk daripada baseline rata-rata
```

### Mean Absolute Error

MAE mengukur rata-rata besar kesalahan absolut prediksi.

```text
MAE semakin kecil
→ error prediksi semakin kecil
```

Perbedaan utamanya:

| Metrik | Apa yang Diukur? | Interpretasi |
|---|---|---|
| R² | Performa relatif terhadap baseline | Semakin tinggi umumnya semakin baik |
| MAE | Besar rata-rata error absolut | Semakin rendah semakin baik |

---

## Apa Itu Mean Absolute Error?

**Mean Absolute Error (MAE)** adalah rata-rata nilai absolut dari selisih antara nilai aktual dan nilai prediksi.

Secara sederhana:

> MAE menunjukkan seberapa jauh rata-rata prediksi model dari nilai sebenarnya.

Misalnya terdapat:

```text
Actual:
[100, 200, 300]

Prediction:
[110, 190, 320]
```

Maka selisihnya:

```text
110 - 100 = 10
190 - 200 = -10
320 - 300 = 20
```

Jika langsung dirata-ratakan:

```text
(10 + (-10) + 20) / 3
```

hasilnya:

```text
6.67
```

Namun nilai tersebut tidak menggambarkan rata-rata besar error karena error positif dan negatif dapat saling menghilangkan.

MAE mengatasi masalah tersebut dengan menggunakan **nilai absolut**.

```text
|10|  = 10
|-10| = 10
|20|  = 20
```

Kemudian:

```text
MAE = (10 + 10 + 20) / 3
```

sehingga:

```text
MAE = 13.33
```

Artinya, rata-rata besar kesalahan prediksi adalah sekitar:

```text
13.33 satuan target
```

---

## Formula MAE

Formula Mean Absolute Error adalah:

$$
MAE = \frac{1}{n}\sum_{i=1}^{n}|y_i-\hat{y}_i|
$$

Keterangan:

- `yᵢ` = nilai aktual
- `ŷᵢ` = nilai prediksi
- `n` = jumlah sampel
- `|yᵢ - ŷᵢ|` = nilai absolut error

Secara sederhana:

```text
MAE
=
Jumlah seluruh absolute error
÷
Jumlah sampel
```

---

## Mengapa Menggunakan Nilai Absolut?

Kesalahan prediksi dapat bernilai positif maupun negatif.

Misalnya:

```text
Actual = 100
Prediction = 110

Error = 110 - 100
      = 10
```

Sedangkan:

```text
Actual = 100
Prediction = 90

Error = 90 - 100
      = -10
```

Jika kita menjumlahkan error secara langsung:

```text
10 + (-10) = 0
```

Padahal terdapat dua kesalahan prediksi.

Karena itu, MAE menggunakan nilai absolut:

```text
|10|  = 10
|-10| = 10
```

Dengan demikian, seluruh error dihitung berdasarkan **besar kesalahannya**, bukan arah kesalahannya.

---

## Contoh Perhitungan MAE Secara Manual

Misalkan kita memiliki data berikut:

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

Hasilnya:

| Actual | Prediction | Error |
|---:|---:|---:|
| 100 | 110 | 10 |
| 200 | 190 | -10 |
| 300 | 320 | 20 |
| 400 | 380 | -20 |

### Langkah 2 - Hitung Absolute Error

| Actual | Prediction | Error | Absolute Error |
|---:|---:|---:|---:|
| 100 | 110 | 10 | 10 |
| 200 | 190 | -10 | 10 |
| 300 | 320 | 20 | 20 |
| 400 | 380 | -20 | 20 |

### Langkah 3 - Hitung Rata-Rata

Jumlah absolute error:

```text
10 + 10 + 20 + 20 = 60
```

Jumlah data:

```text
n = 4
```

Maka:

$$
MAE = \frac{60}{4}
$$

$$
MAE = 15
$$

Jadi:

```text
MAE = 15
```

Artinya, rata-rata besar kesalahan prediksi model adalah **15 satuan target**.

---

## Implementasi MAE dengan Scikit-Learn

Scikit-Learn menyediakan fungsi:

```python
mean_absolute_error()
```

yang tersedia dalam:

```python
sklearn.metrics
```

Import:

```python
from sklearn.metrics import mean_absolute_error
```

Kemudian gunakan:

```python
mae = mean_absolute_error(
    y_true=y_test,
    y_pred=y_preds
)

print(f"Mean Absolute Error: {mae}")
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

Misalnya kita sudah memiliki model regresi:

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
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

y_preds = model.predict(X_test)

mae = mean_absolute_error(
    y_true=y_test,
    y_pred=y_preds
)

print(f"MAE: {mae:.4f}")
```

Misalnya output:

```text
MAE: 0.3265
```

Maka interpretasinya:

> Rata-rata besar kesalahan absolut prediksi model adalah sekitar `0.3265` satuan target.

---

## Menggunakan Pandas untuk Melihat Error

Agar lebih mudah memahami bagaimana MAE dihitung, kita dapat membuat DataFrame yang membandingkan nilai aktual dan prediksi.

```python
import pandas as pd

df = pd.DataFrame({
    "Actual values": y_test,
    "Predicted values": y_preds
})

df.head()
```

Hasilnya dapat terlihat seperti:

```text
   Actual values  Predicted values
0          2.31              2.45
1          1.82              1.76
2          3.15              3.02
3          2.76              2.81
```

Dengan tabel tersebut kita dapat membandingkan hasil prediksi dengan nilai aktual secara langsung.

---

## Menambahkan Kolom Error

Kita dapat menghitung selisih prediksi dengan nilai aktual.

```python
df["Differences"] = (
    df["Predicted values"] -
    df["Actual values"]
)

df.head()
```

Contoh:

```text
   Actual values  Predicted values  Differences
0          2.31              2.45         0.14
1          1.82              1.76        -0.06
2          3.15              3.02        -0.13
3          2.76              2.81         0.05
```

Kolom `Differences` dapat bernilai positif maupun negatif.

---

## Menambahkan Absolute Error

Untuk menghitung MAE secara manual, kita dapat mengubah error menjadi nilai absolut.

```python
df["Absolute Error"] = df["Differences"].abs()

df.head()
```

Hasilnya:

```text
   Actual values  Predicted values  Differences  Absolute Error
0          2.31              2.45         0.14            0.14
1          1.82              1.76        -0.06            0.06
2          3.15              3.02        -0.13            0.13
3          2.76              2.81         0.05            0.05
```

Sekarang setiap error sudah memiliki nilai positif.

---

## Menghitung MAE Secara Manual dengan Pandas

Setelah memiliki kolom `Absolute Error`, kita dapat menghitung rata-ratanya.

```python
mae_manual = df["Absolute Error"].mean()

print(f"MAE Manual: {mae_manual}")
```

Perhitungan tersebut secara konsep sama dengan:

```python
mean_absolute_error(
    y_test,
    y_preds
)
```

---

## Menghitung MAE dengan NumPy

MAE juga dapat dihitung menggunakan NumPy.

```python
import numpy as np

mae_manual = np.abs(
    y_preds - y_test
).mean()

print(f"MAE Manual: {mae_manual}")
```

Penjelasan:

```python
y_preds - y_test
```

menghasilkan error.

Kemudian:

```python
np.abs(...)
```

mengubah error menjadi nilai absolut.

Terakhir:

```python
.mean()
```

menghitung rata-ratanya.

---

## Membandingkan MAE Manual dan Scikit-Learn

Kita dapat membandingkan kedua metode:

```python
from sklearn.metrics import mean_absolute_error
import numpy as np

mae_sklearn = mean_absolute_error(
    y_test,
    y_preds
)

mae_manual = np.abs(
    y_preds - y_test
).mean()

print(f"MAE Scikit-Learn: {mae_sklearn}")
print(f"MAE Manual:       {mae_manual}")
```

Hasilnya seharusnya sama atau sangat dekat karena menggunakan formula yang sama.

Contoh:

```text
MAE Scikit-Learn: 0.3265
MAE Manual:       0.3265
```

Perbedaan kecil pada tampilan angka dapat terjadi karena representasi floating-point.

---

## Interpretasi MAE

Salah satu kelebihan utama MAE adalah interpretasinya relatif mudah.

Misalnya:

```text
MAE = 10
```

Jika target memiliki satuan:

```text
kilometer
```

maka:

```text
MAE = 10 kilometer
```

Jika target memiliki satuan:

```text
juta Rupiah
```

maka:

```text
MAE = 10 juta Rupiah
```

Jika target memiliki satuan:

```text
derajat Celsius
```

maka:

```text
MAE = 10°C
```

Dengan demikian, MAE tetap berada dalam **satuan yang sama dengan target**.

---

## MAE Semakin Kecil Semakin Baik

Untuk MAE:

```text
MAE = 0
```

merupakan kondisi ideal karena berarti tidak terdapat error absolut.

Secara umum:

```text
MAE kecil
→ error prediksi kecil
→ model lebih dekat dengan nilai aktual
```

Sedangkan:

```text
MAE besar
→ error prediksi besar
→ model lebih jauh dari nilai aktual
```

Berbeda dengan R² yang umumnya semakin tinggi semakin baik, MAE justru semakin baik ketika nilainya semakin kecil.

---

## Contoh Membandingkan Dua Model

Misalkan terdapat dua model:

```text
Model A → MAE = 0.25
Model B → MAE = 0.40
```

Jika kedua model dievaluasi pada dataset dan target yang sama, Model A memiliki rata-rata absolute error yang lebih kecil.

Secara sederhana:

```text
Model A
↓
Prediksi rata-rata lebih dekat dengan nilai aktual

Model B
↓
Prediksi rata-rata lebih jauh dari nilai aktual
```

Namun evaluasi model tetap perlu mempertimbangkan metrik dan kebutuhan lainnya.

---

## MAE Tidak Menunjukkan Arah Error

MAE menggunakan nilai absolut.

Misalnya:

```text
Error = +10
Error = -10
```

keduanya menjadi:

```text
Absolute Error = 10
```

Akibatnya, MAE tidak memberi tahu apakah model cenderung:

```text
Overpredict
```

atau:

```text
Underpredict
```

MAE hanya menunjukkan **besar rata-rata error absolut**.

Jika arah error juga penting, kita dapat memeriksa error bertanda secara terpisah.

Contohnya:

```python
errors = y_preds - y_test

print(errors.mean())
```

Nilai rata-rata error bertanda dapat memberikan informasi mengenai kecenderungan model melakukan overprediction atau underprediction.

---

## MAE dan Outlier

MAE menggunakan nilai absolut sehingga error besar tetap memberikan kontribusi besar terhadap nilai MAE.

Misalnya terdapat error:

```text
1
2
3
4
50
```

MAE:

$$
MAE = \frac{1+2+3+4+50}{5}
$$

$$
MAE = 12
$$

Error `50` memberikan kontribusi besar terhadap MAE.

Namun MAE menggunakan **absolute error**, bukan kuadrat error.

Karena itu, MAE umumnya tidak memberikan penalti yang sebesar MSE terhadap error yang sangat besar.

Perbandingan lebih lanjut antara MAE dan MSE akan dibahas pada materi khusus MSE.

---

## MAE dan R² Memberikan Informasi Berbeda

Misalnya sebuah model menghasilkan:

```text
R²  = 0.82
MAE = 0.35
```

Kedua angka tersebut menjelaskan aspek yang berbeda.

### R²

Memberikan informasi mengenai performa model relatif terhadap baseline rata-rata.

```text
R² = 0.82
```

menunjukkan model menjelaskan variasi target dengan cukup baik relatif terhadap baseline pada data evaluasi tersebut.

### MAE

Memberikan informasi mengenai rata-rata besar error dalam satuan target.

```text
MAE = 0.35
```

menunjukkan rata-rata absolute error sebesar `0.35` satuan target.

Karena itu, R² dan MAE dapat digunakan secara bersamaan.

---

## Perbandingan R² dan MAE

| Karakteristik | R² | MAE |
|---|---|---|
| Nama | Coefficient of Determination | Mean Absolute Error |
| Tujuan | Mengukur performa relatif terhadap baseline | Mengukur rata-rata besar error |
| Nilai ideal | `1` | `0` |
| Semakin tinggi | Umumnya semakin baik | Semakin buruk |
| Semakin rendah | Dapat menunjukkan performa lebih buruk | Umumnya semakin baik |
| Memiliki satuan target | Tidak | Ya |
| Dapat bernilai negatif | Ya | Tidak |
| Mudah diinterpretasikan dalam satuan target | Tidak | Ya |

---

## MAE dalam Workflow Machine Learning

MAE digunakan setelah model menghasilkan prediksi.

Workflow sederhananya:

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
Compare
y_test vs y_preds
   │
   ▼
MAE
   │
   ▼
Interpretasi Error
```

MAE dihitung menggunakan nilai aktual pada test set dan prediksi model terhadap test set.

---

## Contoh Evaluasi R² dan MAE Bersamaan

Dalam praktiknya kita dapat menghitung R² dan MAE secara bersamaan.

```python
from sklearn.metrics import mean_absolute_error, r2_score

y_preds = model.predict(X_test)

r2 = r2_score(
    y_test,
    y_preds
)

mae = mean_absolute_error(
    y_test,
    y_preds
)

print(f"R²:  {r2:.2f}")
print(f"MAE: {mae:.2f}")
```

Contoh output:

```text
R²:  0.82
MAE: 0.35
```

Sekarang kita mendapatkan dua informasi:

```text
R²
→ seberapa baik model menjelaskan variasi target relatif terhadap baseline

MAE
→ seberapa besar rata-rata absolute error dalam satuan target
```

---

## Hal yang Perlu Diperhatikan

### MAE Tidak Sama dengan Persentase Error

Misalnya:

```text
MAE = 10
```

tidak berarti:

```text
Error = 10%
```

MAE memiliki satuan yang sama dengan target.

Jika target adalah harga dalam juta Rupiah:

```text
MAE = 10
```

berarti rata-rata absolute error adalah:

```text
10 juta Rupiah
```

bukan 10%.

---

### MAE Tidak Menunjukkan Setiap Error

MAE merupakan rata-rata.

Misalnya:

```text
MAE = 10
```

tidak berarti setiap prediksi memiliki error tepat `10`.

Bisa saja error individualnya:

```text
2
5
8
15
20
```

tetapi rata-ratanya menghasilkan:

```text
MAE = 10
```

Karena itu, melihat distribusi error juga dapat membantu memahami perilaku model secara lebih lengkap.

---

### MAE Harus Dibandingkan pada Skala yang Sama

Misalnya:

```text
Model A → MAE = 0.2
Model B → MAE = 0.5
```

Perbandingan tersebut masuk akal jika kedua model memprediksi target yang sama pada skala yang sama.

Jika target atau transformasi target berbeda, angka MAE tidak dapat dibandingkan secara langsung tanpa mempertimbangkan skalanya.

---

## Contoh Lengkap

Berikut contoh lengkap mulai dari training hingga evaluasi menggunakan MAE dan R².

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
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

# Evaluasi R²
r2 = r2_score(
    y_test,
    y_preds
)

# Evaluasi MAE
mae = mean_absolute_error(
    y_test,
    y_preds
)

print(f"R² Score: {r2:.2f}")
print(f"MAE: {mae:.2f}")
```

Contoh:

```text
R² Score: 0.82
MAE: 0.35
```

Kedua metrik tersebut memberikan perspektif yang berbeda mengenai performa model.

---

## Ringkasan

**Mean Absolute Error (MAE)** mengukur rata-rata besar kesalahan absolut antara prediksi model dan nilai aktual.

Formula:

$$
MAE = \frac{1}{n}\sum_{i=1}^{n}|y_i-\hat{y}_i|
$$

Hal-hal penting yang perlu diingat:

- MAE mengukur rata-rata besar error.
- MAE menggunakan nilai absolut.
- Error positif dan negatif tidak saling menghilangkan.
- MAE memiliki satuan yang sama dengan target.
- MAE `0` berarti tidak terdapat error absolut pada prediksi yang dievaluasi.
- Semakin kecil MAE, semakin kecil rata-rata absolute error.
- MAE tidak menunjukkan arah error.
- MAE dapat digunakan bersama R².
- MAE tidak sama dengan persentase error.
- MAE merupakan rata-rata sehingga tidak menggambarkan setiap error individual.
- MAE dapat digunakan untuk membandingkan model pada dataset dan target yang sama.

---

## Checklist Evaluasi dengan MAE

Sebelum menggunakan MAE, pastikan:

- [ ] Model sudah dilatih menggunakan training data.
- [ ] Prediksi dibuat menggunakan data evaluasi.
- [ ] `y_test` dan `y_preds` memiliki jumlah sampel yang sesuai.
- [ ] MAE dihitung menggunakan `mean_absolute_error()`.
- [ ] Memahami bahwa MAE memiliki satuan yang sama dengan target.
- [ ] Memahami bahwa MAE semakin kecil semakin baik.
- [ ] Tidak menganggap MAE sebagai persentase error.
- [ ] Memahami bahwa MAE tidak menunjukkan arah error.
- [ ] Membandingkan MAE pada dataset dan skala target yang sama.
- [ ] Menggunakan metrik lain seperti R² untuk melengkapi evaluasi.

---

## Kesimpulan

**Mean Absolute Error (MAE)** merupakan metrik yang sangat berguna untuk memahami **seberapa besar kesalahan prediksi model secara rata-rata**.

Jika sebuah model menghasilkan:

```text
MAE = 0.32
```

maka secara sederhana kita dapat mengatakan bahwa rata-rata **absolute error** prediksi model adalah `0.32` satuan target.

Keunggulan utama MAE adalah interpretasinya yang mudah karena nilainya berada pada **satuan yang sama dengan target**.

MAE juga melengkapi R²:

```text
R²
→ Performa model relatif terhadap baseline rata-rata

MAE
→ Besar rata-rata absolute error dalam satuan target
```

Dengan menggunakan kedua metrik tersebut, kita mendapatkan gambaran yang lebih lengkap mengenai performa model regresi.

## Referensi

* https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics
* https://scikit-learn.org/stable/modules/model_evaluation.html
