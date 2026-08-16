---
sidebar_position: 13
title: "Best Practice: File Style"
---

## Praktik Terbaik: Menyimpan File Style di Dekat Component

Seiring berkembangnya aplikasi React, jumlah component dan aturan CSS akan semakin banyak. Jika seluruh style disimpan dalam satu file global seperti `index.css`, kode dapat menjadi sulit dikelola.

Salah satu praktik yang dapat digunakan adalah **co-location**, yaitu menyimpan file yang berkaitan dengan sebuah component di lokasi yang berdekatan.

---

## 1. Mengapa File CSS Perlu Dipisahkan?

Pada project sederhana, kita mungkin hanya memiliki satu file:

```text
src/
├── App.jsx
├── main.jsx
└── index.css
```

Semua style aplikasi kemudian ditulis di dalam `index.css`.

Pendekatan ini masih dapat digunakan untuk project kecil. Namun, ketika aplikasi semakin besar, file CSS dapat menjadi sangat panjang.

### Masalah yang Dapat Muncul

- Sulit menemukan style untuk component tertentu.
- File CSS menjadi terlalu besar.
- Sulit mengetahui style mana yang digunakan oleh component tertentu.
- Pemeliharaan kode menjadi lebih sulit.
- Risiko konflik antar aturan CSS semakin besar.

### Solusi

Buat file CSS yang berkaitan dengan masing-masing component.

Contoh:

```text
src/
└── components/
    ├── Header.jsx
    ├── Header.css
    ├── CoreConcept.jsx
    └── CoreConcept.css
```

Dengan pendekatan ini, file yang berkaitan dengan component berada berdekatan.

---

## 2. Konsep Co-location

**Co-location** adalah praktik menempatkan file-file yang saling berkaitan dalam lokasi yang berdekatan.

Misalnya:

```text
Header.jsx
Header.css
```

Keduanya berkaitan dengan component `Header`.

Begitu juga:

```text
CoreConcept.jsx
CoreConcept.css
```

Keduanya berkaitan dengan component `CoreConcept`.

Keuntungan utamanya adalah developer dapat dengan mudah menemukan kode JavaScript dan style yang digunakan oleh sebuah component.

---

## 3. Membuat File CSS untuk Component

Misalnya kita memiliki component:

```text
src/components/Header.jsx
```

Buat file CSS:

```text
src/components/Header.css
```

Strukturnya menjadi:

```text
src/
└── components/
    ├── Header.jsx
    └── Header.css
```

Kemudian pindahkan style yang berkaitan dengan `Header` dari `index.css` ke `Header.css`.

Contoh:

```css
header {
  padding: 2rem;
  text-align: center;
}

header h1 {
  margin: 0;
}
```

---

## 4. Mengimpor CSS ke dalam Component

Setelah membuat file CSS, import file tersebut langsung di dalam component.

```jsx
import "./Header.css";

export default function Header() {
  return (
    <header>
      <h1>React Essentials</h1>
    </header>
  );
}
```

Dengan cara ini, hubungan antara component dan file CSS terlihat dengan jelas.

```text
Header.jsx
    │
    └── Header.css
```

---

## 5. Memindahkan Style dari `index.css`

Misalnya sebelumnya semua style berada di:

```text
src/index.css
```

```css
header {
  padding: 2rem;
  text-align: center;
}

.core-concept {
  padding: 1rem;
}

.button {
  padding: 0.5rem 1rem;
}
```

Kita dapat memindahkan style tersebut ke file masing-masing.

Contohnya:

```text
src/
└── components/
    ├── Header.jsx
    ├── Header.css
    ├── CoreConcept.jsx
    └── CoreConcept.css
```

`Header.css`:

```css
header {
  padding: 2rem;
  text-align: center;
}
```

`CoreConcept.css`:

```css
.core-concept {
  padding: 1rem;
}
```

---

## 6. CSS Import Tidak Otomatis Menjadi Scoped

Hal penting yang harus dipahami adalah:

:::warning
Mengimpor file CSS di dalam component **tidak berarti CSS tersebut hanya berlaku untuk component tersebut**.
:::

Misalnya `Header.css` berisi:

```css
header {
  background: red;
}
```

Kemudian di `Header.jsx`:

```jsx
import "./Header.css";
```

Aturan:

```css
header {
  background: red;
}
```

tetap merupakan aturan CSS global.

