---
sidebar_position: 4
title: "Debugging Warnings & Manajemen Package"
---

Dalam proses belajar **Python, Data Science, dan Machine Learning**, kita akan sering menemukan *warning* ketika menjalankan kode.

Warning bukan selalu berarti program gagal. Sering kali warning memberikan informasi bahwa ada bagian dari kode yang perlu diperhatikan, misalnya perubahan perilaku pada versi library berikutnya, penggunaan API yang sudah tidak direkomendasikan, atau konfigurasi yang berpotensi menimbulkan masalah.

Selain memahami warning, kita juga perlu memahami cara mengelola **package dan environment** menggunakan **Conda** agar versi Python dan library yang digunakan tetap terkontrol.

## Apa Itu Warning?

**Warning** adalah pesan yang diberikan Python atau library ketika menemukan kondisi yang perlu diperhatikan, tetapi kondisi tersebut belum tentu menyebabkan program berhenti.

Contohnya, ketika menggunakan Scikit-Learn, kita mungkin menemukan pesan seperti:

```text
FutureWarning: The default value of some_parameter will change in a future version.
```

Artinya, kode kita masih dapat berjalan, tetapi perilaku default dari parameter tersebut akan berubah pada versi library mendatang.

### Warning Berbeda dengan Error

Penting untuk membedakan antara **warning** dan **error**.

| Kondisi | Penjelasan |
|---|---|
| Warning | Program biasanya tetap berjalan |
| Error | Program gagal menjalankan bagian kode tertentu |
| Exception | Kesalahan yang dihentikan oleh Python ketika tidak ditangani |

Contoh sederhana:

```python
print("Program berjalan")
```

Jika muncul warning sebelum atau sesudah kode tersebut, program belum tentu gagal.

Sebaliknya, jika terjadi error seperti:

```text
NameError: name 'data' is not defined
```

maka Python tidak dapat melanjutkan eksekusi pada bagian tersebut.

## Mengapa Warning Bisa Muncul?

Beberapa penyebab umum warning dalam Data Science dan Machine Learning antara lain:

- Perubahan parameter default.
- Penggunaan API yang akan deprecated.
- Perubahan perilaku library pada versi mendatang.
- Konversi tipe data yang berpotensi bermasalah.
- Penggunaan fitur yang sudah tidak direkomendasikan.
- Ketidaksesuaian versi package.
- Potensi masalah pada data atau operasi tertentu.

Contohnya:

```text
FutureWarning
DeprecationWarning
UserWarning
RuntimeWarning
```

Setiap jenis warning dapat memberikan informasi yang berbeda.

## Cara Membaca Warning

Jangan langsung menyembunyikan warning ketika pertama kali melihatnya.

Biasakan membaca isi warning terlebih dahulu.

Misalnya:

```text
FutureWarning: The default value of parameter X will change in version 1.0.
```

Dari pesan tersebut kita dapat mengetahui:

1. Jenis warning.
2. Bagian kode yang menyebabkan warning.
3. Apa yang akan berubah.
4. Versi library yang terkait.
5. Tindakan yang disarankan.

Dengan demikian, warning sebenarnya dapat menjadi **petunjuk untuk memperbaiki kode**.

## Cara Menangani Warning

Secara umum terdapat beberapa pendekatan untuk menangani warning.

### Cara 1 - Memperbaiki Kode

Ini adalah pendekatan yang paling disarankan.

Jika warning memberitahukan bahwa sebuah parameter akan berubah, kita dapat menentukan parameter tersebut secara eksplisit.

Contohnya:

```python
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)
```

Dengan menentukan parameter secara eksplisit, kita tidak terlalu bergantung pada nilai default library.

### Mengapa Parameter Eksplisit Berguna?

Misalnya sebuah library memiliki default:

```python
SomeModel(parameter=10)
```

Kemudian pada versi berikutnya default berubah menjadi:

```python
SomeModel(parameter=100)
```

Kode berikut:

```python
model = SomeModel()
```

dapat menghasilkan perilaku berbeda setelah library diperbarui.

Sedangkan:

```python
model = SomeModel(parameter=100)
```

