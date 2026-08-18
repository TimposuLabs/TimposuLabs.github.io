---
sidebar_position: 10
title: "Sintaks Alternatif Props"
---

## Sintaks Alternatif Props dan Destructuring Data di React

Setelah memahami konsep dasar Props, kita dapat menggunakan beberapa teknik untuk membuat kode React menjadi lebih **ringkas, bersih, dan mudah dipelihara**.

Dua teknik yang sering digunakan adalah:

- Menggunakan data dari Array atau Object yang berada di file terpisah.
- Menggunakan **Spread Operator (`...`)** untuk meneruskan Props.
- Menggunakan **Object Destructuring** pada parameter Component.

---

## 1. Menggunakan Data dari File Eksternal

Dalam aplikasi nyata, data biasanya tidak ditulis langsung di dalam Component.

Misalnya kita memiliki file:

```text
src/
├── App.jsx
├── data.js
└── components/
    └── CoreConcept.jsx
```

Data dapat disimpan di `data.js`.

Contoh:

```javascript
export const CORE_CONCEPTS = [
  {
    title: "Components",
    description: "The core UI building block.",
    image: "components.png"
  },
  {
    title: "Props",
    description: "Make components reusable.",
    image: "props.png"
  },
  {
    title: "State",
    description: "Manage changing data.",
    image: "state.png"
  }
];
```

Kemudian data tersebut dapat digunakan di `App.jsx`.

---

## 2. Mengimpor Data dengan Named Export

Karena `CORE_CONCEPTS` menggunakan Named Export:

```javascript
export const CORE_CONCEPTS = [...];
```

kita dapat mengimpornya menggunakan `{}`:

```javascript
import { CORE_CONCEPTS } from "./data.js";
```

Kemudian data dapat diakses berdasarkan indeks:

```javascript
CORE_CONCEPTS[0]
```

```javascript
CORE_CONCEPTS[1]
```

```javascript
CORE_CONCEPTS[2]
```

---

## 3. Mengakses Property Object Secara Manual

Misalnya kita ingin mengirim data pertama ke `CoreConcept`.

Kita dapat menulis:

```jsx
<CoreConcept
  title={CORE_CONCEPTS[0].title}
  description={CORE_CONCEPTS[0].description}
  image={CORE_CONCEPTS[0].image}
/>
```

Data:

```javascript
CORE_CONCEPTS[0]
```

merupakan Object:

```javascript
{
  title: "Components",
  description: "The core UI building block.",
  image: "components.png"
}
```

Sehingga kita mengambil masing-masing property menggunakan:

```javascript
CORE_CONCEPTS[0].title
CORE_CONCEPTS[0].description
CORE_CONCEPTS[0].image
```

---

## 4. Masalah dengan Penulisan Manual

Jika component memiliki banyak Props, penulisan seperti ini dapat menjadi cukup panjang:

```jsx
<CoreConcept
  title={CORE_CONCEPTS[0].title}
  description={CORE_CONCEPTS[0].description}
  image={CORE_CONCEPTS[0].image}
/>
```

Jika terdapat banyak data:

```jsx
<CoreConcept
  title={CORE_CONCEPTS[0].title}
  description={CORE_CONCEPTS[0].description}
  image={CORE_CONCEPTS[0].image}
/>

<CoreConcept
  title={CORE_CONCEPTS[1].title}
  description={CORE_CONCEPTS[1].description}
  image={CORE_CONCEPTS[1].image}
/>

<CoreConcept
  title={CORE_CONCEPTS[2].title}
  description={CORE_CONCEPTS[2].description}
  image={CORE_CONCEPTS[2].image}
/>
```

Kode menjadi repetitif.

Kita dapat membuatnya lebih ringkas menggunakan **Spread Operator**.

---

## 5. Menggunakan Spread Operator pada Props

Jika nama property pada Object sama dengan nama Props yang dibutuhkan component, kita dapat menggunakan Spread Operator:

```jsx
<CoreConcept {...CORE_CONCEPTS[0]} />
```

