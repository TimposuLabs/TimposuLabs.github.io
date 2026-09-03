---
slug: algoritma-machine-learning-scikit-learn
title: "Macam-Macam Algoritma dalam Machine Learning: Panduan Praktis dengan Scikit-Learn"
authors: topekox
tags: [manchine learning, data mining, ai, data science]
---

Belajar machine learning sering terasa membingungkan karena banyaknya nama algoritma yang terdengar rumit. Padahal ide di balik sebagian besar algoritma itu sederhana dan bisa dijelaskan dengan analogi sehari-hari.

Artikel ini menjelaskan algoritma-algoritma yang paling sering dipakai, satu per satu, dengan pola yang selalu sama: analogi sederhana, cara kerjanya, kapan dipakai, data seperti apa yang cocok, kelebihan dan kekurangannya, lalu contoh kode yang bisa langsung dijalankan.

Semua kode di sini memakai dataset bawaan scikit-learn, jadi Anda tidak perlu mengunduh data apa pun untuk mencobanya.

<!-- truncate -->

## Sebelum Mulai: Istilah Dasar yang Perlu Dipahami

Bagian ini penting. Kalau istilah di bawah ini sudah jelas, sisa artikel akan jauh lebih mudah diikuti.

### Apa Itu Machine Learning

Dalam pemrograman biasa, kita menulis aturan dan komputer menjalankannya. Misalnya: *kalau nilai di atas 75, tulis "lulus"*.

Dalam machine learning, kita memberi komputer banyak contoh, lalu komputer sendiri yang mencari aturannya. Kita berikan ribuan data siswa beserta status lulus atau tidaknya, dan komputer menemukan sendiri pola apa yang membedakan keduanya.

Algoritma adalah metode yang dipakai komputer untuk menemukan pola tersebut. Setiap algoritma punya cara berpikir yang berbeda, dan itulah yang akan kita bahas.

### Fitur, Label, dan Baris Data

Bayangkan sebuah tabel Excel berisi data siswa.

| Nama | Jam Belajar | Nilai Tugas | Kehadiran | Lulus |
|---|---|---|---|---|
| Andi | 10 | 80 | 90% | Ya |
| Budi | 3 | 55 | 60% | Tidak |

**Baris data** adalah satu contoh, yaitu satu siswa. Istilah lainnya: sampel, observasi, atau instance.

**Fitur** adalah kolom-kolom yang dipakai untuk memprediksi, yaitu Jam Belajar, Nilai Tugas, dan Kehadiran. Dalam kode biasanya diberi nama `X` (huruf besar, karena berbentuk tabel).

**Label** atau **target** adalah kolom jawaban yang ingin diprediksi, yaitu kolom Lulus. Dalam kode biasanya diberi nama `y` (huruf kecil, karena berbentuk satu kolom saja).

### Data Latih dan Data Uji

Kalau kita melatih model dengan semua data, lalu mengujinya dengan data yang sama, hasilnya pasti bagus. Tapi itu seperti memberi ujian dengan soal yang persis sama dengan latihannya. Kita jadi tidak tahu apakah siswa itu benar-benar paham atau cuma hafal.

Karena itu data selalu dibagi dua:

- **Data latih (training set)**, biasanya 70 sampai 80 persen, dipakai model untuk belajar.
- **Data uji (test set)**, sisanya, disembunyikan dari model dan hanya dipakai di akhir untuk mengukur performa sebenarnya.

### Overfitting dan Underfitting

Ini dua masalah paling umum dalam machine learning.

**Overfitting** terjadi saat model terlalu hafal data latih, termasuk gangguan atau kebetulan yang tidak berarti. Analoginya seperti siswa yang menghafal kunci jawaban tanpa memahami konsepnya. Nilainya sempurna saat latihan, tapi jeblok saat ujian sungguhan. Cirinya: skor di data latih sangat tinggi, skor di data uji rendah.

**Underfitting** terjadi saat model terlalu sederhana untuk menangkap pola dalam data. Seperti siswa yang belum belajar sama sekali. Cirinya: skor rendah baik di data latih maupun di data uji.

Tujuan kita adalah berada di tengah: model yang cukup pintar untuk menangkap pola, tapi tidak sampai menghafal.

### Tiga Jenis Masalah Utama

**Klasifikasi** adalah memprediksi kategori. Contohnya: email ini spam atau bukan, penyakit ini jinak atau ganas, pelanggan ini akan berhenti berlangganan atau tidak. Jawabannya berupa pilihan terbatas.

**Regresi** adalah memprediksi angka. Contohnya: harga rumah ini berapa, berapa penjualan bulan depan, berapa lama pengiriman akan sampai. Jawabannya berupa bilangan.

**Clustering** adalah mengelompokkan data tanpa punya jawaban sebelumnya. Contohnya: membagi pelanggan menjadi beberapa segmen padahal kita tidak tahu ada berapa segmen dan seperti apa bentuknya.

Klasifikasi dan regresi disebut **supervised learning** (belajar terbimbing) karena kita punya jawaban benar untuk dijadikan panduan. Clustering disebut **unsupervised learning** (belajar tanpa bimbingan) karena tidak ada jawaban yang diberikan.

### Fitur Numerik dan Fitur Kategorikal

**Fitur numerik** berisi angka yang bisa dihitung, seperti umur, gaji, atau suhu.

**Fitur kategorikal** berisi kelompok, seperti jenis kelamin, kota, atau warna. Komputer tidak bisa langsung menghitung kata, jadi fitur ini harus diubah menjadi angka dulu. Prosesnya disebut *encoding*, dan yang paling umum adalah *one-hot encoding*, yaitu membuat satu kolom baru berisi 0 atau 1 untuk tiap kategori.

## Persiapan: Alat dan Pola Kode

### Memasang Library yang Dibutuhkan

```bash
pip install scikit-learn pandas numpy matplotlib
```

### Menyiapkan Data Contoh

Scikit-learn menyediakan beberapa dataset bawaan untuk belajar. Kita akan memakai dua di antaranya di sepanjang artikel ini.

