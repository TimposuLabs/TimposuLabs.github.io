---
sidebar_position: 17
title: "Method Resolution Order"
---

**MRO (Method Resolution Order)** adalah aturan yang digunakan Python untuk menentukan **urutan pencarian attribute dan method** pada sebuah class atau object.

MRO menjadi sangat penting ketika kita menggunakan **multiple inheritance**, karena sebuah class dapat memiliki lebih dari satu parent class.

Dengan MRO, Python memiliki aturan yang jelas untuk menentukan class mana yang harus diperiksa terlebih dahulu ketika mencari attribute atau method.

---

## Mengapa MRO Dibutuhkan?

Pada inheritance sederhana, struktur class biasanya mudah dipahami:

```text
A
│
└── B
```

Ketika Python mencari attribute atau method pada object `B`, Python dapat mencari dari:

```text
B → A → object
```

Namun, pada multiple inheritance, strukturnya dapat menjadi lebih kompleks:

```text
    A
   / \
  B   C
   \ /
    D
```

Class `D` memiliki dua parent:

```python
class D(B, C):
    pass
```

Jika `B` dan `C` memiliki method atau attribute dengan nama yang sama, Python harus menentukan mana yang digunakan terlebih dahulu.

MRO menentukan urutan tersebut.

---

## Contoh Hirarki MRO

Perhatikan contoh berikut:

```python
class A:
    num = 10


class B(A):
    pass


class C(A):
    num = 1


class D(B, C):
    pass
```

Struktur inheritance tersebut adalah:

```text
        A
       / \
      B   C
       \ /
        D
```

Class `D` mewarisi dari:

```python
B
C
```

Sedangkan `B` dan `C` sama-sama mewarisi `A`.

---

## Apa yang Terjadi Ketika Memanggil `D.num`?

Sekarang kita menjalankan:

```python
print(D.num)
```

Python harus mencari attribute `num`.

MRO menentukan urutan pencarian:

```text
D
↓
B
↓
C
↓
A
↓
object
```

Python pertama-tama memeriksa `D`.

`D` tidak memiliki `num`.

Kemudian Python memeriksa `B`.

`B` juga tidak memiliki `num`.

Selanjutnya Python memeriksa `C`.

`C` memiliki:

```python
num = 1
```

Maka pencarian berhenti.

Hasilnya:

```text
1
```

---

## Mengapa Bukan `10`?

Class `A` memiliki:

```python
num = 10
```

Sedangkan class `C` memiliki:

```python
num = 1
```

Meskipun `A` juga memiliki `num`, Python menemukan `num` milik `C` terlebih dahulu berdasarkan MRO.

Urutannya:

```text
D → B → C → A → object
```

Karena `C` diperiksa sebelum `A`, maka:

```python
D.num
```

menghasilkan:

```text
1
```

---

## Melihat MRO dengan `.mro()`

Python menyediakan method `mro()` untuk melihat urutan MRO sebuah class.

Contoh:

```python
print(D.mro())
```

Hasilnya:

```text
[
    <class '__main__.D'>,
    <class '__main__.B'>,
    <class '__main__.C'>,
    <class '__main__.A'>,
    <class 'object'>
]
```

Jika disederhanakan:

```text
D
↓
B
↓
C
↓
A
↓
object
```

Urutan tersebut menunjukkan bagaimana Python mencari attribute dan method.

---

## Melihat MRO dengan `__mro__`

Selain menggunakan:

```python
D.mro()
```

kita juga dapat menggunakan attribute:

```python
D.__mro__
```

Contoh:

```python
print(D.__mro__)
```

Hasilnya akan menunjukkan urutan class yang sama.

Kedua pendekatan tersebut dapat digunakan untuk melihat MRO:

```python
D.mro()
```

dan:

```python
D.__mro__
```

---

## MRO dan Pencarian Method

MRO tidak hanya digunakan untuk mencari attribute.

MRO juga digunakan ketika Python mencari method.

Misalnya:

```python
class A:

    def hello(self):
        print("A")


class B(A):

    def hello(self):
        print("B")


class C(A):

    def hello(self):
        print("C")


class D(B, C):
    pass
```

Kemudian:

```python
d = D()

d.hello()
```

Python akan mengikuti MRO.

Urutannya:

```text
D → B → C → A → object
```

Karena `B` memiliki method `hello()`, Python akan menggunakan method tersebut.

Output:

```text
B
```

---

## Urutan Pewarisan Berpengaruh pada MRO

Perhatikan:

```python
class D(B, C):
    pass
```

Urutan parent ditulis:

```text
B → C
```

Jika kita mengubahnya menjadi:

```python
class D(C, B):
    pass
```

urutan MRO juga dapat berubah.

Secara konsep:

```text
D → C → B → A → object
```

