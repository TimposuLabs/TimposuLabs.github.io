---
sidebar_position: 6
title: "Class Method dan Static Method"
---

Setelah memahami instance method dan constructor `__init__`, kita dapat mempelajari dua jenis method lainnya yang tersedia di Python, yaitu **class method** dan **static method**.

Di dalam sebuah class, terdapat tiga jenis method yang umum digunakan:

1. **Instance Method**
2. **Class Method**
3. **Static Method**

Perbedaan utama ketiganya terletak pada data yang dapat mereka akses dan cara method tersebut digunakan.

---

## Instance Method

Sebelum membahas `@classmethod` dan `@staticmethod`, kita perlu memahami kembali instance method.

Instance method adalah method yang bekerja pada object tertentu.

Instance method menggunakan parameter `self` sebagai parameter pertama.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def shout(self):
        print(f"My name is {self.name}")
```

Untuk menggunakan instance method, kita perlu membuat object terlebih dahulu:

```python
player = PlayerCharacter("Budi", 25)

player.shout()
```

Output:

```text
My name is Budi
```

`self` mengacu pada object yang sedang digunakan.

---

## Class Method

**Class method** adalah method yang bekerja pada class, bukan secara khusus pada satu object.

Class method dibuat menggunakan decorator `@classmethod`.

Contoh:

```python
class PlayerCharacter:

    @classmethod
    def adding_things(cls, num1, num2):
        return cls("Teddy", num1 + num2)
```

Parameter pertama pada class method biasanya diberi nama `cls`.

`cls` merupakan referensi terhadap class itu sendiri.

---

## Memanggil Class Method

Salah satu kelebihan class method adalah kita dapat memanggilnya melalui nama class.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def adding_things(cls, num1, num2):
        return cls("Teddy", num1 + num2)
```

Kemudian:

```python
player3 = PlayerCharacter.adding_things(2, 3)
```

Method tersebut akan membuat object baru dari class `PlayerCharacter`.

Kemudian:

```python
print(player3.name)
print(player3.age)
```

Output:

```text
Teddy
5
```

Pada contoh tersebut, class method digunakan sebagai **custom constructor**.

---

## `cls` pada Class Method

Pada instance method, kita menggunakan `self`:

```python
def method(self):
    ...
```

Sedangkan pada class method, kita menggunakan `cls`:

```python
@classmethod
def method(cls):
    ...
```

Perbedaannya:

```text
self
 ↓
Object / Instance

cls
 ↓
Class
```

Dengan `cls`, class method dapat mengakses class dan membuat object dari class tersebut.

---

## Class Method sebagai Custom Constructor

Salah satu penggunaan class method yang penting adalah membuat alternatif cara untuk membuat object.

Misalnya constructor utama:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age
```

Object biasanya dibuat seperti berikut:

```python
player = PlayerCharacter("Budi", 25)
```

Kita dapat membuat cara lain menggunakan class method:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def create_default_player(cls):
        return cls("Anonymous", 0)
```

Kemudian:

```python
player = PlayerCharacter.create_default_player()
```

Class method tersebut membuat object baru menggunakan constructor class.

---

## Static Method

**Static method** adalah method yang tidak bergantung pada object maupun class.

Static method dibuat menggunakan decorator `@staticmethod`.

Contoh:

```python
class PlayerCharacter:

    @staticmethod
    def adding_things(num1, num2):
        return num1 + num2
```

Method tersebut dapat dipanggil langsung melalui class:

```python
result = PlayerCharacter.adding_things(5, 10)

print(result)
```

Output:

```text
15
```

---

## Static Method Tidak Menggunakan `self` atau `cls`

Static method tidak menerima parameter otomatis `self` maupun `cls`.

Contoh:

```python
class MathUtils:

    @staticmethod
    def add(a, b):
        return a + b
```

Method tersebut hanya bekerja berdasarkan parameter yang diberikan:

```python
result = MathUtils.add(10, 20)

print(result)
```

Output:

```text
30
```

Method tersebut tidak membutuhkan data dari object maupun class.

---

## Static Method sebagai Utility Function

Static method biasanya digunakan untuk function yang secara logis berhubungan dengan sebuah class, tetapi tidak membutuhkan data dari object atau class.

Contohnya:

```python
class MathUtils:

    @staticmethod
    def is_even(number):
        return number % 2 == 0
```

