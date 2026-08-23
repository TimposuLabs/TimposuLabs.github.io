---
sidebar_position: 9
title: "Fungsi reduce()"
---

`reduce()` adalah fungsi yang digunakan dalam **Functional Programming** untuk mengolah seluruh elemen dalam sebuah iterable secara bertahap hingga menghasilkan **satu nilai akhir**.

Berbeda dengan `map()` yang melakukan transformasi terhadap setiap elemen dan `filter()` yang memilih elemen berdasarkan kondisi, `reduce()` digunakan untuk **mengakumulasi beberapa nilai menjadi satu hasil**.

Contoh sederhana:

```text
[1, 2, 3, 4]
     ↓
  reduce()
     ↓
    10
```

Pada contoh tersebut, seluruh angka digabungkan melalui proses akumulasi:

```text
1 + 2 + 3 + 4 = 10
```

---

## Mengimpor reduce()

Berbeda dengan `map()` dan `filter()`, fungsi `reduce()` bukan merupakan built-in function yang tersedia langsung.

`reduce()` berada di dalam modul standar Python bernama `functools`.

Untuk menggunakannya, kita harus melakukan import:

```python
from functools import reduce
```

Setelah itu, `reduce()` dapat digunakan.

---

## Sintaks Dasar

Sintaks dasar `reduce()` adalah:

```python
reduce(function, iterable, initial)
```

Parameter tersebut terdiri dari:

- `function`: Function yang digunakan untuk menggabungkan nilai.
- `iterable`: Data yang akan diproses.
- `initial`: Nilai awal accumulator.

Parameter `initial` bersifat opsional.

---

## Konsep Accumulator

Konsep penting dalam `reduce()` adalah **accumulator**.

Accumulator dapat dipahami sebagai sebuah nilai yang menyimpan hasil sementara dari proses sebelumnya.

Misalnya kita memiliki:

```python
numbers = [1, 2, 3]
```

dan ingin menjumlahkan semuanya.

Prosesnya:

```text
accumulator = 0

0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
```

Nilai hasil dari satu proses akan menjadi accumulator untuk proses berikutnya.

---

## Contoh Sederhana

Kita dapat membuat function:

```python
def accumulator(acc, item):
    return acc + item
```

Function tersebut menerima dua parameter:

```text
acc
item
```

`acc` adalah hasil akumulasi sebelumnya.

`item` adalah elemen yang sedang diproses.

Kemudian:

```python
from functools import reduce

numbers = [1, 2, 3]

result = reduce(
    accumulator,
    numbers,
    0
)

print(result)
```

Output:

```text
6
```

---

## Cara Kerja reduce()

Perhatikan kode berikut:

```python
from functools import reduce

numbers = [1, 2, 3]

def accumulator(acc, item):
    return acc + item

result = reduce(
    accumulator,
    numbers,
    0
)
```

Nilai awal accumulator adalah:

```text
0
```

Kemudian `reduce()` memproses setiap elemen.

### Iterasi Pertama

Nilai awal:

```text
acc = 0
```

Elemen pertama:

```text
item = 1
```

Function dijalankan:

```text
0 + 1 = 1
```

Hasil:

```text
1
```

Hasil tersebut menjadi accumulator berikutnya.

---

### Iterasi Kedua

Sekarang:

```text
acc = 1
```

Elemen berikutnya:

```text
item = 2
```

Function dijalankan:

```text
1 + 2 = 3
```

Hasil:

```text
3
```

Nilai `3` menjadi accumulator berikutnya.

---

### Iterasi Ketiga

Sekarang:

```text
acc = 3
```

Elemen berikutnya:

```text
item = 3
```

Function dijalankan:

```text
3 + 3 = 6
```

Hasil akhirnya:

```text
6
```

---

## Visualisasi Proses

Proses tersebut dapat digambarkan sebagai berikut:

```text
Initial
  ↓
  0
  ↓
0 + 1
  ↓
  1
  ↓
1 + 2
  ↓
  3
  ↓
3 + 3
  ↓
  6
```

Sehingga:

```text
[1, 2, 3]
    ↓
reduce()
    ↓
   6
```

---

## Melihat Proses Accumulation

Kita dapat menambahkan `print()` untuk melihat proses accumulator.

```python
from functools import reduce

numbers = [1, 2, 3]


def accumulator(acc, item):
    print(f"acc: {acc}, item: {item}")
    return acc + item


result = reduce(
    accumulator,
    numbers,
    0
)

print(result)
```

