---
sidebar_position: 2
title: 'Konfigurasi Container secara Imperatif'
---

**Konfigurasi Container secara Imperatif** merujuk pada metode pengelolaan kontainer melalui baris perintah (CLI) secara langsung dan satu per satu. Dalam pendekatan ini, kita memberikan instruksi langkah demi langkah kepada Docker untuk mencapai status yang diinginkan.

Meskipun pendekatan **Deklaratif** (seperti Docker Compose) lebih umum digunakan di lingkungan produksi, metode Imperatif tetap wajib dikuasai untuk kebutuhan debugging cepat, testing aplikasi, dan pemeliharaan darurat.

## 1️⃣ Apa itu Pendekatan Imperatif?

Pendekatan imperatif adalah cara mengelola infrastruktur dengan mengeksekusi perintah di terminal satu per satu.

* **Kelebihan**: Hasilnya instan, tidak perlu membuat file YAML, sangat bagus untuk eksplorasi.
* **Kekurangan**: Sulit direplikasi (jika perintah hilang, kita harus ingat parameter apa saja yang diketik dulu), tidak terdokumentasi dengan baik.

## 2️⃣ Komponen Utama Konfigurasi Imperatif

Dalam konfigurasi imperatif, kita menyisipkan seluruh pengaturan di dalam perintah `docker run`. Berikut adalah parameter konfigurasinya:

### A. Identitas dan Mode Berjalan

```bash
docker run -d --name app-service nginx
```

* **`--name`**: Memberikan identitas unik pada kontainer.
* **`-d`** (Detached): Menjalankan kontainer di background / latar belakang.

### B. Manajemen Port (Networking)

Menghubungkan jaringan komputer host ke kontainer.

```bash
docker run -d -p 8080:80 nginx
```

### C. Konfigurasi Aplikasi (Environment Variables)

Memasukkan setelan aplikasi (seperti database atau API Key) secara langsung.

```bash
docker run -d -e DATABASE_USER=ucup -e DATABASE_PASSWORD=rahasia mysql:8.4
```

### D. Pembatasan Sumber Daya (Resource Limit)

Mengatur batas konsumsi CPU dan RAM agar kontainer tidak menghabiskan seluruh sumber daya server.

```bash
docker run -d --memory="512m" --cpus="0.5" nginx
```

### E. Penyimpanan Persisten (Volume & Mount)

Menghubungkan data kontainer ke volume atau folder fisik di laptop/server.

```bash
docker run -d -v my-data:/var/lib/mysql mysql:8.4
```

## 3️⃣ Tips

* **Gunakan Flag `--rm`**: Saat melakukan konfigurasi imperatif untuk uji coba, selalu gunakan `--rm` agar kontainer otomatis terhapus saat dimatikan, menjaga daftar kontainer kita tetap bersih.
* **Gunakan history**: Jika kita lupa perintah panjang yang pernah dijalankan, gunakan perintah Linux: `history | grep "docker run"`.
* **Otomatisasi**: Jika perintah imperatif kita sudah memiliki lebih dari 3 flag (seperti `-p`, `-v`, `-e`, `--network`), itu adalah tanda bahwa kita **harus** segera pindah ke Docker Compose.
