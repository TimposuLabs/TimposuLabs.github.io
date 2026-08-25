---
sidebar_position: 5
title: "Higher-Order Functions"
---

**Higher-Order Function** adalah function yang dapat:

- Menerima function sebagai argument.
- Mengembalikan function sebagai return value.
- Melakukan keduanya sekaligus.

Konsep ini merupakan bagian penting dari **Functional Programming** dan dapat digunakan untuk membuat kode yang lebih fleksibel serta dapat digunakan kembali.

Konsep Higher-Order Function dapat dipahami setelah memahami **First-Class Function**.

Hubungannya:

```text
First-Class Function
        ↓
Function dapat diperlakukan sebagai object
        ↓
Higher-Order Function
        ↓
Function dapat menerima /
mengembalikan function
```

---

## Function sebagai Argument

Salah satu bentuk paling sederhana dari Higher-Order Function adalah function yang menerima function lain sebagai argument.

Contoh:

```python
def greet():
    return "Hello"


def execute(function):
    return function()


result = execute(greet)

print(result)
```

Output:

```text
Hello
```

Pada kode:

```python
execute(greet)
```

function `greet` diberikan kepada function `execute`.

Di dalam `execute()`:

```python
return function()
```

function yang diberikan kemudian dipanggil.

Secara konsep:

```text
greet
  ↓
diberikan sebagai argument
  ↓
execute()
  ↓
function()
  ↓
"Hello"
```

---

## Mengapa Tidak Menggunakan `greet()`?

Perhatikan perbedaan berikut:

```python
execute(greet)
```

dan:

```python
execute(greet())
```

Pada:

```python
execute(greet)
```

kita memberikan **function object** kepada `execute`.

Sedangkan:

```python
execute(greet())
```

akan menjalankan `greet()` terlebih dahulu dan memberikan hasilnya kepada `execute`.

Contoh:

```python
def greet():
    return "Hello"


def execute(function):
    return function()


execute(greet)
```

adalah bentuk yang benar untuk memberikan function sebagai argument.

---

## Higher-Order Function dengan Parameter

Higher-Order Function juga dapat bekerja dengan function yang memiliki parameter.

Contoh:

```python
def multiply_by_two(number):
    return number * 2


def execute(function, value):
    return function(value)


result = execute(
    multiply_by_two,
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
multiply_by_two
       ↓
execute()
       ↓
value = 10
       ↓
multiply_by_two(10)
       ↓
      20
```

Function `execute()` tidak perlu mengetahui bagaimana `multiply_by_two()` melakukan perhitungannya.

---

## Menggunakan Function yang Berbeda

Keuntungan Higher-Order Function adalah kita dapat memberikan function yang berbeda tanpa mengubah function utama.

Contoh:

```python
def double(number):
    return number * 2


def square(number):
    return number ** 2


def execute(function, value):
    return function(value)


print(execute(double, 5))
print(execute(square, 5))
```

Output:

```text
10
25
```

Function:

```python
execute()
```

tetap sama.

Yang berubah hanyalah function yang diberikan sebagai argument.

---

## Function Mengembalikan Function

Bentuk lain dari Higher-Order Function adalah function yang **mengembalikan function lain**.

Contoh:

```python
def create_greeting():

    def greeting():
        return "Hello"

    return greeting
```

Kemudian:

```python
hello = create_greeting()

print(hello())
```

Output:

```text
Hello
```

Perhatikan bahwa:

```python
create_greeting()
```

mengembalikan sebuah function.

Secara konsep:

```text
create_greeting()
       ↓
Function greeting
       ↓
    hello
       ↓
    hello()
       ↓
    "Hello"
```

---

## Function Mengembalikan Function dengan Data

Function yang dikembalikan juga dapat menggunakan data dari function luar.

Contoh:

```python
def create_greeting(name):

    def greeting():
        return f"Hello {name}"

    return greeting
```

Kemudian:

```python
greet_budi = create_greeting("Budi")

print(greet_budi())
```

Output:

```text
Hello Budi
```

Kita juga dapat membuat function lain:

```python
greet_andi = create_greeting("Andi")

print(greet_andi())
```

Output:

```text
Hello Andi
```

Satu Higher-Order Function dapat menghasilkan function yang berbeda berdasarkan input.

---

## Nested Function

