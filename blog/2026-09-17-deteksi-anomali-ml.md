---
slug: deteksi-anomali-ml
title: "Deteksi Anomali: Panduan Machine Learning untuk Pemula #16"
authors: topekox
tags: [manchine learning, data mining, ai, data science, python]
---

Bayangkan Anda harus membangun sistem pendeteksi penipuan kartu kredit. Dari satu juta transaksi, hanya sekitar 100 yang merupakan penipuan. Itu 0,01 persen.
 
Kalau Anda memakai klasifikasi biasa, model akan menjawab "bukan penipuan" untuk semuanya dan mencatat akurasi 99,99 persen. Sempurna di atas kertas, tidak berguna sama sekali.
 
Deteksi anomali adalah pendekatan yang dirancang khusus untuk situasi seperti ini: ketika hal yang ingin ditemukan sangat langka, atau bahkan belum pernah terlihat sama sekali.
 
Artikel ini membahas tiga metode utama beserta hal yang sering lebih menentukan daripada pemilihan metode: cara menentukan ambang dan cara mengevaluasi tanpa label.

<!-- truncate -->

## Daftar Isi
 
1. Kenapa Deteksi Anomali Berbeda
2. Istilah Dasar yang Perlu Dipahami
3. Menyiapkan Data Contoh
4. Baseline Statistik
5. Isolation Forest
6. One-Class SVM
7. Local Outlier Factor
8. Autoencoder
9. Menentukan Ambang
10. Mengevaluasi Tanpa Label Lengkap
11. Penerapan di Dunia Nyata
12. Kesalahan Pemula yang Sering Terjadi
## Kenapa Deteksi Anomali Berbeda
 
### Masalah Utamanya
 
Pada klasifikasi biasa, Anda punya contoh yang cukup untuk kedua kelas. Model belajar membedakan keduanya.
 
Pada deteksi anomali, dua hal biasanya terjadi bersamaan:
 
**Kelas yang dicari sangat langka.** Bisa 1 persen, bisa 0,01 persen.
 
**Labelnya sering tidak ada.** Anda punya jutaan catatan tanpa keterangan mana yang normal dan mana yang tidak.
 
Bahkan kalau ada label, ada masalah lain: **anomali di masa depan bisa berbeda bentuknya dari anomali di masa lalu**. Penipu terus mengubah cara. Mesin bisa rusak dengan cara yang belum pernah terjadi.
 
### Pergeseran Cara Berpikir
 
Inilah perbedaan mendasarnya.
 
**Klasifikasi biasa** belajar: seperti apa ciri penipuan?
 
**Deteksi anomali** belajar: seperti apa ciri yang normal? Lalu tandai apa pun yang menyimpang darinya.
 
Pendekatan kedua jauh lebih kuat menghadapi bentuk serangan baru, karena tidak perlu pernah melihat contohnya lebih dulu.
 
### Contoh Penerapan Nyata
 
**Deteksi penipuan** pada transaksi kartu kredit, klaim asuransi, dan pinjaman online.
 
**Pemantauan sistem** untuk mendeteksi server yang bermasalah dari pola penggunaan CPU dan memori.
 
**Pemeliharaan prediktif** untuk mendeteksi mesin yang akan rusak dari getaran dan suhunya.
 
**Keamanan jaringan** untuk mendeteksi lalu lintas mencurigakan.
 
**Kontrol kualitas** untuk menemukan produk cacat di jalur produksi.
 
**Kesehatan** untuk menemukan hasil pemeriksaan yang tidak biasa.
 
## Istilah Dasar yang Perlu Dipahami
 
### Anomali, Outlier, dan Novelty
 
Ketiganya sering dipakai bergantian, tapi ada perbedaan halus yang mempengaruhi pilihan metode.
 
**Outlier** adalah data menyimpang yang **sudah ada di dalam** data Anda. Anda ingin menemukannya.
 
**Novelty** adalah data menyimpang yang **baru datang**, sementara data latih Anda sudah dipastikan bersih. Anda ingin mendeteksinya saat muncul.
 
Perbedaannya menentukan cara melatih: untuk novelty detection, model dilatih hanya dengan data normal.
 
### Tiga Jenis Anomali
 
**Anomali titik.** Satu data yang jelas menyimpang dari yang lain. Contohnya transaksi 500 juta di antara transaksi ratusan ribu.
 
**Anomali kontekstual.** Data yang normal dalam konteks tertentu tapi aneh dalam konteks lain. Contohnya pemakaian listrik tinggi itu normal siang hari, tapi mencurigakan pukul 3 pagi.
 
**Anomali kolektif.** Satu per satu terlihat normal, tapi rangkaiannya mencurigakan. Contohnya 50 transaksi kecil berturut-turut dalam 5 menit.
 
Sebagian besar metode di artikel ini menangani jenis pertama. Untuk jenis kedua dan ketiga, Anda perlu merancang fitur yang membawa konteks, misalnya "berapa transaksi dalam 1 jam terakhir".
 
### Contamination
 
**Contamination** adalah perkiraan proporsi anomali dalam data Anda. Hampir semua metode di scikit-learn memakai parameter ini.
 
Masalahnya, Anda biasanya tidak tahu nilainya. Ini salah satu tantangan praktis terbesar dalam deteksi anomali.
 
### Tiga Tingkat Ketersediaan Label
 
**Tanpa label sama sekali (unsupervised).** Paling umum. Model harus menebak sendiri mana yang menyimpang.
 
