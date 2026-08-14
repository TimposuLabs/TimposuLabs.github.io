---
sidebar_position: 8
title: "Atribut HTML Dinamis"
---

## Mengatur Atribut HTML Secara Dinamis dan Mengimpor Gambar di React

Dalam aplikasi React, kita sering menggunakan berbagai atribut HTML seperti `src`, `href`, `className`, dan lainnya. Nilai dari atribut tersebut dapat dibuat dinamis menggunakan JavaScript.

Salah satu contoh yang sering ditemui adalah ketika kita ingin menampilkan gambar yang berada di dalam folder project.

---

## 1. Masalah Menggunakan Path Gambar Secara Statis

Kita mungkin tergoda untuk menuliskan path gambar secara langsung:

```jsx
<img
  src="src/assets/react-core-concepts.png"
  alt="React"
/>
```

Cara tersebut mungkin terlihat sederhana dan dapat bekerja pada kondisi tertentu, tetapi **bukan pendekatan yang ideal untuk asset yang berada di source code project**.

Saat aplikasi diproses menggunakan build tools seperti Vite atau Webpack, asset dapat diproses, dipindahkan, diberi nama baru, atau dioptimalkan.

Contohnya, file:

```text
src/assets/react-core-concepts.png
```

dapat diproses menjadi file dengan nama dan lokasi berbeda pada hasil build.

Karena itu, kita sebaiknya menyerahkan pengelolaan asset tersebut kepada **build process**.

---

## 2. Mengimpor Gambar sebagai Module

Salah satu cara yang umum digunakan adalah mengimpor gambar menggunakan `import`.

Misalnya struktur project:

```text
src/
├── assets/
│   └── react-core-concepts.png
│
├── App.jsx
└── main.jsx
```

Kemudian pada file `App.jsx`:

```jsx
import reactImg from "./assets/react-core-concepts.png";
```

Sekarang `reactImg` merupakan nilai yang dapat digunakan di dalam JavaScript dan JSX.

---

## 3. Bagaimana Build Tools Memproses Gambar?

Ketika kita melakukan:

```jsx
import reactImg from "./assets/react-core-concepts.png";
```

build tool seperti Vite akan mengetahui bahwa file tersebut merupakan asset yang digunakan oleh aplikasi.

Secara sederhana:

```text
react-core-concepts.png
          │
          ▼
       import
          │
          ▼
     Build Tool
          │
          ▼
Asset diproses
          │
          ▼
Production Bundle
```

Build tool kemudian dapat mengelola asset tersebut sesuai kebutuhan aplikasi.

Dalam hasil production, nama atau lokasi file asset dapat berbeda dari lokasi file sumbernya.

---

## 4. Menggunakan Gambar pada Atribut `src`

Setelah gambar diimpor, kita dapat menggunakannya sebagai nilai dinamis pada atribut `src`.

Gunakan kurung kurawal `{}`:

```jsx
<img
  src={reactImg}
  alt="Stylized atom"
/>
```

Pada contoh tersebut:

```jsx
src={reactImg}
```

berarti nilai `src` berasal dari variabel JavaScript `reactImg`.

---

## 5. Jangan Menggunakan Tanda Kutip untuk Variabel

Perhatikan perbedaan berikut.

### ✅ Benar

```jsx
<img
  src={reactImg}
  alt="Stylized atom"
/>
```

### ❌ Salah

```jsx
<img
  src="{reactImg}"
  alt="Stylized atom"
/>
```

Ketika menggunakan:

```jsx
src="{reactImg}"
```

React akan menganggapnya sebagai **string literal**, bukan sebagai variabel JavaScript.

Sedangkan:

```jsx
src={reactImg}
```

berarti React menggunakan nilai yang terdapat pada variabel `reactImg`.

---

## 6. String Statis vs Nilai Dinamis

Dalam JSX, terdapat perbedaan antara nilai statis dan nilai dinamis.

### Nilai Statis

```jsx
<img
  src="/logo.png"
  alt="Logo"
/>
```

Nilai `src` ditulis sebagai string.

### Nilai Dinamis

```jsx
const imagePath = "/logo.png";

<img
  src={imagePath}
  alt="Logo"
/>
```

Nilai `src` berasal dari variabel JavaScript.

---

## 7. Contoh Lengkap

Misalnya kita memiliki struktur:

```text
src/
├── assets/
│   └── react-core-concepts.png
│
└── components/
    └── Header.jsx
```

