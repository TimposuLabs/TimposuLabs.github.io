---
sidebar_position: 14
title: "For Loop vs While Loop"
---

Python menyediakan dua jenis perulangan yang paling sering digunakan, yaitu `for` loop dan `while` loop.

Keduanya dapat digunakan untuk menjalankan kode secara berulang, tetapi cara menentukan kapan perulangan dilakukan berbeda.

Sebagai aturan sederhana:

- Gunakan `for` ketika ingin **mengiterasi iterable** atau jumlah perulangan sudah dapat ditentukan.
- Gunakan `while` ketika perulangan bergantung pada **suatu kondisi** dan jumlah iterasinya belum diketahui secara pasti.

---

## 1. Menggunakan `for` untuk Iterasi

`for` loop sangat cocok ketika kita ingin mengakses setiap elemen dari sebuah iterable seperti `list`, `tuple`, `string`, `set`, atau `range`.

Contoh:

```python
my_list = [1, 2, 3]

for item in my_list:
    print(item)
```

Output:

```text
1
2
3
```

Kode tersebut langsung menunjukkan bahwa setiap elemen dalam `my_list` akan diproses satu per satu.

Tidak diperlukan variabel counter secara manual.

---

## 2. Menggunakan `while` untuk Iterasi

Proses yang sama dapat dilakukan menggunakan `while`.

```python
my_list = [1, 2, 3]

i = 0

while i < len(my_list):
    print(my_list[i])
    i += 1
```

Output:

```text
1
2
3
```

Namun, pendekatan ini membutuhkan beberapa hal tambahan:

- Variabel `i` sebagai indeks.
- Kondisi `i < len(my_list)`.
- Perubahan nilai `i` menggunakan `i += 1`.

Karena itu, untuk sekadar mengiterasi seluruh elemen list, `for` biasanya lebih sederhana dan lebih mudah dibaca.

---

## 3. Kapan Menggunakan `for` Loop?

Gunakan `for` ketika proses yang dilakukan berhubungan dengan elemen-elemen dalam sebuah iterable.

Contoh:

```python
names = ["Andi", "Budi", "Citra"]

for name in names:
    print(f"Halo {name}")
```

`for` juga cocok ketika jumlah iterasi sudah diketahui menggunakan `range()`.

```python
for i in range(5):
    print(i)
```

Pada contoh tersebut, kita sudah mengetahui bahwa loop akan berjalan sebanyak lima kali.

---

## 4. Kapan Menggunakan `while` Loop?

Gunakan `while` ketika perulangan bergantung pada suatu kondisi dan kita tidak mengetahui secara pasti berapa kali proses tersebut akan dilakukan.

Contohnya adalah program yang meminta input pengguna sampai pengguna memberikan perintah tertentu.

```python
while True:
    response = input("Say something: ")

    if response == "bye":
        break
```

Program tersebut tidak menentukan sejak awal berapa kali pengguna akan memasukkan data.

Program akan terus berjalan sampai pengguna mengetik:

```text
bye
```

---

## 5. Pola `while True` dan `break`

Kombinasi `while True` dan `break` merupakan pola yang sering digunakan ketika kondisi berhenti baru diketahui saat program sedang berjalan.

Contoh:

```python
while True:
    response = input("Ketik 'bye' untuk keluar: ")

    if response == "bye":
        print("Program selesai.")
        break

    print(f"Kamu mengetik: {response}")
```

Cara kerjanya:

1. `while True` membuat loop terus berjalan.
2. Program meminta input dari pengguna.
3. Input diperiksa menggunakan `if`.
4. Jika input adalah `bye`, `break` menghentikan loop.
5. Jika bukan `bye`, program kembali ke iterasi berikutnya.

Pola ini sangat berguna untuk membuat program interaktif.

---

## 6. Perbedaan Cara Berpikir

Perbedaan paling penting bukan sekadar sintaks, tetapi **cara menentukan perulangan**.

### `for`

Cara berpikirnya:

> "Saya ingin melakukan sesuatu untuk setiap item."

Contoh:

```python
for item in shopping_cart:
    print(item)
```

### `while`

Cara berpikirnya:

> "Saya ingin terus melakukan sesuatu selama kondisi tertentu terpenuhi."

Contoh:

```python
while balance > 0:
    process_payment()
```

---

## 7. Risiko Infinite Loop

`for` biasanya memiliki batas perulangan yang berasal dari iterable sehingga risiko infinite loop relatif kecil.

```python
for item in [1, 2, 3]:
    print(item)
```

Sebaliknya, `while` harus memiliki kondisi yang pada akhirnya dapat berubah menjadi `False`.

Contoh yang benar:

```python
i = 0

while i < 5:
    print(i)
    i += 1
```

Jika `i += 1` dihilangkan:

```python
i = 0

while i < 5:
    print(i)
```

nilai `i` akan tetap `0`, sehingga kondisi `i < 5` selalu bernilai `True`.

Akibatnya, loop tidak akan berhenti secara normal.

---

## 8. Tabel Perbandingan

| Fitur | `for` Loop | `while` Loop |
|---|---|---|
| Penggunaan utama | Mengiterasi iterable | Perulangan berdasarkan kondisi |
| Jumlah iterasi | Biasanya sudah dapat ditentukan | Sering belum diketahui |
| Contoh | List, tuple, string, `range()` | Input pengguna, status program |
| Counter manual | Biasanya tidak diperlukan | Sering diperlukan |
| Risiko infinite loop | Relatif rendah | Lebih tinggi |
| Keterbacaan | Sederhana untuk iterasi | Fleksibel untuk kondisi kompleks |

---

## 9. Rule of Thumb

Gunakan aturan sederhana berikut ketika menentukan jenis loop:

### Gunakan `for` jika:

- Ingin mengiterasi list.
- Ingin mengiterasi tuple.
- Ingin mengiterasi string.
- Ingin mengiterasi dictionary.
- Ingin melakukan perulangan berdasarkan `range()`.
- Jumlah iterasi atau sumber data sudah jelas.

Contoh:

```python
for item in my_list:
    print(item)
```

### Gunakan `while` jika:

- Jumlah iterasi belum diketahui.
- Perulangan bergantung pada kondisi.
- Menunggu input pengguna.
- Program harus berjalan sampai kondisi tertentu terpenuhi.
- Membutuhkan kontrol yang lebih fleksibel terhadap kapan loop berhenti.

Contoh:

```python
while user_is_active:
    process_user()
```

---

## Kesimpulan

`for` dan `while` sama-sama digunakan untuk melakukan perulangan, tetapi memiliki tujuan penggunaan yang berbeda.

`for` sangat cocok untuk **mengiterasi data atau melakukan sejumlah iterasi yang sudah jelas**, sedangkan `while` cocok ketika **perulangan bergantung pada kondisi yang dapat berubah selama program berjalan**.

Memilih jenis loop yang tepat tidak hanya membuat kode lebih pendek, tetapi juga membuat kode lebih **jelas, mudah dibaca, dan lebih mudah dipelihara**.