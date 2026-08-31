---
sidebar_position: 11
title: "Model Training, Prediction & Evaluation"
---

Setelah dataset dibagi menjadi **Training Set** dan **Test Set**, tahap berikutnya adalah menggunakan data tersebut untuk membuat model Machine Learning.

Pada [materi sebelumnya](/python/python-data-science-ml/ml-workflow), kita sudah memiliki:

```text
X_train → Features untuk training
y_train → Target untuk training

X_test  → Features untuk testing
y_test  → Target sebenarnya untuk testing
```

Sekarang kita akan menggunakan **K-Nearest Neighbors (KNN)** untuk melakukan klasifikasi pada Iris Dataset.

Workflow-nya:

```text
Training Data
     ↓
   fit()
     ↓
   Model
     ↓
 predict()
     ↓
Prediction
     ↓
accuracy_score()
     ↓
Evaluation
```

---

## Tahapan Model Machine Learning

Secara sederhana, prosesnya terdiri dari empat tahap utama:

1. **Memilih algoritma**
2. **Melatih model**
3. **Membuat prediksi**
4. **Mengevaluasi hasil**

---

## 1. Memilih Algoritma Model

Untuk contoh ini kita menggunakan algoritma:

**K-Nearest Neighbors (KNN)**

KNN merupakan algoritma yang dapat digunakan untuk melakukan klasifikasi.

Konsep sederhananya adalah:

> Data baru diklasifikasikan berdasarkan kemiripannya dengan beberapa data terdekat.

Pada dataset Iris, model akan mencoba menentukan apakah sebuah bunga termasuk:

```text
Iris setosa
Iris versicolor
Iris virginica
```

---

## 2. Mengenal K-Nearest Neighbors

K-Nearest Neighbors atau **KNN** menggunakan jarak atau kemiripan antara data untuk menentukan kelas sebuah data baru.

Misalnya terdapat sebuah data baru:

```text
Data Baru
    ↓
Cari tetangga terdekat
    ↓
Ambil K tetangga
    ↓
Lihat kelas yang paling banyak
    ↓
Tentukan kelas data baru
```

Jika kita menggunakan:

```python
n_neighbors=3
```

maka model akan mempertimbangkan **3 tetangga terdekat**.

Misalnya:

```text
Tetangga 1 → setosa
Tetangga 2 → setosa
Tetangga 3 → versicolor
```

Maka kelas yang paling banyak adalah:

```text
setosa
```

Sehingga data baru akan diklasifikasikan sebagai `setosa`.

---

## 3. Parameter `n_neighbors`

KNN memiliki parameter:

```python
n_neighbors
```

Parameter tersebut menentukan jumlah tetangga yang digunakan sebagai pertimbangan dalam menentukan kelas.

Contoh:

```python
KNeighborsClassifier(n_neighbors=3)
```

berarti model menggunakan **3 tetangga terdekat**.

Nilai `K` tidak harus selalu 3. Nilai tersebut dapat disesuaikan berdasarkan dataset dan eksperimen model.

---

## 4. Membuat Model KNN

Pertama, kita perlu mengimpor `KNeighborsClassifier`:

```python
from sklearn.neighbors import KNeighborsClassifier
```

Kemudian membuat model:

```python
knn = KNeighborsClassifier(n_neighbors=3)
```

Pada tahap ini, kita baru **membuat objek model**.

Model belum mempelajari dataset.

---

## 5. Melatih Model dengan `fit()`

Untuk membuat model belajar dari data training, digunakan method:

```python
.fit()
```

Contohnya:

```python
knn.fit(X_train, y_train)
```

Di sini:

```text
X_train
   ↓
Features/Input

y_train
   ↓
Target/Label
```

Model akan menggunakan pasangan `X_train` dan `y_train` sebagai dasar untuk proses pembelajaran.

Secara sederhana:

```text
X_train + y_train
       ↓
    knn.fit()
       ↓
  Trained Model
```

---

## 6. Mengapa Hanya Menggunakan Data Training?

Perhatikan bahwa kita menggunakan:

```python
knn.fit(X_train, y_train)
```

dan **bukan**:

```python
knn.fit(X_test, y_test)
```

Data testing harus tetap disimpan untuk menguji kemampuan model.

