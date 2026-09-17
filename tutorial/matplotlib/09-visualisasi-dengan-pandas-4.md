---
sidebar_position: 10
title: "Visualisasi Data dari Pandas - 4"
---

## Visualisasi Distribusi Data dan Subplots dengan Pandas dan Matplotlib

Dalam proses **Exploratory Data Analysis (EDA)**, memahami distribusi data merupakan salah satu langkah penting sebelum melakukan analisis lebih lanjut atau membangun model Machine Learning.

Salah satu visualisasi yang paling sering digunakan untuk memahami distribusi data numerik adalah **histogram**.

Dengan histogram kita dapat melihat:

- bagaimana data tersebar;
- nilai yang paling sering muncul;
- pusat distribusi;
- tingkat penyebaran data;
- kemungkinan skewness;
- kemungkinan adanya nilai ekstrem atau outlier.

Pandas menyediakan interface sederhana untuk membuat histogram melalui:

```python
df["column"].plot.hist()
```

atau:

```python
df["column"].plot(
    kind="hist"
)
```

Ketika kita memiliki banyak kolom numerik, Pandas juga memungkinkan kita membuat histogram untuk beberapa kolom sekaligus menggunakan:

```python
subplots=True
```

---

## Dataset Heart Disease

Pada materi ini kita menggunakan dataset **Heart Disease** sebagai contoh.

Dataset dapat dibaca menggunakan:

```python
import pandas as pd

heart_disease = pd.read_csv(
    "heart-disease.csv"
)
```

Kemudian kita dapat melihat beberapa baris pertama:

```python
heart_disease.head()
```


| age | sex | cp | trestbps | chol | fbs | restecg | thalach | exang | oldpeak | slope | ca | thal | target |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 63 | 1 | 3 | 145 | 233 | 1 | 0 | 150 | 0 | 2.3 | 0 | 0 | 1 | 1 |
| 37 | 1 | 2 | 130 | 250 | 0 | 1 | 187 | 0 | 3.5 | 0 | 0 | 2 | 1 |
| 41 | 0 | 1 | 130 | 204 | 0 | 0 | 172 | 0 | 1.4 | 2 | 0 | 2 | 1 |
| 56 | 1 | 1 | 120 | 236 | 0 | 1 | 178 | 0 | 0.8 | 2 | 0 | 2 | 1 |
| 57 | 0 | 0 | 120 | 354 | 0 | 1 | 163 | 1 | 0.6 | 2 | 0 | 2 | 1 |


Untuk mengetahui struktur dataset:

```python
heart_disease.info()
```

Dan melihat nama kolom:

```python
heart_disease.columns
```

Dataset ini memiliki beberapa fitur numerik yang dapat digunakan untuk latihan visualisasi.

:::tip
Download dataset: https://www.kaggle.com/datasets/johnsmith88/heart-disease-dataset
:::

---

## Apa Itu Histogram?

Histogram adalah visualisasi yang digunakan untuk menunjukkan **distribusi frekuensi data numerik**.

Berbeda dengan bar graph yang biasanya digunakan untuk membandingkan kategori, histogram membagi rentang nilai numerik menjadi beberapa interval yang disebut **bin**.

Secara sederhana:

```text
Data Numerik
     ↓
Dibagi menjadi interval
     ↓
    Bin
     ↓
Hitung jumlah data
     ↓
Histogram
```

Contoh:

```text
Frekuensi
   │
   │       ███
   │    ███████
   │  ███████████
   │██████████████
   └────────────────
      Rentang Nilai
```

Semakin tinggi batang, semakin banyak observasi yang berada pada interval tersebut.

---

## Membuat Histogram dengan Pandas

Histogram dapat dibuat langsung dari sebuah kolom DataFrame.

Contoh:

```python
heart_disease["age"].plot.hist()
```

Kemudian kita dapat menampilkan grafik:

```python
import matplotlib.pyplot as plt

heart_disease["age"].plot.hist()

plt.show()
```

