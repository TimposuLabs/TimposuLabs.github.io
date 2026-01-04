---
slug: membuat-distro-linux-dari-0
title:  Membuat Distro Linux Minimalis dari 0
authors: topekox
tags: [linux, ubuntu, linuxfromscratch]
---

Kali ini kita akan membangun OS Linux sendiri dari 0 atau bahasa kerennya *from scratch* jadi teman-teman yang mau belajar ngoprek Linux bisa mengikuti tutorial ini step by step.

**Prasyarat:**

Pada praktek kali ini saya menggunakan:

* **Distro Linux Ubuntu 24 sebagai OS Host untuk Development**. Saya menyarankan menggunakan Virtualization saja baik itu Docker, Mesin Virtual (seperti Virtual Box / VMWare) atau WSL jika anda menggunakan Windows, agar jika terjadi error yang tidak diinginkan, tidak mempengaruhi OS utama anda.
* **Koneksi Internet**. Dibutuhkan untuk mendownload dependency.

<!--truncate-->

<img src="/img/general/linux.webp"/>

## 1️⃣ Install Dependency

```
apt install bzip2 git vim make gcc libncurses-dev flex bison bc cpio libelf-dev libssl-dev syslinux dosfstools
```

## 2️⃣ Clone Linux Repository

Clone Linux repository, disini saya tidak menclone seluruh riwayat git melainkan commit terakhir saja. 

```bash
git clone --depth 1 https://github.com/torvalds/linux.git
```

## 3️⃣ Konfigurasi Kernel

```bash
cd linux
make menuconfig
```

![linux](/img/general/linux1.png)

* Pilih *64-bit kernel* *-> exit*
* Compile, dengan membagi job menjadi 8, sesuaikan dengan core prosesor computer kita.

```bash
make -j 8
```

* Jika sukses pada akhir proses muncul pesan:

```
Kernel: arch/x86/boot/bzImage is ready
```

* Copy `bzImage`:

```bash
mkdir /boot-files
cp arch/x86/boot/bzImage /boot-files/
```

## 4️⃣ Install Busybox

Sampai tahap ini kita baru mempunyai kernel, tapi belum mempunyai tools/utility yang membranal menjadi OS yang utuh. Salah satu aplikasi yang bisa kita gunakan adalah **Busybox**. BusyBox adalah sebuah utility, ataulebih tepatnya adalah sebuah **koleksi dari berbagai utility** (alat bantu) sistem operasi Unix/Linux yang digabungkan ke dalam satu file tunggal.  BusyBox bukanlah sebuah sistem operasi yang lengkap secara mandiri, melainkan sebuah *aplikasi di ruang pengguna (userspace)*. 

Untuk bisa berfungsi, BusyBox harus dijalankan pada sistem yang sudah memiliki kernel (paling sering Linux, tetapi bisa juga Android atau FreeBSD). Tanpa kernel, BusyBox tidak bisa berinteraksi dengan perangkat keras komputer atau ponsel. 

**Pasangan Sempurna:** Dalam pembuatan sistem minimalis (seperti router atau sistem *embedded*), developer biasanya menggabungkan **Kernel Linux + BusyBox**. Kombinasi ini sudah cukup untuk membuat sebuah perangkat berfungsi dan bisa menerima perintah dari *user*.

* Berikut adalah poin penting mengapa BusyBox disebut sebagai utility:

    * **Multi-Utility Program**: BusyBox merupakan satu file biner yang bertindak seperti ratusan utility berbeda. Di dalamnya terdapat versi ringkas dari perintah-perintah umum seperti `ls`, `cp`, `mv`, `grep`, dan `mkdir`.
    * **Menyediakan Perintah Dasar**: Tanpa BusyBox, sistem yang sangat kecil (seperti router atau perangkat Android tertentu) mungkin tidak memiliki perintah dasar untuk mengelola file atau jaringan.
    * **Applets**: Setiap utility di dalam BusyBox disebut sebagai "applet". Applet ini dirancang untuk menggunakan kode yang sama secara bersama-sama sehingga ukurannya sangat efisien (sekitar 1–5 MB saja).
    * **Penggunaan yang Praktis**: BusyBox masih menjadi utility standar dalam infrastruktur modern seperti Docker containers dan distro Linux ringan seperti Alpine Linux untuk menjaga sistem tetap ramping. 

* Clone Busybox

```bash
git clone --depth 1 https://git.busybox.net/busybox
```

* Konfigurasi:

```bash
cd busybox
make menuconfig
```

![linux](/img/general/linux2.png)

* Select `Settings` -> Pada Build Options centang `Build static binary (no shared libs)` -> `Exit`. Cara untuk mengatur agar tidak tergantung pada library external.

