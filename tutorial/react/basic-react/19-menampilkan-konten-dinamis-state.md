---
sidebar_position: 19
title: "Menampilkan Konten Dinamis Berdasarkan State"
---

Dalam aplikasi React, kita sering memiliki beberapa pilihan data yang ditampilkan berdasarkan interaksi pengguna.

Contohnya adalah aplikasi dengan beberapa tab:

```text
Components | JSX | Props | State
```

Ketika pengguna memilih salah satu tab, React akan menampilkan konten yang sesuai.

Konsep ini dapat dibuat dengan menggabungkan:

- State
- Event Handler
- Object JavaScript
- Dynamic Property Access
- JSX

---

## 1. Menyiapkan Data di `data.js`

Sebaiknya data yang akan ditampilkan dipisahkan dari component.

Misalnya buat file:

```text
src/data.js
```

Kemudian buat object `EXAMPLES`:

```javascript
export const EXAMPLES = {
  components: {
    title: "Components",
    description:
      "Components are the building blocks of React applications.",
    code: `
function Welcome() {
  return <h1>Hello, World!</h1>;
}
`,
  },

  jsx: {
    title: "JSX",
    description:
      "JSX is a syntax extension to JavaScript.",
    code: `
const element = <h1>Hello, World!</h1>;
`,
  },

  props: {
    title: "Props",
    description:
      "Props allow you to pass data between components.",
    code: `
function User({ name }) {
  return <h1>Hello {name}</h1>;
}
`,
  },

  state: {
    title: "State",
    description:
      "State allows components to manage changing data.",
    code: `
const [count, setCount] = useState(0);
`,
  },
};
```

Object tersebut memiliki beberapa key:

```text
components
jsx
props
state
```

Masing-masing key memiliki data:

```text
title
description
code
```

---

## 2. Struktur Data `EXAMPLES`

Jika digambarkan secara sederhana:

```text
EXAMPLES
│
├── components
│   ├── title
│   ├── description
│   └── code
│
├── jsx
│   ├── title
│   ├── description
│   └── code
│
├── props
│   ├── title
│   ├── description
│   └── code
│
└── state
    ├── title
    ├── description
    └── code
```

Struktur seperti ini sangat cocok untuk menyimpan data yang memiliki beberapa kategori atau pilihan.

---

## 3. Mengimpor Data ke Component

Di `App.jsx`, import `EXAMPLES`:

```jsx
import { EXAMPLES } from "./data.js";
```

Kemudian `EXAMPLES` dapat digunakan di dalam component.

---

## 4. Menyimpan Pilihan Pengguna dalam State

Kita membutuhkan State untuk menyimpan topik yang sedang dipilih.

```jsx
const [selectedTopic, setSelectedTopic] = useState("components");
```

Pada contoh tersebut:

```text
selectedTopic = "components"
```

Artinya, topic yang sedang dipilih adalah:

```text
components
```

---

## 5. Mengapa Initial State Menggunakan `"components"`?

Perhatikan struktur data:

```javascript
EXAMPLES = {
  components: {},
  jsx: {},
  props: {},
  state: {},
};
```

Karena `"components"` merupakan key yang valid, kita dapat mengakses:

```javascript
EXAMPLES["components"]
```

dan mendapatkan data.

Sebaliknya, jika kita menggunakan:

```jsx
const [selectedTopic, setSelectedTopic] = useState(
  "Please click a button"
);
```

maka:

```javascript
EXAMPLES["Please click a button"]
```

tidak tersedia.

Hasilnya:

```javascript
undefined
```

Jika kemudian kita menulis:

```javascript
EXAMPLES[selectedTopic].title
```

akan terjadi error karena kita mencoba mengakses:

```javascript
undefined.title
```

---

## 6. Dynamic Property Access

JavaScript memungkinkan kita mengakses property object menggunakan nilai dari sebuah variabel.

Misalnya:

```javascript
const selectedTopic = "components";

console.log(EXAMPLES[selectedTopic]);
```

JavaScript akan memperlakukan kode tersebut seperti:

```javascript
EXAMPLES["components"];
```

Kemudian kita dapat mengakses property di dalamnya:

```javascript
EXAMPLES[selectedTopic].title;
```

Hasilnya:

```text
Components
```

---

## 7. Mengapa Menggunakan `[]`?

Ada dua cara umum untuk mengakses property object.

### Dot Notation

```javascript
EXAMPLES.components
```

Cara ini digunakan ketika nama property sudah diketahui secara langsung.

### Bracket Notation

```javascript
EXAMPLES[selectedTopic]
```

Cara ini digunakan ketika nama property berasal dari variabel.

Misalnya:

```javascript
const selectedTopic = "jsx";

EXAMPLES[selectedTopic];
```

JavaScript akan mengakses:

```javascript
EXAMPLES["jsx"];
```

