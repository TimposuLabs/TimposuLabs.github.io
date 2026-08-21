---
sidebar_position: 15
title: "Break, Continue, & Pass"
---

Dalam perulangan, terkadang kita membutuhkan kontrol tambahan untuk menentukan apakah sebuah loop harus dihentikan, dilewati sebagian, atau dibiarkan tanpa melakukan tindakan tertentu.

Python menyediakan tiga statement yang sering digunakan untuk kebutuhan tersebut:

- `break`
- `continue`
- `pass`

Ketiganya memiliki fungsi yang berbeda dan penting untuk dipahami ketika bekerja dengan `for` maupun `while`.

---

## 1. Statement `break`

`break` digunakan untuk **menghentikan perulangan sepenuhnya**.

Ketika Python menemukan `break`, program langsung keluar dari loop dan melanjutkan eksekusi ke kode setelah loop.

Contoh:

```python
my_list = [1, 2, 3]

for item in my_list:
    if item == 2:
        break

    print(item)
```

Output:

```text
1
```

Ketika `item` bernilai `2`, kondisi `if` terpenuhi sehingga `break` dijalankan.

Perulangan langsung dihentikan sehingga angka `3` tidak pernah diproses.

---

## 2. `break` pada `while` Loop

`break` juga dapat digunakan pada `while`.

Contoh:

```python
i = 0

while i < 10:
    if i == 5:
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
```

Ketika `i` mencapai `5`, `break` menghentikan loop.

---

## 3. Penggunaan `break` untuk Pencarian

Salah satu penggunaan umum `break` adalah menghentikan pencarian ketika data yang dicari sudah ditemukan.

Contoh:

```python
numbers = [10, 20, 30, 40, 50]

for number in numbers:
    if number == 30:
        print("Data ditemukan!")
        break
```

Setelah angka `30` ditemukan, tidak perlu melanjutkan pemeriksaan elemen berikutnya.

---

## 4. Statement `continue`

`continue` digunakan untuk **melewati sisa kode pada iterasi saat ini** dan langsung melanjutkan ke iterasi berikutnya.

Berbeda dengan `break`, `continue` **tidak menghentikan loop**.

Contoh:

```python
my_list = [1, 2, 3]

for item in my_list:
    if item == 2:
        continue

    print(item)
```

Output:

```text
1
3
```

Ketika `item` bernilai `2`, `continue` dijalankan.

Akibatnya, baris:

```python
print(item)
```

dilewati untuk iterasi tersebut.

Loop kemudian melanjutkan ke angka `3`.

---

## 5. Contoh `continue` untuk Melewati Nilai Tertentu

Misalnya kita ingin mencetak angka 1 sampai 10 tetapi tidak ingin mencetak angka genap.

```python
for number in range(1, 11):
    if number % 2 == 0:
        continue

    print(number)
```

Output:

```text
1
3
5
7
9
```

Ketika angka genap ditemukan, `continue` membuat Python melewati proses pada iterasi tersebut.

---

## 6. Statement `pass`

`pass` berbeda dengan `break` dan `continue`.

`pass` adalah **statement kosong** yang tidak melakukan tindakan apa pun ketika dijalankan.

Contoh:

```python
my_list = [1, 2, 3]

for item in my_list:
    pass
```

Program tetap dapat dijalankan tanpa menghasilkan output.

---

## 7. Mengapa `pass` Dibutuhkan?

Python membutuhkan setidaknya satu statement di dalam sebuah blok kode.

Contoh berikut akan menghasilkan error:

```python
for item in my_list:
```

Python mengharapkan adanya kode yang berada di dalam blok `for`.

Jika kita belum menentukan kode yang akan ditulis, kita dapat menggunakan `pass` sebagai placeholder:

```python
for item in my_list:
    pass
```

Dengan demikian, struktur program sudah valid dan dapat dikembangkan kemudian.

---

## 8. `pass` sebagai Placeholder

`pass` sering digunakan ketika kita sedang membuat struktur program tetapi belum ingin memberikan implementasi.

Contoh:

```python
if user_is_logged_in:
    pass
else:
    print("Silakan login terlebih dahulu.")
```

Nantinya, `pass` dapat diganti dengan logika sebenarnya.

Contoh:

```python
if user_is_logged_in:
    print("Selamat datang!")
else:
    print("Silakan login terlebih dahulu.")
```

---

## 9. Perbedaan `break`, `continue`, dan `pass`

| Statement | Fungsi | Dampak terhadap Loop |
|---|---|---|
| `break` | Menghentikan loop | Keluar dari loop sepenuhnya |
| `continue` | Melewati iterasi saat ini | Melanjutkan ke iterasi berikutnya |
| `pass` | Tidak melakukan tindakan | Loop tetap berjalan seperti biasa |

---

## 10. Perbandingan dengan Contoh

Perhatikan ketiga statement berikut:

```python
for number in range(1, 6):
    if number == 3:
        break

    print(number)
```

Output:

```text
1
2
```

`break` menghentikan loop ketika angka `3` ditemukan.

---

Dengan `continue`:

```python
for number in range(1, 6):
    if number == 3:
        continue

    print(number)
```

Output:

```text
1
2
4
5
```

`continue` hanya melewati angka `3`, tetapi loop tetap berjalan.

---

Dengan `pass`:

```python
for number in range(1, 6):
    if number == 3:
        pass

    print(number)
```

Output:

```text
1
2
3
4
5
```

`pass` tidak mengubah alur perulangan.

---

## Poin Penting

1. `break` digunakan untuk **menghentikan seluruh loop**.
2. `continue` digunakan untuk **melewati iterasi saat ini**.
3. `pass` tidak melakukan tindakan apa pun.
4. `break` dan `continue` dapat digunakan pada `for` maupun `while`.
5. `pass` dapat digunakan sebagai placeholder pada loop, conditional, function, class, dan struktur kode lainnya.
6. Gunakan `break` ketika proses tidak perlu dilanjutkan.
7. Gunakan `continue` ketika hanya iterasi tertentu yang ingin dilewati.
8. Gunakan `pass` ketika struktur kode membutuhkan statement tetapi implementasinya belum tersedia.

---

## Kesimpulan

Ketiga statement tersebut memberikan kontrol yang berbeda terhadap alur program:

```text
break     → keluar dari loop
continue  → lanjut ke iterasi berikutnya
pass      → tidak melakukan apa-apa
```

Memahami perbedaan ketiganya akan membantu kita membuat perulangan yang lebih fleksibel dan mengontrol alur eksekusi program dengan lebih tepat.