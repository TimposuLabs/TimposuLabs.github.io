---
sidebar_position: 16
title: "Menyimpan & Mengekspor Grafik"
---

Setelah membuat dan mengkustomisasi visualisasi, langkah berikutnya adalah **menyimpan atau mengekspor grafik** agar dapat digunakan di luar notebook.

Grafik yang dibuat menggunakan Matplotlib dapat:

- Ditampilkan di Jupyter Notebook.
- Disimpan sebagai file gambar.
- Digunakan dalam laporan.
- Dimasukkan ke presentasi.
- Dibagikan kepada orang lain.
- Digunakan dalam dokumentasi.
- Diekspor secara otomatis melalui program Python.

Pada materi ini kita akan mempelajari cara menyimpan grafik secara manual dan menggunakan kode Python.

## Tujuan Pembelajaran

Setelah mempelajari materi ini, kita diharapkan dapat:

- Memahami mengapa grafik perlu diekspor.
- Menyimpan grafik secara manual dari Jupyter Notebook.
- Menyimpan grafik menggunakan `fig.savefig()`.
- Memahami hubungan antara `Figure` dan `savefig()`.
- Menentukan nama file dan format output.
- Mengatur resolusi menggunakan `dpi`.
- Mengatur area kosong menggunakan `bbox_inches`.
- Menyimpan grafik ke folder tertentu.
- Membuat proses ekspor grafik yang dapat diotomatisasi.

## Mengapa Grafik Perlu Disimpan?

Ketika bekerja dengan Jupyter Notebook, grafik dapat langsung ditampilkan menggunakan:

```python
plt.show()
```

Namun grafik tersebut belum tentu tersedia sebagai file yang dapat digunakan di luar notebook.

Misalnya kita ingin memasukkan grafik ke:

- Microsoft Word.
- PowerPoint.
- laporan penelitian.
- website.
- dokumentasi Docusaurus.
- media sosial.
- jurnal ilmiah.

Maka kita membutuhkan file hasil visualisasi.

Alur sederhananya:

```text
Data
 ↓
Analisis
 ↓
Visualisasi
 ↓
Kustomisasi
 ↓
Export
 ↓
File Grafik
```

## Cara Manual dari Jupyter Notebook

Salah satu cara paling sederhana adalah menyimpan grafik melalui antarmuka Jupyter Notebook.

Setelah grafik ditampilkan, pada beberapa lingkungan notebook kita dapat:

1. Klik kanan pada gambar.
2. Pilih opsi seperti **Save Image As...**
3. Pilih lokasi penyimpanan.
4. Berikan nama file.
5. Simpan gambar.

Cara ini mudah digunakan untuk kebutuhan sederhana.

Namun terdapat keterbatasan.

Jika kita memiliki:

```text
10 grafik
50 grafik
100 grafik
```

menyimpan satu per satu secara manual tentu tidak efisien.

Untuk pekerjaan Data Science, cara programatis biasanya lebih fleksibel.

## Menyimpan Grafik dengan `fig.savefig()`

Matplotlib menyediakan method:

```python
fig.savefig()
```

Method tersebut digunakan untuk menyimpan sebuah `Figure` ke file.

Contoh:

```python
fig.savefig("heart-disease-analysis.png")
```

Di sini:

```text
fig
 ↓
Figure
 ↓
savefig()
 ↓
heart-disease-analysis.png
```

## Mengapa Menggunakan `fig.savefig()`?

Pada pendekatan Object-Oriented Matplotlib, kita biasanya memiliki:

```python
fig, ax = plt.subplots()
```

`fig` merupakan objek `Figure`.

Karena `Figure` merupakan wadah utama visualisasi, kita dapat menyimpan keseluruhan visualisasi menggunakan:

```python
fig.savefig(...)
```

Contoh:

```python
fig, ax = plt.subplots()

ax.plot(
    [1, 2, 3, 4],
    [10, 20, 15, 30]
)

fig.savefig("sales-plot.png")

plt.show()
```

Grafik akan ditampilkan sekaligus disimpan sebagai file.

## Sintaks Dasar

Bentuk paling sederhana:

```python
fig.savefig("nama-file.png")
```

Contoh:

```python
fig.savefig("heart-disease-analysis.png")
```

File akan disimpan menggunakan nama:

```text
heart-disease-analysis.png
```

Lokasi penyimpanan relatif terhadap **current working directory** Python/Jupyter.

