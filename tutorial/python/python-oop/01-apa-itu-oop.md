---
sidebar_position: 1
title: "Pengenalan OOP"
---

## Pengenalan Object-Oriented Programming di Python

Setelah memahami dasar-dasar Python, kita mulai memasuki konsep **Object-Oriented Programming (OOP)**.

OOP merupakan salah satu paradigma pemrograman yang banyak digunakan untuk membangun aplikasi dengan struktur yang lebih terorganisir.

Dengan OOP, kita dapat membuat dan mengelola object yang memiliki data serta perilaku tertentu.

Sebelum mempelajari cara membuat class dan object, penting untuk memahami terlebih dahulu bagaimana Python memandang data.

---

## Everything Is an Object

Salah satu konsep penting dalam Python adalah:

> **Everything is an object.**

Artinya, hampir semua data yang kita gunakan dalam Python merupakan sebuah **object**.

Contohnya:

- Integer
- String
- List
- Dictionary
- Tuple
- Set
- Function

Misalnya ketika kita membuat sebuah angka:

```python
number = 10
```

Nilai `10` merupakan object dari tipe `int`.

Begitu juga ketika kita membuat string:

```python
name = "Budi"
```

String tersebut merupakan object dari tipe `str`.

List juga merupakan object:

```python
numbers = [1, 2, 3]
```

Object tersebut merupakan instance dari tipe `list`.

Kita dapat melihat tipe suatu object menggunakan fungsi `type()`:

```python
print(type(10))
print(type("Budi"))
print(type([1, 2, 3]))
```

Output:

```text
<class 'int'>
<class 'str'>
<class 'list'>
```

Hal ini menjadi dasar penting untuk memahami OOP di Python.

---

## Object Memiliki Data dan Perilaku

Object pada Python dapat memiliki **attribute** dan **method**.

### Attribute

Attribute dapat dipahami sebagai data atau karakteristik yang berkaitan dengan sebuah object.

### Method

Method merupakan perilaku atau fungsi yang dimiliki oleh sebuah object.

Sebagai contoh, string memiliki berbagai method untuk melakukan operasi terhadap teks:

```python
name = "budi"

print(name.upper())
```

Method `upper()` digunakan untuk mengubah string menjadi huruf kapital.

List juga memiliki method:

```python
numbers = [1, 2, 3]

numbers.append(4)
```

Method `append()` digunakan untuk menambahkan elemen ke dalam list.

Pemanggilan method seperti berikut disebut **dot notation**:

```text
object.method()
```

---

## Apa Itu Object-Oriented Programming?

**Object-Oriented Programming**, atau OOP, adalah paradigma pemrograman yang menggunakan object sebagai salah satu cara utama untuk mengorganisasi program.

Dengan OOP, kita dapat membuat object yang memiliki:

- Data.
- Perilaku.
- Hubungan dengan object lainnya.

OOP membantu kita membangun program yang lebih terstruktur, terutama ketika ukuran aplikasi semakin besar.

---

## Membuat Custom Data Type

Salah satu kemampuan penting OOP di Python adalah membuat **custom data type** menggunakan `class`.

Python sudah menyediakan berbagai tipe data bawaan seperti:

```text
int
str
list
dict
tuple
set
```

Dengan OOP, kita dapat membuat tipe data yang sesuai dengan kebutuhan aplikasi.

Misalnya dalam aplikasi toko online kita mungkin membutuhkan konsep:

```text
User
Product
Order
Payment
```

Konsep-konsep tersebut dapat direpresentasikan menggunakan class.

---

## Mengapa OOP Dibutuhkan?

Pada program yang sangat sederhana, kita mungkin cukup menggunakan:

- Variabel.
- List.
- Dictionary.
- Conditional.
- Looping.
- Function.

Namun, ketika aplikasi berkembang, jumlah data dan function dapat menjadi sangat banyak.

Jika semuanya berada dalam satu struktur program tanpa organisasi yang baik, kode dapat menjadi sulit dipahami dan dipelihara.

OOP membantu kita memecah sistem besar menjadi bagian-bagian yang lebih kecil.

---

## Mengelola Program Berskala Besar

Bayangkan kita membuat aplikasi pengiriman menggunakan drone.

Drone tersebut memiliki berbagai komponen:

- Propeller
- Camera
- Battery
- GPS
- Claw
- Communication system

Daripada mengelola seluruh komponen tersebut sebagai kumpulan variabel dan function yang tidak terorganisir, kita dapat memodelkannya sebagai bagian-bagian yang memiliki tanggung jawab masing-masing.

Secara konsep:

```text
Drone
├── Propeller
├── Camera
├── Battery
├── GPS
├── Claw
└── Communication
```

Masing-masing bagian dapat memiliki data dan perilakunya sendiri.

Pendekatan seperti ini membantu kita memahami struktur sistem dengan lebih mudah.

---

