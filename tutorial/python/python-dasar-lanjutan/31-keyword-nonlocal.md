---
sidebar_position: 31
title: "Keyword nonlocal"
---

Keyword `nonlocal` digunakan pada **nested function** untuk mengakses dan mengubah variabel yang berada pada **Enclosing Scope**, yaitu scope function yang membungkus function tersebut.

Dengan kata lain, `nonlocal` memungkinkan sebuah function di dalam function untuk mengubah variabel milik function induknya.

Konsep ini berkaitan erat dengan aturan pencarian scope **LEGB**:

```text
L → Local
E → Enclosing
G → Global
B → Built-in
```

---

## Enclosing Scope

Sebelum memahami `nonlocal`, kita perlu memahami **Enclosing Scope**.

Enclosing Scope adalah scope milik function yang membungkus nested function.

Contoh:

```python
def outer():
    x = "local"

    def inner():
        print(x)

    inner()

outer()
```

Output:

```text
local
```

Function `inner()` tidak memiliki variabel `x` sendiri.

Python kemudian mencari ke scope yang membungkusnya, yaitu `outer()`.

Di sana Python menemukan:

```python
x = "local"
```

Sehingga nilai tersebut dapat digunakan oleh `inner()`.

---

## Masalah ketika Mengubah Variabel Enclosing

Sekarang perhatikan contoh berikut:

```python
def outer():
    x = "local"

    def inner():
        x = "nonlocal"
        print(x)

    inner()
    print(x)

outer()
```

Output:

```text
nonlocal
local
```

Mengapa nilai `x` pada `outer()` tetap `"local"`?

Karena:

```python
x = "nonlocal"
```

di dalam `inner()` membuat **variabel lokal baru** untuk `inner()`.

Variabel tersebut berbeda dengan:

```python
x = "local"
```

yang berada di `outer()`.

Secara sederhana:

```text
outer()
└── x = "local"
    │
    └── inner()
        └── x = "nonlocal"
```

Terdapat dua variabel `x` yang berbeda.

---

## Menggunakan `nonlocal`

Jika kita ingin mengubah variabel `x` milik `outer()`, gunakan keyword `nonlocal`.

```python
def outer():
    x = "local"

    def inner():
        nonlocal x
        x = "nonlocal"
        print("inner:", x)

    inner()
    print("outer:", x)

outer()
```

Output:

```text
inner: nonlocal
outer: nonlocal
```

Baris:

```python
nonlocal x
```

memberitahu Python:

> Gunakan variabel `x` yang berada pada Enclosing Scope, bukan membuat variabel lokal baru.

---

## Perbedaan Tanpa `nonlocal`

Tanpa `nonlocal`:

```python
def outer():
    x = "local"

    def inner():
        x = "nonlocal"

    inner()
    print(x)

outer()
```

Output:

```text
local
```

Assignment:

```python
x = "nonlocal"
```

membuat variabel lokal baru di dalam `inner()`.

---

## Perbedaan dengan `nonlocal`

Dengan `nonlocal`:

```python
def outer():
    x = "local"

    def inner():
        nonlocal x
        x = "nonlocal"

    inner()
    print(x)

outer()
```

Output:

```text
nonlocal
```

Sekarang `inner()` tidak membuat variabel `x` baru.

`inner()` menggunakan dan mengubah `x` yang dimiliki oleh `outer()`.

---

## Cara Kerja `nonlocal`

Perhatikan struktur berikut:

```text
Global Scope
│
└── outer()
    │
    ├── x = "local"
    │
    └── inner()
        │
        └── nonlocal x
```

Ketika Python menemukan:

```python
nonlocal x
```

Python akan mencari `x` pada **Enclosing Scope**.

Python tidak mencari `x` pada Global Scope.

Inilah perbedaan penting antara `nonlocal` dan `global`.

---

## `nonlocal` vs `global`

### `global`

Digunakan untuk mengakses atau mengubah variabel pada **Global Scope**.

```python
x = 10

def example():
    global x
    x = 20

example()

print(x)
```

Output:

```text
20
```

### `nonlocal`

Digunakan untuk mengakses atau mengubah variabel pada **Enclosing Scope**.

```python
def outer():
    x = 10

    def inner():
        nonlocal x
        x = 20

    inner()
    print(x)

outer()
```

Output:

```text
20
```

Perbedaannya:

```text
global
→ mengarah ke Global Scope

nonlocal
→ mengarah ke Enclosing Scope
```

