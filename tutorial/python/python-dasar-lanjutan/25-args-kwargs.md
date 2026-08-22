---
sidebar_position: 25
title: "Args & Kwargs"
---

## `*args` dan `**kwargs` di Python

Ketika membuat function, terkadang kita tidak mengetahui berapa banyak argument yang akan diberikan oleh pengguna function tersebut.

Python menyediakan dua sintaks khusus untuk menangani kondisi tersebut:

- `*args` untuk menerima banyak **positional arguments**.
- `**kwargs` untuk menerima banyak **keyword arguments**.

Keduanya membuat function menjadi lebih fleksibel karena jumlah argument yang diterima tidak harus ditentukan satu per satu saat function dibuat.

---

## `*args`

`*args` digunakan ketika sebuah function ingin menerima **banyak positional arguments**.

Contoh:

```python
def super_func(*args):
    print(args)
```

Function tersebut dapat dipanggil dengan jumlah argument yang berbeda:

```python
super_func(1)
super_func(1, 2)
super_func(1, 2, 3, 4, 5)
```

Python akan mengumpulkan seluruh positional arguments tersebut ke dalam satu variabel bernama `args`.

---

## `args` Berbentuk Tuple

Argument yang ditangkap oleh `*args` akan disimpan dalam bentuk **tuple**.

Contoh:

```python
def super_func(*args):
    print(args)

super_func(1, 2, 3, 4, 5)
```

Output:

```text
(1, 2, 3, 4, 5)
```

Kita dapat memeriksa tipenya:

```python
def super_func(*args):
    print(type(args))

super_func(1, 2, 3)
```

Output:

```text
<class 'tuple'>
```

Artinya, `*args` bukan membuat sebuah tipe data baru. Python mengumpulkan positional arguments ke dalam sebuah tuple.

---

## Menggunakan `args`

Karena `args` berbentuk tuple, kita dapat menggunakan operasi yang sesuai dengan tuple atau iterable.

Contoh:

```python
def super_func(*args):
    return sum(args)

result = super_func(1, 2, 3, 4, 5)

print(result)
```

Output:

```text
15
```

Function tersebut dapat menerima berapa pun jumlah angka yang diberikan.

Contoh:

```python
print(super_func(10, 20))
print(super_func(1, 2, 3, 4, 5, 6))
print(super_func(100, 200, 300, 400))
```

---

## Mengiterasi `args`

Karena `args` merupakan tuple, kita juga dapat melakukan looping.

```python
def super_func(*args):
    total = 0

    for value in args:
        total += value

    return total

print(super_func(1, 2, 3, 4, 5))
```

Output:

```text
15
```

---

## Nama `args` Tidak Wajib

`args` sebenarnya bukan keyword khusus Python.

Tanda `*` yang memiliki makna khusus.

Kita dapat menggunakan nama lain:

```python
def super_func(*numbers):
    print(numbers)

super_func(1, 2, 3)
```

Output:

```text
(1, 2, 3)
```

Namun, `args` merupakan **konvensi yang sangat umum** sehingga sebaiknya digunakan ketika tidak ada alasan khusus untuk menggunakan nama lain.

---

## `**kwargs`

`**kwargs` digunakan untuk menerima **banyak keyword arguments**.

Contoh:

```python
def super_func(**kwargs):
    print(kwargs)

super_func(num1=5, num2=10)
```

Output:

```text
{'num1': 5, 'num2': 10}
```

Berbeda dengan `*args`, data yang ditangkap oleh `**kwargs` disimpan dalam bentuk **dictionary**.

---

## `kwargs` Berbentuk Dictionary

Kita dapat memeriksa tipe data `kwargs`.

```python
def super_func(**kwargs):
    print(type(kwargs))

super_func(num1=5, num2=10)
```

Output:

```text
<class 'dict'>
```

Karena berbentuk dictionary, data dapat diakses menggunakan key.

```python
def super_func(**kwargs):
    print(kwargs['num1'])
    print(kwargs['num2'])

super_func(num1=5, num2=10)
```

Output:

```text
5
10
```

---

## Mengiterasi `kwargs`

Karena `kwargs` merupakan dictionary, kita dapat menggunakan method dictionary seperti `keys()`, `values()`, dan `items()`.

Contoh menggunakan `values()`:

```python
def super_func(**kwargs):
    total = 0

    for value in kwargs.values():
        total += value

    return total

print(super_func(num1=5, num2=10))
```

Output:

```text
15
```

---

## Menggunakan `keys()` dan `values()`

Contoh:

```python
def show_data(**kwargs):
    print('Keys:', kwargs.keys())
    print('Values:', kwargs.values())

show_data(name='Budi', age=25)
```

Data yang diberikan akan disimpan sebagai pasangan key-value:

```text
name → Budi
age  → 25
```

---

## Menggunakan `items()`

Kita juga dapat mengambil key dan value secara bersamaan.

```python
def show_data(**kwargs):
    for key, value in kwargs.items():
        print(key, value)

show_data(
    name='Budi',
    age=25,
    city='Palu'
)
```

Output:

```text
name Budi
age 25
city Palu
```

Pola `for key, value in kwargs.items()` merupakan contoh **tuple unpacking** yang telah dipelajari sebelumnya.

---

## Perbedaan `*args` dan `**kwargs`

Perhatikan perbedaan berikut:

| Sintaks | Jenis Argument | Bentuk Data di Dalam Function |
|---|---|---|
| `*args` | Positional arguments | Tuple |
| `**kwargs` | Keyword arguments | Dictionary |

