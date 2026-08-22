---
sidebar_position: 3
title: "Konsep Dasar & Fitur OOP"
---

## Konsep Dasar Object-Oriented Programming

Setelah memahami konsep **class** dan **object**, kita dapat mulai mempelajari berbagai konsep yang digunakan dalam Object-Oriented Programming atau OOP.

OOP merupakan paradigma pemrograman yang menggunakan **class** sebagai blueprint untuk membuat **object**.

Dengan OOP, program dapat disusun menjadi kumpulan object yang memiliki data dan perilaku masing-masing.

---

## Class

**Class** adalah blueprint atau cetak biru yang digunakan untuk mendefinisikan struktur dan perilaku object.

Class dapat menentukan:

- Data yang dimiliki oleh object.
- Perilaku yang dapat dilakukan oleh object.

Contoh sederhana:

```python
class PlayerCharacter:
    pass
```

Pada contoh tersebut, `PlayerCharacter` merupakan sebuah class.

Class tersebut nantinya dapat digunakan untuk membuat berbagai object atau instance.

---

## Attributes

**Attribute** adalah data atau karakteristik yang dimiliki oleh sebuah object.

Misalnya sebuah player dapat memiliki:

- Nama
- Usia
- Level
- Health
- Score

Secara konsep:

```text
Player
├── name
├── age
├── level
├── health
└── score
```

Attribute digunakan untuk menyimpan informasi yang berkaitan dengan object.

Pada tahap selanjutnya, kita akan mempelajari bagaimana attribute dibuat dan diakses pada object.

---

## Methods

**Method** adalah function yang berada di dalam sebuah class dan digunakan untuk mendefinisikan perilaku object.

Misalnya sebuah player dapat memiliki beberapa perilaku:

```text
Player
├── attack()
├── defend()
├── move()
└── heal()
```

Dengan demikian, attribute dapat digunakan untuk merepresentasikan **data**, sedangkan method digunakan untuk merepresentasikan **perilaku**.

---

## Method __init__

`__init__` merupakan salah satu **dunder method** yang sangat penting dalam OOP Python.

Method ini secara otomatis dipanggil ketika sebuah object dibuat dari class.

Salah satu kegunaannya adalah melakukan inisialisasi attribute pada object.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age
```

Ketika object dibuat, nilai `name` dan `age` dapat diberikan kepada object tersebut.

```python
player = PlayerCharacter("Budi", 25)
```

Dalam contoh tersebut, `__init__` digunakan untuk menginisialisasi data awal object.

---

## Class Method

Class method adalah method yang bekerja pada **class**, bukan secara khusus pada satu instance.

Class method dibuat menggunakan decorator `@classmethod`.

Class method menerima parameter pertama yang biasanya diberi nama `cls`.

Contoh:

```python
class Player:

    count = 0

    @classmethod
    def show_count(cls):
        return cls.count
```

Parameter `cls` mengacu pada class itu sendiri.

Class method dapat digunakan ketika operasi yang dilakukan berkaitan dengan data atau keadaan class.

---

## Static Method

Static method adalah method yang tidak membutuhkan akses langsung ke instance maupun class.

Static method dibuat menggunakan decorator `@staticmethod`.

Contoh:

```python
class MathUtils:

    @staticmethod
    def add(a, b):
        return a + b
