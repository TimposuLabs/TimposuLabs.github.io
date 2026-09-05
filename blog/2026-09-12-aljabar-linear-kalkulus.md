---
slug: aljabar-linear-kalkulus
title: "Aljabar Linear dan Kalkulus untuk Machine Learning: Panduan Machine Learning untuk Pemula #11"
authors: topekox
tags: [manchine learning, data mining, ai, data science, python]
---

Banyak orang berhenti belajar machine learning saat bertemu rumus matematika. Padahal matematika yang benar-benar dibutuhkan untuk memahami cara kerja model jauh lebih sedikit daripada yang dibayangkan.
 
Artikel ini punya satu tujuan yang jelas: membawa Anda dari nol sampai benar-benar memahami **gradient descent**, algoritma yang menjadi mesin di balik hampir semua model machine learning modern.
 
Tidak ada bukti matematis, tidak ada notasi yang tidak dijelaskan. Setiap konsep disertai contoh kode yang bisa dijalankan dan analogi yang bisa dibayangkan.

<!-- truncate -->

## Daftar Isi
 
1. Kenapa Perlu Matematika Ini
2. Vektor
3. Perkalian Titik
4. Matriks
5. Fungsi dan Turunan
6. Turunan Parsial dan Gradien
7. Gradient Descent
8. Menghubungkan ke Machine Learning Nyata
9. Rangkuman Notasi
10. Kesalahan Pemula yang Sering Terjadi
## Kenapa Perlu Matematika Ini
 
### Apa yang Akan Anda Pahami di Akhir
 
Setelah membaca artikel ini, Anda akan paham apa yang sebenarnya terjadi saat menjalankan `model.fit()`.
 
Anda juga akan mengerti kenapa:
 
- Data perlu diskalakan sebelum dilatih pada beberapa algoritma
- `learning_rate` yang terlalu besar membuat model gagal
- Pelatihan bisa "macet" dan tidak membaik lagi
- Jaringan saraf butuh banyak data dan waktu
Semua itu berasal dari satu ide: mencari titik terendah pada sebuah permukaan.
 
### Yang Perlu dan Tidak Perlu Dipelajari
 
**Perlu:** memahami arti operasi, bisa membayangkan maksudnya, dan tahu kapan sesuatu berlaku.
 
**Tidak perlu:** menghitung manual, menghafal rumus turunan yang rumit, atau membuktikan teorema. Komputer yang menghitung.
 
### Alat yang Dipakai
 
```python
import numpy as np
import matplotlib.pyplot as plt
 
np.set_printoptions(precision=4, suppress=True)   # tampilan angka lebih rapi
```
 
NumPy adalah pustaka Python untuk operasi angka. Hampir semua yang dibahas di sini sudah tersedia sebagai satu perintah NumPy.
 
## Vektor
 
### Apa Itu Vektor
 
Vektor adalah **deretan angka yang berurutan**.
 
Itu saja. Tidak lebih rumit dari itu.
 
```python
v = np.array([3, 4])
print(v)
print("Panjang deret:", len(v))
```
 
### Dua Cara Membayangkannya
 
**Sebagai daftar angka.** Ini cara paling praktis untuk machine learning. Satu baris data adalah satu vektor.
 
**Sebagai panah dalam ruang.** Vektor `[3, 4]` bisa dibayangkan sebagai panah dari titik nol ke titik yang berjarak 3 ke kanan dan 4 ke atas.
 
```python
plt.figure(figsize=(5, 5))
plt.quiver(0, 0, 3, 4, angles="xy", scale_units="xy", scale=1, color="blue")
plt.xlim(-1, 6); plt.ylim(-1, 6)
plt.grid(alpha=0.3); plt.axhline(0, color="k", lw=0.5); plt.axvline(0, color="k", lw=0.5)
plt.title("Vektor [3, 4] sebagai panah")
plt.show()
```
 
### Vektor dalam Data Nyata
 
Ini hubungan yang paling penting untuk dipahami.
 
**Satu baris data adalah satu vektor.** Kalau Anda punya data pelanggan dengan kolom umur, gaji, dan lama langganan, maka satu pelanggan direpresentasikan sebagai:
 
```python
pelanggan_a = np.array([35, 12.5, 24])    # umur, gaji juta, lama bulan
print("Vektor pelanggan A:", pelanggan_a)
```
 
Vektor dengan 3 angka berarti data itu punya 3 fitur. Kalau data Anda punya 50 kolom, tiap barisnya adalah vektor dengan 50 angka.
 
Karena manusia tidak bisa membayangkan ruang 50 dimensi, biasakan berpikir "vektor adalah daftar angka" alih-alih "vektor adalah panah". Cara berpikir itu tetap berlaku berapa pun dimensinya.
 
### Operasi Dasar
 
#### Penjumlahan
 
Dijumlahkan posisi per posisi.
 
```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print("a + b =", a + b)      # [5, 7, 9]
print("a - b =", a - b)      # [-3, -3, -3]
```
 
Syaratnya, kedua vektor harus punya jumlah angka yang sama.
 
#### Perkalian dengan Satu Angka
 
Angka tunggal disebut **skalar**. Mengalikan vektor dengan skalar berarti mengalikan tiap anggotanya.
 
```python
print("2 * a =", 2 * a)       # [2, 4, 6]
print("0.5 * a =", 0.5 * a)   # [0.5, 1, 1.5]
```
 
