---
slug: ml-regression-hingga-menjadi-rest-api-dengan-fastapi
title: "Machine Learning Regression hingga Menjadi REST API dengan FastAPI"
authors: topekox
tags: [manchine learning, data mining, ai, data science, python]
---

# Machine Learning Regression hingga REST API dengan FastAPI dan Deployment ke VPS

Materi ini membahas proses membangun aplikasi **Machine Learning Regression secara end-to-end**, mulai dari pengolahan dataset menggunakan Jupyter Notebook sampai model dapat digunakan sebagai REST API dan dijalankan pada VPS.

Studi kasus yang digunakan adalah **prediksi harga rumah** berdasarkan:

* Luas rumah
* Jumlah kamar
* Jarak ke kota
* Kondisi rumah

<!-- truncate -->

Teknologi yang digunakan:

```text
Python
Pandas
NumPy
Matplotlib
Scikit-learn
Joblib
Jupyter Notebook
FastAPI
Uvicorn
PM2
Nginx
VPS
```

Alur keseluruhan project:

```text
Dataset
   ↓
Jupyter Notebook
   ↓
Data Exploration
   ↓
Data Cleaning
   ↓
Visualisasi
   ↓
Preprocessing
   ↓
Train-Test Split
   ↓
Membandingkan Algoritma
   ↓
Evaluasi
   ↓
Memilih Model
   ↓
Menyimpan Model
   ↓
FastAPI
   ↓
Testing API
   ↓
Upload ke VPS
   ↓
Uvicorn
   ↓
PM2
   ↓
Nginx
   ↓
HTTPS
   ↓
Production API
```

---

## 1. Apa Itu Machine Learning Regression?

**Regression** adalah salah satu jenis supervised learning yang digunakan untuk memprediksi nilai numerik.

Contohnya:

```text
Luas rumah          → Harga rumah
Luas tanah          → Harga tanah
Umur kendaraan      → Harga kendaraan
Jam belajar         → Nilai ujian
Jumlah penduduk     → Konsumsi listrik
```

Misalnya kita mempunyai data:

| Luas | Kamar | Jarak Kota | Kondisi |      Harga |
| ---: | ----: | ---------: | ------- | ---------: |
|   80 |     2 |         10 | sedang  |  425000000 |
|  120 |     3 |          5 | baik    |  750000000 |
|  150 |     4 |          3 | baik    | 1100000000 |

Model belajar dari hubungan antara:

```text
Feature
   ↓
Harga
```

Setelah model selesai dilatih, kita dapat memberikan rumah baru:

```text
Luas          = 120
Kamar         = 3
Jarak kota    = 5
Kondisi       = baik
```

dan model menghasilkan:

```text
Prediksi harga = Rp xxx.xxx.xxx
```

---

## 2. Regression vs Classification

Regression dan classification sama-sama dapat menggunakan supervised learning, tetapi target yang diprediksi berbeda.

### Regression

Output berupa angka.

```text
Prediksi harga
Prediksi suhu
Prediksi pendapatan
Prediksi penjualan
```

Contoh:

```text
Rp 750.000.000
```

### Classification

Output berupa kategori.

```text
Spam
Tidak Spam
```

atau:

```text
Baik
Sedang
Buruk
```

Secara sederhana:

```text
Target angka     → Regression
Target kategori  → Classification
```

---

## 3. Studi Kasus Prediksi Harga Rumah

Kita akan membuat model:

```text
Input
├── luas
├── jumlah_kamar
├── jarak_ke_kota
└── kondisi

    ↓

Machine Learning

    ↓

Output
└── harga
```

Contoh data:

| Feature       | Contoh |
| ------------- | -----: |
| luas          |    120 |
| jumlah_kamar  |      3 |
| jarak_ke_kota |      5 |
| kondisi       |   baik |

Target:

```text
harga
```

---

## 4. Struktur Project

Struktur project yang akan digunakan:

```text
prediksi-harga-rumah/
│
├── regression_harga_rumah.ipynb
├── rumah.csv
├── model_forest.joblib
├── main.py
├── requirements.txt
│
└── venv/
```

Keterangan:

```text
regression_harga_rumah.ipynb
→ Notebook untuk training Machine Learning

rumah.csv
→ Dataset

model_forest.joblib
→ Model Machine Learning yang sudah dilatih

main.py
→ FastAPI

requirements.txt
→ Daftar dependency

venv/
→ Python virtual environment
```

---

## 5. Menyiapkan Environment Python

Sebaiknya setiap project mempunyai environment sendiri agar dependency tidak saling bertabrakan.

Jika menggunakan Conda:

```bash
conda create -n house_regression python=3.12
```

Aktifkan:

```bash
conda activate house_regression
```

Install library:

```bash
pip install pandas numpy matplotlib scikit-learn joblib jupyterlab
```

Jalankan Jupyter:

```bash
jupyter lab
```

---

# Bagian Jupyter Notebook

## 6. Membuat Notebook

Buat file:

```text
regression_harga_rumah.ipynb
```

Notebook inilah yang akan digunakan untuk seluruh proses Machine Learning.

Tahapan notebook:

```text
Import Library
     ↓
Dataset
     ↓
Data Inspection
     ↓
Data Cleaning
     ↓
EDA
     ↓
Visualisasi
     ↓
Feature & Target
     ↓
Train-Test Split
     ↓
Preprocessing
     ↓
Model Training
     ↓
Model Comparison
     ↓
Evaluation
     ↓
Model Selection
     ↓
Prediction
     ↓
Save Model
```

---

## 7. Import Library

Pada cell pertama:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import joblib

from sklearn.model_selection import train_test_split

from sklearn.compose import ColumnTransformer

from sklearn.preprocessing import (
    OneHotEncoder,
    StandardScaler
)

from sklearn.pipeline import Pipeline

from sklearn.linear_model import LinearRegression

from sklearn.neighbors import KNeighborsRegressor

from sklearn.tree import DecisionTreeRegressor

from sklearn.ensemble import (
    RandomForestRegressor,
    GradientBoostingRegressor
)

from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)

from sklearn.inspection import permutation_importance
```

Library tersebut mempunyai fungsi berbeda.

```text
NumPy
→ operasi numerik

Pandas
→ pengolahan dataset

Matplotlib
→ visualisasi

Scikit-learn
→ Machine Learning

Joblib
→ menyimpan model
```

---

## 8. Membuat Dataset Contoh

Jika belum mempunyai dataset sendiri, kita dapat membuat dataset simulasi.

### 8.1 Membuat Jumlah Data

```python
np.random.seed(42)

jumlah_data = 500
```

Kita akan membuat:

```text
500 rumah
```

---

### 8.2 Membuat Feature Luas

```python
luas = np.random.randint(
    40,
    250,
    jumlah_data
)
```

Nilai luas rumah akan berada pada kisaran:

```text
40 – 249
```

---

### 8.3 Membuat Jumlah Kamar

```python
jumlah_kamar = np.random.randint(
    1,
    6,
    jumlah_data
)
```

---

### 8.4 Membuat Jarak ke Kota

```python
jarak_ke_kota = np.random.randint(
    1,
    31,
    jumlah_data
)
```

---

### 8.5 Membuat Kondisi Rumah

```python
kondisi = np.random.choice(
    [
        "buruk",
        "sedang",
        "baik"
    ],
    jumlah_data,
    p=[
        0.2,
        0.4,
        0.4
    ]
)
```

---

### 8.6 Memberikan Nilai untuk Kondisi

Kita membuat pengaruh kondisi rumah:

```python
nilai_kondisi = {
    "buruk": -100_000_000,
    "sedang": 0,
    "baik": 150_000_000
}
```

---

### 8.7 Membuat Harga

```python
harga = (
    luas * 5_000_000
    + jumlah_kamar * 30_000_000
    - jarak_ke_kota * 8_000_000
    + np.array([
        nilai_kondisi[k]
        for k in kondisi
    ])
    + np.random.normal(
        0,
        60_000_000,
        jumlah_data
    )
)
```

Dalam dataset simulasi ini:

```text
Luas lebih besar
→ harga cenderung lebih tinggi

Jumlah kamar lebih banyak
→ harga cenderung lebih tinggi

Jarak ke kota semakin jauh
→ harga cenderung lebih rendah

Kondisi baik
→ harga cenderung lebih tinggi
```

---

### 8.8 Membuat DataFrame

```python
df = pd.DataFrame({
    "luas": luas,
    "jumlah_kamar": jumlah_kamar,
    "jarak_ke_kota": jarak_ke_kota,
    "kondisi": kondisi,
    "harga": harga.astype(int)
})
```

---

### 8.9 Melihat Data

```python
df.head()
```

---

### 8.10 Menyimpan Dataset

```python
df.to_csv(
    "rumah.csv",
    index=False
)
```

Jika dataset sudah tersedia, tahap pembuatan dataset dapat dilewati.

---

## 9. Membaca Dataset

Untuk project sebenarnya:

```python
df = pd.read_csv(
    "rumah.csv"
)
```

Kemudian:

```python
df.head()
```

---

## 10. Melihat Dimensi Dataset

Gunakan:

```python
df.shape
```

Contoh:

```text
(500, 5)
```

Artinya:

```text
500 baris
5 kolom
```

---

## 11. Melihat Nama Kolom

```python
df.columns
```

Hasil:

```text
luas
jumlah_kamar
jarak_ke_kota
kondisi
harga
```

---

## 12. Melihat Informasi Dataset

```python
df.info()
```

Informasi ini berguna untuk mengetahui:

```text
Jumlah baris
Nama kolom
Tipe data
Non-null value
Memory usage
```

---

## 13. Statistik Deskriptif

```python
df.describe()
```

Kita dapat mengetahui:

```text
count
mean
std
min
25%
50%
75%
max
```

Ini membantu memahami karakteristik data numerik.

---

## 14. Memeriksa Missing Value

```python
df.isnull().sum()
```

Jika hasil:

```text
luas              0
jumlah_kamar      0
jarak_ke_kota     0
kondisi           0
harga             0
```

berarti tidak terdapat missing value.

---

## 15. Memeriksa Data Duplikat

```python
df.duplicated().sum()
```

Jika ditemukan duplicate:

```python
df = df.drop_duplicates()
```

---

## 16. Memeriksa Data Kategorikal

```python
df["kondisi"].unique()
```

Kemudian:

```python
df["kondisi"].value_counts()
```

Kita dapat mengetahui jumlah rumah berdasarkan:

```text
baik
sedang
buruk
```

:::tip
Misalnya kita memiliki data set yang `NaN` rincian:

```
luas             6
jumlah_kamar     6
jarak_ke_kota    6
kondisi          6
harga            0
dtype: int64
```

Kita dapat melakukan preprocessing:

```python
 # mengisi data Nan dengan nilai Median pada data numerik
