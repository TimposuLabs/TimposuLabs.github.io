---
sidebar_position: 10
title: 'Docker Network'
---

Docker memiliki solusi untuk menyediakan fitur networking antar container, bernama **Container Network Model** (CNM). CNM merupakan standar spesifikasi dan memerlukan implementasi salah satu implementasi tersebut adalah *libnetwork*. Selain itu Docker juga memiliki **Driver** untuk jenis topologi jaringan yang berbeda-beda.

![Docker Network](https://camo.githubusercontent.com/a00d930ced41040892e8786ce2ff40f0b118f04ca2bbe52462e6ec087baa0a2f/68747470733a2f2f7468656e6577737461636b2e696f2f77702d636f6e74656e742f75706c6f6164732f323031362f30392f43686172745f436f6e7461696e65722d4e6574776f726b2d4d6f64656c2d447269766572732e706e67)

CNM terdiri 3 block yaitu:

1. **Sandbox**: network yang terisolasi dalam container termasuk di dalamnya interface ethernet, port, dns config.
2. **Endpoint**: merupakan Virtual Ethernet Interface yang berfugsi membuat koneksi jaringan
3. **Network**: merupakan implementasi dari virtual switch yang mengelompokkan dan mengisolasi kumpulan endpoint yang saling berkomunikasi.

![Docker Network](https://camo.githubusercontent.com/09e7ae9738144ff7f1f5f64d460bbac0b52646532d59dba057ca37e005e655f4/68747470733a2f2f7777772e64636c6573736f6e732e636f6d2f75706c6f6164732f323031392f30392f446f636b65722d372e322e706e67)

Berikut gambaran besar dari Docker Network

![Docker Network](https://camo.githubusercontent.com/56b9ee310fa73af52adb6783f0dff87aa1f8ea089c26d6dfc99886822b87a497/68747470733a2f2f6b323161636164656d792e636f6d2f77702d636f6e74656e742f75706c6f6164732f323032302f30362f434e4e2d4d6f64656c2d312e706e67)

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

Network internal membuat kontainer bisa saling bicara, tapi komputer host tetap tidak bisa melihat aplikasi tersebut kecuali membuka port/pintunya.

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

* **Isolasi Database**: Jangan pernah membuka port database ke luar (contoh MySQL `-p 3306:3306`) di server production. Biarkan database hanya terhubung ke network internal, sehingga hanya aplikasi backend Anda yang bisa mengaksesnya.
* **Inspect Jaringan**: Selalu cek siapa saja yang "menguping" di jaringan kita:

```bash
docker network inspect app-network
```

## 8️⃣ Contoh Implementasi

Kita akan membuat 3 container dengan network yang sama bernama `backend-network` yang terhubung ke container Alpine, Nginx dan Busybox.

![Docker Network](/img/docker/docker4.png)

* **Membuat Container dan Networknya**

```bash
docker network create -d bridge backend-network
```

```bash
docker container run --rm -d --name=busybox --network=backend-network busybox:stable sleep infinity
```

```bash
docker container run --rm -d --name=alpine --network=backend-network alpine:3.23.2 sleep infinity
```

```bash
docker container run --rm -d --name=webserver --network=topekox-network -p 80:80 nginx:stable-bullseye
```

:::info
**`sleep infinity`** adalah perintah yang memaksa kontainer untuk menjalankan proses yang tidak pernah berakhir.

Pada image `alpine` dan `busybox`, ketika membuat kontainer, kotnainer tersebut segera berhenti karena tidak ada proses utama yang berjalan secara terus-menerus.
:::

* **Cek network `backend-network`**:

```bash
docker network inspect backend-network
```

```json
"Containers": {
    "0f52ae954072cc3b3a18d901cfbe4586b2f5df0e0991dcd12d5183c88e9d4a7d": {
        "Name": "busybox",
        "EndpointID": "bce6eaf90540a67ee8e44f082b85c33ade9a42232f2d1e849674605206305ff2",
        "MacAddress": "f6:2a:aa:4c:ed:17",
        "IPv4Address": "172.18.0.4/16",
        "IPv6Address": ""
    },
    "23cef7058bfebfc4a703b3cf18166ab0c411b1bcc0bc3820a537869b2c31e9c5": {
        "Name": "alpine",
        "EndpointID": "0974deca6b7fef746757b2079d249da924fd10b46585ebe870190c62e6d4081e",
        "MacAddress": "c2:88:6c:16:f9:b0",
        "IPv4Address": "172.18.0.3/16",
        "IPv6Address": ""
    },
    "321012e75e6d9d904795e014a9db6ae683eb964823d795ac802a983fd6f8fa4e": {
        "Name": "nginx",
        "EndpointID": "aac01b9bca4a7d24978477751e2f9c62d681ba51f38e476d95ed34c2850f7d41",
        "MacAddress": "d2:59:fe:5b:f2:ad",
        "IPv4Address": "172.18.0.2/16",
        "IPv6Address": ""
    }
}
```

* **Masuk ke dalam container**

Masuk ke dalam container untuk uji coba, gunakan `sh` untuk masuk ke kontainer:

```bash
docker exec -it busybox sh
```

Lakukan ping dengan IP address atau nama container:

```
/ # ping nginx
PING nginx (172.18.0.2): 56 data bytes
64 bytes from 172.18.0.2: seq=0 ttl=64 time=0.070 ms
64 bytes from 172.18.0.2: seq=1 ttl=64 time=0.065 ms
64 bytes from 172.18.0.2: seq=2 ttl=64 time=0.077 ms

/ # ping alpine
PING alpine (172.18.0.3): 56 data bytes
64 bytes from 172.18.0.3: seq=0 ttl=64 time=0.046 ms
64 bytes from 172.18.0.3: seq=1 ttl=64 time=0.063 ms
64 bytes from 172.18.0.3: seq=2 ttl=64 time=0.073 ms
```
