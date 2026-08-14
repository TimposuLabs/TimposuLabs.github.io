---
sidebar_position: 17
title: "Nested Functions dan Scope"
---

JavaScript memungkinkan kita **mendefinisikan sebuah fungsi di dalam fungsi lainnya**. Fungsi yang berada di dalam disebut **Inner Function**, sedangkan fungsi yang membungkusnya disebut **Outer Function**.

Konsep ini berkaitan erat dengan **Scope**, yaitu aturan yang menentukan di mana sebuah variabel atau fungsi dapat diakses.

Nested Function sangat relevan dalam React karena component pada dasarnya merupakan sebuah fungsi yang dapat memiliki fungsi-fungsi lain di dalamnya.

---

## Apa Itu Nested Function?

**Nested Function** adalah fungsi yang didefinisikan di dalam fungsi lainnya.

Contoh:

```javascript
function init() {

  function greet() {
    console.log("Hi!");
  }

  greet();
}

init();
```

Output:

```text
Hi!
```

Pada contoh tersebut:

- `init()` → Outer Function.
- `greet()` → Inner Function.
- `greet()` dibuat dan dipanggil di dalam `init()`.

---

## Cara Kerja Nested Function

Ketika `init()` dipanggil:

```javascript
init();
```

JavaScript menjalankan kode di dalam `init()`.

Kemudian JavaScript menemukan fungsi:

```javascript
function greet() {
  console.log("Hi!");
}
```

dan menjalankannya ketika baris berikut dieksekusi:

```javascript
greet();
```

Hasilnya:

```text
Hi!
```

---

## Nested Function dengan Arrow Function

Inner Function tidak harus menggunakan Function Declaration. Kita juga dapat menggunakan Arrow Function.

Contoh:

```javascript
function init() {

  const greet = () => {
    console.log("Hi!");
  };

  greet();
}

init();
```

Output:

```text
Hi!
```

---

## Function Scope

Nested Function memiliki **scope** yang terbatas pada fungsi tempatnya didefinisikan.

Contoh:

```javascript
function init() {

  function greet() {
    console.log("Hi!");
  }

  greet();
}
```

Fungsi `greet()` dapat dipanggil di dalam `init()`.

```javascript
init();
```

Namun, kita tidak dapat memanggil `greet()` secara langsung dari luar `init()`.

```javascript
greet();
```

Kode tersebut akan menghasilkan error:

```text
ReferenceError: greet is not defined
```

Hal ini terjadi karena `greet()` hanya tersedia di dalam scope `init()`.

---

## Scope pada Variabel dan Function

Aturan tersebut juga berlaku untuk variabel.

Contoh:

```javascript
function init() {
  const message = "Hello World";

  console.log(message);
}

init();
```

Variabel `message` hanya dapat digunakan di dalam `init()`.

Jika kita mencoba:

```javascript
console.log(message);
```

dari luar fungsi, JavaScript akan menghasilkan error karena `message` tidak tersedia di scope tersebut.

---

## Outer Function dan Inner Function

Perhatikan struktur berikut:

```javascript
function init() {

  const message = "Hello";

  function greet() {
    console.log(message);
  }

  greet();
}
```

Di sini:

```text
init()
└── message
└── greet()
```

`greet()` berada di dalam scope `init()`.

Inner Function juga dapat mengakses variabel yang berada di scope luar.

Contoh:

```javascript
function init() {
  const message = "Hello";

  function greet() {
    console.log(message);
  }

  greet();
}

init();
```

Output:

```text
Hello
```

Ini merupakan bagian penting dari konsep **Lexical Scope** dan menjadi dasar untuk memahami **Closure** di JavaScript.

---

## Mengapa Menggunakan Nested Function?

Nested Function dapat digunakan ketika sebuah fungsi hanya diperlukan oleh fungsi tertentu.

Misalnya:

```javascript
function calculateTotal(price, tax) {

  function calculateTax() {
    return price * tax;
  }

  return price + calculateTax();
}

console.log(calculateTotal(100, 0.1));
```

Fungsi `calculateTax()` hanya diperlukan oleh `calculateTotal()`, sehingga tidak perlu dibuat sebagai fungsi global.

---

## Nested Function dalam React

Konsep Nested Function sangat sering digunakan dalam React.

Sebuah React Component pada dasarnya merupakan sebuah fungsi.

Contoh:

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

Pada contoh tersebut:

```javascript
function App()
```

merupakan **outer function**, sedangkan:

```javascript
function handleClick()
```

merupakan **inner function**.

`handleClick()` hanya digunakan oleh component `App`.

---

## Contoh Event Handler

Nested Function sering digunakan untuk membuat event handler.

```jsx
function LoginForm() {

  function handleSubmit() {
    console.log("Form submitted!");
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">
        Login
      </button>
    </form>
  );
}
```

Fungsi `handleSubmit()` dibuat khusus untuk menangani event pada component tersebut.

---

## Contoh dengan Arrow Function

Dalam React modern, event handler sering ditulis menggunakan Arrow Function.

```jsx
function App() {

  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <button onClick={handleClick}>
      Klik Saya
    </button>
  );
}
```

Fungsi `handleClick` hanya digunakan di dalam component `App`.

---

## Kelebihan Nested Function

Nested Function dapat membantu:

- Membatasi penggunaan fungsi hanya pada scope tertentu.
- Menghindari fungsi global yang tidak diperlukan.
- Membuat kode lebih terorganisir.
- Membuat helper function khusus untuk suatu fungsi atau component.
- Membantu menjaga struktur kode agar lebih mudah dipahami.

---

## Hal yang Perlu Diperhatikan

Nested Function bukan berarti fungsi tersebut hanya dapat dijalankan sekali.

Selama outer function masih memiliki akses terhadap inner function, inner function dapat dipanggil sesuai kebutuhan.

Contoh:

```javascript
function init() {

  function greet() {
    console.log("Hello");
  }

  greet();
  greet();
  greet();
}

init();
```

Output:

```text
Hello
Hello
Hello
```

---

## Poin Penting

### Outer Function

Fungsi yang membungkus fungsi lain.

```javascript
function init() {
  // ...
}
```

### Inner Function

Fungsi yang dibuat di dalam outer function.

```javascript
function init() {

  function greet() {
    // ...
  }

}
```

### Scope

Inner Function hanya dapat diakses dari scope tempat fungsi tersebut didefinisikan.

```javascript
function init() {

  function greet() {
    console.log("Hi!");
  }

  greet();
}
```

`greet()` tidak dapat dipanggil langsung dari luar `init()`.

---

## Kesimpulan

**Nested Function** adalah fungsi yang didefinisikan di dalam fungsi lain. Konsep ini berkaitan erat dengan **Function Scope** dan **Lexical Scope**.

Secara sederhana:

```javascript
function outer() {

  function inner() {
    // hanya tersedia di dalam outer()
  }

}
```

Inner Function dapat mengakses variabel dari scope luar, tetapi tidak dapat diakses secara langsung dari luar scope tersebut.

Dalam React, konsep ini sangat sering digunakan untuk membuat **helper function**, **event handler**, dan fungsi-fungsi lain yang hanya dibutuhkan oleh sebuah component.
