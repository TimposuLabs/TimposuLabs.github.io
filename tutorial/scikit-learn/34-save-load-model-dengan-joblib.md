---
sidebar_position: 35
title: "Saving & Loading Model dengan Joblib"
---

Pada materi sebelumnya kita telah mempelajari cara menyimpan dan memuat model Machine Learning menggunakan `pickle`.

Selain `pickle`, terdapat alternatif lain yang sangat umum digunakan dalam ekosistem Scikit-Learn, yaitu **Joblib**.

Joblib dapat digunakan untuk:

- Menyimpan model yang sudah dilatih.
- Memuat kembali model.
- Menghindari training ulang.
- Membagikan model kepada anggota tim.
- Menggunakan model dalam aplikasi atau deployment.

Workflow-nya sama:

```text
Trained Model
      ↓
    Save
      ↓
  Model File
      ↓
    Load
      ↓
 Loaded Model
      ↓
  Prediction
```

---

## Apa Itu Joblib?

`joblib` adalah library Python yang menyediakan mekanisme untuk menyimpan dan memuat objek Python.

Joblib sangat umum digunakan bersama Scikit-Learn, terutama ketika objek yang disimpan memiliki array NumPy berukuran besar.

Secara sederhana:

```text
Model Scikit-Learn
       │
       ▼
     Joblib
       │
       ▼
  model.joblib
```

Kemudian:

```text
  model.joblib
       │
       ▼
     Joblib
       │
       ▼
  Loaded Model
```

---

## Instalasi Joblib

Jika Joblib belum tersedia, install menggunakan:

```bash
pip install joblib
```

Jika menggunakan environment Conda:

```bash
conda install joblib
```

Biasanya Joblib juga sudah terpasang sebagai dependency dalam environment Scikit-Learn.

---

## Import Joblib

Kita dapat mengimpor fungsi `dump` dan `load`:

```python
from joblib import dump, load
```

Kedua fungsi tersebut digunakan untuk:

| Fungsi | Kegunaan |
|---|---|
| `dump()` | Menyimpan objek |
| `load()` | Memuat objek |

---

## Menyimpan Model dengan Joblib

Misalnya kita telah memiliki model hasil GridSearchCV:

```python
gs_clf
```

Model tersebut dapat disimpan menggunakan:

```python
dump(
    gs_clf,
    filename="gs_random_forest_model_1.joblib"
)
```

Setelah kode tersebut dijalankan, akan dibuat file:

```text
gs_random_forest_model_1.joblib
```

---

## Memahami `dump()`

Fungsi:

```python
dump()
```

digunakan untuk menyimpan objek Python ke dalam file.

Struktur sederhananya:

```python
dump(
    object,
    filename
)
```

Contoh:

```python
dump(
    gs_clf,
    filename="gs_random_forest_model_1.joblib"
)
```

Artinya:

```text
gs_clf
  ↓
dump()
  ↓
gs_random_forest_model_1.joblib
```

---

## Memuat Model dengan Joblib

Setelah model disimpan, kita dapat memuatnya kembali menggunakan:

```python
load()
```

Contoh:

```python
loaded_joblib_model = load(
    filename="gs_random_forest_model_1.joblib"
)
```

Sekarang:

```python
loaded_joblib_model
```

berisi model yang sebelumnya telah disimpan.

---

## Membuat Prediksi

Model yang telah di-load dapat langsung digunakan untuk melakukan prediksi:

```python
joblib_y_preds = loaded_joblib_model.predict(
    X_test
)
```

Tidak diperlukan proses training ulang.

Workflow:

```text
gs_clf
  ↓
dump()
  ↓
model.joblib
  ↓
load()
  ↓
loaded_joblib_model
  ↓
predict()
  ↓
joblib_y_preds
```

---

## Evaluasi Model

Gunakan fungsi evaluasi:

```python
joblib_metrics = evaluate_preds(
    y_test,
    joblib_y_preds
)

joblib_metrics
```

Contoh hasil:

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

## Memverifikasi Model yang Telah Di-load

Kita dapat membandingkan model asli dengan model yang telah dimuat.

Model asli:

```python
gs_y_preds = gs_clf.predict(
    X_test
)

gs_metrics = evaluate_preds(
    y_test,
    gs_y_preds
)
```

Model Joblib:

