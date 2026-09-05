---
slug: time-series-ml
title: "Deret Waktu (Time Series): Panduan Machine Learning untuk Pemula #12"
authors: topekox
tags: [manchine learning, data mining, ai, data science, python]
---

Anda sudah terbiasa dengan data tabel: tiap baris berdiri sendiri, urutannya tidak penting, dan pembagian data dilakukan secara acak.
 
Begitu masuk ke data deret waktu, hampir semua kebiasaan itu justru menjadi kesalahan.
 
Data penjualan harian, harga saham, jumlah pengunjung, dan suhu udara semuanya punya satu sifat khusus: **urutannya bermakna**. Nilai hari ini berkaitan dengan nilai kemarin. Mengabaikan hubungan itu menghasilkan model yang tampak sempurna di layar dan gagal total di dunia nyata.
 
Artikel ini membahas aturan main yang berbeda itu, dari pemeriksaan awal sampai tiga pendekatan pemodelan yang paling sering dipakai.

<!-- truncate -->

## Daftar Isi
 
1. Kenapa Deret Waktu Berbeda
2. Istilah Dasar yang Perlu Dipahami
3. Menyiapkan Data Contoh
4. Melihat Data Deret Waktu
5. Menangani Masalah Umum
6. Baseline yang Wajib Dibuat
7. Pendekatan Machine Learning dengan Lag Features
8. Validasi yang Menghormati Urutan Waktu
9. ARIMA
10. Prophet
11. Memilih Pendekatan yang Tepat
12. Kesalahan Pemula yang Sering Terjadi
## Kenapa Deret Waktu Berbeda
 
### Aturan yang Berubah
 
| Aspek | Data tabel biasa | Data deret waktu |
|---|---|---|
| Urutan baris | Tidak penting | Sangat penting |
| Pembagian data | Acak dengan `train_test_split` | Berdasarkan waktu |
| Validasi silang | `KFold` atau `StratifiedKFold` | `TimeSeriesSplit` |
| Antar baris | Dianggap saling bebas | Saling berkaitan erat |
| Fitur | Kolom yang sudah ada | Sering dibuat dari nilai masa lalu |
| Data uji | Bagian acak | Selalu periode paling akhir |
 
### Kesalahan Paling Fatal: Mengacak Data
 
Bayangkan Anda memprediksi harga saham. Anda mengacak data lalu membaginya 80-20 seperti biasa.
 
Akibatnya, model bisa belajar dari harga tanggal 10 dan tanggal 12, lalu diminta menebak tanggal 11. Karena harga saham berubah pelan, tebakannya akan hampir sempurna.
 
Skor Anda akan luar biasa. Tapi kemampuan itu tidak ada nilainya, karena saat memprediksi hari esok di dunia nyata, Anda tidak punya data lusa.
 
### Membuktikannya
 
```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
 
np.random.seed(42)
n = 500
nilai = 100 + np.cumsum(np.random.randn(n))       # bergerak pelan seperti harga
 
data = pd.DataFrame({"y": nilai})
data["y_kemarin"] = data["y"].shift(1)
data = data.dropna()
 
X = data[["y_kemarin"]]
y = data["y"]
 
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
 
# CARA SALAH: pembagian acak
Xa_tr, Xa_te, ya_tr, ya_te = train_test_split(X, y, test_size=0.2, random_state=42)
m1 = LinearRegression().fit(Xa_tr, ya_tr)
mae_acak = mean_absolute_error(ya_te, m1.predict(Xa_te))
 
# CARA BENAR: pembagian berdasarkan waktu
batas = int(len(X) * 0.8)
m2 = LinearRegression().fit(X[:batas], y[:batas])
mae_waktu = mean_absolute_error(y[batas:], m2.predict(X[batas:]))
 
print(f"MAE dengan pembagian acak  : {mae_acak:.4f}   <- menipu")
print(f"MAE dengan pembagian waktu : {mae_waktu:.4f}   <- jujur")
```
 
Pada contoh ini selisihnya mungkin belum dramatis, tapi pada data dengan pola musiman kuat atau tren yang berubah, selisihnya bisa berlipat-lipat.
 
Aturannya sederhana: **untuk data deret waktu, jangan pernah mengacak**.
 
## Istilah Dasar yang Perlu Dipahami
 
### Deret Waktu dan Frekuensi
 
**Deret waktu** adalah data yang tercatat berurutan dalam waktu, dengan jarak yang biasanya tetap.
 
**Frekuensi** adalah jarak antar pencatatan: per jam, harian, mingguan, bulanan, dan seterusnya.
 
### Empat Komponen Deret Waktu
 
Sebuah deret waktu biasanya bisa dipecah menjadi empat bagian.
 
**Tren** adalah arah jangka panjang. Naik, turun, atau datar. Contohnya penjualan yang terus tumbuh dari tahun ke tahun.
 
**Musiman (seasonality)** adalah pola yang berulang dengan periode tetap. Contohnya penjualan yang selalu naik tiap akhir pekan, atau tiap bulan Desember.
 
**Siklus** adalah naik-turun jangka panjang tanpa periode tetap. Contohnya siklus ekonomi. Ini sering diabaikan karena sulit dimodelkan.
 
**Noise** adalah sisa gangguan acak yang tidak bisa dijelaskan.
 
### Stasioner
 
Deret disebut **stasioner** kalau sifat statistiknya tidak berubah sepanjang waktu: rata-ratanya tetap, sebarannya tetap, dan tidak ada tren.
 