```python
import numpy as np
import pandas as pd
from sklearn.datasets import load_breast_cancer, load_diabetes
from sklearn.model_selection import train_test_split

RANDOM_STATE = 42   # angka bebas, gunanya agar hasil acak selalu sama saat diulang

# Dataset klasifikasi: memprediksi tumor jinak atau ganas
data_klasifikasi = load_breast_cancer(as_frame=True)
X_clf = data_klasifikasi.data      # fitur, 30 kolom hasil pengukuran sel
y_clf = data_klasifikasi.target    # label, 0 = ganas, 1 = jinak

# Dataset regresi: memprediksi perkembangan penyakit diabetes
data_regresi = load_diabetes(as_frame=True)
X_reg = data_regresi.data
y_reg = data_regresi.target

print("Ukuran data klasifikasi:", X_clf.shape)   # (569 baris, 30 kolom)
print("Jumlah tiap kelas:", np.bincount(y_clf))
```

### Membagi Data Latih dan Data Uji

```python
X_train, X_test, y_train, y_test = train_test_split(
    X_clf, y_clf,
    test_size=0.2,          # 20% untuk data uji
    stratify=y_clf,         # proporsi kelas dijaga tetap sama di kedua bagian
    random_state=RANDOM_STATE,
)

print("Data latih:", X_train.shape[0], "baris")
print("Data uji  :", X_test.shape[0], "baris")
```

Parameter `stratify=y_clf` penting. Tanpa itu, bisa saja data uji kebetulan berisi terlalu banyak satu kelas, sehingga hasil pengukuran jadi tidak adil.

### Pola Kode yang Selalu Sama

Enaknya scikit-learn, semua algoritma memakai pola yang sama persis. Kalau sudah paham satu, yang lain tinggal ganti nama algoritmanya.

```python
from sklearn.linear_model import LogisticRegression

# 1. Buat objek model
model = LogisticRegression(max_iter=5000)

# 2. Latih dengan data latih
model.fit(X_train, y_train)

# 3. Prediksi data uji
prediksi = model.predict(X_test)

# 4. Ukur performanya
print("Akurasi:", model.score(X_test, y_test))
```

Empat langkah itu berlaku untuk hampir semua algoritma di artikel ini.

### Kapan Data Perlu Diskalakan

Ini konsep yang sering membingungkan pemula, jadi perlu dijelaskan sekali di awal.

Bayangkan dua kolom: gaji (dalam jutaan, misalnya 5.000.000) dan umur (misalnya 30). Beberapa algoritma menghitung jarak antar data. Karena angka gaji jauh lebih besar, kolom gaji akan mendominasi perhitungan dan kolom umur nyaris tidak berpengaruh, padahal belum tentu gaji memang lebih penting.

**Penskalaan** (scaling) menyamakan rentang semua kolom supaya adil. Yang paling umum adalah `StandardScaler`, yang mengubah tiap kolom agar rata-ratanya nol.

**Algoritma yang butuh penskalaan:** KNN, SVM, Regresi Logistik, Regresi Linear dengan regularisasi, K-Means, PCA, dan jaringan saraf.

**Algoritma yang tidak butuh:** semua yang berbasis pohon keputusan, yaitu Decision Tree, Random Forest, dan Gradient Boosting. Algoritma ini hanya membandingkan nilai dengan ambang batas, jadi besar kecilnya angka tidak masalah.

Cara paling aman melakukan penskalaan adalah lewat `Pipeline`, yang menggabungkan langkah persiapan data dan model menjadi satu kesatuan.

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

model = Pipeline([
    ("scaler", StandardScaler()),                 # langkah 1: skalakan
    ("model", LogisticRegression(max_iter=5000)), # langkah 2: latih model
])
model.fit(X_train, y_train)
```

Kenapa harus lewat `Pipeline` dan bukan menskalakan datanya langsung? Karena `Pipeline` memastikan aturan penskalaan hanya dipelajari dari data latih, lalu diterapkan ke data uji. Kalau penskalaan dilakukan pada seluruh data sekaligus, informasi dari data uji ikut bocor ke proses pelatihan dan hasil pengukuran jadi terlalu bagus untuk dipercaya.

## Algoritma untuk Memprediksi Angka

### Regresi Linear

#### Analogi Sederhana

Bayangkan Anda menandai titik-titik data di kertas grafik: sumbu mendatar adalah luas rumah, sumbu tegak adalah harganya. Lalu Anda menarik satu garis lurus yang paling pas melewati tengah-tengah titik itu. Garis itulah modelnya. Untuk memprediksi harga rumah baru, tinggal lihat posisi luasnya di garis tersebut.

#### Cara Kerjanya

Algoritma mencari garis (atau bidang, kalau fiturnya lebih dari satu) yang jarak totalnya ke semua titik data paling kecil. Hasilnya berupa rumus seperti:

```
harga = 500 + (12 × luas) + (30 × jumlah_kamar)
```

Angka 12 dan 30 disebut **koefisien**. Artinya, tiap tambahan satu meter persegi menaikkan harga sebesar 12 satuan, dengan asumsi faktor lain tetap.

#### Kapan Digunakan

Saat yang diprediksi berupa angka dan Anda ingin tahu bukan cuma hasilnya, tapi juga seberapa besar pengaruh tiap faktor. Rumusnya bisa dibaca dan dijelaskan ke orang lain, jadi cocok untuk laporan atau presentasi.

Selalu jadikan ini model pertama yang dicoba. Kalau model sederhana ini sudah cukup bagus, tidak perlu repot dengan model rumit.

#### Jenis Data yang Cocok

Fitur berupa angka, dan hubungan dengan target kira-kira lurus. Contohnya luas rumah dengan harga: makin luas makin mahal, kenaikannya cukup teratur.

Kurang cocok kalau hubungannya berbentuk lengkung atau naik-turun. Misalnya hubungan usia dengan risiko kecelakaan yang tinggi di usia muda, rendah di usia menengah, lalu naik lagi di usia tua.

#### Kelebihan dan Kekurangan

Kelebihannya: sangat cepat, mudah dijelaskan, dan tidak perlu banyak pengaturan.

Kekurangannya: hanya bisa menangkap hubungan lurus, dan sangat mudah terganggu oleh data yang nilainya ekstrem (outlier). Satu rumah seharga 100 kali lipat rumah lain bisa menarik garisnya jauh melenceng.

#### Contoh Kode

```python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

Xr_train, Xr_test, yr_train, yr_test = train_test_split(
    X_reg, y_reg, test_size=0.2, random_state=RANDOM_STATE
)

model = LinearRegression()
model.fit(Xr_train, yr_train)
prediksi = model.predict(Xr_test)