Output:

```text
acc: 0, item: 1
acc: 1, item: 2
acc: 3, item: 3
6
```

Dari output tersebut terlihat bahwa hasil sebelumnya selalu menjadi `acc` pada proses berikutnya.

---

## reduce() dengan Lambda

Karena `reduce()` menerima function sebagai argument, kita juga dapat menggunakan lambda.

Contoh:

```python
from functools import reduce

numbers = [1, 2, 3, 4]

result = reduce(
    lambda acc, item: acc + item,
    numbers,
    0
)

print(result)
```

Output:

```text
10
```

Prosesnya:

```text
0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
6 + 4 = 10
```

---

## Menggunakan Nilai Initial

Parameter `initial` digunakan untuk menentukan nilai awal accumulator.

Contoh:

```python
from functools import reduce

numbers = [1, 2, 3]

result = reduce(
    lambda acc, item: acc + item,
    numbers,
    10
)

print(result)
```

Output:

```text
16
```

Prosesnya:

```text
10 + 1 = 11
11 + 2 = 13
13 + 3 = 16
```

Jadi nilai awal `10` ikut menjadi bagian dari proses akumulasi.

---

## Tanpa Initial

Parameter `initial` bersifat opsional.

Contohnya:

```python
from functools import reduce

numbers = [1, 2, 3]

result = reduce(
    lambda acc, item: acc + item,
    numbers
)

print(result)
```

Output:

```text
6
```

Dalam kasus ini, `reduce()` menggunakan elemen pertama sebagai nilai awal accumulator.

Secara konsep:

```text
acc = 1

1 + 2 = 3
3 + 3 = 6
```

---

## Contoh Mengalikan Semua Angka

`reduce()` tidak hanya dapat digunakan untuk penjumlahan.

Kita juga dapat menggunakannya untuk perkalian.

```python
from functools import reduce

numbers = [1, 2, 3, 4]

result = reduce(
    lambda acc, item: acc * item,
    numbers,
    1
)

print(result)
```

Output:

```text
24
```

Prosesnya:

```text
1 × 1 = 1
1 × 2 = 2
2 × 3 = 6
6 × 4 = 24
```

---

## Contoh Mencari Nilai Terbesar

`reduce()` juga dapat digunakan untuk membandingkan nilai.

Contoh:

```python
from functools import reduce

numbers = [10, 5, 20, 8, 15]


def find_max(acc, item):
    if item > acc:
        return item

    return acc


result = reduce(
    find_max,
    numbers
)

print(result)
```

Output:

```text
20
```

Prosesnya secara konsep:

```text
10
 ↓
bandingkan dengan 5
 ↓
10

10
 ↓
bandingkan dengan 20
 ↓
20

20
 ↓
bandingkan dengan 8
 ↓
20

20
 ↓
bandingkan dengan 15
 ↓
20
```

Nilai akhirnya adalah:

```text
20
```

---

## reduce() Menghasilkan Satu Nilai

Salah satu karakteristik utama `reduce()` adalah hasil akhirnya berupa **satu nilai**.

Misalnya:

```python
numbers = [1, 2, 3, 4, 5]
```

Dengan `map()`:

```text
[1, 2, 3, 4, 5]
   ↓
transformasi
   ↓
[2, 4, 6, 8, 10]
```

Dengan `filter()`:

```text
[1, 2, 3, 4, 5]
   ↓
seleksi
   ↓
[2, 4]
```

Dengan `reduce()`:

```text
[1, 2, 3, 4, 5]
   ↓
akumulasi
   ↓
15
```

Secara sederhana:

```text
map()
→ transformasi setiap elemen

filter()
→ memilih elemen

reduce()
→ menggabungkan elemen menjadi satu hasil
```

---

## reduce() dan Higher-Order Function

`reduce()` merupakan contoh **Higher-Order Function** karena menerima function sebagai argument.

Contohnya:

```python
def add(acc, item):
    return acc + item
```

Function tersebut kemudian diberikan kepada:

```python
reduce(
    add,
    numbers,
    0
)
```

Secara konsep:

```text
add()
  ↓
Function
  ↓
reduce()
  ↓
numbers
  ↓
Satu nilai hasil
```

Hal ini dimungkinkan karena Python mendukung konsep **First-Class Function**.

---

