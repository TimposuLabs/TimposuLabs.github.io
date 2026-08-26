---
sidebar_position: 4
title: "Finally"
---

Blok `finally` merupakan bagian dari struktur error handling yang digunakan untuk menjalankan kode yang **selalu dieksekusi pada akhir proses `try-except`**, baik ketika terjadi exception maupun ketika proses berjalan tanpa error.

Struktur ini biasanya digunakan ketika terdapat kode yang harus tetap dijalankan setelah suatu proses selesai.

Secara sederhana:

```text
try
 ↓
Terjadi error?
 ├── Ya → except
 └── Tidak → else
              ↓
           finally
              ↓
          proses selesai
```

## Kegunaan `finally`

Blok `finally` sangat berguna untuk melakukan proses yang harus tetap dijalankan, terutama **cleanup operation** atau pencatatan aktivitas.

Beberapa contoh penggunaannya:

- Mengakhiri koneksi ke database atau server.
- Menutup file yang telah dibuka.
- Membersihkan resource yang digunakan program.
- Memastikan aktivitas tertentu tetap tercatat dalam log.
- Menjalankan proses akhir setelah operasi berhasil maupun gagal.

Dengan demikian, `finally` dapat digunakan ketika sebuah proses harus melakukan tindakan tertentu tanpa bergantung pada apakah terjadi exception atau tidak.

## Struktur Dasar `finally`

Struktur sederhananya:

```python
try:
    # kode yang berpotensi menghasilkan exception

except SomeException:
    # menangani exception

finally:
    # selalu dijalankan
```

Blok `finally` akan dijalankan setelah proses pada `try` atau `except` selesai.

## Contoh `try`, `except`, `else`, dan `finally`

Berikut contoh penggunaan `finally` bersama struktur error handling yang telah dipelajari sebelumnya:

```python
while True:
    try:
        age = int(input("Berapa umur Anda? "))
        10 / age

    except (ValueError, ZeroDivisionError):
        print("Input tidak valid!")

    else:
        print("Terima kasih!")
        break

    finally:
        print("Selesai menjalankan blok try-except.")
```

Pada contoh tersebut, `finally` akan dijalankan pada setiap proses `try-except`.

Jika pengguna memasukkan nilai yang tidak valid:

```text
Input tidak valid!
Selesai menjalankan blok try-except.
```

Program kemudian kembali ke iterasi berikutnya.

Jika pengguna memasukkan nilai yang valid:

```text
Terima kasih!
Selesai menjalankan blok try-except.
```

Kemudian `break` menghentikan perulangan.

## `finally` dan `break`

Blok `finally` tetap dijalankan meskipun terdapat `break` yang menyebabkan perulangan dihentikan.

Contohnya:

```python
while True:
    try:
        age = int(input("Berapa umur Anda? "))

    except ValueError:
        print("Input tidak valid!")

    else:
        print("Input berhasil!")
        break

    finally:
        print("Finally dijalankan.")
```

Ketika input valid, program menjalankan:

```python
break
```

Namun sebelum benar-benar keluar dari perulangan, blok `finally` tetap dijalankan.

Alurnya:

```text
try berhasil
    ↓
else
    ↓
break
    ↓
finally
    ↓
keluar dari loop
```

## `finally` dan `continue`

`finally` juga tetap dijalankan ketika program menggunakan `continue`.

Contohnya:

```python
while True:
    try:
        age = int(input("Berapa umur Anda? "))

    except ValueError:
        print("Input tidak valid!")
        continue

    finally:
        print("Finally dijalankan.")
```

Jika terjadi `ValueError`, blok `except` dijalankan dan kemudian terdapat:

```python
continue
```

Sebelum program melanjutkan ke iterasi berikutnya, blok `finally` tetap dijalankan.

Alurnya:

```text
try
 ↓
exception
 ↓
except
 ↓
continue
 ↓
finally
 ↓
iterasi berikutnya
```