Kita dapat menggunakannya:

```python
print(MathUtils.is_even(10))
```

Output:

```text
True
```

Method tersebut tidak membutuhkan `self` maupun `cls`.

---

## Perbandingan Instance Method, Class Method, dan Static Method

| Jenis Method | Parameter Otomatis | Akses Object | Akses Class | Perlu Object |
|---|---|---|---|---|
| Instance Method | `self` | Ya | Ya, melalui instance | Ya |
| Class Method | `cls` | Tidak secara langsung | Ya | Tidak |
| Static Method | Tidak ada | Tidak | Tidak | Tidak |

Secara sederhana:

```text
Instance Method
      ↓
     self
      ↓
   Object

Class Method
      ↓
     cls
      ↓
    Class

Static Method
      ↓
Tidak ada referensi otomatis
      ↓
Function biasa
```

---

## Kapan Menggunakan Instance Method?

Gunakan instance method ketika method membutuhkan data yang dimiliki oleh object.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name):
        self.name = name

    def greet(self):
        print(f"Hello {self.name}")
```

Method `greet()` membutuhkan `self.name`.

Karena itu, instance method merupakan pilihan yang tepat.

---

## Kapan Menggunakan Class Method?

Gunakan class method ketika operasi berhubungan dengan class.

Class method dapat digunakan untuk:

- Mengakses class attribute.
- Mengubah class state.
- Membuat object dengan cara alternatif.
- Membuat custom constructor.

Contoh:

```python
class PlayerCharacter:

    @classmethod
    def create_player(cls):
        return cls("Anonymous", 0)
```

Method tersebut berhubungan langsung dengan proses pembuatan object dari class.

---

## Kapan Menggunakan Static Method?

Gunakan static method ketika sebuah function secara logis berkaitan dengan class tetapi tidak membutuhkan data dari object maupun class.

Contoh:

```python
class MathUtils:

    @staticmethod
    def multiply(a, b):
        return a * b
```

Function tersebut tidak membutuhkan:

```text
self
```

dan juga tidak membutuhkan:

```text
cls
```

Karena itu, static method dapat digunakan.

---

## Contoh Ketiga Method dalam Satu Class

Ketiga jenis method dapat berada dalam satu class.

Contoh:

```python
class PlayerCharacter:

    membership = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def shout(self):
        print(f"My name is {self.name}")

    @classmethod
    def create_default_player(cls):
        return cls("Anonymous", 0)

    @staticmethod
    def is_adult(age):
        return age >= 18
```

Class tersebut memiliki:

```text
PlayerCharacter
│
├── Class Attribute
│   └── membership
│
├── Instance Method
│   └── shout()
│
├── Class Method
│   └── create_default_player()
│
└── Static Method
    └── is_adult()
```

---

## Contoh Penggunaan

### Instance Method

Membutuhkan object:

```python
player = PlayerCharacter("Budi", 25)

player.shout()
```

---

### Class Method

Tidak membutuhkan object terlebih dahulu:

```python
player = PlayerCharacter.create_default_player()
```

---

### Static Method

Tidak membutuhkan object maupun data class:

```python
result = PlayerCharacter.is_adult(25)

print(result)
```

Output:

```text
True
```

---

## Kesimpulan

Python menyediakan tiga jenis method yang penting untuk dipahami:

### Instance Method

Menggunakan `self` dan bekerja dengan data object.

```python
def method(self):
    ...
```

### Class Method

Menggunakan `cls` dan bekerja dengan class.

```python
@classmethod
def method(cls):
    ...
```

Class method juga dapat digunakan sebagai **custom constructor** untuk membuat object dengan cara alternatif.

### Static Method

Tidak menggunakan `self` maupun `cls`.

```python
@staticmethod
def method():
    ...
```

Static method biasanya digunakan untuk function yang secara logis berkaitan dengan class tetapi tidak membutuhkan data dari object maupun class.

Secara sederhana:

```text
Instance Method
→ membutuhkan object
→ menggunakan self

Class Method
→ bekerja dengan class
→ menggunakan cls

Static Method
→ tidak membutuhkan object atau class
→ tidak menggunakan self atau cls
```

Memahami perbedaan ketiga jenis method ini akan menjadi dasar penting sebelum mempelajari konsep OOP berikutnya seperti **encapsulation, inheritance, polymorphism, dan dunder methods**.