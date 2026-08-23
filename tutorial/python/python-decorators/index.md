---
sidebar_position: 6
---

# Python Decorator

Decorator adalah salah satu fitur Python yang memungkinkan kita **menambahkan atau memodifikasi perilaku sebuah fungsi atau class tanpa harus mengubah kode asli dari fungsi atau class tersebut**.

Konsep ini cukup penting dalam Python karena banyak framework dan library menggunakan decorator untuk memberikan kemampuan tambahan pada kode secara praktis dan terstruktur.

## Mengapa Perlu Belajar Decorator?

Dalam pengembangan aplikasi, kita sering menemukan beberapa fungsi yang membutuhkan perilaku tambahan yang sama.

Misalnya, beberapa fungsi membutuhkan:

- Pencatatan aktivitas (*logging*).
- Pemeriksaan hak akses.
- Validasi.
- Pengukuran waktu eksekusi.
- Autentikasi.
- Pembatasan akses tertentu.

Daripada menuliskan logika tambahan tersebut berulang-ulang pada setiap fungsi, Python memungkinkan kita menggunakan **decorator** untuk membungkus fungsi dan memberikan perilaku tambahan secara terpisah.

Konsep sederhananya dapat dibayangkan seperti:

```text
Fungsi asli
    ↓
Decorator
    ↓
Fungsi dengan perilaku tambahan
```

Dengan pendekatan tersebut, fungsi utama tetap fokus pada tugasnya, sedangkan decorator menangani perilaku tambahan.

## Decorator dan Functional Programming

Decorator memiliki hubungan yang erat dengan konsep **Functional Programming** yang telah dipelajari sebelumnya.

Beberapa konsep yang menjadi dasar pemahaman decorator adalah:

- **First-Class Functions**
- **Higher-Order Functions**
- **Function Composition**
- **Closure**

Karena fungsi di Python dapat diperlakukan seperti sebuah object, fungsi dapat diberikan kepada fungsi lain dan bahkan dapat menghasilkan fungsi baru.

Kemampuan tersebut menjadi dasar bagaimana decorator bekerja.

## Contoh Penggunaan Decorator di Dunia Nyata

Decorator banyak ditemukan dalam berbagai framework Python.

Misalnya pada aplikasi web, decorator dapat digunakan untuk menentukan bahwa sebuah fungsi hanya dapat dijalankan oleh pengguna yang sudah login.

Dalam framework tertentu, kita dapat menemukan pola seperti:

```python
@login_required
def dashboard():
    ...
```

Decorator tersebut dapat memberikan perilaku tambahan kepada fungsi `dashboard()` tanpa harus memasukkan seluruh logika autentikasi ke dalam fungsi tersebut.

Contoh lain adalah routing pada aplikasi web:

```python
@app.route("/users")
def users():
    ...
```

Decorator digunakan untuk menghubungkan sebuah fungsi dengan perilaku tertentu.

## Tujuan Pembelajaran

Setelah mempelajari decorator, diharapkan Anda memahami:

- Apa itu decorator.
- Mengapa decorator digunakan.
- Hubungan decorator dengan function.
- Hubungan decorator dengan Higher-Order Function.
- Konsep fungsi pembungkus (*wrapper*).
- Cara menggunakan decorator.
- Cara membuat decorator sendiri.
- Penggunaan decorator dengan parameter.
- Penggunaan beberapa decorator.
- Penggunaan decorator pada aplikasi nyata.

## Kesimpulan

Decorator merupakan mekanisme Python untuk **menambahkan perilaku pada fungsi atau class tanpa harus mengubah implementasi aslinya**.

Konsep ini pada awalnya mungkin terlihat cukup abstrak. Namun, setelah memahami **First-Class Functions, Higher-Order Functions, dan Closure**, decorator akan menjadi lebih mudah dipahami.

Karena itu, pembelajaran decorator sebaiknya tidak hanya berfokus pada sintaks, tetapi juga memahami **mengapa decorator dibutuhkan dan masalah apa yang ingin diselesaikannya**.