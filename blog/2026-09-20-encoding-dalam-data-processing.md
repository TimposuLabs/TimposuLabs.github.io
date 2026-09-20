---
slug: encoding-dalam-data-processing
title: "Encoding Data dalam Data Preprocessing"
authors: topekox
tags: [manchine learning, data mining, ai, deep learning, data science, python]
---

Encoding adalah salah satu tahap penting dalam **data preprocessing** yang digunakan untuk mengubah data kategorikal menjadi bentuk numerik sehingga dapat diproses oleh algoritma Machine Learning.

## 1. Apa Itu Encoding?

Secara sederhana, **encoding adalah proses mengubah data kategorikal menjadi representasi numerik**.

Contoh:

```text
Sex
----
male
female
male
female
```

menjadi:

```text
Sex
----
0
1
0
1
```

<!-- truncate -->

Dengan Pandas:

```python
df["Sex"] = df["Sex"].map({
    "male": 0,
    "female": 1
})
```

## 2. Mengapa Encoding Diperlukan?

Banyak algoritma Machine Learning bekerja dengan data numerik. Data kategorikal seperti `male`, `female`, `C`, `Q`, dan `S` perlu direpresentasikan dalam bentuk yang dapat diproses model.

Alur sederhananya:

```text
Data kategorikal
       ↓
    Encoding
       ↓
Data numerik
       ↓
Machine Learning
```

## 3. Jenis Data Kategorikal

Secara umum terdapat dua jenis data kategorikal:

1. **Nominal**
2. **Ordinal**

Pemilihan metode encoding harus mempertimbangkan jenis kategori tersebut.

## 4. Categorical Nominal

Data nominal adalah kategori yang **tidak memiliki urutan atau tingkatan**.

Contoh:

```text
Color
-----
Red
Blue
Green
```

Tidak ada konsep bahwa:

```text
Red < Blue < Green
```

Contoh lain:

```text
City
Country
Nationality
Color
Embarked
```

Untuk data nominal, **One-Hot Encoding** biasanya lebih sesuai.

## 5. Categorical Ordinal

Data ordinal adalah kategori yang memiliki **urutan atau tingkatan**.

Contoh:

```text
Satisfaction
------------
Low
Medium
High
```

Dapat direpresentasikan:

```text
Low      → 0
Medium   → 1
High     → 2
```

Ini disebut **ordinal encoding**.

## 6. Binary Encoding untuk Kategori Biner

Jika sebuah fitur hanya mempunyai dua kategori, kita dapat menggunakan representasi biner.

Contoh Titanic:

```text
Sex
----
male
female
```

Dapat dipetakan:

```text
male   → 0
female → 1
```

Dengan Pandas:

```python
df["Sex"] = df["Sex"].map({
    "male": 0,
    "female": 1
})
```

Pemetaan tersebut tidak berarti `female` lebih tinggi daripada `male`. Angka hanya digunakan sebagai representasi kategori.

## 7. Fungsi `map()` pada Pandas

`map()` digunakan untuk mengganti nilai berdasarkan pasangan key-value.

```python
df["Sex"] = df["Sex"].map({
    "male": 0,
    "female": 1
})
```

Penting:

> `map()` adalah alat untuk melakukan pemetaan. Jenis encoding ditentukan oleh bagaimana kita merancang pemetaannya.

Contoh ordinal:

```python
df["Education"] = df["Education"].map({
    "Elementary": 0,
    "High School": 1,
    "Bachelor": 2,
    "Master": 3
})
```

## 8. Mapping yang Tidak Lengkap

Jika mapping tidak mencakup semua kategori:

```python
df["Sex"] = df["Sex"].map({
    "male": 0
})
```

dan data memiliki `female`, maka hasil `female` akan menjadi `NaN`.

Sebelum melakukan mapping, periksa kategori:

```python
df["Sex"].unique()
```

atau:

```python
df["Sex"].value_counts()
```

## 9. One-Hot Encoding

One-Hot Encoding mengubah setiap kategori menjadi kolom biner.

