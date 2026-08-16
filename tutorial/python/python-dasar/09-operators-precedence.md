---
sidebar_position: 09
title: "Operator Precedence"
---

**Operator Precedence** atau **urutan prioritas operator** adalah aturan yang menentukan operator mana yang akan dievaluasi terlebih dahulu ketika sebuah expression memiliki beberapa operator.

Konsep ini mirip dengan aturan matematika seperti **BODMAS** atau **PEMDAS**.

Memahami operator precedence penting agar kita dapat mengetahui hasil dari sebuah expression tanpa harus menebak urutan eksekusinya.

---

## 1. Urutan Prioritas Operator

Secara umum, beberapa operator aritmatika Python memiliki urutan prioritas dari yang paling tinggi hingga paling rendah sebagai berikut:

| Prioritas | Operator | Keterangan |
| --- | --- | --- |
| 1 | `()` | Parentheses / Kurung |
| 2 | `**` | Pangkat |
| 3 | `*`, `/`, `//`, `%` | Perkalian, pembagian, floor division, modulo |
| 4 | `+`, `-` | Penjumlahan dan pengurangan |

Semakin tinggi prioritasnya, semakin dahulu operator tersebut dievaluasi.

Secara sederhana:

```text
()
 ↓
**
 ↓
*  /  //  %
 ↓
+  -
```

---

## 2. Parentheses `()`

Tanda kurung memiliki prioritas paling tinggi dalam expression aritmatika.

Operasi yang berada di dalam kurung akan dievaluasi terlebih dahulu.

Contohnya:

```python
print((20 - 3) * 4)
```

Python akan mengevaluasi:

```text
20 - 3
```

terlebih dahulu.

Hasilnya:

```text
17
```

Kemudian:

```text
17 * 4
```

Hasil akhirnya:

```text
68
```

---

## 3. Exponentiation `**`

Operator `**` digunakan untuk melakukan perpangkatan.

Operator ini memiliki prioritas lebih tinggi dibandingkan perkalian, pembagian, penjumlahan, dan pengurangan.

Contohnya:

```python
print(2 + 3 ** 2)
```

Python akan mengevaluasi perpangkatan terlebih dahulu:

```text
3 ** 2 = 9
```

Kemudian:

```text
2 + 9 = 11
```

Hasil:

```text
11
```

---

## 4. Perkalian, Pembagian, Floor Division, dan Modulo

Operator berikut memiliki tingkat prioritas yang sama:

```text
*
/
//
%
```

Jika terdapat beberapa operator dengan tingkat prioritas yang sama, evaluasi dilakukan dari **kiri ke kanan**.

Contohnya:

```python
print(20 / 5 * 2)
```

Python mengevaluasi dari kiri ke kanan:

```text
20 / 5 = 4
4 * 2 = 8
```

Hasil:

```text
8
```

Hal yang sama berlaku untuk operator `*`, `/`, `//`, dan `%`.

---

## 5. Penjumlahan dan Pengurangan

Operator:

```text
+
-
```

memiliki prioritas yang lebih rendah dibandingkan perkalian, pembagian, perpangkatan, dan operator sejenisnya.

Jika terdapat beberapa operator dengan tingkat prioritas yang sama, evaluasi dilakukan dari kiri ke kanan.

Contohnya:

```python
print(20 - 5 + 2)
```

Evaluasi dilakukan:

```text
20 - 5 = 15
15 + 2 = 17
```

Hasil:

```text
17
```

---

## 6. Contoh Tanpa Kurung

Perhatikan expression berikut:

```python
print(20 - 3 * 4)
```

Jika kita mengikuti urutan penulisan dari kiri ke kanan, mungkin kita mengira operasi `20 - 3` dilakukan terlebih dahulu.

Namun, Python mengikuti **operator precedence**.

Perkalian memiliki prioritas lebih tinggi daripada pengurangan.

Maka prosesnya:

```text
3 * 4 = 12
20 - 12 = 8
```

