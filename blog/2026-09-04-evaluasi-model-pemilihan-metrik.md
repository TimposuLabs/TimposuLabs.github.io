---
slug: evaluasi-model-pemilihan-metrik-machine-learning
title: "Evaluasi Model dan Pemilihan Metrik: Panduan Machine Learning untuk Pemula"
authors: topekox
tags: [manchine learning, data mining, ai, data science, python]
---

Setelah model selesai dilatih, muncul pertanyaan yang kelihatannya sederhana: modelnya bagus atau tidak? Jawabannya ternyata tidak sesederhana melihat satu angka.

Model dengan akurasi 99 persen bisa jadi sama sekali tidak berguna. Model dengan akurasi 70 persen bisa jadi sangat berharga. Semuanya tergantung masalah apa yang sedang diselesaikan dan kesalahan jenis apa yang paling merugikan.

Artikel ini membahas cara mengukur performa model dengan benar. Fokusnya bukan menghafal rumus, tapi memahami kapan memakai ukuran yang mana dan kenapa.

<!-- truncate -->

## Daftar Isi

1. Kenapa Memilih Metrik Itu Penting
2. Istilah Dasar yang Perlu Dipahami
3. Menyiapkan Data dan Model Contoh
4. Confusion Matrix: Fondasi Semua Metrik Klasifikasi
5. Metrik Klasifikasi Satu per Satu
6. Probabilitas dan Ambang Keputusan
7. ROC-AUC dan PR-AUC
8. Metrik untuk Regresi
9. Cara Mengukur yang Benar
10. Panduan Memilih Metrik
11. Kesalahan Pemula yang Sering Terjadi

## Kenapa Memilih Metrik Itu Penting

### Analogi Sederhana

Bayangkan Anda menilai keberhasilan sebuah restoran. Kalau ukurannya jumlah pengunjung, restoran yang menjual makanan murah tapi tidak enak bisa menang. Kalau ukurannya keuntungan, restoran mahal dengan sedikit pelanggan bisa menang. Kalau ukurannya kepuasan pelanggan, hasilnya bisa berbeda lagi.

Tidak ada ukuran yang salah. Yang salah adalah memakai ukuran yang tidak sesuai dengan tujuan sebenarnya.

Begitu juga dengan model machine learning. Memilih metrik yang keliru berarti Anda mengoptimalkan hal yang salah selama berminggu-minggu tanpa sadar.

### Cerita Kasus: Akurasi 99 Persen yang Tidak Berguna

Sebuah bank ingin mendeteksi transaksi penipuan. Dari 10.000 transaksi, hanya 100 yang merupakan penipuan, yaitu 1 persen.

Seorang pemula membuat model dan hasilnya akurasi 99 persen. Terdengar luar biasa.

Padahal model itu ternyata menjawab "bukan penipuan" untuk semua transaksi tanpa kecuali. Karena 99 persen transaksi memang bukan penipuan, tebakan malas itu otomatis benar 99 persen.

Model tersebut tidak pernah berhasil menemukan satu pun penipuan. Nilainya nol bagi bank, tapi angkanya terlihat hebat.

Inilah kenapa memahami metrik jauh lebih penting daripada mengejar angka yang tinggi.

### Pertanyaan yang Harus Dijawab Sebelum Memilih Metrik

Sebelum menulis kode evaluasi, jawab dulu tiga pertanyaan ini.

**Apa yang sedang diprediksi?** Kategori atau angka. Ini menentukan kelompok metrik mana yang dipakai.

**Apakah jumlah tiap kelas seimbang?** Kalau satu kelas jauh lebih sedikit, akurasi langsung tidak layak dipakai.

**Kesalahan mana yang lebih merugikan?** Salah menuduh orang yang tidak bersalah, atau melewatkan orang yang benar-benar bersalah? Jawaban ini yang paling menentukan.

## Istilah Dasar yang Perlu Dipahami

### Kelas Positif dan Negatif

Dalam klasifikasi dua kelas, salah satu kelas disebut **positif** dan lainnya **negatif**.

Istilah ini sering membingungkan pemula karena terdengar seperti "baik" dan "buruk". Padahal maksudnya bukan itu. Kelas positif adalah kelas yang ingin kita deteksi atau temukan, meskipun isinya hal buruk.

Contohnya, dalam deteksi penipuan, "penipuan" adalah kelas positif. Dalam deteksi penyakit, "sakit" adalah kelas positif.

Dalam kode, kelas positif biasanya diberi angka 1 dan kelas negatif angka 0.

### Data Seimbang dan Tidak Seimbang

**Data seimbang** artinya jumlah tiap kelas kira-kira sama, misalnya 50 banding 50.

**Data tidak seimbang** artinya satu kelas jauh lebih sedikit, misalnya 1 banding 99. Ini kondisi yang sangat umum di dunia nyata: penipuan jarang, penyakit langka jarang, mesin rusak jarang.

Sebagian besar jebakan dalam evaluasi model muncul dari data tidak seimbang.

### Probabilitas dan Ambang

