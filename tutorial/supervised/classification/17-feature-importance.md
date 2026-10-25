---
sidebar_position: 18
title: "Feature Importance"
---

## 1. Pengantar Feature Importance

Setelah membangun dan mengevaluasi model Machine Learning, kita perlu memahami fitur apa saja yang berkontribusi terhadap prediksi model.

**Feature Importance** adalah sebuah teknik atau metrik dalam machine learning yang digunakan untuk menentukan seberapa besar pengaruh atau kontribusi masing-masing variabel (fitur/kolom data) terhadap prediksi yang dihasilkan oleh sebuah model.

Secara singkat, fitur ini berfungsi untuk menjawab pertanyaan: *"Dari sekian banyak data atau kolom yang kita masukkan ke dalam model, kolom mana yang paling menentukan hasil akhir?"*

Misalnya, dalam proyek *Heart Disease Classification*, kita menggunakan berbagai karakteristik pada dataset, seperti:

- Usia (*age*).
- Jenis kelamin (*sex*).
- Jenis nyeri dada (*cp*).
- Tekanan darah saat istirahat (*trestbps*).
- Kadar kolesterol (*chol*).
- Detak jantung maksimum (*thalach*).
- Angina akibat olahraga (*exang*).
- Kemiringan segmen ST saat puncak latihan (*slope*).

Model dapat menghasilkan prediksi, tetapi kita juga ingin menjawab pertanyaan berikut:

- Fitur apa yang memiliki pengaruh paling besar terhadap prediksi model?
- Fitur mana yang berkaitan dengan peningkatan atau penurunan peluang prediksi kelas positif?
- Apakah arah pengaruh fitur masuk akal berdasarkan pemahaman domain?
- Apakah ada fitur yang perlu ditinjau lebih lanjut?

Proses untuk memahami kontribusi fitur terhadap prediksi model sering disebut **Feature Importance** atau analisis kepentingan fitur.

Metode untuk mengukur kepentingan fitur berbeda-beda bergantung pada algoritma yang digunakan. Pada materi ini, kita akan menggunakan **koefisien Logistic Regression** untuk memahami hubungan antara fitur dan prediksi model.

Perlu dibedakan bahwa koefisien Logistic Regression bukan ukuran kepentingan universal yang dapat dibandingkan secara langsung dengan koefisien atau importance dari algoritma lain.

## 2. Memahami Koefisien Logistic Regression

Logistic Regression merupakan algoritma klasifikasi yang dapat digunakan untuk memperkirakan probabilitas suatu sampel termasuk ke dalam kelas tertentu.

Untuk klasifikasi biner, model Logistic Regression dapat dituliskan sebagai:

$$
P(y=1 \mid X) = \frac{1}{1+e^{-z}}
$$

dengan:

$$
z = b + w_1x_1 + w_2x_2 + \cdots + w_nx_n
$$

Keterangan:

- \(P(y=1 \mid X)\): probabilitas prediksi untuk kelas positif.
- \(b\): intercept atau konstanta model.
- \(w_i\): koefisien fitur ke-\(i\).
- \(x_i\): nilai fitur ke-\(i\).
- \(n\): jumlah fitur.

Koefisien menunjukkan arah dan besar perubahan *log-odds* prediksi kelas positif ketika suatu fitur berubah satu unit, dengan fitur lainnya dianggap tetap.

### 2.1 Koefisien Positif

Jika koefisien suatu fitur bernilai positif, peningkatan nilai fitur tersebut berkaitan dengan peningkatan *log-odds* prediksi kelas positif, dengan fitur lain dianggap tetap.

Contoh:

```python
coefficient = 0.75
```

Koefisien positif tersebut menunjukkan arah hubungan model terhadap kelas positif. Namun, besar koefisien perlu ditafsirkan berdasarkan skala fitur dan konteks model.

### 2.2 Koefisien Negatif

Jika koefisien suatu fitur bernilai negatif, peningkatan nilai fitur tersebut berkaitan dengan penurunan *log-odds* prediksi kelas positif, dengan fitur lain dianggap tetap.

Contoh:

```python
coefficient = -0.60
```

Artinya, peningkatan nilai fitur berkaitan dengan penurunan *log-odds* prediksi kelas positif menurut model.

**Penting:** Koefisien positif atau negatif tidak membuktikan hubungan sebab-akibat. Koefisien juga tidak secara langsung menunjukkan bahwa suatu fitur meningkatkan atau menurunkan risiko medis yang sebenarnya.

## 3. Menyiapkan Model Logistic Regression

Untuk memperoleh koefisien, model Logistic Regression harus dilatih terlebih dahulu.

