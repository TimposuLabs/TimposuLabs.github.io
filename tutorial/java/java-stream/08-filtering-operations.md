---
sidebar_position: 8
title: 'Filtering Operations'
---

Filtering operations adalah operasi di Stream yang digunakan untuk melakukan filter data Stream.

| Method | Keterangan |
| --- | --- |
| `filter(U -> Boolean)` | Mengambil data yang masuk kriteria filter |
| `distinct()` | Menghapus semua data duplikat |

## Contoh `filter()`

```java
 List.of("sapi", "domba", "hiu", "rusa", "anoa").stream()
        .filter(animal -> animal.length() <= 4) // mengambil data kata <= 4 karakter
        .forEach(System.out::println);

List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).stream()
        .filter(value -> value % 2 == 1) // mengambil bilangan ganjil
        .forEach(System.out::println);
```

Output:

```
sapi
hiu
rusa
anoa
1
3
5
7
9
```

## Contoh `distinct()`

```java
List.of("sapi", "kuda", "sapi", "kambing", "rusa", "kuda").stream()
        .distinct()
        .forEach(System.out::println);
```

Output:

```
sapi
kuda
kambing
rusa
```