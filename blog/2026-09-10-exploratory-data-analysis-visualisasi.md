---
slug: exploratory-data-analysis-visualisasi
title: "Exploratory Data Analysis dan Visualisasi: Panduan Machine Learning untuk Pemula #9"
authors: topekox
tags: [manchine learning, data mining, ai, data science, python]
---

Ada kebiasaan yang membedakan praktisi berpengalaman dari pemula: sebelum menulis satu baris kode model, mereka menghabiskan waktu melihat datanya dulu.
 
Kebiasaan ini terasa membuang waktu di awal, tapi hampir selalu menghemat waktu di akhir. Masalah yang ditemukan dalam lima menit lewat sebuah grafik bisa saja butuh dua hari untuk diselidiki kalau baru ketahuan setelah model dilatih.
 
Artikel ini membahas cara memeriksa data secara sistematis, grafik apa yang dipakai untuk situasi apa, dan bagaimana temuan dari pemeriksaan itu diterjemahkan menjadi keputusan pemodelan.

<!-- truncate -->

## Daftar Isi
 
1. Kenapa Harus Melihat Data Dulu
2. Mengenal Alat: matplotlib dan seaborn
3. Menyiapkan Data Contoh
4. Tahap 1: Pemeriksaan Awal Tanpa Grafik
5. Tahap 2: Melihat Satu Kolom
6. Tahap 3: Melihat Hubungan Dua Kolom
7. Tahap 4: Melihat Banyak Kolom Sekaligus
8. Tahap 5: Memeriksa Hal-hal Khusus
9. Membuat Grafik yang Enak Dibaca
10. Daftar Periksa EDA yang Bisa Dipakai Ulang
11. Dari Temuan Menjadi Keputusan Pemodelan
12. Kesalahan Pemula yang Sering Terjadi
## Kenapa Harus Melihat Data Dulu
 
### Apa Itu EDA
 
EDA adalah singkatan dari *Exploratory Data Analysis*, atau analisis data eksploratif. Intinya adalah memeriksa dan menggambar data untuk memahami isinya sebelum memodelkannya.
 
Kata kuncinya adalah **eksploratif**. Anda belum mencari jawaban atas pertanyaan tertentu, Anda sedang mencari tahu pertanyaan apa yang layak diajukan.
 
### Analogi Detektif
 
Seorang detektif tidak langsung menuduh tersangka. Ia datang ke lokasi, mengamati, mencatat hal-hal yang janggal, dan membangun gambaran keseluruhan dulu.
 
EDA adalah tahap mengamati lokasi kejadian. Anda mencari yang janggal: kolom yang isinya aneh, hubungan yang tidak masuk akal, atau pola yang mencurigakan.
 
### Kenapa Angka Saja Tidak Cukup
 
Ini demonstrasi klasik yang paling meyakinkan.
 
```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
 
rng = np.random.RandomState(42)
 
# Empat kumpulan data dengan statistik ringkasan yang hampir sama
x1 = np.linspace(0, 10, 100)
kumpulan = {
    "Hubungan lurus":  (x1, 2 * x1 + rng.randn(100) * 2),
    "Hubungan lengkung": (x1, 20 - 0.6 * (x1 - 5) ** 2 + rng.randn(100) * 2 + 10),
    "Dua kelompok":    (np.r_[x1[:50], x1[50:]],
                        np.r_[2 * x1[:50] + 6 + rng.randn(50),
                              2 * x1[50:] - 6 + rng.randn(50)]),
}
 
fig, ax = plt.subplots(1, 3, figsize=(14, 4))
for i, (nama, (xi, yi)) in enumerate(kumpulan.items()):
    ax[i].scatter(xi, yi, alpha=0.6)
    ax[i].set_title(f"{nama}\nrata-rata y = {yi.mean():.1f}, std = {yi.std():.1f}")
plt.tight_layout()
plt.show()
```
 
Ketiga kumpulan data ini bisa punya rata-rata dan standar deviasi yang mirip, tapi bentuknya sangat berbeda dan menuntut penanganan yang berbeda pula.
 
Kalau Anda hanya melihat `df.describe()`, ketiganya akan terlihat sama. Gambar mengungkap apa yang angka sembunyikan.
 
### Enam Hal yang Dicari Saat EDA
 
1. **Masalah kualitas data.** Sel kosong, duplikat, nilai mustahil, penulisan tidak seragam.
2. **Bentuk sebaran tiap kolom.** Simetris atau miring, ada outlier atau tidak.
3. **Hubungan antara fitur dan target.** Kolom mana yang tampak berpengaruh.
4. **Hubungan antar fitur.** Ada kolom kembar atau tidak.
5. **Ketimpangan kelas.** Berapa proporsi tiap kelas pada target.
6. **Tanda kebocoran data.** Kolom yang hubungannya dengan target terlalu sempurna.
Setiap temuan akan langsung menentukan keputusan preprocessing dan pemilihan model.
 
## Mengenal Alat: matplotlib dan seaborn
 
### Perbedaan Keduanya
 
**matplotlib** adalah pustaka dasar. Semua hal bisa dibuat dengan matplotlib, tapi kodenya lebih panjang karena Anda mengatur segalanya sendiri.
 
