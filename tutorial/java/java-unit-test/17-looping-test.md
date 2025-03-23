---
sidebar_position: 17
title: 'Looping Test'
---

JUnit mendukung eksekusi unit test berulang kali sesuai dengan jumlah yang kita tentukan. Untuk mengulang eksekusi unit test, kita bisa menggunakan annotation `@RepeatedTest` di method unit test nya. `@RepeatedTest` juga bisa digunakan untuk mengubah detail nama test nya, dan kita bisa menggunakan value `{displayName}` untuk mendapatkan display name, `{currentRepetition}` untuk mendapatkan perulangan ke berapa saat ini,  dan `{totalRepetitions}` untuk mendapatkan total perulangan nya.

```java
// REPEAT TEST sebanyak 20 kali
@DisplayName("Test Calculator Repeat")
@RepeatedTest(
			value = 20,
			name = "{displayName} ke {currentRepetition} dari {totalRepetitions}"
		)
void testRepeatRandom(Random random) {
	int a = random.nextInt();
	int b = random.nextInt();
	
	var result = calculator.add(a, b);
	var expect = a + b;
	
	Assertions.assertEquals(expect, result);
}
```

## Informasi Perulangan

`@RepeatedTest` juga memiliki object `RepetitionInfo` yang di inject oleh class `RepetitionInfoParameterResolver`, sehingga kita bisa mendapatkan informasi RepetitionInfo melalui parameter function unit test.

```java
@DisplayName("Test Calculator Repeat with info")
@RepeatedTest(
		value = 20,
		name = "{displayName}"
		)
void testRepeatInfoRandom(TestInfo testInfo, Random random, RepetitionInfo repetitionInfo) {
	System.out.println(
			testInfo.getDisplayName() + " ke " + 
					repetitionInfo.getCurrentRepetition() + " dari " + 
						repetitionInfo.getTotalRepetitions());
	int a = random.nextInt();
	int b = random.nextInt();
	
	var result = calculator.add(a, b);
	var expect = a + b;
	
	Assertions.assertEquals(expect, result);
}
```