---
sidebar_position: 17
title: "Latihan: Mencari Duplikasi"
---

Latihan ini bertujuan untuk menggabungkan beberapa konsep Python yang telah dipelajari sebelumnya, khususnya **`list`, `for` loop, kondisi `if`, method `count()`, operator `in`, dan `append()`**.

Pada latihan ini, kita akan membuat program yang dapat menemukan nilai yang muncul lebih dari satu kali dalam sebuah list.

---

### 1. Tujuan Latihan

Program harus mampu:

1. Menerima sebuah list yang memiliki beberapa nilai duplikat.
2. Memeriksa setiap elemen di dalam list.
3. Menentukan apakah sebuah elemen muncul lebih dari satu kali.
4. Menyimpan elemen yang duplikat ke dalam list baru.
5. Memastikan setiap nilai duplikat hanya muncul satu kali pada hasil akhir.

---

### 2. Data yang Digunakan

Gunakan list berikut:

```python
some_list = ['a', 'b', 'c', 'b', 'd', 'm', 'n', 'n']
```

Jika diperhatikan:

- `'a'` muncul 1 kali.
- `'b'` muncul 2 kali.
- `'c'` muncul 1 kali.
- `'d'` muncul 1 kali.
- `'m'` muncul 1 kali.
- `'n'` muncul 2 kali.

Dengan demikian, nilai yang merupakan duplikat adalah:

```text
b
n
```

---

### 3. Membuat List untuk Menyimpan Duplikat

Pertama, buat sebuah list kosong yang akan digunakan untuk menyimpan hasil:

```python
duplicates = []
```

List tersebut awalnya kosong.

Setiap kali ditemukan nilai yang duplikat, nilai tersebut akan dimasukkan ke dalam list menggunakan `append()`.

---

### 4. Melakukan Iterasi pada List

Gunakan `for` loop untuk memeriksa setiap nilai:

```python
for value in some_list:
    print(value)
```

Program akan memproses setiap elemen di dalam list.

Variabel `value` akan berisi satu elemen pada setiap iterasi.

---

### 5. Memeriksa Jumlah Kemunculan dengan `count()`

Gunakan method `count()` untuk mengetahui berapa kali sebuah nilai muncul:

```python
some_list.count(value)
```

Contohnya:

```python
some_list.count('a')
```

Hasilnya:

```text
1
```

Sedangkan:

```python
some_list.count('b')
```

Hasilnya:

```text
2
```

Karena kita hanya ingin mencari nilai yang muncul lebih dari satu kali, gunakan kondisi:

```python
if some_list.count(value) > 1:
```

---

### 6. Mencegah Duplikat pada Hasil

Ada satu masalah.

Ketika program menemukan `'b'` untuk pertama kali, `'b'` dimasukkan ke dalam `duplicates`.

Ketika program menemukan `'b'` lagi, kondisi `count() > 1` masih bernilai `True`. Jika langsung menggunakan `append()`, `'b'` akan dimasukkan lagi.

Untuk mencegahnya, gunakan operator `not in`:

```python
if value not in duplicates:
```

Artinya:

> Tambahkan `value` hanya jika nilai tersebut belum ada di dalam `duplicates`.

---

### 7. Implementasi Lengkap

```python
some_list = ['a', 'b', 'c', 'b', 'd', 'm', 'n', 'n']

duplicates = []

for value in some_list:
    if some_list.count(value) > 1:
        if value not in duplicates:
            duplicates.append(value)

print(duplicates)
```

Output:

```text
['b', 'n']
```

---

### 8. Memahami Alur Program

Secara sederhana, program melakukan proses berikut:

```text
some_list
    ↓
Ambil satu value
    ↓
Hitung jumlah kemunculan
    ↓
Apakah muncul lebih dari 1 kali?
    ↓
   Ya
    ↓
Apakah sudah ada di duplicates?
    ↓
   Belum
    ↓
Tambahkan ke duplicates
```

Hasil akhirnya:

```python
['b', 'n']
```

---

### 9. Konsep yang Dipraktikkan

Latihan ini menggabungkan beberapa konsep dasar Python:

| Konsep | Fungsi |
|---|---|
| `list` | Menyimpan kumpulan data |
| `for` | Mengiterasi setiap elemen |
| `if` | Memeriksa kondisi |
| `.count()` | Menghitung jumlah kemunculan |
| `in` / `not in` | Memeriksa keberadaan nilai |
| `.append()` | Menambahkan elemen ke list |
| Variabel | Menyimpan data sementara dan hasil |

---

### 10. Tantangan

Coba ubah data menjadi:

```python
some_list = [
    'apple',
    'banana',
    'orange',
    'apple',
    'mango',
    'banana',
    'apple'
]
```

Gunakan logika yang sama untuk menghasilkan:

```text
['apple', 'banana']
```

**Catatan:** Jangan menggunakan `set()` terlebih dahulu. Latihan ini memang ditujukan untuk melatih pemahaman **loop, kondisi, `count()`, `in`, dan `append()`**.