---
sidebar_position: 8
title: "Fungsi zip()"
---

`zip()` adalah **built-in function** Python yang digunakan untuk menggabungkan dua atau lebih **iterable** berdasarkan posisi elemennya.

Nama `zip()` dapat dianalogikan seperti **ritsleting**. Beberapa iterable digabungkan secara berpasangan berdasarkan urutan elemennya.

Misalnya terdapat dua list:

```python
numbers = [1, 2, 3]
letters = ["a", "b", "c"]
```

Dengan `zip()`:

```python
result = zip(numbers, letters)
```

secara konsep hasilnya:

```text
1 → a
2 → b
3 → c
```

Sehingga jika dikonversi menjadi list:

```text
[(1, "a"), (2, "b"), (3, "c")]
```

---

## Sintaks Dasar

Sintaks dasar `zip()` adalah:

```python
zip(*iterables)
```

`zip()` dapat menerima **dua atau lebih iterable**.

Contohnya:

```python
zip(list1, list2)
```

atau:

```python
zip(list1, list2, list3)
```

Setiap elemen akan digabungkan berdasarkan posisi.

---

## Cara Kerja zip()

Misalnya kita memiliki:

```python
numbers = [1, 2, 3]
letters = ["a", "b", "c"]
```

Ketika menggunakan:

```python
zip(numbers, letters)
```

Python mengambil:

```text
Elemen pertama:

1 + "a"
↓
(1, "a")
```

Kemudian:

```text
Elemen kedua:

2 + "b"
↓
(2, "b")
```

Kemudian:

```text
Elemen ketiga:

3 + "c"
↓
(3, "c")
```

Hasil akhirnya:

```text
[(1, "a"), (2, "b"), (3, "c")]
```

---

## Menggabungkan Dua List

Contoh sederhana:

```python
my_list = [1, 2, 3]
your_list = [10, 20, 30]

result = zip(
    my_list,
    your_list
)

print(list(result))
```

Output:

```text
[(1, 10), (2, 20), (3, 30)]
```

Elemen digabungkan berdasarkan posisi:

```text
1  +  10  →  (1, 10)
2  +  20  →  (2, 20)
3  +  30  →  (3, 30)
```

---

## Menggabungkan Lebih dari Dua Iterable

`zip()` dapat digunakan dengan lebih dari dua iterable.

Contoh:

```python
numbers = [1, 2, 3]
scores = [10, 20, 30]
grades = ["A", "B", "C"]

result = zip(
    numbers,
    scores,
    grades
)

print(list(result))
```

Output:

```text
[
    (1, 10, "A"),
    (2, 20, "B"),
    (3, 30, "C")
]
```

Setiap tuple berisi elemen dari posisi yang sama.

---

## Iterable Tidak Harus Memiliki Tipe yang Sama

`zip()` dapat menggabungkan berbagai jenis iterable.

Misalnya:

```python
numbers = [1, 2, 3]
scores = (10, 20, 30)
grades = ["A", "B", "C"]

result = zip(
    numbers,
    scores,
    grades
)

print(list(result))
```

Output:

```text
[
    (1, 10, "A"),
    (2, 20, "B"),
    (3, 30, "C")
]
```

Pada contoh tersebut:

```text
numbers → list
scores  → tuple
grades  → list
```

`zip()` tetap dapat menggabungkannya.

---

## zip() dengan String

String juga merupakan iterable.

Contoh:

```python
letters = ["A", "B", "C"]
numbers = "123"

result = zip(
    letters,
    numbers
)

print(list(result))
```

Output:

```text
[("A", "1"), ("B", "2"), ("C", "3")]
```

Karena string:

```text
"123"
```

dapat diiterasi menjadi:

```text
"1"
"2"
"3"
```

---

## zip() dengan Iterable yang Berbeda Panjang

Salah satu hal penting yang perlu diperhatikan adalah panjang iterable dapat berbeda.

Misalnya:

```python
numbers = [1, 2, 3, 4]
letters = ["a", "b"]
```

Kemudian:

```python
result = zip(
    numbers,
    letters
)

print(list(result))
```

Output:

```text
[(1, "a"), (2, "b")]
```

`zip()` berhenti ketika iterable yang **paling pendek** sudah habis.

Secara konsep:

```text
numbers:
1   2   3   4

letters:
a   b

zip():
1-a
2-b
```

Elemen:

```text
3
4
```

tidak memiliki pasangan sehingga tidak dimasukkan ke hasil.

---

## zip() Menghasilkan zip Object

Seperti `map()` dan `filter()`, `zip()` menghasilkan sebuah **zip object** yang bersifat iterator.

Contoh:

```python
numbers = [1, 2, 3]
letters = ["a", "b", "c"]

result = zip(
    numbers,
    letters
)

print(result)
```

Hasilnya adalah object `zip`.

Untuk melihat isi datanya, kita dapat mengubahnya menjadi list:

```python
print(list(result))
```

Output:

```text
[(1, "a"), (2, "b"), (3, "c")]
```

---

