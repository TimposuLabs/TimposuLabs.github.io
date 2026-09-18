---
sidebar_position: 14
title: "Visualisasi Data dari Pandas - 7"
---

## Subplots dengan Object-Oriented Matplotlib dan Shared X-Axis

Pada materi sebelumnya kita telah mempelajari cara membuat visualisasi menggunakan pendekatan **Object-Oriented (OO) Matplotlib**.

Pada materi ini kita akan melanjutkannya dengan membuat **dua grafik dalam satu Figure** menggunakan `subplots()`.

Kita juga akan mempelajari bagaimana membuat beberapa grafik yang **membagikan sumbu X yang sama** menggunakan parameter `sharex=True`.

Studi kasus yang digunakan adalah dataset yang sama, yaitu **Heart Disease**.

## Tujuan Pembelajaran

Setelah mempelajari materi ini, kita diharapkan dapat:

- Membuat beberapa subplot menggunakan Object-Oriented Matplotlib.
- Membuat subplot dengan susunan 2 baris dan 1 kolom.
- Memahami perbedaan `Figure` dan `Axes`.
- Menggunakan `sharex=True`.
- Membuat scatter plot pada beberapa `Axes`.
- Menambahkan legenda pada setiap subplot.
- Menambahkan garis rata-rata menggunakan `axhline()`.
- Memberikan judul untuk setiap subplot.
- Memberikan judul utama untuk seluruh Figure menggunakan `fig.suptitle()`.

## Persiapan Data

Pada contoh ini kita menggunakan dataset Heart Disease.

Misalnya DataFrame sudah tersedia dalam variabel `heart_disease`.

Kita kemudian mengambil data pasien dengan usia lebih dari 50 tahun:

```python
over_50 = heart_disease[heart_disease["age"] > 50]
```

Variabel `over_50` sekarang berisi data pasien yang memiliki usia lebih dari 50 tahun.

Kita akan menggunakan beberapa kolom:

| Kolom | Keterangan |
|---|---|
| `age` | Usia pasien |
| `chol` | Kadar kolesterol |
| `thalach` | Detak jantung maksimum |
| `target` | Target/kategori penyakit jantung |

Pada visualisasi pertama kita akan membandingkan:

```text
Age → Cholesterol
```

Sedangkan pada visualisasi kedua:

```text
Age → Maximum Heart Rate
```

Dengan demikian kita dapat melihat dua hubungan berbeda dengan variabel X yang sama, yaitu `age`.

## Membuat Figure dan Dua Subplot

Kita dapat membuat dua subplot menggunakan:

```python
import matplotlib.pyplot as plt

fig, (ax0, ax1) = plt.subplots(
    nrows=2,
    ncols=1,
    figsize=(10, 10),
    sharex=True
)
```

Mari kita pahami bagian-bagiannya.

### `plt.subplots()`

Fungsi `plt.subplots()` digunakan untuk membuat:

1. sebuah `Figure`
2. satu atau beberapa `Axes`

Pada contoh ini kita meminta dua subplot.

```python
nrows=2
ncols=1
```

Artinya:

```text
2 baris
1 kolom
```

Secara visual susunannya seperti:

```text
┌─────────────────────────────┐
│            ax0              │
│                             │
├─────────────────────────────┤
│            ax1              │
│                             │
└─────────────────────────────┘
```

`ax0` adalah subplot pertama.

`ax1` adalah subplot kedua.

## Memahami Figure dan Axes

Dalam Object-Oriented Matplotlib terdapat dua konsep penting:

### Figure

`Figure` adalah wadah utama yang menampung seluruh visualisasi.

Dalam contoh:

```python
fig
```

merepresentasikan seluruh gambar.

Di dalam satu Figure kita dapat memiliki beberapa `Axes`.

### Axes

`Axes` adalah area tempat sebuah grafik dibuat.

Dalam contoh:

```python
ax0
```

adalah area grafik pertama.

Sedangkan:

```python
ax1
```

adalah area grafik kedua.

Strukturnya dapat dibayangkan seperti:

```text
Figure
│
├── Axes (ax0)
│   └── Scatter plot
│
└── Axes (ax1)
    └── Scatter plot
```

Hal ini berbeda dengan istilah **Axis**.

Secara sederhana:

```text
Figure
└── Axes
    ├── X Axis
    └── Y Axis
```