Secara geometris, ini memperpanjang atau memperpendek panah tanpa mengubah arahnya.
 
#### Perkalian Posisi per Posisi
 
```python
print("a * b =", a * b)       # [4, 10, 18]
```
 
Perhatikan bahwa ini **bukan** perkalian matriks maupun perkalian titik. Tanda bintang di NumPy selalu berarti perkalian posisi per posisi. Ini sumber kebingungan yang umum.
 
### Panjang Vektor
 
Panjang vektor disebut **norm**. Untuk vektor `[3, 4]`, panjangnya dihitung dengan teorema Pythagoras: akar dari 3 kuadrat ditambah 4 kuadrat, yaitu 5.
 
```python
v = np.array([3, 4])
print("Panjang:", np.linalg.norm(v))       # 5.0
print("Perhitungan manual:", np.sqrt(3**2 + 4**2))
```
 
#### Kenapa Ini Penting
 
Panjang vektor dipakai untuk mengukur **jarak** antar dua titik data. Ini dasar kerja algoritma KNN dan K-Means.
 
```python
p1 = np.array([35, 12.5, 24])
p2 = np.array([42, 15.0, 30])
print("Jarak antar dua pelanggan:", np.linalg.norm(p1 - p2))
```
 
Panjang vektor juga dipakai dalam regularisasi. Penalti L2 pada Ridge sebenarnya adalah panjang vektor koefisien, dan penalti L1 pada Lasso adalah jumlah nilai mutlaknya.
 
## Perkalian Titik
 
### Cara Menghitungnya
 
Perkalian titik (*dot product*) mengalikan angka di posisi yang sama, lalu menjumlahkan semuanya. Hasilnya **satu angka**, bukan vektor.
 
```python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
 
manual = 1*4 + 2*5 + 3*6      # 4 + 10 + 18 = 32
print("Manual  :", manual)
print("NumPy   :", np.dot(a, b))
print("Cara lain:", a @ b)     # simbol @ juga berarti perkalian titik
```
 
### Kenapa Ini Operasi Paling Penting
 
Karena **prediksi model linear adalah perkalian titik**.
 
Ingat rumus regresi linear:
 
```
prediksi = w1 × fitur1 + w2 × fitur2 + w3 × fitur3 + bias
```
 
Bagian sebelum bias itu persis perkalian titik antara vektor bobot dan vektor fitur.
 
```python
bobot = np.array([0.5, 2.0, -0.3])       # dipelajari model saat pelatihan
bias = 1.5
fitur_pelanggan = np.array([35, 12.5, 24])
 
prediksi = np.dot(bobot, fitur_pelanggan) + bias
print("Prediksi:", prediksi)
 
# Sama persis dengan menghitung manual
manual = 0.5*35 + 2.0*12.5 + (-0.3)*24 + 1.5
print("Manual  :", manual)
```
 
Jadi setiap kali model linear memprediksi sesuatu, yang terjadi hanyalah satu perkalian titik. Regresi logistik menambahkan satu langkah lagi: hasilnya dilewatkan ke fungsi sigmoid untuk diubah jadi probabilitas.
 
### Arti Geometrisnya
 
Perkalian titik juga mengukur **seberapa searah** dua vektor.
 
**Hasil positif besar** berarti kedua vektor mengarah ke arah yang mirip.
 
**Hasil mendekati nol** berarti keduanya tegak lurus, tidak berhubungan.
 
**Hasil negatif** berarti arahnya berlawanan.
 
```python
searah = np.array([1, 0])
tegak_lurus = np.array([0, 1])
berlawanan = np.array([-1, 0])
 
acuan = np.array([1, 0])
for nama, v in [("searah", searah), ("tegak lurus", tegak_lurus),
                ("berlawanan", berlawanan)]:
    print(f"{nama:12s}: {np.dot(acuan, v):>5.1f}")
```
 
### Kemiripan Kosinus
 
Kalau kedua vektor dibagi panjangnya dulu, hasilnya menjadi ukuran kemiripan arah murni antara -1 dan 1. Ini disebut **cosine similarity**, dan sangat sering dipakai untuk membandingkan dokumen teks atau rekomendasi produk.
 
```python
def kemiripan_kosinus(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
 
dok1 = np.array([3, 0, 1, 2])     # frekuensi kata dalam dokumen 1
dok2 = np.array([6, 0, 2, 4])     # dokumen 2, isinya mirip tapi lebih panjang
dok3 = np.array([0, 5, 0, 1])     # dokumen berbeda topik
 
print("Dokumen 1 vs 2:", round(kemiripan_kosinus(dok1, dok2), 4))
print("Dokumen 1 vs 3:", round(kemiripan_kosinus(dok1, dok3), 4))
```
 
Dokumen 1 dan 2 hasilnya 1,0 karena arahnya persis sama meski panjangnya berbeda. Inilah kenapa cosine similarity cocok untuk teks: dokumen panjang dan pendek dengan topik sama tetap dianggap mirip.
 
## Matriks
 
### Apa Itu Matriks
 
Matriks adalah **tabel angka**, atau bisa juga dilihat sebagai kumpulan vektor yang ditumpuk.
 
Dataset Anda adalah matriks. Tiap baris satu contoh data, tiap kolom satu fitur.
 
