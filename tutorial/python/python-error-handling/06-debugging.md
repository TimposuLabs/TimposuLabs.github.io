---
sidebar_position: 12
title: "Debugging"
---

**Debugging** merupakan proses menemukan, memahami, dan memperbaiki kesalahan atau *bug* dalam sebuah program.

Dalam pemrograman, membuat kesalahan merupakan hal yang normal. Program yang kita buat hampir selalu membutuhkan proses pengujian, perbaikan, dan penyempurnaan.

Karena itu, kemampuan melakukan debugging merupakan salah satu keterampilan penting yang perlu dimiliki oleh seorang Python developer.

## Apa Itu Debugging?

Debugging adalah proses sistematis untuk mencari tahu:

```text
Apa yang salah?
      ↓
Di mana kesalahan terjadi?
      ↓
Mengapa kesalahan terjadi?
      ↓
Bagaimana cara memperbaikinya?
```

Bug tidak selalu berupa error yang menyebabkan program berhenti.

Terkadang program tetap berjalan, tetapi menghasilkan output yang salah.

Contohnya:

```text
Program berjalan
      ↓
Tidak ada error
      ↓
Output tidak sesuai harapan
      ↓
Kemungkinan terdapat bug pada logika
```

Oleh karena itu, debugging tidak hanya berarti memperbaiki pesan error, tetapi juga memastikan program bekerja sesuai dengan tujuan yang diharapkan.

## Jangan Takut dengan Error

Ketika menjalankan program dan mendapatkan error, jangan langsung menganggap bahwa program gagal total.

Pesan error justru memberikan informasi mengenai masalah yang terjadi.

Contohnya:

```text
TypeError
NameError
SyntaxError
ZeroDivisionError
```

Informasi tersebut dapat membantu kita menemukan sumber masalah.

Biasakan membaca error dari terminal dan mencari informasi seperti:

```text
Jenis error
File yang mengalami error
Nomor baris
Pesan error
```

Informasi tersebut menjadi titik awal proses debugging.

## Membaca Error Message

Misalnya Python memberikan:

```text
NameError: name 'nama' is not defined
```

Dari pesan tersebut kita dapat mengetahui bahwa Python tidak menemukan nama `nama` yang digunakan dalam program.

Contoh lainnya:

```text
TypeError
```

menunjukkan bahwa program mengalami masalah yang berkaitan dengan penggunaan tipe data.

Dengan memahami jenis exception, proses pencarian masalah menjadi lebih terarah.

## Perhatikan Baris yang Mengalami Error

Python biasanya menunjukkan lokasi terjadinya error melalui **traceback**.

Contohnya:

```text
Traceback (most recent call last):
  File "app.py", line 10, in <module>
    result = add(10, "5")
TypeError: unsupported operand type(s)
```

Informasi penting dari contoh tersebut adalah:

```text
File
  ↓
app.py

Line
  ↓
 10

Error
  ↓
TypeError
```

Mulailah investigasi dari lokasi tersebut.

Namun, perlu diingat bahwa **baris yang ditunjukkan sebagai lokasi error belum tentu merupakan akar masalah sebenarnya**. Terkadang masalah berasal dari nilai atau proses yang terjadi pada baris sebelumnya.

## Menggunakan Linter

**Linter** adalah tool yang membantu menemukan masalah pada kode sebelum program dijalankan.

IDE seperti PyCharm dan VS Code dapat memberikan peringatan secara langsung ketika terdapat masalah tertentu pada kode.

Contohnya:

```text
Kode ditulis
    ↓
Linter menganalisis kode
    ↓
Masalah terdeteksi
    ↓
Developer memperbaiki kode
```

Linter dapat membantu menemukan berbagai masalah seperti:

```text
Syntax problem
Unused variable
Undefined name
Style issue
Potential problem
```

Linter sangat membantu karena developer tidak harus menunggu program dijalankan untuk menemukan setiap masalah.

## Menggunakan `print()` untuk Debugging

Salah satu teknik debugging paling sederhana adalah menggunakan `print()` untuk melihat nilai variabel pada titik tertentu dalam program.

Contohnya:

```python
def add(num1, num2):
    print("num1:", num1)
    print("num2:", num2)

    result = num1 + num2

    print("result:", result)

    return result
```

Dengan cara tersebut kita dapat melihat bagaimana nilai berubah selama program berjalan.

Misalnya kita memiliki:

```python
total = price * quantity

print("price:", price)
print("quantity:", quantity)
print("total:", total)
```

Output tersebut dapat membantu mengetahui apakah nilai yang digunakan program sudah sesuai dengan yang kita harapkan.

