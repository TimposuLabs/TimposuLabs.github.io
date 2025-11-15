---
sidebar_position: 12
title: 'Aggregate Operations'
---

Java Stream mendukung banyak operasi untuk melakukan proses aggregate. Seperti menghitung jumlah data, menghitung data max dan menghitung data min.

| Method | Keterangan |
| --- | ---|
| `max(Comparator)` | Mencari data max sesuai comparator |
| `min(Comparator)` | Mencari data min sesuai comparator |
| `count()` | Menghitung total data |

### `min`

```java
// Aggregate min dengan melakukan comparator terhadap stream
List.of("sapi", "domba", "hiu", "rusa", "anoa", "zebra").stream()
                .min(Comparator.naturalOrder())
                .ifPresent(System.out::println);
```

Output:

```
zebra
```

### `max`

```java
// Aggregate max dengan melakukan comparator terhadap stream
List.of("sapi", "domba", "hiu", "rusa", "anoa", "zebra").stream()
                .max(Comparator.naturalOrder())
                .ifPresent(System.out::println);
```

Output:

```
anoa
```

### `count`

```java
long count = List.of("sapi", "domba", "hiu", "rusa", "anoa", "zebra").stream()
                .count();
System.out.println(count);
```

Output:

```
6
```

## Manual Aggregate dengan menggunakan Reduce

Java Stream juga menyediakan sebuah operasi yang bernama reduce. Reduce bisa digunakan untuk melakukan proses aggregate secara manual. Misal kita ingin menjumlahkan seluruh angka yang terdapat di Stream, kita bisa melakukan ini menggunakan reduce operator. Di bahasa pemrograman lain, reduce mirip seperti operasi fold.

```java
 var result = List.of(1, 3, 5, 7, 9).stream()
                .reduce(0, (value, item) -> value + item);

// Penjelasan:
// 0 -> inisialisasi nilai 0 sebagai "value" awal, kemudian menjumlahkan dengan "item" dari stream list (value + item)
// iterasi ke 1: value=0 item=1 = 1
// iterasi ke 2. value=1 item=3 = 4
// iterasi ke 3. value=4 item=5 = 9
// iterasi ke 4. value=9 item=7 = 16
// iterasi ke 5. value=16 item=9 = 25

System.out.println(result);
```

Output:

```
25
```

Contoh lain kita dapat menerapkan perhitungan factorial:

```java
var factorial = List.of(1, 2, 3, 4, 5).stream()
                .reduce(1, (value, item) -> value * item);

// 1. value=1 * item=1 = 1
// 2. value=1 * item=3 = 4
// 3. value=4 * item=5 = 9
// 4. value=9 * item=7 = 16
// 5. value=16 * item=9 = 25

System.out.println(factorial);
```

Output:

```
120
```