**seaborn** dibangun di atas matplotlib. Ia menyediakan perintah singkat untuk grafik statistik yang umum dipakai, dan tampilannya sudah bagus tanpa diatur.
 
### Kapan Pakai yang Mana
 
**Pakai seaborn** untuk sebagian besar keperluan EDA. Satu baris kode sudah menghasilkan grafik yang layak.
 
**Pakai matplotlib** kalau butuh kontrol penuh, misalnya untuk grafik yang akan masuk laporan resmi, atau untuk jenis grafik yang tidak disediakan seaborn.
 
Keduanya bisa dicampur. Anda bisa membuat grafik dengan seaborn lalu menyesuaikan judul dan sumbunya dengan matplotlib.
 
### Anatomi Grafik matplotlib
 
Dua istilah ini perlu dipahami supaya tidak bingung.
 
**Figure** adalah kanvasnya, seperti selembar kertas.
 
**Axes** adalah satu grafik di atas kanvas itu. Satu figure bisa berisi beberapa axes, misalnya grafik 2 baris 3 kolom.
 
```python
# Satu grafik
fig, ax = plt.subplots(figsize=(7, 4))
ax.plot([1, 2, 3], [4, 5, 6])
ax.set_title("Judul")
plt.show()
 
# Beberapa grafik dalam satu kanvas
fig, ax = plt.subplots(1, 3, figsize=(14, 4))    # 1 baris, 3 kolom
ax[0].plot([1, 2, 3], [1, 4, 9])
ax[1].scatter([1, 2, 3], [3, 1, 2])
ax[2].bar(["a", "b"], [5, 3])
plt.tight_layout()      # merapikan jarak antar grafik
plt.show()
```
 
Hampir semua fungsi seaborn menerima argumen `ax=`, sehingga bisa ditempatkan di posisi tertentu dalam susunan grafik.
 
### Pengaturan Awal yang Disarankan
 
```python
import seaborn as sns
 
sns.set_theme(style="whitegrid", palette="deep")     # tampilan lebih rapi
plt.rcParams["figure.figsize"] = (8, 4.5)
plt.rcParams["figure.dpi"] = 110
 
pd.set_option("display.max_columns", 50)
pd.set_option("display.width", 200)
```
 
## Menyiapkan Data Contoh
 
Kita akan memakai data pelanggan yang sengaja dibuat mengandung berbagai masalah, supaya tiap grafik benar-benar mengungkap sesuatu.
 
```python
rng = np.random.RandomState(42)
n = 2000
 
df = pd.DataFrame({
    "id_pelanggan": range(1, n + 1),
    "umur": rng.randint(18, 70, n).astype(float),
    "gaji_juta": rng.lognormal(2.2, 0.5, n).round(2),          # sengaja miring
    "lama_langganan_bulan": rng.randint(1, 60, n),
    "jumlah_komplain": rng.poisson(1.2, n),
    "skor_kepuasan": rng.randint(1, 11, n),
    "jumlah_login": rng.poisson(15, n),
    "kota": rng.choice(["Jakarta", "jakarta", "Bandung", "Surabaya ", "Palu",
                        "Medan", "Makassar"], n, p=[.25, .05, .2, .15, .1, .15, .1]),
    "paket": rng.choice(["basic", "premium", "vip"], n, p=[.5, .35, .15]),
})
 
# Target dibuat bergantung pada tiga kolom saja
risiko = (-0.06 * df["lama_langganan_bulan"] + 0.8 * df["jumlah_komplain"]
          - 0.35 * df["skor_kepuasan"] + 2.0 + rng.randn(n) * 0.5)
df["berhenti"] = (rng.rand(n) < 1 / (1 + np.exp(-risiko))).astype(int)
 
# Masalah yang sengaja disisipkan
df.loc[df.sample(150, random_state=1).index, "gaji_juta"] = np.nan
df.loc[df.sample(60, random_state=2).index, "skor_kepuasan"] = np.nan
df.loc[df.sample(8, random_state=3).index, "umur"] = 999          # nilai mustahil
df.loc[df.sample(12, random_state=4).index, "gaji_juta"] = 900    # outlier
df = pd.concat([df, df.head(25)], ignore_index=True)              # duplikat
 
print("Ukuran data:", df.shape)
```
 
## Tahap 1: Pemeriksaan Awal Tanpa Grafik
 
Sebelum menggambar apa pun, lihat dulu strukturnya.
 
### Empat Perintah Pembuka
 
```python
print(df.shape)          # berapa baris, berapa kolom
print(df.head())         # lima baris pertama
print(df.dtypes)         # tipe tiap kolom
df.info()                # gabungan tipe, jumlah terisi, dan penggunaan memori
```
 
#### Yang Diperiksa dari Sini
 
**Apakah tipe kolomnya benar?** Kolom angka yang terbaca sebagai `object` berarti ada karakter pengganggu di dalamnya. Kolom tanggal yang terbaca sebagai `object` juga perlu dikonversi.
 
**Apakah ukurannya masuk akal?** Kalau Anda mengharapkan 5.000 baris tapi yang termuat 500, mungkin ada kesalahan saat membaca berkas.
 
### Ringkasan Statistik
 
```python
print(df.describe().T.round(2))              # kolom numerik
print(df.describe(include="object").T)       # kolom teks
```
 
