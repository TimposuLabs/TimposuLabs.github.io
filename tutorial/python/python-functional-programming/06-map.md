---
sidebar_position: 6
title: "Fungsi map()"
---

`map()` adalah **built-in function** Python yang digunakan untuk menerapkan sebuah function kepada setiap elemen dalam sebuah **iterable**.

Iterable yang dapat digunakan antara lain:

- `list`
- `tuple`
- `set`
- dan struktur data lain yang dapat diiterasi

Konsep `map()` sangat berkaitan dengan **Functional Programming** karena kita dapat memisahkan:

```text
Data
  ↓
Function
  ↓
Data hasil transformasi
```

Misalnya kita memiliki data:

```text
[1, 2, 3]
```

dan ingin mengalikan setiap angka dengan `2`.

Dengan `map()`, kita dapat menentukan function yang bertugas melakukan perkalian dan menyerahkannya kepada `map()`.

---

## Sintaks Dasar

Sintaks dasar `map()` adalah:

```python
map(function, iterable)
```

Terdapat dua bagian utama:

### Function

Function yang akan dijalankan terhadap setiap elemen.

Contohnya:

```python
def multiply_by_two(number):
    return number * 2
```

### Iterable

Data yang setiap elemennya akan diproses.

Contohnya:

```python
numbers = [1, 2, 3]
```

Sehingga:

```python
map(multiply_by_two, numbers)
```

dapat dibaca:

> Jalankan `multiply_by_two` terhadap setiap elemen di `numbers`.

---

## Menggunakan `map()` Tanpa `map()`

Sebelum memahami `map()`, kita dapat melihat pendekatan menggunakan `for` biasa.

Misalnya kita ingin mengalikan setiap angka dengan `2`:

```python
def multiply_by_two(numbers):
    new_numbers = []

    for number in numbers:
        new_numbers.append(number * 2)

    return new_numbers


numbers = [1, 2, 3]

result = multiply_by_two(numbers)

print(result)
```

Output:

```text
[2, 4, 6]
```

Pada kode tersebut, kita melakukan beberapa langkah:

```text
1. Membuat list baru
2. Melakukan looping
3. Mengambil setiap elemen
4. Mengalikan elemen dengan 2
5. Memasukkan hasil ke list baru
```

---

## Menggunakan `map()`

Dengan `map()`, proses tersebut dapat ditulis lebih ringkas.

Pertama, kita membuat function:

```python
def multiply_by_two(number):
    return number * 2
```

Kemudian:

```python
numbers = [1, 2, 3]

result = map(
    multiply_by_two,
    numbers
)

print(list(result))
```

Output:

```text
[2, 4, 6]
```

`map()` akan menjalankan:

```python
multiply_by_two(number)
```

untuk setiap elemen dalam `numbers`.

---

## Bagaimana `map()` Bekerja?

Misalnya:

```python
numbers = [1, 2, 3]
```

dan function:

```python
def multiply_by_two(number):
    return number * 2
```

Ketika kita menjalankan:

```python
map(multiply_by_two, numbers)
```

secara konsep prosesnya adalah:

```text
number = 1
    ↓
1 * 2
    ↓
2

number = 2
    ↓
2 * 2
    ↓
4

number = 3
    ↓
3 * 2
    ↓
6
```

Hasilnya:

```text
[2, 4, 6]
```

---

## Mengapa Tidak Menggunakan `()`?

Perhatikan kode berikut:

```python
map(multiply_by_two, numbers)
```

Kita menuliskan:

```python
multiply_by_two
```

bukan:

```python
multiply_by_two()
```

Mengapa?

Karena kita ingin **memberikan function kepada `map()`**, bukan menjalankan function tersebut terlebih dahulu.

Dengan:

```python
map(multiply_by_two, numbers)
```

kita mengatakan:

> Gunakan function `multiply_by_two` untuk memproses setiap elemen.

Sedangkan:

```python
multiply_by_two()
```

berarti:

> Jalankan function sekarang.

Ini merupakan penerapan konsep **First-Class Function** dan **Higher-Order Function**.

---

## `map()` adalah Higher-Order Function

`map()` merupakan contoh Higher-Order Function karena menerima sebuah function sebagai argument.

Contohnya:

```python
def multiply_by_two(number):
    return number * 2


numbers = [1, 2, 3]

result = map(
    multiply_by_two,
    numbers
)
```

Pada kode tersebut:

```text
multiply_by_two
       ↓
   function
       ↓
     map()
       ↓
  numbers
```

Function `multiply_by_two` diberikan kepada `map()`.

---

## `map()` Menghasilkan Map Object

Hal penting yang perlu dipahami adalah `map()` **tidak langsung menghasilkan list**.

Contoh:

```python
numbers = [1, 2, 3]


def multiply_by_two(number):
    return number * 2


result = map(
    multiply_by_two,
    numbers
)

print(result)
```

Hasilnya bukan:

```text
[2, 4, 6]
```

Melainkan sebuah **map object**.

Untuk mendapatkan hasil dalam bentuk list, kita dapat menggunakan:

```python
print(list(result))
```

Output:

```text
[2, 4, 6]
```

---

## Mengapa Harus Menggunakan `list()`?

`map()` menghasilkan object yang bersifat **iterator**.

Iterator memungkinkan Python menghasilkan data secara bertahap ketika data tersebut dibutuhkan.

Karena itu:

```python
result = map(
    multiply_by_two,
    numbers
)
```

belum menghasilkan list baru yang dapat langsung ditampilkan seperti:

```text
[2, 4, 6]
```

Kita dapat mengubah hasilnya menjadi list:

```python
result = list(
    map(
        multiply_by_two,
        numbers
    )
)
```

Sekarang `result` berisi:

```text
[2, 4, 6]
```

---

## `map()` Tidak Mengubah Data Asli

Salah satu karakteristik penting `map()` adalah function yang digunakan dapat menghasilkan hasil baru tanpa harus memodifikasi iterable asli.

Contoh:

```python
numbers = [1, 2, 3]


def multiply_by_two(number):
    return number * 2


result = list(
    map(
        multiply_by_two,
        numbers
    )
)

print(numbers)
print(result)
```

Output:

```text
[1, 2, 3]
[2, 4, 6]
```

Data asli:

```text
[1, 2, 3]
```

tetap sama.

Sedangkan hasil transformasinya:

```text
[2, 4, 6]
```

disimpan sebagai hasil baru.

---

## `map()` dan Pure Function

`map()` dapat digunakan bersama **pure function**.

Contoh:

```python
def multiply_by_two(number):
    return number * 2
```

Function tersebut:

- Menggunakan input yang diberikan.
- Menghasilkan output berdasarkan input.
- Tidak mengubah data di luar function.

Kemudian:

```python
numbers = [1, 2, 3]

result = list(
    map(
        multiply_by_two,
        numbers
    )
)
```

Data asli tetap:

```text
[1, 2, 3]
```

dan hasil transformasi menjadi:

```text
[2, 4, 6]
```

Pendekatan seperti ini sesuai dengan prinsip Functional Programming.

---

## `map()` dengan Lambda

Karena function dapat diberikan sebagai argument, kita juga dapat menggunakan **lambda expression**.

Contoh:

```python
numbers = [1, 2, 3]

result = list(
    map(
        lambda number: number * 2,
        numbers
    )
)

print(result)
```

Output:

```text
[2, 4, 6]
```

Pada contoh tersebut:

```python
lambda number: number * 2
```

berfungsi sebagai function yang diberikan kepada `map()`.

---

## Membandingkan Function Biasa dan Lambda

Menggunakan function biasa:

```python
def multiply_by_two(number):
    return number * 2


numbers = [1, 2, 3]

result = list(
    map(
        multiply_by_two,
        numbers
    )
)
```

Menggunakan lambda:

```python
numbers = [1, 2, 3]

result = list(
    map(
        lambda number: number * 2,
        numbers
    )
)
```

Keduanya menghasilkan:

```text
[2, 4, 6]
```

Function biasa biasanya lebih mudah dibaca ketika logikanya cukup kompleks atau digunakan kembali di beberapa tempat.

Lambda cocok untuk operasi sederhana yang hanya digunakan pada satu tempat.

---

## `map()` dengan String

`map()` tidak hanya dapat digunakan untuk angka.

Contohnya kita ingin mengubah setiap nama menjadi huruf kapital:

```python
names = [
    "budi",
    "andi",
    "citra"
]


def to_upper(name):
    return name.upper()


result = list(
    map(
        to_upper,
        names
    )
)

print(result)
```

Output:

```text
["BUDI", "ANDI", "CITRA"]
```

Prosesnya:

```text
"budi"
   ↓
upper()
   ↓
"BUDI"

"andi"
   ↓
upper()
   ↓
"ANDI"

"citra"
   ↓
upper()
   ↓
"CITRA"
```

---

## `map()` dengan Beberapa Iterable

`map()` juga dapat menerima lebih dari satu iterable.

Contohnya kita ingin menjumlahkan dua list:

```python
numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]


def add(a, b):
    return a + b


result = list(
    map(
        add,
        numbers1,
        numbers2
    )
)

print(result)
```

Output:

```text
[11, 22, 33]
```

Secara konsep:

```text
1  +  10  →  11
2  +  20  →  22
3  +  30  →  33
```

Function:

```python
add(a, b)
```

menerima elemen dari masing-masing iterable.

---

## `map()` dengan Tuple

`map()` juga dapat bekerja dengan tuple.

Contoh:

```python
numbers = (1, 2, 3, 4)


def square(number):
    return number ** 2


result = list(
    map(
        square,
        numbers
    )
)

print(result)
```

Output:

```text
[1, 4, 9, 16]
```

`map()` tidak terbatas pada `list`.

Yang penting data tersebut merupakan iterable.

---

## `map()` dan List Comprehension

Operasi yang sama dapat dilakukan menggunakan list comprehension.

Dengan `map()`:

```python
numbers = [1, 2, 3]

result = list(
    map(
        lambda number: number * 2,
        numbers
    )
)
```

Dengan list comprehension:

```python
numbers = [1, 2, 3]

result = [
    number * 2
    for number in numbers
]
```

Keduanya menghasilkan:

```text
[2, 4, 6]
```

Dalam Python, list comprehension sering dianggap lebih mudah dibaca untuk transformasi list yang sederhana.

Namun, `map()` tetap penting untuk dipahami karena merupakan konsep fundamental dalam Functional Programming.

---

## Kapan Menggunakan `map()`?

`map()` cocok digunakan ketika kita ingin melakukan **transformasi yang sama terhadap setiap elemen**.

Contohnya:

```text
Angka → dikali 2
Angka → dikuadratkan
Nama → huruf kapital
Harga → dikonversi
Data → ditransformasikan
```

Pola sederhananya:

```text
Input
  ↓
Function yang sama
  ↓
Setiap elemen
  ↓
Hasil transformasi
```

---

## Hal yang Perlu Diperhatikan

### Jangan Menggunakan `()` Saat Memberikan Function

Gunakan:

```python
map(
    multiply_by_two,
    numbers
)
```

bukan:

```python
map(
    multiply_by_two(),
    numbers
)
```

Karena `map()` membutuhkan function object.

---

### `map()` Menghasilkan Iterator

Perhatikan:

```python
result = map(
    multiply_by_two,
    numbers
)
```

Jika ingin mendapatkan list:

```python
result = list(
    map(
        multiply_by_two,
        numbers
    )
)
```

---

### Data Asli Tidak Otomatis Diubah

Contoh:

```python
numbers = [1, 2, 3]

result = list(
    map(
        lambda number: number * 2,
        numbers
    )
)
```

`numbers` tetap:

```text
[1, 2, 3]
```

sedangkan `result`:

```text
[2, 4, 6]
```

---

## Ringkasan

`map()` adalah built-in function Python yang digunakan untuk menerapkan sebuah function kepada setiap elemen dalam iterable.

Sintaks dasarnya:

```python
map(function, iterable)
```

Contoh:

```python
def multiply_by_two(number):
    return number * 2


numbers = [1, 2, 3]

result = list(
    map(
        multiply_by_two,
        numbers
    )
)

print(result)
```

Output:

```text
[2, 4, 6]
```

Hal penting yang perlu diingat:

- `map()` menerima function dan iterable.
- Function diberikan tanpa tanda `()`.
- Function dijalankan untuk setiap elemen.
- `map()` menghasilkan iterator.
- Hasil dapat dikonversi menjadi `list` menggunakan `list()`.
- `map()` dapat digunakan dengan function biasa maupun lambda.
- `map()` dapat menerima lebih dari satu iterable.
- `map()` sangat berkaitan dengan konsep **First-Class Function** dan **Higher-Order Function**.
- `map()` cocok digunakan untuk melakukan transformasi terhadap setiap elemen data.

Secara sederhana, pola `map()` dapat diingat sebagai:

```text
Data
  ↓
Function
  ↓
Transform setiap elemen
  ↓
Iterator hasil
  ↓
list()
  ↓
List baru
```