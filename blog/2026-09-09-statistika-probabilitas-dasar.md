---
slug: statistika-probabilitas-dasar
title: "Statistika dan Probabilitas Dasar untuk Machine Learning: Panduan Machine Learning untuk Pemula #8"
authors: topekox
tags: [manchine learning, data mining, ai, data science, python]
---

Machine learning berdiri di atas statistika. Anda bisa menjalankan `model.fit()` tanpa memahami satu pun rumus statistik, tapi Anda tidak akan bisa menjawab pertanyaan-pertanyaan yang muncul setelahnya.
 
Apakah selisih skor 0,03 antara dua model itu nyata atau cuma keacakan? Kenapa median lebih baik daripada rata-rata untuk mengisi sel kosong? Kalau model bilang seseorang punya risiko tinggi, seberapa besar sebenarnya peluangnya? Semua itu pertanyaan statistik.
 
Artikel ini membahas dasar-dasar yang benar-benar terpakai. Tidak ada bukti matematis, tidak ada turunan rumus. Fokusnya pada memahami maksudnya dan tahu kapan konsep itu berlaku.

<!-- truncate -->

## Daftar Isi
 
1. Kenapa Statistika Penting untuk Praktisi Machine Learning
2. Menggambarkan Data dengan Angka
3. Distribusi: Bentuk Sebaran Data
4. Sampling: Mengambil Kesimpulan dari Sebagian Data
5. Korelasi dan Kausalitas
6. Uji Hipotesis
7. Teorema Bayes
8. Menghubungkan Semuanya ke Keputusan Sehari-hari
9. Kesalahan Pemula yang Sering Terjadi
## Kenapa Statistika Penting untuk Praktisi Machine Learning
 
### Keputusan yang Jadi Menebak Tanpa Statistika
 
Berikut situasi nyata yang akan Anda hadapi, dan konsep statistik yang menjawabnya.
 
| Situasi | Konsep yang dibutuhkan |
|---|---|
| Model A skornya 0,84, model B 0,86. Pilih yang mana? | Uji hipotesis dan standar deviasi |
| Sel kosong diisi rata-rata atau median? | Distribusi dan kemiringan data |
| Fitur ini berkorelasi dengan target, apakah berarti penting? | Korelasi dan kausalitas |
| Model bilang risiko tinggi, seberapa yakin harus bertindak? | Teorema Bayes dan base rate |
| Data 500 baris apakah cukup? | Sampling dan standard error |
| Hasil A/B test naik 2 persen, apakah nyata? | Uji hipotesis |
| Kenapa skor validasi silang naik-turun antar fold? | Variabilitas sampling |
 
Tanpa dasar ini, semua keputusan di atas dijawab dengan perasaan.
 
### Yang Perlu dan Tidak Perlu Dipelajari
 
**Perlu:** memahami arti sebuah angka, tahu kapan sebuah asumsi berlaku, dan bisa mengenali kesimpulan yang keliru.
 
**Tidak perlu:** menghafal rumus, membuktikan teorema, atau menghitung manual. Komputer yang menghitung, Anda yang menafsirkan.
 
## Menggambarkan Data dengan Angka
 
### Tiga Cara Menyebut "Nilai Tengah"
 
**Rata-rata (mean)** adalah jumlah semua nilai dibagi banyaknya.
 
**Median** adalah nilai yang persis di tengah setelah data diurutkan. Separuh data di bawahnya, separuh di atasnya.
 
**Modus** adalah nilai yang paling sering muncul.
 
### Kapan Rata-rata Menipu
 
Ini konsep yang langsung terpakai saat mengisi sel kosong.
 
Bayangkan gaji sepuluh orang di sebuah kantor kecil: sembilan orang bergaji sekitar 8 juta, satu orang direktur bergaji 500 juta.
 
```python
import numpy as np
import pandas as pd
 
gaji = np.array([7, 8, 8, 9, 8, 10, 7, 9, 8, 500])   # dalam juta
 
print("Rata-rata:", gaji.mean())      # sekitar 57 juta
print("Median   :", np.median(gaji))  # 8 juta
```
 
Rata-ratanya 57 juta, angka yang tidak mewakili siapa pun di kantor itu. Mediannya 8 juta, yang menggambarkan kenyataan jauh lebih baik.
 
**Kesimpulan praktisnya:** kalau data punya nilai ekstrem atau bentuknya miring, pakai median. Ini alasan `SimpleImputer(strategy="median")` biasanya lebih aman daripada `strategy="mean"`.
 
### Mengukur Sebaran Data
 
Nilai tengah saja tidak cukup. Dua kelompok data bisa punya rata-rata sama tapi sangat berbeda.
 
**Standar deviasi** mengukur rata-rata jarak tiap nilai dari rata-ratanya. Makin besar, makin tersebar.
 
**Rentang interkuartil (IQR)** adalah jarak antara nilai di posisi 25 persen dan 75 persen. Tidak terpengaruh nilai ekstrem, jadi lebih tahan outlier.
 
```python
a = np.array([50, 50, 50, 50, 50])          # tidak ada sebaran
b = np.array([10, 30, 50, 70, 90])          # sangat tersebar
 
for nama, data in [("a", a), ("b", b)]:
    print(f"{nama}: rata-rata={data.mean():.1f}  std={data.std():.1f}")
```
 
Keduanya punya rata-rata 50, tapi maknanya sangat berbeda.
 
### Cara Membaca Standar Deviasi
 
Standar deviasi punya satuan yang sama dengan datanya. Kalau tinggi badan punya rata-rata 165 cm dan standar deviasi 8 cm, artinya sebagian besar orang berada di kisaran 157 sampai 173 cm.
 
