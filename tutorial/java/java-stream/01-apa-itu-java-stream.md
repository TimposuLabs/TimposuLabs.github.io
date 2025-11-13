---
sidebar_position: 1
title: 'Apa itu Java Stream?'
---

__Java Stream__ diperkenalkan pertama kali di Java versi 8 atau 1.8. Java Stream adalah alur elemen yang mendukung operasi fungsional seperti filtering, mapping, dan looping.

## :thinking: Fitur Java Stream

* `Stream` bukan struktur data — tidak menyimpan apa pun — tetapi beroperasi pada data dari collection, array, atau input I/O.
* `Stream` bersifat fungsional. Operasi yang dilakukan pada `Stream` tidak mengubah data sumbernya. Misalnya, melakukan filter pada `Stream` yang diperoleh dari suatu `Collection` akan menghasilkan `Stream` baru tanpa elemen yang difilter, tanpa menghapus elemen dari sumber `Collection`.
* `Stream` bersifat lazy dan akan memproses kode program hanya ketika ketika diperlukan.
* Elemen-elemen pada `Stream` hanya dijalankan satu kali selama `Stream` tersebut berlangsung. Seperti pada `Iterator`, `Stream` baru harus dihasilkan untuk mmenjalankan kembali elemen-elemen yang sama dari sumbernya.

![java stream](/img/java/java-stream.jpg)

*source: https://logicmojo.com/java8-feature-questions*

## :books: Konsep Stream Pipeline

Konsep Stream Pipeline adalah penghubung antar operasi/operation. Operasi pada Stream pipeline terbagi menjadi dua kategori: 

1. __Intermediate Operations__
2. __Terminal Operations__

Setiap Intermediate Operations akan mengembalikan nilai Stream lagi. Akibatnya, kita dapat membuat pipeline pemrosesan dengan jumlah Intermediate Operations secara bebas untuk memproses data.

Stream kemudian harus dihentikan menggunakan Terminal Operations yang mengembalikan nilai akhir.

![stream intermediate operation dan steam terminal operation](/img/java/stream-operations.png)

*source: https://logicmojo.com/java8-feature-questions*

### 1️⃣ Java Stream Intermediate Operations

Intermediate operations bersifat lazy operations yang berfungsi:

1. Mengubah atau memfilter elemen dalam aliran
2. Tidak dapat menghasilkan hasil akhir sampai Terminal Operation dipanggil
3. Dapat dirantai untuk membangun alur stream pipeline

#### Method Intermediate Operation yang sering digunakan

* `filter()`
* `map()`
* `flatMap()`
* `distinct()`
* `sorted()`
* `peek()`
* `limit()`
* `skip()`
* `takeWhile()` (Java 9+)
* `dropWhile()` (Java 9+)

### 2️⃣ Java Stream Terminal Operations

Terminal Operations adalah **final step** dalam stream pipeline, yang bersifat:

* Menghasilkan **result** (collection, number, boolean, dll.)
* Akan melakukan **Trigger** stream execution
* Akan melakukan **Consume** terhadap stream (stream tidak dapat digunakan kembali)

#### Method Terminal Operation yang sering digunakan

| Operations | Description | Return Type |
| --- | --- | --- |
| `forEach()` | Menerapkan tindakan pada setiap item | void |
| `toArray()` | Konversi elemen stream ke array | `T[]` |
| `collect()` | Menerapkan elemen ke Collection/map/string | `R(varies)` |
| `reduce()` | Melakukan reduksi pada elemen menggunakan operator biner | `Optional<T>` or `<T>` |
| `min()` | Nilai minimum dari comparator | `Optional<T>` |
| `max()` | Nilai maximal dari comparator | `Optional<T>` |
| `count()` | Jumlah element | long |
| `anyMatch()` | Mengembalikan true jika ada elemen cocok dengan predicate yang diberikan | boolean |
| `allMatch()` | Mengembalikan true jika semua elemen cocok dengan predicate yang diberikan | boolean |
| `noneMatch()` | Mengembalikan true jika tidak ada elemen cocok dengan predicate yang diberikan | boolean |
| `findFirst()` | Mengembalikan elemen pertama (jika ada) | `Optional<T>` |
| `findAny()` | Mengembalikan elemen apapun | `Optional<T>` |

Di bawah ini merupakan properties class `Stream` pada paket `java.util.stream` di Java 21. Method kemungkinan akan bertambah di kemudian hari, seiring peningkatan versi Java.

![java stream](/img/java/java-stream.png)

## Sifat Java Stream

Secara default, Stream itu bersifat Cold, artinya data di Stream tidak akan mengalir sampai kita memintanya. Ada banyak cara untuk meminta Stream mulai mengalirkan datanya, dengan menggunakan Stream Operations. Stream hanya bisa jalan sekali, mirip seperti aliran data, setelah mengalir, aliran data tidak bisa diulang lagi dari awal.

## 🌐 Baca Juga

* https://logicmojo.com/java8-feature-questions
* https://rameshfadatare.medium.com/java-stream-api-from-beginner-to-pro-in-one-ultimate-guide-edf069dbc8e2*
* https://dev.java/learn/api/streams/