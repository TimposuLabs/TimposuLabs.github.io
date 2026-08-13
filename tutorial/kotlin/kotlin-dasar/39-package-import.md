---
sidebar_position: 39
title: 'Package & Import'
---

**Package** digunakan untuk mengelompokkan class, function, variable, dan file Kotlin agar kode program menjadi lebih terorganisir.

Sedangkan **Import** digunakan untuk menggunakan class, function, atau object yang berada di package lain.

Dengan package dan import, project yang besar dapat dibagi menjadi beberapa bagian sehingga lebih mudah dikelola.

## Package

Package adalah namespace yang digunakan untuk mengelompokkan kode.

Contoh:

```kotlin
package com.example

fun sayHello() {
    println("Hello World")
}
```

Pada contoh tersebut:

```kotlin
package com.example
```

menunjukkan bahwa file Kotlin tersebut berada di package:

```text
com.example
```

## Membuat Package

Misalnya kita memiliki struktur project:

```text
src
└── main
    └── kotlin
        └── com
            └── example
                ├── Main.kt
                └── Greeting.kt
```

File `Greeting.kt` dapat berisi:

```kotlin
package com.example

fun sayHello() {
    println("Hello World")
}
```

Sedangkan `Main.kt`:

```kotlin
package com.example

fun main() {
    sayHello()
}
```

Karena kedua file berada pada package yang sama:

```text
com.example
```

function `sayHello()` dapat digunakan tanpa `import`.

## Package yang Berbeda

Misalnya kita memiliki dua package:

```text
com.example
com.example.util
```

File:

```text
Greeting.kt
```

berada di:

```text
com.example.util
```

Isinya:

```kotlin
package com.example.util

fun sayHello() {
    println("Hello World")
}
```

Kemudian kita memiliki file:

```text
Main.kt
```

yang berada di package:

```text
com.example
```

```kotlin
package com.example

fun main() {
    sayHello()
}
```

Kode tersebut tidak dapat langsung menggunakan `sayHello()` karena function tersebut berada di package berbeda.

Kita membutuhkan `import`.

## Import

`import` digunakan untuk menggunakan kode yang berada di package lain.

Contoh:

```kotlin
package com.example

import com.example.util.sayHello

fun main() {
    sayHello()
}
```

Bagian:

```kotlin
import com.example.util.sayHello
```

memberitahu Kotlin bahwa kita ingin menggunakan function `sayHello()` dari package:

```text
com.example.util
```

## Struktur Package dan Import

Secara sederhana:

```text
com.example
    │
    └── Main.kt
           │
           │ import
           ↓
com.example.util
    │
    └── Greeting.kt
           │
           └── sayHello()
```

`Main.kt` menggunakan `sayHello()` yang berada di package `com.example.util`.

## Contoh Program Lengkap

File `Greeting.kt`:

```kotlin
package com.example.util

fun sayHello() {
    println("Hello World")
}
```

File `Main.kt`:

```kotlin
package com.example

import com.example.util.sayHello

fun main() {
    sayHello()
}
```

Output:

```text
Hello World
```

## Import Class

`import` tidak hanya digunakan untuk function.

Kita juga dapat meng-import class dari package lain.

Contoh:

```kotlin
package com.example.model

class User(
    val name: String
)
```

Kemudian digunakan dari package lain:

```kotlin
package com.example

import com.example.model.User

fun main() {
    val user = User("Ucup")

    println(user.name)
}
```

Output:

```text
Ucup
```

## Import Beberapa Function

Kita dapat meng-import beberapa function dari package yang sama.

Misalnya:

```kotlin
package com.example.util

fun sayHello() {
    println("Hello")
}

fun sayGoodbye() {
    println("Goodbye")
}
```

Kemudian:

```kotlin
package com.example

import com.example.util.sayHello
import com.example.util.sayGoodbye

fun main() {
    sayHello()
    sayGoodbye()
}
```

Output:

```text
Hello
Goodbye
```

## Import Menggunakan Wildcard

Kita juga dapat meng-import seluruh deklarasi dari sebuah package menggunakan `*`.

Contoh:

```kotlin
import com.example.util.*
```

Dengan import tersebut, kita dapat menggunakan function yang berada di package `com.example.util`.

Contoh:

```kotlin
package com.example

import com.example.util.*

fun main() {
    sayHello()
    sayGoodbye()
}
```

Namun, penggunaan wildcard sebaiknya dilakukan dengan pertimbangan yang baik agar dependency yang digunakan tetap jelas.

## Import dengan Alias

Kotlin juga memungkinkan kita memberikan **alias** pada import menggunakan keyword `as`.

Contoh:

```kotlin
import com.example.util.sayHello as hello
```

Sekarang function tersebut dapat dipanggil menggunakan nama:

```kotlin
hello()
```

Contoh:

```kotlin
package com.example

import com.example.util.sayHello as hello

fun main() {
    hello()
}
```

Output:

```text
Hello World
```

## Mengapa Menggunakan Alias?

Alias berguna ketika terdapat dua deklarasi dengan nama yang sama.