---

## `nonlocal` Hanya untuk Nested Function

Keyword `nonlocal` digunakan ketika terdapat enclosing function.

Contoh yang benar:

```python
def outer():
    x = 10

    def inner():
        nonlocal x
        x = 20

    inner()

outer()
```

Sedangkan penggunaan `nonlocal` tanpa enclosing scope yang sesuai akan menghasilkan error.

Contoh:

```python
def example():
    nonlocal x
```

Kode tersebut tidak valid karena tidak terdapat function pembungkus yang memiliki variabel `x`.

---

## Contoh Counter dengan `nonlocal`

Salah satu contoh penggunaan `nonlocal` adalah membuat counter menggunakan nested function.

```python
def counter():
    count = 0

    def increment():
        nonlocal count
        count += 1
        return count

    return increment
```

Kita dapat membuat counter:

```python
my_counter = counter()

print(my_counter())
print(my_counter())
print(my_counter())
```

Output:

```text
1
2
3
```

Variabel:

```python
count = 0
```

berada di `counter()`.

Function `increment()` menggunakan:

```python
nonlocal count
```

untuk mengubah variabel tersebut.

---

## Mengapa Counter Tetap Menyimpan Nilai?

Ketika:

```python
my_counter = counter()
```

function `counter()` membuat variabel:

```python
count = 0
```

dan mengembalikan function `increment`.

Function `increment()` tetap dapat mengakses `count` milik `counter()`.

Kemudian setiap kali:

```python
my_counter()
```

dipanggil:

```python
count += 1
```

akan mengubah nilai `count`.

Konsep ini berkaitan dengan **closure**, yang akan menjadi penting ketika mempelajari konsep function tingkat lanjut.

---

## LEGB dan `nonlocal`

`nonlocal` berhubungan langsung dengan bagian **E — Enclosing** pada LEGB.

Aturan LEGB:

```text
L → Local
E → Enclosing
G → Global
B → Built-in
```

Contoh:

```python
def outer():
    x = 10

    def inner():
        print(x)

    inner()

outer()
```

Saat mencari `x` di `inner()`:

```text
Local
↓
tidak ditemukan

Enclosing
↓
x = 10 ditemukan
```

Jika kita ingin **mengubah** nilai `x` tersebut, gunakan:

```python
nonlocal x
```

---

## Kapan Menggunakan `nonlocal`?

`nonlocal` berguna terutama ketika:

- Menggunakan nested function.
- Function bagian dalam perlu mengubah state function induknya.
- Membuat closure.
- Membuat pola seperti counter atau state sederhana yang tetap tersimpan.

Contoh:

```python
def counter():
    count = 0

    def increment():
        nonlocal count
        count += 1
        return count

    return increment
```

---

## Hindari Penggunaan Berlebihan

Walaupun `nonlocal` berguna, penggunaannya secara berlebihan dapat membuat alur program menjadi lebih sulit dipahami.

Contoh:

```python
def outer():
    total = 0

    def add():
        nonlocal total
        total += 10

    def subtract():
        nonlocal total
        total -= 5

    add()
    subtract()

    return total
```

Beberapa nested function dapat mengubah state yang sama.

Pada program yang lebih besar, kondisi seperti ini dapat membuat kita kesulitan mengetahui function mana yang mengubah suatu nilai.

Karena itu, gunakan `nonlocal` ketika memang sesuai dengan struktur program.

---

## Ringkasan

| Keyword | Scope yang Diakses | Penggunaan |
|---|---|---|
| `global` | Global Scope | Mengubah variabel global |
| `nonlocal` | Enclosing Scope | Mengubah variabel function induk |
| Tidak menggunakan keduanya | Local Scope | Assignment membuat variabel lokal |

Contoh `global`:

```python
total = 0

def update():
    global total
    total += 1
```

Contoh `nonlocal`:

```python
def outer():
    total = 0

    def update():
        nonlocal total
        total += 1
```

---

## Kesimpulan

Keyword `nonlocal` digunakan pada **nested function** untuk mengakses dan mengubah variabel yang berada pada **Enclosing Scope**.

Tanpa `nonlocal`:

```python
x = "nonlocal"
```

akan membuat variabel lokal baru.

Dengan `nonlocal`:

```python
nonlocal x
x = "nonlocal"
```

Python akan mengubah variabel `x` milik function induknya.

Konsep ini merupakan bagian penting dari pemahaman **LEGB**, **nested function**, dan nantinya **closure**.