## Menentukan Folder Penyimpanan

Kita juga dapat menentukan lokasi folder.

Misalnya:

```python
fig.savefig("images/heart-disease-analysis.png")
```

Artinya file akan disimpan ke:

```text
images/
└── heart-disease-analysis.png
```

Folder tersebut harus sudah tersedia.

Jika folder belum ada, kita dapat membuatnya menggunakan Python.

Contoh:

```python
from pathlib import Path

output_dir = Path("images")
output_dir.mkdir(parents=True, exist_ok=True)
```

Kemudian:

```python
fig.savefig(
    output_dir / "heart-disease-analysis.png"
)
```

Pendekatan `Path` lebih fleksibel untuk pengelolaan path dibandingkan menulis path sebagai string panjang secara manual.

## Format File Grafik

Format file biasanya dapat ditentukan melalui ekstensi nama file.

Contoh:

```python
fig.savefig("plot.png")
```

PNG digunakan untuk gambar raster.

Kita juga dapat menggunakan format lain yang didukung oleh Matplotlib, tergantung backend dan lingkungan.

Contohnya:

```text
.png
.jpg
.jpeg
.svg
.pdf
```

Secara umum:

| Format | Jenis | Contoh penggunaan |
|---|---|---|
| PNG | Raster | Website, dokumentasi, presentasi |
| JPEG | Raster | Foto/gambar dengan banyak warna |
| SVG | Vector | Website dan grafik yang membutuhkan scaling |
| PDF | Vector/document | Laporan dan publikasi |

Format yang dipilih sebaiknya disesuaikan dengan kebutuhan akhir.

## Raster vs Vector

Salah satu konsep penting dalam ekspor grafik adalah perbedaan antara **raster** dan **vector**.

### Raster

Gambar raster tersusun dari pixel.

Contohnya:

```text
PNG
JPEG
```

Jika gambar raster diperbesar terlalu jauh, kualitas dapat menurun karena pixel menjadi terlihat.

### Vector

Grafik vector direpresentasikan menggunakan bentuk geometris dan informasi matematis.

Contohnya:

```text
SVG
PDF
```

Grafik vector dapat diperbesar tanpa mengalami pixelation seperti gambar raster pada umumnya.

Untuk grafik Data Science yang terdiri dari garis, titik, teks, dan bentuk geometris, format vector dapat berguna ketika output membutuhkan scaling atau publikasi tertentu.

## Mengatur Resolusi dengan `dpi`

Untuk format raster, kita dapat mengatur resolusi menggunakan:

```python
dpi
```

Contoh:

```python
fig.savefig(
    "heart-disease-analysis.png",
    dpi=300
)
```

`dpi` merupakan singkatan dari:

```text
dots per inch
```

Secara sederhana, semakin besar nilai DPI, semakin tinggi kepadatan pixel pada output raster.

Contoh:

```python
dpi=100
```

dan:

```python
dpi=300
```

dapat menghasilkan file dengan karakteristik resolusi berbeda.

Namun, DPI bukan satu-satunya faktor yang menentukan ukuran file atau kualitas visual. Ukuran Figure, format file, dan kompleksitas grafik juga berpengaruh.

## Kapan Menggunakan DPI Tinggi?

DPI yang lebih tinggi dapat berguna ketika grafik akan:

- dimasukkan ke laporan,
- dicetak,
- digunakan pada materi presentasi,
- atau membutuhkan detail raster yang lebih tinggi.

Namun semakin tinggi DPI, ukuran file raster dapat meningkat.

Jadi tidak selalu berarti:

```text
DPI semakin besar = selalu semakin baik
```

Gunakan resolusi sesuai kebutuhan output.

## Mengatur Area Kosong dengan `bbox_inches`

Terkadang terdapat area kosong di sekitar grafik.

Kita dapat menggunakan:

```python
bbox_inches="tight"
```

Contoh:

```python
fig.savefig(
    "heart-disease-analysis.png",
    bbox_inches="tight"
)
```

Pengaturan ini meminta Matplotlib menyesuaikan bounding box output agar elemen grafik yang relevan tidak dikelilingi area kosong yang berlebihan.

## Menggabungkan `dpi` dan `bbox_inches`

Kita dapat menggunakan keduanya:

```python
fig.savefig(
    "heart-disease-analysis.png",
    dpi=300,
    bbox_inches="tight"
)
```

Ini merupakan pola yang cukup umum ketika menyimpan grafik raster untuk digunakan di luar notebook.

