---
sidebar_position: 4
title: "First-Class Functions"
---

**First-Class Function** adalah konsep dalam Python yang memungkinkan sebuah function diperlakukan seperti **nilai atau object lainnya**.

Artinya, function dapat:

- Disimpan ke dalam variable.
- Diberikan sebagai argument kepada function lain.
- Dikembalikan sebagai return value dari sebuah function.
- Disimpan di dalam struktur data seperti list atau dictionary.

Konsep ini sangat penting dalam **Functional Programming** karena menjadi dasar untuk memahami **Higher-Order Function**, `map()`, `filter()`, decorator, dan beberapa konsep lainnya.

---

## Function sebagai Object

Di Python, function merupakan object.

Artinya, ketika kita membuat sebuah function, function tersebut dapat direferensikan oleh sebuah variable.

Contoh:

```python
def greet():
    return "Hello"


hello = greet

print(hello())
```

Output:

```text
Hello
```

Pada contoh tersebut:

```python
hello = greet
```

tidak menjalankan function `greet()`.

Kita hanya membuat `hello` merujuk pada function yang sama.

Secara konsep:

```text
greet
  │
  ↓
Function Object
  ↑
  │
hello
```

Keduanya merujuk pada function yang sama.

---

## Perbedaan `greet` dan `greet()`

Perhatikan perbedaan berikut:

```python
def greet():
    return "Hello"
```

Jika kita menulis:

```python
greet
```

kita sedang merujuk pada **function object**.

Sedangkan:

```python
greet()
```

berarti kita **memanggil atau mengeksekusi function** tersebut.

Contoh:

```python
def greet():
    return "Hello"


print(greet)
print(greet())
```

Secara konsep:

```text
greet
  ↓
Function object


greet()
  ↓
Menjalankan function
  ↓
"Hello"
```

Perbedaan ini sangat penting ketika mempelajari Functional Programming.

---

## Menyimpan Function dalam Variable

Karena function merupakan object, kita dapat menyimpannya ke dalam variable.

Contoh:

```python
def say_hello():
    return "Hello"


message = say_hello

print(message())
```

Output:

```text
Hello
```

Variable `message` sekarang merujuk pada function `say_hello`.

Kita bahkan dapat menggunakan nama variable tersebut untuk memanggil function:

```python
message()
```

---

## Memberikan Function sebagai Argument

Salah satu kemampuan penting First-Class Function adalah function dapat diberikan sebagai argument kepada function lain.

Contoh:

```python
def greet():
    return "Hello"


def execute(function):
    return function()


print(execute(greet))
```

Output:

```text
Hello
```

Pada:

```python
execute(greet)
```

function `greet` diberikan sebagai argument kepada `execute`.

Perhatikan bahwa kita menggunakan:

```python
greet
```

bukan:

```python
greet()
```

Karena kita ingin memberikan **function object**, bukan hasil dari pemanggilan function.

---

## Function yang Menerima Function

Function yang menerima function sebagai argument merupakan salah satu dasar dari **Higher-Order Function**.

Contoh:

```python
def greet():
    return "Hello"


def execute(function):
    return function()


result = execute(greet)

print(result)
```

Alurnya:

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

Pada tahap ini kita mulai melihat bagaimana function dapat digunakan sebagai data.

---

## Function dengan Argument

First-Class Function juga dapat digunakan bersama function yang memiliki parameter.

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
      10
       ↓
      20
```

Function `execute()` tidak perlu mengetahui secara detail bagaimana `multiply_by_two()` bekerja.

Ia hanya menjalankan function yang diberikan.

---

## Mengembalikan Function dari Function

First-Class Function juga memungkinkan sebuah function mengembalikan function lain.

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

Pada contoh tersebut:

```python
create_greeting()
```

menghasilkan sebuah function.

Secara konsep:

```text
create_greeting()
       ↓
Function baru
       ↓
    hello
       ↓
    hello()
       ↓
    "Hello"
```

Kemampuan ini akan menjadi sangat penting ketika mempelajari **Higher-Order Function** dan **Decorator**.

---

## Function dalam List

Karena function merupakan object, kita juga dapat menyimpannya di dalam list.

Contoh:

```python
def add(a, b):
    return a + b


def subtract(a, b):
    return a - b


def multiply(a, b):
    return a * b


operations = [
    add,
    subtract,
    multiply
]
```

Kita kemudian dapat menjalankan function berdasarkan posisi:

```python
print(operations[0](10, 5))
print(operations[1](10, 5))
print(operations[2](10, 5))
```

Output:

```text
15
5
50
```

List tersebut berisi beberapa function:

```text
operations
   │
   ├── add
   ├── subtract
   └── multiply
```

---

## Function dalam Dictionary

Function juga dapat disimpan dalam dictionary.

Contoh:

```python
def add(a, b):
    return a + b


def subtract(a, b):
    return a - b


