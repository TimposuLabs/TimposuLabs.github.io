---
sidebar_position: 3
title: 'Environment Setup'
---

## 🥊 Docker Engine vs Docker Desktop

### 🐳 Docker Engine

**Docker Engine** adalah jantung dari Docker atau mesin inti dari Docker. Docker Engine berbasis aplikasi client-server yang berjalan langsung di atas sistem operasi Linux.

* **Komponen Utama**:
    * **Daemon (`dockerd`)**: Proses *background* yang mengelola image, container, network, dan volume.
    * **REST API**: Antarmuka/Interface yang memungkinkan program lain berbicara dengan daemon.
    * **CLI (docker)**: Baris perintah yang kita ketik di terminal untuk memberi instruksi.

* **Cara Kerja**: Docker Engine berkomunikasi langsung dengan **Kernel Linux** menggunakan fitur seperti *Namespaces* dan *Control Groups (cgroups)*.
* **Penggunaan**: Biasanya diinstal di server produksi (Ubuntu Server, CentOS, dll) atau komputer pengembangan/development yang menggunakan Linux asli.

### 🐋 Docker Desktop (Paket Lengkap)

**Docker Desktop** adalah aplikasi antarmuka grafis (GUI) yang dirancang untuk pengguna **Windows** dan **macOS** agar bisa menjalankan Docker dengan mudah.

* **Mengapa Butuh Docker Desktop?** Karena Docker Engine membutuhkan Kernel Linux agar bisa berjalan. Windows dan macOS tidak memiliki Kernel Linux asli.
* **Solusi**: Docker Desktop secara otomatis membuat sebuah **Virtual Machine (VM) Linux ringan** di balik layar menggunakan teknologi seperti Hyper-V (Windows) atau Virtualization Framework (macOS).
* **Isi di dalamnya**:
    * Docker Engine.
    * Docker CLI.
    * Docker Compose (untuk mengelola banyak kontainer).
    * Kubernetes lokal (bisa diaktifkan dengan satu klik).
    * Dashboard GUI untuk melihat kontainer tanpa terminal.

## 📆 Perbandingan Utama

| Fitur |	Docker Engine	| Docker Desktop |
| --- | --- | --- |
| **Sistem Operasi** |	Linux (Native) |	Windows & macOS |
| **Instalasi**	| Lewat Terminal / Package Manager	| Lewat Installer (.exe / .dmg) |
| **Virtualisasi** |	Tidak ada (Berbagi Kernel Host) |	Ya (Menggunakan VM Linux ringan) |
| **User Interface** |	Hanya Command Line (CLI)	| CLI + Dashboard Grafis (GUI) |
| **Resource** |	Sangat ringan |	Memakan RAM lebih banyak (karena ada VM) |
| **Tujuan** |	Lingkungan Development / Server / Produksi	| Lingkungan Pengembangan (Development) |

## 🤔 Mana yang Harus Digunakan?

* **Gunakan Docker Desktop jika**: bekerja di laptop Windows atau Mac dan ingin kemudahan proses instalasi serta fitur tambahan seperti integrasi mudah dengan VS Code.
* **Gunakan Docker Engine jika**: sedang men-setup server di Cloud (seperti AWS, Google Cloud, atau DigitalOcean) atau jika Anda menggunakan distro Linux seperti Ubuntu/Fedora/Debian dll (jika menggunakan Windows dapat mengistall WSL terlebih dahulu).

---

## 🖥️ Install Docker Desktop

Untuk instalasi Docker Desktop di OS Windows, macOS dan Linux, dapat merujuk ke link **https://docs.docker.com/get-started/get-docker/**.

:::warning
**Penggunaan komersial Docker Desktop** di perusahaan besar (lebih dari 250 karyawan ATAU lebih dari $10 juta USD dalam pendapatan tahunan) memerlukan langganan berbayar.
:::

## 🔥 Install Docker Engine

Pada seri tutorial ini, kami menggunakan Docker Engine dibanding Docker Desktop karena alasan **lisensi, performa, kontrol, dan efisiensi**. Sebagai software engineer yang menyukai detail sistem, anda akan melihat bahwa Docker Engine menawarkan keunggulan teknis yang signifikan. Selain itu Docker Engine bersifat ***open-source*** yang menggunakan Lisensi Apache 2.0, yang dapat diperggunakan secara gratis untuk siapa saja, termasuk individu, hingga perusahaan besar berskala internasional.

