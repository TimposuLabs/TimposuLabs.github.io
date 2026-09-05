---
slug: bias-variance-trade-off
title: "Bias-Variance Tradeoff: Panduan Machine Learning untuk Pemula #6"
authors: topekox
tags: [manchine learning, data mining, ai, data science, python]
---

Dari semua konsep teori dalam machine learning, ini yang paling langsung terpakai sehari-hari.
 
Alasannya sederhana. Setiap kali model Anda tidak sesuai harapan, ada dua kemungkinan penyebab yang menuntut tindakan **berlawanan**. Salah mendiagnosis berarti Anda akan memperbaiki dengan cara yang justru memperburuk keadaan.
 
Artikel ini menjelaskan dua sumber kesalahan itu, cara mengenalinya dari angka yang Anda lihat sehari-hari, dan tindakan apa yang tepat untuk masing-masing.

<!-- truncate -->

## Daftar Isi

1. Kenapa Konsep Ini Paling Praktis
2. Dua Sumber Kesalahan Model
3. Kesalahan Model Terdiri dari Tiga Bagian
4. Melihat Bias dan Variance dengan Mata Sendiri
5. Mengukur Variance Secara Langsung
6. Hubungannya dengan Underfitting dan Overfitting
7. Cara Mendiagnosis dari Angka
8. Kenapa Disebut Tradeoff
9. Cara Menurunkan Bias
10. Cara Menurunkan Variance
11. Cara Mendapat Keduanya Sekaligus
12. Tabel Gejala dan Tindakan
13. Kesalahan Pemula yang Sering Terjadi
## Kenapa Konsep Ini Paling Praktis
 
### Masalah Sehari-hari yang Diselesaikan
 
Bayangkan skor model Anda 0,72 dan Anda ingin menaikkannya. Ada banyak hal yang bisa dicoba:
 
- Menambah data
- Menambah fitur baru
- Membuat model lebih rumit
- Membuat model lebih sederhana
- Memperkuat regularisasi
- Melemahkan regularisasi
Perhatikan bahwa beberapa di antaranya saling bertentangan. Membuat model lebih rumit dan lebih sederhana tidak mungkin sama-sama benar.
 
Bias-variance tradeoff memberi Anda cara memilih. Setelah memahaminya, Anda tidak lagi menebak-nebak, tapi mendiagnosis dulu lalu memilih tindakan yang sesuai.
 
### Analogi Dokter
 
Seorang dokter tidak langsung memberi obat begitu pasien mengeluh sakit kepala. Ia bertanya dulu, memeriksa, dan mencari penyebabnya. Sakit kepala karena kurang tidur dan sakit kepala karena tekanan darah tinggi butuh penanganan yang sangat berbeda.
 
Bias dan variance adalah dua "penyakit" utama model. Gejalanya bisa mirip, yaitu skor rendah, tapi obatnya berkebalikan.
 
## Dua Sumber Kesalahan Model
 
### Analogi Papan Dart
 
Ini analogi paling terkenal dan paling membantu. Bayangkan Anda melempar dart, dan targetnya adalah titik tengah papan.
 
**Bias** adalah seberapa jauh rata-rata lemparan Anda dari titik tengah. Kalau semua lemparan Anda menumpuk di pojok kiri atas, bias Anda tinggi, meskipun lemparannya konsisten.
 
**Variance** adalah seberapa tersebar lemparan Anda satu sama lain. Kalau lemparan Anda tersebar ke mana-mana, variance Anda tinggi, meskipun rata-ratanya kebetulan pas di tengah.
 
### Empat Kemungkinan Kombinasi
 
| Kondisi | Gambarannya | Artinya untuk model |
|---|---|---|
| Bias rendah, variance rendah | Semua dart menumpuk di tengah | Model ideal, inilah yang dituju |
| Bias tinggi, variance rendah | Dart menumpuk rapat tapi di pojok | Model konsisten tapi konsisten salah |
| Bias rendah, variance tinggi | Dart tersebar mengelilingi tengah | Model kadang tepat kadang meleset jauh |
| Bias tinggi, variance tinggi | Dart tersebar dan jauh dari tengah | Model paling buruk |
 
### Bias dalam Bahasa Model
 
**Bias tinggi** artinya model punya asumsi yang terlalu kaku tentang bentuk data.
 
