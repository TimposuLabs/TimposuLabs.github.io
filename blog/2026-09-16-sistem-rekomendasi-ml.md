---
slug: sistem-rekomendasi-ml
title: "Sistem Rekomendasi: Panduan Machine Learning untuk Pemula #15"
authors: topekox
tags: [manchine learning, data mining, ai, data science, python]
---

Setiap kali Netflix menyarankan film, Spotify menyusun playlist, atau Tokopedia menampilkan "produk yang mungkin Anda suka", ada sistem rekomendasi yang bekerja di baliknya.
 
Masalahnya terlihat sederhana: tebak apa yang akan disukai seseorang. Tapi aturan mainnya cukup berbeda dari klasifikasi dan regresi biasa, dan sebagian besar teknik yang sudah Anda kuasai tidak langsung berlaku.
 
Artikel ini membahas dua pendekatan utama, yaitu collaborative filtering dan matrix factorization, dari ide dasarnya sampai implementasi yang bisa dijalankan.

<!-- truncate -->

## Daftar Isi
 
1. Kenapa Sistem Rekomendasi Berbeda
2. Istilah Dasar yang Perlu Dipahami
3. Menyiapkan Data Contoh
4. Baseline yang Wajib Dibuat
5. Content-Based Filtering
6. Collaborative Filtering
7. Matrix Factorization
8. Mengevaluasi Sistem Rekomendasi
9. Masalah Praktis di Dunia Nyata
10. Memilih Pendekatan yang Tepat
11. Kesalahan Pemula yang Sering Terjadi
## Kenapa Sistem Rekomendasi Berbeda
 
### Bedanya dari Masalah Biasa
 
Pada klasifikasi, Anda punya tabel rapi: tiap baris satu contoh, tiap kolom satu fitur, dan satu kolom target.
 
Pada rekomendasi, datanya berbentuk berbeda. Anda punya daftar siapa menyukai apa, dan tugasnya menebak sisanya.
 
| Aspek | Klasifikasi biasa | Sistem rekomendasi |
|---|---|---|
| Bentuk data | Tabel fitur dan target | Daftar interaksi pengguna-item |
| Yang diprediksi | Satu label per baris | Peringkat banyak item per pengguna |
| Kelengkapan data | Biasanya lengkap | Sangat kosong, 95 sampai 99 persen |
| Keluaran | Satu jawaban | Daftar urut beberapa item |
| Metrik | Akurasi, F1 | Precision@K, NDCG |
 
### Masalah Utamanya: Data Sangat Kosong
 
Bayangkan sebuah layanan dengan 1 juta pengguna dan 100 ribu film.
 
Kombinasi yang mungkin ada 100 miliar. Tapi rata-rata orang hanya menonton beberapa puluh film. Artinya lebih dari 99,99 persen kotak dalam tabel itu kosong.
 
Tugas sistem rekomendasi adalah menebak isi kotak-kotak kosong tersebut.
 
### Kenapa Ini Menarik
 
Yang menarik, kekosongan itu sendiri membawa informasi. Fakta bahwa seseorang belum menonton film tertentu bisa berarti dia belum tahu, atau bisa berarti dia tidak tertarik. Membedakan keduanya adalah bagian dari tantangannya.
 
## Istilah Dasar yang Perlu Dipahami
 
### Pengguna, Item, dan Interaksi
 
**Pengguna (user)** adalah orang yang akan diberi rekomendasi.
 
**Item** adalah hal yang direkomendasikan: film, produk, lagu, artikel.
 
**Interaksi** adalah catatan hubungan antara keduanya: rating, pembelian, klik, atau durasi menonton.
 
### Umpan Balik Eksplisit dan Implisit
 
Ini pembedaan yang penting karena mempengaruhi pilihan metode.
 
**Eksplisit** adalah penilaian yang sengaja diberikan pengguna, misalnya bintang 1 sampai 5. Datanya jelas tapi jumlahnya sedikit, karena kebanyakan orang malas memberi rating.
 
**Implisit** adalah perilaku yang tercatat otomatis: klik, pembelian, lama menonton. Jumlahnya jauh lebih banyak, tapi maknanya ambigu. Seseorang mengklik produk bisa berarti tertarik, bisa juga salah pencet.
 
Yang penting dipahami: pada data implisit, **tidak ada sinyal negatif**. Kalau seseorang tidak mengklik sesuatu, Anda tidak tahu apakah dia tidak suka atau sekadar belum melihatnya.
 
### Matriks Pengguna-Item
 
Ini cara standar menyusun data rekomendasi: tabel dengan pengguna sebagai baris dan item sebagai kolom.
 
```
           Film A  Film B  Film C  Film D
Andi          5       ?       3       ?
Budi          ?       4       ?       5
Citra         4       ?       ?       2
```
 
Tanda tanya adalah yang harus ditebak.
 
### Sparsity
 
**Sparsity** adalah persentase kotak yang kosong. Nilainya biasanya di atas 95 persen, dan pada layanan besar bisa mencapai 99,9 persen.
 
### Cold Start
 
**Cold start** adalah masalah saat pengguna atau item baru muncul tanpa riwayat apa pun.
 
Untuk pengguna baru, sistem tidak tahu apa-apa tentang seleranya. Untuk item baru, tidak ada yang pernah menilainya. Ini masalah nyata yang setiap sistem rekomendasi harus tangani.
 
## Menyiapkan Data Contoh
 
