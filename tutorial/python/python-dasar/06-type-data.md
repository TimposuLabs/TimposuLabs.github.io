---
sidebar_position: 6
title: "Tipe Data"
---

## Data Types dalam Python

Dalam pemrograman, **data type** atau **tipe data** adalah jenis nilai yang digunakan dan diproses oleh program.

Program pada dasarnya bekerja dengan berbagai macam data. Data tersebut dapat disimpan, dibaca, diubah, diproses, maupun dihapus sesuai kebutuhan program.

Memahami tipe data merupakan salah satu konsep dasar yang sangat penting dalam belajar Python karena hampir setiap program akan berinteraksi dengan data.

---

## 1. Fundamental Data Types

Python menyediakan berbagai tipe data dasar yang dapat langsung digunakan tanpa perlu membuatnya sendiri.

Beberapa tipe data fundamental yang umum digunakan adalah:

| Tipe Data | Kode Python | Penjelasan | Contoh |
| --- | --- | --- | --- |
| Integer | `int` | Bilangan bulat tanpa desimal | `5`, `-10`, `100` |
| Float | `float` | Bilangan desimal atau pecahan | `3.14`, `-0.5`, `2.0` |
| Boolean | `bool` | Nilai benar atau salah | `True`, `False` |
| String | `str` | Teks atau kumpulan karakter | `"Hello World"` |
| List | `list` | Kumpulan data yang terurut dan dapat diubah | `[1, 2, 3]` |
| Tuple | `tuple` | Kumpulan data yang terurut dan tidak dapat diubah | `(1, 2, 3)` |
| Set | `set` | Kumpulan nilai unik | `{1, 2, 3}` |
| Dictionary | `dict` | Kumpulan data dalam bentuk key-value | `{"nama": "Andrei"}` |

---

## 2. Integer

**Integer** adalah tipe data yang digunakan untuk menyimpan bilangan bulat.

Contohnya:

```python
umur = 20
jumlah = 100
suhu = -5
```

Integer dapat digunakan dalam berbagai operasi matematika seperti:

- Penjumlahan
- Pengurangan
- Perkalian
- Pembagian
- Perbandingan

Contoh:

```python
angka1 = 10
angka2 = 5

hasil = angka1 + angka2
```

---

## 3. Float

**Float** digunakan untuk menyimpan bilangan yang memiliki nilai desimal.

Contohnya:

```python
tinggi = 173.5
berat = 70.5
pi = 3.14
```

Float banyak digunakan ketika program membutuhkan nilai yang tidak selalu berupa bilangan bulat, misalnya:

- Nilai pengukuran
- Persentase
- Koordinat
- Perhitungan matematika
- Nilai rata-rata

---

## 4. Boolean

**Boolean** merupakan tipe data yang hanya memiliki dua nilai:

- `True`
- `False`

Boolean biasanya digunakan untuk merepresentasikan kondisi atau hasil dari sebuah perbandingan.

Contohnya:

```python
is_login = True
is_admin = False
```

Boolean sangat penting dalam pengambilan keputusan pada program.

Misalnya:

```python
umur = 20

is_dewasa = umur >= 18
```

Hasil dari perbandingan tersebut adalah nilai Boolean.

---

## 5. String

**String** digunakan untuk menyimpan teks atau kumpulan karakter.

String dapat berisi:

- Nama
- Alamat
- Pesan
- Email
- Kalimat
- Simbol
- Karakter lainnya

Contohnya:

```python
nama = "Andrei"
kota = "Palu"
pesan = "Selamat belajar Python"
```

String biasanya ditulis menggunakan tanda kutip tunggal atau tanda kutip ganda.

Contohnya:

```python
nama1 = 'Andrei'
nama2 = "Andrei"
```

Keduanya merupakan string.

---

## 6. List

**List** digunakan untuk menyimpan beberapa nilai dalam satu struktur data.

List memiliki urutan dan elemennya dapat diubah.

Contohnya:

```python
buah = ["Apel", "Mangga", "Jeruk"]
```

List juga dapat menyimpan berbagai tipe data:

```python
data = [10, "Python", True, 3.14]
```

List sangat sering digunakan ketika program perlu menyimpan sekumpulan data yang masih dapat berubah.

Contohnya:

```python
nama_siswa = ["Andi", "Budi", "Citra"]
```

Kita dapat menambahkan, menghapus, atau mengubah elemen dalam list.

---

## 7. Tuple

**Tuple** mirip dengan list karena dapat digunakan untuk menyimpan beberapa nilai secara berurutan.

Perbedaannya adalah tuple bersifat **immutable**, yaitu nilai di dalamnya tidak dapat diubah setelah tuple dibuat.

Contohnya:

```python
koordinat = (10, 20)
```

Tuple cocok digunakan untuk data yang tidak seharusnya berubah.

Contoh lainnya:

```python
warna_rgb = (255, 255, 255)
```

Berbeda dengan list:

```python
warna = [255, 255, 255]
```

List dapat diubah, sedangkan tuple tidak dapat diubah.

---

## 8. Set

**Set** digunakan untuk menyimpan kumpulan nilai yang unik.

Set tidak mempertahankan urutan elemen seperti list.

Contohnya:

```python
angka = {1, 2, 3, 4}
```

Jika terdapat nilai yang sama, set hanya akan menyimpan satu nilai tersebut.

Contohnya:

```python
angka = {1, 2, 2, 3, 3, 3}
```

Hasilnya akan menjadi kumpulan nilai unik:

```text
{1, 2, 3}
```

Set berguna ketika kita membutuhkan kumpulan data tanpa duplikasi.

---

## 9. Dictionary

**Dictionary** digunakan untuk menyimpan data dalam bentuk pasangan **key-value**.

