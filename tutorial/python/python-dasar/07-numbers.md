---
sidebar_position: 7
title: "Numbers"
---

## Integer dan Float

Dalam Python, angka/numbers memiliki beberapa tipe data. Dua tipe data angka yang paling fundamental dan paling sering digunakan adalah **`int`** dan **`float`**.

Memahami kedua tipe data ini penting karena hampir setiap program membutuhkan operasi terhadap angka, seperti menghitung jumlah, harga, nilai, jarak, waktu, persentase, dan berbagai data numerik lainnya.

---

## 1. Integer (`int`)

**Integer** atau `int` adalah tipe data yang digunakan untuk menyimpan **bilangan bulat**, yaitu angka yang tidak memiliki bagian desimal.

Integer dapat berupa:

- Bilangan positif.
- Bilangan negatif.
- Nol.

Contohnya:

```python
umur = 20
suhu = -5
jumlah = 100
nilai = 0
```

Semua nilai tersebut merupakan integer.

Kita dapat menggunakan fungsi `type()` untuk mengetahui tipe data sebuah nilai:

```python
print(type(6))
print(type(-2))
print(type(0))
```

Hasilnya:

```text
<class 'int'>
<class 'int'>
<class 'int'>
```

---

## 2. Floating Point (`float`)

**Floating point** atau `float` adalah tipe data yang digunakan untuk menyimpan angka yang memiliki bagian desimal.

Contohnya:

```python
tinggi = 173.5
harga = 25000.50
nilai = 3.14
suhu = -0.5
```

Angka yang memiliki `.0` juga tetap dianggap sebagai `float`.

Contohnya:

```python
angka = 5.0
```

Nilai tersebut bukan `int`, melainkan `float`.

Kita dapat memeriksanya menggunakan `type()`:

```python
print(type(0.5))
print(type(3.14))
print(type(5.0))
```

Hasilnya:

```text
<class 'float'>
<class 'float'>
<class 'float'>
```

---

## 3. Perbedaan `int` dan `float`

Perbedaan paling sederhana antara `int` dan `float` adalah keberadaan bagian desimal.

| Tipe | Contoh | Keterangan |
| --- | --- | --- |
| `int` | `10` | Bilangan bulat |
| `int` | `-5` | Bilangan bulat negatif |
| `int` | `0` | Bilangan nol |
| `float` | `10.5` | Bilangan dengan desimal |
| `float` | `-3.14` | Bilangan desimal negatif |
| `float` | `5.0` | Tetap merupakan float |

Perhatikan bahwa:

```python
10
```

dan:

```python
10.0
```

memiliki nilai numerik yang sama secara matematis, tetapi memiliki **tipe data yang berbeda**.

```text
10    → int
10.0  → float
```

---

## 4. Operasi `int` dan `float`

Python dapat melakukan operasi antara `int` dan `float`.

Ketika `int` dan `float` digunakan dalam operasi tertentu, Python dapat menghasilkan nilai bertipe `float`.

Contohnya:

```python
hasil = 20 + 1.1

print(hasil)
print(type(hasil))
```

Hasil:

```text
21.1
<class 'float'>
```

Dengan demikian:

```text
int + float
     ↓
   float
```

Hal ini penting untuk dipahami ketika melakukan perhitungan numerik.

---

## 5. Operasi Aritmatika Dasar

Python menyediakan berbagai operator aritmatika yang dapat digunakan untuk melakukan perhitungan.

### Penjumlahan

Operator penjumlahan menggunakan:

```text
+
```

Contoh:

```python
hasil = 2 + 4

print(hasil)
```

Hasil:

```text
6
```

---

### Pengurangan

Operator pengurangan menggunakan:

```text
-
```

Contoh:

```python
hasil = 2 - 4

print(hasil)
```

Hasil:

```text
-2
```

---

### Perkalian

Operator perkalian menggunakan:

```text
*
```

Contoh:

```python
hasil = 2 * 4

print(hasil)
```

Hasil:

```text
8
```

---

### Pembagian

Operator pembagian menggunakan:

```text
/
```

Contoh:

```python
hasil = 2 / 4

print(hasil)
```

Hasil:

```text
0.5
```

Pada Python 3, operator `/` menghasilkan **float**, termasuk ketika hasil pembagian secara matematis merupakan bilangan bulat.

Contohnya:

```python
hasil = 10 / 2

print(hasil)
print(type(hasil))
```

Hasil:

```text
5.0
<class 'float'>
```

Jadi:

```text
10 / 2 → 5.0
```

bukan:

```text
10 / 2 → 5
```

---

## 6. Pangkat

Operator pangkat menggunakan:

```text
**
```

Contoh:

```python
hasil = 2 ** 3

print(hasil)
```

Hasil:

```text
8
```

Karena:

```text
2³ = 2 × 2 × 2 = 8
```

Contoh lainnya:

```python
print(5 ** 2)
print(10 ** 3)
```

Hasil:

```text
25
1000
```

---

## 7. Pembagian Bulat

Python menyediakan operator `//` untuk melakukan **floor division** atau pembagian dengan pembulatan ke bawah.

Contohnya:

```python
hasil = 5 // 4

print(hasil)
```

Hasil:

```text
1
```

