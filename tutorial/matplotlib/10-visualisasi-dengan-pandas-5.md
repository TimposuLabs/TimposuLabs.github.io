---
sidebar_position: 11
title: "Visualisasi Data dari Pandas - 5"
---

## Pyplot vs Object-Oriented Method dengan Pandas dan Matplotlib

Matplotlib menyediakan beberapa cara untuk membuat visualisasi data.

Dua pendekatan yang penting untuk dipahami adalah:

1. **Pyplot Method**
2. **Object-Oriented (OO) Method**

Keduanya dapat digunakan untuk membuat visualisasi yang sama, tetapi cara mengelola grafik dan tingkat kontrol yang diberikan berbeda.

Dalam workflow Data Science, pendekatan Pyplot sering digunakan untuk eksplorasi cepat, sedangkan Object-Oriented Method sangat berguna ketika kita membutuhkan kontrol lebih besar terhadap Figure dan Axes.

---

## Mengapa Perlu Memahami Dua Pendekatan?

Ketika pertama kali belajar Matplotlib, kita biasanya menemukan kode seperti:

```python
plt.plot(x, y)
```

Pendekatan tersebut menggunakan interface `pyplot`.

Ketika kebutuhan visualisasi menjadi lebih kompleks, kita dapat menggunakan:

```python
fig, ax = plt.subplots()

ax.plot(x, y)
```

Pendekatan kedua secara eksplisit bekerja dengan objek:

```text
Figure
  ↓
Axes
  ↓
Plot
```

Memahami perbedaan ini akan membantu kita menulis kode visualisasi yang lebih terstruktur.

---

## Gambaran Umum

Secara sederhana:

```text
Pyplot
  ↓
Cepat dan sederhana
  ↓
Quick Visualization
```

Sedangkan:

```text
Object-Oriented
  ↓
Figure + Axes
  ↓
Kontrol lebih besar
  ↓
Complex Visualization
```

Keduanya bukan dua library yang berbeda.

Keduanya merupakan interface yang tersedia dalam Matplotlib.

---

## Pyplot Method

Pyplot merupakan interface Matplotlib yang menyediakan berbagai fungsi untuk membuat dan mengatur visualisasi.

Biasanya kita menggunakannya melalui:

```python
import matplotlib.pyplot as plt
```

Contoh sederhana:

```python
plt.plot(
    x,
    y
)

plt.show()
```

Dengan pendekatan ini, kita tidak perlu secara eksplisit membuat objek `Axes` terlebih dahulu.

---

## Contoh Pyplot Sederhana

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)

plt.show()
```

Matplotlib akan membuat Figure dan Axes yang diperlukan secara otomatis melalui state internal pyplot.

Pendekatan ini sangat praktis untuk visualisasi sederhana.

---

## Pyplot dengan Pandas

Pandas juga menyediakan interface `.plot()` yang menggunakan Matplotlib sebagai backend.

Misalnya kita memiliki DataFrame:

```python
over_50
```

Kita dapat membuat scatter plot:

```python
over_50.plot(
    kind="scatter",
    x="age",
    y="chol"
)
```

Kemudian:

```python
plt.show()
```

Pandas menangani pembuatan plot dan menggunakan Matplotlib di belakangnya.

---

## Contoh Pyplot dengan Dataset

Misalnya kita ingin melihat hubungan antara:

- `age`;
- `chol`;
- `target`.

Pada dataset:

| age | sex | cp | trestbps | chol | fbs | restecg | thalach | exang | oldpeak | slope | ca | thal | target |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 63 | 1 | 3 | 145 | 233 | 1 | 0 | 150 | 0 | 2.3 | 0 | 0 | 1 | 1 |
| 37 | 1 | 2 | 130 | 250 | 0 | 1 | 187 | 0 | 3.5 | 0 | 0 | 2 | 1 |
| 41 | 0 | 1 | 130 | 204 | 0 | 0 | 172 | 0 | 1.4 | 2 | 0 | 2 | 1 |
| 56 | 1 | 1 | 120 | 236 | 0 | 1 | 178 | 0 | 0.8 | 2 | 0 | 2 | 1 |
| 57 | 0 | 0 | 120 | 354 | 0 | 1 | 163 | 1 | 0.6 | 2 | 0 | 2 | 1 |

Kita dapat menulis:

```python
over_50 = heart_disease[heart_disease["age"] > 50]

