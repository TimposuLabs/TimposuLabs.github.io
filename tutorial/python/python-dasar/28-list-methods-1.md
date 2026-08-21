---
sidebar_position: 28
title: "List Methods - Menambahkan & Menghapus Elemen"
---

**List methods** adalah method yang disediakan Python untuk melakukan berbagai operasi terhadap sebuah list.

Method pada list dipanggil menggunakan tanda titik:

```python
list.method()
```

List methods dapat digunakan untuk:

- Menambahkan elemen.
- Menghapus elemen.
- Memodifikasi isi list.
- Melakukan berbagai operasi terhadap data di dalam list.

---

## 1. Function vs Method

Sebelum mempelajari list methods, penting untuk memahami perbedaan antara **function** dan **method**.

### Built-in Function

Built-in function merupakan fungsi yang dapat dipanggil secara langsung.

Contohnya:

```python
basket = [1, 2, 3, 4, 5]

print(len(basket))
```

`len()` merupakan built-in function yang digunakan untuk mengetahui jumlah item dalam list.

Hasil:

```text
5
```

### Method

Method merupakan fungsi yang dimiliki oleh object atau tipe data tertentu.

Contohnya:

```python
basket.append(100)
```

`append()` merupakan method yang dimiliki oleh list.

Secara sederhana:

```text
Function
    ↓
len(basket)

Method
    ↓
basket.append(100)
```

---

## 2. Menambahkan Elemen dengan `append()`

Method:

```python
append()
```

digunakan untuk menambahkan **satu elemen ke bagian akhir list**.

Contohnya:

```python
basket = [1, 2, 3, 4, 5]

basket.append(100)

print(basket)
```

Hasil:

```text
[1, 2, 3, 4, 5, 100]
```

Elemen `100` ditambahkan setelah elemen terakhir.

---

## 3. `append()` Menambahkan Satu Elemen

`append()` menerima satu object sebagai elemen yang akan ditambahkan.

Contohnya:

```python
basket = [1, 2, 3]

basket.append(4)

print(basket)
```

Hasil:

```text
[1, 2, 3, 4]
```

Jika kita menggunakan list sebagai argument:

```python
basket = [1, 2, 3]

basket.append([4, 5])

print(basket)
```

Hasil:

```text
[1, 2, 3, [4, 5]]
```

List `[4, 5]` dianggap sebagai **satu elemen**.

---

## 4. Menambahkan Elemen dengan `insert()`

Method:

```python
insert()
```

digunakan untuk menyisipkan elemen pada posisi index tertentu.

Sintaks:

```python
list.insert(index, value)
```

Contohnya:

```python
basket = [1, 2, 3, 4, 5]

basket.insert(2, 100)

print(basket)
```

Hasil:

```text
[1, 2, 100, 3, 4, 5]
```

Nilai `100` dimasukkan pada index `2`.

---

## 5. Memahami `insert(index, value)`

Perhatikan:

```python
basket.insert(2, 100)
```

Angka pertama:

```text
2
```

merupakan index tujuan.

Angka kedua:

```text
100
```

merupakan nilai yang akan dimasukkan.

Sebelum:

```text
Index :  0  1  2  3  4
        ────────────────
Value :  1  2  3  4  5
```

Setelah:

```text
Index :  0  1  2    3  4  5
        ─────────────────────
Value :  1  2  100  3  4  5
```

Elemen yang sebelumnya berada pada index tersebut akan bergeser ke kanan.

---

## 6. Menambahkan Banyak Elemen dengan `extend()`

Method:

```python
extend()
```

digunakan untuk menambahkan beberapa elemen ke bagian akhir list.

Contohnya:

```python
basket = [1, 2, 3, 4, 5]

basket.extend([100, 101])

print(basket)
```

Hasil:

```text
[1, 2, 3, 4, 5, 100, 101]
```

Berbeda dengan `append()`, `extend()` menambahkan setiap item dari iterable ke dalam list.

