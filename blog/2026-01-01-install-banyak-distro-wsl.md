---
slug: install-banyak-distro-wsl
title:  Cara Install Banyak Distro Linux di WSL
authors: topekox
tags: [wsl, linux, ubuntu]
---

Secara default, Microsoft Store hanya mengizinkan satu instalasi untuk setiap versi distro linux yang sama, namun kita dapat mengakalinya dengan teknik `export` dan `import` atau menggunakan file **image system** (`.tar`). Metode menggunakan dua distro linux yang sama ini, sangat berguna untuk memisahkan lingkungan development, misalnya satu untuk project kerjaan dan satu lagi untuk eksperimen pribadi, tanpa saling mengganggu sistem satu sama lain. 

<!--truncate-->

Berikut adalah dua cara yang bisa kita gunakan:

:::info
Pada tutorial ini saya menggunakan distro linux Ubuntu 24.04, untuk distro linux yang lain kurang lebih caranya hampir sama, tinggal menyesuaikan saja.
:::

## 1️⃣ Duplikasi Ubuntu yang Sudah Ada (Kloning)

Jika kita sudah memiliki satu instalasi Ubuntu 24.04 dan ingin membuat salinannya yang identik:

1. Buka PowerShell atau Command Prompt.
2. Ekspor distro Ubuntu yang ada ke sebuah file:
  `wsl --export Ubuntu-24.04 C:\backup\ubuntu24_master.tar`
3. Impor kembali dengan nama yang berbeda:
`wsl --import Ubuntu-24-Salinan C:\WSL\Ubuntu24_Kedua C:\backup\ubuntu24_master.tar`

## 2️⃣ Instalasi "Clean" (Tanpa Kloning / Rekomendasi)

Jika kita ingin instalasi kedua yang benar-benar clean:

1. Unduh file "**rootfs**" (sistem dasar) Ubuntu 24.04 dalam format `.tar.gz` dari [Ubuntu Cloud Images](https://cloud-images.ubuntu.com/wsl/).
2. Gunakan perintah `wsl --import` untuk mendaftarkannya sebagai distro baru:
`wsl --import Ubuntu-24-Clean C:\WSL\Ubuntu24_Clean C:\Downloads\ubuntu-24.04-server-cloudimg-amd64-wsl.rootfs.tar.gz`

## ✍️ Poin Penting:

* **Nama Berbeda**: Setiap instance harus memiliki nama unik (misalnya: `Ubuntu-24.04` dan `Ubuntu-24-Kedua`).
* **Penyimpanan Terpisah**: Pastikan folder instalasi (seperti `C:\WSL\Ubuntu24_Kedua`) berbeda untuk setiap instance agar data tidak tumpang tindih.
* **Menjalankan Spesifik**: Gunakan perintah `wsl -d Ubuntu-24-Kedua` untuk membuka instance yang baru dibuat. 

---

## 💻 BONUS: Perintah dasar WSL

Berikut adalah daftar perintah dasar WSL (*Windows Subsystem for Linux*) yang sering digunakan untuk mengelola distro Linux kita melalui PowerShell atau Command Prompt: 

### 1️⃣ Instalasi dan Pembaruan 

* **`wsl --list --online`**: Menampilkan daftar distro Linux yang tersedia untuk diunduh (misal: Debian, Kali, Ubuntu-24.04).
* **`wsl --install`**: Menginstal WSL dan distro Ubuntu secara otomatis (distro default).
* **`wsl --install -d <NamaDistro>`**: Menginstal distro spesifik dari daftar yang tersedia.
* **`wsl --update`**: Memperbarui kernel WSL ke versi terbaru. 

### 2️⃣ Manajemen Distro Terinstal

* **`wsl --list --verbose`** (atau **`wsl -l -v`**): Menampilkan semua distro yang terinstal, statusnya (**Running/Stopped**), dan versi WSL (1 atau 2) yang digunakan.
* **`wsl --set-default <NamaDistro>`**: Mengatur distro tertentu sebagai distro utama saat kita mengetik perintah wsl.
* **`wsl --unregister <NamaDistro>`**: Menghapus instalasi distro dan menghapus semua datanya secara permanen. 

### 3️⃣ Menjalankan dan Menghentikan

* **`wsl`**: Menjalankan distro Linux default dalam terminal saat ini.
* **`wsl -d <NamaDistro>`**: Menjalankan distro spesifik.
* **`wsl --terminate <NamaDistro>`**: Menghentikan paksa distro tertentu yang sedang berjalan.
* **`wsl --shutdown`**: Mematikan seluruh distro dan mesin virtual WSL sekaligus untuk menghemat RAM. 

### 4️⃣ Backup dan Pemindahan (Import/Export)

* **`wsl --export <NamaDistro> <Path\file.tar>`**: Membuat cadangan (backup) distro Linux kita ke dalam file `.tar`.
* **`wsl --import <NamaDistroBaru> <FolderTujuan> <Path\file.tar>`**: Memasang kembali distro dari file backup ke folder tertentu (bisa digunakan untuk menduplikasi distro). 

### 5️⃣ Pengaturan Versi dan Status

* **`wsl --status`**: Memeriksa konfigurasi umum WSL, seperti versi kernel dan distro default.
* **`wsl --set-version <NamaDistro> <NomorVersi>`**: Mengubah versi WSL distro (antara versi 1 atau 2).
* **`wsl --set-default-version 2`**: Memastikan semua instalasi distro baru di masa depan secara otomatis menggunakan WSL 2. 

### 🤓 Tips Tambahan:

* Untuk keluar dari terminal Linux dan kembali ke Windows, cukup ketik perintah `exit`. kita juga bisa membuka folder Linux langsung di File Explorer Windows dengan mengetik `explorer.exe` di dalam terminal WSL.
* Untuk melakukan **copy file** kita bisa menggunakan perintah Linux `cp` langsung dari dalam terminal WSL. Windows memetakan drive-nya di folder `/mnt/`. Contoh `cp namafile.txt /mnt/c/Users/NamaUser/Documents/`