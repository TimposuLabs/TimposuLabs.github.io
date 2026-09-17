---
sidebar_position: 12
title: "Visualisasi Data dari Pandas - 6"
---

## Membuat Visualisasi dengan Object-Oriented Matplotlib dari Awal

Pada materi sebelumnya kita telah mempelajari perbedaan antara **Pyplot Method** dan **Object-Oriented (OO) Method** pada Matplotlib.

Pada materi ini kita akan menggunakan pendekatan Object-Oriented secara lebih langsung, mulai dari:

1. Membuat `Figure` dan `Axes`.
2. Memasukkan data ke dalam `Axes`.
3. Menambahkan judul dan label.
4. Membuat legend.
5. Menambahkan garis acuan.
6. Melakukan customization pada visualisasi.

Pendekatan ini sangat berguna ketika kita ingin memiliki kontrol yang lebih jelas terhadap setiap komponen grafik.

---

## Konsep Utama Object-Oriented Method

Dalam Object-Oriented Method, kita bekerja secara eksplisit dengan objek:

```text
Figure
   │
   └── Axes
         │
         ├── Plot
         ├── Title
         ├── X Label
         ├── Y Label
         ├── Legend
         └── Reference Line
```

Pola dasarnya adalah:

```python
fig, ax = plt.subplots()
```

Kemudian seluruh elemen visualisasi diarahkan ke objek `ax`.

Contoh:

```python
ax.scatter(...)
ax.set(...)
ax.legend(...)
ax.axhline(...)
```

---

## Dataset yang Digunakan

Pada contoh ini kita menggunakan dataset **Heart Disease**.

| age | sex | cp | trestbps | chol | fbs | restecg | thalach | exang | oldpeak | slope | ca | thal | target |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 63 | 1 | 3 | 145 | 233 | 1 | 0 | 150 | 0 | 2.3 | 0 | 0 | 1 | 1 |
| 37 | 1 | 2 | 130 | 250 | 0 | 1 | 187 | 0 | 3.5 | 0 | 0 | 2 | 1 |
| 41 | 0 | 1 | 130 | 204 | 0 | 0 | 172 | 0 | 1.4 | 2 | 0 | 2 | 1 |
| 56 | 1 | 1 | 120 | 236 | 0 | 1 | 178 | 0 | 0.8 | 2 | 0 | 2 | 1 |
| 57 | 0 | 0 | 120 | 354 | 0 | 1 | 163 | 1 | 0.6 | 2 | 0 | 2 | 1 |

Misalnya dataset sudah dimuat:

```python
import pandas as pd

heart_disease = pd.read_csv(
    "heart-disease.csv"
)
```

Kita dapat membuat subset data yang memiliki usia lebih dari 50 tahun:

```python
over_50 = heart_disease[
    heart_disease["age"] > 50
]
```

Kemudian periksa data:

```python
over_50.head()
```

Subset tersebut akan digunakan untuk membuat scatter plot.

---

## Import Matplotlib

Import Matplotlib:

```python
import matplotlib.pyplot as plt
```

Sehingga setup awal dapat menjadi:

```python
import pandas as pd
import matplotlib.pyplot as plt

heart_disease = pd.read_csv(
    "heart-disease.csv"
)

over_50 = heart_disease[
    heart_disease["age"] > 50
]
```

---

## Langkah 1 - Membuat Figure dan Axes

Langkah pertama adalah membuat Figure dan Axes:

```python
fig, ax = plt.subplots(
    figsize=(10, 6)
)
```

Kode tersebut menghasilkan dua objek:

```text
fig → Figure
ax  → Axes
```

Secara konseptual:

```text
Figure
┌────────────────────────────────────┐
│                                    │
│              Axes                  │
│                                    │
│                                    │
│                                    │
└────────────────────────────────────┘
```

---

## Memahami `fig`

Variabel:

```python
fig
```

merupakan objek **Figure**.

Figure adalah container atau wadah keseluruhan visualisasi.

Figure dapat berisi satu atau lebih Axes.

Contoh:

```text
Figure
 ├── Axes 1
 ├── Axes 2
 ├── Axes 3
 └── Axes 4
```

Ketika hanya membuat satu subplot:

```python
fig, ax = plt.subplots()
```

maka Figure memiliki satu Axes.

---

## Memahami `ax`

Variabel:

```python
ax
```

merupakan objek **Axes**.

Axes adalah area tempat kita membuat plot.

Contoh:

```python
ax.scatter(...)
```

berarti membuat scatter plot pada Axes tersebut.

Dengan OO Method, kita tidak hanya memanggil fungsi global seperti:

```python
plt.scatter(...)
```

tetapi secara eksplisit menentukan Axes:

```python
ax.scatter(...)
```

---

## Mengatur Ukuran Figure

Ukuran Figure dapat diatur menggunakan:

```python
figsize=(10, 6)
```

Contoh:

```python
fig, ax = plt.subplots(
    figsize=(10, 6)
)
```

Nilai `figsize` menggunakan satuan inch.

Dalam contoh tersebut:

```text
Lebar  = 10 inch
Tinggi = 6 inch
```

---

## Langkah 2 - Membuat Scatter Plot

Setelah Figure dan Axes dibuat, kita dapat memasukkan data.

Gunakan:

```python
scatter = ax.scatter(
    x=over_50["age"],
    y=over_50["chol"],
    c=over_50["target"]
)
```

Pada kode tersebut:

```python
x=over_50["age"]
```

menentukan data untuk sumbu X.

```python
y=over_50["chol"]
```

menentukan data untuk sumbu Y.

Sedangkan:

```python
c=over_50["target"]
```

digunakan untuk menentukan warna titik berdasarkan nilai `target`.

---

## Memahami Variabel `scatter`

Perhatikan bahwa hasil `ax.scatter()` disimpan ke:

```python
scatter
```

Contoh:

```python
scatter = ax.scatter(
    x=over_50["age"],
    y=over_50["chol"],
    c=over_50["target"]
)
```

Objek tersebut berguna karena nantinya kita dapat mengambil informasi dari scatter plot untuk membuat legend.

Contohnya:

```python
scatter.legend_elements()
```

---

## Memahami Sumbu X

Pada contoh:

```python
x=over_50["age"]
```

kolom:

```text
age
```

digunakan sebagai variabel X.

Artinya, posisi horizontal setiap titik menunjukkan nilai usia.

---

## Memahami Sumbu Y

Pada contoh:

```python
y=over_50["chol"]
```

kolom:

```text
chol
```

digunakan sebagai variabel Y.

Artinya, posisi vertikal setiap titik menunjukkan nilai kolesterol pada data yang digunakan.

---

## Memahami Parameter `c`

Parameter:

```python
c=over_50["target"]
```

digunakan untuk menentukan warna titik berdasarkan nilai `target`.

Jika `target` memiliki beberapa kategori, warna titik dapat membantu membedakan kelompok tersebut secara visual.

Secara konseptual:

```text
age
  │
  │       ●
  │   ●       ●
  │ ●    ●
  │        ●
  └──────────────── chol
```

Warna setiap titik berasal dari nilai pada kolom `target`.

---

## Langkah 3 - Menambahkan Judul dan Label

Setelah membuat scatter plot, kita dapat memberikan informasi tambahan menggunakan:

```python
ax.set()
```

Contoh:

```python
ax.set(
    title="Heart Disease and Cholesterol Levels",
    xlabel="Age",
    ylabel="Cholesterol"
)
```

Kode tersebut mengatur:

- judul grafik;
- label sumbu X;
- label sumbu Y.

---

## Mengatur Judul

Kita dapat mengatur judul menggunakan:

```python
ax.set_title(
    "Heart Disease and Cholesterol Levels"
)
```

Alternatif yang lebih ringkas:

```python
ax.set(
    title="Heart Disease and Cholesterol Levels"
)
```

---

## Mengatur Label Sumbu X

Gunakan:

```python
ax.set_xlabel(
    "Age"
)
```

atau melalui:

```python
ax.set(
    xlabel="Age"
)
```

Label tersebut membantu pembaca memahami bahwa sumbu X merepresentasikan usia.

---

## Mengatur Label Sumbu Y

Gunakan:

```python
ax.set_ylabel(
    "Cholesterol"
)
```

atau:

```python
ax.set(
    ylabel="Cholesterol"
)
```

Label ini menunjukkan bahwa sumbu Y merepresentasikan nilai kolesterol.

---

## Menggunakan `ax.set()` Sekaligus

Daripada menulis tiga perintah terpisah:

```python
ax.set_title(...)
ax.set_xlabel(...)
ax.set_ylabel(...)
```

kita dapat menggunakan:

```python
ax.set(
    title="Heart Disease and Cholesterol Levels",
    xlabel="Age",
    ylabel="Cholesterol"
)
```

Pendekatan ini membuat customization dasar menjadi lebih ringkas.

---

## Langkah 4 - Membuat Legend

Karena warna titik ditentukan berdasarkan:

```python
c=over_50["target"]
```

kita mungkin ingin memberikan keterangan mengenai kelompok warna tersebut.

