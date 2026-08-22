---
slug: dynamic-page-react
title: Membuat Dynamic Page dengan React Menggunakan useState
authors: topekox
tags: [springboot, rest api, jwt]
---

Dalam pengembangan aplikasi React, kita sering membutuhkan sebuah halaman yang dapat berubah berdasarkan interaksi pengguna. Misalnya, ketika pengguna memilih menu **Home**, aplikasi menampilkan halaman Home. Ketika memilih **Products**, aplikasi menampilkan daftar produk, dan ketika memilih **About**, aplikasi menampilkan informasi tentang aplikasi.

<!-- truncate -->

Salah satu cara sederhana untuk membuat mekanisme seperti ini adalah menggunakan **React State** dengan `useState`.

Pada artikel ini kita akan membuat contoh **dynamic page** menggunakan React berdasarkan project `demo-dynamic-page-react`.

Project ini menggunakan React dan Vite sebagai dasar aplikasi. Data halaman ditentukan berdasarkan state, kemudian React akan merender component yang sesuai dengan halaman yang sedang aktif.

## Apa Itu Dynamic Page?

Dynamic page adalah pendekatan di mana tampilan halaman yang ditampilkan dapat berubah berdasarkan kondisi tertentu tanpa harus membuat seluruh aplikasi menjadi halaman HTML yang berbeda.

Sebagai contoh, kita memiliki empat halaman:

```text
Home
Products
About
Contact
```

Ketika pengguna memilih menu:

```text
Home     → menampilkan Home
Products → menampilkan Products
About    → menampilkan About
Contact  → menampilkan Contact
```

Dalam React, perubahan tampilan tersebut dapat dilakukan dengan mengubah state.

Konsep sederhananya:

```text
User klik menu
      ↓
State berubah
      ↓
React melakukan re-render
      ↓
Component halaman berubah
```

Dengan pendekatan ini, kita dapat membuat aplikasi sederhana yang memiliki beberapa tampilan tetapi tetap menggunakan satu root component.

## Dynamic Page vs Routing

Sebelum melanjutkan, penting untuk membedakan dua konsep yang sering dianggap sama.

### Dynamic Page dengan State

Pada pendekatan yang digunakan dalam project ini, halaman aktif disimpan dalam state:

```jsx
const [currentPage, setCurrentPage] = useState('home')
```

Kemudian aplikasi menentukan component berdasarkan nilai tersebut.

```jsx
switch (currentPage) {
  case 'home':
    return <Home />

  case 'about':
    return <About />

  case 'products':
    return <Products />

  case 'contact':
    return <Contact />
}
```

Jadi URL browser tidak berubah.

Misalnya pengguna berada di:

```text
http://localhost:5173/
```

Ketika memilih Products, URL tetap:

```text
http://localhost:5173/
```

tetapi isi halaman berubah.

### Dynamic Routing

Berbeda dengan dynamic routing menggunakan library seperti React Router.

Contohnya:

```text
/
 /about
 /products
 /contact
```

Dalam pendekatan routing, URL menjadi bagian dari navigasi aplikasi.

React Router mendukung dynamic segment seperti:

```text
/products/:productId
```

Sehingga URL:

```text
/products/10
```

dapat digunakan untuk mengambil parameter `productId` dengan nilai `10`.

Jadi, project pada artikel ini merupakan contoh yang lebih sederhana untuk memahami konsep **dynamic page rendering menggunakan state**.

## Project yang Akan Dibuat

Struktur aplikasi yang digunakan adalah:

```text
demo-dynamic-page-react/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── About.jsx
│   │       ├── Product.jsx
│   │       └── Contact.jsx
│   ├── product.js
│   ├── App.jsx
│   └── App.css
├── package.json
└── ...
```

Pembagian component seperti ini membuat setiap halaman memiliki tanggung jawab masing-masing.

Contohnya:

```text
App.jsx
   │
   ├── Navbar
   │
   └── Page
       ├── Home
       ├── About
       ├── Products
       └── Contact
```

## Persiapan Project

Project menggunakan React dengan Vite.

Dependencies utama yang digunakan antara lain:

```json
{
  "dependencies": {
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^6.0.4",
    "vite": "^8.2.0"
  }
}
```

Jika ingin membuat project baru dari awal, kita dapat menggunakan Vite:

```bash
npm create vite@latest demo-dynamic-page-react
```

Kemudian pilih:

```text
React
JavaScript
```

Masuk ke directory project:

```bash
cd demo-dynamic-page-react
```

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

## Membuat Component Page

Selanjutnya kita membuat beberapa component untuk masing-masing halaman.

### Component Home

Buat file:

```text
src/components/pages/Home.jsx
```

Isi sederhananya:

```jsx
export default function Home({ setCurrentPage }) {
  return (
    <div className="home-content">
      <h1>Selamat Datang! 👋</h1>

      <p>
        Ini adalah aplikasi React dasar untuk belajar
        fundamental seperti state management,
        navigasi antar halaman, dan component reusability.
      </p>

      <button
        className="cta-button"
        onClick={() => setCurrentPage('products')}
      >
        Lihat Produk Kami →
      </button>
    </div>
  )
}
```

Perhatikan bahwa component menerima:

```jsx
setCurrentPage
```

melalui props.

Function tersebut digunakan untuk mengubah halaman aktif.

Ketika tombol diklik:

```jsx
onClick={() => setCurrentPage('products')}
```

state akan berubah menjadi:

```text
products
```

React kemudian melakukan re-render.

## Component About

Buat file:

```text
src/components/pages/About.jsx
```

Contoh:

```jsx
export default function About() {
  return (
    <div className="about-content">
      <h1>Tentang Aplikasi Ini</h1>

      <p>
        Aplikasi ini adalah contoh pembelajaran React dasar
        yang dirancang untuk memahami konsep-konsep fundamental
        dalam pengembangan aplikasi React.
      </p>

      <h3>Fitur yang Dipelajari</h3>

      <ul>
        <li>Component Based Architecture</li>
        <li>State Management</li>
        <li>Navigasi antar halaman</li>
        <li>Props Passing</li>
        <li>Data Management</li>
      </ul>
    </div>
  )
}
```

Component ini tidak membutuhkan state karena hanya menampilkan informasi.

## Component Products

Selanjutnya kita membuat halaman Products.

File:

```text
src/components/pages/Product.jsx
```

Contoh:

```jsx
import { products } from '../../product.js'

export default function Products() {
  return (
    <div className="products-header">
      <h1>Produk Kami</h1>

      <p>
        Pilih produk yang anda inginkan dari katalog kami
      </p>

      <div className="products-grid">
        {products.map(product => (
          <div
            key={product.id}
            className="product-card"
          >
            <span className="product-icon">
              {product.image}
            </span>

            <h3 className="product-name">
              {product.name}
            </h3>

            <span className="product-category">
              {product.category}
            </span>

            <div className="product-price">
              {product.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

Di sini kita juga menggunakan konsep `map()` untuk menampilkan data produk.

Misalnya file:

```text
src/product.js
```

berisi:

```jsx
export const products = [
  {
    id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 'Rp10.000.000',
    image: '💻'
  },
  {
    id: 2,
    name: 'Smartphone',
    category: 'Electronics',
    price: 'Rp5.000.000',
    image: '📱'
  },
  {
    id: 3,
    name: 'Headphone',
    category: 'Audio',
    price: 'Rp1.000.000',
    image: '🎧'
  }
]
```

Kemudian:

```jsx
products.map(product => ...)
```

akan menghasilkan component berdasarkan setiap data produk.

## Component Contact

Buat:

```text
src/components/pages/Contact.jsx
```

Contohnya:

```jsx
export default function Contact() {
  return (
    <div className="contact-content">
      <h1>Hubungi Kami</h1>

      <div className="contact-info">
        <div className="contact-item">
          <div className="contact-label">
            📧 Email
          </div>

          <div className="contact-value">
            contact@myapp.com
          </div>
        </div>

        <div className="contact-item">
          <div className="contact-label">
            📱 Telepon
          </div>

          <div className="contact-value">
            +62 812 3456 7890
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Membuat Navbar

Sekarang kita membutuhkan navigation menu.

Buat:

```text
src/components/Navbar.jsx
```

Contoh implementasinya:

```jsx
export default function Navbar({
  currentPage,
  setCurrentPage
}) {
  const menuItems = [
    {
      id: 'home',
      label: 'Home'
    },
    {
      id: 'products',
      label: 'Products'
    },
    {
      id: 'about',
      label: 'About'
    },
    {
      id: 'contact',
      label: 'Contact'
    }
  ]

  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="logo">
          MyApp
        </div>

        <ul className="nav-menu">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                className={
                  currentPage === item.id
                    ? 'active'
                    : undefined
                }
                onClick={() =>
                  setCurrentPage(item.id)
                }
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  )
}
```

Bagian penting dari component ini adalah:

```jsx
onClick={() => setCurrentPage(item.id)}
```

Misalnya user mengklik:

```text
Products
```

maka:

```jsx
item.id
```

bernilai:

```text
products
```

Kemudian function:

```jsx
setCurrentPage('products')
```

dipanggil.

State `currentPage` akhirnya berubah dari:

```text
home
```

menjadi:

```text
products
```

## Membuat Dynamic Page di App.jsx

Bagian terpenting dari project terdapat pada `App.jsx`.

Import seluruh halaman:

```jsx
import { useState } from 'react'

import Home from './components/pages/Home'
import About from './components/pages/About'
import Products from './components/pages/Product'
import Contact from './components/pages/Contact'

import Navbar from './components/Navbar'
```

Kemudian buat state:

```jsx
const [currentPage, setCurrentPage] =
  useState('home')
```

Artinya ketika aplikasi pertama kali dijalankan, halaman yang aktif adalah:

```text
home
```

Selanjutnya kita membuat function untuk menentukan halaman:

```jsx
const renderPage = () => {
  switch (currentPage) {

    case 'home':
      return (
        <Home
          setCurrentPage={setCurrentPage}
        />
      )

    case 'about':
      return <About />

    case 'products':
      return <Products />

    case 'contact':
      return <Contact />

    default:
      return (
        <Home
          setCurrentPage={setCurrentPage}
        />
      )
  }
}
```

Inilah inti dari dynamic page pada project ini.

React akan memeriksa nilai:

```jsx
currentPage
```

Kemudian memilih component yang sesuai.

## Implementasi App.jsx Lengkap

File `App.jsx` secara keseluruhan menjadi:

```jsx
import { useState } from 'react'
import './App.css'

import Home from './components/pages/Home'
import About from './components/pages/About'
import Products from './components/pages/Product'
import Contact from './components/pages/Contact'

import Navbar from './components/Navbar'

function App() {

  const [currentPage, setCurrentPage] =
    useState('home')

  const renderPage = () => {

    switch (currentPage) {

      case 'home':
        return (
          <Home
            setCurrentPage={setCurrentPage}
          />
        )

      case 'about':
        return <About />

      case 'products':
        return <Products />

      case 'contact':
        return <Contact />

      default:
        return (
          <Home
            setCurrentPage={setCurrentPage}
          />
        )
    }
  }

  return (
    <div className="app">

      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main className="main-content">

        <div className="page">
          {renderPage()}
        </div>

      </main>

    </div>
  )
}

export default App
```

## Bagaimana Prosesnya Bekerja?

Mari kita lihat alur ketika aplikasi dijalankan.

Pada awal aplikasi:

```jsx
useState('home')
```

menghasilkan:

```text
currentPage = "home"
```

Kemudian:

```jsx
renderPage()
```

dijalankan.

React menemukan:

```jsx
case 'home':
```

sehingga component:

```jsx
<Home />
```

ditampilkan.

Sekarang user mengklik:

```text
Products
```

Navbar menjalankan:

```jsx
setCurrentPage('products')
```

State berubah:

```text
home
↓
products
```

Perubahan state menyebabkan React melakukan re-render.

Kemudian `renderPage()` dijalankan kembali.

React menemukan:

```jsx
case 'products':
```

dan menampilkan:

```jsx
<Products />
```

Alurnya menjadi:

```text
User klik Products
        ↓
setCurrentPage('products')
        ↓
currentPage berubah
        ↓
React re-render
        ↓
renderPage()
        ↓
switch(currentPage)
        ↓
case 'products'
        ↓
<Products />
```

## Mengapa Menggunakan switch?

Pada project sederhana, `switch` cukup mudah dipahami.

Contohnya:

```jsx
switch (currentPage) {
  case 'home':
    return <Home />

  case 'about':
    return <About />

  case 'products':
    return <Products />

  case 'contact':
    return <Contact />
}
```

Kelebihannya adalah struktur kode mudah dibaca oleh pemula.

Kita dapat langsung melihat hubungan antara:

```text
currentPage
```

dengan:

```text
Component
```

Namun, apabila jumlah halaman semakin banyak, penggunaan `switch` dapat menjadi kurang praktis.

Misalnya:

```text
Home
About
Products
Contact
Blog
Services
Portfolio
Dashboard
Profile
Settings
...
```

Pada kondisi tersebut, kita dapat menggunakan pendekatan yang lebih scalable.

## Alternatif Menggunakan Object Mapping

Daripada menggunakan `switch`, kita dapat membuat object:

```jsx
const pages = {
  home: <Home />,
  about: <About />,
  products: <Products />,
  contact: <Contact />
}
```

Kemudian:

```jsx
return pages[currentPage]
```

Sehingga kode menjadi lebih sederhana.

Contohnya:

```jsx
const renderPage = () => {
  const pages = {
    home: <Home />,
    about: <About />,
    products: <Products />,
    contact: <Contact />
  }

  return pages[currentPage] || <Home />
}
```

Pendekatan ini cocok ketika halaman yang ditampilkan tidak membutuhkan konfigurasi yang kompleks.

## Passing State ke Component

Hal menarik lainnya dari project ini adalah penggunaan **props**.

Pada `App.jsx` kita memiliki:

```jsx
const [currentPage, setCurrentPage] =
  useState('home')
```

Kemudian state setter dikirim ke Navbar:

```jsx
<Navbar
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
/>
```

Navbar kemudian menerima:

```jsx
export default function Navbar({
  currentPage,
  setCurrentPage
}) {
```

Dengan demikian, Navbar dapat mengubah state yang sebenarnya dimiliki oleh `App`.

Konsep ini disebut **lifting state up**.

Secara sederhana:

```text
App
 │
 │ state
 │
 ├── currentPage
 │
 └── setCurrentPage
        │
        ↓
      Navbar
```

Navbar tidak perlu memiliki state sendiri untuk mengetahui halaman aktif.

State utama tetap berada di `App`.

## Menentukan Menu Aktif

Project juga menggunakan state untuk memberikan informasi kepada user tentang halaman yang sedang aktif.

Contohnya:

```jsx
className={
  currentPage === item.id
    ? 'active'
    : undefined
}
```

Jika:

```text
currentPage = "products"
```

dan:

```text
item.id = "products"
```

maka kondisi:

```jsx
currentPage === item.id
```

bernilai:

```text
true
```

sehingga class:

```text
active
```

diterapkan.

Dengan demikian menu Products dapat diberikan styling khusus.

## Dynamic Page Tanpa Refresh

Salah satu keuntungan pendekatan ini adalah perubahan component terjadi di dalam aplikasi React.

Misalnya user melakukan:

```text
Home → Products
```

React tidak perlu memuat ulang seluruh halaman browser.

Yang berubah adalah UI yang dirender berdasarkan state.

Konsep seperti ini merupakan salah satu dasar dari aplikasi React.

Namun perlu dipahami bahwa **tidak adanya refresh browser bukan berarti aplikasi sudah menggunakan routing**.

Pada project ini URL tetap sama karena navigasi hanya mengubah state.

## Kekurangan Pendekatan State-Based Page

Pendekatan ini sangat baik untuk belajar React, tetapi memiliki beberapa keterbatasan.

### URL Tidak Berubah

Ketika membuka Products, URL tetap:

```text
/
```

Bukan:

```text
/products
```

Akibatnya user tidak dapat menggunakan URL sebagai representasi halaman.

### Browser Back dan Forward Tidak Bekerja sebagai Navigasi Page

Karena perubahan halaman tidak mengubah history browser, tombol:

```text
Back
Forward
```

tidak otomatis bekerja seperti navigasi website biasa.

### Tidak Cocok untuk Aplikasi Besar

Jika aplikasi memiliki puluhan atau ratusan halaman, mengelola semuanya dengan:

```jsx
switch (currentPage)
```

akan menjadi sulit dipelihara.

### Tidak Mendukung Dynamic URL Secara Native

Misalnya kita ingin membuat:

```text
/products/1
/products/2
/products/3
```

pendekatan state sederhana membutuhkan mekanisme tambahan.

Untuk kebutuhan seperti itu, routing library lebih sesuai.

## Kapan Menggunakan Pendekatan Ini?

Dynamic page menggunakan state cocok untuk:

- Belajar fundamental React
- Prototype sederhana
- Aplikasi dengan sedikit halaman
- Dashboard sederhana
- UI dengan beberapa view
- Memahami state dan re-render
- Memahami props dan component composition

Contohnya:

```text
Dashboard
 ├── Overview
 ├── Statistics
 ├── Users
 └── Settings
```

Jika semua view hanya membutuhkan perubahan state lokal dan tidak membutuhkan URL berbeda, pendekatan seperti ini dapat digunakan.

## Kapan Menggunakan React Router?

Jika aplikasi membutuhkan URL seperti:

```text
/
 /about
 /products
 /products/1
 /products/2
 /contact
```

maka lebih baik menggunakan routing.

React Router menyediakan konsep route dan dynamic segment. Misalnya:

```jsx
<Route
  path="/products/:productId"
  element={<Product />}
/>
```

Kemudian component dapat mengambil parameter:

```jsx
const { productId } = useParams()
```

Misalnya user membuka:

```text
/products/10
```

maka:

```jsx
productId
```

akan memiliki nilai:

```text
10
```

Pendekatan ini lebih cocok untuk aplikasi yang membutuhkan navigasi berbasis URL.

## Pengembangan Lebih Lanjut

Project `demo-dynamic-page-react` dapat dikembangkan secara bertahap.

Beberapa pengembangan yang dapat dilakukan adalah:

### Menambahkan React Router

Ubah:

```text
Home
Products
About
Contact
```

menjadi route:

```text
/
 /products
 /about
 /contact
```

### Membuat Detail Produk

Tambahkan:

```text
/products/:id
```

Sehingga setiap produk memiliki halaman detail.

Contoh:

```text
/products/1
/products/2
/products/3
```

### Mengambil Data dari API

Daripada menggunakan array lokal:

```jsx
const products = [...]
```

data dapat diambil dari REST API.

Contohnya:

```text
React
   ↓
fetch()
   ↓
REST API
   ↓
JSON
   ↓
Products Component
```

### Menambahkan Loading State

Ketika data sedang diambil:

```jsx
if (loading) {
  return <p>Loading...</p>
}
```

### Menambahkan Error Handling

Jika API gagal:

```jsx
if (error) {
  return <p>Terjadi kesalahan.</p>
}
```

Dengan demikian project sederhana ini dapat berkembang menjadi aplikasi React yang lebih realistis.

## Kesimpulan

Dynamic page merupakan konsep penting yang dapat digunakan untuk memahami bagaimana React mengubah tampilan berdasarkan state.

Pada project ini, state:

```jsx
const [currentPage, setCurrentPage] =
  useState('home')
```

digunakan untuk menentukan halaman yang sedang ditampilkan.

Kemudian:

```jsx
switch (currentPage)
```

digunakan untuk menentukan component yang harus dirender.

Konsep utamanya dapat diringkas sebagai berikut:

```text
State
  ↓
currentPage
  ↓
renderPage()
  ↓
switch()
  ↓
Component
  ↓
UI
```

Ketika user mengklik menu:

```text
Navbar
   ↓
setCurrentPage()
   ↓
State berubah
   ↓
React re-render
   ↓
Halaman berubah
```

Pendekatan ini sangat baik sebagai latihan untuk memahami beberapa fundamental React sekaligus, yaitu:

- `useState`
- Component
- Props
- Event handling
- Conditional rendering
- `map()`
- Component reusability
- State management sederhana

Namun, pendekatan ini berbeda dengan **routing**. Jika aplikasi membutuhkan URL berbeda untuk setiap halaman, browser history, deep linking, atau dynamic URL seperti `/products/:id`, maka penggunaan React Router atau solusi routing lainnya lebih tepat.

Dengan memahami pendekatan sederhana berbasis `useState` terlebih dahulu, kita akan lebih mudah memahami bagaimana routing bekerja pada aplikasi React yang lebih kompleks.

## Source

* Code: https://gitlab.com/topekox/demo-dynamic-page-react
* Live Demo: https://demo-dynamic-page-react.vercel.app/