Jika data testing digunakan untuk training, kita tidak lagi memiliki data yang benar-benar baru untuk menguji model.

Hal ini dapat menyebabkan **data leakage**.

Prinsip sederhananya:

```text
Training Data
     ↓
Belajar

Test Data
     ↓
Menguji
```

---

## 7. Membuat Prediksi dengan `predict()`

Setelah model selesai dilatih, kita dapat menggunakannya untuk membuat prediksi.

Gunakan:

```python
knn.predict(X_test)
```

Contohnya:

```python
y_predict = knn.predict(X_test)
```

Perhatikan bahwa yang diberikan kepada `predict()` adalah:

```python
X_test
```

bukan:

```python
y_test
```

Karena model harus mencoba **memprediksi target berdasarkan features**.

Alurnya:

```text
X_test
   ↓
Model
   ↓
y_predict
```

---

## 8. Memahami `y_predict`

`y_predict` berisi hasil prediksi dari model.

Misalnya:

```text
y_test:

[0, 1, 2, 1, 0]

y_predict:

[0, 1, 2, 0, 0]
```

Kita sekarang memiliki dua informasi:

```text
y_test
   ↓
Jawaban sebenarnya

y_predict
   ↓
Jawaban dari model
```

Keduanya dapat dibandingkan untuk mengetahui performa model.

---

## 9. Evaluasi Model dengan `accuracy_score`

Salah satu metrik sederhana untuk klasifikasi adalah **accuracy**.

Accuracy menunjukkan proporsi prediksi yang benar dibandingkan dengan seluruh prediksi.

Kita dapat menggunakan:

```python
accuracy_score()
```

Import:

```python
from sklearn import metrics
```

Kemudian:

```python
accuracy = metrics.accuracy_score(
    y_test,
    y_predict
)
```

---

## 10. `y_true` dan `y_pred`

Fungsi `accuracy_score()` memiliki konsep:

```python
accuracy_score(y_true, y_pred)
```

Dalam kasus kita:

```python
accuracy_score(y_test, y_predict)
```

Artinya:

```text
y_test
   ↓
Nilai sebenarnya

y_predict
   ↓
Nilai hasil prediksi
```

Kemudian keduanya dibandingkan.

---

## 11. Contoh Perhitungan Accuracy

Misalnya:

```text
y_test     = [0, 1, 2, 1, 0]
y_predict  = [0, 1, 2, 0, 0]
```

Perbandingannya:

```text
Data 1 → Benar
Data 2 → Benar
Data 3 → Benar
Data 4 → Salah
Data 5 → Benar
```

Berarti:

```text
4 prediksi benar
5 total prediksi
```

Accuracy:

```text
4 / 5 = 0.8
```

atau:

```text
80%
```

---

## 12. Menampilkan Accuracy

Hasil accuracy dapat ditampilkan:

```python
print(f"Akurasi Model: {accuracy * 100:.2f}%")
```

Jika nilai accuracy:

```text
0.95
```

maka hasilnya:

```text
Akurasi Model: 95.00%
```

---

## Implementasi Lengkap

Berikut implementasi sederhana workflow Machine Learning menggunakan Iris Dataset dan KNN:

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn import metrics

# 1. Load dataset
iris = load_iris()

X = iris.data
y = iris.target

# 2. Membagi data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2
)

# 3. Membuat model KNN
knn = KNeighborsClassifier(n_neighbors=3)

# 4. Melatih model
knn.fit(X_train, y_train)

# 5. Membuat prediksi
y_predict = knn.predict(X_test)

# 6. Mengukur accuracy
accuracy = metrics.accuracy_score(
    y_test,
    y_predict
)

print(f"Akurasi Model: {accuracy * 100:.2f}%")
```

---

## Memahami Alur Kode

Kode tersebut dapat dibaca sebagai sebuah pipeline:

```text
load_iris()
     ↓
Dataset
     ↓
X dan y
     ↓
train_test_split()
     ↓
X_train, X_test
y_train, y_test
     ↓
KNeighborsClassifier()
     ↓
knn.fit(X_train, y_train)
     ↓
Model Terlatih
     ↓
knn.predict(X_test)
     ↓
y_predict
     ↓
accuracy_score(y_test, y_predict)
     ↓