```python
X = np.array([
    [35, 12.5, 24],     # pelanggan 1
    [42, 15.0, 30],     # pelanggan 2
    [28,  8.0, 12],     # pelanggan 3
    [55, 20.0, 48],     # pelanggan 4
])
 
print(X)
print("Bentuk:", X.shape)     # (4, 3) artinya 4 baris, 3 kolom
```
 
### Bentuk Matriks
 
`shape` adalah hal yang paling sering menyebabkan error saat belajar. Biasakan mengeceknya.
 
```python
print("Jumlah baris (data):", X.shape[0])
print("Jumlah kolom (fitur):", X.shape[1])
print("Total angka:", X.size)
print("Jumlah dimensi:", X.ndim)     # 2 untuk matriks, 1 untuk vektor
```
 
#### Beda Vektor dan Matriks Satu Kolom
 
Ini perbedaan halus yang sering bikin error di scikit-learn.
 
```python
vektor = np.array([1, 2, 3])
print("Vektor:", vektor.shape)                 # (3,)  -- satu dimensi
 
kolom = np.array([[1], [2], [3]])
print("Matriks kolom:", kolom.shape)           # (3, 1) -- dua dimensi
 
# Mengubah vektor jadi matriks kolom
print("Setelah reshape:", vektor.reshape(-1, 1).shape)
```
 
Angka `-1` pada `reshape` berarti "hitung sendiri", jadi `reshape(-1, 1)` berarti "susun jadi satu kolom, berapa pun barisnya".
 
Pesan error `Expected 2D array, got 1D array instead` di scikit-learn hampir selalu diselesaikan dengan `reshape(-1, 1)`.
 
### Transpose
 
Transpose menukar baris menjadi kolom.
 
```python
print("Asli:", X.shape)
print(X)
print("\nTranspose:", X.T.shape)
print(X.T)
```
 
Ini sering dibutuhkan agar bentuk matriks cocok untuk dikalikan.
 
### Perkalian Matriks
 
#### Aturan Bentuknya
 
Ini aturan yang harus diingat: **jumlah kolom matriks pertama harus sama dengan jumlah baris matriks kedua**.
 
```
(a × b) dikali (b × c) menghasilkan (a × c)
        ↑____↑ harus sama
```
 
```python
A = np.array([[1, 2], [3, 4], [5, 6]])     # bentuk (3, 2)
B = np.array([[7, 8, 9], [10, 11, 12]])    # bentuk (2, 3)
 
print("A:", A.shape, " B:", B.shape)
print("A @ B:", (A @ B).shape)             # (3, 3)
print(A @ B)
```
 
Kalau bentuknya tidak cocok, NumPy akan memberi error yang menyebutkan bentuk keduanya. Membaca pesan error itu biasanya sudah cukup untuk menemukan masalahnya.
 
#### Kenapa Ini Penting untuk Machine Learning
 
Karena memprediksi **seluruh dataset sekaligus** hanyalah satu perkalian matriks.
 
```python
bobot = np.array([0.5, 2.0, -0.3])
bias = 1.5
 
# Cara lambat: satu per satu
prediksi_lambat = []
for baris in X:
    prediksi_lambat.append(np.dot(bobot, baris) + bias)
print("Cara lambat:", np.array(prediksi_lambat))
 
# Cara cepat: sekaligus dengan perkalian matriks
prediksi_cepat = X @ bobot + bias
print("Cara cepat :", prediksi_cepat)
```
 
Hasilnya identik, tapi cara kedua jauh lebih cepat karena dikerjakan oleh kode yang sudah dioptimalkan di tingkat mesin.
 
Inilah alasan pustaka machine learning selalu memakai operasi matriks alih-alih perulangan Python. Untuk data satu juta baris, selisih kecepatannya bisa ratusan kali lipat.
 
```python
# Membandingkan kecepatan
import time
 
X_besar = np.random.randn(200_000, 50)
w_besar = np.random.randn(50)
 
mulai = time.time()
hasil1 = np.array([np.dot(w_besar, baris) for baris in X_besar])
waktu_lambat = time.time() - mulai
 
mulai = time.time()
hasil2 = X_besar @ w_besar
waktu_cepat = time.time() - mulai
 
print(f"Perulangan     : {waktu_lambat:.4f} detik")
print(f"Perkalian matriks: {waktu_cepat:.4f} detik")
print(f"Lebih cepat {waktu_lambat/waktu_cepat:.0f} kali")
```
 
### Broadcasting
 
NumPy bisa mengoperasikan matriks dengan bentuk berbeda secara otomatis, asalkan masuk akal. Fitur ini disebut broadcasting.
 
```python
X = np.array([[1, 2, 3], [4, 5, 6]])
 
print("Tambah satu angka ke semua:\n", X + 10)
print("\nTambah per kolom:\n", X + np.array([100, 200, 300]))
```
 
Ini yang bekerja di balik layar saat `StandardScaler` mengurangi rata-rata tiap kolom dari seluruh baris sekaligus.
 
```python
# Standardisasi manual, persis seperti yang dilakukan StandardScaler
data = np.random.randn(100, 3) * [10, 5, 2] + [50, 20, 100]
 
rata = data.mean(axis=0)      # axis=0 berarti dihitung per kolom
std = data.std(axis=0)
data_skala = (data - rata) / std
 
print("Rata-rata setelah skala:", data_skala.mean(axis=0).round(4))
print("Std setelah skala      :", data_skala.std(axis=0).round(4))
```
 
