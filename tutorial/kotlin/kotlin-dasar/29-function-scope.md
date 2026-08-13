---
sidebar_position: 29
title: 'Function Scope'
---

**Function Scope** adalah cakupan atau area di mana sebuah function dapat digunakan. Dalam Kotlin, kita dapat membuat function di dalam function lainnya. Function yang dibuat di dalam function disebut **local function**.

Local function hanya dapat digunakan di dalam scope tempat function tersebut dibuat.

## Local Function

Contoh:

```kotlin
fun main() {
    fun sayHello() {
        println("Hello World")
    }

    sayHello()
}
```

Pada contoh tersebut, function `sayHello()` dibuat di dalam function `main()`.

Karena `sayHello()` berada di dalam `main()`, function tersebut hanya dapat digunakan di dalam scope `main()`.

## Memanggil Local Function

Function `sayHello()` dapat dipanggil setelah function tersebut dideklarasikan:

```kotlin
fun main() {
    fun sayHello() {
        println("Hello World")
    }

    sayHello()
}
```

Output:

```text
Hello World
```

Urutan program:

1. Program menjalankan function `main()`.
2. Kotlin menemukan deklarasi function `sayHello()`.
3. Function `sayHello()` dipanggil.
4. `println("Hello World")` dijalankan.

## Local Function Hanya Bisa Digunakan di Dalam Scope-nya

Perhatikan contoh berikut:

```kotlin
fun main() {
    fun sayHello() {
        println("Hello World")
    }

    sayHello()
}

fun test() {
    sayHello()
}
```

Kode tersebut akan menghasilkan error karena `sayHello()` hanya tersedia di dalam scope `main()`.

Function `test()` tidak dapat mengakses `sayHello()`.

Secara sederhana:

```text
main()
└── sayHello()
```

Function `sayHello()` berada di dalam scope `main()`.

## Function di Level File

Berbeda dengan local function, function yang dibuat di luar function lain memiliki scope yang lebih luas.

Contoh:

```kotlin
fun sayHello() {
    println("Hello World")
}

fun main() {
    sayHello()
}
```

Pada contoh tersebut, `sayHello()` dibuat di level file, bukan di dalam `main()`.

Karena itu, function `main()` dapat mengakses `sayHello()`.

Contoh lainnya:

```kotlin
fun sayHello() {
    println("Hello World")
}

fun test() {
    sayHello()
}

fun main() {
    sayHello()
    test()
}
```

Function `sayHello()` dapat dipanggil dari `main()` maupun `test()`.

## Perbandingan Local Function dan Function Level File

### Local Function

```kotlin
fun main() {
    fun sayHello() {
        println("Hello World")
    }

    sayHello()
}
```

Function `sayHello()` hanya dapat digunakan di dalam scope `main()`.

### Function Level File

```kotlin
fun sayHello() {
    println("Hello World")
}

fun main() {
    sayHello()
}
```

Function `sayHello()` berada di level file sehingga dapat digunakan oleh function lain yang memiliki akses terhadapnya.

## Kapan Menggunakan Local Function?

Local function cocok digunakan ketika sebuah function hanya diperlukan untuk membantu proses di dalam function tertentu.

Contohnya:

```kotlin
fun main() {

    fun printHeader() {
        println("================")
        println("Data Pengguna")
        println("================")
    }

    printHeader()

    println("Nama: Ucup")
    println("Umur: 25")
}
```

Function `printHeader()` hanya digunakan oleh `main()`, sehingga dapat dibuat sebagai local function.

## Contoh dengan Beberapa Local Function

Kita juga dapat membuat beberapa local function di dalam sebuah function.

```kotlin
fun main() {

    fun sayHello() {
        println("Hello World")
    }

    fun sayGoodbye() {
        println("Goodbye World")
    }

    sayHello()
    sayGoodbye()
}
```

Output:

```text
Hello World
Goodbye World
```

Kedua function tersebut berada di dalam scope `main()`.

## Kesimpulan

**Function Scope** menentukan di mana sebuah function dapat digunakan.

Function yang dibuat di dalam function lain disebut **local function**.

Contoh:

```kotlin
fun main() {
    fun sayHello() {
        println("Hello World")
    }

    sayHello()
}
```

Pada contoh tersebut, `sayHello()` hanya dapat digunakan di dalam scope `main()`.

Sedangkan function yang dibuat di luar function lain memiliki scope yang lebih luas:

```kotlin
fun sayHello() {
    println("Hello World")
}

fun main() {
    sayHello()
}
```

Jadi, prinsip sederhananya:

:::tip
**Function hanya dapat digunakan pada scope yang dapat mengakses function tersebut. Local function hanya dapat digunakan di dalam scope tempat function tersebut dibuat.**
:::
