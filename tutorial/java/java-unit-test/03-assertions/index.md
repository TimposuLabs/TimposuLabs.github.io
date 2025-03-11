---
sidebar_position: 3
title: 'Assertions'
---

Saat membuat test, kita harus memastikan bahwa test tersebut sesuai dengan ekspektasi yang kita inginkan. Jika manual, kita bisa melakukan pengecekan if else, namun itu tidak direkomendasikan. JUnit memiliki fitur untuk melakukan assertions, yaitu memastikan bahwa unit test sesuai dengan kondisi yang kita inginkan. Assertions di JUnit di representasikan dalam class Assertions, dan di dalamnya terdapat banyak sekali function static.

:::info
https://junit.org/junit5/docs/current/api/org.junit.jupiter.api/org/junit/jupiter/api/Assertions.html
:::

## Class Calculator

```java
public class Calculator {

	public Integer add(int x, int y) {
		return x + y;
	}
	
	public Integer divide(int x, int y) {
		if (y == 0) {
			throw new IllegalArgumentException("Tidak dapat dibagi 0");
		} else {
			return x / y;
		}
	}
	
}
```

## Import Assertions static method

Kita akan menggunakan banyak method static dalam class Assertions jadi pada tutorial ini saya akan melakukan import semua method static pada Assertions.

```java
import static org.junit.jupiter.api.Assertions.*;
```

## Membuat Test dengan Assertions

Dalam class Asseertions terdapat banyak sekali method static yang dapat digunakan, kita ambil contoh salah satunya menggunakan `assertEquals()`.

```java
assertEquals(expected, actual);
```

dimana `expected` adalah nilai ekspektasi dan `actual` adalah nilai aktual yang ada, test berhasil jika kedua parameter tersebut cocok. Jika menggunakan cara manual misalnya kita akan mencari nilai dengan ekspektasi 50 biasanya menggunaka `if` dan ini tidak direkomendasikan di dalam unit test:

```java
if (result != 50) {
    throw new RuntimeException("Test Gagal");
}
```

Berikut contoh menggunakan unit test dengan `assertEquals`:

```java
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class AppTest {
	
    private Calculator calculator = new Calculator();
		
   @Test
    public void testAddSuccess() {
    	var result = calculator.add(30, 20);
    	
    	// cara manual tidak di rekomendasikan
    	if (result != 50) {
    		throw new RuntimeException("Test Gagal");
    	}
    	
    	// menggunakan assertion, cara best practice
    	assertEquals(50, result);
    }
    
    @Test
    public void testDivideSuccess() {
    	var result = calculator.divide(6, 2);
    	assertEquals(3, result);
    }
}
```

Result jika sukses menggunakan `mvn clean test`:

```
...
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running com.timposulabs.AppTest
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.032 s -- in com.timposulabs.AppTest
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  1.273 s
[INFO] Finished at: 2025-02-22T20:57:12+08:00
[INFO] ------------------------------------------------------------------------
```

Selain menggunakan `assertEquals()` terdapat method static lain yang dapat digunakan sesuai kebutuhan. 