Contohnya, Anda memakai regresi linear untuk data yang hubungannya melengkung. Sekeras apa pun model itu berusaha, ia hanya bisa membuat garis lurus. Bahkan dengan jutaan baris data, garisnya tetap tidak akan pas.
 
Kesalahan ini tidak akan hilang dengan menambah data. Modelnya memang tidak mampu, titik.
 
### Variance dalam Bahasa Model
 
**Variance tinggi** artinya model terlalu peka terhadap data latih tertentu.
 
Contohnya, pohon keputusan tanpa batas kedalaman. Ubah sedikit saja data latihnya, misalnya buang 10 baris, dan bentuk pohonnya bisa berubah total. Prediksinya untuk data baru pun ikut berubah.
 
Model seperti ini menangkap bukan cuma polanya, tapi juga gangguan acak yang kebetulan ada di data latih itu.
 
### Cara Cepat Membedakannya
 
**Bias** adalah kesalahan karena model **terlalu sederhana** untuk masalahnya.
 
**Variance** adalah kesalahan karena model **terlalu peka** terhadap data latihnya.
 
## Kesalahan Model Terdiri dari Tiga Bagian
 
### Rumusnya, Disederhanakan
 
Secara teori, total kesalahan model bisa dipecah menjadi tiga bagian:
 
```
Total kesalahan = Bias² + Variance + Noise
```
 
Anda tidak perlu menghitung ini di praktik. Yang penting adalah memahami bahwa ketiganya berbeda dan hanya dua yang bisa Anda kendalikan.
 
### Bagian Ketiga: Noise
 
**Noise** adalah kesalahan yang tidak bisa dihilangkan sama sekali, sesering apa pun Anda memperbaiki model.
 
Penyebabnya bisa bermacam-macam:
 
- Ada faktor penting yang tidak terekam dalam data
- Ada keacakan asli dalam fenomena yang diprediksi
- Ada kesalahan pengukuran pada data itu sendiri
Contohnya, memprediksi apakah pelanggan akan berhenti berlangganan. Kalau seorang pelanggan berhenti karena pindah ke luar negeri, dan data Anda tidak punya kolom apa pun yang mencerminkan rencana pindah itu, tidak ada model di dunia yang bisa memprediksinya.
 
### Kenapa Ini Penting Dipahami
 
Ada batas atas yang tidak bisa Anda lewati. Kalau akurasi maksimum yang mungkin dicapai adalah 88 persen karena sisanya murni keacakan, maka mengejar 95 persen hanya akan membuang waktu.
 
Cara kasar memperkirakan batas ini: tanyakan pada ahli di bidang tersebut. Kalau dokter berpengalaman pun hanya benar 85 persen dari waktu dengan informasi yang sama, jangan berharap model Anda mencapai 99 persen.
 
Kalau model Anda melampaui batas yang masuk akal, curigai ada kebocoran data, bukan rayakan sebagai keberhasilan.
 
## Melihat Bias dan Variance dengan Mata Sendiri
 
Cara terbaik memahami konsep ini adalah melihatnya langsung. Kita akan membuat data yang polanya kita ketahui persis, lalu mencocokkan tiga model dengan tingkat kerumitan berbeda.
 
### Menyiapkan Data Contoh
 
```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
 
RANDOM_STATE = 42
rng = np.random.RandomState(RANDOM_STATE)
 
def pola_sebenarnya(x):
    """Pola asli yang ingin ditemukan model. Di dunia nyata ini tidak diketahui."""
    return np.sin(1.5 * np.pi * x)
 
def buat_data(n=30, noise=0.25, seed=None):
    r = np.random.RandomState(seed)
    x = np.sort(r.rand(n))
    y = pola_sebenarnya(x) + r.randn(n) * noise      # pola + gangguan acak
    return x.reshape(-1, 1), y
 
X_latih, y_latih = buat_data(n=30, seed=RANDOM_STATE)
X_grid = np.linspace(0, 1, 300).reshape(-1, 1)
```
 
Data ini punya pola berbentuk gelombang, ditambah gangguan acak. Pekerjaan model adalah menemukan gelombangnya, bukan menghafal gangguannya.
 
### Mencocokkan Tiga Model dengan Kerumitan Berbeda
 
