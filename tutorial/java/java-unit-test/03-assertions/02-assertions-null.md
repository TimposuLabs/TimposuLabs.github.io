---
sidebar_position: 2
title: 'Assertions Null & NotNull'
---

Assertions Null digunakan untuk testing membandingkan nilainya aktualnya harus `null`, sedangkan Assertions Not Null perbandingan data aktualnya  tidak boleh `null`.

```java
assertNull(actual);
assertNotNull(actual);
```

Contoh kita akan menguji sebuat method sederhana yang akan melakuan penjumlahan dan validasi string `null`:

```java
public Object checkNull(Object obj) {
    if (obj != null) {
        return obj;
    }
    return null;
}
```

Melakukan testing menggunakan `assertNull` dan `assertNotNull`:

```java
@Test
void testEqualsAndNotEquals() {
    DemoUtils demoUtils = new DemoUtils();

    assertEquals(6, demoUtils.add(4, 2), "4 + 2 harus 6");
    assertNotEquals(6, demoUtils.add(4, 4), "4 + 4 tidak boleh 6");
}