Misalnya, pada materi sebelumnya kita telah melakukan hyperparameter tuning menggunakan GridSearchCV dan memperoleh objek bernama `gs_log_reg`.

Kita dapat menggunakan model terbaik tersebut secara langsung:

```python
clf = gs_log_reg.best_estimator_
```

Jika model terbaik berbentuk pipeline yang mencakup `StandardScaler` dan Logistic Regression, koefisien dapat diambil dari langkah Logistic Regression di dalam pipeline.

```python
log_reg = clf.named_steps["logisticregression"]

print(log_reg.coef_)
```

Nama langkah `logisticregression` harus disesuaikan dengan nama yang digunakan ketika pipeline dibuat.

Alternatifnya, kita dapat membuat model baru menggunakan parameter terbaik:

```python
from sklearn.linear_model import LogisticRegression

clf = LogisticRegression(
    C=best_params["logisticregression__C"],
    solver=best_params["logisticregression__solver"],
    max_iter=1000
)

clf.fit(X_train, y_train)
```

Kode alternatif tersebut mengasumsikan bahwa `best_params` berasal dari GridSearchCV yang menuning parameter Logistic Regression di dalam pipeline dengan nama langkah `logisticregression`.

Jika parameter terbaik diperoleh dari pipeline dengan StandardScaler, sebaiknya pertahankan preprocessing tersebut dengan menggunakan kembali `best_estimator_` atau membuat ulang pipeline yang sesuai.

## 4. Mengambil Koefisien dari Model

Setelah model dilatih, Scikit-learn menyediakan atribut `coef_` untuk mengakses koefisien Logistic Regression.

Contoh:

```python
print(clf.coef_)
```

Untuk model Logistic Regression biner dengan satu baris koefisien, hasilnya berbentuk array dua dimensi.

Misalnya, bentuk array secara ilustratif:

```text
[[ 0.25, -0.40, 0.70, -0.15, 0.32 ]]
```

Angka tersebut hanya ilustrasi. Nilai aktual bergantung pada data, preprocessing, dan hyperparameter model.

Setiap angka mewakili koefisien untuk satu fitur sesuai urutan fitur yang digunakan ketika model dilatih.

Masalahnya, deretan angka tersebut belum cukup informatif jika kita tidak mengetahui nama fitur yang berkaitan dengannya.

Karena itu, kita perlu menghubungkan setiap koefisien dengan nama kolom fitur.

## 5. Menghubungkan Koefisien dengan Nama Fitur

Jika model dilatih menggunakan fitur yang berasal dari DataFrame Pandas, kita dapat menggunakan `X_train.columns` untuk memperoleh nama fitur.

Contoh:

```python
import pandas as pd

feature_names = X_train.columns

coefficients = clf.coef_[0]

feature_dict = dict(
    zip(feature_names, coefficients)
)

print(feature_dict)
```

Contoh output:

```text
{'age': np.float64(0.003167280425913024),
 'sex': np.float64(-0.8604465017405314),
 'cp': np.float64(0.6606704375815468),
 'trestbps': np.float64(-0.011569931400895204),
 'chol': np.float64(-0.0016637445504085657),
 'fbs': np.float64(0.04386110683275644),
 'restecg': np.float64(0.3127584216723769),
 'thalach': np.float64(0.024593614040407018),
 'exang': np.float64(-0.6041307979006147),
 'oldpeak': np.float64(-0.5686280785492623),
 'slope': np.float64(0.45051628777983527),
 'ca': np.float64(-0.6360989513753182),
 'thal': np.float64(-0.6766337783287578)}
```

Penjelasan setiap bagian:

- `X_train.columns` mengambil nama fitur yang digunakan saat pelatihan.
- `clf.coef_[0]` mengambil deretan koefisien untuk kelas positif pada klasifikasi biner.
- `zip()` memasangkan setiap nama fitur dengan koefisiennya.
- `dict()` mengubah pasangan tersebut menjadi dictionary.

Menggunakan `X_train.columns` lebih aman daripada menggunakan `df.columns`, karena DataFrame awal dapat mencakup kolom target yang tidak digunakan sebagai fitur.

### 5.1 Membuat DataFrame Koefisien

Untuk memudahkan analisis dan visualisasi, kita dapat mengubah dictionary menjadi DataFrame.

```python
feature_importance = pd.DataFrame({
    "Feature": feature_names,
    "Coefficient": coefficients
})

print(feature_importance)
```

Contoh struktur hasil:

