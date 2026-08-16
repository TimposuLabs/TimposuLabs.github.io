---
sidebar_position: 20
title: "String Immutability"
---

Dalam Python, **string (`str`)** bersifat **immutable**. Immutable berarti sebuah object **tidak dapat diubah isinya setelah object tersebut dibuat**.

Konsep ini penting untuk dipahami karena kita tetap dapat memberikan nilai baru kepada sebuah variable string, tetapi kita tidak dapat mengubah karakter tertentu dari string yang sudah ada secara langsung.

---

## 1. Apa Itu Immutability?

Immutability adalah sifat sebuah object yang tidak memungkinkan isi object tersebut diubah setelah dibuat.

Contohnya:

```python
name = "Python"
```

String:

```text
Python
```

merupakan sebuah object string.

Kita tidak dapat mengubah salah satu karakter di dalam object tersebut secara langsung.

Misalnya kita mencoba mengubah karakter pertama:

```python
name[0] = "J"
```

Python akan menghasilkan error:

```text
TypeError: 'str' object does not support item assignment
```

Artinya, object `str` tidak mendukung perubahan karakter melalui assignment berdasarkan index.

---

## 2. Mengapa String Immutable?

String dirancang sebagai tipe data yang tidak dapat diubah setelah dibuat.

Perhatikan:

```python
selfish = "01234567"
```

Kita dapat membaca karakter tertentu:

```python
print(selfish[0])
```

Hasil:

```text
0
```

Namun, kita tidak dapat mengubah karakter tersebut secara langsung:

```python
selfish[0] = "8"
```

Kode tersebut tidak diperbolehkan karena kita mencoba melakukan **item assignment** terhadap string.

---

## 3. String Tidak Bisa Diubah melalui Index

Sebelumnya kita sudah mempelajari string indexing.

Contohnya:

```python
selfish = "01234567"

print(selfish[0])
```

Indexing digunakan untuk **membaca** karakter.

Namun, indexing tidak dapat digunakan untuk **mengubah** karakter.

Contoh yang tidak valid:

```python
selfish[0] = "8"
```

Jadi:

```text
selfish[0]
    ↓
Membaca karakter → diperbolehkan

selfish[0] = "8"
    ↓
Mengubah karakter → tidak diperbolehkan
```

---

## 4. Reassignment Berbeda dengan Mengubah String

Walaupun string immutable, kita tetap dapat memberikan nilai baru kepada sebuah variable.

Contohnya:

```python
selfish = "01234567"

selfish = "100"

print(selfish)
```

Hasil:

```text
100
```

Hal ini **bukan berarti string lama diubah**.

Yang terjadi adalah variable `selfish` sekarang direferensikan ke string baru.

Secara sederhana:

```text
Sebelumnya:

selfish
   │
   ▼
"01234567"


Setelah reassignment:

selfish
   │
   ▼
"100"
```

Object string `"01234567"` tidak diubah menjadi `"100"`.

Variable tersebut hanya mendapatkan referensi baru.

---

## 5. Membuat String Baru

Jika kita ingin menghasilkan string dengan isi yang berbeda, kita dapat membuat string baru.

Salah satu caranya menggunakan concatenation.

Contohnya:

```python
selfish = "01234567"

selfish = selfish + "8"

print(selfish)
```

Hasil:

```text
012345678
```

Expression:

```python
selfish + "8"
```

menghasilkan **string baru**.

String lama tidak dimodifikasi.

---

## 6. Menggunakan Concatenation

Perhatikan contoh:

```python
text = "Hello"

text = text + " Python"

print(text)
```

Hasil:

```text
Hello Python
```

Yang terjadi secara konsep:

```text
"Hello"
   +
" Python"
   ↓
"Hello Python"
```

Python menghasilkan object string baru.

---

## 7. Menggunakan Slicing untuk Membuat String Baru

Kita juga dapat menggunakan slicing untuk menghasilkan string baru.

Misalnya:

```python
text = "Python"

text = text[:2] + "XX" + text[4:]

print(text)
```

Hasil:

```text
PyXXon
```

Kita tidak mengubah karakter di dalam string `"Python"` secara langsung.

Sebaliknya, kita membuat string baru dari beberapa bagian string.

Secara konsep:

```text
"Python"
  │
  ├── "Py"
  │
  ├── "XX"
  │
  └── "on"
       ↓
   "PyXXon"
```

---

## 8. String Lama Tidak Diubah

Perhatikan contoh berikut:

```python
text = "Python"

new_text = text + " Programming"

print(text)
print(new_text)
```

Hasil:

```text
Python
Python Programming
```

Variable `text` tetap merujuk pada:

```text
"Python"
```

Sedangkan `new_text` merujuk pada string baru:

```text
"Python Programming"
```

Jadi, proses tersebut tidak mengubah string asli.

---

## 9. Reassignment pada String

Reassignment berarti memberikan nilai baru kepada sebuah variable.

Contohnya:

```python
language = "Python"

language = "Java"

print(language)
```

Hasil:

```text
Java
```

Sekali lagi, bukan string `"Python"` yang berubah menjadi `"Java"`.

