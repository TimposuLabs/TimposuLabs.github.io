---
sidebar_position: 13
title: "Object Introspection"
---

**Object Introspection** atau introspeksi object adalah kemampuan Python untuk memeriksa dan mengetahui informasi mengenai sebuah object saat program sedang berjalan atau pada saat **runtime**.

Karena hampir semua hal di Python merupakan object, kita dapat melakukan introspeksi untuk mengetahui berbagai informasi yang dimiliki oleh object tersebut.

Introspeksi dapat membantu kita memahami:

- Atribut yang dimiliki object.
- Method yang dapat digunakan.
- Dunder methods yang tersedia.
- Fitur yang diwarisi dari parent class.

---

## Apa Itu Introspection?

Secara sederhana, introspection adalah proses **memeriksa object dari dalam program untuk mengetahui kemampuan dan informasi yang dimilikinya**.

Misalnya kita memiliki object:

```python
wizard1 = Wizard(
    "Merlin",
    60,
    "merlin@gmail.com"
)
```

Kita mungkin ingin mengetahui:

- Method apa saja yang tersedia?
- Attribute apa saja yang dimiliki?
- Apakah object memiliki method tertentu?
- Method bawaan apa yang diwarisi?

Python menyediakan beberapa fitur untuk membantu melakukan pemeriksaan tersebut.

Salah satu fungsi yang paling sering digunakan adalah `dir()`.

---

## Fungsi `dir()`

Python menyediakan fungsi bawaan `dir()` untuk melakukan introspeksi terhadap sebuah object.

Sintaksnya:

```python
dir(object)
```

Fungsi `dir()` mengembalikan daftar nama attribute dan method yang dapat digunakan atau ditemukan pada object tersebut.

---

## Contoh Penggunaan `dir()`

Misalnya kita memiliki class:

```python
class Wizard:

    def __init__(self, name, power):
        self.name = name
        self.power = power

    def attack(self):
        print(
            f"attacking with power of {self.power}"
        )
```

Kemudian membuat object:

```python
wizard1 = Wizard("Merlin", 60)
```

Kita dapat menggunakan `dir()`:

```python
print(dir(wizard1))
```

Python akan menghasilkan sebuah list yang berisi berbagai nama attribute dan method yang tersedia pada object tersebut.

Hasilnya dapat berisi nama seperti:

```text
[
    '__class__',
    '__dict__',
    '__init__',
    '__str__',
    ...
    'attack',
    'name',
    'power'
]
```

Daftar lengkap dapat berbeda tergantung pada class dan lingkungan Python yang digunakan.

---

## Melihat Attribute dan Method

Salah satu manfaat `dir()` adalah membantu kita menemukan attribute dan method yang tersedia pada object.

Misalnya object `wizard1` memiliki:

```text
name
power
attack
```

Maka nama-nama tersebut dapat ditemukan melalui:

```python
dir(wizard1)
```

Dengan demikian, kita dapat mengetahui kemampuan object tanpa harus selalu membaca seluruh source code class.

---

## Introspection dan Dunder Methods

Ketika menggunakan `dir()`, kita juga akan menemukan banyak nama yang diawali dan diakhiri dengan dua underscore.

Contohnya:

```text
__class__
__dict__
__init__
__str__
__repr__
```

Method atau attribute dengan pola seperti tersebut disebut **dunder** atau **double underscore**.

Dunder methods memiliki fungsi khusus dalam sistem object Python.

Contohnya:

```python
print(wizard1.__class__)
```

Informasi tersebut dapat digunakan untuk mengetahui class dari object yang sedang diperiksa.

---

## Introspection pada Inheritance

Object juga dapat memiliki attribute dan method yang berasal dari parent class.

Misalnya:

```python
class User:

    def sign_in(self):
        print("logged in")


class Wizard(User):

    def attack(self):
        print("attacking")
```

Kemudian:

```python
wizard1 = Wizard()
```

Object `wizard1` memiliki method:

```python
wizard1.attack()
```

Tetapi juga memiliki akses ke method yang diwarisi dari `User`:

```python
wizard1.sign_in()
```

Kita dapat melihat nama-nama tersebut menggunakan:

```python
print(dir(wizard1))
```

Introspection membantu kita melihat bahwa object memiliki kemampuan yang berasal dari class-nya sendiri maupun dari inheritance.

---

## Introspection dengan Built-in Object

Introspection tidak hanya dapat digunakan pada object yang kita buat sendiri.

Kita juga dapat menggunakannya pada object bawaan Python.

Contohnya:

```python
numbers = [1, 2, 3]

print(dir(numbers))
```

Hasilnya akan menampilkan berbagai method dan attribute yang tersedia pada object `list`.

Kita dapat menemukan method seperti:

```text
append
clear
copy
extend
insert
pop
remove
reverse
sort
```

serta berbagai dunder methods.

---

