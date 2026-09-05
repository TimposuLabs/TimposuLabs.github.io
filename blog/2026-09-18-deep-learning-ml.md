---
slug: deep-learning-ml
title: "Deep Learning: Panduan Machine Learning untuk Pemula #17"
authors: topekox
tags: [manchine learning, data mining, ai, deep learning, data science, python]
---

## Baca Bagian Ini Dulu Sebelum Mulai
 
Sebelum masuk ke isi artikel, ada satu hal yang perlu diluruskan lebih dulu, agar tidak buang-buang waktu belajar.
 
### Deep Learning Bukan Langkah Berikutnya yang Otomatis
 
Banyak pemula menganggap urutan belajar machine learning itu seperti naik tingkat: mulai dari regresi linear, lalu Random Forest, lalu deep learning sebagai puncaknya.
 
Itu keliru. Deep learning bukan versi lebih baik dari model biasa, melainkan **alat yang berbeda untuk jenis masalah yang berbeda**.

<!-- truncate -->

### Untuk Data Tabel, Gradient Boosting Masih Sering Menang
 
Ini fakta yang jarang disampaikan dalam tutorial deep learning, padahal sangat penting.
 
Untuk data berbentuk tabel, yaitu data dengan baris dan kolom seperti data pelanggan, data transaksi, atau data medis, **gradient boosting seperti XGBoost dan LightGBM masih sering mengalahkan jaringan saraf**.
 
Bukan hanya soal akurasi. Gradient boosting juga lebih cepat dilatih, butuh lebih sedikit penyetelan, tidak memerlukan GPU, dan hasilnya lebih mudah dijelaskan.
 
Artikel ini akan membuktikannya dengan kode di Bagian 3, membandingkan langsung jaringan saraf dengan gradient boosting pada data tabel yang sama.
 
### Kapan Deep Learning Memang Pilihan Tepat
 
Deep learning unggul pada data yang **tidak berbentuk tabel**, di mana strukturnya penting dan fiturnya sulit dirancang manusia.
 
| Jenis data | Pilihan yang lebih baik |
|---|---|
| Tabel dengan puluhan kolom | Gradient boosting |
| Gambar | Deep learning (CNN) |
| Teks | Deep learning (transformer) |
| Suara dan audio | Deep learning |
| Deret waktu sederhana | Gradient boosting atau statistik |
| Data sangat besar dengan pola rumit | Deep learning |
| Data kecil di bawah beberapa ribu baris | Model biasa |
 
Alasannya bisa dijelaskan singkat: pada gambar dan teks, hubungan antar bagian sangat penting dan tidak bisa diringkas menjadi kolom-kolom terpisah. Di situlah deep learning bersinar.
 
### Sebaiknya Masuk ke Sini Setelah Nyaman dengan Data Tabel
 
Alasannya praktis, bukan sekadar urutan kurikulum.
 
Konsep seperti overfitting, validasi silang, pemilihan metrik, dan kebocoran data **jauh lebih mudah dipahami** pada model sederhana yang cepat dilatih. Kalau Anda mempelajarinya sambil menunggu jaringan saraf berlatih selama 20 menit tiap percobaan, prosesnya jadi menyiksa.
 
Selain itu, sebagian besar kegagalan dalam deep learning bukan karena arsitekturnya salah, melainkan karena datanya bocor, metriknya keliru, atau evaluasinya tidak benar. Semua itu masalah yang sama seperti pada model biasa.
 
**Prasyarat yang sebaiknya sudah dikuasai:** Python dan NumPy, konsep data latih dan uji, overfitting dan underfitting, gradient descent secara umum, serta pemilihan metrik.
 
Kalau tiga hal terakhir masih terasa asing, pelajari itu dulu. Akan jauh lebih mudah.
 
## Daftar Isi
 
1. Apa Itu Deep Learning
2. Neuron dan Jaringan Saraf
3. Backpropagation
4. Bekerja dengan PyTorch
5. Melatih Model dengan Benar
6. CNN untuk Data Gambar
7. RNN dan LSTM untuk Data Berurutan
8. Transformer
9. Transfer Learning
10. Memilih Arsitektur
11. Kesalahan Pemula yang Sering Terjadi
## Apa Itu Deep Learning
 
### Perbedaan Mendasar dengan Model Biasa
 
Pada model biasa, **Anda** yang merancang fiturnya. Anda memutuskan bahwa rasio utang terhadap pendapatan itu penting, lalu membuat kolomnya.
 
Pada deep learning, **model** yang menemukan fiturnya sendiri, secara bertahap dari sederhana ke kompleks.
 
Contohnya pada pengenalan wajah: lapisan awal menemukan tepi, lapisan tengah menggabungkan tepi menjadi mata dan hidung, lapisan akhir menggabungkannya menjadi wajah utuh. Tidak ada manusia yang memberi tahu urutan itu.
 
### Kenapa Disebut "Deep"
 
Kata "deep" merujuk pada banyaknya lapisan. Jaringan dengan satu lapisan tersembunyi disebut dangkal, dengan puluhan lapisan disebut dalam.
 
Tiap lapisan mengubah representasi data sedikit demi sedikit, sehingga di lapisan akhir masalahnya menjadi mudah dipisahkan.
 
### Kenapa Baru Berhasil Sekarang
 
Ide jaringan saraf sudah ada sejak 1950-an. Yang berubah dalam sepuluh tahun terakhir ada tiga hal:
 
**Data menjadi melimpah.** Internet menyediakan jutaan gambar dan miliaran kalimat.
 
**Komputasi menjadi murah.** GPU yang awalnya untuk permainan ternyata sangat cocok untuk perkalian matriks besar.
 
