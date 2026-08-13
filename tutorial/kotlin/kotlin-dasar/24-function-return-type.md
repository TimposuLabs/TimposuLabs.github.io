---
sidebar_position: 24
title: 'Function Return Type'
---

**Return Type** adalah tipe data dari nilai yang dikembalikan oleh sebuah function.

Function tidak hanya dapat menjalankan suatu proses, tetapi juga dapat menghasilkan sebuah nilai yang kemudian digunakan oleh kode lain.

Contohnya, sebuah function dapat mengembalikan:

- `Int`
- `String`
- `Double`
- `Boolean`
- dan tipe data lainnya.

## Sintaks Function dengan Return Type

Bentuk umum:

```kotlin
fun namaFunction(parameter: TipeData): TipeReturn {
    // proses

    return nilai
}
```

Perhatikan bagian:

```kotlin
: TipeReturn
```

Bagian tersebut digunakan untuk menentukan tipe data nilai yang dikembalikan oleh function.

Sedangkan:

```kotlin
return nilai
```

digunakan untuk mengembalikan nilai tersebut.

## Contoh Function Mengembalikan Int

Contoh function yang mengembalikan nilai `Int`:

```kotlin
fun penjumlahan(a: Int, b: Int): Int {
    val total = a + b
    return total
}
```

Function tersebut memiliki return type:

```kotlin
Int
```

Artinya, function `penjumlahan()` harus mengembalikan nilai bertipe `Int`.

Pada bagian:

```kotlin
val total = a + b
```

hasil penjumlahan disimpan ke dalam variable `total`.

Kemudian:

```kotlin
return total
```

mengembalikan nilai tersebut kepada pemanggil function.

## Memanggil Function Return Type

Function dapat dipanggil dan hasilnya disimpan ke dalam variable.

Contoh:

```kotlin
val jumlahkan = penjumlahan(10, 50)

println(jumlahkan)
```

Prosesnya:

```text
10 + 50 = 60
```

Sehingga nilai `jumlahkan` adalah:

```text
60
```

Output:

```text
60
```

## Langsung Menggunakan Hasil Return

Nilai yang dikembalikan function juga dapat langsung digunakan tanpa menyimpannya ke variable.

Contoh:

```kotlin
println(penjumlahan(20, 30))
```

Function:

```kotlin
penjumlahan(20, 30)
```

menghasilkan:

```text
50
```

Sehingga output:

```text
50
```

## Contoh Function Pembagian

Kita juga dapat membuat function yang mengembalikan hasil pembagian.

```kotlin
fun pembagian(a: Int, b: Int): Int {
    if (b == 0) {
        return 0
    } else {
        val total = a / b
        return total
    }
}
```

Function tersebut memiliki return type:

```kotlin
Int
```

Artinya semua jalur pada function harus mengembalikan nilai bertipe `Int`.

## Menggunakan `return` pada `if`

Pada function `pembagian()`, terdapat kondisi:

```kotlin
if (b == 0) {
    return 0
}
```

Jika nilai `b` adalah `0`, function langsung mengembalikan nilai:

```text
0
```

Hal ini mencegah proses pembagian dengan angka `0`.

Jika `b` bukan `0`, bagian `else` dijalankan:

```kotlin
else {
    val total = a / b
    return total
}
```

## Contoh Pemanggilan Function Pembagian

Contoh:

```kotlin
val bagikan = pembagian(50, 2)

println(bagikan)
```

Perhitungannya:

```text
50 / 2 = 25
```

Output:

```text
25
```

Function juga dapat langsung digunakan:

```kotlin
println(pembagian(300, 30))
```

Perhitungannya:

```text
300 / 30 = 10
```

Output:

```text
10
```

## Contoh Ketika Pembagi Bernilai 0

Jika kita memanggil:

```kotlin
println(pembagian(100, 0))
```

Kondisi:

```kotlin
if (b == 0)
```

bernilai `true`.

Function akan menjalankan:

```kotlin
return 0
```

Output:

```text
0
```

Dengan demikian, function tidak melakukan operasi:

```text
100 / 0
```

## Contoh Program Lengkap

Berikut contoh lengkap function dengan return type:

```kotlin
// Function mengembalikan nilai Int
fun penjumlahan(a: Int, b: Int): Int {
    val total = a + b
    return total
}

// Function mengembalikan nilai Int
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

```text
60
50
25
10
```

## Return Type `String`

Return type tidak hanya dapat berupa `Int`.

Function juga dapat mengembalikan `String`.

Contoh:

```kotlin
fun sayHello(name: String): String {
    return "Hello $name"
}
```

Pemanggilan:

```kotlin
val message = sayHello("Ucup")

println(message)
```

Output:

```text
Hello Ucup
```

## Return Type `Boolean`

Function juga dapat mengembalikan `Boolean`.

Contoh:

```kotlin
fun isLulus(nilai: Int): Boolean {
    return nilai >= 75
}
```

Pemanggilan:

```kotlin
println(isLulus(80))
```

Output:

```text
true
```

Contoh:

```kotlin
println(isLulus(60))
```

Output:

```text
false
```

## Return Type `Double`

Function dapat mengembalikan nilai `Double`.

Contoh:

```kotlin
fun luasLingkaran(radius: Double): Double {
    return 3.14 * radius * radius
}
```

Pemanggilan:

```kotlin
println(luasLingkaran(7.0))
```

Output:

```text
153.86
```

## Return Type Harus Sesuai

Jika function didefinisikan memiliki return type `Int`:

```kotlin
fun penjumlahan(a: Int, b: Int): Int {
    return a + b
}
```

Maka function tersebut harus mengembalikan nilai `Int`.

Contoh yang benar:

```kotlin
return a + b
```

Contoh yang tidak sesuai:

```kotlin
return "Hello"
```

Karena `"Hello"` merupakan `String`, bukan `Int`.

## Return Type dan `return`

Perhatikan hubungan berikut:

```kotlin
fun penjumlahan(a: Int, b: Int): Int {
    return a + b
}
```

```text
:Int
  ↓
Menentukan tipe nilai yang dikembalikan

return
  ↓
Mengembalikan nilai dari function
```

Jadi, `: Int` dan `return` memiliki fungsi yang berbeda.

`: Int` menentukan **tipe return**, sedangkan `return` mengembalikan **nilai**.

## Kesimpulan

**Return Type** digunakan untuk menentukan tipe data nilai yang dikembalikan oleh sebuah function.

Contoh:

```kotlin
fun penjumlahan(a: Int, b: Int): Int {
    val total = a + b
    return total
}
```

Pada contoh tersebut:

```kotlin
: Int
```

menunjukkan bahwa function mengembalikan nilai bertipe `Int`.

Sedangkan:

```kotlin
return total
```

mengembalikan nilai hasil penjumlahan.

Function yang memiliki return type dapat digunakan seperti:

```kotlin
val jumlahkan = penjumlahan(10, 50)
```

atau langsung:

```kotlin
println(penjumlahan(20, 30))
```

Selain `Int`, function dapat mengembalikan berbagai tipe data seperti:

```kotlin
String
Boolean
Double
```

Jadi, prinsip sederhananya:

:::tip
**Return Type menentukan tipe data yang dikembalikan oleh function, sedangkan `return` digunakan untuk mengembalikan nilai tersebut kepada pemanggil function.**
:::
