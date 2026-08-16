---
sidebar_position: 39
title: "Dictionary Methods - 2"
---

Pada materi sebelumnya, kita telah mempelajari beberapa cara untuk mengakses data dalam dictionary menggunakan `[]` dan `.get()`.

Pada materi ini, kita akan melanjutkan dengan beberapa method dictionary yang digunakan untuk:

- Memeriksa keberadaan key dan value.
- Mengambil seluruh key, value, atau pasangan data.
- Menyalin dictionary.
- Menghapus data.
- Mengubah dan menambahkan data.

---

## 1. Memeriksa Keberadaan Key dengan `in`

Keyword `in` dapat digunakan untuk memeriksa apakah sebuah key terdapat di dalam dictionary.

Contohnya:

```python
user = {
    "basket": [1, 2, 3],
    "greet": "hello",
    "age": 20
}

print("basket" in user)
print("size" in user)
```

Hasil:

```text
True
False
```

Secara default, `in` pada dictionary memeriksa **key**, bukan value.

---

## 2. Menggunakan `.keys()`

Method `.keys()` digunakan untuk mendapatkan seluruh key yang terdapat di dalam dictionary.

Contohnya:

```python
user = {
    "basket": [1, 2, 3],
    "greet": "hello",
    "age": 20
}

print(user.keys())
```

Hasilnya berupa objek `dict_keys`.

Untuk memeriksa apakah key tertentu tersedia:

```python
print("age" in user.keys())
```

Hasil:

```text
True
```

Namun, dalam penggunaan sehari-hari, kita biasanya cukup menggunakan:

```python
print("age" in user)
```

---

## 3. Menggunakan `.values()`

Jika `.keys()` digunakan untuk mendapatkan key, maka `.values()` digunakan untuk mendapatkan seluruh value.

Contohnya:

```python
user = {
    "basket": [1, 2, 3],
    "greet": "hello",
    "age": 20
}

print(user.values())
```

Untuk memeriksa apakah sebuah value terdapat di dalam dictionary:

```python
print("hello" in user.values())
```

Hasil:

```text
True
```

Contoh lainnya:

```python
print(20 in user.values())
```

Hasil:

```text
True
```

---

## 4. Perbedaan `in` pada Key dan Value

Perhatikan contoh berikut:

```python
user = {
    "name": "Andi",
    "age": 25
}
```

Jika menggunakan:

```python
print("name" in user)
```

Python memeriksa key.

Hasil:

```text
True
```

Sedangkan:

```python
print("Andi" in user)
```

hasilnya:

```text
False
```

Karena `"Andi"` merupakan value, bukan key.

Untuk memeriksa value:

```python
print("Andi" in user.values())
```

Hasil:

```text
True
```

---

## 5. Menggunakan `.items()`

Method `.items()` digunakan untuk mendapatkan seluruh pasangan **key-value**.

Contohnya:

```python
user = {
    "basket": [1, 2, 3],
    "greet": "hello",
    "age": 20
}

print(user.items())
```

Hasilnya berupa objek `dict_items` yang berisi pasangan key-value:

```text
dict_items([
    ("basket", [1, 2, 3]),
    ("greet", "hello"),
    ("age", 20)
])
```

Setiap pasangan direpresentasikan sebagai tuple.

Contohnya:

```text
("age", 20)
```

---

## 6. Perbandingan `.keys()`, `.values()`, dan `.items()`

| Method | Menghasilkan |
| --- | --- |
| `.keys()` | Seluruh key |
| `.values()` | Seluruh value |
| `.items()` | Seluruh pasangan key-value |

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25
}
```

### `.keys()`

```python
print(user.keys())
```

Secara konsep:

```text
name
age
```

### `.values()`

```python
print(user.values())
```

Secara konsep:

```text
Andi
25
```

### `.items()`

```python
print(user.items())
```

Secara konsep:

```text
("name", "Andi")
("age", 25)
```

---

## 7. Menghapus Seluruh Data dengan `.clear()`

Method `.clear()` digunakan untuk menghapus seluruh isi dictionary.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25
}

user.clear()

print(user)
```

Hasil:

```text
{}
```

Method `.clear()` bekerja secara **in-place**, sehingga dictionary yang sama menjadi kosong.

---

## 8. Menyalin Dictionary dengan `.copy()`

Method `.copy()` digunakan untuk membuat salinan dictionary.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25
}

user2 = user.copy()
```

Sekarang terdapat dua dictionary:

```text
user
 ↓
{"name": "Andi", "age": 25}

user2
 ↓
{"name": "Andi", "age": 25}
```

Keduanya merupakan dictionary yang berbeda.

---

## 9. Membuktikan Hasil `.copy()`

```python
user = {
    "name": "Andi",
    "age": 25
}

user2 = user.copy()

user.clear()

print(user)
print(user2)
```

Hasil:

```text
{}
{"name": "Andi", "age": 25}
```

Perubahan pada `user` tidak mengosongkan `user2`.

---

## 10. Perbedaan `.copy()` dengan Assignment

Perhatikan kode berikut:

```python
user = {
    "name": "Andi"
}