**Ada perbaikan teknis kunci.** Fungsi aktivasi ReLU, batch normalization, dan optimizer Adam membuat jaringan dalam akhirnya bisa dilatih dengan stabil.
 
## Neuron dan Jaringan Saraf
 
### Satu Neuron
 
Neuron buatan jauh lebih sederhana daripada yang dibayangkan. Ia hanya melakukan dua hal: mengalikan masukan dengan bobot lalu menjumlahkannya, kemudian melewatkan hasilnya ke sebuah fungsi.
 
```python
import numpy as np
 
def neuron(masukan, bobot, bias):
    total = np.dot(masukan, bobot) + bias      # perkalian titik
    return max(0, total)                        # fungsi aktivasi ReLU
 
masukan = np.array([2.0, 3.0, 1.0])       # 3 fitur
bobot = np.array([0.5, -0.2, 0.8])        # dipelajari saat pelatihan
bias = 0.1
 
print("Keluaran neuron:", neuron(masukan, bobot, bias))
```
 
Perhatikan bahwa bagian pertamanya persis sama dengan regresi linear. Yang membedakan hanya fungsi aktivasi di akhir.
 
### Kenapa Perlu Fungsi Aktivasi
 
Ini pertanyaan yang penting dijawab, karena menjelaskan seluruh alasan jaringan bisa berguna.
 
Tanpa fungsi aktivasi, menumpuk seratus lapisan tidak ada gunanya. Gabungan operasi linear tetaplah operasi linear, sehingga seratus lapisan setara dengan satu lapisan saja.
 
```python
# Membuktikannya
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
x = np.array([1, 1])
 
berlapis = B @ (A @ x)          # dua lapisan tanpa aktivasi
satu_lapis = (B @ A) @ x        # bisa diringkas jadi satu matriks
 
print("Dua lapisan:", berlapis)
print("Satu lapisan:", satu_lapis)
print("Identik, jadi menumpuk lapisan tanpa aktivasi tidak berguna")
```
 
Fungsi aktivasi menyisipkan ketidaklinearan, sehingga tiap lapisan benar-benar menambah kemampuan.
 
### Tiga Fungsi Aktivasi yang Perlu Diketahui
 
```python
import matplotlib.pyplot as plt
 
x = np.linspace(-5, 5, 200)
 
relu = np.maximum(0, x)
sigmoid = 1 / (1 + np.exp(-x))
tanh = np.tanh(x)
 
fig, ax = plt.subplots(1, 3, figsize=(14, 3.5))
for a, (nama, y) in zip(ax, [("ReLU", relu), ("Sigmoid", sigmoid), ("Tanh", tanh)]):
    a.plot(x, y, lw=2)
    a.axhline(0, color="k", lw=0.5); a.axvline(0, color="k", lw=0.5)
    a.set_title(nama); a.grid(alpha=0.3)
plt.tight_layout()
plt.show()
```
 
**ReLU** mengubah nilai negatif menjadi nol dan membiarkan yang positif. Sederhana, cepat, dan menjadi pilihan bawaan untuk lapisan tersembunyi.
 
**Sigmoid** memampatkan nilai apa pun menjadi 0 sampai 1. Dipakai di lapisan keluaran untuk klasifikasi dua kelas, karena hasilnya bisa dibaca sebagai probabilitas.
 
**Tanh** memampatkan menjadi -1 sampai 1. Jarang dipakai sekarang kecuali di dalam LSTM.
 
Aturan praktis untuk pemula: pakai ReLU di lapisan tersembunyi, sigmoid atau softmax di lapisan keluaran.
 
### Menyusun Neuron Menjadi Jaringan
 
```python
def jaringan_sederhana(x, W1, b1, W2, b2):
    lapisan1 = np.maximum(0, x @ W1 + b1)      # lapisan tersembunyi
    keluaran = lapisan1 @ W2 + b2               # lapisan keluaran
    return keluaran
 
np.random.seed(42)
x = np.array([[2.0, 3.0, 1.0]])                # 1 contoh, 3 fitur
W1 = np.random.randn(3, 4) * 0.5               # 3 masukan -> 4 neuron
b1 = np.zeros(4)
W2 = np.random.randn(4, 1) * 0.5               # 4 neuron -> 1 keluaran
b2 = np.zeros(1)
 
print("Keluaran jaringan:", jaringan_sederhana(x, W1, b1, W2, b2))
```
 
Perhatikan bentuk matriksnya. `W1` berukuran (3, 4) karena menghubungkan 3 masukan ke 4 neuron. Kesalahan bentuk matriks adalah sumber error paling umum saat memulai.
 
## Backpropagation
 
### Masalah yang Diselesaikan
 
Jaringan di atas menghasilkan angka, tapi angkanya salah karena bobotnya masih acak.
 
Pertanyaannya: dari ribuan bobot yang ada, bagaimana kita tahu **bobot mana yang harus diubah, ke arah mana, dan seberapa banyak?**
 
Backpropagation adalah jawabannya.
 
### Analogi Rantai Tanggung Jawab
 
Bayangkan sebuah pabrik dengan beberapa tahap produksi. Produk akhirnya cacat.
 
Untuk memperbaikinya, Anda menelusuri mundur: tahap terakhir salah sebesar ini, yang disebabkan tahap sebelumnya salah sebesar itu, dan seterusnya sampai ke tahap pertama.
 
Tiap tahap mendapat porsi tanggung jawab sesuai kontribusinya terhadap kesalahan akhir.
 
Backpropagation melakukan persis itu: menghitung kesalahan di keluaran, lalu menyebarkannya mundur ke tiap lapisan untuk mengetahui seberapa besar tiap bobot berkontribusi pada kesalahan.
 
### Aturan Rantai
 
