---
sidebar_position: 11
title: 'Dockerfile EXPOSE'
---

## 🤔 Apa itu `EXPOSE`?

`EXPOSE` adalah instruksi dalam Dockerfile yang berfungsi untuk menginformasikan kepada Docker dan pengguna (engineer lain) bahwa kontainer akan mendengarkan (*listen*) pada port jaringan tertentu saat dijalankan.

* **Fungsi Utama**: Sebagai dokumentasi teknis antara orang yang membangun image dan orang yang menjalankan kontainer.
* **Protokol**: Secara default menggunakan **TCP**, namun Anda juga bisa menentukan **UDP**.

## 1️⃣ Sintaks Dasar

```dockerfile
# Mendokumentasikan port tunggal (TCP)
EXPOSE 8080

# Mendokumentasikan port dengan protokol spesifik
EXPOSE 53/udp

# Mendokumentasikan banyak port sekaligus
EXPOSE 80 443 3306
```

## 2️⃣ Poin Penting

Banyak yang mengira `EXPOSE` otomatis membuka akses dari browser internet ke kontainer. Ini adalah pemahaman yang keliru.

| Fitur	| EXPOSE	| Flag -p (Publish) |
| --- | --- | --- |
| **Kapan ditulis?** |	Di dalam Dockerfile. |	Saat menjalankan docker run. |
| **Akses Publik?** |	**TIDAK**. Port tidak terbuka ke host/internet.	| **YA**. Menghubungkan port laptop ke kontainer. |
| **Fungsi** |	Dokumentasi & Komunikasi antar kontainer. |	Akses aplikasi dari luar (browser). |

**Contoh**: Jika kita menulis `EXPOSE 8080` di Dockerfile, kita tetap wajib mengetik `docker run -p 8080:8080` agar bisa mengakses aplikasi dari `localhost:8080`.

## 3️⃣ Penggunaan di Dunia Nyata

* **Otomatisasi Jaringan**: Jika kita menggunakan *User-defined Bridge Network* (Docker Network), kontainer lain di jaringan yang sama dapat melihat port yang di-`EXPOSE` untuk saling berkomunikasi secara internal tanpa perlu flag `-p`.

* **Otomatisasi `-P` (Capital P)**: Kita bisa menjalankan kontainer dengan flag `-P` besar. Docker akan secara otomatis memetakan semua port yang terdaftar di `EXPOSE` ke port acak yang tersedia di komputer host kita.
    
    *Perintah: `docker run -d -P nginx`*

* **Dokumentasi Tim**: Misal saat rekan tim melakukan `docker image inspect`, mereka langsung tahu port mana yang harus dipetakan tanpa perlu membaca kode sumber aplikasi kita.

## 4️⃣ Contoh Penggunaan

Berikut adalah contoh lengkap Dockerfile untuk aplikasi Spring Boot, dengan instruksi `EXPOSE`.

* **Dockerfile**:

```dockerfile
# Menggunakan JRE Java 21 yang ringan (Runtime saja)
FROM eclipse-temurin:21-jre-alpine

# Menentukan folder tempat aplikasi akan diletakkan
WORKDIR /app

# 1. INSTRUKSI EXPOSE (Dokumentasi Port)
# Memberitahu bahwa aplikasi ini berjalan di port 8080
EXPOSE 8080

# 2. COPY (Menyalin file JAR dari laptop ke dalam image)
# Pastikan path 'target/app.jar' sesuai dengan hasil build Anda
COPY target/app.jar app.jar

# 3. CMD (Perintah untuk menjalankan aplikasi)
CMD ["java", "-jar", "app.jar"]
```

* **Build Image**:

```bash
docker build -t spring-app-simple .
```

* **Run Kontainer**:

Meskipun di Dockerfile tertulis `EXPOSE 8080`, kita tetap harus menggunakan flag `-p` agar bisa dibuka di browser.

```bash
docker run -d -p 8080:8080 --name running-app spring-app-simple
```

## 5️⃣ Best Practice

* **Selalu Sertakan**: Meskipun opsional, selalu tulis `EXPOSE` untuk membantu orang lain (dan sistem seperti Kubernetes/Cloud) memahami cara berkomunikasi dengan aplikasi kita.
* **Gunakan Port Standar**: Jika aplikasi kita adalah web server, gunakan `EXPOSE 80` atau `8080`. Jika database, gunakan `3306` (MySQL) atau `5432` (Postgres).
* **Sinkronisasi dengan Aplikasi**: Pastikan angka port di `EXPOSE` sama dengan angka port yang didefinisikan di dalam aplikasi kita (misal di Spring Boot `server.port=8080`).
