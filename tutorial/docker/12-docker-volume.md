---
sidebar_position: 13
title: 'Docker Volume'
---

## 🤔 Apa itu Docker Volume?

**Docker Volume** adalah mekanisme penyimpanan persisten yang dikelola oleh Docker untuk menyimpan data yang dihasilkan container di luar sistem file container itu sendiri. Docker Volume memastikan data tetap aman, permanen, dan tidak hilang meskipun container dihentikan, dihapus, atau dibuat ulang. Volume ideal untuk data database, file unggahan, dan konfigurasi. 

## 1️⃣ Mengapa kita membutuhkan Docker Volume?

Secara default, container pada Docker bersifat **ephemeral** (sementara).
* Jika container dihapus, semua data yang dibuat di dalamnya (seperti data di `/var/lib/mysql` pada MySQL atau `/var/lib/postgresql/data` pada PostgreSQL) akan **ikut terhapus selamanya**.
* **Volume** hadir sebagai mekanisme untuk memisahkan data dari siklus hidup container. Data disimpan di luar container (di host Linux), sehingga meskipun container dihancurkan, data tetap utuh.

## 2️⃣ Jenis-Jenis Penyimpanan di Docker

Terdapat tiga cara utama untuk menyimpan data:

* **Volumes (Sangat Disarankan)**: Dikelola sepenuhnya oleh Docker di area khusus pada sistem file host (`/var/lib/docker/volumes/`). Lebih aman dan kinerjanya lebih stabil.
* **Bind Mounts**: Menghubungkan folder spesifik di komputer host (misal: `C:\Users\Documents\data`) ke dalam container. Sangat bagus untuk pengembangan kode secara real-time.
* **tmpfs Mount**: Data disimpan di dalam memori (RAM) host. Data akan hilang jika container dimatikan (sangat cepat, cocok untuk data sensitif/password sementara).

## 3️⃣ Perintah Docker Volume (Imperatif)

* **Membuat Volume:**

```bash
docker volume create mysql-data
```

* **Melihat Daftar Volume:**

```bash
docker volume ls
```

* **Melihat Detail Lokasi Penyimpanan:**

```bash
docker volume inspect mysql-data
```

* **Menghapus Volume:**

```bash
docker volume rm mysql-data
```

:::tip
**Catatan:** Sebelum menghapus volume pastikan container yang menggunakan volume-nya sudah mati.
:::

## 4️⃣ Cara Menghubungkan Volume ke Container

