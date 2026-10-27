---
sidebar_position: 17
title: "Evaluasi Model Klasifikasi: Cross-Validation"
---

Pada materi sebelumnya, kita telah mempelajari cara mengevaluasi model klasifikasi menggunakan *accuracy*, *precision*, *recall*, *F1-score*, dan *classification report*.

Namun, evaluasi tersebut biasanya dilakukan berdasarkan satu kali pembagian dataset menjadi training set dan test set. Hasil evaluasi bisa berubah jika pembagian datanya berbeda.

Untuk mengatasi keterbatasan tersebut, kita dapat menggunakan **Cross-Validation**, yaitu teknik evaluasi yang membagi data menjadi beberapa bagian dan menggunakan bagian-bagian tersebut secara bergantian untuk melatih serta mengevaluasi model.

## 1. Mengapa Cross-Validation Diperlukan?

Misalnya, kita memiliki dataset Heart Disease Classification yang berisi 303 sampel.

Jika menggunakan train-test split dengan proporsi 80:20, pembagiannya kira-kira menjadi:

- Training set: 242 sampel.
- Test set: 61 sampel.

Model dilatih menggunakan training set dan dievaluasi menggunakan test set. Hasil evaluasi tersebut dapat dipengaruhi oleh sampel yang kebetulan masuk ke dalam test set.

Sebagai ilustrasi, dua pembagian data dapat menghasilkan nilai accuracy berikut:

| Pembagian data | Accuracy |
|---|---:|
| Pembagian pertama | 0.82 |
| Pembagian kedua | 0.78 |
| Pembagian ketiga | 0.85 |

Angka tersebut hanya ilustrasi, bukan hasil eksperimen aktual.

Perbedaan tersebut menunjukkan bahwa satu kali pembagian data belum tentu memberikan gambaran yang stabil tentang performa model.

Cross-validation membantu kita mengamati performa model melalui beberapa pembagian data, sehingga hasil evaluasi tidak hanya bergantung pada satu bagian data pengujian.

## 2. Memahami K-Fold Cross-Validation

Salah satu metode cross-validation yang umum digunakan adalah **K-Fold Cross-Validation**.

Pada metode ini, dataset dibagi menjadi \(k\) bagian atau *fold*. Model kemudian dilatih dan dievaluasi sebanyak \(k\) kali.

Jika menggunakan 5-fold cross-validation, prosesnya adalah:

1. Dataset dibagi menjadi lima fold.
2. Pada iterasi pertama, fold pertama digunakan sebagai data validasi dan empat fold lainnya sebagai data pelatihan.
3. Pada iterasi kedua, fold kedua digunakan sebagai data validasi.
4. Proses berlanjut sampai setiap fold pernah menjadi data validasi.
5. Skor dari kelima iterasi dirangkum, misalnya menggunakan rata-rata dan standar deviasi.

### 2.1 Ilustrasi 5-Fold Cross-Validation

![scikit-learn cross validation](/img/python/52.png)

Keterangan:

```text
Iterasi 1: [Validasi] [Training] [Training] [Training] [Training]
Iterasi 2: [Training] [Validasi] [Training] [Training] [Training]
Iterasi 3: [Training] [Training] [Validasi] [Training] [Training]
Iterasi 4: [Training] [Training] [Training] [Validasi] [Training]
Iterasi 5: [Training] [Training] [Training] [Training] [Validasi]
```

Setiap fold mendapatkan kesempatan menjadi data validasi satu kali. Dengan demikian, seluruh sampel digunakan untuk validasi pada salah satu iterasi dan digunakan untuk pelatihan pada iterasi lainnya.

Perlu diperhatikan bahwa istilah *data validasi* dalam cross-validation berbeda dengan test set final. Test set final sebaiknya disimpan terpisah dan tidak digunakan dalam proses pemilihan model.

### 2.2 Menghitung Rata-Rata Skor

Misalnya, hasil accuracy dari lima fold adalah:

$$
0.80,\ 0.82,\ 0.78,\ 0.84,\ 0.81
$$

Rata-rata accuracy dihitung dengan rumus:

$$
\bar{x} = \frac{1}{k}\sum_{i=1}^{k}x_i
$$

Sehingga:

$$
\bar{x} =
\frac{0.80+0.82+0.78+0.84+0.81}{5}
$$

$$
\bar{x}=0.81
$$

Artinya, rata-rata accuracy dari lima fold adalah **81%**.

Rata-rata ini merangkum performa dari lima iterasi. Namun, rata-rata saja tidak menjelaskan seberapa besar variasi skor antarfold. Karena itu, standar deviasi juga dapat digunakan untuk membantu memahami kestabilan hasil evaluasi.