Kita akan membuat data rating film dengan struktur tersembunyi yang kita ketahui. Nanti bisa diperiksa apakah metodenya berhasil menemukan struktur itu.
 
```python
import numpy as np
import pandas as pd
 
np.random.seed(42)
 
n_pengguna = 300
n_film = 120
n_faktor_asli = 3        # 3 "genre tersembunyi"
 
# Tiap pengguna punya kecenderungan terhadap 3 genre
selera = np.random.rand(n_pengguna, n_faktor_asli)
# Tiap film punya kadar 3 genre itu
sifat_film = np.random.rand(n_film, n_faktor_asli)
 
# Rating sebenarnya = kecocokan selera dengan sifat film
rating_penuh = 1 + 4 * (selera @ sifat_film.T) / n_faktor_asli
rating_penuh += np.random.randn(n_pengguna, n_film) * 0.3
rating_penuh = np.clip(rating_penuh, 1, 5)
 
# Hanya sebagian kecil yang benar-benar tercatat
topeng = np.random.rand(n_pengguna, n_film) < 0.06     # 6 persen terisi
matriks = np.where(topeng, rating_penuh.round(1), np.nan)
 
judul_film = [f"Film_{i:03d}" for i in range(n_film)]
nama_pengguna = [f"User_{i:03d}" for i in range(n_pengguna)]
 
df_matriks = pd.DataFrame(matriks, index=nama_pengguna, columns=judul_film)
 
print(df_matriks.iloc[:6, :8])
print(f"\nUkuran matriks: {df_matriks.shape}")
print(f"Rating tercatat: {(~np.isnan(matriks)).sum():,} dari {matriks.size:,}")
print(f"Sparsity: {np.isnan(matriks).mean():.2%}")
```
 
### Bentuk Panjang
 
Dalam praktik, data biasanya disimpan sebagai daftar interaksi, bukan matriks besar. Ini jauh lebih hemat ruang.
 
```python
df_panjang = (df_matriks.stack()
              .reset_index()
              .rename(columns={"level_0": "pengguna", "level_1": "film", 0: "rating"}))
 
print(df_panjang.head(10))
print("\nJumlah baris:", len(df_panjang))
print("Rata-rata rating:", round(df_panjang["rating"].mean(), 3))
```
 
Fungsi `stack()` otomatis membuang nilai kosong, sehingga hanya interaksi nyata yang tersimpan.
 
### Melihat Sebaran Data
 
```python
import matplotlib.pyplot as plt
 
fig, ax = plt.subplots(1, 3, figsize=(15, 3.8))
 
ax[0].hist(df_panjang["rating"], bins=20)
ax[0].set_title("Sebaran nilai rating")
 
per_pengguna = df_panjang.groupby("pengguna").size()
ax[1].hist(per_pengguna, bins=20)
ax[1].set_title(f"Rating per pengguna (median {per_pengguna.median():.0f})")
 
per_film = df_panjang.groupby("film").size()
ax[2].hist(per_film, bins=20)
ax[2].set_title(f"Rating per film (median {per_film.median():.0f})")
 
plt.tight_layout()
plt.show()
```
 
Pada data nyata, sebaran ini biasanya sangat timpang: sedikit item mendapat sangat banyak rating, sementara sebagian besar item nyaris tidak ada yang menilai. Fenomena ini disebut *long tail*.
 
### Membagi Data untuk Pengujian
 
Ini bagian yang aturan mainnya berbeda dari biasa.
 
```python
from sklearn.model_selection import train_test_split
 
# Membagi interaksi, BUKAN membagi pengguna
latih, uji = train_test_split(df_panjang, test_size=0.2, random_state=42)
 
print(f"Data latih: {len(latih):,} interaksi")
print(f"Data uji  : {len(uji):,} interaksi")
 
# Susun ulang jadi matriks, hanya dari data latih
matriks_latih = latih.pivot(index="pengguna", columns="film", values="rating")
matriks_latih = matriks_latih.reindex(index=nama_pengguna, columns=judul_film)
print("Bentuk matriks latih:", matriks_latih.shape)
```
 
#### Kenapa Membagi Interaksi, Bukan Pengguna
 
Kalau Anda memisahkan sebagian pengguna sepenuhnya ke data uji, model tidak akan tahu apa pun tentang mereka. Itu menguji kemampuan menangani cold start, bukan kemampuan merekomendasikan.
 
Untuk menguji kualitas rekomendasi umum, sebagian rating tiap pengguna disembunyikan, bukan seluruh penggunanya.
 
#### Catatan tentang Waktu
 
Kalau data Anda punya cap waktu, **bagilah berdasarkan waktu**, bukan acak. Latih dengan interaksi lama, uji dengan interaksi baru. Ini meniru situasi nyata dan mencegah model belajar dari masa depan.
 
## Baseline yang Wajib Dibuat
 
### Kenapa Sangat Penting
 
Ini bagian yang paling sering dilewati padahal paling menentukan.
 
Dalam sistem rekomendasi, **rekomendasi berdasarkan popularitas sering sangat sulit dikalahkan**. Banyak model rumit ternyata kalah dari sekadar menampilkan item terpopuler.
 
Kalau Anda tidak punya baseline, Anda tidak akan tahu itu.
 
### Tiga Baseline Standar
 