#### Cara Membacanya
 
**Lihat baris `min` dan `max` lebih dulu.** Umur maksimal 999 langsung terlihat mustahil. Gaji maksimal 900 juta di antara gaji rata-rata 10 jutaan menandakan ada outlier.
 
**Bandingkan `mean` dan `50%` (median).** Kalau selisihnya besar, data itu miring atau punya outlier. Ini langsung menentukan pilihan cara mengisi sel kosong nanti.
 
**Lihat `count`.** Kalau nilainya berbeda antar kolom, berarti ada sel kosong.
 
### Fungsi Ringkasan Buatan Sendiri
 
Fungsi ini merangkum semua yang perlu diketahui dalam satu tabel.
 
```python
def periksa(data):
    hasil = pd.DataFrame({
        "tipe": data.dtypes.astype(str),
        "kosong": data.isna().sum(),
        "persen_kosong": (data.isna().mean() * 100).round(1),
        "unik": data.nunique(),
        "contoh": data.apply(lambda k: k.dropna().iloc[0] if k.notna().any() else None),
    })
    hasil["catatan"] = np.where(
        hasil["unik"] == 1, "KONSTAN - buang",
        np.where(hasil["unik"] > 0.9 * len(data), "HAMPIR UNIK - cek apakah ID",
                 np.where(hasil["persen_kosong"] > 50, "BANYAK KOSONG", "")))
    return hasil.sort_values("persen_kosong", ascending=False)
 
print(periksa(df))
```
 
### Memeriksa Duplikat dan Kardinalitas
 
```python
print("Baris duplikat penuh:", df.duplicated().sum())
print("ID yang muncul lebih dari sekali:", df["id_pelanggan"].duplicated().sum())
 
# Kolom kategori: berapa banyak nilai unik masing-masing
for kolom in df.select_dtypes(include="object").columns:
    print(f"\n{kolom} ({df[kolom].nunique()} nilai unik):")
    print(df[kolom].value_counts().head())
```
 
Perhatikan keluaran kolom `kota`. Akan terlihat `"Jakarta"` dan `"jakarta"` sebagai dua kategori terpisah, serta `"Surabaya "` dengan spasi di belakang. Masalah ini hampir mustahil terlihat tanpa memeriksa daftar nilainya.
 
### Daftar Periksa Tahap Awal
 
- Ukuran data sesuai harapan
- Tipe tiap kolom benar
- Tidak ada kolom konstan
- Kolom ID sudah dikenali dan akan dibuang
- Sudah tahu berapa persen sel kosong tiap kolom
- Sudah tahu jumlah duplikat
- Sudah melihat daftar nilai tiap kolom kategori
## Tahap 2: Melihat Satu Kolom
 
Tahap ini disebut analisis univariat, artinya memeriksa satu kolom pada satu waktu.
 
### Melihat Kolom Target Lebih Dulu
 
Ini yang harus dilihat pertama, karena menentukan banyak keputusan selanjutnya.
 
```python
fig, ax = plt.subplots(1, 2, figsize=(11, 4))
 
sns.countplot(data=df, x="berhenti", ax=ax[0])
ax[0].set_title("Jumlah tiap kelas")
 
proporsi = df["berhenti"].value_counts(normalize=True)
ax[1].pie(proporsi, labels=["Bertahan", "Berhenti"], autopct="%1.1f%%")
ax[1].set_title("Proporsi")
 
plt.tight_layout()
plt.show()
 
print(df["berhenti"].value_counts(normalize=True).round(4))
```
 
#### Keputusan yang Langsung Diambil
 
Kalau kelasnya timpang, misalnya di bawah 20 persen untuk kelas minoritas, Anda sudah tahu tiga hal sebelum memodelkan:
 
- Jangan pakai akurasi sebagai metrik
- Pakai `stratify=y` saat membagi data
- Pertimbangkan `class_weight="balanced"`
### Histogram untuk Kolom Numerik
 
Histogram menunjukkan bentuk sebaran: nilai mana yang sering muncul dan mana yang jarang.
 
```python
kolom_numerik = ["umur", "gaji_juta", "lama_langganan_bulan",
                 "jumlah_komplain", "skor_kepuasan", "jumlah_login"]
 
fig, ax = plt.subplots(2, 3, figsize=(15, 7))
for i, kolom in enumerate(kolom_numerik):
    sns.histplot(data=df, x=kolom, bins=30, kde=True, ax=ax.flat[i])
    ax.flat[i].set_title(kolom)
plt.tight_layout()
plt.show()
```
 
#### Cara Membacanya
 
**Bentuk lonceng simetris** berarti data mendekati normal. Aman memakai rata-rata dan `StandardScaler`.
 
**Ekor panjang ke kanan** berarti miring. Pakai median untuk mengisi sel kosong, dan pertimbangkan transformasi logaritma.
 
**Dua puncak** berarti kemungkinan ada dua kelompok berbeda tercampur dalam satu kolom. Ini temuan penting yang layak diselidiki.
 
**Ada batang jauh terpisah di ujung** berarti ada outlier. Pada kolom `umur`, batang di angka 999 akan terlihat jelas.
 
