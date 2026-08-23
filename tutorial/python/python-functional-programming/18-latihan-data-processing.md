---
sidebar_position: 18
title: "Mini Project: Data Processing"
---

Pada mini project ini kita akan menerapkan berbagai konsep **Functional Programming** yang telah dipelajari untuk melakukan pemrosesan data.

Project ini menggunakan data sederhana berupa daftar pengguna. Data tersebut akan diproses melalui beberapa tahap, seperti:

- Mengambil data tertentu.
- Melakukan transformasi data.
- Menyaring data berdasarkan kondisi.
- Menggabungkan beberapa data.
- Menghitung hasil dari data.
- Menggunakan `map()`.
- Menggunakan `filter()`.
- Menggunakan `reduce()`.
- Menggunakan `lambda`.
- Menggunakan `list comprehension`.

Tujuan utama project bukan membuat aplikasi yang kompleks, tetapi memahami bagaimana beberapa konsep Functional Programming dapat digunakan bersama untuk menyelesaikan masalah nyata.

---

## Studi Kasus

Misalkan kita memiliki data pengguna berikut:

```python
users = [
    {
        "name": "Andi",
        "age": 25,
        "score": 80
    },
    {
        "name": "Budi",
        "age": 17,
        "score": 65
    },
    {
        "name": "Citra",
        "age": 30,
        "score": 90
    },
    {
        "name": "Doni",
        "age": 20,
        "score": 75
    },
    {
        "name": "Eka",
        "age": 16,
        "score": 60
    }
]
```

Kita ingin melakukan beberapa operasi terhadap data tersebut.

---

## Tujuan Project

Project akan memiliki beberapa kebutuhan:

1. Mendapatkan nama seluruh pengguna.
2. Mendapatkan pengguna yang sudah cukup umur.
3. Mendapatkan nilai setiap pengguna.
4. Menaikkan nilai pengguna.
5. Menghitung total nilai.
6. Menghitung rata-rata nilai pengguna.
7. Membuat laporan sederhana berdasarkan hasil pemrosesan.

Dengan demikian, kita dapat melihat bagaimana data dapat melewati beberapa tahap pemrosesan.

---

## 1. Mengambil Nama Pengguna

Kita dapat menggunakan `map()` untuk mengambil nama dari setiap pengguna.

```python
users = [
    {"name": "Andi", "age": 25, "score": 80},
    {"name": "Budi", "age": 17, "score": 65},
    {"name": "Citra", "age": 30, "score": 90},
    {"name": "Doni", "age": 20, "score": 75},
    {"name": "Eka", "age": 16, "score": 60}
]

names = list(
    map(
        lambda user: user["name"],
        users
    )
)

print(names)
```

Output:

```text
['Andi', 'Budi', 'Citra', 'Doni', 'Eka']
```

Pada proses tersebut:

```text
users
  ↓
map()
  ↓
ambil name
  ↓
names
```

---

## 2. Menggunakan List Comprehension

Operasi yang sama dapat dilakukan menggunakan `list comprehension`.

```python
names = [
    user["name"]
    for user in users
]

print(names)
```

Output:

```text
['Andi', 'Budi', 'Citra', 'Doni', 'Eka']
```

Kedua pendekatan tersebut menghasilkan data yang sama.

---

## 3. Filtering Pengguna

Selanjutnya kita ingin mendapatkan pengguna yang berusia minimal `18` tahun.

Kita dapat menggunakan `filter()`.

```python
adults = list(
    filter(
        lambda user: user["age"] >= 18,
        users
    )
)

print(adults)
```

Hasilnya adalah pengguna yang memenuhi kondisi:

```python
user["age"] >= 18
```

Data yang memenuhi kondisi tersebut adalah:

```text
Andi
Citra
Doni
```

---

## 4. Filtering dengan List Comprehension

Operasi yang sama dapat dilakukan menggunakan `list comprehension`.

```python
adults = [
    user
    for user in users
    if user["age"] >= 18
]

print(adults)
```

Pendekatan ini sering lebih mudah dibaca ketika kondisi filtering sederhana.

---

## 5. Mengambil Nilai Pengguna

Selanjutnya kita ingin mengambil seluruh nilai pengguna.

Menggunakan `map()`:

```python
scores = list(
    map(
        lambda user: user["score"],
        users
    )
)

print(scores)
```

Output:

```text
[80, 65, 90, 75, 60]
```

---

## 6. Menaikkan Nilai

Misalnya setiap pengguna mendapatkan tambahan nilai sebesar `5`.

Kita dapat menggunakan `map()`:

```python
updated_scores = list(
    map(
        lambda score: score + 5,
        scores
    )
)

print(updated_scores)
```

Output:

```text
[85, 70, 95, 80, 65]
```

Data `scores` sebelumnya tidak diubah.

