---
sidebar_position: 2
title: "Read, Write, Append"
---

## Membaca File dengan Statement `with`

Pada materi sebelumnya, file dibuka menggunakan `open()` dan kemudian ditutup secara manual menggunakan `close()`.

Cara tersebut dapat menimbulkan masalah jika program lupa menutup file. Python menyediakan cara yang lebih aman dan standar menggunakan statement `with`.

Pola yang umum digunakan adalah:

```python
with open("test.txt") as my_file:
    print(my_file.readlines())
```

Dengan menggunakan `with`, Python akan menangani proses penutupan file secara otomatis setelah blok kode selesai dijalankan.

### Mengapa Menggunakan `with`?

Tanpa `with`, kita perlu menutup file secara manual:

```python
my_file = open("test.txt")

print(my_file.readlines())

my_file.close()
```

Dengan `with`, kita tidak perlu memanggil `close()` secara manual:

```python
with open("test.txt") as my_file:
    print(my_file.readlines())
```

Pendekatan `with open()` merupakan **standard pattern** yang umum digunakan ketika bekerja dengan file di Python.

---

## Mode Akses File

Fungsi `open()` memiliki parameter `mode` yang menentukan operasi yang dapat dilakukan terhadap file.

Sintaks dasarnya:

```python
open("nama_file", mode="mode")
```

Secara default, Python menggunakan:

```python
mode="r"
```

Mode tersebut berarti file dibuka untuk **dibaca**.

Beberapa mode utama yang perlu dipahami:

| Mode | Nama | Fungsi |
|---|---|---|
| `r` | Read | Membaca file |
| `r+` | Read & Write | Membaca dan menulis file |
| `w` | Write | Menulis dan menimpa isi file |
| `a` | Append | Menambahkan data di akhir file |

---

## Mode `r` - Read

Mode `r` digunakan untuk membaca file.

Mode ini merupakan mode default dari `open()`.

Contoh:

```python
with open("test.txt", mode="r") as my_file:
    print(my_file.read())
```

Karena `r` merupakan mode default, kode berikut juga dapat digunakan:

```python
with open("test.txt") as my_file:
    print(my_file.read())
```

Mode `r` hanya digunakan untuk membaca isi file.

Jika file yang ingin dibuka tidak ditemukan, Python akan menghasilkan `FileNotFoundError`.

Contoh:

```python
with open("file-yang-tidak-ada.txt", mode="r") as my_file:
    print(my_file.read())
```

---

## Mode `r+` - Read and Write

Mode `r+` memungkinkan file untuk **dibaca dan ditulis**.

Contoh:

```python
with open("test.txt", mode="r+") as my_file:
    print(my_file.read())
```

Mode `r+` dapat digunakan untuk membaca sekaligus menulis ke file.

Hal yang perlu diperhatikan adalah posisi **file cursor**.

Ketika file dibuka dengan `r+`, cursor berada di posisi awal file.

Misalnya isi file:

```text
Hello Python
```

Kemudian:

```python
with open("test.txt", mode="r+") as my_file:
    my_file.write("Hi")
```

Penulisan dimulai dari posisi cursor saat ini sehingga data baru dapat **menimpa karakter yang sudah ada**.

Hasilnya dapat menjadi:

```text
Hi llo Python
```

Karena itu, penggunaan `r+` perlu memperhatikan posisi cursor agar tidak secara tidak sengaja menimpa data yang sudah ada.

---

## Mode `w` - Write

Mode `w` digunakan untuk menulis data ke file.

Contoh:

```python
with open("sad.txt", mode="w") as my_file:
    my_file.write(":(")
```

Jika `sad.txt` belum ada, Python akan membuat file tersebut secara otomatis.

Namun, jika file sudah ada, isi file sebelumnya akan **dihapus atau ditimpa**.

Misalnya isi awal file:

```text
Hello Python
This is an old text.
```

Kemudian program dijalankan:

```python
with open("sad.txt", mode="w") as my_file:
    my_file.write(":(")
```

Isi file akan menjadi:

```text
:(
```

Data sebelumnya tidak dipertahankan.

### Kapan Menggunakan Mode `w`?

Mode `w` cocok ketika:

- Membuat file baru.
- Mengganti seluruh isi file.
- Menulis ulang hasil pemrosesan.
- Tidak membutuhkan data lama di dalam file.

Perlu berhati-hati menggunakan mode `w` karena file yang sudah ada akan ditimpa.

---

## Mode `a` - Append

Mode `a` digunakan untuk **menambahkan data ke bagian akhir file**.

Contoh:

```python
with open("test.txt", mode="a") as my_file:
    my_file.write(" :)")
```

Jika sebelumnya file berisi:

```text
Hello Python
```

Setelah program dijalankan, isi file menjadi:

```text
Hello Python :)
```

Data sebelumnya tetap dipertahankan.

