---
sidebar_position: 18
title: "Formatted Strings"
---

**Formatted String** adalah teknik untuk memasukkan nilai variable atau expression ke dalam sebuah string secara dinamis.

Formatted string sangat berguna ketika kita ingin membuat teks yang berisi data yang berubah-ubah.

Contohnya:

```python
name = "Johnny"
age = 55
```

Kita ingin menghasilkan:

```text
Hi Johnny. You are 55 years old.
```

Python menyediakan beberapa cara untuk melakukan hal tersebut. Dua pendekatan yang penting untuk diketahui adalah:

- **f-string**
- **`.format()`**

---

## 1. Menggunakan String Concatenation

Sebelum memahami formatted string, kita dapat melihat cara penggabungan string menggunakan operator `+`.

Contohnya:

```python
name = "Johnny"
age = 55

message = "Hi " + name + ". You are " + str(age) + " years old."

print(message)
```

Hasil:

```text
Hi Johnny. You are 55 years old.
```

Pada contoh tersebut, kita harus mengubah `age` dari `int` menjadi `str` menggunakan `str()`.

Cara ini dapat digunakan, tetapi ketika string menjadi lebih kompleks, penulisannya menjadi panjang dan kurang nyaman dibaca.

---

## 2. Menggunakan f-string

**f-string** merupakan salah satu cara paling sederhana dan modern untuk membuat formatted string di Python.

f-string diperkenalkan pada Python 3.6.

Untuk membuat f-string, kita menambahkan huruf:

```text
f
```

sebelum string.

Kemudian variable dapat dimasukkan menggunakan kurung kurawal:

```text
{}
```

Contohnya:

```python
name = "Johnny"
age = 55

message = f"Hi {name}. You are {age} years old."

print(message)
```

Hasil:

```text
Hi Johnny. You are 55 years old.
```

---

## 3. Cara Kerja f-string

Perhatikan:

```python
f"Hi {name}. You are {age} years old."
```

Bagian:

```text
{name}
```

akan digantikan dengan nilai variable `name`.

Sedangkan:

```text
{age}
```

akan digantikan dengan nilai variable `age`.

Secara sederhana:

```text
f"Hi {name}. You are {age} years old."
              ↓
       Python mengevaluasi
              ↓
"Hi Johnny. You are 55 years old."
```

---

## 4. f-string Tidak Memerlukan `str()`

Salah satu keunggulan f-string adalah kita tidak perlu melakukan konversi tipe data secara manual ketika memasukkan nilai ke dalam string.

Contohnya:

```python
name = "Johnny"
age = 55

print(f"Hi {name}. You are {age} years old.")
```

Kita tidak perlu menulis:

```python
str(age)
```

Python akan menangani representasi nilai tersebut sebagai bagian dari formatted string.

---

## 5. Memasukkan Expression ke dalam f-string

Kurung kurawal pada f-string tidak hanya dapat berisi variable.

Kita juga dapat memasukkan **expression**.

Contohnya:

```python
age = 55

print(f"You will be {age + 5} years old in five years.")
```

Hasil:

```text
You will be 60 years old in five years.
```

Python mengevaluasi:

```text
age + 5
```

kemudian memasukkan hasilnya ke dalam string.

---

## 6. Contoh dengan Beberapa Variable

f-string sangat berguna ketika sebuah string memiliki banyak variable.

Contohnya:

```python
first_name = "Johnny"
last_name = "Smith"
age = 55

message = f"Name: {first_name} {last_name}, Age: {age}"

print(message)
```

Hasil:

```text
Name: Johnny Smith, Age: 55
```

Dibandingkan dengan concatenation, f-string membuat struktur string lebih mudah dibaca.

---

## 7. Menggunakan `.format()`

Sebelum f-string diperkenalkan, salah satu cara populer untuk membuat formatted string adalah menggunakan method `.format()`.

Contohnya:

```python
name = "Johnny"
age = 55

message = "Hi {}. You are {} years old.".format(name, age)

print(message)
```

Hasil:

```text
Hi Johnny. You are 55 years old.
```

Placeholder:

```text
{}
```

akan diisi menggunakan nilai yang diberikan kepada `.format()`.

---

