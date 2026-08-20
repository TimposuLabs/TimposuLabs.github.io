---
sidebar_position: 6
title: "Logical Operators"
---

**Logical Operators** atau operator logika digunakan untuk menggabungkan dan mengevaluasi kondisi dalam program.

Operator ini sangat penting dalam pembuatan **conditional logic**, karena memungkinkan program mengambil keputusan berdasarkan satu atau beberapa kondisi.

Dalam Python, hasil dari operasi perbandingan umumnya berupa nilai Boolean, yaitu `True` atau `False`.

---

## Comparison Operators

Sebelum memahami operator logika, kita perlu memahami **comparison operators** atau operator perbandingan.

Operator perbandingan digunakan untuk membandingkan dua nilai.

| Operator | Arti | Contoh | Hasil |
|---|---|---|---|
| `>` | Lebih besar dari | `4 > 5` | `False` |
| `<` | Lebih kecil dari | `4 < 5` | `True` |
| `==` | Sama dengan | `4 == 5` | `False` |
| `!=` | Tidak sama dengan | `4 != 5` | `True` |
| `>=` | Lebih besar atau sama dengan | `5 >= 5` | `True` |
| `<=` | Lebih kecil atau sama dengan | `4 <= 5` | `True` |

### Contoh

```python
age = 20

print(age > 18)
print(age < 18)
print(age == 20)
print(age != 20)
```

Output:

```text
True
False
True
False
```

---

## Perbedaan `=` dan `==`

Salah satu kesalahan yang sering dilakukan pemula adalah menganggap `=` dan `==` memiliki fungsi yang sama.

### `=` Assignment Operator

Tanda `=` digunakan untuk memberikan atau menetapkan nilai ke variabel.

```python
age = 20
```

Artinya variabel `age` diberikan nilai `20`.

### `==` Comparison Operator

Tanda `==` digunakan untuk membandingkan apakah dua nilai memiliki nilai yang sama.

```python
age == 20
```

Hasilnya berupa Boolean:

```text
True
```

Contoh dalam kondisi:

```python
age = 20

if age == 20:
    print("Umur adalah 20 tahun")
```

---

## Operator `and`

Operator `and` digunakan ketika **semua kondisi harus terpenuhi**.

Hasilnya hanya `True` jika seluruh kondisi bernilai `True`.

| Kondisi A | Kondisi B | `A and B` |
|---|---|---|
| `True` | `True` | `True` |
| `True` | `False` | `False` |
| `False` | `True` | `False` |
| `False` | `False` | `False` |

### Contoh

```python
age = 25
has_license = True

if age >= 18 and has_license:
    print("Boleh mengemudi")
```

Pada contoh tersebut, terdapat dua kondisi:

1. `age >= 18`
2. `has_license`

Keduanya harus bernilai `True` agar program menjalankan blok `if`.

---

## Operator `or`

Operator `or` digunakan ketika **setidaknya salah satu kondisi harus terpenuhi**.

Hasilnya `True` jika salah satu atau kedua kondisi bernilai `True`.

| Kondisi A | Kondisi B | `A or B` |
|---|---|---|
| `True` | `True` | `True` |
| `True` | `False` | `True` |
| `False` | `True` | `True` |
| `False` | `False` | `False` |

### Contoh

```python
is_admin = False
is_editor = True

if is_admin or is_editor:
    print("Boleh mengakses halaman")
```

Meskipun `is_admin` bernilai `False`, kondisi `is_editor` bernilai `True`.

Karena menggunakan `or`, hasil akhirnya adalah `True`.

---

## Operator `not`

Operator `not` digunakan untuk **membalikkan nilai logika**.

Jika nilai awal `True`, maka `not` menghasilkan `False`.

Jika nilai awal `False`, maka `not` menghasilkan `True`.

### Contoh

```python
print(not True)
print(not False)
```

Output:

```text
False
True
```

Operator `not` juga dapat digunakan pada ekspresi perbandingan.

```python
print(not (1 == 1))
```

Ekspresi:

```python
1 == 1
```

menghasilkan `True`.

Kemudian `not` membaliknya menjadi:

```text
False
```

---

## Menggabungkan Beberapa Operator

Operator logika dapat digunakan bersama dengan operator perbandingan.

