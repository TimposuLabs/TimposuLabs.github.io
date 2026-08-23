---
sidebar_position: 2
title: "Pure Functions"
---

**Pure Function** atau fungsi murni merupakan salah satu konsep penting dalam **Functional Programming**.

Pure function berfokus pada dua hal utama:

1. Input yang sama menghasilkan output yang sama.
2. Tidak memiliki side effect.

Dengan pendekatan ini, function menjadi lebih mudah dipahami, diuji, dan dipelihara.

Secara sederhana:

```text
Input
  ↓
Pure Function
  ↓
Output
```

Function hanya berfokus pada proses yang diperlukan tanpa mengubah sesuatu di luar dirinya.

---

## Aturan Utama Pure Function

Sebuah function dapat disebut sebagai pure function jika memenuhi dua aturan utama.

### Same Input → Same Output

Aturan pertama adalah:

> **Input yang sama harus selalu menghasilkan output yang sama.**

Misalnya sebuah function menerima angka:

```python
def multiply_by_two(number):
    return number * 2
```

Ketika diberikan input:

```python
multiply_by_two(5)
```

hasilnya selalu:

```text
10
```

Jika function tersebut dipanggil kembali dengan input yang sama:

```python
multiply_by_two(5)
```

hasilnya tetap:

```text
10
```

Secara konsep:

```text
5
 ↓
multiply_by_two()
 ↓
10
```

Tidak peduli berapa kali function dijalankan, selama inputnya sama, hasilnya harus tetap sama.

---

## No Side Effects

Aturan kedua adalah function tidak boleh menghasilkan **side effect** yang memengaruhi sesuatu di luar function.

Side effect terjadi ketika sebuah function mengubah atau berinteraksi dengan sesuatu di luar proses internalnya.

Contohnya:

- Mengubah variabel global.
- Mengubah data di luar function.
- Menulis file.
- Membaca atau menulis database.
- Berinteraksi dengan sistem eksternal.
- Mengubah object yang digunakan bersama.

Secara konsep:

```text
Function
   │
   ├── Input
   │
   ├── Process
   │
   └── Output
```

Pure function berusaha agar proses tersebut tidak memberikan perubahan tersembunyi ke luar function.

---

## Contoh Side Effect dengan `print()`

Dalam konteks pure function, `print()` merupakan interaksi dengan dunia luar karena function menghasilkan efek pada console.

Contoh:

```python
def multiply_by_two(number):
    result = number * 2
    print(result)
```

Function tersebut tidak hanya melakukan perhitungan, tetapi juga berinteraksi dengan console.

Pendekatan pure function lebih memilih mengembalikan hasil:

```python
def multiply_by_two(number):
    return number * 2
```

Kemudian bagian lain dari program dapat menentukan apa yang ingin dilakukan dengan hasil tersebut.

---

## Side Effect pada Variabel Global

Side effect juga dapat terjadi ketika function mengubah variabel yang berada di luar scope function.

Contoh:

```python
new_list = []


def multiply_by_two(li):
    for item in li:
        new_list.append(item * 2)

    return new_list
```

Pada contoh tersebut, `new_list` dibuat di luar function.

Kemudian function:

```python
multiply_by_two()
```

mengubah `new_list` dengan:

```python
new_list.append()
```

Artinya function memodifikasi data yang berada di luar scope-nya.

Hal tersebut merupakan **side effect**.

---

## Mengapa Mengubah Data di Luar Function Menjadi Masalah?

Bayangkan sebuah function dipanggil berkali-kali:

```python
new_list = []


def multiply_by_two(li):
    for item in li:
        new_list.append(item * 2)

    return new_list
```

Pemanggilan pertama:

```python
print(multiply_by_two([1, 2, 3]))
```

menghasilkan:

```text
[2, 4, 6]
```

Namun ketika dipanggil kembali:

```python
print(multiply_by_two([4, 5, 6]))
```

data sebelumnya masih berada di `new_list`.

