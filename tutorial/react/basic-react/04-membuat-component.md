---
sidebar_position: 4
title: "Membuat Component"
---

## Membuat Custom Component Pertama di React

Salah satu konsep penting dalam React adalah kemampuan untuk membuat **Custom Component**.

Custom Component memungkinkan kita membagi User Interface (UI) yang besar menjadi beberapa bagian kecil yang lebih terstruktur, reusable, dan mudah dikelola.

Daripada menempatkan seluruh kode UI di dalam satu component seperti `App`, kita dapat memisahkannya menjadi component-component yang memiliki tanggung jawab masing-masing.

---

## Mengapa Membuat Custom Component?

Bayangkan sebuah aplikasi memiliki UI seperti:

```text
App
├── Header
├── Navigation
├── Main Content
└── Footer
```

Jika seluruh kode tersebut ditulis di dalam `App`, kode akan menjadi panjang dan sulit dikelola.

Dengan Custom Component, kita dapat memisahkannya:

```text
App
├── Header
├── Navigation
├── MainContent
└── Footer
```

Masing-masing bagian dapat dibuat sebagai component tersendiri.

Contohnya:

```jsx
function Header() {
  return <header>My Website</header>;
}

function Footer() {
  return <footer>Copyright 2026</footer>;
}
```

Kemudian digunakan di dalam `App`:

```jsx
function App() {
  return (
    <>
      <Header />
      <main>Konten utama</main>
      <Footer />
    </>
  );
}
```

Dengan cara ini, `App` menjadi lebih sederhana dan mudah dibaca.

---

## Langkah Membuat Custom Component

Untuk membuat Custom Component, kita dapat mengikuti beberapa langkah sederhana.

### 1. Membuat Fungsi JavaScript

Pertama, buat sebuah fungsi JavaScript baru.

Nama component harus diawali dengan **huruf kapital**.

Contoh:

```jsx
function Header() {
  // ...
}
```

Nama `Header` menggunakan huruf kapital sehingga React dapat mengenalinya sebagai Custom Component.

Gunakan pola **PascalCase** untuk nama component:

```text
Header
UserProfile
ProductCard
NavigationBar
ShoppingCart
```

Hindari penamaan seperti:

```text
header
userProfile
productCard
```

---

### 2. Memindahkan Markup ke Component

Misalnya sebelumnya kita memiliki component `App` seperti berikut:

```jsx
function App() {
  return (
    <div>
      <header>
        <h1>My Website</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/products">Products</a>
        </nav>
      </header>

      <main>
        <h2>Welcome!</h2>
      </main>
    </div>
  );
}
```

Kita dapat memindahkan bagian `<header>` ke Custom Component.

Buat component:

```jsx
function Header() {
  return (
    <header>
      <h1>My Website</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/products">Products</a>
      </nav>
    </header>
  );
}
```

Kemudian `App` menjadi lebih sederhana:

```jsx
function App() {
  return (
    <div>
      <Header />

      <main>
        <h2>Welcome!</h2>
      </main>
    </div>
  );
}
```

---

### 3. Mengembalikan JSX

Sebuah component harus mengembalikan sesuatu yang dapat dirender oleh React.

Contoh:

```jsx
function Header() {
  return <h1>My Website</h1>;
}
```

Untuk JSX yang terdiri dari beberapa baris, biasanya digunakan tanda kurung:

```jsx
function Header() {
  return (
    <header>
      <h1>My Website</h1>
      <p>Belajar React.js</p>
    </header>
  );
}
```

Tanda kurung:

```javascript
(...)
```

membantu membuat JSX multi-baris menjadi lebih mudah dibaca dan terstruktur.

---

## Menggunakan Custom Component

Setelah component dibuat, kita dapat menggunakannya di dalam JSX.

Misalnya:

```jsx
function Header() {
  return <h1>My Website</h1>;
}
```

Untuk menggunakan `Header`, kita tidak menulis:

```javascript
Header();
```

Meskipun `Header` merupakan fungsi JavaScript, React Component digunakan melalui sintaks JSX.

Gunakan:

```jsx
<Header />
```

---

## Component Bukan Dipanggil Seperti Function Biasa

Perhatikan perbedaan berikut.

### Function JavaScript biasa

```javascript
function greet() {
  console.log("Hello");
}

greet();
```

Function dipanggil menggunakan:

```javascript
greet();
```

### React Component

```jsx
function Header() {
  return <h1>My Website</h1>;
}
```

Component digunakan menggunakan:

```jsx
<Header />
```

Jadi:

```jsx
<Header />
```

merupakan cara React menggunakan component tersebut dalam JSX.

---

## Opening dan Closing Tag

Custom Component dapat ditulis menggunakan opening dan closing tag.

