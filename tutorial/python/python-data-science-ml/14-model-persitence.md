---
sidebar_position: 14
title: "Model Persistence"
---

## Menyimpan dan Memuat Model Machine Learning

Setelah sebuah model Machine Learning selesai dilatih, model tersebut tidak selalu perlu dilatih ulang setiap kali program dijalankan.

Proses **training** dapat membutuhkan waktu, memori, dan sumber daya komputasi, terutama ketika dataset yang digunakan berukuran besar. Oleh karena itu, model yang sudah dilatih dapat disimpan ke dalam sebuah file dan digunakan kembali ketika dibutuhkan.

Proses tersebut dikenal sebagai **Model Persistence**.

---

## Apa itu Model Persistence?

**Model Persistence** adalah proses menyimpan model Machine Learning yang sudah dilatih ke dalam sebuah file sehingga model tersebut dapat dimuat kembali dan digunakan tanpa melakukan training dari awal.

Alur sederhananya:

```text
Dataset
   ↓
Training
   ↓
Model
   ↓
 Save
   ↓
Model File
```

Ketika model diperlukan kembali:

```text
Model File
   ↓
 Load
   ↓
Trained Model
   ↓
Prediction
```

Dengan demikian, proses training yang membutuhkan banyak sumber daya tidak perlu dilakukan setiap kali aplikasi dijalankan.

---

## Mengapa Model Perlu Disimpan?

Bayangkan sebuah model membutuhkan waktu cukup lama untuk melakukan training.

Jika setiap kali aplikasi dijalankan model harus dilatih kembali:

```text
Jalankan aplikasi
      ↓
Load dataset
      ↓
  Training
      ↓
  Model siap
      ↓
  Prediction
```

Proses tersebut menjadi tidak efisien.

Dengan Model Persistence:

```text
Training
   ↓
Save Model
   ↓
Model File
```

Kemudian aplikasi dapat langsung:

```text
Load Model
   ↓
Prediction
```

Beberapa manfaatnya antara lain:

- Menghemat waktu training.
- Mengurangi penggunaan sumber daya komputasi.
- Memungkinkan model digunakan kembali.
- Memudahkan proses deployment.
- Memisahkan proses training dengan proses prediction.

---

## Library `joblib`

Salah satu library yang umum digunakan untuk menyimpan model Machine Learning berbasis Python adalah **`joblib`**.

`joblib` menyediakan mekanisme untuk melakukan:

- **Serialization** → menyimpan objek Python ke dalam file.
- **Deserialization** → memuat kembali objek dari file.

Dalam konteks Machine Learning, `joblib` sering digunakan untuk menyimpan model dari **scikit-learn**.

Dua fungsi utama yang digunakan adalah:

```python
joblib.dump()
```

dan:

```python
joblib.load()
```

---

## `joblib.dump()`

Fungsi `joblib.dump()` digunakan untuk menyimpan objek ke dalam file.

Bentuk sederhananya:

```python
joblib.dump(model, 'trained_model.joblib')
```

Parameter pertama adalah objek yang ingin disimpan.

Parameter kedua adalah nama file tempat objek tersebut disimpan.

Contohnya:

```python
import joblib

joblib.dump(knn, 'trained_model.joblib')
```

Setelah kode dijalankan, model akan disimpan sebagai:

```text
trained_model.joblib
```

---

## `joblib.load()`

Setelah model disimpan, kita dapat memuatnya kembali menggunakan `joblib.load()`.

Contohnya:

```python
import joblib

trained_knn = joblib.load('trained_model.joblib')
```

Variabel `trained_knn` sekarang berisi model yang sebelumnya sudah dilatih dan disimpan.

Model tersebut dapat digunakan kembali untuk melakukan prediksi.

---

## Melatih dan Menyimpan Model

Berikut contoh menggunakan dataset Iris dan algoritma KNN:

```python
import joblib

from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

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

# Membuat dan melatih model
knn = KNeighborsClassifier(
    n_neighbors=3
)

knn.fit(X_train, y_train)

# Menyimpan model
joblib.dump(
    knn,
    'trained_model.joblib'
)

print('Model berhasil disimpan!')
```

Alurnya adalah:

```text
Iris Dataset
     ↓
Train/Test Split
     ↓
    KNN
     ↓
Training (.fit)
     ↓
Trained Model
     ↓
joblib.dump()
     ↓
trained_model.joblib
```

---

## Memuat Model yang Sudah Disimpan

