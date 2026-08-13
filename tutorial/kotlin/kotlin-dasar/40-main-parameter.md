---
sidebar_position: 40
title: 'Main Parameter'
---

Function `main()` merupakan function utama yang menjadi titik awal eksekusi program Kotlin.

Selain digunakan tanpa parameter, `main()` juga dapat menerima parameter.

Parameter pada `main()` biasanya digunakan untuk menerima **argument dari command line** ketika program dijalankan.

## Main Tanpa Parameter

Bentuk paling sederhana dari `main()` adalah:

```kotlin
fun main() {
    println("Hello World")
}
```

Ketika program dijalankan, Kotlin akan memulai eksekusi dari function:

```kotlin
main()
```

Output:

```text
Hello World
```

## Main dengan Parameter

Kita dapat membuat `main()` dengan parameter berupa `Array<String>`.

Contoh:

```kotlin
fun main(args: Array<String>) {
    println("Hello World")
}
```

Pada contoh tersebut:

```kotlin
args: Array<String>
```

adalah parameter yang digunakan untuk menerima argument dari command line.

Parameter tersebut biasanya disebut:

```text
args
```

Namun, nama `args` sebenarnya bukan keharusan. Kita dapat menggunakan nama variable lainnya.

Contoh:

```kotlin
fun main(arguments: Array<String>) {
    println("Hello World")
}
```

## Apa Itu `Array<String>`?

Perhatikan:

```kotlin
Array<String>
```

Artinya parameter tersebut merupakan sebuah **Array** yang setiap elemennya bertipe `String`.

Misalnya kita menjalankan program dengan argument:

```text
Ucup 30 Palu
```

maka data tersebut dapat diterima sebagai:

```text
args[0] = "Ucup"
args[1] = "30"
args[2] = "Palu"
```

Semua argument yang diterima melalui command line pada `main()` akan berupa `String`.

## Mengakses Parameter `args`

Kita dapat mengakses argument menggunakan index.

Contoh:

```kotlin
fun main(args: Array<String>) {
    println(args[0])
}
```

Jika program dijalankan dengan:

```text
Ucup
```

maka output:

```text
Ucup
```

Argument pertama berada pada index:

```text
0
```

## Contoh Beberapa Argument

Contoh:

```kotlin
fun main(args: Array<String>) {

    println(args[0])
    println(args[1])
    println(args[2])
}
```

Jika program dijalankan dengan argument:

```text
Ucup Topekox Palu
```

maka:

```text
args[0] = "Ucup"
args[1] = "Topekox"
args[2] = "Palu"
```

Output:

```text
Ucup
Topekox
Palu
```

## Menampilkan Semua Argument

Kita juga dapat melakukan perulangan terhadap `args`.

Contoh:

```kotlin
fun main(args: Array<String>) {

    for (arg in args) {
        println(arg)
    }
}
```

Jika argument yang diberikan:

```text
Ucup Topekox Palu
```

output:

```text
Ucup
Topekox
Palu
```

## Menggunakan `forEach`

Karena `args` merupakan array, kita juga dapat menggunakan `forEach`.

Contoh:

```kotlin
fun main(args: Array<String>) {

    args.forEach {
        println(it)
    }
}
```

`it` mewakili setiap element dari array `args`.

Jika argument:

```text
Java Kotlin Python
```

output:

```text
Java
Kotlin
Python
```

## Mengetahui Jumlah Argument

Kita dapat menggunakan property:

```kotlin
args.size
```

untuk mengetahui jumlah argument.

Contoh:

```kotlin
fun main(args: Array<String>) {

    println("Jumlah argument: ${args.size}")
}
```

Jika program dijalankan dengan:

```text
Ucup Topekox Palu
```

output:

```text
Jumlah argument: 3
```

## Contoh Penggunaan Main Parameter

Misalnya kita ingin membuat program sederhana yang menerima nama dari command line.

```kotlin
fun main(args: Array<String>) {

    if (args.isNotEmpty()) {
        println("Hello ${args[0]}")
    } else {
        println("Nama belum diberikan")
    }
}
```

Jika dijalankan dengan:

```text
Ucup
```

output:

```text
Hello Ucup
```

Jika tidak memberikan argument:

```text
Nama belum diberikan
```

## Mengecek `args.isNotEmpty()`

Pada contoh sebelumnya digunakan:

```kotlin
args.isNotEmpty()
```

Method tersebut digunakan untuk memastikan bahwa array `args` memiliki data.

Hal ini penting karena jika kita langsung mengakses:

```kotlin
args[0]
```