operations = {
    "add": add,
    "subtract": subtract
}
```

Kita dapat memilih function berdasarkan key:

```python
print(operations["add"](10, 5))
print(operations["subtract"](10, 5))
```

Output:

```text
15
5
```

Pendekatan seperti ini dapat berguna ketika program memiliki beberapa operasi yang dapat dipilih secara dinamis.

---

## Function sebagai Data

Dari berbagai contoh sebelumnya, kita dapat melihat bahwa function dapat diperlakukan seperti data.

Misalnya:

```text
Function
   │
   ├── disimpan dalam variable
   ├── diberikan sebagai argument
   ├── dikembalikan dari function
   ├── disimpan dalam list
   └── disimpan dalam dictionary
```

Inilah inti dari konsep **First-Class Function**.

---

## First-Class Function dan `map()`

Konsep First-Class Function menjadi dasar dari penggunaan `map()`.

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

Pada:

```python
map(
    multiply_by_two,
    numbers
)
```

function:

```python
multiply_by_two
```

diberikan sebagai argument kepada `map()`.

Hal ini dapat dilakukan karena function merupakan First-Class Object di Python.

---

## First-Class Function dan `filter()`

Konsep yang sama digunakan oleh `filter()`.

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

diberikan sebagai argument kepada:

```python
filter()
```

---

## First-Class Function dan Lambda

First-Class Function juga menjadi alasan kita dapat memberikan lambda sebagai argument.

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

Lambda tersebut merupakan function object yang diberikan kepada `map()`.

---

## First-Class Function vs Higher-Order Function

Kedua konsep ini berhubungan erat, tetapi bukan hal yang sama.

### First-Class Function

First-Class Function adalah **kemampuan bahasa** untuk memperlakukan function seperti object atau nilai lainnya.

Contohnya:

```python
def greet():
    return "Hello"


message = greet
```

atau:

```python
operations = [greet]
```

### Higher-Order Function

Higher-Order Function adalah function yang:

- Menerima function sebagai argument, atau
- Mengembalikan function sebagai hasil.

Contohnya:

```python
def execute(function):
    return function()
```

Karena `execute()` menerima function, maka `execute()` merupakan Higher-Order Function.

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

## Mengapa First-Class Function Penting?

Konsep First-Class Function memungkinkan kita membuat kode yang lebih fleksibel.

Misalnya daripada membuat banyak function dengan struktur yang hampir sama, kita dapat membuat satu function yang menerima function lain sebagai parameter.

Secara konsep:

```text
Data
  ↓
Function A ──┐
Function B ──┼──→ Function utama
Function C ──┘
```

Function utama dapat menjalankan function yang diberikan kepadanya.

Pendekatan ini membantu mengurangi duplikasi dan meningkatkan penggunaan kembali kode.

---

## First-Class Function dan Reusability

Misalnya kita memiliki function:

```python
def execute(function, value):
    return function(value)
```

Function tersebut dapat digunakan dengan berbagai function lain:

```python
def double(number):
    return number * 2


def square(number):
    return number ** 2


print(execute(double, 5))
print(execute(square, 5))
```

Output:

```text
10
25
```

`execute()` tidak perlu diubah.

Kita hanya memberikan function yang berbeda.

---

## First-Class Function dan Decorator

Konsep First-Class Function juga merupakan salah satu fondasi **Decorator**.

Decorator membutuhkan kemampuan untuk:

```text
Function
   ↓
Diberikan ke function lain
   ↓
Diproses
   ↓
Function baru dikembalikan
```

Contoh konsep sederhananya:

```python
def decorator(function):

    def wrapper():
        print("Before")
        function()
        print("After")

    return wrapper
```

Pada contoh tersebut:

```python
function
```

diterima sebagai argument.

Kemudian:

```python
wrapper
```

dikembalikan sebagai function baru.

Konsep ini dapat dipahami dengan lebih mudah setelah memahami First-Class Function dan Higher-Order Function.

---

## Kesimpulan

**First-Class Function** berarti Python memperlakukan function sebagai object atau nilai yang dapat digunakan seperti data lainnya.

Function dapat:

```text
1. Disimpan dalam variable
2. Diberikan sebagai argument
3. Dikembalikan dari function
4. Disimpan dalam list
5. Disimpan dalam dictionary
```

Contoh sederhana:

```python
def greet():
    return "Hello"


message = greet

print(message())
```

Function `greet` tidak hanya dapat dipanggil, tetapi juga dapat disimpan dan dipindahkan sebagai sebuah nilai.

Konsep ini menjadi fondasi penting untuk memahami:

```text
First-Class Functions
        ↓
Higher-Order Functions
        ↓
      map()
     filter()
     reduce()
        ↓
    Decorator
```

Setelah memahami First-Class Function, langkah berikutnya yang sangat penting adalah mempelajari **Higher-Order Function**, yaitu function yang menerima function sebagai argument atau mengembalikan function sebagai hasil.