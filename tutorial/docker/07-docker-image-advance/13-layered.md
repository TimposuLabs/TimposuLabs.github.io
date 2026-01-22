---
sidebar_position: 13
title: 'Multiple Layered'
---

![docker layered multiple](https://media.licdn.com/dms/image/v2/D4D12AQGPw6lFQ4pW1A/article-inline_image-shrink_400_744/article-inline_image-shrink_400_744/0/1694168127607?e=2147483647&v=beta&t=kRpfdPI_4aOX79a9Gmoo7Qf4LW2Rt1jFQJeYyTREX3w)

## 🤔 Apa itu Multiple Layered Build?

**Multiple Layered Build** adalah teknik membagi sebuah aplikasi menjadi beberapa bagian (lapisan) berdasarkan frekuensi perubahannya.

Tujuannya adalah agar Docker tidak perlu memproses ulang bagian yang besar jika hanya bagian kecil dari aplikasi yang berubah.

## 1️⃣ Konsep Dasar "Layering"

Bayangkan aplikasi adalah sebuah paket kiriman. Di dalam paket tersebut terdapat:

* **Buku Manual (Library/Dependencies)**: Sangat berat, tapi isinya jarang sekali berubah.
* **Surat (Kode Aplikasi)**: Sangat ringan, tapi isinya berubah setiap hari.

Jika kita mengirim paket ini berkali-kali tanpa teknik layering, kita harus membungkus ulang dan mengirim seluruh berat buku manual tersebut setiap kali suratnya berubah. Dengan **Layered Build**, kita memisahkan buku manual ke dalam kotak tersendiri yang sudah ada di tujuan, sehingga kita cukup mengirim suratnya saja.

## 2️⃣ Cara Kerja Layered Build

Dalam Docker, setiap perintah `COPY` atau `RUN` membuat sebuah Layer. Docker menggunakan sistem *caching*: jika isi sebuah layer tidak berubah, Docker akan menggunakan versi lama yang sudah ada.

Strategi Layered Build membagi struktur file menjadi:

* **Layer Dependensi (Paling Bawah)**: Berisi semua pustaka pendukung (misal: folder `node_modules` atau library `.jar`). Ini adalah bagian paling besar.
* **Layer Konfigurasi**: Berisi file pengaturan sistem atau lingkungan(environment).
* **Layer Aplikasi (Paling Atas)**: Berisi kode sumber (source code) yang kita tulis. Ini adalah bagian yang paling sering berubah.

## 3️⃣ Struktur Dockerfile

Berikut adalah pola umum yang diterapkan pada hampir semua bahasa pemrograman (Node.js, Python, Go, Java):

```dockerfile
# 1. Install Dependensi (Hanya dilakukan jika file definisi package berubah)
COPY package-definition.file . 
RUN install-dependencies-command 

# 2. Copy Source Code (Dilakukan setiap kali ada perubahan kode)
COPY ./src ./src

# 3. Build/Run
RUN build-command
```

## 4️⃣ Keuntungan Utama

* **Penyimpanan Pintar**: Jika kita memiliki 10 aplikasi berbeda yang menggunakan library yang sama, Docker hanya perlu menyimpan satu salinan library tersebut di server.
* **Deployment Super Cepat**: Saat kita melakukan update aplikasi, proses "upload" ke server hanya memakan waktu beberapa detik karena Docker hanya mengirim potongan kode yang berubah.
* **Efisiensi Sumber Daya**: Mengurangi beban kerja pada sistem CI/CD (*Continuous Integration*) dan menghemat kuota internet/bandwidth.

## 5️⃣ Perbedaan Multi-Stage vs Layered Build

Seringkali orang bingung antara keduanya, padahal mereka bekerja sama:

* **Multi-Stage Build**: Fokus pada **hasil akhir** (membuang sampah kompilasi agar image kecil). Ibarat membuang bungkus makanan setelah selesai dimasak.
* **Layered Build**: Fokus pada **proses pembuatan** (menyusun urutan agar build cepat). Ibarat memasak bahan yang paling lama matang terlebih dahulu.

**Kesimpulan**:

Gunakan **Multi-Stage** untuk mendapatkan image yang **ringan**, dan gunakan **Layered Build** agar proses update image tersebut cepat.

## 6️⃣ Layered JAR

**Layered JAR** adalah teknik optimasi khusus Java (terutama Spring Boot) yang lebih canggi daripada sekadar multi-stage build biasa.

Berikut adalah bagaimana bahasa lain menerapkan konsep yang sama (Layering):

**1. Node.js (JavaScript/TypeScript)**

Di Node.js, pemisahan dilakukan antara `node_modules` (library) dan kode sumber (`src`).

* **Layer 1**: `package.json` dan `package-lock.json`.
* **Layer 2**: `npm install` (Ini adalah bagian terberat yang di-cache).
* **Layer 3**: Kode aplikasi.
* **Hasil**: Jika kita hanya mengubah kode, Docker tidak akan menjalankan `npm install` ulang.

**2. Python**

Sama seperti Node.js, Python memisahkan instalasi pip dari kode.

* **Layer 1**: `requirements.txt`.
* **Layer 2**: `pip install -r requirements.txt`.
* **Layer 3**: File `.py` Anda.

**3. Go (Golang)**

Go menggunakan fitur `go mod` untuk mengunci dependensi.

* **Layer 1**: `go.mod` dan `go.sum`.
* **Layer 2**: `go mod download`.
* **Layer 3**: Kompilasi kode sumber.

### ☕ Kenapa di Java (Spring Boot) sedikit Berbeda?

Alasannya adalah **struktur file-nya**:

* Bahasa seperti Python atau Node.js menyimpan library di folder terpisah (`node_modules` atau `site-packages`) secara alami.
* Java (secara tradisional) membungkus kode dan library menjadi **satu file tunggal** (`.jar`). Tanpa fitur "Layered JAR", Docker terpaksa menganggap satu file itu sebagai satu kesatuan. Jika satu karakter berubah, seluruh file dianggap berubah.

### 👎 Masalah pada JAR Tradisional

Biasanya, Spring Boot menghasilkan "Fat JAR" di mana library pihak ketiga (seperti Hibernate, Spring Cloud) dan kode buatan Anda digabung jadi satu.

* Jika ukuran JAR 100MB (95MB library + 5MB kode kita).
* Setiap kali kita mengubah kode, Docker harus menyalin ulang **seluruh 100MB** ke dalam layer baru. Ini memboroskan waktu dan penyimpanan.

### 👍 Solusi: Layered JAR

Dengan Layered JAR, isi JAR dipisahkan menjadi 4 kategori standar:

1. **Spring Boot Loader**: File internal Spring untuk menjalankan JAR.
2. **Dependencies**: Library dari pihak ketiga (jarang berubah).
3. **Snapshot Dependencies**: Library versi pengembangan.
4. **Application**: Kode sumber dan file konfigurasi Anda (paling sering berubah).

![Layered JAR](https://camo.githubusercontent.com/ca6cb13a9b5c54fc6089976cb4cf3cb1db22e61e4cdb86cd062f01bb87ff8241/68747470733a2f2f7777772e6261656c64756e672e636f6d2f77702d636f6e74656e742f75706c6f6164732f323032302f31312f737072696e672d626f6f742d6c61796572732e6a7067)

### 🔥 Implementasi

Berikut adalah contoh praktis menggunakan Spring Boot Layered JAR dengan Multi-Stage:

```dockerfile
# STAGE 1: Ekstraksi (Extract)
FROM eclipse-temurin:25-jdk-alpine-3.23 AS builder
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .

RUN chmod +x ./mvnw && ./mvnw dependency:go-offline
COPY ./src ./src
# Memecah JAR menjadi layer menggunakan mode jarmode
RUN ./mvnw clean install && java -Djarmode=layertools -jar target/*.jar extract

# STAGE 2: Membangun Image Final
FROM eclipse-temurin:25-jre-alpine-3.23
ARG JAR_FILE=target/*.jar
WORKDIR /app

# Layer ini jarang berubah, Docker akan mengambil dari Cache
COPY --from=builder /app/dependencies/ ./
COPY --from=builder /app/spring-boot-loader/ ./
COPY --from=builder /app/snapshot-dependencies/ ./
# Layer ini yang paling sering berubah
COPY --from=builder /app/application/ ./

RUN adduser -D ucup
USER ucup
ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]
```

