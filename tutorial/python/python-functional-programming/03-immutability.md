---
sidebar_position: 3
title: "Immutability"
---

**Immutability** atau ketidakdapatubahan adalah konsep penting dalam Functional Programming.

Immutability berarti sebuah data **tidak diubah secara langsung setelah data tersebut dibuat**.

Ketika kita membutuhkan hasil yang berbeda, pendekatan immutable lebih mendorong kita untuk membuat **data baru** berdasarkan data sebelumnya.

Secara sederhana:

```text
Data asli
   │
   ↓
Function
   │
   ↓
Data baru
```

Bukan:

```text
Data asli
   │
   ↓
Diubah langsung
   │
   ↓
Data asli berubah
```

Konsep ini membantu mengurangi perubahan state yang tidak terduga dan membuat alur data lebih mudah dipahami.

---

## Mutable dan Immutable

Sebelum memahami immutability dalam Functional Programming, kita perlu membedakan **mutable object** dan **immutable object**.

### Mutable

Object mutable adalah object yang isinya dapat diubah setelah object dibuat.

Beberapa contoh tipe data mutable di Python:

```text
list
dict
set
```

Contoh:

```python
numbers = [1, 2, 3]

numbers.append(4)

print(numbers)
```

Output:

```text
[1, 2, 3, 4]
```

List yang sama telah berubah.

Sebelum:

```text
[1, 2, 3]
```

Setelah:

```text
[1, 2, 3, 4]
```

---

## Immutable

Object immutable adalah object yang tidak dapat diubah setelah dibuat.

Beberapa contoh tipe data immutable di Python:

```text
int
float
bool
str
tuple
frozenset
```

Contohnya:

```python
name = "Budi"
```

Kita tidak dapat mengubah karakter tertentu secara langsung:

```python
name[0] = "A"
```

Kode tersebut akan menghasilkan error karena string bersifat immutable.

Jika kita membutuhkan string yang berbeda, kita membuat nilai baru:

```python
name = "Andi"
```

Dalam hal ini, kita tidak mengubah karakter pada string lama, tetapi membuat binding `name` merujuk pada nilai string yang baru.

---

## Immutability Tidak Sama dengan `const`

Python tidak memiliki keyword `const` seperti yang tersedia pada beberapa bahasa pemrograman.

Ketika kita menulis:

```python
number = 10
```

kita masih dapat melakukan:

```python
number = 20
```

Ini tidak berarti integer `10` diubah menjadi `20`.

Yang terjadi adalah nama `number` sekarang merujuk pada object integer yang berbeda.

Secara konsep:

```text
Sebelum:

number ──→ 10


Setelah:

number ──→ 20
```

Object integer `10` tidak diubah menjadi `20`.

---

## Contoh Immutable dengan Integer

Perhatikan:

```python
number = 10

number = number + 5

print(number)
```

Output:

```text
15
```

Secara sederhana kita dapat menganggap prosesnya:

```text
number ──→ 10

        ↓ + 5

number ──→ 15
```

Integer merupakan immutable object.

Operasi:

```python
number + 5
```

menghasilkan nilai baru.

---

## Contoh Mutable dengan List

Sekarang bandingkan dengan list:

```python
numbers = [1, 2, 3]

numbers.append(4)

print(numbers)
```

Output:

```text
[1, 2, 3, 4]
```

Method `append()` memodifikasi list yang sama.

Secara konsep:

```text
numbers
   │
   ↓
[1, 2, 3]

   ↓ append(4)

[1, 2, 3, 4]
```

Inilah salah satu contoh **mutation**.

---

## Mutation

**Mutation** adalah perubahan terhadap isi sebuah object setelah object tersebut dibuat.

Contoh:

```python
numbers = [1, 2, 3]

numbers.append(4)
numbers.append(5)

print(numbers)
```

Output:

```text
[1, 2, 3, 4, 5]
```

List mengalami mutation karena isinya berubah.

Dalam Functional Programming, mutation sebisa mungkin dikurangi, terutama ketika mutation tersebut dapat menyebabkan perubahan state yang sulit dilacak.

---

## Mengapa Mutation Dapat Menjadi Masalah?

Perubahan object secara langsung dapat menjadi masalah ketika object tersebut digunakan oleh beberapa bagian program.