Setelah model tersimpan, kita tidak perlu melakukan training kembali untuk menggunakannya.

Kita cukup memuat file model:

```python
import joblib

trained_knn = joblib.load(
    'trained_model.joblib'
)
```

Setelah itu model dapat digunakan untuk melakukan prediksi.

Contohnya:

```python
sample_data = [
    [5.1, 3.5, 1.4, 0.2]
]

prediction = trained_knn.predict(
    sample_data
)

print(prediction)
```

Alurnya:

```text
trained_model.joblib
        ↓
  joblib.load()
        ↓
  Trained Model
        ↓
     predict()
        ↓
   Prediction
```

---

## Training vs Prediction

Model Persistence membantu memisahkan dua proses yang berbeda:

### Training

Training dilakukan ketika kita ingin membuat atau memperbarui model.

```text
Dataset
   ↓
Training
   ↓
 Model
   ↓
 Save
```

### Prediction

Prediction menggunakan model yang sudah tersedia.

```text
Load Model
   ↓
Input Baru
   ↓
Prediction
```

Tidak diperlukan proses training ulang setiap kali ingin melakukan prediksi.

---

## Contoh Struktur Proyek

Model yang sudah dilatih dapat disimpan sebagai bagian dari proyek:

```text
machine-learning/
│
├── train.py
├── predict.py
├── trained_model.joblib
└── dataset.csv
```

Misalnya:

- `train.py` digunakan untuk melatih dan menyimpan model.
- `trained_model.joblib` menyimpan model yang sudah dilatih.
- `predict.py` memuat model dan melakukan prediksi.
- `dataset.csv` merupakan dataset yang digunakan untuk training.

Dengan struktur seperti ini, proses training dan prediction dapat dipisahkan.

---

## Model Persistence dalam Deployment

Model Persistence sangat berguna ketika model akan digunakan dalam aplikasi.

Misalnya sebuah model Machine Learning digunakan pada aplikasi web:

```text
             Training
                ↓
           Machine Learning
                ↓
           Save Model
                ↓
      trained_model.joblib
                ↓
        ┌───────┴───────┐
        ↓               ↓
     Flask            FastAPI
        ↓               ↓
        └───────┬───────┘
                ↓
            Prediction
```

Aplikasi tidak perlu melakukan training setiap kali pengguna mengirimkan permintaan.

Model cukup dimuat ketika aplikasi dijalankan dan kemudian digunakan untuk melayani proses prediction.

---

## Catatan Penggunaan `joblib`

Pada lingkungan Python modern, gunakan `joblib` sebagai library tersendiri:

```python
import joblib
```

Pendekatan ini lebih umum dibandingkan penggunaan:

```python
from sklearn.externals import joblib
```

---

## Hal yang Perlu Diperhatikan

File model bukan sekadar file data biasa. Model yang disimpan bergantung pada struktur objek dan environment Python yang digunakan ketika model dibuat.

Karena itu, ketika model digunakan kembali, penting untuk memperhatikan:

- Versi Python.
- Versi scikit-learn.
- Versi library yang digunakan model.
- Dependency yang dibutuhkan.
- Sumber file model.

Hal ini menjadi semakin penting ketika model dipindahkan ke komputer atau server lain.

---

## Ringkasan

**Model Persistence** memungkinkan model Machine Learning yang sudah dilatih disimpan dan digunakan kembali tanpa melakukan training dari awal.

Fungsi utama `joblib`:

| Fungsi | Kegunaan |
| --- | --- |
| `joblib.dump()` | Menyimpan model |
| `joblib.load()` | Memuat model |

Alur keseluruhannya:

```text
Training
   ↓
Trained Model
   ↓
joblib.dump()
   ↓
Model File
   ↓
joblib.load()
   ↓
Trained Model
   ↓
Prediction
```

Konsep ini merupakan bagian penting dalam Machine Learning karena proses **training** dan **prediction** dapat dipisahkan. Model dapat dilatih sekali, disimpan, kemudian digunakan berulang kali oleh aplikasi.

---

## Kesimpulan

Model Persistence menjawab masalah sederhana tetapi penting:

> **Bagaimana menggunakan model yang sudah dilatih tanpa harus melakukan training ulang setiap kali program dijalankan?**

Jawabannya adalah dengan **menyimpan model ke dalam file dan memuatnya kembali ketika diperlukan**.

Dalam Python, `joblib` menyediakan cara praktis untuk melakukan proses tersebut, terutama ketika bekerja dengan model dari scikit-learn.