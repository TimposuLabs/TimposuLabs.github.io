---
sidebar_position: 33
title: "None"
---

## Tipe Data `None`

Dalam Python, terdapat sebuah nilai khusus bernama `None`.

`None` digunakan untuk menunjukkan bahwa **tidak terdapat nilai** atau suatu nilai **belum tersedia**.

Konsep ini sering ditemukan dalam berbagai program Python, terutama ketika sebuah variable perlu memiliki keadaan "belum memiliki nilai".

---

## 1. Apa Itu `None`?

`None` adalah sebuah nilai khusus dalam Python yang merepresentasikan **ketiadaan nilai** (*absence of value*).

Contohnya:

```python
weapons = None

print(weapons)
```

Hasil:

```text
None
```

Variable `weapons` tetap ada, tetapi nilainya adalah `None`.

---

## 2. `None` Memiliki Tipe `NoneType`

`None` memiliki tipe data khusus yang disebut:

```text
NoneType
```

Kita dapat memeriksa tipenya menggunakan `type()`:

```python
result = None

print(type(result))
```

Hasil:

```text
<class 'NoneType'>
```

Jadi:

```text
None
  ↓
NoneType
```

---

## 3. `None` Bukan String

Penting untuk membedakan:

```python
None
```

dengan:

```python
"None"
```

Yang pertama merupakan nilai khusus Python:

```python
value = None
```

Sedangkan yang kedua merupakan string:

```python
value = "None"
```

Periksa tipenya:

```python
print(type(None))
print(type("None"))
```

Hasil:

```text
<class 'NoneType'>
<class 'str'>
```

Jadi:

```text
None
    → NoneType

"None"
    → str
```

---

## 4. `None` Bersifat Case-Sensitive

Penulisan `None` harus menggunakan huruf `N` kapital.

Penulisan yang benar:

```python
value = None
```

Sedangkan:

```python
value = none
```

akan dianggap sebagai nama variable bernama `none`, bukan nilai khusus Python.

Karena itu, selalu gunakan:

```python
None
```

---

## 5. `None` sebagai Placeholder

Salah satu penggunaan umum `None` adalah sebagai **placeholder**, yaitu nilai sementara ketika sebuah data belum tersedia.

Contohnya:

```python
weapons = None
```

Dalam sebuah game, variable tersebut dapat menunjukkan bahwa pemain belum memiliki senjata.

Kemudian setelah pemain mendapatkan senjata:

```python
weapons = "Sword"
```

Awalnya:

```text
weapons → None
```

Kemudian:

```text
weapons → "Sword"
```

Dengan demikian, `None` dapat digunakan untuk menunjukkan kondisi bahwa data belum tersedia.

---

## 6. Contoh dalam Program

Misalnya sebuah program menyimpan informasi pengguna:

```python
username = "Andi"
profile_picture = None
```

Artinya:

```text
username       → memiliki nilai
profile_picture → belum memiliki nilai
```

Ketika pengguna mengunggah foto:

```python
profile_picture = "profile.jpg"
```

Sekarang variable tersebut memiliki nilai.

---

## 7. `None` Berbeda dengan `0`

`None` bukan angka `0`.

Contohnya:

```python
a = None
b = 0

print(a)
print(b)
```

Hasil:

```text
None
0
```

Keduanya memiliki makna berbeda:

```text
None
→ Tidak ada nilai

0
→ Memiliki nilai berupa angka nol
```

---

## 8. `None` Berbeda dengan String Kosong

`None` juga berbeda dengan string kosong:

```python
value = ""
```

String kosong tetap merupakan sebuah string.

Contohnya:

```python
print(type(""))
```

Hasil:

```text
<class 'str'>
```

Sedangkan:

```python
print(type(None))
```

Hasil:

```text
<class 'NoneType'>
```

Perbandingannya:

```text
None
→ Tidak ada nilai

""
→ String yang tidak memiliki karakter

0
→ Angka nol
```

Ketiganya memiliki makna yang berbeda.

---

## 9. `None` sebagai Return Value

Beberapa function atau method dapat mengembalikan `None`.

Hal ini sering ditemukan pada method yang melakukan perubahan secara langsung (*in-place*).

Contohnya:

```python
basket = [1, 2, 3]

result = basket.append(4)

print(result)
```

Hasil:

```text
None
```

Namun list tetap berubah:

```python
print(basket)
```

Hasil:

```text
[1, 2, 3, 4]
```

Artinya:

```text
append()
   ↓
Mengubah list
   ↓
Tidak menghasilkan nilai baru
   ↓
Return value = None
```

---

## 10. Contoh dengan `sort()`

Hal yang sama terjadi pada `sort()`.

```python
numbers = [3, 1, 2]

result = numbers.sort()

print(result)
```

Hasil:

```text
None
```

Namun:

```python
print(numbers)
```

menghasilkan:

```text
[1, 2, 3]
```

Method tersebut melakukan perubahan terhadap list secara langsung.

---

## 11. `None` sebagai Penanda Belum Ada Hasil

`None` juga dapat digunakan untuk menunjukkan bahwa suatu proses belum menghasilkan data.

Contohnya:

```python
result = None
```

Kemudian setelah proses selesai:

```python
result = 100
```

Strukturnya:

```text
Sebelum proses
      ↓
result = None
      ↓
Proses berjalan
      ↓
result = 100
```

Pendekatan seperti ini sering digunakan dalam program yang memiliki data atau hasil yang belum tersedia.

---

## 12. Memeriksa `None`

Untuk memeriksa apakah sebuah variable bernilai `None`, gunakan:

```python
is None
```

Contohnya:

```python
value = None

print(value is None)
```

Hasil:

```text
True
```

Jika variable memiliki nilai:

```python
value = 100

print(value is None)
```

Hasil:

```text
False
```

Untuk saat ini, cukup pahami bahwa `is None` merupakan cara yang umum dan tepat untuk memeriksa nilai `None`.

---

## 13. `None` sebagai Nilai Tunggal

`None` merupakan nilai khusus yang hanya memiliki satu instance dalam Python.

Kita tidak membuat `None` dengan constructor seperti membuat object biasa.

Kita cukup menggunakan:

```python
None
```

Contohnya:

```python
value = None
```

Tidak perlu:

```python
None()
```

---

## 14. Contoh Penggunaan pada Data

Misalnya sebuah aplikasi menyimpan informasi pesanan:

```python
order_id = 123
payment_status = None
```

`payment_status` dapat menggunakan `None` untuk menunjukkan bahwa status pembayaran belum tersedia.

Setelah pembayaran berhasil:

```python
payment_status = "paid"
```

Dengan demikian:

```text
None
   ↓
Belum tersedia

"paid"
   ↓
Sudah tersedia
```

---

## 15. Ringkasan Perbedaan

| Nilai | Tipe | Makna |
| --- | --- | --- |
| `None` | `NoneType` | Tidak ada nilai |
| `0` | `int` | Angka nol |
| `""` | `str` | String kosong |
| `"None"` | `str` | Teks "None" |
| `False` | `bool` | Nilai Boolean False |

Meskipun beberapa nilai tersebut dapat digunakan untuk merepresentasikan kondisi tertentu dalam program, maknanya tidak sama.

---

## 16. Contoh Sederhana

```python
username = "Andi"
email = None
age = 25

print(username)
print(email)
print(age)
```

Hasil:

```text
Andi
None
25
```

Dalam contoh tersebut:

```text
username
→ memiliki nilai string

email
→ belum memiliki nilai

age
→ memiliki nilai integer
```

---

## Kesimpulan

`None` adalah nilai khusus dalam Python yang digunakan untuk merepresentasikan **ketiadaan nilai**.

Contoh:

```python
value = None
```

Tipe datanya:

```python
type(value)
```

adalah:

```text
<class 'NoneType'>
```

`None` sering digunakan sebagai:

- Placeholder ketika data belum tersedia.
- Penanda bahwa suatu variable belum memiliki nilai.
- Return value dari function atau method yang tidak menghasilkan nilai.
- Representasi kondisi tertentu dalam sebuah program.

Perhatikan juga perbedaannya dengan:

```text
None
0
""
False
```

Keempatnya memiliki makna dan tipe data yang berbeda.

:::tip
**Pahami `None` sebagai "tidak ada nilai", bukan sebagai angka nol, string kosong, atau `False`.**
:::