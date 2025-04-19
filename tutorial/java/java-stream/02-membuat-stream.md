---
sidebar_position: 2
title: 'Membuat Stream'
---

## 1️⃣ Membuat Empty Stream

```java
// Stream Empty
Stream<String> streamEmpty = Stream.empty();
```

## 2️⃣ Membuat Single Stream

```java
// Stream one data Stream
Stream<String> oneStream = Stream.of("Timposulabs");
```

## 3️⃣ Stream Empty or Not Empty Stream

```java
// Stream empty or not empty stream
String value = null;
Stream<String> emptyOrNotEmptyStream = Stream.ofNullable(value);
```

## 4️⃣ Stream dari Array

```java
Stream<String> citiesStream = Stream.of("Bandung", "Surabaya", "Semarang");

citiesStream.forEach((data) -> {
    System.out.println(data);
});

Stream<Integer> integerStream = Stream.of(1, 3, 5, 7);
integerStream.forEach(System.out::println);

String[] array = {
        "Indonesia", "Malaysia", "Thailand"
};

Stream<String> streamFromArray = Arrays.stream(array);
streamFromArray.forEach(System.out::println);
```

## 5️⃣ Stream dari Collection

```java
Collection<String> collections = List.of("Sapi", "Kambing", "Domba");
collections.forEach(System.out::println);
```

## 6️⃣ Stream Infinity

Kita dapat membuat Stream tidak terbatas.

```java
Stream<String> stream = Stream.generate(() -> "Kacau");
//        stream.forEach(System.out::println);

Stream<Integer> iterate = Stream.iterate(1, value -> value + 2);
//        iterate.forEach(System.out::println);
```