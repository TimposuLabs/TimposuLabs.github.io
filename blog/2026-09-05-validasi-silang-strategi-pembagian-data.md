---
slug: validasi-silang-strategi-pembagian-data
title: "Validasi Silang dan Strategi Pembagian Data: Panduan Machine Learning untuk Pemula #4"
authors: topekox
tags: [manchine learning, data mining, ai, data science, python]
---

Anda melatih model, mengukurnya, dan hasilnya 92 persen. Angka itu bagus. Tapi pertanyaan yang sebenarnya adalah: apakah angka itu bisa dipercaya?
 
Cara membagi data menentukan jawabannya. Pembagian yang salah bisa menghasilkan angka yang jauh lebih tinggi daripada performa sebenarnya, dan celakanya Anda tidak akan menyadarinya sampai model dipakai di dunia nyata.
 
Artikel ini membahas cara membagi data dengan benar untuk berbagai jenis situasi, dari yang paling sederhana sampai teknik yang dipakai saat harus menyetel model sambil mengukurnya.

<!-- truncate -->

## Daftar Isi
 
1. Kenapa Cara Membagi Data Itu Menentukan Segalanya
2. Tiga Jenis Data: Latih, Validasi, dan Uji
3. Cara Kerja Validasi Silang
4. KFold: Bentuk Paling Dasar
5. StratifiedKFold: Menjaga Proporsi Kelas
6. TimeSeriesSplit: Untuk Data Berurutan Waktu
7. GroupKFold: Ketika Satu Entitas Punya Banyak Baris
8. Varian Lain yang Berguna
9. Nested Cross-Validation
10. Menggabungkan dengan Pipeline
11. Panduan Memilih Strategi
12. Kesalahan Pemula yang Sering Terjadi
## Kenapa Cara Membagi Data Itu Menentukan Segalanya
 
### Analogi Sederhana
 
Seorang guru ingin tahu apakah muridnya benar-benar paham pelajaran. Kalau soal ujiannya persis sama dengan soal latihan, semua murid akan dapat nilai tinggi. Tapi nilai itu tidak mengukur pemahaman, hanya mengukur hafalan.
 
Membagi data adalah cara kita menyiapkan "soal ujian" yang belum pernah dilihat model. Kalau pembagiannya keliru, kita sedang memberi ujian dengan soal bocoran tanpa sadar.
 
### Masalah dengan Membagi Sekali Saja
 
Cara paling umum yang diajarkan pemula adalah `train_test_split`: bagi data jadi 80 persen latih dan 20 persen uji, selesai.
 
Cara ini tidak salah, tapi punya dua kelemahan.
 
**Kelemahan pertama: hasilnya dipengaruhi keberuntungan.** Bisa saja pembagian yang kebetulan Anda dapat itu mudah, sehingga skornya tinggi. Atau sebaliknya, kebetulan sulit, sehingga model bagus terlihat jelek.
 
Mari buktikan langsung.
 
```python
import numpy as np
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
 
data = load_breast_cancer()
X, y = data.data, data.target
 
skor = []
for seed in range(10):
    X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=seed)
    model = DecisionTreeClassifier(random_state=42).fit(X_tr, y_tr)
    skor.append(model.score(X_te, y_te))
 
print("Skor dari 10 pembagian berbeda:")
print(np.round(skor, 4))
print(f"Terendah: {min(skor):.4f}  Tertinggi: {max(skor):.4f}  "
      f"Selisih: {max(skor) - min(skor):.4f}")
```
 
Jalankan kode ini. Anda akan melihat selisih yang cukup besar antara pembagian terbaik dan terburuk, padahal modelnya sama persis dan datanya sama persis. Yang berbeda hanya baris mana yang kebetulan masuk data uji.
 
Kalau Anda hanya menjalankan satu kali dan melaporkan angkanya, Anda sedang melaporkan hasil undian.
 
**Kelemahan kedua: data terbuang.** Dengan pembagian 80-20, ada 20 persen data yang tidak pernah dipakai untuk belajar. Pada dataset kecil, ini kerugian besar.
 
Validasi silang menyelesaikan kedua masalah itu sekaligus.
 
### Istilah Dasar yang Perlu Dipahami
 
**Fold** artinya bagian atau lipatan. Kalau data dibagi jadi 5 fold, artinya data dipotong jadi 5 bagian yang kira-kira sama besar.
 
**Iterasi** adalah satu putaran pelatihan dan pengujian. Validasi silang 5-fold berarti ada 5 iterasi.
 
**Kebocoran data** atau *data leakage* adalah kondisi ketika informasi dari data uji tanpa sengaja ikut masuk ke proses pelatihan. Hampir semua yang dibahas di artikel ini pada dasarnya adalah cara mencegah kebocoran dalam bentuk yang berbeda-beda.
 
## Tiga Jenis Data: Latih, Validasi, dan Uji
 
### Kenapa Butuh Tiga, Bukan Dua
 
