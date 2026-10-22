---
sidebar_position: 6
title: "Eksplorasi: Feature Comparison"
---

Pada tahap Exploratory Data Analysis (EDA), kita tidak hanya melihat isi dataset, tetapi juga membandingkan beberapa fitur untuk **memahami pola** yang mungkin berhubungan dengan variabel target.

Proses ini disebut **Feature Comparison**, yaitu membandingkan fitur atau kolom untuk mengetahui bagaimana karakteristik suatu kelompok data berbeda dari kelompok lainnya.

Pada project Heart Disease Classification, kita akan membandingkan kolom `sex` dengan `target`.

Tujuan analisis ini adalah:

- Memahami hubungan awal antara jenis kelamin dan target penyakit jantung.
- Membangun intuisi berdasarkan pola yang ditemukan dalam dataset.
- Menentukan baseline sederhana sebagai pembanding awal model Machine Learning.
- Menyiapkan eksplorasi fitur lainnya.

Perlu diingat bahwa hubungan yang ditemukan pada tahap EDA tidak otomatis menunjukkan hubungan sebab-akibat.

## 1. Memahami Kolom `sex` dan `target`

Sebelum membandingkan kolom, kita perlu memahami arti setiap variabel berdasarkan Data Dictionary dataset yang digunakan.

### Kolom `sex`

Kolom `sex` merepresentasikan kode jenis kelamin dalam dataset Heart Disease yang digunakan pada materi ini.

| Nilai | Keterangan |
|---|---|
| `0` | Perempuan (Female) |
| `1` | Laki-laki (Male) |

### Kolom `target`

Kolom `target` merupakan variabel yang ingin diprediksi oleh model Machine Learning.

| Nilai | Keterangan |
|---|---|
| `0` | Kelas tanpa indikasi penyakit jantung menurut label dataset |
| `1` | Kelas dengan indikasi penyakit jantung menurut label dataset |

Label tersebut mengikuti definisi dataset, bukan merupakan diagnosis medis terhadap seseorang.

## 2. Membandingkan Kolom dengan `pd.crosstab()`

Pandas menyediakan fungsi `pd.crosstab()` untuk membuat tabel silang atau *cross-tabulation*.

Tabel silang membantu kita menghitung jumlah data berdasarkan kombinasi nilai dari dua kolom.

### Contoh Kode

Jalankan kode berikut di Jupyter Notebook:

```python
pd.crosstab(df["target"], df["sex"])
```

### Contoh Output

Pada dataset Heart Disease yang umum digunakan dalam project ini, hasilnya adalah:

```text
sex       0    1
target
0        24  114
1        72   93
```

### Cara Membaca Output

Baris menunjukkan nilai `target`, sedangkan kolom menunjukkan nilai `sex`.

Dari tabel tersebut, kita memperoleh informasi berikut:

| Target | Perempuan (`sex = 0`) | Laki-laki (`sex = 1`) |
|---|---:|---:|
| `0` | 24 | 114 |
| `1` | 72 | 93 |
| Total | 96 | 207 |

Interpretasinya:

- Dari 96 sampel perempuan, 72 memiliki label `target = 1` dan 24 memiliki label `target = 0`.
- Dari 207 sampel laki-laki, 93 memiliki label `target = 1` dan 114 memiliki label `target = 0`.

Angka tersebut merupakan jumlah sampel dalam dataset, bukan jumlah pasien pada populasi secara keseluruhan (bukan kondisi seluruh pasien penyakit jantung di dunia nyata).

## 3. Menghitung Persentase Setiap Kelompok

Jumlah sampel saja belum cukup untuk membandingkan kedua kelompok karena jumlah perempuan dan laki-laki dalam dataset berbeda.

Kita perlu menghitung persentase berdasarkan total masing-masing kelompok.

### Kode Menghitung Persentase

```python
pd.crosstab(
    df["sex"],
    df["target"],
    normalize="index"
) * 100
```

Penjelasan:

- `normalize="index"` menghitung proporsi setiap baris berdasarkan total baris tersebut.
- Perkalian `100` mengubah proporsi menjadi persentase.

Karena `sex` menjadi indeks baris, setiap baris mewakili satu kelompok jenis kelamin.

