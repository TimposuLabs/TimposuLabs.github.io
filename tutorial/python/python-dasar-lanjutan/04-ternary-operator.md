---
sidebar_position: 4
title: "Ternary Operator"
---

**Ternary Operator** atau yang dalam Python disebut **conditional expression** adalah cara singkat untuk menuliskan `if-else` dalam satu ekspresi.

Ternary operator biasanya digunakan ketika kita ingin menentukan **satu nilai berdasarkan sebuah kondisi**.

Contohnya, daripada menulis beberapa baris `if-else`, kita dapat menuliskannya dalam satu baris.

---

## Sintaks Ternary Operator

Bentuk dasar ternary operator di Python adalah:

```python
nilai_jika_true if kondisi else nilai_jika_false
```

Urutan pembacaannya:

1. Python mengevaluasi `kondisi`.
2. Jika kondisi bernilai `True`, hasilnya adalah `nilai_jika_true`.
3. Jika kondisi bernilai `False`, hasilnya adalah `nilai_jika_false`.

Contoh:

```python
age = 20

status = "Dewasa" if age >= 18 else "Belum dewasa"

print(status)
```

Output:

```text
Dewasa
```

Karena `age >= 18` bernilai `True`, maka `"Dewasa"` digunakan sebagai nilai `status`.

---

## Ternary Operator vs `if-else`

Perhatikan contoh berikut.

### Menggunakan `if-else`

```python
is_friend = True

if is_friend:
    can_message = "Bisa kirim pesan"
else:
    can_message = "Tidak bisa kirim pesan"

print(can_message)
```

Kode tersebut dapat ditulis lebih ringkas menggunakan ternary operator:

```python
is_friend = True

can_message = "Bisa kirim pesan" if is_friend else "Tidak bisa kirim pesan"

print(can_message)
```

Kedua kode tersebut menghasilkan nilai yang sama.

Perbedaannya adalah ternary operator memungkinkan conditional sederhana ditulis sebagai **satu expression**.

---

## Cara Membaca Ternary Operator

Contoh:

```python
age = 20

message = "Dewasa" if age >= 18 else "Belum dewasa"
```

Cara membacanya:

> Jika `age >= 18` benar, gunakan `"Dewasa"`, jika tidak gunakan `"Belum dewasa"`.

Struktur tersebut dapat dibayangkan sebagai:

```text
nilai jika True
      ↓
"Dewasa" if age >= 18 else "Belum dewasa"
                    ↑
              kondisi
                             ↑
                       nilai jika False
```

---

## Ternary Operator dengan Angka

Ternary operator tidak hanya digunakan untuk string. Kita juga dapat menentukan nilai numerik.

```python
age = 20

discount = 10 if age >= 18 else 0

print(discount)
```

Output:

```text
10
```

Jika `age` kurang dari `18`, nilai `discount` akan menjadi `0`.

---

## Ternary Operator dengan Function

Hasil ternary expression juga dapat digunakan sebagai argument sebuah function.

```python
age = 20

print("Dewasa" if age >= 18 else "Belum dewasa")
```

Output:

```text
Dewasa
```

Dalam contoh tersebut, hasil conditional expression langsung diberikan kepada `print()`.

---

## Ternary Operator dengan Truthy dan Falsy

Ternary operator juga dapat memanfaatkan konsep **Truthy dan Falsy**.

```python
username = ""

message = username if username else "Guest"

print(message)
```

Karena `username` merupakan string kosong dan bersifat Falsy, nilai `"Guest"` digunakan.

Jika:

```python
username = "Andi"

message = username if username else "Guest"

print(message)
```

Output:

```text
Andi
```

Karena `"Andi"` merupakan nilai Truthy.

---

## Ternary Operator Bertingkat

Secara teknis, ternary operator dapat digunakan lebih dari satu kali.

```python
score = 85

result = "A" if score >= 90 else "B" if score >= 80 else "C"

print(result)
```

