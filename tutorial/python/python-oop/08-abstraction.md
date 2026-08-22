---
sidebar_position: 8
title: "Abstraction"
---

**Abstraction** atau **Abstraksi** merupakan salah satu dari empat pilar utama Object-Oriented Programming (OOP).

Jika encapsulation berfokus pada bagaimana data dan perilaku dikelompokkan dalam satu class, abstraction berfokus pada **menyembunyikan detail implementasi yang tidak perlu diketahui dan hanya menampilkan bagian penting kepada pengguna**.

Secara sederhana:

```text
Detail Implementasi
        ↓
   Disembunyikan
        ↓
Interface Sederhana
        ↓
      User
```

Dengan abstraksi, pengguna dapat menggunakan suatu object tanpa harus memahami seluruh proses yang terjadi di dalamnya.

---

## Apa Itu Abstraction?

**Abstraction** adalah konsep menyederhanakan penggunaan suatu object dengan menyembunyikan kompleksitas implementasinya.

Sebagai pengguna sebuah object, kita cukup mengetahui:

- Apa yang dapat dilakukan object.
- Method apa yang dapat digunakan.
- Data apa yang perlu diberikan.
- Hasil apa yang akan diperoleh.

Kita tidak selalu perlu mengetahui bagaimana proses tersebut dilakukan di dalam object.

---

## Contoh Abstraksi dalam Kehidupan Nyata

Bayangkan kita menggunakan mesin cuci.

Untuk mencuci pakaian, kita cukup:

```text
Masukkan pakaian
      ↓
Pilih program
      ↓
Tekan tombol Start
      ↓
Mesin mencuci
```

Kita tidak perlu mengetahui:

- Bagaimana motor berputar.
- Bagaimana sensor bekerja.
- Bagaimana listrik dikontrol.
- Bagaimana pompa air bekerja.
- Bagaimana sistem elektronik mengatur proses pencucian.

Semua detail tersebut disembunyikan oleh mesin.

Kita hanya menggunakan interface yang tersedia.

Inilah gambaran sederhana mengenai abstraction.

---

## Abstraction dalam Pemrograman

Konsep yang sama digunakan dalam pemrograman.

Misalnya kita menggunakan function:

```python
numbers = [1, 2, 3]

print(len(numbers))
```

Output:

```text
3
```

Kita cukup mengetahui bahwa `len()` digunakan untuk mendapatkan jumlah elemen.

Kita tidak perlu mengetahui bagaimana Python melakukan proses tersebut secara internal.

```text
len(numbers)
     ↓
Python melakukan proses internal
     ↓
     3
```

Detail implementasinya disembunyikan dari pengguna.

---

## Abstraction pada Method

Abstraction juga dapat ditemukan ketika kita menggunakan method dari sebuah object.

Misalnya:

```python
name = "budi"

print(name.upper())
```

Kita mengetahui bahwa `upper()` digunakan untuk mengubah string menjadi huruf kapital.

Kita tidak perlu mengetahui bagaimana Python memproses setiap karakter string di dalam method tersebut.

Kita cukup menggunakan interface:

```python
name.upper()
```

---

## Abstraction pada Class

Abstraction juga dapat diterapkan ketika kita membuat class.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def speak(self):
        print(f"My name is {self.name} and I am {self.age} years old")
```

Kemudian kita membuat object:

```python
player1 = PlayerCharacter("Andrei", 100)
```

Untuk membuat player berbicara, kita cukup menjalankan:

```python
player1.speak()
```

Kita tidak perlu mengetahui detail bagaimana string tersebut dibuat di dalam method `speak()`.

---

## Interface dan Implementation

Salah satu cara mudah memahami abstraction adalah membedakan **interface** dan **implementation**.

### Interface

Interface adalah bagian yang digunakan oleh pengguna.

Contohnya:

```python
player1.speak()
```

Pengguna hanya perlu mengetahui bahwa method `speak()` tersedia.

### Implementation

Implementation adalah kode yang berada di balik interface tersebut.

Contohnya:

```python
def speak(self):
    print(f"My name is {self.name} and I am {self.age} years old")
```

Pengguna tidak harus mengetahui detail implementasinya untuk menggunakan method tersebut.

Secara konsep:

```text
User
  │
  ↓
speak()
  │
  ↓
Implementation
  │
  ├── Mengambil name
  ├── Mengambil age
  └── Membuat output