**Menumpuk di satu titik** berarti kolomnya nyaris konstan dan mungkin tidak berguna.
 
#### Argumen yang Perlu Diketahui
 
`bins` mengatur jumlah batang. Terlalu sedikit menyembunyikan detail, terlalu banyak membuat grafik berisik. Mulai dari 30.
 
`kde=True` menambahkan garis halus yang memperjelas bentuk sebarannya.
 
### Boxplot untuk Melihat Outlier
 
Boxplot merangkum sebaran dalam satu bentuk ringkas dan sangat baik untuk melihat outlier.
 
```python
fig, ax = plt.subplots(2, 3, figsize=(15, 6))
for i, kolom in enumerate(kolom_numerik):
    sns.boxplot(data=df, x=kolom, ax=ax.flat[i])
    ax.flat[i].set_title(kolom)
plt.tight_layout()
plt.show()
```
 
#### Cara Membaca Boxplot
 
**Kotaknya** mencakup 50 persen data di tengah, dari persentil 25 sampai 75.
 
**Garis di dalam kotak** adalah median.
 
**Garis panjang di kiri dan kanan (kumis)** menjangkau data yang masih dianggap wajar.
 
**Titik-titik di luar kumis** adalah kandidat outlier.
 
Kalau median tidak berada di tengah kotak, artinya data itu miring.
 
### Menggabungkan Histogram dan Boxplot
 
Kombinasi keduanya memberi gambaran paling lengkap untuk satu kolom.
 
```python
def gambar_kolom_numerik(data, kolom):
    fig, ax = plt.subplots(2, 1, figsize=(8, 5), sharex=True,
                           gridspec_kw={"height_ratios": [3, 1]})
    sns.histplot(data=data, x=kolom, bins=40, kde=True, ax=ax[0])
    ax[0].axvline(data[kolom].mean(), color="red", ls="--", label="Rata-rata")
    ax[0].axvline(data[kolom].median(), color="green", ls="--", label="Median")
    ax[0].legend()
    sns.boxplot(data=data, x=kolom, ax=ax[1])
    ax[0].set_title(f"Sebaran {kolom}")
    plt.tight_layout()
    plt.show()
 
    print(f"Kemiringan: {data[kolom].skew():.3f}")
    print(f"Rata-rata {data[kolom].mean():.2f} vs Median {data[kolom].median():.2f}")
 
gambar_kolom_numerik(df, "gaji_juta")
```
 
Perhatikan jarak antara garis merah (rata-rata) dan hijau (median). Kalau berjauhan, itu bukti visual bahwa data miring atau ada outlier.
 
### Countplot untuk Kolom Kategori
 
```python
fig, ax = plt.subplots(1, 2, figsize=(13, 4))
 
sns.countplot(data=df, y="kota", order=df["kota"].value_counts().index, ax=ax[0])
ax[0].set_title("Jumlah per kota")
 
sns.countplot(data=df, x="paket", order=["basic", "premium", "vip"], ax=ax[1])
ax[1].set_title("Jumlah per paket")
 
plt.tight_layout()
plt.show()
```
 
#### Tips Praktis
 
**Pakai `y=` bukan `x=`** kalau nama kategorinya panjang, supaya label tidak bertumpuk.
 
**Pakai `order=`** untuk mengurutkan. Urutkan berdasarkan jumlah untuk kategori nominal, atau berdasarkan urutan logis untuk kategori berjenjang seperti paket.
 
**Perhatikan kategori yang sangat jarang.** Kategori dengan kurang dari 1 persen data sebaiknya digabung jadi kelompok "lainnya" saat encoding nanti.
 
#### Kalau Kategorinya Terlalu Banyak
 
Grafik dengan 200 kategori tidak terbaca. Tampilkan 15 teratas saja.
 
```python
teratas = df["kota"].value_counts().head(15).index
sns.countplot(data=df[df["kota"].isin(teratas)], y="kota", order=teratas)
plt.title("15 kota terbanyak")
plt.show()
```
 
## Tahap 3: Melihat Hubungan Dua Kolom
 
Tahap ini disebut analisis bivariat. Di sinilah temuan yang paling berguna biasanya muncul.
 
### Fitur Numerik terhadap Target Kategorikal
 
Ini yang paling penting untuk masalah klasifikasi. Pertanyaannya: apakah kolom ini bisa membedakan kedua kelas?
 
```python
fig, ax = plt.subplots(2, 3, figsize=(15, 7))
for i, kolom in enumerate(kolom_numerik):
    sns.boxplot(data=df, x="berhenti", y=kolom, ax=ax.flat[i])
    ax.flat[i].set_title(f"{kolom} vs berhenti")
plt.tight_layout()
plt.show()
```
 
#### Cara Membacanya
 
**Kalau kedua kotak berada di ketinggian yang jelas berbeda**, kolom itu berguna untuk membedakan kelas.
 
**Kalau kedua kotak hampir bertumpuk**, kolom itu kemungkinan tidak informatif.
 
Pada data contoh kita, `lama_langganan_bulan`, `jumlah_komplain`, dan `skor_kepuasan` akan menunjukkan perbedaan jelas, sementara `umur`, `gaji_juta`, dan `jumlah_login` akan terlihat bertumpuk.
 
