---
sidebar_position: 4
title: "Python 2 vs Python 3"
---

Python memiliki dua versi utama yang pernah digunakan secara luas, yaitu **Python 2** dan **Python 3**.

Python 2 merupakan versi Python yang sangat populer pada masanya. Namun, Python 2 sudah tidak lagi dikembangkan secara resmi dan dukungan resminya telah dihentikan.

Python 3 merupakan penerus Python 2 dan menjadi versi Python yang digunakan untuk pengembangan modern.

Bagi yang baru belajar Python, **Python 3 adalah pilihan yang harus digunakan**.

---

## 1. Sejarah Singkat Python 2 dan Python 3

Python 2 pertama kali dirilis pada tahun **2000** dan kemudian digunakan secara luas dalam berbagai proyek perangkat lunak.

Seiring perkembangan bahasa, muncul kebutuhan untuk melakukan perubahan besar yang tidak dapat dilakukan secara sepenuhnya kompatibel dengan Python 2.

Karena itu, Python 3 diperkenalkan pada tahun **2008**.

Python 3 membawa berbagai perbaikan dan perubahan desain. Namun, beberapa perubahan tersebut menyebabkan kode Python 2 tidak selalu dapat dijalankan langsung menggunakan Python 3.

Untuk memberikan waktu kepada developer melakukan migrasi, Python 2 dan Python 3 sempat digunakan secara bersamaan selama beberapa tahun.

Pada akhirnya, dukungan resmi Python 2 dihentikan pada **1 Januari 2020**.

---

## 2. Python 2 Sudah Tidak Digunakan untuk Pengembangan Baru

Python 2 sudah mencapai **End of Life (EOL)**.

Artinya, Python 2 tidak lagi menerima:

- Perbaikan bug resmi.
- Security update resmi.
- Pengembangan fitur baru.
- Dukungan resmi dari komunitas Python modern.

Karena itu, menggunakan Python 2 untuk proyek baru tidak direkomendasikan.

Python 3 menjadi standar untuk pengembangan Python modern.

---

## 3. Perbedaan Sintaks

Salah satu perbedaan yang paling mudah dilihat antara Python 2 dan Python 3 adalah cara menggunakan `print`.

### Python 2

Pada Python 2, `print` dapat digunakan sebagai statement:

```python
print "Hello Python"
```

### Python 3

Pada Python 3, `print` merupakan function:

```python
print("Hello Python")
```

Perubahan ini merupakan salah satu contoh bahwa kode Python 2 tidak selalu dapat langsung digunakan pada Python 3.

---

## 4. Perbedaan Pembagian Angka

Python 2 dan Python 3 juga memiliki perbedaan dalam operasi pembagian bilangan bulat.

### Python 2

Pada Python 2:

```python
5 / 2
```

menghasilkan:

```text
2
```

Sedangkan pada Python 3:

```python
5 / 2
```

menghasilkan:

```text
2.5
```

Jika ingin melakukan pembagian bilangan bulat pada Python 3, kita dapat menggunakan operator `//`.

```python
5 // 2
```

Hasilnya:

```text
2
```

Perubahan ini membuat perilaku operasi pembagian menjadi lebih intuitif untuk penggunaan umum.

---

## 5. String dan Unicode

Python 3 memiliki dukungan Unicode yang lebih baik dan lebih konsisten.

Unicode memungkinkan program menangani berbagai karakter dan bahasa di seluruh dunia.

Contohnya:

```python
nama = "Budi"
pesan = "Selamat belajar Python"
```

Python 3 dirancang dengan dukungan Unicode sebagai bagian penting dari sistem string.

Hal ini sangat membantu ketika aplikasi harus menangani teks dari berbagai bahasa.

---

## 6. Library dan Ekosistem

Salah satu alasan utama untuk menggunakan Python 3 adalah perkembangan ekosistem Python modern.

Library dan framework baru umumnya dikembangkan untuk Python 3.

Banyak library modern sudah:

- Menghentikan dukungan Python 2.
- Menggunakan fitur khusus Python 3.
- Menyediakan dokumentasi hanya untuk Python 3.

Karena itu, ketika mempelajari library atau framework Python modern, hampir selalu kita akan menggunakan Python 3.

---

## 7. Perbedaan Sintaks Lainnya

Selain `print`, terdapat berbagai perubahan sintaks dan perilaku lainnya.

Contohnya adalah penggunaan `input()`.

### Python 2

Python 2 memiliki perbedaan perilaku antara `input()` dan `raw_input()`.

