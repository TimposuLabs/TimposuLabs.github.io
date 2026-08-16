---
sidebar_position: 31
title: 'Recursive Function'
---

**Recursive Function** adalah function yang memanggil dirinya sendiri untuk menyelesaikan sebuah masalah.

Dengan recursive function, sebuah masalah dapat dipecah menjadi beberapa masalah yang lebih kecil sampai mencapai kondisi tertentu yang menghentikan proses pemanggilan function.

Secara sederhana:

```text
Function → memanggil dirinya sendiri → memanggil dirinya sendiri → ...
```

Recursive function harus memiliki **base case**, yaitu kondisi yang menghentikan proses recursion.

## Konsep Dasar Recursive Function

Struktur umum recursive function:

```kotlin
fun namaFunction(value: Int): Int {
    return if (kondisiBerhenti) {
        hasil
    } else {
        namaFunction(value - 1)
    }
}
```

Ada dua bagian penting:

1. **Base Case**  
   Kondisi yang menghentikan recursion.

2. **Recursive Case**  
   Bagian function yang memanggil dirinya sendiri.

Jika tidak terdapat kondisi berhenti, function akan terus memanggil dirinya sendiri dan dapat menyebabkan **StackOverflowError**.

## Contoh Factorial

Salah satu contoh sederhana untuk memahami recursive function adalah menghitung **factorial**.

Factorial dari sebuah bilangan `n` ditulis:

```text
n!
```

Contoh:

```text
5! = 5 × 4 × 3 × 2 × 1
```

Hasilnya:

```text
5! = 120
```

Secara matematis, factorial dapat didefinisikan sebagai:

```text
n! = n × (n - 1)!
```

Dengan kondisi berhenti:

```text
1! = 1
```

Konsep tersebut sangat cocok diterapkan menggunakan recursive function.

## Factorial Menggunakan For Loop

Sebelum menggunakan recursive function, kita dapat menghitung factorial menggunakan `for` loop.

Contoh:

```kotlin
fun factorialLoop(value: Int): Int {
    var result = 1

    for (i in value downTo 1) {
        result *= i
    }

    return result
}
```

Function tersebut melakukan perulangan dari nilai `value` sampai `1`.

Jika dipanggil:

```kotlin
println(factorialLoop(5))
```

Prosesnya:

```text
result = 1

result = 1 × 5
result = 5 × 4
result = 20 × 3
result = 60 × 2
result = 120 × 1

result = 120
```

Output:

```text
120
```

## Factorial Menggunakan Recursive Function

Sekarang kita dapat membuat factorial menggunakan recursive function.

```kotlin
fun factorialRecursive(value: Int): Int {
    return when (value) {
        1 -> 1
        else -> value * factorialRecursive(value - 1)
    }
}
```

Perhatikan bagian:

```kotlin
factorialRecursive(value - 1)
```

Function `factorialRecursive()` memanggil dirinya sendiri dengan nilai yang lebih kecil.

Sedangkan:

```kotlin
1 -> 1
```

merupakan **base case** yang menghentikan recursion.

## Cara Kerja Recursive Function

Misalnya kita memanggil:

```kotlin
factorialRecursive(5)
```

Maka prosesnya menjadi:

```text
factorialRecursive(5)
= 5 × factorialRecursive(4)

= 5 × 4 × factorialRecursive(3)

= 5 × 4 × 3 × factorialRecursive(2)

= 5 × 4 × 3 × 2 × factorialRecursive(1)
```

Ketika mencapai:

```kotlin
factorialRecursive(1)
```

kondisi:

```kotlin
1 -> 1
```

terpenuhi.

Function mengembalikan:

```text
1
```

Kemudian proses perhitungan kembali:

```text
5 × 4 × 3 × 2 × 1
```

Hasilnya:

```text
120
```

## Contoh Program Lengkap

Berikut contoh perbandingan factorial menggunakan `for` loop dan recursive function:

```kotlin
fun main() {

    // Factorial menggunakan For Loop
    fun factorialLoop(value: Int): Int {
        var result = 1

        for (i in value downTo 1) {
            result *= i
        }

        return result
    }

    println(factorialLoop(10))

    // Factorial menggunakan Recursive Function
    fun factorialRecursive(value: Int): Int {
        return when (value) {
            1 -> 1
            else -> value * factorialRecursive(value - 1)
        }
    }

    println(factorialRecursive(10))
}
```

Output:

```text
3628800
3628800
```

Kedua function menghasilkan nilai yang sama.

## Memahami Base Case

