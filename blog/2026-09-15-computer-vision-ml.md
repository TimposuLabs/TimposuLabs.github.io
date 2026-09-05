---
slug: computer-vision-ml
title: "Computer Vision: Panduan Machine Learning untuk Pemula #14"
authors: topekox
tags: [manchine learning, data mining, ai, data science, deep learning, python]
---

Sampai sekitar tahun 2012, mengajari komputer mengenali kucing dalam foto adalah masalah yang sangat sulit. Sekarang bisa diselesaikan dalam beberapa puluh baris kode.
 
Yang mengubah segalanya adalah dua ide: **CNN**, arsitektur yang dirancang khusus untuk gambar, dan **transfer learning**, cara memakai model yang sudah dilatih orang lain.
 
Artikel ini membahas keduanya beserta augmentasi gambar, teknik yang membuat model tetap bisa dilatih meski data Anda sedikit. Semuanya dijelaskan dari nol, tanpa asumsi Anda pernah menyentuh deep learning.

<!-- truncate -->

## Daftar Isi
 
1. Kenapa Gambar Berbeda dari Data Tabel
2. Istilah Dasar yang Perlu Dipahami
3. Menyiapkan Alat dan Data
4. Kenapa Perlu CNN
5. Membangun CNN dari Nol
6. Augmentasi Gambar
7. Transfer Learning
8. Mengevaluasi Model Gambar
9. Tugas Computer Vision Lainnya
10. Kesalahan Pemula yang Sering Terjadi

## Kenapa Gambar Berbeda dari Data Tabel
 
### Gambar Sebenarnya Adalah Angka
 
Ini hal pertama yang perlu dipahami. Gambar yang Anda lihat di layar sebenarnya hanyalah tabel angka.
 
```python
import numpy as np
import matplotlib.pyplot as plt
 
# Membuat gambar kecil 8x8 secara manual
gambar = np.array([
    [  0,   0,   0,   0,   0,   0,   0,   0],
    [  0,   0, 255, 255, 255, 255,   0,   0],
    [  0, 255,   0,   0,   0,   0, 255,   0],
    [  0, 255,   0, 255, 255,   0, 255,   0],
    [  0, 255,   0,   0,   0,   0, 255,   0],
    [  0, 255, 255, 255, 255, 255, 255,   0],
    [  0,   0, 255,   0,   0, 255,   0,   0],
    [  0,   0,   0,   0,   0,   0,   0,   0],
], dtype=np.uint8)
 
fig, ax = plt.subplots(1, 2, figsize=(10, 4))
ax[0].imshow(gambar, cmap="gray")
ax[0].set_title("Yang dilihat manusia")
ax[1].imshow(gambar, cmap="gray")
for i in range(8):
    for j in range(8):
        ax[1].text(j, i, gambar[i, j], ha="center", va="center",
                   color="red", fontsize=7)
ax[1].set_title("Yang dilihat komputer")
plt.tight_layout()
plt.show()
```
 
Tiap angka disebut **piksel**, dan nilainya berkisar dari 0 (hitam) sampai 255 (putih).
 
### Gambar Berwarna Punya Tiga Lapis
 
Gambar berwarna sebenarnya tiga tabel angka yang ditumpuk: merah, hijau, dan biru. Tiap lapis disebut **channel**.
 
```python
gambar_warna = np.zeros((100, 100, 3), dtype=np.uint8)
gambar_warna[:50, :50, 0] = 255      # kotak kiri atas: merah
gambar_warna[:50, 50:, 1] = 255      # kanan atas: hijau
gambar_warna[50:, :50, 2] = 255      # kiri bawah: biru
gambar_warna[50:, 50:] = 255         # kanan bawah: putih (semua channel)
 
print("Bentuk gambar:", gambar_warna.shape)   # (tinggi, lebar, channel)
plt.imshow(gambar_warna)
plt.title("Gambar berwarna = 3 lapis angka")
plt.show()
```
 
### Kenapa Model Biasa Gagal
 
Anda mungkin berpikir: kalau gambar hanyalah angka, kenapa tidak diratakan saja jadi satu baris panjang lalu dimasukkan ke Random Forest?
 
Ada dua masalah besar.
 
**Masalah pertama: jumlah fitur meledak.** Gambar berukuran 224 × 224 piksel berwarna punya 224 × 224 × 3 = 150.528 angka. Itu 150 ribu kolom untuk satu gambar.
 
**Masalah kedua: hubungan antar piksel hilang.** Saat gambar diratakan, piksel yang bersebelahan secara vertikal jadi berjauhan dalam deretan angka. Padahal justru kedekatan itulah yang membentuk bentuk dan tepi.
 
```python
# Ilustrasi masalah kedua
kecil = np.arange(16).reshape(4, 4)
print("Sebagai gambar:\n", kecil)
print("\nSetelah diratakan:", kecil.flatten())
print("\nAngka 1 dan 5 bersebelahan di gambar, tapi berjarak 4 posisi setelah diratakan")
```
 
**Masalah ketiga: geseran kecil mengubah segalanya.** Kalau objek dalam gambar bergeser 5 piksel ke kanan, seluruh deretan angka berubah. Bagi model biasa, itu gambar yang sama sekali berbeda.
 
CNN dirancang khusus untuk menyelesaikan ketiga masalah ini.
 
## Istilah Dasar yang Perlu Dipahami
 
### Piksel, Resolusi, Channel
 
**Piksel** adalah satu titik warna, satuan terkecil gambar.
 
**Resolusi** adalah ukuran gambar dalam piksel, misalnya 224 × 224.
 