## OOP dan Representasi Dunia Nyata

Salah satu kekuatan OOP adalah kemampuannya untuk memodelkan berbagai komponen dalam sebuah sistem.

Misalnya sistem perpustakaan:

```text
Library
├── Book
├── Member
├── Librarian
└── Borrowing
```

Atau aplikasi e-commerce:

```text
Online Store
├── User
├── Product
├── Cart
├── Order
└── Payment
```

Setiap bagian dapat memiliki tanggung jawab dan hubungan tertentu.

Dengan demikian, OOP membantu kita mengubah sistem yang kompleks menjadi kumpulan komponen yang lebih mudah dipahami.

---

## Reusability

OOP juga membantu meningkatkan **reusability**, yaitu kemampuan menggunakan kembali kode atau komponen yang sudah dibuat.

Misalnya kita telah memiliki konsep object `Camera` untuk sistem drone.

Komponen tersebut dapat dikembangkan dan digunakan kembali pada sistem lain yang juga membutuhkan kamera.

Contohnya:

```text
Drone
└── Camera

Robot
└── Camera

Security System
└── Camera
```

Kita tidak perlu selalu membangun konsep kamera dari awal.

Dengan desain OOP yang baik, komponen dapat digunakan kembali pada berbagai bagian aplikasi.

---

## OOP Membantu Mengurangi Kompleksitas

Tujuan OOP bukan sekadar membuat program menggunakan banyak class.

Tujuan utamanya adalah membantu kita **mengelola kompleksitas**.

Program besar dapat dibagi menjadi beberapa komponen yang memiliki tanggung jawab tertentu.

Daripada melihat aplikasi sebagai satu program yang sangat besar:

```text
Aplikasi Besar
```

kita dapat melihatnya sebagai:

```text
Aplikasi
├── User
├── Product
├── Order
├── Payment
└── Notification
```

Setiap bagian dapat dikembangkan secara lebih terstruktur.

---

## OOP sebagai Cara Berpikir

OOP tidak hanya berkaitan dengan sintaks Python.

Yang lebih penting adalah cara berpikir dalam merancang program.

Ketika mendapatkan sebuah permasalahan, kita mulai bertanya:

1. Apa saja object yang terdapat dalam sistem?
2. Data apa yang dimiliki object tersebut?
3. Apa yang dapat dilakukan oleh object tersebut?
4. Bagaimana object tersebut berinteraksi dengan object lain?
5. Bagian mana yang dapat digunakan kembali?

Pertanyaan-pertanyaan tersebut membantu kita merancang program sebelum mulai menulis kode.

---

## Hubungan dengan Python yang Sudah Dipelajari

Konsep OOP sebenarnya bukan sesuatu yang sepenuhnya terpisah dari materi Python sebelumnya.

Kita sudah menggunakan object tanpa menyadarinya.

Contohnya:

```python
name = "Budi"
```

Variabel `name` mengacu pada object string.

Kita kemudian menggunakan method:

```python
name.upper()
```

Begitu juga dengan list:

```python
numbers = [1, 2, 3]
```

Kemudian kita menggunakan method:

```python
numbers.append(4)
```

Artinya, sebelum membuat object sendiri, kita sebenarnya sudah sering menggunakan object yang disediakan Python.

Pada tahap OOP, kita akan belajar bagaimana membuat **object dan tipe data kita sendiri**.

---

## Tujuan Pembelajaran

Setelah memahami pengantar ini, kita akan mulai mempelajari bagaimana:

- Memahami konsep object.
- Membuat custom data type.
- Membuat class.
- Membuat object dari class.
- Menambahkan attribute.
- Menambahkan method.
- Mengatur hubungan antarobject.
- Menggunakan kembali komponen program.
- Menerapkan konsep OOP dalam aplikasi nyata.

Konsep-konsep tersebut akan dipelajari secara bertahap agar hubungan antara satu konsep dengan konsep lainnya dapat dipahami dengan baik.

---

## Kesimpulan

Python menggunakan pendekatan yang sangat erat dengan object.

Bahkan tipe data yang sudah kita gunakan sejak awal pembelajaran seperti `int`, `str`, `list`, dan `dict` semuanya merupakan object.

OOP memberikan kemampuan kepada programmer untuk membuat **custom data type** menggunakan class.

Dengan pendekatan ini, program dapat dipecah menjadi object-object yang memiliki data dan perilaku masing-masing.

Manfaat utama OOP adalah membantu:

- Mengelola program yang kompleks.
- Membuat kode lebih terstruktur.
- Memodelkan sistem dunia nyata.
- Mengurangi duplikasi kode.
- Menggunakan kembali komponen.
- Mempermudah pengembangan aplikasi dalam jangka panjang.

Setelah memahami konsep dasar ini, pembelajaran selanjutnya akan masuk ke konsep yang lebih teknis, dimulai dari **Class dan Object di Python**.