Contoh:

```python
numbers = [1, 2, 3]


def add_number(numbers):
    numbers.append(4)


add_number(numbers)

print(numbers)
```

Output:

```text
[1, 2, 3, 4]
```

Function `add_number()` tidak mengembalikan list baru.

Sebaliknya, function tersebut mengubah list yang diberikan sebagai argument.

Hal ini merupakan **side effect**.

---

## Mutation dan Shared State

Masalah dapat menjadi lebih sulit ketika satu object digunakan oleh beberapa bagian program.

Contoh:

```python
numbers = [1, 2, 3]

numbers_copy = numbers

numbers_copy.append(4)

print(numbers)
```

Output:

```text
[1, 2, 3, 4]
```

Mengapa `numbers` ikut berubah?

Karena:

```python
numbers_copy = numbers
```

tidak membuat list baru.

Keduanya merujuk pada object list yang sama.

Secara konsep:

```text
numbers ───────┐
               ↓
          [1, 2, 3]
               ↑
               │
numbers_copy ──┘
```

Ketika `numbers_copy` dimodifikasi:

```python
numbers_copy.append(4)
```

object yang sama berubah.

---

## Membuat Salinan Data

Jika kita ingin membuat list baru, kita dapat menggunakan beberapa pendekatan.

Contohnya:

```python
numbers = [1, 2, 3]

numbers_copy = numbers.copy()

numbers_copy.append(4)

print(numbers)
print(numbers_copy)
```

Output:

```text
[1, 2, 3]
[1, 2, 3, 4]
```

Sekarang kedua variable merujuk pada object yang berbeda.

Secara konsep:

```text
numbers
   ↓
[1, 2, 3]


numbers_copy
   ↓
[1, 2, 3, 4]
```

---

## Pendekatan Functional: Menghasilkan Data Baru

Dalam Functional Programming, kita dapat membuat function yang menghasilkan collection baru daripada mengubah collection yang diberikan.

Contoh:

```python
def add_number(numbers):
    return numbers + [4]


numbers = [1, 2, 3]

new_numbers = add_number(numbers)

print(numbers)
print(new_numbers)
```

Output:

```text
[1, 2, 3]
[1, 2, 3, 4]
```

List asli tetap:

```text
[1, 2, 3]
```

Sedangkan function menghasilkan list baru:

```text
[1, 2, 3, 4]
```

Pendekatan ini lebih dekat dengan prinsip immutability.

---

## Immutability dengan List Comprehension

List comprehension juga dapat digunakan untuk menghasilkan list baru.

Misalnya:

```python
numbers = [1, 2, 3, 4]

new_numbers = [
    number * 2
    for number in numbers
]

print(numbers)
print(new_numbers)
```

Output:

```text
[1, 2, 3, 4]
[2, 4, 6, 8]
```

List asli tidak diubah.

Function atau expression menghasilkan collection baru.

---

## Immutability dan Pure Function

Immutability memiliki hubungan erat dengan **Pure Function**.

Pure function berusaha:

- Menghasilkan output berdasarkan input.
- Tidak mengubah data di luar function.
- Tidak menghasilkan side effect yang tidak diperlukan.

Contoh:

```python
def multiply_by_two(numbers):
    return [
        number * 2
        for number in numbers
    ]
```

Kemudian:

```python
numbers = [1, 2, 3]

result = multiply_by_two(numbers)

print(numbers)
print(result)
```

Output:

```text
[1, 2, 3]
[2, 4, 6]
```

Function tidak mengubah `numbers`.

Sebaliknya, function menghasilkan list baru.

---

## Contoh Function yang Mengubah Data

Bandingkan dengan pendekatan berikut:

```python
def multiply_by_two(numbers):
    for index in range(len(numbers)):
        numbers[index] = numbers[index] * 2

    return numbers
```

Kemudian:

```python
numbers = [1, 2, 3]

result = multiply_by_two(numbers)

print(numbers)
print(result)
```

Output:

```text
[2, 4, 6]
[2, 4, 6]
```

List asli telah dimodifikasi.

Pendekatan tersebut menggunakan mutation.

---

## Perbandingan Kedua Pendekatan

### Mutation

```python
def multiply_by_two(numbers):
    for index in range(len(numbers)):
        numbers[index] *= 2

    return numbers
```