Ini sesuai dengan aturan yang kita tetapkan saat membuat data, jadi grafiknya bekerja dengan benar.
 
### Alternatif: Sebaran Bertumpuk
 
```python
fig, ax = plt.subplots(1, 3, figsize=(15, 4))
for i, kolom in enumerate(["skor_kepuasan", "jumlah_komplain", "lama_langganan_bulan"]):
    sns.kdeplot(data=df, x=kolom, hue="berhenti", fill=True,
                common_norm=False, ax=ax[i])
    ax[i].set_title(kolom)
plt.tight_layout()
plt.show()
```
 
Argumen `common_norm=False` penting. Tanpa itu, kelas yang jumlahnya sedikit akan terlihat sangat rendah dan sulit dibandingkan.
 
Makin sedikit tumpang tindih antara dua kurva warna, makin kuat kolom itu memisahkan kelas.
 
### Fitur Kategorikal terhadap Target
 
```python
fig, ax = plt.subplots(1, 2, figsize=(13, 4))
 
# Proporsi berhenti per kategori, lebih informatif daripada jumlah mentah
sns.barplot(data=df, x="paket", y="berhenti", order=["basic", "premium", "vip"],
            errorbar=("ci", 95), ax=ax[0])
ax[0].set_ylabel("Proporsi berhenti")
ax[0].set_title("Tingkat berhenti per paket")
 
sns.barplot(data=df, y="kota", x="berhenti",
            order=df.groupby("kota")["berhenti"].mean().sort_values().index, ax=ax[1])
ax[1].set_xlabel("Proporsi berhenti")
ax[1].set_title("Tingkat berhenti per kota")
 
plt.tight_layout()
plt.show()
```
 
#### Kenapa Proporsi Lebih Baik daripada Jumlah
 
Kalau Anda menggambar jumlah pelanggan yang berhenti per kota, kota besar akan selalu menang cuma karena penduduknya banyak. Yang informatif adalah **proporsinya**.
 
Garis tegak kecil pada tiap batang adalah rentang kepercayaan. Kalau garisnya panjang, artinya data untuk kategori itu sedikit sehingga angkanya belum bisa dipercaya.
 
### Numerik terhadap Numerik
 
```python
fig, ax = plt.subplots(1, 2, figsize=(13, 4.5))
 
sns.scatterplot(data=df, x="lama_langganan_bulan", y="skor_kepuasan",
                hue="berhenti", alpha=0.5, ax=ax[0])
ax[0].set_title("Scatter plot dengan pewarnaan kelas")
 
sns.scatterplot(data=df, x="umur", y="gaji_juta", alpha=0.4, ax=ax[1])
ax[1].set_title("Umur vs gaji")
 
plt.tight_layout()
plt.show()
```
 
#### Tips untuk Scatter Plot
 
**Pakai `alpha`** antara 0,3 dan 0,6 kalau titiknya banyak, supaya kepadatan terlihat.
 
**Pakai `hue="target"`** untuk mewarnai berdasarkan kelas. Kalau warna terpisah rapi, dua kolom itu bersama-sama bisa memisahkan kelas dengan baik.
 
**Kalau titiknya lebih dari 5.000**, ambil sampel dulu atau pakai `sns.histplot` dua dimensi supaya tidak menumpuk jadi gumpalan hitam.
 
### Kategori terhadap Kategori
 
```python
tabel = pd.crosstab(df["paket"], df["berhenti"], normalize="index")
 
plt.figure(figsize=(6, 3.5))
sns.heatmap(tabel, annot=True, fmt=".2%", cmap="Blues")
plt.title("Proporsi berhenti per paket")
plt.tight_layout()
plt.show()
```
 
Argumen `normalize="index"` membuat tiap baris berjumlah 100 persen, sehingga perbandingan antar kategori jadi adil.
 
## Tahap 4: Melihat Banyak Kolom Sekaligus
 
### Peta Korelasi
 
```python
numerik = df[kolom_numerik + ["berhenti"]]
korelasi = numerik.corr()
 
plt.figure(figsize=(8, 6))
mask = np.triu(np.ones_like(korelasi, dtype=bool))     # sembunyikan separuh atas
sns.heatmap(korelasi, mask=mask, annot=True, fmt=".2f",
            cmap="coolwarm", center=0, vmin=-1, vmax=1, square=True)
plt.title("Peta korelasi")
plt.tight_layout()
plt.show()
```
 
#### Tiga Hal yang Dicari
 
**Kolom yang berkorelasi kuat dengan target.** Lihat baris `berhenti`. Nilai yang jauh dari nol menandakan kolom itu berpotensi berguna.
 
**Kolom yang saling berkorelasi sangat tinggi.** Nilai di atas 0,95 antar dua fitur berarti keduanya nyaris kembar. Salah satunya bisa dibuang.
 
**Korelasi yang terlalu sempurna dengan target.** Kalau ada kolom yang korelasinya di atas 0,95 dengan target, curigai kebocoran data. Kolom itu mungkin dibuat setelah target diketahui.
 
```python
# Mencari pasangan kolom yang nyaris kembar
atas = korelasi.abs().where(np.triu(np.ones(korelasi.shape), k=1).astype(bool))
kembar = [(a, b, round(atas.loc[a, b], 3))
          for a in atas.index for b in atas.columns
          if pd.notna(atas.loc[a, b]) and atas.loc[a, b] > 0.9]
print("Pasangan berkorelasi tinggi:", kembar)
```
 
