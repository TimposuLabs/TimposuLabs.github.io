---
sidebar_position: 2
title: 'Membuat Project Express.js'
---

## 🚀 Persiapan Awal

Sebelum memulai, pastikan telah menginstal __Node.js__ dan __npm__ (Node Package Manager) di sistem anda. Kita dapat memeriksanya dengan menjalankan perintah di bawah ini pada terminal/command prompt:

* `node -v`
* `npm -v`

## 📝 Langkah 1: Buat Folder Projek dan Inisialisasi

1. Buat folder baru untuk project anda, dan masuk ke dalamnya:

```bash
mkdir belajar-express
cd belajar-express
```

2. Inisialisasi proyek Node.js. Ini akan membuat file `package.json` yang menyimpan metadata proyek dan daftar dependensi dengan perintah `npm init -y`, atau `npm init`.

```bash
npm init

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (belajar-express)
version: (1.0.0)
description: Belajar Express JS
entry point: (index.js)
test command:
git repository:
keywords:
author: Ucup Topekox
license: (ISC)
About to write to D:\Workspace\belajar\nodejs\express\belajar-express\package.json:

{
  "name": "belajar-express",
  "version": "1.0.0",
  "description": "Belajar Express JS",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Ucup Topekox",
  "license": "ISC"
}


Is this OK? (yes)
```

## 🛠️ Langkah 2: Install Express.js

Instal Express.js sebagai dependensi utama untuk proyek Anda:

```bash
npm install express
```

Untuk menginstal Express dan menyimpannya dalam dependensi `package.json` Anda:

```bash
npm install express --save
```

Pastikan dalam file `package.json` sudah terdapat dependency dari Express.js.

```json
"dependencies": {
    "express": "^5.1.0"
}
```
