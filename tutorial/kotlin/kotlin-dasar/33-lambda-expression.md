---
sidebar_position: 33
title: 'Lambda Expression'
---

**Lambda Expression** adalah function yang tidak memiliki nama.

Biasanya ketika membuat function di Kotlin, kita menggunakan keyword `fun` kemudian memberikan nama pada function tersebut.

Contoh function biasa:

```kotlin
fun sayHello(name: String): String {
    return "Hello $name"
}
```

Function tersebut memiliki nama:

```text
sayHello
```

Dengan **Lambda Expression**, kita dapat membuat function tanpa memberikan nama.

Contoh:

```kotlin
val sayHello: (String) -> String = {
    "Hello $it"
}
```

Lambda tersebut tidak memiliki nama function seperti `sayHello()` pada deklarasi function biasa. Lambda disimpan ke dalam variable `sayHello`.

## Function sebagai First-Class Citizen

Di Kotlin, function merupakan **first-class citizen**.

Artinya, function diperlakukan seperti tipe data lainnya.

Function dapat:

- Disimpan ke dalam variable.
- Dikirim sebagai parameter ke function lain.
- Dikembalikan dari sebuah function.
- Disimpan dalam collection seperti `List` atau `Array`.

Karena itu, kita dapat menyimpan lambda expression ke dalam variable.

Contoh:

```kotlin
val sayHello: (String) -> String = {
    "Hello $it"
}
```

Kemudian lambda tersebut dapat dipanggil seperti function:

```kotlin
println(sayHello("Ucup"))
```

Output:

```text
Hello Ucup
```

## Sintaks Lambda Expression

Bentuk umum lambda expression:

```kotlin
{ parameter -> expression }
```

Contoh:

```kotlin
val sayHello: (String) -> String = { name ->
    "Hello $name"
}
```

Bagian:

```kotlin
name
```

adalah parameter.

Sedangkan:

```kotlin
"Hello $name"
```

adalah expression yang menghasilkan nilai.

## Function Type

Pada contoh:

```kotlin
val sayHello: (String) -> String = {
    "Hello $it"
}
```

bagian:

```kotlin
(String) -> String
```

disebut **Function Type**.

Artinya:

```text
(String) → String
```

Function tersebut:

- Menerima satu parameter `String`.
- Mengembalikan nilai `String`.

Contoh lainnya:

```kotlin
(Int) -> Int
```

Artinya function menerima `Int` dan mengembalikan `Int`.

Sedangkan:

```kotlin
(String, Int) -> String
```

berarti function menerima dua parameter:

```text
String
Int
```

dan mengembalikan:

```text
String
```

## Lambda dengan Dua Parameter

Lambda dapat memiliki lebih dari satu parameter.

Contoh:

```kotlin
val varLambda: (String, Int) -> String = { name: String, age: Int ->
    val result = "Nama saya $name, usia saya $age tahun"
    result
}
```

Lambda tersebut memiliki dua parameter:

```kotlin
name: String
age: Int
```

dan menghasilkan `String`.

Lambda dapat dipanggil:

```kotlin
println(varLambda("Ucup", 30))
```

Output:

```text
Nama saya Ucup, usia saya 30 tahun
```

## Return pada Lambda Expression

Pada lambda expression, kita tidak perlu menggunakan keyword `return` untuk mengembalikan nilai terakhir.

Expression terakhir secara otomatis menjadi nilai return.

Contoh:

```kotlin
val varLambda: (String, Int) -> String = { name: String, age: Int ->
    val result = "Nama saya $name, usia saya $age tahun"
    result
}
```

Expression terakhir:

```kotlin
result
```

secara otomatis menjadi nilai yang dikembalikan oleh lambda.

Kita tidak perlu menulis:

```kotlin
return result
```

## Lambda dengan Satu Parameter

Jika lambda hanya memiliki satu parameter, Kotlin menyediakan keyword khusus:

```kotlin
it
```

`it` digunakan untuk mengakses parameter tersebut.

Contoh:

```kotlin
val name: (String) -> String = {
    it.uppercase()
}
```

Lambda tersebut menerima satu parameter bertipe `String`.

Kita dapat memanggilnya:

```kotlin
println(name("ucup"))
```

Output:

```text
UCUP
```

## Mengapa Menggunakan `it`?

Tanpa menggunakan `it`, kita dapat menuliskan parameter secara eksplisit:

```kotlin
val name: (String) -> String = { value ->
    value.uppercase()
}
```

Karena lambda hanya memiliki satu parameter, Kotlin memungkinkan kita menggunakan:

```kotlin
it
```

Sehingga menjadi:

```kotlin
val name: (String) -> String = {
    it.uppercase()
}
```

Kedua cara tersebut memiliki hasil yang sama.

## `it` Hanya untuk Satu Parameter

Keyword `it` hanya dapat digunakan secara otomatis ketika lambda memiliki satu parameter.

Contoh:

```kotlin
val upper: (String) -> String = {
    it.uppercase()
}
```

Sedangkan jika lambda memiliki dua parameter:

```kotlin
val result: (String, Int) -> String = { name, age ->
    "$name berusia $age tahun"
}
```

Kita tidak menggunakan `it`.

Parameter harus diberi nama:

```kotlin
name
age
```

## Contoh Lambda dengan Beberapa Parameter

```kotlin
val biodata: (String, Int) -> String = { name, age ->
    "Nama: $name, Usia: $age"
}
```

Penggunaan:

```kotlin
println(biodata("Ucup", 30))
```

Output:

```text
Nama: Ucup, Usia: 30
```