**Hanya data normal (semi-supervised).** Anda punya data yang dipastikan bersih. Model belajar seperti apa normal itu. Ini situasi ideal untuk autoencoder dan One-Class SVM.
 
**Ada sebagian label (supervised).** Kalau labelnya cukup banyak, klasifikasi biasa dengan `class_weight="balanced"` sering lebih baik daripada deteksi anomali.
 
## Menyiapkan Data Contoh
 
Kita akan membuat data transaksi dengan anomali yang kita tanam sendiri, supaya nanti bisa diperiksa apakah metodenya berhasil menemukannya.
 
```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
 
np.random.seed(42)
 
n_normal = 4000
n_anomali = 60          # 1,5 persen
 
# Transaksi normal: nominal wajar, jam kerja, lokasi biasa
normal = pd.DataFrame({
    "nominal": np.random.lognormal(11.5, 0.6, n_normal),
    "jam": np.clip(np.random.normal(14, 4, n_normal), 0, 23),
    "durasi_sesi": np.random.gamma(4, 25, n_normal),
    "jumlah_item": np.random.poisson(3, n_normal) + 1,
    "jarak_dari_rumah_km": np.random.exponential(8, n_normal),
})
 
# Anomali: campuran beberapa pola mencurigakan
anomali = pd.DataFrame({
    "nominal": np.concatenate([
        np.random.lognormal(14.5, 0.4, 25),      # nominal sangat besar
        np.random.lognormal(11.5, 0.6, 35),      # nominal normal, tapi...
    ]),
    "jam": np.concatenate([
        np.random.normal(14, 4, 25),
        np.random.uniform(1, 5, 35),             # ...transaksi dini hari
    ]),
    "durasi_sesi": np.concatenate([
        np.random.gamma(4, 25, 25),
        np.random.gamma(1, 5, 35),               # sesi sangat singkat
    ]),
    "jumlah_item": np.concatenate([
        np.random.poisson(3, 25) + 1,
        np.random.poisson(20, 35) + 1,           # item sangat banyak
    ]),
    "jarak_dari_rumah_km": np.concatenate([
        np.random.exponential(8, 25),
        np.random.uniform(500, 3000, 35),        # lokasi sangat jauh
    ]),
})
 
df = pd.concat([normal, anomali], ignore_index=True)
label_asli = np.r_[np.zeros(n_normal), np.ones(n_anomali)]     # untuk evaluasi saja
 
# Acak urutannya
urutan = np.random.permutation(len(df))
df = df.iloc[urutan].reset_index(drop=True)
label_asli = label_asli[urutan]
 
print(df.describe().T.round(2))
print(f"\nProporsi anomali sebenarnya: {label_asli.mean():.2%}")
```
 
#### Catatan Penting
 
Label `label_asli` di atas **hanya dipakai untuk mengevaluasi**, tidak pernah untuk melatih. Ini meniru situasi nyata di mana Anda mungkin punya sedikit label hasil investigasi manual.
 
### Melihat Datanya
 
```python
fig, ax = plt.subplots(1, 3, figsize=(15, 4))
 
ax[0].scatter(df["nominal"], df["jarak_dari_rumah_km"],
              c=label_asli, cmap="coolwarm", alpha=0.5, s=12)
ax[0].set_xscale("log"); ax[0].set_yscale("log")
ax[0].set_xlabel("Nominal"); ax[0].set_ylabel("Jarak (km)")
ax[0].set_title("Merah = anomali sebenarnya")
 
ax[1].scatter(df["jam"], df["nominal"], c=label_asli, cmap="coolwarm",
              alpha=0.5, s=12)
ax[1].set_yscale("log")
ax[1].set_xlabel("Jam"); ax[1].set_ylabel("Nominal")
 
ax[2].hist(np.log1p(df["nominal"]), bins=50)
ax[2].set_title("Sebaran nominal (skala log)")
 
plt.tight_layout()
plt.show()
```
 
Perhatikan bahwa sebagian anomali terlihat jelas terpisah, tapi sebagian lagi bercampur dengan data normal. Yang bercampur itulah yang sulit dan menjadi ujian sebenarnya.
 
### Menyiapkan Data untuk Model
 
```python
from sklearn.preprocessing import StandardScaler
 
# Nominal dan jarak sangat miring, dilogaritma dulu
X = df.copy()
X["nominal"] = np.log1p(X["nominal"])
X["jarak_dari_rumah_km"] = np.log1p(X["jarak_dari_rumah_km"])
X["durasi_sesi"] = np.log1p(X["durasi_sesi"])
 
penskala = StandardScaler()
X_skala = penskala.fit_transform(X)
 
print("Bentuk data:", X_skala.shape)
```
 
Penskalaan penting untuk One-Class SVM dan autoencoder. Isolation Forest sebenarnya tidak butuh, tapi tidak masalah kalau tetap dilakukan.
 
## Baseline Statistik
 
### Kenapa Mulai dari Sini
 
Sama seperti bidang lain, metode sederhana sering sudah cukup. Untuk anomali yang jelas menyimpang pada satu kolom, aturan statistik dasar bisa menemukannya tanpa model apa pun.
 
### Aturan Tiga Sigma
 
Berdasarkan sifat distribusi normal, hanya sekitar 0,3 persen data berada lebih dari 3 standar deviasi dari rata-rata.
 
```python
def deteksi_zscore(data, ambang=3.0):
    z = np.abs((data - data.mean()) / data.std())
    return z > ambang
 
for kolom in ["nominal", "jarak_dari_rumah_km", "jumlah_item"]:
    penanda = deteksi_zscore(X[kolom])
    ketemu = (penanda & (label_asli == 1)).sum()
    print(f"{kolom:22s}: menandai {penanda.sum():3d} data, "
          f"{ketemu:2d} di antaranya anomali sebenarnya")
```
 
