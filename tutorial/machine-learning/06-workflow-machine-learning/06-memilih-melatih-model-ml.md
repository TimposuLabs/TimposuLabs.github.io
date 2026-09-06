---
sidebar_position: 6
title: "Modelling: Memilih & Melatih Model"
---

Setelah memahami **problem definition**, mengenali jenis data, melakukan preprocessing, serta membagi dataset menjadi training, validation, dan test set, tahap berikutnya adalah **modelling**.

Modelling adalah proses memilih algoritma Machine Learning yang sesuai, melatihnya menggunakan data, melakukan optimasi, kemudian membandingkan hasilnya dengan model lain.

Secara sederhana:

```text
Data
  ↓
Memilih Model
  ↓
Training
  ↓
Evaluasi
  ↓
Tuning
  ↓
Perbandingan Model
  ↓
Model Terbaik
```

Modelling bukan hanya tentang memilih algoritma yang paling canggih. Tujuan utamanya adalah menemukan model yang **cukup baik untuk menyelesaikan masalah dengan efisien dan dapat melakukan generalisasi terhadap data baru**.

---

## 3 Tahapan Utama dalam Modelling

Secara umum, proses modelling dapat dibagi menjadi tiga tahapan utama:

1. **Choosing and Training a Model**
2. **Tuning a Model**
3. **Model Comparison**

Ketiga tahapan tersebut biasanya dilakukan secara iteratif.

```text
                 ┌──────────────────────┐
                 │ Choosing a Model     │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │ Training the Model   │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │ Evaluate the Model   │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │ Tune the Model       │
                 └──────────┬───────────┘
                            ↓
                 ┌──────────────────────┐
                 │ Compare Models       │
                 └──────────┬───────────┘
                            ↓
                    Model Terbaik
```

Namun dalam praktiknya, proses tersebut tidak selalu berjalan satu kali dari atas ke bawah.

Sering kali prosesnya seperti:

```text
Model A
  ↓
Training → Evaluation
  ↓
Tuning
  ↓
Evaluation
  ↓
Model B
  ↓
Training → Evaluation
  ↓
Comparison
  ↓
Model terbaik
```

Inilah salah satu alasan mengapa Machine Learning disebut sebagai proses yang **iteratif**.

---

## Choosing and Training a Model

Tahap pertama adalah menentukan algoritma yang akan digunakan dan melatih algoritma tersebut menggunakan training data.

Misalnya kita memiliki dataset untuk memprediksi harga rumah.

```text
Features (X)
├── Luas rumah
├── Jumlah kamar
├── Jumlah kamar mandi
└── Lokasi

Target (y)
└── Harga rumah
```

Model akan mencoba mempelajari hubungan antara `X` dan `y`.

Secara sederhana:

```text
X
│
│  Luas
│  Kamar
│  Lokasi
│
▼
┌─────────────────┐
│  Machine        │
│  Learning Model │
└────────┬────────┘
         │
         ▼
       Prediksi
         │
         ▼
     Harga Rumah
```

Tujuan training adalah membuat model menemukan pola yang dapat digunakan untuk menghasilkan prediksi pada data baru.

---

## Input dan Output dalam Machine Learning

Dalam supervised learning, kita biasanya memiliki dua komponen utama:

- **X** → Features atau input
- **y** → Target atau label

Contohnya:

```python
X = [
    [100, 3, 2],
    [150, 4, 2],
    [200, 5, 3]
]

y = [
    500000000,
    750000000,
    1000000000
]
```

Pada contoh tersebut:

```text
X
├── Luas rumah
├── Jumlah kamar
└── Jumlah kamar mandi

y
└── Harga rumah
```

Model akan belajar hubungan antara kedua komponen tersebut.

---

## Training Model

Training adalah proses memberikan data kepada algoritma agar algoritma dapat mempelajari pola yang terdapat di dalam data.

Contoh sederhana menggunakan `LinearRegression`:

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()

model.fit(X_train, y_train)
```

Pada kode tersebut:

```python
model.fit(X_train, y_train)
```

berarti model dilatih menggunakan:

- `X_train` → data fitur
- `y_train` → target

Setelah training selesai, model dapat digunakan untuk melakukan prediksi.

```python
predictions = model.predict(X_test)
```

---

## Model Belajar dari Kesalahan

Model Machine Learning tidak sekadar menghafal data.

Selama training, model mencoba menemukan parameter yang menghasilkan prediksi sebaik mungkin berdasarkan objective atau loss function yang digunakan.

Secara sederhana:

```text
Training Data
     ↓
