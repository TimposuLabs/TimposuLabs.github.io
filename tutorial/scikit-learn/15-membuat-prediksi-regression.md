---
sidebar_position: 16
title: "Membuat Prediksi: Regression"
---

Setelah memahami cara memilih estimator, melatih model menggunakan `fit()`, dan membuat prediksi pada model klasifikasi, langkah berikutnya adalah memahami bagaimana `predict()` digunakan pada masalah **regresi**.

Pada regresi, model digunakan untuk memprediksi sebuah **nilai numerik**. Salah satu algoritma yang dapat digunakan adalah **Random Forest Regressor** dari Scikit-Learn.

Pada materi ini kita akan mempelajari:

- Menentukan fitur `X` dan target `y`
- Membagi dataset menjadi training set dan test set
- Membuat `RandomForestRegressor`
- Melatih model menggunakan `fit()`
- Membuat prediksi menggunakan `predict()`
- Memahami `NotFittedError`
- Mengevaluasi prediksi menggunakan **Mean Absolute Error (MAE)**

---

## Regresi dan Prediksi Nilai Numerik

Pada masalah regresi, target yang ingin diprediksi berupa nilai numerik.

Contohnya:

| Fitur | Target |
|---|---:|
| Luas rumah | Harga rumah |
| Jumlah kamar | Harga rumah |
| Jarak ke pusat kota | Harga rumah |
| Usia bangunan | Harga rumah |

Model akan mempelajari hubungan antara fitur-fitur tersebut dengan target.

Secara sederhana:

```text
X (Features)
     │
     ▼
Machine Learning Model
     │
     ▼
Prediksi Nilai Numerik
```

Misalnya model memprediksi harga rumah:

```text
Nilai sebenarnya  →  2.50
Prediksi model    →  2.82
```

Maka terdapat selisih antara nilai sebenarnya dan nilai prediksi.

Selisih tersebut nantinya dapat digunakan untuk menghitung **error**.

---

## Random Forest Regressor

`RandomForestRegressor` merupakan algoritma regresi berbasis **ensemble learning**.

Model Random Forest membangun sejumlah decision tree dan menggabungkan hasil dari tree-tree tersebut untuk menghasilkan prediksi.

Secara sederhana:

```text
                Random Forest
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
    Tree 1        Tree 2        Tree 3
       │             │             │
       ▼             ▼             ▼
   Prediksi       Prediksi      Prediksi
       │             │             │
       └─────────────┼─────────────┘
                     ▼
              Hasil Prediksi
```

