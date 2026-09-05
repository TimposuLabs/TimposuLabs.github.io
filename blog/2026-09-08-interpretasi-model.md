---
slug: interpretasi-model
title: "Interpretasi Model: Panduan Machine Learning untuk Pemula #7"
authors: topekox
tags: [manchine learning, data mining, ai, data science, python]
---

Anda selesai membangun model. Skornya bagus. Anda presentasikan ke atasan atau klien, dan pertanyaan pertama yang muncul hampir selalu sama:
 
*"Kenapa modelnya memutuskan begitu?"*
 
Kalau jawaban Anda hanya "karena hasil pelatihannya begitu", model itu kemungkinan besar tidak akan dipakai. Di banyak bidang seperti perbankan, asuransi, dan kesehatan, ketidakmampuan menjelaskan bahkan bisa membuat model dilarang dipakai secara hukum.
 
Artikel ini membahas tiga alat utama untuk membuka isi model: permutation importance, partial dependence plot, dan SHAP. Ketiganya bekerja pada model apa pun, termasuk yang paling rumit sekalipun.

<!-- truncate -->

## Daftar Isi
 
1. Kenapa Interpretasi Model Penting
2. Istilah Dasar yang Perlu Dipahami
3. Menyiapkan Data dan Model Contoh
4. Cara Bawaan dan Kelemahannya
5. Permutation Importance
6. Partial Dependence Plot
7. SHAP
8. Membandingkan Ketiga Alat
9. Menjawab Pertanyaan Nyata di Dunia Kerja
10. Kesalahan Pemula yang Sering Terjadi
## Kenapa Interpretasi Model Penting
 
### Analogi Sederhana
 
Bayangkan Anda punya karyawan yang selalu memberi rekomendasi tepat, tapi setiap kali ditanya alasannya dia hanya menjawab "pokoknya begitu".
 
Awalnya Anda mungkin percaya karena rekomendasinya sering benar. Tapi begitu ada satu keputusan yang aneh, Anda tidak punya cara memeriksa apakah dia benar-benar paham atau cuma beruntung selama ini.
 
Model machine learning persis seperti itu. Skor bagus tidak membuktikan alasannya benar.
 
### Empat Alasan Praktis
 
**Membangun kepercayaan.** Orang tidak akan memakai sistem yang tidak mereka pahami, sebagus apa pun angkanya.
 
**Menemukan kesalahan.** Interpretasi sering mengungkap kebocoran data. Kalau ternyata satu kolom mendominasi seluruh keputusan model, dan kolom itu adalah `tanggal_penutupan_akun` pada model prediksi berhenti berlangganan, Anda baru menyadari model itu mengintip jawaban.
 
**Kewajiban hukum.** Di banyak negara, keputusan otomatis yang merugikan seseorang, misalnya penolakan pinjaman, wajib bisa dijelaskan kepada orang tersebut.
 
**Menghasilkan wawasan bisnis.** Kadang yang berharga bukan prediksinya, tapi pemahaman tentang faktor apa yang berpengaruh.
 
### Model Transparan dan Model Kotak Hitam
 
**Model transparan** bisa dibaca langsung. Regresi linear punya koefisien yang bisa diterjemahkan jadi kalimat. Pohon keputusan bisa dicetak jadi aturan bertingkat.
 
**Model kotak hitam** tidak bisa dibaca langsung. Random Forest dengan 500 pohon, gradient boosting dengan ribuan iterasi, dan jaringan saraf termasuk kategori ini.
 
Masalahnya, model kotak hitam biasanya lebih akurat. Alat-alat di artikel ini menjembatani keduanya: Anda tetap memakai model akurat, tapi tetap bisa menjelaskannya.
 
## Istilah Dasar yang Perlu Dipahami
 
### Penjelasan Global dan Lokal
 
**Penjelasan global** menjawab: bagaimana model ini bekerja secara keseluruhan? Fitur apa yang paling berpengaruh terhadap semua prediksi?
 
**Penjelasan lokal** menjawab: kenapa **baris ini** diprediksi begini? Kenapa pelanggan bernama Budi diprediksi akan berhenti berlangganan?
 
Keduanya dibutuhkan dalam situasi berbeda. Atasan biasanya bertanya secara global. Pelanggan yang pinjamannya ditolak bertanya secara lokal.
 
| Alat | Global | Lokal |
|---|---|---|
| Permutation importance | Ya | Tidak |
| Partial dependence plot | Ya | Tidak |
| SHAP | Ya | Ya |
 
### Alat yang Bekerja untuk Model Apa Pun
 
Ketiga alat di artikel ini bersifat *model-agnostic*, artinya bekerja untuk model apa pun tanpa perlu tahu isi dalamnya. Cukup bisa memanggil `predict()`.
 
Ini keunggulan besar. Anda bisa memakai alat yang sama untuk membandingkan regresi logistik dengan Random Forest secara adil.
 
