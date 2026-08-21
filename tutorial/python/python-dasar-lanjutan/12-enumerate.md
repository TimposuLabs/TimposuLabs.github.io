---
sidebar_position: 12
title: "Enumerate"
---

Fungsi `enumerate()` digunakan ketika kita melakukan perulangan terhadap sebuah **iterable** dan membutuhkan dua informasi sekaligus, yaitu **indeks** dan **nilai elemen**.

Tanpa `enumerate()`, kita sering kali perlu membuat dan mengelola variabel indeks secara manual. Dengan `enumerate()`, Python menyediakan indeks tersebut secara otomatis.

---

## 1. Penggunaan Dasar `enumerate()`

Sintaks dasar:

```python
enumerate(iterable)
```

Contoh menggunakan string:

```python
for i, char in enumerate('hello'):
    print(i, char)
```

Output:

```text
0 h
1 e
2 l
3 l
4 o
```

Pada setiap iterasi:

- `i` berisi indeks.
- `char` berisi karakter pada indeks tersebut.

---

## 2. `enumerate()` pada List

`enumerate()` juga dapat digunakan pada list.

```python
numbers = [10, 20, 30]

for i, item in enumerate(numbers):
    print(f"Indeks: {i}, Nilai: {item}")
```

Output:

```text
Indeks: 0, Nilai: 10
Indeks: 1, Nilai: 20
Indeks: 2, Nilai: 30
```

Dengan demikian, kita dapat mengetahui posisi setiap elemen tanpa harus mengakses indeks secara manual.

---

## 3. Mengapa Menggunakan `enumerate()`?

Misalnya kita ingin mengetahui indeks dari setiap elemen dalam sebuah list.

Tanpa `enumerate()`, kita mungkin menggunakan pendekatan seperti:

```python
numbers = [10, 20, 30]

for i in range(len(numbers)):
    print(i, numbers[i])
```

Pendekatan tersebut tetap valid, tetapi ketika kita hanya membutuhkan indeks dan nilai secara bersamaan, `enumerate()` biasanya lebih sederhana dan mudah dibaca.

Dengan `enumerate()`:

```python
numbers = [10, 20, 30]

for i, item in enumerate(numbers):
    print(i, item)
```

Kode menjadi lebih langsung karena Python memberikan indeks dan elemennya sekaligus.

---

## 4. Mekanisme Tuple Unpacking

`enumerate()` menghasilkan pasangan berupa tuple yang berisi:

```text
(indeks, nilai)
```

Contohnya:

```python
for item in enumerate(['a', 'b', 'c']):
    print(item)
```

Output:

```text
(0, 'a')
(1, 'b')
(2, 'c')
```

Karena hasilnya berupa pasangan nilai, kita dapat menggunakan **tuple unpacking**:

```python
for index, item in enumerate(['a', 'b', 'c']):
    print(index, item)
```

Python secara otomatis memisahkan:

```text
(0, 'a') → index = 0, item = 'a'
(1, 'b') → index = 1, item = 'b'
(2, 'c') → index = 2, item = 'c'
```

---

## 5. Latihan: Mencari Indeks Angka 50

Kita dapat menggunakan `enumerate()` untuk mencari posisi sebuah nilai di dalam list.

Pertama, buat list angka dari `0` sampai `99`:

```python
my_list = list(range(100))
```

Kemudian gunakan `enumerate()` untuk mendapatkan indeks dan nilainya:

```python
for i, num in enumerate(my_list):
    if num == 50:
        print(f"Indeks dari 50 adalah {i}")
```

Output:

```text
Indeks dari 50 adalah 50
```

Pada contoh tersebut:

- `i` adalah indeks elemen.
- `num` adalah nilai elemen.
- Kondisi `num == 50` digunakan untuk mencari angka `50`.

---

## 6. `enumerate()` sebagai Iterable

Seperti `range()`, fungsi `enumerate()` tidak langsung menghasilkan list.

Contoh:

```python
result = enumerate(['a', 'b', 'c'])

print(result)
```

Hasilnya berupa objek `enumerate`.

Objek tersebut dapat digunakan dalam perulangan:

```python
result = enumerate(['a', 'b', 'c'])

for index, value in result:
    print(index, value)
```

Pendekatan ini memungkinkan Python memproses pasangan indeks dan nilai ketika dibutuhkan selama proses iterasi.

---

## 7. Ringkasan

`enumerate()` sangat berguna ketika kita membutuhkan **indeks sekaligus nilai** saat melakukan looping.

Pola yang paling sering digunakan:

```python
for index, value in enumerate(iterable):
    ...
```

Contoh:

```python
names = ['Andi', 'Budi', 'Citra']

for index, name in enumerate(names):
    print(index, name)
```

Output:

```text
0 Andi
1 Budi
2 Citra
```

### Poin Penting

1. `enumerate()` digunakan untuk mendapatkan **indeks dan nilai** dalam satu proses iterasi.
2. `enumerate()` dapat digunakan pada berbagai iterable seperti **string, list, tuple, dan lainnya**.
3. Hasil iterasi berbentuk pasangan **`(index, value)`**.
4. Pasangan tersebut dapat langsung digunakan dengan **tuple unpacking**.
5. `enumerate()` menghasilkan **enumerate object**, bukan list.
6. `enumerate()` sering membuat kode looping lebih sederhana dan mudah dibaca.