### Aturan IQR
 
Lebih tahan terhadap data miring dibanding z-score.
 
```python
def deteksi_iqr(data, pengali=3.0):
    q1, q3 = data.quantile([0.25, 0.75])
    iqr = q3 - q1
    return (data < q1 - pengali * iqr) | (data > q3 + pengali * iqr)
 
penanda_iqr = deteksi_iqr(X["nominal"])
print(f"IQR menandai {penanda_iqr.sum()} data")
```
 
### Kelemahan Utamanya
 
Kedua cara di atas hanya melihat **satu kolom pada satu waktu**.
 
Masalahnya, banyak anomali nyata baru terlihat aneh kalau beberapa kolom dilihat bersamaan. Transaksi 500 ribu itu normal. Pukul 3 pagi juga normal. Tapi transaksi 500 ribu pukul 3 pagi dari lokasi 2.000 km dari rumah, itu mencurigakan.
 
```python
# Membuktikan masalahnya
gabungan = np.zeros(len(X), dtype=bool)
for kolom in X.columns:
    gabungan |= deteksi_zscore(X[kolom])
 
from sklearn.metrics import precision_score, recall_score
print(f"Gabungan z-score semua kolom:")
print(f"  Precision: {precision_score(label_asli, gabungan):.3f}")
print(f"  Recall   : {recall_score(label_asli, gabungan):.3f}")
```
 
Recall-nya biasanya rendah, karena anomali yang hanya terlihat dari kombinasi kolom tidak terjaring.
 
### Jarak Mahalanobis
 
Ini versi multivariat yang memperhitungkan hubungan antar kolom.
 
```python
from sklearn.covariance import EllipticEnvelope
 
mahalanobis = EllipticEnvelope(contamination=0.015, random_state=42)
prediksi_maha = mahalanobis.fit_predict(X_skala)
skor_maha = -mahalanobis.score_samples(X_skala)     # makin tinggi makin anomali
 
penanda_maha = (prediksi_maha == -1)
print(f"Mahalanobis: precision {precision_score(label_asli, penanda_maha):.3f}, "
      f"recall {recall_score(label_asli, penanda_maha):.3f}")
```
 
Kelemahannya, metode ini mengasumsikan data berbentuk elips. Kalau data normal Anda terdiri dari beberapa kelompok terpisah, hasilnya buruk.
 
## Isolation Forest
 
### Idenya
 
Ini metode yang paling sering dipakai, dan idenya sangat cerdas.
 
Sebagian besar metode berusaha memodelkan seperti apa data normal itu. Isolation Forest melakukan kebalikannya: ia berusaha **mengisolasi tiap data**, lalu memperhatikan mana yang paling mudah diisolasi.
 
### Analogi
 
Bayangkan permainan menebak dengan pertanyaan ya atau tidak.
 
Untuk menemukan satu orang tertentu di antara kerumunan yang seragam, Anda butuh banyak pertanyaan.
 
Tapi kalau ada satu orang yang tingginya dua meter sementara semua orang lain sekitar 165 cm, satu pertanyaan saja sudah cukup: "apakah tingginya di atas 190 cm?"
 
Anomali mudah diisolasi karena letaknya terpencil. Itulah yang diukur Isolation Forest.
 
### Cara Kerjanya
 
1. Pilih satu kolom secara acak
2. Pilih satu nilai potong secara acak di antara nilai minimum dan maksimum kolom itu
3. Bagi data menjadi dua
4. Ulangi sampai tiap data terisolasi sendirian
5. Catat berapa banyak pembagian yang dibutuhkan untuk tiap data
Data yang butuh sedikit pembagian dianggap anomali. Proses ini diulang dengan banyak pohon lalu dirata-ratakan.
 
### Kodenya
 
```python
from sklearn.ensemble import IsolationForest
 
iso = IsolationForest(
    n_estimators=200,          # jumlah pohon
    contamination=0.015,       # perkiraan proporsi anomali
    max_samples=256,           # sampel per pohon
    random_state=42,
    n_jobs=-1,
)
 
prediksi_iso = iso.fit_predict(X_skala)      # -1 = anomali, 1 = normal
skor_iso = -iso.score_samples(X_skala)       # makin tinggi makin anomali
 
penanda_iso = (prediksi_iso == -1)
 
print(f"Ditandai sebagai anomali: {penanda_iso.sum()}")
print(f"Precision: {precision_score(label_asli, penanda_iso):.3f}")
print(f"Recall   : {recall_score(label_asli, penanda_iso):.3f}")
```
 
### Memahami Parameternya
 
**`contamination`** adalah perkiraan proporsi anomali. Parameter ini **tidak mempengaruhi skor**, hanya menentukan di mana ambang keputusan diletakkan. Kalau Anda tidak tahu nilainya, pakai `"auto"` lalu tentukan ambang sendiri nanti.
 
**`n_estimators`** adalah jumlah pohon. Nilai 100 sampai 300 biasanya cukup.
 
**`max_samples`** adalah berapa data yang dipakai tiap pohon. Nilai bawaan 256 sudah bagus dan sengaja dibuat kecil, karena sampel kecil justru membuat anomali lebih mudah terisolasi.
 
### Melihat Sebaran Skor
 
