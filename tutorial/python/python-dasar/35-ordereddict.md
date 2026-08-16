---
sidebar_position: 35
title: "OrderedDict"
---

`OrderedDict` adalah struktur data yang disediakan Python melalui module `collections` untuk menyimpan data dalam bentuk **key-value** sekaligus mempertahankan urutan item.

Konsep ini berkaitan erat dengan dictionary karena `OrderedDict` memiliki cara penggunaan yang hampir sama dengan `dict`.

---

## 1. Apa Itu `OrderedDict`?

`OrderedDict` merupakan class dari module:

```python
collections
```

Untuk menggunakannya, kita perlu melakukan import:

```python
from collections import OrderedDict
```

Kemudian kita dapat membuat `OrderedDict`:

```python
user = OrderedDict()

user["name"] = "Andi"
user["age"] = 25
user["city"] = "Palu"

print(user)
```

Hasil:

```text
OrderedDict([('name', 'Andi'), ('age', 25), ('city', 'Palu')])
```

Urutan item dipertahankan sesuai dengan urutan ketika item tersebut dimasukkan.

---

## 2. Mengapa Ada `OrderedDict`?

Pada Python versi lama, `dict` tidak menjamin urutan item ketika melakukan iterasi.

Karena itu, Python menyediakan:

```python
OrderedDict
```

untuk kebutuhan yang secara khusus membutuhkan struktur dictionary dengan perilaku urutan yang terjamin.

Contohnya:

```python
from collections import OrderedDict

data = OrderedDict()

data["a"] = 1
data["b"] = 2
data["c"] = 3
```

Urutannya akan tetap:

```text
a
b
c
```

---

## 3. Dictionary pada Python Modern

Pada Python modern, `dict` standar sudah **mempertahankan urutan insertion**.

Contohnya:

```python
data = {}

data["a"] = 1
data["b"] = 2
data["c"] = 3

print(data)
```

Urutannya tetap:

```text
a
b
c
```

Karena itu, untuk sebagian besar kebutuhan pemrograman modern, kita cukup menggunakan:

```python
dict
```

dan tidak perlu menggunakan `OrderedDict`.

---

## 4. Perbedaan `dict` dan `OrderedDict`

| Karakteristik | `dict` | `OrderedDict` |
| --- | --- | --- |
| Menyimpan key-value | Ya | Ya |
| Mempertahankan insertion order | Ya | Ya |
| Tersedia langsung | Ya | Tidak |
| Perlu import | Tidak | Ya |
| Module | Built-in | `collections` |
| Fitur khusus pengelolaan urutan | Terbatas | Lebih lengkap |

Contoh `dict`:

```python
data = {
    "a": 1,
    "b": 2
}
```

Contoh `OrderedDict`:

```python
from collections import OrderedDict

data = OrderedDict()

data["a"] = 1
data["b"] = 2
```

---

## 5. Mengakses Data

Cara mengakses data pada `OrderedDict` sama seperti dictionary biasa.

Contohnya:

```python
from collections import OrderedDict

user = OrderedDict()

user["name"] = "Andi"
user["age"] = 25

print(user["name"])
```

Hasil:

```text
Andi
```

---

## 6. Menggunakan `OrderedDict` Langsung

Kita juga dapat membuat `OrderedDict` dengan data awal.

Contohnya:

```python
from collections import OrderedDict

user = OrderedDict([
    ("name", "Andi"),
    ("age", 25),
    ("city", "Palu")
])

print(user)
```

Hasil:

```text
OrderedDict([('name', 'Andi'), ('age', 25), ('city', 'Palu')])
```

Urutan item mengikuti urutan saat data diberikan.

---

## 7. Mempertahankan Urutan Insertion

Misalnya:

```python
from collections import OrderedDict

data = OrderedDict()

data["first"] = 1
data["second"] = 2
data["third"] = 3
```

Jika kita melakukan iterasi:

```python
for key in data:
    print(key)
```

Hasil:

```text
first
second
third
```

Urutan tersebut sesuai dengan urutan ketika item dimasukkan.

---

## 8. Memindahkan Item ke Akhir dengan `move_to_end()`

Salah satu fitur yang membedakan `OrderedDict` adalah method:

```python
move_to_end()
```

Method ini dapat digunakan untuk memindahkan sebuah item ke bagian akhir.

Contohnya:

```python
from collections import OrderedDict

data = OrderedDict()

data["a"] = 1
data["b"] = 2
data["c"] = 3

data.move_to_end("a")

print(data)
```

Hasil:

```text
OrderedDict([('b', 2), ('c', 3), ('a', 1)])
```

Awalnya:

```text
a → b → c
```

Setelah:

```python
data.move_to_end("a")
```

menjadi:

```text
b → c → a
```

---

## 9. Memindahkan Item ke Awal

`move_to_end()` juga memiliki parameter:

```python
last=False
```

yang dapat digunakan untuk memindahkan item ke bagian awal.

