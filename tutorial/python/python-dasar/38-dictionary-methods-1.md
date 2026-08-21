---
sidebar_position: 38
title: "Dictionary Methods - Mengakses Data"
---

Dictionary memiliki berbagai method yang dapat digunakan untuk mengakses, memeriksa, dan mengelola data.

Pada materi ini, kita akan membahas beberapa penggunaan dasar dictionary method, terutama:

- Mengakses value dengan aman.
- Menentukan nilai default.
- Membuat dictionary menggunakan `dict()`.

---

## 1. Mengakses Value dengan Bracket

Cara paling sederhana untuk mengambil value dari dictionary adalah menggunakan key di dalam tanda kurung siku.

Contohnya:

```python
user = {
    "basket": [1, 2, 3],
    "greet": "hello"
}

print(user["basket"])
```

Hasil:

```text
[1, 2, 3]
```

Cara ini sangat umum digunakan ketika kita **yakin bahwa key tersebut tersedia**.

---

## 2. Masalah `KeyError`

Jika key yang digunakan tidak terdapat di dalam dictionary, Python akan menghasilkan `KeyError`.

Contohnya:

```python
user = {
    "basket": [1, 2, 3],
    "greet": "hello"
}

print(user["age"])
```

Kode tersebut menghasilkan:

```text
KeyError: 'age'
```

Hal ini terjadi karena key:

```text
"age"
```

tidak terdapat di dalam dictionary.

---

## 3. Menggunakan `.get()`

Untuk mengambil value dengan cara yang lebih aman, kita dapat menggunakan method:

```python
.get()
```

Contohnya:

```python
user = {
    "basket": [1, 2, 3],
    "greet": "hello"
}

print(user.get("age"))
```

Hasil:

```text
None
```

Berbeda dengan:

```python
user["age"]
```

yang menghasilkan `KeyError`, `.get()` akan mengembalikan `None` jika key tidak ditemukan.

---

## 4. Perbandingan `[]` dan `.get()`

Perhatikan dua cara berikut.

### Menggunakan `[]`

```python
user = {
    "name": "Andi"
}

print(user["age"])
```

Hasil:

```text
KeyError: 'age'
```

### Menggunakan `.get()`

```python
user = {
    "name": "Andi"
}

print(user.get("age"))
```

Hasil:

```text
None
```

Perbedaannya:

| Cara | Key ditemukan | Key tidak ditemukan |
| --- | --- | --- |
| `user["age"]` | Mengembalikan value | `KeyError` |
| `user.get("age")` | Mengembalikan value | `None` |

---

## 5. Memberikan Default Value

`.get()` juga dapat menerima parameter kedua sebagai **default value**.

Formatnya:

```python
dictionary.get(key, default)
```

Contohnya:

```python
user = {
    "name": "Andi"
}

print(user.get("age", 25))
```

Karena key `"age"` tidak tersedia, Python menggunakan nilai default:

```text
25
```

---

## 6. Default Value Hanya Digunakan Jika Key Tidak Ada

Jika key ternyata tersedia, nilai sebenarnya akan digunakan dan default value diabaikan.

Contohnya:

```python
user = {
    "name": "Andi",
    "age": 30
}

print(user.get("age", 25))
```

Hasil:

```text
30
```

Meskipun default value yang diberikan adalah:

```text
25
```

Python tetap mengembalikan value yang sebenarnya:

```text
30
```

---

## 7. Contoh Penggunaan `.get()`

Misalnya kita memiliki data pengguna:

```python
user = {
    "name": "Andi",
    "email": "andi@example.com"
}
```

Kita ingin mengambil `phone`.

Key tersebut belum tersedia:

```python
print(user.get("phone"))
```

Hasil:

```text
None
```

Kita juga dapat menentukan nilai default:

```python
print(user.get("phone", "Tidak tersedia"))
```

Hasil:

```text
Tidak tersedia
```

---

## 8. `.get()` Tidak Mengubah Dictionary

Method `.get()` hanya digunakan untuk mengambil value.

Contohnya:

```python
user = {
    "name": "Andi"
}

age = user.get("age", 25)

print(age)
print(user)
```

Hasil:

```text
25
{'name': 'Andi'}
```

Dictionary tetap tidak memiliki key `"age"`.

`.get()` hanya memberikan nilai yang digunakan sebagai hasil pengambilan data.

---

## 9. Membuat Dictionary dengan `dict()`

Selain menggunakan kurung kurawal:

```python
user = {
    "name": "Andi",
    "age": 25
}
```

Python juga menyediakan constructor:

```python
dict()
```

Contohnya:

```python
user = dict(
    name="Andi",
    age=25
)

print(user)
```

Hasil:

```text
{'name': 'Andi', 'age': 25}
```

---

## 10. Membandingkan Dua Cara Membuat Dictionary

Menggunakan `{}`:

```python
user = {
    "name": "Andi",
    "age": 25
}
```

Menggunakan `dict()`:

```python
user = dict(
    name="Andi",
    age=25
)
```

Keduanya menghasilkan dictionary.

Namun, penggunaan `{}` merupakan cara yang lebih umum dan fleksibel.

---

## 11. Keterbatasan `dict(key=value)`

Ketika menggunakan bentuk:

```python
dict(
    name="Andi",
    age=25
)
```

nama key ditulis sebagai **keyword argument**.

Karena itu, cara tersebut memiliki beberapa keterbatasan dibandingkan menggunakan `{}`.

Contohnya:

```python
user = {
    "first-name": "Andi"
}
```

Key seperti:

```text
"first-name"
```

tidak dapat ditulis dengan bentuk:

```python
dict(first-name="Andi")
```

Karena format tersebut bukan sintaks keyword argument Python yang valid.

Untuk key yang lebih fleksibel, gunakan `{}`.

---

## 12. Contoh `dict()` dengan Key yang Sederhana

Contoh yang sesuai:

```python
user = dict(
    name="Andi",
    age=25,
    city="Palu"
)

print(user)
```

Hasil:

```text
{'name': 'Andi', 'age': 25, 'city': 'Palu'}
```

Cara ini cukup mudah dibaca, tetapi dalam kode Python sehari-hari, penggunaan `{}` lebih umum.

---

## 13. Menggabungkan `.get()` dengan `dict()`

Keduanya dapat digunakan bersama.

Contohnya:

```python
user = dict(
    name="Andi",
    age=25
)

print(user.get("name"))
print(user.get("email", "Tidak tersedia"))
```

Hasil:

```text
Andi
Tidak tersedia
```

---

## 14. Kapan Menggunakan `[]`?

Gunakan:

```python
dictionary["key"]
```

ketika key **dipastikan tersedia** dan tidak adanya key merupakan kondisi yang harus dianggap sebagai error.

Contohnya:

```python
user = {
    "name": "Andi"
}

print(user["name"])
```

Kita tahu bahwa `"name"` memang merupakan bagian wajib dari data pengguna.

---

## 15. Kapan Menggunakan `.get()`?

Gunakan:

```python
dictionary.get("key")
```

ketika key **mungkin tidak tersedia** dan kita ingin menangani kondisi tersebut tanpa `KeyError`.

Contohnya:

```python
user = {
    "name": "Andi"
}

phone = user.get("phone")
```

Jika `"phone"` tidak tersedia, hasilnya:

```text
None
```

Kita juga dapat memberikan default:

```python
phone = user.get("phone", "Tidak tersedia")
```

---

## 16. Contoh Praktis

Misalnya sebuah aplikasi menerima data pengguna:

```python
user = {
    "username": "andi",
    "email": "andi@example.com",
    "age": 25
}
```

Data `phone` mungkin tidak selalu tersedia.

Menggunakan:

```python
phone = user.get("phone", "Tidak tersedia")

print(phone)
```

Hasil:

```text
Tidak tersedia
```

Dengan `.get()`, program dapat menangani data yang tidak lengkap dengan lebih aman.

---

## 17. Ringkasan Method `.get()`

Bentuk dasar:

```python
dictionary.get(key)
```

Jika key tersedia:

```text
→ value
```

Jika key tidak tersedia:

```text
→ None
```

Dengan default:

```python
dictionary.get(key, default)
```

Jika key tersedia:

```text
→ value sebenarnya
```

Jika key tidak tersedia:

```text
→ default
```

---

## 18. Ringkasan

### Menggunakan Bracket

```python
user["name"]
```

Digunakan untuk mengakses value berdasarkan key.

Jika key tidak ditemukan:

```text
KeyError
```

### Menggunakan `.get()`

```python
user.get("name")
```

Digunakan untuk mengambil value dengan aman.

Jika key tidak ditemukan:

```text
None
```

### Menggunakan Default Value

```python
user.get("age", 25)
```

Jika key tidak ditemukan:

```text
25
```

### Membuat Dictionary dengan `dict()`

```python
user = dict(
    name="Andi",
    age=25
)
```

---

## Kesimpulan

Method `.get()` merupakan salah satu cara penting untuk mengakses data dictionary dengan aman.

Gunakan:

```python
user["name"]
```

ketika key memang harus tersedia.

Gunakan:

```python
user.get("name")
```

ketika key mungkin tidak tersedia.

Jika diperlukan, berikan nilai default:

```python
user.get("age", 25)
```

Selain itu, dictionary dapat dibuat menggunakan:

```python
dict()
```

meskipun penggunaan `{}` lebih umum dalam kode Python.

:::info
**Intinya: gunakan `[]` ketika key wajib ada, dan gunakan `.get()` ketika key mungkin tidak tersedia.**
:::