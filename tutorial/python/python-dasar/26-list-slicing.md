---
sidebar_position: 26
title: "List Slicing"
---

**List slicing** adalah teknik untuk mengambil sebagian item dari sebuah list menggunakan sintaks:

```python
list[start:stop:step]
```

Konsep slicing pada list mirip dengan **string slicing** yang telah dipelajari sebelumnya.

Dengan slicing, kita dapat mengambil beberapa item sekaligus tanpa harus mengakses setiap index secara manual.

---

## 1. Sintaks List Slicing

Bentuk umum slicing:

```python
list[start:stop:step]
```

Terdapat tiga bagian:

```text
[start : stop : step]
    │      │      │
    │      │      └── Jarak perpindahan
    │      └───────── Batas akhir
    └──────────────── Posisi awal
```

### `start`

Menentukan index awal.

Index `start` **termasuk** dalam hasil.

### `stop`

Menentukan batas akhir.

Index `stop` **tidak termasuk** dalam hasil.

### `step`

Menentukan jarak perpindahan antar item.

Jika tidak ditentukan, nilai default-nya adalah:

```text
1
```

---

## 2. Contoh List

Kita akan menggunakan list berikut:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys",
    "grapes"
]
```

Index setiap item:

```text
Index :       0            1          2        3
              ↓            ↓          ↓        ↓
Item  :  notebooks   sunglasses     toys    grapes
```

---

## 3. Mengambil Sebagian List

Kita dapat mengambil beberapa item menggunakan slicing.

Contohnya:

```python
print(amazon_cart[0:2])
```

Hasil:

```text
['notebooks', 'sunglasses']
```

Prosesnya:

```text
Index 0 → notebooks
Index 1 → sunglasses
Index 2 → berhenti
```

Index `2` tidak termasuk karena `stop` bersifat eksklusif.

---

## 4. Mengambil dari Index Tertentu sampai Akhir

Kita dapat menghilangkan nilai `stop` jika ingin mengambil item sampai akhir list.

Contohnya:

```python
print(amazon_cart[1:])
```

Hasil:

```text
['sunglasses', 'toys', 'grapes']
```

Artinya:

```text
Mulai dari index 1
        ↓
Ambil sampai akhir
```

---

## 5. Mengambil dari Awal sampai Index Tertentu

Kita juga dapat menghilangkan `start`.

Contohnya:

```python
print(amazon_cart[:2])
```

Hasil:

```text
['notebooks', 'sunglasses']
```

Artinya:

```text
Mulai dari awal
        ↓
Berhenti sebelum index 2
```

---

## 6. Menggunakan `step`

Parameter `step` menentukan berapa banyak index yang dilewati.

Contohnya:

```python
print(amazon_cart[::2])
```

Hasil:

```text
['notebooks', 'toys']
```

Python mengambil item dengan pola:

```text
index 0 → index 2
```

atau:

```text
notebooks → toys
```

---

## 7. Contoh Slicing dengan Berbagai Pola

Dengan list:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys",
    "grapes"
]
```

kita dapat melakukan:

```python
print(amazon_cart[0:2])
```

Hasil:

```text
['notebooks', 'sunglasses']
```

```python
print(amazon_cart[1:])
```

Hasil:

```text
['sunglasses', 'toys', 'grapes']
```

```python
print(amazon_cart[:2])
```

Hasil:

```text
['notebooks', 'sunglasses']
```

```python
print(amazon_cart[::2])
```

Hasil:

```text
['notebooks', 'toys']
```

---

## 8. Slicing Menghasilkan List Baru

Salah satu hal penting tentang list slicing adalah slicing menghasilkan **list baru**.

Contohnya:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys",
    "grapes"
]

new_cart = amazon_cart[0:2]

print(new_cart)
```

Hasil:

```text
['notebooks', 'sunglasses']
```

`new_cart` merupakan hasil slicing dari `amazon_cart`.

---

## 9. Mengubah Hasil Slicing

Karena hasil slicing merupakan list baru, kita dapat mengubah item pada hasil tersebut.

Contohnya:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys",
    "grapes"
]

new_cart = amazon_cart[0:2]

new_cart[0] = "laptop"

print(new_cart)
print(amazon_cart)
```

Hasil:

```text
['laptop', 'sunglasses']
['notebooks', 'sunglasses', 'toys', 'grapes']
```

Perubahan pada `new_cart` tidak mengubah `amazon_cart`.

---

## 10. Menyalin Seluruh List dengan `[:]`

Slicing juga dapat digunakan untuk membuat salinan seluruh list.

Gunakan:

```python
list[:]
```

Contohnya:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys",
    "grapes"
]

new_cart = amazon_cart[:]
```

Sekarang `new_cart` berisi item yang sama dengan `amazon_cart`.

```python
print(new_cart)
```

Hasil:

```text
['notebooks', 'sunglasses', 'toys', 'grapes']
```

---

## 11. Mengapa Tidak Menggunakan Assignment Biasa?

Perhatikan contoh berikut:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys",
    "grapes"
]

new_cart = amazon_cart
```

Sekilas terlihat seperti kita membuat salinan.

Namun sebenarnya kita **tidak membuat list baru**.

Variable:

```text
amazon_cart
```

dan:

```text
new_cart
```

sama-sama merujuk pada list yang sama.

Secara sederhana:

```text
amazon_cart ──┐
              │
              ▼
       [notebooks, sunglasses, toys, grapes]
              ▲
              │
new_cart ─────┘
```

---

## 12. Masalah Reference

Karena kedua variable merujuk pada list yang sama, perubahan melalui salah satu variable akan terlihat melalui variable lainnya.