**Channel** adalah jumlah lapisan warna. Gambar abu-abu punya 1 channel, gambar berwarna punya 3.
 
### Bentuk Data Gambar
 
Dalam deep learning, sekumpulan gambar disimpan sebagai kotak angka empat dimensi.
 
PyTorch memakai urutan `(N, C, H, W)`:
 
- **N** adalah jumlah gambar dalam satu kelompok
- **C** adalah jumlah channel
- **H** adalah tinggi
- **W** adalah lebar
Jadi bentuk `(32, 3, 224, 224)` berarti 32 gambar berwarna berukuran 224 × 224.
 
TensorFlow memakai urutan berbeda, yaitu `(N, H, W, C)`. Perbedaan ini sering jadi sumber kebingungan saat berpindah pustaka.
 
### Normalisasi
 
Nilai piksel 0 sampai 255 terlalu besar untuk pelatihan yang stabil. Nilainya perlu diperkecil.
 
Cara paling sederhana adalah membagi 255 supaya jadi 0 sampai 1. Cara yang lebih umum adalah standardisasi memakai rata-rata dan standar deviasi tertentu.
 
Ini bukan sekadar formalitas. Tanpa normalisasi, pelatihan bisa gagal konvergen sama sekali.
 
### Batch dan Epoch
 
**Batch** adalah sekelompok gambar yang diproses bersamaan. Ukuran batch 32 berarti model melihat 32 gambar sekaligus tiap langkah.
 
**Epoch** adalah satu putaran penuh melewati seluruh data latih.
 
## Menyiapkan Alat dan Data
 
### Memilih Pustaka
 
Ada dua pilihan utama: **PyTorch** dan **TensorFlow/Keras**.
 
Untuk pemula, saya sarankan memilih satu saja dan mendalaminya. Artikel ini memakai PyTorch karena sekarang lebih banyak dipakai di penelitian dan dokumentasinya lebih konsisten.
 
```bash
pip install torch torchvision matplotlib
```
 
### Memeriksa GPU
 
Deep learning untuk gambar sangat lambat tanpa GPU. Kalau komputer Anda tidak punya, pakai Google Colab yang menyediakannya gratis.
 
```python
import torch
 
perangkat = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Perangkat yang dipakai:", perangkat)
if perangkat.type == "cuda":
    print("Nama GPU:", torch.cuda.get_device_name(0))
```
 
### Menyiapkan Data Contoh
 
Kita akan memakai CIFAR-10, kumpulan 60.000 gambar kecil dalam 10 kategori. Datanya diunduh otomatis saat pertama dijalankan.
 
```python
import torchvision
import torchvision.transforms as T
from torch.utils.data import DataLoader
 
transformasi_dasar = T.Compose([
    T.ToTensor(),                                    # ubah jadi tensor, skala 0-1
    T.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),   # ubah jadi kisaran -1 sampai 1
])
 
data_latih = torchvision.datasets.CIFAR10(
    root="./data", train=True, download=True, transform=transformasi_dasar)
data_uji = torchvision.datasets.CIFAR10(
    root="./data", train=False, download=True, transform=transformasi_dasar)
 
kelas = ["pesawat", "mobil", "burung", "kucing", "rusa",
         "anjing", "katak", "kuda", "kapal", "truk"]
 
print("Jumlah data latih:", len(data_latih))
print("Jumlah data uji  :", len(data_uji))
print("Bentuk satu gambar:", data_latih[0][0].shape)   # (3, 32, 32)
```
 
### Melihat Gambarnya
 
```python
def tampilkan(dataset, jumlah=8):
    fig, ax = plt.subplots(1, jumlah, figsize=(15, 2.5))
    for i in range(jumlah):
        gambar, label = dataset[i]
        # Kembalikan dari -1..1 ke 0..1, dan ubah urutan channel untuk matplotlib
        img = gambar.permute(1, 2, 0).numpy() * 0.5 + 0.5
        ax[i].imshow(img)
        ax[i].set_title(kelas[label], fontsize=9)
        ax[i].axis("off")
    plt.tight_layout()
    plt.show()
 
tampilkan(data_latih)
```
 
Perhatikan `permute(1, 2, 0)`. PyTorch menyimpan gambar sebagai `(C, H, W)`, sementara matplotlib butuh `(H, W, C)`. Ini penyesuaian yang sering dibutuhkan.
 
### DataLoader
 
`DataLoader` membagi data menjadi batch dan mengacaknya secara otomatis.
 
```python
loader_latih = DataLoader(data_latih, batch_size=64, shuffle=True, num_workers=2)
loader_uji = DataLoader(data_uji, batch_size=128, shuffle=False)
 
gambar, label = next(iter(loader_latih))
print("Bentuk satu batch:", gambar.shape)     # (64, 3, 32, 32)
print("Bentuk label     :", label.shape)      # (64,)
```
 
Perhatikan `shuffle=True` untuk data latih dan `shuffle=False` untuk data uji. Data latih diacak supaya model tidak belajar dari urutan, data uji tidak perlu diacak.
 
## Kenapa Perlu CNN
 
### Ide Dasar Konvolusi
 
Bayangkan Anda mencari sesuatu di dalam gambar besar memakai senter kecil. Anda geser senter itu sedikit demi sedikit, memeriksa tiap bagian.
 
Konvolusi bekerja seperti itu. Sebuah **filter** kecil, biasanya berukuran 3 × 3, digeser ke seluruh gambar. Di tiap posisi, filter itu memeriksa apakah pola tertentu ada di sana.
 
### Melihatnya Langsung
 
Mari buat filter pendeteksi tepi secara manual.
 
