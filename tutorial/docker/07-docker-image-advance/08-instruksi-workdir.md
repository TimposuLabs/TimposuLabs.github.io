---
sidebar_position: 8
title: 'Dockerfile WORKDIR'
---

## 🤔 Apa itu Instruksi Dockerfile `WORKDIR`

`WORKDIR` berfungsi untuk menetapkan **direktori kerja** (folder aktif) untuk instruksi selanjutnya seperti `RUN`, `CMD`, `ENTRYPOINT`, `COPY` dan `ADD` di dalam Dockerfile. 

Jika `WORKDIR` belum dibuat / tidak ditentukan, maka secara default Docker akan menggunakan direktori root (`/`). Tetapi jika kita tidak membuat Dockerfile from `scratch`, `WORKDIR` mungkin berada sesuai base image yang dibuat. Maka untuk menghindari operasi yang tidak diinginkan, best practice-nya kita melakukan instruksi `WORKDIR`.

## 1️⃣ Mengapa Menggunakan WORKDIR? (Bukan `RUN cd`)

Jika kita mencoba berpindah folder menggunakan `RUN cd /app`, maka cara itu **tidak akan berhasil**.

* **Masalah `RUN cd`**: Setiap instruksi `RUN` berjalan di *shell* dan *layer* yang baru. Jika kita mengetik `RUN cd /app`, folder tersebut hanya akan aktif selama baris itu berjalan. Baris berikutnya akan kembali ke folder root.
* **Solusi `WORKDIR`**: Instruksi ini menetapkan folder aktif secara permanen untuk semua baris instruksi di bawahnya dan juga saat kontainer dijalankan.

## 2️⃣ Karakteristik Utama

### A. Otomatis Membuat Folder

Jika direktori yang kita tentukan di `WORKDIR` belum ada, Docker akan **otomatis** membuatnya untuk kita.

```dockerfile
# Folder /usr/src/app akan otomatis dibuat jika belum ada
WORKDIR /usr/src/app
```

### B. Mendukung Path Relatif

`WORKDIR` dapat dipanggil berkali-kali. Jika kita menggunakan path relatif, ia akan menyambung dari folder sebelumnya.

```dockerfile
WORKDIR /a
WORKDIR b
WORKDIR c
# Lokasi saat ini adalah: /a/b/c
```

:::tip
Namun, demi kejelasan, sangat disarankan untuk selalu menggunakan **Absolute Path** (seperti `/app/backend`).
:::

### C. Mendukung Variabel (`ENV`)

Kita bisa menggunakan variabel lingkungan agar lokasi folder lebih fleksibel.

```dockerfile
ENV APP_HOME=/opt/myapp
WORKDIR $APP_HOME
```

## 3️⃣ Contoh Implementasi

Dalam project profesional, `WORKDIR` digunakan untuk mengisolasi aplikasi dari file sistem OS dasar.

```dockerfile
FROM alpine:3.21.3

# 1. Tentukan folder kerja
WORKDIR /app

# 2. Instruksi COPY akan menyalin file ke /app/
COPY . .

# 3. Instruksi RUN akan dijalankan di dalam /app/
RUN apk add --no-cache nodejs npm && npm install

# 4. Saat kontainer jalan, aplikasi mulai dari folder /app/
CMD ["npm", "start"]
```

## 4️⃣ Tips

* **Gunakan Folder yang Bersih**: Hindari menggunakan folder sistem seperti `/root` atau `/tmp`. Gunakan folder seperti `/app` atau `/work`.
* **Keamanan**: Saat menggunakan user non-root (seperti `ucup`), pastikan kita sudah mengatur kepemilikan folder `WORKDIR` sebelum berpindah user.

```dockerfile
WORKDIR /app
RUN chown ucup:ucup /app
USER ucup
```

* **Transparansi**: Dengan melihat `WORKDIR`, orang lain yang membaca Dockerfile kita langsung tahu di mana lokasi jantung aplikasi Anda berada.