Karena kolom `age` merupakan data numerik, histogram dapat digunakan untuk melihat distribusinya.

---

## Menggunakan `kind="hist"`

Alternatif lain adalah menggunakan parameter `kind`.

```python
heart_disease["age"].plot(
    kind="hist"
)
```

Keduanya menghasilkan jenis visualisasi yang sama:

```python
heart_disease["age"].plot.hist()
```

dan:

```python
heart_disease["age"].plot(
    kind="hist"
)
```

Pilihan sintaks dapat disesuaikan dengan gaya penulisan dan kebutuhan program.

---

## Parameter `bins`

Salah satu parameter penting dalam histogram adalah:

```python
bins
```

`bins` menentukan bagaimana rentang data dibagi menjadi beberapa interval.

Contoh:

```python
heart_disease["age"].plot.hist(
    bins=10
)
```

Artinya histogram menggunakan 10 kelompok interval.

![matplotlib](/img/python/37.png)

---

## Nilai Default `bins`

Dalam konteks penggunaan histogram Matplotlib melalui Pandas, nilai default `bins` adalah:

```text
10
```

Jika kita menulis:

```python
heart_disease["age"].plot.hist()
```

maka jumlah bin menggunakan pengaturan default.

Namun, dalam analisis data, kita sering ingin mencoba jumlah bin yang berbeda untuk melihat detail distribusi.

---

## Pengaruh Jumlah Bins

Jumlah bin dapat memengaruhi tampilan histogram secara signifikan.

Misalnya kita menggunakan:

```python
bins=10
```

kemudian:

```python
bins=20
```

dan:

```python
bins=50
```

Ketiga grafik tersebut dapat memperlihatkan pola distribusi yang berbeda tingkat detailnya.

---

## Bins Sedikit

Contoh:

```python
heart_disease["age"].plot.hist(
    bins=10
)
```

Dengan jumlah bin yang relatif sedikit, bentuk umum distribusi lebih mudah diamati.

Contohnya secara konseptual:

```text
Frekuensi
   │
   │       ███
   │     ███████
   │   ███████████
   │ ███████████████
   └──────────────────
        Age
```

Namun, detail kecil pada distribusi dapat tidak terlihat.

---

## Bins Lebih Banyak

Contoh:

```python
heart_disease["age"].plot.hist(
    bins=30
)
```

Jumlah bin yang lebih banyak membuat interval menjadi lebih kecil.

Akibatnya, histogram dapat memperlihatkan lebih banyak detail:

```text
Frekuensi
   │
   │     ██
   │   ████ ██
   │ ███████████
   │██████████████
   └──────────────────
        Age
```

Namun, jika jumlah bin terlalu banyak, grafik dapat terlihat lebih berisik dan pola umum distribusi menjadi lebih sulit dikenali.

---

## Memilih Jumlah Bins

Tidak ada satu nilai `bins` yang selalu paling tepat untuk semua dataset.

Pemilihan bin bergantung pada:

- jumlah observasi;
- rentang data;
- karakteristik distribusi;
- tujuan analisis;
- tingkat detail yang ingin dilihat.

Dalam eksplorasi awal, kita dapat mencoba beberapa nilai:

```python
bins=10
```

```python
bins=20
```

```python
bins=30
```

dan membandingkan hasilnya.

---

## Contoh Histogram dengan Beberapa Bins

```python
import matplotlib.pyplot as plt

heart_disease["age"].plot.hist(
    bins=10
)

plt.show()
```

Kemudian:

```python
heart_disease["age"].plot.hist(
    bins=20
)

plt.show()
```

Dan:

```python
heart_disease["age"].plot.hist(
    bins=30
)

plt.show()
```

Tujuannya adalah memahami bagaimana perubahan jumlah bin memengaruhi representasi visual distribusi.

---

## Memahami Distribusi Data

Histogram dapat membantu kita mengidentifikasi bentuk umum distribusi.

Beberapa pola yang mungkin ditemukan antara lain:

### Distribusi Simetris

