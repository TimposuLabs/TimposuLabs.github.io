---
sidebar_position: 16
title: "Multiple Inheritance"
---

**Multiple Inheritance** atau pewarisan berganda adalah kemampuan sebuah **child class** untuk mewarisi atribut dan method dari **lebih dari satu parent class**.

Pada inheritance biasa, sebuah child class memiliki satu parent class:

```text
Parent
   │
   ↓
Child
```

Sedangkan pada multiple inheritance, sebuah child class dapat memiliki beberapa parent class:

```text
Parent 1 ──┐
           ├──> Child
Parent 2 ──┘
```

Python mendukung multiple inheritance.

---

## Contoh Multiple Inheritance

Misalnya kita memiliki class `User`:

```python
class User:

    def sign_in(self):
        print("logged in")
```

Kemudian kita membuat class `Wizard` yang mewarisi `User`:

```python
class Wizard(User):

    def __init__(self, name, power):
        self.name = name
        self.power = power

    def attack(self):
        print(
            f"attacking with power of {self.power}"
        )
```

Kita juga membuat class `Archer` yang mewarisi `User`:

```python
class Archer(User):

    def __init__(self, name, arrows):
        self.name = name
        self.arrows = arrows

    def check_arrows(self):
        print(
            f"{self.arrows} remaining"
        )
```

Struktur inheritance saat ini:

```text
        User
       /    \
      /      \
  Wizard    Archer
```

---

## Membuat Multiple Inheritance

Sekarang kita dapat membuat class `HybridBorg` yang mewarisi `Wizard` dan `Archer` sekaligus:

```python
class HybridBorg(Wizard, Archer):

    def __init__(self, name, power, arrows):
        Archer.__init__(self, name, arrows)
        Wizard.__init__(self, name, power)
```

Perhatikan bagian:

```python
class HybridBorg(Wizard, Archer):
```

Artinya `HybridBorg` memiliki dua parent class:

```text
Wizard
   \
    \
  HybridBorg
    /
   /
Archer
```

---

## Membuat Object HybridBorg

Kita dapat membuat object:

```python
hb1 = HybridBorg(
    "borgie",
    50,
    100
)
```

Object `hb1` memiliki kemampuan yang berasal dari `HybridBorg`, `Wizard`, `Archer`, dan `User`.

Secara konsep:

```text
User
├── sign_in()

Wizard
├── attack()
└── name
    power

Archer
├── check_arrows()
└── name
    arrows

HybridBorg
└── mewarisi Wizard dan Archer
```

---

## Mengakses Method dari Parent Class

Karena `HybridBorg` mewarisi `Archer`, object `hb1` dapat menggunakan:

```python
hb1.check_arrows()
```

Output:

```text
100 remaining
```

Object tersebut juga dapat menggunakan method `attack()` dari `Wizard`:

```python
hb1.attack()
```

Output:

```text
attacking with power of 50
```

Selain itu, `Wizard` dan `Archer` sama-sama merupakan turunan dari `User`.

Oleh karena itu, `hb1` juga dapat menggunakan:

```python
hb1.sign_in()
```

Output:

```text
logged in
```

---

## Contoh Lengkap

Berikut implementasi lengkap:

```python
class User:

    def sign_in(self):
        print("logged in")


class Wizard(User):

    def __init__(self, name, power):
        self.name = name
        self.power = power

    def attack(self):
        print(
            f"attacking with power of {self.power}"
        )


class Archer(User):

    def __init__(self, name, arrows):
        self.name = name
        self.arrows = arrows

    def check_arrows(self):
        print(
            f"{self.arrows} remaining"
        )


class HybridBorg(Wizard, Archer):

    def __init__(self, name, power, arrows):
        Archer.__init__(
            self,
            name,
            arrows
        )

        Wizard.__init__(
            self,
            name,
            power
        )


hb1 = HybridBorg(
    "borgie",
    50,
    100
)

hb1.check_arrows()
hb1.attack()
hb1.sign_in()
```

Output:

```text
100 remaining
attacking with power of 50
logged in
```

---

## Mengapa Constructor Parent Harus Diperhatikan?

Perhatikan constructor `Wizard`:

```python
def __init__(self, name, power):
    self.name = name
    self.power = power
```

Sedangkan `Archer` memiliki:

```python
def __init__(self, name, arrows):
    self.name = name
    self.arrows = arrows
```

`HybridBorg` membutuhkan atribut dari kedua class tersebut.

Karena itu, constructor kedua parent dipanggil:

```python
Archer.__init__(
    self,
    name,
    arrows
)

Wizard.__init__(
    self,
    name,
    power
)
```

Dengan demikian, atribut dari kedua parent dapat diinisialisasi.

---

## Atribut yang Dimiliki HybridBorg

Setelah object dibuat:

```python
hb1 = HybridBorg(
    "borgie",
    50,
    100
)
```

object `hb1` memiliki atribut:

```text
name
power
arrows
```

dan method:

```text
attack()
check_arrows()
sign_in()
```

Secara konsep:

```text
HybridBorg
│
├── name
├── power
├── arrows
│
├── attack()
├── check_arrows()
└── sign_in()
```

---

## Multiple Inheritance dan Reusability

Salah satu manfaat multiple inheritance adalah memungkinkan sebuah class menggabungkan kemampuan dari beberapa class.

Misalnya:

```text
Wizard
├── magic ability
└── attack()

Archer
├── arrow ability
└── check_arrows()

        ↓

HybridBorg
├── magic ability
├── arrow ability
├── attack()
└── check_arrows()
```