print("Rata-rata selisih prediksi (MAE):", round(mean_absolute_error(yr_test, prediksi), 2))
print("R2 (0 sampai 1, makin tinggi makin baik):", round(r2_score(yr_test, prediksi), 3))

# Melihat pengaruh tiap fitur
pengaruh = pd.Series(model.coef_, index=Xr_train.columns).sort_values(key=abs, ascending=False)
print(pengaruh.head())
```

### Regresi Ridge dan Lasso

#### Analogi Sederhana

Regresi linear biasa kadang terlalu bersemangat: ia memberi bobot besar pada fitur yang sebenarnya cuma kebetulan cocok di data latih. Ridge dan Lasso adalah versi regresi linear yang diberi rem.

Ridge menekan semua koefisien agar lebih kecil dan tidak ada yang berlebihan. Lasso lebih tegas lagi: koefisien fitur yang dianggap tidak berguna dibuat nol, artinya fitur itu dibuang sama sekali.

#### Cara Kerjanya

Keduanya menambahkan hukuman untuk koefisien yang terlalu besar. Seberapa keras hukumannya diatur lewat parameter `alpha`. Makin besar `alpha`, makin kuat remnya.

#### Kapan Digunakan

Ridge dipakai saat fitur banyak dan saling berhubungan erat, misalnya tinggi badan dan berat badan yang biasanya bergerak searah.

Lasso dipakai saat fitur sangat banyak dan Anda menduga sebagian besar tidak berguna. Lasso sekaligus berfungsi memilih fitur mana yang layak dipertahankan.

#### Jenis Data yang Cocok

Data dengan banyak kolom, apalagi kalau jumlah kolomnya mendekati atau melebihi jumlah barisnya. Dalam kondisi seperti itu regresi linear biasa hampir pasti overfitting.

Datanya wajib diskalakan lebih dulu, karena hukuman dihitung dari besar kecilnya koefisien.

#### Kelebihan dan Kekurangan

Kelebihannya: lebih tahan overfitting daripada regresi linear biasa, dan Lasso otomatis menyeleksi fitur.

Kekurangannya: ada parameter `alpha` yang harus dicari nilai terbaiknya, dan koefisiennya sengaja dibuat sedikit meleset demi kestabilan, jadi kurang tepat untuk analisis statistik formal.

#### Contoh Kode

```python
from sklearn.linear_model import RidgeCV, LassoCV

# Akhiran "CV" berarti alpha terbaik dicari otomatis
ridge = Pipeline([
    ("scaler", StandardScaler()),
    ("model", RidgeCV(alphas=[0.01, 0.1, 1, 10, 100])),
])
ridge.fit(Xr_train, yr_train)
print("Ridge R2:", round(ridge.score(Xr_test, yr_test), 3))

lasso = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LassoCV(random_state=RANDOM_STATE, max_iter=10000)),
])
lasso.fit(Xr_train, yr_train)

koef = pd.Series(lasso.named_steps["model"].coef_, index=Xr_train.columns)
print("Fitur yang dipertahankan Lasso:", (koef != 0).sum(), "dari", len(koef))
```

## Algoritma untuk Memprediksi Kategori

### Regresi Logistik

#### Analogi Sederhana

Namanya mengandung kata "regresi", tapi ini sebenarnya algoritma klasifikasi. Anggap saja ia menghitung skor kepercayaan, lalu mengubah skor itu menjadi persentase antara 0 dan 100 persen.

Misalnya untuk email tertentu ia menjawab: "saya 87 persen yakin ini spam". Kalau persentasenya di atas 50, dinyatakan spam.

#### Cara Kerjanya

Sama seperti regresi linear, ia mencari garis pemisah. Bedanya, hasil hitungannya dilewatkan ke fungsi khusus (sigmoid) yang memampatkan nilai apa pun menjadi rentang 0 sampai 1, sehingga bisa dibaca sebagai probabilitas.

#### Kapan Digunakan

Ini model klasifikasi pertama yang harus selalu dicoba. Cepat, hasilnya bisa dijelaskan, dan angka probabilitasnya bisa dipercaya. Kalau nanti dipakai di aplikasi nyata, model ini juga sangat ringan.

#### Jenis Data yang Cocok

Data numerik yang sudah diskalakan, dengan batas antar kelompok yang kira-kira bisa dipisahkan garis lurus.

Sangat kuat untuk data teks yang sudah diubah jadi angka, misalnya menghitung kemunculan kata dalam dokumen.

#### Kelebihan dan Kekurangan

Kelebihannya: cepat, ringan, mudah dijelaskan, dan probabilitasnya akurat.

Kekurangannya: hanya bisa membuat batas lurus. Kalau kelompok data berbentuk lingkaran di dalam lingkaran, model ini akan kesulitan.

#### Contoh Kode

```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

logreg = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LogisticRegression(max_iter=5000, random_state=RANDOM_STATE)),
])
logreg.fit(X_train, y_train)

print(classification_report(y_test, logreg.predict(X_test), digits=3))

# Melihat probabilitas, bukan cuma keputusan akhir
probabilitas = logreg.predict_proba(X_test)[:, 1]
print("Probabilitas 5 data pertama:", probabilitas[:5].round(3))
```

#### Catatan untuk Data Tidak Seimbang

Kalau salah satu kelas jauh lebih sedikit, misalnya cuma 2 persen data adalah penipuan, tambahkan `class_weight="balanced"`. Ini membuat model memberi perhatian lebih pada kelompok yang jarang muncul, sehingga tidak asal menebak kelas mayoritas terus.

### K-Nearest Neighbors (KNN)

#### Analogi Sederhana

Ini algoritma paling mudah dipahami. Kalau Anda ingin tahu jenis makanan apa yang disukai orang baru, tanyakan saja pada 5 orang yang paling mirip dengannya. Jawaban terbanyak dari 5 orang itulah tebakannya.

Huruf K adalah jumlah tetangga yang ditanya. K sama dengan 5 berarti bertanya pada 5 data terdekat.

#### Cara Kerjanya

Uniknya, algoritma ini tidak benar-benar belajar apa pun saat pelatihan. Ia hanya menyimpan seluruh data latih. Saat diminta memprediksi, barulah ia menghitung jarak ke semua data yang tersimpan, mengambil K yang terdekat, lalu mengambil suara terbanyak.

#### Kapan Digunakan

Untuk data berukuran kecil sampai sedang dengan pola yang rumit dan tidak beraturan. Juga bagus sebagai bahan pembanding awal, karena idenya sederhana dan hasilnya mudah dipahami.

#### Jenis Data yang Cocok

Fitur numerik yang jumlah kolomnya tidak terlalu banyak, idealnya di bawah 20, dan sudah diskalakan.

Data harus cukup padat. Kalau data latih terlalu sedikit, "tetangga terdekat" yang ditemukan sebenarnya jauh dan tidak mirip sama sekali.

#### Kelebihan dan Kekurangan

Kelebihannya: konsepnya paling mudah dijelaskan, tidak ada proses pelatihan, dan bisa menangkap pola yang sangat berliku.

Kekurangannya: prediksinya lambat kalau data latihnya besar, karena harus menghitung jarak ke semua data setiap kali. Dan yang paling penting, algoritma ini rusak kalau kolomnya terlalu banyak. Pada data berdimensi tinggi, semua titik jadi terasa berjarak sama sehingga konsep "terdekat" kehilangan arti.

#### Contoh Kode

```python
from sklearn.neighbors import KNeighborsClassifier

