---
sidebar_position: 11
title: 'Operasi Perbandingan'
---

Operator perbandingan (atau operator relasional) digunakan dalam Kotlin untuk membandingkan dua nilai dan menentukan hubungannya. Hasil dari setiap operasi perbandingan selalu berupa nilai Boolean, yaitu `true` (benar) atau `false` (salah).

| Operator | Keterangan |
|---|---|
| `>` | Lebih Dari |
| `<` | Kurang Dari |
| `>=` | Lebih Dari Sama Dengan |
| `<=` | Kurang Dari Sama Dengan |
| `==` | Sama Dengan |
| `!=` | Tidak Sama Dengan |

Contoh:

```kotlin
val a = 100
val b = 200

val result: Boolean = a > b
println(result)
println(a >= b)
println(a != b)
```

Output:

```
false
false
true
```