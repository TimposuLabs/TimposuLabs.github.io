---
slug: unlock-install-armbian-stb-hg680p
title:  Install Armbian di STB HG680-P
authors: topekox
tags: [linux, ubuntu, debian, armbian, hg680p, stb, server, linux-server]
---

Ingin punya server Linux sendiri dengan modal di bawah 200 ribu rupiah? Menggunakan STB HG680-P adalah solusinya. Dalam panduan ini, saya akan membagikan cara termudah menginstal Armbian (berbasis Ubuntu/Debian) pada STB HG680-P agar bisa berjalan melalui MicroSD. Tanpa perlu PC spek tinggi, kita sudah bisa menjalankan server 24 jam yang hemat listrik. Mari kita mulai prosesnya!

<!--truncate-->

## 📱 STB HG680-P

![stb hg680-p](/img/general/stb-hg680-p.jpeg)

**STB HG680-P** adalah perangkat *Set Top Box* berbasis Android yang sangat populer di kalangan komunitas pengoprek (*oprekers*) di Indonesia. Perangkat ini aslinya merupakan perangkat standar yang digunakan oleh penyedia layanan TV kabel (seperti Ind\*Hom\* atau MyR\*p\*bl\*c) untuk memberikan akses siaran TV digital dan layanan streaming ke pelanggan. Untuk mendapatkan barang ini kita bisa mencarinya di Marketplace, dengan harganya sangat terjangkau (biasanya di bawah Rp200.000).

### 🤑 Kelebihan STB HG680-P

* **Harga Murah**: Di pasar barang bekas atau marketplace, harganya sangat terjangkau dibanding menggunakan Raspberry Pi.
* **Dukungan Komunitas Kuat**: Karena menggunakan chip Amlogic, banyak pengembang yang membuat *image* Linux khusus (Armbian, OpenWRT, CoreELEC) untuk perangkat ini.
* **Hemat Listrik**: Konsumsi dayanya sangat kecil (biasanya di bawah 10 Watt), sehingga cocok dinyalakan 24 jam sebagai server.

## 🤖 Armbian

**Armbian** adalah sistem operasi berbasis **Linux** yang dirancang khusus untuk perangkat dengan arsitektur prosesor **ARM** (seperti yang ada pada STB HG680-P, Raspberry Pi, dan berbagai *Single Board Computer* lainnya).

### 💪 Kegunaan STB HG680-P Setelah Diinstal Armbian

Setelah diinstal **Armbian**, **HG680-P** tidak lagi hanya berfungsi untuk nonton TV, tapi bisa berubah menjadi:

* **Pi-hole / AdGuard Home**: Untuk memblokir iklan di seluruh jaringan Wi-Fi rumah.
* **Home Assistant**: Otomasi rumah pintar (*smart home*).
* **Server (contoh Web Server / Database Server)**: Untuk belajar pemrograman atau menjalankan website pribadi.
* **NAS (Network Attached Storage)**: Media penyimpanan data yang bisa diakses dari HP atau Laptop di rumah.
* **Bot Telegram / Discord**: Menjalankan script bot otomatis 24 jam.

## ⌛ Persiapan

### 1️⃣ Persiapan Perangkat

