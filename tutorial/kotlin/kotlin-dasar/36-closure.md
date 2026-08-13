---
sidebar_position: 36
title: 'Closure'
---

**Closure** adalah kemampuan sebuah function, lambda, atau anonymous function untuk mengakses dan menggunakan variable yang berada di luar function tersebut tetapi masih berada dalam scope yang dapat diakses.

Dengan Closure, sebuah function dapat **mengingat dan memodifikasi data dari scope di sekitarnya**.

## Contoh Sederhana Closure

Perhatikan contoh berikut:

```kotlin
fun main() {

    var counter = 0

    fun functionIncrement() {
        counter++
        println("Function Increment")
    }

    functionIncrement()
    functionIncrement()
    functionIncrement()
    functionIncrement()
    functionIncrement()
    functionIncrement()

    println(counter)
}
```

Output:

```text
Function Increment
Function Increment
Function Increment
Function Increment
Function Increment
Function Increment
6
```

## Memahami Closure pada Contoh

Pada function `main()` terdapat variable:

```kotlin
var counter = 0
```

Kemudian kita membuat function di dalam `main()`:

```kotlin
fun functionIncrement() {
    counter++
    println("Function Increment")
}
```

Perhatikan bahwa function `functionIncrement()` tidak memiliki parameter bernama `counter`.

Namun, function tersebut tetap dapat mengakses:

```kotlin
counter
```

yang dibuat di luar function.

Inilah salah satu contoh **Closure**.

## Function Mengakses Variable di Outer Scope

Secara sederhana, struktur kode tersebut dapat digambarkan:

```text
main()
│
├── counter = 0
│
└── functionIncrement()
       │
       └── mengakses counter
```

Function `functionIncrement()` berada di dalam scope `main()` sehingga dapat mengakses variable `counter`.

## Mengubah Nilai Variable dari Closure

Closure tidak hanya dapat membaca variable dari outer scope, tetapi juga dapat mengubah nilainya jika variable tersebut dapat dimodifikasi.

Pada contoh:

```kotlin
var counter = 0
```

digunakan `var`, sehingga nilainya dapat diubah.

Kemudian:

```kotlin
counter++
```

menambahkan nilai `counter` sebanyak `1`.

Ketika function dipanggil:

```kotlin
functionIncrement()
```

nilai `counter` berubah.

Prosesnya:

```text
counter = 0

functionIncrement()
counter = 1

functionIncrement()
counter = 2

functionIncrement()
counter = 3
```

Dan seterusnya.

## Mengapa Menggunakan `var`?

Perhatikan variable:

```kotlin
var counter = 0
```

Kita menggunakan `var` karena nilainya akan berubah.

Contoh:

```kotlin
counter++
```

Jika menggunakan `val`:

```kotlin
val counter = 0
```

maka kita tidak dapat melakukan:

```kotlin
counter++
```

karena `val` tidak dapat diubah setelah diberikan nilai.

## Contoh Closure dengan Lambda

Closure juga dapat terjadi pada Lambda Expression.

Contoh:

```kotlin
fun main() {

    var counter = 0

    val increment = {
        counter++
    }

    increment()
    increment()
    increment()

    println(counter)
}
```

Output:

```text
3
```

Lambda:

```kotlin
val increment = {
    counter++
}
```

dapat mengakses variable:

```kotlin
counter
```

yang berada di luar lambda.

Lambda tersebut membentuk closure terhadap variable `counter`.

## Closure dengan Lambda dan Parameter

Closure juga dapat digunakan bersama parameter.

Contoh:

```kotlin
fun main() {

    var total = 0

    val tambah = { value: Int ->
        total += value
    }

    tambah(10)
    tambah(20)
    tambah(30)

    println(total)
}
```

Output:

```text
60
```

Lambda `tambah` dapat mengakses variable `total` yang berada di luar lambda.

Setiap kali lambda dipanggil, nilai `total` akan berubah.

Prosesnya:

```text
total = 0

tambah(10)
total = 10

tambah(20)
total = 30

tambah(30)
total = 60
```

## Closure dengan Anonymous Function

Closure juga dapat digunakan pada Anonymous Function.

Contoh:

```kotlin
fun main() {

    var counter = 0

    val increment = fun() {
        counter++
    }

    increment()
    increment()
    increment()

    println(counter)
}
```

Output:

```text
3
```

Anonymous Function:

```kotlin
fun() {
    counter++
}
```

dapat mengakses variable:

```kotlin
counter
```

yang berada di luar function tersebut.

## Closure pada Higher-Order Function

Closure juga sering digunakan bersama Higher-Order Function.

Contoh:

```kotlin
fun createCounter(): () -> Int {

    var counter = 0

    return {
        counter++
        counter
    }
}
```

Function `createCounter()` mengembalikan sebuah lambda:

```kotlin
() -> Int
```

Lambda tersebut menggunakan variable:

```kotlin
counter
```

yang dibuat di dalam `createCounter()`.

Contoh penggunaannya:

```kotlin
fun main() {

    val counter = createCounter()

    println(counter())
    println(counter())
    println(counter())
}
```

