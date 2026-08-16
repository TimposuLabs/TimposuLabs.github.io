---
sidebar_position: 40
title: "Tuple"
---

Tuple adalah salah satu struktur data bawaan Python yang memiliki kemiripan dengan List. Perbedaan utamanya adalah **Tuple bersifat immutable**, sehingga elemen di dalamnya tidak dapat diubah setelah Tuple dibuat.

---

## 1. Apa itu Tuple?

**Tuple** adalah struktur data yang menyimpan kumpulan data secara terurut (*ordered sequence*).

Tuple ditulis menggunakan tanda kurung:

```python
()
```

Setiap elemen dipisahkan menggunakan tanda koma.

Contohnya:

```python
my_tuple = (1, 2, 3, 4, 5)

print(my_tuple)
```

Hasil:

```text
(1, 2, 3, 4, 5)
```

Tuple dapat menyimpan berbagai tipe data:

```python
my_tuple = (
    10,
    "Python",
    True,
    3.14
)

print(my_tuple)
```

---

## 2. Tuple Bersifat Immutable

Sifat utama Tuple adalah **immutable**, yaitu isi Tuple tidak dapat diubah setelah dibuat.

Contohnya:

```python
my_tuple = (1, 2, 3, 4, 5)

my_tuple[1] = "Python"
```

Kode tersebut akan menghasilkan error:

```text
TypeError: 'tuple' object does not support item assignment
```

Artinya, kita tidak dapat mengganti elemen Tuple menggunakan indeks.

---

## 3. Tuple Tidak Dapat Dimodifikasi

Karena bersifat immutable, beberapa operasi yang dapat dilakukan pada List tidak dapat dilakukan secara langsung pada Tuple.

Contohnya:

```python
my_tuple = (1, 2, 3, 4, 5)
```

Tidak dapat digunakan untuk mengubah elemen:

```python
my_tuple[0] = 10
```

Tidak dapat menggunakan:

```python
my_tuple.append(10)
```

Tidak dapat menggunakan:

```python
my_tuple.remove(3)
```

Tidak dapat menggunakan:

```python
my_tuple.sort()
```

Tidak dapat menggunakan:

```python
my_tuple.reverse()
```

Jika membutuhkan data yang dapat dimodifikasi, gunakan **List**.

---

## 4. Mengakses Elemen Tuple

Walaupun tidak dapat diubah, elemen Tuple tetap dapat diakses menggunakan indeks.

Indeks Tuple dimulai dari `0`, sama seperti List dan String.

Contohnya:

```python
my_tuple = ("Python", "Java", "Kotlin")

print(my_tuple[0])
print(my_tuple[1])
print(my_tuple[2])
```

Hasil:

```text
Python
Java
Kotlin
```

---

## 5. Negative Indexing

Tuple juga mendukung indeks negatif.

Contohnya:

```python
my_tuple = ("Python", "Java", "Kotlin")

print(my_tuple[-1])
```

Hasil:

```text
Kotlin
```

Indeks negatif dimulai dari elemen terakhir.

---

## 6. Tuple Slicing

Tuple juga mendukung teknik slicing:

```text
[start:stop:step]
```

Contohnya:

```python
my_tuple = (1, 2, 3, 4, 5)

print(my_tuple[1:4])
```

Hasil:

```text
(2, 3, 4)
```

Sama seperti pada String dan List, indeks `stop` bersifat eksklusif.

---

## 7. Memeriksa Keberadaan Data dengan `in`

Keyword `in` dapat digunakan untuk memeriksa apakah suatu nilai terdapat di dalam Tuple.

Contohnya:

```python
my_tuple = (1, 2, 3, 4, 5)

print(3 in my_tuple)
print(10 in my_tuple)
```

Hasil:

```text
True
False
```

---

## 8. Tuple dengan Satu Elemen

Ada hal penting ketika membuat Tuple yang hanya memiliki satu elemen.

Penulisan berikut:

```python
my_tuple = (1)
```

bukan Tuple.

Python akan menganggapnya sebagai integer:

```python
print(type(my_tuple))
```

Hasil:

```text
<class 'int'>
```

Untuk membuat Tuple dengan satu elemen, harus menggunakan **koma**:

```python
my_tuple = (1,)

print(type(my_tuple))
```

Hasil:

```text
<class 'tuple'>
```

Jadi, koma lebih penting daripada tanda kurung dalam menentukan Tuple satu elemen.

---

## 9. Mengapa Menggunakan Tuple?

Jika Tuple tidak dapat diubah, mengapa tidak selalu menggunakan List?

Tuple memiliki beberapa kegunaan khusus.

### A. Data yang Tidak Boleh Berubah

Tuple cocok digunakan untuk data yang sifatnya tetap.

Contohnya koordinat:

```python
location = (40.7128, -74.0060)
```

Data tersebut terdiri dari:

```text
latitude
longitude
```

Karena koordinat tersebut dianggap sebagai satu kumpulan data yang tidak perlu dimodifikasi, Tuple dapat menjadi pilihan yang tepat.

---

### B. Data Lebih Terprediksi

