---
sidebar_position: 18
title: "Functions"
---

**Function** atau fungsi adalah blok kode yang dibuat untuk menjalankan tugas tertentu. Fungsi memungkinkan kita mengelompokkan kode yang memiliki tujuan yang sama sehingga dapat digunakan kembali ketika dibutuhkan.

Penggunaan fungsi merupakan salah satu konsep penting dalam pemrograman karena membantu membuat kode menjadi lebih terstruktur, mudah dibaca, dan mengurangi pengulangan kode.

---

## Pengertian Function

Function adalah blok kode yang dapat dipanggil untuk menjalankan serangkaian instruksi tertentu.

Sebagai contoh, jika sebuah program membutuhkan proses untuk menampilkan pesan "Hello" beberapa kali, kita tidak perlu menulis kode `print()` berulang-ulang. Kita dapat membuat sebuah fungsi dan memanggilnya setiap kali diperlukan.

Python memiliki dua jenis fungsi yang umum digunakan:

1. **Built-in Functions**

   Fungsi yang sudah disediakan oleh Python.

   Contohnya:

   - `print()`
   - `len()`
   - `input()`
   - `max()`
   - `min()`
   - `type()`

2. **Custom Functions**

   Fungsi yang dibuat sendiri oleh programmer sesuai kebutuhan program.

---

## Membuat Function

Untuk membuat fungsi sendiri, Python menggunakan keyword `def`.

Sintaks dasar:

```python
def nama_fungsi():
    # kode di dalam fungsi
```

Contoh:

```python
def say_hello():
    print('Hello World')
```

Pada contoh tersebut, kita membuat fungsi bernama `say_hello`.

Namun, mendefinisikan fungsi belum membuat kode di dalamnya dijalankan.

---

## Memanggil Function

Setelah fungsi dibuat, kita dapat menjalankannya dengan memanggil nama fungsi tersebut:

```python
def say_hello():
    print('Hello World')

say_hello()
```

Output:

```text
Hello World
```

Fungsi dapat dipanggil berkali-kali:

```python
def say_hello():
    print('Hello World')

say_hello()
say_hello()
say_hello()
```

Output:

```text
Hello World
Hello World
Hello World
```

Dengan demikian, kita tidak perlu menulis ulang kode `print('Hello World')`.

---

## Definition dan Execution

Dalam function terdapat dua konsep yang perlu dibedakan, yaitu **definition** dan **execution**.

### Function Definition

Function definition adalah proses membuat atau mendefinisikan sebuah fungsi menggunakan `def`.

```python
def say_hello():
    print('Hello World')
```

Pada tahap ini, Python belum menjalankan `print('Hello World')`.

Python hanya membuat objek fungsi yang dapat digunakan nantinya.

### Function Execution

Function execution terjadi ketika fungsi dipanggil:

```python
say_hello()
```

Pada saat itulah Python menjalankan kode yang berada di dalam fungsi.

---

## Analogi Sederhana

Function dapat dianalogikan seperti sebuah mesin.

Kita terlebih dahulu membuat mesin:

```python
def say_hello():
    print('Hello World')
```

Kemudian mesin tersebut dijalankan:

```python
say_hello()
```

Jika membutuhkan hasil yang sama lagi, kita cukup menjalankan mesin tersebut kembali:

```python
say_hello()
```

Konsep ini membuat fungsi sangat berguna untuk kode yang perlu digunakan berulang kali.

---

## Function Tanpa Parameter

Function dapat dibuat tanpa menerima data dari luar.

Contoh:

```python
def greet():
    print('Selamat datang di Python!')

greet()
```

Output:

```text
Selamat datang di Python!
```

Function `greet()` tidak membutuhkan informasi tambahan untuk menjalankan tugasnya.

---

## Mengapa Function Penting?

Penggunaan function memberikan beberapa keuntungan dalam pengembangan program.

### 1. Reusability

Kode dapat digunakan kembali tanpa perlu menulis ulang instruksi yang sama.

### 2. Mengurangi Duplikasi

Function membantu menerapkan prinsip **DRY (Don't Repeat Yourself)** sehingga kode yang sama tidak perlu ditulis berkali-kali.

### 3. Modularisasi

Program besar dapat dipecah menjadi beberapa fungsi kecil berdasarkan tugas masing-masing.

Sebagai contoh, sebuah aplikasi dapat memiliki fungsi:

```text
login()
register()
logout()
calculate_total()
send_email()
```

Setiap fungsi bertanggung jawab terhadap satu tugas tertentu.

### 4. Readability

Function membuat kode lebih mudah dibaca karena nama fungsi dapat menjelaskan tujuan dari sekumpulan kode.

Contohnya:

```python
calculate_total()
```

Lebih mudah dipahami daripada melihat sekumpulan operasi matematika yang panjang secara langsung di dalam program utama.

---

## Penamaan Function

Python umumnya menggunakan gaya penamaan **snake_case** untuk function.

Contoh yang baik:

```python
def calculate_total():
    pass

def get_user_data():
    pass

def send_email():
    pass
```

Sebaiknya gunakan nama yang menjelaskan tugas yang dilakukan oleh function.

Hindari nama yang terlalu umum seperti:

```python
def function1():
    pass
```

Nama seperti `function1()` tidak memberikan informasi mengenai tujuan fungsi tersebut.

---

## Contoh Function Sederhana

```python
def show_profile():
    print('Name: Andrei')
    print('Age: 30')
    print('Profession: Developer')

show_profile()
```

Output:

```text
Name: Andrei
Age: 30
Profession: Developer
```

Dengan function tersebut, seluruh instruksi untuk menampilkan profil dikelompokkan menjadi satu bagian yang dapat digunakan kembali.

---

## Ringkasan

Beberapa konsep penting yang perlu dipahami:

1. **Function** adalah blok kode yang digunakan untuk menjalankan tugas tertentu.
2. Function dibuat menggunakan keyword `def`.
3. Function tidak langsung dijalankan ketika didefinisikan.
4. Function dijalankan ketika dipanggil menggunakan `()`.
5. Function membantu mengurangi pengulangan kode.
6. Function mendukung prinsip **DRY (Don't Repeat Yourself)**.
7. Function membantu membagi program menjadi bagian-bagian yang lebih kecil dan terstruktur.
8. Penamaan function sebaiknya jelas dan menggunakan gaya **snake_case**.