---
sidebar_position: 13
title: "Augmented Assignment Operator"
---

**Augmented Assignment Operator** adalah bentuk singkat atau **shorthand** untuk melakukan operasi terhadap sebuah variable sekaligus menyimpan kembali hasilnya ke variable tersebut.

Operator ini sangat sering digunakan ketika kita ingin memperbarui nilai sebuah variable.

Contohnya, daripada menulis:

```python
some_value = some_value + 2
```

kita dapat menuliskannya secara lebih singkat:

```python
some_value += 2
```

Keduanya memiliki tujuan yang sama untuk operasi tersebut.

---

## 1. Assignment Biasa

Sebelum memahami augmented assignment, kita perlu memahami assignment biasa.

Contohnya:

```python
some_value = 5
```

Kemudian kita ingin menambahkan `2`:

```python
some_value = some_value + 2
```

Prosesnya dapat dipahami sebagai:

```text
Nilai awal
    ↓
some_value = 5

Tambahkan 2
    ↓
5 + 2

Simpan kembali
    ↓
some_value = 7
```

---

## 2. Augmented Assignment

Penulisan tersebut dapat disederhanakan menjadi:

```python
some_value += 2
```

Python akan mengambil nilai `some_value`, melakukan operasi `+ 2`, kemudian menyimpan hasilnya kembali ke `some_value`.

Secara konsep:

```text
some_value += 2

sama dengan:

some_value = some_value + 2
```

---

## 3. Operator Augmented Assignment

Python menyediakan beberapa augmented assignment operator.

| Operasi | Cara Biasa | Augmented Assignment |
| --- | --- | --- |
| Penjumlahan | `x = x + 2` | `x += 2` |
| Pengurangan | `x = x - 2` | `x -= 2` |
| Perkalian | `x = x * 2` | `x *= 2` |
| Pembagian | `x = x / 2` | `x /= 2` |
| Floor Division | `x = x // 2` | `x //= 2` |
| Modulo | `x = x % 2` | `x %= 2` |
| Pangkat | `x = x ** 2` | `x **= 2` |

Pola dasarnya adalah:

```text
variable operator= value
```

Operator berada di sebelah kiri tanda `=`.

---

## 4. Augmented Addition `+=`

Operator `+=` digunakan untuk menambahkan nilai ke variable.

Contohnya:

```python
some_value = 5

some_value += 2

print(some_value)
```

Hasil:

```text
7
```

Secara konsep:

```text
5 + 2 = 7
```

Contoh lainnya:

```python
score = 80

score += 10

print(score)
```

Hasil:

```text
90
```

---

## 5. Augmented Subtraction `-=`

Operator `-=` digunakan untuk mengurangi nilai variable.

Contohnya:

```python
some_value = 10

some_value -= 3

print(some_value)
```

Hasil:

```text
7
```

Secara konsep:

```text
10 - 3 = 7
```

---

## 6. Augmented Multiplication `*=`

Operator `*=` digunakan untuk mengalikan nilai variable.

Contohnya:

```python
some_value = 5

some_value *= 2

print(some_value)
```

Hasil:

```text
10
```

Secara konsep:

```text
5 × 2 = 10
```

---

## 7. Augmented Division `/=`

Operator `/=` digunakan untuk membagi nilai variable.

Contohnya:

```python
some_value = 10

some_value /= 2

print(some_value)
```

Hasil:

```text
5.0
```

Perhatikan bahwa operator `/` pada Python menghasilkan nilai `float`.

---

## 8. Augmented Floor Division `//=`

Operator `//=` digunakan untuk melakukan floor division dan menyimpan hasilnya kembali ke variable.

Contohnya:

```python
some_value = 10

some_value //= 3

print(some_value)
```

Hasil:

```text
3
```

---

## 9. Augmented Modulo `%=`

Operator `%=` digunakan untuk mendapatkan sisa pembagian dan menyimpan hasilnya kembali ke variable.

Contohnya:

```python
some_value = 10

some_value %= 3

print(some_value)
```

Hasil:

```text
1
```

Karena:

```text
10 % 3 = 1
```

---

## 10. Augmented Exponentiation `**=`

Operator `**=` digunakan untuk melakukan perpangkatan sekaligus memperbarui nilai variable.

Contohnya:

```python
some_value = 2

some_value **= 3

print(some_value)
```

Hasil:

```text
8
```

Secara konsep:

```text
2 ** 3 = 8
```

---

## 11. Variable Harus Sudah Memiliki Nilai

Sebelum menggunakan augmented assignment, variable harus sudah memiliki nilai.

Contohnya:

```python
x += 5
```

Jika `x` belum pernah didefinisikan sebelumnya, Python akan menghasilkan error.

Contohnya:

```text
NameError: name 'x' is not defined
```

Variable harus diberikan nilai terlebih dahulu:

```python
x = 10

x += 5

print(x)
```

Hasil:

```text
15
```

---

## 12. Menggunakan Augmented Assignment Berkali-kali

Augmented assignment dapat digunakan berkali-kali terhadap variable yang sama.

Contohnya:

```python
some_value = 5

some_value += 2
print(some_value)

some_value *= 2
print(some_value)

some_value -= 4
print(some_value)
```

Prosesnya:

```text
5
 ↓
5 + 2 = 7
 ↓
7 × 2 = 14
 ↓
14 - 4 = 10
```

Hasil:

```text
7
14
10
```

---

## 13. Mengapa Menggunakan Augmented Assignment?

Augmented assignment membuat kode menjadi lebih singkat dan mudah dibaca.

Bandingkan:

```python
total = total + price
```

dengan:

```python
total += price
```

Bentuk kedua lebih ringkas dan menunjukkan dengan jelas bahwa nilai `total` sedang diperbarui.

Augmented assignment banyak digunakan ketika sebuah variable terus mengalami perubahan, misalnya:

- Counter.
- Score.
- Total harga.
- Jumlah data.
- Nilai accumulator.
- Status atau nilai yang diperbarui secara bertahap.

---

## 14. Pola yang Perlu Diingat

Pola augmented assignment sangat sederhana:

```text
variable operator= value
```

Contohnya:

```text
x += 10
x -= 10
x *= 10
x /= 10
x //= 10
x %= 10
x **= 10
```

Secara konsep:

```text
x += 10
↓
x = x + 10
```

```text
x -= 10
↓
x = x - 10
```

```text
x *= 10
↓
x = x * 10
```

```text
x /= 10
↓
x = x / 10
```

---

## Kesimpulan

**Augmented Assignment Operator** adalah cara singkat untuk melakukan operasi terhadap sebuah variable sekaligus menyimpan hasilnya kembali ke variable tersebut.

Contohnya:

```python
some_value = 5

some_value += 2

print(some_value)
```

Hasil:

```text
7
```

Bentuk:

```python
some_value += 2
```

secara konsep sama dengan:

```python
some_value = some_value + 2
```

Beberapa augmented assignment operator yang penting adalah:

- `+=`
- `-=`
- `*=`
- `/=`
- `//=`
- `%=`
- `**=`

Hal yang paling penting untuk diingat:

:::info
**Variable harus sudah memiliki nilai sebelum digunakan dengan augmented assignment operator.**
:::

Augmented assignment merupakan fitur sederhana tetapi sangat sering digunakan dalam kode Python karena membuat proses memperbarui nilai variable menjadi lebih ringkas dan mudah dibaca.