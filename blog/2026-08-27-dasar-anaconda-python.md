---
slug: dasar-anaconda-python
title: "Dasar Anaconda dan Python"
authors: topekox
tags: [manchine learning, data mining, ai, data science, python]
---

Anaconda adalah salah satu platform yang banyak digunakan untuk pengembangan **Python**, khususnya pada bidang **Data Science, Machine Learning, Artificial Intelligence, Scientific Computing**, dan analisis data.

Anaconda tidak hanya menyediakan Python, tetapi juga menyediakan **package manager**, **environment manager**, serta kumpulan library yang memudahkan pengembangan aplikasi berbasis Python.

Materi ini membahas:

* Apa itu Anaconda
* Hubungan Anaconda dengan Python
* Apa itu package dan dependency
* Apa itu environment
* Conda vs pip
* Cara install Anaconda
* Cara menggunakan Anaconda Navigator
* Cara menggunakan Conda melalui terminal
* Membuat dan mengelola environment
* Install library Python
* Menjalankan Python
* Menggunakan Jupyter Notebook
* Menggunakan JupyterLab
* Menggunakan VS Code dan PyCharm
* Environment untuk Machine Learning
* Masalah umum dan solusinya
* Best practice penggunaan Anaconda

<!-- truncate -->

---

## 1. Apa Itu Python?

**Python** adalah bahasa pemrograman tingkat tinggi yang banyak digunakan untuk:

* Web development
* Automation
* Data analysis
* Data science
* Machine learning
* Artificial intelligence
* Scientific computing
* Scripting
* Backend development

Contoh program Python sederhana:

```python
nama = "Ucup"

print(f"Halo, {nama}!")
```

Output:

```text
Halo, Ucup!
```

Python sendiri hanyalah **bahasa pemrograman dan interpreter/runtime**.

Ketika kita ingin menggunakan Python untuk data science atau machine learning, biasanya kita membutuhkan banyak library tambahan.

Contohnya:

```text
Python
│
├── NumPy
├── Pandas
├── Matplotlib
├── Scikit-learn
├── Seaborn
├── Jupyter
├── TensorFlow
└── PyTorch
```

Di sinilah Anaconda dapat membantu.

---

## 2. Apa Itu Anaconda?

**Anaconda** adalah distribusi Python yang ditujukan terutama untuk data science, scientific computing, dan berbagai kebutuhan komputasi teknis.

Anaconda menyediakan berbagai komponen untuk membantu mengelola ekosistem Python.

Secara sederhana:

```text
Anaconda
│
├── Python
├── Conda
├── Package management
├── Environment management
├── Scientific libraries
└── Tools seperti Jupyter
```

Salah satu komponen terpenting dalam Anaconda adalah:

```text
conda
```

`conda` digunakan untuk:

* Membuat environment
* Menghapus environment
* Mengaktifkan environment
* Menginstall package
* Menghapus package
* Mengelola dependency
* Mengelola versi Python

---

## 3. Apakah Anaconda Sama dengan Python?

Tidak.

Hubungannya dapat digambarkan seperti ini:

```text
Python
    ↓
Bahasa pemrograman

Anaconda
    ↓
Distribusi Python + tools + package/environment management
```

Python dapat digunakan tanpa Anaconda.

Contohnya kita dapat menginstall Python langsung dari situs resmi Python.

Sebaliknya, ketika menggunakan Anaconda, Python biasanya sudah disediakan sebagai bagian dari environment.

---

## 4. Mengapa Anaconda Dibutuhkan?

Dalam proyek sederhana, kita mungkin hanya membutuhkan Python.

Misalnya:

```python
print("Hello World")
```

Tidak ada masalah.

Tetapi proyek machine learning bisa membutuhkan banyak library:

```text
Python
├── numpy
├── pandas
├── matplotlib
├── scipy
├── scikit-learn
├── jupyter
├── tensorflow
├── pytorch
└── berbagai dependency lainnya
```

Setiap library juga memiliki dependency.

Misalnya:

```text
scikit-learn
    ↓
numpy
    ↓
dependency lain
```

Masalah dapat muncul ketika:

* Versi package tidak kompatibel
* Versi Python tidak cocok
* Dua proyek membutuhkan versi package berbeda
* Dependency saling bertabrakan
* Package sulit diinstall secara manual

Anaconda/Conda membantu mengelola masalah tersebut.

---

## 5. Apa Itu Package?

**Package** adalah kumpulan kode yang dapat digunakan kembali oleh program lain.

Contohnya:

### NumPy

Digunakan untuk komputasi numerik.

```python
import numpy as np

data = np.array([1, 2, 3, 4, 5])

print(data)
```

### Pandas

Digunakan untuk pengolahan data.