#### Keterbatasan Peta Korelasi
 
Korelasi Pearson hanya menangkap hubungan **lurus**. Hubungan berbentuk U akan terbaca nol padahal sangat kuat. Karena itu, peta korelasi adalah penyaring awal, bukan kesimpulan akhir.
 
### Pairplot
 
```python
sampel = df.sample(500, random_state=42)
sns.pairplot(sampel[["lama_langganan_bulan", "jumlah_komplain",
                     "skor_kepuasan", "berhenti"]],
             hue="berhenti", diag_kind="kde", plot_kws={"alpha": 0.5})
plt.suptitle("Pairplot", y=1.01)
plt.show()
```
 
Pairplot menampilkan semua pasangan kolom sekaligus, dengan sebaran tiap kolom di garis diagonalnya.
 
#### Kapan Tidak Berguna
 
Pairplot menjadi tidak terbaca kalau kolomnya lebih dari sekitar 6, karena grafiknya jadi 36 kotak kecil. Untuk data lebar, pilih dulu kolom paling penting berdasarkan peta korelasi.
 
Pairplot juga lambat pada data besar. Selalu ambil sampel dulu.
 
## Tahap 5: Memeriksa Hal-hal Khusus
 
### Memeriksa Pola Nilai Hilang
 
Pertanyaannya bukan cuma berapa banyak yang kosong, tapi apakah kekosongan itu punya pola.
 
```python
fig, ax = plt.subplots(1, 2, figsize=(13, 4))
 
kosong = df.isna().sum().sort_values(ascending=False)
kosong = kosong[kosong > 0]
sns.barplot(x=kosong.values, y=kosong.index, ax=ax[0])
ax[0].set_title("Jumlah sel kosong per kolom")
 
sns.heatmap(df.isna().iloc[:300], cbar=False, ax=ax[1])
ax[1].set_title("Peta sel kosong (300 baris pertama)")
 
plt.tight_layout()
plt.show()
```
 
Pada peta sel kosong, garis-garis mendatar yang sejajar menandakan beberapa kolom kosong bersamaan. Itu petunjuk bahwa kekosongannya punya sebab bersama, bukan acak.
 
### Apakah Kekosongan Itu Bermakna
 
```python
for kolom in ["gaji_juta", "skor_kepuasan"]:
    kosong = df[kolom].isna()
    print(f"{kolom}:")
    print(f"  Tingkat berhenti saat kosong  : {df.loc[kosong, 'berhenti'].mean():.3f}")
    print(f"  Tingkat berhenti saat terisi  : {df.loc[~kosong, 'berhenti'].mean():.3f}")
```
 
Kalau angkanya berbeda jauh, fakta bahwa selnya kosong justru membawa informasi. Tambahkan penanda kosong sebagai fitur baru lewat `SimpleImputer(add_indicator=True)`.
 
### Memeriksa Outlier Secara Sistematis
 
```python
def laporan_outlier(data, kolom_list):
    baris = []
    for k in kolom_list:
        s = data[k].dropna()
        q1, q3 = s.quantile([0.25, 0.75])
        iqr = q3 - q1
        bawah, atas = q1 - 1.5 * iqr, q3 + 1.5 * iqr
        n_out = ((s < bawah) | (s > atas)).sum()
        baris.append({
            "kolom": k, "outlier": n_out,
            "persen": round(n_out / len(s) * 100, 2),
            "batas_bawah": round(bawah, 2), "batas_atas": round(atas, 2),
            "nilai_maks": round(s.max(), 2),
        })
    return pd.DataFrame(baris).sort_values("persen", ascending=False)
 
print(laporan_outlier(df, kolom_numerik).to_string(index=False))
```
 
Perhatikan kolom `nilai_maks`. Kalau nilainya jauh melampaui `batas_atas`, itu tanda ada nilai ekstrem yang perlu diselidiki asal-usulnya.
 
### Memeriksa Data Berurutan Waktu
 
Kalau data Anda punya kolom tanggal, dua pemeriksaan ini wajib.
 
```python
# Contoh dengan data waktu buatan
tanggal = pd.date_range("2024-01-01", periods=len(df), freq="h")
df_waktu = df.assign(tanggal=tanggal)
 
fig, ax = plt.subplots(2, 1, figsize=(11, 6))
 
harian = df_waktu.set_index("tanggal").resample("D").size()
ax[0].plot(harian.index, harian.values)
ax[0].set_title("Jumlah data per hari (cek apakah ada bolong)")
 
tingkat = df_waktu.set_index("tanggal")["berhenti"].resample("W").mean()
ax[1].plot(tingkat.index, tingkat.values, marker="o")
ax[1].set_title("Tingkat berhenti per minggu (cek apakah polanya berubah)")
 
plt.tight_layout()
plt.show()
```
 
#### Kenapa Ini Penting
 
**Kalau ada periode yang datanya kosong**, mungkin ada masalah pengumpulan data yang perlu diketahui.
 
