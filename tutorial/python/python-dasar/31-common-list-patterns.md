---
sidebar_position: 31
title: "Common List Patterns"
---

Python memiliki beberapa pola atau teknik yang sering digunakan ketika bekerja dengan list.

Pola-pola ini membantu menulis kode yang lebih singkat dan memanfaatkan kemampuan bawaan Python.

Pada materi ini kita akan mempelajari:

- Membalikkan list menggunakan slicing.
- Membuat list angka menggunakan `range()`.
- Menggabungkan list string menggunakan `join()`.

---

## 1. Membalikkan List dengan Slicing

Selain menggunakan method:

```python
reverse()
```

kita juga dapat membalikkan list menggunakan slicing:

```python
[::-1]
```

Contohnya:

```python
basket = ["a", "b", "c", "d", "e"]

reversed_basket = basket[::-1]

print(reversed_basket)
```

Hasil:

```text
['e', 'd', 'c', 'b', 'a']
```

---

## 2. Slicing `[::-1]` Tidak Mengubah List Asli

Salah satu kelebihan menggunakan slicing adalah hasilnya berupa **list baru**.

List asli tidak berubah.

Contohnya:

```python
basket = ["a", "b", "c", "d", "e"]

reversed_basket = basket[::-1]

print(reversed_basket)
print(basket)
```

Hasil:

```text
['e', 'd', 'c', 'b', 'a']
['a', 'b', 'c', 'd', 'e']
```

Berbeda dengan:

```python
basket.reverse()
```

yang mengubah list secara langsung.

Dengan demikian:

```text
reverse()
    ↓
Membalikkan list asli

[::-1]
    ↓
Membuat list baru
```

---

## 3. Memahami `[::-1]`

Slicing memiliki format:

```python
[start:stop:step]
```

Pada:

```python
basket[::-1]
```

nilai:

```text
start = default
stop  = default
step  = -1
```

`step` bernilai `-1` menyebabkan Python membaca elemen dari belakang ke depan.

Contohnya:

```text
'a' → 'b' → 'c' → 'd' → 'e'
                         ↓
'e' → 'd' → 'c' → 'b' → 'a'
```

---

## 4. Membuat List Angka dengan `range()`

Python menyediakan built-in function:

```python
range()
```

untuk menghasilkan urutan angka.

Contohnya:

```python
numbers = range(10)

print(numbers)
```

`range()` menghasilkan objek `range`.

Jika kita ingin mendapatkan list, kita dapat menggunakan:

```python
list()
```

Contohnya:

```python
numbers = list(range(10))

print(numbers)
```

Hasil:

```text
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

---

## 5. `range()` dengan Satu Argument

Jika hanya memberikan satu argument:

```python
range(stop)
```

Python akan memulai dari `0`.

Contohnya:

```python
numbers = list(range(5))

print(numbers)
```

Hasil:

```text
[0, 1, 2, 3, 4]
```

Perhatikan bahwa angka `5` **tidak termasuk**.

---

## 6. `range()` dengan `start` dan `stop`

Kita juga dapat menentukan angka awal dan angka akhir.

Sintaks:

```python
range(start, stop)
```

Contohnya:

```python
numbers = list(range(1, 10))

print(numbers)
```

Hasil:

```text
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Angka `1` termasuk, sedangkan angka `10` tidak termasuk.

---

## 7. Aturan `stop` pada `range()`

Seperti slicing, nilai `stop` pada `range()` bersifat **eksklusif**.

Contohnya:

```python
list(range(1, 5))
```

menghasilkan:

```text
[1, 2, 3, 4]
```

Bukan:

```text
[1, 2, 3, 4, 5]
```

Jadi:

```text
range(1, 5)

Mulai → 1
Berhenti sebelum → 5
```

---

## 8. `range()` untuk Membuat Banyak Angka

Misalnya kita membutuhkan angka dari `1` sampai `99`.

Daripada menulis:

```python
numbers = [1, 2, 3, 4, 5, ...]
```

kita dapat menggunakan:

```python
numbers = list(range(1, 100))
```

Hasilnya adalah list yang berisi:

```text
1, 2, 3, ..., 99
```

Teknik ini jauh lebih praktis untuk membuat urutan angka.

---

## 9. `range()` dengan Step

`range()` juga dapat menerima argument ketiga untuk menentukan langkah.

Sintaks:

```python
range(start, stop, step)
```

Contohnya:

```python
numbers = list(range(0, 10, 2))

print(numbers)
```

Hasil:

```text
[0, 2, 4, 6, 8]
```

Python melompat dua angka setiap kali berpindah.

Contoh lainnya:

```python
numbers = list(range(1, 11, 2))

print(numbers)
```

Hasil:

```text
[1, 3, 5, 7, 9]
```

---