Output:

```text
1
2
3
```

## Bagaimana Closure Bekerja?

Pada contoh:

```kotlin
fun createCounter(): () -> Int {

    var counter = 0

    return {
        counter++
        counter
    }
}
```

Lambda yang dikembalikan masih dapat mengakses:

```kotlin
counter
```

meskipun function `createCounter()` sudah selesai dijalankan.

Secara sederhana:

```text
createCounter()
       │
       ├── counter = 0
       │
       └── return lambda
                │
                └── mengingat counter
```

Lambda tersebut mempertahankan akses terhadap data yang dibutuhkannya.

## Contoh Membuat Counter

Contoh program lengkap:

```kotlin
fun createCounter(): () -> Int {

    var counter = 0

    return {
        counter++
        counter
    }
}

fun main() {

    val counter = createCounter()

    println(counter())
    println(counter())
    println(counter())
    println(counter())
}
```

Output:

```text
1
2
3
4
```

Setiap kali `counter()` dipanggil, variable `counter` terus bertambah.

## Closure dengan Dua Counter

Hal menarik dari Closure adalah setiap pemanggilan `createCounter()` dapat memiliki state-nya sendiri.

Contoh:

```kotlin
fun createCounter(): () -> Int {

    var counter = 0

    return {
        counter++
        counter
    }
}

fun main() {

    val counterA = createCounter()
    val counterB = createCounter()

    println(counterA())
    println(counterA())
    println(counterA())

    println(counterB())
    println(counterB())
}
```

Output:

```text
1
2
3
1
2
```

`counterA` dan `counterB` memiliki data `counter` masing-masing.

Secara sederhana:

```text
counterA
  └── counter = 0

counterB
  └── counter = 0
```

Ketika `counterA` dipanggil, hanya `counterA` yang berubah.

Ketika `counterB` dipanggil, hanya `counterB` yang berubah.

## Closure dan State

Closure sering digunakan untuk mempertahankan **state**.

Contoh:

```kotlin
fun createCounter(): () -> Int {

    var counter = 0

    return {
        counter++
        counter
    }
}
```

Variable:

```kotlin
counter
```

menyimpan state yang dipertahankan oleh lambda.

Setiap pemanggilan:

```kotlin
counter()
```

mengubah state tersebut.

## Kapan Closure Digunakan?

Closure dapat berguna ketika kita membutuhkan function yang dapat mempertahankan atau mengakses data dari scope di sekitarnya.

Contohnya:

- Membuat counter.
- Menyimpan state.
- Membuat function generator.
- Membuat callback.
- Membuat Higher-Order Function.
- Membuat konfigurasi function.
- Membuat logic yang membutuhkan data dari outer scope.

Contoh sederhana:

```kotlin
fun createGreeting(prefix: String): (String) -> String {

    return { name ->
        "$prefix $name"
    }
}
```

Penggunaan:

```kotlin
fun main() {

    val greeting = createGreeting("Hello")

    println(greeting("Ucup"))
    println(greeting("Budi"))
}
```

Output:

```text
Hello Ucup
Hello Budi
```

Lambda tersebut menggunakan variable `prefix` dari scope `createGreeting()`.

## Gunakan Closure dengan Bijak

Closure merupakan fitur yang powerful, tetapi penggunaannya perlu diperhatikan.

Jika terlalu banyak function atau lambda yang mengubah variable dari outer scope, kode dapat menjadi lebih sulit dipahami.

Contoh:

```kotlin
var total = 0

val tambah = {
    total += 10
}

val kurang = {
    total -= 5
}
```

Beberapa lambda dapat mengubah variable yang sama.

Jika logic semakin kompleks, perubahan state dapat menjadi sulit dilacak.

Karena itu, gunakan Closure ketika memang memberikan manfaat terhadap desain program.

## Kesimpulan

**Closure** adalah kemampuan function, lambda, atau anonymous function untuk mengakses variable yang berada di scope luar yang dapat diaksesnya.

Contoh:

```kotlin
fun main() {

    var counter = 0

    fun functionIncrement() {
        counter++
        println("Function Increment")
    }

    functionIncrement()
    functionIncrement()
    functionIncrement()

    println(counter)
}
```

Function `functionIncrement()` dapat mengakses:

```kotlin
counter
```

meskipun `counter` tidak diberikan sebagai parameter.

Closure juga dapat digunakan pada Lambda:

```kotlin
var counter = 0

val increment = {
    counter++
}
```

dan Anonymous Function:

```kotlin
var counter = 0

val increment = fun() {
    counter++
}
```

Salah satu penggunaan penting Closure adalah mempertahankan state:

```kotlin
fun createCounter(): () -> Int {

    var counter = 0

    return {
        counter++
        counter
    }
}
```

Dengan Closure, lambda yang dikembalikan dapat tetap mengakses dan mempertahankan `counter`.

:::tip
**Closure memungkinkan function, lambda, atau anonymous function menggunakan data dari scope di sekitarnya. Gunakan fitur ini dengan bijak agar state dan alur perubahan data tetap mudah dipahami.**
:::
