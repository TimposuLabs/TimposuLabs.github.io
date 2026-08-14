---
sidebar_position: 16
title: "Functions as Values"
---

Dalam JavaScript, **Function merupakan First-Class Citizen**. Artinya, fungsi dapat diperlakukan seperti nilai atau data lainnya.

Fungsi dapat:

- Disimpan ke dalam variabel.
- Dikirim sebagai argumen ke fungsi lain.
- Dikembalikan (*return*) dari sebuah fungsi.
- Disimpan di dalam object atau array.

Konsep ini sangat penting dalam JavaScript dan menjadi salah satu fondasi penting dalam pengembangan React.

---

## Fungsi sebagai Nilai

Kita dapat menyimpan sebuah fungsi ke dalam variabel.

```javascript
const greet = function () {
  console.log("Hello World");
};
```

Kemudian fungsi tersebut dapat dipanggil menggunakan variabel:

```javascript
greet();
```

Output:

```text
Hello World
```

Hal yang sama dapat dilakukan menggunakan Arrow Function.

```javascript
const greet = () => {
  console.log("Hello World");
};
```

---

## Mengirim Fungsi ke Fungsi Lain

Karena fungsi dapat diperlakukan sebagai nilai, kita dapat mengirim sebuah fungsi sebagai **argumen** ke fungsi lain.

Fungsi yang menerima fungsi sebagai argumen disebut **Higher-Order Function**.

Salah satu contoh yang sering digunakan adalah `setTimeout()`.

---

## Contoh Menggunakan `setTimeout()`

Kita dapat membuat fungsi terlebih dahulu:

```javascript
function handleTimeout() {
  console.log("Timed out!");
}
```

Kemudian mengirimkan fungsi tersebut ke `setTimeout()`:

```javascript
setTimeout(handleTimeout, 2000);
```

Artinya:

> Jalankan fungsi `handleTimeout` setelah 2 detik.

---

## Menggunakan Arrow Function

Kita juga dapat menggunakan Arrow Function.

```javascript
const handleTimeout = () => {
  console.log("Timed out again!");
};

setTimeout(handleTimeout, 3000);
```

Fungsi tersebut akan dijalankan setelah 3 detik.

---

## Anonymous Function

Fungsi juga dapat dibuat langsung ketika dikirim sebagai argumen.

```javascript
setTimeout(() => {
  console.log("Timed out inline!");
}, 1000);
```

Pada contoh tersebut, kita tidak perlu membuat fungsi secara terpisah.

Fungsi:

```javascript
() => {
  console.log("Timed out inline!");
}
```

langsung dikirim sebagai argumen ke `setTimeout()`.

---

## Perbedaan `handleTimeout` dan `handleTimeout()`

Ini merupakan salah satu konsep yang sangat penting dalam JavaScript.

### Menggunakan `handleTimeout`

```javascript
setTimeout(handleTimeout, 2000);
```

Kode tersebut **mengirimkan referensi fungsi** ke `setTimeout()`.

Fungsi belum dijalankan.

`setTimeout()` akan menjalankannya setelah 2 detik.

---

### Menggunakan `handleTimeout()`

```javascript
setTimeout(handleTimeout(), 2000);
```

Kode tersebut berbeda.

Tanda `()` berarti:

> Jalankan fungsi sekarang.

Jadi `handleTimeout()` akan dieksekusi terlebih dahulu sebelum `setTimeout()` dipanggil.

Jika fungsi tidak mengembalikan fungsi lain, nilai `return` dari `handleTimeout()` yang akan diberikan sebagai argumen pertama ke `setTimeout()`.

---

## Perbandingan

| Sintaks | Arti |
|---------|------|
| `handleTimeout` | Referensi fungsi |
| `handleTimeout()` | Menjalankan fungsi |
| `setTimeout(handleTimeout, 2000)` | Jalankan fungsi setelah 2 detik |
| `setTimeout(handleTimeout(), 2000)` | Jalankan fungsi sekarang, lalu hasilnya diberikan ke `setTimeout()` |

---

## Contoh Fungsi sebagai Parameter