Ini penting karena beberapa model, terutama ARIMA, mensyaratkan data stasioner. Data dengan tren jelas tidak stasioner dan perlu diubah dulu.
 
### Autokorelasi
 
**Autokorelasi** adalah korelasi antara deret dengan dirinya sendiri di masa lalu.
 
Kalau nilai hari ini sangat berkaitan dengan nilai kemarin, autokorelasi pada jarak 1 tinggi. Kalau penjualan tiap Senin mirip dengan Senin sebelumnya, autokorelasi pada jarak 7 tinggi.
 
Inilah sifat yang dimanfaatkan hampir semua model deret waktu.
 
### Horizon Prediksi
 
**Horizon** adalah seberapa jauh ke depan Anda ingin memprediksi.
 
Memprediksi 1 hari ke depan jauh lebih mudah daripada 90 hari ke depan. Tentukan horizon sejak awal, karena ini mempengaruhi cara membangun fitur dan cara menguji model.
 
## Menyiapkan Data Contoh
 
Kita akan membuat data penjualan harian yang mengandung tren, pola mingguan, pola tahunan, dan gangguan acak. Karena kita tahu komponen aslinya, nanti bisa diperiksa apakah alat analisisnya berhasil menemukannya.
 
```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
 
np.random.seed(42)
 
tanggal = pd.date_range("2021-01-01", "2024-12-31", freq="D")
t = np.arange(len(tanggal))
 
tren = 200 + 0.08 * t                                    # naik perlahan
musim_tahunan = 30 * np.sin(2 * np.pi * t / 365.25)      # pola tahunan
musim_mingguan = 15 * np.sin(2 * np.pi * t / 7)          # pola mingguan
akhir_pekan = np.where(pd.Series(tanggal).dt.dayofweek >= 5, 25, 0)
noise = np.random.randn(len(tanggal)) * 10
 
df = pd.DataFrame({
    "tanggal": tanggal,
    "penjualan": (tren + musim_tahunan + musim_mingguan + akhir_pekan + noise).round(1),
})
 
# Menjadikan tanggal sebagai indeks, ini kebiasaan penting
df = df.set_index("tanggal").asfreq("D")
 
print(df.head())
print("Rentang waktu:", df.index.min(), "sampai", df.index.max())
print("Jumlah titik:", len(df))
```
 
### Kenapa Tanggal Dijadikan Indeks
 
Dengan tanggal sebagai indeks, pandas memberi banyak kemudahan.
 
```python
print(df.loc["2024-01"].head())          # ambil satu bulan
print(df.loc["2024-06":"2024-07"].head()) # ambil rentang
print(df.resample("ME").mean().head())    # ubah jadi rata-rata bulanan
```
 
Fungsi `asfreq("D")` memastikan frekuensinya harian dan tanggal yang bolong akan muncul sebagai baris kosong, bukan hilang diam-diam.
 
## Melihat Data Deret Waktu
 
### Grafik Garis Adalah Langkah Pertama
 
Untuk deret waktu, grafik garis wajib dibuat sebelum apa pun.
 
```python
fig, ax = plt.subplots(2, 1, figsize=(13, 7))
 
ax[0].plot(df.index, df["penjualan"], lw=0.8)
ax[0].set_title("Seluruh periode")
 
ax[1].plot(df.loc["2024-06":"2024-08"].index,
           df.loc["2024-06":"2024-08", "penjualan"], marker="o", ms=3)
ax[1].set_title("Zoom 3 bulan: pola mingguan jadi terlihat")
 
plt.tight_layout()
plt.show()
```
 
#### Kenapa Perlu Dua Skala
 
Grafik keseluruhan menunjukkan tren dan pola tahunan. Grafik yang diperbesar menunjukkan pola mingguan yang tidak terlihat pada grafik penuh.
 
Kebiasaan yang baik: selalu lihat data dalam beberapa skala waktu.
 
### Enam Hal yang Dicari
 
**Tren.** Apakah naik, turun, atau datar sepanjang waktu?
 
**Pola berulang.** Apakah ada bentuk yang muncul teratur?
 
**Perubahan pola.** Apakah ada titik di mana perilakunya berubah drastis? Ini bisa karena perubahan kebijakan, pandemi, atau perubahan cara pencatatan data.
 
**Lonjakan aneh.** Apakah ada nilai ekstrem? Selidiki apakah itu kejadian nyata atau kesalahan data.
 
**Periode kosong.** Apakah ada rentang waktu tanpa data?
 
**Perubahan sebaran.** Apakah goyangannya makin besar seiring waktu? Kalau ya, transformasi logaritma mungkin membantu.
 
### Memisahkan Komponen
 
```python
from statsmodels.tsa.seasonal import seasonal_decompose
 
hasil = seasonal_decompose(df["penjualan"], model="additive", period=7)
 
fig, ax = plt.subplots(4, 1, figsize=(13, 9), sharex=True)
hasil.observed.plot(ax=ax[0], title="Data asli", lw=0.8)
hasil.trend.plot(ax=ax[1], title="Tren", lw=1.2)
hasil.seasonal.plot(ax=ax[2], title="Pola musiman (mingguan)", lw=0.8)
hasil.resid.plot(ax=ax[3], title="Sisa (noise)", lw=0.5)
plt.tight_layout()
plt.show()
```
 
#### Cara Membacanya
 