Perhatikan `axis=0`. Angka 0 berarti "turun sepanjang baris", sehingga menghasilkan satu nilai per kolom. Ini sering tertukar dengan `axis=1` yang menghitung per baris.
 
## Fungsi dan Turunan
 
Sekarang kita beralih ke kalkulus. Bagian ini yang membuat gradient descent bisa dipahami.
 
### Apa Itu Fungsi
 
Fungsi adalah aturan yang mengubah masukan menjadi keluaran.
 
```python
def f(x):
    return x**2 - 4*x + 5
 
x = np.linspace(-1, 5, 200)
plt.figure(figsize=(7, 4))
plt.plot(x, f(x))
plt.axhline(0, color="k", lw=0.5); plt.grid(alpha=0.3)
plt.title("Fungsi f(x) = x² - 4x + 5")
plt.xlabel("x"); plt.ylabel("f(x)")
plt.show()
```
 
Perhatikan bentuknya seperti mangkuk. Ada satu titik terendah. Mencari titik terendah inilah pekerjaan gradient descent.
 
### Kemiringan Garis
 
Kemiringan menjawab: kalau x bertambah 1, berapa perubahan y?
 
Kemiringan positif berarti garis menanjak ke kanan. Kemiringan negatif berarti menurun. Kemiringan nol berarti datar.
 
### Turunan Adalah Kemiringan di Satu Titik
 
Pada garis lurus, kemiringannya sama di mana-mana. Pada kurva melengkung, kemiringannya berbeda-beda di tiap titik.
 
**Turunan** adalah kemiringan kurva di satu titik tertentu.
 
#### Analogi Kecepatan
 
Bayangkan grafik posisi mobil terhadap waktu.
 
Kemiringan grafik itu adalah kecepatan mobil. Kalau grafiknya menanjak curam, mobil melaju cepat. Kalau datar, mobil berhenti.
 
Turunan adalah kecepatan pada satu detik tertentu, bukan kecepatan rata-rata sepanjang perjalanan.
 
### Menghitung Turunan Secara Numerik
 
Ini cara paling mudah dipahami: ambil dua titik yang sangat berdekatan, lalu hitung kemiringan antara keduanya.
 
```python
def turunan_numerik(fungsi, x, h=1e-6):
    return (fungsi(x + h) - fungsi(x - h)) / (2 * h)
 
for titik in [0, 1, 2, 3, 4]:
    print(f"x={titik}: f(x)={f(titik):6.2f}  turunan={turunan_numerik(f, titik):7.3f}")
```
 
### Membaca Tanda Turunan
 
Ini yang paling penting untuk gradient descent.
 
**Turunan positif** berarti fungsi sedang naik. Untuk mencari titik terendah, Anda harus bergerak **ke kiri**.
 
**Turunan negatif** berarti fungsi sedang turun. Untuk mencari titik terendah, bergerak **ke kanan**.
 
**Turunan nol** berarti Anda sudah berada di titik datar, kemungkinan titik terendah.
 
```python
plt.figure(figsize=(8, 4.5))
plt.plot(x, f(x), lw=2)
 
for titik, warna in [(0.5, "red"), (2.0, "green"), (3.8, "orange")]:
    m = turunan_numerik(f, titik)
    garis_x = np.linspace(titik - 0.8, titik + 0.8, 10)
    garis_y = f(titik) + m * (garis_x - titik)
    plt.plot(garis_x, garis_y, color=warna, lw=2)
    plt.scatter([titik], [f(titik)], color=warna, zorder=5, s=60)
    plt.annotate(f"turunan={m:.1f}", (titik, f(titik)),
                 textcoords="offset points", xytext=(5, 15), color=warna)
 
plt.grid(alpha=0.3)
plt.title("Turunan adalah kemiringan garis singgung")
plt.show()
```
 
Perhatikan bahwa di titik terendah (x = 2), turunannya nol dan garis singgungnya datar.
 
### Beberapa Aturan Turunan
 
Anda tidak perlu menghafal banyak. Ini yang cukup untuk memahami machine learning.
 
| Fungsi | Turunannya | Artinya |
|---|---|---|
| angka tetap | 0 | Garis datar, tidak berubah |
| x | 1 | Naik 1 tiap x naik 1 |
| x² | 2x | Makin jauh dari nol, makin curam |
| 3x² | 6x | Angka pengali ikut terbawa |
| x² + x | 2x + 1 | Turunan dijumlahkan terpisah |
 
Untuk fungsi kerugian MSE yang berbentuk kuadrat, aturan `x²` menjadi `2x` sudah mencakup hampir semua yang dibutuhkan.
 
## Turunan Parsial dan Gradien
 
### Kalau Fungsinya Punya Banyak Masukan
 
Model machine learning punya banyak parameter. Regresi linear dengan 50 fitur punya 51 parameter yang harus dicari, termasuk bias.
 
Jadi kita butuh cara menghitung kemiringan untuk fungsi dengan banyak masukan.
 
### Turunan Parsial
 
Idenya sederhana: hitung kemiringan **satu parameter pada satu waktu**, sambil menganggap parameter lain tidak berubah.
 