Contoh:

```python
def example(*args, **kwargs):
    print(args)
    print(kwargs)

example(1, 2, 3, name='Budi', age=25)
```

Output:

```text
(1, 2, 3)
{'name': 'Budi', 'age': 25}
```

---

## Menggabungkan Parameter Biasa dengan `*args`

`*args` dapat digunakan bersama parameter biasa.

Contoh:

```python
def super_func(name, *args):
    print(name)
    print(args)

super_func('Budi', 1, 2, 3)
```

Output:

```text
Budi
(1, 2, 3)
```

Pada contoh tersebut:

```text
name → 'Budi'
args → (1, 2, 3)
```

Parameter `name` menerima positional argument pertama, sedangkan `*args` menangkap positional arguments berikutnya.

---

## Menggabungkan Parameter Biasa dengan `**kwargs`

`**kwargs` juga dapat digunakan bersama parameter biasa.

```python
def create_user(name, **kwargs):
    print(name)
    print(kwargs)

create_user(
    'Budi',
    age=25,
    city='Palu'
)
```

Output:

```text
Budi
{'age': 25, 'city': 'Palu'}
```

---

## Urutan Parameter

Ketika beberapa jenis parameter digunakan dalam satu function, Python memiliki aturan mengenai urutannya.

Secara umum urutannya adalah:

1. Parameter biasa
2. `*args`
3. Default parameters
4. `**kwargs`

Contoh:

```python
def super_func(name, *args, i='hi', **kwargs):
    pass
```

Struktur tersebut mengikuti urutan parameter yang benar.

---

## Contoh Function Lengkap

Kita dapat menggabungkan seluruh konsep tersebut dalam satu function.

```python
def super_func(name, *args, i='hi', **kwargs):
    total = sum(args) + sum(kwargs.values())

    return f'{i} {name}, totalnya adalah {total}'
```

Function dapat dipanggil seperti berikut:

```python
result = super_func(
    'Budi',
    1,
    2,
    3,
    num1=5,
    num2=10
)

print(result)
```

Output:

```text
hi Budi, totalnya adalah 21
```

Mari kita lihat bagaimana Python memproses argument tersebut.

```text
name
↓
Budi
```

```text
args
↓
(1, 2, 3)
```

```text
i
↓
'hi'
```

```text
kwargs
↓
{'num1': 5, 'num2': 10}
```

Kemudian:

```text
sum(args)
= 1 + 2 + 3
= 6
```

dan:

```text
sum(kwargs.values())
= 5 + 10
= 15
```

Sehingga:

```text
6 + 15 = 21
```

---

## Mengapa `*args` dan `**kwargs` Berguna?

Keduanya sangat berguna ketika function harus menerima jumlah argument yang fleksibel.

Tanpa `*args`, kita mungkin harus menentukan jumlah parameter secara eksplisit:

```python
def calculate(num1, num2, num3, num4):
    return num1 + num2 + num3 + num4
```

Function tersebut hanya menyediakan empat parameter.

Dengan `*args`:

```python
def calculate(*numbers):
    return sum(numbers)
```

Kita dapat memberikan jumlah angka yang berbeda:

```python
print(calculate(1, 2))
print(calculate(1, 2, 3))
print(calculate(1, 2, 3, 4, 5))
```

---

## Contoh Penggunaan `**kwargs`

`**kwargs` sangat berguna ketika data yang diterima memiliki struktur key-value yang fleksibel.

Contohnya:

```python
def create_profile(**profile):
    for key, value in profile.items():
        print(f'{key}: {value}')

create_profile(
    name='Budi',
    age=25,
    profession='Developer'
)
```

Output:

```text
name: Budi
age: 25
profession: Developer
```

Function tersebut tidak perlu menentukan semua kemungkinan informasi profile sebagai parameter.

---

## `*args` dan `**kwargs` dalam Praktik

Konsep ini banyak ditemukan dalam library dan framework Python karena memungkinkan function menerima konfigurasi atau argument yang fleksibel.

Contohnya, kita sering menemukan function dengan bentuk:

```python
def some_function(*args, **kwargs):
    pass
```

Artinya function tersebut dirancang untuk menerima positional arguments dan keyword arguments dalam jumlah yang fleksibel.

---

## Hal yang Perlu Diingat

Beberapa poin penting:

1. `*args` digunakan untuk menerima banyak positional arguments.
2. `args` disimpan dalam bentuk tuple.
3. `**kwargs` digunakan untuk menerima banyak keyword arguments.
4. `kwargs` disimpan dalam bentuk dictionary.
5. Nama `args` dan `kwargs` merupakan konvensi, bukan keyword khusus Python.
6. Simbol `*` dan `**` merupakan bagian penting dari sintaks tersebut.
7. `*args` cocok digunakan ketika jumlah positional arguments tidak diketahui.
8. `**kwargs` cocok digunakan ketika jumlah keyword arguments tidak diketahui.
9. `*args` dan `**kwargs` dapat digunakan bersama parameter biasa.
10. Urutan parameter harus mengikuti aturan Python agar function dapat didefinisikan dengan benar.

---

## Ringkasan

Secara sederhana:

```text
*args
↓
Banyak positional arguments
↓
Tuple
```

Sedangkan:

```text
**kwargs
↓
Banyak keyword arguments
↓
Dictionary
```

Dengan memahami `*args` dan `**kwargs`, kita dapat membuat function yang lebih fleksibel dan mampu menerima berbagai bentuk input tanpa harus menentukan seluruh parameter secara eksplisit sejak awal.