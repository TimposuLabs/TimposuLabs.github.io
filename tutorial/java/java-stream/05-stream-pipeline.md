---
sidebar_position: 5
title: 'Stream Pipeline'
---

Saat kita membuat Stream, biasanya kita akan melakukan banyak operasi terhadap Stream tersebut. Dan biasanya kita akan membuat Stream Pipeline. Stream Pipeline terdiri dari sebuah sumber stream (bisa array, collection dan lain-lain), lalu diikuti dengan stream operations (Intermediate Operation) dan diakhiri dengan operasi akhir (Terminal Operation), misalnya `forEach`. Saat menggunakan Stream, hampir kebanyakan kita pasti akan membuat sebuah Stream Pipeline.

![java stream](/img/java/java-stream.jpg)

*source: https://logicmojo.com/java8-feature-questions*

Contoh sebuah alur Stream Pipeline tapi bukan merupakan best practice:

```java
// Jarang digunakan bukan Best Practice
List<String> days = List.of("Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu");
Stream<String> streamDays = days.stream();
Stream<String> streamDaysUpper = streamDays.map(String::toUpperCase);
Stream<String> streamDaysCustom = streamDaysUpper.map((day) -> "Hari: " + day);
streamDaysCustom.forEach(System.out::println);
```

Berikut contoh Stream Pipeline yang sering digunakan, atau yang direkomendasikan:

```java
List<String> days = List.of("Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu");

// Stream pipeline sering digunakan Recommended
days.stream()
        .map(String::toUpperCase)
        .map(day -> "Hari: " + day)
        .forEach(System.out::println);
```

Output:

```
Hari: MINGGU
Hari: SENIN
Hari: SELASA
Hari: RABU
Hari: KAMIS
Hari: JUMAT
Hari: SABTU
Hari: MINGGU
```