---
sidebar_position: 11
title: "Props Lanjutan"
---

Selain cara dasar mengirim Props, React juga mendukung beberapa sintaks alternatif yang dapat membuat kode menjadi lebih fleksibel dan ringkas.

Pada materi ini kita akan membahas:

- **Single Prop Object**
- **Rest Property (`...`)**
- **Default Prop Values**

---

## 1. Mengirim Satu Objek sebagai Prop

Jika data sudah tersedia dalam bentuk Object, kita dapat mengirimkan seluruh Object tersebut sebagai **satu Prop**.

Misalnya terdapat data:

```javascript
const concept = {
  title: "Components",
  description: "The core UI building block.",
  image: componentsImg
};
```

Kita dapat mengirim Object tersebut menggunakan satu Prop:

```jsx
<CoreConcept concept={concept} />
```

Atau jika menggunakan Array:

```jsx
<CoreConcept concept={CORE_CONCEPTS[0]} />
```

Dengan cara ini, kita tidak perlu mengirimkan setiap property secara terpisah.

---

## 2. Menerima Single Prop Object

Di dalam Component, kita dapat menerima Prop tersebut menggunakan destructuring:

```jsx
function CoreConcept({ concept }) {
  return (
    <li>
      <img
        src={concept.image}
        alt={concept.title}
      />

      <h3>{concept.title}</h3>

      <p>{concept.description}</p>
    </li>
  );
}
```

Prop:

```jsx
concept={concept}
```

akan menghasilkan Object yang dapat diakses melalui:

```javascript
concept.title
concept.description
concept.image
```

---

## 3. Destructuring Object di Dalam Component

Kita juga dapat melakukan destructuring terhadap Object `concept`.

```jsx
function CoreConcept({ concept }) {
  const {
    title,
    description,
    image
  } = concept;

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

Dengan cara ini, kita tidak perlu menulis:

```javascript
concept.title
concept.description
concept.image
```

berulang kali.

---

## 4. Kapan Menggunakan Single Prop Object?

Pendekatan ini sangat berguna ketika data sudah berbentuk Object.

Misalnya data dari API:

```javascript
const product = {
  id: 1,
  name: "Laptop",
  price: 10000000,
  category: "Computer"
};
```

Daripada mengirim:

```jsx
<Product
  id={product.id}
  name={product.name}
  price={product.price}
  category={product.category}
/>
```

kita dapat mengirim seluruh Object:

```jsx
<Product product={product} />
```

Kemudian Component:

```jsx
function Product({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <p>{product.category}</p>
    </div>
  );
}
```

Pendekatan ini dapat membuat hubungan antara data dan Component lebih jelas.

---

## 5. Mengelompokkan Props dengan Rest Property

JavaScript juga menyediakan **Rest Property (`...`)** yang dapat digunakan saat melakukan destructuring Object.

Misalnya Component menerima beberapa Props:

```jsx
<CoreConcept
  title="Components"
  description="The core UI building block."
  image={componentsImg}
/>
```

Kita dapat menerima semua Props tersebut sebagai satu Object:

```jsx
function CoreConcept({ ...concept }) {
  return (
    <li>
      <img
        src={concept.image}
        alt={concept.title}
      />

      <h3>{concept.title}</h3>

      <p>{concept.description}</p>
    </li>
  );
}
```

Rest Property:

```javascript
...concept
```

mengumpulkan seluruh property yang tersisa menjadi Object bernama `concept`.

---

## 6. Memahami Rest Property

Misalnya kita memiliki:

```javascript
const user = {
  name: "Budi",
  age: 30,
  city: "Palu"
};
```

Kita dapat melakukan:

```javascript
const {
  name,
  ...details
} = user;
```

Hasilnya:

```javascript
name
```

berisi:

```text
Budi
```

Sedangkan:

```javascript
details
```

berisi:

```javascript
{
  age: 30,
  city: "Palu"
}
```

Rest Property digunakan untuk **mengumpulkan property yang tersisa**.

---

## 7. Rest Property pada Props

Konsep yang sama dapat digunakan pada React Component.

```jsx
function Product({ title, ...details }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{details.price}</p>
      <p>{details.category}</p>
    </div>
  );
}
```

Jika digunakan:

```jsx
<Product
  title="Laptop"
  price={10000000}
  category="Computer"
/>
```

maka secara konsep:

```javascript
title = "Laptop";

details = {
  price: 10000000,
  category: "Computer"
};
```

---

## 8. Perbedaan Spread dan Rest

Operator yang digunakan terlihat sama:

```javascript
...
```

Namun, fungsinya bergantung pada konteks penggunaannya.

### Spread Operator

Spread digunakan untuk **menyebarkan** isi Array atau Object.

Contoh:

```jsx
<Product {...product} />
```

Artinya property dari `product` disebarkan menjadi Props.

### Rest Property

Rest digunakan untuk **mengumpulkan** property yang tersisa.

Contoh:

```jsx
function Product({ title, ...details }) {
  // ...
}
```

Artinya semua property selain `title` dikumpulkan ke dalam `details`.

Secara sederhana:

```text
Spread
Object
  │
  ├── title
  ├── price
  └── category
       ↓
   Menyebarkan
       ↓
    Props

