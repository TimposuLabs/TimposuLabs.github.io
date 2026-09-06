---
sidebar_position: 8
title: "Modelling: Model Comparison"
---

Setelah memilih model, melakukan training, dan melakukan tuning, langkah berikutnya adalah **Model Comparison** atau perbandingan model.

Model Comparison adalah proses membandingkan beberapa model Machine Learning berdasarkan kriteria yang telah ditentukan untuk menemukan model yang paling sesuai dengan kebutuhan.

Contohnya kita memiliki tiga model:

```text
Logistic Regression
Random Forest
Gradient Boosting
```

Ketiganya dilatih menggunakan dataset yang sama, kemudian dibandingkan berdasarkan:

```text
Performance
Training Time
Inference Time
Model Size
Complexity
```

Tujuan akhirnya bukan sekadar mencari model dengan score tertinggi.

Kita ingin menemukan model yang memberikan **trade-off terbaik antara performa dan kebutuhan sistem nyata**.

---

## Mengapa Model Comparison Penting?

Tidak ada satu algoritma Machine Learning yang selalu menjadi model terbaik untuk semua masalah.

Misalnya:

| Model | Accuracy |
|---|---:|
| Logistic Regression | 85% |
| Random Forest | 89% |
| Gradient Boosting | 91% |

Sekilas Gradient Boosting terlihat sebagai pilihan terbaik.

Namun bagaimana jika:

```text
Logistic Regression
Accuracy     = 85%
Inference    = 1 ms
Model Size  = 1 MB

Random Forest
Accuracy     = 89%
Inference    = 20 ms
Model Size  = 50 MB

Gradient Boosting
Accuracy     = 91%
Inference    = 500 ms
Model Size  = 200 MB
```

Jika model akan digunakan pada sistem real-time dengan resource terbatas, Gradient Boosting belum tentu menjadi pilihan terbaik.

Karena itu, model comparison harus melihat **lebih dari satu aspek**.

---

## Kapan Model Comparison Dilakukan?

Model comparison biasanya dilakukan setelah beberapa kandidat model telah:

```text
Dipilih
   ↓
Dil­atih
   ↓
Dievaluasi
   ↓
Dituning
   ↓
Dibandingkan
```

Secara sederhana:

```text
Candidate Models
      ↓
Training
      ↓
Validation / Cross-Validation
      ↓
Hyperparameter Tuning
      ↓
Model Selection
      ↓
Test Set
      ↓
Final Comparison
      ↓
Best Model
```

Model yang dibandingkan sebaiknya sudah melalui proses pengembangan yang konsisten.

---

## Test Set sebagai Evaluasi Akhir

Test Set digunakan untuk mengukur performa model pada data yang tidak digunakan untuk melatih parameter model dan tidak digunakan untuk memilih hyperparameter.

Contohnya:

```text
Dataset
   │
   ├── Training
   │
   ├── Validation / Cross-Validation
   │
   └── Test
```

Training digunakan untuk belajar.

Validation atau Cross-Validation digunakan untuk:

- memilih model
- tuning hyperparameter
- membandingkan kandidat selama pengembangan

Test digunakan untuk:

- evaluasi final
- mengukur generalisasi
- memberikan estimasi performa pada data yang benar-benar belum digunakan selama pengembangan

---

## Unseen Data

Salah satu tujuan utama Test Set adalah memberikan gambaran bagaimana model bekerja pada **unseen data**.

Unseen data berarti data yang tidak digunakan dalam proses training model.

Misalnya model mempelajari:

```text
Data Training
├── Rumah A
├── Rumah B
├── Rumah C
└── Rumah D
```

Kemudian diberikan data:

```text
Rumah E
```

Model harus menghasilkan prediksi berdasarkan pola yang telah dipelajari, bukan karena menghafal data tersebut.

Kemampuan seperti ini disebut **generalization**.

---

## Generalization

Generalization adalah kemampuan model untuk memberikan prediksi yang baik pada data baru yang memiliki karakteristik serupa dengan data yang digunakan saat pengembangan.

Contohnya:

```text
Training Performance
      ↓
     95%

Test Performance
      ↓
     93%
```

Perbedaan tersebut masih mungkin masuk akal tergantung masalah dan dataset.

