---
sidebar_position: 42
title: "Set"
---

**Set** adalah salah satu struktur data bawaan Python yang digunakan untuk menyimpan kumpulan nilai yang **unik**.

Set sangat berguna ketika kita tidak ingin menyimpan data yang sama lebih dari satu kali, misalnya untuk menghilangkan duplikat dari sebuah kumpulan data.

---

## 1. Apa itu Set?

Set adalah kumpulan objek yang tidak menggunakan indeks dan hanya menyimpan **nilai unik**.

Set biasanya ditulis menggunakan kurung kurawal:

```python
{}
```

Contohnya:

```python
my_set = {1, 2, 3, 4, 5}

print(my_set)
```

Hasil:

```text
{1, 2, 3, 4, 5}
```

---

## 2. Set Tidak Menyimpan Duplikat

Salah satu karakteristik utama Set adalah setiap nilai hanya dapat muncul satu kali.

Jika kita memasukkan nilai yang sama beberapa kali:

```python
my_set = {1, 2, 3, 4, 5, 5, 5}

print(my_set)
```

Python hanya menyimpan satu nilai `5`.

Hasil:

```text
{1, 2, 3, 4, 5}
```

Dengan demikian, Set secara otomatis menghilangkan duplikat.

---

## 3. Set Tidak Menggunakan Indeks

Berbeda dengan List dan Tuple, Set tidak dapat diakses menggunakan indeks.

Contohnya:

```python
my_set = {1, 2, 3, 4, 5}

print(my_set[0])
```

Kode tersebut menghasilkan error:

```text
TypeError
```

Karena Set tidak menyediakan akses berdasarkan posisi seperti:

```python
my_list[0]
```

atau:

```python
my_tuple[0]
```

---

## 4. Set dan Urutan Data

Set tidak dirancang untuk digunakan ketika posisi atau urutan elemen merupakan hal yang penting.

Contohnya:

```python
my_set = {"Python", "Java", "Kotlin"}
```

Jangan mengandalkan posisi tertentu dari elemen di dalam Set.

Jika urutan data penting, gunakan struktur data seperti List atau Tuple.

:::info
**Catatan:** Pada Python modern, Set tetap tidak menyediakan konsep indexing dan tidak boleh diperlakukan sebagai sequence yang memiliki posisi elemen tetap.
:::

---

## 5. Menambahkan Data dengan `.add()`

Method `.add()` digunakan untuk menambahkan satu elemen ke dalam Set.

Contohnya:

```python
my_set = {1, 2, 3}

my_set.add(4)

print(my_set)
```

Hasil:

```text
{1, 2, 3, 4}
```

---

## 6. Menambahkan Data yang Sudah Ada

Jika kita menambahkan nilai yang sudah terdapat di dalam Set, Python tidak akan membuat duplikat.

Contohnya:

```python
my_set = {1, 2, 3}

my_set.add(2)

print(my_set)
```

Hasil tetap:

```text
{1, 2, 3}
```

Nilai `2` sudah ada sehingga tidak ditambahkan lagi.

---

## 7. Mengubah List Menjadi Set

Salah satu penggunaan Set yang sangat umum adalah menghilangkan data duplikat dari List.

Misalnya kita memiliki:

```python
my_list = [1, 2, 3, 4, 5, 5, 5, 2, 1]
```

Kita dapat mengubahnya menjadi Set:

```python
unique_set = set(my_list)

print(unique_set)
```

Hasil:

```text
{1, 2, 3, 4, 5}
```

Duplikat otomatis dihilangkan.

---

## 8. Mengubah Kembali Set Menjadi List

Jika setelah menghilangkan duplikat kita membutuhkan List kembali, gunakan `list()`.

Contohnya:

```python
my_list = [1, 2, 3, 4, 5, 5, 5, 2, 1]

unique_set = set(my_list)
unique_list = list(unique_set)

print(unique_list)
```

Hasilnya berisi nilai unik.

Perlu diperhatikan bahwa karena Set tidak berorientasi pada urutan, kita tidak boleh mengandalkan urutan hasil konversi tersebut.

---

## 9. Memeriksa Keberadaan Data dengan `in`

Keyword `in` dapat digunakan untuk memeriksa apakah sebuah nilai terdapat di dalam Set.

Contohnya:

```python
my_set = {1, 2, 3, 4, 5}

print(3 in my_set)
print(10 in my_set)
```

Hasil:

```text
True
False
```

Hasil dari operasi `in` adalah Boolean:

```text
True
```

atau:

```text
False
```

---

## 10. Menghitung Jumlah Elemen dengan `len()`

Fungsi `len()` dapat digunakan untuk mengetahui jumlah elemen yang terdapat di dalam Set.

Contohnya:

```python
my_set = {1, 2, 3, 4, 5}

print(len(my_set))
```

Hasil:

```text
5
```

Jika terdapat nilai duplikat saat Set dibuat, duplikat tersebut tidak dihitung sebagai elemen terpisah.

Contohnya:

```python
my_set = {1, 2, 2, 3, 3, 3}

print(len(my_set))
```

Hasil:

```text
3
```

Karena Set hanya menyimpan:

```text
1, 2, 3
```

---

## 11. Menyalin Set dengan `.copy()`

Method `.copy()` digunakan untuk membuat salinan Set.

Contohnya:

```python
my_set = {1, 2, 3, 4, 5}

new_set = my_set.copy()

print(new_set)
```

Hasil:

```text
{1, 2, 3, 4, 5}
```

Set hasil salinan merupakan objek Set yang terpisah.

---

## 12. Mengosongkan Set dengan `.clear()`