**Grafik tren** memperlihatkan arah jangka panjang tanpa gangguan musiman.
 
**Grafik musiman** memperlihatkan pola berulang. Perhatikan bentuknya, ini yang akan dimanfaatkan model.
 
**Grafik sisa** seharusnya terlihat acak tanpa pola. Kalau masih ada pola jelas di sini, berarti ada komponen yang belum tertangkap.
 
#### Additive atau Multiplicative
 
Pakai `model="additive"` kalau besarnya goyangan musiman relatif tetap sepanjang waktu.
 
Pakai `model="multiplicative"` kalau goyangannya membesar seiring naiknya nilai. Ini umum pada data penjualan yang tumbuh pesat.
 
Alternatif untuk kasus kedua: transformasikan data dengan logaritma dulu, lalu pakai additive.
 
### Melihat Autokorelasi
 
```python
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
 
fig, ax = plt.subplots(1, 2, figsize=(14, 4))
plot_acf(df["penjualan"], lags=40, ax=ax[0])
ax[0].set_title("ACF: korelasi dengan masa lalu")
plot_pacf(df["penjualan"], lags=40, ax=ax[1], method="ywm")
ax[1].set_title("PACF: korelasi langsung")
plt.tight_layout()
plt.show()
```
 
#### Cara Membaca ACF
 
Sumbu mendatar adalah jarak ke belakang. Nilai 7 berarti "7 hari yang lalu".
 
Sumbu tegak adalah kekuatan korelasinya.
 
Area biru adalah batas keacakan. Batang yang melewati area biru berarti korelasinya nyata.
 
**Kalau ada puncak di jarak 7, 14, 21**, berarti ada pola mingguan.
 
**Kalau batangnya menurun perlahan tanpa cepat mendekati nol**, berarti ada tren dan datanya belum stasioner.
 
#### Kegunaan Praktisnya
 
ACF memberi tahu **lag mana yang layak dijadikan fitur**. Kalau puncaknya di 1, 7, dan 14, maka nilai 1 hari lalu, 7 hari lalu, dan 14 hari lalu adalah kandidat fitur yang baik.
 
Untuk pemula, ini kegunaan utama ACF. Pemakaian yang lebih teknis untuk memilih parameter ARIMA bisa dipelajari belakangan.
 
## Menangani Masalah Umum
 
### Tanggal yang Bolong
 
Ini masalah paling umum pada data nyata. Kalau tidak ada penjualan di suatu hari, barisnya sering tidak tercatat sama sekali.
 
```python
# Simulasi data bolong
df_bolong = df.drop(df.sample(50, random_state=1).index)
print("Jumlah baris:", len(df_bolong))
 
# Mengembalikan tanggal yang hilang sebagai baris kosong
df_lengkap = df_bolong.asfreq("D")
print("Setelah dilengkapi:", len(df_lengkap))
print("Sel kosong:", df_lengkap["penjualan"].isna().sum())
```
 
#### Kenapa Harus Dilengkapi
 
Karena kalau tidak, "kemarin" bisa saja sebenarnya seminggu lalu. Fitur lag Anda jadi salah tanpa peringatan apa pun.
 
### Mengisi Nilai Kosong
 
Untuk deret waktu, cara pengisiannya berbeda dari data tabel biasa.
 
```python
contoh = df_lengkap.copy()
 
contoh["maju"] = contoh["penjualan"].ffill()          # pakai nilai sebelumnya
contoh["interpolasi"] = contoh["penjualan"].interpolate(method="linear")
contoh["waktu"] = contoh["penjualan"].interpolate(method="time")
 
print(contoh[contoh["penjualan"].isna()].head())
```
 
**`ffill`** memakai nilai terakhir yang tersedia. Aman karena hanya melihat ke belakang.
 
**`interpolate`** membuat garis lurus antara titik sebelum dan sesudah. Lebih halus, tapi hati-hati: cara ini **melihat ke masa depan**.
 
#### Peringatan Penting
 
Interpolasi memakai nilai sesudahnya, sehingga tidak boleh dipakai kalau baris itu akan masuk data uji. Untuk data uji dan untuk penggunaan nyata, pakai `ffill` saja.
 
**Jangan pernah** mengisi nilai kosong deret waktu dengan rata-rata keseluruhan. Itu menghancurkan pola waktu dan memakai informasi dari seluruh periode termasuk masa depan.
 
### Mengubah Frekuensi
 
```python
harian = df["penjualan"]
mingguan = df["penjualan"].resample("W").sum()
bulanan = df["penjualan"].resample("ME").mean()
 
print("Harian  :", len(harian), "titik")
print("Mingguan:", len(mingguan), "titik")
print("Bulanan :", len(bulanan), "titik")
```
 
Meringkas ke frekuensi lebih besar mengurangi gangguan acak dan sering membuat pola lebih jelas. Tapi Anda kehilangan detail, jadi pilih sesuai kebutuhan prediksi.
 
## Baseline yang Wajib Dibuat
 
### Kenapa Ini Sangat Penting
 
Ini bagian yang paling sering dilewati padahal paling menentukan.
 
Untuk deret waktu, model sederhana sering mengalahkan model canggih. Kalau Anda tidak punya baseline, Anda tidak akan tahu bahwa model rumit Anda sebenarnya lebih buruk daripada menebak "besok sama seperti hari ini".
 
### Tiga Baseline Standar
 
