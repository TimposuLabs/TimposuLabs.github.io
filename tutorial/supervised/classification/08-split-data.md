---
sidebar_position: 9
title: "Train/Test Split"
---

Pada tahap ini, workflow *Machine Learning* memasuki tahap **Modeling**. Setelah melakukan *Exploratory Data Analysis* (EDA), membandingkan fitur, dan menganalisis matriks korelasi, langkah selanjutnya adalah mempersiapkan data untuk melatih model klasifikasi penyakit jantung (*Heart Disease Classification*).

Tujuan tahap ini adalah membangun model yang dapat mempelajari pola dari data pasien, kemudian mengevaluasi kemampuannya dalam memprediksi data yang belum pernah dilihat sebelumnya.

## 1. Problem Definition dan Evaluation Metric

Sebelum membangun model, kita harus memahami masalah yang akan diselesaikan dan menentukan metrik untuk mengukur keberhasilan model.

### 1.1 Definisi Masalah

Pertanyaan utama dalam proyek ini adalah:

> Berdasarkan sejumlah parameter klinis seorang pasien, apakah model Machine Learning dapat memprediksi label penyakit jantung sebagai 0 atau 1?

Masalah tersebut termasuk **Binary Classification** karena variabel target memiliki dua kelas.

| Nilai Target | Makna |
|---|---|
| `0` | Label negatif penyakit jantung berdasarkan definisi dataset |
| `1` | Label positif penyakit jantung berdasarkan definisi dataset |

Model akan mempelajari hubungan antara fitur pasien, seperti usia, tekanan darah, kolesterol, dan parameter lainnya, dengan label target.

Perlu diingat bahwa prediksi model bukan diagnosis medis. Interpretasi label mengikuti definisi dataset yang digunakan.

### 1.2 Menentukan Target Performa

Dalam proyek ini, kita dapat menetapkan **akurasi 95% sebagai target eksperimen awal atau aspirasi performa**.

Namun, target tersebut bukan jaminan bahwa model dapat mencapainya. Selain itu, akurasi 95% tidak otomatis berarti model layak digunakan dalam lingkungan klinis.

Untuk klasifikasi penyakit jantung, kita juga perlu memperhatikan:

- **Precision:** Seberapa banyak prediksi positif yang benar-benar positif berdasarkan label dataset.
- **Recall:** Seberapa banyak kasus positif dalam dataset yang berhasil ditemukan model.
- **F1-score:** Rata-rata harmonik antara precision dan recall.
- **Confusion matrix:** Menunjukkan jumlah prediksi benar dan salah untuk setiap kelas.

Dalam konteks medis, *false negative* atau kasus positif yang diprediksi negatif perlu mendapat perhatian khusus.

Target performa sebaiknya ditetapkan sebelum eksperimen dan dievaluasi menggunakan data uji yang tidak digunakan untuk melatih atau memilih model.

## 2. Memisahkan Fitur dan Label: X dan y

Sebelum melakukan pelatihan, kita perlu memisahkan dataset menjadi dua bagian, yaitu fitur (`X`) dan label (`y`).

### 2.1 Apa Itu X?

`X` adalah variabel yang berisi fitur atau informasi yang digunakan model untuk membuat prediksi.

Dalam proyek Heart Disease Classification, fitur dapat mencakup:

- Usia (`age`)
- Jenis kelamin (`sex`)
- Jenis nyeri dada (`cp`)
- Tekanan darah istirahat (`trestbps`)
- Kolesterol (`chol`)
- Denyut jantung maksimum (`thalach`)
- Angina akibat aktivitas fisik (`exang`)

Fitur yang digunakan bergantung pada kolom yang tersedia dalam dataset.

### 2.2 Apa Itu y?

`y` adalah variabel target atau label yang ingin diprediksi oleh model.

Dalam dataset ini, label berada pada kolom `target`, sehingga nilai yang akan diprediksi adalah `0` atau `1`.

### 2.3 Membuat X dan y dengan Pandas