## Menyimpan Grafik Setelah `tight_layout()`

Jika grafik memiliki banyak elemen, kita dapat mengatur layout terlebih dahulu.

Contoh:

```python
fig.tight_layout()

fig.savefig(
    "heart-disease-analysis.png",
    dpi=300,
    bbox_inches="tight"
)
```

Urutannya:

```text
Create Figure
     ↓
Create Plot
     ↓
Customize
     ↓
tight_layout()
     ↓
savefig()
     ↓
   show()
```

Dengan demikian layout sudah disesuaikan sebelum Figure disimpan.

## Contoh dengan `suptitle()`

Pada materi sebelumnya kita telah menggunakan:

```python
fig.suptitle(
    "Heart Disease Analysis"
)
```

Jika Figure memiliki super title, kita dapat mengatur layout sebelum menyimpan.

Contoh:

```python
fig.suptitle(
    "Heart Disease Analysis",
    fontsize=16,
    fontweight="bold"
)

fig.tight_layout(
    rect=[0, 0, 1, 0.96]
)

fig.savefig(
    "heart-disease-analysis.png",
    dpi=300,
    bbox_inches="tight"
)
```

Perhatikan bahwa `rect` memberikan ruang di bagian atas untuk `suptitle`.

## Contoh Lengkap

Sekarang kita gabungkan konsep yang telah dipelajari.

```python
import matplotlib.pyplot as plt

# Membuat Figure dan Axes
fig, ax = plt.subplots(
    figsize=(10, 6)
)

# Membuat grafik
ax.plot(
    [1, 2, 3, 4, 5],
    [10, 20, 15, 30, 25]
)

# Kustomisasi
ax.set(
    title="Sales Trend",
    xlabel="Month",
    ylabel="Sales"
)

# Mengatur layout
fig.tight_layout()

# Menyimpan grafik
fig.savefig(
    "sales-trend.png",
    dpi=300,
    bbox_inches="tight"
)

# Menampilkan grafik
plt.show()
```

Pada contoh tersebut kita melakukan:

```text
1. Membuat Figure
2. Membuat Axes
3. Membuat plot
4. Memberikan judul
5. Memberikan label
6. Mengatur layout
7. Menyimpan Figure
8. Menampilkan Figure
```

## Menyimpan Dua Subplot

Konsep `savefig()` juga dapat digunakan untuk Figure yang memiliki banyak subplot.

Contoh:

```python
import matplotlib.pyplot as plt

fig, (ax0, ax1) = plt.subplots(
    nrows=2,
    ncols=1,
    figsize=(10, 10),
    sharex=True
)

ax0.plot(
    [1, 2, 3, 4],
    [10, 20, 15, 30]
)

ax0.set(
    title="Sales"
)

ax1.plot(
    [1, 2, 3, 4],
    [5, 15, 10, 25]
)

ax1.set(
    title="Profit",
    xlabel="Month"
)

fig.tight_layout()

fig.savefig(
    "sales-and-profit.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()
```

Perhatikan bahwa kita menyimpan:

```python
fig
```

bukan:

```python
ax0
```

atau:

```python
ax1
```

Karena `fig` merupakan Figure yang menampung kedua subplot.

## `Figure` vs `Axes` Ketika Menyimpan

Konsep ini penting untuk diingat.

Misalnya:

```python
fig, ax = plt.subplots()
```

Strukturnya:

```text
Figure
│
└── Axes
    └── Plot
```

Jika kita ingin menyimpan keseluruhan Figure:

```python
fig.savefig(...)
```

Jika Figure memiliki beberapa Axes:

```text
Figure
│
├── ax0
├── ax1
├── ax2
└── ax3
```

maka:

```python
fig.savefig(...)
```

akan menyimpan keseluruhan Figure beserta subplot yang ada di dalamnya.

## Menyimpan ke Beberapa Format

Jika kita membutuhkan beberapa format output, kita dapat menyimpan Figure beberapa kali.

Contoh:

```python
fig.savefig(
    "heart-disease-analysis.png",
    dpi=300,
    bbox_inches="tight"
)

fig.savefig(
    "heart-disease-analysis.svg",
    bbox_inches="tight"
)
```

Sekarang kita memiliki:

```text
heart-disease-analysis.png
heart-disease-analysis.svg
```

Format PNG dapat digunakan untuk kebutuhan raster.

SVG dapat digunakan ketika kita membutuhkan grafik vector yang dapat diskalakan.

