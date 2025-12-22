---
sidebar_position: 2
---

# Spring Boot MVC CRUD

Spring Boot MVC CRUD adalah kombinasi framework Java yang memungkinkan pengembang membangun aplikasi web untuk mengelola data membuat (**CREAD**), membaca (**READ**), memperbarui (**UPDATE**), dan menghapus (**DELETE**) secara efisien dan terstruktur.

## 1. Konsep Utama

* **Spring Boot**: Spring yang menyederhanakan konfigurasi (*auto-configuration*) sehingga aplikasi bisa langsung dijalankan dengan server tertanam (*embedded server*).
* **MVC (Model-View-Controller)**: Arsitektur perangkat lunak yang memisahkan logika aplikasi:
    * **Model**: Mengelola struktur data dan logika bisnis.
    * **View**: Antarmuka pengguna (seperti file HTML dengan Thymeleaf).
    * **Controller**: Menangani permintaan pengguna (HTTP request) dan menghubungkan Model dengan View.
* **CRUD**: Operasi dasar data yang meliputi Create (buat), Read (baca), Update (perbarui), dan Delete (hapus). 

## 2. Komponen Teknis CRUD

Untuk membangun aplikasi CRUD pada 2025, komponen-komponen berikut umum digunakan:
* **Spring Data JPA**: Teknologi untuk pemetaan objek ke basis data (ORM) tanpa menulis banyak kode SQL manual.
* **Database**: Bisa berupa database relasional seperti MySQL, PostgreSQL, atau database in-memory seperti H2 untuk pengembangan cepat.
* **Template Engine**: Thymeleaf adalah standar modern untuk merender tampilan dinamis pada Spring Boot MVC. 

## 3. Alur Kerja Aplikasi

* **Request**: Pengguna mengirimkan permintaan (misal: klik tombol "Hapus") dari browser (View).
* **Handling**: Controller menerima permintaan tersebut dan memproses logika melalui Service.
* **Persistence**: Repository (JPA) melakukan perubahan data pada database sesuai instruksi CRUD.
* **Response**: Controller mengarahkan pengguna kembali ke halaman daftar data yang sudah diperbarui (View). 

4. Cara Memulai
Anda dapat membuat struktur awal proyek melalui Spring Initializr dengan menambahkan dependensi utama: Spring Web, Spring Data JPA, Thymeleaf, dan MySQL Driver (atau database pilihan lainnya). 
