---
sidebar_position: 5
title: "Instalasi Python"
---

Setelah memahami dasar-dasar Python dan perbedaan Python 2 dengan Python 3, langkah berikutnya adalah menyiapkan Python di komputer.

Instalasi Python diperlukan agar kita dapat menjalankan program Python secara langsung di komputer tanpa harus menggunakan online interpreter.

Pada materi ini kita akan membahas proses instalasi Python secara umum, terutama pada sistem operasi yang paling banyak digunakan.

---

## 1. Download Python

Python dapat diunduh secara gratis dari situs resminya.

Kunjungi:

https://www.python.org/

Pada halaman utama Python, pilih menu **Downloads** untuk melihat versi Python yang tersedia.

Sebaiknya gunakan versi Python 3 terbaru yang stabil.

:::warning
**Catatan:** Hindari menggunakan Python 2 karena Python 2 sudah tidak mendapatkan dukungan resmi.
:::

---

## 2. Instalasi Python di Windows

Jika menggunakan Windows, download installer Python untuk Windows dari situs resmi Python.

Setelah file installer selesai diunduh, jalankan installer tersebut.

Pada halaman awal installer, terdapat beberapa pilihan penting.

### Menambahkan Python ke PATH

Salah satu hal yang sangat penting adalah mengaktifkan opsi:

```text
Add Python to PATH
```

Opsi ini memungkinkan perintah Python dijalankan langsung melalui **Command Prompt**, **PowerShell**, atau terminal lainnya.

Setelah opsi tersebut dipilih, klik:

```text
Install Now
```

Kemudian tunggu hingga proses instalasi selesai.

Jika instalasi berhasil, biasanya akan muncul pesan bahwa proses instalasi telah selesai.

---

## 3. Mengecek Instalasi di Windows

Setelah Python selesai diinstal, buka:

- Command Prompt
- PowerShell
- Windows Terminal

Kemudian jalankan:

```text
python --version
```

Jika Python berhasil diinstal, terminal akan menampilkan versi Python yang digunakan.

Contohnya:

```text
Python 3.x.x
```

Versi yang muncul dapat berbeda tergantung versi Python yang sedang digunakan.

---

## 4. Mengecek Python dengan Python Launcher

Pada Windows, Python juga menyediakan **Python Launcher** yang biasanya dapat dipanggil menggunakan perintah `py`.

Coba jalankan:

```text
py --version
```

Jika Python terinstal dengan benar, perintah tersebut akan menampilkan versi Python.

Kita juga dapat menjalankan Python menggunakan:

```text
py
```

Jika berhasil, kita akan masuk ke Python REPL.

Contohnya:

```text
Python 3.x.x
>>>
```

Tanda `>>>` menunjukkan bahwa kita sedang berada di dalam Python REPL.

Untuk keluar dari REPL, kita dapat menggunakan:

```text
exit()
```

---

## 5. Instalasi Python di macOS

Pada macOS, Python juga dapat diinstal dari situs resmi Python.

Download installer Python untuk macOS, kemudian buka file installer tersebut.

Ikuti langkah-langkah instalasi yang diberikan hingga selesai.

Setelah proses instalasi selesai, buka aplikasi **Terminal**.

Kemudian periksa versi Python:

```text
python3 --version
```

Jika instalasi berhasil, terminal akan menampilkan versi Python.

Contohnya:

```text
Python 3.x.x
```

Pada macOS, penggunaan `python3` lebih umum digunakan untuk memastikan kita menjalankan Python 3.

---

## 6. Instalasi Python di Linux

Sebagian besar distribusi Linux sudah menyediakan Python atau package Python melalui package manager.

Namun, versi Python yang tersedia dapat berbeda tergantung distribusi Linux yang digunakan.

Pada Ubuntu dan distribusi berbasis Debian, kita dapat memeriksa apakah Python sudah tersedia dengan:

```text
python3 --version
```

Jika Python tersedia, versi yang terpasang akan ditampilkan.

Untuk menginstal Python menggunakan package manager pada sistem berbasis Debian atau Ubuntu, dapat menggunakan:

```text
sudo apt update
sudo apt install python3
```

Setelah proses instalasi selesai, periksa kembali:

```text
python3 --version
```

---

## 7. Menjalankan Python

Setelah Python berhasil diinstal, kita dapat menjalankan Python melalui terminal.

Pada Windows, dapat menggunakan:

```text
python
```

atau:

```text
py
```

Pada macOS dan Linux, umumnya menggunakan:

```text
python3
```

Jika berhasil, kita akan masuk ke Python REPL.

Contohnya:

```text
Python 3.x.x
>>>
```

Sekarang kita dapat langsung mencoba perintah Python.

Contohnya:

```python
print("Hello, Python!")
```

Python akan menampilkan:

```text
Hello, Python!
```

---

## 8. Memahami Python REPL

Ketika menjalankan Python melalui terminal dan melihat tanda:

```text
>>>
```

kita sedang berada di dalam **Python REPL**.

REPL memungkinkan kita mencoba kode Python secara interaktif tanpa membuat file terlebih dahulu.

Contohnya:

```python
>>> print("Hello Python")
Hello Python
```

Kita juga dapat mencoba operasi sederhana:

```python
>>> 10 + 20
30
```

REPL sangat berguna untuk mencoba konsep Python secara cepat.

---

## 9. Membuat File Python

Selain menggunakan REPL, program Python biasanya ditulis dalam sebuah file dengan ekstensi:

```text
.py
```

Misalnya:

```text
hello.py
```

Isi file tersebut:

```python
print("Hello Python")
```

Kemudian jalankan melalui terminal.

Pada Windows:

```text
python hello.py
```

atau:

```text
py hello.py
```

Pada macOS dan Linux:

```text
python3 hello.py
```

Jika berhasil, hasilnya:

```text
Hello Python
```

---

## 10. Instalasi Python Tidak Sama dengan Code Editor

Python dan code editor merupakan dua hal yang berbeda.

**Python** adalah bahasa pemrograman beserta implementasinya yang digunakan untuk menjalankan program Python.

Sedangkan **code editor** adalah aplikasi yang digunakan untuk menulis kode.

Contohnya:

```text
Python
  ↓
Menjalankan program

Visual Studio Code
  ↓
Menulis dan mengelola kode
```

Kita dapat menggunakan Python tanpa Visual Studio Code.

Sebaliknya, kita dapat menulis kode Python menggunakan Visual Studio Code, tetapi tetap membutuhkan Python untuk menjalankan program secara lokal.

---

## 11. Memilih Code Editor

Setelah Python berhasil diinstal, kita dapat menggunakan code editor untuk menulis program dengan lebih nyaman.

Beberapa pilihan yang populer antara lain:

- Visual Studio Code
- PyCharm
- Sublime Text
- Vim
- Neovim

Untuk pemula, **Visual Studio Code** merupakan salah satu pilihan yang populer karena memiliki banyak fitur dan extension yang mendukung pengembangan Python.

---

## 12. Memeriksa Instalasi Secara Keseluruhan

Setelah menyelesaikan instalasi, kita dapat melakukan beberapa pemeriksaan.

### Periksa Versi Python

Windows:

```text
python --version
```

atau:

```text
py --version
```

macOS/Linux:

```text
python3 --version
```

### Jalankan Python

Windows:

```text
python
```

atau:

```text
py
```

macOS/Linux:

```text
python3
```

### Jalankan Program

Buat file:

```text
hello.py
```

Kemudian isi:

```python
print("Hello Python")
```

Jalankan program tersebut melalui terminal.

Jika program menampilkan:

```text
Hello Python
```

berarti Python sudah berhasil dipasang dan dapat digunakan.

---

## 13. Masalah yang Sering Terjadi

### Perintah `python` Tidak Dikenali

Jika muncul pesan seperti:

```text
'python' is not recognized as an internal or external command
```

kemungkinan Python belum ditambahkan ke **PATH** atau terminal belum membaca perubahan environment.

Pada Windows, kita dapat mencoba:

```text
py --version
```

Jika `py` berhasil tetapi `python` tidak berhasil, Python kemungkinan sudah terpasang tetapi konfigurasi command `python` belum tersedia.

---

### Python Tidak Ditemukan di macOS atau Linux

Coba gunakan:

```text
python3 --version
```

Pada banyak sistem Unix-like, Python 3 dipanggil menggunakan `python3`, bukan `python`.

---

### Versi Python Berbeda

Tidak masalah jika versi Python yang muncul berbeda dengan versi yang digunakan dalam materi, selama versi tersebut merupakan versi Python 3 yang masih didukung dan kompatibel dengan materi pembelajaran.

---

## 14. Ringkasan Proses Instalasi

Secara sederhana, prosesnya adalah:

```text
Download Python
      ↓
Install Python
      ↓
Konfigurasi PATH
      ↓
Cek Versi Python
      ↓
Jalankan Python REPL
      ↓
Buat Program .py
      ↓
Jalankan Program
```

---

## Kesimpulan

Instalasi Python merupakan langkah awal untuk menyiapkan lingkungan pengembangan Python di komputer.

Setelah Python berhasil diinstal, kita dapat:

- Menjalankan Python melalui terminal.
- Menggunakan Python REPL.
- Membuat file dengan ekstensi `.py`.
- Menjalankan program Python.
- Menggunakan code editor atau IDE.
- Menginstal berbagai library Python sesuai kebutuhan.

Hal terpenting setelah instalasi adalah memastikan Python dapat dijalankan melalui terminal.

Jika perintah versi Python berhasil menampilkan versi Python 3 dan kita dapat menjalankan program sederhana, maka lingkungan Python dasar sudah siap digunakan untuk belajar.