Model membuat prediksi
     ↓
Prediksi dibandingkan dengan target
     ↓
Menghitung error
     ↓
Model memperbaiki parameter
     ↓
Prediksi berikutnya
     ↓
Berulang
```

Contohnya pada regresi:

```text
Harga sebenarnya : 500 juta
Prediksi model   : 450 juta

Error            : 50 juta
```

Model kemudian berusaha menemukan parameter yang menghasilkan error yang lebih kecil.

Cara proses optimasi tersebut berlangsung bergantung pada algoritma yang digunakan.

---

## Training Set untuk Melatih Model

Dalam workflow Machine Learning, data biasanya dibagi menjadi beberapa bagian.

Salah satu pembagian yang umum adalah:

```text
Dataset
│
├── Training Set
├── Validation Set
└── Test Set
```

Training Set digunakan untuk melatih model.

Validation Set digunakan untuk membantu memilih model dan melakukan tuning.

Test Set digunakan untuk mengevaluasi performa akhir model pada data yang belum digunakan dalam proses pengembangan model.

Contoh:

```text
Dataset = 10.000 data

Training Set   → 8.000
Validation Set → 1.000
Test Set       → 1.000
```

Pembagian tersebut bukan aturan wajib. Proporsinya dapat disesuaikan dengan ukuran dataset dan kebutuhan eksperimen.

---

## Mengapa Test Set Tidak Digunakan untuk Training?

Test Set dapat dianggap sebagai **ujian akhir**.

Bayangkan seorang siswa:

```text
Belajar
  ↓
Latihan
  ↓
Simulasi
  ↓
Ujian
```

Jika soal ujian diberikan kepada siswa sebelum ujian dan digunakan untuk belajar, maka hasil ujian tidak lagi memberikan gambaran yang objektif.

Hal yang sama berlaku pada Machine Learning.

Jika model dilatih menggunakan Test Set, kita tidak lagi memiliki data yang benar-benar independen untuk mengukur kemampuan generalisasi model.

Oleh karena itu:

```text
Training Set
     ↓
    Model
     ↓
Validation Set
     ↓
Pemilihan & Tuning
     ↓
Final Model
     ↓
Test Set
     ↓
Evaluasi Akhir
```

---

## Memilih Model Berdasarkan Jenis Data

Tidak ada satu algoritma yang selalu menjadi algoritma terbaik untuk semua masalah.

Pemilihan model harus mempertimbangkan:

- jenis data
- ukuran dataset
- jumlah fitur
- jenis masalah
- kebutuhan interpretasi
- waktu training
- kebutuhan deployment
- resource komputasi
- performa yang diharapkan

Salah satu pertimbangan penting adalah apakah data yang digunakan merupakan **structured data** atau **unstructured data**.

---

## Structured Data

Structured data adalah data yang memiliki struktur yang jelas, biasanya berbentuk tabel.

Contohnya:

| Umur | Pendapatan | Jumlah Transaksi | Membeli |
|---:|---:|---:|---:|
| 25 | 5000000 | 3 | Ya |
| 31 | 8000000 | 8 | Ya |
| 22 | 3000000 | 1 | Tidak |
| 45 | 12000000 | 10 | Ya |

Data seperti ini umum ditemukan dalam:

- database
- spreadsheet
- sistem transaksi
- sistem informasi
- data pelanggan
- data keuangan

Untuk structured data, model berbasis **tree** sering menjadi pilihan yang sangat kuat.

Contohnya:

- Decision Tree
- Random Forest
- Gradient Boosting
- XGBoost
- CatBoost

---

## Tree-Based Models

Decision Tree bekerja dengan membuat serangkaian keputusan berdasarkan fitur.

Contoh sederhana:

```text
Apakah pendapatan > 10 juta?
        │
   ┌────┴────┐
   │         │
  Ya       Tidak
   │         │
   ▼         ▼
Beli?     Apakah umur > 30?
             │
        ┌────┴────┐
        │         │
       Ya       Tidak
        │         │
        ▼         ▼
      Beli    Tidak Beli
