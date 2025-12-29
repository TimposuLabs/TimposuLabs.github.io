---
sidebar_position: 12
title: 'Cascading'
---

Pada materi sebelumnya dalam relasi **One-to-One**, kita menggunakan `cascade = CascadeType.ALL`, dimana jika kita melakukan operasi (Create, Update, Delete) pada objek ini, maka objek yang terhubung akan otomatis menerima operasi yang sama. Di materi kali ini kita akan membahas Cascading dalam Hibernate lebih detail.

## 1️⃣ Apa itu Cascading?

**Cascading** adalah fitur yang memungkinkan sebuah operasi pada satu entitas (Parent) secara otomatis "mengalir" atau diteruskan ke entitas lain yang terhubung dengannya (Child).
Tanpa cascading, kita harus menyimpan atau menghapus setiap objek satu per satu secara manual. Dengan cascading, kita cukup memanipulasi objek utama, dan Hibernate akan mengurus sisanya.

## 2️⃣ Jenis-Jenis CascadeType

JPA menyediakan beberapa opsi di dalam enum `jakarta.persistence.CascadeType`:

| Jenis Cascade |	Penjelasan |
| --- | --- |
| **PERSIST** |	Jika Parent disimpan (`persist`), maka Child otomatis ikut disimpan. |
| **MERGE** |	Jika Parent diperbarui (`merge`), maka Child otomatis ikut diperbarui. |
| **REMOVE** |	Jika Parent dihapus, maka Child **otomatis ikut dihapus** dari database. |
| **REFRESH** |	Jika Parent di-reload dari database, Child juga akan di-reload. |
| **DETACH** |	Jika Parent dilepas dari session memori, Child juga ikut dilepas. |
| **ALL** |	Gabungan dari **semua** jenis di atas (Persist, Merge, Remove, Refresh, Detach). |

## 3️⃣ Contoh Implementasi Kode

Mari kita lihat perbedaan antara menggunakan `ALL` dengan menggunakan jenis yang spesifik.

### A. Menggunakan Cascade `ALL` (Agresif)

* Gunakan ini jika Child tidak bisa hidup tanpa Parent (contoh: Tabel `Teacher` (Parent)  dan `Classes` (Child)).

```java
@OneToOne(mappedBy = "teacher", cascade = CascadeType.ALL)
private Classes classes;
```

* **Efek**: Jika Anda memanggil `entityManager.remove(teacher1)` untuk menghapus `Teacher`, maka data `Classes` yang terhubung juga **akan hilang** dari database.

### B. Menggunakan Cascade Terpilih (Spesifik)

* Gunakan ini jika kita ingin otomatis simpan, update, reload dan detach, tapi **tidak ingin** otomatis hapus (contoh: Tabel `Teacher` (Child)  dan `Classes` (Parent)).

```java
@OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
@JoinColumn(name = "teacher_id")
private Teacher teacher;
```

* **Efek**: Menyimpan, update, reload dan detach pada kelas(`Classes`) akan otomatis terjadi juga pada guru(`Teacher`). Namun, menghapus kelas(`Classes`) **tidak akan menghapus** gurunya(`Teacher`). Ini lebih aman untuk data referensi seperti Guru.

## 4️⃣ Kapan Harus Menggunakan Cascading?

1. **Gunakan Cascading** jika ada hubungan ketergantungan yang kuat (Parent-Child).
	* *Contoh*: Menghapus sebuah `Account` maka harus menghapus `AccountSettings`.
2. **Jangan Gunakan Cascading REMOVE** jika data Child masih dibutuhkan oleh entitas lain atau merupakan data master.
	* Contoh: Jangan hapus Guru (`Teacher`) hanya karena kelasnya (`Classes`) dibubarkan, karena Guru (`Teacher`) tersebut mungkin mengajar di kelas (`Classes`) lain.	

## 5️⃣ BONUS: Perbedaan Penting: `CascadeType.REMOVE` vs `orphanRemoval = true`

Seringkali programmer bingung antara keduanya:

* `CascadeType.REMOVE`: Jika Parent dihapus, Child dihapus. Tapi jika Anda hanya memutus hubungan (misal: `class12.setTeacher(null)`), Child **tetap ada** di database (menjadi data "yatim"/orphan).
* `orphanRemoval = true`: Jika Anda memutus hubungan (`setTeacher(null)`), Hibernate akan **langsung menghapus** Child tersebut dari database karena dianggap sudah tidak punya pemilik.

Contoh penggunaan `orphanRemoval = true`:

```java
// Menggunakan orphanRemoval = true
@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
@JoinColumn(name = "teacher_id")
private Teacher teacher;
```