Secara matematis, ini memakai aturan rantai dari kalkulus. Kalau A mempengaruhi B, dan B mempengaruhi C, maka pengaruh A terhadap C adalah perkalian keduanya.
 
Anda tidak perlu menghitung ini manual. PyTorch melakukannya otomatis. Tapi memahami idenya membantu saat pelatihan bermasalah.
 
### Implementasi dari Nol
 
Mari buktikan dengan masalah klasik yang tidak bisa diselesaikan model linear: XOR.
 
```python
# Masalah XOR: keluaran 1 kalau kedua masukan berbeda
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)
y = np.array([[0], [1], [1], [0]], dtype=float)
 
# Buktikan model linear gagal
from sklearn.linear_model import LogisticRegression
linear = LogisticRegression().fit(X, y.ravel())
print("Tebakan model linear:", linear.predict(X))
print("Jawaban benar       :", y.ravel().astype(int))
```
 
Model linear tidak akan pernah bisa menyelesaikan XOR, karena tidak ada satu garis lurus yang memisahkan keduanya.
 
Sekarang mari buat jaringan saraf dari nol.
 
```python
np.random.seed(42)
 
def sigmoid(x):
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))
 
# Inisialisasi bobot acak
W1 = np.random.randn(2, 4)
b1 = np.zeros((1, 4))
W2 = np.random.randn(4, 1)
b2 = np.zeros((1, 1))
 
lr = 0.5
riwayat = []
 
for epoch in range(5000):
    # === MAJU (forward pass) ===
    z1 = X @ W1 + b1
    a1 = sigmoid(z1)                # keluaran lapisan tersembunyi
    z2 = a1 @ W2 + b2
    a2 = sigmoid(z2)                # keluaran akhir
 
    # === HITUNG KERUGIAN ===
    rugi = np.mean((y - a2) ** 2)
    riwayat.append(rugi)
 
    # === MUNDUR (backpropagation) ===
    # Kesalahan di keluaran
    d_a2 = -(y - a2)
    d_z2 = d_a2 * a2 * (1 - a2)          # turunan sigmoid
 
    # Gradien untuk lapisan kedua
    d_W2 = a1.T @ d_z2
    d_b2 = d_z2.sum(axis=0, keepdims=True)
 
    # Sebarkan kesalahan mundur ke lapisan pertama
    d_a1 = d_z2 @ W2.T
    d_z1 = d_a1 * a1 * (1 - a1)
 
    d_W1 = X.T @ d_z1
    d_b1 = d_z1.sum(axis=0, keepdims=True)
 
    # === PERBARUI BOBOT ===
    W2 -= lr * d_W2; b2 -= lr * d_b2
    W1 -= lr * d_W1; b1 -= lr * d_b1
 
    if epoch % 1000 == 0:
        print(f"Epoch {epoch:4d}: kerugian = {rugi:.6f}")
 
print("\nTebakan akhir:", a2.round(3).ravel())
print("Jawaban benar:", y.ravel())
```
 
### Apa yang Terjadi di Kode Itu
 
**Tahap maju** menghitung tebakan dari masukan, lapisan demi lapisan.
 
**Tahap mundur** menghitung seberapa besar tiap bobot berkontribusi pada kesalahan. Perhatikan pola `d_a1 = d_z2 @ W2.T`. Itulah "menyebarkan kesalahan mundur": kesalahan lapisan kedua diteruskan ke lapisan pertama melalui bobot yang menghubungkannya.
 
**Tahap perbaruan** menggeser tiap bobot berlawanan arah gradiennya, persis seperti gradient descent.
 
Jaringan dengan satu lapisan tersembunyi berhasil menyelesaikan XOR, sesuatu yang mustahil bagi model linear. Inilah kekuatan ketidaklinearan.
 
### Kabar Baiknya
 
Anda tidak perlu menulis ini lagi. PyTorch menghitung seluruh tahap mundur secara otomatis.
 
Tapi memahaminya berguna, karena banyak masalah pelatihan berakar di sini: gradien yang hilang, gradien yang meledak, dan pelatihan yang macet.
 
## Bekerja dengan PyTorch
 
### Kenapa Hanya Satu Framework
 
Ada dua pilihan utama: PyTorch dan TensorFlow/Keras. Keduanya bagus.
 
Untuk pemula, **pilih satu dan dalami**. Belajar keduanya sekaligus hanya membuat bingung, karena istilah dan cara kerjanya berbeda dalam detail kecil.
 
Artikel ini memakai PyTorch karena lebih banyak dipakai di penelitian, dokumentasinya konsisten, dan alur kodenya lebih transparan sehingga lebih mudah dipahami saat ada masalah.
 
```bash
pip install torch torchvision
```
 
### Tensor: Blok Dasar PyTorch
 
Tensor pada dasarnya adalah array NumPy yang bisa berjalan di GPU dan bisa menghitung gradien sendiri.
 
```python
import torch
 
a = torch.tensor([1.0, 2.0, 3.0])
b = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
 
print("Bentuk:", b.shape)
print("Tipe  :", b.dtype)
print("Operasi biasa:", a * 2)
print("Perkalian matriks:\n", b @ b)
 
# Bolak-balik dengan NumPy
import numpy as np
arr = np.array([1.0, 2.0])
t = torch.from_numpy(arr)
kembali = t.numpy()
```
 
### Autograd: Gradien Otomatis
 
Ini fitur inti PyTorch. Anda cukup menulis perhitungan maju, dan PyTorch menghitung gradiennya sendiri.
 
```python
x = torch.tensor(3.0, requires_grad=True)      # tandai untuk dilacak
y = x ** 2 + 2 * x + 1                          # y = x² + 2x + 1
 
y.backward()                                    # hitung gradien
print("Nilai y :", y.item())
print("dy/dx   :", x.grad.item())               # seharusnya 2x + 2 = 8
```
 
