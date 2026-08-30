---
sidebar_position: 13
title: "List Comprehension"
---

**List comprehension** adalah sintaks ringkas dalam Python untuk membuat `list` baru berdasarkan sebuah `iterable`.

Dengan list comprehension, kita dapat melakukan proses iterasi tanpa harus menulis perulangan `for` dan `.append()` secara terpisah.

Contoh menggunakan `for` biasa:

```python
my_list = []

for char in "hello":
    my_list.append(char)

print(my_list)
```

Dengan list comprehension:

```python
my_list = [
    char
    for char in "hello"
]

print(my_list)
```

Output:

```text
["h", "e", "l", "l", "o"]
```

Kedua pendekatan tersebut menghasilkan data yang sama.

---

## Sintaks Dasar List Comprehension

Sintaks dasar:

```python
[expression for item in iterable]
```

Terdapat tiga bagian utama:

```text
expression
    ↓
for item
    ↓
in iterable
```

Contoh:

```python
numbers = [
    number * 2
    for number in numbers
]
```

Pada contoh tersebut:

- `number * 2` adalah expression.
- `number` adalah variabel yang mewakili setiap elemen.
- `numbers` adalah iterable.

---

## Membuat List dari String

String merupakan iterable, sehingga setiap karakter dapat diproses menggunakan list comprehension.

Contoh:

```python
my_list = [
    char
    for char in "hello"
]

print(my_list)
```

Output:

```text
["h", "e", "l", "l", "o"]
```

Prosesnya:

```text
"hello"
   ↓
h → ["h"]
e → ["h", "e"]
l → ["h", "e", "l"]
l → ["h", "e", "l", "l"]
o → ["h", "e", "l", "l", "o"]
```

---

## Membuat List dari `range()`

`range()` juga dapat digunakan sebagai iterable.

Contoh:

```python
numbers = [
    number
    for number in range(10)
]

print(numbers)
```

Output:

```text
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

`range(10)` menghasilkan angka dari `0` sampai `9`.

---

## List Comprehension dengan Operator Aritmatika

Salah satu kelebihan list comprehension adalah kita dapat melakukan operasi terhadap setiap elemen sebelum memasukkannya ke dalam `list`.

Expression dapat menggunakan berbagai **operator aritmatika**.

Operator yang umum digunakan:

| Operator | Nama | Contoh |
|---|---|---|
| `+` | Penjumlahan | `number + 2` |
| `-` | Pengurangan | `number - 2` |
| `*` | Perkalian | `number * 2` |
| `/` | Pembagian | `number / 2` |
| `//` | Floor Division | `number // 2` |
| `%` | Modulo | `number % 2` |
| `**` | Pangkat | `number ** 2` |

---

## Penjumlahan dengan `+`

Kita dapat menambahkan nilai tertentu ke setiap elemen.

```python
numbers = [
    number + 10
    for number in range(5)
]

print(numbers)
```

Output:

```text
[10, 11, 12, 13, 14]
```

Prosesnya:

```text
0 + 10 = 10
1 + 10 = 11
2 + 10 = 12
3 + 10 = 13
4 + 10 = 14
```

---

## Pengurangan dengan `-`

Contoh:

```python
numbers = [
    number - 1
    for number in range(5)
]

print(numbers)
```

Output:

```text
[-1, 0, 1, 2, 3]
```

---

## Perkalian dengan `*`

Contoh:

```python
numbers = [
    number * 2
    for number in range(5)
]

print(numbers)
```

Output:

```text
[0, 2, 4, 6, 8]
```

Prosesnya:

```text
0 × 2 = 0
1 × 2 = 2
2 × 2 = 4
3 × 2 = 6
4 × 2 = 8
```

---

## Pembagian dengan `/`

Operator `/` menghasilkan nilai `float`.

Contoh:

```python
numbers = [
    number / 2
    for number in range(1, 6)
]

print(numbers)
```

Output:

```text
[0.5, 1.0, 1.5, 2.0, 2.5]
```

---

## Floor Division dengan `//`

Operator `//` digunakan untuk melakukan pembagian dengan hasil `floor`.

Contoh:

```python
numbers = [
    number // 2
    for number in range(1, 6)
]

print(numbers)
```

