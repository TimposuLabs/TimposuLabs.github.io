---
sidebar_position: 7
title: "Encapsulation"
---

**Encapsulation** atau **Enkapsulasi** merupakan salah satu konsep penting dalam Object-Oriented Programming (OOP).

Secara sederhana, enkapsulasi adalah konsep **menggabungkan data dan perilaku yang berkaitan ke dalam satu class**.

Data biasanya direpresentasikan melalui **attribute**, sedangkan perilaku direpresentasikan melalui **method**.

Dengan demikian, sebuah object tidak hanya menyimpan data, tetapi juga memiliki method yang dapat digunakan untuk bekerja dengan data tersebut.

---

## Pengertian Encapsulation

Enkapsulasi dapat dipahami sebagai proses **membungkus data dan function yang berkaitan dalam satu wadah**, yaitu class.

Tanpa OOP, data dan function dapat tersebar di berbagai bagian program.

Dengan enkapsulasi, kita dapat mengelompokkan data dan perilaku yang saling berkaitan.

Secara konsep:

```text
Class
│
├── Data
│   ├── name
│   └── age
│
└── Behavior
    ├── shout()
    └── speak()
```

Data dan perilaku tersebut kemudian menjadi bagian dari object yang dibuat dari class.

---

## Contoh Encapsulation

Misalnya kita ingin merepresentasikan seorang player.

Seorang player memiliki data:

```text
name
age
```

dan memiliki perilaku:

```text
shout()
speak()
```

Kita dapat mengelompokkannya ke dalam satu class:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def shout(self):
        return f"My name is {self.name}"
```

Kemudian kita dapat membuat object:

```python
player1 = PlayerCharacter("Andrei", 100)
```

Object tersebut memiliki data dan perilaku:

```text
player1
│
├── name = "Andrei"
├── age = 100
│
└── shout()
```

Inilah salah satu bentuk sederhana dari enkapsulasi.

---

## Data dan Perilaku dalam Satu Class

Salah satu manfaat utama enkapsulasi adalah data dan operasi terhadap data tersebut dapat ditempatkan dalam satu class.

Contohnya:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def shout(self):
        return f"My name is {self.name}"
```

Pada contoh tersebut:

```text
Data
├── name
└── age

Perilaku
└── shout()
```

Keduanya berada dalam class `PlayerCharacter`.

Dengan demikian, kita dapat memahami object sebagai sebuah unit yang memiliki **data dan perilaku**.

---

## Mengakses Attribute

Object dapat digunakan untuk mengakses attribute yang dimilikinya.

Contoh:

```python
player1 = PlayerCharacter("Andrei", 100)

print(player1.name)
print(player1.age)
```

Output:

```text
Andrei
100
```

Attribute tersebut merupakan data yang dimiliki oleh object `player1`.

---

## Mengakses Method

Object juga dapat menjalankan method yang didefinisikan di dalam class.

Contoh:

```python
player1 = PlayerCharacter("Andrei", 100)

print(player1.shout())
```

Output:

```text
My name is Andrei
```

Method `shout()` dapat mengakses data `name` melalui `self`.

```python
def shout(self):
    return f"My name is {self.name}"
```

Dengan demikian, method dapat bekerja dengan data yang dimiliki object.

---

## Bundling Data dan Perilaku

Salah satu tujuan utama enkapsulasi adalah **bundling**, yaitu mengelompokkan data dan operasi yang berkaitan.

Tanpa enkapsulasi, kita mungkin memiliki struktur seperti:

```text
Data Player
    ↓
name
age

Function Player
    ↓
shout()
speak()
attack()
```

Data dan function dapat tersebar di berbagai bagian program.

Dengan enkapsulasi:

```text
PlayerCharacter
│
├── name
├── age
├── shout()
├── speak()
└── attack()
```

Semua komponen yang berkaitan dengan player dapat dikelompokkan dalam satu class.

---

## Encapsulation dan Pemodelan Dunia Nyata

Enkapsulasi juga membantu kita memodelkan berbagai objek dalam dunia nyata.

Misalnya sebuah **Bank Account** memiliki data:

```text
account_number
owner
balance
```

dan perilaku:

```text
deposit()
withdraw()
check_balance()
```

Secara konsep:

```text
BankAccount
│
├── Data
│   ├── account_number
│   ├── owner
│   └── balance
│
└── Behavior
    ├── deposit()
    ├── withdraw()
    └── check_balance()
```

Semua komponen tersebut dapat dikelompokkan dalam class `BankAccount`.

---

## Encapsulation dan Reusability

Setelah sebuah class dibuat, kita dapat menggunakannya untuk membuat banyak object.

Contohnya:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def shout(self):
        return f"My name is {self.name}"
```

Kemudian:

```python
player1 = PlayerCharacter("Andrei", 100)
player2 = PlayerCharacter("Budi", 25)
player3 = PlayerCharacter("Andi", 30)
```

Ketiga object tersebut memiliki struktur dan perilaku yang berasal dari class yang sama.

Secara konsep:

```text
             PlayerCharacter
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
     player1     player2     player3
        │           │           │
      Data        Data        Data
      Method      Method      Method
