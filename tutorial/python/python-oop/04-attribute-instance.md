---
sidebar_position: 4
title: "Class Object Attributes &  Instance Attributes"
---

Setelah memahami konsep **class** dan **object**, kita akan mempelajari bagaimana sebuah class menyimpan data.

Dalam Python, attribute pada class dapat dibedakan menjadi dua konsep utama:

- **Class Object Attribute**
- **Instance Attribute**

Perbedaan keduanya penting karena menentukan apakah sebuah attribute dimiliki oleh class secara umum atau dimiliki secara khusus oleh setiap object.

---

## Class Object Attribute

**Class Object Attribute** adalah attribute yang dimiliki oleh class dan nilainya secara umum berlaku untuk semua object yang dibuat dari class tersebut.

Attribute ini biasanya digunakan untuk menyimpan data yang bersifat umum atau sama untuk seluruh object.

Contohnya:

```python
class PlayerCharacter:
    membership = True
```

Pada contoh tersebut, `membership` merupakan **Class Object Attribute**.

Karena attribute tersebut didefinisikan langsung di dalam class, nilainya dapat digunakan oleh object yang dibuat dari class tersebut.

---

## Instance Attribute

**Instance Attribute** adalah attribute yang dimiliki oleh masing-masing object.

Nilainya dapat berbeda antara satu object dengan object lainnya.

Instance attribute biasanya dibuat di dalam method `__init__` menggunakan `self`.

Contoh:

```python
class PlayerCharacter:

    membership = True

    def __init__(self, name, age):
        self.name = name
        self.age = age
```

Pada contoh tersebut:

- `membership` adalah **Class Object Attribute**.
- `self.name` adalah **Instance Attribute**.
- `self.age` adalah **Instance Attribute**.

Jika kita membuat beberapa object:

```python
player1 = PlayerCharacter("Budi", 25)
player2 = PlayerCharacter("Andi", 30)
```

Maka secara konsep:

```text
PlayerCharacter
│
├── membership = True
│
├── player1
│   ├── name = "Budi"
│   └── age = 25
│
└── player2
    ├── name = "Andi"
    └── age = 30
```

`membership` bersifat umum, sedangkan `name` dan `age` dapat berbeda untuk setiap object.

---

## Perbedaan Class Object Attribute dan Instance Attribute

Perbedaan keduanya dapat diringkas sebagai berikut:

| Attribute | Class Object Attribute | Instance Attribute |
|---|---|---|
| Dimiliki oleh | Class | Object |
| Didefinisikan | Langsung di dalam class | Biasanya di dalam `__init__` |
| Menggunakan `self` | Tidak | Ya |
| Nilai | Umumnya sama untuk semua object | Dapat berbeda setiap object |
| Contoh | `membership` | `self.name`, `self.age` |

---

## Contoh Lengkap

Berikut contoh class yang memiliki kedua jenis attribute:

```python
class PlayerCharacter:

    membership = True

    def __init__(self, name, age):
        self.name = name
        self.age = age
```

Kemudian kita membuat beberapa object:

```python
player1 = PlayerCharacter("Budi", 25)
player2 = PlayerCharacter("Andi", 30)
```

Kita dapat mengakses instance attribute melalui object:

```python
print(player1.name)
print(player1.age)

print(player2.name)
print(player2.age)
```

Output:

```text
Budi
25
Andi
30
```

Sedangkan `membership` merupakan attribute yang berasal dari class:

```python
print(player1.membership)
print(player2.membership)
```

Output:

```text
True
True
```

---

## Mengakses Class Object Attribute

Class Object Attribute dapat diakses menggunakan nama class.

Contoh:

```python
class PlayerCharacter:
    membership = True
```

Kita dapat mengaksesnya menggunakan:

```python
print(PlayerCharacter.membership)
```

Output:

```text
True
```

Class Object Attribute juga dapat diakses melalui object:

```python
player = PlayerCharacter()

print(player.membership)
```

Python dapat menemukan `membership` pada class ketika attribute tersebut tidak ditemukan secara khusus pada object.

---

## Mengakses Instance Attribute

Instance Attribute biasanya diakses menggunakan object.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age
```

Kemudian:

```python
player = PlayerCharacter("Budi", 25)

print(player.name)
print(player.age)
```

Output:

```text
Budi
25
```

Attribute tersebut merupakan bagian dari object `player`.

---

## Instance Attribute Tidak Dimiliki Class Secara Langsung

Perhatikan contoh berikut:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age
```

Kemudian:

```python
player = PlayerCharacter("Budi", 25)
```

`name` dan `age` merupakan attribute dari object `player`.

Kita tidak dapat mengaksesnya langsung melalui nama class:

```python
print(PlayerCharacter.name)
```

Kode tersebut akan menghasilkan `AttributeError` karena `name` bukan attribute yang didefinisikan langsung pada class.

Attribute tersebut tersedia pada object:

```python
print(player.name)
```

---

## Peran `self`

`self` merupakan referensi ke object yang sedang digunakan.

