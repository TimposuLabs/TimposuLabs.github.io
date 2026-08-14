---
sidebar_position: 21
title: "String Indexes & String Slicing"
---

String dalam Python merupakan **urutan karakter yang teratur**. Setiap karakter di dalam string memiliki posisi yang disebut **index**.

Index digunakan untuk mengakses karakter tertentu, sedangkan **slicing** digunakan untuk mengambil sebagian karakter dari sebuah string.

---

## 1. String Indexing

Setiap karakter dalam string memiliki nomor index.

Hal penting yang perlu diingat adalah **index Python dimulai dari `0`**, bukan dari `1`.

Contohnya:

```python
selfish = "01234567"
```

Posisi setiap karakter dapat digambarkan seperti berikut:

```text
Karakter :  0 1 2 3 4 5 6 7
Index    :  0 1 2 3 4 5 6 7
```

Karakter pertama berada pada index `0`, sedangkan karakter terakhir berada pada index `7`.

---

## 2. Mengakses Karakter dengan Index

Untuk mengambil karakter tertentu, kita dapat menggunakan tanda kurung siku:

```python
selfish = "01234567"

print(selfish[0])
```

Hasil:

```text
0
```

Untuk mengambil karakter pada index `7`:

```python
print(selfish[7])
```

Hasil:

```text
7
```

Secara sederhana:

```text
selfish[0]
       ↑
    index
```

---

## 3. Index Dimulai dari Nol

Kesalahan yang sering terjadi ketika pertama kali mempelajari indexing adalah menganggap karakter pertama berada pada index `1`.

Dalam Python, karakter pertama selalu berada pada index `0`.

Misalnya:

```python
name = "Python"
```

Index-nya:

```text
Karakter :  P  y  t  h  o  n
Index    :  0  1  2  3  4  5
```

Maka:

```python
print(name[0])
```

menghasilkan:

```text
P
```

Sedangkan:

```python
print(name[5])
```

menghasilkan:

```text
n
```

---

## 4. String Slicing

Selain mengambil satu karakter, kita juga dapat mengambil **sebagian karakter** dari sebuah string.

Teknik ini disebut **string slicing**.

Sintaks dasarnya:

```python
variable[start:stop:step]
```

Terdapat tiga bagian:

```text
[start : stop : step]
    │      │      │
    │      │      └── Langkah
    │      └───────── Batas akhir
    └──────────────── Posisi awal
```

Ketiganya memiliki fungsi yang berbeda.

---

## 5. Parameter `start`

`start` menentukan index awal dari slicing.

Index `start` **termasuk** dalam hasil.

Contohnya:

```python
selfish = "01234567"

print(selfish[0:2])
```

Hasil:

```text
01
```

Prosesnya:

```text
Index :    0 1 2 3 4 5 6 7
Karakter:  0 1 2 3 4 5 6 7
           └─┴─┘
```

Slicing dimulai dari index `0`.

---

## 6. Parameter `stop`

`stop` menentukan batas akhir slicing.

Hal penting yang harus diingat:

> **Index `stop` tidak termasuk dalam hasil.**

Contohnya:

```python
selfish = "01234567"

print(selfish[0:2])
```

Hasil:

```text
01
```

Bukan:

```text
012
```

Karena slicing berhenti **sebelum index `2`**.

Secara sederhana:

```text
start → termasuk
stop  → tidak termasuk
```

---

## 7. Parameter `step`

`step` menentukan berapa banyak index yang dilewati ketika mengambil karakter.

Contohnya:

```python
selfish = "01234567"

print(selfish[0:8:2])
```

Hasil:

```text
0246
```

Python mengambil karakter dengan langkah `2`:

```text
0 → 2 → 4 → 6
```

Penjelasan:

- `start (0)`: Dimulai dari index `0` (yaitu karakter `'0'`).
- `stop (8)`: Berhenti sebelum index `8` (berarti mengambil hingga karakter terakhir, yaitu index `7`).
- `step (2)`: Mengambil karakter dengan melangkah sebanyak `2` index setiap kali pengambilan.

