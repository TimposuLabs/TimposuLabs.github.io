---
sidebar_position: 34
title: "Dictionary"
---

**Dictionary** adalah salah satu struktur data bawaan Python yang digunakan untuk menyimpan data dalam bentuk pasangan **key dan value**.

Berbeda dengan list yang menggunakan index untuk mengakses data, dictionary menggunakan **key** sebagai identitas setiap data.

---

## 1. Apa Itu Dictionary?

Dictionary menyimpan data dalam bentuk:

```text
key → value
```

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25,
    "country": "Indonesia"
}
```

Dictionary tersebut memiliki tiga pasangan data:

```text
name    → Andi
age     → 25
country → Indonesia
```

Dictionary menggunakan tanda kurung kurawal:

```python
{}
```

---

## 2. Struktur Dictionary

Bentuk dasar dictionary:

```python
dictionary = {
    "key1": value1,
    "key2": value2
}
```

Contohnya:

```python
person = {
    "name": "Andi",
    "age": 25
}
```

Setiap pasangan terdiri dari:

```text
key : value
```

Contohnya:

```text
"name" : "Andi"
```

di mana:

```text
key   → "name"
value → "Andi"
```

---

## 3. Mengakses Value Menggunakan Key

Untuk mengambil value dari dictionary, gunakan key di dalam tanda kurung siku.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25
}

print(user["name"])
```

Hasil:

```text
Andi
```

Contoh lainnya:

```python
print(user["age"])
```

Hasil:

```text
25
```

Berbeda dengan list:

```python
user[0]
```

Dictionary tidak menggunakan index numerik untuk mengakses data.

---

## 4. Dictionary Tidak Menggunakan Index Seperti List

Pada list:

```python
users = ["Andi", "Budi", "Citra"]

print(users[0])
```

Data diakses berdasarkan posisi:

```text
index 0 → Andi
index 1 → Budi
index 2 → Citra
```

Sedangkan dictionary menggunakan key:

```python
user = {
    "name": "Andi",
    "age": 25
}

print(user["name"])
```

Data diakses berdasarkan nama key:

```text
"name" → "Andi"
"age"  → 25
```

---

## 5. Key dan Value

Dalam dictionary, **key** berfungsi sebagai identitas data, sedangkan **value** merupakan data yang disimpan.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25,
    "is_active": True
}
```

Strukturnya:

```text
Key         Value
──────────  ─────────
"name"      "Andi"
"age"       25
"is_active" True
```

---

## 6. Tipe Data pada Value

Value dalam dictionary sangat fleksibel.

Value dapat berupa berbagai tipe data seperti:

- `str`
- `int`
- `float`
- `bool`
- `list`
- `tuple`
- `set`
- dictionary lainnya

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25,
    "height": 170.5,
    "is_active": True,
    "hobbies": ["coding", "reading", "gaming"]
}
```

Setiap key dapat memiliki value dengan tipe data yang berbeda.

---

## 7. List di Dalam Dictionary

Dictionary dapat menyimpan list sebagai value.

Contohnya:

```python
user = {
    "name": "Andi",
    "hobbies": ["coding", "reading", "gaming"]
}
```

Untuk mengambil seluruh list:

```python
print(user["hobbies"])
```

Hasil:

```text
['coding', 'reading', 'gaming']
```

---

## 8. Mengakses Elemen List di Dalam Dictionary

Karena value `hobbies` merupakan list, kita dapat menggunakan index setelah mengambil value tersebut.

Contohnya:

```python
print(user["hobbies"][0])
```

Hasil:

```text
coding
```

Prosesnya:

```text
user["hobbies"]
       ↓
["coding", "reading", "gaming"]
       ↓
       [0]
       ↓
    "coding"
```

---

## 9. Dictionary di Dalam Dictionary

Dictionary juga dapat menyimpan dictionary lainnya.

Struktur seperti ini disebut **nested dictionary**.

Contohnya:

```python
user = {
    "name": "Andi",
    "address": {
        "city": "Palu",
        "country": "Indonesia"
    }
}
```

Untuk mengambil `city`:

```python
print(user["address"]["city"])
```

Hasil:

```text
Palu
```

Prosesnya:

