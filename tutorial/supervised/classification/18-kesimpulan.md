---
sidebar_position: 19
title: Kesimpulan
---

Pada materi sebelumnya, kita telah menyelesaikan tahapan utama proyek *Heart Disease Classification*, mulai dari memahami masalah, mengumpulkan dan mengeksplorasi data, melakukan preprocessing, melatih model, mengevaluasi performa, hingga mempelajari feature importance.

Sekarang, kita memasuki tahap *Project Wrap-Up*, yaitu mengevaluasi hasil proyek secara keseluruhan dan menentukan langkah selanjutnya.

## 1. Pengantar Project Wrap-Up

Dalam praktik Machine Learning, menyelesaikan eksperimen tidak selalu berarti berhasil mencapai target performa yang telah ditentukan.

Misalnya, sebuah proyek memiliki target accuracy sebesar 95%, tetapi model Logistic Regression hanya menghasilkan accuracy sekitar 88%.

Apakah proyek tersebut gagal?

**Tidak selalu.** Hasil tersebut tetap memberikan informasi yang berguna tentang kemampuan model, karakteristik dataset, dan pendekatan yang perlu dievaluasi berikutnya.

Perlu diingat bahwa angka 95% pada contoh ini hanyalah target ilustratif. Accuracy yang tinggi tidak otomatis menjadikan model layak digunakan, terutama untuk aplikasi yang berkaitan dengan kesehatan.

Tujuan akhir proyek pembelajaran ini adalah memahami proses Machine Learning secara menyeluruh, bukan sekadar mengejar satu angka evaluasi.

## 2. Machine Learning adalah Proses Eksperimen

Machine Learning merupakan proses iteratif. Kita membangun model, mengevaluasi hasilnya, menganalisis kesalahan, lalu melakukan perbaikan berdasarkan bukti yang ditemukan.

Dalam proyek ini, kita telah mencoba beberapa pendekatan, seperti:

- Logistic Regression.
- K-Nearest Neighbors (KNN).
- Random Forest.
- Hyperparameter tuning menggunakan GridSearchCV atau RandomizedSearchCV.
- Evaluasi menggunakan confusion matrix, ROC-AUC, classification report, dan cross-validation.
- Analisis koefisien Logistic Regression untuk memahami hubungan fitur dengan prediksi.

Setiap eksperimen memberikan informasi berbeda mengenai perilaku model.

Sebagai contoh:

- Jika KNN memiliki performa lebih rendah sebelum scaling, kita dapat menyelidiki pengaruh perbedaan skala fitur.
- Jika performa training jauh lebih tinggi daripada validasi, kita dapat memeriksa kemungkinan overfitting.
- Jika recall kelas positif rendah, kita perlu menganalisis jumlah False Negative.
- Jika model yang berbeda menghasilkan performa hampir sama, mungkin diperlukan perbaikan data atau fitur, bukan sekadar mengganti algoritma.

Eksperimen yang tidak meningkatkan performa tetap berguna apabila membantu kita memahami penyebabnya.

### 2.1 Dokumentasikan Setiap Eksperimen

Setiap eksperimen sebaiknya dicatat agar hasilnya dapat dibandingkan dan direproduksi.

Contoh tabel pencatatan eksperimen:

| Eksperimen | Model | Perubahan | Hasil |
|---|---|---|---|
| E-01 | Logistic Regression | Model baseline | Catat skor aktual |
| E-02 | KNN | Standardisasi fitur | Catat skor aktual |
| E-03 | Random Forest | Perubahan parameter | Catat skor aktual |
| E-04 | Logistic Regression | GridSearchCV | Catat skor aktual |

Tabel di atas merupakan template. Isi dengan hasil eksperimen yang benar-benar diperoleh, bukan angka perkiraan.

Untuk setiap eksperimen, catat juga:

- Versi dataset dan jumlah sampel.
- Pembagian data dan `random_state`.
- Algoritma dan hyperparameter.
- Metode validasi yang digunakan.
- Accuracy, precision, recall, F1-score, dan metrik relevan lainnya.
- Waktu pelatihan dan kendala yang ditemukan.
- Kesimpulan serta rencana eksperimen berikutnya.

Dokumentasi ini penting agar kita tidak mengulangi eksperimen yang sama tanpa alasan yang jelas.

## 3. Apa yang Bisa Dilakukan Jika Model Belum Memenuhi Target?

Jika performa model belum sesuai dengan tujuan proyek, jangan langsung mengganti algoritma secara acak. Lakukan analisis berdasarkan hasil evaluasi.

### 3.1 Mengumpulkan Lebih Banyak Data

Jumlah dan kualitas data dapat memengaruhi kemampuan model mempelajari pola yang dapat digeneralisasi.

Jika memungkinkan, diskusikan dengan ahli domain atau pemilik data mengenai peluang memperoleh sampel tambahan yang relevan.

