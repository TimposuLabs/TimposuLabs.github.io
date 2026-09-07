---
sidebar_position: 9
title: "Experimentation"
---

Setelah melakukan problem definition, memahami data, menentukan evaluation metric, menentukan features, memilih model, melakukan training, tuning, dan model comparison, kita sampai pada tahap yang sangat penting dalam Machine Learning:

**Experimentation**

Eksperimentasi adalah proses mencoba berbagai pendekatan untuk menemukan solusi yang memberikan hasil terbaik terhadap suatu permasalahan.

Pertanyaan utama pada tahap ini adalah:

```text
Apa yang sudah kita coba?

Apa yang belum kita coba?

Apa yang bisa kita ubah?

Apa yang bisa kita tingkatkan?
```

Machine Learning bukan proses yang dilakukan satu kali.

Kita tidak selalu mendapatkan model terbaik pada percobaan pertama.

---

## Machine Learning Bukan Proses Linear

Pemula sering membayangkan workflow Machine Learning seperti:

```text
Problem
  ↓
Data
  ↓
Features
  ↓
Model
  ↓
Evaluation
  ↓
Selesai
```

Dalam proyek nyata, prosesnya lebih sering berbentuk siklus:

```text
Problem
   ↓
Data
   ↓
Evaluation
   ↓
Features
   ↓
Modelling
   ↓
Experimentation
   ↓
Evaluation
   ↓
Perbaikan
   ↓
Experimentation
   ↓
Evaluation
   ↓
...
```

Kita dapat kembali ke tahap sebelumnya kapan saja jika hasil belum memenuhi requirement.

---

## Mengapa Eksperimentasi Diperlukan?

Bayangkan kita membuat model untuk memprediksi harga rumah.

Model pertama menghasilkan:

```text
MAE = Rp100 juta
```

Stakeholder mengatakan bahwa kesalahan tersebut masih terlalu besar.

Kita tidak cukup hanya mengatakan:

```text
"Modelnya memang seperti itu."
```

Sebaliknya, kita perlu melakukan eksperimen.

Misalnya:

```text
Model 1
   ↓
MAE = Rp100 juta

Model 2
   ↓
MAE = Rp85 juta

Model 3
   ↓
MAE = Rp70 juta
```

Kemudian kita mencari tahu:

```text
Apa yang berbeda?

Model apa yang digunakan?

Fitur apa yang digunakan?

Hyperparameter apa yang digunakan?

Apakah preprocessing berubah?

Apakah data ditambah?
```

Eksperimen membantu kita menemukan faktor yang berkontribusi terhadap peningkatan performa.

---

## Experimentation sebagai Siklus

Workflow eksperimentasi dapat digambarkan:

```text
Baseline
   ↓
Evaluate
   ↓
Identify Problem
   ↓
Create Hypothesis
   ↓
Change Something
   ↓
Train
   ↓
Evaluate
   ↓
Compare
   ↓
Keep or Reject
   ↓
New Experiment
```

Setiap eksperimen sebaiknya memiliki tujuan yang jelas.

---

## Jangan Mengubah Terlalu Banyak Hal Sekaligus

Misalnya model awal:

```text
Model A
Accuracy = 82%
```

Kemudian kita mengubah sekaligus:

```text
Model
Features
Preprocessing
Hyperparameters
Dataset
Metric
```

Hasilnya:

```text
Accuracy = 90%
```

Masalahnya kita tidak tahu perubahan mana yang menyebabkan peningkatan.

Apakah:

```text
Model baru?
```

atau:

```text
Feature baru?
```

atau:

```text
Preprocessing?
```

atau:

```text
Hyperparameter?
```

Karena itu, eksperimen yang terkontrol sangat penting.

---

## Membuat Hipotesis

Eksperimen yang baik biasanya dimulai dengan hipotesis.

Contoh:

```text
Hipotesis:

Menambahkan fitur "umur rumah"
akan meningkatkan kemampuan model
dalam memprediksi harga rumah.
```

Kemudian kita melakukan eksperimen:

```text
Model A
Features = luas, kamar, lokasi

Model B
Features = luas, kamar, lokasi, umur rumah
```

Kemudian membandingkan:

```text
Model A → MAE 100 juta
Model B → MAE 85 juta
```

Kita mendapatkan bukti bahwa fitur tersebut mungkin memberikan informasi tambahan yang berguna.

Namun eksperimen yang lebih kuat tetap perlu dilakukan untuk memastikan hasil tersebut konsisten.

---

## Contoh Eksperimentasi Model

Misalnya baseline:

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()

model.fit(
    X_train,
    y_train
)
```

Kemudian kita evaluasi:

```python
from sklearn.metrics import mean_absolute_error

predictions = model.predict(X_test)

mae = mean_absolute_error(
    y_test,
    predictions
)

print(f"MAE: {mae:.2f}")
```

Misalnya:

```text
MAE: 120000000
```

Kemudian kita mencoba Random Forest:

```python
from sklearn.ensemble import RandomForestRegressor

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

model.fit(
    X_train,
    y_train
)

predictions = model.predict(X_test)

mae = mean_absolute_error(
    y_test,
    predictions
)

print(f"MAE: {mae:.2f}")
```

Misalnya hasilnya:

```text
Linear Regression → MAE 120 juta
Random Forest     → MAE 85 juta
```

Eksperimen tersebut memberikan informasi bahwa Random Forest lebih baik pada konfigurasi dan dataset tersebut.

---

## Eksperimentasi dengan Features

Eksperimen tidak selalu berarti mengganti algoritma.

Kita juga dapat mengubah fitur.

Misalnya dataset awal:

```text
Features:
- luas rumah
- jumlah kamar
- lokasi
```

Kemudian kita menambahkan:

```text
- umur bangunan
- jumlah kamar mandi
- jarak ke pusat kota
```

Workflow:

```text
Features Lama
      ↓
Training
      ↓
Evaluation
      ↓
Features Baru
      ↓
Training
      ↓
Evaluation
      ↓
Comparison
```

Jika hasil meningkat secara konsisten, fitur baru tersebut mungkin memberikan informasi yang berguna.

---

## Menambah atau Mengurangi Features

Menambah fitur tidak selalu meningkatkan performa.

Contohnya:

```text
Model A
5 features
Accuracy = 88%
```

Kemudian:

```text
Model B
50 features
Accuracy = 84%
```

Mengapa bisa terjadi?

Beberapa fitur mungkin:

- tidak relevan
- mengandung noise
- memiliki banyak missing value
- mengandung informasi yang tidak stabil
- menyebabkan model lebih kompleks
- memiliki korelasi yang tidak berguna terhadap target

Karena itu kita juga dapat melakukan eksperimen dengan **mengurangi fitur**.

---

## Eksperimentasi dengan Hyperparameter

Kita juga dapat mengubah hyperparameter.

Misalnya:

```python
RandomForestClassifier(
    n_estimators=100,
    max_depth=10
)
```

Kemudian:

```python
RandomForestClassifier(
    n_estimators=300,
    max_depth=10
)
```

Atau:

```python
RandomForestClassifier(
    n_estimators=300,
    max_depth=5
)
```

Setiap konfigurasi merupakan eksperimen yang dapat dibandingkan.

---

## Eksperimentasi dengan Dataset

Kita juga dapat bereksperimen dengan data.

Contohnya:

```text
Dataset Awal
     ↓
100.000 sample
```

Kemudian:

```text
Dataset Bersih
     ↓
95.000 sample
```

Atau:

```text
Dataset Lama
     ↓
100.000 sample

Dataset Baru
     ↓
150.000 sample
```

Perubahan kualitas dan jumlah data dapat memengaruhi kemampuan model untuk melakukan generalisasi.

---

## Start Small

Eksperimen sebaiknya tidak selalu dimulai dengan dataset terbesar.

Misalnya:

```text
100.000 sample
```

Kita dapat memulai dengan:

```text
10.000 sample
```

untuk menguji apakah pipeline sudah berjalan dengan benar.

Workflow:

```text
10.000 data
   ↓
Experiment
   ↓
Pipeline benar?
   ↓
Model masuk akal?
   ↓
Metric benar?
   ↓
Ya
   ↓
50.000 data
   ↓
Experiment
   ↓
