---
sidebar_position: 38
title: 'Label'
---

**Label** adalah sebuah penanda yang dapat digunakan untuk memberikan nama pada sebuah expression atau blok kode tertentu.

Label sangat berguna ketika kita ingin mengontrol alur program menggunakan:

- `break`
- `continue`
- `return`

Dengan label, kita dapat menentukan **blok kode mana yang ingin dihentikan atau dilanjutkan**.

## Membuat Label

Sintaks label di Kotlin menggunakan nama label yang diikuti karakter `@`.

Contoh:

```kotlin
loop@ for (i in 1..10) {
    println(i)
}
```

Pada contoh tersebut:

```kotlin
loop@
```

adalah label yang diberikan kepada `for loop`.

Nama label dapat dibuat sesuai kebutuhan.

Contoh:

```kotlin
loopI@
loopJ@
outerLoop@
innerLoop@
```

## Label pada Nested Loop

Label sangat berguna ketika kita memiliki **nested loop**, yaitu loop di dalam loop.

Contoh:

```kotlin
loopI@ for (i in 1..10) {
    loopJ@ for (j in 1..10) {
        println("$i x $j = ${i * j}")
    }
}
```

Pada contoh tersebut terdapat dua label:

```kotlin
loopI@
```

untuk loop bagian luar.

Dan:

```kotlin
loopJ@
```

untuk loop bagian dalam.

Strukturnya:

```text
loopI@
└── loopJ@
```

Dengan label tersebut, kita dapat menentukan loop mana yang ingin dihentikan atau dilanjutkan.

## Label dengan `break`

`break` digunakan untuk menghentikan perulangan.

Tanpa label, `break` akan menghentikan loop tempat `break` tersebut berada.

Contoh:

```kotlin
for (i in 1..10) {
    for (j in 1..10) {
        if (i > 5) {
            break
        }

        println("$i x $j = ${i * j}")
    }
}
```

Pada contoh tersebut, `break` hanya menghentikan loop bagian dalam.

## `break` dengan Label

Dengan label, kita dapat menentukan loop mana yang ingin dihentikan.

Contoh:

```kotlin
fun labelBreak() {

    loopI@ for (i in 1..10) {

        loopJ@ for (j in 1..10) {

            if (i > 5) {
                break@loopI
            }

            println("$i x $j = ${i * j}")
        }
    }
}
```

Perhatikan:

```kotlin
break@loopI
```

Artinya `break` akan menghentikan loop yang memiliki label:

```kotlin
loopI@
```

Bukan hanya loop bagian dalam.

## Cara Kerja `break@loopI`

Pada contoh:

```kotlin
loopI@ for (i in 1..10) {

    loopJ@ for (j in 1..10) {

        if (i > 5) {
            break@loopI
        }

        println("$i x $j = ${i * j}")
    }
}
```

Ketika:

```kotlin
i > 5
```

bernilai `true`, program menjalankan:

```kotlin
break@loopI
```

Sehingga loop `loopI` langsung dihentikan.

Dengan kata lain:

```text
loopI@
│
└── loopJ@
       │
       └── break@loopI
```

`break` akan keluar langsung dari `loopI`.

## Contoh Output `labelBreak()`

```kotlin
fun labelBreak() {

    loopI@ for (i in 1..10) {

        loopJ@ for (j in 1..10) {

            if (i > 5) {
                break@loopI
            }

            println("$i x $j = ${i * j}")
        }
    }
}
```

Output:

```text
1 x 1 = 1
1 x 2 = 2
...
5 x 10 = 50
```

Ketika `i` menjadi `6`, kondisi:

```kotlin
i > 5
```

terpenuhi sehingga:

```kotlin
break@loopI
```

menghentikan loop luar.

## Label dengan `continue`

`continue` digunakan untuk melewati iterasi saat ini dan melanjutkan ke iterasi berikutnya.

Contoh:

```kotlin
fun labelContinue() {

    loopI@ for (i in 1..10) {

        loopJ@ for (j in 1..10) {

            if (j == 5) {
                continue@loopI
            }

            println("$i x $j = ${i * j}")
        }
    }
}
```

Perhatikan:

```kotlin
continue@loopI
```

Artinya program akan melanjutkan ke iterasi berikutnya dari loop yang memiliki label:

```kotlin
loopI@
```

## Perbedaan `break` dan `continue`

`break`:

```kotlin
break@loopI
```

menghentikan loop yang dituju.

Sedangkan:

```kotlin
continue@loopI
```

melewati iterasi saat ini dan melanjutkan ke iterasi berikutnya dari loop yang dituju.

Secara sederhana:

```text
break
↓
keluar dari loop

continue
↓
lanjut ke iterasi berikutnya
```

## Cara Kerja `continue@loopI`

Pada contoh:

```kotlin
loopI@ for (i in 1..10) {

    loopJ@ for (j in 1..10) {

        if (j == 5) {
            continue@loopI
        }

        println("$i x $j = ${i * j}")
    }
}
```

Ketika:

```kotlin
j == 5
```

bernilai `true`, program menjalankan:

```kotlin
continue@loopI
```

Artinya program tidak melanjutkan `loopJ` untuk nilai berikutnya.

Program langsung melanjutkan ke iterasi berikutnya pada:

```kotlin
loopI@
```

## Label pada Lambda

Label juga dapat digunakan pada lambda.