Method `.clear()` digunakan untuk menghapus seluruh elemen di dalam Set.

Contohnya:

```python
my_set = {1, 2, 3, 4, 5}

my_set.clear()

print(my_set)
```

Hasil:

```text
set()
```

`set()` menunjukkan sebuah Set kosong.

---

## 13. Contoh `.copy()` dan `.clear()`

```python
my_set = {1, 2, 3, 4, 5}

new_set = my_set.copy()

my_set.clear()

print(my_set)
print(new_set)
```

Hasil:

```text
set()
{1, 2, 3, 4, 5}
```

Mengosongkan `my_set` tidak mengosongkan `new_set`.

---

## 14. Set Kosong

Ada hal penting ketika membuat Set kosong.

Penulisan:

```python
my_set = {}
```

**bukan Set kosong**.

Python akan menganggapnya sebagai Dictionary kosong.

Contohnya:

```python
my_set = {}

print(type(my_set))
```

Hasil:

```text
<class 'dict'>
```

Untuk membuat Set kosong, gunakan:

```python
my_set = set()

print(type(my_set))
```

Hasil:

```text
<class 'set'>
```

---

## 15. Set vs List

| Karakteristik | List | Set |
| --- | --- | --- |
| Sintaks | `[]` | `{}` |
| Duplikat | Diperbolehkan | Tidak |
| Menggunakan indeks | Ya | Tidak |
| Urutan | Dipertahankan | Tidak digunakan sebagai sequence |
| Mutable | Ya | Ya |
| Cocok untuk | Data berurutan | Data unik |

Contohnya:

```python
numbers = [1, 2, 2, 3]
```

List akan menyimpan:

```text
[1, 2, 2, 3]
```

Sedangkan:

```python
numbers = {1, 2, 2, 3}
```

akan menjadi:

```text
{1, 2, 3}
```

---

## 16. Set untuk Menghilangkan Duplikat

Salah satu pola yang sangat sering digunakan adalah:

```python
unique_data = set(data)
```

Misalnya:

```python
usernames = [
    "andi",
    "budi",
    "andi",
    "citra",
    "budi"
]

unique_usernames = set(usernames)

print(unique_usernames)
```

Set akan menyimpan setiap username hanya satu kali.

Pola ini berguna ketika kita ingin mengetahui data apa saja yang unik.

---

## 17. Set dengan String

Set juga dapat berisi String.

Contohnya:

```python
languages = {
    "Python",
    "Java",
    "Kotlin"
}

print(languages)
```

Setiap nilai tetap hanya dapat muncul satu kali.

Jika terdapat duplikat:

```python
languages = {
    "Python",
    "Java",
    "Python"
}

print(languages)
```

Python hanya menyimpan satu `"Python"`.

---

## 18. Tipe Data yang Dapat Disimpan dalam Set

Set harus berisi elemen yang dapat digunakan sebagai **hashable values**.

Contoh yang umum:

```python
my_set = {
    1,
    3.14,
    "Python",
    True,
    (1, 2)
}
```

Namun, tipe data mutable seperti List tidak dapat langsung menjadi elemen Set.

Contohnya:

```python
my_set = {
    [1, 2, 3]
}
```

akan menghasilkan:

```text
TypeError: unhashable type: 'list'
```

Hal ini berkaitan dengan mekanisme internal Set yang menggunakan hashing.

---

## 19. Ringkasan Method dan Fungsi

| Method/Fungsi | Fungsi |
| --- | --- |
| `set()` | Membuat Set |
| `.add()` | Menambahkan satu elemen |
| `.copy()` | Membuat salinan Set |
| `.clear()` | Menghapus seluruh elemen |
| `len()` | Menghitung jumlah elemen |
| `in` | Memeriksa keberadaan elemen |

---

## 20. Contoh Lengkap

```python
numbers = {1, 2, 3, 4, 5}

# Menambahkan elemen
numbers.add(6)

# Menambahkan elemen yang sudah ada
numbers.add(3)

# Memeriksa keberadaan elemen
print(3 in numbers)

# Menghitung jumlah elemen
print(len(numbers))

# Membuat salinan
new_numbers = numbers.copy()

# Mengosongkan Set asli
numbers.clear()

print(numbers)
print(new_numbers)
```

Hasil:

```text
True
6
set()
{1, 2, 3, 4, 5, 6}
```

---

## 21. Ringkasan

Set memiliki beberapa karakteristik utama:

1. Set digunakan untuk menyimpan kumpulan nilai **unik**.
2. Set tidak menggunakan indeks.
3. Duplikat secara otomatis dihilangkan.
4. Set dapat dibuat menggunakan `{}` jika berisi elemen.
5. Set kosong dibuat menggunakan `set()`.
6. Method `.add()` digunakan untuk menambahkan elemen.
7. `set(list)` dapat digunakan untuk menghilangkan duplikat dari List.
8. Keyword `in` dapat digunakan untuk memeriksa keberadaan nilai.
9. `.copy()` digunakan untuk membuat salinan.
10. `.clear()` digunakan untuk mengosongkan Set.

---

## Kesimpulan

Set sangat berguna ketika **keunikan data lebih penting daripada posisi data**.

Misalnya:

```python
emails = [
    "andi@example.com",
    "budi@example.com",
    "andi@example.com",
    "citra@example.com"
]

unique_emails = set(emails)
```

Set akan memastikan setiap email hanya muncul satu kali.

:::tip
**Intinya:** gunakan **List** ketika urutan dan duplikat penting, sedangkan gunakan **Set** ketika Anda membutuhkan kumpulan data yang **unik** dan tidak membutuhkan akses berdasarkan indeks.
:::