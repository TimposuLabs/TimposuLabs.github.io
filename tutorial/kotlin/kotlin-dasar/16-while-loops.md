---
sidebar_position: 16
title: 'While Loops'
---

While adalah salah satu perulangan yang sangat flexible, dimana kode `while` akan melakukan pengecekan kondisi, jika kondisi bernilai `true`, maka dia akan menjalankan blok `while`, dan terus diulangi sampai kondisi `while` bernilai `false`.

```kotlin
var i = 0

// jika kondisi while true, maka block while akan dieksekusi
while (i < 10) {
    println(i)
    i++
}
```

Output:

```
0
1
2
3
4
5
6
7
8
9
```
