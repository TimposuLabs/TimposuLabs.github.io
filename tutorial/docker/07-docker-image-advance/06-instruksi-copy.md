---
sidebar_position: 6
title: 'Dockerfile COPY'
---

## 🤔 Apa itu Instruksi Dockerfile `COPY`?

Instruksi `COPY` digunakan untuk menyalin file atau direktori dari mesin lokal (host) ke dalam image Docker selama proses pembuatan (build).

## 1️⃣ Sintaks Dasar

Sintaks umum instruksi COPY adalah:

```
COPY [sumber] [tujuan]
```

* **`<sumber>`**: Lokasi file/direktori di mesin lokal (relatif terhadap lokasi Dockerfile).
* **`<tujuan>`**: Path di dalam image tempat file akan disalin.

**Contoh 1**:

```
COPY app.jar /app/app.jar
COPY config/ /etc/config/
```

**Contoh 2**:

```
ARG ubuntu_version=24.04
FROM ubuntu:${ubuntu_version}
LABEL version="1.0"
LABEL maintainer="Ucup Topekox" email="ucup@gmail.com" environtment="development"
ENV DATABASE_NAME=book_store
RUN apt-get update && apt-get install openjdk-21-jre-headless -y
COPY Hello.class Hello.class
CMD ["/usr/bin/java", "Hello"]
```

## 2️⃣ Fitur Utama 

### A. Mengubah Kepemilikan `(--chown)`

Sangat disarankan menjalankan aplikasi sebagai user non-root. Anda bisa langsung mengatur pemilik file saat menyalinnya agar aplikasi memiliki izin akses yang tepat.

```
# Menyalin file dan menjadikannya milik user 'ucup'
COPY --chown=ucup:ucup target/*.jar app.jar
```

### B. Menyalin dari Stage Lain `(--from)`

Ini adalah kunci dari **Multi-stage Build**. Kita bisa menyalin hasil kompilasi dari stage sebelumnya tanpa membawa sampah build tools.

```
# Menyalin file dari stage bernama 'builder'
COPY --from=builder /app/target/app.jar .
```

### C. Mendukung Wildcards

Kita bisa menggunakan pola karakter untuk menyalin banyak file yang serupa sekaligus.

```
# Menyalin semua file yang berakhiran .sh
COPY *.sh /usr/local/bin/
```

## 3️⃣ Aturan Penting "Build Context"

Instruksi `COPY` hanya bisa mengambil file yang berada di dalam **Build Context** (folder tempat kita menjalankan perintah `docker build`).

* **Salah** ❌: `COPY ../file_luar.txt /app/` (Docker tidak bisa "mengintip" keluar dari foldernya demi alasan keamanan).
* **Solusi** ✅ Pindahkan file ke dalam folder yang sama dengan Dockerfile.

## 4️⃣ Efek terhadap Layer Caching

`COPY` sangat sensitif terhadap cache:

* Jika isi file yang kita salin berubah (meskipun hanya satu karakter), Docker akan **menghapus cache** untuk baris tersebut dan semua baris setelahnya.
* **Strategi**: Salin file yang jarang berubah (seperti `pom.xml`) terlebih dahulu, jalankan instalasi library, baru kemudian salin kode sumber (`src`).
