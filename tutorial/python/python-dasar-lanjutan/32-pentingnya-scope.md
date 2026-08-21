---
sidebar_position: 32
title: "Pentingnya Scope"
---

## Mengapa Scope Penting di Python?

Pada materi sebelumnya kita telah mempelajari bahwa **scope** menentukan tempat sebuah variabel dapat diakses.

Scope bukan hanya aturan tentang "di mana variabel bisa digunakan". Penggunaan scope yang baik juga membantu kita membuat program yang lebih **terstruktur, aman, mudah dipelihara, dan efisien**.

---

## Mengapa Tidak Semua Variabel Dijadikan Global?

Secara sederhana, kita mungkin berpikir bahwa semua variabel sebaiknya dibuat pada Global Scope agar dapat digunakan dari mana saja.

Contoh:

```python
user_name = "Budi"
user_age = 25
user_score = 100
user_level = 10
```

Semua variabel tersebut dapat diakses dari berbagai bagian program.

Namun, jika aplikasi semakin besar dan semua data diletakkan pada Global Scope, pengelolaan program menjadi lebih sulit.

Contohnya:

```python
database_connection = ...
user_data = ...
product_data = ...
transaction_data = ...
configuration = ...
temporary_data = ...
```

Semakin banyak data yang disimpan secara global, semakin sulit mengetahui:

- Siapa yang menggunakan variabel tersebut.
- Function mana yang mengubah nilainya.
- Kapan nilai tersebut berubah.
- Apakah variabel tersebut masih diperlukan.
- Apakah ada bagian program lain yang tidak sengaja mengubahnya.

Karena itu, penggunaan scope membantu kita membatasi tempat sebuah variabel digunakan.

---

## Local Scope Membatasi Variabel

Variabel yang hanya diperlukan oleh sebuah function sebaiknya berada di dalam function tersebut.

Contoh:

```python
def calculate_total():
    price = 100
    quantity = 3

    return price * quantity
```

Variabel:

```text
price
quantity
```

hanya diperlukan untuk proses `calculate_total()`.

Tidak ada alasan untuk membuatnya sebagai global variable.

```python
def calculate_total():
    price = 100
    quantity = 3

    return price * quantity

print(calculate_total())
```

Dengan demikian, data yang hanya diperlukan oleh function tetap berada pada scope function tersebut.

---

## Scope Membantu Mengisolasi Variabel

Scope juga membantu mencegah variabel dari bagian program yang berbeda saling bertabrakan.

Contoh:

```python
def calculate_user():
    total = 100
    return total

def calculate_product():
    total = 500
    return total
```

Kedua function memiliki variabel:

```text
total
```

tetapi keduanya berada pada local scope yang berbeda.

```text
calculate_user()
└── total = 100

calculate_product()
└── total = 500
```

Keduanya tidak saling mengubah.

---

## Scope dan Penggunaan Memori

Ketika sebuah function dijalankan, Python dapat membuat variabel lokal yang diperlukan oleh function tersebut.

Contoh:

```python
def calculate():
    result = 100 * 20
    return result
```

Variabel:

```python
result
```

digunakan untuk kebutuhan function tersebut.

Setelah function selesai dan tidak ada lagi referensi yang mempertahankan objek tersebut, objek yang sudah tidak digunakan dapat dibersihkan oleh mekanisme manajemen memori Python.

Hal ini membantu Python menggunakan memori secara otomatis.

---

## Garbage Collection

Python memiliki sistem **automatic memory management**.

Salah satu bagian dari sistem tersebut adalah **garbage collection**.

Garbage collector membantu mendeteksi dan membersihkan objek tertentu yang sudah tidak memiliki referensi dan tidak lagi digunakan.

Contoh sederhana:

```python
def create_data():
    data = [1, 2, 3, 4, 5]
    return data
```

Ketika function selesai, variabel lokal `data` tidak otomatis berarti objek list langsung dihancurkan. Jika list tersebut dikembalikan dan masih memiliki referensi dari luar, objeknya tetap tersedia.

Contoh:

```python
def create_data():
    data = [1, 2, 3, 4, 5]
    return data

numbers = create_data()

print(numbers)
```

Objek list tetap dapat digunakan karena sekarang masih direferensikan oleh:

```python
numbers
```

Jadi, penting untuk memahami bahwa **keluarnya function tidak selalu berarti semua objek lokal langsung dihapus dari memori**.

---

## Global Variable dan Lifetime

Variabel global dapat tetap tersedia selama modul atau program masih mempertahankan referensi terhadapnya.

Contoh:

```python
data = [1, 2, 3, 4, 5]

def show_data():
    print(data)

show_data()
```

`data` berada pada Global Scope sehingga dapat digunakan selama scope global tersebut masih aktif.

Karena itu, jangan menyimpan data besar pada Global Scope hanya karena data tersebut mudah diakses.

---

## Scope Membantu Mengurangi Side Effect

Scope juga membantu mengurangi perubahan data yang tidak disengaja.

Contoh yang berisiko:

```python
total = 0

def add():
    global total
    total += 100

def subtract():
    global total
    total -= 50
```

Sekarang dua function dapat mengubah variabel yang sama.

Jika program semakin besar, perubahan tersebut dapat sulit dilacak.

Pendekatan yang lebih terkontrol:

```python
def add(total):
    return total + 100

def subtract(total):
    return total - 50

total = 0

total = add(total)
total = subtract(total)

print(total)
```

Sekarang perubahan `total` terlihat jelas dari alur program.