```python
from scipy.signal import convolve2d
 
# Gambar sederhana: kotak putih di tengah
gambar = np.zeros((40, 40))
gambar[10:30, 10:30] = 1
 
# Filter pendeteksi tepi
filter_tegak = np.array([[-1, 0, 1],
                         [-2, 0, 2],
                         [-1, 0, 1]])
filter_mendatar = filter_tegak.T
 
hasil_tegak = convolve2d(gambar, filter_tegak, mode="same")
hasil_mendatar = convolve2d(gambar, filter_mendatar, mode="same")
 
fig, ax = plt.subplots(1, 3, figsize=(12, 3.5))
ax[0].imshow(gambar, cmap="gray"); ax[0].set_title("Gambar asli")
ax[1].imshow(np.abs(hasil_tegak), cmap="gray"); ax[1].set_title("Deteksi tepi tegak")
ax[2].imshow(np.abs(hasil_mendatar), cmap="gray"); ax[2].set_title("Deteksi tepi mendatar")
for a in ax: a.axis("off")
plt.tight_layout()
plt.show()
```
 
Filter pertama menyala di tepi kiri dan kanan kotak. Filter kedua menyala di tepi atas dan bawah.
 
### Kunci Pentingnya
 
Pada CNN, **filter tidak dibuat manual**. Model yang menemukannya sendiri selama pelatihan.
 
Model belajar bahwa untuk mengenali kucing, ia perlu filter yang mendeteksi tepi, lalu filter yang menggabungkan tepi menjadi bentuk, lalu filter yang menggabungkan bentuk menjadi telinga dan mata.
 
### Tiga Keunggulan Konvolusi
 
**Hemat parameter.** Filter yang sama dipakai di seluruh bagian gambar.
 
```python
# Perbandingan jumlah parameter
piksel = 224 * 224 * 3
neuron = 1000
 
print(f"Lapisan biasa: {piksel:,} × {neuron:,} = {piksel * neuron:,} parameter")
print(f"Lapisan konvolusi (32 filter 3x3): {3 * 3 * 3 * 32:,} parameter")
```
 
Selisihnya lebih dari seratus ribu kali lipat.
 
**Tahan terhadap geseran.** Karena filter digeser ke seluruh gambar, kucing di pojok kiri dikenali dengan filter yang sama seperti kucing di tengah.
 
**Menjaga hubungan antar piksel.** Filter memeriksa area 3 × 3 sekaligus, sehingga kedekatan piksel tetap terjaga.
 
### Pooling
 
**Pooling** memperkecil ukuran gambar dengan mengambil nilai terbesar dari tiap area kecil.
 
```python
contoh = np.array([
    [1, 3, 2, 4],
    [5, 6, 7, 8],
    [9, 2, 1, 3],
    [4, 5, 6, 7],
])
 
# Max pooling 2x2: ambil nilai terbesar dari tiap kotak 2x2
hasil = np.array([
    [max(1,3,5,6), max(2,4,7,8)],
    [max(9,2,4,5), max(1,3,6,7)],
])
print("Sebelum (4x4):\n", contoh)
print("\nSesudah pooling (2x2):\n", hasil)
```
 
Fungsinya tiga: memperkecil ukuran data sehingga lebih cepat, membuat model lebih tahan terhadap geseran kecil, dan memperluas area yang dilihat lapisan berikutnya.
 
### Susunan CNN yang Umum
 
Pola yang hampir selalu dipakai:
 
```
Gambar masuk
  → Konvolusi → Aktivasi → Pooling      (mendeteksi tepi sederhana)
  → Konvolusi → Aktivasi → Pooling      (menggabungkan jadi bentuk)
  → Konvolusi → Aktivasi → Pooling      (menggabungkan jadi objek)
  → Diratakan
  → Lapisan biasa
  → Keluaran (probabilitas tiap kelas)
```
 
Semakin dalam, semakin abstrak yang dikenali. Lapisan awal mengenali tepi dan warna, lapisan tengah mengenali tekstur dan pola, lapisan akhir mengenali bagian objek.
 
## Membangun CNN dari Nol
 
### Kodenya
 
```python
import torch.nn as nn
import torch.nn.functional as F
 
class CNNSederhana(nn.Module):
    def __init__(self, jumlah_kelas=10):
        super().__init__()
 
        # Blok 1: 3 channel masuk, 32 filter keluar
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(32)
 
        # Blok 2
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(64)
 
        # Blok 3
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        self.bn3 = nn.BatchNorm2d(128)
 
        self.pool = nn.MaxPool2d(2, 2)
        self.dropout = nn.Dropout(0.4)
 
        # Setelah 3x pooling: 32 -> 16 -> 8 -> 4
        self.fc1 = nn.Linear(128 * 4 * 4, 256)
        self.fc2 = nn.Linear(256, jumlah_kelas)
 
    def forward(self, x):
        x = self.pool(F.relu(self.bn1(self.conv1(x))))   # 32x32 -> 16x16
        x = self.pool(F.relu(self.bn2(self.conv2(x))))   # 16x16 -> 8x8
        x = self.pool(F.relu(self.bn3(self.conv3(x))))   # 8x8 -> 4x4
        x = x.flatten(1)                                  # ratakan
        x = self.dropout(F.relu(self.fc1(x)))
        return self.fc2(x)
 
model = CNNSederhana().to(perangkat)
print(model)
print("\nJumlah parameter:", sum(p.numel() for p in model.parameters()))
```
 
### Penjelasan Tiap Bagian
 
**`nn.Conv2d(3, 32, kernel_size=3, padding=1)`** membuat lapisan konvolusi. Angka 3 adalah jumlah channel masuk, 32 adalah jumlah filter yang dipelajari, `kernel_size=3` berarti filter 3 × 3, dan `padding=1` menjaga ukuran gambar tidak menyusut.
 