for k in [1, 3, 5, 11, 21]:
    knn = Pipeline([
        ("scaler", StandardScaler()),
        ("model", KNeighborsClassifier(n_neighbors=k)),
    ])
    knn.fit(X_train, y_train)
    print(f"K={k:2d} -> akurasi latih={knn.score(X_train, y_train):.3f} "
          f"akurasi uji={knn.score(X_test, y_test):.3f}")
```

Perhatikan hasilnya. Saat K sama dengan 1, akurasi di data latih biasanya 100 persen sempurna, tapi di data uji lebih rendah. Itu contoh nyata overfitting: model cuma menghafal.

### Naive Bayes

#### Analogi Sederhana

Bayangkan penyaring spam sederhana. Kalau email mengandung kata "gratis", kemungkinan spam naik. Kalau ada kata "hadiah", naik lagi. Kalau ada "rapat", kemungkinan spam turun.

Naive Bayes mengumpulkan semua petunjuk kecil ini lalu menghitung total kemungkinannya.

#### Cara Kerjanya

Algoritma ini menghitung, berdasarkan data latih, seberapa sering tiap kata muncul di email spam dibanding email biasa. Lalu untuk email baru, semua petunjuk itu dikalikan untuk mendapat kesimpulan.

Kata "naive" (naif) di namanya berasal dari asumsi bahwa semua fitur saling bebas dan tidak berhubungan. Asumsi ini jelas tidak benar di dunia nyata, tapi anehnya modelnya tetap sering bekerja dengan baik.

#### Kapan Digunakan

Paling terkenal untuk klasifikasi teks: penyaringan spam, analisis sentimen ulasan produk, dan pengelompokan berita. Juga berguna kalau data latih Anda sedikit, karena pelatihannya sangat cepat.

#### Jenis Data yang Cocok

Ada beberapa versi untuk jenis data berbeda:

- `MultinomialNB` untuk data hitungan, misalnya berapa kali sebuah kata muncul.
- `BernoulliNB` untuk data ya/tidak berupa 0 dan 1.
- `GaussianNB` untuk data angka biasa.

#### Kelebihan dan Kekurangan

Kelebihannya: sangat cepat, butuh sedikit data, dan bekerja baik pada teks.

Kekurangannya: angka probabilitasnya kurang bisa dipercaya, cenderung terlalu yakin dengan menghasilkan nilai mendekati 0 atau 1. Performanya juga menurun kalau fitur-fiturnya saling berhubungan erat.

#### Contoh Kode

```python
from sklearn.naive_bayes import GaussianNB
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# Untuk data angka biasa
nb = GaussianNB()
nb.fit(X_train, y_train)
print("Akurasi GaussianNB:", round(nb.score(X_test, y_test), 3))

# Untuk data teks
dokumen = ["gratis hadiah menang undian", "rapat besok jam sembilan",
           "menang hadiah gratis sekarang", "laporan bulanan sudah dikirim"]
label = [1, 0, 1, 0]   # 1 = spam, 0 = bukan spam

spam_clf = Pipeline([
    ("hitung_kata", CountVectorizer()),
    ("model", MultinomialNB()),
])
spam_clf.fit(dokumen, label)
print("Prediksi:", spam_clf.predict(["gratis undian hadiah"]))
```

### Support Vector Machine (SVM)

#### Analogi Sederhana

Bayangkan dua kelompok titik di atas kertas, dan Anda harus memisahkannya dengan garis. Ada banyak garis yang bisa memisahkan keduanya. SVM memilih garis yang jaraknya paling lebar ke titik terdekat dari kedua kelompok, ibarat membuat jalan selebar mungkin di antara dua barisan rumah.

Alasannya masuk akal: makin lebar jaraknya, makin aman kalau nanti ada data baru yang posisinya sedikit bergeser.

#### Cara Kerjanya

Untuk data yang tidak bisa dipisah garis lurus, SVM punya trik cerdas bernama **kernel**. Bayangkan titik-titik merah membentuk lingkaran di tengah, dikelilingi titik biru. Di kertas datar tidak ada garis lurus yang bisa memisahkannya. Tapi kalau titik merah diangkat ke atas seperti gunung, tiba-tiba selembar bidang datar bisa memisahkan keduanya dengan mudah.

Itulah yang dilakukan kernel: memindahkan data ke dimensi lebih tinggi agar bisa dipisah dengan bidang lurus.

#### Kapan Digunakan

Untuk data berukuran kecil sampai menengah, di bawah sekitar 50 ribu baris, dengan batas antar kelompok yang rumit. Juga bagus saat kolom banyak tapi barisnya sedikit.

#### Jenis Data yang Cocok

Fitur numerik yang wajib diskalakan. SVM sangat sensitif terhadap perbedaan skala, jauh lebih sensitif daripada kebanyakan algoritma lain.

#### Kelebihan dan Kekurangan

Kelebihannya: sangat akurat pada data ukuran sedang dan mampu menangani batas yang berliku.

Kekurangannya: menjadi sangat lambat kalau datanya besar, karena waktu pelatihannya naik jauh lebih cepat daripada pertambahan jumlah data. Hasilnya juga sulit dijelaskan, dan ada dua parameter penting (`C` dan `gamma`) yang harus dicari nilainya.

#### Contoh Kode

```python
from sklearn.svm import SVC

