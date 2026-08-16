---
sidebar_position: 7
title: "Nilai Dinamis dalam JSX"
---

Dalam aplikasi React, kita tidak hanya menampilkan konten statis. Kita juga sering perlu menampilkan **nilai dinamis**, yaitu data yang berasal dari variabel, hasil perhitungan, fungsi, atau sumber data lainnya.

Kemampuan menampilkan nilai dinamis merupakan salah satu konsep dasar yang sangat penting dalam JSX.

## 1. Konsep Dasar Nilai Dinamis

Secara sederhana, JSX dapat digunakan untuk menampilkan konten statis.

Contoh:

```jsx
function Header() {
  return (
    <header>
      <h1>Welcome to React</h1>
      <p>Learn React from the beginning.</p>
    </header>
  );
}
```

Pada contoh tersebut, teks yang ditampilkan bersifat **statis**.

Namun, aplikasi nyata biasanya menampilkan data yang dapat berubah.

Misalnya:

- Nama pengguna.
- Harga produk.
- Jumlah item.
- Hasil perhitungan.
- Data dari API.
- Nilai dari sebuah fungsi.
- Data dari Array atau Object.

React memungkinkan kita memasukkan nilai-nilai tersebut langsung ke dalam JSX.

---

## 2. Menggunakan Kurung Kurawal `{}`

Untuk memasukkan ekspresi JavaScript ke dalam JSX, kita menggunakan **kurung kurawal `{}`**.

Contoh:

```jsx
function App() {
  const title = "Belajar React";

  return (
    <h1>{title}</h1>
  );
}
```

Hasilnya:

```text
Belajar React
```

Pada contoh tersebut:

```jsx
{title}
```

memberitahu React bahwa `title` merupakan **ekspresi JavaScript** yang harus dievaluasi, bukan teks biasa.

---

## 3. Menggunakan Ekspresi JavaScript

Kurung kurawal `{}` tidak hanya dapat digunakan untuk menampilkan variabel.

Kita juga dapat menggunakan berbagai ekspresi JavaScript.

Contoh operasi matematika:

```jsx
<p>{1 + 1}</p>
```

React akan mengevaluasi ekspresi tersebut dan menghasilkan:

```text
2
```

Contoh lainnya:

```jsx
const price = 100;
const quantity = 3;

return (
  <p>
    Total: {price * quantity}
  </p>
);
```

Hasil:

```text
Total: 300
```

---

## 4. Menampilkan Nilai dari Variabel

Cara yang paling umum adalah menyimpan data dalam variabel atau konstanta terlebih dahulu.

```jsx
function Header() {
  const title = "React.js";
  const description = "Learn React from the beginning.";

  return (
    <header>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
```

Dengan pendekatan ini, struktur JSX tetap mudah dibaca.

---

## 5. Menampilkan Hasil Fungsi

Kita juga dapat menjalankan fungsi di dalam ekspresi JSX.

Contoh:

```jsx
function getGreeting() {
  return "Hello React!";
}

function App() {
  return (
    <h1>{getGreeting()}</h1>
  );
}
```

Hasil:

```text
Hello React!
```

Namun, untuk logic yang lebih kompleks, sebaiknya hasil fungsi disimpan terlebih dahulu dalam variabel agar JSX tetap sederhana.

---

## 6. Menggunakan Array

Nilai dinamis juga dapat berasal dari Array.

Contoh:

```jsx
const reactDescriptions = [
  "Fundamental",
  "Crucial",
  "Core"
];
```

Kita dapat mengambil salah satu nilai menggunakan indeks:

```jsx
const description = reactDescriptions[0];
```

Kemudian menampilkannya:

```jsx
<p>{description} React concepts you will need.</p>
```

Hasil:

```text
Fundamental React concepts you will need.
```

---

## 7. Menggunakan Fungsi dan Array

Kita juga dapat menggabungkan Array dengan sebuah fungsi untuk menghasilkan nilai dinamis.

Misalnya:

```javascript
function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}
```

Kemudian:

```javascript
const reactDescriptions = [
  "Fundamental",
  "Crucial",
  "Core"
];

const description =
  reactDescriptions[genRandomInt(2)];
```

Variabel `description` akan berisi salah satu dari:

```text
Fundamental
Crucial
Core
```

Kemudian digunakan dalam JSX:

```jsx
<p>
  {description} React concepts you will need.
</p>
```

Setiap kali aplikasi dijalankan atau component dievaluasi kembali, nilai yang dipilih dapat berbeda karena menggunakan angka acak.

---

## 8. Nilai Dinamis pada Attribute

Kurung kurawal `{}` juga dapat digunakan untuk memberikan nilai dinamis pada attribute JSX.

Contoh:

```jsx
const imagePath = "/images/react-logo.png";

return (
  <img
    src={imagePath}
    alt="React Logo"
  />
);
```

Kita juga dapat menulis:

```jsx
<img
  src={imagePath}
  alt="React Logo"
/>
```

Di sini:

```jsx
src={imagePath}
```

berarti nilai `src` berasal dari variabel JavaScript `imagePath`.

---

## 9. Perbedaan String Biasa dan Expression

