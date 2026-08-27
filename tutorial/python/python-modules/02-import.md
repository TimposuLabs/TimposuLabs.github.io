---
sidebar_position: 2
title: "Cara Mengimpor Modul"
---

Ketika membangun aplikasi Python, kita sering membutuhkan function, class, atau variable yang berada di module atau package lain.

Python menyediakan beberapa cara untuk melakukan `import`. Masing-masing memiliki karakteristik dan penggunaan yang berbeda.

Pemilihan cara import yang tepat dapat membantu menjaga kode tetap **jelas, mudah dibaca, dan mudah dipelihara**.

## Persiapan Contoh

Misalkan kita memiliki struktur project berikut:

```text
my_project/
├── main.py
└── shopping/
    ├── __init__.py
    └── shopping_cart.py
```

Di dalam `shopping_cart.py` terdapat function:

```python
def buy(item):
    return [item]
```

Kita akan menggunakan function `buy()` tersebut untuk mempelajari berbagai cara melakukan import.

---

## 1. Import Module Secara Utuh

Cara pertama adalah menggunakan:

```python
import module
```

Contohnya:

```python
import shopping.shopping_cart

print(shopping.shopping_cart.buy("apple"))
```

Output:

```text
["apple"]
```

Pada pendekatan ini, kita mengimpor module secara keseluruhan.

Ketika ingin menggunakan function di dalamnya, kita menyertakan nama package dan module:

```python
shopping.shopping_cart.buy()
```

Strukturnya:

```text
package
   ↓
module
   ↓
function
```

### Kelebihan

Cara ini membuat asal function menjadi sangat jelas.

Ketika melihat:

```python
shopping.shopping_cart.buy()
```

kita dapat langsung mengetahui bahwa `buy()` berasal dari module `shopping_cart`.

---

## 2. Import Function atau Class Tertentu

Kita juga dapat mengimpor object tertentu dari sebuah module menggunakan:

```python
from module import item
```

Contohnya:

```python
from shopping.shopping_cart import buy

print(buy("apple"))
```

Output:

```text
["apple"]
```

Pada pendekatan ini, kita hanya mengambil function `buy` dari module tersebut.

Setelah diimpor, function dapat dipanggil secara langsung:

```python
buy("apple")
```

Tanpa:

```python
shopping.shopping_cart.buy("apple")
```

### Kelebihan

Cara ini membuat pemanggilan function lebih singkat, terutama ketika hanya membutuhkan beberapa object dari sebuah module.

Namun, perlu diperhatikan bahwa nama function tersebut sekarang berada langsung di namespace file yang melakukan import.

---

## 3. Menggunakan Alias

Python juga memungkinkan kita memberikan **alias** atau nama alternatif ketika melakukan import.

Sintaksnya:

```python
import module as alias
```

Contohnya:

```python
import shopping.shopping_cart as cart

print(cart.buy("apple"))
```

Output:

```text
["apple"]
```

Sekarang kita tidak perlu menulis nama module yang panjang:

```python
shopping.shopping_cart.buy()
```

cukup:

```python
cart.buy()
```

### Alias untuk Function

Alias juga dapat digunakan ketika mengimpor function tertentu.

Contohnya:

```python
from shopping.shopping_cart import buy as beli

print(beli("apple"))
```

Function `buy()` sekarang dapat dipanggil menggunakan nama:

```python
beli()
```

### Kapan Menggunakan Alias?

Alias dapat berguna ketika:

- Nama module terlalu panjang.
- Nama function atau module perlu disingkat.
- Terdapat potensi bentrokan nama.
- Kita ingin menggunakan nama yang lebih sesuai dengan konteks program.

Contohnya:

```python
import shopping.shopping_cart as cart
```

lebih ringkas daripada selalu menulis:

```python
shopping.shopping_cart
```

---

## 4. Mengimpor Semua Isi Module

Python juga menyediakan wildcard import:

```python
from module import *
```

Contohnya:

```python
from shopping.shopping_cart import *

print(buy("apple"))
```

Semua object yang tersedia untuk wildcard import dari module akan diimpor ke namespace saat ini.

Function `buy()` kemudian dapat digunakan secara langsung:

```python
buy("apple")
```

## Mengapa `import *` Tidak Disarankan?

Walaupun sintaks ini terlihat praktis, penggunaan:

```python
from module import *
```

umumnya dianggap **bad practice** dalam kode aplikasi.

Masalah utamanya adalah kita dapat kehilangan kejelasan mengenai asal sebuah function atau variable.

Misalnya:

```python
from module_a import *
from module_b import *
```

Jika kedua module memiliki nama yang sama:

```text
module_a
    ↓
calculate()

module_b
    ↓
calculate()
```

maka dapat terjadi konflik nama.

Kita juga akan lebih sulit mengetahui dari module mana sebuah function berasal.

Karena itu, sebaiknya hindari wildcard import pada kode yang membutuhkan keterbacaan dan pemeliharaan yang baik.

---

## Perbandingan Cara Import

Keempat pendekatan tersebut dapat dibandingkan sebagai berikut:

| Cara | Contoh | Pemanggilan |
| --- | --- | --- |
| Import module | `import module` | `module.function()` |
| Import object tertentu | `from module import function` | `function()` |
| Menggunakan alias | `import module as m` | `m.function()` |
| Wildcard import | `from module import *` | `function()` |

---

## Explicit vs Implicit

Dalam penulisan Python terdapat prinsip:

```text
Explicit is better than implicit.
```

Artinya, kode yang menunjukkan dengan jelas apa yang digunakan dan dari mana asalnya biasanya lebih mudah dipahami.

Misalnya:

```python
import shopping.shopping_cart

shopping.shopping_cart.buy("apple")
```

Asal function `buy()` terlihat dengan jelas.

Dibandingkan:

```python
from shopping.shopping_cart import *
```

lalu:

```python
buy("apple")
```

Pada kode kedua, pembaca harus mencari tahu dari mana `buy()` berasal.

---

## Rekomendasi Penggunaan

Dalam praktiknya, beberapa bentuk import yang umum digunakan adalah:

### Gunakan Import Module

```python
import shopping.shopping_cart

shopping.shopping_cart.buy("apple")
```

Pendekatan ini sangat jelas ketika kita ingin menunjukkan asal object.

### Gunakan Import Object Tertentu

```python
from shopping.shopping_cart import buy

buy("apple")
```

Gunakan ketika kita memang hanya membutuhkan object tertentu dari sebuah module.

### Gunakan Alias Jika Diperlukan

```python
import shopping.shopping_cart as cart

cart.buy("apple")
```

Alias dapat membantu ketika nama module terlalu panjang atau ketika diperlukan nama alternatif yang lebih jelas.

### Hindari Wildcard Import

Sebaiknya hindari:

```python
from shopping.shopping_cart import *
```

karena dapat mengurangi readability dan menyebabkan konflik nama.

---

## Kesimpulan

Python menyediakan beberapa cara untuk mengimpor kode dari module atau package.

Cara utama yang perlu dipahami adalah:

```python
import module
```

untuk mengimpor module secara utuh.

```python
from module import item
```

untuk mengimpor object tertentu.

```python
import module as alias
```

untuk memberikan nama alternatif.

```python
from module import *
```

untuk mengimpor seluruh isi module, tetapi penggunaannya **tidak disarankan**.

Secara umum, pilih bentuk import yang membuat kode tetap **jelas, eksplisit, dan mudah dipelihara**.

```text
Module
   ↓
import
   ↓
Function / Class / Variable
   ↓
Digunakan oleh module lain
```

Pemahaman berbagai cara `import` menjadi dasar penting sebelum mempelajari **Standard Library, third-party package, virtual environment, dan dependency management** dalam Python.