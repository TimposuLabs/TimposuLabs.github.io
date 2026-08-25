---
sidebar_position: 2
title: "Higher-Order Functions"
---

**Higher-Order Function (HOF)** adalah fungsi yang memiliki kemampuan untuk bekerja dengan fungsi lain sebagai bagian dari operasinya.

Sebuah fungsi disebut **Higher-Order Function** jika memenuhi salah satu atau kedua kondisi berikut:

1. Menerima fungsi lain sebagai argument.
2. Mengembalikan fungsi lain sebagai return value.

Konsep ini merupakan bagian penting dari **Functional Programming** dan menjadi salah satu fondasi untuk memahami **Decorator** di Python.

:::info
Konsep **Higher-Order Functions (HOF)** telah dibahas sebelumnya pada materi **[Functional Programming](/python/python-functional-programming/higher-order-functions)**. Pada materi tersebut, kita telah mempelajari bahwa sebuah function dapat menerima function lain sebagai argument maupun mengembalikan function sebagai return value.

Pemahaman tersebut menjadi salah satu dasar penting dalam mempelajari **Decorator**. Oleh karena itu, pada bagian ini kita tidak akan membahas kembali Higher-Order Functions secara mendalam, tetapi akan menggunakannya sebagai dasar untuk memahami bagaimana decorator bekerja.
:::

## Menerima Fungsi sebagai Argument

Sebuah fungsi dapat menerima fungsi lain sebagai parameter.

Contoh:

```python
def greet(func):
    func()


def still_here():
    print("still here!")


greet(still_here)
```

Output:

```text
still here!
```

Pada contoh tersebut, `greet()` menerima fungsi `still_here` sebagai argument.

Perhatikan:

```python
greet(still_here)
```

bukan:

```python
greet(still_here())
```

`still_here` berarti kita memberikan **referensi fungsi**, sedangkan `still_here()` berarti kita menjalankan fungsi tersebut.

Di dalam `greet()`, fungsi yang diterima kemudian dipanggil:

```python
func()
```

Alurnya:

```text
still_here
     ↓
dikirim sebagai argument
     ↓
greet()
     ↓
func()
     ↓
"still here!"
```

## Mengembalikan Fungsi Lain

Higher Order Function juga dapat mengembalikan fungsi sebagai return value.

Contoh:

```python
def greet2():
    def func():
        return 5

    return func


my_func = greet2()

print(my_func())
```

Output:

```text
5
```

Pada contoh tersebut, `greet2()` tidak langsung mengembalikan angka `5`.

Sebaliknya, `greet2()` mengembalikan fungsi:

```python
return func
```

Kemudian hasilnya disimpan ke dalam variabel:

```python
my_func = greet2()
```

Sekarang `my_func` merupakan referensi terhadap fungsi `func`.

Karena itu kita dapat menjalankannya:

```python
my_func()
```

## Memahami Perbedaan `return func` dan `return func()`

Perbedaan ini penting ketika mempelajari Higher Order Function.

### `return func`

```python
def greet():
    def hello():
        return "Hello"

    return hello
```

`return hello` mengembalikan **fungsi**.

Contoh:

```python
result = greet()

print(result)
```

`result` berisi referensi terhadap fungsi `hello`.

Untuk menjalankan fungsi tersebut:

```python
print(result())
```

### `return func()`

Sedangkan:

```python
def greet():
    def hello():
        return "Hello"

    return hello()
```

`return hello()` langsung menjalankan fungsi `hello` dan mengembalikan hasilnya.

Jadi:

```text
return func
    ↓
mengembalikan fungsi

return func()
    ↓
menjalankan fungsi
    ↓
mengembalikan hasil fungsi
```

Perbedaan ini sangat penting karena decorator bekerja dengan konsep pengembalian fungsi.

## Higher Order Function pada Built-in Python

Python memiliki beberapa fungsi yang dapat menerima fungsi lain sebagai argument.

Beberapa contoh yang telah dipelajari adalah:

- `map()`
- `filter()`
- `reduce()`

Fungsi-fungsi tersebut termasuk contoh **Higher Order Function** karena menerima fungsi sebagai argument.

## `map()` sebagai Higher Order Function

