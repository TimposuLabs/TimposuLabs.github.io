---
sidebar_position: 5
title: "Modelling: Splitting Data"
---

**Modelling** merupakan salah satu tahap utama dalam Machine Learning Framework.

Pada tahap sebelumnya kita sudah mempelajari:

- **Problem Definition** - menentukan masalah yang ingin diselesaikan.
- **Data** - memahami data yang tersedia.
- **Evaluation** - menentukan bagaimana keberhasilan model akan diukur.
- **Features** - menentukan informasi yang digunakan model.

Setelah semua itu dipahami, kita masuk ke tahap **Modelling**.

Pertanyaan utama pada tahap ini adalah:

> **"Model Machine Learning apa yang harus kita gunakan berdasarkan masalah dan data yang kita miliki?"**

Modelling bukan hanya tentang memilih algoritma.

Dalam praktiknya, modelling mencakup:

```text
Choosing & Training
        ↓
     Tuning
        ↓
Model Comparison
        ↓
Final Model
```

---

## Tiga Aktivitas Utama Modelling

Secara umum terdapat tiga aktivitas penting dalam proses modelling:

1. **Choosing and Training a Model**
2. **Tuning a Model**
3. **Model Comparison**

Ketiganya saling berhubungan.

```text
Data
 ↓
Choose Model
 ↓
Train Model
 ↓
Evaluate
 ↓
Tune Model
 ↓
Evaluate Again
 ↓
Compare Models
 ↓
Choose Final Model
```

Namun sebelum masuk lebih jauh, kita perlu memahami konsep yang sangat penting dalam modelling, yaitu **pembagian dataset menjadi Training Set, Validation Set, dan Test Set**.

---

## The Three Sets

Dalam Machine Learning, kita biasanya tidak menggunakan seluruh data untuk melatih model.

Dataset dibagi menjadi beberapa bagian **(Splitting Data)**:

```text
                 Dataset
                    │
          ┌─────────┼─────────┐
          ↓         ↓         ↓
       Training  Validation   Test
          │         │         │
          ↓         ↓         ↓
       Training    Tuning    Final
        Model               Evaluation
```

Ketiga bagian tersebut memiliki fungsi yang berbeda.

| Dataset | Fungsi |
|---|---|
| Training Set | Melatih model |
| Validation Set | Memilih dan melakukan tuning model |
| Test Set | Evaluasi akhir |

Konsep ini sangat penting karena kita ingin mengetahui apakah model mampu bekerja pada **unseen data**, yaitu data yang belum pernah dilihat sebelumnya.

---

## Mengapa Dataset Harus Dibagi?

Bayangkan seorang mahasiswa akan mengikuti ujian.

Jika mahasiswa mendapatkan semua soal ujian sebelum ujian berlangsung dan menghafalkan jawabannya, nilai ujian tidak akan menggambarkan kemampuan sebenarnya.

Hal yang sama dapat terjadi pada Machine Learning.

Jika model melihat seluruh data sebelum evaluasi:

```text
Model
 ↓
Melihat data
 ↓
Mengingat pola spesifik
 ↓
Mendapatkan skor tinggi
```

Model mungkin terlihat sangat bagus, tetapi belum tentu mampu bekerja pada data baru.

Kita ingin model melakukan:

```text
Belajar dari contoh
       ↓
Memahami pola
       ↓
Menghadapi data baru
       ↓
Membuat prediksi
```

Inilah yang disebut **generalization**.

---

## 1️⃣ Training Set

**Training Set** adalah bagian dataset yang digunakan untuk melatih model.

Pada tahap training, model diberikan:

```text
Input
+
Target
```

Kemudian model berusaha mempelajari hubungan antara keduanya.

Contoh:

```text
Luas Rumah
Jumlah Kamar
Lokasi
     ↓
Training
     ↓
Harga Rumah
```

Model mencoba menemukan pola dari data tersebut.

---

### Analogi Training Set

Training Set dapat dianalogikan sebagai **materi kuliah yang dipelajari mahasiswa selama semester**.