**Kalau tingkat target berubah drastis dari waktu ke waktu**, artinya pola datanya bergeser. Model yang dilatih dengan data lama mungkin tidak berlaku untuk data baru, dan Anda wajib memakai `TimeSeriesSplit`.
 
## Membuat Grafik yang Enak Dibaca
 
### Lima Aturan Dasar
 
**Selalu beri judul dan label sumbu.** Grafik tanpa keterangan tidak berarti apa-apa bagi orang lain, dan bagi Anda sendiri seminggu kemudian.
 
**Satu grafik menyampaikan satu pesan.** Kalau harus menjelaskan panjang lebar supaya grafiknya dimengerti, pecah jadi beberapa grafik.
 
**Urutkan kategori secara bermakna.** Berdasarkan besaran nilainya, bukan berdasarkan abjad.
 
**Jangan pakai warna sebagai satu-satunya pembeda.** Sekitar 8 persen pria mengalami buta warna. Tambahkan bentuk atau label.
 
**Sertakan satuan.** "Gaji" tidak cukup jelas, "Gaji (juta rupiah)" jauh lebih baik.
 
### Kesalahan Visual yang Sering Terjadi
 
**Sumbu tegak tidak dimulai dari nol pada grafik batang.** Ini membuat perbedaan kecil terlihat dramatis. Untuk grafik batang, sumbu harus mulai dari nol. Untuk grafik garis, ini boleh selama diberi keterangan.
 
**Terlalu banyak kategori.** Grafik dengan 50 batang tidak terbaca. Tampilkan yang teratas saja lalu gabungkan sisanya sebagai "lainnya".
 
**Diagram lingkaran dengan banyak potongan.** Mata manusia buruk membandingkan luas juring. Kalau kategorinya lebih dari 4, pakai grafik batang.
 
**Titik menumpuk pada scatter plot.** Kalau titiknya sangat banyak, hasilnya jadi gumpalan hitam tanpa informasi. Pakai `alpha` atau ambil sampel.
 
### Contoh Grafik yang Rapi
 
```python
fig, ax = plt.subplots(figsize=(8, 4.5))
 
data_gambar = (df.groupby("paket")["berhenti"].mean()
               .sort_values(ascending=False))
 
sns.barplot(x=data_gambar.values, y=data_gambar.index, ax=ax, color="steelblue")
 
for i, nilai in enumerate(data_gambar.values):
    ax.text(nilai + 0.005, i, f"{nilai:.1%}", va="center")
 
ax.set_xlabel("Proporsi pelanggan yang berhenti")
ax.set_ylabel("")
ax.set_title("Tingkat berhenti berlangganan menurut jenis paket",
             fontsize=13, weight="bold")
ax.set_xlim(0, data_gambar.max() * 1.2)
sns.despine()
plt.tight_layout()
plt.show()
```
 
### Menyimpan Grafik
 
```python
plt.savefig("grafik.png", dpi=300, bbox_inches="tight")
```
 
Argumen `bbox_inches="tight"` mencegah label terpotong, dan `dpi=300` menghasilkan gambar yang tajam untuk laporan.
 
## Daftar Periksa EDA yang Bisa Dipakai Ulang
 
### Fungsi Otomatis
 
```python
def eda_cepat(data, target=None):
    print("=" * 60)
    print(f"UKURAN: {data.shape[0]} baris, {data.shape[1]} kolom")
    print(f"Duplikat penuh: {data.duplicated().sum()}")
    print("=" * 60)
 
    print("\n--- RINGKASAN KOLOM ---")
    print(periksa(data).to_string())
 
    numerik = data.select_dtypes(include=np.number).columns.tolist()
    kategori = data.select_dtypes(include="object").columns.tolist()
    if target in numerik:
        numerik.remove(target)
 
    if numerik:
        print("\n--- SEBARAN KOLOM NUMERIK ---")
        n = len(numerik)
        fig, ax = plt.subplots((n + 2) // 3, 3, figsize=(15, 3 * ((n + 2) // 3)))
        for i, k in enumerate(numerik):
            sns.histplot(data=data, x=k, bins=30, ax=np.ravel(ax)[i])
        plt.tight_layout(); plt.show()
 
    if target and target in data.columns:
        print(f"\n--- SEBARAN TARGET: {target} ---")
        print(data[target].value_counts(normalize=True).round(4))
 
        if numerik:
            fig, ax = plt.subplots((len(numerik) + 2) // 3, 3,
                                   figsize=(15, 3 * ((len(numerik) + 2) // 3)))
            for i, k in enumerate(numerik):
                sns.boxplot(data=data, x=target, y=k, ax=np.ravel(ax)[i])
            plt.suptitle("Tiap fitur terhadap target", y=1.0)
            plt.tight_layout(); plt.show()
 
    if len(numerik) > 1:
        print("\n--- KORELASI ---")
        plt.figure(figsize=(8, 6))
        sns.heatmap(data[numerik].corr(), annot=True, fmt=".2f",
                    cmap="coolwarm", center=0)
        plt.tight_layout(); plt.show()
 
eda_cepat(df.drop(columns="id_pelanggan"), target="berhenti")
```
 
### Urutan Langkah yang Disarankan
 