Rest
Props
  │
  ├── title
  ├── price
  └── category
       ↓
   Mengumpulkan
       ↓
    Object
```

---

## 9. Default Value pada Props

Terkadang sebuah Prop bersifat opsional.

Misalnya sebuah `Button` memiliki Prop:

```jsx
type
```

Kita ingin memberikan nilai default jika `type` tidak dikirimkan.

Kita dapat menggunakan **default value** pada destructuring.

```jsx
function Button({
  caption,
  type = "submit"
}) {
  return (
    <button type={type}>
      {caption}
    </button>
  );
}
```

Jika `type` diberikan:

```jsx
<Button
  type="button"
  caption="Click Me"
/>
```

maka:

```text
type = "button"
```

Jika `type` tidak diberikan:

```jsx
<Button caption="Click Me" />
```

maka React menggunakan:

```text
type = "submit"
```

---

## 10. Contoh Default Props

```jsx
function Button({
  caption,
  type = "submit"
}) {
  return (
    <button type={type}>
      {caption}
    </button>
  );
}
```

Penggunaan pertama:

```jsx
<Button
  caption="Save"
  type="submit"
/>
```

Hasil:

```html
<button type="submit">
  Save
</button>
```

Penggunaan kedua:

```jsx
<Button caption="Save" />
```

Karena `type` tidak diberikan, nilai default digunakan:

```text
submit
```

---

## 11. Default Value Hanya Digunakan Jika Nilai `undefined`

Default value akan digunakan ketika Prop tidak diberikan atau nilainya `undefined`.

Contoh:

```jsx
function User({
  name = "Guest"
}) {
  return <h2>Hello {name}</h2>;
}
```

Jika:

```jsx
<User />
```

maka:

```text
Hello Guest
```

Jika:

```jsx
<User name="Budi" />
```

maka:

```text
Hello Budi
```

---

## 12. Contoh Lengkap

Berikut contoh Component yang menggunakan beberapa konsep sekaligus:

```jsx
function Product({
  name = "Unknown Product",
  price = 0,
  ...details
}) {
  return (
    <div>
      <h2>{name}</h2>

      <p>
        Harga: Rp{price}
      </p>

      <p>
        Kategori: {details.category}
      </p>
    </div>
  );
}
```

Kemudian:

```jsx
<Product
  name="Laptop"
  price={10000000}
  category="Computer"
/>
```

Secara konsep:

```javascript
name = "Laptop";

price = 10000000;

details = {
  category: "Computer"
};
```

---

## 13. Memilih Sintaks yang Tepat

Tidak ada satu sintaks yang selalu paling baik. Pilihan tergantung pada bentuk data dan kebutuhan Component.

### Gunakan Single Prop Object

Jika data sudah berupa Object:

```jsx
<Product product={product} />
```

Cocok untuk data seperti:

```javascript
const product = {
  name: "Laptop",
  price: 10000000
};
```

### Gunakan Spread Props

Jika seluruh property Object memang ingin diteruskan:

```jsx
<Product {...product} />
```

### Gunakan Rest Property

Jika ingin mengambil beberapa Props secara langsung dan mengumpulkan sisanya:

```jsx
function Product({
  name,
  ...details
}) {
  // ...
}
```

### Gunakan Default Value

Jika terdapat Prop opsional:

```jsx
function Button({
  type = "submit"
}) {
  // ...
}
```

---

## 14. Poin Penting

Beberapa hal yang perlu diingat:

- Object dapat dikirim sebagai **satu Prop**.
- Single Prop Object cocok ketika data sudah terstruktur dalam Object.
- **Rest Property (`...`)** dapat mengumpulkan Props yang tersisa menjadi satu Object.
- **Spread Operator (`...`)** digunakan untuk menyebarkan isi Object menjadi Props.
- Meskipun menggunakan simbol yang sama, Spread dan Rest memiliki fungsi yang berbeda berdasarkan konteks.
- Default value dapat diberikan melalui destructuring.
- Default value digunakan ketika nilai Prop adalah `undefined`.
- Teknik-teknik ini membantu membuat Component lebih fleksibel dan reusable.

---

## Kesimpulan

React menyediakan beberapa sintaks alternatif untuk mengelola Props.

Single Object:

```jsx
<Product product={product} />
```

Spread Props:

```jsx
<Product {...product} />
```

Rest Property:

```jsx
function Product({
  name,
  ...details
}) {
  // ...
}
```

Default Value:

```jsx
function Button({
  type = "submit"
}) {
  // ...
}
```

Dengan memahami **Single Prop Object, Spread, Rest Property, dan Default Value**, kita dapat memilih cara yang paling sesuai untuk mengirim dan mengelola data antar Component dalam aplikasi React.