```python
plt.figure(figsize=(9, 4))
plt.hist(skor_iso[label_asli == 0], bins=60, alpha=0.6, label="Normal", density=True)
plt.hist(skor_iso[label_asli == 1], bins=30, alpha=0.6, label="Anomali", density=True)
plt.axvline(np.percentile(skor_iso, 98.5), color="red", ls="--",
            label="Ambang 98,5 persentil")
plt.xlabel("Skor anomali"); plt.ylabel("Kepadatan")
plt.legend(); plt.title("Sebaran skor Isolation Forest")
plt.tight_layout()
plt.show()
```
 
Yang diharapkan: dua sebaran itu terpisah cukup jelas. Kalau bertumpuk sepenuhnya, metode ini tidak berhasil membedakan apa pun pada data Anda.
 
### Melihat Anomali Teratas
 
```python
peringkat = np.argsort(skor_iso)[::-1][:10]
hasil = df.iloc[peringkat].copy()
hasil["skor"] = skor_iso[peringkat].round(4)
hasil["benar_anomali"] = label_asli[peringkat].astype(int)
print(hasil.round(2).to_string())
```
 
Ini yang akan dilihat tim investigasi di dunia nyata: daftar kasus paling mencurigakan, diurutkan dari yang paling perlu diperiksa.
 
### Kelebihan dan Kekurangan
 
**Kelebihan:** sangat cepat bahkan untuk data besar, tidak butuh penskalaan, bekerja baik pada data berdimensi tinggi, dan sedikit parameter yang perlu disetel.
 
**Kekurangan:** kurang baik mendeteksi anomali lokal, yaitu data yang aneh dibanding tetangganya tapi tidak aneh secara keseluruhan. Juga kurang cocok untuk data yang polanya sangat berkelompok.
 
## One-Class SVM
 
### Idenya
 
Alih-alih mengisolasi, One-Class SVM **membangun pagar di sekeliling data normal**. Apa pun yang di luar pagar dianggap anomali.
 
### Analogi
 
Bayangkan sekumpulan domba di padang rumput. Anda memasang pagar mengelilingi tempat domba biasa berkumpul.
 
Kalau ada yang muncul di luar pagar, itu bukan domba Anda.
 
Pagarnya bisa berbentuk rumit mengikuti bentuk kerumunan, itulah gunanya kernel.
 
### Kodenya
 
```python
from sklearn.svm import OneClassSVM
 
ocsvm = OneClassSVM(
    kernel="rbf",       # bentuk pagar yang lentur
    nu=0.02,            # perkiraan proporsi anomali
    gamma="scale",      # seberapa berliku pagarnya
)
 
prediksi_svm = ocsvm.fit_predict(X_skala)
skor_svm = -ocsvm.score_samples(X_skala)
penanda_svm = (prediksi_svm == -1)
 
print(f"Precision: {precision_score(label_asli, penanda_svm):.3f}")
print(f"Recall   : {recall_score(label_asli, penanda_svm):.3f}")
```
 
### Memahami Dua Parameter Utama
 
**`nu`** menentukan berapa banyak data yang boleh berada di luar pagar. Nilai 0,02 berarti sekitar 2 persen. Ini sekaligus batas atas proporsi kesalahan yang diterima.
 
**`gamma`** menentukan seberapa berliku pagarnya. Nilai besar membuat pagar sangat mengikuti tiap titik, yang berisiko overfitting. Nilai kecil membuat pagar terlalu longgar.
 
Keduanya sangat mempengaruhi hasil, dan menyetelnya tanpa label itu sulit.
 
### Melatih Hanya dengan Data Normal
 
Kalau Anda punya data yang dipastikan bersih, cara ini jauh lebih baik.
 
```python
# Anggap kita punya data historis yang sudah diverifikasi bersih
X_bersih = X_skala[label_asli == 0][:2000]
 
ocsvm_bersih = OneClassSVM(kernel="rbf", nu=0.02, gamma="scale")
ocsvm_bersih.fit(X_bersih)                  # dilatih hanya dengan yang normal
 
prediksi_baru = ocsvm_bersih.predict(X_skala)
penanda_baru = (prediksi_baru == -1)
print(f"Dilatih dengan data bersih:")
print(f"  Precision: {precision_score(label_asli, penanda_baru):.3f}")
print(f"  Recall   : {recall_score(label_asli, penanda_baru):.3f}")
```
 
Inilah yang disebut *novelty detection*, dan biasanya hasilnya lebih baik daripada melatih dengan data yang sudah tercampur anomali.
 
### Kelemahan Utama
 
**Sangat lambat.** Waktu pelatihannya tumbuh jauh lebih cepat daripada pertambahan data. Di atas beberapa puluh ribu baris sudah tidak praktis.
 
**Sangat sensitif terhadap parameter.** Perubahan kecil pada `gamma` bisa mengubah hasil secara drastis.
 
**Wajib diskalakan.** Tanpa penskalaan, hasilnya kacau.
 
### Untuk Data Besar
 
```python
from sklearn.linear_model import SGDOneClassSVM
from sklearn.kernel_approximation import Nystroem
from sklearn.pipeline import make_pipeline
 
# Versi perkiraan yang jauh lebih cepat
ocsvm_cepat = make_pipeline(
    Nystroem(gamma="scale", n_components=200, random_state=42),
    SGDOneClassSVM(nu=0.02, random_state=42),
)
ocsvm_cepat.fit(X_skala)
```
 
## Local Outlier Factor
 
### Masalah yang Diselesaikan
 
Isolation Forest dan One-Class SVM melihat data secara keseluruhan. Keduanya kesulitan pada kasus berikut.
 