Hasil:

```text
8
```

---

## 7. Mengubah Urutan dengan Kurung

Jika kita ingin operasi pengurangan dilakukan terlebih dahulu, kita dapat menggunakan tanda kurung.

Contohnya:

```python
print((20 - 3) * 4)
```

Python akan melakukan:

```text
20 - 3 = 17
```

Kemudian:

```text
17 * 4 = 68
```

Hasil:

```text
68
```

Perhatikan perbedaannya:

```python
print(20 - 3 * 4)
```

Hasil:

```text
8
```

Sedangkan:

```python
print((20 - 3) * 4)
```

Hasil:

```text
68
```

Tanda kurung dapat mengubah urutan evaluasi expression.

---

## 8. Contoh Expression yang Lebih Kompleks

Perhatikan expression berikut:

```python
print((20 - 3) + 2 ** 2)
```

Terdapat beberapa operator di dalam expression tersebut.

Python akan mengikuti prioritas operator.

### Langkah 1 - Kurung

```text
20 - 3 = 17
```

### Langkah 2 - Pangkat

```text
2 ** 2 = 4
```

### Langkah 3 - Penjumlahan

```text
17 + 4 = 21
```

Hasil akhirnya:

```text
21
```

---

## 9. Mengapa Operator Precedence Penting?

Operator precedence penting karena sebuah expression dapat memiliki beberapa operator sekaligus.

Tanpa memahami prioritas operator, kita mungkin salah memperkirakan hasil dari sebuah expression.

Contohnya:

```python
hasil = 10 + 5 * 2
```

Perkalian dilakukan terlebih dahulu:

```text
5 * 2 = 10
10 + 10 = 20
```

Jadi hasilnya:

```text
20
```

Bukan:

```text
30
```

Jika kita memang ingin penjumlahan dilakukan terlebih dahulu, gunakan kurung:

```python
hasil = (10 + 5) * 2
```

Hasil:

```text
30
```

---

## 10. Gunakan Kurung untuk Memperjelas Kode

Walaupun kita sudah memahami operator precedence, penggunaan tanda kurung tetap sangat disarankan ketika expression menjadi kompleks.

Contohnya:

```python
hasil = (harga * jumlah) + biaya_pengiriman
```

Dibandingkan expression yang lebih sulit dibaca:

```python
hasil = harga * jumlah + biaya_pengiriman
```

Keduanya dapat menghasilkan hasil yang sama, tetapi tanda kurung dapat membuat maksud programmer lebih jelas.

> **Kode yang benar belum tentu kode yang mudah dibaca.**

Dalam pengembangan software, **readability** juga merupakan bagian penting dari kualitas kode.

---

## 11. Ringkasan Operator Precedence

Urutan sederhana yang perlu diingat:

```text
1. ()
2. **
3. *, /, //, %
4. +, -
```

Atau dapat diingat sebagai:

```text
Parentheses
     ↓
Exponentiation
     ↓
Multiplication / Division
     ↓
Addition / Subtraction
```

Jika operator memiliki tingkat prioritas yang sama, secara umum evaluasi dilakukan dari **kiri ke kanan**.

---

## Kesimpulan

**Operator Precedence** menentukan urutan evaluasi operator dalam sebuah expression.

Urutan dasar operator aritmatika Python adalah:

1. `()` - kurung.
2. `**` - perpangkatan.
3. `*`, `/`, `//`, `%` - perkalian, pembagian, floor division, dan modulo.
4. `+`, `-` - penjumlahan dan pengurangan.

Contoh:

```python
print(20 - 3 * 4)
```

menghasilkan:

```text
8
```

Sedangkan:

```python
print((20 - 3) * 4)
```

menghasilkan:

```text
68
```

Hal penting yang perlu diingat:

:::tip
**Gunakan tanda kurung ketika ingin mengubah urutan evaluasi atau ketika tanda kurung membuat maksud kode menjadi lebih jelas.**
:::