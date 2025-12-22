---
sidebar_position: 20
title: 'Function Parameter'
---

Dalam mendefinisikan function, kita dapat menggunakan data dari luar, atau kita sebut __parameter__. Di Kotlin, kita bisa menambahkan parameter di function, bisa lebih dari satu. Parameter sifatnya tidaklah wajib, jadi kita bisa membuat function tanpa parameter seperti sebelumnya yang sudah kita buat. Namun jika kita menambahkan parameter di function, maka ketika memanggil function tersebut, kita wajib memasukkan data ke parameternya.

```kotlin
fun sayHello(firstName: String, lastName: String, middleName: String?) {
    if (middleName == null) {
        println("Hello $firstName $lastName")
    } else {
        println("Hello $firstName $middleName $lastName")
    }
}

fun main() {
    sayHello("Ucup", "Topekox", null)
    sayHello("Ade", "Laksono", "Agustian")
    sayHello("Recky", "Ramadhan", null)
}
```

Output:

```
Hello Ucup Topekox
Hello Ade Laksono Agustian
Hello Recky Ramadhan
```
