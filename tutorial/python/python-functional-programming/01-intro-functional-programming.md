---
sidebar_position: 1
title: "Intro Functional Programming"
---

**Functional Programming (FP)** adalah salah satu paradigma pemrograman yang didukung oleh Python.

Functional Programming berfokus pada penggunaan **function untuk memproses dan mentransformasi data**.

Tujuan utama pendekatan ini adalah membuat kode:

- Lebih bersih.
- Lebih mudah diuji.
- Lebih mudah digunakan kembali.
- Meminimalkan perubahan state.
- Mengurangi efek samping atau *side effects*.

Dalam Functional Programming, kita banyak bekerja dengan konsep seperti:

```text
Data
  ↓
Function
  ↓
Data baru
```

---

## Pure Functions

**Pure function** adalah function yang memiliki dua karakteristik utama.

### 1. Input yang Sama Menghasilkan Output yang Sama

Jika sebuah function diberikan input yang sama, function tersebut akan menghasilkan output yang sama.

Secara konsep:

```text
Input yang sama
       ↓
   Function
       ↓
Output yang sama
```

Hal ini membuat perilaku function lebih mudah diprediksi.

### 2. Tidak Memiliki Side Effect

Pure function tidak mengubah sesuatu di luar dirinya.

Contohnya, function tidak:

- Mengubah variabel global.
- Mengubah file.
- Memodifikasi data di luar function.
- Mengubah argument yang diberikan secara langsung.

Dengan mengurangi side effect, function menjadi lebih mudah dipahami dan diuji.

---

## Immutability

**Immutability** adalah prinsip untuk tidak mengubah data asli ketika melakukan suatu proses.

Daripada mengubah data yang sudah ada:

```text
Data asli
   ↓
Diubah
   ↓
Data asli berubah
```

Functional Programming lebih mendorong pendekatan:

```text
Data asli
   ↓
Function
   ↓
Data baru
```

Dengan pendekatan tersebut, data asli tetap dapat dipertahankan.

Immutability membantu mengurangi kemungkinan perubahan data yang tidak disengaja.

---

## Built-in Functions dalam Functional Programming

Python menyediakan beberapa built-in function yang sangat berguna dalam pemrosesan data.

Empat function yang penting untuk dipahami adalah:

```text
map()
filter()
zip()
reduce()
```

Masing-masing memiliki tujuan yang berbeda.

---

## `map()`

Function `map()` digunakan untuk menerapkan sebuah function kepada setiap elemen dalam iterable.

Sintaks:

```python
map(function, iterable)
```

Contoh:

```python
def kali_dua(item):
    return item * 2


numbers = [1, 2, 3]

result = map(kali_dua, numbers)

print(list(result))
```

Output:

```text
[2, 4, 6]
```

Prosesnya dapat digambarkan:

```text
1 → 2
2 → 4
3 → 6
```

Function `kali_dua()` diterapkan kepada setiap elemen.

---

## `filter()`

Function `filter()` digunakan untuk menyaring elemen berdasarkan kondisi tertentu.

Function yang digunakan harus menghasilkan nilai boolean:

```text
True
False
```

Sintaks:

```python
filter(function, iterable)
```

Contoh:

```python
def hanya_ganjil(item):
    return item % 2 != 0


numbers = [1, 2, 3, 4, 5]

result = filter(hanya_ganjil, numbers)

print(list(result))
```

Output:

```text
[1, 3, 5]
```

Prosesnya:

```text
1 → True  → dipertahankan
2 → False → diabaikan
3 → True  → dipertahankan
4 → False → diabaikan
5 → True  → dipertahankan
```

---

## `zip()`

Function `zip()` digunakan untuk menggabungkan elemen dari dua atau lebih iterable berdasarkan posisi atau indeksnya.

Contoh:

```python
names = ["Alice", "Bob"]

scores = [85, 90]

result = zip(names, scores)

print(list(result))
```

