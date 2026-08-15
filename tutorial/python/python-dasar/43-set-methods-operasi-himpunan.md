---
sidebar_position: 43
title: "Set Methods - Operasi Himpunan"
---

Pada materi sebelumnya, kita telah mempelajari konsep dasar Set, seperti membuat Set, menambahkan data, menghapus data, dan menghilangkan duplikat.

Set juga memiliki berbagai method yang dapat digunakan untuk melakukan **operasi himpunan**, seperti:

- Selisih (*difference*).
- Irisan (*intersection*).
- Gabungan (*union*).
- Subset.
- Superset.
- Memeriksa apakah dua Set saling terpisah.

Konsep ini sangat mirip dengan operasi himpunan dalam matematika.

---

## 1. Difference

Method `.difference()` digunakan untuk mencari elemen yang terdapat pada Set pertama tetapi **tidak terdapat pada Set kedua**.

Secara matematika, operasi ini dapat ditulis sebagai:

```text
A - B
```

Contohnya:

```python
my_set = {1, 2, 3, 4, 5}
your_set = {4, 5, 6, 7, 8}

result = my_set.difference(your_set)

print(result)
```

Hasil:

```text
{1, 2, 3}
```

Artinya:

```text
my_set
1 2 3 4 5

your_set
4 5 6 7 8

Perbedaan:
1 2 3
```

`.difference()` menghasilkan **Set baru** dan tidak mengubah Set asli.

---

## 2. Arah Difference

Operasi difference bergantung pada posisi Set.

Contohnya:

```python
my_set = {1, 2, 3, 4, 5}
your_set = {4, 5, 6, 7, 8}

print(my_set.difference(your_set))
print(your_set.difference(my_set))
```

Hasil:

```text
{1, 2, 3}
{6, 7, 8}
```

Jadi:

```python
my_set.difference(your_set)
```

berbeda dengan:

```python
your_set.difference(my_set)
```

---

## 3. `.discard()`

Method `.discard()` digunakan untuk menghapus elemen tertentu dari Set.

Contohnya:

```python
my_set = {1, 2, 3, 4, 5}

my_set.discard(5)

print(my_set)
```

Hasil:

```text
{1, 2, 3, 4}
```

`.discard()` bekerja secara **in-place**, sehingga Set asli berubah.

---

## 4. `.discard()` Jika Elemen Tidak Ada

Salah satu kelebihan `.discard()` adalah tidak menghasilkan error jika elemen yang ingin dihapus tidak terdapat di dalam Set.

Contohnya:

```python
my_set = {1, 2, 3}

my_set.discard(10)

print(my_set)
```

Hasil:

```text
{1, 2, 3}
```

Tidak terjadi error.

Hal ini berbeda dengan beberapa operasi penghapusan lain yang dapat menghasilkan error jika elemen tidak ditemukan.

---

## 5. `.difference_update()`

Method `.difference_update()` digunakan untuk menghapus elemen yang terdapat pada Set lain dari Set saat ini.

Contohnya:

```python
my_set = {1, 2, 3, 4, 5}
your_set = {4, 5, 6, 7, 8}

my_set.difference_update(your_set)

print(my_set)
```

Hasil:

```text
{1, 2, 3}
```

Berbeda dengan `.difference()`, method ini **mengubah Set asli**.

---

## 6. Perbedaan `.difference()` dan `.difference_update()`

| Method | Hasil | Mengubah Set Asli |
| --- | --- | --- |
| `.difference()` | Set baru | Tidak |
| `.difference_update()` | Tidak menghasilkan Set baru | Ya |

Contohnya:

```python
my_set = {1, 2, 3, 4, 5}
your_set = {4, 5}

result = my_set.difference(your_set)

print(result)
print(my_set)
```

Hasil:

```text
{1, 2, 3}
{1, 2, 3, 4, 5}
```

Set asli tetap.

Sedangkan:

```python
my_set.difference_update(your_set)
```

akan mengubah `my_set`.

---

## 7. Intersection

**Intersection** digunakan untuk mencari elemen yang terdapat pada **kedua Set**.

Secara matematika:

```text
A ∩ B
```

Contohnya:

```python
my_set = {1, 2, 3, 4, 5}
your_set = {4, 5, 6, 7, 8}

result = my_set.intersection(your_set)

print(result)
```

Hasil:

```text
{4, 5}
```

Angka `4` dan `5` terdapat pada kedua Set.

---

## 8. Operator Intersection `&`

Selain menggunakan `.intersection()`, kita dapat menggunakan operator:

```text
&
```

Contohnya:

```python
my_set = {1, 2, 3, 4, 5}
your_set = {4, 5, 6, 7, 8}

print(my_set & your_set)
```

Hasil:

```text
{4, 5}
```

Kedua bentuk berikut memiliki tujuan yang sama:

```python
my_set.intersection(your_set)
```

dan:

```python
my_set & your_set
```

---

## 9. `isdisjoint()`

Method `.isdisjoint()` digunakan untuk memeriksa apakah dua Set **tidak memiliki elemen yang sama**.

Hasilnya berupa Boolean:

```text
True
```

atau:

```text
False
```

Contohnya:

```python
my_set = {1, 2, 3}
your_set = {4, 5, 6}

print(my_set.isdisjoint(your_set))
```

Hasil:

```text
True
```

Karena tidak ada elemen yang sama.

---

## 10. `isdisjoint()` Jika Ada Elemen yang Sama

```python
my_set = {1, 2, 3}
your_set = {3, 4, 5}

print(my_set.isdisjoint(your_set))
```

Hasil:

```text
False
```

Karena kedua Set memiliki elemen yang sama:

```text
3
```

---

## 11. Union

**Union** digunakan untuk menggabungkan seluruh elemen dari dua Set.

Secara matematika:

```text
A ∪ B
```

Duplikat akan otomatis dihilangkan.

Contohnya:

```python
my_set = {1, 2, 3, 4, 5}
your_set = {4, 5, 6, 7, 8}

result = my_set.union(your_set)

print(result)
```

Hasil:

```text
{1, 2, 3, 4, 5, 6, 7, 8}
```

Angka `4` dan `5` tidak muncul dua kali karena Set hanya menyimpan nilai unik.

---

## 12. Operator Union `|`

Selain menggunakan `.union()`, kita dapat menggunakan operator:

```text
|
```

Contohnya:

```python
my_set = {1, 2, 3}
your_set = {3, 4, 5}

print(my_set | your_set)
```

Hasil:

```text
{1, 2, 3, 4, 5}
```

Kedua bentuk berikut memiliki fungsi yang sama:

```python
my_set.union(your_set)
```

dan:

```python
my_set | your_set
```

---

## 13. Subset

**Subset** digunakan untuk memeriksa apakah semua elemen sebuah Set terdapat di dalam Set lainnya.

Method yang digunakan:

```python
.issubset()
```

Contohnya:

```python
my_set = {4, 5}
your_set = {4, 5, 6, 7, 8}

print(my_set.issubset(your_set))
```

Hasil:

```text
True
```

Karena semua elemen `my_set` terdapat di dalam `your_set`.

Secara konsep:

```text
my_set ⊆ your_set
```

---

## 14. Contoh Subset yang False

```python
my_set = {4, 5, 10}
your_set = {4, 5, 6, 7, 8}

print(my_set.issubset(your_set))
```

Hasil:

```text
False
```

Karena elemen `10` tidak terdapat di dalam `your_set`.

---

## 15. Superset

**Superset** merupakan kebalikan dari Subset.

Method yang digunakan:

```python
.issuperset()
```

Method ini memeriksa apakah sebuah Set memiliki **seluruh elemen dari Set lainnya**.

Contohnya:

```python
my_set = {4, 5}
your_set = {4, 5, 6, 7, 8}

print(your_set.issuperset(my_set))
```

Hasil:

```text
True
```

Karena `your_set` memiliki semua elemen yang terdapat di `my_set`.

---

## 16. Perbedaan Subset dan Superset

Misalnya:

```python
A = {1, 2}
B = {1, 2, 3, 4}
```

Maka:

```text
A adalah subset dari B
B adalah superset dari A
```

Dalam Python:

```python
print(A.issubset(B))
```

Hasil:

```text
True
```

Sedangkan:

```python
print(B.issuperset(A))
```