```python
from sklearn.metrics import mean_absolute_error
 
batas = "2024-07-01"
latih = df.loc[:batas, "penjualan"]
uji = df.loc[batas:, "penjualan"]
 
# 1. Naive: besok sama seperti hari ini
naive = pd.Series(latih.iloc[-1], index=uji.index)
 
# 2. Seasonal naive: besok sama seperti hari yang sama minggu lalu
musiman_naive = df["penjualan"].shift(7).loc[uji.index]
 
# 3. Rata-rata bergerak 7 hari terakhir
rata_bergerak = pd.Series(latih.iloc[-7:].mean(), index=uji.index)
 
for nama, tebakan in [("Naive (nilai terakhir)", naive),
                      ("Seasonal naive (7 hari lalu)", musiman_naive),
                      ("Rata-rata 7 hari terakhir", rata_bergerak)]:
    print(f"{nama:32s} MAE = {mean_absolute_error(uji, tebakan):.3f}")
```
 
### Cara Memakainya
 
Catat angka baseline terbaik. Model apa pun yang Anda bangun harus mengalahkannya dengan selisih yang berarti.
 
Kalau model ARIMA rumit Anda hanya lebih baik 2 persen dari seasonal naive, pertimbangkan apakah kerumitannya sepadan dengan biaya pemeliharaan.
 
### Metrik untuk Deret Waktu
 
**MAE** paling mudah dijelaskan, satuannya sama dengan data.
 
**RMSE** menghukum kesalahan besar lebih berat.
 
**MAPE** dalam persentase, mudah dijelaskan ke non-teknis, tapi tidak bisa dipakai kalau ada nilai nol.
 
**MASE** membandingkan langsung dengan baseline naive. Nilai di bawah 1 berarti model Anda lebih baik daripada naive, di atas 1 berarti lebih buruk.
 
```python
def mase(sebenarnya, tebakan, data_latih, musim=1):
    galat_model = np.mean(np.abs(sebenarnya - tebakan))
    galat_naive = np.mean(np.abs(np.diff(data_latih, n=musim)))
    return galat_model / galat_naive
 
print("MASE seasonal naive:",
      round(mase(uji.values, musiman_naive.values, latih.values, musim=7), 4))
```
 
MASE sangat berguna karena langsung menjawab pertanyaan "apakah model saya berguna", tanpa perlu tahu satuan datanya.
 
## Pendekatan Machine Learning dengan Lag Features
 
### Idenya
 
Pendekatan ini mengubah masalah deret waktu menjadi masalah tabel biasa, sehingga Anda bisa memakai Random Forest, Gradient Boosting, dan semua yang sudah dikenal.
 
Caranya: buat kolom baru berisi nilai-nilai masa lalu.
 
### Lag Features
 
```python
def buat_lag(data, kolom, daftar_lag):
    hasil = data.copy()
    for lag in daftar_lag:
        hasil[f"lag_{lag}"] = hasil[kolom].shift(lag)
    return hasil
 
fitur = buat_lag(df, "penjualan", [1, 2, 3, 7, 14, 28])
print(fitur.head(10))
```
 
Perhatikan baris-baris awal berisi `NaN`. Itu wajar, karena untuk hari pertama tidak ada "kemarin".
 
#### Memilih Lag Mana
 
Lihat grafik ACF tadi. Lag dengan puncak tinggi adalah kandidat terbaik.
 
Patokan umum: lag 1 sampai 3 untuk hubungan jangka pendek, lag 7 dan kelipatannya untuk pola mingguan, lag 365 untuk pola tahunan kalau datanya cukup panjang.
 
### Rolling Features dan Jebakannya
 
Fitur ringkasan dari beberapa hari terakhir sering sangat berguna. Tapi di sinilah kesalahan paling umum terjadi.
 
```python
# SALAH: memasukkan nilai hari ini ke dalam perhitungan
fitur["rata7_salah"] = df["penjualan"].rolling(7).mean()
 
# BENAR: geser dulu, baru hitung
fitur["rata7_benar"] = df["penjualan"].shift(1).rolling(7).mean()
 
print(fitur[["penjualan", "rata7_salah", "rata7_benar"]].head(10))
```
 
#### Kenapa yang Pertama Salah
 
`rolling(7).mean()` menghitung rata-rata 7 hari **termasuk hari ini**. Padahal hari ini adalah nilai yang ingin diprediksi.
 
Model akan melihat sebagian jawabannya di dalam fitur, dan skornya jadi tinggi palsu.
 
**Aturannya:** selalu `shift(1)` sebelum `rolling`. Ini kesalahan yang bisa merusak seluruh proyek dan sulit terdeteksi.
 
### Fitur Kalender
 
```python
def buat_fitur_kalender(data):
    hasil = data.copy()
    idx = hasil.index
    hasil["hari_minggu"] = idx.dayofweek         # 0=Senin, 6=Minggu
    hasil["hari_bulan"] = idx.day
    hasil["bulan"] = idx.month
    hasil["minggu_tahun"] = idx.isocalendar().week.astype(int)
    hasil["akhir_pekan"] = (idx.dayofweek >= 5).astype(int)
 
    # Encoding siklis: agar Desember dan Januari dianggap berdekatan
    hasil["bulan_sin"] = np.sin(2 * np.pi * idx.month / 12)
    hasil["bulan_cos"] = np.cos(2 * np.pi * idx.month / 12)
    hasil["hari_sin"] = np.sin(2 * np.pi * idx.dayofweek / 7)
    hasil["hari_cos"] = np.cos(2 * np.pi * idx.dayofweek / 7)
    return hasil
 
fitur = buat_fitur_kalender(fitur)
```
 
