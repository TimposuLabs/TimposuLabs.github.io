---
sidebar_position: 13
title: "While Loops"
---

`while` loop digunakan untuk menjalankan blok kode **selama suatu kondisi bernilai `True`**.

Berbeda dengan `for` loop yang umumnya digunakan untuk melakukan iterasi terhadap sebuah iterable, `while` loop lebih cocok digunakan ketika jumlah perulangan belum diketahui secara pasti dan bergantung pada suatu kondisi.

---

## 1. Konsep Dasar `while` Loop

Sintaks dasar:

```python
while kondisi:
    # kode yang dijalankan
```

Contoh:

```python
i = 0

while i < 5:
    print(f"Iterasi ke-{i}")
    i += 1
```

Output:

```text
Iterasi ke-0
Iterasi ke-1
Iterasi ke-2
Iterasi ke-3
Iterasi ke-4
```

Pada contoh tersebut, Python akan terus menjalankan blok kode selama `i < 5` bernilai `True`.

Setelah `i` mencapai `5`, kondisi menjadi `False` sehingga perulangan berhenti.

---

## 2. Memperbarui Variabel Kontrol

Salah satu hal penting dalam `while` loop adalah memastikan kondisi pada akhirnya menjadi `False`.

Perhatikan:

```python
i = 0

while i < 5:
    print(i)
    i += 1
```

Baris:

```python
i += 1
```

mengubah nilai `i` pada setiap iterasi.

Jika baris tersebut tidak ada:

```python
i = 0

while i < 5:
    print(i)
```

nilai `i` akan tetap `0`, sehingga kondisi `i < 5` selalu bernilai `True`.

Akibatnya, program akan mengalami **infinite loop**.

---

## 3. Mengolah List dengan `while` Loop

`while` loop juga dapat digunakan untuk mengakses elemen list berdasarkan indeks.

Contoh:

```python
my_list = [1, 2, 3, 4, 5]

i = 0

while i < len(my_list):
    print(f"Item pada indeks {i}: {my_list[i]}")
    i += 1
```

Output:

```text
Item pada indeks 0: 1
Item pada indeks 1: 2
Item pada indeks 2: 3
Item pada indeks 3: 4
Item pada indeks 4: 5
```

Pada contoh tersebut:

- `i` digunakan sebagai indeks.
- `len(my_list)` menentukan batas perulangan.
- `my_list[i]` mengambil elemen berdasarkan indeks.
- `i += 1` berpindah ke indeks berikutnya.

---

## 4. Menggunakan `break`

`break` digunakan untuk **menghentikan perulangan secara langsung**, meskipun kondisi `while` masih bernilai `True`.

Contoh:

```python
i = 0

while i < 10:
    if i == 5:
        print("Loop dihentikan oleh break pada angka 5")
        break

    print(i)
    i += 1
```

Output:

```text
0
1
2
3
4
Loop dihentikan oleh break pada angka 5
```

Ketika `i` bernilai `5`, `break` dijalankan sehingga perulangan langsung berhenti.

---

## 5. Menggunakan `continue`

`continue` digunakan untuk **melewati iterasi saat ini** dan melanjutkan ke iterasi berikutnya.

Contoh:

```python
i = 0

while i < 6:
    i += 1

    if i == 3:
        continue

    print(i)
```

Output:

```text
1
2
4
5
6
```

Ketika `i` bernilai `3`, Python menjalankan `continue`. Perintah `print(i)` pada iterasi tersebut tidak dijalankan.

### Perhatikan Posisi `i += 1`

Pada `while` loop, penempatan perubahan variabel kontrol sangat penting.

Contoh berikut dapat menyebabkan infinite loop:

```python
i = 0

while i < 6:
    if i == 3:
        continue

    i += 1
```

Ketika `i` mencapai `3`, `continue` dijalankan sebelum `i += 1`, sehingga `i` akan tetap `3` selamanya.

---

## 6. `else` pada `while` Loop

Python memungkinkan penggunaan `else` setelah `while`.

Blok `else` akan dijalankan ketika loop selesai **secara normal**, yaitu ketika kondisi `while` menjadi `False`.