## Lambda dengan Satu Expression

Jika lambda hanya memiliki satu expression, penulisannya dapat dibuat sangat sederhana.

Contoh:

```kotlin
val kaliLima: (Int) -> Int = {
    it * 5
}
```

Penggunaan:

```kotlin
println(kaliLima(10))
```

Output:

```text
50
```

## Lambda sebagai Variable

Lambda dapat disimpan dalam variable.

Contoh:

```kotlin
val sayHello: (String) -> String = {
    "Hello $it"
}
```

Variable `sayHello` sekarang menyimpan sebuah function.

Kita dapat memanggilnya:

```kotlin
println(sayHello("Ucup"))
```

Output:

```text
Hello Ucup
```

Hal ini menunjukkan bahwa function dapat diperlakukan seperti data.

## Lambda sebagai Parameter Function

Karena function merupakan first-class citizen, lambda juga dapat dikirim sebagai parameter ke function lain.

Contoh:

```kotlin
fun sayHello(
    name: String,
    transform: (String) -> String
) {
    println(transform(name))
}
```

Function `sayHello()` menerima dua parameter:

```text
name
transform
```

Parameter `transform` merupakan function type:

```kotlin
(String) -> String
```

Pemanggilannya:

```kotlin
sayHello("ucup") {
    it.uppercase()
}
```

Output:

```text
UCUP
```

## Method Reference

Selain lambda expression, Kotlin juga memungkinkan kita mengambil reference dari function yang sudah ada.

Fitur ini disebut **Method Reference** atau **Function Reference**.

Contoh function:

```kotlin
fun toUpper(value: String): String {
    return value.uppercase()
}
```

Kita dapat membuat function reference menggunakan:

```kotlin
::toUpper
```

Kemudian menyimpannya ke variable:

```kotlin
val toNameUpperCase: (String) -> String = ::toUpper
```

Sekarang `toNameUpperCase` memiliki reference ke function `toUpper()`.

## Contoh Method Reference

```kotlin
fun toUpper(value: String): String {
    return value.uppercase()
}

fun main() {
    val toNameUpperCase: (String) -> String = ::toUpper

    println(toNameUpperCase("budi"))
}
```

Output:

```text
BUDI
```

Pada kode:

```kotlin
::toUpper
```

Kotlin mengambil reference dari function `toUpper()` tanpa langsung menjalankannya.

Function tersebut kemudian dapat dipanggil melalui variable:

```kotlin
toNameUpperCase("budi")
```

## Lambda Expression vs Function Biasa

Function biasa:

```kotlin
fun toUpper(value: String): String {
    return value.uppercase()
}
```

Lambda:

```kotlin
val toUpper: (String) -> String = {
    it.uppercase()
}
```

Keduanya dapat menghasilkan hasil yang sama.

Function biasa memiliki nama:

```text
toUpper
```

Sedangkan lambda tidak memiliki nama dan disimpan dalam variable:

```text
toUpper
```

## Contoh Program Lengkap

Berikut contoh dari beberapa konsep Lambda Expression:

```kotlin
fun main() {

    // Lambda dengan dua parameter
    val varLambda: (String, Int) -> String = { name, age ->
        val result = "Nama saya $name, usia saya $age tahun"
        result
    }

    println(varLambda("Ucup", 30))

    // Lambda dengan satu parameter
    val name: (String) -> String = {
        it.uppercase()
    }

    println(name("ucup"))

    // Function biasa
    fun toUpper(value: String): String {
        return value.uppercase()
    }

    // Function reference
    val toNameUpperCase: (String) -> String = ::toUpper

    println(toNameUpperCase("budi"))
}
```

Output:

```text
Nama saya Ucup, usia saya 30 tahun
UCUP
BUDI
```

## Perbedaan Lambda dan Function Reference

Lambda membuat function secara langsung:

```kotlin
val toUpper: (String) -> String = {
    it.uppercase()
}
```

Sedangkan function reference mengambil reference dari function yang sudah dibuat:

```kotlin
fun toUpper(value: String): String {
    return value.uppercase()
}

val toNameUpperCase: (String) -> String = ::toUpper
```

Keduanya dapat digunakan dengan cara yang sama:

```kotlin
println(toUpper("budi"))
```

atau:

```kotlin
println(toNameUpperCase("budi"))
```

Output:

```text
BUDI
```

## Kesimpulan

**Lambda Expression** adalah function yang tidak memiliki nama.

Contoh:

```kotlin
val name: (String) -> String = {
    it.uppercase()
}
```

Lambda dapat disimpan dalam variable karena function di Kotlin merupakan **first-class citizen**.

Function type:

```kotlin
(String) -> String
```

berarti lambda menerima satu `String` dan mengembalikan `String`.

Jika lambda hanya memiliki satu parameter, kita dapat menggunakan:

```kotlin
it
```

Contoh:

```kotlin
val name: (String) -> String = {
    it.uppercase()
}
```

Jika lambda memiliki lebih dari satu parameter, parameter harus dituliskan secara eksplisit:

```kotlin
val biodata: (String, Int) -> String = { name, age ->
    "Nama: $name, Usia: $age"
}
```

Kotlin juga menyediakan **Function Reference** menggunakan operator `::`.

Contoh:

```kotlin
val toNameUpperCase: (String) -> String = ::toUpper
```

Jadi, konsep utama Lambda Expression adalah:

:::tip
**Lambda Expression memungkinkan kita membuat function tanpa nama dan memperlakukan function tersebut seperti sebuah nilai yang dapat disimpan, dikirim, dan digunakan kembali.**
:::
