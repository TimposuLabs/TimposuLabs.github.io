---
sidebar_position: 12
title: "Best Practice: File Component"
---

## Praktik Terbaik: Menyimpan Component dalam File dan Struktur Project React

Seiring berkembangnya aplikasi React, jumlah component akan semakin banyak. Menempatkan semua component dalam satu file dapat membuat kode sulit dibaca dan dipelihara.

Karena itu, kita perlu menggunakan struktur file dan folder yang terorganisasi.

---

## 1. Mengapa Component Perlu Dipisahkan ke File Terpisah?

Pada awal membuat aplikasi React, kita mungkin menempatkan semua component di dalam `App.jsx`.

```jsx
function Header() {
  // ...
}

function CoreConcept() {
  // ...
}

function App() {
  // ...
}
```

Untuk aplikasi sederhana, pendekatan tersebut masih dapat digunakan.

Namun, ketika aplikasi semakin besar, `App.jsx` dapat menjadi sangat panjang.

### Masalah yang Dapat Muncul

- File menjadi terlalu besar.
- Sulit menemukan component tertentu.
- Kode sulit dibaca.
- Pemeliharaan menjadi lebih sulit.
- Component sulit digunakan kembali di tempat lain.
- Struktur project menjadi kurang terorganisasi.

### Solusi

Pisahkan component ke dalam file masing-masing.

Contoh:

```text
src/
├── App.jsx
├── main.jsx
├── components/
│   ├── Header.jsx
│   ├── CoreConcept.jsx
│   └── Button.jsx
└── assets/
    └── react-logo.png
```

Dengan struktur tersebut, setiap component memiliki tempat yang jelas.

---

## 2. Membuat Folder `components`

Konvensi yang umum digunakan adalah membuat folder:

```text
src/components/
```

Folder tersebut digunakan untuk menyimpan component React.

Contoh:

```text
src/
└── components/
    ├── Header.jsx
    ├── CoreConcept.jsx
    ├── Product.jsx
    └── Button.jsx
```

Nama folder `components` bukan aturan wajib dari React, tetapi merupakan konvensi yang umum digunakan agar struktur project lebih mudah dipahami.

---

## 3. Penamaan File Component

Sebaiknya nama file mengikuti nama component.

Contoh:

```text
Header.jsx
```

berisi:

```jsx
function Header() {
  // ...
}
```

Contoh lainnya:

```text
CoreConcept.jsx
```

berisi:

```jsx
function CoreConcept() {
  // ...
}
```

Konvensi ini membuat hubungan antara file dan component lebih mudah dikenali.

---

## 4. Satu Component Utama dalam Satu File

Sebagai praktik yang baik, sebuah file biasanya memiliki satu **component utama**.

Contoh:

```text
components/
├── Header.jsx
├── Footer.jsx
├── Product.jsx
└── Button.jsx
```

Masing-masing file memiliki component yang sesuai.

Namun, satu file tidak secara mutlak hanya boleh memiliki satu function. Beberapa helper component yang sangat erat kaitannya masih dapat ditempatkan dalam file yang sama.

Yang terpenting adalah struktur tetap mudah dipahami dan dipelihara.

---

## 5. Membuat File Component Baru

Misalnya kita ingin memindahkan component `Header` dari `App.jsx`.

Buat file:

```text
src/components/Header.jsx
```

Kemudian pindahkan component:

```jsx
function Header() {
  return (
    <header>
      <h1>React Essentials</h1>
    </header>
  );
}
```

Agar component dapat digunakan dari file lain, component tersebut harus diekspor.

---

## 6. Mengekspor Component dengan `export default`

Salah satu cara yang umum digunakan adalah **Default Export**.

```jsx
export default function Header() {
  return (
    <header>
      <h1>React Essentials</h1>
    </header>
  );
}
```

Dengan `export default`, component `Header` dapat digunakan oleh file lain.

---

