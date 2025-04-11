---
slug: postgres-docker-wsl
title: Menjalankan PostgreSQL di Docker Container pada Windows Subsystem for Linux (WSL)
authors: topekox
tags: [docker, postgres, wsl]
---

Jadi saya biasanya menggunakan Docker pada sistem operasi Linux (Ubuntu, Fedora) menggunakan Docker Engine saja tanpa Docker Desktop, karena menurut saya lebih mudah digunakan. Docker Engine mudah digunakan di Linux karena dirancang untuk memanfaatkan fitur-fitur kernel Linux, seperti *namespaces* dan *cgroups*, yang mendukung isolasi dan efisiensi kontainer. 

<!--truncate-->

![HeidiSQL](/img/general/logo-wsl.jpg)

Docker Engine sering lebih dipilih dibandingkan Docker Desktop karena beberapa alasan berikut:

1. **Ringan dan Efisien**: Docker Engine tidak memerlukan antarmuka grafis atau mesin virtual, sehingga lebih ringan dan efisien, terutama di sistem operasi berbasis Linux.
2. **Gratis untuk Penggunaan Komersial**: Docker Engine tidak memiliki batasan lisensi seperti Docker Desktop, yang memerlukan langganan berbayar untuk penggunaan komersial di perusahaan besar.
3. **Kontrol Lebih Besar**: Dengan Docker Engine, pengguna memiliki kontrol penuh atas konfigurasi dan pengelolaan kontainer tanpa tambahan fitur yang mungkin tidak diperlukan.
4. **Kompatibilitas Linux**: Docker Engine dirancang untuk berjalan langsung di Linux, sehingga tidak memerlukan layer tambahan seperti mesin virtual yang digunakan Docker Desktop di Windows atau macOS.

Jadi itulah beberapa alasan saya lebih memilih Docker Engine dibanding Docker Desktop. Tapi ketika menggunakan sistem operasi Windows 11, tidak terdapat akses langsung menggunakan Docker Engine. Solusi yang dapat digunakan untuk menggunakan Docker Engine di Windows 11 adalah menginstallnya pada Windows Subsystem for Linux (WSL) atau menginstallnya pada software virtual mesin seperti Virtual Box, VMWare atau Qemu.

Pada artikel ini saya akan menggunakan WSL karena lebih cepat dalam pengoperasiannya dibanding menggunakan software virtual mesin.

## ✅ Install WSL 2 pada Windows 11

Pada tutorial ini kami berasumsi bahwa teman-teman sudah melakukan instalasi WSL 2 dan sudah menginstall Ubuntu pada mesin WSL.

:::info
Untuk instalasi WSL 2 pada Windows 11 dapat melihat dokumentasi lengkapnya di sini:

https://learn.microsoft.com/en-us/windows/wsl/install
:::

## ✅ Install Docker pada WSL 2

1. Buka Ubuntu pada bash WSL 2.
2. Update Linux Repository

```
sudo apt-get update
```

3. Download dependency dan menambahkan Docker GPG Key

```
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

4. Menambahkan repository Docker

```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

5. Update 

```
sudo apt-get update
```

6. Install Docker

```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

7. Cek Instalasi

```
ucup@Timposu:~$ docker --version
Docker version 28.0.4, build b8034c0
```

## ✅ Jalankan Container Postgresql

1. Agar datanya tetap ada, maka kita perlu membuat volume, di sini saya akan membuat volume dengann nama `postgres-volume`:

```
docker volume create postgres-volume
```

2. Membuat container Postgresql dengan nama `postgresqldatabase` dan password `secretpassword`:

```
docker container run -d --rm --name postgresqldatabase -e POSTGRES_PASSWORD=secretpassword -p 5432:5432 -v postgres-volume:/var/lib/postgresql
/data postgres
```

3. Cek container:

```
ucup@Timposu:~$ docker container ps
CONTAINER ID   IMAGE           COMMAND                  CREATED         STATUS         PORTS                                         NAMES
59c7cb0f2a7f   postgres:17.4   "docker-entrypoint.s…"   2 seconds ago   Up 2 seconds   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp   postgresqldatabase
```

## ✅ Menghubungkan Database Postgres ke Windows

Untuk menghubungkan aplikasi kita dengan PostgreSQL yang ada pada container Docker di WSL2, kita bisa menggunakan aplikasi client lain seperti HeidiSQL, DBEaver atau PGAdmin.

:::info
Docker pada WSL berjalan ketika bash Ubuntu sedang aktif, pastikan bash Ubuntu pada WSL terbuka.
:::

1. Buka Powershell di Windows

2. Cek IP Address WSL 2 dengan perintah 

```
wsl hostname -I
```

Kita akan mendapatkan 2 IP Address:

```
PS C:\Users\ucup> wsl hostname -I
172.30.163.213 172.17.0.1
```

Dimana IP Address pertama yaitu `172.30.163.213` adalah IP Address dari WSL 2 (hasil IP Address mungkin berbeda dimasing-masing komputer).

3. Sekarang kita akan melakukan koneksi TCP pada Port 5432 dimana port tersebut yang digunakan oleh Postgresql yang ada dalam DOcker container pada WSL 2.

```
Test-NetConnection -ComputerName 172.30.163.213 -Port 5432
```

Ganti IP Address di atas dengan IP Address teman-teman

Tunggu beberapa saat, jika berhasil maka hasil akan terlihat seperti di bawah ini:

```
PS C:\Users\ucup> Test-NetConnection -ComputerName 172.30.163.213 -Port 5432                                           

ComputerName     : 172.30.163.213
RemoteAddress    : 172.30.163.213
RemotePort       : 5432
InterfaceAlias   : vEthernet (WSL (Hyper-V firewall))
SourceAddress    : 172.30.160.1
TcpTestSucceeded : True
```

Jika nilai dari `TcpTestSucceeded` adalah `True` maka koneksi berhasil. **Jika nilai `TcpTestSucceeded` adalah `False`** maka silahkan cek koneksi atau container apakah sudah sesuai port, konfigurasinya seperti di atas.

## ✅ Cek koneksi

Sekarang kita dapat melakukan uji coba menggunakan PostgreSQL Client seperti HeidiSQL, DBEaver atau PGAdmin.

![HeidiSQL](/img/general/heidi.png)

## 🌐 Referensi

* https://medium.com/@jkarelins/run-postgresql-database-in-docker-container-on-wsl2-656ed3c02280
* https://learn.microsoft.com/en-us/windows/wsl/install
