---
sidebar_position: 6
title: "Entry Point, Rendering, dan Component Tree"
---

Untuk memahami bagaimana aplikasi React ditampilkan di browser, kita perlu memahami beberapa konsep dasar, yaitu **Entry Point**, `createRoot`, `render`, dan **Component Tree**.

## 1. Titik Masuk Aplikasi (Entry Point)

Setiap aplikasi React memiliki titik awal yang digunakan untuk menghubungkan kode React dengan halaman HTML.

File utama yang disajikan kepada browser adalah:

```text
index.html
```

Contoh sederhana:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>React App</title>
  </head>

  <body>
    <div id="root"></div>

    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

Elemen penting dalam contoh tersebut adalah:

```html
<div id="root"></div>
```

Elemen tersebut menjadi **wadah utama** tempat aplikasi React akan dirender.

File seperti:

```text
main.jsx
```

atau:

```text
index.jsx
```

biasanya menjadi **entry point JavaScript** untuk aplikasi React.

---

## 2. Bagaimana React Terhubung dengan HTML?

Secara sederhana, prosesnya dapat digambarkan seperti berikut:

```text
index.html
     │
     ▼
<div id="root"></div>
     │
     ▼
main.jsx
     │
     ▼
React
     │
     ▼
<App />
     │
     ▼
Component Tree
     │
     ▼
HTML DOM
```

React mengambil elemen `root` yang sudah tersedia di `index.html`, kemudian menggunakan elemen tersebut sebagai tempat untuk menampilkan aplikasi.

---

## 3. `createRoot()`

React menyediakan fungsi `createRoot()` untuk membuat root React pada elemen HTML tertentu.

Contoh:

```jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const root = createRoot(
  document.getElementById("root")
);
```

Bagian:

```javascript
document.getElementById("root")
```

digunakan untuk mengambil elemen HTML:

```html
<div id="root"></div>
```

Kemudian:

```javascript
createRoot(...)
```

membuat root yang digunakan React untuk mengelola aplikasi.

---

## 4. `render()`

Setelah root dibuat, kita dapat menggunakan method `render()` untuk menampilkan React Component.

Contoh:

```jsx
const root = createRoot(
  document.getElementById("root")
);

root.render(
  <App />
);
```

Kode:

```jsx
root.render(<App />);
```

memberitahu React untuk merender component `App` ke dalam root.

---

## 5. Contoh Entry Point Lengkap

Berikut contoh sederhana file `main.jsx`:

```jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const root = createRoot(
  document.getElementById("root")
);

root.render(
  <App />
);
```

Sedangkan `App.jsx`:

```jsx
function App() {
  return (
    <h1>
      Hello React!
    </h1>
  );
}

export default App;
```

Alurnya:

```text
index.html
     │
     ▼
#root
     │
     ▼
main.jsx
     │
     ▼
<App />
     │
     ▼
<h1>Hello React!</h1>
```

---

## 6. Konsep Component Tree

Dalam aplikasi React, sebuah component dapat menggunakan component lainnya.

Contoh:

```jsx
function App() {
  return (
    <div>
      <Header />
      <main>
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}
```

Component `App` memiliki beberapa component anak:

```text
App
├── Header
├── ProductList
└── Footer
```

Jika `ProductList` juga menggunakan component lain:

```jsx
function ProductList() {
  return (
    <div>
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
```

maka struktur component menjadi:

```text
App
├── Header
├── ProductList
│   ├── ProductCard
│   ├── ProductCard
│   └── ProductCard
└── Footer
```

Struktur hierarki tersebut disebut **Component Tree**.

---

## 7. Apa Itu Component Tree?

**Component Tree** adalah struktur hierarki yang menggambarkan hubungan antara component dalam aplikasi React.

Contohnya:

```text
App
│
├── Header
│   └── Navigation
│
├── Main
│   └── ProductList
│       ├── ProductCard
│       ├── ProductCard
│       └── ProductCard
│
└── Footer
```

Component yang berada di atas disebut **parent component**, sedangkan component yang berada di bawahnya disebut **child component**.

Contoh:

```text
App
└── Header
```

`App` adalah parent dari `Header`.

---

## 8. Custom Component vs HTML Element

React membedakan **Custom Component** dan **HTML Element** berdasarkan penulisan namanya.

### Custom Component

Custom Component menggunakan nama yang diawali huruf kapital.

Contoh:

```jsx
<Header />
<UserProfile />
<ProductCard />
<Navigation />
```

### HTML Element

HTML Element menggunakan nama huruf kecil.

Contoh:

```jsx
<header></header>
<div></div>
<section></section>
<button></button>
```

---

## 9. Mengapa Huruf Kapital Penting?

Perhatikan:

```jsx
<Header />
```

React akan mengenalinya sebagai **Custom Component**.

Sedangkan:

```jsx
<header></header>
```

dikenali sebagai **HTML element**.