Namun jika:

```text
Training Performance
      ↓
     99%

Test Performance
      ↓
     65%
```

kita perlu mencurigai adanya overfitting atau masalah lain pada workflow.

---

## Metrik Evaluasi

Model harus dibandingkan menggunakan metric yang sesuai dengan problem.

Untuk classification, beberapa metric yang umum:

- Accuracy
- Precision
- Recall
- F1 Score
- ROC-AUC
- PR-AUC

Untuk regression:

- MAE
- MSE
- RMSE
- R²

Tidak semua masalah cocok menggunakan Accuracy.

---

## Accuracy

Accuracy mengukur proporsi prediksi yang benar terhadap seluruh prediksi.

Secara sederhana:

```text
Accuracy =
Jumlah prediksi benar
---------------------
Jumlah seluruh prediksi
```

Contoh:

```text
100 prediksi
90 benar
```

Maka:

```text
Accuracy = 90%
```

Accuracy dapat digunakan ketika distribusi kelas relatif seimbang dan biaya kesalahan antar-kelas tidak terlalu berbeda.

---

## Precision

Precision menjawab pertanyaan:

> Dari semua data yang diprediksi sebagai positif, berapa banyak yang benar-benar positif?

Secara sederhana:

```text
Precision =
True Positive
--------------------------
True Positive + False Positive
```

Precision penting ketika **False Positive** relatif mahal.

---

## Recall

Recall menjawab pertanyaan:

> Dari semua kasus positif yang sebenarnya ada, berapa banyak yang berhasil ditemukan model?

Secara sederhana:

```text
Recall =
True Positive
-------------------------
True Positive + False Negative
```

Recall penting ketika **False Negative** relatif mahal.

---

## F1 Score

F1 Score merupakan kombinasi antara Precision dan Recall.

```text
F1 =
2 × Precision × Recall
----------------------
Precision + Recall
```

F1 Score sering digunakan ketika kita ingin mempertimbangkan Precision dan Recall secara bersamaan.

---

## Metric untuk Regression

Pada regression, metric yang digunakan berbeda.

Contohnya:

```text
MAE
MSE
RMSE
R²
```

Misalnya kita ingin memprediksi harga rumah.

```text
Actual:
500 juta

Prediction:
450 juta
```

Error:

```text
50 juta
```

MAE dapat membantu kita memahami rata-rata besar kesalahan prediksi dalam satuan target.

---

## Model Comparison Tidak Hanya Tentang Metric

Misalnya:

| Model | Accuracy |
|---|---:|
| Model A | 90% |
| Model B | 92% |

Model B memang memiliki score lebih tinggi.

Tetapi kita juga perlu mempertimbangkan:

```text
Berapa lama training?
Berapa lama inference?
Berapa besar model?
Berapa banyak RAM?
Apakah model mudah di-deploy?
Apakah model mudah di-maintain?
```

Karena itu model comparison harus melihat keseluruhan kebutuhan sistem.

---

## Training Time

**Training Time** adalah waktu yang diperlukan untuk melatih model.

Misalnya:

| Model | Training Time |
|---|---:|
| Logistic Regression | 0.5 detik |
| Random Forest | 4 detik |
| Gradient Boosting | 20 detik |

Training time menjadi penting ketika:

- model sering dilatih ulang
- dataset sangat besar
- model digunakan dalam pipeline otomatis
- model membutuhkan retraining berkala
- resource komputasi terbatas

---

## Inference Time

**Inference Time** adalah waktu yang dibutuhkan model untuk menghasilkan prediksi setelah model selesai dilatih.

Misalnya:

```text
Input
  ↓
Model
  ↓
Prediction
```

Jika membutuhkan:

```text
1 ms
```

maka model relatif cepat.

Jika membutuhkan:

```text
2 detik
```

maka perlu dipertimbangkan apakah waktu tersebut masih dapat diterima oleh aplikasi.

Inference time sangat penting untuk aplikasi:

- real-time prediction
- API
- recommendation system
- fraud detection
- IoT
- mobile application
- edge device

---

## Training Time vs Inference Time

Keduanya tidak sama.

```text
Training Time
     ↓
Berapa lama model belajar?

Inference Time
     ↓
Berapa lama model memberikan prediksi?
```

