---
sidebar_position: 13
title: 'Check Operations'
---

Check Operations adalah operasi yang digunakan untuk melakukan pengecekan data di dalam Stream. Ada banyak sekali operasi yang bisa digunakan untuk melakukan pengecekan, dan hasil operasi check adalah boolean.

| Method | Keterangan |
|---|---|
| `anyMatch(T -> Boolean)` | Apakah ada salah satu data yang match dengan kondisi |
| `allMatch(T -> Boolean)` | Apakah semua data match dengan kondisi |
| `noneMatch(T -> Boolean)` | Apakah semua data tidak match dengan kondisi |


### `anyMatch`

```java
boolean match = List.of(1, 3, 5, 7, 9, 11, 13, 15, 17, 19).stream()
                .anyMatch(number -> number > 15); // mengembalikan true jika ada yang cocok

System.out.println(match);
```

Output:

```
true
```

### `allMatch`

```java
boolean match = List.of(1, 3, 5, 7, 9, 11, 13, 15, 17, 19).stream()
                .allMatch(number -> number > 0); // mengembalikan true jika semua cocok

System.out.println(match);
```

Output:

```
true
```

### `noneMatch`

```java
boolean match = List.of(1, 3, 5, 7, 9, 11, 13, 15, 17, 19).stream()
                .noneMatch(number -> number > 20); // mengembalikan true jika semua tidak ada yang cocok

System.out.println(match);
```

Output:

```
true
```