:::info
Pada kernel Linux modern, dukungan untuk CBQ (*Class Based Queueing*) telah dihapus dari header sistem, sedangkan BusyBox versi lama masih mencoba mengompilasi fitur tersebut melalui utilitas `tc`

Untuk mengatasi itu:
* Navigasi ke: `Networking Utilities` ---> Cari item `tc` (utilitas *trafic control*).
* Hapus tanda centang (tekan `N`) untuk menonaktifkan fitur tersebut
:::

* Compile

```bash
make -j 8
```

* `initramfs` adalah tempat kernel akan me-load file system setelah booting, jadi kita akan memasukan / put Busybox kedalam direkori `/boot/initrams`

```bash
mkdir /boot-files/initramfs
make CONFIG_PREFIX=/boot-files/initramfs install
```

## 5️⃣ Konfigurasi Boot

* Pindah ke direktori `boot` initramfs:

```bash
cd /boot-files/initramfs/
```

* Terdapat beberapa direktori:

```bash
ls

bin  init  sbin  usr
```

* Kita akan memanggil shell ketika kernel memulai `initramfs`, kernel akan mencari `init` file, jadi disini saya akan membuat `init` file yang akan memanggil `sheel`. Fun fact kita akan menggunakan `shell` untuk memanggil `shell`:

```bash
vim init
```

* Isi file dengan kode:

```bash
#!/bin/sh

/bin/sh
```

* Berikan permission:

```bash
chmod +x init
```

* File `linuxrc` adalah skrip inisialisasi awal yang menjembatani antara pemuatan Kernel dan masuknya kita ke dalam sistem operasi lengkap. Di sistem modern, fungsinya telah diambil alih oleh file `/init` di dalam `initramfs`. Disini kita akan menghapus `linuxrc`:

```bash
rm linuxrc
```

* Kita akan membuat archive `.cpio` untuk mengemas semua yang dibutuhkan `initramfs` yang didukung kernel. Kita akan menggunakan perintah `find` lalu mencompress-nya dengan nama `init.cpio`:

```bash
find . | cpio -o -H newc > ../init.cpio
```
Perintah tersebut di atas digunakan untuk **mengemas (archive) seluruh isi direktori initramfs menjadi satu file binary** agar bisa dibaca oleh kernel Linux saat proses booting.

Berikut adalah penjelasan detail per komponennya:

1. **`find`**: Perintah ini mencari dan menampilkan daftar semua file dan folder di dalam direktori saat ini secara rekursif (termasuk semua sub-folder di dalamnya). Titik `.` menandakan direktori tempat Anda berada sekarang (yang berisi BusyBox dan struktur folder `bin`, `dev`, `proc`, dll).
2. **`|` (Pipe)**: Simbol garis tegak ini berfungsi untuk mengirimkan daftar file yang ditemukan oleh `find` tadi sebagai input ke perintah berikutnya (`cpio`).
3. **`cpio -o -H newc`** Ini adalah perintah inti untuk membuat arsip:
    * `-o` (copy-out): Instruksi untuk membuat file arsip dari daftar file yang diterima.
    * `-H newc`: Ini adalah bagian yang paling krusial. Argumen ini menentukan format arsip yang digunakan. Format `newc` adalah standar yang dipahami oleh kernel Linux untuk `initramfs`. Jika Anda tidak menggunakan format ini, kernel tidak akan bisa mengekstrak isinya saat booting.
4.  **`> ../init.cpio`**: Simbol `>` mengarahkan output (hasil pengemasan) ke sebuah file baru. Dalam kasus ini, file tersebut dinamai `init.cpio` dan diletakkan satu folder di atas direktori saat ini (`../`).

File `init.cpio` inilah yang nantinya Anda panggil di konfigurasi bootloader (seperti Syslinux atau GRUB) sebagai **initrd** agar sistem operasi bisa berjalan.

:::tip
Seringkali setelah menjadi `.cpio`, file tersebut dikompres lagi agar ukurannya lebih kecil menggunakan perintah `gzip`, misalnya:
`find . | cpio -o -H newc | gzip > ../init.cpio.gz`
:::

## 6️⃣ Membuat Boot Loader

Kita akan melakukan konfigurasi bootloader dengan `syslinux`:

* Pindah ke direktori boot

```bash
cd /boot-files
```

* Install syslinux:

```bash
apt install syslinux
```

* Membuat file boot:

```bash
dd if=/dev/zero of=boot bs=1M count=50
```

Perintah tersebut digunakan untuk membuat sebuah file kosong sebesar 50 Megabyte (MB) yang nantinya akan digunakan sebagai virtual disk atau citra (*image*) untuk bootloader.

