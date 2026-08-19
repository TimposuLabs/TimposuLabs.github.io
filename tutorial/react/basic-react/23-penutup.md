---
sidebar_position: 23
title: "Penutup"
---

## Kesimpulan: React Dasar

Pada modul **React Dasar**, kita telah mempelajari konsep-konsep dasar yang menjadi fondasi dalam pengembangan aplikasi React.

Konsep-konsep ini akan terus digunakan ketika mempelajari fitur React yang lebih lanjut, seperti form, HTTP request, routing, state management, dan berbagai library React lainnya.

---

## 1. Components & JSX

### Components

**Component** adalah blok pembangun utama (*building block*) dalam aplikasi React.

Pada dasarnya, component merupakan fungsi JavaScript yang menghasilkan UI.

Contoh:

```jsx
function Header() {
  return <header>React Essentials</header>;
}
```

### Aturan Penamaan Component

Nama component harus diawali dengan **huruf kapital**.

```jsx
function Header() {
  // ...
}
```

Penamaan dengan huruf kapital membantu React membedakan component buatan pengguna dari elemen HTML bawaan.

Contoh penggunaan:

```jsx
<Header />
```

Sedangkan elemen HTML menggunakan huruf kecil:

```jsx
<header></header>
<div></div>
<button></button>
```

---

## 2. JSX

**JSX** adalah sintaks yang memungkinkan kita menulis struktur UI yang menyerupai HTML di dalam kode JavaScript.

Contoh:

```jsx
function App() {
  return (
    <main>
      <h1>Hello React</h1>
      <p>Belajar React Essentials</p>
    </main>
  );
}
```

JSX bukan HTML biasa. JSX akan diproses oleh *build tools* menjadi JavaScript yang dapat dijalankan oleh browser.

---

## 3. Props

**Props** (*properties*) digunakan untuk mengirimkan data dari component parent ke component child.

Contohnya:

```jsx
function User({ name }) {
  return <h2>Hello, {name}</h2>;
}
```

Component tersebut dapat digunakan dengan memberikan prop:

```jsx
<User name="Budi" />
<User name="Andi" />
```

Dengan props, satu component dapat digunakan kembali dengan data yang berbeda.

---

## 4. Destructuring Props

Props sebenarnya diterima sebagai sebuah object.

Tanpa destructuring:

```jsx
function User(props) {
  return <h2>Hello, {props.name}</h2>;
}
```

Dengan destructuring:

```jsx
function User({ name }) {
  return <h2>Hello, {name}</h2>;
}
```

Destructuring membuat kode lebih ringkas dan menunjukkan dengan jelas data apa saja yang digunakan oleh component.

---

## 5. Special Prop `children`

React menyediakan prop khusus bernama `children`.

Prop ini berisi konten yang ditempatkan di antara tag pembuka dan penutup sebuah component.

Contoh:

```jsx
<TabButton>Components</TabButton>
```

Component dapat menerima konten tersebut melalui `children`:

```jsx
function TabButton({ children }) {
  return <button>{children}</button>;
}
```

`children` dapat berupa teks maupun JSX yang lebih kompleks.

Contoh:

```jsx
<Card>
  <h2>Judul</h2>
  <p>Isi card</p>
</Card>
```

---

## 6. Component Composition

**Component Composition** adalah teknik menyusun component dengan menempatkan component lain di dalamnya.

Contohnya:

```jsx
function App() {
  return (
    <main>
      <Header />
      <Content />
      <Footer />
    </main>
  );
}
```

Dengan composition, aplikasi dapat dibagi menjadi component-component kecil yang lebih mudah digunakan kembali dan dipelihara.

---

## 7. Event Handling

React menyediakan event props untuk menangani interaksi pengguna.

Beberapa event yang umum digunakan:

```text
onClick
onChange
onSubmit
onMouseEnter
```

Contoh:

```jsx
function Button() {
  function handleClick() {
    console.log("Button diklik");
  }

  return (
    <button onClick={handleClick}>
      Klik Saya
    </button>
  );
}
```

Perhatikan bahwa fungsi diberikan tanpa tanda kurung:

```jsx
onClick={handleClick}
```

Bukan:

```jsx
onClick={handleClick()}
```

Karena `handleClick()` akan langsung menjalankan fungsi saat component dirender.

---

## 8. Passing Functions melalui Props

Fungsi juga dapat dikirimkan sebagai nilai melalui props.

Parent component:

```jsx
function App() {
  function handleSelect() {
    console.log("Item dipilih");
  }

  return (
    <TabButton onSelect={handleSelect}>
      Components
    </TabButton>
  );
}
```

