---
sidebar_position: 32
title: 'Tail Recursive Function'
---

**Tail Recursive Function** adalah teknik dalam recursive function yang memungkinkan compiler Kotlin mengoptimalkan recursive call menjadi bentuk perulangan sehingga penggunaan stack dapat dikurangi.

Pada recursive function biasa, setiap pemanggilan function dapat menambahkan stack frame baru.

Dengan **tail recursion**, pemanggilan recursive harus menjadi operasi terakhir yang dilakukan oleh function sehingga compiler dapat melakukan optimasi.

Kotlin menyediakan keyword:

```kotlin
tailrec
```

untuk menandai function sebagai tail recursive.

## Recursive Function Biasa

Contoh recursive function sederhana:

```kotlin
fun display(value: Int) {
    println(value)

    if (value > 0) {
        display(value - 1)
    }
}
```

Function tersebut memanggil dirinya sendiri:

```kotlin
display(value - 1)
```

Jika dipanggil:

```kotlin
display(5)
```

hasilnya:

```text
5
4
3
2
1
0
```

Function tersebut menggunakan recursion untuk melakukan proses secara berulang.

## Masalah pada Recursive Function

Recursive function dapat menggunakan stack untuk menyimpan setiap pemanggilan function.

Jika recursion dilakukan dalam jumlah yang sangat besar, stack dapat penuh dan menyebabkan:

```text
StackOverflowError
```

Contohnya:

```kotlin
fun display(value: Int) {
    println(value)

    if (value > 0) {
        display(value - 1)
    }
}
```

Jika dipanggil dengan jumlah recursion yang sangat besar, misalnya:

```kotlin
display(100000)
```

recursive function biasa berpotensi mengalami masalah stack.

## Menggunakan `tailrec`

Kotlin menyediakan keyword `tailrec` untuk memberi tahu compiler bahwa sebuah function merupakan tail recursive function.

Contoh:

```kotlin
tailrec fun display(value: Int) {
    println(value)

    if (value > 0) {
        display(value - 1)
    }
}
```

Pemanggilannya:

```kotlin
display(100000)
```

Jika function memenuhi persyaratan tail recursion, compiler Kotlin dapat mengoptimalkannya sehingga recursion tersebut tidak membutuhkan stack frame baru untuk setiap pemanggilan.

## Tail Recursive Function Manual

Contoh:

```kotlin
tailrec fun display(value: Int) {
    println(value)

    if (value > 0) {
        display(value - 1)
    }
}

fun main() {
    display(100000)
}
```

Pada contoh tersebut:

```kotlin
tailrec
```

digunakan untuk menandai function sebagai tail recursive.

Recursive call:

```kotlin
display(value - 1)
```

menjadi operasi terakhir dalam cabang tersebut.

Karena itu, compiler dapat melakukan optimasi tail recursion.

## Syarat Tail Recursive Function

Tidak semua recursive function dapat menggunakan optimasi tail recursion.

Agar sebuah function dapat menjadi tail recursive, recursive call harus menjadi **operasi terakhir** yang dilakukan function.

Contoh yang memenuhi syarat:

```kotlin
tailrec fun countdown(value: Int) {
    println(value)

    if (value > 0) {
        countdown(value - 1)
    }
}
```

Setelah:

```kotlin
countdown(value - 1)
```

tidak ada operasi lain yang dilakukan.

## Recursive Call Harus Menjadi Operasi Terakhir

Perhatikan contoh berikut:

```kotlin
tailrec fun countdown(value: Int) {
    if (value > 0) {
        countdown(value - 1)
    }
}
```

Recursive call:

```kotlin
countdown(value - 1)
```

merupakan operasi terakhir.

Tidak ada perhitungan lain setelah recursive call.

Hal ini memungkinkan compiler melakukan optimasi tail recursion.

## Contoh yang Bukan Tail Recursive

Perhatikan function berikut:

```kotlin
fun factorial(value: Int): Int {
    return value * factorial(value - 1)
}
```

Recursive call:

```kotlin
factorial(value - 1)
```

bukan operasi terakhir.

Setelah recursive call selesai, masih terdapat operasi:

```kotlin
value *
```

Hasil recursive call masih harus dikalikan dengan `value`.

Karena itu, function tersebut bukan bentuk tail recursive yang dapat dioptimalkan oleh compiler.

## Factorial dengan Tail Recursion

Factorial dapat diubah menjadi tail recursive dengan menggunakan parameter tambahan untuk menyimpan hasil sementara.

Contoh:

```kotlin
tailrec fun factorialRecursive(
    value: Int,
    total: Int = 1
): Int {
    return when (value) {
        1 -> total
        else -> factorialRecursive(
            value - 1,
            total * value
        )
    }
}
```

Pada function tersebut terdapat dua parameter:

```kotlin
value: Int
total: Int = 1
```

Parameter `value` digunakan untuk menentukan angka yang sedang diproses.

Parameter `total` digunakan untuk menyimpan hasil perhitungan sementara.

## Cara Kerja Tail Recursive Factorial

Misalnya:

```kotlin
factorialRecursive(5)
```

Nilai awal:

```text
value = 5
total = 1
```

Kemudian:

```text
value = 5
total = 1 × 5 = 5
```

Pemanggilan berikutnya:

```text
factorialRecursive(4, 5)
```

Kemudian:

```text
value = 4
total = 5 × 4 = 20
```

Berikutnya:

```text
factorialRecursive(3, 20)
```

Kemudian:

```text
value = 3
total = 20 × 3 = 60
```

Berikutnya:

```text
factorialRecursive(2, 60)
```

Kemudian:

```text
value = 2
total = 60 × 2 = 120
```

Terakhir:

```text
factorialRecursive(1, 120)
```

Karena:

```kotlin
value == 1
```

function mengembalikan:

```text
120
```

Jadi:

```text
5! = 120
```

## Contoh Program Lengkap

Berikut contoh program menggunakan Tail Recursive Function:

```kotlin
fun main() {

    // Tail Recursive Function
    tailrec fun display(value: Int) {
        println(value)

        if (value > 0) {
            display(value - 1)
        }
    }

    display(10)

    // Tail Recursive Function untuk Factorial
    tailrec fun factorialRecursive(
        value: Int,
        total: Int = 1
    ): Int {
        return when (value) {
            1 -> total
            else -> factorialRecursive(
                value - 1,
                total * value
            )
        }
    }

    println(factorialRecursive(10))
}
```

Output:

```text
10
9
8
7
6
5
4
3
2
1
0
3628800
```

## Mengapa Menggunakan Parameter `total`?

Pada recursive factorial biasa:

```kotlin
fun factorial(value: Int): Int {
    return value * factorial(value - 1)
}
```

masih ada operasi setelah recursive call.

Perhatikan:

```kotlin
value * factorial(value - 1)
```

Hasil dari:

```kotlin
factorial(value - 1)
```

masih harus dikalikan dengan `value`.

Pada tail recursion, perhitungan tersebut dipindahkan sebelum recursive call:

```kotlin
factorialRecursive(
    value - 1,
    total * value
)
```

Sehingga recursive call menjadi operasi terakhir.

## Perbandingan Recursive dan Tail Recursive

### Recursive Function Biasa

```kotlin
fun factorial(value: Int): Int {
    return when (value) {
        1 -> 1
        else -> value * factorial(value - 1)
    }
}
```

Pada function tersebut:

```kotlin
value * factorial(value - 1)
```

masih membutuhkan operasi perkalian setelah recursive call.

### Tail Recursive Function

```kotlin
tailrec fun factorial(
    value: Int,
    total: Int = 1
): Int {
    return when (value) {
        1 -> total
        else -> factorial(
            value - 1,
            total * value
        )
    }
}
```