Perintah `backward()` inilah yang menggantikan seluruh kode backpropagation manual tadi.
 
### Memeriksa GPU
 
```python
perangkat = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Perangkat:", perangkat)
```
 
Untuk data tabel kecil, CPU sudah cukup. Untuk gambar dan teks, GPU hampir wajib. Google Colab menyediakannya gratis.
 
### Membangun Model dengan nn.Module
 
```python
import torch.nn as nn
 
class JaringanSederhana(nn.Module):
    def __init__(self, n_fitur, n_kelas=2):
        super().__init__()
        self.jaringan = nn.Sequential(
            nn.Linear(n_fitur, 64),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(32, n_kelas),
        )
 
    def forward(self, x):
        return self.jaringan(x)
```
 
**`nn.Linear(a, b)`** adalah lapisan yang menghubungkan `a` masukan ke `b` neuron. Ini yang melakukan perkalian matriks dan penambahan bias.
 
**`nn.Sequential`** menyusun lapisan berurutan, sehingga keluaran satu lapisan otomatis menjadi masukan berikutnya.
 
**`forward`** mendefinisikan alur data. PyTorch memanggilnya otomatis saat Anda menulis `model(x)`.
 
### Perbandingan Langsung dengan Gradient Boosting
 
Sekarang mari buktikan pernyataan di awal artikel.
 
```python
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.metrics import f1_score
import time
 
# Data tabel dengan 20 fitur
X_tab, y_tab = make_classification(
    n_samples=8000, n_features=20, n_informative=10,
    n_redundant=5, n_classes=2, random_state=42)
 
X_tr, X_te, y_tr, y_te = train_test_split(
    X_tab, y_tab, test_size=0.25, stratify=y_tab, random_state=42)
 
skala = StandardScaler().fit(X_tr)
X_tr_s, X_te_s = skala.transform(X_tr), skala.transform(X_te)
```
 
Pertama, gradient boosting.
 
```python
mulai = time.time()
gb = HistGradientBoostingClassifier(random_state=42).fit(X_tr, y_tr)
waktu_gb = time.time() - mulai
f1_gb = f1_score(y_te, gb.predict(X_te))
 
print(f"Gradient Boosting: F1 = {f1_gb:.4f}, waktu = {waktu_gb:.2f} detik")
```
 
Sekarang jaringan saraf.
 
```python
from torch.utils.data import TensorDataset, DataLoader
 
torch.manual_seed(42)
 
X_tr_t = torch.tensor(X_tr_s, dtype=torch.float32)
y_tr_t = torch.tensor(y_tr, dtype=torch.long)
X_te_t = torch.tensor(X_te_s, dtype=torch.float32)
y_te_t = torch.tensor(y_te, dtype=torch.long)
 
loader = DataLoader(TensorDataset(X_tr_t, y_tr_t), batch_size=64, shuffle=True)
 
model = JaringanSederhana(n_fitur=20).to(perangkat)
kriteria = nn.CrossEntropyLoss()
pengoptimal = torch.optim.Adam(model.parameters(), lr=1e-3)
 
mulai = time.time()
for epoch in range(60):
    model.train()
    for batch_x, batch_y in loader:
        batch_x, batch_y = batch_x.to(perangkat), batch_y.to(perangkat)
        pengoptimal.zero_grad()
        keluaran = model(batch_x)
        rugi = kriteria(keluaran, batch_y)
        rugi.backward()
        pengoptimal.step()
waktu_nn = time.time() - mulai
 
model.eval()
with torch.no_grad():
    tebakan = model(X_te_t.to(perangkat)).argmax(1).cpu().numpy()
f1_nn = f1_score(y_te, tebakan)
 
print(f"Jaringan Saraf   : F1 = {f1_nn:.4f}, waktu = {waktu_nn:.2f} detik")
print(f"\nSelisih F1: {f1_gb - f1_nn:+.4f} untuk gradient boosting")
print(f"Gradient boosting {waktu_nn/waktu_gb:.1f}x lebih cepat")
```
 
### Membaca Hasilnya
 
Pada sebagian besar data tabel, gradient boosting akan menang atau setidaknya setara, dengan waktu jauh lebih singkat dan tanpa penyetelan apa pun.
 
Jaringan saraf di atas butuh keputusan tentang jumlah lapisan, jumlah neuron, learning rate, batch size, dropout, dan jumlah epoch. Gradient boosting bekerja langsung dengan pengaturan bawaan.
 
Inilah alasan praktis kenapa untuk data tabel, gradient boosting tetap menjadi pilihan pertama.
 
### Alur Kode PyTorch yang Standar
 
Pola berikut akan Anda tulis berulang kali. Hafalkan strukturnya.
 
```python
def latih_satu_epoch(model, loader, kriteria, pengoptimal, perangkat):
    model.train()                        # aktifkan dropout
    total_rugi, benar, total = 0, 0, 0
 
    for x, y in loader:
        x, y = x.to(perangkat), y.to(perangkat)
 
        pengoptimal.zero_grad()          # 1. bersihkan gradien lama
        keluaran = model(x)              # 2. hitung tebakan
        rugi = kriteria(keluaran, y)     # 3. hitung kerugian
        rugi.backward()                  # 4. hitung gradien
        pengoptimal.step()               # 5. perbarui bobot
 
        total_rugi += rugi.item() * len(y)
        benar += (keluaran.argmax(1) == y).sum().item()
        total += len(y)
 
    return total_rugi / total, benar / total
 
 
def evaluasi(model, loader, kriteria, perangkat):
    model.eval()                         # matikan dropout
    total_rugi, benar, total = 0, 0, 0
 
    with torch.no_grad():                # tidak perlu gradien saat menguji
        for x, y in loader:
            x, y = x.to(perangkat), y.to(perangkat)
            keluaran = model(x)
            rugi = kriteria(keluaran, y)
            total_rugi += rugi.item() * len(y)
            benar += (keluaran.argmax(1) == y).sum().item()
            total += len(y)
 
    return total_rugi / total, benar / total
```
 