df["luas"] = df["luas"].fillna(df["luas"].median())
df["jumlah_kamar"] = df["jumlah_kamar"].fillna(df["jumlah_kamar"].median())
df["jarak_ke_kota"] = df["jarak_ke_kota"].fillna(df["jarak_ke_kota"].median())
df["luas"] = df["luas"].fillna(df["luas"].median())

# .str.strip() -> menghilangkan spasi di awal/akhir.
# .str.lower() -> mengubah semuanya menjadi huruf kecil
df["kondisi"] = df["kondisi"].str.strip().str.lower()

# mengisi data Nan dengan nilai Median pada data string
# mode() -> mengambil nilai yang paling sering muncul (modus)
# [0] -> Hasil dari .mode() adalah sebuah Series, bukan satu nilai langsung.
# Contoh hasil: 0 baru, 1  bekas
df["kondisi"] = df["kondisi"].fillna(df["kondisi"].mode()[0])

# df["kondisi"].value_counts()

df.isna().sum() # cek data kosong
```

Sehingga hasilnya:

```
luas             0
jumlah_kamar     0
jarak_ke_kota    0
kondisi          0
harga            0
```
:::

---

# Exploratory Data Analysis

## 17. Mengapa EDA Penting?

EDA atau **Exploratory Data Analysis** digunakan untuk memahami data sebelum melakukan training.

EDA dapat membantu menemukan:

```text
Distribusi data
Outlier
Missing value
Hubungan antar fitur
Hubungan feature dengan target
Data yang tidak masuk akal
```

Jangan langsung melakukan training sebelum memahami dataset.

---

## 18. Visualisasi Distribusi Harga

```python
plt.figure(figsize=(8, 5))

plt.hist(
    df["harga"],
    bins=30
)

plt.title(
    "Distribusi Harga Rumah"
)

plt.xlabel(
    "Harga Rumah"
)

plt.ylabel(
    "Jumlah Rumah"
)

plt.show()
```

Histogram menunjukkan distribusi nilai harga rumah.

---

## 19. Visualisasi Distribusi Luas

```python
plt.figure(figsize=(8, 5))

plt.hist(
    df["luas"],
    bins=25
)

plt.title(
    "Distribusi Luas Rumah"
)

plt.xlabel(
    "Luas Rumah"
)

plt.ylabel(
    "Jumlah Rumah"
)

plt.show()
```

---

## 20. Scatter Plot Luas vs Harga

```python
plt.figure(figsize=(8, 5))

plt.scatter(
    df["luas"],
    df["harga"],
    alpha=0.6
)

plt.title(
    "Hubungan Luas Rumah dengan Harga"
)

plt.xlabel(
    "Luas Rumah"
)

plt.ylabel(
    "Harga Rumah"
)

plt.show()
```

Scatter plot membantu melihat hubungan antara:

```text
luas
  ↓