Model klasifikasi sebenarnya tidak langsung menjawab "ya" atau "tidak". Yang dihasilkan adalah angka kepercayaan antara 0 dan 1, misalnya 0,73.

**Ambang** atau *threshold* adalah batas yang menentukan angka berapa yang dianggap "ya". Secara bawaan ambangnya 0,5, tapi angka ini bisa dan sering perlu diubah. Bagian tersendiri di artikel ini membahasnya.

## Menyiapkan Data dan Model Contoh

Kita akan memakai dua dataset: satu yang cukup seimbang, dan satu yang sengaja dibuat sangat timpang supaya jebakan akurasi terlihat jelas.

```python
import numpy as np
import pandas as pd
from sklearn.datasets import load_breast_cancer, make_classification
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

RANDOM_STATE = 42

# Dataset 1: deteksi tumor, cukup seimbang
data = load_breast_cancer(as_frame=True)
X, y = data.data, data.target        # 1 = jinak, 0 = ganas

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, stratify=y, random_state=RANDOM_STATE
)

model = Pipeline([
    ("skala", StandardScaler()),
    ("model", LogisticRegression(max_iter=5000, random_state=RANDOM_STATE)),
])
model.fit(X_train, y_train)

# Dataset 2: sengaja timpang, 2 persen kelas positif
Xt, yt = make_classification(
    n_samples=10_000, n_features=20, n_informative=5,
    weights=[0.98, 0.02],            # hanya 2 persen kelas positif
    random_state=RANDOM_STATE,
)
Xt_train, Xt_test, yt_train, yt_test = train_test_split(
    Xt, yt, test_size=0.3, stratify=yt, random_state=RANDOM_STATE
)

print("Sebaran kelas dataset timpang:", np.bincount(yt))
```

## Confusion Matrix: Fondasi Semua Metrik Klasifikasi

### Apa Itu Confusion Matrix

Ini tabel kecil yang memecah hasil prediksi menjadi empat kategori. Hampir semua metrik klasifikasi dihitung dari keempat angka ini, jadi memahaminya sekali akan membuat sisanya jauh lebih mudah.

|  | Model bilang: Negatif | Model bilang: Positif |
|---|---|---|
| **Kenyataannya Negatif** | Benar Negatif (TN) | Salah Positif (FP) |
| **Kenyataannya Positif** | Salah Negatif (FN) | Benar Positif (TP) |

### Memahami Keempatnya dengan Analogi Alarm Kebakaran

**Benar Positif (True Positive).** Ada api, alarm berbunyi. Model benar.

**Benar Negatif (True Negative).** Tidak ada api, alarm diam. Model benar.

**Salah Positif (False Positive).** Tidak ada api, tapi alarm berbunyi. Ini alarm palsu. Merepotkan, semua orang keluar gedung tanpa perlu, tapi tidak ada yang celaka.

**Salah Negatif (False Negative).** Ada api, tapi alarm diam. Ini yang berbahaya. Bisa berakibat fatal.

Perhatikan bahwa dua jenis kesalahan itu tidak setara. Alarm palsu itu mengganggu, alarm yang gagal berbunyi itu mematikan. Ketidaksetaraan inilah yang membuat kita tidak bisa asal memakai akurasi.

### Cara Mengingatnya

Kata pertama menjawab: **apakah model benar?** Kata kedua menjawab: **apa yang dikatakan model?**

Jadi "Salah Positif" artinya model mengatakan positif, dan model salah.

### Contoh Kode

```python
from sklearn.metrics import confusion_matrix

prediksi = model.predict(X_test)
cm = confusion_matrix(y_test, prediksi)

print(cm)
# Susunan: [[TN, FP],
#           [FN, TP]]

tn, fp, fn, tp = cm.ravel()
print(f"Benar Negatif  (TN): {tn}")
print(f"Salah Positif  (FP): {fp}  <- alarm palsu")
print(f"Salah Negatif  (FN): {fn}  <- gagal terdeteksi")
print(f"Benar Positif  (TP): {tp}")
```

### Menampilkan dalam Bentuk Gambar

```python
import matplotlib.pyplot as plt
from sklearn.metrics import ConfusionMatrixDisplay

ConfusionMatrixDisplay.from_estimator(
    model, X_test, y_test,
    display_labels=["Ganas", "Jinak"],
    cmap="Blues",
)
plt.title("Confusion Matrix")
plt.show()
```

Biasakan selalu melihat confusion matrix sebelum melihat metrik apa pun. Satu tabel ini menceritakan lebih banyak daripada deretan angka persentase.

## Metrik Klasifikasi Satu per Satu

### Akurasi

#### Apa yang Diukur

Persentase tebakan yang benar dari seluruh data.

```
Akurasi = (TP + TN) / semua data
```

#### Analogi

Seperti nilai ujian pilihan ganda: berapa soal yang benar dari total soal.

#### Kapan Layak Dipakai

Hanya ketika dua syarat terpenuhi sekaligus: jumlah kelasnya kira-kira seimbang, **dan** kedua jenis kesalahan sama merugikannya.

#### Kapan Menipu

Saat data timpang. Mari buktikan langsung dengan dataset kedua tadi.