Bayangkan data terdiri dari dua kelompok: satu kelompok padat dan satu kelompok longgar. Sebuah titik yang berjarak 5 satuan dari pusat kelompok padat jelas menyimpang. Tapi jarak 5 satuan di kelompok longgar itu normal.
 
Metode global tidak bisa membedakan keduanya.
 
### Idenya
 
LOF membandingkan **kepadatan di sekitar sebuah titik dengan kepadatan di sekitar tetangganya**.
 
Kalau sebuah titik jauh lebih renggang daripada tetangga-tetangganya, ia dianggap anomali, tidak peduli seberapa padat wilayah lain.
 
### Kodenya
 
```python
from sklearn.neighbors import LocalOutlierFactor
 
lof = LocalOutlierFactor(
    n_neighbors=20,
    contamination=0.015,
)
 
prediksi_lof = lof.fit_predict(X_skala)
skor_lof = -lof.negative_outlier_factor_
penanda_lof = (prediksi_lof == -1)
 
print(f"Precision: {precision_score(label_asli, penanda_lof):.3f}")
print(f"Recall   : {recall_score(label_asli, penanda_lof):.3f}")
```
 
### Catatan Penting
 
Secara bawaan, LOF **tidak bisa dipakai untuk data baru**. Ia hanya memberi skor untuk data yang dipakai saat `fit_predict`.
 
Kalau Anda perlu menilai data baru, aktifkan mode novelty.
 
```python
lof_novelty = LocalOutlierFactor(n_neighbors=20, novelty=True)
lof_novelty.fit(X_bersih)                     # latih dengan data bersih
prediksi_data_baru = lof_novelty.predict(X_skala)
```
 
### Kapan Dipakai
 
Cocok kalau data Anda terdiri dari beberapa kelompok dengan kepadatan berbeda-beda.
 
Kurang cocok untuk data berdimensi sangat tinggi, karena berbasis jarak, dan lambat untuk data besar.
 
## Autoencoder
 
### Idenya
 
Ini pendekatan berbasis jaringan saraf, dan idenya elegan.
 
Latih sebuah jaringan untuk **menyalin masukannya sendiri**, tapi paksa informasinya melewati lapisan sempit di tengah.
 
Karena lapisan tengahnya sempit, jaringan tidak bisa sekadar menghafal. Ia harus mempelajari pola yang paling penting.
 
Setelah dilatih dengan data normal, jaringan menjadi sangat baik menyalin data normal. Tapi saat diberi anomali, hasil salinannya akan meleset jauh. **Besarnya kemelesetan itulah skor anomalinya**.
 
### Analogi
 
Bayangkan seorang peniru suara yang berlatih menirukan seratus penyanyi dangdut. Setelah lama berlatih, ia sangat mahir menirukan siapa pun dari genre itu.
 
Suatu hari ia diminta menirukan penyanyi opera. Hasilnya akan sangat berbeda dari aslinya.
 
Besarnya perbedaan itu menandakan bahwa suara tersebut berasal dari luar wilayah yang ia kenal.
 
### Arsitekturnya
 
```
Masukan (5 fitur)
   → Encoder: 5 → 16 → 8 → 3     (memampatkan)
   → Bagian sempit (3 angka)
   → Decoder: 3 → 8 → 16 → 5     (mengembalikan)
Keluaran (5 fitur)
```
 
Bagian tengah yang sempit itulah kuncinya. Kalau terlalu lebar, jaringan bisa menyalin apa pun termasuk anomali, dan metodenya gagal.
 
### Kodenya
 
```python
import torch
import torch.nn as nn
 
torch.manual_seed(42)
perangkat = torch.device("cuda" if torch.cuda.is_available() else "cpu")
 
class Autoencoder(nn.Module):
    def __init__(self, n_fitur, ukuran_sempit=3):
        super().__init__()
        self.encoder = nn.Sequential(
            nn.Linear(n_fitur, 16), nn.ReLU(),
            nn.Linear(16, 8), nn.ReLU(),
            nn.Linear(8, ukuran_sempit),
        )
        self.decoder = nn.Sequential(
            nn.Linear(ukuran_sempit, 8), nn.ReLU(),
            nn.Linear(8, 16), nn.ReLU(),
            nn.Linear(16, n_fitur),
        )
 
    def forward(self, x):
        return self.decoder(self.encoder(x))
 
model = Autoencoder(X_skala.shape[1]).to(perangkat)
print(model)
```
 
### Melatihnya dengan Data Normal
 
```python
from torch.utils.data import TensorDataset, DataLoader
 
# Latih HANYA dengan data yang dianggap normal
X_latih = torch.tensor(X_bersih, dtype=torch.float32)
loader = DataLoader(TensorDataset(X_latih, X_latih), batch_size=64, shuffle=True)
 
kriteria = nn.MSELoss()
pengoptimal = torch.optim.Adam(model.parameters(), lr=1e-3)
 
riwayat = []
for epoch in range(80):
    model.train()
    total = 0
    for batch, _ in loader:
        batch = batch.to(perangkat)
        pengoptimal.zero_grad()
        keluaran = model(batch)
        rugi = kriteria(keluaran, batch)      # target = masukan itu sendiri
        rugi.backward()
        pengoptimal.step()
        total += rugi.item() * len(batch)
 
    riwayat.append(total / len(X_latih))
    if epoch % 20 == 0 or epoch == 79:
        print(f"Epoch {epoch:2d}: kerugian = {riwayat[-1]:.5f}")
```
 
