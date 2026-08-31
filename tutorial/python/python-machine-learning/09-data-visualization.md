---
sidebar_position: 9
title: "Data Visualization"
---

## Data Visualization dengan Seaborn & Bokeh

Setelah melakukan proses **data cleaning** dan analisis, data biasanya masih berbentuk angka atau tabel yang cukup sulit dipahami secara cepat.

Sebagai contoh, kita mungkin sudah mengetahui:

```text
Name
Wage
Value
Difference
```

Namun, melihat ratusan atau ribuan baris data tidak selalu mudah untuk memahami pola yang terdapat di dalamnya.

Di sinilah **Data Visualization** berperan.

Data Visualization adalah proses menyajikan data dalam bentuk visual seperti:

```text
Chart
Graph
Plot
Diagram
```

Tujuannya adalah membantu manusia memahami data dan menemukan pola dengan lebih cepat.

---

## Mengapa Data Visualization Penting?

Bayangkan kita memiliki dataset pemain sepak bola dengan ribuan baris.

Dalam bentuk tabel:

```text
Name        Wage       Value
--------------------------------
Player A    50000      2500000
Player B    80000      5000000
Player C    30000      3000000
...
```

Sulit untuk melihat hubungan antara `Wage` dan `Value` hanya dengan membaca tabel.

Dengan visualisasi, hubungan tersebut dapat ditampilkan dalam bentuk grafik:

![Visualisasi](/img/python/1.png)

Dengan grafik, pola dan hubungan antarvariabel dapat lebih mudah dipahami.

---

## Data Visualization dalam Data Science

Visualisasi merupakan salah satu bagian penting dalam workflow Data Science dan Machine Learning.

Secara sederhana:

```text
Import Data
     ↓
Data Cleaning
     ↓
Data Analysis
     ↓
Data Visualization
     ↓
Machine Learning
```

Visualisasi dapat membantu kita memahami data sebelum melanjutkan ke tahap pemodelan.

Selain untuk analisis pribadi, visualisasi juga sangat berguna ketika hasil analisis perlu disampaikan kepada:

```text
Atasan
Tim
Klien
Stakeholder
Pengambil Keputusan
```

Orang yang menerima hasil analisis tidak selalu memiliki latar belakang teknis.

Visualisasi dapat membantu mengubah data yang kompleks menjadi informasi yang lebih mudah dipahami.

---

## Seaborn

**Seaborn** adalah library visualisasi data Python yang dibangun di atas **Matplotlib**.

Seaborn menyediakan antarmuka yang relatif sederhana untuk membuat berbagai jenis visualisasi statistik.

Salah satu penggunaannya adalah membuat **scatter plot**.

:::tip
**Ingformasi lengkap kunjungi:** https://seaborn.pydata.org/
:::

---

### Scatter Plot

Scatter plot atau diagram sebar digunakan untuk melihat hubungan antara dua variabel.

Dalam studi kasus pemain sepak bola, kita dapat menggunakan:

```text
X → Wage
Y → Value
```

Dengan demikian, setiap titik pada grafik mewakili satu pemain.

Secara konseptual:

![Visualisasi](/img/python/1.png)

Grafik tersebut membantu kita melihat bagaimana `Wage` berhubungan dengan `Value`.

---

### Membuat Scatter Plot dengan Seaborn

Import Seaborn:

```python
import seaborn as sns
```

Kemudian kita dapat mengatur tampilan default:

```python
sns.set()
```

Selanjutnya membuat scatter plot:

```python
graph = sns.scatterplot(
    x='Wage',
    y='Value',
    data=df1
)
```

Kode tersebut menggunakan:

```text
Wage
 ↓
Sumbu X

Value
 ↓
Sumbu Y
```

Sedangkan:

```python
data=df1
```

menentukan DataFrame yang digunakan sebagai sumber data.

![Visualisasi](/img/python/1.png)

---

### Keunggulan Seaborn

Seaborn memiliki beberapa keunggulan untuk eksplorasi data:

- Sintaks relatif sederhana.
- Terintegrasi dengan Pandas.
- Cocok untuk visualisasi statistik.
- Memudahkan pembuatan grafik dari DataFrame.
- Dibangun di atas Matplotlib.

Dengan beberapa baris kode, kita sudah dapat menghasilkan visualisasi dari dataset.

---

### Keterbatasan Visualisasi Statis

Grafik yang dibuat menggunakan pendekatan seperti Seaborn umumnya bersifat **statis**.

Artinya, ketika pengguna mengarahkan kursor ke sebuah titik, grafik tidak secara otomatis memberikan informasi detail mengenai titik tersebut.

Misalnya kita melihat:

```text
       •
```

Kita mungkin tidak langsung mengetahui:

```text
Name
Wage
Value
```

Informasi tersebut masih perlu dilihat dari dataset.