Child component:

```jsx
function TabButton({ children, onSelect }) {
  return (
    <button onClick={onSelect}>
      {children}
    </button>
  );
}
```

Pola ini memungkinkan child component memicu fungsi yang didefinisikan oleh parent.

Secara sederhana:

```text
Parent
  │
  │ function melalui props
  ↓
Child
  │
  │ event
  ↓
Function dijalankan
```

---

## 9. State

Props digunakan untuk menerima data dari parent, sedangkan **state** digunakan untuk menyimpan data yang dapat berubah selama component digunakan.

Variabel JavaScript biasa tidak cukup untuk memperbarui UI.

Contoh yang tidak tepat:

```jsx
let selectedTopic = "components";

function handleSelect() {
  selectedTopic = "jsx";
}
```

Perubahan variabel tersebut tidak otomatis membuat React merender ulang UI.

Untuk data yang memengaruhi tampilan, gunakan state.

---

## 10. Hook `useState`

React menyediakan Hook `useState` untuk membuat dan mengelola state.

Import:

```jsx
import { useState } from "react";
```

Kemudian:

```jsx
const [selectedTopic, setSelectedTopic] = useState("components");
```

`useState()` menghasilkan dua nilai:

```text
selectedTopic
    ↓
Nilai state saat ini

setSelectedTopic
    ↓
Fungsi untuk memperbarui state
```

Contoh:

```jsx
function App() {
  const [selectedTopic, setSelectedTopic] = useState("components");

  function handleSelect() {
    setSelectedTopic("jsx");
  }

  return (
    <div>
      <p>{selectedTopic}</p>

      <button onClick={handleSelect}>
        Select JSX
      </button>
    </div>
  );
}
```

---

## 11. Re-render

Ketika fungsi updater state dipanggil:

```jsx
setSelectedTopic("jsx");
```

React akan menjadwalkan pembaruan state dan melakukan **re-render** component yang terkait.

Secara sederhana:

```text
User melakukan aksi
        ↓
Event handler dijalankan
        ↓
setState dipanggil
        ↓
React melakukan re-render
        ↓
Component dievaluasi kembali
        ↓
UI diperbarui
```

Inilah salah satu konsep fundamental React.

---

## 12. Conditional Rendering

**Conditional Rendering** digunakan ketika UI yang ditampilkan bergantung pada kondisi tertentu.

React dapat menggunakan berbagai pendekatan JavaScript untuk melakukan conditional rendering.

### Menggunakan `if`

```jsx
let content = <p>Silakan pilih topik.</p>;

if (selectedTopic) {
  content = <p>Topik telah dipilih.</p>;
}
```

Kemudian:

```jsx
return (
  <div>
    {content}
  </div>
);
```

---

## 13. Conditional Rendering dengan Ternary Operator

Ternary operator cocok ketika hanya terdapat dua kemungkinan tampilan.

```jsx
return (
  <div>
    {selectedTopic ? (
      <p>Topik dipilih.</p>
    ) : (
      <p>Silakan pilih topik.</p>
    )}
  </div>
);
```

Strukturnya:

```text
condition ? nilaiJikaTrue : nilaiJikaFalse
```

---

## 14. Conditional Rendering dengan `&&`

Operator `&&` dapat digunakan ketika sebuah elemen hanya perlu ditampilkan jika kondisi bernilai `true`.

```jsx
return (
  <div>
    {!selectedTopic && (
      <p>Silakan pilih topik.</p>
    )}

    {selectedTopic && (
      <p>Topik telah dipilih.</p>
    )}
  </div>
);
```

Pendekatan ini sangat umum digunakan untuk menampilkan atau menyembunyikan bagian tertentu dari UI.

---

## 15. Dynamic Lists

React sering digunakan untuk menampilkan data dalam bentuk list.

Misalnya:

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

Daripada menulis setiap item secara manual, gunakan `map()`.

```jsx
<ul>
  {products.map((product) => (
    <li key={product.id}>
      {product.name}
    </li>
  ))}
</ul>
```

Jika jumlah data berubah, jumlah elemen UI yang dihasilkan juga akan mengikuti data tersebut.

---

## 16. `key` pada Dynamic Lists

Ketika merender list menggunakan `map()`, setiap item harus memiliki `key` yang unik dan stabil.

Contoh:

```jsx
{products.map((product) => (
  <li key={product.id}>
    {product.name}
  </li>
))}
```

`key` membantu React mengidentifikasi setiap item dalam list ketika terjadi perubahan.

Sebaiknya gunakan identifier unik dari data, misalnya:

```jsx
key={product.id}
```