Ini juga cara membaca hasil validasi silang. Skor 0,85 dengan standar deviasi 0,02 berarti performa model stabil. Skor 0,85 dengan standar deviasi 0,12 berarti performanya sangat bergantung pada data mana yang kebetulan dipakai.
 
### Kemiringan Data
 
**Kemiringan (skewness)** mengukur seberapa tidak simetris sebaran data.
 
**Nilai mendekati nol** berarti simetris, mirip lonceng.
 
**Nilai positif** berarti ekornya panjang ke kanan. Sebagian besar nilai kecil, sedikit nilai sangat besar. Contohnya gaji, harga rumah, dan lama tunggu.
 
**Nilai negatif** berarti ekornya panjang ke kiri. Lebih jarang ditemui.
 
```python
from scipy import stats
 
rng = np.random.RandomState(42)
normal = rng.normal(50, 10, 5000)
miring = rng.lognormal(3, 1, 5000)
 
print("Kemiringan data normal:", round(stats.skew(normal), 3))
print("Kemiringan data miring:", round(stats.skew(miring), 3))
print("Setelah transformasi log:", round(stats.skew(np.log1p(miring)), 3))
```
 
**Aturan praktisnya:** kalau kemiringan di atas 1 atau di bawah -1, pertimbangkan transformasi logaritma sebelum memakai model linear.
 
### Fungsi Ringkasan Lengkap
 
```python
def ringkas_kolom(s: pd.Series):
    return pd.Series({
        "jumlah": s.count(),
        "kosong": s.isna().sum(),
        "rata_rata": s.mean(),
        "median": s.median(),
        "std": s.std(),
        "min": s.min(),
        "q25": s.quantile(0.25),
        "q75": s.quantile(0.75),
        "max": s.max(),
        "kemiringan": s.skew(),
        "selisih_mean_median": s.mean() - s.median(),
    }).round(3)
 
print(ringkas_kolom(pd.Series(miring)))
```
 
Perhatikan baris terakhir. Kalau selisih antara rata-rata dan median besar, itu tanda kuat bahwa data miring atau ada outlier.
 
## Distribusi: Bentuk Sebaran Data
 
### Apa Itu Distribusi
 
Distribusi adalah gambaran tentang nilai apa saja yang muncul dan seberapa sering masing-masing muncul.
 
Analoginya seperti bertanya "berapa banyak orang yang tingginya 160 cm, 165 cm, 170 cm, dan seterusnya". Kalau dijawab lengkap untuk semua kemungkinan, itulah distribusinya.
 
### Kenapa Perlu Tahu Bentuk Distribusi
 
Tiga alasan praktis:
 
**Menentukan cara mengisi sel kosong.** Data simetris pakai rata-rata, data miring pakai median.
 
**Menentukan cara penskalaan.** `StandardScaler` cocok untuk data mendekati normal, `RobustScaler` untuk data dengan outlier.
 
**Menentukan perlu tidaknya transformasi.** Data sangat miring sering perlu dilogaritma sebelum masuk model linear.
 
### Distribusi Normal
 
#### Bentuknya
 
Berbentuk lonceng simetris. Sebagian besar nilai berkumpul di tengah, makin jauh dari tengah makin jarang.
 
#### Aturan 68-95-99,7
 
Ini satu-satunya angka yang perlu diingat tentang distribusi normal.
 
- Sekitar **68 persen** data berada dalam jarak 1 standar deviasi dari rata-rata
- Sekitar **95 persen** dalam jarak 2 standar deviasi
- Sekitar **99,7 persen** dalam jarak 3 standar deviasi
```python
data = rng.normal(100, 15, 100_000)
 
for k in [1, 2, 3]:
    dalam = np.mean(np.abs(data - 100) < k * 15)
    print(f"Dalam {k} standar deviasi: {dalam:.1%}")
```
 
#### Kenapa Berguna
 
Aturan ini langsung dipakai untuk mendeteksi outlier. Nilai yang berada lebih dari 3 standar deviasi dari rata-rata hanya muncul pada sekitar 0,3 persen data. Kalau Anda menemukan banyak nilai seperti itu, kemungkinan besar data Anda tidak normal atau ada masalah lain.
 
Aturan ini juga menjelaskan kerja `StandardScaler`, yang mengubah data sehingga rata-ratanya 0 dan standar deviasinya 1.
 
#### Jebakan: Banyak Data Nyata Tidak Normal
 
Ini kesalahpahaman umum. Distribusi normal sering diajarkan seolah-olah semua data mengikutinya, padahal tidak.
 
Gaji, harga, jumlah transaksi, lama sesi, dan jumlah pengikut media sosial semuanya sangat miring, bukan normal.
 
Kabar baiknya, sebagian besar algoritma machine learning tidak mensyaratkan data berdistribusi normal. Yang mensyaratkan hanya beberapa uji statistik tertentu dan sebagian model linear klasik.
 
### Distribusi Miring ke Kanan
 
Ini bentuk yang paling sering ditemui pada data bisnis. Sebagian besar nilai kecil, sedikit nilai sangat besar, dan tidak ada nilai negatif.
 
```python
gaji_simulasi = rng.lognormal(mean=2.3, sigma=0.6, size=5000)
 
print(f"Rata-rata : {gaji_simulasi.mean():.2f}")
print(f"Median    : {np.median(gaji_simulasi):.2f}")
print(f"Kemiringan: {stats.skew(gaji_simulasi):.3f}")
print(f"Nilai maksimum adalah {gaji_simulasi.max() / np.median(gaji_simulasi):.1f}x median")
```
 
