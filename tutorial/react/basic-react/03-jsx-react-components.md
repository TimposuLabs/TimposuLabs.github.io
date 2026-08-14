---
sidebar_position: 3
title: "JSX & React Components"
---

**JSX (JavaScript XML)** merupakan salah satu konsep inti dalam React. JSX memungkinkan kita menulis struktur UI dengan sintaks yang terlihat seperti HTML langsung di dalam kode JavaScript.

Pada saat yang sama, React menggunakan **Component** sebagai building block utama untuk membangun antarmuka aplikasi.

---

## Peran React dalam Aplikasi Web

Pada aplikasi web biasa, file HTML biasanya berisi banyak elemen yang membentuk halaman:

```html
<h1>Hello World</h1>
<button>Click Me</button>
```

Berbeda dengan React, sebagian besar UI dikelola oleh **React Components**.

Karena itu, file `index.html` pada proyek React biasanya relatif sederhana.

Contoh:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>React App</title>
  </head>

  <body>
    <div id="root"></div>

    <script type="module" src="/src/index.jsx"></script>
  </body>
</html>
```

Elemen pentingnya adalah:

```html
<div id="root"></div>
```

Elemen tersebut menjadi tempat React memasang atau **mount** aplikasi.

---

## Entry Point React

Pada proyek React, terdapat file JavaScript yang menjadi titik awal aplikasi.

Contohnya:

```text
src/
├── index.jsx
├── App.jsx
└── ...
```

File `index.jsx` biasanya bertanggung jawab untuk menghubungkan React dengan elemen HTML:

```jsx
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <App />
);
```

Alur sederhananya:

```text
index.html
    │
    ▼
<div id="root">
    │
    ▼
index.jsx
    │
    ▼
<App />
    │
    ▼
React Components
    │
    ▼
User Interface
```

---

## Apa Itu JSX?

**JSX** adalah ekstensi sintaks JavaScript yang memungkinkan kita menulis markup dengan gaya HTML langsung di dalam kode JavaScript.

Contoh:

```jsx
const element = <h1>Hello World!</h1>;
```

Kode tersebut terlihat seperti HTML, tetapi sebenarnya ditulis di dalam file JavaScript.

JSX membuat kode UI menjadi lebih mudah dibaca dibandingkan jika kita harus membuat seluruh elemen menggunakan JavaScript secara manual.

---

## JSX Bukan HTML

Meskipun sintaks JSX terlihat mirip HTML, JSX sebenarnya **bukan HTML**.

Contoh:

```jsx
const element = <h1>Hello World!</h1>;
```

Kode tersebut merupakan sintaks JSX yang nantinya akan diproses menjadi JavaScript.

Browser tidak memahami JSX secara langsung.

---

## Bagaimana JSX Diproses?

Browser tidak dapat menjalankan JSX secara langsung.

Karena itu, proyek React menggunakan **development tools** atau **build tools** untuk melakukan transformasi JSX menjadi JavaScript yang dapat dipahami browser.

Secara sederhana:

```text
JSX
 │
 ▼
Build Tool
 │
 ▼
JavaScript
 │
 ▼
Browser
```

Dalam proyek modern, tools seperti **Vite** membantu melakukan proses transformasi tersebut selama development.

---

## Contoh JSX

Kita dapat menulis:

```jsx
function App() {
  return (
    <div>
      <h1>Hello React!</h1>
      <p>Belajar React.js</p>
    </div>
  );
}
```

Kode tersebut menggunakan JSX untuk menggambarkan struktur UI.

---

## React Component

Dalam React, Component pada dasarnya merupakan **fungsi JavaScript**.

Contoh:

```jsx
function App() {
  return <h1>Hello React!</h1>;
}
```

`App` adalah sebuah React Component.

Component tersebut kemudian dapat digunakan:

```jsx
<App />
```

---

## Aturan Penamaan Component

Salah satu aturan penting dalam React adalah nama Component harus diawali dengan **huruf kapital**.

Contoh yang benar:

```jsx
function App() {
  return <h1>App</h1>;
}
```

```jsx
function Header() {
  return <header>Header</header>;
}
```

```jsx
function UserProfile() {
  return <div>User Profile</div>;
}
```

Biasanya digunakan pola **PascalCase** untuk nama Component:

```text
App
Header
UserProfile
ProductCard
NavigationBar
```

---

## Mengapa Harus Huruf Kapital?

React menggunakan aturan penamaan tersebut untuk membedakan antara:

- **HTML element**
- **React Component**

Contoh:

```jsx
<div>
  ...