Karena itu, aturan penamaan component sangat penting.

Contoh:

```jsx
function Header() {
  return <header>My Website</header>;
}
```

Kemudian digunakan:

```jsx
<Header />
```

React akan menjalankan fungsi `Header`.

---

## 10. Custom Component Tidak Menjadi Tag HTML

Salah satu konsep penting adalah Custom Component seperti:

```jsx
<Header />
```

tidak akan muncul sebagai:

```html
<Header></Header>
```

di DOM browser.

React menggunakan `Header` sebagai component dan menjalankan fungsi tersebut.

Misalnya:

```jsx
function Header() {
  return (
    <header>
      <h1>My Website</h1>
    </header>
  );
}
```

Ketika React memproses:

```jsx
<Header />
```

React menjalankan component `Header` dan mendapatkan:

```jsx
<header>
  <h1>My Website</h1>
</header>
```

Kemudian elemen HTML tersebut yang akan dirender ke DOM.

---

## 11. Proses Rendering Component

Secara sederhana, prosesnya adalah:

```text
<Header />
     │
     ▼
React menjalankan Header()
     │
     ▼
return (
  <header>
    <h1>My Website</h1>
  </header>
)
     │
     ▼
React memproses elemen HTML
     │
     ▼
DOM Browser
```

Jadi, component berfungsi sebagai cara untuk menghasilkan struktur UI.

---

## 12. Contoh Component Bersarang

Misalnya kita memiliki:

```jsx
function Header() {
  return (
    <header>
      <Navigation />
    </header>
  );
}

function Navigation() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/products">Products</a>
    </nav>
  );
}

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}
```

Component Tree-nya:

```text
App
└── Header
    └── Navigation
```

React akan mengevaluasi component dari struktur tersebut hingga menghasilkan elemen HTML yang dapat dirender ke browser.

---

## 13. Component Tree dan DOM

Penting untuk membedakan **Component Tree** dan **DOM Tree**.

Component Tree:

```text
App
├── Header
│   └── Navigation
└── Main
    └── ProductList
```

Sedangkan hasil akhirnya pada DOM dapat berupa:

```text
div
├── header
│   └── nav
│       ├── a
│       └── a
└── main
    └── div
        ├── article
        ├── article
        └── article
```

Custom Component seperti `App`, `Header`, dan `ProductList` berfungsi sebagai bagian dari struktur React, sedangkan DOM browser berisi node HTML yang dihasilkan oleh component tersebut.

---

## 14. Alur Lengkap Aplikasi React

Secara keseluruhan, proses aplikasi React dapat digambarkan seperti berikut:

```text
index.html
     │
     ▼
<div id="root"></div>
     │
     ▼
main.jsx
     │
     ▼
createRoot()
     │
     ▼
root.render(<App />)
     │
     ▼
App Component
     │
     ├── Header
     │   └── Navigation
     │
     ├── Main
     │   └── ProductList
     │       └── ProductCard
     │
     └── Footer
     │
     ▼
React menghasilkan HTML Elements
     │
     ▼
DOM Browser
     │
     ▼
User Interface
```

---

## 15. Poin Penting

Beberapa konsep utama yang perlu diingat:

### Entry Point

`index.html` merupakan halaman HTML utama yang menjadi titik awal aplikasi yang disajikan ke browser.

### Root Element

Elemen seperti:

```html
<div id="root"></div>
```

menjadi tempat aplikasi React dipasang.

### `createRoot()`

Digunakan untuk membuat React Root berdasarkan elemen HTML yang sudah tersedia.

```jsx
const root = createRoot(
  document.getElementById("root")
);
```

### `render()`

Digunakan untuk merender component ke dalam React Root.

```jsx
root.render(<App />);
```

### Component Tree

Hierarki component dalam aplikasi React.

```text
App
├── Header
├── Main
└── Footer
```

### Custom Component

Ditulis menggunakan huruf kapital:

```jsx
<Header />
```

### HTML Element

Ditulis menggunakan huruf kecil:

```jsx
<header></header>
```

### Custom Component Tidak Menjadi Tag DOM

React menjalankan component untuk menghasilkan elemen HTML yang kemudian dirender ke DOM.

---

## Kesimpulan

React bekerja dengan menghubungkan **HTML sebagai entry point** dengan **Component Tree** yang dibangun menggunakan JavaScript dan JSX.

Proses sederhananya adalah:

```text
index.html
     ↓
#root
     ↓
createRoot()
     ↓
render(<App />)
     ↓
Component Tree
     ↓
React Components
     ↓
HTML Elements
     ↓
DOM
     ↓
User Interface
```

Dengan memahami alur ini, kita dapat melihat bahwa React bukan sekadar kumpulan tag HTML. React menggunakan **component sebagai struktur utama aplikasi**, kemudian menjalankan component tersebut untuk menghasilkan elemen HTML yang akhirnya ditampilkan oleh browser.
