---
sidebar_position: 10
title: 'Operasi Aritmatika'
---

Kotlin menyediakan operator aritmatika standar yang digunakan untuk melakukan perhitungan matematis dasar pada nilai numerik, mirip dengan bahasa pemrograman lainnya seperti Java atau C++.

| Operator | Keterangan |
| --- | --- |
| `+` | Penjumlahan |
| `-` | Pengurangan |
| `*` | Perkalian |
| `/` | Pembagian |
| `%` | Sisa Pembagian (Modulus) |

Contoh:

```kotlin
val a = 10
val b = 3

val sum = a + b         // Penjumlahan: 10 + 3 = 13
val difference = a - b  // Pengurangan: 10 - 3 = 7
val product = a * b     // Perkalian: 10 * 3 = 30
val quotient = a / b    // Pembagian (integer): 10 / 3 = 3 (desimal dipotong)
val remainder = a % b   // Modulus: Sisa bagi dari 10 / 3 = 1

println("Sum: $sum")
println("Difference: $difference")
println("Product: $product")
println("Quotient: $quotient")
println("Remainder: $remainder")
```

## Augmented Assignments

Augmented assignments, atau operator penugasan majemuk, adalah cara yang lebih ringkas (singkat) dalam Kotlin untuk melakukan operasi aritmatika dan secara bersamaan menetapkan (menugaskan) hasilnya kembali ke variabel yang sama.

|Operasi Matematika|Augmented Assignments|
|---|---|
| `a = a + 10` | `a += 10` |
| `a = a - 10` | `a -= 10` |
| `a = a * 10` | `a *= 10` |
| `a = a / 10` | `a /= 10` |
| `a = a % 10` | `a %= 10` |

Contoh penggunaan:

```kotlin
var total: Int = 0

val barang1: Int = 100
total += barang1

val barang2: Int = 200
total += barang2

val barang3: Int = 300
total += barang3

println(total)
```

## Unary Operator

Operator unary adalah operator dalam pemrograman yang bekerja pada satu operan tunggal (satu nilai atau variabel) saja, berbeda dengan operator biner (seperti + atau - dalam aritmatika biasa) yang membutuhkan dua operan.

| Operator | Keterangan |
|---|---|
| `++` | `a = a + 1` |
| `--` | `a = a - 1` |
| `-` | Negative |
| `+` | Positive |
| `!` | Boolean kebalikan |

Contoh:

```kotlin
var x = 10
val isTrue = true

// Unary Plus (pada dasarnya tidak mengubah apa-apa)
val positiveX = +x
println("Unary Plus (+x): $positiveX") // Output: 10

// Unary Minus (mengubah tanda)
val negativeX = -x
println("Unary Minus (-x): $negativeX") // Output: -10

// Logical NOT (!)
val isFalse = !isTrue
println("Logical Not (!isTrue): $isFalse") // Output: false

// Unary Increment & Decrement
var a = 5
val b = ++a 
// a menjadi 6, lalu nilai 6 ditugaskan ke b

println("Nilai a (prefix): $a") // Output: 6
println("Nilai b (prefix): $b") // Output: 6
```