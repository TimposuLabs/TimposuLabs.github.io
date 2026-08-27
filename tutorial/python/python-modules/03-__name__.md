---
sidebar_position: 3
title: "__name__"
---

Ketika Python menjalankan sebuah file, Python secara otomatis menyediakan **special variable** bernama `__name__`.

Nilai dari `__name__` bergantung pada bagaimana file tersebut digunakan.

Jika sebuah file dijalankan secara langsung, Python memberikan nilai:

```python
"__main__"
```

Sedangkan jika file tersebut digunakan sebagai module melalui `import`, nilai `__name__` akan menunjukkan nama module tersebut.

Konsep ini sangat penting ketika sebuah file Python dapat berfungsi sebagai **module** sekaligus sebagai **program yang dapat dijalankan secara langsung**.

## Special Variable `__name__`

`__name__` merupakan salah satu **special variable** dalam Python.

Ketika sebuah file Python dijalankan, Python menentukan nilai `__name__` berdasarkan konteks eksekusinya.

Ada dua kondisi utama:

```text
File dijalankan langsung
         ↓
__name__ = "__main__"
```

atau:

```text
File di-import
         ↓
__name__ = nama module
```

## Ketika File Dijalankan Langsung

Misalnya kita memiliki file:

```text
app.py
```

Kemudian menjalankannya melalui terminal:

```text
python app.py
```

Python akan memberikan nilai:

```python
__name__ = "__main__"
```

Artinya, file tersebut sedang berperan sebagai **program utama**.

Contoh:

```python
print(__name__)
```

Jika `app.py` dijalankan secara langsung, outputnya:

```text
__main__
```

## Ketika File Diimpor

Sekarang misalkan kita memiliki:

```text
project/
├── main.py
└── utility.py
```

Di dalam `utility.py`:

```python
print(__name__)
```

Kemudian `main.py` melakukan:

```python
import utility
```

Ketika `main.py` dijalankan, `utility.py` tidak dijalankan sebagai program utama.

Python akan memberikan nilai `__name__` sesuai nama module:

```text
utility
```

Sehingga:

```text
main.py
   ↓
import utility
   ↓
utility.py
   ↓
__name__ = "utility"
```

## Perbedaan `__name__`

Perilaku `__name__` dapat diringkas:

| Kondisi | Nilai `__name__` |
| --- | --- |
| File dijalankan langsung | `"__main__"` |
| File di-import sebagai module | Nama module |

Contohnya:

```text
python app.py
     ↓
__name__ = "__main__"
```

Sedangkan:

```text
import utility
     ↓
__name__ = "utility"
```

## `if __name__ == "__main__":`

Python menyediakan pola yang sangat umum:

```python
if __name__ == "__main__":
    ...
```

Pengecekan tersebut digunakan untuk memastikan bahwa kode tertentu hanya dijalankan ketika file tersebut dieksekusi secara langsung.

Contohnya:

```python
def main():
    print("Program utama sedang berjalan...")


if __name__ == "__main__":
    main()
```

Jika file dijalankan secara langsung:

```text
python app.py
```

maka:

```python
__name__ == "__main__"
```

bernilai `True`.

Function `main()` kemudian dijalankan.

## Apa yang Terjadi Saat Di-Import?

Misalnya file tersebut bernama:

```text
app.py
```

Kemudian file lain melakukan:

```python
import app
```

Dalam kondisi tersebut:

```python
__name__ == "app"
```

bukan:

```python
__name__ == "__main__"
```

Akibatnya kondisi:

```python
if __name__ == "__main__":
```

bernilai `False`.

Kode di dalam blok tersebut tidak dijalankan.

Namun, function dan class yang didefinisikan di dalam module tetap dapat digunakan oleh file yang melakukan import.

## Mengapa Pola Ini Penting?

Tanpa pengecekan:

```python
if __name__ == "__main__":
```

kode yang berada di luar function atau class dapat ikut dijalankan ketika module di-import.

Misalnya:

```python
def hello():
    print("Hello")


print("Testing module...")
```

Jika file tersebut di-import:

```python
import utility
```

maka:

```text
Testing module...
```

tetap akan dijalankan.

Hal tersebut mungkin tidak diinginkan.

Dengan menggunakan:

```python
def hello():
    print("Hello")


if __name__ == "__main__":
    print("Testing module...")
```

