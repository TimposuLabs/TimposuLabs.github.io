---
sidebar_position: 2
title: "Cara Kerja Python"
---

## Memahami Cara Kerja Python dan Implementasinya

Sebelum mulai menulis banyak program Python, penting untuk memahami bagaimana Python bekerja di balik layar.

Ketika kita menulis kode Python, kode tersebut tidak langsung dijalankan oleh perangkat keras komputer. Terdapat beberapa proses yang terjadi mulai dari **source code**, proses penerjemahan, hingga eksekusi oleh Python.

Pada materi ini kita akan memahami tiga hal utama:

1. Perbedaan antara spesifikasi bahasa dan implementasi Python.
2. Berbagai implementasi Python.
3. Bagaimana kode Python dieksekusi.

---

## 1. Spesifikasi Bahasa vs Implementasi

Salah satu konsep penting dalam memahami Python adalah membedakan antara **spesifikasi bahasa** dan **implementasi bahasa**.

### Spesifikasi Bahasa

**Language Specification** adalah kumpulan aturan yang menjelaskan bagaimana sebuah bahasa pemrograman seharusnya bekerja.

Spesifikasi menentukan berbagai hal seperti:

- Sintaks bahasa.
- Keyword yang tersedia.
- Aturan penulisan program.
- Bagaimana struktur tertentu bekerja.
- Perilaku yang diharapkan dari bahasa tersebut.

Sebagai contoh, Python memiliki berbagai keyword seperti `def`, `if`, `else`, `for`, dan `while`.

Spesifikasi bahasa menjelaskan aturan bagaimana berbagai elemen tersebut digunakan.

Dengan kata lain:

> **Spesifikasi menjelaskan aturan bahasa pemrograman.**

### Implementasi Bahasa

Spesifikasi saja tidak cukup untuk menjalankan program.

Kita membutuhkan sebuah **implementasi** yang menerapkan aturan tersebut sehingga program Python dapat dijalankan oleh komputer.

Implementasi bertugas memproses kode yang kita tulis sehingga komputer dapat menjalankan instruksi tersebut.

Secara sederhana:

```text
Spesifikasi
    ↓
Aturan Bahasa Python
    ↓
Implementasi Python
    ↓
Program dapat dijalankan
```

Jadi, **Python sebagai bahasa** dan **program yang menjalankan Python** merupakan dua hal yang berbeda.

---

## 2. Implementasi Python

Ketika kita mengunduh Python dari situs resminya, implementasi yang paling umum kita gunakan adalah **CPython**.

Namun, CPython bukan satu-satunya implementasi Python.

Beberapa implementasi Python yang dikenal antara lain:

### CPython

**CPython** adalah implementasi Python yang paling umum digunakan.

CPython ditulis terutama menggunakan bahasa **C** dan menjadi implementasi referensi Python.

Ketika kita menginstal Python dari distribusi resmi Python, umumnya kita menggunakan CPython.

CPython juga merupakan implementasi yang digunakan oleh sebagian besar programmer Python dalam pengembangan aplikasi sehari-hari.

### Jython

**Jython** adalah implementasi Python yang dibuat menggunakan bahasa Java.

Jython memungkinkan kode Python berjalan di atas **Java Virtual Machine (JVM)**.

Hal ini memungkinkan Python berinteraksi dengan ekosistem dan library Java.

Secara sederhana:

```text
Python Code
     ↓
   Jython
     ↓
     JVM
     ↓
 Java Ecosystem
```

### PyPy

**PyPy** merupakan implementasi Python yang memiliki fokus pada performa.

PyPy menggunakan teknologi **Just-In-Time (JIT) compilation** untuk meningkatkan kecepatan eksekusi pada kondisi tertentu.

PyPy sendiri banyak menggunakan Python dalam implementasinya.

Tujuan utamanya adalah menyediakan alternatif Python yang dapat memberikan performa lebih tinggi untuk jenis workload tertentu.

### IronPython

**IronPython** adalah implementasi Python yang dirancang untuk berjalan pada ekosistem **.NET**.

Dengan IronPython, kode Python dapat berinteraksi dengan teknologi dan library yang tersedia dalam lingkungan .NET.

Secara sederhana:

```text
Python Code
     ↓
 IronPython
     ↓
 .NET Runtime
     ↓
.NET Ecosystem
```

---

## 3. Bagaimana Python Menjalankan Program?

Sekarang kita dapat melihat bagaimana sebuah program Python dijalankan.

Misalnya kita memiliki sebuah file Python:

```text
program.py
```

File tersebut berisi **source code** yang ditulis oleh programmer.

Ketika program dijalankan, terdapat beberapa tahapan yang terjadi.

### Tahap 1 - Source Code

Programmer menulis kode Python dalam sebuah file dengan ekstensi `.py`.