```

Method tersebut tidak membutuhkan parameter `self` maupun `cls`.

Static method biasanya digunakan ketika sebuah function secara konsep berkaitan dengan class, tetapi tidak membutuhkan data dari instance maupun class tersebut.

---

## Perbedaan Instance Method, Class Method, dan Static Method

| Jenis Method | Parameter Khusus | Akses Utama |
|---|---|---|
| Instance method | `self` | Instance |
| Class method | `cls` | Class |
| Static method | Tidak ada | Tidak bergantung langsung pada instance atau class |

Ketiganya memiliki tujuan yang berbeda.

Instance method bekerja dengan data instance, class method bekerja dengan data atau keadaan class, sedangkan static method tidak membutuhkan akses langsung ke keduanya.

---

## Empat Pilar OOP

OOP umumnya dijelaskan menggunakan empat konsep utama yang dikenal sebagai **empat pilar OOP**:

1. Encapsulation
2. Abstraction
3. Inheritance
4. Polymorphism

Keempat konsep tersebut membantu programmer membangun program yang lebih terstruktur dan mudah dikembangkan.

---

## Encapsulation

**Encapsulation** atau enkapsulasi adalah konsep menggabungkan data dan perilaku yang berkaitan ke dalam satu class.

Misalnya sebuah object `BankAccount` memiliki data dan perilaku yang berkaitan dengan rekening:

```text
BankAccount
├── balance
├── account_number
├── deposit()
├── withdraw()
└── check_balance()
```

Data dan method yang berkaitan dikelompokkan dalam satu unit.

Tujuannya adalah menjaga struktur program agar lebih terorganisasi serta mengontrol bagaimana data digunakan.

---

## Abstraction

**Abstraction** atau abstraksi adalah konsep menyembunyikan detail implementasi yang tidak perlu diketahui pengguna dan hanya menampilkan bagian yang penting.

Contoh sederhana adalah penggunaan sebuah function.

Ketika kita menggunakan:

```python
result = sum([1, 2, 3])
```

kita tidak perlu mengetahui bagaimana Python melakukan proses penjumlahan di dalam function `sum()`.

Kita cukup mengetahui:

```text
Input
  ↓
sum()
  ↓
Output
```

Detail implementasinya disembunyikan.

Dalam OOP, abstraction membantu membuat interface yang lebih sederhana sehingga pengguna object tidak perlu memahami seluruh detail internalnya.

---

## Inheritance

**Inheritance** atau pewarisan memungkinkan sebuah class mewarisi attribute dan method dari class lainnya.

Class yang mewariskan kemampuan disebut **parent class** atau **base class**.

Class yang menerima pewarisan disebut **child class** atau **derived class**.

Secara konsep:

```text
Animal
   │
   ├── Dog
   ├── Cat
   └── Bird
```

Class `Dog`, `Cat`, dan `Bird` dapat mewarisi karakteristik tertentu dari `Animal`.

Inheritance membantu mengurangi duplikasi kode dan memungkinkan kita membangun hubungan antarclass.

---

## Polymorphism

**Polymorphism** berarti satu interface atau nama method dapat memiliki perilaku yang berbeda pada object yang berbeda.

Misalnya beberapa object memiliki method dengan nama yang sama:

```text
Animal
├── Dog → make_sound()
├── Cat → make_sound()
└── Bird → make_sound()
```

Method `make_sound()` dapat memberikan perilaku berbeda pada masing-masing class.

Konsep ini memungkinkan kode bekerja dengan berbagai jenis object tanpa harus mengetahui implementasi spesifik masing-masing object.

---

## super

`super()` digunakan untuk mengakses method atau bagian dari **parent class** dari dalam child class.

Konsep ini sangat berguna ketika menggunakan inheritance.

Secara sederhana:

```text
Parent Class
     ↑
   super()
     ↑
Child Class
```

Dengan `super()`, child class dapat menggunakan implementasi yang berasal dari parent class tanpa harus menulis ulang kode yang sama.

Contoh sederhana:

```python
class Animal:

    def speak(self):
        print("Animal speaks")


class Dog(Animal):

    def speak(self):
        super().speak()
        print("Dog barks")
```

Pada contoh tersebut, `super()` digunakan untuk memanggil method `speak()` milik parent class.

---

## Public dan Private

Dalam OOP terdapat konsep mengenai akses terhadap attribute dan method.

Python tidak menggunakan sistem private yang sama seperti beberapa bahasa pemrograman lain.

Python lebih banyak menggunakan **konvensi penamaan**.

Contohnya:

```python
class User:

    def __init__(self):
        self.name = "Budi"
        self._password = "secret"