## 10. Menggabungkan List String dengan `join()`

Method:

```python
join()
```

merupakan **string method** yang dapat digunakan untuk menggabungkan beberapa string menjadi satu string.

Sintaksnya:

```python
"separator".join(list_string)
```

Contohnya:

```python
words = ["hi", "my", "name", "is", "Jojo"]

sentence = " ".join(words)

print(sentence)
```

Hasil:

```text
hi my name is Jojo
```

---

## 11. Cara Kerja `join()`

Perhatikan:

```python
" ".join(["hi", "my", "name"])
```

String:

```text
" "
```

berfungsi sebagai **pemisah**.

Hasilnya:

```text
hi my name
```

Secara konsep:

```text
"hi" + " " + "my" + " " + "name"
```

menjadi:

```text
"hi my name"
```

---

## 12. Menggunakan Pemisah Lain

Pemisah tidak harus berupa spasi.

Kita dapat menggunakan karakter lain.

### Menggunakan tanda hubung

```python
result = "-".join(["a", "b", "c"])

print(result)
```

Hasil:

```text
a-b-c
```

### Menggunakan koma

```python
result = ",".join(["apel", "mangga", "jeruk"])

print(result)
```

Hasil:

```text
apel,mangga,jeruk
```

### Menggunakan garis miring

```python
result = "/".join(["2026", "08", "15"])

print(result)
```

Hasil:

```text
2026/08/15
```

---

## 13. `join()` Menghasilkan String Baru

Method `join()` tidak mengubah list yang digunakan.

Contohnya:

```python
words = ["Python", "is", "fun"]

sentence = " ".join(words)

print(sentence)
print(words)
```

Hasil:

```text
Python is fun
['Python', 'is', 'fun']
```

List tetap sama, sedangkan `sentence` berisi string baru.

---

## 14. Elemen List Harus Berupa String

`join()` digunakan untuk menggabungkan elemen yang berupa string.

Contohnya:

```python
words = ["Hello", "Python", "World"]

result = " ".join(words)

print(result)
```

Hasil:

```text
Hello Python World
```

Namun jika list berisi tipe data lain:

```python
numbers = [1, 2, 3]

result = " ".join(numbers)
```

Python akan menghasilkan `TypeError` karena elemen list bukan string.

Jika ingin menggabungkan angka, angka tersebut perlu dikonversi menjadi string terlebih dahulu.

---

## 15. Kombinasi `range()` dan `join()`

Beberapa teknik Python dapat digunakan bersama.

Misalnya, kita ingin menghasilkan teks:

```text
1-2-3-4-5
```

Kita dapat menggunakan:

```python
numbers = list(range(1, 6))

numbers = [str(number) for number in numbers]

result = "-".join(numbers)

print(result)
```

Hasil:

```text
1-2-3-4-5
```

Konsep list comprehension pada contoh tersebut akan dibahas lebih lanjut pada materi tersendiri.

---

## 16. Perbandingan Pola

### Membalikkan list

```python
basket[::-1]
```

Menghasilkan list baru dengan urutan terbalik.

### Membuat urutan angka

```python
list(range(1, 10))
```

Menghasilkan list angka dari `1` sampai sebelum `10`.

### Menggabungkan string

```python
" ".join(words)
```

Menggabungkan elemen string menggunakan spasi sebagai pemisah.

---

## 17. Ringkasan

| Pola | Fungsi | Hasil |
| --- | --- | --- |
| `list[::-1]` | Membalikkan list | List baru |
| `list(range(10))` | Membuat urutan angka | List angka |
| `list(range(1, 10))` | Membuat angka dengan `start` dan `stop` | List angka |
| `list(range(1, 10, 2))` | Membuat angka dengan `step` | List angka |
| `" ".join(list)` | Menggabungkan string | String baru |

---

## Kesimpulan

Python menyediakan berbagai pola sederhana untuk melakukan pekerjaan yang sering dibutuhkan ketika menggunakan list.

Untuk membalikkan list tanpa mengubah list asli, gunakan:

```python
reversed_basket = basket[::-1]
```

Untuk membuat list angka dengan cepat, gunakan:

```python
numbers = list(range(1, 100))
```

Untuk menggabungkan beberapa string menjadi satu string, gunakan:

```python
sentence = " ".join(words)
```

Ketiga pola tersebut merupakan teknik yang sangat umum ditemukan dalam kode Python.

Hal penting yang perlu diingat:

```text
[::-1]
    ↓
Membalikkan list dan menghasilkan list baru

range()
    ↓
Membuat urutan angka

join()
    ↓
Menggabungkan string menjadi satu string
```

:::tip
**Pahami pola-pola umum seperti ini karena Python dirancang agar banyak operasi dapat ditulis dengan cara yang ringkas dan mudah dibaca.**
:::