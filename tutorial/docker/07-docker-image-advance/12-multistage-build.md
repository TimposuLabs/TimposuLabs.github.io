---
sidebar_position: 12
title: 'Multi-Stage Build'
---

## 🤔 Apa itu Multi-Stage Build?

Docker **Multi-Stage Build** adalah teknik dalam pembuatan image Docker yang memungkinkan kita menggunakan beberapa tahap (stage) dalam satu Dockerfile. Setiap tahap dapat menggunakan image dasar (base image) yang berbeda, dan kita dapat menyalin artefak dari satu tahap ke tahap lainnya. Multi-Stage dapat meng-optimasi Dockerfile yang memisahkan tahap penyusunan kode (*build*) dari tahap eksekusi (*runtime*) untuk menghasilkan image yang jauh lebih kecil dan aman.

## 🔥 Contoh Implementasi

Berikut contoh penggunakan Multi-Stage build, dengan membagi proses build image menjadi 2 tahap:

1. **Tahap Persiapan (Build Stage):**
    * Menggunakan image dasar yang lengkap dengan tools pengembangan.
    * Melakukan instalasi dependensi dan kompilasi kode.
    * Menghasilkan artefak (misalnya file `.exe`, `.jar`, atau folder `dist`).

2. **Tahap Akhir (Final Stage):**
    * Menggunakan image dasar yang sangat minimal (hanya berisi OS ringan).
    * **Menyalin hanya file hasil kompilasi** dari tahap pertama.
    * Membuang semua file mentah dan tools kompilasi.

```dockerfile
# Stage 1: Build
FROM alpine:3.23.2 AS builder

RUN apk add --no-cache openjdk25-jdk

COPY Hello.java Hello.java
RUN javac Hello.java

# Stage 2: Run
FROM alpine:3.23.2

RUN apk add --no-cache openjdk25-jre-headless
COPY --from=builder Hello.class .
CMD ["java", "Hello"]
```

:::info
Secara default, Docker tidak menghapus stage pertama begitu saja. Image tersebut disimpan di sistem penyimpanan lokal host sebagai cache. 
:::

### 🚀 Contoh Implementasi di Spring Boot

```dockerfile
# --- Stage 1: Build (Kompilasi) ---
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy file konfigurasi dependency untuk caching
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code dan lakukan build
COPY src ./src
RUN mvn clean package -DskipTests

# --- Stage 2: Runtime (Eksekusi) ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Menyalin hasil build (.jar) dari tahap 'build' ke stage ini
COPY --from=build /app/target/*.jar app.jar

# Menjalankan aplikasi
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Penjelasan Tiap Tahap**

1. **`AS build`**: Memberikan nama alias pada tahap pertama agar hasilnya bisa dirujuk nanti.
2. **`mvn dependency:go-offline`**: Teknik untuk mempercepat build berikutnya dengan menyimpan layer library secara terpisah.
3. **`FROM eclipse-temurin:17-jre-alpine`**: Kita beralih ke image berbasis Alpine Linux yang sangat kecil dan hanya berisi JRE.
4. **`COPY --from=build`**: Inilah kuncinya. Kita mengambil file `.jar` dari tahap pertama, sementara semua file kode sumber (`.java`) dan cache Maven ditinggalkan di tahap sebelumnya.

### ⚖️ Perbandingan Hasil

Jika kita menggunakan satu tahap saja (hanya JDK), ukuran image bisa mencapai **600MB - 800MB**. Dengan menggunakan multi-stage build dan JRE Alpine seperti contoh di atas, ukurannya bisa berkurang hingga menjadi sekitar **150MB - 200MB**.

:::tip
* Gunakan Eclipse Temurin sebagai distribusi OpenJDK yang paling direkomendasikan dan stabil untuk container.
* Jika ingin keamanan lebih tinggi, gunakan image **Distroless** dari Google sebagai tahap kedua karena tidak memiliki *shell*, sehingga meminimalkan celah peretasan.
* Pantau dependensi Java Anda secara berkala menggunakan OWASP Dependency-Check untuk memastikan keamanan library yang digunakan.
:::
