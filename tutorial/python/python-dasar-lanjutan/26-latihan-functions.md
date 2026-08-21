---
sidebar_position: 26
title: "Latihan: Functions"
---

Latihan ini menggabungkan beberapa konsep Python yang telah dipelajari sebelumnya, yaitu **function**, **parameter**, **for loop**, **conditional**, **list**, **append()**, **operator modulus**, dan **return**.

Tujuan latihan adalah membuat sebuah function yang dapat mencari **angka genap terbesar** dari sebuah list.

---

## Tujuan Latihan

Buat sebuah function bernama `highest_even` yang:

1. Menerima sebuah list berisi angka sebagai parameter.
2. Memeriksa setiap angka di dalam list.
3. Mengambil angka yang merupakan bilangan genap.
4. Mencari angka genap dengan nilai terbesar.
5. Mengembalikan hasil menggunakan `return`.

Contoh:

```python
highest_even([10, 2, 3, 4, 8, 11])
```

Hasil yang diharapkan:

```text
10
```

---

## Langkah-Langkah Pemecahan Masalah

Untuk menyelesaikan latihan ini, kita dapat memecah masalah menjadi beberapa langkah sederhana.

### 1. Membuat Function

Pertama, buat function bernama `highest_even`.

```python
def highest_even(li):
    pass
```

Parameter `li` akan digunakan untuk menerima list angka.

---

### 2. Membuat List Penampung

Kita membutuhkan tempat untuk menyimpan semua angka genap yang ditemukan.

```python
def highest_even(li):
    evens = []
```

Variabel `evens` merupakan list kosong yang nantinya akan berisi angka-angka genap.

---

### 3. Melakukan Perulangan

Gunakan `for loop` untuk memeriksa setiap elemen dari list.

```python
def highest_even(li):
    evens = []

    for item in li:
        pass
```

Variabel `item` akan berisi setiap angka dari list secara bergantian.

---

### 4. Memeriksa Bilangan Genap

Gunakan operator modulus `%` untuk mengetahui apakah sebuah angka merupakan bilangan genap.

```python
item % 2 == 0
```

Jika hasilnya `True`, berarti angka tersebut merupakan bilangan genap.

Contoh:

```python
10 % 2 == 0
```

Hasilnya:

```text
True
```

Sedangkan:

```python
11 % 2 == 0
```

Hasilnya:

```text
False
```

Kemudian masukkan pemeriksaan tersebut ke dalam conditional:

```python
def highest_even(li):
    evens = []

    for item in li:
        if item % 2 == 0:
            evens.append(item)
```

---

## 5. Mencari Nilai Genap Terbesar

Setelah seluruh angka genap dikumpulkan ke dalam `evens`, gunakan fungsi bawaan `max()`.

```python
max(evens)
```

Contohnya:

```python
evens = [10, 2, 4, 8]

print(max(evens))
```

Output:

```text
10
```

---

## 6. Mengembalikan Hasil dengan `return`

Hasil dari `max()` kemudian dikembalikan oleh function.

```python
def highest_even(li):
    evens = []

    for item in li:
        if item % 2 == 0:
            evens.append(item)

    return max(evens)
```

Perhatikan posisi `return`.

`return` berada di luar blok `for` karena seluruh elemen list harus diperiksa terlebih dahulu sebelum menentukan angka genap terbesar.

---

## Solusi Lengkap

```python
def highest_even(li):
    evens = []

    for item in li:
        if item % 2 == 0:
            evens.append(item)

    return max(evens)


print(highest_even([10, 2, 3, 4, 8, 11]))
```

Output:

```text
10
```

---

## Cara Kerja Program

Misalnya kita memberikan list:

```python
[10, 2, 3, 4, 8, 11]
```

Function akan memeriksa setiap angka:

```text
10 → genap → simpan
2  → genap → simpan
3  → ganjil → abaikan
4  → genap → simpan
8  → genap → simpan
11 → ganjil → abaikan
```

Sehingga list `evens` menjadi:

```python
[10, 2, 4, 8]
```

Kemudian:

```python
max(evens)
```

menghasilkan:

```text
10
```

Nilai tersebut dikembalikan menggunakan `return`.

---

## Kesalahan Umum: `return` di Dalam Loop

Salah satu kesalahan yang sering terjadi adalah menempatkan `return` di dalam `for loop`.

Contoh yang salah:

```python
def highest_even(li):
    evens = []

    for item in li:
        if item % 2 == 0:
            evens.append(item)
            return max(evens)
```

Masalahnya adalah `return` langsung menghentikan function.

Jika angka pertama yang ditemukan adalah angka genap, function akan langsung mengembalikan hasil dan tidak memeriksa angka berikutnya.

Misalnya:

```python
highest_even([2, 4, 10])
```

Dengan kode yang salah, function dapat berhenti ketika menemukan `2`.

Padahal hasil yang benar adalah:

```text
10
```

---

## Posisi `return` yang Benar

`return` harus berada setelah proses perulangan selesai.

```python
def highest_even(li):
    evens = []

    for item in li:
        if item % 2 == 0:
            evens.append(item)

    return max(evens)
```

Dengan demikian, seluruh elemen list akan diperiksa terlebih dahulu.

Alurnya:

```text
List
 ↓
For Loop
 ↓
Periksa setiap angka
 ↓
Ambil angka genap
 ↓
Simpan ke evens
 ↓
Loop selesai
 ↓
Cari nilai terbesar
 ↓
return hasil
```

---

## Konsep yang Dilatih

Latihan `highest_even` menggabungkan beberapa konsep fundamental Python:

| Konsep | Penggunaan |
|---|---|
| Function | Membuat function `highest_even` |
| Parameter | Menerima list melalui parameter `li` |
| List | Menyimpan angka genap |
| `for` loop | Memeriksa setiap elemen |
| `if` | Memeriksa kondisi bilangan genap |
| `%` | Menentukan genap atau ganjil |
| `append()` | Menambahkan angka genap |
| `max()` | Mencari nilai terbesar |
| `return` | Mengembalikan hasil function |

---

## Kesimpulan

Latihan `highest_even` merupakan contoh sederhana bagaimana beberapa konsep dasar Python dapat digabungkan untuk menyelesaikan sebuah masalah.

Hal yang paling penting dari latihan ini bukan hanya mendapatkan output `10`, tetapi memahami **alur pemecahan masalah**:

```text
Input
 ↓
Iterasi
 ↓
Filtering
 ↓
Menyimpan hasil
 ↓
Mencari nilai maksimum
 ↓
Return
```

Pola seperti ini akan sering digunakan ketika membuat program yang melakukan proses **filtering, pencarian, dan pengolahan data**.