```python
from sklearn.dummy import DummyClassifier
from sklearn.metrics import accuracy_score, recall_score

# Model malas: selalu menebak kelas terbanyak
malas = DummyClassifier(strategy="most_frequent")
malas.fit(Xt_train, yt_train)
tebakan_malas = malas.predict(Xt_test)

print("Akurasi model malas:", round(accuracy_score(yt_test, tebakan_malas), 4))
print("Recall model malas :", round(recall_score(yt_test, tebakan_malas), 4))
```

Hasilnya akurasi sekitar 0,98 tapi recall 0,00. Model yang tidak pernah menemukan satu pun kasus positif mencatat akurasi 98 persen.

Ini bukti kenapa akurasi tidak boleh dipakai sendirian.

### Precision

#### Apa yang Diukur

Dari semua yang ditebak positif oleh model, berapa persen yang benar-benar positif?

```
Precision = TP / (TP + FP)
```

#### Analogi

Bayangkan polisi menangkap 100 orang sebagai tersangka. Ternyata hanya 70 yang benar-benar bersalah. Precision-nya 70 persen. Artinya 30 orang tidak bersalah ikut ditangkap.

Precision menjawab pertanyaan: **seberapa bisa saya percaya kalau model bilang "ya"?**

#### Kapan Ini yang Paling Penting

Saat salah positif itu mahal atau merugikan.

**Penyaring email spam.** Kalau email penting masuk folder spam, pengguna bisa kehilangan tawaran kerja. Lebih baik beberapa spam lolos daripada satu email penting hilang.

**Rekomendasi produk.** Merekomendasikan barang yang tidak relevan membuat pengguna kehilangan kepercayaan.

**Penindakan otomatis.** Memblokir akun pengguna yang sebenarnya tidak bersalah menimbulkan komplain dan kerugian reputasi.

### Recall

#### Apa yang Diukur

Dari semua yang sebenarnya positif, berapa persen yang berhasil ditemukan model?

```
Recall = TP / (TP + FN)
```

#### Analogi

Di sebuah kota ada 100 penjahat. Polisi berhasil menangkap 60 di antaranya. Recall-nya 60 persen. Artinya 40 penjahat masih berkeliaran.

Recall menjawab pertanyaan: **berapa banyak kasus yang lolos dari perhatian model?**

Nama lain recall adalah *sensitivity* atau *true positive rate*.

#### Kapan Ini yang Paling Penting

Saat salah negatif itu berbahaya atau mahal.

**Skrining penyakit.** Melewatkan pasien yang benar-benar sakit jauh lebih berbahaya daripada memeriksa ulang orang sehat.

**Deteksi penipuan.** Satu transaksi penipuan yang lolos bisa merugikan jauh lebih besar daripada beberapa transaksi wajar yang diperiksa manual.

**Deteksi kerusakan mesin.** Melewatkan tanda kerusakan bisa berujung kecelakaan.

### Kenapa Precision dan Recall Saling Bertolak Belakang

#### Analogi Jaring Ikan

Bayangkan menangkap ikan dengan jaring.

Kalau lubang jaringnya besar, hanya ikan besar yang tertangkap. Hampir semua yang Anda dapat memang ikan yang diincar, jadi precision tinggi. Tapi banyak ikan kecil lolos, jadi recall rendah.

Kalau lubang jaringnya sangat kecil, hampir semua ikan tertangkap sehingga recall tinggi. Tapi sampah, plastik, dan rumput laut ikut terbawa, jadi precision rendah.

Tidak ada jaring yang sempurna di kedua sisi. Anda harus memilih mana yang lebih penting untuk kebutuhan Anda.

#### Cara Menggeser Keseimbangannya

Menaikkan salah satu hampir selalu menurunkan yang lain. Pergeseran itu diatur lewat ambang keputusan, yang dibahas di bagian berikutnya.

### F1-Score

#### Apa yang Diukur

Gabungan antara precision dan recall dalam satu angka.

```
F1 = 2 × (Precision × Recall) / (Precision + Recall)
```

#### Kenapa Bukan Rata-rata Biasa

Ini pertanyaan bagus. Rumus di atas adalah rata-rata harmonik, bukan rata-rata biasa.

Bedanya, rata-rata harmonik menghukum ketimpangan. Kalau precision 1,0 dan recall 0,0, rata-rata biasa menghasilkan 0,5 yang terkesan lumayan. Padahal model itu sebenarnya rusak. Rata-rata harmonik menghasilkan 0,0, yang jauh lebih jujur.

Jadi F1 hanya tinggi kalau precision **dan** recall sama-sama tinggi.

#### Kapan Dipakai

Saat precision dan recall sama pentingnya, dan Anda butuh satu angka untuk membandingkan beberapa model.

Ini metrik default yang baik untuk data tidak seimbang, menggantikan akurasi.

### F-beta: Kalau Salah Satu Lebih Penting

#### Cara Kerjanya

F1 memberi bobot sama pada precision dan recall. Kalau Anda ingin salah satunya lebih diprioritaskan, pakai F-beta.

