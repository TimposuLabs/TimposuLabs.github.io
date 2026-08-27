---
sidebar_position: 9
---

# Python Modules

## Mengapa Membutuhkan Modul?

Seiring berkembangnya sebuah proyek Python, jumlah kode yang ditulis juga akan semakin banyak. Jika seluruh function, class, dan variable ditempatkan dalam satu file `.py`, kode dapat menjadi sulit dibaca, dipelihara, dan dikembangkan.

Python menyediakan konsep **module** untuk membantu mengorganisasi kode menjadi beberapa file yang memiliki tanggung jawab tertentu.

Dengan module, kode dapat dipisahkan berdasarkan fungsi atau kegunaannya sehingga struktur proyek menjadi lebih teratur dan kode dapat digunakan kembali.

## Apa Itu Module?

**Module** adalah sebuah file Python dengan ekstensi `.py` yang digunakan untuk mengorganisasi kode seperti:

- Function.
- Class.
- Variable.
- Konstanta.
- Kode Python lainnya.

Sebagai contoh, sebuah proyek dapat memiliki struktur:

```text
project/
├── main.py
├── utility.py
└── database.py
```

Masing-masing file tersebut dapat digunakan sebagai module.

Konsep sederhananya:

```text
Satu proyek
    ↓
Beberapa module
    ↓
Setiap module memiliki tanggung jawab tertentu
```

Dengan pendekatan ini, kode tidak harus ditempatkan seluruhnya dalam satu file.

## Keuntungan Menggunakan Module

Penggunaan module memberikan beberapa keuntungan dalam pengembangan program.

### Organisasi Kode

Kode dapat dikelompokkan berdasarkan tanggung jawabnya.

Misalnya:

```text
utility.py
    ↓
Function utilitas

database.py
    ↓
Function database

authentication.py
    ↓
Function autentikasi
```

Struktur seperti ini membuat kode lebih mudah ditemukan dan dipahami.

### Reusability

Kode yang berada dalam sebuah module dapat digunakan kembali oleh file Python lainnya.

Dengan demikian, kita tidak perlu menulis function yang sama berulang kali pada beberapa file.

### Maintainability

Ketika proyek semakin besar, pemisahan kode ke dalam beberapa module membuat perubahan dan pemeliharaan kode menjadi lebih mudah.

### Kolaborasi

Dalam proyek yang dikerjakan oleh beberapa developer, pembagian kode berdasarkan module juga dapat membantu setiap bagian proyek dikembangkan secara lebih terorganisir.

## Aturan Penamaan Module

Module pada Python umumnya menggunakan nama file dengan format yang sederhana.

Konvensi yang umum digunakan adalah **snake_case**, yaitu menggunakan huruf kecil dan `_` sebagai pemisah kata.

Contoh nama module yang baik:

```text
utility.py
database_connector.py
user_service.py
data_processing.py
```

Sebaiknya hindari nama module yang membingungkan atau memiliki nama yang sama dengan module standar Python yang ingin digunakan.

## Membuat Module

Misalnya kita membuat file:

```text
utility.py
```

Kemudian kita memasukkan beberapa function ke dalamnya:

```python
def multiply(num1, num2):
    return num1 * num2


def divide(num1, num2):
    return num1 / num2
```

File tersebut sekarang dapat digunakan sebagai module.

## Mengimpor Module

Untuk menggunakan kode dari module lain, Python menyediakan keyword `import`.

Misalnya terdapat dua file:

```text
project/
├── main.py
└── utility.py
```

Pada `utility.py`:

```python
def multiply(num1, num2):
    return num1 * num2


def divide(num1, num2):
    return num1 / num2
```

Kemudian pada `main.py`:

```python
import utility
```

Setelah module diimpor, function di dalamnya dapat digunakan melalui nama module.

```python
print(utility.multiply(2, 3))
print(utility.divide(10, 2))
```

Output:

```text
6
5.0
```

Pola dasarnya:

```text
import utility
       ↓
utility.multiply()
       ↓
menjalankan function multiply()
```

## Mengapa Tidak Menggunakan `.py`?

Ketika melakukan import module, ekstensi `.py` tidak dituliskan.

Gunakan:

```python
import utility
```

bukan:

```python
import utility.py
```

Python akan mencari module berdasarkan nama yang diberikan.

## Mengakses Isi Module

Setelah module diimpor, kita dapat mengakses object yang berada di dalamnya menggunakan operator titik `.`.

