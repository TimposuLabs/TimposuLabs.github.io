---
sidebar_position: 18
title: 'Break & Continue'
---

## 1️⃣ Break

Break digunakan untuk menghentikan seluruh perulangan:

```kotlin
var i = 0
while (true) {
    println("While is Running... on index $i")
    i++
    if (i > 100) {
        break
    }
}
```

Output:

```
While is Running... on index 0
While is Running... on index 1
While is Running... on index 2
While is Running... on index 3
While is Running... on index 4
While is Running... on index 5
While is Running... on index 6
While is Running... on index 7
While is Running... on index 8
While is Running... on index 9
While is Running... on index 10
```

## 2️⃣ Continue

Continue adalah digunakan untuk menghentikan perulangan yang berjalan, dan langsung melanjutkan ke perulangan selanjutnya.

```kotlin
for (i in 1..20) {
    // jika genap akan di continue / skip
    if (i % 2 == 0) {
        continue
    }
    println("Angka $i")
}
```

Output:

```
Angka 1
Angka 3
Angka 5
Angka 7
Angka 9
Angka 11
Angka 13
Angka 15
Angka 17
Angka 19
```