### Peringatan Paling Penting: Korelasi Bukan Kausalitas
 
Ini harus dipahami sejak awal, sebelum melihat satu grafik pun.
 
Semua alat dalam artikel ini menjelaskan **apa yang dipakai model untuk memprediksi**. Itu **bukan** berarti hubungan sebab-akibat di dunia nyata.
 
Contohnya, model bisa menemukan bahwa jumlah komplain sangat berpengaruh pada prediksi berhenti berlangganan. Itu tidak berarti melarang orang berkomplain akan membuat mereka tetap berlangganan. Komplain adalah gejala ketidakpuasan, bukan penyebabnya.
 
Kesalahan menafsirkan ini bisa berujung pada keputusan bisnis yang mahal dan keliru. Bagian akhir artikel membahasnya lebih lanjut.
 
## Menyiapkan Data dan Model Contoh
 
Supaya bisa memeriksa apakah alat interpretasi bekerja dengan benar, kita akan membuat data yang **aturannya kita ketahui persis**. Nanti kita cek apakah alat-alat itu berhasil menemukan aturan yang sebenarnya.
 
```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
 
RANDOM_STATE = 42
rng = np.random.RandomState(RANDOM_STATE)
n = 3000
 
df = pd.DataFrame({
    "umur": rng.randint(18, 70, n),
    "gaji_juta": rng.uniform(3, 30, n).round(1),
    "lama_langganan_bulan": rng.randint(1, 60, n),
    "jumlah_komplain": rng.poisson(1.2, n),
    "skor_kepuasan": rng.randint(1, 11, n),
    "jumlah_login_bulanan": rng.poisson(15, n),
})
 
# Aturan sebenarnya yang kita tetapkan sendiri:
# - Makin baru berlangganan, makin mungkin berhenti
# - Makin banyak komplain, makin mungkin berhenti
# - Makin rendah kepuasan, makin mungkin berhenti
# - Umur, gaji, dan jumlah login SAMA SEKALI tidak berpengaruh
skor_risiko = (
    - 0.06 * df["lama_langganan_bulan"]
    + 0.80 * df["jumlah_komplain"]
    - 0.35 * df["skor_kepuasan"]
    + 2.0
    + rng.randn(n) * 0.5                 # gangguan acak
)
peluang = 1 / (1 + np.exp(-skor_risiko))
df["berhenti"] = (rng.rand(n) < peluang).astype(int)
 
X = df.drop(columns="berhenti")
y = df["berhenti"]
 
print("Proporsi yang berhenti:", round(y.mean(), 3))
print(X.head())
```
 
Ingat baik-baik: tiga kolom berpengaruh (`lama_langganan_bulan`, `jumlah_komplain`, `skor_kepuasan`), dan tiga kolom tidak berpengaruh sama sekali (`umur`, `gaji_juta`, `jumlah_login_bulanan`).
 
### Melatih Model
 
```python
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
 
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=RANDOM_STATE
)
 
model = RandomForestClassifier(
    n_estimators=300, min_samples_leaf=5,
    random_state=RANDOM_STATE, n_jobs=-1,
)
model.fit(X_train, y_train)
 
print(classification_report(y_test, model.predict(X_test), digits=3))
```
 
Sekarang kita punya model kotak hitam yang cukup akurat. Mari kita buka isinya.
 
## Cara Bawaan dan Kelemahannya
 
### Koefisien pada Model Linear
 
Model linear paling mudah dijelaskan karena punya koefisien yang bisa dibaca langsung.
 
```python
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
 
linear = Pipeline([
    ("skala", StandardScaler()),
    ("model", LogisticRegression(max_iter=5000)),
])
linear.fit(X_train, y_train)
 
koef = pd.Series(linear.named_steps["model"].coef_[0], index=X_train.columns)
print(koef.sort_values(key=abs, ascending=False).round(4))
```
 
#### Cara Membacanya
 
Tanda positif berarti menaikkan peluang kelas positif, tanda negatif berarti menurunkan.
 
Besar kecilnya angka menunjukkan kekuatan pengaruh, **tapi hanya kalau fiturnya sudah diskalakan**. Tanpa penskalaan, koefisien fitur bersatuan juta akan terlihat kecil padahal pengaruhnya besar.
 
#### Keterbatasannya
 
Koefisien hanya bermakna untuk model linear. Untuk Random Forest atau boosting, tidak ada koefisien sama sekali.
 
### feature_importances_ pada Model Pohon
 
Model berbasis pohon punya atribut bawaan yang terlihat menjanjikan.
 
```python
bawaan = pd.Series(model.feature_importances_, index=X_train.columns)
print(bawaan.sort_values(ascending=False).round(4))
```
 
### Kenapa Angka Bawaan Ini Bisa Menyesatkan
 
