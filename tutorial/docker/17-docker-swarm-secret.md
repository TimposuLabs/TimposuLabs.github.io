---
sidebar_position: 18
title: 'Docker Swarm Secret'
---

## 🔐 Implementasi Using Secrets dengan Docker Swarm

Pada Docker Swarm, secret digunakan untuk menyimpan data sensitif seperti:

* Password database
* API key
* Token
* Sertifikat SSL

Swarm akan:

* Menyimpan secret dalam bentuk **encrypted (Raft log encryption)**
* Mengirim secret hanya ke node yang menjalankan service terkait
* Me-mount secret sebagai file di `/run/secrets/`
* Tidak menyimpannya di image atau environment variable

## 1️⃣ Konsep Dasar

Saat kita membuat secret:

```bash
echo "mypassword123" | docker secret create db_password -
```

Secret tersebut:

* Disimpan di manager node
* Tidak bisa dibaca langsung (hanya bisa di-attach ke service)

## 2️⃣ Contoh Implementasi Lengkap

Misalnya kita ingin menjalankan MySQL di Swarm dengan password menggunakan secret.

* ### Step 1 — Inisialisasi Swarm (jika belum ada)

```bash
docker swarm init
```

* ### Step 2 — Buat Secret

```bash
echo "StrongRootPass123!" | docker secret create mysql_root_password -
```

Cek secret:

```bash
docker secret ls
```

* ### Step 3 — Deploy Service dengan Secret

```bash
docker service create \
  --name mysql \
  --secret mysql_root_password \
  -e MYSQL_ROOT_PASSWORD_FILE=/run/secrets/mysql_root_password \
  mysql:8.0
```

Perhatikan:

* Kita menggunakan `MYSQL_ROOT_PASSWORD_FILE`
* Bukan `MYSQL_ROOT_PASSWORD`

Karena *secret* akan tersedia sebagai file di:

```bash
/run/secrets/mysql_root_password
```

## 3️⃣ Implementasi Menggunakan Docker Compose (Stack)

File `docker-stack.yml`:

```yaml
version: "3.8"

services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD_FILE: /run/secrets/mysql_root_password
    secrets:
      - mysql_root_password
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:

secrets:
  mysql_root_password:
    external: true
```

Deploy stack:

```bash
docker stack deploy -c docker-stack.yml mystack
```

## 4️⃣ Cara Aplikasi Membaca Secret

Di dalam container, secret tersedia sebagai file.

Contoh di Spring Boot:

```properties
spring.datasource.password=${MYSQL_PASSWORD:}
```

Lalu di entrypoint script:

```bash
export MYSQL_PASSWORD=$(cat /run/secrets/mysql_root_password)
```

Atau langsung gunakan `_FILE` variable jika image mendukungnya.

## 5️⃣ Best Practices di Production

### ✅ 1. Jangan pakai environment variable untuk password

Environment variable bisa terlihat lewat:

```bash
docker inspect
```

### ✅ 2. Gunakan Stack bukan service manual

Karena stack lebih rapi untuk production deployment.

### ✅ 3. Gunakan Secret Rotation

Untuk mengganti secret:

```bash
docker secret create mysql_root_password_v2 newpass.txt
docker service update --secret-rm mysql_root_password \
                      --secret-add mysql_root_password_v2 mysql
```

### ✅ 4. Gunakan Network Terpisah (Frontend–Backend)

Seperti arsitektur yang sebelumnya kamu buat:

* Nginx → frontend network
* App → backend network
* DB → backend only

*Secret* hanya diberikan ke service yang membutuhkan.

## 6️⃣ Perbedaan Secret vs Config

| Feature	| Secret |	Config |
| --- | --- | --- |
| Data sensitif |	✅	| ❌ |
| Encrypted |	✅	| ❌ |
| File mount |	✅	| ✅ |
| Cocok untuk |	Password |	File konfigurasi |

## 7️⃣ Keamanan Internal Swarm

Secret pada Docker Swarm:

* Disimpan encrypted dalam Raft log
* Hanya dikirim ke node yang menjalankan task
* Hilang saat container dihentikan
* Tidak masuk ke image layer

## 🔎 Cek Secret di Container

Masuk ke container:

```bash
docker exec -it <container_id> sh
cat /run/secrets/mysql_root_password
```
