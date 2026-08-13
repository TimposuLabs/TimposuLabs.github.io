---
sidebar_position: 27
title: 'Extension Function'
---

**Extension Function** adalah fitur Kotlin yang memungkinkan kita menambahkan function baru ke sebuah **class atau tipe data** tanpa harus mengubah atau membuat turunan dari class tersebut.

Dengan Extension Function, kita dapat menambahkan function pada class yang sudah tersedia, termasuk class bawaan Kotlin seperti:

- `String`
- `Int`
- `Double`
- `List`
- dan berbagai class lainnya.

## Sintaks Extension Function

Bentuk umum Extension Function:

```kotlin
fun TipeData.namaFunction(): TipeReturn {
    // kode
}
```

Contoh:

```kotlin
fun String.hello(): String {
    return "Hello $this"
}
```

Pada contoh tersebut:

```kotlin
String
```

adalah **receiver type**.

Sedangkan:

```kotlin
hello()
```

adalah nama Extension Function.

Jadi function:

```kotlin
fun String.hello()
```

menambahkan function `hello()` pada tipe data `String`.

## Menggunakan `this` pada Extension Function

Di dalam Extension Function, keyword `this` digunakan untuk mengakses object yang memanggil function tersebut.

Contoh:

```kotlin
fun String.hello(): String {
    return "Hello $this"
}
```

Jika function dipanggil menggunakan:

```kotlin
val name = "Ucup"

name.hello()
```

Maka:

```kotlin
this
```

mengacu pada object:

```text
Ucup
```

Sehingga hasilnya:

```text
Hello Ucup
```

## Contoh Extension Function Sederhana

```kotlin
fun String.hello(): String {
    return "Hello $this"
}

fun main() {
    val name: String = "Ucup"

    val hello: String = name.hello()

    println(hello)
}
```

Output:

```text
Hello Ucup
```

Pada kode:

```kotlin
name.hello()
```

Kotlin menjalankan Extension Function `hello()` pada object `name`.

Karena `name` berisi:

```text
Ucup
```

maka `this` di dalam function mengacu pada `"Ucup"`.

## Extension Function dengan Single Expression

Extension Function juga dapat dibuat menggunakan **Single Expression Function**.

Contoh:

```kotlin
fun String.printHello(): Unit = println("Hello bro $this")
```

Function tersebut merupakan Extension Function untuk `String`.

Kita dapat memanggilnya:

```kotlin
val name = "Ucup"

name.printHello()
```

Output:

```text
Hello bro Ucup
```

## Contoh Program Lengkap

Berikut contoh lengkap penggunaan Extension Function:

```kotlin
fun String.hello(): String {
    return "Hello $this"
}

fun String.printHello(): Unit = println("Hello bro $this")

fun main() {
    val name: String = "Ucup"

    val hello: String = name.hello()

    println(hello)

    name.printHello()
}
```

Output:

```text
Hello Ucup
Hello bro Ucup
```

## Memahami Receiver Type

Bagian penting dalam Extension Function adalah **receiver type**.

Pada function:

```kotlin
fun String.hello(): String {
    return "Hello $this"
}
```

`String` adalah receiver type.

Artinya function `hello()` dapat dipanggil oleh object yang bertipe `String`.

Contoh:

```kotlin
val name = "Ucup"

name.hello()
```

Karena `name` bertipe `String`, maka function `hello()` dapat digunakan.

## Extension Function pada `Int`

Extension Function tidak hanya dapat digunakan pada `String`.

Kita juga dapat membuat Extension Function untuk `Int`.

Contoh:

```kotlin
fun Int.kaliLima(): Int {
    return this * 5
}
```

Penggunaan:

```kotlin
val number = 10

val result = number.kaliLima()

println(result)
```

Output:

```text
50
```

Di dalam function:

```kotlin
this * 5
```

`this` mengacu pada nilai `number`.

Sehingga:

```text
10 * 5 = 50
```

## Extension Function pada `Double`

Contoh:

```kotlin
fun Double.kaliDua(): Double {
    return this * 2
}
```

Penggunaan:

```kotlin
val number = 10.5

println(number.kaliDua())
```

Output:

```text
21.0
```

## Extension Function untuk Memeriksa String

Kita juga dapat membuat function untuk melakukan validasi sederhana.

Contoh:

```kotlin
fun String.isPanjang(): Boolean {
    return this.length >= 5
}
```

Penggunaan:

```kotlin
val name = "Ucup"

println(name.isPanjang())
```

Output:

```text
false
```

Contoh lainnya:

```kotlin
val name = "Agustian"

println(name.isPanjang())
```

Output:

```text
true
```

## Extension Function Tidak Mengubah Class Asli

Extension Function tidak benar-benar menambahkan function ke dalam source code class asli.

Contoh:

```kotlin
fun String.hello(): String {
    return "Hello $this"
}
```

Kita tidak mengubah class `String`.

Kita hanya memberikan kemampuan tambahan yang dapat digunakan dengan sintaks:

```kotlin
name.hello()
```

Hal ini membuat Extension Function sangat berguna untuk membuat kode menjadi lebih mudah dibaca.

## Kelebihan Extension Function

Extension Function memiliki beberapa keuntungan:

- Membuat kode lebih mudah dibaca.
- Membuat function tambahan tanpa mengubah class asli.
- Dapat digunakan pada class yang sudah tersedia.
- Membuat kode lebih ekspresif.
- Mengurangi kebutuhan membuat utility function yang terpisah.
- Dapat digunakan pada berbagai tipe data.

Contoh:

```kotlin
fun String.hello() = "Hello $this"
```

Kemudian dapat digunakan dengan cara yang natural:

```kotlin
"Ucup".hello()
```

## Contoh Program Lengkap

Berikut contoh beberapa Extension Function:

```kotlin
fun String.hello(): String {
    return "Hello $this"
}

fun String.printHello(): Unit {
    println("Hello bro $this")
}

fun Int.kaliLima(): Int {
    return this * 5
}

fun Int.isGenap(): Boolean {
    return this % 2 == 0
}

fun main() {
    val name = "Ucup"

    println(name.hello())
    name.printHello()

    val number = 10

    println(number.kaliLima())
    println(number.isGenap())
}
```

Output:

```text
Hello Ucup
Hello bro Ucup
50
true
```

## Kesimpulan

**Extension Function** memungkinkan kita membuat function tambahan untuk sebuah class atau tipe data tanpa mengubah class tersebut.

Sintaks dasarnya:

```kotlin
fun TipeData.namaFunction(): TipeReturn {
    // kode
}
```

Contoh:

```kotlin
fun String.hello(): String {
    return "Hello $this"
}
```

Kemudian dapat digunakan:

```kotlin
val name = "Ucup"

println(name.hello())
```

`String` pada:

```kotlin
fun String.hello()
```

disebut **receiver type**, sedangkan `this` mengacu pada object yang memanggil Extension Function.

Contoh lain:

```kotlin
fun String.printHello(): Unit = println("Hello bro $this")
```

Kemudian:

```kotlin
name.printHello()
```

Dengan Extension Function, kita dapat membuat function tambahan yang penggunaannya terlihat seperti bagian dari class atau tipe data tersebut.
