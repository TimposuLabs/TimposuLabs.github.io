---
sidebar_position: 18
title: 'Parameter Test'
---

Sebelumnya kita sudah tau jika ingin menambahkan parameter di function unit test, maka kita perlu membuat `ParameterResolver`. Namun jika terlalu banyak membuat `ParameterResolver` juga agak menyulitkan kita. JUnit memiliki fitur yang bernama `@ParameterizedTest`, dimana jenis unit test ini memang khusus dibuat agar dapat menerima parameter
Yang perlu kita lakukan adalah dengan mengganti `@Test` menjadi `@ParameterizedTest`.

## Sumber Parameter

`@ParameterizedTest` mendukung beberapa sumber parameter, yaitu:
* `@ValueSource`, untuk sumber `Number`, `Char`, `Boolean` dan `String`.
* `@EnumSource`, untuk sumber berupa `enum`.
* `@MethodSource`, untuk sumber dari static method.
* `@CsvSource`, untuk sumber beruba data CSV.
* `@CsvFileSource`, untuk sumber beruba file CSV.
* `@ArgumentSource`, untuk data dari class `ArgumentProvider`.


```java
// Parameter Test
@DisplayName("Test Calculator Parameter Test")
@ParameterizedTest(name = "{displayName} dengan parameter {0}")
@ValueSource(ints = {2, 4, 6, 8})
void withTestParameter(int value) {
	var expect = value + value;
	var result = calculator.add(value, value);
	
	Assertions.assertEquals(expect, result);
}
```

### Parameter dari Method lain menggunakan `@MethodSource`

```java
// Parameter Test dengan source dari method lain

// harus static
public static List<Integer> parameterSouce() {
	return List.of(1, 3, 5, 7, 9);
}

@DisplayName("Test Calculator Parameter Test dengan Method Source")
@ParameterizedTest(name = "{displayName} dengan parameter {0}")
@MethodSource({"parameterSouce"})
void withTestMethodSource(int value) {
	var expect = value + value;
	var result = calculator.add(value, value);
	
	Assertions.assertEquals(expect, result);
}
```