Perbandingannya:

```python
print(5 / 4)
print(5 // 4)
```

Hasil:

```text
1.25
1
```

Operator `/` menghasilkan pembagian biasa, sedangkan `//` menghasilkan hasil pembagian yang dibulatkan ke bawah.

### Catatan Penting

"Pembulatan ke bawah" pada `//` berarti menuju nilai yang lebih kecil, bukan sekadar menghilangkan angka desimal.

Contohnya:

```python
print(5 // 2)
print(-5 // 2)
```

Hasil:

```text
2
-3
```

---

## 8. Modulo

Operator modulo menggunakan:

```text
%
```

Modulo digunakan untuk mendapatkan **sisa hasil pembagian**.

Contohnya:

```python
hasil = 6 % 4

print(hasil)
```

Hasil:

```text
2
```

Karena:

```text
6 ÷ 4 = 1 sisa 2
```

Contoh lainnya:

```python
print(10 % 3)
print(20 % 5)
print(15 % 4)
```

Hasil:

```text
1
0
3
```

Modulo sering digunakan untuk berbagai kebutuhan, misalnya mengecek apakah sebuah angka merupakan bilangan genap atau ganjil.

Contoh:

```python
angka = 10

print(angka % 2)
```

Jika hasilnya `0`, angka tersebut habis dibagi 2.

---

## 9. Ringkasan Operator Aritmatika

| Operasi | Operator | Contoh | Hasil |
| --- | --- | --- | --- |
| Penjumlahan | `+` | `2 + 4` | `6` |
| Pengurangan | `-` | `2 - 4` | `-2` |
| Perkalian | `*` | `2 * 4` | `8` |
| Pembagian | `/` | `2 / 4` | `0.5` |
| Pangkat | `**` | `2 ** 3` | `8` |
| Pembagian bulat | `//` | `5 // 4` | `1` |
| Modulo | `%` | `6 % 4` | `2` |

---

## 10. Fungsi `print()`

Fungsi `print()` digunakan untuk menampilkan nilai atau hasil ekspresi ke layar.

Contohnya:

```python
print(2 + 4)
```

Hasil:

```text
6
```

Kita juga dapat menampilkan operasi lainnya:

```python
print(10 - 3)
print(5 * 4)
print(10 / 2)
```

Hasil:

```text
7
20
5.0
```

`print()` akan sering digunakan ketika belajar Python karena membantu kita melihat hasil dari program yang sedang dibuat.

---

## 11. Fungsi `type()`

Fungsi `type()` digunakan untuk mengetahui tipe data dari sebuah nilai atau expression.

Contohnya:

```python
print(type(10))
```

Hasil:

```text
<class 'int'>
```

Sedangkan:

```python
print(type(10.5))
```

Hasil:

```text
<class 'float'>
```

Fungsi `type()` juga dapat digunakan terhadap hasil operasi.

Contohnya:

```python
print(type(2 + 4))
print(type(2 / 4))
```

Hasil:

```text
<class 'int'>
<class 'float'>
```

Hal ini membantu kita memahami bagaimana Python menentukan tipe data dari suatu hasil operasi.

---

## 12. Contoh Penggunaan dalam Program

`int` dan `float` banyak digunakan dalam program sehari-hari.

Misalnya menghitung harga:

```python
harga = 15000
jumlah = 3

total = harga * jumlah

print(total)
```

Hasil:

```text
45000
```

Contoh lainnya menggunakan `float`:

```python
harga = 15000.5
jumlah = 3

total = harga * jumlah

print(total)
```

Hasil:

```text
45001.5
```

Dalam aplikasi nyata, angka dapat digunakan untuk berbagai kebutuhan seperti:

- Harga barang.
- Jumlah produk.
- Nilai siswa.
- Berat badan.
- Tinggi badan.
- Jarak.
- Kecepatan.
- Persentase.
- Koordinat.
- Perhitungan keuangan.

---

## 13. Gambaran Sederhana

Secara sederhana, kita dapat memahami `int` dan `float` seperti berikut:

```text
                 Angka
                   │
          ┌────────┴────────┐
          │                 │
         int              float
          │                 │
    Bilangan bulat    Bilangan desimal
          │                 │
       10, -5, 0       3.14, 0.5, 2.0
```

---

## Kesimpulan

`int` dan `float` merupakan dua tipe data numerik fundamental dalam Python.

**Integer (`int`)** digunakan untuk menyimpan bilangan bulat, sedangkan **float (`float`)** digunakan untuk menyimpan bilangan yang memiliki bagian desimal.

Python menyediakan berbagai operator untuk melakukan operasi matematika, seperti:

- `+` untuk penjumlahan.
- `-` untuk pengurangan.
- `*` untuk perkalian.
- `/` untuk pembagian.
- `**` untuk pangkat.
- `//` untuk floor division.
- `%` untuk modulo.

Selain itu, dua fungsi yang sangat berguna ketika mempelajari angka adalah:

- `print()` untuk menampilkan hasil.
- `type()` untuk mengetahui tipe data.

Memahami `int`, `float`, dan operator aritmatika merupakan fondasi penting sebelum melanjutkan ke konsep Python berikutnya seperti **variable, operator perbandingan, Boolean, dan conditional statement**.