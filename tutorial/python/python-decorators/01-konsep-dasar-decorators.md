---
sidebar_position: 1
title: "Konsep Dasar Decorators"
---

Decorator merupakan salah satu fitur penting dalam Python yang digunakan untuk **menambahkan atau meningkatkan perilaku sebuah fungsi tanpa mengubah kode asli fungsi tersebut secara langsung**.

Decorator banyak digunakan dalam berbagai library dan framework Python. Untuk memahami decorator, kita terlebih dahulu perlu memahami konsep **Functions as First Class Citizens**.

## Apa Itu Decorator?

Decorator adalah mekanisme yang memungkinkan kita membungkus (*wrap*) sebuah fungsi dengan fungsi lainnya untuk memberikan perilaku tambahan.

Secara sederhana, decorator dapat dibayangkan seperti:

```text
Fungsi asli
    ↓
Decorator
    ↓
Fungsi dengan kemampuan tambahan
```

Decorator pada Python biasanya digunakan dengan simbol `@`.

Contoh bentuk penggunaannya:

```python
@decorator
def function():
    pass
```

Simbol `@` menunjukkan bahwa sebuah decorator diterapkan pada fungsi di bawahnya.

Decorator dapat digunakan untuk berbagai kebutuhan, misalnya:

- Menambahkan logging.
- Melakukan validasi.
- Memeriksa hak akses.
- Mengukur waktu eksekusi fungsi.
- Menambahkan autentikasi.
- Menambahkan perilaku tertentu tanpa mengubah fungsi asli.

Namun, sebelum mempelajari cara membuat decorator, kita perlu memahami bagaimana Python memperlakukan fungsi.

## Functions as First Class Citizens

Di Python, fungsi merupakan **First Class Citizens**.

Artinya, fungsi diperlakukan seperti object atau nilai biasa sehingga dapat digunakan dalam berbagai cara.

Sebuah fungsi dapat:

- Disimpan ke dalam variabel.
- Dikirim sebagai argument ke fungsi lain.
- Dikembalikan dari fungsi lain.
- Disimpan di dalam struktur data.

Kemampuan inilah yang menjadi salah satu dasar bagaimana decorator bekerja.

## Menyimpan Fungsi ke Variabel

Sebuah fungsi dapat disimpan ke dalam variabel.

Contoh:

```python
def hello():
    print("hello!")


greet = hello

greet()
```

Output:

```text
hello!
```

Pada contoh tersebut:

```python
greet = hello
```

tidak menjalankan fungsi `hello()`.

Kita hanya memberikan referensi fungsi `hello` kepada variabel `greet`.

Karena `greet` sekarang mengacu pada fungsi yang sama, kita dapat menjalankannya dengan:

```python
greet()
```

## Menghapus Referensi Nama Fungsi

Menariknya, kita dapat menghapus nama `hello` tanpa langsung menghapus fungsi tersebut.

```python
def hello():
    print("hello!")


greet = hello

del hello

greet()
```

Output:

```text
hello!
```

Mengapa `greet()` masih dapat dijalankan?

Karena:

```python
greet = hello
```

membuat variabel `greet` memiliki referensi ke object fungsi tersebut.

Ketika:

```python
del hello
```

dijalankan, Python hanya menghapus nama `hello` sebagai referensi.

Selama masih ada referensi lain yang menunjuk ke object fungsi tersebut, fungsi tetap dapat digunakan melalui referensi tersebut.

Dalam contoh ini:

```text
hello ──────┐
            ↓
         Function
            ↑
            │
greet ──────┘
```

Setelah:

```python
del hello
```

hubungannya menjadi:

```text
         Function
            ↑
            │
greet ──────┘
```

Sehingga:

```python
greet()
```

tetap dapat dijalankan.

## Mengoper Fungsi sebagai Argument

Karena fungsi merupakan object, kita juga dapat mengirimkan fungsi sebagai argument ke fungsi lain.

Contoh:

```python
def hello(func):
    func()


def greet():
    print("Still here!")


hello(greet)
```

Output:

```text
Still here!
```

Perhatikan bahwa ketika mengirim fungsi sebagai argument, kita menggunakan:

```python
hello(greet)
```

bukan:

```python
hello(greet())
```

Perbedaannya penting.

```python
greet
```

berarti kita memberikan **referensi fungsi**.

Sedangkan:

```python
greet()
```

berarti kita **menjalankan fungsi tersebut** terlebih dahulu.

Dalam konteks decorator, yang dibutuhkan adalah kemampuan untuk mengirimkan referensi sebuah fungsi kepada fungsi lain.

## Fungsi sebagai Return Value

Selain dapat diberikan sebagai argument, fungsi juga dapat dikembalikan oleh fungsi lain.

Contoh:

```python
def outer():
    def inner():
        print("Hello from inner function")

    return inner


result = outer()

result()
```

Output:

```text
Hello from inner function
```

Pada contoh tersebut, `outer()` mengembalikan fungsi `inner`.

```python
return inner
```

Kemudian hasil tersebut disimpan:

```python
result = outer()
```

Sehingga `result` sekarang mengacu pada fungsi `inner`.

Fungsi tersebut kemudian dapat dipanggil:

```python
result()
```

Kemampuan fungsi untuk menerima dan mengembalikan fungsi merupakan konsep penting dalam memahami decorator.

## Hubungan First Class Functions dengan Decorator

Dari beberapa contoh sebelumnya, kita dapat melihat bahwa fungsi Python dapat:

```text
Disimpan sebagai variabel
    ↓
Dikirim sebagai argument
    ↓
Dikembalikan sebagai return value
    ↓
Digunakan untuk membungkus fungsi lain
    ↓
Decorator
```

Decorator memanfaatkan kemampuan tersebut untuk memberikan perilaku tambahan kepada sebuah fungsi.

Secara konseptual:

```text
Function
   ↓
dikirim sebagai argument
   ↓
Decorator
   ↓
diberikan perilaku tambahan
   ↓
menghasilkan function baru
```

Dengan demikian, decorator bukanlah konsep yang berdiri sendiri. Decorator dibangun berdasarkan kemampuan Python dalam memperlakukan fungsi sebagai **First Class Citizens**.

## Gambaran Sederhana Decorator

Misalnya kita memiliki fungsi:

```python
def hello():
    print("Hello")
```

Kita ingin menambahkan sesuatu sebelum dan sesudah fungsi tersebut dijalankan tanpa mengubah isi `hello()`.

Secara konsep kita dapat membayangkannya:

```text
hello()
  ↓
Decorator
  ↓
Sebelum hello()
  ↓
hello()
  ↓
Sesudah hello()
```

Dengan pendekatan tersebut, kode asli fungsi `hello()` tetap sederhana, sedangkan perilaku tambahan ditangani oleh decorator.

## Kesimpulan

Decorator merupakan fitur Python yang memungkinkan kita **menambahkan atau meningkatkan perilaku sebuah fungsi tanpa mengubah implementasi asli fungsi tersebut secara langsung**.

Untuk memahami decorator, konsep yang harus dipahami terlebih dahulu adalah **Functions as First Class Citizens**.

Fungsi di Python dapat:

- Disimpan dalam variabel.
- Dikirim sebagai argument.
- Dikembalikan dari fungsi lain.
- Digunakan sebagai bagian dari fungsi lain.

Kemampuan tersebut menjadi fondasi utama decorator.

Pada materi berikutnya, konsep ini dapat dilanjutkan dengan mempelajari **Higher-Order Function, Inner Function, Closure, dan Wrapper Function** sebelum masuk lebih jauh ke cara kerja decorator dengan syntax `@`.