```python
import pandas as pd

data = pd.DataFrame({
    "nama": ["Andi", "Budi"],
    "umur": [20, 25]
})

print(data)
```

### Matplotlib

Digunakan untuk visualisasi.

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
y = [2, 4, 6, 8]

plt.plot(x, y)
plt.show()
```

### Scikit-learn

Digunakan untuk machine learning.

```python
from sklearn.linear_model import LinearRegression
```

---

## 6. Apa Itu Dependency?

Sebuah package sering membutuhkan package lain agar dapat berjalan.

Misalnya:

```text
Machine Learning Project
        │
        └── scikit-learn
                │
                ├── numpy
                ├── scipy
                └── joblib
```

Package yang dibutuhkan oleh package lain disebut **dependency**.

Masalah dependency merupakan salah satu alasan mengapa package manager dibutuhkan.

---

## 7. Apa Itu Package Manager?

Package manager adalah program yang membantu kita mengelola package.

Dengan package manager kita dapat:

```text
install
update
remove
search
```

package.

Contohnya menggunakan Conda:

```bash
conda install numpy
```

Atau menggunakan pip:

```bash
pip install numpy
```

---

## 8. Apa Itu Conda?

**Conda** adalah package manager sekaligus environment manager.

Conda dapat digunakan untuk:

1. Menginstall package
2. Menghapus package
3. Mengelola dependency
4. Membuat environment
5. Menghapus environment
6. Mengatur versi Python

Contoh:

```bash
conda create -n ml python=3.12
```

Perintah tersebut membuat environment bernama:

```text
ml
```

dengan Python:

```text
3.12
```

---

## 9. Apa Itu Environment?

Environment adalah lingkungan terisolasi tempat Python dan package tertentu berada.

Misalnya kita memiliki dua proyek:

```text
Project A
Python 3.11
NumPy versi A
Scikit-learn versi A

Project B
Python 3.12
NumPy versi B
Scikit-learn versi B
```

Jika semuanya menggunakan environment yang sama, kemungkinan terjadi konflik.

Dengan environment:

```text
Environment A
├── Python 3.11
├── NumPy
└── Scikit-learn

Environment B
├── Python 3.12
├── NumPy
└── PyTorch
```

Kedua proyek dapat memiliki konfigurasi yang berbeda.

---

## 10. Mengapa Environment Penting?

Bayangkan kita memiliki dua proyek.

### Project A

Membutuhkan:

```text
Python 3.10
NumPy versi tertentu
Scikit-learn versi tertentu
```

### Project B

Membutuhkan:

```text
Python 3.12
NumPy versi berbeda
Scikit-learn versi berbeda
```

Jika semua package dipasang secara global, dapat terjadi konflik.

Environment menyelesaikan masalah tersebut:

```text
Machine Learning Project
        │
        └── ml-environment

Data Analysis Project
        │
        └── data-environment
```

---

## 11. Kapan Harus Menggunakan Anaconda?

Anaconda sangat berguna jika kita bekerja dengan:

* Data Science
* Machine Learning
* Artificial Intelligence
* Scientific Computing
* Jupyter Notebook
* JupyterLab
* Banyak library Python
* Banyak proyek dengan dependency berbeda

Contohnya:

```text
Machine Learning
        ↓
NumPy
Pandas
Scikit-learn
Matplotlib
Jupyter
        ↓
