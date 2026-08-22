---
sidebar_position: 10
title: "Inheritance"
---

**Inheritance** atau **Pewarisan** merupakan pilar ketiga dalam Object-Oriented Programming (OOP).

Inheritance memungkinkan sebuah class mewarisi attribute dan method dari class lainnya.

Dalam inheritance terdapat dua istilah penting:

- **Parent Class** atau **Superclass**: class yang memberikan attribute dan method.
- **Child Class** atau **Subclass**: class yang menerima atau mewarisi attribute dan method dari parent class.

Secara sederhana:

```text
Parent Class
     │
     ├── Child Class
     │
     └── Child Class
```

Dengan inheritance, kita dapat membuat hubungan antara class yang bersifat umum dengan class yang lebih spesifik.

---

## Mengapa Menggunakan Inheritance?

Inheritance terutama digunakan untuk menghindari pengulangan kode dan membangun struktur class yang memiliki hubungan secara logis.

Beberapa manfaat inheritance antara lain:

- **Reusability**: menggunakan kembali kode yang sudah dibuat.
- **DRY (Don't Repeat Yourself)**: mengurangi penulisan kode yang sama.
- **Struktur yang lebih terorganisir**: membuat hubungan antara class yang umum dan spesifik.
- **Hirarki class**: membentuk struktur parent dan child class.

---

## Analogi Inheritance

Bayangkan kita memiliki sebuah sistem game.

Di dalam game terdapat beberapa jenis karakter:

```text
User
├── Wizard
└── Archer
```

Semua karakter tersebut merupakan user.

Karena itu, beberapa perilaku dapat dimiliki oleh semua karakter.

Misalnya:

```text
User
└── sign_in()
```

Kemudian masing-masing karakter memiliki kemampuan khusus:

```text
Wizard
└── attack()

Archer
└── attack()
```

Dengan inheritance, `Wizard` dan `Archer` tidak perlu membuat ulang method `sign_in()`.

Method tersebut dapat diwariskan dari `User`.

---

## Parent Class

Parent class merupakan class yang menyediakan attribute dan method yang dapat diwariskan kepada child class.

Contoh:

```python
class User:

    def sign_in(self):
        print("logged in")
```

Class `User` memiliki method `sign_in()`.

Method tersebut nantinya dapat digunakan oleh class yang mewarisi `User`.

---

## Child Class

Child class dibuat dengan menuliskan parent class di dalam tanda kurung setelah nama class.

Contoh:

```python
class Wizard(User):
    pass
```

Pada contoh tersebut:

```text
Wizard
   ↓
mewarisi
   ↓
User
```

Artinya, `Wizard` merupakan child class dari `User`.

Karena `Wizard` mewarisi `User`, maka object dari `Wizard` dapat menggunakan method yang dimiliki `User`.

---

## Contoh Inheritance Sederhana

```python
class User:

    def sign_in(self):
        print("logged in")


class Wizard(User):
    pass
```

Kemudian kita membuat object:

```python
wizard1 = Wizard()
```

Meskipun `Wizard` tidak mendefinisikan method `sign_in()`, kita tetap dapat menggunakannya:

```python
wizard1.sign_in()
```

Output:

```text
logged in
```

Method tersebut berasal dari parent class `User`.

---

## Inheritance dan Reusability

Tanpa inheritance, kita mungkin harus menulis method yang sama pada setiap class.

Misalnya:

```python
class Wizard:

    def sign_in(self):
        print("logged in")


class Archer:

    def sign_in(self):
        print("logged in")
```

Terdapat kode yang sama pada kedua class.

Dengan inheritance, kita dapat memindahkan method tersebut ke parent class:

```python
class User:

    def sign_in(self):
        print("logged in")


class Wizard(User):
    pass


class Archer(User):
    pass
```

Sekarang `Wizard` dan `Archer` dapat menggunakan `sign_in()` dari `User`.

Hal ini membantu menerapkan prinsip **DRY (Don't Repeat Yourself)**.

---

## Contoh Inheritance dengan Wizard

Kita dapat membuat `Wizard` sebagai child class dari `User`.

```python
class User:

    def sign_in(self):
        print("logged in")


class Wizard(User):

    def __init__(self, name, power):
        self.name = name
        self.power = power

    def attack(self):
        print(f"attacking with power of {self.power}")
```

Kemudian:

```python
wizard1 = Wizard("Merlin", 50)
```

Object `wizard1` memiliki method `attack()` dari class `Wizard`.

Selain itu, `wizard1` juga memiliki akses terhadap method `sign_in()` yang diwariskan dari `User`.

```python
wizard1.sign_in()
wizard1.attack()
```

Output:

```text
logged in
attacking with power of 50
```

---

## Contoh Inheritance dengan Archer

Kita juga dapat membuat `Archer` sebagai child class dari `User`.

```python
class Archer(User):

    def __init__(self, name, num_arrows):
        self.name = name
        self.num_arrows = num_arrows

    def attack(self):
        print(
            f"attacking with arrows: arrows left - {self.num_arrows}"
        )
```

Kemudian:

```python
archer1 = Archer("Robin", 100)
```

Object `archer1` memiliki method `attack()` dari class `Archer`.

Selain itu, `archer1` juga mewarisi method `sign_in()` dari `User`.

```python
archer1.sign_in()
archer1.attack()
```

Output:

```text
logged in
attacking with arrows: arrows left - 100
```

---

## Struktur Inheritance

Jika kita menggabungkan contoh sebelumnya:

```text
             User
              │
       ┌──────┴──────┐
       │             │
     Wizard        Archer
       │             │
    attack()      attack()
```

`User` merupakan parent class.

Sedangkan `Wizard` dan `Archer` merupakan child class.

Method `sign_in()` berasal dari `User` dan dapat digunakan oleh kedua child class.

---

## Child Class Dapat Memiliki Fitur Sendiri

Inheritance tidak berarti child class hanya dapat menggunakan method dari parent class.

Child class juga dapat memiliki attribute dan method sendiri.

Contohnya:

```python
class User:

    def sign_in(self):
        print("logged in")


class Wizard(User):

    def attack(self):
        print("attacking with magic")
```

Pada contoh tersebut:

```text
User
└── sign_in()

Wizard
├── sign_in()
└── attack()
```

Object `Wizard` memiliki akses terhadap method yang diwariskan sekaligus method yang didefinisikan sendiri.

---

## Child Class Dapat Memiliki Perilaku yang Berbeda

Inheritance juga memungkinkan beberapa child class memiliki method dengan nama yang sama tetapi implementasi yang berbeda.

Contohnya:

```python
class User:

    def sign_in(self):
        print("logged in")


class Wizard(User):

    def attack(self):
        print("attacking with magic")


class Archer(User):

    def attack(self):
        print("attacking with arrows")
```

Kedua child class memiliki method `attack()`.

Tetapi perilakunya berbeda:

```text
Wizard
└── attack() → magic

Archer
└── attack() → arrows
```

Konsep ini nantinya akan menjadi dasar untuk mempelajari **polymorphism**.

---

## Memeriksa Hubungan Object dengan Class

Python menyediakan fungsi bawaan `isinstance()` untuk memeriksa apakah sebuah object merupakan instance dari class tertentu.

Sintaks:

```python
isinstance(object, class)
```

Contoh:

```python
class User:
    pass


class Wizard(User):
    pass


wizard1 = Wizard()
```

Kita dapat memeriksa:

```python
print(isinstance(wizard1, Wizard))
```

Output:

```text
True
```

Karena `wizard1` merupakan instance dari `Wizard`.

---

## Memeriksa Parent Class

`isinstance()` juga dapat digunakan untuk memeriksa parent class.

Contoh:

```python
print(isinstance(wizard1, User))
```

Output:

```text
True
```

Mengapa hasilnya `True`?

Karena:

```text
Wizard
   ↓
User
```

`Wizard` mewarisi `User`.

Oleh karena itu, object `wizard1` dianggap sebagai instance dari `Wizard` sekaligus instance dari `User`.

---

## Memeriksa Class `object`

Python memiliki sebuah base class bernama `object`.

Dalam Python 3, semua class pada akhirnya merupakan turunan dari `object`.

Contoh:

```python
class User:
    pass
```

Secara konsep:

```text
object
   ↓
 User
```

Jika kita membuat:

```python
user1 = User()
```

maka:

```python
print(isinstance(user1, object))
```

akan menghasilkan:

```text
True
```

Hal ini karena `User` pada akhirnya merupakan turunan dari `object`.

---

## Hubungan Class dalam Python

Secara sederhana, hubungan tersebut dapat digambarkan:

```text
object
   │
   └── User
        │
        ├── Wizard
        │
        └── Archer
```

`object` berada pada tingkat paling dasar.

Kemudian `User` menjadi parent class untuk `Wizard` dan `Archer`.

---

### `object` dan Dunder Methods

Base class `object` menyediakan berbagai perilaku dasar yang digunakan oleh object Python.

Beberapa perilaku tersebut berkaitan dengan **dunder methods** atau **magic methods**.

Contohnya:

```text
__str__
__repr__
__dir__
```

Dunder methods memiliki dua underscore di awal dan dua underscore di akhir nama method.

Method-method tersebut memiliki fungsi khusus yang dikenali oleh Python.

---

## Fungsi `isinstance()`

Fungsi `isinstance()` berguna ketika kita ingin mengetahui hubungan antara sebuah object dengan class.

Contoh:

```python
print(isinstance(wizard1, Wizard))
print(isinstance(wizard1, User))
print(isinstance(wizard1, object))
```

Output:

```text
True
True
True
```

Ketiga hasil tersebut `True` karena:

```text
wizard1
   │
   ├── Wizard
   │
   ├── User
   │
   └── object
```

---

## Inheritance dan Reusability

Salah satu alasan utama menggunakan inheritance adalah **reusability**.

Misalnya kita memiliki method:

```python
def sign_in(self):
    print("logged in")
```

Daripada menulis method tersebut pada setiap class:

```text
Wizard
Archer
Knight
Healer
```

kita dapat menempatkannya pada parent class:

```text
User
└── sign_in()
```

Kemudian berbagai child class dapat mewarisinya:

```text
             User
              │
      ┌───────┼───────┐
      ↓       ↓       ↓
   Wizard   Archer   Knight
```

Hal ini membuat kode lebih mudah digunakan kembali.

---

## Kapan Menggunakan Inheritance?

Inheritance cocok digunakan ketika terdapat hubungan yang jelas antara sebuah class dengan class lainnya.

Misalnya:

```text
Animal
├── Dog
├── Cat
└── Bird
```

atau:

```text
Vehicle
├── Car
├── Motorcycle
└── Truck
```

atau:

```text
User
├── Admin
├── Customer
└── Moderator
```

Pada contoh tersebut, child class memiliki hubungan **is-a** dengan parent class.

Contohnya:

```text
Dog is an Animal
Car is a Vehicle
Admin is a User
```

Hubungan seperti ini merupakan salah satu indikasi bahwa inheritance mungkin sesuai digunakan.

---

## Kesimpulan

**Inheritance** adalah mekanisme OOP yang memungkinkan sebuah class mewarisi attribute dan method dari class lain.

Dalam inheritance terdapat:

```text
Parent Class
    ↓
Child Class
```

Parent class menyediakan fitur umum, sedangkan child class dapat menggunakan atau menambahkan fitur yang lebih spesifik.

Contoh:

```python
class User:

    def sign_in(self):
        print("logged in")


class Wizard(User):

    def attack(self):
        print("attacking with magic")
```

`Wizard` mewarisi `sign_in()` dari `User`, tetapi juga memiliki method `attack()` sendiri.

Manfaat utama inheritance:

- Mengurangi duplikasi kode.
- Menerapkan prinsip DRY.
- Meningkatkan reusability.
- Membentuk hirarki class.
- Mengorganisasi class berdasarkan hubungan yang logis.
- Menjadi dasar untuk mempelajari polymorphism.

Python juga menyediakan `isinstance()` untuk memeriksa hubungan antara object dan class.

```python
print(isinstance(wizard1, Wizard))
print(isinstance(wizard1, User))
print(isinstance(wizard1, object))
```

Ketiga pemeriksaan tersebut dapat menghasilkan `True` karena inheritance membentuk hubungan:

```text
object
   ↓
 User
   ↓
Wizard
```

Setelah memahami inheritance, konsep berikutnya yang penting untuk dipelajari adalah **`super()`**, yaitu mekanisme untuk mengakses method atau constructor dari parent class.