```python
def g(x, y):
    return x**2 + 3*y**2
 
def turunan_parsial(fungsi, x, y, terhadap="x", h=1e-6):
    if terhadap == "x":
        return (fungsi(x + h, y) - fungsi(x - h, y)) / (2 * h)
    else:
        return (fungsi(x, y + h) - fungsi(x, y - h)) / (2 * h)
 
print("Di titik (2, 1):")
print("  Turunan terhadap x:", round(turunan_parsial(g, 2, 1, "x"), 4))
print("  Turunan terhadap y:", round(turunan_parsial(g, 2, 1, "y"), 4))
```
 
Turunan terhadap x menjawab: kalau x saya geser sedikit sambil y ditahan, seberapa cepat hasilnya berubah?
 
### Gradien
 
**Gradien adalah kumpulan semua turunan parsial, disusun jadi satu vektor.**
 
```python
def gradien(fungsi, x, y):
    return np.array([turunan_parsial(fungsi, x, y, "x"),
                     turunan_parsial(fungsi, x, y, "y")])
 
print("Gradien di (2, 1):", gradien(g, 2, 1).round(4))
```
 
### Arti Gradien
 
Gradien menunjuk ke **arah paling curam menaik**.
 
Konsekuensinya, kebalikan dari gradien menunjuk ke **arah paling curam menurun**. Inilah yang dipakai gradient descent.
 
### Analogi Bukit Berkabut
 
Bayangkan Anda berada di lereng bukit, tapi kabut sangat tebal sehingga Anda hanya bisa melihat sejauh satu langkah.
 
Anda ingin turun ke lembah. Apa yang Anda lakukan?
 
Anda merasakan kemiringan tanah di sekitar kaki Anda, mencari arah yang paling menurun, lalu melangkah ke sana. Lalu ulangi dari posisi baru.
 
Itulah gradient descent. Gradien adalah "merasakan kemiringan tanah", dan langkah berikutnya diambil ke arah yang berlawanan dengan gradien.
 
### Melihat Permukaannya
 
```python
X_grid, Y_grid = np.meshgrid(np.linspace(-3, 3, 100), np.linspace(-3, 3, 100))
Z = g(X_grid, Y_grid)
 
fig, ax = plt.subplots(1, 2, figsize=(13, 5))
 
kontur = ax[0].contour(X_grid, Y_grid, Z, levels=20)
ax[0].clabel(kontur, inline=True, fontsize=7)
ax[0].set_title("Peta kontur (seperti peta topografi)")
 
# Menggambar arah gradien di beberapa titik
for px in [-2, 0, 2]:
    for py in [-2, 0, 2]:
        if px == 0 and py == 0:
            continue
        gr = gradien(g, px, py)
        gr = gr / np.linalg.norm(gr)      # dijadikan panjang 1 agar rapi
        ax[0].quiver(px, py, -gr[0], -gr[1], color="red",
                     angles="xy", scale=8)
 
ax[1].contourf(X_grid, Y_grid, Z, levels=30, cmap="viridis")
ax[1].set_title("Permukaan fungsi (gelap = rendah)")
 
plt.tight_layout()
plt.show()
```
 
Panah merah menunjuk ke arah kebalikan gradien, yaitu arah menuju titik terendah. Perhatikan semuanya mengarah ke tengah.
 
## Gradient Descent
 
### Masalah yang Diselesaikan
 
Model machine learning punya parameter yang harus dicari nilainya. Untuk regresi linear sederhana, ada dua: bobot dan bias.
 
Bagaimana menemukan nilai terbaiknya?
 
Mencoba semua kombinasi mustahil. Dengan 50 parameter dan 100 pilihan nilai per parameter, jumlah kombinasinya lebih besar daripada jumlah atom di alam semesta.
 
Gradient descent menyelesaikannya dengan cara yang jauh lebih pintar: mulai dari tebakan asal, lalu perbaiki sedikit demi sedikit ke arah yang benar.
 
### Algoritmanya
 
1. Mulai dari nilai parameter acak
2. Hitung seberapa buruk model saat ini, disebut **kerugian** atau *loss*
3. Hitung gradien kerugian terhadap tiap parameter
4. Geser tiap parameter sedikit ke arah kebalikan gradien
5. Ulangi sampai kerugian tidak turun lagi
Rumus langkahnya:
 
```
parameter_baru = parameter_lama - (learning_rate × gradien)
```
 
Tanda minus itulah yang membuat kita bergerak **turun**, bukan naik.
 
### Contoh Paling Sederhana: Satu Parameter
 
Mari cari titik terendah fungsi `f(x) = x² - 4x + 5` tanpa tahu jawabannya.
 
```python
def f(x):
    return x**2 - 4*x + 5
 
def turunan_f(x):
    return 2*x - 4           # turunan dari x² - 4x + 5
 
x = 8.0                      # tebakan awal, sengaja jauh dari jawaban
learning_rate = 0.1
riwayat = [x]
 
for langkah in range(30):
    g = turunan_f(x)
    x = x - learning_rate * g
    riwayat.append(x)
    if langkah < 8 or langkah == 29:
        print(f"Langkah {langkah+1:2d}: x={x:7.4f}  f(x)={f(x):7.4f}  gradien={g:8.4f}")
 
print(f"\nHasil akhir: x = {x:.6f}")
print("Jawaban sebenarnya: x = 2")
```
 
Perhatikan polanya: makin dekat ke jawaban, gradiennya makin kecil, sehingga langkahnya makin pendek. Algoritma ini otomatis melambat saat mendekati tujuan.
 
