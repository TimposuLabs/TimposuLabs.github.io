---
sidebar_position: 19
title: "Primitive vs Reference Values"
---

JavaScript memiliki cara yang berbeda dalam menangani **Primitive Values** dan **Reference Values**. Memahami perbedaan ini sangat penting karena akan berpengaruh ketika kita menyalin, mengubah, dan membandingkan data.

Konsep ini juga sangat penting dalam React, terutama ketika bekerja dengan **state**, **object**, dan **array**.

---

## Primitive Values

**Primitive Values** adalah nilai dasar yang disediakan oleh JavaScript.

Jenis data primitive meliputi:

- `String`
- `Number`
- `Boolean`
- `null`
- `undefined`
- `Symbol`
- `BigInt`

Contoh:

```javascript
let userMessage = "Hello!";
let age = 30;
let isLoggedIn = true;
```

---

## Sifat Primitive Values

Nilai primitive bersifat **immutable**, yang berarti nilai tersebut tidak dapat diubah secara langsung.

Misalnya:

```javascript
let userMessage = "Hello!";
```

Kita dapat menggunakan method pada string:

```javascript
const newMessage = userMessage.concat(" World");
```

Hasilnya:

```text
Hello! World
```

Namun nilai asli tetap:

```javascript
console.log(userMessage);
```

Output:

```text
Hello!
```

Method `concat()` tidak mengubah string asli. JavaScript menghasilkan **nilai string baru**.

---

## Menimpa Nilai Primitive

Meskipun nilai primitive bersifat immutable, variabel yang menyimpannya tetap dapat diberikan nilai baru jika menggunakan `let`.

Contoh:

```javascript
let userMessage = "Hello!";

userMessage = "Hello World!";

console.log(userMessage);
```

Output:

```text
Hello World!
```

Yang terjadi bukanlah string `"Hello!"` diubah menjadi `"Hello World!"`, melainkan variabel `userMessage` sekarang menyimpan nilai baru.

---

## Reference Values

**Reference Values** merupakan data yang disimpan dan diakses melalui sebuah **referensi**.

Jenis data yang termasuk reference values antara lain:

- `Object`
- `Array`
- `Function`

Contoh Object:

```javascript
const user = {
  name: "Max",
  age: 30
};
```

Contoh Array:

```javascript
const hobbies = [
  "Sports",
  "Cooking"
];
```

---

## Cara Kerja Reference Values

Berbeda dengan primitive value, variabel yang menyimpan object atau array bekerja menggunakan **referensi** ke data tersebut.

Contohnya:

```javascript
const hobbies = [
  "Sports",
  "Cooking"
];
```

Variabel `hobbies` merujuk pada array tersebut.

Ketika kita menggunakan method seperti `push()`:

```javascript
hobbies.push("Reading");
```

isi array berubah.

```javascript
console.log(hobbies);
```

Output:

```javascript
[
  "Sports",
  "Cooking",
  "Reading"
]
```

Array yang sama telah dimodifikasi.

---

## Mutable vs Immutable

Perbedaan utama antara Primitive Values dan Reference Values dapat dilihat dari sifatnya.

| Primitive Values | Reference Values |
|------------------|------------------|
| Immutable | Mutable |
| Nilai tidak dapat diubah langsung | Isi Object/Array dapat diubah |
| Contoh: String, Number, Boolean | Contoh: Object, Array, Function |
| Operasi menghasilkan nilai baru | Method tertentu dapat mengubah data asli |

---

## Mengapa `const` Bisa Digunakan untuk Array?

Pertanyaan yang sering muncul adalah:

> Jika menggunakan `const`, mengapa isi array masih bisa diubah?

Contoh:

```javascript
const hobbies = [
  "Sports",
  "Cooking"
];

hobbies.push("Reading");
```

Kode tersebut **valid**.

Namun:

```javascript
hobbies = [
  "Sports",
  "Cooking",
  "Reading"
];
```

akan menghasilkan error.

---

## Mengapa?

`const` mencegah variabel untuk **diberikan referensi baru**.

Contoh:

```javascript
const hobbies = [
  "Sports",
  "Cooking"
];
```

Kita tidak boleh membuat variabel `hobbies` menunjuk ke array yang berbeda:

```javascript
hobbies = ["Reading"];
```

Namun kita masih dapat mengubah isi array yang sedang dirujuk:

```javascript
hobbies.push("Reading");
```