Contoh:

```python
i = 0

while i < 3:
    print(i)
    i += 1
else:
    print("Loop selesai tanpa ada break!")
```

Output:

```text
0
1
2
Loop selesai tanpa ada break!
```

Namun, jika loop dihentikan menggunakan `break`, blok `else` tidak dijalankan.

Contoh:

```python
i = 0

while i < 5:
    if i == 3:
        break

    print(i)
    i += 1
else:
    print("Loop selesai!")
```

Output:

```text
0
1
2
```

Karena loop dihentikan oleh `break`, bagian `else` dilewati.

---

## 7. Infinite Loop yang Terkontrol

Terkadang kita memang ingin membuat loop yang berjalan terus sampai kondisi tertentu terpenuhi.

Pola yang umum digunakan adalah:

```python
while True:
    respon = input("Ketik 'keluar' untuk menghentikan program: ").lower()

    if respon == "keluar":
        print("Program selesai.")
        break
```

Pada contoh tersebut, `while True` membuat loop berjalan terus.

Loop hanya dihentikan ketika pengguna memasukkan:

```text
keluar
```

Kemudian `break` digunakan untuk menghentikan loop.

Pola seperti ini sering digunakan pada:

- Menu aplikasi.
- Program interaktif.
- Validasi input.
- Sistem yang menunggu perintah pengguna.
- Program yang harus terus berjalan sampai kondisi tertentu terpenuhi.

---

## 8. `while` vs `for`

Keduanya sama-sama digunakan untuk melakukan perulangan, tetapi memiliki pola penggunaan yang berbeda.

| `for` Loop | `while` Loop |
|---|---|
| Cocok untuk melakukan iterasi terhadap iterable | Cocok untuk perulangan berdasarkan kondisi |
| Sering digunakan ketika jumlah iterasi diketahui | Sering digunakan ketika jumlah iterasi belum diketahui |
| Contoh: list, tuple, string, `range()` | Contoh: menunggu input pengguna |
| Pengelolaan iterasi biasanya lebih sederhana | Harus memperhatikan perubahan kondisi |

Contoh `for`:

```python
for i in range(5):
    print(i)
```

Contoh `while`:

```python
i = 0

while i < 5:
    print(i)
    i += 1
```

Keduanya dapat menghasilkan output yang sama, tetapi pendekatan dan konteks penggunaannya berbeda.

---

## 9. Kondisi `False` Sejak Awal

`while` memeriksa kondisi **sebelum** menjalankan blok kode.

Contoh:

```python
i = 10

while i < 5:
    print(i)
    i += 1
```

Tidak ada output karena sejak awal:

```text
10 < 5
```

bernilai `False`.

Artinya, blok kode di dalam `while` tidak pernah dijalankan.

---

## Poin Penting

Beberapa hal yang perlu diingat:

1. `while` menjalankan kode selama kondisi bernilai `True`.
2. Kondisi diperiksa sebelum setiap iterasi.
3. Variabel kontrol harus diperbarui agar loop dapat berhenti.
4. `break` digunakan untuk menghentikan loop secara langsung.
5. `continue` digunakan untuk melewati iterasi saat ini.
6. `else` pada `while` dijalankan jika loop selesai secara normal tanpa `break`.
7. `while True` dapat digunakan untuk membuat loop yang berhenti berdasarkan kondisi tertentu.
8. Infinite loop dapat terjadi jika kondisi tidak pernah berubah menjadi `False`.

---

## Kesimpulan

`while` loop merupakan bagian penting dari **control flow** dalam Python. Dengan `while`, program dapat terus melakukan suatu proses selama kondisi tertentu terpenuhi.

Pola dasarnya adalah:

```python
while kondisi:
    # kode yang dijalankan
```

Sedangkan untuk loop yang sengaja berjalan terus sampai kondisi tertentu:

```python
while True:
    # proses

    if kondisi_berhenti:
        break
```

Memahami `while`, `break`, dan `continue` akan menjadi dasar penting sebelum mempelajari pola perulangan yang lebih kompleks dalam Python.