Conda environment
```

---

## 12. Kapan Tidak Harus Menggunakan Anaconda?

Anaconda bukan kewajiban untuk menggunakan Python.

Untuk proyek sederhana seperti:

```text
Script automation
Web scraping sederhana
CLI application
Backend sederhana
```

Python + `venv` + `pip` sering sudah cukup.

Contohnya:

```bash
python -m venv .venv
```

Kemudian:

```bash
pip install requests
```

Jadi:

> Anaconda adalah salah satu pilihan untuk mengelola Python, bukan satu-satunya cara menggunakan Python.

---

## 13. Anaconda vs Python Biasa

Secara sederhana:

| Aspek                 | Python + venv    | Anaconda           |
| --------------------- | ---------------- | ------------------ |
| Python                | Ya               | Ya                 |
| Package management    | pip              | conda              |
| Environment           | venv             | conda              |
| Data Science          | Bisa             | Sangat cocok       |
| Machine Learning      | Bisa             | Sangat cocok       |
| Ukuran instalasi      | Lebih kecil      | Lebih besar        |
| Dependency scientific | Perlu dikelola   | Lebih terintegrasi |
| Jupyter               | Install terpisah | Mudah tersedia     |
| Cocok untuk pemula    | Ya               | Ya                 |
| Fleksibilitas         | Tinggi           | Tinggi             |

---

## 14. Anaconda Distribution vs Miniconda

Ada dua pilihan yang sering digunakan:

```text
Anaconda Distribution
Miniconda
```

### Anaconda Distribution

Menyediakan banyak package dan tools sejak awal.

Kelebihan:

* Mudah untuk pemula
* Banyak package tersedia
* Jupyter biasanya sudah tersedia
* Cocok untuk belajar data science

Kekurangan:

* Ukuran instalasi besar
* Banyak package mungkin tidak digunakan

### Miniconda

Miniconda adalah instalasi minimal yang menyediakan Conda dan komponen dasar.

Kita kemudian menginstall package sesuai kebutuhan.

Contoh:

```bash
conda create -n ml python=3.12
```

Kemudian:

```bash
conda activate ml
```

Lalu:

```bash
conda install numpy pandas scikit-learn
```

Miniconda lebih minimal dan sering lebih nyaman untuk pengguna yang sudah memahami environment.

---

## 15. Instalasi Anaconda

Setelah mengunduh installer Anaconda, lakukan instalasi seperti software Windows lainnya.

Setelah selesai, buka:

```text
Anaconda Prompt
```

Kemudian jalankan:

```bash
conda --version
```

Contoh output:

```text
conda 25.x.x
```

Versinya dapat berbeda tergantung versi yang terinstall.

---

## 16. Mengecek Versi Python

Gunakan:

```bash
python --version
```

Contoh:

```text
Python 3.12.x
```

Kita juga dapat menggunakan:

```bash
python -V
```

---

## 17. Mengecek Lokasi Python

Windows:

```bash
where python
```

Contoh:

```text
C:\Users\User\miniconda3\python.exe
```

atau:

```text
C:\Users\User\miniconda3\envs\ml\python.exe
```

Hal ini penting ketika kita memiliki beberapa instalasi Python.

---

## 18. Melihat Environment

Untuk melihat environment yang tersedia:

```bash
conda env list
```

Contoh:

```text
# conda environments:

base                 *  C:\Users\User\miniconda3
ml                      C:\Users\User\miniconda3\envs\ml
data                    C:\Users\User\miniconda3\envs\data
```

Tanda:

```text
*
```

menunjukkan environment yang sedang aktif.

---

## 19. Environment `base`

Setelah Anaconda/Miniconda diinstall, biasanya tersedia environment:

```text
base
```

Environment tersebut adalah environment utama Conda.

Contohnya:

```text
(base) C:\Users\User>
```

Artinya environment `base` sedang aktif.

---

## 20. Membuat Environment Baru

Sebaiknya proyek memiliki environment sendiri.

Contoh:

```bash
conda create -n ml python=3.12
```

Keterangan:

```text
conda create
```

Membuat environment.

```text
-n ml
```

Nama environment adalah `ml`.

```text
python=3.12
```

Menggunakan Python 3.12.

---

## 21. Mengaktifkan Environment

Setelah dibuat:

```bash
conda activate ml
```

Jika berhasil, terminal akan berubah menjadi:

```text
(ml) C:\Users\User>
```

Artinya sekarang kita berada di environment:

```text
ml
```

---

## 22. Menonaktifkan Environment

Gunakan:

```bash
conda deactivate
```

Contoh:

```text
(ml) C:\Users\User>
```

menjadi:

```text
(base) C:\Users\User>
```

Jika ingin keluar dari base juga:

```bash
conda deactivate
```

---

## 23. Menghapus Environment

Jika environment sudah tidak dibutuhkan:

```bash
conda remove -n ml --all
```

Conda akan meminta konfirmasi.

Hati-hati karena seluruh package di environment tersebut akan dihapus.

---

## 24. Menginstall Package dengan Conda

Misalnya:

```bash
conda install numpy
```

Install beberapa package sekaligus:

```bash
conda install numpy pandas matplotlib
```

Untuk machine learning:

```bash
conda install numpy pandas matplotlib scikit-learn
```

---

## 25. Menginstall Package dengan pip

Selain Conda, kita dapat menggunakan `pip`.

Contoh:

```bash
pip install numpy
```

Atau:

```bash
pip install pandas matplotlib scikit-learn
```

---

## 26. Conda vs pip

Keduanya adalah package manager, tetapi memiliki ekosistem dan mekanisme yang berbeda.

### Conda

```bash
conda install numpy
```

### pip

```bash
pip install numpy
```

Untuk environment Conda, pendekatan yang umum:

```text
1. Gunakan conda terlebih dahulu
2. Gunakan pip jika package tidak tersedia/lebih sesuai melalui PyPI
```

Contoh:

```bash
conda install numpy pandas scikit-learn
pip install some-package
```

Sebaiknya jangan mencampur package manager secara sembarangan karena dapat meningkatkan risiko dependency conflict.

---

## 27. Mencari Package

Kita dapat mencari package melalui Conda:

```bash
conda search numpy
```

Atau menggunakan PyPI melalui pip:

```bash
pip index versions numpy
```

---

## 28. Melihat Package yang Terinstall

Gunakan:

```bash
conda list
```

Contoh:

```text
numpy
pandas
matplotlib
scikit-learn
jupyter
```

Dengan pip:

```bash
pip list
```

---

## 29. Menghapus Package

Dengan Conda:

```bash
conda remove numpy
```

Dengan pip:

```bash
pip uninstall numpy
```

---

## 30. Update Package

Dengan Conda:

```bash
conda update numpy
```

Untuk update Conda:

```bash
conda update conda
```

Untuk pip:

```bash
pip install --upgrade numpy
```

---

## 31. Jangan Selalu Update Semua Package

Kesalahan umum adalah menjalankan:

```bash
conda update --all
```

tanpa memahami dampaknya.

Update package dapat menyebabkan:

```text
Package A
    ↓
