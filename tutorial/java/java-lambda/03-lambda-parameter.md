---
sidebar_position: 3
title: 'Lambda Parameter'
---

Pada tutorial sebelumnya kita sudah membuat Lambda pertama, pada tutorial kali ini kita akan membuat Lambda dengan parameter method `String action(String message)`.

## Function Interface

Membuat Function Interface dengan parameter method `String action(String message)`:

```java
@FunctionalInterface
interface SimpleActionParameter {

    String action(String message);

}
```

## Menggunakan Lambda

Interface functional di atas dapat digunakan menggunakan lambda seperti di bawah ini:

```java
// menggunakan Lambda dengan menuliskan type parameter
SimpleActionParameter actionParameter1 = (String message) -> {
    return "Message 1: " + message;
};

```

Penulisan ekspresi lambda di atas dapat di variasikan seperti contoh di bawah ini:

```java
@FunctionalInterface
interface SimpleActionParameter {

    String action(String message);

}

public class DemoLambdaParameter {
    public static void main(String[] args) {

        // menggunakan Lambda dengan menuliskan type parameter
        SimpleActionParameter actionParameter1 = (String message) -> {
            return "Message 1: " + message;
        };

        System.out.println(actionParameter1.action("Salam dari lambda parameter 1"));

        // menggunakan Lambda tanpa menuliskan type parameter
        SimpleActionParameter actionParameter2 = (message) -> {
            return "Message 2: " + message;
        };

        System.out.println(actionParameter2.action("Salam dari lambda parameter 2"));

        // Lambda tanpa blok: jika block dalam 1 line
        SimpleActionParameter actionParameter3 = (String message) -> "Message 3: " + message;
        SimpleActionParameter actionParameter4 = (message) -> "Message 4: " + message;
        SimpleActionParameter actionParameter5 = message -> "Message 5: " + message;

        System.out.println(actionParameter3.action("Salam dari lambda parameter 3"));
        System.out.println(actionParameter4.action("Salam dari lambda parameter 4"));
        System.out.println(actionParameter5.action("Salam dari lambda parameter 5"));
    }
}
```

Contoh Lain:

```java
@FunctionalInterface
interface Kotak {
    int hitung(int x);
}

public class DemoLambda {
    public static void main(String[] args) {
        int nilai = 10;

        // membuat lambda expression sesuai dengan yang difeinisikan pada method hitung 
        Kotak kotak = (int x) -> x * x;

        var hitung = kotak.hitung(nilai);
        System.out.println(hitung);
    }
}
```