Untuk data seperti ini, transformasi logaritma sering mengubahnya jadi mendekati normal, sehingga model linear bekerja jauh lebih baik.
 
### Distribusi Bernoulli dan Binomial
 
**Bernoulli** menggambarkan satu percobaan dengan dua hasil, misalnya berhasil atau gagal.
 
**Binomial** menggambarkan berapa kali berhasil dari sekian banyak percobaan.
 
Ini relevan karena target klasifikasi biner pada dasarnya adalah Bernoulli, dan regresi logistik memodelkan peluangnya.
 
```python
# Simulasi: dari 100 pelanggan, berapa yang berhenti kalau peluangnya 15 persen?
hasil = rng.binomial(n=100, p=0.15, size=10_000)
print(f"Rata-rata yang berhenti: {hasil.mean():.2f}")
print(f"Rentang biasanya: {np.percentile(hasil, 2.5):.0f} sampai {np.percentile(hasil, 97.5):.0f}")
```
 
Perhatikan rentangnya. Bahkan kalau peluang sebenarnya persis 15 persen, jumlah yang berhenti bisa bervariasi cukup lebar. Ini penting untuk memahami kenapa hasil pengukuran selalu punya ketidakpastian.
 
### Distribusi Poisson
 
Menggambarkan berapa kali suatu kejadian muncul dalam satu periode. Contohnya jumlah komplain per bulan, jumlah kunjungan per hari, atau jumlah kerusakan per minggu.
 
Ciri khasnya: nilainya bilangan bulat, tidak pernah negatif, dan biasanya miring ke kanan.
 
### Memeriksa Distribusi Data Anda
 
```python
import matplotlib.pyplot as plt
 
def periksa_distribusi(data, nama="kolom"):
    fig, ax = plt.subplots(1, 3, figsize=(14, 3.5))
 
    ax[0].hist(data, bins=50)
    ax[0].set_title(f"Histogram {nama}")
 
    stats.probplot(data, dist="norm", plot=ax[1])
    ax[1].set_title("Q-Q Plot (makin lurus makin normal)")
 
    ax[2].boxplot(data, vert=False)
    ax[2].set_title("Boxplot (titik di luar = outlier)")
 
    plt.tight_layout()
    plt.show()
 
    print(f"Kemiringan: {stats.skew(data):.3f}")
    print(f"Rata-rata {data.mean():.2f} vs Median {np.median(data):.2f}")
 
periksa_distribusi(gaji_simulasi, "gaji")
```
 
#### Cara Membaca Q-Q Plot
 
Ini grafik yang membandingkan data Anda dengan distribusi normal ideal.
 
Kalau titik-titiknya membentuk garis lurus, data Anda mendekati normal. Kalau melengkung di ujung-ujungnya, ekornya lebih panjang daripada normal, biasanya karena ada outlier atau data miring.
 
### Keputusan Praktis Berdasarkan Distribusi
 
| Bentuk data | Isi sel kosong dengan | Penskalaan | Transformasi |
|---|---|---|---|
| Mendekati normal | Rata-rata | `StandardScaler` | Tidak perlu |
| Miring ke kanan | Median | `RobustScaler` | `np.log1p` |
| Ada outlier ekstrem | Median | `RobustScaler` | Potong nilai atau log |
| Bilangan cacah (Poisson) | Median | Bebas | Kadang akar kuadrat |
 
## Sampling: Mengambil Kesimpulan dari Sebagian Data
 
### Populasi dan Sampel
 
**Populasi** adalah seluruh kelompok yang ingin dipahami, misalnya semua pelanggan perusahaan Anda, termasuk yang belum menjadi pelanggan.
 
**Sampel** adalah bagian yang benar-benar Anda punya datanya.
 
Data yang Anda pakai untuk melatih model selalu berupa sampel, tidak pernah populasi. Ini punya konsekuensi penting: semua kesimpulan Anda mengandung ketidakpastian.
 
### Kenapa Sampel Bisa Menipu
 
#### Analogi
 
Kalau Anda ingin tahu makanan favorit orang Indonesia lalu hanya bertanya pada pengunjung satu restoran Padang, jawabannya akan bias. Bukan karena orangnya bohong, tapi karena cara memilih responden sudah salah sejak awal.
 
#### Bias Sampling di Dunia Nyata
 
**Survei kepuasan pelanggan.** Yang mengisi biasanya yang sangat puas atau sangat kecewa. Yang biasa saja tidak repot mengisi.
 
**Data pelanggan yang berhenti.** Kalau Anda hanya punya data pelanggan yang menghubungi layanan pelanggan sebelum berhenti, Anda melewatkan yang berhenti diam-diam, dan itu mungkin kelompok terbesar.
 
**Data deteksi penipuan.** Anda hanya punya label untuk transaksi yang sempat diperiksa. Penipuan yang lolos tidak pernah terlabel, sehingga model belajar dari gambaran yang tidak lengkap.
 
Bias sampling tidak bisa diperbaiki dengan menambah data lebih banyak dari sumber yang sama. Yang perlu diperbaiki adalah cara pengambilannya.
 
### Jenis Pengambilan Sampel
 
**Acak sederhana.** Setiap anggota populasi punya peluang sama terpilih. Paling adil, tapi tidak selalu praktis.
 
**Berstrata.** Populasi dibagi kelompok dulu, lalu diambil sampel dari tiap kelompok secara proporsional. Ini prinsip yang sama dengan `stratify=y` pada `train_test_split`.
 
