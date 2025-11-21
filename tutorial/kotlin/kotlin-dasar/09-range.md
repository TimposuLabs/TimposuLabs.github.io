---
sidebar_position: 9
title: 'Type Data Range'
---

Dalam kasus tertentu membuat array yang berisi data yang angka berurutan. Membuat array dengan jumlah data sedikit mungkin mudah, tapi bagaimana jika data angka yang berurutannya sangat banyak, misal dari 1 sampai 1000, Kotlin mendukung tipe data range, yang digunakan untuk kebutuhan seperti ini. Cara membuat range di Kotlin sangat mudah cukup menggunakan tanda `..` (titik dua kali) :

```kotlin
val range = 1..100
```

## Operasi Range

| Operasi | Keterangan |
| --- | --- |
| `count()` | Mendapatkan total data di range |
| `contains(value)` | Mengecek apakah terdapat value tersebut |
| `first` | Mendapatkan nilai pertama |
| `last` | Mendapatkan nilai terakhir |
| `step` | Mendapatkan nilai tiap kenaikan |

Contoh:

```kotlin
val range = 1..100

println(range.count())
println(range.contains(50))
println(range.contains(500))
println(range.first)
println(range.last)
println(range.step)
```

## Range Terbalik / Reverse

```kotlin
val rangeDown = 100 downTo 1
println(rangeDown.count())
println(rangeDown.contains(50))
println(rangeDown.contains(500))
println(rangeDown.first)
println(rangeDown.last)
println(rangeDown.step)
```

## Range dengan Step

```kotlin
val rangeStep = 1..100 step 5
println(rangeStep.count())
println(rangeStep.contains(50))
println(rangeStep.contains(500))
println(rangeStep.first)
println(rangeStep.last)
println(rangeStep.step)
```