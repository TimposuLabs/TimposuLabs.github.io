---
sidebar_position: 10
title: 'Retrieving Operations'
---

Retrieving Operations adalah operasi pada `Stream` untuk melakukan pengambilan sebagian data. Prinsip kerja Retrieving Operations hampir mirip dengan Filtering.

| Method | Keterangan |
| --- | --- |
| `limit(n)` | Mengambil sejumlah `n` data |
| `skip(n)` |  Menghiraukan sejumlah `n` data |
| `takeWhile(T -> Boolean)` | Mengambil data selama kondisi `true` |
| `dropWhile(T -> Boolean)` | Menghiraukan data selama kondisi `true` |

### `limit`

```java
 List.of("sapi", "domba", "hiu", "rusa", "anoa").stream()
                .limit(2) // mengambil 2 data
                .forEach(System.out::println);
```

### `skip`

```java
List.of("sapi", "domba", "hiu", "rusa", "anoa").stream()
                .skip(2) // lompat 2 data
                .forEach(System.out::println);
```

### `takeWhile`

```java
 List.of("sapi", "domba", "hiu", "rusa", "anoa").stream()
                .takeWhile(animal -> animal.length() <= 4)  // mengambil data jika selama kondisi true dan TIDAK AKAN mengambil data lagi jika false
                .forEach(System.out::println);
```

### `dropWhile`

```java
List.of("sapi", "domba", "hiu", "rusa", "anoa").stream()
                .dropWhile(animal -> animal.length() <= 4) // skip data selama kondisi true dan akan mengambil data jika kondisi false dan data selanjutnya akan terus diambil
                .forEach(System.out::println);
```

 ## Retrieving Single Element
`Stream` juga memiliki kemampuan untuk mengambil satu element saja, namun operasi jenis ini merupakan operasi terminal, sehingga akan secara otomatis menjalankan aliran data di Stream:

| Method | Keterangan |
| --- | --- |
| `findAny()` | Mengambil random satu element |
| `findFirst()` | Mengambil element pertama |

:::info
__Catatan:__ kedua operasi di atas sifatnya Optional jadi datanya bisa ada atau tidak
:::

### `findAny`

```java
 Optional<String> optional = Stream.of("sapi", "domba", "hiu", "rusa", "anoa")
                .findAny();

optional.ifPresent(System.out::println);
```

### `findFirst`

```java
Optional<String> optional = Stream.of("sapi", "domba", "hiu", "rusa", "anoa")
                .findFirst();

optional.ifPresent(System.out::println);
```