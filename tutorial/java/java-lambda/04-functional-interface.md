---
sidebar_position: 4
title: 'Functional Interface'
---

Pada Java 8, fitur Lambda diperkenalkan dan juga menyediakan package baru yang bernama `java.util.function`, yang berisi banyak functional interface yang bisa digunakan dalam menggunakan lambda. Dengan menggunakan interface-interface tersebut, kita tidak perlu membuat sendiri functional interface secara manual.

Beberapa functional interface yang sering digunakan:

## Consumer

Functional interface `Consumer` biasa digunakan ketika butuh ekspresi lambda untuk menerima data.

Berikut class anonymous `Consumer`:

```java
Consumer<String> consumer = new Consumer<String>() {
    @Override
    public void accept(String value) {
        System.out.println(value);
    }
};
```

Jika menggunakan ekpresi lambda maka kode dapat disederhanakan seperti berikut:

```java
Consumer<String> consumer = (value) -> System.out.println(value);
```

## Function

`Function<T, R>`, digunakan untuk memasukan Type (T) dan mengembalikan Result (R), dimana T adalah parameter-nya dan R adalah return value-nya.

Berikut class anonymous `Function`:

```java
Function<String, Integer> functionLength = new Function<String, Integer>() {
    @Override
    public Integer apply(String s) {
        return s.length();
    }
};
```

Jika menggunakan ekpresi lambda maka kode dapat disederhanakan seperti berikut:

```java
Function<String, Integer>  functionLength = (s) -> s.length();
```

## Predicate

`Predicate` adalah function yang akan mengembalikan nilai boolean menurut argumen yang dimasukan, mengembalikan `true` jika input argumen yang dimasukan sesuai dalam method test, dan `false` jika sebaliknya.

```java
Predicate<String> predicate = new Predicate<String>() {
    @Override
    public boolean test(String s) {
        return s.isBlank();
    }
};
```

## Supplier

`Supplier` function yang digunakan untuk mengembalikan result tanpa perlu mengirim parameter.

Berikut contoh class anonymous `Supplier`:

```java
Supplier<String> supplier = new Supplier<String>() {		
	@Override
	public String get() {
		return "Hallo Bro!!!!";
	}
};
```

Jika menggunakan ekpresi lambda maka kode dapat disederhanakan seperti berikut:

```java
Supplier<String> supplier = () -> "Hallo Bro!!!";
```

Berikut kode full contoh di atas:

```java
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class DemoLambdaFunctionalInterface {
    public static void main(String[] args) {

        // functional interface Consumer
        // biasa digunakan ketika butuh lambda untuk menerima data
        //
        //Consumer<String> consumer = new Consumer<String>() {
        //    @Override
        //    public void accept(String value) {
        //        System.out.println(value);
        //    }
        // };

        Consumer<String> consumer = (value) -> System.out.println(value);

        consumer.accept("Halo Bro!!!");

        // Function<T, R>, digunakan untuk memasukan Type (T) dan mengembalikan Result (R)
        // dimana T adalah parameter-nya dan R adalah return value-nya.
        //
        // Function<String, Integer> functionLength = new Function<String, Integer>() {
        //    @Override
        //    public Integer apply(String s) {
        //        return s.length();
        //    }
        //  };

        Function<String, Integer>  functionLength = (s) -> s.length();
        System.out.println(functionLength.apply("Ucup"));

        // Predicate: function yang akan mengembalikan nilai boolean menurut argumen yang dimasukan,
        // mengembalikan true jika input argumen yang dimasukan sesuai dalam method test,
        // dan false jika sebaliknya.
        //
        // Predicate<String> predicate = new Predicate<String>() {
        //    @Override
        //    public boolean test(String s) {
        //        return s.isBlank();
        //   }
        // };

        Predicate<String> predicate = (s) -> s.isBlank();
        System.out.println(predicate.test(""));
        
        // Supplier: function yang digunakan untuk mengembalikan result tanpa perlu mengirim parameter
        // 
        // Supplier<String> supplier = new Supplier<String>() {		
		//	@Override
		//	public String get() {
		//		return "Hallo Bro!!!!";
		//	}
		// };
        
        Supplier<String> supplier = () -> "Hallo Bro!!!";
		
		System.out.println(supplier.get());
    }
}
```