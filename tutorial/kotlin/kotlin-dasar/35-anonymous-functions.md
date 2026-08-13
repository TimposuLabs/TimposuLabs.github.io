---
sidebar_position: 35
title: 'Anonymous Functions'
---

**Anonymous Function** adalah function yang tidak memiliki nama.

Anonymous Function memiliki konsep yang mirip dengan **Lambda Expression**, yaitu function dapat disimpan ke dalam variable dan dapat digunakan sebagai parameter pada Higher-Order Function.

Perbedaan utama terletak pada cara penulisannya.

Lambda menggunakan:

```kotlin
{
    // kode
}
```

Sedangkan Anonymous Function menggunakan keyword:

```kotlin
fun
```

Contoh:

```kotlin
val upper = fun(value: String): String {
    return value.uppercase()
}
```

Pada contoh tersebut, function tidak memiliki nama sehingga disebut **Anonymous Function**.

## Perbedaan Lambda dan Anonymous Function

Lambda:

```kotlin
val upper = { value: String ->
    value.uppercase()
}
```

Anonymous Function:

```kotlin
val upper = fun(value: String): String {
    return value.uppercase()
}
```

Keduanya dapat digunakan sebagai function value.

Perbedaannya terdapat pada cara menentukan return value.

## Return pada Lambda

Pada Lambda Expression, expression terakhir secara otomatis menjadi nilai yang dikembalikan.

Contoh:

```kotlin
val upper = { value: String ->
    value.uppercase()
}
```

Expression terakhir:

```kotlin
value.uppercase()
```

secara otomatis menjadi return value.

Kita tidak perlu menuliskan:

```kotlin
return
```

## Return pada Anonymous Function

Pada Anonymous Function, kita dapat menggunakan keyword `return` seperti function biasa.

Contoh:

```kotlin
val upper = fun(value: String): String {
    return value.uppercase()
}
```

Dengan Anonymous Function, kita dapat menentukan return secara eksplisit menggunakan:

```kotlin
return
```

## Mengapa Menggunakan Anonymous Function?

Anonymous Function berguna ketika kita membutuhkan function yang lebih fleksibel seperti function biasa, tetapi tidak ingin memberikan nama pada function tersebut.

Contohnya ketika kita membutuhkan beberapa kondisi dan ingin melakukan `return` berdasarkan kondisi tersebut.

```kotlin
val upper = fun(value: String): String {
    return if (value.isBlank()) {
        "SORRY"
    } else {
        value.uppercase()
    }
}
```

Pada contoh tersebut, Anonymous Function dapat mengembalikan nilai berdasarkan kondisi.

Jika `value` kosong:

```kotlin
return "SORRY"
```

Jika `value` tidak kosong:

```kotlin
return value.uppercase()
```

## Membuat Higher-Order Function

Anonymous Function sering digunakan bersama **Higher-Order Function**.

Contoh:

```kotlin
fun hello(
    name: String,
    transformer: (String) -> String
): String {
    val nameTransformer = transformer(name)

    return "Hello $nameTransformer"
}
```

Function `hello()` menerima dua parameter:

```kotlin
name: String
```

dan:

```kotlin
transformer: (String) -> String
```

Parameter `transformer` adalah function yang menerima `String` dan mengembalikan `String`.

## Menggunakan Anonymous Function sebagai Parameter

Kita dapat membuat Anonymous Function:

```kotlin
val upper = fun(value: String): String {
    return if (value.isBlank()) {
        "SORRY"
    } else {
        value.uppercase()
    }
}
```

Kemudian mengirimkannya ke function `hello()`:

```kotlin
println(hello("Ucup", upper))
```

Output:

```text
Hello UCUP
```

## Mengecek String Kosong

Pada contoh sebelumnya terdapat:

```kotlin
value.isBlank()
```

`isBlank()` digunakan untuk memeriksa apakah sebuah `String` kosong atau hanya berisi whitespace.

Contoh:

```kotlin
"".isBlank()
```

menghasilkan:

```text
true
```

Sedangkan:

```kotlin
"Ucup".isBlank()
```

menghasilkan:

```text
false
```

Karena itu Anonymous Function dapat melakukan pengecekan:

```kotlin
return if (value.isBlank()) {
    "SORRY"
} else {
    value.uppercase()
}
```

## Contoh Program Lengkap

```kotlin
fun main() {

    fun hello(
        name: String,
        transformer: (String) -> String
    ): String {
        val nameTransformer = transformer(name)

        return "Hello $nameTransformer"
    }

    val upper = fun(value: String): String {
        return if (value.isBlank()) {
            "SORRY"
        } else {
            value.uppercase()
        }
    }

    println(hello("Ucup", upper))
    println(hello("", upper))
}
```

Output:

```text
Hello UCUP
Hello SORRY
```

## Anonymous Function Langsung sebagai Argument

Anonymous Function tidak harus disimpan terlebih dahulu ke dalam variable.

Kita dapat langsung menggunakannya sebagai argument.

Contoh:

```kotlin
println(
    hello(
        "Ucup",
        fun(value: String): String {
            return if (value.isBlank()) {
                "SORRY"
            } else {
                value.lowercase()
            }
        }
    )
)
```

Output:

```text
Hello ucup
```

Anonymous Function tersebut langsung dikirimkan sebagai argument ke parameter:

```kotlin
transformer
```

## Anonymous Function dan Lambda

Kita dapat membandingkan Lambda dan Anonymous Function.

### Lambda

```kotlin
val upper = { value: String ->
    if (value.isBlank()) {
        "SORRY"
    } else {
        value.uppercase()
    }
}
```

Lambda menggunakan expression terakhir sebagai return value.

### Anonymous Function

```kotlin
val upper = fun(value: String): String {
    return if (value.isBlank()) {
        "SORRY"
    } else {
        value.uppercase()
    }
}
```

Anonymous Function menggunakan keyword `return` seperti function biasa.

## Return yang Lebih Fleksibel

Salah satu perbedaan penting adalah cara `return` digunakan.

Lambda:

```kotlin
val upper = { value: String ->
    if (value.isBlank()) {
        "SORRY"
    } else {
        value.uppercase()
    }
}
```

Nilai yang dikembalikan berasal dari expression terakhir.

Anonymous Function:

```kotlin
val upper = fun(value: String): String {
    if (value.isBlank()) {
        return "SORRY"
    }

    return value.uppercase()
}
```

Pada Anonymous Function, kita dapat menggunakan `return` secara eksplisit pada bagian yang kita inginkan.

Contoh tersebut dapat membuat alur kode lebih mudah dipahami ketika terdapat beberapa kondisi.

## Contoh dengan Beberapa Kondisi

Anonymous Function dapat digunakan untuk membuat kondisi yang lebih kompleks.

```kotlin
val transform = fun(value: String): String {

    if (value.isBlank()) {
        return "EMPTY"
    }

    if (value.length < 3) {
        return "TOO SHORT"
    }

    return value.uppercase()
}
```

Penggunaan:

```kotlin
println(transform(""))
println(transform("Hi"))
println(transform("Ucup"))
```

Output:

```text
EMPTY
TOO SHORT
UCUP
```

Pada contoh tersebut, function dapat langsung mengembalikan nilai ketika kondisi tertentu terpenuhi.

## Anonymous Function dengan Higher-Order Function

Contoh lengkap:

```kotlin
fun hello(
    name: String,
    transformer: (String) -> String
): String {
    return "Hello ${transformer(name)}"
}

fun main() {

    val upper = fun(value: String): String {

        if (value.isBlank()) {
            return "SORRY"
        }

        return value.uppercase()
    }

    println(hello("Ucup", upper))
    println(hello("", upper))

    println(
        hello(
            "Budi",
            fun(value: String): String {
                return value.lowercase()
            }
        )
    )
}
```

Output:

```text
Hello UCUP
Hello SORRY
Hello budi
```

## Kapan Menggunakan Anonymous Function?

Anonymous Function dapat digunakan ketika:

- Membutuhkan function tanpa nama.
- Membutuhkan return secara eksplisit.
- Membutuhkan beberapa kondisi dengan `return`.
- Function akan digunakan sebagai parameter Higher-Order Function.
- Lambda terasa kurang sesuai untuk logika yang lebih kompleks.

Untuk operasi sederhana, Lambda biasanya lebih ringkas.

Contoh Lambda:

```kotlin
val upper = { value: String ->
    value.uppercase()
}
```

Untuk logic yang lebih kompleks, Anonymous Function dapat menjadi pilihan:

```kotlin
val upper = fun(value: String): String {

    if (value.isBlank()) {
        return "SORRY"
    }

    return value.uppercase()
}
```

## Kesimpulan

**Anonymous Function** adalah function yang tidak memiliki nama dan dibuat menggunakan keyword `fun`.

Contoh:

```kotlin
val upper = fun(value: String): String {
    return value.uppercase()
}
```

Anonymous Function memiliki konsep yang mirip dengan Lambda Expression.

Lambda:

```kotlin
val upper = { value: String ->
    value.uppercase()
}
```

Anonymous Function:

```kotlin
val upper = fun(value: String): String {
    return value.uppercase()
}
```

Perbedaan pentingnya adalah Lambda menggunakan expression terakhir sebagai return value, sedangkan Anonymous Function dapat menggunakan `return` secara eksplisit.

Contoh:

```kotlin
val upper = fun(value: String): String {
    if (value.isBlank()) {
        return "SORRY"
    }

    return value.uppercase()
}
```

Anonymous Function juga dapat digunakan sebagai argument pada **Higher-Order Function**:

```kotlin
hello(
    "Ucup",
    fun(value: String): String {
        return value.uppercase()
    }
)
```

Jadi, prinsip sederhananya:

:::tip
**Anonymous Function adalah function tanpa nama yang menggunakan keyword `fun` dan dapat digunakan seperti function value, termasuk sebagai parameter pada Higher-Order Function.**
:::
