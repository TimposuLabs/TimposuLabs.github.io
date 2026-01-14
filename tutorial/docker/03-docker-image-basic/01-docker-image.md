---
sidebar_position: 1
title: 'Docker Image'
---

## 1️⃣ Apa itu Docker Image?

Jika kita menggunakan analogi pemrograman berorientasi objek (OOP), **Docker Image** adalah **Class**, sedangkan **Docker Container** adalah **Object** (hasil cetakan dari Class tersebut).

Secara teknis, Docker Image adalah file *read-only* (hanya-baca) yang berisi semua yang dibutuhkan untuk menjalankan aplikasi:

* Kode aplikasi.
* Runtime (misalnya: JRE untuk Java, Python Interpreter).
* Library/Dependensi.
* Variabel lingkungan (Environment Variables).
* Konfigurasi file sistem.

## 2️⃣ Karakteristik Utama Image

* **Immutable (Tidak Berubah)**: Sekali image dibuat, isinya tidak bisa diubah. Jika ada perubahan kode, maka harus membuat image baru.
* **Layered (Berlapis)**: Image dibangun dari lapisan-lapisan (layers). Setiap perintah di Dockerfile membuat satu layer baru.
* **Portabilitas**: Image yang dibuat di laptop anda dijamin akan berjalan sama persis di server mana pun.

## 3️⃣ Docker Registry

### Apa itu Docker Registry

**Docker Registry** adalah sistem penyimpanan dan distribusi untuk Docker Image. Ketika kita "mendorong" (Push) image buatan kita ke registry, dan orang lain (atau server) bisa "menariknya" (Pull) untuk dijalankan sebagai kontainer.

### Jenis-Jenis Registry

**A. Public Registry (Terbuka untuk Umum)**

* **Docker Hub**: Registry terbesar dan standar bawaan Docker. Tempat tinggal image resmi seperti `nginx`, `alpine`, `python`, dan `openjdk`.
* **GitHub Container Registry (GHCR)**: Mulai populer digunakan karena terintegrasi langsung dengan kode sumber di GitHub.
* **Quay.io**: Milik Red Hat, sering digunakan untuk image skala perusahaan/enterprise.

**B. Private Registry (Tertutup/Internal)**

Banyak perusahaan tidak ingin kode aplikasinya bisa di-download siapa saja. Mereka menggunakan registry pribadi:

* **Layanan Cloud**: AWS ECR (Elastic Container Registry), Google Artifact Registry, atau Azure Container Registry.
* **Self-Hosted**: Kita bisa menjalankan server registry sendiri menggunakan Docker Registry Open Source atau Harbor.

## 4️⃣ Naming & Tagging

Agar image tidak tertukar di registry publik, Docker menggunakan struktur nama:

```
[REGISTRY_HOST/][USERNAME/][REPOSITORY_NAME]:[TAG]
```

* **Contoh Image Resmi**: `alpine:latest` (Langsung nama karena milik Docker Hub resmi).
* **Contoh Image Anda**: `username_anda/java-app:v1.0` (Ada username agar unik).
* **Contoh Image Perusahaan**: `ghcr.io/perusahaan/backend:stable` (Menunjuk ke server GitHub).