1. Periksa ukuran, tipe kolom, dan duplikat
2. Lihat ringkasan per kolom, terutama sel kosong dan kardinalitas
3. Lihat sebaran target lebih dulu
4. Gambar histogram dan boxplot tiap kolom numerik
5. Gambar countplot tiap kolom kategori
6. Gambar tiap fitur terhadap target
7. Buat peta korelasi, cari kolom kembar dan tanda kebocoran
8. Periksa pola sel kosong dan outlier
9. Kalau ada kolom waktu, periksa apakah polanya berubah
10. Catat temuan dan tindakan yang akan diambil
## Dari Temuan Menjadi Keputusan Pemodelan
 
Tabel ini menghubungkan apa yang Anda lihat dengan apa yang harus dilakukan.
 
| Yang terlihat di grafik | Artinya | Tindakan |
|---|---|---|
| Histogram miring ke kanan | Data tidak simetris | Isi kosong dengan median, coba `np.log1p` |
| Titik jauh terpisah di boxplot | Ada outlier | Selidiki asalnya, pakai `RobustScaler` |
| Nilai mustahil seperti umur 999 | Penanda kosong tersamar | Ubah jadi `NaN` |
| Target sangat timpang | Kelas minoritas jarang | Ganti metrik, pakai `class_weight` |
| Boxplot dua kelas bertumpuk | Fitur tidak informatif | Kandidat untuk dibuang |
| Boxplot dua kelas terpisah jelas | Fitur berguna | Pastikan tidak bocor |
| Korelasi antar fitur di atas 0,95 | Kolom kembar | Buang salah satunya |
| Korelasi dengan target di atas 0,95 | Curigai kebocoran | Selidiki asal kolom itu |
| Histogram dua puncak | Ada dua kelompok tercampur | Cari kolom pembeda kelompoknya |
| Kategori dengan sangat sedikit data | Kardinalitas bermasalah | Gabung jadi "lainnya" |
| Sel kosong berpola | Kekosongan bermakna | Pakai `add_indicator=True` |
| Tingkat target berubah antar waktu | Pola bergeser | Pakai `TimeSeriesSplit` |
| Kolom hampir semua nilai unik | Kemungkinan kolom ID | Buang sebelum memodelkan |
 
## Kesalahan Pemula yang Sering Terjadi
 
### Melewati EDA dan Langsung Memodelkan
 
Ini menghemat sepuluh menit di awal dan sering menghabiskan dua hari di akhir untuk mencari tahu kenapa hasilnya aneh.
 
### Hanya Melihat describe() Tanpa Menggambar
 
Angka ringkasan bisa identik untuk data yang bentuknya sangat berbeda. Demonstrasi di awal artikel ini menunjukkannya.
 
### Melakukan EDA pada Seluruh Data Termasuk Data Uji
 
Ini bentuk kebocoran yang halus. Kalau Anda memeriksa data uji lalu mengambil keputusan berdasarkan apa yang Anda lihat, keputusan itu sudah dipengaruhi data uji.
 
Lakukan EDA mendalam hanya pada data latih. Melihat ukuran dan tipe kolom data uji masih boleh, tapi jangan memeriksa sebaran atau hubungannya dengan target.
 
### Menyimpulkan Sebab-Akibat dari Grafik
 
Grafik yang menunjukkan pelanggan dengan banyak komplain lebih sering berhenti tidak berarti komplain menyebabkan mereka berhenti. Keduanya bisa saja disebabkan hal ketiga.
 
### Menggambar Semua Kolom Sekaligus pada Data Lebar
 
Pairplot dengan 50 kolom menghasilkan 2.500 grafik kecil yang tidak terbaca. Saring dulu berdasarkan korelasi.
 
### Mengabaikan Kolom Kategori
 
Banyak pemula hanya memeriksa kolom numerik karena `describe()` secara bawaan hanya menampilkan itu. Padahal masalah seperti penulisan tidak seragam hanya terlihat kalau daftar nilainya diperiksa.
 
### Tidak Mencatat Temuan
 
EDA menghasilkan puluhan temuan kecil. Tanpa catatan, sebagian besar akan terlupakan saat mulai memodelkan. Tulis daftar temuan beserta tindakan yang akan diambil.
 
### Membuat Grafik Cantik tapi Tidak Menjawab Apa Pun
 
Tanyakan pada diri sendiri sebelum membuat grafik: pertanyaan apa yang ingin dijawab? Kalau tidak ada jawabannya, grafik itu tidak perlu dibuat.
 
## Penutup
 
EDA bukan formalitas sebelum bagian yang menarik dimulai. Ini justru tahap di mana Anda memahami masalah yang sedang dikerjakan, dan pemahaman itu menentukan hampir semua keputusan berikutnya.
 
Tiga hal untuk diingat:
 
**Pertama**, selalu gambar datanya. Ringkasan statistik bisa identik untuk data yang bentuknya sangat berbeda, dan perbedaan itu menentukan cara penanganannya.
 
**Kedua**, lihat sebaran target lebih dulu, lalu tiap fitur terhadap target. Dua langkah ini saja sudah menjawab sebagian besar pertanyaan penting sebelum memodelkan.
 
**Ketiga**, catat setiap temuan beserta tindakan yang akan diambil. EDA yang tidak berujung pada keputusan konkret hanyalah kumpulan grafik yang bagus dilihat.
 