```python
plt.figure(figsize=(14, 4))
 
for i, derajat in enumerate([1, 4, 20], start=1):
    model = make_pipeline(PolynomialFeatures(derajat), LinearRegression())
    model.fit(X_latih, y_latih)
 
    plt.subplot(1, 3, i)
    plt.scatter(X_latih, y_latih, s=25, alpha=0.7, label="Data latih")
    plt.plot(X_grid, pola_sebenarnya(X_grid), "g--", lw=2, label="Pola sebenarnya")
    plt.plot(X_grid, model.predict(X_grid), "r-", lw=2, label="Tebakan model")
    plt.ylim(-2, 2)
    plt.title(f"Derajat {derajat}")
    plt.legend(fontsize=8)
 
plt.tight_layout()
plt.show()
```
 
### Membaca Ketiga Gambar
 
**Derajat 1 (garis lurus).** Garis merah tidak mengikuti bentuk gelombang sama sekali. Ini **bias tinggi**. Model terlalu sederhana untuk masalah ini. Perhatikan bahwa garisnya juga jauh dari titik-titik data latih, artinya bahkan di data latih pun modelnya buruk.
 
**Derajat 4.** Garis merah mengikuti bentuk gelombang dengan cukup baik, tanpa terlalu memaksakan diri melewati setiap titik. Ini keseimbangan yang bagus.
 
**Derajat 20.** Garis merah berkelok-kelok liar, memaksa diri melewati hampir setiap titik data latih, termasuk titik-titik yang posisinya cuma karena gangguan acak. Ini **variance tinggi**. Modelnya menghafal, bukan belajar.
 
### Melihat Angkanya
 
```python
X_uji, y_uji = buat_data(n=200, seed=999)     # data baru yang belum pernah dilihat
 
print(f"{'Derajat':>8} {'Error latih':>13} {'Error uji':>11} {'Diagnosis'}")
for derajat in [1, 2, 4, 8, 15, 20]:
    model = make_pipeline(PolynomialFeatures(derajat), LinearRegression())
    model.fit(X_latih, y_latih)
 
    err_latih = mean_squared_error(y_latih, model.predict(X_latih))
    err_uji = mean_squared_error(y_uji, model.predict(X_uji))
 
    if err_latih > 0.15:
        diagnosis = "bias tinggi"
    elif err_uji > err_latih * 3:
        diagnosis = "variance tinggi"
    else:
        diagnosis = "seimbang"
 
    print(f"{derajat:>8} {err_latih:>13.4f} {err_uji:>11.4f}  {diagnosis}")
```
 
Perhatikan polanya. Error di data latih **terus turun** seiring derajat naik, karena model makin mampu menghafal. Tapi error di data uji turun dulu, lalu naik lagi.
 
Titik terendah pada error data uji adalah keseimbangan terbaik.
 
## Mengukur Variance Secara Langsung
 
### Idenya
 
Variance adalah seberapa besar prediksi model berubah kalau data latihnya sedikit berbeda. Kita bisa mengukurnya langsung: latih model yang sama pada beberapa sampel data yang berbeda, lalu lihat seberapa jauh prediksinya berbeda-beda.
 
### Contoh Kode
 
```python
def ukur_variance(derajat, n_percobaan=30):
    semua_prediksi = []
 
    for percobaan in range(n_percobaan):
        Xp, yp = buat_data(n=30, seed=percobaan)     # data berbeda tiap percobaan
        model = make_pipeline(PolynomialFeatures(derajat), LinearRegression())
        model.fit(Xp, yp)
        semua_prediksi.append(model.predict(X_grid))
 
    semua_prediksi = np.array(semua_prediksi)
 
    rata_prediksi = semua_prediksi.mean(axis=0)
    variance = semua_prediksi.var(axis=0).mean()                    # sebaran antar model
    bias_kuadrat = ((rata_prediksi - pola_sebenarnya(X_grid).ravel()) ** 2).mean()
 
    return semua_prediksi, bias_kuadrat, variance
 
plt.figure(figsize=(14, 4))
 
for i, derajat in enumerate([1, 4, 20], start=1):
    prediksi, bias2, var = ukur_variance(derajat)
 
    plt.subplot(1, 3, i)
    for baris in prediksi:
        plt.plot(X_grid, baris, "r-", alpha=0.15)          # tiap garis = satu model
    plt.plot(X_grid, pola_sebenarnya(X_grid), "g--", lw=2, label="Pola sebenarnya")
    plt.plot(X_grid, prediksi.mean(axis=0), "b-", lw=2, label="Rata-rata model")
    plt.ylim(-2, 2)
    plt.title(f"Derajat {derajat}\nBias² = {bias2:.4f}  Variance = {var:.4f}")
    plt.legend(fontsize=8)
 
plt.tight_layout()
plt.show()
```
 