Contoh:

```python
numbers = [1, 2, 3]


def multiply_by_two(number):
    return number * 2


result = map(multiply_by_two, numbers)

print(list(result))
```

Output:

```text
[2, 4, 6]
```

`map()` menerima:

```python
multiply_by_two
```

sebagai fungsi yang akan diterapkan pada setiap elemen.

Secara sederhana:

```text
numbers
   ↓
map()
   ↓
multiply_by_two()
   ↓
hasil
```

## `filter()` sebagai Higher Order Function

`filter()` juga menerima fungsi sebagai argument.

Contoh:

```python
numbers = [1, 2, 3, 4, 5]


def is_even(number):
    return number % 2 == 0


result = filter(is_even, numbers)

print(list(result))
```

Output:

```text
[2, 4]
```

Fungsi `is_even` digunakan oleh `filter()` untuk menentukan elemen mana yang dipertahankan.

Jika fungsi menghasilkan `True`, elemen akan dipertahankan.

Jika menghasilkan `False`, elemen akan diabaikan.

## `reduce()` sebagai Higher Order Function

`reduce()` juga menerima fungsi sebagai argument.

Contoh:

```python
from functools import reduce


numbers = [1, 2, 3, 4]


def add(acc, number):
    return acc + number


result = reduce(add, numbers, 0)

print(result)
```

Output:

```text
10
```

Fungsi `add` diberikan kepada `reduce()` untuk menentukan bagaimana setiap elemen digabungkan.

## Hubungan Higher Order Function dengan Decorator

Higher Order Function merupakan salah satu konsep penting untuk memahami decorator.

Decorator pada dasarnya memanfaatkan kemampuan fungsi untuk:

```text
Menerima fungsi
      ↓
Memproses atau membungkus fungsi
      ↓
Mengembalikan fungsi
```

Contoh konsep sederhananya:

```text
function
   ↓
diberikan kepada decorator
   ↓
decorator membuat wrapper
   ↓
wrapper dikembalikan
```

Karena itu, sebelum mempelajari decorator, penting untuk memahami dua kemampuan utama Higher Order Function:

```text
1. Function sebagai argument
2. Function sebagai return value
```

## Higher Order Function dan First-Class Functions

Higher Order Function berkaitan erat dengan konsep **First-Class Functions**.

**First-Class Functions** menjelaskan bahwa fungsi di Python dapat diperlakukan seperti object atau nilai biasa.

Fungsi dapat:

- Disimpan dalam variabel.
- Dikirim sebagai argument.
- Dikembalikan dari fungsi lain.

Sedangkan **Higher Order Function** adalah fungsi yang memanfaatkan kemampuan tersebut dengan menerima atau mengembalikan fungsi.

Hubungannya dapat digambarkan:

```text
First-Class Function
        ↓
Fungsi dapat diperlakukan sebagai object
        ↓
Fungsi dapat dikirim / dikembalikan
        ↓
Higher Order Function
        ↓
Decorator
```

## Contoh Gabungan

Berikut contoh sederhana yang menggabungkan kedua karakteristik Higher Order Function:

```python
def multiply_by_two(number):
    return number * 2


def process(function, value):
    return function(value)


result = process(multiply_by_two, 10)

print(result)
```

Output:

```text
20
```

Pada contoh tersebut:

```python
process(multiply_by_two, 10)
```

`process()` menerima fungsi `multiply_by_two` sebagai argument.

Dengan demikian, `process()` merupakan Higher Order Function.

## Kesimpulan

Higher Order Function adalah fungsi yang:

- Menerima fungsi lain sebagai argument.
- Mengembalikan fungsi lain sebagai return value.
- Atau melakukan keduanya.

Contoh sederhana:

```python
def process(function, value):
    return function(value)
```

Konsep ini menjadi dasar penting dalam Functional Programming dan digunakan oleh berbagai fungsi Python seperti:

- `map()`
- `filter()`
- `reduce()`

Higher Order Function juga merupakan salah satu fondasi utama untuk memahami **Decorator**, karena decorator bekerja dengan menerima sebuah fungsi, memberikan perilaku tambahan, kemudian mengembalikan fungsi lain.