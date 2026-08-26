---
sidebar_position: 1
title: "Error & Exception Handling"
---

Saat membuat program, kemunculan bug atau error merupakan sesuatu yang sulit dihindari. Program dapat menghadapi berbagai kondisi yang tidak sesuai dengan yang diharapkan, baik karena kesalahan penulisan kode maupun karena data atau kondisi tertentu saat program dijalankan.

Dalam Python, ketika interpreter menemukan kondisi yang menyebabkan instruksi tidak dapat dijalankan, Python akan menghasilkan **exception** yang biasanya disertai pesan error.

Memahami error dan exception merupakan bagian penting dalam pengembangan aplikasi karena membantu kita mengetahui penyebab masalah dan menentukan bagaimana program harus merespons kondisi tersebut.

## Error dan Exception

**Error** merupakan kondisi kesalahan yang menyebabkan program tidak dapat berjalan atau melakukan suatu operasi sebagaimana mestinya.

Sementara itu, **exception** merupakan kondisi yang muncul ketika Python menemukan masalah selama proses eksekusi program.

Jika exception tidak ditangani, program dapat berhenti secara tiba-tiba.

Contohnya, ketika program melakukan operasi yang tidak valid, Python akan menghentikan proses dan memberikan informasi mengenai jenis exception yang terjadi.

## Masalah Tanpa Error Handling

Tanpa mekanisme error handling, exception yang tidak ditangani dapat menyebabkan program berhenti secara mendadak.

Hal ini mungkin tidak terlalu terlihat pada program sederhana. Namun, pada aplikasi yang lebih besar, kondisi tersebut dapat mengganggu proses yang sedang berjalan dan menyebabkan pengalaman pengguna menjadi buruk.

Karena itu, aplikasi perlu memiliki mekanisme untuk menghadapi kondisi yang tidak terduga.

## Tujuan Error Handling

**Error Handling** digunakan untuk menangani kondisi error atau exception sehingga program dapat memberikan respons yang sesuai.

Tujuan utamanya bukan sekadar menghilangkan pesan error, tetapi menentukan apa yang harus dilakukan ketika suatu kondisi tidak dapat diproses secara normal.

Misalnya:

```text
Program
   ↓
Menjalankan proses
   ↓
Terjadi exception?
   ├── Tidak → lanjutkan proses
   └── Ya    → tangani exception
```

Dengan pendekatan tersebut, program dapat menangani kondisi yang tidak terduga secara lebih terkontrol.

## Jenis-Jenis Error Umum di Python

Python memiliki berbagai jenis error dan exception. Beberapa jenis yang umum ditemukan ketika belajar Python antara lain:

- `SyntaxError`
- `TypeError`
- `NameError`
- `IndexError`
- `KeyError`
- `ZeroDivisionError`
- `ValueError`

Setiap jenis exception menunjukkan kondisi kesalahan yang berbeda.

## SyntaxError

`SyntaxError` terjadi ketika penulisan kode tidak mengikuti aturan sintaks Python.

Kesalahan ini biasanya ditemukan ketika Python mencoba membaca atau memahami struktur kode.

Contohnya adalah lupa menuliskan tanda titik dua pada deklarasi function:

```python
def halo()
    print("Halo")
```

Python akan memberikan `SyntaxError` karena sintaks function tersebut tidak lengkap.

`SyntaxError` biasanya perlu diperbaiki pada kode sumber sebelum program dapat dijalankan dengan benar.

## TypeError

`TypeError` terjadi ketika sebuah operasi dilakukan pada tipe data yang tidak sesuai atau tidak kompatibel.

Contohnya:

```python
result = 1 + "hello"
```

Angka dan string tidak dapat dijumlahkan menggunakan operasi tersebut sehingga Python menghasilkan `TypeError`.

Contoh lainnya dapat terjadi ketika sebuah function menerima tipe data yang tidak sesuai dengan operasi yang dilakukan di dalamnya.

## NameError

`NameError` terjadi ketika program mencoba menggunakan nama variable atau function yang belum didefinisikan.

Contohnya:

```python
print(nama)
```

Jika variable `nama` belum pernah dibuat, Python tidak mengetahui object yang dimaksud dan menghasilkan `NameError`.