## Introspection pada String

Hal yang sama dapat dilakukan terhadap string:

```python
name = "Budi"

print(dir(name))
```

Kita akan menemukan berbagai method yang dimiliki object `str`.

Contohnya:

```text
upper
lower
split
replace
strip
startswith
endswith
```

Dengan `dir()`, kita dapat melihat fitur yang tersedia tanpa harus menghafalnya satu per satu.

---

## Hubungan dengan Auto-Complete pada IDE

Ketika kita menggunakan editor seperti VS Code atau PyCharm, kita sering mendapatkan fitur **auto-completion**.

Misalnya:

```python
wizard1.
```

Editor kemudian menampilkan berbagai pilihan method dan attribute:

```text
attack
name
power
sign_in
...
```

Mekanisme introspection dan informasi mengenai object merupakan bagian penting yang memungkinkan editor memberikan bantuan seperti ini.

Dengan demikian, ketika kita mengetik titik setelah sebuah object:

```python
wizard1.
```

editor dapat membantu menunjukkan apa saja yang tersedia pada object tersebut.

---

## Introspection untuk Belajar

`dir()` juga sangat berguna ketika sedang mempelajari Python.

Misalnya kita tidak mengetahui method apa saja yang tersedia pada `list`.

Daripada menghafal semuanya, kita dapat mencoba:

```python
numbers = [1, 2, 3]

print(dir(numbers))
```

Kemudian kita dapat mempelajari method yang muncul.

Contohnya:

```python
numbers.append(4)
```

atau:

```python
numbers.pop()
```

Dengan cara ini, introspection dapat menjadi salah satu alat untuk mengeksplorasi object Python.

---

## Introspection dan `help()`

Selain `dir()`, Python juga menyediakan fungsi `help()`.

`dir()` terutama digunakan untuk melihat **nama attribute dan method** yang tersedia.

Sedangkan `help()` dapat digunakan untuk melihat **dokumentasi dan informasi lebih lanjut**.

Contohnya:

```python
help(wizard1)
```

Atau:

```python
help(list)
```

Keduanya dapat digunakan untuk membantu memahami object atau class yang sedang digunakan.

---

## Perbedaan `dir()` dan `help()`

| Fungsi | Kegunaan |
|---|---|
| `dir()` | Melihat daftar attribute dan method |
| `help()` | Melihat dokumentasi dan informasi lebih lengkap |

Contoh:

```python
print(dir(wizard1))
```

digunakan untuk melihat daftar nama yang tersedia.

Sedangkan:

```python
help(wizard1)
```

digunakan untuk mendapatkan informasi dan dokumentasi mengenai object tersebut.

---

## Contoh Introspection Sederhana

Berikut contoh lengkap:

```python
class Wizard:

    def __init__(self, name, power):
        self.name = name
        self.power = power

    def attack(self):
        print(
            f"attacking with power of {self.power}"
        )


wizard1 = Wizard("Merlin", 60)

print(dir(wizard1))
```

Kita juga dapat melihat class dari object:

```python
print(wizard1.__class__)
```

Dan melihat dokumentasi:

```python
help(wizard1)
```

Ketiga pendekatan tersebut memberikan informasi yang berbeda mengenai object.

---

## Manfaat Object Introspection

Object introspection memiliki beberapa manfaat.

### Mengetahui Kemampuan Object

Kita dapat mengetahui method dan attribute yang tersedia pada object.

### Membantu Debugging

Ketika menemukan object yang tidak kita pahami, `dir()` dapat membantu melihat apa saja yang tersedia.

### Membantu Belajar Python

Kita dapat mengeksplorasi built-in object seperti `list`, `dict`, `str`, dan lainnya.

### Membantu Pengembangan Program

Introspection membantu programmer memahami struktur dan kemampuan object yang digunakan.

### Mendukung Auto-Completion

Informasi mengenai object membantu IDE memberikan saran attribute dan method ketika menulis kode.

---

## Kesimpulan

**Object Introspection** adalah kemampuan untuk memeriksa informasi mengenai object ketika program sedang berjalan.

Salah satu fungsi utama yang digunakan untuk introspection adalah:

```python
dir(object)
```

Fungsi tersebut dapat digunakan untuk melihat daftar attribute dan method yang tersedia pada sebuah object.

Contohnya:

```python
wizard1 = Wizard(
    "Merlin",
    60,
    "merlin@gmail.com"
)

print(dir(wizard1))
```

Kita juga dapat menggunakan:

```python
help(wizard1)
```

untuk melihat informasi dan dokumentasi mengenai object.

Introspection sangat berguna untuk **eksplorasi object, debugging, pembelajaran Python, dan memahami kemampuan object yang sedang digunakan**.

Setelah memahami object introspection, kita dapat melanjutkan ke konsep OOP berikutnya seperti **Multiple Inheritance dan Method Resolution Order (MRO)**.