Misalnya:

```text
Embarked
--------
C
Q
S
```

menjadi:

```text
Embarked_C    Embarked_Q    Embarked_S
     1             0             0
     0             1             0
     0             0             1
```

Nilai `1` berarti data termasuk kategori tersebut, sedangkan `0` berarti tidak termasuk.

## 10. One-Hot Encoding dengan Pandas

Gunakan:

```python
pd.get_dummies(df["Embarked"])
```

Jika ingin hasil integer:

```python
pd.get_dummies(
    df["Embarked"],
    dtype=int
)
```

Contoh hasil:

```text
   C  Q  S
0  0  0  1
1  1  0  0
2  0  1  0
```

## 11. Cara Membaca One-Hot Encoding

Jika kolomnya:

```text
C  Q  S
```

maka:

```text
C → 1 0 0
Q → 0 1 0
S → 0 0 1
```

Misalnya:

```text
C = 0
Q = 0
S = 1
```

berarti:

```text
Embarked = S
```

Angka `1` bukan menunjukkan nilai atau tingkatan kategori. Angka tersebut hanya menunjukkan keanggotaan kategori.

## 12. Urutan Kolom pada One-Hot Encoding

Jangan menganggap urutan hasil `unique()` selalu sama dengan urutan kolom One-Hot Encoding.

Misalnya:

```python
df["Embarked"].unique()
```

menghasilkan:

```text
['S', 'C', 'Q', nan]
```

tetapi:

```python
pd.get_dummies(df["Embarked"])
```

dapat menghasilkan kolom:

```text
C
Q
S
```

Maka representasi mengikuti **urutan kolom hasil encoding**.

Selalu periksa nama kolom hasil encoding.

## 13. One-Hot Encoding untuk Beberapa Kolom

Kita dapat melakukan encoding beberapa kolom sekaligus:

```python
df = pd.get_dummies(
    df,
    columns=["Sex", "Embarked"],
    dtype=int
)
```

Contoh hasil:

```text
Sex_female    Sex_male    Embarked_C    Embarked_Q    Embarked_S
     0            1            0             0             1
     1            0            1             0             0
     0            1            0             1             0
```

## 14. One-Hot Encoding dan `drop_first=True`

Kita dapat menggunakan:

```python
pd.get_dummies(
    df,
    columns=["Embarked"],
    drop_first=True,
    dtype=int
)
```

Jika kategori adalah `C`, `Q`, dan `S`, satu kolom dapat dihilangkan.

Misalnya tersisa:

```text
Embarked_Q
Embarked_S
```

Kategori yang tidak muncul menjadi **kategori referensi**.

## 15. Mengapa Satu Kolom Bisa Dihilangkan?

Misalnya:

```text
Embarked_Q    Embarked_S
     0             0
```

maka kita dapat menyimpulkan kategori yang tersisa adalah `C`.

Informasi kategori `C` tidak hilang. `C` menjadi kategori referensi.

`drop_first=True` sering digunakan pada model tertentu, terutama model linear, untuk mengurangi redundansi antar dummy variables.

## 16. Ordinal Encoding

Untuk kategori yang mempunyai tingkatan:

```text
Low
Medium
High
```

dapat direpresentasikan sebagai:

```text
Low      → 0
Medium   → 1
High     → 2
```

Contoh:

```python
df["Level"] = df["Level"].map({
    "Low": 0,
    "Medium": 1,
    "High": 2
})
```

Berbeda dengan One-Hot Encoding, angka pada ordinal encoding memang merepresentasikan urutan kategori.

## 17. Jangan Sembarangan Memberikan Angka pada Data Nominal

Misalnya:

```text
Color
-----
Red
Blue
Green
```

Jangan langsung menganggap:

```text
Red   → 0
Blue  → 1
Green → 2
```

karena representasi tersebut dapat memberikan kesan adanya urutan atau jarak antar kategori.

Untuk kategori nominal, One-Hot Encoding biasanya lebih sesuai:

```text
Color_Red    Color_Blue    Color_Green
     1            0             0
     0            1             0
     0            0             1
```

## 18. Perbandingan Metode Encoding

| Metode | Cocok untuk | Contoh |
|---|---|---|
| Binary Mapping | Dua kategori | Male/Female |
| One-Hot Encoding | Kategori nominal | City, Color |
| Ordinal Encoding | Kategori berurutan | Low/Medium/High |
| Label Encoding | Umumnya untuk target/label | Class A/Class B |
| Target Encoding | Kategori dengan banyak nilai | Club, Nationality |

Pemilihan metode encoding harus mempertimbangkan jenis kategori, jumlah kategori, dan algoritma yang digunakan.

## 19. Label Encoding

Label Encoding memberikan angka pada setiap kategori.

Contoh:

```text
Class
-----
Cat
Dog
Bird
```

dapat menjadi:

```text
Bird → 0
Cat  → 1
Dog  → 2
```

Untuk fitur input, cara ini perlu digunakan dengan hati-hati karena angka dapat terlihat seperti memiliki hubungan ordinal.

Untuk target klasifikasi, representasi seperti:

```text
Normal   → 0
Abnormal → 1
```

umumnya lebih sesuai sebagai label kelas.

## 20. Encoding Target dan Encoding Feature

Bedakan:

```text
Feature
   ↓
X
```

dan:

```text
Target
   ↓
y
```

Pada Titanic:

```text
Sex
Embarked
Pclass
Age
Fare
    ↓
Features (X)

Survived
    ↓
Target (y)
```

Encoding feature:

```text
male   → 0
female → 1
```

Encoding target:

```text
No  → 0
Yes → 1
```

## 21. Encoding pada Dataset Titanic

Data awal:

```text
   Sex     Embarked
0  male       S
1  female     C
2  female     S
3  male       Q
```

### Step 1 - Encoding `Sex`

```python
df["Sex"] = df["Sex"].map({
    "male": 0,
    "female": 1
})
```

### Step 2 - One-Hot Encoding `Embarked`

```python
df = pd.get_dummies(
    df,
    columns=["Embarked"],
    dtype=int
)
```

Hasil:

```text
   Sex  Embarked_C  Embarked_Q  Embarked_S
0   0       0           0           1
1   1       1           0           0
2   1       0           0           1
3   0       0           1           0
```

## 22. Menentukan Kolom yang Membutuhkan Encoding

Periksa tipe data:

```python
df.info()
```

atau:

```python
df.dtypes
```

Misalnya:

```text
Age          float64
Fare         float64
Sex           object
Embarked      object
Survived       int64
```

Maka:

```text
Age       → numerik
Fare      → numerik
Sex       → kategorikal
Embarked  → kategorikal
Survived  → numerik
```

Kandidat encoding:

```text
Sex
Embarked
```

## 23. Tidak Semua `object` Harus Di-One-Hot

Tipe `object` sering menunjukkan teks atau kategori, tetapi tidak berarti semua kolom `object` harus langsung di-One-Hot.

Contoh Titanic:

```text
Name
Ticket
Cabin
```

dapat mempunyai banyak nilai unik.

Jangan langsung melakukan:

```python
pd.get_dummies(df["Name"])
```

Pahami terlebih dahulu makna kolom dan cardinality-nya.

## 24. High Cardinality

High cardinality berarti sebuah fitur memiliki banyak kategori unik.

Contoh pada dataset FIFA:

```text
Club
Nationality
```

Jika One-Hot Encoding digunakan secara langsung pada ratusan kategori, jumlah kolom dapat menjadi sangat besar:

```text
Club_1
Club_2
Club_3
...
Club_500
```

Karena itu, fitur dengan cardinality tinggi perlu dipertimbangkan secara khusus.

## 25. Encoding pada Dataset FIFA

Misalnya:

```text
Preferred Foot
---------------
Left
Right
```

dapat dipetakan:

```python
df["Preferred Foot"] = df["Preferred Foot"].map({
    "Left": 0,
    "Right": 1
})
```