svm = Pipeline([
    ("scaler", StandardScaler()),
    ("model", SVC(kernel="rbf", C=1.0, gamma="scale", random_state=RANDOM_STATE)),
])
svm.fit(X_train, y_train)
print("Akurasi SVM:", round(svm.score(X_test, y_test), 3))
```

Arti dua parameter utamanya:

- `C` mengatur seberapa toleran model terhadap kesalahan. `C` kecil berarti model santai dan membiarkan beberapa titik salah demi jalan yang lebar. `C` besar berarti model berusaha keras tidak salah sama sekali, tapi berisiko overfitting.
- `gamma` mengatur seberapa jauh pengaruh satu titik data. `gamma` besar membuat batasnya sangat berliku mengikuti tiap titik.

## Algoritma Berbasis Pohon Keputusan

### Decision Tree

#### Analogi Sederhana

Ini seperti permainan tebak-tebakan dua puluh pertanyaan. Komputer mengajukan serangkaian pertanyaan ya atau tidak sampai sampai pada kesimpulan.

```
Apakah nilai tugas > 70?
├── Ya  → Apakah kehadiran > 80%?
│         ├── Ya  → LULUS
│         └── Tidak → TIDAK LULUS
└── Tidak → Apakah jam belajar > 15?
          ├── Ya  → LULUS
          └── Tidak → TIDAK LULUS
```

#### Cara Kerjanya

Di tiap langkah, algoritma mencoba semua kemungkinan pertanyaan dan memilih yang paling ampuh memisahkan data menjadi kelompok yang seragam. Proses ini diulang terus sampai tiap kelompok cukup murni atau sampai batas kedalaman tercapai.

#### Kapan Digunakan

Saat Anda perlu menjelaskan alasan di balik keputusan model. Aturannya bisa dicetak dan dibaca manusia, bahkan bisa diterjemahkan menjadi prosedur kerja.

Algoritma ini juga menjadi bahan dasar Random Forest dan Gradient Boosting yang akan dibahas berikutnya.

#### Jenis Data yang Cocok

Hampir semua jenis data tabel. Campuran angka dan kategori tidak masalah, penskalaan tidak diperlukan, dan nilai ekstrem tidak terlalu mengganggu.

#### Kelebihan dan Kekurangan

Kelebihannya: paling mudah dijelaskan ke orang non-teknis, dan tidak butuh persiapan data yang rumit.

Kekurangannya: sangat mudah overfitting kalau tidak dibatasi. Pohon yang dibiarkan tumbuh bebas akan membuat aturan khusus untuk tiap baris data. Selain itu pohon tunggal tidak stabil: ubah sedikit datanya, bentuk pohonnya bisa berubah total.

#### Contoh Kode

```python
from sklearn.tree import DecisionTreeClassifier, export_text

for kedalaman in [2, 3, 5, None]:
    tree = DecisionTreeClassifier(max_depth=kedalaman, random_state=RANDOM_STATE)
    tree.fit(X_train, y_train)
    print(f"max_depth={str(kedalaman):5s} latih={tree.score(X_train, y_train):.3f} "
          f"uji={tree.score(X_test, y_test):.3f}")

# Mencetak aturan pohon supaya bisa dibaca
tree = DecisionTreeClassifier(max_depth=3, random_state=RANDOM_STATE)
tree.fit(X_train, y_train)
print(export_text(tree, feature_names=list(X_train.columns)))
```

Coba jalankan bagian pertama. Saat `max_depth=None` (tanpa batas), akurasi di data latih akan mencapai 100 persen sementara di data uji turun. Itulah overfitting yang terlihat jelas dalam angka.

### Random Forest

#### Analogi Sederhana

Kalau bertanya pada satu orang ahli, jawabannya bisa saja bias atau keliru. Tapi kalau bertanya pada 500 orang lalu mengambil suara terbanyak, hasilnya biasanya jauh lebih andal.

Random Forest membuat ratusan pohon keputusan, masing-masing dilatih pada bagian data dan kolom yang sedikit berbeda, lalu menggabungkan semua jawabannya melalui pemungutan suara.

#### Cara Kerjanya

Ada dua sumber keacakan yang membuat pohon-pohon itu berbeda satu sama lain:

1. Tiap pohon dilatih dengan sampel acak dari data latih.
2. Di tiap pertanyaan, pohon hanya boleh mempertimbangkan sebagian kolom yang dipilih acak.

Keacakan ini membuat kesalahan tiap pohon berbeda-beda, sehingga saat digabungkan kesalahannya saling meniadakan.

#### Kapan Digunakan

Ini pilihan terbaik untuk pemula pada data tabel. Hasilnya sudah bagus dengan pengaturan bawaan, sulit dibuat rusak, dan tidak butuh banyak penyetelan.

Kalau Anda bingung mau pakai apa untuk data berbentuk tabel, mulai dari sini.

#### Jenis Data yang Cocok

Data tabel ukuran sedang sampai besar dengan campuran jenis kolom. Tahan terhadap kolom yang tidak berguna dan tidak butuh penskalaan.

#### Kelebihan dan Kekurangan

Kelebihannya: akurat tanpa banyak penyetelan, jarang overfitting parah, dan bisa menunjukkan fitur mana yang paling berpengaruh.

Kekurangannya: ukuran modelnya besar dan prediksinya lebih lambat dibanding model sederhana. Alasan keputusannya juga tidak bisa dibaca semudah pohon tunggal, karena ada ratusan pohon di dalamnya.

#### Contoh Kode

```python
from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(
    n_estimators=300,        # jumlah pohon
    max_depth=None,          # pohon boleh tumbuh bebas, aman karena digabung
    min_samples_leaf=2,      # tiap ujung pohon minimal berisi 2 data
    random_state=RANDOM_STATE,
    n_jobs=-1,               # pakai semua inti prosesor
)
rf.fit(X_train, y_train)
print("Akurasi Random Forest:", round(rf.score(X_test, y_test), 3))