Contoh sebelumnya menggunakan **nested function**, yaitu function yang didefinisikan di dalam function lainnya.

Contoh:

```python
def outer():

    def inner():
        print("Hello")

    inner()
```

`inner()` berada di dalam scope `outer()`.

Nested function sering digunakan bersama Higher-Order Function, terutama ketika function yang dikembalikan membutuhkan data dari scope function luar.

Konsep ini nantinya menjadi dasar penting untuk memahami **closure** dan **decorator**.

---

## Higher-Order Function dengan `map()`

Built-in function `map()` merupakan contoh penggunaan Higher-Order Function.

Contoh:

```python
def multiply_by_two(number):
    return number * 2


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

Function:

```python
multiply_by_two
```

diberikan sebagai argument kepada:

```python
map()
```

Dengan demikian, `map()` merupakan function yang menerima function sebagai argument.

---

## Higher-Order Function dengan `filter()`

`filter()` juga menggunakan konsep yang sama.

Contoh:

```python
def is_even(number):
    return number % 2 == 0


numbers = [1, 2, 3, 4, 5]

result = filter(
    is_even,
    numbers
)

print(list(result))
```

Output:

```text
[2, 4]
```

Function:

```python
is_even
```

diberikan kepada:

```python
filter()
```

`filter()` kemudian menggunakan function tersebut untuk menentukan elemen mana yang dipertahankan.

---

## Higher-Order Function dengan `reduce()`

`reduce()` juga menerima function sebagai argument.

Contoh:

```python
from functools import reduce


def add(accumulator, number):
    return accumulator + number


numbers = [1, 2, 3, 4]

result = reduce(
    add,
    numbers,
    0
)

print(result)
```

Output:

```text
10
```

Function:

```python
add
```

diberikan kepada:

```python
reduce()
```

Kemudian `reduce()` menggunakan function tersebut untuk mengakumulasi data.

---

## Higher-Order Function dengan Lambda

Lambda juga dapat digunakan sebagai argument.

Contoh:

```python
numbers = [1, 2, 3]

result = map(
    lambda number: number * 2,
    numbers
)

print(list(result))
```

Output:

```text
[2, 4, 6]
```

Lambda:

```python
lambda number: number * 2
```

merupakan function yang diberikan kepada `map()`.

---

## Higher-Order Function untuk Operasi Matematika

Kita dapat membuat function yang menerima operasi matematika sebagai argument.

Contoh:

```python
def add(a, b):
    return a + b


def multiply(a, b):
    return a * b


def calculate(function, a, b):
    return function(a, b)


print(calculate(add, 10, 5))
print(calculate(multiply, 10, 5))
```

Output:

```text
15
50
```

Function `calculate()` dapat bekerja dengan berbagai operasi tanpa perlu mengetahui detail implementasi masing-masing operasi.

---

## Mengurangi Duplikasi Kode

Tanpa Higher-Order Function, kita mungkin membuat banyak function yang memiliki struktur hampir sama.

Misalnya:

```python
def calculate_add(a, b):
    return a + b


def calculate_multiply(a, b):
    return a * b


def calculate_subtract(a, b):
    return a - b
```

Dengan Higher-Order Function, kita dapat memisahkan proses umum dari operasi yang ingin digunakan:

```python
def calculate(function, a, b):
    return function(a, b)
```

Kemudian:

```python
def add(a, b):
    return a + b


def multiply(a, b):
    return a * b


print(calculate(add, 10, 5))
print(calculate(multiply, 10, 5))
```

Pendekatan ini dapat mengurangi duplikasi dan meningkatkan fleksibilitas kode.

---

## Higher-Order Function dan Reusability

Higher-Order Function memungkinkan sebuah function digunakan kembali dengan berbagai function lainnya.

Contoh:

```python
def execute(function, value):
    return function(value)
```

Function tersebut dapat digunakan dengan:

```python
def double(value):
    return value * 2
```

atau:

```python
def square(value):
    return value ** 2
```

atau:

```python
def cube(value):
    return value ** 3
```

Contoh penggunaan:

```python
print(execute(double, 5))
print(execute(square, 5))
print(execute(cube, 5))
```

Output:

```text
10
25
125
```

---

## Higher-Order Function dan Abstraksi

Higher-Order Function juga dapat membantu membuat abstraksi.

Misalnya kita memiliki proses umum:

```text
Ambil data
   ↓
