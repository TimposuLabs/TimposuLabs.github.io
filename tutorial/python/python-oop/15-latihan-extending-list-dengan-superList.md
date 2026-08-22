---
sidebar_position: 15
title: "Latihan: Extending List dengan SuperList"
---

Pada latihan ini kita akan menerapkan beberapa konsep OOP yang telah dipelajari sebelumnya, yaitu:

- Inheritance.
- Built-in class.
- Method overriding.
- Dunder methods.
- `isinstance()`.

Kita akan membuat class bernama `SuperList` yang mewarisi seluruh kemampuan dari built-in class `list`.

Selain itu, kita akan mengubah perilaku method `__len__()` sehingga fungsi `len()` selalu menghasilkan nilai `1000`.

---

## Tujuan Latihan

Kita akan membuat class:

```python
class SuperList(list):
    pass
```

Class `SuperList` merupakan child class dari `list`.

Artinya, `SuperList` akan mewarisi berbagai kemampuan yang dimiliki oleh `list`.

Misalnya:

- Menambahkan data dengan `append()`.
- Mengakses data menggunakan `[]`.
- Melakukan iterasi.
- Menggunakan berbagai method bawaan `list`.

Namun, kita akan melakukan sedikit modifikasi terhadap perilaku `len()`.

---

## Persyaratan Latihan

`SuperList` harus memenuhi dua persyaratan utama.

### 1. Mewarisi Kemampuan `list`

`SuperList` harus tetap dapat menggunakan berbagai fitur bawaan `list`.

Contohnya:

```python
super_list1.append(5)
```

dan:

```python
super_list1[0]
```

### 2. Mengubah Perilaku `len()`

Ketika fungsi:

```python
len(super_list1)
```

dipanggil, hasilnya harus selalu:

```text
1000
```

Tidak peduli berapa banyak elemen yang sebenarnya terdapat di dalam `SuperList`.

---

## Membuat SuperList

Kita dapat membuat `SuperList` dengan inheritance:

```python
class SuperList(list):

    def __len__(self):
        return 1000
```

Perhatikan struktur inheritance:

```text
list
 │
 └── SuperList
```

Artinya `SuperList` merupakan turunan dari `list`.

---

## Method Overriding pada `__len__()`

Pada `list`, Python sudah memiliki perilaku tertentu untuk fungsi `len()`.

Contohnya:

```python
numbers = [1, 2, 3]

print(len(numbers))
```

Output:

```text
3
```

Namun pada `SuperList`, kita melakukan override terhadap `__len__()`:

```python
class SuperList(list):

    def __len__(self):
        return 1000
```

Sekarang:

```python
super_list1 = SuperList()

super_list1.append(5)

print(len(super_list1))
```

Output:

```text
1000
```

Meskipun sebenarnya hanya terdapat satu elemen di dalam list.

---

## Mengapa `len()` Menghasilkan 1000?

Ketika kita menjalankan:

```python
len(super_list1)
```

Python akan menggunakan dunder method:

```python
__len__()
```

Karena `SuperList` memiliki implementasi sendiri:

```python
def __len__(self):
    return 1000
```

maka Python menggunakan implementasi tersebut.

Secara konsep:

```text
len(super_list1)
       │
       ↓
super_list1.__len__()
       │
       ↓
    1000
```

---

## Tetap Memiliki Fitur `list`

Meskipun `SuperList` mengubah perilaku `__len__()`, class tersebut tetap mewarisi berbagai kemampuan dari `list`.

Contohnya:

```python
super_list1 = SuperList()

super_list1.append(5)
super_list1.append(10)
super_list1.append(15)
```

Kita masih dapat mengakses elemen menggunakan indeks:

```python
print(super_list1[0])
print(super_list1[1])
print(super_list1[2])
```

Output:

```text
5
10
15
```

Artinya, inheritance tetap memberikan berbagai kemampuan dari parent class `list`.

---

## Contoh Lengkap

Berikut implementasi lengkap latihan:

```python
class SuperList(list):

    def __len__(self):
        return 1000


super_list1 = SuperList()

super_list1.append(5)

print(super_list1[0])

print(len(super_list1))

print(isinstance(super_list1, SuperList))
print(isinstance(super_list1, list))
```

Output:

```text
5
1000
True
True
```

---

## Memahami `isinstance()`

Pada bagian akhir kita menggunakan:

```python
isinstance(super_list1, SuperList)
```

Hasilnya:

```text
True
```

Hal ini karena `super_list1` merupakan object yang dibuat dari class `SuperList`.

Kita juga dapat melakukan:

```python
isinstance(super_list1, list)
```

Hasilnya juga:

```text
True
```

Mengapa?

Karena `SuperList` merupakan subclass dari `list`.

Strukturnya:

```text
list
  ↑
  │ inheritance
  │
SuperList
  │
  │ instantiation
  ↓
super_list1
```

Dengan demikian, `super_list1` merupakan instance dari `SuperList` sekaligus dianggap sebagai instance dari `list`.

---

## Mewarisi Built-in Class

Inheritance tidak hanya dapat digunakan dengan class yang kita buat sendiri.

Python juga memungkinkan kita mewarisi built-in class.

Contohnya:

```python
class SuperList(list):
    pass
```

Kita juga dapat membuat class yang mewarisi tipe bawaan lainnya, seperti:

```text
list
dict
str
```

Contoh:

```python
class MyList(list):
    pass
```

atau:

```python
class MyDictionary(dict):
    pass
```

Dengan cara ini, kita dapat membuat versi khusus dari built-in class Python.

---

## Mengapa Menggunakan Inheritance?

Dengan inheritance, kita tidak perlu membuat ulang seluruh fitur yang sudah dimiliki `list`.

Kita cukup mewarisi:

```python
class SuperList(list):
```

Kemudian kita hanya perlu menambahkan atau mengubah perilaku yang diperlukan.

Dalam latihan ini, kita hanya mengubah:

```python
def __len__(self):
    return 1000
```

Sementara fitur lainnya tetap berasal dari `list`.

---

## Konsep yang Dipelajari

Latihan `SuperList` menggabungkan beberapa konsep OOP.

### Inheritance

`SuperList` mewarisi `list`:

```python
class SuperList(list):
```

### Method Overriding

`SuperList` mengubah implementasi `__len__()`:

```python
def __len__(self):
    return 1000
```

### Dunder Methods

`__len__()` merupakan dunder method yang digunakan Python ketika fungsi `len()` dipanggil.

### Built-in Class

`list` merupakan built-in class Python yang dapat digunakan sebagai parent class.

### `isinstance()`

Digunakan untuk memeriksa hubungan antara object dan class:

```python
isinstance(super_list1, SuperList)
```

dan:

```python
isinstance(super_list1, list)
```

---

## Kesimpulan

`SuperList` menunjukkan bahwa kita dapat menggunakan inheritance untuk membuat versi khusus dari built-in class Python.

Dengan:

```python
class SuperList(list):
```

kita mendapatkan seluruh kemampuan dasar dari `list`.

Kemudian kita dapat mengubah perilaku tertentu menggunakan method overriding:

```python
def __len__(self):
    return 1000
```

Sehingga:

```python
super_list1 = SuperList()

super_list1.append(5)

print(super_list1[0])
print(len(super_list1))
```

menghasilkan:

```text
5
1000
```

Latihan ini menunjukkan bahwa **inheritance tidak hanya digunakan untuk class buatan sendiri, tetapi juga dapat digunakan untuk memperluas dan memodifikasi built-in class Python**.