**Berkelompok.** Ambil beberapa kelompok utuh, misalnya beberapa cabang, lalu ambil semua anggotanya. Praktis tapi hasilnya kurang mewakili.
 
### Teorema Limit Pusat
 
#### Idenya dalam Bahasa Sederhana
 
Ini konsep yang terdengar rumit tapi maknanya sangat berguna.
 
Kalau Anda mengambil sampel berkali-kali dari populasi apa pun, lalu menghitung rata-rata tiap sampel, maka **kumpulan rata-rata itu akan berdistribusi normal**, bahkan kalau data aslinya sama sekali tidak normal.
 
#### Membuktikannya dengan Kode
 
```python
# Data asli sangat miring, jelas tidak normal
populasi = rng.exponential(scale=10, size=1_000_000)
 
rata_sampel = [rng.choice(populasi, size=50).mean() for _ in range(5000)]
 
fig, ax = plt.subplots(1, 2, figsize=(11, 3.5))
ax[0].hist(rng.choice(populasi, 5000), bins=50)
ax[0].set_title("Data asli (sangat miring)")
ax[1].hist(rata_sampel, bins=50)
ax[1].set_title("Rata-rata dari 5000 sampel (jadi normal)")
plt.tight_layout()
plt.show()
 
print(f"Kemiringan data asli   : {stats.skew(populasi):.3f}")
print(f"Kemiringan rata-rata   : {stats.skew(rata_sampel):.3f}")
```
 
Gambar sebelah kiri sangat miring, gambar sebelah kanan berbentuk lonceng. Inilah teorema limit pusat.
 
#### Kenapa Ini Berguna
 
Karena inilah yang memungkinkan kita menghitung ketidakpastian sebuah pengukuran. Skor validasi silang Anda adalah rata-rata dari beberapa fold, dan teorema ini yang membuat kita bisa berkata "skornya 0,85 dengan rentang wajar 0,82 sampai 0,88".
 
### Standard Error dan Rentang Kepercayaan
 
**Standard error** adalah perkiraan seberapa jauh rata-rata sampel Anda kemungkinan meleset dari rata-rata populasi sebenarnya.
 
Rumus intinya: standar deviasi dibagi akar dari jumlah sampel.
 
Yang penting dipahami dari rumus itu: **untuk mengurangi separuh ketidakpastian, Anda butuh empat kali lipat data**. Karena pembaginya akar kuadrat, bukan jumlah data langsung.
 
```python
def rentang_kepercayaan(data, tingkat=0.95):
    n = len(data)
    rata = np.mean(data)
    se = np.std(data, ddof=1) / np.sqrt(n)
    batas = stats.t.ppf((1 + tingkat) / 2, df=n - 1) * se
    return rata, rata - batas, rata + batas
 
# Contoh: skor dari 5 fold validasi silang
skor_cv = np.array([0.83, 0.87, 0.81, 0.86, 0.84])
rata, bawah, atas = rentang_kepercayaan(skor_cv)
 
print(f"Skor: {rata:.4f}")
print(f"Rentang kepercayaan 95%: {bawah:.4f} sampai {atas:.4f}")
```
 
#### Cara Menafsirkannya
 
Rentang kepercayaan 95 persen berarti: kalau prosedur ini diulang berkali-kali, sekitar 95 persen dari rentang yang dihasilkan akan memuat nilai sebenarnya.
 
Ini yang membuat Anda bisa menjawab pertanyaan "model A 0,84 dan model B 0,86, mana yang lebih baik?" Kalau rentang keduanya bertumpang tindih banyak, jawabannya adalah "belum bisa dipastikan".
 
### Berapa Data yang Cukup
 
Tidak ada angka pasti, tapi ada patokan kasar.
 
Untuk data tabular sederhana, sekitar 10 sampai 50 baris per fitur biasanya jadi titik awal yang wajar. Kalau Anda punya 20 fitur, artinya 200 sampai 1.000 baris.
 
Untuk klasifikasi, yang lebih menentukan adalah jumlah baris di **kelas paling sedikit**, bukan total baris. Data 100 ribu baris dengan hanya 30 kasus positif tetap sulit ditangani.
 
Cara terbaik menjawab pertanyaan ini bukan lewat rumus, melainkan lewat learning curve. Kalau garis skor validasi masih menanjak di ujung kanan, menambah data masih akan membantu.
 
## Korelasi dan Kausalitas
 
### Apa Itu Korelasi
 
Korelasi mengukur seberapa kuat dua variabel bergerak bersamaan.
 
Nilainya antara -1 dan 1:
 
- **Mendekati 1** berarti saat satu naik, yang lain ikut naik
- **Mendekati -1** berarti saat satu naik, yang lain turun
- **Mendekati 0** berarti tidak ada hubungan lurus
### Dua Jenis Korelasi
 
**Pearson** mengukur hubungan **lurus**. Ini yang paling umum dipakai dan yang dihitung `df.corr()` secara bawaan.
 
**Spearman** mengukur hubungan **berurutan**, tidak harus lurus. Cocok kalau hubungannya melengkung tapi tetap searah, atau kalau data punya outlier.
 
```python
x = np.linspace(1, 10, 100)
y_lurus = 2 * x + rng.randn(100) * 2
y_lengkung = x ** 3 + rng.randn(100) * 50
 
for nama, y in [("lurus", y_lurus), ("melengkung", y_lengkung)]:
    p = stats.pearsonr(x, y)[0]
    s = stats.spearmanr(x, y)[0]
    print(f"Hubungan {nama:11s}: Pearson={p:.3f}  Spearman={s:.3f}")
```
 
Untuk hubungan melengkung, Spearman menangkapnya lebih baik daripada Pearson.
 