Proses Pengambilan Karakter:

- Langkah 1: Ambil index `0` ➡️ `'0'`
- Langkah 2: Melangkah 2 kali ke index `2` ➡️ `'2'`
- Langkah 3: Melangkah 2 kali ke index `4` ➡️ `'4'`
- Langkah 4: Melangkah 2 kali ke index `6` ➡️ `'6'`
- Hasil akhirnya digabungkan menjadi string `"0246"`.

---

## 8. Slicing Tanpa `step`

Jika `step` tidak ditulis, Python menggunakan nilai default:

```text
step = 1
```

Contohnya:

```python
selfish = "01234567"

print(selfish[0:5])
```

Secara konsep sama dengan:

```python
print(selfish[0:5:1])
```

Keduanya menghasilkan:

```text
01234
```

---

## 9. Mengambil String Sampai Akhir

Kita dapat menghilangkan `stop` jika ingin mengambil karakter dari `start` sampai akhir string.

Contohnya:

```python
selfish = "01234567"

print(selfish[1:])
```

Hasil:

```text
1234567
```

Artinya:

```text
Mulai dari index 1
        ↓
Ambil sampai akhir
```

---

## 10. Mengambil String dari Awal

Kita juga dapat menghilangkan `start` jika ingin mengambil string dari awal.

Contohnya:

```python
selfish = "01234567"

print(selfish[:5])
```

Hasil:

```text
01234
```

Secara konsep:

```python
selfish[0:5]
```

sama dengan:

```python
selfish[:5]
```

Karena ketika `start` tidak ditentukan, Python menggunakan awal string.

---

## 11. Mengambil Seluruh String

Kita dapat menggunakan:

```python
selfish[:]
```

untuk mengambil seluruh string.

Contohnya:

```python
selfish = "01234567"

print(selfish[:])
```

Hasil:

```text
01234567
```

Kita juga dapat menuliskan:

```python
selfish[::1]
```

Hasilnya sama:

```text
01234567
```

---

## 12. Ringkasan Slicing Dasar

Dengan:

```python
selfish = "01234567"
```

beberapa contoh slicing:

| Expression | Hasil | Keterangan |
| --- | --- | --- |
| `selfish[0:2]` | `"01"` | Index `0` sampai sebelum `2` |
| `selfish[0:8:2]` | `"0246"` | Mengambil setiap 2 langkah |
| `selfish[1:]` | `"1234567"` | Dari index `1` sampai akhir |
| `selfish[:5]` | `"01234"` | Dari awal sampai sebelum `5` |
| `selfish[:]` | `"01234567"` | Mengambil seluruh string |
| `selfish[::1]` | `"01234567"` | Seluruh string dengan step `1` |

---

## 13. Negative Indexing

Python juga mendukung **negative indexing**.

Negative indexing memungkinkan kita mengakses karakter mulai dari **bagian belakang string**.

Contohnya:

```python
selfish = "01234567"
```

Index positif:

```text
Karakter :  0 1 2 3 4 5 6 7
Index    :  0 1 2 3 4 5 6 7
```

Index negatif:

```text
Karakter :  0  1  2  3  4  5  6  7
Index    : -8 -7 -6 -5 -4 -3 -2 -1
```

Dengan demikian:

```text
-1 → karakter terakhir
-2 → karakter kedua dari belakang
-3 → karakter ketiga dari belakang
```

---

## 14. Mengakses dengan Negative Index

Contohnya:

```python
selfish = "01234567"

print(selfish[-1])
```

Hasil:

```text
7
```

Karena `-1` menunjuk karakter terakhir.

Contoh:

```python
print(selfish[-2])
```

Hasil:

```text
6
```

Jadi:

```text
selfish[-1] → "7"
selfish[-2] → "6"
selfish[-3] → "5"
```

---

## 15. Reverse String

