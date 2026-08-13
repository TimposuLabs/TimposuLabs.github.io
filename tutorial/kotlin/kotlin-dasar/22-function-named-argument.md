---
sidebar_position: 22
title: 'Function Named Argument'
---

**Named Argument** adalah cara memberikan nilai kepada parameter function dengan menyebutkan **nama parameternya secara langsung**.

Dengan Named Argument, kita tidak harus bergantung pada urutan parameter ketika memanggil function.

Named Argument sangat berguna ketika sebuah function memiliki banyak parameter atau ketika nama parameter membantu membuat kode lebih mudah dibaca.

## Function Tanpa Named Argument

Perhatikan function berikut:

```kotlin
fun sayHello(firstName: String, midleName: String, lastName: String) {
    println("Hello $firstName $midleName $lastName")
}
```

Function tersebut memiliki tiga parameter:

```text
firstName
midleName
lastName
```

Jika kita memanggil function tanpa Named Argument:

```kotlin
sayHello("Ade", "Agustian", "Laksono")
```

Kotlin akan memasukkan argument berdasarkan urutan parameter:

```text
firstName = "Ade"
midleName = "Agustian"
lastName = "Laksono"
```

Output:

```text
Hello Ade Agustian Laksono
```

## Menggunakan Named Argument

Dengan Named Argument, kita dapat menyebutkan nama parameter ketika memberikan nilai.

Contoh:

```kotlin
sayHello(
    firstName = "Ucup",
    lastName = "Topekox",
    midleName = "Bahlul"
)
```

Perhatikan bahwa urutannya berbeda dengan deklarasi function.

Function didefinisikan dengan urutan:

```kotlin
firstName
midleName
lastName
```

Tetapi ketika dipanggil:

```kotlin
firstName = "Ucup"
lastName = "Topekox"
midleName = "Bahlul"
```

Kotlin tetap dapat mengetahui nilai masing-masing parameter karena kita menyebutkan nama parameternya.

## Contoh Program Lengkap

```kotlin
fun sayHello(firstName: String, midleName: String, lastName: String) {
    println("Hello $firstName $midleName $lastName")
}

fun main() {

    // Tanpa named argument
    sayHello("Ade", "Agustian", "Laksono")

    // Dengan named argument
    sayHello(
        firstName = "Ucup",
        lastName = "Topekox",
        midleName = "Bahlul"
    )
}
```

Output:

```text
Hello Ade Agustian Laksono
Hello Ucup Bahlul Topekox
```

## Perbedaan Positional Argument dan Named Argument

Ada dua cara umum memberikan argument kepada function.

### Positional Argument

Argument diberikan berdasarkan posisi atau urutan parameter.

```kotlin
sayHello("Ade", "Agustian", "Laksono")
```

Kotlin akan membaca:

```text
Parameter       Argument

firstName   →   "Ade"
midleName   →   "Agustian"
lastName    →   "Laksono"
```

### Named Argument

Argument diberikan berdasarkan nama parameter.

```kotlin
sayHello(
    firstName = "Ucup",
    lastName = "Topekox",
    midleName = "Bahlul"
)
```

Kotlin akan membaca:

```text
firstName  → "Ucup"
lastName   → "Topekox"
midleName  → "Bahlul"
```

Urutan argument tidak menjadi masalah karena nama parameter sudah ditentukan.

## Named Argument Membuat Kode Lebih Mudah Dibaca

Named Argument sangat berguna ketika sebuah function memiliki banyak parameter.

Contoh tanpa Named Argument:

```kotlin
createUser("Ucup", 25, "Palu", true)
```

Kita harus mengetahui arti dari setiap argument:

```text
"Ucup" → nama
25     → umur
"Palu" → kota
true   → status
```

Dengan Named Argument:

```kotlin
createUser(
    name = "Ucup",
    age = 25,
    city = "Palu",
    active = true
)
```

Kode menjadi lebih mudah dipahami karena kita dapat langsung mengetahui fungsi dari setiap nilai.

## Named Argument Tidak Harus Mengubah Urutan Semua Parameter

Kita juga dapat menggunakan Named Argument hanya pada parameter tertentu.

Contoh:

```kotlin
fun sayHello(
    firstName: String,
    midleName: String,
    lastName: String
) {
    println("Hello $firstName $midleName $lastName")
}
```

Kita dapat memanggil:

```kotlin
sayHello(
    "Ucup",
    lastName = "Topekox",
    midleName = "Bahlul"
)
```

Argument pertama tetap menggunakan positional argument:

```kotlin
"Ucup"
```

Sedangkan parameter berikutnya menggunakan Named Argument.

Hasilnya:

```text
Hello Ucup Bahlul Topekox
```

## Named Argument dan Default Parameter

Named Argument juga sangat berguna jika function memiliki **default value parameter**.

Contoh:

```kotlin
fun sayHello(
    firstName: String,
    middleName: String = "",
    lastName: String = ""
) {
    println("Hello $firstName $middleName $lastName")
}
```

Kita dapat memanggil:

```kotlin
sayHello(
    firstName = "Ucup",
    lastName = "Topekox"
)
```

Parameter `middleName` tidak diberikan sehingga Kotlin menggunakan nilai default:

```kotlin
middleName = ""
```

Output:

```text
Hello Ucup  Topekox
```

## Named Argument dengan Banyak Parameter

Contoh function dengan beberapa parameter:

```kotlin
fun createUser(
    name: String,
    age: Int,
    city: String,
    active: Boolean
) {
    println("Name: $name")
    println("Age: $age")
    println("City: $city")
    println("Active: $active")
}
```

Tanpa Named Argument:

```kotlin
createUser("Ucup", 25, "Palu", true)
```

Dengan Named Argument:

```kotlin
createUser(
    name = "Ucup",
    age = 25,
    city = "Palu",
    active = true
)
```

Versi Named Argument biasanya lebih mudah dibaca, terutama ketika function memiliki banyak parameter.

## Kesimpulan

**Named Argument** adalah cara memberikan argument kepada function dengan menyebutkan nama parameter.

Tanpa Named Argument:

```kotlin
sayHello("Ade", "Agustian", "Laksono")
```

Argument diberikan berdasarkan urutan parameter.

Dengan Named Argument:

```kotlin
sayHello(
    firstName = "Ucup",
    lastName = "Topekox",
    midleName = "Bahlul"
)
```

Argument diberikan berdasarkan nama parameter sehingga urutannya dapat dibuat berbeda.

Keuntungan Named Argument:

- Membuat kode lebih mudah dibaca.
- Mengurangi kesalahan akibat salah urutan argument.
- Sangat berguna pada function dengan banyak parameter.
- Dapat digunakan bersama Default Value Parameter.
- Memungkinkan argument tertentu diberikan menggunakan nama parameter.

Jadi, prinsip sederhananya:

:::tip
**Named Argument memungkinkan kita memberikan nilai kepada parameter function berdasarkan nama parameternya, bukan hanya berdasarkan urutannya.**
:::