| Feature | Coefficient |
|---|---:|
| age | 0.25 |
| sex | -0.40 |
| cp | 0.70 |
| chol | -0.15 |
| thalach | 0.32 |

Nilai di atas merupakan ilustrasi, bukan hasil aktual model.

DataFrame tersebut membantu kita mengidentifikasi fitur dengan koefisien positif, negatif, dan besar koefisien yang berbeda.

## 6. Memahami Besar dan Arah Koefisien

Koefisien Logistic Regression perlu dibaca dari dua sudut pandang: **arah koefisien** dan **besar absolut koefisien**.

### 6.1 Arah Koefisien

- Koefisien positif: peningkatan fitur berkaitan dengan peningkatan *log-odds* kelas positif.
- Koefisien negatif: peningkatan fitur berkaitan dengan penurunan *log-odds* kelas positif.

Arah ini berlaku dengan asumsi fitur lainnya tetap dan mengikuti pengodean fitur yang digunakan model.

### 6.2 Besar Absolut Koefisien

Untuk melihat koefisien dengan nilai absolut terbesar, kita dapat menambahkan kolom baru.

```python
feature_importance["Abs_Coefficient"] = (
    feature_importance["Coefficient"].abs()
)

feature_importance = feature_importance.sort_values(
    by="Abs_Coefficient",
    ascending=False
)

print(feature_importance)
```

Contoh Output:

```text
     Feature  Coefficient  Abs_Coefficient
1        sex    -0.860447         0.860447
12      thal    -0.676634         0.676634
2         cp     0.660670         0.660670
11        ca    -0.636099         0.636099
8      exang    -0.604131         0.604131
9    oldpeak    -0.568628         0.568628
10     slope     0.450516         0.450516
6    restecg     0.312758         0.312758
5        fbs     0.043861         0.043861
7    thalach     0.024594         0.024594
3   trestbps    -0.011570         0.011570
0        age     0.003167         0.003167
4       chol    -0.001664         0.001664
```

Kolom `Abs_Coefficient` mengabaikan tanda positif atau negatif dan menunjukkan besar absolut koefisien.

Namun, koefisien mentah tidak selalu dapat dibandingkan secara adil jika skala fitur berbeda. Misalnya, satu fitur dapat memiliki satuan puluhan, sementara fitur lain memiliki satuan ribuan.

Untuk membandingkan besar koefisien dengan lebih bermakna, model dapat dilatih menggunakan fitur yang telah distandardisasi. Dalam kondisi tersebut, koefisien menggambarkan perubahan *log-odds* untuk kenaikan satu standar deviasi fitur, dengan fitur lain dianggap tetap.

Perlu diingat bahwa standardisasi membuat skala koefisien lebih sebanding, tetapi tidak otomatis menjadikan besar koefisien sebagai ukuran kontribusi prediktif yang lengkap.

## 7. Memvisualisasikan Koefisien Logistic Regression

Visualisasi grafik batang membantu kita melihat arah dan besar koefisien dengan lebih mudah.

Contoh berikut menggunakan DataFrame `feature_importance` yang sudah memiliki kolom `Feature` dan `Coefficient`.

```python
import matplotlib.pyplot as plt

plot_data = feature_importance.sort_values(
    by="Coefficient"
)

plt.figure(figsize=(10, 7))

plt.barh(
    plot_data["Feature"],
    plot_data["Coefficient"]
)

plt.axvline(0, linewidth=1)

plt.xlabel("Logistic Regression Coefficient")
plt.ylabel("Feature")
plt.title("Feature Coefficients in Logistic Regression")

plt.tight_layout()
plt.show()
```

![feature importance](/img/python/74.webp)

Cara membaca grafik:

- Batang di sisi positif menunjukkan koefisien positif.
- Batang di sisi negatif menunjukkan koefisien negatif.
- Jarak dari titik nol menunjukkan besar absolut koefisien.
- Fitur dengan batang yang lebih panjang memiliki koefisien dengan nilai absolut lebih besar pada skala model tersebut.

Grafik ini menampilkan koefisien, bukan ukuran kepentingan universal. Interpretasinya tetap perlu mempertimbangkan preprocessing, skala fitur, pengodean kategori, dan fitur lain dalam model.

## 8. Model-Driven Exploratory Data Analysis

Setelah memperoleh koefisien, kita dapat menggunakannya untuk melakukan *model-driven exploratory data analysis*.

Artinya, hasil model digunakan sebagai petunjuk untuk mengeksplorasi data lebih lanjut.

Sebagai contoh, kita dapat meninjau fitur berikut pada dataset Heart Disease:

- `sex`: pengodean jenis kelamin dalam dataset.
- `cp`: jenis nyeri dada yang direpresentasikan menggunakan kode kategori.
- `thalach`: detak jantung maksimum yang tercatat.
- `exang`: indikator angina akibat olahraga.
- `slope`: kode kategori untuk kemiringan segmen ST saat puncak latihan.

Jika koefisien salah satu fitur tampak besar atau arahnya tidak sesuai dengan dugaan awal, kita dapat melakukan pemeriksaan lebih lanjut.

Langkah analisis yang disarankan:

1. Periksa pengertian dan pengodean fitur dalam dokumentasi dataset.
2. Periksa apakah fitur distandardisasi atau ditransformasikan sebelum pelatihan.
3. Bandingkan hasil dengan distribusi fitur pada masing-masing kelas.
4. Tinjau hubungan antarfitur, misalnya melalui matriks korelasi untuk fitur numerik yang sesuai.
5. Diskusikan temuan yang berkaitan dengan domain bersama ahli yang relevan.
6. Validasi apakah pola tersebut stabil pada pembagian data atau metode analisis lain.

### 8.1 Hati-Hati dengan Fitur Kategori

Sebagian fitur pada dataset Heart Disease merupakan kode kategori. Misalnya, `cp` dan `slope` menggunakan angka untuk mewakili kategori.

Jika kode kategori diperlakukan sebagai angka biasa, Logistic Regression dapat mengasumsikan hubungan linear antara nilai kode dan *log-odds*. Asumsi tersebut belum tentu sesuai dengan makna kategori yang sebenarnya.

Untuk analisis yang lebih tepat, fitur nominal dapat diubah menjadi representasi seperti one-hot encoding. Pemilihan representasi perlu disesuaikan dengan definisi fitur dan tujuan analisis.

Selain itu, koefisien `sex` harus ditafsirkan berdasarkan pengodean dataset, bukan sebagai kesimpulan umum tentang jenis kelamin atau risiko penyakit.

### 8.2 Feature Importance Bukan Korelasi

Koefisien Logistic Regression dan korelasi merupakan dua ukuran yang berbeda.

- Korelasi mengukur hubungan statistik antara variabel menurut metode korelasi yang digunakan.
- Koefisien Logistic Regression menggambarkan hubungan kondisional antara fitur dan *log-odds* prediksi kelas positif dalam model.

Koefisien dapat berbeda dari pola korelasi sederhana karena model mempertimbangkan fitur-fitur lain secara bersamaan.

Keduanya tidak membuktikan hubungan sebab-akibat.

## 9. Keterbatasan Koefisien sebagai Feature Importance

Koefisien Logistic Regression berguna untuk memahami arah hubungan yang dipelajari model, tetapi ada beberapa keterbatasan yang harus diperhatikan.

### 9.1 Skala Fitur

Fitur dengan satuan berbeda dapat menghasilkan besar koefisien yang berbeda. Standardisasi dapat membantu perbandingan, khususnya ketika fitur bersifat numerik.

### 9.2 Multikolinearitas

Jika beberapa fitur berkorelasi kuat, koefisien dapat menjadi tidak stabil atau sulit ditafsirkan secara terpisah.

### 9.3 Pengodean Fitur Kategori

Koefisien fitur kategori bergantung pada cara kategori tersebut direpresentasikan, misalnya sebagai kode numerik atau one-hot encoding.

### 9.4 Regularisasi

Logistic Regression dapat menggunakan regularisasi untuk mengendalikan kompleksitas model. Nilai koefisien yang diperoleh dipengaruhi oleh jenis dan kekuatan regularisasi.

### 9.5 Bukan Hubungan Sebab-Akibat

Koefisien tidak membuktikan bahwa perubahan suatu fitur menyebabkan perubahan kondisi yang diprediksi.

### 9.6 Tidak Selalu Mengukur Kontribusi Prediktif secara Lengkap

Besar koefisien tidak selalu sama dengan seberapa penting suatu fitur bagi akurasi prediksi. Untuk mengevaluasi kontribusi prediktif, kita dapat menggunakan metode tambahan seperti permutation importance pada data validasi atau test set yang sesuai.

## 10. Contoh Lengkap Kode Feature Importance

Contoh berikut menggunakan pipeline dengan `StandardScaler` dan Logistic Regression. Model dilatih menggunakan training set, lalu koefisiennya diambil dan divisualisasikan.

File `heart-disease.csv` diasumsikan berada di direktori kerja yang sama dengan script Python.

