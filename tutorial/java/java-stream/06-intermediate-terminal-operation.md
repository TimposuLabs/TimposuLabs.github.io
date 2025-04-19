---
sidebar_position: 6
title: 'Intermediate & Terminal Operations'
---

Secara garis besar, ada 2 jenis Stream Operation, yaitu Intermediate dan Terminal Operations. Intermediate Operations merupakan lazy operation, dimana Stream tidak akan dieksekusi sampai memang dibutuhkan. Sedangkan Terminal Operations merupakan operasi yang mentrigger sebuah Stream berjalan. Karena Intermediate Operations adalah lazy, maka secara garis besar, semua Intermediate Operations akan mengembalikan Stream lagi.

![stream intermediate operation dan steam terminal operation](/img/java/stream-operations.png)

*source: https://logicmojo.com/java8-feature-questions*

## Lazy Evaluation

Stream secara default adalah lazy. Dia tidak akan mengalirkan data jika belum menggunakan terminal operation. Selain itu, data hanya akan dialirkan seperlunya saja, tergantung terminal operation nya.

## Intermediate Operations vs Terminal Operations

Konsep Stream Pipeline adalah penghubung antar operasi/operation. Operasi pada Stream pipeline terbagi menjadi dua kategori: 

1. __Intermediate Operations__
2. __Terminal Operations__

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

Contoh Intermediate Operations:

```java
List<String> animals = List.of("Kucing", "Anjing", "Ayam", "Kambing", "Sapi");

Stream<String> streamList = animals.stream()
        .map(data -> {
            System.out.println("Change : " + data + "to Uppercase");
            return data.toUpperCase();
        });
```

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

Contoh Terminal Operations:

```java
List<String> animals = List.of("Kucing", "Anjing", "Ayam", "Kambing", "Sapi");

animals.stream()
        .map(data -> {
            System.out.println("Change : " + data + " to Uppercase");
            return data.toUpperCase();
        }).map((data) -> {
            System.out.println("Hewan " + data + " diubah");
            return "Hello " + data;
        }).forEach(System.out::println);
```
