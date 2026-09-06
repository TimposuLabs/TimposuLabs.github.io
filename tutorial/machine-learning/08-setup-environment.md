---
sidebar_position: 9
title: "Setup Environment"
---

## Pengenalan Conda

**Conda** adalah package manager dan environment manager yang banyak digunakan dalam pengembangan Python, Data Science, dan Machine Learning.

Conda membantu kita dalam dua hal utama:

1. Mengelola **package/library**
2. Mengelola **environment/project**

Dalam project Machine Learning, kedua hal tersebut sangat penting karena setiap project dapat membutuhkan versi Python dan library yang berbeda.

Contohnya:

```text
Project A
Python 3.11
scikit-learn 1.x
pandas 2.x

Project B
Python 3.12
scikit-learn versi berbeda
pandas versi berbeda
```

Jika semuanya dipasang pada satu environment global, kemungkinan terjadi konflik dependency akan semakin besar.

Dengan Conda, kita dapat membuat environment terpisah:

```text
                 Conda
                   │
        ┌──────────┼──────────┐
        │          │          │
        ▼          ▼          ▼
     env-ml     env-data    env-web
        │          │          │
     Python     Python      Python
     NumPy      Pandas      FastAPI
     Pandas     Jupyter     Uvicorn
     Sklearn    Matplotlib
```

Setiap environment dapat memiliki konfigurasi package yang berbeda.

---

## Apa Itu Package Manager?

Package manager adalah software yang digunakan untuk menginstal, menghapus, memperbarui, dan mengelola dependency sebuah aplikasi atau project.

Dalam Python terdapat beberapa package manager yang umum digunakan.

Contohnya:

- `pip`
- `conda`
- `uv`
- `poetry`

Dengan package manager kita tidak perlu mengunduh dan memasang library secara manual.

Contohnya menggunakan `pip`:

```bash
pip install pandas
```

Dengan Conda:

```bash
conda install pandas
```

Keduanya dapat digunakan untuk menginstal package Python, tetapi cara kerja dan ekosistemnya memiliki beberapa perbedaan.

---

## Apa Itu Environment Manager?

Environment manager digunakan untuk membuat lingkungan terisolasi untuk sebuah project.

Misalnya kita mempunyai dua project:

```text
Project Machine Learning
Python 3.11
scikit-learn
pandas
numpy

Project Computer Vision
Python 3.12
opencv
pytorch
numpy
```

Daripada memasang semuanya ke Python sistem, kita dapat membuat environment:

```text
ml-project
computer-vision
```

Sehingga dependency masing-masing project terisolasi.

---

## Conda vs pip

Conda dan pip sering digunakan bersama, tetapi keduanya bukan sesuatu yang sepenuhnya sama.

### pip

`pip` adalah package installer untuk Python.

Contoh:

```bash
pip install numpy
pip install pandas
pip install scikit-learn
```

pip terutama mengelola package dari ekosistem Python Package Index atau PyPI.

### Conda

Conda dapat mengelola:

- Python
- package Python
- package non-Python tertentu
- dependency
- environment

Contohnya:

```bash
conda create -n ml-env python=3.11
```

Kemudian:

```bash
conda activate ml-env
```

Lalu kita dapat memasang package:

```bash
conda install numpy pandas scikit-learn
```

---

## Anaconda, Miniconda, dan Conda

Ketiga istilah ini sering membingungkan.

### Conda

**Conda** adalah package manager dan environment manager.

Conda dapat digunakan untuk:

- membuat environment
- menghapus environment
- menginstal package
- menghapus package
- mengatur versi Python
- mengelola dependency

### Anaconda

**Anaconda** adalah distribution yang menyediakan Conda beserta banyak package Data Science.

Anaconda biasanya menyediakan banyak package sejak awal.

Contohnya:

```text
Anaconda
├── Conda
├── Python
├── NumPy
├── Pandas
├── Matplotlib
├── Jupyter
├── SciPy
└── berbagai package lainnya
```

Karena ukurannya cukup besar, Anaconda tidak selalu diperlukan untuk setiap project.

### Miniconda

**Miniconda** adalah versi minimal dari Anaconda.

Miniconda biasanya hanya menyediakan komponen dasar seperti:

```text
Miniconda
├── Conda
└── Python
```

Package lain dapat kita install sesuai kebutuhan.

