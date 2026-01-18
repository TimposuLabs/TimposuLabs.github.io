---
sidebar_position: 4
title: 'Docker File & Build'
---

## 1️⃣ Dockerfile

Dockerfile adalah sebuah file teks tanpa ekstensi yang berisi serangkaian instruksi untuk membangun sebuah Docker Image secara otomatis. Dockerfile harus disimpan dengan nama file `Dockefile`.

### 🧠 Instruksi Dockerfile

Berikut adalah Struktur Instruksi Dockerfile yang Paling Sering Digunakan:

* **`FROM`**: Menentukan base image (pondasi).
    * Contoh: `FROM alpine:3.21` atau `FROM eclipse-temurin:21-jre`.
* **`WORKDIR`**: Menentukan direktori kerja di dalam kontainer. Semua perintah setelah ini akan dijalankan di folder tersebut.
    * Contoh: `WORKDIR /app`
* **`COPY / ADD`**: Menyalin file dari laptop/host ke dalam image.
    * Contoh: `COPY . .` (Menyalin semua isi folder saat ini ke `WORKDIR`).
* **`RUN`**: Menjalankan perintah saat proses pembuatan image (seperti instalasi paket).
    * Contoh: `RUN apk add --no-cache curl`
* **ENV**: Mengatur variabel lingkungan (Environment Variables).
    * Contoh: `ENV APP_PORT=8080`
* **`EXPOSE`**: Memberi tahu Docker bahwa aplikasi mendengarkan di port tertentu (hanya dokumentasi).
    * Contoh: `EXPOSE 8080`
* **`CMD / ENTRYPOINT`**: Menentukan perintah yang dijalankan saat kontainer dimulai.
    Contoh: `CMD ["java", "-jar", "app.jar"]`

Contoh sebuah docker file dalam file `Dockerfile`:

```dockerfile
FROM eclipse-temurin:21-jre
LABEL version="1.0"
LABEL maintainer="Ucup Topekox" email="ucup@gmail.com" environment="development"
ENV DATABASE_NAME=perpustakaan
COPY Hello.class Hello.class
CMD ["java", "Hello"]
```

:::tip
Instruksi Dockerfile akan dibahas lebih dalam pada materi **[Docker Image - Advance](/docker/docker-image-advance)**.
:::

## 2️⃣ Build (Membangun Image)

Setelah Dockerfile selesai ditulis, kita harus mengubahnya menjadi Image menggunakan perintah docker build.

```
docker build -t <nama-image>:<tag> .
```

Contoh:

```
docker image build -t topekox/first-dockerfile:0.0.3 .
```

* **`-t`** (tag): Memberikan nama dan versi pada image.
* **`.`** (titik): Menentukan **Build Context**. Titik berarti Docker akan mencari Dockerfile di folder saat ini dan hanya bisa mengakses file di folder tersebut.

:::info
Jika kita hanya membangun image untuk keperluan testing atau dijalankan di komputer sendiri menggunakan Docker Compose, kita **TIDAK WAJIB** menggunakan namespace.

* Contoh: `docker build -t app-java:1.0 .`

Jika kita berencana melakukan `docker push` ke Docker Hub, maka namespace (Username Anda) **WAJIB** ada. Tanpa namespace, Docker tidak akan tahu ke akun mana image tersebut harus diunggah.

* Format: `[USERNAME]/[NAMA_IMAGE]:[TAG]`
* Contoh: `docker build -t ucupdev/app-java:1.0 .`
:::

## 👍 Tips Best Practices

* **Gunakan `.dockerignore`**: Buat file bernama `.dockerignore` untuk mengecualikan folder besar seperti `target/`, `node_modules/`, atau .`git/` agar tidak ikut terkirim ke Docker Daemon saat proses build.
* **Satu Kontainer, Satu Proses**: Jangan mencoba menjalankan database dan web server di dalam satu Dockerfile yang sama. Gunakan Docker Compose untuk itu.
* **Hapus Cache Package Manager**: Selalu gunakan `--no-cache` pada Alpine atau `&& rm -rf /var/lib/apt/lists/*` pada Ubuntu agar image tetap ramping.
* **Gunakan User Non-Root**: Untuk alasan keamanan selalu gunakan instruksi `USER`, jangan gunakan **root** user demi keamanan.