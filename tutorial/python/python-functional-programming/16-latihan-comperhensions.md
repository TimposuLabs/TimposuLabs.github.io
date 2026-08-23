---
sidebar_position: 16
title: "Latihan: Comprehensions"
---

## Latihan: Mencari Duplikat Menggunakan Comprehension

Latihan ini bertujuan untuk mengubah kode pencarian elemen duplikat pada sebuah `list` yang sebelumnya menggunakan `for` loop dan `.append()` menjadi kode yang lebih ringkas menggunakan **comprehension**.

Pada latihan ini kita akan menggunakan `list comprehension`, `set comprehension`, dan method `.count()`.

## Studi Kasus

Diberikan sebuah `list` yang memiliki beberapa elemen yang muncul lebih dari satu kali:

```python
some_list = ['a', 'b', 'c', 'b', 'd', 'm', 'n', 'n']
```

Tujuannya adalah mendapatkan elemen yang duplikat:

```text
['b', 'n']
```

## Memeriksa Jumlah Kemunculan dengan `.count()`

Method `.count()` digunakan untuk menghitung berapa kali sebuah elemen muncul di dalam `list`.

Contoh:

```python
some_list = ['a', 'b', 'c', 'b', 'd', 'm', 'n', 'n']

print(some_list.count('a'))
print(some_list.count('b'))
print(some_list.count('n'))
```

Output:

```text
1
2
2
```

Artinya:

- `'a'` muncul 1 kali.
- `'b'` muncul 2 kali.
- `'n'` muncul 2 kali.

Kita dapat menggunakan kondisi berikut untuk menentukan apakah sebuah elemen merupakan duplikat:

```python
some_list.count(x) > 1
```

## Menggunakan List Comprehension

Kita dapat mencari semua elemen yang muncul lebih dari satu kali menggunakan `list comprehension`.

```python
some_list = ['a', 'b', 'c', 'b', 'd', 'm', 'n', 'n']

duplicates = [
    x
    for x in some_list
    if some_list.count(x) > 1
]

print(duplicates)
```

Output:

```text
['b', 'b', 'n', 'n']
```

Masalahnya adalah elemen yang sama masih muncul lebih dari satu kali.

Karakter `'b'` muncul dua kali dalam hasil, begitu juga dengan `'n'`.

## Menghilangkan Duplikasi dengan `set`

Karena `set` hanya menyimpan elemen yang unik, kita dapat menggunakannya untuk menghilangkan duplikasi.

```python
some_list = ['a', 'b', 'c', 'b', 'd', 'm', 'n', 'n']

duplicates = list(
    set([
        x
        for x in some_list
        if some_list.count(x) > 1
    ])
)

print(duplicates)
```

Output:

```text
['b', 'n']
```

Urutan elemen pada `set` tidak dijamin, sehingga hasilnya juga dapat berupa:

```text
['n', 'b']
```

## Menggunakan Set Comprehension

Kode sebelumnya dapat dibuat lebih ringkas dengan langsung menggunakan `set comprehension`.

```python
some_list = ['a', 'b', 'c', 'b', 'd', 'm', 'n', 'n']

duplicates = list({
    x
    for x in some_list
    if some_list.count(x) > 1
})

print(duplicates)
```

Output:

```text
['b', 'n']
```

Prosesnya dapat dipahami sebagai:

```text
some_list
    ↓
periksa setiap elemen
    ↓
count(x) > 1
    ↓
ambil elemen yang duplikat
    ↓
set
    ↓
hapus duplikasi
    ↓
list
```

## Mengapa Menggunakan `set`?

`set` memiliki karakteristik bahwa setiap elemennya harus unik.

Contoh:

```python
numbers = {1, 2, 2, 3, 3}

print(numbers)
```

Output:

```text
{1, 2, 3}
```

Karena itu, `set` sangat berguna ketika kita ingin menghilangkan data duplikat.

Dalam latihan ini:

```python
{
    x
    for x in some_list
    if some_list.count(x) > 1
}
```

akan menghasilkan `set` yang hanya berisi elemen unik yang muncul lebih dari satu kali.

## Perbandingan dengan `for` Loop

Sebelum menggunakan comprehension, logika pencarian duplikat dapat ditulis menggunakan `for` loop.

Contoh:

```python
some_list = ['a', 'b', 'c', 'b', 'd', 'm', 'n', 'n']

duplicates = []

for x in some_list:
    if some_list.count(x) > 1:
        duplicates.append(x)

duplicates = list(set(duplicates))

print(duplicates)
```

Dengan `set comprehension`, kode dapat dibuat lebih ringkas:

```python
some_list = ['a', 'b', 'c', 'b', 'd', 'm', 'n', 'n']

duplicates = list({
    x
    for x in some_list
    if some_list.count(x) > 1
})

print(duplicates)
```

Keduanya menghasilkan kumpulan elemen duplikat yang unik.

## Poin Penting

### `.count()`

Method `.count()` digunakan untuk menghitung jumlah kemunculan sebuah elemen dalam `list`.

```python
some_list.count(x)
```

Jika hasilnya lebih dari `1`, berarti elemen tersebut muncul lebih dari sekali.

### List Comprehension

`list comprehension` dapat digunakan untuk memilih elemen yang memenuhi kondisi tertentu.

```python
[
    x
    for x in some_list
    if some_list.count(x) > 1
]
```

### Set Comprehension

`set comprehension` dapat digunakan ketika kita ingin menghasilkan data unik.

```python
{
    x
    for x in some_list
    if some_list.count(x) > 1
}
```

### Kombinasi `list`, `set`, dan comprehension

Kita dapat menggabungkan beberapa konsep:

```python
duplicates = list({
    x
    for x in some_list
    if some_list.count(x) > 1
})
```

`set` digunakan untuk menghilangkan duplikasi, sedangkan `list()` digunakan jika hasil akhir yang diinginkan adalah `list`.

## Readability

Meskipun comprehension memungkinkan kita membuat kode yang lebih pendek, kode tidak selalu harus dibuat sesingkat mungkin.

Contoh berikut cukup ringkas:

```python
duplicates = list({
    x
    for x in some_list
    if some_list.count(x) > 1
})
```

Namun, untuk logika yang lebih kompleks, penggunaan `for` loop biasa dapat lebih mudah dipahami.

Prinsip yang perlu diperhatikan adalah **readability**. Kode yang mudah dipahami lebih penting daripada sekadar membuat kode menjadi satu baris.

## Kesimpulan

Pada latihan ini kita mempelajari beberapa konsep yang saling berkaitan:

- `.count()` digunakan untuk menghitung kemunculan elemen.
- `list comprehension` digunakan untuk menyaring elemen.
- `set comprehension` digunakan untuk menghasilkan elemen unik.
- `set` secara otomatis menghilangkan duplikasi.
- `list()` dapat digunakan untuk mengubah hasil `set` menjadi `list`.
- Comprehension dapat membuat kode menjadi lebih ringkas, tetapi tetap harus memperhatikan keterbacaan.