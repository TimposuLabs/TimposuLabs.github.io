---
sidebar_position: 1
title: 'Apa itu Express.js?'
---

Express.js, atau sering disingkat Express, adalah __framework__ aplikasi web minimalis dan fleksibel untuk Node.js.

* __Node.js__ menyediakan lingkungan runtime untuk menjalankan JavaScript di sisi server.
* __Express.js__ menyediakan struktur dan serangkaian alat yang kuat untuk membantu Anda dengan cepat membangun aplikasi web, API (Application Programming Interface), dan backend yang andal.

Express adalah bagian penting dari tumpukan teknologi populer yang dikenal sebagai __MEAN__ (MongoDB, Express, Angular, Node.js) atau __MERN__ (MongoDB, Express, React, Node.js).

![https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRyb_GO1EDMxRZVZ5g-KDXOZI3VgaxLl4ngv-mQkUnMc6JQG4GcFU9gCdUkbVYUeEJGPTcyfWzwNa0DcIbNrGRfp9mtpNQdNJHpPnVeGwFrYuU499w](https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRyb_GO1EDMxRZVZ5g-KDXOZI3VgaxLl4ngv-mQkUnMc6JQG4GcFU9gCdUkbVYUeEJGPTcyfWzwNa0DcIbNrGRfp9mtpNQdNJHpPnVeGwFrYuU499w)

_Source: [https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRyb_GO1EDMxRZVZ5g-KDXOZI3VgaxLl4ngv-mQkUnMc6JQG4GcFU9gCdUkbVYUeEJGPTcyfWzwNa0DcIbNrGRfp9mtpNQdNJHpPnVeGwFrYuU499w](https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcRyb_GO1EDMxRZVZ5g-KDXOZI3VgaxLl4ngv-mQkUnMc6JQG4GcFU9gCdUkbVYUeEJGPTcyfWzwNa0DcIbNrGRfp9mtpNQdNJHpPnVeGwFrYuU499w)_

## 🎯 Mengapa Menggunakan Express.js?

1. __Minimalis dan Cepat:__ Express hanya menyediakan fungsionalitas inti yang diperlukan. Ini menjaga overhead tetap rendah dan membuatnya sangat cepat. Anda bebas memilih middleware (modul pihak ketiga) mana yang ingin Anda tambahkan sesuai kebutuhan.

2. __Routing yang Mudah:__ Express menyediakan mekanisme routing yang sederhana namun kuat. Ini memungkinkan Anda untuk mendefinisikan endpoint URL yang berbeda dan menentukan bagaimana aplikasi merespons permintaan `HTTP` (seperti `GET`, `POST`, `PUT`, `DELETE`).

3. __Middleware:__ Express sangat mengandalkan middleware, yaitu fungsi yang memiliki akses ke objek permintaan / request (`req`), objek response (`res`), dan fungsi middleware berikutnya dalam siklus request-response. Ini membuatnya mudah untuk melakukan tugas-tugas seperti logging, otentikasi, kompresi data, dan penanganan error.

4. __Komunitas Besar:__ Karena popularitasnya, Express memiliki komunitas pengguna yang sangat besar, yang berarti banyak sumber daya, tutorial, dan paket middleware tambahan yang tersedia.

## 🧱 Konsep Utama dalam Express

Saat bekerja dengan Express, Anda akan sering berhadapan dengan tiga konsep utama:

| Konsep | Penjelasan Singkat |
| --- | --- |
| `Routing` | Proses menentukan bagaimana aplikasi merespons permintaan klien ke endpoint tertentu (URL) dengan metode HTTP tertentu. Contoh: app.get('/users', ...) |
| `Middleware` | Fungsi yang dijalankan sebelum handler rute utama. Mereka dapat memodifikasi objek `req` dan `res`, atau mengakhiri siklus request-response. |
| `Application Object (app)` | Instance utama aplikasi Express. Object ini digunakan untuk mendefinisikan routing, menerapkan middleware, dan menjalankan server. |

Express.js adalah pilihan yang ideal jika Anda ingin membangun `API RESTful`, aplikasi `single-page application` (SPA) dengan Node.js, atau layanan backend yang scalable.
