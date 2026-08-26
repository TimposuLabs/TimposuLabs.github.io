---
sidebar_position: 5
title: "Performance Decorator"
---

Decorator tidak hanya digunakan untuk menambahkan perilaku sederhana pada sebuah function. Salah satu penerapan praktisnya adalah membuat **performance decorator** untuk mengukur waktu yang dibutuhkan sebuah function ketika dijalankan.

Dengan pendekatan ini, kita dapat mengukur performa function tanpa harus menambahkan kode pengukuran waktu secara langsung ke dalam setiap function.

## Mengukur Waktu Eksekusi Function

Python menyediakan modul standar `time` yang dapat digunakan untuk mendapatkan waktu saat ini.

Dengan mencatat waktu sebelum dan sesudah function dijalankan, kita dapat menghitung durasi eksekusinya.

Konsep dasarnya:

```text
Waktu mulai
    ↓
Menjalankan function
    ↓
Waktu selesai
    ↓
Waktu selesai - waktu mulai
    ↓
Durasi eksekusi
```

## Membuat Performance Decorator

Berikut contoh performance decorator sederhana:

```python
from time import time


def performance(fn):

    def wrapper(*args, **kwargs):
        # Catat waktu sebelum function dijalankan
        t1 = time()

        # Jalankan function dan simpan hasilnya
        result = fn(*args, **kwargs)

        # Catat waktu setelah function selesai
        t2 = time()

        # Tampilkan durasi eksekusi
        print(f"It took {t2 - t1} seconds")

        # Kembalikan hasil function
        return result

    return wrapper
```

Decorator tersebut kemudian dapat digunakan pada function yang ingin diukur performanya.

```python
@performance
def long_time():
    for i in range(10_000_000):
        i * 5


long_time()
```

Contoh output:

```text
It took 0.35 seconds
```

Nilai waktu dapat berbeda-beda setiap kali program dijalankan karena dipengaruhi oleh kondisi komputer dan lingkungan saat program berjalan.

## Cara Kerja Performance Decorator

Perhatikan bagian berikut:

```python
t1 = time()
```

Kode tersebut mencatat waktu sebelum function dijalankan.

Kemudian:

```python
result = fn(*args, **kwargs)
```

menjalankan function asli dan menyimpan hasilnya ke dalam variable `result`.

Setelah function selesai:

```python
t2 = time()
```

digunakan untuk mencatat waktu akhir.

Durasi eksekusi kemudian diperoleh dengan:

```python
t2 - t1
```

Hasilnya menunjukkan berapa lama function tersebut berjalan.

## Mengapa Menggunakan `*args` dan `**kwargs`?

Performance decorator menggunakan:

```python
def wrapper(*args, **kwargs):
```

agar decorator dapat digunakan pada berbagai function dengan parameter yang berbeda.

Argument tersebut kemudian diteruskan kepada function asli:

```python
result = fn(*args, **kwargs)
```

Dengan demikian, decorator tidak perlu mengetahui terlebih dahulu parameter apa yang dimiliki function yang akan diukur.

Contoh:

```python
@performance
def add(a, b):
    return a + b


@performance
def greet(name):
    return f"Hello {name}"


print(add(10, 20))
print(greet("Andi"))
```

Decorator yang sama dapat digunakan pada kedua function tersebut.

## Mengapa Hasil Function Harus Dikembalikan?

Perhatikan bagian:

```python
return result
```

Performance decorator tidak hanya bertugas mengukur waktu. Function yang dibungkus mungkin juga menghasilkan sebuah nilai yang dibutuhkan oleh program.

Contohnya:

```python
@performance
def calculate():
    return 10 + 20


result = calculate()

print(result)
```

Jika decorator tidak mengembalikan:

```python
return result
```

maka hasil dari function `calculate()` tidak akan diteruskan kepada pemanggil.

Dengan mengembalikan `result`, decorator tetap dapat menambahkan perilaku pengukuran waktu tanpa menghilangkan hasil dari function asli.

## Manfaat Performance Decorator

Performance decorator dapat membantu developer:

- Mengukur waktu eksekusi sebuah function.
- Menemukan function yang membutuhkan waktu lama.
- Membandingkan performa beberapa implementasi.
- Membantu proses optimasi kode.
- Memisahkan kode pengukuran performa dari logika utama function.

Misalnya, daripada menulis kode pengukuran waktu berulang kali:

```python
t1 = time()

# kode function

t2 = time()

print(t2 - t1)
```

kita dapat membuat decorator yang dapat digunakan kembali:

```python
@performance
def function_a():
    ...


@performance
def function_b():
    ...


@performance
def function_c():
    ...
```

Hal ini menunjukkan salah satu manfaat utama decorator, yaitu **reusability**.

## Penerapan Decorator di Dunia Nyata

Konsep decorator banyak digunakan dalam pengembangan aplikasi Python, terutama pada framework dan library.

Beberapa penerapannya antara lain:

### Authentication dan Authorization

Decorator dapat digunakan untuk memastikan bahwa suatu function hanya dapat dijalankan oleh pengguna yang memiliki hak akses tertentu.

Secara konsep:

```text
User
 ↓
Decorator
 ↓
Periksa autentikasi
 ↓
Boleh menjalankan function?
```

Contohnya dapat ditemukan pada aplikasi web untuk membatasi akses ke halaman atau endpoint tertentu.

### Logging

Decorator dapat digunakan untuk mencatat aktivitas ketika sebuah function dijalankan.

Misalnya:

```text
Function dipanggil
       ↓
Decorator
       ↓
Catat aktivitas
       ↓
Jalankan function
```

Pendekatan ini dapat digunakan untuk mencatat aktivitas pengguna atau proses tertentu dalam aplikasi.

### Performance Monitoring

Decorator juga dapat digunakan untuk mengukur dan memantau waktu eksekusi function.

Dengan demikian, developer dapat mengetahui bagian program yang membutuhkan optimasi lebih lanjut.

## Hal yang Perlu Diperhatikan

Pengukuran waktu dengan decorator seperti contoh di atas berguna untuk **pengukuran sederhana**, tetapi hasilnya tidak selalu cukup untuk melakukan benchmarking yang akurat.

Waktu eksekusi dapat dipengaruhi oleh berbagai faktor, seperti:

- Beban komputer.
- Sistem operasi.
- Proses lain yang sedang berjalan.
- Jumlah iterasi.
- Kondisi lingkungan eksekusi.

Untuk kebutuhan benchmarking yang lebih serius, Python menyediakan tools khusus seperti modul `timeit`.

Pada tahap ini, tujuan utama performance decorator adalah memahami bagaimana **decorator dapat digunakan untuk menambahkan perilaku pengukuran performa tanpa mengubah function asli**.

## Kesimpulan

Performance decorator merupakan contoh penerapan nyata dari konsep decorator.

Decorator dapat:

1. Menerima function.
2. Menjalankan kode sebelum function.
3. Menjalankan function asli.
4. Menjalankan kode setelah function.
5. Mengembalikan hasil dari function asli.

Pola tersebut dapat digambarkan sebagai:

```text
                Decorator
                    │
                    ▼
             ┌─────────────┐
             │   Wrapper   │
             │             │
             │ Catat waktu │
             │      ↓      │
             │ Function    │
             │      ↓      │
             │ Catat waktu │
             └─────────────┘
                    │
                    ▼
             Hasil Function
```

Performance decorator menunjukkan bahwa decorator bukan hanya fitur sintaksis Python, tetapi dapat digunakan untuk membangun komponen yang **reusable**, seperti logging, authentication, validation, dan performance monitoring.