```python
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# 1. Memuat dataset
df = pd.read_csv("heart-disease.csv")

# 2. Memisahkan fitur dan target
X = df.drop(columns=["target"])
y = df["target"]

# 3. Membagi data menjadi training set dan test set
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# 4. Membuat pipeline
clf = Pipeline([
    ("scaler", StandardScaler()),
    (
        "logisticregression",
        LogisticRegression(
            C=1.0,
            solver="liblinear",
            max_iter=1000
        )
    )
])

# 5. Melatih model
clf.fit(X_train, y_train)

# 6. Mengambil model Logistic Regression dari pipeline
log_reg = clf.named_steps["logisticregression"]

# 7. Mengambil nama fitur dan koefisien
feature_names = X_train.columns
coefficients = log_reg.coef_[0]

# 8. Membuat DataFrame koefisien
feature_importance = pd.DataFrame({
    "Feature": feature_names,
    "Coefficient": coefficients
})

# 9. Menghitung besar absolut koefisien
feature_importance["Abs_Coefficient"] = (
    feature_importance["Coefficient"].abs()
)

# 10. Mengurutkan berdasarkan besar absolut koefisien
feature_importance = feature_importance.sort_values(
    by="Abs_Coefficient",
    ascending=False
)

print("Koefisien Logistic Regression:")
print(feature_importance.round(4))

# 11. Membuat grafik batang koefisien
plot_data = feature_importance.sort_values(
    by="Coefficient"
)

plt.figure(figsize=(10, 7))

plt.barh(
    plot_data["Feature"],
    plot_data["Coefficient"]
)

plt.axvline(0, linewidth=1)

plt.xlabel("Coefficient (Standardized Features)")
plt.ylabel("Feature")
plt.title("Feature Coefficients - Logistic Regression")

plt.tight_layout()
plt.show()
```

![feature importance](/img/python/75.webp)

### Penjelasan Kode Lengkap

**Langkah 1–3: Memuat dan membagi dataset**

Dataset dibaca menggunakan Pandas. Kolom `target` dipisahkan dari fitur, kemudian data dibagi menjadi training set dan test set. Parameter `stratify=y` membantu mempertahankan proporsi kelas pada kedua bagian.

**Langkah 4–5: Membuat dan melatih pipeline**

Pipeline menjalankan StandardScaler sebelum Logistic Regression. Parameter scaling dipelajari dari training set saat model dilatih. Test set tidak digunakan untuk mempelajari preprocessing.

**Langkah 6–7: Mengambil koefisien**

`named_steps["logisticregression"]` mengambil estimator Logistic Regression dari pipeline. Atribut `coef_[0]` menyediakan koefisien untuk klasifikasi biner dengan urutan fitur yang sama seperti `X_train.columns`.

**Langkah 8–10: Mengolah koefisien**

Koefisien disimpan bersama nama fitur. Kolom `Abs_Coefficient` digunakan untuk mengurutkan fitur berdasarkan besar absolut koefisien. Pengurutan ini membantu eksplorasi, tetapi tidak boleh langsung dianggap sebagai peringkat kepentingan prediktif yang mutlak.

**Langkah 11: Membuat visualisasi**

Grafik batang menunjukkan koefisien positif dan negatif. Karena fitur distandardisasi, besar koefisien berkaitan dengan perubahan satu standar deviasi fitur, dengan fitur lain dianggap tetap.

Hasil aktual dapat berbeda bergantung pada versi dataset dan konfigurasi model. Contoh ini digunakan untuk pembelajaran dan bukan untuk membuat diagnosis medis.

## 11. Kesimpulan

Feature importance membantu kita memahami fitur yang digunakan model dalam menghasilkan prediksi. Pada Logistic Regression, koefisien dapat digunakan untuk mempelajari arah hubungan fitur dengan *log-odds* kelas positif.

Hal-hal penting yang perlu diingat:

- Atribut `coef_` menyimpan koefisien Logistic Regression.
- Nama fitur dapat dipasangkan dengan koefisien menggunakan `zip()`.
- Koefisien positif dan negatif menunjukkan arah hubungan dalam model.
- Besar absolut koefisien perlu ditafsirkan berdasarkan skala dan representasi fitur.
- StandardScaler dapat membantu membandingkan koefisien fitur numerik pada skala yang lebih seragam.
- Koefisien bukan bukti hubungan sebab-akibat dan bukan selalu ukuran kontribusi prediktif yang lengkap.
- Hasil analisis perlu diperiksa bersama karakteristik dataset, validasi model, dan pengetahuan domain.

Dengan demikian, kita tidak hanya membangun model klasifikasi, tetapi juga mulai memahami pola yang dipelajari model dan batasan interpretasinya.