Hal ini menunjukkan bahwa `finally` tetap menjadi bagian dari proses penyelesaian blok `try-except`.

## `finally` dan `return`

Blok `finally` juga memiliki hubungan penting dengan `return`.

Contohnya:

```python
def example():
    try:
        return "try"

    finally:
        print("Finally dijalankan.")


result = example()

print(result)
```

Output:

```text
Finally dijalankan.
try
```

Meskipun `return` digunakan di dalam `try`, Python tetap menjalankan `finally` sebelum function benar-benar mengembalikan hasilnya.

Secara sederhana:

```text
try
 ↓
return
 ↓
finally
 ↓
mengembalikan hasil
```

## `finally` untuk Cleanup

Salah satu penggunaan utama `finally` adalah memastikan resource dibersihkan setelah digunakan.

Misalnya, sebuah program membuka file untuk melakukan suatu proses.

Secara konsep:

```text
Buka resource
     ↓
Gunakan resource
     ↓
Terjadi error?
 ┌───┴────┐
 Ya      Tidak
 ↓         ↓
Tangani   lanjut
 └────┬────┘
      ↓
   finally
      ↓
Tutup resource
```

Dengan pola tersebut, proses cleanup dapat ditempatkan pada `finally`.

## Perbedaan `else` dan `finally`

`else` dan `finally` memiliki tujuan yang berbeda.

### `else`

`else` hanya dijalankan **jika tidak terjadi exception** pada `try`.

```text
try
 ↓
Error?
 ├── Ya → except
 └── Tidak → else
```

### `finally`

`finally` digunakan untuk kode yang harus dijalankan **setelah proses `try-except`**, terlepas dari apakah terjadi exception atau tidak.

```text
try
 ↓
 ┌───────────┐
 │           │
 ↓           ↓
except      else
 │           │
 └─────┬─────┘
       ↓
    finally
```

Perbandingannya:

| Blok | Kapan dijalankan? |
| --- | --- |
| `try` | Menjalankan kode yang berpotensi menghasilkan exception |
| `except` | Ketika exception yang sesuai terjadi |
| `else` | Ketika tidak terjadi exception |
| `finally` | Tetap dijalankan setelah proses `try-except` |

## Contoh Alur Lengkap

Struktur lengkap dapat digambarkan sebagai berikut:

```python
try:
    # proses utama

except SomeException:
    # menangani error

else:
    # dijalankan jika tidak ada error

finally:
    # selalu dijalankan
```

Alur eksekusinya:

```text
             try
              ↓
        Terjadi exception?
          ↙          ↘
        Ya            Tidak
        ↓               ↓
     except           else
        ↘               ↙
             finally
                ↓
          proses selesai
```

## Poin Penting

Beberapa hal penting yang perlu diingat:

- `finally` digunakan untuk kode yang perlu dijalankan pada tahap akhir.
- `finally` tetap dijalankan ketika terjadi exception.
- `finally` tetap dijalankan ketika tidak terjadi exception.
- `finally` tetap dijalankan sebelum `break` benar-benar menghentikan perulangan.
- `finally` tetap dijalankan sebelum `continue` melanjutkan ke iterasi berikutnya.
- `finally` juga tetap dijalankan sebelum `return` menyelesaikan function.
- `finally` sangat berguna untuk proses **cleanup** dan pengelolaan resource.

## Kesimpulan

Blok `finally` melengkapi struktur error handling Python dengan menyediakan tempat untuk menjalankan kode yang perlu dilakukan pada tahap akhir suatu proses.

Jika `except` berfokus pada **penanganan exception** dan `else` berfokus pada **proses ketika tidak terjadi exception**, maka `finally` berfokus pada **proses yang harus tetap dijalankan setelahnya**.

Struktur lengkap error handling yang telah dipelajari adalah:

```text
try
 ↓
except
 ↓
else
 ↓
finally
```

Pemahaman terhadap `finally` menjadi dasar penting sebelum melanjutkan ke pembahasan berikutnya seperti **`raise` dan pembuatan custom exception**.