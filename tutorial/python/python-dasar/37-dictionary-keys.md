---
sidebar_position: 37
title: "Dictionary Keys"
---

Dalam dictionary, **key** digunakan sebagai identitas untuk mengakses sebuah value.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25
}
```

Pada contoh tersebut:

```text
"name" → key
"Andi" → value

"age" → key
25    → value
```

Berbeda dengan `value` yang dapat berupa berbagai macam tipe data, **key memiliki aturan tertentu**.

---

## 1. Key Harus Bersifat Immutable

Salah satu aturan utama dictionary adalah key harus menggunakan objek yang bersifat **immutable** dan dapat di-*hash*.

Beberapa tipe data yang umum digunakan sebagai key:

- `str`
- `int`
- `float`
- `bool`
- `tuple` yang elemennya juga dapat di-*hash*

Contohnya:

```python
data = {
    "name": "Andi",
    123: "hello",
    3.14: "pi",
    True: "active"
}
```

Semua contoh tersebut valid.

---

## 2. Key Tidak Boleh Menggunakan List

`list` bersifat **mutable**, sehingga tidak dapat digunakan sebagai key dictionary.

Contoh:

```python
user = {
    [100]: "hello"
}
```

Kode tersebut akan menghasilkan error:

```text
TypeError: unhashable type: 'list'
```

Hal yang sama berlaku untuk `set` dan `dict` karena keduanya juga bersifat mutable.

Contoh yang tidak valid:

```python
data = {
    [1, 2]: "list"
}
```

```python
data = {
    {1, 2}: "set"
}
```

```python
data = {
    {"id": 1}: "dictionary"
}
```

Ketiganya tidak dapat digunakan sebagai key.

---

## 3. Mengapa Key Harus Immutable?

Dictionary menggunakan mekanisme **hashing** untuk menyimpan dan menemukan key secara efisien.

Secara sederhana, Python menghasilkan informasi hash dari sebuah key untuk menentukan lokasi penyimpanannya.

Karena itu, key harus memiliki nilai yang stabil.

Bayangkan jika sebuah list digunakan sebagai key:

```python
key = [1, 2, 3]
```

Kemudian isi list tersebut berubah:

```python
key.append(4)
```

Nilai key sekarang menjadi:

```python
[1, 2, 3, 4]
```

Perubahan tersebut dapat menyebabkan masalah pada mekanisme hashing.

Karena itulah Python hanya mengizinkan objek yang dapat digunakan secara aman sebagai key.

---

## 4. String sebagai Key

String merupakan tipe data yang paling umum digunakan sebagai key.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25,
    "email": "andi@example.com"
}
```

Penggunaan string sebagai key membuat struktur dictionary mudah dibaca.

```python
print(user["name"])
print(user["email"])
```

Hasil:

```text
Andi
andi@example.com
```

---

## 5. Integer sebagai Key

Integer juga dapat digunakan sebagai key.

Contohnya:

```python
users = {
    1: "Andi",
    2: "Budi",
    3: "Citra"
}
```

Untuk mengakses data:

```python
print(users[1])
```

Hasil:

```text
Andi
```

Penggunaan seperti ini dapat berguna ketika key memang berupa identifier numerik.

---

## 6. Tuple sebagai Key

Tuple dapat digunakan sebagai key karena tuple bersifat immutable.

Contohnya:

```python
locations = {
    (0, 0): "Start",
    (1, 2): "Point A",
    (3, 4): "Point B"
}
```

Mengakses data:

```python
print(locations[(1, 2)])
```

Hasil:

```text
Point A
```

Namun, perlu diperhatikan bahwa tuple hanya dapat digunakan sebagai key jika seluruh elemennya juga dapat di-*hash*.

Contohnya:

```python
data = {
    (1, 2, 3): "valid"
}
```

Valid.

Sedangkan tuple yang berisi list:

```python
data = {
    ([1, 2], 3): "invalid"
}
```

tidak valid karena `list` tidak dapat di-*hash*.

---

## 7. Key Harus Unik

Selain harus dapat di-*hash*, key dalam sebuah dictionary harus **unik**.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25
}
```

Tidak boleh mengharapkan dua value berbeda berada pada key yang sama:

```python
user = {
    "name": "Andi",
    "name": "Budi"
}
```

Python akan menggunakan value terakhir.

```python
print(user["name"])
```

Hasil:

```text
Budi
```

Value `"Andi"` telah tertimpa.

---

## 8. Duplicate Key Akan Menimpa Value Lama

Perhatikan contoh berikut:

```python
user = {
    "id": 100,
    "id": 200
}

print(user)
```

Hasilnya:

```text
{"id": 200}
```

Key `"id"` hanya ada satu.

Value yang terakhir diberikan akan menggantikan value sebelumnya.

Secara sederhana:

```text
"id": 100
     ↓
"id": 200
     ↓
