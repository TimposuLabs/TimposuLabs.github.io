---
sidebar_position: 1
title: "Konsep Dasar Pemrograman"
---

## 4 Pilar Utama Mempelajari Bahasa Pemrograman

Mempelajari bahasa pemrograman bukan hanya tentang menghafalkan sintaks atau mengetahui berbagai perintah. Agar dapat menggunakan sebuah bahasa pemrograman dengan baik, kita perlu memahami beberapa konsep fundamental yang menjadi dasar dalam menulis dan memahami program.

Secara umum, terdapat **4 pilar utama** yang perlu dikuasai ketika mempelajari bahasa pemrograman, termasuk Python:

1. **Istilah dan Terminologi**
2. **Tipe Data**
3. **Aksi dan Operasi**
4. **Praktik Terbaik / Best Practice**

Keempat hal tersebut saling berhubungan dan akan terus digunakan sepanjang proses belajar pemrograman.

---

## 1. Istilah dan Terminologi

Setiap bahasa pemrograman memiliki istilah dan terminologi yang digunakan untuk menjelaskan berbagai bagian dari sebuah program.

Memahami istilah tersebut penting karena istilah yang sama akan sering digunakan dalam dokumentasi, tutorial, buku, maupun ketika berkomunikasi dengan programmer lain.

Beberapa istilah yang akan sering ditemukan dalam Python antara lain:

- **Statement** - sebuah instruksi yang dijalankan oleh program.
- **Variable** - nama yang digunakan untuk mereferensikan sebuah nilai.
- **Function** - bagian program yang digunakan untuk menjalankan tugas tertentu.
- **Class** - blueprint yang digunakan dalam pemrograman berorientasi objek.
- **Instantiation** - proses membuat object berdasarkan sebuah class.
- **Expression** - bagian kode yang menghasilkan sebuah nilai.

Memahami istilah-istilah tersebut akan membantu kita membaca kode dan memahami dokumentasi dengan lebih mudah.

:::info
**Intinya:** sebelum bisa menggunakan bahasa pemrograman dengan baik, kita perlu memahami "bahasa" yang digunakan oleh para programmer untuk membicarakan bahasa pemrograman tersebut.
:::

---

## 2. Tipe Data

Program bekerja dengan berbagai macam data. Data tersebut dapat berupa angka, teks, nilai benar atau salah, maupun kumpulan data.

**Tipe data** digunakan untuk menggambarkan jenis nilai yang digunakan oleh program.

Dalam Python terdapat berbagai tipe data yang umum digunakan, seperti:

| Tipe Data | Contoh | Kegunaan |
| --- | --- | --- |
| `int` | `10` | Bilangan bulat |
| `float` | `3.14` | Bilangan desimal |
| `str` | `"Python"` | Teks |
| `bool` | `True` / `False` | Nilai logika |
| `list` | `[10, 20, 30]` | Kumpulan data |
| `tuple` | `(10, 20, 30)` | Kumpulan data yang tidak dapat diubah |
| `set` | `{10, 20, 30}` | Kumpulan nilai unik |
| `dict` | `{"nama": "Budi"}` | Data dalam bentuk pasangan key-value |

Pemahaman tentang tipe data sangat penting karena operasi yang dapat dilakukan terhadap suatu nilai bergantung pada tipe datanya.

Misalnya, angka dapat digunakan dalam operasi matematika, sedangkan teks dapat digunakan dalam operasi yang berkaitan dengan karakter atau string.

:::info
**Intinya:** pahami data apa yang sedang kita gunakan sebelum menentukan apa yang akan dilakukan terhadap data tersebut.
:::

---

## 3. Aksi dan Operasi

Setelah program memiliki data, program perlu melakukan sesuatu terhadap data tersebut.

Pada dasarnya, pemrograman dapat dipandang sebagai proses:

**Menyimpan data → Mengambil data → Memproses data → Menghasilkan informasi**

Berbagai aksi dapat dilakukan terhadap data.

### Operasi Aritmatika

Program dapat melakukan operasi matematika seperti:

- Penjumlahan
- Pengurangan
- Perkalian
- Pembagian
- Perhitungan lainnya

### Pengambilan Keputusan

Program sering kali harus menentukan tindakan berdasarkan suatu kondisi.

Contohnya:

> Jika nilai lebih besar atau sama dengan batas tertentu, maka siswa dinyatakan lulus. Jika tidak, siswa dinyatakan belum lulus.