```python
print(scores)
```

Output:

```text
[80, 65, 90, 75, 60]
```

Hal ini menunjukkan bahwa kita menghasilkan data baru daripada mengubah data sebelumnya.

---

## 7. Menghitung Total Nilai dengan `reduce()`

Untuk menghitung total seluruh nilai, kita dapat menggunakan `reduce()`.

```python
from functools import reduce

total_score = reduce(
    lambda acc, score: acc + score,
    scores,
    0
)

print(total_score)
```

Output:

```text
370
```

Prosesnya:

```text
0 + 80 = 80
80 + 65 = 145
145 + 90 = 235
235 + 75 = 310
310 + 60 = 370
```

Hasil akhirnya:

```text
370
```

---

## 8. Menghitung Rata-Rata

Setelah mendapatkan total nilai, kita dapat menghitung rata-rata.

```python
average_score = total_score / len(scores)

print(average_score)
```

Output:

```text
74.0
```

Perhitungannya:

```text
370 / 5 = 74
```

---

## 9. Filtering Nilai Lulus

Misalnya nilai minimal kelulusan adalah `70`.

Kita dapat menggunakan `filter()`:

```python
passed_scores = list(
    filter(
        lambda score: score >= 70,
        scores
    )
)

print(passed_scores)
```

Output:

```text
[80, 90, 75]
```

Nilai yang kurang dari `70` tidak dimasukkan ke dalam hasil.

---

## 10. Menggunakan `map()` dan `filter()` Bersama

Kita juga dapat menggabungkan beberapa operasi.

Misalnya kita ingin memberikan bonus `5` hanya kepada pengguna yang sudah dewasa.

Tahap pertama adalah melakukan filtering:

```python
adults = filter(
    lambda user: user["age"] >= 18,
    users
)
```

Kemudian melakukan transformasi:

```python
adult_scores = map(
    lambda user: user["score"] + 5,
    adults
)
```

Hasil akhirnya:

```python
adult_scores = list(adult_scores)

print(adult_scores)
```

Output:

```text
[85, 95, 80]
```

Alurnya:

```text
users
  ↓
filter()
  ↓
pengguna dewasa
  ↓
map()
  ↓
tambahkan bonus
  ↓
hasil akhir
```

---

## 11. Menggunakan Function Composition

Kita juga dapat membuat fungsi kecil untuk setiap proses.

Contoh:

```python
def is_adult(user):
    return user["age"] >= 18


def add_bonus(user):
    return {
        **user,
        "score": user["score"] + 5
    }
```

Kemudian fungsi tersebut digunakan secara berurutan:

```python
adults = filter(is_adult, users)

users_with_bonus = map(add_bonus, adults)

result = list(users_with_bonus)

print(result)
```

Pendekatan ini membuat setiap fungsi memiliki tanggung jawab yang jelas.

---

## 12. Membuat Fungsi untuk Mengambil Nilai

Daripada menggunakan `lambda` berkali-kali, kita dapat membuat fungsi khusus.

```python
def get_score(user):
    return user["score"]
```

Kemudian:

```python
scores = list(
    map(get_score, users)
)

print(scores)
```

Output:

```text
[80, 65, 90, 75, 60]
```

Keuntungan pendekatan ini adalah fungsi `get_score()` dapat digunakan kembali.

---

## 13. Membuat Fungsi untuk Menghitung Total

Kita juga dapat membuat fungsi khusus untuk menghitung total nilai.

```python
from functools import reduce


def add_scores(acc, score):
    return acc + score


total_score = reduce(
    add_scores,
    scores,
    0
)

print(total_score)
```

Output:

```text
370
```

Dengan demikian, kode menjadi lebih deskriptif dibandingkan menempatkan seluruh logika dalam `lambda`.

---

## 14. Membuat Laporan Sederhana

Kita dapat menggabungkan beberapa hasil pemrosesan menjadi laporan.

```python
report = {
    "total_users": len(users),
    "total_score": total_score,
    "average_score": average_score,
    "passed_users": len(passed_scores)
}

print(report)
```

Output:

```text
{
    'total_users': 5,
    'total_score': 370,
    'average_score': 74.0,
    'passed_users': 3
}
```

---

## 15. Menggunakan Dictionary Comprehension

Kita dapat membuat dictionary berisi nama dan nilai menggunakan `dictionary comprehension`.

```python
score_by_name = {
    user["name"]: user["score"]
    for user in users
}

print(score_by_name)
```

Output:

```text
{
    'Andi': 80,
    'Budi': 65,
    'Citra': 90,
    'Doni': 75,
    'Eka': 60
}
```

Struktur datanya menjadi:

```text
name → score
```

Contohnya:

```text
Andi  → 80
Budi  → 65
Citra → 90
Doni  → 75
Eka   → 60
```

---

