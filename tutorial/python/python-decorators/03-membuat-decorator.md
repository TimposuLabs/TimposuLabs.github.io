---
sidebar_position: 3
title: "Membuat Custom Decorator"
---

Setelah memahami konsep **First-Class Functions**, **Higher-Order Functions**, **Inner Function**, dan **Closure**, kita dapat mulai membuat decorator sendiri.

Decorator pada dasarnya merupakan sebuah function yang menerima function lain sebagai argument, membungkusnya dengan function tambahan, kemudian mengembalikan function pembungkus tersebut.

Secara umum, sebuah decorator memiliki beberapa tahapan:

1. Menerima function lain sebagai argument.
2. Membuat **wrapper function** untuk membungkus function tersebut.
3. Menambahkan perilaku atau fungsionalitas tambahan di dalam wrapper.
4. Mengembalikan wrapper function tanpa langsung menjalankannya.

Secara sederhana, alurnya dapat digambarkan seperti berikut:

```text
Function asli
     ↓
Decorator
     ↓
Wrapper Function
     ↓
Perilaku tambahan
     ↓
Function asli dijalankan
```

Dengan pendekatan ini, kita dapat menambahkan perilaku tertentu tanpa mengubah kode asli dari function yang diberikan.

## Membuat Decorator Sederhana

Berikut contoh custom decorator sederhana:

```python
def my_decorator(func):

    def wrap_func():
        print("****************")
        func()
        print("****************")

    return wrap_func
```

Pada contoh tersebut, `my_decorator()` menerima sebuah function melalui parameter `func`.

Kemudian di dalamnya dibuat function `wrap_func()` yang bertugas sebagai pembungkus.

Perhatikan bagian:

```python
func()
```

Kode tersebut digunakan untuk menjalankan function asli yang diberikan kepada decorator.

Sedangkan:

```python
return wrap_func
```

mengembalikan function wrapper kepada pemanggil.

## Menggunakan Decorator

Setelah decorator dibuat, kita dapat menerapkannya menggunakan syntax `@`.

```python
@my_decorator
def hello():
    print("hello")


@my_decorator
def bye():
    print("see ya later")
```

Sekarang ketika function dipanggil:

```python
hello()
bye()
```

Output:

```text
****************
hello
****************
****************
see ya later
****************
```

Perhatikan bahwa `hello()` dan `bye()` tidak memiliki kode untuk mencetak karakter `****************`.

Perilaku tersebut berasal dari decorator.

## Bagaimana Decorator Bekerja?

Ketika kita menulis:

```python
@my_decorator
def hello():
    print("hello")
```

Python secara konseptual memperlakukan kode tersebut seperti:

```python
def hello():
    print("hello")


hello = my_decorator(hello)
```

Artinya, function `hello` diberikan kepada `my_decorator()`.

Decorator kemudian mengembalikan `wrap_func`, sehingga referensi `hello` sekarang mengarah ke wrapper tersebut.

Secara sederhana:

```text
hello
  ↓
my_decorator(hello)
  ↓
wrap_func
  ↓
hello()
```

Ketika `hello()` dipanggil, sebenarnya function wrapper yang dijalankan.

## Menggunakan Decorator Tanpa Syntax `@`

Decorator juga dapat digunakan tanpa simbol `@`.

Contohnya:

```python
def my_decorator(func):

    def wrap_func():
        print("****************")
        func()
        print("****************")

    return wrap_func


def hello():
    print("hello")


hello_wrapped = my_decorator(hello)

hello_wrapped()
```

Hasilnya:

```text
****************
hello
****************
```

Cara tersebut membantu kita memahami apa yang sebenarnya terjadi ketika menggunakan syntax `@`.

## Syntactic Sugar

Syntax:

```python
@my_decorator
def hello():
    print("hello")
```

merupakan bentuk penulisan yang lebih sederhana atau dikenal sebagai **syntactic sugar**.

Secara konsep setara dengan:

```python
def hello():
    print("hello")


hello = my_decorator(hello)
```

Dengan demikian, simbol `@` bukanlah mekanisme terpisah. Syntax tersebut merupakan cara yang lebih praktis untuk menerapkan decorator.

## Memanggil Decorator Secara Langsung

Karena `my_decorator(hello)` mengembalikan sebuah function, hasilnya dapat langsung dipanggil.

Contohnya:

```python
my_decorator(hello)()
```

Urutannya dapat dipahami sebagai:

```text
my_decorator(hello)
        ↓
menghasilkan wrapper
        ↓
       ()
        ↓
menjalankan wrapper
```

Namun, dalam program sebenarnya, syntax `@` biasanya lebih mudah dibaca:

```python
@my_decorator
def hello():
    print("hello")
```

## Menambahkan Perilaku Sebelum dan Sesudah Function

Salah satu manfaat decorator adalah kita dapat menempatkan kode tambahan sebelum dan sesudah function asli dijalankan.

```python
def my_decorator(func):

    def wrap_func():
        print("Sebelum function dijalankan")

        func()

        print("Sesudah function dijalankan")

    return wrap_func


@my_decorator
def hello():
    print("Hello Python")


hello()
```

Output:

```text
Sebelum function dijalankan
Hello Python
Sesudah function dijalankan
```

Pada contoh tersebut, function `hello()` tetap hanya bertanggung jawab untuk menampilkan `"Hello Python"`.

Perilaku tambahan ditangani oleh decorator.

## Keuntungan Menggunakan Decorator

### Reusability

Decorator dapat digunakan pada banyak function.

```python
@my_decorator
def hello():
    print("hello")


@my_decorator
def bye():
    print("bye")


@my_decorator
def welcome():
    print("welcome")
```

Kita tidak perlu menulis ulang kode tambahan pada setiap function.

### Separation of Concerns

Decorator membantu memisahkan **logika utama function** dari **perilaku tambahan**.

Misalnya sebuah function bertugas menghitung data, sedangkan decorator bertugas mencatat aktivitas function tersebut.

```text
Function utama
    ↓
Fokus pada tugas utama

Decorator
    ↓
Menangani perilaku tambahan
```

Dengan demikian, kode dapat menjadi lebih terorganisasi dan mudah digunakan kembali.

## Kesimpulan

Custom decorator merupakan function yang menerima function lain, membungkusnya dengan wrapper, menambahkan perilaku tertentu, kemudian mengembalikan wrapper tersebut.

Pola dasarnya:

```python
def decorator(func):

    def wrapper():
        # Perilaku tambahan
        func()
        # Perilaku tambahan

    return wrapper
```

Decorator dapat diterapkan menggunakan syntax:

```python
@decorator
def function():
    ...
```

atau secara eksplisit:

```python
function = decorator(function)
```

Memahami mekanisme ini penting sebelum melanjutkan ke **decorator dengan argument**, `*args`, `**kwargs`, dan `functools.wraps`.