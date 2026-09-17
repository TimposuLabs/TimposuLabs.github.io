---
sidebar_position: 6
title: "Subplots dengan Indeks Array"
---

Pada materi sebelumnya kita telah mempelajari cara membuat beberapa subplot dengan menggunakan **unpacking variabel**, misalnya:

```python
fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(2, 2)
```

Matplotlib menyediakan pendekatan lain yang lebih fleksibel, yaitu menyimpan seluruh objek `Axes` ke dalam sebuah **array** dan mengakses setiap subplot menggunakan indeks.

Pendekatan ini sangat berguna ketika kita membuat banyak subplot atau ingin menggunakan **perulangan (looping)** untuk menghasilkan visualisasi secara otomatis.

---

## Konsep Utama

Ketika kita menjalankan:

```python
fig, ax = plt.subplots(nrows=2, ncols=2)
```

Matplotlib akan membuat:

- satu objek `Figure`
- empat objek `Axes`
- objek `Axes` tersebut disimpan dalam array NumPy dengan bentuk `2 × 2`

Secara sederhana, struktur array tersebut dapat dibayangkan seperti berikut:

```text
             Kolom
             0          1
          ┌──────────┬──────────┐
Baris 0   │ ax[0,0]  │ ax[0,1]  │
          │ Kiri Atas│ Kanan Atas
          ├──────────┼──────────┤
Baris 1   │ ax[1,0]  │ ax[1,1]  │
          │ Kiri Bawah│Kanan Bawah
          └──────────┴──────────┘
```

Karena indexing Python dimulai dari `0`, maka:

```python
ax[0, 0]
```

berarti subplot pada baris pertama dan kolom pertama.

Sedangkan:

```python
ax[1, 1]
```

berarti subplot pada baris kedua dan kolom kedua.

---

## Membuat Grid Subplot 2 × 2

Kita dapat membuat grid subplot menggunakan:

```python
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(
    nrows=2,
    ncols=2,
    figsize=(10, 5)
)
```

Parameter:

| Parameter | Keterangan |
|---|---|
| `nrows=2` | Membuat 2 baris |
| `ncols=2` | Membuat 2 kolom |
| `figsize=(10, 5)` | Ukuran Figure dalam satuan inch |

Hasilnya adalah empat area plotting.

---

## Menyiapkan Data

Sebelum membuat grafik, kita dapat menyiapkan beberapa data sederhana:

```python
x = np.linspace(-3, 3, 100)

nut_butter_prices = {
    "Almond butter": 10,
    "Peanut butter": 8,
    "Cashew butter": 12
}
```

Data `x` akan digunakan untuk membuat line plot.

Sedangkan dictionary `nut_butter_prices` akan digunakan untuk membuat bar plot.

---

## Mengakses Subplot Menggunakan Index

Setelah membuat subplot:

```python
fig, ax = plt.subplots(
    nrows=2,
    ncols=2,
    figsize=(10, 5)
)
```

kita dapat mengakses masing-masing subplot menggunakan:

```python
ax[row, column]
```

Contohnya:

```python
ax[0, 0]
```

berarti:

- baris `0`
- kolom `0`

Sedangkan:

```python
ax[1, 0]
```

berarti:

- baris `1`
- kolom `0`

---

## Subplot Pertama - Line Plot

Kita dapat membuat line plot pada posisi kiri atas:

```python
ax[0, 0].plot(x, x / 2)
```

Posisinya adalah:

```text
┌──────────────────┬──────────────────┐
│ Line Plot        │                  │
│ ax[0, 0]         │                  │
├──────────────────┼──────────────────┤
│                  │                  │
└──────────────────┴──────────────────┘
```

---

## Subplot Kedua - Scatter Plot

Scatter plot dapat ditempatkan pada posisi kanan atas:

```python
ax[0, 1].scatter(
    np.random.random(10),
    np.random.random(10)
)
```

Posisinya:

```text
┌──────────────────┬──────────────────┐
│                  │ Scatter Plot     │
│                  │ ax[0, 1]         │
├──────────────────┼──────────────────┤
│                  │                  │
└──────────────────┴──────────────────┘
```

Kode tersebut menghasilkan 10 titik dengan nilai acak.

---

## Subplot Ketiga - Bar Plot

Selanjutnya kita dapat membuat bar plot pada posisi kiri bawah:

```python
ax[1, 0].bar(
    nut_butter_prices.keys(),
    nut_butter_prices.values()
)
```

Posisinya:

```text
┌──────────────────┬──────────────────┐
│                  │                  │
│                  │                  │
├──────────────────┼──────────────────┤
│ Bar Plot         │                  │
│ ax[1, 0]         │                  │
└──────────────────┴──────────────────┘
```

Bar plot menampilkan harga masing-masing jenis nut butter.

---

## Subplot Keempat - Histogram

Histogram dapat ditempatkan pada posisi kanan bawah:

```python
ax[1, 1].hist(
    np.random.randn(1000)
)
```

Posisinya:

```text
┌──────────────────┬──────────────────┐
│                  │                  │
│                  │                  │
├──────────────────┼──────────────────┤
│                  │ Histogram        │
│                  │ ax[1, 1]         │
└──────────────────┴──────────────────┘
```

`np.random.randn(1000)` menghasilkan 1000 angka acak yang mengikuti distribusi normal standar.

---

## Contoh Lengkap

Berikut contoh lengkap penggunaan subplot dengan pendekatan indexing array:

```python
import matplotlib.pyplot as plt
import numpy as np

# Menyiapkan data
x = np.linspace(-3, 3, 100)

nut_butter_prices = {
    "Almond butter": 10,
    "Peanut butter": 8,
    "Cashew butter": 12
}

# Membuat Figure dan grid subplot 2x2
fig, ax = plt.subplots(
    nrows=2,
    ncols=2,
    figsize=(10, 5)
)

# Subplot 1: Line Plot
ax[0, 0].plot(x, x / 2)
ax[0, 0].set_title("Line Plot")

# Subplot 2: Scatter Plot
ax[0, 1].scatter(
    np.random.random(10),
    np.random.random(10)
)
ax[0, 1].set_title("Scatter Plot")

# Subplot 3: Bar Plot
ax[1, 0].bar(
    nut_butter_prices.keys(),
    nut_butter_prices.values()
)
ax[1, 0].set_title("Bar Plot")

# Subplot 4: Histogram
ax[1, 1].hist(
    np.random.randn(1000)
)
ax[1, 1].set_title("Histogram")

# Mengatur layout
plt.tight_layout()

# Menampilkan Figure
plt.show()
```

![matplotlib](/img/python/24.png)

Dengan kode tersebut, kita mendapatkan empat jenis visualisasi dalam satu Figure:

```text
┌────────────────────────┬────────────────────────┐
│       Line Plot        │      Scatter Plot      │
│        ax[0, 0]        │        ax[0, 1]        │
├────────────────────────┼────────────────────────┤
│        Bar Plot        │       Histogram        │
│        ax[1, 0]        │        ax[1, 1]        │
└────────────────────────┴────────────────────────┘
```

---

## Memahami `ax[row, column]`

Hal terpenting dari pendekatan ini adalah memahami struktur indexing.

Untuk subplot `2 × 2`:

| Index | Posisi | Contoh |
|---|---|---|
| `ax[0, 0]` | Kiri atas | Line plot |
| `ax[0, 1]` | Kanan atas | Scatter plot |
| `ax[1, 0]` | Kiri bawah | Bar plot |
| `ax[1, 1]` | Kanan bawah | Histogram |

Perlu diingat bahwa indexing Python dimulai dari `0`.

Jadi:

```text
Baris 0 → baris pertama
Baris 1 → baris kedua

Kolom 0 → kolom pertama
Kolom 1 → kolom kedua
```

---

