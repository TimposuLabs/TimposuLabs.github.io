---
sidebar_position: 2
title: 'Membuat Lambda'
---

Setelah kita mengenal apa itu Lambda, pada tutorial kali ini kita akan membuat Lambda pertama kita. 

## 1. Membuat Interface Function

Jadi yang pertama kita harus membuat sebuah interface dengan menambahkan anotation `@FunctionalInterface` pada interfacenya untuk memberitahu compiler bahwa interface tersebut adalah sebuah interface functional.

```java
@FunctionalInterface
interface SimpleAction {

    String action();

}
```

## 2. Menggunakan Class Anonymous

Setelah memiliki interface function kita dapat menggunakan interface tersebut menggunakan class anonym.

```java
SimpleAction simpleAction = new SimpleAction() {
    @Override
    public String action() {
        return "Halo Bro!!!";
    }
};
```

## 3. Menggunakan Lambda

Setelah menggunakan class anonym seperti pada contoh di atas, kita dapat menyederhanakan penulisan kode class anonym di atas menggunakan ekspresi Lambda seperti di bawah ini:

```java
SimpleAction simpleActionLambda = () -> {
    return "Halo Bro dari Lambda!!!";
};
```

Dengan menggunakan ekspresi Lambda kita tidak perlu menulis kode panjang anonymous class seperti contoh sebelumnya. Tetapi penulisan ekspresi lambda ini masih dapat disederhanakan lagi, nanti kita akan belajar lebih lanjut pada materi-materi yang selanjutnya.

Full Code Contoh:

```java
@FunctionalInterface
interface SimpleAction {

    String action();

}

public class DemoLambda {
    public static void main(String[] args) {

        // Versi Anonymous Class
        SimpleAction simpleAction = new SimpleAction() {
            @Override
            public String action() {
                return "Halo Bro!!!";
            }
        };

        System.out.println(simpleAction.action());

        // Versi Lambda
        SimpleAction simpleActionLambda = () -> {
            return "Halo Bro dari Lambda!!!";
        };

        System.out.println(simpleActionLambda.action());
    }
}
```