Contohnya:

```python
age = 25
has_license = True
is_banned = False

if age >= 18 and has_license and not is_banned:
    print("Boleh mengemudi")
```

Program akan memeriksa tiga kondisi:

1. `age >= 18`
2. `has_license`
3. `not is_banned`

Jika semuanya bernilai `True`, program menjalankan perintah di dalam `if`.

---

## Logical Operators dalam Conditional

Operator logika sangat sering digunakan bersama `if`, `elif`, dan `else`.

Contoh:

```python
username = "admin"
password = "12345"

if username == "admin" and password == "12345":
    print("Login berhasil")
else:
    print("Username atau password salah")
```

Pada contoh tersebut, login hanya berhasil jika:

```text
username == "admin"
```

dan:

```text
password == "12345"
```

keduanya benar.

---

## Membandingkan String

Operator perbandingan juga dapat digunakan untuk membandingkan string.

```python
print("a" > "b")
print("a" < "b")
```

Output:

```text
False
True
```

Python membandingkan karakter berdasarkan nilai numerik Unicode.

Contohnya:

```python
print("a" > "A")
```

Hasilnya:

```text
True
```

Hal ini terjadi karena huruf kecil dan huruf kapital memiliki nilai Unicode yang berbeda.

---

## Perbandingan String Berdasarkan Urutan Karakter

Python dapat membandingkan string berdasarkan urutan karakter.

```python
print("apple" == "apple")
print("apple" == "Apple")
```

Output:

```text
True
False
```

Perbandingan string bersifat **case-sensitive**.

Artinya:

```text
"Python"
```

dan:

```text
"python"
```

dianggap berbeda.

---

## Menggunakan Kurung untuk Memperjelas Kondisi

Ketika menggunakan beberapa operator logika sekaligus, tanda kurung dapat membantu memperjelas maksud kondisi.

```python
age = 25
has_license = True
has_permission = False

if age >= 18 and (has_license or has_permission):
    print("Akses diberikan")
```

Pada contoh tersebut:

```python
has_license or has_permission
```

diperiksa sebagai satu kelompok kondisi.

Penggunaan tanda kurung dapat membuat ekspresi kompleks lebih mudah dibaca dan dipahami.

---

## Hubungan dengan Short Circuiting

Operator `and` dan `or` juga berkaitan dengan konsep **Short Circuiting**.

Pada `and`, Python dapat berhenti ketika menemukan kondisi yang bernilai `False`.

```python
False and ...
```

Hasilnya sudah pasti `False`.

Pada `or`, Python dapat berhenti ketika menemukan kondisi yang bernilai `True`.

```python
True or ...
```

Hasilnya sudah pasti `True`.

Dengan demikian, Python tidak selalu mengevaluasi seluruh kondisi dalam sebuah ekspresi logika.

---

## Ringkasan

Operator perbandingan digunakan untuk membandingkan nilai:

- `>` lebih besar
- `<` lebih kecil
- `==` sama dengan
- `!=` tidak sama dengan
- `>=` lebih besar atau sama dengan
- `<=` lebih kecil atau sama dengan

Operator logika digunakan untuk menggabungkan atau membalikkan kondisi:

- `and` → semua kondisi harus benar
- `or` → setidaknya satu kondisi harus benar
- `not` → membalik nilai logika

Contoh penggunaan:

```python
age = 25
has_license = True

if age >= 18 and has_license:
    print("Boleh mengemudi")
```

Pemahaman tentang operator perbandingan dan operator logika merupakan dasar penting sebelum mempelajari **conditional**, **looping**, dan berbagai bentuk **control flow** dalam Python.

---

## Contoh Latihan: Logical Operators

Latihan ini merupakan kelanjutan dari materi **Logical Operators**. Tujuannya adalah menerapkan operator `and` dan `not` dalam sebuah **conditional logic** menggunakan `if`, `elif`, dan `else`.

Latihan ini juga membantu memahami bagaimana menyusun kondisi agar kode tetap **jelas, mudah dibaca, dan mudah dipahami**.

---

## Studi Kasus

Misalkan kita memiliki dua informasi mengenai seorang pemain game:

```python
is_magician = False
is_expert = True
```