## Melihat Shape dari Array Axes

Karena `ax` merupakan array NumPy ketika membuat beberapa subplot, kita dapat memeriksa dimensinya:

```python
fig, ax = plt.subplots(
    nrows=2,
    ncols=2
)

print(ax.shape)
```

Output:

```text
(2, 2)
```

Artinya array `ax` mempunyai:

- 2 baris
- 2 kolom

Kita juga dapat memeriksa jumlah dimensinya:

```python
print(ax.ndim)
```

Output:

```text
2
```

Hal ini menunjukkan bahwa `ax` merupakan array dua dimensi.

---

## Menggunakan Subplot dengan Looping

Salah satu keuntungan utama pendekatan array indexing adalah kemudahannya ketika dikombinasikan dengan looping.

Misalnya kita mempunyai beberapa data:

```python
x = np.linspace(0, 10, 100)

data = [
    x,
    x ** 2,
    x ** 3,
    np.sqrt(x)
]
```

Kita dapat membuat subplot:

```python
fig, ax = plt.subplots(
    nrows=2,
    ncols=2,
    figsize=(10, 6)
)
```

Kemudian mengakses setiap subplot menggunakan kombinasi indeks:

```python
for i, data_item in enumerate(data):
    row = i // 2
    column = i % 2

    ax[row, column].plot(x, data_item)

plt.tight_layout()
plt.show()
```

Pendekatan seperti ini menjadi sangat berguna ketika jumlah visualisasi semakin banyak.

---

## Flatten Array Axes

Ketika membuat banyak subplot, kita juga dapat mengubah array `Axes` menjadi array satu dimensi menggunakan:

```python
axes = ax.flatten()
```

Contohnya:

```python
fig, ax = plt.subplots(
    nrows=2,
    ncols=2,
    figsize=(10, 6)
)

axes = ax.flatten()

axes[0].plot(x, x)
axes[1].plot(x, x ** 2)
axes[2].plot(x, x ** 3)
axes[3].plot(x, np.sqrt(x))

plt.tight_layout()
plt.show()
```

Setelah `flatten()`, struktur:

```text
ax[0, 0]
ax[0, 1]
ax[1, 0]
ax[1, 1]
```

menjadi:

```text
axes[0]
axes[1]
axes[2]
axes[3]
```

Pendekatan ini sering membuat looping subplot menjadi lebih sederhana.

---

## Perbandingan Dua Pendekatan Subplots

Terdapat dua pendekatan yang telah kita pelajari.

### Opsi 1 - Unpacking Variables

Contoh:

```python
fig, ((ax1, ax2), (ax3, ax4)) = plt.subplots(
    nrows=2,
    ncols=2
)
```

Setiap subplot mendapatkan nama variabel secara langsung.

Contohnya:

```python
ax1.plot(x, x)
ax2.scatter(x, x)
ax3.bar(categories, values)
ax4.hist(data)
```

Pendekatan ini mudah dibaca ketika jumlah subplot sedikit dan strukturnya sudah diketahui.

---

### Opsi 2 - Array Indexing

Contoh:

```python
fig, ax = plt.subplots(
    nrows=2,
    ncols=2
)
```

Kemudian setiap subplot diakses menggunakan:

```python
ax[0, 0]
ax[0, 1]
ax[1, 0]
ax[1, 1]
```

Pendekatan ini sangat fleksibel karena objek `Axes` disimpan dalam struktur array.

---

## Perbandingan

| Aspek | Opsi 1: Unpacking | Opsi 2: Array Indexing |
|---|---|---|
| Penulisan | Lebih eksplisit | Lebih ringkas |
| Akses subplot | Menggunakan nama variabel | Menggunakan indeks |
| Subplot sedikit | Sangat nyaman | Nyaman |
| Subplot banyak | Bisa menjadi panjang | Lebih fleksibel |
| Looping | Kurang praktis | Sangat cocok |
| Struktur grid | Terlihat dari nama variabel | Terlihat dari indeks |
| Fleksibilitas | Baik | Sangat baik |

