---
sidebar_position: 37
title: 'Inline Function'
---

**Inline Function** adalah fitur Kotlin yang digunakan untuk mengoptimalkan penggunaan **Higher-Order Function**.

Higher-Order Function memungkinkan kita mengirimkan function atau lambda sebagai parameter. Fitur ini sangat berguna, tetapi pada kondisi tertentu dapat menimbulkan overhead karena lambda dapat direpresentasikan sebagai object pada saat runtime.

Kotlin menyediakan keyword:

```kotlin
inline
```

untuk memungkinkan compiler melakukan **inline optimization**.

## Masalah pada Higher-Order Function

Contoh Higher-Order Function biasa:

```kotlin
fun hello(name: () -> String): String {
    return "Hello ${name()}"
}
```

Function tersebut menerima lambda:

```kotlin
name: () -> String
```

Kemudian kita dapat memanggilnya:

```kotlin
println(hello { "Ucup" })
println(hello { "Budi" })
```

Secara konsep, setiap lambda yang digunakan sebagai argument dapat melibatkan object function pada runtime.

Jika penggunaan Higher-Order Function sangat banyak, overhead tersebut dapat menjadi lebih signifikan.

## Menggunakan Inline Function

Kotlin menyediakan keyword `inline` untuk function yang menggunakan Higher-Order Function.

Contoh:

```kotlin
inline fun hello(name: () -> String): String {
    return "Hello ${name()}"
}
```

Perhatikan keyword:

```kotlin
inline
```

yang ditambahkan sebelum `fun`.

Dengan `inline`, compiler dapat melakukan optimasi dengan memasukkan kode lambda dan function ke lokasi pemanggilnya ketika memungkinkan.

## Contoh Pemanggilan Inline Function

Contoh lengkap:

```kotlin
inline fun hello(name: () -> String): String {
    return "Hello ${name()}"
}

fun main() {
    println(hello { "Ucup" })
    println(hello { "Budi" })
    println(hello { "Angga" })
}
```

Output:

```text
Hello Ucup
Hello Budi
Hello Angga
```

Lambda:

```kotlin
{ "Ucup" }
```

dikirim sebagai parameter ke function `hello()`.

## Konsep Inline

Secara sederhana, tanpa inline kita dapat membayangkan kode:

```kotlin
println(hello { "Ucup" })
```

memanggil:

```kotlin
hello(lambda)
```

Dengan inline, compiler dapat mengoptimalkan kode tersebut dengan konsep seperti memasukkan isi function dan lambda langsung ke lokasi pemanggilan.

Secara konseptual, kurang lebih menjadi:

```kotlin
println("Hello ${"Ucup"}")
```

Ini adalah gambaran konsep optimasinya, bukan berarti source code asli Anda akan benar-benar diubah seperti contoh tersebut.

Tujuannya adalah mengurangi overhead pemanggilan Higher-Order Function dan pembuatan object lambda pada runtime ketika optimasi inline dapat diterapkan.

## Inline Function pada Higher-Order Function

Inline Function paling sering digunakan pada function yang menerima lambda sebagai parameter.

Contoh:

```kotlin
inline fun hello(name: () -> String): String {
    return "Hello ${name()}"
}
```

Parameter:

```kotlin
name: () -> String
```

merupakan function type.

Karena function `hello()` menggunakan Higher-Order Function, kita dapat menggunakan `inline`.

## Contoh dengan Beberapa Lambda

Sebuah Inline Function dapat memiliki lebih dari satu parameter lambda.

Contoh:

```kotlin
inline fun hello(
    firstName: () -> String,
    lastName: () -> String
): String {
    return "Hello ${firstName()} ${lastName()}"
}
```

Pemanggilan:

```kotlin
println(
    hello(
        { "Ucup" },
        { "Topekox" }
    )
)
```

Output:

```text
Hello Ucup Topekox
```

## `noinline`

Ketika sebuah function ditandai dengan:

```kotlin
inline
```

parameter lambda pada function tersebut secara default akan ikut diperlakukan sebagai inline parameter.

Namun, terkadang kita ingin **sebagian lambda tidak di-inline**.

Untuk kondisi tersebut, Kotlin menyediakan keyword:

```kotlin
noinline
```

## Contoh `noinline`

Contoh:

```kotlin
inline fun hello2(
    firstName: () -> String,
    noinline lastName: () -> String
): String {
    return "Hello ${firstName()} ${lastName()}"
}
```

Pada function tersebut terdapat dua parameter lambda:

```kotlin
firstName: () -> String
```

dan:

```kotlin
noinline lastName: () -> String
```

`firstName` akan diperlakukan sebagai inline parameter.

Sedangkan:

```kotlin
noinline lastName
```

tidak akan di-inline.

## Menggunakan `noinline`

Contoh pemanggilan:

```kotlin
println(
    hello2(
        { "Ucup" },
        { "Topekox" }
    )
)
```

Output:

```text
Hello Ucup Topekox
```

Contoh lainnya:

```kotlin
println(
    hello2(
        { "Budi" },
        { "Santoso" }
    )
)
```

Output:

```text
Hello Budi Santoso
```

## Mengapa Menggunakan `noinline`?

`noinline` digunakan ketika kita ingin mempertahankan lambda sebagai object/function value.

Misalnya ketika lambda perlu digunakan sebagai sebuah value atau diteruskan ke proses lain yang membutuhkan function object.

Contoh sederhana:

```kotlin
inline fun process(
    action: () -> Unit,
    noinline callback: () -> Unit
) {
    action()
    callback()
}
```