Nilai `beta` lebih dari 1 memberi bobot lebih pada recall. Nilai kurang dari 1 memberi bobot lebih pada precision.

```python
from sklearn.metrics import fbeta_score

prediksi = model.predict(X_test)

print("F1   :", round(fbeta_score(y_test, prediksi, beta=1), 4))
print("F2   :", round(fbeta_score(y_test, prediksi, beta=2), 4))   # recall 2x lebih penting
print("F0.5 :", round(fbeta_score(y_test, prediksi, beta=0.5), 4)) # precision lebih penting
```

Untuk skrining penyakit, F2 lebih masuk akal. Untuk penyaring spam, F0.5 lebih masuk akal.

### Melihat Semuanya Sekaligus

```python
from sklearn.metrics import classification_report

print(classification_report(
    y_test, prediksi,
    target_names=["Ganas", "Jinak"],
    digits=3,
))
```

Cara membaca keluarannya:

Tiap baris menunjukkan metrik untuk satu kelas. Kolom `support` menunjukkan berapa banyak data asli yang ada di kelas itu. Kalau `support` sangat kecil, angka metriknya jadi tidak stabil dan tidak bisa terlalu dipercaya.

### Kalau Kelasnya Lebih dari Dua

Untuk klasifikasi multikelas, ada tiga cara merangkum metrik dari semua kelas.

**Macro average.** Hitung metrik tiap kelas lalu ambil rata-rata biasa. Semua kelas dianggap sama penting, tidak peduli jumlah datanya. Pakai ini kalau kelas kecil sama pentingnya dengan kelas besar.

**Weighted average.** Sama seperti macro, tapi tiap kelas ditimbang sesuai jumlah datanya. Kelas besar lebih berpengaruh pada hasil akhir.

**Micro average.** Semua prediksi digabung dulu baru dihitung. Untuk klasifikasi satu label, hasilnya sama dengan akurasi.

```python
from sklearn.metrics import f1_score

print("Macro   :", round(f1_score(y_test, prediksi, average="macro"), 4))
print("Weighted:", round(f1_score(y_test, prediksi, average="weighted"), 4))
```

Untuk data tidak seimbang, macro average biasanya lebih jujur karena tidak menyembunyikan performa buruk di kelas minoritas.

## Probabilitas dan Ambang Keputusan

### Model Sebenarnya Menghasilkan Angka, Bukan Keputusan

Ini konsep yang sering terlewat oleh pemula, padahal sangat berguna.

Ketika Anda memanggil `predict()`, model sebenarnya menghitung probabilitas lebih dulu, lalu membandingkannya dengan ambang 0,5.

```python
probabilitas = model.predict_proba(X_test)[:, 1]   # probabilitas kelas positif
keputusan = model.predict(X_test)

for i in range(5):
    print(f"Probabilitas: {probabilitas[i]:.4f} -> Keputusan: {keputusan[i]}")
```

Angka 0,5 itu hanya bawaan, bukan angka keramat. Anda boleh mengubahnya.

### Kenapa Mengubah Ambang Itu Berguna

Bayangkan model memberi probabilitas 0,45 untuk sebuah transaksi mencurigakan. Dengan ambang 0,5, transaksi itu dinyatakan aman dan lolos.

Padahal 0,45 cukup mencurigakan. Kalau ambangnya diturunkan ke 0,3, transaksi itu akan ditandai untuk diperiksa.

Menurunkan ambang membuat model lebih mudah menyatakan positif, sehingga recall naik dan precision turun. Menaikkan ambang efeknya kebalikan.

Yang menarik, ini tidak memerlukan pelatihan ulang sama sekali. Modelnya sama persis, cuma cara membaca hasilnya yang berubah.

### Melihat Efek Perubahan Ambang

```python
from sklearn.metrics import precision_score, recall_score, f1_score

prob_timpang = LogisticRegression(max_iter=5000).fit(Xt_train, yt_train)
p = prob_timpang.predict_proba(Xt_test)[:, 1]

print(f"{'Ambang':>8} {'Precision':>10} {'Recall':>8} {'F1':>8}")
for ambang in [0.1, 0.2, 0.3, 0.5, 0.7, 0.9]:
    tebak = (p >= ambang).astype(int)
    print(f"{ambang:>8.2f} {precision_score(yt_test, tebak, zero_division=0):>10.3f} "
          f"{recall_score(yt_test, tebak):>8.3f} {f1_score(yt_test, tebak):>8.3f}")
```

Jalankan kode ini dan perhatikan polanya. Saat ambang turun, recall naik dan precision turun. Itulah trade-off jaring ikan tadi, terlihat dalam angka.

### Memilih Ambang Berdasarkan Kebutuhan

Misalnya kebijakan rumah sakit menuntut recall minimal 90 persen, artinya tidak boleh melewatkan lebih dari 10 persen pasien yang sakit. Kita bisa mencari ambang terbaik yang memenuhi syarat itu.

