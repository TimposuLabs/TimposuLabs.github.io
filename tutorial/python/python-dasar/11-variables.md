---
sidebar_position: 11
title: "Variables"
---

**Variable** atau variabel adalah salah satu konsep paling fundamental dalam pemrograman.

Variabel digunakan untuk memberikan **nama pada sebuah nilai atau object** sehingga nilai tersebut dapat digunakan kembali di dalam program.

Contohnya:

```python
iq = 190
```

Pada contoh tersebut, `iq` merupakan nama yang digunakan untuk merujuk pada nilai `190`.

Secara sederhana:

```text
Nama Variable
      ↓
     iq
      ↓
     190
```

Dalam Python, proses ini sering disebut sebagai **binding**, yaitu menghubungkan sebuah nama dengan sebuah object atau nilai.

---

## 1. Menggunakan Variable

Variable memungkinkan kita menyimpan nilai dan menggunakannya kembali.

Contohnya:

```python
iq = 190
user_age = iq / 4

print(iq)
print(user_age)
```

Hasil:

```text
190
47.5
```

Pada contoh tersebut:

- `iq` menyimpan nilai `190`.
- `user_age` menggunakan nilai yang direferensikan oleh `iq`.
- Hasilnya disimpan pada variable `user_age`.

Variable membuat program lebih mudah dibaca dibandingkan menuliskan nilai secara berulang.

---

## 2. Variable Dapat Menyimpan Berbagai Tipe Data

Variable Python dapat digunakan untuk mereferensikan berbagai jenis data.

Contohnya:

```python
nama = "Andrei"
umur = 25
tinggi = 173.5
is_student = True
```

Pada contoh tersebut:

| Variable | Nilai | Tipe Data |
| --- | --- | --- |
| `nama` | `"Andrei"` | `str` |
| `umur` | `25` | `int` |
| `tinggi` | `173.5` | `float` |
| `is_student` | `True` | `bool` |

Python menggunakan **dynamic typing**, sehingga kita tidak perlu mendeklarasikan tipe data secara eksplisit ketika membuat variable.

---

## 3. Variable Dapat Diubah

Nilai yang direferensikan oleh sebuah variable dapat berubah selama program berjalan.

Contohnya:

```python
umur = 20

umur = 21

print(umur)
```

Hasil:

```text
21
```

Pada awalnya `umur` merujuk pada nilai `20`.

Kemudian variable tersebut diberikan nilai baru sehingga sekarang merujuk pada `21`.

---

## 4. Variable Bersifat Case Sensitive

Python membedakan huruf besar dan huruf kecil dalam nama variable.

Contohnya:

```python
nama = "Andrei"
Nama = "Budi"
```

`nama` dan `Nama` merupakan dua nama yang berbeda.

Contoh:

```python
user_iq = 190
User_IQ = 200

print(user_iq)
print(User_IQ)
```

Hasil:

```text
190
200
```

Karena Python bersifat **case sensitive**, konsistensi penamaan variable sangat penting.

---

## 5. Aturan Penamaan Variable

Python memiliki beberapa aturan yang harus diperhatikan ketika membuat nama variable.

### Harus Diawali Huruf atau Underscore

Nama variable dapat diawali dengan huruf:

```python
nama = "Andrei"
```

atau underscore:

```python
_nama = "Andrei"
```

Nama variable **tidak boleh diawali dengan angka**.

Contoh yang tidak valid:

```python
1nama = "Andrei"
```

Python akan menghasilkan syntax error.

---

## 6. Angka Boleh Digunakan

Walaupun tidak boleh digunakan sebagai karakter pertama, angka dapat digunakan setelah karakter pertama.

Contohnya:

```python
user1 = "Andrei"
user2 = "Budi"
```

Nama tersebut valid.

Contoh lainnya:

```python
user_age1 = 20
```

---

## 7. Menggunakan Underscore

Underscore `_` dapat digunakan untuk memisahkan kata dalam nama variable.

Contohnya:

```python
user_name = "Andrei"
user_age = 25
total_price = 50000
```

Gaya penulisan seperti ini disebut **snake_case**.

Snake case merupakan gaya penamaan yang umum digunakan dalam Python.

---

## 8. Hindari Nama Variable yang Sulit Dipahami

Nama variable sebaiknya menjelaskan data yang direpresentasikan.

Contoh yang kurang jelas:

```python
x = 25
```

Jika `x` memang memiliki konteks yang jelas, penggunaan tersebut bisa saja tepat.

Namun, untuk data tertentu, nama yang lebih deskriptif biasanya lebih baik:

```python
user_age = 25
```

Dengan melihat nama `user_age`, programmer dapat memahami tujuan variable tersebut tanpa harus membaca seluruh kode.

---

## 9. Variable dan Readability

Dalam pemrograman, kode biasanya **lebih sering dibaca daripada ditulis**.

Karena itu, penamaan variable merupakan bagian penting dari kualitas kode.

Bandingkan:

```python
x = 100
y = 20
z = x * y
```

dengan:

```python
price = 100
quantity = 20
total_price = price * quantity
```

Versi kedua lebih mudah dipahami karena nama variable memberikan konteks mengenai data yang digunakan.

:::tip
**Gunakan nama variable yang jelas dan deskriptif.**
:::

---

## 10. Menggunakan Python Keywords

Python memiliki sejumlah **keyword** yang memiliki fungsi khusus dalam bahasa pemrograman.

Contohnya:

```text
if
else
for
while
def
class
return
import
True
False
None
```

Keyword tersebut tidak seharusnya digunakan sebagai nama variable.

Contoh yang tidak valid:

```python
class = "Python"
```

atau:

```python
def = 10
```

Karena `class` dan `def` merupakan keyword Python.

---

## 11. Hindari Menimpa Built-in Function

Selain keyword, Python juga memiliki berbagai **built-in functions** dan built-in types.

Contohnya:

```text
print
type
input
int
str
list
dict
```

Sebaiknya jangan menggunakan nama-nama tersebut sebagai variable karena dapat menimpa referensi terhadap fungsi atau tipe bawaan.

Contoh yang sebaiknya dihindari:

```python
print = "Hello"
```

Setelah itu, penggunaan:

```python
print("Hello Python")
```

dapat menghasilkan masalah karena `print` sudah tidak lagi merujuk pada built-in function `print()`.

Gunakan nama lain yang lebih jelas.

---

## 12. Konstanta

Dalam beberapa program, terdapat nilai yang secara konsep **tidak seharusnya berubah** selama program berjalan.

Nilai seperti ini sering disebut sebagai **constant**.

Python tidak memiliki keyword khusus untuk mendeklarasikan constant seperti beberapa bahasa pemrograman lainnya.

Namun, terdapat konvensi bahwa nama constant ditulis menggunakan **huruf kapital**.

Contohnya:

```python
PI = 3.14
MAX_USERS = 100
DEFAULT_TIMEOUT = 30
```

Penggunaan huruf kapital memberi pesan kepada programmer lain bahwa nilai tersebut dianggap sebagai constant.

Perlu dipahami bahwa Python tidak secara otomatis mencegah nilai tersebut diubah.

Contohnya masih dapat dilakukan:

```python
PI = 3.14159
```

Jadi, huruf kapital merupakan **konvensi**, bukan mekanisme penguncian nilai.

---

## 13. Dunder Variables

Python memiliki beberapa nama khusus yang menggunakan dua underscore di awal dan akhir.

Contohnya:

```python
__name__
```

Nama seperti ini sering disebut **dunder**, singkatan dari **double underscore**.

Beberapa contoh lainnya:

```text
__name__
__init__
__str__
```

Nama-nama tersebut memiliki makna khusus dalam Python dan biasanya digunakan oleh mekanisme internal bahasa atau object model Python.

Sebagai pemula, kita tidak perlu membuat nama dunder sendiri.

:::tip
**Hindari membuat nama variable dengan pola `__nama__` untuk penggunaan biasa.**
:::

Gunakan nama variable normal seperti:

```python
user_name = "Andrei"
```

---

## 14. Multiple Assignment

Python memungkinkan kita memberikan nilai kepada beberapa variable dalam satu statement.

Contohnya:

```python
a, b, c = 1, 2, 3
```

Sekarang:

```text
a → 1
b → 2
c → 3
```

Kita dapat memeriksanya:

```python
print(a)
print(b)
print(c)
```

Hasil:

```text
1
2
3
```

Teknik ini disebut **multiple assignment**.

---

## 15. Multiple Assignment dengan Nilai yang Sama

Kita juga dapat memberikan nilai yang sama kepada beberapa variable.