Output:

```text
[0, 1, 1, 2, 2]
```

---

## Modulo dengan `%`

Operator `%` menghasilkan sisa pembagian.

Operator ini sangat sering digunakan bersama list comprehension untuk melakukan filtering.

Contoh:

```python
numbers = [
    number % 2
    for number in range(5)
]

print(numbers)
```

Output:

```text
[0, 1, 0, 1, 0]
```

Nilai `0` menunjukkan angka habis dibagi `2`, sedangkan `1` menunjukkan terdapat sisa.

---

## Pangkat dengan `**`

Operator `**` digunakan untuk perpangkatan.

Contoh:

```python
numbers = [
    number ** 2
    for number in range(5)
]

print(numbers)
```

Output:

```text
[0, 1, 4, 9, 16]
```

Prosesnya:

```text
0² = 0
1² = 1
2² = 4
3² = 9
4² = 16
```

---

## Menggunakan Expression yang Lebih Kompleks

Expression tidak harus hanya menggunakan satu operator.

Contoh:

```python
numbers = [
    number * 2 + 10
    for number in range(5)
]

print(numbers)
```

Output:

```text
[10, 12, 14, 16, 18]
```

Prosesnya:

```text
0 × 2 + 10 = 10
1 × 2 + 10 = 12
2 × 2 + 10 = 14
3 × 2 + 10 = 16
4 × 2 + 10 = 18
```

---

## List Comprehension dengan Kondisi `if`

List comprehension dapat menggunakan `if` untuk melakukan filtering.

Sintaksnya:

```python
[expression for item in iterable if condition]
```

Contoh:

```python
numbers = [
    number
    for number in range(10)
    if number % 2 == 0
]

print(numbers)
```

Output:

```text
[0, 2, 4, 6, 8]
```

Hanya angka yang memenuhi kondisi:

```python
number % 2 == 0
```

yang dimasukkan ke dalam list.

---

## Menggabungkan Operator Aritmatika dan `if`

Kita dapat menggunakan operator aritmatika pada expression sekaligus menggunakan `if` sebagai kondisi.

Contoh:

```python
numbers = [
    number ** 2
    for number in range(10)
    if number % 2 == 0
]

print(numbers)
```

Output:

```text
[0, 4, 16, 36, 64]
```

Prosesnya:

```text
0 → genap → 0² = 0
1 → ganjil → diabaikan
2 → genap → 2² = 4
3 → ganjil → diabaikan
4 → genap → 4² = 16
6 → genap → 6² = 36
8 → genap → 8² = 64
```

---

## List Comprehension vs `map()`

List comprehension dapat digunakan untuk melakukan transformasi data seperti `map()`.

Menggunakan `map()`:

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

Menggunakan `list comprehension`:

```python
numbers = [1, 2, 3]

result = [
    number * 2
    for number in numbers
]

print(result)
```

Output:

```text
[2, 4, 6]
```

Keduanya dapat digunakan untuk melakukan transformasi terhadap setiap elemen.

---

## List Comprehension vs `filter()`

List comprehension juga dapat digunakan untuk melakukan filtering seperti `filter()`.

Menggunakan `filter()`:

```python
numbers = [1, 2, 3, 4, 5]

result = list(
    filter(
        lambda number: number % 2 == 0,
        numbers
    )
)

print(result)
```

Output:

```text
[2, 4]
```

Menggunakan list comprehension:

```python
numbers = [1, 2, 3, 4, 5]

result = [
    number
    for number in numbers
    if number % 2 == 0
]

print(result)
```

Output:

```text
[2, 4]
```

---

## Transformasi dan Filtering Sekaligus

List comprehension dapat melakukan filtering dan transformasi dalam satu expression.

Contoh:

```python
numbers = range(1, 11)

result = [
    number ** 2
    for number in numbers
    if number % 2 == 0
]

print(result)
```

Output:

```text
[4, 16, 36, 64, 100]
```

Pada contoh tersebut terdapat dua proses:

```text
Filtering
    ↓
number % 2 == 0
    ↓
Hanya angka genap
    ↓
Transformasi
    ↓
number ** 2
```

---

## List Comprehension dan Immutability

List comprehension biasanya menghasilkan `list` baru tanpa mengubah data asli.

