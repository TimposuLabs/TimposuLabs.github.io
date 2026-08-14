---
sidebar_position: 14
title: "Spread Operator"
---

**Spread Operator** merupakan fitur JavaScript modern (ES6) yang menggunakan tiga titik (`...`) untuk **menyebarkan elemen dari Array atau property dari Object** ke dalam struktur data baru.

Spread Operator sangat berguna ketika kita ingin menyalin, menggabungkan, atau memperluas Array dan Object tanpa mengubah data aslinya.

---

## Spread Operator pada Array

Spread Operator dapat digunakan untuk menggabungkan beberapa array.

### Tanpa Spread Operator

Jika kita memasukkan array secara langsung ke dalam array lain, hasilnya akan menjadi **nested array**.

```javascript
const hobbies = ["Sports", "Cooking"];
const newHobbies = ["Reading"];

const mergedHobbies = [hobbies, newHobbies];

console.log(mergedHobbies);
```

Output:

```javascript
[
  ["Sports", "Cooking"],
  ["Reading"]
]
```

Array `hobbies` dan `newHobbies` tetap menjadi elemen di dalam array baru.

---

### Dengan Spread Operator

Dengan Spread Operator, isi dari masing-masing array akan disebarkan menjadi elemen individual.

```javascript
const hobbies = ["Sports", "Cooking"];
const newHobbies = ["Reading"];

const mergedHobbies = [...hobbies, ...newHobbies];

console.log(mergedHobbies);
```

Output:

```javascript
["Sports", "Cooking", "Reading"]
```

Dengan menggunakan:

```javascript
...hobbies
```

JavaScript akan mengambil seluruh elemen dari array `hobbies`.

Begitu juga:

```javascript
...newHobbies
```

akan mengambil seluruh elemen dari `newHobbies`.

---

## Menyalin Array

Spread Operator juga dapat digunakan untuk membuat salinan array.

```javascript
const hobbies = ["Sports", "Cooking", "Reading"];

const copiedHobbies = [...hobbies];

console.log(copiedHobbies);
```

Hasilnya:

```javascript
["Sports", "Cooking", "Reading"]
```

Sekarang `copiedHobbies` merupakan array baru.

```javascript
console.log(hobbies === copiedHobbies);
```

Output:

```text
false
```

Artinya, keduanya merupakan array yang berbeda.

---

## Menambahkan Elemen ke Array

Spread Operator juga dapat digunakan untuk membuat array baru sekaligus menambahkan data.

```javascript
const hobbies = ["Sports", "Cooking"];

const updatedHobbies = [...hobbies, "Reading"];

console.log(updatedHobbies);
```

Output:

```javascript
["Sports", "Cooking", "Reading"]
```

Array asli tetap tidak berubah:

```javascript
console.log(hobbies);
```

Output:

```javascript
["Sports", "Cooking"]
```

---

## Spread Operator pada Object

Spread Operator juga dapat digunakan pada Object.

Pada Object, Spread Operator akan mengambil seluruh pasangan **key-value** dan memasukkannya ke dalam Object baru.

Contoh:

```javascript
const user = {
  name: "Max",
  age: 34
};

const extendedUser = {
  isAdmin: true,
  ...user
};

console.log(extendedUser);
```

Output:

```javascript
{
  isAdmin: true,
  name: "Max",
  age: 34
}
```

Property dari `user` disebarkan ke dalam Object `extendedUser`.

---

## Menyalin Object

Sama seperti Array, Spread Operator dapat digunakan untuk membuat salinan Object.

```javascript
const user = {
  name: "Max",
  age: 34
};

const copiedUser = {
  ...user
};

console.log(copiedUser);
```

Object `copiedUser` merupakan Object baru.

```javascript
console.log(user === copiedUser);
```

Output:

```text
false
```

---

## Menambahkan Property ke Object

Kita juga dapat membuat Object baru sekaligus menambahkan property.

```javascript
const user = {
  name: "Max",
  age: 34
};

const updatedUser = {
  ...user,
  isAdmin: true
};

console.log(updatedUser);
```

Output:

```javascript
{
  name: "Max",
  age: 34,
  isAdmin: true
}
```

Object asli tidak berubah.

---

## Memperbarui Property Object

Spread Operator sangat berguna ketika ingin memperbarui property tertentu tanpa mengubah Object asli.

```javascript
const user = {
  name: "Max",
  age: 34
};

const updatedUser = {
  ...user,
  age: 35
};

console.log(updatedUser);
```

Output:

```javascript
{
  name: "Max",
  age: 35
}
```

Object `user` tetap memiliki nilai:

```javascript
{
  name: "Max",
  age: 34
}
```

---

## Urutan Spread Operator

Urutan property sangat penting ketika terdapat property dengan nama yang sama.

Contoh:

```javascript
const user = {
  name: "Max",
  age: 34
};

const updatedUser = {
  ...user,
  age: 35
};

console.log(updatedUser);
```

Hasilnya:

```javascript
{
  name: "Max",
  age: 35
}
```

Property `age: 35` menggantikan nilai `age: 34` karena ditulis **setelah** `...user`.

Sebaliknya:

```javascript
const updatedUser = {
  age: 35,
  ...user
};
```

Hasilnya:

```javascript
{
  age: 34,
  name: "Max"
}
```

Property dari `user` akan menimpa nilai sebelumnya.

---

## Spread Operator dalam React

Spread Operator sangat penting dalam React karena React sering menggunakan konsep **immutability**.

Misalnya kita memiliki state berupa Object:

```jsx
const [user, setUser] = useState({
  name: "Max",
  age: 34
});
```

Jika ingin mengubah `age`, kita tidak sebaiknya mengubah Object secara langsung.

Cara yang umum digunakan:

```jsx
setUser({
  ...user,
  age: 35
});
```

Dengan cara tersebut:

1. Object lama disalin menggunakan `...user`.
2. Property `age` diperbarui menjadi `35`.
3. React mendapatkan Object baru.
4. Object lama tetap tidak dimodifikasi.

---

## Spread Operator pada Array State

Spread Operator juga sering digunakan ketika memperbarui state berupa Array.

Contoh:

```jsx
const [hobbies, setHobbies] = useState([
  "Sports",
  "Cooking"
]);
```

Untuk menambahkan hobby baru:

```jsx
setHobbies([
  ...hobbies,
  "Reading"
]);
```

Hasilnya:

```javascript
["Sports", "Cooking", "Reading"]
```

Array lama tidak dimodifikasi secara langsung.

---

## Spread Operator vs Assignment

Perhatikan perbedaan berikut.

### Assignment

```javascript
const user = {
  name: "Max"
};

const copiedUser = user;
```

Pada contoh tersebut, `copiedUser` dan `user` merujuk pada Object yang sama.

### Spread Operator

```javascript
const user = {
  name: "Max"
};

const copiedUser = {
  ...user
};
```

Sekarang `copiedUser` merupakan Object baru.

---

## Poin Penting

Beberapa hal yang perlu diingat:

- Spread Operator menggunakan tiga titik: `...`.
- Pada Array, spread akan menyebarkan setiap elemen.
- Pada Object, spread akan menyebarkan setiap pasangan key-value.
- Spread Operator dapat digunakan untuk membuat salinan data.
- Spread Operator dapat digunakan untuk menggabungkan data.
- Spread Operator membantu menghindari mutasi data asli.
- Spread Operator sangat sering digunakan ketika mengelola state React.

---

## Kesimpulan

**Spread Operator (`...`)** merupakan fitur JavaScript yang sangat berguna untuk menyalin, menggabungkan, dan memperbarui Array maupun Object tanpa mengubah data asli secara langsung.

Dalam React, konsep ini sangat penting karena pengelolaan **state** umumnya dilakukan secara **immutable**.

Contoh paling umum:

```javascript
// Object
const updatedUser = {
  ...user,
  age: 35
};
```

dan:

```javascript
// Array
const updatedHobbies = [
  ...hobbies,
  "Reading"
];
```

Dengan memahami Spread Operator, kita akan lebih mudah memahami cara React mengelola dan memperbarui state pada materi berikutnya.
