---
slug: arsitektur-docker-network-backend-frontend
title: Membangun Arsitektur Docker yang aman dengan Frontend–Backend Network
authors: topekox
tags: [docker]
---

Docker memudahkan proses deployment aplikasi, namun banyak implementasi Docker yang tidak memperhatikan aspek keamanan jaringan. Salah satu kesalahan paling umum adalah mengekspos database langsung ke jaringan publik menggunakan *port mapping*.

<!-- truncate -->

## 🧱 Arsitektur Docker yang Aman dengan Frontend–Backend Network

Arsitektur Frontend–Backend Network hadir sebagai solusi sederhana namun efektif untuk:

* Membatasi akses antar container.
* Mengisolasi database.
* Menerapkan prinsip least privilege.

### 1️⃣ Gambaran Umum Arsitektur

![Docker Network CNM](/img/docker/docker9.png)

Pada arsitektur ini, **Nginx** hanya berperan sebagai reverse proxy dan tidak memiliki akses langsung ke database. **Web application** menjadi satu-satunya komponen yang terhubung ke backend network dan frontend network serta bertanggung jawab penuh terhadap komunikasi dengan database, sehingga database sepenuhnya terisolasi dari akses publik.

### 2️⃣ Peran Masing-Masing Komponen

* **Client**
    * Browser atau aplikasi user.
    * Mengakses aplikasi melalui HTTP.
    * Tidak memiliki akses langsung ke service internal.

* **NGINX (Reverse Proxy)**
    * Satu-satunya service yang terbuka ke publik.
    * Routing request ke web application.
    * Hanya terhubung ke **Frontend Network**.
    * Tidak memiliki akses ke database.

   *📌 Ini memastikan jika NGINX mengalami compromise, database tetap aman.*

* **Web Application**
    * Menjalankan logika bisnis.
    * Menjadi satu-satunya penghubung ke database.
    * Terhubung ke:
        * **Frontend Network** (menerima request dari NGINX).
        * **Backend Network** (akses database).

    *📌 Web app memiliki dua endpoint jaringan sesuai Docker CNM.*

* **Database**
    * Menyimpan data aplikasi.
    * Hanya berada di **Backend Network**.
    * Tidak ada port yang diekspos ke host atau publik.
    
    *📌 Database sepenuhnya terisolasi dari Internet.*

## 🔀 Desain Jaringan

### 🌐 Frontend Network

* Berfungsi sebagai **zona publik**.
* Berisi:
    * NGINX.
    * Web Application.
* Menerima trafik dari luar.

### 🔒 Backend Network

* Jaringan **private internal** Docker.
* Berisi:
    * Web Application.
    * Database.
* Menggunakan `internal: true`.
* Tidak memiliki akses ke luar.

### 1️⃣ Network Membership

| Container	| Frontend Network	| Backend Network |
| --- | --- | --- |
| Nginx |	✅	| ❌ |
| Web App |	✅	| ✅ |
| Database |	❌	| ✅ |

* 📌 **Web App** = penghubung ke database.
* 📌 **Nginx** = hanya reverse proxy.

### 2️⃣ Alur Komunikasi (Step-by-Step)

1. Client mengakses aplikasi via HTTP.
2. Request diterima oleh NGINX di frontend network.
3. NGINX meneruskan request ke Web Application.
4. Web Application memproses logika bisnis.
5. Web Application mengakses Database melalui backend network.
6. Response dikirim kembali ke client.

## 👮 Keamanan yang Dicapai

### 🔐 Isolasi Database
* Database tidak dapat di-scan dari Internet.
* Tidak ada port exposure

### 🔐 Least Privilege
* Setiap container hanya memiliki akses yang diperlukan.
* NGINX tidak memiliki hak akses ke backend.

### 🔐 Attack Surface Minim
* Hanya satu entry point: NGINX.

## 🔥 Contoh Implementasi dengan Docker Compose

Dalam contoh kasus ini kita bisa melakukan konfigurasi NGINX terlebih dahulu.

* `load-balancer.conf`:

```conf
server {
  listen 80;
  server_name web-app;

  location / {
    # Ubah URL dan port sesuai aplikasi web
    proxy_pass http://web-app:8888/;
  }
}
```

* `Dockerfile`:

```dockerfile
FROM nginx:stable-alpine
COPY load-balancer.conf /etc/nginx/conf.d/default.conf
```

* `compose.yaml`:

```yaml
services:

  database:
    image: mysql:8.4.7
    container_name: database
    environment:
      - MYSQL_ROOT_PASSWORD=rahasia
    networks:
      - backend-network
    volumes:
      - mysql-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-prahasia"]
      interval: 5s
      timeout: 5s
      retries: 10

  webapp:
    image: timposulabs/demo-crud-express:1.0
    container_name: web-app
    environment:
      - DB_HOST=database
      - DB_USER=root
      - DB_PASSWORD=rahasia
      - DB_NAME=belajar
      - DB_PORT=3306
    networks:
      - frontend-network
      - backend-network
    depends_on:
      database:
        condition: service_healthy

  nginx:
    image: nginx-server:1.0
    ports:
      - "80:80"
    networks:
      - frontend-network
    depends_on:
      - webapp

networks:
  frontend-network:
    driver: bridge

  backend-network:
    driver: bridge
    internal: true
volumes:
  mysql-data:
    driver: local
```

## 🤔 Kenapa Arsitektur Ini Direkomendasikan?

* Mudah dipahami.
* Aman secara default.
* Cocok untuk:
    * Home server.
    * Startup kecil.
    * Production ringan.
* Tidak memerlukan tools kompleks.

### 😤 Kesalahan Umum yang Dihindari

* ❌ Expose port database.
* ❌ Semua container di satu network.
* ❌ NGINX diberi akses database.

Arsitektur ini menghindari semua kesalahan tersebut.

## 🔚 Penutup

Dengan menerapkan arsitektur **Frontend–Backend Network** seperti pada diagram, kita dapat membangun aplikasi Docker yang:

* Aman.
* Terstruktur.
* Siap digunakan di dunia nyata.

Tanpa perlu kompleksitas berlebihan.

## 👍 Referensi

* [Belajar Docker Disini](/docker).