Contohnya:

```python
print("Hello Python")
```

Kode tersebut disebut **source code**.

Source code merupakan kode yang ditulis dan dapat dibaca oleh manusia.

### Tahap 2 - Python Interpreter

Ketika program dijalankan, implementasi Python seperti CPython akan memproses source code tersebut.

Interpreter bertugas memahami kode Python dan menjalankan instruksi yang terdapat di dalamnya.

Pada CPython, proses eksekusi tidak sesederhana membaca setiap baris kemudian langsung meneruskannya ke CPU.

CPython memiliki beberapa tahapan internal sebelum instruksi akhirnya dieksekusi.

### Tahap 3 - Bytecode

CPython akan mengubah source code Python menjadi bentuk perantara yang disebut **bytecode**.

Bytecode bukanlah machine code yang langsung dijalankan oleh CPU.

Bytecode merupakan bentuk instruksi perantara yang digunakan oleh Python untuk menjalankan program.

Pada beberapa kondisi, bytecode Python dapat disimpan dalam file dengan ekstensi `.pyc`.

Secara sederhana:

```text
Source Code
    ↓
Bytecode
```

### Tahap 4 - Python Virtual Machine

Bytecode kemudian dijalankan oleh **Python Virtual Machine (PVM)**.

PVM merupakan bagian dari implementasi Python yang bertugas mengeksekusi bytecode.

Secara sederhana:

```text
Source Code
     ↓
Bytecode
     ↓
Python Virtual Machine
     ↓
Program dijalankan
```

Inilah salah satu alasan mengapa kita sering mendengar bahwa Python menggunakan **virtual machine**.

---

## 4. Gambaran Keseluruhan Eksekusi Python

Jika disederhanakan, proses eksekusi Python dapat digambarkan seperti berikut:

```text
┌─────────────────┐
│   Source Code   │
│      .py        │
└────────┬────────┘
         ↓
┌─────────────────┐
│     CPython     │
│   Interpreter   │
└────────┬────────┘
         ↓
┌─────────────────┐
│     Bytecode    │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Python Virtual  │
│     Machine     │
└────────┬────────┘
         ↓
┌─────────────────┐
│     Eksekusi    │
│     Program     │
└─────────────────┘
```

Diagram tersebut merupakan **penyederhanaan** untuk membantu memahami konsep.

Pada implementasi Python modern, proses eksekusi internal jauh lebih kompleks. Terdapat berbagai mekanisme dan optimasi yang dapat terjadi ketika program dijalankan.

---

## 5. Apakah Python Benar-Benar Diinterpretasikan?

Python sering disebut sebagai bahasa **interpreted** karena kode Python dijalankan oleh interpreter.

Namun, jika kita menggunakan CPython, prosesnya tidak sekadar:

```text
Source Code → Interpreter → CPU
```

CPython biasanya melalui proses:

```text
Source Code
     ↓
Compilation
     ↓
Bytecode
     ↓
Python Virtual Machine
     ↓
Execution
```

Karena itu, istilah **interpreted language** sebaiknya dipahami sebagai cara umum untuk menjelaskan bagaimana Python dijalankan, bukan sebagai gambaran lengkap dari seluruh proses internalnya.

---

## 6. Mengapa Perlu Memahami Hal Ini?

Sebagai pemula, kita mungkin tidak perlu memahami seluruh detail internal CPython.

Namun, memahami gambaran besarnya akan membantu ketika nantinya mempelajari konsep yang lebih lanjut.

Misalnya ketika kita mulai mengenal:

- Bytecode.
- Python Virtual Machine.
- Memory management.
- Garbage collection.
- Performance.
- Interpreter.
- Compiler.
- Just-In-Time compilation.
- Optimasi Python.

Dengan memahami dasar proses eksekusi, kita akan memiliki gambaran yang lebih baik mengenai apa yang terjadi ketika kita menjalankan sebuah program Python.

---

## Kesimpulan

Python bukan hanya sebuah program yang kita instal di komputer.

**Python adalah bahasa pemrograman yang memiliki spesifikasi dan berbagai implementasi.**

Implementasi Python yang paling umum adalah **CPython**, tetapi terdapat implementasi lain seperti **Jython, PyPy, dan IronPython**.

Dalam CPython, source code Python diproses menjadi **bytecode**, kemudian bytecode tersebut dieksekusi oleh **Python Virtual Machine**.

Secara sederhana:

```text
Python Language
      ↓
Python Implementation
      ↓
   Source Code
      ↓
    Bytecode
      ↓
Python Virtual Machine
      ↓
Program Execution
```

Dengan memahami proses ini, kita tidak hanya mengetahui **cara menggunakan Python**, tetapi juga mulai memahami **apa yang terjadi di balik layar ketika program Python dijalankan**.