### Lima Baris yang Wajib Diingat
 
Urutan lima perintah di dalam perulangan itu **tidak boleh diubah**, dan lupa satu saja membuat pelatihan gagal diam-diam.
 
`zero_grad()` membersihkan gradien lama. PyTorch menumpuk gradien secara bawaan, jadi tanpa ini gradiennya salah.
 
`model(x)` menghitung tebakan.
 
`kriteria(keluaran, y)` menghitung seberapa buruk tebakannya.
 
`backward()` menghitung gradien seluruh parameter.
 
`step()` memperbarui bobot.
 
Selain itu, `model.train()` dan `model.eval()` juga wajib. Dropout dan batch normalization berperilaku berbeda saat pelatihan dan pengujian.
 
## Melatih Model dengan Benar
 
Bagian ini sering lebih menentukan hasil daripada pemilihan arsitektur.
 
### Learning Rate
 
Ini pengaturan paling penting. Kalau salah, tidak ada arsitektur yang bisa menyelamatkan.
 
| Gejala | Kemungkinan penyebab | Tindakan |
|---|---|---|
| Kerugian menjadi `nan` | Learning rate terlalu besar | Turunkan 10 kali lipat |
| Kerugian naik-turun liar | Learning rate terlalu besar | Turunkan 3 sampai 10 kali |
| Kerugian turun sangat lambat | Learning rate terlalu kecil | Naikkan 3 sampai 10 kali |
| Kerugian datar dari awal | Terlalu kecil atau ada bug | Periksa data dan naikkan |
 
Nilai awal yang wajar: `1e-3` untuk Adam, `1e-2` untuk SGD.
 
### Mencari Learning Rate yang Tepat
 
```python
for lr in [1e-1, 1e-2, 1e-3, 1e-4]:
    torch.manual_seed(42)
    m = JaringanSederhana(20).to(perangkat)
    opt = torch.optim.Adam(m.parameters(), lr=lr)
 
    for _ in range(10):
        latih_satu_epoch(m, loader, kriteria, opt, perangkat)
 
    rugi, akurasi = evaluasi(m, DataLoader(TensorDataset(X_te_t, y_te_t),
                                           batch_size=128), kriteria, perangkat)
    print(f"lr={lr:.0e}: rugi={rugi:.4f} akurasi={akurasi:.4f}")
```
 
### Batch Size
 
**Batch kecil** seperti 16 atau 32 memberi pembaruan yang lebih berisik, tapi kadang justru membantu model keluar dari cekungan yang buruk.
 
**Batch besar** seperti 256 atau 512 lebih cepat per epoch dan lebih stabil, tapi butuh memori lebih besar.
 
Mulai dari 32 atau 64. Kalau muncul pesan kehabisan memori GPU, turunkan.
 
### Epoch dan Early Stopping
 
Terlalu sedikit epoch berarti underfitting. Terlalu banyak berarti overfitting.
 
Cara terbaik adalah membiarkan model berhenti sendiri saat sudah tidak membaik.
 
```python
def latih_dengan_early_stopping(model, loader_latih, loader_valid,
                                kriteria, pengoptimal, perangkat,
                                maks_epoch=200, kesabaran=15):
    rugi_terbaik = float("inf")
    bobot_terbaik = None
    tanpa_perbaikan = 0
    riwayat = {"latih": [], "valid": []}
 
    for epoch in range(maks_epoch):
        rl, _ = latih_satu_epoch(model, loader_latih, kriteria,
                                 pengoptimal, perangkat)
        rv, av = evaluasi(model, loader_valid, kriteria, perangkat)
 
        riwayat["latih"].append(rl)
        riwayat["valid"].append(rv)
 
        if rv < rugi_terbaik - 1e-4:
            rugi_terbaik = rv
            bobot_terbaik = {k: v.clone() for k, v in model.state_dict().items()}
            tanpa_perbaikan = 0
        else:
            tanpa_perbaikan += 1
            if tanpa_perbaikan >= kesabaran:
                print(f"Berhenti di epoch {epoch}, kerugian terbaik {rugi_terbaik:.4f}")
                break
 
    if bobot_terbaik:
        model.load_state_dict(bobot_terbaik)      # kembalikan bobot terbaik
    return riwayat
```
 
Perhatikan bagian menyimpan bobot terbaik. Tanpa itu, model yang Anda dapat adalah model di epoch terakhir, yang belum tentu yang terbaik.
 
### Tiga Cara Mengurangi Overfitting
 
**Dropout** secara acak mematikan sebagian neuron saat pelatihan, sehingga model tidak bergantung pada neuron tertentu.
 
```python
nn.Dropout(0.3)      # matikan 30 persen neuron secara acak
```
 
**Weight decay** menghukum bobot yang terlalu besar. Ini padanan regularisasi L2.
 
```python
torch.optim.Adam(model.parameters(), lr=1e-3, weight_decay=1e-4)
```
 
**Batch normalization** menormalkan nilai di tengah jaringan, membuat pelatihan lebih stabil dan sekaligus sedikit mengurangi overfitting.
 
```python
nn.Sequential(
    nn.Linear(20, 64),
    nn.BatchNorm1d(64),
    nn.ReLU(),
    nn.Dropout(0.3),
)
```
 
