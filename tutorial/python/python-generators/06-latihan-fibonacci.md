---
sidebar_position: 6
title: "Latihan: Deret Fibonacci"
---

## Apa Itu Deret Fibonacci?

**Deret Fibonacci** adalah sebuah urutan bilangan di mana setiap bilangan berikutnya diperoleh dari hasil penjumlahan dua bilangan sebelumnya.

Deret ini umumnya dimulai dari:

```text
0, 1
```

Kemudian setiap angka berikutnya dihitung berdasarkan dua angka sebelumnya:

```text
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
```

Sebagai contoh:

```text
0 + 1 = 1
1 + 1 = 2
1 + 2 = 3
2 + 3 = 5
3 + 5 = 8
```

## Rumus Deret Fibonacci

Secara matematis, deret Fibonacci dapat didefinisikan sebagai:

```text
F₀ = 0
F₁ = 1

Fₙ = Fₙ₋₁ + Fₙ₋₂
```

Untuk `n >= 2`.

Dengan aturan tersebut, beberapa nilai awalnya adalah:

| Indeks | Nilai |
| ---: | ---: |
| 0 | 0 |
| 1 | 1 |
| 2 | 1 |
| 3 | 2 |
| 4 | 3 |
| 5 | 5 |
| 6 | 8 |
| 7 | 13 |
| 8 | 21 |
| 9 | 34 |

## Fibonacci dengan Generator

Deret Fibonacci merupakan contoh yang baik untuk mempraktikkan konsep **Generator** yang telah dipelajari sebelumnya.

Dengan menggunakan `yield`, kita dapat menghasilkan bilangan Fibonacci satu per satu tanpa harus membuat seluruh deret menjadi sebuah `list`.

Contohnya:

```python
def fibonacci_generator(index):
    a = 0
    b = 1

    for i in range(index):
        yield a
        a, b = b, a + b
```

Generator tersebut dapat digunakan dengan `for`:

```python
for num in fibonacci_generator(10):
    print(num, end=" ")
```

Output:

```text
0 1 1 2 3 5 8 13 21 34
```

Generator menghasilkan setiap bilangan Fibonacci secara bertahap.

## Cara Kerja Generator Fibonacci

Pada awal proses, terdapat dua nilai:

```text
a = 0
b = 1
```

Nilai `a` menjadi angka Fibonacci yang dihasilkan.

Setelah nilai tersebut diberikan melalui `yield`, kedua variabel diperbarui:

```python
a, b = b, a + b
```

Proses tersebut terus berulang.

Secara sederhana:

```text
a = 0, b = 1
   ↓
yield 0
   ↓
a = 1, b = 1
   ↓
yield 1
   ↓
a = 1, b = 2
   ↓
yield 1
   ↓
a = 2, b = 3
   ↓
yield 2
   ↓
  ...
```

Dengan mekanisme tersebut, generator dapat menghasilkan deret Fibonacci secara bertahap.

## Loop Biasa dengan `list`

Selain menggunakan generator, kita dapat membuat deret Fibonacci menggunakan perulangan biasa dan menyimpan seluruh hasilnya dalam `list`.

Contohnya:

```python
def fibonacci_list(number):
    a = 0
    b = 1
    result = []

    for i in range(number):
        result.append(a)
        a, b = b, a + b

    return result
```

Penggunaannya:

```python
print(fibonacci_list(10))
```

Output:

```text
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

Berbeda dengan generator, pendekatan ini menyimpan seluruh hasil Fibonacci di dalam `list`.

## Generator vs List

Kedua pendekatan dapat menghasilkan deret Fibonacci yang sama, tetapi cara pengelolaan hasilnya berbeda.

| Aspek | Generator | List |
| --- | --- | --- |
| Menghasilkan data | Bertahap | Sekaligus |
| Penyimpanan hasil | Tidak menyimpan seluruh sequence | Menyimpan seluruh hasil |
| Penggunaan memory | Lebih efisien untuk sequence besar | Lebih besar ketika data banyak |
| Cocok untuk | Pemrosesan satu per satu | Ketika seluruh hasil diperlukan |

Generator:

```text
0
↓
1
↓
1
↓
2
↓
3
↓
...
```

List:

```text
[0, 1, 1, 2, 3, ...]
```

## Tuple Unpacking pada Fibonacci

Pada implementasi Fibonacci terdapat baris:

```python
a, b = b, a + b
```

Baris tersebut menggunakan fitur Python yang disebut **tuple unpacking**.

Tujuannya adalah memperbarui dua variable secara bersamaan.

Misalnya:

```text
Sebelum:
a = 2
b = 3

a, b = b, a + b

Sesudah:
a = 3
b = 5
```

Nilai baru dihitung berdasarkan nilai `a` dan `b` sebelumnya.

Pendekatan ini menghindari kebutuhan untuk membuat variable sementara.

## Fibonacci dengan Rekursi

Fibonacci juga sering digunakan untuk memperkenalkan konsep **rekursi**, yaitu function yang memanggil dirinya sendiri.

Contohnya:

```python
def fibonacci_recursive(n):
    if n == 0:
        return 0

    elif n == 1:
        return 1

    return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2)
```

Untuk mendapatkan nilai Fibonacci pada indeks tertentu:

```python
print(fibonacci_recursive(8))
```

Output:

```text
21
```

Function tersebut mengikuti definisi matematis Fibonacci:

```text
F(n) = F(n - 1) + F(n - 2)
```

## Perbandingan Pendekatan

Deret Fibonacci dapat dibuat menggunakan beberapa pendekatan:

| Pendekatan | Karakteristik |
| --- | --- |
| Generator | Menghasilkan nilai satu per satu |
| Loop + `list` | Menyimpan seluruh hasil |
| Rekursi | Mengikuti definisi Fibonacci secara langsung |

Generator sangat cocok digunakan untuk menghubungkan konsep Fibonacci dengan materi **Generator, `yield`, dan pemrosesan data secara bertahap**.

Rekursi lebih cocok digunakan untuk memahami bagaimana sebuah masalah dapat dipecah menjadi pemanggilan function yang lebih kecil.

## Contoh Lengkap Generator Fibonacci

Berikut implementasi lengkap yang dapat digunakan sebagai latihan:

```python
def fibonacci_generator(index):
    a = 0
    b = 1

    for i in range(index):
        yield a
        a, b = b, a + b


for number in fibonacci_generator(10):
    print(number)
```

Output:

```text
0
1
1
2
3
5
8
13
21
34
```

## Kompleksitas Memory

Salah satu alasan generator cocok untuk menghasilkan sequence adalah karena nilai dapat diproses secara bertahap.

Generator Fibonacci tidak membutuhkan `list` untuk menyimpan seluruh hasil.

Secara konseptual:

```text
Generator
   ↓
Hasilkan nilai
   ↓
Proses
   ↓
Hasilkan nilai berikutnya
   ↓
Proses kembali
```

Hal ini membuat pendekatan generator sangat berguna ketika sequence yang dihasilkan panjang dan tidak semua nilai perlu disimpan sekaligus.

## Kesimpulan

Deret Fibonacci merupakan latihan yang baik untuk memahami beberapa konsep Python sekaligus, terutama:

- Perulangan.
- Generator.
- `yield`.
- Tuple unpacking.
- Rekursi.
- Pemrosesan sequence secara bertahap.

Dengan generator, Fibonacci dapat dibuat menggunakan pola:

```python
def fibonacci_generator(index):
    a = 0
    b = 1

    for i in range(index):
        yield a
        a, b = b, a + b
```

Inti dari algoritmanya adalah memperbarui dua nilai secara terus-menerus:

```text
a, b
 ↓
b, a + b
 ↓
b, a + b
 ↓
...
```

Dengan memahami latihan ini, konsep generator yang telah dipelajari sebelumnya dapat diterapkan pada sebuah kasus algoritmik yang nyata.