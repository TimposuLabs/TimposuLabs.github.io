---
sidebar_position: 2
title: "Generators"
---

**Generator** adalah fitur khusus dalam Python yang memungkinkan program menghasilkan serangkaian nilai secara **bertahap**, bukan menghasilkan seluruh nilai sekaligus.

Generator sangat berguna ketika kita bekerja dengan data dalam jumlah besar karena nilai dapat dihasilkan hanya ketika dibutuhkan.

Salah satu karakteristik utama generator adalah kemampuannya untuk **menghentikan sementara (pause)** eksekusi function dan kemudian melanjutkannya kembali dari posisi terakhir.

Mekanisme tersebut dilakukan menggunakan keyword `yield`.

## Cara Kerja Generator

Berbeda dengan function biasa yang menjalankan seluruh instruksi hingga selesai dan kemudian mengembalikan hasil, generator dapat menghasilkan sebuah nilai kemudian menghentikan sementara prosesnya.

Ketika nilai berikutnya dibutuhkan, generator melanjutkan eksekusi dari posisi terakhir.

Secara sederhana:

```text
Generator dijalankan
       ↓
Menghasilkan nilai
       ↓
    Pause
       ↓
Nilai berikutnya diminta
       ↓
Melanjutkan eksekusi
       ↓
Menghasilkan nilai berikutnya
       ↓
Pause kembali
```

Pola tersebut terus berlangsung sampai generator tidak memiliki nilai lagi untuk dihasilkan.

## Keyword `yield`

Generator menggunakan keyword `yield` untuk menghasilkan sebuah nilai.

Berbeda dengan `return`, `yield` tidak langsung mengakhiri seluruh proses function.

`yield` membuat generator dapat:

1. Menghasilkan sebuah nilai.
2. Menjeda eksekusi.
3. Menyimpan keadaan proses saat ini.
4. Melanjutkan eksekusi ketika nilai berikutnya diminta.

Konsep ini merupakan salah satu karakteristik utama yang membedakan generator dari function biasa.

## Generator dan Pemrosesan Data

Generator cocok digunakan ketika data perlu diproses satu per satu.

Misalnya terdapat data dalam jumlah besar:

```text
Data
 ↓
1
2
3
4
5
...
1.000.000
```

Dengan pendekatan generator, program tidak harus membuat seluruh hasil sekaligus.

Proses dapat dilakukan secara bertahap:

```text
Data
 ↓
Hasil pertama
 ↓
Hasil kedua
 ↓
Hasil ketiga
 ↓
...
```

Nilai berikutnya hanya dihasilkan ketika diperlukan.

## Generator vs List

Perbedaan penting antara generator dan list terletak pada bagaimana data disiapkan dan disimpan.

### List

Ketika sebuah list dibuat, seluruh elemen biasanya tersedia di memory secara bersamaan.

Misalnya:

```python
def make_list(num):
    result = []

    for i in range(num):
        result.append(i * 2)

    return result


my_list = make_list(100)
```

Function tersebut membuat list yang berisi seluruh hasil sebelum list dikembalikan.

Secara sederhana:

```text
make_list()
    ↓
Membuat seluruh data
    ↓
Menyimpan seluruh data
    ↓
Mengembalikan list
```

Jika jumlah data sangat besar, jumlah memory yang dibutuhkan juga dapat menjadi besar.

### Generator

Generator menggunakan pendekatan berbeda.

Nilai dihasilkan secara bertahap ketika dibutuhkan.

Secara konseptual:

```text
Generator
   ↓
Nilai 1
   ↓
Nilai 2
   ↓
Nilai 3
   ↓
...
```

Generator tidak perlu menyiapkan seluruh hasil sekaligus sebelum program dapat mulai memprosesnya.

## Efisiensi Memori

Salah satu keuntungan utama generator adalah **efisiensi penggunaan memory**.

Bayangkan program harus menghasilkan jutaan nilai.

Dengan list:

```text
Jutaan data
     ↓
Semua dibuat
     ↓
Semua disimpan di memory
```

Sedangkan dengan generator:

```text
Nilai diperlukan
      ↓
Nilai dihasilkan
      ↓
Diproses
      ↓
Nilai berikutnya diperlukan
      ↓
Nilai berikutnya dihasilkan
```

