---
sidebar_position: 16
title: "Latihan: Membuat ASCII Art dengan Nested Loop"
---

Pada latihan ini, kita akan menggabungkan beberapa konsep Python yang telah dipelajari sebelumnya untuk membuat sebuah gambar sederhana di terminal.

Gambar akan direpresentasikan menggunakan **list multidimensi** atau matrix yang berisi nilai `0` dan `1`.

- `0` akan direpresentasikan sebagai spasi.
- `1` akan direpresentasikan sebagai karakter `*`.

Latihan ini bukan GUI dalam arti graphical user interface, melainkan latihan membuat visual sederhana menggunakan **ASCII Art** di terminal.

---

## 1. Tujuan Latihan

Setelah menyelesaikan latihan ini, Anda akan berlatih menggunakan:

- List multidimensi.
- Nested `for` loop.
- Conditional `if-else`.
- Comparison operator.
- Fungsi `print()`.
- Parameter `end`.
- Indentation.
- Iterasi terhadap list.

Latihan ini juga membantu memahami bagaimana data dalam bentuk matrix dapat diproses menggunakan perulangan bersarang.

---

## 2. Menyiapkan Data Gambar

Gambar akan disimpan dalam sebuah list multidimensi.

```python
picture = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0]
]
```

Setiap list di dalam `picture` merepresentasikan satu baris gambar.

Sebagai contoh:

```python
[0, 0, 0, 1, 0, 0, 0]
```

dapat dibaca sebagai:

```text
spasi spasi spasi bintang spasi spasi spasi
```

---

## 3. Menggunakan Nested Loop

Karena `picture` merupakan list multidimensi, kita membutuhkan dua buah `for` loop.

Loop pertama digunakan untuk membaca setiap baris:

```python
for row in picture:
    ...
```

Kemudian loop kedua digunakan untuk membaca setiap elemen di dalam baris tersebut:

```python
for pixel in row:
    ...
```

Sehingga bentuk dasarnya menjadi:

```python
for row in picture:
    for pixel in row:
        ...
```

Loop pertama menangani **baris**, sedangkan loop kedua menangani **elemen atau pixel dalam baris**.

---

## 4. Menggunakan Conditional Logic

Setiap pixel memiliki nilai `0` atau `1`.

Kita dapat menggunakan `if-else` untuk menentukan karakter yang akan ditampilkan.

```python
if pixel == 1:
    print('*', end='')
else:
    print(' ', end='')
```

Jika nilainya `1`, program mencetak `*`.

Jika nilainya `0`, program mencetak spasi.

---

## 5. Menggunakan Parameter `end`

Secara default, `print()` akan berpindah ke baris baru setelah mencetak sesuatu.

Contoh:

```python
print('*')
print('*')
print('*')
```

Output:

```text
*
*
*
```

Namun, kita ingin beberapa karakter berada pada baris yang sama.

Untuk itu, gunakan:

```python
print('*', end='')
```

Dengan `end=''`, Python tidak langsung membuat baris baru.

Contoh:

```python
print('*', end='')
print('*', end='')
print('*', end='')
```

Output:

```text
***
```

Inilah yang memungkinkan kita membentuk gambar dari kumpulan karakter.

---

## 6. Berpindah ke Baris Berikutnya

Setelah seluruh pixel pada satu baris selesai diproses, kita perlu berpindah ke baris berikutnya.

Caranya dengan menggunakan:

```python
print()
```

Contoh:

```python
for row in picture:
    for pixel in row:
        if pixel == 1:
            print('*', end='')
        else:
            print(' ', end='')

    print()
```

`print()` yang berada setelah inner loop bertugas membuat baris baru setelah seluruh pixel dalam satu `row` selesai diproses.

---

## 7. Implementasi Lengkap

Berikut implementasi lengkap latihan:

```python
picture = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0]
]

for row in picture:
    for pixel in row:
        if pixel == 1:
            print('*', end='')
        else:
            print(' ', end='')

    print()
```

Output:

```text
   *
  ***
 *****
*******
   *
   *
```

---

## 8. Memahami Alur Program

Misalnya baris pertama memiliki data:

```python
[0, 0, 0, 1, 0, 0, 0]
```

Inner loop akan memproses setiap nilai:

```text
0 → spasi
0 → spasi
0 → spasi
1 → *
0 → spasi
0 → spasi
0 → spasi
```

Hasilnya:

```text
   *
```

Setelah seluruh elemen pada baris selesai diproses, `print()` digunakan untuk berpindah ke baris berikutnya.

Proses tersebut terus dilakukan sampai seluruh baris dalam `picture` selesai.

---

## 9. Mengapa Menggunakan `row` dan `pixel`?

Kita dapat menggunakan nama variabel seperti `i` dan `j`, tetapi nama tersebut tidak menjelaskan apa yang sedang diproses.

Contoh:

```python
for i in picture:
    for j in i:
        ...
```

Kode tersebut memang valid, tetapi kurang deskriptif.

Dengan menggunakan:

```python
for row in picture:
    for pixel in row:
        ...
```

maksud kode menjadi lebih jelas:

- `row` berarti baris.
- `pixel` berarti elemen atau pixel dalam baris.

Penamaan variabel yang deskriptif merupakan bagian penting dari **clean code**.

---

## 10. Konsep DRY

Latihan ini juga memperkenalkan prinsip **DRY (Don't Repeat Yourself)**.

Kita tidak perlu menulis kode khusus untuk setiap baris gambar.

Tanpa loop, kita harus melakukan sesuatu seperti:

```python
print("   *")
print("  ***")
print(" *****")
print("*******")
print("   *")
print("   *")
```

Pendekatan tersebut hanya cocok untuk gambar tertentu.

Dengan nested loop:

```python
for row in picture:
    for pixel in row:
        ...
```

kode dapat bekerja dengan berbagai ukuran dan bentuk matrix selama struktur datanya sesuai.

---

## Poin Penting

1. List multidimensi dapat digunakan untuk merepresentasikan gambar sederhana.
2. Nested `for` digunakan untuk memproses setiap baris dan setiap elemen di dalam baris.
3. `if-else` digunakan untuk menentukan karakter berdasarkan nilai pixel.
4. `print(..., end='')` digunakan agar karakter tetap berada pada baris yang sama.
5. `print()` digunakan untuk berpindah ke baris berikutnya.
6. Penamaan seperti `row` dan `pixel` membuat kode lebih mudah dibaca.
7. Loop membuat kode lebih fleksibel dibandingkan menulis setiap baris secara manual.

---

## Kesimpulan

Latihan ASCII Art ini merupakan latihan integrasi dari beberapa konsep dasar Python yang telah dipelajari, terutama **list multidimensi, nested loop, conditional logic, dan penggunaan `print()`**.

Walaupun hasilnya ditampilkan di terminal dan bukan graphical user interface sebenarnya, latihan ini memberikan gambaran sederhana tentang bagaimana data berbentuk matrix dapat diproses untuk menghasilkan representasi visual.

Konsep seperti nested loop dan pemrosesan matrix nantinya juga akan banyak digunakan dalam berbagai bidang, seperti pengolahan data, image processing, dan pemrograman aplikasi.