---
sidebar_position: 34
title: "Saving & Loading Model dengan Pickle"
---

Setelah melakukan:

```text
Data Preparation
      ↓
Model Training
      ↓
Model Evaluation
      ↓
Hyperparameter Tuning
      ↓
Best Model
```

kita biasanya tidak ingin melakukan proses training dari awal setiap kali model akan digunakan.

Solusinya adalah **menyimpan model yang sudah dilatih** ke dalam sebuah file.

Model yang telah disimpan kemudian dapat dimuat kembali dan digunakan untuk melakukan prediksi.

---

## Mengapa Model Perlu Disimpan?

Menyimpan model Machine Learning memiliki beberapa manfaat.

### 1. Tidak Perlu Training Ulang

Model yang sudah dilatih dapat digunakan kembali tanpa melakukan training dari awal.

### 2. Digunakan dalam Aplikasi

Model dapat diintegrasikan ke dalam:

- Web application
- REST API
- Mobile application
- Dashboard
- Sistem backend

### 3. Membagikan Model

Model yang sudah dilatih dapat dibagikan kepada anggota tim atau dipindahkan ke server.

### 4. Deployment

Model yang sudah disimpan dapat digunakan pada environment production untuk melakukan prediksi terhadap data baru.

---

## Pickle

Python menyediakan module `pickle` untuk melakukan **serialisasi objek Python**.

Serialisasi adalah proses mengubah objek Python menjadi format yang dapat disimpan ke dalam file.

Secara sederhana:

```text
Python Object
     │
     ▼
 Serialization
     │
     ▼
   File
```

Kemudian ketika ingin menggunakannya kembali:

```text
   File
     │
     ▼
 Deserialization
     │
     ▼
Python Object
```

Untuk model Machine Learning:

```text
Trained Model
      │
      ▼
    pickle
      │
      ▼
  model.pkl
```

Kemudian:

```text
model.pkl
    │
    ▼
  pickle
    │
    ▼
Loaded Model
    │
    ▼
 predict()
```

---

## Menyimpan Model dengan Pickle

Import module:

```python
import pickle
```

Misalnya kita telah memiliki model hasil GridSearchCV:

```python
gs_clf
```

Model tersebut dapat disimpan menggunakan:

```python
pickle.dump(
    gs_clf,
    open("gs_random_forest_model_1.pkl", "wb")
)
```

---

## Memahami `pickle.dump()`

Fungsi:

```python
pickle.dump()
```

digunakan untuk menyimpan objek Python ke file.

Strukturnya:

```python
pickle.dump(
    object,
    file
)
```

Pada contoh:

```python
pickle.dump(
    gs_clf,
    open("gs_random_forest_model_1.pkl", "wb")
)
```

berarti:

```text
gs_clf
  ↓
pickle.dump()
  ↓
gs_random_forest_model_1.pkl
```

---

## Mode `wb`

Perhatikan bagian:

```python
"wb"
```

`wb` berarti:

```text
w = write
b = binary
```

Jadi:

```text
wb = write binary
```

Karena `pickle` menyimpan objek dalam format binary, file dibuka menggunakan mode `wb`.

---

## Memuat Model dengan Pickle

Setelah model tersimpan, kita dapat memuatnya kembali menggunakan:

```python
pickle.load()
```

Contoh:

```python
loaded_pickle_model = pickle.load(
    open(
        "gs_random_forest_model_1.pkl",
        "rb"
    )
)
```

Sekarang:

```python
loaded_pickle_model
```

berisi model yang sebelumnya telah disimpan.

---

## Mode `rb`

Perhatikan:

```python
"rb"
```

Artinya:

```text
r = read
b = binary
```

Sehingga:

```text
rb = read binary
```

Digunakan ketika membaca file binary yang telah disimpan menggunakan `pickle`.

---

## Membuat Prediksi dengan Model yang Telah Di-load

Setelah model berhasil dimuat:

```python
loaded_pickle_model
```

kita dapat menggunakannya seperti model biasa.

Contoh:

```python
pickle_y_preds = loaded_pickle_model.predict(
    X_test
)
```

Model yang telah di-load dapat langsung digunakan untuk melakukan prediksi.

---

## Evaluasi Model yang Telah Di-load

Gunakan fungsi evaluasi yang telah dibuat sebelumnya:

```python
pickle_metrics = evaluate_preds(
    y_test,
    pickle_y_preds
)

pickle_metrics
```

