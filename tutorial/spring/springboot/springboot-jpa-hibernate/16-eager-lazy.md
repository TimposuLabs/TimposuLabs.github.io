---
sidebar_position: 16
title: 'Fetch Type: Eager vs Lazy'
---

Dalam Hibernate, **Eager** dan **Lazy** Fetching adalah strategi untuk mengambil/read data relasional dari database.

## 1️⃣ Lazy Fetching (Default untuk Collections)

**Lazy Fetching** adalah strategi "tunda". Hibernate hanya akan mengambil data entity utama terlebih dahulu. Data relasi baru akan diambil dari database jika dan hanya jika kita memanggilnya (misalnya melalui method `getter`).

* **Cara Kerja:** Hibernate membuat objek "Proxy" (palsu). Query `SELECT` tambahan hanya dijalankan jika data tersebut dipanggil.
* **Kelebihan:** Menghemat memori dan mempercepat beban awal objek utama.
* **Kekurangan:** Berisiko menyebabkan `LazyInitializationException` jika data diakses setelah *Session* ditutup. Juga dapat memicu masalah **N+1 Query**.

```java
@OneToMany(mappedBy = "classes", fetch = FetchType.LAZY)
List<Student> students = new ArrayList<>();
```

## 2️⃣ Eager Fetching (Default untuk Single Object)

**Eager Fetching** adalah strategi di mana Hibernate akan mengambil entity utama beserta seluruh entity yang berelasi dengannya secara langsung dalam satu waktu (biasanya menggunakan `JOIN`).

* **Cara Kerja:** Saat kita mengambil objek utama, Hibernate otomatis mengambil semua data relasinya.
* **Kelebihan:** Data selalu tersedia, tidak ada risiko `LazyInitializationException`.
* **Kekurangan:** Performa menurun jika data relasi sangat besar atau banyak, karena query menjadi sangat berat.

```java
@ManyToOne(fetch = FetchType.EAGER)
@JoinColumn(name = "class_id")
private Classes classes;
```

## 3️⃣ Perbandingan

| Fitur |	Lazy Fetching	| Eager Fetching |
| --- | --- | --- |
| **Waktu Load** |	Saat data dibutuhkan (*On-demand*)	| Langsung (*Initial load*) |
| **Performa**	| Lebih efisien untuk data besar	| Lebih lambat jika relasi banyak |
| **Default**	| `@OneToMany`, `@ManyToMany`	| `@ManyToOne`, `@OneToOne`
| **Metode Query** |	*Multiple queries* (kecuali di-join) |	*Single query* dengan JOIN |


## 4️⃣ Default Fetch Type

| Tipe Relasi	| Default Fetch Type	| Penjelasan |
| --- | --- | --- |
| `@ManyToOne`	| **EAGER** |	Saat mengambil data anak/child (contoh: `Student`), data induk (contoh: `Classes`) otomatis ikut diambil. |
| `@OneToOne`	| **EAGER** |	Saat mengambil entitas utama, entitas yang berelasi 1-ke-1 langsung ikut dimuat. |
| `@OneToMany` |	**LAZY** |	Koleksi data anak/child tidak akan dimuat sampai Anda memanggil metode `.getStudents()`. |
| `@ManyToMany` |	**LAZY** |	Karena potensi data yang sangat besar, Hibernate tidak akan memuat relasi ini secara otomatis. |

## 5️⃣ Rekomendasi Penggunaan

1. Gunakan **Lazy** secara default untuk hampir semua relasi guna menjaga performa aplikasi.
2. Gunakan **Eager** hanya jika Anda yakin 100% bahwa data relasi tersebut akan selalu digunakan setiap kali objek utama dipanggil.
3. Untuk mengatasi masalah performa pada Lazy, gunakan **Join Fetch** dalam query HQL/JPQL agar data diambil secara selektif dalam satu query.

:::tip
**Cara Menghapal:**
* Relasi yang berakhiran "**...ToOne**" secara default adalah **EAGER**.
* Relasi yang berakhiran "**...ToMany**" secara default adalah **LAZY**.
:::

:::info
Dalam Hibernate/JPA, **Join Fetch** adalah teknik kueri yang digunakan untuk mengambil entitas utama beserta entitas relasinya (anak-anaknya) dalam **satu kali perintah SQL SELECT**.

Tujuan utamanya adalah untuk mengatasi masalah performa yang dikenal sebagai **N+1 Select Problem**.

Berikut penjelasan mendalamnya:

**1. Masalah: N+1 Select Problem (Tanpa Fetch)**

Secara default, relasi seperti `@OneToMany` bersifat **LAZY**.

* **Query 1**: Anda mengambil data Kelas (`SELECT * FROM classes`).
* **Query N**: Saat Anda melakukan loop untuk melihat siswa di setiap kelas, Hibernate akan menjalankan kueri baru untuk **setiap** kelas (`SELECT * FROM student WHERE class_id = ?`).
* **Hasilnya**: Jika ada 100 kelas, Anda menjalankan 1 + 100 kueri. Ini sangat lambat.

**2. Solusi: Join Fetch**

Dengan menggunakan `JOIN FETCH` dalam HQL (*Hibernate Query Language*), Hibernate akan melakukan **SQL JOIN** dan langsung mengisi semua data ke dalam objek Java dalam satu kali jalan.

```java
// Mengambil Kelas DAN Siswanya sekaligus dalam 1 kueri
String hql = "SELECT c FROM Classes c JOIN FETCH c.students WHERE c.id = :id";
Classes tempClass = session.createQuery(hql, Classes.class)
                           .setParameter("id", 1)
                           .getSingleResult();
```
:::