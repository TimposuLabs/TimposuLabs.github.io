---
sidebar_position: 15
title: 'For Loops'
---

Pada sebagian besar bahasa pemrograman, terdapat fitur yang bernama perulangan (loops). Salah satu fitur perulangan di Kotlin adalah `for`. For digunakan untuk melakukan perulangan **iterasi** dari data **iterator** (__Array__, __Range__, dan lain-lain).

## For Array

```kotlin
val days = arrayOf("Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu")

for (day in days) {
    println(day)
}
```

output:

```
Minggu
Senin
Selasa
Rabu
Kamis
Jumat
Sabtu
```

## For Range

```kotlin
// for range dari data array
val days = arrayOf("Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu")
val sizeDays = days.size - 1
for (i in 0..sizeDays) {
    println("index $i = ${days.get(i)}")
}

// for range 1 s/d 20
for (value in 1..20) {
    println(value)
}

// for range 20 down ke 0 dengan step 5
for (value in 20 downTo 0 step 5) {
    println(value)
}
```

Output:

```
index 0 = Minggu
index 1 = Senin
index 2 = Selasa
index 3 = Rabu
index 4 = Kamis
index 5 = Jumat
index 6 = Sabtu
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
20
15
10
5
0
```