Ini konsep yang sering membingungkan pemula, tapi penting sekali.
 
**Data latih** dipakai model untuk belajar.
 
**Data validasi** dipakai untuk mengambil keputusan selama pengembangan: pilih algoritma mana, pakai parameter berapa, ambang keputusan berapa.
 
**Data uji** dipakai sekali saja di paling akhir, untuk mengukur performa sebenarnya.
 
### Analogi
 
Bayangkan seorang siswa yang mau ikut ujian nasional.
 
Buku pelajaran adalah data latih, tempat dia belajar.
 
Soal latihan mingguan adalah data validasi. Dia mengerjakannya berkali-kali, memeriksa jawaban, dan memperbaiki cara belajarnya berdasarkan hasil itu.
 
Ujian nasional adalah data uji. Dikerjakan sekali, tanpa boleh mengintip dulu, dan hasilnya itulah yang menentukan.
 
Kalau siswa itu memakai soal ujian nasional sebagai bahan latihan mingguan, nilainya akan tinggi tapi tidak berarti apa-apa.
 
### Kesalahan yang Sering Terjadi
 
Pemula sering hanya membagi dua: latih dan uji. Lalu mereka mencoba puluhan kombinasi parameter, memilih yang skor data ujinya paling tinggi, dan melaporkan angka itu.
 
Masalahnya, begitu data uji dipakai untuk mengambil keputusan, data itu berubah fungsi menjadi data validasi. Angka yang dilaporkan jadi terlalu optimistis.
 
Validasi silang menyelesaikan ini dengan elegan: data validasi dibuat berputar dari dalam data latih, sehingga data uji tetap murni sampai akhir.
 
### Contoh Kode
 
```python
from sklearn.model_selection import train_test_split
 
# Pisahkan data uji lebih dulu, lalu simpan dan jangan disentuh
X_kerja, X_uji, y_kerja, y_uji = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)
 
print("Data kerja (untuk latih + validasi silang):", X_kerja.shape)
print("Data uji (disimpan sampai akhir)          :", X_uji.shape)
```
 
Semua eksplorasi, pemilihan model, dan penyetelan parameter dilakukan di dalam `X_kerja` memakai validasi silang. `X_uji` baru dibuka di langkah terakhir.
 
## Cara Kerja Validasi Silang
 
### Analogi Giliran Jaga
 
Bayangkan 5 orang satpam yang harus saling menilai. Setiap malam, 4 orang bertugas dan 1 orang mengawasi serta menilai. Besoknya giliran berganti, sehingga setelah 5 malam semua orang pernah jadi penilai dan semua orang pernah bertugas.
 
Penilaian akhirnya adalah rata-rata dari 5 malam itu, jauh lebih adil daripada menilai berdasarkan satu malam saja.
 
### Langkah-langkahnya
 
Validasi silang 5-fold bekerja begini:
 
1. Data dipotong jadi 5 bagian yang sama besar.
2. Bagian 1 jadi data uji, bagian 2 sampai 5 jadi data latih. Model dilatih dan diukur.
3. Bagian 2 jadi data uji, sisanya jadi data latih. Model dilatih ulang dari nol dan diukur.
4. Diulang sampai semua bagian pernah jadi data uji.
5. Lima skor yang didapat dirata-ratakan.
Gambarannya seperti ini, di mana U adalah bagian yang jadi data uji:
 
```
Iterasi 1:  [ U ][   ][   ][   ][   ]
Iterasi 2:  [   ][ U ][   ][   ][   ]
Iterasi 3:  [   ][   ][ U ][   ][   ]
Iterasi 4:  [   ][   ][   ][ U ][   ]
Iterasi 5:  [   ][   ][   ][   ][ U ]
```
 
### Dua Keuntungan Utamanya
 
**Setiap baris data pernah dipakai untuk menguji.** Tidak ada data yang terbuang, dan hasilnya tidak bergantung pada satu pembagian yang beruntung.
 
**Anda tahu seberapa stabil modelnya.** Selain rata-rata, Anda juga dapat sebaran skornya. Model dengan rata-rata 0,85 dan sebaran kecil jauh lebih bisa diandalkan daripada model dengan rata-rata 0,87 tapi sebarannya lebar.
 
### Kode Pertama
 
```python
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
 
model = Pipeline([
    ("skala", StandardScaler()),
    ("model", LogisticRegression(max_iter=5000)),
])
 
skor = cross_val_score(model, X_kerja, y_kerja, cv=5, scoring="f1")
 
print("Skor tiap fold:", np.round(skor, 4))
print(f"Rata-rata: {skor.mean():.4f}")
print(f"Naik-turun: {skor.std():.4f}")
```
 
### Cara Membaca Hasilnya
 
Angka rata-rata adalah perkiraan performa model Anda.
 
Angka naik-turun (standar deviasi) menunjukkan kestabilan. Kalau nilainya besar, misalnya di atas 0,05, berarti performa model sangat bergantung pada data mana yang kebetulan dipakai. Ini biasanya tanda datanya terlalu sedikit atau modelnya terlalu rumit.
 