```text
Materi Kuliah
     ↓
Belajar
     ↓
Latihan
     ↓
Memahami konsep
```

Dalam Machine Learning:

```text
Training Data
     ↓
Training
     ↓
Model belajar
     ↓
Menemukan pola
```

---

### Contoh Training Set

Misalnya kita memiliki 100 data pasien.

Kita dapat menggunakan:

```text
70 pasien → Training Set
```

Model mempelajari pola dari 70 pasien tersebut.

```text
Training Data
      ↓
Machine Learning Algorithm
      ↓
Learned Model
```

---

## 2️⃣ Validation Set

**Validation Set** digunakan untuk membantu kita memilih dan menyempurnakan model.

Validation Set tidak digunakan sebagai data utama untuk melatih parameter model.

Data ini dapat digunakan untuk:

- membandingkan konfigurasi model,
- melakukan hyperparameter tuning,
- memilih model,
- menentukan threshold,
- dan melakukan eksperimen.

---

### Analogi Validation Set

Validation Set dapat dianalogikan sebagai **practice exam**.

Mahasiswa belajar dari materi:

```text
Materi
 ↓
Belajar
```

Kemudian melakukan:

```text
Practice Exam
 ↓
Mengetahui kelemahan
 ↓
Belajar kembali
```

Dalam Machine Learning:

```text
Training Set
 ↓
Training
 ↓
Validation Set
 ↓
Evaluasi
 ↓
Tuning
 ↓
Training kembali
```

---

### Contoh Validation Set

Jika terdapat 100 pasien:

```text
70 → Training
15 → Validation
15 → Test
```

Validation digunakan selama proses pengembangan model.

Misalnya:

```text
Model A → Validation Accuracy = 88%
Model B → Validation Accuracy = 92%
Model C → Validation Accuracy = 89%
```

Model B terlihat lebih baik berdasarkan validation set.

Kita kemudian dapat melakukan tuning terhadap Model B.

---

## 3️⃣ Test Set

**Test Set** digunakan untuk melakukan evaluasi akhir.

Test Set seharusnya dianggap sebagai data yang belum pernah dilihat model selama proses pengembangan.

Analogi sederhananya adalah:

> **Test Set = Final Exam**

Mahasiswa telah belajar dan melakukan practice exam.

Kemudian diberikan ujian akhir yang benar-benar baru.

```text
Learning
   ↓
Practice
   ↓
Final Exam
```

Dalam Machine Learning:

```text
Training
   ↓
Validation
   ↓
Final Test
```

---

### Mengapa Test Set Harus Dijaga?

Jika kita terus-menerus melihat hasil test set dan mengubah model berdasarkan hasil tersebut, test set secara tidak langsung menjadi bagian dari proses pengembangan.

Misalnya:

```text
Model A
↓
Test Accuracy = 85%

Perbaiki model

Model B
↓
Test Accuracy = 88%

Perbaiki lagi

Model C
↓
Test Accuracy = 91%
```

Jika proses tersebut dilakukan berulang kali, kita sebenarnya mulai menyesuaikan model berdasarkan test set.

Akibatnya, test set tidak lagi benar-benar menjadi data yang "belum pernah dilihat".

Karena itu, test set sebaiknya digunakan **di tahap akhir**.

---

## Pembagian Dataset

Pembagian yang umum digunakan adalah:

```text
Training    → 70–80%
Validation  → 10–15%
Test        → 10–15%
```

Namun angka tersebut bukan aturan mutlak.

Pembagian dapat disesuaikan dengan:

- ukuran dataset,
- jumlah data,
- jenis masalah,
- kebutuhan validasi,
- dan metode yang digunakan.

---

### Contoh Dataset 100 Data

Misalnya kita memiliki:

```text
100 pasien
```

Kita dapat membaginya menjadi:

```text
70 pasien → Training
15 pasien → Validation
15 pasien → Test
```

Visualisasinya:

```text
100 Data
│
├───────────────┤
│   Training    │ 70%
├───────┬───────┤
│Valid. │ Test  │
│ 15%   │ 15%   │
└───────┴───────┘
```