Jadi, `const` tidak membuat isi Object atau Array menjadi immutable.

`const` hanya mencegah **reassignment terhadap variabel**.

---

## Contoh dengan Object

Hal yang sama berlaku pada Object.

```javascript
const user = {
  name: "Max",
  age: 30
};
```

Kita masih dapat mengubah property:

```javascript
user.age = 31;
```

Hasil:

```javascript
{
  name: "Max",
  age: 31
}
```

Tetapi kita tidak dapat mengganti Object secara keseluruhan:

```javascript
user = {
  name: "John",
  age: 25
};
```

Kode tersebut akan menghasilkan error karena `user` dideklarasikan menggunakan `const`.

---

## Menyalin Primitive Value

Primitive value biasanya disalin berdasarkan nilainya.

Contoh:

```javascript
let name = "Max";
let anotherName = name;

anotherName = "John";

console.log(name);
console.log(anotherName);
```

Output:

```text
Max
John
```

Mengubah `anotherName` tidak memengaruhi `name`.

---

## Menyalin Reference Value

Berbeda dengan primitive value, ketika Object atau Array disalin menggunakan assignment biasa, kita mendapatkan referensi yang sama.

Contoh:

```javascript
const hobbies = [
  "Sports",
  "Cooking"
];

const copiedHobbies = hobbies;

copiedHobbies.push("Reading");
```

Sekarang:

```javascript
console.log(hobbies);
```

Output:

```javascript
[
  "Sports",
  "Cooking",
  "Reading"
]
```

Dan:

```javascript
console.log(copiedHobbies);
```

juga menghasilkan:

```javascript
[
  "Sports",
  "Cooking",
  "Reading"
]
```

Mengapa?

Karena `hobbies` dan `copiedHobbies` merujuk pada **Array yang sama**.

---

## Membuat Salinan Array

Untuk membuat Array baru, kita dapat menggunakan [Spread Operator](/react/basic-javascript/spread-operator).

```javascript
const hobbies = [
  "Sports",
  "Cooking"
];

const copiedHobbies = [
  ...hobbies
];
```

Sekarang keduanya merupakan Array yang berbeda.

```javascript
copiedHobbies.push("Reading");

console.log(hobbies);
```

Output:

```javascript
[
  "Sports",
  "Cooking"
]
```

Sedangkan:

```javascript
console.log(copiedHobbies);
```

Output:

```javascript
[
  "Sports",
  "Cooking",
  "Reading"
]
```

---

## Mengapa Konsep Ini Penting di React?

React sangat bergantung pada konsep **immutability**, terutama ketika bekerja dengan state.

Misalnya:

```jsx
const [user, setUser] = useState({
  name: "Max",
  age: 30
});
```

Ketika ingin memperbarui `age`, kita biasanya membuat Object baru menggunakan Spread Operator:

```jsx
setUser({
  ...user,
  age: 31
});
```

Bukan:

```jsx
user.age = 31;
```

Dengan membuat Object baru, React dapat lebih mudah mendeteksi bahwa state telah berubah.

Hal yang sama berlaku untuk Array:

```jsx
setHobbies([
  ...hobbies,
  "Reading"
]);
```

---

## Poin Penting

### Primitive Value

```javascript
const name = "Max";
```

- Menyimpan nilai primitive.
- Bersifat immutable.
- Perubahan menghasilkan nilai baru.

### Reference Value

```javascript
const user = {
  name: "Max"
};
```

- Object disimpan dan diakses melalui referensi.
- Isi Object dapat dimodifikasi.
- Assignment biasa dapat membuat beberapa variabel merujuk Object yang sama.

### `const`

```javascript
const user = {};
```

`const` mencegah **reassignment**, tetapi tidak otomatis membuat isi Object atau Array immutable.

---

## Kesimpulan

Perbedaan antara **Primitive Values** dan **Reference Values** merupakan konsep fundamental dalam JavaScript.

Secara sederhana:

- **Primitive** → bekerja berdasarkan nilai dan bersifat immutable.
- **Reference** → Object, Array, dan Function bekerja melalui referensi dan isinya dapat dimodifikasi.
- **`const`** → mencegah variabel menunjuk ke nilai atau referensi baru, tetapi tidak membuat Object atau Array menjadi immutable.

Memahami konsep ini sangat penting sebelum mempelajari React karena pengelolaan **state** sangat berkaitan dengan perubahan data, referensi, dan prinsip **immutability**.
