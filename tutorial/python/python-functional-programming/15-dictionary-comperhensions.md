---
sidebar_position: 15
title: "Dictionary Comprehensions"
---

**Dictionary comprehension** adalah sintaks ringkas dalam Python yang digunakan untuk membuat `dictionary` baru berdasarkan sebuah `iterable`.

Konsepnya mirip dengan **list comprehension** dan **set comprehension**, tetapi hasil akhirnya berupa `dictionary` yang terdiri dari pasangan `key: value`.

Karakteristik utama dictionary comprehension:

- Menghasilkan data bertipe `dict`.
- Menggunakan tanda kurung kurawal `{}`.
- Menghasilkan pasangan `key: value`.
- Dapat melakukan transformasi data.
- Dapat melakukan filtering menggunakan kondisi `if`.
- Dapat menggunakan operasi aritmatika.
- Dapat digunakan untuk membuat dictionary baru dari dictionary atau iterable lainnya.

---

## Sintaks Dasar Dictionary Comprehension

Sintaks dasar:

```python
{key_expression: value_expression for item in iterable}
```

Contoh sederhana:

```python
numbers = [1, 2, 3, 4]

result = {
    number: number * 2
    for number in numbers
}

print(result)
```

Output:

```text
{1: 2, 2: 4, 3: 6, 4: 8}
```

Pada contoh tersebut:

- `number` menjadi `key`.
- `number * 2` menjadi `value`.
- `for number in numbers` melakukan iterasi terhadap data.

---

## Membuat Dictionary dari List

Dictionary comprehension dapat digunakan untuk mengubah sebuah `list` menjadi `dictionary`.

Contoh:

```python
numbers = [1, 2, 3, 4, 5]

result = {
    number: number * 2
    for number in numbers
}

print(result)
```

Output:

```text
{1: 2, 2: 4, 3: 6, 4: 8, 5: 10}
```

Strukturnya dapat dipahami sebagai:

```text
number → key
number * 2 → value
```

---

## Membuat Dictionary dari String

String merupakan `iterable`, sehingga setiap karakter dapat digunakan untuk membuat dictionary.

Contoh:

```python
word = "hello"

result = {
    char: char.upper()
    for char in word
}

print(result)
```

Hasilnya berisi setiap karakter sebagai `key` dan huruf kapital sebagai `value`.

Karena `dictionary` tidak dapat memiliki `key` yang sama, karakter yang muncul lebih dari satu kali hanya akan menjadi satu `key`.

---

## Mengolah Dictionary yang Sudah Ada

Dictionary comprehension sering digunakan untuk membuat dictionary baru berdasarkan dictionary yang sudah ada.

Contoh:

```python
simple_dict = {
    "a": 1,
    "b": 2,
    "c": 3
}

result = {
    key: value * 2
    for key, value in simple_dict.items()
}

print(result)
```

Output:

```text
{'a': 2, 'b': 4, 'c': 6}
```

Method `.items()` digunakan untuk mendapatkan `key` dan `value` sekaligus.

---

## Menggunakan `.items()`

Saat melakukan iterasi terhadap dictionary, `.items()` memungkinkan kita mendapatkan pasangan `key` dan `value`.

Contoh:

```python
simple_dict = {
    "a": 1,
    "b": 2,
    "c": 3
}

for key, value in simple_dict.items():
    print(key, value)
```

Output:

```text
a 1
b 2
c 3
```

Dengan dictionary comprehension:

```python
result = {
    key: value * 2
    for key, value in simple_dict.items()
}
```

---

## Transformasi `value`

Salah satu penggunaan umum dictionary comprehension adalah melakukan transformasi terhadap `value`.

Contoh:

```python
prices = {
    "apple": 10000,
    "banana": 8000,
    "orange": 12000
}

new_prices = {
    fruit: price * 2
    for fruit, price in prices.items()
}

print(new_prices)
```

Output:

```text
{'apple': 20000, 'banana': 16000, 'orange': 24000}
```

`key` tetap sama, sedangkan `value` mengalami perubahan.

---

## Transformasi `key`

Dictionary comprehension juga dapat digunakan untuk mengubah `key`.

