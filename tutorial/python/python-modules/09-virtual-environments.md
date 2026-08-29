---
sidebar_position: 9
title: "Virtual Environments"
---

Ketika mengembangkan aplikasi Python, kita biasanya menggunakan berbagai package dari Python Standard Library maupun third-party package.

Semakin banyak project yang dikerjakan, muncul sebuah masalah penting: **setiap project dapat membutuhkan dependency dan versi package yang berbeda**.

Untuk mengatasi masalah tersebut, Python menyediakan konsep **Virtual Environment**.

## Apa Itu Virtual Environment?

**Virtual Environment** adalah lingkungan Python yang terisolasi dan dibuat khusus untuk sebuah project.

Di dalam virtual environment, project dapat memiliki package dan dependency sendiri tanpa harus bergantung pada package yang terinstal secara global di komputer.

Secara sederhana:

```text
Python Global Environment
        │
        ├── Project A
        │
        └── Project B
```

Tanpa virtual environment, beberapa project dapat menggunakan dan memodifikasi environment yang sama.

Dengan virtual environment:

```text
Project A
   ↓
Virtual Environment A
   ↓
Dependency A


Project B
   ↓
Virtual Environment B
   ↓
Dependency B
```

Setiap project memiliki environment yang terpisah.

---

## Mengapa Virtual Environment Dibutuhkan?

Salah satu alasan utama menggunakan virtual environment adalah **menghindari konflik dependency**.

Misalnya kita memiliki dua project:

```text
Project A
└── requests 1.x

Project B
└── requests 2.x
```

Project A membutuhkan versi `requests` tertentu, sedangkan Project B membutuhkan versi yang berbeda.

Jika keduanya menggunakan environment Python yang sama, perubahan versi package dapat menyebabkan salah satu project tidak bekerja dengan baik.

Dengan virtual environment:

```text
Project A
└── .venv
    └── requests versi 1.x


Project B
└── .venv
    └── requests versi 2.x
```

Kedua project dapat memiliki dependency masing-masing tanpa saling mengganggu.

---

## Isolasi Dependency

Ketika sebuah virtual environment aktif dan kita menjalankan:

```bash
pip install requests
```

package tersebut akan dipasang ke environment yang sedang aktif.

Secara konseptual:

```text
Project
   ↓
Virtual Environment
   ↓
pip install package
   ↓
Package masuk ke environment project
```

Package tersebut tidak perlu dipasang ke Python global agar dapat digunakan oleh project tersebut.

Inilah yang disebut sebagai **dependency isolation**.

---

## Virtual Environment dalam Project

Sebuah project Python biasanya dapat memiliki struktur seperti:

```text
my_project/
├── .venv/
├── main.py
└── requirements.txt
```

atau:

```text
my_project/
├── venv/
├── main.py
└── requirements.txt
```

Nama folder virtual environment dapat berbeda. Nama yang umum digunakan adalah:

```text
venv
```

atau:

```text
.venv
```

Folder tersebut berisi environment Python yang digunakan khusus untuk project.

---

## Apa yang Ada di Dalam `venv`?

Virtual environment menyediakan environment Python yang terisolasi.

Di dalamnya terdapat berbagai komponen yang diperlukan untuk menjalankan Python dan memasang package.

Salah satu bagian penting adalah:

```text
site-packages/
```

Folder tersebut digunakan untuk menyimpan package yang diinstal pada virtual environment.

Secara konseptual:

```text
.venv/
├── bin/ atau Scripts/
│   └── Python interpreter
│
└── lib/
    └── site-packages/
        ├── package A
        ├── package B
        └── package C
```

Struktur aktual dapat berbeda antara sistem operasi.

---

## Virtual Environment dan Python Interpreter

Ketika virtual environment digunakan, project akan menjalankan Python interpreter yang berasal dari environment tersebut.

Secara sederhana:

```text
Python Global
      ↓
    python

Virtual Environment
      ↓
.venv/bin/python
```

Pada Windows, lokasi interpreter biasanya berada di:

```text
.venv\Scripts\python.exe
```

Sedangkan pada macOS dan Linux biasanya:

```text
.venv/bin/python
```

IDE seperti PyCharm dan VS Code dapat dikonfigurasi untuk menggunakan interpreter dari virtual environment tersebut.

---

## Membuat Virtual Environment

Virtual environment dapat dibuat menggunakan module `venv` yang tersedia pada Python.

Perintah umum:

```bash
python -m venv myenv
```

Pada beberapa sistem, Python dapat dipanggil menggunakan:

```bash
python3 -m venv myenv
```

Perintah tersebut akan membuat folder:

```text
myenv/
```

yang berisi virtual environment.

Contohnya:

```text
my_project/
├── myenv/
└── main.py
```

Nama `myenv` bukan aturan wajib. Kita dapat menggunakan nama lain seperti:

```text
venv
```

atau:

```text
.venv
```

---

## Mengaktifkan Virtual Environment

Setelah virtual environment dibuat, kita perlu mengaktifkannya sebelum menginstal dan menggunakan dependency project.

### macOS dan Linux

Gunakan:

```bash
source myenv/bin/activate
```

Jika berhasil, terminal biasanya menunjukkan nama environment yang sedang aktif.

Contohnya:

```text
(myenv) user@computer:~/my_project$
```

Artinya environment `myenv` sedang aktif.

---

### Windows Command Prompt

Pada Command Prompt Windows:

```bat
myenv\Scripts\activate.bat
```

Setelah aktif, terminal akan menunjukkan environment tersebut.

Contohnya:

```text
(myenv) C:\my_project>
```

---

## Menonaktifkan Virtual Environment

Jika sudah selesai menggunakan virtual environment, kita dapat keluar dari environment tersebut menggunakan:

```bash
deactivate
```

Setelah itu, terminal kembali menggunakan environment Python sebelumnya.

Secara sederhana:

```text
Virtual Environment Aktif
        ↓
    deactivate
        ↓
Virtual Environment Tidak Aktif
```

---

## Menginstal Package di Virtual Environment

Setelah virtual environment aktif, kita dapat menggunakan `pip` seperti biasa.

Contohnya:

```bash
pip install requests
```

Package tersebut akan dipasang pada environment yang sedang aktif.

Alurnya:

```text
Aktifkan venv
      ↓
pip install requests
      ↓
requests masuk ke venv
      ↓
Project menggunakan requests
```

Karena setiap project dapat memiliki virtual environment sendiri, dependency dapat dipisahkan antarproject.

---

## Virtual Environment dengan IDE

IDE seperti PyCharm dan VS Code dapat menggunakan virtual environment sebagai Python interpreter.

Misalnya struktur project:

```text
my_project/
├── .venv/
└── main.py
```

IDE dapat diarahkan menggunakan:

```text
.venv/bin/python
```

atau pada Windows:

```text
.venv\Scripts\python.exe
```

Dengan demikian, ketika program dijalankan dari IDE, Python menggunakan environment project tersebut.

---

## Virtual Environment Bukan Copy Penuh Python

Virtual environment sering disebut sebagai environment Python yang terisolasi.

Namun, penting untuk memahami bahwa virtual environment bukan sekadar membuat salinan penuh instalasi Python secara manual.

Python menyediakan mekanisme khusus untuk membuat environment yang memiliki interpreter dan struktur package terisolasi.

Tujuan utamanya adalah menyediakan environment terpisah untuk dependency project.

---

## Virtual Environment dan Git

Folder virtual environment biasanya **tidak dimasukkan ke repository Git**.

Misalnya project memiliki:

```text
my_project/
├── .venv/
├── main.py
└── requirements.txt
```

Sebaiknya `.venv/` tidak di-commit ke Git repository.

Alasannya:

- Ukuran environment dapat besar.
- Environment dapat dibuat kembali.
- Environment bergantung pada sistem operasi.
- Environment tidak perlu dibagikan sebagai source code project.

Biasanya kita menambahkan:

```text
.venv/
```

atau:

```text
venv/
```

ke dalam:

```text
.gitignore
```

---

## Mengapa `requirements.txt` Dibutuhkan?

Jika virtual environment tidak disimpan ke repository, bagaimana developer lain mengetahui package apa saja yang dibutuhkan project?

Kita dapat menyimpan daftar dependency dalam:

```text
requirements.txt
```

Contohnya:

```text
requests==2.x.x
pyjokes==0.x.x
```

File tersebut menjadi daftar dependency yang diperlukan project.

Secara sederhana:

```text
Project
│
├── Source Code
│
├── requirements.txt
│
└── .venv/
      ↓
   Tidak di-commit
```

Developer lain dapat membuat virtual environment baru kemudian menginstal dependency berdasarkan file tersebut.

### Membuat `requirements.txt` secara otomatis

Kita dapat membuat file `requirements.txt` secara otomatis tanpa membuatnya secara manual, dengan menggunakan `pip freeze`.

Pastikan virtual environment sudah aktif:

```bash
source .venv/bin/activate
```

Untuk Windows:

```bash
.venv\Scripts\activate
```

Kemudian jalankan:

```bash
pip freeze > requirements.txt
```

Python akan membuat file:

```
requirements.txt
```

Contoh isinya:

```text
requests==2.32.5
pyjokes==0.8.3
```

Jadi alurnya:

```
Install package
      ↓
pip install requests
pip install pyjokes
      ↓
pip freeze
      ↓
requirements.txt
```

### Mengapa menggunakan `pip freeze`?

`pip freeze` menampilkan package yang terinstal pada environment aktif beserta versinya.

Misalnya:

```bash
pip freeze
```

menghasilkan:

```text
pip==25.x.x
pyjokes==0.8.3
requests==2.32.5
```

Kemudian:

```bash
pip freeze > requirements.txt
```

akan menyimpan output tersebut ke file.


### Cara menginstal kembali dari `requirements.txt`

Misalnya project dipindahkan ke komputer lain.

Buat virtual environment:

```bash
python -m venv .venv
```

Aktifkan:

```bash
source .venv/bin/activate
```

Kemudian:

```bash
pip install -r requirements.txt
```

Semua dependency yang tercantum di `requirements.txt` akan diinstal.

---

## Workflow Project Python

Workflow yang umum digunakan:

```text
Buat Project
     ↓
Buat Virtual Environment
     ↓
Aktifkan Virtual Environment
     ↓
Install Dependency
     ↓
Develop Project
     ↓
Simpan Dependency
     ↓
requirements.txt
     ↓
Commit Source Code
```

Sedangkan:

```text
.venv/
```

tidak perlu dimasukkan ke repository.

---

## Contoh Struktur Project

Project sederhana dapat memiliki struktur:

```text
my_project/
│
├── .venv/
│
├── main.py
│
├── requirements.txt
│
└── .gitignore
```

Dengan isi `.gitignore` misalnya:

```text
.venv/
```

Sehingga Git akan mengabaikan folder virtual environment.

---

## Virtual Environment untuk Banyak Project

Misalnya kita mengerjakan tiga project:

```text
Project A
Project B
Project C
```

Masing-masing dapat memiliki environment sendiri:

```text
Project A
└── .venv/

Project B
└── .venv/

Project C
└── .venv/
```

Dependency Project A tidak harus sama dengan Project B atau Project C.

Hal ini memberikan isolasi yang lebih baik.

---

## Global Environment vs Virtual Environment

Perbedaannya dapat digambarkan:

```text
Global Environment

Python
  │
  ├── Package A
  ├── Package B
  ├── Package C
  └── Package D

Semua project berpotensi menggunakan environment yang sama.
```

Dengan virtual environment:

```text
Project A
   │
   └── .venv
       ├── Package A
       └── Package B


Project B
   │
   └── .venv
       ├── Package C
       └── Package D
```

Setiap project memiliki dependency yang lebih terisolasi.

---

## Best Practices

Beberapa praktik yang umum digunakan dalam project Python:

### 1. Gunakan Virtual Environment

Buat environment khusus untuk setiap project.

```bash
python -m venv .venv
```

### 2. Aktifkan Sebelum Menginstal Package

Pastikan virtual environment aktif sebelum menjalankan:

```bash
pip install nama_package
```

### 3. Jangan Commit Virtual Environment

Tambahkan:

```text
.venv/
```

ke `.gitignore`.

### 4. Simpan Dependency

Gunakan:

```text
requirements.txt
```

untuk mencatat dependency project.

### 5. Gunakan Environment yang Sesuai

Pastikan IDE dan terminal menggunakan Python interpreter dari virtual environment project.

---

## Hubungan `pip`, PyPI, dan Virtual Environment

Ketiga konsep ini saling berhubungan.

```text
PyPI
 ↓
Repository Package
 ↓
pip
 ↓
Menginstal Package
 ↓
Virtual Environment
 ↓
Project Python
```

Contohnya:

```text
PyPI
 ↓
requests
 ↓
pip install requests
 ↓
.venv
 ↓
main.py
```

Dengan demikian:

- **PyPI** menyediakan package.
- **`pip`** menginstal package.
- **Virtual Environment** menyediakan environment terisolasi tempat package tersebut digunakan.

---

## Kesimpulan

**Virtual Environment** adalah environment Python yang terisolasi dan digunakan untuk memisahkan dependency antarproject.

Tujuan utamanya adalah mencegah konflik versi package dan menjaga setiap project memiliki environment yang sesuai dengan kebutuhannya.

Perintah dasar yang perlu diketahui:

```bash
python -m venv myenv
```

untuk membuat virtual environment.

Pada macOS/Linux:

```bash
source myenv/bin/activate
```

untuk mengaktifkan environment.

Pada Windows Command Prompt:

```bat
myenv\Scripts\activate.bat
```

untuk mengaktifkan environment.

Untuk keluar:

```bash
deactivate
```

Workflow sederhananya:

```text
Buat Project
     ↓
Buat Virtual Environment
     ↓
Aktifkan
     ↓
Install Package dengan pip
     ↓
Gunakan Package
     ↓
Simpan Dependency
     ↓
requirements.txt
```

Virtual environment merupakan praktik penting dalam pengembangan Python karena membuat dependency setiap project lebih **terisolasi, terkontrol, dan mudah direproduksi**.

Setelah memahami virtual environment, langkah berikutnya adalah mempelajari **dependency management dan `requirements.txt`** secara lebih mendalam.