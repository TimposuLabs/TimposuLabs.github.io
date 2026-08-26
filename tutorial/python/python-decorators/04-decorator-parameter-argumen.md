---
sidebar_position: 4
title: "Decorator Parameter & Argumen"
---

Pada materi sebelumnya, kita telah membuat decorator sederhana yang dapat membungkus sebuah function. Namun, decorator tersebut masih memiliki keterbatasan ketika function yang didekorasi membutuhkan parameter atau argument.

Agar decorator dapat digunakan pada berbagai function dengan jumlah dan jenis argument yang berbeda, kita perlu menggunakan `*args` dan `**kwargs`.

## Masalah pada Decorator Standar

Perhatikan decorator sederhana berikut:

```python
def my_decorator(func):

    def wrap_func():
        print("****************")
        func()
        print("****************")

    return wrap_func
```

Decorator tersebut bekerja dengan baik untuk function yang tidak memiliki parameter:

```python
@my_decorator
def hello():
    print("hello")


hello()
```

Namun, bagaimana jika function memiliki parameter?

```python
@my_decorator
def hello(greeting):
    print(greeting)


hello("hi")
```

Kode tersebut akan menghasilkan error:

```text
TypeError: wrap_func() takes 0 positional arguments but 1 was given
```

## Mengapa Terjadi Error?

Masalahnya terdapat pada wrapper:

```python
def wrap_func():
```

Wrapper tersebut tidak memiliki parameter.

Ketika kita memanggil:

```python
hello("hi")
```

argument `"hi"` sebenarnya diteruskan kepada wrapper karena function `hello` telah dibungkus oleh decorator.

Namun wrapper tidak dapat menerima argument tersebut.

Secara sederhana:

```text
hello("hi")
    ↓
wrapper("hi")
    ↓
wrapper tidak menerima argument
    ↓
TypeError
```

Karena itu, wrapper harus dibuat lebih fleksibel.

## Menggunakan `*args` dan `**kwargs`

Solusinya adalah menggunakan `*args` dan `**kwargs` pada wrapper.

```python
def my_decorator(func):

    def wrap_func(*args, **kwargs):
        print("****************")

        func(*args, **kwargs)

        print("****************")

    return wrap_func
```

Dengan pola tersebut, wrapper dapat menerima berbagai bentuk argument dari function yang dibungkus.

### `*args`

`*args` digunakan untuk menerima **positional arguments** dalam jumlah yang tidak ditentukan.

Contoh:

```python
def example(*args):
    print(args)


example("hello", "python", 10)
```

Output:

```text
('hello', 'python', 10)
```

### `**kwargs`

`**kwargs` digunakan untuk menerima **keyword arguments** dalam jumlah yang tidak ditentukan.

Contoh:

```python
def example(**kwargs):
    print(kwargs)


example(name="Budi", age=25)
```

Output:

```text
{'name': 'Budi', 'age': 25}
```

Dengan menggabungkan keduanya:

```python
def example(*args, **kwargs):
    print(args)
    print(kwargs)
```

function dapat menerima positional maupun keyword arguments.

## Meneruskan Argument ke Function Asli

Tidak cukup hanya membuat wrapper menerima `*args` dan `**kwargs`.

Argument tersebut juga harus diteruskan kepada function asli.

Perhatikan:

```python
func(*args, **kwargs)
```

Tanda `*` dan `**` pada bagian tersebut digunakan untuk melakukan **unpacking**.

Contoh lengkap:

```python
def my_decorator(func):

    def wrap_func(*args, **kwargs):
        print("****************")

        func(*args, **kwargs)

        print("****************")

    return wrap_func
```

Alurnya:

```text
Argument dari pemanggilan function
            ↓
       *args / **kwargs
            ↓
        wrapper
            ↓
   *args / **kwargs
            ↓
       function asli
```

Dengan demikian, decorator tidak perlu mengetahui secara spesifik berapa banyak parameter yang dimiliki function yang dibungkus.

## Contoh Decorator dengan Parameter

