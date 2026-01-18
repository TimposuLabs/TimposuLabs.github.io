---
sidebar_position: 2
title: 'Instruksi Dockerfile FROM & LABEL'
---

## 1️⃣ Instuksi `FROM`

Instruksi `FROM` adalah instruksi **wajib** yang harus ada di setiap Dockerfile (biasanya di baris pertama). Instruksi ini menentukan **Base Image** (image dasar) yang akan menjadi fondasi aplikasi.

* **Fungsi**: Mengambil sistem operasi minimal atau runtime bahasa tertentu dari registry (seperti Docker Hub).
* **Sintaks**: `FROM <image>[:<tag>]`

Contoh menggunakan base image Ubuntu 24.04:

```
FROM ubuntu:24.04
```

Jika kita tidak menggunakan base image dari nol/kosong, gunakan perintah `scratch`. Perintah `scratch` akan memberitahu docker bahwa kita akan membangun image dari nol.

```
FROM scratch
```

:::info
`scratch` adalah sebuah reserved image (image khusus) di Docker yang **benar-benar kosong**, tidak memiliki sistem operasi (tidak memiliki Userland). Jika kita menggunakan `FROM scratch`, artinya kita memulai dengan **filesystem yang hampa**.
:::

## 2️⃣ Instruksi `LABEL` (Metadata Image)

Instruksi `LABEL` digunakan untuk menambahkan metadata (informasi tambahan) ke dalam image Anda. Informasi ini tidak memengaruhi cara aplikasi berjalan, tetapi sangat berguna untuk organisasi dan dokumentasi.

* **Fungsi**: Menyimpan informasi seperti pembuat, versi, deskripsi, atau lisensi.
* **Sintaks**: `LABEL <key>=<value>`

Contoh:

```
LABEL maintainer="ucup@gmail.com"
LABEL version="1.0"
LABEL description="Aplikasi Java Spring Boot untuk Inventaris"
LABEL build_date="2026-01-18"
```

Atau bisa dibuat satu baris:

```
LABEL maintainer="Ucup Topekox" email="ucup@gmail.com" environtment="development"
```

## 3️⃣ Contoh Implementasi Gabungan

```
# Menggunakan base image spesifik (Best Practice)
FROM alpine:3.21.3

# Menambahkan identitas ke image (Metadata)
LABEL org.opencontainers.image.authors="Ucup Dev"
LABEL org.opencontainers.image.description="Linux Minimalis untuk Testing"
LABEL environment="production"
```

### Cara Melihat Label Setelah Build

Jika image sudah jadi, kita bisa melihat label yang Anda buat menggunakan perintah inspect:

```
docker image inspect --format='{{.Config.Labels}}' <nama_image>
```

## 4️⃣ Build

Setelah Dockerfile selesai ditulis, kita harus mengubahnya menjadi Image menggunakan perintah docker build.

```
docker build -t <nama-image>:<tag> .
```

Contoh:

```
docker image build -t topekox/first-dockerfile:1.0.0 .
```

:::tip
Baca Juga: **[Docker File & Build](/docker/docker-image-basic/docker-file-and-build)**
:::
