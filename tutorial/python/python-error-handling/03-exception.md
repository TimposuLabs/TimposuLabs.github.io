---
sidebar_position: 3
title: "Exception"
---

Pada materi sebelumnya, kita telah mempelajari penggunaan `try`, `except`, dan `else` untuk menangani exception.

Selanjutnya, kita akan mempelajari cara menangani exception dengan lebih spesifik, mendapatkan informasi dari exception yang terjadi, serta menangani beberapa jenis exception dengan satu blok `except`.

## Menentukan Jenis Exception

Saat menggunakan `except`, sebaiknya tentukan jenis exception yang ingin ditangani.

Contohnya:

```python
def sum(num1, num2):
    try:
        return num1 + num2
    except TypeError:
        print("Please enter numbers.")
```

Pada contoh tersebut, hanya `TypeError` yang akan ditangani.

Jika terjadi jenis exception lain, exception tersebut tidak akan ditangkap oleh blok:

```python
except TypeError:
```

Pendekatan ini lebih baik daripada menggunakan `except` tanpa menentukan jenis exception.

## Mengapa Exception Perlu Ditentukan?

Menggunakan exception secara spesifik membuat kode lebih mudah dipahami dan membantu developer mengetahui kondisi apa yang memang ingin ditangani.

Contohnya:

```python
try:
    # kode
except TypeError:
    # menangani TypeError
```

menunjukkan dengan jelas bahwa program memang mengantisipasi `TypeError`.

Sebaliknya, penggunaan:

```python
try:
    # kode
except:
    # menangani semua exception
```

dapat membuat program menangkap exception yang sebenarnya tidak dimaksudkan untuk ditangani.

Karena itu, sebisa mungkin gunakan jenis exception yang spesifik.

## Menangkap Objek Exception dengan `as`

Selain menentukan jenis exception, Python memungkinkan kita mendapatkan object exception yang terjadi menggunakan keyword `as`.

Contohnya:

```python
def sum(num1, num2):
    try:
        return num1 + num2

    except TypeError as err:
        print(f"Please enter numbers: {err}")
```

Pada bagian:

```python
except TypeError as err:
```

`err` merupakan variable yang berisi object exception yang ditangkap.

Object tersebut dapat digunakan untuk mendapatkan informasi mengenai error yang terjadi.

## Melihat Pesan Exception

Dengan menggunakan `err`, kita dapat menampilkan pesan error yang diberikan Python.

Contohnya:

```python
def sum(num1, num2):
    try:
        return num1 + num2

    except TypeError as err:
        print(f"Please enter numbers: {err}")
```

Ketika function menerima argument dengan tipe yang tidak sesuai, Python menghasilkan pesan `TypeError`.

Pesan tersebut kemudian dapat diakses melalui:

```python
err
```

dan ditampilkan menggunakan f-string:

```python
print(f"Please enter numbers: {err}")
```

Dengan demikian, program tidak hanya mengetahui bahwa `TypeError` terjadi, tetapi juga dapat memperoleh informasi mengenai detail exception tersebut.

## Menangani Beberapa Exception

Terkadang beberapa jenis exception membutuhkan respons atau penanganan yang sama.

Daripada membuat beberapa blok `except`, Python memungkinkan beberapa exception digabungkan dalam satu blok.

Contohnya:

```python
def divide(num1, num2):
    try:
        return num1 / num2

    except (TypeError, ZeroDivisionError) as err:
        print(f"Oops! {err}")
```

Pada contoh tersebut, satu blok `except` dapat menangani:

```python
TypeError
```

dan:

```python
ZeroDivisionError
```

## Contoh Penggunaan

Function berikut digunakan untuk melakukan pembagian:

```python
def divide(num1, num2):
    try:
        return num1 / num2

    except (TypeError, ZeroDivisionError) as err:
        print(f"Oops! {err}")
```

Jika diberikan:

```python
divide(1, "2")
```

akan terjadi `TypeError`.

Exception tersebut akan ditangkap oleh:

```python
except (TypeError, ZeroDivisionError) as err:
```

Sedangkan jika diberikan:

```python
divide(1, 0)
```

akan terjadi `ZeroDivisionError`.

Exception tersebut juga akan ditangani oleh blok `except` yang sama.

## Kapan Menggabungkan Exception?

Menggabungkan beberapa exception cocok digunakan ketika beberapa jenis error membutuhkan **respons yang sama**.

Contohnya:

```python
except (TypeError, ZeroDivisionError) as err:
    print(f"Oops! {err}")
```

Kedua exception tersebut memiliki penanganan yang sama sehingga dapat ditempatkan dalam satu blok.

Namun, jika masing-masing exception membutuhkan respons berbeda, sebaiknya gunakan blok `except` yang terpisah.

Contohnya:

```python
try:
    result = num1 / num2

except TypeError:
    print("Input harus berupa angka.")

except ZeroDivisionError:
    print("Angka tidak boleh dibagi dengan nol.")
```

Dengan cara tersebut, program dapat memberikan pesan yang lebih spesifik untuk setiap kondisi.

## Best Practice Error Handling

Beberapa prinsip penting yang perlu diperhatikan:

### Gunakan Exception yang Spesifik

Sebaiknya tentukan jenis exception yang ingin ditangani:

```python
except TypeError:
```

daripada menangkap semua exception secara umum:

```python
except:
```

Hal ini membuat tujuan error handling lebih jelas.

### Gunakan `as` Jika Membutuhkan Detail Error

Jika informasi dari exception diperlukan, gunakan:

```python
except TypeError as err:
```

Kemudian object `err` dapat digunakan untuk mendapatkan pesan exception.

### Gabungkan Exception Jika Penanganannya Sama

Jika beberapa exception memiliki penanganan yang sama, gunakan:

```python
except (TypeError, ZeroDivisionError) as err:
```

Namun, jika responsnya berbeda, gunakan blok `except` yang terpisah.

## Kesimpulan

Python menyediakan beberapa cara untuk membuat error handling lebih terkontrol.

Pertama, kita dapat menentukan jenis exception secara spesifik:

```python
except TypeError:
```

Kedua, kita dapat menangkap object exception menggunakan `as`:

```python
except TypeError as err:
```

Ketiga, beberapa exception dapat ditangani menggunakan satu blok `except` jika memiliki penanganan yang sama:

```python
except (TypeError, ZeroDivisionError) as err:
```

Dengan memahami ketiga teknik tersebut, error handling menjadi lebih jelas, terkontrol, dan mudah dipelihara.

Pada materi berikutnya, pembahasan dapat dilanjutkan dengan **`finally` dan `raise`**, yang digunakan untuk kebutuhan error handling yang lebih lanjut.