#### Kenapa Perlu Sinus dan Kosinus
 
Kalau bulan dikodekan sebagai angka 1 sampai 12, model akan menganggap Desember (12) sangat jauh dari Januari (1). Padahal keduanya bertetangga.
 
Encoding siklis mengubah angka itu menjadi posisi pada lingkaran, sehingga Desember dan Januari menjadi berdekatan.
 
### Contoh Lengkap
 
```python
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.metrics import mean_absolute_error
 
# Susun semua fitur
data_model = buat_lag(df, "penjualan", [1, 2, 3, 7, 14, 28])
data_model["rata7"] = df["penjualan"].shift(1).rolling(7).mean()
data_model["rata28"] = df["penjualan"].shift(1).rolling(28).mean()
data_model["std7"] = df["penjualan"].shift(1).rolling(7).std()
data_model["min7"] = df["penjualan"].shift(1).rolling(7).min()
data_model["maks7"] = df["penjualan"].shift(1).rolling(7).max()
data_model = buat_fitur_kalender(data_model).dropna()
 
X = data_model.drop(columns="penjualan")
y = data_model["penjualan"]
 
# Pembagian berdasarkan waktu, BUKAN acak
batas = "2024-07-01"
X_latih, X_uji = X.loc[:batas], X.loc[batas:]
y_latih, y_uji = y.loc[:batas], y.loc[batas:]
 
print(f"Data latih: {len(X_latih)} hari ({X_latih.index.min().date()} - {X_latih.index.max().date()})")
print(f"Data uji  : {len(X_uji)} hari ({X_uji.index.min().date()} - {X_uji.index.max().date()})")
 
model = HistGradientBoostingRegressor(max_iter=400, learning_rate=0.05,
                                      random_state=42)
model.fit(X_latih, y_latih)
tebakan = model.predict(X_uji)
 
print(f"\nMAE model     : {mean_absolute_error(y_uji, tebakan):.3f}")
print(f"MAE baseline  : {mean_absolute_error(uji, musiman_naive):.3f}")
```
 
### Melihat Hasilnya
 
```python
plt.figure(figsize=(13, 4.5))
plt.plot(y_latih.index[-120:], y_latih.iloc[-120:], label="Data latih", lw=1)
plt.plot(y_uji.index, y_uji, label="Kenyataan", lw=1.5)
plt.plot(y_uji.index, tebakan, label="Prediksi", lw=1.5, ls="--")
plt.axvline(pd.Timestamp(batas), color="red", ls=":", label="Batas latih/uji")
plt.legend(); plt.title("Prediksi vs kenyataan")
plt.tight_layout()
plt.show()
```
 
### Kelebihan dan Kekurangan Pendekatan Ini
 
**Kelebihan:** bisa memakai banyak variabel tambahan seperti cuaca dan promosi, bisa menangkap hubungan tidak lurus, dan memakai alat yang sudah Anda kenal.
 
**Kekurangan:** butuh pembuatan fitur secara manual, dan rawan kebocoran kalau tidak hati-hati dengan `shift`.
 
## Validasi yang Menghormati Urutan Waktu
 
### Kenapa KFold Salah
 
`KFold` biasa membagi data secara acak, sehingga fold uji bisa berisi tanggal yang lebih awal daripada fold latih. Model belajar dari masa depan.
 
### TimeSeriesSplit
 
```python
from sklearn.model_selection import TimeSeriesSplit
 
tscv = TimeSeriesSplit(n_splits=5)
 
for i, (idx_latih, idx_uji) in enumerate(tscv.split(X), start=1):
    tgl_latih = X.index[idx_latih]
    tgl_uji = X.index[idx_uji]
    print(f"Fold {i}: latih {tgl_latih.min().date()} - {tgl_latih.max().date()} "
          f"({len(idx_latih):4d} hari) | uji {tgl_uji.min().date()} - {tgl_uji.max().date()}")
```
 
Perhatikan bahwa tanggal uji selalu **setelah** tanggal latih, dan data latih terus membesar tiap fold. Ini meniru situasi nyata di mana riwayat data terus bertambah.
 
### Menjalankan Validasi Silang
 
```python
from sklearn.model_selection import cross_val_score
 
skor = cross_val_score(model, X, y, cv=TimeSeriesSplit(n_splits=5),
                       scoring="neg_mean_absolute_error")
 
print("MAE tiap fold:", (-skor).round(3))
print(f"Rata-rata: {(-skor).mean():.3f} (naik-turun {skor.std():.3f})")
```
 
Kalau MAE fold pertama jauh lebih buruk daripada fold terakhir, itu wajar. Fold pertama punya data latih paling sedikit.
 
### Parameter gap
 
Kalau ada jeda antara saat prediksi dibuat dan saat hasilnya diketahui, sisipkan jeda dalam pembagian.
 
```python
tscv_jeda = TimeSeriesSplit(n_splits=5, gap=14)
```
 
Contohnya, kalau Anda memprediksi penjualan 2 minggu ke depan, data 2 minggu terakhir sebelum periode uji tidak boleh dipakai untuk melatih, karena di dunia nyata belum tersedia saat prediksi dibuat.
 
### Walk-Forward Validation
 
