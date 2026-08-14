---
sidebar_position: 9
title: "Functions & Parameters"
---

Fungsi (*Function*) merupakan salah satu konsep paling penting dalam JavaScript. Dengan fungsi, kita dapat mengelompokkan sekumpulan kode ke dalam satu blok sehingga dapat digunakan kembali (*reusable*).

Pada React, hampir semua komponen dibuat menggunakan fungsi. Oleh karena itu, memahami konsep fungsi menjadi langkah penting sebelum mempelajari React.

---

## Apa Itu Fungsi?

Fungsi adalah blok kode yang dirancang untuk menjalankan tugas tertentu.

Daripada menulis kode yang sama berulang kali, kita cukup membuat sebuah fungsi dan memanggilnya ketika diperlukan.

Sintaks dasar fungsi:

```javascript
function greet() {
  console.log("Hello World");
}
```

Fungsi di atas belum dijalankan.

Untuk menjalankannya, kita harus memanggilnya.

```javascript
greet();
```

Output:

```text
Hello World
```

---

## Mengapa Menggunakan Fungsi?

Fungsi memiliki beberapa keuntungan, antara lain:

- Mengurangi penulisan kode yang berulang (*reusable*).
- Membuat kode lebih rapi.
- Mempermudah proses pemeliharaan (*maintenance*).
- Membagi program menjadi bagian-bagian kecil yang lebih mudah dipahami.

---

## Parameter dan Argumen

Saat membuat fungsi, kita dapat menerima data dari luar menggunakan **parameter**.

Contoh:

```javascript
function greet(userName) {
  console.log("Halo " + userName);
}
```

Pada contoh di atas:

- `userName` adalah **parameter**.

Kemudian fungsi dipanggil dengan memberikan nilai.

```javascript
greet("Budi");
```

Output:

```text
Halo Budi
```

Nilai `"Budi"` disebut **argumen (argument)**.

### Perbedaan Parameter dan Argumen

| Parameter | Argumen |
|-----------|----------|
| Variabel yang didefinisikan pada fungsi | Nilai yang dikirim saat fungsi dipanggil |
| Ditulis saat membuat fungsi | Ditulis saat memanggil fungsi |

Contoh:

```javascript
function greet(userName) {
  console.log(userName);
}

greet("Budi");
```

- `userName` → Parameter
- `"Budi"` → Argumen

---

## Return Value

Selain menjalankan kode, fungsi juga dapat mengembalikan nilai menggunakan kata kunci `return`.

Contoh:

```javascript
function add(a, b) {
  return a + b;
}
```

Kemudian:

```javascript
const result = add(5, 3);

console.log(result);
```

Output:

```text
8
```

Setelah `return` dijalankan, fungsi langsung berhenti dan mengembalikan nilai kepada pemanggilnya.

---

## Fungsi Tanpa Return

Jika sebuah fungsi tidak memiliki `return`, maka JavaScript akan mengembalikan nilai `undefined`.

Contoh:

```javascript
function greet() {
  console.log("Hello");
}

const result = greet();

console.log(result);
```

Output:

```text
Hello
undefined
```

---

## Default Parameter

JavaScript modern (ES6) memungkinkan kita memberikan **nilai bawaan** pada parameter.

Contoh:

```javascript
function greet(userName = "User") {
  console.log("Halo " + userName);
}
```

Jika fungsi dipanggil tanpa argumen:

```javascript
greet();
```

Output:

```text
Halo User
```

Sedangkan jika diberikan argumen:

```javascript
greet("Andi");
```

Output:

```text
Halo Andi
```

Default parameter membuat fungsi menjadi lebih fleksibel dan mengurangi kemungkinan terjadinya error karena parameter kosong.

---

## Contoh Lengkap

```javascript
function calculateTotal(price, tax = 0) {
  return price + tax;
}

const total = calculateTotal(10000, 1000);

console.log(total);
```

Output:

```text
11000
```

---

## Hubungan Fungsi dengan React

Dalam React, hampir semua komponen merupakan **fungsi JavaScript**.

Contohnya:

```jsx
function App() {
  return <h1>Hello React</h1>;
}
```

Komponen tersebut menerima data melalui **props** (parameter) dan mengembalikan **JSX** menggunakan `return`.

Contoh:

```jsx
function Welcome(props) {
  return <h1>Halo {props.name}</h1>;
}
```

Karena itu, memahami cara kerja fungsi akan memudahkan Anda saat mulai membangun komponen React.

---

## Ringkasan

| Konsep | Penjelasan |
|--------|------------|
| Function | Blok kode yang dapat digunakan kembali |
| Parameter | Variabel yang didefinisikan pada fungsi |
| Argument | Nilai yang dikirim saat fungsi dipanggil |
| Return | Mengembalikan nilai dari fungsi |
| Default Parameter | Nilai bawaan jika argumen tidak diberikan |

---

## Kesimpulan

Fungsi merupakan dasar dari pemrograman JavaScript dan menjadi fondasi utama dalam React. Dengan memahami fungsi, parameter, argumen, dan `return`, Anda akan lebih mudah memahami cara kerja komponen React, props, maupun berbagai fitur lainnya yang akan dipelajari pada materi berikutnya.
