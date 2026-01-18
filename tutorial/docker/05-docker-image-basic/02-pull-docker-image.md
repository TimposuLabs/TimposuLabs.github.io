---
sidebar_position: 2
title: 'Pull Docker Image'
---

## 🚀 Apa itu Docker Pull?

`docker pull` adalah perintah yang digunakan untuk mengunduh (download) Docker Image dari sebuah registry (seperti Docker Hub) ke komputer lokal Anda.

Sebelum bisa menjalankan sebuah kontainer, Docker harus memiliki image-nya terlebih dahulu.

### 1️⃣ Melihat Daftar Docker Image

Untuk menampilkan Daftar Docker Image yang ada di komputer kita:

```
docker image ls
```

### 2️⃣ Download Image Docker

* Cari docker image di https://hub.docker.com atau search dengan perintah:

```
docker search <nama_image>
```

* Download / pull image

```
docker image pull <name_space>/<nama_image>:<tag>
```

atau

```
docker image pull <nama_image>:<tag>
```

* **`<name_space>`** biasanya sama dengan username dari pembuat image, berupa alamat kumpulan dari image-image yang dipublish oleh pembuat image tersebut. Jika melakukan pulling dari official image maka tidak perlu menyertakan `<name_space>`.
* **nama_image**: Nama repositori (misal: nginx, mysql, openjdk).
* **tag**: Versi spesifik dari image tersebut (misal: 17-alpine, latest, 8.4). Jika **tag** tidak disebutkan, Docker akan otomatis mengambil versi `latest`.

Contoh pull image database `mysql` dengan tag `8.4.7`:

```
docker pull mysql:8.4.7
```

## 🚀 Docker Pull & Run

Kita tidak wajib melakukan `pull` secara manual sebelum melakukan `run`. Docker didesain untuk bekerja secara otomatis. Saat Anda mengetik perintah `docker run`, Docker Engine akan melakukan pengecekan berantai seperti ini:

* **Cek Lokal**: Apakah image sudah ada di komputer/server.
* **Jika TIDAK ADA**: Docker otomatis melakukan `pull` dari Docker Hub (atau registry lain).
* **Jika ADA (atau setelah pull selesai)**: Docker melakukan **create** (membuat kontainer).
* **Start**: Docker langsung menjalankan (**run**) kontainer tersebut.

### Contoh Skenario: Menjalankan Nginx

Cukup dengan satu perintah ini:

```
docker run -d -p 8080:80 --name my-web nginx:stable-bullseye
```

Yang terjadi di balik layar:

* **Step 1 (Pull)**: Jika Anda belum punya **nginx:stable-bullseye**, terminal akan memunculkan tulisan *"Unable to find image... pulling from library/nginx"*.
* **Step 2 (Run)**: Setelah download selesai, terminal akan memunculkan ID panjang yang menandakan kontainer sudah aktif di port `8080`.

:::tip
Untuk data parameter pada saat menggunakan Docker Pull & Run silahkan merujuk ke dokumentasi masing-masing image registry.
:::