Artinya, jika aplikasi memiliki component lain:

```jsx
function App() {
  return (
    <div>
      <Header />

      <header>
        <h2>Another Header</h2>
      </header>
    </div>
  );
}
```

maka `<header>` lainnya juga dapat terkena aturan:

```css
header {
  background: red;
}
```

---

## 7. Mengapa CSS Tetap Global?

Ketika menggunakan import CSS biasa:

```jsx
import "./Header.css";
```

bundler seperti Vite akan memproses CSS tersebut dan memasukkannya ke dalam aplikasi.

CSS tersebut tetap mengikuti aturan CSS biasa.

Contohnya:

```css
header {
  color: white;
}
```

Selector `header` tidak mengetahui bahwa aturan tersebut berasal dari `Header.jsx`.

CSS hanya melihat elemen HTML yang cocok dengan selector tersebut.

---

## 8. Menggunakan Class untuk Mengurangi Konflik

Salah satu cara sederhana untuk mengurangi konflik adalah menggunakan class yang lebih spesifik.

Daripada:

```css
header {
  background: red;
}
```

gunakan:

```css
.header {
  background: red;
}
```

Kemudian:

```jsx
<header className="header">
  <h1>React Essentials</h1>
</header>
```

Dengan cara ini, selector lebih spesifik terhadap component.

Namun, perlu diingat bahwa class CSS biasa tetap bersifat global.

---

## 9. CSS Modules

Untuk kebutuhan yang lebih besar, React project dapat menggunakan pendekatan seperti **CSS Modules**.

Dengan CSS Modules, style dapat dibuat lebih terisolasi sehingga nama class tidak mudah bertabrakan dengan class dari component lain.

Contoh struktur:

```text
Header/
├── Header.jsx
└── Header.module.css
```

Kemudian:

```jsx
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>React Essentials</h1>
    </header>
  );
}
```

CSS:

```css
.header {
  background: red;
}
```

CSS Modules merupakan salah satu solusi ketika aplikasi membutuhkan style yang lebih terisolasi.

---

## 10. Struktur Folder Component

Ketika jumlah component semakin banyak, kita dapat membuat subfolder untuk setiap component.

Struktur sederhana:

```text
src/
└── components/
    ├── Header.jsx
    ├── Header.css
    ├── CoreConcept.jsx
    └── CoreConcept.css
```

Struktur yang lebih terorganisasi:

```text
src/
└── components/
    ├── Header/
    │   ├── Header.jsx
    │   └── Header.css
    │
    └── CoreConcept/
        ├── CoreConcept.jsx
        └── CoreConcept.css
```

Dengan struktur tersebut, seluruh file yang berkaitan dengan satu component berada dalam satu folder.

---

## 11. Contoh Struktur Project

Project React dapat memiliki struktur seperti berikut:

```text
src/
├── assets/
│   ├── react-logo.png
│   └── react-core-concepts.png
│
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.css
│   │
│   ├── CoreConcept/
│   │   ├── CoreConcept.jsx
│   │   └── CoreConcept.css
│   │
│   └── Button/
│       ├── Button.jsx
│       └── Button.css
│
├── App.jsx
├── main.jsx
└── index.css
```

Struktur ini membuat component dan style yang berkaitan menjadi lebih mudah ditemukan.

---

## 12. Contoh `Header.jsx`

Jika menggunakan struktur:

```text
src/components/Header/Header.jsx
```

maka component dapat ditulis:

```jsx
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <h1>React Essentials</h1>
    </header>
  );
}
```

---

## 13. Contoh `Header.css`

File:

```text
src/components/Header/Header.css
```

dapat berisi:

```css
.header {
  padding: 2rem;
  text-align: center;
}

.header h1 {
  margin: 0;
}
```

---

## 14. Menyesuaikan Relative Path Asset

Ketika component dipindahkan ke dalam subfolder, path untuk asset juga harus disesuaikan.

Misalnya struktur awal:

```text
src/
├── assets/
│   └── react-logo.png
└── components/
    └── Header.jsx
```

Maka dari `Header.jsx`:

```jsx
import reactImg from "../assets/react-logo.png";
```

Namun jika struktur berubah menjadi:

```text
src/
├── assets/
│   └── react-logo.png
│
└── components/
    └── Header/
        └── Header.jsx
```

Maka `Header.jsx` harus naik **dua tingkat**:

```jsx
import reactImg from "../../assets/react-logo.png";
```

Alurnya:

```text
Header.jsx
    │
    │ ../
    ▼
Header/
    │
    │ ../
    ▼
components/
    │
    ▼
src/
    │
    ▼
assets/
```

---

## 15. Menggunakan Component dari `App.jsx`

Jika struktur project:

```text
src/
├── App.jsx
└── components/
    └── Header/
        ├── Header.jsx
        └── Header.css
```

maka `App.jsx` dapat mengimpor component:

```jsx
import Header from "./components/Header/Header.jsx";

export default function App() {
  return (
    <div>
      <Header />
    </div>
  );
}
```

---

## 16. Keuntungan Struktur Component dan Style yang Berdekatan

Pendekatan ini memberikan beberapa keuntungan.

### Lebih Mudah Dicari

Developer dapat menemukan component dan CSS-nya dalam folder yang sama.

```text
Header/
├── Header.jsx
└── Header.css
```

### Lebih Mudah Dipelihara

Jika ingin mengubah tampilan `Header`, kita cukup membuka folder `Header`.

### Lebih Modular

Setiap component memiliki kumpulan file yang berkaitan.

### Lebih Mudah Dipindahkan

Component dapat dipindahkan bersama file CSS-nya.

### Mengurangi File Global

`index.css` tidak perlu menampung seluruh style aplikasi.

---

## 17. Apa yang Tetap Cocok di `index.css`?

Walaupun style component dapat dipisahkan, bukan berarti `index.css` harus dihilangkan sepenuhnya.

Style yang bersifat global masih cocok ditempatkan di sana.

Contohnya:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

html {
  background: #f5f5f5;
}
```

Jadi, pembagian sederhananya:

```text
index.css
    │
    └── Global styles

Component.css
    │
    └── Component-specific styles
```

---

## 18. Alur Kerja yang Direkomendasikan

Ketika membuat component baru:

```text
Buat Component
      │
      ▼
Buat File CSS
      │
      ▼
Simpan Berdekatan
      │
      ▼
Import CSS ke Component
      │
      ▼
Pindahkan Style yang Relevan
      │
      ▼
Periksa Relative Path
      │
      ▼
Uji Tampilan
```

---

## 19. Contoh Struktur Akhir

Struktur project yang lebih terorganisasi:

```text
src/
├── assets/
│   ├── react-logo.png
│   └── react-core-concepts.png
│
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.css
│   │
│   ├── CoreConcept/
│   │   ├── CoreConcept.jsx
│   │   └── CoreConcept.css
│   │
│   └── Button/
│       ├── Button.jsx
│       └── Button.css
│
├── App.jsx
├── main.jsx
└── index.css
```

Struktur tersebut menerapkan prinsip **co-location**, yaitu menempatkan file yang saling berkaitan dalam lokasi yang berdekatan.

---

## 20. Poin Penting

Beberapa hal yang perlu diingat:

- Component dapat memiliki file CSS sendiri.
- File CSS sebaiknya disimpan dekat dengan component yang menggunakannya.
- Import CSS dapat dilakukan langsung di file `.jsx`.
- CSS biasa tetap bersifat global meskipun di-import dari component.
- Gunakan class yang spesifik untuk mengurangi kemungkinan konflik.
- CSS Modules dapat digunakan jika membutuhkan style yang lebih terisolasi.
- `index.css` tetap cocok untuk style yang benar-benar bersifat global.
- Jika component dipindahkan ke subfolder, relative path asset harus disesuaikan.
- Struktur folder sebaiknya dibuat konsisten di seluruh project.

---

## Kesimpulan

Menyimpan file CSS di dekat component merupakan salah satu praktik yang membantu membuat project React lebih terorganisasi.

Contoh sederhana:

```text
Header/
├── Header.jsx
└── Header.css
```

Kemudian CSS diimpor langsung:

```jsx
import "./Header.css";
```

Untuk project yang lebih besar, struktur ini dapat dikembangkan menjadi:

```text
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.css
│   │
│   └── CoreConcept/
│       ├── CoreConcept.jsx
│       └── CoreConcept.css
│
├── App.jsx
├── main.jsx
└── index.css
```

Dengan pendekatan **co-location**, component, style, dan file pendukungnya lebih mudah ditemukan, dipahami, dan dipelihara.
