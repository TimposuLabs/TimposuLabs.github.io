---
sidebar_position: 8
title: "Operator & Kondisional"
---

## Operator dan Kondisional di JavaScript

Operator merupakan simbol yang digunakan untuk melakukan berbagai operasi pada data, seperti perhitungan matematika, penggabungan teks, maupun membandingkan nilai.

Selain operator, JavaScript juga menyediakan **pernyataan kondisional (conditional statement)** yang memungkinkan program mengambil keputusan berdasarkan suatu kondisi.

---

## Operator Aritmatika

Operator aritmatika digunakan untuk melakukan operasi matematika dasar.

| Operator | Keterangan | Contoh |
|----------|------------|--------|
| `+` | Penjumlahan | `10 + 5` |
| `-` | Pengurangan | `10 - 5` |
| `*` | Perkalian | `10 * 5` |
| `/` | Pembagian | `10 / 5` |
| `%` | Sisa hasil bagi (Modulus) | `10 % 3` |

Contoh:

```javascript
const tambah = 10 + 5;
const kurang = 10 - 5;
const kali = 10 * 5;
const bagi = 10 / 5;
const sisa = 10 % 3;

console.log(tambah);
console.log(kurang);
console.log(kali);
console.log(bagi);
console.log(sisa);
```

Output:

```text
15
5
50
2
1
```

---

## Penggabungan String (String Concatenation)

Operator `+` tidak hanya digunakan untuk penjumlahan angka, tetapi juga untuk menggabungkan teks (*string*).

Contoh:

```javascript
const salam = "Halo" + " Dunia";

console.log(salam);
```

Output:

```text
Halo Dunia
```

Kita juga dapat menggabungkan variabel.

```javascript
const firstName = "John";
const lastName = "Doe";

const fullName = firstName + " " + lastName;

console.log(fullName);
```

Output:

```text
John Doe
```

---

## Operator Perbandingan

Operator perbandingan digunakan untuk membandingkan dua nilai.

Hasil dari operasi perbandingan selalu berupa nilai **Boolean**, yaitu:

- `true`
- `false`

### Operator Perbandingan

| Operator | Keterangan |
|----------|------------|
| `===` | Sama dengan |
| `!==` | Tidak sama dengan |
| `>` | Lebih besar |
| `<` | Lebih kecil |
| `>=` | Lebih besar atau sama dengan |
| `<=` | Lebih kecil atau sama dengan |

---

### Operator `===`

Operator `===` digunakan untuk memeriksa apakah dua nilai **memiliki nilai dan tipe data yang sama**.

Contoh:

```javascript
console.log(10 === 10);
console.log(10 === 5);
```

Output:

```text
true
false
```

---

### Operator `>`

Memeriksa apakah nilai sebelah kiri lebih besar.

```javascript
console.log(10 > 5);
```

Output:

```text
true
```

---

### Operator `<`

Memeriksa apakah nilai sebelah kiri lebih kecil.

```javascript
console.log(5 < 10);
```

Output:

```text
true
```

---

### Operator `>=`

Memeriksa apakah nilai lebih besar atau sama dengan.

```javascript
console.log(10 >= 10);
console.log(12 >= 10);
```

Output:

```text
true
true
```

---

### Operator `<=`

Memeriksa apakah nilai lebih kecil atau sama dengan.

```javascript
console.log(5 <= 10);
console.log(10 <= 10);
```

Output:

```text
true
true
```

---

## Pernyataan Kondisional (`if`)

Setelah melakukan perbandingan, kita dapat menggunakan hasilnya untuk mengambil keputusan menggunakan pernyataan `if`.

Sintaks dasar:

```javascript
if (kondisi) {
  // kode dijalankan jika kondisi bernilai true
}
```

Contoh:

```javascript
const nilai = 10;

if (nilai === 10) {
  console.log("Kondisi terpenuhi.");
}
```

Output:

```text
Kondisi terpenuhi.
```

Kode di dalam blok `if` hanya dijalankan jika kondisi menghasilkan nilai `true`.

---

## Contoh Menggunakan `if`

Misalkan kita ingin mengecek apakah seseorang sudah cukup umur.

```javascript
const umur = 20;

if (umur >= 17) {
  console.log("Boleh membuat SIM.");
}
```

Output:

```text
Boleh membuat SIM.
```

Contoh lainnya:

```javascript
const isLogin = true;

if (isLogin === true) {
  console.log("Selamat datang.");
}
```

Output:

```text
Selamat datang.
```

---

## Hal yang Perlu Diperhatikan

### Angka dan String Berbeda

Angka tidak menggunakan tanda kutip.

```javascript
10
```

Sedangkan string harus menggunakan tanda kutip.

```javascript
"10"
```

Contoh:

```javascript
console.log(10 === "10");
```

Output:

```text
false
```

Meskipun nilainya terlihat sama, tipe datanya berbeda sehingga hasilnya `false`.

---

### Perbedaan `=` dan `===`

Banyak pemula sering tertukar antara operator `=` dan `===`.

#### Operator `=`

Digunakan untuk memberikan nilai ke variabel.

```javascript
const nilai = 10;
```

#### Operator `===`

Digunakan untuk membandingkan dua nilai.

```javascript
nilai === 10
```

Singkatnya:

- `=` → Memberikan nilai (*assignment*).
- `===` → Membandingkan nilai (*comparison*).

---

## Penggunaan di React

Operator dan pernyataan kondisional merupakan bagian penting dalam React.

Beberapa contoh penggunaannya antara lain:

- Menampilkan komponen jika pengguna sudah login.
- Menyembunyikan tombol berdasarkan hak akses.
- Memvalidasi input dari pengguna.
- Menentukan tampilan berdasarkan suatu kondisi.

Karena itu, pemahaman mengenai operator dan logika kondisional akan sangat membantu saat mulai membangun aplikasi menggunakan React.

---

## Kesimpulan

Operator digunakan untuk melakukan operasi matematika, menggabungkan teks, maupun membandingkan nilai. Hasil dari operator perbandingan dapat digunakan bersama pernyataan `if` untuk membuat keputusan di dalam program.

Konsep ini menjadi dasar dari berbagai fitur React, seperti **Conditional Rendering**, validasi data, dan pengelolaan logika aplikasi.