```python
rata_global = latih["rating"].mean()
 
# Baseline 1: tebak rata-rata global untuk semua
def tebak_global(pengguna, film):
    return rata_global
 
# Baseline 2: rata-rata rating film itu
rata_film = latih.groupby("film")["rating"].mean()
 
def tebak_rata_film(pengguna, film):
    return rata_film.get(film, rata_global)
 
# Baseline 3: gabungan kecenderungan pengguna dan film
rata_pengguna = latih.groupby("pengguna")["rating"].mean()
bias_pengguna = rata_pengguna - rata_global
bias_film = rata_film - rata_global
 
def tebak_bias(pengguna, film):
    hasil = (rata_global
             + bias_pengguna.get(pengguna, 0)
             + bias_film.get(film, 0))
    return np.clip(hasil, 1, 5)
```
 
### Mengukurnya
 
```python
from sklearn.metrics import mean_squared_error, mean_absolute_error
 
def ukur(fungsi_tebak, data_uji, nama):
    tebakan = [fungsi_tebak(r.pengguna, r.film) for r in data_uji.itertuples()]
    rmse = np.sqrt(mean_squared_error(data_uji["rating"], tebakan))
    mae = mean_absolute_error(data_uji["rating"], tebakan)
    print(f"{nama:28s} RMSE={rmse:.4f}  MAE={mae:.4f}")
    return rmse
 
rmse_global = ukur(tebak_global, uji, "Rata-rata global")
rmse_film = ukur(tebak_rata_film, uji, "Rata-rata per film")
rmse_bias = ukur(tebak_bias, uji, "Bias pengguna + film")
```
 
Baseline ketiga biasanya sudah cukup kuat. Model yang Anda bangun nanti harus mengalahkannya dengan selisih yang berarti.
 
### Kenapa Baseline Bias Efektif
 
Idenya sederhana. Ada tiga hal yang bisa dijelaskan tanpa mengetahui selera:
 
- Rata-rata umum semua rating
- Ada pengguna yang cenderung murah hati, ada yang cenderung pelit
- Ada film yang memang bagus, ada yang memang jelek
Ketiganya digabung sudah menjelaskan sebagian besar variasi rating. Sisanya barulah soal kecocokan selera, dan itulah yang dikerjakan model yang lebih canggih.
 
## Content-Based Filtering
 
### Idenya
 
Rekomendasikan item yang **mirip dengan yang pernah disukai pengguna**, berdasarkan ciri item itu sendiri.
 
Kalau seseorang menyukai film aksi bertema luar angkasa, rekomendasikan film aksi bertema luar angkasa lainnya.
 
### Cara Kerjanya
 
Tiap item digambarkan sebagai vektor ciri: genre, sutradara, kata kunci sinopsis. Lalu cari item yang vektornya paling dekat dengan yang sudah disukai pengguna.
 
```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
 
# Membuat deskripsi film buatan
genre = ["aksi", "drama", "komedi", "horor", "romantis", "fiksi ilmiah",
         "petualangan", "misteri", "animasi", "dokumenter"]
 
np.random.seed(1)
deskripsi = []
for i in range(n_film):
    pilihan = np.random.choice(genre, size=np.random.randint(2, 4), replace=False)
    deskripsi.append(" ".join(pilihan))
 
info_film = pd.DataFrame({"film": judul_film, "genre": deskripsi})
 
# Ubah teks genre jadi vektor, lalu hitung kemiripan antar film
tfidf = TfidfVectorizer()
matriks_ciri = tfidf.fit_transform(info_film["genre"])
kemiripan_konten = cosine_similarity(matriks_ciri)
 
def rekomendasi_konten(judul, jumlah=5):
    idx = judul_film.index(judul)
    skor = list(enumerate(kemiripan_konten[idx]))
    skor = sorted(skor, key=lambda x: x[1], reverse=True)[1:jumlah+1]
    return pd.DataFrame({
        "film": [judul_film[i] for i, _ in skor],
        "genre": [info_film.loc[i, "genre"] for i, _ in skor],
        "kemiripan": [round(s, 3) for _, s in skor],
    })
 
print("Film acuan:", info_film.loc[0, "film"], "-", info_film.loc[0, "genre"])
print(rekomendasi_konten("Film_000"))
```
 
### Kelebihan dan Kekurangan
 
**Kelebihan:** bisa menangani item baru selama cirinya diketahui, tidak butuh data pengguna lain, dan rekomendasinya mudah dijelaskan.
 
**Kekurangan:** rekomendasinya membosankan karena selalu mirip dengan yang sudah disukai. Pengguna tidak pernah menemukan hal baru di luar zona nyamannya. Selain itu, membuat ciri item yang bagus butuh kerja manual.
 
## Collaborative Filtering
 
### Ide Dasarnya
 
Ini pendekatan yang paling terkenal, dan idenya cerdas: **abaikan sepenuhnya isi itemnya, cukup lihat pola siapa menyukai apa**.
 
Kalimat intinya: *"Orang-orang yang seleranya mirip dengan Anda juga menyukai ini."*
 
Sistem tidak perlu tahu bahwa sebuah film bergenre aksi. Cukup tahu bahwa orang yang menyukai film A juga cenderung menyukai film B.
 
### Dua Jenis
 
**User-based** mencari pengguna lain yang mirip dengan Anda, lalu merekomendasikan apa yang mereka sukai.
 
**Item-based** mencari item yang mirip dengan yang Anda sukai, di mana "mirip" diukur dari pola penilaian orang, bukan dari isi itemnya.
 
