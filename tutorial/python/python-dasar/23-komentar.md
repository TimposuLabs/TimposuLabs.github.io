---
sidebar_position: 23
title: "Komentar"
---

**Comment** atau komentar adalah teks yang ditulis di dalam source code untuk memberikan catatan atau penjelasan kepada programmer.

Komentar **tidak dieksekusi sebagai instruksi program** oleh Python.

Di Python, komentar satu baris dibuat menggunakan tanda:

```text
#
```

---

## 1. Membuat Komentar

Contoh sederhana:

```python
# Ini adalah komentar

print("Hello World")
```

Python akan mengabaikan baris:

```python
# Ini adalah komentar
```

dan hanya menjalankan:

```python
print("Hello World")
```

Output:

```text
Hello World
```

---

## 2. Komentar di Samping Kode

Komentar juga dapat ditulis setelah kode pada baris yang sama.

Contohnya:

```python
name = "Andrei"  # Nama pengguna

print(name)
```

Bagian:

```text
# Nama pengguna
```

merupakan komentar dan tidak akan memengaruhi hasil program.

---

## 3. Mengapa Menggunakan Komentar?

Komentar dapat membantu programmer memberikan informasi tambahan mengenai kode.

Beberapa kegunaan komentar antara lain:

- Menjelaskan logika tertentu.
- Memberikan catatan kepada programmer lain.
- Menjelaskan alasan suatu kode dibuat dengan cara tertentu.
- Membantu memahami kode ketika project dibaca kembali.
- Menonaktifkan kode sementara ketika melakukan debugging.

---

## 4. Komentar untuk Menjelaskan Logika

Komentar paling berguna ketika kode membutuhkan penjelasan tambahan.

Contohnya:

```python
# Tahun lahir dikonversi ke integer agar dapat digunakan dalam perhitungan
birth_year = input("What year were you born? ")

age = 2026 - int(birth_year)
```

Komentar tersebut memberikan informasi mengenai **alasan** penggunaan `int()`.

Tanpa komentar, kita tetap dapat memahami kode tersebut.

Namun komentar memberikan konteks tambahan mengenai tujuan dari konversi tersebut.

---

## 5. Komentar untuk Debugging

Komentar juga dapat digunakan untuk menonaktifkan kode sementara.

Misalnya:

```python
print("Program dimulai")

# print("Bagian ini sedang diuji")

print("Program selesai")
```

Baris:

```python
# print("Bagian ini sedang diuji")
```

tidak akan dijalankan oleh Python.

Teknik ini terkadang berguna ketika programmer sedang melakukan **debugging** atau pengujian.

---

## 6. Mengomentari Beberapa Baris

Python tidak memiliki sintaks khusus seperti beberapa bahasa pemrograman lain untuk membuat komentar multi-baris.

Namun, beberapa baris dapat dibuat menjadi komentar dengan memberikan `#` pada setiap baris.

Contohnya:

```python
# Baris pertama
# Baris kedua
# Baris ketiga
```

Semua baris tersebut merupakan komentar.

---

## 7. Jangan Berlebihan Menggunakan Komentar

Komentar memang berguna, tetapi terlalu banyak komentar dapat membuat kode menjadi sulit dibaca.

Hindari komentar yang hanya menjelaskan sesuatu yang sudah jelas dari kode.

Contoh:

```python
# Membuat variable name
name = "Andrei"

# Menampilkan variable name
print(name)
```

Komentar tersebut sebenarnya tidak terlalu diperlukan karena kode sudah cukup jelas.

Kode yang lebih sederhana:

```python
name = "Andrei"

print(name)
```

lebih mudah dibaca.

---

## 8. Tulis Kode yang Mudah Dipahami

Sebelum menambahkan komentar, usahakan kode yang kita tulis sudah memiliki struktur dan penamaan yang jelas.

Contohnya:

```python
user_age = 25
```

lebih mudah dipahami dibandingkan:

```python
x = 25
```

Nama variable yang deskriptif dapat mengurangi kebutuhan komentar.

Contoh lainnya:

```python
birth_year = 2000
current_year = 2026

age = current_year - birth_year
```

Kode tersebut sudah cukup jelas tanpa perlu komentar pada setiap baris.

---

## 9. Komentar Sebaiknya Menjelaskan "Mengapa"

Salah satu prinsip penting dalam menulis komentar adalah:

:::info
**Komentar sebaiknya menjelaskan mengapa kode dibuat dengan cara tertentu, bukan hanya menjelaskan apa yang dilakukan kode.**
:::

Contohnya:

```python
# Menggunakan tahun berjalan agar umur dapat dihitung berdasarkan tahun saat ini
age = current_year - birth_year
```

Komentar tersebut memberikan konteks mengenai alasan logika tersebut digunakan.

Bandingkan dengan:

```python
# Mengurangi current_year dengan birth_year
age = current_year - birth_year
```

Komentar kedua hanya mengulang apa yang sudah terlihat dari kode.

---

## 10. Contoh Komentar yang Kurang Baik