Untuk kebutuhan visualisasi yang lebih interaktif, kita dapat menggunakan library seperti **Bokeh**.

---

## Bokeh

**Bokeh** adalah library Python yang dapat digunakan untuk membuat **visualisasi data interaktif**.

Berbeda dengan grafik statis, visualisasi Bokeh memungkinkan pengguna berinteraksi dengan grafik.

Beberapa fitur interaktif yang dapat digunakan antara lain:

```text
Zoom
Pan
Hover
```

Dengan fitur **hover**, pengguna dapat mengarahkan kursor ke sebuah titik dan mendapatkan informasi mengenai data tersebut.

:::tip
**Baca Dokumentasi Bokeh:** https://docs.bokeh.org/en/latest/docs/user_guide.html
:::

---

### Membuat Visualisasi dengan Bokeh

Untuk membuat grafik menggunakan Bokeh, kita dapat mengimpor beberapa komponen:

```python
from bokeh.plotting import figure, show
from bokeh.models import HoverTool
```

Komponen tersebut digunakan untuk:

```text
figure
 ↓
Membuat canvas/grafik

HoverTool
 ↓
Menampilkan informasi saat hover

show
 ↓
Menampilkan grafik
```

---

### Membuat Hover Tooltip

Kita dapat menentukan informasi yang ingin ditampilkan ketika pengguna mengarahkan kursor ke sebuah titik.

Contohnya:

```python
hover = HoverTool(
    tooltips=[
        ("Index", "$index"),
        ("Wage", "@Wage"),
        ("Value", "@Value"),
        ("Name", "@Name")
    ]
)
```

Ketika pengguna melakukan hover pada sebuah titik, informasi seperti berikut dapat ditampilkan:

```text
Index: 10
Wage: 50000
Value: 2500000
Name: Player A
```

Hal ini membuat grafik menjadi lebih informatif.

---

### Memahami `$` dan `@` pada Bokeh

Pada konfigurasi tooltip Bokeh terdapat dua simbol penting:

```text
$
@
```

Keduanya memiliki fungsi yang berbeda.

### `$`

Simbol `$` digunakan untuk mengakses informasi atau data khusus yang disediakan oleh Bokeh.

Contohnya:

```text
$index
$x
$y
```

Misalnya:

```python
("$index", "$index")
```

digunakan untuk menampilkan index dari titik data.

---

### `@`

Simbol `@` digunakan untuk mengambil nilai dari **kolom data source**.

Misalnya DataFrame memiliki:

```text
Name
Wage
Value
```

Maka kita dapat menggunakan:

```text
@Name
@Wage
@Value
```

Contohnya:

```python
("Name", "@Name")
```

berarti tooltip akan mengambil nilai dari kolom `Name`.

---

### Membuat Canvas Grafik

Setelah tooltip dibuat, kita dapat membuat objek grafik menggunakan:

```python
p = figure(
    title="Soccer 2019",
    x_axis_label="Wage",
    y_axis_label="Value",
    tools=[hover]
)
```

Beberapa konfigurasi yang digunakan:

```text
title
 ↓
Judul grafik

x_axis_label
 ↓
Label sumbu X

y_axis_label
 ↓
Label sumbu Y

tools
 ↓
Tools interaktif yang tersedia
```

---

### Menambahkan Data ke Grafik

Selanjutnya kita dapat menambahkan titik data menggunakan:

```python
p.circle(
    'Wage',
    'Value',
    size=10,
    source=df1
)
```

Kode tersebut membuat scatter plot menggunakan:

```text
Wage → X
Value → Y
```

dan:

```python
source=df1
```

menentukan DataFrame yang menjadi sumber data.

---

### Menampilkan Grafik

Setelah grafik selesai dibuat, gunakan:

```python
show(p)
```

untuk menampilkan visualisasi.

Secara umum, workflow Bokeh menjadi:

```text
DataFrame
    ↓
HoverTool
    ↓
  Figure
    ↓
Circle / Scatter
    ↓
  Show
    ↓
Interactive Visualization
```

---

### Contoh Kode Lengkap Bokeh

Berikut contoh implementasi berdasarkan studi kasus pemain sepak bola:

```python
from bokeh.plotting import figure, show
from bokeh.models import HoverTool

hover = HoverTool(
    tooltips=[
        ("Index", "$index"),
        ("Wage", "@Wage"),
        ("Value", "@Value"),
        ("Name", "@Name")
    ]
)

p = figure(
    title="Soccer 2019",
    x_axis_label="Wage",
    y_axis_label="Value",
    tools=[hover]
)

p.circle(
    'Wage',
    'Value',
    size=10,
    source=df1
)

show(p)
```

Hasilnya adalah scatter plot yang dapat digunakan secara interaktif.

![Visualisasi](/img/python/2.png)

---

## Seaborn vs Bokeh