Contohnya:

```text
Model A
Training  = 10 menit
Inference = 1 ms

Model B
Training  = 2 jam
Inference = 1 ms
```

Jika model hanya dilatih seminggu sekali, training time mungkin tidak terlalu penting.

Tetapi jika model harus dilatih setiap jam, training time menjadi sangat penting.

---

## Model Size

Ukuran model juga dapat menjadi faktor penting.

Misalnya:

```text
Model A → 2 MB
Model B → 100 MB
Model C → 2 GB
```

Model berukuran besar dapat membutuhkan:

- lebih banyak storage
- lebih banyak memory
- waktu loading lebih lama
- resource deployment lebih besar

Hal ini sangat penting jika model akan digunakan pada:

- smartphone
- Raspberry Pi
- IoT device
- edge device
- server dengan resource terbatas

---

## Model Complexity

Kompleksitas model juga perlu diperhatikan.

Model sederhana:

```text
Logistic Regression
```

biasanya lebih mudah:

- dipahami
- di-debug
- di-deploy
- di-maintain

Sedangkan model yang lebih kompleks dapat memberikan performa lebih tinggi tetapi membutuhkan pengelolaan yang lebih kompleks.

Karena itu:

> Jangan memilih model kompleks hanya karena model tersebut lebih canggih.

---

## Model Comparison sebagai Trade-Off

Model comparison sebenarnya merupakan proses mencari trade-off.

Misalnya:

```text
              Performance
                   ↑
                   │
                   │      Model C
                   │
                   │   Model B
                   │
                   │ Model A
                   └────────────────→
                     Cost / Complexity
```

Model C mungkin memiliki performa paling tinggi.

Namun Model A mungkin jauh lebih murah dan cepat.

Pilihan akhirnya bergantung pada kebutuhan sistem.

---

## Contoh Skenario

Bayangkan kita membangun sistem untuk memprediksi apakah pelanggan akan membeli produk.

Kita memiliki tiga model:

```text
Logistic Regression
Random Forest
Gradient Boosting
```

Hasil eksperimen:

| Model | Accuracy | Training | Inference | Size |
|---|---:|---:|---:|---:|
| Logistic Regression | 84% | 0.2 s | 0.1 ms | 1 MB |
| Random Forest | 89% | 3 s | 2 ms | 15 MB |
| Gradient Boosting | 91% | 15 s | 5 ms | 8 MB |

Jika sistem tidak membutuhkan latency yang sangat rendah, Gradient Boosting dapat menjadi pilihan.

Namun jika sistem harus melakukan jutaan prediksi per detik, model yang lebih sederhana dan cepat mungkin lebih sesuai.

---

## Membandingkan Model dengan Python

Kita dapat membuat beberapa model:

```python
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import GradientBoostingClassifier

models = {
    "Logistic Regression": LogisticRegression(
        max_iter=1000
    ),
    "Random Forest": RandomForestClassifier(
        n_estimators=100,
        random_state=42
    ),
    "Gradient Boosting": GradientBoostingClassifier(
        random_state=42
    )
}
```

Kemudian melakukan training dan evaluasi.

```python
from sklearn.metrics import accuracy_score

results = {}

for name, model in models.items():

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    results[name] = accuracy

    print(
        f"{name}: {accuracy:.2%}"
    )
```

Contoh output:

```text
Logistic Regression: 84.00%
Random Forest: 89.00%
Gradient Boosting: 91.00%
```

---

## Mengukur Training Time

Kita dapat menggunakan library `time`.

```python
import time

results = {}

for name, model in models.items():

    start_time = time.perf_counter()

    model.fit(X_train, y_train)

    training_time = time.perf_counter() - start_time

    predictions = model.predict(X_test)

    accuracy = accuracy_score(
        y_test,
        predictions
    )

    results[name] = {
        "accuracy": accuracy,
        "training_time": training_time
    }

    print(
        f"{name}: "
        f"accuracy={accuracy:.2%}, "
        f"training={training_time:.4f}s"
    )
```

Dengan cara ini kita tidak hanya mengetahui performa model, tetapi juga waktu yang dibutuhkan untuk training.

---

