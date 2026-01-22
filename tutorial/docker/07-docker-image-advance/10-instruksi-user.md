---
sidebar_position: 10
title: 'Dockerfile USER'
---

## 🤔 Apa itu Instruksi `USER`?

Secara default, Docker menjalankan semua proses di dalam kontainer sebagai **root** (administrator). Instruksi `USER` digunakan untuk mengubah identitas pengguna (UID) atau grup (GID) yang menjalankan aplikasi.

* **Fungsi**: Mengalihkan hak akses dari *Superuser* (root) ke N*ormal User*.
* **Efek**: Semua instruksi `RUN`, `CMD`, dan `ENTRYPOINT` yang berada di bawahnya akan dijalankan menggunakan identitas user tersebut.

## 1️⃣ Mengapa Sangat Penting? (Security First)

* **Mencegah Escalation**: Jika aplikasi (misal: Java API) diretas, penyerang hanya akan memiliki hak akses terbatas sesuai user yang Anda buat. Mereka tidak bisa mengubah file sistem, menginstal paket software, atau merusak Kernel host.
* **Kepatuhan (Compliance)**: Standar industri seperti PCI-DSS, SOC2, dan orkestrator seperti **Kubernetes** sering kali melarang kontainer berjalan sebagai root.
* **Manajemen File**: Membantu sinkronisasi izin akses file antara komputer host dan kontainer saat menggunakan *Volumes*.

## 2️⃣ Alur Kerja Implementasi (Best Practice)

Kita tidak bisa langsung menulis `USER ucup` jika user tersebut belum dibuat di dalam sistem operasi image. Berikut adalah alur standar:

### A. Di Alpine Linux (Minimalis)

```dockerfile
# 1. Buat grup dan user (-S untuk system user, -D untuk tanpa password)
RUN addgroup -S ucupgroup && adduser -S ucup -G ucupgroup

# 2. Atur folder kerja dan izin akses (SAAT MASIH ROOT)
WORKDIR /app
COPY --chown=ucup:ucupgroup . .

# 3. Pindah ke user non-root
USER ucup

# Sekarang CMD berjalan sebagai ucup
CMD ["java", "-jar", "app.jar"]
```

### B. Di UBI / Debian (Enterprise)

```dockerfile
# Menggunakan useradd (biasanya butuh instalasi shadow-utils di UBI-minimal)
RUN groupadd -r ucupgroup && useradd -r -g ucupgroup ucup
USER ucup
```

## 3️⃣ Memahami `--chown` pada `COPY`

Saat menggunakan `USER`, file yang disalin melalui `COPY` tetap akan dimiliki oleh root kecuali menggunakan flag `--chown`.

* **Wajib**: `COPY --chown=ucup:ucupgroup . .`
* Tanpa ini, user `ucup` tidak akan bisa membaca atau menulis file aplikasinya sendiri.

## 4️⃣ Cara Mengecek User yang Aktif

Kita bisa memastikan siapa yang menjalankan kontainer dengan perintah:

```bash
docker exec [NAMA_KONTAINER] whoami
# Hasilnya harus 'ucup', bukan 'root'
```
Atau melalui inspect:

```bash
docker inspect --format='{{.Config.User}}' [NAMA_IMAGE]
```

## 5️⃣ Tips

* **Gunakan UID/GID Numerik**: Beberapa platform keamanan lebih suka menggunakan angka daripada nama (misal: USER `1001`) untuk menghindari kebingungan nama di database user Linux.
* **Lakukan Instalasi Dulu**: Pastikan semua perintah `apk add` atau `apt install` dilakukan sebelum instruksi `USER`, karena user biasa tidak punya izin untuk menginstal software.
* **Prinsip Least Privilege**: Hanya berikan izin tulis pada folder yang benar-benar dibutuhkan (seperti folder `/logs` atau `/tmp`).
