---
sidebar_position: 3
title: 'Menghapus Docker Image'
---

Berikut adalah cara-cara menghapusnya docker image secara aman.

## 1️⃣ Syarat Utama Menghapus Image

Kita tidak bisa menghapus image jika masih ada kontainer (baik yang sedang jalan maupun yang sudah berhenti) yang menggunakan image tersebut.

* **Langkah**: Hapus atau hentikan kontainernya terlebih dahulu, baru hapus image-nya.

## 2️⃣ Perintah Dasar Hapus Image

Perintah utama untuk menghapus satu atau lebih image adalah docker image `rm` atau aliasnya docker `rmi`.

```
docker image rm [IMAGE_ID/NAMA_IMAGE]
```

**Contoh:**

* Menggunakan Nama: `docker image rm nginx:stable-bullseye`
* Menggunakan ID (Cukup 3-4 karakter awal): `docker rmi a1b2`

## 3️⃣ Menghapus Image Secara Paksa

Jika kita ingin menghapus image yang masih dikaitkan dengan kontainer yang sudah berhenti tanpa menghapus kontainernya (meskipun ini kurang disarankan), gunakan flag `-f` (force).

```
docker rmi -f alpine:latest
```

## 4️⃣ Menghapus Image Berdasarkan Kondisi

Seringkali kita punya banyak image tanpa nama yang muncul sebagai `<none>:<none>`. Ini disebut **Dangling Images**.

* Menghapus Dangling Images saja:

```
docker image prune
```

* Menghapus SEMUA image yang tidak sedang digunakan oleh kontainer apa pun:

```
docker image prune -a
```

:::warning
**Hati-hati**: Ini akan menghapus semua image yang tidak punya kontainer aktif.
:::

## 5️⃣ Menghapus Semua Image Sekaligus

Jika Anda ingin membersihkan seluruh daftar image di komputer Anda (total reset):

```
docker image rm $(docker image ls -q)
```

:::info
Perintah `$(docker image ls -q)` akan mengambil semua ID image dan memberikannya ke perintah `rm`.
:::

## 🥹 Tips Pengelolaan

* **Cek Ruang yang Terpakai**: Sebelum menghapus, lihat berapa banyak ruang yang dimakan oleh Docker:

```
docker system df
```

* **Gunakan ID yang Pendek**: Anda tidak perlu mengetik ID image yang panjang (misal: `sha256:a1b2c3d4...`). Cukup ketik 3 atau 4 karakter pertama selama ID tersebut unik di daftar Anda.

* **Hapus Setelah Build**: Jika Anda sering melakukan docker build, gunakan flag `--rm` agar image perantara (intermediate layers) yang gagal atau tidak terpakai otomatis dibersihkan.
