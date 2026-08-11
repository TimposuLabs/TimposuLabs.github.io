---
sidebar_position: 9
title: "Props"
---

## Props dalam React

**Props** atau *Properties* merupakan salah satu konsep dasar dan penting dalam React. Props digunakan untuk **mengirimkan data dari parent component ke child component**.

Dengan Props, sebuah component dapat menerima data dari luar sehingga component tersebut menjadi lebih **dinamis** dan **reusable**.

Konsep Props memiliki kemiripan dengan parameter pada function JavaScript.

---

## Apa Itu Props?

Props adalah data yang dikirimkan dari sebuah component ke component lainnya.

Contoh sederhana:

```jsx
function Welcome(props) {
  return <h1>Hello {props.name}!</h1>;
}
```

Kemudian component tersebut digunakan:

```jsx
<Welcome name="Budi" />
```

React akan mengirimkan:

```javascript
{
  name: "Budi"
}
```

sebagai Props ke component `Welcome`.

Hasilnya:

```text
Hello Budi!
```

---

## Props dan Parameter Function

Konsep Props dapat lebih mudah dipahami jika dibandingkan dengan parameter function JavaScript.

Function biasa:

```javascript
function greet(name) {
  return `Hello ${name}!`;
}

greet("Budi");
```

React Component:

```jsx
function Welcome(props) {
  return <h1>Hello {props.name}!</h1>;
}

<Welcome name="Budi" />
```

Perbedaannya adalah pada React, nilai dikirim melalui **attribute JSX** dan diterima oleh component melalui object `props`.

---

## Mengapa Membutuhkan Props?

Props memiliki beberapa manfaat penting dalam pengembangan aplikasi React.

### Reusability

Props memungkinkan satu component digunakan berkali-kali dengan data yang berbeda.

Misalnya:

```jsx
<Product
  title="Laptop"
  price={10000000}
/>

<Product
  title="Mouse"
  price={250000}
/>

<Product
  title="Keyboard"
  price={750000}
/>
```

Kita hanya membutuhkan satu component:

```jsx
function Product(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>Rp{props.price}</p>
    </div>
  );
}
```

Component `Product` dapat digunakan untuk berbagai produk.

---

## Komponensialisasi

Props membantu kita memisahkan UI menjadi component-component kecil.

Contohnya:

```text
App
├── Header
├── ProductList
│   ├── Product
│   ├── Product
│   └── Product
└── Footer
```

`Product` dapat menerima data dari `ProductList` melalui Props.

Dengan cara ini, setiap component dapat memiliki tanggung jawab yang lebih jelas.

---

## Membuat Component yang Menerima Props

Untuk menerima Props, component dapat menerima parameter pada function.

Contoh:

```jsx
function CoreConcept(props) {
  return (
    <li>
      <img
        src={props.image}
        alt={props.title}
      />

      <h3>{props.title}</h3>

      <p>{props.description}</p>
    </li>
  );
}
```

Parameter:

```javascript
props
```

merupakan object yang berisi seluruh data yang dikirimkan ke component tersebut.

---

## Mengirim Props ke Component

Props dikirimkan melalui attribute pada saat component digunakan.

Contoh:

```jsx
<CoreConcept
  title="Components"
  description="The core UI building block."
  image={componentsImg}
/>
```

Pada contoh tersebut, terdapat tiga Props:

```text
title
description
image
```

Secara konsep, React akan menyediakan object:

```javascript
{
  title: "Components",
  description: "The core UI building block.",
  image: componentsImg
}
```

kepada component `CoreConcept`.

---

## Mengakses Props

Props dapat diakses menggunakan dot notation.

Contoh:

```jsx
function CoreConcept(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}
```

Jika dipanggil:

```jsx
<CoreConcept
  title="Components"
  description="Reusable UI building blocks."
/>
```

maka:

```jsx
props.title
```

berisi:

```text
Components
```

dan:

```jsx
props.description
```

berisi:

```text
Reusable UI building blocks.
```

---

## Contoh Lengkap Props

Berikut contoh sederhana component `CoreConcept`.

```jsx
function CoreConcept(props) {
  return (
    <li>
      <img
        src={props.image}
        alt={props.title}
      />

      <h3>{props.title}</h3>

      <p>{props.description}</p>
    </li>
  );
}
```