Yang paling penting bukan angka persisnya, tetapi **pemisahan data yang benar**.

---

## Data Harus Dipisahkan

Ketiga dataset harus memiliki fungsi yang berbeda.

```text
Training Set
→ Model belajar

Validation Set
→ Model dikembangkan dan dituning

Test Set
→ Model diuji secara final
```

Idealnya:

```text
Training ≠ Validation ≠ Test
```

Tidak boleh terjadi data yang sama muncul pada beberapa subset secara tidak semestinya.

---

## Shuffle Data

Sebelum membagi dataset, data biasanya perlu diacak atau **shuffle**.

Mengapa?

Karena urutan data pada dataset asli mungkin memiliki pola tertentu.

Misalnya dataset pasien disusun:

```text
Baris 1–70
→ Pasien dari Rumah Sakit A

Baris 71–100
→ Pasien dari Rumah Sakit B
```

Jika kita langsung mengambil:

```text
1–70 → Training
71–85 → Validation
86–100 → Test
```

hasilnya dapat menjadi bias karena setiap subset memiliki karakteristik berbeda.

Dengan melakukan shuffle:

```text
Dataset
   ↓
Shuffle
   ↓
Randomized Dataset
   ↓
Split
```

kita dapat memperoleh pembagian yang lebih representatif.

---

## Splitting Dataset dengan Scikit-learn

Scikit-learn menyediakan `train_test_split()` untuk membagi dataset.

Untuk dua subset:

```python
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

Pada contoh tersebut:

```text
80% → Training
20% → Test
```

---

## Membuat Tiga Dataset

Jika kita ingin membuat:

```text
70% Training
15% Validation
15% Test
```

kita dapat melakukan splitting sebanyak dua kali.

Pertama:

```python
X_train, X_temp, y_train, y_temp = train_test_split(
    X,
    y,
    test_size=0.30,
    random_state=42
)
```

Hasil:

```text
70% → Training
30% → Temporary
```

Kemudian temporary dataset dibagi lagi:

```python
X_val, X_test, y_val, y_test = train_test_split(
    X_temp,
    y_temp,
    test_size=0.50,
    random_state=42
)
```

Hasil akhirnya:

```text
70% → Training
15% → Validation
15% → Test
```

Visualisasi:

```text
Original Dataset
      │
      ├────────────── 70%
      │               ↓
      │           Training
      │
      └── 30%
          │
          ├── 15%
          │     ↓
          │  Validation
          │
          └── 15%
                ↓
              Test
```

---

## Menggunakan Stratify pada Classification

Untuk classification, kita sering ingin mempertahankan proporsi kelas ketika melakukan splitting.

Misalnya dataset:

```text
90% → Tidak Sakit
10% → Sakit
```

Kita ingin training, validation, dan test memiliki distribusi kelas yang relatif serupa.

Pada `train_test_split()`, kita dapat menggunakan parameter `stratify`.

Contoh:

```python
X_train, X_temp, y_train, y_temp = train_test_split(
    X,
    y,
    test_size=0.30,
    random_state=42,
    stratify=y
)
```

Kemudian:

```python
X_val, X_test, y_val, y_test = train_test_split(
    X_temp,
    y_temp,
    test_size=0.50,
    random_state=42,
    stratify=y_temp
)
```

`stratify` membantu mempertahankan proporsi kelas dalam setiap subset.

---

## Choosing and Training a Model

Setelah dataset dibagi, kita dapat memilih model.

Contoh classification:

```text
Logistic Regression
Decision Tree
Random Forest
KNN
SVM
```

Contoh regression:

```text
Linear Regression
Ridge
Lasso
Decision Tree Regressor
Random Forest Regressor
```

Pemilihan model bergantung pada masalah dan karakteristik data.

---

### Contoh Training Model

Misalnya kita menggunakan Random Forest:

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

Model belajar menggunakan:

```text
X_train
y_train
```

Bukan:

```text
X_val
y_val
X_test
y_test
```

---

## Evaluating pada Validation Set

Setelah training, model dapat dievaluasi menggunakan validation set.

```python
from sklearn.metrics import accuracy_score