Perhatikan perbedaan berikut.

### Nilai Statis

```jsx
<img src="/images/react-logo.png" />
```

Nilai `src` ditulis langsung sebagai string.

### Nilai Dinamis

```jsx
const imagePath = "/images/react-logo.png";

<img src={imagePath} />
```

Nilai `src` berasal dari variabel JavaScript.

Contoh lain:

```jsx
const userName = "Budi";

<h1>Hello {userName}</h1>
```

React akan menggabungkan teks statis:

```text
Hello
```

dengan nilai dinamis:

```text
Budi
```

menjadi:

```text
Hello Budi
```

---

## 10. Ekspresi yang Dapat Digunakan dalam JSX

Kurung kurawal `{}` dapat berisi berbagai **JavaScript expression**.

Contoh:

### Variabel

```jsx
<h1>{userName}</h1>
```

### Operasi Matematika

```jsx
<p>{price * quantity}</p>
```

### Function Call

```jsx
<p>{getGreeting()}</p>
```

### Ternary Operator

```jsx
<p>{isLoggedIn ? "Logout" : "Login"}</p>
```

### Array Access

```jsx
<p>{users[0].name}</p>
```

Yang penting, isi `{}` harus berupa **expression** yang menghasilkan sebuah nilai.

---

## 11. Hindari Menempatkan Logic yang Terlalu Kompleks di JSX

Meskipun JavaScript expression dapat ditulis langsung di JSX, sebaiknya jangan memasukkan logic yang terlalu panjang atau kompleks.

Contoh yang kurang baik:

```jsx
<p>
  {
    users
      .filter(user => user.active)
      .map(user => user.name)
      .join(", ")
  }
</p>
```

Kode tersebut mungkin tetap valid, tetapi dapat membuat JSX sulit dibaca.

Lebih baik memisahkan logic:

```jsx
const activeUserNames = users
  .filter(user => user.active)
  .map(user => user.name)
  .join(", ");
```

Kemudian:

```jsx
<p>{activeUserNames}</p>
```

Hasilnya lebih mudah dibaca.

---

## 12. Best Practice: Pisahkan Logic dan JSX

Salah satu praktik yang baik adalah melakukan proses data sebelum `return`.

Contoh:

```jsx
function Header() {
  const reactDescriptions = [
    "Fundamental",
    "Crucial",
    "Core"
  ];

  const description =
    reactDescriptions[genRandomInt(2)];

  return (
    <header>
      <h1>React</h1>

      <p>
        {description} React concepts you
        will need.
      </p>
    </header>
  );
}
```

Dengan cara ini:

```text
JavaScript Logic
      │
      ▼
  description
      │
      ▼
      JSX
```

JSX hanya bertugas menggambarkan struktur UI dan menampilkan hasilnya.

---

## 13. Contoh Lengkap

Berikut contoh component yang menggunakan beberapa nilai dinamis:

```jsx
function Product() {
  const productName = "Laptop";
  const price = 10000000;
  const quantity = 2;

  const total = price * quantity;

  return (
    <div>
      <h2>{productName}</h2>

      <p>
        Harga: Rp{price}
      </p>

      <p>
        Jumlah: {quantity}
      </p>

      <p>
        Total: Rp{total}
      </p>
    </div>
  );
}
```

Hasilnya secara konsep:

```text
Laptop
Harga: Rp10000000
Jumlah: 2
Total: Rp20000000
```

---

## 14. Alur Nilai Dinamis dalam React

Secara sederhana, React memproses nilai dinamis seperti berikut:

```text
JavaScript Data
      │
      ├── Variable
      ├── Function
      ├── Array
      └── Object
      │
      ▼
   {Expression}
      │
      ▼
     JSX
      │
      ▼
 React Rendering
      │
      ▼
 User Interface
```

---

## 15. Poin Penting

Beberapa hal yang perlu diingat:

- JSX dapat menampilkan konten statis maupun dinamis.
- Gunakan `{}` untuk memasukkan JavaScript expression ke dalam JSX.
- Variabel dapat langsung digunakan di dalam `{}`.
- Hasil function dapat digunakan di dalam `{}`.
- Nilai Array atau Object dapat digunakan dalam JSX.
- `{}` juga dapat digunakan pada attribute JSX.
- Pisahkan logic yang kompleks dari JSX.
- Gunakan variabel untuk membuat JSX lebih mudah dibaca.

---

## Kesimpulan

**Dynamic Values** merupakan konsep penting dalam React karena memungkinkan UI menampilkan data yang berasal dari JavaScript.

Sintaks utamanya adalah:

```jsx
{expression}
```

Contoh sederhana:

```jsx
const userName = "Budi";

return (
  <h1>
    Hello {userName}!
  </h1>
);
```

Dengan konsep ini, JSX tidak lagi hanya menampilkan teks statis, tetapi dapat menampilkan **data, hasil perhitungan, nilai Array, hasil function, dan berbagai ekspresi JavaScript lainnya** secara dinamis.

Setelah memahami konsep ini, langkah berikutnya adalah mempelajari bagaimana React menggunakan **Props** untuk mengirim nilai dinamis dari satu Component ke Component lainnya.
