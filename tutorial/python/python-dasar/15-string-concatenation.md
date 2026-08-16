---
sidebar_position: 15
title: "String Concatenation"
---

**String Concatenation** adalah proses **menggabungkan dua atau lebih string menjadi satu string**.

Concatenation merupakan istilah yang sering digunakan dalam pemrograman untuk menjelaskan proses menyambungkan beberapa teks.

Dalam Python, string dapat digabungkan menggunakan operator `+`.

---

## 1. Penggabungan String Sederhana

Contoh paling sederhana:

```python
greeting = "Hello" + " " + "Andrei"

print(greeting)
```

Hasil:

```text
Hello Andrei
```

Pada contoh tersebut terdapat tiga string:

```text
"Hello"
" "
"Andrei"
```

Ketiganya kemudian digabungkan menjadi:

```text
"Hello Andrei"
```

---

## 2. Operator `+` Tidak Menambahkan Spasi

Ketika menggunakan operator `+`, Python **tidak secara otomatis menambahkan spasi**.

Contohnya:

```python
greeting = "Hello" + "Andrei"

print(greeting)
```

Hasil:

```text
HelloAndrei
```

Jika kita ingin memberikan spasi, kita harus menambahkannya secara eksplisit:

```python
greeting = "Hello" + " " + "Andrei"

print(greeting)
```

Hasil:

```text
Hello Andrei
```

Jadi:

```text
"Hello" + "Andrei"
        ↓
"HelloAndrei"
```

Sedangkan:

```text
"Hello" + " " + "Andrei"
        ↓
"Hello Andrei"
```

---

## 3. Menggabungkan Variable String

String concatenation juga dapat dilakukan terhadap variable.

Contohnya:

```python
first_name = "Andrei"
last_name = "Neagoie"

full_name = first_name + " " + last_name

print(full_name)
```

Hasil:

```text
Andrei Neagoie
```

Pada contoh tersebut:

```text
first_name
     ↓
  "Andrei"

last_name
     ↓
  "Neagoie"
```

Kemudian keduanya digabungkan:

```text
"Andrei" + " " + "Neagoie"
             ↓
      "Andrei Neagoie"
```

---

## 4. Menggabungkan Lebih dari Dua String

Kita dapat menggabungkan lebih dari dua string dalam satu expression.

Contohnya:

```python
first_name = "Andrei"
middle_name = "John"
last_name = "Neagoie"

full_name = first_name + " " + middle_name + " " + last_name

print(full_name)
```

Hasil:

```text
Andrei John Neagoie
```

Jumlah string yang dapat digabungkan tidak terbatas pada dua string.

---

## 5. Concatenation Harus Menggunakan String

Operator `+` untuk string concatenation digunakan untuk menggabungkan nilai yang bertipe `str`.

Contohnya:

```python
first_name = "Andrei"
last_name = "Neagoie"

full_name = first_name + " " + last_name
```

Semua bagian yang digabungkan merupakan string.

---

## 6. Tidak Bisa Langsung Menggabungkan String dan Integer

Perhatikan contoh berikut:

```python
print("Hello " + 5)
```

Kode tersebut akan menghasilkan error:

```text
TypeError
```

Hal ini terjadi karena:

```text
"Hello " → str
5        → int
```

Python tidak dapat secara langsung menggunakan operator `+` untuk menggabungkan `str` dan `int`.

---

## 7. Contoh String dan Integer

Misalnya kita memiliki data:

```python
name = "Andrei"
age = 25
```

Kita tidak dapat langsung menulis:

```python
message = "My age is " + age
```

karena:

```text
str + int
```

merupakan kombinasi tipe data yang tidak sesuai untuk string concatenation menggunakan `+`.

Jika ingin menggabungkannya menggunakan `+`, nilai angka harus terlebih dahulu dikonversi menjadi string.

Contohnya:

```python
message = "My age is " + str(age)

print(message)
```

Hasil:

```text
My age is 25
```

Fungsi `str()` akan dibahas lebih lanjut pada materi **Type Conversion**.

---

## 8. String Concatenation dan Tipe Data

Perhatikan contoh berikut:

```python
name = "Andrei"
age = 25
```

Tipe datanya:

```text
name
 ↓
str

age
 ↓
int
```

Jika ingin menggunakan concatenation dengan `+`, keduanya harus menjadi string:

```python
message = name + " " + str(age)
```

Sekarang:

```text
str + str + str
```

sehingga dapat digabungkan.

---

## 9. Contoh Penggunaan dalam Program

String concatenation dapat digunakan untuk membuat pesan dari beberapa variable.

Contohnya:

```python
first_name = "Andrei"
city = "Palu"

message = "Hello " + first_name + " from " + city

print(message)
```

Hasil:

```text
Hello Andrei from Palu
```

Pada program nyata, teknik seperti ini dapat digunakan untuk membuat:

- Pesan pengguna.
- Informasi produk.
- Alamat.
- Judul.
- Pesan notifikasi.
- Teks hasil pemrosesan data.

---

## 10. Concatenation Bukan Sekadar `+`

Walaupun operator `+` dapat digunakan untuk string concatenation, Python menyediakan berbagai cara lain untuk menggabungkan string.

Misalnya:

- String concatenation menggunakan `+`.
- f-string.
- `str.format()`.
- `join()`.

Untuk tahap awal, kita cukup memahami konsep dasar concatenation menggunakan `+`.

Teknik penggabungan string yang lebih modern dan fleksibel akan dipelajari pada materi berikutnya.

---

## 11. Ringkasan

| Konsep | Contoh | Hasil |
| --- | --- | --- |
| Menggabungkan string | `"Hello" + "Python"` | `"HelloPython"` |
| Menambahkan spasi | `"Hello" + " " + "Python"` | `"Hello Python"` |
| Menggunakan variable | `first + " " + last` | Gabungan kedua string |
| String + Integer | `"Age: " + 25` | `TypeError` |
| Mengubah integer menjadi string | `"Age: " + str(25)` | `"Age: 25"` |

---

## Kesimpulan

**String Concatenation** adalah proses menggabungkan beberapa string menjadi satu string.

Dalam Python, cara sederhana untuk melakukan concatenation adalah menggunakan operator `+`.

Contohnya:

```python
greeting = "Hello" + " " + "Andrei"

print(greeting)
```

Hasil:

```text
Hello Andrei
```

Hal penting yang perlu diingat:

- Operator `+` dapat digunakan untuk menggabungkan string.
- Python tidak menambahkan spasi secara otomatis.
- Spasi harus ditambahkan secara eksplisit jika diperlukan.
- String concatenation menggunakan `+` membutuhkan nilai bertipe `str`.
- Menggabungkan `str` dengan `int` secara langsung akan menghasilkan `TypeError`.
- Nilai dengan tipe data lain perlu dikonversi menjadi string terlebih dahulu jika ingin digabungkan menggunakan `+`.

:::info
**String concatenation pada dasarnya adalah proses menempelkan satu string dengan string lainnya untuk membentuk string baru.**
:::