---
sidebar_position: 3
title: 'Dockerfile ARG & ENV'
---

## 1️⃣ Instruksi `ARG`

**`ARG`** adalah variabel yang bersifat **sementara**. `ARG` hanya ada selama proses **pembuatan image** (docker build). Setelah image selesai dibuat, variabel ini akan "hangus" dan tidak bisa diakses di dalam kontainer yang berjalan.

* **Kegunaan**: Menentukan versi library, nama file installer, atau konfigurasi yang hanya diperlukan saat kompilasi.
* **Keamanan**: Lebih aman untuk data sensitif saat build karena tidak tersimpan di metadata kontainer akhir (namun tetap bisa dilihat di history image).

```
ARG JAVA_VERSION=21
FROM eclipse-temurin:${JAVA_VERSION}-jdk
```

:::tip
Kita bisa mengubahnya saat proses build tanpa mengedit file:
```
docker build --build-arg JAVA_VERSION=25 -t my-app .
```
:::

## 2️⃣ Instruksi ENV (Environment Variable)

**`ENV`** adalah variabel yang bersifat permanen. `ENV` tersedia selama proses **build** DAN tetap ada saat **kontainer berjalan** (runtime).

* **Kegunaan**: Menyimpan konfigurasi aplikasi seperti nama database (`DATABASE_NAME`), port aplikasi, atau zona waktu.
* **Fleksibilitas**: Nilainya bisa ditimpa (*override*) saat menjalankan kontainer menggunakan flag `-e`.

```
ARG ubuntu_version=24.04
FROM ubuntu:${ubuntu_version}
LABEL version="1.0"
LABEL maintainer="Ucup Topekox" email="ucup@gmail.com" environtment="development"
ENV DATABASE_NAME=book_store
```

:::tip
Kita bisa mengubahnya saat run:
```
docker run -e DATABASE_NAME=book_shop my-app
```
:::

## 3️⃣ Best Practice

* **Jangan Simpan Rahasia (Secrets) di ARG/ENV**: Meskipun `ARG` hilang setelah build, nilai `ARG` dan `ENV` masih bisa terlihat melalui perintah `docker history` atau `docker inspect`. Untuk password atau token, gunakan **Docker Secrets**.
* **Gunakan Default Value**: Selalu berikan nilai default agar build tidak error jika variabel lupa diisi.
    * Contoh: `ARG APP_VERSION=1.0.0`
* **Gunakan Kurung Kurawal**: Selalu gunakan format `${NAMA}` di dalam instruksi agar lebih jelas dan mencegah kesalahan pembacaan karakter oleh Docker.
* **Kombinasi ARG & ENV**: Terkadang kita menggunakan `ARG` untuk menerima input saat build, lalu memasukkannya ke `ENV` agar tersedia saat aplikasi jalan.
    ```
    ARG VERSION
    ENV APP_VERSION=${VERSION}
    ```

