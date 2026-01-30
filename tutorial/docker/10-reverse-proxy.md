---
sidebar_position: 11
title: 'Reverse Proxy'
---

## 🤔 Apa itu Reverse Proxy?

**Reverse Proxy** adalah sebuah server (seperti Nginx, Traefik, dll) yang berada di depan satu atau lebih aplikasi backend (seperti Spring Boot, NodeJS, Go, dll). Pada tutorial ini kita akan menggunakan Nginx sebagai reverse proxy, karena sangat populer digunakan dibanding yang lainnya.

![Docker Network](/img/docker/docker5.png)

### Mengapa kita menggunakan Reverse Proxy?

* **Keamanan**: Aplikasi Backend tidak terekspos langsung ke internet. Hanya Nginx yang membuka port luar.
* **Load Balancing**: Nginx bisa membagi beban ke beberapa kontainer Backend sekaligus.
* **SSL Termination**: Nginx mengelola sertifikat HTTPS, sehingga aplikasi Backend cukup fokus pada logika bisnis di HTTP biasa.
* **Satu Pintu**: Menggabungkan banyak microservices ke dalam satu domain/port yang sama. 

## 1️⃣ Arsitektur Jaringan (Docker Network)

Dalam arsitektur contoh kasus ini, kita akan membuat sebuah jaringan privat.

* **Nginx**: Terhubung ke Jaringan luar (Port 80) dan Jaringan Internal Docker.
* **Spring Boot (Aplikasi Backend)**: Hanya terhubung ke Jaringan Internal Docker (Port 8080). Tidak bisa diakses langsung dari browser Jaringan luar lewat port 8080.

![Docker Network](/img/docker/docker5.png)

## 3️⃣ Konfigurasi Nginx

Buat file bernama `reverse-proxy.conf`. Di sini kita memberi tahu Nginx untuk meneruskan semua permintaan ke service bernama `springboot-app`. Disini diasumsikan aplikasi backend sudah menjadi image.

```conf
server {
  listen 80;
  server_name springboot-app;

  location / {
    proxy_pass http://springboot-app:8080/;    
  }
}
```

:::tip
Untuk aplikasi Backend anda bisa membuatnya sendiri menggunakan bahasa pemrograman lain, atau menggunakan image yang sudah saya buat: https://hub.docker.com/r/timposulabs/springboot-hello.

Aplikasi backend yang dibuat pada tutorial ini, untuk endpoint `/hello` method GET, akan mengembalikan reponse API:

```json
{
  "host":"<ip address>",
  "message":"Hello from Spring Boot!",
  "hostname":"<hostname>"
}
```
:::

## 4️⃣ Membuat Docker Image

* Membuat dockerfile dari base image Nginx dan melakukan copy file `reverse-proxy.conf` yang telah dibuat ke dalam image Nginx.

```dockerfile
FROM nginx:stable-bullseye
COPY reverse-proxy.conf /etc/nginx/conf.d/default.conf
```

* Build image:
 
```bash
docker image build -t webserver:1.0.0 .
```

## 5️⃣ Uji Coba🔥

* Jalankan kontainer Spring Boot App:

```bash
docker container run -d --rm --name springboot-app --network backend-network topekox/springboot-hello:1.0
```

* Jalankan kontainer Nginx:

```bash
docker container run -d --rm --name webserver --network backend-network -p 80:80 webserver:1.0.0
```

* Cek inspect network:

```json
docker network inspect backend-network 

"Containers": {
        "253940e840457752a9352760090e33d7cf947ab7f919932fa255a679e3a2faca": {
            "Name": "webserver",
            "EndpointID": "2a26bfa51dddace376346b40d5005f043bcafa538b1ad80d087389a011366a9e",
            "MacAddress": "7e:00:e7:a7:a4:8d",
            "IPv4Address": "172.18.0.3/16",
            "IPv6Address": ""
        },
        "e86b63f85bdbf4bead5123c8d5916cadbef7bd4c7255415d8c1c329e0c53c22d": {
            "Name": "springboot-app",
            "EndpointID": "dcfda9ae191c84c3171cf82ba449899238e5bbf12ad0160c8a6a730fd77e56d0",
            "MacAddress": "ca:cd:5f:e3:af:e7",
            "IPv4Address": "172.18.0.2/16",
            "IPv6Address": ""
        }
}
```

Terdapat 2 container di dalam network `backend-network`.

* **Pengujian**:
  * Meskipun Spring Boot jalan di 8080, kita harus mengaksesnya lewat port 80 (Nginx).
  * Jika kita mencoba buka `http://localhost:8080`, akses akan ditolak. Inilah yang disebut **keamanan infrastruktur**.

```bash
curl http://localhost:80/hello 

{"hostname":"e86b63f85bdb","message":"Hello from Spring Boot!","host":"172.18.0.2"}
```

```bash
curl http://localhost:8080/hello 

curl: (7) Failed to connect to localhost port 8080 after 0 ms: Couldn't connect to server
```