### Berapa Jumlah Fold yang Tepat
 
Jumlah fold biasanya disebut `k`.
 
**k = 5** adalah pilihan default yang baik. Cepat dan hasilnya cukup stabil.
 
**k = 10** memberi estimasi sedikit lebih akurat, tapi butuh waktu dua kali lipat. Pakai kalau datanya kecil atau modelnya cepat dilatih.
 
**k = jumlah baris** disebut *Leave-One-Out*. Tiap kali hanya satu baris jadi data uji. Sangat lambat dan hasilnya justru tidak stabil, jadi jarang berguna kecuali datanya sangat sedikit.
 
Aturan praktis: mulai dari 5. Kalau hasilnya tidak stabil, naikkan ke 10.
 
## KFold: Bentuk Paling Dasar
 
### Cara Kerjanya
 
`KFold` membagi data menjadi `k` bagian berurutan. Kalau `shuffle=True`, data diacak dulu sebelum dipotong.
 
### Kapan Dipakai
 
Untuk masalah regresi, atau klasifikasi dengan kelas yang benar-benar seimbang.
 
Untuk klasifikasi, hampir selalu lebih baik memakai `StratifiedKFold` yang dibahas berikutnya.
 
### Melihat Isi Tiap Fold
 
Kode berikut menunjukkan apa yang sebenarnya terjadi di balik layar.
 
```python
from sklearn.model_selection import KFold
 
kf = KFold(n_splits=5, shuffle=True, random_state=42)
 
for i, (idx_latih, idx_uji) in enumerate(kf.split(X_kerja), start=1):
    print(f"Fold {i}: {len(idx_latih)} baris latih, {len(idx_uji)} baris uji "
          f"| baris uji pertama: {idx_uji[:5]}")
```
 
Perhatikan bahwa `split()` mengembalikan nomor baris, bukan datanya. Kita bisa memakainya untuk mengambil bagian data yang dimaksud.
 
### Kenapa shuffle=True Penting
 
Kalau data tersusun berurutan berdasarkan sesuatu, misalnya diurutkan berdasarkan kelas atau tanggal, maka tanpa pengacakan setiap fold akan berisi bagian yang sangat berbeda karakternya.
 
Contoh ekstremnya: kalau 300 baris pertama semuanya kelas A dan 300 baris berikutnya kelas B, maka fold pertama akan berisi 100 persen kelas A. Model tidak akan pernah melihat kelas B saat menguji fold itu.
 
Tapi ada pengecualian penting: **jangan pakai `shuffle=True` untuk data berurutan waktu**. Bagian TimeSeriesSplit menjelaskan alasannya.
 
### Kelemahan KFold
 
Pada data klasifikasi yang tidak seimbang, pengacakan acak bisa membuat sebuah fold kebetulan tidak memuat kelas minoritas sama sekali. Ini yang diselesaikan StratifiedKFold.
 
## StratifiedKFold: Menjaga Proporsi Kelas
 
### Masalah yang Diselesaikan
 
Bayangkan data dengan 1.000 baris, di mana hanya 20 baris berlabel positif, yaitu 2 persen.
 
Kalau dibagi 5 fold secara acak, secara rata-rata tiap fold akan berisi 4 baris positif. Tapi karena acak, bisa saja satu fold kebetulan hanya berisi 1 baris positif, dan fold lain berisi 8.
 
Akibatnya skor tiap fold jadi tidak sebanding. Fold dengan sedikit kelas positif akan menghasilkan angka yang liar, dan rata-ratanya jadi tidak bisa dipercaya.
 
### Membuktikan Masalahnya
 
```python
from sklearn.datasets import make_classification
from sklearn.model_selection import KFold, StratifiedKFold
 
Xi, yi = make_classification(
    n_samples=1000, n_features=10, weights=[0.98, 0.02], random_state=42
)
print("Proporsi kelas positif keseluruhan:", yi.mean())
 
print("\nDengan KFold biasa:")
kf = KFold(n_splits=5, shuffle=True, random_state=1)
for i, (_, idx_uji) in enumerate(kf.split(Xi), start=1):
    print(f"  Fold {i}: {yi[idx_uji].sum():2d} baris positif "
          f"({yi[idx_uji].mean():.3f})")
 
print("\nDengan StratifiedKFold:")
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=1)
for i, (_, idx_uji) in enumerate(skf.split(Xi, yi), start=1):
    print(f"  Fold {i}: {yi[idx_uji].sum():2d} baris positif "
          f"({yi[idx_uji].mean():.3f})")
```
 
Perhatikan hasilnya. Dengan KFold biasa, jumlah baris positif tiap fold berbeda-beda. Dengan StratifiedKFold, jumlahnya merata dan proporsinya konsisten dengan data keseluruhan.
 
### Cara Kerjanya
 
