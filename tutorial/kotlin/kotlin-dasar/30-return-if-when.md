---
sidebar_position: 30
title: 'Return If & When'
---

Dalam Kotlin, `if` dan `when` tidak hanya digunakan sebagai statement untuk menjalankan kode berdasarkan kondisi. Keduanya juga dapat digunakan sebagai **expression** yang menghasilkan sebuah nilai. Nilai tersebut kemudian dapat langsung dikembalikan menggunakan keyword `return`.

Konsep ini disebut **Return If & When**.

## Return If

Kita dapat menggunakan `if` sebagai expression dan mengembalikan hasilnya menggunakan `return`.

Contoh:

```kotlin
fun sayHelloIf(name: String = ""): String {
    return if (name == "") {
        "Hello Bro"
    } else {
        "Hello $name"
    }
}
```

Pada function tersebut:

```kotlin
return if (name == "") {
    "Hello Bro"
} else {
    "Hello $name"
}
```

`if` menghasilkan sebuah nilai yang kemudian dikembalikan oleh `return`.

## Cara Kerja Return If

Function `sayHelloIf()` memiliki parameter:

```kotlin
name: String = ""
```

Artinya parameter `name` memiliki nilai default berupa string kosong.

Jika function dipanggil tanpa argument:

```kotlin
sayHelloIf()
```

maka nilai `name` adalah:

```text
""
```

Kondisi:

```kotlin
name == ""
```

bernilai `true`.

Maka function mengembalikan:

```text
Hello Bro
```

## Return If dengan Parameter

Jika function dipanggil dengan nama:

```kotlin
sayHelloIf("Ucup")
```

maka nilai `name` adalah:

```text
Ucup
```

Kondisi:

```kotlin
name == ""
```

bernilai `false`.

Sehingga bagian `else` dijalankan:

```kotlin
"Hello $name"
```

Hasilnya:

```text
Hello Ucup
```

## Return When

Selain `if`, Kotlin juga memungkinkan kita menggunakan `when` sebagai expression.

Contoh:

```kotlin
fun sayHelloWhen(name: String = ""): String {
    return when (name) {
        "" -> "Hello Bro"
        else -> "Hello $name"
    }
}
```

Pada contoh tersebut:

```kotlin
return when (name) {
    "" -> "Hello Bro"
    else -> "Hello $name"
}
```

`when` menghasilkan sebuah nilai yang kemudian dikembalikan menggunakan `return`.

## Cara Kerja Return When

Ketika function dipanggil tanpa argument:

```kotlin
sayHelloWhen()
```

parameter `name` akan memiliki nilai:

```text
""
```

Kemudian `when` memeriksa:

```kotlin
"" -> "Hello Bro"
```

Karena nilai `name` adalah string kosong, hasilnya:

```text
Hello Bro
```

Jika dipanggil:

```kotlin
sayHelloWhen("Angga")
```

tidak ada kondisi yang cocok dengan `"Angga"`.

Maka bagian:

```kotlin
else -> "Hello $name"
```

akan dijalankan.

Hasilnya:

```text
Hello Angga
```

## Contoh Program Lengkap

Berikut contoh lengkap Return If dan Return When:

```kotlin
fun main() {

    fun sayHelloIf(name: String = ""): String {
        return if (name == "") {
            "Hello Bro"
        } else {
            "Hello $name"
        }
    }

    fun sayHelloWhen(name: String = ""): String {
        return when (name) {
            "" -> "Hello Bro"
            else -> "Hello $name"
        }
    }

    println(sayHelloIf())
    println(sayHelloIf("Ucup"))

    println(sayHelloWhen())
    println(sayHelloWhen("Angga"))
}
```

Output:

```text
Hello Bro
Hello Ucup
Hello Bro
Hello Angga
```

## Return If sebagai Expression

Pada Kotlin, `if` dapat menghasilkan nilai.

Contoh:

```kotlin
val result = if (10 > 5) {
    "Benar"
} else {
    "Salah"
}

println(result)
```

Output:

```text
Benar
```

Karena kondisi:

```kotlin
10 > 5
```

bernilai `true`, maka expression `if` menghasilkan:

```text
Benar
```

Nilai tersebut disimpan ke dalam variable `result`.

Hal yang sama dapat dilakukan dengan `return`:

```kotlin
fun cekAngka(number: Int): String {
    return if (number > 0) {
        "Positif"
    } else {
        "Bukan positif"
    }
}
```

## Return When sebagai Expression

`when` juga dapat menghasilkan nilai.

Contoh:

```kotlin
fun cekHari(day: Int): String {
    return when (day) {
        1 -> "Senin"
        2 -> "Selasa"
        3 -> "Rabu"
        else -> "Hari tidak diketahui"
    }
}
```

Penggunaan:

```kotlin
println(cekHari(1))
```

Output:

```text
Senin
```

Contoh:

```kotlin
println(cekHari(3))
```

Output:

```text
Rabu
```

## Perbandingan Return If dan Return When

Untuk kondisi sederhana, `if` sering lebih mudah digunakan.

Contoh:

```kotlin
fun sayHello(name: String): String {
    return if (name == "") {
        "Hello Bro"
    } else {
        "Hello $name"
    }
}
```

Sedangkan `when` cocok ketika terdapat beberapa kondisi.

Contoh:

```kotlin
fun getDay(day: Int): String {
    return when (day) {
        1 -> "Senin"
        2 -> "Selasa"
        3 -> "Rabu"
        4 -> "Kamis"
        5 -> "Jumat"
        6 -> "Sabtu"
        7 -> "Minggu"
        else -> "Hari tidak valid"
    }
}
```

Dengan banyak kondisi, `when` biasanya lebih mudah dibaca dibandingkan menggunakan banyak `if` dan `else if`.

## Return If dengan Single Expression

Karena `if` dapat menghasilkan nilai, kita juga dapat menggabungkannya dengan **Single Expression Function**.

Contoh:

```kotlin
fun sayHello(name: String = ""): String =
    if (name == "") "Hello Bro" else "Hello $name"
```

Function tersebut melakukan hal yang sama dengan:

```kotlin
fun sayHello(name: String = ""): String {
    return if (name == "") {
        "Hello Bro"
    } else {
        "Hello $name"
    }
}
```

## Return When dengan Single Expression

Hal yang sama dapat dilakukan dengan `when`.

Contoh:

```kotlin
fun sayHello(name: String = ""): String =
    when (name) {
        "" -> "Hello Bro"
        else -> "Hello $name"
    }
```

Function tersebut menggunakan `when` sebagai expression dan langsung mengembalikan hasilnya.

## Kesimpulan

Dalam Kotlin, `if` dan `when` dapat digunakan sebagai **expression** yang menghasilkan nilai.

Contoh Return If:

```kotlin
fun sayHelloIf(name: String = ""): String {
    return if (name == "") {
        "Hello Bro"
    } else {
        "Hello $name"
    }
}
```

Contoh Return When:

```kotlin
fun sayHelloWhen(name: String = ""): String {
    return when (name) {
        "" -> "Hello Bro"
        else -> "Hello $name"
    }
}
```

Konsep penting yang perlu diingat:

- `if` dapat menghasilkan nilai.
- `when` dapat menghasilkan nilai.
- Nilai dari `if` atau `when` dapat dikembalikan menggunakan `return`.
- `if` cocok untuk kondisi sederhana.
- `when` cocok untuk beberapa kondisi.
- `if` dan `when` dapat digunakan bersama **Single Expression Function**.
