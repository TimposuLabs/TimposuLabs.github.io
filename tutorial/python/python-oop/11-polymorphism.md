---
sidebar_position: 11
title: "Polymorphism"
---

**Polymorphism** atau **Polimorfisme** merupakan salah satu konsep penting dalam Object-Oriented Programming (OOP).

Kata **polymorphism** berasal dari bahasa Yunani yang berarti **"banyak bentuk"**.

Dalam OOP, polymorphism memungkinkan beberapa object dari class yang berbeda untuk menggunakan **method dengan nama yang sama**, tetapi menghasilkan perilaku yang berbeda sesuai dengan implementasi masing-masing class.

Dengan kata lain, kita dapat memanggil method yang sama tanpa harus mengetahui secara spesifik object tersebut berasal dari class apa.

---

## Konsep Dasar Polymorphism

Misalnya kita memiliki beberapa karakter dalam sebuah game:

```text
User
├── Wizard
└── Archer
```

Kedua child class tersebut memiliki method dengan nama yang sama:

```text
Wizard
└── attack()

Archer
└── attack()
```

Namun, implementasinya berbeda:

```text
Wizard
└── attack() → menyerang menggunakan magic

Archer
└── attack() → menyerang menggunakan arrow
```

Ketika `attack()` dipanggil, Python akan menjalankan implementasi yang sesuai dengan object yang digunakan.

---

## Contoh Polymorphism

Kita dapat membuat parent class `User`:

```python
class User:

    def attack(self):
        print("do nothing")
```

Kemudian membuat child class `Wizard`:

```python
class Wizard(User):

    def __init__(self, name, power):
        self.name = name
        self.power = power

    def attack(self):
        print(f"attacking with power of {self.power}")
```

Kita juga dapat membuat child class `Archer`:

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

Perhatikan bahwa `Wizard` dan `Archer` sama-sama memiliki method:

```text
attack()
```

Tetapi masing-masing memiliki implementasi yang berbeda.

---

## Membuat Object

Kita dapat membuat object dari kedua class tersebut:

```python
wizard1 = Wizard("Merlin", 50)
archer1 = Archer("Robin", 100)
```

Sekarang terdapat dua object:

```text
wizard1
   │
   └── attack() → menggunakan power

archer1
   │
   └── attack() → menggunakan arrows
```

---

## Method Overriding

Pada contoh sebelumnya, `Wizard` dan `Archer` mendefinisikan kembali method `attack()` yang berasal dari parent class `User`.

Proses ketika child class memberikan implementasi sendiri terhadap method yang diwarisi disebut **method overriding**.

Contohnya:

```python
class User:

    def attack(self):
        print("do nothing")


class Wizard(User):

    def attack(self):
        print("attacking with magic")
```

Method `attack()` pada `Wizard` menggantikan perilaku `attack()` yang diwarisi dari `User`.

---

## Memanggil Method Secara Langsung

Kita dapat memanggil method `attack()` secara langsung dari masing-masing object:

```python
wizard1.attack()
archer1.attack()
```

Output:

```text
attacking with power of 50
attacking with arrows: arrows left - 100
```

Nama method yang dipanggil sama:

```text
attack()
```

Namun, perilaku yang dijalankan berbeda sesuai dengan object yang digunakan.

Inilah salah satu bentuk polymorphism.

---

## Polymorphism dengan Function

Polymorphism menjadi lebih menarik ketika kita membuat sebuah function yang menerima object sebagai parameter.

Contohnya:

```python
def player_attack(char):
    char.attack()
```

Function tersebut tidak perlu mengetahui apakah `char` merupakan object `Wizard` atau `Archer`.

Kita dapat mengirimkan object `Wizard`:

```python
player_attack(wizard1)
```

Output:

```text
attacking with power of 50
```

Kemudian kita dapat mengirimkan object `Archer`:

```python
player_attack(archer1)
```

Output:

```text
attacking with arrows: arrows left - 100
```

Function yang sama dapat bekerja dengan kedua jenis object tersebut.

---

## Mengapa Function tersebut Bisa Bekerja?

Perhatikan function berikut:

```python
def player_attack(char):
    char.attack()
```

Function tersebut hanya mengharapkan bahwa object yang diberikan memiliki method:

```text
attack()
```

Function tidak perlu melakukan pemeriksaan seperti:

```python
if isinstance(char, Wizard):
    ...
elif isinstance(char, Archer):
    ...
```

Selama object memiliki method `attack()`, function tersebut dapat memanggilnya.

---

## Polymorphism dengan Loop

Polymorphism juga dapat digunakan ketika melakukan perulangan terhadap beberapa object.

Contohnya:

```python
for char in [wizard1, archer1]:
    char.attack()
```

Python akan memanggil method `attack()` sesuai dengan object yang sedang diproses.

Output:

```text
attacking with power of 50
attacking with arrows: arrows left - 100
```

Perhatikan bahwa kode yang digunakan hanya satu:

```python
char.attack()
```

Namun hasilnya berbeda untuk setiap object.

---

## Visualisasi Polymorphism

Konsep tersebut dapat digambarkan sebagai berikut:

```text
                 attack()
                    │
          ┌─────────┴─────────┐
          │                   │
       Wizard               Archer
          │                   │
          ↓                   ↓
   Magic Attack        Arrow Attack
```

Method yang dipanggil memiliki nama yang sama:

```text
attack()
```

Tetapi perilakunya berbeda berdasarkan object.

---

## Polymorphism Mengurangi Conditional

Tanpa polymorphism, kita mungkin membuat kode seperti:

```python
def player_attack(char):

    if isinstance(char, Wizard):
        print(f"attacking with power of {char.power}")

    elif isinstance(char, Archer):
        print(
            f"attacking with arrows: arrows left - {char.num_arrows}"
        )
```

Kode tersebut harus mengetahui setiap jenis class yang dapat digunakan.

Ketika jumlah class semakin banyak, conditional juga akan semakin panjang.

Dengan polymorphism, function dapat dibuat lebih sederhana:

```python
def player_attack(char):
    char.attack()
```

Sekarang setiap class bertanggung jawab terhadap implementasi `attack()` masing-masing.

---

## Fleksibilitas Polymorphism

Keuntungan utama pendekatan ini adalah function menjadi lebih fleksibel.

Misalnya kita menambahkan class baru:

```python
class Knight(User):

    def attack(self):
        print("attacking with sword")
```

Kita tidak perlu mengubah function:

```python
def player_attack(char):
    char.attack()
```

Function tersebut langsung dapat digunakan:

```python
knight1 = Knight()

player_attack(knight1)
```

Output:

```text
attacking with sword
```

Hal ini menunjukkan bahwa satu function dapat bekerja dengan berbagai object yang memiliki method yang sesuai.

---

## Polymorphism dan Inheritance

Polymorphism sering digunakan bersama inheritance.

Struktur sederhananya:

```text
User
│
├── Wizard
│     └── attack()
│
├── Archer
│     └── attack()
│
└── Knight
      └── attack()
```

Setiap child class memiliki method `attack()` dengan implementasi masing-masing.

Kemudian function dapat menggunakan method tersebut tanpa perlu mengetahui detail class-nya:

```python
def player_attack(char):
    char.attack()
```

---

## Contoh Lengkap

Berikut contoh lengkap penerapan polymorphism:

```python
class User:

    def attack(self):
        print("do nothing")


class Wizard(User):

    def __init__(self, name, power):
        self.name = name
        self.power = power

    def attack(self):
        print(f"attacking with power of {self.power}")


class Archer(User):

    def __init__(self, name, num_arrows):
        self.name = name
        self.num_arrows = num_arrows

    def attack(self):
        print(
            f"attacking with arrows: arrows left - {self.num_arrows}"
        )


wizard1 = Wizard("Merlin", 50)
archer1 = Archer("Robin", 100)


def player_attack(char):
    char.attack()


player_attack(wizard1)
player_attack(archer1)
```

Output:

```text
attacking with power of 50
attacking with arrows: arrows left - 100
```

Function `player_attack()` dapat menerima object dari class yang berbeda selama object tersebut menyediakan method `attack()`.

---

## Ciri-Ciri Polymorphism

Beberapa ciri utama polymorphism:

- Beberapa class memiliki method dengan nama yang sama.
- Implementasi method dapat berbeda pada setiap class.
- Child class dapat melakukan method overriding.
- Function dapat bekerja dengan berbagai jenis object.
- Kita dapat mengurangi penggunaan conditional berdasarkan tipe class.
- Kode menjadi lebih fleksibel dan mudah dikembangkan.

---

## Manfaat Polymorphism

### Fleksibilitas

Satu function dapat bekerja dengan berbagai jenis object.

### Mengurangi Conditional

Kita tidak perlu selalu menggunakan `if` atau `elif` untuk menentukan jenis object.

### Reusability

Function yang sama dapat digunakan untuk berbagai class.

### Maintainability

Ketika menambahkan class baru, kode yang sudah ada sering kali tidak perlu diubah selama class baru menyediakan method yang diperlukan.

### Memisahkan Tanggung Jawab

Setiap class bertanggung jawab terhadap implementasi perilakunya sendiri.

---

## Kesimpulan

**Polymorphism** berarti **"banyak bentuk"**.

Dalam OOP, polymorphism memungkinkan object dari berbagai class menggunakan method dengan nama yang sama tetapi memiliki perilaku yang berbeda.

Contohnya:

```text
Wizard
└── attack() → magic

Archer
└── attack() → arrows
```

Kita kemudian dapat membuat function umum:

```python
def player_attack(char):
    char.attack()
```

Function tersebut dapat menerima object `Wizard`, `Archer`, maupun class lain yang memiliki method `attack()`.

Contoh:

```python
player_attack(wizard1)
player_attack(archer1)
```

Dengan polymorphism, kode menjadi lebih fleksibel karena kita tidak perlu mengetahui secara spesifik jenis object yang diberikan kepada function.

Konsep polymorphism juga sangat erat kaitannya dengan **inheritance** dan **method overriding**, sehingga ketiganya menjadi konsep penting dalam memahami OOP di Python.