### Korelasi Nol Tidak Berarti Tidak Ada Hubungan
 
Ini jebakan penting. Pearson hanya mendeteksi hubungan lurus.
 
```python
x = np.linspace(-5, 5, 200)
y = x ** 2                       # hubungan sempurna, tapi berbentuk U
 
print("Korelasi Pearson:", round(stats.pearsonr(x, y)[0], 4))
```
 
Hasilnya mendekati nol, padahal `y` sepenuhnya ditentukan oleh `x`. Karena itu, **selalu gambar datanya**, jangan hanya melihat angka korelasi.
 
### Angka Sama, Bentuk Berbeda
 
```python
# Empat kumpulan data dengan korelasi hampir sama tapi bentuk sangat berbeda
def buat_variasi():
    x1 = np.arange(1, 15); y1 = 3 + 0.5 * x1 + rng.randn(14) * 1.2
    x2 = np.arange(1, 15); y2 = 3 + 0.5 * x2 - 0.02 * (x2 - 7) ** 3
    x3 = np.arange(1, 15); y3 = 3 + 0.5 * x3; y3[9] += 6          # satu outlier
    return [(x1, y1), (x2, y2), (x3, y3)]
 
fig, ax = plt.subplots(1, 3, figsize=(13, 3.5))
for i, (xi, yi) in enumerate(buat_variasi()):
    ax[i].scatter(xi, yi)
    ax[i].set_title(f"Korelasi = {stats.pearsonr(xi, yi)[0]:.3f}")
plt.tight_layout()
plt.show()
```
 
Ketiganya bisa punya korelasi yang mirip, tapi bentuknya sangat berbeda. Satu angka tidak pernah cukup untuk memahami hubungan antar variabel.
 
### Kenapa Korelasi Bukan Kausalitas
 
Ini konsep paling penting di seluruh artikel ini, dan yang paling sering dilanggar dalam praktik.
 
Kalau A berkorelasi dengan B, ada lima kemungkinan penjelasan.
 
#### 1. A Memang Menyebabkan B
 
Ini yang biasanya diasumsikan orang, tapi cuma satu dari lima kemungkinan.
 
#### 2. B yang Menyebabkan A
 
Arahnya terbalik. Contohnya, penjualan payung berkorelasi dengan hujan. Bukan payung yang menyebabkan hujan.
 
#### 3. Ada Faktor Ketiga
 
Ini yang paling sering terjadi. Penjualan es krim berkorelasi dengan jumlah kasus tenggelam. Bukan es krim penyebabnya, melainkan musim panas yang menyebabkan keduanya.
 
Dalam konteks bisnis: jumlah komplain berkorelasi dengan pelanggan berhenti. Tapi mungkin keduanya sama-sama disebabkan penurunan kualitas layanan. Melarang orang berkomplain tidak akan menghentikan mereka pergi.
 
#### 4. Kebetulan Semata
 
Dengan cukup banyak variabel, pasti ada beberapa pasangan yang berkorelasi tinggi secara kebetulan. Kalau Anda memeriksa 100 fitur, beberapa di antaranya pasti tampak berhubungan padahal tidak.
 
#### 5. Bias Cara Mengambil Data
 
Contohnya, kalau Anda hanya punya data pelanggan yang bertahan lebih dari 3 bulan, kesimpulan Anda tidak berlaku untuk pelanggan baru.
 
### Kapan Boleh Menyimpulkan Sebab-Akibat
 
Hanya lewat **eksperimen terkontrol**, di mana Anda sendiri yang mengubah satu faktor secara acak lalu mengamati efeknya.
 
Dalam dunia produk, ini disebut A/B testing. Bagi pengguna secara acak menjadi dua kelompok, beri perlakuan berbeda, lalu bandingkan hasilnya. Karena pembagiannya acak, faktor ketiga apa pun akan tersebar merata di kedua kelompok.
 
Data pengamatan biasa tidak bisa membuktikan sebab-akibat, sebesar apa pun datanya.
 
### Konsekuensinya dalam Machine Learning
 
**Model prediktif tidak perlu kausalitas untuk bekerja.** Model yang memakai jumlah komplain untuk memprediksi pelanggan berhenti tetap berguna, karena tujuannya memprediksi siapa yang berisiko, bukan menjelaskan sebabnya.
 
**Tapi keputusan tindakan butuh kausalitas.** Kalau Anda mau memutuskan intervensi apa yang dilakukan, model prediktif tidak cukup. Butuh eksperimen.
 
**Kalimat yang aman diucapkan:** "Fitur ini adalah penanda kuat untuk risiko" atau "berhubungan dengan".
 
**Kalimat yang berbahaya:** "Fitur ini menyebabkan" atau "kalau kita ubah ini, hasilnya akan berubah".
 
## Uji Hipotesis
 
### Pertanyaan yang Dijawab
 
Anda mengukur sesuatu dan melihat perbedaan. Uji hipotesis menjawab: apakah perbedaan itu nyata, atau bisa saja muncul karena keacakan semata?
 
### Analogi Pengadilan
 
Sistem uji hipotesis mirip pengadilan.
 
Terdakwa **dianggap tidak bersalah** sampai terbukti sebaliknya. Ini disebut **hipotesis nol**: anggapan bahwa tidak ada perbedaan.
 
Jaksa harus menunjukkan **bukti yang cukup kuat** untuk menolak anggapan itu. Kalau buktinya lemah, terdakwa dibebaskan.
 
Yang penting: dibebaskan **bukan berarti terbukti tidak bersalah**, hanya berarti buktinya tidak cukup. Prinsip yang sama berlaku di statistika.
 
