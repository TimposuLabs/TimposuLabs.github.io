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

## 🐋 Docker Desktop (Paket Lengkap)

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

Untuk instalasi Docker Desktop di OS Windows, MacOS dan Linux, dapat merujuk ke link https://docs.docker.com/get-started/get-docker/.

:::warning
**Penggunaan komersial Docker Desktop** di perusahaan besar (lebih dari 250 karyawan ATAU lebih dari $10 juta USD dalam pendapatan tahunan) memerlukan langganan berbayar.
:::

## 👍 Install Docker Engine

Pada seri tutorial ini, kami menggunakan Docker Engine dibanding Docker Desktop karena alasan **lisensi, performa, kontrol, dan efisiensi**. Sebagai software engineer yang menyukai detail sistem, anda akan melihat bahwa Docker Engine menawarkan keunggulan teknis yang signifikan. Selain itu Docker Engine bersifat ***open-source*** yang menggunakan Lisensi Apache 2.0, yang dapat diperggunakan secara gratis untuk siapa saja, termasuk individu, hingga perusahaan besar berskala internasional.

* **Install Docker Engine di Linux**: Untuk melakukan instalasi Docker Engine di Linux dapat merujuk ke [Dokumentasi Resmi Docker](https://docs.docker.com/engine/install/).
* **Install Docker Engine di Virtual Machine**: Cara ini mungkin agak sedikit berat karena kita perlu menginstall Virtual Machine seperti Virtual Box atau VMWare terlebih dahulu kemudian menginstall Linux dan menginstall Docker Engine di atasnya.
* **Install Docker Engine di Windows dengan WSL**: Untuk menginstall Docker Engine di Windows kita perlu menginstall Windows Subsystem Linux (WSL) terlebih dahulu kemudian menjalankan Docker Engine di atasnya, cara ini lebih ringan dibanding menggunakan Virtual Machine. Untuk cara instalasinya bisa melihat video di bawah ini:

<iframe width="560" height="315" src="https://www.youtube.com/embed/eT2qxoPfMBA?si=nqCe2GgyaFY9qgwf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
