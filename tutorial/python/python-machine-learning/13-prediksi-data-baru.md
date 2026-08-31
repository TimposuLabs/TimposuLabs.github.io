---
sidebar_position: 13
title: "Prediksi Data Baru"
---

## Prediksi Data Baru dengan KNN

Setelah model Machine Learning berhasil dilatih dan dievaluasi, model tersebut dapat digunakan untuk melakukan **prediksi terhadap data baru**.

Data baru adalah data yang belum pernah digunakan oleh model selama proses training.

Secara sederhana:

```text
Data Training
      ↓
    Train
      ↓
 Model KNN
      ↓
  Data Baru
      ↓
   Predict
      ↓
Hasil Prediksi
```

Pada materi ini, kita akan menggunakan model **K-Nearest Neighbors (KNN)** yang sebelumnya telah dilatih menggunakan Iris Dataset.

---

## Konsep Dasar Prediksi

Pada tahap sebelumnya, model KNN telah belajar berdasarkan data:

```text
X_train + y_train
       ↓
    KNN Model
```

Setelah model terlatih, kita dapat memberikan data baru:

```text
Data Baru
    ↓
KNN Model
    ↓
Prediksi
```

Model kemudian menentukan kelas dari data tersebut berdasarkan pola yang telah dipelajari.

---

## Memahami Struktur Iris Dataset

Sebelum memberikan data baru kepada model, kita harus memahami struktur features yang digunakan saat training.

Iris Dataset memiliki **4 features**:

1. **Sepal Length** — panjang sepal
2. **Sepal Width** — lebar sepal
3. **Petal Length** — panjang petal
4. **Petal Width** — lebar petal

Setiap data yang diberikan kepada model harus memiliki struktur yang sama.

Secara sederhana:

```text
[Sepal Length, Sepal Width, Petal Length, Petal Width]
```

Karena model dilatih menggunakan empat features, data baru juga harus menyediakan empat nilai features.

---

## Menyiapkan Data Baru

Kita dapat membuat data sampel secara manual.

Contohnya:

```python
sample = [
    [3, 5, 4, 2],
    [2, 3, 5, 4]
]
```

Pada contoh tersebut terdapat dua data bunga baru.

Strukturnya:

```text
Data 1 → [3, 5, 4, 2]
Data 2 → [2, 3, 5, 4]
```

Masing-masing data memiliki empat nilai yang sesuai dengan empat features Iris Dataset.

---

## Mengapa Struktur Data Harus Sesuai?

Model Machine Learning mengharapkan input dengan struktur yang sama seperti data yang digunakan ketika model dilatih.

Jika model dilatih menggunakan:

```text
4 features
```

maka data baru juga harus memiliki:

```text
4 features
```

Contoh yang benar:

```python
sample = [
    [3, 5, 4, 2],
    [2, 3, 5, 4]
]
```

Sedangkan data dengan jumlah features yang berbeda tidak sesuai dengan struktur model.

Prinsipnya:

```text
Training Features
       ↓
   4 Features
       ↓
     Model
       ↑
   4 Features
       ↑
  Data Baru
```

---

## Melakukan Prediksi dengan `predict()`

Setelah data baru disiapkan, kita dapat menggunakan method:

```python
predict()
```

pada model KNN.

Contohnya:

```python
predictions = knn.predict(sample)
```

Model akan menghasilkan prediksi berupa label numerik.

Misalnya:

```text
[1, 2]
```

Angka tersebut merupakan label kelas dari Iris Dataset.

---

## Memahami Label Iris

Iris Dataset menggunakan angka untuk merepresentasikan spesies bunga:

| Label | Spesies |
| --- | --- |
| `0` | Iris setosa |
| `1` | Iris versicolor |
| `2` | Iris virginica |

Jadi ketika model menghasilkan:

```text
[1, 2]
```

artinya:

```text
1 → Iris versicolor
2 → Iris virginica
```

---

## Mengubah Label Menjadi Nama Spesies

Label numerik memang mudah digunakan oleh komputer, tetapi kurang informatif bagi manusia.

Kita dapat menggunakan:

```python
iris.target_names
```