Namun, menambah jumlah data saja tidak selalu meningkatkan performa. Data tambahan perlu:

- Relevan dengan masalah yang diteliti.
- Memiliki kualitas dan label yang dapat dipercaya.
- Mencakup variasi sampel yang sesuai dengan tujuan penggunaan.
- Dikumpulkan dengan memperhatikan privasi, izin, dan ketentuan penggunaan data.
- Diperiksa agar tidak menyebabkan duplikasi atau kebocoran data.

Untuk dataset kesehatan, penambahan data perlu memperhatikan definisi label, karakteristik populasi, dan prosedur pengumpulan data.

### 3.2 Mencoba Algoritma Lain

Setiap algoritma memiliki karakteristik dan asumsi yang berbeda. Jika model baseline belum memberikan hasil yang memadai, kita dapat membandingkannya dengan algoritma lain.

Contoh algoritma yang dapat dipertimbangkan:

- **Logistic Regression:** model klasifikasi linear yang relatif mudah diinterpretasikan.
- **KNN:** mengklasifikasikan sampel berdasarkan kedekatannya dengan sampel lain.
- **Random Forest:** menggabungkan prediksi sejumlah decision tree.
- **XGBoost:** menggunakan gradient boosting untuk membangun model secara bertahap.
- **CatBoost:** algoritma gradient boosting yang menyediakan dukungan khusus untuk fitur kategorikal.

XGBoost dan CatBoost merupakan pilihan untuk eksperimen lanjutan, bukan jaminan bahwa performanya akan lebih tinggi.

Pemilihan model perlu mempertimbangkan hasil validasi, kebutuhan interpretasi, kompleksitas implementasi, dan sumber daya komputasi.

### 3.3 Melakukan Hyperparameter Tuning

Hyperparameter mengatur perilaku model sebelum proses pelatihan. Pemilihan nilai yang tepat dapat memengaruhi hasil evaluasi.

Pada Logistic Regression, misalnya, parameter `C` mengatur kekuatan regularisasi dengan hubungan terbalik.

Pada KNN, parameter `n_neighbors` menentukan jumlah tetangga yang digunakan untuk prediksi.

Pada Random Forest, parameter yang dapat ditinjau antara lain:

- `n_estimators`: jumlah decision tree.
- `max_depth`: kedalaman maksimum tree.
- `min_samples_split`: jumlah minimum sampel untuk melakukan pemisahan node.
- `min_samples_leaf`: jumlah minimum sampel pada leaf.

GridSearchCV dapat digunakan untuk menguji seluruh kombinasi parameter dalam grid yang ditentukan. RandomizedSearchCV dapat digunakan untuk mengambil sejumlah kombinasi kandidat dari ruang pencarian.

Perlu diperhatikan bahwa memperluas pencarian parameter tidak selalu meningkatkan performa. Gunakan cross-validation pada training set untuk memilih konfigurasi, lalu gunakan test set final untuk evaluasi akhir.

### 3.4 Memeriksa Kualitas Data dan Feature Engineering

Jika pergantian algoritma dan tuning tidak memberikan peningkatan berarti, periksa kembali dataset.

Pertanyaan yang dapat diajukan:

- Apakah terdapat nilai yang hilang?
- Apakah ada duplikasi sampel?
- Apakah definisi target sudah konsisten?
- Apakah ada fitur yang tidak relevan atau berpotensi menyebabkan kebocoran target?
- Apakah pengodean fitur kategorikal sudah tepat?
- Apakah distribusi kelas memengaruhi interpretasi metrik?
- Apakah terdapat perbedaan distribusi antara data pelatihan dan data yang menjadi sasaran penggunaan?

Feature engineering juga dapat dipertimbangkan apabila memiliki alasan yang jelas berdasarkan pengetahuan domain atau analisis data.

Setiap perubahan harus diuji menggunakan prosedur validasi yang konsisten agar peningkatan performa dapat dinilai secara adil.

## 4. Menentukan Apakah Model Sudah Cukup Baik

Model tidak seharusnya dinilai hanya berdasarkan accuracy.

Dalam proyek klasifikasi, kita perlu mempertimbangkan beberapa metrik:

| Metrik | Pertanyaan yang Dijawab |
|---|---|
| Accuracy | Berapa proporsi seluruh prediksi yang benar? |
| Precision | Dari seluruh prediksi positif, berapa proporsi yang benar? |
| Recall | Dari seluruh kasus positif aktual, berapa proporsi yang berhasil ditemukan? |
| F1-score | Bagaimana keseimbangan precision dan recall? |
| ROC-AUC | Seberapa baik model membedakan kelas positif dan negatif berdasarkan skor prediksinya pada berbagai threshold? |

