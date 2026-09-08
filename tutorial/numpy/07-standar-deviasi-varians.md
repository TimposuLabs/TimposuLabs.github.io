---
sidebar_position: 8
title: "Standard Deviation & Varians"
---

Pada materi sebelumnya kita telah mempelajari **aggregation** pada NumPy, seperti `sum`, `mean`, `min`, dan `max`.

Namun, mengetahui nilai rata-rata saja belum cukup untuk memahami sebuah dataset.

Sebagai contoh, perhatikan dua kelompok data:

```python
data_a = np.array([4, 5, 6, 5, 5])
data_b = np.array([1, 10, 2, 9, 3])
```

Kedua dataset dapat memiliki nilai rata-rata yang relatif sama, tetapi pola penyebaran datanya berbeda.

Data A memiliki nilai yang cenderung berdekatan, sedangkan Data B memiliki nilai yang lebih tersebar.

Untuk mengukur **seberapa tersebar data dari nilai rata-ratanya**, kita dapat menggunakan:

- **Variance (Varians)**
- **Standard Deviation (Standar Deviasi)**

Kedua konsep ini sangat penting dalam statistik, Data Science, dan Machine Learning.

---

## Apa Itu Penyebaran Data?

**Penyebaran data** atau *spread of data* menggambarkan seberapa jauh nilai-nilai dalam suatu dataset tersebar dari pusat datanya.

Perhatikan contoh sederhana:

```text
Data A:
4, 5, 5, 5, 6

Data B:
1, 3, 5, 7, 9
```

Data A memiliki nilai yang saling berdekatan.

Data B memiliki rentang nilai yang lebih luas.

Secara sederhana:

```text
Penyebaran kecil
       ↓
Data lebih berdekatan
       ↓
Variance dan Standard Deviation lebih kecil
```

Sedangkan:

```text
Penyebaran besar
       ↓
Data lebih berjauhan
       ↓
Variance dan Standard Deviation lebih besar
```

Dengan demikian, ukuran penyebaran membantu kita memahami karakteristik dataset yang tidak dapat diketahui hanya dari nilai rata-rata.

---

## Variance

**Variance** atau varians merupakan ukuran statistik yang menunjukkan seberapa jauh nilai-nilai data tersebar dari nilai rata-ratanya.

Dalam NumPy, varians dapat dihitung menggunakan:

```python
np.var()
```

Contoh:

```python
import numpy as np

data = np.array([2, 4, 6, 8, 10])

print(np.var(data))
```

Output:

```text
8.0
```

Semakin besar nilai varians, secara umum semakin besar penyebaran data terhadap rata-ratanya.

---

## Standard Deviation

**Standard deviation** atau standar deviasi juga digunakan untuk mengukur penyebaran data terhadap nilai rata-ratanya.

Dalam NumPy:

```python
np.std()
```

Contoh:

```python
data = np.array([2, 4, 6, 8, 10])

print(np.std(data))
```

Output kira-kira:

```text
2.82842712
```

Standar deviasi memiliki kelebihan dibandingkan varians karena satuannya sama dengan satuan data asli.

Misalnya data memiliki satuan:

```text
Kilogram
```

maka standar deviasi juga memiliki satuan:

```text
Kilogram
```

Sedangkan varians menggunakan satuan kuadrat.

---

## Hubungan Variance dan Standard Deviation

Variance dan standard deviation memiliki hubungan matematis yang sangat erat.

Rumusnya:

```text
Standard Deviation = √Variance
```

Sedangkan:

```text
Variance = Standard Deviation²
```

Contohnya:

```python
data = np.array([2, 4, 6, 8, 10])

variance = np.var(data)
standard_deviation = np.std(data)

print("Variance:", variance)
print("Standard Deviation:", standard_deviation)
```

Hasil:

```text
Variance: 8.0
Standard Deviation: 2.82842712
```

Kita dapat memeriksa hubungannya:

```python
print(np.sqrt(variance))
```

Hasil:

```text
2.82842712
```

Sama dengan nilai standard deviation.

---

