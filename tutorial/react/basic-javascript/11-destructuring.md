---
sidebar_position: 13
title: "Destructuring"
---

## Destructuring di JavaScript

**Destructuring** merupakan fitur modern JavaScript yang diperkenalkan pada **ES6**. Fitur ini memungkinkan kita mengambil nilai dari **Array** atau **Object** dan menyimpannya langsung ke dalam variabel dengan sintaks yang lebih singkat dan mudah dibaca.

Destructuring sangat sering digunakan dalam pengembangan React, terutama ketika bekerja dengan **props**, **state**, dan data dari API.

---

## Array Destructuring

Pada array, kita biasanya mengambil data berdasarkan indeks.

Contoh tanpa destructuring:

```javascript
const userNameData = ["Ucup", "Topekox"];

const firstName = userNameData[0];
const lastName = userNameData[1];

console.log(firstName);
console.log(lastName);
```

Output:

```text
Ucup
Topekox
```

Dengan **Array Destructuring**, kode tersebut dapat ditulis lebih ringkas.

```javascript
const userNameData = ["Ucup", "Topekox"];

const [firstName, lastName] = userNameData;

console.log(firstName);
console.log(lastName);
```

Output:

```text
Ucup
Topekox
```

---

## Cara Kerja Array Destructuring

Array Destructuring menggunakan **kurung siku `[]`** di sebelah kiri operator `=`.

```javascript
const [firstName, lastName] = userNameData;
```

Nilai akan diambil berdasarkan **urutan atau posisi indeks**.

Misalnya:

```javascript
const colors = ["Red", "Green", "Blue"];

const [first, second, third] = colors;

console.log(first);
console.log(second);
console.log(third);
```

Output:

```text
Red
Green
Blue
```

Nama variabel dapat ditentukan sesuai kebutuhan.

```javascript
const [color1, color2, color3] = colors;
```

---

## Mengabaikan Elemen Array

Kita juga dapat melewati elemen tertentu menggunakan koma.

```javascript
const colors = ["Red", "Green", "Blue"];

const [first, , third] = colors;

console.log(first);
console.log(third);
```

Output:

```text
Red
Blue
```

Pada contoh tersebut, elemen `"Green"` tidak disimpan ke dalam variabel.

---

## Object Destructuring

Object Destructuring digunakan untuk mengambil nilai dari property sebuah object.

Contoh tanpa destructuring:

```javascript
const user = {
  name: "Ucup",
  age: 30
};

const name = user.name;
const age = user.age;

console.log(name);
console.log(age);
```

Dengan Object Destructuring:

```javascript
const user = {
  name: "Ucup",
  age: 30
};

const { name, age } = user;

console.log(name);
console.log(age);
```

Output:

```text
Ucup
30
```

---

## Cara Kerja Object Destructuring

Object Destructuring menggunakan **kurung kurawal `{}`** di sebelah kiri operator `=`.

```javascript
const { name, age } = user;
```

Berbeda dengan Array Destructuring, Object Destructuring mengambil data berdasarkan **nama property**, bukan berdasarkan posisi.

Contoh:

```javascript
const user = {
  name: "Ucup",
  age: 30,
  city: "Jakarta"
};

const { city, name } = user;

console.log(name);
console.log(city);
```

Urutan tidak menjadi masalah karena JavaScript mencocokkan nama variabel dengan nama property.

---

## Object Destructuring dengan Alias

Terkadang kita ingin menggunakan nama variabel yang berbeda dari nama property.

Kita dapat menggunakan **alias** dengan tanda titik dua (`:`).

Contoh:

```javascript
const user = {
  name: "Ucup",
  age: 30
};

const { name: userName, age } = user;

console.log(userName);
console.log(age);
```

Output:

```text
Ucup
30
```

Pada contoh tersebut:

```javascript
name: userName
```

berarti mengambil property `name` dan menyimpannya ke dalam variabel bernama `userName`.

---

## Kesimpulan

**Destructuring** memungkinkan kita mengambil data dari Array maupun Object dengan sintaks yang lebih ringkas.

Secara sederhana:

- `[]` → **Array Destructuring**
- `{}` → **Object Destructuring**
- `:` → **Alias pada Object Destructuring**

Destructuring merupakan salah satu fitur JavaScript modern yang sangat penting untuk dipahami sebelum mempelajari React lebih lanjut karena penggunaannya akan sering ditemukan pada **props, state, function parameter, dan React Hooks**.

---

## Destructuring pada Parameter Function

Selain digunakan untuk mengambil nilai dari Object atau Array, **Destructuring** juga dapat diterapkan langsung pada **daftar parameter fungsi (function parameter list)**.

Teknik ini sangat berguna ketika sebuah fungsi menerima **Object sebagai argumen** dan kita hanya membutuhkan beberapa property dari object tersebut.

Dengan destructuring pada parameter, property yang dibutuhkan dapat langsung digunakan sebagai **variabel lokal** di dalam fungsi.

---

## Tanpa Destructuring

Tanpa destructuring, kita perlu mengakses property object menggunakan **dot notation**.

Contoh:

```javascript
function storeOrder(order) {
  localStorage.setItem("id", order.id);
  localStorage.setItem("currency", order.currency);
}
```

Fungsi tersebut menerima sebuah object bernama `order`.

Untuk mengambil data:

```javascript
order.id
order.currency
```

kita harus terus menggunakan nama object `order`.

---

