---
sidebar_position: 8
title: "Manipulasi DataFrame: Shuffling, Reset Index & Apply"
---

Dalam proses analisis data dan Machine Learning, kita sering perlu melakukan manipulasi terhadap DataFrame.

Beberapa manipulasi yang umum dilakukan antara lain:

- Mengacak urutan baris data.
- Mengatur ulang index setelah data diacak.
- Menerapkan fungsi tertentu ke setiap nilai dalam sebuah kolom.
- Mengubah format atau satuan data.

Pada materi ini kita akan mempelajari tiga fungsi Pandas yang penting:

- `.sample()`
- `.reset_index()`
- `.apply()`

Kita juga akan mengenal penggunaan `lambda` untuk membuat fungsi sederhana.

---

## 1. Mengacak Urutan Data dengan `.sample()`

Method `.sample()` digunakan untuk mengambil sampel data secara acak dari DataFrame.

Salah satu penggunaannya adalah untuk melakukan **shuffling**, yaitu mengacak urutan baris dalam dataset.

Sintaks dasar:

```python
df_shuffled = df.sample(frac=1)
```

Parameter `frac` menentukan berapa bagian data yang ingin diambil.

### Parameter `frac`

Beberapa contoh nilai `frac`:

| Nilai | Arti |
|---|---|
| `0.1` | Mengambil 10% data |
| `0.2` | Mengambil 20% data |
| `0.5` | Mengambil 50% data |
| `1` | Mengambil 100% data |

Jika ingin mengacak seluruh DataFrame:

```python
car_sales_shuffled = car_sales.sample(frac=1)
```

Semua baris tetap ada, tetapi urutannya menjadi acak.

### Mengambil Sebagian Data

`.sample()` juga dapat digunakan untuk mengambil sebagian data.

Contoh:

```python
car_sales_sample = car_sales.sample(frac=0.2)
```

Kode tersebut mengambil sekitar 20% dari seluruh data secara acak.

Ini dapat berguna ketika kita ingin melakukan eksperimen menggunakan dataset yang lebih kecil.

---

## 2. Mengapa Data Perlu Diacak?

Pengacakan data dapat menjadi bagian penting dalam Machine Learning.

Bayangkan sebuah dataset memiliki pola seperti:

```text
Baris 1-100   → Mobil Toyota
Baris 101-200 → Mobil Honda
Baris 201-300 → Mobil BMW
```

Jika dataset digunakan dalam kondisi tersebut tanpa memperhatikan urutan datanya, pembagian data untuk proses Machine Learning berpotensi menghasilkan distribusi yang kurang representatif.

Dengan melakukan shuffling:

```python
car_sales_shuffled = car_sales.sample(frac=1)
```

data dapat memiliki urutan yang lebih acak.

Secara sederhana:

```text
Data asli
    ↓
Toyota → Toyota → Honda → Honda → BMW → BMW
    ↓
Shuffle
    ↓
Honda → BMW → Toyota → Honda → BMW → Toyota
```

Namun, perlu diperhatikan bahwa **tidak semua dataset boleh diacak sembarangan**.

Contohnya adalah data yang memiliki hubungan berdasarkan waktu seperti:

- data saham,
- data sensor,
- data transaksi berdasarkan waktu,
- data cuaca,
- data time series.

Untuk data seperti ini, urutan waktu dapat memiliki arti penting sehingga strategi pembagian data harus mempertahankan urutan temporal.

---

## 3. Mengontrol Hasil Pengacakan dengan `random_state`

Karena `.sample()` melakukan pengacakan, hasilnya dapat berbeda setiap kali kode dijalankan.

Contoh:

```python
car_sales_shuffled = car_sales.sample(frac=1)
```

Jika dijalankan kembali, urutan data dapat berubah lagi.

Untuk eksperimen Machine Learning, kita sering ingin mendapatkan hasil pengacakan yang sama agar eksperimen dapat direproduksi.

Kita dapat menggunakan `random_state`:

```python
car_sales_shuffled = car_sales.sample(
    frac=1,
    random_state=42
)
```

Dengan `random_state` yang sama, proses pengacakan akan menghasilkan urutan yang konsisten.