```text
user
 ↓
address
 ↓
city
 ↓
Palu
```

---

## 10. Nested Dictionary

Nested dictionary berguna ketika data memiliki struktur yang lebih kompleks.

Contohnya:

```python
product = {
    "name": "Laptop",
    "price": 10000000,
    "seller": {
        "name": "Andi",
        "city": "Palu"
    }
}
```

Untuk mengambil nama penjual:

```python
print(product["seller"]["name"])
```

Hasil:

```text
Andi
```

---

## 11. List Berisi Dictionary

List dan dictionary sering digunakan bersama.

Contohnya:

```python
users = [
    {
        "name": "Andi",
        "age": 25
    },
    {
        "name": "Budi",
        "age": 30
    }
]
```

Struktur tersebut dapat dibayangkan:

```text
users
  │
  ├── Dictionary 1
  │     ├── name → Andi
  │     └── age  → 25
  │
  └── Dictionary 2
        ├── name → Budi
        └── age  → 30
```

---

## 12. Mengakses Dictionary di Dalam List

Karena `users` merupakan list, kita menggunakan index terlebih dahulu.

Contohnya:

```python
print(users[0])
```

Hasil:

```text
{'name': 'Andi', 'age': 25}
```

Kemudian kita dapat mengambil value tertentu menggunakan key:

```python
print(users[0]["name"])
```

Hasil:

```text
Andi
```

Prosesnya:

```text
users
  ↓
[0]
  ↓
Dictionary pertama
  ↓
["name"]
  ↓
"Andi"
```

---

## 13. Mengakses Data yang Lebih Kompleks

List dan dictionary dapat dikombinasikan beberapa tingkat.

Contohnya:

```python
data = [
    {
        "name": "Andi",
        "hobbies": ["coding", "reading"]
    },
    {
        "name": "Budi",
        "hobbies": ["gaming", "music"]
    }
]
```

Untuk mengambil `"coding"`:

```python
print(data[0]["hobbies"][0])
```

Hasil:

```text
coding
```

Kita menggunakan:

```text
[0]
```

untuk mengambil dictionary pertama,

kemudian:

```text
["hobbies"]
```

untuk mengambil list hobbies,

dan:

```text
[0]
```

untuk mengambil elemen pertama dari list tersebut.

---

## 14. Dictionary dan Data Terstruktur

Dictionary sangat cocok digunakan untuk merepresentasikan data yang memiliki berbagai atribut.

Contohnya data pengguna:

```python
user = {
    "id": 101,
    "name": "Andi",
    "email": "andi@example.com",
    "age": 25,
    "is_active": True
}
```

Setiap informasi memiliki nama yang jelas:

```text
id
name
email
age
is_active
```

Hal ini membuat data lebih mudah dipahami dibandingkan menggunakan list berdasarkan posisi.

---

## 15. Dictionary dan JSON

Struktur dictionary sangat mirip dengan format data **JSON (JavaScript Object Notation)** yang banyak digunakan dalam pengembangan aplikasi web dan REST API.

Contoh dictionary Python:

```python
user = {
    "name": "Andi",
    "age": 25,
    "is_active": True
}
```

Secara konsep sangat mirip dengan JSON:

```json
{
    "name": "Andi",
    "age": 25,
    "is_active": true
}
```

Namun perlu diingat bahwa **dictionary Python dan JSON bukan hal yang sama**.

Dictionary adalah struktur data Python, sedangkan JSON adalah format pertukaran data.

---

## 16. Dictionary Bersifat Mutable

Dictionary dapat diubah setelah dibuat.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25
}

user["age"] = 26

print(user)
```

Hasil:

```text
{'name': 'Andi', 'age': 26}
```

Value pada key `"age"` berhasil diubah.

---

## 17. Menambahkan Data ke Dictionary

Kita juga dapat menambahkan pasangan key dan value baru.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25
}

user["city"] = "Palu"

print(user)
```

Hasil:

```text
{'name': 'Andi', 'age': 25, 'city': 'Palu'}
```

Key `"city"` sebelumnya belum ada, sehingga Python menambahkannya ke dictionary.

---

## 18. Mengubah Value

Jika key sudah ada, assignment akan mengubah value.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25
}

user["name"] = "Budi"

