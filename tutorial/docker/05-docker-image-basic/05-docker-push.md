---
sidebar_position: 5
title: 'Docker Push'
---

Docker Push adalah proses mengunggah (upload) Docker Image dari komputer lokal Anda ke sebuah **Docker Registry **(seperti Docker Hub, GitHub Container Registry, atau AWS ECR).

## 🐳 Docker Push Docker Hub

Skenario Kasus Docker Hub:

```bash
Nama User Docker Hub: ucupdev
Nama Aplikasi: java-api
Versi: 1.0.2
```

Setelah melakukan build aplikasi menjadi file JAR, kita membuat Image dan mengunggahnya.

### 1️⃣ Login ke Docker Hub

```bash
docker login -u ucupdev
# Masukkan Personal Access Token (PAT) Anda saat diminta password
```

### 2️⃣ Build Image dengan format username/repository:tag:

```bash
# Melakukan build langsung dengan nama akun
docker build -t ucupdev/java-api:1.0.2 .
```

### 3️⃣ Push Image ke Docker Hub:

```bash
docker push ucupdev/java-api:1.0.2
```

Sekarang, Image Anda sudah tersimpan di cloud Docker Hub.