```

Decision Tree kemudian dapat dikembangkan menjadi model ensemble seperti Random Forest dan Gradient Boosting.

---

## Random Forest

**Random Forest** adalah ensemble model yang menggunakan banyak Decision Tree.

Secara sederhana:

```text
Dataset
   │
   ├── Tree 1 ──→ Prediksi
   ├── Tree 2 ──→ Prediksi
   ├── Tree 3 ──→ Prediksi
   ├── Tree 4 ──→ Prediksi
   └── Tree 5 ──→ Prediksi
             │
             ▼
      Gabungkan Prediksi
             │
             ▼
       Final Prediction
```

Kelebihan Random Forest antara lain:

- kuat untuk banyak jenis structured data
- mampu menangani hubungan non-linear
- relatif mudah digunakan
- tidak memerlukan preprocessing yang terlalu kompleks pada banyak kasus
- dapat digunakan untuk classification maupun regression

Contoh:

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)
```

---

## Gradient Boosting

Gradient Boosting juga merupakan pendekatan ensemble berbasis tree.

Berbeda dengan Random Forest yang membangun banyak tree secara relatif independen, Gradient Boosting membangun model secara bertahap, dengan model berikutnya berusaha memperbaiki kesalahan model sebelumnya.

Secara sederhana:

```text
Data
 ↓
Model 1
 ↓
Error
 ↓
Model 2 memperbaiki error
 ↓
Error
 ↓
Model 3 memperbaiki error
 ↓
...
 ↓
Final Model
```

Beberapa implementasi populer antara lain:

- XGBoost
- CatBoost
- LightGBM
- HistGradientBoosting

Contoh menggunakan XGBoost:

```python
from xgboost import XGBClassifier

model = XGBClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)
```

---

## Unstructured Data

Unstructured data adalah data yang tidak memiliki struktur tabel sederhana seperti data database.

Contohnya:

- gambar
- audio
- video
- teks
- dokumen
- suara

Contoh gambar:

```text
┌───────────────────────┐
│                       │
│       🐱              │
│                       │
│       Gambar          │
│                       │
└───────────────────────┘
```

Komputer harus memproses representasi numerik dari data tersebut sebelum model dapat menggunakannya.

Untuk jenis data seperti ini, **Deep Learning** sering menjadi pendekatan yang sangat efektif.

---

## Deep Learning

Deep Learning merupakan pendekatan Machine Learning yang menggunakan **neural network** dengan banyak lapisan.

Contoh sederhana:

```text
Input
  ↓
Input Layer
  ↓
Hidden Layer
  ↓
Hidden Layer
  ↓
Output Layer
  ↓
Prediction
```

Untuk gambar, misalnya, model dapat mempelajari pola secara bertingkat:

```text
Pixel
  ↓
Edges
  ↓
Shapes
  ↓
Parts
  ↓
Object
```

Inilah salah satu alasan Deep Learning sangat populer untuk computer vision.

---

## Transfer Learning

Selain melatih model dari awal, kita juga dapat menggunakan **Transfer Learning**.

Transfer Learning berarti menggunakan model yang sebelumnya sudah dilatih pada dataset besar kemudian menyesuaikannya untuk masalah baru.

Contohnya:

```text
Model Pretrained
      ↓
Pengetahuan yang sudah dipelajari
      ↓
Transfer Learning
      ↓
Dataset kita
      ↓
Fine-Tuning
      ↓
Model untuk kebutuhan kita
```

Pendekatan ini sangat berguna ketika dataset yang kita miliki relatif kecil.

---

## Perbandingan Pendekatan Berdasarkan Data

Secara umum:

| Jenis Data | Pendekatan yang Sering Digunakan |
|---|---|
| Structured Data | Decision Tree |
| Structured Data | Random Forest |
| Structured Data | Gradient Boosting |
| Structured Data | XGBoost |
| Structured Data | CatBoost |
| Gambar | Deep Learning |
| Teks | Deep Learning / NLP |
| Audio | Deep Learning |
| Video | Deep Learning |
| Dataset kecil untuk masalah tertentu | Transfer Learning |

Namun tabel tersebut bukan aturan mutlak.

Pemilihan model tetap harus dilakukan melalui eksperimen dan evaluasi.

---

## Jangan Langsung Menggunakan Model yang Kompleks

