---
sidebar_position: 14
title: "Dunder Methods"
---

**Dunder Methods** merupakan singkatan dari **Double Underscore**, yaitu method khusus yang memiliki dua tanda underscore di awal dan di akhir namanya.

Contohnya:

```text
__str__
__len__
__call__
__getitem__
```

Dunder methods merupakan bagian khusus dari Python yang memungkinkan kita **menyesuaikan perilaku object** dari class yang kita buat.

Dengan dunder methods, object buatan kita dapat merespons fungsi atau operasi bawaan Python dengan cara yang kita tentukan sendiri.

---

## Apa Itu Dunder Methods?

Dunder method memiliki pola penamaan:

```text
__nama__
```

Contohnya:

```text
__str__
```

Nama tersebut terdiri dari:

```text
__ + str + __
```

Dunder methods memiliki arti khusus bagi Python.

Kita dapat mengimplementasikan dunder methods tertentu di dalam class untuk mengubah perilaku object ketika digunakan dengan fungsi atau operasi bawaan Python.

---

## Mengapa Dunder Methods Digunakan?

Secara default, Python sudah memiliki perilaku tertentu ketika kita menggunakan fungsi atau operator terhadap sebuah object.

Misalnya:

```python
print(action_figure)
```

Python akan menggunakan mekanisme bawaan untuk menampilkan representasi object tersebut.

Dengan dunder method seperti `__str__()`, kita dapat menentukan sendiri bagaimana object tersebut ditampilkan.

Hal yang sama berlaku untuk fungsi atau operasi lain seperti:

```python
len(action_figure)
```

atau:

```python
action_figure()
```

atau:

```python
action_figure["name"]
```

---

## Contoh Class dengan Dunder Methods

Berikut contoh class yang menggunakan beberapa dunder methods:

```python
class ActionFigure:

    def __init__(self, color, age):
        self.color = color
        self.age = age
        self.my_dict = {
            "name": "Yoji",
            "has_pets": False
        }

    def __str__(self):
        return f"{self.color}"

    def __len__(self):
        return 5

    def __call__(self):
        return "yess?"

    def __getitem__(self, i):
        return self.my_dict[i]
```

Kemudian kita membuat object:

```python
action_figure = ActionFigure("red", 10)
```

Sekarang kita dapat menggunakan beberapa fungsi dan operasi Python terhadap object tersebut.

---

## Dunder Method `__str__()`

Method `__str__()` digunakan untuk menentukan representasi string dari sebuah object ketika object tersebut dikonversi menjadi string.

Contoh:

```python
class ActionFigure:

    def __init__(self, color, age):
        self.color = color
        self.age = age

    def __str__(self):
        return self.color
```

Kemudian:

```python
action_figure = ActionFigure("red", 10)

print(action_figure)
```

Output:

```text
red
```

Tanpa implementasi `__str__()`, Python akan menggunakan representasi string bawaan dari object.

---

## Dunder Method `__len__()`

Method `__len__()` digunakan untuk menentukan perilaku object ketika digunakan dengan fungsi `len()`.

Contoh:

```python
class ActionFigure:

    def __len__(self):
        return 5
```

Kemudian:

```python
action_figure = ActionFigure()

print(len(action_figure))
```

Output:

```text
5
```

Python akan memanggil `__len__()` ketika kita menggunakan:

```python
len(action_figure)
```

---

## Dunder Method `__call__()`

Method `__call__()` memungkinkan sebuah object dipanggil seperti sebuah function.

Contoh:

```python
class ActionFigure:

    def __call__(self):
        return "yess?"
```

Kemudian:

```python
action_figure = ActionFigure()

print(action_figure())
```

Output:

```text
yess?
```

Perhatikan bahwa:

```python
action_figure()
```

terlihat seperti pemanggilan function.

Namun sebenarnya `action_figure` merupakan sebuah object.

Python akan menjalankan:

```python
action_figure.__call__()
```

---

## Dunder Method `__getitem__()`

Method `__getitem__()` digunakan untuk menentukan perilaku object ketika diakses menggunakan tanda kurung siku `[]`.

Contoh:

```python
class ActionFigure:

    def __init__(self):
        self.my_dict = {
            "name": "Yoji",
            "has_pets": False
        }

    def __getitem__(self, i):
        return self.my_dict[i]
```

Kemudian:

```python
action_figure = ActionFigure()

print(action_figure["name"])
```

Output:

```text
Yoji
```

Ketika kita menulis:

```python
action_figure["name"]
```

Python akan menggunakan method:

```python
action_figure.__getitem__("name")
```

