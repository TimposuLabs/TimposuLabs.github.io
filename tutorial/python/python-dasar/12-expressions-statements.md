---
sidebar_position: 12
title: "Expressions vs Statements"
---

Dalam Python, terdapat beberapa istilah yang sering digunakan ketika membahas kode program. Dua di antaranya adalah **expression** dan **statement**.

Kedua istilah ini terkadang membingungkan bagi pemula karena keduanya sama-sama merupakan bagian dari kode.

Memahami perbedaannya penting karena istilah tersebut akan sering digunakan ketika membaca dokumentasi, tutorial, maupun ketika berkomunikasi dengan programmer lain.

---

## 1. Expression

**Expression** atau ekspresi adalah bagian dari kode yang **menghasilkan sebuah nilai** ketika dievaluasi.

Sederhananya:

:::info
**Expression adalah sesuatu yang dapat menghasilkan sebuah nilai.**
:::

Contohnya:

```python
2 + 2
```

Expression tersebut menghasilkan:

```text
4
```

Contoh lainnya:

```python
10 / 2
```

menghasilkan:

```text
5.0
```

Expression juga dapat berupa nilai secara langsung.

Contohnya:

```python
10
```

```python
True
```

```python
"Hello"
```

Masing-masing merupakan expression karena memiliki nilai.

---

## 2. Contoh Expression

Beberapa contoh expression dalam Python:

```python
2 + 2
```

```python
10 * 5
```

```python
age >= 18
```

```python
"Hello"
```

```python
True
```

```python
user_age
```

Masing-masing expression dapat menghasilkan atau merepresentasikan sebuah nilai.

Contohnya:

```python
age = 20

age + 5
```

Expression:

```python
age + 5
```

menghasilkan nilai:

```text
25
```

---

## 3. Statement

**Statement** atau pernyataan adalah sebuah instruksi yang digunakan untuk melakukan suatu aksi dalam program.

Sederhananya:

:::info
**Statement adalah instruksi yang memberitahu Python untuk melakukan sesuatu.**
:::

Contohnya:

```python
iq = 100
```

Kode tersebut merupakan sebuah statement karena melakukan proses assignment.

Contoh lainnya:

```python
print("Hello Python")
```

Statement tersebut memberikan instruksi kepada Python untuk menampilkan sesuatu ke layar.

---

## 4. Contoh Statement

Beberapa contoh statement:

```python
iq = 100
```

```python
print("Hello Python")
```

```python
if age >= 18:
    print("Dewasa")
```

```python
import math
```

Statement digunakan untuk membangun alur dan perilaku sebuah program.

---

## 5. Expression di Dalam Statement

Hal yang penting untuk dipahami adalah sebuah statement dapat mengandung satu atau lebih expression.

Perhatikan contoh berikut:

```python
user_age = iq / 5
```

Kode tersebut merupakan **statement** karena melakukan assignment.

Namun, bagian:

```python
iq / 5
```

merupakan **expression** karena menghasilkan sebuah nilai.

Secara sederhana:

```text
Statement
│
└── user_age = iq / 5
                  │
                  └── Expression
```

Expression tersebut menghasilkan sebuah nilai yang kemudian digunakan oleh statement.

---

## 6. Contoh Lain

Perhatikan:

```python
total = price * quantity
```

Keseluruhan kode:

```python
total = price * quantity
```

merupakan **statement**.

Sedangkan:

```python
price * quantity
```

merupakan **expression**.

Prosesnya dapat dibayangkan:

```text
price * quantity
       ↓
 menghasilkan nilai
       ↓
   assignment
       ↓
      total
```

---

## 7. Expression Dapat Digunakan dalam Berbagai Konteks

Expression dapat digunakan sebagai bagian dari berbagai statement.

Contohnya:

```python
print(10 + 20)
```

Expression:

```python
10 + 20
```

menghasilkan:

```text
30
```

Nilai tersebut kemudian digunakan oleh statement `print()` untuk ditampilkan.

Contoh lainnya:

```python
age = 20

if age >= 18:
    print("Dewasa")
```

Expression:

```python
age >= 18
```

menghasilkan nilai Boolean:

```text
True
```

Nilai tersebut kemudian digunakan oleh statement `if`.

---

## 8. Expression vs Statement

Perbedaan sederhananya dapat dilihat pada tabel berikut:

| Istilah | Fokus | Contoh |
| --- | --- | --- |
| **Expression** | Menghasilkan nilai | `2 + 2` |
| **Statement** | Melakukan aksi atau instruksi | `x = 2 + 2` |

Contoh:

```python
x = 2 + 2
```

Di dalam kode tersebut:

```text
2 + 2
```

adalah **expression**.

Sedangkan:

```text
x = 2 + 2
```

adalah **statement**.

---

## 9. Analogi Sederhana

Untuk mempermudah memahami konsep ini, kita dapat menggunakan analogi sederhana.

### Expression

Expression seperti sebuah **perhitungan** yang menghasilkan jawaban.

Misalnya:

```text
10 + 5
```

Hasilnya:

```text
15
```

### Statement

Statement seperti sebuah **instruksi** kepada komputer.

Misalnya:

```python
hasil = 10 + 5
```

Instruksinya adalah:

> Hitung `10 + 5`, kemudian gunakan hasilnya untuk assignment ke `hasil`.

---

## 10. Mengapa Istilah Ini Penting?

Pada tahap awal belajar Python, perbedaan expression dan statement mungkin terlihat sederhana.

Namun, istilah ini akan sering muncul ketika kita mulai mempelajari:

- Conditional statement.
- Loop.
- Function.
- Return.
- Assignment.
- Lambda.
- Comprehension.
- Syntax Python.
- Error dan exception.

Memahami istilah ini sejak awal akan membantu kita membaca dokumentasi Python dengan lebih mudah.

---

## 11. Cara Mudah Mengingat

Gunakan aturan sederhana berikut:

```text
Expression
    ↓
Menghasilkan nilai

Statement
    ↓
Melakukan aksi
```

Contoh:

```python
10 + 5
```

adalah **expression** karena menghasilkan:

```text
15
```

Sedangkan:

```python
hasil = 10 + 5
```

adalah **statement** karena melakukan assignment.

Di dalam statement tersebut terdapat expression:

```text
hasil = [10 + 5]
          ↑
      expression
```

---

## Kesimpulan

**Expression** adalah bagian dari kode yang menghasilkan atau merepresentasikan sebuah nilai.

Contohnya:

```python
2 + 2
```

Sedangkan **statement** adalah instruksi yang digunakan untuk melakukan suatu aksi.

Contohnya:

```python
hasil = 2 + 2
```

Perlu diingat bahwa sebuah statement dapat mengandung expression.

```text
Statement
    │
    ├── melakukan aksi
    │
    └── dapat mengandung expression
                    │
                    └── menghasilkan nilai
```

Cara paling sederhana untuk mengingatnya:

:::tip
**Expression menghasilkan nilai, sedangkan statement melakukan aksi.**
:::

Memahami perbedaan ini akan membantu kita memahami istilah dan konsep Python lainnya dengan lebih mudah.