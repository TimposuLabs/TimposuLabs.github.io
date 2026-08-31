---
sidebar_position: 10
title: "Machine Learning Workflow"
---

## Machine Learning Workflow dengan Scikit-Learn

Setelah memahami konsep dasar Machine Learning, kategori pembelajaran, serta tahapan workflow Machine Learning, langkah berikutnya adalah menerapkannya menggunakan **scikit-learn**.

Pada materi ini, kita akan menggunakan **Iris Dataset**, salah satu dataset yang umum digunakan untuk mempelajari konsep **Supervised Learning**, khususnya **Classification**.

Workflow yang akan digunakan terdiri dari enam langkah utama:

```text
Import Data
     ↓
Clean Data
     ↓
Split Data
     ↓
Create Model
     ↓
Check Output
     ↓
  Improve
```

---

## Enam Langkah Utama Machine Learning

### 1. Import the Data

Langkah pertama adalah mengambil atau memuat dataset yang akan digunakan.

Data dapat berasal dari berbagai sumber, seperti:

- CSV
- Database
- API
- Dataset dari Kaggle
- Dataset yang disediakan oleh library

Pada contoh ini, dataset Iris sudah tersedia melalui `scikit-learn`.

---

### 2. Clean the Data

Data yang diperoleh dari dunia nyata biasanya perlu dibersihkan terlebih dahulu.

Proses *data cleaning* dapat mencakup:

- Menangani *missing values*.
- Memperbaiki format data.
- Menghapus data yang tidak valid.
- Mengubah tipe data.
- Melakukan transformasi data.

Pada dataset Iris, proses cleaning relatif sederhana karena dataset sudah disiapkan dalam format yang dapat langsung digunakan untuk latihan.

---

### 3. Split Data

Dataset perlu dibagi menjadi dua bagian:

```text
Training Set
     +
Test Set
```

**Training Set** digunakan untuk membuat model belajar dari data.

**Test Set** digunakan untuk mengetahui seberapa baik model bekerja terhadap data yang belum digunakan saat proses training.

Contoh pembagian:

```text
Dataset
   │
   ├── 60% → Training Data
   │
   └── 40% → Testing Data
```

Pembagian data dapat dilakukan menggunakan fungsi:

```python
train_test_split()
```

---

### 4. Create a Model

Setelah data dipersiapkan dan dibagi, langkah berikutnya adalah membuat model Machine Learning.

Dalam praktiknya, kita tidak selalu perlu membuat algoritma Machine Learning dari awal.

Library **scikit-learn** menyediakan berbagai algoritma yang dapat digunakan untuk membuat model.

Contohnya:

- Decision Tree
- K-Nearest Neighbors
- Linear Regression
- Random Forest
- Support Vector Machine

Model yang dipilih bergantung pada jenis permasalahan dan karakteristik data.

---

### 5. Check the Output

Setelah model dibuat dan dilatih, model perlu diuji menggunakan **Test Set**.

Tujuannya adalah mengetahui apakah model dapat menghasilkan prediksi yang benar terhadap data yang belum pernah digunakan untuk training.

Secara sederhana:

```text
Test Data
    ↓
Machine Learning Model
    ↓
Prediction
    ↓
Compare dengan Label Asli
```

Hasil perbandingan tersebut kemudian digunakan untuk mengukur performa model.

---

### 6. Improve

Model pertama yang dibuat belum tentu menghasilkan performa terbaik.

Jika hasil evaluasi belum memuaskan, kita dapat melakukan proses **improvement**.

Beberapa pendekatan yang dapat dilakukan antara lain:

- Menggunakan algoritma yang berbeda.
- Mengubah fitur yang digunakan.
- Menambahkan fitur.
- Mengubah parameter model.
- Menggunakan data yang lebih baik.
- Melakukan preprocessing tambahan.

Proses ini merupakan bagian dari eksperimen dalam Machine Learning.

---

## Mengenal Iris Dataset

**Iris Dataset** merupakan dataset yang berisi informasi mengenai bunga Iris.

Dataset ini digunakan untuk melakukan klasifikasi tiga spesies bunga:

```text
Iris setosa
Iris versicolor
Iris virginica
```

Dalam dataset, ketiga kelas tersebut direpresentasikan menggunakan angka:

| Label | Spesies |
| --- | --- |
| `0` | Iris setosa |
| `1` | Iris versicolor |
| `2` | Iris virginica |

Karena dataset memiliki label atau jawaban yang sudah diketahui, Iris Dataset termasuk **Supervised Learning**.

---

## Features dan Target

Dalam Machine Learning terdapat dua istilah penting:

```text
X → Features / Input
y → Target / Label
```

### Features (`X`)

Features adalah informasi yang digunakan model untuk membuat prediksi.

Pada Iris Dataset terdapat empat fitur:

```text
Sepal Length
Sepal Width
Petal Length
Petal Width
```

Secara sederhana:

```text
X
│
├── Sepal Length
├── Sepal Width
├── Petal Length
└── Petal Width
```

---

### Target (`y`)

Target merupakan jawaban yang ingin diprediksi oleh model.

Pada dataset Iris:

```text
0 → Iris setosa
1 → Iris versicolor
2 → Iris virginica
```

Sehingga model akan mencoba mempelajari hubungan antara:

```text
Features (X)
      ↓
   Model ML
      ↓
Target (y)
```

---

### Ringkasan `X` dan `y`

Sederhananya:

```text
X = informasi yang diberikan kepada model
y = jawaban yang ingin dipelajari model
```

Dalam Machine Learning:

* `X` = Features (fitur/input)
* `y` = Target/Label (output/jawaban)

---

## Mengimpor Dataset Iris

Dataset Iris dapat diambil langsung dari `scikit-learn`.

```python
from sklearn.datasets import load_iris
```

Kemudian dataset dimuat:

```python
iris = load_iris()
```

Objek `iris` sekarang berisi berbagai informasi mengenai dataset.

---

## Mengambil Features dan Target

Kita dapat mengambil data fitur dan target:

```python
X = iris.data
y = iris.target
```

Konvensi yang umum digunakan dalam Machine Learning adalah:

```text
X → input/features
y → output/target
```

Selain data tersebut, kita juga dapat mengambil nama fitur dan nama target:

```python
feature_names = iris.feature_names
target_names = iris.target_names
```

---

## Memahami Struktur Data

Data `X` pada scikit-learn disimpan dalam bentuk **NumPy Array**.

Karena Iris Dataset memiliki:

```text
150 data
4 features
```

maka bentuk `X` adalah:

```text
(150, 4)
```

Artinya:

```text
150 → jumlah data/baris
4   → jumlah fitur/kolom
```

Sedangkan `y` berisi label untuk setiap data.

---

## Membagi Dataset dengan `train_test_split`

Untuk membagi dataset menjadi data training dan testing, kita dapat menggunakan:

```python
from sklearn.model_selection import train_test_split
```

Kemudian:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.4
)
```

Parameter:

```python
test_size=0.4
```

berarti 40% data digunakan sebagai data testing.

Dengan demikian:

```text
60% → Training Set
40% → Test Set
```

---

## Memeriksa Ukuran Data

Kita dapat menggunakan `.shape` untuk mengetahui ukuran masing-masing dataset.

```python
print(X_train.shape)
print(X_test.shape)
```

Dengan dataset Iris dan `test_size=0.4`, secara umum hasilnya:

```text
X_train → (90, 4)
X_test  → (60, 4)
```

Artinya:

```text
X_train
90 data × 4 features

X_test
60 data × 4 features
```

---

## Memahami Empat Variabel Hasil Split

Perhatikan hasil berikut:

```python
X_train, X_test, y_train, y_test
```

Masing-masing memiliki fungsi:

| Variabel | Isi | Kegunaan |
| --- | --- | --- |
| `X_train` | Features data training | Input untuk training |
| `X_test` | Features data testing | Input untuk testing |
| `y_train` | Target data training | Jawaban saat training |
| `y_test` | Target data testing | Jawaban untuk evaluasi |

Hubungannya dapat digambarkan:

```text
Training
┌──────────────┬──────────────┐
│   X_train    │   y_train    │
│   Features   │    Target    │
└──────────────┴──────────────┘
        ↓
   Model Training


Testing
┌──────────────┬──────────────┐
│    X_test    │    y_test    │
│   Features   │    Target    │
└──────────────┴──────────────┘
        ↓
  Model Evaluation
```

---

## Implementasi Tahap Import dan Split

Berikut implementasi tahap awal workflow:

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# Load dataset
iris = load_iris()

# Features dan target
X = iris.data       # X = Features (fitur/input), informasi yang diberikan kepada model
y = iris.target     # y = Target/Label (output/jawaban), jawaban yang ingin dipelajari model

# Informasi dataset
feature_names = iris.feature_names
target_names = iris.target_names

# Membagi dataset menjadi data training dan data testing
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.4
)

# Memeriksa ukuran data
print("Training data:", X_train.shape)
print("Testing data :", X_test.shape)
```

---

## Mengapa Data Harus Dibagi?

Salah satu alasan utama membagi data adalah agar kita dapat mengetahui kemampuan model terhadap **data yang belum pernah digunakan saat training**.

Jika model diuji menggunakan data yang sama dengan data training, hasil evaluasi dapat memberikan gambaran yang kurang tepat mengenai kemampuan model terhadap data baru.

Konsep sederhananya:

```text
Training Data
     ↓
Model belajar
     ↓
Test Data
     ↓
Model diuji
```

Dengan demikian, test set berfungsi sebagai data untuk mengevaluasi kemampuan generalisasi model.

---

## Proporsi Training dan Testing

Tidak ada satu rasio yang selalu cocok untuk semua dataset.

Beberapa pembagian yang umum digunakan:

```text
70 : 30
80 : 20
60 : 40
```

Misalnya:

```text
80% Training
20% Testing
```

atau:

```text
70% Training
30% Testing
```

Pemilihan proporsi bergantung pada jumlah data dan kebutuhan eksperimen.

Pada materi ini digunakan:

```text
60% Training
40% Testing
```

karena `test_size=0.4`.

---

## Iris Dataset sebagai Supervised Learning

Iris Dataset termasuk **Supervised Learning** karena setiap data memiliki target atau label.

Contohnya:

```text
Features
┌───────────────────────────────────────┐
│ Sepal Length                          │
│ Sepal Width                           │
│ Petal Length                          │
│ Petal Width                           │
└───────────────────────────────────────┘
                  ↓
              Model ML
                  ↓
              Prediction
                  ↓
              Class/Label
```

Model belajar berdasarkan pasangan:

```text
Input → Output
```

atau:

```text
X → y
```

---

## Konsep Penting

### `X` dan `y`

Dalam banyak implementasi Machine Learning menggunakan Python, kita akan sering menemukan:

```python
X = ...
y = ...
```

Gunakan cara berpikir:

```text
X = data yang digunakan untuk membuat prediksi
y = jawaban yang ingin diprediksi
```

---

### Training Data

Training data digunakan untuk membuat model belajar.

```text
X_train + y_train
        ↓
     Training
        ↓
      Model
```

---

### Test Data

Test data digunakan untuk mengevaluasi model.

```text
X_test
  ↓
Model
  ↓
Prediction
  ↓
Compare
  ↑
y_test
```

---

### NumPy Array

Dataset yang digunakan oleh scikit-learn umumnya direpresentasikan menggunakan struktur data NumPy seperti array multidimensi.

Contoh:

```text
X.shape

(150, 4)
```

Struktur tersebut menunjukkan jumlah data dan jumlah fitur.

---

## Workflow Machine Learning Lengkap

Dengan materi yang sudah dipelajari, workflow Machine Learning dapat digambarkan sebagai berikut:

```text
1. Import Data
       ↓
2. Clean Data
       ↓
3. Split Data
       ↓
4. Create Model
       ↓
5. Check Output
       ↓
6. Improve
```

Pada materi Iris Dataset, kita baru menerapkan bagian awal:

```text
Import Data
     ↓
Memahami X dan y
     ↓
Split Training & Testing
```

Tahap berikutnya adalah menggunakan `X_train` dan `y_train` untuk **melatih model Machine Learning**, kemudian menggunakan `X_test` dan `y_test` untuk mengevaluasi hasilnya.

---

## Ringkasan

Pada materi ini kita mempelajari workflow Machine Learning sederhana menggunakan scikit-learn.

Konsep utama:

- Machine Learning dapat dilakukan melalui workflow yang sistematis.
- Workflow dasar terdiri dari enam tahap: **Import, Clean, Split, Create, Check, Improve**.
- **Iris Dataset** merupakan contoh dataset untuk Supervised Learning.
- Iris memiliki tiga kelas: `setosa`, `versicolor`, dan `virginica`.
- Dataset memiliki empat features: `sepal length`, `sepal width`, `petal length`, dan `petal width`.
- `X` digunakan untuk merepresentasikan features/input.
- `y` digunakan untuk merepresentasikan target/label.
- `train_test_split()` digunakan untuk membagi data menjadi training dan testing.
- `test_size=0.4` menghasilkan pembagian 60% training dan 40% testing.
- Data pada scikit-learn umumnya menggunakan struktur NumPy Array.

---

## Kesimpulan

Machine Learning tidak dimulai langsung dari pembuatan model.

Sebelum model dibuat, kita perlu memahami data yang akan digunakan dan mempersiapkannya dengan benar.

Pada Iris Dataset, proses awalnya adalah:

```text
Iris Dataset
     ↓
X = Features
y = Target
     ↓
train_test_split()
     ↓
┌───────────────┐
│ Training Data │
│ X_train       │
│ y_train       │
└───────────────┘
        +
┌───────────────┐
│ Testing Data  │
│ X_test        │
│ y_test        │
└───────────────┘
```

Setelah tahap ini selesai, kita sudah memiliki data yang siap digunakan untuk **[membangun dan melatih model Machine Learning](/python/python-machine-learning/model-training)**.

:::tip
**Baca Dokumentasi Lengkap:** https://scikit-learn.org/stable/user_guide.html
:::