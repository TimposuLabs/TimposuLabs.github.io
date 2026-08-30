---
sidebar_position: 12
title: "Model Improvement"
---

Setelah berhasil membuat model, melakukan training, dan mengevaluasi hasil prediksi, langkah berikutnya adalah **meningkatkan performa model**.

Model Machine Learning yang pertama kali dibuat belum tentu memberikan hasil terbaik. Kita dapat melakukan berbagai eksperimen untuk mencari konfigurasi dan pendekatan yang lebih sesuai dengan dataset.

Secara sederhana, prosesnya bersifat iteratif:

```text
Train
  ↓
Evaluate
  ↓
Improve
  ↓
Train
  ↓
Evaluate
  ↓
Improve
  ↓
...
```

---

## Empat Pendekatan untuk Meningkatkan Model

Beberapa pendekatan utama yang dapat digunakan adalah:

1. **Menyesuaikan proporsi Training dan Test Data**
2. **Melakukan Hyperparameter Tuning**
3. **Menambahkan atau memperbaiki Features**
4. **Mencoba algoritma Machine Learning lainnya**

---

## 1. Menyesuaikan Proporsi Data

Pada tahap sebelumnya, dataset dibagi menjadi:

```text
Training Set
    +
Test Set
```

Proporsi pembagian data dapat memengaruhi performa model dan kualitas evaluasi.

Parameter yang digunakan adalah:

```python
test_size
```

Contohnya:

```python
train_test_split(
    X,
    y,
    test_size=0.2
)
```

Artinya:

```text
80% → Training
20% → Testing
```

---

### Terlalu Banyak Data Testing

Misalnya:

```python
test_size=0.8
```

Maka:

```text
20% → Training
80% → Testing
```

Masalahnya, model hanya mendapatkan sebagian kecil dataset untuk belajar.

```text
Dataset
│
├── 20% → Training
│
└── 80% → Testing
```

Data training yang terlalu sedikit dapat membuat model kesulitan mempelajari pola dari dataset.

---

### Terlalu Sedikit Data Testing

Sebaliknya, kita juga tidak sebaiknya menggunakan test set yang terlalu kecil.

Misalnya:

```python
test_size=0.1
```

Pada dataset Iris yang memiliki 150 data:

```text
Training → 135 data
Testing  → 15 data
```

Model mungkin memperoleh accuracy yang sangat tinggi, bahkan bisa mencapai:

```text
100%
```

Namun hanya menggunakan 15 data untuk pengujian membuat hasil evaluasi menjadi kurang representatif.

Dengan kata lain:

:::info
Accuracy yang tinggi belum tentu menunjukkan bahwa model benar-benar bekerja dengan baik jika jumlah data testing terlalu sedikit.
:::

---

### Rasio Data yang Umum Digunakan

Beberapa rasio yang umum digunakan antara lain:

```text
70% Training : 30% Testing
80% Training : 20% Testing
```

Pada materi ini, nilai:

```python
test_size=0.2
```

digunakan sebagai contoh.

Pemilihan rasio tetap perlu disesuaikan dengan ukuran dataset dan kebutuhan eksperimen.

---

## 2. Hyperparameter Tuning

Pendekatan berikutnya adalah melakukan **Hyperparameter Tuning**.

Hyperparameter adalah konfigurasi yang ditentukan sebelum proses training model.

Setiap algoritma memiliki hyperparameter yang berbeda.

Pada KNN, salah satu hyperparameter yang penting adalah:

```python
n_neighbors
```

Contohnya:

```python
KNeighborsClassifier(n_neighbors=3)
```

Nilai tersebut menentukan jumlah tetangga yang digunakan KNN dalam proses klasifikasi.

---

### Mengubah Nilai `n_neighbors`

Kita dapat melakukan eksperimen dengan nilai yang berbeda:

```python
KNeighborsClassifier(n_neighbors=3)
```

kemudian:

```python
KNeighborsClassifier(n_neighbors=5)
```

atau:

```python
KNeighborsClassifier(n_neighbors=7)
```

Kemudian kita dapat membandingkan hasil evaluasinya.

Secara sederhana:

```text
K = 3
   ↓
Train → Evaluate

K = 5
   ↓
Train → Evaluate

K = 7
   ↓
Train → Evaluate
```

Tujuannya adalah mencari konfigurasi yang memberikan performa yang lebih baik.

---

## 3. Feature Engineering

Model Machine Learning belajar berdasarkan **features** yang diberikan kepadanya.

