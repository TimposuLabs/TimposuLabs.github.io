---
sidebar_position: 6
title: 'Type Data String'
---

Tipe data string adalah tipe data yang berisikan data kumpulan karakter atau sederhananya adalah teks. Di kotlin, tipe data string direpresentasikan dengan kata kunci `String`. Untuk membuat string di kotlin, kita bisa menggunakan `"` (tanda petik 2) untuk teks satu baris, `"""` (tanda petik 2 sebanyak 3 kali) untuk teks lebih dari satu baris.

```kotlin
fun main() {

    var firstName: String = "Ucup"
    var lastName: String = "Topekox"
    var address: String = """
       Jl. Bangau No. 19
       Kelurahan Cocor Bebek,
       Kecamatan Rawa Bebek,
       Bekasi, Jawa Barat, Indonesia.
    """

    println(firstName)
    println(lastName)
    println(address)
}
```

Output:

```
Ucup
Topekox

       Jl. Bangau No. 19
       Kelurahan Cocor Bebek,
       Kecamatan Rawa Bebek,
       Bekasi, Jawa Barat, Indonesia.
```

### `trimMargin()`

Untuk menghapus karakter kosong dalam String multiline dapat menggunakan `trimMargin()` yang secara otomatis akan menghapus karakter kosong sebelum tanda `|`:

```kotlin
var addressTrim: String = """
       |Jl. Bangau No. 19
       |Kelurahan Cocor Bebek,
       |Kecamatan Rawa Bebek,
       |Bekasi, Jawa Barat, Indonesia.
    """.trimMargin()

println(addressTrim)
```

Output:

```
Jl. Bangau No. 19
Kelurahan Cocor Bebek,
Kecamatan Rawa Bebek,
Bekasi, Jawa Barat, Indonesia.
```

Untuk melakukan custom terhadap karakter `trimMargin()` dapat memasukan karakter ke dalam parameter `trimMargin()`, contoh:

```kotlin
var addressTrimCustom: String = """
       >Jl. Bangau No. 19
       >Kelurahan Cocor Bebek,
       >Kecamatan Rawa Bebek,
       >Bekasi, Jawa Barat, Indonesia.
    """.trimMargin(">")

println(addressTrimCustom)
```

Output:

```
Jl. Bangau No. 19
Kelurahan Cocor Bebek,
Kecamatan Rawa Bebek,
Bekasi, Jawa Barat, Indonesia.
```

## Menggabungkan String

Untuk melakukan penggabungan data String, kita bisa menggunakan operator `+`

```kotlin
var fullName: String = firstName + " " + lastName

println(fullName)
```

### String Template

String template adalah kemampuan String di kotlin yang mendukung ekspresi template. Dengan string template, secara otomatis kita bisa mengakses data dari luar teks string. `$` adalah tanda yang digunakan untuk template ekspresi sederhana, seperti mengakses variable lain. `${ isi ekspresi }` adalah tanda yang digunakan untuk template ekspresi yang kompleks.

```kotlin
var fullNameTemplate: String = "$firstName $lastName"
var description: String = "$fullNameTemplate length is ${fullNameTemplate.length} character"
```
