---
sidebar_position: 1
title: "React Component"
---

## React Components

**Component** merupakan salah satu konsep paling penting dalam React. Hampir seluruh aplikasi React dibangun menggunakan komponen sebagai **building block** atau blok penyusun antarmuka pengguna.

Dengan menggunakan component, sebuah aplikasi yang kompleks dapat dipecah menjadi bagian-bagian kecil yang lebih mudah dibuat, dipahami, dan dikelola.

---

## Apa Itu Component?

**Component** adalah bagian dari User Interface (UI) yang memiliki kode dan logikanya sendiri.

Sebuah component dapat berisi:

- **HTML/Markup** untuk menentukan struktur UI.
- **CSS** untuk mengatur tampilan.
- **JavaScript** untuk mengatur logika dan perilaku.

Contoh sederhana:

```jsx
function Welcome() {
  return <h1>Selamat Datang!</h1>;
}
```

Pada contoh tersebut, `Welcome` merupakan sebuah React Component.

Component kemudian dapat digunakan di dalam component lain:

```jsx
function App() {
  return (
    <div>
      <Welcome />
    </div>
  );
}
```

---

## Component sebagai Building Block

Aplikasi React biasanya tidak dibuat sebagai satu file besar yang berisi seluruh kode UI.

Sebaliknya, UI dipecah menjadi beberapa component.

Contohnya aplikasi toko online dapat memiliki struktur:

```text
App
├── Header
├── Navigation
├── ProductList
│   ├── Product
│   ├── Product
│   └── Product
├── Cart
└── Footer
```

Setiap component memiliki tanggung jawab tertentu.

Dengan pendekatan ini, aplikasi yang kompleks menjadi lebih mudah dipahami.

---

## Menggabungkan UI dan Logic

Salah satu kelebihan component adalah kita dapat menggabungkan markup dan logic yang berkaitan dalam satu tempat.

Contoh:

```jsx
function Product() {
  const productName = "Laptop";
  const price = 10000000;

  return (
    <div>
      <h2>{productName}</h2>
      <p>Rp{price}</p>
    </div>
  );
}
```

Pada component tersebut:

- JavaScript digunakan untuk menentukan data.
- JSX digunakan untuk menentukan struktur UI.
- Logic dan UI yang berkaitan berada di tempat yang sama.

Pendekatan ini disebut **co-location**, yaitu menempatkan kode yang saling berkaitan secara berdekatan.

---

## Component Bersifat Reusable

Salah satu keuntungan utama React Component adalah **reusability**.

Artinya, sebuah component dapat digunakan berkali-kali tanpa harus menulis ulang kode yang sama.

Misalnya kita membuat component:

```jsx
function Product() {
  return (
    <div>
      <h2>Product</h2>
    </div>
  );
}
```

Component tersebut dapat digunakan beberapa kali:

```jsx
function App() {
  return (
    <div>
      <Product />
      <Product />
      <Product />
    </div>
  );
}
```

Daripada menulis markup yang sama berkali-kali, kita cukup membuat component sekali dan menggunakannya kembali.

---

## Component dengan Data yang Berbeda

Component yang sama dapat digunakan dengan data yang berbeda menggunakan **Props**.

Contoh:

```jsx
function Product({ name }) {
  return <h2>{name}</h2>;
}
```

Kemudian:

```jsx
function App() {
  return (
    <div>
      <Product name="Laptop" />
      <Product name="Keyboard" />
      <Product name="Mouse" />
    </div>
  );
}
```

Component `Product` tetap sama, tetapi data yang ditampilkan berbeda.

Output secara konsep:

```text
Laptop
Keyboard
Mouse
```

Konsep ini membuat component menjadi sangat fleksibel dan reusable.

---

## Mempermudah Maintenance

Component juga membuat aplikasi lebih mudah dipelihara (**maintainable**).

Misalnya sebuah aplikasi memiliki tombol yang digunakan di banyak tempat.

Daripada menulis kode tombol berkali-kali, kita dapat membuat satu component:

```jsx
function Button({ children }) {
  return (
    <button className="button">
      {children}
    </button>
  );
}
```

Kemudian digunakan di berbagai tempat:

```jsx
<Button>Login</Button>

<Button>Register</Button>

<Button>Submit</Button>
```