### User-Based Collaborative Filtering
 
#### Cara Kerjanya
 
1. Hitung kemiripan antara pengguna target dengan semua pengguna lain
2. Ambil sejumlah pengguna paling mirip
3. Tebak rating pengguna target dari rating mereka, ditimbang berdasarkan kemiripan
#### Menyiapkan Data
 
Sebelum menghitung kemiripan, rating perlu dikurangi rata-rata tiap pengguna. Ini menangani perbedaan gaya menilai: ada yang mudah memberi bintang 5, ada yang paling tinggi memberi bintang 4.
 
```python
M = matriks_latih.values                      # matriks dengan NaN
rata_baris = np.nanmean(M, axis=1)
rata_baris = np.nan_to_num(rata_baris, nan=rata_global)
 
# Kurangi rata-rata tiap pengguna, isi kosong dengan 0
M_terpusat = M - rata_baris[:, None]
M_terisi = np.nan_to_num(M_terpusat, nan=0.0)
 
print("Contoh rata-rata 5 pengguna pertama:", rata_baris[:5].round(3))
```
 
#### Menghitung Kemiripan
 
```python
from sklearn.metrics.pairwise import cosine_similarity
 
mirip_pengguna = cosine_similarity(M_terisi)
np.fill_diagonal(mirip_pengguna, 0)          # jangan hitung diri sendiri
 
print("Bentuk matriks kemiripan:", mirip_pengguna.shape)
 
# Melihat siapa paling mirip dengan pengguna pertama
idx = 0
teratas = np.argsort(mirip_pengguna[idx])[::-1][:5]
print(f"\nPaling mirip dengan {nama_pengguna[idx]}:")
for i in teratas:
    print(f"  {nama_pengguna[i]}  kemiripan {mirip_pengguna[idx, i]:.4f}")
```
 
#### Membuat Prediksi
 
```python
def prediksi_user_based(idx_pengguna, idx_film, k=30):
    kemiripan = mirip_pengguna[idx_pengguna]
    rating_film = M_terpusat[:, idx_film]
 
    # Ambil pengguna yang benar-benar menilai film ini
    tersedia = ~np.isnan(rating_film)
    if tersedia.sum() == 0:
        return rata_baris[idx_pengguna]
 
    kemiripan_tersedia = kemiripan[tersedia]
    rating_tersedia = rating_film[tersedia]
 
    # Ambil k tetangga paling mirip
    urutan = np.argsort(kemiripan_tersedia)[::-1][:k]
    sim_k = kemiripan_tersedia[urutan]
    rate_k = rating_tersedia[urutan]
 
    if np.abs(sim_k).sum() < 1e-8:
        return rata_baris[idx_pengguna]
 
    penyesuaian = np.dot(sim_k, rate_k) / np.abs(sim_k).sum()
    return np.clip(rata_baris[idx_pengguna] + penyesuaian, 1, 5)
 
# Uji pada data uji
peta_pengguna = {n: i for i, n in enumerate(nama_pengguna)}
peta_film = {f: i for i, f in enumerate(judul_film)}
 
tebakan_ub = [prediksi_user_based(peta_pengguna[r.pengguna], peta_film[r.film])
              for r in uji.itertuples()]
rmse_ub = np.sqrt(mean_squared_error(uji["rating"], tebakan_ub))
print(f"RMSE user-based: {rmse_ub:.4f}   (baseline bias: {rmse_bias:.4f})")
```
 
#### Memahami Rumusnya
 
Prediksinya adalah rata-rata pengguna itu, ditambah penyesuaian berdasarkan pendapat tetangga.
 
Kalau tetangga yang mirip memberi rating di atas rata-rata mereka sendiri untuk film ini, penyesuaiannya positif. Bobot tiap tetangga sebanding dengan tingkat kemiripannya.
 
#### Kelemahan User-Based
 
**Tidak skalabel.** Menghitung kemiripan antara satu juta pengguna berarti matriks berisi satu triliun angka.
 
**Selera pengguna berubah.** Kemiripan yang dihitung bulan lalu bisa jadi sudah tidak berlaku.
 
**Sangat kosong.** Dua pengguna yang mirip mungkin tidak punya satu pun film yang sama-sama mereka nilai.
 
### Item-Based Collaborative Filtering
 
#### Kenapa Lebih Sering Dipakai
 
Industri lebih sering memakai versi ini karena satu alasan praktis: **kemiripan antar item jauh lebih stabil daripada kemiripan antar pengguna**.
 
Film A dan film B yang disukai orang yang sama akan tetap begitu selama bertahun-tahun. Sementara selera seorang pengguna bisa berubah dalam hitungan bulan.
 
Karena stabil, matriks kemiripan item bisa dihitung sekali sehari dan dipakai berulang, sehingga rekomendasi bisa disajikan sangat cepat.
 
Ini yang dipakai Amazon untuk fitur "pelanggan yang membeli ini juga membeli".
 
#### Kodenya
 