Isi `Header.jsx`:

```jsx
import reactImg from "../assets/react-core-concepts.png";

function Header() {
  return (
    <header>
      <img
        src={reactImg}
        alt="Stylized atom"
      />

      <h1>React.js</h1>
      <p>Learn the core concepts of React.</p>
    </header>
  );
}

export default Header;
```

Pada contoh tersebut, gambar:

```text
react-core-concepts.png
```

diimpor sebagai:

```javascript
reactImg
```

Kemudian digunakan pada:

```jsx
src={reactImg}
```

---

## 8. Menggunakan Asset Lain

Pendekatan yang sama dapat digunakan untuk berbagai asset yang didukung oleh build tools.

Misalnya:

```jsx
import logo from "./assets/logo.png";
import icon from "./assets/icon.svg";
```

Kemudian:

```jsx
<img src={logo} alt="Logo" />
<img src={icon} alt="Icon" />
```

Dengan cara ini, asset menjadi bagian dari dependency aplikasi dan dapat diproses oleh build system.

---

## 9. Atribut JSX Tidak Hanya `src`

Konsep nilai dinamis tidak hanya berlaku untuk gambar.

Kita dapat menggunakan `{}` pada berbagai atribut JSX.

### `src`

```jsx
<img src={imagePath} alt="React" />
```

### `href`

```jsx
<a href={websiteUrl}>
  Website
</a>
```

### `className`

```jsx
<div className={cssClass}>
  Content
</div>
```

### `disabled`

```jsx
<button disabled={isDisabled}>
  Submit
</button>
```

Jadi, secara umum:

```jsx
attribute={javascriptExpression}
```

digunakan ketika nilai attribute berasal dari JavaScript.

---

## 10. Perbedaan Asset `src` dan Folder `public`

Dalam project React modern, asset dapat dikelola dengan beberapa pendekatan.

Salah satunya adalah menempatkan asset di dalam `src`, misalnya:

```text
src/
└── assets/
    └── logo.png
```

Kemudian mengimpornya:

```jsx
import logo from "./assets/logo.png";
```

Cara lain adalah menggunakan folder `public` untuk asset yang ingin disajikan sebagai file statis.

Contoh:

```text
public/
└── logo.png
```

Kemudian dapat direferensikan menggunakan path:

```jsx
<img
  src="/logo.png"
  alt="Logo"
/>
```

Kedua pendekatan memiliki tujuan dan karakteristik yang berbeda. Untuk asset yang merupakan bagian dari module aplikasi, import dari `src/assets` merupakan pendekatan yang umum.

---

## 11. Alur Asset dengan `import`

Ketika menggunakan:

```jsx
import reactImg from "./assets/react-core-concepts.png";
```

alur sederhananya:

```text
File Image
    │
    ▼
import
    │
    ▼
JavaScript Variable
    │
    ▼
JSX Attribute
    │
    ▼
<img src={reactImg} />
    │
    ▼
Build Tool
    │
    ▼
Production Asset
```

Dengan pendekatan ini, build tool dapat mengetahui bahwa gambar tersebut merupakan bagian dari aplikasi.

---

## 12. Poin Penting

Beberapa hal yang perlu diingat:

- Asset gambar dapat diimpor menggunakan `import`.
- Build tools seperti Vite dapat memproses asset yang diimpor.
- Gunakan `{}` untuk memasukkan variabel JavaScript ke dalam attribute JSX.
- Gunakan:

```jsx
src={reactImg}
```

bukan:

```jsx
src="{reactImg}"
```

- Path asset hasil production dapat berbeda dari path pada source code.
- Asset di `src` dan asset di `public` memiliki cara penggunaan yang berbeda.

---

## Kesimpulan

Dalam React, kita dapat membuat atribut HTML menjadi dinamis dengan menggunakan ekspresi JavaScript.

Untuk gambar yang berada di dalam source code, kita dapat mengimpornya:

```jsx
import reactImg from "./assets/react-core-concepts.png";
```

Kemudian menggunakannya:

```jsx
<img
  src={reactImg}
  alt="Stylized atom"
/>
```

Konsep pentingnya adalah:

```text
import asset
     ↓
variabel JavaScript
     ↓
{variabel}
     ↓
JSX attribute
```

Pendekatan ini membuat build tools dapat mengetahui hubungan antara kode aplikasi dan asset yang digunakannya, sehingga asset dapat dikelola dengan baik selama proses development maupun production build.