Negative indexing juga dapat digunakan bersama slicing.

Salah satu teknik yang sangat populer di Python untuk membalikkan string adalah:

```python
[::-1]
```

Contohnya:

```python
selfish = "01234567"

print(selfish[::-1])
```

Hasil:

```text
76543210
```

Mari kita lihat:

```python
selfish[::-1]
```

Bagian-bagiannya:

```text
start : stop : step
   ↓      ↓      ↓
 kosong  kosong  -1
```

Karena `step` bernilai `-1`, Python membaca string dari belakang ke depan.

---

## 16. Memahami `[::-1]`

Expression:

```python
selfish[::-1]
```

dapat dipahami sebagai:

```text
Mulai dari akhir
      ↓
Bergerak mundur
      ↓
Ambil setiap karakter
      ↓
Sampai awal string
```

Contohnya:

```text
01234567
       ↓
76543210
```

Teknik ini sering digunakan untuk membalikkan string.

---

## 17. Contoh dengan String Biasa

Indexing dan slicing tidak hanya berlaku untuk angka sebagai karakter.

Contohnya:

```python
language = "Python"
```

Index:

```text
Karakter :  P  y  t  h  o  n
Index    :  0  1  2  3  4  5
```

Mengambil karakter:

```python
print(language[0])
```

Hasil:

```text
P
```

Mengambil beberapa karakter:

```python
print(language[0:3])
```

Hasil:

```text
Pyt
```

Membalikkan string:

```python
print(language[::-1])
```

Hasil:

```text
nohtyP
```

---

## 18. String Tidak Berubah Saat Di-slicing

Slicing menghasilkan string baru dan tidak mengubah string asli.

Contohnya:

```python
language = "Python"

result = language[0:3]

print(result)
print(language)
```

Hasil:

```text
Pyt
Python
```

Variable `language` tetap memiliki nilai:

```text
Python
```

Sementara hasil slicing disimpan dalam variable `result`.

---

## 19. Kesalahan Index

Jika kita mencoba mengakses index yang berada di luar jangkauan string menggunakan indexing langsung, Python akan menghasilkan error.

Contohnya:

```python
language = "Python"

print(language[10])
```

Karena string hanya memiliki index `0` sampai `5`, Python akan menghasilkan:

```text
IndexError
```

Karena itu, penting untuk memperhatikan panjang string dan index yang digunakan.

---

## 20. Cara Mudah Mengingat Slicing

Sintaks:

```python
string[start:stop:step]
```

dapat diingat sebagai:

```text
start
  ↓
Mulai dari mana?

stop
  ↓
Berhenti sebelum mana?

step
  ↓
Melangkah berapa?
```

Contohnya:

```python
text[1:7:2]
```

berarti:

```text
Mulai index 1
     ↓
Berhenti sebelum index 7
     ↓
Ambil setiap 2 langkah
```

---

## Kesimpulan

**String indexing** digunakan untuk mengakses karakter tertentu dalam string, sedangkan **string slicing** digunakan untuk mengambil sebagian karakter dari string.

Index Python dimulai dari `0`.

```text
P y t h o n
0 1 2 3 4 5
```

Untuk indexing:

```python
text[0]
```

Untuk slicing:

```python
text[start:stop:step]
```

Hal penting yang perlu diingat:

- Index dimulai dari `0`.
- `start` termasuk dalam hasil.
- `stop` tidak termasuk dalam hasil.
- `step` menentukan jarak pengambilan karakter.
- Index negatif dihitung dari belakang.
- `-1` adalah karakter terakhir.
- `[::-1]` dapat digunakan untuk membalikkan string.

Contoh paling penting:

```python
text = "Python"

print(text[0])
print(text[1:4])
print(text[-1])
print(text[::-1])
```

Hasil:

```text
P
yth
n
nohtyP
```

:::info
**Indexing digunakan untuk mengambil karakter tertentu, sedangkan slicing digunakan untuk mengambil bagian tertentu dari sebuah string.**
:::