```python
mirip_film = cosine_similarity(M_terisi.T)     # perhatikan .T untuk transpose
np.fill_diagonal(mirip_film, 0)
 
def prediksi_item_based(idx_pengguna, idx_film, k=30):
    rating_pengguna = M_terpusat[idx_pengguna]
    dinilai = ~np.isnan(rating_pengguna)
 
    if dinilai.sum() == 0:
        return rata_global
 
    kemiripan = mirip_film[idx_film][dinilai]
    rating = rating_pengguna[dinilai]
 
    urutan = np.argsort(kemiripan)[::-1][:k]
    sim_k, rate_k = kemiripan[urutan], rating[urutan]
 
    if np.abs(sim_k).sum() < 1e-8:
        return rata_baris[idx_pengguna]
 
    return np.clip(rata_baris[idx_pengguna]
                   + np.dot(sim_k, rate_k) / np.abs(sim_k).sum(), 1, 5)
 
tebakan_ib = [prediksi_item_based(peta_pengguna[r.pengguna], peta_film[r.film])
              for r in uji.itertuples()]
rmse_ib = np.sqrt(mean_squared_error(uji["rating"], tebakan_ib))
print(f"RMSE item-based: {rmse_ib:.4f}")
```
 
#### Mencari Item Serupa
 
Ini fitur yang bisa langsung dipakai tanpa mengetahui penggunanya.
 
```python
def film_serupa(judul, jumlah=5):
    idx = peta_film[judul]
    teratas = np.argsort(mirip_film[idx])[::-1][:jumlah]
    return pd.DataFrame({
        "film": [judul_film[i] for i in teratas],
        "kemiripan": [round(mirip_film[idx, i], 4) for i in teratas],
    })
 
print(film_serupa("Film_000"))
```
 
### Masalah Bersama Kedua Metode
 
**Sangat lambat pada data besar.** Menghitung kemiripan antar semua pasangan itu mahal.
 
**Data terlalu kosong.** Kalau dua pengguna hanya punya sedikit item yang sama-sama dinilai, kemiripannya tidak bisa dipercaya.
 
**Tidak menangkap pola tersembunyi.** Metode ini hanya melihat kecocokan langsung, tidak menemukan struktur yang lebih dalam.
 
Ketiganya diselesaikan oleh matrix factorization.
 
## Matrix Factorization
 
### Idenya
 
Ini pendekatan yang paling penting dalam sistem rekomendasi modern.
 
Idenya: matriks besar yang hampir kosong itu sebenarnya bisa dijelaskan oleh **sedikit faktor tersembunyi**.
 
### Analogi
 
Bayangkan alih-alih menyimpan pendapat setiap orang tentang setiap film, kita cukup mencatat dua hal:
 
**Untuk tiap pengguna:** seberapa suka dia pada aksi, seberapa suka pada drama, seberapa suka pada komedi.
 
**Untuk tiap film:** seberapa banyak unsur aksi, drama, dan komedi di dalamnya.
 
Rating bisa ditebak dengan mencocokkan keduanya. Orang yang suka aksi akan menyukai film beraksi tinggi.
 
Yang menakjubkan, **faktor-faktor ini tidak perlu ditentukan manusia**. Model menemukannya sendiri dari pola rating. Kadang faktor yang ditemukan cocok dengan genre yang kita kenal, kadang berupa hal yang tidak punya nama tapi tetap bermakna.
 
### Penghematan yang Dihasilkan
 
```python
n_faktor = 10
ukuran_penuh = n_pengguna * n_film
ukuran_faktor = n_pengguna * n_faktor + n_film * n_faktor
 
print(f"Menyimpan matriks penuh : {ukuran_penuh:,} angka")
print(f"Menyimpan faktor        : {ukuran_faktor:,} angka")
print(f"Penghematan             : {(1 - ukuran_faktor/ukuran_penuh):.1%}")
```
 
Pada layanan nyata dengan jutaan pengguna, penghematannya bahkan lebih dramatis.
 
### Cara Kerjanya
 
Model mencari dua matriks kecil yang kalau dikalikan menghasilkan perkiraan matriks aslinya.
 
```
Matriks rating (300 × 120)  ≈  Faktor pengguna (300 × 10) × Faktor film (10 × 120)
```
 
Pencariannya memakai gradient descent, dan yang penting: **hanya rating yang tercatat yang diperhitungkan**. Kotak kosong diabaikan saat pelatihan, lalu diisi oleh hasil perkalian setelah pelatihan selesai.
 
### Implementasi dari Nol
 
```python
def latih_mf(data_latih, n_pengguna, n_film, n_faktor=10,
             epoch=60, lr=0.01, reg=0.05, seed=42):
    rng = np.random.RandomState(seed)
 
    # Inisialisasi acak kecil
    P = rng.normal(0, 0.1, (n_pengguna, n_faktor))    # faktor pengguna
    Q = rng.normal(0, 0.1, (n_film, n_faktor))        # faktor film
    bu = np.zeros(n_pengguna)                          # bias pengguna
    bi = np.zeros(n_film)                              # bias film
    mu = data_latih["rating"].mean()                   # rata-rata global
 
    baris = [(peta_pengguna[r.pengguna], peta_film[r.film], r.rating)
             for r in data_latih.itertuples()]
 
    riwayat = []
    for ep in range(epoch):
        rng.shuffle(baris)
        total_galat = 0
 
        for u, i, r in baris:
            tebakan = mu + bu[u] + bi[i] + P[u] @ Q[i]
            galat = r - tebakan
            total_galat += galat ** 2
 
            # Perbarui semua parameter berdasarkan gradien
            bu[u] += lr * (galat - reg * bu[u])
            bi[i] += lr * (galat - reg * bi[i])
            P_lama = P[u].copy()
            P[u] += lr * (galat * Q[i] - reg * P[u])
            Q[i] += lr * (galat * P_lama - reg * Q[i])
 
        rmse = np.sqrt(total_galat / len(baris))
        riwayat.append(rmse)
        if ep % 10 == 0 or ep == epoch - 1:
            print(f"Epoch {ep:2d}: RMSE latih = {rmse:.4f}")
 
    return P, Q, bu, bi, mu, riwayat
 
P, Q, bu, bi, mu, riwayat = latih_mf(latih, n_pengguna, n_film, n_faktor=10)
```
 