100.000 data
```

Tujuannya adalah mempercepat siklus eksperimen.

---

## Experiment Tracking

Ketika eksperimen mulai banyak, kita perlu mencatat hasilnya.

Contohnya:

| Experiment | Model | Features | Hyperparameter | Score |
|---|---|---|---|---:|
| 1 | Linear Regression | Basic | Default | 82% |
| 2 | Random Forest | Basic | Default | 87% |
| 3 | Random Forest | Extended | Default | 89% |
| 4 | Random Forest | Extended | Tuned | 91% |

Catatan seperti ini membantu kita memahami perkembangan eksperimen.

---

## Mengapa Experiment Tracking Penting?

Tanpa pencatatan, kita dapat mengalami situasi:

```text
"Model yang kemarin hasilnya bagus yang mana?"

"Parameter yang digunakan apa?"

"Fitur apa saja yang digunakan?"

"Dataset yang digunakan versi berapa?"
```

Jika eksperimen sudah puluhan atau ratusan, masalah ini menjadi semakin serius.

Karena itu, experiment tracking merupakan bagian penting dari workflow Machine Learning.

---

## Eksperimen yang Reproducible

Eksperimen sebaiknya dapat diulang.

Contohnya menggunakan:

```python
random_state=42
```

Misalnya:

```python
RandomForestClassifier(
    n_estimators=100,
    random_state=42
)
```

Dengan random state yang konsisten, hasil eksperimen yang melibatkan proses random dapat menjadi lebih reproducible.

Namun reproducibility tidak hanya bergantung pada `random_state`.

Kita juga perlu memperhatikan:

```text
Dataset
Preprocessing
Feature Engineering
Model
Hyperparameters
Library Versions
Environment
Random Seeds
```

---

## Framework Machine Learning

Setelah memahami proses eksperimentasi, kita dapat merangkum keseluruhan framework Machine Learning menjadi enam langkah utama.

```text
1. Problem Definition
2. Data
3. Evaluation
4. Features
5. Modelling
6. Experimentation
```

Framework ini membantu kita memahami bagaimana sebuah proyek Machine Learning dikerjakan dari awal sampai proses pengembangan model.

---

### Langkah 1 - Problem Definition

Pertanyaan utama:

> **Masalah apa yang ingin kita selesaikan?**

Sebelum menyentuh kode, kita harus memahami masalah.

Contohnya:

```text
Bisnis memiliki banyak pelanggan
dan ingin mengetahui pelanggan
yang kemungkinan berhenti menggunakan layanan.
```

Kemudian kita dapat mengubah masalah tersebut menjadi Machine Learning problem:

```text
Input
  ↓
Data pelanggan

Output
  ↓
Prediksi churn
```

Problem definition menentukan arah seluruh proyek.

---

### Langkah 2 - Data

Pertanyaan utama:

> **Data apa yang kita miliki?**

Kita perlu mengetahui:

```text
Berapa banyak data?
Apa sumber datanya?
Apa formatnya?
Apakah terdapat missing value?
Apakah terdapat duplicate?
Apakah data memiliki label?
Apakah data cukup representatif?
```

Contohnya:

```text
Customer Data
├── Age
├── Income
├── Subscription
├── Usage
├── Transactions
└── Churn
```

Data merupakan bahan utama yang digunakan oleh model.

---

### Langkah 3 - Evaluation

Pertanyaan utama:

> **Apa yang mendefinisikan keberhasilan?**

Kita perlu menentukan metric sebelum terlalu jauh mengembangkan model.

Contohnya:

```text
Classification
    ↓
Accuracy
Precision
Recall
F1 Score
```

Untuk regression:

```text
Regression
    ↓
MAE
MSE
RMSE
R²
```

Metric harus sesuai dengan problem.

---

### Langkah 4 - Features

Pertanyaan utama:

> **Apa yang sudah kita ketahui dari data tersebut?**

Features merupakan informasi yang digunakan model untuk membuat prediksi.

Contoh:

```text
Features
├── Age
├── Income
├── Usage
└── Transactions

Target
└── Churn
```

Feature engineering juga dapat dilakukan untuk menghasilkan representasi data yang lebih informatif.

---

### Langkah 5 - Modelling

Pertanyaan utama:

> **Model apa yang harus kita gunakan?**

Pada tahap ini kita:

```text
  Memilih model
      ↓
   Training
      ↓
  Validation
      ↓
    Tuning
      ↓
  Comparison