**`nn.BatchNorm2d`** menormalkan nilai di tengah jaringan. Ini membuat pelatihan jauh lebih stabil dan cepat. Hampir selalu dipakai pada CNN modern.
 
**`F.relu`** adalah fungsi aktivasi. Cara kerjanya sederhana: nilai negatif dijadikan nol, nilai positif dibiarkan. Tanpa aktivasi, seluruh jaringan akan runtuh menjadi satu operasi linear.
 
**`nn.MaxPool2d(2, 2)`** memperkecil ukuran gambar menjadi separuhnya.
 
**`nn.Dropout(0.4)`** secara acak mematikan 40 persen neuron saat pelatihan. Ini mencegah model terlalu bergantung pada neuron tertentu, sehingga mengurangi overfitting.
 
**`flatten(1)`** meratakan hasil konvolusi menjadi satu deretan sebelum masuk lapisan biasa.
 
### Menghitung Ukuran Setelah Konvolusi
 
Ini yang paling sering menyebabkan error pada pemula. Kalau angka pada `nn.Linear` salah, program akan berhenti dengan pesan tentang ketidakcocokan bentuk.
 
Cara memeriksanya:
 
```python
contoh = torch.randn(1, 3, 32, 32)
x = model.pool(F.relu(model.bn1(model.conv1(contoh))))
print("Setelah blok 1:", x.shape)
x = model.pool(F.relu(model.bn2(model.conv2(x))))
print("Setelah blok 2:", x.shape)
x = model.pool(F.relu(model.bn3(model.conv3(x))))
print("Setelah blok 3:", x.shape)
print("Setelah diratakan:", x.flatten(1).shape)
```
 
Angka terakhir itulah yang harus dipakai pada `nn.Linear` pertama.
 
### Melatih Model
 
```python
import torch.optim as optim
 
kriteria = nn.CrossEntropyLoss()
pengoptimal = optim.Adam(model.parameters(), lr=0.001)
 
def latih_satu_epoch(model, loader, kriteria, pengoptimal, perangkat):
    model.train()                      # aktifkan dropout dan batchnorm mode latih
    total_rugi, benar, total = 0, 0, 0
 
    for gambar, label in loader:
        gambar, label = gambar.to(perangkat), label.to(perangkat)
 
        pengoptimal.zero_grad()        # bersihkan gradien lama
        keluaran = model(gambar)       # prediksi
        rugi = kriteria(keluaran, label)
        rugi.backward()                # hitung gradien
        pengoptimal.step()             # perbarui parameter
 
        total_rugi += rugi.item() * label.size(0)
        benar += (keluaran.argmax(1) == label).sum().item()
        total += label.size(0)
 
    return total_rugi / total, benar / total
 
def evaluasi(model, loader, kriteria, perangkat):
    model.eval()                       # matikan dropout
    total_rugi, benar, total = 0, 0, 0
 
    with torch.no_grad():              # tidak perlu hitung gradien saat menguji
        for gambar, label in loader:
            gambar, label = gambar.to(perangkat), label.to(perangkat)
            keluaran = model(gambar)
            rugi = kriteria(keluaran, label)
 
            total_rugi += rugi.item() * label.size(0)
            benar += (keluaran.argmax(1) == label).sum().item()
            total += label.size(0)
 
    return total_rugi / total, benar / total
```
 
### Menjalankan Pelatihan
 
```python
riwayat = {"rugi_latih": [], "rugi_uji": [], "akurasi_latih": [], "akurasi_uji": []}
 
for epoch in range(15):
    rl, al = latih_satu_epoch(model, loader_latih, kriteria, pengoptimal, perangkat)
    ru, au = evaluasi(model, loader_uji, kriteria, perangkat)
 
    riwayat["rugi_latih"].append(rl); riwayat["rugi_uji"].append(ru)
    riwayat["akurasi_latih"].append(al); riwayat["akurasi_uji"].append(au)
 
    print(f"Epoch {epoch+1:2d} | "
          f"rugi latih {rl:.4f} akurasi {al:.4f} | "
          f"rugi uji {ru:.4f} akurasi {au:.4f}")
```
 
### Dua Perintah Penting yang Sering Dilupakan
 
**`model.train()` dan `model.eval()`.** Dropout dan BatchNorm berperilaku berbeda saat pelatihan dan pengujian. Lupa memanggil `model.eval()` sebelum menguji akan menghasilkan skor yang salah.
 
**`pengoptimal.zero_grad()`.** PyTorch menumpuk gradien secara bawaan. Kalau tidak dibersihkan tiap langkah, gradiennya salah dan pelatihan gagal.
 
### Membaca Kurva Pelatihan
 
```python
fig, ax = plt.subplots(1, 2, figsize=(12, 4))
 
ax[0].plot(riwayat["rugi_latih"], label="Latih")
ax[0].plot(riwayat["rugi_uji"], label="Uji")
ax[0].set_xlabel("Epoch"); ax[0].set_ylabel("Rugi")
ax[0].set_title("Kurva kerugian"); ax[0].legend(); ax[0].grid(alpha=0.3)
 
ax[1].plot(riwayat["akurasi_latih"], label="Latih")
ax[1].plot(riwayat["akurasi_uji"], label="Uji")
ax[1].set_xlabel("Epoch"); ax[1].set_ylabel("Akurasi")
ax[1].set_title("Kurva akurasi"); ax[1].legend(); ax[1].grid(alpha=0.3)
 
plt.tight_layout()
plt.show()
```
 
