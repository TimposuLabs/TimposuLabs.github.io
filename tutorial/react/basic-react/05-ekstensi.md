---
sidebar_position: 5
title: "Ekstensi File .jsx vs .js"
---


Saat membuat aplikasi React, kita akan sering menemukan file dengan ekstensi:

```text
.jsx
```

atau:

```text
.js
```

Keduanya dapat digunakan untuk menyimpan kode React, termasuk JSX. Perbedaan utamanya lebih berkaitan dengan **konvensi proyek dan konfigurasi build tools**, bukan kemampuan browser.

---

## 1. Apa Itu `.jsx`?

`.jsx` merupakan ekstensi file yang umum digunakan untuk file yang berisi **JavaScript dengan JSX**.

Contoh:

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

File tersebut dapat disimpan sebagai:

```text
Header.jsx
```

Penggunaan `.jsx` membantu developer mengetahui bahwa file tersebut kemungkinan besar berisi JSX.

---

## 2. Apa Itu `.js`?

`.js` merupakan ekstensi standar untuk file JavaScript.

Namun, dalam banyak proyek React, file `.js` juga dapat berisi JSX.

Contoh:

```javascript
function Header() {
  return (
    <header>
      <h1>My Website</h1>
    </header>
  );
}

export default Header;
```

File tersebut dapat disimpan sebagai:

```text
Header.js
```

Jadi, `.js` tidak selalu berarti file tersebut hanya berisi JavaScript tanpa JSX.

---

## 3. Apakah Browser Mendukung `.jsx`?

Browser tidak menjalankan JSX secara langsung.

Misalnya:

```jsx
function App() {
  return <h1>Hello React!</h1>;
}
```

Browser tidak dapat langsung memahami sintaks JSX tersebut.

Kode JSX harus terlebih dahulu diproses oleh **build tools** atau development tools.

Secara sederhana:

```text
File JSX
   │
   ▼
Build Process
   │
   ▼
JavaScript
   │
   ▼
Browser
```

Dalam proyek React modern, tools seperti Vite dapat melakukan proses transformasi tersebut.

---

## 4. `.jsx` Bukan Syarat React

Penggunaan `.jsx` bukan merupakan persyaratan wajib dari React.

Kita dapat memiliki:

```text
App.jsx
```

atau:

```text
App.js
```

keduanya dapat digunakan untuk component React selama build tools proyek mendukungnya.

Contoh:

```jsx
// App.jsx

function App() {
  return <h1>Hello React!</h1>;
}
```

dan:

```javascript
// App.js

function App() {
  return <h1>Hello React!</h1>;
}
```

Keduanya dapat berisi React Component.

---

## 5. Mengapa Banyak Proyek Menggunakan `.jsx`?

Penggunaan `.jsx` sering dipilih sebagai **konvensi** agar developer dapat langsung mengetahui jenis file tersebut.

Misalnya:

```text
src/
├── App.jsx
├── Header.jsx
├── Product.jsx
└── Footer.jsx
```

Dari nama file tersebut, kita dapat memperkirakan bahwa file-file tersebut berisi JSX atau React Component.

Sedangkan file yang hanya berisi JavaScript biasa dapat menggunakan:

```text
utils.js
api.js
helpers.js
```

Contoh:

```text
src/
├── App.jsx
├── Header.jsx
├── Product.jsx
├── api.js
└── helpers.js
```

Namun, ini hanyalah **konvensi**. Aturan sebenarnya tetap bergantung pada konfigurasi proyek.

---

## 6. Import File dengan Ekstensi

Ketika menggunakan component dari file lain, kita menggunakan `import`.

Contoh:

```jsx
import Header from "./Header.jsx";
```

Pada beberapa proyek, kita juga dapat menulis:

```jsx
import Header from "./Header";
```

Keduanya dapat bekerja tergantung pada konfigurasi **module resolver** dan build tools yang digunakan.

---

## 7. Import dengan Ekstensi Lengkap

Contoh:

```jsx
import Header from "./Header.jsx";
```

atau:

```javascript
import helper from "./helpers.js";
```

Pada konfigurasi tertentu, penulisan ekstensi lengkap mungkin diperlukan.

---

## 8. Import Tanpa Ekstensi

Pada konfigurasi proyek tertentu, ekstensi dapat dihilangkan.

Contoh:

```jsx
import Header from "./Header";
```

Build tools akan mencari file yang sesuai, misalnya:

```text
Header.jsx
```

atau:

```text
Header.js
```

tergantung konfigurasi resolver.

---

## 9. Contoh Struktur Proyek

Misalnya kita memiliki struktur:

```text
src/
├── App.jsx
├── Header.jsx
├── Product.jsx
└── utils.js
```

Di dalam `App.jsx`:

```jsx
import Header from "./Header";
import Product from "./Product";
import { calculatePrice } from "./utils";
```

Build tools akan menangani proses resolusi file tersebut sesuai konfigurasi proyek.

---

## 10. Apakah Harus Selalu Menggunakan `.jsx`?

Tidak.

Anda dapat menggunakan `.jsx` jika ingin membedakan file yang berisi JSX dari file JavaScript biasa.

Contoh:

```text
App.jsx
Header.jsx
Product.jsx
```

Sedangkan:

```text
api.js
utils.js
helpers.js
```

Namun, ada juga proyek yang menggunakan `.js` untuk hampir semua file:

```text
App.js
Header.js
Product.js
```

Keduanya merupakan pendekatan yang valid selama didukung oleh build tools proyek.

---

## 11. Konvensi yang Sering Digunakan

Salah satu pola yang mudah dipahami adalah:

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── ProductCard.jsx
│
├── utils/
│   └── formatPrice.js
│
├── App.jsx
└── main.jsx
```

Dengan pola tersebut:

- `.jsx` → biasanya digunakan untuk file yang berisi JSX.
- `.js` → biasanya digunakan untuk JavaScript biasa.

Namun, sekali lagi, ini merupakan **konvensi**, bukan aturan mutlak React.

---

## Poin Penting

### `.jsx`

Digunakan sebagai ekstensi yang umum untuk file yang berisi JSX.

```text
App.jsx
```

### `.js`

Merupakan ekstensi JavaScript dan juga dapat digunakan untuk file yang berisi JSX jika build tools mendukungnya.

```text
App.js
```

### Browser

Browser tidak memahami JSX secara langsung.

```text
JSX
 ↓
Build Process
 ↓
JavaScript
 ↓
Browser
```

### Import

Ekstensi dapat ditulis lengkap:

```javascript
import App from "./App.jsx";
```

atau dapat dihilangkan:

```javascript
import App from "./App";
```

tergantung konfigurasi proyek.

---

## Kesimpulan

Perbedaan `.jsx` dan `.js` dalam proyek React **bukan berarti React hanya dapat menggunakan `.jsx`**.

Keduanya dapat digunakan untuk membuat React Component selama konfigurasi build tools mendukungnya.

Secara umum:

```text
.jsx → JavaScript yang berisi JSX
.js  → JavaScript, dan dapat juga berisi JSX
```

Yang perlu dipahami adalah **browser tidak menjalankan JSX secara langsung**. JSX diproses terlebih dahulu oleh build tools seperti Vite sebelum akhirnya dikirim sebagai JavaScript yang dapat dijalankan oleh browser.

Jadi, ketika membuat project React, ikuti **konvensi dan konfigurasi project** yang sedang digunakan agar penamaan file dan syntax `import` tetap konsisten.
