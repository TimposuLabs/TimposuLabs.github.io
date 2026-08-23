---
sidebar_position: 14
title: "Set Comprehensions"
---

**Set Comprehension** adalah sintaks ringkas dalam Python yang digunakan untuk membuat `set` baru berdasarkan sebuah `iterable`.

Konsepnya mirip dengan **list comprehension**, tetapi hasil akhirnya berupa `set`.

Karakteristik utama set comprehension:

- Menghasilkan data bertipe `set`.
- Menggunakan tanda kurung kurawal `{}`.
- Dapat melakukan transformasi data.
- Dapat melakukan filtering menggunakan kondisi `if`.
- Dapat menggunakan operasi aritmatika.
- Secara otomatis menghilangkan nilai duplikat.

Contoh sederhana:

```python
numbers = [1, 2, 2, 3, 3, 4]

result = {
    number
    for number in numbers
}

print(result)
```

Output:

```text
{1, 2, 3, 4}
```

Nilai `2` dan `3` yang muncul lebih dari satu kali hanya disimpan satu kali karena `set` hanya menyimpan elemen yang unik.

---

## Sintaks Dasar Set Comprehension

Sintaks dasar:

```python
{expression for item in iterable}
```

Contoh:

```python
numbers = {
    number
    for number in range(5)
}

print(numbers)
```

Output:

```text
{0, 1, 2, 3, 4}
```

---

## Membuat Set dari String

String merupakan `iterable`, sehingga setiap karakter dapat diproses menggunakan set comprehension.

Contoh:

```python
characters = {
    char
    for char in "hello"
}

print(characters)
```

Output dapat berupa:

```text
{'h', 'e', 'l', 'o'}
```

Huruf `l` hanya muncul satu kali karena `set` tidak menyimpan elemen duplikat.

Perlu diperhatikan bahwa `set` tidak menjamin urutan elemen seperti pada `list`.

---

## Menghilangkan Duplikasi

Salah satu kegunaan set comprehension adalah menghasilkan data unik.

Contoh:

```python
numbers = [1, 1, 2, 2, 3, 3, 4, 4]

unique_numbers = {
    number
    for number in numbers
}

print(unique_numbers)
```

Output:

```text
{1, 2, 3, 4}
```

---

## Transformasi Data

Expression pada set comprehension dapat digunakan untuk mengubah setiap elemen sebelum dimasukkan ke dalam `set`.

Contoh:

```python
numbers = [1, 2, 3, 4, 5]

result = {
    number * 2
    for number in numbers
}

print(result)
```

Output:

```text
{2, 4, 6, 8, 10}
```

---

## Operasi Aritmatika pada Set Comprehension

Set comprehension dapat menggunakan berbagai operator aritmatika.

| Operator | Operasi | Contoh |
|---|---|---|
| `+` | Penjumlahan | `number + 10` |
| `-` | Pengurangan | `number - 2` |
| `*` | Perkalian | `number * 2` |
| `/` | Pembagian | `number / 2` |
| `//` | Floor Division | `number // 2` |
| `%` | Modulo | `number % 2` |
| `**` | Perpangkatan | `number ** 2` |

---

## Penjumlahan dengan `+`

```python
numbers = [1, 2, 3, 4]

result = {
    number + 10
    for number in numbers
}

print(result)
```

Output:

```text
{11, 12, 13, 14}
```

---

## Pengurangan dengan `-`

```python
numbers = [10, 20, 30]

result = {
    number - 5
    for number in numbers
}

print(result)
```

Output:

```text
{5, 15, 25}
```

---

## Perkalian dengan `*`

```python
numbers = [1, 2, 3, 4]

result = {
    number * 2
    for number in numbers
}

print(result)
```

Output:

```text
{2, 4, 6, 8}
```

---

## Pembagian dengan `/`

Operator `/` menghasilkan nilai bertipe `float`.

```python
numbers = [2, 4, 6, 8]

result = {
    number / 2
    for number in numbers
}

print(result)
```

Output:

```text
{1.0, 2.0, 3.0, 4.0}
```

---

## Floor Division dengan `//`

Operator `//` digunakan untuk melakukan floor division.

```python
numbers = [1, 2, 3, 4, 5]

result = {
    number // 2
    for number in numbers
}

print(result)
```

Output:

```text
{0, 1, 2}
```

---

## Modulo dengan `%`