ketika tidak ada argument, program dapat menghasilkan error:

```text
ArrayIndexOutOfBoundsException
```

Karena itu, lebih aman melakukan pengecekan terlebih dahulu:

```kotlin
if (args.isNotEmpty()) {
    println(args[0])
}
```

## Contoh Program Biodata

Kita dapat membuat program sederhana yang menerima beberapa argument.

```kotlin
fun main(args: Array<String>) {

    if (args.size >= 3) {
        val firstName = args[0]
        val lastName = args[1]
        val city = args[2]

        println("Nama: $firstName $lastName")
        println("Kota: $city")
    } else {
        println("Argument tidak lengkap")
    }
}
```

Misalnya diberikan argument:

```text
Ucup Topekox Palu
```

Output:

```text
Nama: Ucup Topekox
Kota: Palu
```

## Argument dari Command Line

Konsepnya dapat digambarkan:

```text
Command Line
     │
     │ argument
     ▼
main(args: Array<String>)
     │
     ├── args[0]
     ├── args[1]
     └── args[2]
```

Misalnya:

```text
java Main Ucup Topekox Palu
```

maka:

```text
args[0] → Ucup
args[1] → Topekox
args[2] → Palu
```

## Parameter `main()` Harus Bertipe String

Parameter `main()` untuk menerima command-line arguments menggunakan:

```kotlin
Array<String>
```

Contoh:

```kotlin
fun main(args: Array<String>) {
    // ...
}
```

Argument dari command line pada awalnya selalu diterima sebagai `String`.

Jika kita ingin menggunakan nilai tersebut sebagai `Int`, kita perlu melakukan konversi.

## Konversi Argument ke Int

Misalnya kita ingin menerima umur:

```kotlin
fun main(args: Array<String>) {

    val age = args[0].toInt()

    println("Usia: $age")
}
```

Jika diberikan argument:

```text
30
```

maka:

```kotlin
args[0]
```

berisi:

```text
"30"
```

Setelah:

```kotlin
.toInt()
```

menjadi:

```text
30
```

yang bertipe `Int`.

## Contoh Kalkulator Sederhana

Kita dapat menggunakan main parameter untuk membuat program sederhana.

```kotlin
fun main(args: Array<String>) {

    val a = args[0].toInt()
    val b = args[1].toInt()

    val result = a + b

    println("$a + $b = $result")
}
```

Jika argument yang diberikan:

```text
10 20
```

maka:

```text
a = 10
b = 20
```

Output:

```text
10 + 20 = 30
```

## Perbedaan `main()` dan `main(args: Array<String>)`

Kotlin mendukung bentuk `main()` tanpa parameter:

```kotlin
fun main() {
    println("Hello World")
}
```

Dan bentuk dengan parameter:

```kotlin
fun main(args: Array<String>) {
    println("Hello ${args[0]}")
}
```

Perbedaannya:

```text
fun main()
    ↓
Tidak menerima command-line argument secara langsung.

fun main(args: Array<String>)
    ↓
Menerima command-line argument melalui args.
```

## Contoh Program Lengkap

```kotlin
fun main(args: Array<String>) {

    if (args.isEmpty()) {
        println("Tidak ada argument")
        return
    }

    println("Jumlah argument: ${args.size}")

    for (arg in args) {
        println("Argument: $arg")
    }
}
```

Jika dijalankan dengan:

```text
Kotlin Java Python
```

output:

```text
Jumlah argument: 3
Argument: Kotlin
Argument: Java
Argument: Python
```

## Kesimpulan

`main()` adalah function yang menjadi titik awal eksekusi program Kotlin.

Bentuk sederhana:

```kotlin
fun main() {
    println("Hello World")
}
```

Sedangkan jika ingin menerima command-line argument:

```kotlin
fun main(args: Array<String>) {
    println(args[0])
}
```

`args` memiliki tipe:

```kotlin
Array<String>
```

Setiap argument dapat diakses menggunakan index:

```kotlin
args[0]
args[1]
args[2]
```

Index array dimulai dari `0`.

Jika argument:

```text
Ucup Topekox Palu
```

maka:

```text
args[0] → "Ucup"
args[1] → "Topekox"
args[2] → "Palu"
```

Jika argument ingin digunakan sebagai tipe data lain, kita perlu melakukan konversi.

Contoh:

```kotlin
val age = args[0].toInt()
```

Jadi, prinsip sederhananya:

:::tip
**Main Parameter memungkinkan program Kotlin menerima data dari command line melalui parameter `Array<String>`.**
:::
