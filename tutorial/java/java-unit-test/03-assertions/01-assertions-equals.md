---
sidebar_position: 1
title: 'Assertions Equals & NotEquals'
---

Pada contoh sebelumnya kita sudah membuat testing menggunakan [Assertions Equals](/java/java-unit-test/assertions). Assertions Equals digunakan untuk testing membandingkan 2 value actual(data aktual yang ada) dan expected(ekspektasi) yang nilainya harus cocok, sedangkan Assertions Not Equals perbandingan datanya tidak boleh cocok.

```java
assertEquals(actual, expected);
assertNotEquals(actual, expected);
```

Contoh kita akan menguji sebuat method sederhana yang akan melakuan penjumlahan dan validasi string `null`:

```java
public int add(int a, int b) {
    return a + b;
}
```

Melakukan testing menggunakan `assertEquals` dan `assertNotEquals`:

```java
@Test
void testEqualsAndNotEquals() {
    DemoUtils demoUtils = new DemoUtils();

    assertEquals(6, demoUtils.add(4, 2), "4 + 2 harus 6");
    assertNotEquals(6, demoUtils.add(4, 4), "4 + 4 tidak boleh 6");
}