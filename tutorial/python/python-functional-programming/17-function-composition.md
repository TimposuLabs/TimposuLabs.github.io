---
sidebar_position: 17
title: "Function Composition"
---

**Function Composition** atau komposisi fungsi adalah teknik dalam *Functional Programming* untuk menggabungkan dua atau lebih fungsi sehingga **output dari satu fungsi menjadi input bagi fungsi berikutnya**.

Konsep ini memungkinkan beberapa proses kecil digabungkan menjadi satu alur pemrosesan data.

Daripada membuat satu fungsi yang menangani banyak proses sekaligus, kita dapat membuat beberapa fungsi sederhana, kemudian menggabungkannya.

Contoh sederhana:

```python
def multiply_by_two(number):
    return number * 2


def add_five(number):
    return number + 5
```

Kedua fungsi tersebut dapat dikomposisikan:

```python
result = add_five(multiply_by_two(10))

print(result)
```

Output:

```text
25
```

Alurnya:

```text
10
 ↓
multiply_by_two()
 ↓
20
 ↓
add_five()
 ↓
25
```

Dengan demikian:

```python
add_five(multiply_by_two(10))
```

dapat dibaca sebagai:

```text
10 → dikali 2 → ditambah 5 → 25
```

---

## Mengapa Function Composition?

Function composition membantu kita membangun program dari fungsi-fungsi kecil yang memiliki tanggung jawab jelas.

Misalnya terdapat tiga proses:

```text
Data
 ↓
Validasi
 ↓
Transformasi
 ↓
Perhitungan
 ↓
Hasil
```

Masing-masing proses dapat dibuat menjadi fungsi terpisah.

Keuntungan pendekatan ini:

- Fungsi lebih kecil dan fokus.
- Fungsi lebih mudah diuji.
- Fungsi dapat digunakan kembali.
- Logika program lebih mudah dipahami.
- Proses pemrosesan data dapat disusun secara bertahap.

---

## Contoh Function Composition Sederhana

Misalnya kita ingin melakukan dua operasi terhadap sebuah angka.

Pertama, mengalikan angka dengan `2`.

```python
def multiply_by_two(number):
    return number * 2
```

Kemudian menambahkan `10`.

```python
def add_ten(number):
    return number + 10
```

Kita dapat menggabungkannya:

```python
result = add_ten(multiply_by_two(5))

print(result)
```

Output:

```text
20
```

Urutan proses:

```text
5
 ↓
multiply_by_two(5)
 ↓
10
 ↓
add_ten(10)
 ↓
20
```

---

## Function Composition dengan Beberapa Fungsi

Komposisi tidak terbatas pada dua fungsi. Kita dapat menggabungkan beberapa fungsi sekaligus.

Contoh:

```python
def multiply_by_two(number):
    return number * 2


def add_ten(number):
    return number + 10


def square(number):
    return number ** 2
```

Ketiga fungsi tersebut dapat dikomposisikan:

```python
result = square(add_ten(multiply_by_two(5)))

print(result)
```

Output:

```text
400
```

Alurnya:

```text
5
 ↓
multiply_by_two()
 ↓
10
 ↓
add_ten()
 ↓
20
 ↓
square()
 ↓
400
```

Perhatikan bahwa fungsi paling dalam dijalankan terlebih dahulu:

```python
multiply_by_two(5)
```

Kemudian hasilnya diberikan kepada:

```python
add_ten(...)
```

Kemudian hasil akhirnya diberikan kepada:

```python
square(...)
```

---

## Function Composition dan Pure Function

Function composition sangat erat kaitannya dengan **pure function**.

Pure function memiliki karakteristik:

- Input yang sama menghasilkan output yang sama.
- Tidak memiliki *side effect*.

Contoh:

```python
def double(number):
    return number * 2


def increment(number):
    return number + 1
```

Keduanya merupakan fungsi sederhana yang tidak mengubah data di luar fungsi.

Kita dapat menggabungkannya:

```python
result = increment(double(5))

print(result)
```

Output:

```text
11
```

Prosesnya:

```text
5
 ↓
double()
 ↓
10
 ↓
increment()
 ↓
11
```

Pendekatan seperti ini membuat alur transformasi data menjadi lebih mudah diprediksi.

---

## Function Composition dengan `map()`

Function composition juga dapat digunakan bersama fungsi functional programming seperti `map()`.

Contoh:

```python
def double(number):
    return number * 2


def square(number):
    return number ** 2


numbers = [1, 2, 3, 4]

result = map(
    square,
    map(double, numbers)
)

print(list(result))
```

Output:

```text
[4, 16, 36, 64]
```

Prosesnya:

```text
[1, 2, 3, 4]
       ↓
    double
       ↓
[2, 4, 6, 8]
       ↓
    square
       ↓
[4, 16, 36, 64]
```

Kita juga dapat menuliskannya menggunakan `list comprehension`:

```python
numbers = [1, 2, 3, 4]

result = [
    square(double(number))
    for number in numbers
]

print(result)
```

Output:

```text
[4, 16, 36, 64]
```

Kedua pendekatan tersebut menghasilkan hasil yang sama.

---

## Function Composition dengan Lambda

Function composition juga dapat dikombinasikan dengan `lambda`.

Contoh:

```python
double = lambda number: number * 2
add_ten = lambda number: number + 10

result = add_ten(double(5))

print(result)
```

Output:

```text
20
```

Namun, penggunaan `lambda` sebaiknya tetap mempertimbangkan keterbacaan kode.

Untuk fungsi yang memiliki logika lebih kompleks, penggunaan `def` biasanya lebih mudah dipahami.

---

## Membuat Fungsi Composition

Python tidak menyediakan fungsi `compose()` bawaan seperti beberapa bahasa atau library functional programming.