## Mean, Variance, dan Standard Deviation

Ketiga konsep tersebut saling berkaitan.

Misalnya:

```python
data = np.array([2, 4, 6, 8, 10])

mean = np.mean(data)
variance = np.var(data)
standard_deviation = np.std(data)

print("Mean:", mean)
print("Variance:", variance)
print("Standard Deviation:", standard_deviation)
```

Hasil:

```text
Mean: 6.0
Variance: 8.0
Standard Deviation: 2.82842712
```

Interpretasinya:

- **Mean = 6** menunjukkan pusat data.
- **Variance = 8** menunjukkan tingkat penyebaran dalam bentuk varians.
- **Standard deviation ≈ 2.83** menunjukkan ukuran penyebaran dalam satuan yang sama dengan data.

Ketiganya memberikan informasi yang berbeda tetapi saling melengkapi.

---

## Data dengan Varians Tinggi

Sekarang kita dapat membandingkan dataset dengan penyebaran yang sangat berbeda.

```python
high_var_array = np.array([
    1, 100, 200, 300, 4000, 5000
])
```

Data tersebut memiliki rentang yang sangat luas.

Kita dapat menghitung statistiknya:

```python
print("Mean:", np.mean(high_var_array))
print("Variance:", np.var(high_var_array))
print("Standard Deviation:", np.std(high_var_array))
```

Nilai varians dan standar deviasinya akan relatif besar karena terdapat perbedaan nilai yang sangat jauh di dalam dataset.

---

## Data dengan Varians Rendah

Bandingkan dengan:

```python
low_var_array = np.array([
    2, 4, 6, 8, 10
])
```

Hitung statistiknya:

```python
print("Mean:", np.mean(low_var_array))
print("Variance:", np.var(low_var_array))
print("Standard Deviation:", np.std(low_var_array))
```

Hasilnya:

```text
Mean: 6.0
Variance: 8.0
Standard Deviation: 2.82842712
```

Dibandingkan dengan `high_var_array`, penyebaran data jauh lebih kecil.

---

## Membandingkan Varians Tinggi dan Rendah

Kita dapat membuat perbandingan secara langsung:

```python
import numpy as np

high_var_array = np.array([
    1, 100, 200, 300, 4000, 5000
])

low_var_array = np.array([
    2, 4, 6, 8, 10
])

print("High Variance")
print("Mean:", np.mean(high_var_array))
print("Variance:", np.var(high_var_array))
print("Standard Deviation:", np.std(high_var_array))

print()

print("Low Variance")
print("Mean:", np.mean(low_var_array))
print("Variance:", np.var(low_var_array))
print("Standard Deviation:", np.std(low_var_array))
```

Kita akan melihat bahwa:

```text
High Variance
→ Penyebaran data besar
→ Variance besar
→ Standard deviation besar
```

Sedangkan:

```text
Low Variance
→ Penyebaran data kecil
→ Variance kecil
→ Standard deviation kecil
```

---

## Interpretasi Standard Deviation

Misalnya:

```python
low_var_array = np.array([
    2, 4, 6, 8, 10
])

print(np.mean(low_var_array))
print(np.std(low_var_array))
```

Hasilnya:

```text
6.0
2.82842712
```

Kita dapat mengatakan bahwa standar deviasi data tersebut sekitar **2.83**.

Namun, perlu berhati-hati dalam menginterpretasikan standar deviasi sebagai "setiap data rata-rata berjarak tepat 2.83 dari mean".

Interpretasi yang lebih tepat adalah bahwa **standar deviasi merupakan ukuran tipikal penyebaran data terhadap mean**, berdasarkan definisi statistiknya.

---

## Mengapa Varians Tinggi Penting?

Varians tinggi menunjukkan bahwa data memiliki penyebaran yang besar.

Misalnya terdapat data harga rumah:

```text
500 juta
550 juta
600 juta
2 miliar
5 miliar
```

Harga rumah tersebut memiliki rentang yang sangat besar.

Jika kita hanya melihat rata-rata, kita mungkin kehilangan informasi mengenai penyebaran data.