#### Empat Pola yang Perlu Dikenali
 
**Kedua garis turun bersamaan dan mendekat.** Pelatihan berjalan baik.
 
**Garis latih terus turun tapi garis uji mulai naik.** Ini overfitting. Model mulai menghafal. Hentikan pelatihan, tambah augmentasi, atau perbesar dropout.
 
**Kedua garis mendatar di nilai tinggi.** Underfitting. Model terlalu sederhana, atau learning rate terlalu kecil.
 
**Garis naik-turun liar.** Learning rate terlalu besar. Turunkan sepuluh kali lipat.
 
## Augmentasi Gambar
 
### Masalah yang Diselesaikan
 
Deep learning butuh banyak data. Kalau Anda hanya punya 500 foto, model akan menghafalnya alih-alih belajar.
 
Tapi mengumpulkan ribuan foto tambahan itu mahal dan lama.
 
### Idenya
 
Buat variasi baru dari gambar yang sudah ada. Foto kucing yang dibalik horizontal tetaplah foto kucing, tapi bagi model itu gambar baru.
 
Dengan augmentasi, satu foto bisa menghasilkan ratusan variasi.
 
### Manfaat Lain yang Sama Pentingnya
 
Augmentasi juga mengajari model untuk **tidak peduli** pada hal yang memang tidak penting.
 
Kalau semua foto kucing dalam data latih menghadap ke kanan, model bisa saja belajar bahwa "menghadap kanan" adalah ciri kucing. Dengan augmentasi pembalikan, model dipaksa belajar ciri yang sebenarnya.
 
### Jenis Augmentasi yang Umum
 
```python
import torchvision.transforms as T
 
augmentasi = T.Compose([
    T.RandomHorizontalFlip(p=0.5),           # balik kiri-kanan
    T.RandomRotation(degrees=15),            # putar sedikit
    T.RandomResizedCrop(32, scale=(0.8, 1.0)),  # potong lalu perbesar
    T.ColorJitter(brightness=0.2, contrast=0.2,
                  saturation=0.2, hue=0.05),  # ubah warna
    T.ToTensor(),
    T.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
    T.RandomErasing(p=0.25),                 # hapus bagian acak
])
```
 
| Augmentasi | Efeknya | Kapan berguna |
|---|---|---|
| `RandomHorizontalFlip` | Membalik kiri-kanan | Hampir selalu, kecuali teks dan angka |
| `RandomRotation` | Memutar sedikit | Kalau objek bisa miring |
| `RandomResizedCrop` | Memotong dan memperbesar | Hampir selalu, sangat efektif |
| `ColorJitter` | Mengubah kecerahan dan warna | Kalau pencahayaan bervariasi |
| `RandomErasing` | Menutup bagian gambar | Melatih model tahan objek terhalang |
| `RandomVerticalFlip` | Membalik atas-bawah | Jarang, hanya untuk citra satelit |
 
### Augmentasi yang Harus Dihindari
 
Ini bagian yang sering diabaikan pemula.
 
**Jangan balik horizontal pada teks, angka, atau huruf.** Angka 2 yang dibalik bukan angka apa pun. Model akan belajar hal yang salah.
 
**Hati-hati pada citra medis.** Jantung berada di sebelah kiri. Membalik foto rontgen menciptakan kondisi anatomis yang tidak ada dalam kenyataan.
 
**Jangan putar terlalu jauh pada objek yang punya orientasi tetap.** Foto mobil yang diputar 90 derajat tidak akan pernah muncul di data nyata.
 
**Jangan ubah warna kalau warna adalah cirinya.** Kalau Anda membedakan buah matang dan mentah dari warnanya, `ColorJitter` yang agresif justru menghapus sinyalnya.
 
Aturan praktisnya: **augmentasi harus menghasilkan gambar yang mungkin muncul di dunia nyata**.
 
### Aturan Paling Penting
 
**Augmentasi hanya diterapkan pada data latih, tidak pernah pada data uji.**
 
Data uji harus mencerminkan kondisi nyata. Kalau diaugmentasi, hasil pengukuran Anda jadi tidak berarti.
 
```python
# Dua transformasi berbeda untuk dua keperluan berbeda
transformasi_latih = T.Compose([
    T.RandomHorizontalFlip(),
    T.RandomResizedCrop(32, scale=(0.8, 1.0)),
    T.ColorJitter(brightness=0.2, contrast=0.2),
    T.ToTensor(),
    T.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
])
 
transformasi_uji = T.Compose([          # tanpa augmentasi
    T.ToTensor(),
    T.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
])
 
data_latih_aug = torchvision.datasets.CIFAR10(
    root="./data", train=True, download=True, transform=transformasi_latih)
data_uji_bersih = torchvision.datasets.CIFAR10(
    root="./data", train=False, download=True, transform=transformasi_uji)
```
 
### Melihat Hasil Augmentasi
 
Selalu periksa secara visual sebelum memakainya. Augmentasi yang terlalu ekstrem bisa merusak gambar sampai tidak dikenali lagi.
 
```python
from PIL import Image
 
gambar_asli = Image.fromarray(data_latih.data[7])
augment_lihat = T.Compose([
    T.RandomHorizontalFlip(),
    T.RandomRotation(15),
    T.RandomResizedCrop(32, scale=(0.7, 1.0)),
    T.ColorJitter(brightness=0.3, contrast=0.3),
])
 
fig, ax = plt.subplots(1, 8, figsize=(15, 2.5))
ax[0].imshow(gambar_asli); ax[0].set_title("Asli"); ax[0].axis("off")
for i in range(1, 8):
    ax[i].imshow(augment_lihat(gambar_asli))
    ax[i].set_title(f"Variasi {i}", fontsize=8)
    ax[i].axis("off")
plt.tight_layout()
plt.show()
```
 
