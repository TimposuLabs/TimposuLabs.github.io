---
sidebar_position: 24
title: 'Function Return Type'
---

Selain funtion yang tidak mengembalikan nilai atau data, terdapat juga function yang bisa mengembalikan data. Untuk memberitahu bahwa function mengembalikan data, kita harus menuliskan tipe data kembalian dari function tersebut. Jika function tersebut kita deklarasikan dengan tipe data pengembalian, maka wajib di dalam function nya kita harus mengembalikan data. Untuk mengembalikan data dari function, kita bisa menggunakan kata kunci `return`, diikuti dengan datanya.

```kotlin
// function mengembalikan nilai Int
fun penjumlahan(a: Int, b: Int): Int {
    val total = a + b
    return total
}

// function mengembalikan nilai Int
fun pembagian(a: Int, b: Int): Int {
    if (b == 0) {
        return 0
    } else {
        val total = a / b
        return total
    }
}

fun main() {
    val jumlahkan = penjumlahan(10, 50)
    println(jumlahkan)
    println(penjumlahan(20, 30))

    val bagikan = pembagian(50, 2)
    println(bagikan)
    println(pembagian(300, 30))
}
```

Output:

```
60
50
25
10
```