## 3. Menyiapkan Model Logistic Regression

Dalam proyek Heart Disease Classification, kita sebelumnya telah mempelajari hyperparameter tuning menggunakan GridSearchCV.

Jika hyperparameter terbaik sudah ditemukan, parameter tersebut dapat digunakan untuk membangun model yang akan dievaluasi menggunakan cross-validation.

Contoh berikut menunjukkan cara mengambil parameter terbaik dari objek GridSearchCV bernama `gs_log_reg`.

```python
from sklearn.linear_model import LogisticRegression

best_params = gs_log_reg.best_params_

clf = LogisticRegression(
    C=best_params["logisticregression__C"],
    solver=best_params["logisticregression__solver"],
    max_iter=1000
)
```

Penjelasan:

- `gs_log_reg.best_params_` mengambil kombinasi hyperparameter terbaik yang ditemukan GridSearchCV.
- `C` mengatur kekuatan regularisasi Logistic Regression dengan hubungan terbalik: nilai `C` yang lebih kecil berarti regularisasi lebih kuat.
- `solver` menentukan algoritma optimasi yang digunakan.
- `max_iter=1000` meningkatkan batas iterasi maksimum agar model memiliki kesempatan lebih besar untuk konvergen.

**Penting:** Kode di atas sesuai jika `gs_log_reg` menggunakan pipeline dengan nama langkah `logisticregression` dan parameter yang dituning adalah `C` serta `solver`. Nama parameter harus disesuaikan dengan pipeline yang sebenarnya.

Jika model menggunakan `StandardScaler`, preprocessing tersebut juga perlu dimasukkan ke dalam pipeline saat melakukan cross-validation. Hal ini mencegah statistik preprocessing dihitung dari fold validasi.

## 4. Menghitung Metrik dengan `cross_val_score()`

Scikit-learn menyediakan fungsi `cross_val_score()` untuk menghitung skor evaluasi model pada beberapa fold.

Fungsi ini dapat digunakan untuk menghitung accuracy, precision, recall, dan F1-score.

### 4.1 Mengimpor Library

```python
import numpy as np
from sklearn.model_selection import cross_val_score
```

Keterangan:

- `numpy` digunakan untuk menghitung rata-rata dan standar deviasi.
- `cross_val_score` digunakan untuk mengevaluasi model pada beberapa fold.

### 4.2 Cross-Validated Accuracy

Accuracy mengukur proporsi prediksi yang benar dibandingkan seluruh prediksi.

```python
cv_acc = cross_val_score(
    clf,
    X,
    y,
    cv=5,
    scoring="accuracy"
)

print("Skor setiap fold:", cv_acc)
print("Rata-rata accuracy:", np.mean(cv_acc))
```

Parameter penting:

- `clf`: model klasifikasi yang akan dievaluasi.
- `X`: fitur dataset.
- `y`: label target.
- `cv=5`: menggunakan lima fold.
- `scoring="accuracy"`: menggunakan accuracy sebagai metrik evaluasi.

Variabel `cv_acc` berisi lima skor, satu untuk setiap fold. `np.mean(cv_acc)` menghitung rata-rata dari kelima skor tersebut.

### 4.3 Cross-Validated Precision

Precision mengukur ketepatan prediksi positif. Dalam klasifikasi biner, scorer `"precision"` secara default menggunakan kelas positif `1`.

```python
cv_precision = cross_val_score(
    clf,
    X,
    y,
    cv=5,
    scoring="precision"
)

print("Skor precision setiap fold:", cv_precision)
print("Rata-rata precision:", np.mean(cv_precision))
```

Precision tinggi menunjukkan bahwa proporsi prediksi kelas 1 yang benar relatif tinggi.

Jika tujuan penelitian lebih menekankan pengurangan *False Positive*, precision dapat menjadi salah satu metrik penting.

### 4.4 Cross-Validated Recall

Recall mengukur seberapa banyak sampel positif aktual yang berhasil ditemukan oleh model.

```python
cv_recall = cross_val_score(
    clf,
    X,
    y,
    cv=5,
    scoring="recall"
)

print("Skor recall setiap fold:", cv_recall)
print("Rata-rata recall:", np.mean(cv_recall))
```

Recall tinggi menunjukkan bahwa model berhasil menemukan proporsi kasus positif aktual yang lebih besar.

Dalam konteks dataset penyakit jantung, recall kelas positif dapat membantu mengukur berapa banyak sampel berlabel positif yang berhasil dikenali model. Hasil ini tetap merupakan evaluasi model pembelajaran, bukan penilaian klinis.