Akibatnya hasil dapat menjadi:

```text
[2, 4, 6, 8, 10, 12]
```

Function tersebut bergantung pada state di luar dirinya.

Hal seperti ini dapat membuat perilaku program lebih sulit diprediksi.

---

## Membuat Pure Function

Untuk menghindari masalah tersebut, kita dapat membuat data yang dibutuhkan di dalam function.

Contoh:

```python
def multiply_by_two(li):
    new_list = []

    for item in li:
        new_list.append(item * 2)

    return new_list
```

Sekarang `new_list` dibuat di dalam function.

Data tersebut menjadi bagian dari proses internal function.

Ketika function selesai, hasilnya dikembalikan melalui:

```python
return new_list
```

Contoh penggunaan:

```python
print(multiply_by_two([1, 2, 3]))
```

Output:

```text
[2, 4, 6]
```

---

## Perbandingan Non-Pure Function dan Pure Function

### Non-Pure Function

```python
new_list = []


def multiply_by_two(li):
    for item in li:
        new_list.append(item * 2)

    return new_list
```

Masalahnya adalah function mengubah:

```python
new_list
```

yang berada di luar function.

Dengan demikian terdapat side effect.

### Pure Function

```python
def multiply_by_two(li):
    new_list = []

    for item in li:
        new_list.append(item * 2)

    return new_list
```

Pada versi ini, `new_list` berada di dalam function.

Function menerima input:

```text
li
```

kemudian menghasilkan output:

```text
new_list
```

tanpa mengubah data di luar function.

---

## Pure Function dan Testing

Pure function lebih mudah diuji karena hasilnya dapat diprediksi berdasarkan input.

Misalnya:

```python
def multiply_by_two(number):
    return number * 2
```

Kita dapat membuat pengujian sederhana:

```text
Input: 1
Output: 2

Input: 5
Output: 10

Input: 10
Output: 20
```

Karena function tidak bergantung pada state eksternal, kita dapat mengetahui hasil yang diharapkan dengan lebih mudah.

---

## Pure Function dan Debugging

Pure function juga membantu proses debugging.

Jika terdapat masalah pada:

```python
multiply_by_two(5)
```

kita cukup memeriksa:

```text
Input
  ↓
Function
  ↓
Output
```

Kita tidak perlu mencari perubahan state dari berbagai bagian program.

Sebaliknya, function yang memiliki banyak side effect dapat membuat sumber masalah lebih sulit ditemukan karena perilakunya dapat dipengaruhi oleh kondisi di luar function.

---

## Pure Function Bukan Berarti Function Tidak Boleh Menggunakan Data

Pure function tetap dapat menerima data sebagai argument.

Contohnya:

```python
def multiply_by_two(number):
    return number * 2
```

Data:

```python
number
```

berasal dari luar function.

Hal tersebut tidak menjadi masalah.

Yang penting adalah function menggunakan input tersebut untuk menghasilkan output tanpa mengubah sesuatu yang berada di luar dirinya.

Secara konsep:

```text
External Data
     ↓
  Argument
     ↓
  Function
     ↓
   Return
```

---

## Pure Function dan Immutability

Pure function memiliki hubungan yang erat dengan konsep **immutability**.

Pendekatan yang digunakan adalah tidak mengubah data asli secara langsung.

Misalnya:

```text
Data asli
   ↓
Function
   ↓
Data baru
```

Bukan:

```text
Data asli
   ↓
Function
   ↓
Data asli diubah
```

Dengan menghasilkan data baru, function dapat mengurangi perubahan state yang tidak terduga.

---

## Pure Function dalam Aplikasi Nyata

Tidak semua bagian aplikasi dapat dibuat sebagai pure function.

Aplikasi nyata harus berinteraksi dengan dunia luar.

Misalnya:

```text
User
 ↓
Application
 ↓
Database
```

atau:

```text
Application
 ↓
File System
```

atau:

```text
Application
 ↓
Network
```

