---
sidebar_position: 2
title: "Iterable & Iterator"
---

Sebelum mempelajari **Generator**, kita perlu memahami dua konsep penting dalam mekanisme pemrosesan data di Python, yaitu **Iterable** dan **Iterator**.

Keduanya berkaitan dengan bagaimana Python dapat mengambil dan memproses data **satu per satu**.

Konsep ini sering digunakan tanpa kita sadari, misalnya ketika melakukan perulangan menggunakan `for`.

```text
Data
 ↓
Iterable
 ↓
Iterator
 ↓
Menghasilkan nilai satu per satu
```

Memahami hubungan tersebut akan membuat konsep Generator menjadi lebih mudah dipahami.

## Apa Itu Iterable?

**Iterable** adalah object yang dapat digunakan untuk menghasilkan atau menyediakan elemen secara berurutan sehingga dapat diproses satu per satu.

Contoh object yang umum digunakan sebagai iterable di Python antara lain:

- `list`
- `tuple`
- `string`
- `set`
- `dictionary`
- `range`

Misalnya sebuah `list` memiliki beberapa data:

```text
[10, 20, 30, 40]
```

Data tersebut dapat diproses satu per satu menggunakan perulangan.

Secara sederhana:

```text
[10, 20, 30, 40]
       ↓
   Iterable
       ↓
10 → 20 → 30 → 40
```

Karena itu, ketika kita menggunakan `for` pada sebuah `list`, Python dapat mengambil elemen dari iterable tersebut secara berurutan.

## Apa Itu Iterator?

**Iterator** adalah object yang digunakan untuk mengambil nilai dari sebuah iterable **satu per satu**.

Jika iterable dapat dianggap sebagai sumber data, maka iterator dapat dianggap sebagai mekanisme yang mengambil data tersebut secara bertahap.

Gambaran sederhananya:

```text
    Iterable
[10, 20, 30, 40]
       ↓
    Iterator
       ↓
     10
       ↓
     20
       ↓
     30
       ↓
     40
```

Iterator menyimpan informasi mengenai posisi proses sehingga dapat mengetahui nilai berikutnya yang harus diberikan.

## Hubungan Iterable dan Iterator

Iterable dan iterator memiliki peran yang berbeda tetapi saling berhubungan.

**Iterable** menyediakan sekumpulan data yang dapat diiterasi.

**Iterator** bertugas mengambil data tersebut satu per satu.

Secara konseptual:

```text
Iterable
   ↓
Sumber data
   ↓
Iterator
   ↓
Nilai pertama
   ↓
Nilai berikutnya
   ↓
Nilai berikutnya
   ↓
...
```

Karena itu, iterable dapat dianggap sebagai **sesuatu yang dapat diiterasi**, sedangkan iterator merupakan **objek yang melakukan proses iterasi**.

## Iterable dan Perulangan `for`

Perulangan `for` merupakan salah satu tempat di mana konsep iterable dan iterator banyak digunakan.

Ketika kita melakukan perulangan terhadap sebuah collection, Python mengambil elemen dari data tersebut secara bertahap.

Contohnya:

```python
numbers = [1, 2, 3]

for number in numbers:
    print(number)
```

Secara sederhana, prosesnya dapat dibayangkan:

```text
numbers
   ↓
iterator
   ↓
   1
   ↓
   2
   ↓
   3
```

Python menangani mekanisme iterasinya sehingga programmer tidak perlu mengelola proses tersebut secara manual.

## Mengapa Iterable dan Iterator Penting?

Konsep ini penting karena banyak fitur Python bekerja berdasarkan mekanisme iterasi.

Beberapa contohnya:

- Perulangan `for`.
- `map()`.
- `filter()`.
- `zip()`.
- Comprehension.
- Generator.
- Berbagai collection dan sequence.

Dengan memahami iterable dan iterator, kita dapat memahami mengapa Python dapat memproses data satu per satu dengan cara yang efisien.

## Iterable dalam Functional Programming

Pada materi **Functional Programming**, kita telah menggunakan beberapa function seperti:

```text
map()
filter()
zip()
```

Function tersebut bekerja dengan iterable.

Artinya, konsep iterable sebenarnya sudah digunakan dalam pembelajaran sebelumnya.

Sekarang konsep tersebut dapat dipahami lebih dalam:

```text
Iterable
   ↓
Data dapat diproses satu per satu
   ↓
map()
filter()
zip()
   ↓
Pemrosesan data
```

Pemahaman ini menjadi jembatan menuju konsep **lazy evaluation** dan **Generator**.

## Iterable dan Iterator dalam Pemrosesan Data

Dalam program sederhana, jumlah data biasanya kecil sehingga penggunaan iterable dan iterator tidak terlalu terasa.

Namun, ketika jumlah data menjadi sangat besar, pemrosesan data satu per satu dapat menjadi pendekatan yang penting.

Misalnya:

```text
Dataset besar
      ↓
Tidak harus diproses sekaligus
      ↓
Ambil data berikutnya
      ↓
    Proses
      ↓
Ambil data berikutnya
      ↓
Proses kembali
```

Pendekatan seperti ini berkaitan erat dengan iterator dan nantinya akan menjadi dasar untuk memahami generator.

## Hubungan dengan Generator

Generator merupakan konsep yang sangat erat dengan iterable dan iterator.

Secara sederhana, hubungan ketiganya dapat digambarkan:

```text
Iterable
   ↓
Dapat diiterasi
   ↓
Iterator
   ↓
Menghasilkan nilai satu per satu
   ↓
Generator
   ↓
Cara praktis menghasilkan nilai secara bertahap
```

Dengan memahami iterable dan iterator terlebih dahulu, kita akan lebih mudah memahami bagaimana generator bekerja dan mengapa generator dapat membantu menghemat penggunaan memory.

## Kesimpulan

**Iterable** adalah object yang dapat menyediakan data untuk diproses secara berurutan.

**Iterator** adalah object yang mengambil nilai dari iterable satu per satu selama proses iterasi berlangsung.

Hubungan sederhananya:

```text
Iterable
   ↓
Iterator
   ↓
Nilai dihasilkan satu per satu
```

Konsep ini merupakan bagian penting dari mekanisme Python dan digunakan oleh banyak fitur, termasuk `for`, `map()`, `filter()`, `zip()`, comprehension, dan generator.

Pada materi berikutnya, kita akan mempelajari bagaimana Python membuat dan menggunakan **Iterator** secara lebih mendalam sebelum masuk ke **Generator**.