Hasil:

```text
True
```

---

## 17. Ringkasan Operasi Set

| Operasi | Method | Operator | Fungsi |
| --- | --- | --- | --- |
| Difference | `.difference()` | `-` | Mencari perbedaan |
| Difference Update | `.difference_update()` | - | Menghapus perbedaan dari Set asli |
| Intersection | `.intersection()` | `&` | Mencari elemen yang sama |
| Union | `.union()` | `|` | Menggabungkan Set |
| Disjoint | `.isdisjoint()` | - | Memeriksa apakah tidak ada elemen yang sama |
| Subset | `.issubset()` | `<=` | Memeriksa apakah Set merupakan bagian dari Set lain |
| Superset | `.issuperset()` | `>=` | Memeriksa apakah Set mencakup Set lain |

---

## 18. Contoh Lengkap

```python
my_set = {1, 2, 3, 4, 5}
your_set = {4, 5, 6, 7, 8}

# Difference
print(my_set.difference(your_set))

# Intersection
print(my_set.intersection(your_set))

# Union
print(my_set.union(your_set))

# Disjoint
print(my_set.isdisjoint(your_set))

# Subset
small_set = {4, 5}
print(small_set.issubset(your_set))

# Superset
print(your_set.issuperset(small_set))
```

Hasil secara konsep:

```text
{1, 2, 3}
{4, 5}
{1, 2, 3, 4, 5, 6, 7, 8}
False
True
True
```

---

## 19. Gambaran Operasi Himpunan

Misalnya terdapat dua Set:

```text
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
```

### Difference

```text
A - B = {1, 2}
```

### Intersection

```text
A ∩ B = {3, 4}
```

### Union

```text
A ∪ B = {1, 2, 3, 4, 5, 6}
```

Konsep ini sangat berguna ketika bekerja dengan data yang membutuhkan perbandingan antar kelompok.

---

## 20. Contoh Penggunaan dalam Pemrograman

Misalnya kita ingin mengetahui mata kuliah yang diambil oleh dua mahasiswa.

```python
student_a = {
    "Python",
    "Database",
    "Networking"
}

student_b = {
    "Python",
    "Cybersecurity",
    "Networking"
}
```

### Mata Kuliah yang Sama

```python
print(student_a & student_b)
```

Hasil:

```text
{"Python", "Networking"}
```

### Mata Kuliah yang Hanya Diambil Mahasiswa A

```python
print(student_a - student_b)
```

Hasil:

```text
{"Database"}
```

### Semua Mata Kuliah

```python
print(student_a | student_b)
```

Hasilnya berisi seluruh mata kuliah tanpa duplikat.

---

## 21. Ringkasan

Beberapa operasi Set yang penting:

### Difference

```python
A.difference(B)
```

Mencari elemen yang hanya terdapat di `A`.

### Difference Update

```python
A.difference_update(B)
```

Menghapus elemen yang juga terdapat di `B` dari `A`.

### Intersection

```python
A.intersection(B)
```

Mencari elemen yang terdapat pada kedua Set.

### Union

```python
A.union(B)
```

Menggabungkan kedua Set tanpa duplikat.

### Disjoint

```python
A.isdisjoint(B)
```

Memeriksa apakah kedua Set tidak memiliki elemen yang sama.

### Subset

```python
A.issubset(B)
```

Memeriksa apakah seluruh elemen `A` terdapat di `B`.

### Superset

```python
A.issuperset(B)
```

Memeriksa apakah `A` memiliki seluruh elemen `B`.

---

## Kesimpulan

Set tidak hanya berguna untuk menghilangkan duplikat. Set juga menyediakan berbagai operasi untuk **membandingkan dan mengolah kumpulan data**.

Operasi yang paling penting untuk dipahami adalah:

```text
Difference      → A - B
Intersection    → A & B
Union           → A | B
Subset          → A.issubset(B)
Superset        → A.issuperset(B)
Disjoint        → A.isdisjoint(B)
```

:::info
**Intinya:** Set sangat cocok digunakan ketika kita perlu membandingkan dua kelompok data, mencari data yang sama, mencari data yang berbeda, atau menggabungkan data tanpa duplikat.
:::