### Melihat Perjalanannya
 
```python
xs = np.linspace(-1, 9, 200)
plt.figure(figsize=(8, 4.5))
plt.plot(xs, f(xs), lw=2, label="f(x)")
riwayat = np.array(riwayat)
plt.plot(riwayat, f(riwayat), "ro-", ms=5, alpha=0.6, label="Perjalanan")
plt.scatter([2], [f(2)], color="green", s=120, zorder=5, label="Titik terendah")
plt.legend(); plt.grid(alpha=0.3)
plt.title("Gradient descent menuruni kurva")
plt.show()
```
 
### Learning Rate: Ukuran Langkah
 
`learning_rate` menentukan seberapa besar langkah tiap iterasi. Ini hyperparameter paling penting dalam gradient descent.
 
```python
def coba_learning_rate(lr, langkah=25, awal=8.0):
    x = awal
    jejak = [x]
    for _ in range(langkah):
        x = x - lr * turunan_f(x)
        if abs(x) > 1e6:              # sudah meledak, hentikan
            break
        jejak.append(x)
    return np.array(jejak)
 
fig, ax = plt.subplots(1, 3, figsize=(15, 4))
xs = np.linspace(-6, 10, 300)
 
for i, (lr, judul) in enumerate([(0.01, "Terlalu kecil"),
                                 (0.3, "Pas"),
                                 (1.02, "Terlalu besar")]):
    jejak = coba_learning_rate(lr)
    ax[i].plot(xs, f(xs), lw=1.5)
    ax[i].plot(jejak, f(jejak), "ro-", ms=4, alpha=0.7)
    ax[i].set_title(f"{judul} (lr={lr})\nsetelah 25 langkah: x={jejak[-1]:.3f}")
    ax[i].set_ylim(-2, 60)
 
plt.tight_layout()
plt.show()
```
 
#### Tiga Kondisi yang Perlu Dikenali
 
**Terlalu kecil.** Langkahnya terlalu pendek, sehingga setelah banyak iterasi masih jauh dari tujuan. Pelatihan jadi lambat.
 
**Pas.** Turun dengan cepat dan berhenti di titik yang tepat.
 
**Terlalu besar.** Langkahnya melompati titik terendah, lalu melompat lebih jauh lagi ke sisi seberang. Nilainya membesar terus dan akhirnya meledak menjadi `inf` atau `nan`.
 
Kalau saat melatih model Anda melihat nilai kerugian menjadi `nan`, penyebab paling umum adalah learning rate terlalu besar.
 
### Menerapkannya pada Regresi Linear
 
Sekarang kita gabungkan semuanya untuk melatih model sungguhan dari nol.
 
```python
# Membuat data dengan hubungan yang kita ketahui
np.random.seed(42)
n = 200
X_data = np.random.uniform(0, 10, n)
y_data = 3.5 * X_data + 8 + np.random.randn(n) * 2    # bobot asli 3,5 bias asli 8
 
def hitung_kerugian(w, b, X, y):
    """MSE: rata-rata dari selisih kuadrat"""
    prediksi = w * X + b
    return np.mean((y - prediksi) ** 2)
 
def hitung_gradien(w, b, X, y):
    """Turunan MSE terhadap w dan b"""
    prediksi = w * X + b
    galat = y - prediksi
    grad_w = -2 * np.mean(X * galat)
    grad_b = -2 * np.mean(galat)
    return grad_w, grad_b
 
# Pelatihan
w, b = 0.0, 0.0          # mulai dari nol
lr = 0.01
riwayat_kerugian = []
riwayat_parameter = []
 
for iterasi in range(500):
    gw, gb = hitung_gradien(w, b, X_data, y_data)
    w = w - lr * gw
    b = b - lr * gb
 
    kerugian = hitung_kerugian(w, b, X_data, y_data)
    riwayat_kerugian.append(kerugian)
    riwayat_parameter.append((w, b))
 
    if iterasi % 100 == 0 or iterasi == 499:
        print(f"Iterasi {iterasi:3d}: w={w:6.4f}  b={b:6.4f}  kerugian={kerugian:8.4f}")
 
print(f"\nHasil pelatihan : w={w:.4f}, b={b:.4f}")
print(f"Nilai sebenarnya: w=3.5000, b=8.0000")
```
 
### Membandingkan dengan scikit-learn
 
```python
from sklearn.linear_model import LinearRegression
 
sk = LinearRegression().fit(X_data.reshape(-1, 1), y_data)
print(f"Gradient descent buatan sendiri: w={w:.4f}, b={b:.4f}")
print(f"scikit-learn                   : w={sk.coef_[0]:.4f}, b={sk.intercept_:.4f}")
```
 
Hasilnya hampir identik. Anda baru saja menulis ulang inti dari sebuah algoritma machine learning.
 
### Melihat Kurva Kerugian
 
```python
fig, ax = plt.subplots(1, 2, figsize=(13, 4.5))
 
ax[0].plot(riwayat_kerugian)
ax[0].set_xlabel("Iterasi"); ax[0].set_ylabel("Kerugian (MSE)")
ax[0].set_title("Kerugian menurun seiring pelatihan")
ax[0].set_yscale("log")
ax[0].grid(alpha=0.3)
 
ax[1].scatter(X_data, y_data, alpha=0.4, s=20, label="Data")
garis_x = np.array([0, 10])
ax[1].plot(garis_x, w * garis_x + b, "r-", lw=2, label="Garis hasil pelatihan")
ax[1].legend(); ax[1].set_title("Hasil akhir")
 
plt.tight_layout()
plt.show()
```
 