`action` akan di-inline, sedangkan `callback` tidak.

## Contoh Program Lengkap

Berikut contoh Inline Function dan `noinline`:

```kotlin
inline fun hello(name: () -> String): String {
    return "Hello ${name()}"
}

inline fun hello2(
    firstName: () -> String,
    noinline lastName: () -> String
): String {
    return "Hello ${firstName()} ${lastName()}"
}

fun main() {

    println(hello { "Ucup" })
    println(hello { "Budi" })
    println(hello { "Angga" })

    println(
        hello2(
            { "Ucup" },
            { "Topekox" }
        )
    )
}
```

Output:

```text
Hello Ucup
Hello Budi
Hello Angga
Hello Ucup Topekox
```

## Contoh Penggunaan Berulang

Pada contoh berikut, function `hello2()` dipanggil berulang kali:

```kotlin
for (i in 0..100) {
    println(
        hello2(
            { "Ucup" },
            { "Topekox" }
        )
    )
}
```

Function `hello2()` menggunakan:

```kotlin
inline fun hello2(
    firstName: () -> String,
    noinline lastName: () -> String
): String {
    return "Hello ${firstName()} ${lastName()}"
}
```

Parameter `firstName` di-inline, sedangkan `lastName` menggunakan `noinline`.

## Inline dan Ukuran Kode

Inline Function bukan berarti selalu lebih baik.

Ketika sebuah function di-inline, kode function dan lambda dapat disalin ke lokasi pemanggilnya.

Jika function berukuran sangat besar dan dipanggil di banyak tempat, inline dapat menyebabkan ukuran bytecode menjadi lebih besar.

Karena itu, `inline` sebaiknya digunakan pada kondisi yang memang sesuai, terutama untuk Higher-Order Function yang sederhana.

## Kapan Menggunakan Inline Function?

Inline Function cocok digunakan ketika:

- Function menerima lambda sebagai parameter.
- Higher-Order Function digunakan cukup sering.
- Lambda yang digunakan relatif kecil.
- Kita ingin mengurangi overhead function object dan pemanggilan lambda.
- Kita membutuhkan fitur khusus yang hanya tersedia pada inline function, seperti beberapa penggunaan `reified` type parameter.

Contoh sederhana:

```kotlin
inline fun execute(action: () -> Unit) {
    action()
}
```

Pemanggilan:

```kotlin
execute {
    println("Hello World")
}
```

## Kapan Tidak Perlu Menggunakan Inline?

Tidak semua function harus diberi `inline`.

Contoh function biasa:

```kotlin
fun sayHello(name: String): String {
    return "Hello $name"
}
```

Function tersebut tidak menggunakan lambda sebagai parameter sehingga tidak ada alasan umum untuk membuatnya inline hanya demi optimasi Higher-Order Function.

Selain itu, inline function yang terlalu besar dapat membuat ukuran bytecode bertambah karena kode dapat disalin ke banyak lokasi pemanggilan.

## Perbandingan Function Biasa dan Inline Function

### Function Biasa

```kotlin
fun hello(name: () -> String): String {
    return "Hello ${name()}"
}
```

### Inline Function

```kotlin
inline fun hello(name: () -> String): String {
    return "Hello ${name()}"
}
```

Perbedaannya hanya pada keyword:

```kotlin
inline
```

Namun keyword tersebut memberikan instruksi kepada compiler untuk mencoba melakukan inline terhadap function tersebut sesuai aturan dan batasan Kotlin/JVM.

## `inline` dan `noinline`

Perhatikan contoh berikut:

```kotlin
inline fun hello2(
    firstName: () -> String,
    noinline lastName: () -> String
): String {
    return "Hello ${firstName()} ${lastName()}"
}
```

Dapat dipahami sebagai:

```text
hello2()
│
├── firstName
│   └── inline
│
└── lastName
    └── noinline
```

`firstName` merupakan parameter lambda yang di-inline.

`lastName` secara eksplisit diberi `noinline`, sehingga tidak di-inline.

## Kesimpulan

**Inline Function** adalah fitur Kotlin yang memungkinkan compiler melakukan inline terhadap function, terutama untuk mengoptimalkan penggunaan Higher-Order Function.

Contoh:

```kotlin
inline fun hello(name: () -> String): String {
    return "Hello ${name()}"
}
```

Pemanggilan:

```kotlin
println(hello { "Ucup" })
```

Inline dapat membantu mengurangi overhead yang berkaitan dengan penggunaan lambda dan Higher-Order Function pada kondisi yang sesuai.

Jika sebuah Inline Function memiliki beberapa parameter lambda dan kita ingin salah satunya tidak di-inline, kita dapat menggunakan:

```kotlin
noinline
```

Contoh:

```kotlin
inline fun hello2(
    firstName: () -> String,
    noinline lastName: () -> String
): String {
    return "Hello ${firstName()} ${lastName()}"
}
```

Jadi, konsep utamanya:

:::tip
**`inline` digunakan untuk memungkinkan compiler memasukkan implementasi function dan lambda ke lokasi pemanggilan ketika memungkinkan, sedangkan `noinline` digunakan untuk mencegah parameter lambda tertentu agar tidak di-inline.**
:::

Perlu diingat bahwa `inline` adalah **optimasi compiler**, bukan jaminan bahwa source code atau bytecode akan selalu memiliki bentuk tertentu. Compiler tetap menentukan bagaimana optimasi tersebut diterapkan.