Accuracy
```

---

## `fit()` vs `predict()`

Dua method penting yang perlu dibedakan:

| Method | Fungsi | Data |
| --- | --- | --- |
| `fit()` | Melatih model | `X_train`, `y_train` |
| `predict()` | Membuat prediksi | `X_test` |

Cara mudah mengingatnya:

```text
fit()
↓
BELAJAR

predict()
↓
MENEBak
```

---

## `y_test` vs `y_predict`

Kedua variabel ini juga memiliki fungsi yang berbeda:

| Variabel | Isi |
| --- | --- |
| `y_test` | Jawaban sebenarnya |
| `y_predict` | Hasil prediksi model |

Keduanya digunakan untuk evaluasi:

```text
y_test
  +
y_predict
  ↓
Comparison
  ↓
Accuracy
```

---

## Mengapa Tidak Langsung Menggunakan Seluruh Dataset?

Kita tidak menggunakan seluruh dataset untuk training karena kita membutuhkan data yang belum digunakan model untuk menguji kemampuannya.

Misalnya terdapat 100 data:

```text
100 Data
   │
   ├── 80 → Training
   │
   └── 20 → Testing
```

Model belajar dari:

```text
80 data
```

Kemudian diuji menggunakan:

```text
20 data
```

Dengan cara tersebut kita dapat memperoleh gambaran mengenai kemampuan model terhadap data yang belum digunakan dalam training.

---

## Data Leakage

**Data leakage** terjadi ketika informasi dari data yang seharusnya digunakan untuk evaluasi ikut masuk ke proses training dengan cara yang tidak semestinya.

Dalam workflow sederhana ini, prinsip pentingnya adalah:

```text
X_train + y_train
       ↓
      fit()
```

Sedangkan:

```text
X_test
   ↓
predict()
```

dan:

```text
y_test + y_predict
       ↓
   evaluation
```

Data testing sebaiknya tidak digunakan untuk melatih model.

---

## Hubungan dengan Workflow Machine Learning

Sekarang workflow yang telah kita pelajari menjadi:

```text
1. Import Data
       ↓
2. Clean Data
       ↓
3. Split Data
       ↓
4. Create Model
       ↓
5. Train Model
       ↓
6. Predict
       ↓
7. Evaluate
       ↓
8. Improve
```

Dalam implementasi menggunakan scikit-learn:

```text
train_test_split()
        ↓
KNeighborsClassifier()
        ↓
fit()
        ↓
predict()
        ↓
accuracy_score()
```

---

## Ringkasan

Pada materi ini kita mempelajari proses **training, prediction, dan evaluation** menggunakan scikit-learn.

Konsep penting:

- **KNN** adalah algoritma yang melakukan klasifikasi berdasarkan tetangga terdekat.
- `n_neighbors` menentukan jumlah tetangga yang digunakan.
- `fit()` digunakan untuk melatih model.
- Training hanya menggunakan `X_train` dan `y_train`.
- `predict()` digunakan untuk menghasilkan prediksi.
- `predict()` menggunakan `X_test` sebagai input.
- `y_test` merupakan jawaban sebenarnya.
- `y_predict` merupakan hasil prediksi model.
- `accuracy_score()` digunakan untuk membandingkan prediksi dengan nilai sebenarnya.
- Data testing tidak digunakan untuk training agar evaluasi tetap valid.
- Menggunakan data testing dalam training dapat menyebabkan **data leakage**.

---

## Kesimpulan

Setelah data dipisahkan menjadi training dan testing, kita dapat mulai membangun model Machine Learning.

Pada contoh Iris Dataset:

```text
X_train + y_train
       ↓
    KNN Model
       ↓
     fit()
       ↓
 Model Terlatih
       ↓
     X_test
       ↓
   predict()
       ↓
  y_predict
       ↓
y_test + y_predict
       ↓
accuracy_score()
       ↓
   Accuracy
```

Inilah inti dari proses **Machine Learning sederhana menggunakan scikit-learn**: model belajar dari data training, membuat prediksi terhadap data baru, kemudian hasilnya dibandingkan dengan jawaban sebenarnya untuk mengetahui seberapa baik model bekerja.

## Baca Juga

* https://scikit-learn.org/stable/user_guide.html
* https://app.notion.com/p/Model-Training-3ccc828bbd1c8077b1f1d7b85d927e41?source=copy_link