---
sidebar_position: 20
title: "Positional Arguments, Keyword Arguments & Default Parameters"
---

Saat menggunakan function, Python menyediakan beberapa cara untuk memberikan nilai kepada parameter. Tiga konsep penting yang perlu dipahami adalah **positional arguments**, **keyword arguments**, dan **default parameters**.

Ketiganya membuat function menjadi lebih fleksibel dan memungkinkan kita menentukan bagaimana data diberikan ketika function dipanggil.

---

## Positional Arguments

**Positional argument** adalah argument yang diberikan kepada function berdasarkan **urutan atau posisi parameter** yang terdapat pada definisi function.

Contoh:

```python
def say_hello(name, emoji):
    print(f'Hello {name} {emoji}')

say_hello('Andre', '😊')
```

Pada contoh tersebut:

```text
'Andre' → name
'😊'     → emoji
```

Argument pertama diberikan kepada parameter pertama, sedangkan argument kedua diberikan kepada parameter kedua.

---

## Urutan Positional Arguments

Urutan argument sangat penting ketika menggunakan positional arguments.

```python
def say_hello(name, emoji):
    print(f'Hello {name} {emoji}')

say_hello('Andre', '😊')
```

Output:

```text
Hello Andre 😊
```

Jika urutannya ditukar:

```python
say_hello('😊', 'Andre')
```

Maka hasilnya menjadi:

```text
Hello 😊 Andre
```

Python tetap menjalankan function karena jumlah argument sesuai, tetapi nilai tersebut diberikan kepada parameter yang berbeda.

---

## Kelebihan Positional Arguments

Positional arguments memiliki beberapa keuntungan:

- Penulisannya sederhana.
- Kodenya ringkas.
- Mudah digunakan ketika function memiliki sedikit parameter.
- Cocok ketika urutan parameter sudah jelas.

Contoh:

```python
def calculate_total(price, quantity):
    return price * quantity

total = calculate_total(50000, 3)

print(total)
```

Pada contoh tersebut:

```text
50000 → price
3     → quantity
```

---

## Keyword Arguments

**Keyword argument** adalah argument yang diberikan dengan menyebutkan **nama parameter secara eksplisit**.

Contoh:

```python
def say_hello(name, emoji):
    print(f'Hello {name} {emoji}')

say_hello(name='Andre', emoji='😊')
```

Berbeda dengan positional argument, kita secara langsung menentukan argument tersebut akan diberikan kepada parameter yang mana.

---

## Urutan Keyword Arguments

Salah satu keuntungan keyword arguments adalah urutannya tidak harus sama dengan definisi parameter.

Contoh:

```python
def say_hello(name, emoji):
    print(f'Hello {name} {emoji}')

say_hello(emoji='😊', name='Andre')
```

Meskipun `emoji` ditulis terlebih dahulu, Python tetap mengetahui bahwa:

```text
emoji → '😊'
name  → 'Andre'
```

Output:

```text
Hello Andre 😊
```

---

## Kelebihan Keyword Arguments

Keyword arguments dapat meningkatkan **readability** karena hubungan antara argument dan parameter terlihat secara langsung.

Contoh:

```python
create_user(name='Andre', age=30, active=True)
```

Lebih mudah dipahami karena kita dapat langsung mengetahui:

```text
name   → Andre
age    → 30
active → True
```

---

## Positional Arguments vs Keyword Arguments

Perhatikan perbandingan berikut.

### Positional Arguments

```python
def create_user(name, age, active):
    print(name, age, active)

create_user('Andre', 30, True)
```

### Keyword Arguments

```python
def create_user(name, age, active):
    print(name, age, active)

create_user(
    name='Andre',
    age=30,
    active=True
)
```

Keduanya menghasilkan data yang sama, tetapi keyword arguments memberikan informasi yang lebih jelas mengenai setiap nilai.

---

## Default Parameters

**Default parameter** adalah parameter yang memiliki **nilai bawaan** ketika function didefinisikan.

Contoh:

```python
def say_hello(name='Darth Vader', emoji='😈'):
    print(f'Hello {name} {emoji}')
```

Pada function tersebut:

```text
name  → 'Darth Vader'
emoji → '😈'
```

merupakan nilai default.

---

## Menggunakan Default Parameter

Function dapat dipanggil tanpa memberikan argument:

```python
def say_hello(name='Darth Vader', emoji='😈'):
    print(f'Hello {name} {emoji}')

say_hello()
```

Output:

```text
Hello Darth Vader 😈
```

Python menggunakan nilai default karena tidak ada argument yang diberikan.

---

## Mengubah Nilai Default

Nilai default bukan berarti nilainya tidak dapat diganti.

Kita tetap dapat memberikan argument baru:

```python
def say_hello(name='Darth Vader', emoji='😈'):
    print(f'Hello {name} {emoji}')

say_hello('Andre', '😊')
```

Output:

```text
Hello Andre 😊
```

Argument yang diberikan akan menggantikan nilai default.

---

## Default Parameter Sebagian

Kita juga dapat memberikan default hanya kepada parameter tertentu.

```python
def say_hello(name, emoji='😊'):
    print(f'Hello {name} {emoji}')
```

Function tersebut tetap membutuhkan `name`, tetapi `emoji` bersifat opsional karena sudah memiliki nilai default.

Contoh:

```python
say_hello('Andre')
```

Output:

```text
Hello Andre 😊
```

Kita juga dapat mengganti emoji:

```python
say_hello('Andre', '🔥')
```

Output:

```text
Hello Andre 🔥
```

---

## Urutan Default Parameter

Dalam definisi function, parameter yang memiliki default umumnya ditempatkan setelah parameter yang tidak memiliki default.

Contoh yang benar:

```python
def say_hello(name, emoji='😊'):
    print(f'Hello {name} {emoji}')
```

Sedangkan pola berikut akan menghasilkan error:

```python
def say_hello(name='Andre', emoji):
    print(f'Hello {name} {emoji}')
```

Python mengharuskan parameter tanpa default berada sebelum parameter yang memiliki default.

---

## Menggabungkan Positional dan Keyword Arguments

Positional dan keyword arguments dapat digunakan secara bersamaan.

Contoh:

```python
def say_hello(name, emoji):
    print(f'Hello {name} {emoji}')

say_hello('Andre', emoji='😊')
```

Pada contoh tersebut:

```text
'Andre' → positional argument
emoji='😊' → keyword argument
```

Namun, positional argument harus diberikan **sebelum** keyword argument.

Contoh yang benar:

```python
say_hello('Andre', emoji='😊')
```

Contoh yang tidak valid:

```python
say_hello(name='Andre', '😊')
```

---

## Perbandingan Ketiga Konsep

| Konsep | Cara Kerja | Contoh |
|---|---|---|
| Positional Argument | Berdasarkan urutan parameter | `say_hello('Andre', '😊')` |
| Keyword Argument | Berdasarkan nama parameter | `say_hello(name='Andre', emoji='😊')` |
| Default Parameter | Memiliki nilai bawaan | `def say_hello(name='Andre')` |

---

## Contoh Penggunaan dalam Program

Ketiga konsep ini sering digunakan secara bersamaan.

```python
def create_profile(name, age=18, is_active=True):
    print(f'Name: {name}')
    print(f'Age: {age}')
    print(f'Active: {is_active}')
```

Menggunakan positional argument:

```python
create_profile('Andre')
```

Output:

```text
Name: Andre
Age: 18
Active: True
```

Menggunakan keyword argument:

```python
create_profile(
    name='Andre',
    age=25,
    is_active=False
)
```

Output:

```text
Name: Andre
Age: 25
Active: False
```

Pada contoh tersebut, parameter `age` dan `is_active` memiliki nilai default sehingga tidak wajib diberikan ketika function dipanggil.

---

## Ringkasan

Beberapa poin penting yang perlu diingat:

1. **Positional arguments** memberikan nilai berdasarkan urutan parameter.
2. Urutan positional arguments harus sesuai dengan urutan parameter.
3. **Keyword arguments** memberikan nilai berdasarkan nama parameter.
4. Urutan keyword arguments tidak harus mengikuti urutan parameter.
5. **Default parameters** menyediakan nilai bawaan untuk parameter.
6. Default parameter dapat diganti dengan argument baru ketika function dipanggil.
7. Positional argument dapat digabungkan dengan keyword argument.
8. Jika digabungkan, positional arguments harus ditulis sebelum keyword arguments.
9. Parameter tanpa default harus ditempatkan sebelum parameter yang memiliki default.
10. Pemilihan cara pemberian argument yang tepat dapat membuat function lebih fleksibel dan mudah dibaca.