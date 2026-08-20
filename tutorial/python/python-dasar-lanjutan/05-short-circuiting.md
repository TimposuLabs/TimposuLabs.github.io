---
sidebar_position: 5
title: "Short Circuiting"
---

**Short Circuiting** adalah mekanisme Python dalam mengevaluasi ekspresi logika dengan `and` dan `or` secara efisien.

Python akan menghentikan evaluasi lebih lanjut ketika hasil akhir ekspresi sudah dapat ditentukan tanpa perlu mengevaluasi kondisi berikutnya.

Konsep ini penting untuk memahami bagaimana Python menjalankan ekspresi logika dan bagaimana kita dapat menulis kode yang lebih efisien serta aman.

---

## Short Circuiting dengan `or`

Pada operator `or`, hasil ekspresi akan bernilai `True` jika setidaknya salah satu kondisi bernilai `True`.

Ketika kondisi pertama sudah bernilai `True`, Python tidak perlu mengevaluasi kondisi berikutnya.

### Contoh

```python
is_friend = True
is_user = True

if is_friend or is_user:
    print("Akses diberikan!")
```

Pada kode tersebut:

1. Python mengevaluasi `is_friend`.
2. Nilainya adalah `True`.
3. Karena menggunakan `or`, hasil akhirnya sudah pasti `True`.
4. Python tidak perlu mengevaluasi `is_user`.

Secara sederhana:

```text
True or ...
     ↓
hasil sudah pasti True
```

---

## Short Circuiting dengan `and`

Pada operator `and`, seluruh kondisi harus bernilai `True` agar hasil akhirnya `True`.

Jika kondisi pertama sudah bernilai `False`, Python tidak perlu mengevaluasi kondisi berikutnya.

### Contoh

```python
is_friend = False
is_user = True

if is_friend and is_user:
    print("Akses diberikan!")
```

Python akan:

1. Mengevaluasi `is_friend`.
2. Mendapatkan nilai `False`.
3. Karena menggunakan `and`, hasil akhirnya sudah pasti `False`.
4. Python tidak perlu mengevaluasi `is_user`.

Secara sederhana:

```text
False and ...
       ↓
hasil sudah pasti False
```

---

## Perbandingan `and` dan `or`

| Operator | Kondisi pertama | Kondisi berikutnya dievaluasi? |
|---|---|---|
| `or` | `True` | Tidak |
| `or` | `False` | Ya |
| `and` | `True` | Ya |
| `and` | `False` | Tidak |

Dengan demikian:

- `or` berhenti ketika menemukan nilai **Truthy**.
- `and` berhenti ketika menemukan nilai **Falsy**.

---

## Short Circuiting untuk Mencegah Error

Short circuiting juga dapat membantu mencegah error ketika kondisi berikutnya berpotensi menghasilkan error.

Contohnya:

```python
x = 0

if x != 0 and (10 / x > 1):
    print("Berhasil")
```

Python terlebih dahulu mengevaluasi:

```python
x != 0
```

Hasilnya:

```text
False
```

Karena menggunakan `and`, Python sudah mengetahui bahwa keseluruhan kondisi pasti `False`.

Oleh karena itu, operasi:

```python
10 / x
```

tidak pernah dievaluasi.

Program terhindar dari error:

```text
ZeroDivisionError
```

---

## Short Circuiting untuk Menghindari Akses Data yang Tidak Aman

Short circuiting juga dapat digunakan ketika kita perlu memastikan suatu kondisi terpenuhi sebelum melakukan operasi berikutnya.

Contohnya:

```python
users = []

if users and users[0] == "admin":
    print("User adalah admin")
```

Python terlebih dahulu mengevaluasi:

```python
users
```

Karena `users` merupakan list kosong dan termasuk nilai **Falsy**, kondisi berikutnya tidak dijalankan:

```python
users[0] == "admin"
```

Dengan demikian, Python tidak mencoba mengakses:

```python
users[0]
```

Hal ini mencegah terjadinya:

```text
IndexError
```

---

## Short Circuiting dengan Function