Base case merupakan bagian yang sangat penting dalam recursive function.

Pada contoh factorial:

```kotlin
when (value) {
    1 -> 1
    else -> value * factorialRecursive(value - 1)
}
```

Bagian:

```kotlin
1 -> 1
```

adalah base case.

Ketika `value` mencapai `1`, function tidak memanggil dirinya sendiri lagi.

Tanpa base case, recursion akan terus berjalan.

Contoh yang salah:

```kotlin
fun recursive(value: Int): Int {
    return value * recursive(value - 1)
}
```

Function tersebut tidak memiliki kondisi untuk berhenti.

Akibatnya function akan terus memanggil dirinya sendiri hingga stack penuh dan dapat menghasilkan:

```text
StackOverflowError
```

## Recursive Case

Selain base case, recursive function memiliki **recursive case**.

Pada contoh factorial:

```kotlin
else -> value * factorialRecursive(value - 1)
```

Bagian tersebut disebut recursive case karena function memanggil dirinya sendiri:

```kotlin
factorialRecursive(value - 1)
```

Nilai `value` dikurangi `1` pada setiap pemanggilan agar akhirnya mencapai base case.

## Struktur Recursive Function

Secara sederhana, recursive function factorial dapat digambarkan seperti berikut:

```text
factorial(5)
    ↓
5 × factorial(4)
        ↓
    4 × factorial(3)
            ↓
        3 × factorial(2)
                ↓
            2 × factorial(1)
                    ↓
                    1
```

Setelah mencapai `1`, hasil kemudian dikembalikan:

```text
1
↓
2 × 1 = 2
↓
3 × 2 = 6
↓
4 × 6 = 24
↓
5 × 24 = 120
```

## Recursive Function vs Loop

Factorial dapat dibuat menggunakan loop maupun recursion.

### Menggunakan Loop

```kotlin
fun factorialLoop(value: Int): Int {
    var result = 1

    for (i in value downTo 1) {
        result *= i
    }

    return result
}
```

### Menggunakan Recursion

```kotlin
fun factorialRecursive(value: Int): Int {
    return when (value) {
        1 -> 1
        else -> value * factorialRecursive(value - 1)
    }
}
```

Keduanya menghasilkan hasil yang sama.

Perbedaannya adalah cara penyelesaiannya.

Loop menggunakan perulangan secara langsung, sedangkan recursive function menyelesaikan masalah dengan memanggil dirinya sendiri.

## Kapan Menggunakan Recursive Function?

Recursive function cocok digunakan untuk masalah yang secara alami dapat dibagi menjadi masalah yang lebih kecil dengan pola yang sama.

Beberapa contoh penggunaannya:

- Factorial.
- Fibonacci.
- Struktur data tree.
- Struktur data folder dan subfolder.
- Algoritma pencarian tertentu.
- Algoritma sorting tertentu.
- Traversal tree.
- Masalah yang memiliki struktur berulang.

Namun, tidak semua masalah harus diselesaikan menggunakan recursion.

Jika masalah lebih sederhana dan mudah diselesaikan menggunakan loop, penggunaan loop sering kali lebih mudah dipahami.

## Contoh Recursive Function Sederhana

Contoh function untuk menghitung mundur:

```kotlin
fun countdown(value: Int) {
    if (value == 0) {
        println("Selesai")
    } else {
        println(value)
        countdown(value - 1)
    }
}
```

Pemanggilan:

```kotlin
countdown(5)
```

Output:

```text
5
4
3
2
1
Selesai
```

Pada contoh tersebut:

```kotlin
if (value == 0)
```

merupakan kondisi berhenti.

Sedangkan:

```kotlin
countdown(value - 1)
```

merupakan recursive case.

## Kesimpulan

**Recursive Function** adalah function yang memanggil dirinya sendiri.

Contoh:

```kotlin
fun factorialRecursive(value: Int): Int {
    return when (value) {
        1 -> 1
        else -> value * factorialRecursive(value - 1)
    }
}
```

Recursive function memiliki dua bagian penting:

- **Base Case** — kondisi yang menghentikan recursion.
- **Recursive Case** — bagian function yang memanggil dirinya sendiri.

Pada factorial:

```kotlin
1 -> 1
```

adalah base case.

Sedangkan:

```kotlin
value * factorialRecursive(value - 1)
```

adalah recursive case.

Prinsip sederhananya:

:::tip
**Recursive Function adalah function yang menyelesaikan masalah dengan memanggil dirinya sendiri sampai mencapai kondisi berhenti atau base case.**
:::