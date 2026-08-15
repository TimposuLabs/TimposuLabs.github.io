---
sidebar_position: 30
title: "List Methods 3"
---

Pada materi sebelumnya, kita telah mempelajari berbagai list methods untuk menambahkan, menghapus, mencari, dan memeriksa elemen.

Pada materi ini, kita akan mempelajari cara:

- Mengurutkan list.
- Membuat list terurut tanpa mengubah list asli.
- Menyalin list.
- Membalikkan urutan elemen.

Beberapa operasi yang akan dipelajari:

```text
sort()
sorted()
copy()
reverse()
```

---

## 1. Mengurutkan List dengan `sort()`

Method:

```python
sort()
```

digunakan untuk mengurutkan elemen di dalam list.

Untuk data berupa teks, secara umum pengurutan dilakukan berdasarkan urutan alfabet.

Contohnya:

```python
basket = ["a", "x", "b", "c", "d", "e"]

basket.sort()

print(basket)
```

Hasil:

```text
['a', 'b', 'c', 'd', 'e', 'x']
```

---

## 2. `sort()` Bekerja Secara In-Place

Method `sort()` mengubah list secara langsung.

Contohnya:

```python
basket = ["a", "x", "b", "c", "d", "e"]

basket.sort()

print(basket)
```

Setelah `sort()` dijalankan, isi `basket` sudah berubah menjadi:

```text
['a', 'b', 'c', 'd', 'e', 'x']
```

List asli tidak dipertahankan dalam urutan sebelumnya.

---

## 3. Return Value `sort()`

Seperti beberapa list methods lainnya, `sort()` bekerja secara in-place dan menghasilkan:

```text
None
```

Contohnya:

```python
basket = ["a", "x", "b", "c", "d", "e"]

result = basket.sort()

print(result)
```

Hasil:

```text
None
```

Namun list tetap berhasil diurutkan:

```python
print(basket)
```

Hasil:

```text
['a', 'b', 'c', 'd', 'e', 'x']
```

Jadi, jangan menulis:

```python
new_basket = basket.sort()
```

jika tujuan Anda adalah mendapatkan list hasil pengurutan.

---

## 4. Mengurutkan Angka dengan `sort()`

`sort()` juga dapat digunakan untuk mengurutkan angka.

Contohnya:

```python
numbers = [5, 2, 8, 1, 3]

numbers.sort()

print(numbers)
```

Hasil:

```text
[1, 2, 3, 5, 8]
```

Secara default, angka diurutkan dari nilai terkecil ke terbesar.

---

## 5. Mengurutkan Tanpa Mengubah List dengan `sorted()`

Python juga menyediakan built-in function:

```python
sorted()
```

yang dapat digunakan untuk menghasilkan list baru dalam keadaan terurut.

Contohnya:

```python
basket = ["a", "x", "b", "c", "d", "e"]

new_basket = sorted(basket)

print(new_basket)
```

Hasil:

```text
['a', 'b', 'c', 'd', 'e', 'x']
```

---

## 6. `sorted()` Tidak Mengubah List Asli

Berbeda dengan `sort()`, `sorted()` tidak mengubah list yang diberikan.

Contohnya:

```python
basket = ["a", "x", "b", "c", "d", "e"]

new_basket = sorted(basket)

print(new_basket)
print(basket)
```

Hasil:

```text
['a', 'b', 'c', 'd', 'e', 'x']
['a', 'x', 'b', 'c', 'd', 'e']
```

Dengan demikian:

```text
sort()
  ↓
Mengubah list asli

sorted()
  ↓
Menghasilkan list baru
```

---

## 7. Perbandingan `sort()` dan `sorted()`

| Operasi | Jenis | Mengubah List Asli | Return |
| --- | --- | --- | --- |
| `list.sort()` | Method | Ya | `None` |
| `sorted(list)` | Built-in function | Tidak | List baru |