Kode tersebut akan menyebarkan seluruh property Object menjadi Props.

Misalnya:

```javascript
CORE_CONCEPTS[0]
```

berisi:

```javascript
{
  title: "Components",
  description: "The core UI building block.",
  image: "components.png"
}
```

Maka:

```jsx
<CoreConcept {...CORE_CONCEPTS[0]} />
```

secara konsep setara dengan:

```jsx
<CoreConcept
  title={CORE_CONCEPTS[0].title}
  description={CORE_CONCEPTS[0].description}
  image={CORE_CONCEPTS[0].image}
/>
```

---

## 6. Contoh Menggunakan Spread Operator

Kita dapat menulis:

```jsx
<CoreConcept {...CORE_CONCEPTS[0]} />
<CoreConcept {...CORE_CONCEPTS[1]} />
<CoreConcept {...CORE_CONCEPTS[2]} />
```

Kode menjadi jauh lebih ringkas.

---

## 7. Bagaimana Spread Operator Bekerja?

Misalnya Object:

```javascript
const product = {
  title: "Laptop",
  price: 10000000,
  category: "Computer"
};
```

Tanpa Spread Operator:

```jsx
<Product
  title={product.title}
  price={product.price}
  category={product.category}
/>
```

Dengan Spread Operator:

```jsx
<Product {...product} />
```

Secara konsep, React menerima:

```jsx
<Product
  title="Laptop"
  price={10000000}
  category="Computer"
/>
```

Jadi Spread Operator membantu menyebarkan pasangan **key-value** Object menjadi Props.

---

## 8. Syarat Menggunakan Spread Props

Spread Operator sangat berguna, tetapi sebaiknya digunakan jika nama property Object sesuai dengan nama Props yang dibutuhkan Component.

Misalnya Object:

```javascript
const product = {
  title: "Laptop",
  price: 10000000
};
```

dan Component:

```jsx
function Product({ title, price }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{price}</p>
    </div>
  );
}
```

Kita dapat menggunakan:

```jsx
<Product {...product} />
```

Karena:

```text
Object property     Component prop
-----------------------------------
title        →      title
price        →      price
```

Jika nama property berbeda, kita mungkin perlu melakukan mapping secara manual.

---

## 9. Object Destructuring pada Component

Teknik lain yang sangat berguna adalah menggunakan **Object Destructuring** pada parameter Component.

Cara standar menggunakan `props`:

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

Kode tersebut valid, tetapi kita harus menulis:

```text
props.image
props.title
props.description
```

berulang kali.

---

## 10. Menggunakan Destructuring Props

Kita dapat langsung melakukan destructuring pada parameter:

```jsx
function CoreConcept({
  image,
  title,
  description
}) {
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

Sekarang kita dapat langsung menggunakan:

```text
image
title
description
```

tanpa perlu menulis:

```text
props.image
props.title
props.description
```

---

## 11. Bagaimana Destructuring Props Bekerja?

Ketika component dipanggil:

```jsx
<CoreConcept
  title="Components"
  description="The core UI building block."
  image={componentsImg}
