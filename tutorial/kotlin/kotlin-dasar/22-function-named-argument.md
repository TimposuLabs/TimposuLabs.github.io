---
sidebar_position: 22
title: 'Function Named Argument'
---

Terkadang dalam membuat function, terdapat parameter yang banyak sekali digunakan. Hal ini sangat menyulitkan saat kita akan memanggil function tersebut, kita harus benar-benar tahu urutan parameter di function tersebut. Untungnya kotlin memiliki fitur yang namanya **Named Argument**. Named Argument adalah fitur dimana kita bisa menyebutkan nama parameter saat memanggil function, dengan demikian kita tidak wajib tahu posisi tiap parameter.

```kotlin
fun sayHello(firstName: String, midleName: String, lastName: String) {
    println("Hello $firstName $midleName $lastName")
}

fun main() {
    // tanpa named argument
    sayHello("Ade", "Agustian", "Laksono")

    // dengan named argument
    sayHello(
        firstName = "Ucup",
        lastName = "Topekox",
        midleName = "Bahlul"
    )
}
```