Data relatif seimbang di sekitar pusat distribusi.

Secara visual dapat menyerupai:

```text
       █
     ████
   ███████
 ███████████
█████████████
```

---

### Distribusi Skewed

Distribusi dapat memiliki ekor yang lebih panjang pada salah satu sisi.

Contoh konseptual:

```text
████████
████████
██████
████
███
██
█
```

Hal ini menunjukkan bahwa distribusi tidak simetris.

---

### Distribusi dengan Beberapa Puncak

Histogram juga dapat menunjukkan lebih dari satu area dengan frekuensi tinggi.

Contohnya:

```text
      ███           ███
    ███████       ███████
  ███████████   ███████████
████████████████████████████
```

Pola seperti ini dapat menjadi petunjuk bahwa terdapat beberapa kelompok atau struktur dalam data.

---

## Mengidentifikasi Outlier

Histogram juga dapat membantu kita melakukan pemeriksaan awal terhadap kemungkinan **outlier**.

Outlier adalah observasi yang nilainya relatif jauh dari sebagian besar data.

Contoh:

```text
Frekuensi
   │
   │       ███
   │     ███████
   │   ███████████
   │ ███████████████                 █
   └────────────────────────────────────
       Sebagian besar data          Nilai ekstrem
```

Nilai yang berada jauh dari kumpulan data utama dapat menjadi kandidat yang perlu diperiksa lebih lanjut.

Namun, histogram saja tidak cukup untuk menentukan apakah sebuah observasi benar-benar merupakan outlier.

---

## Outlier dan Standar Deviasi

Salah satu pendekatan statistik yang sering digunakan untuk memahami nilai ekstrem adalah standar deviasi.

Dalam distribusi tertentu, observasi yang berada sangat jauh dari mean dapat dianggap tidak biasa.

Aturan praktis yang sering digunakan adalah:

```text
Mean ± 3 × Standard Deviation
```

Observasi di luar rentang tersebut dapat menjadi kandidat outlier.

Namun, konsep `3σ` bukan aturan universal untuk semua dataset.

Aturan tersebut lebih bermakna dalam konteks distribusi tertentu, khususnya ketika asumsi distribusi dan metode analisis mendukung penggunaannya.

Untuk analisis outlier yang lebih formal, kita juga dapat menggunakan metode seperti:

- IQR;
- Z-score;
- robust statistics;
- Isolation Forest;
- Local Outlier Factor.

---

## Histogram untuk Kolom `age`

Contoh sederhana:

```python
heart_disease["age"].plot.hist(
    bins=10
)

plt.title("Distribusi Age")
plt.xlabel("Age")
plt.ylabel("Frequency")

plt.show()
```

Dari grafik tersebut kita dapat melakukan eksplorasi awal terhadap distribusi usia pada dataset.

---

## Membuat Histogram untuk Banyak Kolom

Jika dataset memiliki banyak kolom numerik, kita dapat membuat histogram untuk beberapa kolom sekaligus.

Pandas menyediakan parameter:

```python
subplots=True
```

Contoh:

```python
heart_disease.plot.hist(
    subplots=True
)
```

Dengan parameter tersebut, setiap kolom akan mendapatkan area plot tersendiri.

---

## Menggunakan `figsize`

Ketika jumlah kolom cukup banyak, grafik dapat menjadi terlalu kecil jika ukuran Figure tidak diperbesar.

Kita dapat menggunakan:

```python
figsize
```

Contoh:

```python
heart_disease.plot.hist(
    subplots=True,
    figsize=(10, 30)
)
```

Parameter:

```python
figsize=(10, 30)
```

berarti:

```text
Lebar  = 10 inch
Tinggi = 30 inch
```

Ukuran tinggi yang lebih besar memberikan ruang untuk banyak subplot.

---

## Contoh Lengkap Multi-Histogram

```python
import pandas as pd
import matplotlib.pyplot as plt

# Membaca dataset
heart_disease = pd.read_csv(
    "heart-disease.csv"
)

# Membuat histogram untuk kolom numerik
heart_disease.plot.hist(
    subplots=True,
    figsize=(10, 30)
)

plt.show()
```

