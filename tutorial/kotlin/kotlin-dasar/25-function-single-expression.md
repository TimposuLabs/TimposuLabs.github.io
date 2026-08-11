---
sidebar_position: 25
title: 'Function Single Expression'
---

**Single Expression Function** adalah cara menulis function Kotlin secara lebih singkat ketika isi function hanya terdiri dari **satu expression**.

Pada function biasa, kita menggunakan `{ }` untuk menuliskan isi function. Namun, jika function hanya membutuhkan satu baris kode, kita dapat menggunakan tanda `=`.

## Sintaks Single Expression Function

Bentuk umum:

```kotlin
fun namaFunction(parameter: TipeData): TipeReturn = expression
```

Contoh:

```kotlin
fun perkalianLima(x: Int): Int = x * 5
```

Function `perkalianLima()` menerima parameter `x` bertipe `Int`, kemudian mengembalikan hasil dari `x * 5`.

Jika function dipanggil:

```kotlin
val result = perkalianLima(10)
```

Maka nilai `result` adalah:

```text
50
```

## Perbandingan dengan Function Biasa

Function yang sama jika ditulis menggunakan **block body**:

```kotlin
fun perkalianLima(x: Int): Int {
    return x * 5
}
```

Dengan **Single Expression Function**, function tersebut dapat ditulis lebih singkat:

```kotlin
fun perkalianLima(x: Int): Int = x * 5
```

Kedua function tersebut menghasilkan nilai yang sama.

## Single Expression Function dengan Unit

Single Expression Function juga dapat digunakan pada function yang tidak mengembalikan nilai secara khusus.

Contohnya:

```kotlin
fun sayHello(name: String): Unit = println("Hello $name")
```

Function `sayHello()` menerima parameter `name`, kemudian menjalankan `println()`.

Pemanggilannya:

```kotlin
sayHello("Ucup")
```

Output:

```text
Hello Ucup
```

## Contoh Program Lengkap

Berikut contoh program lengkap menggunakan Single Expression Function:

```kotlin
fun perkalianLima(x: Int): Int = x * 5

fun sayHello(name: String): Unit = println("Hello $name")

fun main() {
    val result = perkalianLima(10)

    println("Jumlah perkalian $result")
    sayHello("Ucup")
}
```

Output:

```text
Jumlah perkalian 50
Hello Ucup
```

## Menggunakan Type Inference

Kotlin dapat mengetahui tipe return function secara otomatis melalui **type inference**.

Contoh:

```kotlin
fun perkalianLima(x: Int) = x * 5
```

Kotlin akan mengetahui bahwa function tersebut mengembalikan nilai bertipe `Int`.

Sehingga:

```kotlin
fun perkalianLima(x: Int): Int = x * 5
```

dapat ditulis menjadi:

```kotlin
fun perkalianLima(x: Int) = x * 5
```

Untuk function sederhana, cara ini membuat kode menjadi lebih ringkas.

## Contoh Single Expression Function

### Penjumlahan

```kotlin
fun tambah(a: Int, b: Int) = a + b
```

Contoh penggunaan:

```kotlin
val result = tambah(10, 20)

println(result)
```

Output:

```text
30
```

### Pengurangan

```kotlin
fun kurang(a: Int, b: Int) = a - b
```

### Perkalian

```kotlin
fun kali(a: Int, b: Int) = a * b
```

### Pembagian

```kotlin
fun bagi(a: Int, b: Int) = a / b
```

### Menghitung Kuadrat

```kotlin
fun kuadrat(x: Int) = x * x
```

Contoh:

```kotlin
println(kuadrat(5))
```

Output:

```text
25
```

### Mengecek Bilangan Genap

Single Expression Function juga dapat digunakan untuk menghasilkan nilai `Boolean`.

```kotlin
fun isGenap(number: Int) = number % 2 == 0
```

Contoh penggunaan:

```kotlin
println(isGenap(10))
println(isGenap(7))
```

Output:

```text
true
false
```

### Membuat Greeting

```kotlin
fun greeting(name: String) = "Hello, $name!"
```

Penggunaan:

```kotlin
val message = greeting("Ucup")

println(message)
```

Output:

```text
Hello, Ucup!
```

## Single Expression dengan Return Type

Kita tetap dapat menentukan return type secara eksplisit.

Contoh:

```kotlin
fun tambah(a: Int, b: Int): Int = a + b
```

Return type function tersebut adalah `Int`.

Contoh lainnya:

```kotlin
fun isLulus(nilai: Int): Boolean = nilai >= 75
```

Function tersebut mengembalikan `Boolean`.

Sedangkan:

```kotlin
fun greeting(name: String): String = "Hello, $name!"
```

