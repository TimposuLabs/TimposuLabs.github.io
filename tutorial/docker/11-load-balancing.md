---
sidebar_position: 12
title: 'Load Balancing'
---

## 🤔 Apa itu Load Balancing?

**Load Balancing** di Docker adalah teknik untuk membagi beban trafik (*request*) ke beberapa kontainer aplikasi yang identik. Load balancing ini berguna agar salah satu server yang mendapatkan banyak lalu lintas (trafik) kunjungan tidak mengalami kelebihan beban.

Kita tidak lagi mengandalkan satu kontainer besar (*vertical scaling*), melainkan menggunakan banyak kontainer kecil yang bekerja bersamaan (*horizontal scaling*). Jika satu kontainer mati, aplikasi tetap hidup karena masih ada kontainer lain.

![Docker Network](/img/docker/docker6.png)

## 1️⃣ Load Balancing di Docker

Terdapat dua cara utama untuk melakukan Load Balancing:

### A. Internal Load Balancing (Docker DNS)

Docker memiliki load balancer bawaan di dalam **Libnetwork**.

* Jika kita menjalankan satu service dengan 3 replika dalam satu network, Docker akan memberikan satu alamat DNS virtual.
* Setiap kali ada permintaan ke nama service tersebut, Docker akan membaginya secara *Round-Robin* (bergiliran) ke IP internal masing-masing kontainer.

### B. External Load Balancing (Reverse Proxy)

Menggunakan perangkat lunak khusus seperti **Nginx**, **HAProxy**, atau **Traefik** sebagai pintu gerbang utama yang mengatur pembagian trafik berdasarkan algoritma tertentu.

## 2️⃣ Implementasi dengan Nginx

Dalam arsitektur contoh kasus ini, kita akan membuat sebuah jaringan privat.

![Docker Network](/img/docker/docker6.png)

**Keterangan:**

* **Client (User)**: User hanya berkomunikasi dengan satu titik masuk, yaitu NGINX.
* **NGINX (Reverse Proxy & Load Balancer)**: Bertindak sebagai "penjaga gerbang" utama. Tugasnya adalah menerima semua permintaan / request dan membaginya ke backend.
* **App 1, App 2, App 3 (Backend Applications)**: Ini adalah beberapa replika kontainer aplikasi (misalnya, tiga kontainer Spring Boot yang identik). Mereka menerima beban yang dibagi oleh NGINX.
* **Backend Network (Jaringan Internal Docker)**: Ini adalah jaringan privat yang mengisolasi aplikasi backend dari jaringan luar. NGINX dan aplikasi backend berada dalam jaringan yang sama.

### A. Konfigurasi Nginx

Membuat file konfigurasi `load-balancing.conf`:

```json
upstream backend {
  server springboot-app-1:8080;
  server springboot-app-2:8080;
  server springboot-app-3:8080;
}

server {
  listen 80;

  location / {
    proxy_pass http://backend;
  }
}
```

### B. Membuat Docker Image

* Membuat dockerfile dari base image Nginx dan melakukan copy file `load-balancing.conf` yang telah dibuat ke dalam image Nginx.

```dockerfile
FROM nginx:stable-bullseye
COPY load-balancing.conf /etc/nginx/conf.d/default.conf
```

* Build Image:

```bash
docker image build -t webserver:2.0.0 .
```

### C. Uji Coba 🔥

* Membuat Container `springboot-app-1`:

```bash
docker container run -d --rm --name springboot-app-1 --network backend-network topekox/springboot-hello:1.0
```

* Membuat Container `springboot-app-2`:

```bash
docker container run -d --rm --name springboot-app-2 --network backend-network topekox/springboot-hello:1.0
```

* Membuat Container `springboot-app-3`:

```bash
docker container run -d --rm --name springboot-app-3 --network backend-network topekox/springboot-hello:1.0
```

* Membuat Container web server Nginx: 

```bash
docker container run -d --rm --name webserver --network backend-network -p 80:80 webserver:2.0.0
```

* Cek inspect network:

```json
docker network inspect backend-network

"Containers": {
    "32cac5fa20b415e60d7ca5d43c540ae4f81e4f2379da592277b221745b55fc32": {
        "Name": "springboot-app-3",
        "EndpointID": "5042596dffd464dca6707174e668e16da53d1dc6bc1830623bf9f8d0b7a22adf",
        "MacAddress": "be:ae:de:15:60:50",
        "IPv4Address": "172.18.0.4/16",
        "IPv6Address": ""
    },
    "37dbe8971f6bf90db3de9f96d9dc746f771dd6c3981eef147147a5d0eb8ba213": {
        "Name": "springboot-app-1",
        "EndpointID": "9d5e80aff269ddaa034acce1fe535a37ee2299d14a6ac6809ccaac77ce5b4d15",
        "MacAddress": "96:4b:de:32:b5:d9",
        "IPv4Address": "172.18.0.2/16",
        "IPv6Address": ""
    },
    "98d1e8fe04839a5d3a71f05bad8d8ec7de3b63691f6fb617b8829d7609caea0a": {
        "Name": "webserver",
        "EndpointID": "e7cf6a96abd4b2b035e85fb2df5ab31dc9f6752f91afa00d132918cb60a855c3",
        "MacAddress": "ce:a0:54:2e:74:8b",
        "IPv4Address": "172.18.0.5/16",
        "IPv6Address": ""
    },
    "a528fefd8f18415af60b43d8e7dcbb5eacefa38a7cd8847739efc7142f11ac2a": {
        "Name": "springboot-app-2",
        "EndpointID": "d4e1c657f07aaabd947d1b0e2f31779dfbf99a0dc9f994773bcf96067f3557c6",
        "MacAddress": "0e:a7:34:ca:11:84",
        "IPv4Address": "172.18.0.3/16",
        "IPv6Address": ""
    }
}
```
* **Testing**: Ketika kita melakukan request ke alamat API `http://localhost:80/hello` maka ip addres yang di tampilkan akan berubah-ubah

    * Percobaan 1:
    ```json
    {"message":"Hello from Spring Boot!","hostname":"37dbe8971f6b","host":"172.18.0.2"}
    ```
    * Percobaan 2:
    ```json
    {"message":"Hello from Spring Boot!","hostname":"a528fefd8f18","host":"172.18.0.3"}
    ```
    * Percobaan 3:
    ```json
    {"message":"Hello from Spring Boot!","hostname":"32cac5fa20b4","host":"172.18.0.4"}
    ```