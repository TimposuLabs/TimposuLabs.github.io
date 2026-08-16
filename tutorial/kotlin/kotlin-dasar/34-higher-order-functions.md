---
sidebar_position: 34
title: 'Higher-Order Functions'
---

**Higher-Order Function** adalah function yang dapat:

1. Menerima function lain sebagai parameter.
2. Mengembalikan function lain sebagai return value.

Higher-Order Function sangat berguna ketika kita ingin membuat function yang bersifat **general** dan fleksibel.

Dengan Higher-Order Function, kita dapat menentukan perilaku tertentu ketika function dipanggil dengan mengirimkan **lambda expression** sebagai argument.

## Function sebagai Parameter

Contoh sederhana Higher-Order Function:

```kotlin
fun hello(
    name: String,
    sayHello: (String) -> String
): String {
    return "Halo ${sayHello(name)}"
}
```

Function `hello()` memiliki dua parameter:

```kotlin
name: String
```

dan:

```kotlin
sayHello: (String) -> String
```

Parameter `sayHello` merupakan **function type**.

Artinya, `sayHello` dapat menerima sebuah function yang:

- Menerima satu parameter `String`.
- Mengembalikan `String`.

Secara sederhana:

```text
name
  ↓
String

sayHello
  ↓
(String) → String
```

## Memanggil Higher-Order Function

Kita dapat membuat lambda terlebih dahulu:

```kotlin
val upper = { value: String ->
    value.uppercase()
}
```

Lambda tersebut menerima `String` dan mengubahnya menjadi huruf besar.

Kemudian lambda dikirimkan ke function `hello()`:

```kotlin
println(hello("Ucup", upper))
```

Prosesnya:

```text
"Ucup"
   ↓
upper()
   ↓
"UCUP"
   ↓
"Halo UCUP"
```

Output:

```text
Halo UCUP
```

## Contoh Menggunakan Lambda Langsung

Lambda juga dapat langsung diberikan ketika memanggil function.

Contoh:

```kotlin
println(
    hello(
        "Budi",
        { value: String ->
            value.lowercase()
        }
    )
)
```

Output:

```text
Halo budi
```

Pada contoh tersebut, kita tidak perlu membuat variable lambda terlebih dahulu.

Lambda langsung diberikan sebagai argument ke function `hello()`.

## Type Inference pada Lambda

Kita juga dapat menghilangkan tipe parameter jika Kotlin sudah dapat mengetahuinya dari function type.

Contoh:

```kotlin
println(
    hello(
        "Asep",
        { value ->
            value.lowercase()
        }
    )
)
```

Kotlin mengetahui bahwa:

```kotlin
value
```

bertipe `String` karena parameter `sayHello` memiliki function type:

```kotlin
(String) -> String
```

## Contoh Program Lengkap

```kotlin
fun main() {

    fun hello(
        name: String,
        sayHello: (String) -> String
    ): String {
        return "Halo ${sayHello(name)}"
    }

    val upper = { value: String ->
        value.uppercase()
    }

    println(hello("Ucup", upper))

    println(
        hello(
            "Budi",
            { value: String ->
                value.lowercase()
            }
        )
    )

    println(
        hello(
            "Asep",
            { value ->
                value.lowercase()
            }
        )
    )
}
```

Output:

```text
Halo UCUP
Halo budi
Halo asep
```

## Trailing Lambda

Kotlin memiliki fitur bernama **Trailing Lambda**.

Trailing Lambda memungkinkan lambda expression diletakkan **di luar tanda kurung pemanggilan function** jika lambda tersebut merupakan argument terakhir.

Contoh tanpa trailing lambda:

```kotlin
val upper = hello(
    "Ucup",
    { value: String ->
        value.uppercase()
    }
)
```

Karena parameter lambda berada di posisi terakhir, kita dapat menuliskannya sebagai:

```kotlin
val upper = hello("Ucup") { value: String ->
    value.uppercase()
}
```

Kedua kode tersebut memiliki hasil yang sama.

## Mengapa Menggunakan Trailing Lambda?

Trailing Lambda membuat kode lebih ringkas dan mudah dibaca.

Tanpa trailing lambda:

```kotlin
hello(
    "Ucup",
    { value: String ->
        value.uppercase()
    }
)
```

Dengan trailing lambda:

```kotlin
hello("Ucup") { value: String ->
    value.uppercase()
}
```

Kotlin akan menganggap lambda tersebut sebagai argument terakhir dari function.

## Function dengan Lambda Tanpa Parameter

Higher-Order Function juga dapat menerima lambda yang tidak memiliki parameter.

Contohnya:

```kotlin
fun sayMessage(message: () -> String): String {
    return "The Message ${message()}"
}
```

Perhatikan function type:

```kotlin
() -> String
```

Artinya:

```text
()       → tidak memiliki parameter
-> String → mengembalikan String
```

Jadi function `message` menerima lambda yang:

- Tidak memiliki parameter.
- Menghasilkan `String`.

## Memanggil Function dengan Lambda

Kita dapat memanggil function tersebut menggunakan sintaks biasa:

```kotlin
val theMessage = sayMessage({
    "Good Luck My Friends"
})

println(theMessage)
```

Output:

```text
The Message Good Luck My Friends
```

Lambda:

```kotlin
{
    "Good Luck My Friends"
}
```

tidak menerima parameter dan menghasilkan String.

## Menggunakan Trailing Lambda

Karena lambda merupakan parameter terakhir, kita dapat menggunakan trailing lambda.

Contoh:

```kotlin
println(
    sayMessage {
        "Good Luck My Friends"
    }
)
```

Kode tersebut lebih ringkas dibandingkan:

```kotlin
println(
    sayMessage({
        "Good Luck My Friends"
    })
)
```