```

Kita dapat mencoba berbagai algoritma.

Contohnya:

```text
Linear Regression
Logistic Regression
Decision Tree
Random Forest
Gradient Boosting
Neural Network
```

Pemilihan model harus disesuaikan dengan jenis masalah dan data.

---

### Langkah 6 - Experimentation

Pertanyaan utama:

> **Apa lagi yang bisa kita coba untuk meningkatkan hasil?**

Jika model belum memenuhi requirement, kita dapat melakukan eksperimen.

Contohnya:

```text
Model Baru
Features Baru
Hyperparameter Baru
Preprocessing Baru
Dataset Baru
Feature Engineering
```

Kemudian:

```text
Training
   ↓
Evaluation
   ↓
Comparison
```

Jika belum cukup baik:

```text
Experiment Again
```

---

## Enam Langkah Framework

Kita dapat merangkumnya dalam bentuk:

```text
┌───────────────────────────────┐
│ 1. Problem Definition         │
│ Apa masalahnya?               │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│ 2. Data                       │
│ Data apa yang tersedia?       │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│ 3. Evaluation                 │
│ Bagaimana mengukur sukses?    │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│ 4. Features                   │
│ Informasi apa yang tersedia?  │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│ 5. Modelling                  │
│ Model apa yang digunakan?     │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│ 6. Experimentation            │
│ Apa lagi yang bisa dicoba?    │
└───────────────┬───────────────┘
                │
                ↓
           Evaluation
                │
                └──────→ Experiment Again
```

Perhatikan bahwa langkah keenam dapat membawa kita kembali ke langkah sebelumnya.

---

## Framework dalam Proyek Nyata

Misalnya stakeholder meminta:

> "Kami ingin mengetahui pelanggan yang berpotensi berhenti menggunakan layanan."

Kita mulai dari:

```text
Problem Definition
        ↓
Prediksi Customer Churn
```

Kemudian mencari data:

```text
Customer Data
        ↓
Data Analysis
```

Menentukan keberhasilan:

```text
Recall ≥ 85%
```

Menentukan features:

```text
Age
Subscription
Usage
Transactions
Customer Tenure
```

Membuat baseline:

```text
Logistic Regression
```

Kemudian:

```text
Accuracy = 82%
Recall   = 78%
```

Stakeholder meminta recall yang lebih tinggi.

Kita kemudian melakukan eksperimen:

```text
Random Forest
      ↓
Recall = 83%
```

Kemudian:

```text
Feature Engineering
      ↓
Recall = 86%
```

Kemudian tuning:

```text
Hyperparameter Tuning
      ↓
Recall = 88%
```

Sekarang model telah mendekati requirement.

---

## Eksperimentasi Tidak Hanya Mengganti Model

Ini merupakan konsep yang sangat penting.

Eksperimentasi dapat dilakukan pada berbagai bagian pipeline.

```text
                 Experimentation
                        │
       ┌────────────────┼────────────────┐
       ↓                ↓                ↓
     Data             Features         Model
       │                │                │
       ↓                ↓                ↓
  Data Cleaning    Feature Eng.     Algorithm
  Sampling         Selection        Hyperparameter
  More Data        Transformation   Architecture
       │                │                │
       └────────────────┼────────────────┘
                        ↓
                    Evaluation
```

Jadi jika performa model buruk, jangan selalu langsung menyimpulkan:

> "Algoritmanya salah."

Masalah dapat berasal dari data, fitur, preprocessing, metric, atau konfigurasi model.

---

## Tool Matching Project

Proyek Machine Learning dapat dipandang sebagai **tool matching project**.

Artinya, kita tidak perlu menggunakan semua tools yang tersedia.

Kita memilih tools berdasarkan kebutuhan.

Contohnya:

```text
Data Manipulation
       ↓
    Pandas

Numerical Computing
       ↓
    NumPy

 Visualization
       ↓
Matplotlib / Seaborn

Classical Machine Learning
       ↓
Scikit-Learn

Deep Learning
       ↓
