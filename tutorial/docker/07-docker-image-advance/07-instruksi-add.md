---
sidebar_position: 7
title: 'Dockerfile ADD'
---

## 🤔 Apa itu Instruksi Dockerfile `ADD`?

`ADD` adalah instruksi dalam Dockerfile yang berfungsi untuk menyalin file, direktori, atau file dari URL jarak jauh ke dalam image Docker. Meskipun sekilas mirip dengan `COPY`, `ADD` memiliki fitur otomatisasi tambahan yang lebih kompleks.

## 1️⃣ Fitur Instruksi `ADD`

Berbeda dengan `COPY` yang hanya menyalin file/direktori secara "mentah", `ADD` memiliki dua fitur unik:

### A. Ekstraksi Otomatis (Local Tarball)

Jika file sumber adalah arsip terkompresi yang dikenal (seperti `.tar`, `.tar.gz`, `.tgz`, `.bz2`, `.xz`), `ADD` akan secara otomatis **mengekstrak** isi file tersebut ke dalam direktori tujuan di image.

* **Contoh**: `ADD rootfs.tar.gz /`
* **Hasil**: Isi dari `rootfs.tar.gz` akan tersebar ke folder `/` (Contoh kasus ini adalah cara kita mem-build image Alpine from `scratch`).

### B. Mendukung URL

`ADD` dapat mengambil file langsung dari internet melalui protokol HTTP/HTTPS.

* **Contoh**: `ADD https://example.com/app.jar /app/app.jar`
* **Catatan**: File dari URL **tidak** akan diekstrak secara otomatis meskipun formatnya `.tar.gz`.

## 2️⃣ Sintaks Dasar

```
ADD [sumber_host_atau_url] [tujuan_kontainer]
```

Contoh:

```
ARG ubuntu_version=22.04
FROM ubuntu:${ubuntu_version}
LABEL version="1.0"
LABEL maintainer="Ucup Topekox" email="ucup@gmail.com" environtment="development"
ENV DATABASE_NAME=book_store
RUN apt-get update && apt-get install openjdk-21-jre-headless -y
ADD Hello.class Hello.class
CMD ["/usr/bin/java", "Hello"]
```

Sama seperti `COPY`, kita juga bisa menggunakan flag `--chown` untuk mengatur izin akses:

```
ADD --chown=ucup:ucup source.tar.gz /work/
```

## 3️⃣ Kapan Harus Menggunakan ADD?

Meskipun lebih sakti, komunitas Docker global menyarankan untuk tetap memprioritaskan `COPY`. Gunakan `ADD` hanya pada kondisi berikut:

* **Membangun Image dari Scratch**: Saat kita perlu memasukkan sistem operasi minimal (*RootFS*) dalam format `.tar.gz` ke image kosong.
* **Ekstraksi Otomatis**: Saat kita ingin memasukkan paket aplikasi besar yang sudah terkompresi tanpa perlu menjalankan perintah `RUN tar -xvf ...`.

Contoh kita akan membuat image from `scratch` Alpine Linux dengan `ADD`:.

* Download Alpine Linux pada komputer Host:

```
wget https://dl-cdn.alpinelinux.org/alpine/v3.21/releases/x86_64/alpine-minirootfs-3.21.3-x86_64.tar.gz
```

* Buat Dockerfile untuk membuat image from `scratch`, dan melakukan instruksi `ADD` dengan menambahkan file archive Alpine Linux yang sudah di download.

```
FROM scratch
ADD *.tar.gz /
CMD ["/bin/echo", "Hello Alpine Linux"]
```

### 📌 Best Practice Penggunaan `ADD` untuk URL

Dalam beberapa kasus, dibandingkan menggunakan `ADD` untuk mengunduh file dari URL (karena masalah ukuran Image/size), lebih baik gunakan `RUN`. Contoh dalam image Alpine:

```
RUN apk add --no-cache curl && \
    curl -o /app.jar https://example.com/app.jar && \
    apk del curl
```

Mengapa? Karena dengan perintah `RUN`, kita bisa menghapus installer atau paket yang tidak perlu  (cache) dalam satu layer, sehingga ukuran image tetap kecil.

| Kebutuhan	| Instruksi Terbaik |
| --- | --- |
| Ambil file dari internet	| `RUN curl` atau `RUN wget` |
| Salin file biasa dari laptop	| `COPY` |
| Salin + Ekstrak file `.tar.gz` dari laptop |	`ADD` |

## 4️⃣ Perbandingan `ADD` vs `COPY`

| Fitur	| ADD	| COPY |
| --- | --- | --- |
| Salin file/folder lokal	| Ya	| Ya |
| Transparansi & Keamanan |	Sedang (Bisa ekstrak tanpa sengaja)	| Tinggi (Sangat Jelas) |
| Ekstrak Otomatis `.tar`	| Ya	| Tidak |
| Ambil file dari URL	| Ya	| Tidak |
| Rekomendasi Utama	Khusus | untuk Tarball |	Default untuk semua kasus |

## 5️⃣ Kesimpulan

Gunakan `ADD` jika ingin melakukan ekstraksi otomatis, namun untuk kebutuhan menyalin kode sumber sehari-hari, tetaplah gunakan `COPY` demi keamanan dan efisiensi layer.