`StratifiedKFold` membagi data sambil menjaga agar proporsi tiap kelas di setiap fold sama dengan proporsi di data keseluruhan.
 
Perhatikan bahwa `split()` pada StratifiedKFold butuh dua argumen, yaitu `X` dan `y`, karena ia perlu melihat label untuk menjaga proporsinya.
 
### Kapan Wajib Dipakai
 
**Selalu, untuk semua masalah klasifikasi.** Tidak ada kerugiannya, dan pada data timpang manfaatnya besar.
 
Kabar baiknya, kalau Anda memakai `cross_val_score` dengan `cv=5` pada masalah klasifikasi, scikit-learn otomatis memakai StratifiedKFold. Tapi lebih baik menuliskannya secara eksplisit supaya jelas dan bisa diatur `shuffle` serta `random_state`-nya.
 
```python
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
skor = cross_val_score(model, X_kerja, y_kerja, cv=skf, scoring="f1")
print(f"F1: {skor.mean():.4f} (naik-turun {skor.std():.4f})")
```
 
## TimeSeriesSplit: Untuk Data Berurutan Waktu
 
### Masalah yang Diselesaikan
 
Ini kesalahan yang paling sering terjadi dan paling sulit disadari.
 
Bayangkan Anda memprediksi penjualan bulan depan menggunakan data penjualan dua tahun terakhir. Kalau Anda memakai KFold biasa dengan pengacakan, model bisa saja belajar dari data bulan Desember untuk memprediksi bulan Maret.
 
Di dunia nyata itu mustahil. Saat memprediksi Maret, Anda belum punya data Desember.
 
Akibatnya skor validasi Anda akan jauh lebih bagus daripada performa sebenarnya. Model terlihat pintar padahal ia hanya "mengintip masa depan".
 
### Contoh Nyata Kenapa Ini Berbahaya
 
Harga saham hari ini sangat mirip dengan harga kemarin dan besok. Kalau data diacak, model bisa melihat harga tanggal 10 dan tanggal 12, lalu diminta menebak tanggal 11. Tebakannya akan hampir sempurna, tapi kemampuan itu tidak ada gunanya karena di dunia nyata tanggal 12 belum terjadi.
 
### Cara Kerja TimeSeriesSplit
 
Alih-alih mengacak, `TimeSeriesSplit` selalu melatih dengan data yang lebih lama dan menguji dengan data yang lebih baru.
 
```
Iterasi 1:  [ latih ][ uji ][      ][      ][      ]
Iterasi 2:  [ latih ][latih][ uji  ][      ][      ]
Iterasi 3:  [ latih ][latih][latih ][ uji  ][      ]
Iterasi 4:  [ latih ][latih][latih ][latih ][ uji  ]
```
 
Data latih terus membesar seiring iterasi, meniru situasi nyata di mana riwayat data terus bertambah seiring waktu.
 
### Contoh Kode
 
```python
from sklearn.model_selection import TimeSeriesSplit
import pandas as pd
 
# Data contoh berurutan waktu
tanggal = pd.date_range("2024-01-01", periods=500, freq="D")
data_waktu = pd.DataFrame({
    "tanggal": tanggal,
    "nilai_kemarin": np.random.randn(500).cumsum(),
})
data_waktu["target"] = data_waktu["nilai_kemarin"].shift(-1)
data_waktu = data_waktu.dropna().sort_values("tanggal")   # WAJIB diurutkan
 
Xw = data_waktu[["nilai_kemarin"]]
yw = data_waktu["target"]
 
tscv = TimeSeriesSplit(n_splits=5)
 
for i, (idx_latih, idx_uji) in enumerate(tscv.split(Xw), start=1):
    print(f"Fold {i}: latih baris 0-{idx_latih[-1]:3d} ({len(idx_latih):3d} baris) "
          f"| uji baris {idx_uji[0]:3d}-{idx_uji[-1]:3d} ({len(idx_uji)} baris)")
```
 
Perhatikan bahwa nomor baris uji selalu lebih besar daripada nomor baris latih. Itulah inti dari strategi ini.
 
### Parameter gap
 
Kadang ada jeda antara saat prediksi dibuat dan saat hasilnya diketahui.
 
Contohnya, Anda memprediksi apakah pelanggan akan berhenti berlangganan dalam 30 hari ke depan. Artinya data hari ini baru bisa dinilai 30 hari kemudian. Kalau data latih dan data uji berdempetan langsung, ada informasi yang bocor.
 
Parameter `gap` menyisipkan jeda kosong di antara keduanya.
 
```python
tscv = TimeSeriesSplit(n_splits=5, gap=30)   # sisakan 30 baris kosong sebagai jeda
```
 
### Tiga Hal yang Wajib Diperhatikan
 
**Urutkan data terlebih dulu.** `TimeSeriesSplit` mengasumsikan baris sudah tersusun dari lama ke baru. Kalau belum diurutkan, hasilnya kacau tanpa peringatan apa pun.
 