menyatakan secara eksplisit perilaku yang kita inginkan.

Pendekatan ini juga membuat kode lebih mudah dibaca dan direproduksi.

## Cara 2 - Menyembunyikan Warning

Jika kita sudah memahami warning tersebut dan memiliki alasan untuk tidak menampilkannya, Python menyediakan module bawaan `warnings`.

Contoh:

```python
import warnings

warnings.filterwarnings("ignore")
```

Setelah kode tersebut dijalankan, warning akan disembunyikan.

### Mengaktifkan Kembali Warning

Untuk mengembalikan perilaku default:

```python
warnings.filterwarnings("default")
```

Setelah itu warning akan kembali ditampilkan.

## Jangan Terlalu Cepat Menggunakan `ignore`

Menyembunyikan semua warning memang membuat output Jupyter Notebook terlihat lebih bersih.

Namun, pendekatan berikut:

```python
warnings.filterwarnings("ignore")
```

juga dapat menyembunyikan warning yang sebenarnya penting.

Karena itu, untuk proses belajar dan pengembangan sebaiknya:

1. Baca warning.
2. Cari penyebabnya.
3. Perbaiki kode jika memungkinkan.
4. Baru pertimbangkan untuk menyembunyikannya jika memang diperlukan.

Dengan kata lain:

> **Fix first, ignore later.**

## Menyembunyikan Warning Tertentu

Daripada menyembunyikan seluruh warning, kita juga dapat menyaring warning tertentu.

Contoh:

```python
import warnings

warnings.filterwarnings(
    "ignore",
    category=FutureWarning
)
```

Kode tersebut hanya menyembunyikan `FutureWarning`.

Warning jenis lain masih dapat ditampilkan.

Pendekatan ini biasanya lebih aman dibandingkan:

```python
warnings.filterwarnings("ignore")
```

karena kita masih mendapatkan informasi dari jenis warning lainnya.

## Memeriksa Versi Scikit-Learn

Ketika menghadapi masalah yang berkaitan dengan library, langkah penting adalah mengetahui versi library yang sedang digunakan.

Contohnya:

```python
import sklearn

print(sklearn.__version__)
```

Hasilnya dapat berupa:

```text
1.7.2
```

Versi tersebut penting ketika:

- membaca dokumentasi;
- mencari solusi error;
- membandingkan tutorial;
- melakukan reproduksi eksperimen;
- mengidentifikasi perubahan API.

## Melihat Informasi Environment Scikit-Learn

Scikit-Learn juga menyediakan fungsi untuk menampilkan informasi environment:

```python
import sklearn

sklearn.show_versions()
```

Fungsi tersebut dapat memberikan informasi mengenai:

- versi Scikit-Learn;
- versi Python;
- NumPy;
- SciPy;
- Pandas;
- dan dependency lainnya.

Informasi ini sangat berguna ketika melakukan troubleshooting.

## Memeriksa Versi Package dengan Python

Selain menggunakan `show_versions()`, kita dapat memeriksa package secara langsung.

Contoh:

```python
import numpy
import pandas
import sklearn
import matplotlib

print("NumPy:", numpy.__version__)
print("Pandas:", pandas.__version__)
print("Scikit-Learn:", sklearn.__version__)
print("Matplotlib:", matplotlib.__version__)
```

Dengan cara ini kita dapat mengetahui versi masing-masing library yang digunakan oleh notebook.

## Apa Itu Conda?

**Conda** adalah package manager sekaligus environment manager yang banyak digunakan dalam ekosistem Data Science.

Conda dapat membantu kita:

- membuat environment terpisah;
- menginstal package;
- menghapus package;
- mengatur versi package;
- mengatur versi Python;
- menangani dependency antar-package.

Contoh struktur environment:

```text
Conda
│
├── Environment A
│   ├── Python
│   ├── NumPy
│   ├── Pandas
│   └── Scikit-Learn
│
└── Environment B
    ├── Python
    ├── NumPy
    ├── Pandas
    └── Scikit-Learn
```

Environment yang berbeda dapat memiliki versi package yang berbeda.

## Mengapa Environment Penting?

Bayangkan kita memiliki dua project:

```text
Project A
Python 3.11
Scikit-Learn versi terbaru

Project B
Python 3.9
Scikit-Learn versi lama
```

Jika kedua project menggunakan environment yang sama, perubahan package untuk Project A dapat memengaruhi Project B.

Dengan environment terpisah:

```text
Environment A
└── Project A

Environment B
└── Project B
```

masing-masing project dapat memiliki dependency sendiri.

Ini merupakan salah satu konsep penting dalam reproducible data science.

## Melihat Environment Conda

Untuk melihat environment yang tersedia:

```bash
conda env list
```

atau:

```bash
conda info --envs
```

Contoh:

```text
# conda environments:

base                 *  C:\Users\User\miniconda3
ml                      C:\Users\User\miniconda3\envs\ml
data-science            C:\Users\User\miniconda3\envs\data-science
```

Tanda `*` menunjukkan environment yang sedang aktif.

## Mengaktifkan Environment Conda

Jika environment sudah dibuat:

```bash
conda activate ml
```

Jika environment berada pada lokasi tertentu, Conda juga dapat menggunakan path environment.

Contoh:

```bash
conda activate /path/ke/environment
```

Namun, dalam penggunaan sehari-hari, nama environment biasanya lebih praktis:

```bash
conda activate ml
```

## Membuat Environment Baru

Daripada langsung mengubah environment `base`, lebih baik membuat environment khusus untuk project.

Contoh:

```bash
conda create -n ml python=3.11
```

Kemudian aktifkan:

```bash
conda activate ml
```

Setelah itu package yang dibutuhkan dapat diinstal ke environment tersebut.

## Menginstal Package dengan Conda

Contoh:

```bash
conda install numpy pandas matplotlib scikit-learn
```

Conda akan mencoba menyelesaikan dependency antar-package.

Kita juga dapat menentukan versi package:

```bash
conda install scikit-learn=1.7
```

Penentuan versi berguna ketika project membutuhkan versi tertentu.

## Melihat Package yang Terpasang

Gunakan:

```bash
conda list
```

Contoh hasil:

```text
# packages in environment at ...
#
# Name              Version
numpy               2.x
pandas              2.x
scikit-learn        1.x
matplotlib          3.x
```

Informasi ini berguna ketika melakukan troubleshooting.

## Mencari Informasi Package

Conda menyediakan perintah:

```bash
conda search scikit-learn
```

Perintah tersebut digunakan untuk melihat versi package yang tersedia pada channel yang digunakan.

Kita juga dapat melihat informasi lebih detail mengenai package tertentu:

```bash
conda search scikit-learn --info
```

Ketersediaan versi dapat bergantung pada channel dan platform yang digunakan.

## Package dan Dependency

Sebuah package biasanya memiliki dependency.

Sebagai contoh:

```text
Scikit-Learn
│
├── NumPy
├── SciPy
├── Joblib
└── Threadpoolctl
```

Artinya Scikit-Learn tidak berdiri sendiri.

Jika kita mengubah versi salah satu dependency, hal tersebut dapat memengaruhi package lainnya.

Inilah salah satu alasan mengapa pengelolaan environment penting.

## Dependency Conflict

Bayangkan kondisi berikut:

```text
Project membutuhkan:

Python 3.9
Scikit-Learn versi tertentu
NumPy versi tertentu
SciPy versi tertentu
```

Kemudian kita mencoba memasang package lain yang membutuhkan:

```text
Python versi berbeda
NumPy versi berbeda
SciPy versi berbeda
```

Conda dapat menemukan bahwa dependency tersebut tidak kompatibel.

Contohnya dapat muncul pesan seperti:

```text
UnsatisfiableError
```

atau dependency conflict lainnya.

## Jangan Langsung Menghapus Python

Jika terjadi dependency conflict, kita tidak selalu perlu melakukan:

```bash
conda uninstall scikit-learn python
```

Menghapus Python secara manual dari environment yang sedang digunakan dapat membuat environment menjadi tidak konsisten.

Pendekatan yang lebih aman biasanya adalah:

1. Periksa package yang membutuhkan dependency tertentu.
2. Periksa versi Python.
3. Periksa versi package.
4. Coba buat environment baru.
5. Instal versi yang kompatibel.
6. Gunakan environment tersebut untuk project.

## Membuat Environment Baru untuk Versi Tertentu

Misalnya sebuah project lama membutuhkan Python versi tertentu.

Daripada merusak environment yang sedang digunakan, buat environment baru:

```bash
conda create -n legacy-ml python=3.9
```

Kemudian:

```bash
conda activate legacy-ml
```

Setelah itu install package yang dibutuhkan:

```bash
conda install scikit-learn matplotlib numpy pandas jupyter
```

Pendekatan ini lebih aman karena environment lama tetap tersedia.

## Contoh Environment untuk Machine Learning

Misalnya kita membuat environment:

```bash
conda create -n machine-learning python=3.11
```

Aktifkan:

```bash
conda activate machine-learning
```

Kemudian install package:

```bash
conda install numpy pandas matplotlib scikit-learn jupyter
```

Environment tersebut dapat digunakan untuk project Machine Learning.

## Menggunakan Jupyter Notebook dari Environment

Setelah environment aktif:

```bash
conda activate machine-learning
```

Kita dapat menjalankan:

```bash
jupyter notebook
```

atau:

```bash
jupyter lab
```

Dengan demikian, Jupyter dijalankan dari environment tersebut.

## Memastikan Jupyter Menggunakan Environment yang Benar

Salah satu masalah yang sering terjadi adalah:

```text
Terminal menggunakan environment A
Jupyter Notebook menggunakan environment B
```

Akibatnya versi package yang terlihat di terminal bisa berbeda dengan versi package yang digunakan notebook.

Di Jupyter Notebook, kita dapat memeriksa lokasi Python:

```python
import sys

print(sys.executable)
```

Contoh:

```text
C:\Users\User\miniconda3\envs\machine-learning\python.exe
```

Cara ini sangat berguna untuk memastikan notebook menggunakan environment yang benar.

## Mengecek Package dari Jupyter

Kita juga dapat memeriksa package menggunakan:

```python
import sklearn

print(sklearn.__version__)
```

Kemudian bandingkan dengan package pada environment:

```bash
conda list scikit-learn
```

Jika keduanya tidak sesuai dengan yang diharapkan, kemungkinan Jupyter menggunakan environment atau kernel yang berbeda.

## Memahami Conda Environment sebagai Ruang Kerja

Salah satu cara mudah memahami Conda adalah menganggap environment sebagai **ruang kerja terisolasi**.

Misalnya:

```text
machine-learning
│
├── Python
├── NumPy
├── Pandas
├── Matplotlib
├── Scikit-Learn
└── Jupyter
```

Sedangkan project lain dapat memiliki:

```text
deep-learning
│
├── Python
├── NumPy
├── Pandas
├── PyTorch
└── Jupyter
```

Keduanya dapat menggunakan dependency yang berbeda.

## Praktik yang Disarankan

Ketika mengerjakan project Data Science atau Machine Learning, biasakan melakukan beberapa hal berikut.

### 1. Gunakan Environment Terpisah

Buat environment untuk project atau kelompok project yang memiliki dependency serupa.

```bash
conda create -n machine-learning python=3.11
```

### 2. Catat Versi Package

Contohnya:

```bash
conda list
```

atau menggunakan:

```python
import sklearn

print(sklearn.__version__)
```

### 3. Jangan Mengabaikan Warning Secara Otomatis

Jika warning muncul:

```python
warnings.filterwarnings("ignore")
```

jangan langsung menggunakannya.

Baca terlebih dahulu warning tersebut.

### 4. Gunakan Parameter Eksplisit

Jika sebuah parameter penting untuk reproducibility, tentukan nilainya secara eksplisit.

Contoh:

```python
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)
```

### 5. Gunakan `random_state`

Untuk eksperimen Machine Learning, penggunaan:

```python
random_state=42
```

atau nilai integer lainnya dapat membantu menghasilkan eksperimen yang dapat direproduksi ketika komponen yang digunakan memang mendukung parameter tersebut.

