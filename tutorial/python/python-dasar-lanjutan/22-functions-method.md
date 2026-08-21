---
sidebar_position: 22
title: "Functions vs Methods"
---

Dalam Python, kita akan sering menggunakan istilah **function** dan **method**. Keduanya sama-sama digunakan untuk menjalankan suatu operasi atau tugas, tetapi terdapat perbedaan dalam cara penggunaannya dan hubungannya dengan objek.

Memahami perbedaan ini penting karena selama belajar Python kita akan sering menemukan kode seperti `len(data)` dan `data.append(item)`.

---

## Functions

**Function** adalah blok kode yang dibuat untuk melakukan tugas tertentu dan dapat dipanggil ketika diperlukan.

Function dapat berupa function bawaan Python maupun function yang dibuat sendiri oleh programmer.

Contoh function bawaan:

```python
print('Hello')
len([1, 2, 3])
max([10, 20, 30])
```

Function dipanggil secara langsung menggunakan nama function diikuti tanda kurung `()`.

---

## Built-in Functions

Python menyediakan banyak function bawaan yang dapat langsung digunakan tanpa harus membuatnya terlebih dahulu.

Beberapa contoh:

```python
print('Hello')
```

`print()` digunakan untuk menampilkan informasi.

```python
numbers = [10, 20, 30]

print(len(numbers))
```

`len()` digunakan untuk mendapatkan jumlah elemen.

Contoh lainnya:

```python
numbers = [10, 20, 30]

print(max(numbers))
print(min(numbers))
```

`max()` digunakan untuk mendapatkan nilai terbesar, sedangkan `min()` digunakan untuk mendapatkan nilai terkecil.

---

## Custom Functions

Selain menggunakan function bawaan, kita dapat membuat function sendiri menggunakan keyword `def`.

```python
def say_hello():
    print('Hello Python')

say_hello()
```

Pada contoh tersebut, `say_hello()` merupakan custom function.

Function dapat menerima parameter dan mengembalikan nilai menggunakan `return`.

```python
def calculate_total(price, quantity):
    return price * quantity

total = calculate_total(50000, 3)

print(total)
```

---

## Methods

**Method** adalah function yang dimiliki atau berkaitan dengan sebuah objek atau tipe data tertentu.

Method biasanya dipanggil menggunakan **dot notation**.

Bentuk umumnya:

```text
objek.method()
```

Contoh:

```python
name = 'python'

print(name.upper())
```

`upper()` merupakan method yang dimiliki oleh object string.

---

## Contoh Method pada List

List memiliki berbagai method yang dapat digunakan untuk memanipulasi datanya.

```python
numbers = [1, 2, 3]

numbers.append(4)

print(numbers)
```

`append()` merupakan method dari list.

Method tersebut dipanggil melalui object `numbers`:

```python
numbers.append(4)
```

Bukan:

```python
append(numbers, 4)
```

---

## Contoh Method pada String

String juga memiliki berbagai method.

```python
name = 'python'

print(name.upper())
print(name.capitalize())
```

Beberapa method string yang umum digunakan:

```python
text.upper()
text.lower()
text.capitalize()
text.replace()
text.strip()
```

Setiap method tersebut berkaitan dengan object string.

---

## Contoh Method pada Dictionary

Dictionary juga memiliki berbagai method.

```python
user = {
    'name': 'Andre',
    'age': 30
}

print(user.keys())
print(user.values())
print(user.items())
```

Pada contoh tersebut:

```text
keys()
values()
items()
```

merupakan method yang dimiliki oleh dictionary.

---

## Contoh Method pada Set

Set juga memiliki method khusus.

```python
numbers = {1, 2, 3}

numbers.add(4)

print(numbers)
```

`add()` merupakan method dari set.

---

## Perbedaan Cara Pemanggilan

Perbedaan paling mudah antara function dan method dapat dilihat dari cara pemanggilannya.

### Function

Function dipanggil secara langsung:

```python
numbers = [1, 2, 3]

print(len(numbers))
```

`len()` adalah function.

Bentuk umumnya:

```text
function(data)
```

---

### Method

Method dipanggil melalui object:

```python
numbers = [1, 2, 3]

numbers.append(4)
```

`append()` adalah method dari list.