### Membaca Hasilnya
 
**Derajat 1.** Semua garis merah hampir bertumpuk rapi, artinya variance sangat rendah. Tapi kumpulan garis itu jauh dari garis hijau, artinya bias tinggi. Ini seperti dart yang menumpuk rapat di pojok papan.
 
**Derajat 20.** Garis-garis merah tersebar liar ke mana-mana, artinya variance sangat tinggi. Tapi rata-ratanya (garis biru) sebenarnya cukup dekat dengan garis hijau, artinya bias rendah. Ini seperti dart yang tersebar mengelilingi titik tengah.
 
**Derajat 4.** Garis-garis cukup rapat dan sekaligus dekat dengan pola sebenarnya. Bias dan variance sama-sama terkendali.
 
Perhatikan angka Bias² dan Variance yang tercetak di judul tiap gambar. Saat derajat naik, bias turun tapi variance naik. Itulah tradeoff-nya, terlihat sebagai angka.
 
## Hubungannya dengan Underfitting dan Overfitting
 
### Istilah yang Sebenarnya Sama
 
Anda mungkin sudah mendengar istilah underfitting dan overfitting. Keduanya adalah nama lain untuk kondisi yang sama.
 
| Istilah gejala | Istilah penyebab | Kondisi model |
|---|---|---|
| Underfitting | Bias tinggi | Model terlalu sederhana |
| Overfitting | Variance tinggi | Model terlalu rumit atau terlalu peka |
| Pas | Bias dan variance seimbang | Kerumitan sesuai dengan data |
 
### Kenapa Istilah Bias-Variance Lebih Berguna
 
Underfitting dan overfitting menggambarkan **gejalanya**. Bias dan variance menjelaskan **penyebabnya**.
 
Menggunakan kerangka bias-variance membuat pilihan tindakan jadi lebih jelas, karena Anda tahu apa yang sedang diperbaiki, bukan sekadar mencoba-coba.
 
## Cara Mendiagnosis dari Angka
 
Sekarang bagian yang paling praktis. Anda tidak perlu menggambar apa pun untuk mendiagnosis. Cukup tiga angka.
 
### Tiga Angka yang Dibutuhkan
 
**Skor di data latih.** Seberapa baik model pada data yang dipelajarinya.
 
**Skor di data validasi.** Seberapa baik model pada data yang belum pernah dilihat.
 
**Skor yang wajar diharapkan.** Perkiraan batas atas yang masuk akal untuk masalah ini, bisa dari performa manusia ahli atau dari model terbaik yang pernah dilaporkan orang lain untuk masalah serupa.
 
### Aturan Membacanya
 
**Kalau skor latih jauh dari skor yang diharapkan**, berarti masalahnya **bias tinggi**. Model bahkan gagal pada data yang sudah dipelajarinya.
 
**Kalau skor latih bagus tapi skor validasi jauh lebih rendah**, berarti masalahnya **variance tinggi**. Model bisa di data yang dihafal, tidak bisa di data baru.
 
**Kalau keduanya buruk dan jaraknya juga lebar**, berarti kedua masalah ada sekaligus. Perbaiki bias dulu, karena itu masalah yang lebih mendasar.
 
### Contoh Angka Nyata
 
Anggap target yang wajar adalah 0,90.
 
| Skor latih | Skor validasi | Jarak | Diagnosis |
|---|---|---|---|
| 0,68 | 0,66 | 0,02 | Bias tinggi. Model terlalu sederhana |
| 0,99 | 0,74 | 0,25 | Variance tinggi. Model menghafal |
| 0,65 | 0,42 | 0,23 | Keduanya bermasalah |
| 0,91 | 0,89 | 0,02 | Sudah bagus |
 
### Kode Diagnosis Otomatis
 