```python
from sklearn.metrics import precision_recall_curve

precision, recall, ambang = precision_recall_curve(yt_test, p)

target_recall = 0.90
memenuhi = np.where(recall[:-1] >= target_recall)[0]
terpilih = memenuhi[-1]      # ambang tertinggi yang masih memenuhi syarat

print(f"Ambang terpilih : {ambang[terpilih]:.4f}")
print(f"Recall  : {recall[terpilih]:.4f}")
print(f"Precision: {precision[terpilih]:.4f}")
```

#### Catatan Penting

Ambang harus dipilih memakai data validasi yang terpisah, bukan data uji akhir. Kalau Anda mencoba-coba ambang di data uji lalu memilih yang hasilnya paling bagus, data uji itu sudah tidak jujur lagi.

## ROC-AUC dan PR-AUC

### Kenapa Perlu Metrik Berbasis Kurva

Semua metrik sebelumnya dihitung pada satu ambang tertentu. Kalau ambangnya berubah, angkanya berubah.

ROC-AUC dan PR-AUC berbeda. Keduanya merangkum performa model di **semua kemungkinan ambang** sekaligus. Jadi keduanya mengukur kualitas dasar model, bukan kualitas satu pengaturan tertentu.

### Kurva ROC dan Nilai AUC

#### Apa yang Digambarkan

Kurva ROC menggambarkan hubungan antara dua hal saat ambang digeser dari tinggi ke rendah:

- Sumbu tegak: berapa persen kasus positif yang berhasil ditangkap (recall).
- Sumbu mendatar: berapa persen kasus negatif yang salah ditandai sebagai positif.

**AUC** adalah luas area di bawah kurva itu. Nilainya antara 0 dan 1.

#### Cara Menafsirkan Nilainya

Ada cara membaca AUC yang sangat intuitif. Ambil satu data positif dan satu data negatif secara acak. AUC adalah peluang model memberi skor lebih tinggi pada yang positif.

- AUC = 1,0 berarti sempurna, model selalu benar mengurutkan.
- AUC = 0,5 berarti model tidak lebih baik daripada melempar koin.
- AUC di bawah 0,5 berarti ada yang terbalik, kemungkinan label positif dan negatifnya tertukar.

Panduan kasar: di atas 0,9 sangat baik, 0,8 sampai 0,9 baik, 0,7 sampai 0,8 lumayan, di bawah 0,6 kurang berguna.

#### Contoh Kode

```python
from sklearn.metrics import roc_auc_score, RocCurveDisplay

print("ROC-AUC:", round(roc_auc_score(y_test, probabilitas), 4))

RocCurveDisplay.from_estimator(model, X_test, y_test)
plt.plot([0, 1], [0, 1], "k--", label="Tebakan acak")
plt.legend()
plt.show()
```

Garis putus-putus diagonal adalah patokan tebakan acak. Kurva model yang baik harus melengkung jauh di atas garis itu.

### Kurva Precision-Recall dan Nilai PR-AUC

#### Apa yang Digambarkan

Kurva PR menggambarkan hubungan antara precision dan recall saat ambang digeser. Luas di bawahnya disebut PR-AUC, atau dalam scikit-learn dihitung dengan `average_precision_score`.

#### Bedanya dengan ROC

Kurva ROC memperhitungkan benar negatif, yaitu kasus negatif yang berhasil ditolak model. Kurva PR sama sekali tidak melihat itu, dan hanya fokus pada seberapa baik model menangani kelas positif.

Perbedaan ini terdengar teknis, tapi akibatnya besar pada data timpang.

### Kapan ROC-AUC Menipu

#### Masalahnya

Kalau kelas negatif jumlahnya sangat banyak, jumlah benar negatif juga sangat besar. Angka besar ini membuat proporsi salah positif terlihat kecil, sehingga kurva ROC tetap terlihat bagus meski model sebenarnya buruk dalam menemukan kasus positif.

#### Bukti Langsung

Mari bandingkan kedua metrik pada dataset timpang dengan 2 persen kelas positif.

```python
from sklearn.metrics import roc_auc_score, average_precision_score

model_timpang = Pipeline([
    ("skala", StandardScaler()),
    ("model", LogisticRegression(max_iter=5000, random_state=RANDOM_STATE)),
])
model_timpang.fit(Xt_train, yt_train)
prob = model_timpang.predict_proba(Xt_test)[:, 1]

print("Proporsi kelas positif:", round(yt_test.mean(), 4))
print("ROC-AUC:", round(roc_auc_score(yt_test, prob), 4))
print("PR-AUC :", round(average_precision_score(yt_test, prob), 4))
```

Anda akan melihat ROC-AUC jauh lebih tinggi daripada PR-AUC. Kedua angka itu benar secara perhitungan, tapi PR-AUC lebih mencerminkan seberapa berguna model ini bagi pengguna yang peduli pada kelas positif.

#### Patokan Membaca PR-AUC

Berbeda dari ROC-AUC yang patokan acaknya selalu 0,5, patokan acak untuk PR-AUC adalah proporsi kelas positif itu sendiri.

Jadi kalau kelas positif ada 2 persen, tebakan acak menghasilkan PR-AUC sekitar 0,02. Model dengan PR-AUC 0,40 berarti 20 kali lebih baik daripada acak, meskipun angka 0,40 terdengar rendah.

