---
sidebar_position: 9
title: "Iterables"
---

**Iterable** merupakan konsep penting dalam Python, terutama ketika bekerja dengan perulangan seperti `for`.

Secara sederhana, iterable adalah objek yang dapat diproses **satu elemen demi satu elemen**.

Konsep ini akan banyak digunakan ketika bekerja dengan list, tuple, set, string, dictionary, dan berbagai struktur data lainnya.

---

## Iterable dan Iterate

### Iterable

**Iterable** adalah objek yang dapat diiterasi atau dilalui elemen demi elemen.

Beberapa contoh objek yang termasuk iterable:

- `list`
- `tuple`
- `set`
- `string`
- `dictionary`

Contoh:

```python
numbers = [1, 2, 3, 4, 5]

for number in numbers:
    print(number)
```

Pada contoh tersebut, `numbers` merupakan iterable karena setiap elemennya dapat diproses satu per satu.

### Iterate

**Iterate** adalah proses melakukan iterasi terhadap sebuah iterable.

Contohnya:

```python
for number in [1, 2, 3]:
    print(number)
```

Prosesnya dapat digambarkan sebagai:

```text
1 → 2 → 3
```

Python mengambil setiap elemen secara berurutan dan menjalankan kode di dalam `for` untuk setiap elemen tersebut.

---

## Iterable dan Non-Iterable

Tidak semua objek Python dapat diiterasi.

Contoh iterable:

```python
for character in "Python":
    print(character)
```

String dapat diiterasi karena terdiri dari beberapa karakter.

Sebaliknya, tipe data seperti `int` bukan iterable:

```python
number = 100

for item in number:
    print(item)
```

Kode tersebut akan menghasilkan error karena integer tidak dapat diiterasi.

```text
TypeError: 'int' object is not iterable
```

Hal yang sama berlaku pada tipe data tunggal seperti `float`.

---

## Mengiterasi Dictionary

Dictionary juga merupakan iterable.

Misalnya:

```python
user = {
    "name": "Gollum",
    "age": 5000,
    "can_swim": False
}
```

Jika dictionary langsung digunakan dalam `for loop`, Python secara default akan melakukan iterasi terhadap **key**.

```python
for item in user:
    print(item)
```

Output:

```text
name
age
can_swim
```

Jadi, secara default:

```python
for item in dictionary:
```

akan menghasilkan key dari dictionary.

---

## Mengambil Key dengan `.keys()`

Method `.keys()` digunakan untuk mendapatkan seluruh key dari dictionary.

```python
user = {
    "name": "Gollum",
    "age": 5000,
    "can_swim": False
}

for key in user.keys():
    print(key)
```

Output:

```text
name
age
can_swim
```

Meskipun menuliskan:

```python
for key in user:
```

juga menghasilkan key, penggunaan `.keys()` dapat membuat maksud kode menjadi lebih eksplisit.

---

## Mengambil Value dengan `.values()`

Jika ingin melakukan iterasi terhadap nilai dictionary, gunakan `.values()`.

```python
for value in user.values():
    print(value)
```

Output:

```text
Gollum
5000
False
```

Method ini berguna ketika program hanya membutuhkan nilai tanpa perlu mengetahui key-nya.

---

## Mengambil Key dan Value dengan `.items()`

Jika program membutuhkan **key dan value sekaligus**, gunakan `.items()`.

```python
for item in user.items():
    print(item)
```

Output:

```text
("name", "Gollum")
("age", 5000)
("can_swim", False)
```

Setiap item yang dihasilkan oleh `.items()` merupakan pasangan key dan value dalam bentuk tuple.

---

## Tuple Unpacking pada `.items()`

Karena `.items()` menghasilkan pasangan key dan value, kita dapat menggunakan **tuple unpacking** secara langsung dalam `for loop`.

```python
for key, value in user.items():
    print(key, value)
```

Output:

```text
name Gollum
age 5000
can_swim False
```

Pada setiap iterasi:

```python
key, value
```

akan menerima dua nilai dari pasangan tuple yang dihasilkan oleh `.items()`.

Contohnya:

```text
("name", "Gollum")
```

akan dibongkar menjadi:

```text
key   = "name"
value = "Gollum"
```

Kemudian proses yang sama dilakukan untuk item berikutnya.

---

## Pola Singkat untuk Dictionary

Dalam kode Python, Anda akan sering menemukan pola berikut:

```python
for key, value in user.items():
    print(key, value)
```

Nama variabel juga sering dibuat lebih singkat:

```python
for k, v in user.items():
    print(k, v)
```

`k` biasanya digunakan sebagai singkatan dari **key**, sedangkan `v` digunakan sebagai singkatan dari **value**.

Namun, untuk kode yang membutuhkan keterbacaan tinggi, nama seperti `key` dan `value` biasanya lebih mudah dipahami.

---

## Perbandingan `.keys()`, `.values()`, dan `.items()`

| Method | Data yang Dihasilkan | Penggunaan |
|---|---|---|
| `.keys()` | Key | Ketika hanya membutuhkan key |
| `.values()` | Value | Ketika hanya membutuhkan value |
| `.items()` | Key dan value | Ketika membutuhkan keduanya |

Contoh:

```python
user = {
    "name": "Gollum",
    "age": 5000
}
```

Mengambil key:

```python
for key in user.keys():
    print(key)
```

Mengambil value:

```python
for value in user.values():
    print(value)
```

Mengambil key dan value:

```python
for key, value in user.items():
    print(key, value)
```

---

## Ringkasan

Beberapa konsep utama yang perlu diingat:

1. **Iterable** adalah objek yang dapat diiterasi elemen demi elemen.
2. **Iterate** adalah proses mengakses elemen dalam sebuah iterable.
3. List, tuple, set, string, dan dictionary merupakan contoh iterable.
4. Integer dan float bukan iterable.
5. Secara default, `for` pada dictionary melakukan iterasi terhadap key.
6. `.keys()` digunakan untuk mendapatkan key.
7. `.values()` digunakan untuk mendapatkan value.
8. `.items()` digunakan untuk mendapatkan pasangan key dan value.
9. `.items()` sering digunakan bersama **tuple unpacking**.

Pola yang sangat umum dalam Python adalah:

```python
for key, value in dictionary.items():
    print(key, value)
```

Memahami konsep iterable akan menjadi dasar penting untuk materi perulangan berikutnya, termasuk `range()`, `enumerate()`, `break`, `continue`, dan berbagai teknik pemrosesan koleksi data.