harga
```

Jika titik cenderung bergerak naik dari kiri ke kanan, terdapat hubungan positif.

![Visualisasi](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArMAAAIiCAYAAADb3UD9AAAAOnRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjExLjAsIGh0dHBzOi8vbWF0cGxvdGxpYi5vcmcvlcelbwAAAAlwSFlzAAAPYQAAD2EBqD+naQAA64hJREFUeJzsnXt8U/X9/1/nJM2ladJ7y6UtNwWK3EFRBASVbd4muOnwrkN0cxOduzi/383bb5uXubmhfp2K4jZ17qaoU2QgoqKioshFCkihtgXapm2apEma2/n8/nh7kqaXtOfQkqZ9Px+PPNJ8cs7J+bxy2r7yzvvzfktCCAGGYRiGYRiGSUPkVJ8AwzAMwzAMw+iFzSzDMAzDMAyTtrCZZRiGYRiGYdIWNrMMwzAMwzBM2sJmlmEYhmEYhklb2MwyDMMwDMMwaQubWYZhGIZhGCZtYTPLMAzDMAzDpC1sZpkBTW1tLVavXo2jR4+m+lQYRhNVVVVYvXo1Ghsb+/S4brcbq1evxhdffNGnxx3MHDx4EGvWrIGiKP36Ou+88w6ef/75Pj3m1q1b8ec//7lPjzkY8Pv9WL16Nfbs2RMbczqdWL16NWpqamJjffk/pKvjHzhwAH/+85/B/adSC5tZ5phQ/7F+8sknXT6/b98+rF69GrW1tbqOv3v3bqxYsQL79u07ltMcdPS37qlm165dWL16dez2zDPP4PXXX4fL5Ur1qfWabdu2YcWKFaiqqurT4x49ehQrVqzAe++916fH7Q2NjY1YvXo1du7cedxf+1hYsWIF3nrrLchy5395hw4dwuuvv46//e1v2Lp1KwKBgO7Xefrpp3Hrrbcey6l24oUXXsAPfvCDPj1mX/Dpp58m/I7++c9/xvr16+H1eo/L6zc3N2PFihXYtGlTbKyyshIrVqzAjh07YmN9+T+kq+Pn5eVh5cqVePbZZ4/5+Ix+2Mwyx4T6j/Wll17q8vl3330XK1aswO7du4/zmQ1uBrvu69evx4oVK/Dqq69i69at2LhxI2655RYMHz4cDz30UKpPb8hSVVWFFStW4PXXX0/1qfSa119/HW+99RbuuOOOhHGn04mlS5di/Pjx+N3vfof//Oc/+O53v4uRI0fi9ttvT9HZpg+vvPIKVqxYgXXr1mHr1q1Yv349rr/+egwfPhxPP/10Ss6pqKgIy5cvR1lZ2XE7fl5eHn74wx/i9ttvRygU6pfXZXrGmOoTYBiG6Y7bb78dp556KgAgEongoosuwq233or58+dj9uzZKT47Jh344x//iAULFuCEE05IGP/ud7+LTZs24aOPPsKMGTNi48888wzuuOMO3Hvvvcf7VNOSu+++G5MnTwYAtLW1YfHixVixYgVOO+00lJeXH9dzGTt2LFavXn3cj3/ttdfiN7/5DV588UUsW7as316f6R42s8xxZ9++fXj33XdxySWXwOFwxMZbW1vxwgsvYN68eZg4cWKn/cLhMN588000NTVh9uzZmDBhgu7j1tbW4o033sB5552HoqIivPXWW6irq8OMGTNw0kkndXne1dXVeO+992Cz2XDWWWdBkiQ8//zzmDt3LiZNmpTwWipmsxljx47FqaeeCoPBEBvX8/rHit5z27x5M6qrq3HRRRchOzsbAPDRRx9h//79GDVqFObNm4d9+/Zhy5YtWLZsGbKysgAAe/bswfvvvw8AkCQJdrsd06dPx/jx43Wdv9FoxHXXXYdXX30V69evj5nZzz//HB988AEuv/xyWK3W2PYulwv//ve/sWjRIowbNw4ARRY3btyIJUuWwOFwYOPGjfD5fFi4cCEKCwsBAKFQCJs2bUJzczPmz5+P0tLShPNQj6vOy2Kx4IQTTsApp5wCSZK6PPdIJII333wTjY2NXV67yTh06BA++OAD2O12LF68uMttentO7eefk5Oj+5ySsW7dOoRCIVx44YUJ4zt37sRHH32Eq666CiaTKWFMPW+Hw4GZM2fG3q/2NDQ0YNu2bWhpacG4ceMwe/bshOu2K2pra7FhwwY88sgjCePRaBTr1q3DN77xjQQjCwDXXHMNpk2b1uXx6uvr8cEHH8Dr9WLcuHE47bTTun3P6+rq8M477yAjIwOLFi1CTk7OMR9TRYvG77zzDmpra3HZZZehvr4eb7/9duxaMhqNsXN49913kZGRgbPPPhs2my3p63eHxWLBDTfcgC1btuC///0vysvL8eyzz2L06NGYN28e9u7di08++QQTJ07ErFmzAADBYBDvv/8+ampqkJeXhwULFiT8/VapqanBli1bYn9/u8LpdOLll1/G17/+9U6/tx2pqKjAe++9h2nTpuHkk08GQL+n7733Hg4fPozCwkLMmjULeXl5PR7/hBNOwIwZM/D000+zmU0RbGaZ4476FfjChQsT/mg1NjZixYoVeOyxxzqZ2aNHj2LBggUoKiqC2+3GVVddhZtuugl/+MMfdB1XzaP617/+hUcffRR2ux0ejwebN2/G3Xff3ekryfvvvx+/+MUvMHPmTJSWluLOO+/EfffdhxUrVuDhhx+OmdlgMIitW7fG9nO5XHjnnXeQm5uLDRs2YNSoUbpevy/Qem4vvPACHn74YeTl5eGLL77AaaedhoyMDFx88cXYtGkTFi1aBEVRYDAYcPbZZ+PWW2/F2WefHTOz9fX1sddTFAW1tbXYvHkzLrzwQvz973/vMn+xJ8xmMwD6YKOyYcMG/OhHP8L555+fYGYPHz6MFStW4K9//WvMHKl5rPn5+fjtb3+L4cOHx/LgNm7ciIKCAnznO99BSUkJDh48iO9+97uxf14qgUAgQcempiZs3rwZI0eOxMaNGzFs2LCEc66rq8OiRYtQUFCAxsZGvPfee/jtb3+LH//4xz3O95577sE999yDk08+GcOHD8edd96Je+65p9N2vT0ndf7Dhg3D/fffr+uceuJ3v/sdWlpaOhmt119/Hbfffju+/e1vx4zW4cOHY+cdjUZRU1ODt99+G5dddlnCoqeHH34Yt912G04++WSUlpbi0KFD8Hq9eP7552NRwa546623IITA3LlzE8YNBgNsNhsaGhq63K+jwVUUBT//+c/xhz/8AXPmzMGIESOwZcsWjBgxAmvXrsXIkSMTtn/55Zfxi1/8AuXl5di+fTsaGxvxt7/9Dd/4xjd0H7M9WjR++umn8cYbb8DhcOCXv/wlTjzxRLz77rsoKSnBpk2bsGHDBtxzzz0YP348tmzZAqvVig8++ABFRUXdvn4y1N/BYDAIALjllluwZMkSvPjii9i6dStycnIwe/ZszJo1C+vWrcN3v/tdZGZmYvbs2aisrERlZSWeeeaZhLk9+OCDuP322zFjxgyUlZXhjjvuwP3339/ptdXf5VdffTWpmX399dexbNkyLF68GJdddhkA+lB8zjnnwGw24+STT0ZLSwsqKipw22234Xvf+16Px587dy6eeuopBIPB2N8p5jgiGOYYqKioEADEeeedJ5588slOt6uvvloAEOvWrYvt8+STTwoA4osvvkg41qFDhwQA8dhjj8XG1q1bJwCIGTNmJGy/Zs0aAUA89dRTx3TcU045RVRWVsbGf/KTn4iMjAxRVVUVG9uwYYMAIO65557YmNPpFF//+tcFAPHwww8n1ai1tVVMnz5dnHvuubpevyv06K713GbMmCH2798vhBDC5/OJxsZGccstt4iMjAyxdevW2PbvvfeeGDNmjAAgDh06lPT1duzYIcxms/i///u/pNv99re/FQDEBx98kDB+0003CQDijTfeiI099NBDAoA4evRowra7du0SAMRf//rX2Ng///lPAUDMnz9fHDlyRAghRCQSEXPnzhUnn3yyuOSSS0RtbW1sfP78+eKkk04SiqIkPd+WlhYxceJEcckll3T5WtXV1bHxG264QVitVlFXV5f0mK+88ooAIH7729/Gxmpra8W8efMEALFmzZrjfk4ff/yxACDuvffebrc566yzxKxZszqN33vvvQKAcLlcSV/jww8/FAaDQfzlL38RQgjh8XiELMviV7/6VcJ2+/btEzt27Eh6rJtvvlkAEMFgsNNzt956qwAgli1bJjZu3Ci8Xm+3x7n77ruFJEnilVdeiY21tLSI6dOni/nz58fGrr76apGVlSWuvPLK2GuGQiFxwQUXCIfDkXCN9vaYN998s7DZbAnno0Vj9Zyuv/56EQ6HhRBCVFdXC7PZLK677jpxxRVXxMYPHz4srFar+OlPf9qtFip33nmnACB27dqVMH7VVVcJAGLz5s1CCCHy8/NFaWmpWLVqVWyb6upqsXPnTmE2m8W1114be30hhLj99tuFxWKJ/V188803BQBx5513xrapr68XZ511Vqe/vx988IEAIF599dXYmPr37K233hJCCPHwww8Lg8EgfvrTnyb8Xl9wwQVi+vTpCefi8/nEa6+9lvT4Ko8//rgAILZt29ajdkzfM+Qjs21tbdi5cyeGDx/e49cSyWhqakJNTQ3KysoSvpYYKrSPsLSnsrKyT45/3nnnJeS8XXPNNfjDH/6ARx99FN/97nd1H/eCCy7A2LFjY4+/+93v4sEHH8Q777yDK6+8EgDwpz/9CQUFBbjtttti2xUUFODyyy/H+vXruzzu3r17sWvXLng8HgghMHLkSLzzzju6Xj8ZenTv7bmdc845OPHEEwEAmZmZMJlMWL16NS6++GLMmTMntt3cuXNx8skn49ChQ52OEYlE8OGHH6KqqgptbW0QQqCwsBDvvPMOvv/97/c4v1deeQW7d+9GW1sb3nvvPfzjH//AjTfemBAp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xE9+8pOkX4lPnjwZQghUVlZ2uu4bGhq6XOSkrmz/8ssvAdBKdTVy/Lvf/S7Z1AHQV/pHjx6NRfXV13K73bHoqNZjdqS3Gg9kJkyYgB07dvRYSkvL70EybrrpJpx77rm44YYb4Ha78eSTT3aK2k+bNi32rYXb7cYVV1wRSz/qaUHc/v37YTAYOkXlmeMDN01IwoMPPoj169dj//792LVrFw4fPgyTyYRbbrkltk1ubi6OHDmSsN/Ro0exc+dO/rqhG6ZNm4aMjAysW7cuNhaJRJL+UXvuuefg9/tjjz/55BO8/fbbuPzyy4/puL1h2bJlqKqqwssvvxwbUxQFa9as6bRtSUkJqqqqYpEXANi8ebOmr+36i2M9N5vNhgsuuADPP/88nE5nbLy+vh6vvvpqwrZ5eXnIzMzs9A/nV7/6VZdR3N6yYMECnHvuuXjsscdiX8fOnDkTsiwnvO+hUKjfCreXlJSgsrIy4ff7P//5DyoqKvr0dS699FLs2bMH//3vf2Nj4XC42+vueJxTb5g9ezZqa2sTGnZUVlZiw4YNCdsNGzYMRqOx0zVy9913IzMzM/bY6XQmXG8AMGXKFIwePRoejyfpuajfun344Yednjv11FNjZcHao/6eq6WjcnNzsWzZMjz11FNd5oXv27cP0Wg09thsNuPhhx9O2ObBBx+ELMu49NJLdR2zI73VeCBz44034siRI3jsscc6Pef1emMpL5deeim+/PJLvPjii7Hno9EonnrqKc2vuXz5cvz973/Hc889h4svvjjhb2HHDwfZ2dmYP38+hBBobW3t8dhbt27FjBkzYuULmePLkI3M9oZHHnkEV1xxBWpra1FTUwMhBBYtWpRQGuemm27CTTfdhLFjx2LWrFnYvHkzNm/ejEgkArfbHUsKZ+KMGDECN954I+677z60trZi5MiReOONN3DllVfilVde6XKfyy67DF/72tdw/vnnw+1247HHHsOpp56asChAz3F7wzXXXIP//Oc/+M53voPvfe97KC0txRtvvIFvfetbePHFFxO+rrrtttswf/58LF68GBdddBEOHTqErVu34vvf/z4eeOAB3efQF/TFua1atQrz58/HnDlzcO2110IIgY0bN+K6667DPffcE9NClmX84he/wC9+8QsYDAZMnjwZmzdvRmlp6THX0f3Vr36FdevW4a677sLTTz+NcePG4dprr8Udd9yBxsZGFBUVYd26dbjiiis0LWTpLbfffjsWL16Mb3zjG7jggguwf/9+7NixA8uXL8cf//jHPnud73//+3j99dexZMkSfP/738ewYcPwn//8B5dcckmnhS/H65xUPv744y4/JM6cORPLly/HQw89hPPOOw833ngjPB4PPvzwQ6xYsQK/+c1vYttaLBb87Gc/w/33349IJILx48dj48aNmDp1KkaPHh3bzul04txzz8XcuXMxdepUZGZm4q233sLnn3/eKU+7I5MmTcL06dOxdu1aXHHFFQnP5efn47TTTsN5552HhQsXQlEUbN26FWvXrsV5552XsEDxscceQ319PaZOnYqrr74aEyZMgNPpxLZt2/Dll18mRMBzcnKQmZmJZcuWYc6cOfjoo4/wwgsv4N577034Ol7LMTvSW40HMueffz4eeOABrFy5EuvWrcPpp58OWZaxd+9ebNy4EWvWrEFpaWns7++ll14a+/v7+uuv4+KLL+70Ibo3fOtb38J//vMfLF26FOeffz7Wrl0Lm82Gm2++GW1tbZg/fz5GjhyJQ4cO4fHHH8c111yTsEi3KxobG/H+++/jt7/9rV45mGOEzWw3BAIB1NTU4KWXXkro/QwAEydORFtbGywWC66//noMGzYMzz//PF577TXMmjULv/nNb3DjjTfCYrGk6OyPHzk5OVi+fHm33ZgmTpyI5cuXd6oU8dBDD2Hu3Ll499134Xa78eijj6KwsBDLly9P6BpTWlqK5cuX47zzzsOFF16Iv/zlL/B6vfjDH/6Ayy+/vNMKZ63Hbf9VIEBJ/MuXL09YXCDLMv7973/jxRdfxNtvv43GxsZYpAVArK4qQF9Rfv7553j++edRWVmJk046Cb/5zW+wefNmNDU1xc5Xy+v3le7Hem4ARQB37NiBNWvWxJomvPjii3jyySc7aXH77bfjlFNOwX//+1/U1NTguuuuw/nnn49777034Wvlrpg6dSqWL1/e5Vd7M2bMwG9+8xtUVVUhEAjAarXi8ccfx6JFi/DBBx+gtbUVq1evhtVqxfLlyxOqYIwZMwbLly/vlNc2evToLl+vrKwMy5cvT6gde8YZZ2DXrl144YUXUFlZiRkzZuDBBx/EunXrEiI43b2WxWLB8uXLOy0264jRaMRrr72Gf/7zn3jvvffgcrnw6KOPoqCgANu3b09IpTle56T+LgHosopGUVERZs6ciY8//hhPP/00qqqqMGHCBKxduxbvvvsuli9fnpDr+Otf/xrz5s3DW2+9hcOHD2PlypX4+te/DpPJFEvdmjRpEvbt24eXX34Z27dvR319PRYtWoTHHnusU03frvjhD3+IH/zgB2hqakoILnz88ceoqKjApk2bcPDgQQQCAcycORO33nprp7q0drsdGzZswObNm7Fp0yZUVFRg5MiR+NGPfoSzzz479iHujDPOQH5+Pn7xi1/g9ddfx4YNG1BaWor33ntP9zFPO+20Tt/yZWZm9lpj9Zw6Mn/+/C5zaefNm9erb0/UDy49Ve+58soru81r/ulPf4qLL74YL730EiorK5GVlYUFCxbgoYceiuXES5KEf/3rX3jppZdif39/97vfYfTo0fjkk08SPhx31W62q79nixcvxsaNG7F69Wq88MILWL58OTZs2IAPPvgAmzdvRkVFBYqLi7Fhw4ZYzn53xweAv/3tbzCZTLj66qt71I3pHyTR25UYg5jJkyfj/PPPT6hmEIlEYLFY8OSTT+Laa6/VdLybb74Zr7zySpdfHzGDh3/961+4+OKLu/xHNdS45ppr8Oqrr8YWQTDMQCESiWDy5Mn41re+hV//+tepPh1mkBEKhTB+/HgsX74cv/zlL1N9OkMWzpntBqPRiNNPPx3PP/98p+d8Pl/s546rR91uN1544QVcddVV/X6OzPGjtrY24XEoFMLvf/97lJaWJtRcHeyEw+FOXZMOHTqEv//97/j2t7+dorNimO4xGo14/PHH4ff7u6wAwDDHgto57Cc/+UmqT2VIM2Qjs+FwGJ988gkA4PLLL8fpp5+OG2+8EXa7Pfa1xbZt27Bo0SJ84xvfwFVXXQVFUfD222+jpqYG//znPwEAb775Jp544glcddVVCAaD+M1vfgODwYDNmzcntNZk0psrr7wSra2tOO2009DW1oZ///vfqKysxCuvvNJlzcLBit/vx8yZM7Fo0SJMnDgRNTU1ePrppzF8+HBs3ryZy9IwDMMwx50ha2abm5u77OwxefLkhIUNlZWVWLVqFXbu3ImcnBwsWrQI119/fUI+7Nq1a7FmzRoEg0EsXrwYN954IxvZQYaiKHjttdfw0UcfweVyYezYsVi2bFmnrlBDAbfbjX/961/Ys2cPFEXBrFmzcPHFF3M/coZh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VVWV5GdCRERERPH4/X4UFhbGHTPlVjMwTRPHjh1DQUHBqEtfdHV1oaqqCo2NjVz5YIyYmT3MTR8zs4e56WNm9jA3fcwsytrad8aMGaPOUk+5mVmHw4GZM2dq3cfr9U75F5UuZmYPc9PHzOxhbvqYmT3MTR8zE6PNyFqmdkMGEREREaU1FrNERERElLZYzMbhdrtx8803w+12J/uppA1mZg9z08fM7GFu+piZPcxNHzOzZ8pdAEZEREREmYMzs0RERESUtljMEhEREVHaYjFLRERERGmLxewIgsEgvvOd7+D888/Hhz/8YTz88MPJfkpJ1d7ejltvvRWXXHIJNmzYgNtvvx09PT3Dxr300kv4+Mc/jrVr12Lz5s04fvy4rTGZJhAI4OKLL8bq1asRDAaH3XbzzTdj/fr1+MhHPoInnnhixPuPNiaTdHV14dZbb8VFF12ETZs24YUXXhg25vnnn8emTZuwdu1afOlLX0Jra6utMZli9+7duPbaa3H++edjw4YN+NGPfjTstXby5EnceOONWLduHS677DL87ne/G/Y4YxmTrlpbW/H9738f5557Lm666aYRx3R2duKrX/0q1q1bh49+9KN49tlnEzYmHSil8Mc//hGbNm3C6tWrR/x53djYiG9+85u46KKL8LGPfQz33nsvQqHQsHFbt27Fxo0bsW7dOnz961+Hz+ezNSYdnDhxAt/5zndwzjnn4Lbbbos79vjx4zjvvPPwoQ99aNhtra2t+NKXvoS1a9di06ZNeP75522NmRIUDXPJJZeompoa9etf/1rdc889Kjc3V91+++3JflpJEQqF1OzZs9W3vvUt9cwzz6hf/epXatGiRercc89VAwMDkXEvvPCCcrlc6pvf/KZ6+umn1UUXXaTmzJmjurq6tMZkoiuuuEItXrxYAVB+vz9y3DRNtXbtWrV06VL11FNPqbvuuku53W519913a43JJG1tbaqmpka9//3vV1u2bFHPPvusuuiii9SePXsiY55++mnldDrVt7/9bfW73/1OrV27VtXU1KhgMKg1JlO8/fbbyuPxqGuuuUZt27ZNPfroo6q6ulpt2rQpMmZgYECtWLFCrV69Wm3dulX9x3/8h3K5XOqxxx7TGpOuDh48qE477TR1ww03qJUrV6qPf/zjw8b09/erZcuWqTVr1qjf/va36nvf+55yuVzqiSee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uPWzPxAIRJaEG2rRokUxS0YBwKFDh+Dz+VBTUxO5sHqosYxJda+99tqwYzk5OadsVTx+/DiOHTuGFStWDLstEAjgwIEDKC0tRVVV1Yj3H8uYTMdiloiIiIjSFi8AIyIiIqK0xWKWiIiIiNIWi1kiIiIiSlssZomIiIgobbGYJSIiIqK0xWKWiIiIiNIWi1kiIiIiSlssZomIUsRzzz2HXbt2JftpEBGlFRazREQp4oYbbsDDDz+c7KdBRJRWXMl+AkRENLrm5ma8+OKL+MQnPhE5FgwGsXXrVlxyySUoKChAKBTCk08+CQBwuVyYPXs2li9fDqfTGfNYfX19eO211xAIBLB8+XJUVlZO6rkQEU0kFrNERGlgz549+OQnPxlTzLa3t+OTn/wk6uvrUVNTg3A4jC1btgAABgYG8NZbb6GkpATPPfccysvLAQAHDx7E2rVrUV5ejqqqKrz99tvYvHkzvvSlLyXjtIiIxo3FLBFRhnC73Xj88ccjfw+FQrj44ovx3e9+Fz/60Y8AAD/+8Y9x5pln4tlnn42M+f3vf5+U50tENBFYzBIRZZg9e/bg0KFD6OnpQWVlJXbs2BG5zePxoLm5GS0tLaioqIDL5cKll16axGdLRDQ+LGaJiDJEV1cXPvShD+Hdd99FXV0dvF4v3nvvPZw8eTIy5stf/jL27duHWbNmYenSpbjooovwhS98IdKGQESUbriaARFRGnA45Me1aZqRY729vTFj7rnnHpw8eRINDQ34/e9/j1/+8pfYsGEDlFKRMaWlpfjNb36D5uZm/Nu//RteeeUVrFq1CqFQaHJOhIhogrGYJSJKA6eddhoAuYDL8uKLL8aMOXHiBGbPng232w1ACt+nnnoqZszRo0cBAF6vFxdffDFuv/12HDp0CC0tLYl8+kRECcM2AyKiFLJ///6Yi7gA4IwzzsDixYuxatUqfPrTn8Y111yDw4cP45FHHokZ95GPfAR33nknbrzxRsybNw+PP/443nvvPZSWlkbGfO9738O7776LD37wg8jLy8MDDzyANWvWYMaMGZNyfkREE81Qg99/IiKipPnKV76CxsbGYcc/+tGP4h//8R/h8/lw11134fDhw1i4cCEuv/xyfP3rX8d//ud/RorRP/3pT3jiiSfQ19eHs88+G6eddhr+8Ic/4I477og83nPPPYfnnnsOPT09qKurw2c+8xnk5eVN1mkSEU0oFrNERERElLbYM0tEREREaYvFLBERERGlLRazRERERJS2WMwSERERUdpiMUtEREREaYvFLBERERGlLRazRERERJS2WMwSERERUdpiMUtEREREaYvFLBERERGlLRazRERERJS2WMwSERERUdr6/8dJADGMUjLkAAAAAElFTkSuQmCC)

---

## 21. Scatter Plot Jarak vs Harga

```python
plt.figure(figsize=(8, 5))

