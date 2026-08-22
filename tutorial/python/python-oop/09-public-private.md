---
sidebar_position: 9
title: "Public & Private"
---

Setelah memahami **encapsulation** dan **abstraction**, kita perlu memahami bagaimana Python mengatur akses terhadap attribute dan method yang berada di dalam sebuah class.

Pada bahasa pemrograman seperti Java, terdapat keyword khusus seperti `private` untuk membatasi akses terhadap data.

Python memiliki pendekatan yang berbeda.

Python lebih banyak menggunakan **konvensi penamaan** untuk menunjukkan bagian internal sebuah class yang sebaiknya tidak digunakan secara langsung dari luar.

Pada materi ini kita akan membahas:

- Public attribute dan method.
- Single underscore.
- Name mangling.
- Private convention dalam Python.
- Dunder methods.
- Perbedaan single underscore dan double underscore.

---

## Public Attribute dan Method

Secara default, attribute dan method yang dibuat di dalam class Python bersifat **public**.

Artinya, attribute atau method tersebut dapat diakses dari luar object.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def speak(self):
        print(f"My name is {self.name}")
```

Kemudian:

```python
player1 = PlayerCharacter("Budi", 25)

print(player1.name)
print(player1.age)

player1.speak()
```

Output:

```text
Budi
25
My name is Budi
```

`name`, `age`, dan `speak()` dapat diakses secara langsung dari object.

Secara konsep:

```text
PlayerCharacter
│
├── name
├── age
└── speak()
       ↑
       │
    Public
```

---

## Tidak Ada Private Absolut Seperti Java

Python tidak menyediakan keyword `private` seperti beberapa bahasa pemrograman lainnya.

Misalnya pada Java terdapat konsep:

```text
private
protected
public
```

Python memiliki pendekatan yang lebih fleksibel.

Attribute seperti:

```python
self.name
```

dapat diakses dari luar object.

Python juga memungkinkan developer menggunakan konvensi tertentu untuk menunjukkan bahwa sebuah attribute merupakan bagian internal dari class.

---

## Single Underscore

Python menggunakan **single underscore** sebagai salah satu konvensi untuk menandai attribute atau method yang dianggap sebagai bagian internal.

Contohnya:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self._name = name
        self._age = age

    def speak(self):
        print(f"My name is {self._name} and I am {self._age} years old")
```

Attribute:

```text
_name
_age
```

menggunakan awalan single underscore.

Ini biasanya menjadi tanda bagi developer lain:

> Attribute tersebut merupakan bagian internal dan sebaiknya tidak digunakan secara langsung dari luar class.

---

## Single Underscore Bukan Private Absolut

Meskipun menggunakan `_`, Python tetap memungkinkan attribute tersebut diakses dari luar.

Contoh:

```python
player1 = PlayerCharacter("Budi", 25)

print(player1._name)
```

Kode tersebut secara teknis masih dapat dijalankan.

Namun, penggunaan langsung seperti ini dianggap kurang baik jika attribute tersebut memang dimaksudkan sebagai bagian internal class.

Jadi:

```python
player1._name
```

bukan berarti Python akan memberikan error secara otomatis.

Single underscore lebih tepat dipahami sebagai **konvensi** atau tanda peringatan kepada developer.

---

## Mengapa Menggunakan Single Underscore?

Single underscore membantu menerapkan prinsip abstraction dan menjaga batas antara interface publik dengan implementasi internal.

Misalnya:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self._name = name
        self._age = age

    def speak(self):
        print(f"My name is {self._name}")
```

Developer yang menggunakan class tersebut cukup menggunakan:

```python
player1.speak()
```

Tidak perlu bergantung langsung pada:

```python
player1._name
player1._age
```

Dengan demikian, struktur internal class dapat lebih mudah diubah tanpa terlalu memengaruhi kode yang menggunakan class tersebut.

---

## Name Mangling

Selain single underscore, Python memiliki mekanisme khusus yang disebut **name mangling**.

Name mangling terjadi ketika sebuah attribute di dalam class menggunakan **dua underscore di awal**, tetapi tidak menggunakan dua underscore di akhir.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name):
        self.__name = name
```