Function tersebut mengembalikan `String`.

## Single Expression vs Block Body

Perhatikan perbedaan berikut.

### Menggunakan Block Body

```kotlin
fun perkalianLima(x: Int): Int {
    return x * 5
}
```

### Menggunakan Single Expression

```kotlin
fun perkalianLima(x: Int): Int = x * 5
```

Single Expression lebih ringkas karena kita tidak membutuhkan:

- `{ }`
- keyword `return`

## Function dengan Beberapa Statement

Jika function memiliki beberapa statement, gunakan **block body**.

Contoh:

```kotlin
fun prosesData(name: String) {
    println("Memproses data...")
    println("Nama: $name")
    println("Data selesai diproses")
}
```

Function tersebut memiliki beberapa proses sehingga lebih tepat menggunakan `{ }`.

Single Expression tidak cocok untuk kasus seperti ini karena function tidak hanya memiliki satu expression.

## Kapan Menggunakan Single Expression Function?

Gunakan Single Expression Function ketika:

- Function hanya memiliki satu expression.
- Logika function sederhana.
- Function hanya melakukan satu operasi.
- Function menghasilkan satu nilai.
- Penulisan satu baris membuat kode lebih mudah dibaca.

Contoh:

```kotlin
fun luasPersegi(sisi: Int) = sisi * sisi
```

Contoh lainnya:

```kotlin
fun isLulus(nilai: Int) = nilai >= 75
```

## Kapan Menggunakan Block Body?

Gunakan block body ketika function:

- Memiliki beberapa statement.
- Memiliki beberapa langkah proses.
- Membutuhkan beberapa kondisi atau operasi.
- Membutuhkan kode yang lebih kompleks.

Contoh:

```kotlin
fun cekNilai(nilai: Int) {
    println("Nilai: $nilai")

    if (nilai >= 75) {
        println("Status: Lulus")
    } else {
        println("Status: Tidak Lulus")
    }
}
```

Function tersebut lebih mudah dibaca menggunakan block body.

## Kelebihan Single Expression Function

Beberapa kelebihan Single Expression Function:

1. **Kode lebih singkat**

   Tidak membutuhkan `{ }` dan `return`.

2. **Lebih mudah dibaca**

   Untuk function sederhana, tujuan function dapat terlihat langsung dalam satu baris.

3. **Mengurangi boilerplate**

   Kita tidak perlu menulis kode tambahan yang tidak diperlukan.

4. **Cocok untuk function sederhana**

   Terutama untuk function yang hanya melakukan operasi atau menghasilkan satu nilai.

Contoh:

```kotlin
fun luasLingkaran(radius: Double) = 3.14 * radius * radius
```

## Contoh Program Lengkap

Berikut contoh program yang menggunakan beberapa Single Expression Function:

```kotlin
fun tambah(a: Int, b: Int) = a + b

fun kurang(a: Int, b: Int) = a - b

fun kali(a: Int, b: Int) = a * b

fun kuadrat(x: Int) = x * x

fun isGenap(number: Int) = number % 2 == 0

fun greeting(name: String) = "Hello, $name!"

fun main() {
    println("Hasil tambah: ${tambah(10, 5)}")
    println("Hasil kurang: ${kurang(10, 5)}")
    println("Hasil kali: ${kali(10, 5)}")
    println("Hasil kuadrat: ${kuadrat(5)}")
    println("Apakah 10 genap? ${isGenap(10)}")
    println(greeting("Ucup"))
}
```

Output:

```text
Hasil tambah: 15
Hasil kurang: 5
Hasil kali: 50
Hasil kuadrat: 25
Apakah 10 genap? true
Hello, Ucup!
```

## Kesimpulan

**Single Expression Function** memungkinkan kita menulis function sederhana menggunakan tanda `=` tanpa menggunakan block body `{ }`.

Bentuk umum:

```kotlin
fun namaFunction(parameter: TipeData): TipeReturn = expression
```

Contoh:

```kotlin
fun perkalianLima(x: Int): Int = x * 5
```

Dengan **type inference**, return type dapat ditulis lebih singkat:

```kotlin
fun perkalianLima(x: Int) = x * 5
```

Perbandingan:

```kotlin
// Block Body
fun perkalianLima(x: Int): Int {
    return x * 5
}

// Single Expression
fun perkalianLima(x: Int): Int = x * 5
```

Jadi, prinsip sederhananya:

:::tip
Jika sebuah function hanya membutuhkan **satu expression**, kita dapat menggunakan **Single Expression Function** dengan tanda `=` untuk membuat kode menjadi lebih singkat dan mudah dibaca.
:::
