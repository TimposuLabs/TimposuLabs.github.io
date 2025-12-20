---
sidebar_position: 21
title: 'Function Default Value Parameter'
---

Di Kotlin, function parameter wajib diisi ketika memanggil function. Namun kita juga bisa memasukkan nilai default value pada parameter nya, dengan demikian saat memanggil function tersebut, kita tidak wajib memasukkan nilai pada parameter nya. Default parameter ini cocok pada jenis parameter yang sekiranya memang tidak wajib untuk diisi.

```kotlin
// membuat parameter lastname dengan nilai default "" string kosong
fun sayHello(firstName: String, lastName: String = "") {
    println("Hello $firstName $lastName")
}

// membuat parameter lastname dengan nilai default null
fun sayHello2(firstName: String, lastName: String, middleName: String? = null) {
    if (middleName == null) {
        println("Hello $firstName $lastName")
    } else {
        println("Hello $firstName $middleName $lastName")
    }
}

fun main() {
    sayHello("Ade")
    sayHello("Ucup", "Topekox")

    sayHello2("Ucup", "Topekox", null)
    sayHello2("Ade", "Laksono", "Agustian")
    sayHello2("Recky", "Ramadhan", null)
}
```

Output:

```
Hello Ade
Hello Ucup Topekox
Hello Ucup Topekox
Hello Ade Agustian Laksono
Hello Recky Ramadhan
```
