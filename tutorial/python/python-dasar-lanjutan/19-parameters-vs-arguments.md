---
sidebar_position: 19
title: "Parameters vs Arguments"
---

Function menjadi lebih berguna ketika dapat menerima data dari luar. Dengan **parameters** dan **arguments**, sebuah function dapat dibuat dinamis sehingga tidak hanya melakukan tugas dengan data yang sama.

Konsep ini merupakan bagian penting dalam penggunaan function karena memungkinkan satu function digunakan untuk berbagai kondisi dan nilai.

---

## Pengertian Parameters dan Arguments

Meskipun sering digunakan secara bersamaan, **parameter** dan **argument** memiliki arti yang berbeda.

### Parameters

**Parameter** adalah variabel yang dituliskan di dalam tanda kurung ketika kita **mendefinisikan function**.

Contoh:

```python
def say_hello(name, emoji):
    print(f'Hello {name} {emoji}')
```

Pada contoh tersebut:

- `name` adalah parameter.
- `emoji` adalah parameter.

Parameter berfungsi sebagai tempat untuk menerima data ketika function dipanggil.

### Arguments

**Argument** adalah nilai sebenarnya yang diberikan kepada function ketika kita **memanggil function**.

Contoh:

```python
say_hello('Andre', '😊')
```

Pada contoh tersebut:

- `'Andre'` adalah argument untuk parameter `name`.
- `'😊'` adalah argument untuk parameter `emoji`.

---

## Cara Kerja Parameters dan Arguments

Perhatikan function berikut:

```python
def say_hello(name, emoji):
    print(f'Hello {name} {emoji}')
```

Function tersebut memiliki dua parameter:

```text
name
emoji
```

Kemudian function dipanggil:

```python
say_hello('Andre', '😊')
```

Python akan memasangkan argument dengan parameter berdasarkan posisinya:

```text
name  ← 'Andre'
emoji ← '😊'
```

Sehingga kode di dalam function secara efektif menggunakan:

```python
print(f'Hello Andre 😊')
```

Output:

```text
Hello Andre 😊
```

---

## Menggunakan Function dengan Data Berbeda

Salah satu keuntungan utama parameter adalah function yang sama dapat digunakan dengan argument yang berbeda.

```python
def say_hello(name, emoji):
    print(f'Hello {name} {emoji}')

say_hello('Andre', '😊')
say_hello('Dan', '👍')
say_hello('John', '🔥')
```

Output:

```text
Hello Andre 😊
Hello Dan 👍
Hello John 🔥
```

Kita tidak perlu membuat function yang berbeda untuk setiap nama.

---

## Positional Arguments

Pada contoh sebelumnya, argument diberikan berdasarkan **posisi**.

```python
def say_hello(name, emoji):
    print(f'Hello {name} {emoji}')

say_hello('Andre', '😊')
```

Argument pertama `'Andre'` masuk ke parameter pertama `name`.

Argument kedua `'😊'` masuk ke parameter kedua `emoji`.

Urutannya penting:

```python
say_hello('Andre', '😊')
```

berbeda dengan:

```python
say_hello('😊', 'Andre')
```

Outputnya juga akan berbeda:

```text
Hello 😊 Andre
```

---

## Jumlah Arguments Harus Sesuai

Jika function memiliki dua parameter:

```python
def say_hello(name, emoji):
    print(f'Hello {name} {emoji}')
```

Maka function membutuhkan dua argument ketika dipanggil:

```python
say_hello('Andre', '😊')
```

Jika hanya memberikan satu argument:

```python
say_hello('Andre')
```

Python akan menghasilkan error karena parameter `emoji` belum mendapatkan nilai.

Sebaliknya, jika memberikan terlalu banyak argument:

```python
say_hello('Andre', '😊', 'Python')
```

Python juga akan menghasilkan error karena function hanya memiliki dua parameter.

---

## Parameters vs Arguments

| Aspek | Parameters | Arguments |
|---|---|---|
| Digunakan saat | Mendefinisikan function | Memanggil function |
| Bentuk | Nama variabel | Nilai/data |
| Contoh | `name`, `emoji` | `'Andre'`, `'😊'` |
| Fungsi | Menampung data | Memberikan data |

Contoh:

```python
def say_hello(name, emoji):
    print(f'Hello {name} {emoji}')
```

`name` dan `emoji` adalah **parameters**.

Sedangkan:

```python
say_hello('Andre', '😊')
```

`'Andre'` dan `'😊'` adalah **arguments**.

---

## Manfaat Parameters dan Arguments

### 1. Function Menjadi Dinamis

Function tidak terpaku pada satu nilai tertentu.

```python
def greet(name):
    print(f'Hello {name}')
```

Function tersebut dapat digunakan untuk berbagai nama:

```python
greet('Andre')
greet('Budi')
greet('Sinta')
```

### 2. Mengurangi Pengulangan Kode

Tanpa function, kita mungkin menulis:

```python
print('Hello Andre')
print('Hello Budi')
print('Hello Sinta')
```

Dengan function:

```python
def greet(name):
    print(f'Hello {name}')

greet('Andre')
greet('Budi')
greet('Sinta')
```

Logika hanya perlu ditulis satu kali.

### 3. Menerapkan Prinsip DRY

**DRY (Don't Repeat Yourself)** merupakan prinsip untuk menghindari pengulangan kode yang tidak diperlukan.

Dengan function dan parameter, satu logika dapat digunakan berkali-kali dengan data yang berbeda.

### 4. Memudahkan Pengembangan Program

Function yang menerima parameter lebih mudah dikembangkan karena data yang diproses tidak harus ditentukan secara langsung di dalam function.

---

## Contoh Studi Kasus

Misalnya kita ingin membuat function untuk menampilkan informasi pengguna:

```python
def show_user(name, age):
    print(f'Name: {name}')
    print(f'Age: {age}')

show_user('Andre', 25)
show_user('Budi', 30)
```

Output:

```text
Name: Andre
Age: 25
Name: Budi
Age: 30
```

Function `show_user()` dapat digunakan kembali untuk berbagai pengguna tanpa mengubah isi function.

---

## Ringkasan

Beberapa poin penting yang perlu diingat:

1. **Parameter** adalah variabel yang ditentukan ketika membuat function.
2. **Argument** adalah nilai yang diberikan ketika function dipanggil.
3. Argument dapat diberikan kepada parameter berdasarkan posisi.
4. Jumlah argument harus sesuai dengan parameter yang dibutuhkan function, kecuali function menggunakan mekanisme parameter khusus seperti default parameter atau variadic arguments.
5. Parameters dan arguments membuat function lebih dinamis dan fleksibel.
6. Penggunaan function membantu menerapkan prinsip **DRY (Don't Repeat Yourself)**.
7. Function yang memiliki parameter dapat digunakan kembali dengan berbagai data.