```

Attribute `_password` menggunakan satu underscore sebagai konvensi bahwa attribute tersebut dimaksudkan untuk penggunaan internal.

Namun, underscore tunggal bukan mekanisme private yang benar-benar mencegah akses.

---

## Dunder Methods

**Dunder method** adalah method khusus Python yang memiliki dua underscore di awal dan dua underscore di akhir nama.

Dunder merupakan singkatan dari **double underscore**.

Contohnya:

```text
__init__
__str__
__len__
__repr__
```

Dunder method memungkinkan kita menentukan atau menyesuaikan perilaku tertentu dari sebuah object.

Contohnya, `__str__` dapat digunakan untuk menentukan representasi string ketika object ditampilkan.

```python
class User:

    def __str__(self):
        return "User object"
```

Ketika object digunakan dengan `str()` atau `print()`, Python dapat menggunakan method tersebut.

---

## Multiple Inheritance

Python juga mendukung **multiple inheritance**.

Multiple inheritance memungkinkan sebuah class mewarisi lebih dari satu parent class.

Secara konsep:

```text
Parent A       Parent B
    │             │
    └──────┬──────┘
           ↓
         Child
```

Contohnya:

```python
class A:
    pass


class B:
    pass


class C(A, B):
    pass
```

Class `C` mewarisi dari `A` dan `B`.

Multiple inheritance merupakan fitur yang kuat, tetapi penggunaannya perlu diperhatikan agar struktur program tetap mudah dipahami.

---

## Method Resolution Order

Ketika sebuah class memiliki inheritance, terutama multiple inheritance, Python perlu menentukan urutan class yang akan dicari ketika sebuah method atau attribute digunakan.

Urutan tersebut disebut **Method Resolution Order** atau **MRO**.

Contoh:

```python
class A:
    pass


class B(A):
    pass


class C(B):
    pass
```

Python akan mengikuti hubungan inheritance ketika mencari attribute atau method.

MRO dapat diperiksa menggunakan:

```python
print(C.mro())
```

MRO menjadi semakin penting ketika sebuah class memiliki beberapa parent class.

---

## Hubungan Antar Konsep OOP

Berbagai konsep OOP yang akan dipelajari dapat dilihat sebagai satu kesatuan:

```text
Object-Oriented Programming
│
├── Class
│   ├── Attribute
│   └── Method
│
├── Constructor
│   └── __init__
│
├── Encapsulation
├── Abstraction
├── Inheritance
│   ├── super()
│   └── MRO
│
├── Polymorphism
│
├── Class Method
│   └── @classmethod
│
├── Static Method
│   └── @staticmethod
│
└── Dunder Methods
```

Konsep-konsep tersebut saling berhubungan dan akan digunakan bersama ketika membangun aplikasi berbasis OOP.

---

## Kesimpulan

OOP menyediakan berbagai konsep untuk membantu kita membangun program yang terstruktur dan mudah dikembangkan.

Konsep dasar yang perlu dipahami meliputi:

- **Class** sebagai blueprint.
- **Object** sebagai instance dari class.
- **Attribute** sebagai data yang dimiliki object.
- **Method** sebagai perilaku object.
- **`__init__`** sebagai method untuk inisialisasi object.
- **Encapsulation** untuk mengelompokkan dan mengontrol data serta perilaku.
- **Abstraction** untuk menyembunyikan detail implementasi.
- **Inheritance** untuk mewariskan kemampuan antarclass.
- **Polymorphism** untuk memungkinkan perilaku berbeda melalui interface yang sama.
- **`super()`** untuk berinteraksi dengan parent class.
- **Dunder methods** untuk menyesuaikan perilaku khusus object.
- **MRO** untuk menentukan urutan pencarian dalam inheritance.

Setelah memahami gambaran umum ini, pembelajaran berikutnya dapat dilakukan secara bertahap mulai dari **attribute dan method**, kemudian dilanjutkan dengan constructor, class method, static method, inheritance, encapsulation, abstraction, dan polymorphism.