![Random Forest](https://miro.medium.com/v2/1*R3oJiyaQwyLUyLZL-scDpw.png)

*Sumber: https://medium.com/@denizgunay/random-forest-af5bde5d7e1e*

Pada regresi, hasil prediksi Random Forest berasal dari penggabungan prediksi dari banyak decision tree.

---

## Menyiapkan Fitur dan Target

Sebelum membuat model, dataset perlu dipisahkan menjadi:

- `X` → fitur atau variabel input
- `y` → target atau nilai yang ingin diprediksi

Misalnya dataset memiliki kolom bernama `target`.

```python
X = housing_df.drop("target", axis=1)
y = housing_df["target"]
```

### `X`

`X` berisi seluruh fitur yang digunakan model untuk melakukan prediksi.

```python
X = housing_df.drop("target", axis=1)
```

Perintah tersebut menghapus kolom `target` dari DataFrame.

Dengan demikian, `X` hanya berisi fitur.

### `y`

`y` berisi target yang ingin diprediksi.

```python
y = housing_df["target"]
```

Secara sederhana:

```text
housing_df
    │
    ├── Feature 1
    ├── Feature 2
    ├── Feature 3
    └── target
          │
          ├── X → Feature 1, Feature 2, Feature 3
          └── y → target
```

---

## Membagi Data Training dan Test

Dataset kemudian dibagi menjadi training set dan test set.

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

Parameter `test_size=0.2` berarti sekitar 20% data digunakan sebagai test set dan sisanya sekitar 80% digunakan sebagai training set.

```text
Dataset
   │
   ├────────────── 80% ──────────────┐
   │                                  │
Training Set                      Test Set
   │                                  │
X_train, y_train                 X_test, y_test
```

### Mengapa data harus dibagi?

Model perlu dilatih menggunakan sebagian data dan kemudian diuji menggunakan data yang tidak digunakan untuk fitting.

Tujuannya adalah untuk melihat bagaimana model bekerja terhadap data yang belum digunakan saat proses training.

---

## Random State

Kita dapat menggunakan `random_state` untuk membuat proses pembagian data dapat direproduksi.

```python
random_state=42
```

Angka `42` bukan angka khusus. Angka tersebut hanya digunakan sebagai seed agar pembagian data yang dilakukan dapat menghasilkan pembagian yang konsisten pada eksekusi berikutnya.

Contohnya:

```python
train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

Dengan `random_state` yang sama, pembagian data akan dapat direproduksi.

---

## Membuat Random Forest Regressor

Selanjutnya kita membuat model Random Forest Regressor.

```python
from sklearn.ensemble import RandomForestRegressor

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)
```

Parameter:

### `n_estimators`

Menentukan jumlah decision tree yang digunakan dalam Random Forest.

Contohnya:

```python
n_estimators=100
```

berarti kita meminta model menggunakan 100 decision tree.

Nilai tersebut dapat diatur sesuai kebutuhan.

### `random_state`

Digunakan agar proses yang melibatkan randomness dapat direproduksi.

---

## Melatih Model dengan `fit()`

Setelah model dibuat, model perlu dilatih menggunakan data training.

```python
model.fit(X_train, y_train)
```

Metode `fit()` digunakan untuk mempelajari pola dari data training.

Dalam kasus ini:

```text
X_train → Features
y_train → Target
```

Model mencoba mempelajari hubungan:

```text
X_train
   │
   ▼
Random Forest
   │
   ▼
Pola hubungan X dengan y
```

Setelah proses `fit()` selesai, model siap digunakan untuk melakukan prediksi.

---

## Menggunakan `predict()`

Setelah model dilatih, kita dapat menggunakan `predict()`.

```python
y_preds = model.predict(X_test)
```

`predict()` digunakan untuk menghasilkan nilai prediksi berdasarkan data input.

Pada kode tersebut:

```python
X_test
```

diberikan kepada model.

Kemudian model menghasilkan:

```python
y_preds
```

yang berisi nilai prediksi.

Alurnya:

```text
X_test
   │
   ▼
model.predict()
   │
   ▼
y_preds
```

---

## Melihat Hasil Prediksi

Kita dapat melihat beberapa hasil prediksi pertama.

```python
print("Hasil Prediksi:")
print(y_preds[:10])
```

`[:10]` digunakan untuk mengambil 10 nilai pertama.

Misalnya hasilnya:

```text
Hasil Prediksi:
[2.45 3.12 1.87 2.91 4.02 2.74 1.95 3.45 2.61 3.08]
```

Nilai tersebut merupakan hasil prediksi model untuk 10 data pertama pada `X_test`.

---

## Membandingkan Prediksi dengan Nilai Sebenarnya

Untuk mengetahui seberapa baik prediksi model, kita perlu membandingkan:

```text
y_test  → nilai sebenarnya
y_preds → nilai prediksi
```

Contohnya:

| Data | Nilai Sebenarnya | Prediksi |
|---|---:|---:|
| 1 | 2.50 | 2.45 |
| 2 | 3.20 | 3.12 |
| 3 | 1.90 | 1.87 |
| 4 | 2.80 | 2.91 |

Semakin kecil perbedaan antara nilai sebenarnya dan prediksi, semakin kecil error prediksi pada data tersebut.

---

## Apa Itu Mean Absolute Error?

Salah satu metrik yang dapat digunakan untuk mengevaluasi model regresi adalah **Mean Absolute Error (MAE)**.

MAE menghitung rata-rata nilai absolut dari selisih antara nilai sebenarnya dan nilai prediksi.

Rumusnya:

$$
MAE = \frac{1}{n}\sum_{i=1}^{n}|y_i-\hat{y}_i|
$$

Keterangan:

- `n` = jumlah data
- `yᵢ` = nilai sebenarnya
- `ŷᵢ` = nilai prediksi
- `|yᵢ - ŷᵢ|` = absolute error

---

## Contoh Perhitungan MAE

Misalnya terdapat tiga data:

| Data | Aktual | Prediksi | Absolute Error |
|---|---:|---:|---:|
| 1 | 10 | 8 | 2 |
| 2 | 20 | 23 | 3 |
| 3 | 30 | 29 | 1 |

Maka:

```text
MAE = (2 + 3 + 1) / 3
    = 6 / 3
    = 2
