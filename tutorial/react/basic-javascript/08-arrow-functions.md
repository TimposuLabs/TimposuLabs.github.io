---
sidebar_position: 10
title: "Arrow Function"
---

**Arrow Function** adalah cara modern untuk menulis fungsi di JavaScript yang diperkenalkan pada ECMAScript 6 (ES6). Sintaksnya lebih ringkas dibandingkan fungsi biasa dan menjadi gaya penulisan yang paling sering digunakan dalam React.

---

## Apa Itu Arrow Function?

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

## Sintaks Dasar Arrow Function

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

## Penulisan Singkat (Implicit Return)

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

## Arrow Function dengan Satu Parameter

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

## Arrow Function Tanpa Parameter

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

## Contoh Perbandingan

### Fungsi Biasa

```javascript
function multiply(a, b) {
  return a * b;
}
```

### Arrow Function

```javascript
const multiply = (a, b) => {
  return a * b;
};
```

### Arrow Function Singkat

```javascript
const multiply = (a, b) => a * b;
```

Ketiga contoh di atas menghasilkan output yang sama.

---

## Penggunaan Arrow Function di React

Arrow Function sangat sering digunakan dalam pengembangan aplikasi React.

### Event Handler

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

## Kapan Menggunakan Arrow Function?

Arrow Function sangat cocok digunakan untuk:

- Callback function.
- Event handler.
- Array method seperti `map()`, `filter()`, `find()`, dan `reduce()`.
- Komponen React modern.

Untuk fungsi yang sederhana dan singkat, Arrow Function biasanya lebih disukai dibandingkan fungsi biasa.

---

## Ringkasan

| Fungsi Biasa | Arrow Function |
|--------------|----------------|
| Menggunakan keyword `function` | Menggunakan tanda `=>` |
| Sintaks lebih panjang | Sintaks lebih ringkas |
| Selalu menggunakan `return` jika mengembalikan nilai | Dapat menggunakan *implicit return* |
| Umum digunakan pada JavaScript klasik | Sangat umum digunakan pada React dan JavaScript modern |

---

## Variasi Sintaks Arrow Function

Arrow Function memiliki beberapa **syntax shortcuts** yang memungkinkan kita menulis fungsi dengan kode yang lebih ringkas.

Namun, setiap shortcut memiliki aturan tertentu yang perlu dipahami agar tidak menghasilkan syntax error.

## 1. Menghilangkan Kurung Parameter `()`

Jika Arrow Function hanya memiliki **satu parameter**, tanda kurung `()` dapat dihilangkan.

### Sintaks Standar

```javascript
(userName) => {
  console.log(userName);
};
```

### Sintaks Ringkas

```javascript
userName => {
  console.log(userName);
};
```

Kedua sintaks tersebut memiliki fungsi yang sama.

---

### Aturan Penggunaan `()`

#### Tanpa Parameter

Jika tidak memiliki parameter, tanda kurung **wajib digunakan**.

```javascript
() => {
  console.log("Hello World");
};
```

❌ Tidak valid:

```javascript
=> {
  console.log("Hello World");
};
```

#### Satu Parameter

Jika hanya memiliki satu parameter, tanda kurung dapat dihilangkan.

```javascript
userName => {
  console.log(userName);
};
```

#### Lebih dari Satu Parameter

Jika memiliki dua atau lebih parameter, tanda kurung **wajib digunakan**.

```javascript
(userName, userAge) => {
  console.log(userName, userAge);
};
```

❌ Tidak valid:

```javascript
userName, userAge => {
  console.log(userName, userAge);
};
```

---

## 2. Menghilangkan `{}` dan `return`

Jika Arrow Function hanya memiliki **satu expression yang langsung mengembalikan nilai**, kita dapat menghilangkan kurung kurawal `{}` dan keyword `return`.

Teknik ini disebut **Implicit Return**.

### Sintaks Standar

```javascript
number => {
  return number * 3;
};
```

### Sintaks dengan Implicit Return

```javascript
number => number * 3;
```

Kedua fungsi tersebut menghasilkan nilai yang sama.

Contoh:

```javascript
const multiplyByThree = number => number * 3;

console.log(multiplyByThree(5));
```

Output:

```text
15
```

---

### Aturan Implicit Return

Jika menggunakan implicit return, keyword `return` **tidak boleh ditulis**.

Tidak valid:

```javascript
number => return number * 3;
```

Jika ingin menggunakan `return`, kita harus menggunakan kurung kurawal.

```javascript
number => {
  return number * 3;
};
```

---

### Implicit Return dan Struktur Kontrol

Implicit return hanya dapat digunakan ketika fungsi langsung mengembalikan sebuah expression.

Contoh yang valid:

```javascript
const double = number => number * 2;
```

Jika fungsi membutuhkan beberapa statement atau struktur kontrol seperti `if`, gunakan kurung kurawal dan `return`.

```javascript
const checkNumber = number => {
  if (number > 0) {
    return "Positif";
  }

  return "Bukan positif";
};
```

---

## 3. Mengembalikan Object secara Implisit

Ada kasus khusus ketika kita ingin mengembalikan sebuah **Object** menggunakan implicit return.

Misalnya:

```javascript
number => { age: number };
```

Kode tersebut **tidak menghasilkan object seperti yang diharapkan**.

JavaScript menganggap:

```javascript
{ age: number }
```

sebagai **body dari function**, bukan sebagai Object yang ingin dikembalikan.

---

### Solusi: Gunakan `()`

Untuk mengembalikan Object secara implicit, bungkus Object menggunakan tanda kurung tambahan.

```javascript
number => ({ age: number });
```

Contoh:

```javascript
const createUser = name => ({ name: name });

console.log(createUser("Budi"));
```

Output:

```javascript
{
  name: "Budi"
}
```

Dengan **Object Property Shorthand**, kode tersebut bahkan dapat dibuat lebih ringkas:

```javascript
const createUser = name => ({ name });
```

---

## Perbandingan Sintaks

Berikut beberapa variasi Arrow Function yang umum digunakan.

#### Tanpa Parameter

```javascript
() => "Hello World";
```

#### Satu Parameter

```javascript
name => `Hello ${name}`;
```

#### Lebih dari Satu Parameter

```javascript
(a, b) => a + b;
```

#### Menggunakan Function Body

```javascript
(a, b) => {
  const result = a + b;
  return result;
};
```

#### Mengembalikan Object

```javascript
name => ({ name });
```

---

## Ringkasan Aturan

| Kondisi | Sintaks |
|---------|---------|
| Tanpa parameter | `() => ...` |
| Satu parameter | `name => ...` |
| Lebih dari satu parameter | `(name, age) => ...` |
| Satu expression | `name => name.toUpperCase()` |
| Beberapa statement | `name => { ... }` |
| Explicit return | `name => { return name; }` |
| Implicit return | `name => name` |
| Implicit return Object | `name => ({ name })` |

---

## Poin Penting

Ada tiga aturan utama yang perlu diingat:

1. **Satu parameter**  
   Tanda kurung `()` bersifat opsional.

   ```javascript
   name => ...
   ```

2. **Satu expression yang dikembalikan**  
   Kurung kurawal `{}` dan `return` dapat dihilangkan.

   ```javascript
   number => number * 3
   ```

3. **Mengembalikan Object secara implicit**  
   Object harus dibungkus dengan tanda kurung.

   ```javascript
   number => ({ age: number })
   ```

Memahami variasi sintaks ini akan membantu kita menulis kode JavaScript yang lebih ringkas, terutama ketika menggunakan **Arrow Function** bersama `map()`, `filter()`, event handler, dan komponen React.

---

## Kesimpulan

Arrow Function merupakan sintaks modern JavaScript yang membuat penulisan fungsi menjadi lebih sederhana dan mudah dibaca. Fitur seperti **implicit return** dan sintaks yang ringkas menjadikannya pilihan utama dalam pengembangan aplikasi React.

Karena React sangat bergantung pada Arrow Function, memahami konsep ini akan memudahkan Anda saat mempelajari komponen, event handling, maupun manipulasi data menggunakan metode array.
