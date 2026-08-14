---
sidebar_position: 3
title: "Intro Javascript"
---

## JavaScript dan Lingkungan Eksekusi

JavaScript awalnya dirancang untuk berjalan di dalam browser. Namun, saat ini JavaScript dapat dijalankan di berbagai lingkungan (*runtime*), sehingga tidak hanya digunakan untuk membuat website.

Beberapa lingkungan eksekusi JavaScript antara lain:

- **Browser** - Menjalankan JavaScript pada aplikasi web.
- **Node.js** - Menjalankan JavaScript di sisi server.
- **Deno** - Runtime JavaScript modern sebagai alternatif Node.js.

Selain itu, JavaScript juga dapat digunakan untuk mengembangkan aplikasi mobile *native* menggunakan framework seperti **React Native**.

:::info
**Catatan**
Pada seri ini kita akan fokus menggunakan JavaScript di lingkungan **browser**, karena React merupakan library *front-end* untuk membangun antarmuka pengguna (User Interface).
:::

## Menambahkan JavaScript ke HTML

Terdapat dua cara untuk menggunakan JavaScript pada halaman HTML.

### 1. Script Inline

Kode JavaScript ditulis langsung di dalam tag `<script>`.

```html
<script>
  console.log("Hello World");
</script>
```

Cara ini hanya cocok untuk contoh sederhana dan **tidak direkomendasikan** pada proyek nyata karena membuat file HTML sulit dibaca dan dipelihara.

### 2. File JavaScript Eksternal (Direkomendasikan)

Kode JavaScript disimpan pada file terpisah, kemudian dihubungkan ke halaman HTML menggunakan atribut `src`.

Misalnya struktur folder berikut.

```text
project/
│
├── index.html
└── assets/
    └── scripts/
        └── app.js
```

Kemudian hubungkan file tersebut.

```html
<script src="assets/scripts/app.js"></script>
```

Pendekatan ini membuat kode lebih rapi, mudah dikelola, dan dapat digunakan kembali.

## Atribut Penting pada Tag `<script>`

### defer

Atribut `defer` membuat browser menunggu hingga seluruh dokumen HTML selesai diproses sebelum menjalankan JavaScript.

```html
<script src="app.js" defer></script>
```

Keuntungan menggunakan `defer`:

- HTML selesai dimuat terlebih dahulu.
- Menghindari error ketika JavaScript mengakses elemen HTML yang belum tersedia.
- Membuat proses rendering halaman lebih cepat.

### type="module"

JavaScript modern menggunakan konsep **Module** untuk memisahkan kode ke dalam beberapa file.

```html
<script type="module" src="app.js"></script>
```

Dengan `type="module"`, kita dapat menggunakan sintaks berikut.

```javascript
import { sum } from "./math.js";
export default App;
```

Fitur ini sangat penting karena hampir seluruh proyek React menggunakan JavaScript Module.

## Bagaimana React Menjalankan JavaScript?

Pada proyek HTML biasa, kita harus menambahkan tag `<script>` secara manual.

Namun pada proyek React, hal tersebut hampir tidak pernah dilakukan.

Sebagai gantinya, React menggunakan **Build Process** yang secara otomatis:

- mengompilasi JSX menjadi JavaScript biasa,
- menggabungkan seluruh file JavaScript,
- mengoptimalkan ukuran file,
- serta menyisipkan (*inject*) file JavaScript ke dalam halaman HTML.

Karena itulah Anda jarang melihat penambahan tag `<script>` secara manual pada proyek React.

## Mengapa React Membutuhkan Project Setup?

React menggunakan sintaks khusus bernama **JSX**.

Contohnya:

```jsx
function App() {
  return <h1>Hello React</h1>;
}
```

Masalahnya, browser **tidak memahami JSX**.

Agar dapat dijalankan, kode JSX harus diubah terlebih dahulu menjadi JavaScript standar.

Proses tersebut dilakukan oleh **Build Tool**, misalnya:

- Vite
- Create React App (CRA)

Selain mengubah JSX menjadi JavaScript biasa, build tool juga melakukan optimasi seperti:

- Minification
- Bundling
- Tree Shaking
- Optimasi performa

Hasil akhirnya adalah aplikasi yang lebih kecil, lebih cepat, dan siap dijalankan di browser.

## Membuat Project React

Ada dua cara yang umum digunakan untuk membuat proyek React.

### 1. CodeSandbox

CodeSandbox merupakan editor berbasis browser yang memungkinkan kita langsung membuat dan menjalankan proyek React tanpa instalasi.

#### Kelebihan

- Tidak perlu instalasi Node.js.
- Langsung dapat digunakan.
- Cocok untuk belajar atau mencoba contoh kode.

Pada CodeSandbox, proses seperti:

```bash
npm install
npm run dev
```

akan dijalankan secara otomatis.

### 2. Proyek Lokal

Pilihan yang paling direkomendasikan adalah membuat proyek React secara lokal menggunakan editor seperti **Visual Studio Code**.

#### Prasyarat

- Node.js
- npm
- Visual Studio Code

Kemudian buat proyek menggunakan Vite.

```bash
npm create vite@latest
```

Masuk ke folder proyek.

```bash
cd nama-project
```

Install seluruh dependency.

```bash
npm install
```

Jalankan server pengembangan.

```bash
npm run dev
```

Selama proses pengembangan, terminal tersebut harus tetap berjalan agar fitur **Hot Reload** dapat bekerja secara otomatis setiap kali file disimpan.

## Materi JavaScript yang Akan Dipelajari

Sebelum masuk ke React, kita akan mempelajari kembali konsep-konsep JavaScript modern yang paling sering digunakan.

Materi yang akan dibahas meliputi:

- Variabel (`let` dan `const`)
- Operator
- Function
- Arrow Function
- Object
- Class
- Array
- Array Methods (`map()`, `filter()`, `find()`, dan lainnya)
- Destructuring
- Spread Operator (`...`)
- Module (`import` dan `export`)
- Conditional Statement (`if`, `else`, `switch`)
- First-Class Function
- Nested Function
- Primitive dan Reference Value

Setiap materi akan disertai contoh kode sehingga Anda dapat memahami bagaimana konsep tersebut diterapkan pada React nantinya.