## Kapan Menggunakan `print()`?

`print()` cocok digunakan ketika:

- Ingin memeriksa nilai variabel.
- Ingin mengetahui apakah suatu bagian kode dijalankan.
- Ingin melihat urutan proses program.
- Sedang mencari sumber masalah sederhana.

Contohnya:

```python
print("Program dimulai")

data = get_data()

print("Data berhasil diperoleh:", data)

result = process(data)

print("Hasil:", result)
```

Dengan beberapa `print()`, kita dapat mengetahui bagian mana dari program yang berjalan dan bagian mana yang bermasalah.

Namun, penggunaan `print()` yang terlalu banyak dapat membuat kode sulit dibaca.

Untuk debugging yang lebih kompleks, kita dapat menggunakan debugger.

## Interactive Debugger dengan `pdb`

Python menyediakan module bawaan bernama:

```text
pdb
```

`pdb` merupakan singkatan dari **Python Debugger**.

Debugger memungkinkan kita menghentikan sementara eksekusi program dan memeriksa kondisi program secara interaktif.

Dengan debugger, kita dapat melihat:

```text
Nilai variabel
Argumen fungsi
Posisi eksekusi
Alur program
```

## Menggunakan `pdb.set_trace()`

Kita dapat memasang breakpoint menggunakan:

```python
import pdb
```

kemudian:

```python
pdb.set_trace()
```

Contoh:

```python
import pdb

def add(num1, num2):
    pdb.set_trace()

    return num1 + num2

add(4, "a")
```

Ketika program mencapai:

```python
pdb.set_trace()
```

eksekusi akan dihentikan sementara dan kita dapat berinteraksi dengan debugger.

Pada kondisi tersebut, kita dapat memeriksa nilai yang sedang digunakan program.

## Mengapa Debugger Berguna?

Bayangkan sebuah program memiliki banyak function:

```text
main()
  ↓
process_data()
  ↓
calculate()
  ↓
save_result()
```

Jika hasil akhirnya salah, kita mungkin perlu mengetahui di mana data mulai berubah menjadi tidak benar.

Debugger memungkinkan kita menjalankan program secara bertahap:

```text
main()
  ↓
process_data()
  ↓
calculate()
  ↓
save_result()
```

dan memeriksa kondisi program pada setiap tahap.

Hal ini jauh lebih efektif untuk bug logika yang kompleks dibandingkan menambahkan banyak `print()`.

## Perintah Dasar `pdb`

Ketika berada di dalam debugger, terdapat beberapa perintah yang berguna.

### `a` - Arguments

Perintah:

```text
a
```

digunakan untuk melihat argument dari function yang sedang berjalan.

Contohnya ketika berada di:

```python
def add(num1, num2):
    pdb.set_trace()
```

kita dapat menggunakan:

```text
a
```

untuk melihat nilai argument function.

### `n` - Next

Perintah:

```text
n
```

berarti **next**.

Digunakan untuk menjalankan baris berikutnya tanpa masuk lebih dalam ke function yang dipanggil.

### `s` - Step

Perintah:

```text
s
```

berarti **step**.

Digunakan untuk masuk ke function yang dipanggil pada baris tersebut sehingga kita dapat melakukan debugging lebih detail.

### `c` - Continue

Perintah:

```text
c
```

berarti **continue**.

Digunakan untuk melanjutkan eksekusi program sampai debugger berhenti lagi atau program selesai.

### `p` - Print

Perintah:

```text
p nama_variabel
```

digunakan untuk melihat nilai sebuah variabel.

Contohnya:

```text
p num1
```

atau:

```text
p result
```

Perintah ini sangat berguna untuk mengetahui kondisi data pada titik tertentu dalam program.

## `print()` vs Debugger

Keduanya dapat digunakan untuk tujuan debugging, tetapi memiliki pendekatan yang berbeda.

| Teknik | Kegunaan |
| --- | --- |
| `print()` | Debugging sederhana |
| Linter | Menemukan masalah kode sebelum runtime |
| `pdb` | Investigasi program secara interaktif |
| IDE Debugger | Debugging melalui interface visual |

Pendekatan sederhana:

```text
Error sederhana
     ↓
Baca error message
     ↓
Gunakan print()
```

Jika masalah lebih kompleks:

```text
Bug kompleks
     ↓
Gunakan debugger
     ↓
Breakpoint
     ↓
Inspect variable
     ↓
Step through code
```

## Debugging Bug Logika

Tidak semua bug menghasilkan exception.

Contohnya:

```python
def multiply(a, b):
    return a + b
```

Program tersebut valid dan dapat dijalankan.