Contohnya:

```python
utility.multiply(2, 3)
```

Strukturnya:

```text
nama_module.nama_object
```

Misalnya:

```python
utility.multiply()
utility.divide()
```

Dengan cara ini, kita dapat mengetahui dengan jelas bahwa function tersebut berasal dari module `utility`.

## Module sebagai Pemisah Tanggung Jawab

Module akan menjadi semakin bermanfaat ketika proyek memiliki banyak bagian.

Misalnya sebuah aplikasi memiliki fitur:

```text
Aplikasi
├── User
├── Authentication
├── Database
├── Reporting
└── Utility
```

Kode tersebut dapat dipisahkan:

```text
project/
├── main.py
├── user.py
├── authentication.py
├── database.py
├── reporting.py
└── utility.py
```

Setiap module memiliki tanggung jawab masing-masing.

Hal ini dikenal sebagai pemisahan tanggung jawab atau **separation of concerns**.

## Module dan Reusability

Salah satu manfaat utama module adalah memungkinkan kode digunakan kembali.

Misalnya `utility.py` memiliki:

```python
def multiply(num1, num2):
    return num1 * num2
```

Function tersebut dapat digunakan oleh beberapa file yang membutuhkan operasi tersebut.

```text
main.py
    ↓
import utility
    ↓
utility.multiply()

report.py
    ↓
import utility
    ↓
utility.multiply()
```

Dengan demikian, function tidak perlu ditulis ulang di setiap file.

## Folder `__pycache__`

Ketika Python menjalankan program yang melakukan import terhadap module, kita mungkin menemukan folder:

```text
__pycache__
```

Folder tersebut dibuat secara otomatis oleh Python.

Contoh struktur proyek:

```text
project/
├── main.py
├── utility.py
└── __pycache__/
```

## Apa Itu `__pycache__`?

`__pycache__` merupakan folder yang digunakan Python untuk menyimpan hasil kompilasi bytecode dari module tertentu.

File di dalamnya biasanya memiliki ekstensi:

```text
.pyc
```

Bytecode tersebut digunakan oleh Python sebagai bagian dari proses eksekusi program.

Secara sederhana:

```text
utility.py
     ↓
Python memproses module
     ↓
bytecode
     ↓
__pycache__/
```

## Mengapa `__pycache__` Dibuat?

Python dapat menyimpan bytecode module sehingga proses berikutnya dapat menggunakan hasil kompilasi tersebut ketika sesuai.

Tujuannya adalah membantu proses loading dan eksekusi module menjadi lebih efisien.

Developer biasanya **tidak perlu mengubah isi `__pycache__` secara manual**.

Folder tersebut dikelola oleh Python.

## Apakah `__pycache__` Harus Dibuat Sendiri?

Tidak.

Ketika diperlukan, Python akan membuat folder tersebut secara otomatis.

Kita cukup fokus pada source code seperti:

```text
main.py
utility.py
```

Python akan mengelola:

```text
__pycache__/
```

secara otomatis.

## Struktur Sederhana Module

Contoh sederhana sebuah proyek:

```text
project/
│
├── main.py
│
├── utility.py
│
└── __pycache__/
```

Alur penggunaannya:

```text
main.py
   ↓
import utility
   ↓
utility.py
   ↓
Menggunakan function
```

Python kemudian dapat menghasilkan:

```text
__pycache__/
```

untuk kebutuhan internalnya.

## Kesimpulan

**Module** merupakan salah satu cara Python untuk mengorganisasi kode dengan memisahkannya ke dalam file-file `.py`.

Dengan module, sebuah proyek dapat memiliki struktur yang lebih teratur dan setiap bagian kode dapat memiliki tanggung jawab yang lebih jelas.

Konsep utamanya:

```text
Module
 ↓
File .py
 ↓
Berisi function, class, variable, dan kode lainnya
 ↓
Dapat digunakan oleh module lain
```

Untuk menggunakan module, kita dapat menggunakan:

```python
import nama_module
```

Kemudian mengakses object di dalamnya menggunakan:

```python
nama_module.nama_object
```

Selain itu, Python dapat membuat folder `__pycache__` untuk menyimpan bytecode hasil pemrosesan module.

Pada materi berikutnya, pembahasan dapat dilanjutkan dengan **berbagai cara melakukan import**, termasuk mengimpor object tertentu dari module dan penggunaan alias untuk membuat kode lebih praktis.