Contohnya:

```python
from collections import OrderedDict

data = OrderedDict()

data["a"] = 1
data["b"] = 2
data["c"] = 3

data.move_to_end("c", last=False)

print(data)
```

Hasil:

```text
OrderedDict([('c', 3), ('a', 1), ('b', 2)])
```

Urutannya berubah dari:

```text
a → b → c
```

menjadi:

```text
c → a → b
```

---

## 10. Menghapus Item Terakhir dengan `popitem()`

`OrderedDict` juga menyediakan method:

```python
popitem()
```

yang dapat digunakan untuk menghapus dan mengembalikan item.

Secara default, item terakhir akan dihapus.

Contohnya:

```python
from collections import OrderedDict

data = OrderedDict()

data["a"] = 1
data["b"] = 2
data["c"] = 3

item = data.popitem()

print(item)
print(data)
```

Hasil:

```text
('c', 3)
OrderedDict([('a', 1), ('b', 2)])
```

---

## 11. Menghapus Item Pertama

Dengan memberikan:

```python
last=False
```

kita dapat menghapus item pertama.

Contohnya:

```python
from collections import OrderedDict

data = OrderedDict()

data["a"] = 1
data["b"] = 2
data["c"] = 3

item = data.popitem(last=False)

print(item)
print(data)
```

Hasil:

```text
('a', 1)
OrderedDict([('b', 2), ('c', 3)])
```

---

## 12. Kapan Menggunakan `OrderedDict`?

Dalam kode Python modern, penggunaan `dict` biasa sudah cukup untuk mempertahankan insertion order.

Namun, `OrderedDict` masih berguna ketika kita membutuhkan operasi khusus yang berkaitan dengan urutan, seperti:

```python
move_to_end()
```

atau:

```python
popitem(last=False)
```

Contoh penggunaan yang mungkin:

- Struktur data berbasis urutan.
- Implementasi cache sederhana.
- Pengelolaan data yang sering dipindahkan posisinya.
- Kode lama (*legacy code*) yang memang menggunakan `OrderedDict`.
- Situasi yang membutuhkan API khusus dari `OrderedDict`.

---

## 13. Contoh Sederhana

```python
from collections import OrderedDict

tasks = OrderedDict()

tasks["task1"] = "Belajar Python"
tasks["task2"] = "Mengerjakan latihan"
tasks["task3"] = "Membuat project"

print(tasks)
```

Hasil:

```text
OrderedDict([
    ('task1', 'Belajar Python'),
    ('task2', 'Mengerjakan latihan'),
    ('task3', 'Membuat project')
])
```

Kita dapat memindahkan task:

```python
tasks.move_to_end("task1")
```

Sekarang urutannya menjadi:

```text
task2
task3
task1
```

---

## 14. `OrderedDict` Bukan Sekadar Dictionary yang Terurut

Pada Python modern, anggapan bahwa:

```text
dict = tidak terurut
OrderedDict = terurut
```

sudah tidak tepat.

Dictionary modern:

```python
data = {
    "a": 1,
    "b": 2,
    "c": 3
}
```

juga mempertahankan insertion order.

Perbedaan pentingnya adalah `OrderedDict` menyediakan beberapa operasi khusus untuk **memanipulasi urutan item**.

---

## 15. Ringkasan

| Fitur | `dict` | `OrderedDict` |
| --- | --- | --- |
| Key-value | Ya | Ya |
| Mempertahankan insertion order | Ya | Ya |
| Perlu import | Tidak | Ya |
| `move_to_end()` | Tidak | Ya |
| `popitem(last=False)` | Tidak | Ya |
| Cocok untuk kebutuhan dictionary umum | Ya | Tidak selalu |

Untuk dictionary biasa:

```python
user = {
    "name": "Andi",
    "age": 25
}
```

Sedangkan untuk `OrderedDict`:

```python
from collections import OrderedDict

user = OrderedDict()

user["name"] = "Andi"
user["age"] = 25
```

---

## Kesimpulan

`OrderedDict` adalah struktur data dari module `collections` yang menyimpan data dalam bentuk **key-value** dan menyediakan operasi tambahan untuk mengelola urutan item.

Pada Python modern, `dict` standar sudah mempertahankan **insertion order**, sehingga `OrderedDict` tidak lagi diperlukan hanya untuk mendapatkan dictionary yang terurut.

Namun, `OrderedDict` masih berguna ketika kita membutuhkan operasi khusus seperti:

```python
move_to_end()
```

dan:

```python
popitem(last=False)
```

Konsep utama:

```text
dict
  ↓
Dictionary umum dengan insertion order

OrderedDict
  ↓
Dictionary dengan fitur khusus untuk mengelola urutan
```

:::tip
**Untuk kode Python modern, gunakan `dict` sebagai pilihan default. Pelajari `OrderedDict` agar memahami kode Python lama dan kasus yang membutuhkan manipulasi urutan secara khusus.**
:::