membutuhkan dependency versi X

Package B
    ↓
membutuhkan dependency versi Y
```

Update besar dapat menyebabkan compatibility issue.

Dalam proyek serius, perubahan dependency sebaiknya dilakukan secara terkontrol.

---

## 32. Membuat Environment untuk Machine Learning

Contoh environment sederhana:

```bash
conda create -n machine-learning python=3.12
```

Aktifkan:

```bash
conda activate machine-learning
```

Install package:

```bash
conda install numpy pandas matplotlib scikit-learn
```

Kemudian install Jupyter:

```bash
conda install jupyter
```

Environment sekarang kira-kira:

```text
machine-learning
│
├── Python
├── NumPy
├── Pandas
├── Matplotlib
├── Scikit-learn
└── Jupyter
```

---

## 33. Membuat Environment untuk Data Science

Contoh:

```bash
conda create -n data-science python=3.12
```

Kemudian:

```bash
conda activate data-science
```

Install:

```bash
conda install numpy pandas matplotlib seaborn scikit-learn jupyter
```

---

## 34. Menjalankan Python

Setelah environment aktif:

```bash
python
```

Akan muncul interactive Python shell:

```text
>>>
```

Kemudian:

```python
print("Hello Python")
```

Untuk keluar:

```python
exit()
```

---

## 35. Menjalankan File Python

Misalnya terdapat:

```text
main.py
```

Jalankan:

```bash
python main.py
```

Jika environment yang benar sedang aktif, Python akan dijalankan dari environment tersebut.

---

## 36. Apa Itu Jupyter Notebook?

**Jupyter Notebook** adalah lingkungan interaktif untuk menjalankan kode secara bertahap.

Sangat populer dalam:

* Data analysis
* Data visualization
* Machine learning
* Experimentation
* Pendidikan

Contohnya:

```text
Cell 1
↓
import pandas as pd

Cell 2
↓
data = pd.read_csv("data.csv")

Cell 3
↓
data.head()
```

---

## 37. Menjalankan Jupyter Notebook

Jika Jupyter sudah diinstall:

```bash
jupyter notebook
```

Biasanya browser akan membuka halaman Jupyter.

---

## 38. Apa Itu JupyterLab?

JupyterLab adalah interface yang lebih modern dibanding Jupyter Notebook klasik.

Jalankan:

```bash
jupyter lab
```

JupyterLab dapat memiliki:

```text
Notebook
Terminal
Text Editor
File Browser
Console
```

dalam satu interface.

Untuk pekerjaan data science, JupyterLab sangat nyaman.

---

## 39. Jupyter dan Environment

Perhatikan bahwa Jupyter harus menggunakan environment yang benar.

Misalnya kita memiliki:

```text
base
ml
data
```

Kita ingin Jupyter menggunakan:

```text
ml
```

Maka Jupyter/kernel harus dikonfigurasi agar menggunakan Python dari environment `ml`.

Salah satu cara:

```bash
conda activate ml
```

Kemudian:

```bash
conda install ipykernel
```

Daftarkan kernel:

```bash
python -m ipykernel install --user --name ml --display-name "Python (ml)"
```

Setelah itu Jupyter dapat memilih:

```text
Python (ml)
```

sebagai kernel.

---

## 40. Apa Itu Kernel?

Kernel adalah proses yang menjalankan kode di Jupyter Notebook.

Misalnya notebook menggunakan:

```text
Python (ml)
```

maka kode dijalankan menggunakan Python dari environment:

```text
ml
```

Hal ini sangat penting.

Karena bisa terjadi:

```text
Package sudah diinstall
```

tetapi Jupyter mengatakan:

```text
ModuleNotFoundError
```

Salah satu penyebabnya adalah Jupyter menggunakan environment yang berbeda.

---

## 41. Mengecek Python dari Jupyter

Jalankan:

```python
import sys