Gunakan kode berikut:

```python
# Memisahkan fitur dan target
X = df.drop("target", axis=1)

# Menyimpan target sebagai label
y = df["target"]
```

Penjelasan kode:

| Kode | Penjelasan |
|---|---|
| `df.drop("target", axis=1)` | Menghapus kolom `target` dari DataFrame untuk membentuk fitur |
| `axis=1` | Menunjukkan bahwa operasi dilakukan pada kolom |
| `df["target"]` | Mengambil kolom target sebagai label |
| `X` | Data fitur yang menjadi masukan model |
| `y` | Label yang ingin diprediksi |

Kolom `target` harus dikeluarkan dari `X`. Jika kolom tersebut tetap dimasukkan sebagai fitur, model dapat memperoleh jawaban secara langsung sehingga evaluasi menjadi tidak valid. Masalah ini disebut *target leakage*.

### 2.4 Memeriksa Hasil Pemisahan

Setelah membuat `X` dan `y`, periksa bentuk datanya.

```python
print("Shape of X:", X.shape)
print("Shape of y:", y.shape)
```

Jika menggunakan versi klasik Cleveland Heart Disease Dataset yang memiliki 303 baris dan 14 kolom termasuk `target`, hasilnya akan seperti berikut:

```text
Shape of X: (303, 13)
Shape of y: (303,)
```

Artinya:

- `X` memiliki 303 baris dan 13 fitur.
- `y` memiliki 303 label.
- Setiap baris fitur mempunyai satu label yang bersesuaian.

Hasil dapat berbeda jika dataset yang digunakan memiliki jumlah baris atau kolom yang berbeda.

## 3. Membagi Data dengan Train/Test Split

Model tidak cukup hanya diuji menggunakan data yang telah dipelajarinya. Kita perlu menyediakan sebagian data yang tidak digunakan selama pelatihan untuk memperkirakan kemampuan model menghadapi data baru.

Proses ini disebut **Train/Test Split**.

### 3.1 Mengapa Data Harus Dibagi?

Bayangkan seorang siswa mempelajari materi sebelum ujian. Jika soal ujian hanya berisi pertanyaan yang sudah dihafal, hasil ujian belum tentu menunjukkan kemampuan siswa menyelesaikan soal baru.

Prinsip serupa berlaku pada Machine Learning:

- **Training set:** Data yang digunakan untuk mempelajari pola.
- **Test set:** Data yang disimpan untuk mengevaluasi performa akhir model pada data yang tidak digunakan selama pelatihan dan pemilihan model.

Pembagian ini membantu mengurangi risiko kita memperoleh gambaran performa yang terlalu optimistis.

### 3.2 Pembagian 80:20

Dalam eksperimen ini, kita menggunakan pembagian:

| Bagian | Proporsi | Fungsi |
|---|---:|---|
| Training set | 80% | Melatih model |
| Test set | 20% | Mengevaluasi model setelah proses pengembangan selesai |

Jika dataset berisi 303 baris, pembagian ini menghasilkan sekitar 242 sampel untuk pelatihan dan 61 sampel untuk pengujian. Jumlah pastinya mengikuti aturan pembulatan yang digunakan fungsi pembagian.

Proporsi 80:20 merupakan pilihan awal yang umum, bukan aturan wajib untuk semua proyek.

### 3.3 Menggunakan train_test_split

Fungsi `train_test_split` tersedia dalam modul `sklearn.model_selection`.