```

---

## Mengapa Abstraction Penting?

Tanpa abstraction, pengguna object harus memahami terlalu banyak detail implementasi.

Misalnya sebuah object memiliki proses yang sangat kompleks:

```text
Object
│
├── 100 proses internal
├── 50 validasi
├── 20 operasi data
└── 10 proses tambahan
```

Jika seluruh detail tersebut harus diketahui oleh pengguna, penggunaan object menjadi sangat rumit.

Dengan abstraction:

```text
Object
   │
   ↓
Method Sederhana
   │
   ↓
Proses Internal yang Kompleks
```

Pengguna cukup berinteraksi dengan bagian yang diperlukan.

---

## Menyederhanakan Penggunaan

Salah satu manfaat utama abstraction adalah membuat penggunaan object menjadi lebih sederhana.

Misalnya:

```python
player1.speak()
```

Lebih sederhana daripada pengguna harus mengetahui dan menjalankan seluruh proses yang diperlukan untuk menghasilkan output.

Object menangani detail tersebut di dalam method.

---

## Mencegah Akses Berlebih

Abstraction juga berkaitan dengan bagaimana kita mengatur bagian mana dari object yang perlu digunakan oleh pengguna.

Tidak semua detail internal sebuah object harus menjadi bagian dari interface publik.

Misalnya sebuah sistem pembayaran:

```text
Payment
│
├── process_payment()
│
├── validate_card()
├── encrypt_data()
├── connect_to_bank()
└── verify_transaction()
```

Pengguna mungkin hanya perlu menggunakan:

```python
payment.process_payment()
```

Pengguna tidak perlu secara langsung menjalankan seluruh proses internal seperti:

```text
validate_card()
encrypt_data()
connect_to_bank()
verify_transaction()
```

Detail tersebut dapat dikelola oleh object.

---

## Abstraction dan Kompleksitas

Semakin kompleks sebuah aplikasi, semakin penting abstraction.

Misalnya aplikasi e-commerce memiliki sistem pembayaran:

```text
Payment
│
├── Validate
├── Authenticate
├── Encrypt
├── Process
├── Verify
└── Record
```

Daripada pengguna harus memahami seluruh proses tersebut, kita dapat menyediakan interface sederhana:

```python
payment.process()
```

Dengan demikian, kompleksitas internal tidak perlu diketahui oleh pengguna.

---

## Dampak Jika Tidak Menggunakan Abstraction

Tanpa abstraction yang baik, kode dapat menjadi sulit digunakan.

Misalnya sebuah object memiliki banyak detail internal yang harus diketahui pengguna:

```text
User
│
├── Internal Data
├── Internal Process
├── Internal Validation
├── Internal Calculation
└── Internal State
```

Jika semua bagian tersebut dapat diakses dan dimodifikasi secara bebas, pengguna atau developer lain dapat secara tidak sengaja mengubah data yang seharusnya tidak diubah.

Hal tersebut dapat menyebabkan:

- Bug.
- Data tidak konsisten.
- Perilaku object tidak sesuai.
- Kode sulit dipelihara.

---

## Abstraction dan Access Control

Abstraction memiliki hubungan dengan konsep **public** dan **private** dalam OOP.

Tujuannya adalah menentukan bagian mana dari object yang sebaiknya digunakan oleh pengguna dan bagian mana yang sebaiknya dianggap sebagai detail internal.

Secara sederhana:

```text
Object
│
├── Public Interface
│   └── Dapat digunakan oleh user
│
└── Internal Implementation
    └── Detail yang disembunyikan
```

Dalam Python, konsep ini akan berkaitan dengan konvensi seperti underscore dan mekanisme name mangling.

Pembahasan mengenai public dan private akan dipelajari lebih lanjut pada materi berikutnya.

---

## Encapsulation vs Abstraction

Encapsulation dan abstraction sering dianggap sama karena keduanya saling berhubungan.

Namun, keduanya memiliki fokus yang berbeda.

| Konsep | Fokus |
|---|---|
| Encapsulation | Menggabungkan data dan perilaku dalam satu class |
| Abstraction | Menyembunyikan detail kompleks dan menyediakan interface yang sederhana |

Contoh:

```text
Encapsulation
      ↓
Data + Behavior
      ↓
     Class
```

Sedangkan:

```text
Abstraction
      ↓
Detail kompleks
      ↓
Disembunyikan
      ↓