Interaksi tersebut secara alami menghasilkan side effect.

Karena itu, tujuan Functional Programming bukan membuat seluruh aplikasi bebas dari side effect.

---

## Isolasi Side Effect

Pendekatan yang lebih realistis adalah **memaksimalkan pure function dan mengisolasi bagian yang memiliki side effect**.

Secara konsep:

```text
┌─────────────────────────────┐
│       Pure Functions        │
│                             │
│   Data → Process → Result   │
│                             │
└─────────────────────────────┘
               │
               ↓
┌─────────────────────────────┐
│       Side Effects          │
│                             │
│ Database / File / Network   │
│                             │
└─────────────────────────────┘
```

Dengan cara ini, bagian utama logika aplikasi dapat tetap sederhana dan mudah diuji.

Sementara interaksi dengan dunia luar ditempatkan pada bagian yang lebih terkontrol.

---

## Pure Function Bukan Keharusan Mutlak

Pure function merupakan **pedoman dalam Functional Programming**, bukan aturan bahwa seluruh function dalam sebuah aplikasi harus selalu pure.

Contohnya aplikasi membutuhkan:

```text
print()
input()
database
file
network
UI
```

Semua aktivitas tersebut dapat menghasilkan side effect.

Tanpa side effect, aplikasi tidak dapat berinteraksi dengan dunia luar.

Karena itu, yang lebih penting adalah memahami:

> Bagian mana yang membutuhkan side effect dan bagian mana yang dapat dibuat sebagai pure function?

---

## Strategi Penggunaan Pure Function

Dalam aplikasi yang lebih besar, kita dapat berusaha membuat sebanyak mungkin proses utama sebagai pure function.

Contohnya:

```text
Input
  ↓
Validasi
  ↓
Pure Function
  ↓
Transformasi Data
  ↓
Pure Function
  ↓
Hasil
  ↓
Side Effect
  ↓
Database
```

Dengan pendekatan tersebut, logic utama aplikasi dapat dipisahkan dari interaksi dengan dunia luar.

---

## Karakteristik Pure Function

Pure function dapat diringkas dengan karakteristik berikut:

| Karakteristik | Pure Function |
|---|---|
| Input yang sama | Output sama |
| Mengubah variabel global | Tidak |
| Mengubah data di luar function | Tidak |
| Mengubah file | Tidak |
| Mengakses database untuk menghasilkan efek | Tidak |
| Menghasilkan return value | Ya |
| Mudah diuji | Ya |
| Mudah diprediksi | Ya |

---

## Contoh Sederhana

Pure function:

```python
def add(a, b):
    return a + b
```

Function tersebut hanya bergantung pada:

```text
a
b
```

dan menghasilkan:

```text
a + b
```

Contoh:

```python
print(add(2, 3))
```

Output:

```text
5
```

Jika dipanggil kembali:

```python
print(add(2, 3))
```

hasilnya tetap:

```text
5
```

Tidak ada perubahan terhadap data di luar function.

---

## Kesimpulan

**Pure Function** adalah function yang:

1. Menghasilkan output yang sama ketika diberikan input yang sama.
2. Tidak memiliki side effect terhadap lingkungan di luar function.

Contoh pure function:

```python
def multiply_by_two(li):
    new_list = []

    for item in li:
        new_list.append(item * 2)

    return new_list
```

Sedangkan function yang mengubah variabel global:

```python
new_list = []


def multiply_by_two(li):
    for item in li:
        new_list.append(item * 2)

    return new_list
```

memiliki side effect karena memodifikasi data di luar function.

Dalam aplikasi nyata, side effect tetap diperlukan. Oleh karena itu, pendekatan yang baik adalah **memaksimalkan penggunaan pure function dan mengisolasi bagian yang memiliki side effect**.

Dengan memahami pure function, kita memiliki dasar penting untuk mempelajari konsep Functional Programming berikutnya, seperti **immutability, higher-order function, `map()`, `filter()`, dan `reduce()`**.