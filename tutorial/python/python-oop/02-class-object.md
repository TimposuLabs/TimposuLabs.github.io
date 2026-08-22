---
sidebar_position: 2
title: "Class & Object"
---

## Class dan Object di Python

Setelah memahami konsep dasar Object-Oriented Programming, langkah berikutnya adalah memahami dua konsep fundamental dalam OOP, yaitu **class** dan **object**.

Keduanya memiliki hubungan yang sangat erat:

- **Class** adalah rancangan atau blueprint.
- **Object** adalah bentuk nyata yang dibuat berdasarkan class tersebut.

Dalam istilah OOP, object yang dibuat berdasarkan sebuah class juga disebut **instance** dari class tersebut.

Memahami hubungan antara class dan object akan menjadi dasar penting sebelum mempelajari attribute, method, constructor, inheritance, dan konsep OOP lainnya.

---

## Procedural Programming vs Object-Oriented Programming

Sebelum memahami class dan object, kita perlu melihat perbedaan pendekatan pemrograman prosedural dengan OOP.

### Procedural Programming

Pada pendekatan prosedural, program biasanya disusun sebagai sekumpulan instruksi dan function yang dijalankan berdasarkan alur tertentu.

Contoh sederhana:

```python
name = "Budi"
age = 25

print(name)
print(age)
```

Ketika program semakin besar, jumlah variabel dan function dapat semakin banyak.

Tanpa struktur yang baik, hubungan antara data dan function dapat menjadi sulit dikelola.

---

### Object-Oriented Programming

OOP menggunakan pendekatan yang berbeda.

Data dan perilaku yang berkaitan dapat dikelompokkan ke dalam sebuah object.

Misalnya kita ingin membuat program untuk mengelola mobil.

Sebuah mobil dapat memiliki data seperti:

- Warna
- Merek
- Kecepatan
- Jenis mesin

Mobil juga memiliki perilaku seperti:

- Bergerak
- Berhenti
- Mempercepat
- Mengerem

Secara konsep:

```text
Car
├── Data
│   ├── color
│   ├── brand
│   └── speed
│
└── Behavior
    ├── drive()
    ├── stop()
    └── brake()
```

Pendekatan seperti ini memungkinkan kita mengorganisasi program berdasarkan object dan tanggung jawabnya.

---

## Apa Itu Class?

**Class** adalah blueprint atau cetak biru yang digunakan untuk mendefinisikan struktur dan perilaku suatu object.

Class dapat menentukan:

- Data atau attribute yang akan dimiliki object.
- Perilaku atau method yang dapat dilakukan object.

Analogi sederhananya adalah cetak biru sebuah rumah.

Cetak biru menentukan bagaimana rumah akan dibuat, tetapi cetak biru tersebut bukan rumah yang sebenarnya.

Begitu juga dengan class.

Class merupakan rancangan, sedangkan object merupakan hasil nyata dari rancangan tersebut.

---

## Analogi Class dan Object

Bayangkan sebuah perusahaan memiliki desain mobil yang sama.

Desain mobil tersebut dapat digunakan untuk membuat banyak mobil.

Secara sederhana:

```text
Class
  ↓
Blueprint Mobil
  ↓
┌─────────────┐
│ Mobil 1     │
│ Mobil 2     │
│ Mobil 3     │
│ Mobil 4     │
└─────────────┘
```

Satu class dapat digunakan untuk membuat banyak object.

Setiap object dapat memiliki data yang berbeda meskipun berasal dari class yang sama.

---

## Membuat Class

Untuk membuat class di Python, kita menggunakan keyword `class`.

Contoh:

```python
class BigObject:
    pass
```

Pada contoh tersebut, `BigObject` merupakan nama class.

Keyword `pass` digunakan karena class tersebut belum memiliki isi.

Class tersebut dapat dianggap sebagai blueprint kosong.

---

## Konvensi Penamaan Class

Python memiliki konvensi penamaan class menggunakan **PascalCase** atau **CapWords**.

Contohnya:

```python
class BigObject:
    pass
```

```python
class UserAccount:
    pass
```

```python
class BankAccount:
    pass
```

Perhatikan bahwa setiap kata diawali dengan huruf kapital.

Umumnya kita tidak menggunakan snake_case untuk nama class.

Contoh yang tidak mengikuti konvensi:

```python
class big_object:
    pass
```

Lebih baik menggunakan:

```python
class BigObject:
    pass
```

---

## Apa Itu Object?

**Object** adalah bentuk nyata yang dibuat berdasarkan sebuah class.

Jika class merupakan blueprint, maka object merupakan hasil dari blueprint tersebut.

Misalnya kita memiliki class:

```python
class BigObject:
    pass
```

Kemudian kita membuat object:

```python
obj1 = BigObject()
```

`obj1` merupakan object yang dibuat berdasarkan class `BigObject`.

Dalam istilah OOP, `obj1` disebut **instance dari class `BigObject`**.

Kita juga dapat membuat object lainnya:

```python
obj2 = BigObject()
```

Sekarang terdapat dua object yang berbeda:

```text
BigObject
   │
   ├── obj1
   │
   └── obj2
```

Keduanya dibuat berdasarkan class yang sama.

---

## Object dan Instance

Dalam pembelajaran OOP, kita akan lebih sering menggunakan istilah **object** untuk menyebut hasil yang dibuat dari sebuah class.

Namun, istilah **instance** tetap penting untuk dipahami.

Contoh:

```python
class User:
    pass

user1 = User()
```

Pada contoh tersebut:

- `User` adalah **class**.
- `user1` adalah **object**.
- `user1` merupakan **instance dari class `User`**.

Dengan kata lain:

> **Object adalah istilah umum, sedangkan instance digunakan untuk menjelaskan bahwa sebuah object dibuat berdasarkan class tertentu.**

---

## Proses Instantiation

Proses membuat object dari sebuah class disebut **instantiation**.

Contohnya:

```python
class BigObject:
    pass

obj1 = BigObject()
```

Bagian `BigObject()` merupakan proses instantiation.

Hasilnya kemudian disimpan dalam variabel `obj1`.

Secara sederhana:

```text
class BigObject
        ↓
   BigObject()
        ↓
      Object
        ↓
      obj1
```

Setelah proses tersebut, `obj1` menjadi object atau instance dari class `BigObject`.

---

## Satu Class Dapat Memiliki Banyak Object

Salah satu keuntungan menggunakan class adalah kita dapat membuat banyak object dari class yang sama.

Contoh:

```python
class BigObject:
    pass

obj1 = BigObject()
obj2 = BigObject()
obj3 = BigObject()
```

Ketiga object tersebut berasal dari class yang sama.

```text
              BigObject
                  │
        ┌─────────┼─────────┐
        ↓         ↓         ↓
       obj1      obj2      obj3
```

Namun, setiap object merupakan object yang berbeda.

Masing-masing object dapat memiliki data yang berbeda ketika class sudah memiliki attribute.

---

## Class vs Object

Perbedaan paling penting dapat diringkas sebagai berikut:

| Konsep | Penjelasan |
|---|---|
| Class | Blueprint atau cetak biru |
| Object | Bentuk nyata yang dibuat dari class |
| Class | Mendefinisikan struktur dan perilaku |
| Object | Menggunakan struktur dan perilaku yang didefinisikan class |
| Satu class | Dapat menghasilkan banyak object |

Contoh:

```python
class User:
    pass

user1 = User()
user2 = User()
user3 = User()
```

Dalam contoh tersebut:

- `User` adalah **class**.
- `user1` adalah **object**.
- `user2` adalah **object**.
- `user3` adalah **object**.
- `user1`, `user2`, dan `user3` merupakan **instance dari class `User`**.

---

## Class Bukan Object

Penting untuk memahami bahwa class dan object bukanlah hal yang sama.

Misalnya:

```python
class User:
    pass

user1 = User()
```

`User` adalah class yang digunakan sebagai blueprint.

Sedangkan `user1` adalah object yang dibuat berdasarkan blueprint tersebut.

Secara konsep:

```text
User
↓
Blueprint

user1
↓
Object dari User
```

Hubungannya dapat digambarkan seperti berikut:

```text
              Class
                │
                │
        proses instantiation
                │
        ┌───────┴───────┐
        ↓               ↓
      Object          Object
      user1           user2
```

---

## Mengapa Menggunakan Class?

Class membantu kita membuat struktur program yang lebih terorganisir.

Misalnya kita ingin membuat aplikasi dengan banyak user.

Tanpa class, kita mungkin membuat banyak variabel secara terpisah:

```python
user1_name = "Budi"
user1_age = 25

user2_name = "Andi"
user2_age = 30
```

Jika jumlah user semakin banyak, pendekatan tersebut menjadi sulit dikelola.

Dengan OOP, kita dapat membuat sebuah class `User` sebagai blueprint.

Kemudian setiap user dapat dibuat sebagai object dari class tersebut:

```python
class User:
    pass

user1 = User()
user2 = User()
user3 = User()
```

Secara konsep:

```text
User
│
├── user1
├── user2
├── user3
└── user4
```

Struktur seperti ini jauh lebih mudah dikembangkan ketika aplikasi semakin besar.

---

## Class dan DRY

Class juga membantu menerapkan prinsip **DRY (Don't Repeat Yourself)**.

Kita tidak perlu menulis ulang struktur user untuk setiap user.

Cukup membuat blueprint satu kali:

```python
class User:
    pass
```

Kemudian gunakan blueprint tersebut untuk membuat banyak object:

```python
user1 = User()
user2 = User()
user3 = User()
```

Dengan demikian, struktur dan perilaku dapat didefinisikan pada satu tempat.

---

## Class dan Object dalam Kehidupan Nyata

Konsep class dan object dapat dianalogikan dengan berbagai objek dunia nyata.

### Mobil

```text
Class: Car

Object:
- car1
- car2
- car3
```

### User

```text
Class: User

Object:
- user1
- user2
- user3
```

### Produk

```text
Class: Product

Object:
- product1
- product2
- product3
```

### Rekening Bank

```text
Class: BankAccount

Object:
- account1
- account2
- account3
```

Class menentukan konsep dan struktur umum, sedangkan object merupakan bentuk nyata yang dibuat berdasarkan class tersebut.

---

## Kesimpulan

**Class** dan **object** merupakan konsep dasar yang sangat penting dalam OOP.

Class dapat dianalogikan sebagai **blueprint atau cetak biru**, sedangkan object merupakan **bentuk nyata yang dibuat berdasarkan blueprint tersebut**.

Contoh sederhana:

```python
class BigObject:
    pass

obj1 = BigObject()
obj2 = BigObject()
```

Pada contoh tersebut:

- `BigObject` adalah class.
- `obj1` adalah object.
- `obj2` adalah object.
- `BigObject()` merupakan proses instantiation.
- `obj1` dan `obj2` merupakan instance dari class `BigObject`.

Jadi, **object** adalah istilah utama yang kita gunakan untuk menyebut hasil dari sebuah class, sedangkan **instance** adalah istilah teknis untuk menjelaskan hubungan object tersebut dengan class asalnya.

Setelah memahami class dan object, langkah berikutnya adalah mempelajari bagaimana memberikan **attribute dan method** kepada sebuah class sehingga object yang dibuat memiliki data dan perilaku.