Jadi jangan tertukar antara `Axes` dan `Axis`.

## Menggunakan `sharex=True`

Pada kode sebelumnya terdapat:

```python
sharex=True
```

Parameter ini membuat subplot menggunakan **sumbu X yang dibagikan**.

Dalam contoh kita, sumbu X adalah:

```python
over_50["age"]
```

Artinya kedua grafik menggunakan `age` sebagai variabel X.

Secara konsep:

```text
              Age
               │
      ┌────────┴────────┐
      │                 │
      ▼                 ▼
   Cholesterol      Max Heart Rate
```

Dengan `sharex=True`, navigasi dan rentang sumbu X antar subplot dapat disinkronkan.

Hal ini sangat berguna ketika kita ingin membandingkan beberapa variabel terhadap satu variabel yang sama.

Contohnya:

```text
Age → Cholesterol

Age → Maximum Heart Rate

Age → Blood Pressure

Age → Weight
```

Semua grafik tersebut dapat menggunakan sumbu X `Age` yang sama.

## Membuat Scatter Plot Pertama

Selanjutnya kita membuat scatter plot pada `ax0`.

```python
scatter0 = ax0.scatter(
    x=over_50["age"],
    y=over_50["chol"],
    c=over_50["target"]
)
```

Pada grafik ini:

- Sumbu X menggunakan `age`.
- Sumbu Y menggunakan `chol`.
- Warna titik ditentukan berdasarkan `target`.

Secara konsep:

```text
X = Age
Y = Cholesterol
Color = Target
```

`scatter()` mengembalikan objek scatter yang kita simpan dalam:

```python
scatter0
```

Objek tersebut nantinya dapat digunakan untuk membuat legenda.

## Memberikan Label pada Grafik Pertama

Kita dapat memberikan judul dan label sumbu menggunakan:

```python
ax0.set(
    title="Heart Disease and Cholesterol Levels",
    ylabel="Cholesterol"
)
```

Perhatikan bahwa kita tidak perlu menggunakan:

```python
plt.title()
```

karena kita sedang menggunakan pendekatan Object-Oriented.

Kita langsung memberikan pengaturan kepada `ax0`.

```text
ax0
├── title
└── ylabel
```

Karena sumbu X dibagikan menggunakan `sharex=True`, label X dapat ditampilkan pada subplot bawah.

## Menambahkan Legenda

Scatter plot menggunakan warna untuk membedakan nilai `target`.

Kita dapat membuat legenda menggunakan:

```python
ax0.legend(
    *scatter0.legend_elements(),
    title="Target"
)
```

Bagian:

```python
scatter0.legend_elements()
```

digunakan untuk memperoleh elemen-elemen yang dapat digunakan dalam legenda berdasarkan objek scatter.

Kemudian:

```python
title="Target"
```

memberikan judul pada legenda.

Hasil konsepnya kira-kira:

```text
Target
● 0
● 1
```

Nilai dan tampilannya bergantung pada data yang digunakan.

## Menambahkan Garis Rata-Rata

Kita juga dapat menambahkan garis horizontal untuk menunjukkan nilai rata-rata kolesterol:

```python
ax0.axhline(
    over_50["chol"].mean(),
    linestyle="--"
)
```

Mari kita pecah.

### `over_50["chol"].mean()`

Bagian ini menghitung nilai rata-rata kolesterol:

```python
over_50["chol"].mean()
```

Misalnya hasilnya:

```text
245
```

maka garis akan ditempatkan pada:

```text
Y = 245
```

### `axhline()`

`axhline()` digunakan untuk membuat **garis horizontal** pada nilai tertentu.

Contoh:

```python
ax0.axhline(245)
```

akan membuat garis horizontal pada `y = 245`.

Pada contoh kita, nilai tersebut tidak ditulis secara manual, tetapi dihitung dari rata-rata:

```python
over_50["chol"].mean()
```

Sehingga jika data berubah, posisi garis rata-rata juga akan berubah.

### Garis Putus-Putus

Kita menggunakan:

```python
linestyle="--"
```

untuk membuat garis putus-putus.

Perlu diperhatikan bahwa garis rata-rata ini hanya merupakan **referensi statistik**.

Garis tersebut bukan berarti:

- batas aman,
- batas diagnosis,
- atau batas seseorang terkena penyakit jantung.

Interpretasi medis membutuhkan konteks klinis dan sumber data yang sesuai.

## Membuat Scatter Plot Kedua

Selanjutnya kita membuat grafik kedua pada `ax1`.

```python
scatter1 = ax1.scatter(
    x=over_50["age"],
    y=over_50["thalach"],
    c=over_50["target"]
)
```

Pada grafik ini:

```text
X = Age
Y = Maximum Heart Rate
Color = Target
```

Jadi grafik kedua menunjukkan hubungan antara usia dan detak jantung maksimum.

## Memberikan Label pada Grafik Kedua

Kita memberikan judul dan label:

```python
ax1.set(
    title="Heart Disease and Max Heart Rate",
    xlabel="Age",
    ylabel="Max Heart Rate"
)
```

Perhatikan bahwa `ax1` memiliki:

```python
xlabel="Age"
```

karena subplot ini berada di bagian bawah.

Karena kita menggunakan:

```python
sharex=True
```

sumbu X kedua subplot menggunakan variabel yang sama.

## Menambahkan Legenda pada Grafik Kedua

Kita juga menambahkan legenda:

```python
ax1.legend(
    *scatter1.legend_elements(),
    title="Target"
)
```

Sama seperti grafik pertama, warna titik digunakan untuk merepresentasikan nilai `target`.

## Menambahkan Garis Rata-Rata pada Grafik Kedua

Kita dapat menambahkan garis rata-rata `thalach`:

```python
ax1.axhline(
    over_50["thalach"].mean(),
    linestyle="--"
)
```

Dengan demikian grafik kedua memiliki garis referensi berdasarkan nilai rata-rata maximum heart rate pada subset data tersebut.

Sekali lagi, garis ini adalah **referensi statistik**, bukan batas klinis.

## Memberikan Judul Utama Figure

Selain judul masing-masing subplot, kita dapat memberikan satu judul utama untuk seluruh Figure.

Gunakan:

```python
fig.suptitle(
    "Heart Disease Analysis",
    fontsize=16,
    fontweight="bold"
)
```

Perhatikan bahwa kita menggunakan:

```python
fig.suptitle()
```

bukan:

```python
ax0.set_title()
```

atau:

```python
ax1.set_title()
```

Karena judul tersebut ditujukan untuk **seluruh Figure**.

Strukturnya:

```text
          Heart Disease Analysis
                   │
       ┌───────────┴───────────┐
       │                       │
       ▼                       ▼
   ax0 title               ax1 title
```

## Kode Lengkap

Berikut kode lengkap dari visualisasi yang telah kita pelajari:

```python
import matplotlib.pyplot as plt

# Membuat Figure dan dua subplot
fig, (ax0, ax1) = plt.subplots(
    nrows=2,
    ncols=1,
    figsize=(10, 10),
    sharex=True
)

# ----------------------------------------------------
# Plot pertama: Age vs Cholesterol
# ----------------------------------------------------

scatter0 = ax0.scatter(
    x=over_50["age"],
    y=over_50["chol"],
    c=over_50["target"]
)

ax0.set(
    title="Heart Disease and Cholesterol Levels",
    ylabel="Cholesterol"
)

ax0.legend(
    *scatter0.legend_elements(),
    title="Target"
)

ax0.axhline(
    over_50["chol"].mean(),
    linestyle="--"
)

# ----------------------------------------------------
# Plot kedua: Age vs Maximum Heart Rate
# ----------------------------------------------------

scatter1 = ax1.scatter(
    x=over_50["age"],
    y=over_50["thalach"],
    c=over_50["target"]
)

ax1.set(
    title="Heart Disease and Max Heart Rate",
    xlabel="Age",
    ylabel="Max Heart Rate"
)

ax1.legend(
    *scatter1.legend_elements(),
    title="Target"
)

ax1.axhline(
    over_50["thalach"].mean(),
    linestyle="--"
)

# ----------------------------------------------------
# Judul utama Figure
# ----------------------------------------------------

fig.suptitle(
    "Heart Disease Analysis",
    fontsize=16,
    fontweight="bold"
)

plt.show()
```

![matplotlib](/img/python/44.png)

## Menambahkan `tight_layout()`

Ketika membuat beberapa subplot, terkadang terdapat elemen yang terlalu berdekatan.