Oleh karena itu, urutan parent class dalam multiple inheritance sangat penting.

---

## C3 Linearization

Python menggunakan algoritma **C3 Linearization** untuk menentukan MRO.

C3 Linearization memastikan bahwa urutan inheritance tetap konsisten dan memenuhi aturan tertentu.

Salah satu tujuan pentingnya adalah menjaga:

- Child class diperiksa sebelum parent class.
- Urutan parent class tetap dihormati.
- Hubungan inheritance tetap konsisten.
- Ambiguitas dalam multiple inheritance dapat dihindari.

Untuk tahap awal pembelajaran, kita tidak perlu menghitung algoritma C3 Linearization secara manual.

Yang penting dipahami adalah bahwa Python menggunakan mekanisme tersebut untuk menentukan MRO.

---

## MRO dan Diamond Problem

MRO sangat berkaitan dengan **Diamond Problem**.

Contoh struktur diamond:

```text
        A
       / \
      B   C
       \ /
        D
```

Dalam struktur tersebut:

- `B` mewarisi `A`.
- `C` mewarisi `A`.
- `D` mewarisi `B` dan `C`.

Masalahnya adalah ketika beberapa class memiliki method atau attribute dengan nama yang sama.

Misalnya:

```python
class A:

    def hello(self):
        print("A")


class B(A):

    def hello(self):
        print("B")


class C(A):

    def hello(self):
        print("C")


class D(B, C):
    pass
```

Ketika:

```python
d = D()

d.hello()
```

Python harus menentukan apakah menggunakan:

```text
B.hello()
```

atau:

```text
C.hello()
```

MRO memberikan aturan yang konsisten untuk menentukan jawabannya.

---

## MRO pada Contoh Diamond

Untuk:

```python
class D(B, C):
    pass
```

MRO-nya adalah:

```text
D
↓
B
↓
C
↓
A
↓
object
```

Karena `B` berada sebelum `C`, maka method `hello()` milik `B` akan ditemukan terlebih dahulu.

Output:

```text
B
```

---

## MRO dan Base Class `object`

Seperti yang telah dipelajari sebelumnya, semua class Python pada akhirnya memiliki hubungan dengan base class:

```python
object
```

Karena itu, MRO biasanya berakhir pada:

```text
object
```

Contohnya:

```text
D
↓
B
↓
C
↓
A
↓
object
```

Jika attribute atau method tidak ditemukan pada seluruh class sebelumnya, Python akan terus mencari hingga `object`.

---

## MRO dalam Multiple Inheritance

Pada multiple inheritance:

```python
class HybridBorg(Wizard, Archer):
    pass
```

Python harus menentukan urutan pencarian.

Kita dapat melihatnya dengan:

```python
print(HybridBorg.mro())
```

atau:

```python
print(HybridBorg.__mro__)
```

Hal ini sangat berguna ketika kita ingin mengetahui dari mana sebuah method atau attribute berasal.

---

## Mengapa MRO Penting?

MRO penting karena memungkinkan Python menentukan perilaku object secara konsisten.

Tanpa MRO, multiple inheritance dapat menghasilkan kebingungan ketika beberapa parent class memiliki method atau attribute yang sama.

Dengan MRO, Python memiliki aturan yang jelas untuk menentukan:

```text
Class mana yang diperiksa terlebih dahulu?
```

Kemudian:

```text
Jika tidak ditemukan, class mana yang diperiksa berikutnya?
```

---

## Cara Praktis Memeriksa MRO

Ketika menggunakan multiple inheritance dan mengalami perilaku yang tidak sesuai harapan, kita dapat memeriksa MRO menggunakan:

```python
ClassName.mro()
```

Contohnya:

```python
print(D.mro())
```

atau:

```python
print(D.__mro__)
```

Dengan melihat hasil tersebut, kita dapat mengetahui urutan pencarian Python.

---

## Kesimpulan

**MRO (Method Resolution Order)** adalah aturan yang menentukan **urutan Python dalam mencari attribute dan method pada inheritance hierarchy**.

MRO sangat penting pada **multiple inheritance**.

Contoh:

```python
class D(B, C):
    pass
```

Python dapat memiliki MRO:

```text
D → B → C → A → object
```

Kita dapat melihat MRO menggunakan:

```python
D.mro()
```

atau:

```python
D.__mro__
```

Python menggunakan **C3 Linearization** untuk menentukan MRO.

MRO juga membantu mengatasi ambiguitas pada **Diamond Problem** sehingga pencarian method dan attribute tetap memiliki urutan yang konsisten.

Setelah memahami MRO, konsep berikutnya yang penting untuk dipelajari adalah bagaimana `super()` bekerja berdasarkan **Method Resolution Order**, terutama pada multiple inheritance.