</div>
```

`div` dianggap sebagai elemen HTML.

Sedangkan:

```jsx
<UserProfile />
```

dianggap sebagai React Component.

Karena itu, penamaan component seperti:

```jsx
function userProfile() {
  return <div>User</div>;
}
```

sebaiknya diubah menjadi:

```jsx
function UserProfile() {
  return <div>User</div>;
}
```

---

## Component Harus Mengembalikan UI

Component harus menghasilkan sesuatu yang dapat dirender oleh React.

Contoh:

```jsx
function Header() {
  return <h1>My Website</h1>;
}
```

Component tersebut mengembalikan JSX:

```jsx
<h1>My Website</h1>
```

React kemudian merender JSX tersebut ke dalam UI.

---

## Component Mengembalikan JSX

Contoh yang lebih lengkap:

```jsx
function Product() {
  return (
    <div>
      <h2>Laptop</h2>
      <p>Rp10.000.000</p>
    </div>
  );
}
```

Component `Product` menghasilkan sebuah struktur UI yang terdiri dari:

```text
Product
├── div
├── h2
└── p
```

---

## Menggunakan Component di Component Lain

Salah satu kekuatan React adalah kita dapat menggunakan Component di dalam Component lainnya.

Contoh:

```jsx
function Header() {
  return <header>My Website</header>;
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <h1>Welcome!</h1>
      </main>
    </div>
  );
}
```

Di sini:

```jsx
<Header />
```

merupakan penggunaan Component `Header` di dalam `App`.

---

## Component sebagai Building Block

Aplikasi React biasanya terdiri dari banyak Component.

Contohnya:

```text
App
├── Header
├── Navigation
├── Main
│   ├── ProductList
│   │   ├── ProductCard
│   │   ├── ProductCard
│   │   └── ProductCard
│   └── Sidebar
└── Footer
```

Setiap Component memiliki tanggung jawab tertentu.

Pendekatan ini membuat aplikasi lebih:

- Terstruktur.
- Reusable.
- Mudah dipahami.
- Mudah dikembangkan.
- Mudah dipelihara.

---

## JSX dan JavaScript

Salah satu kelebihan JSX adalah kita dapat menggunakan ekspresi JavaScript di dalam markup menggunakan **kurung kurawal `{}`**.

Contoh:

```jsx
function User() {
  const name = "Budi";

  return <h1>Hello {name}!</h1>;
}
```

Output:

```text
Hello Budi!
```

JavaScript:

```javascript
const name = "Budi";
```

digunakan langsung di dalam JSX:

```jsx
<h1>Hello {name}!</h1>
```

---

## Contoh Menggunakan Expression

Kita juga dapat menggunakan operasi JavaScript.

```jsx
function App() {
  const price = 100;
  const quantity = 3;

  return (
    <p>
      Total: {price * quantity}
    </p>
  );
}
```

Output:

```text
Total: 300
```

---

## JSX vs HTML

Walaupun JSX terlihat seperti HTML, terdapat beberapa perbedaan.

Contohnya, pada JSX kita menggunakan:

```jsx
className
```

bukan:

```html
class
```

Contoh:

```jsx
<div className="container">
  Hello
</div>
```

Bukan:

```html
<div class="container">
  Hello
</div>
```

Ada juga beberapa aturan JSX lainnya yang akan dipelajari lebih lanjut, seperti:

- Harus menggunakan satu root element pada return tertentu.
- Beberapa atribut HTML menggunakan nama berbeda.
- Elemen harus ditutup dengan benar.
- JavaScript expression menggunakan `{}`.

---

## Poin Penting

Ada beberapa konsep utama yang perlu diingat:

### JSX

JSX memungkinkan kita menulis markup dengan gaya HTML di dalam JavaScript.

```jsx
const element = <h1>Hello!</h1>;
```

### JSX Bukan HTML

JSX merupakan sintaks yang diproses menjadi JavaScript sebelum dijalankan oleh browser.

### Component

Component pada dasarnya merupakan fungsi JavaScript yang digunakan untuk menghasilkan UI.

```jsx
function App() {
  return <h1>Hello React!</h1>;
}
```

### Nama Component

Nama Component harus diawali dengan huruf kapital.

```jsx
function Header() {
  return <header>Header</header>;
}
```

### Return

Component harus mengembalikan sesuatu yang dapat dirender oleh React.

```jsx
return <h1>Hello World!</h1>;
```

---

## Kesimpulan

**JSX dan Component merupakan dua konsep dasar yang sangat penting dalam React.**

JSX memungkinkan kita menulis struktur UI dengan cara yang lebih deklaratif dan mudah dibaca:

```jsx
<h1>Hello React!</h1>
```

Sedangkan Component memungkinkan kita membagi aplikasi menjadi bagian-bagian kecil yang dapat digunakan kembali:

```jsx
function Header() {
  return <header>My Website</header>;
}
```

Dengan memahami kedua konsep ini, kita sudah memiliki dasar penting untuk mempelajari React lebih lanjut, seperti **Props, State, Event Handling, Conditional Rendering, dan Hooks**.