Kedua library dapat digunakan untuk membuat visualisasi, tetapi memiliki karakteristik yang berbeda.

| Aspek | Seaborn | Bokeh |
| --- | --- | --- |
| Fokus | Visualisasi statistik | Visualisasi interaktif |
| Berbasis | Matplotlib | Library visualisasi interaktif |
| Interaksi | Terbatas/statis | Zoom, pan, hover |
| Tooltip | Tidak menjadi fokus utama | Didukung |
| Cocok untuk | Eksplorasi dan analisis | Dashboard dan visualisasi interaktif |

Secara sederhana:

```text
Seaborn
   ↓
Visualisasi Statis
   ↓
Analisis Data
```

Sedangkan:

```text
Bokeh
   ↓
Visualisasi Interaktif
   ↓
Eksplorasi & Presentasi Data
```

---

## Kapan Menggunakan Seaborn?

Seaborn cocok ketika kita ingin melakukan eksplorasi data dengan cepat.

Contohnya:

```text
Melihat hubungan antarvariabel
Melihat distribusi data
Membandingkan kelompok
Mencari pola
```

Misalnya:

```text
Wage vs Value
```

Kita dapat membuat scatter plot dengan cepat untuk melihat apakah terdapat hubungan tertentu.

---

## Kapan Menggunakan Bokeh?

Bokeh lebih cocok ketika pengguna perlu **berinteraksi langsung dengan visualisasi**.

Misalnya:

```text
Hover data
Zoom grafik
Pan grafik
Eksplorasi titik data
```

Dalam sebuah presentasi atau dashboard, pengguna dapat memilih bagian tertentu dari grafik dan melihat informasi yang lebih detail.

---

## Peran Visualisasi dalam Machine Learning

Visualisasi tidak hanya digunakan untuk membuat laporan.

Dalam Machine Learning, visualisasi dapat membantu kita memahami dataset sebelum model dibuat.

Misalnya:

```text
Dataset
   ↓
Visualization
   ↓
Memahami pola
   ↓
Menentukan fitur
   ↓
Machine Learning Model
```

Kita dapat melihat apakah terdapat:

```text
Outlier
Pola
Distribusi
Hubungan antarvariabel
Kelompok data
```

Informasi tersebut dapat membantu proses pengambilan keputusan sebelum melakukan pemodelan.

---

## Workflow Data Science

Materi yang sudah dipelajari dapat disusun menjadi workflow:

```text
1. Import Data
       ↓
2. Clean Data
       ↓
3. Analyze Data
       ↓
4. Visualize Data
       ↓
5. Machine Learning
```

Pada tahap visualisasi:

```text
Data
 ↓
┌───────────────┐
│ Visualization │
└───────┬───────┘
        │
   ┌────┴────┐
   ↓         ↓
Seaborn    Bokeh
   ↓         ↓
Statis   Interaktif
```

---

## Ringkasan

Konsep utama yang dipelajari:

- **Data Visualization** digunakan untuk menyajikan data dalam bentuk visual.
- Visualisasi membantu manusia memahami pola dan hubungan dalam dataset.
- **Seaborn** merupakan library berbasis Matplotlib yang memudahkan pembuatan visualisasi statistik.
- **Scatter plot** dapat digunakan untuk melihat hubungan antara dua variabel.
- **Bokeh** digunakan untuk membuat visualisasi yang lebih interaktif.
- Bokeh menyediakan fitur seperti **zoom, pan, dan hover**.
- `$` pada tooltip Bokeh digunakan untuk mengakses informasi khusus dari Bokeh.
- `@` digunakan untuk mengambil nilai dari kolom data source.
- Visualisasi merupakan bagian penting dari proses eksplorasi data sebelum Machine Learning.

---

## Kesimpulan

Data yang sudah dibersihkan belum tentu mudah dipahami hanya dengan melihat tabel.

Dengan Data Visualization, data dapat diubah menjadi bentuk visual sehingga pola dan hubungan antarvariabel dapat terlihat dengan lebih jelas.

Dalam Python, dua library yang dapat digunakan adalah:

```text
Seaborn
   ↓
Visualisasi statistik yang sederhana dan cepat

Bokeh
   ↓
Visualisasi interaktif
```

Keduanya memiliki peran masing-masing dalam workflow Data Science.

Secara keseluruhan, proses yang telah dipelajari sejauh ini adalah:

```text
Kaggle Dataset
      ↓
Import Data
      ↓
Pandas
      ↓
Data Cleaning
      ↓
Data Analysis
      ↓
Data Visualization
      ↓
Machine Learning
```

Dengan memahami tahap visualisasi, kita tidak hanya dapat **mengolah data**, tetapi juga dapat **mengkomunikasikan informasi yang terdapat di dalam data** kepada orang lain dengan cara yang lebih mudah dipahami.