value lama tertimpa
```

---

## 9. Key dan Value Memiliki Aturan yang Berbeda

Salah satu hal penting yang perlu dipahami adalah **key dan value tidak memiliki aturan yang sama**.

Contohnya:

```python
user = {
    "name": "Andi",
    "hobbies": ["coding", "reading"],
    "address": {
        "city": "Palu"
    }
}
```

Pada contoh tersebut:

```text
Key:
"name"
"hobbies"
"address"
```

semuanya berupa string dan bersifat immutable.

Sedangkan value dapat berupa:

```text
"Andi"                    → string
["coding", "reading"]     → list
{"city": "Palu"}          → dictionary
```

Jadi, **value dapat menggunakan tipe data mutable**, sedangkan key memiliki persyaratan yang lebih ketat.

---

## 10. Key String Lebih Umum Digunakan

Dalam aplikasi Python, key berupa string merupakan pilihan yang paling umum.

Contohnya:

```python
product = {
    "name": "Laptop",
    "price": 10000000,
    "stock": 10,
    "category": "Electronics"
}
```

Key seperti:

```text
"name"
"price"
"stock"
"category"
```

langsung menjelaskan arti data yang disimpan.

---

## 11. Gunakan Key yang Deskriptif

Sebaiknya gunakan nama key yang jelas dan mudah dipahami.

Contoh yang baik:

```python
user = {
    "username": "andi",
    "email": "andi@example.com",
    "is_active": True
}
```

Dibandingkan:

```python
user = {
    "a": "andi",
    "b": "andi@example.com",
    "c": True
}
```

Keduanya valid, tetapi contoh pertama jauh lebih mudah dipahami.

---

## 12. Key Bersifat Case-Sensitive

Key string bersifat **case-sensitive**.

Artinya:

```python
user = {
    "name": "Andi",
    "Name": "Budi"
}
```

`"name"` dan `"Name"` dianggap sebagai dua key yang berbeda.

```python
print(user["name"])
print(user["Name"])
```

Hasil:

```text
Andi
Budi
```

Karena huruf besar dan kecil dianggap berbeda.

---

## 13. Contoh Dictionary dengan Berbagai Key

Python memungkinkan berbagai tipe data yang memenuhi aturan hashing untuk digunakan sebagai key.

```python
data = {
    "name": "Andi",
    100: "ID",
    3.14: "Pi",
    True: "Active",
    (1, 2): "Coordinate"
}
```

Namun dalam praktik pengembangan aplikasi, penggunaan string sebagai key jauh lebih umum.

---

## 14. Kesalahan Umum

### Menggunakan List sebagai Key

```python
data = {
    [1, 2, 3]: "data"
}
```

Tidak valid karena list bersifat mutable.

---

### Menggunakan Dictionary sebagai Key

```python
data = {
    {"id": 1}: "data"
}
```

Tidak valid karena dictionary bersifat mutable.

---

### Menggunakan Set sebagai Key

```python
data = {
    {1, 2, 3}: "data"
}
```

Tidak valid karena set bersifat mutable.

---

### Menggunakan Key yang Sama

```python
data = {
    "name": "Andi",
    "name": "Budi"
}
```

Tidak menghasilkan dua data dengan key `"name"`.

Value terakhir akan digunakan:

```text
"name" → "Budi"
```

---

## 15. Ringkasan Aturan Dictionary Key

Secara sederhana, sebuah key harus memenuhi dua prinsip utama:

### 1. Dapat di-Hash

Key harus menggunakan objek yang dapat digunakan dalam mekanisme hashing Python.

Contoh umum:

```python
str
int
float
bool
tuple
```

### 2. Unik

Dalam satu dictionary, setiap key hanya dapat muncul satu kali.

Contoh:

```python
{
    "name": "Andi"
}
```

Tidak dapat memiliki dua key `"name"` yang berbeda secara bersamaan.

---

## 16. Perbandingan Key dan Value

| Karakteristik | Key | Value |
| --- | --- | --- |
| Harus unik | Ya | Tidak |
| Harus dapat di-hash | Ya | Tidak |
| Dapat berupa `str` | Ya | Ya |
| Dapat berupa `int` | Ya | Ya |
| Dapat berupa `list` | Tidak | Ya |
| Dapat berupa `dict` | Tidak | Ya |
| Dapat berupa `set` | Tidak | Ya |
| Umumnya berupa string | Ya | Tidak harus |

---

## Kesimpulan

**Dictionary key** memiliki aturan yang lebih ketat dibandingkan value.

Key harus:

1. **Dapat di-hash**.
2. **Tidak berubah selama digunakan sebagai key**.
3. **Unik dalam dictionary**.

Contoh yang umum:

```python
user = {
    "username": "andi",
    "age": 25,
    "is_active": True
}
```

Key:

```text
"username"
"age"
"is_active"
```

sedangkan value:

```text
"andi"
25
True
```

:::info
**Poin penting:** `list`, `set`, dan `dict` tidak dapat digunakan sebagai key karena bersifat mutable. Untuk penggunaan sehari-hari, **string merupakan tipe data yang paling umum dan mudah dipahami sebagai dictionary key.**
:::