---
sidebar_position: 12
title: "super()"
---

Setelah memahami konsep dasar inheritance, kita perlu memahami bagaimana **child class** dapat menggunakan constructor yang dimiliki oleh **parent class**.

Dalam Python, ketika child class memiliki method `__init__()` sendiri, constructor tersebut akan menggantikan constructor dari parent class.

Untuk tetap menggunakan constructor parent class, kita dapat menggunakan `super()`.

---

## Masalah: Child Class Memiliki Constructor Sendiri

Misalnya kita memiliki parent class `User` yang memiliki constructor:

```python
class User:

    def __init__(self, email):
        self.email = email
```

Kemudian kita membuat child class `Wizard`:

```python
class Wizard(User):

    def __init__(self, name, power):
        self.name = name
        self.power = power
```

Ketika membuat object:

```python
wizard1 = Wizard("Merlin", 60)
```

`Wizard` memiliki constructor sendiri sehingga constructor `User` tidak dipanggil.

Akibatnya, atribut `email` yang seharusnya dibuat oleh constructor `User` tidak tersedia pada object `wizard1`.

Jika kita mencoba:

```python
print(wizard1.email)
```

Python akan menghasilkan error:

```text
AttributeError
```

---

## Mengapa Hal Ini Terjadi?

Perhatikan struktur inheritance berikut:

```text
User
│
├── __init__(email)
│
└── Wizard
     │
     └── __init__(name, power)
```

Ketika `Wizard` memiliki `__init__()` sendiri, Python menggunakan constructor milik `Wizard` ketika object `Wizard` dibuat.

Constructor milik `User` tidak otomatis dijalankan dalam kondisi tersebut.

Oleh karena itu, atribut yang dibuat oleh constructor `User`, seperti `email`, belum tersedia.

---

## Solusi 1: Memanggil Parent Constructor Secara Langsung

Salah satu cara untuk mengatasi masalah tersebut adalah memanggil constructor parent class secara langsung.

Contoh:

```python
class User:

    def __init__(self, email):
        self.email = email


class Wizard(User):

    def __init__(self, name, power, email):
        User.__init__(self, email)

        self.name = name
        self.power = power
```

Kemudian kita dapat membuat object:

```python
wizard1 = Wizard(
    "Merlin",
    60,
    "merlin@gmail.com"
)
```

Sekarang atribut `email` sudah tersedia:

```python
print(wizard1.email)
```

Output:

```text
merlin@gmail.com
```

---

## Cara Kerja Pemanggilan Constructor Parent

Perhatikan baris berikut:

```python
User.__init__(self, email)
```

Baris tersebut secara langsung memanggil method `__init__()` milik class `User`.

Parameter `self` harus diberikan secara eksplisit karena kita memanggil method tersebut melalui nama class.

Secara konsep:

```text
Wizard.__init__()
       │
       ↓
User.__init__()
       │
       ↓
self.email dibuat
```

---

## Kekurangan Memanggil Parent Class Secara Langsung

Meskipun cara tersebut dapat digunakan, kita harus menuliskan nama parent class secara eksplisit:

```python
User.__init__(self, email)
```

Hal ini dapat menjadi kurang fleksibel ketika struktur inheritance semakin kompleks.

Selain itu, kita juga harus menuliskan `self` secara manual.

Python menyediakan solusi yang lebih baik melalui `super()`.

---

## Solusi 2: Menggunakan super()

`super()` digunakan untuk mengakses parent class dari sebuah class.

Dengan `super()`, kita tidak perlu menyebutkan nama parent class secara langsung.

Contohnya:

```python
class User:

    def __init__(self, email):
        self.email = email


class Wizard(User):

    def __init__(self, name, power, email):
        super().__init__(email)

        self.name = name
        self.power = power
```

Kemudian:

```python
wizard1 = Wizard(
    "Merlin",
    60,
    "merlin@gmail.com"
)
```

Atribut `email` tetap tersedia:

```python
print(wizard1.email)
```

Output:

```text
merlin@gmail.com
```

---

## Apa yang Dilakukan super()?

Pada contoh:

```python
super().__init__(email)
```

`super()` merujuk pada parent class dalam konteks inheritance.

Kemudian:

```python
.__init__(email)
```

memanggil constructor parent class.

Secara sederhana:

```text
Wizard
  │
  │ super()
  ↓
User
  │
  └── __init__(email)
```

