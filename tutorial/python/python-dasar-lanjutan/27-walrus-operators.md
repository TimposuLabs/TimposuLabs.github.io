---
sidebar_position: 27
title: "Walrus Operator"
---

**Walrus Operator** adalah operator assignment expression yang ditulis menggunakan simbol `:=`.

Fitur ini diperkenalkan pada **Python 3.8**.

Nama *walrus operator* berasal dari bentuk simbol `:=` yang dianggap menyerupai mata dan gading hewan walrus.

Walrus Operator memungkinkan kita melakukan dua hal sekaligus:

1. Menyimpan sebuah nilai ke dalam variabel.
2. Menggunakan nilai tersebut sebagai bagian dari sebuah expression.

---

## Sintaks Dasar

Bentuk umum Walrus Operator adalah:

```python
(variable := expression)
```

Contoh:

```python
if (n := 10) > 5:
    print(n)
```

Pada kode tersebut:

```text
n := 10
```

menyimpan nilai `10` ke variabel `n`.

Nilai tersebut kemudian langsung digunakan untuk mengevaluasi:

```text
n > 5
```

Output:

```text
10
```

---

## Assignment Biasa vs Walrus Operator

Tanpa Walrus Operator, assignment biasanya dilakukan dalam statement terpisah.

```python
n = 10

if n > 5:
    print(n)
```

Dengan Walrus Operator:

```python
if (n := 10) > 5:
    print(n)
```

Walrus Operator menggabungkan assignment dan evaluasi expression dalam satu bagian kode.

---

## Mengapa Menggunakan Walrus Operator?

Salah satu kegunaan utama Walrus Operator adalah menghindari perhitungan yang sama secara berulang.

Misalnya kita memiliki kode:

```python
a = "Hello World"

if len(a) > 10:
    print(f"Too long: {len(a)} elements")
```

Pada kode tersebut, `len(a)` dihitung dua kali.

Pertama:

```python
len(a) > 10
```

Kemudian:

```python
f"Too long: {len(a)} elements"
```

Kita dapat menyimpan hasil `len(a)` menggunakan Walrus Operator.

```python
a = "Hello World"

if (n := len(a)) > 10:
    print(f"Too long: {n} elements")
```

Sekarang hasil `len(a)` disimpan ke variabel `n` dan dapat digunakan kembali.

Output:

```text
Too long: 11 elements
```

---

## Walrus Operator pada `if`

Walrus Operator dapat digunakan ketika sebuah nilai perlu dihitung terlebih dahulu dan hasilnya langsung digunakan untuk menentukan kondisi.

Contoh:

```python
name = "Budi"

if (length := len(name)) > 3:
    print(f"Nama memiliki {length} karakter")
```

Output:

```text
Nama memiliki 4 karakter
```

Pada kode tersebut:

```text
len(name)
```

dihitung satu kali.

Hasilnya disimpan ke:

```text
length
```

Kemudian `length` digunakan dalam kondisi:

```text
length > 3
```

---

## Walrus Operator pada `while`

Walrus Operator juga dapat digunakan pada kondisi `while`.

Hal ini berguna ketika nilai yang digunakan sebagai kondisi perlu diperbarui pada setiap iterasi.

Contoh:

```python
a = "Hello World"

while (n := len(a)) > 1:
    print(n)
    a = a[:-1]

print(a)
```

Pada setiap iterasi:

```text
len(a)
```

dihitung dan hasilnya disimpan ke variabel `n`.

Kemudian Python memeriksa:

```text
n > 1
```

Selama kondisi tersebut bernilai `True`, perulangan terus berjalan.

---

## Cara Kerja Contoh `while`

Misalnya nilai awal:

```text
a = "Hello World"
```

Panjang string adalah:

```text
11
```

Sehingga:

```text
n = 11
```

Kemudian string dipotong satu karakter:

```text
Hello Worl
```

Pada iterasi berikutnya:

```text
n = 10
```

Proses tersebut terus berlangsung sampai panjang string tidak lagi lebih besar dari `1`.

Pada akhirnya tersisa:

```text
H
```

---

## Walrus Operator dan Input User

Walrus Operator juga dapat digunakan ketika mengambil input berulang kali.

Contoh:

```python
while (command := input("Masukkan perintah: ")) != "quit":
    print(f"Perintah: {command}")
```

Program akan terus meminta input selama pengguna tidak memasukkan:

```text
quit
```

