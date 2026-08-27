---
sidebar_position: 8
---

# Python Generators

Dalam pemrograman, kita sering bekerja dengan sekumpulan data yang perlu diproses satu per satu. Cara sederhana adalah menyimpan seluruh data tersebut di dalam sebuah struktur data seperti `list`. Namun, ketika jumlah data yang diproses sangat besar, pendekatan tersebut dapat menggunakan lebih banyak memory karena seluruh data harus tersedia sekaligus.

Python menyediakan konsep **Generator** sebagai salah satu cara untuk menangani proses seperti ini dengan lebih efisien.

Generator memungkinkan program menghasilkan data **secara bertahap**, yaitu hanya menghasilkan nilai ketika nilai tersebut dibutuhkan. Pendekatan ini berbeda dengan membuat seluruh hasil terlebih dahulu kemudian menyimpannya di memory.

## Apa Itu Generator?

**Generator** adalah mekanisme di Python yang digunakan untuk menghasilkan nilai secara **bertahap dan satu per satu**, bukan menghasilkan seluruh nilai sekaligus.

Konsep ini sangat berguna ketika kita bekerja dengan:

- Data dalam jumlah besar.
- Data yang diproses secara bertahap.
- Sequence yang panjang atau bahkan tidak terbatas.
- Proses yang tidak membutuhkan seluruh hasil sekaligus.
- Data yang dapat diproses satu per satu.

Secara sederhana, perbedaan pendekatannya dapat digambarkan seperti berikut:

```text
Pendekatan biasa:

Data
 ↓
Proses seluruh data
 ↓
Semua hasil disimpan
 ↓
Digunakan


Generator:

Data
 ↓
Hasil pertama
 ↓
Hasil berikutnya
 ↓
Hasil berikutnya
 ↓
...
```

Generator memungkinkan proses tersebut dilakukan secara **lazy**, yaitu pekerjaan dilakukan ketika hasilnya benar-benar diperlukan.

## Mengapa Generator Penting?

Bayangkan sebuah program harus memproses **jutaan data**.

Jika seluruh hasil dibuat sekaligus, program mungkin membutuhkan memory yang besar untuk menyimpan semua hasil tersebut.

Generator menggunakan pendekatan yang berbeda.

Daripada:

```text
1 → 2 → 3 → 4 → 5 → ... → 1.000.000
```

dibuat dan disimpan sekaligus, generator dapat menghasilkan:

```text
1
↓
2
↓
3
↓
4
↓
...
```

Nilai berikutnya hanya dihasilkan ketika program membutuhkannya.

Pendekatan ini dapat membuat pemrosesan data menjadi lebih **hemat memory**.

## Generator dan Lazy Evaluation

Generator berkaitan erat dengan konsep **lazy evaluation**.

Lazy evaluation berarti sebuah nilai tidak langsung dihitung atau dihasilkan sampai nilai tersebut benar-benar diperlukan.

Dengan pendekatan ini, program tidak harus mempersiapkan seluruh hasil di awal.

Hal tersebut sangat berguna ketika:

- Data berukuran besar.
- Proses menghasilkan banyak data.
- Hanya sebagian data yang diperlukan.
- Data berasal dari sumber yang terus menghasilkan informasi.

## Generator dalam Pemrosesan Data

Generator sering digunakan dalam proses yang memiliki pola:

```text
Ambil data
   ↓
Proses data
   ↓
Hasilkan satu nilai
   ↓
Ambil data berikutnya
   ↓
Proses
   ↓
Hasilkan nilai berikutnya
```

Pendekatan seperti ini sangat sesuai dengan pemrosesan data secara bertahap.

Misalnya, sebuah aplikasi perlu membaca data dalam jumlah besar. Tidak selalu diperlukan untuk memasukkan seluruh data ke memory sebelum proses dimulai.

Dengan generator, data dapat diproses secara bertahap.

## Generator dan Iterable

Generator juga memiliki hubungan erat dengan konsep **iterable** dan **iterator**.