Matplotlib menyediakan:

```python
scatter.legend_elements()
```

untuk mengambil elemen legend berdasarkan scatter plot.

Contoh:

```python
ax.legend(
    *scatter.legend_elements(),
    title="Target"
)
```

---

## Memahami `legend_elements()`

Perhatikan:

```python
scatter.legend_elements()
```

Method tersebut menghasilkan elemen yang dapat digunakan untuk membuat legend.

Kemudian:

```python
*
```

digunakan untuk melakukan **argument unpacking** terhadap hasil tersebut.

Sehingga:

```python
ax.legend(
    *scatter.legend_elements(),
    title="Target"
)
```

memberikan elemen tersebut kepada `ax.legend()`.

---

## Menambahkan Judul pada Legend

Parameter:

```python
title="Target"
```

memberikan judul pada legend.

Sehingga secara konseptual:

```text
Target
──────
● 0
● 1
```

Angka atau label yang muncul akan mengikuti nilai kategori yang digunakan pada kolom `target`.

---

## Langkah 5 - Menambahkan Garis Acuan

Kita juga dapat menambahkan garis horizontal menggunakan:

```python
ax.axhline()
```

Misalnya kita ingin menampilkan nilai rata-rata kolesterol.

Pertama hitung mean:

```python
over_50["chol"].mean()
```

Kemudian gunakan hasil tersebut:

```python
ax.axhline(
    over_50["chol"].mean(),
    linestyle="--"
)
```

---

## Memahami `axhline()`

Method:

```python
ax.axhline()
```

digunakan untuk membuat **horizontal reference line**.

Secara visual:

```text
Cholesterol
    │
    │       ●   ●
    │    ●
────┼──────────────────  ← Mean
    │  ●      ●
    │
    └────────────────── Age
```

Garis tersebut membantu memberikan titik referensi untuk membaca posisi data terhadap nilai rata-rata.

---

## Memahami `linestyle="--"`

Parameter:

```python
linestyle="--"
```

menghasilkan garis putus-putus.

Contoh:

```python
ax.axhline(
    over_50["chol"].mean(),
    linestyle="--"
)
```

Kita dapat menggunakan berbagai line style, misalnya:

```text
"-"   → garis solid
"--"  → garis putus-putus
":"   → garis titik-titik
"-."  → kombinasi garis dan titik
```

---

## Menghitung Mean

Mean atau rata-rata dapat dihitung menggunakan:

```python
over_50["chol"].mean()
```

Secara matematis:

```text
Mean = jumlah seluruh nilai / jumlah observasi
```

Misalnya terdapat data:

```text
180
200
220
```

maka:

```text
Mean = (180 + 200 + 220) / 3
     = 200
```

Dalam contoh dataset, nilai aktual mean akan bergantung pada data yang digunakan.

---

## Contoh Lengkap OO Method

Berikut implementasi lengkap dari awal:

```python
import pandas as pd
import matplotlib.pyplot as plt

# Membaca dataset
heart_disease = pd.read_csv(
    "heart-disease.csv"
)

# Mengambil data dengan age > 50
over_50 = heart_disease[
    heart_disease["age"] > 50
]

# 1. Membuat Figure dan Axes
fig, ax = plt.subplots(
    figsize=(10, 6)
)

# 2. Membuat scatter plot
scatter = ax.scatter(
    x=over_50["age"],
    y=over_50["chol"],
    c=over_50["target"]
)

# 3. Menambahkan title dan label
ax.set(
    title="Heart Disease and Cholesterol Levels",
    xlabel="Age",
    ylabel="Cholesterol"
)

# 4. Menambahkan legend
ax.legend(
    *scatter.legend_elements(),
    title="Target"
)

# 5. Menambahkan garis mean
ax.axhline(
    over_50["chol"].mean(),
    linestyle="--"
)

# Menampilkan grafik
plt.show()
```

---

## Memahami Alur Kode

Kode tersebut dapat dibagi menjadi lima tahap:

```text
1. Setup
   ↓
Figure + Axes

2. Plot
   ↓
Scatter Plot

3. Labeling
   ↓
Title + X Label + Y Label

4. Legend
   ↓
Target Categories

5. Reference Line
   ↓
Mean Cholesterol
```

Struktur seperti ini membuat kode visualisasi lebih mudah dibaca.

---

## Workflow Object-Oriented Matplotlib

Secara umum, workflow OO Method dapat ditulis:

```text
Create Figure
      ↓
Create Axes
      ↓
Plot Data
      ↓
Customize Axes
      ↓
Add Supporting Elements
      ↓
Adjust Layout
      ↓
Display / Save
```

