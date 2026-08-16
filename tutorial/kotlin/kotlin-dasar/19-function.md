---
sidebar_position: 19
title: 'Function'
---

Sebelumnya kita sudah mengenal sebuah function yang wajib dibuat agar program Kotlin bisa berjalan, yaitu function `main`. Function adalah sebuah blok kode yang sengaja dibuat dalam program agar bisa digunakan berulang-ulang. Cara membuat function di Kotlin sangat sederhana, hanya dengan menggunakan kata kunci `fun` lalu diikuti dengan nama function nya dan blok kode isi function nya. Setelah membuat function, kita bisa mengeksekusi function tersebut dengan memanggilnya menggunakan kata kunci nama function nya.

## Kotlin Function

**Function** adalah blok kode yang digunakan untuk menjalankan tugas tertentu. Function membantu kita mengelompokkan kode berdasarkan fungsi atau tugasnya sehingga program menjadi lebih terstruktur dan mudah digunakan kembali.

Dalam Kotlin, function dibuat menggunakan keyword `fun`.

## Membuat Function

Sintaks dasar untuk membuat function:

```kotlin
fun namaFunction() {
    // kode yang akan dijalankan
}
```

Contoh:

```kotlin
fun helloFunction() {
    println("Hello World")
}
```

Pada contoh tersebut:

- `fun` adalah keyword untuk membuat function.
- `helloFunction` adalah nama function.
- `()` digunakan untuk parameter function. Pada contoh ini belum terdapat parameter.
- `{ }` adalah **body function**.
- `println("Hello World")` adalah kode yang akan dijalankan ketika function dipanggil.

## Memanggil Function

Function yang sudah dibuat harus dipanggil agar kode di dalamnya dijalankan.

Contoh:

```kotlin
fun helloFunction() {
    println("Hello World")
}

fun main() {
    helloFunction()
}
```

Output:

```text
Hello World
```

Pemanggilan function dilakukan dengan menuliskan nama function diikuti tanda kurung:

```kotlin
helloFunction()
```

## Function dengan Nama yang Berbeda

Kita dapat membuat beberapa function dengan nama yang berbeda.

Contoh:

```kotlin
fun helloFunction() {
    println("Hello World")
}

fun helloFunction2() {
    println("Hello Bro")
}
```

Masing-masing function memiliki tugasnya sendiri.

Function pertama:

```kotlin
helloFunction()
```

akan menghasilkan:

```text
Hello World
```

Sedangkan function kedua:

```kotlin
helloFunction2()
```

akan menghasilkan:

```text
Hello Bro
```

## Memanggil Beberapa Function

Beberapa function dapat dipanggil dari dalam function `main()`.

Contoh:

```kotlin
fun helloFunction() {
    println("Hello World")
}

fun helloFunction2() {
    println("Hello Bro")
}

fun main() {
    helloFunction()
    helloFunction2()
}
```

Output:

```text
Hello World
Hello Bro
```

Urutan pemanggilan function menentukan urutan output program.

Kode:

```kotlin
helloFunction()
helloFunction2()
```

akan menjalankan `helloFunction()` terlebih dahulu, kemudian `helloFunction2()`.

## Function dengan Single Expression

Kotlin memiliki cara penulisan function yang lebih singkat untuk function yang hanya memiliki satu expression.

Contoh function biasa:

```kotlin
fun helloFunction2() {
    println("Hello Bro")
}
```

Function tersebut dapat ditulis lebih singkat menjadi:

```kotlin
fun helloFunction2() = println("Hello Bro")
```

Cara penulisan tersebut disebut **Single Expression Function**.

## Contoh Program

Berikut contoh program lengkap:

```kotlin
fun helloFunction() {
    println("Hello World")
}

fun helloFunction2() = println("Hello Bro")

fun main() {
    helloFunction()
    helloFunction2()
}
```

Output:

```text
Hello World
Hello Bro
```

## Kesimpulan

Function dalam Kotlin dibuat menggunakan keyword `fun`.

Contoh function:

```kotlin
fun helloFunction() {
    println("Hello World")
}
```

Function dipanggil dengan:

```kotlin
helloFunction()
```

Kotlin juga menyediakan penulisan function yang lebih singkat menggunakan **Single Expression Function**:

```kotlin
fun helloFunction2() = println("Hello Bro")
```

Dengan menggunakan function, kode program dapat dibuat lebih **terstruktur, rapi, mudah dibaca, dan dapat digunakan kembali**.