Jika desain tombol perlu diubah, kita cukup mengubah component `Button`.

```jsx
function Button({ children }) {
  return (
    <button className="new-button">
      {children}
    </button>
  );
}
```

Semua penggunaan component tersebut akan mendapatkan perubahan.

---

## Co-location

React mendorong kita untuk menempatkan kode yang saling berkaitan secara berdekatan.

Contohnya:

```text
Product/
├── Product.jsx
├── Product.css
└── Product.test.js
```

Kode yang berhubungan dengan `Product` berada dalam satu tempat.

Hal ini dapat membantu:

- Memahami struktur aplikasi.
- Menemukan kode dengan lebih cepat.
- Mengurangi ketergantungan antar file yang tidak berkaitan.
- Mempermudah maintenance.

---

## Separation of Concerns

Component juga membantu menerapkan prinsip **Separation of Concerns**, yaitu memisahkan bagian aplikasi berdasarkan tanggung jawabnya.

Misalnya sebuah aplikasi memiliki:

```text
Header
Navigation
ProductList
Product
Cart
Footer
```

Setiap component memiliki tanggung jawab yang berbeda.

Contoh:

### `Header`

Bertanggung jawab menampilkan bagian header.

```jsx
function Header() {
  return <header>My Store</header>;
}
```

### `Navigation`

Menangani navigasi aplikasi.

```jsx
function Navigation() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/products">Products</a>
    </nav>
  );
}
```

### `ProductList`

Bertanggung jawab menampilkan daftar produk.

```jsx
function ProductList({ products }) {
  return (
    <div>
      {products.map(product => (
        <Product
          key={product.id}
          {...product}
        />
      ))}
    </div>
  );
}
```

Dengan pembagian tersebut, setiap bagian aplikasi memiliki tanggung jawab yang lebih jelas.

---

## Component Membantu Kolaborasi Tim

Dalam proyek yang dikerjakan oleh banyak developer, pembagian UI menjadi component juga mempermudah kolaborasi.

Misalnya:

```text
Developer A → Header
Developer B → ProductList
Developer C → Cart
Developer D → Checkout
```

Setiap developer dapat fokus mengembangkan bagian tertentu tanpa harus bekerja pada satu file besar yang sama.

---

## Component Tidak Hanya Ada di React

Konsep **component-based development** bukan hanya digunakan oleh React.

Pendekatan yang sama juga dapat ditemukan pada berbagai teknologi lain, seperti:

- React
- Angular
- Vue
- Svelte
- Flutter

Meskipun sintaks dan implementasinya berbeda, tujuan utamanya sama:

> *Membagi aplikasi menjadi bagian-bagian kecil yang dapat digunakan kembali dan dikelola secara independen.*

---

## Struktur Component Sederhana

Contoh aplikasi React sederhana:

```text
App
├── Header
├── Main
│   ├── ProductList
│   │   ├── Product
│   │   ├── Product
│   │   └── Product
│   └── Cart
└── Footer
```

Setiap bagian dapat dibuat sebagai component tersendiri.

Contoh:

```jsx
function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
```

---

## Poin Penting

Beberapa konsep utama yang perlu diingat:

### Component adalah Building Block

Component merupakan blok penyusun utama aplikasi React.

### Component Menggabungkan UI dan Logic

Markup, styling, dan logic yang berkaitan dapat dikelompokkan dalam component.

### Component Reusable

Component dapat digunakan berkali-kali dengan data yang berbeda.

### Component Mempermudah Maintenance

Perubahan dapat dilakukan pada component terkait tanpa harus mengubah banyak bagian aplikasi.

### Component Memisahkan Tanggung Jawab

Setiap component dapat memiliki tugas tertentu sehingga struktur aplikasi lebih jelas.

---

## Kesimpulan

**Component adalah fondasi utama dalam React.**

Dengan menggunakan component, kita dapat:

- Memecah UI yang kompleks menjadi bagian-bagian kecil.
- Menggabungkan markup dan logic yang berkaitan.
- Menggunakan kembali kode.
- Mempermudah maintenance.
- Menerapkan Separation of Concerns.
- Mempermudah kolaborasi dalam tim.

Karena itu, memahami **Component** merupakan langkah pertama yang sangat penting sebelum mempelajari konsep React lainnya seperti **JSX, Props, State, Event Handling, dan Hooks**.
