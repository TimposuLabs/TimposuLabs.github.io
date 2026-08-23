---
sidebar_position: 5
---

# Python Functional Programming

Setelah mempelajari Object-Oriented Programming atau OOP, kita akan mengenal paradigma pemrograman lain yang juga dapat digunakan dalam Python, yaitu **Functional Programming**.

Functional Programming atau **pemrograman fungsional** adalah paradigma pemrograman yang menjadikan **function sebagai bagian utama dalam membangun dan mengorganisasi program**.

Jika OOP berfokus pada object yang memiliki data dan perilaku, Functional Programming lebih menekankan pada:

- Function.
- Data.
- Proses transformasi data.
- Hasil dari suatu function.
- Mengurangi perubahan state yang tidak diperlukan.

Python merupakan bahasa pemrograman yang mendukung beberapa paradigma pemrograman, termasuk:

```text
Procedural Programming
Object-Oriented Programming
Functional Programming
```

Artinya, programmer dapat memilih pendekatan yang sesuai dengan permasalahan yang sedang dihadapi.

---

## Apa Itu Functional Programming?

Functional Programming adalah paradigma pemrograman yang memandang proses komputasi sebagai **transformasi data menggunakan function**.

Secara sederhana, kita dapat membayangkan sebuah proses:

```text
Input
  │
  ↓
Function
  │
  ↓
Output
```

Sebuah function menerima data, melakukan suatu proses, kemudian menghasilkan data baru.

Pendekatan ini mendorong kita untuk membuat function yang memiliki tanggung jawab yang jelas dan dapat digunakan kembali.

---

## Functional Programming Bukan Berarti Python Hanya Menggunakan Function

Python tidak sepenuhnya merupakan bahasa functional programming.

Python adalah bahasa **multi-paradigm**, yang berarti Python mendukung berbagai gaya pemrograman.

Kita dapat menulis program secara prosedural:

```text
Program
│
├── statement
├── statement
├── statement
└── statement
```

Menggunakan OOP:

```text
Program
│
├── Class
│   ├── Attribute
│   └── Method
│
└── Object
```

Atau menggunakan pendekatan functional programming:

```text
Data
 │
 ↓
Function
 │
 ↓
Data baru
```

Ketiga pendekatan tersebut dapat digunakan dalam satu aplikasi Python.

---

## Mengapa Mempelajari Functional Programming?

Ketika program semakin besar, kita tidak hanya membutuhkan kemampuan untuk menulis kode yang berjalan.

Kita juga membutuhkan cara untuk membuat kode yang:

- Mudah dipahami.
- Mudah diuji.
- Dapat digunakan kembali.
- Mudah dikembangkan.
- Memiliki tanggung jawab yang jelas.
- Mengurangi efek samping yang tidak diperlukan.

Functional Programming memberikan cara berpikir yang berbeda dalam mencapai tujuan tersebut.

Dengan memahami Functional Programming, kita dapat memilih pendekatan yang lebih tepat untuk jenis permasalahan tertentu.

---

## Function sebagai Bagian Utama

Dalam pendekatan functional programming, **function menjadi salah satu komponen utama program**.

Function dapat dipandang sebagai sebuah proses yang menerima input dan menghasilkan output.

Secara konsep:

```text
Input
  │
  ↓
┌──────────┐
│ Function │
└──────────┘
  │
  ↓
Output
```

Contohnya dalam kehidupan sehari-hari:

```text
Data Produk
     │
     ↓
 Proses Filter
     │
     ↓
Produk yang memenuhi kondisi
```

Atau:

```text
Data Penjualan
     │
     ↓
 Proses Perhitungan
     │
     ↓
Total Penjualan
```

Pendekatan seperti ini membantu kita melihat program sebagai kumpulan proses transformasi data.

---

## Pure Function

Salah satu konsep penting dalam Functional Programming adalah **pure function**.

Pure function adalah function yang menghasilkan output berdasarkan input yang diberikan dan tidak bergantung pada perubahan state dari luar function.

Secara konsep:

```text
Input yang sama
      │
      ↓
Pure Function
      │
      ↓
Output yang sama
```

Misalnya sebuah function untuk menghitung luas:

```text
panjang = 10
lebar = 5

        ↓

Function

        ↓

luas = 50
```

Jika input yang diberikan sama, hasil yang diperoleh juga seharusnya sama.

Konsep ini membuat function lebih mudah dipahami dan diuji.

---

## Side Effect

Dalam Functional Programming, kita juga perlu memahami konsep **side effect**.