print(sys.executable)
```

Contoh:

```text
C:\Users\User\miniconda3\envs\ml\python.exe
```

Dengan cara ini kita dapat mengetahui Python yang sebenarnya digunakan notebook.

---

## 42. VS Code dan Anaconda

Anaconda dapat digunakan bersama VS Code.

Struktur:

```text
VS Code
    ↓
Python Extension
    ↓
Conda Environment
    ↓
Python
```

Misalnya kita memiliki:

```text
ml
```

Di VS Code pilih Python interpreter:

```text
Python 3.12 ('ml': conda)
```

Dengan begitu kode dijalankan menggunakan environment `ml`.

---

## 43. PyCharm dan Anaconda

PyCharm juga dapat menggunakan Conda environment.

Konsepnya sama:

```text
PyCharm
   ↓
Python Interpreter
   ↓
Conda Environment
   ↓
Python
```

Jadi Anaconda bukan pengganti VS Code atau PyCharm.

Ketiganya memiliki fungsi berbeda.

```text
Anaconda
    → Environment/package management

VS Code
    → Code editor

PyCharm
    → IDE

Jupyter
    → Interactive development
```

---

## 44. Anaconda Navigator

Anaconda juga menyediakan **Anaconda Navigator**, yaitu interface grafis untuk mengelola berbagai tools.

Dengan Navigator kita dapat mengakses aplikasi seperti:

```text
Jupyter Notebook
JupyterLab
Spyder
```

dan mengelola environment secara grafis.

Namun untuk pekerjaan serius, memahami command line tetap sangat penting.

---

## 45. Command Line vs Navigator

### Navigator

Kelebihan:

* Mudah untuk pemula
* Tidak perlu menghafal command
* Interface grafis

Kekurangan:

* Kurang fleksibel
* Tidak ideal untuk automation
* Kurang membantu memahami sistem secara mendalam

### Command Line

Contoh:

```bash
conda create -n ml python=3.12
```

Kelebihan:

* Cepat
* Fleksibel
* Mudah di-script
* Lebih umum digunakan dalam workflow engineering

Sebaiknya:

> Gunakan Navigator jika nyaman dengan GUI, tetapi pelajari Conda CLI karena lebih fundamental.

---

## 46. Struktur Workflow yang Disarankan

Untuk proyek machine learning:

```text
Project
│
├── environment
│
├── data
│
├── notebooks
│
├── src
│
├── models
│
├── tests
│
└── README.md
```

Environment tidak harus berada secara fisik di folder project, tetapi project perlu memiliki cara yang jelas untuk mereproduksi environment.

---

## 47. Membuat Environment dengan Nama yang Jelas

Hindari:

```text
test
test2
baru
baru2
python
env1
```

Gunakan nama yang menjelaskan tujuan:

```text
ml-project
data-analysis
computer-vision
nlp-project
deep-learning
```

Contoh:

```bash
conda create -n computer-vision python=3.12
```

---

## 48. Environment per Project

Salah satu best practice:

```text
Project A
    ↓
environment A

Project B
    ↓
environment B

Project C
    ↓
environment C
```

Bukan:

```text
Semua project
      ↓
satu environment
```

Environment per project membuat dependency lebih mudah dikelola.

---

## 49. Export Environment

Setelah environment selesai dibuat:

```bash
conda env export > environment.yml
```

File:

```text
environment.yml
```

dapat digunakan untuk menyimpan konfigurasi environment.

Contohnya:

```yaml
name: ml
dependencies:
  - python=3.12
  - numpy
  - pandas
  - scikit-learn
```

File aktual akan memiliki dependency dan informasi tambahan sesuai environment yang diekspor.

---

## 50. Membuat Environment dari `environment.yml`

Jika mendapatkan project yang memiliki:

```text
environment.yml
```

jalankan:

```bash
conda env create -f environment.yml
```

Kemudian:

```bash
conda activate ml
```

Dengan demikian environment dapat direproduksi pada komputer lain.

---

## 51. Mengupdate Environment dari File

Jika `environment.yml` berubah:

```bash
conda env update -f environment.yml --prune
```

---

## 52. Menggunakan `requirements.txt`

Dalam ekosistem Python kita juga sering menemukan:

```text
requirements.txt
```

Contoh:

```text
numpy
pandas
matplotlib
scikit-learn
```

Install:

```bash
pip install -r requirements.txt
```

Perbedaan sederhana:

```text
environment.yml
    → Conda environment

requirements.txt
    → Python/pip dependencies
