---
sidebar_position: 16
title: 'Collectors'
---

## Collect Operation

Stream memiliki sebuah operator bernama `collect(Collector)`, method ini biasanya digunakan untuk meng-collect data Stream dan kita ubah menjadi struktur data yang kita inginkan, biasanya kebanyakan programmer Java menggunakan operator `collect()` untuk mengubah `Stream` menjadi `Collection`. Operator `collect()` membutuhkan parameter `Collector`, namun biasanya kita jarang sekali membuat implementasi interface `Collector`, karena terlalu kompleks. Untungnya Java `Stream` sudah menyediakan sebuah class helper untuk membuat `Collector`, bernama `Collectors.`

## Collectors

`Collectors` adalah class helper yang bisa digunakan untuk membuat `Collector`. Ini mempermudah kita ketika ingin melakukan operasi collect terhadap sebuah `Stream`. Ada banyak sekali static method yang terdapat di class `Collectors`, dan nanti kita akan coba bahas beberapa method yang sering digunakan.

:::info
Baca dokumentasi: https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Collector.html
:::

### Membuat Collection dengan Collectors

```java
Stream<String> getStream() {
    return Stream.of("Sapi", "Kambing", "Domba");
}

Set<String> set = getStream().collect(Collectors.toSet()); // konversi stream to set
System.out.println(set);
Set<String> immutableSet = getStream().collect(Collectors.toUnmodifiableSet()); // konversi stream to set immutable
System.out.println(immutableSet);

List<String> list = getStream().collect(Collectors.toList()); // konversi stream to list
System.out.println(list);
List<String> immutableList = getStream().collect(Collectors.toUnmodifiableList()); // konversi stream to list immutable
System.out.println(immutableList);
```

### Membuat Map dengan Collectors

Selain Collection, `Collectors` juga bisa digunakan untuk membuat `Map` dari String. Yang membedakan dengan `List` atau `Set`, kita harus tentukan function untuk membentuk `Key` dan `Value` nya jika ingin membuat `Map`. Ada banyak function yang bisa kita gunakan, seperti `Collectors.toMap(...)`, `Collectors.toConcurrentMap(...)` dan `Collectors.toUnmodifiableMap(...)`.

```java
Stream<String> getStream() {
    return Stream.of("Sapi", "Kambing", "Domba");
}

Map<Integer, String> map = getStream().collect(Collectors.toMap(
                name -> name.length(),
                name -> name
        ));
System.out.println(map);
```
