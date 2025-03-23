---
sidebar_position: 19
title: 'Timeout Test'
---

Kadang kita ingin memastikan bahwa sebuah unit test berjalan tidak lebih dari sekian detik. Misal ketika kasus kita ingin memastikan kode program kita mempunyai performa bagus dan cepat. JUnit memiliki fitur timeout, yaitu memastikan bahwa unit test berjalan tidak lebih dari waktu yang ditentukan, jika melebihi waktu yang ditentukan, secara otomatis unit test tersebut akan gagal. Kita bisa menggunakan annotation `@Timeout` untuk melakukan hal tersebut.

```java
import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;

public class DemoTimeoutTest {
	
	@Test
	@Timeout(value = 3, unit = TimeUnit.SECONDS)
	void testSlow() throws InterruptedException {
		Thread.sleep(5_000); // Test akan gagal karena test berjalan lebih dari 3 second
	}

}
```
