---
sidebar_position: 7
title: "Fungsi filter()"
---

`filter()` adalah **built-in function** Python yang digunakan untuk menyaring elemen dari sebuah **iterable** berdasarkan kondisi tertentu.

Jika `map()` digunakan untuk **mentransformasi setiap elemen**, maka `filter()` digunakan untuk **memilih elemen yang memenuhi kondisi tertentu**.

Secara sederhana:

```text
Data
  ↓
Condition
  ↓
True  → Dipertahankan
False → Dibuang
```

Contohnya, kita memiliki data:

```text
[1, 2, 3, 4, 5]
```

dan hanya ingin mengambil angka ganjil.

Maka:

```text
1 → True  → dipertahankan
2 → False → dibuang
3 → True  → dipertahankan
4 → False → dibuang
5 → True  → dipertahankan
```

Hasil akhirnya:

```text
[1, 3, 5]
```

---

## Sintaks Dasar

Sintaks dasar `filter()` adalah:

```python
filter(function, iterable)
```

Terdapat dua argument utama:

### Function

Function yang digunakan untuk menentukan apakah sebuah elemen akan dipertahankan atau tidak.

Function tersebut biasanya menghasilkan nilai:

```text
True
```

atau:

```text
False
```

### Iterable

Data yang akan diperiksa.

Contohnya:

```python
numbers = [1, 2, 3, 4, 5]
```

Sehingga:

```python
filter(is_even, numbers)
```

dapat dibaca:

> Periksa setiap elemen `numbers` menggunakan function `is_even`.

---

## Cara Kerja filter()

Misalnya kita memiliki:

```python
numbers = [1, 2, 3, 4, 5]
```

Kemudian kita membuat function:

```python
def is_even(number):
    return number % 2 == 0
```

Function tersebut menghasilkan:

```text
1 → False
2 → True
3 → False
4 → True
5 → False
```

Kemudian:

```python
filter(is_even, numbers)
```

akan mempertahankan elemen yang menghasilkan `True`.

Hasilnya:

```text
[2, 4]
```

---

## Contoh Menyaring Angka Ganjil

Kita dapat membuat function untuk mencari angka ganjil:

```python
def only_odd(number):
    return number % 2 != 0
```

Kemudian:

```python
numbers = [1, 2, 3, 4, 5]

result = filter(
    only_odd,
    numbers
)

print(list(result))
```

Output:

```text
[1, 3, 5]
```

---

## Mengapa Function Menghasilkan Boolean?

Function yang digunakan oleh `filter()` harus menentukan apakah sebuah elemen memenuhi kondisi.

Contohnya:

```python
def only_odd(number):
    return number % 2 != 0
```

Expression:

```python
number % 2 != 0
```

menghasilkan:

```text
True
```

atau:

```text
False
```

Misalnya:

```text
1 % 2 != 0 → True
2 % 2 != 0 → False
3 % 2 != 0 → True
```

`filter()` menggunakan hasil tersebut untuk menentukan elemen mana yang dipertahankan.

---

## `filter()` Tidak Mengubah Data Asli

`filter()` tidak secara otomatis mengubah iterable asli.

Contoh:

```python
numbers = [1, 2, 3, 4, 5]


def only_odd(number):
    return number % 2 != 0


result = list(
    filter(
        only_odd,
        numbers
    )
)

print(numbers)
print(result)
```

Output:

```text
[1, 2, 3, 4, 5]
[1, 3, 5]
```

Data asli tetap:

```text
[1, 2, 3, 4, 5]
```

Sedangkan hasil filter adalah:

```text
[1, 3, 5]
```

---

## `filter()` Menghasilkan Filter Object

Seperti `map()`, `filter()` tidak langsung menghasilkan sebuah `list`.

Contoh:

```python
numbers = [1, 2, 3, 4, 5]


def only_odd(number):
    return number % 2 != 0


result = filter(
    only_odd,
    numbers
)

print(result)
```

`result` merupakan **filter object**.

Untuk melihat hasilnya sebagai list:

```python
print(list(result))
```

Output:

```text
[1, 3, 5]
```

---

## Mengapa Menggunakan `list()`?

`filter()` menghasilkan object iterator.

Artinya, hasilnya dapat diproses secara bertahap.

Jika kita membutuhkan hasil dalam bentuk list, gunakan:

```python
list(
    filter(
        only_odd,
        numbers
    )
)
```

Contoh:

```python
numbers = [1, 2, 3, 4, 5]

result = list(
    filter(
        only_odd,
        numbers
    )
)

print(result)
```

Output:

```text
[1, 3, 5]
```

---