Untuk pembelajaran Machine Learning, Miniconda sering menjadi pilihan yang menarik karena lebih ringan.

---

## Kapan Menggunakan Conda?

Conda sangat berguna ketika:

- memiliki banyak project Python
- membutuhkan versi Python yang berbeda
- mengembangkan Machine Learning
- mengembangkan Data Science
- menggunakan banyak dependency
- membutuhkan environment terisolasi
- bekerja dengan library yang memiliki dependency kompleks

Contohnya:

```text
Project ML
Python 3.11

Project Deep Learning
Python 3.12

Project Backend
Python 3.10
```

Ketiga project tersebut dapat menggunakan environment berbeda.

---

## Kapan Tidak Harus Menggunakan Conda?

Conda bukan keharusan untuk semua project Python.

Untuk project sederhana, kita dapat menggunakan:

```bash
python -m venv .venv
```

Kemudian:

```bash
pip install requests
```

Untuk project kecil, `venv + pip` sering kali sudah cukup.

Jadi pemilihan tool sebaiknya disesuaikan dengan kebutuhan project.

---

## Conda Environment

Conda environment adalah lingkungan Python yang terisolasi dari environment lainnya.

Misalnya:

```text
Conda
│
├── base
│
├── machine-learning
│
├── data-analysis
│
└── web-api
```

Masing-masing environment dapat mempunyai:

- versi Python sendiri
- package sendiri
- dependency sendiri

---

## Environment `base`

Ketika Conda pertama kali digunakan, biasanya terdapat environment bernama:

```text
base
```

Contohnya:

```text
(base) user@computer ~ %
```

Artinya terminal sedang berada di environment `base`.

Sebaiknya environment `base` tidak digunakan sebagai environment utama untuk semua project.

Lebih baik membuat environment khusus.

Contohnya:

```text
base
machine-learning
data-analysis
fastapi-project
```

---

## Membuat Conda Environment

Untuk membuat environment baru:

```bash
conda create -n machine-learning python=3.11
```

Penjelasan:

```text
conda create
```

digunakan untuk membuat environment.

```text
-n machine-learning
```

menentukan nama environment.

```text
python=3.11
```

menentukan versi Python.

---

## Mengaktifkan Environment

Setelah environment dibuat:

```bash
conda activate machine-learning
```

Jika berhasil, terminal biasanya akan berubah menjadi:

```text
(machine-learning) user@computer
```

Sekarang Python yang digunakan berasal dari environment tersebut.

---

## Mengecek Versi Python

Gunakan:

```bash
python --version
```

Contoh:

```text
Python 3.11.9
```

Kita juga dapat menggunakan:

```bash
python -V
```

---

## Mengecek Environment Aktif

Gunakan:

```bash
conda env list
```

Contoh:

```text
# conda environments:
#
base                    /Users/user/miniconda3
machine-learning     *  /Users/user/miniconda3/envs/machine-learning
data-analysis           /Users/user/miniconda3/envs/data-analysis
```

Tanda `*` menunjukkan environment yang sedang aktif.

---

## Melihat Package yang Terpasang

Gunakan:

```bash
conda list
```

Perintah ini akan menampilkan package yang terpasang pada environment aktif.

Contoh:

```text
numpy
pandas
scikit-learn
matplotlib
```

---

## Menginstal Package

Package dapat diinstal menggunakan Conda.

Contoh:

```bash
conda install numpy pandas matplotlib scikit-learn
```

Atau satu package:

```bash
conda install pandas
```

---

## Menggunakan pip di Conda Environment

Kita juga dapat menggunakan pip di dalam Conda environment.

Contohnya:

```bash
conda activate machine-learning
```

Kemudian:

```bash
pip install seaborn
```

Hal ini umum dilakukan ketika package yang dibutuhkan tidak tersedia atau lebih mudah dipasang melalui PyPI.

Namun sebaiknya jangan mencampur package manager secara sembarangan.

Pendekatan yang lebih aman:

1. Buat Conda environment.
2. Install dependency utama menggunakan Conda jika tersedia.
3. Gunakan pip untuk package yang memang diperlukan dari PyPI.
4. Hindari instalasi berulang dengan `conda` dan `pip` untuk package yang sama.

---

## Menonaktifkan Environment

Untuk keluar dari environment:

```bash
conda deactivate
```

Contohnya:

```text
(machine-learning) user@computer
```

menjadi:

```text
(base) user@computer
```

Jika ingin keluar dari Conda sepenuhnya, dapat menjalankan lagi:

```bash
conda deactivate
```

---

## Menghapus Environment

Jika environment sudah tidak digunakan:

```bash
conda remove -n machine-learning --all
```

Perintah tersebut akan menghapus seluruh environment beserta package di dalamnya.

Hati-hati ketika menjalankan perintah ini karena data dan package di environment tersebut akan dihapus.

---

## Membuat Environment dengan Versi Python Tertentu

Contoh menggunakan Python 3.10:

```bash
conda create -n project-python310 python=3.10
```

Python 3.11:

```bash
conda create -n project-python311 python=3.11
```

Python 3.12:

```bash
conda create -n project-python312 python=3.12
```

Dengan cara ini, beberapa project dapat menggunakan versi Python yang berbeda.

---

## Menentukan Environment untuk Project

Idealnya setiap project mempunyai environment sendiri.

Contohnya:

```text
projects/
│
├── machine-learning/
│   └── environment: ml-env
│
├── data-analysis/
│   └── environment: data-env
│
└── fastapi-api/
    └── environment: api-env
```

Hal ini membantu mencegah konflik dependency.

---

## Contoh Konflik Dependency

Misalnya:

```text
Project A membutuhkan:
pandas versi tertentu

Project B membutuhkan:
pandas versi lain
```

Jika kedua project menggunakan environment yang sama:

```text
Global Environment
├── pandas
├── numpy
├── scikit-learn
└── ...
```

bisa terjadi konflik.

Dengan environment terpisah:

```text
ml-env
├── pandas versi A
├── numpy
└── scikit-learn

data-env
├── pandas versi B
├── numpy
└── matplotlib
```

kedua project dapat berjalan secara independen.

---

## Setup Conda di Mac

Pada macOS, kita dapat menggunakan Miniconda atau Anaconda.

Untuk kebutuhan pembelajaran dan project, Miniconda merupakan pilihan yang ringan.

### Memeriksa Arsitektur Mac

Sebelum melakukan instalasi, kita dapat mengecek arsitektur CPU.

Buka Terminal:

```bash
uname -m
```

Jika hasilnya:

```text
arm64
```

berarti menggunakan Apple Silicon.

Contohnya:

- M1
- M2
- M3
- M4

Jika hasilnya:

```text
x86_64
```

berarti menggunakan arsitektur Intel.

---

## Instalasi Miniconda di Mac

Setelah installer yang sesuai diunduh, jalankan installer melalui Terminal.

Contoh untuk Apple Silicon:

```bash
bash Miniconda3-latest-MacOSX-arm64.sh
```

Untuk Mac Intel:

```bash
bash Miniconda3-latest-MacOSX-x86_64.sh
```

Ikuti instruksi installer sampai selesai.

Setelah instalasi selesai, tutup dan buka kembali Terminal.

Kemudian periksa:

```bash
conda --version
```

Contoh:

```text
conda 25.x.x
```

Versi yang muncul dapat berbeda tergantung versi Conda yang digunakan.

---

## Inisialisasi Conda di Mac

Jika perintah `conda` belum bekerja secara otomatis, jalankan:

```bash
conda init zsh
```

Kemudian restart Terminal.

Jika menggunakan Bash:

```bash
conda init bash
```

Untuk mengetahui shell yang digunakan:

```bash
echo $SHELL
```

---

## Membuat Environment di Mac

Contoh:

```bash
conda create -n machine-learning python=3.11
```

Aktifkan:

```bash
conda activate machine-learning
```

Kemudian periksa:

```bash
python --version
```

---

## Setup Conda di Windows

Pada Windows, kita dapat menggunakan:

- Anaconda
- Miniconda
- Miniforge

Untuk pembelajaran Python dan Machine Learning, Miniconda atau Miniforge dapat menjadi pilihan yang lebih ringan dibandingkan instalasi Anaconda penuh.

---

## Memeriksa Windows Terminal

Conda dapat digunakan melalui beberapa terminal, misalnya:

- Anaconda Prompt
- PowerShell
- Command Prompt
- Windows Terminal