```python
from sklearn.model_selection import train_test_split

# Memisahkan data menjadi training set dan test set
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

Penjelasan parameter dan variabel:

| Parameter atau Variabel | Fungsi |
|---|---|
| `X` | Seluruh fitur sebelum pembagian |
| `y` | Seluruh label sebelum pembagian |
| `test_size=0.2` | Mengalokasikan 20% data untuk pengujian |
| `random_state=42` | Menetapkan seed agar pembagian acak dapat direproduksi |
| `X_train` | Fitur untuk pelatihan |
| `X_test` | Fitur untuk pengujian |
| `y_train` | Label untuk pelatihan |
| `y_test` | Label untuk pengujian |

Ketika `random_state` menggunakan nilai yang sama, pembagian data akan konsisten selama dataset, urutan input, dan kondisi perangkat lunak yang relevan tetap sama.

### 3.4 Memeriksa Hasil Pembagian

```python
print("X_train:", X_train.shape)
print("X_test:", X_test.shape)
print("y_train:", y_train.shape)
print("y_test:", y_test.shape)
```

Untuk dataset 303 baris dengan 13 fitur, hasilnya akan menyerupai:

```text
X_train: (242, 13)
X_test: (61, 13)
y_train: (242,)
y_test: (61,)
```

Interpretasinya:

- Model dilatih menggunakan 242 sampel.
- Evaluasi akhir menggunakan 61 sampel.
- Setiap sampel memiliki 13 fitur dan satu label target.

### 3.5 Mengapa Menggunakan random_state?

Pembagian data dilakukan secara acak secara default. Tanpa seed yang tetap, hasil pembagian dapat berubah ketika kode dijalankan kembali.

Contohnya:

```python
# Pembagian yang dapat direproduksi
train_test_split(X, y, test_size=0.2, random_state=42)

# Menggunakan seed berbeda dapat menghasilkan pembagian berbeda
train_test_split(X, y, test_size=0.2, random_state=10)
```

Nilai `42` bukan nilai khusus yang membuat model lebih akurat. Nilai tersebut hanya digunakan sebagai seed agar eksperimen lebih mudah diulang dan dibandingkan.

### 3.6 Menggunakan stratify untuk Klasifikasi

Pada klasifikasi, proporsi setiap kelas perlu diperhatikan. Jika distribusi kelas tidak seimbang, pembagian acak biasa dapat menghasilkan proporsi kelas yang berbeda antara training set dan test set.

Untuk mempertahankan proporsi kelas target, kita dapat menggunakan `stratify=y`.

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)
```

Parameter `stratify=y` berusaha mempertahankan proporsi masing-masing kelas pada kedua bagian data.

Penggunaan stratifikasi sangat berguna untuk klasifikasi, terutama ketika distribusi kelas tidak seimbang. Pastikan setiap kelas memiliki cukup sampel agar pembagian stratifikasi dapat dilakukan.

## 4. Memilih Model Machine Learning

Setelah fitur, label, training set, dan test set tersedia, kita dapat mulai membangun model.

Tidak ada satu algoritma yang selalu menjadi pilihan terbaik untuk semua dataset. Oleh karena itu, proyek ini akan membandingkan beberapa algoritma klasifikasi.

### 4.1 K-Nearest Neighbors (KNN)

KNN memprediksi kelas suatu sampel berdasarkan kelas dari sejumlah tetangga terdekatnya.

```python
from sklearn.neighbors import KNeighborsClassifier

knn = KNeighborsClassifier()
```

Karakteristik KNN:

- Relatif mudah dipahami.
- Prediksi bergantung pada kedekatan antar-sampel.
- Sensitif terhadap skala fitur.
- Memerlukan pemilihan nilai `n_neighbors`.

Karena KNN menggunakan jarak, fitur dengan rentang nilai besar dapat mendominasi perhitungan jarak. Standardisasi fitur biasanya perlu dipertimbangkan.

### 4.2 Random Forest Classifier

Random Forest merupakan algoritma ensemble yang menggabungkan prediksi banyak decision tree.

```python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(
    random_state=42
)
```

Karakteristik Random Forest:

- Dapat mempelajari hubungan nonlinier.
- Menggabungkan banyak pohon keputusan.
- Tidak mensyaratkan standardisasi fitur seperti yang biasanya diperlukan KNN.
- Memiliki parameter yang dapat disesuaikan, seperti `n_estimators` dan `max_depth`.

### 4.3 Logistic Regression