Konsep ini juga dapat digunakan pada fungsi yang kita buat sendiri.

Misalnya:

```javascript
function greeter(greetFn) {
  greetFn();
}
```

Fungsi `greeter()` menerima sebuah fungsi sebagai parameter bernama `greetFn`.

Kita dapat mengirimkan fungsi saat memanggilnya:

```javascript
greeter(() => {
  console.log("Hi!");
});
```

Output:

```text
Hi!
```

---

## Contoh Menggunakan Function Declaration

Kita juga dapat membuat fungsi secara terpisah.

```javascript
function sayHello() {
  console.log("Hello!");
}

function executeFunction(fn) {
  fn();
}

executeFunction(sayHello);
```

Output:

```text
Hello!
```

Perhatikan bahwa saat mengirim fungsi:

```javascript
executeFunction(sayHello);
```

kita **tidak menggunakan `()`**.

---

## Fungsi sebagai Return Value

Fungsi juga dapat mengembalikan fungsi lain.

Contoh:

```javascript
function createGreeting() {
  return () => {
    console.log("Hello World!");
  };
}

const greet = createGreeting();

greet();
```

Output:

```text
Hello World!
```

Pada contoh tersebut, `createGreeting()` mengembalikan sebuah fungsi.

---

## Mengapa Konsep Ini Penting di React?

Konsep **Functions as Values** sangat sering digunakan dalam React.

Salah satu contohnya adalah event handler.

```jsx
function App() {
  function handleClick() {
    console.log("Button clicked!");
  }

  return (
    <button onClick={handleClick}>
      Klik Saya
    </button>
  );
}
```

Perhatikan:

```jsx
onClick={handleClick}
```

Kita memberikan **referensi fungsi**, bukan menjalankannya.

Jangan menulis:

```jsx
onClick={handleClick()}
```

karena `handleClick()` akan langsung dijalankan ketika component dirender.

---

## Mengirim Fungsi melalui Props

Fungsi juga dapat dikirim dari **Parent Component** ke **Child Component** menggunakan props.

Contoh:

```jsx
function App() {
  function handleClick() {
    console.log("Button clicked!");
  }

  return <Button onClick={handleClick} />;
}
```

Kemudian component `Button` menerima fungsi tersebut:

```jsx
function Button({ onClick }) {
  return (
    <button onClick={onClick}>
      Klik Saya
    </button>
  );
}
```

Dengan cara ini, component child dapat menjalankan fungsi yang berasal dari parent.

---

## Fungsi sebagai Callback

Fungsi yang diberikan kepada fungsi lain untuk dijalankan kemudian sering disebut **Callback Function**.

Contoh:

```javascript
function processUser(callback) {
  console.log("Processing user...");

  callback();
}

processUser(() => {
  console.log("User processed!");
});
```

Output:

```text
Processing user...
User processed!
```

Konsep callback sangat umum digunakan dalam JavaScript dan React.

---

## Poin Penting

### Fungsi dapat menjadi nilai

```javascript
const greet = () => {
  console.log("Hello");
};
```

### Fungsi dapat dikirim sebagai argumen

```javascript
setTimeout(greet, 2000);
```

### Fungsi dapat dikembalikan

```javascript
function createFunction() {
  return () => {
    console.log("Hello");
  };
}
```

### Jangan gunakan `()` ketika mengirim referensi fungsi

Benar:

```javascript
setTimeout(greet, 2000);
```

Menjalankan fungsi langsung:

```javascript
greet();
```

---

## Kesimpulan

JavaScript memperlakukan fungsi sebagai **First-Class Citizen**, sehingga fungsi dapat disimpan dalam variabel, dikirim sebagai argumen, maupun dikembalikan dari fungsi lain.

Konsep yang paling penting untuk diingat adalah perbedaan antara:

```javascript
handleClick
```

dan:

```javascript
handleClick()
```

- `handleClick` → mengacu pada **fungsi**.
- `handleClick()` → **menjalankan fungsi**.

Pemahaman konsep ini sangat penting sebelum mempelajari React karena akan sering digunakan dalam **event handling, callback function, array methods, dan pengiriman fungsi melalui props**.