### Aturan Praktis Memilih

**Pakai ROC-AUC** kalau kelasnya kira-kira seimbang, atau kalau performa pada kedua kelas sama pentingnya.

**Pakai PR-AUC** kalau kelas positif jarang dan itulah yang ingin Anda temukan. Ini kasus untuk deteksi penipuan, penyakit langka, dan deteksi kerusakan.

Kalau ragu pada data timpang, laporkan keduanya tapi ambil keputusan berdasarkan PR-AUC.

## Metrik untuk Regresi

Bagian ini berlaku saat yang diprediksi berupa angka, bukan kategori. Misalnya harga rumah, jumlah penjualan, atau lama pengiriman.

### Menyiapkan Contoh

```python
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LinearRegression

dr = load_diabetes(as_frame=True)
Xr_train, Xr_test, yr_train, yr_test = train_test_split(
    dr.data, dr.target, test_size=0.3, random_state=RANDOM_STATE
)

reg = LinearRegression().fit(Xr_train, yr_train)
pred = reg.predict(Xr_test)
```

### MAE (Mean Absolute Error)

#### Apa yang Diukur

Rata-rata selisih antara tebakan dan kenyataan, tanpa peduli arahnya.

#### Kenapa Paling Mudah Dipahami

Satuannya sama dengan target yang diprediksi. Kalau memprediksi harga rumah dalam rupiah dan MAE-nya 50 juta, artinya rata-rata tebakan model meleset 50 juta rupiah. Ini bisa langsung dijelaskan ke siapa pun tanpa penjelasan tambahan.

#### Kapan Dipakai

Saat semua kesalahan dianggap sama merugikan, dan saat data mengandung nilai ekstrem yang tidak ingin terlalu mempengaruhi hasil pengukuran.

### MSE dan RMSE

#### Apa yang Diukur

MSE adalah rata-rata dari kuadrat kesalahan. Karena dikuadratkan, satuannya jadi aneh, misalnya "rupiah kuadrat", sehingga sulit dijelaskan.

RMSE adalah akar dari MSE, yang mengembalikan satuannya jadi normal lagi. Karena itu RMSE lebih sering dipakai dalam laporan.

#### Bedanya dengan MAE

Karena kesalahan dikuadratkan lebih dulu, kesalahan besar dihukum jauh lebih berat.

Contohnya, meleset 10 satuan sebanyak sepuluh kali menghasilkan MAE yang sama dengan meleset 100 satuan sebanyak satu kali. Tapi RMSE untuk kasus kedua jauh lebih besar.

#### Kapan Memilih Mana

**Pakai MAE** kalau kesalahan besar dan kecil sama merugikannya. Contohnya memprediksi waktu tempuh perjalanan.

**Pakai RMSE** kalau kesalahan besar jauh lebih merugikan daripada beberapa kesalahan kecil. Contohnya memprediksi kebutuhan stok obat, karena kekurangan besar sekali jauh lebih berbahaya daripada kekurangan sedikit berkali-kali.

Cara cepat mendiagnosis: kalau RMSE jauh lebih besar daripada MAE, berarti ada beberapa prediksi yang melesetnya sangat jauh. Itu petunjuk untuk memeriksa apakah ada outlier.

### R² (R-squared)

#### Apa yang Diukur

Berapa persen variasi dalam data yang berhasil dijelaskan model. Nilai maksimalnya 1.

#### Cara Menafsirkan

- R² = 1 berarti prediksi sempurna.
- R² = 0 berarti model tidak lebih baik daripada sekadar menebak nilai rata-rata terus-menerus.
- R² negatif berarti model lebih buruk daripada menebak rata-rata. Ini bukan kesalahan hitung, dan memang bisa terjadi kalau modelnya buruk.

#### Kelebihan dan Kekurangan

Kelebihannya, R² tidak punya satuan sehingga bisa dibandingkan antar masalah yang berbeda.

Kekurangannya, justru karena tidak punya satuan, R² tidak memberi tahu seberapa besar kesalahannya dalam ukuran nyata. R² sebesar 0,85 terdengar bagus, tapi kalau MAE-nya 200 juta rupiah untuk prediksi harga rumah seharga 500 juta, model itu tetap tidak layak dipakai.

Karena itu selalu laporkan R² bersama MAE atau RMSE, jangan sendirian.

### Contoh Kode Lengkap

```python
from sklearn.metrics import (mean_absolute_error, mean_squared_error,
                            r2_score, mean_absolute_percentage_error)

mae = mean_absolute_error(yr_test, pred)
rmse = np.sqrt(mean_squared_error(yr_test, pred))
r2 = r2_score(yr_test, pred)
mape = mean_absolute_percentage_error(yr_test, pred)

print(f"MAE  : {mae:.2f}   (rata-rata meleset segini)")
print(f"RMSE : {rmse:.2f}   (kesalahan besar dihukum lebih berat)")
print(f"R2   : {r2:.4f}   (0 sampai 1, makin tinggi makin baik)")
print(f"MAPE : {mape:.2%}   (rata-rata meleset berapa persen)")
print(f"\nRasio RMSE/MAE: {rmse/mae:.2f}  (jauh di atas 1 berarti ada outlier)")
```

