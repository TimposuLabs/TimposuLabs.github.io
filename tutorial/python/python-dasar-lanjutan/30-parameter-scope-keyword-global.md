---
sidebar_position: 30
title: "Parameter Scope dan Keyword Global"
---

Pada materi sebelumnya kita telah mempelajari **scope** dan aturan pencarian variabel menggunakan **LEGB**.

Pada materi ini kita akan membahas dua konsep yang berkaitan erat dengan scope:

- Parameter function sebagai local variable.
- Keyword `global` untuk mengakses dan mengubah variabel global dari dalam function.

---

## Parameter sebagai Local Variable

Parameter yang dituliskan ketika mendefinisikan sebuah function secara otomatis menjadi bagian dari **local scope** function tersebut.

Contoh:

```python
def confusion(b):
    print(b)

confusion(300)
```

Output:

```text
300
```

Parameter `b` hanya tersedia di dalam function `confusion()`.

Kita tidak dapat mengakses `b` secara langsung dari luar function:

```python
def confusion(b):
    print(b)

confusion(300)

print(b)
```

Kode tersebut akan menghasilkan:

```text
NameError: name 'b' is not defined
```

Karena `b` merupakan local variable dari function `confusion()`.

---

## Parameter adalah Local Variable

Perhatikan contoh berikut:

```python
def greet(name):
    message = f"Hello {name}"
    print(message)

greet("Budi")
```

Pada function tersebut terdapat dua variabel lokal:

```text
name
message
```

Keduanya hanya dapat digunakan selama berada pada scope function `greet()`.

Secara sederhana:

```text
Global Scope
│
└── greet()
    ├── name
    └── message
```

---

## Menggunakan Variabel Global di dalam Function

Function dapat **membaca** variabel yang berada di Global Scope.

Contoh:

```python
total = 100

def show_total():
    print(total)

show_total()
```

Output:

```text
100
```

Python tidak menemukan `total` di Local Scope function.

Python kemudian mencari ke Global Scope dan menemukan:

```python
total = 100
```

---

## Masalah ketika Mengubah Variabel Global

Membaca variabel global dan mengubah variabel global adalah dua hal yang berbeda.

Perhatikan contoh berikut:

```python
total = 0

def count():
    total += 1
    return total

count()
```

Kode tersebut menghasilkan error.

Mengapa?

Karena ketika Python melihat:

```python
total += 1
```

Python menganggap `total` sebagai variabel lokal di dalam function.

Namun variabel lokal tersebut belum memiliki nilai awal.

Akibatnya dapat muncul error:

```text
UnboundLocalError
```

---

## Keyword `global`

Python menyediakan keyword `global` untuk memberitahu interpreter bahwa kita ingin menggunakan variabel yang berada di Global Scope.

Contoh:

```python
total = 0

def count():
    global total
    total += 1
    return total

print(count())
print(count())
print(count())
```

Output:

```text
1
2
3
```

Baris:

```python
global total
```

memberitahu Python bahwa `total` yang digunakan di dalam function adalah variabel global.

Dengan demikian:

```python
total += 1
```

akan mengubah nilai `total` yang berada di Global Scope.

---

## Memahami Perubahannya

Sebelum function dijalankan:

```python
total = 0
```

Kemudian:

```python
count()
```

mengubahnya menjadi:

```text
total = 1
```

Pemanggilan kedua:

```python
count()
```

mengubahnya menjadi:

```text
total = 2
```

Pemanggilan ketiga:

```python
count()
```

mengubahnya menjadi:

```text
total = 3
```

Karena function memodifikasi variabel global, nilai tersebut tetap berubah setelah function selesai dijalankan.

---

## `global` Tidak Membuat Variabel Baru

Perhatikan:

```python
total = 0

def count():
    global total
    total += 1
```

Keyword `global` tidak membuat variabel baru.

Keyword tersebut memberitahu Python:

> Gunakan variabel `total` yang sudah berada pada Global Scope.

---

## Mengapa `global` Perlu Digunakan dengan Hati-Hati?

Walaupun `global` dapat menyelesaikan masalah tertentu, penggunaannya secara berlebihan dapat membuat program lebih sulit dipahami.

Contoh:

```python
total = 0

def add():
    global total
    total += 10

def subtract():
    global total
    total -= 5

def reset():
    global total
    total = 0
```

