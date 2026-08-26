---
sidebar_position: 6
title: "Latihan: Decorator"
---

## Latihan: Membuat Authentication Decorator

Pada latihan ini, kita akan membuat sebuah **custom decorator** yang digunakan untuk memeriksa apakah seorang user memiliki akses untuk menjalankan sebuah function.

Decorator yang dibuat bernama `authenticated`.

Function hanya boleh dijalankan apabila nilai `valid` pada data user adalah `True`.

## Tujuan Latihan

Diberikan sebuah data user:

```python
user1 = {
    "name": "Sorna",
    "valid": True
}
```

Buatlah decorator `@authenticated` yang memiliki aturan:

- Jika `user["valid"]` bernilai `True`, function dijalankan.
- Jika `user["valid"]` bernilai `False`, function tidak dijalankan.
- Jika user tidak valid, tampilkan pesan `"invalid user"`.

Decorator tersebut akan digunakan pada function:

```python
@authenticated
def message_friends(user):
    print("message has been sent")
```

## Kode Awal

Berikut kode latihan yang perlu dilengkapi:

```python
user1 = {
    "name": "Sorna",
    "valid": True
}


def authenticated(fn):
    # Buat decorator di sini
    pass


@authenticated
def message_friends(user):
    print("message has been sent")


message_friends(user1)
```

### Hasil yang Diharapkan

Jika:

```python
"valid": True
```

maka:

```text
message has been sent
```

Jika diubah menjadi:

```python
"valid": False
```

maka:

```text
invalid user
```

## Petunjuk

Perhatikan bahwa `message_friends()` menerima sebuah argument berupa dictionary:

```python
message_friends(user1)
```

Karena decorator harus dapat menerima argument tersebut, gunakan:

```python
*args
**kwargs
```

pada wrapper.

Kemudian periksa nilai `valid` dari user.

Secara konsep:

```text
message_friends(user1)
        ↓
    authenticated
        ↓
      wrapper
        ↓
  user valid?
     ↙     ↘
   True    False
    ↓        ↓
function   "invalid user"
dijalankan
```

## Solusi

```python
user1 = {
    "name": "Sorna",
    "valid": True
}


def authenticated(fn):

    def wrapper(*args, **kwargs):
        if args[0]["valid"]:
            return fn(*args, **kwargs)
        else:
            return print("invalid user")

    return wrapper


@authenticated
def message_friends(user):
    print("message has been sent")


message_friends(user1)
```

## Penjelasan Solusi

Decorator menerima function melalui parameter:

```python
def authenticated(fn):
```

Kemudian dibuat wrapper:

```python
def wrapper(*args, **kwargs):
```

Penggunaan `*args` dan `**kwargs` memungkinkan wrapper menerima argument dari function yang didekorasi.

Pada saat:

```python
message_friends(user1)
```

dictionary `user1` masuk ke dalam `args`.

Karena `user1` merupakan argument pertama, kita dapat mengaksesnya melalui:

```python
args[0]
```

Kemudian nilai `valid` diperiksa:

```python
if args[0]["valid"]:
```

Jika bernilai `True`, function asli dijalankan:

```python
return fn(*args, **kwargs)
```

Jika bernilai `False`, function asli tidak dijalankan dan program menampilkan:

```python
print("invalid user")
```

## Menguji User Valid

Dengan:

```python
user1 = {
    "name": "Sorna",
    "valid": True
}
```

ketika menjalankan:

```python
message_friends(user1)
```

hasilnya:

```text
message has been sent
```

## Menguji User Tidak Valid

Ubah nilai `valid` menjadi:

```python
user1 = {
    "name": "Sorna",
    "valid": False
}
```

Kemudian:

```python
message_friends(user1)
```

hasilnya:

```text
invalid user
```

Function:

```python
print("message has been sent")
```

tidak dijalankan karena user tidak memiliki status valid.

## Poin Pembelajaran

Latihan ini menggabungkan beberapa konsep decorator yang telah dipelajari:

- Function sebagai **First-Class Citizen**.
- **Higher-Order Function**.
- Custom decorator.
- Wrapper function.
- `*args` dan `**kwargs`.
- Mengakses argument dari wrapper.
- Kondisi untuk menentukan apakah function asli dijalankan.
- Menggunakan decorator untuk **authentication atau authorization sederhana**.

Pola yang digunakan dapat digambarkan sebagai:

```text
@authenticated
       ↓
message_friends()
       ↓
    wrapper()
       ↓
periksa user["valid"]
       ↓
   ┌───┴───┐
   ↓       ↓
 True    False
   ↓       ↓
fn()    invalid user
```

Latihan ini menunjukkan salah satu penggunaan nyata decorator, yaitu **mencegah sebuah function dijalankan apabila kondisi tertentu tidak terpenuhi**.