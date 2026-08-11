---
sidebar_position: 21
title: 'Function Default Value Parameter'
---

**Default Value Parameter** adalah fitur Kotlin yang memungkinkan kita memberikan **nilai default** pada sebuah parameter function. Dengan nilai default, parameter tidak wajib diberikan ketika function dipanggil.

Hal ini berguna ketika sebuah parameter bersifat **opsional**.

## Sintaks Default Value Parameter

Bentuk umum:

```kotlin
fun namaFunction(
    parameter1: TipeData,
    parameter2: TipeData = nilaiDefault
) {
    // kode
}
```

Contoh:

```kotlin
fun sayHello(firstName: String, lastName: String = "") {
    println("Hello $firstName $lastName")
}
```

Pada function tersebut, parameter `lastName` memiliki nilai default:

```kotlin
lastName: String = ""
```

Artinya, jika `lastName` tidak diberikan ketika function dipanggil, Kotlin akan menggunakan string kosong `""`.

## Memanggil Function dengan Default Value

Function dapat dipanggil hanya dengan memberikan parameter `firstName`:

```kotlin
sayHello("Ade")
```

Karena `lastName` memiliki nilai default `""`, function tetap dapat dijalankan.

Output:

```text
Hello Ade
```

Kita juga dapat memberikan nilai `lastName` secara langsung:

```kotlin
sayHello("Ucup", "Topekox")
```

Output:

```text
Hello Ucup Topekox
```

## Contoh Function Default Value

Berikut contoh lengkap:

```kotlin
fun sayHello(firstName: String, lastName: String = "") {
    println("Hello $firstName $lastName")
}

fun main() {
    sayHello("Ade")
    sayHello("Ucup", "Topekox")
}
```

Output:

```text
Hello Ade
Hello Ucup Topekox
```

Pada pemanggilan:

```kotlin
sayHello("Ade")
```

Kotlin menggunakan nilai default:

```kotlin
lastName = ""
```

Sedangkan pada:

```kotlin
sayHello("Ucup", "Topekox")
```

nilai `lastName` diberikan secara langsung sehingga nilai default tidak digunakan.

## Default Value dengan `null`

Default value juga dapat menggunakan `null`, tetapi parameter tersebut harus menggunakan nullable type `?`.

Contoh:

```kotlin
fun sayHello2(
    firstName: String,
    lastName: String,
    middleName: String? = null
) {
    if (middleName == null) {
        println("Hello $firstName $lastName")
    } else {
        println("Hello $firstName $middleName $lastName")
    }
}
```

Perhatikan parameter:

```kotlin
middleName: String? = null
```

Terdapat dua bagian penting:

```kotlin
String?
```

menunjukkan bahwa parameter `middleName` dapat berisi `String` atau `null`.

Sedangkan:

```kotlin
= null
```

menentukan nilai default parameter tersebut adalah `null`.

## Menggunakan Default Value `null`

Karena `middleName` memiliki nilai default `null`, kita dapat memanggil function tanpa memberikan `middleName`.

Contoh:

```kotlin
sayHello2("Ucup", "Topekox")
```

Kotlin akan menggunakan:

```kotlin
middleName = null
```

Function kemudian memeriksa apakah `middleName` bernilai `null`:

```kotlin
if (middleName == null) {
    println("Hello $firstName $lastName")
}
```

Output:

```text
Hello Ucup Topekox
```

## Memberikan Nilai Middle Name

Kita juga dapat memberikan nilai `middleName`.

Contoh:

```kotlin
sayHello2("Ade", "Laksono", "Agustian")
```

Karena `middleName` berisi `"Agustian"`, kondisi:

```kotlin
middleName == null
```

bernilai `false`.

Sehingga bagian `else` dijalankan:

```kotlin
println("Hello $firstName $middleName $lastName")
```

Output:

```text
Hello Ade Agustian Laksono
```

## Memberikan Nilai `null` Secara Explicit

Kita juga dapat memberikan `null` secara langsung ketika memanggil function.

Contoh:

```kotlin
sayHello2("Recky", "Ramadhan", null)
```

Karena `middleName` bernilai `null`, program akan menjalankan:

```kotlin
if (middleName == null) {
    println("Hello $firstName $lastName")
}
```

Output:

```text
Hello Recky Ramadhan
```

## Contoh Program Lengkap

Berikut contoh lengkap penggunaan Default Value Parameter:

```kotlin
fun sayHello(firstName: String, lastName: String = "") {
    println("Hello $firstName $lastName")
}

fun sayHello2(
    firstName: String,
    lastName: String,
    middleName: String? = null
) {
    if (middleName == null) {
        println("Hello $firstName $lastName")
    } else {
        println("Hello $firstName $middleName $lastName")
    }
}

fun main() {
    sayHello("Ade")
    sayHello("Ucup", "Topekox")

    sayHello2("Ucup", "Topekox", null)
    sayHello2("Ade", "Laksono", "Agustian")
    sayHello2("Recky", "Ramadhan", null)
}
```

Output:

```text
Hello Ade
Hello Ucup Topekox
Hello Ucup Topekox
Hello Ade Agustian Laksono
Hello Recky Ramadhan
```

## Default Value String Kosong vs `null`

Ada dua pendekatan yang digunakan pada contoh di atas.

### Menggunakan String Kosong

```kotlin
fun sayHello(
    firstName: String,
    lastName: String = ""
) {
    println("Hello $firstName $lastName")
}
```

Nilai default:

```kotlin
""
```

Artinya parameter `lastName` selalu bertipe `String`, tetapi nilai default-nya adalah string kosong.

### Menggunakan `null`

```kotlin
fun sayHello2(
    firstName: String,
    lastName: String,
    middleName: String? = null
) {
    // ...
}
```

Nilai default:

```kotlin
null
```

Karena menggunakan `null`, tipe datanya harus nullable:

```kotlin
String?
```

## Perbedaan `""` dan `null`

`""` adalah **String kosong**, sedangkan `null` berarti **tidak memiliki nilai**.

Contoh:

```kotlin
val lastName = ""
```

Variabel tersebut memiliki nilai berupa String kosong.

Sedangkan:

```kotlin
val middleName: String? = null
```

variabel tersebut tidak memiliki nilai String.

Perbedaan ini penting ketika membuat parameter yang bersifat opsional.

## Kapan Menggunakan Default Value?

Default value cocok digunakan ketika sebuah parameter tidak selalu wajib diberikan.

Contohnya:

```kotlin
fun connect(
    host: String,
    port: Int = 8080
) {
    println("Connect to $host:$port")
}
```

Function dapat dipanggil tanpa memberikan `port`:

```kotlin
connect("localhost")
```

Output:

```text
Connect to localhost:8080
```

Atau kita dapat menentukan port sendiri:

```kotlin
connect("localhost", 9090)
```

Output:

```text
Connect to localhost:9090
```

## Kesimpulan

**Default Value Parameter** memungkinkan kita memberikan nilai awal pada parameter function.

Contoh:

```kotlin
fun sayHello(firstName: String, lastName: String = "") {
    println("Hello $firstName $lastName")
}
```

Parameter `lastName` memiliki nilai default berupa string kosong.

Sedangkan untuk nilai default `null`:

```kotlin
fun sayHello2(
    firstName: String,
    lastName: String,
    middleName: String? = null
) {
    // ...
}
```

Parameter `middleName` bersifat nullable karena menggunakan `String?`.

Dengan Default Value Parameter, kita dapat membuat function yang lebih fleksibel karena parameter tertentu dapat **diberikan nilainya atau menggunakan nilai default**.
