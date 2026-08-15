---
sidebar_position: 25
title: "List"
---

**List** adalah salah satu struktur data yang paling sering digunakan dalam Python. List digunakan untuk menyimpan **kumpulan data dalam satu variable**.

Berbeda dengan variable biasa yang biasanya menyimpan satu nilai, sebuah list dapat menyimpan banyak nilai sekaligus.

Contohnya:

```python
numbers = [1, 2, 3, 4, 5]
```

List tersebut menyimpan lima nilai dalam satu variable:

```text
1
2
3
4
5
```

---

## 1. Membuat List

List dibuat menggunakan tanda kurung siku:

```text
[]
```

Setiap item di dalam list dipisahkan menggunakan koma.

Contohnya:

```python
numbers = [1, 2, 3, 4, 5]
```

List juga dapat berisi string:

```python
names = ["Andrei", "John", "Sarah"]
```

Atau:

```python
fruits = ["apple", "banana", "orange"]
```

---

## 2. List dengan Berbagai Tipe Data

Salah satu karakteristik list di Python adalah list dapat menyimpan berbagai tipe data dalam satu list.

Contohnya:

```python
data = [10, 3.14, "Python", True]
```

List tersebut berisi:

```text
10     → int
3.14   → float
"Python" → str
True   → bool
```

Python tidak mengharuskan semua item dalam sebuah list memiliki tipe data yang sama.

---

## 3. List Berisi List

Sebuah list juga dapat berisi list lainnya.

Contohnya:

```python
numbers = [
    [1, 2, 3],
    [4, 5, 6]
]
```

Struktur seperti ini sering disebut sebagai **nested list**.

Contoh lainnya:

```python
data = [
    "Andrei",
    25,
    ["Python", "Java"]
]
```

List dapat digunakan untuk membangun struktur data yang lebih kompleks.

---

## 4. List Memiliki Index

Setiap item dalam list memiliki posisi atau **index**.

Index list dimulai dari `0`.

Contohnya:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys",
    "grapes"
]
```

Posisi item:

```text
Index :       0            1           2        3
              ↓            ↓           ↓        ↓
Item  :  notebooks   sunglasses     toys    grapes
```

Item pertama berada pada index `0`.

Item kedua berada pada index `1`.

Dan seterusnya.

---

## 5. Mengakses Item List

Untuk mengambil item tertentu, gunakan index.

Contohnya:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys",
    "grapes"
]

print(amazon_cart[0])
```

Hasil:

```text
notebooks
```

Mengakses item kedua:

```python
print(amazon_cart[1])
```

Hasil:

```text
sunglasses
```

---

## 6. Negative Indexing

List juga mendukung **negative indexing**, sama seperti string.

Index:

```text
-1
```

mengacu pada item terakhir.

Contohnya:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys",
    "grapes"
]

print(amazon_cart[-1])
```

Hasil:

```text
grapes
```

Sedangkan:

```python
print(amazon_cart[-2])
```

menghasilkan:

```text
toys
```

---

## 7. List Bersifat Mutable

Salah satu perbedaan penting antara list dan string adalah **list bersifat mutable**.

Mutable berarti isi list dapat diubah setelah list dibuat.

Contohnya:

```python
amazon_cart = [
    "notebooks",
    "sunglasses"
]

amazon_cart[0] = "laptop"

print(amazon_cart)
```

Hasil:

```text
['laptop', 'sunglasses']
```

Item pada index `0` berhasil diubah.

---

## 8. Perbedaan List dan String

String bersifat **immutable**.

Contohnya, kode berikut tidak diperbolehkan:

```python
text = "Python"

text[0] = "J"
```

Sedangkan list bersifat **mutable**:

```python
languages = ["Python", "Java"]

languages[0] = "Kotlin"

print(languages)
```

Hasil:

```text
['Kotlin', 'Java']
```

Jadi:

```text
String → Immutable
List   → Mutable
```

---

## 9. List Slicing

List juga mendukung **slicing**, sama seperti string.

Sintaks:

```python
list[start:stop:step]
```

Contohnya:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys",
    "grapes"
]

print(amazon_cart[0:2])
```

Hasil:

```text
['notebooks', 'sunglasses']
```

Index `2` tidak termasuk karena `stop` bersifat eksklusif.

---

## 10. Slicing dari Index Tertentu

Contohnya:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys",
    "grapes"
]

print(amazon_cart[1:3])
```

Hasil:

```text
['sunglasses', 'toys']
```

Prosesnya:

```text
Index 1 → sunglasses
Index 2 → toys
Index 3 → tidak termasuk
```

---

## 11. Slicing dengan `step`

Kita juga dapat menggunakan parameter `step`.

Contohnya:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys",
    "grapes"
]

print(amazon_cart[::2])
```

Hasil:

```text
['notebooks', 'toys']
```