Dengan pendekatan tersebut, generator dapat membantu mengurangi kebutuhan memory karena tidak harus menyimpan seluruh sequence sekaligus.

## Generator dan Lazy Evaluation

Generator berkaitan erat dengan konsep **lazy evaluation**.

Lazy evaluation berarti nilai tidak langsung dihasilkan sebelum dibutuhkan.

Sebagai contoh, jika generator memiliki banyak nilai, program dapat mengambil nilai tersebut secara bertahap.

```text
Generator
   ↓
Butuh nilai?
   ↓
Hasilkan nilai
   ↓
Proses nilai
   ↓
Butuh nilai berikutnya?
   ↓
Hasilkan nilai berikutnya
```

Pendekatan ini sangat berguna ketika tidak semua data perlu digunakan sekaligus.

## Generator dan `range()`

`range()` sering digunakan sebagai contoh untuk memahami konsep menghasilkan nilai secara bertahap.

Misalnya:

```python
for number in range(5):
    print(number)
```

Nilai yang diproses adalah:

```text
0
1
2
3
4
```

Namun, perlu diperhatikan bahwa secara teknis **`range` bukan generator**, melainkan object `range` yang merupakan iterable dengan perilaku lazy-like dan mendukung iterasi efisien. Generator merupakan jenis object yang berbeda dan biasanya dibuat menggunakan function dengan `yield`.

Konsep ini penting agar istilah **iterable**, **iterator**, dan **generator** tidak tercampur.

## Generator untuk Data Berukuran Besar

Generator sangat berguna ketika program harus menangani data dalam jumlah besar.

Contohnya:

- Membaca data secara bertahap.
- Memproses dataset besar.
- Menghasilkan sequence yang panjang.
- Memproses data satu per satu.
- Membuat pipeline pemrosesan data.

Secara umum:

```text
Dataset besar
      ↓
Generator
      ↓
Ambil sebagian data
      ↓
Proses
      ↓
Ambil data berikutnya
      ↓
Proses kembali
```

Pendekatan seperti ini dapat membantu program menggunakan memory secara lebih efisien.

## Keuntungan Generator

Beberapa keuntungan utama generator adalah:

### Hemat Memori

Generator tidak harus menyimpan seluruh sequence dalam memory sekaligus.

Hal ini sangat berguna untuk data berukuran besar.

### Pemrosesan Bertahap

Data dapat diproses satu per satu sehingga program tidak harus menunggu seluruh sequence selesai dibuat.

### Lazy Evaluation

Nilai hanya dihasilkan ketika diperlukan.

### Cocok untuk Data Besar

Generator dapat digunakan untuk membantu menangani sequence atau proses yang menghasilkan data dalam jumlah sangat besar.

## Kapan Menggunakan Generator?

Generator cocok digunakan ketika:

- Data berjumlah besar.
- Tidak semua data dibutuhkan sekaligus.
- Data dapat diproses satu per satu.
- Kita ingin mengurangi penggunaan memory.
- Proses membutuhkan lazy evaluation.
- Program menghasilkan sequence secara bertahap.

Namun, generator tidak selalu menjadi pilihan terbaik.

Jika data berukuran kecil dan seluruh data memang diperlukan sekaligus, menggunakan `list` dapat lebih sederhana dan mudah digunakan.

## Kesimpulan

Generator adalah mekanisme Python untuk menghasilkan nilai **secara bertahap dan ketika dibutuhkan**.

Karakteristik utama generator adalah penggunaan `yield`, yang memungkinkan function menghasilkan nilai kemudian menghentikan sementara eksekusinya sebelum dilanjutkan kembali.

Perbedaan pendekatan dapat digambarkan:

```text
List:

Buat semua data
      ↓
Simpan di memory
      ↓
Gunakan


Generator:

Butuh data
      ↓
Hasilkan data
      ↓
Gunakan
      ↓
Butuh data berikutnya
      ↓
Hasilkan kembali
```

Karena itu, generator sangat berguna untuk **pemrosesan data secara bertahap dan efisiensi penggunaan memory**, terutama ketika bekerja dengan data dalam jumlah besar.

Pada materi berikutnya, pembahasan dapat dilanjutkan dengan **Generator Function dan `yield`** untuk memahami bagaimana generator dibuat dan bagaimana proses `pause` serta `resume` terjadi dalam Python.