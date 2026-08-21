---
sidebar_position: 10
title: "Latihan: Counter / Sum List"
---

Latihan ini bertujuan untuk melatih penggunaan **`for loop`**, **iterable**, variabel **counter**, dan **augmented assignment** untuk melakukan proses akumulasi nilai.

Pada latihan ini, kita akan membuat program yang menjumlahkan seluruh angka yang terdapat di dalam sebuah list.

---

## Tujuan Latihan

Setelah menyelesaikan latihan ini, Anda diharapkan memahami:

- Cara melakukan iterasi terhadap list menggunakan `for loop`.
- Cara menggunakan variabel sebagai counter atau accumulator.
- Cara menjumlahkan nilai secara bertahap.
- Pentingnya posisi variabel sebelum dan di dalam loop.
- Pentingnya indentasi dalam Python.

---

## Studi Kasus

Diberikan sebuah list yang berisi angka dari `1` sampai `10`:

```python
my_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Tugas kita adalah menghitung jumlah seluruh angka tersebut.

Secara matematis:

```text
1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55
```

Program harus menghasilkan:

```text
55
```

---

## Langkah 1: Membuat List

Pertama, buat list yang berisi angka:

```python
my_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

List tersebut akan menjadi iterable yang diproses oleh `for loop`.

---

## Langkah 2: Membuat Counter

Buat variabel `counter` sebelum perulangan dimulai:

```python
counter = 0
```

Nilai awal `0` digunakan karena belum ada angka yang dijumlahkan.

Variabel `counter` akan menyimpan hasil penjumlahan sementara selama proses perulangan.

---

## Langkah 3: Melakukan Perulangan

Gunakan `for loop` untuk mengambil setiap angka dari list:

```python
for item in my_list:
    counter = counter + item
```

Pada setiap iterasi, nilai `item` ditambahkan ke `counter`.

Prosesnya:

```text
counter = 0

0 + 1  = 1
1 + 2  = 3
3 + 3  = 6
6 + 4  = 10
10 + 5 = 15
15 + 6 = 21
21 + 7 = 28
28 + 8 = 36
36 + 9 = 45
45 + 10 = 55
```

Setelah seluruh elemen selesai diproses, nilai `counter` adalah `55`.

---

## Menggunakan Augmented Assignment

Operasi:

```python
counter = counter + item
```

dapat ditulis lebih singkat menggunakan augmented assignment:

```python
counter += item
```

Sehingga kode perulangan menjadi:

```python
for item in my_list:
    counter += item
```

Kedua bentuk tersebut memiliki tujuan yang sama.

---

## Solusi Lengkap

```python
my_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

counter = 0

for item in my_list:
    counter += item

print(counter)
```

Output:

```text
55
```

---

## Penting: Posisi Counter

Variabel `counter` harus dibuat **sebelum atau di luar loop**.

```python
counter = 0

for item in my_list:
    counter += item
```

Hal ini penting karena `counter` harus mempertahankan hasil penjumlahan dari iterasi sebelumnya.

### Contoh yang Salah

```python
for item in my_list:
    counter = 0
    counter += item
```

Pada kode tersebut, `counter` selalu diatur kembali menjadi `0` setiap kali loop berjalan.

Akibatnya, proses akumulasi tidak berjalan dengan benar.

---

## Penting: Posisi `print()`

Jika tujuan program adalah menampilkan **hasil akhir**, `print()` harus berada di luar loop.

```python
for item in my_list:
    counter += item

print(counter)
```

Perhatikan indentasinya.

### Jika `print()` berada di dalam loop

```python
counter = 0

for item in my_list:
    counter += item
    print(counter)
```

Output akan menjadi:

```text
1
3
6
10
15
21
28
36
45
55
```

Program tersebut tidak salah. Namun, `print()` sekarang menampilkan nilai `counter` pada setiap iterasi.

Jika hanya membutuhkan hasil akhir, letakkan `print()` setelah loop.

---

## Tantangan

Cobalah ubah list menjadi:

```python
my_list = [10, 20, 30, 40, 50]
```

Kemudian gunakan konsep yang sama untuk menghitung jumlah seluruh elemen.

Hasil yang diharapkan:

```text
150
```

---

## Ringkasan

Pada latihan ini kita menggunakan pola dasar **accumulator**:

```python
counter = 0

for item in my_list:
    counter += item
```

Poin penting yang perlu diingat:

1. List merupakan iterable yang dapat diproses menggunakan `for loop`.
2. `counter` digunakan untuk menyimpan hasil akumulasi.
3. `counter` harus diinisialisasi sebelum loop.
4. `counter += item` digunakan untuk menambahkan setiap elemen ke hasil sebelumnya.
5. `print()` di luar loop digunakan untuk menampilkan hasil akhir.
6. Indentasi menentukan apakah sebuah kode berada di dalam atau di luar `for loop`.