Hasilnya dapat berupa:

```python
{
    "accuracy": 0.84,
    "precision": 0.85,
    "recall": 0.82,
    "f1": 0.83
}
```

Nilai tersebut hanya contoh.

---

## Memverifikasi Model

Salah satu cara untuk memastikan proses penyimpanan dan pemuatan berhasil adalah membandingkan hasil prediksi atau metric model sebelum dan sesudah disimpan.

Misalnya sebelum disimpan:

```python
gs_y_preds = gs_clf.predict(
    X_test
)

gs_metrics = evaluate_preds(
    y_test,
    gs_y_preds
)
```

Setelah di-load:

```python
pickle_y_preds = loaded_pickle_model.predict(
    X_test
)

pickle_metrics = evaluate_preds(
    y_test,
    pickle_y_preds
)
```

Bandingkan:

```python
print(gs_metrics)
print(pickle_metrics)
```

Jika model dan environment yang digunakan konsisten, hasil prediksi dan metric seharusnya sama.

---

## Membandingkan Prediksi Secara Langsung

Kita juga dapat membandingkan prediksi sebelum dan sesudah model disimpan:

```python
gs_y_preds == pickle_y_preds
```

Untuk memeriksa apakah seluruh prediksi sama:

```python
(gs_y_preds == pickle_y_preds).all()
```

Jika menghasilkan:

```text
True
```

berarti prediksi keduanya sama pada data tersebut.

---

## Membandingkan Metric

Kita juga dapat membuat perbandingan:

```python
compare_metrics = {
    "original_model": gs_metrics,
    "loaded_pickle_model": pickle_metrics
}

compare_metrics
```

Jika hasilnya sama:

```text
Original Model
      │
      ├── Accuracy
      ├── Precision
      ├── Recall
      └── F1

          =

Loaded Pickle Model
      │
      ├── Accuracy
      ├── Precision
      ├── Recall
      └── F1
```

maka proses save dan load berhasil.

---

## Praktik yang Lebih Baik Saat Membuka File

Daripada menggunakan:

```python
pickle.dump(
    gs_clf,
    open("model.pkl", "wb")
)
```

lebih baik menggunakan `with open()`:

```python
with open(
    "gs_random_forest_model_1.pkl",
    "wb"
) as file:

    pickle.dump(
        gs_clf,
        file
    )
```

Kemudian untuk membaca:

```python
with open(
    "gs_random_forest_model_1.pkl",
    "rb"
) as file:

    loaded_pickle_model = pickle.load(
        file
    )
```

Pendekatan ini lebih baik karena file akan ditutup secara otomatis setelah selesai digunakan.

---

## Full Code

Berikut contoh lengkap menyimpan, memuat, dan mengevaluasi model.

```python
import pickle


# ==========================================
# 1. Membuat prediksi dengan model asli
# ==========================================

gs_y_preds = gs_clf.predict(
    X_test
)

gs_metrics = evaluate_preds(
    y_test,
    gs_y_preds
)

print("Original model:")
print(gs_metrics)


# ==========================================
# 2. Menyimpan model
# ==========================================

with open(
    "gs_random_forest_model_1.pkl",
    "wb"
) as file:

    pickle.dump(
        gs_clf,
        file
    )


# ==========================================
# 3. Memuat model
# ==========================================

with open(
    "gs_random_forest_model_1.pkl",
    "rb"
) as file:

    loaded_pickle_model = pickle.load(
        file
    )


# ==========================================
# 4. Membuat prediksi
# ==========================================

pickle_y_preds = loaded_pickle_model.predict(
    X_test
)


# ==========================================
# 5. Evaluasi model yang telah di-load
# ==========================================

pickle_metrics = evaluate_preds(
    y_test,
    pickle_y_preds
)

print("Loaded Pickle model:")
print(pickle_metrics)


# ==========================================
# 6. Membandingkan prediksi
# ==========================================

print(
    "Predictions are the same:",
    (gs_y_preds == pickle_y_preds).all()
)


# ==========================================
# 7. Membandingkan metrics
# ==========================================

print(
    "Original metrics:",
    gs_metrics
)

print(
    "Pickle metrics:",
    pickle_metrics
)
```

---

## Struktur File

Setelah menjalankan proses tersebut, kita akan memiliki file:

```text
project/
├── notebook.ipynb
├── data/
│   └── ...
└── gs_random_forest_model_1.pkl
```

File:

```text
gs_random_forest_model_1.pkl
```

berisi model yang telah disimpan.

File tersebut kemudian dapat dipindahkan ke environment lain yang kompatibel untuk digunakan kembali.

---

## Apa yang Sebenarnya Disimpan?

Ketika kita melakukan:

```python
pickle.dump(
    gs_clf,
    file
)
```

yang disimpan bukan hanya angka hasil prediksi.

Pickle menyimpan representasi objek Python sehingga objek model dapat direkonstruksi kembali ketika di-load.

Setelah di-load:

```python
loaded_pickle_model
```

kita dapat menggunakan:

```python
loaded_pickle_model.predict(...)
```

tanpa melakukan training ulang.

---

## Pickle Bukan Dataset

Perlu dibedakan antara:

```text
Dataset
```

dan:

```text
Trained Model
```

Dataset digunakan untuk melatih model:

```text
Dataset
   ↓
Training
   ↓
Trained Model
```

Sedangkan model yang sudah dilatih dapat disimpan:

```text
Trained Model
   ↓
Pickle
   ↓
model.pkl
```

Kemudian:

```text
model.pkl
   ↓
 Load
   ↓
Trained Model
   ↓
Prediction
```

---

## Kapan Pickle Berguna?

Pickle dapat digunakan ketika:

- Model sudah selesai dilatih.
- Model ingin digunakan kembali.
- Model ingin dipindahkan ke aplikasi.
- Model ingin digunakan untuk deployment.
- Kita ingin menghindari training ulang.
- Model perlu disimpan untuk eksperimen atau prototyping.

---

## Catatan Keamanan

Ada satu hal penting ketika menggunakan `pickle`.

**Jangan melakukan `pickle.load()` terhadap file yang berasal dari sumber yang tidak dipercaya.**

Pickle dapat melakukan proses deserialisasi objek Python dan file berbahaya berpotensi menjalankan kode ketika di-load.

Contoh:

```python
pickle.load(
    untrusted_file
)
```

sebaiknya dihindari.

Gunakan hanya file model yang:

- Dibuat sendiri.
- Berasal dari sumber yang dipercaya.
- Telah diverifikasi integritas dan asalnya.

Dalam konteks deployment, model artifact juga sebaiknya dikelola seperti file executable atau dependency aplikasi lainnya.

---

## Catatan Environment

Model yang disimpan menggunakan `pickle` sebaiknya digunakan pada environment yang kompatibel dengan environment saat model dibuat.

Perhatikan:

- Versi Python.
- Versi Scikit-Learn.
- Versi NumPy.
- Dependency model lainnya.

Contohnya:

```text
Training Environment
Python 3.x
Scikit-Learn x.x
NumPy x.x
      │
      ▼
     Model
      │
      ▼
     .pkl
      │
      ▼
Production Environment
```

Perbedaan versi library dapat menyebabkan masalah ketika model di-load atau digunakan.

Untuk deployment yang serius, dependency environment sebaiknya dicatat, misalnya menggunakan:

```text
requirements.txt
```

---

## Ringkasan

`pickle` memungkinkan kita menyimpan model Machine Learning yang telah dilatih ke dalam file.

Prosesnya:

```text
Trained Model
      ↓
pickle.dump()
      ↓
  model.pkl
      ↓
pickle.load()
      ↓
 Loaded Model
      ↓
  predict()
```

Untuk menyimpan:

```python
with open("model.pkl", "wb") as file:
    pickle.dump(model, file)
```

Untuk memuat:

```python
with open("model.pkl", "rb") as file:
    model = pickle.load(file)
```

Keuntungan utamanya adalah kita dapat menggunakan model kembali tanpa melakukan training dari awal.

---

## Checklist

Sebelum menggunakan model hasil `pickle`, pastikan:

- [ ] Model sudah dilatih.
- [ ] Model sudah dievaluasi.
- [ ] Model sudah dipilih sebagai model yang akan digunakan.
- [ ] Model disimpan menggunakan `pickle.dump()`.
- [ ] File model berhasil dibuat.
- [ ] Model dapat di-load menggunakan `pickle.load()`.
- [ ] Prediksi model yang di-load sudah diverifikasi.
- [ ] Environment dan dependency kompatibel.
- [ ] File `.pkl` berasal dari sumber yang dipercaya.

## Referensi

* https://docs.python.org/3/library/pickle.html
* https://scikit-learn.org/stable/model_persistence.html