Bentuk umumnya:

```text
object.method()
```

---

## Function vs Method

Perhatikan contoh berikut:

```python
numbers = [10, 20, 30]

print(len(numbers))
numbers.append(40)
```

Pada kode tersebut terdapat dua jenis pemanggilan:

```text
len(numbers)
```

`len()` adalah function bawaan Python.

Sedangkan:

```text
numbers.append(40)
```

`append()` adalah method yang dimiliki oleh object list.

---

## Mengapa Python Memisahkan Function dan Method?

Pemisahan ini membantu Python mengorganisasi operasi berdasarkan tanggung jawabnya.

Function seperti:

```python
len(data)
```

dapat digunakan untuk berbagai object yang mendukung operasi tersebut.

Sementara method seperti:

```python
data.append(item)
```

secara khusus berkaitan dengan kemampuan dari tipe data tertentu.

Misalnya, list memiliki `append()`:

```python
numbers = [1, 2, 3]

numbers.append(4)
```

Tetapi string tidak memiliki `append()`:

```python
name = 'Python'

# Akan menghasilkan AttributeError
name.append('!')
```

Hal ini terjadi karena `append()` bukan method milik string.

---

## Method dan Dot Notation

Dot notation merupakan pola penulisan yang sangat umum dalam Python.

```python
object.method()
```

Contoh:

```python
text = 'hello'

text.upper()
```

Di sini:

```text
text → object
upper() → method
```

Contoh lainnya:

```python
numbers = [1, 2, 3]

numbers.append(4)
```

```text
numbers → object
append() → method
```

---

## Method Tidak Dipanggil Secara Terpisah

Jika sebuah method merupakan bagian dari object tertentu, method tersebut biasanya dipanggil melalui object tersebut.

Contoh:

```python
name = 'python'

name.upper()
```

Bukan:

```python
upper()
```

Jika kita mencoba memanggil `upper()` tanpa object yang sesuai, Python tidak mengetahui function atau method `upper` mana yang ingin digunakan.

---

## Functions dan Methods Sama-Sama Menjalankan Operasi

Walaupun berbeda dalam cara pemanggilan, keduanya memiliki tujuan yang sama, yaitu membantu kita menjalankan operasi tertentu tanpa harus menulis ulang logika secara manual.

Contoh function:

```python
numbers = [10, 20, 30]

total = sum(numbers)

print(total)
```

Contoh method:

```python
numbers = [10, 20, 30]

numbers.append(40)

print(numbers)
```

Function dan method sama-sama membantu membuat kode menjadi lebih terstruktur dan mudah digunakan kembali.

---

## Perbandingan Functions dan Methods

| Fitur | Function | Method |
|---|---|---|
| Cara pemanggilan | `function(data)` | `object.method()` |
| Hubungan dengan object | Tidak harus terikat object tertentu | Berkaitan dengan object |
| Notasi | Pemanggilan langsung | Dot notation |
| Contoh | `len(numbers)` | `numbers.append(4)` |
| Contoh bawaan | `print()`, `len()`, `max()` | `upper()`, `append()`, `keys()` |

---

## Functions dan Methods dalam OOP

Konsep method akan menjadi semakin penting ketika mempelajari **Object-Oriented Programming atau OOP**.

Dalam OOP, kita dapat membuat class yang memiliki data dan method sendiri.

Contoh sederhana:

```python
class User:

    def say_hello(self):
        print('Hello')

user = User()

user.say_hello()
```

Pada contoh tersebut, `say_hello()` merupakan method yang dibuat di dalam class `User`.

Pembahasan mengenai class, object, dan method akan dipelajari lebih lanjut ketika masuk ke materi OOP.

---

## Kesimpulan

Perbedaan utama antara function dan method terletak pada **cara pemanggilan dan hubungannya dengan object**.

**Function** biasanya dipanggil secara langsung:

```python
len(numbers)
```

Sedangkan **method** dipanggil melalui object:

```python
numbers.append(4)
```

Secara sederhana, ingat pola berikut:

```text
Function
function(data)

Method
object.method()
```

Memahami perbedaan ini akan membantu ketika membaca kode Python karena kita dapat mengenali apakah suatu operasi merupakan function atau method hanya dari cara penulisannya.