```

Jadi MAE adalah:

```text
2
```

Artinya, secara rata-rata, prediksi model memiliki selisih absolut sebesar 2 satuan dari nilai sebenarnya.

---

## Menghitung MAE dengan Scikit-Learn

Scikit-Learn menyediakan fungsi `mean_absolute_error()`.

```python
from sklearn.metrics import mean_absolute_error

mae = mean_absolute_error(y_test, y_preds)

print(f"Mean Absolute Error (MAE): {mae}")
```

Fungsi tersebut membandingkan:

```python
y_test
```

dengan:

```python
y_preds
```

---

## Interpretasi Nilai MAE

Misalnya diperoleh:

```text
Mean Absolute Error (MAE): 0.32
```

Secara umum, hasil tersebut berarti rata-rata selisih absolut antara prediksi dan nilai sebenarnya adalah sekitar `0.32` dalam **satuan target**.

Namun, interpretasi angka `0.32` harus melihat skala dan satuan target.

Misalnya target diukur dalam:

```text
juta rupiah
```

maka MAE `0.32` berarti sekitar:

```text
0.32 juta rupiah
```

atau:

```text
Rp320.000
```

Jika target menggunakan satuan yang berbeda, interpretasinya juga berbeda.

Jadi MAE tidak boleh diinterpretasikan hanya berdasarkan angkanya tanpa mengetahui skala target.

---

## MAE Semakin Kecil Semakin Baik?

Untuk MAE, nilai yang lebih kecil berarti rata-rata error absolut lebih kecil.

Contohnya:

```text
Model A → MAE = 0.80
Model B → MAE = 0.35
```

Secara metrik MAE, Model B memiliki rata-rata absolute error yang lebih kecil pada dataset evaluasi tersebut.

Namun, pemilihan model tidak sebaiknya hanya berdasarkan satu metrik. Kita juga perlu mempertimbangkan dataset, tujuan penggunaan model, serta metrik evaluasi lain yang relevan.

---

## Memahami NotFittedError

Salah satu error yang dapat muncul ketika menggunakan `predict()` adalah `NotFittedError`.

Contohnya:

```python
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

y_preds = model.predict(X_test)
```

Kode tersebut bermasalah karena model belum dilatih.

Kita belum menjalankan:

```python
model.fit(X_train, y_train)
```

Akibatnya, model belum memiliki parameter atau struktur hasil pembelajaran yang diperlukan untuk melakukan prediksi.

---

## Urutan yang Benar

Urutan penggunaan model adalah:

```text
1. Membuat model
       ↓
2. fit()
       ↓
3. predict()
       ↓
4. Evaluasi
```

Contohnya:

```python
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

y_preds = model.predict(X_test)

mae = mean_absolute_error(y_test, y_preds)
```

Jangan membalik urutan menjadi:

```text
create model
     ↓
predict()
     ↓
fit()
```

karena model belum dilatih ketika `predict()` dipanggil.

---

## Contoh Lengkap

Berikut contoh lengkap workflow Random Forest Regressor.

```python
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split

# 1. Menentukan fitur dan target
X = housing_df.drop("target", axis=1)
y = housing_df["target"]

# 2. Membagi data menjadi training dan test set
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

# 5. Membuat prediksi
y_preds = model.predict(X_test)

# 6. Melihat 10 prediksi pertama
print("Hasil Prediksi:")
print(y_preds[:10])

# 7. Menghitung MAE
mae = mean_absolute_error(y_test, y_preds)