/>
```

React menyediakan object Props secara konsep:

```javascript
{
  title: "Components",
  description: "The core UI building block.",
  image: componentsImg
}
```

Kemudian parameter:

```javascript
{
  image,
  title,
  description
}
```

melakukan destructuring terhadap object tersebut.

Hasilnya, kita mendapatkan tiga variabel lokal:

```javascript
image
title
description
```

---

## 12. Destructuring vs `props`

Kedua pendekatan berikut sama-sama valid.

### Menggunakan `props`

```jsx
function Product(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}
```

### Menggunakan Destructuring

```jsx
function Product({ title, description }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
```

Destructuring biasanya membuat component lebih ringkas.

---

## 13. Destructuring Membuat Dependency Component Lebih Jelas

Perhatikan:

```jsx
function Product({
  title,
  price,
  description,
  image
}) {
  // ...
}
```

Dari parameter tersebut, kita langsung dapat mengetahui bahwa component `Product` membutuhkan:

```text
title
price
description
image
```

Hal ini membuat kebutuhan data sebuah component lebih mudah terlihat.

---

## 14. Menggabungkan Data External, Spread, dan Destructuring

Ketiga konsep tersebut dapat digunakan bersama.

### `data.js`

```javascript
export const CORE_CONCEPTS = [
  {
    title: "Components",
    description: "The core UI building block.",
    image: componentsImg
  },
  {
    title: "Props",
    description: "Make components reusable.",
    image: propsImg
  },
  {
    title: "State",
    description: "Manage changing data.",
    image: stateImg
  }
];
```

### `CoreConcept.jsx`

```jsx
function CoreConcept({
  title,
  description,
  image
}) {
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

export default CoreConcept;
```

### `App.jsx`

```jsx
import { CORE_CONCEPTS } from "./data.js";
import CoreConcept from "./CoreConcept.jsx";

function App() {
  return (
    <ul>
      <CoreConcept {...CORE_CONCEPTS[0]} />
      <CoreConcept {...CORE_CONCEPTS[1]} />
      <CoreConcept {...CORE_CONCEPTS[2]} />
    </ul>
  );
}

export default App;
```

Dengan pendekatan tersebut, kode menjadi lebih bersih dan mudah dikembangkan.

---

## 15. Menggunakan `map()` untuk Data yang Banyak

Jika jumlah data semakin banyak, kita tidak perlu menulis component satu per satu.

Kita dapat menggunakan `map()`:

```jsx
<ul>
  {CORE_CONCEPTS.map(concept => (
    <CoreConcept
      key={concept.title}
      {...concept}
    />
  ))}
</ul>
```

Dengan cara ini:

```text
CORE_CONCEPTS
      │
      ▼
    map()
      │
      ├── CoreConcept
      ├── CoreConcept
      └── CoreConcept
```

Setiap Object dalam Array akan digunakan sebagai Props untuk `CoreConcept`.

---

## 16. Mengapa `key` Diperlukan?

Ketika menggunakan `map()` untuk menghasilkan daftar Component, React membutuhkan `key` yang unik.

Contoh:

```jsx
{CORE_CONCEPTS.map(concept => (
  <CoreConcept
    key={concept.title}
    {...concept}
  />
))}
```

`key` membantu React mengidentifikasi setiap item dalam list.

:::tip
Sebaiknya gunakan identifier yang benar-benar unik seperti `id` jika tersedia.
:::

Contoh:

```jsx
{products.map(product => (
  <Product
    key={product.id}
    {...product}
  />
))}
```

---

## 17. Poin Penting

Beberapa konsep utama yang perlu diingat:

### Data External

Data dapat dipisahkan dari Component:

```javascript
import { CORE_CONCEPTS } from "./data.js";
```

### Spread Props

Object dapat langsung diteruskan sebagai Props:

```jsx
<CoreConcept {...CORE_CONCEPTS[0]} />
```

### Object Destructuring

Props dapat langsung di-*destructure* pada parameter:

```jsx
function CoreConcept({
  title,
  description,
  image
}) {
  // ...
}
```

### `map()`

Data Array dapat digunakan untuk menghasilkan banyak Component:

```jsx
{CORE_CONCEPTS.map(concept => (
  <CoreConcept
    key={concept.title}
    {...concept}
  />
))}
```

---

## Kesimpulan

React menyediakan beberapa cara untuk membuat penggunaan Props lebih ringkas dan fleksibel.

Tanpa Spread Operator:

```jsx
<CoreConcept
  title={concept.title}
  description={concept.description}
  image={concept.image}
/>
```

Dengan Spread Operator:

```jsx
<CoreConcept {...concept} />
```

Kemudian di dalam Component, Props dapat digunakan secara langsung dengan destructuring:

```jsx
function CoreConcept({
  title,
  description,
  image
}) {
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}
```

Kombinasi **external data + Spread Operator + Destructuring + `map()`** merupakan pola yang sangat umum dalam aplikasi React karena membuat component menjadi **reusable, ringkas, dan mudah dipelihara**.
