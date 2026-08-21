---
sidebar_position: 11
title: "Range"
---

Fungsi `range()` digunakan untuk menghasilkan urutan angka yang dapat digunakan sebagai **iterable**, terutama dalam `for loop`.

`range()` sangat berguna ketika kita ingin melakukan perulangan berdasarkan jumlah tertentu tanpa harus membuat list angka secara manual.

---

## 1. Penggunaan Dasar `range(stop)`

Bentuk paling sederhana adalah:

```python
range(stop)
```

Jika hanya diberikan satu argumen, Python akan membuat urutan angka yang dimulai dari `0` sampai sebelum nilai `stop`.

Contoh:

```python
for i in range(10):
    print(i)
```

Output:

```text
0
1
2
3
4
5
6
7
8
9
```

Perhatikan bahwa angka `10` tidak ikut dicetak.

---

## 2. Menentukan Nilai Awal dan Akhir

Kita dapat menentukan nilai awal menggunakan:

```python
range(start, stop)
```

Contoh:

```python
for i in range(1, 11):
    print(i)
```

Output:

```text
1
2
3
4
5
6
7
8
9
10
```

Nilai `start` termasuk dalam urutan, sedangkan nilai `stop` tidak termasuk.

---

## 3. Menggunakan `step`

`range()` juga dapat menerima parameter ketiga untuk menentukan jarak antar angka:

```python
range(start, stop, step)
```

Contoh:

```python
for i in range(0, 10, 2):
    print(i)
```

Output:

```text
0
2
4
6
8
```

Pada contoh tersebut, `step` bernilai `2`, sehingga Python melompati satu angka setiap iterasi.

---

## 4. Melakukan Perulangan Terbalik

`range()` juga dapat digunakan untuk melakukan perulangan dari angka besar ke angka kecil.

Gunakan nilai `step` negatif:

```python
for i in range(10, 0, -1):
    print(i)
```

Output:

```text
10
9
8
7
6
5
4
3
2
1
```

Karena `stop` bersifat eksklusif, angka `0` tidak ikut dicetak.

---

## 5. Menggunakan `_` dalam `range()`

Terkadang kita ingin melakukan perulangan beberapa kali tetapi tidak membutuhkan nilai dari setiap iterasi.

Dalam kondisi seperti ini, Python biasanya menggunakan `_` sebagai nama variabel.

Contoh:

```python
for _ in range(5):
    print("Kirim email")
```

Output:

```text
Kirim email
Kirim email
Kirim email
Kirim email
Kirim email
```

Penggunaan `_` merupakan konvensi yang menunjukkan bahwa nilai iterasi tidak digunakan.

---

## 6. Mengubah `range()` Menjadi List

`range()` menghasilkan sebuah **range object**, bukan list.

Jika membutuhkan list angka, kita dapat menggunakan fungsi `list()`:

```python
angka_list = list(range(10))

print(angka_list)
```

Output:

```text
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Contoh lainnya:

```python
angka_list = list(range(1, 6))

print(angka_list)
```

Output:

```text
[1, 2, 3, 4, 5]
```

---

## 7. Aturan `start`, `stop`, dan `step`

Secara umum, `range()` memiliki tiga parameter:

```python
range(start, stop, step)
```

| Parameter | Fungsi |
|---|---|
| `start` | Menentukan angka awal |
| `stop` | Menentukan batas akhir, tetapi tidak termasuk |
| `step` | Menentukan jarak antar angka |

Contoh:

```python
range(2, 10, 2)
```

menghasilkan:

```text
2, 4, 6, 8
```

---

## 8. Pola Umum dalam `for loop`

Salah satu penggunaan `range()` yang paling umum adalah mengulang suatu proses berdasarkan jumlah tertentu.

Contoh:

```python
for i in range(3):
    print("Hello")
```

Output:

```text
Hello
Hello
Hello
```

Nilai `i` tidak harus digunakan jika program hanya membutuhkan pengulangan.

---

## Poin Penting

Beberapa hal yang perlu diingat tentang `range()`:

1. `range()` menghasilkan **range object** yang bersifat iterable.
2. Jika hanya menggunakan satu argumen, perulangan dimulai dari `0`.
3. Nilai `stop` selalu **eksklusif**.
4. `step` digunakan untuk menentukan jarak antar angka.
5. `step` negatif dapat digunakan untuk melakukan perulangan mundur.
6. Gunakan `_` jika nilai iterasi tidak diperlukan.
7. Gunakan `list(range(...))` jika ingin mengubah range menjadi list.

---

## Kesimpulan

`range()` merupakan salah satu fungsi yang sangat sering digunakan bersama `for loop`. Dengan memahami `start`, `stop`, dan `step`, kita dapat membuat berbagai pola perulangan tanpa perlu menuliskan angka satu per satu.

Pola dasar yang perlu diingat:

```python
range(stop)

range(start, stop)

range(start, stop, step)
```