Karena Tuple immutable, kita dapat memastikan bahwa isi Tuple tidak berubah secara tidak sengaja.

Contohnya:

```python
rgb = (255, 255, 255)
```

Jika data tersebut memang harus tetap, Tuple memberikan perlindungan tambahan terhadap perubahan.

---

### C. Dapat Digunakan sebagai Dictionary Key

Salah satu karakteristik penting Tuple adalah dapat digunakan sebagai **key Dictionary**, selama elemen-elemen di dalam Tuple juga dapat digunakan sebagai key.

Contohnya:

```python
locations = {
    (40.7128, -74.0060): "New York",
    (1.3521, 103.8198): "Singapore"
}

print(locations[(40.7128, -74.0060)])
```

Hasil:

```text
New York
```

Hal ini dapat dilakukan karena Tuple bersifat immutable.

---

## 10. Tuple sebagai Dictionary Key

Bandingkan dengan List.

List tidak dapat digunakan sebagai key:

```python
locations = {
    [40.7128, -74.0060]: "New York"
}
```

Kode tersebut menghasilkan error karena List bersifat mutable.

Sedangkan Tuple dapat digunakan:

```python
locations = {
    (40.7128, -74.0060): "New York"
}
```

Ini merupakan salah satu perbedaan penting antara List dan Tuple.

---

## 11. Tuple pada `.items()`

Kita juga akan sering menemukan Tuple ketika bekerja dengan Dictionary.

Method:

```python
.items()
```

menghasilkan pasangan key-value.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25
}

print(user.items())
```

Hasilnya secara konsep:

```text
("name", "Andi")
("age", 25)
```

Setiap pasangan key-value direpresentasikan sebagai Tuple.

---

## 12. List vs Tuple

| Karakteristik | List | Tuple |
| --- | --- | --- |
| Sintaks | `[]` | `()` |
| Terurut | Ya | Ya |
| Mutable | Ya | Tidak |
| Dapat mengubah elemen | Ya | Tidak |
| Dapat menggunakan `.append()` | Ya | Tidak |
| Dapat digunakan sebagai Dictionary key | Tidak | Ya |
| Cocok untuk | Data yang dapat berubah | Data yang relatif tetap |

---

## 13. Contoh Perbandingan

### List

```python
languages = ["Python", "Java", "Kotlin"]

languages[0] = "JavaScript"

print(languages)
```

Hasil:

```text
["JavaScript", "Java", "Kotlin"]
```

List dapat diubah.

### Tuple

```python
languages = ("Python", "Java", "Kotlin")

languages[0] = "JavaScript"
```

Akan menghasilkan:

```text
TypeError
```

Tuple tidak dapat diubah.

---

## 14. Contoh Penggunaan dalam Program

Misalnya kita memiliki informasi ukuran layar:

```python
screen_size = (1920, 1080)
```

Kita dapat mengambil masing-masing nilai:

```python
width = screen_size[0]
height = screen_size[1]

print(width)
print(height)
```

Hasil:

```text
1920
1080
```

Tuple cocok digunakan karena ukuran tersebut dapat diperlakukan sebagai satu kumpulan data yang memiliki struktur tetap:

```text
(width, height)
```

---

## 15. Tuple dan Immutability

Penting untuk memahami bahwa **immutable berarti referensi Tuple tidak dapat digunakan untuk mengubah elemen Tuple**.

Contohnya:

```python
coordinates = (10, 20)

coordinates[0] = 100
```

Tidak diperbolehkan.

Namun, kita tetap dapat melakukan reassignment terhadap variabel:

```python
coordinates = (10, 20)

coordinates = (100, 200)

print(coordinates)
```

Hasil:

```text
(100, 200)
```

Yang terjadi bukan mengubah Tuple lama, melainkan variabel `coordinates` sekarang merujuk pada Tuple baru.

---

## 16. Ringkasan

Tuple memiliki beberapa karakteristik utama:

1. Tuple merupakan **ordered sequence**.
2. Tuple menggunakan tanda kurung `()`.
3. Setiap elemen dipisahkan dengan koma.
4. Tuple bersifat **immutable**.
5. Elemen Tuple dapat diakses menggunakan indeks.
6. Tuple mendukung slicing.
7. Tuple dapat diperiksa menggunakan keyword `in`.
8. Tuple dapat digunakan sebagai Dictionary key jika elemennya juga memenuhi syarat.
9. Tuple cocok untuk menyimpan data yang relatif tetap.

---

## Kesimpulan

Gunakan **List** ketika data perlu sering ditambahkan, dihapus, atau diubah.

Gunakan **Tuple** ketika data merupakan sekumpulan nilai yang terurut dan sebaiknya tidak berubah selama program berjalan.

Contoh sederhana:

```python
# Data yang dapat berubah
shopping_cart = ["laptop", "mouse", "keyboard"]

# Data yang relatif tetap
coordinate = (40.7128, -74.0060)
```

:::info
**Intinya:** List cocok untuk data yang **mutable**, sedangkan Tuple cocok untuk data yang **immutable** dan memiliki struktur yang relatif tetap.
:::