Output:

```text
[("Alice", 85), ("Bob", 90)]
```

Prosesnya:

```text
Alice → 85
Bob   → 90
```

Dengan demikian, `zip()` berguna ketika kita ingin menggabungkan beberapa sumber data berdasarkan posisi elemennya.

---

## `reduce()`

Function `reduce()` digunakan untuk mengakumulasi seluruh elemen iterable menjadi **satu nilai**.

Berbeda dengan `map()` yang menghasilkan transformasi setiap elemen dan `filter()` yang menyaring elemen, `reduce()` secara bertahap menggabungkan elemen menjadi satu hasil.

`reduce()` tersedia melalui module `functools`.

Contoh:

```python
from functools import reduce


def akumulator(acc, item):
    return acc + item


numbers = [1, 2, 3, 4]

result = reduce(
    akumulator,
    numbers,
    0
)

print(result)
```

Output:

```text
10
```

Prosesnya dapat digambarkan:

```text
0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
6 + 4 = 10
```

Hasil akhirnya adalah satu nilai:

```text
10
```

---

## Perbandingan `map()`, `filter()`, `zip()`, dan `reduce()`

| Function | Tujuan |
|---|---|
| `map()` | Mentransformasi setiap elemen |
| `filter()` | Menyaring elemen berdasarkan kondisi |
| `zip()` | Menggabungkan beberapa iterable berdasarkan posisi |
| `reduce()` | Menggabungkan elemen menjadi satu nilai |

Secara sederhana:

```text
map()
Data → Data → Data

filter()
Data → Data yang memenuhi kondisi

zip()
Data A + Data B → Data gabungan

reduce()
Banyak data → Satu nilai
```

---

## Lambda Expressions

**Lambda expression** adalah function anonim atau function tanpa nama yang biasanya digunakan untuk operasi sederhana.

Bentuk umumnya:

```python
lambda parameter: expression
```

Lambda sangat sering digunakan bersama dengan:

```text
map()
filter()
sort()
```

Contoh menggunakan `map()`:

```python
numbers = [1, 2, 3]

result = map(
    lambda item: item * 2,
    numbers
)

print(list(result))
```

Output:

```text
[2, 4, 6]
```

Lambda tersebut:

```python
lambda item: item * 2
```

melakukan hal yang sama dengan function:

```python
def kali_dua(item):
    return item * 2
```

---

## Lambda dengan `filter()`

Lambda juga dapat digunakan untuk membuat kondisi sederhana.

Contoh:

```python
numbers = [1, 2, 3]

result = filter(
    lambda item: item % 2 != 0,
    numbers
)

print(list(result))
```

Output:

```text
[1, 3]
```

Lambda:

```python
lambda item: item % 2 != 0
```

menghasilkan:

```text
True
```

untuk angka ganjil dan:

```text
False
```

untuk angka genap.

---

## Kapan Menggunakan Lambda?

Lambda cocok digunakan ketika function yang dibutuhkan:

- Sangat sederhana.
- Hanya digunakan satu kali.
- Tidak membutuhkan nama khusus.
- Digunakan sebagai argument function lain.

Contohnya:

```python
map(
    lambda item: item * 2,
    numbers
)
```

Namun, jika logika menjadi panjang atau kompleks, function biasa biasanya lebih mudah dibaca.

---

## Comprehensions

**Comprehension** adalah syntax ringkas yang digunakan untuk membuat struktur data baru berdasarkan iterable yang sudah ada.

Comprehension dapat digunakan untuk:

- List.
- Set.
- Dictionary.

Konsep dasarnya:

```text
Iterable
   ↓
Proses
   ↓
Struktur data baru
```

---

## List Comprehension

List comprehension digunakan untuk membuat list baru dari iterable.

Contoh:

```python
evens = [
    x
    for x in range(10)
    if x % 2 == 0
]

print(evens)
```