print(f"Mean Absolute Error (MAE): {mae}")
```

---

## Visualisasi Prediksi dan Nilai Aktual

Selain menggunakan angka MAE, kita juga dapat melihat hubungan antara nilai aktual dan prediksi menggunakan scatter plot.

```python
import matplotlib.pyplot as plt

plt.figure(figsize=(8, 6))

plt.scatter(y_test, y_preds)

plt.xlabel("Nilai Aktual")
plt.ylabel("Nilai Prediksi")
plt.title("Nilai Aktual vs Prediksi")

plt.show()
```

Jika prediksi model semakin mendekati nilai aktual, titik-titik pada grafik cenderung berada di sekitar garis diagonal.

Kita dapat menambahkan garis referensi:

```python
import numpy as np
import matplotlib.pyplot as plt

plt.figure(figsize=(8, 6))

plt.scatter(y_test, y_preds)

min_value = min(y_test.min(), y_preds.min())
max_value = max(y_test.max(), y_preds.max())

plt.plot(
    [min_value, max_value],
    [min_value, max_value],
    linestyle="--"
)

plt.xlabel("Nilai Aktual")
plt.ylabel("Nilai Prediksi")
plt.title("Nilai Aktual vs Prediksi")

plt.show()
```

Garis diagonal tersebut merepresentasikan kondisi:

```text
Prediksi = Nilai Aktual
```

Semakin dekat titik terhadap garis tersebut, semakin dekat prediksi terhadap nilai aktual pada data yang ditampilkan.

---

## MAE vs R²

Pada regresi, kita dapat menggunakan beberapa metrik evaluasi.

Dua metrik yang sering digunakan adalah:

| Metrik | Mengukur | Interpretasi |
|---|---|---|
| MAE | Rata-rata absolute error | Semakin kecil semakin baik |
| R² | Proporsi variasi target yang dijelaskan model relatif terhadap baseline | Semakin tinggi umumnya semakin baik |

Contoh MAE:

```python
from sklearn.metrics import mean_absolute_error

mae = mean_absolute_error(y_test, y_preds)
```

Contoh R²:

```python
r2 = model.score(X_test, y_test)

print(f"R²: {r2}")
```

Untuk `RandomForestRegressor`, metode `score()` secara default menggunakan **R²**.

---

## MAE Memiliki Satuan yang Sama dengan Target

Salah satu kelebihan MAE adalah hasilnya berada dalam satuan yang sama dengan target.

Misalnya target:

```text
Harga rumah dalam juta rupiah
```

dan:

```text
MAE = 25
```

maka rata-rata absolute error adalah sekitar:

```text
25 juta rupiah
```

Hal ini membuat MAE cukup mudah diinterpretasikan dalam konteks bisnis atau domain tertentu.

---

## Perbedaan MAE dan MSE

Selain MAE, terdapat juga Mean Squared Error atau MSE.

Rumus MAE:

$$
MAE = \frac{1}{n}\sum |y_i-\hat{y}_i|
$$

Rumus MSE:

$$
MSE = \frac{1}{n}\sum (y_i-\hat{y}_i)^2
$$

Perbedaan utamanya adalah MSE mengkuadratkan error.

Akibatnya, error yang besar mendapatkan penalti yang lebih besar pada MSE.

Contohnya:

```text
Error = 2
MAE contribution = 2
MSE contribution = 4
```

Sedangkan:

```text
Error = 10
MAE contribution = 10
MSE contribution = 100
```

Karena perbedaan tersebut, MAE dan MSE dapat memberikan perspektif yang berbeda terhadap kualitas model.

---

## Kesalahan Umum

### 1. Memanggil `predict()` Sebelum `fit()`

Salah:

```python
model = RandomForestRegressor()

y_preds = model.predict(X_test)
```

Benar:

```python
model = RandomForestRegressor()

model.fit(X_train, y_train)

y_preds = model.predict(X_test)
```

---

### 2. Menggunakan Data Training untuk Evaluasi Akhir

Contoh yang kurang tepat untuk mengevaluasi kemampuan generalisasi:

```python
y_train_preds = model.predict(X_train)

