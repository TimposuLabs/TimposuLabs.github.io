---
sidebar_position: 1
title: 'Docker Container'
---

## 1️⃣ Apa itu Docker Container?

Docker Container adalah unit standar perangkat lunak yang membungkus kode beserta seluruh dependensinya sehingga aplikasi dapat berjalan dengan cepat dan andal dari satu environment ke environment lainnya. Container adalah instance dari Image. Kita bisa membuat lebih dari satu container dari image yang sama. Container tersebut saling terisolasi sehingga tidak akan bentrok aplikasinya.

![Image & Container](/img/docker/docker2.png)

## 2️⃣ Karakteristik Utama Container

* **Terisolasi**: Setiap kontainer berjalan di lingkungannya sendiri. Kontainer A tidak bisa melihat isi Kontainer B kecuali kita mengizinkannya melalui jaringan.
* **Ringan**: Kontainer tidak butuh OS utuh. Ia meminjam Kernel dari host Linux, sehingga bisa menyala dalam hitungan milidetik.
* **Ephemeral (Sementara)**: Kontainer bersifat sementara. Jika Anda menghapus kontainer, semua data di dalamnya akan hilang (kecuali Anda menggunakan Volumes).
* **Portabel**: "Build Once, Run Anywhere". Kontainer yang jalan di laptop anda akan jalan dengan cara yang sama persis Server Production di Cloud.

## 3️⃣ Perintah Dasar Mengelola Container 

| Perintah |	Fungsi |
| --- | --- |
| `docker run` |	Membuat dan menjalankan kontainer baru. |
| `docker ps` |	Melihat daftar kontainer yang sedang jalan. |
| `docker stop` |	Menghentikan kontainer yang sedang jalan. |
| `docker rm`	| Menghapus kontainer (harus distop dulu). |
| `docker logs` |	Menlihat log/catatan aplikasi di dalam kontainer. |
| `docker exec` |	Masuk ke dalam kontainer yang sedang aktif. |

## 4️⃣ Tips

* **Stateless**: Usahakan kontainer bersifat Stateless. Artinya, jangan simpan data penting di dalam kontainer. Simpanlah di Database atau Volume luar.
* **Limit Resources**: Biasakan membatasi penggunaan RAM saat menjalankan kontainer agar server tidak crash:

```
docker run --memory="512m" --cpus="0.5" nginx
```

* **Auto-Restart**: Di produksi, gunakan flag `--restart` agar kontainer menyala otomatis jika komputer host mati atau kontainer crash:

```
docker run --restart always nginx 
```