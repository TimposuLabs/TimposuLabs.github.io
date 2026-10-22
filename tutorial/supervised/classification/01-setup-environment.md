---
sidebar_position: 2
title: "Setup Environment"
---

Dalam proyek Machine Learning, kita perlu menyiapkan folder kerja dan environment yang terorganisasi. Hal ini membantu memisahkan kode, dataset, dan library yang digunakan dalam setiap proyek.

Sebagai contoh, kita akan membuat proyek baru bernama `heart-disease-project` untuk mempelajari dataset penyakit jantung.

Pada materi ini, kita akan mempelajari cara membuat folder proyek, mengekspor konfigurasi environment Conda, membuat environment baru, dan menjalankan Jupyter Notebook.

:::info
Download [Heart Disease Dataset](https://www.kaggle.com/datasets/johnsmith88/heart-disease-dataset).
:::

## 1. Membuat Folder Proyek

Setiap proyek sebaiknya memiliki folder tersendiri agar file tidak tercampur dengan proyek lain.

Contohnya, kita akan membuat folder:

```text
heart-disease-project/
```

Buka terminal, kemudian jalankan perintah berikut:

```bash
mkdir heart-disease-project
cd heart-disease-project
```

Keterangan:

- `mkdir` digunakan untuk membuat folder baru.
- `cd` digunakan untuk berpindah ke folder proyek.

Dengan struktur ini, file kode, dataset, dan konfigurasi proyek dapat dikelola secara terorganisasi.

## 2. Mengekspor Environment Conda

Jika sebelumnya kita sudah memiliki environment Conda yang berisi library untuk Machine Learning, konfigurasinya dapat diekspor ke file YAML.

Aktifkan environment lama terlebih dahulu:

```bash
conda activate nama_environment
```

Ganti `nama_environment` dengan nama environment yang digunakan sebelumnya.

Kemudian, ekspor konfigurasinya:

```bash
conda env export > environment.yaml
```

File `environment.yaml` berisi informasi environment, termasuk dependensi yang digunakan.

File ini dapat dimanfaatkan untuk membuat environment baru dengan konfigurasi yang serupa.

**Catatan:** Perintah tersebut mengekspor environment yang sedang aktif. File hasil ekspor juga dapat memuat informasi spesifik sistem, seperti dependensi platform dan prefix environment.

## 3. Membuat Environment Baru dari File YAML

Setelah file `environment.yaml` tersedia, kita dapat menggunakannya untuk membuat environment baru di dalam folder proyek.

Misalnya, struktur file saat ini:

```text
workspace/
├── environment.yaml
└── heart-disease-project/
```

Masuk ke folder proyek:

```bash
cd heart-disease-project
```

Kemudian jalankan:

```bash
conda env create --prefix ./env --file ../environment.yaml
```

Keterangan:

- `--prefix ./env` membuat environment lokal di folder `env`.
- `--file ../environment.yaml` menggunakan file YAML dari folder induk.
- `conda env create` membuat environment berdasarkan konfigurasi yang tersedia.

Proses ini dapat memerlukan waktu karena Conda harus menyelesaikan dan memasang dependensi yang diperlukan.

:::tip
Cara lain dengan menentukan nama (*name*) untuk environment baru yang akan dibuat.

```bash
conda env create -n heart-disease -f path/ke/environment.yml
```

`-n heart-disease`: Menentukan nama (*name*) untuk environment baru.
:::

### Memeriksa Environment

Setelah proses selesai, periksa environment yang tersedia:

```bash
conda env list
```

Environment lokal tersebut biasanya dapat diaktifkan menggunakan:

```bash
conda activate ./env
```

Setelah aktif, perintah Python dan library akan menggunakan environment proyek tersebut.

## 4. Menyiapkan Dataset

Selanjutnya, siapkan dataset yang akan digunakan untuk proyek Machine Learning.

Contohnya:

```text
heart-disease-project/
├── env/
├── data/
│   └── heart-disease.csv
└── notebooks/
```

Folder `data` digunakan untuk menyimpan dataset, sedangkan folder `notebooks` digunakan untuk menyimpan file Jupyter Notebook.

Buat folder tersebut melalui terminal:

```bash
mkdir data
mkdir notebooks
```

Kemudian tempatkan file CSV dataset ke dalam folder `data`.

Nama file dan lokasi dataset perlu disesuaikan dengan file yang benar-benar tersedia.

## 5. Menjalankan Jupyter Notebook

Pastikan environment proyek sudah aktif:

```bash
conda activate ./env
```

Kemudian jalankan:

```bash
jupyter notebook
```

Jika Jupyter Notebook belum terpasang dalam environment, pasang terlebih dahulu:

```bash
conda install jupyter
```

Setelah instalasi selesai, jalankan kembali:

```bash
jupyter notebook
```

Buka folder `notebooks` melalui antarmuka Jupyter Notebook, kemudian buat notebook baru untuk mulai bekerja.

## 6. Memulai Analisis Data

Setelah Jupyter Notebook siap, kita dapat mulai menggunakan library Python untuk mengolah dataset.

Contohnya, membaca dataset CSV dengan Pandas:

```python
import pandas as pd

data = pd.read_csv("../data/heart-disease.csv")

data.head()
```

Sesuaikan nama file dan path apabila dataset memiliki lokasi atau nama yang berbeda.

Pada tahap ini, kita dapat mulai mengeksplorasi dataset sebelum melanjutkan ke proses pemodelan Machine Learning.

## Ringkasan

Pada materi ini, kita telah mempelajari cara memulai proyek baru dan mereplikasi environment menggunakan Conda.

Hal-hal utama yang perlu diingat:

1. Setiap proyek sebaiknya memiliki folder kerja tersendiri.
2. `conda env export` digunakan untuk mengekspor konfigurasi environment.
3. File `environment.yaml` dapat digunakan untuk membuat environment baru.
4. `--prefix ./env` memungkinkan environment ditempatkan di dalam folder proyek.
5. Dataset dan notebook sebaiknya disimpan secara terorganisasi.
6. Jupyter Notebook dapat digunakan untuk menjalankan analisis data secara interaktif.

Dengan environment yang terorganisasi, proyek Machine Learning menjadi lebih mudah dikelola dan lebih mudah direplikasi.
