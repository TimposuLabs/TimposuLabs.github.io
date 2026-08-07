---
sidebar_position: 12
title: "Array"
---

## Array dan Method `map()` di JavaScript

Array merupakan salah satu struktur data yang paling sering digunakan dalam JavaScript. Array memungkinkan kita menyimpan sekumpulan data di dalam satu variabel sehingga lebih mudah dikelola.

Dalam React, array sering digunakan untuk menyimpan daftar produk, pengguna, artikel, maupun komentar. Salah satu method yang paling penting untuk dipahami adalah **`map()`**, karena digunakan untuk mengubah data menjadi komponen React secara dinamis.

---

## Apa Itu Array?

Array adalah kumpulan beberapa nilai yang disimpan dalam satu variabel.

Contoh:

```javascript
const hobbies = ["Sports", "Cooking"];
```

Pada contoh di atas, variabel `hobbies` berisi dua buah data.

---

## Mengakses Data pada Array

Setiap elemen di dalam array memiliki nomor indeks.

Perlu diketahui bahwa **indeks array dimulai dari angka 0**, bukan 1.

| Indeks | Nilai |
|--------|--------|
| 0 | Sports |
| 1 | Cooking |

Contoh:

```javascript
const hobbies = ["Sports", "Cooking"];

console.log(hobbies[0]);
```

Output:

```text
Sports
```

Untuk mengakses elemen kedua:

```javascript
console.log(hobbies[1]);
```

Output:

```text
Cooking
```

---

## Menambahkan Data dengan `push()`

Method `push()` digunakan untuk menambahkan elemen baru ke bagian akhir array.

Contoh:

```javascript
const hobbies = ["Sports", "Cooking"];

hobbies.push("Reading");

console.log(hobbies);
```

Output:

```javascript
["Sports", "Cooking", "Reading"]
```

:::info
**Catatan**
Method `push()` akan **mengubah (mutate)** array asli dengan menambahkan elemen baru.
:::

---

## Method `findIndex()`

Method `findIndex()` digunakan untuk mencari **indeks** suatu elemen berdasarkan kondisi tertentu.

Sintaks:

```javascript
array.findIndex(callback);
```

Contoh:

```javascript
const hobbies = ["Sports", "Cooking", "Reading"];

const index = hobbies.findIndex((item) => {
  return item === "Cooking";
});

console.log(index);
```

Output:

```text
1
```

Karena `"Cooking"` berada pada indeks ke-1, maka hasilnya adalah `1`.

Jika data tidak ditemukan:

```javascript
const index = hobbies.findIndex((item) => item === "Gaming");

console.log(index);
```

Output:

```text
-1
```

Nilai `-1` menandakan bahwa elemen tersebut tidak ditemukan di dalam array.

---

## Method `map()`

Method `map()` digunakan untuk **mengubah (transform)** setiap elemen di dalam array menjadi bentuk baru.

Berbeda dengan `push()`, method `map()` **tidak mengubah array asli**, melainkan menghasilkan **array baru**.

Sintaks:

```javascript
array.map(callback);
```

---

## Contoh Mengubah Nilai String

Misalnya kita ingin menambahkan tanda seru (`!`) pada setiap elemen array.

```javascript
const hobbies = ["Sports", "Cooking", "Reading"];

const editedHobbies = hobbies.map((item) => item + "!");

console.log(editedHobbies);
```

Output:

```javascript
["Sports!", "Cooking!", "Reading!"]
```

Perhatikan bahwa array asli tidak berubah.

```javascript
console.log(hobbies);
```

Output:

```javascript
["Sports", "Cooking", "Reading"]
```

---

## Mengubah Array Menjadi Object

Method `map()` juga sering digunakan untuk mengubah setiap elemen menjadi object.

Contoh:

```javascript
const hobbies = ["Sports", "Cooking", "Reading"];

const hobbyObjects = hobbies.map((item) => ({
  text: item
}));

console.log(hobbyObjects);
```

Output:

```javascript
[
  { text: "Sports" },
  { text: "Cooking" },
  { text: "Reading" }
]
```

Teknik ini sering digunakan ketika data akan dikirim ke komponen React.

---

## Contoh Lain Menggunakan `map()`

Misalkan kita memiliki array angka.

```javascript
const numbers = [1, 2, 3, 4, 5];
```

Kita ingin mengalikan setiap angka dengan 2.

```javascript
const doubled = numbers.map((number) => number * 2);

console.log(doubled);
```

Output:

```javascript
[2, 4, 6, 8, 10]
```

Array asli tetap tidak berubah.

```javascript
console.log(numbers);
```

Output:

```javascript
[1, 2, 3, 4, 5]
```

---

## Mengapa `map()` Sangat Penting di React?

Salah satu penggunaan utama `map()` di React adalah untuk menampilkan daftar data secara dinamis.

Misalnya kita memiliki data produk.

```javascript
const products = [
  {
    id: 1,
    title: "Laptop"
  },
  {
    id: 2,
    title: "Mouse"
  },
  {
    id: 3,
    title: "Keyboard"
  }
];
```

Di React, data tersebut dapat diubah menjadi daftar komponen menggunakan `map()`.

```jsx
const productItems = products.map((product) => (
  <li key={product.id}>
    {product.title}
  </li>
));
```

Setiap elemen pada array akan diubah menjadi elemen JSX yang nantinya ditampilkan di browser.

Inilah alasan mengapa `map()` merupakan salah satu method yang paling sering digunakan dalam React.

---

## Perbedaan `push()` dan `map()`

| Method | Fungsi | Mengubah Array Asli |
|---------|--------|---------------------|
| `push()` | Menambahkan elemen baru | ✅ Ya |
| `map()` | Mengubah setiap elemen menjadi bentuk baru | ❌ Tidak |

---

## Ringkasan

| Method | Kegunaan |
|---------|----------|
| `push()` | Menambahkan data ke akhir array |
| `findIndex()` | Mencari indeks berdasarkan kondisi |
| `map()` | Mengubah setiap elemen menjadi array baru |

---

## Kesimpulan

Array digunakan untuk menyimpan sekumpulan data di dalam satu variabel. JavaScript menyediakan berbagai method untuk mengolah array, seperti `push()`, `findIndex()`, dan `map()`.

Di antara ketiganya, **`map()`** merupakan method yang paling penting dalam React karena digunakan untuk mengubah data menjadi daftar komponen secara dinamis. Selain itu, `map()` bersifat **non-mutating**, sehingga tidak mengubah array asli dan selalu menghasilkan array baru sebagai hasil transformasi.