Operator `%` digunakan untuk mendapatkan sisa hasil pembagian.

```python
numbers = range(10)

result = {
    number % 2
    for number in numbers
}

print(result)
```

Output:

```text
{0, 1}
```

---

## Perpangkatan dengan `**`

Operator `**` digunakan untuk melakukan perpangkatan.

```python
numbers = [1, 2, 3, 4]

result = {
    number ** 2
    for number in numbers
}

print(result)
```

Output:

```text
{1, 4, 9, 16}
```

---

## Filtering dengan Kondisi `if`

Set comprehension dapat menggunakan kondisi `if` untuk memilih elemen tertentu.

Sintaksnya:

```python
{expression for item in iterable if condition}
```

Contoh:

```python
numbers = range(10)

even_numbers = {
    number
    for number in numbers
    if number % 2 == 0
}

print(even_numbers)
```

Output:

```text
{0, 2, 4, 6, 8}
```

---

## Transformasi dan Filtering

Set comprehension dapat melakukan filtering sekaligus transformasi.

Contoh:

```python
numbers = range(10)

result = {
    number ** 2
    for number in numbers
    if number % 2 == 0
}

print(result)
```

Output:

```text
{0, 4, 16, 36, 64}
```

---

## Operasi Aritmatika dan Filtering

Contoh:

```python
numbers = range(1, 11)

result = {
    number * 3
    for number in numbers
    if number > 5
}

print(result)
```

Output:

```text
{18, 21, 24, 27, 30}
```

---

## Efek Duplikasi Setelah Transformasi

Karena hasil akhirnya adalah `set`, transformasi yang menghasilkan nilai sama akan tetap disimpan satu kali.

Contoh:

```python
numbers = [1, 2, 3, 4]

result = {
    number % 2
    for number in numbers
}

print(result)
```

Output:

```text
{0, 1}
```

Perhitungan:

```text
1 % 2 = 1
2 % 2 = 0
3 % 2 = 1
4 % 2 = 0
```

Hasil akhirnya tetap:

```text
{0, 1}
```

---

## Set Comprehension vs List Comprehension

List comprehension:

```python
result = [
    number
    for number in [1, 2, 2, 3]
]

print(result)
```

Output:

```text
[1, 2, 2, 3]
```

Set comprehension:

```python
result = {
    number
    for number in [1, 2, 2, 3]
}

print(result)
```

Output:

```text
{1, 2, 3}
```

Perbedaan utama:

| Fitur | List Comprehension | Set Comprehension |
|---|---|---|
| Hasil | `list` | `set` |
| Sintaks | `[]` | `{}` |
| Duplikasi | Dipertahankan | Dihilangkan |
| Urutan | Dipertahankan | Tidak dijamin |

---

## Kapan Menggunakan Set Comprehension?

Gunakan set comprehension ketika:

- Membutuhkan data yang unik.
- Ingin menghilangkan duplikasi.
- Membutuhkan struktur data `set`.
- Ingin melakukan transformasi data.
- Ingin melakukan filtering.
- Ingin melakukan filtering dan transformasi sekaligus.

---

## Readability

Set comprehension membuat kode sederhana menjadi lebih ringkas.

Contoh:

```python
result = {
    number * 2
    for number in numbers
    if number % 2 == 0
}
```

Namun, jangan membuat expression dan kondisi terlalu kompleks.

Jika logikanya sulit dibaca, gunakan `for` loop biasa.

Contoh:

```python
result = set()

for number in numbers:
    if number % 2 == 0:
        result.add(number * 2)
```

Tujuan utama comprehension bukan sekadar membuat kode menjadi satu baris, tetapi membuat operasi sederhana menjadi lebih ringkas, ekspresif, dan mudah dibaca.

---

## Kesimpulan

Set comprehension digunakan untuk membuat `set` baru secara ringkas berdasarkan sebuah `iterable`.

Sintaks dasar:

```python
{expression for item in iterable}
```

Dengan filtering:

```python
{expression for item in iterable if condition}
```

Karakteristik utama:

- Menghasilkan `set`.
- Menggunakan `{}`.
- Dapat melakukan transformasi.
- Dapat melakukan filtering.
- Dapat menggunakan operator aritmatika.
- Menghilangkan elemen duplikat secara otomatis.
- Tidak menjamin urutan elemen.
- Cocok digunakan ketika hasil akhir membutuhkan data yang unik.