Ini penting dipahami, karena banyak tutorial memakai atribut ini tanpa peringatan.
 
**Masalah pertama: bias terhadap fitur berkardinalitas tinggi.** Kolom dengan banyak nilai unik, misalnya gaji dengan ribuan nilai berbeda, punya lebih banyak kemungkinan titik potong. Peluangnya terpilih jadi lebih besar meski sebenarnya tidak informatif.
 
**Masalah kedua: dihitung dari data latih.** Angka ini mengukur seberapa sering fitur dipakai saat membangun pohon, bukan seberapa berguna fitur itu untuk data baru. Fitur yang membantu model menghafal akan tampak penting.
 
### Membuktikan Masalahnya
 
```python
# Tambahkan kolom acak yang jelas tidak berguna
X_train_uji = X_train.copy()
X_test_uji = X_test.copy()
X_train_uji["nomor_acak"] = rng.rand(len(X_train))     # banyak nilai unik
X_test_uji["nomor_acak"] = rng.rand(len(X_test))
X_train_uji["koin_acak"] = rng.randint(0, 2, len(X_train))   # cuma 2 nilai
X_test_uji["koin_acak"] = rng.randint(0, 2, len(X_test))
 
model_uji = RandomForestClassifier(n_estimators=300, min_samples_leaf=5,
                                   random_state=RANDOM_STATE, n_jobs=-1)
model_uji.fit(X_train_uji, y_train)
 
bawaan_uji = pd.Series(model_uji.feature_importances_, index=X_train_uji.columns)
print(bawaan_uji.sort_values(ascending=False).round(4))
```
 
Perhatikan posisi `nomor_acak`. Kolom yang isinya angka acak murni, tanpa hubungan apa pun dengan target, sering muncul lebih tinggi daripada `koin_acak` yang sama-sama tidak berguna. Bahkan kadang mengalahkan fitur asli yang lemah.
 
Ini terjadi karena `nomor_acak` punya banyak nilai unik sehingga banyak dipakai untuk memecah data, bukan karena berguna.
 
Kesimpulannya: jangan mengandalkan `feature_importances_` bawaan untuk pengambilan keputusan. Pakai permutation importance.
 
## Permutation Importance
 
### Ide Dasarnya
 
Alat ini menjawab satu pertanyaan sederhana: **kalau kolom ini dirusak, seberapa jelek modelnya jadi?**
 
Kalau merusak sebuah kolom membuat skor anjlok, berarti kolom itu penting. Kalau skornya tidak berubah, berarti kolom itu tidak dipakai.
 
### Analogi
 
Bayangkan sebuah tim sepak bola. Untuk mengetahui siapa pemain paling penting, Anda coba mainkan pertandingan berkali-kali sambil mengacak posisi satu pemain setiap kali, misalnya menyuruh kiper bermain sambil ditutup matanya.
 
Kalau tim langsung kalah telak saat kiper dikacaukan, berarti kiper itu penting. Kalau hasilnya sama saja saat pemain cadangan dikacaukan, berarti kontribusinya kecil.
 
### Cara Kerjanya Langkah demi Langkah
 
1. Ukur skor model pada data uji. Simpan sebagai skor awal.
2. Ambil satu kolom, acak isinya secara acak antar baris. Hubungan kolom itu dengan target jadi rusak, tapi sebarannya tetap sama.
3. Ukur skor lagi dengan kolom yang sudah diacak.
4. Selisih antara skor awal dan skor baru adalah tingkat kepentingan kolom itu.
5. Kembalikan kolom ke keadaan semula, ulangi untuk kolom berikutnya.
Karena pengacakan bersifat acak, langkah ini diulang beberapa kali dan hasilnya dirata-ratakan.
 
### Contoh Kode
 
```python
from sklearn.inspection import permutation_importance
 
hasil = permutation_importance(
    model_uji, X_test_uji, y_test,
    n_repeats=20,              # diulang 20 kali per kolom
    scoring="f1",              # metrik yang dipakai
    random_state=RANDOM_STATE,
    n_jobs=-1,
)
 
kepentingan = pd.DataFrame({
    "fitur": X_test_uji.columns,
    "rata_penurunan": hasil.importances_mean,
    "naik_turun": hasil.importances_std,
}).sort_values("rata_penurunan", ascending=False)
 
print(kepentingan.round(4).to_string(index=False))
```
 
### Membaca Hasilnya
 
**Angka besar dan positif** berarti fitur itu penting. Merusaknya membuat skor turun jauh.
 
**Angka mendekati nol** berarti fitur itu tidak dipakai model. Merusaknya tidak berpengaruh.
 
**Angka negatif** berarti model justru sedikit membaik saat fitur itu dirusak. Ini biasanya cuma keacakan, tapi kalau angkanya cukup besar, fitur itu mungkin memang mengganggu dan bisa dibuang.
 