# Fitur mana yang paling berpengaruh
penting = pd.Series(rf.feature_importances_, index=X_train.columns)
print(penting.sort_values(ascending=False).head(8).round(4))
```

### Gradient Boosting

#### Analogi Sederhana

Bayangkan seorang siswa mengerjakan soal latihan. Setelah selesai, ia memeriksa soal mana yang salah, lalu belajar khusus untuk memperbaiki kesalahan itu. Setelah itu ia coba lagi, cari kesalahan baru, perbaiki lagi. Begitu terus ratusan kali.

Itulah gradient boosting. Pohon pertama dibuat, lalu pohon kedua dibuat khusus untuk memperbaiki kesalahan pohon pertama, pohon ketiga memperbaiki sisa kesalahan pohon pertama dan kedua, dan seterusnya.

#### Perbedaan dengan Random Forest

Random Forest membuat semua pohon secara bersamaan dan mandiri, lalu menggabungkan hasilnya. Ibarat rapat di mana semua orang berpendapat lalu diambil suara terbanyak.

Gradient Boosting membuat pohon secara berurutan, di mana tiap pohon belajar dari kesalahan pendahulunya. Ibarat estafet perbaikan.

#### Kapan Digunakan

Saat Anda ingin akurasi setinggi mungkin pada data tabel dan punya waktu untuk mencari pengaturan terbaik. Pada sebagian besar kompetisi data science, algoritma inilah yang menang.

#### Jenis Data yang Cocok

Sama seperti Random Forest, tapi hasilnya lebih unggul saat datanya cukup besar. Versi `HistGradientBoostingClassifier` bahkan bisa menangani data kosong secara otomatis tanpa perlu diisi lebih dulu.

#### Kelebihan dan Kekurangan

Kelebihannya: biasanya paling akurat untuk data tabel.

Kekurangannya: lebih sensitif terhadap pengaturan dibanding Random Forest. Kalau salah setel, bisa overfitting parah. Pelatihannya juga berurutan sehingga tidak bisa dipercepat sebanyak Random Forest.

#### Contoh Kode

```python
from sklearn.ensemble import HistGradientBoostingClassifier

hgb = HistGradientBoostingClassifier(
    learning_rate=0.05,      # seberapa besar tiap pohon boleh mengoreksi
    max_iter=500,            # jumlah maksimum pohon
    early_stopping=True,     # berhenti sendiri kalau sudah tidak membaik
    random_state=RANDOM_STATE,
)
hgb.fit(X_train, y_train)
print("Akurasi:", round(hgb.score(X_test, y_test), 3))
print("Jumlah pohon yang benar-benar dipakai:", hgb.n_iter_)
```

Dua pengaturan paling penting:

- `learning_rate` mengatur seberapa besar tiap pohon boleh mengubah hasil. Nilai kecil seperti 0,05 membuat proses lebih hati-hati dan hasilnya lebih baik, tapi butuh lebih banyak pohon.
- `early_stopping=True` membuat pelatihan berhenti sendiri saat penambahan pohon tidak lagi membantu, sehingga terhindar dari overfitting.

## Algoritma untuk Data Tanpa Jawaban

Sampai di sini semua algoritma butuh kolom jawaban. Tiga algoritma berikut bekerja tanpa jawaban sama sekali.

### K-Means

#### Analogi Sederhana

Bayangkan Anda punya sekantong kelereng berbagai warna yang tercampur, dan Anda ingin memisahkannya menjadi 3 tumpukan berdasarkan kemiripan, padahal Anda tidak tahu warna apa saja yang ada.

Caranya: letakkan 3 penanda di sembarang tempat, kelompokkan tiap kelereng ke penanda terdekat, lalu geser tiap penanda ke tengah kelompoknya. Ulangi terus sampai penandanya tidak bergeser lagi.

Huruf K adalah jumlah kelompok yang ingin dibuat.

#### Cara Kerjanya

Persis seperti analogi di atas. Titik pusat kelompok disebut **centroid**. Algoritma bergantian antara menugaskan tiap data ke centroid terdekat dan menggeser centroid ke tengah anggotanya, sampai posisinya stabil.

#### Kapan Digunakan

Segmentasi pelanggan, pengelompokan produk, atau eksplorasi awal untuk melihat apakah data punya kelompok alami.

#### Jenis Data yang Cocok

Fitur numerik yang sudah diskalakan, dengan kelompok yang bentuknya kira-kira bulat dan ukurannya seimbang.

#### Kelebihan dan Kekurangan

Kelebihannya: cepat, mudah dipahami, dan bisa menangani data besar.

Kekurangannya: Anda harus menentukan sendiri berapa jumlah kelompoknya sebelum menjalankan. Selain itu ia mengasumsikan kelompok berbentuk bulat, sehingga gagal pada kelompok yang bentuknya memanjang atau melengkung. Nilai ekstrem juga bisa menarik centroid jauh melenceng.

#### Contoh Kode

```python
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

X_skala = StandardScaler().fit_transform(X_clf)

# Mencari jumlah kelompok terbaik
for k in range(2, 7):
    km = KMeans(n_clusters=k, n_init="auto", random_state=RANDOM_STATE)
    label_kelompok = km.fit_predict(X_skala)
    skor = silhouette_score(X_skala, label_kelompok)
    print(f"K={k} silhouette={skor:.3f}")
```

Nilai *silhouette* berkisar dari -1 sampai 1. Makin mendekati 1, makin jelas pemisahan kelompoknya. Pilih K dengan nilai tertinggi.

### DBSCAN

#### Analogi Sederhana

Bayangkan foto lampu kota dari udara. Tempat yang lampunya rapat berarti pusat kota, tempat yang lampunya jarang berarti pinggiran, dan lampu yang berdiri sendirian di tengah kegelapan berarti rumah terpencil.

DBSCAN bekerja begitu: kumpulan titik yang berdekatan dianggap satu kelompok, dan titik yang sendirian ditandai sebagai *noise* atau pencilan.

#### Cara Kerjanya

Ada dua pengaturan. Parameter `eps` menentukan seberapa dekat dua titik dianggap bertetangga. Parameter `min_samples` menentukan berapa tetangga minimal agar sebuah titik dianggap bagian dari kelompok padat.

#### Kapan Digunakan

Saat Anda tidak tahu ada berapa kelompok, bentuk kelompoknya tidak beraturan, dan Anda justru ingin menemukan data yang menyimpang.

#### Jenis Data yang Cocok

Data numerik dengan jumlah kolom tidak terlalu banyak, di mana ada perbedaan kepadatan yang jelas antara kelompok dan latar belakangnya. Bagus untuk data lokasi geografis.

#### Kelebihan dan Kekurangan

Kelebihannya: tidak perlu menentukan jumlah kelompok, bisa menangani bentuk apa pun, dan sekaligus mendeteksi pencilan.

Kekurangannya: sangat bergantung pada nilai `eps` yang tepat, dan sulit dipakai kalau kepadatan tiap kelompok sangat berbeda-beda.

#### Contoh Kode

```python
from sklearn.cluster import DBSCAN

