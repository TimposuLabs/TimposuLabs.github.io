---
sidebar_position: 7
title: "is vs =="
---

Python menyediakan beberapa operator untuk membandingkan objek. Dua operator yang sering dianggap sama adalah `==` dan `is`.

Meskipun keduanya dapat digunakan dalam ekspresi kondisi, keduanya memiliki tujuan yang berbeda:

- `==` digunakan untuk membandingkan **nilai**.
- `is` digunakan untuk membandingkan **identitas objek**.

Memahami perbedaan keduanya penting agar tidak terjadi kesalahan ketika bekerja dengan object, terutama `None`, list, dictionary, dan struktur data lainnya.

---

## `==` - Equality

Operator `==` digunakan untuk memeriksa apakah **nilai dari dua objek sama**.

Contoh:

```python
print(10 == 10)
# True

print(10 == 20)
# False
```

Pada struktur data seperti list, `==` membandingkan isi dari objek tersebut.

```python
list_a = [1, 2, 3]
list_b = [1, 2, 3]

print(list_a == list_b)
# True
```

Walaupun `list_a` dan `list_b` merupakan dua objek list yang berbeda, keduanya memiliki isi yang sama.

Contoh lainnya:

```python
print(True == 1)
# True

print(10 == 10.0)
# True

print([] == [])
# True
```

Untuk perbandingan nilai, gunakan `==`.

---

## `is` - Identity

Operator `is` digunakan untuk memeriksa apakah dua variabel merujuk pada **objek yang sama**.

Contoh:

```python
a = [1, 2, 3]
b = a

print(a is b)
# True
```

Pada contoh tersebut, `b = a` membuat `b` merujuk pada objek list yang sama dengan `a`.

Karena keduanya merujuk pada objek yang sama, maka:

```python
a is b
```

menghasilkan `True`.

---

## `==` vs `is` pada List

Perbedaan keduanya dapat terlihat dengan jelas menggunakan dua list.

```python
a = [1, 2, 3]
b = [1, 2, 3]

print(a == b)
# True

print(a is b)
# False
```

Mengapa hasilnya berbeda?

`a == b` memeriksa isi:

```text
[1, 2, 3] == [1, 2, 3]
```

Karena isinya sama, hasilnya `True`.

Sedangkan `a is b` memeriksa identitas objek. `a` dan `b` dibuat sebagai dua objek list yang berbeda.

Sehingga:

```text
a is b
```

menghasilkan `False`.

---

## Contoh dengan Reference

Perhatikan contoh berikut:

```python
a = [1, 2, 3]
b = a

print(a == b)
# True

print(a is b)
# True
```

Berbeda dengan contoh sebelumnya, `b` tidak membuat list baru.

Ketika menulis:

```python
b = a
```

variabel `b` merujuk ke objek yang sama dengan `a`.

Karena nilai dan identitasnya sama:

```python
a == b
```

dan:

```python
a is b
```

keduanya menghasilkan `True`.

---

## `is` dengan `None`

Salah satu penggunaan `is` yang paling umum adalah ketika memeriksa apakah sebuah variabel memiliki nilai `None`.

Contoh:

```python
user = None

if user is None:
    print("User belum tersedia")
```

Penggunaan:

```python
is None
```

lebih tepat dibandingkan:

```python
== None
```

Jadi, pola yang umum digunakan dalam Python adalah:

```python
if value is None:
    print("Tidak ada nilai")
```

Untuk mengecek bahwa sebuah nilai bukan `None`, gunakan:

```python
if value is not None:
    print("Nilai tersedia")
```

---

## Jangan Menyamakan `is` dengan `==`

Kesalahan yang cukup umum bagi pemula adalah menggunakan `is` untuk semua jenis perbandingan.

Contoh:

```python
a = [1, 2, 3]
b = [1, 2, 3]

print(a is b)
```

Hasilnya:

```text
False
```

Jika tujuan kita adalah mengetahui apakah isi kedua list sama, gunakan:

```python
print(a == b)
```

Hasilnya:

```text
True
```

Jadi, pilih operator berdasarkan tujuan perbandingan.

---

## Perbandingan

| Operator | Membandingkan | Pertanyaan |
|---|---|---|
| `==` | Nilai | "Apakah nilainya sama?" |
| `is` | Identitas objek | "Apakah ini objek yang sama?" |
| `!=` | Ketidaksamaan nilai | "Apakah nilainya berbeda?" |
| `is not` | Ketidaksamaan identitas | "Apakah ini bukan objek yang sama?" |

---

## Contoh Praktis

Misalnya sebuah fungsi dapat mengembalikan `None` ketika data tidak ditemukan:

```python
result = None

if result is None:
    print("Data tidak ditemukan")
else:
    print("Data ditemukan")
```

Sementara jika ingin membandingkan hasil suatu nilai:

```python
result = 100

if result == 100:
    print("Nilai adalah 100")
```

Keduanya memiliki tujuan yang berbeda.

---

## Kesimpulan

Hal utama yang perlu diingat:

1. `==` digunakan untuk membandingkan **kesamaan nilai**.
2. `is` digunakan untuk membandingkan **identitas objek**.
3. Dua objek dapat memiliki nilai yang sama tetapi bukan objek yang sama.
4. `is` sangat umum digunakan untuk pemeriksaan `None`.
5. Gunakan `==` untuk membandingkan isi atau nilai data.
6. Gunakan `is` ketika memang ingin mengetahui apakah dua referensi menunjuk ke objek yang sama.

Pola yang perlu diingat:

```python
value == other_value
```

digunakan untuk **value equality**, sedangkan:

```python
value is other_value
```

digunakan untuk **object identity**.