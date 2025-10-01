---
sidebar_position: 7
title: 'Variable'
---

## Apa itu Variable?

- Variable adalah tempat untuk menyimpan data.
- Kotlin mendukung 2 jenis variabel; Mutable (bisa diubah) dan Immutable (tidak bisa diubah).
- Untuk membuat variable Mutable, di kotlin bisa menggunakan kata kunci `var`.
- Untuk membuat variable Immutable, di kotlin bisa menggunakan kata kunci `val`.

:::info
Direkomendasikan menggunakan Immutable dibanding Mutable data
:::

## Deklarasi Variable

```kotlin
val/var namaVariable : TipeData = data
```

### Contoh Mutable

```kotlin
var name: String = "Ucup"

// mengubah data name
name = "Angga"
```

### Contoh Immutable

```kotlin
val firstName: String = "Ucup"
val lastName = "Brian" // dapat langsung memasukan nilai tanpa mendeklarasikan type data

// error
lastName = "Angga"
```

## Nullable

- Secara standar, variable di Kotlin harus dideklarasikan / diinisialisasikan nilai nya.
- Jika saat membuat variable, tidak diberi nilai, maka akan error.
- Kotlin mendukung variable yang boleh `null` (tidak memiliki data).
- Ini dikarenakan Kotlin bisa mengakses Java, dan kebanyakan di Java, semua variable bisa `null`.
- Untuk membuat variable bisa bernilai `null`, di Kotlin bisa menggunakan `?` (tanda tanya) setelah tipe datanya.
- Penggunaan  fitur ini tidak direkomendasikan untuk dilakukan di kotlin, hanya sebagai jalan akhir jika misal mengakses kode Java.

```kotlin
// membuat variable string yang dapat diisi nilai null
var theFirstName: String? = "Ucup"
theFirstName = null

// Error karena variable theFirstName bisa null
// println(theFirstName.length)

// Cara yang benar
println(theFirstName?.length)
```

## Variable Constant

- Constant adalah Immutable data, yang biasanya diakses untuk keperluan global.
- Global artinya bisa diakses dimanapun.
- Untuk menandai bahwa variable tersebut adalah constant, biasanya menggunakan `UPPER_CASE` dalam pembuatan nama variable constant nya.

```kotlin
// variable constant
const val APP_NAME = "Belajar Kotlin"
const val VERSION = "1.0"

fun main() {
    
    println("$APP_NAME $VERSION")
}
```