### Hipotesis Nol dan Alternatif
 
**Hipotesis nol (H0)** adalah anggapan awal bahwa tidak ada perbedaan atau tidak ada efek. Contohnya: "model A dan model B punya performa sama".
 
**Hipotesis alternatif (H1)** adalah yang ingin dibuktikan. Contohnya: "model A lebih baik daripada model B".
 
### Memahami p-value dengan Benar
 
Ini konsep yang paling sering disalahpahami, jadi perlu perhatian khusus.
 
**Arti sebenarnya:** p-value adalah peluang melihat perbedaan sebesar ini atau lebih besar, **kalau seandainya hipotesis nol itu benar**.
 
p-value kecil berarti: "kalau tidak ada perbedaan sungguhan, hasil seperti ini sangat jarang terjadi". Karena itu, kita cenderung menolak anggapan bahwa tidak ada perbedaan.
 
#### Yang Bukan Arti p-value
 
**Bukan** peluang bahwa hipotesis nol benar.
 
**Bukan** peluang bahwa hasil Anda karena kebetulan.
 
**Bukan** ukuran seberapa besar perbedaannya. p-value kecil bisa muncul dari perbedaan yang sangat kecil kalau datanya banyak.
 
### Ambang Signifikansi
 
Ambang yang lazim dipakai adalah 0,05. Kalau p-value di bawahnya, hasil disebut "signifikan secara statistik".
 
Angka 0,05 itu **kesepakatan, bukan hukum alam**. Tidak ada yang ajaib tentangnya. p-value 0,049 dan 0,051 pada dasarnya menyampaikan pesan yang sama.
 
### Dua Jenis Kesalahan
 
**Kesalahan tipe 1** adalah menyatakan ada perbedaan padahal sebenarnya tidak ada. Ibarat menghukum orang tidak bersalah.
 
**Kesalahan tipe 2** adalah gagal mendeteksi perbedaan yang sebenarnya ada. Ibarat membebaskan orang bersalah.
 
Menurunkan ambang signifikansi mengurangi kesalahan tipe 1 tapi menambah kesalahan tipe 2. Ini pertukaran yang sama seperti precision dan recall.
 
### Contoh Praktis 1: Membandingkan Dua Model
 
```python
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
 
X, y = load_breast_cancer(return_X_y=True)
cv = StratifiedKFold(n_splits=10, shuffle=True, random_state=42)
 
model_a = make_pipeline(StandardScaler(), LogisticRegression(max_iter=5000))
model_b = make_pipeline(StandardScaler(), RandomForestClassifier(
    n_estimators=200, random_state=42))
 
skor_a = cross_val_score(model_a, X, y, cv=cv, scoring="f1")
skor_b = cross_val_score(model_b, X, y, cv=cv, scoring="f1")
 
print(f"Model A: {skor_a.mean():.4f} (std {skor_a.std():.4f})")
print(f"Model B: {skor_b.mean():.4f} (std {skor_b.std():.4f})")
 
# Uji berpasangan, karena kedua model diuji pada fold yang sama
t, p = stats.ttest_rel(skor_a, skor_b)
print(f"\np-value: {p:.4f}")
 
if p < 0.05:
    print("Perbedaannya cukup meyakinkan untuk dianggap nyata.")
else:
    print("Perbedaannya bisa saja muncul karena keacakan. Belum bisa disimpulkan.")
```
 
#### Kenapa Pakai Uji Berpasangan
 
Karena kedua model diuji pada fold data yang sama persis. Membandingkan pasangan skor dari fold yang sama jauh lebih peka daripada membandingkan dua kumpulan angka yang tidak berkaitan.
 
#### Catatan Kejujuran
 
Uji ini tidak sepenuhnya valid secara teori, karena fold-fold dalam validasi silang saling berbagi data sehingga tidak benar-benar mandiri. Hasilnya cenderung sedikit terlalu optimistis.
 
Untuk keperluan praktis, ini tetap jauh lebih baik daripada sekadar membandingkan dua angka rata-rata tanpa memperhitungkan sebarannya.
 
### Contoh Praktis 2: A/B Testing
 
```python
# Kelompok A: tampilan lama, Kelompok B: tampilan baru
konversi_a, total_a = 120, 2000      # 6,0 persen
konversi_b, total_b = 145, 2000      # 7,25 persen
 
from scipy.stats import chi2_contingency
 
tabel = np.array([[konversi_a, total_a - konversi_a],
                  [konversi_b, total_b - konversi_b]])
chi2, p, dof, harapan = chi2_contingency(tabel)
 
print(f"Konversi A: {konversi_a/total_a:.2%}")
print(f"Konversi B: {konversi_b/total_b:.2%}")
print(f"Selisih   : {(konversi_b/total_b - konversi_a/total_a):.2%}")
print(f"p-value   : {p:.4f}")
```
 
Coba ubah jumlah totalnya menjadi 200 saja per kelompok dengan proporsi yang sama. p-value-nya akan jauh lebih besar, meski selisih persentasenya identik. Ini menunjukkan bahwa jumlah data sangat menentukan keyakinan kita.
 
### Signifikan Secara Statistik Bukan Berarti Penting
 
Ini pembedaan yang sangat praktis.
 
Dengan data satu juta baris, selisih konversi 0,01 persen bisa saja signifikan secara statistik. Tapi apakah selisih itu layak dikejar? Belum tentu, kalau biaya penerapannya lebih besar daripada manfaatnya.
 