Dengan demikian, constructor `User` tetap dapat digunakan oleh `Wizard`.

---

## Perbandingan Dua Pendekatan

### Memanggil Parent Class Secara Langsung

```python
User.__init__(self, email)
```

Karakteristik:

- Menyebutkan nama parent class secara langsung.
- Harus memberikan `self`.
- Dapat digunakan untuk memanggil constructor parent.

### Menggunakan super()

```python
super().__init__(email)
```

Karakteristik:

- Tidak perlu menyebutkan nama parent class.
- Tidak perlu memberikan `self`.
- Lebih bersih dan lebih sesuai untuk struktur inheritance.

---

## Contoh Lengkap

Berikut contoh lengkap penggunaan `super()`:

```python
class User:

    def __init__(self, email):
        self.email = email

    def sign_in(self):
        print("logged in")


class Wizard(User):

    def __init__(self, name, power, email):
        super().__init__(email)

        self.name = name
        self.power = power

    def attack(self):
        print(
            f"attacking with power of {self.power}"
        )


wizard1 = Wizard(
    "Merlin",
    60,
    "merlin@gmail.com"
)

print(wizard1.name)
print(wizard1.power)
print(wizard1.email)

wizard1.sign_in()
wizard1.attack()
```

Output:

```text
Merlin
60
merlin@gmail.com
logged in
attacking with power of 60
```

Object `wizard1` memiliki atribut dan method yang berasal dari dua class:

```text
User
├── email
└── sign_in()

Wizard
├── name
├── power
└── attack()
```

---

## super() Tidak Hanya untuk __init__()

Meskipun `super()` sering digunakan untuk memanggil constructor parent class, penggunaannya tidak terbatas pada `__init__()`.

Kita juga dapat menggunakannya untuk memanggil method milik parent class.

Contoh:

```python
class User:

    def sign_in(self):
        print("User signed in")


class Wizard(User):

    def sign_in(self):
        super().sign_in()
        print("Wizard signed in")
```

Kemudian:

```python
wizard1 = Wizard()

wizard1.sign_in()
```

Output:

```text
User signed in
Wizard signed in
```

Pada contoh tersebut, `super().sign_in()` menjalankan method `sign_in()` milik parent class terlebih dahulu.

---

## Mengapa super() Penting?

Penggunaan `super()` membantu child class menggunakan kembali perilaku yang sudah dibuat pada parent class.

Tanpa `super()`, kita mungkin perlu menulis ulang kode parent class.

Dengan `super()`:

```python
class Wizard(User):

    def __init__(self, name, power, email):
        super().__init__(email)
        self.name = name
        self.power = power
```

Child class hanya perlu menambahkan bagian yang spesifik untuk dirinya sendiri.

Hal ini membantu menerapkan prinsip:

**DRY (Don't Repeat Yourself)**

---

## Alur Constructor dengan super()

Ketika kita menjalankan:

```python
wizard1 = Wizard(
    "Merlin",
    60,
    "merlin@gmail.com"
)
```

Python menjalankan:

```text
Wizard.__init__()
       │
       ├── super().__init__()
       │        │
       │        ↓
       │    User.__init__()
       │        │
       │        └── self.email
       │
       ├── self.name
       │
       └── self.power
```

Hasil akhirnya, object `wizard1` memiliki:

```text
wizard1
├── name
├── power
└── email
```

---

## Kesimpulan

Ketika child class memiliki `__init__()` sendiri, constructor parent class tidak otomatis digunakan sebagai constructor child class.

Jika child class tetap membutuhkan proses inisialisasi dari parent class, kita dapat memanggil constructor tersebut.

Cara pertama adalah memanggil parent class secara langsung:

```python
User.__init__(self, email)
```

Cara yang lebih umum dan bersih adalah menggunakan:

```python
super().__init__(email)
```

`super()` memungkinkan child class mengakses constructor atau method milik parent class tanpa harus menyebutkan nama parent class secara langsung.

Konsep ini sangat penting dalam inheritance, terutama ketika child class memiliki atribut dan perilaku tambahan tetapi tetap ingin menggunakan fitur yang sudah tersedia pada parent class.

Materi berikutnya dapat dilanjutkan dengan **Multiple Inheritance dan Method Resolution Order (MRO)** untuk memahami bagaimana Python menentukan parent class yang digunakan ketika sebuah class memiliki lebih dari satu parent.