Pada versi ini, hasil perhitungan sudah disimpan pada `total`.

Recursive call menjadi operasi terakhir:

```kotlin
factorial(value - 1, total * value)
```

## Tail Recursion dan Optimasi Compiler

Keyword:

```kotlin
tailrec
```

merupakan petunjuk kepada compiler bahwa function tersebut diharapkan dapat dioptimalkan sebagai tail recursion.

Jika function memenuhi aturan tail recursion, compiler Kotlin dapat mengubah implementasinya menjadi bentuk yang tidak membuat stack frame baru untuk setiap recursive call.

Secara konsep:

```text
Recursive Function

function
   ↓
function
   ↓
function
   ↓
function
```

dapat dioptimalkan menjadi proses seperti:

```text
loop
  ↓
  ↓
  ↓
  ↓
```

Namun, penting untuk dipahami bahwa `tailrec` **bukan berarti semua recursive function otomatis berubah menjadi loop**. Optimasi hanya dapat dilakukan jika function memenuhi persyaratan tail recursion.

## Compiler Warning

Jika kita menggunakan `tailrec` tetapi function tidak memenuhi syarat tail recursion, Kotlin dapat memberikan warning bahwa function tersebut tidak benar-benar melakukan tail recursion.

Contoh:

```kotlin
tailrec fun factorial(value: Int): Int {
    return value * factorial(value - 1)
}
```

Pada function tersebut, recursive call bukan operasi terakhir karena masih terdapat:

```kotlin
value *
```

setelah hasil recursive call.

Karena itu, function tersebut tidak dapat memperoleh optimasi tail recursion seperti yang diharapkan.

## Kelebihan Tail Recursive Function

Tail recursion memiliki beberapa keuntungan:

- Mengurangi penggunaan stack pada recursion yang dapat dioptimalkan.
- Dapat digunakan untuk recursion dengan jumlah pemanggilan yang besar.
- Memungkinkan penulisan algoritma secara recursive tanpa harus menggunakan stack frame baru untuk setiap pemanggilan.
- Membuat beberapa algoritma recursive menjadi lebih aman untuk input besar.

## Keterbatasan Tail Recursive Function

Tidak semua masalah recursive dapat diubah menjadi tail recursion dengan mudah.

Selain itu, tail recursion juga tidak selalu lebih mudah dibaca dibandingkan loop.

Jika sebuah masalah lebih sederhana menggunakan `for` atau `while`, penggunaan loop dapat menjadi pilihan yang lebih jelas.

Contohnya:

```kotlin
for (i in 10 downTo 1) {
    println(i)
}
```

Untuk kasus sederhana seperti ini, penggunaan loop mungkin lebih mudah dipahami daripada membuat recursive function.

## Kesimpulan

**Tail Recursive Function** adalah recursive function yang recursive call-nya menjadi **operasi terakhir** dalam function.

Kotlin menyediakan keyword:

```kotlin
tailrec
```

untuk function yang memenuhi persyaratan tail recursion.

Contoh:

```kotlin
tailrec fun factorialRecursive(
    value: Int,
    total: Int = 1
): Int {
    return when (value) {
        1 -> total
        else -> factorialRecursive(
            value - 1,
            total * value
        )
    }
}
```

Perbedaan penting:

```text
Recursive biasa
→ recursive call masih diikuti operasi lain

Tail recursive
→ recursive call menjadi operasi terakhir
```

Pada factorial biasa:

```kotlin
value * factorial(value - 1)
```

masih terdapat operasi perkalian setelah recursive call.

Pada tail recursive:

```kotlin
factorialRecursive(value - 1, total * value)
```

perhitungan sudah dilakukan sebelum recursive call.

:::tip
**Tail Recursive Function memungkinkan recursive function tertentu dioptimalkan oleh compiler menjadi bentuk yang lebih efisien dalam penggunaan stack, selama recursive call menjadi operasi terakhir dan memenuhi persyaratan tail recursion Kotlin.**
:::
