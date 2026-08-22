---
sidebar_position: 29
title: "Scope Rules & LEGB"
---

## Scope Rules di Python

Pada materi sebelumnya kita telah mempelajari bahwa **scope** menentukan tempat sebuah variabel dapat diakses.

Pertanyaan berikutnya adalah:

> Jika terdapat beberapa variabel dengan nama yang sama, bagaimana Python menentukan variabel mana yang harus digunakan?

Python memiliki aturan pencarian yang disebut **LEGB Rule**.

LEGB merupakan singkatan dari:

```text
L → Local
E → Enclosing
G → Global
B → Built-in
```

Python akan mencari nama variabel berdasarkan urutan tersebut.

---

## LEGB Rule

Ketika Python menemukan sebuah nama variabel, Python akan mencarinya secara bertahap:

```text
Local
  ↓
Enclosing
  ↓
Global
  ↓
Built-in
```

Jika ditemukan pada salah satu tingkat tersebut, Python akan menggunakan nilai yang ditemukan.

Jika tidak ditemukan di seluruh scope, Python akan menghasilkan:

```text
NameError
```

---

## 1. Local Scope

**Local Scope** merupakan scope pertama yang diperiksa Python.

Local scope biasanya berada di dalam function yang sedang dijalankan.

Contoh:

```python
a = 1

def confusion():
    a = 5
    return a

print(confusion())
```

Output:

```text
5
```

Ketika `confusion()` dijalankan, Python menemukan:

```python
a = 5
```

di dalam function tersebut.

Karena variabel ditemukan pada Local Scope, Python tidak perlu mencari `a` ke scope berikutnya.

---

## 2. Enclosing Scope

Setelah Local Scope, Python akan mencari pada **Enclosing Scope**.

Enclosing Scope terjadi ketika terdapat function yang berada di dalam function lainnya.

Contoh:

```python
def parent():
    a = 10

    def child():
        return a

    return child()

print(parent())
```

Output:

```text
10
```

Pada function `child()`, tidak terdapat variabel `a`.

Python kemudian mencari ke scope yang membungkusnya, yaitu function `parent()`.

Di sana ditemukan:

```python
a = 10
```

Sehingga nilai tersebut digunakan.

---

## 3. Global Scope

Jika Python tidak menemukan variabel pada Local maupun Enclosing Scope, Python akan mencari pada **Global Scope**.

Global Scope adalah scope pada tingkat paling luar program.

Contoh:

```python
a = 1

def confusion():
    return a

print(confusion())
```

Output:

```text
1
```

Function `confusion()` tidak memiliki variabel `a`.

Tidak ada enclosing function.

Python kemudian mencari ke Global Scope dan menemukan:

```python
a = 1
```

---

## 4. Built-in Scope

Jika variabel tidak ditemukan pada Local, Enclosing, maupun Global Scope, Python akan mencari pada **Built-in Scope**.

Built-in Scope berisi nama-nama yang sudah disediakan oleh Python.

Contohnya:

```python
print()
len()
sum()
max()
min()
```

Contoh:

```python
numbers = [10, 20, 30]

print(len(numbers))
```

Python mencari nama:

```text
len
```

Karena tidak didefinisikan pada Local, Enclosing, atau Global Scope, Python menemukan `len` pada Built-in Scope.

Output:

```text
3
```

---

## Urutan LEGB

Secara sederhana, proses pencarian dapat digambarkan seperti berikut:

```text
            Nama Variabel
                  ↓
             Local Scope
                  ↓
          Enclosing Scope
                  ↓
            Global Scope
                  ↓
            Built-in Scope
                  ↓
        Tidak ditemukan?
                  ↓
             NameError
```

Python berhenti mencari ketika nama tersebut ditemukan.

---

## Contoh LEGB Lengkap

Perhatikan contoh berikut:

```python
a = 1

def parent():
    a = 2

    def child():
        a = 3
        return a

    return child()

print(parent())
```

Output:

```text
3
```

Mengapa hasilnya `3`?

Karena ketika `child()` dijalankan, Python menemukan:

```python
a = 3
```

langsung pada Local Scope.

Python tidak perlu mencari ke Enclosing atau Global Scope.

---

## Jika Local Tidak Memiliki Variabel

Sekarang kita hapus variabel `a` dari `child()`.

```python
a = 1

def parent():
    a = 2

    def child():
        return a

    return child()

print(parent())
```

Output:

```text
2
```

Python tidak menemukan `a` pada Local Scope `child()`.

Kemudian Python mencari ke Enclosing Scope:

```python
def parent():
    a = 2
```

Variabel ditemukan di sana.

Maka nilai `2` digunakan.

---

## Jika Enclosing Juga Tidak Memiliki Variabel