**Jangan pernah pakai `shuffle=True`.** Ini bertentangan dengan seluruh tujuan strategi ini.
 
**Hati-hati saat membuat fitur.** Kalau Anda membuat fitur seperti "rata-rata penjualan pelanggan ini", pastikan rata-rata itu hanya dihitung dari periode sebelum tanggal prediksi. Menghitungnya dari seluruh riwayat termasuk masa depan adalah bentuk kebocoran yang sangat sering terlewat.
 
## GroupKFold: Ketika Satu Entitas Punya Banyak Baris
 
### Masalah yang Diselesaikan
 
Bayangkan data rekam medis di mana satu pasien punya 5 baris kunjungan. Total ada 200 pasien dengan 1.000 baris data.
 
Kalau dibagi secara acak, kunjungan pasien A bisa muncul di data latih **dan** di data uji sekaligus.
 
Akibatnya model tidak belajar mengenali pola penyakit. Model belajar mengenali pasien A. Saat diuji, ia cukup mengenali "ini pasien A lagi" dan menjawab dengan benar.
 
Skor validasi jadi tinggi, tapi begitu bertemu pasien baru yang belum pernah ada di data latih, modelnya gagal.
 
### Analogi
 
Bayangkan sepasang anak kembar identik ikut ujian. Kalau si kembar pertama ikut kelas latihan dan si kembar kedua ikut ujian, hasilnya tidak mengukur apa pun tentang kemampuan mengajar guru. Keduanya terlalu mirip.
 
### Contoh Situasi yang Sering Terjadi
 
- Satu pasien dengan beberapa kali kunjungan
- Satu pengguna dengan beberapa sesi aplikasi
- Beberapa foto dari orang yang sama
- Beberapa pengukuran dari mesin yang sama
- Beberapa transaksi dari pelanggan yang sama
Kalau situasi Anda mirip salah satu di atas, pembagian acak biasa akan memberi angka yang menyesatkan.
 
### Contoh Kode
 
```python
from sklearn.model_selection import GroupKFold
 
# Data contoh: 200 pasien, tiap pasien 5 kunjungan
n_pasien = 200
id_pasien = np.repeat(np.arange(n_pasien), 5)
Xg = np.random.randn(len(id_pasien), 10)
yg = np.random.choice([0, 1], len(id_pasien))
 
gkf = GroupKFold(n_splits=5)
 
for i, (idx_latih, idx_uji) in enumerate(gkf.split(Xg, yg, groups=id_pasien), start=1):
    pasien_latih = set(id_pasien[idx_latih])
    pasien_uji = set(id_pasien[idx_uji])
    irisan = pasien_latih & pasien_uji
    print(f"Fold {i}: {len(pasien_latih)} pasien latih, {len(pasien_uji)} pasien uji, "
          f"pasien yang muncul di kedua sisi: {len(irisan)}")
```
 
Angka terakhir selalu nol. Itulah jaminan yang diberikan `GroupKFold`: tidak ada satu pun entitas yang muncul di data latih dan data uji secara bersamaan.
 
### Bandingkan dengan KFold Biasa
 
```python
kf = KFold(n_splits=5, shuffle=True, random_state=42)
_, idx_uji = next(iter(kf.split(Xg)))
irisan = set(id_pasien[np.setdiff1d(np.arange(len(yg)), idx_uji)]) & set(id_pasien[idx_uji])
print("Dengan KFold biasa, pasien yang bocor ke dua sisi:", len(irisan))
```
 
Angkanya akan tinggi. Itulah kebocoran yang sedang kita cegah.
 
### StratifiedGroupKFold: Menggabungkan Keduanya
 
Kalau data Anda punya kelompok **dan** kelasnya timpang, pakai versi gabungan.
 
```python
from sklearn.model_selection import StratifiedGroupKFold
 
sgkf = StratifiedGroupKFold(n_splits=5, shuffle=True, random_state=42)
for idx_latih, idx_uji in sgkf.split(Xg, yg, groups=id_pasien):
    pass   # menjaga proporsi kelas sekaligus memisahkan kelompok
```
 
### Catatan Penting
 
Perhatikan bahwa `split()` di sini butuh argumen tambahan `groups`. Kalau Anda memakai `cross_val_score`, argumen itu juga harus diteruskan.
 
```python
skor = cross_val_score(model, Xg, yg, groups=id_pasien, cv=gkf)
```
 
Lupa meneruskan `groups` adalah kesalahan yang sering terjadi, dan program tidak akan memberi peringatan.
 
## Varian Lain yang Berguna
 
### ShuffleSplit
 
#### Cara Kerjanya
 
Berbeda dari KFold yang membagi rapi tanpa tumpang tindih, `ShuffleSplit` mengambil sampel acak berulang kali. Satu baris bisa muncul di data uji beberapa kali, atau tidak sama sekali.
 
#### Kapan Dipakai
 