Contohnya:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age
```

Ketika kita membuat:

```python
player1 = PlayerCharacter("Budi", 25)
```

Maka secara konsep:

```text
self.name → player1.name
self.age  → player1.age
```

Ketika membuat object lain:

```python
player2 = PlayerCharacter("Andi", 30)
```

Maka:

```text
self.name → player2.name
self.age  → player2.age
```

Karena itu, `self` memungkinkan setiap object memiliki data masing-masing.

---

## `self` pada Method

Selain digunakan untuk mengakses instance attribute, `self` juga digunakan untuk mengakses method lain yang dimiliki object.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name):
        self.name = name

    def greet(self):
        print(f"Hello, {self.name}")
```

Kemudian:

```python
player = PlayerCharacter("Budi")

player.greet()
```

Output:

```text
Hello, Budi
```

Di dalam method `greet()`, `self.name` mengacu pada attribute `name` milik object yang sedang menjalankan method tersebut.

---

## Mengapa Method Membutuhkan `self`?

Method yang digunakan untuk bekerja dengan instance biasanya menerima `self` sebagai parameter pertama.

Contoh:

```python
class PlayerCharacter:

    def greet(self):
        print("Hello")
```

Ketika dipanggil:

```python
player = PlayerCharacter()

player.greet()
```

Python secara otomatis menghubungkan object `player` dengan parameter `self`.

Secara konsep:

```text
player.greet()
      ↓
greet(player)
```

Karena itu, `self` memungkinkan method mengetahui object mana yang sedang digunakan.

---

## Attribute Lookup

Ketika kita mengakses sebuah attribute melalui object, Python akan mencari attribute tersebut.

Secara sederhana, Python akan mencari pada object terlebih dahulu.

Jika tidak ditemukan, Python kemudian dapat mencari pada class.

Contoh:

```python
class PlayerCharacter:

    membership = True

    def __init__(self, name):
        self.name = name
```

Ketika kita menjalankan:

```python
player = PlayerCharacter("Budi")

print(player.name)
```

Python menemukan `name` pada object `player`.

Ketika kita menjalankan:

```python
print(player.membership)
```

Python tidak menemukan `membership` sebagai attribute khusus pada object, sehingga Python dapat menemukannya pada class `PlayerCharacter`.

Secara sederhana:

```text
player.membership
       │
       ↓
Cek object
       │
       ↓
Tidak ditemukan
       │
       ↓
Cek class
       │
       ↓
membership = True
```

---

## Fungsi `help()`

Python menyediakan fungsi bawaan `help()` untuk melihat informasi mengenai sebuah object, class, function, atau tipe data.

Contohnya:

```python
help(PlayerCharacter)
```

Python akan menampilkan informasi mengenai class tersebut.

Kita juga dapat melihat dokumentasi dari tipe data bawaan Python:

```python
help(list)
```

Informasi yang ditampilkan dapat mencakup:

- Dokumentasi class.
- Method yang tersedia.
- Attribute tertentu.
- Dunder method.
- Informasi mengenai inheritance.

---

## Inspeksi Object dengan `help()`

Misalnya kita memiliki:

```python
class PlayerCharacter:

    membership = True

    def __init__(self, name, age):
        self.name = name
        self.age = age
```

Kita dapat menjalankan:

```python
help(PlayerCharacter)
```

Perintah tersebut membantu kita memahami struktur class dan method yang tersedia.

Namun, perlu diperhatikan bahwa attribute instance seperti `name` dan `age` baru dibuat ketika object diinisialisasi.

---

## Gambaran Struktur Class dan Object

Hubungan antara class, class object attribute, dan instance attribute dapat digambarkan sebagai berikut:

```text
PlayerCharacter
│
├── Class Object Attribute
│   └── membership = True
│
├── __init__()
│
└── Object
    │
    ├── player1
    │   ├── name = "Budi"
    │   └── age = 25
    │
    └── player2
        ├── name = "Andi"
        └── age = 30
```

Class menyediakan struktur umum.

Setiap object kemudian memiliki instance attribute masing-masing.

---

## Kesimpulan

Dalam Python, attribute pada OOP dapat digunakan untuk menyimpan data yang berkaitan dengan class maupun object.

Dua konsep utama yang perlu dipahami adalah:

- **Class Object Attribute** merupakan attribute yang didefinisikan pada class dan secara umum dapat digunakan oleh semua object.
- **Instance Attribute** merupakan attribute yang dimiliki oleh masing-masing object dan biasanya dibuat menggunakan `self` di dalam `__init__`.

Contoh:

```python
class PlayerCharacter:

    membership = True

    def __init__(self, name, age):
        self.name = name
        self.age = age
```

Pada contoh tersebut:

```text
membership
    ↓
Class Object Attribute
    ↓
Berlaku secara umum

self.name
self.age
    ↓
Instance Attribute
    ↓
Spesifik untuk setiap object
```

Memahami perbedaan kedua jenis attribute ini sangat penting sebelum mempelajari konsep OOP berikutnya seperti **method, class method, static method, encapsulation, inheritance, dan polymorphism**.