Variabel `command` mendapatkan nilai dari `input()` sekaligus digunakan dalam kondisi `while`.

---

## Perhatikan Penggunaan Tanda Kurung

Walrus Operator biasanya ditulis menggunakan tanda kurung agar expression lebih jelas.

Contoh:

```python
if (n := len("Python")) > 3:
    print(n)
```

Bentuk tersebut lebih mudah dibaca daripada mencoba menggunakan assignment expression tanpa struktur yang jelas.

Tanda kurung juga membantu menunjukkan bahwa:

```text
n := len("Python")
```

merupakan expression yang hasilnya kemudian dibandingkan dengan:

```text
> 3
```

---

## Walrus Operator Bukan Pengganti `=`

Operator `=` dan `:=` memiliki penggunaan yang berbeda.

### Assignment biasa

```python
name = "Budi"
```

Digunakan untuk melakukan assignment dalam sebuah statement.

### Walrus Operator

```python
(name := "Budi")
```

Digunakan untuk melakukan assignment sekaligus menghasilkan nilai dalam sebuah expression.

Contoh:

```python
if (name := "Budi"):
    print(name)
```

Output:

```text
Budi
```

---

## Kapan Sebaiknya Menggunakan Walrus Operator?

Walrus Operator sebaiknya digunakan ketika membuat kode menjadi lebih jelas atau menghindari perhitungan yang tidak perlu.

Contoh penggunaan yang masuk akal:

```python
if (length := len(data)) > 100:
    print(f"Data terlalu panjang: {length}")
```

Tanpa Walrus Operator:

```python
length = len(data)

if length > 100:
    print(f"Data terlalu panjang: {length}")
```

Keduanya benar.

Walrus Operator tidak selalu membuat kode lebih baik. Jika penggunaannya membuat kode sulit dibaca, assignment biasa justru lebih baik.

---

## Kelebihan Walrus Operator

Beberapa manfaat Walrus Operator:

- Mengurangi pengulangan perhitungan.
- Memungkinkan assignment dan evaluasi dilakukan dalam satu expression.
- Berguna pada kondisi `if`.
- Berguna pada kondisi `while`.
- Dapat membuat beberapa pola kode menjadi lebih ringkas.
- Menghindari pemanggilan function yang sama berkali-kali ketika hasilnya dapat digunakan kembali.

---

## Hal yang Perlu Diperhatikan

Walrus Operator merupakan fitur yang relatif lebih baru dibandingkan konsep dasar Python.

Karena itu, jangan menggunakan `:=` hanya untuk membuat kode terlihat lebih singkat.

Perhatikan contoh berikut:

```python
if (result := some_function()) and result.is_valid():
    print(result)
```

Kode tersebut bisa menjadi lebih efisien karena `some_function()` hanya dipanggil sekali.

Namun jika penggunaan Walrus Operator membuat alur kode sulit dipahami, assignment biasa mungkin lebih baik:

```python
result = some_function()

if result and result.is_valid():
    print(result)
```

Dalam **clean code**, keterbacaan tetap menjadi pertimbangan utama.

---

## Tips Mempelajari Fitur Baru Python

Python terus berkembang dan menambahkan fitur baru dari waktu ke waktu.

Ketika mempelajari fitur baru, biasakan untuk:

1. Mengetahui versi Python ketika fitur tersebut diperkenalkan.
2. Membaca dokumentasi resmi Python.
3. Memahami masalah yang ingin diselesaikan oleh fitur tersebut.
4. Mencoba contoh sederhana.
5. Membandingkan kode sebelum dan sesudah menggunakan fitur tersebut.
6. Tidak menggunakan fitur baru hanya karena terlihat lebih singkat.

Walrus Operator, misalnya, diperkenalkan pada **Python 3.8** dan dirancang untuk memungkinkan assignment dilakukan sebagai bagian dari expression.

---

## Ringkasan

Walrus Operator menggunakan simbol:

```text
:=
```

Fungsinya adalah melakukan **assignment sekaligus menghasilkan nilai dalam sebuah expression**.

Contoh paling sederhana:

```python
if (n := len("Hello World")) > 5:
    print(n)
```

Tanpa Walrus Operator, assignment biasanya dilakukan terlebih dahulu:

```python
n = len("Hello World")

if n > 5:
    print(n)
```

Gunakan Walrus Operator ketika penggunaannya membuat kode lebih efisien dan tetap mudah dibaca. Jika justru membuat kode menjadi membingungkan, gunakan assignment biasa.