Kesalahan ini biasanya berkaitan dengan penggunaan nama yang belum didefinisikan atau salah penulisan nama.

## IndexError

`IndexError` terjadi ketika program mencoba mengakses indeks yang berada di luar batas sebuah sequence, seperti `list`.

Contohnya:

```python
angka = [1, 2, 3]

print(angka[5])
```

List tersebut hanya memiliki indeks:

```text
0
1
2
```

Karena indeks `5` tidak tersedia, Python menghasilkan `IndexError`.

## KeyError

`KeyError` biasanya terjadi ketika program mencoba mengakses key yang tidak tersedia di dalam dictionary.

Contohnya:

```python
data = {
    "a": 1
}

print(data["b"])
```

Dictionary tersebut hanya memiliki key `"a"`. Ketika program mencoba mengakses `"b"`, Python menghasilkan `KeyError`.

## ZeroDivisionError

`ZeroDivisionError` terjadi ketika program mencoba melakukan pembagian dengan angka nol.

Contohnya:

```python
hasil = 5 / 0
```

Pembagian dengan `0` tidak dapat dilakukan sehingga Python menghasilkan `ZeroDivisionError`.

## ValueError

`ValueError` adalah exception yang terjadi ketika sebuah fungsi atau operasi menerima nilai yang memiliki tipe data yang benar, tetapi nilai tersebut tidak sesuai atau tidak valid untuk operasi yang dilakukan.

Contohnya:

```python
age = int("hello")
```

`int()` dapat menerima `string` untuk dikonversi menjadi integer, sehingga tipe datanya masih sesuai. Namun, nilai `"hello"` tidak merepresentasikan angka yang dapat dikonversi menjadi integer.

## Mengapa Perlu Mengantisipasi Error?

Program yang digunakan di dunia nyata sering berinteraksi dengan berbagai sumber data dan kondisi eksternal.

Misalnya:

- Input dari pengguna.
- File.
- Database.
- API.
- Jaringan.
- Data dari sistem lain.

Kita tidak dapat selalu memastikan bahwa data atau kondisi yang diterima program akan sesuai dengan yang diharapkan.

Contohnya, ketika meminta pengguna memasukkan angka, pengguna mungkin memasukkan teks. Kondisi tersebut dapat menyebabkan operasi yang dilakukan program tidak dapat berjalan sebagaimana mestinya.

Karena itu, program perlu mempertimbangkan kemungkinan terjadinya kondisi yang tidak terduga.

## Error Handling dalam Program

Secara umum, error handling membantu menjaga alur program ketika terjadi kondisi yang tidak sesuai.

Tanpa error handling:

```text
Program
   ↓
Terjadi exception
   ↓
Program berhenti
```

Dengan error handling:

```text
Program
   ↓
Terjadi exception
   ↓
Exception ditangani
   ↓
Program memberikan respons
   ↓
Program dapat melanjutkan atau berhenti secara terkontrol
```

Penanganan yang tepat bergantung pada jenis masalah dan kebutuhan aplikasi.

## Kesimpulan

Error dan exception merupakan bagian yang tidak dapat dipisahkan dari pengembangan program. Kesalahan dapat terjadi karena sintaks yang tidak benar, tipe data yang tidak sesuai, data yang tidak tersedia, maupun kondisi tertentu saat program dijalankan.

Beberapa exception yang umum ditemukan di Python antara lain:

| Exception | Kondisi Umum |
| --- | --- |
| `SyntaxError` | Sintaks kode tidak sesuai aturan Python |
| `TypeError` | Operasi dilakukan pada tipe data yang tidak sesuai |
| `NameError` | Nama variable atau function belum didefinisikan |
| `IndexError` | Mengakses indeks di luar batas sequence |
| `KeyError` | Mengakses key yang tidak tersedia pada dictionary |
| `ZeroDivisionError` | Melakukan pembagian dengan angka nol |

Dengan mempelajari **Error Handling**, kita dapat membuat program yang lebih mampu menghadapi kondisi tidak terduga dan memberikan respons yang lebih terkontrol.

Pada materi berikutnya, kita akan mempelajari mekanisme Python untuk menangani exception menggunakan `try`, `except`, `else`, dan `finally`.