Ini cara paling realistis. Model dilatih ulang tiap periode, meniru bagaimana sistem akan dipakai sungguhan.
 
```python
def walk_forward(X, y, model, mulai_uji, langkah=30):
    hasil = []
    tanggal_uji = X.loc[mulai_uji:].index
 
    for awal in range(0, len(tanggal_uji), langkah):
        periode = tanggal_uji[awal:awal + langkah]
        batas_latih = periode[0] - pd.Timedelta(days=1)
 
        X_tr, y_tr = X.loc[:batas_latih], y.loc[:batas_latih]
        X_te, y_te = X.loc[periode], y.loc[periode]
 
        model.fit(X_tr, y_tr)
        mae = mean_absolute_error(y_te, model.predict(X_te))
        hasil.append({"mulai": periode[0].date(), "hari": len(periode),
                      "mae": round(mae, 3)})
 
    return pd.DataFrame(hasil)
 
print(walk_forward(X, y, HistGradientBoostingRegressor(max_iter=300, random_state=42),
                   "2024-04-01").to_string(index=False))
```
 
Kalau MAE meningkat terus dari periode ke periode, itu tanda pola datanya bergeser dan model perlu dilatih ulang secara berkala.
 
## ARIMA
 
### Idenya
 
ARIMA memprediksi masa depan **hanya dari riwayat deret itu sendiri**, tanpa variabel tambahan.
 
Namanya adalah singkatan dari tiga bagian:
 
**AR (AutoRegressive)** berarti memakai nilai-nilai sebelumnya. Parameter `p` menentukan berapa banyak nilai lalu yang dipakai.
 
**I (Integrated)** berarti melakukan pengurangan antar nilai berurutan untuk menghilangkan tren. Parameter `d` menentukan berapa kali.
 
**MA (Moving Average)** berarti memakai kesalahan prediksi sebelumnya. Parameter `q` menentukan berapa banyak.
 
Jadi `ARIMA(2, 1, 1)` berarti memakai 2 nilai lalu, 1 kali pengurangan, dan 1 kesalahan lalu.
 
### Stasioneritas dan Differencing
 
ARIMA butuh data stasioner, artinya tanpa tren.
 
**Differencing** adalah caranya: ganti tiap nilai dengan selisihnya terhadap nilai sebelumnya.
 
```python
from statsmodels.tsa.stattools import adfuller
 
def uji_stasioner(deret, nama=""):
    hasil = adfuller(deret.dropna())
    status = "STASIONER" if hasil[1] < 0.05 else "BELUM stasioner"
    print(f"{nama:20s} p-value = {hasil[1]:.4f}  -> {status}")
 
uji_stasioner(df["penjualan"], "Data asli")
uji_stasioner(df["penjualan"].diff(), "Setelah 1x diff")
uji_stasioner(df["penjualan"].diff().diff(), "Setelah 2x diff")
```
 
#### Cara Membaca Uji ADF
 
Hipotesis nolnya adalah "data belum stasioner". Kalau p-value di bawah 0,05, hipotesis itu ditolak dan data dianggap stasioner.
 
Nilai `d` yang dipakai adalah berapa kali differencing dibutuhkan sampai data menjadi stasioner. Biasanya 0, 1, atau paling banyak 2.
 
### Melihat Efek Differencing
 
```python
fig, ax = plt.subplots(2, 1, figsize=(13, 6), sharex=True)
df["penjualan"].plot(ax=ax[0], lw=0.8, title="Data asli (ada tren)")
df["penjualan"].diff().plot(ax=ax[1], lw=0.6, title="Setelah differencing (tren hilang)")
plt.tight_layout()
plt.show()
```
 
### SARIMA untuk Data Musiman
 
ARIMA biasa tidak menangani pola musiman. Untuk itu ada SARIMA, yang menambahkan empat parameter lagi untuk komponen musimannya.
 
Penulisannya `SARIMA(p,d,q)(P,D,Q,m)`, di mana `m` adalah panjang satu periode musim. Untuk data harian dengan pola mingguan, `m = 7`.
 
```python
from statsmodels.tsa.statespace.sarimax import SARIMAX
import warnings
warnings.filterwarnings("ignore")
 
# Pakai data mingguan agar lebih cepat dilatih
mingguan = df["penjualan"].resample("W").mean()
latih_m = mingguan[:-20]
uji_m = mingguan[-20:]
 
model_sarima = SARIMAX(
    latih_m,
    order=(1, 1, 1),              # p, d, q
    seasonal_order=(1, 1, 1, 52), # P, D, Q, m (52 minggu setahun)
    enforce_stationarity=False,
    enforce_invertibility=False,
)
hasil_sarima = model_sarima.fit(disp=False)
 
ramalan = hasil_sarima.forecast(steps=len(uji_m))
print(f"MAE SARIMA: {mean_absolute_error(uji_m, ramalan):.3f}")
 
plt.figure(figsize=(13, 4))
plt.plot(latih_m.index[-60:], latih_m.iloc[-60:], label="Latih")
plt.plot(uji_m.index, uji_m, label="Kenyataan")
plt.plot(uji_m.index, ramalan, label="Prediksi SARIMA", ls="--")
plt.legend(); plt.tight_layout(); plt.show()
```
 
### Mencari Parameter Secara Otomatis
 
Memilih `p`, `d`, `q` secara manual dari grafik ACF dan PACF butuh latihan. Untuk pemula, ada cara otomatis.
 
