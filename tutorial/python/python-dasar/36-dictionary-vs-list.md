---
sidebar_position: 36
title: "Dictionary vs List"
---

Dalam Python, `list` dan `dict` sama-sama digunakan untuk menyimpan kumpulan data. Namun, keduanya memiliki tujuan dan karakteristik yang berbeda.

Memahami kapan harus menggunakan `list` atau `dict` merupakan salah satu kemampuan dasar yang penting dalam menulis program yang baik.

---

## 1. Kapan Menggunakan Dictionary?

**Dictionary** cocok digunakan ketika data memiliki hubungan **key-value** atau memiliki atribut yang jelas.

Contohnya adalah data seorang pengguna:

```python
user_profile = {
    "age": 22,
    "username": "superman",
    "weapons": ["shield", "laser"],
    "is_active": True
}
```

Data tersebut memiliki beberapa atribut:

```text
age
username
weapons
is_active
```

Setiap data memiliki nama atau **key** yang menjelaskan maknanya.

---

## 2. Karakteristik Dictionary

Dictionary cocok digunakan ketika:

- Data memiliki beberapa atribut.
- Setiap nilai memiliki nama atau label.
- Data merepresentasikan suatu objek atau entitas.
- Kita ingin mengakses data berdasarkan nama atau key.
- Struktur data lebih penting daripada posisi elemen.

Contohnya:

```python
product = {
    "name": "Laptop",
    "price": 10000000,
    "stock": 10,
    "is_available": True
}
```

Untuk mendapatkan harga:

```python
print(product["price"])
```

Kita tidak perlu mengingat bahwa harga berada di posisi tertentu.

Kita cukup menggunakan key:

```python
"price"
```

---

## 3. Contoh Data yang Cocok Menggunakan Dictionary

Beberapa contoh data yang biasanya cocok direpresentasikan menggunakan dictionary:

### Data Pengguna

```python
user = {
    "name": "Andi",
    "age": 25,
    "email": "andi@example.com"
}
```

### Data Produk

```python
product = {
    "name": "Laptop",
    "price": 10000000,
    "stock": 5
}
```

### Data Mahasiswa

```python
student = {
    "name": "Budi",
    "nim": "20260001",
    "major": "Informatics"
}
```

Dalam contoh tersebut, setiap data memiliki atribut yang jelas.

---

## 4. Kapan Menggunakan List?

**List** cocok digunakan ketika kita ingin menyimpan sekumpulan data dalam sebuah **urutan tertentu**.

Contohnya:

```python
shopping_cart = [
    "apples",
    "milk",
    "bread"
]
```

Setiap item memiliki posisi:

```text
index 0 → apples
index 1 → milk
index 2 → bread
```

Kita dapat mengakses item berdasarkan index:

```python
print(shopping_cart[0])
```

Hasil:

```text
apples
```

---

## 5. Karakteristik List

List cocok digunakan ketika:

- Urutan data penting.
- Data diakses berdasarkan posisi atau index.
- Kita memiliki kumpulan data.
- Data akan diproses secara berurutan.
- Kita sering melakukan iterasi terhadap kumpulan data.

Contohnya:

```python
high_scores = [98, 95, 87, 80]
```

Urutan nilai tersebut penting karena menunjukkan ranking:

```text
98 → peringkat 1
95 → peringkat 2
87 → peringkat 3
80 → peringkat 4
```

---

## 6. Contoh Data yang Cocok Menggunakan List

### Daftar Belanja

```python
shopping_cart = [
    "apples",
    "milk",
    "bread"
]
```

### Daftar Nilai

```python
scores = [90, 85, 78, 95]
```

### Daftar Nama

```python
names = [
    "Andi",
    "Budi",
    "Citra"
]
```

### Urutan Proses

```python
steps = [
    "login",
    "select product",
    "checkout",
    "payment"
]
```

Dalam contoh tersebut, **posisi atau urutan data memiliki arti**.

---

## 7. Perbandingan Sederhana

Bayangkan kita ingin menyimpan data seseorang.

Jika menggunakan list:

```python
user = [
    "Andi",
    25,
    "Palu"
]
```

Kita harus mengetahui arti setiap posisi:

```text
index 0 → nama
index 1 → umur
index 2 → kota
```

Sedangkan menggunakan dictionary:

```python
user = {
    "name": "Andi",
    "age": 25,
    "city": "Palu"
}
```

Strukturnya jauh lebih jelas:

```text
name → Andi
age  → 25
city → Palu
```

Untuk data seperti ini, dictionary lebih sesuai.

---

## 8. List untuk Sekumpulan Data

Misalnya kita hanya ingin menyimpan daftar nama:

```python
users = [
    "Andi",
    "Budi",
    "Citra"
]
```

Tidak ada atribut tambahan yang perlu disimpan.

Kita hanya membutuhkan sekumpulan nama yang terurut.

Dalam kasus ini, `list` lebih tepat.

---

## 9. Dictionary untuk Data dengan Atribut

Jika setiap pengguna memiliki beberapa informasi:

```python
users = {
    "name": "Andi",
    "age": 25,
    "city": "Palu",
    "is_active": True
}
```

Dictionary lebih sesuai karena setiap nilai memiliki atribut atau label.

---

## 10. List dan Dictionary Dapat Digabungkan