Mode `a` menempatkan posisi cursor di bagian akhir file sehingga data baru ditambahkan setelah data yang sudah ada.

---

## Menambahkan Baris Baru dengan Mode `a`

Jika ingin menambahkan data pada baris baru, gunakan karakter newline `\n`.

Contoh:

```python
with open("test.txt", mode="a") as my_file:
    my_file.write("\nData tambahan")
```

Jika sebelumnya file berisi:

```text
Data lama
```

Hasilnya menjadi:

```text
Data lama
Data tambahan
```

---

## Contoh Penggunaan Mode `a`

Misalnya terdapat file `test.txt`:

```text
Nama: Andre
Status: Belajar Python
```

Kemudian kita ingin menambahkan informasi baru tanpa menghapus data sebelumnya:

```python
with open("test.txt", mode="a") as my_file:
    my_file.write("\nMateri: File I/O")
```

Hasil file:

```text
Nama: Andre
Status: Belajar Python
Materi: File I/O
```

Mode `a` sangat berguna untuk data yang sifatnya terus bertambah, seperti log atau catatan.

---

## Perbandingan `r+` dan `a`

Kedua mode tersebut dapat digunakan untuk operasi yang melibatkan penulisan, tetapi memiliki perilaku yang berbeda.

### `r+`

```python
with open("test.txt", mode="r+") as my_file:
    my_file.write("Hello")
```

Penulisan dimulai dari posisi cursor.

Karena cursor berada di awal ketika file dibuka, data yang sudah ada dapat tertimpa.

### `a`

```python
with open("test.txt", mode="a") as my_file:
    my_file.write("Hello")
```

Data baru ditambahkan ke bagian akhir file.

Oleh karena itu:

- Gunakan `r+` ketika memang ingin membaca dan menulis pada file serta mengontrol posisi cursor.
- Gunakan `a` ketika ingin menambahkan data baru tanpa menghapus data sebelumnya.

---

## File yang Tidak Ditemukan

Perilaku Python terhadap file yang belum ada berbeda berdasarkan mode yang digunakan.

### Mode `r`

Jika file tidak ada:

```python
with open("data.txt", mode="r") as my_file:
    print(my_file.read())
```

Python akan menghasilkan:

```text
FileNotFoundError
```

### Mode `r+`

Mode `r+` juga membutuhkan file yang sudah ada.

Jika file tidak ditemukan, Python akan menghasilkan:

```text
FileNotFoundError
```

### Mode `w`

Jika file belum ada:

```python
with open("data.txt", mode="w") as my_file:
    my_file.write("Hello")
```

Python akan membuat file baru.

### Mode `a`

Jika file belum ada:

```python
with open("data.txt", mode="a") as my_file:
    my_file.write("Hello")
```

Python juga akan membuat file baru.

---

## Ringkasan Mode File

| Mode | Membaca | Menulis | Jika File Ada | Jika File Tidak Ada |
|---|---:|---:|---|---|
| `r` | Ya | Tidak | Membaca file | `FileNotFoundError` |
| `r+` | Ya | Ya | Membaca dan menulis | `FileNotFoundError` |
| `w` | Tidak | Ya | Menimpa isi file | Membuat file baru |
| `a` | Tidak | Ya | Menambahkan di akhir | Membuat file baru |

---

## Pola Penggunaan yang Aman

Ketika bekerja dengan file, gunakan `with open()` agar file ditutup secara otomatis.

Contoh membaca file:

```python
with open("test.txt", mode="r") as my_file:
    content = my_file.read()

print(content)
```

Contoh menulis file:

```python
with open("test.txt", mode="w") as my_file:
    my_file.write("Hello Python")
```

Contoh menambahkan data:

```python
with open("test.txt", mode="a") as my_file:
    my_file.write("\nBelajar File I/O")
```

Dengan pola tersebut, kita tidak perlu menulis:

```python
my_file.close()
```

karena pengelolaan file dilakukan oleh context manager `with`.

---

## Ringkasan

Konsep penting pada materi **Read, Write, Append**:

- `with open()` merupakan pola standar untuk bekerja dengan file secara aman.
- `with` akan memastikan file ditutup setelah blok kode selesai.
- `r` digunakan untuk membaca file.
- `r+` digunakan untuk membaca dan menulis file.
- `w` digunakan untuk menulis dan akan menimpa isi file jika file sudah ada.
- `a` digunakan untuk menambahkan data ke akhir file.
- Mode `r` dan `r+` akan menghasilkan `FileNotFoundError` jika file tidak ditemukan.
- Mode `w` dan `a` dapat membuat file baru jika file belum tersedia.
- Gunakan `a` ketika ingin menambahkan data tanpa menghapus data sebelumnya.
- Berhati-hatilah menggunakan `w` karena isi file yang sudah ada akan ditimpa.