### MAPE dan Kapan Jangan Dipakai

MAPE mengukur kesalahan dalam bentuk persentase, sehingga mudah dijelaskan ke orang non-teknis.

Tapi ada dua jebakan. Pertama, MAPE tidak bisa dihitung kalau ada nilai sebenarnya yang nol, karena akan terjadi pembagian dengan nol. Kedua, MAPE menghukum tebakan yang terlalu tinggi lebih berat daripada yang terlalu rendah, sehingga bisa mendorong model jadi cenderung menebak rendah.

### Jangan Lupa Melihat Residual

Angka metrik saja bisa menyembunyikan pola kesalahan. Menggambar selisih antara prediksi dan kenyataan sering mengungkap masalah yang tidak terlihat dari angka.

```python
residu = yr_test - pred

plt.figure(figsize=(10, 4))
plt.subplot(1, 2, 1)
plt.scatter(pred, residu, alpha=0.5)
plt.axhline(0, color="red", linestyle="--")
plt.xlabel("Nilai prediksi")
plt.ylabel("Selisih (kenyataan - prediksi)")
plt.title("Sebaran kesalahan")

plt.subplot(1, 2, 2)
plt.hist(residu, bins=30)
plt.title("Bentuk sebaran kesalahan")
plt.tight_layout()
plt.show()
```

Yang diharapkan adalah titik-titik tersebar acak di sekitar garis nol. Kalau berbentuk melengkung, berarti ada pola yang belum tertangkap model. Kalau sebarannya makin melebar ke kanan, berarti model kurang akurat untuk nilai yang besar.

## Cara Mengukur yang Benar

Memilih metrik yang tepat tidak ada gunanya kalau cara mengukurnya salah. Tiga hal berikut sama pentingnya.

### Jangan Pernah Mengukur di Data Latih

#### Masalahnya

Skor di data latih hampir selalu lebih tinggi, karena model sudah pernah melihat data itu. Ibarat memberi ujian dengan soal yang persis sama dengan latihannya.

#### Cara Mendeteksi Overfitting

```python
print("Skor di data latih:", round(model.score(X_train, y_train), 4))
print("Skor di data uji  :", round(model.score(X_test, y_test), 4))
```

Kalau selisihnya besar, misalnya 0,99 di latih dan 0,82 di uji, itu tanda overfitting. Model menghafal, bukan belajar.

Kalau keduanya sama-sama rendah, itu underfitting. Model terlalu sederhana.

### Selalu Bandingkan dengan Patokan Sederhana

#### Kenapa Perlu

Angka F1 sebesar 0,75 itu bagus atau tidak? Mustahil dijawab tanpa pembanding.

Buat model paling bodoh yang mungkin, lalu jadikan patokan. Kalau model Anda tidak jauh lebih baik daripada tebakan bodoh, berarti ada yang salah.

#### Contoh Kode

```python
from sklearn.dummy import DummyClassifier, DummyRegressor

# Patokan untuk klasifikasi
patokan = DummyClassifier(strategy="most_frequent", random_state=RANDOM_STATE)
patokan.fit(Xt_train, yt_train)
prob_patokan = patokan.predict_proba(Xt_test)[:, 1]

print("PR-AUC patokan bodoh:", round(average_precision_score(yt_test, prob_patokan), 4))
print("PR-AUC model kita   :", round(average_precision_score(yt_test, prob), 4))

# Patokan untuk regresi
patokan_reg = DummyRegressor(strategy="mean").fit(Xr_train, yr_train)
print("\nMAE patokan bodoh:", round(mean_absolute_error(yr_test, patokan_reg.predict(Xr_test)), 2))
print("MAE model kita   :", round(mae, 2))
```

### Ukur dengan Validasi Silang, Bukan Sekali Bagi

#### Masalahnya

Membagi data satu kali punya unsur keberuntungan. Bisa saja pembagian yang kebetulan Anda dapat itu mudah, sehingga skornya terlalu bagus.

#### Solusinya

Validasi silang membagi data jadi beberapa bagian, melatih model beberapa kali dengan bagian uji yang berbeda-beda, lalu merata-ratakan hasilnya.

#### Contoh Kode

```python
from sklearn.model_selection import cross_validate, StratifiedKFold

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=RANDOM_STATE)

hasil = cross_validate(
    model_timpang, Xt, yt, cv=cv,
    scoring=["recall", "precision", "f1", "roc_auc", "average_precision"],
)

for nama in ["test_recall", "test_precision", "test_f1",
             "test_roc_auc", "test_average_precision"]:
    nilai = hasil[nama]
    print(f"{nama:24s} {nilai.mean():.4f}  (naik-turun {nilai.std():.4f})")
```

Angka "naik-turun" adalah standar deviasi. Kalau nilainya besar, performa model tidak stabil dan sangat bergantung pada data mana yang kebetulan dipakai. Ini juga informasi penting yang tidak akan terlihat kalau hanya membagi sekali.

## Panduan Memilih Metrik