Tanyakan pada diri sendiri: apakah semua variasi ini masih jelas termasuk kategori yang sama? Kalau ada yang sudah tidak jelas, kurangi tingkat augmentasinya.
 
## Transfer Learning
 
### Masalah yang Diselesaikan
 
Melatih CNN dari nol butuh jutaan gambar dan berhari-hari komputasi. Kalau Anda hanya punya 500 foto, hasilnya akan buruk.
 
Transfer learning menyelesaikan ini dengan cara yang elegan.
 
### Idenya
 
Ambil model yang sudah dilatih dengan jutaan gambar, lalu sesuaikan sedikit untuk masalah Anda.
 
Alasannya masuk akal: kemampuan mengenali tepi, tekstur, dan bentuk itu **sama** untuk semua tugas penglihatan. Model yang sudah belajar mengenali 1.000 objek sudah punya kemampuan dasar itu.
 
### Analogi
 
Bayangkan merekrut seseorang yang sudah bertahun-tahun bekerja sebagai fotografer profesional, lalu mengajarinya membedakan 5 jenis penyakit tanaman.
 
Dia sudah tahu cara melihat, memperhatikan detail, dan mengenali pola. Anda hanya perlu mengajarinya kosakata baru. Ini jauh lebih cepat daripada melatih orang dari nol.
 
### Model yang Tersedia
 
```python
from torchvision import models
from torchvision.models import ResNet18_Weights
 
# Mengunduh model yang sudah dilatih dengan ImageNet (1,2 juta gambar)
model_asal = models.resnet18(weights=ResNet18_Weights.DEFAULT)
print("Jumlah parameter:", sum(p.numel() for p in model_asal.parameters()))
```
 
| Model | Ukuran | Kecepatan | Kapan dipakai |
|---|---|---|---|
| `resnet18` | Kecil | Cepat | Pilihan awal yang baik |
| `resnet50` | Sedang | Sedang | Kalau butuh lebih akurat |
| `efficientnet_b0` | Kecil | Cepat | Efisien, akurasi bagus |
| `mobilenet_v3_small` | Sangat kecil | Sangat cepat | Untuk ponsel |
| `vit_b_16` | Besar | Lambat | Berbasis transformer, sangat akurat |
 
Untuk pemula, mulai dari `resnet18`.
 
### Dua Cara Memakainya
 
#### Cara 1: Feature Extraction
 
Bekukan seluruh model asal, ganti hanya lapisan terakhirnya. Model asal dipakai sekadar sebagai pengubah gambar menjadi fitur.
 
**Kapan dipakai:** data Anda sedikit, di bawah seribu gambar, dan mirip dengan gambar umum.
 
**Kelebihan:** sangat cepat, hampir tidak mungkin overfitting.
 
#### Cara 2: Fine-tuning
 
Latih ulang seluruh model dengan learning rate sangat kecil.
 
**Kapan dipakai:** data Anda cukup banyak, atau gambarnya sangat berbeda dari gambar umum, misalnya citra medis atau citra satelit.
 
**Kelebihan:** akurasi lebih tinggi.
 
**Kekurangan:** lebih lambat dan lebih mudah overfitting.
 
### Kode Feature Extraction
 
```python
import torch.nn as nn
 
model_tf = models.resnet18(weights=ResNet18_Weights.DEFAULT)
 
# Langkah 1: bekukan semua parameter
for parameter in model_tf.parameters():
    parameter.requires_grad = False
 
# Langkah 2: ganti lapisan terakhir sesuai jumlah kelas kita
jumlah_fitur = model_tf.fc.in_features
model_tf.fc = nn.Linear(jumlah_fitur, 10)     # lapisan baru ini bisa dilatih
 
model_tf = model_tf.to(perangkat)
 
bisa_dilatih = sum(p.numel() for p in model_tf.parameters() if p.requires_grad)
total = sum(p.numel() for p in model_tf.parameters())
print(f"Parameter yang dilatih: {bisa_dilatih:,} dari {total:,} "
      f"({bisa_dilatih/total:.2%})")
```
 
Hanya sekitar 0,1 persen parameter yang dilatih. Inilah kenapa prosesnya sangat cepat.
 
### Menyesuaikan Ukuran dan Normalisasi
 
Ini bagian yang sering menyebabkan hasil buruk tanpa disadari.
 
Model yang dilatih dengan ImageNet mengharapkan gambar berukuran 224 × 224 dan dinormalisasi dengan angka tertentu. Kalau Anda memakai angka lain, hasilnya akan jauh lebih buruk.
 
```python
# Angka normalisasi ImageNet, WAJIB dipakai untuk model pra-latih
RATA_IMAGENET = [0.485, 0.456, 0.406]
STD_IMAGENET = [0.229, 0.224, 0.225]
 
transformasi_tf_latih = T.Compose([
    T.Resize(256),
    T.RandomResizedCrop(224, scale=(0.8, 1.0)),
    T.RandomHorizontalFlip(),
    T.ToTensor(),
    T.Normalize(RATA_IMAGENET, STD_IMAGENET),
])
 
transformasi_tf_uji = T.Compose([
    T.Resize(256),
    T.CenterCrop(224),
    T.ToTensor(),
    T.Normalize(RATA_IMAGENET, STD_IMAGENET),
])
```
 
Cara termudah mengetahui angka yang benar: setiap model di torchvision punya transformasi bawaannya.
 
```python
bobot = ResNet18_Weights.DEFAULT
print(bobot.transforms())
```
 