Setelah instalasi, cara paling sederhana untuk pemula adalah menggunakan **Anaconda Prompt** atau terminal yang sudah diinisialisasi oleh Conda.

---

## Instalasi Miniconda di Windows

Setelah installer Windows diunduh, jalankan file installer.

Biasanya file memiliki format:

```text
Miniconda3-latest-Windows-x86_64.exe
```

Ikuti proses instalasi sampai selesai.

Setelah itu buka terminal baru.

Kemudian jalankan:

```bash
conda --version
```

Jika berhasil, akan muncul versi Conda.

---

## Inisialisasi Conda di Windows

Jika menggunakan PowerShell dan perintah `conda` belum tersedia, Conda dapat diinisialisasi:

```powershell
conda init powershell
```

Setelah itu tutup dan buka kembali PowerShell.

Kemudian:

```powershell
conda --version
```

---

## Membuat Environment di Windows

Gunakan:

```bash
conda create -n machine-learning python=3.11
```

Aktifkan:

```bash
conda activate machine-learning
```

Kemudian:

```bash
python --version
```

---

## Mengecek Lokasi Python di Windows

Gunakan:

```powershell
where python
```

Contoh hasil:

```text
C:\Users\User\miniconda3\envs\machine-learning\python.exe
```

Hal ini berguna untuk memastikan Python yang digunakan berasal dari environment yang benar.

---

## Setup Conda di Linux

Pada Linux, Conda dapat digunakan melalui:

- Miniconda
- Anaconda
- Miniforge

Untuk server atau environment development yang ringan, Miniconda sering menjadi pilihan praktis.

---

## Memeriksa Arsitektur Linux

Gunakan:

```bash
uname -m
```

Contoh:

```text
x86_64
```

atau:

```text
aarch64
```

Pemilihan installer harus disesuaikan dengan arsitektur sistem.

---

## Instalasi Miniconda di Linux

Setelah installer diunduh, berikan permission:

```bash
chmod +x Miniconda3-latest-Linux-x86_64.sh
```

Kemudian jalankan:

```bash
./Miniconda3-latest-Linux-x86_64.sh
```

Ikuti instruksi instalasi sampai selesai.

Biasanya installer akan menanyakan apakah Conda akan diinisialisasi ke shell.

Pilih opsi yang sesuai jika ingin menggunakan Conda secara langsung dari terminal.

---

## Mengaktifkan Conda di Linux

Setelah instalasi selesai, restart terminal.

Kemudian:

```bash
conda --version
```

Jika belum tersedia, shell dapat diinisialisasi menggunakan:

```bash
conda init bash
```

Jika menggunakan Zsh:

```bash
conda init zsh
```

Setelah itu restart terminal.

---

## Membuat Environment di Linux

Contoh:

```bash
conda create -n machine-learning python=3.11
```

Aktifkan:

```bash
conda activate machine-learning
```

Periksa:

```bash
python --version
```

---

## Struktur Environment Conda

Secara konseptual, environment dapat dibayangkan seperti berikut:

```text
Miniconda / Anaconda
│
├── base
│   ├── Python
│   └── Conda
│
├── machine-learning
│   ├── Python
│   ├── NumPy
│   ├── Pandas
│   ├── Matplotlib
│   └── Scikit-Learn
│
├── data-analysis
│   ├── Python
│   ├── Pandas
│   ├── NumPy
│   └── Matplotlib
│
└── fastapi-project
    ├── Python
    ├── FastAPI
    └── Uvicorn
```

Setiap environment memiliki dependency yang dapat dikelola secara terpisah.

---

## Workflow Conda untuk Project Machine Learning

Workflow yang umum digunakan:

```text
Install Conda
     │
     ▼
Buat Environment
     │
     ▼
Pilih Versi Python
     │
     ▼
Aktifkan Environment
     │
     ▼
Install Package
     │
     ▼
Buat Project
     │
     ▼
Kerjakan Project
     │
     ▼
Export Environment
```

Contohnya:

```bash
conda create -n machine-learning python=3.11
```

Kemudian:

```bash
conda activate machine-learning
```

Install package:

```bash
conda install numpy pandas matplotlib scikit-learn
```

---

## Membuat Environment dari File

Environment dapat disimpan ke dalam file.

Gunakan:

```bash
conda env export > environment.yml
```

Contoh struktur file:

```yaml
name: machine-learning
channels:
  - defaults
dependencies:
  - python=3.11
  - numpy
  - pandas
  - matplotlib
  - scikit-learn
```

File tersebut dapat disimpan di repository project.

Contohnya:

```text
machine-learning-project/
│
├── notebooks/
├── src/
├── data/
├── environment.yml
└── README.md
```

---

## Membuat Environment dari `environment.yml`

Jika project memiliki file:

```text
environment.yml
```

environment dapat dibuat menggunakan:

```bash
conda env create -f environment.yml
```

Kemudian aktifkan:

```bash
conda activate machine-learning
```

Cara ini sangat berguna ketika project dikerjakan oleh beberapa orang.

---

## Memperbarui Environment dari File

Jika `environment.yml` berubah, gunakan:

```bash
conda env update -f environment.yml --prune
```

Option `--prune` dapat membantu menghapus dependency yang sudah tidak didefinisikan dalam environment file.

---

## Export Environment untuk Reproduksi

Salah satu tujuan utama environment adalah **reproducibility**.

Misalnya project Machine Learning dibuat menggunakan:

```text
Python 3.11
NumPy
Pandas
Scikit-Learn
Matplotlib
```

Konfigurasi tersebut dapat disimpan.

Orang lain kemudian dapat membuat environment yang sama:

```bash
conda env create -f environment.yml
```

Hal ini sangat berguna dalam:

- pembelajaran
- penelitian
- Machine Learning
- Data Science
- deployment
- kerja tim

---

## Conda dan Jupyter Notebook

Conda sangat sering digunakan bersama Jupyter.

Misalnya kita membuat environment:

```bash
conda create -n machine-learning python=3.11
```

Aktifkan:

```bash
conda activate machine-learning
```

Kemudian install Jupyter:

```bash
conda install jupyter
```

Jalankan:

```bash
jupyter lab
```

Notebook yang dijalankan dari environment tersebut dapat menggunakan package yang telah dipasang pada environment.

---

## Memastikan Jupyter Menggunakan Environment yang Benar

Untuk project Machine Learning, penting memastikan kernel Jupyter menggunakan environment yang benar.

Install `ipykernel`:

```bash
conda install ipykernel
```

Kemudian daftarkan environment:

```bash
python -m ipykernel install --user --name machine-learning --display-name "Python (machine-learning)"
```

Ketika membuka Jupyter, pilih:

```text
Python (machine-learning)
```

Dengan demikian notebook akan menggunakan Python dari environment tersebut.

---

## Conda Environment dan VS Code

Conda juga dapat digunakan bersama Visual Studio Code.

Contoh struktur:

```text
machine-learning/
├── notebooks/
├── src/
├── data/
└── environment.yml
```

Setelah environment dibuat:

```bash
conda create -n machine-learning python=3.11
```

aktifkan:

```bash
conda activate machine-learning
```

Di VS Code, pilih Python interpreter dari environment:

```text
machine-learning
```

Hal ini penting agar kode yang dijalankan oleh VS Code menggunakan dependency dari environment yang benar.

---

## Perintah Conda yang Penting

Berikut beberapa perintah yang paling sering digunakan:

| Perintah | Fungsi |
|---|---|
| `conda --version` | Melihat versi Conda |
| `conda info` | Melihat informasi Conda |
| `conda env list` | Melihat environment |
| `conda create` | Membuat environment |
| `conda activate` | Mengaktifkan environment |
| `conda deactivate` | Menonaktifkan environment |
| `conda install` | Menginstal package |
| `conda update` | Memperbarui package |
| `conda remove` | Menghapus package |
| `conda list` | Melihat package |
| `conda env export` | Export environment |
| `conda env create` | Membuat environment dari file |
| `conda env update` | Memperbarui environment |
| `conda clean` | Membersihkan cache tertentu |

---

## Contoh Workflow Lengkap

Misalnya kita ingin membuat project Machine Learning baru.

### Membuat Project

```bash
mkdir machine-learning-project
cd machine-learning-project
```

### Membuat Environment

```bash
conda create -n ml-project python=3.11
```

### Mengaktifkan Environment

```bash
conda activate ml-project
```

### Menginstal Library

```bash
conda install numpy pandas matplotlib scikit-learn
```

Jika membutuhkan Seaborn:

```bash
pip install seaborn
```

### Memeriksa Python

```bash
python --version
```

### Memeriksa Package

```bash
conda list
```

### Menjalankan Jupyter

```bash
jupyter lab
```

---

## Kesalahan yang Sering Terjadi

### Conda Tidak Ditemukan

Jika muncul:

```text
conda: command not found
```

atau Windows menampilkan pesan bahwa `conda` tidak dikenali, kemungkinan Conda belum masuk ke PATH atau shell belum diinisialisasi.

Solusinya dapat berupa:

```bash
conda init
```

Kemudian restart terminal.

---

### Environment Belum Diaktifkan

Misalnya kita sudah membuat:

```bash
conda create -n machine-learning python=3.11
```

tetapi lupa:

```bash
conda activate machine-learning
```

Package kemudian mungkin terpasang pada environment yang tidak kita inginkan.

Biasakan memeriksa prompt terminal:

```text
(machine-learning)
```

sebelum bekerja.

---

### Python yang Digunakan Salah

Jika project seharusnya menggunakan Python 3.11 tetapi:

```bash
python --version
```

menunjukkan versi lain, periksa environment:

```bash
conda env list
```

Kemudian aktifkan:

```bash
conda activate machine-learning
```

---

### Jupyter Menggunakan Kernel yang Salah

Jupyter dapat menggunakan kernel dari environment berbeda.

Pastikan environment sudah didaftarkan:

```bash
python -m ipykernel install --user --name machine-learning --display-name "Python (machine-learning)"
```

Kemudian pilih kernel yang sesuai di Jupyter.

---

## Apakah Setiap Project Harus Memiliki Environment?

Untuk project yang serius, **sangat disarankan setiap project memiliki environment sendiri**.

Contohnya:

```text
Project A
└── environment A

Project B
└── environment B

Project C
└── environment C
```

Tidak berarti setiap project harus selalu menggunakan Conda.

Pilihan dapat berupa:

```text
Conda
venv
uv
Poetry
```

Yang paling penting adalah dependency project terisolasi dan dapat direproduksi.

---

## Rekomendasi untuk Pembelajaran Machine Learning

Untuk pembelajaran Machine Learning menggunakan Python, struktur sederhana yang dapat digunakan:

```text
machine-learning/
│
├── notebooks/
│   ├── 01-introduction.ipynb
│   ├── 02-data-preprocessing.ipynb
│   ├── 03-regression.ipynb
│   └── 04-classification.ipynb
│
├── data/
│
├── src/
│
├── models/
│
├── environment.yml
│
└── README.md
```

Environment:

```bash
conda create -n machine-learning python=3.11
```

Kemudian:

```bash
conda activate machine-learning
```

Package dasar:

```bash
conda install numpy pandas matplotlib scikit-learn jupyter
```

Jika membutuhkan Seaborn:

```bash
pip install seaborn
```

---

## Checklist Setup Conda

Setelah instalasi, pastikan beberapa hal berikut sudah berhasil.

### Conda

```bash
conda --version
```

### Python

```bash
python --version
```

### Environment

```bash
conda env list
```

### Package

```bash
conda list
```

### Aktivasi

```bash
conda activate machine-learning
```

### Jupyter

```bash
jupyter lab
```

Jika seluruhnya berjalan dengan baik, environment sudah siap digunakan untuk pembelajaran Machine Learning.

---

## Kesimpulan

Conda merupakan tool yang sangat berguna untuk mengelola environment dan dependency, terutama pada project Python yang melibatkan banyak library seperti Data Science dan Machine Learning.

Konsep utama yang perlu dipahami:

```text
Conda
│
├── Package Management
│
├── Environment Management
│
├── Python Version Management
│
└── Dependency Management
```

Workflow dasar yang perlu dikuasai:

```bash
conda create -n machine-learning python=3.11
conda activate machine-learning
conda install numpy pandas matplotlib scikit-learn
```

Untuk project yang dapat digunakan kembali atau dikerjakan bersama orang lain, simpan konfigurasi environment:

```bash
conda env export > environment.yml
```

Kemudian environment dapat dibuat kembali menggunakan:

```bash
conda env create -f environment.yml
```

Dengan memahami Conda dan environment, kita dapat membangun workflow Python yang lebih terstruktur, terisolasi, dan reproducible.