Interface sederhana
```

Keduanya dapat digunakan bersama dalam desain OOP.

---

## Contoh Encapsulation dan Abstraction

Kita dapat menggabungkan kedua konsep tersebut dalam sebuah class.

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def speak(self):
        print(f"My name is {self.name} and I am {self.age} years old")
```

**Encapsulation** terlihat karena:

```text
PlayerCharacter
├── name
├── age
└── speak()
```

Data dan perilaku berada dalam satu class.

**Abstraction** terlihat ketika pengguna cukup melakukan:

```python
player1.speak()
```

Pengguna tidak perlu mengetahui detail implementasi yang ada di dalam `speak()`.

---

## Abstraction pada Library Python

Kita sebenarnya sudah menggunakan abstraction sejak mempelajari Python dasar.

Contohnya:

```python
numbers = [1, 2, 3, 4, 5]

print(sum(numbers))
```

Kita tidak perlu mengetahui bagaimana function `sum()` melakukan proses penjumlahan secara internal.

Begitu juga:

```python
print(len(numbers))
```

Kita cukup mengetahui bahwa `len()` digunakan untuk mendapatkan jumlah elemen.

Hal tersebut merupakan contoh abstraction yang disediakan oleh Python.

---

## Abstraction dalam Framework dan Library

Konsep abstraction menjadi semakin penting ketika menggunakan library dan framework.

Misalnya kita menggunakan sebuah library untuk mengakses database.

Daripada menulis seluruh proses komunikasi dengan database secara manual, library dapat menyediakan interface seperti:

```python
database.connect()
database.query()
database.close()
```

Developer cukup menggunakan method tersebut tanpa harus memahami seluruh detail komunikasi antara aplikasi dan database.

Inilah salah satu alasan abstraction sangat penting dalam software engineering.

---

## Prinsip Utama Abstraction

Saat merancang sebuah class, kita dapat bertanya:

1. Apa yang perlu diketahui pengguna?
2. Apa yang tidak perlu diketahui pengguna?
3. Method apa yang perlu tersedia?
4. Detail implementasi apa yang sebaiknya disembunyikan?
5. Bagaimana membuat interface sesederhana mungkin?

Pertanyaan tersebut membantu kita membuat object yang lebih mudah digunakan.

---

## Contoh Sederhana

Misalnya kita memiliki class:

```python
class CoffeeMachine:

    def make_coffee(self):
        self._heat_water()
        self._grind_coffee()
        self._brew_coffee()
        print("Coffee is ready")

    def _heat_water(self):
        print("Heating water")

    def _grind_coffee(self):
        print("Grinding coffee")

    def _brew_coffee(self):
        print("Brewing coffee")
```

Pengguna cukup menjalankan:

```python
machine = CoffeeMachine()

machine.make_coffee()
```

Pengguna tidak perlu memanggil:

```python
machine._heat_water()
machine._grind_coffee()
machine._brew_coffee()
```

Detail proses pembuatan kopi dikelola oleh class.

Interface yang digunakan pengguna cukup:

```python
machine.make_coffee()
```

Ini merupakan contoh sederhana bagaimana abstraction dapat membuat penggunaan object menjadi lebih sederhana.

---

## Kesimpulan

**Abstraction** adalah konsep OOP yang bertujuan untuk **menyembunyikan detail implementasi yang kompleks dan menyediakan interface yang sederhana kepada pengguna**.

Contoh paling sederhana dapat ditemukan pada penggunaan built-in function:

```python
len([1, 2, 3])
```

Kita cukup mengetahui fungsi `len()` tanpa perlu mengetahui bagaimana Python menghitung jumlah elemen secara internal.

Dalam OOP, abstraction memungkinkan kita membuat object yang mudah digunakan:

```python
player1.speak()
```

Pengguna cukup mengetahui cara menggunakan method tersebut tanpa harus memahami seluruh implementasinya.

Hal penting yang perlu diingat:

- Abstraction menyederhanakan penggunaan object.
- Detail implementasi dapat disembunyikan.
- Pengguna cukup berinteraksi dengan interface yang diperlukan.
- Abstraction membantu mengurangi kompleksitas.
- Abstraction berkaitan erat dengan encapsulation dan access control.
- Built-in function dan method Python merupakan contoh abstraction yang sering kita gunakan.

Setelah memahami abstraction, pembelajaran OOP selanjutnya dapat dilanjutkan ke **Private dan Public dalam Python**, yang akan membahas bagaimana mengatur akses terhadap bagian internal sebuah object.