### Melatihnya
 
```python
# Hanya parameter lapisan baru yang dioptimalkan
pengoptimal_tf = optim.Adam(model_tf.fc.parameters(), lr=0.001)
kriteria = nn.CrossEntropyLoss()
 
# Gunakan loader dengan transformasi ukuran 224
# for epoch in range(5):
#     rl, al = latih_satu_epoch(model_tf, loader_latih_224, kriteria,
#                               pengoptimal_tf, perangkat)
#     ru, au = evaluasi(model_tf, loader_uji_224, kriteria, perangkat)
#     print(f"Epoch {epoch+1}: akurasi latih {al:.4f}, akurasi uji {au:.4f}")
```
 
Biasanya hanya butuh 3 sampai 5 epoch, dan hasilnya sering langsung mengalahkan CNN buatan sendiri yang dilatih 50 epoch.
 
### Kode Fine-tuning
 
```python
model_ft = models.resnet18(weights=ResNet18_Weights.DEFAULT)
model_ft.fc = nn.Linear(model_ft.fc.in_features, 10)
model_ft = model_ft.to(perangkat)
 
# Semua parameter dilatih, tapi dengan learning rate sangat kecil
pengoptimal_ft = optim.Adam([
    {"params": [p for n, p in model_ft.named_parameters() if not n.startswith("fc")],
     "lr": 1e-4},                                    # lapisan lama: pelan-pelan
    {"params": model_ft.fc.parameters(), "lr": 1e-3},  # lapisan baru: lebih cepat
])
```
 
#### Kenapa Learning Rate Harus Kecil
 
Model asal sudah punya pengetahuan berharga. Learning rate besar akan merusaknya dalam beberapa langkah pertama, dan Anda kehilangan seluruh manfaat transfer learning.
 
Pola yang umum dipakai: learning rate untuk lapisan lama sepuluh kali lebih kecil daripada lapisan baru.
 
### Strategi Bertahap
 
Cara yang sering memberi hasil terbaik:
 
**Tahap 1.** Bekukan semua, latih hanya lapisan terakhir selama beberapa epoch.
 
**Tahap 2.** Buka bekuan beberapa lapisan terakhir, lanjutkan pelatihan dengan learning rate sangat kecil.
 
```python
# Tahap 2: buka bekuan blok terakhir saja
for nama, parameter in model_tf.named_parameters():
    if nama.startswith("layer4") or nama.startswith("fc"):
        parameter.requires_grad = True
 
pengoptimal_tahap2 = optim.Adam(
    [p for p in model_tf.parameters() if p.requires_grad], lr=1e-4)
```
 
### Memilih Strategi
 
| Kondisi data Anda | Strategi |
|---|---|
| Sedikit, mirip ImageNet | Feature extraction saja |
| Sedikit, sangat berbeda | Feature extraction dari lapisan tengah |
| Banyak, mirip ImageNet | Fine-tuning dengan learning rate kecil |
| Banyak, sangat berbeda | Fine-tuning seluruh model |
 
## Mengevaluasi Model Gambar
 
### Metrik Dasar
 
Untuk klasifikasi gambar dengan kelas seimbang, akurasi sudah memadai. Untuk kelas timpang, berlaku aturan yang sama seperti data tabel: pakai F1, precision, dan recall.
 
```python
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns
 
def kumpulkan_prediksi(model, loader, perangkat):
    model.eval()
    semua_prediksi, semua_label = [], []
    with torch.no_grad():
        for gambar, label in loader:
            keluaran = model(gambar.to(perangkat))
            semua_prediksi.extend(keluaran.argmax(1).cpu().numpy())
            semua_label.extend(label.numpy())
    return np.array(semua_label), np.array(semua_prediksi)
 
y_asli, y_tebak = kumpulkan_prediksi(model, loader_uji, perangkat)
print(classification_report(y_asli, y_tebak, target_names=kelas, digits=3))
```
 
### Confusion Matrix
 
Untuk klasifikasi banyak kelas, ini alat paling berguna.
 
```python
cm = confusion_matrix(y_asli, y_tebak)
 
plt.figure(figsize=(9, 7))
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
            xticklabels=kelas, yticklabels=kelas)
plt.xlabel("Prediksi"); plt.ylabel("Kenyataan")
plt.title("Confusion Matrix")
plt.tight_layout()
plt.show()
 
# Pasangan kelas yang paling sering tertukar
cm_tanpa_diagonal = cm.copy()
np.fill_diagonal(cm_tanpa_diagonal, 0)
for _ in range(5):
    i, j = np.unravel_index(cm_tanpa_diagonal.argmax(), cm.shape)
    print(f"{kelas[i]} sering disangka {kelas[j]}: {cm_tanpa_diagonal[i, j]} kali")
    cm_tanpa_diagonal[i, j] = 0
```
 
Biasanya Anda akan menemukan pola yang masuk akal, misalnya kucing tertukar dengan anjing. Ini memberi petunjuk kelas mana yang butuh data tambahan.
 
### Melihat Gambar yang Salah Diprediksi
 
Ini langkah yang paling berguna dan paling sering dilewati.
 