#### Cara Membaca Kurva Kerugian
 
Ini grafik yang selalu diperiksa saat melatih jaringan saraf.
 
**Turun lalu mendatar** berarti pelatihan berhasil dan sudah selesai.
 
**Masih menurun di ujung** berarti pelatihan dihentikan terlalu cepat. Tambah jumlah iterasi.
 
**Naik-turun liar** berarti learning rate terlalu besar.
 
**Datar dari awal** berarti learning rate terlalu kecil, atau ada kesalahan dalam perhitungan gradien.
 
### Kenapa Penskalaan Data Penting
 
Sekarang Anda bisa memahami alasan sesungguhnya di balik penskalaan.
 
Kalau satu fitur bernilai jutaan dan fitur lain bernilai puluhan, permukaan kerugiannya menjadi berbentuk lembah yang sangat sempit dan memanjang, bukan mangkuk bundar.
 
Pada lembah sempit, gradient descent akan memantul dari sisi ke sisi alih-alih meluncur turun. Pelatihan jadi sangat lambat, atau tidak pernah selesai.
 
```python
# Membandingkan permukaan kerugian sebelum dan sesudah penskalaan
def gambar_permukaan(X, judul, ax):
    ws = np.linspace(-2, 8, 80)
    bs = np.linspace(-5, 20, 80)
    W, B = np.meshgrid(ws, bs)
    Z = np.array([[np.mean((y_data - (wi * X + bi))**2)
                   for wi in ws] for bi in bs])
    ax.contour(W, B, Z, levels=30)
    ax.set_xlabel("bobot"); ax.set_ylabel("bias")
    ax.set_title(judul)
 
fig, ax = plt.subplots(1, 2, figsize=(12, 4.5))
gambar_permukaan(X_data, "Sebelum diskalakan", ax[0])
gambar_permukaan((X_data - X_data.mean()) / X_data.std(), "Setelah diskalakan", ax[1])
plt.tight_layout()
plt.show()
```
 
Setelah diskalakan, konturnya lebih mendekati lingkaran, dan gradient descent bisa langsung meluncur ke tengah.
 
## Menghubungkan ke Machine Learning Nyata
 
### Fungsi Kerugian
 
**Fungsi kerugian** mengukur seberapa buruk prediksi model. Inilah fungsi yang titik terendahnya dicari oleh gradient descent.
 
| Jenis masalah | Fungsi kerugian | Alasannya |
|---|---|---|
| Regresi | MSE (selisih kuadrat) | Menghukum kesalahan besar lebih berat |
| Klasifikasi biner | Binary cross-entropy | Cocok dengan keluaran probabilitas |
| Klasifikasi banyak kelas | Categorical cross-entropy | Perluasan untuk lebih dari dua kelas |
 
Perhatikan bahwa fungsi kerugian **berbeda** dari metrik evaluasi. Fungsi kerugian harus bisa diturunkan agar gradient descent bisa bekerja. Akurasi tidak bisa diturunkan karena berupa lompatan, itulah kenapa model dilatih dengan cross-entropy tapi dievaluasi dengan akurasi.
 
### Kenapa Pelatihan Bisa Macet
 
Fungsi berbentuk mangkuk sederhana hanya punya satu titik terendah, jadi gradient descent pasti menemukannya.
 
Tapi model rumit seperti jaringan saraf punya permukaan kerugian yang berlekuk-lekuk dengan banyak cekungan. Gradient descent bisa terjebak di cekungan kecil yang bukan titik terendah sesungguhnya.
 
```python
def berlekuk(x):
    return x**4 - 4*x**3 + 2*x**2 + 3*x + 5
 
def turunan_berlekuk(x):
    return 4*x**3 - 12*x**2 + 4*x + 3
 
xs = np.linspace(-1.2, 3.5, 300)
plt.figure(figsize=(8, 4.5))
plt.plot(xs, berlekuk(xs), lw=2)
 
for awal, warna in [(-1.0, "red"), (3.2, "blue")]:
    x = awal
    jejak = [x]
    for _ in range(60):
        x = x - 0.01 * turunan_berlekuk(x)
        jejak.append(x)
    jejak = np.array(jejak)
    plt.plot(jejak, berlekuk(jejak), "o-", color=warna, ms=3, alpha=0.6,
             label=f"Mulai dari x={awal}, berakhir di x={jejak[-1]:.2f}")
 
plt.legend(); plt.grid(alpha=0.3)
plt.title("Titik awal berbeda bisa berakhir di cekungan berbeda")
plt.show()
```
 
Inilah alasan `random_state` mempengaruhi hasil pada beberapa model, dan kenapa jaringan saraf kadang perlu dilatih beberapa kali dengan inisialisasi berbeda.
 
### Tiga Varian Gradient Descent
 
Perbedaannya hanya pada berapa banyak data yang dipakai untuk menghitung gradien tiap langkah.
 
**Batch gradient descent** memakai seluruh data tiap langkah. Arahnya paling akurat, tapi sangat lambat untuk data besar.
 
**Stochastic gradient descent (SGD)** memakai satu baris data tiap langkah. Sangat cepat tapi arahnya berisik dan berzigzag.
 