Salah satu kesalahan yang sering dilakukan ketika mulai belajar Machine Learning adalah langsung memilih model yang sangat kompleks.

Misalnya:

```text
Masalah sederhana
      ↓
Langsung menggunakan
Deep Neural Network
      ↓
Training sangat lama
      ↓
Sulit melakukan debugging
      ↓
Performa ternyata tidak jauh berbeda
```

Pendekatan yang lebih baik adalah memulai dengan **baseline model**.

Contohnya:

```text
Problem
  ↓
Simple Baseline
  ↓
Evaluation
  ↓
Model lebih kompleks
  ↓
Evaluation
  ↓
Comparison
```

Dengan cara tersebut kita memiliki titik pembanding.

---

## Apa Itu Baseline Model?

Baseline adalah model awal yang digunakan sebagai referensi.

Tujuannya bukan selalu menghasilkan performa terbaik.

Tujuan utamanya adalah mengetahui:

> "Seberapa baik kita bisa menyelesaikan masalah ini dengan pendekatan sederhana?"

Misalnya kita memiliki masalah classification.

Kita dapat memulai dengan:

```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(max_iter=1000)

model.fit(X_train, y_train)
```

Kemudian evaluasi:

```python
score = model.score(X_test, y_test)

print(f"Accuracy: {score:.2%}")
```

Misalnya hasilnya:

```text
Accuracy: 82%
```

Kemudian kita mencoba Random Forest:

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

score = model.score(X_test, y_test)

print(f"Accuracy: {score:.2%}")
```

Misalnya:

```text
Accuracy: 89%
```

Sekarang kita memiliki perbandingan:

```text
Logistic Regression → 82%
Random Forest       → 89%
```

Random Forest memberikan hasil yang lebih baik pada eksperimen tersebut.

---

## Machine Learning adalah Proses Iteratif

Machine Learning hampir tidak pernah selesai hanya dengan satu kali training.

Dalam praktiknya, prosesnya lebih mirip:

```text
Problem
   ↓
Data
   ↓
Model
   ↓
Training
   ↓
Evaluation
   ↓
Apakah hasil cukup baik?
   │
   ├── Tidak
   │    ↓
   │   Perbaiki
   │    ↓
   │   Training kembali
   │
   └── Ya
        ↓
    Model Final
```

Kita dapat melakukan perubahan pada:

- preprocessing
- fitur
- algoritma
- hyperparameter
- jumlah data
- teknik sampling
- threshold
- strategi training

Kemudian melakukan training dan evaluasi kembali.

---

## Start Small

Ketika dataset sangat besar, jangan selalu memulai eksperimen menggunakan seluruh dataset.

Misalnya kita memiliki:

```text
100.000 data
```

Daripada langsung melakukan eksperimen menggunakan seluruh data, kita dapat mencoba:

```text
10.000 data
```

terlebih dahulu.

Tujuannya adalah mempercepat siklus eksperimen.

Contohnya:

```text
100.000 data
     ↓
Training 20 menit
     ↓
Eksperimen
     ↓
Ternyata preprocessing salah
     ↓
Training ulang
     ↓
20 menit lagi
```

Jika menggunakan dataset kecil:

```text
10.000 data
     ↓
Training 2 menit
     ↓
Eksperimen
     ↓
Perbaiki
     ↓
Training ulang
     ↓
2 menit
```

Kita dapat melakukan lebih banyak eksperimen dalam waktu yang sama.

---

## Mengapa Eksperimen Cepat Itu Penting?

Misalnya sebuah eksperimen membutuhkan 30 menit.

Jika kita memiliki waktu 3 jam:

```text
3 jam
÷
30 menit
=
6 eksperimen
```

Tetapi jika satu eksperimen hanya membutuhkan 3 menit:

```text
3 jam
÷
3 menit
=
60 eksperimen
```

Eksperimen yang lebih cepat memungkinkan kita mencoba lebih banyak kemungkinan.

Karena itu, dalam Machine Learning:

> **Faster iteration often means faster learning.**

---

## Setelah Model Bekerja, Gunakan Data Lebih Besar

Menggunakan dataset kecil bukan berarti kita akan selalu menggunakan dataset tersebut pada model final.

Dataset kecil digunakan untuk **eksperimen awal**.

Setelah pipeline dan pendekatan terbukti bekerja, kita dapat meningkatkan jumlah data.

Contohnya:

```text
Tahap 1
10.000 data
   ↓
