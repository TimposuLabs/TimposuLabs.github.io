---
sidebar_position: 5
title: "React Build Process"
---

## Mengapa Proyek React Membutuhkan Build Process?

Saat membuat website menggunakan HTML dan JavaScript biasa, kita cukup menghubungkan file JavaScript ke halaman HTML menggunakan tag `<script>`. Namun, pendekatan tersebut berbeda ketika menggunakan React.

React memerlukan **Build Process**, yaitu serangkaian proses yang mengubah, mengoptimalkan, dan menyiapkan kode agar dapat dijalankan oleh browser.

---

## Perbedaan Proyek HTML Biasa dan Proyek React

### Proyek HTML dan JavaScript Biasa

Pada proyek HTML biasa, file JavaScript dihubungkan secara manual menggunakan tag `<script>`.

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>

  <h1>Hello World</h1>

  <script src="app.js"></script>

</body>
</html>
```

Browser akan langsung memuat dan menjalankan file `app.js`.

---

### Proyek React

Berbeda dengan proyek HTML biasa, pada proyek React Anda hampir tidak akan pernah menambahkan tag `<script>` secara manual.

Sebagai contoh, file `index.html` pada proyek React biasanya hanya berisi elemen root tempat aplikasi akan dirender.

```html
<body>
  <div id="root"></div>
</body>
```

Saat aplikasi dijalankan, Build Tool akan secara otomatis menghasilkan file JavaScript dan menyisipkannya ke dalam halaman HTML.

Dengan kata lain, proses tersebut dilakukan secara otomatis sehingga developer tidak perlu mengelolanya secara manual.

---

## Tag `<noscript>`

Pada file `index.html` React biasanya juga terdapat tag `<noscript>`.

```html
<noscript>
  You need to enable JavaScript to run this app.
</noscript>
```

Tag ini berfungsi sebagai **pesan cadangan (fallback)** apabila pengguna menonaktifkan JavaScript pada browser.

Karena React sepenuhnya berjalan menggunakan JavaScript, aplikasi tidak dapat digunakan jika JavaScript dinonaktifkan.

---

## Peran Node.js dan Build Tool

Agar proyek React dapat berjalan, kita memerlukan **Node.js**.

Node.js tidak hanya digunakan untuk menginstal paket (*packages*), tetapi juga menjalankan berbagai alat pengembangan (*development tools*).

Build Tool yang umum digunakan antara lain:

- Vite
- React Scripts (Create React App)

Build Tool memiliki beberapa tugas penting, yaitu:

- Mengawasi perubahan kode secara otomatis (*Hot Reload*).
- Mengubah kode sebelum dikirim ke browser.
- Menghasilkan file JavaScript yang siap dijalankan.
- Menyisipkan file JavaScript ke dalam halaman HTML secara otomatis.

Semua proses tersebut berlangsung di balik layar tanpa perlu dilakukan secara manual oleh developer.

---

## Mengapa React Membutuhkan Build Process?

### 1. Mendukung JSX

React menggunakan sintaks khusus bernama **JSX**.

Contohnya:

```jsx
function App() {
  return <h1>Hello React</h1>;
}
```

Meskipun terlihat seperti HTML, JSX **bukan merupakan JavaScript standar**.

Browser tidak dapat memahami kode JSX secara langsung. Jika file tersebut dijalankan tanpa proses transformasi, browser akan menghasilkan error.

Oleh karena itu, Build Tool akan mengubah JSX menjadi JavaScript biasa.

Contoh hasil transformasi:

```javascript
function App() {
  return React.createElement("h1", null, "Hello React");
}
```

Setelah proses transformasi selesai, browser dapat menjalankan kode tersebut tanpa masalah.

---

### 2. Mengoptimalkan Ukuran Aplikasi

Selama proses pengembangan, kita biasanya menulis kode dengan format yang rapi agar mudah dibaca.

```javascript
function calculateTotal(price, tax) {
  return price + tax;
}
```

Namun sebelum aplikasi dipublikasikan, Build Tool akan melakukan **minifikasi (minification)**.

Contohnya:

```javascript
function a(b,c){return b+c}
```

Proses minifikasi akan:

- Menghapus spasi yang tidak diperlukan.
- Menghapus komentar.
- Memperpendek nama variabel dan fungsi.
- Mengurangi ukuran file JavaScript.

Hasilnya, aplikasi menjadi lebih ringan dan lebih cepat diunduh oleh browser.

---

## Kesimpulan

Build Process merupakan bagian penting dalam pengembangan aplikasi React. Selain mengubah kode JSX menjadi JavaScript yang dapat dipahami browser, Build Tool juga melakukan berbagai optimasi agar aplikasi berjalan lebih cepat dan efisien.

Tanpa Build Process, browser tidak dapat menjalankan aplikasi React secara langsung karena tidak mengenali sintaks JSX dan berbagai fitur modern yang digunakan dalam proyek React.
