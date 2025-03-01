---
sidebar_position: 7
title: 'Lambda Lazy Parameter'
---

Java tidak memiliki fitur parameter lazy seperti di bahasa pemrograman seperti Scala. Lazy parameter artinya, parameter tersebut hanya akan dieksekusi ketika diakses. Untungnya, dengan menggunakan Lambda, kita bisa membuat parameter layaknya lazy parameter.

## 🏃 Eager Parameter

* Contoh 

```java
 public static void main(String[] args) {
    testScoreEager(60, getName()); // akan selalu memanggil method getName()    
}

// secara default method java selalu Eager parameter
public static void testScoreEager(int score, String name) {
    if (score > 70) {
        System.out.println("Selamat " + name + " Anda lulus");
    } else {
        System.out.println("Anda tidak lulus");
    }
}

public static String getName() {
    System.out.println("Method getName() dipanggil");
    return "Ucup";
}
```

Output:

```
Method getName() dipanggil
Anda tidak lulus
```

Dari kode di atas dapat kita lihat bahwa di dalam Java pemanggilan method akan selalu bersifat Eager Parameter, yang artinya method `getName()` akan selalu dipanggil walaupun kondisi nilai score yang `60`, yang pada method `testScoreEager` parameter `name` tidak akan dieksekusi karena kondisi tidak sesuai. 

## 🛌 Lazy Parameter

Dengan menggunakan Lambda maka kita dapat menggunakan Lazy Parameter pada method tersebut di atas. Contoh:

```java
public static void main(String[] args) {
    testScoreLazy(60, () -> getName()); // method getName() hanya akan dipanggil jika kondisi terpenuhi (dalam contoh ini score > 70)
}

// dengan lazy parameter
public static void testScoreLazy(int score, Supplier<String> name) {
    if (score > 70) {
        System.out.println("Selamat " + name.get() + " Anda lulus");
    } else {
        System.out.println("Anda tidak lulus");
    }
}

public static String getName() {
    System.out.println("Method getName() dipanggil");
    return "Ucup";
}
```

Output:

```
Anda tidak lulus
```

Dari kode di atas parameter yang digunakan adalah `Suplier` yang akan akan mengembalikan result tanpa perlu mengirim parameter. Dengan menggunakan lambda maka parameter method akan bersifat Lazy yang akan mengeksekusi `getName` jika kondisi dalam method `testScoreLazy` terpenuhi saja.

:::info
📖 Baca Juga: [Functional Interface Suplier](/java/java-lambda/functional-interface#suplier)
:::
