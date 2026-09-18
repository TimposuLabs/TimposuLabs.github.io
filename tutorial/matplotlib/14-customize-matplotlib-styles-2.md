---
sidebar_position: 15
title: "Customizing Matplotlib Styles - 2"
---

## Kustomisasi Style, Color Maps, dan Axis Limits pada Matplotlib

Pada materi sebelumnya kita telah mempelajari cara melakukan kustomisasi visualisasi menggunakan **Object-Oriented Matplotlib**.

Pada materi ini kita akan melanjutkan kustomisasi dengan mempelajari tiga konsep penting:

- **Style**
- **Color Map (`cmap`)**
- **Axis Limits (`xlim` dan `ylim`)**

Ketiga konsep tersebut membantu kita membuat visualisasi yang lebih mudah dibaca dan memfokuskan perhatian pada bagian data yang relevan.

## Tujuan Pembelajaran

Setelah mempelajari materi ini, kita diharapkan dapat:

- Menggunakan style bawaan Matplotlib.
- Memahami konsep color map.
- Menggunakan parameter `cmap` pada scatter plot.
- Memahami hubungan antara `c` dan `cmap`.
- Mengatur batas sumbu X menggunakan `set_xlim()`.
- Mengatur batas sumbu Y menggunakan `set_ylim()`.
- Menggabungkan style, color map, dan axis limits dalam satu visualisasi.
- Membuat visualisasi dengan beberapa subplot menggunakan pendekatan Object-Oriented.

## Mengapa Visualisasi Perlu Dikustomisasi?

Grafik yang dibuat dengan pengaturan default sebenarnya sudah dapat digunakan.

Namun, dalam Data Science kita sering ingin:

- menonjolkan pola tertentu,
- membandingkan kelompok data,
- mengurangi area kosong,
- membuat grafik lebih mudah dibaca,
- menjaga konsistensi tampilan,
- dan membantu pembaca memahami informasi penting.

Contohnya:

```text
Data
 ↓
Visualisasi Default
 ↓
Kustomisasi
 ├── Style
 ├── Color
 ├── Axis Limits
 ├── Label
 └── Legend
 ↓
Visualisasi yang lebih informatif
```

## Menggunakan Style pada Matplotlib

Matplotlib memiliki berbagai style bawaan yang dapat digunakan untuk mengubah tampilan visualisasi.

Untuk melihat style yang tersedia:

```python
import matplotlib.pyplot as plt

plt.style.available
```

Hasilnya berupa daftar style yang tersedia pada versi Matplotlib yang digunakan.

Contohnya dapat mencakup:

```text
default
classic
ggplot
bmh
dark_background
...
```

Daftar tersebut dapat berbeda antara versi Matplotlib yang berbeda.

## Menerapkan Style

Untuk menggunakan salah satu style:

```python
plt.style.use("ggplot")
```

Contoh:

```python
import matplotlib.pyplot as plt

plt.style.use("ggplot")

plt.plot(
    [1, 2, 3, 4],
    [10, 20, 15, 30]
)

plt.show()
```

Style akan memengaruhi tampilan grafik yang dibuat setelah style diterapkan.

## Menggunakan Style White Grid

Salah satu style yang sering digunakan untuk visualisasi data adalah style dengan grid.

Misalnya:

```python
plt.style.use("seaborn-v0_8-whitegrid")
```

Jika style tersebut tersedia pada versi Matplotlib kita, grafik akan menggunakan konfigurasi visual yang sesuai dengan style tersebut.

Perlu diperhatikan bahwa nama style dapat berbeda tergantung versi Matplotlib.

Karena itu, cara yang aman adalah memeriksa:

```python
plt.style.available
```

terlebih dahulu.

## Apa Itu Color Map?

Selain style, kita dapat mengatur bagaimana nilai data direpresentasikan menggunakan warna.

Konsep tersebut disebut **Color Map** atau sering disingkat:

```text
cmap
```

Color map adalah pemetaan nilai menjadi warna berdasarkan suatu skema warna.

Contohnya:

```text
Nilai kecil
    ↓
  Warna A
    ↓
Nilai sedang
    ↓
  Warna B
    ↓
Nilai besar
    ↓
  Warna C
```