Saat dataset sangat besar dan Anda ingin mengontrol jumlah iterasi secara terpisah dari ukuran data uji. Misalnya Anda ingin 20 iterasi dengan data uji 10 persen, yang tidak bisa dilakukan dengan KFold.
 
```python
from sklearn.model_selection import StratifiedShuffleSplit
 
sss = StratifiedShuffleSplit(n_splits=20, test_size=0.1, random_state=42)
```
 
### RepeatedStratifiedKFold
 
#### Cara Kerjanya
 
Menjalankan validasi silang beberapa kali dengan pengacakan berbeda, lalu merata-ratakan semuanya.
 
#### Kapan Dipakai
 
Saat dataset kecil dan hasil validasi silang biasa masih terasa tidak stabil. Pengulangan mengurangi pengaruh keberuntungan pengacakan.
 
```python
from sklearn.model_selection import RepeatedStratifiedKFold
 
rskf = RepeatedStratifiedKFold(n_splits=5, n_repeats=3, random_state=42)
skor = cross_val_score(model, X_kerja, y_kerja, cv=rskf, scoring="f1")
print(f"Dari {len(skor)} pengukuran: {skor.mean():.4f} +/- {skor.std():.4f}")
```
 
Biayanya adalah waktu. Lima fold dikali tiga pengulangan berarti model dilatih 15 kali.
 
### LeaveOneOut
 
#### Cara Kerjanya
 
Setiap kali hanya satu baris yang jadi data uji. Kalau ada 500 baris, model dilatih 500 kali.
 
#### Kapan Dipakai
 
Hampir tidak pernah, kecuali dataset Anda sangat kecil, misalnya di bawah 100 baris.
 
Selain sangat lambat, hasilnya justru cenderung tidak stabil karena tiap pengukuran hanya berdasarkan satu baris.
 
## Nested Cross-Validation
 
Bagian ini sedikit lebih rumit, tapi menyelesaikan masalah nyata yang sering tidak disadari pemula.
 
### Masalah yang Diselesaikan
 
Anda memakai `GridSearchCV` untuk mencari parameter terbaik. `GridSearchCV` mencoba puluhan kombinasi dan melaporkan skor terbaiknya, misalnya 0,91.
 
Pertanyaannya: bolehkah angka 0,91 itu dilaporkan sebagai perkiraan performa model?
 
Jawabannya tidak boleh.
 
### Kenapa Tidak Boleh
 
Karena skor 0,91 itu adalah skor **terbaik dari puluhan percobaan** pada data yang sama.
 
Analoginya, bayangkan 50 orang menebak hasil lemparan koin sebanyak 10 kali. Secara kebetulan, pasti ada satu orang yang tebakannya benar 9 dari 10. Kalau Anda memilih orang itu dan bilang "dia punya kemampuan meramal 90 persen", Anda keliru. Dia cuma beruntung, dan Anda memilihnya justru karena keberuntungannya.
 
Hal yang sama terjadi pada pencarian parameter. Semakin banyak kombinasi yang dicoba, semakin besar peluang salah satunya kebetulan cocok dengan data validasi tersebut.
 
### Cara Kerja Nested Cross-Validation
 
Solusinya adalah memakai dua lapis validasi silang.
 
**Lapis dalam** bertugas mencari parameter terbaik. Ia bekerja hanya di dalam data latih.
 
**Lapis luar** bertugas mengukur performa. Ia menguji model dengan data yang sama sekali belum pernah dipakai, bahkan oleh pencarian parameter.
 
Gambarannya begini:
 
```
Lapis luar, iterasi 1:
    Data dibagi: [ latih luar ][ uji luar ]
    Di dalam "latih luar":
        Lapis dalam mencari parameter terbaik lewat validasi silang lagi
    Model dengan parameter terbaik diuji di "uji luar"
    -> skor 1
 
Lapis luar, iterasi 2: ... -> skor 2
...
Skor akhir = rata-rata dari semua skor lapis luar
```
 
Kuncinya, "uji luar" tidak pernah ikut dalam proses pemilihan parameter, sehingga skornya jujur.
 
### Contoh Kode
 
```python
from sklearn.model_selection import GridSearchCV, cross_val_score, StratifiedKFold
from sklearn.ensemble import RandomForestClassifier
 
parameter = {
    "model__n_estimators": [100, 300],
    "model__max_depth": [3, 5, None],
    "model__min_samples_leaf": [1, 5],
}
 
pipe = Pipeline([
    ("skala", StandardScaler()),
    ("model", RandomForestClassifier(random_state=42)),
])
 
cv_dalam = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)
cv_luar = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
 
# Lapis dalam: mencari parameter
pencari = GridSearchCV(pipe, parameter, cv=cv_dalam, scoring="f1", n_jobs=-1)
 
# Lapis luar: mengukur performa
skor_jujur = cross_val_score(pencari, X_kerja, y_kerja, cv=cv_luar, scoring="f1")
 
print("Skor tiap fold luar:", np.round(skor_jujur, 4))
print(f"Perkiraan performa yang jujur: {skor_jujur.mean():.4f} "
      f"(naik-turun {skor_jujur.std():.4f})")
```
 