**Selalu laporkan dua hal:** apakah perbedaannya nyata (p-value), dan seberapa besar perbedaannya (selisih dan rentang kepercayaan). Yang kedua sering lebih penting untuk pengambilan keputusan.
 
### Jebakan: Menguji Terlalu Banyak Hal
 
Kalau Anda menguji 20 hipotesis dengan ambang 0,05, secara rata-rata satu di antaranya akan tampak signifikan meski semuanya sebenarnya tidak ada efek.
 
```python
# Simulasi: 20 pengujian, padahal tidak ada efek sama sekali
signifikan = 0
for _ in range(20):
    a = rng.normal(0, 1, 100)
    b = rng.normal(0, 1, 100)       # sama persis distribusinya
    if stats.ttest_ind(a, b)[1] < 0.05:
        signifikan += 1
 
print(f"Dari 20 pengujian tanpa efek, {signifikan} tampak signifikan")
```
 
**Solusinya:** tentukan hipotesis sebelum melihat data, dan kalau menguji banyak hal, perketat ambangnya. Cara paling sederhana adalah membagi 0,05 dengan jumlah pengujian.
 
Mencari-cari sampai ada yang signifikan disebut *p-hacking*, dan itu praktik yang menyesatkan.
 
## Teorema Bayes
 
### Idenya dalam Satu Kalimat
 
Teorema Bayes adalah cara memperbarui keyakinan setelah mendapat bukti baru.
 
### Rumusnya dalam Bahasa Sehari-hari
 
```
Keyakinan setelah bukti  =  Keyakinan awal  ×  Kekuatan bukti
```
 
Yang penting: hasil akhirnya bergantung pada **dua** hal, bukan cuma buktinya. Keyakinan awal, yang disebut *base rate* atau *prior*, sama pentingnya.
 
Mengabaikan keyakinan awal adalah kesalahan berpikir yang sangat umum.
 
### Contoh Klasik: Tes Penyakit
 
Ini contoh terbaik untuk memahami kenapa base rate penting.
 
**Situasinya:**
 
- Ada penyakit yang menjangkiti 1 dari 1.000 orang, jadi 0,1 persen
- Ada tes dengan tingkat deteksi 99 persen, artinya kalau Anda sakit, tes hampir pasti positif
- Tes itu punya tingkat salah alarm 5 persen, artinya 5 persen orang sehat juga hasilnya positif
**Pertanyaannya:** hasil tes Anda positif. Berapa peluang Anda benar-benar sakit?
 
Kebanyakan orang menjawab sekitar 95 persen. Mari kita hitung.
 
```python
jumlah_orang = 1_000_000
prevalensi = 0.001
sensitivitas = 0.99      # peluang tes positif kalau memang sakit
salah_alarm = 0.05       # peluang tes positif padahal sehat
 
sakit = jumlah_orang * prevalensi                 # 1.000 orang
sehat = jumlah_orang - sakit                      # 999.000 orang
 
positif_benar = sakit * sensitivitas              # 990 orang
positif_palsu = sehat * salah_alarm               # 49.950 orang
total_positif = positif_benar + positif_palsu
 
print(f"Yang benar-benar sakit dan positif : {positif_benar:,.0f}")
print(f"Yang sehat tapi positif            : {positif_palsu:,.0f}")
print(f"Total hasil positif                : {total_positif:,.0f}")
print(f"\nPeluang benar-benar sakit: {positif_benar/total_positif:.2%}")
```
 
Jawabannya sekitar **2 persen**, bukan 95 persen.
 
### Kenapa Hasilnya Mengejutkan
 
Karena orang sehat jumlahnya jauh lebih banyak. Meski tingkat salah alarmnya cuma 5 persen, 5 persen dari 999.000 orang tetap menghasilkan hampir 50.000 hasil positif palsu, yang jauh melebihi 990 hasil positif yang benar.
 
**Pelajarannya:** ketika kejadian yang dicari sangat jarang, sebagian besar alarm adalah alarm palsu, bahkan dengan alat yang sangat akurat.
 
### Hubungannya Langsung dengan Machine Learning
 
Perhitungan di atas persis sama dengan menghitung **precision**.
 
- Sensitivitas dalam contoh tadi sama dengan **recall**
- Peluang benar-benar sakit setelah tes positif sama dengan **precision**
- Prevalensi penyakit sama dengan **proporsi kelas positif**
Inilah penjelasan matematis kenapa precision selalu rendah pada data yang sangat timpang, meski model punya recall tinggi.
 
```python
def hitung_precision(prevalensi, recall, salah_alarm):
    return (prevalensi * recall) / (prevalensi * recall +
                                    (1 - prevalensi) * salah_alarm)
 
print(f"{'Proporsi positif':>18} {'Precision':>12}")
for p in [0.5, 0.1, 0.01, 0.001]:
    print(f"{p:>18.3f} {hitung_precision(p, 0.99, 0.05):>12.2%}")
```
 
Perhatikan bagaimana precision anjlok saat kelas positif makin jarang, padahal kualitas modelnya persis sama. Ini bukan kesalahan model, melainkan konsekuensi matematis.
 
**Implikasi praktisnya:** untuk data sangat timpang, Anda harus menekan tingkat salah alarm jauh lebih rendah, bukan sekadar menaikkan recall.
 
### Tiga Istilah Bayes
 
**Prior** adalah keyakinan sebelum melihat bukti. Dalam contoh tadi, prevalensi penyakit 0,1 persen.
 
**Likelihood** adalah seberapa mungkin bukti ini muncul di tiap kemungkinan. Dalam contoh tadi, sensitivitas dan tingkat salah alarm.
 
**Posterior** adalah keyakinan setelah melihat bukti. Dalam contoh tadi, 2 persen.
 
