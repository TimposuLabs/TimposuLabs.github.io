---
sidebar_position: 4
title: "Generator Performance"
---

## Performance dan Kekuatan Generator

Pada materi sebelumnya, kita telah mempelajari bahwa generator menghasilkan nilai secara bertahap menggunakan `yield`.

Salah satu alasan utama generator banyak digunakan adalah kemampuannya dalam menangani data berukuran besar tanpa harus membuat seluruh data tersebut tersedia di memory sekaligus.

Konsep ini menjadi semakin penting ketika program harus melakukan pemrosesan terhadap jutaan atau bahkan lebih banyak data.

## Generator vs List

Untuk memahami keuntungan generator, kita dapat membandingkannya dengan pendekatan menggunakan `list`.

### Menggunakan List

Ketika data dibuat menjadi `list`, seluruh elemen akan tersedia sekaligus di memory.

Secara sederhana:

```text
Data dalam jumlah besar
        ↓
Membuat seluruh data
        ↓
Menyimpan seluruh data di RAM
        ↓
Memproses data
```

Misalnya:

```python
def process_list(num):
    numbers = list(range(num))

    for number in numbers:
        number * 2
```

Pada pendekatan tersebut, `range()` terlebih dahulu dikonversi menjadi `list`.

Akibatnya, seluruh elemen harus disimpan di memory sebelum proses berikutnya dilakukan.

## Menggunakan Generator

Dengan generator, data dapat diproses satu per satu tanpa harus membuat seluruh sequence menjadi `list`.

Contohnya:

```python
def my_generator(num):
    for i in range(num):
        yield i * 5


for item in my_generator(1_000_000):
    pass
```

Nilai dihasilkan secara bertahap:

```text
Nilai 1
  ↓
Diproses
  ↓
Nilai 2
  ↓
Diproses
  ↓
Nilai 3
  ↓
Diproses
  ↓
 ...
```

Program tidak perlu membuat list berisi seluruh hasil sebelum proses dimulai.

## Efisiensi Penggunaan Memory

Perbedaan yang paling penting antara list dan generator terdapat pada penggunaan memory.

Dengan list:

```text
1.000.000 data
       ↓
Semua berada di memory
```

Sedangkan dengan generator:

```text
Data
 ↓
Ambil satu nilai
 ↓
Proses
 ↓
Ambil nilai berikutnya
 ↓
Proses
 ↓
...
```

Generator mempertahankan state proses dan menghasilkan nilai berikutnya ketika dibutuhkan.

Pendekatan ini sangat membantu ketika sequence yang diproses berukuran besar.

## Dampak pada Resource

Membuat list dengan jumlah elemen yang sangat besar dapat membutuhkan resource yang besar pula.

Jika jumlah data melebihi kapasitas memory yang tersedia, program dapat mengalami masalah seperti:

```text
Memory usage meningkat
        ↓
Resource tidak mencukupi
        ↓
Program dapat dihentikan
```

Pada kondisi ekstrem, proses dapat mengalami `crash` atau dihentikan oleh sistem.

Generator dapat mengurangi kebutuhan memory karena tidak perlu menyimpan seluruh sequence hasil sekaligus.

## Performance Generator

Selain penggunaan memory, generator juga dapat memberikan keuntungan pada alur pemrosesan.

Dengan generator, program dapat mulai memproses data segera setelah nilai pertama tersedia.

Sedangkan pendekatan yang membuat list terlebih dahulu memiliki tahap tambahan:

```text
Buat seluruh list
       ↓
Selesai membuat list
       ↓
Mulai memproses data
```

Generator:

```text
Hasilkan nilai pertama
       ↓
Langsung proses
       ↓
Hasilkan nilai berikutnya
       ↓
Langsung proses
```

Dengan demikian, generator cocok untuk proses yang memungkinkan data diproses secara bertahap.

## Perbandingan Konseptual

Perbandingan sederhana antara keduanya:

| Aspek | List | Generator |
| --- | --- | --- |
| Cara menghasilkan data | Seluruh data dibuat | Data dihasilkan bertahap |
| Penggunaan memory | Dapat besar | Lebih efisien untuk sequence besar |
| Pemrosesan | Setelah data tersedia | Dapat dimulai sejak nilai tersedia |
| Cocok untuk | Data kecil atau seluruh data dibutuhkan | Data besar atau pemrosesan bertahap |
| Penyimpanan hasil | Seluruh hasil dapat disimpan | Nilai dihasilkan ketika diperlukan |