Jika features yang digunakan kurang informatif, model mungkin mengalami kesulitan dalam membedakan data.

**Feature Engineering** merupakan proses membuat, memilih, atau mengubah features agar informasi yang diberikan kepada model menjadi lebih berguna.

Misalnya kita memiliki:

```text
Feature A
Feature B
```

Kita dapat mempertimbangkan feature tambahan:

```text
Feature A
Feature B
Feature C
```

Dengan informasi tambahan tersebut, model mungkin memiliki konteks yang lebih baik untuk melakukan prediksi.

---

### Mengapa Features Penting?

Secara sederhana:

```text
Features
    ↓
Machine Learning Model
    ↓
Prediction
```

Model hanya dapat belajar dari informasi yang diberikan.

Jika informasi yang relevan tidak tersedia dalam dataset, mengganti algoritma saja belum tentu menyelesaikan masalah.

Karena itu, memahami dan mempersiapkan features merupakan bagian penting dalam Machine Learning.

---

## 4. Mencoba Algoritma Lain

Tidak ada satu algoritma yang selalu menjadi algoritma terbaik untuk semua dataset dan permasalahan.

Karena itu, kita dapat mencoba beberapa algoritma dan membandingkan performanya.

Contohnya:

```text
KNN
 ↓
Accuracy

Decision Tree
 ↓
Accuracy

Random Forest
 ↓
Accuracy
```

Kemudian hasilnya dapat dibandingkan.

Pada materi ini kita akan membandingkan:

```text
KNN
vs
Decision Tree
```

---

### Membuat Model KNN

Pertama, kita membuat model KNN:

```python
from sklearn.neighbors import KNeighborsClassifier

knn = KNeighborsClassifier(
    n_neighbors=3
)
```

Kemudian melatih model:

```python
knn.fit(X_train, y_train)
```

Membuat prediksi:

```python
y_pred_knn = knn.predict(X_test)
```

Dan menghitung accuracy:

```python
acc_knn = metrics.accuracy_score(
    y_test,
    y_pred_knn
)
```

---

### Membuat Model Decision Tree

Selanjutnya kita membuat model menggunakan **Decision Tree**.

Import:

```python
from sklearn.tree import DecisionTreeClassifier
```

Membuat model:

```python
tree = DecisionTreeClassifier()
```

Training:

```python
tree.fit(X_train, y_train)
```

Prediksi:

```python
y_pred_tree = tree.predict(X_test)
```

Evaluasi:

```python
acc_tree = metrics.accuracy_score(
    y_test,
    y_pred_tree
)
```

---

### Membandingkan Kedua Model

Setelah mendapatkan accuracy dari kedua model:

```python
print(
    f"Akurasi KNN: {acc_knn * 100:.2f}%"
)

print(
    f"Akurasi Decision Tree: {acc_tree * 100:.2f}%"
)
```

Kita dapat memperoleh hasil seperti:

```text
Akurasi KNN          : 96.67%
Akurasi Decision Tree: 93.33%
```

Angka tersebut hanya contoh. Hasil aktual dapat berbeda ketika kode dijalankan.

---

## Implementasi Lengkap

Berikut contoh perbandingan KNN dan Decision Tree:

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn import metrics

# Load dataset
iris = load_iris()

X = iris.data
y = iris.target

# Membagi dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2
)

# KNN
knn = KNeighborsClassifier(
    n_neighbors=3
)

knn.fit(X_train, y_train)

y_pred_knn = knn.predict(X_test)

acc_knn = metrics.accuracy_score(
    y_test,
    y_pred_knn
)

# Decision Tree
tree = DecisionTreeClassifier()

tree.fit(X_train, y_train)

y_pred_tree = tree.predict(X_test)

acc_tree = metrics.accuracy_score(
    y_test,
    y_pred_tree
)

# Membandingkan hasil
print(
    f"Akurasi KNN          : {acc_knn * 100:.2f}%"
)

print(
    f"Akurasi Decision Tree: {acc_tree * 100:.2f}%"
)
```

---

## Hasil Machine Learning Dapat Berubah

Jika kode dijalankan beberapa kali, hasil accuracy dapat berbeda.

Hal ini dapat terjadi karena proses:

```python
train_test_split()
```

secara default melakukan pengacakan (*randomization*) ketika membagi dataset.

Misalnya pada satu eksekusi:

```text
KNN → 96.67%
```

Pada eksekusi lain:

```text
KNN → 100.00%
```

atau:

```text
KNN → 93.33%
```

Perbedaan tersebut dapat terjadi karena model menerima kombinasi data training dan testing yang berbeda.

---

## Mengapa Hasilnya Berubah?

Misalnya terdapat 150 data:

```text
Dataset
   ↓