Color map sangat berguna ketika warna digunakan untuk menyampaikan informasi tambahan dari data.

## Parameter `cmap`

Parameter `cmap` dapat digunakan pada berbagai jenis visualisasi yang mendukung pemetaan warna.

Contohnya pada scatter plot:

```python
scatter = ax.scatter(
    x=over_50["age"],
    y=over_50["chol"],
    c=over_50["target"],
    cmap="winter"
)
```

Pada kode tersebut terdapat dua parameter penting:

```python
c=over_50["target"]
```

dan:

```python
cmap="winter"
```

Keduanya bekerja bersama.

:::tip
**Baca Matplotlib Colormaps:** https://matplotlib.org/stable/users/explain/colors/colormaps.html
:::

## Memahami Parameter `c`

Parameter:

```python
c=
```

digunakan untuk menentukan nilai yang akan digunakan dalam pewarnaan titik.

Contoh:

```python
c=over_50["target"]
```

berarti warna titik ditentukan berdasarkan nilai pada kolom:

```text
target
```

Misalnya target memiliki nilai:

```text
0
1
0
1
1
0
```

maka Matplotlib menggunakan nilai tersebut untuk menentukan warna setiap titik.

## Memahami Parameter `cmap`

Parameter:

```python
cmap="winter"
```

menentukan **skema warna** yang digunakan untuk memetakan nilai dari `c`.

Jadi:

```python
c=over_50["target"]
```

menentukan:

> Data apa yang digunakan untuk menentukan warna?

Sedangkan:

```python
cmap="winter"
```

menentukan:

> Skema warna apa yang digunakan?

Secara konsep:

```text
target
  ↓
nilai
  ↓
c
  ↓
cmap
  ↓
warna
```

## Contoh Menggunakan Beberapa Color Map

Matplotlib menyediakan berbagai colormap.

Contohnya:

```python
cmap="winter"
```

atau:

```python
cmap="summer"
```

atau:

```python
cmap="plasma"
```

Contoh:

```python
scatter = ax.scatter(
    x=over_50["age"],
    y=over_50["chol"],
    c=over_50["target"],
    cmap="plasma"
)
```

Kita dapat mengganti nama colormap sesuai kebutuhan.

Untuk melihat colormap yang tersedia pada versi Matplotlib kita, dapat menggunakan:

```python
plt.colormaps()
```

Kemudian kita dapat memilih colormap yang sesuai.

## Colormap untuk Data Kategorikal dan Kontinu

Pemilihan colormap sebaiknya disesuaikan dengan jenis data.

### Data Kategorikal

Jika warna digunakan untuk membedakan kategori seperti:

```text
0 = Tidak
1 = Ya
```

kita sebenarnya sedang menggunakan warna untuk membedakan kategori.

Untuk data kategorikal, colormap diskrit atau warna yang berbeda antar kategori sering lebih mudah dipahami daripada gradasi yang seolah-olah menunjukkan urutan kontinu.

### Data Kontinu

Jika nilai merupakan data numerik kontinu, misalnya:

```text
Temperature
10
15
20
25
30
```

colormap bergradasi dapat lebih sesuai.

Contohnya:

```python
scatter = ax.scatter(
    x=x,
    y=y,
    c=temperature,
    cmap="viridis"
)
```

Warna dapat merepresentasikan perubahan nilai temperatur.

Jadi, `cmap` bukan sekadar dekorasi. Warna dapat menjadi bagian dari encoding informasi pada visualisasi.

## Memahami `c` dan `cmap`

Perhatikan contoh berikut:

```python
scatter = ax.scatter(
    x=over_50["age"],
    y=over_50["chol"],
    c=over_50["target"],
    cmap="winter"
)
```

Kita dapat membacanya sebagai:

```text
x
↓
Age

y
↓
Cholesterol

c
↓
Target

cmap
↓
Skema warna
```

Sehingga satu titik pada grafik memiliki beberapa informasi:

```text
Posisi X → Age
Posisi Y → Cholesterol
Warna    → Target
```

Ini merupakan salah satu kekuatan visualisasi data: satu grafik dapat menyampaikan beberapa dimensi informasi.

## Mengatur Batas Sumbu