### Python 3

Python 3 menyederhanakan penggunaan input dengan menggunakan:

```python
nama = input("Nama: ")
```

Perubahan seperti ini membuat beberapa bagian bahasa menjadi lebih konsisten dan mudah dipahami.

---

## 8. Python 2 vs Python 3

Secara umum, perbedaannya dapat dirangkum sebagai berikut:

| Aspek | Python 2 | Python 3 |
| --- | --- | --- |
| Tahun rilis | 2000 | 2008 |
| Status | End of Life | Aktif dikembangkan |
| Dukungan resmi | Tidak tersedia | Tersedia |
| `print` | Statement | Function |
| Pembagian `/` | Perilaku berbeda untuk integer | Menghasilkan pembagian sebenarnya |
| Unicode | Dukungan lebih terbatas | Unicode menjadi bagian penting |
| Library modern | Dukungan semakin terbatas | Dukungan utama |
| Proyek baru | Tidak direkomendasikan | Direkomendasikan |
| Pembelajaran | Tidak disarankan | Pilihan utama |

---

## 9. Mengapa Python 3 Menjadi Standar?

Python 3 bukan hanya versi baru dari Python 2.

Python 3 dirancang untuk memperbaiki beberapa keputusan desain dan keterbatasan yang terdapat pada Python 2.

Selain itu, Python 3 terus mendapatkan perkembangan dan fitur baru.

Saat ini ekosistem Python modern seperti:

- Web Development
- Data Science
- Machine Learning
- Artificial Intelligence
- Automation
- Cybersecurity

umumnya menggunakan Python 3.

---

## 10. Apakah Perlu Belajar Python 2?

Untuk pemula, **tidak perlu mempelajari Python 2**.

Fokuslah pada Python 3.

Python 2 mungkin masih ditemukan ketika bekerja dengan sistem lama atau aplikasi legacy. Dalam kondisi tersebut, pemahaman mengenai Python 2 dapat membantu proses maintenance atau migrasi.

Namun, untuk belajar pemrograman Python dari awal, mempelajari Python 2 justru dapat menimbulkan kebingungan karena terdapat perbedaan sintaks dan perilaku.

---

## 11. Bagaimana Jika Menemukan Tutorial Python 2?

Ketika belajar dari internet, buku lama, atau video tutorial, kita mungkin menemukan contoh kode yang menggunakan Python 2.

Jangan langsung menganggap contoh tersebut salah.

Perhatikan terlebih dahulu versi Python yang digunakan oleh tutorial tersebut.

Misalnya:

```python
print "Hello World"
```

Jika kode tersebut berasal dari tutorial Python 2, maka sintaks tersebut memang valid untuk Python 2.

Dalam Python 3, bentuk yang digunakan adalah:

```python
print("Hello World")
```

Karena itu, selalu perhatikan **versi Python** ketika mengikuti tutorial atau membaca dokumentasi.

---

## 12. Python yang Digunakan dalam Pembelajaran

Dalam pembelajaran ini, kita akan menggunakan **Python 3**.

Hal ini karena:

- Python 3 merupakan versi modern Python.
- Python 2 sudah tidak mendapatkan dukungan resmi.
- Library modern berfokus pada Python 3.
- Framework modern menggunakan Python 3.
- Dokumentasi Python saat ini berfokus pada Python 3.
- Python 3 merupakan pilihan yang tepat untuk memulai belajar Python.

Dengan menggunakan Python 3 sejak awal, kita dapat membangun fondasi yang relevan dengan ekosistem Python modern.

---

## Kesimpulan

Python 2 dan Python 3 merupakan dua generasi utama Python yang pernah digunakan secara luas.

Python 2 memiliki sejarah penting dalam perkembangan Python, tetapi versi tersebut sudah mencapai **End of Life** sejak tahun 2020.

Python 3 adalah versi yang digunakan untuk pengembangan Python modern.

Secara sederhana:

```text
Python 2
   ↓
End of Life
   ↓
Tidak digunakan untuk proyek baru


Python 3
   ↓
Aktif dikembangkan
   ↓
Ekosistem modern
   ↓
Pilihan untuk belajar Python
```

Jadi, jika Anda baru mulai belajar Python:

:::tip
**Gunakan Python 3 dan fokus pada ekosistem Python modern.**
:::

Memahami perbedaan Python 2 dan Python 3 tetap penting, terutama agar kita dapat mengenali kode lama ketika menemukannya dalam tutorial, dokumentasi lama, atau proyek legacy.