Random Split
   ↓
Training + Testing
```

Pada eksekusi pertama:

```text
Data A, B, C, ...
     ↓
Training
```

Pada eksekusi berikutnya:

```text
Data X, Y, Z, ...
     ↓
Training
```

Karena data yang digunakan untuk training dapat berbeda, hasil evaluasi juga dapat berubah.

---

## Model Improvement adalah Proses Iteratif

Meningkatkan model bukan proses yang dilakukan hanya sekali.

Biasanya kita melakukan eksperimen berulang:

```text
Model
  ↓
Training
  ↓
Evaluation
  ↓
Analyze Result
  ↓
Improvement
  ↓
Training Again
```

Perubahan dapat dilakukan pada:

```text
Data
Features
Hyperparameters
Algorithm
```

Kemudian model kembali dilatih dan dievaluasi.

---

## Contoh Siklus Eksperimen

Misalnya kita memulai dengan:

```text
KNN
K = 3
Test Size = 0.2
```

Hasil:

```text
Accuracy = 93%
```

Kemudian kita mencoba:

```text
KNN
K = 5
Test Size = 0.2
```

Hasil:

```text
Accuracy = 96%
```

Kemudian mencoba:

```text
Decision Tree
Test Size = 0.2
```

Hasil:

```text
Accuracy = 94%
```

Dari eksperimen tersebut kita dapat membandingkan pendekatan yang digunakan.

---

## Jangan Hanya Mengejar Accuracy

Accuracy merupakan salah satu metrik evaluasi, tetapi bukan satu-satunya pertimbangan dalam memilih model.

Dalam proyek Machine Learning yang lebih serius, kita juga perlu mempertimbangkan:

```text
Dataset
Problem yang diselesaikan
Jenis kesalahan
Metrik evaluasi
Performa model
Kemampuan generalisasi
```

Model dengan accuracy tinggi pada satu pembagian data belum tentu menjadi model terbaik untuk penggunaan dunia nyata.

---

## Ringkasan

Pada materi ini kita mempelajari beberapa cara meningkatkan performa model:

### 1. Train/Test Split

Menyesuaikan proporsi data training dan testing.

```python
test_size=0.2
```

### 2. Hyperparameter Tuning

Mencoba konfigurasi berbeda pada algoritma.

Contoh KNN:

```python
n_neighbors=3
```

### 3. Feature Engineering

Menambahkan atau memperbaiki features yang digunakan model.

### 4. Model Comparison

Mencoba algoritma lain dan membandingkan hasilnya.

Contoh:

```text
KNN
vs
Decision Tree
```

---

## Konsep Penting

Beberapa hal yang perlu diingat:

- Data training digunakan untuk mempelajari pola.
- Data testing digunakan untuk mengevaluasi model.
- Test set yang terlalu besar dapat mengurangi jumlah data untuk training.
- Test set yang terlalu kecil dapat membuat evaluasi kurang representatif.
- Hyperparameter dapat memengaruhi performa model.
- Features yang relevan dapat membantu model membuat prediksi.
- Tidak ada satu algoritma yang selalu terbaik untuk semua masalah.
- Hasil eksperimen dapat berubah karena proses pembagian data secara acak.
- Model Improvement merupakan proses **iteratif**, bukan proses satu kali.

---

## Kesimpulan

Setelah membuat model Machine Learning, pekerjaan belum selesai.

Kita perlu melakukan eksperimen untuk mencari konfigurasi yang paling sesuai dengan data dan permasalahan yang sedang dihadapi.

Secara sederhana:

```text
Create Model
     ↓
   Train
     ↓
  Evaluate
     ↓
Apakah hasil sudah baik?
     │
   ┌─┴─┐
  Tidak Ya
   │    │
   ↓    ↓
Improve Selesai
   │
   ├── Ubah Data Split
   ├── Tuning Hyperparameter
   ├── Feature Engineering
   └── Coba Algoritma Lain
   │
   └──────────→ Train Again
```

Inilah salah satu karakteristik penting dalam Machine Learning: **model dikembangkan melalui proses eksperimen, evaluasi, dan perbaikan secara berulang hingga menghasilkan performa yang sesuai dengan kebutuhan.**

## Referensi

* https://scikit-learn.org/stable/modules/neighbors.html
* https://scikit-learn.org/stable/modules/tree.html