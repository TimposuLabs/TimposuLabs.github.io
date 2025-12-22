---
sidebar_position: 14
title: 'When Expression'
---

When Expression digunakan untuk melakukan percabangan di Kotlin selain `if`. When expression sangat sederhana dibandingkan `if`. Biasanya `when` expression digunakan untuk melakukan pengecekan ke kondisi dalam satu variable. When setara dengan `switch` pada bahasa pemograman lain.

## 1️⃣ `when` Expression

```kotlin
val nilai = "A"

when (nilai) {
    "A" -> { println("Mantap") }
    "B" -> { println("Bagus") }
    "C" -> { println("Cukup") }
    "D" -> { println("Kurang") }
    else -> {
        println("Anda Tidak Lulus")
    }
}
```

## 2️⃣ `when` Expression Multiple Option

```kotlin
val nilai = "A"

when (nilai) {
    "A", "B", "C" -> { println("Lulus") }
    else -> { println("Tidak Lulus") }
}
```

## 3️⃣ `when` Expression In

```kotlin
val nilaiAkhir = 'D'
val nilaiLulus = arrayOf('A', 'B', 'C')

when(nilaiAkhir) {
    in nilaiLulus -> println("Lulus")
    !in nilaiLulus -> println("Tidak Lulus")
}
```

## 4️⃣ `when` Expression Is

__When is__ digunakan untuk meng-verifikasi type data:

```kotlin
val name = 3
when (name) {
    is String -> println("Type Datanya STRING")
    !is String -> println("Type Datanya bukan STRING")
}
```

## 5️⃣ `when` Sebagai Pengganti `If Else`

Selain pengecekan terhadap variable, `when` juga dapat digunakan sebagai pengganti `if else`. Untuk mengganti `if else` dengan `when`, kita tidak perlu menggunakan variable dalam (tanda kurung) `when`:

```kotlin
val examValue = 30
when {
    examValue > 50 -> println("Lulus")
    examValue < 50 -> println("Tidak Lulus")
    else -> println("Nilai tidak valid")
}
```
