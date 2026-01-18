---
sidebar_position: 5
title: 'Docker Command Help'
---

Docker memiliki ribuan perintah. Tidak ada satu pun engineer (bahkan senior sekalipun) yang menghafal semuanya. Kuncinya bukan menghafal, melainkan tahu cara mencari bantuan melalui perintah **`--help`**.

## 1️⃣ Global Help

Jika lupa perintah apa saja yang tersedia di Docker, gunakan:

```
docker --help
```

* **Fungsi**: Menampilkan daftar kategori utama (Management Commands), perintah umum, dan opsi global.
* **Analogi**: Seperti daftar isi dalam sebuah buku.

## 2️⃣ Bantuan Objek Spesifik (Management Commands)

Docker mengelompokkan perintah berdasarkan objeknya (Container, Image, Network, Volume). Anda bisa melihat bantuan spesifik untuk setiap objek:

```
docker container --help   # Bantuan tentang manajemen kontainer
docker image --help       # Bantuan tentang manajemen image
docker network --help     # Bantuan tentang manajemen jaringan
docker volume --help      # Bantuan tentang manajemen penyimpanan
```

## 3️⃣ Bantuan Perintah Detail (Sub-Command Help)

Ini adalah bagian paling penting. Jika Anda tahu ingin menggunakan run, tapi lupa cara membatasi RAM atau cara mengatur port, tambahkan `--help` setelah perintah tersebut.

```
docker [objek] [perintah] --help
```

**Contoh Kasus:**

* Lupa cara mengatur Port di run?

```
docker container run --help
```

*Kita akan melihat penjelasan tentang `-p, --publish`.*

* Lupa cara menghapus semua image yang tidak terpakai?

```
docker image prune --help
```

* Lupa cara melihat IP address kontainer?

```
docker container inspect --help
```

## 4️⃣ Membaca Output Help

Saat kita menjalankan `--help`, Docker akan menampilkan struktur seperti ini:

* **Usage**: Cara penulisan perintah yang benar.
* **Aliases**: Nama pendek perintah (misal: `ls` adalah alias dari `list`).
* **Options**: Daftar flag (tanda `-` atau `--`) yang bisa digunakan beserta fungsinya.

## 5️⃣ Tips Menggunakan Grep

Jika output bantuan terlalu panjang dan kita hanya mencari kata kunci tertentu (misal: "port"), kita bisa menggabungkannya dengan perintah Linux `grep`:

```
docker container run --help | grep port
```
