---
sidebar_position: 5
title: 'Dockerfile RUN'
---

## 1️⃣ Apa itu Dockerfile `RUN`?

Instruksi `RUN` hampir sama dengan instruksi `CMD`, cuma perbedaannya jika instruksi `CMD` perintah di dalamnya dieksekusi ketika **container dijalankan**, instruksi `RUN` dijalankan ketika **hanya proses build berjalan**. 

Perbedaan berikutnya instruksi `CMD` digunakan untuk menjalankan atau mendefinisikan proses default atau proses utama ketika container dijalankan, konsekuensinya di dalam dockerfile **tidak boleh lebih dari satu instruksi `CMD`**. 

Hal tersebut tidak berlaku pada instruksi `RUN` kita dapat mendefinisikan **lebih dari satu** instruksi `RUN`, namun yang perlu diperhatikan setiap satu instruksi `RUN` **akan menammbahkan satu layer** dalam suatu image, sehingga diusahakan menggunakan instruksi `RUN` seefisien mungkin.

* **Tujuan Utama**: Menginstal paket software, membuat folder, mengubah izin file (`chmod`), atau mengunduh dependensi aplikasi.
* **Kapan dijalankan?** Hanya saat kita menjalankan perintah `docker build`. Hasil dari perintah `RUN` akan disimpan secara permanen di dalam image. 

## 2️⃣ Format Penulisan (Syntax)

Terdapat dua cara penulisan:

### A. Shell Form (Paling Sering Digunakan)

Ditulis seperti mengetik perintah di terminal Linux biasa.

* Contoh 1:

```dockerfile
RUN apt-get update && apt-get install openjdk-21-jre-headless -y
```

* Contoh 2:

```dockerfile
RUN apk add --no-cache curl
```

* Contoh 3:

```dockerfile
ARG ubuntu_version=22.04
FROM ubuntu:${ubuntu_version}
LABEL version="1.0"
LABEL maintainer="Ucup Topekox" email="ucup@gmail.com" environtment="development"
ENV DATABASE_NAME=book_store
RUN apt-get update && apt-get install openjdk-21-jre-headless -y

CMD ["/usr/bin/java", "--version"]
```

**Kelebihan**: Sangat mudah dibaca dan mendukung penggunaan variabel lingkungan serta simbol shell seperti `&&`, `||`, dan `>`.

### B. Exec Form

Menggunakan format JSON (kurung siku).

```dockerfile
RUN ["apk", "add", "--no-cache", "curl"]
```

**Kegunaan**: Digunakan jika base image tidak memiliki shell (`/bin/sh`) atau untuk menghindari pemrosesan string oleh shell.

## 3️⃣ Best Practice & Optimasi

Dalam menggunakan `RUN` perlu memperhatikan efisiensi layer:

### A. Menggabungkan Perintah (Chaining)

Jangan membuat banyak layer untuk hal yang berkaitan. Gunakan `&&` dan `\` (backslash).

* **Buruk ❌ (Menciptakan 3 Layer)**:

    ```dockerfile
    RUN apk update
    RUN apk add curl
    RUN apk add git
    ```
* **Baik ✅ (Menciptakan 1 Layer)**:
    
    ```dockerfile
    RUN apk update && apk add --no-cache \
    curl \
    git
    ```

### B. Membersihkan Sampah (Cleaning Up)

Disarankan untuk menghapus cache atau file sementara dalam satu perintah `RUN` yang sama agar ukuran image tetap kecil.

```dockerfile
RUN apk add --no-cache build-base && \
    make /app && \
    apk del build-base
```

*Dengan cara ini, tool kompilasi `build-base` tidak akan ikut tersimpan di image akhir.*

### C. Pemanfaatan Cache

Docker tidak akan menjalankan ulang instruksi `RUN` jika baris tersebut dan file yang terkait tidak berubah sejak build sebelumnya. Contoh ketika menggunakan Java, pada framework Spring Boot kita menaruh instalasi dependensi (seperti `mvn dependency:go-offline`), maka Apache Maven mengunduh semua dependensi (library), plugin, dan file POM yang dibutuhkan oleh project dari internet ke repositori lokal (folder `.m2`). 

Tujuan utamanya adalah agar bisa melakukan kompilasi atau membangun aplikasi nantinya tanpa membutuhkan koneksi internet sama sekali ("**Go Offline**").