Alurnya:

```text
List asli
   ↓
Dimodifikasi
   ↓
List asli berubah
```

### Immutable Approach

```python
def multiply_by_two(numbers):
    return [
        number * 2
        for number in numbers
    ]
```

Alurnya:

```text
List asli
   ↓
Diproses
   ↓
List baru
```

Pendekatan kedua lebih sesuai dengan prinsip Functional Programming.

---

## Immutability pada Dictionary

Dictionary merupakan mutable object.

Contoh mutation:

```python
user = {
    "name": "Budi",
    "age": 25
}

user["age"] = 26

print(user)
```

Output:

```text
{
    "name": "Budi",
    "age": 26
}
```

Dictionary yang sama telah dimodifikasi.

Jika ingin menggunakan pendekatan yang tidak memodifikasi dictionary asli, kita dapat membuat dictionary baru.

Contoh:

```python
user = {
    "name": "Budi",
    "age": 25
}

new_user = {
    **user,
    "age": 26
}

print(user)
print(new_user)
```

Output:

```text
{
    "name": "Budi",
    "age": 25
}

{
    "name": "Budi",
    "age": 26
}
```

Dictionary asli tetap tidak berubah.

---

## Immutability pada Set

Set juga merupakan mutable object.

Contoh:

```python
numbers = {1, 2, 3}

numbers.add(4)

print(numbers)
```

Output:

```text
{1, 2, 3, 4}
```

Set telah dimodifikasi.

Python menyediakan `frozenset` sebagai versi set yang immutable.

Contoh:

```python
numbers = frozenset([1, 2, 3])

print(numbers)
```

Kita tidak dapat menggunakan:

```python
numbers.add(4)
```

karena `frozenset` tidak menyediakan operasi mutation tersebut.

---

## Immutability pada Tuple

Tuple merupakan immutable object.

Contoh:

```python
numbers = (1, 2, 3)
```

Kita tidak dapat mengubah elemen secara langsung:

```python
numbers[0] = 10
```

Kode tersebut menghasilkan:

```text
TypeError
```

Jika membutuhkan tuple berbeda, kita membuat tuple baru:

```python
numbers = (10, 2, 3)
```

---

## Hati-Hati dengan Nested Object

Immutability dapat menjadi lebih kompleks ketika sebuah immutable object berisi mutable object.

Contohnya:

```python
data = (
    "Budi",
    [1, 2, 3]
)
```

Tuple tersebut immutable, tetapi list di dalamnya mutable.

Kita masih dapat melakukan:

```python
data[1].append(4)

print(data)
```

Output:

```text
("Budi", [1, 2, 3, 4])
```

Tuple-nya sendiri tidak diganti, tetapi object list yang berada di dalamnya mengalami mutation.

Hal ini penting ketika membahas immutability pada struktur data yang kompleks.

---

## Shallow Copy dan Deep Copy

Ketika bekerja dengan data yang memiliki struktur bertingkat, membuat salinan tidak selalu berarti seluruh object di dalamnya ikut disalin.

Contoh:

```python
users = [
    {
        "name": "Budi"
    }
]
```

Jika kita menggunakan shallow copy:

```python
users_copy = users.copy()
```

list bagian luar memang dibuat baru, tetapi dictionary di dalamnya masih dapat merujuk pada object yang sama.

Untuk struktur data bertingkat, Python menyediakan module `copy`.

Contohnya:

```python
import copy

users = [
    {
        "name": "Budi"
    }
]

users_copy = copy.deepcopy(users)

users_copy[0]["name"] = "Andi"

print(users)
print(users_copy)
```

Output:

```text
[{"name": "Budi"}]
[{"name": "Andi"}]
```

Dengan `deepcopy()`, object yang berada di dalam struktur juga disalin secara rekursif.

---

## Immutability Bukan Berarti Semua Data Harus Immutable

Dalam Python, kita tidak harus membuat seluruh aplikasi menggunakan immutable object.

Python sendiri menyediakan banyak mutable object seperti:

```text
list
dict
set
```

Mutation juga dapat berguna dalam kondisi tertentu.

Yang penting dalam Functional Programming adalah memahami **kapan mutation diperlukan dan kapan sebaiknya dihindari**.