### Membandingkan dengan Cara yang Keliru
 
```python
# Cara yang terlalu optimistis
pencari.fit(X_kerja, y_kerja)
print(f"Skor terbaik GridSearchCV (terlalu optimistis): {pencari.best_score_:.4f}")
print(f"Skor nested (jujur)                           : {skor_jujur.mean():.4f}")
```
 
Skor nested biasanya lebih rendah. Selisihnya itulah gambaran seberapa besar Anda tertipu kalau memakai angka `best_score_`.
 
### Kapan Perlu dan Kapan Berlebihan
 
**Perlu** kalau Anda menulis laporan atau skripsi yang menuntut estimasi performa yang bisa dipertanggungjawabkan, atau kalau Anda membandingkan beberapa jenis algoritma secara adil.
 
**Berlebihan** untuk eksplorasi sehari-hari. Biayanya mahal: 5 fold luar dikali 3 fold dalam dikali 12 kombinasi parameter berarti 180 kali pelatihan model.
 
**Alternatif yang lebih murah** untuk pemakaian sehari-hari: sisihkan data uji di awal, pakai `GridSearchCV` biasa pada data latih, lalu ukur sekali di data uji yang disimpan tadi. Ini lebih sederhana dan cukup jujur, asalkan data uji benar-benar hanya dipakai sekali.
 
### Cara Mengambil Parameter Terbaik Setelah Nested
 
Nested cross-validation memberi Anda perkiraan performa, bukan satu set parameter final. Untuk model yang akan dipakai, latih ulang `GridSearchCV` pada seluruh data latih.
 
```python
pencari.fit(X_kerja, y_kerja)
model_final = pencari.best_estimator_
print("Parameter terpilih:", pencari.best_params_)
 
# Baru sekarang buka data uji, sekali saja
print("Skor di data uji:", round(model_final.score(X_uji, y_uji), 4))
```
 
## Menggabungkan dengan Pipeline
 
### Kenapa Wajib
 
Ini bagian yang paling sering dilanggar pemula, padahal efeknya besar.
 
Kalau Anda menskalakan data atau mengisi sel kosong **sebelum** validasi silang, maka perhitungan itu memakai seluruh data termasuk bagian yang nanti jadi fold uji. Informasi bocor ke setiap fold, dan skor Anda jadi terlalu bagus.
 
Dengan `Pipeline`, setiap fold mempelajari ulang penskalaan dan pengisiannya sendiri, hanya dari bagian latih fold itu.
 
### Membuktikan Selisihnya
 
```python
from sklearn.impute import SimpleImputer
from sklearn.feature_selection import SelectKBest, f_classif
 
# CARA SALAH: seleksi fitur dilakukan sekali di luar
pemilih = SelectKBest(f_classif, k=10)
X_dipilih = pemilih.fit_transform(X_kerja, y_kerja)     # melihat semua label
skor_salah = cross_val_score(LogisticRegression(max_iter=5000),
                             X_dipilih, y_kerja, cv=5, scoring="f1")
 
# CARA BENAR: seleksi fitur jadi bagian pipeline
pipe_benar = Pipeline([
    ("skala", StandardScaler()),
    ("pilih", SelectKBest(f_classif, k=10)),
    ("model", LogisticRegression(max_iter=5000)),
])
skor_benar = cross_val_score(pipe_benar, X_kerja, y_kerja, cv=5, scoring="f1")
 
print(f"Cara salah (terlalu optimistis): {skor_salah.mean():.4f}")
print(f"Cara benar                     : {skor_benar.mean():.4f}")
```
 
Selisihnya mungkin terlihat kecil pada dataset ini, tapi pada data dengan banyak kolom dan sedikit baris, selisihnya bisa sangat besar.
 
### Aturannya
 
Semua langkah yang **mempelajari sesuatu dari data** harus masuk ke dalam `Pipeline`. Itu termasuk penskalaan, pengisian sel kosong, encoding kategori, seleksi fitur, PCA, dan penyeimbangan kelas.
 
Langkah yang tidak mempelajari apa pun, seperti membuang kolom ID atau memperbaiki salah ketik, boleh dilakukan di luar.
 
## Panduan Memilih Strategi
 
### Alur Bertanya
 
**Langkah 1.** Apakah data Anda punya urutan waktu yang penting? Kalau ya, pakai `TimeSeriesSplit` dan berhenti di sini. Aturan lain tidak berlaku.
 
**Langkah 2.** Apakah satu entitas (orang, mesin, pelanggan) punya beberapa baris data? Kalau ya, pakai `GroupKFold` atau `StratifiedGroupKFold`.
 
**Langkah 3.** Apakah ini masalah klasifikasi? Kalau ya, pakai `StratifiedKFold`.
 
**Langkah 4.** Kalau ini regresi tanpa struktur khusus, pakai `KFold` dengan `shuffle=True`.
 