Contoh:

```python
numbers = {
    1: "one",
    2: "two",
    3: "three"
}

result = {
    key * 10: value
    for key, value in numbers.items()
}

print(result)
```

Output:

```text
{10: 'one', 20: 'two', 30: 'three'}
```

Pada contoh tersebut, `key` diproses menggunakan operasi:

```python
key * 10
```

---

## Operasi Aritmatika pada Dictionary Comprehension

Dictionary comprehension dapat menggunakan operator aritmatika pada `key`, `value`, atau keduanya.

Operator yang umum digunakan:

| Operator | Operasi | Contoh |
|---|---|---|
| `+` | Penjumlahan | `value + 10` |
| `-` | Pengurangan | `value - 2` |
| `*` | Perkalian | `value * 2` |
| `/` | Pembagian | `value / 2` |
| `//` | Floor Division | `value // 2` |
| `%` | Modulo | `value % 2` |
| `**` | Perpangkatan | `value ** 2` |

---

## Penjumlahan dengan `+`

```python
numbers = [1, 2, 3]

result = {
    number: number + 10
    for number in numbers
}

print(result)
```

Output:

```text
{1: 11, 2: 12, 3: 13}
```

---

## Pengurangan dengan `-`

```python
numbers = [10, 20, 30]

result = {
    number: number - 5
    for number in numbers
}

print(result)
```

Output:

```text
{10: 5, 20: 15, 30: 25}
```

---

## Perkalian dengan `*`

```python
numbers = [1, 2, 3, 4]

result = {
    number: number * 2
    for number in numbers
}

print(result)
```

Output:

```text
{1: 2, 2: 4, 3: 6, 4: 8}
```

---

## Pembagian dengan `/`

Operator `/` menghasilkan nilai bertipe `float`.

```python
numbers = [2, 4, 6, 8]

result = {
    number: number / 2
    for number in numbers
}

print(result)
```

Output:

```text
{2: 1.0, 4: 2.0, 6: 3.0, 8: 4.0}
```

---

## Floor Division dengan `//`

Operator `//` digunakan untuk melakukan floor division.

```python
numbers = [1, 2, 3, 4, 5]

result = {
    number: number // 2
    for number in numbers
}

print(result)
```

Output:

```text
{1: 0, 2: 1, 3: 1, 4: 2, 5: 2}
```

---

## Modulo dengan `%`

Operator `%` digunakan untuk mendapatkan sisa hasil pembagian.

```python
numbers = [1, 2, 3, 4, 5]

result = {
    number: number % 2
    for number in numbers
}

print(result)
```

Output:

```text
{1: 1, 2: 0, 3: 1, 4: 0, 5: 1}
```

---

## Perpangkatan dengan `**`

Operator `**` digunakan untuk melakukan perpangkatan.

```python
numbers = [1, 2, 3, 4]

result = {
    number: number ** 2
    for number in numbers
}

print(result)
```

Output:

```text
{1: 1, 2: 4, 3: 9, 4: 16}
```

---

## Filtering dengan Kondisi `if`

Dictionary comprehension dapat menggunakan kondisi `if` untuk memilih data tertentu.

Sintaksnya:

```python
{key: value for item in iterable if condition}
```

Contoh:

```python
numbers = range(1, 11)

even_numbers = {
    number: number * 2
    for number in numbers
    if number % 2 == 0
}

print(even_numbers)
```

Output:

```text
{2: 4, 4: 8, 6: 12, 8: 16, 10: 20}
```

Hanya angka yang memenuhi kondisi berikut yang dimasukkan:

```python
number % 2 == 0
```

---

## Filtering Dictionary yang Sudah Ada

Contoh:

```python
simple_dict = {
    "a": 1,
    "b": 2,
    "c": 3,
    "d": 4
}

result = {
    key: value
    for key, value in simple_dict.items()
    if value % 2 == 0
}

print(result)
```

Output:

```text
{'b': 2, 'd': 4}
```

Dictionary baru hanya berisi data dengan `value` genap.

---

## Transformasi dan Filtering

Dictionary comprehension dapat melakukan transformasi sekaligus filtering.

