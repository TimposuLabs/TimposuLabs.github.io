---
sidebar_position: 1
title: "Packages"
---

## Apa Itu Package?

Pada materi sebelumnya, kita telah mempelajari **Module**, yaitu file Python dengan ekstensi `.py` yang digunakan untuk mengorganisasi kode.

Ketika sebuah proyek semakin besar, jumlah module juga dapat bertambah. Jika semua module ditempatkan dalam satu direktori, struktur proyek dapat menjadi sulit dikelola.

Python menyediakan konsep **Package** untuk mengelompokkan beberapa module ke dalam sebuah direktori berdasarkan fungsi atau tanggung jawabnya.

Secara sederhana:

```text
Module  → satu file .py

Package → satu folder yang berisi beberapa module
```

Contohnya:

```text
my_project/
├── main.py
└── shopping/
    ├── __init__.py
    └── shopping_cart.py
```

Pada struktur tersebut:

- `shopping/` merupakan package.
- `shopping_cart.py` merupakan module.
- `__init__.py` merupakan file yang berada di dalam package.

## Mengapa Membutuhkan Package?

Pada proyek sederhana, beberapa module mungkin masih mudah dikelola dalam satu direktori.

Namun, ketika aplikasi berkembang, kita dapat memiliki banyak bagian seperti:

```text
Authentication
Database
User
Shopping
Payment
Reporting
Utility
```

Jika semuanya ditempatkan dalam satu folder:

```text
project/
├── authentication.py
├── database.py
├── user.py
├── shopping.py
├── payment.py
├── reporting.py
├── utility.py
└── main.py
```

jumlah file dapat menjadi semakin banyak.

Package memungkinkan module-module tersebut dikelompokkan berdasarkan fungsinya.

Contohnya:

```text
project/
├── main.py
│
├── authentication/
│   ├── __init__.py
│   └── login.py
│
├── database/
│   ├── __init__.py
│   └── connection.py
│
└── shopping/
    ├── __init__.py
    └── shopping_cart.py
```

Dengan struktur tersebut, codebase menjadi lebih terorganisir.

## Struktur Package

Struktur dasar sebuah package dapat dibuat seperti berikut:

```text
my_project/
│
├── main.py
│
└── shopping/
    ├── __init__.py
    └── shopping_cart.py
```

Di dalam `shopping_cart.py` kita dapat membuat function:

```python
def buy(item):
    cart = []
    cart.append(item)
    return cart
```

Module tersebut sekarang berada di dalam package `shopping`.

## Mengimpor Module dari Package

Module yang berada di dalam package dapat diimpor menggunakan notasi titik (`.`).

Misalnya:

```python
import shopping.shopping_cart
```

Setelah module diimpor, function di dalamnya dapat digunakan melalui:

```python
shopping.shopping_cart.buy("apple")
```

Contoh lengkap:

```python
import shopping.shopping_cart

print(shopping.shopping_cart.buy("apple"))
```

Output:

```text
["apple"]
```

Struktur pemanggilannya dapat dipahami sebagai:

```text
package
   ↓
module
   ↓
function
```

atau:

```text
shopping.shopping_cart.buy()
```

## Mengimpor Function Secara Langsung

Selain mengimpor seluruh module, kita juga dapat mengimpor function tertentu dari module di dalam package.

Gunakan:

```python
from shopping.shopping_cart import buy
```

Setelah itu, function dapat dipanggil secara langsung:

```python
print(buy("apple"))
```

Output:

```text
["apple"]
```

Perbandingan kedua pendekatan:

```python
import shopping.shopping_cart

shopping.shopping_cart.buy("apple")
```

dan:

```python
from shopping.shopping_cart import buy

buy("apple")
```

Keduanya dapat digunakan untuk mengakses function yang sama.

## File `__init__.py`

Dalam struktur package tradisional Python, kita sering menemukan file:

```text
__init__.py
```

Contohnya:

```text
shopping/
├── __init__.py
└── shopping_cart.py
```