* Berikut adalah penjelasan detail per bagian dari perintah tersebut:

    * **`dd`**: Merupakan singkatan dari **Data Duplicator**. Ini adalah line tools perintah untuk menyalin dan mengonversi data pada level byte.
    * **`if=/dev/zero`**: (`if` = Input File). Sumber datanya berasal dari `/dev/zero`, sebuah file perangkat khusus di Linux yang menghasilkan aliran data bernilai nol (kosong) terus-menerus.
    * **`of=boot`**: (`of` = Output File). Nama file yang akan dibuat adalah "**boot**". File inilah yang akan menjadi wadah sistem atau initramfs kita nanti.
    * **`bs=1M`**: (`bs` = Block Size). Menentukan ukuran setiap blok data sebesar 1 Megabyte.
    * **`count=50`**: Ini menentukan berapa kali blok tersebut ditulis.
    * Jika `bs=1M` dan `count=50`, maka total ukuran file adalah **50 MB**.

**Mengapa ini dilakukan saat membuat Bootloader/Initramfs?**

* Dalam konteks penggunaan **Syslinux**, langkah-langkah yang biasanya kita lakukan setelah perintah di atas adalah:

    * **Memformat file tersebut**: Memberikan sistem berkas (misal FAT32) ke file boot tersebut menggunakan perintah `mkfs.vfat`.
    * **Menginstal Syslinux**: Memasukkan kode bootloader ke dalam file tersebut agar bisa "booting".
    * **Mengisi file**: Memasukkan kernel Linux dan file **BusyBox (initramfs)** yang sudah kita buat sebelumnya ke dalam file image ini.

* Jika kita melihat isi direktori, maka akan ada file image `boot` yang baru dibuat.

```
ls

boot  bzImage  init.cpio  initramfs
```

* Sejauh ini file tersebut masih kosong, kita akan memasukan file system ke dalamnya, disini kita akan menggunakan filesystem **FAT**, karena filesystem tersebut disupport syslinux. Untuk itu kita akan menginstall `dosfstools`:

```
apt install dosfstools
```

* Membuat file system (format) **FAT** pada file atau partisi bernama "**boot**".

```
mkfs -t fat boot
```

* Menginstal **bootloader Syslinux** ke dalam file atau partisi bernama "**boot**" yang sebelumnya sudah kita format

```
syslinux boot
```

* Sampai tahap ini file `boot` sudah siap untuk di boot, jadi ini akan langsung melakukan boot terhadap syslinux. Tapi kita masih perlu menyalin Kernel dan Initramfs ke dalam images `boot`. Untuk melakukan copy file yang dibutuhkan ke dalam images `boot` caranya sangat mudah:
   
1. Membuat direktori temporary untuk melakukan `mount`. Contoh direktori dengan nama `m`.
    
    ```
    mkdir m
    ```
2. Mount `boot` ke dalam direktori tersebut:

    ```
    mount boot m
    ```
3. Copy file yang dibutuhkan ke dalam direktori tersebut:
    
    ```
    cp bzImage init.cpio m
    ```
4. Unmount:
    
    ```
    umount m
    ```

## 7️⃣ Testing OS

Untuk melakukan testing kita bisa menggunakan `qemu` sebagai **virtual manchine**. Sebelum instalasi, pastikan prosesor anda mendukung virtualisasi (VT-x atau AMD-V). Jalankan perintah:

```
egrep -c '(vmx|svm)' /proc/cpuinfo
```

Jika hasilnya **lebih dari 0**, berarti sistem kita mendukung virtualisasi.

* Install Qemu

```
sudo apt update
sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager virtinst -y
```

Verifikasi Instalasi: Pastikan services `libvirtd` berjalan dengan benar: 

```
systemctl status libvirtd
```

:::info
Jika mesin virtual dijalankan tanpa akses root setiap saat, masukkan user ke grup `libvirt` dan `kvm`. 

```
sudo adduser $USER libvirt
sudo adduser $USER kvm
```
:::

* Menjalankan OS kita dengan Qemu:

```
qemu-system-x86_64 boot
```

* Masukan perintah di bawah ini pada bagian `boot:` untuk masuk ke booting OS:

```
/bzImage -initrd=/init.cpio
```

![linux](/img/general/linux3.png)

![linux](/img/general/linux4.png)

**Selamat** Distro Linux Sederhana anda sudah berjalan, tentunya ini hanya sebagai media untuk belajar (*educational purpose*) atau sekedar hobi saja bukan untuk *production*. Dan pasti masih banyak yang perlu diperbaiki, teman-teman bisa oprek lebih luas lagi untuk pengembangannya.

## 👩‍💻 Referensi

* https://www.youtube.com/watch?v=QlzoegSuIzg