Sedangkan `Position` dapat memiliki banyak kategori:

```text
ST
CM
CB
GK
LW
RW
...
```

One-Hot Encoding dapat digunakan:

```python
df = pd.get_dummies(
    df,
    columns=["Position"],
    dtype=int
)
```

Untuk kategori yang sangat banyak, pertimbangkan strategi encoding lainnya.

## 26. Encoding Bukan Sekadar Mengubah Teks Menjadi Angka

Encoding bukan sekadar:

```text
text → number
```

Kita perlu memahami karakteristik kategori:

```text
Kategori?
    │
    ├── Hanya 2 kategori
    │       ↓
    │   Binary Mapping
    │
    ├── Tidak memiliki urutan
    │       ↓
    │   One-Hot Encoding
    │
    ├── Memiliki urutan
    │       ↓
    │   Ordinal Encoding
    │
    └── Sangat banyak kategori
            ↓
        Pertimbangkan strategi
        encoding lainnya
```

## 27. Encoding dan Feature Engineering

Encoding juga dapat menghasilkan representasi fitur baru.

Contoh:

```text
Sex
----
male
female
```

menjadi:

```text
Sex
---
0
1
```

Sedangkan:

```text
Embarked
--------
C
Q
S
```

menjadi:

```text
Embarked_C
Embarked_Q
Embarked_S
```

## 28. Encoding Harus Konsisten

Preprocessing pada data training dan data baru harus konsisten.

Misalnya saat training:

```text
male   → 0
female → 1
```

maka data baru harus menggunakan aturan yang sama.

Jangan sampai pada production menjadi:

```text
male   → 1
female → 0
```

Model yang dilatih dengan satu aturan encoding harus menerima data dengan representasi yang sama.

## 29. Encoding dalam Machine Learning

Alur sederhananya:

```text
Data Mentah
    ↓
Data Cleaning
    ↓
Encoding
    ↓
Feature Engineering
    ↓
Feature Selection
    ↓
Train/Test Split
    ↓
Model Training
    ↓
Evaluation
```

Dalam production:

```text
Input User
    ↓
Preprocessing
    ↓
Encoding
    ↓
Model
    ↓
Prediction
```

User dapat memasukkan data yang mudah dipahami:

```text
Sex = "female"
Embarked = "S"
Age = 25
Fare = 50
```

Preprocessing mengubahnya menjadi representasi yang dibutuhkan model.

## 30. Menggunakan `sklearn` untuk Encoding

Untuk proyek Machine Learning, kita dapat menggunakan encoder dari Scikit-learn.

Contoh:

```python
from sklearn.preprocessing import OneHotEncoder

encoder = OneHotEncoder(
    handle_unknown="ignore"
)
```

Encoder dipelajari dari data training:

```python
encoder.fit(X_train[["Embarked"]])
```

Kemudian digunakan untuk transformasi:

```python
X_train_encoded = encoder.transform(
    X_train[["Embarked"]]
)
```

Data baru menggunakan encoder yang sama:

```python
X_new_encoded = encoder.transform(
    X_new[["Embarked"]]
)
```

## 31. Mengapa `handle_unknown="ignore"` Berguna?

Misalnya data training hanya memiliki:

```text
C
Q
S
```

tetapi data baru mempunyai kategori yang tidak dikenal.

Dengan:

```python
OneHotEncoder(
    handle_unknown="ignore"
)
```

encoder dapat menangani kategori yang tidak dikenal tanpa menyebabkan proses transformasi gagal.

## 32. Encoding dengan Pipeline

Preprocessing dapat digabungkan menggunakan Pipeline.

Contoh:

```python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline

categorical_features = [
    "Sex",
    "Embarked"
]

preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(
                handle_unknown="ignore"
            ),
            categorical_features
        )
    ]
)
```

Konsepnya:

```text
Raw Data
   ↓
Preprocessor
   ↓
Encoding
   ↓
Model
   ↓
Prediction
```

