---
sidebar_position: 5
title: "Raise"
---

Pada materi sebelumnya, kita telah mempelajari bagaimana menangani exception menggunakan `try`, `except`, `else`, dan `finally`.

Namun, dalam beberapa kondisi, programmer justru perlu **memicu exception secara sengaja** ketika menemukan kondisi yang tidak sesuai dengan aturan program.

Python menyediakan keyword `raise` untuk kebutuhan tersebut.

## Menggunakan `raise`

Keyword `raise` digunakan untuk **memicu atau melempar exception secara manual**.

Dengan `raise`, programmer dapat menentukan kapan sebuah exception harus terjadi berdasarkan logika program yang dibuat.

Contoh sederhana:

```python
raise ValueError("Terjadi kesalahan!")
```

Ketika kode tersebut dijalankan, Python akan menghasilkan:

```text
ValueError: Terjadi kesalahan!
```

Pesan yang diberikan di dalam exception dapat digunakan untuk menjelaskan penyebab terjadinya masalah.

## Memberikan Pesan Custom

Kita dapat memberikan pesan sendiri ketika melakukan `raise`.

Contohnya:

```python
raise ValueError("Data yang diberikan tidak valid.")
```

Pesan tersebut dapat membantu developer maupun pengguna memahami alasan exception tersebut terjadi.

Contoh lainnya:

```python
raise Exception("Terjadi kesalahan kritis pada sistem!")
```

Pada contoh tersebut, programmer secara sengaja memicu exception umum menggunakan `Exception`.

## `raise` dan `try-except`

`raise` juga dapat digunakan di dalam blok `try`.

Contohnya:

```python
while True:
    try:
        age = int(input("Berapa umur Anda? "))
        10 / age

        raise ValueError("Harap hentikan eksekusi, terjadi kesalahan!")

    except ZeroDivisionError:
        print("Harap masukkan angka yang lebih besar dari 0.")

    finally:
        print("Selesai menjalankan iterasi.")
```

Ketika program mencapai:

```python
raise ValueError("Harap hentikan eksekusi, terjadi kesalahan!")
```

Python secara sengaja menghasilkan `ValueError`.

Namun, pada contoh tersebut tidak terdapat `except ValueError`.

Akibatnya, `ValueError` tersebut tidak ditangani oleh blok `except` yang tersedia.

Blok `finally` tetap dijalankan sebelum exception diteruskan.

## Mengapa Memicu Error Secara Sengaja?

Pada awalnya, memicu error secara sengaja mungkin terlihat bertentangan dengan tujuan Error Handling.

Namun, `raise` memiliki fungsi penting.

Program terkadang menemukan kondisi yang **tidak boleh dilanjutkan**.

Daripada membiarkan program melanjutkan proses dengan data atau kondisi yang tidak valid, programmer dapat menghentikan proses tersebut dengan exception yang sesuai.

Contoh konsepnya:

```text
Data masuk
    ↓
Validasi
    ↓
Data valid?
   ↙      ↘
Tidak      Ya
 ↓          ↓
raise     lanjutkan
 ↓
exception
```

Dengan demikian, `raise` dapat menjadi bagian dari mekanisme validasi dan pengendalian alur program.

## Kapan Menggunakan `raise`?

`raise` dapat digunakan ketika programmer ingin memberikan sinyal bahwa suatu kondisi tidak dapat diterima oleh program.

Beberapa situasi yang dapat menggunakan pendekatan ini antara lain:

### Validasi Data

Ketika sebuah function menerima data yang tidak memenuhi aturan tertentu, function dapat memicu exception.

Contoh:

```python
def set_age(age):
    if age < 0:
        raise ValueError("Umur tidak boleh negatif.")

    print(f"Umur: {age}")
```

Jika diberikan nilai yang tidak valid:

```python
set_age(-5)
```

program akan menghasilkan `ValueError`.

### Membuat Library atau Tools

Ketika membuat library atau tools sendiri, `raise` dapat digunakan untuk memberi tahu pengguna bahwa input yang diberikan tidak memenuhi aturan yang diperlukan.

Contohnya:

```python
def calculate_discount(price):
    if price < 0:
        raise ValueError("Harga tidak boleh negatif.")

    return price * 0.9
```

Dengan demikian, library tidak diam-diam memproses data yang tidak valid.

## `raise` Bukan Pengganti `try-except`

`raise` dan `try-except` memiliki fungsi yang berbeda.

`raise` digunakan untuk **memicu exception**.

```python
raise ValueError("Data tidak valid.")
```

Sedangkan `try-except` digunakan untuk **menangani exception**.

```python
try:
    ...
except ValueError:
    ...
```

Keduanya dapat digunakan bersama:

```text
raise
  ↓
memicu exception
  ↓
exception
  ↓
try-except
  ↓
menangani exception
```

Contoh:

```python
def check_age(age):
    if age < 0:
        raise ValueError("Umur tidak valid.")

    return age


try:
    check_age(-5)

except ValueError as err:
    print(err)
```

Output:

```text
Umur tidak valid.
```

Pada contoh tersebut:

1. `check_age()` mendeteksi kondisi yang tidak valid.
2. `raise` memicu `ValueError`.
3. `try-except` menangkap `ValueError`.
4. Pesan exception ditampilkan.

## Jenis Exception yang Dapat Di-`raise`

Kita dapat menggunakan berbagai jenis exception yang tersedia di Python.

Contohnya:

```python
raise ValueError("Nilai tidak valid.")
```

atau:

```python
raise TypeError("Tipe data tidak sesuai.")
```

atau:

```python
raise Exception("Terjadi kesalahan.")
```

Pemilihan jenis exception sebaiknya disesuaikan dengan kondisi yang ingin ditunjukkan.

Misalnya:

- `ValueError` untuk nilai yang tidak valid.
- `TypeError` untuk tipe data yang tidak sesuai.
- Exception lain yang lebih spesifik sesuai dengan kondisi yang terjadi.

## Peran `raise` dalam Error Handling

Sampai tahap ini, Error Handling Python dapat dipahami melalui beberapa mekanisme:

```text
try
 ↓
Menjalankan kode
 ↓
exception terjadi
 ↓
except
 ↓
Menangani exception
```

Sedangkan `raise` memungkinkan programmer menentukan sendiri kapan exception harus terjadi:

```text
Program
   ↓
Validasi kondisi
   ↓
Kondisi tidak valid
   ↓
raise
   ↓
Exception
   ↓
ditangani oleh try-except
```

Hal ini memberikan kontrol yang lebih besar terhadap aturan dan alur program.

## Error Tidak Selalu Harus Disembunyikan

Salah satu hal penting dalam Error Handling adalah memahami bahwa **menangani error tidak selalu berarti mencegah exception muncul**.

Ada kondisi ketika exception memang perlu dibuat agar program mengetahui bahwa suatu aturan telah dilanggar.

Contohnya:

```python
if age < 0:
    raise ValueError("Umur tidak boleh negatif.")
```

Dalam kasus tersebut, exception digunakan sebagai cara untuk memberikan sinyal bahwa data yang diberikan tidak dapat diterima.

## Kesimpulan

Keyword `raise` digunakan untuk **memicu exception secara sengaja** dari dalam program.

Contoh dasarnya:

```python
raise ValueError("Data tidak valid.")
```

`raise` berguna ketika programmer ingin:

- Menghentikan proses yang tidak valid.
- Melakukan validasi terhadap data.
- Memberikan pesan error yang lebih jelas.
- Membuat library atau function yang memiliki aturan input tertentu.
- Mengontrol alur program ketika kondisi tertentu terjadi.

Perbedaan utama yang perlu diingat:

```text
raise
→ Memicu exception

try-except
→ Menangani exception
```

Dengan memahami `raise`, kita tidak hanya dapat **menangani exception yang dibuat oleh Python**, tetapi juga dapat **membuat program memicu exception berdasarkan aturan yang kita tentukan sendiri**.

Pada materi berikutnya, konsep ini dapat dikembangkan menjadi **Custom Exception**, yaitu membuat jenis exception sendiri untuk kebutuhan aplikasi tertentu.