plt.scatter(
    df["jarak_ke_kota"],
    df["harga"],
    alpha=0.6
)

plt.title(
    "Hubungan Jarak ke Kota dengan Harga"
)

plt.xlabel(
    "Jarak ke Kota"
)

plt.ylabel(
    "Harga Rumah"
)

plt.show()
```

Pada dataset simulasi, semakin jauh jarak rumah dari kota, harga cenderung menurun.

---

## 22. Jumlah Kamar vs Harga

Hitung rata-rata harga:

```python
harga_per_kamar = (
    df.groupby(
        "jumlah_kamar"
    )["harga"]
    .mean()
)
```

Visualisasikan:

```python
plt.figure(figsize=(8, 5))

harga_per_kamar.plot(
    kind="bar"
)

plt.title(
    "Rata-rata Harga berdasarkan Jumlah Kamar"
)

plt.xlabel(
    "Jumlah Kamar"
)

plt.ylabel(
    "Rata-rata Harga"
)

plt.show()
```

---

## 23. Kondisi Rumah vs Harga

Hitung:

```python
harga_kondisi = (
    df.groupby(
        "kondisi"
    )["harga"]
    .mean()
    .sort_values()
)
```

Visualisasikan:

```python
plt.figure(figsize=(8, 5))

harga_kondisi.plot(
    kind="bar"
)

plt.title(
    "Rata-rata Harga berdasarkan Kondisi Rumah"
)

plt.xlabel(
    "Kondisi"
)

plt.ylabel(
    "Rata-rata Harga"
)

plt.show()
```

---

## 24. Boxplot Harga

Boxplot dapat membantu melihat outlier.

```python
plt.figure(figsize=(8, 4))

plt.boxplot(
    df["harga"],
    vert=False
)

plt.title(
    "Boxplot Harga Rumah"
)

plt.xlabel(
    "Harga"
)

