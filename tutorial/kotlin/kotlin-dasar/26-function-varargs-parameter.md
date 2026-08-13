---
sidebar_position: 26
title: 'Function Varargs Parameter'
---

**Varargs Parameter** adalah parameter function yang memungkinkan kita mengirimkan **jumlah argument yang tidak terbatas** ke dalam sebuah function.

Dengan `vararg`, kita tidak perlu menentukan berapa banyak argument yang akan diterima oleh function.

## Sintaks Varargs

Bentuk umum:

```kotlin
fun namaFunction(vararg namaParameter: TipeData) {
    // kode
}
```

Contoh:

```kotlin
fun hitungSemua(vararg values: Int): Int {
    var total = 0

    for (value in values) {
        total += value
    }

    return total
}
```

Pada contoh tersebut:

```kotlin
vararg values: Int
```

berarti function `hitungSemua()` dapat menerima **satu atau banyak nilai bertipe `Int`**.

## Contoh Pemanggilan Function

Function dapat dipanggil dengan jumlah argument yang berbeda.

Contoh:

```kotlin
hitungSemua(10)
```

Atau:

```kotlin
hitungSemua(10, 20)
```

Atau:

```kotlin
hitungSemua(10, 20, 30)
```

Bahkan dapat menerima lebih banyak nilai:

```kotlin
hitungSemua(10, 20, 30, 40, 50)
```

Semua argument tersebut akan diterima oleh parameter `values`.

## Contoh Kasus Menghitung Semua Nilai

Kita dapat menggunakan `vararg` untuk membuat function yang menghitung total dari beberapa angka.

Contoh:

```kotlin
fun hitungSemua(vararg values: Int): Int {
    var total = 0

    for (value in values) {
        total += value
    }

    return total
}
```

Pada function tersebut terdapat variabel:

```kotlin
var total = 0
```

Variabel `total` digunakan untuk menyimpan hasil penjumlahan.

Kemudian kita melakukan perulangan:

```kotlin
for (value in values) {
    total += value
}
```

Setiap nilai yang terdapat pada `values` akan dijumlahkan ke dalam `total`.

Setelah seluruh nilai selesai diproses, function mengembalikan hasil menggunakan:

```kotlin
return total
```

## Contoh Program Lengkap

```kotlin
fun hitungSemua(vararg values: Int): Int {
    var total = 0

    for (value in values) {
        total += value
    }

    return total
}

fun main() {
    val values = hitungSemua(10, 40, 30, 20)

    println(values)
}
```

Output:

```text
100
```

Perhitungannya adalah:

```text
10 + 40 + 30 + 20 = 100
```

## Cara Kerja `vararg`

Ketika function dipanggil:

```kotlin
hitungSemua(10, 40, 30, 20)
```

nilai-nilai tersebut akan diterima oleh:

```kotlin
vararg values: Int
```

Secara sederhana, kita dapat membayangkan `values` berisi:

```text
10
40
30
20
```

Kemudian `for` mengambil setiap nilai satu per satu:

```kotlin
for (value in values) {
    total += value
}
```

Prosesnya:

```text
total = 0

total = 0 + 10
total = 10 + 40
total = 50 + 30
total = 80 + 20

total = 100
```

## `vararg` dengan Jumlah Argument yang Berbeda

Keuntungan utama `vararg` adalah kita tidak perlu menentukan jumlah argument.

Contoh:

```kotlin
println(hitungSemua(10))
```

Output:

```text
10
```

Contoh:

```kotlin
println(hitungSemua(10, 20))
```

Output:

```text
30
```

Contoh:

```kotlin
println(hitungSemua(10, 20, 30))
```

Output:

```text
60
```

Contoh:

```kotlin
println(hitungSemua(10, 20, 30, 40))
```

Output:

```text
100
```

## `vararg` dengan Parameter Lain

`vararg` juga dapat digunakan bersama parameter lainnya.

Contoh:

```kotlin
fun hitungTotal(nama: String, vararg values: Int): Int {
    var total = 0

    for (value in values) {
        total += value
    }

    println("Nama: $nama")

    return total
}
```

Pemanggilan:

```kotlin
val total = hitungTotal("Ucup", 10, 20, 30)

println("Total: $total")
```

Output:

```text
Nama: Ucup
Total: 60
```

Pada contoh tersebut:

```kotlin
nama: String
```

adalah parameter biasa.

Sedangkan:

```kotlin
vararg values: Int
```

adalah parameter yang dapat menerima banyak argument.

## `vararg` Harus Berada di Posisi yang Tepat

Dalam sebuah function, `vararg` biasanya digunakan setelah parameter wajib.

Contoh:

```kotlin
fun hitungTotal(nama: String, vararg values: Int): Int {
    var total = 0

    for (value in values) {
        total += value
    }

    return total
}
```

Pemanggilan:

```kotlin
hitungTotal("Ucup", 10, 20, 30)
```

Argument pertama `"Ucup"` diberikan kepada parameter `nama`.

Sedangkan:

```text
10, 20, 30
```

diberikan kepada `values`.

## Kapan Menggunakan `vararg`?

`vararg` cocok digunakan ketika sebuah function membutuhkan jumlah argument yang dapat berubah-ubah.

Contohnya:

- Menghitung total beberapa angka.
- Menghitung rata-rata beberapa nilai.
- Mencari nilai terbesar.
- Mencari nilai terkecil.
- Menggabungkan beberapa String.
- Memproses daftar data yang jumlahnya tidak tetap.

Contoh mencari nilai terbesar:

```kotlin
fun nilaiTerbesar(vararg values: Int): Int {
    var terbesar = values[0]

    for (value in values) {
        if (value > terbesar) {
            terbesar = value
        }
    }

    return terbesar
}
```

Penggunaan:

```kotlin
val result = nilaiTerbesar(10, 40, 30, 20)

println(result)
```

Output:

```text
40
```

## Kesimpulan

**`vararg`** digunakan ketika sebuah function dapat menerima **jumlah argument yang tidak tetap**.

Contoh:

```kotlin
fun hitungSemua(vararg values: Int): Int {
    var total = 0

    for (value in values) {
        total += value
    }

    return total
}
```

Function tersebut dapat dipanggil dengan jumlah argument yang berbeda:

```kotlin
hitungSemua(10)
```

```kotlin
hitungSemua(10, 20)
```

```kotlin
hitungSemua(10, 20, 30)
```

```kotlin
hitungSemua(10, 20, 30, 40)
```

Dengan `vararg`, function menjadi lebih fleksibel karena kita tidak perlu menentukan jumlah argument yang harus diberikan sejak awal.