Kemudian digunakan di `App.jsx`:

```jsx
import componentsImg from "./assets/components.png";

function App() {
  return (
    <main>
      <section id="core-concepts">
        <h2>Core Concepts</h2>

        <ul>
          <CoreConcept
            title="Components"
            description="The core UI building block."
            image={componentsImg}
          />

          <CoreConcept
            title="Props"
            description="Make components reusable by passing data into them."
            image={componentsImg}
          />
        </ul>
      </section>
    </main>
  );
}
```

Component yang sama:

```jsx
<CoreConcept />
```

digunakan beberapa kali dengan data yang berbeda.

---

## Props Dapat Berisi Berbagai Tipe Data

Props tidak hanya dapat digunakan untuk mengirimkan string.

Kita dapat mengirimkan berbagai tipe data JavaScript.

### String

```jsx
<User name="Budi" />
```

### Number

Gunakan `{}`:

```jsx
<User age={30} />
```

### Boolean

```jsx
<User isAdmin={true} />
```

atau bentuk singkat:

```jsx
<User isAdmin />
```

### Array

```jsx
<User
  hobbies={["Coding", "Running", "Reading"]}
/>
```

### Object

```jsx
<User
  address={{
    city: "Palu",
    country: "Indonesia"
  }}
/>
```

### Function

Props juga dapat berisi function:

```jsx
<Button
  onClick={handleClick}
/>
```

Konsep ini sangat penting dalam React karena memungkinkan parent component memberikan **data maupun behavior** kepada child component.

---

## Mengirim Nilai Dinamis

Jika nilai berasal dari variabel JavaScript, gunakan `{}`.

Contoh:

```jsx
const title = "React";
const price = 100000;

<Product
  title={title}
  price={price}
/>
```

Sedangkan jika nilainya berupa string statis, tanda kutip dapat digunakan:

```jsx
<Product
  title="React"
  price={100000}
/>
```

Perhatikan bahwa angka:

```jsx
price={100000}
```

merupakan nilai `number`, sedangkan:

```jsx
price="100000"
```

merupakan `string`.

---

## Props dengan Gambar

Props juga dapat digunakan untuk mengirim gambar.

Misalnya:

```jsx
import componentsImg from "./assets/components.png";
```

Kemudian:

```jsx
<CoreConcept
  title="Components"
  description="The core UI building block."
  image={componentsImg}
/>
```

Di dalam component:

```jsx
function CoreConcept(props) {
  return (
    <img
      src={props.image}
      alt={props.title}
    />
  );
}
```

Karena `componentsImg` merupakan variabel JavaScript, kita menggunakan:

```jsx
image={componentsImg}
```

bukan:

```jsx
image="componentsImg"
```

---

## Nama Prop Harus Sesuai

Nama Props yang dikirim harus sesuai dengan nama property yang digunakan di dalam component.

Contoh:

```jsx
<Product title="Laptop" />
```

maka di dalam component:

```jsx
function Product(props) {
  return <h2>{props.title}</h2>;
}
```

akan menghasilkan:

```text
Laptop
```

Jika kita menggunakan:

```jsx
props.name
```

sementara prop yang dikirim adalah:

```jsx
title="Laptop"
```

maka:

```jsx
props.name
```

akan menghasilkan:

```text
undefined
```

---

## Destructuring Props

Selain menggunakan:

```jsx
props.title
props.description
props.image
```

kita juga dapat menggunakan **Object Destructuring**.

Contoh:

```jsx
function CoreConcept({ title, description, image }) {
  return (
    <li>
      <img
        src={image}
        alt={title}
      />

      <h3>{title}</h3>

      <p>{description}</p>
    </li>
  );
}
```

Cara ini lebih ringkas dan sangat umum digunakan dalam React modern.

Perhatikan perbedaannya.

### Menggunakan `props`

```jsx
function Product(props) {
  return (
    <h2>{props.title}</h2>
  );
}
```

### Menggunakan Destructuring

```jsx
function Product({ title }) {
  return (
    <h2>{title}</h2>
  );
}
```

Keduanya valid.

---

## Props Bersifat Read-Only