Dalam kode:

```python
fig, ax = plt.subplots()

ax.scatter(...)

ax.set(...)

ax.legend(...)

ax.axhline(...)

fig.tight_layout()

plt.show()
```

---

## Menambahkan `tight_layout()`

Jika grafik memiliki banyak elemen, kita dapat menggunakan:

```python
fig.tight_layout()
```

Contoh:

```python
fig.tight_layout()

plt.show()
```

Method ini membantu mengatur spacing antar elemen Figure agar tidak terlalu bertumpuk.

---

## Menyimpan Grafik

Selain menampilkan grafik, kita dapat menyimpannya sebagai file.

Gunakan:

```python
fig.savefig(
    "heart-disease-plot.png"
)
```

Contoh:

```python
fig, ax = plt.subplots(
    figsize=(10, 6)
)

ax.scatter(
    over_50["age"],
    over_50["chol"],
    c=over_50["target"]
)

ax.set(
    title="Heart Disease and Cholesterol Levels",
    xlabel="Age",
    ylabel="Cholesterol"
)

fig.tight_layout()

fig.savefig(
    "heart-disease-plot.png"
)

plt.show()
```

Pendekatan ini berguna ketika grafik akan digunakan untuk:

- laporan;
- dokumentasi;
- presentasi;
- artikel;
- publikasi;
- analisis lebih lanjut.

---

## Mengatur Batas Sumbu

OO Method juga memudahkan kita mengatur batas sumbu.

Contoh:

```python
ax.set_xlim(
    [45, 100]
)
```

Untuk sumbu Y:

```python
ax.set_ylim(
    [100, 400]
)
```

Contoh:

```python
ax.set_xlim(
    [45, 100]
)

ax.set_ylim(
    [100, 400]
)
```

Pengaturan ini dapat membantu ketika kita ingin fokus pada area tertentu.

Namun, batas sumbu sebaiknya dipilih berdasarkan kebutuhan analisis dan tidak digunakan untuk menyembunyikan bagian data secara menyesatkan.

---

## Menambahkan Beberapa Elemen pada Satu Axes

Salah satu kekuatan OO Method adalah kita dapat menambahkan banyak elemen ke Axes yang sama.

Contohnya:

```python
ax.scatter(...)

ax.axhline(...)

ax.set(...)

ax.legend(...)
```

Semuanya bekerja pada objek:

```python
ax
```

Secara konseptual:

```text
             Figure
                │
                ▼
              Axes
                │
      ┌─────────┼─────────┐
      ▼         ▼         ▼
   Scatter     Mean     Legend
     Plot      Line
```

---

## Mengapa Menyimpan Hasil `scatter()`?

Kita dapat langsung menulis:

```python
ax.scatter(
    x=over_50["age"],
    y=over_50["chol"],
    c=over_50["target"]
)
```

Tetapi pada contoh ini kita menyimpan hasilnya:

```python
scatter = ax.scatter(
    x=over_50["age"],
    y=over_50["chol"],
    c=over_50["target"]
)
```

Alasannya adalah kita membutuhkan objek scatter untuk membuat legend:

```python
scatter.legend_elements()
```

Jadi objek hasil plotting dapat digunakan kembali untuk customization berikutnya.

---

## Pyplot vs OO pada Contoh Ini

### Pendekatan Pyplot

Secara sederhana kita dapat menulis:

```python
plt.scatter(
    over_50["age"],
    over_50["chol"],
    c=over_50["target"]
)

plt.title(
    "Heart Disease and Cholesterol Levels"
)

plt.xlabel(
    "Age"
)

plt.ylabel(
    "Cholesterol"
)

plt.show()
```

### Pendekatan OO

Dengan OO Method:

```python
fig, ax = plt.subplots(
    figsize=(10, 6)
)

ax.scatter(
    over_50["age"],
    over_50["chol"],
    c=over_50["target"]
)

ax.set(
    title="Heart Disease and Cholesterol Levels",
    xlabel="Age",
    ylabel="Cholesterol"
)

plt.show()
```

Pada contoh OO, hubungan antara plot dan Axes terlihat secara eksplisit.

---

## Keuntungan Pendekatan OO

Object-Oriented Method memberikan beberapa keuntungan:

### Kontrol terhadap Axes

Kita dapat mengatur Axes tertentu:

```python
ax.set_xlim(...)
```

---

### Mudah untuk Multi-Plot

Contoh:

```python
fig, ax = plt.subplots(
    2,
    2
)
```

Kemudian:

```python
ax[0, 0].scatter(...)
ax[0, 1].hist(...)
ax[1, 0].bar(...)
ax[1, 1].plot(...)
```

---

### Struktur Kode Lebih Jelas

Kode secara eksplisit menunjukkan:

```text
Figure
  ↓
Axes
  ↓
Plot
  ↓
Customization
```

---

### Mudah Dikembangkan

Setelah memahami pola:

```python
fig, ax = plt.subplots()
```

kita dapat menambahkan:

- title;
- labels;
- legend;
- grid;
- reference line;
- limits;
- annotations;
- multiple plots;
- saving.

---

## Kesalahan yang Sering Terjadi

### Lupa Membuat Figure dan Axes

OO Method membutuhkan objek Axes.

Gunakan:

```python
fig, ax = plt.subplots()
```

sebelum:

```python
ax.scatter(...)
```

---

### Menggunakan `plt` dan `ax` Secara Tidak Konsisten

Contoh:

```python
fig, ax = plt.subplots()

ax.scatter(...)

plt.title(...)
```

Kode tersebut dapat bekerja, tetapi jika tujuan kita adalah mempraktikkan OO Method secara konsisten, lebih baik customization diarahkan ke Axes:

```python
ax.set_title(...)
```

atau:

```python
ax.set(...)
```

---

### Lupa Parameter `ax` pada Pandas

Jika menggunakan Pandas:

```python
fig, ax = plt.subplots()

over_50.plot(
    kind="scatter",
    x="age",
    y="chol",
    ax=ax
)
```

Parameter:

```python
ax=ax
```

diperlukan agar Pandas menggunakan Axes yang telah kita buat.

---

### Menganggap Garis Mean sebagai Batas

Garis:

```python
ax.axhline(
    over_50["chol"].mean(),
    linestyle="--"
)
```

hanya menunjukkan nilai rata-rata.

Garis tersebut bukan batas statistik yang otomatis menentukan apakah suatu data normal, abnormal, atau outlier.

---

## Ringkasan Method Penting

| Method | Fungsi |
|---|---|
| `plt.subplots()` | Membuat Figure dan Axes |
| `ax.scatter()` | Membuat scatter plot |
| `ax.plot()` | Membuat line plot |
| `ax.bar()` | Membuat bar plot |
| `ax.hist()` | Membuat histogram |
| `ax.set()` | Mengatur beberapa properti Axes |
| `ax.set_title()` | Mengatur judul |
| `ax.set_xlabel()` | Mengatur label X |
| `ax.set_ylabel()` | Mengatur label Y |
| `ax.legend()` | Menambahkan legend |
| `scatter.legend_elements()` | Menghasilkan elemen legend dari scatter plot |
| `ax.axhline()` | Menambahkan garis horizontal |
| `ax.set_xlim()` | Mengatur batas X |
| `ax.set_ylim()` | Mengatur batas Y |
| `fig.tight_layout()` | Mengatur layout |
| `fig.savefig()` | Menyimpan Figure |

---

## Ringkasan Alur OO Method

Pola dasar yang perlu diingat:

```python
# 1. Setup
fig, ax = plt.subplots()

# 2. Plot
ax.scatter(
    x,
    y
)

# 3. Customize
ax.set(
    title="My Plot",
    xlabel="X",
    ylabel="Y"
)

# 4. Supporting elements
ax.legend()

# 5. Display
plt.show()
```

Untuk visualisasi yang lebih kompleks:

```python
fig, ax = plt.subplots(
    figsize=(10, 6)
)

scatter = ax.scatter(
    x=over_50["age"],
    y=over_50["chol"],
    c=over_50["target"]
)

ax.set(
    title="Heart Disease and Cholesterol Levels",
    xlabel="Age",
    ylabel="Cholesterol"
)

ax.legend(
    *scatter.legend_elements(),
    title="Target"
)

ax.axhline(
    over_50["chol"].mean(),
    linestyle="--"
)

fig.tight_layout()

plt.show()
```

---

## Inti Materi

Object-Oriented Method dapat diringkas menjadi:

```text
plt.subplots()
      ↓
Figure + Axes
      ↓
ax.scatter()
      ↓
ax.set()
      ↓
ax.legend()
      ↓
ax.axhline()
      ↓
fig.tight_layout()
      ↓
plt.show()
```

Konsep terpenting adalah bahwa **`Figure` merupakan container keseluruhan**, sedangkan **`Axes` merupakan area tempat data divisualisasikan**.

Dengan bekerja secara eksplisit menggunakan `ax`, kita mendapatkan kontrol yang lebih terstruktur terhadap visualisasi.