## 7. Mengimpor Component

Setelah component diekspor, kita dapat mengimpornya di `App.jsx`.

```jsx
import Header from "./components/Header.jsx";
```

Kemudian digunakan sebagai JSX:

```jsx
function App() {
  return (
    <div>
      <Header />

      <main>
        <h2>Welcome to React</h2>
      </main>
    </div>
  );
}
```

---

## 8. Struktur `App.jsx` Setelah Refactoring

Sebelum dipisahkan:

```jsx
function Header() {
  // ...
}

function CoreConcept() {
  // ...
}

function App() {
  // ...
}
```

Setelah dipisahkan:

```jsx
import Header from "./components/Header.jsx";
import CoreConcept from "./components/CoreConcept.jsx";

function App() {
  return (
    <div>
      <Header />

      <main>
        <CoreConcept />
      </main>
    </div>
  );
}

export default App;
```

Sekarang `App.jsx` lebih fokus pada penyusunan aplikasi.

---

## 9. Memahami Relative Path pada `import`

Ketika component dipindahkan ke folder lain, kita harus memperhatikan lokasi file saat menulis path.

Misalnya:

```text
src/
├── App.jsx
├── components/
│   └── Header.jsx
└── assets/
    └── react-core-concepts.png
```

Jika gambar diimpor dari `App.jsx`:

```jsx
import reactImg from "./assets/react-core-concepts.png";
```

Karena `App.jsx` berada langsung di dalam folder `src`.

Namun jika gambar diimpor dari:

```text
src/components/Header.jsx
```

kita perlu naik satu tingkat menggunakan:

```text
../
```

Sehingga:

```jsx
import reactImg from "../assets/react-core-concepts.png";
```

---

## 10. Memahami `./` dan `../`

Relative path sangat penting ketika mengorganisasi file.

### `./`

Berarti folder saat ini.

Contoh:

```jsx
import Header from "./components/Header.jsx";
```

Jika file berada di:

```text
src/App.jsx
```

maka:

```text
./components/
```

mengarah ke:

```text
src/components/
```

### `../`

Berarti naik satu tingkat ke parent directory.

Misalnya:

```text
src/components/Header.jsx
```

dan ingin mengakses:

```text
src/assets/
```

gunakan:

```jsx
import reactImg from "../assets/react-core-concepts.png";
```

Alurnya:

```text
components/
    │
    │ ../
    ▼
src/
    │
    ▼
assets/
```

---

## 11. Contoh Struktur Project React

Struktur sederhana aplikasi React dapat dibuat seperti berikut:

```text
src/
├── assets/
│   ├── react-core-concepts.png
│   └── react-logo.png
│
├── components/
│   ├── Header.jsx
│   ├── CoreConcept.jsx
│   └── Button.jsx
│
├── App.jsx
└── main.jsx
```

Pembagian tanggung jawabnya:

```text
App.jsx
  │
  ├── Header.jsx
  ├── CoreConcept.jsx
  └── Button.jsx
```

`App.jsx` menjadi component yang menyusun component lainnya.

---

## 12. Contoh `Header.jsx`

```jsx
import reactImg from "../assets/react-logo.png";

export default function Header() {
  return (
    <header>
      <img
        src={reactImg}
        alt="React logo"
      />

      <h1>React Essentials</h1>
    </header>
  );
}
```

---

## 13. Contoh `CoreConcept.jsx`

```jsx
export default function CoreConcept({
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
```

---

## 14. Menggunakan Component di `App.jsx`

```jsx
import Header from "./components/Header.jsx";
import CoreConcept from "./components/CoreConcept.jsx";

function App() {
  return (
    <div>
      <Header />

      <main>
        <section>
          <h2>Core Concepts</h2>

          <ul>
            <CoreConcept
              title="Components"
              description="The core UI building block."
              image="/components.png"
            />
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
```

