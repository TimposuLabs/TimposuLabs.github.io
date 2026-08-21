---
sidebar_position: 21
title: Return
---

Kata kunci `return` merupakan salah satu konsep penting dalam function di Python. Dengan `return`, sebuah function tidak hanya menjalankan suatu proses, tetapi juga dapat **menghasilkan dan mengembalikan nilai** yang dapat digunakan kembali oleh bagian lain dari program.

---

## Pengertian Return

`return` digunakan di dalam function untuk **mengirimkan nilai hasil eksekusi kembali kepada kode yang memanggil function tersebut**.

Contoh sederhana:

```python
def sum(num1, num2):
    return num1 + num2
```

Ketika function dipanggil:

```python
result = sum(10, 5)

print(result)
```

Output:

```text
15
```

Nilai `15` merupakan nilai yang dikembalikan oleh function melalui `return`.

---

## Return Berbeda dengan Print

Salah satu konsep penting adalah memahami perbedaan antara `print()` dan `return`.

### Menggunakan Print

```python
def sum(num1, num2):
    print(num1 + num2)

result = sum(10, 5)

print(result)
```

Output:

```text
15
None
```

`print()` hanya menampilkan hasil ke layar. Function tersebut tidak mengembalikan hasil perhitungan sehingga nilai yang diterima oleh `result` adalah `None`.

---

### Menggunakan Return

```python
def sum(num1, num2):
    return num1 + num2

result = sum(10, 5)

print(result)
```

Output:

```text
15
```

Dengan `return`, hasil perhitungan dapat disimpan ke dalam variabel dan digunakan kembali.

---

## Return Menghasilkan Nilai yang Dapat Digunakan Kembali

Nilai yang dikembalikan oleh function dapat digunakan untuk berbagai operasi lainnya.

```python
def sum(num1, num2):
    return num1 + num2

total = sum(10, 5)

print(total)
print(total * 2)
```

Output:

```text
15
30
```

Karena hasil function dikembalikan sebagai nilai, hasil tersebut dapat digunakan kembali oleh program.

---

## Function Tanpa Return

Jika sebuah function tidak menggunakan `return`, Python secara otomatis mengembalikan `None`.

```python
def say_hello():
    print('Hello')

result = say_hello()

print(result)
```

Output:

```text
Hello
None
```

Hal ini terjadi karena function `say_hello()` hanya menjalankan `print()` dan tidak memberikan nilai kembali.

---

## Return Menghentikan Eksekusi Function

Ketika Python menemukan `return`, eksekusi function langsung dihentikan.

Perhatikan contoh berikut:

```python
def check_number(number):
    if number > 10:
        return 'Angka lebih besar dari 10'

    print('Pengecekan selesai')

result = check_number(20)

print(result)
```

Output:

```text
Angka lebih besar dari 10
```

Ketika kondisi terpenuhi, `return` dijalankan sehingga function langsung berhenti. Baris setelah `return` tidak dijalankan.

---

## Kode Setelah Return Tidak Dieksekusi

Contoh:

```python
def say_hello():
    return 'Hello'

    print('Baris ini tidak akan dijalankan')

result = say_hello()

print(result)
```

Output:

```text
Hello
```

Baris `print()` berada setelah `return`, sehingga tidak pernah dieksekusi.

---

## Return dengan Conditional

`return` sering digunakan bersama `if` untuk menghasilkan nilai berdasarkan kondisi tertentu.

```python
def check_age(age):
    if age >= 18:
        return 'Dewasa'

    return 'Belum dewasa'

print(check_age(20))
print(check_age(15))
```

Output:

```text
Dewasa
Belum dewasa
```

Function dapat memiliki lebih dari satu `return`, tetapi hanya salah satu yang akan dijalankan dalam satu kali pemanggilan function.

---

## Return Value dan Variabel

Hasil dari `return` dapat langsung ditampung dalam variabel.

```python
def calculate_area(length, width):
    return length * width

area = calculate_area(10, 5)

print(area)
```

Output:

```text
50
```

Alurnya adalah:

```text
calculate_area(10, 5)
        ↓
    10 * 5
        ↓
      50
        ↓
area = 50
```

---

## Return Value sebagai Argument Function Lain

Hasil `return` dari suatu function dapat langsung digunakan sebagai argument untuk function lainnya.

Contoh:

```python
def sum(num1, num2):
    return num1 + num2

total = sum(10, 5)

print(sum(10, total))
```

Alurnya:

```text
sum(10, 5)
    ↓
   15

total = 15

sum(10, total)
    ↓
sum(10, 15)
    ↓
   25
```

Output:

```text
25
```

---

## Menggabungkan Beberapa Function

Konsep ini memungkinkan kita membuat function yang lebih kecil dan memiliki tanggung jawab tertentu.

```python
def calculate_price(price, quantity):
    return price * quantity


def calculate_discount(total):
    return total * 0.10


price = calculate_price(50000, 3)
discount = calculate_discount(price)

print(price)
print(discount)
```

Output:

```text
150000
15000.0
```

Function pertama menghasilkan nilai yang kemudian digunakan oleh function kedua.

Pola seperti ini membuat program lebih modular dan mudah dikembangkan.

---

## Return Value vs Side Effect

Function dapat melakukan dua jenis hal yang berbeda.

### Return Value

Function memproses data dan mengembalikan hasil.

```python
def calculate_total(price, quantity):
    return price * quantity
```

Function tersebut menghasilkan nilai yang dapat digunakan kembali.

---

### Side Effect

Function melakukan suatu tindakan yang memengaruhi sesuatu di luar dirinya.

Contohnya adalah mencetak sesuatu ke layar.

```python
def say_hello(name):
    print(f'Hello {name}')
```

Function tersebut melakukan aksi berupa menampilkan teks, tetapi tidak mengembalikan nilai.

---

## Perbandingan Print dan Return

| `print()` | `return` |
|---|---|
| Menampilkan data ke layar | Mengembalikan data |
| Ditujukan untuk output kepada pengguna | Ditujukan untuk digunakan oleh program |
| Tidak dapat digunakan sebagai hasil function secara langsung | Hasilnya dapat disimpan dalam variabel |
| Tidak menghentikan function | Menghentikan function |
| Function tanpa `return` akan menghasilkan `None` | Menghasilkan nilai yang ditentukan |

---

## Contoh dalam Program

Perhatikan function berikut:

```python
def calculate_total(price, quantity):
    return price * quantity


def calculate_discount(total):
    return total * 0.10


price = 50000
quantity = 3

total = calculate_total(price, quantity)
discount = calculate_discount(total)

final_price = total - discount

print(f'Total: {total}')
print(f'Discount: {discount}')
print(f'Final price: {final_price}')
```

Output:

```text
Total: 150000
Discount: 15000.0
Final price: 135000.0
```

Program tersebut menunjukkan bagaimana nilai dari satu function dapat digunakan oleh function lain dan kemudian diproses kembali.

---

## Poin Penting

Beberapa hal yang perlu diingat mengenai `return`:

1. `return` digunakan untuk mengembalikan nilai dari sebuah function.
2. Function yang tidak memiliki `return` akan menghasilkan `None`.
3. `return` langsung menghentikan eksekusi function.
4. Nilai yang dikembalikan dapat disimpan ke dalam variabel.
5. Nilai `return` dapat digunakan sebagai input untuk operasi atau function lainnya.
6. `print()` digunakan untuk menampilkan informasi, sedangkan `return` digunakan untuk mengirimkan hasil kembali kepada pemanggil function.
7. Penggunaan `return` membantu membuat function lebih fleksibel, modular, dan dapat digunakan kembali.