Side effect terjadi ketika sebuah function tidak hanya menghasilkan nilai, tetapi juga menyebabkan perubahan pada sesuatu di luar dirinya.

Contohnya:

```text
Function
   │
   ├── menghasilkan output
   │
   └── mengubah data di luar function
```

Perubahan tersebut dapat berupa:

- Mengubah variabel global.
- Mengubah object yang digunakan bersama.
- Menulis file.
- Mengirim data melalui network.
- Mengubah database.
- Menampilkan sesuatu ke layar.

Side effect tidak selalu buruk.

Dalam aplikasi nyata, side effect tetap diperlukan.

Namun, Functional Programming mendorong kita untuk **mengontrol dan membatasi side effect** agar program lebih mudah dipahami.

---

## Immutability

Konsep lain yang sering dikaitkan dengan Functional Programming adalah **immutability**.

Immutability berarti sebuah data tidak diubah secara langsung setelah dibuat.

Daripada:

```text
Data lama
   │
   ↓
Diubah
   │
   ↓
Data yang sama berubah
```

pendekatan immutable lebih menekankan:

```text
Data lama
   │
   ↓
Function
   │
   ↓
Data baru
```

Dengan demikian, data sebelumnya tetap dapat dipertahankan.

Pendekatan ini dapat membantu mengurangi masalah yang muncul akibat perubahan data secara tidak terduga.

---

## Transformasi Data

Functional Programming sangat cocok untuk permasalahan yang berhubungan dengan transformasi data.

Misalnya kita memiliki:

```text
Data Awal
   │
   ↓
Filter
   │
   ↓
Data hasil filter
   │
   ↓
Transformasi
   │
   ↓
Data hasil transformasi
```

Contoh dalam dunia nyata:

```text
Daftar Produk
     │
     ↓
Pilih produk aktif
     │
     ↓
Ambil harga
     │
     ↓
Hitung total
```

Setiap tahap dapat dipandang sebagai proses yang melakukan transformasi terhadap data.

---

## Reusability Function

Functional Programming juga mendorong pembuatan function yang dapat digunakan kembali.

Daripada menulis proses yang sama berkali-kali:

```text
Program A
└── proses yang sama

Program B
└── proses yang sama

Program C
└── proses yang sama
```

kita dapat membuat satu function yang bertanggung jawab terhadap proses tersebut:

```text
             Function
                │
        ┌───────┼───────┐
        ↓       ↓       ↓
     Program A Program B Program C
```