Tidak ada satu pendekatan yang selalu harus digunakan. Pilihan bergantung pada struktur dan kebutuhan visualisasi.

---

## Kapan Menggunakan Array Indexing?

Pendekatan array indexing sangat berguna ketika:

1. Membuat banyak subplot.
2. Struktur subplot berbentuk grid.
3. Membutuhkan looping.
4. Jumlah subplot dapat berubah.
5. Visualisasi dibuat secara programatis.
6. Kita ingin mengakses subplot berdasarkan posisi baris dan kolom.

Contohnya ketika melakukan Exploratory Data Analysis (EDA) dan ingin membuat visualisasi untuk banyak fitur.

---

## Hubungan dengan NumPy

Menariknya, pendekatan ini memperlihatkan hubungan antara Matplotlib dan NumPy.

Ketika kita menggunakan:

```python
fig, ax = plt.subplots(2, 2)
```

objek `ax` dapat berbentuk array NumPy.

Karena itu kita dapat menggunakan konsep NumPy seperti:

```python
ax.shape
```

dan:

```python
ax.flatten()
```

Hal ini menjadi salah satu alasan mengapa pemahaman NumPy sangat membantu ketika mempelajari Data Science dan Matplotlib.

---

## Kesalahan yang Sering Terjadi

### Salah Memahami Urutan Index

Pastikan urutannya:

```python
ax[row, column]
```

bukan:

```python
ax[column, row]
```

Contoh:

```python
ax[1, 0]
```

berarti:

```text
Baris 1
Kolom 0
```

atau posisi kiri bawah pada grid `2 × 2`.

---

### Menggunakan Index yang Tidak Ada

Untuk array `2 × 2`, index yang valid adalah:

```python
ax[0, 0]
ax[0, 1]
ax[1, 0]
ax[1, 1]
```

Index seperti:

```python
ax[2, 0]
```

akan menghasilkan error karena baris ke-3 tidak tersedia.

---

### Lupa Mengatur Layout

Ketika terdapat banyak subplot, judul dan label dapat saling bertumpuk.

Gunakan:

```python
plt.tight_layout()
```

untuk membantu mengatur jarak antar elemen.

Pada kode yang lebih kompleks, kita juga dapat menggunakan:

```python
fig.tight_layout()
```

---

## Ringkasan

Pada materi ini kita mempelajari **Subplots Option 2**, yaitu membuat subplot menggunakan array dan indexing.

Konsep utamanya:

```python
fig, ax = plt.subplots(
    nrows=2,
    ncols=2
)
```

Kemudian setiap subplot dapat diakses menggunakan:

```python
ax[row, column]
```

Untuk grid `2 × 2`:

```text
ax[0, 0]    ax[0, 1]
ax[1, 0]    ax[1, 1]
```

Pendekatan ini memiliki beberapa keuntungan:

- struktur subplot mudah dipahami;
- fleksibel untuk banyak subplot;
- cocok digunakan dengan NumPy;
- mudah dikombinasikan dengan looping;
- dapat menggunakan `flatten()` untuk menyederhanakan indexing.

Pola yang penting untuk diingat:

```python
fig, ax = plt.subplots(rows, columns)

ax[row, column].plot(...)
```

---

## Inti Materi

Jika hanya mengingat beberapa hal dari materi ini, ingat tiga konsep berikut:

**1. Membuat grid subplot**

```python
fig, ax = plt.subplots(2, 2)
```

**2. Mengakses subplot**

```python
ax[0, 0]
ax[0, 1]
ax[1, 0]
ax[1, 1]
```

**3. Menggunakan subplot dengan looping**

```python
axes = ax.flatten()

for i, data_item in enumerate(data):
    axes[i].plot(x, data_item)
```

Dengan memahami konsep ini, kita dapat membuat visualisasi yang lebih terstruktur dan scalable untuk kebutuhan Data Science.
