---
sidebar_position: 3
title: "Truthy & Falsy"
---

## Truthy dan Falsy Values

Dalam Python, sebuah kondisi tidak selalu harus menggunakan nilai Boolean secara eksplisit seperti `True` atau `False`.

Python dapat **mengevaluasi berbagai tipe data sebagai nilai kebenaran** ketika digunakan dalam kondisi seperti `if`, `while`, dan ekspresi logika.

Konsep ini disebut **Truthy dan Falsy**.

---

## Apa itu Truthy?

**Truthy** adalah nilai yang ketika dievaluasi oleh Python dianggap bernilai `True`.

Contohnya, string yang memiliki isi dan angka selain `0` merupakan nilai Truthy.

```python
if "hello":
    print("Hello adalah Truthy")

if 5:
    print("5 adalah Truthy")
```

Kedua kondisi tersebut akan dijalankan karena `"hello"` dan `5` dievaluasi sebagai `True`.

Kita juga dapat melihat hasil evaluasinya menggunakan fungsi `bool()`:

```python
print(bool("hello"))
print(bool(5))
```

Output:

```text
True
True
```

---

## Apa itu Falsy?

**Falsy** adalah nilai yang ketika dievaluasi oleh Python dianggap bernilai `False`.

Beberapa nilai Python secara bawaan memiliki sifat Falsy.

Contohnya:

```python
print(bool(False))
print(bool(None))
print(bool(0))
print(bool(""))
print(bool([]))
```

Output:

```text
False
False
False
False
False
```

---

## Nilai-Nilai Falsy di Python

Berikut beberapa nilai yang secara umum dianggap Falsy:

| Nilai | Keterangan |
| --- | --- |
| `False` | Boolean False |
| `None` | Tidak memiliki nilai |
| `0` | Integer nol |
| `0.0` | Float nol |
| `0j` | Complex nol |
| `""` | String kosong |
| `[]` | List kosong |
| `()` | Tuple kosong |
| `{}` | Dictionary kosong |
| `set()` | Set kosong |

Selain nilai-nilai tersebut, sebagian besar objek Python akan dievaluasi sebagai **Truthy**.

---

## Truthy dan Falsy pada String

String kosong merupakan Falsy.

```python
name = ""

if name:
    print("Nama tersedia")
else:
    print("Nama belum diisi")
```

Karena `name` berisi string kosong, kondisi `if name` bernilai `False`.

Sebaliknya:

```python
name = "Andi"

if name:
    print("Nama tersedia")
else:
    print("Nama belum diisi")
```

String `"Andi"` memiliki isi sehingga dianggap Truthy.

---

## Truthy dan Falsy pada Angka

Angka `0` merupakan Falsy, sedangkan angka selain `0` merupakan Truthy.

```python
print(bool(0))
print(bool(1))
print(bool(-10))
print(bool(3.14))
```

Output:

```text
False
True
True
True
```

Hal ini memungkinkan kita melakukan pemeriksaan kondisi dengan lebih sederhana.

```python
number = 10

if number:
    print("Number memiliki nilai")
```

---

## Truthy dan Falsy pada Collection

Collection yang kosong umumnya dianggap Falsy.

Contohnya:

```python
my_list = []

if my_list:
    print("List memiliki data")
else:
    print("List kosong")
```

Karena `my_list` kosong, kondisi `if` bernilai `False`.

Jika list memiliki elemen:

```python
my_list = [1, 2, 3]

if my_list:
    print("List memiliki data")
else:
    print("List kosong")
```

Kondisi tersebut bernilai `True`.

Konsep yang sama berlaku pada beberapa collection lainnya:

```python
print(bool([]))
print(bool([1, 2, 3]))

print(bool(()))
print(bool((1, 2)))

print(bool({}))
print(bool({"name": "Andi"}))
```

---

## Menggunakan Truthy dan Falsy pada Conditional

Truthy dan Falsy sangat sering digunakan bersama conditional.

Contohnya:

```python
username = "johnny"
password = "12345"

if username and password:
    print("Username dan password tersedia")
else:
    print("Username atau password belum diisi")
```

Python akan mengevaluasi kedua variabel tersebut.

Karena keduanya memiliki nilai, keduanya dianggap Truthy sehingga kondisi terpenuhi.

---

## Contoh Input Pengguna

Konsep Truthy dan Falsy juga berguna ketika memeriksa input pengguna.

```python
username = input("Username: ")

if username:
    print("Username sudah diisi")
else:
    print("Username belum diisi")
```

Jika pengguna memasukkan teks:

```text
Username: johnny
```

maka `username` memiliki nilai dan dianggap Truthy.

Jika pengguna langsung menekan Enter:

```text
Username:
```

maka `username` berisi string kosong dan dianggap Falsy.

---

## Truthy/Falsy vs Perbandingan Eksplisit

Perhatikan dua cara berikut.

### Cara eksplisit

```python
username = ""

if username != "":
    print("Username tersedia")
```

### Menggunakan Truthy/Falsy

```python
username = ""

if username:
    print("Username tersedia")
```

Keduanya dapat digunakan, tetapi pemeriksaan Truthy/Falsy sering membuat kode lebih ringkas dan mudah dibaca ketika memang yang ingin diperiksa adalah **apakah suatu nilai tersedia atau kosong**.

---

## Menggunakan `not`

Operator `not` dapat digunakan untuk membalik evaluasi Truthy/Falsy.

```python
username = ""

if not username:
    print("Username belum diisi")
```

Karena `username` adalah string kosong yang Falsy, `not username` menghasilkan `True`.

Contoh lainnya:

```python
items = []

if not items:
    print("Belum ada item")
```

---

## Truthy/Falsy dengan `or`

Truthy dan Falsy juga dapat digunakan untuk memberikan nilai alternatif.

```python
username = ""

display_name = username or "Guest"

print(display_name)
```

Karena `username` adalah string kosong dan dianggap Falsy, Python menggunakan `"Guest"`.

Output:

```text
Guest
```

Jika username memiliki nilai:

```python
username = "Andi"

display_name = username or "Guest"

print(display_name)
```

Output:

```text
Andi
```

---

## Mengapa Truthy dan Falsy Penting?

Truthy dan Falsy membuat kode Python menjadi lebih sederhana ketika melakukan pemeriksaan terhadap data.

Konsep ini sangat berguna ketika:

- Memeriksa apakah input tersedia.
- Memeriksa apakah collection memiliki data.
- Memeriksa apakah sebuah variabel memiliki nilai.
- Membuat conditional yang lebih ringkas.
- Memberikan nilai default.
- Menggabungkan beberapa kondisi menggunakan operator logika.

Memahami konsep ini juga akan membantu ketika mempelajari **looping, function, error handling, dan berbagai struktur Python lainnya**.

---

## Ringkasan

**Truthy** adalah nilai yang dievaluasi sebagai `True`, sedangkan **Falsy** adalah nilai yang dievaluasi sebagai `False`.

Beberapa nilai Falsy yang paling penting untuk diingat:

```python
False
None
0
0.0
""
[]
()
{}
set()
```

Contoh pemeriksaan:

```python
value = "Python"

if value:
    print("Value memiliki isi")
```

Python secara otomatis mengevaluasi `value` sebagai Truthy.

Dengan memahami Truthy dan Falsy, kita dapat menulis conditional yang lebih **sederhana, idiomatis, dan mudah dibaca**.