### Alur Bertanya

**Langkah 1.** Apakah yang diprediksi berupa angka? Kalau ya, pakai MAE untuk penjelasan yang mudah, RMSE kalau kesalahan besar lebih berbahaya, dan sertakan R² sebagai pelengkap.

**Langkah 2.** Kalau yang diprediksi kategori, apakah jumlah kelasnya seimbang? Kalau seimbang dan kedua kesalahan sama merugikan, akurasi boleh dipakai.

**Langkah 3.** Kalau tidak seimbang, kesalahan mana yang lebih merugikan? Kalau melewatkan kasus positif lebih berbahaya, utamakan recall. Kalau salah menuduh lebih merugikan, utamakan precision.

**Langkah 4.** Kalau keduanya sama penting, pakai F1. Untuk menilai kualitas dasar model tanpa terikat ambang, pakai PR-AUC.

**Langkah 5.** Apa pun metriknya, selalu lihat confusion matrix dan selalu bandingkan dengan patokan sederhana.

### Tabel Situasi dan Metrik

| Kasus Anda | Metrik utama | Alasannya |
|---|---|---|
| Klasifikasi seimbang, kesalahan setara | Akurasi, F1 | Sederhana dan cukup jujur |
| Deteksi penipuan, kelas positif jarang | Recall, PR-AUC | Melewatkan penipuan sangat mahal |
| Skrining penyakit | Recall, F2 | Melewatkan pasien sakit berbahaya |
| Penyaring spam | Precision | Email penting tidak boleh hilang |
| Rekomendasi produk | Precision | Rekomendasi meleset merusak kepercayaan |
| Membandingkan beberapa model | F1 atau PR-AUC | Satu angka yang ringkas dan adil |
| Menilai kualitas dasar model | ROC-AUC atau PR-AUC | Tidak terikat pada satu ambang |
| Klasifikasi banyak kelas timpang | F1 macro | Kelas kecil tidak tertelan kelas besar |
| Prediksi angka, mudah dijelaskan | MAE | Satuannya sama dengan target |
| Prediksi angka, kesalahan besar fatal | RMSE | Kesalahan besar dihukum berat |
| Melapor ke pihak non-teknis | MAE atau MAPE | Langsung bisa dipahami |

## Kesalahan Pemula yang Sering Terjadi

### Hanya Melihat Akurasi

Kesalahan nomor satu. Pada data timpang, akurasi bisa 99 persen sementara modelnya tidak berguna sama sekali. Selalu lihat juga confusion matrix.

### Tidak Pernah Membuat Patokan Pembanding

Tanpa patokan, Anda tidak punya cara mengetahui apakah angka Anda bagus. Buat `DummyClassifier` di awal proyek dan simpan angkanya.

### Melaporkan Skor dari Data Latih

Angka itu selalu terlalu bagus dan tidak mencerminkan performa sebenarnya. Yang dilaporkan harus selalu skor di data yang belum pernah dilihat model.

### Menyetel Ambang atau Parameter Sambil Melihat Data Uji

Kalau Anda mencoba banyak pengaturan lalu memilih yang skor data ujinya paling tinggi, data uji itu sudah berubah fungsi menjadi data latih. Pakai data validasi terpisah atau validasi silang untuk memilih, dan sentuh data uji hanya sekali di akhir.

### Memakai ROC-AUC pada Data Sangat Timpang

Angkanya bisa terlihat tinggi meski model buruk dalam menemukan kelas positif. Untuk kasus ini PR-AUC lebih jujur.

### Melaporkan R² Sendirian

R² tidak memberi tahu seberapa besar kesalahannya dalam ukuran nyata. Selalu sertakan MAE atau RMSE.

### Memilih Metrik Setelah Melihat Hasilnya

Ini kesalahan yang halus tapi serius. Kalau Anda menghitung semua metrik lalu memilih yang angkanya paling bagus untuk dilaporkan, Anda sedang membohongi diri sendiri.

Tentukan metrik utama di awal, sebelum melihat hasil apa pun, berdasarkan tujuan masalahnya.

### Mengabaikan Standar Deviasi Validasi Silang

Model dengan F1 rata-rata 0,80 dan naik-turun 0,02 jauh lebih bisa diandalkan daripada model dengan F1 rata-rata 0,82 tapi naik-turun 0,15. Kestabilan itu penting.

## Penutup

Evaluasi model bukan sekadar langkah terakhir untuk melaporkan angka. Justru pilihan metrik menentukan arah seluruh proyek, karena apa pun yang Anda ukur, itulah yang akan Anda optimalkan.

Tiga hal untuk diingat:

**Pertama**, tentukan metrik di awal berdasarkan kesalahan mana yang paling merugikan, bukan setelah melihat hasil mana yang paling bagus.

**Kedua**, satu angka tidak pernah cukup. Lihat confusion matrix, lihat beberapa metrik sekaligus, dan lihat kestabilannya lewat validasi silang.

**Ketiga**, angka apa pun tidak berarti tanpa pembanding. Selalu punya patokan sederhana untuk mengetahui apakah model Anda benar-benar memberi nilai tambah.