---

## Contoh Lengkap

Berikut contoh lengkap penggunaan beberapa dunder methods:

```python
class ActionFigure:

    def __init__(self, color, age):
        self.color = color
        self.age = age
        self.my_dict = {
            "name": "Yoji",
            "has_pets": False
        }

    def __str__(self):
        return f"{self.color}"

    def __len__(self):
        return 5

    def __call__(self):
        return "yess?"

    def __getitem__(self, i):
        return self.my_dict[i]


action_figure = ActionFigure("red", 10)

print(str(action_figure))
print(len(action_figure))
print(action_figure())
print(action_figure["name"])
```

Output:

```text
red
5
yess?
Yoji
```

---

## Hubungan Operasi Python dengan Dunder Methods

Dunder methods memungkinkan kita menghubungkan operasi umum Python dengan perilaku object.

| Operasi | Dunder Method |
|---|---|
| `str(object)` | `__str__()` |
| `len(object)` | `__len__()` |
| `object()` | `__call__()` |
| `object[index]` | `__getitem__()` |

Dengan demikian, kita dapat menyesuaikan bagaimana object buatan kita berinteraksi dengan fitur bawaan Python.

---

## Dunder Methods dan Custom Behavior

Salah satu tujuan utama dunder methods adalah memberikan **custom behavior** pada class.

Tanpa dunder method, object menggunakan perilaku standar Python.

Dengan dunder method, kita dapat menentukan perilaku tersebut sesuai kebutuhan.

Contohnya:

```python
class ActionFigure:

    def __str__(self):
        return "Action Figure"
```

Sekarang:

```python
action_figure = ActionFigure()

print(action_figure)
```

akan menghasilkan:

```text
Action Figure
```

Kita telah mengubah perilaku standar representasi object.

---

## Dunder Methods Bukan Method Biasa

Dunder methods berbeda dengan method biasa.

Method biasa dapat dibuat dengan nama sesuai kebutuhan:

```python
class User:

    def attack(self):
        print("attacking")
```

Sedangkan dunder methods memiliki nama dan fungsi khusus yang sudah ditentukan oleh Python:

```python
__str__
__len__
__call__
__getitem__
```

Karena itu, dunder methods sebaiknya digunakan sesuai dengan fungsi yang telah ditentukan oleh Python.

---

## Beberapa Dunder Methods yang Umum

Python memiliki banyak dunder methods.

Beberapa di antaranya:

| Dunder Method | Fungsi Umum |
|---|---|
| `__init__()` | Menginisialisasi object |
| `__str__()` | Representasi string object |
| `__repr__()` | Representasi object untuk developer |
| `__len__()` | Menentukan perilaku `len()` |
| `__call__()` | Membuat object dapat dipanggil seperti function |
| `__getitem__()` | Menentukan perilaku akses menggunakan `[]` |
| `__setitem__()` | Menentukan perilaku assignment menggunakan `[]` |
| `__eq__()` | Menentukan perilaku operator `==` |
| `__lt__()` | Menentukan perilaku operator `<` |

Tidak semua dunder methods harus digunakan dalam setiap class.

Gunakan dunder method sesuai kebutuhan class yang sedang dibuat.

---

## Aturan Penting Penggunaan Dunder Methods

Dunder methods merupakan bagian dari protokol khusus Python.

Karena itu, hindari membuat nama method sendiri dengan pola:

```text
__nama__
```

jika nama tersebut bukan dunder method yang memang memiliki arti khusus dalam Python.

Contoh:

```python
def __my_method__(self):
    pass
```

Sebaiknya dihindari karena nama dengan format tersebut dapat bertabrakan dengan mekanisme khusus Python.

Gunakan dunder methods yang memang telah didefinisikan dan didukung oleh Python.

---

## Kesimpulan

**Dunder Methods** adalah method khusus Python yang memiliki dua underscore di awal dan di akhir nama.

Contohnya:

```text
__str__
__len__
__call__
__getitem__
```

Dunder methods memungkinkan kita **menyesuaikan perilaku object** yang dibuat menggunakan class.

Beberapa contoh:

```python
print(action_figure)
```

menggunakan:

```python
__str__()
```

Sedangkan:

```python
len(action_figure)
```

menggunakan:

```python
__len__()
```

Kemudian:

```python
action_figure()
```

menggunakan:

```python
__call__()
```

Dan:

```python
action_figure["name"]
```

menggunakan:

```python
__getitem__()
```

Dengan memahami dunder methods, kita dapat membuat class yang berinteraksi lebih natural dengan fitur dan operasi bawaan Python.