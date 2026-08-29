---
sidebar_position: 10
title: "Useful Modules Standard Library"
---

Python menyediakan **Standard Library** yang berisi berbagai module siap pakai untuk membantu menyelesaikan kebutuhan pemrograman.

Dengan Standard Library, kita tidak selalu perlu membuat functionality dari awal atau menginstal third-party package.

Pada materi ini kita akan mengenal beberapa module yang cukup berguna dalam pengembangan Python:

- `collections`
- `array`
- `datetime`
- `sys`
- `os`

---

## Modul `collections`

Module `collections` menyediakan struktur data tambahan yang melengkapi struktur data dasar Python seperti:

```text
list
tuple
dict
set
```

Beberapa object yang tersedia di dalam `collections` adalah:

```text
Counter
defaultdict
OrderedDict
```

### `Counter`

`Counter` digunakan untuk menghitung jumlah kemunculan setiap elemen dalam sebuah iterable.

Contoh:

```python
from collections import Counter

li = [1, 2, 3, 4, 5, 6, 7, 7, 7]

print(Counter(li))
```

Output:

```text
Counter({7: 3, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1})
```

`Counter` juga dapat digunakan untuk menghitung frekuensi karakter dalam string.

```python
from collections import Counter

sentence = "belajar python itu menyenangkan"

print(Counter(sentence))
```

`Counter` sangat berguna ketika kita membutuhkan informasi mengenai **frekuensi kemunculan data**.

Contoh penggunaannya:

```text
Menghitung jumlah karakter
Menghitung jumlah kata
Menghitung frekuensi data
Mencari elemen yang paling sering muncul
```

### `defaultdict`

`defaultdict` merupakan variasi dari dictionary yang menyediakan **default value** ketika key yang diminta belum tersedia.

Pada dictionary biasa:

```python
dictionary = {
    "a": 1,
    "b": 2
}

print(dictionary["c"])
```

akan menghasilkan:

```text
KeyError
```

Dengan `defaultdict`, kita dapat menentukan nilai default.

```python
from collections import defaultdict

dictionary = defaultdict(
    lambda: 5,
    {
        "a": 1,
        "b": 2
    }
)

print(dictionary["c"])
```

Output:

```text
5
```

### `OrderedDict`

`OrderedDict` merupakan struktur dictionary yang mempertahankan urutan elemen berdasarkan urutan saat elemen dimasukkan.

Contoh:

```python
from collections import OrderedDict

dictionary = OrderedDict()

dictionary["a"] = 1
dictionary["b"] = 2
dictionary["c"] = 3

print(dictionary)
```

Pada Python modern, `dict` standar juga mempertahankan insertion order.

Oleh karena itu, `OrderedDict` tidak selalu diperlukan hanya untuk mempertahankan urutan.

Namun, `OrderedDict` masih memiliki functionality khusus yang dapat berguna pada kasus tertentu.

---

## Modul `array`

Python memiliki `list` yang sangat fleksibel.

Contohnya:

```python
data = [1, 2, 3, 4, 5]
```

`list` bahkan dapat menyimpan berbagai jenis object:

```python
data = [1, "Python", 3.14, True]
```

Fleksibilitas tersebut membuat `list` sangat nyaman digunakan, tetapi juga memiliki memory overhead tertentu.

Module `array` menyediakan struktur data yang dirancang untuk menyimpan elemen dengan **tipe data yang sama**.

### Membuat `array`

```python
from array import array

arr = array("i", [1, 2, 3, 4, 5])

print(arr)
```

Pada contoh tersebut:

```text
i
```

merupakan type code untuk signed integer.

### Mengakses Elemen

Cara mengakses elemen `array` mirip dengan `list`.

```python
from array import array

arr = array("i", [1, 2, 3, 4, 5])

print(arr[0])
```

Output:

```text
1
```

### `array` vs `list`

| Karakteristik | `list` | `array` |
| --- | --- | --- |
| Tipe data | Fleksibel | Homogen |
| Fleksibilitas | Tinggi | Lebih terbatas |
| Penggunaan umum | Sangat umum | Kasus tertentu |
| Data numerik | Bisa | Cocok |
| Efisiensi memori | Lebih banyak overhead | Dapat lebih efisien |

`array` dapat dipertimbangkan ketika kita memiliki data dalam jumlah besar dengan tipe data yang sama dan efisiensi memori menjadi pertimbangan.

Untuk penggunaan Python sehari-hari, `list` tetap menjadi pilihan default yang sangat umum.

---

## Modul `datetime`

Module `datetime` digunakan untuk mengelola dan memanipulasi **tanggal dan waktu**.

Module ini dapat digunakan untuk kebutuhan seperti:

```text
Tanggal
Waktu
DateTime
Perhitungan tanggal
Perhitungan waktu
Selisih waktu
Timestamp
```

Contoh penggunaan dapat ditemukan pada:

```text
Sistem transaksi
Sistem penjadwalan
Log aplikasi
Pencatatan waktu
Perhitungan batas waktu
```

### Membuat Object `time`

Python menyediakan `datetime.time` untuk merepresentasikan waktu.

```python
import datetime

waktu = datetime.time(5, 45, 2)

print(waktu)
print(waktu.hour)
```

Output:

```text
05:45:02
5
```

Object `time` dapat menyimpan informasi:

```text
Jam
Menit
Detik
Mikrodetik
```

### Mengakses Komponen Waktu

```python
import datetime

waktu = datetime.time(5, 45, 2)

print(waktu.hour)
print(waktu.minute)
print(waktu.second)
```

Output:

```text
5
45
2
```

### Mendapatkan Tanggal Hari Ini

Untuk mendapatkan tanggal saat ini:

```python
import datetime

hari_ini = datetime.date.today()

print(hari_ini)
```

Output mengikuti tanggal pada sistem komputer:

```text
YYYY-MM-DD
```

Contoh:

```text
2026-08-29
```

### Mengakses Komponen Tanggal

```python
import datetime

hari_ini = datetime.date.today()

print(hari_ini.year)
print(hari_ini.month)
print(hari_ini.day)
```

Attribute yang umum digunakan:

```text
year
 ↓
Tahun

month
 ↓
Bulan

day
 ↓
Tanggal
```

### Kapan Menggunakan `datetime`?

Gunakan `datetime` ketika program membutuhkan informasi atau operasi yang berkaitan dengan tanggal dan waktu.

Contohnya:

```text
Mencatat waktu transaksi
Mencatat waktu login
Membuat jadwal
Menghitung selisih tanggal
Menghitung durasi
Membuat timestamp
```

---

## Modul `sys`

Module `sys` digunakan untuk berinteraksi dengan **Python interpreter** dan environment tempat program Python berjalan.

Salah satu functionality yang telah dipelajari sebelumnya adalah:

```python
sys.argv
```

yang memungkinkan program menerima argument dari command line.

Contoh:

```python
import sys

print(sys.argv)
```

Jika program dijalankan:

```bash
python app.py hello
```

maka `hello` akan menjadi salah satu argument yang tersedia melalui `sys.argv`.

Module `sys` dapat digunakan ketika program perlu berinteraksi dengan informasi atau mekanisme yang berkaitan dengan Python interpreter.

---

## Modul `os`

Module `os` digunakan untuk berinteraksi dengan **operating system**.

Module ini dapat digunakan untuk berbagai kebutuhan yang berhubungan dengan sistem operasi dan file system.

Contohnya:

```text
Membaca directory
Membuat directory
Memeriksa path
Mengakses environment variable
Berinteraksi dengan file system
```

Contoh mendapatkan current working directory:

```python
import os

print(os.getcwd())
```

Contoh melihat isi directory:

```python
import os

print(os.listdir())
```

Hasilnya berupa daftar file dan folder yang terdapat pada current working directory.

---

## `sys` vs `os`

Walaupun sama-sama berhubungan dengan lingkungan tempat program berjalan, keduanya memiliki fokus yang berbeda.

| Module | Fokus |
| --- | --- |
| `sys` | Python interpreter dan runtime environment |
| `os` | Operating system dan file system |

Secara sederhana:

```text
sys
 ↓
Python Interpreter
```

sedangkan:

```text
os
 ↓
Operating System
```

---

## Kapan Menggunakan Module-Module Ini?

Pemilihan module bergantung pada masalah yang ingin diselesaikan.

### Menghitung Frekuensi Data

Gunakan:

```python
from collections import Counter
```

Contoh:

```text
Menghitung karakter
Menghitung kata
Menghitung jumlah kemunculan data
```

### Dictionary dengan Default Value

Gunakan:

```python
from collections import defaultdict
```

Contoh:

```text
Mengelompokkan data
Menghitung data
Memberikan nilai default
```

### Menyimpan Data Homogen

Gunakan:

```python
from array import array
```

terutama ketika data memiliki tipe yang sama dan efisiensi penyimpanan menjadi pertimbangan.

### Mengelola Tanggal dan Waktu

Gunakan:

```python
import datetime
```

### Berinteraksi dengan Python Interpreter

Gunakan:

```python
import sys
```

### Berinteraksi dengan Operating System

Gunakan:

```python
import os
```

---

## Ringkasan Module

| Module | Kegunaan |
| --- | --- |
| `collections` | Struktur data dan pengolahan data khusus |
| `Counter` | Menghitung frekuensi elemen |
| `defaultdict` | Dictionary dengan default value |
| `OrderedDict` | Dictionary dengan pengelolaan urutan tertentu |
| `array` | Menyimpan data homogen |
| `datetime` | Mengelola tanggal dan waktu |
| `sys` | Berinteraksi dengan Python interpreter |
| `os` | Berinteraksi dengan operating system |

---

## Mengapa Perlu Mengenal Standard Library?

Salah satu kebiasaan penting dalam pemrograman Python adalah memeriksa apakah functionality yang dibutuhkan sudah tersedia di **Standard Library** sebelum membuat solusi sendiri atau memasang third-party package.

Contohnya:

```text
Membutuhkan random data
        ↓
    random
```

```text
Membutuhkan tanggal dan waktu
        ↓
    datetime
```

```text
Membutuhkan frekuensi data
        ↓
collections.Counter
```

```text
Membutuhkan informasi interpreter
        ↓
       sys
```

```text
Membutuhkan operasi sistem
        ↓
        os
```

Dengan mengenali Standard Library, kita dapat memanfaatkan functionality yang sudah tersedia dan menghindari pembuatan solusi dari awal ketika tidak diperlukan.

---

## Kesimpulan

Beberapa module Standard Library yang penting untuk mulai dikenali adalah:

```text
collections
    ↓
Struktur dan pengolahan data

  array
    ↓
Data homogen

datetime
    ↓
Tanggal dan waktu

   sys
    ↓
Python interpreter

   os
    ↓
Operating system
```

Tidak perlu menghafal seluruh function yang tersedia pada setiap module.

Yang lebih penting adalah memahami **fungsi utama sebuah module dan mengetahui kapan module tersebut dapat digunakan untuk menyelesaikan suatu masalah**.

Dengan demikian, ketika menghadapi kebutuhan tertentu dalam project, kita dapat mencari solusi terlebih dahulu dari Standard Library sebelum membuat implementasi sendiri atau menggunakan third-party package.