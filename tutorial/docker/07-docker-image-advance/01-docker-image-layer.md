---
sidebar_position: 1
title: 'Docker Image Layer'
---

Docker Image dibangun dari beberapa layer yang masing-masing layer tersebut bersifat read only. Masing-masing layer menumpuk satu sama lain, yang kemudian menjadi satu entitas Image. Dengan konsep layering memungkinkan docker meng-caching (cacheable) layer tersebut yang nantinya dapat digunakan kembali (reusable) pada image yang berbeda. Hal ini akan mempercepat proses build dan menghemat penyimpanan pada sistem komputer kita.

![Docker Image Layer](https://camo.githubusercontent.com/4456216228dd413ad92492ae42d54e1e54b9868380011f3593c1fb0748496332/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a313430302f302a486f78415a545a3262324337414d2d2d)

## 1️⃣ Konsep "Stack of Layers"

Bayangkan sebuah Image sebagai sebuah kue lapis:

* Setiap instruksi di Dockerfile (seperti `FROM`, `RUN`, `COPY`) menambah satu lapisan pada kue tersebut.
* Lapisan paling bawah adalah **Base Image** (misal: Alpine atau Ubuntu).
* Setiap lapisan bersifat **Read-Only** (Hanya-Baca) dan tidak bisa diubah setelah dibuat.

## 2️⃣ Mengapa Harus Berlapis? (Efisiensi)

Ada dua keuntungan besar dari sistem layering ini:

### A. Reusability (Penggunaan Kembali)

Jika kita memiliki 5 aplikasi berbeda yang semuanya menggunakan `FROM alpine:3.21`, Docker hanya akan menyimpan **satu salinan** layer Alpine tersebut di harddisk kita. Kelima image tersebut akan berbagi layer yang sama.

### B. Layer Caching (Proses Build Cepat)

Saat kita mengubah kode aplikasi dan melakukan build ulang:

* Docker akan memeriksa setiap instruksi Dockerfile dari atas ke bawah.
* Jika instruksi dan file yang disalin tidak berubah, Docker akan mengambil hasil dari **Cache** (tanpa memproses ulang).
* Proses build hanya akan benar-benar "bekerja" mulai dari baris yang kita ubah ke bawah.

## 3️⃣ Jenis-Jenis Layer

* **Image Layers (Read-Only)**: Semua lapisan/layer yang dihasilkan saat proses docker build. Layer ini bersifat permanen di dalam image.
* **Container Layer (Read-Write)**: Saat kita menjalankan kontainer (`docker run`), Docker menambahkan satu layer tipis di paling atas yang bisa ditulisi.
    * Semua perubahan yang Anda lakukan saat kontainer berjalan (menambah file, mengedit teks) disimpan di sini.
    * **Penting**: Saat kontainer dihapus, lapisan Read-Write ini ikut hilang, itulah sebabnya kita butuh **Volumes** untuk data permanen.


## 4️⃣ Contoh Layering

### Contoh saat melakukan pull image

```
docker image pull nginx:latest

latest: Pulling from library/nginx
6e909acdb790: Already exists 
5eaa34f5b9c2: Pull complete 
417c4bccf534: Pull complete 
e7e0ca015e55: Pull complete 
373fe654e984: Pull complete 
97f5c0f51d43: Pull complete 
c22eb46e871a: Pull complete 
Digest: sha256:124b44bfc9ccd1f3cedf4b592d4d1e8bddb78b51ec2ed5056c52d3692baebc19
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest
```

Kalau kita perhatikan docker mendownload beberapa layer kemudian membuat image.

### Contoh pada Dockerfile

```
FROM alpine:3.21                    # Layer 1: OS Dasar (~5MB)
RUN apk add --no-cache python3      # Layer 2: Instalasi Python (+~40MB)
COPY app.py /app/                   # Layer 3: Kode Aplikasi (Hanya beberapa KB)
CMD ["python3", "/app/app.py"]      # Layer 4: Metadata perintah jalan
```

## 5️⃣ Melihat Layer dalam Image dengan Docker History

Kita bisa mengintip layer-layer yang membentuk sebuah image menggunakan perintah:

```
docker image history <nama_image>
```

Kita akan melihat daftar instruksi, ukuran setiap layer, dan ID uniknya.

## 6️⃣ Docker Image Inspect

Docker Image Inspect digunakan untuk mengambil informasi sangat detail dari sebuah image dalam format **JSON**. Jika `docker image ls` hanya menampilkan nama dan ukuran, `inspect` menampilkan konfigurasi sistem, variabel lingkungan, hingga daftar layer yang membentuk image tersebut.

Kita bisa menggunakan Docker Image Inspect untuk membedah image (terutama image buatan orang lain) guna mengetahui:

* **Env Variables**: Apa saja variabel lingkungan (`ENV`) yang dibutuhkan aplikasi.
* **Exposed Ports**: Port berapa yang harus dibuka agar aplikasi bisa diakses.
* **Layers**: Bagaimana struktur lapisan image tersebut dibuat.
* **Architecture**: Apakah image ini untuk chip Intel (x86) atau Apple/ARM.
* **Entrypoint/CMD**: Perintah apa yang akan otomatis dijalankan saat kontainer menyala.

### Cara Penggunaan

* Sintaks Dasar:

```
docker image inspect <nama/id_image>
```

* Contoh:

```
docker image inspect nginx:stable-bullseye
```

### Membaca Informasi Spesifik (Filtering)

Karena output-nya sangat panjang, Anda bisa menggunakan flag `--format` untuk mengambil data tertentu saja:

* Melihat Perintah Default (`CMD`):

```
docker image inspect --format='{{.Config.Cmd}}' nginx
```

* Melihat Variabel Lingkungan (`ENV`):

```
docker image inspect --format='{{.Config.Env}}' mysql
```

* Melihat Ukuran Image secara Detail:

```
docker image inspect --format='{{.Size}}' alpine
```

## 7️⃣ Tips Optimasi Layer

* **Gabungkan Perintah `RUN`**: Setiap perintah `RUN` membuat layer. Gunakan `&&` untuk menggabungkan banyak perintah agar jumlah layer lebih sedikit dan ukuran image lebih ramping.
    * **Buruk ❌**:
        ```
        RUN apk update
        RUN apk add curl
        ```

    * **Baik ✅**:
        ```
        RUN apk update && apk add curl
        ```
* **Letakkan yang Jarang Berubah di Atas**: Selalu letakkan `FROM` dan instalasi library/dependensi di atas. Letakkan `COPY . .` (kode sumber) di bagian bawah karena kode paling sering berubah dan akan membatalkan cache untuk baris-baris di bawahnya.