Dengan menggunakan standar deviasi dan varians, kita mendapatkan informasi tambahan mengenai seberapa bervariasi harga rumah tersebut.

---

## Mengapa Varians Rendah Penting?

Varians rendah menunjukkan bahwa nilai-nilai data cenderung berada di sekitar rata-ratanya.

Misalnya:

```text
98
100
101
99
102
```

Data tersebut memiliki penyebaran yang relatif kecil.

Jika rata-ratanya sekitar `100`, sebagian besar data berada dekat dengan nilai tersebut.

---

## Visualisasi Penyebaran Data

Angka statistik akan lebih mudah dipahami jika kita juga melihat visualisasinya.

Salah satu visualisasi sederhana yang dapat digunakan adalah **histogram**.

Histogram menunjukkan bagaimana data tersebar ke dalam beberapa interval atau *bins*.

Untuk membuat histogram menggunakan Python dan Matplotlib:

```python
import matplotlib.pyplot as plt
```

---

## Histogram Data dengan Varians Tinggi

Kita dapat membuat histogram dari `high_var_array`:

```python
plt.hist(high_var_array)
plt.show()
```

Karena nilai pada array memiliki rentang yang sangat luas, histogram dapat menunjukkan distribusi yang tidak merata.

Sebagian besar nilai berada jauh dari nilai lainnya.

![varian tinggi](/img/python/5.png)

:::info
Keterangan:

- Kotak 1 (Rentang 1 - 500): Berisi angka 1, 100, 200, 300 (Total ada 4 data ➡️ Bar menjulang tinggi).
- Kotak 2 s/d Kotak 8 (Rentang 501 - 4000): KOSONG (0 data ➡️ Grafiknya rata dengan tanah / kosong).
- Kotak 9 (Rentang 4001 - 4500): Berisi angka 4000 (1 data ➡️ Bar pendek).
- Kotak 10 (Rentang 4501 - 5000): Berisi angka 5000 (1 data ➡️ Bar pendek).
:::

---

## Histogram Data dengan Varians Rendah

Sekarang tampilkan histogram dari `low_var_array`:

```python
plt.hist(low_var_array)
plt.show()
```

Karena nilai-nilai pada dataset lebih berdekatan, penyebarannya terlihat lebih terkonsentrasi pada rentang yang lebih sempit.

![varian tinggi](/img/python/6.png)

---

## Membandingkan Histogram

Kita dapat menampilkan kedua histogram secara terpisah:

```python
plt.hist(high_var_array)
plt.title("High Variance")
plt.show()
```

Kemudian:

```python
plt.hist(low_var_array)
plt.title("Low Variance")
plt.show()
```

Dari visualisasi tersebut kita dapat melihat perbedaan karakteristik kedua dataset.

Secara umum:

```text
High Variance
→ Rentang data lebih luas
→ Nilai lebih tersebar
```

Sedangkan:

```text
Low Variance
→ Rentang data lebih sempit
→ Nilai lebih terkonsentrasi
```

---

## Histogram dan Bins

Histogram membagi rentang data menjadi beberapa kelompok yang disebut **bins**.

Jumlah bins dapat memengaruhi tampilan histogram.

Contohnya:

```python
plt.hist(
    low_var_array,
    bins=5
)

plt.show()
```

Kita juga dapat menggunakan jumlah bins yang berbeda:

```python
plt.hist(
    low_var_array,
    bins=10
)

plt.show()
```

Karena dataset pada contoh ini sangat kecil, perubahan jumlah bins mungkin menghasilkan visualisasi yang tidak terlalu informatif.

Pada dataset yang lebih besar, pemilihan jumlah bins dapat memberikan gambaran distribusi yang lebih baik.

---

## Kombinasi NumPy dan Matplotlib

Pada Data Science, NumPy dan Matplotlib sering digunakan bersama.

NumPy digunakan untuk:

- Membuat array.
- Melakukan operasi numerik.
- Menghitung statistik.
- Mengolah data numerik.

Matplotlib digunakan untuk:

- Membuat grafik.
- Memvisualisasikan distribusi.
- Membandingkan data.
- Membantu memahami pola data.

Contoh workflow:

```text
Data
 ↓
NumPy Array
 ↓
Perhitungan Statistik
 ↓
Mean
Variance
Standard Deviation
 ↓
Visualisasi
 ↓
Interpretasi Data
```

---

## Contoh Lengkap

Berikut contoh sederhana yang menggabungkan NumPy dan Matplotlib:

```python
import numpy as np
import matplotlib.pyplot as plt

high_var_array = np.array([
    1, 100, 200, 300, 4000, 5000
])

low_var_array = np.array([
    2, 4, 6, 8, 10
])

print("=== High Variance ===")
print("Mean:", np.mean(high_var_array))
print("Variance:", np.var(high_var_array))
print("Standard Deviation:", np.std(high_var_array))

print()

print("=== Low Variance ===")
print("Mean:", np.mean(low_var_array))
print("Variance:", np.var(low_var_array))
print("Standard Deviation:", np.std(low_var_array))
```

Kemudian visualisasikan:

```python
plt.hist(high_var_array)
plt.title("High Variance")
plt.show()
```

Dan:

```python
plt.hist(low_var_array)
plt.title("Low Variance")
plt.show()
```

Dengan demikian kita dapat menggabungkan **perhitungan statistik** dan **visualisasi** untuk mendapatkan pemahaman yang lebih baik mengenai data.

---

## Variance dan Outlier

Varians dan standar deviasi sangat dipengaruhi oleh nilai yang ekstrem atau **outlier**.

Perhatikan:

```python
data_a = np.array([
    10, 11, 12, 13, 14
])

data_b = np.array([
    10, 11, 12, 13, 100
])
```

Sebagian besar nilai pada kedua dataset relatif dekat.

Namun, dataset kedua memiliki nilai `100` yang jauh dari nilai lainnya.

Akibatnya, variance dan standard deviation dapat meningkat secara signifikan.

Hal ini penting dalam Data Science karena outlier dapat memengaruhi berbagai statistik.

---

## Jangan Hanya Mengandalkan Standard Deviation

Standard deviation merupakan statistik yang berguna, tetapi tidak selalu cukup untuk memahami distribusi data.

Sebaiknya gunakan beberapa pendekatan secara bersamaan:

```text
Mean
+
Variance
+
Standard Deviation
+
Minimum
+
Maximum
+
Visualisasi
```

Untuk analisis yang lebih lengkap, kita juga dapat menggunakan statistik lain seperti:

- Median.
- Quartile.
- Percentile.
- Interquartile Range (IQR).

Konsep-konsep tersebut akan menjadi bagian penting dalam statistik dan Exploratory Data Analysis.

---

## Variance dan Standard Deviation dalam Machine Learning

Variance dan standard deviation juga memiliki banyak penggunaan dalam Machine Learning.

Contohnya:

- Memahami distribusi fitur.
- Mendeteksi data yang sangat tersebar.
- Membantu proses preprocessing.
- Membandingkan karakteristik fitur.
- Memahami outlier.
- Menjadi bagian dari standardization.

Salah satu teknik preprocessing yang sering digunakan adalah **standardization**.

Secara umum, standardization menggunakan mean dan standard deviation untuk mengubah skala data.

Konsep sederhananya:

```text
Data
 ↓
Kurangi Mean
 ↓
Bagi Standard Deviation
 ↓
Data dengan skala yang distandarkan
```

Implementasi standardization akan dibahas lebih lanjut pada materi preprocessing Machine Learning.

---

## Kesalahan yang Sering Terjadi

### Menganggap Varians dan Standard Deviation Sama

Keduanya mengukur penyebaran data, tetapi nilainya berbeda.

Hubungannya:

```text
Standard Deviation = √Variance
```

---

### Menganggap Standard Deviation Adalah Jarak Tepat Setiap Data

Standard deviation merupakan ukuran penyebaran data terhadap mean, bukan berarti setiap nilai data memiliki jarak yang sama dari mean.

