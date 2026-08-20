---
sidebar_position: 8
title: "For Loops"
---

**For loop** digunakan untuk menjalankan kode secara berulang untuk setiap elemen yang terdapat di dalam sebuah objek yang dapat diiterasi (*iterable*).

Perulangan sangat penting dalam pemrograman karena memungkinkan program memproses banyak data tanpa harus menulis kode yang sama berulang kali.

---

## Sintaks Dasar For Loop

Bentuk dasar `for loop` adalah:

```python
for item in iterable:
    print(item)
```

Beberapa bagian penting:

- `for` adalah keyword untuk memulai perulangan.
- `item` adalah variabel yang menyimpan elemen yang sedang diproses.
- `in` digunakan untuk mengambil elemen dari objek yang diiterasi.
- `iterable` adalah objek yang dapat diiterasi, seperti `list`, `tuple`, `set`, `string`, dan dictionary.

Nama variabel `item` dapat diganti sesuai kebutuhan.

Contoh:

```python
for number in [1, 2, 3]:
    print(number)
```

Output:

```text
1
2
3
```

Python mengambil setiap elemen dari list secara berurutan dan memasukkannya ke dalam variabel `number`.

---

## Iterasi pada String

String merupakan objek yang dapat diiterasi. Ketika digunakan dalam `for loop`, Python akan memproses setiap karakter satu per satu.

```python
for character in "Python":
    print(character)
```

Output:

```text
P
y
t
h
o
n
```

Contoh lainnya:

```python
name = "Andi"

for character in name:
    print(character)
```

Perulangan akan berjalan sebanyak jumlah karakter yang terdapat dalam string.

---

## Iterasi pada List

List merupakan salah satu objek yang paling sering digunakan bersama `for loop`.

```python
fruits = ["Apple", "Banana", "Orange"]

for fruit in fruits:
    print(fruit)
```

Output:

```text
Apple
Banana
Orange
```

Setiap elemen list diproses satu per satu.

---

## Iterasi pada Tuple

Tuple juga dapat digunakan dalam `for loop`.

```python
numbers = (10, 20, 30, 40)

for number in numbers:
    print(number)
```

Output:

```text
10
20
30
40
```

Meskipun tuple bersifat immutable, elemen di dalamnya tetap dapat dibaca dan diiterasi.

---

## Iterasi pada Set

Set juga merupakan iterable.

```python
numbers = {1, 2, 3, 4}

for number in numbers:
    print(number)
```

Set tidak menggunakan indeks seperti list, sehingga kita tidak menentukan posisi elemen saat melakukan iterasi.

Perlu diingat bahwa set digunakan ketika keunikan elemen lebih penting daripada posisi atau urutan elemen.

---

## Iterasi pada Dictionary

Dictionary juga dapat digunakan dalam `for loop`.

Secara default, iterasi dictionary akan menghasilkan `key`.

```python
user = {
    "name": "Andi",
    "age": 25,
    "city": "Palu"
}

for key in user:
    print(key)
```

Output:

```text
name
age
city
```

Jika ingin mendapatkan `value`, gunakan method `.values()`:

```python
for value in user.values():
    print(value)
```

Untuk mendapatkan `key` dan `value` sekaligus, gunakan `.items()`:

```python
for key, value in user.items():
    print(key, value)
```

Output:

```text
name Andi
age 25
city Palu
```

---

## Nested For Loops

Python memungkinkan sebuah `for loop` berada di dalam `for loop` lainnya. Konsep ini disebut **nested loop** atau perulangan bersarang.

Contoh:

```python
for number in [1, 2, 3]:
    for letter in ["a", "b", "c"]:
        print(number, letter)
```

Output:

```text
1 a
1 b
1 c
2 a
2 b
2 c
3 a
3 b
3 c
```

Cara kerjanya:

1. Outer loop mengambil nilai `1`.
2. Inner loop berjalan sampai selesai untuk nilai `1`.
3. Outer loop mengambil nilai `2`.
4. Inner loop kembali berjalan sampai selesai untuk nilai `2`.
5. Proses berlanjut sampai outer loop selesai.

Nested loop berguna ketika program perlu memproses data yang memiliki struktur bertingkat.

---

## Variabel pada For Loop

Variabel yang digunakan dalam `for loop` akan menyimpan nilai elemen yang sedang diproses.

Contoh:

```python
for item in [1, 2, 3]:
    print(item)
```

Pada Python, setelah loop selesai, variabel `item` masih tersedia dan berisi nilai terakhir yang diproses.

```python
for item in [1, 2, 3]:
    pass

print(item)
```

Output:

```text
3
```

Namun, sebaiknya jangan terlalu bergantung pada perilaku ini. Jika nilai setelah loop memang dibutuhkan, gunakan nama variabel dan struktur kode yang jelas agar maksud program mudah dipahami.

---

## Memproses Data dengan For Loop

Salah satu kegunaan utama `for loop` adalah melakukan operasi terhadap setiap elemen.

Contoh:

```python
numbers = [1, 2, 3, 4, 5]

for number in numbers:
    result = number * 2
    print(result)
```

Output:

```text
2
4
6
8
10
```

Dengan satu blok kode, program dapat memproses seluruh elemen dalam list.

---

## Indentasi pada For Loop

Seperti `if`, `elif`, dan `else`, Python menggunakan indentasi untuk menentukan kode yang berada di dalam `for loop`.

```python
for number in [1, 2, 3]:
    print(number)
    print("Diproses")
```

Kedua `print()` berada di dalam loop karena memiliki tingkat indentasi yang sama.

Sedangkan:

```python
for number in [1, 2, 3]:
    print(number)

print("Loop selesai")
```

`print("Loop selesai")` berada di luar loop karena tidak memiliki indentasi.

---

## Ringkasan

Beberapa konsep utama yang perlu diingat:

1. `for loop` digunakan untuk melakukan perulangan terhadap sebuah iterable.
2. String, list, tuple, set, dan dictionary dapat digunakan dalam `for loop`.
3. Variabel setelah `for` digunakan untuk menampung elemen yang sedang diproses.
4. `for loop` dapat digunakan untuk memproses data satu per satu.
5. `for loop` dapat dibuat bersarang menggunakan nested loop.
6. Python menggunakan indentasi untuk menentukan blok kode yang berada di dalam loop.

Contoh paling sederhana:

```python
for item in [1, 2, 3]:
    print(item)
```

Konsep `for loop` akan menjadi fondasi penting untuk materi berikutnya seperti `range()`, `enumerate()`, `break`, `continue`, dan berbagai teknik pemrosesan data menggunakan perulangan.