**Kolom naik-turun** menunjukkan kestabilan. Kalau nilainya sebesar rata-ratanya, hasil itu tidak bisa dipercaya.
 
### Memeriksa Apakah Alatnya Benar
 
Bandingkan hasilnya dengan aturan asli yang kita tetapkan di awal. Tiga fitur asli (`lama_langganan_bulan`, `jumlah_komplain`, `skor_kepuasan`) seharusnya berada di atas, sementara `umur`, `gaji_juta`, `jumlah_login_bulanan`, `nomor_acak`, dan `koin_acak` semuanya mendekati nol.
 
Inilah keunggulan permutation importance dibanding angka bawaan: kolom acak dengan benar dinilai tidak penting.
 
### Menggambarnya
 
```python
kepentingan_urut = kepentingan.sort_values("rata_penurunan")
 
plt.figure(figsize=(8, 5))
plt.barh(kepentingan_urut["fitur"], kepentingan_urut["rata_penurunan"],
         xerr=kepentingan_urut["naik_turun"])
plt.axvline(0, color="black", lw=0.8)
plt.xlabel("Penurunan skor F1 saat fitur diacak")
plt.title("Permutation Importance")
plt.tight_layout()
plt.show()
```
 
### Pakai Data Uji atau Data Latih
 
Ini pertanyaan yang sering muncul, dan jawabannya bergantung tujuan.
 
**Pakai data uji** kalau Anda ingin tahu fitur mana yang berguna untuk **memprediksi data baru**. Ini yang paling sering dibutuhkan.
 
**Pakai data latih** kalau Anda ingin tahu fitur mana yang **dipakai model saat belajar**. Berguna untuk mendiagnosis overfitting: fitur yang penting di data latih tapi tidak penting di data uji adalah fitur yang dipakai untuk menghafal.
 
### Jebakan: Fitur yang Saling Berkorelasi
 
Ini keterbatasan penting yang harus diketahui.
 
Kalau dua kolom isinya nyaris sama, misalnya `tinggi_cm` dan `tinggi_inci`, maka saat satu dirusak, model masih bisa memakai yang lain. Akibatnya keduanya terlihat tidak penting, padahal informasinya sangat penting.
 
```python
# Membuktikan masalahnya
X_train_k = X_train.copy()
X_test_k = X_test.copy()
X_train_k["komplain_salinan"] = X_train["jumlah_komplain"]     # kolom kembar
X_test_k["komplain_salinan"] = X_test["jumlah_komplain"]
 
model_k = RandomForestClassifier(n_estimators=300, min_samples_leaf=5,
                                 random_state=RANDOM_STATE, n_jobs=-1)
model_k.fit(X_train_k, y_train)
 
hk = permutation_importance(model_k, X_test_k, y_test, n_repeats=10,
                            scoring="f1", random_state=RANDOM_STATE, n_jobs=-1)
print(pd.Series(hk.importances_mean, index=X_test_k.columns)
      .sort_values(ascending=False).round(4))
```
 
Perhatikan bahwa nilai kepentingan `jumlah_komplain` turun drastis setelah ada kembarannya, padahal fitur itu sama pentingnya seperti sebelumnya.
 
**Solusinya:** periksa korelasi antar kolom sebelum menafsirkan hasil, dan buang salah satu dari pasangan yang korelasinya di atas 0,95.
 
## Partial Dependence Plot
 
### Pertanyaan yang Dijawab
 
Permutation importance memberi tahu fitur mana yang penting. Tapi tidak memberi tahu **bagaimana** pengaruhnya.
 
Apakah makin tinggi skor kepuasan, makin kecil peluang berhenti? Apakah hubungannya lurus atau melengkung? Apakah ada titik ambang tertentu?
 
Partial dependence plot (PDP) menjawab pertanyaan-pertanyaan itu.
 
### Analogi
 
Bayangkan Anda ingin tahu efek suhu oven terhadap kematangan kue, tapi banyak faktor lain ikut berpengaruh: jenis adonan, ukuran loyang, ketinggian tempat.
 
PDP bekerja seperti ini: ambil seluruh resep yang ada, lalu paksa semuanya memakai suhu 150 derajat sambil membiarkan faktor lain apa adanya. Catat rata-rata kematangannya. Ulangi dengan suhu 160, 170, dan seterusnya.
 
Hasilnya adalah gambaran efek suhu saja, dengan faktor lain sudah dirata-ratakan.
 
### Cara Kerjanya
 
1. Pilih satu fitur, misalnya `skor_kepuasan`.
2. Ambil satu nilai, misalnya 3.
3. Ubah kolom `skor_kepuasan` menjadi 3 untuk **semua baris** di data, tanpa mengubah kolom lain.
4. Prediksi semua baris itu, lalu ambil rata-ratanya.
5. Ulangi untuk nilai 4, 5, sampai 10.
6. Gambar hasilnya sebagai kurva.
### Contoh Kode
 
