---
sidebar_position: 28
title: 'Function Infix Notation'
---

**Infix Notation** adalah cara penulisan function dengan menempatkan function di antara dua nilai atau object.

Infix notation sering ditemukan pada operasi matematika.

Contohnya:

```text
10 + 20
```

Operator `+` berada di antara dua nilai:

```text
10     +     20
│            │
data       data
```

Kotlin juga memungkinkan kita membuat function sendiri yang dapat digunakan menggunakan **infix notation**.

## Contoh Infix Notation

Contoh sederhana:

```kotlin
infix fun String.to(value: String): String {
    return if (value == "UP") {
        uppercase(java.util.Locale.getDefault())
    } else {
        lowercase(java.util.Locale.getDefault())
    }
}
```

Function tersebut merupakan **Extension Function** pada `String`.

Keyword:

```kotlin
infix
```

menunjukkan bahwa function tersebut dapat dipanggil menggunakan **infix notation**.

## Memanggil Function dengan Infix Notation

Function `to()` dapat dipanggil dengan cara:

```kotlin
val name = "Ucup" to "UP"
```

Perhatikan bahwa kita tidak menggunakan tanda titik:

```kotlin
"Ucup".to("UP")
```

Keduanya dapat digunakan dan menghasilkan hasil yang sama.

### Menggunakan Infix Notation

```kotlin
val name = "Ucup" to "UP"
```

### Menggunakan Pemanggilan Function Biasa

```kotlin
val name = "Ucup".to("UP")
```

Perbedaannya hanya pada cara penulisan.

## Contoh Program Lengkap

```kotlin
infix fun String.to(value: String): String {
    return if (value == "UP") {
        uppercase(java.util.Locale.getDefault())
    } else {
        lowercase(java.util.Locale.getDefault())
    }
}

fun main() {
    val name = "Ucup" to "UP"

    println(name)
}
```

Output:

```text
UCUP
```

Ketika kode:

```kotlin
"Ucup" to "UP"
```

dijalankan, Kotlin akan memanggil:

```kotlin
"Ucup".to("UP")
```

Karena parameter `value` berisi `"UP"`, kondisi:

```kotlin
value == "UP"
```

bernilai `true`.

Kemudian function menjalankan:

```kotlin
uppercase(java.util.Locale.getDefault())
```

Sehingga:

```text
Ucup
```

berubah menjadi:

```text
UCUP
```

## Infix Notation dan Extension Function

Pada contoh sebelumnya:

```kotlin
infix fun String.to(value: String): String {
    // ...
}
```

function tersebut merupakan **Extension Function**.

Receiver type-nya adalah:

```kotlin
String
```

Sedangkan parameter function adalah:

```kotlin
value: String
```

Sehingga kita dapat membayangkan struktur function tersebut seperti:

```text
"Ucup"  to  "UP"
   │      │    │
   │      │    └── parameter
   │      └─────── nama function
   └────────────── receiver
```

## Syarat Function Infix

Agar sebuah function dapat digunakan sebagai infix notation, terdapat beberapa aturan.

### 1. Harus Menggunakan Keyword `infix`

Contoh:

```kotlin
infix fun String.to(value: String): String {
    return "..."
}
```

Keyword `infix` harus dituliskan sebelum `fun`.

### 2. Harus Memiliki Satu Parameter

Function infix hanya boleh memiliki **satu parameter**.

Contoh yang benar:

```kotlin
infix fun String.to(value: String): String {
    return "..."
}
```

Contoh yang tidak dapat digunakan sebagai infix:

```kotlin
infix fun String.to(value1: String, value2: String): String {
    return "..."
}
```

Karena memiliki dua parameter.

### 3. Parameter Tidak Boleh `vararg`

Parameter infix tidak boleh menggunakan `vararg`.

Contoh berikut tidak diperbolehkan:

```kotlin
infix fun String.to(vararg values: String): String {
    return "..."
}
```

Function infix hanya boleh memiliki satu parameter biasa.

### 4. Parameter Tidak Boleh Memiliki Default Value

Parameter pada function infix tidak boleh memiliki nilai default.

Contoh berikut tidak diperbolehkan:

```kotlin
infix fun String.to(value: String = "UP"): String {
    return "..."
}
```

Parameter harus diberikan secara langsung ketika function digunakan.

### 5. Harus Berupa Member Function atau Extension Function

Function infix harus berupa:

- **Member Function**
- **Extension Function**

Pada materi ini kita menggunakan Extension Function.

Contohnya:

```kotlin
infix fun String.to(value: String): String {
    return if (value == "UP") {
        uppercase(java.util.Locale.getDefault())
    } else {
        lowercase(java.util.Locale.getDefault())
    }
}
```

## Infix Function dengan Kondisi Berbeda

Pada contoh sebelumnya, function memeriksa nilai parameter `value`.

Jika:

```kotlin
value == "UP"
```

maka String diubah menjadi huruf besar.

Jika bukan `"UP"`, String diubah menjadi huruf kecil.

Contoh:

```kotlin
infix fun String.to(value: String): String {
    return if (value == "UP") {
        uppercase(java.util.Locale.getDefault())
    } else {
        lowercase(java.util.Locale.getDefault())
    }
}
```

Pemanggilan:

```kotlin
val result1 = "Ucup" to "UP"
val result2 = "Ucup" to "DOWN"

println(result1)
println(result2)
```

Output:

```text
UCUP
ucup
```

## Infix Notation vs Function Biasa

Perhatikan dua cara pemanggilan berikut.

### Function Biasa

```kotlin
val name = "Ucup".to("UP")
```

### Infix Notation

```kotlin
val name = "Ucup" to "UP"
```

Hasil keduanya sama:

```text
UCUP
```

Infix notation membuat kode terlihat lebih natural untuk operasi tertentu.

## Contoh Infix Function Sederhana

Kita dapat membuat Extension Function sederhana untuk menggabungkan dua String.

```kotlin
infix fun String.join(other: String): String {
    return "$this $other"
}
```

Penggunaan dengan function biasa:

```kotlin
val result = "Hello".join("Ucup")

println(result)
```

Output:

```text
Hello Ucup
```

Penggunaan dengan infix notation:

```kotlin
val result = "Hello" join "Ucup"

println(result)
```

Output:

```text
Hello Ucup
```

## Contoh Infix Function pada Int

Infix Function juga dapat dibuat untuk tipe data `Int`.

Contoh:

```kotlin
infix fun Int.times(value: Int): Int {
    return this * value
}
```

Penggunaan:

```kotlin
val result = 10 times 5

println(result)
```

Output:

```text
50
```

Tanpa infix notation:

```kotlin
val result = 10.times(5)

println(result)
```

Kedua cara tersebut menghasilkan nilai yang sama.

## Kapan Menggunakan Infix Function?

Infix Function cocok digunakan ketika sebuah operasi memiliki hubungan yang jelas antara dua nilai.

Contohnya:

```kotlin
10 times 5
```

atau:

```kotlin
"Hello" join "Ucup"
```

Infix notation dapat membuat kode terlihat lebih natural dan mudah dibaca.

Namun, tidak semua function harus dibuat menjadi infix.

Jika penggunaan infix membuat kode menjadi sulit dipahami, lebih baik menggunakan pemanggilan function biasa:

```kotlin
object.function(parameter)
```

## Contoh Program Lengkap

Berikut contoh program lengkap:

```kotlin
infix fun String.to(value: String): String {
    return if (value == "UP") {
        uppercase(java.util.Locale.getDefault())
    } else {
        lowercase(java.util.Locale.getDefault())
    }
}

fun main() {
    val name = "Ucup" to "UP"

    println(name)
}
```

Output:

```text
UCUP
```

Function tersebut juga dapat dipanggil menggunakan cara biasa:

```kotlin
val name = "Ucup".to("UP")

println(name)
```

Hasilnya tetap:

```text
UCUP
```

## Kesimpulan

**Infix Notation** adalah cara khusus untuk memanggil function dengan menempatkan function di antara receiver dan parameter.

Contoh:

```kotlin
"Ucup" to "UP"
```

Sama dengan:

```kotlin
"Ucup".to("UP")
```

Untuk membuat function infix, gunakan keyword:

```kotlin
infix
```

Contoh:

```kotlin
infix fun String.to(value: String): String {
    return if (value == "UP") {
        uppercase(java.util.Locale.getDefault())
    } else {
        lowercase(java.util.Locale.getDefault())
    }
}
```

Beberapa aturan utama:

- Function harus menggunakan keyword `infix`.
- Harus berupa **member function** atau **extension function**.
- Harus memiliki tepat **satu parameter**.
- Parameter tidak boleh menggunakan `vararg`.
- Parameter tidak boleh memiliki **default value**.

Dengan Infix Notation, pemanggilan function tertentu dapat ditulis dengan lebih natural:

```kotlin
val name = "Ucup" to "UP"
```

daripada:

```kotlin
val name = "Ucup".to("UP")
```