over_50.plot(
    kind="scatter",
    x="age",
    y="chol",
    c="target"
)

plt.show()
```

![matplotlib](/img/python/39.png)

Parameter:

```python
x="age"
```

digunakan untuk menentukan kolom sumbu X.

```python
y="chol"
```

digunakan untuk menentukan kolom sumbu Y.

Sedangkan:

```python
c="target"
```

digunakan untuk menentukan nilai yang digunakan sebagai warna titik.

---

## Kelebihan Pyplot

Pyplot memiliki beberapa kelebihan.

### Kode Ringkas

Untuk grafik sederhana, kode yang diperlukan relatif sedikit.

Contoh:

```python
plt.plot(x, y)

plt.show()
```

---

### Cocok untuk Eksplorasi Cepat

Ketika melakukan EDA, kita sering hanya ingin menjawab pertanyaan sederhana:

```text
Bagaimana distribusi data?

Apakah ada hubungan antar variabel?

Bagaimana tren data?

Apakah ada nilai ekstrem?
```

Untuk kebutuhan seperti ini, pyplot dapat sangat praktis.

---

### Mudah Dipelajari

Bagi pemula, fungsi seperti:

```python
plt.plot()
plt.scatter()
plt.bar()
plt.hist()
```

cukup mudah dipahami.

---

## Kekurangan Pyplot

Ketika visualisasi menjadi kompleks, pendekatan state-based pyplot dapat menjadi lebih sulit dikelola.

Misalnya ketika kita memiliki:

- banyak subplot;
- banyak Figure;
- banyak Axes;
- customization yang kompleks;
- visualisasi yang perlu dipelihara dalam kode yang lebih besar.

Dalam kondisi seperti ini, Object-Oriented Method biasanya memberikan struktur yang lebih jelas.

---

## Object-Oriented Method

Object-Oriented Method menggunakan objek Matplotlib secara eksplisit.

Pola dasarnya:

```python
fig, ax = plt.subplots()
```

Kemudian kita menggunakan `ax` untuk membuat plot:

```python
ax.plot(x, y)
```

Terakhir:

```python
plt.show()
```

atau:

```python
fig.show()
```

Dalam praktik Matplotlib, `plt.show()` umum digunakan untuk menampilkan Figure.

---

## Memahami `Figure` dan `Axes`

Object-Oriented Method sangat erat dengan dua konsep:

```text
Figure
   │
   └── Axes
         │
         ├── Plot
         ├── X Axis
         ├── Y Axis
         ├── Title
         ├── Labels
         └── Legend
```

### Figure

`Figure` merupakan keseluruhan container atau canvas tempat visualisasi berada.

Contoh:

```python
fig
```

---

### Axes

`Axes` merupakan area tempat kita benar-benar membuat plot.

Contoh:

```python
ax
```

Jadi:

```python
fig, ax = plt.subplots()
```

menghasilkan:

```text
Figure
  │
  └── Axes
```

---

## Contoh Object-Oriented Method

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

fig, ax = plt.subplots()

ax.plot(x, y)

plt.show()
```

Perbedaan utamanya adalah kita secara eksplisit bekerja dengan objek `Axes`.

---

## Membuat Scatter Plot dengan OO Method

Kita dapat menggabungkan Pandas dengan Object-Oriented Matplotlib.

```python
fig, ax = plt.subplots(
    figsize=(10, 6)
)

over_50.plot(
    kind="scatter",
    x="age",
    y="chol",
    c="target",
    ax=ax
)

plt.show()
```

![matplotlib](/img/python/40.png)

Parameter pentingnya adalah:

```python
ax=ax
```

Parameter tersebut memberitahu Pandas:

> Gunakan Axes yang sudah kita buat.

---

## Mengapa `ax=ax` Penting?

Perhatikan:

```python
fig, ax = plt.subplots()
```

Kita telah membuat sebuah Axes.

Kemudian:

```python
over_50.plot(
    kind="scatter",
    x="age",
    y="chol",
    ax=ax
)
```

Pandas memasukkan plot ke Axes tersebut.

Secara konsep:

```text
plt.subplots()
      ↓
Figure + Axes
      ↓
      ax
      ↓
Pandas .plot(ax=ax)
      ↓
Plot berada pada Axes tersebut
```