Perhatikan bahwa targetnya adalah masukan itu sendiri. Inilah yang membuat autoencoder disebut belajar tanpa label.
 
### Menghitung Skor Anomali
 
```python
model.eval()
with torch.no_grad():
    X_semua = torch.tensor(X_skala, dtype=torch.float32).to(perangkat)
    rekonstruksi = model(X_semua)
    # Rata-rata selisih kuadrat per baris
    skor_ae = ((X_semua - rekonstruksi) ** 2).mean(dim=1).cpu().numpy()
 
print(f"Skor rata-rata data normal : {skor_ae[label_asli == 0].mean():.5f}")
print(f"Skor rata-rata anomali     : {skor_ae[label_asli == 1].mean():.5f}")
```
 
Kalau selisihnya besar, autoencoder berhasil.
 
### Menentukan Ambang dan Mengukur Hasil
 
```python
ambang_ae = np.percentile(skor_ae, 98.5)
penanda_ae = skor_ae > ambang_ae
 
print(f"Precision: {precision_score(label_asli, penanda_ae):.3f}")
print(f"Recall   : {recall_score(label_asli, penanda_ae):.3f}")
 
plt.figure(figsize=(9, 4))
plt.hist(skor_ae[label_asli == 0], bins=60, alpha=0.6, label="Normal", density=True)
plt.hist(skor_ae[label_asli == 1], bins=30, alpha=0.6, label="Anomali", density=True)
plt.axvline(ambang_ae, color="red", ls="--", label="Ambang")
plt.xscale("log"); plt.legend()
plt.title("Sebaran kesalahan rekonstruksi")
plt.tight_layout()
plt.show()
```
 
### Keunggulan Tambahan: Tahu Kolom Mana yang Aneh
 
Ini yang tidak bisa dilakukan metode lain. Autoencoder memberi tahu **fitur mana** yang paling meleset, sehingga hasilnya lebih bisa dijelaskan.
 
```python
with torch.no_grad():
    galat_per_fitur = ((X_semua - rekonstruksi) ** 2).cpu().numpy()
 
idx_teratas = np.argsort(skor_ae)[::-1][:3]
for idx in idx_teratas:
    penyumbang = pd.Series(galat_per_fitur[idx], index=X.columns)
    print(f"\nBaris {idx} (anomali sebenarnya: {int(label_asli[idx])}):")
    print(penyumbang.sort_values(ascending=False).head(3).round(4))
```
 
Ini sangat berguna untuk tim investigasi: bukan cuma "transaksi ini mencurigakan", tapi "mencurigakan terutama karena jaraknya dari rumah".
 
### Kapan Autoencoder Unggul
 
**Unggul** untuk data berdimensi tinggi, data gambar, data sinyal, dan ketika Anda punya banyak data normal yang bersih.
 
**Kurang cocok** kalau datanya sedikit, atau kalau tidak punya GPU dan datanya besar. Untuk data tabel sederhana, Isolation Forest sering sudah cukup dan jauh lebih murah.
 
## Menentukan Ambang
 
### Masalahnya
 
Semua metode menghasilkan **skor kontinu**, sementara Anda butuh keputusan biner: periksa atau tidak.
 
Menentukan ambang sering lebih menentukan hasil akhir daripada memilih metode.
 
### Cara 1: Berdasarkan Perkiraan Proporsi
 
```python
ambang = np.percentile(skor_iso, 98.5)      # anggap 1,5 persen adalah anomali
```
 
Sederhana, tapi butuh perkiraan yang Anda mungkin tidak punya.
 
### Cara 2: Berdasarkan Kapasitas Tim
 
Ini cara yang paling praktis di dunia nyata dan sering diabaikan.
 
Kalau tim investigasi Anda hanya sanggup memeriksa 50 kasus per hari, tidak ada gunanya menandai 500 kasus.
 
```python
kapasitas_harian = 50
ambang_kapasitas = np.sort(skor_iso)[::-1][kapasitas_harian]
penanda_kapasitas = skor_iso >= ambang_kapasitas
 
print(f"Menandai {penanda_kapasitas.sum()} kasus teratas")
print(f"Precision: {precision_score(label_asli, penanda_kapasitas):.3f}")
```
 
Dengan cara ini, ukuran yang relevan adalah **Precision@K**: dari 50 kasus yang diperiksa, berapa yang benar-benar bermasalah.
 
### Cara 3: Berdasarkan Biaya
 
Kalau Anda tahu biaya tiap jenis kesalahan, ambang bisa dihitung.
 
```python
biaya_investigasi = 50_000          # biaya memeriksa satu kasus
biaya_penipuan_lolos = 3_000_000    # kerugian kalau penipuan lolos
 
hasil = []
for persentil in [95, 97, 98, 98.5, 99, 99.5, 99.9]:
    amb = np.percentile(skor_iso, persentil)
    tanda = skor_iso >= amb
 
    tp = ((tanda == 1) & (label_asli == 1)).sum()
    fp = ((tanda == 1) & (label_asli == 0)).sum()
    fn = ((tanda == 0) & (label_asli == 1)).sum()
 
    total_biaya = (tp + fp) * biaya_investigasi + fn * biaya_penipuan_lolos
    hasil.append({"persentil": persentil, "ditandai": tanda.sum(),
                  "tertangkap": tp, "lolos": fn,
                  "total_biaya_juta": round(total_biaya / 1e6, 1)})
 
print(pd.DataFrame(hasil).to_string(index=False))
```
 
Pilih persentil dengan total biaya terkecil. Ini cara paling bisa dipertanggungjawabkan ke pihak bisnis, karena bahasanya rupiah, bukan skor.
 
