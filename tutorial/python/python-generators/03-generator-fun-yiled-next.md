---
sidebar_position: 3
title: "Generator Function, yield & next()"
---

## Generator Function

Pada materi sebelumnya, kita telah mempelajari bahwa generator digunakan untuk menghasilkan nilai secara bertahap.

Sekarang kita akan mempelajari bagaimana membuat generator sendiri menggunakan **generator function**, bagaimana `yield` bekerja, serta bagaimana mengambil nilai dari generator menggunakan `next()`.

## Iterable, Iteration, dan Generator

Sebelum memahami generator secara lebih mendalam, penting untuk membedakan tiga istilah:

- **Iterable** adalah object yang dapat diiterasi atau diproses satu per satu.
- **Iteration** adalah proses mengambil elemen dari iterable secara berurutan.
- **Generator** adalah salah satu jenis object yang dapat menghasilkan nilai secara bertahap.

Contoh iterable yang umum digunakan di Python:

- `list`
- `tuple`
- `string`
- `dictionary`
- `set`
- `range`
- generator

Hubungan sederhananya:

```text
Iterable
   ↓
dapat dilakukan iteration
   ↓
menghasilkan nilai satu per satu
```

Generator merupakan salah satu jenis iterable.

> Semua generator dapat digunakan sebagai iterable, tetapi tidak semua iterable merupakan generator.

Contohnya, `list` adalah iterable tetapi bukan generator.

```text
Iterable
├── list
├── tuple
├── string
├── set
├── dictionary
├── range
└── generator
```

## Iteration

**Iteration** merupakan proses mengambil nilai dari sebuah iterable secara berurutan.

Contoh paling umum adalah menggunakan `for`:

```python
numbers = [1, 2, 3]

for number in numbers:
    print(number)
```

Proses tersebut mengambil nilai:

```text
1
↓
2
↓
3
```

Python menangani mekanisme iterasinya sehingga kita dapat menggunakan `for` tanpa harus mengelola proses pengambilan nilai secara manual.

Generator juga dapat digunakan dalam proses tersebut.

## Membuat Generator Function

Generator function adalah function yang menggunakan keyword `yield` untuk menghasilkan nilai secara bertahap.

Contoh:

```python
def generator_function(num):
    for i in range(num):
        yield i * 2
```

Berbeda dengan function biasa yang menggunakan `return`, function tersebut menggunakan:

```python
yield i * 2
```

Hal ini membuat function tersebut menjadi **generator function**.

Ketika generator function dipanggil, prosesnya tidak langsung menghasilkan seluruh nilai sekaligus.

Generator akan menghasilkan nilai ketika diminta.

## Keyword `yield`

`yield` digunakan untuk menghasilkan nilai dari generator.

Salah satu karakteristik penting `yield` adalah kemampuannya untuk **menjeda sementara eksekusi function**.

Misalnya:

```python
def generator_function(num):
    for i in range(num):
        yield i * 2
```

Ketika generator menghasilkan nilai pertama, proses function berhenti sementara pada posisi `yield`.

Ketika nilai berikutnya diminta, function melanjutkan eksekusi dari posisi terakhir.

Secara sederhana:

```text
Generator dijalankan
       ↓
yield nilai pertama
       ↓
     Pause
       ↓
Minta nilai berikutnya
       ↓
Lanjutkan eksekusi
       ↓
yield nilai berikutnya
       ↓
Pause kembali
```

## Generator Function vs Function Biasa

Perbedaan penting antara function biasa dan generator function adalah cara menghasilkan hasil.

Function biasa dengan `return`:

```python
def get_numbers():
    return [1, 2, 3]
```

Seluruh hasil tersedia sekaligus.

Sedangkan generator:

```python
def get_numbers():
    yield 1
    yield 2
    yield 3
```

Nilai dihasilkan secara bertahap.

Secara sederhana:

```text
return
 ↓
mengembalikan hasil
 ↓
function selesai


yield
 ↓
menghasilkan nilai
 ↓
pause
 ↓
dapat dilanjutkan
```

## Menggunakan Generator dengan `for`

Generator dapat digunakan langsung dalam perulangan `for`.

Contohnya:

```python
def generator_function(num):
    for i in range(num):
        yield i * 2


for item in generator_function(10):
    print(item)
```

Output:

```text
0
2
4
6
8
10
12
14
16
18
```

Generator menghasilkan nilai satu per satu selama proses iterasi berlangsung.

## Fungsi `next()`

Selain menggunakan `for`, kita dapat mengambil nilai generator secara manual menggunakan fungsi bawaan `next()`.

Contoh:

```python
def generator_function(num):
    for i in range(num):
        yield i * 2


g = generator_function(100)

print(next(g))
print(next(g))
print(next(g))
```

Output:

```text
0
2
4
```

Setiap pemanggilan `next()` meminta generator untuk menghasilkan **nilai berikutnya**.

## State Retention

Salah satu karakteristik penting generator adalah kemampuannya untuk **mengingat state atau keadaan eksekusi terakhir**.

Perhatikan:

```python
g = generator_function(100)

print(next(g))
print(next(g))
print(next(g))
```

Pemanggilan pertama:

```python
next(g)
```

menghasilkan:

```text
0
```

Pemanggilan kedua:

```python
next(g)
```

menghasilkan:

```text
2
```

Pemanggilan ketiga:

```python
next(g)
```

menghasilkan:

```text
4
```

Generator tidak kembali ke awal setiap kali `next()` dipanggil.

Generator melanjutkan proses dari posisi terakhir.

Secara sederhana:

```text
next(g)
  ↓
  0
  ↓
pause

next(g)
  ↓
  2
  ↓
pause

next(g)
  ↓
  4
  ↓
pause
```

Kemampuan untuk mempertahankan state inilah yang memungkinkan generator menghasilkan sequence secara bertahap.

## `StopIteration`

Generator memiliki jumlah nilai yang terbatas apabila proses di dalamnya juga memiliki batas.

Ketika seluruh nilai telah dihasilkan dan kita masih memanggil `next()`, Python akan menghasilkan exception `StopIteration`.

Contoh:

```python
def generator_function(num):
    for i in range(num):
        yield i * 2


g = generator_function(1)

print(next(g))
print(next(g))
```

Pemanggilan pertama menghasilkan:

```text
0
```

Namun pemanggilan kedua akan menghasilkan:

```text
StopIteration
```

Hal tersebut terjadi karena generator hanya memiliki satu nilai untuk dihasilkan.

Secara sederhana:

```text
Generator
   ↓
   0
   ↓
Tidak ada nilai lagi
   ↓
StopIteration
```

`StopIteration` merupakan tanda bahwa iterator atau generator sudah tidak memiliki nilai berikutnya.

## `StopIteration` pada `for Loop`

Ketika menggunakan `for`, kita biasanya tidak melihat exception `StopIteration`.

Contohnya:

```python
def generator_function(num):
    for i in range(num):
        yield i * 2


for item in generator_function(3):
    print(item)
```

Output:

```text
0
2
4
```

Setelah semua nilai dihasilkan, perulangan berhenti secara otomatis.

Secara internal, mekanisme iterasi mengetahui bahwa generator sudah tidak memiliki nilai berikutnya dan menangani kondisi tersebut sehingga `for` dapat berhenti dengan normal.

Dengan demikian:

```text
next()
 ↓
tidak ada nilai
 ↓
StopIteration
```

sedangkan pada `for`:

```text
for
 ↓
mengambil nilai
 ↓
mengambil nilai
 ↓
tidak ada nilai
 ↓
berhenti secara otomatis
```

## Generator dan Memory

Generator tidak membuat seluruh sequence hasil sekaligus.

Contohnya:

```python
def generator_function(num):
    for i in range(num):
        yield i * 2
```

Jika `num` memiliki nilai yang sangat besar, generator tetap menghasilkan nilai secara bertahap.

Hal ini berbeda dengan membuat list yang berisi seluruh hasil.

Konsepnya:

```text
List
 ↓
Buat semua hasil
 ↓
Simpan semua hasil


Generator
 ↓
Hasilkan nilai
 ↓
Gunakan
 ↓
Hasilkan nilai berikutnya
```

Pendekatan generator dapat membantu menghemat penggunaan memory ketika bekerja dengan sequence yang besar.

## Generator sebagai Iterator

Generator juga memiliki karakteristik iterator karena dapat menghasilkan nilai secara berurutan menggunakan mekanisme iterasi.

Hubungannya dapat digambarkan:

```text
Iterable
    ↓
Iterator
    ↓
Generator
```

Generator dapat digunakan dalam `for` dan dapat mengambil nilai berikutnya menggunakan `next()`.

Karena itu, memahami generator juga membantu memperjelas hubungan antara iterable, iterator, dan generator yang telah dibahas sebelumnya.

## Kesimpulan

Generator function adalah function yang menggunakan `yield` untuk menghasilkan nilai secara bertahap.

Konsep penting yang perlu diingat:

- `yield` menghasilkan nilai dan menjeda sementara eksekusi generator.
- Generator dapat melanjutkan eksekusi dari posisi terakhir.
- `next()` digunakan untuk mengambil nilai berikutnya secara manual.
- Generator mempertahankan state selama proses iterasi.
- `StopIteration` menunjukkan bahwa generator sudah tidak memiliki nilai berikutnya.
- `for` menangani proses iterasi generator secara otomatis.
- Generator dapat membantu menghemat memory karena nilai dihasilkan secara bertahap.

Alur sederhananya:

```text
Generator Function
       ↓
      yield
       ↓
Hasilkan nilai
       ↓
     Pause
       ↓
     next()
       ↓
Lanjutkan
       ↓
Hasilkan nilai berikutnya
       ↓
     ...
       ↓
Tidak ada nilai
       ↓
StopIteration
```

Konsep berikutnya yang penting untuk dipelajari adalah **perbedaan lebih mendalam antara generator, iterator, dan iterable**, serta bagaimana generator dapat digunakan dalam **pemrosesan data secara efisien**.