Pandas akan membuat histogram terpisah untuk kolom-kolom yang dapat diplot secara numerik.

![matplotlib](/img/python/38.png)

---

## Mengapa Menggunakan `subplots=True`?

Tanpa:

```python
subplots=True
```

beberapa kolom dapat diplot pada area grafik yang sama.

Contoh:

```python
heart_disease.plot.hist()
```

Beberapa distribusi dapat muncul dalam satu Axes.

Jika tujuan kita adalah melihat distribusi setiap fitur secara terpisah, kita dapat menggunakan:

```python
heart_disease.plot.hist(
    subplots=True
)
```

Dengan demikian:

```text
Feature 1 → Histogram 1

Feature 2 → Histogram 2

Feature 3 → Histogram 3

Feature 4 → Histogram 4
```

---

## Tantangan Multi-Histogram

Membuat banyak histogram secara otomatis memang praktis, tetapi terdapat beberapa keterbatasan.

Salah satunya adalah **skala data**.

Misalnya:

```text
Feature A → 0 – 1
Feature B → 0 – 1000
Feature C → 0 – 1,000,000
```

Jika divisualisasikan dengan pengaturan yang tidak sesuai, beberapa grafik dapat terlihat terlalu kecil atau sulit dibandingkan.

---

## Perbedaan Rentang Data

Bayangkan tiga fitur:

```text
Age
     30 – 80

Cholesterol
     100 – 400

Income
     1,000,000 – 100,000,000
```

Masing-masing memiliki skala yang berbeda.

Karena itu, jangan langsung menyimpulkan bahwa bentuk distribusi atau variasi suatu fitur lebih besar hanya berdasarkan ukuran visual grafik.

Perhatikan skala sumbu dan unit masing-masing fitur.

---

## Keterbatasan Pandas Direct Plot

Pandas `.plot()` sangat nyaman untuk eksplorasi awal.

Contohnya:

```python
heart_disease.plot.hist(
    subplots=True,
    figsize=(10, 30)
)
```

Namun, ketika kebutuhan visualisasi menjadi lebih kompleks, kita mungkin membutuhkan kontrol yang lebih detail.

Beberapa hal yang mungkin ingin kita atur:

- posisi subplot;
- ukuran masing-masing Axes;
- judul setiap grafik;
- label sumbu;
- skala sumbu;
- bins setiap fitur;
- layout;
- legend;
- spacing antar subplot.

Untuk kebutuhan tersebut, Matplotlib menyediakan pendekatan yang lebih fleksibel.

---

## Object-Oriented Matplotlib

Pada materi sebelumnya kita telah mempelajari pola:

```python
fig, ax = plt.subplots()
```

Pendekatan ini disebut **Object-Oriented (OO) interface**.

Kita mendapatkan:

```text
Figure
  │
  ├── Axes
  ├── Axes
  ├── Axes
  └── Axes
```

Setiap `Axes` dapat dikontrol secara individual.

---

## Membuat Subplots dengan Matplotlib

Contoh:

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(
    nrows=2,
    ncols=2,
    figsize=(10, 8)
)
```

Sekarang kita memiliki empat Axes:

```text
ax[0, 0]    ax[0, 1]

ax[1, 0]    ax[1, 1]
```

Masing-masing Axes dapat digunakan untuk membuat visualisasi berbeda.

---

## Menggunakan Pandas Plot pada Axes Matplotlib

Menariknya, kita tetap dapat menggunakan Pandas untuk membuat histogram tetapi menentukan Axes secara eksplisit.

Contoh:

```python
fig, ax = plt.subplots(
    figsize=(10, 6)
)

heart_disease["age"].plot.hist(
    ax=ax,
    bins=10
)