Eksperimen berhasil
   ↓
Tahap 2
50.000 data
   ↓
Eksperimen berhasil
   ↓
Tahap 3
100.000 data
   ↓
Final Training
```

Dengan demikian, proses pengembangan menjadi lebih efisien.

---

## Membandingkan Model

Setelah mencoba beberapa algoritma, kita perlu membandingkan performanya.

Misalnya:

| Model | Accuracy |
|---|---:|
| Logistic Regression | 82% |
| Decision Tree | 84% |
| Random Forest | 89% |
| Gradient Boosting | 91% |

Dari hasil tersebut, Gradient Boosting memiliki accuracy paling tinggi.

Namun jangan hanya melihat satu angka.

Kita juga perlu mempertimbangkan:

- waktu training
- waktu prediction
- penggunaan memory
- kompleksitas model
- interpretabilitas
- ukuran model
- kebutuhan deployment
- kemampuan generalisasi

Misalnya:

```text
Model A
Accuracy  : 90%
Training  : 1 menit
Model size: 20 MB

Model B
Accuracy  : 91%
Training  : 8 jam
Model size: 2 GB
```

Perbedaan accuracy hanya 1%, tetapi biaya komputasinya sangat berbeda.

Dalam kasus tertentu, Model A justru dapat menjadi pilihan yang lebih baik.

---

## Fokus pada Hasil Praktis

Tujuan Machine Learning bukan sekadar mendapatkan skor benchmark paling tinggi.

Tujuan sebenarnya adalah membuat sistem yang **berguna untuk menyelesaikan masalah nyata**.

Misalnya:

```text
Model A
Accuracy = 90%
Training = 1 menit

Model B
Accuracy = 91%
Training = 10 jam
```

Jika tambahan 1% performa tidak memberikan manfaat bisnis yang berarti, menggunakan Model B mungkin tidak sebanding dengan biaya komputasinya.

Karena itu, kita perlu mempertimbangkan trade-off.

```text
Performance
     ↕
Complexity
     ↕
Training Time
     ↕
Inference Time
     ↕
Infrastructure Cost
     ↕
Maintainability
```

Model terbaik bukan selalu model dengan skor tertinggi.

Model terbaik adalah model yang memberikan **keseimbangan yang sesuai dengan kebutuhan masalah**.

---

## Contoh Workflow Modelling dengan Scikit-Learn

Berikut contoh sederhana workflow modelling untuk classification.

### Import Library

```python
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
```

### Menyiapkan Data

Misalnya kita sudah memiliki:

```python
X = df.drop("target", axis=1)
y = df["target"]
```

Kemudian membagi data:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)
```

---

## Membuat Baseline Model

Kita dapat menggunakan Logistic Regression sebagai model awal.

```python
baseline_model = LogisticRegression(
    max_iter=1000
)

baseline_model.fit(
    X_train,
    y_train
)
```

Kemudian melakukan prediksi:

```python
baseline_predictions = baseline_model.predict(X_test)
```

Evaluasi:

```python
baseline_accuracy = accuracy_score(
    y_test,
    baseline_predictions
)

print(f"Baseline Accuracy: {baseline_accuracy:.2%}")
```

---

## Mencoba Model Lain

Selanjutnya kita dapat mencoba Random Forest.

```python
rf_model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

rf_model.fit(
    X_train,
    y_train
)
```

Prediksi:

```python
rf_predictions = rf_model.predict(X_test)
```

Evaluasi:

```python
rf_accuracy = accuracy_score(
    y_test,
    rf_predictions
)

print(f"Random Forest Accuracy: {rf_accuracy:.2%}")
```

---

## Membandingkan Model

Hasil dapat disimpan dalam dictionary:

```python
results = {
    "Logistic Regression": baseline_accuracy,
    "Random Forest": rf_accuracy
}

for model_name, score in results.items():
    print(f"{model_name}: {score:.2%}")
```

Contoh output:

```text
Logistic Regression: 82.50%
Random Forest: 89.00%
```

Dari eksperimen tersebut kita dapat melanjutkan ke tahap berikutnya, yaitu tuning dan eksperimen lebih lanjut.

---

## Jangan Terlalu Cepat Menyimpulkan Model Terbaik

