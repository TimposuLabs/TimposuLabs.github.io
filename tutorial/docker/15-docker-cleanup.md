---
sidebar_position: 16
title: 'Docker Cleanup'
---

Membersihkan Docker secara rutin sangat penting karena file **cache, image lama**, dan **container yang berhenti** dapat menghabiskan ruang penyimpanan (disk space) dengan cepat.

## 1️⃣ Docker System Prune

Ini adalah cara tercepat untuk menghapus semua data yang tidak terpakai (container yang berhenti, network yang tidak digunakan, dan image tanpa tag).

```bash
# Menghapus data yang tidak digunakan
docker system prune

# Menghapus semuanya termasuk image yang tidak digunakan sama sekali (lebih bersih)
docker system prune -a --volumes
```

## 2️⃣ Membersihkan Container

Container yang sudah di-stop tetap memakan ruang disk.
* **Hapus container tertentu**: `docker rm <container_id>`.
* **Hapus semua container yang berhenti**:

```bash
docker container prune
```

## 3️⃣ Membersihkan Images

Image seringkali menjadi penyebab utama disk penuh.
* **Hapus image tertentu**: `docker rmi <image_id>`.
* **Hapus image "Dangling" (image tanpa nama/tag)**:

```bash
docker image prune
```

* **Hapus semua image yang tidak sedang digunakan oleh container:**
```bash
docker image prune -a
```

## 4️⃣ Membersihkan Volumes

Volume menyimpan data persisten. Menghapus container **tidak otomatis** menghapus volumenya.

* **Hapus semua volume yang tidak digunakan:**

```bash
docker volume prune
```

## 5️⃣ Membersihkan Build Cache

Docker menyimpan cache saat proses `build` untuk mempercepat proses selanjutnya. Jika tidak lagi memodifikasi proyek tersebut, cache ini bisa dihapus.

```bash
docker builder prune
```

## 👍 Tips & Best Practices

* **Cek Penggunaan Disk**: Gunakan perintah `docker system df` untuk melihat berapa banyak ruang yang digunakan oleh masing-masing komponen Docker.
* **Otomatisasi**: Saat menjalankan container untuk pengujian, gunakan flag `--rm` agar container langsung terhapus saat dimatikan:
    ```bash
    docker run --rm my-image
    ```
* **Hati-hati**: Perintah `prune` bersifat permanen. Pastikan kita tidak menghapus volume yang berisi data database penting.