## Membuat Fungsi untuk Export Grafik

Salah satu keuntungan menyimpan grafik menggunakan kode adalah **otomatisasi**.

Kita dapat membuat fungsi:

```python
def save_plot(fig, filename):
    fig.savefig(
        filename,
        dpi=300,
        bbox_inches="tight"
    )
```

Kemudian:

```python
save_plot(
    fig,
    "heart-disease-analysis.png"
)
```

Fungsi tersebut dapat digunakan kembali untuk berbagai Figure.

## Membuat Folder Output Secara Otomatis

Untuk proyek Data Science, kita dapat membuat folder khusus untuk hasil visualisasi.

Contoh:

```python
from pathlib import Path

output_dir = Path("outputs")
output_dir.mkdir(
    parents=True,
    exist_ok=True
)
```

Kemudian:

```python
fig.savefig(
    output_dir / "heart-disease-analysis.png",
    dpi=300,
    bbox_inches="tight"
)
```

Struktur folder:

```text
project/
│
├── notebook.ipynb
├── data/
│
└── outputs/
    └── heart-disease-analysis.png
```

Struktur seperti ini membantu memisahkan:

```text
source code
data
output
```

## Penamaan File yang Baik

Gunakan nama file yang menjelaskan isi grafik.

Kurang informatif:

```text
plot1.png
graph.png
gambar.png
hasil.png
```

Lebih informatif:

```text
heart-disease-cholesterol.png
heart-disease-heart-rate.png
monthly-sales-trend.png
age-vs-cholesterol.png
```

Nama file yang jelas akan mempermudah pengelolaan banyak hasil analisis.

## Hindari Menimpa File Secara Tidak Sengaja

Jika kita menjalankan:

```python
fig.savefig("plot.png")
```

berulang kali, file dengan nama yang sama dapat ditimpa.

Dalam eksperimen yang membutuhkan banyak versi, gunakan nama yang lebih spesifik.

Contoh:

```text
heart-disease-v1.png
heart-disease-v2.png
heart-disease-final.png
```

Untuk proyek yang lebih besar, penamaan berbasis tanggal, eksperimen, atau konfigurasi dapat membantu.

## Menentukan Format Secara Eksplisit

Format biasanya dapat dikenali dari ekstensi:

```python
fig.savefig("plot.png")
```

Namun kita juga dapat menentukan format secara eksplisit menggunakan parameter:

```python
format="png"
```

Contoh:

```python
fig.savefig(
    "heart-disease-analysis",
    format="png"
)
```

Pendekatan ini berguna ketika kita ingin memisahkan nama file dari format output.

## Workflow Visualisasi yang Lengkap

Sampai materi ini, workflow Matplotlib yang kita pelajari dapat dirangkum menjadi:

```text
1. Prepare Data
       ↓
2. Create Figure & Axes
       ↓
3. Create Plot
       ↓
4. Customize
       ↓
5. Set Style
       ↓
6. Set Labels
       ↓
7. Add Legend
       ↓
8. Set Axis Limits
       ↓
9. Adjust Layout
       ↓
10. Save Figure
       ↓
11. Display Figure
```

Dalam kode:

```python
fig, ax = plt.subplots()

ax.plot(...)

ax.set(...)

fig.tight_layout()

fig.savefig(
    "output.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()
```

Pola ini dapat digunakan kembali pada berbagai proyek.

## Kesalahan yang Sering Terjadi

### Folder Belum Ada

Kode:

```python
fig.savefig(
    "outputs/plot.png"
)
```

dapat gagal jika folder `outputs` belum tersedia.

Solusinya:

```python
from pathlib import Path

output_dir = Path("outputs")
output_dir.mkdir(
    parents=True,
    exist_ok=True
)
```

### Menyimpan Sebelum Layout Diatur

Jika Figure memiliki banyak elemen, pertimbangkan untuk mengatur layout sebelum menyimpan:

```python
fig.tight_layout()

fig.savefig(...)
```

### Menggunakan DPI Sangat Tinggi Tanpa Alasan

Misalnya:

```python
dpi=1200
```

tidak selalu diperlukan.

Ukuran file dapat menjadi jauh lebih besar tanpa memberikan manfaat yang berarti untuk kebutuhan tertentu.

Gunakan DPI berdasarkan tujuan output.

### Mengira `dpi` Berlaku Sama untuk Semua Format