### Contoh Output

```text
target          0          1
sex
0          25.0000    75.0000
1          55.0725    44.9275
```

Interpretasinya:

- Pada kelompok perempuan, sekitar 75% sampel memiliki `target = 1`.
- Pada kelompok laki-laki, sekitar 44,93% sampel memiliki `target = 1`.

Berdasarkan dataset ini, proporsi label positif pada kelompok perempuan lebih tinggi daripada kelompok laki-laki.

Namun, temuan tersebut hanya menggambarkan pola pada dataset yang sedang dianalisis. Temuan ini tidak boleh langsung digunakan untuk menyimpulkan risiko penyakit jantung seseorang berdasarkan jenis kelamin saja.

## 4. Membuat Simple Heuristic sebagai Baseline

**Simple heuristic** adalah aturan sederhana yang digunakan untuk menghasilkan prediksi tanpa membangun model Machine Learning yang kompleks.

Salah satu baseline paling sederhana adalah selalu memprediksi kelas yang paling sering muncul.

Pada dataset ini, distribusi target adalah:

- `target = 1`: 165 sampel.
- `target = 0`: 138 sampel.

Jika kita selalu memprediksi `target = 1`, akurasi pada seluruh dataset akan menjadi:

$$
\text{Accuracy} = \frac{165}{303} \times 100\%
$$

Hasilnya sekitar **54,46%**.

Contoh kode untuk menghitung baseline tersebut:

```python
baseline_accuracy = df["target"].value_counts(normalize=True).max()

print(f"Baseline accuracy: {baseline_accuracy:.2%}")
```

Contoh output:

```text
Baseline accuracy: 54.46%
```

Baseline ini menggunakan informasi distribusi target saja, tanpa memanfaatkan hubungan fitur dengan target.

### Membandingkan Baseline dengan Aturan `sex`

Kita juga dapat membuat aturan sederhana berdasarkan `sex`. Misalnya:

- Jika `sex = 0`, prediksi `target = 1`.
- Jika `sex = 1`, prediksi `target = 0`.

Aturan tersebut mengikuti kelas mayoritas dalam masing-masing kelompok pada dataset ini.

Kode untuk menguji aturan tersebut:

```python
from sklearn.metrics import accuracy_score

y_true = df["target"]

y_pred_sex = df["sex"].map({
    0: 1,
    1: 0
})

accuracy_sex = accuracy_score(y_true, y_pred_sex)

print(f"Accuracy using sex heuristic: {accuracy_sex:.2%}")
```

Contoh output:

```text
Accuracy using sex heuristic: 61.39%
```

Angka tersebut berasal dari 72 prediksi benar pada kelompok perempuan dan 114 prediksi benar pada kelompok laki-laki, sehingga totalnya 186 dari 303 sampel.

Aturan ini memberikan gambaran bahwa fitur sederhana dapat menghasilkan pola prediksi tertentu. Namun, aturan tersebut belum tentu menjadi model yang baik untuk digunakan pada data baru.

**Penting:** angka di atas dihitung pada seluruh dataset yang sama, sehingga hanya merupakan ilustrasi eksplorasi. Angka tersebut bukan estimasi performa pada data yang belum pernah dilihat model. Untuk evaluasi yang lebih adil, gunakan pembagian training dan test yang tepat.

## 5. Membuat Visualisasi Perbandingan

Tabel silang membantu kita memahami angka, sedangkan diagram batang memudahkan kita membandingkan distribusi secara visual.

### Membuat Bar Plot

Jalankan kode berikut:

```python
import matplotlib.pyplot as plt
import pandas as pd

cross_tab = pd.crosstab(df["target"], df["sex"])

cross_tab.plot(
    kind="bar",
    figsize=(10, 6),
    color=["salmon", "lightblue"]
)

plt.title("Heart Disease Target by Sex")
plt.xlabel("Target (0 = No Disease, 1 = Disease)")
plt.ylabel("Number of Patients")

plt.legend(
    title="Sex",
    labels=["Female", "Male"]
)

plt.xticks(rotation=0)
plt.tight_layout()
plt.show()
```

![Plot](/img/python/64.webp)

### Penjelasan Kode

