---
sidebar_position: 32
title: "List Unpacking"
---

**List unpacking** adalah fitur Python yang memungkinkan kita membongkar elemen-elemen dari sebuah list dan memasukkannya langsung ke beberapa variabel.

Dengan list unpacking, kita tidak perlu mengambil setiap elemen menggunakan index satu per satu.

---

## 1. Unpacking Dasar

Perhatikan list berikut:

```python
numbers = [1, 2, 3]
```

Tanpa unpacking, kita dapat mengambil setiap elemen menggunakan index:

```python
a = numbers[0]
b = numbers[1]
c = numbers[2]

print(a)
print(b)
print(c)
```

Dengan unpacking, penulisannya menjadi lebih sederhana:

```python
a, b, c = [1, 2, 3]

print(a)
print(b)
print(c)
```

Hasil:

```text
1
2
3
```

Python secara otomatis memetakan setiap elemen ke variabel berdasarkan posisinya.

---

## 2. Cara Kerja Unpacking

Misalnya:

```python
a, b, c = [1, 2, 3]
```

Prosesnya dapat dibayangkan seperti:

```text
a  ←  1
b  ←  2
c  ←  3
```

Atau:

```text
[1, 2, 3]
 ↓  ↓  ↓
 a  b  c
```

Urutan elemen sangat penting.

Contohnya:

```python
first, second, third = ["Python", "Java", "Kotlin"]

print(first)
print(second)
print(third)
```

Hasil:

```text
Python
Java
Kotlin
```

---

## 3. Jumlah Variabel Harus Sesuai

Pada unpacking biasa, jumlah variabel harus sesuai dengan jumlah elemen yang akan dibongkar.

Contohnya:

```python
a, b, c = [1, 2, 3]
```

Kode tersebut valid karena terdapat:

```text
3 variabel
3 elemen
```

Namun:

```python
a, b = [1, 2, 3]
```

akan menghasilkan error karena terdapat:

```text
2 variabel
3 elemen
```

Sebaliknya:

```python
a, b, c, d = [1, 2, 3]
```

juga akan menghasilkan error karena terdapat:

```text
4 variabel
3 elemen
```

Untuk menangani jumlah elemen yang tidak tetap, kita dapat menggunakan operator `*`.

---

## 4. Unpacking dengan `*`

Python menyediakan operator:

```python
*
```

dalam unpacking untuk menampung **sisa elemen**.

Contohnya:

```python
a, b, *other = [1, 2, 3, 4, 5]
```

Hasilnya:

```text
a     → 1
b     → 2
other → [3, 4, 5]
```

Jika ditampilkan:

```python
print(a)
print(b)
print(other)
```

Hasil:

```text
1
2
[3, 4, 5]
```

---

## 5. Variabel dengan `*` Selalu Mendapatkan List

Perhatikan:

```python
a, b, *other = [1, 2, 3, 4, 5]
```

Nilai:

```python
a
```

adalah:

```text
1
```

Nilai:

```python
b
```

adalah:

```text
2
```

Sedangkan:

```python
other
```

adalah:

```text
[3, 4, 5]
```

Jadi variabel yang menggunakan `*` akan menampung sisa elemen dalam bentuk **list**.

---

## 6. Mengambil Elemen Awal dan Sisa Elemen

Contohnya:

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

a, b, c, *other = numbers

print(a)
print(b)
print(c)
print(other)
```

Hasil:

```text
1
2
3
[4, 5, 6, 7, 8, 9]
```

Strukturnya:

```text
1 → a
2 → b
3 → c
4 ─┐
5  │
6  │
7  ├──→ other
8  │
9 ─┘
```

---

## 7. Mengambil Elemen Awal dan Elemen Terakhir

Operator `*` juga dapat digunakan di antara variabel lainnya.

Contohnya:

```python
a, b, *other, c = [1, 2, 3, 4, 5, 6, 7, 8, 9]

print(a)
print(b)
print(other)
print(c)
```

Hasil:

```text
1
2
[3, 4, 5, 6, 7, 8]
9
```

Prosesnya:

```text
1       → a
2       → b
3 - 8   → other
9       → c
```

Dengan cara ini, kita dapat mengambil elemen awal dan akhir sekaligus menyimpan elemen di tengah.

---

## 8. Contoh dengan Data Pengguna

List unpacking tidak hanya digunakan dengan angka.

Misalnya:

```python
user = ["Andi", 25, "Indonesia"]

name, age, country = user