```

Keduanya sama-sama digunakan untuk membantu reproducibility, tetapi format dan cakupannya berbeda.

---

## 53. Reproducibility

Reproducibility berarti orang lain dapat membuat environment yang sama atau cukup dekat dengan environment yang kita gunakan.

Misalnya project kita menggunakan:

```text
Python 3.12
NumPy
Pandas
Scikit-learn
```

Daripada hanya mengatakan:

> Install beberapa library yang diperlukan.

Lebih baik menyediakan:

```text
environment.yml
```

atau:

```text
requirements.txt
```

---

## 54. Masalah Umum: `ModuleNotFoundError`

Misalnya:

```text
ModuleNotFoundError: No module named 'pandas'
```

Padahal merasa sudah melakukan:

```bash
pip install pandas
```

Kemungkinan Python yang digunakan berbeda.

Periksa:

```bash
where python
```

dan:

```bash
where pip
```

Kemudian dari Python:

```bash
python -m pip --version
```

Cara yang lebih aman untuk install package dengan pip:

```bash
python -m pip install pandas
```

Karena package akan diinstall melalui Python yang sedang dipanggil.

---

## 55. Masalah Jupyter Tidak Menemukan Package

Misalnya:

```python
import pandas
```

menghasilkan:

```text
ModuleNotFoundError
```

Periksa:

```python
import sys

print(sys.executable)
```

Kemudian bandingkan dengan:

```bash
where python
```

Jika berbeda environment, pilih kernel Jupyter yang benar.

---

## 56. Masalah Environment Tidak Aktif

Jika terminal menunjukkan:

```text
(base)
```

tetapi kita mengira sedang menggunakan:

```text
(ml)
```

jalankan:

```bash
conda activate ml
```

Kemudian:

```bash
conda env list
```

---

## 57. Masalah `conda` Tidak Dikenali

Jika muncul:

```text
'conda' is not recognized
```

kemungkinan terminal belum dikonfigurasi untuk Conda.

Pada Windows, cara paling mudah adalah membuka:

```text
Anaconda Prompt
```

atau:

```text
Anaconda PowerShell Prompt
```

Jika Conda tersedia di sana tetapi tidak di terminal lain, masalahnya biasanya berkaitan dengan shell initialization/PATH.

---

## 58. Inisialisasi Conda

Conda dapat diinisialisasi untuk shell tertentu.

Contoh PowerShell:

```bash
conda init powershell
```

Kemudian tutup dan buka kembali terminal.

Untuk Command Prompt:

```bash
conda init cmd.exe
```

---

## 59. Jangan Menginstall Semua Package

Kesalahan umum pemula:

```bash
conda install numpy pandas matplotlib seaborn scikit-learn tensorflow pytorch ...
```

untuk setiap project.

Lebih baik menentukan kebutuhan project.

Misalnya project machine learning klasik:

```bash
conda install numpy pandas scikit-learn matplotlib
```

Project computer vision mungkin membutuhkan dependency yang berbeda.

Prinsip:

> Install hanya dependency yang memang dibutuhkan project.

---

## 60. Memahami `PATH`

`PATH` adalah environment variable yang memberi tahu sistem operasi lokasi executable yang dapat dijalankan.

Contohnya:

```text
python
conda
pip
jupyter
```

dapat ditemukan melalui PATH.

Kita dapat melihat Python yang digunakan:

```bash
where python
```

Jika terdapat beberapa Python:

```text
C:\Python312\python.exe
C:\Users\User\miniconda3\python.exe
C:\Users\User\miniconda3\envs\ml\python.exe
```

maka penting memahami Python mana yang sedang aktif.

---

## 61. Mengapa `python` dan `pip` Harus Selaras?

Bayangkan:

```text
python
↓
Python A