Namun, kita dapat membuat fungsi composition sendiri.

Contoh:

```python
def compose(function1, function2):
    def composed(value):
        return function2(function1(value))

    return composed
```

Sekarang kita dapat membuat fungsi baru berdasarkan dua fungsi.

```python
def double(number):
    return number * 2


def add_ten(number):
    return number + 10


double_then_add_ten = compose(double, add_ten)

result = double_then_add_ten(5)

print(result)
```

Output:

```text
20
```

Alurnya:

```text
5
 ↓
double()
 ↓
10
 ↓
add_ten()
 ↓
20
```

Fungsi:

```python
double_then_add_ten
```

sekarang menjadi fungsi baru yang melakukan dua operasi secara berurutan.

---

## Komposisi Fungsi dari Kiri ke Kanan

Ketika membuat fungsi composition sendiri, penting memahami urutan eksekusi.

Misalnya:

```python
compose(double, add_ten)
```

berarti:

```text
input
 ↓
double
 ↓
add_ten
 ↓
output
```

Sehingga:

```python
compose(double, add_ten)(5)
```

menghasilkan:

```text
double(5)
    ↓
10
    ↓
add_ten(10)
    ↓
20
```

Secara konsep:

```python
add_ten(double(5))
```

---

## Composition sebagai Pipeline

Function composition dapat dipahami seperti **pipeline**.

Setiap fungsi menjadi satu tahap pemrosesan.

```text
Input
  ↓
Function A
  ↓
Function B
  ↓
Function C
  ↓
Output
```

Contoh:

```python
def remove_spaces(text):
    return text.replace(" ", "")


def uppercase(text):
    return text.upper()


def add_prefix(text):
    return "DATA-" + text
```

Fungsi tersebut dapat digunakan secara berurutan:

```python
result = add_prefix(
    uppercase(
        remove_spaces("hello python")
    )
)

print(result)
```

Output:

```text
DATA-HELLOPYTHON
```

Alurnya:

```text
"hello python"
       ↓
remove_spaces()
       ↓
"hellopython"
       ↓
uppercase()
       ↓
"HELLOPYTHON"
       ↓
add_prefix()
       ↓
"DATA-HELLOPYTHON"
```

---

## Function Composition vs Function Chaining

Function composition sering terlihat seperti **function chaining**, tetapi konsepnya perlu dibedakan.

Pada composition, output dari satu fungsi menjadi input fungsi lainnya.

Contoh:

```python
result = function_c(
    function_b(
        function_a(value)
    )
)
```

Sedangkan *method chaining* biasanya menggunakan objek yang sama secara berurutan.

Contoh:

```python
text = " hello python "

result = text.strip().upper().replace(" ", "-")

print(result)
```

Keduanya sama-sama menyusun beberapa operasi, tetapi mekanismenya berbeda.

---

## Function Composition dan Reusability

Salah satu manfaat utama composition adalah kita dapat menggunakan kembali fungsi-fungsi kecil dalam berbagai kombinasi.

Misalnya:

```python
def double(number):
    return number * 2


def add_five(number):
    return number + 5


def square(number):
    return number ** 2
```

Kita dapat membuat beberapa alur berbeda.

```python
result1 = add_five(double(10))

result2 = square(double(10))

result3 = square(add_five(10))
```

Setiap fungsi tetap sederhana, tetapi dapat dikombinasikan sesuai kebutuhan.

---

## Kapan Menggunakan Function Composition?

Function composition cocok digunakan ketika:

- Sebuah proses terdiri dari beberapa tahap.
- Setiap tahap dapat dibuat sebagai fungsi terpisah.
- Fungsi memiliki tanggung jawab yang jelas.
- Fungsi dapat digunakan kembali.
- Data perlu melewati beberapa transformasi.
- Ingin membuat pipeline pemrosesan data.

Contoh konsep:

```text
Input
  ↓
Validasi
  ↓
Transformasi
  ↓
Filter
  ↓
Perhitungan
  ↓
Output
```

Setiap tahap dapat direpresentasikan sebagai fungsi.

---

## Readability

Function composition dapat membuat kode lebih terstruktur, tetapi composition yang terlalu dalam dapat membuat kode sulit dibaca.

Contoh:

```python
result = function_d(
    function_c(
        function_b(
            function_a(value)
        )
    )
)
```

Jika terlalu banyak fungsi bersarang, lebih baik memecah proses menjadi beberapa tahap.

Contoh:

```python
step1 = function_a(value)
step2 = function_b(step1)
step3 = function_c(step2)
result = function_d(step3)
```

Pendekatan ini mungkin lebih panjang, tetapi alurnya lebih mudah dibaca dan di-debug.

---

## Kesimpulan

**Function Composition** adalah teknik menggabungkan beberapa fungsi sehingga output dari suatu fungsi menjadi input bagi fungsi berikutnya.

Konsep dasarnya:

```text
Input
 ↓
Function A
 ↓
Function B
 ↓
Function C
 ↓
Output
```

Contoh:

```python
result = function_c(
    function_b(
        function_a(value)
    )
)
```

Function composition merupakan konsep penting dalam **Functional Programming** karena mendorong kita untuk membuat fungsi-fungsi kecil, terisolasi, dapat digunakan kembali, dan kemudian menggabungkannya menjadi proses yang lebih kompleks.

Konsep ini juga berhubungan erat dengan:

- Pure Functions
- First-Class Functions
- Higher-Order Functions
- `map()`
- `filter()`
- `lambda`
- Immutability
- Function Pipeline

Hal terpenting bukan membuat kode sesingkat mungkin, tetapi membangun **alur transformasi data yang jelas, terprediksi, dan mudah dipelihara**.