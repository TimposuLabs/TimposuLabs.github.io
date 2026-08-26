---
sidebar_position: 10
title: "Tipe Data Complex & Sistem Biner"
---

Selain `int` dan `float`, Python memiliki tipe data numerik lainnya, yaitu **`complex`**.

Pada materi ini kita juga akan mulai mengenal bagaimana komputer merepresentasikan angka menggunakan **sistem biner**.

Pemahaman mengenai sistem biner akan membantu kita memahami apa yang terjadi di balik layar ketika komputer menyimpan dan memproses data.

---

## 1. Tipe Data `complex`

Python memiliki tipe data bernama **`complex`** yang digunakan untuk merepresentasikan **bilangan kompleks**.

Bilangan kompleks terdiri dari dua bagian:

- Bagian real.
- Bagian imajiner.

Contohnya:

```python
angka = 5 + 3j
```

Pada contoh tersebut:

```text
5 → bagian real
3j → bagian imajiner
```

Python menggunakan huruf `j` untuk merepresentasikan bagian imajiner.

Kita dapat memeriksa tipe datanya menggunakan `type()`:

```python
angka = 5 + 3j

print(type(angka))
```

Hasil:

```text
<class 'complex'>
```

---

## 2. Kapan `complex` Digunakan?

Bilangan kompleks banyak digunakan dalam bidang matematika dan ilmu teknik tertentu.

Contohnya pada:

- Matematika.
- Fisika.
- Teknik elektro.
- Pemrosesan sinyal.
- Scientific computing.

Namun, untuk sebagian besar aplikasi pemrograman sehari-hari, tipe data `complex` jarang digunakan.

Sebagai pemula, kita cukup memahami bahwa Python memiliki tipe data ini dan mengetahui cara mengenalinya.

Tidak perlu mempelajari matematika bilangan kompleks secara mendalam pada tahap Python dasar.

---

## 3. Mengenal Sistem Biner

Komputer bekerja menggunakan sistem yang berbeda dengan cara manusia biasanya menuliskan angka.

Manusia umumnya menggunakan **sistem desimal** atau basis 10.

Sistem desimal menggunakan:

```text
0 1 2 3 4 5 6 7 8 9
```

Sedangkan komputer menggunakan **sistem biner** atau basis 2.

Sistem biner hanya menggunakan:

```text
0
1
```

Setiap digit biner disebut **bit**.

Contohnya:

```text
101
```

merupakan representasi sebuah angka dalam sistem biner.

---

## 4. Mengapa Komputer Menggunakan Biner?

Komputer menggunakan perangkat elektronik yang pada dasarnya dapat merepresentasikan dua kondisi.

Secara sederhana, dua kondisi tersebut dapat direpresentasikan sebagai:

```text
0 → Off
1 → On
```

Konsep tersebut kemudian menjadi dasar sistem biner yang digunakan komputer untuk merepresentasikan dan memproses data.

Karena itu, berbagai jenis data pada komputer pada akhirnya direpresentasikan menggunakan kombinasi bit.

---

## 5. Fungsi `bin()`

Python menyediakan built-in function bernama `bin()` yang dapat digunakan untuk mendapatkan representasi biner dari sebuah integer.

Contohnya:

```python
print(bin(5))
```

Hasil:

```text
0b101
```

Nilai tersebut terdiri dari:

```text
0b101
│  │
│  └── Representasi biner
└───── Penanda bilangan biner
```

Awalan `0b` menunjukkan bahwa nilai tersebut merupakan representasi bilangan dalam **basis 2**.

Jadi:

```text
5 dalam desimal
↓
101 dalam biner
```

---

## 6. Contoh Konversi ke Biner

Kita dapat menggunakan `bin()` untuk beberapa bilangan integer.

```python
print(bin(1))
print(bin(2))
print(bin(3))
print(bin(4))
print(bin(5))
print(bin(10))
```

Hasil:

```text
0b1
0b10
0b11
0b100
0b101
0b1010
```

Beberapa contoh hubungan antara desimal dan biner:

| Desimal | Biner |
| --- | --- |
| `1` | `1` |
| `2` | `10` |
| `3` | `11` |
| `4` | `100` |
| `5` | `101` |
| `10` | `1010` |

---

## 7. Mengubah Biner Menjadi Desimal

Python juga dapat digunakan untuk mengubah representasi biner kembali menjadi angka desimal.

Untuk melakukan hal tersebut, kita dapat menggunakan fungsi `int()` dengan menentukan basis `2`.

