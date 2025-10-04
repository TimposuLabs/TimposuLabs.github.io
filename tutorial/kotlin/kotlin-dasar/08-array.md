---
sidebar_position: 8
title: 'Array'
---

Array adalah tipe data yang berisikan kumpulan data dengan tipe yang sama. Tipe data array di Kotlin direpresentasikan dengan kata kunci Array.

## Membuat array

```kotlin
val users: Array<String> = arrayOf("Ucup", "Ade", "Recky")
```

## Index dalam array

Index dalam array dimulai dari `0`, jadi dari contoh di atas maka akan sebagai berikut:

| Index | Data |
| --- | --- |
| 0 | Ucup |
| 1 | Ade |
| 2 | Recky |

## Operasi array

|Operasi|Keterangan|
|---|---|
|`size`|Untuk mendapatkan panjang Array|
|`get(index)`|Mendapat data di posisi index|
|`[index]`|Mendapat data di posisi index|
|`set(index, value)`|Mengubah data di posisi index|
|`[index] = value`|Mengubah data di posisi index|

Contoh:

```kotlin
val users: Array<String> = arrayOf("Ucup", "Ade", "Recky")

    val ucup: String = users[0]

    // users.set(0, "Aco")
    users[0] = "Aco"
    println(users[1])
```

## Array Nullable

Secara standard data di Array di Kotlin tidak boleh null. Jika kita butuh membuat Array yang datanya boleh null, kita bisa menggunakan `?` (tanda tanya).

```kotlin
val members: Array<String?> = arrayOfNulls(3);
members.set(0, "Ayu")
members.set(1, null)
members.set(2, null)
```