```python
# Menyimpan nama
name = "Andrei"

# Menyimpan umur
age = 25

# Mencetak nama
print(name)

# Mencetak umur
print(age)
```

Kode tersebut tidak salah, tetapi komentarnya tidak memberikan informasi tambahan yang berarti.

Kode sudah cukup jelas dari nama variable dan instruksi yang digunakan.

---

## 11. Contoh Komentar yang Lebih Berguna

Komentar lebih berguna ketika memberikan konteks.

Contohnya:

```python
# Sistem menggunakan tahun berjalan sebagai dasar perhitungan umur
age = current_year - birth_year
```

Komentar tersebut menjelaskan alasan dari logika yang digunakan.

Contoh lain:

```python
# Data dikonversi ke integer karena input() selalu menghasilkan string
birth_year = int(input("What year were you born? "))
```

Komentar memberikan informasi yang mungkin belum terlihat langsung dari kode.

---

## 12. Komentar dan Clean Code

Komentar bukan pengganti **clean code**.

Urutan yang baik adalah:

```text
Tulis kode yang jelas
        ↓
Gunakan nama yang deskriptif
        ↓
Buat struktur kode yang sederhana
        ↓
Tambahkan komentar jika memang diperlukan
```

Jangan menggunakan komentar untuk menutupi kode yang sulit dipahami.

Misalnya:

```python
# Menghitung sesuatu
x = a * b + c / d
```

Lebih baik memperjelas kode jika memungkinkan:

```python
total_price = product_price * quantity + shipping_cost
```

Dengan demikian, kode dapat dipahami tanpa komentar tambahan.

---

## 13. Komentar sebagai Dokumentasi

Dalam project yang lebih besar, komentar dapat membantu memberikan konteks kepada programmer lain.

Misalnya:

```python
# Harga disimpan dalam satuan rupiah untuk menghindari
# perbedaan pembulatan ketika melakukan perhitungan.
price = 150000
```

Komentar tersebut memberikan informasi mengenai keputusan desain yang tidak langsung terlihat dari kode.

---

## 14. Komentar yang Baik

Komentar yang baik biasanya:

- Singkat.
- Relevan.
- Mudah dipahami.
- Tidak menjelaskan sesuatu yang sudah jelas.
- Memberikan konteks ketika diperlukan.
- Menjelaskan alasan dari keputusan tertentu.
- Tidak menjadi pengganti kode yang bersih.

Contoh:

```python
# Konversi diperlukan karena input() menghasilkan string
birth_year = int(input("What year were you born? "))
```

---

## 15. Komentar yang Tidak Perlu

Hindari komentar seperti:

```python
# Membuat variable age
age = 25

# Menambahkan 1
age = age + 1

# Mencetak age
print(age)
```

Kode tersebut sudah cukup jelas.

Lebih baik:

```python
age = 25

age += 1

print(age)
```

---

## 16. Contoh Penggunaan dalam Program

Berikut contoh sederhana penggunaan komentar:

```python
# Meminta tahun lahir pengguna
birth_year = input("What year were you born? ")

# Input dikonversi menjadi integer untuk perhitungan
age = 2026 - int(birth_year)

print(f"Your age is: {age}")
```

Komentar digunakan pada bagian yang membutuhkan konteks.

Tidak semua baris harus diberikan komentar.

---

## 17. Komentar dan Debugging

Ketika melakukan debugging, programmer terkadang perlu menonaktifkan bagian tertentu dari kode.

Contohnya:

```python
print("Start")

# print("Debug information")

print("Finish")
```

Dengan menambahkan `#`, baris tersebut tidak dieksekusi.

Setelah debugging selesai, komentar tersebut dapat dihapus atau kode dapat dikembalikan seperti semula.

---

## 18. Ringkasan

| Konsep | Penjelasan |
| --- | --- |
| `#` | Digunakan untuk membuat komentar |
| Comment | Teks yang tidak dieksekusi sebagai instruksi program |
| Inline comment | Komentar yang ditulis setelah kode |
| Debugging | Komentar dapat digunakan untuk menonaktifkan kode sementara |
| Clean code | Kode sebaiknya sudah mudah dipahami sebelum diberi komentar |

---

## Kesimpulan

Komentar merupakan bagian penting dalam pengembangan software karena dapat membantu programmer memahami kode dan memberikan konteks tambahan.

Di Python, komentar dibuat menggunakan:

```python
# komentar
```

Komentar dapat digunakan untuk:

- Memberikan penjelasan.
- Memberikan konteks.
- Menjelaskan alasan suatu logika.
- Membantu proses debugging.
- Membantu programmer lain memahami kode.

Namun, komentar sebaiknya digunakan secara **bijak**.

Kode yang baik seharusnya sudah memiliki nama variable dan struktur yang mudah dipahami.

:::tip
**Tulis kode yang jelas terlebih dahulu, kemudian gunakan komentar untuk menjelaskan hal yang memang membutuhkan konteks tambahan.**
:::