Short circuiting juga berlaku ketika kondisi berikutnya memanggil sebuah function.

```python
is_logged_in = False

def check_permission():
    print("Memeriksa permission...")
    return True

if is_logged_in and check_permission():
    print("Akses diberikan!")
```

Function `check_permission()` tidak dijalankan karena `is_logged_in` bernilai `False`.

Python sudah mengetahui bahwa:

```text
False and ...
```

pasti menghasilkan `False`.

---

## Short Circuiting dan Truthy/Falsy

Short circuiting tidak terbatas pada nilai `True` dan `False`.

Python juga menggunakan konsep **Truthy dan Falsy**.

Contohnya:

```python
username = ""

if username and username == "admin":
    print("Selamat datang!")
```

String kosong:

```python
""
```

merupakan nilai **Falsy**.

Karena `username` kosong, Python tidak perlu mengevaluasi:

```python
username == "admin"
```

---

## Urutan Evaluasi

Python mengevaluasi ekspresi logika dari **kiri ke kanan**.

Contoh:

```python
a = False
b = True
c = True

result = a and b and c
```

Urutan evaluasinya:

```text
a → False
    ↓
berhenti
```

`b` dan `c` tidak perlu dievaluasi.

Contoh lainnya:

```python
a = True
b = False
c = True

result = a and b and c
```

Urutan evaluasinya:

```text
a → True
     ↓
b → False
     ↓
berhenti
```

Python tidak perlu mengevaluasi `c`.

---

## Mengapa Short Circuiting Penting?

Short circuiting memiliki beberapa manfaat utama.

### 1. Efisiensi

Python tidak melakukan pekerjaan yang sebenarnya tidak diperlukan.

```python
if is_logged_in and check_permission():
    print("Akses diberikan!")
```

Jika pengguna belum login, pemeriksaan permission tidak perlu dilakukan.

### 2. Mencegah Error

Short circuiting dapat digunakan untuk memastikan kondisi tertentu terpenuhi sebelum melakukan operasi yang berpotensi menghasilkan error.

```python
if x != 0 and 10 / x > 1:
    print("Berhasil")
```

### 3. Membuat Kondisi Lebih Aman

Kita dapat mengatur urutan kondisi sehingga operasi yang berisiko hanya dijalankan ketika kondisi sebelumnya terpenuhi.

```python
if users and users[0] == "admin":
    print("User adalah admin")
```

---

## Hal yang Perlu Diperhatikan

Short circuiting bergantung pada **urutan kondisi**.

Perhatikan contoh berikut:

```python
if users and users[0] == "admin":
    print("User adalah admin")
```

Kode tersebut aman ketika `users` kosong karena pemeriksaan `users` dilakukan terlebih dahulu.

Sebaliknya, kode berikut tidak aman:

```python
if users[0] == "admin" and users:
    print("User adalah admin")
```

Python akan mencoba mengakses:

```python
users[0]
```

terlebih dahulu sebelum memeriksa apakah `users` memiliki elemen.

Jika `users` kosong, program akan menghasilkan `IndexError`.

Oleh karena itu, **urutan kondisi dapat menentukan apakah suatu kode aman untuk dijalankan**.

---

## Ringkasan

Short circuiting adalah mekanisme Python yang menghentikan evaluasi ekspresi logika ketika hasil akhirnya sudah dapat ditentukan.

Untuk `or`:

```text
True or ...
     ↓
berhenti
```

Python berhenti karena hasilnya sudah pasti `True`.

Untuk `and`:

```text
False and ...
       ↓
berhenti
```

Python berhenti karena hasilnya sudah pasti `False`.

Pola sederhananya:

```text
OR  → berhenti ketika menemukan Truthy
AND → berhenti ketika menemukan Falsy
```

Short circuiting dapat membantu:

- meningkatkan efisiensi program,
- menghindari operasi yang tidak diperlukan,
- mencegah runtime error,
- membuat pemeriksaan kondisi lebih aman.

Pemahaman tentang short circuiting akan menjadi semakin penting ketika mulai menggunakan **conditional**, **function**, dan **looping** dengan kondisi yang lebih kompleks.