Selain warna, kita juga dapat mengatur area yang ditampilkan oleh grafik.

Matplotlib menyediakan:

```python
ax.set_xlim()
```

untuk sumbu X dan:

```python
ax.set_ylim()
```

untuk sumbu Y.

## `set_xlim()`

Fungsi:

```python
ax.set_xlim()
```

digunakan untuk menentukan batas tampilan sumbu X.

Contoh:

```python
ax.set_xlim([50, 80])
```

Artinya area sumbu X yang ditampilkan dibatasi dari:

```text
50 sampai 80
```

Secara visual:

```text
50                              80
│-------------------------------│
              X
```

Data yang berada di luar rentang tersebut tidak ditampilkan pada area plot.

## `set_ylim()`

Fungsi:

```python
ax.set_ylim()
```

digunakan untuk menentukan batas tampilan sumbu Y.

Contoh:

```python
ax.set_ylim([60, 200])
```

Artinya area sumbu Y ditampilkan dari:

```text
60 sampai 200
```

Secara konsep:

```text
200 ───────────────
    │
    │
    │
60  ───────────────
```

## Mengapa Axis Limits Berguna?

Axis limits dapat membantu kita memfokuskan visualisasi.

Misalnya data usia memiliki rentang:

```text
20 - 80
```

tetapi kita hanya ingin menganalisis kelompok:

```text
Age > 50
```

Kita dapat mengatur:

```python
ax.set_xlim([50, 80])
```

Dengan demikian grafik lebih fokus pada area yang ingin dianalisis.

Namun, kita harus berhati-hati.

Memotong sumbu dapat membuat konteks data menjadi kurang lengkap jika pembaca tidak mengetahui bahwa rentang telah dibatasi.

Karena itu, axis limits harus digunakan untuk tujuan analisis atau keterbacaan, bukan untuk membuat pola tertentu terlihat lebih dramatis.

## Contoh `set_xlim()`

Misalnya:

```python
ax.set_xlim([50, 80])
```

maka sumbu X hanya menampilkan rentang:

```text
50 → 80
```

Sedangkan:

```python
ax.set_xlim([20, 100])
```

akan memberikan rentang yang lebih luas.

Jadi pilihan batas sumbu harus disesuaikan dengan konteks data.

## Contoh `set_ylim()`

Misalnya:

```python
ax.set_ylim([60, 200])
```

maka sumbu Y hanya menampilkan nilai:

```text
60 → 200
```

Jika menggunakan:

```python
ax.set_ylim([0, 250])
```

rentang yang ditampilkan menjadi lebih luas.

## Menggabungkan `cmap`, `xlim`, dan `ylim`

Sekarang kita dapat menggabungkan seluruh konsep tersebut.

```python
scatter = ax.scatter(
    x=over_50["age"],
    y=over_50["chol"],
    c=over_50["target"],
    cmap="winter"
)

ax.set_xlim([50, 80])
ax.set_ylim([100, 400])
```

Di sini kita:

1. Membuat scatter plot.
2. Menggunakan `target` untuk menentukan warna.
3. Menggunakan colormap `winter`.
4. Membatasi sumbu X.
5. Membatasi sumbu Y.

## Studi Kasus Heart Disease

Sekarang kita akan menerapkan seluruh konsep pada dataset Heart Disease.

Kita menggunakan data pasien dengan usia lebih dari 50 tahun:

```python
over_50 = heart_disease[
    heart_disease["age"] > 50
]
```

Kita kemudian membuat dua visualisasi:

```text
Age → Cholesterol

Age → Maximum Heart Rate
```

Keduanya menggunakan:

```text
Age
```

sebagai sumbu X.

## Membuat Dua Subplot

Kita menggunakan:

```python
fig, (ax0, ax1) = plt.subplots(
    nrows=2,
    ncols=1,
    figsize=(10, 10),
    sharex=True
)
```

Strukturnya:

```text
Figure
│
├── ax0
│   └── Age vs Cholesterol
│
└── ax1
    └── Age vs Max Heart Rate
```

Parameter:

```python
sharex=True
```

membuat kedua subplot berbagi sumbu X.

## Subplot Pertama

Grafik pertama membandingkan usia dengan kadar kolesterol.