Dalam Python, banyak objek yang dapat diproses satu per satu menggunakan perulangan.

Generator menyediakan cara untuk menghasilkan nilai secara bertahap sehingga dapat digunakan dalam berbagai proses yang bekerja dengan iterable.

Hubungan konsepnya dapat digambarkan:

```text
Iterable
   ↓
Iterator
   ↓
Generator
```

Generator dapat dipandang sebagai salah satu cara praktis untuk membuat mekanisme yang menghasilkan nilai secara bertahap.

## Generator dalam Functional Programming

Generator juga memiliki hubungan dengan konsep yang telah dipelajari sebelumnya dalam **Functional Programming**.

Pada Functional Programming, kita sering bekerja dengan data secara bertahap menggunakan konsep seperti:

- Iterable.
- Iterator.
- `map()`.
- `filter()`.
- `zip()`.
- Lazy evaluation.

Generator melanjutkan konsep tersebut dengan menyediakan mekanisme untuk menghasilkan data **satu per satu ketika dibutuhkan**.

Karena itu, memahami generator akan membantu ketika bekerja dengan pipeline pemrosesan data yang panjang atau berukuran besar.

## Generator dalam Data Processing

Generator sangat relevan dalam pengolahan data karena data yang diproses tidak selalu berukuran kecil.

Dalam bidang seperti **Data Science** dan **Data Mining**, kita dapat menemukan dataset dengan jumlah record yang sangat besar.

Daripada selalu memuat seluruh data ke memory, pemrosesan dapat dilakukan secara bertahap apabila kebutuhan aplikasinya memungkinkan.

Contoh alur konseptual:

```text
Dataset besar
     ↓
Ambil sebagian data
     ↓
Proses
     ↓
Hasil
     ↓
Ambil data berikutnya
     ↓
Proses kembali
```

Pendekatan seperti ini membantu membuat program lebih efisien dalam penggunaan memory.

## Kapan Menggunakan Generator?

Generator cocok digunakan ketika:

- Data yang diproses cukup besar.
- Data tidak perlu tersedia seluruhnya sekaligus.
- Hasil dapat dihasilkan satu per satu.
- Kita ingin mengurangi penggunaan memory.
- Proses membutuhkan lazy evaluation.
- Data berasal dari proses yang menghasilkan nilai secara bertahap.

Namun, generator bukan berarti selalu lebih baik daripada `list`.

Jika data berukuran kecil dan seluruh hasil memang dibutuhkan sekaligus, menggunakan struktur data biasa seperti `list` sering kali lebih sederhana dan mudah dipahami.

## Generator dalam Python

Python menyediakan berbagai mekanisme yang mendukung konsep generator dan pemrosesan data secara lazy.

Pada materi berikutnya, kita akan mempelajari bagaimana generator dibuat dan bagaimana Python menghasilkan nilai secara bertahap.

Pembahasan akan dilanjutkan dengan konsep seperti:

- `yield`.
- Generator function.
- Generator object.
- Perbedaan generator dengan function biasa.
- Generator dan iterator.
- Lazy evaluation.
- Penggunaan generator untuk pemrosesan data.

## Kesimpulan

Generator merupakan salah satu fitur penting Python untuk **menghasilkan dan memproses data secara bertahap**.

Berbeda dengan pendekatan yang menghasilkan seluruh data sekaligus, generator memungkinkan nilai dihasilkan **ketika dibutuhkan**.

Konsep utamanya dapat diringkas sebagai:

```text
Data
 ↓
Generator
 ↓
Nilai dihasilkan satu per satu
 ↓
Diproses ketika dibutuhkan
```

Dengan memahami generator, kita dapat membangun program yang lebih efisien dalam menangani data, terutama ketika bekerja dengan sequence yang besar atau proses yang menghasilkan banyak nilai.

Generator juga menjadi konsep penting untuk memahami **iterator, lazy evaluation, dan pemrosesan data secara efisien** di Python.