File `__init__.py` digunakan sebagai bagian dari struktur package Python.

Pada banyak kasus, file tersebut dapat dibiarkan kosong:

```python
```

Kehadirannya saja sudah cukup untuk kebutuhan package pada struktur tradisional Python.

## Apakah `__init__.py` Harus Selalu Ada?

Pada Python modern, sebuah direktori dapat berfungsi sebagai **namespace package** tanpa `__init__.py`.

Namun, ketika mempelajari konsep package dasar dan struktur package tradisional, penggunaan:

```text
__init__.py
```

masih sangat umum dan membantu memperjelas bahwa sebuah direktori dimaksudkan sebagai package.

Karena itu, untuk pembelajaran dasar, struktur berikut tetap baik digunakan:

```text
shopping/
├── __init__.py
└── shopping_cart.py
```

## Package dan Module

Hubungan antara module dan package dapat digambarkan:

```text
Project
   ↓
Package
   ↓
Module
   ↓
Function / Class / Variable
```

Contohnya:

```text
my_project/
│
├── main.py
│
└── shopping/
    │
    ├── __init__.py
    │
    └── shopping_cart.py
```

Pada struktur tersebut:

```text
shopping/
    ↓
Package

shopping_cart.py
    ↓
Module
```

## Package untuk Organisasi Kode

Package tidak hanya digunakan untuk membuat struktur folder, tetapi juga membantu mengelompokkan kode berdasarkan tanggung jawab.

Misalnya aplikasi memiliki beberapa fitur:

```text
project/
├── main.py
│
├── users/
│   ├── __init__.py
│   └── user.py
│
├── payments/
│   ├── __init__.py
│   └── payment.py
│
├── database/
│   ├── __init__.py
│   └── connection.py
│
└── utilities/
    ├── __init__.py
    └── helper.py
```

Dengan struktur tersebut, developer dapat lebih mudah menemukan kode yang berkaitan dengan fitur tertentu.

## Package dan Reusability

Salah satu keuntungan package adalah membantu membuat kode yang lebih mudah digunakan kembali.

Misalnya module:

```text
shopping/shopping_cart.py
```

memiliki berbagai function yang berhubungan dengan shopping cart.

Module tersebut dapat digunakan oleh bagian aplikasi yang membutuhkan functionality tersebut.

Secara konseptual:

```text
shopping/
    ↓
shopping_cart.py
    ↓
Function shopping cart
    ↓
Digunakan oleh module lain
```

Dengan demikian, kode tidak perlu ditulis ulang pada setiap bagian aplikasi.

## Hirarki Module dan Package

Secara sederhana, struktur organisasi kode Python dapat dipahami seperti berikut:

```text
Project
│
├── Module
│   └── file.py
│
└── Package
    ├── __init__.py
    ├── module_a.py
    ├── module_b.py
    └── module_c.py
```

Jadi:

| Konsep | Bentuk | Fungsi |
| --- | --- | --- |
| Module | File `.py` | Mengorganisasi kode dalam satu file |
| Package | Direktori | Mengelompokkan beberapa module |
| `__init__.py` | File Python | Bagian dari struktur package tradisional |

## Kesimpulan

**Package** digunakan untuk mengelompokkan beberapa module Python ke dalam sebuah direktori sehingga struktur proyek menjadi lebih terorganisir.

Perbedaan sederhananya:

```text
Module
= satu file .py

Package
= direktori yang mengelompokkan module
```

Contoh struktur:

```text
my_project/
├── main.py
└── shopping/
    ├── __init__.py
    └── shopping_cart.py
```

Module di dalam package dapat digunakan dengan:

```python
import shopping.shopping_cart
```

atau function tertentu dapat diimpor langsung:

```python
from shopping.shopping_cart import buy
```

Pemahaman mengenai **module dan package** menjadi dasar penting sebelum mempelajari struktur proyek Python yang lebih besar, termasuk **package pihak ketiga, Python Standard Library, virtual environment, dan dependency management**.