```python
def lihat_kesalahan(model, dataset, perangkat, jumlah=10):
    model.eval()
    salah = []
 
    with torch.no_grad():
        for i in range(len(dataset)):
            gambar, label = dataset[i]
            keluaran = model(gambar.unsqueeze(0).to(perangkat))
            prob = F.softmax(keluaran, dim=1)[0]
            tebakan = prob.argmax().item()
 
            if tebakan != label:
                salah.append((i, label, tebakan, prob[tebakan].item()))
            if len(salah) >= jumlah:
                break
 
    fig, ax = plt.subplots(2, 5, figsize=(15, 6))
    for k, (idx, asli, tebak, yakin) in enumerate(salah[:10]):
        gambar, _ = dataset[idx]
        img = gambar.permute(1, 2, 0).numpy() * 0.5 + 0.5
        ax.flat[k].imshow(np.clip(img, 0, 1))
        ax.flat[k].set_title(f"Asli: {kelas[asli]}\nTebak: {kelas[tebak]} ({yakin:.0%})",
                             fontsize=8)
        ax.flat[k].axis("off")
    plt.tight_layout()
    plt.show()
 
lihat_kesalahan(model, data_uji, perangkat)
```
 
#### Kenapa Ini Penting
 
Melihat kesalahan sering mengungkap masalah yang tidak terlihat dari angka.
 
Mungkin ternyata sebagian labelnya memang salah. Mungkin gambar yang salah semuanya buram atau gelap. Mungkin objeknya terlalu kecil dalam bingkai.
 
Tiap temuan itu mengarah pada tindakan konkret yang lebih berguna daripada sekadar menambah epoch.
 
## Tugas Computer Vision Lainnya
 
Klasifikasi hanyalah salah satu dari beberapa jenis tugas.
 
**Klasifikasi gambar** menjawab "gambar ini apa?" dan menghasilkan satu label per gambar. Ini yang dibahas di artikel ini.
 
**Deteksi objek** menjawab "ada apa saja dan di mana?" dan menghasilkan kotak beserta labelnya. Model populer: YOLO dan Faster R-CNN.
 
**Segmentasi** menjawab "piksel mana milik objek apa?" dan menghasilkan pewarnaan tiap piksel. Model populer: U-Net dan Mask R-CNN.
 
**Pengenalan wajah** mencocokkan wajah dengan identitas.
 
**Pembuatan gambar** menghasilkan gambar baru. Contohnya Stable Diffusion.
 
Semuanya dibangun di atas fondasi yang sama: CNN atau transformer sebagai pengekstrak fitur. Setelah memahami klasifikasi, tugas lain jadi jauh lebih mudah dipelajari.
 
## Kesalahan Pemula yang Sering Terjadi
 
### Lupa Memanggil model.eval()
 
Dropout dan BatchNorm berperilaku berbeda saat menguji. Lupa memanggilnya membuat hasil evaluasi salah, biasanya lebih buruk daripada seharusnya.
 
### Lupa zero_grad()
 
PyTorch menumpuk gradien secara bawaan. Tanpa `pengoptimal.zero_grad()` di tiap langkah, gradiennya salah dan model tidak pernah belajar dengan benar.
 
### Mengaugmentasi Data Uji
 
Data uji harus mencerminkan kondisi nyata. Augmentasi hanya untuk data latih.
 
### Memakai Normalisasi yang Salah pada Model Pra-latih
 
Model ImageNet mengharapkan angka normalisasi tertentu. Memakai angka lain menurunkan performa secara diam-diam. Periksa dengan `weights.transforms()`.
 
### Learning Rate Terlalu Besar saat Fine-tuning
 
Ini merusak pengetahuan model asal dalam beberapa langkah pertama. Pakai kisaran 1e-4 sampai 1e-5 untuk lapisan lama.
 
### Membalik Gambar yang Tidak Boleh Dibalik
 
Angka, huruf, dan citra medis punya orientasi yang bermakna. Membaliknya mengajari model hal yang salah.
 
### Melatih dari Nol Padahal Bisa Transfer Learning
 
Untuk hampir semua kasus dengan data di bawah puluhan ribu gambar, transfer learning lebih baik dan jauh lebih cepat.
 
### Tidak Pernah Melihat Gambar yang Salah Diprediksi
 
Angka akurasi tidak memberi tahu apa yang salah. Melihat langsung gambarnya sering mengungkap masalah label atau kualitas data.
 
### Memakai Ukuran Gambar yang Terlalu Besar
 
Gambar 512 × 512 empat kali lebih lambat daripada 256 × 256. Mulai dari ukuran kecil untuk bereksperimen, perbesar hanya kalau memang membantu.
 
### Mengabaikan Keseimbangan Kelas
 
Kalau satu kelas punya 1.000 gambar dan kelas lain hanya 50, model akan mengabaikan kelas kecil. Pakai pembobotan kelas atau kumpulkan data tambahan.
 
### Menyimpan Model Tanpa Preprocessing-nya
 
Model yang dilatih dengan normalisasi tertentu harus dipakai dengan normalisasi yang sama. Catat dan simpan transformasinya bersama modelnya.
 
## Penutup
 
Computer vision terlihat rumit dari luar, tapi fondasinya bisa dipahami dengan tiga ide: gambar adalah angka, konvolusi mengenali pola secara bertahap dari sederhana ke kompleks, dan model yang sudah dilatih orang lain bisa dipinjam.
 
Tiga hal untuk diingat:
 
**Pertama**, hampir selalu mulai dari transfer learning, bukan membangun CNN dari nol. Model pra-latih sudah menyerap pengetahuan dari jutaan gambar yang tidak mungkin Anda kumpulkan sendiri.
 
**Kedua**, augmentasi hanya untuk data latih, dan harus menghasilkan gambar yang mungkin muncul di dunia nyata. Augmentasi yang tidak masuk akal mengajari model hal yang salah.
 
**Ketiga**, lihat gambar yang salah diprediksi. Angka akurasi memberi tahu seberapa banyak yang salah, tapi hanya melihat langsung yang memberi tahu kenapa, dan jawaban itulah yang menentukan langkah perbaikan.
