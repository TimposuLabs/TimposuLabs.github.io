---
sidebar_position: 14
title: 'For Each Operations'
---

`forEach` Operations berfungsi untuk mengiterasi data satu persatu. Selain `forEach`, ada juga method lain yang dapat digunakan untuk melakukan for each, tapi tanpa harus melakukan terminal operation.

| Method | Keterangan |
|---|---|
| `forEach(T -> void)` | Melakukan iterasi satu per satu data di Stream. Ini adalah terminal operation |
| `peek(T -> void)` | Melakukan iterasi satu per satu data di Stream, namun mengembalikan Stream lagi, dan ini bukanlah terminal operation |

* `forEach`: Operasi Terminal. Mengakhiri stream dan memulai eksekusinya. Tidak mengembalikan stream.
* `peek`: Operasi Intermediate. Tidak memulai eksekusi stream. Digunakan untuk "mengintip" saat stream masih mengalir, dan akan mengembalikan stream asalnya. Sering digunakan terutama untuk debugging (pemecahan masalah) atau logging (mencatat) elemen-elemen stream saat mereka diproses oleh operasi lain.


### `forEach`

```java
Stream.of("Ucup", "Budi", "Joko")
                .map(name -> {
                    System.out.println("Before change name to upper: " + name);
                    String upper = name.toUpperCase();
                    System.out.println("Change to Uppercase: " + upper);
                    return upper;
                })
                .forEach(name -> System.out.println("Final name " + name));
```

Output:

```
Before change name to upper: Ucup
Change to Uppercase: UCUP
Final name UCUP
Before change name to upper: Budi
Change to Uppercase: BUDI
Final name BUDI
Before change name to upper: Joko
Change to Uppercase: JOKO
Final name JOKO
```

###  `peek`

```java
Stream.of("Ucup", "Budi", "Joko")
                .peek(name -> System.out.println("Before change name to upper: " + name)) // melakukan peek data (mengintip), dengan melakukan iterasi elemen stream, dan mengembalikan stream asalnya
                .map(String::toUpperCase)
                .peek(upper -> System.out.println("Change to Uppercase: " + upper)) // melakukan peek data (mengintip), dengan melakukan iterasi elemen stream, dan mengembalikan stream asalnya
                .forEach(name -> System.out.println("Final name " + name));
```

Output sama dengan sebelumnya:

```
Before change name to upper: Ucup
Change to Uppercase: UCUP
Final name UCUP
Before change name to upper: Budi
Change to Uppercase: BUDI
Final name BUDI
Before change name to upper: Joko
Change to Uppercase: JOKO
Final name JOKO
```
