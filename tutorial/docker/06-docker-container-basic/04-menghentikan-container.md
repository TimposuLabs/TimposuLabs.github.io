---
sidebar_position: 4
title: 'Menghentikan Container'
---

Untuk menghentikan container:

```
docker container stop <container_id/container_name>
```

contoh:

```
docker container stop contohhttpd
```

atau:

```
docker container kill <container_id/container_name>
```

## ✍️ Perbedaan `kill` dan `stop`

* **`docker container stop`**: 
    * Sinyal yang dikirim adalah SIGTERM yang dimana container akan melakukan shutdown dan melakukan terminate semua prosesnya secara normal.
    * Jika dalam 10 detik container tersebut belum mati, maka sinyal yang akan dikirim adalah SIGKILL, yang akan memaksa container mati seketika itu juga.
* **`docker container kill`**
    * Sinyal yang dikirim langsung SIGKILL, yang artinya container akan dipaksa mati seketika itu juga.