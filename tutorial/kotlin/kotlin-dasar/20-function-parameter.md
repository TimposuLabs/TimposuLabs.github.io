---
sidebar_position: 20
title: 'Function Parameter'
---

**Parameter** adalah nilai yang didefinisikan pada saat membuat function dan digunakan untuk menerima data ketika function dipanggil.

Dengan parameter, sebuah function dapat menerima data dari luar sehingga function menjadi lebih fleksibel dan dapat digunakan untuk berbagai nilai.

## Sintaks Function dengan Parameter

Bentuk umum:

```kotlin
fun namaFunction(parameter: TipeData) {
    // kode function
}
```

Contoh:

```kotlin
fun sayHello(name: String) {
    println("Hello $name")
}
```

Pada contoh tersebut:

```kotlin
name: String
```

adalah parameter function.

Ketika function dipanggil, kita harus memberikan nilai untuk parameter tersebut.

```kotlin
sayHello("Ucup")
```

Output:

```text
Hello Ucup
```

## Function dengan Beberapa Parameter

Sebuah function dapat memiliki lebih dari satu parameter.

Contoh:

```kotlin
fun sayHello(firstName: String, lastName: String) {
    println("Hello $firstName $lastName")
}
```

Function tersebut memiliki dua parameter:

```kotlin
firstName: String
lastName: String
```

Function dapat dipanggil:

```kotlin
sayHello("Ucup", "Topekox")
```

Output:

```text
Hello Ucup Topekox
```

Urutan argument harus sesuai dengan urutan parameter.

```text
"Ucup"     → firstName
"Topekox"  → lastName
```

## Parameter Nullable

Parameter juga dapat menggunakan **nullable type**.

Contoh:

```kotlin
fun sayHello(
    firstName: String,
    lastName: String,
    middleName: String?
) {
    // ...
}
```

Parameter:

```kotlin
middleName: String?
```

berarti `middleName` dapat berisi `String` atau `null`.

Contohnya:

```kotlin
sayHello("Ucup", "Topekox", null)
```

atau:

```kotlin
sayHello("Ade", "Laksono", "Agustian")
```

## Mengecek Parameter yang Bernilai `null`

Karena `middleName` dapat berisi `null`, kita dapat memeriksanya menggunakan `if`.

Contoh:

```kotlin
fun sayHello(
    firstName: String,
    lastName: String,
    middleName: String?
) {
    if (middleName == null) {
        println("Hello $firstName $lastName")
    } else {
        println("Hello $firstName $middleName $lastName")
    }
}
```

Jika `middleName` bernilai `null`, program menjalankan:

```kotlin
println("Hello $firstName $lastName")
```

Jika `middleName` memiliki nilai, program menjalankan:

```kotlin
println("Hello $firstName $middleName $lastName")
```

## Contoh Pemanggilan dengan `null`

Function dapat dipanggil dengan memberikan `null` sebagai argument:

```kotlin
sayHello("Ucup", "Topekox", null)
```

Karena `middleName` bernilai `null`, output:

```text
Hello Ucup Topekox
```

## Contoh Pemanggilan dengan Middle Name

Jika `middleName` diberikan nilai:

```kotlin
sayHello("Ade", "Laksono", "Agustian")
```

maka output:

```text
Hello Ade Agustian Laksono
```

## Contoh Program Lengkap

Berikut contoh lengkap function dengan parameter:

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

```text
Hello Ucup Topekox
Hello Ade Agustian Laksono
Hello Recky Ramadhan
```

## Memahami Parameter dan Argument

Istilah **parameter** dan **argument** memiliki perbedaan.

Parameter adalah variabel yang didefinisikan ketika function dibuat.

Contoh:

```kotlin
fun sayHello(firstName: String, lastName: String, middleName: String?) {
    // ...
}
```

Pada contoh tersebut:

```text
firstName
lastName
middleName
```

adalah parameter.

Sedangkan argument adalah nilai yang diberikan ketika function dipanggil.

Contoh:

```kotlin
sayHello("Ucup", "Topekox", null)
```

Argument-nya adalah:

```text
"Ucup"
"Topekox"
null
```

Hubungannya:

```text
Parameter       Argument

firstName   ←   "Ucup"
lastName    ←   "Topekox"
middleName  ←   null
```

## Urutan Parameter

Argument harus diberikan sesuai dengan urutan parameter.

Contoh:

```kotlin
fun sayHello(firstName: String, lastName: String) {
    println("Hello $firstName $lastName")
}
```

Pemanggilan:

```kotlin
sayHello("Ucup", "Topekox")
```

Hasil:

```text
firstName = "Ucup"
lastName  = "Topekox"
```

Jika urutannya dibalik:

```kotlin
sayHello("Topekox", "Ucup")
```

maka hasilnya:

```text
Hello Topekox Ucup
```

Kotlin tetap menjalankan function karena kedua nilai memiliki tipe `String`, tetapi maknanya menjadi berbeda.

## Parameter Membuat Function Lebih Fleksibel

Tanpa parameter, function hanya dapat melakukan proses dengan data yang sudah ditentukan.

Contoh:

```kotlin
fun sayHello() {
    println("Hello Ucup")
}
```

Function tersebut hanya menghasilkan:

```text
Hello Ucup
```

Dengan parameter:

```kotlin
fun sayHello(name: String) {
    println("Hello $name")
}
```

Function dapat digunakan untuk berbagai nama:

```kotlin
sayHello("Ucup")
sayHello("Ade")
sayHello("Recky")
```

Output:

```text
Hello Ucup
Hello Ade
Hello Recky
```

## Kesimpulan

**Parameter** memungkinkan sebuah function menerima data dari luar.

Contoh:

```kotlin
fun sayHello(
    firstName: String,
    lastName: String,
    middleName: String?
) {
    if (middleName == null) {
        println("Hello $firstName $lastName")
    } else {
        println("Hello $firstName $middleName $lastName")
    }
}
```

Function tersebut memiliki tiga parameter:

```text
firstName
lastName
middleName
```

Parameter `middleName` menggunakan:

```kotlin
String?
```

sehingga dapat menerima nilai `String` maupun `null`.

Ketika function dipanggil:

```kotlin
sayHello("Ucup", "Topekox", null)
```

nilai tersebut menjadi:

```text
firstName  = "Ucup"
lastName   = "Topekox"
middleName = null
```

Sedangkan:

```kotlin
sayHello("Ade", "Laksono", "Agustian")
```

menjadi:

```text
firstName  = "Ade"
lastName   = "Laksono"
middleName = "Agustian"
```

Dengan parameter, function dapat digunakan kembali dengan berbagai data tanpa harus membuat function baru untuk setiap nilai.