### Kaitannya dengan Algoritma Naive Bayes
 
Algoritma Naive Bayes menerapkan teorema ini langsung. Untuk tiap kelas, ia menghitung: berapa peluang kelas ini benar, mengingat fitur-fitur yang muncul?
 
Kata "naive" berasal dari asumsi bahwa semua fitur saling bebas, yang menyederhanakan perhitungan secara drastis. Asumsi itu hampir selalu salah, tapi modelnya tetap sering bekerja baik.
 
### Berpikir Bayesian dalam Pekerjaan Sehari-hari
 
Ini kerangka berpikir yang berguna di luar rumus.
 
Kalau model Anda tiba-tiba mencapai akurasi 99,5 persen padahal masalahnya sulit, terapkan teorema Bayes secara mental. Prior Anda seharusnya: hasil sebagus itu jarang terjadi secara jujur. Bukti yang ada: satu angka tinggi. Kesimpulan yang masuk akal: lebih mungkin ada kebocoran data daripada model Anda memang luar biasa.
 
Kerangka berpikir ini menyelamatkan banyak waktu.
 
## Menghubungkan Semuanya ke Keputusan Sehari-hari
 
| Pertanyaan yang Anda hadapi | Konsep yang dipakai | Tindakan konkret |
|---|---|---|
| Isi sel kosong pakai apa? | Distribusi dan kemiringan | Miring pakai median, simetris pakai rata-rata |
| Perlu transformasi log? | Kemiringan | Kalau skewness di atas 1, coba `np.log1p` |
| Scaler mana yang dipakai? | Distribusi dan outlier | Normal pakai Standard, ada outlier pakai Robust |
| Model A atau B? | Uji hipotesis | Uji t berpasangan pada skor validasi silang |
| Skor 0,85 itu pasti? | Standard error | Laporkan bersama rentang kepercayaan |
| Fitur ini penyebabnya? | Kausalitas | Jangan simpulkan, butuh eksperimen |
| Kenapa precision rendah? | Teorema Bayes | Wajar pada kelas jarang, tekan salah alarm |
| Data cukup atau belum? | Sampling dan learning curve | Lihat apakah kurva validasi masih menanjak |
| Hasil A/B test nyata? | Uji hipotesis | Hitung p-value dan besar efeknya |
| Skornya terlalu bagus | Prior Bayesian | Curigai kebocoran, jangan langsung senang |
 
## Kesalahan Pemula yang Sering Terjadi
 
### Menyimpulkan Sebab-Akibat dari Korelasi
 
Kesalahan paling umum dan paling mahal akibatnya. Korelasi punya lima kemungkinan penjelasan, dan sebab-akibat langsung hanya salah satunya.
 
### Menganggap Semua Data Berdistribusi Normal
 
Banyak data bisnis sangat miring. Memakai rata-rata dan `StandardScaler` secara membabi buta pada data seperti itu menghasilkan keputusan yang buruk.
 
### Menyalahartikan p-value
 
p-value bukan peluang bahwa hipotesis Anda benar, dan bukan ukuran besar kecilnya efek. Selalu laporkan besar efeknya juga.
 
### Menganggap Signifikan Berarti Penting
 
Dengan data yang cukup banyak, perbedaan sekecil apa pun bisa jadi signifikan secara statistik. Tanyakan apakah perbedaannya cukup besar untuk layak ditindaklanjuti.
 
### Melupakan Base Rate
 
Ketika kejadian sangat jarang, alat yang akurat sekalipun akan menghasilkan lebih banyak alarm palsu daripada alarm benar. Ini bukan kegagalan alat, melainkan matematika.
 
### Menguji Banyak Hal Lalu Melaporkan yang Signifikan
 
Kalau Anda mencoba 20 hal, satu di antaranya akan tampak signifikan secara kebetulan. Tentukan apa yang diuji sebelum melihat data.
 
### Hanya Melihat Angka Korelasi Tanpa Menggambar Data
 
Korelasi nol tidak berarti tidak ada hubungan, dan korelasi tinggi bisa saja disebabkan satu outlier. Selalu gambar sebaran datanya.
 
### Mengabaikan Bias Pengambilan Data
 
Menambah lebih banyak data dari sumber yang bias tidak memperbaiki apa pun. Yang harus diperbaiki adalah cara pengambilannya.
 
### Melaporkan Rata-rata Tanpa Sebarannya
 
Skor 0,85 dari validasi silang tidak bermakna tanpa standar deviasinya. Selalu laporkan keduanya.
 
## Penutup
 
Statistika bukan mata pelajaran terpisah yang harus dituntaskan sebelum boleh menyentuh machine learning. Ia adalah kerangka berpikir yang membuat Anda tahu kapan boleh percaya pada angka yang muncul di layar.
 
Tiga hal untuk diingat:
 
**Pertama**, setiap angka yang Anda ukur punya ketidakpastian. Skor 0,85 dari lima fold bukan kebenaran mutlak, melainkan perkiraan dengan rentang. Laporkan rentangnya.
 
**Kedua**, korelasi bukan sebab-akibat, dan tidak ada jumlah data yang bisa mengubah aturan itu. Untuk pertanyaan sebab-akibat, jawabannya adalah eksperimen.
 
**Ketiga**, ketika sesuatu jarang terjadi, perhitungan intuitif hampir selalu keliru. Teorema Bayes memberi tahu bahwa alat yang akurat pun akan menghasilkan lebih banyak alarm palsu daripada alarm benar. Memahami ini menyelamatkan Anda dari harapan yang tidak realistis terhadap model.
 