y_val_pred = model.predict(X_val)

accuracy = accuracy_score(
    y_val,
    y_val_pred
)

print(f"Validation Accuracy: {accuracy:.2%}")
```

Validation set membantu kita mengetahui apakah konfigurasi model memberikan hasil yang baik.

---

## Tuning a Model

Model biasanya memiliki **hyperparameter**.

Contohnya Random Forest memiliki:

```python
RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    min_samples_split=2
)
```

Kita dapat mencoba beberapa konfigurasi.

Misalnya:

```text
Model A
n_estimators = 50

Model B
n_estimators = 100

Model C
n_estimators = 200
```

Kemudian membandingkan performanya pada validation set.

---

### Contoh Tuning Sederhana

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

for n in [50, 100, 200]:

    model = RandomForestClassifier(
        n_estimators=n,
        random_state=42
    )

    model.fit(X_train, y_train)

    y_val_pred = model.predict(X_val)

    score = accuracy_score(
        y_val,
        y_val_pred
    )

    print(
        f"n_estimators={n}, "
        f"accuracy={score:.2%}"
    )
```

Contoh hasil:

```text
n_estimators=50  → accuracy=88%
n_estimators=100 → accuracy=91%
n_estimators=200 → accuracy=92%
```

Kita dapat memilih konfigurasi berdasarkan hasil validation.

---

## Model Comparison

Kita tidak harus menggunakan satu algoritma saja.

Misalnya kita mencoba:

```text
Logistic Regression
Random Forest
KNN
```

Hasil validation:

| Model | Validation Accuracy |
|---|---:|
| Logistic Regression | 87% |
| Random Forest | 92% |
| KNN | 89% |

Berdasarkan validation set:

```text
Random Forest
```

memberikan hasil terbaik.

Tetapi proses belum selesai.

Kita masih harus melakukan evaluasi final menggunakan **test set**.

---

## Generalization

Salah satu tujuan utama pembagian dataset adalah mengukur kemampuan model melakukan **generalization**.

Generalization adalah kemampuan model untuk menghasilkan prediksi yang baik pada data baru yang belum pernah digunakan selama training.

Secara sederhana:

```text
Training Data
      ↓
Model belajar pola
      ↓
Unseen Data
      ↓
Model membuat prediksi
```

Model yang baik bukan model yang hanya menghafal training data.

Model yang baik harus mampu mengenali pola yang dapat diterapkan pada data baru.

---

## Memorization

**Memorization** terjadi ketika model terlalu menyesuaikan diri dengan data training sehingga tidak mampu bekerja dengan baik pada data baru.

Contoh:

```text
Training Accuracy = 99%
Validation Accuracy = 72%
```

Ada perbedaan yang sangat besar.

Hal tersebut dapat menjadi indikasi bahwa model mengalami **overfitting**.

Model sangat baik pada data yang digunakan untuk belajar, tetapi buruk pada data yang belum pernah dilihat.

---

## Generalization vs Memorization

Perbandingannya:

| Generalization | Memorization |
|---|---|
| Belajar pola umum | Menghafal pola spesifik |
| Bagus pada data baru | Buruk pada data baru |
| Training dan validation relatif konsisten | Training jauh lebih tinggi |
| Tujuan utama ML | Masalah yang perlu dihindari |

Contoh model yang melakukan generalization:

```text
Training Accuracy   = 91%
Validation Accuracy = 90%
Test Accuracy       = 90%
```

Performa relatif konsisten.

Contoh indikasi overfitting:

```text
Training Accuracy   = 99%
Validation Accuracy = 75%
Test Accuracy       = 73%
```

Model kemungkinan terlalu menyesuaikan diri terhadap training data.

---

## Data Leakage

Salah satu masalah serius dalam Machine Learning adalah **data leakage**.

Data leakage terjadi ketika informasi yang seharusnya tidak tersedia pada suatu tahap proses Machine Learning masuk ke dalam proses training atau pengembangan model.

