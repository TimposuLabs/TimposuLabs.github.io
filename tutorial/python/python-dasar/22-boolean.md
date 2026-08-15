---
sidebar_position: 22
title: "Boolean"
---

**Boolean** atau `bool` adalah tipe data yang digunakan untuk merepresentasikan **nilai logika** dalam sebuah program.

Boolean hanya memiliki dua kemungkinan nilai:

```text
True
False
```

Nilai tersebut digunakan untuk merepresentasikan kondisi seperti:

```text
Benar / Salah
Ya / Tidak
Aktif / Tidak Aktif
Ada / Tidak Ada
```

Boolean merupakan salah satu tipe data yang sangat penting karena nantinya banyak digunakan untuk membuat **logika dan alur program**.

---

## 1. Nilai Boolean

Python memiliki dua nilai Boolean:

```python
True
```

dan:

```python
False
```

Keduanya merupakan nilai khusus dalam Python.

Contohnya:

```python
is_student = True
is_admin = False
```

Variable `is_student` memiliki nilai:

```text
True
```

sedangkan `is_admin` memiliki nilai:

```text
False
```

---

## 2. Boolean Bersifat Case Sensitive

Penulisan Boolean di Python harus menggunakan huruf kapital pada karakter pertama.

Penulisan yang benar:

```python
True
False
```

Sedangkan berikut bukan nilai Boolean Python:

```python
true
false
```

Contohnya:

```python
status = True
```

valid.

Sedangkan:

```python
status = true
```

akan menyebabkan error karena `true` bukan keyword Boolean Python.

---

## 3. Mengecek Tipe Data Boolean

Kita dapat menggunakan `type()` untuk mengetahui tipe sebuah nilai.

Contohnya:

```python
is_student = True

print(type(is_student))
```

Hasil:

```text
<class 'bool'>
```

Dengan demikian:

```text
True  → bool
False → bool
```

---

## 4. Boolean pada Variable

Boolean sering digunakan untuk menyimpan status atau kondisi tertentu.

Contohnya:

```python
name = "Andre"
is_cool = False
```

Variable:

```text
name
```

menyimpan data string.

Sedangkan:

```text
is_cool
```

menyimpan nilai Boolean.

---

## 5. Mengubah Nilai Boolean

Seperti variable lainnya, nilai Boolean dapat diberikan nilai baru.

Contohnya:

```python
is_cool = False

is_cool = True

print(is_cool)
```

Hasil:

```text
True
```

Proses tersebut disebut **reassignment**.

Awalnya:

```text
is_cool → False
```

kemudian:

```text
is_cool → True
```

---

## 6. Konversi dengan `bool()`

Python menyediakan built-in function:

```python
bool()
```

yang dapat digunakan untuk mengubah nilai tertentu menjadi Boolean.

Contohnya:

```python
print(bool(1))
```

Hasil:

```text
True
```

Sedangkan:

```python
print(bool(0))
```

Hasil:

```text
False
```

---

## 7. Konversi Integer ke Boolean

Secara umum:

```text
0 → False
```

Sedangkan angka selain `0` akan menghasilkan:

```text
True
```

Contohnya:

```python
print(bool(0))
print(bool(1))
print(bool(10))
print(bool(-5))
```

Hasil:

```text
False
True
True
True
```

Jadi, jangan hanya mengingat `1` sebagai `True`.

Konsep yang lebih tepat adalah:

:::info
**Angka `0` dianggap `False`, sedangkan angka selain `0` dianggap `True`.**
:::

---

## 8. Konversi String ke Boolean

String juga dapat dikonversi menggunakan `bool()`.

Contohnya:

```python
print(bool("Hello"))
```

Hasil:

```text
True
```

String yang berisi teks dianggap sebagai nilai truthy.

Contoh lainnya:

```python
print(bool("True"))
print(bool("False"))
print(bool("Python"))
```

Hasil:

```text
True
True
True
```

Perhatikan bahwa:

```python
bool("False")
```

menghasilkan:

```text
True
```

Mengapa?

Karena `"False"` adalah **string yang tidak kosong**, bukan nilai Boolean `False`.

---

## 9. String Kosong

String kosong memiliki nilai Boolean `False`.

Contohnya:

```python
print(bool(""))
```

Hasil:

```text
False
```

Perbedaannya:

```python
bool("")
```

menghasilkan:

```text
False
```

sedangkan:

```python
bool("Hello")
```

menghasilkan:

```text
True
```

Jadi:

```text
""       → False
"Hello"  → True
"False"  → True
```

---

## 10. Konsep Truthy dan Falsy

Dalam Python terdapat konsep **truthy** dan **falsy**.

Sebuah nilai disebut **truthy** jika ketika dikonversi menggunakan `bool()` menghasilkan:

```text
True
```

Sedangkan nilai disebut **falsy** jika menghasilkan:

```text
False
```

Contohnya:

```python
bool(1)
```

menghasilkan:

```text
True
```

Maka `1` merupakan nilai **truthy**.

Sedangkan:

```python
bool(0)
```

menghasilkan:

```text
False
```

Maka `0` merupakan nilai **falsy**.

---

## 11. Beberapa Nilai Falsy

Beberapa nilai yang umum dianggap falsy di Python antara lain:

```python
False
None
0
0.0
""
```

Untuk collection kosong, beberapa contohnya adalah:

```python
[]
{}
()
set()
```

Semua nilai tersebut ketika dikonversi menggunakan `bool()` menghasilkan:

```text
False
```

Contohnya:

```python
print(bool(""))
print(bool([]))
print(bool({}))
print(bool(0))
```

