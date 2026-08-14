---
sidebar_position: 20
title: "JavaScript Array Functions"
---

Array merupakan salah satu struktur data yang paling sering digunakan dalam JavaScript. Dalam pengembangan React, Array digunakan untuk menyimpan dan mengolah berbagai jenis data seperti produk, pengguna, artikel, dan daftar lainnya.

React juga sangat mengutamakan prinsip **immutability**, yaitu tidak mengubah data asli secara langsung. Karena itu, kita perlu memahami berbagai Array Method yang dapat menghasilkan data baru tanpa memodifikasi Array asli.

---

## Mengapa Array Method Penting di React?

Beberapa Array Method yang sangat sering digunakan dalam React antara lain:

- `map()`
- `filter()`
- `find()`
- `findIndex()`
- `reduce()`
- `concat()`
- `slice()`

Method-method tersebut memungkinkan kita memproses dan mengubah data dengan cara yang lebih aman dan mudah dipahami.

---

## 1. `map()` - Mentransformasi Setiap Elemen

Method `map()` digunakan untuk mengubah setiap elemen Array menjadi nilai baru.

Hasilnya adalah **Array baru dengan jumlah elemen yang sama**.

Contoh:

```javascript
const numbers = [1, 2, 3];

const doubled = numbers.map(num => num * 2);

console.log(doubled);
```

Output:

```javascript
[2, 4, 6]
```

Array asli tetap tidak berubah:

```javascript
console.log(numbers);
```

Output:

```javascript
[1, 2, 3]
```

---

### `map()` dalam React

`map()` sangat sering digunakan untuk melakukan **Rendering List**.

Contoh:

```jsx
const items = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" },
  { id: 3, name: "Keyboard" }
];

function ProductList() {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

Setiap object dalam Array diubah menjadi elemen JSX.

---

## 2. `filter()` - Menyaring Elemen

Method `filter()` digunakan untuk menyaring Array berdasarkan suatu kondisi.

Method ini menghasilkan **Array baru** yang hanya berisi elemen yang memenuhi kondisi.

Contoh:

```javascript
const ages = [12, 18, 25, 8];

const adults = ages.filter(age => age >= 18);

console.log(adults);
```

Output:

```javascript
[18, 25]
```

Array asli tetap tidak berubah.

---

### `filter()` untuk Menghapus Data

Misalnya kita memiliki daftar user:

```javascript
const users = [
  { id: 1, name: "Max" },
  { id: 2, name: "Manu" },
  { id: 3, name: "John" }
];
```

Kita ingin menghapus user dengan `id` 2.

```javascript
const updatedUsers = users.filter(
  user => user.id !== 2
);

console.log(updatedUsers);
```

Hasil:

```javascript
[
  { id: 1, name: "Max" },
  { id: 3, name: "John" }
]
```

Teknik seperti ini sangat umum digunakan ketika mengelola state Array di React.

---

## 3. `find()` - Mencari Satu Elemen

Method `find()` digunakan untuk mencari **elemen pertama** yang memenuhi kondisi tertentu.

Jika elemen ditemukan, `find()` mengembalikan elemen tersebut.

Jika tidak ditemukan, hasilnya adalah `undefined`.

Contoh:

```javascript
const users = [
  { id: 1, name: "Max" },
  { id: 2, name: "Manu" }
];

const user = users.find(
  user => user.id === 2
);

console.log(user);
```

Output:

```javascript
{
  id: 2,
  name: "Manu"
}
```

Jika tidak ditemukan:

```javascript
const user = users.find(
  user => user.id === 10
);

console.log(user);
```

Output:

```text
undefined
```

---

## 4. `findIndex()` - Mencari Posisi Elemen

Method `findIndex()` digunakan untuk mencari **indeks pertama** dari elemen yang memenuhi kondisi.

Jika tidak ditemukan, hasilnya adalah `-1`.

Contoh:

```javascript
const users = [
  { id: 1, name: "Max" },
  { id: 2, name: "Manu" }
];

const index = users.findIndex(
  user => user.id === 2
);

console.log(index);
```

Output:

```text
1
```

Karena user dengan `id` 2 berada pada indeks `1`.

Jika tidak ditemukan:

```javascript
const index = users.findIndex(
  user => user.id === 10
);

console.log(index);
```

Output:

```text
-1
```

---

## `find()` vs `findIndex()`

| Method | Hasil jika ditemukan | Jika tidak ditemukan |
|--------|----------------------|----------------------|
| `find()` | Elemen | `undefined` |
| `findIndex()` | Indeks elemen | `-1` |

Contoh:

```javascript
const user = users.find(
  user => user.id === 2
);
```

Menghasilkan:

```javascript
{ id: 2, name: "Manu" }
```

Sedangkan:

```javascript
const index = users.findIndex(
  user => user.id === 2
);
```

Menghasilkan:

```text
1
```

---

## 5. `reduce()` - Mengakumulasi Data

Method `reduce()` digunakan untuk mengolah seluruh elemen Array menjadi **satu nilai**.

Nilai hasil akhirnya dapat berupa:

- Number
- String
- Object
- Array
- Nilai lainnya

Contoh sederhana untuk menghitung total:

```javascript
const prices = [10, 20, 30];

const total = prices.reduce(
  (sum, price) => sum + price,
  0
);

console.log(total);
```

Output:

```text
60
```

Pada contoh tersebut:

- `sum` → nilai akumulator.
- `price` → nilai elemen saat ini.
- `0` → nilai awal akumulator.

---

### Contoh `reduce()` untuk Total Belanja

```javascript
const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Mouse", price: 50 },
  { name: "Keyboard", price: 100 }
];