Angka `42` bukan angka khusus. Kita dapat menggunakan angka lain, misalnya:

```python
random_state=10
```

atau:

```python
random_state=123
```

Yang penting adalah menggunakan nilai yang konsisten ketika ingin mereproduksi eksperimen.

---

## 4. Mengatur Ulang Index dengan `.reset_index()`

Setelah melakukan shuffling, index DataFrame biasanya ikut berpindah bersama barisnya.

Misalnya sebelum diacak:

```text
index    Make
0        toyota
1        honda
2        bmw
3        ford
```

Setelah diacak, bisa menjadi:

```text
index    Make
2        bmw
0        toyota
3        ford
1        honda
```

Urutan baris sudah berubah, tetapi index lama tetap dibawa.

Jika kita ingin membuat index baru dari `0, 1, 2, 3, ...`, gunakan:

```python
car_sales_shuffled = car_sales_shuffled.reset_index(drop=True)
```

Hasilnya:

```text
index    Make
0        bmw
1        toyota
2        ford
3        honda
```

---

## 5. Parameter `drop=True`

Secara default, `.reset_index()` akan mempertahankan index lama sebagai kolom baru.

Contoh:

```python
car_sales_shuffled = car_sales_shuffled.reset_index()
```

Hasilnya dapat menjadi:

```text
index    Make
2        bmw
0        toyota
3        ford
1        honda
```

Index lama akan dipindahkan menjadi kolom.

Jika kita tidak membutuhkan index lama, gunakan:

```python
car_sales_shuffled = car_sales_shuffled.reset_index(drop=True)
```

Parameter:

```text
drop=True
```

berarti index lama tidak disimpan sebagai kolom.

---

## 6. Menggunakan `inplace=True`

Alternatif lainnya adalah mengubah DataFrame secara langsung:

```python
car_sales_shuffled.reset_index(
    drop=True,
    inplace=True
)
```

Dengan cara ini, kita tidak perlu melakukan assignment kembali.

Namun, dalam kode pembelajaran dan pengembangan pipeline data, assignment seperti:

```python
car_sales_shuffled = car_sales_shuffled.reset_index(drop=True)
```

sering lebih mudah dibaca karena hasil operasi terlihat jelas disimpan kembali.

---

## 7. Kombinasi `.sample()` dan `.reset_index()`

Kedua method ini sering digunakan secara berurutan.

Contoh:

```python
car_sales_shuffled = car_sales.sample(
    frac=1,
    random_state=42
)

car_sales_shuffled = car_sales_shuffled.reset_index(drop=True)
```

Atau dapat ditulis lebih ringkas:

```python
car_sales_shuffled = car_sales.sample(
    frac=1,
    random_state=42
).reset_index(drop=True)
```

Alurnya:

```text
DataFrame
    ↓
.sample(frac=1)
    ↓
Baris diacak
    ↓
.reset_index(drop=True)
    ↓
Index dibuat kembali
```

Ini merupakan pola yang cukup umum dalam pengolahan dataset.

---

## 8. Menerapkan Fungsi dengan `.apply()`

Method `.apply()` digunakan untuk menerapkan sebuah fungsi pada data.

Misalnya kita memiliki kolom:

```text
Odometer (KM)
```

dan ingin mengubah nilai dari kilometer menjadi miles.

Rumus sederhananya:

```text
Miles = Kilometer / 1.6
```

Kita dapat menggunakan `.apply()`:

```python
car_sales["Odometer (KM)"] = car_sales["Odometer (KM)"].apply(
    lambda x: x / 1.6
)
```

Pandas akan menerapkan operasi tersebut pada setiap nilai dalam kolom.

Misalnya:

```text
160 km → 100 miles
320 km → 200 miles
800 km → 500 miles
```

---

## 9. Memahami `lambda`

Pada contoh sebelumnya terdapat:

```python
lambda x: x / 1.6
```

`lambda` digunakan untuk membuat fungsi sederhana secara singkat.

Contoh fungsi biasa:

```python
def kilometer_to_miles(x):
    return x / 1.6
```

Fungsi tersebut dapat digunakan dengan `.apply()`:

```python
car_sales["Odometer (KM)"] = car_sales["Odometer (KM)"].apply(
    kilometer_to_miles
)
```

Dengan `lambda`, fungsi tersebut dapat ditulis lebih singkat:

```python
car_sales["Odometer (KM)"] = car_sales["Odometer (KM)"].apply(
    lambda x: x / 1.6
)
```

Keduanya melakukan operasi yang sama.

---

## 10. Cara Kerja `.apply()` dan `lambda`

Perhatikan kode:

```python
car_sales["Odometer (KM)"].apply(
    lambda x: x / 1.6
)
```

Kita dapat membacanya seperti:

```text
Ambil setiap nilai pada Odometer
        ↓
Masukkan nilai tersebut ke x
        ↓
Hitung x / 1.6
        ↓
Simpan hasilnya sebagai nilai baru
```

Misalnya terdapat data:

```text
Odometer (KM)
160
320
800
```

Maka:

```text
160 / 1.6 = 100
320 / 1.6 = 200
800 / 1.6 = 500
```

---

## 11. Contoh `.apply()` Lainnya

`.apply()` tidak hanya dapat digunakan untuk konversi satuan.

Misalnya kita ingin mengubah nilai menjadi huruf kecil:

```python
car_sales["Make"] = car_sales["Make"].apply(
    lambda x: x.lower()
)
```

Atau membuat kondisi sederhana:

```python
car_sales["High mileage"] = car_sales["Odometer (KM)"].apply(
    lambda x: x > 100000
)
```

Hasilnya dapat berupa:

```text
Odometer (KM)    High mileage
50000            False
120000           True
80000            False
150000           True
```

Dengan demikian, `.apply()` dapat digunakan untuk membuat transformasi berdasarkan aturan tertentu.

---

## 12. `.apply()` vs Operasi Vectorized Pandas

Meskipun `.apply()` sangat fleksibel, tidak selalu menjadi pilihan pertama.

Untuk operasi sederhana yang sudah didukung langsung oleh Pandas, operasi vectorized biasanya lebih sederhana dan dapat lebih efisien.

Contohnya, untuk mengubah kilometer menjadi miles, kita dapat langsung melakukan:

```python
car_sales["Odometer (Miles)"] = car_sales["Odometer (KM)"] / 1.6
```

Tidak perlu menggunakan:

```python
car_sales["Odometer (Miles)"] = car_sales["Odometer (KM)"].apply(
    lambda x: x / 1.6
)
```

Keduanya dapat menghasilkan hasil yang sama.

Secara umum:

```text
Operasi sederhana
    ↓
Gunakan operasi Pandas langsung jika memungkinkan

Operasi khusus/aturan tertentu
    ↓
Gunakan .apply()
```

Ini merupakan kebiasaan yang baik ketika bekerja dengan Pandas.

---

## 13. Contoh Lengkap

Berikut contoh workflow sederhana yang menggabungkan `.sample()`, `.reset_index()`, dan `.apply()`.

```python
import pandas as pd

car_sales = pd.DataFrame({
    "Make": ["toyota", "honda", "bmw", "ford"],
    "Odometer (KM)": [150000, 120000, 90000, 80000],
    "Price": [12000, 15000, 25000, 18000]
})

# Mengacak seluruh data
car_sales_shuffled = car_sales.sample(
    frac=1,
    random_state=42
)

# Mengatur ulang index
car_sales_shuffled = car_sales_shuffled.reset_index(drop=True)

# Mengubah kilometer menjadi miles
car_sales_shuffled["Odometer (Miles)"] = (
    car_sales_shuffled["Odometer (KM)"] / 1.6
)

print(car_sales_shuffled)
```

Perhatikan bahwa pada contoh terakhir kita tidak menggunakan `.apply()` karena pembagian langsung merupakan operasi vectorized yang lebih sederhana.

Jika ingin memahami `.apply()`, kita juga dapat menulis:

```python
car_sales_shuffled["Odometer (Miles)"] = (
    car_sales_shuffled["Odometer (KM)"].apply(
        lambda x: x / 1.6
    )
)
```

Kedua pendekatan tersebut dapat menghasilkan nilai yang sama.

