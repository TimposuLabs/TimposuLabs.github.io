---
sidebar_position: 4
title: "File I/O Errors"
---

## Pentingnya Error Handling pada File I/O

Saat melakukan operasi pembacaan atau penulisan berkas, berbagai error bisa terjadi di luar kendali program.

Contohnya:

- Berkas tidak ditemukan.
- Akses ke berkas ditolak.
- Izin pembacaan atau penulisan bermasalah.
- Terjadi masalah pada sistem komputer atau perangkat keras.

Untuk menangani kondisi tersebut, kita dapat menggunakan blok `try...except`.

Error handling membantu program agar tidak berhenti atau mengalami *crash* secara mendadak ketika terjadi masalah.

Contoh pola dasar:

```python
try:
    # Operasi File I/O
    pass
except Exception:
    # Menangani error
    pass
```

Dalam praktiknya, sebaiknya kita menangkap exception yang lebih spesifik sesuai dengan jenis error yang mungkin terjadi.

## Menangani `FileNotFoundError`

`FileNotFoundError` terjadi ketika Python mencoba membaca berkas yang tidak tersedia pada lokasi yang dituju.

Contoh:

```python
try:
    with open("sad.txt", mode="r") as my_file:
        print(my_file.read())
except FileNotFoundError as err:
    print("File tidak ditemukan!")
    raise err
```

Pada contoh tersebut, program mencoba membuka `sad.txt`.

Jika file tidak ditemukan, blok:

```python
except FileNotFoundError as err:
```

akan menangkap error tersebut.

Program kemudian menampilkan pesan:

```text
File tidak ditemukan!
```

### Menggunakan `raise`

Pada contoh sebelumnya terdapat:

```python
raise err
```

`raise` digunakan untuk melempar kembali exception yang telah ditangkap.

Penggunaan tersebut bersifat opsional.

Jika tujuan program hanya menampilkan pesan error dan melanjutkan eksekusi, exception tidak perlu dilempar kembali.

Contoh:

```python
try:
    with open("sad.txt", mode="r") as my_file:
        print(my_file.read())
except FileNotFoundError:
    print("File tidak ditemukan!")
```

Dengan cara tersebut, error ditangani tanpa melemparkannya kembali.

## Menangani `IOError`

`IOError` atau **Input/Output Error** berkaitan dengan masalah yang terjadi ketika program melakukan operasi input atau output.

Contohnya dapat berkaitan dengan masalah pada sistem komputer atau perangkat keras ketika melakukan operasi baca atau tulis file.

Contoh:

```python
try:
    with open("sad.txt", mode="r") as my_file:
        print(my_file.read())
except FileNotFoundError:
    print("File tidak ada di direktori.")
except IOError as err:
    print("Terjadi kesalahan pada operasi Input/Output mesin.")
    raise err
```

Pada contoh tersebut terdapat dua jenis exception yang ditangani.

Pertama:

```python
except FileNotFoundError:
```

digunakan untuk menangani kondisi ketika file tidak ditemukan.

Kedua:

```python
except IOError as err:
```

digunakan untuk menangani masalah pada operasi Input/Output.

## Menggunakan Beberapa `except`

Satu blok `try` dapat memiliki beberapa blok `except`.

Contoh:

```python
try:
    with open("sad.txt", mode="r") as my_file:
        print(my_file.read())
except FileNotFoundError:
    print("File tidak ada di direktori.")
except IOError:
    print("Terjadi kesalahan pada operasi Input/Output.")
```

Dengan pendekatan tersebut, program dapat memberikan respons yang berbeda berdasarkan jenis exception yang terjadi.

## Menangkap Exception Secara Spesifik

Sebaiknya gunakan exception yang spesifik daripada langsung menggunakan `except` umum.

Contoh yang lebih spesifik:

```python
try:
    with open("sad.txt", mode="r") as my_file:
        print(my_file.read())
except FileNotFoundError:
    print("File tidak ditemukan.")
except IOError:
    print("Terjadi kesalahan Input/Output.")
```

Pendekatan tersebut membuat kode lebih jelas karena setiap jenis error dapat diberikan penanganan yang sesuai.

Hindari penggunaan `except` umum jika tidak diperlukan:

```python
try:
    with open("sad.txt", mode="r") as my_file:
        print(my_file.read())
except:
    print("Terjadi error.")
```

Masalah dari pendekatan tersebut adalah semua jenis exception akan ditangkap tanpa membedakan penyebabnya.

## Respon yang Lebih Ramah kepada Pengguna

Error handling dapat digunakan untuk memberikan pesan yang lebih mudah dipahami pengguna.

Tanpa error handling, program dapat berhenti dengan pesan exception yang mungkin sulit dipahami pengguna.

Dengan error handling:

```python
try:
    with open("sad.txt", mode="r") as my_file:
        print(my_file.read())
except FileNotFoundError:
    print("File tidak ditemukan. Periksa kembali lokasi file.")
```

Pengguna mendapatkan informasi yang lebih jelas mengenai masalah yang terjadi.

## Fallback Logic

Selain menampilkan pesan error, program juga dapat menjalankan **fallback logic**, yaitu menjalankan alternatif ketika operasi utama gagal.

Contoh:

```python
try:
    with open("config.txt", mode="r") as my_file:
        config = my_file.read()
except FileNotFoundError:
    print("File konfigurasi tidak ditemukan.")
    config = "Default configuration"
```

Jika `config.txt` tidak ditemukan, program menggunakan konfigurasi default.

Dengan demikian, program tidak harus langsung berhenti ketika terjadi masalah.

## Contoh Program Lengkap

Berikut contoh sederhana penggunaan error handling pada File I/O:

```python
try:
    with open("data.txt", mode="r") as my_file:
        data = my_file.read()
        print(data)

except FileNotFoundError:
    print("File data.txt tidak ditemukan.")

except IOError as err:
    print("Terjadi kesalahan pada operasi Input/Output.")
    raise err
```

Alur program:

```text
Mencoba membuka file
        │
        ▼
     Berhasil?
      /     \
    Ya       Tidak
    │          │
    ▼          ▼
 Baca file   Cek jenis error
    │          │
    ▼          ├── FileNotFoundError
 Tampilkan     │
 data          └── IOError
```

## Poin Penting Error Handling File I/O

Beberapa hal penting yang perlu diperhatikan:

- Gunakan `try...except` untuk menangani error pada operasi File I/O.
- Gunakan exception yang spesifik seperti `FileNotFoundError`.
- `IOError` digunakan untuk menangani masalah yang berkaitan dengan operasi Input/Output.
- `raise` dapat digunakan untuk melempar kembali exception.
- Gunakan pesan error yang mudah dipahami pengguna.
- Error handling dapat digunakan untuk menjalankan *fallback logic*.
- Hindari penggunaan `except` umum jika exception yang lebih spesifik dapat digunakan.

## Ringkasan

File I/O dapat menghasilkan berbagai error ketika program melakukan operasi membaca atau menulis file.

Konsep utama yang perlu dipahami:

- `try` digunakan untuk menjalankan operasi yang berpotensi menghasilkan exception.
- `except` digunakan untuk menangani exception.
- `FileNotFoundError` terjadi ketika file yang ingin diakses tidak ditemukan.
- `IOError` berkaitan dengan masalah pada operasi Input/Output.
- `raise` dapat digunakan untuk melempar kembali exception.
- Menangkap exception secara spesifik membuat error handling lebih jelas.
- Error handling dapat memberikan pesan yang lebih ramah kepada pengguna.
- Program dapat menggunakan fallback logic ketika operasi File I/O gagal.