```python
# pip install pmdarima
from pmdarima import auto_arima
 
model_otomatis = auto_arima(
    latih_m,
    seasonal=True, m=52,
    stepwise=True,          # pencarian yang lebih cepat
    suppress_warnings=True,
    trace=False,
)
print(model_otomatis.summary().tables[0])
```
 
Alternatif tanpa pustaka tambahan: coba beberapa kombinasi dan pilih yang nilai AIC-nya terkecil.
 
### Kapan ARIMA Cocok dan Tidak
 
**Cocok** untuk deret tunggal dengan pola yang cukup stabil, data yang tidak terlalu panjang, dan saat Anda butuh rentang ketidakpastian prediksi.
 
**Kurang cocok** kalau Anda punya banyak variabel penjelas, kalau hubungannya sangat tidak lurus, atau kalau perlu memprediksi ribuan deret sekaligus.
 
## Prophet
 
### Apa Itu Prophet
 
Prophet adalah pustaka buatan Meta yang dirancang supaya orang non-ahli bisa membuat ramalan yang layak tanpa memahami teori deret waktu.
 
Idenya: pecah deret menjadi tren, pola musiman, dan efek hari libur, lalu modelkan masing-masing.
 
### Kelebihannya
 
**Mudah dipakai.** Hanya butuh dua kolom dan tiga baris kode.
 
**Menangani beberapa pola musiman sekaligus.** Harian, mingguan, dan tahunan bisa ditangani bersamaan.
 
**Tahan terhadap data bolong dan outlier.** Tidak perlu banyak pembersihan.
 
**Bisa memasukkan hari libur.** Penting untuk data penjualan di Indonesia dengan Lebaran, Natal, dan libur nasional.
 
**Otomatis mendeteksi perubahan tren.**
 
### Contoh Kode
 
```python
# pip install prophet
from prophet import Prophet
 
# Prophet mensyaratkan nama kolom persis 'ds' dan 'y'
data_prophet = df.reset_index().rename(columns={"tanggal": "ds", "penjualan": "y"})
 
latih_p = data_prophet[data_prophet["ds"] < "2024-07-01"]
uji_p = data_prophet[data_prophet["ds"] >= "2024-07-01"]
 
m = Prophet(
    yearly_seasonality=True,
    weekly_seasonality=True,
    daily_seasonality=False,
    changepoint_prior_scale=0.05,      # seberapa lentur trennya
)
m.fit(latih_p)
 
masa_depan = m.make_future_dataframe(periods=len(uji_p))
ramalan = m.predict(masa_depan)
 
tebakan_p = ramalan.tail(len(uji_p))["yhat"].values
print(f"MAE Prophet: {mean_absolute_error(uji_p['y'], tebakan_p):.3f}")
```
 
### Melihat Hasil dan Komponennya
 
```python
fig1 = m.plot(ramalan)
plt.title("Ramalan Prophet dengan rentang ketidakpastian")
plt.show()
 
fig2 = m.plot_components(ramalan)
plt.show()
```
 
Grafik komponen memisahkan tren, pola mingguan, dan pola tahunan dalam gambar terpisah. Ini sangat berguna untuk menjelaskan hasil ke orang non-teknis.
 
### Menambahkan Hari Libur
 
```python
libur = pd.DataFrame({
    "holiday": "lebaran",
    "ds": pd.to_datetime(["2021-05-13", "2022-05-02", "2023-04-22", "2024-04-10"]),
    "lower_window": -3,      # 3 hari sebelum juga terpengaruh
    "upper_window": 3,       # 3 hari sesudah juga terpengaruh
})
 
m2 = Prophet(holidays=libur, yearly_seasonality=True, weekly_seasonality=True)
m2.fit(latih_p)
```
 
Ini salah satu keunggulan terbesar Prophet untuk konteks Indonesia, karena efek Lebaran biasanya sangat besar dan tanggalnya berpindah tiap tahun.
 
### Parameter yang Perlu Diketahui
 
`changepoint_prior_scale` mengatur seberapa lentur trennya. Nilai lebih besar membuat tren lebih mudah berbelok, tapi berisiko mengikuti gangguan acak.
 
`seasonality_mode` bisa diisi `"additive"` atau `"multiplicative"`. Pakai yang kedua kalau goyangan musiman membesar seiring naiknya nilai.
 
### Kapan Prophet Cocok dan Tidak
 
**Cocok** untuk data bisnis dengan pola musiman kuat, saat butuh hasil cepat tanpa banyak penyetelan, dan saat efek hari libur penting.
 
**Kurang cocok** untuk data frekuensi sangat tinggi seperti per detik, untuk deret pendek di bawah beberapa ratus titik, atau kalau Anda butuh akurasi maksimal. Pada kompetisi peramalan, Prophet sering kalah dari gradient boosting dengan fitur yang dirancang baik.
 
## Memilih Pendekatan yang Tepat
 
### Perbandingan Ketiganya
 
| Aspek | Baseline naive | ARIMA/SARIMA | Prophet | ML + lag features |
|---|---|---|---|---|
| Kesulitan | Sangat mudah | Sedang sampai sulit | Mudah | Sedang |
| Butuh penyetelan | Tidak | Ya, cukup banyak | Sedikit | Sedang |
| Variabel tambahan | Tidak bisa | Terbatas | Bisa | Sangat bisa |
| Banyak deret sekaligus | Bisa | Lambat | Lambat | Bisa, satu model |
| Rentang ketidakpastian | Tidak | Ya | Ya | Perlu usaha tambahan |
| Mudah dijelaskan | Sangat | Sedang | Ya, ada grafik komponen | Sedang |
| Data pendek | Bisa | Bisa | Kurang cocok | Kurang cocok |
 