Contoh:

```python
numbers = range(1, 11)

result = {
    number: number ** 2
    for number in numbers
    if number % 2 == 0
}

print(result)
```

Output:

```text
{2: 4, 4: 16, 6: 36, 8: 64, 10: 100}
```

Prosesnya:

```text
angka
  ↓
filter angka genap
  ↓
number % 2 == 0
  ↓
hitung kuadrat
  ↓
number ** 2
  ↓
key: value
```

---

## Mengubah `key` dan `value` Sekaligus

Kita dapat mengubah `key` dan `value` dalam satu comprehension.

Contoh:

```python
numbers = [1, 2, 3, 4]

result = {
    number * 10: number ** 2
    for number in numbers
}

print(result)
```

Output:

```text
{10: 1, 20: 4, 30: 9, 40: 16}
```

Pada contoh tersebut:

```text
key   = number * 10
value = number ** 2
```

---

## Dictionary Comprehension dengan Kondisi yang Lebih Spesifik

Contoh:

```python
students = {
    "Andi": 80,
    "Budi": 65,
    "Citra": 90,
    "Doni": 70
}

passed_students = {
    name: score
    for name, score in students.items()
    if score >= 70
}

print(passed_students)
```

Output:

```text
{'Andi': 80, 'Citra': 90, 'Doni': 70}
```

Hanya siswa dengan nilai minimal `70` yang dimasukkan ke dictionary baru.

---

## Dictionary Comprehension vs Set Comprehension

Keduanya menggunakan `{}`, tetapi struktur hasilnya berbeda.

Set comprehension:

```python
result = {
    number * 2
    for number in [1, 2, 3]
}

print(result)
```

Hasil:

```text
{2, 4, 6}
```

Dictionary comprehension:

```python
result = {
    number: number * 2
    for number in [1, 2, 3]
}

print(result)
```

Hasil:

```text
{1: 2, 2: 4, 3: 6}
```

Perbedaannya:

| Fitur | Set Comprehension | Dictionary Comprehension |
|---|---|---|
| Hasil | `set` | `dict` |
| Sintaks | `{expression for item in iterable}` | `{key: value for item in iterable}` |
| Struktur data | Nilai | `key: value` |
| Duplikasi | Dihilangkan | `key` harus unik |

---

## Kapan Menggunakan Dictionary Comprehension?

Gunakan dictionary comprehension ketika:

- Membutuhkan dictionary yang dibuat secara dinamis.
- Ingin melakukan transformasi terhadap data.
- Ingin membuat pasangan `key: value` dari iterable.
- Ingin memproses dictionary yang sudah ada.
- Ingin melakukan filtering terhadap dictionary.
- Ingin menggunakan operasi aritmatika pada `key` atau `value`.

---

## Readability

Dictionary comprehension sangat berguna ketika logikanya sederhana dan mudah dipahami.

Contoh:

```python
numbers = [1, 2, 3, 4]

result = {
    number: number ** 2
    for number in numbers
}
```

Namun, jika kondisi atau expression terlalu kompleks, gunakan `for` loop biasa agar kode lebih mudah dibaca.

Contoh:

```python
result = {}

for number in numbers:
    if number % 2 == 0:
        result[number] = number ** 2
```

Tujuan comprehension bukan sekadar membuat kode menjadi satu baris, tetapi membuat operasi yang sederhana menjadi lebih ringkas dan ekspresif.

---

## Kesimpulan

Dictionary comprehension digunakan untuk membuat dictionary baru secara ringkas berdasarkan sebuah `iterable`.

Sintaks dasar:

```python
{key_expression: value_expression for item in iterable}
```

Dengan filtering:

```python
{key_expression: value_expression for item in iterable if condition}
```

Karakteristik utama:

- Menghasilkan `dictionary`.
- Menggunakan struktur `key: value`.
- Dapat melakukan transformasi.
- Dapat melakukan filtering.
- Dapat menggunakan operasi aritmatika.
- Dapat memproses dictionary yang sudah ada menggunakan `.items()`.
- Cocok digunakan untuk membuat atau mentransformasi dictionary secara ringkas.