DPI terutama relevan terhadap output raster seperti PNG atau JPEG.

Format vector seperti SVG dan PDF tidak bekerja dengan konsep resolusi pixel yang sama seperti raster.

## Praktik yang Disarankan

Untuk workflow Data Science, biasakan:

### 1. Simpan Figure melalui Kode

Gunakan:

```python
fig.savefig(...)
```

daripada selalu menyimpan secara manual.

### 2. Gunakan Folder Output

Pisahkan hasil visualisasi:

```text
outputs/
```

atau:

```text
images/
```

dari source code dan dataset.

### 3. Gunakan Nama File Deskriptif

Contoh:

```text
age-vs-cholesterol.png
```

lebih mudah dipahami daripada:

```text
plot1.png
```

### 4. Atur Layout Sebelum Export

Gunakan:

```python
fig.tight_layout()
```

jika diperlukan.

### 5. Pilih Format Berdasarkan Tujuan

Gunakan raster atau vector sesuai kebutuhan.

### 6. Hindari Pengaturan Berlebihan

DPI, ukuran Figure, dan elemen visual harus disesuaikan dengan kebutuhan akhir.

## Ringkasan

Pada materi ini kita telah mempelajari cara menyimpan dan mengekspor grafik menggunakan Matplotlib.

Konsep penting:

| Konsep | Fungsi |
|---|---|
| `fig.savefig()` | Menyimpan Figure |
| `dpi` | Mengatur kepadatan pixel untuk output raster |
| `bbox_inches="tight"` | Membantu menyesuaikan area output |
| `fig.tight_layout()` | Membantu mengatur layout Figure |
| `.png` | Format raster |
| `.svg` | Format vector |
| `.pdf` | Format vector/document |
| `Path` | Membantu mengelola lokasi file |

Pola yang penting untuk diingat:

```python
fig, ax = plt.subplots()

ax.plot(...)

ax.set(...)

fig.tight_layout()

fig.savefig(
    "output.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()
```

## Practice

Untuk latihan, buat sebuah DataFrame menggunakan NumPy dan Pandas.

Kemudian:

1. Buat sebuah Figure.
2. Buat scatter plot.
3. Tambahkan judul.
4. Tambahkan label X dan Y.
5. Gunakan salah satu style Matplotlib.
6. Gunakan `cmap`.
7. Atur `xlim` dan `ylim`.
8. Gunakan `tight_layout()`.
9. Simpan grafik menggunakan `fig.savefig()`.
10. Simpan dalam format PNG.
11. Coba simpan kembali dalam format SVG.
12. Bandingkan kedua file tersebut.

Contoh:

```python
fig.savefig(
    "practice-plot.png",
    dpi=300,
    bbox_inches="tight"
)

fig.savefig(
    "practice-plot.svg",
    bbox_inches="tight"
)
```

## Tantangan

Coba buat sebuah visualisasi dengan dua subplot:

```text
          Data Analysis
               │
       ┌───────┴───────┐
       │               │
       ▼               ▼
   Scatter Plot     Line Plot
```

Kemudian:

- gunakan `sharex=True` jika sesuai,
- berikan judul pada setiap subplot,
- berikan satu `suptitle`,
- tambahkan legend jika diperlukan,
- tambahkan grid jika membantu,
- gunakan axis limits yang masuk akal,
- dan simpan Figure menggunakan `savefig()`.

Gunakan struktur:

```python
fig, (ax0, ax1) = plt.subplots(
    nrows=2,
    ncols=1,
    figsize=(10, 10)
)

# Plot pada ax0

# Plot pada ax1

fig.suptitle("Data Analysis")

fig.tight_layout(
    rect=[0, 0, 1, 0.96]
)

fig.savefig(
    "data-analysis.png",
    dpi=300,
    bbox_inches="tight"
)

plt.show()
```

## Kesimpulan

Menyimpan grafik merupakan bagian penting dari workflow visualisasi.

Ketika bekerja secara manual, grafik dapat disimpan melalui antarmuka notebook. Namun ketika bekerja dengan banyak grafik atau membuat workflow yang dapat diulang, penggunaan kode:

```python
fig.savefig(...)
```

memberikan keuntungan besar karena proses ekspor dapat diotomatisasi.

Dengan demikian kita tidak hanya dapat membuat visualisasi, tetapi juga menghasilkan **artifact yang siap digunakan dalam laporan, presentasi, dokumentasi, maupun aplikasi Data Science**.