Proses data
   ↓
Kembalikan hasil
```

Jenis proses dapat diberikan sebagai function.

Secara konsep:

```text
                Function A
                    ↓
Data → Higher-Order Function → Result
                    ↑
                Function B
```

Dengan demikian, function utama tidak perlu mengetahui detail setiap operasi.

---

## Higher-Order Function dan Closure

Ketika sebuah function mengembalikan nested function yang menggunakan data dari enclosing scope, kita mulai memasuki konsep **closure**.

Contoh:

```python
def multiplier(number):

    def multiply(value):
        return value * number

    return multiply
```

Kemudian:

```python
double = multiplier(2)
triple = multiplier(3)

print(double(5))
print(triple(5))
```

Output:

```text
10
15
```

`double` dan `triple` merupakan function yang dihasilkan dari function `multiplier()`.

Konsep seperti ini akan menjadi dasar penting sebelum mempelajari decorator.

---

## Higher-Order Function dan Decorator

Decorator merupakan salah satu penerapan penting dari Higher-Order Function.

Secara konsep:

```text
Function
   ↓
Decorator
   ↓
Function baru
```

Contoh sederhana:

```python
def decorator(function):

    def wrapper():
        print("Before")
        function()
        print("After")

    return wrapper
```

Decorator menerima:

```python
function
```

dan mengembalikan:

```python
wrapper
```

Dengan demikian, decorator menggunakan dua karakteristik Higher-Order Function:

```text
Menerima function
       +
Mengembalikan function
```

Konsep decorator akan dipelajari lebih mendalam pada materi tersendiri.

---

## First-Class Function vs Higher-Order Function

Kedua konsep ini sangat berhubungan, tetapi memiliki pengertian yang berbeda.

### First-Class Function

Menjelaskan kemampuan Python untuk memperlakukan function sebagai object.

Contohnya:

```python
def greet():
    return "Hello"


message = greet
```

### Higher-Order Function

Menjelaskan function yang menerima atau mengembalikan function.

Contohnya:

```python
def execute(function):
    return function()
```

Hubungannya:

```text
First-Class Function
        ↓
Function dapat diperlakukan seperti object
        ↓
Higher-Order Function
        ↓
Function menerima /
mengembalikan function
```

---

## Kapan Menggunakan Higher-Order Function?

Higher-Order Function berguna ketika kita ingin:

- Membuat function yang fleksibel.
- Mengurangi duplikasi kode.
- Memisahkan proses umum dan perilaku khusus.
- Membuat pipeline pemrosesan data.
- Membuat callback.
- Mengimplementasikan decorator.
- Membuat abstraction terhadap suatu proses.

Namun, tidak semua function harus dibuat sebagai Higher-Order Function.

Jika function biasa sudah cukup jelas dan mudah dipahami, tidak perlu membuatnya menjadi lebih kompleks.

---

## Hal yang Perlu Diperhatikan

Higher-Order Function dapat membuat kode lebih fleksibel, tetapi penggunaannya juga perlu memperhatikan keterbacaan.

Contoh sederhana:

```python
def execute(function, value):
    return function(value)
```

cukup mudah dipahami.

Namun jika function menerima banyak function lain dan memiliki banyak lapisan nested function, kode dapat menjadi lebih sulit dipahami.

Karena itu, gunakan Higher-Order Function ketika memang memberikan manfaat terhadap desain program.

---

## Kesimpulan

**Higher-Order Function** adalah function yang:

```text
1. Menerima function sebagai argument
2. Mengembalikan function sebagai hasil
3. Atau melakukan keduanya
```

Contoh menerima function:

```python
def execute(function, value):
    return function(value)
```

Contoh mengembalikan function:

```python
def create_greeting(name):

    def greeting():
        return f"Hello {name}"

    return greeting
```

Higher-Order Function merupakan konsep penting dalam Functional Programming dan menjadi dasar bagi berbagai fitur Python seperti:

```text
map()
filter()
reduce()
Lambda
Closure
Decorator
```

Setelah memahami Higher-Order Function, konsep berikutnya yang sangat baik untuk dipelajari adalah **Closure**, sebelum masuk lebih jauh ke **Decorator**.