Dalam program nyata, kita tidak selalu harus memilih salah satu.

`list` dan `dict` sering digunakan secara bersamaan.

Contohnya, daftar pengguna:

```python
users = [
    {
        "name": "Andi",
        "age": 25
    },
    {
        "name": "Budi",
        "age": 30
    },
    {
        "name": "Citra",
        "age": 27
    }
]
```

Strukturnya:

```text
List
 │
 ├── Dictionary
 │     ├── name
 │     └── age
 │
 ├── Dictionary
 │     ├── name
 │     └── age
 │
 └── Dictionary
       ├── name
       └── age
```

List digunakan untuk menyimpan **kumpulan pengguna**, sedangkan dictionary digunakan untuk menyimpan **atribut masing-masing pengguna**.

---

## 11. Contoh Penggunaan List + Dictionary

Misalnya data produk:

```python
products = [
    {
        "name": "Laptop",
        "price": 10000000
    },
    {
        "name": "Mouse",
        "price": 500000
    },
    {
        "name": "Keyboard",
        "price": 750000
    }
]
```

Di sini:

```text
List
→ menyimpan kumpulan produk

Dictionary
→ menyimpan informasi setiap produk
```

Kombinasi seperti ini sangat umum digunakan dalam aplikasi.

---

## 12. Perbandingan List dan Dictionary

| Karakteristik | List | Dictionary |
| --- | --- | --- |
| Sintaks | `[]` | `{}` |
| Struktur | Kumpulan elemen | Key-value |
| Akses | Index | Key |
| Contoh akses | `data[0]` | `data["name"]` |
| Fokus | Urutan data | Hubungan data |
| Cocok untuk | Sekumpulan data | Data dengan atribut |
| Urutan | Penting | Insertion order dipertahankan pada Python modern |
| Contoh | Daftar nama | Profil pengguna |

---

## 13. Pertanyaan Sederhana untuk Menentukan Pilihan

Ketika bingung memilih `list` atau `dict`, tanyakan:

### Apakah saya memiliki sekumpulan data yang memiliki urutan?

Jika ya, gunakan:

```python
list
```

Contoh:

```python
scores = [90, 85, 80, 75]
```

### Apakah setiap data memiliki atribut atau nama yang berbeda?

Jika ya, gunakan:

```python
dict
```

Contoh:

```python
user = {
    "name": "Andi",
    "age": 25,
    "city": "Palu"
}
```

---

## 14. Analogi Sederhana

Bayangkan sebuah daftar belanja:

```text
Apel
Susu
Roti
```

Kita hanya membutuhkan urutan item.

Ini cocok menggunakan:

```python
shopping_cart = [
    "Apel",
    "Susu",
    "Roti"
]
```

Sekarang bayangkan informasi sebuah produk:

```text
Nama   : Laptop
Harga  : 10.000.000
Stok   : 10
Merek  : Lenovo
```

Produk memiliki banyak atribut.

Ini lebih cocok menggunakan:

```python
product = {
    "name": "Laptop",
    "price": 10000000,
    "stock": 10,
    "brand": "Lenovo"
}
```

---

## 15. Kesalahan yang Sering Terjadi

Jangan memilih `list` hanya karena ingin menyimpan banyak data.

Pertimbangkan **bagaimana data tersebut akan digunakan**.

Misalnya:

```python
user = [
    "Andi",
    25,
    "Palu",
    True
]
```

Kode tersebut memang valid, tetapi kurang jelas.

Kita harus mengingat:

```text
index 0 → nama
index 1 → umur
index 2 → kota
index 3 → status
```

Dengan dictionary:

```python
user = {
    "name": "Andi",
    "age": 25,
    "city": "Palu",
    "is_active": True
}
```

Informasi menjadi lebih mudah dipahami.

---

## 16. Prinsip Utama

Gunakan **List** ketika fokus utama adalah:

```text
"Kumpulan data"
       +
   "Urutan"
```

Contoh:

```python
scores = [98, 95, 87, 80]
```

Gunakan **Dictionary** ketika fokus utama adalah:

```text
"Data"
   +
"Atribut / Key"
```

Contoh:

```python
user = {
    "name": "Andi",
    "age": 25
}
```

---

## Kesimpulan

`list` dan `dict` memiliki tujuan yang berbeda.

### Gunakan List

Jika:

- Data merupakan sekumpulan item.
- Urutan data penting.
- Data diakses berdasarkan posisi.
- Data akan diproses secara berurutan.

Contoh:

```python
shopping_cart = [
    "apples",
    "milk",
    "bread"
]
```

### Gunakan Dictionary

Jika:

- Data memiliki atribut.
- Setiap nilai memiliki nama atau key.
- Data merepresentasikan suatu objek atau entitas.
- Kita ingin mengakses data berdasarkan key.

Contoh:

```python
user = {
    "name": "Andi",
    "age": 25,
    "city": "Palu"
}
```

### Kombinasikan Keduanya

Dalam aplikasi nyata, `list` dan `dict` sering digunakan bersama:

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

:::tip
**Intinya: jangan memilih struktur data hanya berdasarkan jumlah data yang ingin disimpan. Pertimbangkan bagaimana data tersebut akan diakses, diorganisasi, dan digunakan oleh program.**
:::