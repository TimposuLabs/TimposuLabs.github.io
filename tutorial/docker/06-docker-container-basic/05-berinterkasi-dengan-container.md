---
sidebar_position: 5
title: 'Berinteraksi dengan Container'
---

Berinteraksi dengan kontainer yang sedang berjalan adalah keterampilan wajib untuk proses debugging dan pemeliharaan aplikasi.

## 1️⃣ Docker Container Log

Untuk melihat log pada container:

```
docker container logs <nama/id_container>
```

Melihat Log Realtime

```
docker container logs -f <nama/id_container>
```

## 2️⃣ Docker Container Attach

Fungsi Docker container attach hampir sama dengan Docker Container Log yaitu melampirkan input, output, dan error standar terminal ke kontainer yang sedang berjalan. Dengan begitu, kita bisa melihat output atau mengendalikan kontainer secara interaktif.

```
docker container attach <nama/id_container>
```

Dengan melakukan attach kita bisa langsung melihat log container secara realtime.

## 3️⃣ Docker Container Inspect

* Docker Container Inspect adalah perintah tingkat lanjut yang berfungsi untuk mengambil **informasi detail (metadata)** dari objek Docker (Container, Image, Volume, atau Network) dalam format **JSON**.

```
docker container inspect <nama/id_container>
```

* Docker Container Inspect Filter: Dalam dunia nyata kita biasanya hanya membutuhkan informasi tertentu saja. Kita dapat melakukan filter terhadap informasi yang dibutuhkan dalam instruksi Inspect.

    Contoh kasus dari contoh di atas, misalnya kita hanya membutuhkan Ip Address saja:

```
docker container inspect --format='{{.NetworkSettings.IPAddress}}' <nama/id_container>
```

## 4️⃣ Docker Container Exec

Docker Container Exec digunakan untuk menjalankan perintah pada **container yang sedang berjalan**.

```
docker container exec <nama/id_container> <command>
```

Contoh menjalankan perintah `ls` untuk melihat file dan folder dalam container `nginx`:

```
docker container exec nginx-web-server ls
```

Contoh lain menggunakan option `-i` `-t` (baca `--help`) masuk ke dalam perintah `bash` pada container:

```
docker container exec -it <nama/id_container> bash
```

* `-i` (*interactive*): Menjaga koneksi tetap terbuka.
* `-t` (*tty*): Memberikan terminal virtual agar tampilannya seperti terminal biasa.

:::tip
Gunakan `bash` jika `sh` tidak tersedia.
:::

## 5️⃣ Copy File 

Kita bisa mengirim file dari komputer host ke kontainer, atau sebaliknya, tanpa harus menggunakan jaringan atau FTP.

* Dari Host ke Container:

```
docker container cp index.html <nama_container>:/usr/share/nginx/html/
```

* Dari Kontainer ke Host:

```
docker container cp <nama_container>:/app/config.yml ./config_lokal.yml
```

## 6️⃣ Melihat Statistik Resource

Untuk mengetahui berapa banyak beban RAM dan CPU yang digunakan oleh kontainer, dapat menggunakan perintah:

```
docker container stats <nama_container>
```

## 7️⃣ Melihat Perubahan File System

Jika kita curiga aplikasi kita membuat file sampah atau mengubah konfigurasi secara diam-diam, gunakan perintah ini:

```
docker container diff <nama_container>
```

Keterangan:

* **A**: *Added* (file baru).
* **C**: *Changed* (file diubah).
* **D**: *Deleted* (file dihapus).
