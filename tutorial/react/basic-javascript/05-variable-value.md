---
sidebar_position: 7
title: "Variables & Values"
---

Sebelum membuat aplikasi menggunakan React, kita perlu memahami bagaimana JavaScript menyimpan dan mengelola data. Hampir semua aplikasi bekerja dengan memproses data, mulai dari nama pengguna, pesan, lokasi, hingga hasil perhitungan.

Di JavaScript, data tersebut disebut **value (nilai)** dan disimpan di dalam **variabel**.

---

## Aplikasi Bekerja dengan Data

Setiap aplikasi yang kita gunakan setiap hari, seperti media sosial, aplikasi perbankan, maupun e-commerce, selalu mengolah berbagai jenis data.

Contohnya:

- Nama pengguna
- Email
- Pesan
- Harga produk
- Lokasi
- Status login

Semua data tersebut direpresentasikan sebagai **value** di dalam JavaScript.

---

## Tipe Data Dasar JavaScript

JavaScript memiliki beberapa tipe data dasar yang paling sering digunakan.

| Tipe Data | Contoh | Keterangan |
|-----------|--------|------------|
| String | `"Hello World"` | Menyimpan teks |
| Number | `10`, `3.14` | Menyimpan angka |
| Boolean | `true`, `false` | Menyimpan nilai logika |
| Null | `null` | Menandakan tidak ada nilai |
| Undefined | `undefined` | Variabel belum memiliki nilai |
| Object | `{ name: "John" }` | Menyimpan kumpulan data |

Contoh:

```javascript
const name = "John";
const age = 25;
const isLogin = true;
const score = null;
const address = undefined;
```

---

## Apa Itu Variabel?

Variabel adalah **wadah untuk menyimpan data**.

Dengan variabel, kita dapat menyimpan suatu nilai dan menggunakannya kembali kapan saja.

Contoh:

```javascript
const message = "Hello World";

console.log(message);
```

Output:

```text
Hello World
```

---

## Mengapa Menggunakan Variabel?

Variabel memberikan banyak keuntungan dalam penulisan kode.

### 1. Dapat Digunakan Kembali (Reusability)

Tanpa variabel:

```javascript
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
```

Dengan variabel:

```javascript
const message = "Hello World";

console.log(message);
console.log(message);
console.log(message);
```

Jika isi pesan berubah, kita cukup mengubah nilainya pada satu tempat.

---

### 2. Membuat Kode Lebih Rapi

Tanpa variabel:

```javascript
console.log("Ucup TopekoX");
```

Dengan variabel:

```javascript
const username = "Ucup TopekoX";

console.log(username);
```

Kode menjadi lebih mudah dibaca dan dipahami.

---

## Aturan Penamaan Variabel

JavaScript memiliki beberapa aturan dalam penamaan variabel.

### Gunakan Camel Case

Gunakan huruf kecil di awal, kemudian setiap kata berikutnya diawali huruf kapital.

Contoh:

```javascript
const firstName = "John";
const userMessage = "Hello";
const totalPrice = 10000;
```

---

### Boleh Mengandung Angka

Angka diperbolehkan, tetapi **tidak boleh berada di awal nama variabel**.

Benar:

```javascript
const user1 = "John";
```

Salah:

```javascript
const 1user = "John";
```

---

### Karakter yang Diizinkan

Nama variabel dapat menggunakan:

- Huruf (`A-Z`, `a-z`)
- Angka (`0-9`)
- Underscore (`_`)
- Dollar (`$`)

Contoh:

```javascript
const _username = "John";
const $price = 100;
```

---

### Karakter yang Tidak Diizinkan

Nama variabel **tidak boleh** menggunakan:

- Spasi
- Tanda hubung (`-`)
- Karakter khusus lainnya

Contoh yang salah:

```javascript
const user-name = "John";
const user name = "John";
```

---

## Perbedaan `let` dan `const`

JavaScript menyediakan dua cara utama untuk mendeklarasikan variabel.

- `let`
- `const`

---

### Menggunakan `let`

`let` digunakan jika nilai variabel **akan berubah**.

```javascript
let message = "Hello World";

message = "Selamat Pagi";

console.log(message);
```

Output:

```text
Selamat Pagi
```

Nilai variabel dapat diubah kapan saja.

---

### Menggunakan `const`

`const` digunakan jika nilai **tidak akan diubah**.

```javascript
const message = "Hello World";

console.log(message);
```

Jika kita mencoba mengubah nilainya:

```javascript
const message = "Hello World";

message = "Selamat Pagi";
```

Maka JavaScript akan menghasilkan error.

```text
TypeError: Assignment to constant variable.
```

---

## Kapan Menggunakan `let`?

Gunakan `let` jika nilai memang harus berubah.

Contoh:

```javascript
let score = 0;

score = score + 10;
```

---

## Kapan Menggunakan `const`?

Gunakan `const` jika nilai tidak perlu diubah.

Contoh:

```javascript
const appName = "Belajar React";
```

Sebagian besar variabel pada aplikasi React menggunakan `const`.

---

## Tips

Sebagai praktik yang baik (*best practice*), gunakan **`const` sebagai pilihan utama**.

Gunakan **`let` hanya ketika Anda benar-benar membutuhkan variabel yang nilainya akan berubah**.

Pendekatan ini membuat kode lebih aman, lebih mudah dipahami, dan mengurangi risiko perubahan nilai yang tidak disengaja.

---

## Kesimpulan

Variabel digunakan untuk menyimpan data sehingga dapat digunakan kembali di dalam program. JavaScript menyediakan dua cara utama untuk mendeklarasikan variabel, yaitu `let` dan `const`.

- Gunakan **`const`** untuk nilai yang tidak berubah.
- Gunakan **`let`** jika nilai akan diperbarui di kemudian hari.

Memahami konsep variabel dan tipe data merupakan langkah awal yang sangat penting sebelum mempelajari React.
