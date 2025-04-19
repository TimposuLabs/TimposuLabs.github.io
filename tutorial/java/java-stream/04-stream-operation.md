---
sidebar_position: 4
title: 'Stream Operation'
---

Berbeda dengan Java Collection, di Java Stream hal yang sangat menarik adalah fitur Stream Operations nya. Stream Operations adalah kumpulan operasi-operasi yang bisa kita gunakan untuk memanipulasi Stream itu sendiri. Ada banyak sekali jenis-jenis Stream Operations yang nanti akan kita bahas satu persatu. Namun secara garis besar, Stream Operations tidak akan memodifikasi data aslinya, melainkan hasil dari Stream Operations adalah sebuah Stream baru.

![stream intermediate operation dan steam terminal operation](/img/java/stream-operations.png)

*source: https://logicmojo.com/java8-feature-questions*

Konsep Stream Pipeline adalah penghubung antar operasi/operation. Operasi pada Stream pipeline terbagi menjadi dua kategori: 

__1. Intermediate Operations__
__2. Terminal Operations__

## 1️⃣ Java Stream Intermediate Operations

Intermediate operations bersifat lazy operations yang berfungsi:

1. Mengubah atau memfilter elemen dalam aliran
2. Tidak dapat menghasilkan hasil akhir sampai Terminal Operation dipanggil
3. Dapat dirantai untuk membangun alur stream pipeline

### Method Intermediate Operation yang sering digunakan

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

## 2️⃣ Java Stream Terminal Operations

Terminal Operations adalah **final step** dalam stream pipeline, yang bersifat:

* Menghasilkan **result** (collection, number, boolean, dll.)
* Akan melakukan **Trigger** stream execution
* Akan melakukan **Consume** terhadap stream (stream tidak dapat digunakan kembali)

### Method Terminal Operation yang sering digunakan

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

### Contoh

```java
List<String> burung = List.of("Merpati", "Perkutut", "Pipit");

Stream<String> streamBurung = burung.stream();
Stream<String> burungUpper = streamBurung.map(String::toUpperCase); // Intermediate Operation

burung.forEach(System.out::println); // Terminal Operation
burungUpper.forEach(System.out::println); // Terminal Operation
```

Output:

```
Merpati
Perkutut
Pipit
MERPATI
PERKUTUT
PIPIT
```