Hasil:

```text
False
False
False
False
```

Pembahasan mengenai collection seperti `list`, `dict`, dan `set` akan dipelajari lebih lanjut pada materi berikutnya.

---

## 12. Boolean dan Logika Program

Boolean sangat penting dalam pemrograman karena dapat digunakan untuk menentukan apakah suatu kondisi benar atau salah.

Misalnya sebuah program perlu mengetahui apakah seorang pengguna sudah login:

```python
is_logged_in = True
```

Atau apakah pengguna memiliki akses administrator:

```python
is_admin = False
```

Variable seperti ini nantinya dapat digunakan untuk mengontrol alur program.

Contohnya:

```text
is_logged_in
      ↓
   True?
      ↓
  Lanjutkan
```

atau:

```text
is_logged_in
      ↓
   False?
      ↓
 Minta login
```

Konsep ini akan menjadi dasar ketika mempelajari **conditional statement** seperti `if` dan `else`.

---

## 13. Contoh Status Program

Boolean sangat cocok digunakan untuk menyimpan status.

Contohnya:

```python
is_active = True
is_verified = False
has_access = True
is_admin = False
```

Nama variable Boolean biasanya menggunakan pola seperti:

```text
is_...
has_...
can_...
should_...
```

Contohnya:

```python
is_active = True
has_access = False
can_login = True
```

Nama seperti ini membuat kode lebih mudah dipahami.

---

## 14. Boolean dalam Kehidupan Sehari-hari

Konsep Boolean sebenarnya sangat dekat dengan kehidupan sehari-hari.

Misalnya:

```text
Apakah pengguna sudah login?
→ Ya / Tidak

Apakah akun sudah diverifikasi?
→ Ya / Tidak

Apakah toko sedang buka?
→ Ya / Tidak

Apakah pengguna memiliki akses?
→ Ya / Tidak
```

Dalam program, kondisi tersebut dapat direpresentasikan menggunakan:

```python
True
False
```

Contohnya:

```python
is_verified = True
```

---

## 15. Boolean dan Angka

Dalam konteks Boolean, Python memiliki hubungan antara `bool` dan angka.

Secara sederhana:

```text
True  → 1
False → 0
```

Contohnya:

```python
print(int(True))
print(int(False))
```

Hasil:

```text
1
0
```

Namun, perlu diingat bahwa `True` dan `False` tetap merupakan nilai Boolean ketika digunakan sebagai nilai Boolean.

---

## 16. Boolean dan `bool()`

Kita dapat menggunakan `bool()` untuk memahami apakah sebuah nilai dianggap truthy atau falsy.

Contohnya:

```python
print(bool(100))
print(bool(-10))
print(bool(0))

print(bool("Python"))
print(bool(""))
```

Hasil:

```text
True
True
False
True
False
```

Cara ini dapat membantu kita memahami bagaimana Python mengevaluasi nilai dalam konteks Boolean.

---

## 17. Ringkasan Konversi Boolean

| Nilai | `bool()` | Keterangan |
| --- | --- | --- |
| `True` | `True` | Boolean |
| `False` | `False` | Boolean |
| `1` | `True` | Angka selain `0` |
| `0` | `False` | Nilai nol |
| `10` | `True` | Angka selain `0` |
| `-5` | `True` | Angka selain `0` |
| `"Hello"` | `True` | String tidak kosong |
| `"False"` | `True` | String tidak kosong |
| `""` | `False` | String kosong |

---

## 18. Contoh Program Sederhana

Contoh penggunaan Boolean dalam sebuah program:

```python
name = "Andre"
is_cool = False

print(name)
print(is_cool)

is_cool = True

print(is_cool)
```

Hasil:

```text
Andre
False
True
```

Contoh lain:

```python
username = "andre"
has_account = True
is_verified = False
```

Data tersebut dapat digunakan sebagai informasi status pengguna.

---

## 19. Mengapa Boolean Penting?

Boolean merupakan salah satu fondasi utama dalam logika pemrograman.

Hampir semua aplikasi membutuhkan pengambilan keputusan berdasarkan kondisi tertentu.

Contohnya:

```text
Apakah login berhasil?
Apakah password benar?
Apakah pengguna memiliki akses?
Apakah data tersedia?
Apakah proses selesai?
Apakah koneksi aktif?
```

Semua pertanyaan tersebut dapat direpresentasikan menggunakan nilai:

```text
True
False
```

Kemudian nilai tersebut dapat digunakan untuk menentukan tindakan program.

---

## Kesimpulan

**Boolean (`bool`)** adalah tipe data yang digunakan untuk merepresentasikan nilai logika.

Python memiliki dua nilai Boolean:

```python
True
False
```

Boolean bersifat **case-sensitive**, sehingga penulisannya harus menggunakan huruf kapital pada awal kata.

Kita juga dapat menggunakan `bool()` untuk mengubah nilai lain menjadi Boolean.

Contohnya:

```python
bool(1)
```

menghasilkan:

```text
True
```

sedangkan:

```python
bool(0)
```

menghasilkan:

```text
False
```

Untuk string:

```python
bool("Hello")
```

menghasilkan:

```text
True
```

sedangkan:

```python
bool("")
```

menghasilkan:

```text
False
```

Hal yang paling penting untuk diingat:

:::info
**Boolean hanya memiliki dua nilai, yaitu `True` dan `False`, dan digunakan sebagai fondasi untuk membuat logika serta mengontrol alur program.**
:::

Boolean akan menjadi dasar untuk memahami **comparison operators** dan **conditional statements** seperti `if`, `elif`, dan `else`.