---
sidebar_position: 11
---

# Python Regular Expressions

## Pengenalan Regular Expressions (Regex) di Python

**Regular Expressions (Regex)** adalah pola karakter yang digunakan untuk pencarian, pencocokan, dan validasi teks.

Di Python, modul bawaan `re` digunakan untuk memproses regular expressions.

## Pencarian Sederhana dengan `re.search()`

Fungsi `re.search(pattern, string)` digunakan untuk memeriksa apakah sebuah pola ditemukan di dalam teks.

Jika pola ditemukan, fungsi ini mengembalikan **Match Object**.

Jika pola tidak ditemukan, fungsi akan mengembalikan `None`.

Contoh:

```python
import re

teks = "pencarian kata di dalam teks ini"
pola = "pencarian"

match = re.search(pola, teks)

if match:
    print("Ditemukan match object:", match)
```

Contoh hasil:

```
Ditemukan match object: <re.Match object; span=(0, 9), match='pencarian'>
```

## Match Object

Ketika `re.search()` menemukan kecocokan, Python mengembalikan sebuah **Match Object**.

### `match.span()`

Mengembalikan tuple yang berisi indeks awal dan akhir pencocokan.

```python
if match:
    print(match.span())
```

Contoh hasil:

```text
(0, 9)
```

### `match.start()`

Mengembalikan indeks awal kecocokan.

```python
if match:
    print(match.start())
```

### `match.end()`

Mengembalikan indeks akhir kecocokan.

```python
if match:
    print(match.end())
```

### `match.group()`

Mengembalikan string yang berhasil dicocokkan.

```python
if match:
    print(match.group())
```

Output:

```text
pencarian
```

## Mengompilasi Pola dengan `re.compile()`

Pola Regex dapat dikompilasi terlebih dahulu menggunakan `re.compile()`.

Cara ini berguna ketika pola yang sama akan digunakan berulang kali.

```python
import re

teks = "pencarian kata pencarian lagi"
pola = re.compile("pencarian")

match = pola.search(teks)

print(match.group())
```

Output:

```text
pencarian
```

## Mencari Semua Kemunculan dengan `findall()`

Method `findall()` digunakan untuk mendapatkan semua kemunculan pola di dalam sebuah string.

Hasilnya berupa `list`.

```python
import re

teks = "pencarian kata pencarian lagi"
pola = re.compile("pencarian")

hasil = pola.findall(teks)

print(hasil)
```

Output:

```text
['pencarian', 'pencarian']
```

## Mencocokkan Seluruh Teks dengan `fullmatch()`

Method `fullmatch()` digunakan untuk memastikan bahwa **seluruh isi teks** cocok dengan pola.

```python
import re

teks = "pencarian kata pencarian lagi"

pola_lengkap = re.compile("pencarian kata pencarian lagi")

hasil = pola_lengkap.fullmatch(teks)

if hasil:
    print("Seluruh teks cocok.")
```

Output:

```text
Seluruh text cocok.
```

`fullmatch()` hanya menghasilkan Match Object apabila seluruh teks sesuai dengan pola.

## Mencocokkan dari Awal dengan `match()`

Method `match()` digunakan untuk memeriksa apakah pola cocok mulai dari **awal string**.

```python
import re

teks = "pencarian kata pencarian lagi"

pola_awal = re.compile("pencarian")

hasil = pola_awal.match(teks)

if hasil:
    print("Pola ditemukan di awal teks.")
```

Output:

```text
Pola ditemukan di awal teks.
```

Karena teks dimulai dengan kata `pencarian`, pola tersebut berhasil dicocokkan.

## Perbedaan `search()`, `match()`, `fullmatch()`, dan `findall()`

| Method | Fungsi |
|---|---|
| `search()` | Mencari pola di bagian mana saja dalam teks |
| `match()` | Mencari pola hanya dari awal teks |
| `fullmatch()` | Memastikan seluruh teks cocok dengan pola |
| `findall()` | Mengambil semua kecocokan dalam bentuk list |

### `search()`

```python
pola.search(teks)
```

Mencari pola di bagian mana saja dalam teks.

### `match()`

```python
pola.match(teks)
```

Mencari pola hanya dari awal teks.

### `fullmatch()`

```python
pola.fullmatch(teks)
```

Memastikan seluruh teks cocok dengan pola.

### `findall()`

```python
pola.findall(teks)
```

Mengambil semua kecocokan dan mengembalikannya sebagai list.

## Contoh Perbandingan

Misalnya:

```python
import re

teks = "Saya sedang belajar Python"
pola = re.compile("Python")
```

Menggunakan `search()`:

```python
hasil = pola.search(teks)

if hasil:
    print("Ditemukan")
```

Pola ditemukan karena `search()` dapat mencari pola di bagian mana saja dalam teks.

Menggunakan `match()`:

```python
hasil = pola.match(teks)

if hasil:
    print("Ditemukan")
```

Pola tidak ditemukan karena teks tidak dimulai dengan `Python`.

Menggunakan `fullmatch()`:

```python
hasil = pola.fullmatch(teks)

if hasil:
    print("Ditemukan")
```

Pola tidak ditemukan karena seluruh teks bukan hanya `Python`.

Menggunakan `findall()`:

```python
hasil = pola.findall(teks)

print(hasil)
```

Hasil:

```text
['Python']
```

## Ringkasan

Regular Expressions atau Regex digunakan untuk mencari dan mencocokkan pola tertentu di dalam teks.

Python menyediakan modul bawaan `re` untuk bekerja dengan Regex.

Konsep utama:

- `re.search()` mencari pola di bagian mana saja dalam teks.
- `re.compile()` digunakan untuk membuat pola Regex yang dapat digunakan kembali.
- `findall()` mengambil semua kecocokan dan mengembalikannya dalam bentuk list.
- `match()` mencari pola hanya dari awal string.
- `fullmatch()` memastikan seluruh string cocok dengan pola.
- **Match Object** menyimpan informasi mengenai hasil pencocokan.
- `match.span()` mengembalikan indeks awal dan akhir kecocokan.
- `match.start()` mengembalikan indeks awal kecocokan.
- `match.end()` mengembalikan indeks akhir kecocokan.
- `match.group()` mengembalikan teks yang berhasil dicocokkan.