Hal ini membuat kita dapat mengontrol Axes secara langsung.

---

## Customization dengan OO Method

Salah satu keuntungan utama OO Method adalah kemampuan melakukan customization terhadap objek `Axes`.

Contohnya mengatur batas sumbu X:

```python
ax.set_xlim(
    [45, 100]
)
```

Contoh lengkap:

```python
fig, ax = plt.subplots(
    figsize=(10, 6)
)

over_50.plot(
    kind="scatter",
    x="age",
    y="chol",
    c="target",
    ax=ax
)

ax.set_xlim(
    [45, 100]
)

plt.show()
```

---

## Mengatur Batas Sumbu Y

Selain X, kita juga dapat mengatur batas Y:

```python
ax.set_ylim(
    [100, 400]
)
```

Contoh:

```python
fig, ax = plt.subplots(
    figsize=(10, 6)
)

over_50.plot(
    kind="scatter",
    x="age",
    y="chol",
    c="target",
    ax=ax
)

ax.set_xlim(
    [45, 100]
)

ax.set_ylim(
    [100, 400]
)

plt.show()
```

Dengan cara ini, kita memiliki kontrol terhadap area data yang ingin ditampilkan.

---

## Mengatur Judul

OO Method juga memungkinkan kita mengatur judul menggunakan:

```python
ax.set_title()
```

Contoh:

```python
ax.set_title(
    "Age vs Cholesterol"
)
```

---

## Mengatur Label Sumbu

Label sumbu X:

```python
ax.set_xlabel(
    "Age"
)
```

Label sumbu Y:

```python
ax.set_ylabel(
    "Cholesterol"
)
```

Contoh lengkap:

```python
fig, ax = plt.subplots(
    figsize=(10, 6)
)

over_50.plot(
    kind="scatter",
    x="age",
    y="chol",
    c="target",
    ax=ax
)

ax.set_title(
    "Age vs Cholesterol"
)

ax.set_xlabel(
    "Age"
)

ax.set_ylabel(
    "Cholesterol"
)

plt.show()
```

---

## Menggunakan `ax.set()`

Matplotlib juga menyediakan method:

```python
ax.set()
```

untuk mengatur beberapa properti sekaligus.

Contoh:

```python
ax.set(
    title="Age vs Cholesterol",
    xlabel="Age",
    ylabel="Cholesterol"
)
```

Sehingga kode dapat menjadi lebih ringkas.

---

## Membuat Banyak Subplot dengan OO Method

Object-Oriented Method sangat berguna ketika kita memiliki banyak subplot.

Contoh:

```python
fig, ax = plt.subplots(
    nrows=2,
    ncols=2,
    figsize=(10, 8)
)
```

Kita akan mendapatkan:

```text
ax[0, 0]    ax[0, 1]

ax[1, 0]    ax[1, 1]
```

Kemudian setiap Axes dapat digunakan secara individual.

Contoh:

```python
ax[0, 0].plot(x, y)

ax[0, 1].scatter(x, y)

ax[1, 0].bar(
    categories,
    values
)

ax[1, 1].hist(
    data
)
```

---

## Keuntungan OO untuk Multi-Plot

Dengan OO Method, kita dapat mengontrol setiap subplot secara individual.

Misalnya:

```python
ax[0, 0].set_title("Line Plot")
ax[0, 1].set_title("Scatter Plot")
ax[1, 0].set_title("Bar Plot")
ax[1, 1].set_title("Histogram")
```

Kita juga dapat memberikan batas sumbu yang berbeda:

```python
ax[0, 0].set_xlim(...)
ax[0, 1].set_xlim(...)
```

Struktur kode menjadi lebih jelas ketika jumlah plot bertambah.

---

## Pyplot vs Object-Oriented

Berikut gambaran sederhana.

### Pyplot

```python
plt.plot(
    x,
    y
)

plt.title(
    "My Plot"
)

plt.xlabel(
    "X"
)

plt.ylabel(
    "Y"
)

plt.show()
```

### Object-Oriented

```python
fig, ax = plt.subplots()

ax.plot(
    x,
    y
)

ax.set_title(
    "My Plot"
)

ax.set_xlabel(
    "X"
)

ax.set_ylabel(
    "Y"
)

plt.show()
```

