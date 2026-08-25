---
sidebar_position: 12
title: "Latihan: Lambda Expressions"
---

Latihan ini digunakan untuk menguji pemahaman tentang **lambda expression** dalam dua situasi umum:

1. Menggunakan lambda untuk melakukan operasi sederhana terhadap setiap elemen data.
2. Menggunakan lambda sebagai kriteria pengurutan data.

Pada latihan ini kita akan menggunakan:

- `lambda`
- `map()`
- `list()`
- `sort()`
- parameter `key`

---

## Latihan 1: Mengkuadratkan Setiap Elemen List

Diberikan sebuah list:

```python
my_list = [5, 4, 3]
```

Tugasnya adalah membuat list baru yang berisi hasil kuadrat dari setiap elemen.

Hasil yang diharapkan:

```text
[25, 16, 9]
```

### Solusi dengan Lambda dan `map()`

```python
my_list = [5, 4, 3]

square_list = list(
    map(
        lambda item: item ** 2,
        my_list
    )
)

print(square_list)
```

Output:

```text
[25, 16, 9]
```

---

## Memahami Solusi

Perhatikan bagian:

```python
lambda item: item ** 2
```

Lambda tersebut menerima satu parameter:

```text
item
```

Kemudian melakukan:

```text
item ** 2
```

yang berarti `item` dipangkatkan dengan `2`.

Karena digunakan bersama `map()`, lambda tersebut dijalankan terhadap setiap elemen dalam `my_list`.

Prosesnya:

```text
5 → 5² → 25
4 → 4² → 16
3 → 3² → 9
```

Sehingga hasil akhirnya:

```text
[25, 16, 9]
```

---

## Latihan 2: Sorting Tuple Berdasarkan Elemen Kedua

Diberikan sebuah list yang berisi beberapa tuple:

```python
a = [
    (0, 2),
    (4, 3),
    (9, 9),
    (10, -1)
]
```

Setiap tuple memiliki dua elemen.

Contohnya:

```text
(0, 2)
 ↑  ↑
 │  └── elemen kedua
 └───── elemen pertama
```

Tugasnya adalah mengurutkan tuple berdasarkan **elemen kedua**.

Hasil yang diharapkan:

```text
[
    (10, -1),
    (0, 2),
    (4, 3),
    (9, 9)
]
```

---

## Solusi dengan `sort()` dan Lambda

```python
a = [
    (0, 2),
    (4, 3),
    (9, 9),
    (10, -1)
]

a.sort(
    key=lambda x: x[1]
)

print(a)
```

Output:

```text
[(10, -1), (0, 2), (4, 3), (9, 9)]
```

---

## Memahami Parameter key

Bagian penting dari kode tersebut adalah:

```python
key=lambda x: x[1]
```

Parameter `key` digunakan untuk menentukan **nilai yang dijadikan dasar pengurutan**.

Lambda:

```python
lambda x: x[1]
```

berarti:

> Ambil elemen kedua dari setiap tuple.

Misalnya:

```text
(0, 2)   → 2
(4, 3)   → 3
(9, 9)   → 9
(10, -1) → -1
```

Python kemudian mengurutkan berdasarkan nilai tersebut:

```text
-1
 2
 3
 9
```

Sehingga urutan tuple menjadi:

```text
(10, -1)
(0, 2)
(4, 3)
(9, 9)
```

---

## Mengapa Menggunakan `x[1]`?

Tuple memiliki index yang dimulai dari `0`.

Contohnya:

```python
item = (10, -1)
```

Strukturnya:

```text
index:
  0    1

(10,  -1)
```

Maka:

```python
x[0]
```

mengambil elemen pertama:

```text
10
```

Sedangkan:

```python
x[1]
```

mengambil elemen kedua:

```text
-1
```

Karena latihan meminta pengurutan berdasarkan elemen kedua, kita menggunakan:

```python
lambda x: x[1]
```

---

## `sort()` Mengubah List Asli

Method:

```python
.sort()
```

melakukan **in-place sorting**.

Artinya, list asli akan diubah secara langsung.