---

## Scope Membantu Membuat Clean Code

Penggunaan scope yang baik membuat hubungan antar bagian program lebih jelas.

Contoh:

```python
def calculate_discount(price):
    discount = price * 0.1
    return price - discount
```

Variabel:

```python
discount
```

hanya digunakan untuk proses perhitungan diskon.

Daripada:

```python
discount = 0

def calculate_discount(price):
    global discount
    discount = price * 0.1
    return price - discount
```

versi pertama lebih sederhana karena tidak membutuhkan global variable.

---

## Scope dan Maintainability

Program yang menggunakan scope dengan baik biasanya lebih mudah dipelihara.

Misalnya terdapat function:

```python
def calculate_total(price, quantity):
    subtotal = price * quantity
    tax = subtotal * 0.11

    return subtotal + tax
```

Semua variabel yang digunakan untuk proses perhitungan berada di dalam function.

Developer lain tidak perlu mencari variabel global seperti:

```text
subtotal
tax
quantity
```

karena semuanya sudah jelas berada di dalam function.

---

## Scope Membantu Testing

Function yang tidak bergantung pada banyak variabel global biasanya lebih mudah diuji.

Contoh:

```python
def multiply(a, b):
    return a * b
```

Kita dapat menguji function dengan berbagai input:

```python
print(multiply(2, 3))
print(multiply(5, 10))
print(multiply(100, 2))
```

Function tersebut tidak bergantung pada variabel global.

Input dan outputnya jelas:

```text
Input
  ↓
Function
  ↓
Output
```

---

## Scope Bukan Sekadar Masalah Memori

Penting untuk memahami bahwa manfaat utama scope bukan hanya tentang menghemat RAM.

Scope terutama membantu:

- Mengatur akses terhadap variabel.
- Menghindari konflik nama.
- Membatasi perubahan data.
- Mengurangi ketergantungan antar bagian program.
- Membuat kode lebih mudah dibaca.
- Membuat function lebih mudah diuji.
- Membantu menjaga struktur program.

Pengelolaan memori adalah bagian dari bagaimana Python mengelola object, tetapi jangan menganggap bahwa setiap variabel lokal langsung dihapus begitu function selesai.

---

## Global vs Local

Perhatikan perbandingan berikut.

### Global Variable

```python
total = 0

def calculate():
    global total
    total += 100

calculate()

print(total)
```

Function mengubah data di luar dirinya.

### Local Variable

```python
def calculate():
    total = 100
    return total

print(calculate())
```

Data hanya digunakan untuk kebutuhan function dan hasilnya dikembalikan melalui `return`.

Untuk banyak kasus, pendekatan kedua lebih mudah dikontrol.

---

## Prinsip yang Perlu Diingat

Gunakan prinsip sederhana berikut:

> **Simpan variabel sedekat mungkin dengan tempat variabel tersebut digunakan.**

Jika sebuah variabel hanya diperlukan oleh function:

```python
def calculate():
    result = 100
```

biarkan berada di dalam function.

Jika sebuah data memang harus digunakan oleh banyak bagian program, gunakan mekanisme berbagi data yang sesuai dan terstruktur.

Jangan menjadikan semua variabel global hanya karena lebih mudah diakses.

---

## Hubungan dengan `global` dan `nonlocal`

Materi sebelumnya membahas:

```python
global
```

dan:

```python
nonlocal
```

Keduanya memang berguna dalam kondisi tertentu.

Namun, penggunaan keduanya secara berlebihan dapat membuat hubungan antar scope menjadi lebih kompleks.

Contoh:

```python
total = 0

def count():
    global total
    total += 1
```

Lebih sulit dilacak dibandingkan:

```python
def count(total):
    return total + 1
```

Karena pada versi kedua, perubahan nilai terlihat jelas melalui parameter dan `return`.

---

## Poin Penting

Beberapa hal yang perlu diingat:

1. Jangan menjadikan semua variabel sebagai Global Scope.
2. Gunakan Local Scope untuk data yang hanya diperlukan oleh function.
3. Scope membantu mengisolasi variabel.
4. Local variable dapat membantu mengurangi ketergantungan antar bagian program.
5. Python memiliki automatic memory management.
6. Garbage collector membantu membersihkan objek tertentu yang sudah tidak digunakan.
7. Keluar dari function tidak selalu berarti objek lokal langsung dihancurkan.
8. Penggunaan `global` dan `nonlocal` sebaiknya dilakukan ketika memang diperlukan.
9. Function yang memiliki input dan output yang jelas biasanya lebih mudah diuji.
10. Scope merupakan bagian penting dari clean code dan maintainability.

---

## Kesimpulan

Scope bukan hanya menentukan **di mana sebuah variabel dapat digunakan**, tetapi juga membantu kita merancang program yang lebih terstruktur.

Dengan membatasi variabel pada scope yang sesuai, kita dapat mengurangi konflik nama, mengurangi side effect, mempermudah testing, dan membuat kode lebih mudah dipelihara.

Prinsip sederhananya:

```text
Gunakan Local Scope
        ↓
Jika data hanya dibutuhkan oleh function

Gunakan Global Scope
        ↓
Jika data memang harus tersedia secara global

Gunakan global / nonlocal
        ↓
Hanya ketika memang diperlukan
```

Pemahaman tentang scope ini akan menjadi dasar penting sebelum mempelajari konsep yang lebih lanjut seperti **closure, decorator, module, class, dan object-oriented programming**.