plt.show()
```

---

## 25. Correlation Matrix

Ambil feature numerik:

```python
numeric_df = df[
    [
        "luas",
        "jumlah_kamar",
        "jarak_ke_kota",
        "harga"
    ]
]
```

Hitung korelasi:

```python
correlation = numeric_df.corr()

correlation
```

Visualisasikan:

```python
plt.figure(figsize=(8, 6))

plt.imshow(
    correlation,
    interpolation="nearest"
)

plt.title(
    "Correlation Matrix"
)

plt.xticks(
    range(len(correlation.columns)),
    correlation.columns,
    rotation=45
)

plt.yticks(
    range(len(correlation.columns)),
    correlation.columns
)

plt.colorbar()

for i in range(
    len(correlation.columns)
):

    for j in range(
        len(correlation.columns)
    ):

        plt.text(
            j,
            i,
            f"{correlation.iloc[i, j]:.2f}",
            ha="center",
            va="center"
        )

plt.tight_layout()

plt.show()
```

Korelasi berada pada rentang:

```text
-1 sampai 1
```

Secara sederhana:

```text
+1 → hubungan positif kuat
 0 → hubungan linear lemah
-1 → hubungan negatif kuat
```

Namun korelasi tidak otomatis berarti hubungan sebab-akibat.

---

# Persiapan Machine Learning

## 26. Menentukan Feature

Feature adalah input yang digunakan model.

```python
X = df[
    [
        "luas",
        "jumlah_kamar",
        "jarak_ke_kota",
        "kondisi"
    ]
]
```

---

## 27. Menentukan Target

Target adalah nilai yang ingin diprediksi.

```python
y = df[
    "harga"
]
```

Sehingga:

```text
X
↓
Input

y
↓
Target
```

---

## 28. Train-Test Split

Bagi dataset:

```python
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)
```

Artinya:

```text
80% → training
20% → testing
```

Periksa:

```python
print(
    "X Train:",
    X_train.shape
)

print(
    "X Test:",
    X_test.shape
)

print(
    "y Train:",
    y_train.shape
)

print(
    "y Test:",
    y_test.shape
)
```

---

## 29. Menentukan Numerical Feature

```python
numerical_columns = [
    "luas",
    "jumlah_kamar",
    "jarak_ke_kota"
]
```

---

## 30. Menentukan Categorical Feature

```python
categorical_columns = [
    "kondisi"
]
```

---

# Preprocessing

## 31. One Hot Encoding

Machine Learning tidak dapat langsung memahami:

```text
baik
sedang
buruk
```

sebagai kategori teks.

Kita dapat menggunakan:

```python
OneHotEncoder()
```

Contohnya:

```text
baik
sedang
buruk
```

menjadi konsep:

```text
kondisi_baik
kondisi_sedang
kondisi_buruk
```

---

## 32. Preprocessing untuk Model yang Membutuhkan Scaling

Untuk model seperti Linear Regression dan KNN, kita dapat melakukan scaling terhadap feature numerik.

```python
preprocessor_scaled = ColumnTransformer(
    transformers=[
        (
            "numeric",
            StandardScaler(),
            numerical_columns
        ),
        (
            "categorical",
            OneHotEncoder(
                handle_unknown="ignore"
            ),
            categorical_columns
        )
    ]
)
```

---

## 33. Preprocessing untuk Tree-Based Model

Decision Tree, Random Forest, dan Gradient Boosting tidak membutuhkan scaling numerik seperti KNN.

Kita tetap harus mengubah categorical feature.

```python
preprocessor_tree = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(
                handle_unknown="ignore"
            ),
            categorical_columns
        )
    ],
    remainder="passthrough"
)
```

---

# Membandingkan Algoritma Regression

## 34. Mengapa Membandingkan Algoritma?

Jangan langsung menganggap:

```text
Random Forest pasti terbaik.
```

Setiap dataset dapat menghasilkan performa yang berbeda.

Karena itu kita akan mencoba:

```text
Linear Regression
KNN Regression
Decision Tree Regression
Random Forest Regression
Gradient Boosting Regression
```

Kemudian membandingkan hasilnya.

---

## 35. Linear Regression

Linear Regression merupakan algoritma regression yang mencoba memodelkan hubungan linear.

Secara sederhana:

```text
y = b0 + b1x1 + b2x2 + ...
```

Pipeline:

```python
linear_model = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor_scaled
        ),
        (
            "regressor",
            LinearRegression()
        )
    ]
)
```

Kelebihan:

```text
Sederhana
Cepat
Mudah dipahami
Bagus sebagai baseline
```

Kekurangan:

```text
Kurang fleksibel terhadap pola non-linear
```

---

## 36. KNN Regression

KNN menggunakan data yang paling dekat untuk melakukan prediksi.

```python
knn_model = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor_scaled
        ),
        (
            "regressor",
            KNeighborsRegressor(
                n_neighbors=5
            )
        )
    ]
)
```

KNN sangat dipengaruhi oleh jarak.

Karena itu scaling penting.

Kelebihan:

```text
Sederhana
Dapat menangkap pola non-linear
```

Kekurangan:

```text
Sensitif terhadap skala
Prediction dapat lambat pada dataset besar
Pemilihan K berpengaruh
```

---

## 37. Decision Tree Regression

Decision Tree membagi data berdasarkan kondisi tertentu.

Konsep sederhananya:

```text
Apakah luas > 100?
       │
   ┌───┴───┐
   Ya     Tidak
   │         │
   ↓         ↓
 ...
```

Pipeline:

```python
decision_tree_model = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor_tree
        ),
        (
            "regressor",
            DecisionTreeRegressor(
                random_state=42
            )
        )
    ]
)
```

Kelebihan:

```text
Menangkap hubungan non-linear
Tidak membutuhkan scaling
Mudah dipahami
```

Kekurangan:

```text
Mudah overfitting
```

---

## 38. Random Forest Regression

Random Forest terdiri dari banyak Decision Tree.

Konsepnya:

```text
Dataset
   ↓
Tree 1
Tree 2
Tree 3
Tree 4
...
Tree N
   ↓
Digabungkan
   ↓
Prediction
```

Pipeline:

```python
random_forest_model = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor_tree
        ),
        (
            "regressor",
            RandomForestRegressor(
                n_estimators=200,
                random_state=42,
                n_jobs=-1
            )
        )
    ]
)
```

Kelebihan:

```text
Bagus untuk data tabular
Dapat menangkap pola non-linear
Lebih stabil dibanding single Decision Tree
Tidak membutuhkan scaling
```

Kekurangan:

```text
Model lebih besar
Training lebih berat
Interpretasi lebih sulit
```

---

## 39. Gradient Boosting Regression

Gradient Boosting membangun model secara bertahap.

Model berikutnya berusaha memperbaiki kesalahan model sebelumnya.

Pipeline:

```python
gradient_boosting_model = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor_tree
        ),
        (
            "regressor",
            GradientBoostingRegressor(
                random_state=42
            )
        )
    ]
)
```

Kelebihan:

```text
Bagus untuk data tabular
Dapat menangkap pola kompleks
Sering menghasilkan performa tinggi
```

Kekurangan:

```text
Lebih kompleks
Parameter lebih banyak
Dapat overfitting
```

---

# Training Model

## 40. Membuat Dictionary Model

```python
models = {

    "Linear Regression":
        linear_model,

    "KNN":
        knn_model,

    "Decision Tree":
        decision_tree_model,

    "Random Forest":
        random_forest_model,

    "Gradient Boosting":
        gradient_boosting_model
}
```

---

## 41. Training Semua Model

```python
results = []

trained_models = {}

for name, model in models.items():

    model.fit(
        X_train,
        y_train
    )

    y_pred = model.predict(
        X_test
    )

    mae = mean_absolute_error(
        y_test,
        y_pred
    )

    mse = mean_squared_error(
        y_test,
        y_pred
    )

    rmse = np.sqrt(mse)

    r2 = r2_score(
        y_test,
        y_pred
    )

    results.append({
        "Model": name,
        "MAE": mae,
        "MSE": mse,
        "RMSE": rmse,
        "R2": r2
    })

    trained_models[name] = model
```

---

# Evaluasi Regression

## 42. Mean Absolute Error

MAE atau Mean Absolute Error menghitung rata-rata error absolut.

Secara sederhana:

```text
Actual    = 500 juta
Prediksi  = 450 juta

Error = 50 juta
```

Semakin kecil:

```text
MAE
↓
semakin baik
```

---

## 43. Mean Squared Error

MSE menghitung error yang dikuadratkan.

```text
Error
↓
Error²
```

Kesalahan besar akan mendapatkan penalti lebih besar.

Semakin kecil MSE:

```text
semakin baik
```

---

## 44. Root Mean Squared Error

RMSE:

```text
RMSE = √MSE
```

Keuntungannya adalah satuannya kembali sama dengan target.

Jika target:

```text
Rupiah
```

maka RMSE juga dapat dipahami dalam skala Rupiah.

Semakin kecil:

```text
RMSE
↓
semakin baik
```

---

## 45. R² Score

R² menunjukkan seberapa baik model menjelaskan variasi target.

Secara umum:

```text
R² mendekati 1 → semakin baik
R² mendekati 0 → kemampuan penjelasan rendah
```

R² dapat bernilai negatif pada kondisi tertentu.

Semakin tinggi:

```text
R²
↓
umumnya semakin baik
```

---

# Perbandingan Model

## 46. Membuat DataFrame Hasil Evaluasi

```python
results_df = pd.DataFrame(
    results
)
```

Urutkan berdasarkan RMSE:

```python
results_df = results_df.sort_values(
    by="RMSE"
)
```

Tampilkan:

```python
results_df
```

Contoh struktur:

| Model             | MAE | MSE | RMSE |  R² |
| ----------------- | --: | --: | ---: | --: |
| Linear Regression | ... | ... |  ... | ... |
| KNN               | ... | ... |  ... | ... |
| Decision Tree     | ... | ... |  ... | ... |
| Random Forest     | ... | ... |  ... | ... |
| Gradient Boosting | ... | ... |  ... | ... |

**Jangan memasukkan angka hasil evaluasi secara manual dalam dokumentasi.** Nilai tersebut harus berasal dari notebook ketika dataset dijalankan.

---

## 47. Visualisasi Perbandingan RMSE

```python
plt.figure(figsize=(10, 5))

