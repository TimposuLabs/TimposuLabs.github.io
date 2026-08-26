---
sidebar_position: 5
title: "Mekanisme Loop"
---

Pada materi sebelumnya, kita telah mempelajari bahwa **iterable**, **iterator**, dan **generator** merupakan bagian penting dari mekanisme iterasi di Python.

Perulangan `for` yang terlihat sederhana ternyata memiliki mekanisme internal yang cukup menarik. Python menggunakan iterator untuk mengambil nilai dari sebuah iterable secara bertahap.

Memahami mekanisme ini membantu kita memahami bagaimana `for`, `iter()`, `next()`, dan `StopIteration` saling berhubungan.

## Cara Kerja `for` Loop

Ketika kita menggunakan `for` terhadap sebuah iterable, Python perlu mendapatkan iterator dari object tersebut.

Secara konseptual, prosesnya dapat digambarkan:

```text
Iterable
   ↓
iter()
   ↓
Iterator
   ↓
next()
   ↓
Nilai berikutnya
   ↓
next()
   ↓
Nilai berikutnya
   ↓
  ...
   ↓
StopIteration
   ↓
Loop selesai
```

Misalnya:

```python
numbers = [1, 2, 3]

for number in numbers:
    print(number)
```

Python menangani proses iterasi tersebut di belakang layar.

## `iter()` dan `__iter__()`

Python menyediakan fungsi bawaan `iter()` untuk mendapatkan iterator dari sebuah iterable.

Contohnya:

```python
numbers = [1, 2, 3]

iterator = iter(numbers)

print(iterator)
```

`iter(numbers)` menghasilkan sebuah iterator yang dapat digunakan untuk mengambil elemen secara bertahap.

Secara konsep:

```text
list
 ↓
iter()
 ↓
iterator
```

Pada level object, mekanisme tersebut berkaitan dengan special method:

```python
__iter__()
```

Method `__iter__()` digunakan untuk menyediakan iterator dari sebuah object.

## `next()` dan `__next__()`

Setelah mendapatkan iterator, kita dapat mengambil nilai berikutnya menggunakan fungsi `next()`.

Contohnya:

```python
numbers = [1, 2, 3]

iterator = iter(numbers)

print(next(iterator))
print(next(iterator))
print(next(iterator))
```

Output:

```text
1
2
3
```

Setiap pemanggilan `next()` mengambil nilai berikutnya dari iterator.

Secara konsep:

```text
next(iterator)
      ↓
      1

next(iterator)
      ↓
      2

next(iterator)
      ↓
      3
```

Fungsi `next()` berhubungan dengan special method:

```python
__next__()
```

Method tersebut menentukan bagaimana iterator memberikan nilai berikutnya.

## `StopIteration`

Iterator harus memiliki cara untuk memberitahu Python bahwa sudah tidak ada nilai yang dapat diberikan.

Python menggunakan exception:

```python
StopIteration
```

Contohnya:

```python
numbers = [1, 2, 3]

iterator = iter(numbers)

print(next(iterator))
print(next(iterator))
print(next(iterator))
print(next(iterator))
```

Tiga pemanggilan pertama menghasilkan:

```text
1
2
3
```

Pemanggilan berikutnya tidak memiliki nilai lagi sehingga menghasilkan:

```text
StopIteration
```

Secara sederhana:

```text
1 → 2 → 3 → StopIteration
```

`StopIteration` merupakan mekanisme standar yang digunakan Python untuk menandai bahwa proses iterasi telah selesai.

## Bagaimana `for` Menangani `StopIteration`?

Ketika menggunakan `for`, kita tidak perlu menangani `StopIteration` secara manual.

Python melakukan mekanisme tersebut secara otomatis.

Secara konseptual, perulangan:

```python
for item in iterable:
    print(item)
```

dapat dipahami seperti:

```python
iterator = iter(iterable)

while True:
    try:
        item = next(iterator)
        print(item)
    except StopIteration:
        break
```

Kedua kode tersebut memiliki tujuan yang sama, yaitu mengambil nilai dari iterable satu per satu sampai tidak ada nilai lagi.

## Membuat `for` Loop Sederhana Sendiri

Dengan memahami mekanisme tersebut, kita dapat membuat simulasi sederhana bagaimana `for` bekerja.

Contohnya:

```python
def special_for_loop(iterable):
    iterator = iter(iterable)

    while True:
        try:
            item = next(iterator)
            print(item * 2)

        except StopIteration:
            break


special_for_loop([1, 2, 3])
```

Output:

```text
2
4
6
```

Function tersebut melakukan beberapa langkah:

1. Mengubah iterable menjadi iterator menggunakan `iter()`.
2. Mengambil nilai menggunakan `next()`.
3. Memproses nilai yang diperoleh.
4. Mengulangi proses selama masih terdapat nilai.
5. Menangkap `StopIteration` ketika iterator sudah habis.
6. Menghentikan perulangan menggunakan `break`.

## Membuat Iterator dengan Class

Python juga memungkinkan kita membuat object yang memiliki mekanisme iterasi sendiri.

Untuk membuat iterator menggunakan class, kita dapat menggunakan special method:

```python
__iter__()
```

dan:

```python
__next__()
```

Contohnya:

```python
class MyGen:
    current = 0

    def __init__(self, first, last):
        self.first = first
        self.last = last

    def __iter__(self):
        return self

    def __next__(self):
        if MyGen.current < self.last:
            num = MyGen.current
            MyGen.current += 1
            return num

        raise StopIteration
```

Object tersebut dapat digunakan dalam `for`:

```python
gen = MyGen(0, 100)

for i in gen:
    print(i)
```

Iterator tersebut menghasilkan nilai sampai batas yang ditentukan.

## Peran `__iter__()`

Pada iterator yang dibuat menggunakan class, `__iter__()` digunakan untuk mengembalikan iterator.

Dalam contoh:

```python
def __iter__(self):
    return self
```

`self` dikembalikan karena object tersebut bertindak sebagai iterator untuk dirinya sendiri.

Secara sederhana:

```text
Object
  ↓
__iter__()
  ↓
Iterator
```

## Peran `__next__()`

`__next__()` menentukan bagaimana object menghasilkan nilai berikutnya.

Contohnya:

```python
def __next__(self):
    if MyGen.current < self.last:
        num = MyGen.current
        MyGen.current += 1
        return num

    raise StopIteration
```

Selama kondisi masih terpenuhi, method tersebut mengembalikan nilai berikutnya.

Ketika batas telah tercapai:

```python
raise StopIteration
```

digunakan untuk memberitahu Python bahwa iterasi telah selesai.

## Hubungan `iter()` dengan `__iter__()`

Fungsi bawaan `iter()` dan special method `__iter__()` memiliki hubungan erat.

Ketika kita menulis:

```python
iterator = iter(iterable)
```

Python menggunakan mekanisme `__iter__()` dari object tersebut untuk mendapatkan iterator.

Secara konseptual:

```text
iter(object)
     ↓
object.__iter__()
     ↓
iterator
```

## Hubungan `next()` dengan `__next__()`

Hal yang sama berlaku pada `next()`.

Ketika kita menulis:

```python
next(iterator)
```

Python menggunakan mekanisme `__next__()` pada iterator tersebut untuk mendapatkan nilai berikutnya.

Secara konseptual:

```text
next(iterator)
      ↓
iterator.__next__()
      ↓
nilai berikutnya
```

## Keseluruhan Mekanisme

Hubungan seluruh konsep dapat digambarkan sebagai berikut:

```text
             Iterable
                 ↓
              iter()
                 ↓
            __iter__()
                 ↓
             Iterator
                 ↓
              next()
                 ↓
            __next__()
                 ↓
          Nilai berikutnya
                 ↓
              next()
                 ↓
                ...
                 ↓
        Tidak ada nilai lagi
                 ↓
        StopIteration
                 ↓
           Loop selesai
```

Inilah mekanisme dasar yang memungkinkan Python melakukan iterasi terhadap berbagai object.

## Iterable vs Iterator

Meskipun keduanya berhubungan erat, iterable dan iterator bukan istilah yang sama.

| Konsep | Peran |
| --- | --- |
| Iterable | Object yang dapat diiterasi |
| Iterator | Object yang menghasilkan nilai satu per satu |
| `iter()` | Mendapatkan iterator dari iterable |
| `__iter__()` | Menyediakan iterator |
| `next()` | Mengambil nilai berikutnya |
| `__next__()` | Menentukan nilai berikutnya |
| `StopIteration` | Menandakan bahwa iterasi telah selesai |

Contoh sederhananya:

```text
List
 ↓
Iterable
 ↓
iter(list)
 ↓
Iterator
 ↓
next()
 ↓
Nilai
```

## Hubungan dengan Generator

Konsep ini juga menjelaskan mengapa generator dapat digunakan dalam `for`.

Generator memiliki mekanisme iterasi sehingga dapat menghasilkan nilai secara bertahap.

Hubungannya:

```text
Iterable
   ↓
Iterator
   ↓
Generator
   ↓
yield
   ↓
Nilai satu per satu
```

Dengan memahami mekanisme iterator secara manual, kita dapat melihat bahwa generator sebenarnya menyediakan cara yang lebih praktis untuk menghasilkan nilai secara bertahap tanpa harus selalu membuat class dengan `__iter__()` dan `__next__()` sendiri.

## Kesimpulan

Perulangan `for` di Python bekerja menggunakan mekanisme iterable dan iterator.

Secara sederhana, prosesnya adalah:

```text
for
 ↓
iter()
 ↓
iterator
 ↓
next()
 ↓
nilai
 ↓
next()
 ↓
nilai berikutnya
 ↓
StopIteration
 ↓
selesai
```

Konsep penting yang perlu diingat:

- **Iterable** adalah object yang dapat diiterasi.
- **Iterator** menghasilkan nilai satu per satu.
- `iter()` digunakan untuk mendapatkan iterator.
- `__iter__()` menyediakan iterator.
- `next()` mengambil nilai berikutnya.
- `__next__()` menentukan mekanisme pengambilan nilai berikutnya.
- `StopIteration` menandakan bahwa iterator sudah selesai.
- `for` menangani mekanisme iterasi tersebut secara otomatis.

Memahami mekanisme ini menjadi dasar penting untuk memahami **iterator dan generator secara lebih mendalam**, sekaligus menjelaskan apa yang sebenarnya terjadi di balik perulangan `for` Python.