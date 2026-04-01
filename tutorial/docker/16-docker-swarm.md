---
sidebar_position: 17
title: 'Docker Swarm'
---

## 🐋 Apa itu Docker Swarm?

**Docker Swarm** adalah fitur *orchestration* bawaan Docker yang digunakan untuk mengelola dan menjalankan container dalam cluster (sekumpulan server).

Jika Docker biasa menjalankan container di 1 mesin, maka Docker Swarm memungkinkan:

* Menjalankan container di **banyak mesin (node)**.
* High availability.
* Load balancing.
* Scaling otomatis.
* Self-healing (container mati → otomatis dibuat ulang).

## 🏗 Konsep Dasar Arsitektur

Dalam Docker Swarm ada beberapa komponen utama:

### 1️⃣ Node

Node adalah server yang tergabung dalam cluster.

Ada 2 jenis node:
*  **Manager Node**
    * Mengelola cluster.
    * Menyimpan state cluster.
    * Mengatur scheduling container.
    * Leader election (Raft consensus).

* **Worker Node**
    * Hanya menjalankan container.
    * Tidak mengatur cluster.

### 2️⃣ Service

Service adalah definisi container yang ingin dijalankan di cluster.

```bash
docker service create --replicas 3 nginx
```

Artinya:

* Jalankan 3 container nginx
* Jika 1 mati → otomatis dibuat ulang

### 3️⃣ Task

Task adalah instance container yang dijalankan oleh service.

### 4️⃣ Overlay Network

Docker Swarm menggunakan overlay network untuk komunikasi antar node. Container di node berbeda tetap bisa saling berkomunikasi seolah-olah satu LAN.

## 📊 Ilustrasi Topologi Swarm

Ilustrasi kita memiliki 3 Node (Manager, Worker 1 dan Worker 2) dengan masing-masing IP Address yang berbeda:

```

                [ Manager Node ]
                  192.168.33.10
                       │
          ─────────────────────────
          │                        │
    [ Worker 1 ]             [ Worker 2 ]
    192.168.33.11            192.168.33.12
```

Jika kita deploy:

```bash
docker service create --replicas 4 nginx
```

Maka 4 container akan tersebar otomatis ke worker node.

## 🔁 Cara Kerja High Availability

Misalnya:
* Worker 1 mati
* 2 container hilang

Manager akan:
* Mendeteksi kegagalan
* Menjalankan ulang container di Worker 2

Ini disebut **self-healing orchestration**.

## ⚙️ Fitur Utama

* ✅ Built-in load balancing
* ✅ Rolling update
* ✅ Auto restart container
* ✅ Secret management
* ✅ Scaling service
* ✅ Encrypted cluster communication

## 📦 Perbandingan dengan Kubernetes

Perbandingan dengan ☸️ Kubernetes:

| Aspek |	Docker Swarm |	Kubernetes |
| --- | --- | --- |
| **Kompleksitas** |	Mudah |	Kompleks |
| **Setup** |	Sangat cepat |	Butuh konfigurasi banyak |
| **Learning curve** |	Rendah |	Tinggi |
| **Enterprise scale** |	Terbatas |	Sangat besar |
| **Popularitas** |	Menurun |	Sangat dominan |

## 🎯 Kapan Menggunakan Docker Swarm?

Cocok jika:
* Ingin cluster sederhana
* Tidak butuh kompleksitas Kubernetes
* Infrastruktur kecil–menengah
* Untuk lab, riset, atau small production

## 🔥 Contoh Implementasi

Contoh implementasi Docker Swarm menggunakan Vagrant (Bisa diganti dengan Virtual Manchine seperi VMWare, Virtualbox dll) dengan membuat cluster lab lokal (1 manager + 2 worker).

Contoh ini cocok untuk:

* Lab DevOps
* Simulasi distributed system

### 🎯 Arsitektur Lab

Kita akan membuat 3 VM:

| VM |	Role |	IP |
| --- | --- | --- |
| node1 |	Manager |	192.168.33.10 |
| node2 |	Worker |	192.168.33.11 |
| node3 |	Worker |	192.168.33.12 |

Semua VM berbasis:

* Alpine Linux

Virtualisasi menggunakan:

* Vagrant
* Provider: VirtualBox

Cluster orchestration:

* Docker Swarm

### 🏗 Struktur Folder

```
swarm-cluster/
│
├── manager/
│   └── Vagrantfile
│
├── worker1/
│   └── Vagrantfile
│
└── worker2/
    └── Vagrantfile
```

### 1️⃣ Vagrantfile – Manager

📁 `manager/Vagrantfile`

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "generic/alpine319"
  config.vm.hostname = "manager"
  config.vm.network "private_network", ip: "192.168.33.10"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = 1024
    vb.cpus = 1
  end

  config.vm.provision "shell", inline: <<-SHELL
    apk update
    apk add docker
    rc-update add docker boot
    service docker start
    adduser vagrant docker
  SHELL
end
```

### 2️⃣ Vagrantfile – Worker 1

📁 `worker1/Vagrantfile`

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "generic/alpine319"
  config.vm.hostname = "worker1"
  config.vm.network "private_network", ip: "192.168.33.11"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = 1024
    vb.cpus = 1
  end

  config.vm.provision "shell", inline: <<-SHELL
    apk update
    apk add docker
    rc-update add docker boot
    service docker start
    adduser vagrant docker
  SHELL
end
```

### 3️⃣ Vagrantfile – Worker 2

📁 `worker2/Vagrantfile`

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "generic/alpine319"
  config.vm.hostname = "worker2"
  config.vm.network "private_network", ip: "192.168.33.12"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = 1024
    vb.cpus = 1
  end

  config.vm.provision "shell", inline: <<-SHELL
    apk update
    apk add docker
    rc-update add docker boot
    service docker start
    adduser vagrant docker
  SHELL
end
```

### 🚀 Cara Menjalankan

Jalankan masing-masing secara terpisah:

```bash
cd manager
vagrant up

cd ../worker1
vagrant up

cd ../worker2
vagrant up
```

---

## 🧠 Inisialisasi Swarm

### 1️⃣ Masuk ke Manager

```bash
cd manager
vagrant ssh
```

Inisialisasi swarm:

```bash
docker swarm init --advertise-addr 192.168.33.10
```

Token akan keluar, copy token worker.

:::tip
Terkadang ada kasus dimana di beberapa environment Alpine Linux + VirtualBox, tidak otomatis diarahkan ke IPv4, sehingga manager MENOLAK koneksi TCP IPv4. Untuk mengatasi hal tersebut jalankan perintah dibawah ini untuk mengarahkan ke IPv4:

```bash
docker swarm init \
  --advertise-addr 192.168.56.10 \
  --listen-addr 0.0.0.0:2377
```

Value `--listen-addr 0.0.0.0:2377` dapat di ubah dengan IP langsung `--listen-addr 192.168.56.10:2377`.
:::

### 2️⃣ Join Worker

Masuk ke worker1:

```bash
cd worker1
vagrant ssh
```

Lalu:

```bash
docker swarm join --token <TOKEN> 192.168.33.10:2377
```

Ulangi di worker2.

### 🔍 Verifikasi

Di manager:

```bash
docker node ls
```

Harus muncul:

* manager → Leader
* worker1 → Ready
* worker2 → Ready

### 📦 Deploy Service

Di manager:

```bash
docker service create \
  --name web \
  --replicas 3 \
  -p 8080:80 \
  nginx:alpine
```

Cek distribusi:

```bash
docker service ps web
```

Cek node:

```bash
docker node ls
```

### 🔁 Uji Self-Healing

Matikan docker di worker:

```bash
service docker stop
```

Cek di manager:

```bash
docker service ps web
```

Swarm akan memindahkan container otomatis.

:::tip
Untuk melihat token yang ada manager jalankan perintah di bawah ini:

```bash
docker swarm join-token manager
```
:::

Jika service docker di jalankan lagi pada worker jangan lupa cek di manager statusnya:

```bash
docker node ls
```

### 📈 Scale service yang sudah ada

Cek service:

```bash
docker service ls
docker service ps web
```

Scale service menjadi 3:

```bash
docker service scale web=3
```