```python
from sklearn.model_selection import cross_validate, StratifiedKFold
from sklearn.datasets import load_breast_cancer
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
 
data = load_breast_cancer()
Xc, yc = data.data, data.target
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)
 
def diagnosis(model, X, y, target_wajar=0.95, nama=""):
    hasil = cross_validate(model, X, y, cv=cv, scoring="f1",
                           return_train_score=True, n_jobs=-1)
    latih = hasil["train_score"].mean()
    validasi = hasil["test_score"].mean()
    jarak = latih - validasi
 
    print(f"\n{nama}")
    print(f"  Skor latih    : {latih:.4f}")
    print(f"  Skor validasi : {validasi:.4f}")
    print(f"  Jarak         : {jarak:.4f}")
 
    if latih < target_wajar - 0.05:
        if jarak > 0.05:
            print("  -> Diagnosis: BIAS dan VARIANCE sama-sama tinggi")
            print("     Tindakan: perbaiki bias dulu (model lebih kuat, fitur lebih baik)")
        else:
            print("  -> Diagnosis: BIAS TINGGI (underfitting)")
            print("     Tindakan: model lebih rumit, tambah fitur, kurangi regularisasi")
    elif jarak > 0.05:
        print("  -> Diagnosis: VARIANCE TINGGI (overfitting)")
        print("     Tindakan: sederhanakan model, tambah data, perkuat regularisasi")
    else:
        print("  -> Diagnosis: SEIMBANG")
 
diagnosis(Pipeline([("s", StandardScaler()),
                    ("m", DecisionTreeClassifier(max_depth=1, random_state=RANDOM_STATE))]),
          Xc, yc, nama="Pohon dangkal (max_depth=1)")
 
diagnosis(Pipeline([("s", StandardScaler()),
                    ("m", DecisionTreeClassifier(max_depth=None, random_state=RANDOM_STATE))]),
          Xc, yc, nama="Pohon tanpa batas")
```
 
Perhatikan `return_train_score=True`. Tanpa itu, `cross_validate` hanya mengembalikan skor validasi, dan Anda tidak bisa menghitung jaraknya.
 
### Berapa Jarak yang Dianggap Bermasalah
 
Tidak ada angka pasti, tapi sebagai patokan kasar:
 
- Jarak di bawah 0,03 biasanya wajar
- Jarak 0,03 sampai 0,10 perlu diperhatikan
- Jarak di atas 0,10 hampir pasti overfitting
Bandingkan juga jarak itu dengan naik-turun (standar deviasi) skor validasi silang. Kalau jaraknya 0,04 sementara naik-turunnya 0,05, jarak itu mungkin cuma keacakan.
 
## Kenapa Disebut Tradeoff
 
### Kurva Berbentuk U
 
Kata "tradeoff" artinya pertukaran. Menurunkan salah satu biasanya menaikkan yang lain.
 
Saat model dibuat makin rumit:
 
- **Bias turun**, karena model makin mampu menangkap pola rumit
- **Variance naik**, karena model makin peka terhadap data latih tertentu
Total kesalahan adalah jumlah keduanya, sehingga bentuknya seperti huruf U: turun dulu, mencapai titik terendah, lalu naik lagi.
 
### Menggambar Kurvanya
 
```python
derajat_dicoba = range(1, 16)
bias_list, var_list, total_list = [], [], []
 
for d in derajat_dicoba:
    prediksi, bias2, var = ukur_variance(d, n_percobaan=30)
    bias_list.append(bias2)
    var_list.append(var)
    total_list.append(bias2 + var)
 
plt.figure(figsize=(8, 5))
plt.plot(derajat_dicoba, bias_list, "o-", label="Bias²  (turun saat makin rumit)")
plt.plot(derajat_dicoba, var_list, "s-", label="Variance  (naik saat makin rumit)")
plt.plot(derajat_dicoba, total_list, "^-", lw=2, label="Total kesalahan")
plt.axvline(np.argmin(total_list) + 1, color="gray", linestyle="--",
            label="Titik terbaik")
plt.xlabel("Kerumitan model (derajat polinomial)")
plt.ylabel("Kesalahan")
plt.yscale("log")
plt.legend()
plt.grid(alpha=0.3)
plt.title("Bias-Variance Tradeoff")
plt.show()
 
print("Derajat terbaik:", np.argmin(total_list) + 1)
```
 
### Membaca Grafiknya
 
Garis bias terus menurun ke kanan. Garis variance terus menaik ke kanan. Garis total membentuk huruf U.
 
Titik terendah pada garis total adalah kerumitan yang paling pas untuk data ini. Di kiri titik itu Anda underfitting, di kanan Anda overfitting.
 
### Yang Perlu Dipahami
 