## Contoh Generator untuk Data Besar

Generator dapat digunakan untuk menghasilkan data dalam jumlah besar.

```python
def my_generator(num):
    for i in range(num):
        yield i * 5


for item in my_generator(1_000_000):
    # Memproses item satu per satu
    pass
```

Meskipun generator digunakan untuk menghasilkan satu juta nilai, program tidak perlu membuat list yang berisi satu juta hasil tersebut sekaligus.

Nilai diproses secara bertahap selama iterasi.

## Mengapa Generator Penting untuk Big Data?

Ketika jumlah data semakin besar, strategi pengelolaan resource menjadi semakin penting.

Misalnya:

```text
Data kecil
   ↓
List masih praktis


Data besar
   ↓
Memory menjadi perhatian


Data sangat besar
   ↓
Pemrosesan bertahap diperlukan
   ↓
Generator dapat menjadi pilihan
```

Karena itu, generator menjadi konsep penting dalam pemrosesan data berskala besar.

Generator memungkinkan program bekerja dengan sequence panjang tanpa harus selalu memuat seluruh data ke memory.

## Penggunaan di Dunia Nyata

Konsep pemrosesan data secara bertahap banyak digunakan dalam aplikasi yang menangani data dalam jumlah besar.

Contohnya:

- Pemrosesan dataset besar.
- Membaca data secara bertahap.
- Pemrosesan file berukuran besar.
- Data processing pipeline.
- Streaming data.
- Pemrosesan sequence yang panjang.

Pada skala industri, efisiensi penggunaan resource menjadi semakin penting karena aplikasi dapat memproses data dalam jumlah yang sangat besar.

## Generator dan Library Python

Konsep generator juga banyak digunakan dalam ekosistem Python.

Berbagai library menggunakan pendekatan iterable, iterator, dan generator untuk menghasilkan atau memproses data secara bertahap.

Hal tersebut memungkinkan programmer bekerja dengan data tanpa selalu harus menyimpan seluruh hasil di memory.

Karena itu, memahami generator tidak hanya berguna ketika membuat generator sendiri, tetapi juga membantu memahami bagaimana berbagai library Python bekerja.

## Pola Dasar Generator

Pola dasar generator dapat diringkas sebagai berikut:

```python
def my_generator(num):
    for i in range(num):
        yield i * 5


for item in my_generator(1_000_000):
    pass
```

Terdapat dua bagian utama:

### Generator Function

```python
def my_generator(num):
    for i in range(num):
        yield i * 5
```

Function tersebut menggunakan `yield` sehingga menghasilkan generator.

### Mengonsumsi Generator

```python
for item in my_generator(1_000_000):
    pass
```

Generator kemudian dikonsumsi menggunakan perulangan.

Nilai dihasilkan satu per satu selama proses iterasi.

## Catatan tentang Performance

Generator tidak selalu berarti **lebih cepat** dalam semua situasi.

Keuntungan utama generator adalah **efisiensi memory dan kemampuan melakukan lazy evaluation**.

Kecepatan eksekusi sangat bergantung pada jenis proses, ukuran data, operasi yang dilakukan, serta bagaimana program membandingkan kedua pendekatan tersebut.

Oleh karena itu, jika ingin mengetahui performa secara pasti, lakukan pengukuran menggunakan benchmark pada kasus nyata.

## Kesimpulan

Generator memiliki kekuatan utama dalam kemampuan menghasilkan data secara bertahap.

Ketika dibandingkan dengan pendekatan menggunakan list:

```text
List
 ↓
Buat semua data
 ↓
Simpan semua data
 ↓
Proses


Generator
 ↓
Hasilkan data
 ↓
Proses
 ↓
Hasilkan data berikutnya
 ↓
Proses kembali
```

Pendekatan generator dapat memberikan keuntungan besar ketika bekerja dengan data dalam jumlah besar karena tidak perlu menyimpan seluruh sequence sekaligus.

Konsep penting yang perlu diingat:

- Generator menghasilkan nilai secara bertahap.
- Generator menggunakan lazy evaluation.
- Generator dapat mengurangi penggunaan memory.
- Generator memungkinkan proses dimulai sebelum seluruh data tersedia.
- Generator sangat berguna untuk pemrosesan data berukuran besar.
- Generator tidak selalu lebih cepat; performa perlu diukur berdasarkan kasus penggunaan.

Dengan memahami karakteristik tersebut, generator dapat menjadi salah satu teknik penting untuk membangun program Python yang lebih efisien dalam menangani data berskala besar.