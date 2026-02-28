---
slug: perintah-dasar-cisco-switch
title: Perintah dasar Switch Cisco
authors: topekox
tags: [cisco, switch, networking, jaringan, ccna]
---

Pada materi ini kita akan membahas perintah dasar Switch Cisco mencakup hierarki mode, konfigurasi identitas, keamanan, manajemen VLAN, hingga verifikasi status perangkat.

<!-- truncate -->

## 1️⃣ Mode Akses

* **User Mode**: `Switch>`
* **Privileged Mode**: `enable` -> `Switch#`
* **Global Config Mode**: `configure terminal` -> `Switch(config)#`
* **Back to User Mode**: `disable`
* **Help Command**: `?`

## 2️⃣ Konfigurasi Identitas & Keamanan

```
# Ganti Nama Switch
hostname SW-Lantai1

# Password Masuk Mode Privileged
enable secret password123

# Password Konsol
line console 0
 password konsolpass
 login
 exit

# Password Remote (Telnet/SSH)
line vty 0 4
 password remotepass
 login
 exit
```

## 3️⃣ Konfigurasi VLAN & Port

```
# Membuat VLAN
vlan 10
 name Jaringan_Admin
 exit

# Konfigurasi Port Access (PC/Laptop)
interface fastEthernet 0/1
 switchport mode access
 switchport access vlan 10
 no shutdown

# Konfigurasi Port Trunk (Antar Switch)
interface fastEthernet 0/24
 switchport mode trunk
```

## 4️⃣ IP Management & Simpan Data

```
# IP untuk Remote Management
interface vlan 1
 ip address 192.168.1.2 255.255.255.0
 no shutdown

# Simpan Konfigurasi
do write
```

## 5️⃣ Perintah Cek (Verifikasi)

* `show running-config` : Cek konfigurasi berjalan.
* `show ip interface brief` : Cek status port & IP.
* `show vlan brief` : Cek daftar VLAN.
