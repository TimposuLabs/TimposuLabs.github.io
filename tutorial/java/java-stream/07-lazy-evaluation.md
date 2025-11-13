---
sidebar_position: 7
title: 'Lazy Evaluation'
---

Stream secara default adalah lazy, Stream tidak akan mengalirkan data jika belum menggunakan terminal operation. Selain itu, data hanya akan dialirkan seperlunya saja, tergantung terminal operation nya.

## Intermediate Operations & Terminal Operations

Secara garis besar, ada 2 jenis Stream Operation, yaitu Intermediate dan Terminal Operations. Intermediate Operations merupakan lazy operation, dimana Stream tidak akan dieksekusi sampai memang dibutuhkan. Sedangkan Terminal Operations merupakan operasi yang mentrigger sebuah Stream berjalan. Karena Intermediate Operations adalah lazy, maka secara garis besar, semua Intermediate Operations akan mengembalikan Stream lagi

### Intermediate Operations

```java
List<String> animals = List.of("Kucing", "Anjing", "Ayam", "Kambing", "Sapi");

        // Intermediate Operations akan mengembalikan Stream lagi
        Stream<String> streamList = animals.stream()
                .map(data -> {
                    System.out.println("Change : " + data + "to Uppercase");
                    return data.toUpperCase();
                });
```

### Terminal Operations

```java
List<String> animals = List.of("Kucing", "Anjing", "Ayam", "Kambing", "Sapi");

        // Membuat Stream dengan Intermediate Operations yang di akhiri dengan Terminal Operations
        animals.stream()
                .map(data -> {
                    System.out.println("Change : " + data + " to Uppercase");
                    return data.toUpperCase();
                }).map((data) -> {
                    System.out.println("Hewan " + data + " diubah");
                    return "Hello " + data;
                }).forEach(System.out::println);
```