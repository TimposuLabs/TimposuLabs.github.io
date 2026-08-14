---
sidebar_position: 15
title: "Control Structures"
---

**Control Structures (Struktur Kontrol)** digunakan untuk mengatur alur eksekusi program berdasarkan kondisi tertentu atau menjalankan kode secara berulang.

Dalam JavaScript, struktur kontrol yang paling sering digunakan antara lain:

- `if`
- `else if`
- `else`
- `for...of`

Konsep ini sangat penting dalam React karena digunakan untuk membuat **Conditional Rendering** dan **Rendering Lists**.

---

## Pernyataan Kondisional

Pernyataan kondisional digunakan ketika program perlu mengambil keputusan berdasarkan suatu kondisi.

JavaScript menyediakan:

- `if`
- `else if`
- `else`

---

### `if` Statement

`if` digunakan untuk menjalankan blok kode **hanya jika kondisi bernilai `true`**.

Sintaks dasar:

```javascript
if (kondisi) {
  // kode yang dijalankan
}
```

Contoh:

```javascript
const age = 20;

if (age >= 18) {
  console.log("Anda sudah dewasa.");
}
```

Output:

```text
Anda sudah dewasa.
```

Jika kondisi bernilai `false`, kode di dalam blok `if` tidak akan dijalankan.

---

### `else if`

`else if` digunakan ketika kita ingin memeriksa kondisi tambahan jika kondisi sebelumnya bernilai `false`.

Contoh:

```javascript
const password = "hello";

if (password === "Hello") {
  console.log("Akses diterima!");
} else if (password === "hello") {
  console.log("Akses diterima (huruf kecil)!");
}
```

Output:

```text
Akses diterima (huruf kecil)!
```

---

### `else`

`else` digunakan sebagai kondisi terakhir atau **fallback** ketika semua kondisi sebelumnya bernilai `false`.

Contoh:

```javascript
const password = "12345";

if (password === "Hello") {
  console.log("Akses diterima!");
} else if (password === "hello") {
  console.log("Akses diterima (huruf kecil)!");
} else {
  console.log("Akses ditolak!");
}
```

Output:

```text
Akses ditolak!
```

---

### Contoh Lengkap `if`, `else if`, dan `else`

```javascript
const score = 75;

if (score >= 90) {
  console.log("Nilai A");
} else if (score >= 80) {
  console.log("Nilai B");
} else if (score >= 70) {
  console.log("Nilai C");
} else {
  console.log("Nilai D");
}
```

Output:

```text
Nilai C
```

JavaScript akan mengevaluasi kondisi **dari atas ke bawah**.

Begitu menemukan kondisi yang bernilai `true`, blok tersebut dijalankan dan cabang berikutnya tidak dijalankan.

---

### `for...of` Loop

`for...of` digunakan untuk melakukan perulangan terhadap setiap elemen dalam sebuah **Array** atau objek iterable lainnya.

Sintaks dasar:

```javascript
for (const item of array) {
  // kode yang dijalankan
}
```

---

### Contoh `for...of`

Misalnya kita memiliki array:

```javascript
const hobbies = ["Sports", "Cooking", "Reading"];
```

Kita dapat menampilkan setiap elemen menggunakan `for...of`.

```javascript
for (const hobby of hobbies) {
  console.log(hobby);
}
```

Output:

```text
Sports
Cooking
Reading
```

Pada setiap iterasi, variabel `hobby` akan berisi satu elemen dari array.

---

### Cara Kerja `for...of`

Misalnya terdapat array:

```javascript
const hobbies = ["Sports", "Cooking"];
```

Perulangan:

```javascript
for (const hobby of hobbies) {
  console.log(hobby);
}
```

secara sederhana akan bekerja seperti:

```text
Iterasi 1 → hobby = "Sports"
Iterasi 2 → hobby = "Cooking"
```

Setelah seluruh elemen selesai diproses, perulangan berhenti.

---

### `for...of` dengan Kondisi

Kita juga dapat menggabungkan `for...of` dengan `if`.

Contoh:

```javascript
const numbers = [1, 2, 3, 4, 5];

for (const number of numbers) {
  if (number % 2 === 0) {
    console.log(number);
  }
}
```

Output:

```text
2
4
```

Pada contoh tersebut:

1. `for...of` mengambil setiap angka.
2. `if` memeriksa apakah angka tersebut habis dibagi 2.
3. Hanya angka yang memenuhi kondisi yang ditampilkan.

---

### `for...of` vs `map()`

Dalam JavaScript, `for...of` dan `map()` sama-sama dapat digunakan untuk bekerja dengan Array, tetapi memiliki tujuan yang berbeda.

| `for...of` | `map()` |
|------------|---------|
| Digunakan untuk melakukan iterasi | Digunakan untuk melakukan transformasi |
| Tidak otomatis menghasilkan array baru | Menghasilkan array baru |
| Cocok untuk menjalankan suatu aksi | Cocok untuk mengubah setiap elemen |
| Sering digunakan pada logika umum | Sangat sering digunakan untuk rendering list di React |

Contoh `for...of`:

```javascript
for (const hobby of hobbies) {
  console.log(hobby);
}
```

Contoh `map()`:

```javascript
const editedHobbies = hobbies.map(
  hobby => hobby + "!"
);
```

---

## Control Structures dalam React

Konsep struktur kontrol sangat penting ketika membangun aplikasi React.

### Conditional Rendering

React sering membutuhkan kondisi untuk menentukan apakah suatu komponen harus ditampilkan.

Contoh:

```jsx
function App({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Selamat datang!</h1>;
  }

  return <h1>Silakan login.</h1>;
}
```

Komponen yang ditampilkan akan bergantung pada nilai `isLoggedIn`.

---

### Rendering List

Untuk menampilkan daftar data dalam React, kita biasanya menggunakan `map()`.

Contoh:

```jsx
const hobbies = ["Sports", "Cooking", "Reading"];

function HobbyList() {
  return (
    <ul>
      {hobbies.map((hobby) => (
        <li key={hobby}>{hobby}</li>
      ))}
    </ul>
  );
}
```

Hasilnya adalah daftar `<li>` yang dibuat secara dinamis berdasarkan isi array.

---

## Poin Penting

### `if`

Digunakan untuk menjalankan kode berdasarkan kondisi.

```javascript
if (condition) {
  // kode
}
```

### `else if`

Digunakan untuk memeriksa kondisi tambahan.

```javascript
if (condition1) {
  // kode
} else if (condition2) {
  // kode
}
```

### `else`

Digunakan sebagai kondisi terakhir jika semua kondisi sebelumnya `false`.

```javascript
if (condition) {
  // kode
} else {
  // fallback
}
```

### `for...of`

Digunakan untuk mengiterasi setiap elemen Array.

```javascript
for (const item of items) {
  // kode
}
```

---

## Kesimpulan

**Control Structures** memungkinkan program mengambil keputusan dan menjalankan kode secara berulang.

Konsep utama yang perlu dipahami adalah:

- **`if`**, `else if`, dan `else` → untuk membuat keputusan berdasarkan kondisi.
- **`for...of`** → untuk melakukan iterasi terhadap setiap elemen Array.

Dalam React, konsep ini menjadi dasar untuk membuat **Conditional Rendering** dan **Rendering Lists**, dua pola yang sangat sering digunakan ketika membangun aplikasi React.