user2 = user
```

Dalam kasus ini, `user` dan `user2` merujuk pada dictionary yang sama.

Jika:

```python
user.clear()
```

maka:

```python
print(user2)
```

juga menghasilkan:

```text
{}
```

Jika ingin membuat dictionary terpisah, gunakan:

```python
user2 = user.copy()
```

---

## 11. Menghapus Data dengan `.pop()`

Method `.pop()` digunakan untuk menghapus item berdasarkan key.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25,
    "city": "Palu"
}

user.pop("age")

print(user)
```

Hasil:

```text
{"name": "Andi", "city": "Palu"}
```

Key `"age"` beserta value-nya telah dihapus.

---

## 12. `.pop()` Mengembalikan Value yang Dihapus

Salah satu karakteristik penting `.pop()` adalah method ini mengembalikan value yang dihapus.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25,
    "city": "Palu"
}

removed_value = user.pop("age")

print(removed_value)
```

Hasil:

```text
25
```

Dictionary sekarang:

```python
print(user)
```

Hasil:

```text
{"name": "Andi", "city": "Palu"}
```

Dengan demikian, `.pop()` dapat digunakan ketika kita ingin **menghapus sekaligus mendapatkan value yang dihapus**.

---

## 13. Menghapus Item dengan `.popitem()`

Method `.popitem()` digunakan untuk menghapus dan mengembalikan satu pasangan key-value.

Pada Python modern, `.popitem()` menghapus **item terakhir yang dimasukkan**.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25,
    "city": "Palu"
}

removed_item = user.popitem()

print(removed_item)
print(user)
```

Hasil:

```text
("city", "Palu")
{"name": "Andi", "age": 25}
```

Pasangan terakhir:

```text
"city": "Palu"
```

telah dihapus.

---

## 14. Perbedaan `.pop()` dan `.popitem()`

| Method | Cara Menghapus | Return |
| --- | --- | --- |
| `.pop(key)` | Berdasarkan key | Value |
| `.popitem()` | Item terakhir | Tuple `(key, value)` |
| `.clear()` | Semua item | `None` |

Contohnya:

```python
user.pop("age")
```

menghapus berdasarkan key.

Sedangkan:

```python
user.popitem()
```

menghapus item terakhir.

---

## 15. Mengubah Data dengan `.update()`

Method `.update()` digunakan untuk memperbarui dictionary.

Jika key sudah ada, value akan diperbarui.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 20
}

user.update({
    "age": 25
})

print(user)
```

Hasil:

```text
{"name": "Andi", "age": 25}
```

Value `"age"` berubah dari:

```text
20
```

menjadi:

```text
25
```

---

## 16. Menambahkan Data dengan `.update()`

Jika key belum tersedia, `.update()` akan menambahkan key-value baru.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25
}

user.update({
    "city": "Palu"
})

print(user)
```

Hasil:

```text
{
    "name": "Andi",
    "age": 25,
    "city": "Palu"
}
```

Jadi `.update()` dapat digunakan untuk:

```text
Key sudah ada
      ↓
Update value

Key belum ada
      ↓
Tambah key-value
```

---

## 17. `.update()` dengan Dictionary

Cara yang umum adalah memberikan dictionary sebagai argument:

```python
user.update({
    "age": 30,
    "city": "Palu"
})
```

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 25
}

user.update({
    "age": 30,
    "city": "Palu"
})

print(user)
```

Hasil:

```text
{
    "name": "Andi",
    "age": 30,
    "city": "Palu"
}
```

`age` diperbarui, sedangkan `city` ditambahkan.

---

## 18. Ringkasan Method Dictionary

| Method | Fungsi |
| --- | --- |
| `.keys()` | Mengambil seluruh key |
| `.values()` | Mengambil seluruh value |
| `.items()` | Mengambil seluruh pasangan key-value |
| `.copy()` | Membuat salinan dictionary |
| `.clear()` | Menghapus seluruh isi |
| `.pop(key)` | Menghapus berdasarkan key |
| `.popitem()` | Menghapus item terakhir |
| `.update()` | Mengubah atau menambahkan data |

---

## 19. Contoh Lengkap

```python
user = {
    "name": "Andi",
    "age": 25,
    "city": "Palu"
}

# Memeriksa key
print("name" in user)

# Memeriksa value
print("Andi" in user.values())

# Mengambil semua key
print(user.keys())

# Mengambil semua value
print(user.values())

# Mengambil semua pasangan
print(user.items())

# Mengubah data
user.update({
    "age": 26
})

# Menambahkan data
user.update({
    "is_active": True
})

print(user)
```

---

## 20. Kesimpulan

Dictionary menyediakan berbagai method untuk mengelola data.

Untuk **memeriksa data**, gunakan:

```python
"key" in user
```

atau:

```python
"value" in user.values()
```

Untuk **melihat struktur dictionary**, gunakan:

```python
user.keys()
user.values()
user.items()
```

Untuk **menyalin**:

```python
user.copy()
```

Untuk **menghapus**:

```python
user.pop("key")
user.popitem()
user.clear()
```

Untuk **mengubah atau menambahkan data**:

```python
user.update({
    "key": "value"
})
```

:::info
**Poin penting:** `.pop()` menghapus berdasarkan key dan mengembalikan value yang dihapus, `.popitem()` menghapus item terakhir dan mengembalikan pasangan key-value, sedangkan `.update()` dapat digunakan untuk mengubah data yang sudah ada maupun menambahkan data baru.
:::