pip
↓
Python B
```

Kita menjalankan:

```bash
pip install pandas
```

tetapi package masuk ke Python B.

Kemudian:

```bash
python
```

menggunakan Python A.

Akibatnya:

```python
import pandas
```

gagal.

Karena itu pendekatan:

```bash
python -m pip install pandas
```

lebih aman untuk memastikan pip dijalankan melalui Python yang dimaksud.

---

## 62. Workflow Dasar yang Direkomendasikan

Untuk project machine learning baru:

### Langkah 1 — Buat environment

```bash
conda create -n ml python=3.12
```

### Langkah 2 — Aktifkan

```bash
conda activate ml
```

### Langkah 3 — Install package

```bash
conda install numpy pandas matplotlib scikit-learn
```

### Langkah 4 — Install Jupyter jika diperlukan

```bash
conda install jupyter
```

### Langkah 5 — Jalankan JupyterLab

```bash
jupyter lab
```

---

## 63. Workflow dengan VS Code

Jika menggunakan VS Code:

```text
1. Buat Conda environment
2. Aktifkan environment
3. Install dependency
4. Buka project di VS Code
5. Pilih Python interpreter
6. Pastikan interpreter menunjuk ke environment project
7. Jalankan program
```

Contoh:

```bash
conda create -n ml python=3.12
conda activate ml
conda install numpy pandas scikit-learn
```

Kemudian pilih:

```text
Python 3.12 ('ml': conda)
```

di VS Code.

---

## 64. Workflow dengan JupyterLab

```text
1. Buat environment
2. Aktifkan environment
3. Install Jupyter
4. Install library
5. Jalankan JupyterLab
6. Pilih kernel yang benar
7. Mulai eksperimen
```

Contoh:

```bash
conda create -n ml python=3.12
conda activate ml
conda install numpy pandas scikit-learn matplotlib jupyter
jupyter lab
```

---

## 65. Workflow dengan PyCharm

```text
1. Buat Conda environment
2. Aktifkan/konfigurasi environment
3. Buka project
4. Pilih interpreter Conda
5. Install dependency
6. Jalankan aplikasi
```

PyCharm kemudian menggunakan Python dari environment tersebut.

---

## 66. Apakah Harus Menggunakan Conda untuk Machine Learning?

Tidak.

Machine learning dapat dilakukan dengan:

```text
Python + pip + venv
```

atau:

```text
Conda + Python
```

atau:

```text
uv + Python
```

dan berbagai tool lainnya.

Yang paling penting adalah memahami konsep:

```text
Python
Package
Dependency
Environment
Interpreter
Package manager
```

---

## 67. Anaconda dalam Machine Learning

Dalam workflow machine learning:

```text
Data
 ↓
Python
 ↓
Environment
 ↓
NumPy / Pandas
 ↓
Preprocessing
 ↓
Scikit-learn
 ↓
Training
 ↓
Evaluation
 ↓
Model
```

Anaconda/Conda berada pada lapisan environment management:

```text
              Project
                 │
          Conda Environment
                 │
       ┌─────────┼─────────┐
       ↓         ↓         ↓
    Python     NumPy     Pandas
                 │
            Scikit-learn
```

Anaconda bukan algoritma machine learning.

Anaconda juga bukan library machine learning.

Fungsinya terutama adalah menyediakan dan mengelola lingkungan kerja.

---

## 68. Kesalahan Konseptual yang Harus Dihindari

### Salah: Anaconda adalah bahasa pemrograman

Tidak.

Python adalah bahasa pemrogramannya.

### Salah: Conda adalah Python

Tidak.

Conda adalah package dan environment manager.

### Salah: Jupyter adalah Python

Tidak.

Jupyter adalah environment/interface untuk menjalankan kode secara interaktif.

### Salah: VS Code adalah environment

Tidak.

VS Code adalah code editor.

### Salah: Anaconda diperlukan untuk menggunakan Python

Tidak.

Python dapat digunakan tanpa Anaconda.

---

## 69. Analogi Sederhana

Bayangkan kita memiliki sebuah bengkel.

```text
Python
↓
Mesin utama

Package
↓
Peralatan

Conda
↓
Pengelola peralatan dan lingkungan

Environment
↓
Ruang kerja khusus

Jupyter
↓
Meja eksperimen

VS Code
↓
Meja kerja programmer
```

Misalnya kita memiliki:

```text
Bengkel Machine Learning
```

dan:

```text
Bengkel Web Development
```

Keduanya dapat memiliki:

```text
Python
```

tetapi menggunakan peralatan dan konfigurasi berbeda.

Environment memungkinkan keduanya tidak saling mengganggu.

---

## 70. Best Practice

Beberapa praktik yang disarankan:

### 1. Gunakan environment per project

```text
project-a → env-a
project-b → env-b
```

### 2. Gunakan nama environment yang jelas

Contoh:

```text
ml
data-analysis
nlp
computer-vision
```

### 3. Jangan install semua package ke `base`

Gunakan environment khusus.

### 4. Dokumentasikan dependency

Gunakan:

```text
environment.yml
```

atau:

```text
requirements.txt
```

### 5. Pastikan interpreter benar

Periksa:

```bash
where python
```

dan dari Python:

```python
import sys