plt.bar(
    results_df["Model"],
    results_df["RMSE"]
)

plt.title(
    "Perbandingan RMSE Model Regression"
)

plt.xlabel(
    "Model"
)

plt.ylabel(
    "RMSE"
)

plt.xticks(
    rotation=30,
    ha="right"
)

plt.tight_layout()

plt.show()
```

Interpretasi:

```text
RMSE lebih kecil
       ↓
error prediksi lebih kecil
```

---

## 48. Visualisasi Perbandingan MAE

```python
plt.figure(figsize=(10, 5))

plt.bar(
    results_df["Model"],
    results_df["MAE"]
)

plt.title(
    "Perbandingan MAE Model Regression"
)

plt.xlabel(
    "Model"
)

plt.ylabel(
    "MAE"
)

plt.xticks(
    rotation=30,
    ha="right"
)

plt.tight_layout()

plt.show()
```

---

## 49. Visualisasi Perbandingan R²

```python
plt.figure(figsize=(10, 5))

plt.bar(
    results_df["Model"],
    results_df["R2"]
)

plt.title(
    "Perbandingan R² Model Regression"
)

plt.xlabel(
    "Model"
)

plt.ylabel(
    "R²"
)

plt.xticks(
    rotation=30,
    ha="right"
)

plt.tight_layout()

plt.show()
```

Interpretasi:

```text
MAE  → semakin kecil semakin baik
RMSE → semakin kecil semakin baik
R²   → semakin besar semakin baik
```

---

# Model Selection

## 50. Menentukan Model Terbaik Berdasarkan RMSE

```python
best_row = results_df.iloc[0]

best_model_name = best_row[
    "Model"
]

print(
    "Model terbaik berdasarkan RMSE:",
    best_model_name
)
```

Ambil model:

```python
best_model = trained_models[
    best_model_name
]
```

Namun model dengan metric terbaik tidak selalu otomatis menjadi pilihan production.

Pertimbangkan juga:

```text
Akurasi
Ukuran model
Kecepatan inference
Kompleksitas
Interpretability
Kebutuhan aplikasi
```

Untuk tutorial deployment ini kita menggunakan:

```text
Random Forest
```

sehingga file akhirnya:

```text
model_forest.joblib
```

---

# Evaluasi Random Forest

## 51. Mengambil Random Forest

```python
model_forest = trained_models[
    "Random Forest"
]
```

Prediksi:

```python
y_pred_forest = model_forest.predict(
    X_test
)
```

---

## 52. Actual vs Prediction

Buat DataFrame:

```python
comparison_df = pd.DataFrame({
    "Actual": y_test.values,
    "Prediction": y_pred_forest
})
```

Lihat:

```python
comparison_df.head(
    10
)
```

---

## 53. Visualisasi Actual vs Prediction

```python
plt.figure(figsize=(7, 7))

plt.scatter(
    y_test,
    y_pred_forest,
    alpha=0.6
)

minimum = min(
    y_test.min(),
    y_pred_forest.min()
)

maximum = max(
    y_test.max(),
    y_pred_forest.max()
)

plt.plot(
    [minimum, maximum],
    [minimum, maximum]
)

plt.title(
    "Actual vs Predicted Price"
)

plt.xlabel(
    "Harga Aktual"
)

plt.ylabel(
    "Harga Prediksi"
)

plt.show()
```

Jika prediksi sempurna, titik akan berada dekat garis diagonal.

---

## 54. Menghitung Residual

Residual:

```text
Actual - Prediction
```

Kode:

```python
residual = (
    y_test.values
    - y_pred_forest
)
```

---

## 55. Residual Plot

```python
plt.figure(figsize=(8, 5))

plt.scatter(
    y_pred_forest,
    residual,
    alpha=0.6
)

plt.axhline(
    y=0
)

plt.title(
    "Residual Plot"
)

plt.xlabel(
    "Predicted Price"
)

plt.ylabel(
    "Residual"
)

plt.show()
```

Residual yang tersebar relatif acak di sekitar nol biasanya merupakan pola yang lebih baik daripada residual yang menunjukkan pola sistematis.

---

## 56. Distribusi Residual

```python
plt.figure(figsize=(8, 5))

plt.hist(
    residual,
    bins=30
)

plt.title(
    "Distribusi Residual"
)

plt.xlabel(
    "Residual"
)

plt.ylabel(
    "Jumlah"
)

plt.show()
```

---

# Feature Importance

## 57. Mengapa Feature Importance?

Feature importance membantu memahami fitur mana yang berkontribusi terhadap prediksi model.

Untuk Pipeline yang kita gunakan, kita dapat menggunakan permutation importance.

---

## 58. Menghitung Permutation Importance

```python
importance = permutation_importance(
    model_forest,
    X_test,
    y_test,
    n_repeats=10,
    random_state=42,
    scoring="r2"
)
```

Buat DataFrame:

```python
importance_df = pd.DataFrame({
    "Feature": X_test.columns,
    "Importance": importance.importances_mean
})
```

Urutkan:

```python
importance_df = importance_df.sort_values(
    by="Importance",
    ascending=False
)
```

Tampilkan:

```python
importance_df
```

---

## 59. Visualisasi Feature Importance

```python
plt.figure(figsize=(8, 5))

plt.bar(
    importance_df["Feature"],
    importance_df["Importance"]
)

plt.title(
    "Permutation Feature Importance"
)

plt.xlabel(
    "Feature"
)

plt.ylabel(
    "Importance"
)

plt.xticks(
    rotation=30,
    ha="right"
)

plt.tight_layout()

plt.show()
```

Hasil ini membantu memahami feature mana yang paling memberikan kontribusi terhadap performa model pada data pengujian.

---

# Prediction

## 60. Membuat Data Rumah Baru

Misalnya kita ingin memprediksi rumah:

```text
Luas          = 120
Jumlah kamar  = 3
Jarak kota    = 5
Kondisi       = baik
```

Buat DataFrame:

```python
new_house = pd.DataFrame(
    [
        [
            120,
            3,
            5,
            "baik"
        ]
    ],
    columns=[
        "luas",
        "jumlah_kamar",
        "jarak_ke_kota",
        "kondisi"
    ]
)
```

---

## 61. Melakukan Prediction

```python
prediction = model_forest.predict(
    new_house
)
```

Tampilkan:

```python
print(
    f"Prediksi Harga Rumah: "
    f"Rp {prediction[0]:,.0f}"
)
```

---

# Menyimpan Model

## 62. Mengapa Model Harus Disimpan?

Training tidak perlu dilakukan setiap kali API menerima request.

Prosesnya:

```text
Training
   ↓
Model
   ↓
Simpan
   ↓
Production
   ↓
Load Model
   ↓
Prediction
```

---

## 63. Menyimpan Model dengan Joblib

```python
joblib.dump(
    model_forest,
    "model_forest.joblib"
)
```

File:

```text
model_forest.joblib
```

sekarang berisi Pipeline:

```text
Preprocessing
     +
Random Forest
```

---

## 64. Menguji Model yang Disimpan

Load:

```python
loaded_model = joblib.load(
    "model_forest.joblib"
)
```

Prediction:

```python
loaded_prediction = loaded_model.predict(
    new_house
)
```

Tampilkan:

```python
print(
    f"Prediksi: "
    f"Rp {loaded_prediction[0]:,.0f}"
)
```

Jika berhasil, model siap digunakan oleh API.

---

# FastAPI

## 65. Apa Itu FastAPI?

FastAPI adalah framework Python untuk membangun API.

Dalam project ini FastAPI berfungsi sebagai penghubung:

```text
Client
   ↓
FastAPI
   ↓
Machine Learning Model
   ↓
Prediction
   ↓
JSON
```

---

## 66. Install FastAPI

```bash
pip install fastapi uvicorn
```

---

## 67. Membuat requirements.txt

Buat:

```text
requirements.txt
```

Isi:

```text
fastapi
uvicorn[standard]
pandas
joblib
scikit-learn
```

Untuk deployment, sebaiknya dependency dan versinya dikunci berdasarkan environment training.

Misalnya:

```bash
pip freeze > requirements.txt
```

Dengan demikian environment server lebih mudah disamakan dengan environment training.

---

# Membuat API

## 68. Membuat main.py

Buat:

```text
main.py
```

Gunakan kode berikut:

```python
from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel, Field

import joblib
import pandas as pd


app = FastAPI(
    title="Prediksi Harga Rumah",
    description="REST API Machine Learning untuk memprediksi harga rumah"
)


model = joblib.load(
    "model_forest.joblib"
)


class HouseInput(BaseModel):

    luas: int = Field(gt=0)

    jumlah_kamar: int = Field(gt=0)

    jarak_ke_kota: int = Field(ge=0)

    kondisi: Literal[
        "baik",
        "sedang",
        "buruk"
    ]


@app.get("/")
def home():

    return {
        "message": "API Prediksi Harga Rumah aktif"
    }


@app.post("/predict")
def predict(data: HouseInput):

    input_df = pd.DataFrame(
        [[
            data.luas,
            data.jumlah_kamar,
            data.jarak_ke_kota,
            data.kondisi
        ]],
        columns=[
            "luas",
            "jumlah_kamar",
            "jarak_ke_kota",
            "kondisi"
        ]
    )

    prediction = model.predict(
        input_df
    )[0]

    return {
        "input": {
            "luas": data.luas,
            "jumlah_kamar": data.jumlah_kamar,
            "jarak_ke_kota": data.jarak_ke_kota,
            "kondisi": data.kondisi
        },
        "prediksi_harga": float(
            prediction
        )
    }