Dengan demikian, `HybridBorg` dapat menggunakan kembali kemampuan yang sudah dibuat pada parent class.

---

## Kompleksitas Multiple Inheritance

Walaupun multiple inheritance memberikan fleksibilitas, penggunaannya juga dapat membuat struktur program menjadi lebih kompleks.

Misalnya:

```text
Class A
   │
   ├──────┐
   ↓      ↓
Class B  Class C
   │      │
   └──┬───┘
      ↓
   Class D
```

Ketika beberapa class memiliki method dengan nama yang sama, Python perlu menentukan method mana yang harus digunakan.

Di sinilah konsep **Method Resolution Order (MRO)** menjadi penting.

---

## Diamond Problem

Multiple inheritance dapat menghasilkan struktur yang dikenal sebagai **Diamond Problem**.

Contohnya:

```text
        A
       / \
      B   C
       \ /
        D
```

Class `D` mewarisi `B` dan `C`.

Sementara `B` dan `C` sama-sama mewarisi `A`.

Jika `A`, `B`, dan `C` memiliki method dengan nama yang sama, Python harus menentukan urutan pencarian method tersebut.

Python menggunakan **Method Resolution Order (MRO)** untuk menentukan urutan tersebut.

---

## Method Resolution Order

MRO menentukan urutan Python dalam mencari method atau attribute pada hierarchy inheritance.

Kita dapat melihat MRO menggunakan:

```python
print(HybridBorg.mro())
```

atau:

```python
print(HybridBorg.__mro__)
```

Python akan menampilkan urutan class yang digunakan ketika mencari method.

Secara sederhana:

```text
HybridBorg
      ↓
Wizard
      ↓
Archer
      ↓
User
      ↓
object
```

Urutan sebenarnya ditentukan oleh aturan MRO Python dan dapat berbeda tergantung struktur inheritance.

---

## Multiple Inheritance dan `super()`

Pada struktur inheritance yang sederhana, kita mungkin memanggil parent constructor secara langsung:

```python
Wizard.__init__(
    self,
    name,
    power
)
```

Namun pada multiple inheritance yang kompleks, penggunaan `super()` menjadi sangat penting karena Python dapat mengikuti **MRO**.

Contoh sederhana:

```python
class User:

    def sign_in(self):
        print("logged in")


class Wizard(User):

    def attack(self):
        print("magic attack")


class Archer(User):

    def check_arrows(self):
        print("checking arrows")


class HybridBorg(Wizard, Archer):

    pass
```

Python akan menentukan urutan pencarian method berdasarkan MRO.

---

## Kapan Menggunakan Multiple Inheritance?

Multiple inheritance sebaiknya digunakan ketika hubungan antar class memang memiliki desain yang jelas.

Contoh yang masuk akal:

```text
Flyable
Swimmable
    ↓
Duck
```

Object `Duck` dapat memiliki kemampuan:

```text
Flyable
└── fly()

Swimmable
└── swim()

Duck
└── fly()
└── swim()
```

Dalam desain seperti ini, multiple inheritance dapat membantu menggabungkan kemampuan yang berbeda.

---

## Kapan Sebaiknya Dihindari?

Multiple inheritance sebaiknya dihindari jika hierarchy menjadi terlalu rumit.

Misalnya:

```text
A
├── B
│   ├── D
│   └── E
│
└── C
    ├── F
    └── G
```

Jika semakin banyak class yang saling mewarisi, akan semakin sulit memahami:

- Dari mana sebuah method berasal.
- Constructor mana yang dipanggil.
- Method mana yang diprioritaskan.
- Bagaimana MRO bekerja.
- Bagaimana perubahan satu parent memengaruhi child class.

Dalam kondisi seperti ini, desain menggunakan **composition** sering kali dapat menjadi alternatif yang lebih sederhana.

---

## Kelebihan Multiple Inheritance

Beberapa manfaat multiple inheritance:

- Dapat mewarisi fitur dari beberapa class.
- Meningkatkan penggunaan kembali kode.
- Dapat menggabungkan beberapa kemampuan ke dalam satu class.
- Mengurangi kebutuhan untuk menulis ulang method yang sudah tersedia.

---

## Kekurangan Multiple Inheritance

Multiple inheritance juga memiliki beberapa risiko:

- Struktur inheritance menjadi lebih kompleks.
- Constructor parent harus diperhatikan.
- Dapat menimbulkan konflik method.
- MRO harus dipahami.
- Dapat menghasilkan Diamond Problem.
- Perubahan pada parent class dapat memengaruhi banyak child class.

Karena itu, multiple inheritance sebaiknya digunakan secara **bijak dan seperlunya**.

---

## Kesimpulan

**Multiple Inheritance** memungkinkan sebuah child class mewarisi lebih dari satu parent class.

Contohnya:

```python
class HybridBorg(Wizard, Archer):
    pass
```

Dengan inheritance tersebut, `HybridBorg` dapat memperoleh kemampuan dari:

```text
Wizard
Archer
User
object
```

Contoh:

```python
hb1.check_arrows()
hb1.attack()
hb1.sign_in()
```

Multiple inheritance memberikan fleksibilitas dan reusability, tetapi juga meningkatkan kompleksitas program.

Karena itu, ketika menggunakan multiple inheritance, penting untuk memahami:

- Constructor parent.
- `super()`.
- Method Resolution Order (MRO).
- Diamond Problem.

Gunakan multiple inheritance ketika hubungan antar class memang jelas dan memberikan manfaat desain yang nyata. Jika hierarchy menjadi terlalu kompleks, pertimbangkan pendekatan lain seperti **composition**.