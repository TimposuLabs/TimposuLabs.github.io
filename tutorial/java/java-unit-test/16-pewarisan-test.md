---
sidebar_position: 16
title: 'Pewarisan di JUnit Test'
---

JUnit mendukung pewarisan di test, artinya jika kita membuat class atau interface dan menambahkan informasi test disitu, maka ketika kita membuat turunannya, secara otomatis semua fitur test nya dimiliki oleh turunannya.

Ini sangat cocok ketika kita misal contohnya sering membuat code sebelum dan setelah test yang berulang-ulang, sehingga dibanding dibuat di semua test class, lebih baik dibuat sekali di parent test class, dan test class tinggal menjadi child class dari parent test class.

```java
@Extensions({
	@ExtendWith(RandomParameterResolver.class)
})
class DemoAbstractPewarisanTest {
	
	protected Calculator calculator = new Calculator();
	
	@BeforeEach
	protected void beforeEach() {
		System.out.println("Before Each");
	}
	
}
```

Class Turunan:

```java
public class DemoPewarisanTest extends DemoAbstractPewarisanTest {

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

Pada class turunan method `@BeforeEach` akan dipanggil dari class parent, begitupun pada class `Random` karena pada class parent meng-inject `RandomParameterResolver`.
