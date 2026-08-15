---
sidebar_position: 41
title: "Tuple - Slicing, Unpacking dan Methods"
---

Pada materi sebelumnya, kita telah mempelajari konsep dasar Tuple, termasuk sifatnya yang **immutable**, cara mengakses elemen, dan perbedaannya dengan List.

Pada materi ini, kita akan mempelajari beberapa operasi yang umum digunakan pada Tuple:

- Slicing.
- Unpacking.
- Method `.count()`.
- Method `.index()`.
- Fungsi `len()`.

---

## 1. Slicing pada Tuple

Tuple mendukung teknik **slicing**, sama seperti String dan List.

Format slicing:

```text
tuple[start:stop:step]
```

Keterangan:

- `start` adalah indeks awal.
- `stop` adalah indeks akhir dan tidak termasuk.
- `step` adalah langkah perpindahan.

Contohnya:

```python
my_tuple = (1, 2, 3, 4, 5)

new_tuple = my_tuple[1:4]

print(new_tuple)
```

Hasil:

```text
(2, 3, 4)
```

Slicing tidak mengubah Tuple asli. Hasil slicing merupakan Tuple baru.

---

## 2. Contoh Slicing Tuple

Beberapa contoh penggunaan slicing:

```python
my_tuple = (1, 2, 3, 4, 5)

print(my_tuple[1:4])
print(my_tuple[:3])
print(my_tuple[2:])
print(my_tuple[::2])
```

Hasil:

```text
(2, 3, 4)
(1, 2, 3)
(3, 4, 5)
(1, 3, 5)
```

Konsep slicing pada Tuple sama dengan slicing pada String dan List.

---

## 3. Slicing Menghasilkan Tuple Baru

Karena Tuple bersifat immutable, slicing tidak memodifikasi Tuple asli.

Contohnya:

```python
my_tuple = (1, 2, 3, 4, 5)

new_tuple = my_tuple[1:4]

print(my_tuple)
print(new_tuple)
```

Hasil:

```text
(1, 2, 3, 4, 5)
(2, 3, 4)
```

Tuple awal tetap tidak berubah.

---

## 4. Tuple dengan Satu Elemen

Jika hasil slicing hanya memiliki satu elemen, Python menggunakan koma untuk menunjukkan bahwa objek tersebut merupakan Tuple.

Contohnya:

```python
my_tuple = (1, 2, 3, 4, 5)

new_tuple = my_tuple[1:2]

print(new_tuple)
```

Hasil:

```text
(2,)
```

Perhatikan adanya koma setelah angka `2`.

Tanpa koma:

```text
(2)
```

Python akan menganggapnya sebagai angka biasa, bukan Tuple.

---

## 5. Tuple Unpacking

**Tuple unpacking** adalah proses membongkar elemen Tuple dan memasukkannya ke dalam beberapa variabel.

Contohnya:

```python
my_tuple = (1, 2, 3)

x, y, z = my_tuple

print(x)
print(y)
print(z)
```

Hasil:

```text
1
2
3
```

Proses tersebut dapat dipahami sebagai:

```text
x ← 1
y ← 2
z ← 3
```

---

## 6. Jumlah Variabel Harus Sesuai

Pada unpacking biasa, jumlah variabel harus sesuai dengan jumlah elemen Tuple.

Contohnya:

```python
my_tuple = (1, 2, 3)

x, y, z = my_tuple
```

Kode tersebut benar karena terdapat:

```text
3 elemen
3 variabel
```

Namun, jika:

```python
x, y = my_tuple
```

Python akan menghasilkan error karena terdapat tiga elemen tetapi hanya dua variabel.

---

## 7. Unpacking dengan Asterisk `*`

Asterisk `*` dapat digunakan untuk menampung sisa elemen.

Contohnya:

```python
my_tuple = (1, 2, 3, 4, 5)

x, y, z, *other = my_tuple

print(x)
print(y)
print(z)
print(other)
```

Hasil:

```text
1
2
3
[4, 5]
```

Perhatikan bahwa `other` berbentuk **List**, bukan Tuple.

```text
other → [4, 5]
```

---

## 8. Unpacking dengan Elemen Terakhir

Asterisk juga dapat ditempatkan sebelum variabel terakhir.

Contohnya:

```python
my_tuple = (1, 2, 3, 4, 5)

x, y, *other, z = my_tuple

print(x)
print(y)
print(other)
print(z)
```

Hasil:

```text
1
2
[3, 4]
5
```

Python akan menempatkan:

- `x` → elemen pertama.
- `y` → elemen kedua.
- `other` → elemen yang tersisa di tengah.
- `z` → elemen terakhir.

---

## 9. Method pada Tuple

Tuple memiliki method yang relatif sedikit dibandingkan List.

Hal ini berkaitan dengan sifat Tuple yang **immutable**.

Dua method utama yang perlu diketahui adalah:

```text
.count()
.index()
```

---

## 10. Method `.count()`

Method `.count()` digunakan untuk menghitung berapa kali sebuah nilai muncul di dalam Tuple.

Contohnya:

```python
my_tuple = (1, 2, 3, 4, 5, 5)

print(my_tuple.count(5))
```

Hasil:

```text
2
```

Karena angka `5` muncul sebanyak dua kali.

Contoh lainnya:

```python
my_tuple = ("Python", "Java", "Python", "Kotlin")

print(my_tuple.count("Python"))
```

Hasil:

```text
2
```

---

## 11. Method `.index()`

Method `.index()` digunakan untuk mencari indeks pertama dari sebuah nilai.

Contohnya:

```python
my_tuple = (1, 2, 3, 4, 5)

print(my_tuple.index(5))
```

Hasil:

```text
4
```

Karena angka `5` berada pada indeks `4`.

---

## 12. `.index()` pada Nilai yang Muncul Lebih dari Sekali

Jika sebuah nilai muncul beberapa kali, `.index()` akan mengembalikan **indeks pertama** tempat nilai tersebut ditemukan.

Contohnya:

```python
my_tuple = (1, 5, 3, 5, 7)

print(my_tuple.index(5))
```

Hasil:

```text
1
```

Walaupun angka `5` juga terdapat pada indeks `3`, `.index()` mengembalikan indeks pertama.

---

## 13. `.index()` Jika Nilai Tidak Ditemukan

Jika nilai yang dicari tidak terdapat di dalam Tuple, Python akan menghasilkan `ValueError`.

Contohnya:

```python
my_tuple = (1, 2, 3, 4, 5)

print(my_tuple.index(10))
```

Hasil:

```text
ValueError
```

Karena nilai `10` tidak terdapat di dalam Tuple.

---

## 14. Fungsi `len()`

Selain method `.count()` dan `.index()`, kita dapat menggunakan fungsi bawaan `len()` untuk mengetahui jumlah elemen Tuple.

Contohnya:

```python
my_tuple = (1, 2, 3, 4, 5)

print(len(my_tuple))
```

Hasil:

```text
5
```

`len()` menghitung jumlah elemen, bukan indeks terakhir.

Misalnya:

```python
my_tuple = (10, 20, 30)

print(len(my_tuple))
```

Hasil:

```text
3
```

Walaupun indeks terakhir adalah:

```text
2
```

---

## 15. Perbedaan `len()` dan `.index()`

Perhatikan perbedaan berikut:

```python
my_tuple = ("a", "b", "c", "d")

print(len(my_tuple))
print(my_tuple.index("d"))
```

Hasil:

```text
4
3
```

`len()` menghasilkan jumlah elemen:

```text
4
```

Sedangkan `.index()` menghasilkan posisi elemen:

```text
3
```

---

## 16. Ringkasan Tuple Methods

| Method/Fungsi | Fungsi |
| --- | --- |
| `tuple[start:stop:step]` | Mengambil sebagian Tuple |
| `.count(value)` | Menghitung jumlah kemunculan value |
| `.index(value)` | Mencari indeks pertama value |
| `len(tuple)` | Menghitung jumlah elemen |

---

## 17. Contoh Lengkap

```python
my_tuple = (10, 20, 30, 20, 40, 20)

# Slicing
print(my_tuple[1:4])

# Unpacking
a, b, c, *other = my_tuple

print(a)
print(b)
print(c)
print(other)

# Count
print(my_tuple.count(20))

# Index
print(my_tuple.index(20))

# Panjang Tuple
print(len(my_tuple))
```

Hasil:

```text
(20, 30, 20)
10
20
30
[20, 40, 20]
3
1
6
```

---

## 18. Ringkasan

Beberapa hal penting yang perlu diingat:

### Slicing

```python
my_tuple[1:4]
```

Digunakan untuk mengambil sebagian elemen dan menghasilkan Tuple baru.

### Unpacking

```python
x, y, z = my_tuple
```

Digunakan untuk membongkar elemen Tuple ke beberapa variabel.

### Unpacking dengan `*`

```python
x, y, *other = my_tuple
```

Digunakan untuk menampung sisa elemen ke dalam List.

### `.count()`

```python
my_tuple.count(20)
```

Menghitung jumlah kemunculan suatu nilai.

### `.index()`

```python
my_tuple.index(20)
```

Mencari indeks pertama suatu nilai.

### `len()`

```python
len(my_tuple)
```

Menghitung jumlah elemen Tuple.

---

## Kesimpulan

Walaupun Tuple memiliki method yang lebih sedikit dibandingkan List, Tuple tetap menyediakan operasi penting untuk mengakses dan memproses data.

Karena Tuple bersifat **immutable**, kita tidak dapat menggunakan method seperti `.append()`, `.remove()`, `.sort()`, atau `.reverse()` untuk memodifikasi isinya.

Operasi yang paling penting untuk dikuasai adalah:

```text
Slicing
Unpacking
.count()
.index()
len()
```

:::info
**Intinya:** Tuple cocok untuk data yang tidak perlu dimodifikasi, tetapi tetap dapat diakses, dipotong, dibongkar, dan diperiksa menggunakan berbagai operasi yang tersedia di Python.
:::