**Langkah 5.** Apakah Anda sedang menyetel parameter sekaligus ingin melaporkan performa? Kalau ya, pertimbangkan nested cross-validation, atau sisihkan data uji terpisah di awal.
 
### Tabel Ringkas
 
| Situasi data Anda | Strategi yang dipakai | Alasannya |
|---|---|---|
| Regresi biasa | `KFold(shuffle=True)` | Tidak ada kelas yang perlu dijaga |
| Klasifikasi apa pun | `StratifiedKFold` | Proporsi kelas tetap terjaga |
| Kelas sangat timpang | `StratifiedKFold` | Kelas minoritas ada di tiap fold |
| Data penjualan, saham, sensor harian | `TimeSeriesSplit` | Tidak boleh belajar dari masa depan |
| Prediksi dengan jeda waktu | `TimeSeriesSplit(gap=n)` | Menyisipkan jeda agar tidak bocor |
| Satu pasien banyak kunjungan | `GroupKFold` | Entitas tidak boleh ada di dua sisi |
| Kelompok + kelas timpang | `StratifiedGroupKFold` | Menangani keduanya sekaligus |
| Dataset sangat besar | `StratifiedShuffleSplit` | Jumlah iterasi bisa diatur bebas |
| Dataset kecil, hasil tidak stabil | `RepeatedStratifiedKFold` | Mengurangi pengaruh keberuntungan |
| Menyetel parameter + melapor skor | Nested CV | Skor tidak tercemar pencarian parameter |
 
## Kesalahan Pemula yang Sering Terjadi
 
### Memakai KFold Biasa untuk Data Berurutan Waktu
 
Ini kesalahan paling berbahaya karena hasilnya terlihat sangat bagus. Model belajar dari masa depan, dan Anda baru sadar setelah model dipakai di produksi.
 
### Lupa Mengurutkan Data Sebelum TimeSeriesSplit
 
`TimeSeriesSplit` hanya membagi berdasarkan nomor baris. Kalau baris belum diurutkan berdasarkan waktu, strategi ini tidak melakukan apa pun yang berguna, dan tidak ada peringatan yang muncul.
 
### Lupa Meneruskan groups pada GroupKFold
 
Kalau argumen `groups` tidak diteruskan ke `cross_val_score`, pengelompokannya tidak berlaku dan kebocoran tetap terjadi.
 
### Menskalakan Data di Luar Pipeline
 
Kelihatannya sepele, tapi ini membocorkan informasi ke setiap fold. Selalu bungkus dalam `Pipeline`.
 
### Melaporkan best_score_ dari GridSearchCV
 
Angka itu adalah hasil terbaik dari puluhan percobaan, jadi cenderung terlalu optimistis. Untuk laporan, pakai nested CV atau ukur di data uji yang benar-benar disimpan.
 
### Memakai Data Uji Berkali-kali
 
Setiap kali Anda melihat skor data uji lalu mengubah sesuatu berdasarkan angka itu, data uji jadi sedikit tercemar. Setelah dipakai puluhan kali, angkanya sudah tidak jujur lagi.
 
Simpan data uji dan buka sekali di akhir.
 
### Hanya Melihat Rata-rata, Mengabaikan Sebarannya
 
Model dengan rata-rata 0,85 dan naik-turun 0,02 lebih bisa diandalkan daripada model dengan rata-rata 0,87 tapi naik-turun 0,15. Selalu laporkan keduanya.
 
### Memakai Terlalu Banyak Fold pada Data Besar
 
Validasi silang 10-fold pada data satu juta baris berarti melatih model sepuluh kali dengan 900 ribu baris. Untuk data besar, 3 sampai 5 fold sudah cukup, atau pakai `ShuffleSplit` dengan sedikit iterasi.
 
### Lupa Menetapkan random_state
 
Tanpa itu, hasil berbeda tiap kali dijalankan dan Anda tidak bisa membandingkan dua percobaan secara adil.
 
## Penutup
 
Validasi silang bukan sekadar cara mendapat angka yang lebih meyakinkan. Fungsinya adalah memastikan angka yang Anda laporkan benar-benar mencerminkan performa model di dunia nyata.
 
Tiga hal untuk diingat:
 
**Pertama**, pilih strategi berdasarkan struktur data, bukan kebiasaan. Data berurutan waktu butuh `TimeSeriesSplit`, data berkelompok butuh `GroupKFold`, klasifikasi butuh `StratifiedKFold`. Memakai KFold biasa untuk semua situasi adalah sumber kesalahan yang paling umum.
 
**Kedua**, bungkus semua langkah persiapan data dalam `Pipeline`, supaya tiap fold benar-benar terisolasi.
 
**Ketiga**, pisahkan dengan tegas antara data untuk mengambil keputusan dan data untuk mengukur hasil akhir. Begitu data uji dipakai untuk memilih sesuatu, ia berhenti menjadi data uji.
 