### Membaca Kurva Pelatihan
 
```python
def gambar_kurva(riwayat):
    plt.figure(figsize=(7, 4))
    plt.plot(riwayat["latih"], label="Data latih")
    plt.plot(riwayat["valid"], label="Data validasi")
    plt.xlabel("Epoch"); plt.ylabel("Kerugian")
    plt.legend(); plt.grid(alpha=0.3)
    plt.title("Kurva pelatihan")
    plt.show()
```
 
**Kedua garis turun dan mendekat.** Pelatihan berjalan baik.
 
**Garis latih turun, garis validasi naik.** Overfitting. Tambah dropout, kurangi ukuran model, atau tambah data.
 
**Kedua garis mendatar tinggi.** Underfitting. Perbesar model atau naikkan learning rate.
 
**Garis naik-turun liar.** Learning rate terlalu besar.
 
### Daftar Periksa Saat Model Tidak Belajar
 
Kalau kerugian tidak turun sama sekali, periksa berurutan:
 
1. Apakah data sudah dinormalisasi? Ini penyebab paling umum.
2. Apakah `zero_grad()` dipanggil tiap langkah?
3. Apakah learning rate masuk akal? Coba `1e-3`.
4. Apakah fungsi kerugian sesuai jenis masalahnya?
5. Coba latih dengan 10 baris data saja. Model yang benar seharusnya bisa menghafalnya sampai kerugian mendekati nol. Kalau tidak bisa, ada bug.
Langkah kelima itu trik yang sangat berguna dan jarang diketahui pemula.
 
## CNN untuk Data Gambar
 
### Kenapa Jaringan Biasa Tidak Cukup
 
Gambar 224 × 224 berwarna punya 150.528 angka. Kalau diratakan lalu dihubungkan ke 1.000 neuron, dibutuhkan 150 juta parameter untuk satu lapisan saja.
 
Selain boros, meratakan gambar juga menghancurkan informasi kedekatan antar piksel.
 
### Ide Konvolusi
 
CNN memakai filter kecil, biasanya 3 × 3, yang digeser ke seluruh gambar. Filter yang sama dipakai di semua posisi.
 
Ini memberi tiga keuntungan: parameter jauh lebih sedikit, hubungan antar piksel terjaga, dan objek tetap dikenali di mana pun posisinya.
 
### Kode Ringkas
 
```python
class CNNSederhana(nn.Module):
    def __init__(self, n_kelas=10):
        super().__init__()
        self.fitur = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.BatchNorm2d(32), nn.ReLU(),
            nn.MaxPool2d(2),                                   # 32x32 -> 16x16
 
            nn.Conv2d(32, 64, 3, padding=1), nn.BatchNorm2d(64), nn.ReLU(),
            nn.MaxPool2d(2),                                   # 16x16 -> 8x8
 
            nn.Conv2d(64, 128, 3, padding=1), nn.BatchNorm2d(128), nn.ReLU(),
            nn.AdaptiveAvgPool2d(1),                           # jadi 1x1
        )
        self.pengklasifikasi = nn.Linear(128, n_kelas)
 
    def forward(self, x):
        x = self.fitur(x)
        return self.pengklasifikasi(x.flatten(1))
 
cnn = CNNSederhana()
print("Jumlah parameter:", sum(p.numel() for p in cnn.parameters()))
```
 
Penggunaan `AdaptiveAvgPool2d(1)` adalah trik praktis: apapun ukuran gambar masuknya, keluarannya selalu 1 × 1, sehingga Anda tidak perlu menghitung dimensi secara manual.
 
Pembahasan lebih lengkap tentang CNN, augmentasi gambar, dan transfer learning untuk gambar ada di materi terpisah tentang computer vision.
 
## RNN dan LSTM untuk Data Berurutan
 
### Masalah yang Diselesaikan
 
Untuk data berurutan seperti kalimat atau deret waktu, urutan itu penting dan panjangnya berbeda-beda.
 
Jaringan biasa butuh masukan berukuran tetap dan tidak punya konsep urutan.
 
### Ide RNN
 
RNN memproses data satu langkah pada satu waktu, sambil membawa **ingatan** dari langkah sebelumnya.
 
Analoginya seperti membaca kalimat kata demi kata. Saat membaca kata kelima, Anda masih mengingat empat kata sebelumnya, dan ingatan itu mempengaruhi pemahaman Anda.
 
### Kelemahan RNN Biasa
 
RNN sederhana **mudah lupa**. Saat memproses kalimat panjang, informasi dari awal kalimat memudar sebelum sampai ke akhir.
 
Penyebabnya teknis: gradien yang disebarkan mundur melewati banyak langkah menjadi sangat kecil dan akhirnya hilang. Ini disebut masalah gradien menghilang.
 
### LSTM: Ingatan dengan Gerbang
 
LSTM memperbaikinya dengan menambahkan **gerbang** yang mengatur aliran informasi.
 
Ada tiga gerbang, dan cara mengingatnya sederhana:
 
**Gerbang lupa** memutuskan informasi lama mana yang dibuang.
 
**Gerbang masukan** memutuskan informasi baru mana yang disimpan.
 
**Gerbang keluaran** memutuskan bagian mana dari ingatan yang dipakai sekarang.
 
Analoginya seperti buku catatan. Anda mencoret yang tidak relevan, menambahkan catatan baru yang penting, lalu membaca bagian yang dibutuhkan saat ini.
 
### Kodenya
 