## reduce() dan Immutability

`reduce()` tidak harus mengubah iterable asli.

Contoh:

```python
from functools import reduce

numbers = [1, 2, 3, 4]

result = reduce(
    lambda acc, item: acc + item,
    numbers,
    0
)

print(numbers)
print(result)
```

Output:

```text
[1, 2, 3, 4]
10
```

Data asli tetap:

```text
[1, 2, 3, 4]
```

Sedangkan hasil akumulasinya adalah:

```text
10
```

---

## Perbandingan map(), filter(), zip(), dan reduce()

Keempat function tersebut memiliki tujuan yang berbeda.

| Function | Tujuan | Hasil |
|---|---|---|
| `map()` | Transformasi data | Iterable hasil transformasi |
| `filter()` | Seleksi data | Iterable hasil filtering |
| `zip()` | Menggabungkan iterable | Iterable berisi tuple |
| `reduce()` | Akumulasi data | Satu nilai |

Secara sederhana:

```text
map()
 ↓
Transformasi
 ↓
Banyak nilai
```

```text
filter()
 ↓
Seleksi
 ↓
Sebagian nilai
```

```text
zip()
 ↓
Penggabungan
 ↓
Pasangan atau kelompok nilai
```

```text
reduce()
 ↓
Akumulasi
 ↓
Satu nilai
```

---

## Kapan Menggunakan reduce()?

`reduce()` dapat digunakan ketika kita ingin mengubah sekumpulan nilai menjadi satu hasil.

Contohnya:

- Menjumlahkan seluruh angka.
- Mengalikan seluruh angka.
- Mencari nilai terbesar.
- Mencari nilai terkecil.
- Menggabungkan beberapa nilai.
- Melakukan proses akumulasi tertentu.

Contoh sederhana:

```text
[1, 2, 3, 4]
      ↓
   reduce()
      ↓
     10
```

---

## Kapan Tidak Perlu Menggunakan reduce()?

Meskipun `reduce()` sangat fleksibel, bukan berarti semua proses akumulasi harus menggunakan `reduce()`.

Untuk operasi sederhana seperti penjumlahan, Python sudah menyediakan built-in function:

```python
sum(numbers)
```

Misalnya:

```python
numbers = [1, 2, 3, 4]

print(sum(numbers))
```

Output:

```text
10
```

Dalam kasus seperti ini, `sum()` biasanya lebih mudah dibaca daripada:

```python
reduce(
    lambda acc, item: acc + item,
    numbers,
    0
)
```

Karena itu, `reduce()` lebih tepat digunakan ketika proses akumulasi membutuhkan logika yang memang sesuai dengan kebutuhannya.

---

## Kesimpulan

`reduce()` adalah function dari modul `functools` yang digunakan untuk **mengakumulasi elemen iterable hingga menghasilkan satu nilai akhir**.

Untuk menggunakannya:

```python
from functools import reduce
```

Sintaks:

```python
reduce(
    function,
    iterable,
    initial
)
```

Contoh:

```python
from functools import reduce

numbers = [1, 2, 3, 4]

result = reduce(
    lambda acc, item: acc + item,
    numbers,
    0
)

print(result)
```

Output:

```text
10
```

Hal penting yang perlu diingat:

- `reduce()` berada di dalam modul `functools`.
- `reduce()` menerima function sebagai argument.
- Function tersebut biasanya menerima `accumulator` dan `item`.
- `accumulator` menyimpan hasil proses sebelumnya.
- `item` merupakan elemen yang sedang diproses.
- `initial` digunakan untuk menentukan nilai awal accumulator.
- `initial` bersifat opsional.
- Hasil akhir `reduce()` adalah satu nilai.
- `reduce()` dapat digunakan untuk berbagai proses akumulasi.
- `reduce()` merupakan contoh Higher-Order Function.
- `reduce()` dapat digunakan tanpa mengubah iterable asli.

Pola utama `reduce()` dapat diingat sebagai:

```text
Iterable
   ↓
Accumulator + Item
   ↓
Hasil sementara
   ↓
Accumulator berikutnya
   ↓
Diulang sampai semua elemen selesai
   ↓
Satu nilai akhir
```

Dengan memahami `map()`, `filter()`, `zip()`, dan `reduce()`, kita sudah memiliki dasar penting untuk memahami bagaimana Python menyediakan berbagai fungsi yang mendukung pendekatan **Functional Programming**.