Kita dapat menggunakan:

```python
fig.tight_layout()
```

untuk membantu mengatur tata letak.

Contohnya:

```python
fig.tight_layout()
plt.show()
```

Namun, ketika menggunakan `fig.suptitle()`, judul utama berada di area atas Figure sehingga kita perlu memastikan layout tidak bertabrakan dengan judul tersebut.

Salah satu pendekatan yang umum adalah memberikan ruang bagian atas:

```python
fig.tight_layout(rect=[0, 0, 1, 0.96])
```

Artinya layout utama menggunakan sebagian besar area Figure dan menyisakan ruang di bagian atas untuk `suptitle`.

Contoh:

```python
fig.suptitle(
    "Heart Disease Analysis",
    fontsize=16,
    fontweight="bold"
)

fig.tight_layout(rect=[0, 0, 1, 0.96])

plt.show()
```

## Memahami Struktur Kode

Kode tersebut dapat kita pahami sebagai beberapa tahap.

### Tahap 1 - Membuat Figure

```python
fig, (ax0, ax1) = plt.subplots(
    nrows=2,
    ncols=1,
    figsize=(10, 10),
    sharex=True
)
```

Menghasilkan:

```text
Figure
│
├── ax0
└── ax1
```

### Tahap 2 - Membuat Grafik

```python
ax0.scatter(...)
ax1.scatter(...)
```

Setiap `Axes` memiliki grafiknya sendiri.

### Tahap 3 - Memberikan Label

```python
ax0.set(...)
ax1.set(...)
```

Setiap subplot dapat dikustomisasi secara independen.

### Tahap 4 - Menambahkan Informasi Pendukung

```python
ax0.legend(...)
ax1.legend(...)
```

dan:

```python
ax0.axhline(...)
ax1.axhline(...)
```

### Tahap 5 - Mengatur Figure

```python
fig.suptitle(...)
fig.tight_layout(...)
```

Pengaturan pada `fig` berlaku pada keseluruhan Figure.

## Mengapa Menggunakan `sharex=True`?

Bayangkan kita memiliki empat grafik:

```text
Age → Cholesterol

Age → Max Heart Rate

Age → Blood Pressure

Age → Weight
```

Jika masing-masing grafik mempunyai rentang X yang berbeda, membandingkan pola berdasarkan usia menjadi lebih sulit.

Dengan `sharex=True`, kita dapat membuat sumbu X digunakan bersama.

Konsepnya:

```text
                  Age
                   │
        ┌──────────┼──────────┐
        │          │          │
        ▼          ▼          ▼
       Chol      Thalach    Blood Pressure
```

Hal ini sangat berguna untuk **exploratory data analysis (EDA)** ketika kita ingin melihat beberapa hubungan terhadap variabel X yang sama.

## `sharex` Tidak Berarti Semua Data Sama

Penting untuk memahami bahwa:

```python
sharex=True
```

tidak berarti kedua grafik memiliki data yang sama.

Yang dibagikan adalah **sumbu X**, bukan nilai Y.

Contohnya:

```python
ax0.scatter(
    over_50["age"],
    over_50["chol"]
)
```

menggunakan:

```text
X = age
Y = chol
```

Sedangkan:

```python
ax1.scatter(
    over_50["age"],
    over_50["thalach"]
)
```

menggunakan:

```text
X = age
Y = thalach
```

Jadi:

```text
X sama
Y berbeda
```

## Perbandingan Tanpa dan Dengan `sharex`

Tanpa `sharex`:

```python
fig, (ax0, ax1) = plt.subplots(
    2,
    1
)
```

Kedua subplot mempunyai pengaturan sumbu X masing-masing.

Dengan:

```python
fig, (ax0, ax1) = plt.subplots(
    2,
    1,
    sharex=True
)
```

kedua subplot menggunakan sumbu X secara bersama.

Hal ini membuat perbandingan berdasarkan variabel X menjadi lebih konsisten.

## `axhline()` vs `axvline()`

Kita telah menggunakan:

```python
axhline()
```

Huruf `h` dapat diingat sebagai:

```text
h = horizontal
```

Contoh:

```python
ax.axhline(100)
```

membuat garis horizontal pada:

```text
Y = 100
```

Matplotlib juga menyediakan:

```python
ax.axvline()
```

Huruf `v` dapat diingat sebagai:

```text
v = vertical
```

Contoh:

```python
ax.axvline(50)
```

membuat garis vertikal pada:

```text
X = 50
```

Secara sederhana:

| Fungsi | Arah | Digunakan untuk |
|---|---|---|
| `axhline()` | Horizontal | Referensi nilai Y |
| `axvline()` | Vertikal | Referensi nilai X |

## Menggunakan `fig.savefig()`

Setelah visualisasi selesai, Figure dapat disimpan ke file.

Contoh:

```python
fig.savefig(
    "heart-disease-subplots.png",
    dpi=300,
    bbox_inches="tight"
)
```

Keterangan:

- `fig.savefig()` menyimpan Figure.
- `.png` menentukan format file.
- `dpi=300` menentukan resolusi raster.
- `bbox_inches="tight"` membantu mengurangi area kosong di sekitar gambar.

Sebaiknya `tight_layout()` atau pengaturan layout lainnya dilakukan sebelum menyimpan Figure jika diperlukan.

## Kesalahan yang Sering Terjadi

### Menggunakan `plt.title()` pada Setiap Subplot

Dalam pendekatan Object-Oriented, lebih jelas menggunakan:

```python
ax0.set_title("Judul")
```

atau:

```python
ax0.set(title="Judul")
```

daripada mengandalkan state global `plt.title()`.

### Mengira `ax0` dan `ax1` Adalah Figure

Bukan.

Strukturnya adalah:

```text
fig
│
├── ax0
└── ax1
```

`fig` adalah Figure.

`ax0` dan `ax1` adalah Axes.

### Lupa Menentukan `sharex=True`

Jika tujuan kita adalah membandingkan beberapa grafik berdasarkan variabel X yang sama, pertimbangkan penggunaan:

```python
sharex=True
```

### Menganggap Garis Mean sebagai Batas

Kode:

```python
ax.axhline(data.mean())
```

hanya menunjukkan nilai rata-rata.

Garis tersebut tidak otomatis menjadi:

- batas normal,
- batas abnormal,
- batas diagnosis,
- atau threshold machine learning.

Interpretasi harus disesuaikan dengan konteks data dan tujuan analisis.

## Konsep Penting yang Perlu Diingat

Struktur Object-Oriented Matplotlib pada materi ini dapat diringkas menjadi:

```text
Figure
│
├── Axes 0
│   ├── Scatter
│   ├── Title
│   ├── Y Label
│   ├── Legend
│   └── Mean Line
│
└── Axes 1
    ├── Scatter
    ├── Title
    ├── X Label
    ├── Y Label
    ├── Legend
    └── Mean Line
```

Sedangkan:

```python
sharex=True
```

membuat kedua subplot berbagi sumbu X.

## Ringkasan

Pada materi ini kita telah mempelajari cara membuat beberapa subplot menggunakan Object-Oriented Matplotlib.

Konsep utamanya adalah:

1. `plt.subplots()` digunakan untuk membuat Figure dan Axes.
2. `fig` merepresentasikan Figure.
3. `ax0` dan `ax1` merepresentasikan masing-masing subplot.
4. `nrows=2` membuat dua baris.
5. `ncols=1` membuat satu kolom.
6. `sharex=True` membuat subplot berbagi sumbu X.
7. `ax.scatter()` digunakan untuk membuat scatter plot.
8. `ax.legend()` digunakan untuk membuat legenda.
9. `axhline()` digunakan untuk membuat garis horizontal.
10. `fig.suptitle()` digunakan untuk memberikan judul utama Figure.
11. `fig.tight_layout()` membantu mengatur jarak antar elemen.
12. `fig.savefig()` dapat digunakan untuk menyimpan visualisasi.

## Pola Object-Oriented yang Perlu Diingat

Pola dasar yang dapat digunakan kembali adalah:

```python
fig, axes = plt.subplots(...)

axes[0].plot(...)
axes[1].scatter(...)

axes[0].set(...)
axes[1].set(...)

fig.suptitle(...)

fig.tight_layout()

plt.show()
```

Semakin kompleks visualisasi yang dibuat, pola seperti ini akan semakin membantu karena setiap subplot dapat dikontrol secara langsung melalui objek `Axes` masing-masing.