```

---

## 69. Mengapa Menggunakan Pydantic?

Bagian:

```python
class HouseInput(BaseModel):
```

digunakan untuk menentukan bentuk data yang boleh diterima API.

Contohnya:

```json
{
    "luas": 120,
    "jumlah_kamar": 3,
    "jarak_ke_kota": 5,
    "kondisi": "baik"
}
```

FastAPI akan melakukan validasi sebelum data diberikan kepada model.

---

## 70. Mengapa Menggunakan Literal?

Kita hanya mengizinkan:

```text
baik
sedang
buruk
```

Dengan:

```python
Literal[
    "baik",
    "sedang",
    "buruk"
]
```

Jika client mengirim:

```text
sangat_bagus
```

FastAPI akan menolak request karena kategori tersebut tidak termasuk kategori yang diperbolehkan.

---

# Menjalankan API

## 71. Menjalankan FastAPI Secara Lokal

Di terminal:

```bash
uvicorn main:app --reload
```

Penjelasan:

```text
main
 ↓
main.py

app
 ↓
object FastAPI
```

`--reload` cocok digunakan untuk development karena server akan melakukan reload ketika source code berubah.

Jangan menggunakan `--reload` untuk production.

---

## 72. Menguji Endpoint Home

Buka:

```text
http://127.0.0.1:8000/
```

Response:

```json
{
    "message": "API Prediksi Harga Rumah aktif"
}
```

---

## 73. Swagger Documentation

FastAPI secara otomatis menyediakan dokumentasi.

Buka:

```text
http://127.0.0.1:8000/docs
```

Di sana tersedia endpoint:

```text
GET /
POST /predict
```

Klik:

```text
Try it out
```

untuk melakukan testing.

---

## 74. Testing Prediction API

Request:

```json
{
    "luas": 120,
    "jumlah_kamar": 3,
    "jarak_ke_kota": 5,
    "kondisi": "baik"
}
```

Response:

```json
{
    "input": {
        "luas": 120,
        "jumlah_kamar": 3,
        "jarak_ke_kota": 5,
        "kondisi": "baik"
    },
    "prediksi_harga": 725631245.12
}
```

Angka pada `prediksi_harga` hanya contoh format. Nilai sebenarnya berasal dari model yang Anda latih.

---

## 75. Testing Menggunakan cURL

```bash
curl -X POST \
"http://127.0.0.1:8000/predict" \
-H "Content-Type: application/json" \
-d '{
    "luas": 120,
    "jumlah_kamar": 3,
    "jarak_ke_kota": 5,
    "kondisi": "baik"
}'
```

---

# Deployment ke VPS

## 76. Apa yang Akan Dipindahkan ke VPS?

Tidak semua file dari project perlu dipindahkan.

File utama:

```text
main.py
model_forest.joblib
requirements.txt
```

Notebook:

```text
regression_harga_rumah.ipynb
```

tidak wajib berada di server production.

Dataset:

```text
rumah.csv
```

juga tidak diperlukan jika API hanya melakukan inference menggunakan model yang sudah disimpan.

---

## 77. Login ke VPS

Dari terminal:

```bash
ssh username@IP_VPS
```

Contoh:

```bash
ssh deploy@192.168.1.100
```

Sebaiknya aplikasi production dijalankan menggunakan user non-root.

---

## 78. Update VPS

```bash
sudo apt update
sudo apt upgrade -y
```

---

## 79. Install Python

```bash
sudo apt install python3 python3-pip python3-venv -y
```

Periksa:

```bash
python3 --version
```

---

# Menyiapkan PM2

## 80. Apa Itu PM2?

PM2 merupakan process manager yang umum digunakan pada ekosistem Node.js, tetapi dapat digunakan untuk menjalankan command seperti Uvicorn.

Dalam project ini:

```text
PM2
 ↓
Uvicorn
 ↓
FastAPI
 ↓
Machine Learning
```

PM2 membantu:

```text
Menjalankan process
Restart process
Melihat log
Monitoring status
Menjalankan kembali setelah reboot
```

---

## 81. Install Node.js dan NPM

```bash
sudo apt install nodejs npm -y
```

Periksa:

```bash
node --version
```

dan:

```bash
npm --version
```

---

## 82. Install PM2

```bash
sudo npm install -g pm2
```

Cek:

```bash
pm2 --version
```

---

# Menyiapkan Directory Project

## 83. Membuat Folder Project

```bash
sudo mkdir -p /var/www/prediksi-rumah
```

Berikan ownership:

```bash
sudo chown -R $USER:$USER \
/var/www/prediksi-rumah
```

Masuk:

```bash
cd /var/www/prediksi-rumah
```

---

# Upload File ke VPS

## 84. Upload Menggunakan SFTP

Untuk VPS, lebih disarankan menggunakan SFTP daripada FTP biasa karena menggunakan SSH.

Dari komputer lokal:

```bash
sftp username@IP_VPS
```

Masuk directory:

```bash
cd /var/www/prediksi-rumah
```

Upload:

```bash
put main.py
```

Kemudian:

```bash
put model_forest.joblib
```

Dan:

```bash
put requirements.txt
```

Keluar:

```bash
exit
```

---

## 85. Upload Menggunakan SCP

Alternatif lain:

```bash
scp main.py \
username@IP_VPS:/var/www/prediksi-rumah/
```

Model:

```bash
scp model_forest.joblib \
username@IP_VPS:/var/www/prediksi-rumah/
```

Requirements:

```bash
scp requirements.txt \
username@IP_VPS:/var/www/prediksi-rumah/
```

Atau sekaligus:

```bash
scp \
main.py \
model_forest.joblib \
requirements.txt \
username@IP_VPS:/var/www/prediksi-rumah/
```

---

## 86. Upload Menggunakan FTP dari Terminal

Jika server memang menyediakan FTP, salah satu client terminal yang dapat digunakan adalah `lftp`.

Install:

```bash
sudo apt install lftp
```

Connect:

```bash
lftp -u USERNAME,PASSWORD ftp://IP_VPS
```

Masuk:

```bash
cd /var/www/prediksi-rumah
```

Upload:

```bash
put main.py
put model_forest.joblib
put requirements.txt
```

Keluar:

```bash
bye
```

Namun plain FTP sebaiknya dihindari pada server internet karena kredensial dan transfer data tidak terenkripsi seperti SFTP.

---

# Python Environment di VPS

## 87. Membuat Virtual Environment

Masuk:

```bash
cd /var/www/prediksi-rumah
```

Buat:

```bash
python3 -m venv venv
```

Aktifkan:

```bash
source venv/bin/activate
```

---

## 88. Install Dependency

Upgrade pip:

```bash
pip install --upgrade pip
```

Install requirements:

```bash
pip install -r requirements.txt
```

---

## 89. Memeriksa File

```bash
ls
```

Seharusnya:

```text
main.py
model_forest.joblib
requirements.txt
venv
```

---

# Testing di VPS

## 90. Menjalankan Uvicorn Manual

Sebelum menggunakan PM2, test terlebih dahulu:

```bash
venv/bin/uvicorn \
main:app \
--host 0.0.0.0 \
--port 8000
```

Jika tidak ada error, berarti aplikasi berhasil dijalankan.

---

## 91. Testing dari VPS

Buka terminal lain:

```bash
curl http://127.0.0.1:8000/
```

Testing prediction:

```bash
curl -X POST \
"http://127.0.0.1:8000/predict" \
-H "Content-Type: application/json" \
-d '{
    "luas": 120,
    "jumlah_kamar": 3,
    "jarak_ke_kota": 5,
    "kondisi": "baik"
}'
```

Jika berhasil:

```text
FastAPI
   ↓
Model
   ↓
Prediction
```

berarti deployment dapat dilanjutkan.

Hentikan Uvicorn:

```text
Ctrl + C
```

---

# Menjalankan dengan PM2

## 92. Menjalankan Uvicorn dengan PM2

Masuk:

```bash
cd /var/www/prediksi-rumah
```

Kemudian:

```bash
pm2 start \
"venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000" \
--name prediksi-rumah
```

---

## 93. Melihat Status PM2

```bash
pm2 status
```

Jika status:

```text
online
```

berarti API sedang berjalan.

---

## 94. Melihat Log

```bash
pm2 logs prediksi-rumah
```

Log sangat berguna ketika terjadi:

```text
ModuleNotFoundError
FileNotFoundError
Port conflict
Model loading error
```

---

## 95. Restart API

```bash
pm2 restart prediksi-rumah
```

---

## 96. Stop API

```bash
pm2 stop prediksi-rumah
```

---

## 97. Delete Process

```bash
pm2 delete prediksi-rumah
```

---

## 98. Menjalankan PM2 Setelah Reboot

Jalankan:

```bash
pm2 startup
```

PM2 akan memberikan command yang perlu dijalankan.

Setelah itu:

```bash
pm2 save
```

Dengan demikian process yang telah disimpan dapat dipulihkan ketika server reboot.

---

# PM2 Ecosystem File

## 99. Membuat ecosystem.config.js

Agar konfigurasi lebih mudah dikelola, buat:

```text
ecosystem.config.js
```

Isi:

```javascript
module.exports = {
    apps: [
        {
            name: "prediksi-rumah",

            script:
                "/var/www/prediksi-rumah/venv/bin/uvicorn",

            args:
                "main:app --host 127.0.0.1 --port 8000",

            cwd:
                "/var/www/prediksi-rumah",

            interpreter:
                "none"
        }
    ]
};
```

Jalankan:

```bash
pm2 start ecosystem.config.js
```

Kemudian:

```bash
pm2 save
```

Pendekatan ini lebih mudah ketika konfigurasi aplikasi mulai bertambah.

---

# Nginx

## 100. Mengapa Menggunakan Nginx?

Kita sebenarnya dapat membuat API langsung:

```text
IP_VPS:8000
```

Tetapi production biasanya lebih baik menggunakan:

```text
Domain
   ↓
Nginx
   ↓
Uvicorn
   ↓