Pemilihan metrik utama bergantung pada tujuan penggunaan model dan konsekuensi kesalahan prediksi.

Untuk aplikasi kesehatan, False Negative dan False Positive dapat memiliki konsekuensi yang berbeda. Karena itu, target evaluasi harus ditentukan bersama pihak yang memahami kebutuhan klinis, bukan dipilih hanya untuk memperoleh angka yang tinggi.

Selain itu, cross-validation membantu menilai variasi performa selama validasi, sedangkan evaluasi pada data eksternal dapat diperlukan untuk menilai generalisasi ke populasi atau lingkungan berbeda.

Model yang tampak baik pada dataset pembelajaran belum tentu siap digunakan pada situasi nyata.

## 5. Model Persistence: Menyimpan Model

Jika eksperimen telah menghasilkan model yang sesuai untuk tujuan pembelajaran, langkah berikutnya adalah menyimpan model agar dapat digunakan kembali tanpa harus melatihnya dari awal.

Proses menyimpan dan memuat kembali model disebut *model persistence*.

Salah satu pendekatan yang umum digunakan pada Scikit-learn adalah `joblib`.

### 5.1 Menyimpan Model

Misalnya, model terbaik yang telah dilatih tersimpan pada variabel `best_model`.

```python
import joblib

joblib.dump(best_model, "heart_disease_model.joblib")
```

Penjelasan:

- `joblib.dump()` menyimpan objek model ke dalam file.
- `best_model` merupakan objek model yang sudah dilatih.
- `heart_disease_model.joblib` adalah nama file hasil penyimpanan.

Pastikan objek yang disimpan sudah melalui proses pelatihan dan mencakup seluruh preprocessing yang dibutuhkan saat prediksi.

Jika menggunakan pipeline yang mencakup StandardScaler dan Logistic Regression, simpan keseluruhan pipeline, bukan hanya estimator Logistic Regression.

### 5.2 Memuat Model

Model yang telah disimpan dapat dimuat kembali menggunakan `joblib.load()`.

```python
import joblib

loaded_model = joblib.load("heart_disease_model.joblib")
```

Setelah dimuat, model dapat digunakan untuk memprediksi data baru yang memiliki struktur fitur sesuai dengan saat pelatihan.

```python
predictions = loaded_model.predict(X_new)
```

Variabel `X_new` harus memiliki kolom dan representasi fitur yang sesuai dengan model. Untuk aplikasi yang lebih terstruktur, pemeriksaan skema input sebaiknya dilakukan sebelum prediksi.

**Peringatan keamanan:** Jangan memuat file joblib atau pickle dari sumber yang tidak dipercaya. Proses deserialisasi dapat menjalankan kode berbahaya. Gunakan hanya file model yang sumber dan integritasnya dapat dipercaya.

## 6. Menyiapkan Model untuk Deployment

Deployment adalah proses mengintegrasikan model ke dalam aplikasi atau layanan agar dapat digunakan melalui antarmuka tertentu.

Model yang telah disimpan dapat dikembangkan menjadi:

- API menggunakan FastAPI.
- Aplikasi web untuk memasukkan data dan melihat hasil prediksi.
- Layanan internal untuk eksperimen atau demonstrasi.
- Komponen backend yang dipanggil oleh aplikasi lain.

Sebelum deployment, pastikan beberapa hal berikut telah disiapkan:

1. Model dan preprocessing disimpan bersama.
2. Skema input dan tipe data ditentukan.
3. Input yang tidak valid ditangani dengan baik.
4. Versi Python dan dependensi dicatat.
5. Evaluasi model dan keterbatasannya didokumentasikan.
6. Akses layanan dan data sensitif dilindungi.
7. Prediksi tidak disajikan sebagai diagnosis medis tanpa validasi dan pengawasan yang sesuai.

Untuk proyek pembelajaran ini, deployment sebaiknya dimulai sebagai demonstrasi teknis, bukan layanan diagnosis kesehatan.

## 7. Contoh Lengkap: Melatih dan Menyimpan Model

Contoh berikut menunjukkan alur sederhana untuk memuat dataset, membagi data, melatih pipeline Logistic Regression, mengevaluasi hasilnya, dan menyimpan model.

File `heart-disease.csv` diasumsikan tersedia di direktori kerja yang sama dengan script Python.

```python
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

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

# 4. Membuat pipeline preprocessing dan model
model = Pipeline([
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
model.fit(X_train, y_train)

# 6. Melakukan prediksi pada test set
y_preds = model.predict(X_test)

# 7. Mengevaluasi model
print("Accuracy:", accuracy_score(y_test, y_preds))

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        y_preds,
        labels=[0, 1],
        zero_division=0
    )
)

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_preds, labels=[0, 1]))

# 8. Menyimpan model yang sudah dilatih
joblib.dump(model, "heart_disease_model.joblib")

print("\nModel berhasil disimpan.")

# 9. Memuat kembali model
loaded_model = joblib.load("heart_disease_model.joblib")

# 10. Contoh prediksi dari satu sampel test set
sample = X_test.iloc[[0]]
prediction = loaded_model.predict(sample)

print("\nPrediksi sampel:", prediction[0])
```

