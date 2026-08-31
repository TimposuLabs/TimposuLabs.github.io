---
sidebar_position: 14
title: "Model Persistence"
---

Setelah model Machine Learning berhasil dilatih dan memiliki performa yang baik, model tersebut tidak harus selalu dilatih ulang setiap kali program dijalankan.

Kita dapat **menyimpan model yang sudah dilatih** ke dalam sebuah file, kemudian memuatnya kembali ketika dibutuhkan.

Proses ini sangat penting dalam penerapan Machine Learning karena model yang sudah dilatih dapat digunakan kembali oleh aplikasi tanpa harus melakukan proses training dari awal.

Secara sederhana:

```text
Dataset
   ↓
Training
   ↓
 Model
   ↓
Evaluasi
   ↓
Model Siap Digunakan
   ↓
Simpan ke File
```

Kemudian pada waktu lain:

```text
File Model
   ↓
Load
   ↓
Model Terlatih
   ↓
Data Baru
   ↓
Prediction
```

---

## Mengapa Model Perlu Disimpan?

Proses training Machine Learning dapat membutuhkan waktu dan sumber daya yang cukup besar, terutama ketika dataset berukuran besar atau algoritma yang digunakan cukup kompleks.

Bayangkan sebuah model membutuhkan waktu beberapa menit atau bahkan beberapa jam untuk dilatih.

Jika aplikasi harus melakukan training ulang setiap kali dijalankan, hal tersebut tentu tidak efisien.

Dengan menyimpan model:

```text
Training dilakukan satu kali
          ↓
     Model disimpan
          ↓
Model dapat digunakan berkali-kali
```

Keuntungan utamanya adalah:

- Tidak perlu melakukan training ulang setiap kali aplikasi dijalankan.
- Menghemat waktu dan sumber daya komputasi.
- Model dapat digunakan oleh aplikasi lain.
- Memudahkan proses deployment Machine Learning.
- Memisahkan proses **training** dan **prediction**.

---

## Apa itu `joblib`?

`joblib` adalah library Python yang dapat digunakan untuk menyimpan (*serialize*) dan memuat kembali objek Python.

Dalam Machine Learning, `joblib` sering digunakan untuk menyimpan model yang telah dilatih menggunakan `scikit-learn`.

Pada materi atau tutorial lama mungkin ditemukan kode:

```python
from sklearn.externals import joblib
```

Cara tersebut **sudah tidak digunakan pada versi `scikit-learn` modern**.

Gunakan `joblib` sebagai package terpisah:

```python
from joblib import dump, load
```

Dengan demikian, `joblib` perlu tersedia di environment Python yang digunakan.

Jika belum terinstal, jalankan:

```bash
pip install joblib
```

Jika menggunakan virtual environment, pastikan environment tersebut sudah aktif sebelum melakukan instalasi.

---

## Menyimpan Model dengan `dump()`

Setelah model selesai dilatih, kita dapat menggunakan fungsi:

```python
dump()
```

untuk menyimpan model ke dalam file.

Contohnya:

```python
from joblib import dump

dump(knn, 'knn_model.joblib')
```

Kode tersebut menyimpan model `knn` ke dalam file:

```text
knn_model.joblib
```

File tersebut berisi representasi model yang telah dilatih sehingga dapat digunakan kembali.

---

## Contoh Training dan Penyimpanan Model

Misalnya kita menggunakan Iris Dataset dan algoritma KNN:

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from joblib import dump

# Load dataset
iris = load_iris()

X = iris.data
y = iris.target

# Membagi dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Membuat model
knn = KNeighborsClassifier(n_neighbors=3)

# Training model
knn.fit(X_train, y_train)

# Menyimpan model
dump(knn, 'knn_model.joblib')

print("Model berhasil disimpan.")
```

Setelah program dijalankan, akan terdapat file:

```text
knn_model.joblib
```

Struktur proyek dapat menjadi:

```text
project/
│
├── knn_model.joblib
└── train.py
```

---

## Memuat Model dengan `load()`

Setelah model disimpan, kita dapat memuatnya kembali menggunakan:

```python
from joblib import load

knn = load('knn_model.joblib')
```

Model yang dimuat akan kembali menjadi objek model KNN yang sudah dilatih.

Kita dapat langsung menggunakannya untuk melakukan prediksi tanpa melakukan training ulang.

---

## Menggunakan Model yang Telah Disimpan

Contoh:

```python
from joblib import load

# Memuat model
knn = load('knn_model.joblib')

# Data baru
sample = [
    [3, 5, 4, 2],
    [2, 3, 5, 4]
]

# Melakukan prediksi
predictions = knn.predict(sample)

print(predictions)
```

Model dapat langsung digunakan meskipun proses training tidak dilakukan kembali pada program tersebut.

---

## Mengubah Label Menjadi Nama Spesies

Hasil prediksi dari model Iris berupa angka:

```text
0
1
2
```

Kita dapat mengubahnya menjadi nama spesies menggunakan `target_names`.

```python
from joblib import load
from sklearn.datasets import load_iris

# Load dataset untuk mendapatkan target_names
iris = load_iris()

# Load model
knn = load('knn_model.joblib')

# Data baru
sample = [
    [3, 5, 4, 2],
    [2, 3, 5, 4]
]

# Prediksi
predictions = knn.predict(sample)

# Mengubah label menjadi nama spesies
predicted_species = [
    iris.target_names[p]
    for p in predictions
]

print("Hasil Prediksi:", predicted_species)
```

Contoh output:

```text
Hasil Prediksi: ['versicolor', 'virginica']
```

---

## Memisahkan Training dan Prediction

Dalam aplikasi Machine Learning yang lebih nyata, proses training dan prediction biasanya dipisahkan.

### Program Training

Program training bertanggung jawab untuk:

```text
Dataset
   ↓