### Memahami Rumusnya
 
Prediksi disusun dari empat bagian:
 
```
tebakan = rata_global + bias_pengguna + bias_film + kecocokan_selera
```
 
Tiga bagian pertama sama dengan baseline bias tadi. Bagian keempat, yaitu `P[u] @ Q[i]`, adalah yang baru: perkalian titik antara vektor selera pengguna dan vektor sifat film.
 
Parameter `reg` adalah regularisasi, yang mencegah nilai faktor menjadi terlalu besar dan overfitting.
 
### Mengukur Hasilnya
 
```python
def prediksi_mf(pengguna, film):
    u, i = peta_pengguna[pengguna], peta_film[film]
    return np.clip(mu + bu[u] + bi[i] + P[u] @ Q[i], 1, 5)
 
tebakan_mf = [prediksi_mf(r.pengguna, r.film) for r in uji.itertuples()]
rmse_mf = np.sqrt(mean_squared_error(uji["rating"], tebakan_mf))
 
print(f"{'Metode':28s} RMSE")
print(f"{'Rata-rata global':28s} {rmse_global:.4f}")
print(f"{'Bias pengguna + film':28s} {rmse_bias:.4f}")
print(f"{'User-based CF':28s} {rmse_ub:.4f}")
print(f"{'Item-based CF':28s} {rmse_ib:.4f}")
print(f"{'Matrix Factorization':28s} {rmse_mf:.4f}")
```
 
### Melihat Kurva Pelatihan
 
```python
plt.figure(figsize=(7, 4))
plt.plot(riwayat)
plt.xlabel("Epoch"); plt.ylabel("RMSE data latih")
plt.title("Pelatihan Matrix Factorization")
plt.grid(alpha=0.3)
plt.show()
```
 
Kalau kurvanya terus menurun tapi RMSE data uji naik, itu overfitting. Perbesar nilai `reg` atau kurangi jumlah faktor.
 
### Memilih Jumlah Faktor
 
```python
for k in [2, 5, 10, 20, 40]:
    Pk, Qk, buk, bik, muk, _ = latih_mf(latih, n_pengguna, n_film,
                                        n_faktor=k, epoch=40)
    tebak = [np.clip(muk + buk[peta_pengguna[r.pengguna]]
                     + bik[peta_film[r.film]]
                     + Pk[peta_pengguna[r.pengguna]] @ Qk[peta_film[r.film]], 1, 5)
             for r in uji.itertuples()]
    print(f"n_faktor={k:3d}  RMSE uji = {np.sqrt(mean_squared_error(uji['rating'], tebak)):.4f}")
```
 
Terlalu sedikit faktor berarti underfitting, terlalu banyak berarti overfitting. Ini bias-variance tradeoff dalam bentuk lain.
 
### Membuat Rekomendasi
 
```python
def rekomendasikan(pengguna, jumlah=10):
    u = peta_pengguna[pengguna]
    semua_skor = mu + bu[u] + bi + Q @ P[u]
 
    # Jangan rekomendasikan yang sudah pernah dinilai
    sudah_dinilai = set(latih[latih["pengguna"] == pengguna]["film"])
    hasil = []
    for i in np.argsort(semua_skor)[::-1]:
        if judul_film[i] not in sudah_dinilai:
            hasil.append((judul_film[i], round(float(semua_skor[i]), 3)))
        if len(hasil) == jumlah:
            break
    return pd.DataFrame(hasil, columns=["film", "skor_prediksi"])
 
print("Rekomendasi untuk User_000:")
print(rekomendasikan("User_000"))
```
 
Perhatikan langkah menyaring film yang sudah dinilai. Ini sering terlupakan, dan hasilnya sistem merekomendasikan film yang sudah ditonton pengguna.
 
### Melihat Faktor Tersembunyi
 
```python
faktor_film = pd.DataFrame(Q, index=judul_film,
                           columns=[f"faktor_{i}" for i in range(Q.shape[1])])
 
print("Film dengan nilai tertinggi pada faktor 0:")
print(faktor_film["faktor_0"].sort_values(ascending=False).head(5).round(3))
print("\nFilm dengan nilai terendah pada faktor 0:")
print(faktor_film["faktor_0"].sort_values().head(5).round(3))
```
 
Pada data nyata, memeriksa faktor seperti ini sering mengungkap pengelompokan yang bermakna, misalnya satu faktor ternyata memisahkan film keluarga dari film dewasa.
 
### Cara yang Lebih Cepat dengan Pustaka Siap Pakai
 
```python
from sklearn.decomposition import TruncatedSVD
 
# Isi kotak kosong dengan rata-rata tiap film lebih dulu
M_isi = matriks_latih.fillna(matriks_latih.mean()).fillna(rata_global).values
 
svd = TruncatedSVD(n_components=10, random_state=42)
P_svd = svd.fit_transform(M_isi)
Q_svd = svd.components_
 
rekonstruksi = P_svd @ Q_svd
print("Bentuk hasil rekonstruksi:", rekonstruksi.shape)
```
 