### 4.5 Cross-Validated F1-Score

F1-score merupakan rata-rata harmonis antara precision dan recall.

```python
cv_f1 = cross_val_score(
    clf,
    X,
    y,
    cv=5,
    scoring="f1"
)

print("Skor F1 setiap fold:", cv_f1)
print("Rata-rata F1-score:", np.mean(cv_f1))
```

F1-score berguna ketika kita ingin menilai keseimbangan antara precision dan recall.

### 4.6 Ringkasan Metrik Cross-Validation

| Metrik | Parameter `scoring` | Tujuan |
|---|---|---|
| Accuracy | `"accuracy"` | Mengukur proporsi prediksi yang benar |
| Precision | `"precision"` | Mengukur ketepatan prediksi kelas positif |
| Recall | `"recall"` | Mengukur kemampuan menemukan sampel positif aktual |
| F1-score | `"f1"` | Merangkum keseimbangan precision dan recall |

Secara default, scorer precision, recall, dan F1 pada klasifikasi biner menggunakan kelas positif `1`. Jika kelas positif yang diinginkan berbeda, pengaturan scorer perlu disesuaikan.

## 5. Menggunakan StratifiedKFold untuk Klasifikasi

Untuk tugas klasifikasi, terutama jika jumlah sampel setiap kelas tidak sama, kita dapat menggunakan `StratifiedKFold`.

`StratifiedKFold` berusaha mempertahankan proporsi setiap kelas pada masing-masing fold. Metode ini sering menjadi pilihan yang sesuai untuk klasifikasi biner seperti Heart Disease Classification.

Contoh:

```python
from sklearn.model_selection import StratifiedKFold, cross_val_score

cv = StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)

cv_acc = cross_val_score(
    clf,
    X,
    y,
    cv=cv,
    scoring="accuracy"
)

print("Skor setiap fold:", cv_acc)
print("Rata-rata accuracy:", cv_acc.mean())
print("Standar deviasi:", cv_acc.std())
```

Penjelasan parameter:

- `n_splits=5`: membagi data menjadi lima fold.
- `shuffle=True`: mengacak urutan sampel sebelum pembagian.
- `random_state=42`: membuat proses pengacakan dapat direproduksi.
- `cv=cv`: menggunakan konfigurasi StratifiedKFold yang sudah dibuat.

Standar deviasi membantu menunjukkan seberapa jauh skor antarfold menyebar dari rata-ratanya. Standar deviasi yang lebih kecil menunjukkan variasi skor yang lebih rendah pada pembagian tersebut, tetapi tidak otomatis menjamin model akan bekerja baik pada data baru.

## 6. Memvisualisasikan Metrik Cross-Validation

Setelah menghitung seluruh metrik, kita dapat menggabungkan hasilnya ke dalam DataFrame Pandas dan menampilkannya sebagai grafik batang.

### 6.1 Membuat DataFrame

Misalnya, kita sudah memiliki variabel `cv_acc`, `cv_precision`, `cv_recall`, dan `cv_f1` yang masing-masing berisi skor dari lima fold.

```python
import pandas as pd

cv_metrics = pd.DataFrame({
    "Accuracy": cv_acc,
    "Precision": cv_precision,
    "Recall": cv_recall,
    "F1-Score": cv_f1
})

print(cv_metrics)
```

Setiap baris merepresentasikan satu fold, sedangkan setiap kolom menunjukkan metrik yang berbeda.

Contoh struktur DataFrame:

| Fold | Accuracy | Precision | Recall | F1-Score |
|---|---:|---:|---:|---:|
| 1 | 0.80 | 0.78 | 0.82 | 0.80 |
| 2 | 0.82 | 0.81 | 0.80 | 0.80 |
| 3 | 0.78 | 0.76 | 0.79 | 0.77 |
| 4 | 0.84 | 0.83 | 0.84 | 0.83 |
| 5 | 0.81 | 0.80 | 0.81 | 0.80 |

Angka dalam tabel hanya ilustrasi untuk menunjukkan bentuk data. Hasil aktual bergantung pada dataset dan model yang digunakan.

### 6.2 Membuat Grafik Batang Rata-Rata Metrik

Untuk membandingkan rata-rata metrik, hitung mean setiap kolom terlebih dahulu.

```python
import matplotlib.pyplot as plt

mean_metrics = cv_metrics.mean()

ax = mean_metrics.plot.bar(
    title="Cross-Validated Classification Metrics",
    ylabel="Score",
    ylim=(0, 1),
    rot=0,
    legend=False
)

ax.set_xlabel("Evaluation Metric")
plt.tight_layout()
plt.show()
```