Hal ini membantu menerapkan prinsip **DRY (Don't Repeat Yourself)**.

---

## Function sebagai Data

Python memiliki kemampuan yang membuat function dapat diperlakukan seperti sebuah nilai.

Secara konsep, function dapat:

- Disimpan.
- Diberikan kepada function lain.
- Dikembalikan dari function.
- Digunakan sebagai bagian dari proses pengolahan data.

Kemampuan ini menjadi salah satu dasar penting Functional Programming di Python.

Konsep tersebut nantinya akan membawa kita kepada topik seperti **higher-order function**.

---

## Higher-Order Function

**Higher-order function** adalah function yang dapat menerima function sebagai input atau menghasilkan function sebagai output.

Secara konsep:

```text
Function A
    │
    ↓
Function B
    │
    ↓
Function C
```

Atau:

```text
Function
   │
   ├── menerima function
   │
   └── menghasilkan function
```

Kemampuan ini memungkinkan kita membuat program dengan struktur yang lebih fleksibel.

Konsep higher-order function akan menjadi dasar untuk memahami berbagai fitur functional programming di Python.

---

## Functional Programming dan Data Processing

Functional Programming sangat sering digunakan ketika bekerja dengan data.

Misalnya kita memiliki:

```text
Data
 │
 ├── Filter
 │
 ├── Transform
 │
 └── Aggregate
```

Setiap proses dapat memiliki tanggung jawab yang jelas.

Pendekatan ini dapat digunakan dalam berbagai kebutuhan seperti:

- Pengolahan data.
- Analisis data.
- Backend application.
- Data processing.
- Automation.
- Scientific computing.
- Pemrosesan koleksi data.

---

## Functional Programming dalam Python

Python menyediakan berbagai fitur yang mendukung gaya Functional Programming.

Beberapa konsep yang nantinya akan dipelajari antara lain:

- First-class function.
- Higher-order function.
- Pure function.
- Immutability.
- `map`.
- `filter`.
- `reduce`.
- Lambda expression.
- Function composition.
- Generator.
- Iterator.

Namun, konsep-konsep tersebut sebaiknya dipelajari secara bertahap.

Tujuan utamanya bukan menghafal berbagai fungsi atau syntax, tetapi memahami **cara berpikir functional programming**.

---

## Functional Programming vs OOP

Functional Programming dan OOP memiliki cara pandang yang berbeda dalam mengorganisasi program.

Secara sederhana:

| OOP | Functional Programming |
|---|---|
| Berfokus pada object | Berfokus pada function |
| Data dan perilaku dikelompokkan | Data diproses melalui function |
| Object memiliki state | Mengurangi perubahan state |
| Banyak menggunakan encapsulation | Banyak menggunakan transformasi data |
| Inheritance dapat digunakan | Function composition sering digunakan |

Keduanya bukan pendekatan yang saling bertentangan.

Dalam Python, kita bahkan dapat menggunakan keduanya dalam satu aplikasi.

---

## Functional Programming dan OOP Dapat Digabungkan

Python memungkinkan kita menggunakan OOP dan Functional Programming secara bersamaan.

Misalnya sebuah aplikasi dapat menggunakan:

```text
Class
 │
 ├── menyimpan struktur object
 │
 └── Method

Function
 │
 ├── memproses data
 │
 └── menghasilkan data baru
```

Dengan demikian, kita tidak harus memilih salah satu paradigma untuk seluruh aplikasi.

Kita dapat menggunakan pendekatan yang paling sesuai untuk setiap bagian program.

---

## Cara Berpikir Functional Programming

Salah satu perubahan penting ketika mempelajari Functional Programming adalah cara kita melihat sebuah permasalahan.

Daripada hanya bertanya:

> Object apa yang harus saya buat?

kita juga mulai bertanya:

> Data apa yang saya miliki?

> Transformasi apa yang perlu dilakukan terhadap data tersebut?

> Function apa yang bertanggung jawab terhadap setiap proses?

> Apakah proses tersebut dapat dibuat independen?

> Apakah function dapat digunakan kembali?

Cara berpikir tersebut membantu kita merancang program dengan struktur yang lebih modular.

---

## Contoh Gambaran Masalah

Misalnya kita memiliki data:

```text
10
20
30
40
50
```

Kita ingin:

1. Memilih angka tertentu.
2. Mengubah nilainya.
3. Menghasilkan hasil akhir.

Secara konsep:

```text
Data
 │
 ↓
Filter
 │
 ↓
Transform
 │
 ↓
Result
```

Setiap tahap dapat dipandang sebagai sebuah proses yang memiliki tanggung jawab tertentu.

Pendekatan ini menjadi dasar penting dalam functional programming.

---

## Kapan Functional Programming Berguna?

Functional Programming sangat berguna ketika program banyak melakukan:

- Transformasi data.
- Pemrosesan collection.
- Filtering data.
- Mapping data.
- Perhitungan.
- Pipeline data.
- Pemrosesan data secara bertahap.

Namun, bukan berarti seluruh aplikasi harus ditulis menggunakan gaya functional programming.

Pemilihan paradigma tetap bergantung pada kebutuhan aplikasi.

---

## Tujuan Pembelajaran

Setelah memahami pengantar Functional Programming, kita akan mempelajari konsep-konsep berikut secara bertahap:

- Memahami function sebagai first-class object.
- Memahami pure function.
- Memahami side effect.
- Memahami immutability.
- Memahami higher-order function.
- Memahami lambda expression.
- Memahami `map`.
- Memahami `filter`.
- Memahami `reduce`.
- Memahami function composition.
- Memahami iterator dan generator.
- Menggabungkan Functional Programming dengan konsep Python lainnya.

---

## Kesimpulan

**Functional Programming** adalah paradigma pemrograman yang menempatkan **function dan transformasi data** sebagai bagian utama dalam membangun program.

Python mendukung Functional Programming bersama dengan paradigma lain seperti Procedural Programming dan Object-Oriented Programming.

Beberapa konsep penting dalam Functional Programming adalah:

```text
Function
   ↓
Pure Function
   ↓
Immutability
   ↓
Higher-Order Function
   ↓
Data Transformation
```

Tujuan mempelajari Functional Programming bukan sekadar mempelajari syntax baru, tetapi memahami cara membuat program yang:

- Lebih modular.
- Mudah diuji.
- Dapat digunakan kembali.
- Lebih mudah dipahami.
- Mengurangi perubahan state yang tidak diperlukan.
- Efektif untuk berbagai proses transformasi data.

Setelah memahami konsep dasar ini, pembelajaran selanjutnya dapat dimulai dari **First-Class Function di Python**, yaitu memahami bagaimana function dapat diperlakukan sebagai sebuah nilai di dalam program.