### Urutan yang Disarankan untuk Pemula
 
**Langkah 1.** Gambar datanya, lakukan dekomposisi, lihat ACF.
 
**Langkah 2.** Buat baseline naive dan seasonal naive. Catat angkanya.
 
**Langkah 3.** Coba Prophet. Cepat dan sering sudah cukup baik.
 
**Langkah 4.** Coba pendekatan lag features dengan gradient boosting.
 
**Langkah 5.** Coba SARIMA kalau datanya satu deret dan polanya stabil.
 
**Langkah 6.** Bandingkan semuanya dengan walk-forward validation, dan pilih yang mengalahkan baseline dengan selisih berarti.
 
### Memprediksi Beberapa Langkah ke Depan
 
Ada dua strategi.
 
**Rekursif.** Prediksi hari ke-1, lalu pakai hasilnya sebagai fitur untuk memprediksi hari ke-2, dan seterusnya. Sederhana, tapi kesalahannya menumpuk.
 
**Langsung.** Latih model terpisah untuk tiap horizon: satu model untuk 1 hari ke depan, satu lagi untuk 7 hari ke depan. Lebih akurat tapi lebih mahal.
 
```python
# Contoh pendekatan langsung untuk horizon 7 hari
data_h7 = buat_lag(df, "penjualan", [1, 2, 3, 7, 14])
data_h7["target_7hari"] = df["penjualan"].shift(-7)     # geser ke belakang
data_h7 = data_h7.dropna()
 
X_h7 = data_h7.drop(columns=["penjualan", "target_7hari"])
y_h7 = data_h7["target_7hari"]
```
 
ARIMA dan Prophet menangani prediksi banyak langkah secara otomatis, yang merupakan salah satu keunggulan keduanya.
 
## Kesalahan Pemula yang Sering Terjadi
 
### Mengacak Data
 
Kesalahan paling fatal dan paling sering. Skor akan bagus palsu, dan Anda baru sadar setelah model dipakai di dunia nyata.
 
### Lupa Mengurutkan Data Berdasarkan Tanggal
 
`TimeSeriesSplit` hanya membagi berdasarkan nomor baris. Kalau baris belum terurut, strategi ini tidak melakukan apa pun yang berguna, tanpa peringatan.
 
### Rolling Tanpa Shift Dulu
 
`rolling(7).mean()` memasukkan nilai hari ini ke dalam fitur. Selalu `shift(1)` lebih dulu.
 
### Tidak Membuat Baseline
 
Banyak model canggih ternyata kalah dari "besok sama seperti minggu lalu". Tanpa baseline, Anda tidak akan tahu.
 
### Mengisi Nilai Kosong dengan Rata-rata Keseluruhan
 
Ini menghancurkan pola waktu dan memakai informasi dari seluruh periode termasuk masa depan. Pakai `ffill` atau interpolasi yang sesuai.
 
### Mengabaikan Tanggal yang Hilang
 
Kalau baris tanggal tidak lengkap, "kemarin" bisa saja sebenarnya seminggu lalu. Selalu pakai `asfreq()` untuk memastikan.
 
### Menguji dengan Horizon yang Salah
 
Kalau Anda menguji model dengan prediksi 1 hari ke depan tapi akan memakainya untuk 30 hari ke depan, angka pengujian Anda tidak berlaku. Uji dengan horizon yang sama seperti penggunaan nyatanya.
 
### Memakai MAPE pada Data yang Mengandung Nol
 
MAPE membagi dengan nilai sebenarnya, sehingga menjadi tak hingga kalau ada nilai nol. Pakai MAE atau MASE.
 
### Menganggap Pola Selalu Tetap
 
Perilaku data bisa berubah karena pandemi, perubahan kebijakan, atau perubahan cara pencatatan. Selalu periksa apakah performa model menurun seiring waktu, dan siapkan jadwal pelatihan ulang.
 
### Terlalu Percaya pada Prediksi Jangka Panjang
 
Ketidakpastian tumbuh cepat seiring jauhnya horizon. Prediksi 90 hari ke depan jauh lebih tidak pasti daripada 7 hari, dan sebaiknya selalu disertai rentang ketidakpastian.
 
## Penutup
 
Deret waktu menuntut disiplin yang berbeda dari data tabel biasa. Sebagian besar kesalahan berasal dari memperlakukan waktu seolah tidak penting, padahal justru itulah yang menjadi inti masalahnya.
 
Tiga hal untuk diingat:
 
**Pertama**, urutan waktu tidak boleh dilanggar di mana pun. Pembagian data, validasi, dan pembuatan fitur semuanya harus memastikan bahwa model tidak pernah melihat masa depan.
 
**Kedua**, selalu buat baseline naive lebih dulu. Model sederhana sering mengalahkan model canggih pada deret waktu, dan tanpa pembanding Anda tidak akan menyadarinya.
 
**Ketiga**, `shift(1)` sebelum `rolling` adalah aturan kecil yang menyelamatkan seluruh proyek. Kesalahan ini tidak menghasilkan error apa pun, hanya skor yang terlalu bagus untuk dipercaya.
 