Gunakan:

```python
basket.sort()
```

jika memang ingin mengubah list asli.

Gunakan:

```python
new_basket = sorted(basket)
```

jika ingin mempertahankan list asli.

---

## 8. Menyalin List dengan `copy()`

Method:

```python
copy()
```

digunakan untuk membuat salinan dari sebuah list.

Contohnya:

```python
basket = ["a", "b", "c", "d", "e"]

new_basket = basket.copy()

print(new_basket)
```

Hasil:

```text
['a', 'b', 'c', 'd', 'e']
```

`new_basket` merupakan list baru berdasarkan isi `basket`.

---

## 9. Mengapa `copy()` Dibutuhkan?

Perhatikan jika kita menggunakan assignment biasa:

```python
basket = ["a", "b", "c"]

new_basket = basket

new_basket[0] = "x"

print(basket)
```

Hasil:

```text
['x', 'b', 'c']
```

List `basket` ikut berubah karena kedua variable merujuk pada list yang sama.

Jika kita menggunakan:

```python
new_basket = basket.copy()
```

maka kita membuat list baru.

Contohnya:

```python
basket = ["a", "b", "c"]

new_basket = basket.copy()

new_basket[0] = "x"

print(new_basket)
print(basket)
```

Hasil:

```text
['x', 'b', 'c']
['a', 'b', 'c']
```

Perubahan pada `new_basket` tidak mengubah `basket`.

---

## 10. `copy()` dan Slicing `[:]`

Ada beberapa cara untuk membuat shallow copy dari list.

Salah satunya:

```python
new_basket = basket.copy()
```

Cara lainnya menggunakan slicing:

```python
new_basket = basket[:]
```

Keduanya dapat digunakan untuk membuat salinan list pada level dasar.

Contohnya:

```python
basket = ["a", "b", "c"]

new_basket = basket[:]
```

atau:

```python
new_basket = basket.copy()
```

Keduanya menghasilkan list baru.

---

## 11. Membalikkan List dengan `reverse()`

Method:

```python
reverse()
```

digunakan untuk membalikkan urutan elemen di dalam list.

Contohnya:

```python
basket = ["a", "b", "c", "d", "e"]

basket.reverse()

print(basket)
```

Hasil:

```text
['e', 'd', 'c', 'b', 'a']
```

---

## 12. `reverse()` Bukan Sorting

Penting untuk membedakan:

```python
sort()
```

dan:

```python
reverse()
```

`sort()` mengurutkan elemen.

Sedangkan `reverse()` hanya **membalikkan urutan elemen yang sudah ada**.

Contohnya:

```python
basket = ["c", "a", "e", "b", "d"]

basket.reverse()

print(basket)
```

Hasil:

```text
['d', 'b', 'e', 'a', 'c']
```

Perhatikan bahwa hasilnya bukan urutan alfabet.

Urutan hanya dibalik dari:

```text
c → a → e → b → d
```

menjadi:

```text
d → b → e → a → c
```

---

## 13. `reverse()` Bekerja Secara In-Place

Sama seperti `sort()`, method `reverse()` mengubah list secara langsung.

Contohnya:

```python
numbers = [1, 2, 3, 4, 5]

numbers.reverse()

print(numbers)
```

Hasil:

```text
[5, 4, 3, 2, 1]
```

List asli telah berubah urutannya.

---

## 14. Return Value `reverse()`

`reverse()` juga tidak menghasilkan list baru.

Contohnya:

```python
numbers = [1, 2, 3, 4, 5]

result = numbers.reverse()

print(result)
```

Hasil:

```text
None
```

Namun list telah berubah:

```python
print(numbers)
```

Hasil:

```text
[5, 4, 3, 2, 1]
```

---

## 15. Mengurutkan dari Terbesar ke Terkecil

Salah satu cara sederhana untuk mendapatkan urutan dari besar ke kecil adalah:

1. Mengurutkan list.
2. Membalikkan hasilnya.

Contohnya:

```python
numbers = [5, 2, 8, 1, 3]

numbers.sort()
numbers.reverse()

print(numbers)
```

Hasil:

```text
[8, 5, 3, 2, 1]
```

Untuk string:

```python
basket = ["a", "x", "b", "c", "d", "e"]

basket.sort()
basket.reverse()

print(basket)
```

Hasil:

```text
['x', 'e', 'd', 'c', 'b', 'a']
```

> Pada Python modern, pengurutan descending juga dapat dilakukan langsung menggunakan parameter `reverse=True` pada `sort()` atau `sorted()`. Konsep tersebut dapat dipelajari lebih lanjut ketika membahas parameter function.

---

## 16. Perbandingan `sort()` dan `reverse()`

Misalnya:

```python
numbers = [5, 2, 8, 1, 3]
```

Dengan:

```python
numbers.sort()
```

hasilnya:

```text
[1, 2, 3, 5, 8]
```

Sedangkan jika:

```python
numbers.reverse()
```

dijalankan pada list awal:

```text
[5, 2, 8, 1, 3]
```

hasilnya:

```text
[3, 1, 8, 2, 5]
```

Jadi:

```text
sort()
   ↓
Mengurutkan

reverse()
   ↓
Membalikkan
```

---

## 17. Contoh Penggunaan Bersama

Beberapa method dapat digunakan secara berurutan.

Contohnya:

```python
basket = ["a", "x", "b", "c", "d", "e"]

basket.sort()
basket.reverse()

print(basket)
```

Hasil:

```text
['x', 'e', 'd', 'c', 'b', 'a']
```

Prosesnya:

```text
List awal
    ↓
['a', 'x', 'b', 'c', 'd', 'e']

sort()
    ↓
['a', 'b', 'c', 'd', 'e', 'x']

reverse()
    ↓
['x', 'e', 'd', 'c', 'b', 'a']
```

---

## 18. Ringkasan

| Operasi | Fungsi | Mengubah List Asli | Return |
| --- | --- | --- | --- |
| `sort()` | Mengurutkan list | Ya | `None` |
| `sorted()` | Menghasilkan list terurut | Tidak | List baru |
| `copy()` | Membuat salinan list | Tidak | List baru |
| `reverse()` | Membalikkan urutan list | Ya | `None` |

---

## 19. Kapan Menggunakan Masing-Masing?

Gunakan:

```python
basket.sort()
```

ketika ingin **mengubah list asli menjadi terurut**.

Gunakan:

```python
sorted(basket)
```

ketika ingin **mendapatkan list terurut tanpa mengubah list asli**.

Gunakan:

```python
basket.copy()
```

ketika ingin **membuat salinan list**.

Gunakan:

```python
basket.reverse()
```

ketika ingin **membalikkan urutan elemen dalam list**.

---

## Kesimpulan

Python menyediakan beberapa cara untuk mengelola urutan dan salinan list.

`sort()` digunakan untuk mengurutkan list secara langsung:

```python
basket.sort()
```

`sorted()` menghasilkan list baru yang sudah terurut:

```python
new_basket = sorted(basket)
```

`copy()` digunakan untuk membuat salinan list:

```python
new_basket = basket.copy()
```

Sedangkan `reverse()` digunakan untuk membalikkan urutan elemen:

```python
basket.reverse()
```

Hal penting yang perlu diingat:

```text
sort()
  → Mengurutkan dan mengubah list asli

sorted()
  → Menghasilkan list terurut baru

copy()
  → Membuat salinan list

reverse()
  → Membalikkan urutan dan mengubah list asli
```

:::info
**Perhatikan perbedaan antara method yang memodifikasi list secara in-place dan function yang menghasilkan list baru. Pemahaman ini akan membantu menghindari kesalahan ketika bekerja dengan data dalam Python.**
:::