```python
from sklearn.inspection import PartialDependenceDisplay
 
fitur_penting = ["skor_kepuasan", "jumlah_komplain", "lama_langganan_bulan"]
 
fig, ax = plt.subplots(1, 3, figsize=(15, 4))
PartialDependenceDisplay.from_estimator(
    model, X_test, fitur_penting,
    ax=ax, kind="average",
)
fig.suptitle("Partial Dependence Plot")
plt.tight_layout()
plt.show()
```
 
### Membaca Bentuk Kurvanya
 
**Menurun.** Makin tinggi nilai fitur, makin kecil peluang kelas positif. Untuk `skor_kepuasan`, kurva menurun berarti makin puas pelanggan, makin kecil peluang berhenti. Ini masuk akal.
 
**Menaik.** Kebalikannya. Untuk `jumlah_komplain`, kurva menaik berarti makin banyak komplain, makin besar peluang berhenti.
 
**Mendatar.** Fitur tidak berpengaruh pada rentang itu.
 
**Berbentuk tangga.** Ada titik ambang. Misalnya peluang berhenti melompat drastis setelah komplain melebihi 3 kali. Ini informasi yang sangat berguna untuk kebijakan bisnis.
 
**Berbentuk U atau lengkung.** Hubungannya tidak monoton. Misalnya risiko tinggi di pelanggan sangat baru dan sangat lama, tapi rendah di tengah.
 
### Memeriksa Fitur yang Tidak Penting
 
```python
fig, ax = plt.subplots(1, 2, figsize=(11, 4))
PartialDependenceDisplay.from_estimator(model, X_test, ["umur", "gaji_juta"], ax=ax)
plt.suptitle("Fitur yang seharusnya tidak berpengaruh")
plt.tight_layout()
plt.show()
```
 
Kurvanya seharusnya nyaris datar. Kalau ada sedikit naik-turun, itu cuma gangguan acak, bukan pola sebenarnya. Perhatikan juga skala sumbu tegaknya: kalau rentangnya sangat sempit, artinya efeknya memang kecil.
 
### ICE Plot: Melihat Tiap Baris Secara Terpisah
 
PDP menampilkan rata-rata. Masalahnya, rata-rata bisa menyembunyikan kenyataan.
 
Bayangkan sebuah fitur yang menaikkan risiko untuk separuh pelanggan dan menurunkan risiko untuk separuh lainnya. Rata-ratanya akan datar, seolah fitur itu tidak berpengaruh sama sekali.
 
ICE plot menggambar satu garis untuk tiap baris data, sehingga keragamannya terlihat.
 
```python
fig, ax = plt.subplots(figsize=(7, 5))
PartialDependenceDisplay.from_estimator(
    model, X_test.sample(200, random_state=RANDOM_STATE),
    ["jumlah_komplain"],
    kind="both",              # gambar garis tiap baris DAN rata-ratanya
    ax=ax,
)
plt.title("ICE Plot: tiap garis tipis adalah satu pelanggan")
plt.tight_layout()
plt.show()
```
 
Kalau semua garis tipis bergerak searah, PDP bisa dipercaya. Kalau garis-garisnya saling menyilang ke arah berbeda, artinya ada interaksi dengan fitur lain, dan rata-ratanya menyesatkan.
 
### PDP Dua Fitur: Melihat Interaksi
 
```python
fig, ax = plt.subplots(figsize=(6, 5))
PartialDependenceDisplay.from_estimator(
    model, X_test,
    [("jumlah_komplain", "skor_kepuasan")],     # pasangan, bukan satuan
    ax=ax,
)
plt.tight_layout()
plt.show()
```
 
Grafik ini berbentuk peta warna. Kalau polanya berupa garis-garis sejajar, kedua fitur bekerja mandiri. Kalau polanya miring atau melengkung, ada interaksi: efek satu fitur bergantung pada nilai fitur lainnya.
 
### Jebakan PDP
 
**Kombinasi yang mustahil.** PDP memaksa semua baris memakai nilai tertentu, termasuk kombinasi yang tidak pernah ada di dunia nyata. Misalnya memaksa semua orang berumur 20 tahun sambil mempertahankan lama langganan 55 bulan. Model tidak pernah melihat kombinasi itu, sehingga prediksinya di wilayah tersebut tidak bisa dipercaya.
 
**Fitur berkorelasi.** Masalahnya sama seperti permutation importance. Kalau dua fitur bergerak bersama di dunia nyata, memaksa salah satunya berubah sendirian menghasilkan skenario yang tidak realistis.
 
**Bukan hubungan sebab-akibat.** Kurva menurun bukan berarti menaikkan nilai fitur akan menurunkan risiko di dunia nyata.
 
## SHAP
 
### Apa yang Membuatnya Istimewa
 