![scikit-learn cross validation](/img/python/73.webp)

Penjelasan:

- `cv_metrics.mean()` menghitung rata-rata skor untuk setiap metrik.
- `plot.bar()` membuat grafik batang.
- `ylabel="Score"` memberi label pada sumbu vertikal.
- `ylim=(0, 1)` membatasi sumbu skor pada rentang 0 hingga 1.
- `rot=0` menjaga label metrik tetap horizontal.
- `plt.tight_layout()` membantu mengatur jarak elemen grafik.
- `plt.show()` menampilkan grafik.

Grafik ini memudahkan perbandingan rata-rata accuracy, precision, recall, dan F1-score.

Namun, grafik rata-rata saja tidak memperlihatkan variasi antarfold. Untuk analisis yang lebih lengkap, periksa skor setiap fold dan standar deviasi masing-masing metrik.

### 6.3 Memvisualisasikan Skor Setiap Fold

Jika ingin melihat kestabilan skor, tampilkan seluruh nilai fold dalam satu grafik.

```python
ax = cv_metrics.plot(
    kind="bar",
    figsize=(10, 6),
    title="Classification Metrics Across Cross-Validation Folds"
)

ax.set_xlabel("Fold")
ax.set_ylabel("Score")
ax.set_ylim(0, 1)
ax.legend(title="Metrics")

plt.tight_layout()
plt.show()
```

![scikit-learn cross validation](/img/python/72.webp)

Grafik ini menunjukkan perubahan setiap metrik dari satu fold ke fold berikutnya. Dengan melihat variasi tersebut, kita dapat mengetahui apakah performa model relatif konsisten atau sangat bergantung pada fold tertentu.

## 7. Hal yang Perlu Diperhatikan dalam Cross-Validation

Cross-validation meningkatkan kualitas proses evaluasi, tetapi penggunaannya tetap harus dilakukan dengan benar.

### 7.1 Jangan Menggunakan Test Set Final untuk Pemilihan Model

Jika dataset sudah dibagi menjadi training set dan test set final, lakukan cross-validation pada training set.

Alur yang disarankan:

1. Pisahkan dataset menjadi training set dan test set final.
2. Lakukan cross-validation pada training set untuk membandingkan model atau memilih hyperparameter.
3. Latih model terpilih menggunakan seluruh training set.
4. Evaluasi model satu kali pada test set final.

Dengan cara ini, test set final tetap menjadi data evaluasi yang tidak digunakan selama pemilihan model.

### 7.2 Gunakan Pipeline untuk Preprocessing

Jika model menggunakan StandardScaler, imputasi, atau preprocessing lain, masukkan langkah tersebut ke dalam `Pipeline`.

Jangan melakukan scaling pada seluruh dataset sebelum cross-validation karena statistik dari fold validasi dapat bocor ke proses pelatihan.

Contoh:

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

clf = Pipeline([
    ("scaler", StandardScaler()),
    ("logisticregression", LogisticRegression(max_iter=1000))
])
```

Ketika `cross_val_score()` dijalankan, setiap fold akan mempelajari parameter preprocessing dari bagian training fold masing-masing.

### 7.3 Pastikan Data Sesuai dengan Jenis Cross-Validation

`StratifiedKFold` sesuai untuk banyak tugas klasifikasi, sedangkan jenis data tertentu memerlukan strategi lain.

Contohnya:

- Data klasifikasi biasa: `StratifiedKFold`.
- Data regresi: `KFold` sering digunakan.
- Data deret waktu: gunakan pembagian yang menjaga urutan waktu, seperti `TimeSeriesSplit`.
- Data berkelompok, misalnya banyak sampel dari pasien yang sama: pertimbangkan strategi berbasis kelompok seperti `GroupKFold`.

Pemilihan strategi harus mencegah informasi dari data validasi bocor ke data pelatihan.

## 8. Contoh Lengkap Kode Cross-Validation

Contoh berikut menggabungkan seluruh proses: membaca dataset, memisahkan fitur dan target, membuat pipeline, menghitung empat metrik dengan StratifiedKFold, merangkum mean dan standar deviasi, serta memvisualisasikan hasil.

Kode ini menggunakan seluruh dataset untuk cross-validation dalam konteks pembelajaran. Untuk evaluasi akhir yang lebih kuat, gunakan training set untuk cross-validation dan simpan test set final secara terpisah seperti dijelaskan pada bagian sebelumnya.

```python
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# 1. Memuat dataset
df = pd.read_csv("heart-disease.csv")

# 2. Memisahkan fitur dan target
X = df.drop(columns=["target"])
y = df["target"]