```python
class ModelLSTM(nn.Module):
    def __init__(self, n_fitur, ukuran_ingatan=64, n_lapisan=2, n_kelas=2):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size=n_fitur,
            hidden_size=ukuran_ingatan,
            num_layers=n_lapisan,
            batch_first=True,          # bentuk (batch, panjang, fitur)
            dropout=0.2,
        )
        self.keluaran = nn.Linear(ukuran_ingatan, n_kelas)
 
    def forward(self, x):
        hasil, (ingatan_akhir, _) = self.lstm(x)
        return self.keluaran(ingatan_akhir[-1])     # pakai ingatan lapisan terakhir
 
# Contoh: 32 urutan, masing-masing 20 langkah, 5 fitur per langkah
model_lstm = ModelLSTM(n_fitur=5)
contoh = torch.randn(32, 20, 5)
print("Bentuk keluaran:", model_lstm(contoh).shape)
```
 
Argumen `batch_first=True` sangat disarankan. Tanpa itu, PyTorch mengharapkan urutan dimensi yang berbeda dan sering membingungkan pemula.
 
### Kapan LSTM Masih Dipakai
 
Untuk teks, LSTM sudah banyak digantikan transformer.
 
Tapi LSTM masih relevan untuk deret waktu numerik, data sensor, dan kasus dengan data terbatas. LSTM juga jauh lebih ringan daripada transformer.
 
Untuk deret waktu sederhana, jangan lupa bahwa gradient boosting dengan fitur lag sering mengalahkan LSTM.
 
## Transformer
 
### Masalah RNN yang Diselesaikan
 
RNN punya dua kelemahan mendasar.
 
**Tidak bisa diparalelkan.** Karena harus memproses berurutan, langkah ke-100 tidak bisa dihitung sebelum langkah ke-99 selesai. Ini membuat pelatihan lambat.
 
**Konteks jauh tetap sulit.** Meski LSTM lebih baik daripada RNN, hubungan antar kata yang berjauhan tetap melemah.
 
### Ide Attention
 
Transformer membuang konsep memproses berurutan. Sebagai gantinya, **semua bagian dilihat sekaligus**, dan model menghitung seberapa besar tiap bagian harus memperhatikan bagian lain.
 
#### Analogi
 
Bayangkan kalimat: "Andi memberikan buku kepada Budi karena **dia** sudah selesai membacanya."
 
Untuk memahami kata "dia", Anda otomatis menoleh ke "Andi". Anda memberi perhatian lebih pada kata itu dibanding kata lain.
 
Attention menghitung hal itu untuk setiap kata terhadap setiap kata lain, sekaligus dalam satu operasi.
 
### Kenapa Ini Penting
 
**Bisa diparalelkan sepenuhnya.** Semua posisi dihitung bersamaan, sehingga pelatihan jauh lebih cepat di GPU.
 
**Konteks jauh sama kuatnya.** Kata pertama dan kata keseratus punya hubungan langsung, tidak melewati 99 langkah perantara.
 
Kedua sifat inilah yang memungkinkan model raksasa seperti GPT dan BERT dilatih.
 
### Contoh Sederhana
 
PyTorch menyediakan lapisan transformer siap pakai.
 
```python
class ModelTransformer(nn.Module):
    def __init__(self, n_fitur, d_model=64, n_kepala=4, n_lapisan=2, n_kelas=2):
        super().__init__()
        self.proyeksi = nn.Linear(n_fitur, d_model)
 
        lapisan = nn.TransformerEncoderLayer(
            d_model=d_model,
            nhead=n_kepala,              # jumlah "sudut pandang" attention
            dim_feedforward=128,
            dropout=0.1,
            batch_first=True,
        )
        self.encoder = nn.TransformerEncoder(lapisan, num_layers=n_lapisan)
        self.keluaran = nn.Linear(d_model, n_kelas)
 
    def forward(self, x):
        x = self.proyeksi(x)
        x = self.encoder(x)
        return self.keluaran(x.mean(dim=1))       # rata-ratakan semua posisi
 
model_tf = ModelTransformer(n_fitur=5)
print("Bentuk keluaran:", model_tf(torch.randn(32, 20, 5)).shape)
```
 
### Catatan Praktis
 
Anda hampir tidak akan pernah melatih transformer dari nol. Modelnya butuh data sangat besar dan komputasi yang mahal.
 
Yang dilakukan praktisi adalah mengambil model yang sudah dilatih, lalu menyesuaikannya. Itulah transfer learning, yang dibahas berikutnya.
 
## Transfer Learning
 
### Kenapa Ini Konsep Paling Praktis
 
Melatih model dari nol butuh jutaan contoh dan berhari-hari komputasi. Sebagian besar orang tidak punya keduanya.
 
Transfer learning menyelesaikannya: ambil model yang sudah dilatih orang lain, lalu sesuaikan untuk masalah Anda.
 
### Analogi
 
Bayangkan merekrut penerjemah berpengalaman yang sudah menguasai bahasa Indonesia dan Inggris, lalu mengajarinya istilah khusus bidang hukum.
 
Itu jauh lebih cepat daripada mengajari seseorang bahasa Inggris dari nol.
 
### Dua Cara Memakainya
 
**Feature extraction.** Bekukan seluruh model, ganti hanya lapisan terakhir. Cepat, cocok kalau data Anda sedikit.
 
**Fine-tuning.** Latih ulang seluruh model dengan learning rate sangat kecil. Lebih akurat, cocok kalau data Anda cukup banyak.
 
### Contoh untuk Gambar
 
```python
from torchvision import models
from torchvision.models import ResNet18_Weights
 
model_asal = models.resnet18(weights=ResNet18_Weights.DEFAULT)
 
# Feature extraction: bekukan semua
for p in model_asal.parameters():
    p.requires_grad = False
 
# Ganti lapisan terakhir sesuai jumlah kelas kita
model_asal.fc = nn.Linear(model_asal.fc.in_features, 5)
 
bisa_dilatih = sum(p.numel() for p in model_asal.parameters() if p.requires_grad)
total = sum(p.numel() for p in model_asal.parameters())
print(f"Dilatih: {bisa_dilatih:,} dari {total:,} parameter ({bisa_dilatih/total:.2%})")
```
 
