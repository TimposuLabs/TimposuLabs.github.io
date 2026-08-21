---
sidebar_position: 22
title: "Menampilkan List Data Secara Dinamis"
---

Dalam aplikasi React, kita sering memiliki data dalam bentuk **array** yang perlu ditampilkan sebagai daftar komponen.

Daripada menulis setiap komponen secara manual, React memungkinkan kita membuat **dynamic list rendering** menggunakan method JavaScript `map()`.

Contohnya:

```text
Data Array
    ↓
map()
    ↓
Component JSX
    ↓
List ditampilkan
```

Pendekatan ini membuat kode lebih singkat, fleksibel, dan mudah dikelola.

---

## 1. Masalah dengan Penulisan Manual

Misalnya kita memiliki data:

```javascript
const CORE_CONCEPTS = [
  {
    title: "Components",
    description: "The core UI building blocks.",
    image: componentsImg,
  },
  {
    title: "JSX",
    description: "A syntax extension for JavaScript.",
    image: jsxImg,
  },
  {
    title: "Props",
    description: "Make components reusable.",
    image: propsImg,
  },
];
```

Kita bisa menampilkan setiap data secara manual:

```jsx
<ul>
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
</ul>
```

Cara tersebut memang dapat bekerja, tetapi tidak ideal.

---

## 2. Kekurangan Pendekatan Hardcoded

Penulisan komponen secara manual memiliki beberapa masalah.

### Kode Menjadi Berulang

Kita harus menulis:

```jsx
<CoreConcept />
```

berulang kali.

Jika terdapat 20 data, kita harus menulis 20 component secara manual.

### Tidak Fleksibel

Jika jumlah data berubah, JSX juga harus diubah.

Misalnya data bertambah:

```text
3 data → 4 data
```

kita harus menambahkan component baru secara manual.

Jika data berkurang, component yang sudah tidak memiliki data juga harus dihapus.

---

## 3. Menggunakan `map()`

JavaScript menyediakan method:

```javascript
map()
```

yang dapat digunakan untuk melakukan iterasi sekaligus mentransformasi setiap elemen array menjadi nilai baru.

Misalnya:

```javascript
const numbers = [1, 2, 3];

const doubled = numbers.map((number) => {
  return number * 2;
});
```

Hasilnya:

```javascript
[2, 4, 6]
```

Dalam React, hasil transformasi tersebut dapat berupa JSX.

---

## 4. Mengubah Data Menjadi JSX

Misalnya:

```javascript
const names = ["Budi", "Andi", "Sinta"];
```

Kita dapat mengubah setiap nama menjadi elemen `<li>`:

```jsx
const items = names.map((name) => (
  <li>{name}</li>
));
```

Kemudian:

```jsx
<ul>
  {items}
</ul>
```

React akan menampilkan:

```text
Budi
Andi
Sinta
```

---

## 5. Menampilkan Component dengan `map()`

Untuk data `CORE_CONCEPTS`, kita dapat menggunakan:

```jsx
<ul>
  {CORE_CONCEPTS.map((conceptItem) => (
    <CoreConcept
      title={conceptItem.title}
      description={conceptItem.description}
      image={conceptItem.image}
    />
  ))}
</ul>
```

Method `map()` akan menjalankan callback untuk setiap item dalam array.

Jika terdapat:

```text
3 data
```

maka callback akan dijalankan:

```text
3 kali
```

Jika terdapat:

```text
10 data
```

maka callback akan dijalankan:

```text
10 kali
```

---

## 6. Menggunakan Spread Operator

Jika nama property pada object sama dengan nama prop yang diterima component, kita dapat menggunakan **Spread Operator**.

Contohnya:

```jsx
<CoreConcept
  title={conceptItem.title}
  description={conceptItem.description}
  image={conceptItem.image}
/>
```

dapat disederhanakan menjadi:

```jsx
<CoreConcept {...conceptItem} />
```

Misalnya:

```javascript
conceptItem = {
  title: "Components",
  description: "The core UI building blocks.",
  image: componentsImg,
};
```

maka:

```jsx
<CoreConcept {...conceptItem} />
```

secara konsep akan meneruskan:

```jsx
<CoreConcept
  title="Components"
  description="The core UI building blocks."
  image={componentsImg}
/>
```

---

## 7. Mengapa Membutuhkan `key`?

Saat menggunakan `map()` untuk merender list, React membutuhkan prop khusus:

```jsx
key
```

Contohnya:

```jsx
<CoreConcept
  key={conceptItem.title}
  {...conceptItem}
/>
```

`key` membantu React mengidentifikasi setiap item dalam list.

---

## 8. Fungsi `key` di React

Bayangkan sebuah list:

```text
Components
JSX
Props
State
```

Kemudian salah satu item dihapus.

Tanpa identitas yang jelas, React akan lebih sulit menentukan perubahan yang terjadi pada list.

Dengan:

```jsx
key={conceptItem.title}
```

setiap item memiliki identitas:

```text
Components → "Components"
JSX        → "JSX"
Props      → "Props"
State      → "State"
```

React dapat menggunakan identitas tersebut untuk membantu menentukan perubahan pada list secara efisien.

---

## 9. `key` Harus Unik

Nilai `key` sebaiknya **unik di antara item dalam list yang sama**.

Contohnya, jika setiap data memiliki `id` unik:

```javascript
const users = [
  {
    id: 1,
    name: "Budi",
  },
  {
    id: 2,
    name: "Andi",
  },
];
```

Gunakan:

```jsx
{users.map((user) => (
  <User
    key={user.id}
    name={user.name}
  />
))}
```

Penggunaan `id` unik biasanya merupakan pilihan yang baik.

---

## 10. Hindari `key` yang Tidak Stabil

Hindari menggunakan nilai yang dapat berubah atau tidak unik sebagai `key`.

Misalnya:

```jsx
key={Math.random()}
```

Penggunaan seperti ini tidak baik karena nilainya berubah setiap render.

Jika tersedia, gunakan identifier yang stabil:

```jsx
key={item.id}
```

---

## 11. Apakah `key` Bisa Menggunakan Index?

JavaScript menyediakan index pada callback `map()`:

```jsx
items.map((item, index) => ...)
```

Sehingga secara teknis kita dapat menulis:

```jsx
items.map((item, index) => (
  <Item key={index} />
))
```

Namun, penggunaan index sebagai `key` sebaiknya dihindari jika list dapat berubah urutan, ditambah, atau dihapus.

Lebih baik menggunakan identifier unik dari data:

```jsx
key={item.id}
```

---

## 12. `key` Bukan Prop Biasa

`key` memiliki perlakuan khusus di React.

Misalnya:

```jsx
<CoreConcept
  key={conceptItem.id}
  {...conceptItem}
/>
```

`key` digunakan oleh React untuk mengidentifikasi item dalam list.

`key` tidak otomatis tersedia sebagai:

```jsx
function CoreConcept({ key }) {
  // ...
}
```

Jika component membutuhkan identifier tersebut, kirimkan sebagai prop terpisah:

```jsx
<CoreConcept
  key={conceptItem.id}
  id={conceptItem.id}
  {...conceptItem}
/>
```

Kemudian:

```jsx
function CoreConcept({ id }) {
  // ...
}
```

---

## 13. Contoh Lengkap

Misalnya kita memiliki data:

```javascript
const CORE_CONCEPTS = [
  {
    id: "components",
    title: "Components",
    description: "The core UI building blocks.",
    image: componentsImg,
  },
  {
    id: "jsx",
    title: "JSX",
    description: "A syntax extension for JavaScript.",
    image: jsxImg,
  },
  {
    id: "props",
    title: "Props",
    description: "Make components reusable.",
    image: propsImg,
  },
];
```

Kemudian kita dapat merendernya secara dinamis:

```jsx
function App() {
  return (
    <section id="core-concepts">
      <h2>Core Concepts</h2>

      <ul>
        {CORE_CONCEPTS.map((conceptItem) => (
          <CoreConcept
            key={conceptItem.id}
            {...conceptItem}
          />
        ))}
      </ul>
    </section>
  );
}
```

---

## 14. Bagaimana `map()` Bekerja?

Misalnya array berisi:

```javascript
const CORE_CONCEPTS = [
  {
    id: "components",
    title: "Components",
  },
  {
    id: "jsx",
    title: "JSX",
  },
  {
    id: "props",
    title: "Props",
  },
];
```

Ketika kita menulis:

```jsx
CORE_CONCEPTS.map((conceptItem) => (
  <CoreConcept
    key={conceptItem.id}
    {...conceptItem}
  />
))
```

callback akan dijalankan untuk setiap item:

```text
Item 1
  ↓
<CoreConcept />

Item 2
  ↓
<CoreConcept />

Item 3
  ↓
<CoreConcept />
```

Hasil akhirnya adalah kumpulan JSX yang kemudian dirender React.

---