Konsep seperti ini dikenal sebagai **conditional statement**, yang biasanya menggunakan `if`, `elif`, dan `else`.

### Perulangan

Program juga sering perlu melakukan suatu tindakan berkali-kali.

Contohnya:

> Menampilkan daftar nama siswa satu per satu.

Konsep tersebut dikenal sebagai **loop**, yang dalam Python dapat dilakukan menggunakan `for` atau `while`.

### Pemanggilan Fungsi

Program dapat menggunakan **function** untuk menjalankan tugas tertentu.

Dengan function, kode dapat diorganisasi menjadi bagian-bagian yang lebih terstruktur dan dapat digunakan kembali.

:::info
**Intinya:** pemrograman bukan hanya menyimpan data, tetapi juga menentukan bagaimana data tersebut diproses untuk menghasilkan sesuatu yang berguna.
:::

---

## 4. Praktik Terbaik

Program yang dapat berjalan belum tentu merupakan program yang baik.

Dalam pengembangan perangkat lunak, kita juga perlu memperhatikan bagaimana kode tersebut ditulis.

Kode yang baik seharusnya:

- Mudah dibaca.
- Mudah dipahami.
- Mudah dikembangkan.
- Mudah diperbaiki.
- Tidak memiliki kompleksitas yang tidak diperlukan.
- Mengikuti standar dan konvensi yang berlaku.

Konsep ini sering disebut sebagai **Best Practices**.

### Readability

Kode yang mudah dibaca akan membantu programmer memahami program dengan lebih cepat.

Hal ini menjadi semakin penting ketika sebuah proyek dikerjakan oleh beberapa orang.

### Konsistensi

Penulisan kode sebaiknya mengikuti aturan dan gaya yang konsisten.

Dalam Python, terdapat panduan gaya penulisan yang dikenal sebagai **PEP 8**.

PEP 8 memberikan rekomendasi mengenai berbagai aspek gaya penulisan kode Python agar kode lebih konsisten dan mudah dibaca.

### Efisiensi

Program juga perlu memperhatikan penggunaan sumber daya seperti:

- Memori
- CPU
- Waktu eksekusi

Namun, efisiensi sebaiknya tetap diseimbangkan dengan keterbacaan dan kesederhanaan kode.

### Maintainability

Program yang baik bukan hanya program yang dapat digunakan hari ini, tetapi juga mudah diperbaiki dan dikembangkan di kemudian hari.

Kode yang terlalu rumit dapat menyulitkan programmer lain ketika harus melakukan perubahan atau memperbaiki bug.

:::info
**Intinya:** jangan hanya membuat kode yang "bisa berjalan", tetapi biasakan membuat kode yang **jelas, terstruktur, dan mudah dirawat**.
:::

---

## Hubungan Keempat Pilar

Keempat pilar tersebut saling berkaitan.

Kita perlu memahami **istilah** agar dapat memahami konsep pemrograman.

Kemudian kita perlu memahami **tipe data** agar mengetahui jenis informasi yang sedang kita gunakan.

Setelah itu kita perlu memahami **aksi dan operasi** untuk mengetahui bagaimana data tersebut diproses.

Terakhir, kita perlu menerapkan **best practices** agar kode yang kita buat tetap berkualitas dan mudah dipelihara.

Secara sederhana, prosesnya dapat digambarkan seperti berikut:

```text
Istilah & Terminologi
        ↓
     Tipe Data
        ↓
 Aksi & Operasi
        ↓
   Best Practices
        ↓
Kode yang Baik dan Terstruktur
```

---

## Kesimpulan

Menguasai bahasa pemrograman membutuhkan lebih dari sekadar menghafalkan sintaks.

Empat hal yang menjadi fondasi penting adalah:

1. **Istilah dan Terminologi** - memahami bahasa dan konsep yang digunakan dalam pemrograman.
2. **Tipe Data** - memahami berbagai jenis data yang digunakan oleh program.
3. **Aksi dan Operasi** - memahami bagaimana program memproses dan memanipulasi data.
4. **Best Practices** - memahami bagaimana menulis kode yang baik, jelas, efisien, dan mudah dirawat.

Dengan memahami keempat pilar ini, proses belajar Python akan menjadi lebih terarah. Kita tidak hanya belajar **"bagaimana menulis kode Python"**, tetapi juga memahami **"mengapa kode tersebut ditulis dan bagaimana menulisnya dengan baik."**