```python
scatter0 = ax0.scatter(
    x=over_50["age"],
    y=over_50["chol"],
    c=over_50["target"],
    cmap="winter"
)
```

Kemudian kita memberikan label:

```python
ax0.set(
    title="Heart Disease and Cholesterol Levels",
    ylabel="Cholesterol"
)
```

Kita juga menambahkan legenda:

```python
ax0.legend(
    *scatter0.legend_elements(),
    title="Target"
)
```

Dan garis rata-rata:

```python
ax0.axhline(
    over_50["chol"].mean(),
    linestyle="--"
)
```

Kemudian kita menentukan batas sumbu X:

```python
ax0.set_xlim([50, 80])
```

## Subplot Kedua

Grafik kedua membandingkan usia dengan maximum heart rate.

```python
scatter1 = ax1.scatter(
    x=over_50["age"],
    y=over_50["thalach"],
    c=over_50["target"],
    cmap="winter"
)
```

Kemudian kita memberikan label:

```python
ax1.set(
    title="Heart Disease and Max Heart Rate",
    xlabel="Age",
    ylabel="Max Heart Rate"
)
```

Legenda:

```python
ax1.legend(
    *scatter1.legend_elements(),
    title="Target"
)
```

Garis rata-rata:

```python
ax1.axhline(
    over_50["thalach"].mean(),
    linestyle="--"
)
```

Dan batas sumbu:

```python
ax1.set_xlim([50, 80])
ax1.set_ylim([60, 200])
```

## Kode Lengkap

Berikut kode lengkap visualisasi:

```python
import matplotlib.pyplot as plt

# Menggunakan style
plt.style.use("seaborn-v0_8-whitegrid")

# Membuat dua subplot
fig, (ax0, ax1) = plt.subplots(
    nrows=2,
    ncols=1,
    figsize=(10, 10),
    sharex=True
)

# ----------------------------------------------------
# Subplot 1: Age vs Cholesterol
# ----------------------------------------------------

scatter0 = ax0.scatter(
    x=over_50["age"],
    y=over_50["chol"],
    c=over_50["target"],
    cmap="winter"
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

ax0.set_xlim([50, 80])

# ----------------------------------------------------
# Subplot 2: Age vs Maximum Heart Rate
# ----------------------------------------------------

scatter1 = ax1.scatter(
    x=over_50["age"],
    y=over_50["thalach"],
    c=over_50["target"],
    cmap="winter"
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

ax1.set_xlim([50, 80])
ax1.set_ylim([60, 200])

# ----------------------------------------------------
# Judul utama Figure
# ----------------------------------------------------

fig.suptitle(
    "Heart Disease Analysis",
    fontsize=16,
    fontweight="bold"
)

# Mengatur layout
fig.tight_layout(
    rect=[0, 0, 1, 0.96]
)

plt.show()
```

![matplotlib](/img/python/46.png)

## Memahami Kode dari Atas ke Bawah

Kode tersebut dapat dipahami melalui alur berikut:

```text
1. Import Matplotlib
        ↓
2. Pilih style
        ↓
3. Buat Figure dan Axes
        ↓
4. Buat scatter plot ax0
        ↓
5. Atur label ax0
        ↓
6. Tambahkan legend ax0
        ↓
7. Tambahkan mean line ax0
        ↓
8. Atur axis limits ax0
        ↓
9. Buat scatter plot ax1
        ↓
10. Atur label ax1
        ↓
11. Tambahkan legend ax1
        ↓
12. Tambahkan mean line ax1
        ↓
13. Atur axis limits ax1
        ↓
14. Tambahkan super title
        ↓
15. Atur layout
        ↓
16. Tampilkan grafik
```

## Style, Colormap, dan Axis Limits Memiliki Fungsi Berbeda

Ketiga konsep tersebut jangan dianggap sebagai hal yang sama.

| Fitur | Fungsi |
|---|---|
| `plt.style.use()` | Mengatur tampilan umum |
| `cmap` | Memetakan nilai data ke warna |
| `set_xlim()` | Mengatur rentang tampilan X |
| `set_ylim()` | Mengatur rentang tampilan Y |

Secara sederhana:

```text
Style
↓
Bagaimana grafik terlihat?

cmap
↓
Bagaimana nilai direpresentasikan dengan warna?

xlim / ylim
↓
Bagian data mana yang terlihat?
```

## Hati-Hati dengan Axis Limits

Axis limits dapat membantu memperjelas grafik, tetapi penggunaannya harus transparan.

Misalnya sebuah dataset memiliki nilai:

```text
0 - 100
```

tetapi kita membuat:

```python
ax.set_ylim([40, 60])
```

Maka pembaca hanya melihat sebagian kecil data.

Hal ini dapat membuat variasi terlihat lebih besar secara visual dibandingkan ketika seluruh rentang data ditampilkan.

Karena itu, selalu pertimbangkan konteks ketika menentukan:

```python
set_xlim()
set_ylim()
```

## Memilih Colormap

Beberapa colormap dapat digunakan untuk kebutuhan berbeda.

Contohnya:

```text
viridis
plasma
inferno
magma
cividis
winter
summer
```

Pemilihan colormap sebaiknya mempertimbangkan:

- jenis data,
- keterbacaan,
- kontras,
- kebutuhan interpretasi,
- dan aksesibilitas warna.

Untuk data numerik kontinu, colormap seperti `viridis` sering menjadi pilihan yang baik karena memiliki perubahan warna yang relatif mudah dibedakan.

Untuk kategori, sering kali lebih tepat menggunakan warna diskrit yang jelas antar kategori daripada mengandalkan gradasi kontinu.

## Kesalahan yang Sering Terjadi

### Menggunakan `cmap` Tanpa `c`

Contoh:

```python
ax.scatter(
    x=x,
    y=y,
    cmap="winter"
)
```

Pada penggunaan scatter untuk pemetaan warna berdasarkan data, `cmap` perlu dipasangkan dengan nilai yang dipetakan melalui `c` atau mekanisme warna lain yang sesuai.

Contoh yang benar:

```python
ax.scatter(
    x=x,
    y=y,
    c=target,
    cmap="winter"
)
```

### Mengira `cmap` Menentukan Warna Secara Langsung

`cmap` bukan berarti:

```text
Semua titik menjadi satu warna tertentu
```

Sebaliknya, colormap digunakan untuk memetakan nilai ke warna.

Misalnya:

```python
c=temperature
cmap="viridis"
```

berarti nilai `temperature` dipetakan menggunakan colormap `viridis`.

### Mengatur Axis Limits Secara Sembarangan

Jangan memilih:

```python
ax.set_xlim(...)
ax.set_ylim(...)
```

hanya supaya grafik terlihat lebih bagus.

Pastikan rentang yang dipilih memiliki alasan analitis atau visual yang jelas.

### Menggunakan Terlalu Banyak Warna

Warna sebaiknya memiliki fungsi.

Jika setiap elemen diberikan warna berbeda tanpa alasan, grafik dapat menjadi sulit dipahami.

## Ringkasan

Pada materi ini kita telah mempelajari tiga bagian penting dalam kustomisasi Matplotlib.

### Style

Style mengatur tampilan umum grafik.

```python
plt.style.use("ggplot")
```

### Color Map

`cmap` menentukan skema warna yang digunakan untuk memetakan nilai.

```python
ax.scatter(
    x=x,
    y=y,
    c=target,
    cmap="winter"
)
```

### Axis Limits

`set_xlim()` mengatur rentang sumbu X:

```python
ax.set_xlim([50, 80])
```

Sedangkan `set_ylim()` mengatur rentang sumbu Y:

```python
ax.set_ylim([60, 200])
```

## Kesimpulan

Kustomisasi Matplotlib bukan hanya tentang membuat grafik terlihat lebih menarik.

Kustomisasi yang baik harus membantu pembaca memahami data.

Tiga konsep yang dipelajari dapat dirangkum sebagai:

```text
plt.style.use()
       ↓
Mengatur tampilan umum

cmap
       ↓
Menggunakan warna untuk menyampaikan informasi

set_xlim()
set_ylim()
       ↓
Mengatur area data yang ditampilkan
```

Dengan menggabungkan ketiganya, kita dapat membuat visualisasi yang lebih terstruktur dan komunikatif.