db = DBSCAN(eps=3.0, min_samples=5)
label_kelompok = db.fit_predict(X_skala)

jumlah_kelompok = len(set(label_kelompok)) - (1 if -1 in label_kelompok else 0)
print("Jumlah kelompok ditemukan:", jumlah_kelompok)
print("Data yang dianggap pencilan:", (label_kelompok == -1).sum())
```

Label -1 berarti data itu dianggap pencilan dan tidak masuk kelompok mana pun.

### Principal Component Analysis (PCA)

#### Analogi Sederhana

Bayangkan sebuah patung tiga dimensi. Anda menyorotnya dengan lampu dan melihat bayangannya di dinding, yang hanya dua dimensi. Kalau sudut sorotnya tepat, bayangan itu masih bisa dikenali bentuknya meski informasinya berkurang.

PCA mencari sudut penyorotan terbaik untuk memampatkan data berkolom banyak menjadi lebih sedikit kolom, sambil menahan sebanyak mungkin informasi.

#### Cara Kerjanya

PCA mencari arah di mana data paling menyebar, karena arah dengan sebaran terbesar biasanya membawa informasi terbanyak. Arah-arah baru ini disebut **komponen utama**.

#### Kapan Digunakan

Tiga situasi utama: mempercepat pelatihan saat kolom sangat banyak, menggambar data berkolom banyak menjadi grafik dua dimensi, dan mengatasi kolom-kolom yang saling berhubungan erat.

#### Jenis Data yang Cocok

Fitur numerik yang sudah diskalakan dan saling berkorelasi. Kalau kolom-kolomnya sama sekali tidak berhubungan, PCA tidak banyak membantu.

#### Kelebihan dan Kekurangan

Kelebihannya: mengurangi jumlah kolom secara drastis dengan kehilangan informasi minimal, dan memungkinkan visualisasi.

Kekurangannya: kolom hasil PCA tidak punya arti yang bisa dijelaskan lagi. Kolom baru berupa campuran dari semua kolom asli, jadi Anda tidak bisa lagi bilang "faktor umur berpengaruh sekian".

#### Contoh Kode

```python
from sklearn.decomposition import PCA

pca = PCA(n_components=2, random_state=RANDOM_STATE)
X_2d = pca.fit_transform(X_skala)

print("Dari", X_skala.shape[1], "kolom menjadi", X_2d.shape[1], "kolom")
print("Informasi yang berhasil dipertahankan:",
      round(pca.explained_variance_ratio_.sum() * 100, 1), "%")

# PCA sebagai bagian dari pipeline
model_pca = Pipeline([
    ("scaler", StandardScaler()),
    ("pca", PCA(n_components=10)),
    ("model", LogisticRegression(max_iter=5000)),
])
model_pca.fit(X_train, y_train)
print("Akurasi setelah PCA:", round(model_pca.score(X_test, y_test), 3))
```

## Cara Menilai Model Sudah Bagus atau Belum

### Ukuran untuk Klasifikasi

#### Confusion Matrix

Ini tabel yang menunjukkan detail kesalahan model. Untuk kasus dua kelas, isinya empat angka:

|  | Ditebak Negatif | Ditebak Positif |
|---|---|---|
| **Sebenarnya Negatif** | Benar Negatif | Salah Positif |
| **Sebenarnya Positif** | Salah Negatif | Benar Positif |

**Salah positif** (false positive) berarti model bilang "ya" padahal sebenarnya "tidak". Contohnya alarm kebakaran berbunyi padahal tidak ada api.

**Salah negatif** (false negative) berarti model bilang "tidak" padahal sebenarnya "ya". Contohnya alarm diam padahal ada api. Dalam banyak kasus, kesalahan jenis ini jauh lebih berbahaya.

#### Akurasi, Precision, dan Recall

**Akurasi** adalah persentase tebakan yang benar dari seluruh data. Sederhana, tapi bisa sangat menipu.

Contohnya: kalau hanya 1 dari 100 transaksi adalah penipuan, model yang selalu menjawab "bukan penipuan" mencapai akurasi 99 persen padahal tidak berguna sama sekali. Karena itu akurasi jangan dipakai sendirian saat jumlah kelasnya timpang.

**Precision** menjawab: dari semua yang ditebak positif, berapa persen yang benar-benar positif? Ukuran ini penting saat salah positif itu mahal, misalnya salah menuduh nasabah jujur sebagai penipu.

**Recall** menjawab: dari semua yang sebenarnya positif, berapa persen yang berhasil ditemukan? Ukuran ini penting saat salah negatif itu berbahaya, misalnya gagal mendeteksi penyakit.

**F1-score** adalah gabungan seimbang antara precision dan recall, dipakai saat keduanya sama pentingnya.

#### Contoh Kode

```python
from sklearn.metrics import confusion_matrix, classification_report

prediksi = rf.predict(X_test)

print("Confusion matrix:")
print(confusion_matrix(y_test, prediksi))
print()
print(classification_report(y_test, prediksi, digits=3))
```

### Ukuran untuk Regresi

**MAE** (Mean Absolute Error) adalah rata-rata selisih antara tebakan dan kenyataan. Satuannya sama dengan target, jadi paling mudah dipahami. MAE sebesar 50 juta pada prediksi harga rumah berarti rata-rata meleset 50 juta rupiah.

**RMSE** (Root Mean Squared Error) mirip MAE tapi memberi hukuman lebih besar untuk kesalahan yang jauh. Pakai ini kalau kesalahan besar jauh lebih merugikan daripada beberapa kesalahan kecil.

**R2** menunjukkan berapa persen variasi data yang berhasil dijelaskan model, dengan nilai maksimal 1. Nilai 0 berarti model tidak lebih baik daripada sekadar menebak rata-rata.

```python
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