Namun jika tujuan function adalah melakukan perkalian, hasilnya salah.

```python
print(multiply(2, 3))
```

menghasilkan:

```text
5
```

padahal yang diharapkan:

```text
6
```

Ini merupakan contoh **logic bug**.

Tidak ada:

```text
SyntaxError
TypeError
NameError
```

tetapi program tetap salah.

Untuk kasus seperti ini, debugging digunakan untuk membandingkan:

```text
Expected Behavior
        vs
Actual Behavior
```

## Proses Debugging yang Sistematis

Debugging sebaiknya dilakukan secara sistematis.

### 1. Reproduksi Masalah

Pastikan kita dapat membuat bug tersebut terjadi kembali.

```text
Bug terjadi
    ↓
Cari kondisi yang menyebabkan bug
```

### 2. Baca Error Message

Jika terdapat exception, baca:

```text
Jenis error
Pesan error
File
Baris kode
Traceback
```

### 3. Periksa Nilai Data

Gunakan:

```python
print()
```

atau debugger untuk mengetahui apakah nilai variabel sesuai dengan yang diharapkan.

### 4. Periksa Alur Program

Pastikan program menjalankan proses sesuai urutan yang diharapkan.

```text
Input
 ↓
Processing
 ↓
Calculation
 ↓
Output
```

### 5. Identifikasi Akar Masalah

Jangan hanya memperbaiki gejala.

Cari tahu:

```text
Mengapa bug terjadi?
```

### 6. Perbaiki dan Uji Kembali

Setelah melakukan perubahan:

```text
Perbaiki kode
     ↓
Jalankan kembali
     ↓
Uji kasus yang sebelumnya gagal
```

Pastikan perubahan benar-benar menyelesaikan masalah.

## Debugging sebagai Bagian dari Development

Debugging bukan aktivitas yang hanya dilakukan ketika program selesai dibuat.

Dalam proses pengembangan software:

```text
Write Code
    ↓
   Run
    ↓
Find Problem
    ↓
  Debug
    ↓
   Fix
    ↓
  Test
    ↓
 Improve
    ↓
 Repeat
```

Proses tersebut merupakan bagian normal dari software development.

## Strategi Debugging yang Baik

Beberapa kebiasaan yang dapat membantu proses debugging:

### Baca Error Sebelum Mencari Solusi

Jangan langsung menyalin pesan error ke mesin pencari tanpa memahami masalahnya.

Pertama-tama perhatikan:

```text
Apa jenis error?
Di baris mana?
Nilai apa yang digunakan?
Apa yang sebenarnya diharapkan?
```

### Persempit Masalah

Jika sebuah program terdiri dari banyak bagian, jangan mencoba memeriksa semuanya sekaligus.

Persempit area masalah:

```text
Program
  ↓
Function
  ↓
Baris
  ↓
Variabel
  ↓
Nilai
```

### Gunakan Tool yang Sesuai

Gunakan teknik debugging berdasarkan kompleksitas masalah:

```text
Masalah sederhana
      ↓
Error message
      ↓
    print()
      ↓
    Linter
      ↓
    Debugger
      ↓
Masalah kompleks
```

## Ringkasan

Debugging adalah proses menemukan, menganalisis, dan memperbaiki bug dalam program.

Beberapa teknik yang dapat digunakan:

```text
Error Message
     ↓
Memahami penyebab error

  Linter
     ↓
Mendeteksi masalah kode

  print()
     ↓
Memeriksa nilai dan alur sederhana

    pdb
     ↓
Debugging secara interaktif
```

Perintah dasar `pdb` yang perlu dikenali:

| Perintah | Fungsi |
| --- | --- |
| `a` | Melihat argument function |
| `n` | Menjalankan baris berikutnya |
| `s` | Masuk ke function |
| `c` | Melanjutkan eksekusi |
| `p` | Menampilkan nilai variabel |

## Kesimpulan

Debugging merupakan keterampilan fundamental dalam pemrograman Python.

Kesalahan dalam kode adalah bagian normal dari proses pengembangan. Yang membedakan developer yang berpengalaman bukanlah tidak pernah membuat kesalahan, tetapi kemampuan **menemukan sumber masalah, memahami penyebabnya, dan memperbaikinya secara sistematis**.

Mulailah dari teknik sederhana seperti membaca error message dan menggunakan `print()`. Ketika masalah menjadi lebih kompleks, gunakan tool seperti `pdb` atau debugger yang tersedia pada IDE.

Dengan memahami proses debugging, kita tidak hanya belajar memperbaiki error, tetapi juga belajar **memahami bagaimana program bekerja di balik layar**.