TensorFlow / PyTorch
```

Tool dipilih berdasarkan problem yang ingin diselesaikan.

---

### Pandas

**Pandas** banyak digunakan untuk bekerja dengan data tabular.

Contohnya:

```python
import pandas as pd

df = pd.read_csv(
    "data.csv"
)

df.head()
```

Pandas dapat digunakan untuk:

- membaca dataset
- membersihkan data
- memilih kolom
- menangani missing value
- melakukan filtering
- melakukan transformasi
- melakukan eksplorasi data

---

### NumPy

**NumPy** digunakan untuk operasi numerik dan array.

Contoh:

```python
import numpy as np

numbers = np.array([
    10,
    20,
    30,
    40
])

print(numbers.mean())
```

NumPy menjadi salah satu fondasi ekosistem scientific computing Python.

---

### Matplotlib

**Matplotlib** dapat digunakan untuk visualisasi data.

Contohnya:

```python
import matplotlib.pyplot as plt

plt.scatter(
    df["age"],
    df["income"]
)

plt.xlabel("Age")
plt.ylabel("Income")

plt.show()
```

Visualisasi membantu kita memahami pola dan hubungan dalam data.

---

### Scikit-Learn

**Scikit-Learn** merupakan salah satu library utama untuk classical Machine Learning di Python.

Contohnya:

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(
    random_state=42
)

model.fit(
    X_train,
    y_train
)
```

Scikit-Learn menyediakan banyak komponen untuk:

```text
Preprocessing
Model Selection
Training
Cross-Validation
Hyperparameter Tuning
Evaluation
Pipelines
```

---

### TensorFlow dan Deep Learning

Untuk beberapa jenis masalah, khususnya data tidak terstruktur seperti:

```text
Image
Audio
Video
Text
```

kita dapat menggunakan framework Deep Learning seperti TensorFlow atau framework lain yang sesuai.

Workflow dapat menjadi:

```text
Data
 ↓
Neural Network
 ↓
Training
 ↓
Validation
 ↓
Tuning
 ↓
Evaluation
```

Pemilihan framework tetap bergantung pada kebutuhan proyek.

---

## Dari Framework ke Workflow Teknis

Setelah memahami enam langkah framework, kita dapat mulai masuk ke workflow yang lebih teknis.

Contohnya:

```text
Problem Definition
       ↓
    Dataset
       ↓
Exploratory Data Analysis
       ↓
Data Cleaning
       ↓
Feature Engineering
       ↓
Train / Validation / Test
       ↓
Baseline Model
       ↓
Model Training
       ↓
Evaluation
       ↓
Hyperparameter Tuning
       ↓
Model Comparison
       ↓
Experimentation
       ↓
Final Model
```

Workflow tersebut kemudian dapat dilanjutkan dengan:

```text
Model Serialization
       ↓
API
       ↓
Deployment
       ↓
Monitoring
       ↓
Retraining
```

---

## Eksperimentasi dan Production

Eksperimentasi tidak berhenti ketika model berhasil pada Test Set.

Setelah deployment:

```text
Model
  ↓
Production
  ↓
Real User Data
  ↓
Monitoring
  ↓
Performance Evaluation
```

Jika performa menurun:

```text
Production Performance
        ↓
Investigate
        ↓
New Experiment
        ↓
Retraining
        ↓
New Model
        ↓
Deployment
```

Dengan demikian, Machine Learning dalam production juga merupakan proses iteratif.

---

## Prinsip Penting Eksperimentasi

Beberapa prinsip yang perlu diterapkan:

### Mulai dari Baseline

Selalu memiliki model pembanding.

```text
Baseline
   ↓
Experiment
   ↓
Improvement
```

### Buat Hipotesis

Jangan mengubah sesuatu tanpa alasan.

```text
Hipotesis
   ↓
Experiment
   ↓
Result
   ↓
Conclusion
```

### Ubah Secara Terkontrol

Hindari mengubah seluruh pipeline sekaligus jika tujuan eksperimen adalah memahami pengaruh satu perubahan.

### Catat Hasil

Simpan:

```text
Model
Features
Hyperparameters
Dataset
Metric
Score
Training Time
```

### Jangan Hanya Mengejar Score