Keduanya menghasilkan output yang sama:

```text
The Message Good Luck My Friends
```

## Contoh Program Trailing Lambda

```kotlin
fun main() {

    fun sayMessage(message: () -> String): String {
        return "The Message ${message()}"
    }

    // Sintaks normal
    val theMessage = sayMessage({
        "Good Luck My Friends"
    })

    println(theMessage)

    // Trailing lambda
    println(
        sayMessage {
            "Good Luck My Friends"
        }
    )
}
```

Output:

```text
The Message Good Luck My Friends
The Message Good Luck My Friends
```

## Perbandingan Sintaks Normal dan Trailing Lambda

### Sintaks Normal

```kotlin
sayMessage({
    "Good Luck My Friends"
})
```

Lambda berada di dalam tanda kurung.

### Trailing Lambda

```kotlin
sayMessage {
    "Good Luck My Friends"
}
```

Lambda diletakkan di luar tanda kurung karena lambda merupakan argument terakhir.

## Higher-Order Function dengan Dua Lambda

Sebuah Higher-Order Function juga dapat menerima lebih dari satu function sebagai parameter.

Contoh:

```kotlin
fun calculate(
    value: Int,
    operation: (Int) -> Int
): Int {
    return operation(value)
}
```

Function tersebut menerima:

```text
value
    ↓
Int

operation
    ↓
(Int) → Int
```

Pemanggilan:

```kotlin
val result = calculate(10) {
    it * 5
}

println(result)
```

Output:

```text
50
```

Lambda:

```kotlin
{
    it * 5
}
```

bertugas menentukan operasi yang dilakukan terhadap nilai `10`.

## Membuat Function yang Fleksibel

Salah satu keuntungan Higher-Order Function adalah kita dapat membuat satu function yang memiliki perilaku berbeda berdasarkan lambda yang diberikan.

Contoh:

```kotlin
fun calculate(
    value: Int,
    operation: (Int) -> Int
): Int {
    return operation(value)
}
```

Kita dapat melakukan perkalian:

```kotlin
println(
    calculate(10) {
        it * 5
    }
)
```

Output:

```text
50
```

Kita juga dapat melakukan penjumlahan:

```kotlin
println(
    calculate(10) {
        it + 20
    }
)
```

Output:

```text
30
```

Atau melakukan pengurangan:

```kotlin
println(
    calculate(10) {
        it - 3
    }
)
```

Output:

```text
7
```

Function `calculate()` tetap sama.

Yang berbeda adalah lambda yang dikirimkan sebagai parameter.

## Higher-Order Function Mengembalikan Function

Higher-Order Function tidak hanya dapat menerima function sebagai parameter.

Function juga dapat **mengembalikan function**.

Contoh:

```kotlin
fun createMultiplier(value: Int): (Int) -> Int {
    return { number ->
        number * value
    }
}
```

Function tersebut mengembalikan:

```kotlin
(Int) -> Int
```

Artinya hasil dari `createMultiplier()` adalah sebuah function yang menerima `Int` dan menghasilkan `Int`.

Penggunaan:

```kotlin
val kaliLima = createMultiplier(5)

println(kaliLima(10))
```

Output:

```text
50
```

Prosesnya:

```text
createMultiplier(5)
        ↓
   menghasilkan
        ↓
(Int) -> Int
        ↓
kaliLima(10)
        ↓
      50
```

## Contoh Program Lengkap

Berikut contoh Higher-Order Function yang menerima dan mengembalikan function:

```kotlin
fun createMultiplier(value: Int): (Int) -> Int {
    return { number ->
        number * value
    }
}

fun main() {

    val kaliLima = createMultiplier(5)

    println(kaliLima(10))

    val kaliSepuluh = createMultiplier(10)

    println(kaliSepuluh(10))
}
```

Output:

```text
50
100
```

## Kapan Menggunakan Higher-Order Function?

Higher-Order Function cocok digunakan ketika kita ingin membuat function yang **fleksibel** dan perilakunya dapat ditentukan oleh pemanggil.

Contohnya:

- Membuat function yang dapat menerima berbagai operasi.
- Membuat filter data.
- Membuat transformasi data.
- Membuat callback.
- Memproses collection.
- Membuat kode yang reusable.
- Membuat API function yang fleksibel.

Contoh sederhana:

```kotlin
fun process(
    value: String,
    action: (String) -> String
): String {
    return action(value)
}
```

Pemanggil dapat menentukan sendiri apa yang dilakukan terhadap `value`.

## Kesimpulan

**Higher-Order Function** adalah function yang:

1. Menerima function lain sebagai parameter.
2. Mengembalikan function lain sebagai return value.
3. Bisa melakukan keduanya.

Contoh menerima function sebagai parameter:

```kotlin
fun hello(
    name: String,
    sayHello: (String) -> String
): String {
    return "Halo ${sayHello(name)}"
}
```

Contoh penggunaannya:

```kotlin
println(
    hello("Ucup") {
        it.uppercase()
    }
)
```

Output:

```text
Halo UCUP
```

Higher-Order Function juga mendukung **Trailing Lambda**:

```kotlin
sayMessage {
    "Good Luck My Friends"
}
```

Jika lambda merupakan argument terakhir, Kotlin memungkinkan kita meletakkannya di luar tanda kurung.

Selain menerima function, Higher-Order Function juga dapat mengembalikan function:

```kotlin
fun createMultiplier(value: Int): (Int) -> Int {
    return { number ->
        number * value
    }
}
```

Konsep utamanya:

:::tip
**Higher-Order Function memungkinkan function menerima atau mengembalikan function lain sehingga kode menjadi lebih fleksibel, reusable, dan dapat disesuaikan dengan kebutuhan pemanggilnya.**
:::