```jsx
<Header></Header>
```

Namun, jika component tidak memiliki content di dalamnya, kita dapat menggunakan **self-closing tag**:

```jsx
<Header />
```

Keduanya dapat digunakan untuk Custom Component.

---

## Self-Closing Tag

Dalam JSX, self-closing tag harus menggunakan:

```text
/>
```

Contoh:

```jsx
<Header />
```

Bukan:

```jsx
<Header>
```

Jika sebuah elemen tidak memiliki content di antara opening dan closing tag, gunakan self-closing syntax.

---

## Self-Closing pada HTML Element

Aturan self-closing juga berlaku pada beberapa elemen HTML yang tidak memiliki content.

Contohnya:

```jsx
<img src="logo.png" alt="Logo" />
```

```jsx
<input type="text" />
```

```jsx
<br />
```

Perhatikan penggunaan:

```text
/>
```

di akhir tag.

Dalam JSX, penulisan seperti:

```jsx
<img src="logo.png" alt="Logo">
```

tidak valid karena elemen tersebut belum ditutup.

Gunakan:

```jsx
<img src="logo.png" alt="Logo" />
```

---

## Contoh Custom Component Sederhana

Berikut contoh lengkap membuat component `Header`.

```jsx
function Header() {
  return (
    <header>
      <h1>My Website</h1>
      <p>Belajar React.js</p>
    </header>
  );
}

function App() {
  return (
    <div>
      <Header />

      <main>
        <h2>Welcome to My Website</h2>
      </main>
    </div>
  );
}
```

Struktur component:

```text
App
└── Header
```

React akan merender `Header` sebagai bagian dari `App`.

---

## Membuat Beberapa Custom Component

Kita dapat membuat beberapa component untuk membangun UI yang lebih kompleks.

```jsx
function Header() {
  return (
    <header>
      <h1>My Website</h1>
    </header>
  );
}

function MainContent() {
  return (
    <main>
      <h2>Welcome!</h2>
      <p>Selamat datang di website saya.</p>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <p>Copyright 2026</p>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <MainContent />
      <Footer />
    </>
  );
}
```

Strukturnya menjadi:

```text
App
├── Header
├── MainContent
└── Footer
```

Pendekatan seperti ini membuat aplikasi lebih terorganisir.

---

## Memisahkan Component ke File Berbeda

Dalam proyek React yang lebih besar, setiap component biasanya dapat dipisahkan ke file tersendiri.

Contoh struktur:

```text
src/
├── App.jsx
├── Header.jsx
├── MainContent.jsx
└── Footer.jsx
```

File `Header.jsx`:

```jsx
function Header() {
  return (
    <header>
      <h1>My Website</h1>
    </header>
  );
}

export default Header;
```

Kemudian di `App.jsx`:

```jsx
import Header from "./Header.jsx";

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
```

Dengan cara ini, setiap component memiliki file sendiri dan dapat digunakan kembali di bagian aplikasi lainnya.

---

## Poin Penting

Ada beberapa aturan dasar yang perlu diingat ketika membuat Custom Component.

### 1. Nama Component Harus Kapital

```jsx
function Header() {
  return <h1>Header</h1>;
}
```

Gunakan PascalCase:

```text
Header
UserProfile
ProductCard
```

---

### 2. Component Harus Mengembalikan JSX

```jsx
function Header() {
  return <h1>My Website</h1>;
}
```

---

### 3. Gunakan Component dengan JSX

Benar:

```jsx
<Header />
```

Bukan:

```javascript
Header();
```

---

### 4. Gunakan Self-Closing Tag dengan Benar

```jsx
<Header />
```

```jsx
<img src="logo.png" alt="Logo" />
```

---

### 5. Component Dapat Dipisahkan ke File

Contoh:

```text
Header.jsx
Footer.jsx
Product.jsx
```

Kemudian dihubungkan menggunakan:

```javascript
import
export
```

---

## Kesimpulan

**Custom Component** memungkinkan kita memecah UI menjadi bagian-bagian kecil yang lebih mudah dikelola dan digunakan kembali.

Proses sederhananya:

```text
1. Buat fungsi
       ↓
2. Gunakan nama dengan huruf kapital
       ↓
3. Kembalikan JSX
       ↓
4. Gunakan component dengan <NamaComponent />
```

Contoh paling sederhana:

```jsx
function Header() {
  return <h1>My Website</h1>;
}

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}
```

Konsep ini merupakan fondasi penting dalam React. Setelah memahami cara membuat Custom Component, langkah berikutnya adalah mempelajari bagaimana **mengirim data ke component menggunakan Props** sehingga satu component dapat digunakan dengan data yang berbeda.