## 16. Filtering dengan Dictionary Comprehension

Kita juga dapat membuat dictionary yang hanya berisi pengguna yang lulus.

```python
passed_users = {
    user["name"]: user["score"]
    for user in users
    if user["score"] >= 70
}

print(passed_users)
```

Output:

```text
{
    'Andi': 80,
    'Citra': 90,
    'Doni': 75
}
```

---

## 17. Mini Project Lengkap

Berikut implementasi sederhana yang menggabungkan konsep-konsep yang telah dipelajari.

```python
from functools import reduce


users = [
    {"name": "Andi", "age": 25, "score": 80},
    {"name": "Budi", "age": 17, "score": 65},
    {"name": "Citra", "age": 30, "score": 90},
    {"name": "Doni", "age": 20, "score": 75},
    {"name": "Eka", "age": 16, "score": 60}
]


def is_adult(user):
    return user["age"] >= 18


def get_score(user):
    return user["score"]


def add_scores(acc, score):
    return acc + score


# Mengambil pengguna dewasa
adults = list(
    filter(
        is_adult,
        users
    )
)


# Mengambil nilai pengguna dewasa
adult_scores = list(
    map(
        get_score,
        adults
    )
)


# Menghitung total nilai
total_score = reduce(
    add_scores,
    adult_scores,
    0
)


# Menghitung rata-rata
average_score = total_score / len(adult_scores)


# Membuat laporan
report = {
    "total_users": len(users),
    "adult_users": len(adults),
    "total_score": total_score,
    "average_score": average_score
}


print(report)
```

Output:

```text
{
    'total_users': 5,
    'adult_users': 3,
    'total_score': 245,
    'average_score': 81.66666666666667
}
```

---

## 18. Alur Data Project

Secara keseluruhan, data melewati beberapa tahap:

```text
users
  │
  ▼
filter()
  │
  │ hanya pengguna berusia >= 18
  ▼
adults
  │
  ▼
map()
  │
  │ mengambil score
  ▼
adult_scores
  │
  ▼
reduce()
  │
  │ menjumlahkan score
  ▼
total_score
  │
  ▼
average
  │
  ▼
report
```

Pendekatan ini menunjukkan bagaimana beberapa konsep Functional Programming dapat digunakan sebagai sebuah pipeline pemrosesan data.

---

## 19. Konsep Functional Programming yang Digunakan

Mini project ini menggabungkan beberapa konsep yang telah dipelajari:

| Konsep | Penggunaan |
|---|---|
| Pure Function | Fungsi seperti `is_adult()` dan `get_score()` |
| First-Class Function | Fungsi diberikan sebagai argumen ke `map()` dan `filter()` |
| Higher-Order Function | `map()`, `filter()`, dan `reduce()` |
| `map()` | Transformasi data |
| `filter()` | Penyaringan data |
| `reduce()` | Menghasilkan satu nilai |
| `lambda` | Fungsi sederhana |
| List Comprehension | Membuat list secara ringkas |
| Dictionary Comprehension | Membuat dictionary secara ringkas |
| Immutability | Menghasilkan data baru tanpa mengubah data awal |
| Function Composition | Menggabungkan beberapa tahap pemrosesan |

---

## 20. Pembelajaran dari Mini Project

Mini project ini menunjukkan bahwa Functional Programming bukan hanya tentang menggunakan `map()`, `filter()`, atau `reduce()` secara terpisah.

Yang lebih penting adalah bagaimana kita **memecah proses menjadi fungsi-fungsi kecil**, kemudian menggabungkannya menjadi sebuah alur pemrosesan data.

Contohnya:

```text
Input
  ↓
Filter
  ↓
Transform
  ↓
Aggregate
  ↓
Report
```

Setiap tahap memiliki tanggung jawab yang berbeda.

Pendekatan seperti ini dapat membuat kode menjadi:

- Lebih modular.
- Lebih mudah diuji.
- Lebih mudah digunakan kembali.
- Lebih mudah dikembangkan.
- Lebih mudah dipahami ketika proses semakin kompleks.

---

## Kesimpulan

Mini Project **Data Processing** merupakan latihan untuk menggabungkan konsep-konsep Functional Programming yang telah dipelajari sebelumnya.

Melalui project ini kita dapat melihat bagaimana:

```text
Pure Functions
      +
First-Class Functions
      +
Higher-Order Functions
      +
map()
      +
filter()
      +
reduce()
      +
Comprehensions
      +
Immutability
      ↓
Data Processing Pipeline
```

Konsep yang paling penting adalah memahami **alur data dari satu fungsi ke fungsi berikutnya**.

Dengan memahami pola tersebut, kita dapat membangun pemrosesan data yang lebih modular dan mudah dikembangkan tanpa harus menempatkan seluruh logika ke dalam satu fungsi besar.