## Dengan Destructuring pada Parameter

Dengan destructuring, kita dapat langsung mengambil property yang dibutuhkan pada parameter fungsi.

```javascript
function storeOrder({ id, currency }) {
  localStorage.setItem("id", id);
  localStorage.setItem("currency", currency);
}
```

Pada contoh tersebut:

```javascript
{ id, currency }
```

merupakan proses **Object Destructuring** yang dilakukan langsung pada parameter fungsi.

Property `id` dan `currency` secara otomatis tersedia sebagai variabel lokal di dalam function.

---

## Cara Memanggil Function

Meskipun terdapat dua nama variabel:

```javascript
function storeOrder({ id, currency }) {
  // ...
}
```

fungsi tersebut **tetap hanya menerima satu parameter**, yaitu sebuah object.

Contoh pemanggilan:

```javascript
storeOrder({
  id: 5,
  currency: "USD",
  amount: 15.99
});
```

Object yang dikirim berisi tiga property:

```javascript
{
  id: 5,
  currency: "USD",
  amount: 15.99
}
```

Namun fungsi hanya mengambil property yang dibutuhkan:

```javascript
{ id, currency }
```

Property `amount` tidak digunakan oleh fungsi tersebut.

---

## Bagaimana Cara Kerjanya?

Kode berikut:

```javascript
function storeOrder({ id, currency }) {
  console.log(id);
  console.log(currency);
}
```

kurang lebih bekerja seperti:

```javascript
function storeOrder(order) {
  const id = order.id;
  const currency = order.currency;

  console.log(id);
  console.log(currency);
}
```

Perbedaannya adalah destructuring membuat kode menjadi lebih singkat dan mudah dibaca.

---

## Contoh Lengkap

```javascript
function storeOrder({ id, currency }) {
  localStorage.setItem("id", id);
  localStorage.setItem("currency", currency);
}

storeOrder({
  id: 5,
  currency: "USD",
  amount: 15.99
});
```

Pada saat fungsi dijalankan:

- `id` berisi `5`.
- `currency` berisi `"USD"`.
- `amount` tidak digunakan.

---

## Hanya Satu Argumen

Hal penting yang perlu diperhatikan adalah penggunaan:

```javascript
{ id, currency }
```

pada parameter **tidak berarti fungsi menerima dua argumen**.

Fungsi tetap menerima **satu argumen**, yaitu object.

Contoh:

```javascript
storeOrder({
  id: 5,
  currency: "USD"
});
```

Bukan:

```javascript
storeOrder(5, "USD");
```

Jadi:

```javascript
function storeOrder({ id, currency }) {
  // ...
}
```

berarti:

> Terima satu object, kemudian ambil property `id` dan `currency` dari object tersebut.

---

## Destructuring pada Parameter React

Teknik ini sangat sering digunakan dalam React, terutama ketika menerima **props** dari sebuah component.

Contoh:

```jsx
function Product({ title, price }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>Rp{price}</p>
    </div>
  );
}
```

Komponen tersebut menerima satu object `props`, kemudian langsung mengambil property:

```javascript
title
price
```

Dengan destructuring, kita tidak perlu menulis:

```jsx
function Product(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>Rp{props.price}</p>
    </div>
  );
}
```

Kedua pendekatan tersebut menghasilkan fungsi yang sama, tetapi destructuring membuat kode lebih ringkas.

---

## Contoh Penggunaan Component

Misalnya kita memiliki component:

```jsx
function User({ name, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Umur: {age}</p>
    </div>
  );
}
```

Kemudian component digunakan:

```jsx
<User name="Budi" age={25} />
```

React akan memberikan props dalam bentuk object:

```javascript
{
  name: "Budi",
  age: 25
}
```

Object tersebut kemudian langsung di-destructure menjadi:

```javascript
name
age
```

---

## Poin Penting

### 1. Menjadi Variabel Lokal

Property yang di-destructure akan menjadi variabel lokal di dalam function.

```javascript
function storeOrder({ id, currency }) {
  console.log(id);
  console.log(currency);
}
```

`id` dan `currency` dapat langsung digunakan tanpa `order.id` atau `order.currency`.

---

### 2. Tetap Satu Argumen

Destructuring pada parameter tidak mengubah jumlah argumen.

```javascript
function storeOrder({ id, currency }) {
  // ...
}
```

Function tersebut tetap menerima **satu object**.

---

### 3. Hanya Property yang Dibutuhkan

Kita tidak harus mengambil seluruh property object.

```javascript
function storeOrder({ id, currency }) {
  // ...
}
```

Jika object memiliki property lain:

```javascript
{
  id: 5,
  currency: "USD",
  amount: 15.99,
  status: "completed"
}
```

fungsi hanya mengambil:

```javascript
id
currency
```

---

## Kesimpulan

**Destructuring pada parameter function** memungkinkan kita mengambil property dari Object secara langsung ketika fungsi menerima argumen.

Tanpa destructuring:

```javascript
function storeOrder(order) {
  console.log(order.id);
  console.log(order.currency);
}
```

Dengan destructuring:

```javascript
function storeOrder({ id, currency }) {
  console.log(id);
  console.log(currency);
}
```

Teknik ini membuat kode lebih ringkas dan mudah dibaca. Dalam React, pola ini sangat umum digunakan ketika menerima **props** pada Functional Component.

Memahami konsep ini akan sangat membantu ketika mulai mempelajari **React Components, Props, dan Hooks**.