Namun, penulisan seperti ini dapat menjadi sulit dibaca jika jumlah kondisi semakin banyak.

Untuk kondisi yang lebih kompleks, lebih baik menggunakan `if`, `elif`, dan `else`.

```python
score = 85

if score >= 90:
    result = "A"
elif score >= 80:
    result = "B"
else:
    result = "C"

print(result)
```

---

## Kapan Menggunakan Ternary Operator?

Ternary operator cocok digunakan ketika:

- Kondisi sederhana.
- Hanya terdapat dua kemungkinan hasil.
- Hasil conditional langsung diberikan ke sebuah variabel.
- Penulisan satu baris membuat kode lebih mudah dibaca.

Contohnya:

```python
age = 20

status = "Dewasa" if age >= 18 else "Belum dewasa"
```

Kode tersebut cukup jelas sehingga penggunaan ternary operator dapat meningkatkan keterbacaan.

---

## Kapan Sebaiknya Tidak Digunakan?

Hindari ternary operator ketika conditional memiliki logika yang terlalu kompleks.

Contoh yang sulit dibaca:

```python
result = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "D"
```

Untuk kasus seperti ini, gunakan `if`, `elif`, dan `else`:

```python
if score >= 90:
    result = "A"
elif score >= 80:
    result = "B"
elif score >= 70:
    result = "C"
else:
    result = "D"
```

Meskipun membutuhkan lebih banyak baris, struktur tersebut lebih mudah dibaca dan dipelihara.

---

## Ternary Operator Menghasilkan Nilai

Salah satu hal penting yang perlu dipahami adalah bahwa ternary operator merupakan **expression**.

Artinya, hasilnya adalah sebuah nilai yang dapat:

- Disimpan ke variabel.
- Diberikan sebagai argument function.
- Digunakan dalam expression lainnya.

Contoh:

```python
age = 20

status = "Dewasa" if age >= 18 else "Belum dewasa"
```

Expression:

```python
"Dewasa" if age >= 18 else "Belum dewasa"
```

menghasilkan sebuah nilai, kemudian nilai tersebut diberikan kepada variabel `status`.

---

## Perbandingan dengan Conditional Expression

Dalam Python, istilah yang lebih tepat untuk konstruksi ini adalah **conditional expression**.

```python
status = "Dewasa" if age >= 18 else "Belum dewasa"
```

Istilah **ternary operator** tetap sering digunakan oleh developer karena konsep ini memiliki tiga bagian utama:

```text
nilai jika True
       ↓
"Ya" if condition else "Tidak"
             ↑
          kondisi
                    ↑
              nilai jika False
```

Namun, dalam dokumentasi Python, konstruksi tersebut disebut **conditional expression**.

---

## Kesalahan Umum

### Urutan Sintaks Salah

Jangan menulis seperti bentuk `if-else` biasa:

```python
# ❌ Salah
status = if age >= 18 "Dewasa" else "Belum dewasa"
```

Gunakan urutan yang benar:

```python
# ✅ Benar
status = "Dewasa" if age >= 18 else "Belum dewasa"
```

### Tidak Menyediakan `else`

Conditional expression membutuhkan bagian `else`.

```python
# ❌ Tidak valid sebagai ternary expression
status = "Dewasa" if age >= 18
```

Penulisan yang benar:

```python
status = "Dewasa" if age >= 18 else "Belum dewasa"
```

---

## Ringkasan

Ternary operator atau **conditional expression** merupakan cara ringkas untuk menulis conditional sederhana.

Sintaks utamanya:

```python
nilai_jika_true if kondisi else nilai_jika_false
```

Contoh:

```python
age = 20

status = "Dewasa" if age >= 18 else "Belum dewasa"
```

Gunakan ternary operator ketika membuat kode menjadi **lebih ringkas sekaligus tetap mudah dibaca**. Jika conditional mulai memiliki banyak kondisi atau logika yang kompleks, gunakan `if`, `elif`, dan `else`.