print(user)
```

Hasil:

```text
{'name': 'Budi', 'age': 25}
```

Jadi assignment pada dictionary dapat digunakan untuk:

```text
Key belum ada
    ↓
Menambahkan data

Key sudah ada
    ↓
Mengubah data
```

---

## 19. Key Harus Bersifat Hashable

Key pada dictionary harus menggunakan tipe data yang dapat digunakan sebagai **hashable object**.

Dalam pembelajaran dasar, tipe yang umum digunakan sebagai key adalah:

```python
str
int
float
bool
tuple
```

Contohnya:

```python
user = {
    "name": "Andi",
    1: "Admin",
    2: "User"
}
```

Namun tipe data seperti `list` tidak dapat digunakan sebagai key karena bersifat mutable.

Untuk tahap dasar, yang paling umum dan mudah digunakan adalah string:

```python
{
    "name": "Andi",
    "age": 25
}
```

---

## 20. Perbedaan List dan Dictionary

| Karakteristik | List | Dictionary |
| --- | --- | --- |
| Sintaks | `[]` | `{}` |
| Struktur | Kumpulan elemen | Key-value |
| Akses data | Index | Key |
| Contoh akses | `data[0]` | `data["name"]` |
| Mutable | Ya | Ya |
| Cocok untuk | Data berdasarkan urutan | Data berdasarkan atribut |

Contoh list:

```python
user = ["Andi", 25, "Palu"]
```

Kita harus mengetahui posisi setiap data:

```text
[0] → nama
[1] → umur
[2] → kota
```

Sedangkan dictionary:

```python
user = {
    "name": "Andi",
    "age": 25,
    "city": "Palu"
}
```

Nama key menjelaskan data secara langsung.

---

## 21. Dictionary pada Python Modern

Pada Python modern, dictionary mempertahankan urutan item berdasarkan urutan saat item tersebut dimasukkan.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25,
    "city": "Palu"
}
```

Urutan data akan dipertahankan sebagai:

```text
name
age
city
```

Namun, dictionary tetap berbeda dari list karena cara utama mengakses datanya adalah menggunakan **key**, bukan index.

---

## 22. Contoh Dictionary Sederhana

```python
student = {
    "name": "Andi",
    "age": 22,
    "major": "Informatics"
}

print(student["name"])
print(student["age"])
print(student["major"])
```

Hasil:

```text
Andi
22
Informatics
```

---

## 23. Contoh Data Produk

Dictionary juga cocok digunakan untuk merepresentasikan produk.

```python
product = {
    "name": "Laptop",
    "price": 10000000,
    "stock": 10,
    "is_available": True
}
```

Mengakses harga:

```python
print(product["price"])
```

Hasil:

```text
10000000
```

Mengakses status produk:

```python
print(product["is_available"])
```

Hasil:

```text
True
```

---

## 24. Ringkasan Struktur Dictionary

Bentuk dasar:

```python
dictionary = {
    "key": "value"
}
```

Mengakses value:

```python
dictionary["key"]
```

Mengubah value:

```python
dictionary["key"] = "new value"
```

Menambahkan data:

```python
dictionary["new_key"] = "new value"
```

Nested dictionary:

```python
dictionary = {
    "user": {
        "name": "Andi"
    }
}
```

List berisi dictionary:

```python
users = [
    {"name": "Andi"},
    {"name": "Budi"}
]
```

---

## Kesimpulan

**Dictionary** adalah struktur data Python yang menyimpan informasi dalam bentuk pasangan:

```text
key → value
```

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25,
    "is_active": True
}
```

Data diakses menggunakan key:

```python
user["name"]
```

Dictionary sangat cocok untuk menyimpan data yang memiliki **atribut atau informasi yang terstruktur**, seperti:

- Data pengguna.
- Data produk.
- Data mahasiswa.
- Konfigurasi aplikasi.
- Data API.
- Data JSON.

Dictionary juga dapat dikombinasikan dengan list dan dictionary lainnya sehingga dapat membentuk struktur data yang kompleks.

:::tip
**Gunakan list ketika data terutama diakses berdasarkan urutan atau posisi, dan gunakan dictionary ketika data lebih mudah dipahami berdasarkan nama atau atributnya.**
:::