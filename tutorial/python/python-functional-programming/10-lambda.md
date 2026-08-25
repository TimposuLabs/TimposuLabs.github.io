---
sidebar_position: 11
title: "Lambda Expressions"
---

**Lambda expression** adalah cara singkat untuk membuat sebuah function tanpa harus memberikan nama menggunakan keyword `def`.

Lambda sering digunakan ketika kita membutuhkan function sederhana yang hanya digunakan pada suatu konteks tertentu, terutama ketika bekerja dengan **Higher-Order Function** seperti `map()`, `filter()`, dan `reduce()`.

Contoh function biasa:

```python
def multiply_by_two(number):
    return number * 2
```

Function tersebut dapat ditulis menggunakan lambda:

```python
lambda number: number * 2
```

Keduanya memiliki tujuan yang sama, yaitu menerima sebuah angka dan mengembalikan hasil perkalian dengan `2`.

---

## Sintaks Lambda

Sintaks dasar lambda adalah:

```python
lambda parameter: expression
```

Terdapat beberapa bagian:

```text
lambda
  ↓
Parameter
  ↓
Expression
```

Contoh:

```python
lambda number: number * 2
```

Penjelasannya:

- `lambda` adalah keyword untuk membuat lambda expression.
- `number` adalah parameter.
- `number * 2` adalah expression yang menghasilkan nilai.

Lambda secara otomatis mengembalikan hasil dari expression tersebut.

---

## Function Biasa vs Lambda

Function biasa:

```python
def multiply_by_two(number):
    return number * 2
```

Dengan lambda:

```python
lambda number: number * 2
```

Secara konsep keduanya melakukan hal yang sama:

```text
Input
  ↓
number
  ↓
number × 2
  ↓
Output
```

Perbedaannya adalah function biasa memiliki nama dan menggunakan blok statement, sedangkan lambda merupakan expression yang ditulis secara ringkas.

---

## Menyimpan Lambda ke Variable

Lambda dapat disimpan ke dalam variable.

Contoh:

```python
multiply_by_two = lambda number: number * 2
```

Kemudian dapat dipanggil seperti function:

```python
print(multiply_by_two(5))
```

Output:

```text
10
```

Namun, untuk function yang akan digunakan berulang kali atau memiliki logika yang cukup kompleks, penggunaan `def` biasanya lebih mudah dibaca.

---

## Lambda dengan Satu Parameter

Lambda dapat menerima satu parameter.

Contoh:

```python
square = lambda number: number ** 2

print(square(5))
```

Output:

```text
25
```

Secara konsep:

```text
 5
 ↓
 5²
 ↓
 25
```

---

## Lambda dengan Beberapa Parameter

Lambda juga dapat menerima beberapa parameter.

Contoh:

```python
add = lambda first, second: first + second

print(add(10, 5))
```

Output:

```text
15
```

Sintaksnya:

```python
lambda first, second: first + second
```

Artinya function menerima dua parameter:

```text
first
second
```

kemudian menghasilkan:

```text
first + second
```

---

## Lambda dengan `map()`

Salah satu penggunaan lambda yang paling umum adalah bersama `map()`.

Misalnya kita memiliki:

```python
numbers = [1, 2, 3]
```

Kita ingin mengalikan setiap angka dengan `2`.

Dengan function biasa:

```python
def multiply_by_two(number):
    return number * 2


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

Dengan lambda:

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

Lambda cocok digunakan karena function tersebut sederhana dan hanya dibutuhkan oleh `map()`.

---

## Lambda dengan `filter()`

Lambda juga sering digunakan bersama `filter()`.

Misalnya kita ingin mengambil angka ganjil:

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

Lambda:

```python
lambda number: number % 2 != 0
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

## Lambda dengan `reduce()`

Lambda juga dapat digunakan bersama `reduce()`.

Karena `reduce()` berada di dalam modul `functools`, kita harus melakukan import:

```python
from functools import reduce
```

Contoh:

```python
from functools import reduce

numbers = [1, 2, 3]

result = reduce(
    lambda acc, number: acc + number,
    numbers,
    0
)

print(result)
```

Output:

```text
6
```

Prosesnya:

```text
0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
```

Lambda:

```python
lambda acc, number: acc + number
```