## Mengukur Inference Time

Inference time dapat diukur dengan menjalankan prediction beberapa kali.

Contoh:

```python
import time

for name, model in models.items():

    start_time = time.perf_counter()

    predictions = model.predict(X_test)

    inference_time = time.perf_counter() - start_time

    print(
        f"{name}: "
        f"inference={inference_time:.4f}s"
    )
```

Namun pengukuran sederhana seperti ini dipengaruhi oleh ukuran `X_test` dan kondisi komputer.

Untuk perbandingan yang lebih baik, kita dapat mengukur beberapa kali dan menggunakan rata-rata.

---

## Mengukur Inference per Sample

Misalnya:

```python
start_time = time.perf_counter()

predictions = model.predict(X_test)

elapsed_time = time.perf_counter() - start_time

inference_per_sample = (
    elapsed_time / len(X_test)
)

print(
    f"{inference_per_sample * 1000:.4f} ms/sample"
)
```

Hasilnya menunjukkan perkiraan waktu inference untuk satu sample.

---

## Mengukur Ukuran Model

Model yang sudah dilatih dapat disimpan menggunakan `joblib`.

```python
import joblib

joblib.dump(
    model,
    "model.pkl"
)
```

Kemudian ukuran file dapat diperiksa:

```python
from pathlib import Path

model_size = Path("model.pkl").stat().st_size

model_size_mb = model_size / (1024 ** 2)

print(
    f"Model size: {model_size_mb:.2f} MB"
)
```

Ini membantu kita memahami kebutuhan storage model ketika melakukan deployment.

---

## Membuat Tabel Perbandingan

Setelah melakukan eksperimen, hasil dapat dikumpulkan menggunakan Pandas.

```python
import pandas as pd

results_df = pd.DataFrame(results).T

results_df
```

Contoh hasil:

| Model | Accuracy | Training Time | Inference Time |
|---|---:|---:|---:|
| Logistic Regression | 0.84 | 0.20 | 0.001 |
| Random Forest | 0.89 | 3.00 | 0.020 |
| Gradient Boosting | 0.91 | 15.00 | 0.050 |

Tabel seperti ini membuat proses pemilihan model lebih objektif.

---

## Jangan Menggunakan Test Set untuk Eksperimen Tanpa Batas

Ada hal penting yang harus diperhatikan.

Jika kita melakukan:

```text
Model A → Test
Model B → Test
Model C → Test
Model D → Test
Model E → Test
...
```

kemudian memilih model berdasarkan hasil Test Set, Test Set mulai memengaruhi keputusan pengembangan.

Hal tersebut dapat menyebabkan **test set contamination**.

Workflow yang lebih baik:

```text
Training Set
     ↓
Training

Validation / Cross-Validation
     ↓
Tuning
     ↓
Model Selection

Test Set
     ↓
Final Evaluation
```

Dengan demikian, Test Set tetap menjadi evaluasi yang lebih independen.

---

## Cross-Validation untuk Perbandingan Model

Ketika dataset tidak terlalu besar, Cross-Validation dapat digunakan untuk mendapatkan estimasi performa yang lebih stabil.

Contoh:

```python
from sklearn.model_selection import cross_val_score

for name, model in models.items():

    scores = cross_val_score(
        model,
        X_train,
        y_train,
        cv=5,
        scoring="accuracy"
    )

    print(
        f"{name}: "
        f"{scores.mean():.2%} "
        f"(+/- {scores.std():.2%})"
    )
```

Contoh output:

```text
Logistic Regression: 83.20% (+/- 1.50%)
Random Forest: 88.70% (+/- 1.20%)
Gradient Boosting: 90.10% (+/- 0.90%)
```

Mean menunjukkan performa rata-rata.

Standard deviation memberikan gambaran variasi performa antar-fold.

---

## Membandingkan Model Secara Lebih Objektif

Jangan hanya mengatakan:

```text
Model A = 90%
Model B = 91%

Maka B pasti lebih baik.
```

Perbedaan yang sangat kecil mungkin tidak terlalu berarti.

Misalnya:

```text
Model A = 90.1%
Model B = 90.2%
```

Jika Model B:

```text
10x lebih lambat
20x lebih besar
```