Pendekatan ini membantu menjaga preprocessing tetap konsisten dan mudah digunakan kembali.

## 33. Kesalahan yang Sering Terjadi

### Kesalahan 1 - Menganggap semua kategori harus menjadi 0, 1, 2

Tidak selalu benar.

```text
Red   → 0
Blue  → 1
Green → 2
```

dapat memberikan kesan adanya urutan.

### Kesalahan 2 - Menganggap `map()` otomatis melakukan ordinal encoding

Tidak.

```python
df["Sex"].map({
    "male": 0,
    "female": 1
})
```

hanya melakukan mapping. Makna angka ditentukan oleh kita.

### Kesalahan 3 - Menggunakan `df.get_dummies()`

Ini salah:

```python
df.get_dummies()
```

Gunakan:

```python
pd.get_dummies(df)
```

### Kesalahan 4 - Tidak memeriksa kategori terlebih dahulu

Gunakan:

```python
df["Embarked"].unique()
```

atau:

```python
df["Embarked"].value_counts()
```

### Kesalahan 5 - Tidak menangani missing value

Contoh:

```text
Embarked
--------
S
C
NaN
Q
```

Tentukan strategi missing value sebelum atau sebagai bagian dari preprocessing yang sesuai.

### Kesalahan 6 - Encoding training dan production berbeda

Aturan encoding harus sama pada training, validasi, testing, dan production.

## 34. Ringkasan Metode Encoding

Panduan sederhana:

```text
Kategori?
    │
    ├── Hanya 2 kategori
    │       ↓
    │   Binary Mapping
    │
    ├── Tidak memiliki urutan
    │       ↓
    │   One-Hot Encoding
    │
    ├── Memiliki urutan
    │       ↓
    │   Ordinal Encoding
    │
    └── Sangat banyak kategori
            ↓
        Pertimbangkan strategi
        encoding lainnya
```

## 35. Contoh Lengkap pada Dataset Titanic

```python
import pandas as pd

df = pd.read_csv("train.csv")
```

Periksa kategori:

```python
print(df["Sex"].unique())
print(df["Embarked"].unique())
```

Encoding `Sex`:

```python
df["Sex"] = df["Sex"].map({
    "male": 0,
    "female": 1
})
```

One-Hot Encoding `Embarked`:

```python
df = pd.get_dummies(
    df,
    columns=["Embarked"],
    dtype=int
)
```

Periksa hasil:

```python
print(df.head())
print(df.dtypes)
```

## 36. Encoding dalam Konteks Preprocessing

Encoding merupakan salah satu bagian dari preprocessing.

```text
Dataset
   ↓
Data Understanding
   ↓
Data Cleaning
   ↓
Missing Value Handling
   ↓
Encoding
   ↓
Scaling
   ↓
Feature Engineering
   ↓
Feature Selection
   ↓
Model
```

Tidak semua dataset membutuhkan semua tahap tersebut.

## 37. Kesimpulan

Encoding adalah proses mengubah data kategorikal menjadi representasi yang dapat digunakan oleh algoritma Machine Learning.

Metode yang umum digunakan:

```text
Binary Mapping
One-Hot Encoding
Ordinal Encoding
Label Encoding
```

Pemilihannya harus disesuaikan dengan karakteristik data.

Hal paling penting:

> **Jangan memilih metode encoding hanya karena sebuah kolom berisi teks. Pahami terlebih dahulu apakah kategorinya nominal, ordinal, biner, atau memiliki cardinality yang tinggi.**

Contoh:

```text
Sex
male / female
        ↓
Binary Mapping

Embarked
C / Q / S
        ↓
One-Hot Encoding

Satisfaction
Low / Medium / High
        ↓
Ordinal Encoding
```

Dengan memahami konsep tersebut, encoding tidak lagi sekadar proses **"mengubah teks menjadi angka"**, tetapi menjadi bagian penting dari bagaimana kita **merepresentasikan informasi agar dapat dipahami oleh algoritma Machine Learning**.