Contohnya:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys",
    "grapes"
]

new_cart = amazon_cart

new_cart[0] = "gum"

print(new_cart)
print(amazon_cart)
```

Hasil:

```text
['gum', 'sunglasses', 'toys', 'grapes']
['gum', 'sunglasses', 'toys', 'grapes']
```

Mengapa `amazon_cart` ikut berubah?

Karena:

```text
amazon_cart
      │
      └──────┐
             ▼
      List yang sama
             ▲
      ┌──────┘
      │
new_cart
```

Keduanya merujuk pada object list yang sama.

---

## 13. Menyalin List dengan Slicing

Jika kita ingin membuat list terpisah, gunakan slicing:

```python
new_cart = amazon_cart[:]
```

Contohnya:

```python
amazon_cart = [
    "notebooks",
    "sunglasses",
    "toys",
    "grapes"
]

new_cart = amazon_cart[:]

new_cart[0] = "gum"

print(new_cart)
print(amazon_cart)
```

Hasil:

```text
['gum', 'sunglasses', 'toys', 'grapes']
['notebooks', 'sunglasses', 'toys', 'grapes']
```

Sekarang perubahan pada `new_cart` tidak mengubah `amazon_cart`.

---

## 14. Assignment vs Slicing

Perhatikan perbedaan berikut.

### Assignment

```python
new_cart = amazon_cart
```

Hasil:

```text
new_cart ──┐
           ↓
      List yang sama
           ↑
amazon_cart
```

Keduanya merujuk pada object yang sama.

### Slicing

```python
new_cart = amazon_cart[:]
```

Hasil:

```text
new_cart ──→ List baru

amazon_cart → List asli
```

Keduanya merupakan list yang berbeda.

---

## 15. Slicing untuk Copy

Dengan menggunakan:

```python
amazon_cart[:]
```

kita mengambil seluruh bagian list:

```text
start → awal
stop  → akhir
step  → 1
```

Sehingga:

```python
amazon_cart[:]
```

menghasilkan list baru yang berisi item dari list tersebut.

Teknik ini sering digunakan untuk membuat **shallow copy** dari sebuah list.

---

## 16. Reverse Slicing

Slicing juga dapat digunakan untuk membalikkan urutan list.

Gunakan:

```python
[::-1]
```

Contohnya:

```python
numbers = [1, 2, 3, 4, 5]

reverse_numbers = numbers[::-1]

print(reverse_numbers)
```

Hasil:

```text
[5, 4, 3, 2, 1]
```

List asli tetap:

```text
[1, 2, 3, 4, 5]
```

---

## 17. Negative Indexing pada Slicing

List slicing juga dapat menggunakan index negatif.

Contohnya:

```python
numbers = [1, 2, 3, 4, 5]

print(numbers[-3:])
```

Hasil:

```text
[3, 4, 5]
```

Expression tersebut mengambil tiga item terakhir.

Contoh lainnya:

```python
print(numbers[:-2])
```

Hasil:

```text
[1, 2, 3]
```

Artinya mengambil item dari awal sampai sebelum dua item terakhir.

---

## 18. Ringkasan Slicing

Dengan:

```python
numbers = [1, 2, 3, 4, 5]
```

beberapa contoh:

| Expression | Hasil | Keterangan |
| --- | --- | --- |
| `numbers[0:2]` | `[1, 2]` | Index `0` sampai sebelum `2` |
| `numbers[1:]` | `[2, 3, 4, 5]` | Index `1` sampai akhir |
| `numbers[:3]` | `[1, 2, 3]` | Awal sampai sebelum `3` |
| `numbers[::2]` | `[1, 3, 5]` | Setiap 2 langkah |
| `numbers[:]` | `[1, 2, 3, 4, 5]` | Salinan seluruh list |
| `numbers[::-1]` | `[5, 4, 3, 2, 1]` | Membalikkan list |
| `numbers[-2:]` | `[4, 5]` | Dua item terakhir |

---

## 19. Hal Penting tentang Copy

Untuk list sederhana yang hanya berisi nilai seperti:

```python
numbers = [1, 2, 3, 4]
```

penggunaan:

```python
numbers[:]
```

dapat digunakan untuk membuat salinan list.

Namun, perlu diketahui bahwa slicing menghasilkan **shallow copy**.

Artinya, jika list berisi object lain seperti nested list, object di dalamnya masih dapat memiliki reference yang sama.

Konsep **shallow copy** dan **deep copy** akan lebih relevan ketika mempelajari struktur data yang lebih kompleks.

Untuk tahap dasar, cukup pahami:

```python
new_list = old_list[:]
```

digunakan untuk membuat list baru berdasarkan isi list lama.

---

## Kesimpulan

**List slicing** digunakan untuk mengambil sebagian atau seluruh item dari sebuah list.

Sintaksnya:

```python
list[start:stop:step]
```

Contoh:

```python
amazon_cart[0:2]
```

mengambil item dari index `0` sampai sebelum index `2`.

Slicing juga dapat digunakan untuk membuat salinan list:

```python
new_cart = amazon_cart[:]
```

Hal ini berbeda dengan:

```python
new_cart = amazon_cart
```

Assignment biasa membuat kedua variable merujuk pada **list yang sama**, sedangkan:

```python
new_cart = amazon_cart[:]
```

membuat **list baru** berdasarkan isi list tersebut.

:::tip
**Gunakan slicing untuk mengambil bagian tertentu dari list, dan `list[:]` dapat digunakan untuk membuat shallow copy dari sebuah list.**
:::