---
slug: membuat-user-manual-linux
title:  Membuat User Linux secara Manual
authors: topekox
tags: [linux, ubuntu, debian, fedora]
---

Di Linux, kita dapat membuat user menggunakan perintah high-level `adduser` (interaktif) atau `useradd` (low-level). Untuk membuat user secara "manual" tanpa utilitas ini, kita harus langsung mengedit file sistem dan mengatur environment-nya sendiri. 

<!--truncate-->

## 🦸 Membuat User

### 1️⃣ Membuat User:

```
sudo useradd -m -s /bin/bash username
```

* `-m`: Membuat home directory.
* `-s`: Mengatur default login shell (contoh `/bin/bash`).

### 2️⃣ Mengatur Password:

```
sudo passwd username
```

### 3️⃣ Menambahkan Hak Akses Istimewa Sudo

Kita harus masuk sebagai root, gunakan perintah yang sesuai dengan distribusi Linux Anda:

* **Ubuntu / Debian / Kali / Mint**: tambahkan pengguna ke `sudo` group:

```
usermod -aG sudo username
```

* **RHEL / CentOS / Fedora / Rocky / Arch**: Tambahkan pengguna ke `wheel` grup.

```
usermod -aG wheel username
```

### 4️⃣ Verifikasi

```
id username
```

## ❌ Menghapus User

### 1️⃣ Basic Menghapus User

Cara ini akan menghapus user dari file system (seperti `/etc/passwd`) tapi **tidak menghapus** `home` directori-nya dan file terkait. 

```
sudo userdel username
```

### 2️⃣ Menghapus Total (User + Home Directory)

Gunakan perintah `-r` (recursive) flag untuk menghapus akun user bersama home directory-nya dan mail spool-nya. 

```
sudo userdel -r username
```

---

## 🦸 Membuat User secara *Scratch*! (Tanpa `useradd`)

Untuk keperluan pembelajaran atau skenario recovery tertentu, kita dapat mengedit file  sistem secara manual. **⚠️Peringatan**: Kesalahan sintaks dapat menyebabkan kegagalan login sistem. 

### 1️⃣ Tambahkan entri pengguna ke `/etc/passwd`:

Gunakan `sudo vi`. Tambahkan baris dengan format berikut:
`username:x:1001:1001:Full Name:/home/username:/bin/bash`

    * `1001`: UID dan GID (pastikan keduanya unik).

### 2️⃣ Tambahkan entri grup ke `/etc/group`:

Gunakan `sudo vi` dan tambahkan:

`username:x:1001:`

### 3️⃣ Buat direktori home dan atur izinnya:

```
sudo mkdir /home/username
sudo cp -r /etc/skel/. /home/username/   # Copy default config files
sudo chown -R 1001:1001 /home/username    # Assign ownership to the new UID/GID
sudo chmod -R 700 /home/username          # Restrict access to the user
```

### 4️⃣ Atur kata sandi:

Jalankan `sudo passwd username` untuk menghasilkan entri hash di `/etc/shadow`. 