Sekarang variabel `a` hanya tersedia pada Global Scope.

```python
a = 1

def parent():

    def child():
        return a

    return child()

print(parent())
```

Output:

```text
1
```

Python mencari:

```text
Local
↓
tidak ditemukan

Enclosing
↓
tidak ditemukan

Global
↓
ditemukan a = 1
```

Maka hasilnya adalah:

```text
1
```

---

## Contoh Perbedaan Local dan Global

Perhatikan contoh berikut:

```python
a = 1

def confusion():
    a = 5
    return a

print(a)
print(confusion())
print(a)
```

Output:

```text
1
5
1
```

Mengapa nilai global tetap `1`?

Karena:

```python
a = 5
```

di dalam function membuat variabel lokal baru.

Variabel tersebut tidak sama dengan:

```python
a = 1
```

yang berada pada Global Scope.

---

## Local Variable Tidak Mengubah Global Variable

Contoh:

```python
name = "Budi"

def change_name():
    name = "Andi"
    print(name)

change_name()

print(name)
```

Output:

```text
Andi
Budi
```

Ketika function dijalankan:

```python
name = "Andi"
```

Python membuat variabel lokal `name`.

Variabel global tetap:

```text
Budi
```

---

## Mengapa LEGB Penting?

LEGB membantu kita memahami bagaimana Python menentukan variabel yang digunakan ketika terdapat nama yang sama pada beberapa scope.

Contohnya:

```python
name = "Global"

def example():
    name = "Local"
    print(name)

example()
```

Output:

```text
Local
```

Python memilih `name` pada Local Scope karena Local Scope memiliki prioritas lebih tinggi daripada Global Scope.

---

## Shadowing

Kondisi ketika sebuah variabel pada scope yang lebih dekat memiliki nama yang sama dengan variabel pada scope yang lebih luar sering disebut **shadowing**.

Contoh:

```python
name = "Budi"

def say_hello():
    name = "Andi"
    print(name)

say_hello()
```

Output:

```text
Andi
```

Variabel lokal `name` melakukan shadowing terhadap variabel global `name` ketika kode berada di dalam function.

---

## Contoh Built-in Scope

Built-in Scope berisi banyak nama yang tersedia secara otomatis.

Contoh:

```python
numbers = [10, 20, 30]

print(len(numbers))
print(sum(numbers))
print(max(numbers))
print(min(numbers))
```

Python dapat menemukan:

```text
len
sum
max
min
```

pada Built-in Scope.

---

## Hati-Hati Menimpa Nama Built-in

Karena Python menggunakan LEGB, kita dapat secara tidak sengaja membuat variabel dengan nama yang sama seperti built-in.

Contoh:

```python
sum = 100
```

Sekarang ketika kita mencoba:

```python
numbers = [1, 2, 3]

print(sum(numbers))
```

Python akan mencari `sum` mulai dari Local dan Global Scope.

Python menemukan:

```python
sum = 100
```

sebelum mencapai Built-in Scope.

Akibatnya kode tersebut menghasilkan error karena `100` bukan function yang dapat dipanggil.

Karena itu, sebaiknya hindari menggunakan nama built-in Python sebagai nama variabel.

Contoh nama yang sebaiknya dihindari:

```text
sum
list
str
int
max
min
input
```

---

## Jika Variabel Tidak Ditemukan

Jika Python sudah mencari pada seluruh scope:

```text
Local
Enclosing
Global
Built-in
```

tetapi tidak menemukan nama yang dicari, Python akan menghasilkan `NameError`.

Contoh:

```python
def example():
    print(username)

example()
```

Jika `username` tidak tersedia pada scope mana pun, Python akan menghasilkan error seperti:

```text
NameError: name 'username' is not defined
```

---

## Ringkasan LEGB

| Scope | Penjelasan | Contoh |
|---|---|---|
| **L — Local** | Scope function yang sedang dijalankan | Variabel di dalam function |
| **E — Enclosing** | Scope function yang membungkus function lain | Nested function |
| **G — Global** | Scope paling luar program | Variabel di luar function |
| **B — Built-in** | Nama bawaan Python | `print`, `len`, `sum` |

Urutan pencarian Python adalah:

```text
Local
↓
Enclosing
↓
Global
↓
Built-in
```

---

## Kesimpulan

**LEGB Rule** menjelaskan bagaimana Python mencari sebuah nama atau variabel.

Ketika Python menemukan sebuah nama, pencarian dimulai dari scope yang paling dekat:

```text
L → Local
E → Enclosing
G → Global
B → Built-in
```

Python akan berhenti mencari ketika menemukan nama tersebut.

Memahami aturan ini sangat penting sebelum mempelajari konsep berikutnya seperti **global**, **nonlocal**, **nested function**, **closure**, dan **decorator**.