Python mengambil item dengan langkah `2`:

```text
notebooks → toys
```

---

## 12. Mengambil Seluruh List dengan Slicing

Kita dapat menggunakan:

```python
amazon_cart[:]
```

untuk mengambil seluruh item.

Contohnya:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys",
    "grapes"
]

print(amazon_cart[:])
```

Hasil:

```text
['notebooks', 'sunglasses', 'toys', 'grapes']
```

---

## 13. Membalikkan List

Seperti string, list juga dapat dibalik menggunakan slicing dengan `step` `-1`.

Contohnya:

```python
numbers = [1, 2, 3, 4, 5]

print(numbers[::-1])
```

Hasil:

```text
[5, 4, 3, 2, 1]
```

Expression:

```python
numbers[::-1]
```

mengambil item dari belakang ke depan.

---

## 14. Menggunakan `len()` pada List

Built-in function `len()` juga dapat digunakan untuk mengetahui jumlah item dalam list.

Contohnya:

```python
fruits = [
    "apple",
    "banana",
    "orange"
]

print(len(fruits))
```

Hasil:

```text
3
```

Perlu dibedakan antara **jumlah item** dan **index**.

Jika list memiliki tiga item:

```text
Index :  0       1        2
Item  : apple  banana   orange
```

Maka:

```python
len(fruits)
```

menghasilkan:

```text
3
```

Sedangkan index terakhir adalah:

```text
2
```

---

## 15. List Kosong

List juga dapat dibuat tanpa memiliki item.

Contohnya:

```python
items = []
```

List tersebut disebut **empty list**.

Kita dapat memeriksa jumlah item:

```python
print(len(items))
```

Hasil:

```text
0
```

List kosong dapat digunakan sebagai titik awal untuk mengumpulkan data secara bertahap.

---

## 16. Contoh List dalam Program

List sangat berguna ketika kita ingin menyimpan beberapa data yang memiliki hubungan.

Contohnya daftar bahasa pemrograman:

```python
languages = [
    "Python",
    "Java",
    "Kotlin",
    "JavaScript"
]
```

Kita dapat mengakses item tertentu:

```python
print(languages[0])
```

Hasil:

```text
Python
```

Kita juga dapat mengubah item:

```python
languages[2] = "C++"

print(languages)
```

Hasil:

```text
['Python', 'Java', 'C++', 'JavaScript']
```

---

## 17. List sebagai Kumpulan Data

Salah satu manfaat utama list adalah mengelompokkan data yang berkaitan.

Tanpa list:

```python
fruit1 = "apple"
fruit2 = "banana"
fruit3 = "orange"
```

Dengan list:

```python
fruits = [
    "apple",
    "banana",
    "orange"
]
```

Penggunaan list membuat data lebih terorganisir dan lebih mudah dikelola.

---

## 18. Ringkasan Karakteristik List

| Karakteristik | Penjelasan |
| --- | --- |
| Ordered | Item memiliki urutan |
| Indexed | Setiap item memiliki index |
| Zero-based | Index dimulai dari `0` |
| Mutable | Item dapat diubah |
| Flexible | Dapat menyimpan berbagai tipe data |
| Slicing | Dapat mengambil sebagian item |
| Nested | Dapat berisi list lainnya |

---

## 19. Perbandingan String dan List

| Karakteristik | String | List |
| --- | --- | --- |
| Menyimpan | Karakter | Kumpulan object |
| Index | Ya | Ya |
| Slicing | Ya | Ya |
| Mutable | Tidak | Ya |
| Menggunakan `[]` | Untuk indexing/slicing | Untuk membuat list dan indexing/slicing |

Contoh string:

```python
text = "Python"
```

Contoh list:

```python
languages = ["Python", "Java"]
```

String:

```text
"Python"
```

tidak dapat diubah karakter individualnya.

Sedangkan list:

```text
["Python", "Java"]
```

itemnya dapat diubah.

---

## Kesimpulan

**List** adalah struktur data yang digunakan untuk menyimpan banyak nilai atau object dalam satu variable.

List dibuat menggunakan:

```python
[]
```

Contohnya:

```python
numbers = [1, 2, 3, 4, 5]
```

List memiliki beberapa karakteristik penting:

- Item memiliki urutan.
- Index dimulai dari `0`.
- Mendukung negative indexing.
- Mendukung slicing.
- Dapat berisi berbagai tipe data.
- Bersifat **mutable**, sehingga item dapat diubah secara langsung.

Contohnya:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys"
]

amazon_cart[0] = "laptop"

print(amazon_cart)
```

Hasil:

```text
['laptop', 'sunglasses', 'toys']
```

:::info
**List merupakan salah satu struktur data fundamental dalam Python dan akan menjadi dasar untuk mempelajari berbagai cara mengelola kumpulan data dalam sebuah program.**
:::