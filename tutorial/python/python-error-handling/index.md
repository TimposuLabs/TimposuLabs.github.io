---
sidebar_position: 7
---

# Python Error Handling

Ketika membuat program Python, tidak semua proses akan berjalan sesuai dengan yang kita harapkan. Program dapat menghadapi berbagai kondisi yang tidak terduga, seperti input pengguna yang tidak sesuai, file yang tidak ditemukan, data yang tidak valid, atau operasi yang tidak dapat dilakukan.

Kondisi tersebut dapat menyebabkan **error** atau **exception** yang menghentikan jalannya program apabila tidak ditangani dengan baik.

Di sinilah **Error Handling** diperlukan.

## Apa Itu Error Handling?

**Error Handling** adalah mekanisme yang digunakan untuk **mendeteksi, menangani, dan merespons kondisi kesalahan** yang terjadi ketika program sedang berjalan.

Tujuannya bukan sekadar membuat error menghilang, tetapi membuat program mampu menghadapi kondisi yang tidak terduga dengan cara yang lebih terkontrol.

Tanpa error handling, sebuah kesalahan dapat menyebabkan program berhenti secara tiba-tiba.

Dengan error handling, program dapat menentukan tindakan yang sesuai ketika suatu masalah terjadi.

## Mengapa Error Handling Penting?

Program yang digunakan di dunia nyata berinteraksi dengan banyak hal yang berada di luar kendali programmer.

Misalnya:

- Pengguna memasukkan data yang salah.
- File yang dibutuhkan tidak tersedia.
- Data yang diterima memiliki format yang tidak sesuai.
- Koneksi ke layanan tertentu gagal.
- Operasi matematika tidak dapat dilakukan.
- Resource yang dibutuhkan tidak tersedia.
- Kondisi tertentu terjadi ketika program sedang berjalan.

Program yang baik tidak hanya mempertimbangkan **kondisi normal**, tetapi juga mempersiapkan kemungkinan terjadinya **kondisi tidak normal**.

## Error dan Exception

Dalam Python, kita akan banyak berinteraksi dengan istilah **exception**.

Secara sederhana, exception merupakan kondisi yang muncul ketika Python menemukan masalah saat program sedang dieksekusi.

Contohnya dapat terjadi ketika program mencoba melakukan operasi yang tidak valid.

Error yang terjadi saat program dijalankan dapat memberikan informasi penting mengenai:

- Jenis masalah yang terjadi.
- Lokasi terjadinya masalah.
- Penyebab program tidak dapat melanjutkan proses.

Memahami informasi tersebut merupakan bagian penting dalam proses debugging.

## Error Handling Bukan Berarti Mengabaikan Error

Error handling bukan berarti kita harus menyembunyikan semua error.

Sebaliknya, error handling digunakan agar program dapat **merespons error dengan tepat**.

Misalnya, ketika pengguna memasukkan data yang salah, program dapat memberikan informasi bahwa input tersebut tidak valid dan meminta pengguna mencoba kembali.

Dengan pendekatan tersebut, program tidak langsung berhenti hanya karena mendapatkan input yang tidak sesuai.

## Error Handling dan Program Dunia Nyata

Dalam aplikasi nyata, error handling menjadi semakin penting karena program biasanya memiliki banyak interaksi dengan sistem lain.

Contohnya:

```text
User
  ↓
Input
  ↓
Program
  ↓
File / Database / API
  ↓
Hasil
```

Pada setiap tahap tersebut dapat terjadi kondisi yang tidak terduga.

Error handling membantu program menentukan bagaimana kondisi tersebut harus ditangani.

Contohnya, ketika aplikasi membaca sebuah file:

```text
Program
   ↓
Mencari file
   ↓
File tersedia?
   ├── Ya  → lanjutkan proses
   └── Tidak → tangani kondisi error
```

Dengan demikian, program dapat memberikan respons yang lebih baik kepada pengguna.

## Tujuan Pembelajaran

Setelah mempelajari Error Handling, Anda diharapkan memahami:

- Perbedaan error dan exception.
- Mengapa exception dapat terjadi.
- Cara menangani exception.
- Cara menangani beberapa jenis exception.
- Cara menjalankan kode ketika exception terjadi maupun tidak terjadi.
- Cara menjalankan kode yang selalu dieksekusi.
- Cara membuat exception secara manual.
- Cara membuat custom exception.
- Cara menentukan strategi penanganan error yang tepat.

## Hubungan dengan Materi Sebelumnya

Error Handling melanjutkan kemampuan Python yang telah dipelajari sebelumnya.

Setelah memahami:

```text
Python Dasar
      ↓
Function
      ↓
    OOP
      ↓
Functional Programming
      ↓
Decorator
      ↓
Error Handling
```

kita mulai mempelajari bagaimana membuat program yang tidak hanya dapat **menjalankan proses**, tetapi juga dapat **menghadapi kondisi ketika proses tersebut tidak berjalan sesuai rencana**.

## Kesimpulan

Error Handling merupakan bagian penting dalam pengembangan aplikasi Python karena kondisi error merupakan sesuatu yang tidak dapat selalu dihindari.

Program yang baik tidak hanya menghasilkan output ketika semuanya berjalan normal, tetapi juga mampu menangani kondisi yang tidak terduga secara terkontrol.

Pada materi berikutnya, kita akan mulai mempelajari mekanisme Error Handling di Python dan bagaimana menentukan tindakan yang tepat ketika sebuah exception terjadi.