FastAPI
```

Keuntungannya antara lain:

```text
Reverse proxy
HTTPS
Domain
Security
Routing
```

---

## 101. Install Nginx

```bash
sudo apt install nginx -y
```

Periksa:

```bash
sudo systemctl status nginx
```

---

## 102. Membuat Konfigurasi Nginx

Buat:

```bash
sudo nano \
/etc/nginx/sites-available/prediksi-rumah
```

Isi:

```nginx
server {

    listen 80;

    server_name api.example.com;

    location / {

        proxy_pass http://127.0.0.1:8000;

        proxy_set_header Host $host;

        proxy_set_header X-Real-IP $remote_addr;

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ganti:

```text
api.example.com
```

dengan domain yang digunakan.

---

## 103. Mengaktifkan Konfigurasi

```bash
sudo ln -s \
/etc/nginx/sites-available/prediksi-rumah \
/etc/nginx/sites-enabled/
```

Test:

```bash
sudo nginx -t
```

Jika berhasil:

```bash
sudo systemctl reload nginx
```

---

# HTTPS

## 104. Mengapa HTTPS?

API production sebaiknya menggunakan HTTPS.

Tanpa HTTPS:

```text
HTTP
```

Dengan HTTPS:

```text
HTTPS
```

Data antara client dan server dienkripsi selama koneksi HTTPS.

---

## 105. Install Certbot

```bash
sudo apt install \
certbot \
python3-certbot-nginx \
-y
```

---

## 106. Mengaktifkan SSL

```bash
sudo certbot \
--nginx \
-d api.example.com
```

Setelah berhasil, API dapat diakses melalui:

```text
https://api.example.com
```

Swagger:

```text
https://api.example.com/docs
```

---

# Firewall

## 107. Mengatur UFW

Jika menggunakan Nginx:

```bash
sudo ufw allow OpenSSH
```

Kemudian:

```bash
sudo ufw allow 'Nginx Full'
```

Aktifkan:

```bash
sudo ufw enable
```

Periksa:

```bash
sudo ufw status
```

Karena Uvicorn hanya mendengarkan:

```text
127.0.0.1:8000
```

port 8000 tidak perlu dibuka ke publik ketika Nginx menjadi reverse proxy.

---

# Update Model

## 108. Training Model Baru

Ketika dataset bertambah:

```text
Dataset baru
   ↓
Jupyter Notebook
   ↓
Training
   ↓
Evaluasi
   ↓
model_forest.joblib baru
```

---

## 109. Upload Model Baru

Dari komputer:

```bash
scp model_forest.joblib \
username@IP_VPS:/var/www/prediksi-rumah/
```

Kemudian login:

```bash
ssh username@IP_VPS
```

---

## 110. Restart API

```bash
cd /var/www/prediksi-rumah
```

Kemudian:

```bash
pm2 restart prediksi-rumah
```

API sekarang menggunakan model baru.

---

# Troubleshooting

## 111. Model Tidak Ditemukan

Jika muncul:

```text
FileNotFoundError:
model_forest.joblib
```

periksa:

```bash
pwd
```

Kemudian:

```bash
ls
```

Pastikan:

```text
main.py
model_forest.joblib
```

berada pada directory yang benar.

---

## 112. Module Tidak Ditemukan

Contoh:

```text
ModuleNotFoundError:
No module named 'sklearn'
```

Aktifkan environment:

```bash
source venv/bin/activate
```

Kemudian:

```bash
pip install -r requirements.txt
```

---

## 113. Port 8000 Sudah Digunakan

Periksa:

```bash
sudo ss -tulpn | grep 8000
```

Kemudian periksa:

```bash
pm2 status
```

Kemungkinan terdapat process lama yang masih berjalan.

---

## 114. API Tidak Bisa Diakses

Periksa beberapa hal:

```text
Uvicorn berjalan
PM2 online
Nginx aktif
Domain mengarah ke VPS
Firewall
Port
```

Periksa PM2:

```bash
pm2 status
```

Periksa log:

```bash
pm2 logs prediksi-rumah
```

Periksa Nginx:

```bash
sudo nginx -t
```

---

## 115. Error Ketika Load Joblib

Model Machine Learning bergantung pada library dan versi tertentu.

Karena itu environment training dan production sebaiknya menggunakan dependency yang kompatibel.

Simpan dependency:

```bash
pip freeze > requirements.txt
```

Kemudian install dependency tersebut di VPS:

```bash
pip install -r requirements.txt
```

---

# Production Best Practice

## 116. Jangan Menggunakan --reload

Development:

```bash
uvicorn main:app --reload
```

Production:

```bash
uvicorn main:app --host 127.0.0.1 --port 8000
```

---

## 117. Jangan Menjalankan Aplikasi sebagai Root

Sebaiknya gunakan user khusus deployment.

Contoh:

```text
deploy
```

daripada menjalankan aplikasi sebagai:

```text
root
```

---

## 118. Validasi Input

API harus memvalidasi:

```text
Luas > 0
Jumlah kamar > 0
Jarak >= 0
Kondisi harus kategori yang valid
```

Pydantic membantu melakukan validasi tersebut.

---

## 119. Gunakan HTTPS

Production API sebaiknya menggunakan:

```text
HTTPS
```

bukan hanya:

```text
HTTP
```

---

## 120. Jangan Membuka Port Internal Jika Tidak Diperlukan

Jika menggunakan:

```text
Nginx
   ↓
127.0.0.1:8000
```

maka port 8000 tidak perlu dibuka ke internet.

Client cukup mengakses:

```text
HTTPS
   ↓
Nginx
```

---

# Alur Deployment Lengkap

## 121. Arsitektur Training

```text
                 LAPTOP

              rumah.csv
                  ↓
          Jupyter Notebook
                  ↓
             Data Cleaning
                  ↓
                 EDA
                  ↓
            Visualisasi
                  ↓
            Preprocessing
                  ↓
          Train-Test Split
                  ↓
       ┌──────────────────────┐
       │ Linear Regression    │
       │ KNN                  │
       │ Decision Tree        │
       │ Random Forest        │
       │ Gradient Boosting    │
       └──────────────────────┘
                  ↓
             Evaluation
                  ↓
             Comparison
                  ↓
            Model Selection
                  ↓
        model_forest.joblib
```

---

## 122. Arsitektur Production

```text
                    INTERNET
                       ↓
                     HTTPS
                       ↓
                    Nginx
                       ↓
             127.0.0.1:8000
                       ↓
                    Uvicorn
                       ↓
                   FastAPI
                       ↓
               Pydantic Validation
                       ↓
                  Pandas
                       ↓
             Machine Learning
                   Pipeline
                       ↓
                Random Forest
                       ↓
                  Prediction
                       ↓
                     JSON
```

---

# Checklist Project

## 123. Checklist Jupyter Notebook

```text
[ ] Dataset tersedia
[ ] Data berhasil dibaca
[ ] Data berhasil diperiksa
[ ] Missing value diperiksa
[ ] Duplicate diperiksa
[ ] EDA dilakukan
[ ] Visualisasi dibuat
[ ] Feature ditentukan
[ ] Target ditentukan
[ ] Train-test split
[ ] Preprocessing
[ ] Linear Regression
[ ] KNN
[ ] Decision Tree
[ ] Random Forest
[ ] Gradient Boosting
[ ] MAE
[ ] MSE
[ ] RMSE
[ ] R²
[ ] Perbandingan model
[ ] Actual vs Prediction
[ ] Residual analysis
[ ] Feature importance
[ ] Prediction data baru
[ ] Model disimpan
```

---

## 124. Checklist FastAPI

```text
[ ] FastAPI terinstall
[ ] requirements.txt tersedia
[ ] model_forest.joblib tersedia
[ ] main.py dibuat
[ ] Pydantic validation
[ ] Endpoint /
[ ] Endpoint /predict
[ ] Swagger berhasil
[ ] Prediction berhasil
[ ] cURL berhasil
```

---

## 125. Checklist VPS

```text
[ ] SSH dapat digunakan
[ ] Python terinstall
[ ] Virtual environment dibuat
[ ] Dependency terinstall
[ ] File model diupload
[ ] main.py diupload
[ ] requirements.txt diupload
[ ] Uvicorn berhasil
[ ] PM2 terinstall
[ ] PM2 online
[ ] PM2 startup
[ ] pm2 save
```

---

## 126. Checklist Production

```text
[ ] Nginx terinstall
[ ] Domain mengarah ke VPS
[ ] Reverse proxy aktif
[ ] HTTPS aktif
[ ] Firewall aktif
[ ] Port internal tidak terbuka publik
[ ] API tidak menggunakan --reload
[ ] Aplikasi tidak berjalan sebagai root
[ ] Input tervalidasi
[ ] Dependency kompatibel
[ ] Log dapat diperiksa
```

---

# Kesimpulan

## 127. Dari Notebook hingga Production API

Dalam project ini kita belajar bahwa Machine Learning bukan hanya tentang:

```text
model.fit()
```

Tetapi merupakan sebuah proses yang lebih panjang:

```text
Dataset
   ↓
Data Understanding
   ↓
Data Cleaning
   ↓
EDA
   ↓
Visualisasi
   ↓
Feature Engineering / Preprocessing
   ↓
Train-Test Split
   ↓
Model Training
   ↓
Model Comparison
   ↓
Evaluation
   ↓
Model Selection
   ↓
Model Saving
   ↓
API
   ↓
Deployment
   ↓
Monitoring
```

Model yang awalnya hanya berada di:

```text
Jupyter Notebook
```

akhirnya dapat digunakan oleh aplikasi lain melalui:

```text
REST API
```

dengan arsitektur:

```text
Client
   ↓
Nginx
   ↓
FastAPI
   ↓
Machine Learning Pipeline
   ↓
Random Forest
   ↓
Prediction
```

Dengan workflow ini, kita telah membangun contoh sederhana **Machine Learning to Production (ML deployment)**.

Hal yang paling penting adalah memahami bahwa model Machine Learning yang baik bukan hanya model dengan metric bagus, tetapi model yang:

```text
dilatih dengan benar
↓
dievaluasi dengan benar
↓
preprocessing konsisten
↓
dapat disimpan
↓
dapat digunakan kembali
↓
dapat diakses aplikasi
↓
dapat dijalankan secara stabil di server
```

Itulah transisi dari **Machine Learning experiment** menjadi **Machine Learning application**.

## Referensi

* Youtube: https://www.youtube.com/watch?v=X5Fvij5PqCU
* Contoh Code: https://gitlab.com/topekox/belajar-machine-learning/-/tree/main/demo-regression?ref_type=heads