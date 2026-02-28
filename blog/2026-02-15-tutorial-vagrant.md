---
slug: tutorial-vagrant
title: Tutorial Vagrant
authors: topekox
tags: [vagrant, virtual machine]
---

![Vagrant](https://developer.hashicorp.com/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F2885%2F1679087784-devdot-vagrant_dm.png&w=1080&q=75&dpl=dpl_5fCoEp5gTPgcR1GKEAEP8bJHQtXJ)

## 1️⃣ Apa itu Vagrant?

Vagrant adalah tool baris perintah (CLI) untuk membangun dan mengelola lingkungan mesin virtual secara otomatis.

* **Dulu**: Kalau mau buat server Ubuntu di VirtualBox, kita harus download ISO, klik-klik menu, setting RAM manual, instal OS, baru bisa pakai.
* **Sekarang (Vagrant)**: Kamu cuma butuh satu file teks (*Vagrantfile*), ketik satu perintah, dan Server siap dalam hitungan menit.

<!-- truncate -->

## 2️⃣ Komponen Utama Vagrant

Sebelum praktik, kita wajib tahu istilah penting di Vagrant:

* **Provider**: Aplikasi yang menjalankan VM (Contoh: Oracle VirtualBox, VMware, atau Docker).
* **Box**: Sebutan untuk template atau file gambar OS yang sudah jadi (semacam ISO mini). Kita bisa cari ribuan Box di Vagrant Cloud.
* **Vagrantfile**: File konfigurasi (berbasis bahasa Ruby) yang menentukan spesifikasi VM (RAM, IP, Port, dll).

## 3️⃣ Persiapan

Pastikan kita sudah download dua tools ini:

* **Hypervisor**: Download [VirtualBox](https://www.virtualbox.org/wiki/Downloads) / [Vmware](https://www.vmware.com/) / Docker / Hyper-V / KVM (sebagai mesinnya).
* **Vagrant**: [Download Vagrant](https://developer.hashicorp.com/vagrant/install) (sebagai sopirnya).

## 4️⃣ Contoh: Membuat Server Ubuntu

Buka Terminal/PowerShell, lalu ikuti langkah ini:

* ### Langkah 1: Buat Folder lokasi Project

```bash
mkdir belajar-vagrant
cd belajar-vagrant
```

* ## Langkah 2: Download Box Ubuntu

Pada praktek ini, kita akan pakai Ubuntu 22.04 (Jammy Jellyfish).

```bash
vagrant init ubuntu/jammy64
```

Perintah ini akan membuat file bernama `Vagrantfile` di direktori anda. Di dalam file ini kita dapat melakukan konfigurasi Vagrant, contoh konfigurasi untuk membuat folder yang terhubung (sinkron) antara komputer asli (Host) dan mesin virtual (Guest), yang jika folder "data" di komputer host belum ada, Vagrant akan otomatis membuatnya saat kamu menjalankan perintah `vagrant up`.

```
config.vm.synced_folder "data", "/vagrant_data", create:true
```

:::tip
Gunakann repository lain seperti `bento/ubuntu-22.04` berbasis ubuntu 22.04	yang sudag dioptimasi, ringan, minim bug saat mounting folder.
:::

* ### Langkah 3: Menjalankan Mesin

Vagrant akan otomatis mengunduh image Ubuntu (jika belum ada), mengatur VirtualBox, dan menyalakan mesinnya.

```bash
vagrant up
```

* *Vagrant akan download OS (hanya sekali) dan menyalakannya.*

* ### Langkah 4: Masuk ke Server

Masuk ke dalam Ubuntu (SSH), kita tidak perlu username/password manual, cukup ketik:

```bash
vagrant ssh
```

## 5️⃣ Perintah Dasar Vagrant

| Perintah	| Fungsi |
| --- | --- |
| `vagrant up` |	Menyalakan VM (dan membuatnya jika belum ada). |
| `vagrant status` |	Cek apakah VM sedang jalan atau mati. |
| `vagrant halt` |	Mematikan VM (seperti Shut Down). |
| `vagrant suspend` |	Menidurkan VM (seperti Sleep/Hibernate). |
| `vagrant reload` |	Restart VM (wajib dilakukan jika kamu edit `Vagrantfile`). |
| `vagrant destroy` |	Menghapus seluruh VM (bersih, hemat disk!). |

## 6️⃣ Fitur: Shared Folder

Vagrant secara otomatis menghubungkan folder proyekmu di Windows ke folder `/vagrant` di dalam VM. Jadi, kamu bisa ngoding di VS Code (Windows) dan hasilnya langsung jalan di Ubuntu (VM) tanpa perlu copy-paste.

Mari kita langsung praktikkan fitur ini. Kita akan membuat skenario di mana kita menulis kode di Windows, tapi file tersebut dibaca dan dijalankan oleh Ubuntu.

### Langkah 1: Siapkan Struktur Folder

Di komputer aslimu (Host), buat folder proyek baru dan masuk ke dalamnya:

```bash
mkdir projek-web
cd projek-web
mkdir data  # Ini folder yang akan disinkronkan
```

### Langkah 2: Konfigurasi Vagrantfile

Buat/edit `Vagrantfile` di dalam folder `projek-web` tadi, lalu masukkan kode berikut:

```ruby
Vagrant.configure("2") do |config|
  # Kita gunakan Ubuntu
  config.vm.box = "ubuntu/jammy64"

  # IMPLEMENTASI SYNCED FOLDER
  # "data" = folder di Windows
  # "/var/www/html" = folder di dalam Ubuntu (tempat standar file web)
  config.vm.synced_folder "data", "/var/www/html", create: true

  # Agar kita bisa buka webnya dari browser Windows
  config.vm.network "forwarded_port", guest: 80, host: 8080

  # Install Web Server otomatis (Provisioning)
  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt-get install -y apache2
  SHELL
end
```

### Langkah 3: Jalankan Mesin

Ketik perintah:

```bash
vagrant up
```

Vagrant akan membuat mesin, menginstal Apache, dan menyambungkan folder data di Windows ke `/var/www/html` di Ubuntu.

### Langkah 4: Uji Coba

1. Buka Windows Explorer, masuk ke folder projek-web/data.
2. Buat file baru bernama `index.html`.
3. Isi dengan kode simpel: `<h1>Halo dari Windows, jalan di Ubuntu!</h1>`.
4. Sekarang buka browser di Windows (Chrome/Edge) dan ketik: `localhost:8080`.

**Hasilnya**: Kamu akan melihat tulisan tersebut muncul! Padahal file aslinya ada di Windows, tapi yang menyajikan filenya adalah server Apache yang ada di dalam Ubuntu.

:::tip
**Tips Penting untuk Shared Folder**:

* VirtualBox Guest Additions: Agar fitur ini lancar, pastikan plugin Guest Additions terinstal. Kamu bisa menginstalnya secara otomatis dengan perintah: `vagrant plugin install vagrant-vbguest`.
* Permissions: Jika folder di Ubuntu tidak bisa ditulisi, kamu bisa menambah perintah di Vagrantfile: `owner: "www-data"`, `group: "www-data"` agar server web punya izin akses.
* Real-time: Semua perubahan file yang kamu lakukan di VS Code (Windows) akan langsung terupdate di Ubuntu tanpa perlu restart apa pun.
:::

## 7️⃣ Contoh Implementasi

### Skenario 1: Setup Nginx Otomatis

Di bagian ini, kita menggunakan fitur **Provisioning**. Vagrant akan menjalankan perintah terminal secara otomatis tepat setelah mesin menyala.

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  # Skrip instalasi otomatis
  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt-get install -y nginx
    # Menyalakan Nginx saat boot
    sudo systemctl enable nginx
    sudo systemctl start nginx
  SHELL
end
```

**Cara Cek**: Setelah vagrant up, ketik vagrant ssh lalu jalankan systemctl status nginx. Kamu akan melihat Nginx sudah aktif tanpa perlu kamu instal manual.

### Skenario 2: Setting IP Address Statis (Private Network)

Secara default, VM hanya bisa diakses via port forwarding (misal l`ocalhost:8080`). Dengan Private Network, VM kamu akan punya IP sendiri seolah-olah ada perangkat fisik lain di jaringan rumahmu.

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  # Menentukan IP Statis (Gunakan range 192.168.56.x untuk VirtualBox)
  config.vm.network "private_network", ip: "192.168.56.10"
end
```

**Cara Cek**: Setelah `vagrant up`, buka browser di Windows/Host kamu, lalu ketik `http://192.168.56.10`. Jika Nginx sudah terinstal (skenario 1), halaman "Welcome to Nginx" akan langsung muncul. Dokumentasi Jaringan.

### Skenario 3: Integrasi dengan Docker

Ada dua cara: menginstal Docker di dalam VM Ubuntu, atau menggunakan Docker sebagai pengganti VirtualBox. 

* **Cara 1**: Di sini kita akan menginstal Docker di dalam Ubuntu agar kamu punya lingkungan kontainer yang terisolasi.

**`Vagrantfile`**:

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  config.vm.provision "shell", inline: <<-SHELL
    # Instalasi Docker Standar
    sudo apt-get update
    sudo apt-get install -y docker.io
    # Agar user 'vagrant' bisa jalankan docker tanpa 'sudo'
    sudo usermod -aG docker vagrant
  SHELL
end
```

**Cara Cek**: Masuk ke VM dengan `vagrant ssh,` lalu ketik `docker ps`. Kamu sudah bisa menjalankan `docker run hello-world` di sana.

* **Cara 2**: Pastikan Docker Desktop sudah terinstal dan berjalan di Windows/Host kamu. Kamu bisa mengunduhnya di Docker Official Site.

    * **`Vagrantfile`**:

```ruby
Vagrant.configure("2") do |config|
  # Kita beri tahu Vagrant untuk menggunakan Docker, bukan VirtualBox
  config.vm.provider "docker" do |d|
    # Menggunakan image Ubuntu resmi dari Docker Hub
    d.image = "ubuntu:jammy"
    
    # Menjaga container tetap hidup (agar tidak langsung mati setelah start)
    d.remains_running = true
    
    # Mengaktifkan fitur TTY agar kita bisa masuk lewat SSH/Terminal
    d.has_ssh = true
  end

  # Setting Port Forwarding (Browser Host:8080 -> Container:80)
  config.vm.network "forwarded_port", guest: 80, host: 8080

  # Instalasi Nginx otomatis di dalam Container
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y nginx
    service nginx start
  SHELL
end
```

Cara menjalankan:

```bash
vagrant up --provider=docker
```

*Vagrant akan mengunduh image Ubuntu dari Docker Hub dan menyalakannya dalam hitungan detik.*