Keduanya dapat menghasilkan visualisasi yang serupa.

Perbedaannya terdapat pada bagaimana kita mengelola objek visualisasi.

---

## Perbandingan Konsep

| Konsep | Pyplot | Object-Oriented |
|---|---|---|
| Membuat plot | `plt.plot()` | `ax.plot()` |
| Membuat scatter | `plt.scatter()` | `ax.scatter()` |
| Membuat bar | `plt.bar()` | `ax.bar()` |
| Membuat histogram | `plt.hist()` | `ax.hist()` |
| Judul | `plt.title()` | `ax.set_title()` |
| Label X | `plt.xlabel()` | `ax.set_xlabel()` |
| Label Y | `plt.ylabel()` | `ax.set_ylabel()` |
| Batas X | `plt.xlim()` | `ax.set_xlim()` |
| Batas Y | `plt.ylim()` | `ax.set_ylim()` |
| Kontrol Axes | Tidak eksplisit | Eksplisit |

---

## Pyplot Bukan Berarti "Salah"

Penting untuk dipahami bahwa menggunakan pyplot bukan berarti kode kita salah.

Contoh:

```python
plt.plot(x, y)
```

merupakan cara yang valid untuk membuat visualisasi.

Pyplot sangat berguna untuk:

- eksplorasi cepat;
- notebook;
- eksperimen;
- grafik sederhana;
- pembelajaran dasar Matplotlib.

Masalah biasanya muncul ketika struktur visualisasi menjadi lebih kompleks dan kita membutuhkan pengelolaan beberapa Axes secara eksplisit.

---

## Object-Oriented Bukan Berarti Selalu Harus Panjang

Meskipun OO Method terlihat lebih panjang, struktur kode dapat menjadi lebih mudah dipelihara.

Contoh:

```python
fig, ax = plt.subplots(
    figsize=(10, 6)
)

ax.scatter(
    x,
    y
)

ax.set(
    title="My Data",
    xlabel="X",
    ylabel="Y"
)

fig.tight_layout()

plt.show()
```

Struktur ini secara eksplisit menunjukkan:

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

## Menggabungkan Pandas dan OO Matplotlib

Salah satu pola yang sangat berguna adalah menggabungkan Pandas `.plot()` dengan Matplotlib OO.

Contoh:

```python
fig, ax = plt.subplots(
    figsize=(10, 6)
)

over_50.plot(
    kind="scatter",
    x="age",
    y="chol",
    c="target",
    ax=ax
)

ax.set(
    title="Age vs Cholesterol",
    xlabel="Age",
    ylabel="Cholesterol"
)

fig.tight_layout()

plt.show()
```

Dengan pendekatan ini:

```text
Pandas
  ↓
Data Selection
  ↓
Pandas .plot()
  ↓
Matplotlib Axes
  ↓
Customization
```

Ini merupakan pola yang sangat berguna dalam Data Science.

---

## Kapan Menggunakan Pyplot?

Pyplot cocok digunakan ketika:

- ingin membuat grafik sederhana;
- melakukan eksplorasi data dengan cepat;
- membuat prototipe visualisasi;
- bekerja dengan satu atau sedikit plot;
- tidak membutuhkan customization yang kompleks.

Contoh:

```python
df["age"].plot.hist()

plt.show()
```

Kode tersebut sudah cukup untuk eksplorasi awal.

---

## Kapan Menggunakan Object-Oriented Method?

OO Method sangat berguna ketika:

- membuat beberapa subplot;
- membutuhkan customization yang detail;
- mengatur Figure dan Axes secara individual;
- membuat visualisasi untuk laporan;
- membuat grafik yang perlu dipelihara dalam project;
- membutuhkan kontrol terhadap layout dan batas sumbu.

Contoh:

```python
fig, ax = plt.subplots(
    figsize=(10, 6)
)

df.plot(
    x="age",
    y="chol",
    kind="scatter",
    ax=ax
)

ax.set_xlim(
    [45, 100]
)

plt.show()
```

---

## Workflow Visualisasi

Kita dapat menggunakan workflow berikut:

```text
Load Dataset
     ↓
Pandas DataFrame
     ↓
Exploratory Data Analysis
     ↓
Simple Plot?
     │
   Yes ─────────→ Pandas / Pyplot
     │
    No
     ↓
Complex Visualization
     ↓
Object-Oriented Matplotlib
     ↓
Figure + Axes
     ↓
Customization
     ↓
Final Visualization
```

