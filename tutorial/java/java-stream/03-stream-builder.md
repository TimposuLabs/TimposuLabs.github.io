---
sidebar_position: 3
title: 'Stream Builder'
---

Kita dapat membuat Stream secara manual, seperti menambah datanya ke Stream secara manual. Java menyediakan Stream Builder untuk membuat Stream secara manual, dan kita bisa menggunakannya seperti Collection, kita bisa membuat Stream Builder, menambahkan data ke Stream Builder, setelah selesai, baru kita buat Stream nya.

:::info
Dokumentasi Stream Builder: https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.Builder.html
:::

## 📖 Beberapa method Stream Builder

| Modifier & Type | Method | Description |
| --- | --- | --- |
| `void` |	`accept​(T t)` | Menambahkan elemen ke Stream yang sedang di Builder. |
| `default Stream.Builder<T>` |	`add​(T t)` | Menambahkan elemen ke Stream yang sedang di Builder. |
| `Stream<T>` |	`build()` | Melakukan Build terhadap Stream, mengubah Builder ke build state |

Contoh membuat Stream Builder

```java
Stream.Builder<String> builder = Stream.builder();
builder.accept("Sapi"); // menambah data
builder.add("Domba").add("Kambing"); // menambah data dengan add() dapat berulang karena add() sendiri adalah Builder

Stream<String> streamBuilder = builder.build();
streamBuilder.forEach(System.out::println);
```

Output:

```
Sapi
Domba
Kambing
```

Contoh Stream Builder yang lebih sederhana:

```java
Stream<Object> builder = Stream.builder()
        .add("Sapi").add("Domba").add("Kambing").build();

builder.forEach(System.out::println);
```

Output yang dihasilkan sama dengan sebelumnya.