## 15. Keuntungan Dynamic List Rendering

Menggunakan `map()` memberikan beberapa keuntungan.

### Lebih Ringkas

Tidak perlu menulis component secara berulang:

```jsx
<CoreConcept />
<CoreConcept />
<CoreConcept />
```

Cukup:

```jsx
CORE_CONCEPTS.map(...)
```

### Lebih Fleksibel

Jika jumlah data berubah, UI akan mengikuti jumlah data tersebut secara otomatis.

```text
3 data → 3 component
5 data → 5 component
10 data → 10 component
```

### Mudah Dipelihara

Data dapat dikelola secara terpisah dari struktur UI.

### Cocok untuk Data dari API

Konsep yang sama dapat digunakan ketika data berasal dari API:

```text
API
 ↓
Array Data
 ↓
map()
 ↓
React Components
 ↓
UI
```

---

## 16. Dynamic List dari Data API

Misalnya API mengembalikan:

```javascript
const products = [
  {
    id: 1,
    name: "Laptop",
  },
  {
    id: 2,
    name: "Keyboard",
  },
  {
    id: 3,
    name: "Mouse",
  },
];
```

Kita dapat menampilkan daftar produk:

```jsx
<ul>
  {products.map((product) => (
    <li key={product.id}>
      {product.name}
    </li>
  ))}
</ul>
```

React akan menghasilkan daftar berdasarkan jumlah data yang tersedia.

---

## 17. `map()` Tidak Mengubah Array Asli

Method `map()` menghasilkan array baru.

Contohnya:

```javascript
const numbers = [1, 2, 3];

const doubled = numbers.map(
  (number) => number * 2
);
```

Array asli:

```javascript
numbers
```

tetap:

```text
[1, 2, 3]
```

Sedangkan hasil `map()`:

```javascript
doubled
```

adalah:

```text
[2, 4, 6]
```

Karakteristik ini sangat sesuai dengan prinsip **immutability** yang banyak digunakan dalam React.

---

## 18. Callback `map()`

Callback pada `map()` dapat menerima beberapa parameter.

Parameter pertama adalah item:

```jsx
items.map((item) => ...)
```

Parameter kedua adalah index:

```jsx
items.map((item, index) => ...)
```

Contohnya:

```jsx
items.map((item, index) => (
  <li key={item.id}>
    {index + 1}. {item.name}
  </li>
))
```

Namun, untuk `key`, tetap lebih baik menggunakan identifier unik dari data jika tersedia.

---

## 19. Conditional Rendering pada List

`map()` juga dapat digunakan bersama conditional rendering.

Contohnya:

```jsx
{products.map((product) => (
  product.isAvailable && (
    <li key={product.id}>
      {product.name}
    </li>
  )
))}
```

Hanya produk yang memiliki:

```javascript
isAvailable === true
```

yang akan ditampilkan.

---

## 20. Poin Penting

Beberapa hal yang perlu diingat:

- Gunakan `map()` untuk melakukan iterasi dan mentransformasi data array menjadi JSX.
- Jumlah component yang dihasilkan mengikuti jumlah item dalam array.
- Gunakan `key` ketika merender list.
- `key` harus stabil dan unik di antara item dalam list yang sama.
- Jika tersedia, gunakan `id` unik sebagai `key`.
- Hindari menggunakan `Math.random()` sebagai `key`.
- Hindari penggunaan index sebagai `key` jika list dapat berubah.
- `key` merupakan prop khusus React dan tidak diteruskan sebagai prop biasa ke component.
- Spread operator dapat digunakan jika nama property object sama dengan nama prop component.
- `map()` tidak mengubah array asli.

---

## Kesimpulan

**Dynamic List Rendering** merupakan pola yang sangat sering digunakan dalam aplikasi React.

Daripada menulis component secara manual:

```jsx
<CoreConcept ... />
<CoreConcept ... />
<CoreConcept ... />
```

kita dapat menggunakan:

```jsx
{CORE_CONCEPTS.map((conceptItem) => (
  <CoreConcept
    key={conceptItem.id}
    {...conceptItem}
  />
))}
```

Dengan pola tersebut:

```text
Array Data
    ↓
map()
    ↓
Component JSX
    ↓
key
    ↓
React mengidentifikasi setiap item
    ↓
List ditampilkan
```

Konsep ini menjadi dasar penting ketika bekerja dengan **list data, hasil API, daftar produk, artikel, pengguna, komentar, menu, dan berbagai data lainnya** dalam aplikasi React.