---
sidebar_position: 9
title: 'Dockerfile ENTRYPOINT'
---

## 🤔 Apa itu Instruksi Dockerfile `ENTRYPOINT`?

Instruksi `ENTRYPOINT` mirip dengan instruksi `CMD`. `ENTRYPOINT` adalah instruksi yang digunakan untuk menetapkan perintah utama yang pasti dijalankan saat kontainer dimulai. Berbeda dengan `CMD` yang bersifat sebagai "saran default", `ENTRYPOINT` membuat kontainer berperilaku seperti sebuah aplikasi mandiri (executable).

:::info
Secara teknis, hanya satu `ENTRYPOINT` yang berlaku pada satu Dockerfile. Jika butuh lebih dari satu aksi, bungkuslah aksi-aksi tersebut ke dalam sebuah skrip *shell* dan jadikan skrip tersebut sebagai satu-satunya `ENTRYPOINT`.
:::

## 1️⃣ Perbedaan: `ENTRYPOINT` vs `CMD`

| Fitur	| CMD	| ENTRYPOINT |
| --- | --- | --- |
| **Sifat**	| Default (Mudah diganti).	| Permanen (Sulit diganti). |
| **Jika diberi argumen saat `docker run`** |	Seluruh perintah diganti.|	Argumen ditempelkan di belakangnya.|
|**Tujuan**	| Memberikan perintah default.	| Menjadikan kontainer sebagai Tool spesifik. |

## 3️⃣ Mengapa Menggunakan ENTRYPOINT?

Misalkan kita membuat image untuk melakukan *ping*.

**Jika menggunakan `CMD`:**

```dockerfile
CMD ["ping", "google.com"]
```

Jika kita menjalankan `docker run my-ping yahoo.com`, maka `ping google.com` **hilang** dan digantikan oleh `yahoo.com` (yang akan menyebabkan error karena `yahoo.com` bukan sebuah perintah).

**Jika menggunakan `ENTRYPOINT`:**

```dockerfile
ENTRYPOINT ["ping"]
CMD ["google.com"]
```

Jika kita menjalankan `docker run my-ping yahoo.com`, maka `yahoo.com` akan mengisi posisi `CMD` dan ditempelkan ke `ENTRYPOINT`. Perintah akhirnya menjadi: `ping yahoo.com`.

## 4️⃣ Format Penulisan (Wajib Exec Form)

**Sangat dilarang** menggunakan *Shell Form* untuk `ENTRYPOINT` karena akan membuat aplikasi tidak bisa menerima sinyal mati (*SIGTERM*) secara bersih.

* **Benar (Exec Form) ✅**: `ENTRYPOINT ["java", "-jar", "app.jar"]`
* **Salah (Shell Form) ❌**: `ENTRYPOINT java -jar app.jar`

## 4️⃣ Best Practice: Script Pembungkus (Entrypoint Script)

Seringkali kita perlu melakukan persiapan sebelum aplikasi utama jalan (seperti mengecek koneksi database). Kita bisa menggunakan script `.sh` sebagai `ENTRYPOINT`.

* **`entrypoint.sh`**:

```sh
#!/bin/sh
echo "Melakukan persiapan sistem..."
# Menjalankan perintah utama yang dikirim dari CMD
exec "$@"
```

*Catatan: `exec "$@"` adalah perintah yang memastikan aplikasi utama mengambil alih proses kontainer.*

* **Dockerfile**:

```dockerfile
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["java", "-jar", "app.jar"]
```

### 💻 Skenario Kasus pada Java

Aplikasi Java tidak boleh menyala sebelum database (MySQL/PostgreSQL) siap menerima koneksi. Jika Java menyala duluan, aplikasi akan langsung crash. Kita akan menggunakan skrip shell untuk "menunggu" database.

**1. File: `entrypoint.sh`**

Skrip ini berfungsi sebagai penjaga gerbang. Ia akan mengecek port database sebelum mengizinkan Java berjalan.

```bash
#!/bin/sh

# Berhenti jika ada error
set -e

echo "--- Tahap Persiapan Kontainer ---"

# Fungsi untuk menunggu database
# Menggunakan netcat (nc) untuk mengecek apakah port database sudah terbuka
until nc -z -v -w30 "$DATABASE_ADDR" "$DB_PORT"; do
  echo "Menunggu Database ($DATABASE_ADDR:$DB_PORT) siap..."
  sleep 2
done

echo "Database sudah siap! Memulai aplikasi Java..."

# 'exec "$@"' sangat penting. 
# Ini memindahkan sinyal sistem (seperti stop/terminate) langsung ke proses Java
exec "$@"
```

**2. File: `Dockerfile`**

Di sini kita menggabungkan `ENTRYPOINT` (untuk skrip penjaga) dan `CMD` (untuk perintah aplikasi).

```dockerfile
FROM eclipse-temurin:21-jre-ubi9-minimal

WORKDIR /app

# Instalasi netcat (nc) untuk pengecekan koneksi di UBI9-Minimal
RUN microdnf install -y nc && microdnf clean all

# Salin file aplikasi dan skrip
COPY target/app.jar app.jar
COPY entrypoint.sh .

# Berikan izin eksekusi pada skrip
RUN chmod +x entrypoint.sh

# Environment variable default (bisa ditimpa saat docker run)
ENV DATABASE_ADDR=localhost
ENV DB_PORT=3306

# ENTRYPOINT menjalankan skrip penjaga
ENTRYPOINT ["./entrypoint.sh"]

# CMD memberikan perintah default yang akan dikirim ke 'exec "$@"' di skrip
CMD ["java", "-jar", "app.jar"]
```

**3. Cara Menjalankannya**

Saat menjalankan kontainer, alurnya akan menjadi seperti ini:

```bash
docker run -d \
  --name my-app \
  -e DATABASE_ADDR=172.17.0.2 \
  -e DB_PORT=3306 \
  my-java-image:v1
```

**🏃 Apa yang Terjadi di Balik Layar?**

* **Eksekusi Pertama**: Docker menjalankan `./entrypoint.sh`.
* **Looping**: Skrip menjalankan `nc` (netcat). Jika database belum siap, ia akan mencetak "Menunggu Database..." dan mengulang setiap 2 detik.
* **Lolos**: Begitu database siap, skrip selesai.
* **Handover**: Perintah `exec "$@"` mengambil isi dari `CMD` (yaitu `java -jar app.jar`) dan menjalankannya sebagai **proses utama (PID 1**).
* **Graceful Shutdown**: Karena menggunakan `exec`, saat mengetik `docker stop`, aplikasi Java akan menerima sinyal tersebut secara langsung dan bisa menutup koneksi database dengan rapi sebelum mati.

## 5️⃣ Cara Memaksa Mengganti `ENTRYPOINT`

Meskipun permanen, kita tetap bisa menggantinya dalam kondisi darurat (misal untuk debugging) menggunakan flag `--entrypoint`:

```bash
docker run --rm -it --entrypoint sh nama_image
```

## 🔥 Kesimpulan

Gunakan `ENTRYPOINT` untuk perintah yang tidak boleh diubah (seperti `java`, `python`, atau `nginx`), dan gunakan `CMD` untuk argumen atau parameter default yang mungkin ingin diubah oleh pengguna saat menjalankan kontainer.