pred = ridge.predict(Xr_test)
print("MAE :", round(mean_absolute_error(yr_test, pred), 2))
print("RMSE:", round(np.sqrt(mean_squared_error(yr_test, pred)), 2))
print("R2  :", round(r2_score(yr_test, pred), 3))
```

### Validasi Silang

#### Masalah yang Diselesaikan

Membagi data satu kali menjadi latih dan uji punya kelemahan: hasilnya bisa berbeda-beda tergantung pembagian mana yang kebetulan terpilih. Bisa saja Anda beruntung mendapat pembagian yang mudah.

#### Solusinya

Validasi silang membagi data menjadi beberapa bagian, misalnya 5. Model dilatih 5 kali, tiap kali memakai 4 bagian untuk latihan dan 1 bagian berbeda untuk pengujian. Hasil akhirnya adalah rata-rata dari 5 percobaan itu, jauh lebih dapat dipercaya.

#### Contoh Kode

```python
from sklearn.model_selection import cross_val_score, StratifiedKFold

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)

for nama, model in [("Logistic Regression", logreg),
                    ("Random Forest", rf),
                    ("SVM", svm)]:
    skor = cross_val_score(model, X_clf, y_clf, cv=cv, scoring="f1")
    print(f"{nama:22s} F1 = {skor.mean():.3f} (naik-turun {skor.std():.3f})")
```

Angka "naik-turun" adalah standar deviasi. Nilai yang besar berarti performa model tidak stabil dan sangat bergantung pada data mana yang kebetulan dipakai.

## Panduan Memilih Algoritma

### Alur Bertanya untuk Pemula

**Langkah 1.** Apakah data Anda punya kolom jawaban? Kalau tidak ada, langsung ke bagian clustering (K-Means atau DBSCAN).

**Langkah 2.** Kalau ada, apakah jawabannya berupa angka atau kategori? Angka berarti regresi, kategori berarti klasifikasi.

**Langkah 3.** Mulai dari model paling sederhana. Regresi Linear untuk angka, Regresi Logistik untuk kategori. Catat skornya sebagai patokan.

**Langkah 4.** Coba Random Forest. Kalau hasilnya jauh lebih baik, berarti data Anda punya pola yang berliku dan model sederhana tidak cukup.

**Langkah 5.** Kalau ingin lebih baik lagi, coba Gradient Boosting sambil menyetel pengaturannya.

**Langkah 6.** Berhenti saat peningkatannya sudah tidak berarti dibanding tambahan kerumitannya.

### Tabel Ringkas

| Situasi Anda | Coba Algoritma Ini | Hindari |
|---|---|---|
| Baru mulai, data berbentuk tabel | Random Forest | SVM, KNN |
| Perlu menjelaskan alasan keputusan | Decision Tree, Regresi Logistik | Gradient Boosting, SVM |
| Data teks | Naive Bayes, Regresi Logistik | KNN, Random Forest |
| Kolom banyak, baris sedikit | Regresi Logistik, Lasso, SVM | KNN, Decision Tree dalam |
| Ingin akurasi tertinggi | Gradient Boosting | Model linear sederhana |
| Data sangat besar | Regresi Logistik, Gradient Boosting | SVM, KNN |
| Salah satu kelas sangat sedikit | Model dengan `class_weight="balanced"` | Mengukur dengan akurasi saja |
| Tidak ada kolom jawaban, bentuk bulat | K-Means | DBSCAN |
| Tidak ada kolom jawaban, bentuk aneh | DBSCAN | K-Means |
| Kolom terlalu banyak | PCA lalu model apa pun | Langsung pakai KNN |

## Kesalahan Pemula yang Sering Terjadi

### Menskalakan Data Sebelum Membaginya

Kalau `StandardScaler` dijalankan pada seluruh data lalu baru dibagi, informasi dari data uji ikut masuk ke perhitungan. Skornya jadi bagus palsu. Selalu bungkus dalam `Pipeline`.

### Mengukur Model dengan Data Latih

Skor di data latih hampir selalu lebih tinggi dan tidak mencerminkan performa sebenarnya. Yang dilaporkan harus selalu skor di data uji.

### Hanya Melihat Akurasi

Terutama saat jumlah kelas timpang, akurasi bisa sangat menipu. Selalu lihat juga confusion matrix, precision, dan recall.

### Menyetel Pengaturan Sambil Melihat Data Uji

Kalau Anda mencoba banyak pengaturan lalu memilih yang skor data ujinya paling tinggi, data uji itu sudah tidak jujur lagi. Pakai validasi silang di dalam data latih untuk memilih, dan sentuh data uji hanya sekali di akhir.

### Langsung Memakai Model Rumit

Tanpa membandingkan dengan model sederhana, Anda tidak akan tahu apakah kerumitan itu benar-benar berguna. Selalu buat patokan sederhana lebih dulu.

### Lupa Menetapkan random_state

Tanpa `random_state`, hasil akan berbeda tiap kali dijalankan dan Anda tidak bisa membandingkan dua percobaan secara adil.

### Memasukkan Kolom ID ke Model

Kolom seperti nomor pelanggan atau nomor urut tidak punya makna prediktif, tapi model bisa saja menghafalnya. Buang kolom semacam ini sebelum melatih.

## Langkah Selanjutnya

Setelah memahami artikel ini, urutan belajar yang masuk akal adalah:

1. Jalankan sendiri semua kode di sini dan ubah-ubah angkanya untuk melihat efeknya.
2. Pelajari preprocessing secara lebih dalam, karena kualitas persiapan data lebih menentukan hasil daripada pemilihan algoritma.
3. Pelajari cara menyetel pengaturan model secara sistematis dengan `GridSearchCV` dan `RandomizedSearchCV`.
4. Coba pada data nyata Anda sendiri, bukan hanya dataset bawaan.

## Penutup

Tidak ada satu algoritma yang terbaik untuk semua situasi. Yang membedakan praktisi berpengalaman bukan hafalan nama algoritma, melainkan kemampuan membaca karakteristik data dan memperkirakan pendekatan mana yang masuk akal.

Untuk memulai, ingat tiga hal saja. Selalu mulai dari model sederhana sebagai patokan. Selalu ukur performa di data yang belum pernah dilihat model. Dan selalu bungkus persiapan data bersama model dalam satu `Pipeline`, supaya hasil yang Anda lihat benar-benar bisa dipercaya.