Attribute:

```text
__name
```

memiliki dua underscore di awal.

Python kemudian melakukan perubahan nama secara internal.

Secara konsep:

```text
__name
   ↓
_PlayerCharacter__name
```

Nama class menjadi bagian dari nama attribute tersebut.

---

## Mengapa Name Mangling Digunakan?

Tujuan utama name mangling bukan untuk membuat attribute benar-benar private.

Name mangling terutama digunakan untuk:

- Menghindari konflik nama.
- Mencegah attribute tertimpa secara tidak sengaja.
- Menjaga attribute internal pada class.
- Membantu menghindari konflik ketika menggunakan inheritance.

Name mangling sangat berguna ketika sebuah class menjadi parent class dan kemudian digunakan oleh class turunan.

---

## Contoh Name Mangling

Perhatikan contoh berikut:

```python
class PlayerCharacter:

    def __init__(self, name):
        self.__name = name

    def get_name(self):
        return self.__name
```

Kemudian:

```python
player = PlayerCharacter("Budi")

print(player.get_name())
```

Output:

```text
Budi
```

Namun jika kita mencoba:

```python
print(player.__name)
```

Python akan menghasilkan:

```text
AttributeError
```

Hal ini terjadi karena nama `__name` telah mengalami name mangling.

---

## Nama Hasil Name Mangling

Misalnya kita memiliki:

```python
class PlayerCharacter:

    def __init__(self):
        self.__name = "Budi"
```

Python secara internal akan menggunakan nama:

```text
_PlayerCharacter__name
```

Dengan demikian, secara teknis kita masih dapat mengaksesnya:

```python
player = PlayerCharacter()

print(player._PlayerCharacter__name)
```

Output:

```text
Budi
```

Namun cara tersebut tidak disarankan dalam penggunaan normal karena kita sengaja melewati mekanisme name mangling.

Hal ini menunjukkan bahwa name mangling **bukan sistem keamanan** dan bukan private absolut.

---

## Name Mangling pada Inheritance

Name mangling menjadi lebih berguna ketika digunakan bersama inheritance.

Contoh:

```python
class Parent:

    def __init__(self):
        self.__data = "Data Parent"


class Child(Parent):

    def __init__(self):
        super().__init__()
        self.__data = "Data Child"
```

Meskipun kedua class menggunakan nama:

```text
__data
```

Python akan melakukan name mangling berdasarkan nama class.

Secara konsep:

```text
Parent
└── _Parent__data

Child
└── _Child__data
```

Dengan demikian, kedua attribute tersebut tidak dianggap sebagai attribute yang sama.

---

## Name Mangling Mencegah Konflik Nama

Perhatikan contoh berikut:

```python
class Parent:

    def __init__(self):
        self.__data = "Data Parent"


class Child(Parent):

    def __init__(self):
        super().__init__()
        self.__data = "Data Child"
```

Tanpa name mangling, kedua attribute dapat berpotensi menggunakan nama yang sama.

Dengan name mangling:

```text
_Parent__data
_Child__data
```

keduanya memiliki nama internal yang berbeda.

Ini membantu mencegah attribute parent class tertimpa secara tidak sengaja oleh child class.

---

## Single Underscore vs Name Mangling

Perbedaan antara `_name` dan `__name` sangat penting.

### Single Underscore

```python
self._name
```

Merupakan **konvensi internal**.

Python tidak mengubah nama tersebut.

```text
_name
```

tetap menjadi:

```text
_name
```

Tujuannya adalah memberi tanda kepada developer bahwa attribute tersebut merupakan bagian internal.

### Double Underscore di Awal

```python
self.__name
```

Memicu **name mangling**.

Python mengubahnya menjadi bentuk:

```text
_ClassName__name
```

Contohnya:

```text
__name
   ↓
_PlayerCharacter__name
```

---

## Jangan Tertukar dengan Dunder Method

Name mangling dan dunder method memiliki pola yang berbeda.

### Name Mangling

```python
self.__name
```

Hanya memiliki double underscore di awal.

### Dunder Method

```python
def __str__(self):
    ...
```

Memiliki double underscore di awal **dan** di akhir.

Secara sederhana:

```text
__name
│
└── Name Mangling


__name__
│
└── Dunder / Special Name
```

Keduanya memiliki fungsi yang berbeda.

---

## Apa Itu Dunder Methods?

Selain single underscore dan name mangling, Python juga memiliki pola penamaan menggunakan **dua underscore di awal dan dua underscore di akhir**.

Contohnya:

```text
__init__
__str__
__len__
```

Method dengan pola tersebut disebut **dunder method**.

Istilah **dunder** berasal dari:

```text
double underscore
```

Dua underscore di awal dan dua underscore di akhir.

---

## Dunder Methods Memiliki Makna Khusus

Dunder methods merupakan method khusus yang memiliki arti tertentu bagi Python.

Python akan mengenali nama-nama tersebut dan menggunakannya untuk berbagai operasi.

Contohnya:

```python
__init__
```

digunakan ketika object diinisialisasi.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name):
        self.name = name
```

Ketika kita membuat object:

```python
player1 = PlayerCharacter("Budi")
```

Python akan menjalankan `__init__()` untuk melakukan proses inisialisasi object.

---

## Contoh Dunder Method `__str__`

Dunder method `__str__` digunakan untuk menentukan representasi string dari sebuah object ketika object tersebut ditampilkan menggunakan `print()`.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"Player: {self.name}"
```

Kemudian:

```python
player1 = PlayerCharacter("Budi")

print(player1)
```

Output:

```text
Player: Budi
```

Python menggunakan `__str__()` untuk menentukan representasi tersebut.

---

## Contoh Dunder Method `__len__`

Python juga memiliki dunder method `__len__`.

Method ini dapat digunakan untuk menentukan perilaku ketika object digunakan bersama function `len()`.

Contoh:

```python
class Team:

    def __init__(self, members):
        self.members = members

    def __len__(self):
        return len(self.members)
```

Kemudian:

```python
team = Team(["Budi", "Andi", "Siti"])

print(len(team))
```

Output:

```text
3
```

Python mengetahui bahwa ketika `len(team)` dipanggil, method `__len__()` digunakan.

---

## Dunder Methods dan Python Data Model

Dunder methods merupakan bagian penting dari **Python Data Model**.

Python menggunakan dunder methods untuk menentukan bagaimana object berperilaku ketika digunakan dengan berbagai operasi bawaan.

Contohnya:

| Dunder Method | Fungsi Umum |
|---|---|
| `__init__` | Inisialisasi object |
| `__str__` | Representasi string object |
| `__len__` | Menentukan perilaku `len()` |
| `__eq__` | Perbandingan kesamaan |
| `__add__` | Operasi penjumlahan |
| `__getitem__` | Akses menggunakan indexing |

Dunder methods memungkinkan class buatan kita berinteraksi dengan fitur bawaan Python secara lebih natural.

---

## Jangan Sembarangan Menggunakan Nama Dunder

Nama dengan pola:

```text
__nama__
```

sebaiknya tidak digunakan sembarangan untuk membuat attribute atau method sendiri.

Contoh:

```python
class Example:

    def __my_method__(self):
        pass
```

Sebaiknya hindari pola tersebut jika nama tersebut bukan dunder method yang memang memiliki arti khusus dalam Python.

Gunakan nama normal untuk method buatan sendiri:

```python
class Example:

    def my_method(self):
        pass
```

Jika ingin menandai method sebagai bagian internal, gunakan konvensi single underscore:

```python
class Example:

    def _my_method(self):
        pass
```