print(name)
print(age)
print(country)
```

Hasil:

```text
Andi
25
Indonesia
```

Setiap elemen langsung dimasukkan ke variabel yang sesuai.

---

## 9. Mengambil Data Tertentu dari List

Misalnya terdapat data:

```python
scores = [90, 85, 80, 75, 70]
```

Kita hanya ingin mengambil dua nilai pertama dan menyimpan sisanya:

```python
first, second, *remaining = scores

print(first)
print(second)
print(remaining)
```

Hasil:

```text
90
85
[80, 75, 70]
```

---

## 10. Unpacking dengan `*` di Awal

Operator `*` juga dapat digunakan untuk mengambil sisa elemen di awal.

Contohnya:

```python
*other, last = [1, 2, 3, 4, 5]
```

Hasil:

```text
other → [1, 2, 3, 4]
last  → 5
```

Contohnya:

```python
print(other)
print(last)
```

Hasil:

```text
[1, 2, 3, 4]
5
```

---

## 11. Unpacking di Tengah

Kita juga dapat menempatkan `*` di tengah.

Contohnya:

```python
first, *middle, last = [1, 2, 3, 4, 5]
```

Hasil:

```text
first  → 1
middle → [2, 3, 4]
last   → 5
```

Sehingga:

```python
print(first)
print(middle)
print(last)
```

menghasilkan:

```text
1
[2, 3, 4]
5
```

---

## 12. Unpacking Tidak Harus Menggunakan List

Konsep unpacking juga dapat digunakan pada sequence lainnya, seperti tuple.

Contohnya:

```python
a, b, c = (1, 2, 3)

print(a)
print(b)
print(c)
```

Hasil:

```text
1
2
3
```

Konsep dasarnya tetap sama:

```text
Sequence
    ↓
Unpacking
    ↓
Beberapa variabel
```

---

## 13. Perbandingan dengan Indexing

Misalnya:

```python
numbers = [10, 20, 30]
```

Menggunakan indexing:

```python
first = numbers[0]
second = numbers[1]
third = numbers[2]
```

Menggunakan unpacking:

```python
first, second, third = numbers
```

Unpacking membuat kode lebih ringkas dan menunjukkan secara langsung bagaimana setiap nilai dipetakan ke variabel.

---

## 14. Perbandingan dengan Slicing

Misalnya:

```python
numbers = [1, 2, 3, 4, 5]
```

Dengan slicing:

```python
first = numbers[0]
remaining = numbers[1:]
```

Dengan unpacking:

```python
first, *remaining = numbers
```

Hasil keduanya secara konsep sama:

```text
first     → 1
remaining → [2, 3, 4, 5]
```

Namun unpacking dapat membuat tujuan kode lebih jelas ketika kita memang ingin memetakan data ke beberapa variabel.

---

## 15. Hal yang Perlu Diperhatikan

Operator `*` digunakan untuk menampung **sisa elemen**.

Contohnya:

```python
a, *other = [1, 2, 3, 4]
```

maka:

```text
a     → 1
other → [2, 3, 4]
```

Jika tidak ada elemen yang tersisa:

```python
a, *other = [1]
```

maka:

```text
a     → 1
other → []
```

Variabel `other` tetap berupa list.

---

## 16. Ringkasan Pola Unpacking

### Unpacking biasa

```python
a, b, c = [1, 2, 3]
```

Hasil:

```text
a → 1
b → 2
c → 3
```

### Mengambil elemen awal

```python
a, *other = [1, 2, 3, 4]
```

Hasil:

```text
a     → 1
other → [2, 3, 4]
```

### Mengambil elemen awal dan akhir

```python
a, *other, b = [1, 2, 3, 4]
```

Hasil:

```text
a     → 1
other → [2, 3]
b     → 4
```

### Mengambil elemen terakhir

```python
*other, last = [1, 2, 3, 4]
```

Hasil:

```text
other → [1, 2, 3]
last  → 4
```

---

## Kesimpulan

**List unpacking** memungkinkan kita membongkar isi list dan memasukkannya langsung ke beberapa variabel.

Unpacking dasar:

```python
a, b, c = [1, 2, 3]
```

Untuk menampung sisa elemen, gunakan:

```python
*
```

Contohnya:

```python
a, b, *other = [1, 2, 3, 4, 5]
```

Hasil:

```text
a     → 1
b     → 2
other → [3, 4, 5]
```

Operator `*` sangat berguna ketika jumlah elemen yang ingin diambil secara langsung lebih sedikit daripada jumlah keseluruhan elemen.

:::info
**List unpacking membuat pengambilan beberapa nilai dari sequence menjadi lebih ringkas dan mudah dibaca tanpa harus mengakses setiap elemen menggunakan index secara manual.**
:::