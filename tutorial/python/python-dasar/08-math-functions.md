---
sidebar_position: 8
title: "Math Functions"
---

Python menyediakan berbagai fungsi yang dapat digunakan untuk melakukan operasi terhadap angka/numbers.

Selain operator aritmatika, Python juga memiliki beberapa **built-in functions** yang dapat digunakan untuk membantu melakukan perhitungan atau manipulasi nilai numerik.

Beberapa fungsi matematika sederhana yang penting untuk diketahui sejak awal adalah `round()` dan `abs()`.

---

## 1. Fungsi `round()`

Fungsi `round()` digunakan untuk melakukan pembulatan terhadap suatu angka.

Contohnya:

```python
print(round(3.1))
print(round(3.9))
```

Hasil:

```text
3
4
```

Pada contoh tersebut:

- `3.1` dibulatkan menjadi `3`.
- `3.9` dibulatkan menjadi `4`.

### Menentukan Jumlah Digit Desimal

`round()` juga dapat digunakan untuk menentukan jumlah angka di belakang koma.

Contohnya:

```python
print(round(3.14159, 2))
```

Hasil:

```text
3.14
```

Angka `2` pada contoh tersebut menunjukkan bahwa hasil ingin ditampilkan dengan dua digit desimal.

Contoh lainnya:

```python
print(round(3.14159, 3))
```

Hasil:

```text
3.142
```

---

## 2. Fungsi `abs()`

Fungsi `abs()` digunakan untuk mendapatkan **nilai absolut atau nilai mutlak** dari sebuah angka.

Nilai absolut tidak memiliki tanda negatif.

Contohnya:

```python
print(abs(-20))
print(abs(20))
```

Hasil:

```text
20
20
```

Contoh lainnya:

```python
jarak = -15

print(abs(jarak))
```

Hasil:

```text
15
```

Fungsi `abs()` dapat digunakan ketika kita hanya membutuhkan besarnya sebuah nilai tanpa memperhatikan tanda positif atau negatif.

---

## 3. Menggunakan Math Functions dengan Variable

Fungsi matematika dapat digunakan bersama dengan variable.

Contohnya:

```python
nilai = 87.6

hasil = round(nilai)

print(hasil)
```

Hasil:

```text
88
```

Contoh menggunakan `abs()`:

```python
selisih = -25

hasil = abs(selisih)

print(hasil)
```

Hasil:

```text
25
```

Dengan demikian, fungsi matematika dapat digunakan pada nilai langsung maupun nilai yang disimpan dalam variable.

---

## 4. Built-in Functions dan Module `math`

`round()` dan `abs()` merupakan contoh **built-in functions** yang sudah tersedia di Python.

Artinya, kita dapat langsung menggunakannya tanpa melakukan import module terlebih dahulu.

Contohnya:

```python
print(round(3.14))
print(abs(-10))
```

Python juga menyediakan module bernama **`math`** yang berisi berbagai fungsi dan konstanta matematika.

Module tersebut menyediakan fungsi yang lebih khusus untuk kebutuhan matematika.

Contohnya:

```python
import math
```

Setelah module digunakan, kita dapat mengakses berbagai fungsi yang tersedia di dalamnya.

Pembahasan mengenai module `math` dan berbagai fungsi di dalamnya dapat dipelajari lebih lanjut ketika membahas **module dan standard library Python**.

---

## 5. Tidak Perlu Menghafalkan Semua Fungsi

Python memiliki banyak sekali built-in functions, module, dan library.

Kita tidak perlu menghafalkan semuanya.

Sebagai programmer, yang lebih penting adalah:

- Memahami konsep.
- Mengetahui bahwa suatu fungsi tersedia.
- Mengetahui cara mencari dokumentasinya.
- Memahami cara menggunakan fungsi tersebut ketika dibutuhkan.

Misalnya, ketika membutuhkan fungsi matematika tertentu, kita dapat mencari dokumentasi Python menggunakan kata kunci seperti:

```text
Python 3 math functions
```

atau mencari langsung dokumentasi resmi Python.

Kemampuan menemukan informasi yang tepat merupakan bagian penting dari keterampilan seorang programmer.

---

## 6. Fokus pada Fungsi yang Sering Digunakan

Pada tahap awal belajar Python, fokuslah terlebih dahulu pada fungsi yang sering digunakan.

Contohnya:

| Fungsi | Kegunaan |
| --- | --- |
| `round()` | Membulatkan angka |
| `abs()` | Mendapatkan nilai absolut |

Setelah memahami fungsi-fungsi dasar tersebut, kita dapat mempelajari fungsi lainnya sesuai kebutuhan program.

Tidak perlu mempelajari seluruh fungsi matematika sekaligus.

---

## 7. Contoh Penggunaan

Berikut contoh sederhana penggunaan kedua fungsi:

```python
nilai = 87.65
selisih = -25

nilai_bulat = round(nilai)
selisih_mutlak = abs(selisih)

print(nilai_bulat)
print(selisih_mutlak)
```

Hasil:

```text
88
25
```

Pada contoh tersebut:

- `round()` digunakan untuk membulatkan nilai.
- `abs()` digunakan untuk mendapatkan nilai mutlak.

---

## Kesimpulan

Python menyediakan berbagai fungsi yang dapat membantu kita bekerja dengan data numerik.

Dua fungsi dasar yang penting untuk diketahui adalah:

### `round()`

Digunakan untuk membulatkan angka.

```python
round(3.9)
```

Hasil:

```text
4
```

### `abs()`

Digunakan untuk mendapatkan nilai absolut.

```python
abs(-20)
```

Hasil:

```text
20
```

Selain built-in functions, Python juga menyediakan module seperti `math` yang memiliki berbagai fungsi matematika lainnya.

Namun, kita tidak perlu menghafalkan semua fungsi tersebut.

:::tip
**Sebagai programmer, yang lebih penting bukan menghafalkan semua fungsi, tetapi memahami konsep dan mengetahui bagaimana menemukan serta menggunakan fungsi yang dibutuhkan.**
:::