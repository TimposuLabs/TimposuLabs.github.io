---
sidebar_position: 14
title: "Component Composition"
---

## Component Composition dan Prop `children`

Dalam React, sebuah component tidak hanya dapat menerima data melalui atribut atau Props. Component juga dapat menerima **konten yang ditempatkan di antara tag pembuka dan penutupnya**.

Konsep ini disebut **Component Composition** dan salah satu fitur yang mendukungnya adalah prop khusus `children`.

---

## 1. Memahami Component Composition

Component Composition adalah teknik menyusun component dengan cara menempatkan component atau konten lain di dalam sebuah component.

Contohnya:

```jsx
<TabButton>Components</TabButton>
```

Pada contoh tersebut, `Components` berada di antara:

```jsx
<TabButton>
```

dan:

```jsx
</TabButton>
```

React akan menyediakan konten tersebut melalui prop khusus bernama `children`.

---

## 2. Apa Itu Prop `children`?

`children` adalah prop khusus yang secara otomatis diberikan React kepada sebuah component ketika component tersebut digunakan dengan konten di antara tag pembuka dan penutup.

Contoh:

```jsx
<TabButton>Components</TabButton>
```

React akan meneruskan:

```text
children = "Components"
```

ke component `TabButton`.

Dengan demikian, kita dapat mengambilnya menggunakan destructuring:

```jsx
function TabButton({ children }) {
  // ...
}
```

---

## 3. Menggunakan `children` pada Component

Misalnya kita memiliki component `TabButton`.

File:

```text
src/components/TabButton.jsx
```

Kita dapat membuatnya seperti berikut:

```jsx
export default function TabButton({ children }) {
  return (
    <li>
      <button>{children}</button>
    </li>
  );
}
```

Prop `children` kemudian ditampilkan di dalam `<button>`:

```jsx
<button>{children}</button>
```

---

## 4. Menggunakan Component dengan `children`

Di `App.jsx`, component dapat digunakan seperti berikut:

```jsx
import TabButton from "./components/TabButton.jsx";

function App() {
  return (
    <main>
      <section id="examples">
        <h2>Examples</h2>

        <menu>
          <TabButton>Components</TabButton>
          <TabButton>JSX</TabButton>
          <TabButton>Props</TabButton>
          <TabButton>State</TabButton>
        </menu>
      </section>
    </main>
  );
}

export default App;
```

Setiap teks yang berada di antara tag `<TabButton>` akan menjadi nilai `children`.

Contohnya:

```jsx
<TabButton>Components</TabButton>
```

menghasilkan:

```text
children = "Components"
```

Sedangkan:

```jsx
<TabButton>JSX</TabButton>
```

menghasilkan:

```text
children = "JSX"
```

---

## 5. `children` Tidak Hanya Berisi Teks

Salah satu kelebihan `children` adalah isinya tidak terbatas pada string.

`children` juga dapat berupa elemen JSX atau component lain.

Contoh:

```jsx
<TabButton>
  <strong>Components</strong>
</TabButton>
```

Maka `children` berisi:

```jsx
<strong>Components</strong>
```

Component `TabButton` tetap dapat merendernya:

```jsx
export default function TabButton({ children }) {
  return (
    <li>
      <button>{children}</button>
    </li>
  );
}
```

Hasilnya, elemen `<strong>` akan dirender di dalam `<button>`.

---

## 6. `children` Membuat Component Lebih Fleksibel

Tanpa `children`, kita mungkin membuat component seperti:

```jsx
function TabButton({ label }) {
  return (
    <li>
      <button>{label}</button>
    </li>
  );
}
```

Penggunaannya:

```jsx
<TabButton label="Components" />
```

Pendekatan ini cocok jika component hanya membutuhkan sebuah nilai tertentu.

Namun, dengan `children`:

```jsx
function TabButton({ children }) {
  return (
    <li>
      <button>{children}</button>
    </li>
  );
}
```

kita dapat menulis:

```jsx
<TabButton>Components</TabButton>
```

atau:

```jsx
<TabButton>
  <strong>Components</strong>
</TabButton>
```

Sehingga component menjadi lebih fleksibel terhadap konten yang diterima.

---

## 7. `children` sebagai Composition

Konsep ini disebut **Component Composition** karena sebuah component dapat menerima dan menampilkan component atau konten lain di dalamnya.

Contoh sederhana:

```jsx
<Card>
  <h2>Product</h2>
  <p>Product description</p>
</Card>
```

Component `Card` dapat dibuat:

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
```

Dengan demikian, `Card` tidak perlu mengetahui secara spesifik konten apa yang akan berada di dalamnya.

---

## 8. Contoh Composition yang Lebih Kompleks

`children` dapat berisi beberapa elemen sekaligus.

```jsx
<Card>
  <h2>Laptop</h2>
  <p>High performance laptop.</p>

  <button>
    Buy Now
  </button>
