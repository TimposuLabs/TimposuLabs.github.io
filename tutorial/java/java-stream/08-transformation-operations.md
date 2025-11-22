---
sidebar_position: 8
title: 'Transformation Operations'
---

Ada banyak Stream Operations di Java Stream, kita akan mulai bahas dari Transformation Operations. Transformation Operations adalah operasi yang digunakan untuk mengubah bentuk Stream. Ada banyak function yang bisa digunakan untuk mengubah bentuk Stream menjadi sebuah Stream baru, contohnya `map` dan `flatMap`.

| Method | Keterangan |
|  --- | --- |
| `map(T -> U)` | Mengubah data T menjadi data U |
| `flatMap(T -> Stream<U>)` | Mengubah Stream T menjadi Stream U |

Secara garis besar perbedaannya 

* `map` -> merubah data ke data yang lain
* `flatMap` -> merubah data ke stream yang lain

### Contoh `map`:

```java
Stream.of("Kucing", "Badak", "Gajah", "Jerapah")
    .map(String::toUpperCase) // mengubah elemen data menjadi uppercase
    .map(String::length) // mengubah menjadi integer
    .forEach(System.out::println);
```

Output

```
6
5
5
7
```

### Contoh `flatMap`:

```java
Stream.of("Kucing", "Badak", "Gajah", "Jerapah")
        .map(String::toUpperCase) // mengubah elemen data menjadi uppercase
        .flatMap(value -> Stream.of(value, value.length())) // flatMap wajib mengembalikan nilai Stream lagi
        .flatMap(value -> Stream.of(value, value, value)) // flatMap wajib mengembalikan nilai Stream lagi
        .forEach(System.out::println);
```

Output

```
KUCING
KUCING
KUCING
6
6
6
BADAK
BADAK
BADAK
5
5
5
GAJAH
GAJAH
GAJAH
5
5
5
JERAPAH
JERAPAH
JERAPAH
7
7
7
```

:::info
Cara kerja Java Stream berbeda dengan Collection, yang akan memproses datanya sekaligus, data pada Java Stream akan di proses satu per satu.
:::