Dengan cara ini, `App.jsx` tidak perlu mengetahui bagaimana `Header` atau `CoreConcept` dibuat secara internal.

`App.jsx` cukup menggunakan component tersebut.

---

## 15. Component sebagai Module

Setelah dipisahkan ke file, setiap component dapat dianggap sebagai sebuah **module**.

Contoh:

```text
Header.jsx
     │
     │ export
     ▼
  App.jsx
     │
     │ import
     ▼
 <Header />
```

Hal ini membuat kode lebih modular.

Setiap file dapat memiliki tanggung jawab tertentu dan dapat digunakan oleh file lainnya.

---

## 16. Proses Refactoring Component

Misalnya awalnya:

```text
src/
└── App.jsx
```

dan di dalamnya terdapat:

```text
App
Header
CoreConcept
Button
```

Setelah dilakukan refactoring:

```text
src/
├── App.jsx
└── components/
    ├── Header.jsx
    ├── CoreConcept.jsx
    └── Button.jsx
```

Alur refactoring:

```text
Satu File
   │
   ▼
Identifikasi Component
   │
   ▼
Pisahkan Component
   │
   ▼
Buat File Baru
   │
   ▼
Export Component
   │
   ▼
Import Component
   │
   ▼
Sesuaikan Relative Path
   │
   ▼
Project Lebih Terorganisasi
```

---

## 17. Kesalahan yang Sering Terjadi

### Lupa Melakukan `export`

Jika file berisi:

```jsx
function Header() {
  return <header>Header</header>;
}
```

tetapi tidak menggunakan:

```jsx
export default Header;
```

component tersebut tidak dapat digunakan sebagai default export.

Cara yang benar:

```jsx
export default function Header() {
  return <header>Header</header>;
}
```

---

### Salah Relative Path

Misalnya:

```text
src/
├── assets/
│   └── logo.png
└── components/
    └── Header.jsx
```

Dari `Header.jsx`, path yang benar adalah:

```jsx
import logo from "../assets/logo.png";
```

bukan:

```jsx
import logo from "./assets/logo.png";
```

---

### Nama Component Diawali Huruf Kecil

Custom component harus menggunakan nama yang diawali huruf kapital.

Gunakan:

```jsx
<Header />
```

bukan:

```jsx
<header />
```

`<header>` merupakan HTML element, sedangkan `<Header />` merupakan custom React component.

---

## 18. Poin Penting

Beberapa konsep utama yang perlu diingat:

- Pisahkan component ke file terpisah ketika project mulai berkembang.
- Gunakan folder `src/components/` untuk mengorganisasi component.
- Sebaiknya nama file mengikuti nama component.
- Gunakan `export` agar component dapat digunakan oleh file lain.
- Gunakan `import` untuk menggunakan component yang sudah diekspor.
- Perhatikan relative path seperti `./` dan `../`.
- Sesuaikan path asset setelah component dipindahkan.
- Satu file biasanya memiliki satu component utama.
- Struktur folder yang baik membantu meningkatkan **readability** dan **maintainability**.

---

## Kesimpulan

Memisahkan component ke dalam file terpisah bukan sekadar membuat jumlah file menjadi lebih banyak. Tujuan utamanya adalah membuat aplikasi menjadi **modular, terorganisasi, reusable, dan mudah dipelihara**.

Struktur sederhana:

```text
src/
├── assets/
│   └── react-logo.png
│
├── components/
│   ├── Header.jsx
│   ├── CoreConcept.jsx
│   └── Button.jsx
│
├── App.jsx
└── main.jsx
```

Dengan pola:

```text
Component
    │
    ├── export
    │
    ▼
File lain
    │
    ├── import
    │
    ▼
Gunakan <Component />
```

Semakin besar aplikasi React, semakin penting struktur project yang baik. Membiasakan diri memisahkan component sejak awal akan sangat membantu ketika aplikasi mulai memiliki banyak halaman, component, dan fitur.
