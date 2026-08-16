---
sidebar_position: 24
title: "Latihan: Password Checker"
---

Pada latihan ini, kita akan menggabungkan beberapa konsep Python dasar yang sudah dipelajari sebelumnya untuk membuat program sederhana **Password Checker**.

Program akan meminta pengguna memasukkan username dan password, kemudian menampilkan informasi password tanpa menampilkan password aslinya.

:::info
**Catatan:** Exercise ini hanya untuk latihan konsep Python dasar. Teknik menyembunyikan password menggunakan karakter `*` bukan merupakan metode keamanan atau enkripsi password yang sebenarnya.
:::

---

## Tujuan Exercise

Latihan ini bertujuan untuk mempraktikkan:

- `input()`
- Variable
- `len()`
- String multiplication
- f-string
- String manipulation
- Clean code dan code readability

---

## Studi Kasus

Buatlah program yang meminta pengguna memasukkan:

1. Username
2. Password

Program kemudian:

1. Menghitung jumlah karakter password.
2. Membuat representasi password menggunakan karakter `*`.
3. Menampilkan username.
4. Menampilkan password dalam bentuk karakter `*`.
5. Menampilkan jumlah karakter password.

---

## Contoh Interaksi

Misalnya pengguna memasukkan:

```text
What is your username? johnny
What is your password? mysecret
```

Program harus menghasilkan:

```text
johnny, your password ******* is 8 letters long.
```

Password asli:

```text
mysecret
```

tidak ditampilkan.

---

## Petunjuk

### 1. Menerima Username

Gunakan:

```python
username = input("What is your username? ")
```

---

### 2. Menerima Password

Gunakan:

```python
password = input("What is your password? ")
```

Ingat bahwa hasil dari `input()` berupa:

```text
str
```

---

### 3. Menghitung Panjang Password

Gunakan:

```python
len(password)
```

Simpan hasilnya ke dalam variable yang memiliki nama deskriptif.

Contohnya:

```python
password_length = len(password)
```

---

### 4. Membuat Password Tersembunyi

Gunakan teknik **string multiplication**.

Contohnya:

```python
"*" * 5
```

menghasilkan:

```text
*****
```

Gunakan panjang password untuk menentukan jumlah karakter `*`.

```python
hidden_password = "*" * password_length
```

---

### 5. Menampilkan Hasil

Gunakan f-string untuk membuat output.

Contohnya:

```python
print(f"{username}, your password {hidden_password} is {password_length} letters long.")
```

---

## Tantangan

Lengkapi program berikut:

```python
username = input("What is your username? ")
password = input("What is your password? ")

# Hitung panjang password


# Buat password tersembunyi


# Tampilkan hasil
```

---

## Contoh Solusi

Setelah mencoba menyelesaikan exercise sendiri, Anda dapat membandingkan dengan solusi berikut:

```python
username = input("What is your username? ")
password = input("What is your password? ")

password_length = len(password)

hidden_password = "*" * password_length

print(f"{username}, your password {hidden_password} is {password_length} letters long.")
```

---

## Memahami Solusi

Program dimulai dengan meminta username:

```python
username = input("What is your username? ")
```

Kemudian meminta password:

```python
password = input("What is your password? ")
```

Selanjutnya, program menghitung jumlah karakter password:

```python
password_length = len(password)
```

Jika password adalah:

```text
mysecret
```

maka:

```text
password_length = 8
```

Kemudian program membuat string bintang:

```python
hidden_password = "*" * password_length
```

Hasilnya:

```text
********
```

Terakhir, program menggunakan f-string untuk menampilkan hasil:

```python
print(f"{username}, your password {hidden_password} is {password_length} letters long.")
```

---

## String Multiplication

Salah satu konsep penting dalam exercise ini adalah **string multiplication**.

Python memungkinkan kita mengalikan string dengan integer.

Contohnya:

```python
print("*" * 5)
```

Hasil:

```text
*****
```

Contoh lainnya:

```python
print("Python " * 3)
```

Hasil:

```text
Python Python Python
```

Konsep ini digunakan dalam exercise untuk membuat karakter `*` sebanyak jumlah karakter password.

---

## Menggabungkan `len()` dan String Multiplication

Dua konsep tersebut dapat digunakan bersama:

```python
password = "secret"

password_length = len(password)

hidden_password = "*" * password_length
```

Hasil:

```text
password_length → 6
hidden_password → ******
```

Dengan demikian, jumlah karakter bintang akan selalu mengikuti panjang password.

---

## Mengapa Menggunakan Variable Terpisah?

Kita sebenarnya dapat menulis seluruh proses langsung di dalam `print()`.

Contohnya:

```python
print(f"{username}, your password {'*' * len(password)} is {len(password)} letters long.")
```

Kode tersebut memang dapat berjalan, tetapi lebih sulit dibaca.

Dalam pembelajaran dasar, lebih baik memecah proses menjadi beberapa variable:

```python
password_length = len(password)

hidden_password = "*" * password_length
```

Kemudian:

```python
print(f"{username}, your password {hidden_password} is {password_length} letters long.")
```

Cara ini membuat alur program lebih jelas.

---

## Prinsip Clean Code

Exercise ini juga memperkenalkan konsep sederhana mengenai **code readability**.

Bandingkan:

```python
print(f"{username}, your password {'*' * len(password)} is {len(password)} letters long.")
```

dengan:

```python
password_length = len(password)
hidden_password = "*" * password_length

print(f"{username}, your password {hidden_password} is {password_length} letters long.")
```

Versi kedua lebih panjang, tetapi lebih mudah dipahami.

Program dapat dibaca seperti sebuah proses:

```text
Ambil password
      ↓
Hitung panjang password
      ↓
Buat password tersembunyi
      ↓
Tampilkan hasil
```

---

## Challenge Tambahan

Cobalah modifikasi program agar output menggunakan bahasa Indonesia.

Contoh:

```text
Masukkan username: johnny
Masukkan password: mysecret

johnny, password kamu ******** panjangnya 8 karakter.
```

Gunakan konsep yang sama:

```text
input()
len()
string multiplication
f-string
```

---

## Challenge Tambahan 2

Cobalah membuat program yang menampilkan hanya **dua karakter terakhir** password dan menyembunyikan karakter lainnya.

Contoh:

```text
Password: mysecret
Output: ******et
```

Petunjuk:

Gunakan konsep **string slicing** yang sudah dipelajari sebelumnya.

---

## Konsep yang Dilatih

Exercise ini menggabungkan beberapa konsep Python dasar:

```text
input()
   ↓
Variable
   ↓
String
   ↓
len()
   ↓
String Multiplication
   ↓
f-string
   ↓
Output
```

---

## Kesimpulan

Exercise **Password Checker** merupakan latihan sederhana untuk menggabungkan beberapa konsep Python yang sudah dipelajari.

Konsep utama yang digunakan:

```python
input()
```

untuk mengambil username dan password.

```python
len(password)
```

untuk menghitung jumlah karakter password.

```python
"*" * password_length
```

untuk membuat representasi password menggunakan karakter `*`.

Dan:

```python
f"..."
```

untuk membuat output yang dinamis.

> **Exercise ini bertujuan melatih penggunaan beberapa konsep dasar Python secara bersamaan sekaligus membiasakan diri menulis kode yang mudah dibaca.**