Inilah yang membuat **Bracket Notation** sangat berguna untuk menampilkan data berdasarkan State.

---

## 8. Membuat Event Handler

Selanjutnya, kita membutuhkan function untuk mengubah State ketika pengguna memilih tab.

```jsx
function handleSelect(selectedButton) {
  setSelectedTopic(selectedButton);
}
```

Function tersebut menerima identifier:

```text
components
jsx
props
state
```

Kemudian menyimpannya ke State.

---

## 9. Menghubungkan Button dengan State

Misalnya kita memiliki `TabButton`:

```jsx
<TabButton
  onSelect={() => handleSelect("components")}
>
  Components
</TabButton>
```

Ketika tombol diklik:

```text
User klik Components
        ↓
onSelect
        ↓
handleSelect("components")
        ↓
setSelectedTopic("components")
        ↓
State berubah
        ↓
React melakukan re-render
```

Untuk tab lainnya:

```jsx
<TabButton
  onSelect={() => handleSelect("jsx")}
>
  JSX
</TabButton>
```

```jsx
<TabButton
  onSelect={() => handleSelect("props")}
>
  Props
</TabButton>
```

```jsx
<TabButton
  onSelect={() => handleSelect("state")}
>
  State
</TabButton>
```

---

## 10. Menampilkan Data Berdasarkan State

Setelah State berisi key yang sesuai, kita dapat mengakses data:

```jsx
EXAMPLES[selectedTopic]
```

Kemudian mengambil property tertentu:

```jsx
EXAMPLES[selectedTopic].title
```

```jsx
EXAMPLES[selectedTopic].description
```

```jsx
EXAMPLES[selectedTopic].code
```

Dengan demikian, konten akan berubah sesuai dengan nilai State.

---

## 11. Contoh `App.jsx` Lengkap

Berikut contoh implementasi lengkap:

```jsx
import { useState } from "react";
import { EXAMPLES } from "./data.js";
import TabButton from "./components/TabButton.jsx";

function App() {
  const [selectedTopic, setSelectedTopic] =
    useState("components");

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  return (
    <div>
      <main>
        <section id="examples">
          <h2>Examples</h2>

          <menu>
            <TabButton
              onSelect={() => handleSelect("components")}
            >
              Components
            </TabButton>

            <TabButton
              onSelect={() => handleSelect("jsx")}
            >
              JSX
            </TabButton>

            <TabButton
              onSelect={() => handleSelect("props")}
            >
              Props
            </TabButton>

            <TabButton
              onSelect={() => handleSelect("state")}
            >
              State
            </TabButton>
          </menu>

          <div id="tab-content">
            <h3>{EXAMPLES[selectedTopic].title}</h3>

            <p>
              {EXAMPLES[selectedTopic].description}
            </p>

            <pre>
              <code>
                {EXAMPLES[selectedTopic].code}
              </code>
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
```

---

## 12. Alur Kerja Aplikasi

Ketika aplikasi pertama kali dijalankan:

```text
selectedTopic
      ↓
"components"
      ↓
EXAMPLES["components"]
      ↓
title
description
code
      ↓
Ditampilkan ke UI
```

Ketika pengguna memilih JSX:

```text
User klik JSX
      ↓
handleSelect("jsx")
      ↓
setSelectedTopic("jsx")
      ↓
Re-render
      ↓
EXAMPLES["jsx"]
      ↓
Konten JSX ditampilkan
```

---

## 13. Hubungan State dengan Object

Dalam contoh ini, State tidak menyimpan seluruh data.

State hanya menyimpan **identifier**:

```jsx
const [selectedTopic, setSelectedTopic] =
  useState("components");
```

Data sebenarnya berada di:

```javascript
EXAMPLES
```

Jadi terdapat pemisahan antara:

```text
State
  │
  └── Menentukan data mana yang dipilih

EXAMPLES
  │
  └── Menyimpan data yang akan ditampilkan
```

Pendekatan ini membuat kode lebih terorganisasi.

---

## 14. Mengapa Tidak Menyimpan Semua Data di State?

Kita sebenarnya dapat menyimpan object lengkap di State, tetapi dalam kasus seperti ini kita hanya membutuhkan identifier.

Contohnya:

```text
State:
"components"
```

Kemudian:

```javascript
EXAMPLES[selectedTopic]
```

digunakan untuk mendapatkan data yang sesuai.

Keuntungannya adalah State tetap sederhana dan data utama tetap tersimpan di sumber data.

---

## 15. Pastikan Identifier Sesuai

Identifier yang dikirimkan harus sama dengan key yang terdapat di `EXAMPLES`.

Misalnya data memiliki:

```javascript
export const EXAMPLES = {
  components: {},
  jsx: {},
  props: {},
  state: {},
};
```

Maka gunakan:

```jsx
handleSelect("components");
handleSelect("jsx");
handleSelect("props");
handleSelect("state");
```

Jangan menggunakan:

```jsx
handleSelect("Components");
```

jika key-nya adalah:

```javascript
components
```

Karena JavaScript membedakan huruf besar dan kecil.

```text
components
≠
Components
```

---

## 16. Masalah yang Sering Terjadi

### Key Tidak Ditemukan

Jika:

```javascript
selectedTopic = "javascript";
```

sedangkan tidak ada:

```javascript
EXAMPLES.javascript
```

maka:

```javascript
EXAMPLES[selectedTopic]
```

menghasilkan:

```javascript
undefined
```

---

### Error Saat Mengakses Property

Kode:

```jsx
<h3>
  {EXAMPLES[selectedTopic].title}
</h3>
```

akan error jika:

```javascript
EXAMPLES[selectedTopic]
```

menghasilkan `undefined`.

---

## 17. Menggunakan Conditional Rendering

Salah satu cara menangani kondisi ketika belum ada topic yang dipilih adalah menggunakan conditional rendering.

State dapat dimulai dengan:

```jsx
const [selectedTopic, setSelectedTopic] =
  useState(null);
```

Kemudian:

```jsx
{selectedTopic ? (
  <div id="tab-content">
    <h3>{EXAMPLES[selectedTopic].title}</h3>
    <p>{EXAMPLES[selectedTopic].description}</p>
    <pre>
      <code>{EXAMPLES[selectedTopic].code}</code>
    </pre>
  </div>
) : (
  <p>Please select a topic.</p>
)}
```

Dengan cara ini, aplikasi tidak mencoba mengakses data sebelum topic dipilih.

---

## 18. Pola Data-Driven UI

Contoh ini memperkenalkan konsep penting dalam React yang disebut **data-driven UI**.

Daripada membuat UI berbeda secara manual untuk setiap kondisi, kita menyimpan data dan menggunakan State untuk menentukan data mana yang ditampilkan.

Polanya:

```text
Data
 ↓
State menentukan pilihan
 ↓
JavaScript memilih data
 ↓
JSX menampilkan data
```

Contohnya:

```javascript
EXAMPLES[selectedTopic]
```

---

## 19. State Sebagai Identifier

Dalam pola ini, State berfungsi sebagai identifier.

Misalnya:

```text
selectedTopic = "components"
```

berarti:

```text
Tampilkan data components
```

Jika:

```text
selectedTopic = "jsx"
```

berarti:

```text
Tampilkan data jsx
```

Jika:

```text
selectedTopic = "props"
```

berarti:

```text
Tampilkan data props
```

Dengan demikian, satu State dapat mengontrol bagian UI yang berbeda.

---

## 20. Poin Penting

Beberapa konsep penting yang perlu dipahami:

- Data dapat disimpan dalam object JavaScript.
- State dapat digunakan untuk menyimpan identifier data yang sedang dipilih.
- Bracket notation `[]` memungkinkan property object diakses secara dinamis.
- Contohnya adalah:

```javascript
EXAMPLES[selectedTopic]
```

- Identifier harus sesuai dengan key pada object.
- JavaScript bersifat **case-sensitive**.
- State awal harus memiliki nilai yang valid atau UI harus menangani kondisi ketika belum ada pilihan.
- Perubahan State menyebabkan React melakukan re-render.
- Data dan State dapat dipisahkan agar kode lebih mudah dikelola.
- Pendekatan ini merupakan dasar dari pembuatan **data-driven UI** di React.

---

## Kesimpulan

Menampilkan konten dinamis berdasarkan State dapat dilakukan dengan menggabungkan **State** dan **Object Dynamic Property Access**.

Data disimpan dalam object:

```javascript
const EXAMPLES = {
  components: {
    title: "Components",
    description: "...",
    code: "...",
  },

  jsx: {
    title: "JSX",
    description: "...",
    code: "...",
  },
};
```

State menyimpan pilihan:

```jsx
const [selectedTopic, setSelectedTopic] =
  useState("components");
```

Kemudian data diakses secara dinamis:

```jsx
EXAMPLES[selectedTopic]
```

dan ditampilkan melalui JSX:

```jsx
<h3>{EXAMPLES[selectedTopic].title}</h3>

<p>
  {EXAMPLES[selectedTopic].description}
</p>

<pre>
  <code>{EXAMPLES[selectedTopic].code}</code>
</pre>
```

Alur lengkapnya:

```text
User memilih tab
       ↓
Event Handler
       ↓
Update State
       ↓
selectedTopic berubah
       ↓
EXAMPLES[selectedTopic]
       ↓
Data baru dipilih
       ↓
React melakukan re-render
       ↓
Konten baru ditampilkan
```

Konsep ini menjadi dasar penting untuk membuat **UI React yang dinamis berdasarkan data dan interaksi pengguna**.