Salah satu bentuk yang penting adalah ketika test data digunakan dalam proses pengembangan model.

Contoh yang salah:

```text
Training
   ↓
Test
   ↓
Lihat hasil
   ↓
Ubah model
   ↓
Test lagi
   ↓
Ubah model lagi
```

Jika dilakukan terus-menerus, test set tidak lagi benar-benar menjadi data yang belum diketahui.

---

### Contoh Data Leakage

Misalnya kita memiliki:

```text
100 data
```

Kemudian:

```text
70 → Training
15 → Validation
15 → Test
```

Proses yang benar:

```text
Training
   ↓
Validation
   ↓
Tuning
   ↓
Model Final
   ↓
Test
```

Proses yang tidak baik:

```text
Training
   ↓
Test
   ↓
Model diubah
   ↓
Test
   ↓
Model diubah
   ↓
Test
```

Test set seharusnya disimpan untuk evaluasi final.

---

## Test Set sebagai Final Exam

Cara mudah mengingat fungsi ketiga dataset:

```text
Training Set
→ Materi belajar

Validation Set
→ Practice exam

Test Set
→ Final exam
```

Atau:

```text
TRAIN
→ Belajar

VALIDATION
→ Memperbaiki

TEST
→ Membuktikan
```

Konsep ini sangat penting dalam Machine Learning.

---

### Contoh Lengkap Three Sets

Misalnya kita memiliki dataset:

```text
100 pasien
```

Setelah dilakukan shuffle:

```text
70 pasien
→ Training

15 pasien
→ Validation

15 pasien
→ Test
```

Kemudian:

```text
Training
    ↓
Model belajar
    ↓
Validation
    ↓
Tuning
    ↓
Model final
    ↓
Test
    ↓
Final Performance
```

Ketiga dataset tetap terpisah.

---

## Workflow Modelling Lengkap

Jika digabungkan dengan proses modelling, workflow dapat menjadi:

```text
Dataset
   ↓
Shuffle
   ↓
Train / Validation / Test
   ↓
Choose Model
   ↓
Train
   ↓
Validation
   ↓
Tune
   ↓
Compare
   ↓
Final Model
   ↓
Test
   ↓
Final Evaluation
```

Jika hasil akhir belum memenuhi target:

```text
Final Evaluation
       ↓
Target belum tercapai
       ↓
Experimentation
       ↓
Feature / Model / Hyperparameter
       ↓
Training kembali
       ↓
Validation kembali
       ↓
Final Test
```

---

### Contoh Workflow dengan Python

Berikut contoh sederhana classification menggunakan Scikit-learn.

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load dataset
data = load_iris()

X = data.data
y = data.target

# Split training dan temporary
X_train, X_temp, y_train, y_temp = train_test_split(
    X,
    y,
    test_size=0.30,
    random_state=42,
    stratify=y
)

# Split validation dan test
X_val, X_test, y_val, y_test = train_test_split(
    X_temp,
    y_temp,
    test_size=0.50,
    random_state=42,
    stratify=y_temp
)

# Create model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

# Training
model.fit(
    X_train,
    y_train
)

# Validation
y_val_pred = model.predict(X_val)

val_accuracy = accuracy_score(
    y_val,
    y_val_pred
)

print(
    f"Validation Accuracy: "
    f"{val_accuracy:.2%}"
)

# Final test
y_test_pred = model.predict(X_test)

test_accuracy = accuracy_score(
    y_test,
    y_test_pred
)

print(
    f"Test Accuracy: "
    f"{test_accuracy:.2%}"
)
```

Perhatikan bahwa model dilatih menggunakan:

```text
X_train
y_train
```

Validation digunakan untuk pengembangan model:

```text
X_val
y_val
```

Sedangkan test digunakan untuk evaluasi akhir:

```text
X_test
y_test
```

---

## Kapan Validation Set Tidak Digunakan Secara Eksplisit?

Tidak semua proyek harus selalu memiliki file atau subset validation yang terpisah.

Pada dataset tertentu, terutama ketika jumlah data terbatas, kita dapat menggunakan **cross-validation**.

Konsepnya:

```text
Dataset
   ↓