Jika Random Forest mendapatkan accuracy 89% dan Logistic Regression mendapatkan 82%, bukan berarti Random Forest selalu lebih baik.

Hasil tersebut hanya berlaku pada **eksperimen dan kondisi dataset tersebut**.

Kita masih perlu mempertimbangkan:

```text
Apakah data sudah diproses dengan benar?
        ↓
Apakah metric yang digunakan tepat?
        ↓
Apakah pembagian data tepat?
        ↓
Apakah model mengalami overfitting?
        ↓
Bagaimana hasil validation?
        ↓
Bagaimana hasil test?
        ↓
Bagaimana performa pada data baru?
```

Karena itu, pemilihan model harus dilakukan secara sistematis.

---

## Prinsip Praktis dalam Memilih Model

Beberapa prinsip yang dapat digunakan:

### 1. Mulai dari Model Sederhana

Jangan langsung menggunakan model kompleks.

Mulailah dengan baseline.

```text
Simple Model
    ↓
Measure
    ↓
Improve
```

### 2. Gunakan Model yang Sesuai dengan Data

Structured data sering cocok dengan tree-based models.

Unstructured data sering membutuhkan pendekatan Deep Learning.

Namun tetap lakukan eksperimen.

### 3. Perhatikan Ukuran Dataset

Dataset kecil tidak selalu membutuhkan model yang sangat kompleks.

Dataset besar dapat membuka lebih banyak kemungkinan untuk model yang lebih kompleks.

### 4. Pertimbangkan Resource

Perhatikan:

- CPU
- GPU
- RAM
- storage
- waktu training
- biaya cloud

### 5. Jangan Mengejar Kompleksitas

Model kompleks belum tentu memberikan hasil yang lebih baik.

### 6. Gunakan Baseline

Baseline memberikan titik pembanding yang jelas.

### 7. Lakukan Eksperimen Secara Iteratif

Jangan berharap mendapatkan model terbaik pada percobaan pertama.

---

## Checklist Choosing and Training a Model

Sebelum melanjutkan ke tahap berikutnya, pastikan:

- [ ] Problem sudah didefinisikan dengan jelas
- [ ] Jenis masalah sudah diketahui
- [ ] Features dan target sudah ditentukan
- [ ] Data sudah dipisahkan dengan benar
- [ ] Training set sudah tersedia
- [ ] Model baseline sudah dibuat
- [ ] Model sudah dilatih
- [ ] Prediksi sudah dilakukan
- [ ] Metric sudah dipilih
- [ ] Performa model sudah diukur
- [ ] Model alternatif sudah dicoba
- [ ] Hasil antar-model sudah dibandingkan
- [ ] Waktu training sudah dipertimbangkan
- [ ] Kompleksitas model sudah dipertimbangkan

---

## Ringkasan

Modelling merupakan salah satu bagian penting dalam workflow Machine Learning.

Tiga tahapan utama dalam modelling adalah:

```text
1. Choosing and Training a Model
2. Tuning a Model
3. Model Comparison
```

Model dilatih menggunakan hubungan antara:

```text
X = Features / Inputs
y = Target / Labels
```

Training dilakukan menggunakan **Training Set**, sedangkan Validation Set dan Test Set digunakan untuk proses evaluasi dan pengambilan keputusan model.

Untuk structured data, model berbasis Decision Tree dan ensemble seperti Random Forest serta Gradient Boosting sering menjadi pilihan yang kuat.

Untuk unstructured data seperti gambar, teks, audio, dan video, Deep Learning serta Transfer Learning sering menjadi pendekatan yang efektif.

Hal yang sangat penting adalah **tidak selalu menggunakan model paling kompleks**.

Workflow yang lebih baik adalah:

```text
Start Small
    ↓
Build Baseline
    ↓
Train
    ↓
Evaluate
    ↓
Try Another Model
    ↓
Compare
    ↓
Tune
    ↓
Scale Up
    ↓
Final Model
```

Machine Learning merupakan proses eksperimen yang iteratif. Dengan memulai dari model sederhana, dataset yang lebih kecil, dan eksperimen yang cepat, kita dapat belajar lebih cepat dan mengurangi waktu yang terbuang.

Pada materi berikutnya, kita akan membahas **Tuning a Model**, yaitu bagaimana menyesuaikan hyperparameter agar model yang sudah dipilih dapat memberikan performa yang lebih baik.