Yang berubah adalah **referensi variable `language`**.

Secara sederhana:

```text
Awalnya:

language ──→ "Python"


Setelah reassignment:

language ──→ "Java"
```

---

## 10. Immutability dan Memory

Konsep immutability juga berkaitan dengan bagaimana kita memahami object dan reference dalam Python.

Misalnya:

```python
text = "Hello"
```

Kemudian:

```python
text = "World"
```

Secara konseptual, Python tidak mengubah object string `"Hello"` menjadi `"World"`.

Sebaliknya, variable `text` sekarang merujuk pada object string lainnya.

```text
Sebelum:

text
 │
 ▼
"Hello"


Sesudah:

text
 │
 ▼
"World"
```

Object lama dapat menjadi tidak lagi digunakan jika tidak ada reference lain yang mengarah kepadanya.

Pengelolaan object yang tidak lagi digunakan merupakan bagian dari mekanisme **memory management** Python.

---

## 11. Immutable Bukan Berarti Variable Tidak Bisa Berubah

Ini merupakan salah satu hal yang sering membingungkan pemula.

Perhatikan:

```python
name = "Python"

name = "Java"
```

Kita mungkin mengatakan:

> "Nilai variable `name` berubah."

Secara sederhana pernyataan tersebut memang mudah dipahami.

Namun secara konsep object:

```text
String "Python" tidak berubah.

Variable name sekarang mereferensikan
string "Java".
```

Jadi:

> **Immutable berlaku pada object, bukan berarti variable tidak boleh diberikan nilai baru.**

---

## 12. Contoh yang Tidak Valid

Berikut contoh perubahan karakter secara langsung:

```python
selfish = "01234567"

selfish[0] = "9"
```

Kode tersebut menghasilkan:

```text
TypeError
```

Karena string tidak mendukung item assignment.

Contoh lainnya:

```python
name = "Python"

name[1] = "A"
```

juga tidak diperbolehkan.

---

## 13. Cara yang Benar untuk Menghasilkan String Baru

Jika kita ingin menghasilkan string dengan karakter yang berbeda, kita dapat membuat string baru.

Contohnya:

```python
name = "Python"

name = "J" + name[1:]

print(name)
```

Hasil:

```text
Jython
```

Kita tidak mengubah karakter pertama dari `"Python"`.

Kita membuat string baru:

```text
"J" + "ython"
     ↓
"Jython"
```

---

## 14. Contoh Lain

Misalnya kita memiliki:

```python
text = "Hello"
```

Kita ingin menghasilkan:

```text
Hallo
```

Kita tidak dapat melakukan:

```python
text[1] = "a"
```

Sebagai gantinya, kita dapat membuat string baru:

```python
text = text[0] + "a" + text[2:]

print(text)
```

Hasil:

```text
Hallo
```

---

## 15. Hubungan dengan String Slicing

Konsep immutability sangat berkaitan dengan materi **String Slicing**.

Slicing:

```python
text = "Python"

result = text[0:3]
```

menghasilkan string baru:

```text
Pyt
```

String asli:

```text
Python
```

tetap tidak berubah.

```text
text
 │
 ▼
"Python"

result
 │
 ▼
"Pyt"
```

---

## 16. Mengapa Immutability Penting?

Immutability memberikan beberapa keuntungan dalam desain bahasa pemrograman.

Salah satunya adalah object yang immutable dapat digunakan dengan lebih aman karena isinya tidak dapat diubah secara tidak sengaja.

Hal ini juga berkaitan dengan konsep seperti:

- Object reference.
- Memory management.
- Hashing.
- Dictionary key.
- Set.
- Thread safety pada konteks tertentu.

Pada tahap Python dasar, hal yang paling penting adalah memahami bahwa **isi string tidak dapat diubah secara langsung**.

---

## 17. Ringkasan

| Operasi | Diperbolehkan? | Contoh |
| --- | --- | --- |
| Membaca karakter | Ya | `text[0]` |
| String slicing | Ya | `text[1:4]` |
| Concatenation | Ya | `text + "!"` |
| Reassignment variable | Ya | `text = "Python"` |
| Mengubah karakter melalui index | Tidak | `text[0] = "X"` |

---

## Kesimpulan

String di Python bersifat **immutable**.

Artinya, setelah sebuah object string dibuat, karakter di dalam object tersebut tidak dapat diubah secara langsung.

Contoh yang tidak diperbolehkan:

```python
text = "Python"

text[0] = "J"
```

Python akan menghasilkan `TypeError`.

Jika kita membutuhkan string dengan isi berbeda, kita dapat membuat **string baru**.

Contohnya:

```python
text = "Python"

text = "J" + text[1:]

print(text)
```

Hasil:

```text
Jython
```

Kita juga dapat melakukan reassignment:

```python
text = "Python"

text = "Java"
```

Dalam kasus ini, string `"Python"` tidak diubah menjadi `"Java"`. Variable `text` hanya sekarang merujuk pada object string yang baru.

:::info
**String immutable berarti isi object string tidak dapat diubah secara langsung. Jika membutuhkan isi yang berbeda, buat string baru atau lakukan reassignment pada variable.**
:::