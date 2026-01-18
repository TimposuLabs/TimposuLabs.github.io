---
sidebar_position: 4
title: 'Linux dan Docker'
---

Hubungan antara Docker dan Linux sangatlah erat. Secara historis dan teknis, Docker sebenarnya adalah sekelompok fitur kernel Linux yang "dibungkus" sedemikian rupa agar mudah digunakan.

## 1️⃣ Linux

Secara teknis, "Linux" sebenarnya hanyalah nama bagi Kernel. Namun, dalam penggunaan sehari-hari, yang kita sebut sebagai "OS Linux" (seperti Ubuntu, Debian, Fedora, atau Alpine) adalah gabungan dari **Kernel** dan **Userland**.

Jadi untuk menjadi Sistem Operasi yang utuh Linux harus terdiri dari **Kernel** dan **Userland**.

![Docker Linux](/img/docker/docker1.png)

## 2️⃣ Kernel

Kernel adalah bagian inti dari sistem operasi yang berjalan di **Kernel Space**. Ia memiliki akses penuh ke hardware.

Tugas Utama:

* **Manajemen Proses**: Mengatur kapan aplikasi boleh menggunakan CPU.
* **Manajemen Memori**: Memastikan satu aplikasi tidak mengambil RAM milik aplikasi lain.
* **Device Drivers**: Menjadi jembatan komunikasi dengan disk, kartu jaringan, dan monitor.
* **Keamanan**: Mengatur hak akses file.

:::tip
**Analogi**: Kernel adalah **Koki di Dapur**. Dialah yang memegang kompor, pisau, dan bahan makanan. Pelanggan tidak boleh masuk ke dapur demi keamanan.
:::

## 3️⃣ Userland (Ruang Interaksi Pengguna)

Userland (atau User Space) adalah lingkungan (environment) tempat semua aplikasi yang kita gunakan berjalan. Userland tidak punya akses langsung ke hardware, Userland harus "meminta izin" kepada Kernel melalui sesuatu yang disebut System Calls.

Beberapa komponen dalam Userland:

* **C Libraries (libc)**: Library standar yang menerjemahkan bahasa manusia ke bahasa Kernel (seperti `glibc` di Ubuntu atau `musl` di Alpine).
* **Shell**: Tempat kita mengetik perintah (`bash`, `zsh`, `sh`).
* **Utilities**: Perintah dasar seperti `ls`, `mkdir`, `cp`.
* **File System**: Struktur folder seperti `/etc`, `/var`, `/bin`.
* **Aplikasi**: Browser, Python, Docker Engine, JDK.

:::tip
**Analogi**: Userland adalah Ruang Makan. Meja, kursi, dan pelayan ada di sini. Jika kamu ingin makan (mengakses hardware), kamu harus memesan (System Call) lewat pelayan.
:::

Ada banyak jenis Linux (Ubuntu, Debian, Alpine, CentOS), semuanya mungkin menggunakan Kernel yang sama, tetapi mereka memiliki Userland yang berbeda.

## 4️⃣ Hubungan Linux dengan Docker

Secara arsitektural, **Docker Engine (Daemon)** berjalan sepenuhnya di **Userland** (User Space), bukan di dalam Kernel.

Agar lebih tergambar, mari kita bagi lokasinya menjadi dua bagian:

**1. Docker Engine (Di User Space Host)**

    Program `dockerd` (daemon) dan CLI `docker` adalah aplikasi biasa yang berjalan di userland OS Host.
    * Ia tidak punya hak istimewa untuk memodifikasi kode kernel.
    * Ia bekerja seperti "mandor" yang mengirimkan instruksi ke Kernel melalui System Calls.

**2. Container (Di User Space Terisolasi)**
    
    Setiap container yang dijalankan juga berada di userland. Bedanya, Docker menggunakan fitur kernel (Namespaces) untuk membuat "dinding" di sekitar proses tersebut sehingga ia merasa berada di sistem operasi yang berbeda.

### 🤔 Kenapa Docker ditaruh di Userland?

* **Keamanan**: Jika Docker Engine berada di dalam Kernel (Kernel Space) dan terjadi bug atau crash, maka seluruh komputer/server kamu akan langsung mati (kernel panic). Karena di Userland, jika Docker error, OS host tetap stabil.
* **Abstraksi**: Docker bertugas memudahkan kita. Daripada kamu mengetik perintah kernel yang sangat rumit untuk membuat isolasi secara manual, kamu cukup mengetik `docker run`. Docker Engine yang akan menerjemahkan perintah userland tersebut menjadi instruksi kernel.
* **Portabilitas Userland**: Seperti yang kita bahas tadi, karena Docker di userland, ia bisa membawa "Userland OS lain" (seperti Alpine di dalam Ubuntu) tanpa mengganggu userland milik Host.

### ✍️ Userspace pada Docker Container

Docker Engine tidak membawa userspace-nya sendiri dalam artian ia tidak membawa distro Linux lengkap untuk dirinya sendiri. Docker Engine adalah sebuah binary aplikasi yang berjalan secara native di atas userspace Host.

Namun yang unik, untuk Container, ceritanya sedikit berbeda. Mari kita lihat pembagiannya:

**1. Docker Engine (Pihak Pengelola)**

Docker Engine adalah aplikasi yang diinstal langsung di OS Host.

* Jika kamu instal Docker di Ubuntu, maka Docker Engine menggunakan pustaka (libraries) milik Ubuntu Host tersebut untuk berjalan.
* Ia tidak butuh "mini-OS" tambahan hanya untuk menjalankan dirinya sendiri.

**2. Container (Pihak yang Dikelola)**
Di sinilah keajaibannya. Setiap container membawa userspace-nya sendiri yang spesifik sesuai image yang kamu pilih, tetapi hanya bagian yang diperlukan saja.

* **Isolasi Root Filesystem**: Saat menjalankan container contohnya `alpine`, Docker memberikan container tersebut sebuah struktur folder (`/bin`, `/lib`, `/etc`) yang berasal dari image Alpine.
* **Bukan OS Lengkap**: Userspace di dalam container ini **tidak berisi kernel**, ia hanya berisi *file system* dan *libraries* (atau bisa dikatakan hanya membawa Userland-nya sendiri).

Jadi Image Docker **tidak pernah membawa Kernel**. Jika kita menjalankan image CentOS di atas Host Ubuntu, container CentOS tersebut sebenarnya tetap dikendalikan oleh Kernel Ubuntu.

:::info
**Analogi Sederhana: Apartemen**
Bayangkan OS Host adalah sebuah **Gedung Apartemen**.

* **Kernel**: Adalah sistem kelistrikan, air, dan fondasi gedung (hanya ada satu untuk semua).
* **Docker Engine**: Adalah **Manajer Gedung**. Dia tidak butuh gedung sendiri, dia tinggal dan bekerja di dalam gedung tersebut menggunakan fasilitas yang ada.
* **Container**: Adalah Unit-unit Kamar.
    * Setiap penghuni (container) bisa mendekorasi interiornya secara berbeda (Userspace: ada yang gaya Minimalis/Alpine, ada yang gaya Klasik/Ubuntu).
    * Meskipun interiornya beda, mereka semua tetap menggunakan listrik dan air yang sama dari gedung tersebut (Kernel).
:::

### 👀 Bagaimana dengan Docker Desktop?

Jika menggunakan Docker Desktop (di Windows atau Mac), Docker sebenarnya menjalankan satu Virtual Machine Linux yang sangat ringan di background. Dalam kasus ini, Docker Engine berjalan di userspace milik VM tersebut, bukan langsung di Windows/Mac kamu.