---

## Perbandingan Naming Convention

| Penulisan | Istilah | Fungsi |
|---|---|---|
| `name` | Public | Dapat digunakan secara umum |
| `_name` | Internal convention | Menandakan bagian internal |
| `__name` | Name mangling | Menghindari konflik nama |
| `__name__` | Dunder | Nama khusus yang digunakan Python |

Perhatikan bahwa keempat pola tersebut memiliki tujuan yang berbeda.

---

## Contoh Class

Berikut contoh yang menggabungkan beberapa konsep:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self._age = age
        self.__secret = "Internal data"

    def speak(self):
        return f"My name is {self.name}"

    def __str__(self):
        return f"Player: {self.name}"
```

Pada contoh tersebut:

```text
name
```

merupakan attribute public.

```text
_age
```

merupakan attribute yang menggunakan konvensi internal.

```text
__secret
```

merupakan attribute yang menggunakan name mangling.

Sedangkan:

```text
__init__
__str__
```

merupakan dunder methods.

---

## Prinsip yang Perlu Diingat

Saat membuat class di Python, gunakan konvensi penamaan sesuai tujuan.

### Gunakan Public Attribute

Jika attribute memang merupakan bagian dari interface yang boleh digunakan oleh pengguna class:

```python
self.name = name
```

### Gunakan Single Underscore

Jika attribute atau method merupakan bagian internal:

```python
self._age = age
```

Single underscore merupakan konvensi, bukan pembatasan akses absolut.

### Gunakan Double Underscore untuk Name Mangling

Jika diperlukan untuk menghindari konflik nama, terutama dalam inheritance:

```python
self.__secret = value
```

Python akan melakukan name mangling terhadap attribute tersebut.

### Gunakan Dunder Method

Jika Python memang menyediakan dunder method tertentu untuk mengubah perilaku object:

```python
def __str__(self):
    ...
```

Jangan membuat nama dunder secara sembarangan.

---

## Hubungan dengan Encapsulation dan Abstraction

Konsep public, single underscore, name mangling, dan dunder methods berkaitan erat dengan materi sebelumnya.

### Encapsulation

Mengelompokkan data dan perilaku dalam satu class.

```text
Class
├── Data
└── Behavior
```

### Abstraction

Menyembunyikan detail implementasi yang tidak perlu diketahui pengguna.

```text
User
 ↓
Public Interface
 ↓
Internal Implementation
```

### Single Underscore

Memberikan tanda bahwa bagian tertentu merupakan bagian internal.

```text
_name
_age
_internal_method()
```

### Name Mangling

Membantu menghindari konflik nama attribute.

```text
__name
   ↓
_ClassName__name
```

### Dunder Methods

Memberikan perilaku khusus pada object sesuai mekanisme Python.

```text
__init__
__str__
__len__
```

---

## Kesimpulan

Python tidak menggunakan keyword `private` dengan cara yang sama seperti beberapa bahasa pemrograman lain.

Secara default, attribute dan method dapat diakses dari luar object.

Untuk menunjukkan bahwa suatu attribute atau method merupakan bagian internal, Python menyediakan beberapa pola penamaan.

```text
name
↓
Public

_name
↓
Internal Convention

__name
↓
Name Mangling

__name__
↓
Dunder / Special Method
```

**Single underscore** digunakan sebagai konvensi untuk menandai bagian internal.

**Name mangling** terjadi pada attribute dengan double underscore di awal dan membantu menghindari konflik nama, terutama dalam inheritance.

**Dunder methods** menggunakan double underscore di awal dan akhir serta memiliki makna khusus bagi Python.

Dengan memahami perbedaan tersebut, kita dapat memahami bagaimana Python menerapkan konsep **encapsulation dan abstraction** dengan pendekatan yang berbeda dari bahasa seperti Java.

Pembahasan selanjutnya dapat dilanjutkan ke **property, getter, setter, dan access control dalam Python**.