Titik terbaik itu **bukan angka tetap**. Posisinya bergeser tergantung:
 
**Jumlah data.** Makin banyak data, titik terbaiknya bergeser ke kanan. Artinya dengan data lebih banyak, Anda mampu memakai model lebih rumit tanpa overfitting.
 
**Tingkat noise.** Makin berisik datanya, titik terbaiknya bergeser ke kiri. Model sederhana lebih tahan terhadap gangguan.
 
Inilah alasan kenapa tidak ada aturan universal seperti "selalu pakai max_depth=5". Nilai yang tepat bergantung pada data Anda.
 
## Cara Menurunkan Bias
 
Pakai daftar ini kalau diagnosis Anda menunjukkan bias tinggi, yaitu skor di data latih sendiri sudah buruk.
 
### Tindakan yang Efektif
 
**Pakai model yang lebih kuat.** Dari regresi logistik ke Random Forest, atau dari Random Forest ke Gradient Boosting.
 
**Longgarkan pembatasan model.** Naikkan `max_depth`, turunkan `min_samples_leaf`, naikkan jumlah lapisan pada jaringan saraf.
 
**Kurangi regularisasi.** Naikkan `C` pada SVM dan regresi logistik, atau turunkan `alpha` pada Ridge dan Lasso.
 
**Tambah fitur baru yang bermakna.** Ini sering paling efektif. Buat rasio, selisih, interaksi antar kolom, atau uraikan tanggal menjadi komponen.
 
**Latih lebih lama.** Untuk model iteratif, naikkan `max_iter` atau `n_estimators`.
 
### Yang Tidak Akan Membantu
 
**Menambah data.** Ini penting dipahami. Kalau model Anda terlalu sederhana, memberinya sejuta baris data tidak akan mengubah apa pun. Garis lurus tetap garis lurus.
 
Ini sebabnya diagnosis harus dilakukan sebelum memutuskan mengumpulkan data lebih banyak, yang biayanya sering mahal.
 
### Per Algoritma
 
| Algoritma | Cara menurunkan bias |
|---|---|
| Regresi linear/logistik | Turunkan `alpha`, naikkan `C`, tambah fitur polinomial |
| Decision Tree | Naikkan `max_depth`, turunkan `min_samples_leaf` |
| Random Forest | Naikkan `max_depth`, naikkan `max_features` |
| Gradient Boosting | Naikkan `max_iter`, naikkan `max_leaf_nodes` |
| KNN | Turunkan `n_neighbors` |
| SVM | Naikkan `C`, naikkan `gamma` |
 
## Cara Menurunkan Variance
 
Pakai daftar ini kalau diagnosis Anda menunjukkan variance tinggi, yaitu skor latih bagus tapi skor validasi jauh lebih rendah.
 
### Tindakan yang Efektif
 
**Tambah data latih.** Ini obat paling ampuh untuk variance. Dengan data lebih banyak, gangguan acak jadi kurang berpengaruh dan model lebih sulit menghafal.
 
**Sederhanakan model.** Turunkan `max_depth`, naikkan `min_samples_leaf`, kurangi jumlah lapisan.
 
**Perkuat regularisasi.** Turunkan `C`, naikkan `alpha`.
 
**Kurangi jumlah fitur.** Buang kolom yang tidak berguna. Makin banyak kolom, makin banyak kesempatan model menemukan pola palsu.
 
**Pakai metode ensemble.** Random Forest secara khusus dirancang untuk menurunkan variance.
 
**Pakai early stopping.** Hentikan pelatihan sebelum model sempat menghafal.
 
### Kenapa Menambah Data Menurunkan Variance tapi Tidak Bias
 
Ini titik yang sering membingungkan, jadi perlu penjelasan.
 
Variance muncul karena model terlalu terpengaruh oleh kekhususan data latih tertentu. Dengan lebih banyak data, kekhususan itu tercuci oleh keberagaman, sehingga model dipaksa menemukan pola yang benar-benar berulang.
 
Bias muncul karena bentuk model itu sendiri tidak mampu mewakili polanya. Jumlah data tidak mengubah bentuk model. Garis lurus dengan 100 titik dan garis lurus dengan 100 juta titik sama-sama tetap garis lurus.
 
### Membuktikannya dengan Kode
 