| Kode | Fungsi |
|---|---|
| `pd.crosstab()` | Membuat tabel silang antara target dan jenis kelamin |
| `kind="bar"` | Menghasilkan diagram batang |
| `figsize=(10, 6)` | Menentukan ukuran gambar dalam inci |
| `color` | Mengatur warna batang |
| `plt.title()` | Memberikan judul grafik |
| `plt.xlabel()` | Memberikan keterangan sumbu X |
| `plt.ylabel()` | Memberikan keterangan sumbu Y |
| `plt.legend()` | Menampilkan legenda untuk membedakan kelompok |
| `plt.xticks(rotation=0)` | Membuat label sumbu X tidak miring |
| `plt.tight_layout()` | Mengatur jarak elemen grafik agar tidak saling bertumpuk |
| `plt.show()` | Menampilkan grafik |

### Memahami Grafik

Grafik menampilkan dua kelompok batang berdasarkan nilai `target`:

- `target = 0` menunjukkan jumlah sampel tanpa indikasi penyakit jantung menurut label dataset.
- `target = 1` menunjukkan jumlah sampel dengan indikasi penyakit jantung menurut label dataset.

Warna batang membedakan perempuan dan laki-laki.

Grafik ini menggunakan **jumlah sampel**, bukan persentase. Karena jumlah sampel setiap kelompok berbeda, perbandingan persentase seperti pada bagian sebelumnya dapat memberikan sudut pandang tambahan.

## 6. Visualisasi dalam Bentuk Persentase

Untuk membandingkan proporsi target antarjenis kelamin, kita dapat menggunakan tabel persentase.

```python
sex_target_pct = (
    pd.crosstab(
        df["sex"],
        df["target"],
        normalize="index"
    ) * 100
)

sex_target_pct.plot(
    kind="bar",
    figsize=(10, 6),
    color=["salmon", "lightblue"]
)

plt.title("Heart Disease Target Distribution by Sex")
plt.xlabel("Sex (0 = Female, 1 = Male)")
plt.ylabel("Percentage (%)")

plt.legend(
    title="Target",
    labels=["No Disease", "Disease"]
)

plt.xticks(rotation=0)
plt.tight_layout()
plt.show()
```

Pada grafik ini, setiap kelompok jenis kelamin memiliki total persentase 100%.

Visualisasi persentase memudahkan kita membandingkan proporsi kelas target tanpa terlalu dipengaruhi oleh perbedaan jumlah sampel antarkelompok.

## 7. Hal yang Perlu Diperhatikan

EDA membantu kita menemukan pola, tetapi ada beberapa hal yang perlu diperhatikan:

- **Korelasi bukan sebab-akibat.** Perbedaan proporsi pada dataset tidak membuktikan bahwa suatu variabel menyebabkan penyakit.
- **Ukuran sampel berpengaruh.** Hasil dari dataset terbatas belum tentu mewakili populasi yang lebih luas.
- **Periksa definisi fitur.** Pastikan arti nilai `0` dan `1` sesuai dengan dokumentasi dataset.
- **Hindari kesimpulan berlebihan.** Gunakan temuan EDA sebagai dasar pertanyaan dan eksperimen berikutnya.
- **Evaluasi model secara benar.** Gunakan data uji yang tidak digunakan untuk melatih model ketika mengukur performa pada data yang belum pernah dilihat.

## Ringkasan

Pada materi ini, kita telah mempelajari cara membandingkan kolom `sex` dan `target` dalam dataset Heart Disease.

Poin penting yang telah dipelajari:

1. Menggunakan `pd.crosstab()` untuk menghitung kombinasi nilai dua kolom.
2. Menghitung proporsi kelas dengan `normalize="index"`.
3. Membandingkan jumlah sampel dan persentase setiap kelompok.
4. Membuat simple heuristic sebagai baseline awal.
5. Memvisualisasikan perbandingan menggunakan diagram batang.
6. Menafsirkan pola data secara hati-hati tanpa menganggapnya sebagai hubungan sebab-akibat.

Feature comparison merupakan bagian penting dari EDA karena membantu kita membangun intuisi tentang dataset sebelum mengembangkan model Machine Learning.
