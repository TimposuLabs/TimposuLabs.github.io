---
sidebar_position: 1
title: 'Docker Container Inspect'
---

## 🤔 Docker Container Inspect

Docker Container Inspect adalah perintah yang berfungsi untuk mengambil **informasi detail (metadata)** dari sebuah kontainer dalam format **JSON**. ika perintah `docker ps` hanya menampilkan informasi "permukaan" (seperti nama dan status), `inspect` memberikan detail hingga ke konfigurasi paling dalam yang tidak terlihat secara visual.

## 1️⃣ Sintaks Dasar

```bash
docker container inspect <nama/id_container>
```

*Contoh: `docker container inspect mysql-server`*

## 2️⃣ Bagian Penting dalam Output

Output dari perintah ini sangat panjang (ratusan baris). Berikut adalah bagian-bagian penting yang harus perhatikan:

* **`State`**: Menampilkan detail status kontainer. Jika kontainer mati, kita bisa melihat `ExitCode`, `Error`, dan waktu mulai/berhenti di sini.
* **`NetworkSettings.Networks`**: Berisi IPAddress. Sangat penting untuk komunikasi antar kontainer di jaringan bridge.
* **`Mounts`**: Menampilkan daftar volume atau *bind mounts*. Kita bisa melihat path asli di host (**Source**) dan path di kontainer (**Destination**).
* **`Config.Env`**: Daftar semua variabel environment/lingkungan yang sedang aktif di dalam kontainer.
* **`Config.Entrypoint & Config.Cmd`**: Memastikan perintah apa yang sebenarnya dijalankan saat kontainer menyala. 

## 3️⃣ Teknik Filtering dengan Flag `--format`

Dalam dunia nyata kita biasanya hanya membutuhkan informasi tertentu saja. Kita dapat melakukan filter terhadap informasi yang dibutuhkan dalam instruksi Inspect. Gunakan flag `--format` (sintaks Go Template) untuk mengambil data spesifik.

* **Mencari IP Address saja:**

```bash
docker container inspect --format='{{.NetworkSettings.IPAddress}}' <nama/id_container>
```

* **Melihat status kontainer secara spesifik:**

```bash
docker container inspect --format='{{.State.Status}}' mysql-server
```

* **Melihat lokasi folder volume di sistem Linux Host:**

```bash
docker container inspect --format='{{range .Mounts}}{{.Source}}{{end}}' mysql-server
```