```python
for n in [20, 50, 200, 1000]:
    Xn, yn = buat_data(n=n, seed=RANDOM_STATE)
 
    for derajat, label in [(1, "sederhana"), (15, "rumit   ")]:
        model = make_pipeline(PolynomialFeatures(derajat), LinearRegression())
        model.fit(Xn, yn)
        err = mean_squared_error(y_uji, model.predict(X_uji))
        print(f"n={n:5d}  model {label} (derajat {derajat:2d})  error uji = {err:.4f}")
    print()
```
 
Perhatikan hasilnya. Model rumit membaik jelas seiring data bertambah, karena variance-nya turun. Model sederhana nyaris tidak berubah, karena masalahnya bias, dan bias tidak peduli berapa banyak data yang Anda punya.
 
### Per Algoritma
 
| Algoritma | Cara menurunkan variance |
|---|---|
| Regresi linear/logistik | Naikkan `alpha`, turunkan `C`, pakai penalti L1 |
| Decision Tree | Turunkan `max_depth`, naikkan `min_samples_leaf`, pakai pruning |
| Random Forest | Naikkan `n_estimators`, turunkan `max_features` |
| Gradient Boosting | Turunkan `learning_rate`, aktifkan `early_stopping` |
| KNN | Naikkan `n_neighbors` |
| SVM | Turunkan `C`, turunkan `gamma` |
 
## Cara Mendapat Keduanya Sekaligus
 
Tradeoff bukan berarti Anda selalu harus mengorbankan salah satu. Ada beberapa cara menurunkan keduanya bersamaan.
 
### Bagging dan Random Forest
 
#### Idenya
 
Latih banyak model pada bagian data yang berbeda-beda, lalu rata-ratakan hasilnya.
 
#### Kenapa Berhasil
 
Tiap pohon dalam Random Forest punya variance tinggi. Tapi kesalahan tiap pohon berbeda-beda arahnya. Saat dirata-ratakan, kesalahan yang saling berlawanan itu meniadakan satu sama lain.
 
Analoginya seperti menebak berat sapi di pasar malam. Tebakan satu orang bisa meleset jauh. Tapi rata-rata tebakan dari 500 orang biasanya sangat dekat dengan berat sebenarnya, karena yang menebak terlalu tinggi diimbangi yang menebak terlalu rendah.
 
#### Hasilnya
 
Variance turun drastis, sementara bias hampir tidak berubah. Ini sebabnya Random Forest hampir selalu lebih baik daripada satu pohon keputusan.
 
```python
from sklearn.ensemble import RandomForestClassifier
 
diagnosis(Pipeline([("s", StandardScaler()),
                    ("m", DecisionTreeClassifier(random_state=RANDOM_STATE))]),
          Xc, yc, nama="Satu pohon")
 
diagnosis(Pipeline([("s", StandardScaler()),
                    ("m", RandomForestClassifier(n_estimators=300,
                                                 random_state=RANDOM_STATE))]),
          Xc, yc, nama="Random Forest (300 pohon)")
```
 
Bandingkan angka jaraknya. Random Forest biasanya punya jarak yang lebih kecil meski skor latihnya sama-sama tinggi.
 
### Boosting
 
#### Idenya
 
Berbeda dari bagging, boosting membangun model secara berurutan, di mana tiap model memperbaiki kesalahan model sebelumnya.
 
#### Efeknya pada Bias dan Variance
 
Boosting terutama menurunkan **bias**, karena tiap iterasi menambal kekurangan sebelumnya.
 
Tapi kalau dibiarkan terlalu lama, variance akan naik dan model mulai menghafal. Karena itu `early_stopping` dan `learning_rate` kecil sangat penting pada boosting.
 
### Regularisasi
 
#### Idenya
 
Menambahkan hukuman untuk kerumitan model, sehingga model dipaksa memilih solusi yang lebih sederhana kecuali kerumitan itu benar-benar terbayar.
 
#### Efeknya
 
Menaikkan bias sedikit, menurunkan variance banyak. Kalau penurunan variance-nya lebih besar daripada kenaikan bias, total kesalahan turun.
 
Inilah kenapa Ridge sering mengalahkan regresi linear biasa meski secara teori Ridge "sengaja dibuat sedikit meleset".
 
### Fitur yang Lebih Baik
 
#### Kenapa Ini Paling Ampuh
 
Fitur yang benar-benar informatif menurunkan bias, karena memberi model informasi yang sebelumnya tidak ada.
 