![Docker Volume](https://github.com/TopekoX/belajar-docker/raw/main/img/docker-volume1.png)

Kita bisa menggunakan flag `-v` atau `--mount`. Penggunaan `-v` masih menjadi yang tersingkat dan terpopuler.

**Sintaks:** `-v [Nama_Volume]:[Path_Dalam_Container]`

### Contoh pada MySQL

```bash
docker run -d \
  --name db-server \
  -v mysql-data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=rahasia \
  mysql:8.4
```

:::info
**Hasilnya**: Semua isi database akan tersimpan di volume `mysql-data`. Kita bisa menghapus container ini dan membuat yang baru, lalu database akan muncul kembali seperti sedia kala.
:::

## 5️⃣ Melihat data Docker Volume di Komputer Host

Untuk melihat lokasi data kita dapat melakukan inspect:

```bash
docker volume inspect data-volume 

[
    {
        "CreatedAt": "2025-04-02T22:51:30+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/data-volume/_data",
        "Name": "data-volume",
        "Options": null,
        "Scope": "local"
    }
]
```

Dari hasil di atas lokasi data di komputer host adalah `/var/lib/docker/volumes/data-volume/_data`.

Kita bisa melihat isi datanya dengan akses root / administrator komputer host:

```bash
sudo su -

ucup@timposulabs:~# cd /var/lib/docker/volumes/data-volume/_data
ucup@timposulabs:/var/lib/docker/volumes/data-volume/_data# ls

myfile
```

:::info
**Catatan**: Isi file asli selalu berada di dalam folder `_data`.
:::

## 6️⃣ Tips: Keamanan & Performa

1. **Prinsip Read-Only**: Jika container hanya butuh membaca file konfigurasi tanpa mengubahnya, gunakan mode `:ro` (read-only).
    * Contoh: `-v ./nginx.conf:/etc/nginx/nginx.conf:ro`
2. **Backup Data**: Untuk mem-backup data dari volume, kita bisa menjalankan container sementara yang melakukan kompresi (`tar`) pada folder volume tersebut.

    * **Contoh Backup**:
 
    ```bash
    docker run --rm \
        -v db-data:/source-data:ro \
        -v $(pwd):/backup \
        alpine \
        tar czf /backup/db-backup-2026.tar.gz -C /source-data .
    ```
    :::info
    Keterangan: `-v $(pwd):/backup`: Menghubungkan folder saat ini ke dalam container untuk menampung hasil backup.
    :::
 
    * **Contoh Restore**:
 
    ```bash
    # 1. Buat volume baru
    docker volume create db-data-new

    # 2. Ekstrak file backup ke dalamnya
    docker run --rm \
        -v db-data-new:/dest-data \
        -v $(pwd):/backup \
        alpine \
        sh -c "tar xzf /backup/db-backup-2026.tar.gz -C /dest-data"
    ```
3. **Hapus Volume Tak Terpakai**: Gunakan `docker volume prune` secara berkala untuk menghapus volume yang tidak terhubung ke container manapun agar penyimpanan tidak penuh.

## 7️⃣ Contoh Implementasi Docker Volume

### Skenario 1: Menghubungkan Container dengan Volume 

![Docker Volume](https://github.com/TopekoX/belajar-docker/raw/main/img/docker-volume1.png)

* **Membuat Volume**:

```bash
docker volume create belajar-data
```

* **Cek daftar Volume**:

```bash
docker volume ls

DRIVER    VOLUME NAME
local     belajar-data
```

* **Membuat Container:**

Membuat Container Alpine Linux dengan nama `alpine` yang terhubung dengan docker volume `belajar-data` dan mount volume berada di `/data`:

```bash
docker container run -it --rm -v belajar-data:/data --name alpine alpine:latest
```

Kita dapat membuat file dalam container `alpine`.

```
cd /data

/data # touch myfile
/data # ls
myfile
```

* **Melihat data Volume di Host:**

```json
docker volume inspect belajar-data

[
    {
        "CreatedAt": "2026-01-26T16:53:15+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/belajar-data/_data",
        "Name": "belajar-data",
        "Options": null,
        "Scope": "local"
    }
]
```

Dari hasil di atas lokasi data di komputer host adalah `/var/lib/docker/volumes/belajar-data/_data`.

Kita bisa melihat isi datanya dengan akses root komputer host:

```bash
sudo ls /var/lib/docker/volumes/belajar-data/_data

myfile
```

File `myfile` yang dibuat pada container masih ada di docker volume.

### Skenario 2: Berbagi Docker Volume

![Docker Volume](https://raw.githubusercontent.com/TopekoX/belajar-docker/main/img/docker-volume2.png)

Disini kita akan membuat 2 docker container Alpine Linux dengan nama `alpine1` dan `alpine2`:

* Buat container `alpine1`:

```bash
docker container run -it --rm -v belajar-data:/data --name alpine1 alpine:latest
```

* Buka terminal baru dan buat container `alpine2`:

```bash
docker container run -it --rm -v belajar-data:/data --name alpine2 alpine:latest
```

* Pada `alpine2` kita akan membuat file baru:

```
# cd /data/
/data # touch hello.txt
/data # echo "Hallo Bro!!!" > hello.txt
/data # cat hello.txt
Hallo Bro!!!
```

* Pada `alpine1` melakukan pengecekan:

```
# cd /data/
/data # ls
hello.txt
/data # cat hello.txt
Hallo Bro!!!
```

Disini kita sudah berhasil share data pada docker volume.

### Skenario 3: Menggunakan Database MySQL

Penggunaan Docker Volume pada database seperti MySQL, PostgreSQL, MariaDB, dll, sangat penting karena secara default, data di dalam container bersifat sementara (**ephemeral**) dan akan hilang jika container dihapus. Volume memungkinkan data dalam database tetap tersimpan dengan aman di sistem host.

![Docker Volume Database](/img/docker/docker7.png)

* **Lokasi Data Penting**

Secara default, image database yang digunakan dalam contoh kali ini yaitu MySQL, menyimpan seluruh data databasenya di dalam direktori berikut di dalam container:

```
/var/lib/mysql 
```

:::tip
Setiap database memiliki lokasi data penyimpanan yang berbeda-beda misalnya postgres berada di `/var/lib/postgresql/data`, jadi silahkan baca dokumentasi masing-masing image database yang digunakan.
:::

* **Langkah 1: Buat Volume**

Kita dapat membuat volume terlebih dahulu atau langsung membuat volume saat menjalankan container. Contoh disini menggunakan nama volume `mysql-data`.

```bash
docker volume create mysql-data
```

* **Langkah 2: Jalankan Container dengan Volume**

Gunakan flag `-v` untuk menghubungkan volume ke direktori data MySQL. 

```bash
docker run -d --name mysql-db -e MYSQL_ROOT_PASSWORD=rahasia -v mysql-data:/var/lib/mysql mysql:8.4
```

Dengan menggunakan docker volume, jika kita membuat database di dalam container MySQL di atas, kemudian menghapus container tersebut maka data yang ada di dalam container MySQL tersebut tetap ada, walaupun sifat container yang *stateless*. Jika kita membuat container MySQL baru dengan menggunakan volume tersebut, maka database sebelumnya tetap ada.

* **Langkah 3: Uji Coba**

1. Karena container MySQL tidak diekspose ke jaringan luar, kita harus masuk ke dalam container MySQL menggunakan `docker exec`:

```bash
docker exec -it mysql-db mysql -u root -p

Enter password:

Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.4.8 MySQL Community Server - GPL

Copyright (c) 2000, 2026, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

2. Buat database:

```bash
mysql> create database belajar_docker;

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| belajar_docker     |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

3. Untuk mengujinya silahkan keluar bash MySQL kemudian hapus container MySQL, lalu buat container MySQL yang baru dengan menggunakan volume sebelumnya. dan masuk ke console MySQL dan cek databasenya kembali.

### Skenario 4: Aplikasi menggunakan Database dan Docker Volume

Pada skenario ini kita sudah akan menggunakan aplikasi yang kompleks dimana kita akan mengimplementasikan Load Balancing dan Docker Volume. 

![Docker Volume Database](/img/docker/docker8.png)

**Load Balancing dengan Nginx:**

* **Pengguna / User** mengirimkan permintaan ke **Nginx Webserver** melalui port `80`. 
* Nginx bertindak sebagai "pengatur lalu lintas" yang berada di antara user dan beberapa application server di belakangnya.
* Nginx mendistribusikan permintaan masuk secara merata ke dua instance **app-1** dan **app-2**.
* Jika salah satu aplikasi **mengalami gangguan**, Nginx akan secara otomatis mengalihkan lalu lintas ke server lain yang masih berfungsi.

**Integrasi Database dan Volume**

* Kedua aplikasi (`app-1` dan `app-2`) terhubung ke satu instance MySQL yang berjalan di container terpisah.
* Database MySQL membutuhkan Docker Volume untuk persistensi data.
* Volume memisahkan data database (seperti file skema dan data aktual) dari siklus hidup container database. Data tetap utuh meskipun container MySQL dihapus atau dibuat ulang.
* Data fisik volume disimpan di Docker Host (mesin fisik/virtual yang menjalankan Docker), memastikan data aman dan dapat dibackup dengan mudah. 

Secara keseluruhan, arsitektur aplikasi yang akan dibuat memberikan solusi yang kuat yaitu load balancing untuk menangani lalu lintas masuk untuk skalabilitas aplikasi, sementara Docker volume memastikan data dalam database tetap persisten dan aman.

Pada contoh kasus ini untuk aplikasi `app-1` dan `app-2` menggunakan Spring Boot, untuk bahasa pemrograman lain tinggal menyesuaikan. Pada aplikasi ini, menggunakan fitur CRUD REST API yang tehubung ke database MySQL dengan API yang memproses data `products`.

Contoh JSON:

```json
{
    "id": 1,
    "name": "iphone 17",
    "price": "20000000.00"
}
```

:::tip
Untuk image aplikasi dapat di pull pada docker hub: 

* https://hub.docker.com/repository/docker/timposulabs/springboot-crud-demo

Untuk source code project Spring Boot App:

* https://gitlab.com/topekox/demo-springboot-crud

Aplikasi ini membutuhkan environment untuk koneksi ke database MySQL:

```
DB_ADD=localhost
DB_PORT=3306
DB_NAME=belajar
DB_USER=root
DB_PASS=rahasia
```
:::

:::info
Sebelum mengikuti step by step langkah di bawah ini, sebelumnya buat terlebih dahulu docker network dengan nama `backend-network`.
:::

1. Menjalankan Database MySQL:

```bash
docker run -d --rm --name mysql-db \
-e MYSQL_ROOT_PASSWORD=rahasia \
--network backend-network \
-v mysql-data:/var/lib/mysql \
mysql:8.4
```

2. Masuk ke Database MySQL, dan buat database:

```bash
docker exec -it mysql-db mysql -u root -p

Enter password:

mysql> create database belajar;
```

3. Pull aplikasi spring app dari Docker Hub:

```bash
docker pull timposulabs/springboot-crud-demo:v1.0
```

4. Membuat Container `app-1` dan `app-2`:

```bash
docker container run -d --name app-1 \
-e DB_ADD=mysql-db \
-e DB_PORT=3306 \
-e DB_NAME=belajar \
-e DB_USER=root \
-e DB_PASS=rahasia \
--network backend-network \
timposulabs/springboot-crud-demo:v1.0
```

```bash
docker container run -d --name app-2 \
-e DB_ADD=mysql-db \
-e DB_PORT=3306 \
-e DB_NAME=belajar \
-e DB_USER=root \
-e DB_PASS=rahasia \
--network backend-network \
timposulabs/springboot-crud-demo:v1.0
```

:::info
Di dalam ekosistem Docker, setiap container memiliki jaringan (namespace) yang terisolasi, sehingga penggunaan `localhost` untuk variabel `DB_ADD` di dalam container aplikasi merujuk ke container itu sendiri, bukan ke container database atau ke host machine.

Sehingga kita harus mengganti `localhost` pada variabel `DB_ADD`, dengan nama container database yang sedang berjalan di network yang sama.
:::

5. Membuat container Load Balancing dengan Nginx:

* Buat konfigurasi Nginx `load-balancer.conf`:

```
upstream backend {
  server app-1:8080;
  server app-2:8080;
}

server {
  listen 80;

  location / {
    proxy_pass http://backend;
  }
}
```

* Buat `dockerfile`:

```dockerfile
FROM nginx:stable-alpine
COPY load-balancer.conf /etc/nginx/conf.d/default.conf
```

* Build image Nginx, contoh dengan nama `web-server:1.0`:

```bash
docker image build -t web-server:1.0 .
```

* Jalankan container Nginx `web-server:1.0`:

```bash
docker container run -d --name nginx-webserver --network backend-network -p 80:80 web-server:1.0
```

6. Uji coba aplikasi dengan menggunakan Rest API Client seperti cURL, Postman dll, ke URL `http://localhost:80/products/`:

    Contoh:

```bash
curl -v http://localhost:80/products/ | jq .
```

Uji coba dengan menggunakan method GET, POST, PUT dan DELETE.
