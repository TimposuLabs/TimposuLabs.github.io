---
sidebar_position: 20
title: 'Paralel Test'
---

Secara default, JUnit tidak mendukung eksekusi unit test secara paralel, artinya unit test akan dijalankan secara sequential satu per satu. Namun kadang ada kasus kita ingin mempercepat proses unit test sehingga dijalankan secara paralel, hal ini bisa kita lakukan di JUnit, namun perlu beberapa langkah. Tapi ingat, pastikan unit test kita aman ketika dijalankan secara paralel.

## Konfigurasi Paralel

Hal pertama yang perlu kita lakukan adalah membuat file `junit-platform.properties` di direktori `resources` dalam direktori `test`, lalu menambahkan value :

```
junit.jupiter.execution.parallel.enabled = true
```

## Menggunakan `@Execution`

Walaupun sudah mengaktifkan fitur paralel, tapi bukan berarti secara otomatis semua unit test berjalan paralel, agar unit test berjalan paralel, kita perlu menggunakan annotation `@Execution`. Lalu memilih jenis execution nya, misal untuk paralel bisa menggunakan `ExecutionMode.CONCURRENT`.

Contoh:

```java
import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;
import org.junit.jupiter.api.parallel.Execution;
import org.junit.jupiter.api.parallel.ExecutionMode;

// annotation @Execution -> CONCURRENT akan membuat method test akan dijalankan secara paralel / bersamaan
@Execution(value = ExecutionMode.CONCURRENT)  
public class DemoParalelTest {

	@Test
	@Timeout(value = 5, unit = TimeUnit.SECONDS)
	void testSlow1() throws InterruptedException {
		Thread.sleep(4_000); 
	}
	
	@Test
	@Timeout(value = 5, unit = TimeUnit.SECONDS)
	void testSlow2() throws InterruptedException {
		Thread.sleep(4_000); 
	}
	
	@Test
	@Timeout(value = 5, unit = TimeUnit.SECONDS)
	void testSlow3() throws InterruptedException {
		Thread.sleep(4_000); 
	}
	
	@Test
	@Timeout(value = 5, unit = TimeUnit.SECONDS)
	void testSlow4() throws InterruptedException {
		Thread.sleep(4_000); 
	}
	
}
```

Test akan berjalan secara bersamaan / paralel.