Pendekatan ini membantu kita memilih interface berdasarkan kebutuhan, bukan hanya berdasarkan kebiasaan.

---

## Best Practice untuk Belajar Matplotlib

Saat belajar, sebaiknya memahami keduanya.

Mulailah dengan pyplot:

```python
plt.plot(x, y)
```

Kemudian pahami Object-Oriented:

```python
fig, ax = plt.subplots()

ax.plot(x, y)
```

Dengan demikian kita memahami bahwa keduanya menggunakan Matplotlib tetapi memiliki cara pengelolaan objek yang berbeda.

Untuk visualisasi yang kompleks, biasakan memahami struktur:

```text
Figure
   ↓
Axes
   ↓
Artists / Plot Elements
```

---

## Kesalahan yang Sering Terjadi

### Tidak Memahami Perbedaan Figure dan Axes

Jangan menganggap:

```python
fig
```

dan:

```python
ax
```

merupakan objek yang sama.

`Figure` adalah container keseluruhan, sedangkan `Axes` merupakan area plotting.

---

### Lupa Mengirim `ax`

Ketika menggunakan Pandas bersama OO Matplotlib:

```python
fig, ax = plt.subplots()
```

dan:

```python
df.plot(...)
```

Pandas dapat membuat atau memilih Axes sendiri.

Jika ingin menggunakan Axes yang sudah dibuat, gunakan:

```python
df.plot(
    ax=ax
)
```

---

### Menggunakan Pyplot untuk Struktur yang Sangat Kompleks

Kode seperti:

```python
plt.title(...)
plt.xlabel(...)
plt.ylabel(...)
plt.xlim(...)
plt.ylim(...)
```

dapat menjadi sulit dikelola ketika terdapat banyak Axes.

Dalam kondisi tersebut, pendekatan:

```python
ax.set_title(...)
ax.set_xlabel(...)
ax.set_ylabel(...)
ax.set_xlim(...)
ax.set_ylim(...)
```

lebih eksplisit karena setiap customization diarahkan ke Axes tertentu.

---

## Ringkasan

Pada materi ini kita mempelajari dua pendekatan utama dalam Matplotlib:

### Pyplot Method

Contoh:

```python
plt.plot(
    x,
    y
)
```

Karakteristik:

- sederhana;
- cepat;
- cocok untuk eksplorasi;
- kode relatif ringkas.

---

### Object-Oriented Method

Contoh:

```python
fig, ax = plt.subplots()

ax.plot(
    x,
    y
)
```

Karakteristik:

- Figure dan Axes dikelola secara eksplisit;
- lebih terstruktur;
- cocok untuk multi-subplot;
- memberikan kontrol customization yang lebih besar.

---

## Tabel Ringkasan

| Fitur | Pyplot | Object-Oriented |
|---|---|---|
| Kemudahan awal | Mudah | Sedikit lebih kompleks |
| Kode sederhana | Ringkas | Lebih eksplisit |
| Eksplorasi cepat | Cocok | Cocok |
| Multi-subplot | Bisa | Sangat cocok |
| Customization | Tersedia | Lebih terstruktur |
| Kontrol Axes | Tidak eksplisit | Eksplisit |
| Visualisasi kompleks | Bisa menjadi lebih sulit dikelola | Lebih terstruktur |
| Cocok untuk project besar | Tergantung kebutuhan | Umumnya lebih mudah dipelihara |

---

## Inti Materi

Pola Pyplot:

```python
plt.plot(x, y)
```

Pola Object-Oriented:

```python
fig, ax = plt.subplots()

ax.plot(x, y)
```

Pola Pandas + Object-Oriented:

```python
fig, ax = plt.subplots()

df.plot(
    x="age",
    y="chol",
    kind="scatter",
    ax=ax
)

plt.show()
```

Konsep paling penting adalah memahami bahwa **Pandas dapat membuat plot melalui Matplotlib**, dan kita dapat memberikan Axes tertentu menggunakan parameter `ax`.

Dengan memahami Figure dan Axes, kita dapat beralih dari visualisasi sederhana menuju visualisasi yang lebih terstruktur dan kompleks.
