---
sidebar_position: 29
title: "List Methods 2"
---

Pada materi sebelumnya, kita telah mempelajari beberapa list methods untuk **menambahkan dan menghapus elemen**.

Pada materi ini, kita akan mempelajari cara:

- Mencari posisi sebuah elemen.
- Memeriksa apakah sebuah elemen terdapat di dalam list.
- Menghitung jumlah kemunculan sebuah elemen.

Method dan keyword yang akan dipelajari:

```text
index()
in
count()
```

---

## 1. Mencari Posisi Elemen dengan `index()`

Method:

```python
index()
```

digunakan untuk mencari **index dari sebuah elemen** di dalam list.

Contohnya:

```python
basket = ["a", "b", "c", "d", "e"]

print(basket.index("d"))
```

Hasil:

```text
3
```

Karena `"d"` berada pada index `3`.

Struktur list:

```text
Index :  0    1    2    3    4
         ↓    ↓    ↓    ↓    ↓
Value : "a"  "b"  "c"  "d"  "e"
```

---

## 2. Sintaks `index()`

Bentuk umum:

```python
list.index(value)
```

Contohnya:

```python
basket = ["a", "b", "c", "d", "e"]

position = basket.index("c")

print(position)
```

Hasil:

```text
2
```

Method `index()` mengembalikan posisi **kemunculan pertama** dari nilai yang dicari.

---

## 3. `index()` dengan Nilai yang Duplikat

Jika sebuah nilai muncul beberapa kali, `index()` akan mengembalikan index dari **kemunculan pertama**.

Contohnya:

```python
basket = ["a", "b", "c", "d", "c", "e"]

print(basket.index("c"))
```

Hasil:

```text
2
```

Meskipun `"c"` juga berada di index `4`, `index()` mengembalikan index `2` karena `"c"` pertama kali ditemukan di sana.

---

## 4. `index()` dengan `start` dan `stop`

Method `index()` juga memiliki parameter tambahan untuk menentukan **jangkauan pencarian**.

Sintaks:

```python
list.index(value, start, stop)
```

Contohnya:

```python
basket = ["a", "b", "c", "d", "e"]

print(basket.index("d", 0, 4))
```

Hasil:

```text
3
```

Pencarian dilakukan mulai dari index `0` sampai sebelum index `4`.

---

## 5. Contoh Pencarian dengan Range

Perhatikan:

```python
basket = ["a", "b", "c", "d", "e"]

print(basket.index("d", 0, 2))
```

Kode tersebut akan menghasilkan error karena pencarian hanya dilakukan pada:

```text
Index 0
Index 1
```

Sedangkan `"d"` berada pada:

```text
Index 3
```

Dengan kata lain, nilai yang dicari tidak berada dalam jangkauan pencarian.

---

## 6. Jika Elemen Tidak Ditemukan

Jika nilai yang dicari tidak terdapat di dalam list, `index()` akan menghasilkan:

```text
ValueError
```

Contohnya:

```python
basket = ["a", "b", "c", "d", "e"]

print(basket.index("x"))
```

Python akan menghasilkan error karena `"x"` tidak terdapat di dalam list.

Hal ini perlu diperhatikan ketika menggunakan `index()` pada data yang belum kita ketahui isinya.

---

## 7. Memeriksa Elemen dengan Keyword `in`

Untuk mengetahui apakah sebuah nilai terdapat di dalam list, kita dapat menggunakan keyword:

```python
in
```

Keyword `in` menghasilkan nilai Boolean:

```text
True
```

atau:

```text
False
```

Contohnya:

```python
basket = ["a", "b", "c", "d", "e"]

print("c" in basket)
```

Hasil:

```text
True
```

Karena `"c"` terdapat di dalam list.

---

## 8. Jika Elemen Tidak Ada

Contohnya:

```python
basket = ["a", "b", "c", "d", "e"]

print("x" in basket)
```

Hasil:

```text
False
```

Tidak seperti `index()`, penggunaan `in` tidak menghasilkan `ValueError` ketika nilai tidak ditemukan.

---

## 9. Menggunakan `in` dengan Kondisional

Keyword `in` sangat berguna ketika ingin melakukan pemeriksaan sebelum menjalankan suatu operasi.

Contohnya:

```python
basket = ["apple", "banana", "orange"]

if "banana" in basket:
    print("Banana tersedia")
```

Hasil:

```text
Banana tersedia
```

Konsep `if` akan dipelajari lebih lanjut pada materi **conditional statements**.

Untuk saat ini, cukup pahami bahwa:

```python
"banana" in basket
```

menghasilkan:

```text
True
```

jika `"banana"` terdapat di dalam list.

---

## 10. Keyword `in` Tidak Hanya untuk List

Keyword `in` juga dapat digunakan untuk memeriksa keberadaan karakter atau teks di dalam string.

Contohnya:

```python
print("a" in "banana")
```

Hasil:

```text
True
```

Karena karakter `"a"` terdapat di dalam string `"banana"`.

Contoh lainnya:

```python
print("Python" in "I am learning Python")
```

Hasil:

```text
True
```

---

## 11. `in` pada String

Keyword `in` dapat digunakan untuk mencari bagian tertentu dari sebuah string.

Contohnya:

```python
text = "hello world"

print("hello" in text)
```

Hasil:

```text
True
```

Sedangkan:

```python
print("python" in text)
```

Hasil:

```text
False
```

Perlu diperhatikan bahwa pencarian string bersifat **case-sensitive**.

Contohnya:

```python
print("Hello" in "hello world")
```

Hasil:

```text
False
```

Karena:

```text
"Hello" ≠ "hello"
```

---

## 12. Menghitung Kemunculan dengan `count()`

Method:

```python
count()
```

digunakan untuk menghitung **berapa kali sebuah nilai muncul** di dalam list.

Contohnya:

```python
basket = ["a", "b", "c", "d", "e", "d"]

print(basket.count("d"))
```

Hasil:

```text
2
```

Karena `"d"` muncul dua kali.

---

## 13. `count()` Jika Elemen Tidak Ada

Jika nilai yang dicari tidak terdapat di dalam list, `count()` tidak menghasilkan error.

Contohnya:

```python
basket = ["a", "b", "c", "d", "e"]

print(basket.count("x"))
```

Hasil:

```text
0
```

Artinya `"x"` muncul sebanyak:

```text
0 kali
```

---

## 14. Contoh `count()` dengan Banyak Kemunculan

Contohnya:

```python
numbers = [1, 2, 2, 3, 2, 4, 2]

print(numbers.count(2))
```

Hasil:

```text
4
```

Karena angka `2` muncul sebanyak empat kali.

---

## 15. Perbedaan `index()`, `in`, dan `count()`

Ketiga operasi ini memiliki tujuan yang berbeda.

### `index()`

Digunakan untuk mengetahui **posisi** elemen.

```python
basket.index("apple")
```

Hasil:

```text
Index elemen
```

---

### `in`

Digunakan untuk mengetahui apakah elemen **ada atau tidak**.

```python
"apple" in basket
```

Hasil:

```text
True
```

atau:

```text
False
```

---

### `count()`

Digunakan untuk mengetahui **berapa kali** elemen muncul.

```python
basket.count("apple")
```

Hasil:

```text
Jumlah kemunculan
```

---

## 16. Perbandingan

Misalnya:

```python
basket = ["apple", "banana", "apple", "orange"]
```

### Mencari posisi

```python
print(basket.index("apple"))
```

Hasil:

```text
0
```

### Memeriksa keberadaan

```python
print("apple" in basket)
```

Hasil:

```text
True
```

### Menghitung kemunculan

```python
print(basket.count("apple"))
```

Hasil:

```text
2
```

---

## 17. Menggunakan `in` Sebelum `index()`

Karena `index()` menghasilkan error jika elemen tidak ditemukan, kita dapat menggunakan `in` terlebih dahulu.

Contohnya:

```python
basket = ["apple", "banana", "orange"]

if "banana" in basket:
    print(basket.index("banana"))
```

Hasil:

```text
1
```

Dengan cara ini, kita memastikan elemen tersebut ada sebelum mencari index-nya.

---

## 18. Ringkasan

| Operasi | Fungsi | Jika Tidak Ditemukan |
| --- | --- | --- |
| `index()` | Mencari posisi/index | `ValueError` |
| `in` | Memeriksa keberadaan | `False` |
| `count()` | Menghitung jumlah kemunculan | `0` |

Contoh:

```python
basket = ["a", "b", "c", "d", "c"]
```

Mencari index:

```python
basket.index("c")
```

Hasil:

```text
2
```

Memeriksa keberadaan:

```python
"c" in basket
```

Hasil:

```text
True
```

Menghitung kemunculan:

```python
basket.count("c")
```

Hasil:

```text
2
```

---

## Kesimpulan

Python menyediakan beberapa cara sederhana untuk mencari dan memeriksa data dalam list.

Gunakan:

```python
list.index(value)
```

ketika membutuhkan **posisi/index** sebuah elemen.

Gunakan:

```python
value in list
```

ketika hanya perlu mengetahui apakah sebuah elemen **ada atau tidak**.

Gunakan:

```python
list.count(value)
```

ketika ingin mengetahui **berapa kali sebuah elemen muncul**.

Konsep yang perlu diingat:

```text
index()
   ↓
Di mana posisinya?

in
   ↓
Apakah ada?

count()
   ↓
Berapa kali muncul?
```

:::tip
**Pilih operasi sesuai kebutuhan: `index()` untuk posisi, `in` untuk keberadaan, dan `count()` untuk jumlah kemunculan.**
:::