Hindari menggunakan nilai acak seperti:

```jsx
key={Math.random()}
```

karena nilainya dapat berubah setiap kali component dirender.

---

## 17. Hubungan Antar-Konsep React Essentials

Konsep-konsep yang telah dipelajari saling berhubungan.

Contohnya:

```text
Component
    ↓
Props
    ↓
Event
    ↓
State
    ↓
Re-render
    ↓
Conditional Rendering
    ↓
Dynamic List
```

Dalam aplikasi nyata, beberapa konsep tersebut biasanya digunakan secara bersamaan.

Misalnya aplikasi tab:

```text
User klik tombol
       ↓
onClick
       ↓
handleSelect()
       ↓
setSelectedTopic()
       ↓
State berubah
       ↓
Component re-render
       ↓
Konten berubah
       ↓
CSS active berubah
```

---

## 18. Contoh Sederhana React Dasar

Berikut contoh yang menggabungkan beberapa konsep dasar:

```jsx
import { useState } from "react";

const topics = [
  {
    id: "components",
    title: "Components",
    description: "Building blocks of React applications.",
  },
  {
    id: "jsx",
    title: "JSX",
    description: "A syntax extension for JavaScript.",
  },
  {
    id: "props",
    title: "Props",
    description: "Used to pass data between components.",
  },
];

function TabButton({ children, onSelect, isSelected }) {
  return (
    <button
      className={isSelected ? "active" : ""}
      onClick={onSelect}
    >
      {children}
    </button>
  );
}

function App() {
  const [selectedTopic, setSelectedTopic] = useState("components");

  function handleSelect(topicId) {
    setSelectedTopic(topicId);
  }

  const selectedData = topics.find(
    (topic) => topic.id === selectedTopic
  );

  return (
    <main>
      <menu>
        {topics.map((topic) => (
          <TabButton
            key={topic.id}
            isSelected={selectedTopic === topic.id}
            onSelect={() => handleSelect(topic.id)}
          >
            {topic.title}
          </TabButton>
        ))}
      </menu>

      {selectedData && (
        <section>
          <h2>{selectedData.title}</h2>
          <p>{selectedData.description}</p>
        </section>
      )}
    </main>
  );
}

export default App;
```

Pada contoh tersebut terdapat beberapa konsep sekaligus:

- **Component** melalui `App` dan `TabButton`.
- **JSX** untuk mendefinisikan UI.
- **Props** untuk mengirim data ke `TabButton`.
- **`children`** untuk menampilkan teks tombol.
- **Event handling** melalui `onClick`.
- **Passing function** melalui `onSelect`.
- **State** menggunakan `useState`.
- **Re-render** ketika state berubah.
- **Conditional rendering** menggunakan `&&`.
- **Dynamic list** menggunakan `map()`.
- **`key`** untuk mengidentifikasi item list.
- **Dynamic styling** menggunakan `className`.

---

## 19. Ringkasan React Essentials

| Konsep | Fungsi |
|---|---|
| **Component** | Membagi UI menjadi bagian-bagian yang dapat digunakan kembali |
| **JSX** | Menulis struktur UI menggunakan sintaks JavaScript |
| **Props** | Mengirim data dari parent ke child |
| **`children`** | Menerima konten di antara tag component |
| **Event** | Menangani interaksi pengguna |
| **Passing Functions** | Mengirim fungsi melalui props |
| **State** | Menyimpan data yang dapat berubah dan memengaruhi UI |
| **`useState`** | Hook untuk membuat state |
| **Re-render** | Mengevaluasi kembali component ketika state berubah |
| **Conditional Rendering** | Menampilkan UI berdasarkan kondisi |
| **`map()`** | Menghasilkan UI secara dinamis dari array |
| **`key`** | Membantu React mengidentifikasi item dalam list |

---

## Kesimpulan

**React Essentials** memberikan fondasi yang diperlukan untuk mulai membangun aplikasi React.

Konsep yang paling penting untuk dikuasai adalah:

1. **Components** untuk membangun UI.
2. **JSX** untuk mendefinisikan struktur UI.
3. **Props** untuk mengirim data.
4. **Events** untuk merespons interaksi pengguna.
5. **State** untuk mengelola data yang berubah.
6. **Hooks** seperti `useState` untuk mengelola state.
7. **Conditional Rendering** untuk menampilkan UI berdasarkan kondisi.
8. **`map()` dan `key`** untuk menampilkan data dalam bentuk list.

Setelah memahami konsep-konsep tersebut, Anda sudah memiliki dasar yang kuat untuk melanjutkan ke materi React yang lebih lanjut.