plt.show()
```

Parameter:

```python
ax=ax
```

memberitahu Pandas bahwa plot harus dibuat pada Axes Matplotlib yang telah kita siapkan.

---

## Keuntungan Pendekatan OO

Pendekatan Object-Oriented memberikan kontrol yang lebih jelas.

Contohnya:

```python
fig, ax = plt.subplots(
    figsize=(10, 6)
)

heart_disease["age"].plot.hist(
    ax=ax,
    bins=20
)

ax.set_title("Distribusi Age")
ax.set_xlabel("Age")
ax.set_ylabel("Frequency")

plt.show()
```

Sekarang kita dapat mengontrol objek `Axes` secara langsung.

---

## Multi-Histogram dengan Matplotlib

Jika kita ingin membuat histogram untuk beberapa fitur secara manual, kita dapat membuat beberapa Axes.

Contoh:

```python
fig, ax = plt.subplots(
    nrows=2,
    ncols=2,
    figsize=(12, 8)
)
```

Kemudian:

```python
heart_disease["age"].plot.hist(
    ax=ax[0, 0],
    bins=10
)

heart_disease["chol"].plot.hist(
    ax=ax[0, 1],
    bins=10
)

heart_disease["trestbps"].plot.hist(
    ax=ax[1, 0],
    bins=10
)

heart_disease["thalach"].plot.hist(
    ax=ax[1, 1],
    bins=10
)
```

Kemudian kita dapat mengatur layout:

```python
fig.tight_layout()

plt.show()
```

---

## Perbandingan Pandas dan Object-Oriented Matplotlib

| Aspek | Pandas `.plot()` | Matplotlib OO |
|---|---|---|
| Kemudahan | Sangat mudah | Lebih eksplisit |
| Kode | Lebih ringkas | Lebih panjang |
| EDA cepat | Sangat cocok | Cocok |
| Kontrol subplot | Terbatas | Sangat fleksibel |
| Customization | Ada | Sangat luas |
| Banyak konfigurasi | Bisa lebih rumit | Lebih terstruktur |

Pandas cocok untuk membuat visualisasi dengan cepat.

Matplotlib OO cocok ketika kita membutuhkan kontrol lebih besar terhadap struktur Figure dan Axes.

---

## Workflow Visualisasi Distribusi

Workflow yang dapat digunakan:

```text
Dataset
   ↓
Load Data
   ↓
Inspect Data
   ↓
Pilih Kolom Numerik
   ↓
Histogram
   ↓
Periksa Distribusi
   ↓
Periksa Nilai Ekstrem
   ↓
Analisis Lebih Lanjut
```

Jika memiliki banyak fitur:

```text
Multiple Features
       ↓
Multiple Histograms
       ↓
Bandingkan Distribusi
       ↓
Identifikasi Pola
       ↓
Feature Understanding
```

---

## Histogram dalam Exploratory Data Analysis

Histogram merupakan salah satu tools dasar dalam EDA.

Sebelum membuat model Machine Learning, kita dapat menggunakan histogram untuk memperoleh gambaran awal mengenai fitur numerik.

Contohnya:

```python
heart_disease["age"].plot.hist(
    bins=20
)
```

Kita dapat mengeksplorasi:

- pusat data;
- spread;
- skewness;
- nilai ekstrem;
- bentuk distribusi;
- kemungkinan adanya kelompok data.

Informasi tersebut dapat membantu menentukan langkah preprocessing berikutnya.

---

## Kesalahan yang Sering Terjadi

### Menganggap Histogram Sama dengan Bar Graph

Histogram dan bar graph sama-sama menggunakan batang, tetapi memiliki tujuan yang berbeda.

Histogram:

```text
Interval numerik → Frekuensi
```

Bar graph:

```text
Kategori → Nilai
```

---

### Menggunakan Terlalu Banyak Bins

Contoh:

```python
bins=100
```

tidak otomatis membuat histogram lebih baik.

Untuk dataset kecil, terlalu banyak bin dapat membuat grafik terlihat sangat berisik.

---

### Menggunakan Terlalu Sedikit Bins

Sebaliknya:

```python
bins=3
```

dapat membuat distribusi terlalu sederhana sehingga detail penting tidak terlihat.

---

### Mengabaikan Skala

Saat membuat banyak histogram, perhatikan bahwa setiap fitur dapat memiliki:

- range berbeda;
- unit berbeda;
- distribusi berbeda.

Jangan membandingkan tinggi atau lebar visual antar grafik tanpa memperhatikan skala sumbu.

---

### Menganggap Histogram Membuktikan Outlier

Histogram hanya membantu menunjukkan kandidat nilai ekstrem.

Untuk menentukan outlier secara formal, kita dapat menggunakan metode statistik atau machine learning yang sesuai dengan konteks.

---

## Contoh Praktik Eksplorasi

Mulai dengan histogram sederhana:

```python
heart_disease["age"].plot.hist()