Dua alat sebelumnya menjelaskan model secara keseluruhan. SHAP bisa menjelaskan **satu prediksi tertentu**.
 
Ini yang dibutuhkan saat harus menjawab: "kenapa pelanggan nomor 1234 diprediksi akan berhenti?"
 
### Analogi Pembagian Bonus Tim
 
Bayangkan sebuah tim berisi tiga orang menyelesaikan proyek dan mendapat bonus 30 juta. Bagaimana membagi bonus itu secara adil sesuai kontribusi masing-masing?
 
Cara yang adil: hitung berapa hasil proyek kalau dikerjakan tanpa orang A, tanpa orang B, tanpa keduanya, dan seterusnya untuk semua kemungkinan kombinasi. Dari situ bisa dihitung kontribusi rata-rata tiap orang.
 
SHAP melakukan hal yang sama untuk fitur. Ia menghitung berapa kontribusi tiap fitur terhadap selisih antara prediksi baris ini dan prediksi rata-rata.
 
Metode ini berasal dari teori permainan dan punya sifat matematis yang bagus: jumlah semua kontribusi selalu persis sama dengan selisih prediksinya. Tidak ada yang hilang atau berlebih.
 
### Memasang SHAP
 
```bash
pip install shap
```
 
### Menghitung Nilai SHAP
 
```python
import shap
 
# Untuk model berbasis pohon, pakai TreeExplainer karena jauh lebih cepat
penjelas = shap.TreeExplainer(model)
 
# Ambil sebagian data saja agar cepat
X_contoh = X_test.sample(300, random_state=RANDOM_STATE)
nilai_shap = penjelas(X_contoh)
 
# Untuk klasifikasi biner, ambil penjelasan untuk kelas positif
nilai_shap_positif = nilai_shap[:, :, 1]
 
print("Bentuk nilai SHAP:", nilai_shap_positif.values.shape)
print("Nilai dasar (prediksi rata-rata):", round(nilai_shap_positif.base_values[0], 4))
```
 
### Memahami Arti Angkanya
 
Tiap baris data punya satu nilai SHAP untuk tiap fitur.
 
**Nilai positif** berarti fitur itu mendorong prediksi ke arah kelas positif.
 
**Nilai negatif** berarti mendorong ke arah kelas negatif.
 
**Besar kecilnya** menunjukkan kekuatan dorongan.
 
Yang penting, ada persamaan yang selalu berlaku:
 
```
prediksi baris ini = nilai dasar + jumlah semua nilai SHAP baris itu
```
 
Nilai dasar adalah prediksi rata-rata untuk seluruh data. Jadi nilai SHAP menjelaskan kenapa baris ini berbeda dari rata-rata.
 
### Penjelasan Lokal: Waterfall Plot
 
Ini yang dipakai untuk menjawab pertanyaan tentang satu pelanggan.
 
```python
baris = 0
shap.plots.waterfall(nilai_shap_positif[baris], max_display=10)
```
 
#### Cara Membacanya
 
Grafik dimulai dari nilai dasar di bagian bawah, yaitu prediksi rata-rata.
 
Tiap batang menunjukkan satu fitur mendorong prediksi naik (merah, ke arah berhenti) atau turun (biru, ke arah bertahan).
 
Bagian atas adalah prediksi akhir untuk baris tersebut.
 
Contoh kalimat yang bisa Anda susun dari grafik ini:
 
*"Pelanggan ini diprediksi berhenti dengan peluang 0,78, jauh di atas rata-rata 0,32. Faktor terbesar adalah jumlah komplain sebanyak 5 kali yang menaikkan risiko sebesar 0,25, disusul skor kepuasan 2 yang menaikkan 0,18. Lama berlangganan 40 bulan sedikit menurunkan risiko sebesar 0,05."*
 
Kalimat seperti itulah yang dibutuhkan di dunia kerja.
 
### Penjelasan Global: Beeswarm Plot
 
```python
shap.plots.beeswarm(nilai_shap_positif, max_display=10)
```
 
#### Cara Membacanya
 
Ini grafik yang padat informasi, jadi perlu dijelaskan pelan-pelan.
 
**Sumbu tegak** adalah daftar fitur, diurutkan dari yang paling berpengaruh di atas.
 
**Sumbu mendatar** adalah nilai SHAP. Ke kanan berarti mendorong ke kelas positif, ke kiri berarti mendorong ke kelas negatif.
 
**Tiap titik** adalah satu baris data.
 
**Warna titik** menunjukkan nilai fitur itu. Merah berarti nilainya tinggi, biru berarti rendah.
 
Kombinasi posisi dan warna inilah yang informatif. Kalau pada baris `jumlah_komplain` titik-titik merah berkumpul di kanan dan titik biru di kiri, artinya: nilai komplain tinggi mendorong prediksi ke arah berhenti, komplain rendah mendorong ke arah bertahan.
 
