---
sidebar_position: 15
title: 'Depedency Injections di Test'
---

Tidak ada magic di JUnit, sebenarnya fitur TestInfo yang sebelumnya kita bahas adalah bagian dari dependency injection di JUnit
Dependency Injection sederhananya adalah bagaimana kita bisa memasukkan dependency (object/instance) ke dalam unit test secara otomatis tanpa proses manual. Saat kita menambah parameter di method unit test, sebenarnya kita bisa secara otomatis memasukkan parameter tersebut dengan bantuan `ParameterResolver`. Contohnya `TestInfo` yang kita bahas sebelumya, sebenarnya objectnya dibuat oleh `TestInfoParameterResolver`.

## Membuat Parameter Resolver

```java
import java.util.Random;

import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.ParameterContext;
import org.junit.jupiter.api.extension.ParameterResolutionException;
import org.junit.jupiter.api.extension.ParameterResolver;

public class RandomParameterResolver implements ParameterResolver {
	
	private Random random = new Random();

	@Override
	public boolean supportsParameter(ParameterContext parameterContext, ExtensionContext extensionContext)
			throws ParameterResolutionException {
		return parameterContext.getParameter().getType() == Random.class;
	}

	@Override
	public Object resolveParameter(ParameterContext parameterContext, ExtensionContext extensionContext)
			throws ParameterResolutionException {
		return random;
	}

}
```

## Membuat Test Menggunakan Parameter Resolver

Untuk menggunakan parameter resolver yang sudah kita buat, kita bisa menggunakan annontation `@ExtendWith` di test class. Jika lebih dari 1 parameter resolver, kita bisa menggunakan `@Extentions`.

```java
import java.util.Random;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.extension.Extensions;

import com.timposulabs.belajar.Calculator;

@Extensions({
	@ExtendWith(RandomParameterResolver.class)
})
public class RandomTest {
	
	private Calculator calculator = new Calculator();
	
	@Test
	void testRandom(Random random) {
		int a = random.nextInt();
		int b = random.nextInt();
		
		var result = calculator.add(a, b);
		var expect = a + b;
		
		Assertions.assertEquals(expect, result);
	}

}
```

## 