## 8. `.format()` Berdasarkan Posisi

Placeholder dapat menggunakan posisi argument.

Contohnya:

```python
name = "Johnny"
age = 55

message = "Hi {0}. You are {1} years old.".format(name, age)

print(message)
```

Hasil:

```text
Hi Johnny. You are 55 years old.
```

Index dimulai dari `0`.

Jadi:

```text
{0} → name
{1} → age
```

---

## 9. `.format()` dengan Nama

Kita juga dapat memberikan nama pada nilai yang akan dimasukkan.

Contohnya:

```python
message = "Hi {new_name}. You are {new_age} years old.".format(
    new_name="Sally",
    new_age=100
)

print(message)
```

Hasil:

```text
Hi Sally. You are 100 years old.
```

Cara ini membuat placeholder lebih deskriptif.

---

## 10. Perbandingan f-string dan `.format()`

Perhatikan dua cara berikut.

### f-string

```python
name = "Johnny"
age = 55

print(f"Hi {name}. You are {age} years old.")
```

### `.format()`

```python
name = "Johnny"
age = 55

print("Hi {}. You are {} years old.".format(name, age))
```

Keduanya dapat menghasilkan:

```text
Hi Johnny. You are 55 years old.
```

Namun, f-string biasanya lebih ringkas dan mudah dibaca.

---

## 11. Kapan Menggunakan f-string?

Untuk kode Python modern, **f-string umumnya menjadi pilihan utama** ketika kita perlu memasukkan variable atau expression ke dalam string.

Contohnya:

```python
name = "Andrei"
age = 25
city = "Palu"

message = f"Nama saya {name}, umur saya {age}, dan saya tinggal di {city}."

print(message)
```

Hasil:

```text
Nama saya Andrei, umur saya 25, dan saya tinggal di Palu.
```

Struktur kode mudah dibaca karena variable langsung terlihat di dalam string.

---

## 12. Mengapa `.format()` Tetap Perlu Dipahami?

Walaupun f-string lebih modern, memahami `.format()` tetap penting.

Kita mungkin menemukan `.format()` ketika:

- Membaca project lama.
- Menggunakan library tertentu.
- Memelihara aplikasi legacy.
- Membaca tutorial Python lama.
- Membaca kode yang dibuat sebelum f-string tersedia.

Karena itu, kita tidak harus selalu menggunakan `.format()`, tetapi sebaiknya memahami cara kerjanya.

---

## 13. Formatted String dan Readability

Salah satu alasan f-string banyak digunakan adalah **readability**.

Bandingkan:

```python
print("Hi " + name + ". You are " + str(age) + " years old.")
```

dengan:

```python
print(f"Hi {name}. You are {age} years old.")
```

Versi kedua lebih mudah dibaca karena struktur kalimat tetap terlihat seperti kalimat biasa.

Variable yang digunakan juga langsung terlihat pada posisi masing-masing.

---

## 14. Ringkasan

| Metode | Contoh | Keterangan |
| --- | --- | --- |
| Concatenation | `"Hi " + name` | Cara sederhana menggunakan `+` |
| f-string | `f"Hi {name}"` | Cara modern dan direkomendasikan |
| `.format()` | `"Hi {}".format(name)` | Cara lama yang masih banyak ditemukan |

Untuk Python modern, f-string biasanya menjadi pilihan utama.

---

## Kesimpulan

**Formatted String** memungkinkan kita memasukkan variable atau expression ke dalam string dengan cara yang lebih mudah dan fleksibel.

Cara yang paling direkomendasikan dalam Python modern adalah **f-string**.

Contohnya:

```python
name = "Johnny"
age = 55

message = f"Hi {name}. You are {age} years old."

print(message)
```

Hasil:

```text
Hi Johnny. You are 55 years old.
```

Python juga menyediakan method `.format()`:

```python
message = "Hi {}. You are {} years old.".format(name, age)
```

Keduanya dapat digunakan, tetapi f-string umumnya lebih sederhana dan mudah dibaca.

Hal penting yang perlu diingat:

:::tip
**Gunakan f-string untuk kode Python modern, tetapi pahami `.format()` karena masih sering ditemukan pada kode dan project lama.**
:::