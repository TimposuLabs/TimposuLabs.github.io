---
sidebar_position: 14
title: 'Docker Compose'
---

## 🤔 Apa itu Docker Compose?

**Docker Compose** adalah alat (tool) untuk mendefinisikan dan menjalankan aplikasi Docker multi-kontainer. Docker Compose dapat memudahkan pengelolaan layanan yang saling terhubung, seperti frontend, backend API, dan database.

* **Masalah**: Bayangkan kita harus mengetik perintah `docker run` yang sangat panjang untuk MySQL, lalu satu lagi untuk Java, lalu satu lagi untuk Nginx, dan menghubungkan jaringan mereka satu per satu secara manual.
* **Solusi**: Dengan Docker Compose, kita menulis semua konfigurasi tersebut ke dalam sebuah file bernama `compose.yaml` (dulu `docker-compose.yml`), lalu menjalankannya secara bersamaan.

Docker Compose dapat membantu mengotomatisasi eksekusi banyak kontainer dengan satu perintah, menyatukan berbagai macam Dockerfile menjadi satu file dan menentukan tumpukan aplikasi dalam sebuah file.

:::tip
**Baca:** [Dokumen Resmi YAML](https://yaml.org/).
:::

:::tip
**Baca:** [Dokumentasi Resmi Docker Compose](https://docs.docker.com/compose/).
:::

## 1️⃣ Top Elemen dalam Docker Compose

### 1. `services` (Elemen Utama)
Elemen ini adalah bagian paling penting. Di sini kita mendefinisikan kontainer-kontainer yang membentuk aplikasi kita.
* **Fungsi**: Menentukan citra (image), port yang dibuka, variabel lingkungan, dan bagaimana kontainer harus dijalankan.
* **Contoh**: Kita bisa memiliki satu service untuk web-app (Java/Spring), satu untuk database (PostgreSQL), dan satu untuk cache (Redis).

### 2. `networks`
Elemen ini digunakan untuk mengatur jalur komunikasi antar kontainer.
* **Fungsi**: Secara default, Compose membuat satu jaringan untuk semua service. Namun, dengan elemen ini, kita bisa membuat jaringan terpisah (misal: jaringan frontend dan backend) untuk meningkatkan keamanan.
* **Manfaat**: Memungkinkan service saling memanggil menggunakan nama service (DNS) daripada alamat IP.

### 3. `volumes`
Elemen ini digunakan untuk mengelola penyimpanan data permanen.

* **Fungsi**: Mendefinisikan tempat penyimpanan data di luar siklus hidup kontainer. Data dalam volume tidak akan hilang meskipun kontainer dihapus atau di-restart.
* **Penggunaan**: Sangat penting untuk database (seperti folder `/var/lib/postgresql/data`) agar data transaksi kita tetap ada selamanya.

### 4. `configs`
Elemen ini memungkinkan kita mengelola file konfigurasi secara eksternal tanpa harus membangun ulang (rebuild) image.
* **Fungsi**: Memberikan file (seperti `nginx.conf` atau `settings.xml`) ke kontainer saat ia mulai berjalan. File ini bersifat *read-only* (hanya baca).
* **Kelebihan**: Kita bisa mengubah isi file konfigurasi di host, dan kontainer akan menggunakan versi terbaru saat dijalankan ulang.

### 5. `secrets`
Elemen ini mirip dengan `configs`, tetapi dirancang khusus untuk **data sensitif**.

* **Fungsi**: Digunakan untuk menyimpan kata sandi (password), sertifikat SSL, atau API Key secara aman. Docker akan memastikan data ini tidak terlihat di log atau saat perintah `docker inspect`.
* **Keamanan**: Data didekripsi dan diberikan ke kontainer hanya di dalam memori (RAM), tidak pernah ditulis ke disk kontainer dalam bentuk teks biasa.

### Contoh Implementasi Gabungan (YAML):

File ini menggunakan format **YAML** yang mengandalkan spasi (*indentasi*). Berikut adalah komponen utamanya:

```yaml
services:
  app-java:
    image: my-spring-app:latest
    networks:
      - backend-net
    secrets:
      - db_password
    configs:
      - source: app_config
        target: /app/config/settings.properties

  db-postgres:
    image: postgres:16
    networks:
      - backend-net
    volumes:
      - db_data:/var/lib/postgresql/data

networks:
  backend-net: # Mendefinisikan network

volumes:
  db_data:     # Mendefinisikan volume penyimpanan

configs:
  app_config:
    file: ./configs/my_settings.properties

secrets:
  db_password:
    file: ./secrets/db_pass.txt
```

## 2️⃣ Perintah Utama Docker Compose (CLI)

Untuk menjalankan script Docker Compose (harus berada di direktori yang sama) gunakan perintah:

* **Menjalankan Semua Service:**

```bash
docker compose up
```

atau

```bash
docker compose up -d
```

    * `-d`: Menjalankan di latar belakang (detached).

* **Melihat Status Kontainer:**

```bash
docker compose ps
```

* **Melihat Log Gabungan:**

```bash
docker compose logs -f
```

* **Menghentikan Kontainer:**

```bash
docker compose stop
```

*Catatan: Menghentikan kontainer tapi tidak menghapusnya.*

* **Menghentikan & Menghapus Semua:**

```bash
docker compose down
```

*Catatan: Perintah ini akan menghapus kontainer dan network, tapi tetap menjaga Volume tetap aman.*

* **Melakukan Scaling (Menambah jumlah kontainer):**

```bash
docker compose up -d --scale app-java=3
```

## 3️⃣ Fitur Unggulan Docker Compose

1. **Service Discovery (DNS)**: Di dalam file Compose, kita bisa memanggil database cukup dengan nama database (sesuai nama servicenya). Docker otomatis mengatur IP-nya.
2. **`depends_on`**: Mengatur urutan startup. Contoh: Jangan jalankan aplikasi Java sebelum MySQL siap.
3. **Environment Variables**: Kita bisa menggunakan file `.env` di samping file `compose.yaml` untuk menyimpan password agar file YAML kita tetap bersih dan aman.
4. **Profiles**: Kita bisa membagi konfigurasi untuk `dev` (pengembangan) dan `prod` (produksi) dalam satu file yang sama.

## 4️⃣ Tips
Nama File: Docker sekarang resmi menyarankan nama file compose.yaml daripada docker-compose.yml. Docker Compose Specification
Validasi: Gunakan perintah docker compose config untuk mengecek apakah ada kesalahan pengetikan spasi/indentasi pada file YAML kita sebelum dijalankan.
Keep it Simple: Jangan masukkan terlalu banyak layanan dalam satu file Compose jika tidak saling berhubungan. Pisahkan berdasarkan kebutuhan proyek.

## 5️⃣ Contoh Implementasi

### Skenario 1: Membuat Docker Compose

Kita akan membuat container Nginx dengan nama `webserver` dengan posrt `80`.

* Buat file `compose.yaml`:

```yaml
services:
  nginx:
    container_name: webserver
    image: nginx:stable-alpine
    ports:
      - 80:80
```

* Menjalankan script compose (harus berada di direktori yang sama):

```bash
docker compose up -d
```

* Uji coba menggunakan browser atau cURL:

```bash
curl localhost:80
```

### Skenario 2: Menggunakan Network

* Kita akan menambahkan elemen network dalam docker compose. Contoh kita akan membuat nework dengan nama `backend-network`. Tahap pertama kita membuat network tersebut.

```bash
docker network create -d bridge backend-network 
```

* Karena sebelumnya kita sudah membuat network, maka kita perlu menambahkan `external:true`.

```yaml
services:
  nginx:
    container_name: webserver
    image: nginx:stable-alpine
    ports:
      - 80:80
    networks:
      - backend-network

networks:
  backend-network:
    driver: bridge
    external: true
```

* Jalankan `docker compose`:

```bash
docker compose up -d
```

* Cek detail `backend-network`:

```
docker network inspect backend-network 

"Containers": {
    "26095b2a258642fc339468578003334e2f7f90dd533cdc9779bc6936e28a72db": {
        "Name": "webserver",
        "EndpointID": "884cf86b972918bc0497bf103b172a8f9142f8bcad709bbe658ff02a3a0a5942",
        "MacAddress": "4e:82:0e:b4:d3:18",
        "IPv4Address": "172.18.0.2/16",
        "IPv6Address": ""
    }
},
```

### Skenario 3: Menambahkan Volume

Disini kita akan menambahakan volume dan menambahkan konfigurasi MySQL seperti [materi Docker Volume sebelumnya](/docker/docker-volume).

* Menambahkan volume dan service dengan konfigurasi untuk MySQL:

```yaml
services:
  nginx:
    container_name: webserver
    image: nginx:stable-alpine
    ports:
      - 80:80
    networks:
      - backend-network

  mysql:
    container_name: mysql-db
    image: mysql:8.4.7
    environment:
      - MYSQL_ROOT_PASSWORD=rahasia
    networks:
      - backend-network
    volumes:
      - mysql-data:/var/lib/mysql

networks:
  backend-network:
    driver: bridge
    external: true

volumes:
    mysql-data:
      driver: local
```

* Jalankan container:

```bash
docker compose up -d
```

* Masuk ke dalam MySQL dan buat database `belajar`:

```bash
docker exec -it mysql-db mysql -u root -p

Enter password: 

mysql> create database belajar;
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

* Uji coba: Compose down untuk menghapus isi dalam resource compose down dan kemudian up lagi untuk menguji Volume.

```bash
docker compose down

docker compose up
```

* Kemudian cek ulang databasenya, seharusnya database sebelumnya yang dibuat masih ada.

```bash
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| belajar            |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

### Skenario 4: Docker Compose menggunakan Aplikasi dengan Database dan Docker Volume

Disini kita akan menggunakan contoh pada studi kasus sebelumnya pada [materi Docker Volume](/docker/docker-volume) menggunakan Docker Compose, dengan menggunakan Springboot sebagai aplikasi backend.

![Docker Volume Database](/img/docker/docker8.png)

**1.** **Membuat Docker Compose**

 Kita akan membuat Docker Compose dengan catatan `network` dan `volume` sudah ada, kemudian pertama kita akan membuat service mysql pada docker compose. Kenapa dalam skenario ini perlu membuat container database terlebih dahulu? karena aplikasi Springboot yang akan kita jalankan menggunakan database MySQL, jika dijalankan bersama, maka Springboot error karena database belum dibuat, sehingga dia belum bisa terhubung ke database. Kecuali jika sebelumnya database telah dibuat pada Volume yang sama pada Docker Compose.

```yaml
services:
  mysql:
    container_name: mysql-db
    image: mysql:8.4.7
    environment:
      - MYSQL_ROOT_PASSWORD=rahasia
    networks:
      - backend-network
    volumes:
      - mysql-data:/var/lib/mysql

networks:
  backend-network:
    driver: bridge
    external: true

volumes:
    mysql-data:
      driver: local
```

**2.** **Jalankan container** dengan Docker Compose:

```bash
docker compose up -d
```

**3.** **Buat database** di dalam container:

```bash
docker exec -it mysql-db mysql -u root -p

Enter password: 

mysql> create database belajar;
```

**4.** **Membuat Service Springboot**:

Setelah membuat container MySQL dan databasenya, selanjutnya menambahkan service Spring Boot pada Docker Compose:

```yaml
services:
  mysql:
    container_name: mysql-db
    image: mysql:8.4.7
    environment:
      - MYSQL_ROOT_PASSWORD=rahasia
    networks:
      - backend-network
    volumes:
      - mysql-data:/var/lib/mysql

springboot:
    image: timposulabs/springboot-crud-demo:v1.1 # springboot app image
    networks:
      - backend-network
    environment:
      - DB_ADD=mysql-db
      - DB_PORT=3306
      - DB_NAME=belajar
      - DB_USER=root
      - DB_PASS=rahasia
    depends_on:
      - mysql # Memastikan urutan startup, mysql jalan dulu baru springboot

networks:
  backend-network:
    driver: bridge
    external: true

volumes:
    mysql-data:
      driver: local
```

**5.** **Scaling**:

Karena pada contoh kasus ini kita akan membuat 2 kontainer aplikasi Spring Boot dari image yang sama kita perlu melakukan scaling.

```bash
docker compose up --scale springboot=2 -d
```

:::warning
**Penting**: Dalam compose scale, tidak diperkenangkan menggunakan `container_name`, karena docker akan membuat name service secara otomatis secara berurutan.
:::

**6.** **Membuat Service Nginx**

Konfigurasi `load-balancer.conf`, sesuaikan dengan nama container dengan service yang dibuat di Docker Compose. Untuk konfigurasi Nginx kita bisa melakukan beberapa cara di antaranya.

* **Cara 1**: Terlebih dahulu mengetahui nama container Springboot, setelah itu dimasukan ke dalam konfigurasi Nginx:

```bash
docker ps

CONTAINER ID   IMAGE                                   COMMAND                  CREATED          STATUS          PORTS                 NAMES
ade837254254   timposulabs/springboot-crud-demo:v1.1   "java org.springfram…"   8 seconds ago    Up 8 seconds                          demo5-springboot-2
0f53621156c5   timposulabs/springboot-crud-demo:v1.1   "java org.springfram…"   24 seconds ago   Up 23 seconds                         demo5-springboot-1
```

Dari hasil di atas kita mendapatkan nama container Springboot `demo5-springboot-1` dan `demo5-springboot-2`:

File `load-balancer.conf`:

```
upstream backend {
  server demo5-springboot-1:8080;
  server demo5-springboot-2:8080;
}

server {
  listen 80;

  location / {
    proxy_pass http://backend;
  }
}
```

* **Cara 2**: Menggunakan configurasi dinamis, dimana kita menggunakan resolver internal Docker, agar Nginx bisa mencari IP secara dinamis:

File `load-balancer.conf`:

```
server {
  listen 80;
  
  # Gunakan resolver internal Docker agar Nginx bisa mencari IP secara dinamis
  resolver 127.0.0.11 valid=5s;

  location / {
    # Gunakan variabel agar Nginx TETAP JALAN meskipun backend belum siap
    # Sesuaikan dengan nama container pada service docker compose
    set $target http://springboot:8080; 
    proxy_pass $target;
  }
}
```

:::info
Gunakan resolver internal Docker agar Nginx bisa mencari IP secara dinamis, karena secara default Nginx akan mecari secara secara static. Jika tidak di set ke static maka Nginx terkadang tidak dapat menemukan container Springboot, jika nama container tidak sesuai.

**127.0.0.11** adalah alamat IP internal yang digunakan oleh Docker sebagai server DNS bawaan (embedded DNS server) di dalam setiap kontainer.
:::

* Konfigurasi `dockerfile`:

```dockerfile
FROM nginx:stable-alpine
COPY load-balancer.conf /etc/nginx/conf.d/default.conf
```

* Build menjadi image:

```
docker image build -t webserver:1.0 .
```

**7.** **Menambahkan service Nginx pada Docker Compose.**

```yaml
services:
  mysql:
    container_name: mysql-db
    image: mysql:8.4.7
    environment:
      - MYSQL_ROOT_PASSWORD=rahasia
    networks:
      - backend-network
    volumes:
      - mysql-data:/var/lib/mysql

  springboot:
    image: timposulabs/springboot-crud-demo:v1.1 # springboot app image
    networks:
      - backend-network
    environment:
      - DB_ADD=mysql-db
      - DB_PORT=3306
      - DB_NAME=belajar
      - DB_USER=root
      - DB_PASS=rahasia
    depends_on:
      - mysql # Memastikan urutan startup, mysql jalan dulu baru springboot

  nginx:
    container_name: webserver
    image: webserver:1.0 # custom image nginx yang sudah terintegrasi dengan springboot app
    ports:
      - 80:80
    networks:
      - backend-network
    depends_on:
      - springboot # Memastikan urutan startup, springboot jalan dulu baru nginx 

networks:
  backend-network:
    driver: bridge
    external: true

volumes:
    mysql-data:
      driver: local
```

:::tip
**Troubleshooting**: Meskipun kita menggunakan `depends_on`, Docker hanya menjamin kontainer `mysql-db` sudah **berjalan (running)**, bukan **siap (ready)** menerima koneksi. Terkadang dalam beberapa kasus MySQL butuh waktu beberapa detik (bahkan lebih lama) untuk inisialisasi internal sebelum port 3306 bisa dipakai. Untuk mengatasi agar MySQL harus siap baru menjalankan service lain maka kita mengubah konfigurasinya sebagai berikut:

```yaml
services:
  mysql:
    container_name: mysql-db
    image: mysql:8.4.7
    environment:
      - MYSQL_ROOT_PASSWORD=rahasia
    networks:
      - backend-network
    volumes:
      - mysql-data:/var/lib/mysql
    # Memastikan ,mysql-db siap (ready) menerima koneksi. 
    # MySQL butuh waktu beberapa detik untuk inisialisasi internal sebelum port 3306 bisa dipakai. 
    # Tambahkan juga file .env untuk value MYSQL_ROOT_PASSWORD=rahasia
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p$MYSQL_ROOT_PASSWORD"]
      interval: 5s
      timeout: 5s
      retries: 10

  springboot:
    image: timposulabs/springboot-crud-demo:v1.1 # springboot app image
    networks:
      - backend-network
    environment:
      - DB_ADD=mysql-db
      - DB_PORT=3306
      - DB_NAME=belajar
      - DB_USER=root
      - DB_PASS=rahasia
    # Update depends_on agar menunggu kondisi healthy
    depends_on:
      mysql:
        condition: service_healthy

  nginx:
    container_name: webserver
    image: webserver:1.0 # custom image nginx yang sudah terintegrasi dengan springboot app
    ports:
      - 80:80
    networks:
      - backend-network
    depends_on:
      - springboot # Memastikan urutan startup, springboot jalan dulu baru nginx 

networks:
  backend-network:
    driver: bridge
    external: true

volumes:
    mysql-data:
      driver: local
```

*Catatan: Buat juga file dengan nama `.env` dan masukan text value `MYSQL_ROOT_PASSWORD=rahasia` di dalamnya.*
:::

**8.** **Docker Compose Up:**

```bash
docker compose up --scale springboot=2 -d
```

**9.** **Uji coba aplikasi** dengan menggunakan Rest API Client seperti cURL, Postman dll, ke URL `http://localhost:80/products/`:

    Contoh:

```bash
curl -v http://localhost:80/products/ | jq .
```

Uji coba dengan menggunakan method GET, POST, PUT dan DELETE.
