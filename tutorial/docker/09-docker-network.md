---
sidebar_position: 10
title: 'Docker Network'
---

## 1️⃣ Apa itu Docker Networking?

**Docker Networking** memungkinkan kontainer untuk berkomunikasi satu sama lain, dengan host, serta dengan jaringan luar (internet) secara terisolasi dan aman.

Agar sebuah aplikasi (misal: Spring Boot) bisa berbicara dengan database (misal: MySQL), mereka harus berada dalam satu saluran komunikasi yang disebut **Network**.

## 2️⃣ Jenis-Jenis Driver Network (Built-in)

Docker menyediakan beberapa tipe driver sesuai kebutuhan: 

1. **Bridge (Default)**: Driver yang paling umum digunakan. Membuat jaringan virtual private di dalam satu host (laptop/server). Kontainer di dalamnya bisa saling bicara, tapi terisolasi dari luar (network berbeda dengan network komputer host).
2. **Host**: Kontainer tidak punya IP sendiri, ia langsung memakai jaringan milik laptop/host. (Sangat cepat, tapi tidak ada isolasi port).
3. **None**: Kontainer benar-benar buta jaringan. Tidak ada akses internet maupun lokal.
4. **Overlay**: Digunakan untuk menghubungkan kontainer yang berada di server fisik yang berbeda (Sangat penting untuk Docker Swarm atau Cluster).

## 3️⃣ Perintah Dasar secara Imperatif (Cheat Sheet)

Gunakan perintah berikut melalui terminal:

* **Melihat daftar jaringan:** 

```bash
docker network ls
```

* **Membuat jaringan baru:**

```bash
docker network create --driver bridge nama-jaringan
```

* **Menghubungkan Kontainer ke Jaringan (Saat Start):**

```bash
docker run -d --name db --network nama-jaringan nama-kontainer
```

* **Menghubungkan kontainer ke jaringan yang sudah jalan:** 

```bash
docker network connect nama-jaringan nama-kontainer
```

* **Memutus Koneksi:**

```bash
docker network disconnect nama-jaringan nama_kontainer
```

* **Memeriksa detail jaringan:** 

```bash
docker network inspect nama-jaringan
```

* **Menghapus jaringan:**

```bash
docker network rm nama-jaringan
```

## 4️⃣ Mengapa Harus Membuat Network Sendiri? (User-Defined Bridge)

Docker memiliki jaringan bawaan bernama `bridge`. Namun, kita **dilarang** menggunakannya untuk production karena: 

* **Tidak ada Automatic DNS**: Di jaringan default, kita harus memanggil IP kontainer (yang sering berubah).
* **Di User-Defined Network**: Kita bisa memanggil nama kontainer (misal: `mysql-server`) dan Docker otomatis akan mencarikan IP-nya.

## 5️⃣ Port Mapping (Pintu Masuk dari Luar)

Network internal membuat kontainer bisa saling bicara, tapi browser kita di laptop tetap tidak bisa melihat aplikasi tersebut kecuali membuka port/pintunya.

**Perintah**: `-p [Port_Laptop]:[Port_Kontainer]`

**Contoh**: `docker run -p 8080:8080 spring-app`

    * *Internal*: Kontainer lain memanggil `spring-app:8080`.
    * *Eksternal*: Kita bisa membuka `localhost:8080` di browser host.

## 6️⃣ DNS Resolution

Jika kita menjalankan tiga kontainer:

1. Kontainer A (Nginx) nama: `webserver-app` terhubung ke network `frontend-network`.
2. Kontainer B (Springboot/backend app) nama: `springboot-app` terhubung ke network `frontend-network` dan `backend-network`
2. Kontainer B (MySQL/Postgresql) nama: `database` terhubung ke network `backend-network`.

![docker network](https://raw.githubusercontent.com/docker/libnetwork/master/docs/cnm-model.jpg)

Di dalam kode koneksi contoh pada Java (Spring Boot), tidak perlu tahu IP Database. Cukup tuliskan di `application.properties`:

```
spring.datasource.url=jdbc:mysql://database:3306/db_name
```

Docker akan secara otomatis menerjemahkan kata **`database`** menjadi IP internal yang tepat.

## 7️⃣ Tips Keamanan Jaringan

* **Isolasi Database**: Jangan pernah membuka port database ke luar (`-p 3306:3306`) di server production. Biarkan database hanya terhubung ke network internal, sehingga hanya aplikasi backend Anda yang bisa mengaksesnya.
* **Inspect Jaringan**: Selalu cek siapa saja yang "menguping" di jaringan kita:

```bash
docker network inspect app-network
```