Contohnya:

```python
print(int("0b101", 2))
```

Hasil:

```text
5
```

Artinya:

```text
0b101
 ↓
 5
```

Kita juga dapat menuliskan bilangan binernya tanpa awalan `0b`:

```python
print(int("101", 2))
```

Hasilnya tetap:

```text
5
```

---

## 8. Parameter Base pada `int()`

Fungsi `int()` dapat menerima parameter **base** yang menentukan sistem bilangan yang digunakan.

Untuk sistem biner, gunakan:

```text
base = 2
```

Contohnya:

```python
angka = int("101", 2)

print(angka)
```

Hasil:

```text
5
```

Beberapa sistem bilangan yang umum dikenal:

| Sistem | Base | Digit |
| --- | --- | --- |
| Biner | 2 | `0`, `1` |
| Oktal | 8 | `0`–`7` |
| Desimal | 10 | `0`–`9` |
| Hexadecimal | 16 | `0`–`9`, `A`–`F` |

Pada tahap ini, kita cukup memahami konsep dasar biner karena pembahasan sistem bilangan lainnya dapat dipelajari secara lebih khusus.

---

## 9. Konversi Dua Arah

Python memungkinkan kita melakukan konversi antara desimal dan biner.

### Desimal ke Biner

Gunakan `bin()`:

```python
angka = 5

print(bin(angka))
```

Hasil:

```text
0b101
```

### Biner ke Desimal

Gunakan `int()` dengan base `2`:

```python
angka = int("101", 2)

print(angka)
```

Hasil:

```text
5
```

Secara sederhana:

```text
Desimal
   ↓
  bin()
   ↓
Biner

Biner
   ↓
int(..., 2)
   ↓
Desimal
```

---

## 10. Mengapa Mempelajari Biner?

Sebagai programmer, kita tidak harus melakukan konversi biner secara manual setiap hari.

Namun, memahami konsep biner memberikan gambaran mengenai bagaimana komputer merepresentasikan data.

Konsep ini akan berguna ketika mempelajari bidang seperti:

- Computer Science.
- Computer Architecture.
- Networking.
- Operating System.
- Cybersecurity.
- Memory management.
- Bitwise operation.

Pemahaman biner juga membantu ketika kita mulai mempelajari konsep **bit** dan **byte**.

---

## 11. Hubungan dengan Memori Komputer

Data yang digunakan oleh program pada akhirnya perlu direpresentasikan dalam bentuk yang dapat diproses oleh komputer.

Secara sederhana:

```text
Program
   ↓
Data
   ↓
Representasi biner
   ↓
Memori komputer
```

Misalnya sebuah angka:

```text
5
```

dapat direpresentasikan dalam biner sebagai:

```text
101
```

Namun, perlu dipahami bahwa representasi data di memori komputer sebenarnya lebih kompleks daripada sekadar mengubah angka desimal menjadi rangkaian `0` dan `1`.

Cara data disimpan bergantung pada jenis data dan representasinya.

---

## 12. `complex` dan Biner dalam Python

Pada materi sebelumnya kita sudah mengenal beberapa tipe data numerik:

```text
Numeric Data Types
│
├── int
│
├── float
│
└── complex
```

Sedangkan sistem biner merupakan cara komputer merepresentasikan data menggunakan dua nilai:

```text
0 dan 1
```

Python menyediakan fungsi `bin()` untuk membantu kita melihat representasi biner dari integer.

---

## Kesimpulan

Python memiliki beberapa tipe data numerik, salah satunya adalah **`complex`** yang digunakan untuk merepresentasikan bilangan kompleks.

Contohnya:

```python
angka = 5 + 3j
```

Untuk sistem bilangan, komputer menggunakan **biner** yang hanya terdiri dari `0` dan `1`.

Python menyediakan fungsi `bin()` untuk mendapatkan representasi biner dari sebuah integer:

```python
print(bin(5))
```

Hasil:

```text
0b101
```

Kita juga dapat mengubah biner kembali menjadi desimal menggunakan `int()` dengan base `2`:

```python
print(int("101", 2))
```

Hasil:

```text
5
```

Hal penting yang perlu diingat:

:::tip
**`complex` adalah salah satu tipe data numerik Python, sedangkan biner adalah sistem representasi angka yang menggunakan 0 dan 1.**
:::

Memahami konsep ini memberikan dasar yang lebih baik untuk memahami bagaimana data direpresentasikan dan diproses oleh komputer.