Hal ini berguna ketika kita ingin melakukan `return` dari lambda tertentu.

Contoh:

```kotlin
fun test(
    name: String,
    operation: (String) -> Unit
): Unit = operation(name)
```

Function `test()` menerima:

```kotlin
operation: (String) -> Unit
```

Artinya `operation` adalah function yang:

- Menerima satu parameter `String`.
- Tidak mengembalikan nilai sehingga menggunakan `Unit`.

## Return pada Lambda

Contoh:

```kotlin
test("") test@{
    if (it == "") {
        return@test
    } else {
        println("Ucup")
    }
}
```

Pada contoh tersebut terdapat label:

```kotlin
test@
```

Label tersebut diberikan pada lambda.

Kemudian:

```kotlin
return@test
```

digunakan untuk keluar dari lambda tersebut.

## Mengapa Menggunakan `return@test`?

Perhatikan:

```kotlin
test("") test@{
    if (it == "") {
        return@test
    } else {
        println("Ucup")
    }
}
```

Jika:

```kotlin
it == ""
```

bernilai `true`, maka:

```kotlin
return@test
```

akan menghentikan eksekusi lambda.

Kode:

```kotlin
println("Ucup")
```

tidak dijalankan.

## Contoh Return to Label

Function:

```kotlin
fun test(
    name: String,
    operation: (String) -> Unit
): Unit = operation(name)
```

Kemudian dipanggil:

```kotlin
test("") test@{
    if (it == "") {
        return@test
    } else {
        println("Ucup")
    }
}
```

Karena argument yang diberikan adalah:

```kotlin
""
```

maka kondisi:

```kotlin
it == ""
```

bernilai `true`.

Program menjalankan:

```kotlin
return@test
```

Sehingga lambda langsung selesai.

## Return Label dengan Nilai

Label juga dapat digunakan pada lambda yang mengembalikan nilai.

Contoh:

```kotlin
val result = test@{
    return@test "Hello"
}
```

Pada contoh tersebut:

```kotlin
return@test
```

mengembalikan nilai `"Hello"` ke lambda yang memiliki label `test@`.

## Contoh Program Lengkap

Berikut contoh penggunaan label dengan `break`, `continue`, dan `return`.

```kotlin
fun labelBreak() {

    loopI@ for (i in 1..10) {

        loopJ@ for (j in 1..10) {

            if (i > 5) {
                break@loopI
            }

            println("$i x $j = ${i * j}")
        }
    }
}

fun labelContinue() {

    loopI@ for (i in 1..10) {

        loopJ@ for (j in 1..10) {

            if (j == 5) {
                continue@loopI
            }

            println("$i x $j = ${i * j}")
        }
    }
}

fun test(
    name: String,
    operation: (String) -> Unit
): Unit = operation(name)

fun main() {

    labelBreak()

    labelContinue()

    test("") test@{

        if (it == "") {
            return@test
        } else {
            println("Ucup")
        }
    }
}
```

## Jenis Penggunaan Label

Label dapat digunakan untuk beberapa kebutuhan.

### Label dengan `break`

```kotlin
break@loopI
```

Digunakan untuk menghentikan loop yang memiliki label `loopI`.

### Label dengan `continue`

```kotlin
continue@loopI
```

Digunakan untuk melanjutkan ke iterasi berikutnya dari loop `loopI`.

### Label dengan `return`

```kotlin
return@test
```

Digunakan untuk melakukan return dari scope yang memiliki label `test`.

## Kapan Menggunakan Label?

Label paling sering berguna ketika kita bekerja dengan:

- Nested loop.
- `break` pada loop bertingkat.
- `continue` pada loop bertingkat.
- Lambda.
- Higher-Order Function.
- Return dari lambda tertentu.

Contoh yang umum:

```kotlin
outer@ for (i in 1..10) {
    inner@ for (j in 1..10) {

        if (j == 5) {
            break@outer
        }

        println("$i $j")
    }
}
```

## Gunakan Label dengan Bijak

Label memang memberikan kontrol yang lebih fleksibel terhadap alur program, tetapi terlalu banyak menggunakan label dapat membuat kode lebih sulit dibaca.

Contoh:

```kotlin
outer@ for (...) {
    middle@ for (...) {
        inner@ for (...) {
            if (...) {
                break@outer
            }
        }
    }
}
```

Pada nested loop yang sangat kompleks, penggunaan label dapat membuat alur program sulit diikuti.

Karena itu, gunakan label ketika memang membantu membuat kode lebih jelas.

## Kesimpulan

**Label** adalah penanda yang dapat digunakan untuk menentukan target dari `break`, `continue`, atau `return`.

Sintaks dasar label:

```kotlin
namaLabel@
```

Contoh:

```kotlin
loopI@ for (i in 1..10) {
    // ...
}
```

Untuk `break`:

```kotlin
break@loopI
```

Untuk `continue`:

```kotlin
continue@loopI
```

Untuk `return` pada lambda:

```kotlin
test("") test@{
    return@test
}
```

Dengan label, kita dapat menentukan secara spesifik blok kode mana yang ingin dihentikan atau dilanjutkan.

:::tip
**Label memberikan kontrol terhadap alur program, terutama pada nested loop dan lambda. Gunakan label dengan bijak agar kode tetap mudah dibaca dan dipahami.**
:::