# 3. Membuat pipeline
clf = Pipeline([
    ("scaler", StandardScaler()),
    ("logisticregression", LogisticRegression(max_iter=1000))
])

# 4. Menyiapkan cross-validation
cv = StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)

# 5. Menghitung accuracy
cv_acc = cross_val_score(
    clf, X, y, cv=cv, scoring="accuracy"
)

# 6. Menghitung precision
cv_precision = cross_val_score(
    clf, X, y, cv=cv, scoring="precision"
)

# 7. Menghitung recall
cv_recall = cross_val_score(
    clf, X, y, cv=cv, scoring="recall"
)

# 8. Menghitung F1-score
cv_f1 = cross_val_score(
    clf, X, y, cv=cv, scoring="f1"
)

# 9. Menggabungkan skor setiap fold
cv_metrics = pd.DataFrame({
    "Accuracy": cv_acc,
    "Precision": cv_precision,
    "Recall": cv_recall,
    "F1-Score": cv_f1
})

print("Skor setiap fold:")
print(cv_metrics.round(4))

# 10. Menghitung mean dan standar deviasi
summary = pd.DataFrame({
    "Mean": cv_metrics.mean(),
    "Standard Deviation": cv_metrics.std(ddof=1)
})

print("\nRingkasan Cross-Validation:")
print(summary.round(4))

# 11. Membuat grafik rata-rata metrik
ax = cv_metrics.mean().plot.bar(
    title="Cross-Validated Classification Metrics",
    ylabel="Score",
    ylim=(0, 1),
    rot=0,
    legend=False
)

ax.set_xlabel("Evaluation Metric")

plt.tight_layout()
plt.show()

# 12. Membuat grafik skor pada setiap fold
ax = cv_metrics.plot(
    kind="bar",
    figsize=(10, 6),
    title="Classification Metrics Across Folds"
)

ax.set_xlabel("Fold")
ax.set_ylabel("Score")
ax.set_ylim(0, 1)
ax.legend(title="Metrics")

plt.tight_layout()
plt.show()
```

### Penjelasan Alur Program

1. **Memuat data:** Pandas membaca dataset Heart Disease dari file CSV.
2. **Memisahkan fitur dan target:** kolom `target` menjadi label yang diprediksi model.
3. **Membuat pipeline:** StandardScaler melakukan standardisasi secara terpisah pada setiap training fold, lalu Logistic Regression melakukan klasifikasi.
4. **Membuat StratifiedKFold:** data dibagi menjadi lima fold dengan upaya mempertahankan proporsi kelas.
5. **Menghitung metrik:** `cross_val_score()` menjalankan evaluasi terpisah untuk accuracy, precision, recall, dan F1-score.
6. **Menggabungkan skor:** DataFrame menyimpan skor dari kelima fold agar mudah dibandingkan.
7. **Menghitung ringkasan:** mean menunjukkan rata-rata skor, sedangkan standar deviasi sampel menunjukkan variasi skor antarfold.
8. **Membuat grafik:** grafik pertama membandingkan rata-rata metrik, sedangkan grafik kedua memperlihatkan skor dari setiap fold.

Karena `cross_val_score()` dipanggil empat kali, model akan dilatih ulang pada setiap fold untuk setiap metrik. Penggunaan `StratifiedKFold` yang sama membuat pembagian fold konsisten antarmetrik.

Hasil aktual dapat berbeda berdasarkan versi dataset, kualitas data, dan konfigurasi model.

## 9. Kesimpulan

Cross-validation merupakan teknik evaluasi yang membantu kita memahami performa model melalui beberapa pembagian data, bukan hanya satu kali train-test split.

Hal-hal penting yang perlu diingat:

- K-Fold Cross-Validation membagi data menjadi beberapa fold.
- Setiap fold secara bergiliran digunakan sebagai data validasi.
- `cross_val_score()` menghitung skor evaluasi pada setiap fold.
- Accuracy, precision, recall, dan F1-score dapat dievaluasi menggunakan cross-validation.
- Mean merangkum rata-rata skor, sedangkan standar deviasi membantu menggambarkan variasinya.
- `StratifiedKFold` berguna untuk klasifikasi karena berusaha mempertahankan proporsi kelas.
- Pipeline membantu mencegah kebocoran informasi selama preprocessing.
- Test set final sebaiknya tetap dipisahkan untuk evaluasi akhir setelah pemilihan model selesai.

## Baca Juga

* [Evaluasi Model: Cross-Validation](/scikit-learn/evaluasi-model-cross-validation-scoring)
* [Evaluasi Model dengan Parameter scoring pada Cross-Validation](/scikit-learn/evaluasi-model-scoring-cross-validation)