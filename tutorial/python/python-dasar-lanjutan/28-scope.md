---
sidebar_position: 28
title: "Scope"
---

**Scope** adalah cakupan tempat sebuah variabel dapat diakses di dalam program.

Dengan memahami scope, kita dapat mengetahui:

- Di mana sebuah variabel dapat digunakan.
- Di mana sebuah variabel tidak dapat digunakan.
- Mengapa suatu variabel dapat diakses di satu bagian program tetapi menghasilkan `NameError` di bagian lainnya.

Contoh:

```python
def some_func():
    total = 100

print(total)
```

Kode tersebut akan menghasilkan error karena `total` hanya tersedia di dalam scope function `some_func()`.

---

## Functional Scope

Ketika kita membuat sebuah function menggunakan `def`, Python membuat **scope lokal baru**.

Variabel yang dibuat di dalam function hanya dapat digunakan di dalam function tersebut.

```python
def some_func():
    total = 100

    print(total)

some_func()
```

Output:

```text
100
```

Namun, variabel tersebut tidak dapat diakses dari luar function.

```python
def some_func():
    total = 100

some_func()

print(total)
```

Output akan menghasilkan error:

```text
NameError: name 'total' is not defined
```

Hal ini terjadi karena `total` berada di dalam local scope function.

---

## Local Variable

Variabel yang dibuat di dalam function disebut **local variable**.

Contoh:

```python
def calculate():
    number = 10
    result = number * 2

    print(result)

calculate()
```

Variabel:

```text
number
result
```

hanya tersedia di dalam function `calculate()`.

Kita tidak dapat mengaksesnya secara langsung dari luar function:

```python
print(number)
```

Kode tersebut akan menghasilkan `NameError`.

---

## Global Scope

Variabel yang dibuat di luar function berada pada **global scope**.

Contoh:

```python
total = 100

def some_func():
    print(total)

some_func()
```

Output:

```text
100
```

Function dapat membaca variabel `total` karena variabel tersebut berada di global scope.

---

## Global Variable

Variabel yang dibuat pada tingkat paling atas program disebut **global variable**.

Contoh:

```python
name = "Budi"

def say_hello():
    print(name)

say_hello()
```

Output:

```text
Budi
```

Function `say_hello()` dapat membaca `name` karena `name` berada pada global scope.

---

## Local Scope dan Global Scope

Perhatikan contoh berikut:

```python
name = "Budi"

def say_hello():
    name = "Andi"
    print(name)

say_hello()

print(name)
```

Output:

```text
Andi
Budi
```

Mengapa?

Karena terdapat dua variabel `name` yang berbeda scope.

```text
Global scope
name = "Budi"
```

dan:

```text
Local scope
name = "Andi"
```

Variabel lokal `name` hanya berlaku di dalam function.

---

## Scope pada `if`

Python memiliki karakteristik yang berbeda dibandingkan beberapa bahasa pemrograman lain.

Blok `if` **tidak membuat local scope baru**.

Contoh:

```python
if True:
    x = 10

print(x)
```

Output:

```text
10
```

Variabel `x` tetap dapat diakses setelah blok `if` selesai.

---

## Scope pada `for`

Hal yang sama berlaku pada `for`.

```python
for item in [1, 2, 3]:
    value = item

print(value)
```

Output:

```text
3
```

Blok `for` tidak membuat function scope baru.

Karena itu, variabel `value` masih berada pada scope yang sama setelah loop selesai.

---

## Scope pada `while`

Blok `while` juga tidak membuat scope baru.

```python
while False:
    value = 100
```

Namun pada contoh tersebut `value` tidak pernah dibuat karena kondisi `while` bernilai `False`.

Jika variabel berhasil dibuat:

```python
value = 0

while value < 1:
    value = 100

print(value)
```

Output:

```text
100
```

Variabel tersebut tetap berada pada scope yang sama.

---

## Function Membuat Scope Baru

Perbedaan pentingnya dapat dilihat pada contoh berikut.

### Menggunakan `if`

```python
if True:
    x = 10

print(x)
```

Output:

```text
10
```

### Menggunakan function

```python
def example():
    x = 10

example()

print(x)
```

Kode kedua menghasilkan:

```text
NameError: name 'x' is not defined
```

Karena function membuat local scope baru.

---

## Scope Bersarang

Sebuah function dapat dibuat di dalam function lainnya.

Kondisi tersebut menghasilkan scope yang bersarang.

```python
def outer():
    x = 10

    def inner():
        print(x)

    inner()

outer()
```

Output:

```text
10
```

Function `inner()` dapat membaca variabel `x` yang berada pada scope function `outer()`.

Hal ini berhubungan dengan konsep **nested scope** dan akan menjadi penting ketika mempelajari **closure** dan konsep lanjutan lainnya.

---

## Scope dan `NameError`

Salah satu error yang sering muncul ketika mempelajari scope adalah:

```text
NameError
```

Contoh:

```python
def calculate():
    result = 100

calculate()

print(result)
```

Python tidak menemukan `result` pada scope tempat `print(result)` dijalankan.

Akibatnya:

```text
NameError: name 'result' is not defined
```

Ketika menemukan `NameError`, salah satu hal yang perlu diperiksa adalah apakah variabel tersebut memang tersedia pada scope tersebut.

---

## Konsep Utama Scope

Secara sederhana, Python memiliki beberapa tingkatan scope yang penting untuk dipahami.

```text
Global Scope
    ↓
Function Scope
    ↓
Nested Function Scope
```

Sedangkan struktur seperti:

```text
if
for
while
```

tidak secara otomatis membuat scope baru.

---

## Contoh Perbandingan

```python
x = 100

if True:
    y = 200

def example():
    z = 300

print(x)
print(y)
```

Output:

```text
100
200
```

Namun:

```python
print(z)
```

akan menghasilkan:

```text
NameError
```

karena `z` hanya tersedia di dalam function `example()`.

---

## Poin Penting

Beberapa hal yang perlu diingat:

1. **Scope menentukan di mana variabel dapat diakses.**
2. Function membuat local scope baru.
3. Variabel yang dibuat di dalam function biasanya hanya dapat digunakan di dalam function tersebut.
4. Variabel yang dibuat di luar function berada pada global scope.
5. Function dapat membaca variabel yang berada pada global scope.
6. Blok `if` tidak membuat scope baru.
7. Blok `for` tidak membuat scope baru.
8. Blok `while` tidak membuat scope baru.
9. Variabel yang tidak tersedia pada scope tertentu dapat menyebabkan `NameError`.

---

## Kesimpulan

Scope merupakan konsep penting dalam Python karena menentukan **jangkauan dan aksesibilitas sebuah variabel**.

Perbedaan paling penting yang perlu diingat adalah:

```text
Function
→ membuat scope baru
```

sedangkan:

```text
if
for
while
→ tidak membuat scope baru
```

Memahami scope akan menjadi dasar penting untuk mempelajari konsep Python berikutnya seperti **global dan nonlocal**, **nested function**, **closure**, serta **decorator**.