Meskipun namanya mengandung kata *regression*, Logistic Regression merupakan algoritma yang umum digunakan untuk klasifikasi.

```python
from sklearn.linear_model import LogisticRegression

log_reg = LogisticRegression(
    max_iter=1000,
    random_state=42
)
```

Karakteristik Logistic Regression:

- Cocok sebagai model baseline.
- Menghasilkan estimasi probabilitas kelas pada pengaturan klasifikasi yang sesuai.
- Relatif mudah diinterpretasikan dibandingkan sejumlah model yang lebih kompleks.
- Dapat memerlukan standardisasi fitur dan penanganan konvergensi.

Parameter `max_iter=1000` memberikan batas iterasi yang lebih tinggi agar proses optimasi memiliki kesempatan untuk konvergen.

## 5. Mempersiapkan Model untuk Eksperimen

Pada tahap ini, kita dapat menyimpan model dalam sebuah dictionary agar lebih mudah dikelola.

```python
models = {
    "Logistic Regression": LogisticRegression(
        max_iter=1000,
        random_state=42
    ),
    "KNN": KNeighborsClassifier(),
    "Random Forest": RandomForestClassifier(
        random_state=42
    )
}

print(models)
```

Dictionary tersebut membantu kita menjalankan eksperimen secara konsisten terhadap beberapa algoritma.

Namun, sebelum membandingkan hasilnya, perlu diperhatikan bahwa KNN dan Logistic Regression biasanya diuntungkan oleh standardisasi fitur. Untuk perbandingan yang lebih adil, standardisasi dapat diterapkan menggunakan `Pipeline` sehingga proses pembelajaran scaler hanya menggunakan data training.

Contoh untuk KNN:

```python
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

knn_pipeline = make_pipeline(
    StandardScaler(),
    KNeighborsClassifier()
)
```

`Pipeline` memastikan standardisasi dipelajari dari data pelatihan, kemudian diterapkan ke data pengujian tanpa menggunakan informasi statistik dari test set selama pelatihan.

Untuk Logistic Regression, pendekatan serupa juga dapat digunakan.

## 6. Prinsip Penting Sebelum Melatih Model

Sebelum melanjutkan ke proses `fit()` dan evaluasi, pahami beberapa prinsip berikut.

- **Pisahkan fitur dan target:** Jangan memasukkan kolom `target` ke dalam `X`.
- **Simpan test set:** Jangan gunakan test set berulang kali untuk memilih parameter atau model terbaik.
- **Gunakan random seed:** Hal ini membantu menjaga eksperimen tetap dapat direproduksi.
- **Pertimbangkan stratifikasi:** Gunakan `stratify=y` untuk menjaga proporsi kelas pada pembagian data.
- **Hindari data leakage:** Proses seperti scaling harus dipelajari dari training set, bukan dari seluruh dataset sebelum pembagian.
- **Evaluasi lebih dari akurasi:** Periksa precision, recall, F1-score, dan confusion matrix.
- **Jangan mengasumsikan target 95% pasti tercapai:** Performa harus dibuktikan melalui eksperimen dan evaluasi yang benar.

Untuk penelitian yang lebih kuat, pertimbangkan validasi silang (*cross-validation*) pada training set untuk membandingkan model dan memilih parameter. Test set sebaiknya digunakan untuk evaluasi akhir setelah keputusan pemodelan ditetapkan.

## 7. Ringkasan Workflow

Berikut urutan proses yang dilakukan pada materi ini:

1. Menetapkan masalah sebagai binary classification.
2. Menentukan metrik evaluasi yang relevan.
3. Memisahkan dataset menjadi fitur `X` dan label `y`.
4. Membagi data menjadi training set dan test set.
5. Menetapkan `random_state` agar pembagian dapat direproduksi.
6. Mempertimbangkan `stratify=y` untuk mempertahankan proporsi kelas.
7. Menyiapkan Logistic Regression, KNN, dan Random Forest.
8. Melanjutkan ke pelatihan dan evaluasi model.