```python
joblib_y_preds = loaded_joblib_model.predict(
    X_test
)

joblib_metrics = evaluate_preds(
    y_test,
    joblib_y_preds
)
```

Kemudian:

```python
print("Original model:")
print(gs_metrics)

print("Joblib model:")
print(joblib_metrics)
```

Jika environment dan model sama, hasil evaluasi seharusnya sama.

---

## Membandingkan Prediksi

Kita juga dapat memeriksa apakah prediksi model asli dan model yang telah di-load sama:

```python
(gs_y_preds == joblib_y_preds).all()
```

Jika menghasilkan:

```text
True
```

berarti seluruh prediksi pada `X_test` sama.

---

## Pickle vs Joblib

Baik `pickle` maupun `joblib` dapat digunakan untuk menyimpan model Python.

Secara umum:

| Aspek | Pickle | Joblib |
|---|---|---|
| Menyimpan objek Python | Ya | Ya |
| Menyimpan model Scikit-Learn | Ya | Ya |
| `dump()` | `pickle.dump()` | `dump()` |
| `load()` | `pickle.load()` | `load()` |
| File binary | Ya | Ya |
| Dukungan array NumPy besar | Baik | Sangat cocok |
| Sintaks | Sedikit lebih verbose | Lebih sederhana |

---

## Mengapa Joblib Populer untuk Scikit-Learn?

Model Machine Learning sering memiliki struktur internal yang menggunakan array NumPy.

Contohnya:

```text
Scikit-Learn Model
       │
       ├── Parameters
       ├── Model State
       ├── NumPy Arrays
       └── Other Objects
```

Pada model yang memiliki array NumPy berukuran besar, Joblib dapat memberikan mekanisme penyimpanan yang efisien.

Karena itu, Joblib sering digunakan untuk menyimpan model Scikit-Learn.

---

## Perbedaan Sintaks

Dengan `pickle`, kita perlu membuka file secara eksplisit:

```python
import pickle

with open(
    "model.pkl",
    "wb"
) as file:

    pickle.dump(
        model,
        file
    )
```

Untuk membaca:

```python
with open(
    "model.pkl",
    "rb"
) as file:

    model = pickle.load(
        file
    )
```

Dengan Joblib:

```python
from joblib import dump, load

dump(
    model,
    "model.joblib"
)
```

Untuk membaca:

```python
model = load(
    "model.joblib"
)
```

Sintaks Joblib lebih sederhana karena kita tidak perlu secara eksplisit mengatur mode `wb` dan `rb`.

---

## Kapan Menggunakan Joblib?

Joblib merupakan pilihan yang baik ketika:

- Menggunakan Scikit-Learn.
- Model memiliki array NumPy yang besar.
- Membutuhkan mekanisme save/load yang sederhana.
- Model akan digunakan kembali untuk inference.
- Model akan digunakan dalam deployment.

Contohnya:

```text
Scikit-Learn
      ↓
Trained Model
      ↓
   Joblib
      ↓
 model.joblib
      ↓
  Deployment
```

---

## Catatan Keamanan

Sama seperti `pickle`, **jangan melakukan `load()` terhadap file Joblib yang berasal dari sumber yang tidak dipercaya**.

Contoh:

```python
load(
    "unknown_model.joblib"
)
```

tidak boleh dilakukan secara sembarangan.

Gunakan model file yang:

- Dibuat sendiri.
- Berasal dari sumber terpercaya.
- Telah diverifikasi.

Model artifact sebaiknya diperlakukan sebagai file yang dapat menjalankan proses deserialisasi Python.

---

## Catatan Versi Environment

Model yang disimpan menggunakan Joblib sebaiknya digunakan pada environment yang kompatibel.

Perhatikan versi:

```text
Python
Scikit-Learn
NumPy
Joblib
```

Contohnya:

```text
Training Environment
       │
       ├── Python
       ├── Scikit-Learn
       ├── NumPy
       └── Joblib
              │
              ▼
        model.joblib
              │
              ▼
      Production Environment
```

Perbedaan versi library dapat menyebabkan masalah ketika model di-load atau digunakan.

Karena itu, dependency sebaiknya dicatat menggunakan file seperti:

```text
requirements.txt
```

---

## Full Code

Berikut contoh lengkap menyimpan, memuat, membuat prediksi, dan mengevaluasi model menggunakan Joblib.

