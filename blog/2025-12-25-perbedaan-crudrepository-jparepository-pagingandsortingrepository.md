---
slug: perbedaan-crudrepository-jparepository-pagingandsortingrepository
title:  Perbedaan CrudRepository, PagingAndSortingRepository, dan JpaRepository pada Spring Data JPA
authors: topekox
tags: [spring, springboot, jpa, hibernate]
---

Dalam ekosistem Spring Data JPA, ketiga interface ini merupakan tingkatan (hierarki) yang saling mewarisi satu sama lain. Pemilihan di antara ketiganya bergantung pada seberapa kompleks fitur yang Anda butuhkan untuk aplikasi Anda.

Berikut adalah penjelasan rinci mengenai perbedaan ketiganya:

<!--truncate-->

### 1️⃣ CrudRepository
Ini adalah tingkatan paling dasar dalam Spring Data. Sesuai namanya, fokus utamanya adalah operasi **CRUD** (Create, Read, Update, Delete).

* **Fungsi Utama**: Menyediakan metode standar seperti `save()`, `findById()`, `findAll()`, `count()`, dan `deleteById()`.
* **Kapan Digunakan**: Gunakan jika Anda hanya butuh manipulasi data sederhana tanpa memerlukan fitur tambahan seperti pengurutan atau pembagian halaman.
* **Kelebihan**: Sangat ringan dan efisien untuk tabel-tabel referensi yang datanya sedikit.

### 2️⃣ PagingAndSortingRepository

Interface ini mewarisi (extends) `CrudRepository`. Artinya, semua fitur CRUD sudah ada di sini, ditambah kemampuan untuk menangani data berjumlah besar.

* **Fungsi Utama**: Menambahkan dua metode penting:
    * `findAll(Sort sort)`: Mengambil semua data dengan urutan tertentu.
    * `findAll(Pageable pageable)`: Mengambil data per halaman (misal: hanya ambil 10 data pertama).
* **Kapan Digunakan**: Gunakan jika aplikasi Anda memiliki fitur tabel yang bisa di-*scroll* per halaman (pagination) atau kolom yang bisa diurutkan (sorting) oleh user.
Kelebihan: Mencegah aplikasi menjadi lambat (lag) saat harus menampilkan ribuan data sekaligus ke browser.

### 3️⃣ JpaRepository

Ini adalah interface yang paling sering digunakan di industri dan merupakan tingkatan paling tinggi. Ia mewarisi **PagingAndSortingRepository**, yang otomatis juga mewarisi **CrudRepository**.

* **Fungsi Utama**: Menambahkan fitur-fitur spesifik milik JPA (Java Persistence API) yang tidak ada di dua interface sebelumnya:
    * `flush()`: Memaksa sinkronisasi data ke database saat itu juga.
    * `saveAndFlush()`: Simpan data dan langsung sinkronkan ke DB.
    * `deleteInBatch()`: Menghapus banyak data sekaligus dalam satu perintah SQL (lebih cepat daripada hapus satu-persatu).
    * Mengembalikan tipe data List pada `findAll()`, sedangkan dua sebelumnya mengembalikan `Iterable`.
* **Kapan Digunakan**: Ini adalah standar de facto untuk aplikasi enterprise. Gunakan ini jika Anda butuh kontrol penuh terhadap transaksi database dan performa hapus massal.

### 🌳 Perbandingan Visual (Hierarki)

```
CrudRepository (Basic CRUD)
   └── PagingAndSortingRepository (CRUD + Pagination + Sorting)
          └── JpaRepository (CRUD + Pagination + Sorting + JPA Specifics/Batch)
```

### ✍️ Tabel Ringkasan

| Fitur	| CrudRepository	| PagingAndSorting	| JpaRepository |
| --- | --- | --- | --- |
| Operasi CRUD |	Ya |	Ya |	Ya |
| Sorting (Urutan) |	Tidak	| Ya	| Ya |
| Pagination (Halaman) |	Tidak |	Ya	| Ya |
| Flush (Sinkronisasi) |	Tidak	| Tidak |	Ya |
| Batch Delete	| Tidak	| Tidak |	Ya |
| Return Type	| `Iterable` |	`Iterable` | 	`List` |

### 🔥 Kesimpulan

Jika kalian bingung 🥺 harus menggunakan yang mana, pilihlah `JpaRepository`. Meskipun sedikit lebih "berat" dibanding yang lain, `JpaRepository` memberikan fleksibilitas paling maksimal. Untuk efisiensi memori dari `CrudRepository` biasanya tidak terlalu signifikan dibandingkan kemudahan fitur yang ditawarkan oleh `JpaRepository`.
