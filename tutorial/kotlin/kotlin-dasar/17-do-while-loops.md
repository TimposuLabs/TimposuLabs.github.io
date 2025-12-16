---
sidebar_position: 17
title: 'Do While Loops'
---

Do While Loop adalah perulangan yang hampir sama dengan While Loop. Yang membedakan adalah, pada Do While Loop, kode blok akan dijalankan dahulu, baru diakhir dilakukan pengecekan kondisi.

```kotlin
var i = 0

do {
    // block dalam 'do' akan selalu dieksekusi terlebih dahulu sebelum pengecekan kondisi pada 'while'
    println("Perulangan ke $i")
    i++
} while (i < 10)
```

Output

```
Perulangan ke 0
Perulangan ke 1
Perulangan ke 2
Perulangan ke 3
Perulangan ke 4
Perulangan ke 5
Perulangan ke 6
Perulangan ke 7
Perulangan ke 8
Perulangan ke 9
```