Pertimbangkan juga:

```text
Latency
Memory
Model Size
Training Cost
Maintainability
Business Requirement
```

---

## Checklist Experimentation

Sebelum menyelesaikan tahap ini, pastikan:

- [ ] Memahami bahwa Machine Learning adalah proses iteratif
- [ ] Sudah memiliki baseline model
- [ ] Sudah menentukan metric keberhasilan
- [ ] Sudah membuat hipotesis eksperimen
- [ ] Sudah mencoba model alternatif
- [ ] Sudah mencoba feature engineering
- [ ] Sudah mencoba hyperparameter tuning
- [ ] Sudah membandingkan hasil eksperimen
- [ ] Eksperimen dicatat
- [ ] Dataset dan preprocessing terdokumentasi
- [ ] Test Set tidak digunakan secara berulang untuk tuning
- [ ] Model yang dipilih memenuhi requirement
- [ ] Trade-off performa dan resource sudah dipertimbangkan

---

## Ringkasan Enam Langkah Framework Machine Learning

Framework yang telah dipelajari:

| Langkah | Pertanyaan Utama |
|---|---|
| 1. Problem Definition | Apa masalah yang ingin diselesaikan? |
| 2. Data | Data apa yang kita miliki? |
| 3. Evaluation | Apa yang mendefinisikan keberhasilan? |
| 4. Features | Informasi apa yang tersedia dari data? |
| 5. Modelling | Model apa yang harus digunakan? |
| 6. Experimentation | Apa lagi yang bisa kita coba? |

Framework tersebut bukan aturan yang harus selalu dijalankan secara kaku.

Dalam proyek nyata, kita dapat kembali ke langkah sebelumnya.

Contohnya:

```text
Problem
   ↓
 Data
   ↓
Evaluation
   ↓
Features
   ↓
Modelling
   ↓
Experimentation
   ↓
Belum berhasil
   ↓
Kembali ke Data
   ↓
Feature Engineering
   ↓
Modelling
   ↓
Experimentation
```

---

## Gambaran Besar Workflow Machine Learning

Jika seluruh materi dirangkum:

```text
                    ┌─────────────────────┐
                    │ Problem Definition  │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Data                │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Evaluation          │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Features            │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Modelling           │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Experimentation     │
                    └──────────┬──────────┘
                               ↓
                         Evaluation
                               │
                     ┌─────────┴─────────┐
                     │                   │
                 Belum baik           Berhasil
                     │                   │
                     ↓                   ↓
                Experiment          Final Model
                     │                   │
                     └───────→           ↓
                              Deployment
                                    ↓
                                Monitoring
                                    ↓
                              Experiment Again
```

Inilah pola pikir yang perlu dibangun ketika mengerjakan proyek Machine Learning.

Machine Learning bukan sekadar:

```text
Import Library
     ↓
model.fit()
     ↓
model.predict()
```

Tetapi merupakan proses untuk:

```text
Memahami masalah
      ↓
Memahami data
      ↓
Menentukan keberhasilan
      ↓
Membangun fitur
      ↓
Membangun model
      ↓
Melakukan eksperimen
      ↓
Mengevaluasi
      ↓
Memperbaiki
      ↓
Mengulang
```

---

## Kesimpulan

**Experimentation** merupakan bagian penting dari Machine Learning karena model pertama hampir tidak selalu menjadi model terbaik.

Pertanyaan yang harus selalu dipertimbangkan adalah:

```text
Apa yang sudah kita coba?

Apa yang belum kita coba?

Apa yang dapat kita ubah?

Apakah perubahan tersebut benar-benar meningkatkan hasil?
```

Enam langkah framework Machine Learning dapat dirangkum sebagai:

```text
1. Problem Definition
       ↓
2. Data
       ↓
3. Evaluation
       ↓
4. Features
       ↓
5. Modelling
       ↓
6. Experimentation
```

Framework ini memberikan cara berpikir yang sistematis untuk mengerjakan proyek Machine Learning.

Namun prosesnya bersifat **iteratif**.

Jika hasil belum memenuhi requirement, kita dapat kembali ke:

```text
Data
Features
Modelling
Evaluation
```

kemudian melakukan eksperimen kembali.