## Mengevaluasi Tanpa Label Lengkap
 
### Kalau Tidak Ada Label Sama Sekali
 
Ini situasi paling umum, dan tidak ada metrik yang benar-benar memuaskan. Yang bisa dilakukan:
 
**Periksa manual kasus teratas.** Ambil 20 sampai 50 skor tertinggi, minta ahli domain memeriksanya. Ini memberi perkiraan precision.
 
**Lihat apakah hasilnya masuk akal.** Kalau anomali yang ditandai ternyata semuanya transaksi dari satu toko tertentu, mungkin itu bukan anomali melainkan pola bisnis yang wajar.
 
**Bandingkan beberapa metode.** Kalau tiga metode berbeda sama-sama menandai kasus yang sama, keyakinannya lebih tinggi.
 
```python
# Melihat kesepakatan antar metode
kesepakatan = penanda_iso.astype(int) + penanda_svm.astype(int) + penanda_lof.astype(int)
print("Jumlah data yang ditandai oleh:")
for n in [1, 2, 3]:
    jumlah = (kesepakatan == n).sum()
    if jumlah > 0:
        akurasi = label_asli[kesepakatan == n].mean()
        print(f"  {n} metode: {jumlah:4d} data, {akurasi:.1%} benar-benar anomali")
```
 
Perhatikan polanya: makin banyak metode yang sepakat, makin tinggi peluang itu memang anomali.
 
### Kalau Ada Sebagian Label
 
Pakai metrik yang tepat untuk kelas langka.
 
```python
from sklearn.metrics import average_precision_score, roc_auc_score
 
print(f"{'Metode':22s} {'PR-AUC':>8} {'ROC-AUC':>9}")
for nama, skor in [("Isolation Forest", skor_iso),
                   ("One-Class SVM", skor_svm),
                   ("LOF", skor_lof),
                   ("Autoencoder", skor_ae),
                   ("Mahalanobis", skor_maha)]:
    pr = average_precision_score(label_asli, skor)
    roc = roc_auc_score(label_asli, skor)
    print(f"{nama:22s} {pr:8.4f} {roc:9.4f}")
```
 
### Kenapa PR-AUC, Bukan ROC-AUC
 
Pada data dengan 1,5 persen anomali, ROC-AUC bisa terlihat tinggi meski precision-nya buruk. Penyebabnya, jumlah kelas negatif yang sangat besar membuat proporsi salah alarm terlihat kecil.
 
PR-AUC lebih jujur karena hanya fokus pada seberapa baik model menemukan kelas positif.
 
Patokan pembacanya: PR-AUC untuk tebakan acak sama dengan proporsi anomali itu sendiri. Kalau anomalinya 1,5 persen, PR-AUC 0,30 berarti model 20 kali lebih baik daripada acak.
 
### Precision@K
 
Ini metrik paling relevan untuk penerapan nyata.
 
```python
def precision_at_k(skor, label, k):
    teratas = np.argsort(skor)[::-1][:k]
    return label[teratas].mean()
 
for k in [10, 25, 50, 100]:
    print(f"Precision@{k:3d}: "
          f"IF={precision_at_k(skor_iso, label_asli, k):.2f}  "
          f"AE={precision_at_k(skor_ae, label_asli, k):.2f}")
```
 
Angka ini langsung menjawab pertanyaan tim: dari 50 kasus yang kami periksa hari ini, berapa yang benar-benar bermasalah?
 
## Penerapan di Dunia Nyata
 
### Rekayasa Fitur Sering Lebih Menentukan
 
Ini pelajaran terpenting dari pengalaman praktis: fitur yang tepat lebih menentukan daripada pemilihan metode.
 
Untuk deteksi penipuan, fitur mentah seperti nominal transaksi jarang cukup. Yang berguna biasanya fitur perbandingan.
 
```python
# Contoh fitur yang jauh lebih informatif
# rasio_terhadap_rata_pengguna = nominal / rata_rata_nominal_pengguna_ini
# jumlah_transaksi_1jam_terakhir
# selisih_jam_dari_kebiasaan_pengguna
# apakah_lokasi_baru_bagi_pengguna
# kecepatan_perpindahan_lokasi (km per jam sejak transaksi sebelumnya)
```
 
Fitur terakhir itu sering sangat ampuh: kalau seseorang bertransaksi di Jakarta lalu 10 menit kemudian di Surabaya, itu mustahil secara fisik.
 
### Anomali Kontekstual
 
Ingat bahwa banyak anomali hanya terlihat aneh dalam konteksnya. Cara menanganinya adalah membawa konteks ke dalam fitur.
 
Alih-alih memakai kolom `nominal` mentah, pakai `nominal dibagi rata-rata nominal pengguna ini dalam 30 hari terakhir`. Sekarang transaksi 5 juta dari orang yang biasa berbelanja 200 ribu akan menonjol, sementara transaksi 5 juta dari pengusaha besar tetap dianggap normal.
 
### Model Perlu Dilatih Ulang
 
Pola normal berubah seiring waktu. Perilaku belanja berubah saat Lebaran. Beban server berubah saat ada promo.
 
Kalau model tidak diperbarui, jumlah alarm palsu akan meningkat perlahan.
 
```python
# Pola pemantauan sederhana
# 1. Catat jumlah alarm per hari
# 2. Kalau melonjak tanpa sebab jelas, kemungkinan pola normal bergeser
# 3. Latih ulang dengan data terbaru secara berkala
```
 