Preprocessing
   ↓
Training
   ↓
Evaluasi
   ↓
Simpan Model
```

Contohnya:

```python
from joblib import dump

# training model
knn.fit(X_train, y_train)

# simpan model
dump(knn, 'knn_model.joblib')
```

Program ini tidak perlu dijalankan setiap kali pengguna ingin melakukan prediksi.

---

### Program Prediction

Program prediction hanya perlu:

```text
Load Model
    ↓
Data Baru
    ↓
Prediction
    ↓
 Hasil
```

Contohnya:

```python
from joblib import load

# Load model
knn = load('knn_model.joblib')

# Data baru
sample = [
    [3, 5, 4, 2]
]

# Prediction
prediction = knn.predict(sample)

print(prediction)
```

Dengan pendekatan ini, aplikasi tidak perlu melakukan training ulang.

---

## `dump()` dan `load()`

Dua fungsi utama yang digunakan dari `joblib` adalah:

| Fungsi | Kegunaan |
| --- | --- |
| `dump()` | Menyimpan objek/model ke file |
| `load()` | Memuat objek/model dari file |

Pola penggunaannya:

```python
from joblib import dump, load
```

Menyimpan:

```python
dump(model, 'model.joblib')
```

Memuat:

```python
model = load('model.joblib')
```

Cara mudah mengingatnya:

```text
dump()
→ menyimpan

load()
→ memuat
```

---

## Format File Model

File model dapat menggunakan ekstensi:

```text
.joblib
```

Contohnya:

```text
knn_model.joblib
```

Nama file sebenarnya bebas, tetapi penggunaan ekstensi `.joblib` membuat isi file lebih mudah dikenali sebagai file model yang disimpan menggunakan `joblib`.

---

## Catatan tentang Versi Tutorial Lama

Jika Anda mengikuti tutorial Machine Learning lama, Anda mungkin menemukan:

```python
from sklearn.externals import joblib
```

Kode tersebut berasal dari pendekatan lama dan **tidak perlu digunakan pada lingkungan `scikit-learn` modern**.

Gunakan:

```python
from joblib import dump, load
```

Jika hanya membutuhkan salah satu fungsi, Anda juga dapat mengimpornya secara spesifik:

```python
from joblib import dump
```

atau:

```python
from joblib import load
```

---

## Hal yang Perlu Diperhatikan

File model tidak selalu dapat dipindahkan secara bebas antar lingkungan Python.

Kompatibilitas dapat dipengaruhi oleh:

- Versi Python.
- Versi `scikit-learn`.
- Versi `joblib`.
- Library lain yang digunakan oleh model.
- Struktur atau kode yang digunakan saat model dibuat.

Karena itu, ketika model digunakan dalam deployment, sebaiknya environment dan dependency proyek dikelola dengan baik, misalnya menggunakan virtual environment dan `requirements.txt`.

Contoh:

```text
project/
│
├── model/
│   └── knn_model.joblib
│
├── app.py
├── requirements.txt
└── .venv/
```

Folder `.venv` tidak perlu disertakan ke repository. Dependency proyek cukup dicatat dalam `requirements.txt`.

---

## Keamanan `load()`

File yang dibuat menggunakan mekanisme serialisasi seperti `joblib` **tidak boleh dianggap sebagai file data biasa yang aman untuk dibuka dari sumber yang tidak dipercaya**.

Hindari melakukan:

```python
load('unknown_model.joblib')
```

jika file berasal dari sumber yang tidak Anda percaya.

Gunakan file model yang berasal dari sumber terpercaya dan Anda ketahui bagaimana file tersebut dibuat.

---

## Workflow Machine Learning hingga Deployment

Dengan adanya penyimpanan model, workflow Machine Learning menjadi lebih lengkap:

```text
1. Import Data
       ↓
2. Clean Data
       ↓
3. Split Data
       ↓
4. Train Model
       ↓
5. Evaluate Model
       ↓
6. Improve Model
       ↓
7. Save Model
       ↓
8. Deploy Application
       ↓
9. Load Model
       ↓
10. Predict Data Baru
```

Tahap **Save Model** menjadi jembatan antara proses pengembangan model dengan proses penggunaan model di aplikasi.

---

## Ringkasan

Pada materi ini kita mempelajari cara menyimpan dan memuat model Machine Learning menggunakan `joblib`.

Poin penting:

- Model yang sudah dilatih dapat disimpan ke dalam file.
- `joblib` dapat digunakan untuk melakukan serialisasi model Python.
- Gunakan `dump()` untuk menyimpan model.
- Gunakan `load()` untuk memuat model.
- Pada versi modern, gunakan:

```python
from joblib import dump, load
```

- Jangan lagi menggunakan pendekatan lama:

```python
from sklearn.externals import joblib
```

- Model yang telah disimpan dapat digunakan kembali tanpa melakukan training ulang.
- Pemisahan training dan prediction membuat aplikasi Machine Learning lebih efisien.
- Pastikan dependency dan versi environment dikelola dengan baik ketika model digunakan untuk deployment.

---

## Kesimpulan

Training model adalah proses untuk membuat model belajar dari data, sedangkan penyimpanan model memungkinkan hasil pembelajaran tersebut digunakan kembali.

Dengan `joblib`, prosesnya menjadi sederhana:

```python
from joblib import dump, load
```

Simpan model:

```python
dump(model, 'model.joblib')
```

Kemudian pada aplikasi lain:

```python
model = load('model.joblib')
```

Setelah model dimuat, model dapat langsung digunakan:

```python
prediction = model.predict(data_baru)
```

Dengan demikian, aplikasi tidak perlu melatih model dari awal setiap kali dijalankan.