Beberapa pembagian
   ↓
Training + Validation
   ↓
Evaluasi berkali-kali
   ↓
Rata-rata performa
```

Dengan cross-validation, kita dapat menggunakan data secara lebih efisien untuk proses pengembangan model.

Namun konsep dasarnya tetap sama:

> Data yang digunakan untuk memilih atau tuning model harus dipisahkan dari data yang digunakan untuk evaluasi final.

---

## Mengapa Tidak Menggunakan Test Set untuk Tuning?

Misalnya kita mencoba beberapa model:

```text
Model A → Test = 85%
Model B → Test = 88%
Model C → Test = 91%
Model D → Test = 93%
```

Jika kita memilih Model D karena melihat hasil test, kemudian terus mencoba model lain berdasarkan test score, maka test set mulai memengaruhi keputusan kita.

Akibatnya estimasi performa final dapat menjadi terlalu optimistis.

Lebih baik:

```text
Training
   ↓
Validation
   ↓
Model Selection
   ↓
Hyperparameter Tuning
   ↓
Final Model
   ↓
Test sekali
```

---

## Prinsip Penting Three Sets

Ada beberapa prinsip yang perlu selalu diingat.

### Training Set untuk Belajar

```text
Training
→ Model belajar parameter dari data.
```

---

### Validation Set untuk Pengembangan

```text
Validation
→ Membantu memilih model dan konfigurasi.
```

---

### Test Set untuk Evaluasi Akhir

```text
Test
→ Mengukur performa final pada data yang belum digunakan dalam pengembangan.
```

---

### Jangan Mencampurkan Data

Hindari situasi seperti:

```text
Training ← Test Data
Validation ← Test Data
Test ← Training Data
```

Ketiga subset harus memiliki fungsi yang jelas.

---

## Checklist Modelling

Sebelum melanjutkan ke tahap berikutnya, pastikan:

```text
□ Dataset sudah dipahami
□ Data sudah diacak jika diperlukan
□ Training set sudah dipisahkan
□ Validation set sudah dipisahkan jika diperlukan
□ Test set sudah dipisahkan
□ Test set tidak digunakan untuk tuning
□ Model sudah dipilih berdasarkan masalah
□ Model sudah dilatih menggunakan training set
□ Validation digunakan untuk pengembangan
□ Beberapa model dapat dibandingkan
□ Hyperparameter dapat dituning
□ Final model diuji menggunakan test set
```

---

## Ringkasan

**Modelling** adalah tahap ketika kita mulai memilih, melatih, menyesuaikan, dan membandingkan model Machine Learning.

Tiga aktivitas utamanya adalah:

```text
1. Choosing and Training a Model
2. Tuning a Model
3. Model Comparison
```

Salah satu konsep terpenting dalam modelling adalah pembagian data menjadi tiga bagian:

```text
Dataset
│
├── Training Set
│   → Belajar
│
├── Validation Set
│   → Tuning dan pengembangan
│
└── Test Set
    → Evaluasi akhir
```

Pembagian umum:

```text
Training    → 70–80%
Validation  → 10–15%
Test        → 10–15%
```

Namun proporsi tersebut dapat disesuaikan dengan kondisi dataset.

Tujuan utama pembagian tersebut adalah agar model mampu melakukan **generalization**, bukan sekadar melakukan **memorization**.

```text
Generalization
→ Belajar pola yang dapat digunakan pada data baru.

Memorization
→ Terlalu menyesuaikan diri dengan data yang sudah dilihat.
```

Kita juga harus berhati-hati terhadap **data leakage**, terutama ketika test set digunakan selama proses pengembangan model.

Cara mudah mengingat:

> **Training = belajar**

> **Validation = latihan dan memperbaiki**

> **Test = ujian akhir**

Dengan memahami konsep ini, kita memiliki fondasi penting untuk masuk ke pembahasan berikutnya mengenai **pemilihan model, baseline model, training model, dan bagaimana membandingkan beberapa algoritma Machine Learning secara sistematis.**