**Mini-batch gradient descent** memakai sekelompok kecil data, misalnya 32 atau 128 baris. Ini kompromi terbaik dan yang paling banyak dipakai dalam praktik.
 
Parameter `batch_size` yang Anda lihat pada `MLPClassifier` atau pustaka deep learning mengacu pada ini.
 
### Perbaikan Modern
 
**Momentum** menambahkan efek "inersia", sehingga langkah tidak mudah terjebak di cekungan kecil dan lebih cepat melewati lembah panjang.
 
**Adam** menyesuaikan ukuran langkah untuk tiap parameter secara otomatis. Ini pilihan default di sebagian besar pustaka deep learning, dan alasannya sederhana: biasanya bekerja baik tanpa banyak penyetelan.
 
Anda tidak perlu memahami rumusnya. Cukup tahu bahwa keduanya adalah versi gradient descent yang lebih pintar dalam memilih arah dan ukuran langkah.
 
## Rangkuman Notasi
 
| Simbol atau istilah | Artinya | Contoh dalam kode |
|---|---|---|
| Skalar | Satu angka | `2.5` |
| Vektor | Deretan angka, satu baris data | `np.array([1, 2, 3])` |
| Matriks | Tabel angka, seluruh dataset | `np.array([[1,2],[3,4]])` |
| X | Matriks fitur | `X.shape = (n_baris, n_fitur)` |
| y | Vektor target | `y.shape = (n_baris,)` |
| w | Vektor bobot yang dipelajari | `w.shape = (n_fitur,)` |
| b | Bias, satu angka | `b = 1.5` |
| Perkalian titik | Jumlah hasil kali posisi per posisi | `np.dot(a, b)` atau `a @ b` |
| Norm | Panjang vektor | `np.linalg.norm(v)` |
| Transpose | Menukar baris dan kolom | `X.T` |
| Turunan | Kemiringan di satu titik | `2*x` untuk `x²` |
| Gradien | Vektor berisi semua turunan parsial | `np.array([grad_w, grad_b])` |
| Learning rate | Ukuran langkah tiap iterasi | `lr = 0.01` |
| Loss | Ukuran seberapa buruk model | `np.mean((y - pred)**2)` |
 
## Kesalahan Pemula yang Sering Terjadi
 
### Bingung antara `*` dan `@` di NumPy
 
Tanda `*` selalu berarti perkalian posisi per posisi. Untuk perkalian titik atau perkalian matriks, pakai `@` atau `np.dot()`.
 
### Tidak Memeriksa Bentuk Matriks
 
Sebagian besar error saat bekerja dengan NumPy dan scikit-learn berasal dari bentuk yang tidak cocok. Biasakan mencetak `.shape` saat ada yang aneh.
 
### Tertukar antara axis=0 dan axis=1
 
`axis=0` menghitung per kolom, `axis=1` menghitung per baris. Untuk menghitung rata-rata tiap fitur, yang benar adalah `axis=0`.
 
### Learning Rate Terlalu Besar
 
Gejalanya jelas: kerugian membesar alih-alih mengecil, atau berubah menjadi `nan`. Kalau ini terjadi, turunkan learning rate sepuluh kali lipat dan coba lagi.
 
### Tidak Menskalakan Data pada Model Berbasis Gradien
 
Sekarang Anda tahu alasannya: permukaan kerugian menjadi lembah sempit dan pelatihan jadi sangat lambat. Ini berlaku untuk regresi logistik, SVM, dan jaringan saraf. Model berbasis pohon tidak terpengaruh.
 
### Menganggap Loss dan Metrik Evaluasi Sama
 
Loss adalah yang dioptimalkan model saat pelatihan. Metrik adalah yang Anda pakai untuk menilai hasilnya. Keduanya sering berbeda, dan itu wajar.
 
### Berhenti Melatih Terlalu Cepat
 
Kalau kurva kerugian masih menurun di ujung, model belum selesai belajar. Tambah jumlah iterasi.
 
### Mengira Harus Menghafal Semua Rumus
 
Yang dibutuhkan adalah memahami maksudnya. Rumus turunan yang rumit dihitung otomatis oleh pustaka, dan Anda hampir tidak pernah menuliskannya sendiri.
 
## Penutup
 
Matematika di balik machine learning tidak sebanyak yang dibayangkan. Vektor adalah daftar angka, matriks adalah tabel angka, turunan adalah kemiringan, dan gradien adalah kumpulan kemiringan.
 
Digabungkan, keempatnya menjelaskan bagaimana model belajar: dengan berulang kali melangkah menuruni permukaan kerugian sampai mencapai titik terendah.
 
Tiga hal untuk diingat:
 
**Pertama**, prediksi model linear hanyalah satu perkalian titik antara bobot dan fitur. Semua kerumitan lain dibangun di atas operasi sederhana ini.
 
**Kedua**, gradien menunjuk ke arah paling curam menaik, jadi gradient descent bergerak ke arah kebalikannya. Tanda minus dalam rumus pembaruan parameter adalah inti dari seluruh algoritma.
 
**Ketiga**, learning rate menentukan ukuran langkah, dan hampir semua kegagalan pelatihan yang aneh berasal dari nilai ini. Terlalu besar membuat pelatihan meledak, terlalu kecil membuatnya tidak pernah selesai.
 