maka peningkatan tersebut mungkin tidak layak secara praktis.

Karena itu, kita harus melihat konteks penggunaan.

---

## Memilih Model Berdasarkan Use Case

### Real-Time API

Prioritas:

```text
Low Latency
     ↓
Fast Inference
     ↓
Good Performance
```

### Mobile / Edge Device

Prioritas:

```text
Small Model
     ↓
Low Memory
     ↓
Fast Inference
     ↓
Good Performance
```

### Batch Processing

Prioritas dapat lebih banyak diberikan kepada:

```text
Prediction Quality
     ↓
Training Efficiency
     ↓
Throughput
```

Karena prediksi tidak harus diberikan secara langsung kepada pengguna.

---

## Model Terbaik Tidak Selalu Model dengan Score Tertinggi

Kita dapat membayangkan tiga model:

```text
Model A
Performance = 85%
Latency     = 1 ms
Size        = 2 MB

Model B
Performance = 90%
Latency     = 10 ms
Size        = 20 MB

Model C
Performance = 91%
Latency     = 500 ms
Size        = 500 MB
```

Jika sistem membutuhkan latency maksimum 20 ms:

```text
Model C
   ↓
Tidak memenuhi requirement
```

Maka Model B dapat menjadi pilihan yang lebih tepat.

Ini menunjukkan bahwa **model selection harus mempertimbangkan business requirement dan technical requirement**.

---

## Model Comparison dalam Proses Iteratif

Model comparison bukan akhir dari seluruh proses Machine Learning.

Jika semua model belum memenuhi requirement:

```text
Model Comparison
       ↓
Performa belum cukup
       ↓
   Analisis
       ↓
   Perbaiki
```

Kita dapat kembali ke tahap sebelumnya.

Misalnya:

```text
Feature Engineering
        ↓
Preprocessing
        ↓
Model Selection
        ↓
     Tuning
        ↓
   Comparison
```

Atau:

```text
Data baru
   ↓
Training ulang
   ↓
Comparison
```

Machine Learning merupakan siklus eksperimen.

---

## Apa yang Bisa Dilakukan Jika Model Belum Cukup Baik?

Jika hasil model belum memenuhi requirement, beberapa pendekatan dapat dilakukan.

### Menambah Data

Dataset yang lebih besar dapat membantu model mempelajari pola yang lebih representatif, tergantung masalah dan kualitas data.

```text
Data lebih banyak
       ↓
   Training
       ↓
   Evaluasi
```

Namun **data lebih banyak tidak otomatis lebih baik** jika datanya berkualitas buruk.

---

### Feature Engineering

Kita dapat membuat fitur baru yang lebih informatif.

Misalnya:

```text
Tanggal Transaksi
      ↓
    Hari
   Bulan
   Tahun
Hari dalam Minggu
```

Atau:

```text
Tanggal Lahir
      ↓
    Umur
```

Feature engineering dapat memberikan informasi yang lebih berguna bagi model.

---

### Mengubah Algoritma

Jika satu model tidak memberikan hasil yang cukup baik, kita dapat mencoba algoritma lain.

Contohnya:

```text
Logistic Regression
       ↓
Random Forest
       ↓
Gradient Boosting
       ↓
Neural Network
```

Pilihan algoritma harus disesuaikan dengan jenis data dan problem.

---

### Melakukan Tuning Lebih Lanjut

Kita dapat kembali ke tahap hyperparameter tuning:

```text
Model
  ↓
Tuning
  ↓
Evaluation
  ↓
Comparison
```

---

## Dokumentasikan Eksperimen

Dalam proyek Machine Learning, dokumentasi eksperimen sangat penting.

Contohnya:

| Experiment | Model | Parameters | Score | Training Time |
|---|---|---|---:|---:|
| 1 | Logistic Regression | Default | 84% | 0.2s |
| 2 | Random Forest | 100 trees | 88% | 3s |
| 3 | Random Forest | 200 trees | 89% | 6s |
| 4 | Gradient Boosting | Default | 90% | 15s |

Dengan dokumentasi tersebut kita dapat mengetahui:

```text
Apa yang dicoba?
Apa hasilnya?
Apa yang berubah?
Mengapa model tertentu dipilih?
```