---

## 7. Perbedaan `append()` dan `extend()`

Perhatikan perbedaan berikut.

### `append()`

```python
basket = [1, 2, 3]

basket.append([4, 5])

print(basket)
```

Hasil:

```text
[1, 2, 3, [4, 5]]
```

List `[4, 5]` menjadi satu elemen.

### `extend()`

```python
basket = [1, 2, 3]

basket.extend([4, 5])

print(basket)
```

Hasil:

```text
[1, 2, 3, 4, 5]
```

Item `4` dan `5` ditambahkan sebagai elemen terpisah.

---

## 8. Menghapus Elemen dengan `pop()`

Method:

```python
pop()
```

digunakan untuk menghapus elemen berdasarkan **index**.

Contohnya:

```python
basket = [1, 2, 3, 4, 5]

basket.pop(0)

print(basket)
```

Hasil:

```text
[2, 3, 4, 5]
```

Elemen pada index `0` yaitu `1` telah dihapus.

---

## 9. `pop()` Tanpa Index

Jika `pop()` digunakan tanpa memberikan index:

```python
basket.pop()
```

Python akan menghapus **elemen terakhir**.

Contohnya:

```python
basket = [1, 2, 3, 4, 5]

basket.pop()

print(basket)
```

Hasil:

```text
[1, 2, 3, 4]
```

---

## 10. `pop()` Mengembalikan Nilai

Salah satu karakteristik penting `pop()` adalah method ini **mengembalikan nilai elemen yang dihapus**.

Contohnya:

```python
basket = [1, 2, 3, 4, 5]

removed_item = basket.pop(0)

print(removed_item)
```

Hasil:

```text
1
```

List setelah operasi:

```python
print(basket)
```

Hasil:

```text
[2, 3, 4, 5]
```

Dengan demikian, kita dapat menggunakan nilai yang telah dihapus.

---

## 11. Menghapus Elemen dengan `remove()`

Method:

```python
remove()
```

digunakan untuk menghapus elemen berdasarkan **nilai**, bukan berdasarkan index.

Contohnya:

```python
basket = [1, 2, 3, 4, 5]

basket.remove(4)

print(basket)
```

Hasil:

```text
[1, 2, 3, 5]
```

Python mencari nilai `4` kemudian menghapusnya.

---

## 12. Perbedaan `pop()` dan `remove()`

Perhatikan perbedaan:

```python
basket.pop(2)
```

menghapus berdasarkan:

```text
index
```

Sedangkan:

```python
basket.remove(3)
```

menghapus berdasarkan:

```text
value
```

Contoh:

```python
basket = [10, 20, 30, 40]
```

Jika menggunakan:

```python
basket.pop(2)
```

yang dihapus adalah:

```text
30
```

karena `30` berada pada index `2`.

Sedangkan:

```python
basket.remove(30)
```

juga menghapus:

```text
30
```

tetapi karena mencari **nilai `30`**.

---

## 13. Menghapus Seluruh Isi dengan `clear()`

Method:

```python
clear()
```

digunakan untuk menghapus seluruh elemen dalam list.

Contohnya:

```python
basket = [1, 2, 3, 4, 5]

basket.clear()

print(basket)
```

Hasil:

```text
[]
```

List masih ada, tetapi semua elemennya telah dihapus.

---

## 14. List Methods Bekerja Secara In-Place

Sebagian besar method list seperti:

```python
append()
insert()
extend()
pop()
remove()
clear()
```

melakukan perubahan secara **in-place**.

Artinya, method tersebut mengubah list yang sudah ada.

Contohnya:

```python
basket = [1, 2, 3]

basket.append(4)

print(basket)
```

Hasil:

```text
[1, 2, 3, 4]
```

Variable `basket` tetap merujuk pada list yang sama, tetapi isi list telah berubah.

---

## 15. Return Value pada List Methods

Tidak semua list method mengembalikan list baru.

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