Contohnya:

```python
user = {
    "nama": "Andrei",
    "umur": 20,
    "kota": "Palu"
}
```

Pada contoh tersebut:

- `nama` adalah key.
- `Andrei` adalah value.
- `umur` adalah key.
- `20` adalah value.
- `kota` adalah key.
- `Palu` adalah value.

Dictionary sangat berguna untuk merepresentasikan data yang memiliki atribut atau informasi tertentu.

Contohnya data pengguna:

```text
nama  → Andrei
umur  → 20
kota  → Palu
```

---

## 10. Custom Data Types

Selain menggunakan tipe data bawaan, Python memungkinkan programmer membuat tipe data sendiri.

Hal ini dapat dilakukan menggunakan **class**.

Konsep ini merupakan bagian dari **Object-Oriented Programming (OOP)**.

Misalnya kita ingin membuat tipe data untuk merepresentasikan sebuah mobil:

```python
class SuperCar:
    pass
```

Kita kemudian dapat membuat object berdasarkan class tersebut.

```python
mobil = SuperCar()
```

Dengan menggunakan class, kita dapat membuat struktur data yang lebih sesuai dengan kebutuhan aplikasi.

Custom data types biasanya akan dipelajari lebih lanjut ketika masuk ke materi **Object-Oriented Programming**.

---

## 11. Specialized Data Types

Selain tipe data bawaan dan custom data types, Python juga memiliki berbagai tipe data khusus yang tersedia melalui **module**, **package**, atau **library**.

Tipe data tersebut biasanya digunakan ketika kebutuhan program lebih kompleks dan tipe data bawaan Python tidak cukup.

Contohnya dapat ditemukan pada berbagai library yang digunakan untuk:

- Data Science
- Machine Learning
- Scientific Computing
- Data Processing
- Web Development

Sebagai contoh, library tertentu dapat menyediakan struktur data khusus yang dirancang untuk mengolah data dalam jumlah besar secara lebih efisien.

---

## 12. Tipe Data `None`

Python memiliki tipe khusus yang disebut **`None`**.

`None` digunakan untuk merepresentasikan **ketiadaan nilai** atau **absence of value**.

Contohnya:

```python
data = None
```

Artinya variabel `data` ada, tetapi saat ini tidak memiliki nilai.

`None` sering digunakan ketika:

- Sebuah nilai belum tersedia.
- Sebuah function tidak mengembalikan nilai.
- Sebuah data bersifat opsional.
- Kita ingin menunjukkan bahwa suatu nilai belum ditentukan.

---

## 13. `None` Bukan `0`

Penting untuk memahami bahwa `None` berbeda dengan angka `0`.

Contohnya:

```python
angka = 0
data = None
```

Keduanya memiliki arti yang berbeda.

`0` merupakan sebuah nilai numerik.

Sedangkan `None` menunjukkan bahwa tidak ada nilai.

Hal yang sama berlaku untuk string kosong:

```python
nama = ""
```

String kosong tetap merupakan sebuah string, sedangkan:

```python
nama = None
```

menunjukkan bahwa tidak ada nilai string yang diberikan.

---

## 14. Gambaran Tipe Data Python

Secara sederhana, tipe data Python dapat dikelompokkan menjadi beberapa kategori:

```text
Python Data Types
│
├── Fundamental Data Types
│   ├── int
│   ├── float
│   ├── bool
│   ├── str
│   ├── list
│   ├── tuple
│   ├── set
│   └── dict
│
├── Custom Data Types
│   └── class
│
├── Specialized Data Types
│   └── Dari module/library
│
└── Special Value
    └── None
```

---

## 15. Mutable dan Immutable

Salah satu konsep penting yang nantinya perlu dipahami adalah perbedaan antara **mutable** dan **immutable**.

### Mutable

Mutable berarti nilai atau isi object dapat diubah setelah object dibuat.

Contoh tipe data mutable:

- `list`
- `dict`
- `set`

### Immutable

Immutable berarti nilai atau isi object tidak dapat diubah setelah object dibuat.

Contoh tipe data immutable:

- `int`
- `float`
- `bool`
- `str`
- `tuple`

Konsep mutable dan immutable akan menjadi penting ketika kita mulai mempelajari variable, function, object, dan memory management.

---

## 16. Mengapa Tipe Data Penting?

Memahami tipe data penting karena setiap tipe data memiliki karakteristik dan operasi yang berbeda.

Misalnya:

```python
angka = 10
nama = "Python"
```

`angka` merupakan integer, sedangkan `nama` merupakan string.

Keduanya memiliki jenis data yang berbeda sehingga cara program memperlakukan keduanya juga berbeda.

Pemahaman mengenai tipe data akan menjadi dasar untuk mempelajari konsep Python berikutnya seperti:

- Variable
- Operator
- Conditional
- Loop
- Function
- Collection
- Object-Oriented Programming

---

## Kesimpulan

Tipe data merupakan salah satu konsep fundamental dalam Python.

Python menyediakan berbagai tipe data bawaan seperti:

- `int`
- `float`
- `bool`
- `str`
- `list`
- `tuple`
- `set`
- `dict`

Selain itu, Python memungkinkan kita membuat **custom data types** menggunakan class dan menggunakan berbagai **specialized data types** melalui module atau library.

Python juga memiliki nilai khusus `None` yang digunakan untuk merepresentasikan ketiadaan nilai.

Secara sederhana:

```text
Data
 ↓
Memiliki Tipe
 ↓
Tipe menentukan karakteristik data
 ↓
Program dapat memproses data
```

Memahami tipe data dengan baik akan menjadi fondasi penting sebelum melanjutkan ke materi Python berikutnya.