---

## 14. `.sample()` untuk Eksperimen Dataset Besar

Ketika bekerja dengan dataset yang sangat besar, kita mungkin tidak selalu perlu menggunakan seluruh data pada tahap eksperimen awal.

Misalnya dataset memiliki jutaan baris.

Kita dapat mengambil sebagian data:

```python
car_sales_sample = car_sales.sample(
    frac=0.01,
    random_state=42
)
```

Dengan `frac=0.01`, kita mengambil sekitar 1% data.

Hal ini dapat membantu ketika:

- menguji kode,
- mencari kesalahan,
- mencoba transformasi,
- melakukan eksplorasi awal,
- menguji pipeline sebelum dijalankan pada seluruh dataset.

Setelah kode berjalan dengan benar, kita dapat menjalankannya pada dataset yang lebih besar.

---

## 15. Hal yang Perlu Diperhatikan

### 15.1 Jangan Selalu Mengacak Data Time Series

Data yang memiliki hubungan waktu membutuhkan perhatian khusus.

Contohnya:

```text
Tanggal 1
Tanggal 2
Tanggal 3
Tanggal 4
...
```

Mengacak data dapat menghilangkan struktur temporal yang penting.

Untuk Machine Learning berbasis time series, pembagian training dan testing biasanya perlu mempertahankan urutan waktu.

### 15.2 Gunakan `random_state` untuk Reproducibility

Saat melakukan eksperimen, gunakan `random_state` agar hasil pengacakan dapat direproduksi.

Contoh:

```python
df.sample(frac=1, random_state=42)
```

### 15.3 Periksa Data Sebelum dan Sesudah Manipulasi

Biasakan memeriksa DataFrame:

```python
car_sales.head()
```

Kemudian setelah manipulasi:

```python
car_sales_shuffled.head()
```

Kita juga dapat memeriksa informasi DataFrame:

```python
car_sales_shuffled.info()
```

Dengan demikian, kita dapat memastikan bahwa perubahan benar-benar sesuai dengan yang diharapkan.

---

## 16. Ringkasan Method yang Dipelajari

| Method | Kegunaan |
|---|---|
| `.sample()` | Mengambil sampel data secara acak |
| `.sample(frac=1)` | Mengacak seluruh baris DataFrame |
| `.sample(frac=0.2)` | Mengambil sekitar 20% data |
| `.reset_index()` | Membuat kembali index DataFrame |
| `.reset_index(drop=True)` | Membuat index baru tanpa menyimpan index lama |
| `.apply()` | Menerapkan fungsi pada data |
| `lambda` | Membuat fungsi sederhana secara singkat |

---

## 17. Workflow Manipulasi Data

Secara umum, proses yang dipelajari dapat digambarkan sebagai berikut:

```text
DataFrame
    ↓
Periksa data
    ↓
Shuffle jika diperlukan
    ↓
Reset index
    ↓
Transformasi data
    ↓
Periksa kembali hasil
    ↓
Gunakan untuk analisis / Machine Learning
```

Tidak semua dataset membutuhkan seluruh tahapan tersebut.

Kita harus memilih operasi berdasarkan karakteristik dan tujuan penggunaan data.

---

## Checklist

Sebelum melanjutkan ke materi berikutnya, pastikan Anda sudah memahami:

- [ ] Apa fungsi `.sample()`.
- [ ] Cara mengacak seluruh DataFrame menggunakan `frac=1`.
- [ ] Cara mengambil sebagian data menggunakan `frac`.
- [ ] Mengapa `random_state` penting untuk reproducibility.
- [ ] Cara menggunakan `.reset_index()`.
- [ ] Perbedaan `reset_index()` dan `reset_index(drop=True)`.
- [ ] Cara menggunakan `.apply()`.
- [ ] Apa fungsi `lambda`.
- [ ] Cara menerapkan fungsi pada setiap nilai kolom.
- [ ] Perbedaan operasi vectorized dengan `.apply()`.
- [ ] Mengapa data time series tidak boleh diacak sembarangan.
- [ ] Pentingnya memeriksa data sebelum dan sesudah manipulasi.