mae = mean_absolute_error(
    y_train,
    y_train_preds
)
```

MAE tersebut mengukur performa pada data yang sudah digunakan untuk melatih model.

Untuk mengevaluasi performa pada data yang belum digunakan saat fitting, gunakan test set:

```python
y_test_preds = model.predict(X_test)

mae = mean_absolute_error(
    y_test,
    y_test_preds
)
```

---

### 3. Menganggap MAE 0.32 Selalu Berarti Sangat Baik

MAE harus dibandingkan dengan konteks target.

Misalnya:

```text
Target rata-rata = 1.0
MAE = 0.32
```

berbeda konteks dengan:

```text
Target rata-rata = 1,000,000
MAE = 0.32
```

Karena itu, angka MAE perlu dipahami berdasarkan skala target dan kebutuhan aplikasi.

---

### 4. Menggunakan Data yang Tidak Sesuai

Model harus menerima fitur dengan struktur yang sesuai dengan data saat training.

Misalnya model dilatih dengan:

```text
Feature A
Feature B
Feature C
Feature D
```

maka data yang diberikan saat prediksi harus memiliki fitur yang sesuai dengan proses preprocessing dan struktur yang digunakan saat training.

Dalam workflow produksi, penggunaan `Pipeline` sangat membantu menjaga konsistensi preprocessing antara training dan prediction.

---

## Workflow Lengkap

Workflow regresi yang dipelajari sampai tahap ini dapat dirangkum sebagai berikut:

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
Training Set     Test Set
   │               │
   ▼               │
Membuat Model      │
   │               │
   ▼               │
fit()              │
   │               │
   ▼               │
Model Terlatih     │
   │               │
   └───────┬───────┘
           ▼
       predict()
           │
           ▼
        y_preds
           │
           ▼
   Evaluasi Model
           │
      ┌────┴────┐
      ▼         ▼
     MAE       R²
```

---

## Ringkasan

Beberapa konsep penting dari materi ini:

1. **RandomForestRegressor** digunakan untuk masalah regresi.
2. `X` berisi fitur yang digunakan untuk melakukan prediksi.
3. `y` berisi target yang ingin diprediksi.
4. `train_test_split()` digunakan untuk membagi data menjadi training dan test set.
5. `fit()` digunakan untuk melatih model.
6. `predict()` digunakan untuk menghasilkan nilai prediksi.
7. `predict()` harus dipanggil setelah model dilatih.
8. `NotFittedError` dapat terjadi ketika `predict()` dipanggil sebelum `fit()`.
9. `mean_absolute_error()` digunakan untuk menghitung MAE.
10. MAE menunjukkan rata-rata absolute error dalam satuan target.
11. Nilai MAE yang lebih kecil menunjukkan error absolut rata-rata yang lebih kecil pada dataset evaluasi.
12. Interpretasi MAE harus mempertimbangkan skala dan satuan target.
13. `model.score()` pada `RandomForestRegressor` secara default menghasilkan nilai R².
14. Evaluasi sebaiknya dilakukan pada data yang tidak digunakan untuk fitting.

---

## Latihan

Gunakan dataset regresi yang tersedia dan lakukan eksperimen berikut.

### Latihan 1 - Membuat Model

Buat `RandomForestRegressor` dengan:

```python
n_estimators=100
random_state=42
```

Kemudian lakukan training menggunakan `X_train` dan `y_train`.

### Latihan 2 - Membuat Prediksi

Gunakan:

```python
model.predict(X_test)
```

Simpan hasilnya ke dalam variabel:

```python
y_preds
```

### Latihan 3 - Menghitung MAE

Hitung MAE menggunakan:

```python
mean_absolute_error(y_test, y_preds)
```

### Latihan 4 - Membandingkan Jumlah Tree

Bandingkan beberapa nilai:

```text
n_estimators = 10
n_estimators = 50
n_estimators = 100
n_estimators = 200
```

Catat nilai MAE dan R² masing-masing model.

### Latihan 5 - Visualisasi

Buat scatter plot:

```text
Nilai Aktual vs Nilai Prediksi
```

Kemudian amati bagaimana posisi prediksi terhadap garis diagonal.