plt.show()
```

Kemudian coba jumlah bin berbeda:

```python
heart_disease["age"].plot.hist(
    bins=20
)

plt.show()
```

Selanjutnya:

```python
heart_disease["age"].plot.hist(
    bins=50
)

plt.show()
```

Bandingkan bagaimana perubahan jumlah bin memengaruhi tampilan distribusi.

---

## Praktik Multi-Histogram

Kita dapat membuat histogram untuk seluruh kolom numerik:

```python
heart_disease.plot.hist(
    subplots=True,
    figsize=(10, 30)
)

plt.show()
```

Kemudian perhatikan:

1. bentuk distribusi;
2. range setiap fitur;
3. nilai ekstrem;
4. fitur yang memiliki skewness;
5. fitur yang memiliki distribusi berbeda;
6. apakah jumlah bin sudah sesuai.

---

## Ringkasan

Pada materi ini kita mempelajari **visualisasi distribusi data menggunakan Histogram dan Subplots**.

Konsep utama yang dipelajari:

1. Histogram digunakan untuk melihat distribusi data numerik.
2. Histogram dapat dibuat menggunakan `.plot.hist()`.
3. Parameter `kind="hist"` merupakan alternatif.
4. Parameter `bins` mengatur pembagian interval histogram.
5. Jumlah bin memengaruhi tingkat detail visualisasi.
6. Histogram dapat membantu melakukan pemeriksaan awal terhadap kemungkinan outlier.
7. `subplots=True` dapat digunakan untuk membuat histogram terpisah untuk beberapa kolom.
8. `figsize` digunakan untuk mengatur ukuran Figure.
9. Pandas direct plotting praktis untuk EDA.
10. Matplotlib Object-Oriented memberikan kontrol yang lebih besar terhadap Figure dan Axes.

---

## Method dan Parameter Penting

| Method / Parameter | Fungsi |
|---|---|
| `.plot.hist()` | Membuat histogram |
| `.plot(kind="hist")` | Alternatif membuat histogram |
| `bins` | Mengatur jumlah/pembagian bin |
| `subplots=True` | Membuat plot terpisah |
| `figsize` | Mengatur ukuran Figure |
| `plt.subplots()` | Membuat Figure dan Axes |
| `ax=` | Menentukan Axes tujuan |
| `fig.tight_layout()` | Mengatur spacing layout |
| `plt.show()` | Menampilkan grafik |

---

## Inti Materi

Beberapa pola kode yang perlu diingat:

### Histogram Sederhana

```python
heart_disease["age"].plot.hist(
    bins=10
)
```

### Histogram dengan Parameter `kind`

```python
heart_disease["age"].plot(
    kind="hist",
    bins=20
)
```

### Banyak Histogram

```python
heart_disease.plot.hist(
    subplots=True,
    figsize=(10, 30)
)
```

### Histogram dengan Matplotlib OO

```python
fig, ax = plt.subplots(
    figsize=(10, 6)
)

heart_disease["age"].plot.hist(
    ax=ax,
    bins=20
)

fig.tight_layout()

plt.show()
```

Pola ini menggabungkan kemudahan Pandas dengan kontrol visualisasi dari Matplotlib.
