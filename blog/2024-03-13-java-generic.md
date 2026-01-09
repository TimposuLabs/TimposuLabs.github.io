---
slug: java-generic
title: Belajar Java Generic
authors: topekox
tags: [java, java generic]
---

Java generic adalah fitur dalam bahasa pemrograman Java yang memungkinkan pembuatan suatu tipe data, yang dapat digunakan kembali untuk berbagai jenis tipe data. Generic memungkinkan pembuatan class, interface, dan method yang dapat beroperasi pada tipe data yang berbeda atau dibuat secara lebih umum dan reusable. 

<!--truncate-->

Contoh tanpa generic:

```java
public class DemoNonGeneric {

	static class Hello {
		
		private Object value;
		
		public Object getValue() {
			return value;
		}
		
		public void setValue(Object value) {
			this.value = value;
		}
		
	}
	
	public static void main(String[] args) {
		Hello hello = new Hello();
		
		hello.setValue("Halo Bro!!!");
		String valueString = (String) hello.getValue();
		System.out.println(valueString);

		hello.setValue("3");
		Integer valueInt = (Integer) hello.getValue(); //lolos ketika dicompile tapi error ketika runtime, karena berbeda type data.
		System.out.println(valueInt);
	}
	
}
```

Pada contoh di atas kita tidak boleh sembarangan memasukan value ke dalam `setValue()`, walaupun di dalam class tersebut terdapat class `Object` yaitu induk dari segala object di Java tapi tanpa adanya casting dengan tipe data yang sama maka akan memunculkan exception.  Sebenarnya cara tidak salah tapi bukanlah best practice, karena kita harus selalu melakukan casting terhadap type data yang sama ketika dideklarasikan.

Output:

```
Halo Bro!!!
Exception in thread "main" java.lang.ClassCastException: class java.lang.String cannot be cast to class java.lang.Integer (java.lang.String and java.lang.Integer are in module java.base of loader 'bootstrap')
	at generic.DemoNonGeneric.main(DemoNonGeneric.java:27)
```

Dengan menggunakan Java Generic maka problem di atas bisa di tangani.

## Generic Class

Berikut contoh class generic dengan menambahkan parameter `<T>` pada deklarasi class, yang nantinya parameter `T` akan menjadi type data yang digunakan di dalam class tersebut:

```java
public class DemoClassGeneric<T> {
	
	private T value;
	
	public DemoClassGeneric(T value) {
		this.value = value;
	}
	
	public void setValue(T value) {
		this.value = value;
	}
	
	public T getValue() {
		return value;
	}

}
```

```java
public class DemoClassGenericMain {

	public static void main(String[] args) {
		DemoClassGeneric<String> genString = new DemoClassGeneric<String>("Halo bro!!!");
		System.out.println("value " + genString.getValue());
		
		DemoClassGeneric<Integer> genInt = new DemoClassGeneric<Integer>(2024);
		System.out.println("value " + genInt.getValue());
	}

}
```

Dengan menggunakan generic, maka kita dapat menggonta-ganti type data yang akan digunakan pada class generic yang sama, dan compiler akan memberikan error ketika value yang dimasukan tidak sesuai dengan type data yang digunakan.

### Penamaan Type Parameter

Pada contoh di atas kita menggunakan parameter `T`, sebenarnya tidak ada aturan baku dalam menggunakan parameter, cuma dalam prakteknya penamaan parameter biasanya satu huruf besar.

Jenis nama tipe parameter yang sering digunakan :
* `T` = Type
* `E` = Element (biasanya digunakan untuk Collection)
* `K` = Key
* `N` = Number
* `V` = Value
* `S`,`U`,`V` dst. 2nd, 3rd, 4th types.

Selain itu kita juga bisa menggunakan multiple parameter contohnya `public class DemoClassGeneric<T, U>`.

:::info
Pembahasan lebih lengkap tentang Java Generic dapat di [lihat disini](/java/java-generic).
:::

## Referensi

* [https://docs.oracle.com/javase/tutorial/java/generics/types.html](https://docs.oracle.com/javase/tutorial/java/generics/types.html)