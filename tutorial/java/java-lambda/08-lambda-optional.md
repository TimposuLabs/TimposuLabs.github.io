---
sidebar_position: 8
title: 'Lambda pada Optional'
---

Di Java 8, java menyediakan sebuah class baru bernama `Optional` class yang berada di package `java.util`. Class ini digunakan sebagai wrapper untuk value yang bisa bernilai null. Optional didesain agar kita lebih mudah ketika beroperasi dengan object yang bisa null. Karena `NullPointerException` adalah salah satu hal yang sering sekali ditemui oleh Programmer Java.

:::info
📑 Baca Juga: [Tips menangani NullPointerException dengan Java Optional](/blog/java-optional)
:::

### Cara Tradisional

Pada cara tradisional yang biasa dilakukan para programmer Java dengan melakukan validasi manual menggunakan kondisi `if`:

```java
String message;

if (message != null) {
    String messageUpper = message.toUpperCase();
    System.out.println(messageUpper);
}
```

Jika `message` langsung digunakan tanpa melakukan validasi seperti contoh di atas makan akan menimbulkan `NullPointerException`.

### Menggunakan `Optional` class

Dengan menggunakan Optional arah program bisa dialirkan dengan lebih efisien, tanpa melakukan validasi seperti cara sebelumnya.

```java
Optional<String> optionalName = Optional.ofNullable(message);
```

Berikut contoh menggunakan Lambda expression pada Optional Class:

```java
import java.util.Optional;

public class DemoLamdaOptionalClass {
    public static void main(String[] args) {
        sayHello("Hallo Bro!!!"); // menggunakan lambda
        sayHelloLambdaSimple("Masuk Pak Eko"); // menggunakan lambda yang lebih simple
    }

    static void sayHello(String message) {
        // menggunakan if check null
//        if (message != null) {
//            String messageUpper = message.toUpperCase();
//            System.out.println(messageUpper);
//        }

        // menggunakan optional lambda
        Optional<String> optionalName = Optional.ofNullable(message);
//        Optional<String> optionalNameUpper = optionalName.map(new Function<String, String>() {
//            @Override
//            public String apply(String value) {
//                return value.toUpperCase();
//            }
//        });
        Optional<String> optionalNameUpper = optionalName.map((value) -> value.toUpperCase());

//        optionalNameUpper.ifPresent(new Consumer<String>() {
//            @Override
//            public void accept(String value) {
//                System.out.println(value);
//            }
//        });
        optionalNameUpper.ifPresent(value -> System.out.println(value));
    }

    private static void sayHelloLambdaSimple(String message) {
        Optional.ofNullable(message)
                .map(String::toUpperCase)
//                .ifPresent(System.out::println); //satu kondisi
                .ifPresentOrElse(
                        value -> System.out.println(value),
                        () -> System.out.println("OKE DEH")
                );
    }

}
```

Penjelasan lebih lanjut tentang aliran data program di atas akan dibahas pada Java Stream.

## Baca Juga

* [Tips menangani NullPointerException dengan Java Optional](/blog/java-optional)