print(sys.executable)
```

### 6. Hindari update package tanpa alasan

Update dependency secara terkontrol.

### 7. Jangan mengandalkan GUI saja

Pelajari command:

```bash
conda create
conda activate
conda deactivate
conda install
conda remove
conda list
conda env list
```

---

## 71. Command Conda yang Wajib Diketahui

| Command            | Fungsi                        |
| ------------------ | ----------------------------- |
| `conda --version`  | Melihat versi Conda           |
| `conda env list`   | Melihat environment           |
| `conda create`     | Membuat environment           |
| `conda activate`   | Mengaktifkan environment      |
| `conda deactivate` | Menonaktifkan environment     |
| `conda install`    | Install package               |
| `conda remove`     | Menghapus package             |
| `conda list`       | Melihat package               |
| `conda update`     | Update package                |
| `conda search`     | Mencari package               |
| `conda env export` | Export environment            |
| `conda env create` | Membuat environment dari file |
| `conda env remove` | Menghapus environment         |

---

## 72. Cheat Sheet

### Cek Conda

```bash
conda --version
```

### Cek Python

```bash
python --version
```

### Lihat environment

```bash
conda env list
```

### Buat environment

```bash
conda create -n ml python=3.12
```

### Aktifkan

```bash
conda activate ml
```

### Install package

```bash
conda install numpy pandas scikit-learn
```

### Lihat package

```bash
conda list
```

### Jalankan Python

```bash
python
```

### Jalankan Jupyter

```bash
jupyter notebook
```

atau:

```bash
jupyter lab
```

### Keluar environment

```bash
conda deactivate
```

### Export environment

```bash
conda env export > environment.yml
```

### Membuat environment dari file

```bash
conda env create -f environment.yml
```

---

## 73. Contoh Lengkap: Membuat Environment Machine Learning

Mulai dari awal.

### Membuat environment

```bash
conda create -n machine-learning python=3.12
```

### Aktifkan

```bash
conda activate machine-learning
```

### Pastikan Python benar

```bash
python --version
```

Kemudian:

```bash
where python
```

### Install library

```bash
conda install numpy pandas matplotlib scikit-learn
```

### Install Jupyter

```bash
conda install jupyter ipykernel
```

### Daftarkan kernel

```bash
python -m ipykernel install --user --name machine-learning --display-name "Python (machine-learning)"
```

### Jalankan JupyterLab

```bash
jupyter lab
```

Sekarang notebook dapat menggunakan:

```text
Python (machine-learning)
```

---

## 74. Cara Memastikan Environment Sudah Benar

Di notebook jalankan:

```python
import sys

print(sys.executable)
```

Kemudian:

```python
import numpy
import pandas
import sklearn

print("Environment berhasil digunakan")
```

Jika tidak ada error, environment sudah dapat digunakan untuk workflow machine learning dasar.

---

## 75. Arsitektur Sederhana Ekosistem Python

Secara konseptual:

```text
Operating System
       │
       ↓
Python / Conda
       │
       ↓
Environment
       │
       ├── Python Interpreter
       │
       ├── Package
       │    ├── NumPy
       │    ├── Pandas
       │    ├── Matplotlib
       │    └── Scikit-learn
       │
       └── Tools
            ├── Jupyter
            └── IPython
```

Editor seperti VS Code atau PyCharm berada di luar environment tetapi dapat menggunakan interpreter dari environment tersebut.

---

## 76. Hal yang Perlu Dipahami Setelah Materi Ini

Setelah memahami dasar Anaconda, jangan berhenti pada hafalan command.

Pastikan memahami hubungan:

```text
Python
   ↓
Interpreter
   ↓
Environment
   ↓
Package
   ↓
Dependency
   ↓
Package Manager
```

Dan memahami bahwa:

```text
Anaconda
    ↓
Distribusi Python

Conda
    ↓
Package + Environment Manager

Python
    ↓
Bahasa pemrograman

pip
    ↓
Python package installer

venv
    ↓
Python environment bawaan

Jupyter
    ↓
Interactive development environment

VS Code / PyCharm
    ↓
Code editor / IDE
```

---

## 77. Kesimpulan

Anaconda bukanlah sesuatu yang wajib digunakan untuk Python. Namun, Anaconda/Conda sangat berguna ketika kita bekerja dengan **Data Science, Machine Learning, Scientific Computing**, dan proyek yang memiliki banyak dependency.

Konsep terpenting yang harus dipahami adalah **environment**.

Daripada menggunakan satu Python untuk semua proyek:

```text
Semua Project
      ↓
Satu Python
      ↓
Banyak dependency
      ↓
Potensi konflik
```

lebih baik menggunakan environment:

```text
Project A
   ↓
Environment A

Project B
   ↓
Environment B

Project C
   ↓
Environment C
```

Untuk pembelajaran machine learning, workflow yang sederhana dan baik adalah:

```text
Anaconda / Miniconda
        ↓
Conda Environment
        ↓
Python
        ↓
NumPy + Pandas
        ↓
Matplotlib / Seaborn
        ↓
Scikit-learn
        ↓
Machine Learning
```

Dengan memahami Anaconda, Conda, Python, package, dependency, environment, Jupyter, dan interpreter, kita akan lebih mudah memahami **mengapa sebuah project Python bisa berjalan di satu komputer tetapi gagal di komputer lain**, serta bagaimana membangun environment machine learning yang rapi dan reproducible.
