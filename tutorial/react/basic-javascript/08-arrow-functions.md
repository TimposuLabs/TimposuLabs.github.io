---
sidebar_position: 10
title: "Arrow Function"
---

**Arrow Function** adalah cara modern untuk menulis fungsi di JavaScript yang diperkenalkan pada ECMAScript 6 (ES6). Sintaksnya lebih ringkas dibandingkan fungsi biasa dan menjadi gaya penulisan yang paling sering digunakan dalam React.

---

# Apa Itu Arrow Function?

Arrow Function merupakan bentuk singkat dari fungsi anonim (*anonymous function*).

Sintaksnya menggunakan tanda panah (`=>`) sebagai pengganti kata kunci `function`.

## Fungsi Biasa

```javascript
const greet = function (userName) {
  return "Hello " + userName;
};
```

## Arrow Function

```javascript
const greet = (userName) => {
  return "Hello " + userName;
};
```

Kedua contoh di atas menghasilkan output yang sama, hanya berbeda pada cara penulisannya.

---

# Sintaks Dasar Arrow Function

Bentuk umum Arrow Function adalah sebagai berikut.

```javascript
const namaFungsi = (parameter) => {
  // kode
};
```

Contoh:

```javascript
const add = (a, b) => {
  return a + b;
};

console.log(add(5, 3));
```

Output:

```text
8
```

---

# Penulisan Singkat (Implicit Return)

Jika fungsi hanya memiliki **satu baris** yang mengembalikan nilai, kita dapat menghilangkan:

- Kurung kurawal `{ }`
- Kata kunci `return`

Contoh:

```javascript
const greet = (userName) => {
  return "Hello " + userName;
};
```

Dapat ditulis menjadi:

```javascript
const greet = (userName) => "Hello " + userName;
```

Output:

```text
Hello John
```

Cara ini disebut **Implicit Return**, karena nilai langsung dikembalikan tanpa menuliskan `return`.

---

# Arrow Function dengan Satu Parameter

Jika hanya memiliki **satu parameter**, tanda kurung `()` dapat dihilangkan.

Contoh:

```javascript
const greet = userName => "Hello " + userName;
```

Namun jika memiliki dua atau lebih parameter, tanda kurung tetap harus digunakan.

```javascript
const add = (a, b) => a + b;
```

---

# Arrow Function Tanpa Parameter

Jika fungsi tidak memiliki parameter, gunakan tanda kurung kosong `()`.

Contoh:

```javascript
const sayHi = () => "Hello World";

console.log(sayHi());
```

Output:

```text
Hello World
```

---

# Contoh Perbandingan

## Fungsi Biasa

```javascript
function multiply(a, b) {
  return a * b;
}
```

## Arrow Function

```javascript
const multiply = (a, b) => {
  return a * b;
};
```

## Arrow Function Singkat

```javascript
const multiply = (a, b) => a * b;
```

Ketiga contoh di atas menghasilkan output yang sama.

---

# Penggunaan Arrow Function di React

Arrow Function sangat sering digunakan dalam pengembangan aplikasi React.

## Event Handler

```jsx
<button onClick={() => alert("Button diklik")}>
  Klik Saya
</button>
```

Pada contoh di atas, Arrow Function digunakan untuk menangani event `onClick`.

---

## Array Method

Arrow Function juga sering digunakan bersama metode array seperti `map()`, `filter()`, dan `reduce()`.

Contoh:

```javascript
const numbers = [1, 2, 3, 4];

const result = numbers.map(number => number * 2);

console.log(result);
```

Output:

```text
[2, 4, 6, 8]
```

Karena sintaksnya singkat, Arrow Function membuat kode lebih mudah dibaca, terutama saat bekerja dengan array.

---

# Kapan Menggunakan Arrow Function?

Arrow Function sangat cocok digunakan untuk:

- Callback function.
- Event handler.
- Array method seperti `map()`, `filter()`, `find()`, dan `reduce()`.
- Komponen React modern.

Untuk fungsi yang sederhana dan singkat, Arrow Function biasanya lebih disukai dibandingkan fungsi biasa.

---

# Ringkasan

| Fungsi Biasa | Arrow Function |
|--------------|----------------|
| Menggunakan keyword `function` | Menggunakan tanda `=>` |
| Sintaks lebih panjang | Sintaks lebih ringkas |
| Selalu menggunakan `return` jika mengembalikan nilai | Dapat menggunakan *implicit return* |
| Umum digunakan pada JavaScript klasik | Sangat umum digunakan pada React dan JavaScript modern |

---

# Kesimpulan

Arrow Function merupakan sintaks modern JavaScript yang membuat penulisan fungsi menjadi lebih sederhana dan mudah dibaca. Fitur seperti **implicit return** dan sintaks yang ringkas menjadikannya pilihan utama dalam pengembangan aplikasi React.

Karena React sangat bergantung pada Arrow Function, memahami konsep ini akan memudahkan Anda saat mempelajari komponen, event handling, maupun manipulasi data menggunakan metode array.