Angka `42` bukan angka wajib. Nilai integer lain juga dapat digunakan.

## Workflow Troubleshooting Warning

Ketika menemukan warning, gunakan alur berikut:

```text
Warning muncul
      │
      ▼
Baca pesan warning
      │
      ▼
Identifikasi package
      │
      ▼
Periksa versi package
      │
      ▼
Apakah ada perubahan API?
      │
      ├── Ya ──► Perbaiki kode
      │
      └── Tidak
             │
             ▼
       Periksa dependency
             │
             ▼
       Periksa environment
             │
             ▼
       Uji kembali kode
```

Jangan langsung mengambil tindakan:

```text
Warning
   ↓
Ignore
```

karena warning dapat memberikan informasi penting.

## Contoh Troubleshooting Sederhana

Misalnya kita menjalankan:

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier()

model.fit(X_train, y_train)
```

Kemudian muncul warning.

Langkah pertama:

```python
import sklearn

print(sklearn.__version__)
```

Kemudian periksa environment:

```bash
conda list scikit-learn
```

Jika ternyata menggunakan versi library yang berbeda dari tutorial yang sedang diikuti, kita perlu memahami perbedaan API terlebih dahulu.

Jangan langsung menurunkan versi package tanpa mengetahui alasan dan konsekuensinya.

## Memeriksa Versi Python

Selain package, periksa juga versi Python:

```bash
python --version
```

atau:

```bash
python -V
```

Dari Jupyter Notebook:

```python
import sys

print(sys.version)
```

Informasi ini penting karena beberapa versi library hanya mendukung rentang versi Python tertentu.

## Membuat Environment dari File

Untuk project yang lebih serius, environment dapat disimpan ke dalam file konfigurasi.

Contohnya:

```bash
conda env export > environment.yml
```

File tersebut dapat digunakan untuk membantu membuat kembali environment pada komputer lain.

Untuk membuat environment berdasarkan file:

```bash
conda env create -f environment.yml
```

Pendekatan ini sangat berguna untuk:

- penelitian;
- project tim;
- pembelajaran;
- reproduksi eksperimen;
- deployment;
- dokumentasi dependency.

## Mengapa Reproducibility Penting?

Bayangkan kita membuat model Machine Learning pada tahun ini.

Kemudian beberapa bulan kemudian kita menjalankan kembali project tersebut.

Jika package sudah berubah:

```text
Python
NumPy
Pandas
Scikit-Learn
```

hasil atau perilaku program dapat berubah.

Dengan mencatat environment dan versi dependency, kita memiliki informasi yang lebih baik untuk mereproduksi eksperimen.

## Ringkasan

Pada materi ini kita telah mempelajari:

- Pengertian warning.
- Perbedaan warning dan error.
- Cara membaca warning.
- Cara memperbaiki warning melalui perubahan kode.
- Cara menggunakan module `warnings`.
- Cara menyembunyikan warning tertentu.
- Cara memeriksa versi Scikit-Learn.
- Cara menggunakan `sklearn.show_versions()`.
- Pengertian Conda.
- Pengertian Conda environment.
- Cara membuat environment.
- Cara mengaktifkan environment.
- Cara melihat package yang terpasang.
- Cara mencari versi package.
- Konsep dependency.
- Dependency conflict.
- Pentingnya menggunakan environment terpisah.
- Cara memastikan Jupyter menggunakan environment yang benar.
- Cara menyimpan environment menggunakan `environment.yml`.
- Pentingnya reproducibility dalam project Machine Learning.

## Cheat Sheet

| Kebutuhan | Perintah |
|---|---|
| Melihat environment | `conda env list` |
| Membuat environment | `conda create -n ml python=3.11` |
| Mengaktifkan environment | `conda activate ml` |
| Menonaktifkan environment | `conda deactivate` |
| Melihat package | `conda list` |
| Mencari package | `conda search scikit-learn` |
| Install package | `conda install scikit-learn` |
| Install versi tertentu | `conda install scikit-learn=1.7` |
| Melihat versi Python | `python --version` |
| Export environment | `conda env export > environment.yml` |
| Membuat environment dari file | `conda env create -f environment.yml` |