Sekarang beberapa function dapat mengubah variabel yang sama.

Ketika program semakin besar, kita harus melacak:

```text
Siapa yang mengubah total?
Kapan total berubah?
Nilai total sekarang berapa?
```

Hal tersebut dapat membuat proses debugging menjadi lebih sulit.

---

## Side Effect

Function yang mengubah data di luar dirinya dapat menghasilkan **side effect**.

Contoh:

```python
total = 0

def count():
    global total
    total += 1
```

Function `count()` tidak hanya menghasilkan nilai, tetapi juga mengubah keadaan variabel global.

Perubahan tersebut merupakan side effect.

---

## Pendekatan Tanpa `global`

Salah satu pendekatan yang lebih mudah dikontrol adalah memberikan nilai sebagai parameter dan mengembalikan hasilnya menggunakan `return`.

Contoh:

```python
def count(total):
    total += 1
    return total
```

Kemudian:

```python
total = 0

total = count(total)
total = count(total)
total = count(total)

print(total)
```

Output:

```text
3
```

Pada pendekatan ini, function tidak perlu mengetahui atau mengubah variabel global.

---

## Menggunakan Function Secara Berantai

Nilai yang dikembalikan oleh function dapat langsung diberikan sebagai argument kepada pemanggilan function berikutnya.

Contoh:

```python
def count(total):
    total += 1
    return total

total = 0

result = count(count(count(total)))

print(result)
```

Output:

```text
3
```

Alurnya:

```text
total = 0
    ↓
count(0)
    ↓
1
    ↓
count(1)
    ↓
2
    ↓
count(2)
    ↓
3
```

---

## Perbandingan `global` vs Parameter

### Menggunakan `global`

```python
total = 0

def count():
    global total
    total += 1
    return total
```

Function bergantung pada variabel global.

### Menggunakan parameter

```python
def count(total):
    total += 1
    return total
```

Function menerima data dari luar dan mengembalikan hasilnya.

Pendekatan kedua biasanya lebih mudah dipahami dan diuji karena input dan output function terlihat dengan jelas.

---

## Function yang Lebih Independen

Contoh:

```python
def count(total):
    return total + 1
```

Function tersebut tidak bergantung pada variabel global.

Kita dapat memberikan nilai apa pun:

```python
print(count(0))
print(count(10))
print(count(100))
```

Output:

```text
1
11
101
```

Function menjadi lebih fleksibel karena hasilnya hanya bergantung pada argument yang diberikan.

---

## Kapan Menggunakan `global`?

Keyword `global` tetap merupakan bagian dari Python dan ada situasi tertentu di mana penggunaannya dapat dibutuhkan.

Namun, dalam kode aplikasi biasa, sebaiknya jangan menjadikan variabel global yang dapat diubah sebagai mekanisme utama untuk berbagi data antar-function.

Sebisa mungkin pertimbangkan:

- Parameter function.
- `return`.
- Object atau class.
- Struktur data yang dikelola secara jelas.
- Dependency injection.

---

## Ringkasan

| Konsep | Penjelasan |
|---|---|
| **Parameter** | Variabel yang menerima argument ketika function dipanggil |
| **Local Scope** | Scope tempat parameter dan variabel lokal function berada |
| **Global Scope** | Scope pada tingkat paling luar program |
| **`global`** | Memberitahu Python bahwa variabel yang digunakan berasal dari Global Scope |
| **Side Effect** | Perubahan terhadap data di luar function |
| **Parameter + `return`** | Pendekatan yang sering lebih mudah dipahami daripada memodifikasi global variable |

---

## Kesimpulan

Parameter function secara otomatis berada pada **Local Scope**.

Function dapat membaca variabel global, tetapi untuk **mengubah** variabel global dari dalam function, Python membutuhkan keyword:

```python
global
```

Contoh:

```python
total = 0

def count():
    global total
    total += 1
```

Meskipun demikian, penggunaan `global` secara berlebihan dapat membuat program memiliki banyak **side effect** dan lebih sulit dipelihara.

Pendekatan yang sering lebih baik adalah memberikan data melalui parameter dan mengembalikan hasil menggunakan `return`:

```python
def count(total):
    return total + 1
```

Dengan pola tersebut, hubungan antara **input → proses → output** menjadi lebih jelas.