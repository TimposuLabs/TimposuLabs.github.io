---
sidebar_position: 15
title: 'Docker Registry'
---

![docker](https://raw.githubusercontent.com/TopekoX/belajar-docker/9249641fc1bdb44a455a49cf4a864bfbe6455ed0/img/docker-flow.svg)

## 1️⃣ Apa itu Docker Registry?

**Docker Registry** adalah sistem penyimpanan dan distribusi terpusat untuk Docker Images. Bayangkan registry sebagai "GitHub-nya Docker", di mana kita bisa menyimpan, mengelola, dan berbagi image/citra aplikasi yang sudah dikemas. 

* **Registry**: Layanan sisi server yang meng-host image (misal: Docker Hub).
* **Repository**: Kumpulan image dengan nama yang sama tetapi memiliki label (tag) berbeda (misal: versi v1.0, v2.0) di dalam sebuah registry.

## 2️⃣ Jenis-Jenis Registry

Secara umum, registry dibagi menjadi dua kategori utama: 

* **Public Registry**: Dapat diakses oleh siapa saja. Contoh paling populer adalah [Docker Hub](https://hub.docker.com/).
* **Private Registry**: Aksesnya dibatasi untuk pengguna tertentu dalam organisasi atau tim. Berguna untuk menjaga kerahasiaan source code perusahaan.

## 3️⃣ Cara Kerja (Workflow)

Interaksi utama dengan registry melibatkan tiga perintah dasar: 
1. **Build**: Membuat image dari Dockerfile di mesin lokal.
2. **Push**: Mengunggah image lokal ke registry agar bisa diakses secara online.
3. **Pull**: Mengunduh image dari registry ke mesin lain untuk dijalankan. 

## 4️⃣ Pilihan Layanan Registry Populer

Selain Docker Hub, banyak penyedia cloud menawarkan layanan serupa dengan fitur keamanan tambahan: 

* **GitHub Container Registry (GHCR)**: Terintegrasi langsung dengan proyek GitHub.
* **Azure Container Registry (ACR)**: Untuk ekosistem Microsoft Azure.
* **Google Artifact Registry**: Untuk kebutuhan aplikasi di Google Cloud.
* **Self-Hosted Registry**: Kita bisa menjalankan server registry sendiri menggunakan image resmi registry dari Docker. 

## 5️⃣ Panduan Singkat Perintah CLI

| Perintah 	| Fungsi |
| --- | --- |
| `docker login` | Autentikasi ke registry. |
| `docker tag <old> <new>`	| Memberi label image sesuai nama repository tujuan. |
| `docker push <repo>`	| Mengirim image ke registry. |
| `docker pull <repo>` |	Mengambil image dari registry. |

## 6️⃣ Contoh Implementasi dengan Docker Hub

### Langkah 1: Login ke Docker Hub

```bash
docker login -u username_anda
```

* Sistem akan meminta Password. Sangat disarankan menggunakan **Access Token** dari Docker Hub demi keamanan.
* Jika berhasil, akan muncul pesan `Login Succeeded`.

### Langkah 2: Siapkan Image Lokal

```bash
docker build -t image-lokal-saya .
```

### Langkah 3: Memberikan Tag (Penamaan Ulang)

```bash
# Format: docker tag [nama-image-lama] [username-anda]/[nama-repo]:[versi]
docker tag image-lokal-saya ucup/aplikasi-web:v1.0
```
* `ucup`: Username Docker Hub.
* `v1.0`: Label versi (jika dikosongkan akan otomatis menjadi `latest`).

### Langkah 4: Push ke Docker Hub

Sekarang, kirim image tersebut ke server Docker Hub:

```bash
docker push ucup/aplikasi-web:v1.0
```

### Langkah 5: Verifikasi

1. Buka browser dan masuk ke Docker Hub Repositories.
2. Cek apakah repository `aplikasi-web` sudah muncul di daftar.