Misalnya terdapat dua function:

```text
com.example.util.sayHello
com.example.admin.sayHello
```

Kita dapat menggunakan alias:

```kotlin
import com.example.util.sayHello as userHello
import com.example.admin.sayHello as adminHello
```

Kemudian:

```kotlin
userHello()
adminHello()
```

Dengan cara tersebut, kita dapat membedakan dua function yang memiliki nama sama.

## Package Naming Convention

Pada project Kotlin, package biasanya menggunakan nama yang terdiri dari beberapa bagian.

Contoh:

```text
com.example
com.example.model
com.example.service
com.example.repository
```

Untuk project yang menggunakan domain tertentu, package dapat menggunakan nama domain organisasi.

Contoh:

```text
com.timposulabs.app
```

Kemudian dapat dibagi menjadi:

```text
com.timposulabs.app.model
com.timposulabs.app.service
com.timposulabs.app.repository
```

Struktur package membantu mengorganisasi kode berdasarkan tanggung jawabnya.

## Package Tidak Harus Sama dengan Nama Folder

Secara konsep, package merupakan namespace Kotlin, sedangkan struktur folder adalah organisasi file pada project.

Dalam project Kotlin modern, biasanya package dan struktur folder dibuat selaras agar project lebih mudah dipahami.

Contoh:

```text
src/main/kotlin/
└── com/
    └── example/
        └── service/
            └── UserService.kt
```

Isi file:

```kotlin
package com.example.service

class UserService {
}
```

Struktur tersebut membuat hubungan antara package dan lokasi file menjadi jelas.

## Package pada File Kotlin

Deklarasi package biasanya diletakkan di bagian paling atas file.

Contoh:

```kotlin
package com.example.service

class UserService {
}
```

Sedangkan `import` diletakkan setelah deklarasi package.

Contoh:

```kotlin
package com.example

import com.example.service.UserService

fun main() {
    val service = UserService()
}
```

Urutan umumnya:

```text
package
    ↓
import
    ↓
kode Kotlin
```

## Contoh Struktur Project

Project sederhana dapat memiliki struktur:

```text
src/main/kotlin/
└── com/example/
    ├── Main.kt
    ├── model/
    │   └── User.kt
    ├── service/
    │   └── UserService.kt
    └── util/
        └── Helper.kt
```

### User.kt

```kotlin
package com.example.model

class User(
    val name: String
)
```

### UserService.kt

```kotlin
package com.example.service

import com.example.model.User

class UserService {

    fun createUser(name: String): User {
        return User(name)
    }
}
```

### Helper.kt

```kotlin
package com.example.util

fun printMessage(message: String) {
    println(message)
}
```

### Main.kt

```kotlin
package com.example

import com.example.service.UserService
import com.example.util.printMessage

fun main() {

    val service = UserService()

    val user = service.createUser("Ucup")

    printMessage("Nama: ${user.name}")
}
```

Output:

```text
Nama: Ucup
```

Pada contoh tersebut terdapat beberapa package:

```text
com.example
com.example.model
com.example.service
com.example.util
```

`Main.kt` menggunakan class dan function dari package lain melalui `import`.

## Package dan Import pada Standard Library

Kotlin juga memiliki banyak package yang dapat kita import.

Contoh:

```kotlin
import java.util.Locale
```

Kemudian:

```kotlin
val locale = Locale.getDefault()

println(locale)
```

Kotlin dan Java menyediakan banyak class dan function yang dapat digunakan melalui import.

## Import Function

Kita dapat meng-import function secara langsung.

Contoh:

```kotlin
import kotlin.math.max

fun main() {
    println(max(10, 20))
}
```

Output:

```text
20
```

Pada contoh tersebut:

```kotlin
import kotlin.math.max
```

digunakan untuk meng-import function `max()`.

## Import Object atau Member

Kotlin juga memungkinkan import terhadap member tertentu.

Contoh:

```kotlin
import kotlin.math.PI

fun main() {
    println(PI)
}
```

Kita dapat langsung menggunakan:

```kotlin
PI
```

tanpa harus menuliskan package lengkapnya.

## Kesimpulan

**Package** digunakan untuk mengelompokkan kode berdasarkan namespace tertentu.

Contoh:

```kotlin
package com.example.service
```

Sedangkan **import** digunakan untuk menggunakan deklarasi yang berada pada package lain.

Contoh:

```kotlin
import com.example.service.UserService
```

Struktur sederhananya:

```text
Package
   ↓
Mengelompokkan kode

Import
   ↓
Menggunakan kode dari package lain
```

Contoh lengkap:

```kotlin
package com.example

import com.example.util.sayHello

fun main() {
    sayHello()
}
```

Kotlin juga mendukung import dengan alias:

```kotlin
import com.example.util.sayHello as hello
```

Kemudian:

```kotlin
hello()
```

Jadi, konsep utama yang perlu diingat:

:::tip
**Package digunakan untuk mengorganisasi dan mengelompokkan kode, sedangkan import digunakan untuk menggunakan class, function, object, atau deklarasi lain yang berada di package berbeda.**
:::