Props sebaiknya dianggap sebagai data **read-only**.

Child component tidak seharusnya mengubah nilai Props yang diterimanya.

Contoh:

```jsx
function Product(props) {
  // Jangan melakukan:
  // props.title = "New Title";

  return <h2>{props.title}</h2>;
}
```

Jika data perlu diubah selama aplikasi berjalan, biasanya kita menggunakan **State**.

Konsep sederhananya:

```text
Props
  │
  ▼
Data dari Parent
  │
  ▼
Child Component
```

Sedangkan State digunakan ketika component perlu mengelola data yang dapat berubah.

---

## One-Way Data Flow

React menggunakan pola **one-way data flow**.

Data biasanya mengalir dari:

```text
Parent
   │
   │ Props
   ▼
Child
```

Contoh:

```jsx
function App() {
  const userName = "Budi";

  return (
    <User name={userName} />
  );
}
```

Kemudian:

```jsx
function User({ name }) {
  return <h2>Hello {name}</h2>;
}
```

Data mengalir dari `App` ke `User`.

---

## Props untuk Membuat Component Reusable

Misalnya kita membuat component:

```jsx
function Button({ text }) {
  return (
    <button>
      {text}
    </button>
  );
}
```

Component tersebut dapat digunakan berkali-kali:

```jsx
<Button text="Login" />

<Button text="Register" />

<Button text="Submit" />
```

Kita tidak perlu membuat tiga component berbeda.

Cukup satu component:

```text
Button
```

dengan data yang berbeda melalui Props.

---

## Props sebagai Parameter Component

Konsep Props dapat diringkas seperti function JavaScript.

Function:

```javascript
function greet(name) {
  return `Hello ${name}`;
}
```

Pemanggilan:

```javascript
greet("Budi");
```

React Component:

```jsx
function Welcome({ name }) {
  return <h1>Hello {name}</h1>;
}
```

Pemanggilan:

```jsx
<Welcome name="Budi" />
```

Perbedaannya hanya pada cara data diberikan, tetapi konsep dasarnya sama: **memberikan input agar menghasilkan output yang dinamis**.

---

## Component Tree dan Props

Props sangat erat kaitannya dengan Component Tree.

Misalnya:

```text
App
 │
 │ name="Budi"
 ▼
User
 │
 │ userId={10}
 ▼
Profile
```

Data dapat diteruskan dari parent ke child melalui Props.

Contoh:

```jsx
function App() {
  return (
    <User
      name="Budi"
      userId={10}
    />
  );
}
```

Kemudian:

```jsx
function User({ name, userId }) {
  return (
    <Profile
      name={name}
      userId={userId}
    />
  );
}
```

---

## Poin Penting

Beberapa hal yang perlu diingat tentang Props:

- Props adalah singkatan dari **Properties**.
- Props digunakan untuk mengirim data dari **parent ke child**.
- Props diterima oleh component sebagai sebuah **object**.
- Props membuat component menjadi **reusable**.
- Props dapat berisi berbagai tipe data.
- Gunakan `{}` untuk mengirim nilai JavaScript dinamis.
- Nama prop harus sesuai dengan property yang digunakan di component.
- Props sebaiknya diperlakukan sebagai **read-only**.
- Data dalam React umumnya mengalir satu arah dari parent ke child.
- Props dapat menggunakan **destructuring** agar kode lebih ringkas.

---

## Kesimpulan

**Props merupakan mekanisme utama untuk mengirim data antar React Component.**

Dengan Props, kita dapat membuat satu component yang reusable dan menggunakannya dengan data yang berbeda.

Konsep sederhananya:

```text
Parent Component
       │
       │ Props
       ▼
Child Component
       │
       ▼
Dynamic UI
```

Contoh:

```jsx
function Product({ title, price }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>Rp{price}</p>
    </div>
  );
}
```

Kemudian:

```jsx
<Product
  title="Laptop"
  price={10000000}
/>

<Product
  title="Mouse"
  price={250000}
/>
```

Satu component dapat digunakan untuk berbagai data.

Setelah memahami Props, konsep berikutnya yang penting dipelajari adalah **State**, yaitu mekanisme React untuk menyimpan dan mengelola data yang dapat berubah selama aplikasi berjalan.