Cara ini lebih cepat, tapi hasilnya biasanya sedikit lebih buruk karena mengisi kotak kosong dengan tebakan sebelum melatih. Implementasi manual tadi lebih baik karena benar-benar mengabaikan kotak kosong.
 
### Untuk Data Implisit
 
Kalau data Anda berupa klik dan pembelian, bukan rating, pendekatannya sedikit berbeda.
 
Metode yang umum dipakai adalah ALS, tersedia lewat pustaka `implicit`.
 
```python
# pip install implicit
# from implicit.als import AlternatingLeastSquares
# model = AlternatingLeastSquares(factors=50, regularization=0.05, iterations=20)
# model.fit(matriks_interaksi_sparse)
```
 
Perbedaan utamanya: pada data implisit, item yang tidak diklik **tidak dianggap tidak disukai**, melainkan diberi bobot keyakinan yang rendah.
 
## Mengevaluasi Sistem Rekomendasi
 
### Kenapa RMSE Tidak Cukup
 
Ini poin yang penting dipahami.
 
Pengguna tidak melihat angka prediksi. Mereka melihat **daftar rekomendasi**. Yang penting bukan seberapa tepat menebak angka 4,2 atau 4,3, melainkan apakah item yang tepat muncul di daftar teratas.
 
Model dengan RMSE lebih baik bisa saja menghasilkan daftar rekomendasi yang lebih buruk.
 
### Metrik Peringkat
 
**Precision@K** menjawab: dari K item yang direkomendasikan, berapa persen yang benar-benar relevan?
 
**Recall@K** menjawab: dari semua item relevan, berapa persen berhasil masuk daftar K teratas?
 
**NDCG** memperhitungkan posisi. Item relevan di urutan pertama dinilai lebih berharga daripada di urutan kesepuluh, karena orang jarang menggulir sampai bawah.
 
### Kodenya
 
```python
def evaluasi_peringkat(k=10, ambang=3.5):
    """Item dianggap relevan kalau ratingnya di atas ambang."""
    precisions, recalls = [], []
 
    for pengguna in uji["pengguna"].unique():
        item_uji = uji[uji["pengguna"] == pengguna]
        relevan = set(item_uji[item_uji["rating"] >= ambang]["film"])
        if not relevan:
            continue
 
        u = peta_pengguna[pengguna]
        skor = mu + bu[u] + bi + Q @ P[u]
        sudah = set(latih[latih["pengguna"] == pengguna]["film"])
 
        rekomendasi = []
        for i in np.argsort(skor)[::-1]:
            if judul_film[i] not in sudah:
                rekomendasi.append(judul_film[i])
            if len(rekomendasi) == k:
                break
 
        tepat = len(set(rekomendasi) & relevan)
        precisions.append(tepat / k)
        recalls.append(tepat / len(relevan))
 
    return np.mean(precisions), np.mean(recalls)
 
p, r = evaluasi_peringkat(k=10)
print(f"Precision@10: {p:.4f}")
print(f"Recall@10   : {r:.4f}")
```
 
### Metrik yang Sering Dilupakan
 
**Coverage** mengukur berapa persen katalog yang pernah direkomendasikan. Kalau sistem hanya merekomendasikan 50 film yang sama dari katalog 10.000, sebagian besar katalog jadi tidak berguna.
 
**Diversity** mengukur seberapa beragam isi satu daftar rekomendasi. Sepuluh film yang hampir identik bukan rekomendasi yang baik.
 
**Novelty** mengukur seberapa sering sistem merekomendasikan hal yang belum terkenal. Merekomendasikan film terlaris memang aman, tapi pengguna tidak butuh sistem untuk mengetahuinya.
 
```python
def hitung_coverage(k=10):
    semua_rekomendasi = set()
    for pengguna in nama_pengguna:
        u = peta_pengguna[pengguna]
        skor = mu + bu[u] + bi + Q @ P[u]
        teratas = np.argsort(skor)[::-1][:k]
        semua_rekomendasi.update(judul_film[i] for i in teratas)
    return len(semua_rekomendasi) / n_film
 
print(f"Coverage: {hitung_coverage():.2%} dari katalog")
```
 
Coverage rendah adalah tanda sistem terlalu berat ke item populer.
 
## Masalah Praktis di Dunia Nyata
 
### Cold Start
 
Ini masalah paling nyata dalam penerapan sistem rekomendasi.
 
**Pengguna baru** belum punya riwayat, sehingga collaborative filtering tidak bisa berbuat apa-apa.
 
Solusinya: tampilkan item populer dulu, minta pengguna memilih beberapa kesukaan awal saat mendaftar, atau manfaatkan data pendaftaran seperti umur dan lokasi.
 
**Item baru** belum ada yang menilai, sehingga tidak pernah muncul dalam rekomendasi. Ini menjadi lingkaran setan: tidak direkomendasikan berarti tidak ditemukan, tidak ditemukan berarti tidak dinilai.
 
Solusinya: pakai content-based filtering untuk item baru, atau sisipkan item baru secara sengaja ke sebagian pengguna untuk mengumpulkan data awal.
 
### Popularity Bias
 
Sistem cenderung merekomendasikan yang sudah populer, karena datanya paling banyak. Akibatnya yang populer makin populer, dan item bagus yang belum terkenal tidak pernah punya kesempatan.
 