### Contoh untuk Teks
 
```python
# pip install transformers
from transformers import AutoTokenizer, AutoModelForSequenceClassification
 
nama = "indobenchmark/indobert-base-p1"
tokenizer = AutoTokenizer.from_pretrained(nama)
model_teks = AutoModelForSequenceClassification.from_pretrained(nama, num_labels=2)
```
 
### Aturan Penting: Learning Rate Harus Kecil
 
Model asal sudah punya pengetahuan berharga. Learning rate besar akan merusaknya dalam beberapa langkah pertama.
 
Untuk fine-tuning, pakai kisaran `1e-5` sampai `1e-4`. Bandingkan dengan `1e-3` yang biasa dipakai saat melatih dari nol.
 
### Aturan Penting Lain: Preprocessing Harus Sama
 
Model yang dilatih dengan normalisasi tertentu harus dipakai dengan normalisasi yang sama. Memakai angka berbeda menurunkan performa secara diam-diam tanpa pesan error apa pun.
 
## Memilih Arsitektur
 
| Jenis data Anda | Pilihan pertama | Alternatif |
|---|---|---|
| Tabel, puluhan kolom | Gradient boosting | Jaringan saraf sederhana |
| Tabel, sangat besar dan kompleks | Gradient boosting | Jaringan saraf dalam |
| Gambar | Transfer learning CNN | CNN dari nol |
| Teks | Transfer learning transformer | TF-IDF + model biasa |
| Deret waktu numerik | Gradient boosting + lag | LSTM |
| Audio | CNN pada spektrogram | Transformer |
| Data campuran | Gradient boosting | Jaringan multi-masukan |
 
### Urutan yang Disarankan untuk Pemula
 
**Langkah 1.** Pastikan masalah Anda memang cocok untuk deep learning. Untuk data tabel, coba gradient boosting dulu.
 
**Langkah 2.** Kalau memang cocok, cari model pra-latih. Jangan melatih dari nol.
 
**Langkah 3.** Mulai dari feature extraction yang sederhana dan cepat.
 
**Langkah 4.** Kalau perlu lebih akurat dan data cukup, lakukan fine-tuning.
 
**Langkah 5.** Melatih arsitektur sendiri dari nol adalah pilihan terakhir, dan jarang dibutuhkan di luar penelitian.
 
## Kesalahan Pemula yang Sering Terjadi
 
### Memakai Deep Learning untuk Data Tabel
 
Ini kesalahan yang paling menghabiskan waktu. Gradient boosting biasanya lebih baik, lebih cepat, dan butuh penyetelan jauh lebih sedikit.
 
### Melatih dari Nol Padahal Ada Model Pra-latih
 
Untuk hampir semua kasus praktis, transfer learning lebih baik. Melatih dari nol butuh data dan komputasi yang tidak sepadan.
 
### Lupa Memanggil model.eval()
 
Dropout dan batch normalization berperilaku berbeda saat menguji. Lupa memanggilnya membuat hasil evaluasi salah.
 
### Lupa zero_grad()
 
PyTorch menumpuk gradien secara bawaan. Tanpa membersihkannya, model tidak pernah belajar dengan benar dan tidak ada pesan error apa pun.
 
### Tidak Menormalisasi Data
 
Ini penyebab nomor satu model tidak belajar. Jaringan saraf sangat sensitif terhadap skala masukan.
 
### Learning Rate Terlalu Besar
 
Gejalanya jelas: kerugian menjadi `nan` atau naik-turun liar. Turunkan sepuluh kali lipat.
 
### Model Terlalu Besar untuk Data yang Sedikit
 
Jaringan dengan jutaan parameter pada 500 baris data akan menghafal seluruhnya. Sesuaikan ukuran model dengan jumlah data.
 
### Tidak Memakai Early Stopping
 
Tanpa itu, Anda hanya menebak jumlah epoch yang tepat, dan model akhir belum tentu yang terbaik.
 
### Membandingkan Model dengan Data Uji Berkali-kali
 
Setiap kali Anda menyetel sesuatu berdasarkan skor data uji, data itu tercemar. Pakai data validasi terpisah.
 
### Menyalin Arsitektur Rumit Tanpa Memahaminya
 
Model dengan 50 lapisan yang disalin dari internet biasanya tidak cocok untuk data Anda. Mulai dari yang sederhana, perbesar hanya kalau terbukti perlu.
 
## Penutup
 
Deep learning adalah alat yang sangat kuat, tapi hanya untuk jenis masalah tertentu. Memahami kapan **tidak** memakainya sama pentingnya dengan memahami cara memakainya.
 
Tiga hal untuk diingat:
 
**Pertama**, untuk data tabel, coba gradient boosting dulu. Deep learning baru masuk akal untuk gambar, teks, audio, dan data lain yang strukturnya tidak bisa diringkas menjadi kolom-kolom terpisah.
 
**Kedua**, hampir selalu mulai dari transfer learning. Model yang sudah dilatih dengan sumber daya besar bisa dipinjam, dan itu menghemat waktu serta menghasilkan model yang lebih baik daripada melatih dari nol.
 
**Ketiga**, sebagian besar kegagalan dalam deep learning bukan karena arsitekturnya kurang canggih, melainkan karena data tidak dinormalisasi, learning rate salah, atau evaluasinya keliru. Kuasai dasar-dasar itu dulu, dan arsitektur rumit bisa menyusul belakangan.
 