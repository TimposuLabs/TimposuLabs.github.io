---
sidebar_position: 23
title: "Docstrings"
---

**Docstring** atau *Documentation String* adalah string khusus yang digunakan untuk memberikan dokumentasi atau penjelasan mengenai sebuah function, class, atau module.

Docstring membantu menjelaskan **apa yang dilakukan oleh sebuah function**, parameter yang digunakan, dan informasi lain yang diperlukan oleh developer.

Dengan adanya docstring, developer tidak selalu harus membaca seluruh isi function untuk memahami tujuan function tersebut.

---

## Pengertian Docstring

Docstring merupakan string yang ditempatkan pada **baris pertama di dalam blok function**.

Contoh:

```python
def say_hello():
    """
    Menampilkan pesan Hello kepada pengguna.
    """
    print('Hello')
```

Pada contoh tersebut, teks dokumentasi di dalam triple quotes merupakan docstring dari function `say_hello()`.

---

## Mengapa Docstring Penting?

Ketika sebuah program semakin besar, jumlah function yang digunakan juga akan semakin banyak.

Tanpa dokumentasi, developer mungkin harus membaca implementasi function untuk mengetahui:

- Apa tujuan function?
- Parameter apa yang dibutuhkan?
- Apa yang dikembalikan?
- Bagaimana function tersebut seharusnya digunakan?

Docstring dapat memberikan informasi tersebut secara langsung.

Contoh:

```python
def calculate_total(price, quantity):
    """
    Menghitung total harga berdasarkan harga produk
    dan jumlah produk.
    """
    return price * quantity
```

Developer dapat memahami tujuan function tanpa harus membaca seluruh implementasinya.

---

## Sintaks Docstring

Docstring biasanya ditulis menggunakan **triple quotes**.

Python menyediakan dua bentuk:

```python
"""
Docstring
"""
```

atau:

```python
'''
Docstring
'''
```

Contoh:

```python
def test(a):
    """
    Menerima parameter a dan menampilkannya ke layar.
    """
    print(a)
```

Triple quotes memungkinkan docstring ditulis dalam satu atau beberapa baris.

---

## Docstring Harus Berada di Awal Function

Agar dikenali sebagai docstring, string dokumentasi harus ditempatkan sebagai statement pertama di dalam function.

Contoh yang benar:

```python
def test(a):
    """
    Menampilkan nilai parameter a.
    """
    print(a)
```

Docstring berada tepat setelah deklarasi function.

---

## Docstring dengan Beberapa Baris

Docstring dapat digunakan untuk memberikan informasi yang lebih lengkap.

```python
def calculate_area(length, width):
    """
    Menghitung luas persegi panjang.

    Parameter:
        length: Panjang persegi panjang.
        width: Lebar persegi panjang.

    Return:
        Luas persegi panjang.
    """
    return length * width
```

Dengan dokumentasi seperti ini, developer dapat mengetahui tujuan function, parameter, dan hasil yang dikembalikan.

---

## Melihat Docstring dengan `help()`

Python menyediakan built-in function `help()` untuk melihat dokumentasi sebuah function.

Contoh:

```python
def test(a):
    """
    Menerima parameter a dan menampilkannya ke layar.
    """
    print(a)

help(test)
```

Python akan menampilkan informasi mengenai function tersebut beserta docstring yang telah dibuat.

Perhatikan bahwa kita menulis:

```python
help(test)
```

bukan:

```python
help(test())
```

Karena kita ingin memberikan object function kepada `help()` tanpa menjalankan function tersebut.

---

## Mengakses Docstring dengan `__doc__`

Docstring juga dapat diakses melalui atribut khusus `__doc__`.

Contoh:

```python
def test(a):
    """
    Menerima parameter a dan menampilkannya ke layar.
    """
    print(a)

print(test.__doc__)
```

Output:

```text
Menerima parameter a dan menampilkannya ke layar.
```

Atribut `__doc__` berisi dokumentasi yang ditulis pada function tersebut.

---

## Docstring pada Function dengan Return

Docstring juga sangat berguna untuk menjelaskan function yang menghasilkan nilai.

```python
def calculate_total(price, quantity):
    """
    Menghitung total harga produk.

    Parameter:
        price: Harga satu produk.
        quantity: Jumlah produk.

    Return:
        Total harga produk.
    """
    return price * quantity
```

Function tersebut memiliki dokumentasi yang menjelaskan:

- tujuan function;
- parameter yang dibutuhkan;
- nilai yang dikembalikan.

---

## Docstring dan Code Editor

Docstring juga membantu developer ketika bekerja menggunakan code editor atau IDE seperti VS Code dan PyCharm.

Ketika sebuah function memiliki docstring yang baik, editor dapat menampilkan informasi dokumentasi ketika function digunakan.

Contoh:

```python
def calculate_total(price, quantity):
    """
    Menghitung total harga berdasarkan harga
    dan jumlah produk.
    """
    return price * quantity
```

Ketika developer menggunakan function tersebut:

```python
calculate_total(50000, 3)
```

editor dapat memberikan informasi mengenai dokumentasi function tersebut.

Hal ini sangat membantu ketika menggunakan function yang dibuat oleh developer lain atau library pihak ketiga.

---

## Docstring vs Comment

Docstring dan comment sama-sama dapat digunakan untuk memberikan informasi, tetapi memiliki tujuan yang berbeda.

### Comment

Comment digunakan untuk memberikan catatan pada kode.

```python
# Menghitung total harga
total = price * quantity
```

Comment lebih ditujukan untuk menjelaskan bagian tertentu dari implementasi kode.

### Docstring

Docstring digunakan untuk mendokumentasikan function, class, atau module.

```python
def calculate_total(price, quantity):
    """
    Menghitung total harga produk.
    """
    return price * quantity
```

Docstring menjadi bagian dari informasi dokumentasi object tersebut dan dapat diakses menggunakan `help()` atau `__doc__`.

---

## Praktik Baik Menulis Docstring

Docstring sebaiknya:

- menjelaskan tujuan function;
- menggunakan bahasa yang jelas dan singkat;
- menjelaskan parameter jika diperlukan;
- menjelaskan nilai yang dikembalikan jika diperlukan;
- tidak menjelaskan sesuatu yang sudah sangat jelas tanpa memberikan informasi tambahan.

Contoh:

```python
def calculate_discount(price, percentage):
    """
    Menghitung harga setelah mendapatkan diskon.

    Parameter:
        price: Harga awal produk.
        percentage: Persentase diskon.

    Return:
        Harga akhir setelah diskon.
    """
    discount = price * percentage / 100
    return price - discount
```

---

## Kesimpulan

Docstring merupakan bagian penting dalam penulisan kode Python yang mudah dipahami dan dipelihara.

Beberapa hal utama yang perlu diingat:

1. **Docstring** digunakan untuk mendokumentasikan function, class, atau module.
2. Docstring biasanya ditulis menggunakan triple quotes `"""` atau `'''`.
3. Pada function, docstring harus berada di awal blok function.
4. Dokumentasi dapat dilihat menggunakan `help()`.
5. Docstring dapat diakses melalui atribut `__doc__`.
6. Docstring membantu developer memahami cara menggunakan function tanpa harus membaca seluruh implementasinya.
7. Function yang kompleks sebaiknya memiliki dokumentasi yang menjelaskan parameter dan nilai yang dikembalikan.