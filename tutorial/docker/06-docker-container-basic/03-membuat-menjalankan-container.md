---
sidebar_position: 3
title: 'Membuat & Menjalankan Container'
---

## 1️⃣ Melihat Container yang running

```
docker container ls
```

## 2️⃣ Melihat Container yang running atau stopped

```
docker container ls
```

atau

```
docker ps
```

## 3️⃣ Membuat Container

```
docker container create --name <nama_container> <nama_image>:<tag>
```

Contoh:

```
docker container create --name contohhttpd httpd:latest
```

## 4️⃣ Menjalankan Container

```
docker container start contohhttpd
```

atau kita bisa membuat container sekaligus menjalankannya. Contoh menjalankan container `nginx:stable`:

```
docker container run -p 8080:80 nginx:stable
```

Contoh menjalankan container `nginx:stable` baru dengan beberapa properti `-d` (detach) untuk menjalankannya sebagai background (cek properti dengan perintah `--help`):

```
docker run -d -p 8081:80 --name=nginx2 nginx:stable
```

Menjalankan container sekaligus menghapusnya setelah selesai:

```
docker container run --rm <nama_image>:<tag>
```