Kalau warnanya tercampur tanpa pola, artinya hubungannya tidak sederhana atau fitur itu tidak berpengaruh.
 
### Ringkasan Kepentingan Fitur
 
```python
shap.plots.bar(nilai_shap_positif, max_display=10)
```
 
Ini menampilkan rata-rata besaran nilai SHAP tiap fitur, tanpa memandang arahnya. Hasilnya mirip permutation importance, dan bisa dipakai untuk saling memeriksa. Kalau kedua alat memberi urutan yang sangat berbeda, ada yang perlu diselidiki.
 
### Melihat Bentuk Hubungan
 
```python
shap.plots.scatter(nilai_shap_positif[:, "jumlah_komplain"],
                   color=nilai_shap_positif)
```
 
Grafik ini mirip PDP tapi menampilkan tiap baris sebagai titik. Warnanya otomatis dipilih berdasarkan fitur yang paling berinteraksi, sehingga interaksi jadi terlihat.
 
### Kalau Model Anda Dibungkus Pipeline
 
SHAP butuh nama kolom setelah transformasi. Cara paling sederhana untuk pemula adalah menerapkan transformasi lebih dulu, lalu jelaskan model intinya.
 
```python
# Transformasikan data, lalu jelaskan model bagian dalamnya
X_train_siap = pipeline.named_steps["persiapan"].transform(X_train)
nama_kolom = pipeline.named_steps["persiapan"].get_feature_names_out()
X_train_siap = pd.DataFrame(X_train_siap, columns=nama_kolom)
 
penjelas = shap.TreeExplainer(pipeline.named_steps["model"])
```
 
### Memilih Explainer yang Tepat
 
**`TreeExplainer`** untuk Random Forest, Gradient Boosting, XGBoost, dan LightGBM. Cepat dan hasilnya eksak.
 
**`LinearExplainer`** untuk model linear. Sangat cepat.
 
**`KernelExplainer`** untuk model apa pun. Sangat lambat, jadi hanya pakai kalau tidak ada pilihan lain, dan batasi jumlah baris yang dijelaskan.
 
### Keterbatasan SHAP
 
**Lambat pada data besar.** Untuk model non-pohon, menjelaskan ribuan baris bisa memakan waktu berjam-jam. Ambil sampel secukupnya.
 
**Masalah korelasi yang sama.** Sama seperti dua alat sebelumnya, fitur yang saling berkorelasi membuat pembagian kontribusi jadi ambigu.
 
**Tetap bukan hubungan sebab-akibat.** Ini perlu diulang karena sering disalahpahami, apalagi karena tampilan SHAP terlihat sangat meyakinkan.
 
## Membandingkan Ketiga Alat
 
| Aspek | Permutation Importance | Partial Dependence Plot | SHAP |
|---|---|---|---|
| Menjawab | Fitur mana yang penting | Bagaimana bentuk pengaruhnya | Keduanya, plus per baris |
| Cakupan | Global | Global | Global dan lokal |
| Kecepatan | Sedang | Cepat | Lambat sampai sedang |
| Kemudahan dipahami | Mudah | Mudah | Perlu latihan membaca |
| Untuk menjelaskan ke atasan | Bagus | Bagus | Bagus |
| Untuk menjelaskan ke pelanggan | Tidak bisa | Tidak bisa | Bisa |
| Terganggu fitur berkorelasi | Ya | Ya | Ya |
 
### Urutan Pemakaian yang Disarankan
 
**Langkah 1.** Jalankan permutation importance untuk tahu fitur mana yang berpengaruh dan mana yang bisa dibuang.
 
**Langkah 2.** Buat PDP untuk tiga sampai lima fitur teratas, untuk memahami bentuk hubungannya.
 
**Langkah 3.** Pakai SHAP kalau butuh penjelasan per baris, atau kalau ingin melihat interaksi antar fitur.
 
Tiga langkah ini biasanya sudah menjawab semua pertanyaan yang muncul dalam presentasi.
 
## Menjawab Pertanyaan Nyata di Dunia Kerja
 
### "Fitur mana yang paling penting?"
 
Pakai permutation importance, dan tampilkan grafik batangnya. Sebutkan juga fitur mana yang ternyata tidak berpengaruh, karena informasi itu sering sama berharganya. Kalau data yang mahal dikumpulkan ternyata tidak dipakai model, pengumpulannya bisa dihentikan.
 
### "Kenapa pelanggan ini diprediksi berhenti?"
 
Pakai SHAP waterfall plot untuk baris tersebut, lalu terjemahkan jadi kalimat. Sebutkan tiga faktor terbesar beserta arah dan besarannya.
 
### "Kalau kami menaikkan skor kepuasan, berapa pelanggan yang bisa diselamatkan?"
 
**Hati-hati dengan pertanyaan ini.** Ini pertanyaan sebab-akibat, dan model prediktif tidak bisa menjawabnya.
 