Contohnya:

```python
a = b = c = 0
```

Sekarang ketiga variable tersebut memiliki nilai `0`.

```text
a → 0
b → 0
c → 0
```

Cara ini dapat berguna ketika beberapa variable perlu diberikan nilai awal yang sama.

---

## 16. Variable dan `type()`

Kita dapat menggunakan `type()` untuk mengetahui tipe object yang direferensikan oleh sebuah variable.

Contohnya:

```python
umur = 25
nama = "Andrei"

print(type(umur))
print(type(nama))
```

Hasil:

```text
<class 'int'>
<class 'str'>
```

Hal ini membantu kita memahami bagaimana Python mengenali data yang digunakan oleh variable.

---

## 17. Variable sebagai Nama yang Mereferensikan Object

Dalam Python, penting untuk memahami bahwa variable bukan sekadar "kotak" yang menyimpan nilai.

Python menggunakan model **name binding**.

Ketika kita menulis:

```python
iq = 190
```

nama `iq` direferensikan atau di-bind ke object dengan nilai `190`.

Secara sederhana:

```text
        iq
         │
         ▼
      ┌─────┐
      │ 190 │
      └─────┘
```

Jika kemudian kita melakukan:

```python
iq = 200
```

nama `iq` sekarang mereferensikan object dengan nilai `200`.

```text
        iq
         │
         ▼
      ┌─────┐
      │ 200 │
      └─────┘
```

Model ini akan menjadi semakin penting ketika kita mempelajari **object, reference, mutable, immutable, dan memory management**.

---

## 18. Best Practices Penamaan Variable

Beberapa kebiasaan yang baik ketika memberikan nama variable:

### Gunakan Nama yang Deskriptif

```python
user_name = "Andrei"
```

lebih jelas daripada:

```python
x = "Andrei"
```

### Gunakan `snake_case`

```python
first_name = "Andrei"
total_price = 50000
user_age = 25
```

### Gunakan Nama yang Tidak Terlalu Panjang

Nama variable sebaiknya cukup deskriptif tanpa menjadi terlalu panjang.

Contohnya:

```python
total_price = 50000
```

lebih praktis daripada nama yang terlalu panjang dan sulit dibaca.

### Hindari Singkatan yang Tidak Jelas

Contoh:

```python
usr_nm = "Andrei"
```

lebih sulit dipahami dibandingkan:

```python
user_name = "Andrei"
```

Gunakan singkatan hanya jika memang sudah umum dan mudah dipahami.

---

## 19. Ringkasan Aturan Variable

| Aturan | Contoh |
| --- | --- |
| Gunakan huruf atau `_` di awal | `name`, `_name` |
| Angka tidak boleh di awal | `user1` valid, `1user` tidak valid |
| Angka boleh setelah karakter pertama | `user1` |
| Gunakan `snake_case` | `user_name` |
| Python bersifat case sensitive | `name` ≠ `Name` |
| Hindari keyword Python | Jangan gunakan `class`, `def`, `if` |
| Hindari menimpa built-in | Jangan gunakan `print`, `type`, `list` |
| Gunakan nama yang deskriptif | `total_price` |
| Constant umumnya menggunakan huruf kapital | `MAX_USERS` |
| Hindari membuat nama dunder sendiri | Hindari `__my_variable__` |

---

## Kesimpulan

Variable merupakan konsep fundamental dalam Python yang digunakan untuk memberikan nama pada object atau nilai sehingga dapat digunakan kembali dalam program.

Contoh sederhana:

```python
name = "Andrei"
age = 25
```

Dalam Python, variable dapat mereferensikan berbagai tipe data dan dapat diubah selama program berjalan.

Hal penting yang perlu diperhatikan adalah **penamaan variable**.

Gunakan nama yang:

- Jelas.
- Deskriptif.
- Konsisten.
- Mengikuti gaya `snake_case`.
- Tidak menggunakan keyword Python.
- Tidak menimpa built-in function atau built-in type.

Contohnya:

```python
user_name = "Andrei"
user_age = 25
total_price = 50000
```

Penamaan variable yang baik akan membuat kode lebih mudah dibaca, dipahami, dan dirawat.

:::tip
**Code is read much more often than it is written.**
:::

Karena itu, biasakan memberikan nama variable yang dapat membantu programmer lain memahami maksud kode tanpa harus menebak-nebak.