Namun list-nya tetap berubah:

```python
print(basket)
```

Hasil:

```text
[1, 2, 3, 4]
```

Jadi:

```python
basket.append(4)
```

melakukan perubahan terhadap `basket`, tetapi return value-nya adalah:

```text
None
```

---

## 16. Kesalahan yang Sering Terjadi

Jangan menganggap `append()` menghasilkan list baru.

Contohnya:

```python
basket = [1, 2, 3]

new_list = basket.append(4)

print(new_list)
```

Hasil:

```text
None
```

Padahal:

```python
print(basket)
```

menghasilkan:

```text
[1, 2, 3, 4]
```

Artinya `append()` memodifikasi list secara langsung dan tidak mengembalikan list baru.

---

## 17. Mengapa `pop()` Berbeda?

`pop()` juga memodifikasi list secara langsung, tetapi `pop()` mengembalikan **elemen yang dihapus**.

Contohnya:

```python
basket = [1, 2, 3]

removed_item = basket.pop()

print(removed_item)
```

Hasil:

```text
3
```

Sedangkan:

```python
print(basket)
```

menghasilkan:

```text
[1, 2]
```

Jadi:

```text
append() → mengubah list, return None
pop()    → mengubah list, return item yang dihapus
```

---

## 18. Ringkasan List Methods

| Method | Fungsi | Berdasarkan |
| --- | --- | --- |
| `append()` | Menambahkan satu elemen di akhir | Value |
| `insert()` | Menyisipkan elemen | Index |
| `extend()` | Menambahkan beberapa elemen | Iterable |
| `pop()` | Menghapus dan mengembalikan elemen | Index |
| `remove()` | Menghapus elemen | Value |
| `clear()` | Menghapus seluruh elemen | Semua |

---

## 19. Contoh Penggunaan Bersama

Berikut contoh beberapa method digunakan dalam satu program:

```python
basket = ["apple", "banana"]

basket.append("orange")

basket.insert(1, "mango")

basket.extend(["grape", "melon"])

print(basket)
```

Hasil:

```text
['apple', 'mango', 'banana', 'orange', 'grape', 'melon']
```

Kemudian kita dapat menghapus item:

```python
basket.remove("banana")

print(basket)
```

Hasil:

```text
['apple', 'mango', 'orange', 'grape', 'melon']
```

Dan menghapus item terakhir:

```python
removed_item = basket.pop()

print(removed_item)
print(basket)
```

---

## 20. Urutan Konsep yang Perlu Diingat

Untuk menambahkan data:

```text
append()
    ↓
Tambah di akhir

insert()
    ↓
Tambah berdasarkan index

extend()
    ↓
Tambah banyak item
```

Untuk menghapus data:

```text
pop()
    ↓
Hapus berdasarkan index

remove()
    ↓
Hapus berdasarkan value

clear()
    ↓
Hapus semua
```

---

## Kesimpulan

List methods merupakan bagian penting dalam penggunaan list di Python.

Untuk menambahkan elemen, gunakan:

```python
append()
insert()
extend()
```

Untuk menghapus elemen, gunakan:

```python
pop()
remove()
clear()
```

Hal penting yang perlu diperhatikan adalah sebagian besar list methods bekerja secara **in-place**, yaitu memodifikasi list secara langsung.

Contohnya:

```python
basket = [1, 2, 3]

basket.append(4)

print(basket)
```

Hasil:

```text
[1, 2, 3, 4]
```

Jangan mengharapkan `append()`, `insert()`, atau `extend()` menghasilkan list baru.

Sebaliknya, `pop()` memiliki karakteristik khusus karena selain memodifikasi list, method tersebut juga **mengembalikan elemen yang dihapus**.

:::tip
**Pahami perbedaan antara perubahan list dan return value dari sebuah method. Konsep ini akan sangat penting ketika mulai menggunakan berbagai method Python lainnya.**
:::