* **Install Docker Engine di Linux**: Untuk melakukan instalasi Docker Engine di Linux dapat merujuk ke [**Dokumentasi Resmi Docker**](https://docs.docker.com/engine/install/).
* **Install Docker Engine di Virtual Machine**: Cara ini mungkin agak sedikit berat karena kita perlu menginstall Virtual Machine seperti Virtual Box atau VMWare terlebih dahulu kemudian menginstall Linux dan menginstall Docker Engine di atasnya.
* **Install Docker Engine di Windows dengan WSL**: Untuk menginstall Docker Engine di Windows kita perlu menginstall Windows Subsystem Linux (WSL) terlebih dahulu kemudian menjalankan Docker Engine di atasnya, cara ini lebih ringan dibanding menggunakan Virtual Machine.
* **Install Docker Engine di macOS**: Untuk menginstall Docker Engine di macOS kita bisa menggunakan alternatif Docker Desktop di macOS seperti OrbStack, Colima, Rancher, Podman dll.

### 🐧 Cara Install Docker Engine pada Ubuntu

* Sebelum menginstal Docker Engine untuk pertama kalinya pada mesin host baru, kita perlu menyiapkan repositori `apt` Docker. Setelah itu, kita dapat menginstal dan memperbarui Docker dari repositori tersebut.

```bash
# Add Docker's official GPG key:
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt update
```

* Install Docker Package:

```bash
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

:::info
Service Docker dimulai secara otomatis setelah instalasi. Untuk memverifikasi bahwa Docker sedang berjalan, gunakan:

```bash
sudo systemctl status docker
```

Beberapa sistem mungkin harus dijalankan secara manual:

```bash
sudo systemctl start docker
```
:::

* Untuk melakukan verifikasi bahwa Docker berhasil diinstall dengan baik, kita dapat menjalankan image `hello-world`:

```bash
sudo docker run hello-world
```

Perintah ini melakukan pull image untuk uji coba dan menjalankannya dalam container. Ketika container berjalan, akan mencetak pesan konfirmasi dan keluar.

* Cek versi docker:

```bash
sudo docker version
```

:::tip
Agar user biasa dapat menjalankan perintah Docker tanpa perlu mengetik `sudo` setiap menjalankan perintah Docker:

```
sudo usermod -aG docker $USER
```
:::

### 🪟 Install Docker Engine pada Windows

Seperti sudah dibahas sebelumnya, untuk menginstall Docker Engine di Windows kita perlu menginstall Windows Subsystem Linux (WSL) terlebih dahulu kemudian menjalankan Docker Engine di atasnya. Untuk cara instalasinya bisa melihat video di bawah ini:

<iframe width="560" height="315" src="https://www.youtube.com/embed/eT2qxoPfMBA?si=nqCe2GgyaFY9qgwf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### 🍎 Install Docker Engine di macOS

Menginstall Docker Engine di macOS tanpa Docker Desktop paling efisien menggunakan **Colima**, **OrbStack** atau **Podman** melalui **Homebrew** (pada tutorial ini kita akan menggunakan Colima). Colima menyediakan lingkungan/environment runtime Docker yang ringan di macOS dengan memanfaatkan mesin virtual (VM) Linux minimalis berbasis CLI, sehingga lebih efisien dan mudah digunakan sebagai alternatif Docker Desktop.

Sebelum mengikuti langkah-langkah di bawah ini pastikan sudah mengistall Homebrew di macOS kalian.

**1.** **Instal Docker CLI dan Colima**

```bash
# Instal Docker CLI dan Docker Compose
brew install docker docker-compose

# Instal Colima
brew install docker colima
```

**2.** **Jalankan Colima**

```bash
colima start
```

*Catatan: Untuk kustomisasi (misal: Apple Silicon, memori, CPU), gunakan: `colima start --arch aarch64 --cpu 4 --memory 4`*.

:::tip
Untuk pengguna Mac Apple Silicon (M1/M2/M3), gunakan perintah ini untuk performa virtualisasi yang jauh lebih cepat (menggunakan Virtualization Framework Apple dan Rosetta):

```bash
colima start --vm-type=vz --vz-rosetta --mount-type=virtiofs
```
:::

**3.** **Verifikasi Instalasi**

Pastikan Docker sudah berjalan dengan perintah:

```bash
docker ps
```

Colima akan secara otomatis menghubungkan socket Docker agar perintah CLI berfungsi.

**4.** **Kustomisasi Resource**

Secara default, Colima menggunakan 2 CPU, 2GB RAM, dan 60GB Disk. Anda bisa mengubahnya saat start:

```bash
# Contoh: Memberi 4 CPU, 8GB RAM
colima stop
colima start --cpu 4 --memory 8
```

*Catatan: Kapasitas disk tidak bisa diubah setelah dibuat (contoh menambahkan 100GB disk `--disk 100`), kita harus menjalankan `colima delete` terlebih dahulu jika ingin memperbesar disk.*

**6.** **Tips**

* **Autostart**: Jika ingin Colima otomatis berjalan saat Mac dinyalakan, gunakan: `brew services start colima`.
* **Kubernetes**: Jika butuh Kubernetes lokal, cukup jalankan `colima start --with-kubernetes`.
