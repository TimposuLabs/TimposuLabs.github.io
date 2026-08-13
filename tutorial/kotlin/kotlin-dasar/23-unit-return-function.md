---
sidebar_position: 23
title: 'Unit Return Function'
---

**Unit** adalah tipe return yang digunakan oleh function ketika function tersebut **tidak mengembalikan nilai yang dapat digunakan oleh pemanggilnya**.

Unit di Kotlin kurang lebih memiliki konsep yang mirip dengan `void` pada beberapa bahasa pemrograman lain.

## Function dengan Return Type Unit

Kita dapat menuliskan `Unit` secara eksplisit pada function.

Contoh:

```kotlin
fun sayHello(): Unit {
    println("Hello World")
}
```

Pada function tersebut:

```kotlin
: Unit
```

menunjukkan bahwa function `sayHello()` memiliki return type `Unit`.

Function tersebut hanya menjalankan:

```kotlin
println("Hello World")
```

dan tidak mengembalikan nilai seperti `String`, `Int`, atau `Boolean`.

## Memanggil Function Unit

Function dapat dipanggil seperti function biasa:

```kotlin
fun sayHello(): Unit {
    println("Hello World")
}

fun main() {
    sayHello()
}
```

Output:

```text
Hello World
```

Ketika `sayHello()` dipanggil, function menjalankan kode di dalam body-nya.

## Unit sebagai Return Type Default

Dalam Kotlin, kita sebenarnya tidak wajib menuliskan `: Unit`.

Contoh:

```kotlin
fun sayHello() {
    println("Hello World")
}
```

Kode tersebut sama dengan:

```kotlin
fun sayHello(): Unit {
    println("Hello World")
}
```

Kotlin secara otomatis menganggap function tersebut memiliki return type `Unit`.

Jadi, kedua function berikut memiliki arti yang sama:

```kotlin
fun sayHello() {
    println("Hello World")
}
```

dan:

```kotlin
fun sayHello(): Unit {
    println("Hello World")
}
```

## Perbandingan Unit dengan Return Value

Function `Unit` tidak mengembalikan nilai yang digunakan oleh pemanggil.

Contoh:

```kotlin
fun sayHello(): Unit {
    println("Hello World")
}
```

Sedangkan function berikut mengembalikan nilai `String`:

```kotlin
fun getHello(): String {
    return "Hello World"
}
```

Perbedaannya:

```text
sayHello()
    ↓
menjalankan proses
    ↓
tidak mengembalikan nilai yang digunakan

getHello()
    ↓
menghasilkan nilai
    ↓
"Hello World"
```

## Function Unit dengan Parameter

Function yang memiliki return type `Unit` tetap dapat memiliki parameter.

Contoh:

```kotlin
fun sayHello(name: String): Unit {
    println("Hello $name")
}
```

Pemanggilan:

```kotlin
sayHello("Ucup")
```

Output:

```text
Hello Ucup
```

Parameter digunakan untuk menerima data, sedangkan `Unit` menunjukkan bahwa function tidak mengembalikan nilai tertentu.

## Unit dan `println()`

Function `println()` juga dapat digunakan di dalam function yang memiliki return type `Unit`.

Contoh:

```kotlin
fun printName(name: String): Unit {
    println("Nama: $name")
}
```

Function tersebut bertugas menampilkan data.

Pemanggilan:

```kotlin
printName("Ucup")
```

Output:

```text
Nama: Ucup
```

Tidak ada nilai yang dikembalikan untuk disimpan ke dalam variable.

## Contoh Function Unit Lainnya

Contoh function untuk menampilkan pesan:

```kotlin
fun showMessage(): Unit {
    println("Selamat datang")
}
```

Contoh function untuk mencetak data:

```kotlin
fun printData(name: String): Unit {
    println("Nama: $name")
}
```

Contoh function untuk melakukan beberapa proses:

```kotlin
fun prosesData(): Unit {
    println("Memulai proses")
    println("Memproses data")
    println("Proses selesai")
}
```

Semua function tersebut hanya menjalankan proses dan tidak mengembalikan nilai seperti `Int`, `String`, atau `Boolean`.

## Contoh Program Lengkap

```kotlin
fun sayHello(): Unit {
    println("Hello World")
}

fun sayHelloName(name: String): Unit {
    println("Hello $name")
}

fun printMessage(message: String): Unit {
    println(message)
}

fun main() {
    sayHello()
    sayHelloName("Ucup")
    printMessage("Belajar Kotlin")
}
```

Output:

```text
Hello World
Hello Ucup
Belajar Kotlin
```

## Unit vs String Return

Perhatikan perbedaan berikut.

### Menggunakan Unit

```kotlin
fun sayHello(): Unit {
    println("Hello World")
}
```

Function langsung menjalankan proses.

Pemanggilan:

```kotlin
sayHello()
```

### Menggunakan String

```kotlin
fun getHello(): String {
    return "Hello World"
}
```

Nilai hasil function dapat disimpan:

```kotlin
val message = getHello()

println(message)
```

Output:

```text
Hello World
```

Dengan `String`, function mengembalikan nilai yang dapat digunakan kembali oleh kode lain.

## Kapan Menggunakan Unit?

`Unit` cocok digunakan ketika function hanya bertugas melakukan suatu tindakan atau proses.

Contohnya:

- Menampilkan pesan.
- Mencetak data.
- Menampilkan informasi ke console.
- Mengubah data.
- Menjalankan suatu proses.
- Menampilkan hasil ke layar.

Contoh:

```kotlin
fun printWelcome(): Unit {
    println("Selamat datang di aplikasi")
}
```

Tidak diperlukan nilai return karena tujuan function hanya menampilkan pesan.

## Kesimpulan

**Unit** adalah return type yang menunjukkan bahwa sebuah function tidak mengembalikan nilai yang dapat digunakan oleh pemanggilnya.

Contoh:

```kotlin
fun sayHello(): Unit {
    println("Hello World")
}
```

Kita juga dapat menghilangkan `Unit`:

```kotlin
fun sayHello() {
    println("Hello World")
}
```

Kotlin akan secara otomatis menganggap return type function tersebut sebagai `Unit`.

Jadi:

```kotlin
fun sayHello(): Unit {
    println("Hello World")
}
```

sama dengan:

```kotlin
fun sayHello() {
    println("Hello World")
}
```

Perbedaan utamanya dengan function yang memiliki return value adalah:

```kotlin
fun sayHello(): Unit {
    println("Hello World")
}
```

hanya menjalankan proses, sedangkan:

```kotlin
fun getHello(): String {
    return "Hello World"
}
```

menghasilkan nilai yang dapat digunakan oleh kode lainnya.

:::tip
**Gunakan `Unit` ketika function hanya perlu menjalankan suatu proses tanpa mengembalikan nilai tertentu.**
:::