Contoh:

```python
numbers = [1, 2, 3]

result = [
    number * 2
    for number in numbers
]

print(numbers)
print(result)
```

Output:

```text
[1, 2, 3]
[2, 4, 6]
```

Data asli tetap:

```text
[1, 2, 3]
```

Sedangkan hasil pemrosesan menjadi:

```text
[2, 4, 6]
```

---

## List Comprehension dengan String

Kita juga dapat melakukan transformasi terhadap setiap karakter.

Contoh:

```python
word = "python"

result = [
    char.upper()
    for char in word
]

print(result)
```

Output:

```text
["P", "Y", "T", "H", "O", "N"]
```

---

## List Comprehension dengan `len()`

Expression juga dapat menggunakan function.

Contoh:

```python
names = [
    "Budi",
    "Andi",
    "Citra"
]

result = [
    len(name)
    for name in names
]

print(result)
```

Output:

```text
[4, 4, 5]
```

---

## Kelebihan List Comprehension

List comprehension memiliki beberapa keuntungan:

- Sintaks lebih ringkas.
- Mengurangi kode boilerplate.
- Cocok untuk transformasi data sederhana.
- Cocok untuk filtering sederhana.
- Mudah digunakan bersama iterable.
- Sering digunakan dalam pemrosesan data Python.

Contoh:

```python
numbers = [
    number * 2
    for number in range(10)
]
```

Lebih ringkas dibandingkan:

```python
numbers = []

for number in range(10):
    numbers.append(number * 2)
```

---

## Readability

Walaupun list comprehension dapat membuat kode lebih singkat, jangan memaksakan semua perulangan menjadi comprehension.

Contoh sederhana:

```python
result = [
    number * 2
    for number in numbers
]
```

Mudah dibaca.

Namun jika expression dan kondisi menjadi terlalu kompleks, `for` biasa terkadang lebih jelas.

Contoh:

```python
result = []

for number in numbers:
    if number > 10:
        result.append(
            complicated_calculation(number)
        )
```

Kode seperti ini bisa lebih mudah dipahami daripada comprehension yang terlalu panjang.

Tujuan utama list comprehension adalah membuat kode **lebih ekspresif dan mudah dibaca**, bukan sekadar membuatnya menjadi satu baris.

---

## Pola Dasar List Comprehension

### Membuat List

```python
[
    item
    for item in iterable
]
```

### Transformasi

```python
[
    expression
    for item in iterable
]
```

### Filtering

```python
[
    item
    for item in iterable
    if condition
]
```

### Transformasi dan Filtering

```python
[
    expression
    for item in iterable
    if condition
]
```

---

## Contoh Lengkap

Misalnya kita memiliki angka:

```python
numbers = [
    1, 2, 3, 4, 5,
    6, 7, 8, 9, 10
]
```

Kita ingin:

1. Mengambil angka genap.
2. Mengkuadratkan angka tersebut.

Gunakan:

```python
result = [
    number ** 2
    for number in numbers
    if number % 2 == 0
]

print(result)
```

Output:

```text
[4, 16, 36, 64, 100]
```

---

## Kesimpulan

List comprehension adalah sintaks Python yang digunakan untuk membuat `list` baru secara ringkas berdasarkan sebuah iterable.

Sintaks dasarnya:

```python
[expression for item in iterable]
```

Dengan kondisi:

```python
[expression for item in iterable if condition]
```

`expression` dapat menggunakan berbagai operasi, termasuk **operator aritmatika**:

```text
+   Penjumlahan
-   Pengurangan
*   Perkalian
/   Pembagian
//  Floor Division
%   Modulo
**  Perpangkatan
```

Contoh:

```python
numbers = [
    number ** 2
    for number in range(10)
    if number % 2 == 0
]

print(numbers)
```

Output:

```text
[0, 4, 16, 36, 64]
```

Pola yang perlu diingat:

```text
Iterable
   ↓
  for
   ↓
Expression
   ↓
if condition (opsional)
   ↓
List baru
```

Gunakan list comprehension ketika prosesnya sederhana dan hasilnya tetap mudah dibaca. Jika logikanya terlalu kompleks, gunakan `for` biasa agar kode tetap maintainable.