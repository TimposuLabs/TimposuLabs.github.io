---
sidebar_position: 3
title: 'Docker Self-Healing'
---

## 🤔 Apa itu Self-Healing?

**Self-healing** adalah kemampuan sistem untuk mendeteksi kegagalan (aplikasi mati, error, atau server restart) dan melakukan tindakan perbaikan secara otomatis (menjalankan ulang kontainer) tanpa menunggu perintah dari user.

Di Docker, kita menerapkan ini menggunakan dua fitur utama: **Restart Policies** dan **Healthchecks**.

## 1️⃣ Restart Policies

Ini adalah instruksi yang memberi tahu Docker Engine apa yang harus dilakukan jika sebuah kontainer berhenti (*Exit*).

### A. Jenis-Jenis Restart Policy:

| Flag | Deskripsi |
| --- | --- |
| **`no` (Default)** | Docker tidak akan menjalankan ulang kontainer jika mati (default). |
| **`on-failure[:max-retries]`** | Docker akan restart kontainer **hanya jika** ia mati karena error (Exit Code bukan 0). Kita bisa membatasi berapa kali percobaan (misal: 5 kali).
| **`always`** | Docker akan selalu menjalankan ulang kontainer tidak peduli apa penyebab matinya. Jika Docker Engine/Laptop di-restart, kontainer ini akan langsung menyala otomatis saat startup. |
| **`unless-stopped`** | Mirip dengan `always`, namun jika kita menghentikan kontainer secara manual (`docker stop`), Docker tidak akan menyalakannya kembali saat server restart. |

:::info
Restart Policy hanya berpengaruh jika container berhasil berjalan setidaknya 10 detik.
Jika container mati secara manual, maka restart policy akan diabaikan sampai docker daemon mengalami restart atau container secara manual direstart.
:::

### B. Contoh Penggunaan Imperatif

* Contoh membuat docker container dengan restart policy `always`:

```bash
docker run -d --name web-tahan-banting --restart always nginx
```

* Cek status di tab terminal baru:

```bash
$ docker container ps

 CREATED          STATUS          PORTS     NAMES
13 seconds ago   Up 13 seconds   80/tcp    nginx
```

Container sudah berjalan lebih dari 10 detik yaitu 13 detik.

* Kemudian matikan container dengan menekan "Ctrl + C", kemudian kita cek lagi status containernya:

```bash
$ docker container ps

 CREATED          STATUS         PORTS     NAMES
28 seconds ago   Up 3 seconds   80/tcp    nginx
```

Maka container akan running otomatis dan sudah berjalan selama 3 detik.

Untuk membuktikan kita dapat melihat lognya:

```bash
$ docker container logs nginx 

...
2025/03/30 05:50:47 [notice] 1#1: worker process 30 exited with code 0
2025/03/30 05:50:47 [notice] 1#1: exit
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
...
```

Container sempat mengalami exit status 0.

Jika kita melakukan stop container secara manual, kemudian kita melakukan restart daemon / service docker maka container akan berjalan kembali setelah docker service berjalan.

## 2️⃣ Healthcheck (Pengecekan Kesehatan)

Restart Policy hanya tahu jika proses aplikasi mati. Namun, terkadang aplikasi masih "hidup" (kontainer statusnya Running) tapi "hang" atau tidak bisa merespon (misal: *Java Deadlock*). Di sinilah **Healthcheck** berperan.

Healthcheck memungkinkan Docker mengintip ke dalam kontainer untuk memastikan aplikasi benar-benar berfungsi.

### Cara Kerja Healthcheck:

1. **Starting**: Kontainer baru menyala.
2. **Healthy**: Pengecekan berhasil (aplikasi merespon).
3. **Unhealthy**: Pengecekan gagal berturut-turut. Docker akan menandai kontainer ini sebagai rusak.

### Implementasi dalam Dockerfile 

Kita bisa mendefinisikan cara pengecekan langsung di dalam Dockerfile:

```dockerfile
FROM eclipse-temurin:21-jre-alpine
COPY target/app.jar app.jar

# Setiap 30 detik, cek apakah port 8080 merespon. 
# Jika gagal 3 kali, tandai sebagai Unhealthy.
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]
```

:::tip
Gunakan `docker ps`, kita akan melihat status tambahannya:

`Up 5 minutes (healthy) atau Up 5 minutes (unhealthy)`
:::