bertugas menggabungkan accumulator dengan elemen yang sedang diproses.

---

## Lambda dengan `sorted()`

Lambda tidak hanya digunakan bersama `map()`, `filter()`, dan `reduce()`.

Lambda juga sering digunakan untuk menentukan aturan pengurutan pada `sorted()`.

Misalnya:

```python
users = [
    {"name": "Budi", "age": 25},
    {"name": "Andi", "age": 20},
    {"name": "Citra", "age": 30}
]
```

Kita ingin mengurutkan user berdasarkan usia:

```python
result = sorted(
    users,
    key=lambda user: user["age"]
)

print(result)
```

Hasilnya diurutkan berdasarkan nilai `age`.

Lambda:

```python
lambda user: user["age"]
```

digunakan untuk menentukan nilai yang menjadi dasar pengurutan.

---

## Lambda dan Higher-Order Function

Lambda sangat berkaitan dengan konsep **Higher-Order Function**.

Higher-Order Function adalah function yang dapat menerima function sebagai argument atau mengembalikan function.

Contohnya:

```python
def execute(function, value):
    return function(value)
```

Kita dapat memberikan lambda sebagai argument:

```python
result = execute(
    lambda number: number * 2,
    10
)

print(result)
```

Output:

```text
20
```

Alurnya:

```text
lambda
  ↓
diberikan sebagai argument
  ↓
execute()
  ↓
function dijalankan
  ↓
 20
```

---

## Lambda dan First-Class Function

Penggunaan lambda juga berkaitan dengan konsep **First-Class Function**.

Python memperlakukan function sebagai object sehingga function dapat:

- Disimpan dalam variable.
- Diberikan sebagai argument.
- Dikembalikan oleh function.
- Disimpan dalam collection.

Contohnya:

```python
operations = [
    lambda number: number + 1,
    lambda number: number * 2
]
```

Kemudian kita dapat menjalankan function tersebut:

```python
print(operations[0](10))
print(operations[1](10))
```

Output:

```text
11
20
```

---

## Lambda Hanya Memiliki Satu Expression

Lambda dirancang untuk expression sederhana.

Contoh yang baik:

```python
lambda number: number * 2
```

Contoh lainnya:

```python
lambda first, second: first + second
```

Lambda tidak ditulis seperti function biasa dengan banyak statement.

Jika logikanya mulai panjang dan kompleks, lebih baik menggunakan `def`.

---

## Lambda dan Return

Lambda tidak menggunakan keyword `return`.

Function biasa:

```python
def multiply_by_two(number):
    return number * 2
```

Lambda:

```python
lambda number: number * 2
```

Expression:

```python
number * 2
```

secara otomatis menjadi nilai yang dikembalikan oleh lambda.

Karena itu, kita tidak perlu menulis:

```python
lambda number: return number * 2
```

Penulisan tersebut tidak valid.

---

## Lambda sebagai Function Sementara

Lambda sangat cocok ketika sebuah function hanya diperlukan pada satu bagian kode.

Contohnya:

```python
numbers = [1, 2, 3]

result = list(
    map(
        lambda number: number * 2,
        numbers
    )
)
```

Tidak ada kebutuhan untuk membuat function bernama:

```python
def multiply_by_two(number):
    ...
```

karena operasi tersebut hanya digunakan dalam proses `map()`.

---

## Kapan Menggunakan Lambda?

Lambda cocok digunakan ketika:

- Logika function sangat sederhana.
- Function hanya digunakan pada satu tempat.
- Function diberikan sebagai argument kepada Higher-Order Function.
- Membutuhkan function kecil untuk `map()`.
- Membutuhkan kondisi sederhana untuk `filter()`.
- Membutuhkan aturan sederhana untuk `sorted()`.
- Membutuhkan operasi sederhana untuk `reduce()`.

Contohnya:

```python
map(
    lambda number: number * 2,
    numbers
)
```

---

## Kapan Menggunakan `def`?

Gunakan `def` ketika:

- Function digunakan berkali-kali.
- Function memiliki logika yang kompleks.
- Function memiliki beberapa statement.
- Function membutuhkan dokumentasi yang jelas.
- Function memiliki nama yang penting untuk menjelaskan tujuannya.

Contoh:

```python
def calculate_discount(price, discount):
    discounted_price = price * discount
    final_price = price - discounted_price

    return final_price
```

Untuk kasus seperti ini, menggunakan lambda justru dapat membuat kode lebih sulit dibaca.

---

## Readability dan Lambda

Lambda membuat kode menjadi lebih ringkas, tetapi kode yang lebih pendek tidak selalu berarti lebih mudah dibaca.

Contoh:

```python
result = list(
    map(
        lambda number: number * 2,
        numbers
    )
)
```

cukup mudah dipahami.

Namun jika lambda menjadi terlalu kompleks:

```python
result = list(
    map(
        lambda user: user["age"] >= 18 and user["active"] and user["score"] > 80,
        users
    )
)
```

kode dapat menjadi lebih sulit dibaca.

Dalam kondisi seperti ini, lebih baik menggunakan function dengan nama yang jelas:

```python
def is_qualified_user(user):
    return (
        user["age"] >= 18
        and user["active"]
        and user["score"] > 80
    )
```

Kemudian:

```python
result = list(
    filter(
        is_qualified_user,
        users
    )
)
```

Function tersebut lebih mudah dipahami karena namanya menjelaskan tujuan dari kondisi yang digunakan.

---

## Lambda dalam Functional Programming

Lambda merupakan salah satu fitur Python yang mendukung pendekatan Functional Programming.

Lambda sering digunakan bersama:

```text
Higher-Order Function
       ↓
   ┌───┼────┬──────┐
   ↓   ↓    ↓      ↓
  map filter reduce sorted
```

Contohnya:

```python
numbers = [1, 2, 3, 4, 5]

result = list(
    map(
        lambda number: number * 2,
        numbers
    )
)
```

Lambda menyediakan function sederhana yang dapat langsung diberikan kepada Higher-Order Function.

---

## Kelebihan Lambda

Beberapa keuntungan lambda:

- Sintaks lebih ringkas.
- Cocok untuk operasi sederhana.
- Praktis digunakan sebagai argument function.
- Mengurangi kebutuhan membuat function bernama untuk operasi satu kali.
- Sangat cocok digunakan bersama Higher-Order Function.

---

## Kekurangan Lambda

Penggunaan lambda juga memiliki beberapa pertimbangan:

- Tidak cocok untuk logika kompleks.
- Dapat menurunkan readability jika terlalu panjang.
- Tidak memiliki nama yang deskriptif ketika digunakan langsung.
- Terlalu banyak lambda dapat membuat kode sulit dipelihara.

Karena itu, lambda sebaiknya digunakan secara **proporsional**.

---

## Perbandingan Lambda dan Function Biasa

| Function Biasa | Lambda |
|---|---|
| Menggunakan `def` | Menggunakan `lambda` |
| Memiliki nama | Biasanya anonim |
| Dapat memiliki banyak statement | Hanya satu expression |
| Menggunakan `return` | Auto-return |
| Cocok untuk logika kompleks | Cocok untuk operasi sederhana |
| Lebih mudah didokumentasikan | Lebih ringkas |

Contoh:

```python
def square(number):
    return number ** 2
```

Setara dengan:

```python
lambda number: number ** 2
```

---

## Kesimpulan

**Lambda expression** adalah cara ringkas untuk membuat function anonim di Python.

Sintaks dasarnya:

```python
lambda parameter: expression
```

Contoh:

```python
lambda number: number * 2
```

Lambda sangat berguna dalam Functional Programming, terutama ketika digunakan bersama Higher-Order Function seperti:

```text
map()
filter()
reduce()
sorted()
```

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

Hal penting yang perlu diingat:

- Lambda adalah function yang ditulis secara ringkas.
- Lambda tidak membutuhkan nama ketika digunakan secara langsung.
- Lambda hanya memiliki satu expression.
- Hasil expression secara otomatis menjadi nilai return.
- Lambda dapat menerima satu atau beberapa parameter.
- Lambda sering digunakan bersama Higher-Order Function.
- Lambda cocok untuk operasi sederhana.
- Gunakan `def` jika logika function mulai kompleks atau membutuhkan nama yang jelas.

Prinsip sederhananya:

```text
Operasi sederhana dan sekali pakai
        ↓
      lambda

Operasi kompleks atau digunakan kembali
        ↓
        def
```