Output:

```text
[0, 2, 4, 6, 8]
```

List comprehension tersebut memilih angka yang memenuhi kondisi:

```python
x % 2 == 0
```

---

## Set Comprehension

Set comprehension digunakan untuk membuat set.

Contoh:

```python
unique_num = {
    x
    for x in [1, 1, 2, 3, 3]
}

print(unique_num)
```

Hasilnya merupakan set yang hanya menyimpan elemen unik:

```text
{1, 2, 3}
```

Perbedaan utama dengan list adalah set tidak menyimpan duplikasi elemen.

---

## Dictionary Comprehension

Dictionary comprehension digunakan untuk membuat dictionary secara ringkas.

Contoh:

```python
my_dict = {
    num: num * 2
    for num in [1, 2, 3]
}

print(my_dict)
```

Output:

```text
{
    1: 2,
    2: 4,
    3: 6
}
```

Pada contoh tersebut:

```text
1 → 2
2 → 4
3 → 6
```

Setiap angka digunakan sebagai key dan hasil perkaliannya digunakan sebagai value.

---

## Built-in Functions dan Comprehension

`map()`, `filter()`, dan comprehension sering digunakan untuk menyelesaikan masalah yang sama dengan pendekatan yang berbeda.

Misalnya kita ingin mendapatkan angka genap.

Dengan `filter()`:

```python
numbers = [1, 2, 3, 4, 5]

result = filter(
    lambda x: x % 2 == 0,
    numbers
)

print(list(result))
```

Dengan list comprehension:

```python
numbers = [1, 2, 3, 4, 5]

result = [
    x
    for x in numbers
    if x % 2 == 0
]

print(result)
```

Keduanya menghasilkan:

```text
[2, 4]
```

Pilihan pendekatan dapat disesuaikan dengan kebutuhan dan keterbacaan kode.

---

## Alur Pemrosesan Data

Konsep Functional Programming dapat digunakan untuk membangun pipeline pemrosesan data.

Misalnya:

```text
Data Awal
   ↓
filter()
   ↓
Data yang dipilih
   ↓
map()
   ↓
Data yang ditransformasi
   ↓
reduce()
   ↓
Hasil akhir
```

Pendekatan seperti ini membantu kita melihat program sebagai serangkaian transformasi data.

---

## Contoh Konsep Pipeline

Misalnya kita memiliki data:

```text
1
2
3
4
5
```

Kita ingin:

1. Memilih angka genap.
2. Mengalikan setiap angka dengan dua.
3. Menjumlahkan seluruh hasilnya.

Secara konsep:

```text
[1, 2, 3, 4, 5]
        ↓
     filter()
        ↓
     [2, 4]
        ↓
      map()
        ↓
     [4, 8]
        ↓
     reduce()
        ↓
       12
```

Pendekatan ini menunjukkan bagaimana beberapa konsep Functional Programming dapat digunakan untuk membangun proses pengolahan data.

---

## Kesimpulan

Functional Programming memberikan pendekatan yang berfokus pada **function, transformasi data, dan pengurangan side effect**.

Konsep penting yang perlu dipahami meliputi:

```text
Pure Functions
Immutability
map()
filter()
zip()
reduce()
Lambda
Comprehensions
```

`map()` digunakan untuk mentransformasi elemen, `filter()` digunakan untuk menyaring elemen, `zip()` digunakan untuk menggabungkan iterable, sedangkan `reduce()` digunakan untuk mengakumulasi elemen menjadi satu nilai.

Lambda menyediakan cara ringkas untuk membuat function sederhana, sedangkan comprehension menyediakan syntax ringkas untuk membuat struktur data baru.

Dengan memahami konsep-konsep tersebut, kita mulai dapat melihat Python bukan hanya sebagai bahasa pemrograman prosedural atau object-oriented, tetapi juga sebagai bahasa yang mendukung **Functional Programming**.