```python
from joblib import dump, load


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

dump(
    gs_clf,
    filename="gs_random_forest_model_1.joblib"
)


# ==========================================
# 3. Memuat model
# ==========================================

loaded_joblib_model = load(
    filename="gs_random_forest_model_1.joblib"
)


# ==========================================
# 4. Membuat prediksi
# ==========================================

joblib_y_preds = loaded_joblib_model.predict(
    X_test
)


# ==========================================
# 5. Evaluasi model
# ==========================================

joblib_metrics = evaluate_preds(
    y_test,
    joblib_y_preds
)

print("Loaded Joblib model:")
print(joblib_metrics)


# ==========================================
# 6. Membandingkan prediksi
# ==========================================

print(
    "Predictions are the same:",
    (gs_y_preds == joblib_y_preds).all()
)


# ==========================================
# 7. Membandingkan metrics
# ==========================================

print(
    "Original metrics:",
    gs_metrics
)

print(
    "Joblib metrics:",
    joblib_metrics
)
```

---

## Struktur File

Setelah menjalankan kode:

```text
project/
├── notebook.ipynb
├── data/
│   └── ...
└── gs_random_forest_model_1.joblib
```

File:

```text
gs_random_forest_model_1.joblib
```

merupakan model Machine Learning yang telah disimpan.

File tersebut dapat digunakan kembali selama environment dan dependency yang dibutuhkan kompatibel.

---

## Pickle atau Joblib?

Tidak ada aturan mutlak bahwa Joblib selalu lebih baik daripada Pickle.

Keduanya dapat digunakan untuk menyimpan model.

Secara praktis:

```text
Model Scikit-Learn
       │
       ├── Pickle
       │
       └── Joblib
```

Joblib sering menjadi pilihan praktis untuk model Scikit-Learn yang memiliki array NumPy besar.

Sedangkan Pickle merupakan mekanisme serialisasi Python yang lebih umum.

Yang paling penting adalah:

- Model dapat disimpan dengan benar.
- Model dapat di-load kembali.
- Prediksi dapat direproduksi.
- Environment kompatibel.
- File berasal dari sumber yang dipercaya.

---

## Workflow Model Persistence

Setelah mempelajari Pickle dan Joblib, workflow model persistence menjadi:

```text
Dataset
   ↓
Training
   ↓
Evaluation
   ↓
Hyperparameter Tuning
   ↓
Best Model
   ↓
Save Model
   │
   ├── Pickle
   │
   └── Joblib
          ↓
      Model File
          ↓
      Load Model
          ↓
       Predict
          ↓
      Application
```

---

## Checklist

Sebelum menggunakan model hasil Joblib, pastikan:

- [ ] Model sudah dilatih.
- [ ] Model sudah dievaluasi.
- [ ] Model sudah dipilih.
- [ ] Model berhasil disimpan menggunakan `dump()`.
- [ ] File `.joblib` berhasil dibuat.
- [ ] Model berhasil di-load menggunakan `load()`.
- [ ] Prediksi model sudah diverifikasi.
- [ ] Metric model sesuai dengan model asli.
- [ ] Environment kompatibel.
- [ ] File model berasal dari sumber yang dipercaya.

---

## Kesimpulan

Joblib merupakan salah satu metode yang praktis untuk menyimpan dan memuat model Machine Learning, terutama model yang dibuat menggunakan Scikit-Learn.

Untuk menyimpan:

```python
dump(
    model,
    "model.joblib"
)
```

Untuk memuat:

```python
model = load(
    "model.joblib"
)
```

Setelah model di-load, model dapat langsung digunakan:

```python
predictions = model.predict(
    X_test
)
```

Keuntungan utama model persistence adalah kita tidak perlu melakukan training ulang setiap kali model akan digunakan.

Secara umum:

```text
Train
  ↓
Evaluate
  ↓
Tune
  ↓
Best Model
  ↓
Save
  ↓
Load
  ↓
Predict
  ↓
Deploy
```

Dengan demikian, proses menyimpan dan memuat model merupakan bagian penting dari workflow Machine Learning sebelum model digunakan dalam aplikasi nyata.

## Referensi

* https://joblib.readthedocs.io/en/stable/
* https://scikit-learn.org/stable/model_persistence.html