## Jangan Menggunakan `()` pada Function

Sama seperti `map()`, function diberikan kepada `filter()` tanpa tanda kurung.

Gunakan:

```python
filter(
    only_odd,
    numbers
)
```

bukan:

```python
filter(
    only_odd(),
    numbers
)
```

Mengapa?

Karena:

```python
only_odd
```

adalah **function object**.

Sedangkan:

```python
only_odd()
```

berarti function tersebut langsung dipanggil.

`filter()` membutuhkan function yang dapat dipanggil untuk setiap elemen.

---

## `filter()` sebagai Higher-Order Function

`filter()` merupakan contoh **Higher-Order Function** karena menerima function sebagai argument.

Contoh:

```python
def is_even(number):
    return number % 2 == 0


numbers = [1, 2, 3, 4, 5]

result = filter(
    is_even,
    numbers
)
```

Function:

```python
is_even
```

diberikan kepada:

```python
filter()
```

Secara konsep:

```text
is_even
   ↓
Function
   ↓
filter()
   ↓
numbers
```

Hal ini dapat dilakukan karena Python memiliki konsep **First-Class Function**.

---

## `filter()` dengan Lambda

Karena `filter()` menerima function, kita juga dapat menggunakan lambda.

Contoh:

```python
numbers = [1, 2, 3, 4, 5]

result = list(
    filter(
        lambda number: number % 2 != 0,
        numbers
    )
)

print(result)
```

Output:

```text
[1, 3, 5]
```

Lambda tersebut menentukan kondisi:

```python
number % 2 != 0
```

Jika hasilnya `True`, elemen dipertahankan.

---

## Contoh Menyaring Angka Genap

Kita juga dapat menyaring angka genap.

Dengan function biasa:

```python
def is_even(number):
    return number % 2 == 0


numbers = [1, 2, 3, 4, 5, 6]

result = list(
    filter(
        is_even,
        numbers
    )
)

print(result)
```

Output:

```text
[2, 4, 6]
```

---

## Contoh Menyaring Nama

`filter()` tidak hanya dapat digunakan untuk angka.

Misalnya kita memiliki:

```python
names = [
    "Budi",
    "Andi",
    "Citra",
    "Agus"
]
```

Kita ingin mengambil nama yang dimulai dengan huruf `A`.

Buat function:

```python
def starts_with_a(name):
    return name.startswith("A")
```

Kemudian:

```python
result = list(
    filter(
        starts_with_a,
        names
    )
)

print(result)
```

Output:

```text
["Andi", "Agus"]
```

---

## Contoh Menyaring Data Berdasarkan Panjang String

Kita juga dapat menyaring string berdasarkan panjangnya.

Contoh:

```python
names = [
    "Budi",
    "Andi",
    "Alexander",
    "Citra"
]
```

Kita ingin mengambil nama dengan panjang lebih dari 5 karakter.

```python
def longer_than_five(name):
    return len(name) > 5
```

Kemudian:

```python
result = list(
    filter(
        longer_than_five,
        names
    )
)

print(result)
```

Output:

```text
["Alexander"]
```

---

## Contoh Menyaring Dictionary

Misalnya kita memiliki data user:

```python
users = [
    {
        "name": "Budi",
        "age": 25
    },
    {
        "name": "Andi",
        "age": 17
    },
    {
        "name": "Citra",
        "age": 30
    }
]
```

Kita ingin mengambil user yang berusia minimal 18 tahun.

Function:

```python
def is_adult(user):
    return user["age"] >= 18
```

Kemudian:

```python
result = list(
    filter(
        is_adult,
        users
    )
)

print(result)
```

Hasilnya:

```text
[
    {"name": "Budi", "age": 25},
    {"name": "Citra", "age": 30}
]
```

---

## Perbedaan `map()` dan `filter()`

`map()` dan `filter()` sama-sama menerima function dan iterable, tetapi tujuan keduanya berbeda.

### `map()`

Digunakan untuk **mentransformasi setiap elemen**.

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

Jumlah elemen tetap:

```text
3 → 3
```

### `filter()`

Digunakan untuk **memilih elemen berdasarkan kondisi**.

Contoh:

```python
numbers = [1, 2, 3]

result = list(
    filter(
        lambda number: number > 1,
        numbers
    )
)

print(result)
```

Output:

```text
[2, 3]
```

Jumlah elemen dapat berkurang:

```text
3 → 2
```

---

## Perbandingan Konsep

Secara sederhana:

```text
map()
 ↓
Transformasi
 ↓
Setiap elemen diproses
```

Sedangkan:

```text
filter()
 ↓
Seleksi
 ↓
Elemen dipertahankan atau dibuang
```

Contoh:

```text
Data:
[1, 2, 3, 4, 5]
```

Dengan `map()`:

```text
[1, 2, 3, 4, 5]
        ↓
      × 2
        ↓
[2, 4, 6, 8, 10]
```

Dengan `filter()`:

```text
[1, 2, 3, 4, 5]
        ↓
   hanya ganjil
        ↓
   [1, 3, 5]
```

---

## `filter()` dan List Comprehension

Operasi yang sama dapat dilakukan menggunakan list comprehension.

Dengan `filter()`:

```python
numbers = [1, 2, 3, 4, 5]

result = list(
    filter(
        lambda number: number % 2 != 0,
        numbers
    )
)
```

Dengan list comprehension:

```python
numbers = [1, 2, 3, 4, 5]

result = [
    number
    for number in numbers
    if number % 2 != 0
]
```

Keduanya menghasilkan:

```text
[1, 3, 5]
```

Dalam Python, list comprehension sering lebih mudah dibaca untuk filtering sederhana.

Namun, `filter()` tetap penting dipelajari karena merupakan bagian dari Functional Programming dan membantu memahami konsep Higher-Order Function.

---

## `filter()` dan Pure Function

Function yang digunakan oleh `filter()` dapat dibuat sebagai **pure function**.

Contoh:

```python
def is_even(number):
    return number % 2 == 0
```

Function tersebut:

- Menggunakan input sebagai dasar pengambilan keputusan.
- Menghasilkan `True` atau `False`.
- Tidak mengubah data di luar function.

Kemudian:

```python
numbers = [1, 2, 3, 4, 5]

result = list(
    filter(
        is_even,
        numbers
    )
)
```

Data asli tetap tidak berubah.

---

## Jumlah Elemen Hasil `filter()`

Berbeda dengan `map()`, jumlah elemen hasil `filter()` tidak harus sama dengan jumlah data awal.

Contoh:

```python
numbers = [1, 2, 3, 4, 5]

result = list(
    filter(
        lambda number: number > 10,
        numbers
    )
)

print(result)
```

Output:

```text
[]
```

Tidak ada elemen yang memenuhi kondisi.

Sebaliknya, jika semua elemen memenuhi kondisi:

```python
numbers = [1, 2, 3]

result = list(
    filter(
        lambda number: number > 0,
        numbers
    )
)

print(result)
```

Output:

```text
[1, 2, 3]
```

Jadi hasil `filter()` dapat memiliki:

```text
Jumlah elemen lebih sedikit
Jumlah elemen sama
Bahkan tidak memiliki elemen
```

---

## Pola Dasar `filter()`

Pola yang perlu diingat:

```python
filter(
    condition_function,
    iterable
)
```

Function biasanya menghasilkan:

```text
True
```

atau:

```text
False
```

Kemudian:

```text
True
 ↓
Elemen dipertahankan

False
 ↓
Elemen dibuang
```

---

## Kesimpulan

`filter()` adalah built-in function Python yang digunakan untuk **menyaring elemen iterable berdasarkan suatu kondisi**.

Sintaks dasarnya:

```python
filter(function, iterable)
```

Contoh:

```python
def only_odd(number):
    return number % 2 != 0


numbers = [1, 2, 3, 4, 5]

result = list(
    filter(
        only_odd,
        numbers
    )
)

print(result)
```

Output:

```text
[1, 3, 5]
```

Hal penting yang perlu diingat:

- `filter()` menerima function dan iterable.
- Function digunakan untuk menentukan kondisi setiap elemen.
- Function biasanya menghasilkan `True` atau `False`.
- `True` berarti elemen dipertahankan.
- `False` berarti elemen tidak dimasukkan ke hasil.
- Function diberikan tanpa tanda `()`.
- `filter()` menghasilkan filter object yang bersifat iterator.
- Hasil dapat dikonversi menjadi `list` menggunakan `list()`.
- `filter()` tidak mengubah iterable asli.
- `filter()` merupakan contoh Higher-Order Function.
- `filter()` sangat berguna untuk melakukan proses seleksi data.

Secara sederhana, ingat pola berikut:

```text
Iterable
   ↓
filter()
   ↓
Periksa setiap elemen
   ↓
True  → Pertahankan
False → Buang
   ↓
Filter Object
   ↓
list()
   ↓
Data hasil filtering
```

Setelah memahami `map()` dan `filter()`, konsep berikutnya yang dapat dipelajari adalah **`zip()`**, yang digunakan untuk menggabungkan beberapa iterable berdasarkan posisi elemennya.