Sekaligus bisa menurunkan variance, karena model tidak perlu bekerja keras mencari-cari pola rumit dari fitur yang lemah.
 
Ini alasan kenapa dalam praktik, rekayasa fitur hampir selalu memberi peningkatan lebih besar daripada penyetelan hyperparameter.
 
## Tabel Gejala dan Tindakan
 
Tabel ini bisa dipakai sebagai rujukan cepat saat model Anda bermasalah.
 
| Gejala yang terlihat | Diagnosis | Tindakan pertama | Jangan lakukan |
|---|---|---|---|
| Skor latih rendah, validasi rendah, jarak kecil | Bias tinggi | Model lebih kuat, tambah fitur | Menambah data |
| Skor latih tinggi, validasi rendah, jarak lebar | Variance tinggi | Sederhanakan model, tambah data | Membuat model lebih rumit |
| Keduanya rendah, jarak lebar | Bias dan variance tinggi | Perbaiki bias dulu | Menyetel hyperparameter |
| Keduanya tinggi, jarak kecil | Seimbang | Perbaiki fitur atau terima hasilnya | Terus menyetel |
| Skor validasi naik-turun antar fold | Variance tinggi atau data kurang | Tambah data, sederhanakan model | Percaya satu hasil saja |
| Skor jauh di atas yang masuk akal | Curigai kebocoran data | Periksa pipeline dan cara split | Merayakan hasilnya |
| Skor mentok padahal sudah dicoba semua | Mungkin sudah mencapai batas noise | Cari sumber data baru | Menyetel lebih lama |
 
## Kesalahan Pemula yang Sering Terjadi
 
### Tidak Pernah Melihat Skor Data Latih
 
Ini kesalahan paling mendasar. Tanpa skor latih, Anda tidak punya cara membedakan bias dari variance, sehingga hanya bisa menebak tindakan.
 
Selalu pakai `return_train_score=True` pada `cross_validate`.
 
### Mengumpulkan Data Padahal Masalahnya Bias
 
Mengumpulkan data itu mahal dan makan waktu. Kalau masalahnya bias, semua usaha itu sia-sia. Diagnosis dulu.
 
### Menyederhanakan Model Padahal Masalahnya Bias
 
Kalau melihat skor rendah lalu refleks berpikir "berarti overfitting", Anda bisa saja menyederhanakan model yang sudah terlalu sederhana. Keadaannya jadi lebih buruk.
 
### Mengejar Skor Latih Sempurna
 
Skor latih 1,00 hampir selalu tanda buruk, bukan pencapaian. Artinya model menghafal.
 
### Mengabaikan Batas Noise
 
Kalau ahli manusia hanya bisa 85 persen dengan informasi yang sama, mengejar 95 persen berarti mengejar sesuatu yang tidak ada. Waktu Anda lebih baik dipakai untuk hal lain.
 
### Menganggap Tradeoff Selalu Berlaku Mutlak
 
Random Forest, regularisasi, dan fitur yang lebih baik bisa menurunkan keduanya sekaligus. Tradeoff berlaku saat Anda hanya menggeser satu tombol kerumitan, bukan saat mengubah pendekatan.
 
### Mendiagnosis dari Satu Kali Pembagian Data
 
Skor dari satu kali `train_test_split` mengandung unsur keberuntungan. Pakai validasi silang supaya diagnosis Anda tidak salah arah.
 
## Penutup
 
Bias-variance tradeoff sering diajarkan sebagai teori dengan rumus matematika, padahal manfaat sebenarnya sangat praktis: konsep ini mengubah pertanyaan "kenapa model saya jelek" menjadi pertanyaan yang bisa dijawab dengan tindakan konkret.
 
Tiga hal untuk diingat:
 
**Pertama**, selalu lihat skor latih dan skor validasi bersamaan. Satu angka saja tidak cukup untuk mendiagnosis apa pun.
 
**Kedua**, bias dan variance butuh obat yang berlawanan. Menambah data menyembuhkan variance tapi tidak menyentuh bias. Menyederhanakan model menyembuhkan variance tapi memperparah bias. Salah diagnosis berarti salah tindakan.
 
**Ketiga**, ada batas yang tidak bisa dilewati karena keacakan yang melekat pada masalahnya. Mengenali kapan Anda sudah mendekati batas itu menghemat banyak waktu yang bisa dipakai untuk hal yang lebih berguna.
 

