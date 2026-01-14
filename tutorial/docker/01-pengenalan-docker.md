---
sidebar_position: 2
title: 'Pengenalan Docker'
---

## 🐳 Mengenal Docker & Revolusi Container 🚢

### 1️⃣ Analogi Dunia Nyata: Kontainer Pengiriman (Shipping Container)

Sebelum tahun 1950-an, mengirim barang sangat rumit. Karung kopi, mobil, dan tumpukan kain dimuat secara terpisah ke kapal. Jika susunannya salah, barang rusak atau bongkar muat memakan waktu berhari-hari.

Dunia logistik berubah saat **Kontainer Standar** ditemukan. Apapun isinya (kopi atau mobil), semua dimasukkan ke kotak yang ukurannya sama. Alat pengangkut (truk, kereta, kapal) hanya perlu tahu cara membawa kotak tersebut.

**Docker** melakukan hal yang sama untuk Software. Aplikasi, database, dan library dibungkus dalam satu "kotak" (Container) yang bisa berjalan di server mana pun tanpa peduli apa isinya.

### 2️⃣ Apa itu Docker 🐳?

**Docker** adalah platform terbuka untuk mengembangkan, mengirim, dan menjalankan aplikasi. Docker memungkinkan kita memisahkan aplikasi dari infrastruktur sehingga kita dapat mengirim perangkat lunak dengan cepat.

### 3️⃣ Masalah yang Diselesaikan Docker

* "**It works on my machine**": Menghilangkan perbedaan lingkungan/environment antara laptop developer (Windows/Mac) dan server produksi (Linux).
* **Konflik Dependensi**: Kita bisa menjalankan Aplikasi A yang butuh Python 2.7 dan Aplikasi B yang butuh Python 3.10 di komputer yang sama tanpa saling mengganggu.
* **Instalasi Rumit**: Daripada menginstal database secara manual selama 1 jam, kita cukup mengetik satu perintah Docker dan database siap dalam hitungan detik.

### 4️⃣ Perbedaan Utama: Container vs Virtual Machine (VM)
Banyak orang bingung membedakan keduanya. Berikut perbandingannya:

| Fitur	| Virtual Machine (VM)	| Container (Docker) |
| --- | --- | --- |
| **Sistem Operasi** |	Membawa OS utuh (Guest OS) yang berat. |	Berbagi Kernel dari host (Linux). |
| **Ukuran**	| Gigabytes (GB).	| Megabytes (MB). |
| **Kecepatan Boot** |	Menit (harus booting OS).	| Milidetik (langsung menjalankan aplikasi). |
| **Efisiensi** |	Boros RAM & CPU.	| Sangat ringan dan efisien. |

### 5️⃣ Arsitektur Docker (Tiga Komponen Utama)

Untuk belajar Docker, Anda harus paham tiga istilah ini:

* **Docker Image**: *Blueprint* atau cetakan biru aplikasi (bisa dianalogikan sebagai "resep"). Ini adalah file statis yang berisi kode, library, dan konfigurasi. (Contoh: Image Nginx, Image Alpine).
* **Docker Container**: Unit yang berjalan (*instance* dari Image). Jika Image adalah resep kue, maka Container adalah kue yang sudah jadi dan bisa dimakan.
* **Docker Registry**: Tempat menyimpan Image agar bisa diunduh orang lain. Yang paling populer adalah [Docker Hub](https://hub.docker.com/).