untuk mendapatkan nama spesies.

Contohnya:

```python
predicted_species = [
    iris.target_names[p]
    for p in predictions
]
```

Kode tersebut menggunakan **list comprehension** untuk mengubah setiap label numerik menjadi nama spesies.

---

## Memahami List Comprehension

Perhatikan:

```python
iris.target_names[p]
```

Jika:

```text
p = 0
```

maka hasilnya:

```text
setosa
```

Jika:

```text
p = 1
```

maka:

```text
versicolor
```

Jika:

```text
p = 2
```

maka:

```text
virginica
```

Kemudian list comprehension melakukan proses tersebut untuk setiap hasil prediksi.

---

## Menampilkan Hasil Prediksi

Setelah dikonversi menjadi nama spesies:

```python
print("Hasil Prediksi:", predicted_species)
```

Contoh hasil:

```text
Hasil Prediksi: ['versicolor', 'virginica']
```

Artinya model memprediksi:

```text
Data 1 → Iris versicolor
Data 2 → Iris virginica
```

---

## Implementasi Lengkap

Dengan asumsi model `knn` sudah dilatih menggunakan Iris Dataset:

```python
# Data baru
sample = [
    [3, 5, 4, 2],
    [2, 3, 5, 4]
]

# Melakukan prediksi
predictions = knn.predict(sample)

# Mengubah label numerik menjadi nama spesies
predicted_species = [
    iris.target_names[p]
    for p in predictions
]

# Menampilkan hasil
print("Hasil Prediksi:", predicted_species)
```

---

## Alur Prediksi Data Baru

Prosesnya dapat digambarkan:

```text
Data Baru
    │
    ├── [3, 5, 4, 2]
    └── [2, 3, 5, 4]
          ↓
      knn.predict()
          ↓
    Label Numerik
          ↓
       [1, 2]
          ↓
  iris.target_names
          ↓
['versicolor', 'virginica']
```

---

## `predict()` Berbeda dengan `fit()`

Penting untuk membedakan kedua method tersebut.

### `fit()`

Digunakan untuk **melatih model**:

```python
knn.fit(X_train, y_train)
```

Alurnya:

```text
Training Data
     ↓
   fit()
     ↓
Model Belajar
```

### `predict()`

Digunakan untuk **membuat prediksi**:

```python
knn.predict(sample)
```

Alurnya:

```text
Data Baru
    ↓
 predict()
    ↓
Prediksi
```

Cara mudah mengingatnya:

```text
fit()
→ belajar

predict()
→ memprediksi
```

---

## Data Baru vs Test Data

Keduanya sama-sama dapat diberikan kepada `predict()`, tetapi tujuan penggunaannya berbeda.

### Test Data

Test data digunakan untuk **mengevaluasi model**.

```text
X_test
  ↓
predict()
  ↓
y_predict
  ↓
dibandingkan dengan y_test
```

Karena `y_test` sudah diketahui, kita dapat menghitung accuracy.

---

### Data Baru

Data baru digunakan ketika kita ingin menggunakan model untuk membuat prediksi terhadap data yang belum diketahui labelnya.

```text
Data Baru
    ↓
predict()
    ↓
Prediksi
```

Jika label sebenarnya belum diketahui, kita belum dapat langsung menghitung accuracy untuk data tersebut.

---

## Bagaimana Mengetahui Prediksi Benar?

Misalnya model menghasilkan:

```text
Prediksi:
versicolor
```

Kita belum dapat mengatakan prediksi tersebut benar hanya berdasarkan output model.

Untuk mengetahui kebenarannya, kita membutuhkan **label sebenarnya**.

Misalnya:

```text
Prediksi        : versicolor
Label sebenarnya: versicolor
```

Maka prediksi tersebut benar.

Namun jika:

```text
Prediksi        : versicolor
Label sebenarnya: virginica
```

maka prediksi tersebut salah.

---

## Evaluasi Data Baru

Untuk mengevaluasi prediksi data baru secara langsung, kita membutuhkan data yang sudah memiliki label sebenarnya.

Secara sederhana:

```text
Data Baru
    ↓
  Model
    ↓
Prediction
    ↓
Compare dengan
Label Sebenarnya
    ↓
Evaluation
```

Inilah alasan mengapa dataset yang memiliki label sangat penting dalam **Supervised Learning**.

---

## Hubungan dengan Accuracy

Pada tahap evaluasi sebelumnya kita menggunakan:

```python
metrics.accuracy_score(
    y_test,
    y_predict
)
```

Karena kita memiliki:

```text
y_test
↓
Label sebenarnya
```

dan:

```text
y_predict
↓
Prediksi model
```

Keduanya dapat dibandingkan.

Untuk data baru, jika label sebenarnya belum diketahui, kita hanya memiliki:

```text
Data Baru
    ↓
Prediction
```

Sehingga accuracy belum dapat dihitung.

---

## Contoh Workflow Lengkap

Jika seluruh proses dari training hingga prediksi digabungkan:

```text
Iris Dataset
     ↓
X dan y
     ↓
Train/Test Split
     ↓
X_train + y_train
     ↓
KNN.fit()
     ↓
Model Terlatih
     ↓
  X_test
     ↓
predict()
     ↓
y_predict
     ↓
accuracy_score()
     ↓
Evaluasi Model
```

Setelah model dianggap cukup baik:

```text
Model Terlatih
     ↓
Data Baru
     ↓
predict()
     ↓
Hasil Prediksi
```

---

## Akurasi Model

Pada demonstrasi sebelumnya, model dapat menghasilkan accuracy sekitar **96%** berdasarkan data testing.

Nilai tersebut menunjukkan bahwa model mampu melakukan klasifikasi dengan cukup baik pada data uji yang digunakan.

Namun, accuracy pada test set tidak berarti setiap prediksi data baru pasti benar.

Data baru tetap dapat menghasilkan prediksi yang salah.

---

## Mengapa Model Bisa Salah?

Machine Learning tidak selalu menghasilkan prediksi yang benar.

Model mempelajari pola dari data training.

Jika terdapat data baru yang memiliki karakteristik berbeda atau berada di area yang sulit dibedakan, model dapat menghasilkan prediksi yang salah.

Secara sederhana:

```text
Data Training
     ↓
Belajar Pola
     ↓
   Model
     ↓
 Data Baru
     ↓
  Prediksi
```

Kualitas prediksi sangat dipengaruhi oleh kualitas data dan kemampuan model dalam melakukan generalisasi.

---

## Ringkasan

Pada materi ini kita mempelajari cara menggunakan model KNN untuk memprediksi data baru.

Konsep utama:

- Model yang sudah dilatih dapat digunakan untuk melakukan prediksi.
- Data baru harus memiliki jumlah dan struktur features yang sesuai dengan data training.
- Iris Dataset memiliki empat features.
- `knn.predict()` digunakan untuk menghasilkan prediksi.
- Hasil prediksi Iris berupa label numerik `0`, `1`, atau `2`.
- `iris.target_names` dapat digunakan untuk mengubah label numerik menjadi nama spesies.
- List comprehension dapat digunakan untuk melakukan konversi tersebut.
- Data baru yang belum memiliki label sebenarnya belum dapat dievaluasi menggunakan accuracy.
- Untuk mengetahui apakah prediksi benar, kita membutuhkan **label sebenarnya**.

---

## Kesimpulan

Setelah model Machine Learning selesai dilatih dan memiliki performa yang cukup baik, model dapat digunakan untuk melakukan prediksi terhadap data baru.

Prosesnya:

```text
Model Terlatih
      ↓
   Data Baru
      ↓
   predict()
      ↓
Label Prediksi
      ↓
Konversi Label
      ↓
  Nama Kelas
```

Pada Iris Dataset:

```text
0 → setosa
1 → versicolor
2 → virginica
```

Sehingga model tidak hanya dapat digunakan untuk menguji `X_test`, tetapi juga dapat digunakan untuk memprediksi data baru yang memiliki struktur features yang sesuai.

Inilah tahap penting dalam Machine Learning: **model yang telah belajar dari data dapat digunakan untuk menghasilkan prediksi pada data yang belum diketahui jawabannya.**