### Penjelasan Kode

**Langkah 1–3: Persiapan data**

Dataset dibaca menggunakan Pandas. Kolom `target` dipisahkan dari fitur, kemudian dataset dibagi menjadi training set dan test set. Parameter `stratify=y` membantu mempertahankan proporsi kelas pada kedua bagian.

**Langkah 4–5: Membuat pipeline dan melatih model**

Pipeline memastikan StandardScaler dipelajari dari data pelatihan dan diterapkan secara konsisten saat prediksi. Logistic Regression kemudian dilatih menggunakan fitur yang telah distandardisasi.

**Langkah 6–7: Evaluasi model**

Model menghasilkan prediksi pada test set. Accuracy, classification report, dan confusion matrix digunakan untuk meninjau performanya. Angka aktual bergantung pada versi dataset dan pembagian data.

**Langkah 8–9: Menyimpan dan memuat model**

`joblib.dump()` menyimpan keseluruhan pipeline, sedangkan `joblib.load()` memuat kembali objek tersebut. Karena preprocessing termasuk dalam pipeline, pemanggil model tidak perlu melakukan scaling secara terpisah.

**Langkah 10: Prediksi sampel**

`X_test.iloc[[0]]` mengambil satu baris sebagai DataFrame, bukan Series, sehingga bentuk input tetap dua dimensi. Model menghasilkan label prediksi untuk sampel tersebut.

Contoh ini menunjukkan mekanisme penyimpanan dan penggunaan ulang model. Model yang digunakan masih merupakan contoh konfigurasi, bukan otomatis model terbaik dari proses hyperparameter tuning.

## 8. Rekomendasi Proyek Lanjutan

Setelah menyelesaikan proyek Heart Disease Classification, cobalah menerapkan kerangka kerja enam langkah Machine Learning pada dataset lain.

Beberapa sumber dataset yang dapat dipelajari:

- [UCI Machine Learning Repository — Heart Disease](https://archive.ics.uci.edu/dataset/45/heart+disease)
- [Kaggle — Heart Disease Classification Dataset](https://www.kaggle.com/datasets/sumaiyatasmeem/heart-disease-classification-dataset)

Sebelum menggunakan dataset dari sumber eksternal, periksa deskripsi, lisensi, skema fitur, definisi target, dan ketentuan penggunaan datanya.

Untuk proyek berikutnya, Anda dapat memilih masalah klasifikasi lain, misalnya klasifikasi spam, prediksi churn pelanggan, atau klasifikasi sentimen.

Terapkan kembali alur yang sama:

1. Mendefinisikan masalah.
2. Mengumpulkan dan memahami data.
3. Melakukan eksplorasi dan preprocessing.
4. Membagi data dan memilih model.
5. Melatih serta mengevaluasi model.
6. Melakukan eksperimen lanjutan dan mendokumentasikan hasil.

Dengan mengulang alur tersebut pada dataset berbeda, pemahaman tentang Machine Learning akan berkembang melalui praktik langsung.

## 9. Kesimpulan Proyek

Proyek Heart Disease Classification memperlihatkan bahwa membangun model Machine Learning tidak hanya melibatkan pemanggilan algoritma dan melihat accuracy.

Kita telah mempelajari cara:

- Memahami dataset melalui Exploratory Data Analysis.
- Menyiapkan fitur dan target.
- Membagi data menjadi training set dan test set.
- Melatih dan membandingkan algoritma klasifikasi.
- Melakukan hyperparameter tuning.
- Mengevaluasi model dengan accuracy, precision, recall, F1-score, confusion matrix, dan ROC-AUC.
- Menggunakan cross-validation untuk menilai variasi performa.
- Memahami koefisien Logistic Regression.
- Mendokumentasikan eksperimen serta mempertimbangkan penyimpanan model.

Jika model belum mencapai target, hasil tersebut tetap dapat menjadi dasar untuk eksperimen berikutnya. Jika model sudah memenuhi kebutuhan proof-of-concept, kita dapat melanjutkan ke penyimpanan model, pengujian lebih lanjut, dan deployment secara bertahap.

Yang paling penting adalah memahami alasan di balik setiap keputusan, mengevaluasi hasil secara objektif, dan tidak menganggap performa pada satu dataset sebagai jaminan keberhasilan pada data nyata.

Selamat menyelesaikan proyek end-to-end klasifikasi pertama Anda. Teruslah berlatih dengan dataset dan masalah yang berbeda agar pemahaman Machine Learning semakin kuat.