* **STB HG680-P**: Pastikan perangkat sudah dalam kondisi rooted #️⃣, **jika belum diroot** ikuti langkah no 2️.
* **Media Penyimpanan**: MicroSD Card minimal 8GB (atau bisa juga mengguanakan Flashdisk berkualitas tinggi). Sediakan juga *Card Reader* untuk menghubungkan SD Card ke Laptop/PC.
* **Software Flashing**: [Rufus](https://rufus.ie/en/) atau [balenaEtcher](https://etcher.balena.io/).
* **Image Armbian**: Download image terbaru (misalnya basis Ubuntu Noble/25.11) dari repositori terpercaya seperti [Ophub GitHub](https://github.com/ophub) atau sumber lain yang terpercaya. 
* Kabel LAN untuk koneksi STB HG680-P ke modemn.

### 2️⃣ Unlocking STB HG680-P (Burning Firmware Unlock) 🔓

Jika STB HG680-P **belum dalam kondisi unlocked/rooted** (masih menggunakan firmware asli/stock), kita tidak bisa langsung melakukan booting dari MicroSD 🥹. Kita harus membuka proteksi bootloader (Unlocked 🔓) terlebih dahulu agar STB bisa membaca sistem operasi lain (Armbian).

1. **Siapkan Tools**:

    * PC/Laptop Windows dan monitor HDMI.
    * Kabel USB **Male to Male**.
    * **Firmware Unlock**: Cari firmware `.img` yang sudah "unlocked" untuk HG680-P (umumnya berbasis Android 6.0) di internet. Atau bisa [**Download di sini ⬇️**](https://www.mediafire.com/file/o25hynlk6bwt7jy/FW_HG680P_MIBOX3_NETFLIX_TV.zip/file).
    * Install Software **[Amlogic USB Burning Tool](https://androiddatahost.com/khfj4)** (Gunakan versi 2.1.6 atau yang lebih baru).

Jika digabung dengan nomor 1, file yang telah disiapkan sebagai berikut:

![stb hg680-p armbian](/img/general/stb-hg680p-tools.png)

2. **Proses Burning**

    * Buka USB Burning Tool, import file firmware `.img`.
    * Klik **Start**.
    * Dalam keadaan mati, hubungkan STB ke PC menggunakan kabel USB Male-to-Male (gunakan **port USB 2** yang dekat slot MicroSD). **Perhatian**: pada saat mencolokan kabel USB ke STB **harus besamaan** dengan menekan tombol Power On pada STB (cara ini agar STB bisa terdeteksi oleh USB Burning Tool).
    * Jika masih tidak terdeteksi, anda harus melakukan **Short Pin** (menghubungkan dua titik di motherboard STB dengan pinset saat kabel USB dicolokkan).
    * Tunggu hingga status "100% Burning Successful", lalu klik **Stop**.

![stb hg680-p armbian](/img/general/usb-burning-tools.png)

Sampai tahap ini STB HG680-P sudah dalam kondisi unlocked/rooted. Selanjutnya masuk ketahap install Armbian.

## 📲 Install Armbian di STB HG680-P

Menginstal Armbian pada STB HG680-P sebenarnya caranya mudah. Berikut adalah langkah-langkah step-by-step untuk instalasinya: 

### 1️⃣ Download Armbian

Untuk STB HG680-P, versi Armbian yang paling kompatibel dan direkomendasikan adalah versi komunitas yang dikelola oleh [Ophub](https://github.com/ophub).

Berikut adalah detail versinya:

**1. Rekomendasi Versi Stabil**

Pada saat artikel ini dibuat berikut versi stabil Armbian:

    * **Armbian (Noble)**: Berbasis Ubuntu 24.04 LTS yang sangat stabil untuk penggunaan jangka panjang.
    * **Armbian (Bookworm)**: Berbasis Debian 12, cocok jika Anda menginginkan sistem yang sangat ringan untuk server IOT atau Pi-hole.
    * **Kernel**: Gunakan image dengan Kernel **6.1.x** untuk kernel LTS yang lebih stabil atau yang lebih baru (seperti v6.12 pada awal 2026) untuk dukungan perangkat keras yang lebih baik.

**2. Sumber Download (Repository)**

Sangat disarankan mengambil *image* dari repositori [Ophub GitHub](https://github.com/ophub/amlogic-s9xxx-armbian) (amlogic-s9xxx-armbian) karena rutin diupdate dan memiliki fitur *autodetect* DTB yang lebih baik untuk keluarga Amlogic.

**3. Tips Memilih Image**

* **Server vs Desktop**: Untuk HG680-P, sangat disarankan menggunakan versi **Server (CLI)** agar performa tetap ringan, mengingat RAM perangkat ini terbatas (hanya 2GB).
* **Fitur WiFi**: Pastikan memilih build yang mencantumkan "WiFi On" atau "Support B860H/HG680P" jika Anda berencana menggunakan koneksi nirkabel tanpa adaptor tambahan.
* **Format File**: Cari file dengan nama yang mengandung `s905x` dan `arm64`, contoh formatnya: `Armbian_26.02.0_amlogic_s905x_bookworm_6.1.159_server_2026.01.01.img.gz`. 

Dengan menggunakan versi `25.05` ke atas, kita mendapatkan peningkatan stabilitas pada pembacaan media penyimpanan seperti SSD melalui port USB. 

:::info
Pada tutorial ini saya menggunakan Armbian `Armbian_26.02.0_amlogic_s905x_bookworm_6.1.159_server_2026.01.01.img.gz` yang di download pada link: https://github.com/ophub/amlogic-s9xxx-armbian/releases/tag/Armbian_bookworm_arm64_server_2026.01
:::

### 2️⃣ Flashing Image

Sekarang kita akan flashing image Armbian ke SDCard:

1. Colokan Micro SDCard ke PC/Laptop.
2. Extract `Armbian_26.02.0_amlogic_s905x_bookworm_6.1.159_server_2026.01.01.img.gz`, dari hasil extract akan menghasilkan file image `Armbian_26.02.0_amlogic_s905x_bookworm_6.1.159_server_2026.01.01.img`.
3. Buka **Rufus** di PC anda.
4. Pilih file image Armbian yang sudah extract (`.img`).
5. Pilih target drive (MicroSD).
6. Klik **Start** dan tunggu hingga proses selesai.

![Rufus](/img/general/rufus.png)

Jika sudah selesai eject Micro SD.

## 🚀 Booting Pertama Kali

1. Masukkan MicroSD ke slot STB HG680-P.
2. Hubungkan STB ke monitor (HDMI) dan mouse melaui port USB STB, dan hubungkan kabel LAN ke router untuk akses jarak jauh.
3. Nyalakan STB, biasanya booting pertama kali **tidak otomatis booting ke Linux Armbian**, melainkan booting ke Android STB.

![STB HG680-P](/img/general/stb1.png)

4. Pada menu Android STB, cari aplikasi **Terminal Emulator**, kemudian ketik perintah:

```
su
reboot update
```

![STB HG680-P](/img/general/stb2.jpeg)
![STB HG680-P](/img/general/stb3.jpeg)

5. STB akan restart dan mulai membaca sistem Armbian dari MicroSD. Jika masuk kedalam terminal login masukan **default username**: `root` dan **default password**: `1234`.
6. Selanjutnya tinggal konfigurasi system Armbian Linux. Beberapa konfigurasi yang bisa dilakukan:

    * **Ganti Password Root**: Selalu ganti password default saat pertama kali login.
    * **Cek IP Address**: Jalankan perintah `hostname -I` untuk tahu alamat IP server baru Anda agar bisa di-remote via SSH.

![Armbian Shell](/img/general/armbian-shell.png)

Instalasi Armbian Berhasil! STB kita sekarang memiliki fungsi penuh sebagai mini PC Linux. Langkah selanjutnya adalah eksplorasi lebih luas lagi. Terima kasih telah menyimak tutorial ini, dan selamat berkreasi dengan proyek *self-hosting* anda!.

:::tip
* **Akses Terminal**: Setelah berhasil masuk Armbian, gunakan aplikasi PuTTY atau Terminal Shell seperti PowerSheel di PC untuk remote via SSH agar lebih nyaman melakukan konfigurasi.
* **Pendingin**: HG680-P cenderung panas saat menjalankan Linux secara intensif. Pastikan sirkulasi udara baik atau tambahkan heatsink/fan kecil jika digunakan sebagai server 24 jam.
:::
