---
sidebar_position: 5
title: "Constructor __init__"
---

Setelah memahami class, object, dan attribute, kita akan mempelajari salah satu method yang sangat penting dalam OOP Python, yaitu `__init__`.

Method `__init__` digunakan untuk menginisialisasi object ketika object tersebut dibuat.

Method ini akan dipanggil secara otomatis ketika kita melakukan proses instantiation.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name, age):
        self.name = name
        self.age = age


player = PlayerCharacter("Budi", 25)
```

Ketika `PlayerCharacter("Budi", 25)` dijalankan, Python membuat object baru dan kemudian menjalankan `__init__` untuk menginisialisasi data object tersebut.

---

## Fungsi `__init__`

Method `__init__` dapat digunakan untuk:

- Menginisialisasi instance attribute.
- Memberikan nilai awal pada object.
- Menerima data ketika object dibuat.
- Memberikan nilai default.
- Melakukan validasi terhadap data.
- Memberikan aturan tertentu sebelum attribute object dibuat.

Secara sederhana:

```text
Membuat Object
      ↓
Menjalankan __init__
      ↓
Menerima Data
      ↓
Validasi Data
      ↓
Menginisialisasi Attribute
```

---

## Default Parameters pada `__init__`

Parameter pada `__init__` dapat memiliki nilai default.

Hal ini memungkinkan object dibuat tanpa harus memberikan seluruh argument.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name="anonymous", age=0):
        self.name = name
        self.age = age
```

Kita dapat membuat object tanpa memberikan argument:

```python
player = PlayerCharacter()

print(player.name)
print(player.age)
```

Output:

```text
anonymous
0
```

Python menggunakan nilai default karena tidak ada argument yang diberikan ketika object dibuat.

---

## Memberikan Sebagian Argument

Kita juga dapat memberikan hanya sebagian argument jika parameter lainnya memiliki nilai default.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name="anonymous", age=0):
        self.name = name
        self.age = age
```

Kemudian:

```python
player = PlayerCharacter("Budi")
```

Karena hanya `name` yang diberikan, maka:

```text
name = "Budi"
age = 0
```

Kita juga dapat memberikan keduanya:

```python
player = PlayerCharacter("Budi", 25)
```

Maka:

```text
name = "Budi"
age = 25
```

---

## Validation pada `__init__`

Selain menginisialisasi attribute, kita dapat melakukan validasi data di dalam `__init__`.

Validasi digunakan untuk menentukan apakah data yang diberikan memenuhi aturan tertentu.

Contoh:

```python
class PlayerCharacter:

    membership = True

    def __init__(self, name="anonymous", age=0):
        if age > 18:
            self.name = name
            self.age = age
```

Pada contoh tersebut, attribute `name` dan `age` hanya dibuat apabila `age` lebih besar dari 18.

---

## Object dengan Data yang Valid

Jika kita memberikan usia yang memenuhi kondisi:

```python
player = PlayerCharacter("Budi", 25)
```

Karena:

```text
25 > 18
```

kondisi terpenuhi.

Maka attribute dibuat:

```text
player
├── name = "Budi"
└── age = 25
```

Kita dapat mengaksesnya:

```python
print(player.name)
print(player.age)
```

Output:

```text
Budi
25
```

---

## Object dengan Data yang Tidak Valid

Sekarang kita memberikan usia yang tidak memenuhi kondisi:

```python
player = PlayerCharacter("Andi", 15)
```

Kondisi:

```text
15 > 18
```

bernilai `False`.

Akibatnya, bagian berikut tidak dijalankan:

```python
self.name = name
self.age = age
```

Dengan demikian, attribute `name` dan `age` tidak dibuat pada object tersebut.

---

## Mengapa Bisa Terjadi `AttributeError`?

Jika kita kemudian mencoba:

```python
print(player.name)
```

Python akan menghasilkan `AttributeError`.

Hal ini terjadi karena object `player` tidak memiliki attribute `name`.

Secara sederhana:

```text
PlayerCharacter
       ↓
    player
       ↓
    age = 15
       ↓
Kondisi age > 18
       ↓
    False
       ↓
self.name tidak dibuat
       ↓
  player.name
       ↓
AttributeError
```

Pesan error dapat terlihat seperti:

```text
AttributeError: 'PlayerCharacter' object has no attribute 'name'
```

---

## Safeguard pada Constructor

Kondisi di dalam `__init__` dapat digunakan sebagai **safeguard**, yaitu mekanisme untuk membatasi data yang dapat digunakan oleh object.

Contohnya:

```python
class PlayerCharacter:

    def __init__(self, name="anonymous", age=0):
        if age > 18:
            self.name = name
            self.age = age