Contoh:

```python
a = [
    (0, 2),
    (4, 3),
    (9, 9),
    (10, -1)
]

a.sort(
    key=lambda x: x[1]
)

print(a)
```

Setelah `sort()` dijalankan, variable `a` sudah berisi data dalam urutan baru.

Berbeda dengan function `sorted()` yang menghasilkan list baru.

---

## `sort()` vs `sorted()`

Python menyediakan dua pendekatan yang umum digunakan untuk sorting.

### Menggunakan `sort()`

```python
numbers = [3, 1, 2]

numbers.sort()

print(numbers)
```

Output:

```text
[1, 2, 3]
```

List `numbers` diubah secara langsung.

### Menggunakan `sorted()`

```python
numbers = [3, 1, 2]

result = sorted(numbers)

print(result)
print(numbers)
```

Output:

```text
[1, 2, 3]
[3, 1, 2]
```

`sorted()` menghasilkan list baru sehingga data asli tetap tersedia dalam urutan sebelumnya.

---

## Lambda sebagai Sorting Key

Lambda sangat berguna sebagai `key` ketika kita membutuhkan aturan pengurutan tertentu.

Contohnya, data:

```python
users = [
    {"name": "Budi", "age": 25},
    {"name": "Andi", "age": 20},
    {"name": "Citra", "age": 30}
]
```

Kita dapat mengurutkan berdasarkan usia:

```python
users.sort(
    key=lambda user: user["age"]
)
```

Lambda menentukan nilai yang digunakan sebagai dasar pengurutan.

Konsepnya:

```text
User
  ↓
lambda user: user["age"]
  ↓
 Age
  ↓
Sorting
```

---

## Hubungan dengan Higher-Order Function

Latihan ini juga memperkuat konsep **Higher-Order Function**.

Pada latihan pertama:

```python
map(
    lambda item: item ** 2,
    my_list
)
```

Lambda diberikan kepada `map()` sebagai argument.

Pada latihan kedua:

```python
a.sort(
    key=lambda x: x[1]
)
```

Lambda diberikan kepada `sort()` melalui parameter `key`.

Dalam kedua kasus tersebut, function digunakan sebagai sebuah nilai.

Hal ini berkaitan dengan konsep **First-Class Function** dalam Python.

---

## Poin Penting Pembelajaran

Dari latihan ini kita dapat memahami beberapa konsep penting.

### Lambda untuk Operasi Sederhana

Contoh:

```python
lambda item: item ** 2
```

digunakan untuk melakukan operasi sederhana terhadap sebuah nilai.

### Lambda dengan `map()`

```python
map(
    lambda item: item ** 2,
    my_list
)
```

`map()` menjalankan lambda terhadap setiap elemen.

### Lambda sebagai Sorting Key

```python
sort(
    key=lambda x: x[1]
)
```

Lambda menentukan nilai yang digunakan sebagai dasar pengurutan.

### `sort()` Melakukan In-Place Sorting

```python
a.sort()
```

mengubah list asli secara langsung.

---

## Kesimpulan

Latihan Lambda Expressions memperlihatkan bahwa lambda tidak hanya digunakan untuk operasi matematika sederhana, tetapi juga dapat digunakan untuk menentukan perilaku tertentu pada function lain.

Pada latihan pertama:

```python
my_list = [5, 4, 3]

square_list = list(
    map(
        lambda item: item ** 2,
        my_list
    )
)
```

Lambda digunakan bersama `map()` untuk mengkuadratkan setiap elemen.

Pada latihan kedua:

```python
a = [
    (0, 2),
    (4, 3),
    (9, 9),
    (10, -1)
]

a.sort(
    key=lambda x: x[1]
)
```

Lambda digunakan sebagai `key` untuk menentukan bahwa pengurutan dilakukan berdasarkan elemen kedua dari setiap tuple.

Dua pola penting yang perlu diingat:

```text
map()
 ↓
lambda
 ↓
Transformasi data
```

dan:

```text
sort()
 ↓
key
 ↓
lambda
 ↓
Menentukan dasar pengurutan
```