### Melibatkan Manusia
 
Sistem deteksi anomali hampir tidak pernah dipakai untuk keputusan otomatis penuh, terutama kalau konsekuensinya besar.
 
Pola yang umum: sistem menyaring jutaan kasus menjadi puluhan yang paling mencurigakan, lalu manusia yang memutuskan.
 
Hasil keputusan manusia itu kemudian dijadikan label untuk memperbaiki sistem. Lama-kelamaan, labelnya cukup banyak untuk beralih ke klasifikasi biasa yang biasanya lebih akurat.
 
### Perbandingan Metode
 
| Aspek | Statistik | Isolation Forest | One-Class SVM | LOF | Autoencoder |
|---|---|---|---|---|---|
| Kecepatan | Sangat cepat | Cepat | Lambat | Sedang | Sedang |
| Data besar | Ya | Ya | Tidak | Tidak | Ya |
| Dimensi tinggi | Tidak | Ya | Sedang | Tidak | Ya |
| Butuh penskalaan | Tidak | Tidak | Ya | Ya | Ya |
| Anomali lokal | Tidak | Kurang | Sedang | Ya | Sedang |
| Bisa dijelaskan | Ya | Sedang | Tidak | Sedang | Ya, per fitur |
| Data untuk melatih | Sedikit | Sedang | Sedang | Sedang | Banyak |
 
### Urutan yang Disarankan
 
**Langkah 1.** Mulai dari aturan statistik sederhana. Kadang sudah cukup, dan selalu berguna sebagai pembanding.
 
**Langkah 2.** Coba Isolation Forest. Cepat, sedikit parameter, dan biasanya hasilnya bagus.
 
**Langkah 3.** Fokuskan usaha pada rekayasa fitur, bukan mengganti metode. Inilah yang biasanya memberi lompatan terbesar.
 
**Langkah 4.** Coba autoencoder kalau data Anda berdimensi tinggi dan jumlahnya banyak.
 
**Langkah 5.** Begitu label hasil investigasi terkumpul cukup banyak, pertimbangkan beralih ke klasifikasi biasa dengan `class_weight="balanced"`.
 
## Kesalahan Pemula yang Sering Terjadi
 
### Memakai Akurasi sebagai Metrik
 
Pada data dengan 1 persen anomali, menjawab "semuanya normal" menghasilkan akurasi 99 persen. Pakai PR-AUC dan Precision@K.
 
### Memakai ROC-AUC pada Data Sangat Timpang
 
Angkanya bisa terlihat tinggi meski precision buruk. PR-AUC lebih jujur.
 
### Melatih dengan Data yang Tercemar Anomali
 
Kalau data latih mengandung banyak anomali, model akan menganggapnya normal. Untuk One-Class SVM dan autoencoder, usahakan melatih dengan data yang sudah dipastikan bersih.
 
### Menebak contamination Secara Sembarangan
 
Parameter ini menentukan berapa banyak alarm yang muncul. Kalau tidak tahu nilainya, pakai `"auto"` dan tentukan ambang berdasarkan kapasitas tim atau perhitungan biaya.
 
### Lupa Menskalakan Data
 
One-Class SVM, LOF, dan autoencoder semuanya berbasis jarak atau gradien. Tanpa penskalaan, kolom bernilai besar mendominasi dan hasilnya kacau.
 
### Mengabaikan Rekayasa Fitur
 
Mengganti dari Isolation Forest ke autoencoder biasanya menaikkan hasil sedikit. Menambahkan fitur "rasio terhadap kebiasaan pengguna" bisa mengubah segalanya.
 
### Mengira Semua Anomali Itu Buruk
 
Anomali hanya berarti "tidak biasa". Bisa jadi itu pelanggan korporat baru, promo besar, atau perubahan sah dalam bisnis. Selalu verifikasi sebelum bertindak.
 
### Menandai Terlalu Banyak Kasus
 
Kalau sistem menghasilkan 500 alarm per hari sementara tim hanya sanggup memeriksa 50, sistemnya tidak berguna. Sesuaikan ambang dengan kapasitas nyata.
 
### Tidak Pernah Melatih Ulang
 
Pola normal bergeser seiring waktu. Model yang tidak diperbarui akan menghasilkan makin banyak alarm palsu.
 
### Membuang Semua Outlier Saat Preprocessing
 
Kalau tujuan Anda adalah menemukan anomali, membuang outlier di tahap pembersihan sama saja membuang jawabannya.
 
## Penutup
 
Deteksi anomali adalah bidang yang menantang karena Anda sering bekerja tanpa jawaban yang pasti. Tidak ada label, tidak ada kepastian berapa banyak anomali yang sebenarnya ada, dan bentuk anomali bisa berubah kapan saja.
 
Tiga hal untuk diingat:
 
**Pertama**, mulai dari Isolation Forest. Cepat, sedikit parameter, dan biasanya sudah bagus. Baru pindah ke metode lain kalau ada alasan jelas.
 
**Kedua**, rekayasa fitur lebih menentukan daripada pemilihan metode. Fitur yang membawa konteks, seperti perbandingan terhadap kebiasaan pengguna itu sendiri, hampir selalu memberi lompatan yang tidak bisa ditandingi pergantian algoritma.
 
**Ketiga**, tentukan ambang berdasarkan kapasitas nyata tim atau perhitungan biaya, bukan berdasarkan angka bawaan. Sistem yang menghasilkan lebih banyak alarm daripada yang sanggup diperiksa sama tidak bergunanya dengan sistem yang tidak menghasilkan alarm sama sekali.
 