## zip() Hanya Dapat Dikonsumsi Sekali

Karena `zip()` menghasilkan iterator, setelah seluruh data dikonsumsi, iterator tersebut tidak dapat digunakan kembali untuk mendapatkan data yang sama.

Contoh:

```python
numbers = [1, 2, 3]
letters = ["a", "b", "c"]

result = zip(
    numbers,
    letters
)

print(list(result))
print(list(result))
```

Output:

```text
[(1, "a"), (2, "b"), (3, "c")]
[]
```

Pada pemanggilan kedua, hasilnya kosong karena iterator sudah habis dikonsumsi.

Jika membutuhkan data untuk digunakan berkali-kali, kita dapat menyimpannya sebagai list:

```python
result = list(
    zip(
        numbers,
        letters
    )
)

print(result)
print(result)
```

Output:

```text
[(1, "a"), (2, "b"), (3, "c")]
[(1, "a"), (2, "b"), (3, "c")]
```

---

## Mengubah Hasil zip() Menjadi Dictionary

Salah satu penggunaan `zip()` yang sangat berguna adalah membuat dictionary dari dua iterable.

Misalnya:

```python
keys = [
    "name",
    "age",
    "city"
]

values = [
    "Budi",
    25,
    "Palu"
]
```

Kita dapat menggunakan:

```python
result = dict(
    zip(
        keys,
        values
    )
)

print(result)
```

Output:

```text
{
    "name": "Budi",
    "age": 25,
    "city": "Palu"
}
```

Secara konsep:

```text
"name" + "Budi"
       ↓
"name": "Budi"

"age" + 25
       ↓
"age": 25

"city" + "Palu"
       ↓
"city": "Palu"
```

---

## Contoh Data User

Misalnya kita memiliki data user yang terpisah:

```python
names = [
    "Budi",
    "Andi",
    "Citra"
]

ages = [
    25,
    30,
    22
]
```

Kita dapat menggabungkannya:

```python
users = list(
    zip(
        names,
        ages
    )
)

print(users)
```

Output:

```text
[
    ("Budi", 25),
    ("Andi", 30),
    ("Citra", 22)
]
```

Sekarang setiap nama memiliki pasangan usia berdasarkan posisinya.

---

## Menggabungkan Data yang Terpisah

`zip()` sangat berguna ketika data yang berhubungan disimpan dalam iterable yang terpisah.

Misalnya:

```python
usernames = [
    "budi",
    "andi",
    "citra"
]

phone_numbers = [
    "0811111111",
    "0822222222",
    "0833333333"
]
```

Kita dapat menggabungkannya:

```python
users = list(
    zip(
        usernames,
        phone_numbers
    )
)

print(users)
```

Output:

```text
[
    ("budi", "0811111111"),
    ("andi", "0822222222"),
    ("citra", "0833333333")
]
```

---

## zip() dan Unpacking

Hasil `zip()` juga dapat digunakan bersama **unpacking**.

Misalnya:

```python
names = ["Budi", "Andi", "Citra"]
ages = [25, 30, 22]

users = zip(
    names,
    ages
)

for name, age in users:
    print(name, age)
```

Output:

```text
Budi 25
Andi 30
Citra 22
```

Pada setiap perulangan, tuple:

```text
("Budi", 25)
```

di-unpack menjadi:

```text
name = "Budi"
age = 25
```

---

## zip() dalam Perulangan

`zip()` sangat sering digunakan langsung dalam `for`.

Contoh:

```python
names = ["Budi", "Andi", "Citra"]
scores = [80, 90, 75]

for name, score in zip(names, scores):
    print(name, score)
```

Output:

```text
Budi 80
Andi 90
Citra 75
```

Pendekatan ini lebih praktis daripada menggunakan index secara manual.

---

## Tanpa zip()

Tanpa `zip()`, kita mungkin perlu menggunakan index:

```python
names = ["Budi", "Andi", "Citra"]
scores = [80, 90, 75]

for index in range(len(names)):
    print(
        names[index],
        scores[index]
    )
```

Dengan `zip()`:

```python
for name, score in zip(names, scores):
    print(name, score)
```

Kode menjadi lebih sederhana dan langsung menunjukkan hubungan antara kedua data.

---

## zip() dan Functional Programming

`zip()` sering digunakan dalam Functional Programming untuk menggabungkan beberapa sumber data sebelum diproses lebih lanjut.

Misalnya:

```text
Data A ─────┐
            │
Data B ─────┼──→ zip() ──→ Data gabungan
            │
Data C ─────┘
```

Hasil dari `zip()` kemudian dapat diproses menggunakan function lain seperti:

```text
zip()
 ↓
map()
 ↓
filter()
```

---

## Menggabungkan zip() dengan map()

Contoh:

```python
numbers1 = [1, 2, 3]
numbers2 = [10, 20, 30]


def add(numbers):
    return numbers[0] + numbers[1]


result = map(
    add,
    zip(
        numbers1,
        numbers2
    )
)

print(list(result))
```

Output:

```text
[11, 22, 33]
```

Alurnya:

```text
numbers1
   +
numbers2
   ↓
  zip()
   ↓
[(1, 10), (2, 20), (3, 30)]
   ↓
  map()
   ↓
[11, 22, 33]
```

---

## zip() dan Immutability

`zip()` tidak mengubah iterable yang digunakan.

Contoh:

```python
numbers = [1, 2, 3]
scores = [10, 20, 30]

result = list(
    zip(
        numbers,
        scores
    )
)

print(numbers)
print(scores)
print(result)
```

Output:

```text
[1, 2, 3]
[10, 20, 30]
[(1, 10), (2, 20), (3, 30)]
```

Data asli tetap sama.

`zip()` menghasilkan struktur data baru ketika hasil iterator dikonsumsi dan dikonversi menjadi list.

---

## Perbedaan map(), filter(), dan zip()

Ketiga function ini memiliki tujuan yang berbeda.

### map()

Digunakan untuk **transformasi**.

```text
Data
 ↓
Function
 ↓
Data hasil transformasi
```

Contoh:

```python
list(
    map(
        lambda number: number * 2,
        numbers
    )
)
```

### filter()

Digunakan untuk **seleksi**.

```text
Data
 ↓
Condition
 ↓
Data yang memenuhi kondisi
```

Contoh:

```python
list(
    filter(
        lambda number: number > 2,
        numbers
    )
)
```

### zip()

Digunakan untuk **menggabungkan data berdasarkan posisi**.

```text
Data A ──┐
         ├──→ zip() → Data gabungan
Data B ──┘
```

Contoh:

```python
list(
    zip(
        names,
        ages
    )
)
```

---

## Kapan Menggunakan zip()?

`zip()` cocok digunakan ketika:

- Memiliki beberapa iterable yang memiliki hubungan berdasarkan posisi.
- Ingin menggabungkan beberapa sumber data.
- Ingin melakukan perulangan terhadap beberapa iterable secara bersamaan.
- Ingin membuat pasangan key-value.
- Ingin menghindari penggunaan index secara manual.
- Ingin membuat pipeline pemrosesan data.

Contohnya:

```text
names + ages
      ↓
    zip()
      ↓
user data
```

---

## Hal yang Perlu Diperhatikan

### 1. `zip()` Mengikuti Iterable Terpendek

Jika panjang iterable berbeda:

```python
numbers = [1, 2, 3]
letters = ["a", "b"]
```

maka:

```python
list(
    zip(
        numbers,
        letters
    )
)
```

menghasilkan:

```text
[(1, "a"), (2, "b")]
```

Elemen yang tidak memiliki pasangan tidak dimasukkan.

### 2. `zip()` Menghasilkan Iterator

Hasil:

```python
zip(
    numbers,
    letters
)
```

adalah `zip object`.

Gunakan:

```python
list(
    zip(
        numbers,
        letters
    )
)
```

jika ingin mendapatkan list.

### 3. `zip()` Tidak Mengubah Data Asli

Iterable yang digunakan tidak dimodifikasi oleh `zip()`.

### 4. Posisi Elemen Sangat Penting

`zip()` memasangkan data berdasarkan posisi.

Contoh:

```text
names:
Budi
Andi
Citra

ages:
25
30
22
```

maka:

```text
Budi  → 25
Andi  → 30
Citra → 22
```

Jika urutan datanya tidak sesuai, pasangan yang dihasilkan juga tidak sesuai.

---

## Kesimpulan

`zip()` adalah built-in function Python yang digunakan untuk **menggabungkan dua atau lebih iterable berdasarkan posisi elemennya**.

Contoh dasar:

```python
names = ["Budi", "Andi", "Citra"]
ages = [25, 30, 22]

result = list(
    zip(
        names,
        ages
    )
)

print(result)
```

Output:

```text
[
    ("Budi", 25),
    ("Andi", 30),
    ("Citra", 22)
]
```

Hal penting yang perlu diingat:

- `zip()` dapat menerima dua atau lebih iterable.
- Elemen digabungkan berdasarkan posisi.
- Hasilnya berupa tuple.
- `zip()` menghasilkan `zip object` yang merupakan iterator.
- Untuk mendapatkan list, gunakan `list()`.
- Jika panjang iterable berbeda, `zip()` berhenti pada iterable terpendek.
- `zip()` dapat digunakan dengan `list`, `tuple`, `set`, string, dan iterable lainnya.
- `zip()` dapat digunakan untuk membuat dictionary dengan `dict(zip(keys, values))`.
- `zip()` tidak mengubah data asli.
- `zip()` sangat berguna dalam pemrosesan dan penggabungan data.

Secara sederhana, ingat pola berikut:

```text
Iterable 1 ──┐
             │
Iterable 2 ──┼──→ zip() ──→ Tuple
             │
Iterable 3 ──┘
```

Setelah memahami `map()`, `filter()`, dan `zip()`, materi berikutnya dapat dilanjutkan dengan **`reduce()`**, yang digunakan untuk mengolah sejumlah elemen menjadi satu nilai hasil.