---

## Manfaat Immutability

Mengurangi mutation dapat memberikan beberapa manfaat.

### Predictability

Data lebih mudah diprediksi karena tidak berubah secara tiba-tiba.

### Easier Testing

Function yang tidak mengubah data luar lebih mudah diuji.

### Easier Debugging

Perubahan state yang lebih sedikit membuat bug lebih mudah dilacak.

### Reduced Side Effects

Mutation yang tidak diperlukan dapat dikurangi.

### Safer Shared Data

Data yang tidak dimodifikasi secara langsung lebih aman ketika digunakan oleh beberapa bagian program.

---

## Immutability dan State

Salah satu alasan immutability penting dalam Functional Programming adalah untuk mengurangi kompleksitas **state**.

Dengan mutation:

```text
State
 ↓
Berubah
 ↓
Berubah lagi
 ↓
Berubah lagi
```

Semakin banyak bagian program yang dapat mengubah state, semakin sulit melacak kondisi data.

Dengan pendekatan immutable:

```text
State 1
  ↓
Function
  ↓
State 2
  ↓
Function
  ↓
State 3
```

Setiap tahap menghasilkan data baru.

Pendekatan ini membuat perubahan state lebih eksplisit.

---

## Immutability Bukan Hanya Tentang Performa

Immutability terkadang dianggap hanya berkaitan dengan membuat copy object.

Padahal tujuan utamanya dalam Functional Programming lebih luas.

Immutability membantu kita membuat alur program:

```text
lebih predictable
lebih mudah diuji
lebih mudah dipahami
lebih mudah dilacak
```

Jadi fokus utamanya bukan sekadar:

> "Jangan pernah mengubah object."

Tetapi:

> "Hindari perubahan state yang tidak diperlukan dan tidak terkontrol."

---

## Kapan Mutation Masih Tepat?

Mutation masih dapat digunakan ketika memang memberikan manfaat dan tidak menimbulkan kompleksitas yang tidak perlu.

Misalnya untuk proses internal yang sederhana:

```python
numbers = []

for number in range(5):
    numbers.append(number)

print(numbers)
```

Penggunaan `append()` di sini tidak otomatis membuat kode menjadi buruk.

Functional Programming merupakan pendekatan desain, bukan larangan mutlak terhadap mutation.

---

## Prinsip Praktis

Ketika menulis program Python dengan pendekatan Functional Programming, kita dapat menggunakan beberapa prinsip:

```text
1. Jangan mengubah data jika tidak diperlukan.
2. Utamakan menghasilkan data baru.
3. Hindari perubahan state global.
4. Pisahkan pure function dari side effect.
5. Gunakan object immutable jika sesuai kebutuhan.
6. Pahami apakah sebuah object mutable atau immutable.
```

---

## Ringkasan Mutable dan Immutable

| Tipe Data | Mutable / Immutable |
|---|---|
| `int` | Immutable |
| `float` | Immutable |
| `bool` | Immutable |
| `str` | Immutable |
| `tuple` | Immutable |
| `frozenset` | Immutable |
| `list` | Mutable |
| `dict` | Mutable |
| `set` | Mutable |

---

## Kesimpulan

**Immutability** adalah konsep untuk mempertahankan data agar tidak dimodifikasi secara langsung setelah dibuat.

Python memiliki object mutable dan immutable.

Contoh immutable:

```text
int
float
bool
str
tuple
frozenset
```

Contoh mutable:

```text
list
dict
set
```

Dalam Functional Programming, kita cenderung mengurangi mutation dan lebih sering menggunakan pendekatan:

```text
Data lama
   ↓
Function
   ↓
Data baru
```

Contohnya:

```python
def multiply_by_two(numbers):
    return [
        number * 2
        for number in numbers
    ]


numbers = [1, 2, 3]

result = multiply_by_two(numbers)

print(numbers)
print(result)
```

Output:

```text
[1, 2, 3]
[2, 4, 6]
```

Data asli tetap dipertahankan, sedangkan function menghasilkan data baru.

Dengan memahami immutability, kita memiliki fondasi penting untuk memahami konsep Functional Programming berikutnya, terutama **First-Class Functions, Higher-Order Functions, `map()`, `filter()`, `reduce()`, dan Function Composition**.