```

Dalam contoh tersebut, object hanya akan memiliki attribute tertentu apabila data memenuhi aturan yang ditentukan.

Namun, pendekatan seperti ini perlu digunakan dengan hati-hati.

Jika kondisi tidak terpenuhi tetapi object tetap berhasil dibuat, object tersebut dapat berada dalam kondisi yang tidak lengkap.

---

## Masalah Object yang Tidak Lengkap

Perhatikan:

```python
player = PlayerCharacter("Andi", 15)
```

Object tetap berhasil dibuat:

```text
player
```

Tetapi attribute berikut tidak tersedia:

```text
player.name
player.age
```

Jika program kemudian menganggap kedua attribute tersebut selalu tersedia, maka dapat terjadi error.

Karena itu, validasi dalam `__init__` sebaiknya dirancang dengan baik.

---

## Validasi dengan Pesan

Salah satu pendekatan yang lebih jelas adalah memberikan informasi ketika data tidak memenuhi aturan.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name="anonymous", age=0):
        if age > 18:
            self.name = name
            self.age = age
        else:
            print("Player harus berusia lebih dari 18 tahun")
```

Ketika object dibuat:

```python
player = PlayerCharacter("Andi", 15)
```

Program akan memberikan informasi:

```text
Player harus berusia lebih dari 18 tahun
```

Pendekatan ini membuat alasan mengapa data tidak diterima menjadi lebih jelas.

---

## Validasi dan Error Handling

Dalam aplikasi nyata, validasi biasanya perlu dikombinasikan dengan **error handling**.

Tujuannya adalah agar kesalahan input dapat ditangani dengan baik dan tidak menyebabkan program berhenti secara tidak terkontrol.

Contoh konsep:

```text
Input User
    ↓
Validasi
    ↓
Apakah valid?
   / \
 Ya   Tidak
 ↓       ↓
Buat    Tangani
Object  Error
```

Dengan pendekatan tersebut, program dapat memberikan respons yang sesuai ketika data tidak memenuhi aturan.

---

## Default Parameter dan Validation

Default parameter dan validation dapat digunakan secara bersamaan.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name="anonymous", age=0):

        if age > 18:
            self.name = name
            self.age = age
        else:
            print("Usia tidak memenuhi syarat")
```

Default parameter menentukan nilai yang digunakan ketika argument tidak diberikan.

Sedangkan validation menentukan apakah nilai tersebut memenuhi aturan.

---

## Perbedaan Default Parameter dan Validation

| Konsep | Fungsi |
|---|---|
| Default parameter | Memberikan nilai ketika argument tidak diberikan |
| Validation | Memeriksa apakah data memenuhi aturan |
| `__init__` | Menjalankan proses inisialisasi object |
| Safeguard | Membatasi atau mengontrol proses inisialisasi |

Contohnya:

```python
def __init__(self, name="anonymous", age=0):
```

Bagian:

```text
name="anonymous"
age=0
```

merupakan default parameter.

Sedangkan:

```python
if age > 18:
```

merupakan proses validation.

---

## Hal yang Perlu Diperhatikan

Menggunakan kondisi seperti:

```python
if age > 18:
    self.name = name
    self.age = age
```

memang dapat digunakan sebagai contoh pembelajaran mengenai safeguard.

Namun, pada aplikasi nyata, biasanya lebih baik memastikan object tidak dibuat dalam keadaan tidak valid.

Salah satu pendekatan yang umum adalah memberikan error ketika data tidak memenuhi aturan.

Contoh:

```python
class PlayerCharacter:

    def __init__(self, name, age):

        if age <= 18:
            raise ValueError("Age must be greater than 18")

        self.name = name
        self.age = age
```

Dengan pendekatan tersebut, object tidak dibuat secara normal apabila data tidak valid.

Contoh:

```python
player = PlayerCharacter("Andi", 15)
```

akan menghasilkan error karena usia tidak memenuhi aturan.

---

## Kesimpulan

Method `__init__` merupakan bagian penting dalam proses pembuatan object.

Fungsi utamanya adalah menginisialisasi data awal object, tetapi method ini juga dapat digunakan untuk melakukan validasi dan memberikan aturan terhadap data yang digunakan.

Beberapa konsep penting yang perlu diingat:

- `__init__` dijalankan ketika object dibuat.
- `__init__` digunakan untuk menginisialisasi instance attribute.
- Parameter pada `__init__` dapat memiliki nilai default.
- Validasi dapat dilakukan di dalam `__init__`.
- Kondisi validasi dapat digunakan sebagai safeguard.
- Jika attribute tidak dibuat karena kondisi tertentu, akses terhadap attribute tersebut dapat menyebabkan `AttributeError`.
- Dalam aplikasi nyata, validasi sebaiknya dirancang agar object tidak berada dalam kondisi yang tidak valid.
- Error handling dapat digunakan untuk menangani data yang tidak memenuhi aturan.

Setelah memahami `__init__` dan proses inisialisasi object, pembelajaran selanjutnya dapat dilanjutkan ke **Method pada Class dan Object**.