const total = cart.reduce(
  (sum, item) => sum + item.price,
  0
);

console.log(total);
```

Output:

```text
1150
```

Teknik seperti ini dapat digunakan untuk menghitung total harga dalam aplikasi e-commerce.

---

## 6. `concat()` - Menggabungkan Array

Method `concat()` digunakan untuk menggabungkan dua atau lebih Array.

Method ini menghasilkan **Array baru** tanpa mengubah Array asli.

Contoh:

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];

const combined = arr1.concat(arr2);

console.log(combined);
```

Output:

```javascript
[1, 2, 3, 4]
```

Array asli tetap tidak berubah.

---

## 7. `slice()` - Mengambil Sebagian Array

Method `slice()` digunakan untuk mengambil sebagian elemen dari Array.

Method ini menghasilkan **Array baru** dan tidak mengubah Array asli.

Contoh:

```javascript
const letters = ["a", "b", "c", "d"];

const part = letters.slice(1, 3);

console.log(part);
```

Output:

```javascript
["b", "c"]
```

Perhatikan bahwa indeks akhir `3` tidak termasuk.

Artinya:

```text
index 1 → "b" ✓
index 2 → "c" ✓
index 3 → "d" ✗
```

---

## 8. `splice()` vs `slice()`

Kedua method ini memiliki nama yang hampir sama, tetapi perilakunya berbeda.

### `slice()`

`slice()` **tidak mengubah Array asli**.

```javascript
const numbers = [1, 2, 3, 4];

const result = numbers.slice(1, 3);

console.log(result);
```

Output:

```javascript
[2, 3]
```

Array asli:

```javascript
[1, 2, 3, 4]
```

tetap tidak berubah.

---

### `splice()`

Berbeda dengan `slice()`, `splice()` **mengubah Array asli**.

Contoh:

```javascript
const numbers = [1, 2, 3, 4];

numbers.splice(1, 2);

console.log(numbers);
```

Output:

```javascript
[1, 4]
```

Elemen pada indeks `1` dan `2` telah dihapus dari Array asli.

---

## Menggunakan `splice()` dengan Aman di React

Karena `splice()` memutasi Array asli, sebaiknya jangan langsung digunakan pada state React.

Jika memang perlu menggunakan `splice()`, buat salinan Array terlebih dahulu.

Contoh:

```javascript
const numbers = [1, 2, 3, 4];

const copiedNumbers = [...numbers];

copiedNumbers.splice(1, 2);

console.log(copiedNumbers);
```

Output:

```javascript
[1, 4]
```

Array asli tetap:

```javascript
[1, 2, 3, 4]
```

Namun, dalam banyak kasus React, kita dapat memilih method non-mutating seperti `filter()` atau `slice()` agar kode lebih mudah dipahami.

---

## Array Method dan Immutability

Method yang menghasilkan Array baru sangat berguna dalam React karena membantu menjaga prinsip **immutability**.

Beberapa method yang umumnya tidak memutasi Array asli:

| Method | Kegunaan |
|--------|----------|
| `map()` | Mengubah setiap elemen |
| `filter()` | Menyaring elemen |
| `find()` | Mencari elemen |
| `findIndex()` | Mencari indeks |
| `concat()` | Menggabungkan Array |
| `slice()` | Mengambil sebagian Array |
| `reduce()` | Menghasilkan satu nilai |

Sedangkan beberapa method yang dapat memutasi Array asli antara lain:

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

---

## Ringkasan Array Methods

| Method | Fungsi | Mengubah Array Asli? |
|--------|--------|----------------------|
| `map()` | Transformasi setiap elemen | ❌ |
| `filter()` | Menyaring elemen | ❌ |
| `find()` | Mencari elemen pertama | ❌ |
| `findIndex()` | Mencari indeks pertama | ❌ |
| `reduce()` | Menghasilkan satu nilai | ❌ |
| `concat()` | Menggabungkan Array | ❌ |
| `slice()` | Mengambil sebagian Array | ❌ |
| `splice()` | Menghapus/menambahkan elemen | ✅ |

---

## Penggunaan dalam React

Array Method sangat sering digunakan dalam berbagai kebutuhan React.

### Rendering List

Gunakan `map()`:

```jsx
{products.map(product => (
  <Product
    key={product.id}
    {...product}
  />
))}
```

### Filtering Data

Gunakan `filter()`:

```javascript
const activeUsers = users.filter(
  user => user.isActive
);
```

### Mencari Data

Gunakan `find()`:

```javascript
const product = products.find(
  product => product.id === productId
);
```

### Menghitung Total

Gunakan `reduce()`:

```javascript
const total = cart.reduce(
  (sum, item) => sum + item.price,
  0
);
```

---

## Kesimpulan

Memahami Array Method merupakan bagian penting sebelum mempelajari React lebih lanjut.

Method yang paling penting untuk dikuasai adalah:

- **`map()`** → mengubah setiap elemen.
- **`filter()`** → menyaring data.
- **`find()`** → mencari satu elemen.
- **`findIndex()`** → mencari posisi elemen.
- **`reduce()`** → mengolah Array menjadi satu nilai.
- **`concat()`** → menggabungkan Array.
- **`slice()`** → mengambil sebagian Array.
- **`splice()`** → memodifikasi Array secara langsung.

Khusus dalam React, biasakan menggunakan pendekatan **immutable** dan berhati-hati terhadap method yang dapat memodifikasi Array asli.