Ini menjadi sangat penting ketika proyek sudah semakin besar.

---

## Contoh Workflow Lengkap

Workflow modelling dari awal hingga pemilihan model dapat digambarkan seperti berikut:

```text
Problem Definition
       ↓
Data Collection
       ↓
Data Exploration
       ↓
Preprocessing
       ↓
Train / Validation / Test
       ↓
Baseline Model
       ↓
Choose Models
       ↓
Training
       ↓
Validation
       ↓
Hyperparameter Tuning
       ↓
Model Comparison
       ↓
Select Best Candidate
       ↓
Final Test
       ↓
Deployment
       ↓
Monitoring
```

Jika model belum memenuhi requirement:

```text
Model Comparison
       ↓
Belum memenuhi requirement
       ↓
Feature Engineering
       ↓
Preprocessing
       ↓
Model Tuning
       ↓
Model Comparison
       ↓
      ...
```

---

## Contoh Kriteria Pemilihan Model

Sebelum memilih model final, tentukan kriteria yang jelas.

Contohnya:

```text
Minimum Accuracy : 90%
Maximum Latency  : 100 ms
Maximum Size     : 100 MB
```

Kemudian hasil eksperimen:

| Model | Accuracy | Latency | Size | Status |
|---|---:|---:|---:|---|
| Model A | 88% | 10 ms | 5 MB | Tidak memenuhi accuracy |
| Model B | 91% | 20 ms | 30 MB | Memenuhi |
| Model C | 93% | 500 ms | 200 MB | Tidak memenuhi latency & size |

Model B menjadi kandidat terbaik karena memenuhi seluruh requirement.

---

## Checklist Model Comparison

Sebelum memilih model final, pastikan:

- [ ] Beberapa kandidat model sudah diuji
- [ ] Semua model menggunakan dataset yang konsisten
- [ ] Metric evaluasi sudah ditentukan
- [ ] Validation atau Cross-Validation digunakan selama pengembangan
- [ ] Hyperparameter sudah dituning jika diperlukan
- [ ] Test Set belum digunakan berulang kali untuk memilih model
- [ ] Performa model sudah dibandingkan
- [ ] Training time sudah diperiksa
- [ ] Inference time sudah diperiksa
- [ ] Ukuran model sudah diperiksa
- [ ] Resource yang dibutuhkan sudah dipertimbangkan
- [ ] Requirement sistem sudah ditentukan
- [ ] Trade-off antar-model sudah dianalisis
- [ ] Eksperimen sudah didokumentasikan
- [ ] Model final sudah diuji pada Test Set

---

## Ringkasan

**Model Comparison** adalah proses membandingkan beberapa kandidat model untuk menentukan model yang paling sesuai dengan kebutuhan.

Perbandingan sebaiknya tidak hanya berdasarkan satu metric.

Beberapa faktor yang perlu dipertimbangkan:

```text
Model Performance
Training Time
Inference Time
Model Size
Memory Usage
Complexity
Maintainability
```

Workflow utamanya:

```text
Choose Model
     ↓
   Train
     ↓
  Validate
     ↓
   Tune
     ↓
  Compare
     ↓
  Select
     ↓
Final Test
```

Test Set sebaiknya digunakan sebagai evaluasi akhir setelah proses pengembangan dan pemilihan model selesai.

Hal terpenting adalah:

> **Model terbaik bukan selalu model dengan score tertinggi, tetapi model yang memberikan keseimbangan terbaik antara performa, kecepatan, ukuran, kompleksitas, biaya, dan kebutuhan sistem.**

Jika hasil belum memenuhi requirement, proses dapat kembali ke tahap sebelumnya:

```text
Model Comparison
       ↓
Belum memenuhi requirement
       ↓
Perbaiki Data
       ↓
Feature Engineering
       ↓
Coba Model Lain
       ↓
    Tuning
       ↓
Comparison kembali
```

Dengan demikian, modelling merupakan sebuah **iterative cycle**, bukan proses satu arah.

Setelah model terbaik berhasil dipilih dan dievaluasi, tahap berikutnya adalah membawa model tersebut ke lingkungan yang dapat digunakan oleh pengguna atau aplikasi, yaitu **Model Deployment**.