Sekarang kita dapat menggunakan decorator tersebut pada function yang memiliki positional dan keyword arguments.

```python
def my_decorator(func):

    def wrap_func(*args, **kwargs):
        print("****************")

        func(*args, **kwargs)

        print("****************")

    return wrap_func


@my_decorator
def hello(greeting, emoji=":)"):
    print(greeting, emoji)


hello("hi", emoji=":(")
```

Output:

```text
****************
hi :(
****************
```

Pada contoh tersebut:

```python
hello("hi", emoji=":(")
```

memiliki:

- `"hi"` sebagai positional argument.
- `emoji=":("` sebagai keyword argument.

Keduanya dapat diterima oleh wrapper melalui:

```python
*args
**kwargs
```

Kemudian diteruskan ke function asli melalui:

```python
func(*args, **kwargs)
```

## Decorator Menjadi Lebih Fleksibel

Dengan menggunakan `*args` dan `**kwargs`, decorator dapat digunakan pada berbagai function.

Contoh:

```python
@my_decorator
def greet(name):
    print(f"Hello {name}")


@my_decorator
def add(a, b):
    print(a + b)


@my_decorator
def introduce(name, age, city="Jakarta"):
    print(name, age, city)
```

Decorator yang sama dapat digunakan untuk function dengan jumlah dan jenis parameter yang berbeda.

```python
greet("Andi")

add(10, 20)

introduce("Budi", 25, city="Bandung")
```

Hal ini membuat decorator menjadi lebih **reusable**.

## Pola Umum Decorator dengan Argument

Pola decorator yang dapat menangani function dengan berbagai argument dapat ditulis seperti berikut:

```python
def decorator(func):

    def wrapper(*args, **kwargs):

        # Kode sebelum function
        print("Before")

        # Menjalankan function asli
        func(*args, **kwargs)

        # Kode setelah function
        print("After")

    return wrapper
```

Pola ini sangat umum ditemukan ketika membuat custom decorator.

## Contoh: Decorator untuk Logging

Decorator dengan `*args` dan `**kwargs` dapat digunakan untuk membuat logging sederhana.

```python
def logger(func):

    def wrapper(*args, **kwargs):
        print(f"Menjalankan function: {func.__name__}")

        func(*args, **kwargs)

        print("Function selesai")

    return wrapper


@logger
def greet(name):
    print(f"Hello {name}")


greet("Andi")
```

Output:

```text
Menjalankan function: greet
Hello Andi
Function selesai
```

Function `greet()` tetap fokus pada tugas utamanya, sedangkan decorator menangani logging.

## Mengapa Menggunakan `*args` dan `**kwargs`?

Penggunaan `*args` dan `**kwargs` membuat decorator menjadi lebih fleksibel karena decorator tidak perlu mengetahui struktur parameter function yang akan dibungkus.

Tanpa `*args` dan `**kwargs`:

```python
def wrapper():
    ...
```

Wrapper hanya dapat digunakan untuk function yang tidak membutuhkan argument.

Dengan:

```python
def wrapper(*args, **kwargs):
    ...
```

Wrapper dapat menerima berbagai positional dan keyword arguments.

## Kesimpulan

Decorator yang sederhana mungkin hanya dapat digunakan pada function tanpa parameter. Ketika function memiliki argument, wrapper harus mampu menerima dan meneruskan argument tersebut.

Solusinya adalah menggunakan:

```python
def wrapper(*args, **kwargs):
    func(*args, **kwargs)
```

`*args` digunakan untuk menerima positional arguments, sedangkan `**kwargs` digunakan untuk menerima keyword arguments.

Dengan pola tersebut, decorator menjadi lebih fleksibel dan dapat digunakan pada berbagai jenis function tanpa harus mengetahui terlebih dahulu jumlah dan jenis parameter yang dimilikinya.

Konsep ini menjadi dasar penting sebelum mempelajari **decorator yang menerima parameter sendiri**, yang memiliki pola berbeda dengan function yang didekorasi.