kode testing hanya dijalankan ketika file tersebut dieksekusi secara langsung.

## Mencegah Eksekusi yang Tidak Diinginkan

Pola ini sangat berguna ketika sebuah module memiliki kode yang digunakan untuk:

- Menjalankan program utama.
- Melakukan pengujian sederhana.
- Menjalankan demo.
- Melakukan testing terhadap function.
- Menjalankan proses tertentu hanya ketika file dieksekusi langsung.

Misalnya:

```python
def calculate():
    return 10 + 20


if __name__ == "__main__":
    print(calculate())
```

Ketika file dijalankan langsung:

```text
30
```

Tetapi ketika module di-import:

```python
import utility
```

kode:

```python
print(calculate())
```

tidak otomatis dijalankan.

Function `calculate()` tetap tersedia:

```python
print(utility.calculate())
```

## `main()` sebagai Entry Point

Pola yang sering digunakan adalah membuat function `main()` sebagai tempat menjalankan program utama.

Contohnya:

```python
def main():
    print("Program dimulai")
    print("Menjalankan aplikasi...")


if __name__ == "__main__":
    main()
```

Struktur ini membuat kode lebih terorganisir.

Secara konseptual:

```text
File Python
    ↓
Definisi function / class
    ↓
main()
    ↓
if __name__ == "__main__"
    ↓
Program dijalankan
```

`if __name__ == "__main__":` dapat dianggap sebagai salah satu bentuk **entry point** sederhana untuk sebuah file Python.

## Module yang Dapat Digunakan dengan Dua Cara

Salah satu keuntungan pola ini adalah sebuah file dapat memiliki dua fungsi:

```text
                 File Python
                     │
          ┌──────────┴──────────┐
          ↓                     ↓
    Di-import               Dijalan langsung
          ↓                     ↓
   Menjadi module        Menjadi program utama
          ↓                     ↓
__name__ = "module"   __name__ = "__main__"
```

Dengan demikian, sebuah file dapat menyediakan function atau class untuk digunakan oleh module lain sekaligus memiliki kode yang dapat dijalankan secara langsung.

## Contoh Struktur Project

Misalnya:

```text
project/
├── main.py
└── utility.py
```

`utility.py`:

```python
def multiply(num1, num2):
    return num1 * num2


if __name__ == "__main__":
    print(multiply(2, 3))
```

Jika `utility.py` dijalankan langsung:

```text
python utility.py
```

maka output:

```text
6
```

Namun jika `utility.py` di-import:

```python
import utility

print(utility.multiply(4, 5))
```

output:

```text
20
```

Kode di dalam:

```python
if __name__ == "__main__":
```

tidak dijalankan ketika module di-import.

## Hubungan dengan Module dan Package

Konsep `__name__` sangat berkaitan dengan materi **Module** dan **Package**.

Sebelumnya kita telah mempelajari:

```text
Project
   ↓
Package
   ↓
Module
   ↓
Function / Class
```

Ketika module digunakan melalui `import`, Python mengetahui module tersebut berdasarkan konteksnya.

Misalnya:

```python
import shopping.shopping_cart
```

maka nama module dapat berkaitan dengan:

```text
shopping.shopping_cart
```

Sedangkan file yang sedang dijalankan langsung memiliki:

```python
__name__ = "__main__"
```

## Kesimpulan

`__name__` adalah special variable yang nilainya bergantung pada bagaimana sebuah file Python digunakan.

Jika file dijalankan secara langsung:

```python
__name__ == "__main__"
```

Jika file di-import sebagai module:

```python
__name__ == "nama_module"
```

Karena itu, pola:

```python
if __name__ == "__main__":
    main()
```

digunakan untuk menjalankan kode tertentu **hanya ketika file dieksekusi secara langsung**.

Konsep utamanya:

```text
File dijalankan langsung
        ↓
__name__ == "__main__"
        ↓
Kode utama dijalankan
```

Sedangkan:

```text
File di-import
        ↓
__name__ == nama_module
        ↓
Kode dalam if tidak dijalankan
        ↓
Function / class tetap dapat digunakan
```

Pemahaman `__name__` dan `__main__` menjadi penting ketika mulai membangun project Python yang terdiri dari banyak **module dan package**, karena membantu menentukan bagian mana yang hanya berfungsi sebagai program utama dan bagian mana yang dapat digunakan kembali oleh module lainnya.