</Card>
```

Component:

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
```

Semua elemen yang berada di dalam `<Card>` akan diterima sebagai `children`.

---

## 9. `children` vs Props Biasa

Ada dua pendekatan yang umum digunakan untuk memberikan konten kepada component.

### Menggunakan Prop Biasa

```jsx
<TabButton label="Components" />
```

Component:

```jsx
function TabButton({ label }) {
  return (
    <button>
      {label}
    </button>
  );
}
```

### Menggunakan `children`

```jsx
<TabButton>
  Components
</TabButton>
```

Component:

```jsx
function TabButton({ children }) {
  return (
    <button>
      {children}
    </button>
  );
}
```

Keduanya valid. Perbedaannya terletak pada cara component dirancang dan jenis data yang ingin diterima.

---

## 10. Kapan Menggunakan `children`?

`children` sangat cocok ketika component berfungsi sebagai **wrapper** atau container.

Contohnya:

```jsx
<Card>
  <h2>Title</h2>
  <p>Description</p>
</Card>
```

```jsx
<Modal>
  <h2>Confirmation</h2>
  <p>Are you sure?</p>
</Modal>
```

```jsx
<Panel>
  <UserProfile />
</Panel>
```

Dalam kasus seperti ini, component pembungkus tidak perlu mengetahui secara detail konten yang akan ditempatkan di dalamnya.

---

## 11. Kapan Menggunakan Prop Biasa?

Prop biasa lebih cocok jika component membutuhkan data atau konfigurasi tertentu.

Contohnya:

```jsx
<CoreConcept
  title="Components"
  description="The core UI building block."
  image={componentsImg}
/>
```

Component `CoreConcept` memang membutuhkan property tertentu:

```text
title
description
image
```

Karena itu, menggunakan Props biasa lebih jelas.

---

## 12. Perbandingan `children` dan Prop Biasa

| Pendekatan | Contoh | Cocok Digunakan Ketika |
| --- | --- | --- |
| `children` | `<Card>Content</Card>` | Component bertindak sebagai wrapper |
| Prop biasa | `<Button label="Save" />` | Component membutuhkan data tertentu |
| `children` | `<Modal><Form /></Modal>` | Konten di dalam component dapat bervariasi |
| Prop biasa | `<User name="Budi" />` | Component membutuhkan konfigurasi tertentu |

---

## 13. `children` dengan Destructuring

Karena `children` merupakan bagian dari object Props, kita dapat mengambilnya menggunakan destructuring.

Cara langsung:

```jsx
function Card({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}
```

Alternatifnya, kita dapat menerima seluruh object Props:

```jsx
function Card(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}
```

Keduanya menghasilkan perilaku yang sama.

---

## 14. `children` Bersama Props Lain

`children` juga dapat digunakan bersama Props lainnya.

Contoh:

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>

      <div>
        {children}
      </div>
    </div>
  );
}
```

Penggunaannya:

```jsx
<Card title="Product">
  <p>Laptop dengan performa tinggi.</p>
  <button>Buy Now</button>
</Card>
```

Di sini:

```text
title
```

merupakan Prop biasa, sedangkan:

```text
children
```

berisi seluruh konten di dalam `<Card>`.

---

## 15. Hal Penting yang Perlu Diingat

Beberapa poin penting mengenai `children`:

- `children` merupakan prop khusus yang disediakan React.
- `children` berisi konten di antara tag pembuka dan penutup component.
- `children` dapat berupa teks.
- `children` dapat berupa elemen JSX.
- `children` dapat berupa component lain.
- `children` sangat berguna untuk membuat component yang reusable.
- Component wrapper atau container sering menggunakan `children`.
- Prop biasa lebih cocok untuk data atau konfigurasi tertentu.

---

## Kesimpulan

**Component Composition** memungkinkan kita menyusun component dengan memasukkan konten atau component lain ke dalamnya.

Dengan prop `children`:

```jsx
<TabButton>
  Components
</TabButton>
```

konten:

```text
Components
```

dapat diterima oleh component:

```jsx
function TabButton({ children }) {
  return (
    <button>
      {children}
    </button>
  );
}
```

Konsep ini membuat component menjadi lebih **fleksibel, reusable, dan mudah dikomposisikan**.

Secara sederhana:

```text
Parent Component
       │
       │ children
       ▼
┌─────────────────┐
│ Wrapper         │
│                 │
│   Children      │
│                 │
└─────────────────┘
```

Gunakan `children` ketika component berfungsi sebagai **wrapper** dan konten di dalamnya dapat berubah-ubah. Gunakan Props biasa ketika component membutuhkan **data atau konfigurasi tertentu**.
