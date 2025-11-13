---
sidebar_position: 11
title: 'Ordering Operations'
---

Java Stream juga mendukung operasi untuk melakukan pengurutan data dalam Stream. Secara default, data akan diurutkan mengikuti Comparable yang terdapat pada data yang ada di Stream. Jika kita ingin mengurutkan secara manual, kita bisa menggunakan Comparator sendiri.

| Method | Keterangan |
| --- | --- |
| `sorted()` | Mengurutkan berdasarkan comparable data |
| `sorted(Comparator)` | Mengurutkan berdasarkan comparator |

:::info
**Baca Juga :**
* [Java Comparable](/blog/java-comparable-interface)
* [Java Comparator](/blog/java-comparator-interface)
:::

```java
List.of("sapi", "domba", "hiu", "rusa", "anoa").stream()
                .sorted()
                .forEach(System.out::println);
```