---

### Mengabaikan Outlier

Nilai ekstrem dapat meningkatkan variance dan standard deviation secara signifikan.

Karena itu, ketika melihat standard deviation yang sangat besar, periksa juga kemungkinan adanya outlier.

---

### Hanya Melihat Mean

Dua dataset dapat memiliki mean yang sama tetapi distribusi dan penyebaran yang sangat berbeda.

Oleh karena itu, mean sebaiknya tidak digunakan sendirian untuk memahami dataset.

---

### Salah Menginterpretasikan Histogram

Histogram merupakan alat untuk membantu melihat distribusi data.

Bentuk histogram dapat berubah tergantung jumlah bins yang digunakan.

Karena itu, jangan menarik kesimpulan hanya berdasarkan satu pengaturan histogram tanpa mempertimbangkan karakteristik dataset.

---

## Workflow Analisis Penyebaran Data

Workflow sederhana yang dapat digunakan:

```text
Dataset
   ↓
Buat NumPy Array
   ↓
Periksa Data
   ↓
Hitung Mean
   ↓
Hitung Variance
   ↓
Hitung Standard Deviation
   ↓
Buat Visualisasi
   ↓
Periksa Outlier
   ↓
Interpretasikan Penyebaran Data
```

Workflow ini merupakan salah satu dasar penting dalam **Exploratory Data Analysis (EDA)**.

---

## Ringkasan

Pada materi ini kita telah mempelajari:

- Penyebaran data atau *spread of data*.
- Variance sebagai ukuran penyebaran data.
- Standard deviation sebagai ukuran penyebaran data dalam satuan yang sama dengan data.
- `np.var()` untuk menghitung variance.
- `np.std()` untuk menghitung standard deviation.
- Hubungan antara variance dan standard deviation.
- Perbedaan dataset dengan variance tinggi dan rendah.
- Penggunaan histogram untuk melihat distribusi data.
- Penggunaan Matplotlib untuk visualisasi.
- Pengaruh outlier terhadap variance dan standard deviation.
- Pentingnya menggunakan statistik dan visualisasi secara bersama-sama.
- Penggunaan variance dan standard deviation dalam konteks Machine Learning.

---

## Checklist Pembelajaran

Pastikan Anda sudah memahami:

- [ ] Apa yang dimaksud dengan penyebaran data.
- [ ] Apa yang dimaksud dengan variance.
- [ ] Apa yang dimaksud dengan standard deviation.
- [ ] Cara menggunakan `np.var()`.
- [ ] Cara menggunakan `np.std()`.
- [ ] Hubungan variance dan standard deviation.
- [ ] Perbedaan data dengan variance tinggi dan rendah.
- [ ] Cara membuat histogram menggunakan `plt.hist()`.
- [ ] Apa yang dimaksud dengan bins pada histogram.
- [ ] Mengapa outlier dapat memengaruhi variance dan standard deviation.
- [ ] Mengapa mean saja tidak cukup untuk memahami dataset.
- [ ] Hubungan NumPy dan Matplotlib dalam analisis data.
- [ ] Peran variance dan standard deviation dalam Machine Learning.

---

## Latihan

Buat dua array berikut:

```python
data_a = np.array([
    10, 11, 12, 13, 14, 15
])

data_b = np.array([
    2, 5, 10, 15, 20, 30
])
```

Kemudian lakukan:

1. Hitung mean masing-masing array.
2. Hitung variance masing-masing array.
3. Hitung standard deviation masing-masing array.
4. Bandingkan variance kedua array.
5. Bandingkan standard deviation kedua array.
6. Buat histogram untuk `data_a`.
7. Buat histogram untuk `data_b`.
8. Tambahkan satu nilai ekstrem ke salah satu dataset.
9. Hitung kembali variance dan standard deviation.
10. Amati bagaimana nilai ekstrem tersebut memengaruhi hasil.

Tujuan latihan ini adalah memahami hubungan antara **nilai data, mean, variance, standard deviation, dan visualisasi distribusi**.