Model hanya menemukan bahwa skor kepuasan rendah **berhubungan** dengan berhenti berlangganan. Bisa jadi keduanya sama-sama disebabkan faktor ketiga, misalnya kualitas layanan yang menurun.
 
Cara menjawab yang jujur: *"Model menunjukkan skor kepuasan adalah penanda kuat untuk risiko berhenti, sehingga berguna untuk menentukan siapa yang perlu dihubungi lebih dulu. Tapi untuk mengetahui apakah menaikkan kepuasan benar-benar menurunkan angka berhenti, dibutuhkan uji coba terkontrol, misalnya A/B testing."*
 
Jawaban seperti ini menunjukkan Anda paham batas alatnya, dan itu justru meningkatkan kepercayaan.
 
### "Apakah modelnya adil dan tidak diskriminatif?"
 
Periksa apakah fitur sensitif seperti jenis kelamin, usia, atau lokasi punya pengaruh besar. Perhatikan juga fitur yang menjadi penggantinya secara tidak langsung: kode pos sering menjadi pengganti tidak langsung untuk kelompok etnis atau kelas ekonomi.
 
Ini bukan sekadar soal etika. Di banyak yurisdiksi, ini masalah kepatuhan hukum.
 
### "Bisakah kami percaya model ini?"
 
Tunjukkan bahwa fitur-fitur teratas masuk akal secara domain. Kalau ada fitur aneh yang mendominasi, selidiki. Sering kali itu tanda kebocoran data, dan menemukannya sebelum model dipakai jauh lebih baik daripada sesudahnya.
 
## Kesalahan Pemula yang Sering Terjadi
 
### Memakai feature_importances_ Bawaan untuk Keputusan Penting
 
Angka itu bias terhadap fitur dengan banyak nilai unik dan dihitung dari data latih. Pakai permutation importance untuk keputusan yang berkonsekuensi.
 
### Menyimpulkan Sebab-Akibat dari Interpretasi Model
 
Ini kesalahan yang paling mahal akibatnya. Semua alat di artikel ini menjelaskan apa yang dipakai model, bukan apa yang menyebabkan sesuatu terjadi di dunia nyata.
 
### Menafsirkan Model yang Belum Terbukti Bagus
 
Kalau skor model masih buruk, penjelasannya juga tidak berarti. Anda hanya sedang menjelaskan kekeliruan dengan rapi. Pastikan modelnya layak dulu.
 
### Mengabaikan Fitur yang Saling Berkorelasi
 
Fitur kembar membuat kepentingan keduanya terlihat kecil. Periksa matriks korelasi sebelum menafsirkan hasil.
 
### Menafsirkan Permutation Importance dari Data Latih Saja
 
Angka dari data latih memberi tahu apa yang dipakai model saat belajar, bukan apa yang berguna untuk data baru. Untuk sebagian besar keperluan, pakai data uji.
 
### Memakai Metrik yang Salah pada Permutation Importance
 
Kalau data Anda timpang dan Anda memakai `scoring="accuracy"`, hasilnya bisa menunjukkan semua fitur tidak penting, karena mengacak fitur apa pun tidak mengubah akurasi yang sudah tinggi karena kelas mayoritas. Pakai metrik yang sesuai, misalnya `f1` atau `average_precision`.
 
### Menampilkan Semua Fitur Sekaligus
 
Grafik dengan 80 fitur tidak bisa dibaca siapa pun. Tampilkan 10 sampai 15 teratas saja.
 
### Tidak Memeriksa Apakah Hasilnya Masuk Akal
 
Kalau menurut model, jumlah huruf dalam nama pelanggan adalah fitur paling penting, jangan langsung menerimanya sebagai temuan menarik. Selidiki dulu, karena itu hampir pasti tanda ada yang salah.
 
## Penutup
 
Model yang tidak bisa dijelaskan sering kali tidak akan dipakai, sebagus apa pun skornya. Kemampuan menjelaskan bukan pelengkap, melainkan bagian dari pekerjaan.
 
Tiga hal untuk diingat:
 
**Pertama**, mulai dari permutation importance untuk tahu fitur mana yang berpengaruh, lanjut ke PDP untuk memahami bentuk pengaruhnya, dan pakai SHAP kalau butuh menjelaskan satu prediksi tertentu.
 
**Kedua**, jangan pernah menyimpulkan sebab-akibat dari interpretasi model. Untuk pertanyaan sebab-akibat, jawabannya adalah uji coba terkontrol, bukan analisis model prediktif.
 
**Ketiga**, interpretasi sering menemukan kesalahan, bukan cuma menjelaskan keberhasilan. Fitur aneh yang mendominasi keputusan model biasanya adalah tanda kebocoran data, dan menemukannya lebih awal menyelamatkan banyak hal.
 