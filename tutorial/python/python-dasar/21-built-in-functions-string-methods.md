---
sidebar_position: 21
title: "Built-in Functions & String Methods"
---

Python menyediakan berbagai **built-in functions** dan **methods** yang dapat digunakan untuk bekerja dengan data.

Dalam materi ini kita akan mengenal beberapa fungsi bawaan yang umum digunakan serta beberapa **string methods** yang sering digunakan ketika bekerja dengan teks.

Kita juga akan melihat kembali hubungan antara string methods dengan konsep **immutability** pada string.

---

## 1. Built-in Function

**Built-in function** adalah fungsi yang sudah tersedia di Python dan dapat langsung digunakan tanpa perlu membuat fungsi tersebut terlebih dahulu.

Contohnya:

```python
print("Hello Python")
```

Python sudah menyediakan fungsi `print()` sehingga kita dapat langsung menggunakannya.

Salah satu built-in function yang penting ketika bekerja dengan string adalah:

```python
len()
```

---

## 2. Fungsi `len()`

Fungsi `len()` digunakan untuk mengetahui **jumlah karakter atau panjang sebuah string**.

Contohnya:

```python
greet = "hello"

print(len(greet))
```

Hasil:

```text
5
```

String:

```text
h e l l o
```

memiliki lima karakter.

---

## 3. Perbedaan `len()` dan Index

Perlu diperhatikan bahwa **index dan panjang string menggunakan konsep yang berbeda**.

Index dimulai dari `0`:

```text
h e l l o
0 1 2 3 4
```

Sedangkan `len()` menghitung jumlah karakter:

```text
h e l l o
1 2 3 4 5
```

Jadi:

```python
greet = "hello"

print(len(greet))
```

menghasilkan:

```text
5
```

Sedangkan karakter terakhir berada pada index:

```text
4
```

---

## 4. `len()` dan String Slicing

Hasil dari `len()` dapat digunakan bersama slicing.

Contohnya:

```python
greet = "hello"

print(greet[0:len(greet)])
```

Hasil:

```text
hello
```

Karena:

```python
len(greet)
```

menghasilkan:

```text
5
```

maka expression tersebut secara efektif menjadi:

```python
greet[0:5]
```

Karena index `5` merupakan batas `stop` dan tidak termasuk dalam hasil, karakter pada index `0` sampai `4` diambil.

---

## 5. Apa Itu Method?

**Method** adalah fungsi yang melekat pada sebuah object atau tipe data tertentu.

Method dipanggil menggunakan tanda titik:

```text
object.method()
```

Contohnya:

```python
quote.upper()
```

Pada contoh tersebut:

```text
quote
  ↓
object

.upper()
  ↓
method
```

Berbeda dengan built-in function seperti:

```python
len(quote)
```

yang dipanggil secara langsung.

---

## 6. Built-in Function vs Method

Perhatikan perbedaannya:

### Built-in Function

```python
len(quote)
```

Fungsi `len()` dipanggil secara langsung dan menerima `quote` sebagai argument.

### Method

```python
quote.upper()
```

Method `upper()` dipanggil melalui object `quote`.

Secara sederhana:

```text
Built-in Function

len(quote)
  ↑
function
```

Sedangkan:

```text
Method

quote.upper()
      ↑
    method
```

---

## 7. String Methods

Python menyediakan banyak method khusus untuk bekerja dengan string.

Beberapa string methods yang penting untuk dipahami antara lain:

```text
.upper()
.lower()
.capitalize()
.find()
.replace()
```

Method-method tersebut digunakan untuk melakukan berbagai operasi terhadap string.

---

## 8. Method `.upper()`

Method `.upper()` digunakan untuk menghasilkan string dengan seluruh karakter huruf menjadi huruf kapital.

Contohnya:

```python
quote = "to be or not to be"

print(quote.upper())
```

Hasil:

```text
TO BE OR NOT TO BE
```

---

## 9. Method `.lower()`

Method `.lower()` digunakan untuk menghasilkan string dengan seluruh karakter huruf menjadi huruf kecil.

Contohnya:

```python
quote = "TO BE OR NOT TO BE"

print(quote.lower())
```

Hasil:

```text
to be or not to be
```

---

## 10. Method `.capitalize()`

Method `.capitalize()` digunakan untuk membuat karakter pertama pada string menjadi huruf kapital.

Contohnya:

```python
quote = "to be or not to be"

print(quote.capitalize())
```

Hasil:

```text
To be or not to be
```

Perbedaannya dengan `.upper()` adalah:

```text
.upper()
→ TO BE OR NOT TO BE

.capitalize()
→ To be or not to be
```

---

## 11. Method `.find()`

Method `.find()` digunakan untuk mencari posisi atau **index pertama** dari teks tertentu di dalam string.

Contohnya:

```python
quote = "to be or not to be"

print(quote.find("be"))
```

Hasil:

```text
3
```

Karena string tersebut memiliki index:

```text
t o   b e   o r ...
0 1 2 3 4 5 6 7
```

`"be"` pertama dimulai pada index `3`.

---

## 12. Jika Teks Tidak Ditemukan

Jika teks yang dicari tidak ditemukan, `.find()` akan menghasilkan:

```text
-1
```

Contohnya:

```python
quote = "to be or not to be"

print(quote.find("Python"))
```

Hasil:

```text
-1
```

Nilai `-1` menunjukkan bahwa teks tersebut tidak ditemukan.

---

## 13. Method `.replace()`

Method `.replace()` digunakan untuk menghasilkan string baru dengan mengganti bagian string tertentu.

Sintaks dasarnya:

```python
string.replace(old, new)
```

Contohnya:

```python
quote = "to be or not to be"

print(quote.replace("be", "me"))
```

Hasil:

```text
to me or not to me
```

Pada contoh tersebut:

```text
"be"
```

diganti menjadi:

```text
"me"
```

---

## 14. `.replace()` Menghasilkan String Baru

Hal penting yang perlu dipahami adalah `.replace()` **tidak mengubah string asli**.

Contohnya:

```python
quote = "to be or not to be"

quote.replace("be", "me")

print(quote)
```

Hasil:

```text
to be or not to be
```

Variable `quote` tetap memiliki nilai awal.

Mengapa?

Karena string di Python bersifat **immutable**.

Method `.replace()` menghasilkan string baru.

---

## 15. Menyimpan Hasil `.replace()`

Jika kita ingin menyimpan hasil penggantian, hasil tersebut harus diberikan kepada variable.

Contohnya:

```python
quote = "to be or not to be"

new_quote = quote.replace("be", "me")

print(new_quote)
```

Hasil:

```text
to me or not to me
```

Variable:

```text
quote
```

tetap:

```text
to be or not to be
```

Sedangkan:

```text
new_quote
```

berisi:

```text
to me or not to me
```

---

## 16. Reassignment dengan `.replace()`

Kita juga dapat menimpa variable lama dengan hasil yang baru.

Contohnya:

```python
quote = "to be or not to be"

quote = quote.replace("be", "me")

print(quote)
```

Hasil:

```text
to me or not to me
```

Perlu dipahami bahwa ini bukan berarti object string lama dimodifikasi.

Yang terjadi adalah:

```text
quote
  │
  ▼
String lama
```

kemudian setelah reassignment:

```text
quote
  │
  ▼
String baru
```

---

## 17. Immutability pada String Methods

Konsep immutability sangat penting ketika menggunakan string methods.

Contohnya:

```python
quote = "to be or not to be"

new_quote = quote.upper()

print(quote)
print(new_quote)
```

Hasil:

```text
to be or not to be
TO BE OR NOT TO BE
```

String asli tetap tidak berubah.

Method:

```python
quote.upper()
```

menghasilkan string baru.

---

## 18. Contoh Beberapa Method

Kita dapat menggunakan beberapa method pada string yang sama.

```python
quote = "to be or not to be"

print(quote.upper())
print(quote.capitalize())
print(quote.find("be"))
print(quote.replace("be", "me"))
```

Hasil:

```text
TO BE OR NOT TO BE
To be or not to be
3
to me or not to me
```

Masing-masing method memiliki fungsi yang berbeda.

---

## 19. Method Tidak Mengubah String Asli

Perhatikan contoh berikut:

```python
quote = "to be or not to be"

quote.upper()
quote.replace("be", "me")

print(quote)
```

Hasil:

```text
to be or not to be
```

Walaupun kita telah memanggil beberapa method, string asli tetap sama.

Hal ini terjadi karena string bersifat immutable.

Jika hasil method ingin digunakan, kita perlu:

- Menyimpannya ke variable baru, atau
- Melakukan reassignment.

Contohnya:

```python
quote = quote.upper()
```

---

## 20. Method Chaining

Karena banyak string methods menghasilkan string baru, beberapa method dapat digunakan secara berantai.

Contohnya:

```python
quote = "hello python"

result = quote.upper().replace("PYTHON", "WORLD")

print(result)
```

Hasil:

```text
HELLO WORLD
```

Prosesnya:

```text
"hello python"
      ↓
.upper()
      ↓
"HELLO PYTHON"
      ↓
.replace()
      ↓
"HELLO WORLD"
```

Konsep seperti ini disebut **method chaining**.

---

## 21. Ringkasan Built-in Function dan String Method

| Nama | Jenis | Fungsi |
| --- | --- | --- |
| `len()` | Built-in function | Menghitung panjang string |
| `.upper()` | String method | Mengubah huruf menjadi kapital |
| `.lower()` | String method | Mengubah huruf menjadi kecil |
| `.capitalize()` | String method | Membuat karakter pertama menjadi kapital |
| `.find()` | String method | Mencari index pertama dari teks |
| `.replace()` | String method | Menghasilkan string baru dengan mengganti teks |

---

## 22. Perbedaan Function dan Method

Cara mudah membedakannya:

```python
len("Python")
```

`len()` adalah **built-in function**.

Sedangkan:

```python
"Python".upper()
```

`upper()` adalah **method** dari string.

Secara sederhana:

```text
Function
    ↓
len(data)
```

```text
Method
    ↓
data.method()
```

---

## Kesimpulan

Python menyediakan berbagai **built-in functions** dan **methods** untuk membantu kita bekerja dengan data.

Salah satu built-in function yang penting untuk string adalah:

```python
len()
```

yang digunakan untuk mengetahui jumlah karakter dalam string.

Sedangkan beberapa string methods yang penting adalah:

```python
.upper()
.lower()
.capitalize()
.find()
.replace()
```

Method dipanggil menggunakan tanda titik:

```python
quote.upper()
```

Hal yang sangat penting untuk diingat adalah **string bersifat immutable**.

Artinya, method seperti:

```python
quote.upper()
```

atau:

```python
quote.replace("be", "me")
```

tidak mengubah string asli. Method tersebut menghasilkan **string baru**.

Jika ingin menggunakan hasilnya, simpan hasil tersebut:

```python
new_quote = quote.replace("be", "me")
```

atau lakukan reassignment:

```python
quote = quote.replace("be", "me")
```

:::info
**Built-in function dipanggil secara langsung, sedangkan method dipanggil melalui object. String methods menghasilkan string baru karena string di Python bersifat immutable.**
:::