Kedua variabel tersebut digunakan untuk menentukan kemampuan pemain.

Program harus menghasilkan pesan berdasarkan kondisi berikut:

1. Jika pemain adalah **magician dan expert**, tampilkan:

   `"You are a master magician"`

2. Jika pemain adalah **magician tetapi bukan expert**, tampilkan:

   `"At least you're getting there"`

3. Jika pemain **bukan magician**, tampilkan:

   `"You need magic powers"`

---

## Solusi

```python
is_magician = False
is_expert = True

if is_magician and is_expert:
    print("You are a master magician")

elif is_magician and not is_expert:
    print("At least you're getting there")

elif not is_magician:
    print("You need magic powers")
```

Dengan nilai:

```python
is_magician = False
is_expert = True
```

kondisi pertama:

```python
is_magician and is_expert
```

menghasilkan `False`.

Kondisi kedua:

```python
is_magician and not is_expert
```

juga menghasilkan `False`.

Kondisi ketiga:

```python
not is_magician
```

menghasilkan `True`.

Sehingga output program adalah:

```text
You need magic powers
```

---

## Memahami `and`

Kondisi:

```python
is_magician and is_expert
```

berarti **kedua kondisi harus benar**.

Contohnya:

```python
is_magician = True
is_expert = True
```

Maka:

```text
True and True
```

menghasilkan:

```text
True
```

Program akan menampilkan:

```text
You are a master magician
```

---

## Memahami `and not`

Kondisi:

```python
is_magician and not is_expert
```

berarti:

- pemain adalah magician
- pemain bukan expert

Contohnya:

```python
is_magician = True
is_expert = False
```

Maka:

```text
True and not False
```

menjadi:

```text
True and True
```

Hasilnya adalah `True`.

Output:

```text
At least you're getting there
```

---

## Memahami `not`

Operator `not` digunakan untuk membalik nilai Boolean.

Jika:

```python
is_magician = False
```

maka:

```python
not is_magician
```

menghasilkan:

```text
True
```

Sebaliknya, jika:

```python
is_magician = True
```

maka:

```python
not is_magician
```

menghasilkan:

```text
False
```

---

## Mengapa Menggunakan `not` Secara Eksplisit?

Perhatikan kondisi berikut:

```python
elif is_magician and not is_expert:
    print("At least you're getting there")
```

Penulisan tersebut secara eksplisit menjelaskan bahwa pemain:

- harus seorang magician
- dan tidak boleh seorang expert

Kode menjadi lebih mudah dipahami dibandingkan membuat logika yang terlalu bergantung pada kondisi sebelumnya.

Prinsip yang perlu diingat:

> Kode yang mudah dibaca lebih penting daripada kode yang sekadar terlihat singkat.

---

## Alternatif Menggunakan `else`

Kondisi terakhir juga dapat menggunakan `else`.

```python
is_magician = False
is_expert = True

if is_magician and is_expert:
    print("You are a master magician")

elif is_magician and not is_expert:
    print("At least you're getting there")

else:
    print("You need magic powers")
```

Dalam kasus ini, `else` akan menangani semua kondisi yang tidak memenuhi dua kondisi sebelumnya.

Penggunaan `else` dapat menjadi pilihan yang baik ketika kondisi terakhir memang merupakan **default condition**.

---

## Latihan Mandiri

Coba ubah nilai kedua variabel berikut:

```python
is_magician = True
is_expert = True
```

Prediksi output program sebelum menjalankannya.

Kemudian coba:

```python
is_magician = True
is_expert = False
```

Terakhir, coba:

```python
is_magician = False
is_expert = False
```

Perhatikan bagaimana perubahan nilai Boolean memengaruhi hasil conditional.

---

## Kesimpulan

Latihan ini memperkuat beberapa konsep yang sudah dipelajari:

- `and` digunakan ketika **semua kondisi harus terpenuhi**.
- `not` digunakan untuk **membalik nilai Boolean**.
- `if`, `elif`, dan `else` digunakan untuk membuat keputusan berdasarkan kondisi.
- Kondisi seperti `is_magician and not is_expert` dapat membuat maksud program lebih jelas.
- Kode yang baik tidak hanya harus benar, tetapi juga **mudah dibaca dan dipahami**.