```

Kita tidak perlu menulis ulang seluruh struktur untuk setiap player.

---

## Encapsulation Membantu Organisasi Program

Ketika aplikasi semakin besar, jumlah data dan function dapat bertambah dengan cepat.

Tanpa struktur yang baik, program dapat menjadi sulit dipahami dan dipelihara.

Enkapsulasi membantu mengelompokkan bagian-bagian program berdasarkan tanggung jawabnya.

Contohnya pada aplikasi e-commerce:

```text
Application
│
├── User
│   ├── name
│   ├── email
│   └── login()
│
├── Product
│   ├── name
│   ├── price
│   └── display()
│
├── Cart
│   ├── items
│   └── add_product()
│
└── Order
    ├── order_number
    └── checkout()
```

Setiap class memiliki data dan perilaku yang berkaitan dengan tanggung jawabnya.

---

## Encapsulation Bukan Sekadar Membuat Data Private

Perlu diperhatikan bahwa enkapsulasi tidak hanya berarti membuat attribute menjadi private.

Dalam konteks dasar OOP, inti enkapsulasi adalah **menggabungkan data dan perilaku yang berkaitan ke dalam satu unit**.

Konsep seperti public, protected, private, getter, dan setter merupakan pembahasan lanjutan mengenai bagaimana akses terhadap data tersebut dikontrol.

Jadi, jangan menganggap:

```text
Encapsulation = Private Attribute
```

Secara konsep yang lebih luas:

```text
Encapsulation
=
Data
+
Behavior
+
Organisasi
+
Kontrol Akses
```

---

## Hubungan Encapsulation dengan Object

Object yang dibuat dari sebuah class membawa struktur yang telah didefinisikan oleh class tersebut.

Misalnya:

```python
player1 = PlayerCharacter("Andrei", 100)
```

Object `player1` memiliki:

```text
player1
│
├── name
├── age
└── shout()
```

Object tersebut menjadi satu unit yang memiliki data dan perilaku.

---

## Manfaat Encapsulation

Enkapsulasi memberikan beberapa manfaat dalam pengembangan program.

### 1. Organisasi Kode

Data dan perilaku yang berkaitan dikelompokkan dalam satu class.

### 2. Keterbacaan

Struktur program menjadi lebih mudah dipahami karena setiap class memiliki tanggung jawab tertentu.

### 3. Maintainability

Program lebih mudah diperbaiki dan dikembangkan karena komponen program terorganisir.

### 4. Reusability

Satu class dapat digunakan untuk membuat banyak object.

### 5. Pemodelan Sistem

Konsep dunia nyata dapat direpresentasikan menjadi object dalam program.

### 6. Kontrol Akses

Pada pembahasan OOP yang lebih lanjut, enkapsulasi dapat digunakan untuk mengontrol bagaimana data diakses dan dimodifikasi.

---

## Contoh Sederhana

Berikut contoh sederhana penerapan enkapsulasi:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def shout(self):
        return f"My name is {self.name}"

    def introduce(self):
        return f"My name is {self.name} and I am {self.age} years old"
```

Kemudian:

```python
player1 = PlayerCharacter("Andrei", 100)

print(player1.name)
print(player1.age)
print(player1.shout())
print(player1.introduce())
```

Output:

```text
Andrei
100
My name is Andrei
My name is Andrei and I am 100 years old
```

Data dan method yang berkaitan dengan player berada dalam satu class.

---

## Gambaran Konsep

Secara sederhana, enkapsulasi dapat digambarkan seperti berikut:

```text
                 Class
                   │
          ┌────────┴────────┐
          │                 │
        Data             Behavior
          │                 │
     ┌────┴────┐        ┌───┴────┐
     │         │        │        │
    name      age     shout()  speak()
          │                 │
          └────────┬────────┘
                   ↓
                Object
```

Class menggabungkan data dan perilaku yang berkaitan sehingga object dapat digunakan sebagai satu unit.

---

## Kesimpulan

**Encapsulation** adalah konsep OOP yang menggabungkan data dan perilaku yang berkaitan ke dalam satu class.

Contohnya:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def shout(self):
        return f"My name is {self.name}"
```

Pada class tersebut:

- `name` dan `age` merupakan data atau attribute.
- `shout()` merupakan perilaku atau method.
- Semuanya berada dalam satu class `PlayerCharacter`.

Ketika object dibuat:

```python
player1 = PlayerCharacter("Andrei", 100)
```

object tersebut memiliki data dan perilaku yang berasal dari class.

Dengan enkapsulasi, program menjadi lebih terorganisir, mudah dibaca, mudah dipelihara, dan lebih mudah dikembangkan.

Setelah memahami enkapsulasi sebagai konsep **penggabungan data dan perilaku**, pembelajaran selanjutnya dapat dilanjutkan ke konsep **abstraction**, yaitu bagaimana menyederhanakan penggunaan object dengan menyembunyikan detail implementasi yang tidak perlu diketahui oleh pengguna.