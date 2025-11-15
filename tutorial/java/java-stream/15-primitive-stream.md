---
sidebar_position: 15
title: 'Primitive Data Stream'
---

Implementasi Stream di Java adalah `java.util.stream.Stream<T>`, dan Java Generic hanya bisa menampung tipe data Object. Namun bagaimana jika kita butuh melakukan stream terhadap data primitive seperti int, long atau double?.
Karena untuk maka di Java Stream, dibuat implementasi Stream khusus untuk tipe data primitive.

| Class | Keterangan |
|---|---|
| `java.util.stream.IntStream` | Stream untuk tipe data `int` |
| `java.util.stream.LongStream` | Stream untuk tipe data `long` |
| `java.util.stream.DoubleStream` | Stream untuk tipe data `double` |

## Primitive Stream Operations

Hampir semua stream operator yang pernah kita bahas, ada juga di primitive stream class. Bahkan ada beberapa operator yang lebih sederhana, seperti untuk aggregate, kita tidak perlu menggunakan comparator lagi, bahkan ada operator `average()` untuk menghitung rata-rata di primitive stream. Cara pembuatan primitive stream pun hampir mirip dengan Stream biasa, kita bisa gunakan static method di class nya, misal `IntStream.of(...)`, `IntStream.builder()`, dan lain-lain.

Berikut beberapa contoh Stream Primitive:

### Membuat Stream Primitive

```java
IntStream intStream = IntStream.of(1, 3, 5);
intStream.forEach(System.out::println);
```

Output:

```
1
3
5
```

### Membuat Stream Primitive dengan Builder

```java
DoubleStream doubleStream = DoubleStream.builder().add(20.5).add(10.75).build();
doubleStream.forEach(System.out::println);
```

Output:

```
20.5
10.75
```

### Range

```java
LongStream longStream = LongStream.range(1, 10);
longStream.forEach(System.out::println);
```

Output:

```
1
2
3
4
5
6
7
8
9
```

### Stream Primitive Operation

Berikut contoh operation `average`, operation lain tersedia seperti `min`, `max` dll.

```java
IntStream intStream = IntStream.range(1, 50);

OptionalDouble optionalDouble = intStream.average(); // operation average
optionalDouble.ifPresent(System.out::println);
```

Output:

```
25.0
```

### Konversi

```java
IntStream.range(0, 10)
                .mapToObj(number -> "Number: " + number) // konversi primitive stream ke stream object
                .forEach(System.out::println);
```

Output

```
Number: 0
Number: 1
Number: 2
Number: 3
Number: 4
Number: 5
Number: 6
Number: 7
Number: 8
Number: 9
```