Solusi umum: turunkan bobot item populer, atau sisipkan item acak dalam proporsi kecil untuk menjaga eksplorasi.
 
### Filter Bubble
 
Kalau sistem selalu merekomendasikan hal yang mirip dengan kesukaan sebelumnya, pengguna terkurung dalam gelembung dan tidak pernah menemukan hal baru.
 
Ini masalah pengalaman pengguna sekaligus masalah etika, terutama untuk rekomendasi berita dan konten sosial.
 
Solusinya: sengaja masukkan keberagaman ke dalam daftar rekomendasi, meski itu sedikit menurunkan skor akurasi.
 
### Skalabilitas
 
Menghitung kemiripan antar jutaan pengguna tidak mungkin dilakukan secara langsung.
 
Solusi yang dipakai industri: matrix factorization yang jauh lebih ringan, perhitungan berkala di luar waktu layanan, dan pencarian tetangga terdekat secara perkiraan memakai pustaka seperti FAISS atau Annoy.
 
## Memilih Pendekatan yang Tepat
 
| Aspek | Content-Based | Collaborative Filtering | Matrix Factorization |
|---|---|---|---|
| Butuh ciri item | Ya | Tidak | Tidak |
| Butuh banyak pengguna | Tidak | Ya | Ya |
| Menangani item baru | Ya | Tidak | Tidak |
| Menangani pengguna baru | Sebagian | Tidak | Tidak |
| Menemukan hal tak terduga | Tidak | Ya | Ya |
| Skalabilitas | Baik | Buruk | Baik |
| Mudah dijelaskan | Sangat | Cukup | Sulit |
 
### Urutan yang Disarankan untuk Pemula
 
**Langkah 1.** Buat baseline populer dan baseline bias. Catat angkanya.
 
**Langkah 2.** Coba item-based collaborative filtering. Sederhana dan hasilnya bisa langsung dipakai untuk fitur "item serupa".
 
**Langkah 3.** Coba matrix factorization. Biasanya inilah yang memberi hasil terbaik.
 
**Langkah 4.** Gabungkan dengan content-based untuk menangani cold start.
 
Sistem nyata hampir selalu berupa gabungan beberapa pendekatan, bukan satu metode tunggal.
 
## Kesalahan Pemula yang Sering Terjadi
 
### Tidak Membuat Baseline Populer
 
Rekomendasi berdasarkan popularitas sering sangat sulit dikalahkan. Tanpa membandingkan, Anda tidak akan tahu apakah model rumit Anda benar-benar berguna.
 
### Hanya Memakai RMSE
 
Pengguna melihat daftar, bukan angka. Selalu ukur juga dengan Precision@K atau NDCG.
 
### Merekomendasikan Item yang Sudah Dikonsumsi
 
Selalu saring item yang sudah pernah dinilai atau dibeli pengguna. Ini terlihat sepele tapi sangat merusak pengalaman kalau terlewat.
 
### Membagi Data Secara Acak Padahal Ada Waktu
 
Kalau data punya cap waktu, bagi berdasarkan waktu. Membagi acak berarti model belajar dari masa depan.
 
### Memisahkan Pengguna Utuh ke Data Uji
 
Itu menguji kemampuan menangani cold start, bukan kualitas rekomendasi. Sembunyikan sebagian rating tiap pengguna, bukan seluruh penggunanya.
 
### Mengabaikan Cold Start
 
Sistem yang bagus di pengujian bisa gagal total saat dipakai, karena sebagian besar pengguna nyata adalah pengguna baru.
 
### Mengabaikan Coverage dan Diversity
 
Sistem dengan akurasi tinggi tapi hanya merekomendasikan 50 item yang sama tidak berguna bagi bisnis.
 
### Menganggap Data Implisit Sama dengan Rating
 
Tidak mengklik bukan berarti tidak suka. Memperlakukan kekosongan sebagai penilaian negatif menghasilkan model yang salah.
 
### Terlalu Banyak Faktor Tersembunyi
 
Semakin banyak faktor, semakin mudah overfitting pada data yang sangat kosong. Mulai dari 10 sampai 50, lalu sesuaikan berdasarkan hasil pengujian.
 
### Lupa Regularisasi
 
Pada data yang sangat kosong, tanpa regularisasi model akan menghafal rating yang ada dan gagal pada yang belum ada.
 
## Penutup
 
Sistem rekomendasi punya karakter yang khas: datanya sangat kosong, keluarannya berupa daftar bukan satu jawaban, dan keberhasilannya diukur dari pengalaman pengguna, bukan sekadar ketepatan angka.
 
Tiga hal untuk diingat:
 
**Pertama**, selalu bandingkan dengan rekomendasi populer. Banyak model rumit ternyata kalah dari daftar item terlaris, dan mengetahui itu sejak awal menghemat banyak waktu.
 
**Kedua**, matrix factorization adalah pendekatan yang paling sepadan untuk dipelajari. Idenya elegan, hasilnya bagus, dan bisa diskalakan ke jutaan pengguna.
 
**Ketiga**, akurasi bukan segalanya. Sistem yang selalu merekomendasikan hal yang aman dan populer mungkin punya skor bagus, tapi tidak memberi nilai tambah bagi pengguna maupun bisnis. Cold start, keberagaman, dan cakupan katalog sama pentingnya.
 