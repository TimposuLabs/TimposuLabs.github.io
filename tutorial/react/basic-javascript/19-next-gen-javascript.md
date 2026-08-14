---
sidebar_position: 20
title: "Fitur JavaScript Modern"
---

JavaScript terus berkembang dengan berbagai fitur modern yang membuat penulisan kode menjadi lebih singkat, terstruktur, dan mudah dipelihara.

Fitur-fitur modern ini banyak digunakan dalam pengembangan React. Oleh karena itu, memahami konsep-konsep berikut akan sangat membantu sebelum mulai membangun aplikasi React.

---

## 1. `let` dan `const`

`let` dan `const` merupakan cara modern untuk mendeklarasikan variabel di JavaScript dan umumnya digunakan sebagai pengganti `var`.

### `let`

Gunakan `let` jika nilai variabel dapat berubah atau di-*reassign*.

```javascript
let userName = "Max";

userName = "John";

console.log(userName);
```

Output:

```text
John
```

### `const`

Gunakan `const` jika variabel tidak perlu di-*reassign*.

```javascript
const userName = "Max";

console.log(userName);
```

Kode berikut akan menghasilkan error:

```javascript
const userName = "Max";

userName = "John";
```

> **Catatan:** `const` mencegah *reassignment* terhadap variabel, tetapi tidak otomatis membuat Object atau Array menjadi immutable.

---

## 2. Arrow Function

**Arrow Function** merupakan sintaks modern untuk menulis fungsi dengan cara yang lebih ringkas.

Contoh:

```javascript
const callMe = (name) => {
  console.log(name);
};
```

Arrow Function sangat sering digunakan dalam React, terutama untuk event handler dan array methods seperti `map()`.

---

### Arrow Function Tanpa Parameter

Jika tidak memiliki parameter, tanda kurung kosong wajib digunakan.

```javascript
const sayHello = () => {
  console.log("Hello World");
};
```

---

### Arrow Function dengan Satu Parameter

Jika hanya memiliki satu parameter, tanda kurung dapat dihilangkan.

```javascript
const greet = name => {
  console.log(name);
};
```

Penulisan berikut juga valid:

```javascript
const greet = (name) => {
  console.log(name);
};
```

---

### Implicit Return

Jika fungsi hanya mengembalikan satu expression, kita dapat menghilangkan `{}` dan `return`.

```javascript
const double = num => num * 2;
```

Contoh:

```javascript
console.log(double(5));
```

Output:

```text
10
```

---

## 3. Export dan Import (JavaScript Modules)

JavaScript memungkinkan kita membagi kode menjadi beberapa file menggunakan **Module**.

Dengan `export` dan `import`, kita dapat menggunakan fungsi, variabel, class, atau komponen dari file lain.

---

### Default Export

Satu file hanya dapat memiliki **satu default export**.

Contoh:

```javascript
// person.js

const Person = {
  name: "Max"
};

export default Person;
```

Kemudian di file lain:

```javascript
// app.js

import Person from "./person.js";
```

Nama yang digunakan saat import dapat berbeda dari nama aslinya.

Contoh:

```javascript
import User from "./person.js";
```

Tetap valid karena menggunakan Default Export.

---

### Named Export

Satu file dapat memiliki **banyak Named Export**.

Contoh:

```javascript
// utility.js

export const clean = () => {
  console.log("Cleaning...");
};

export const calculate = () => {
  console.log("Calculating...");
};
```

Kemudian:

```javascript
import { clean, calculate } from "./utility.js";
```

Nama yang digunakan saat import harus sesuai dengan nama yang diekspor.

---

### Menggunakan Alias

Kita dapat mengganti nama Named Export menggunakan `as`.

```javascript
import { clean as cleanData } from "./utility.js";
```

Sekarang fungsi tersebut dapat digunakan dengan nama:

```javascript
cleanData();
```

---

### Import Semua Export

Kita juga dapat mengimpor seluruh Named Export sebagai satu object.

```javascript
import * as Utility from "./utility.js";

Utility.clean();
Utility.calculate();
```

---

## 4. Classes

**Class** merupakan blueprint atau cetak biru yang digunakan untuk membuat Object dengan struktur dan perilaku yang sama.

Contoh:

```javascript
class Human {
  species = "human";
}
```

Kita dapat membuat class lain yang mewarisi class tersebut menggunakan `extends`.

```javascript
class Person extends Human {
  name = "Max";

  printMyName = () => {
    console.log(this.name);
  };
}
```

Kemudian buat instance:

```javascript
const person = new Person();

person.printMyName();
console.log(person.species);
```

Output:

```text
Max
human
```

Pada contoh tersebut:

- `Human` adalah parent class.
- `Person` adalah child class.
- `extends` digunakan untuk inheritance.
- `new Person()` membuat instance baru.

> **Catatan:** Dalam React modern, Functional Component lebih umum digunakan daripada Class Component. Namun, pemahaman mengenai Class tetap penting karena merupakan bagian dari JavaScript.

---

## 5. Spread dan Rest Operator

Spread dan Rest Operator menggunakan simbol yang sama:

```javascript
...
```

Namun, fungsinya berbeda tergantung konteks penggunaannya.

---

### Spread Operator

**Spread Operator** digunakan untuk menyebarkan elemen Array atau property Object ke dalam struktur baru.

### Spread pada Array

```javascript
const oldArray = [1, 2, 3];

const newArray = [
  ...oldArray,
  4,
  5
];

console.log(newArray);
```

Output:

```javascript
[1, 2, 3, 4, 5]
```

---

### Spread pada Object

```javascript
const oldObj = {
  name: "Max"
};

const newObj = {
  ...oldObj,
  age: 28
};

console.log(newObj);
```

Output:

```javascript
{
  name: "Max",
  age: 28
}
```

Spread Operator sering digunakan untuk membuat salinan Array atau Object dan memperbarui data tanpa mengubah data asli.

---

### Rest Operator

**Rest Operator** digunakan untuk mengumpulkan beberapa nilai atau argumen menjadi satu Array.

Contoh:

```javascript
const add = (...numbers) => {
  console.log(numbers);
};

add(1, 2, 3, 4);
```

Output:

```javascript
[1, 2, 3, 4]
```

Pada contoh tersebut:

```javascript
...numbers
```

mengumpulkan seluruh argumen yang diberikan ke dalam Array `numbers`.

---

### Spread vs Rest

Meskipun menggunakan simbol yang sama, keduanya memiliki fungsi berbeda.

| Operator | Fungsi |
|----------|--------|
| Spread `...` | Menyebarkan isi Array/Object |
| Rest `...` | Mengumpulkan beberapa nilai menjadi satu Array |

Contoh Spread:

```javascript
const numbers = [1, 2, 3];

const newNumbers = [...numbers, 4];
```

Contoh Rest:

```javascript
function sum(...numbers) {
  // ...
}
```

---

## 6. Destructuring

**Destructuring** digunakan untuk mengambil nilai dari Array atau Object dan menyimpannya langsung ke dalam variabel.

Fitur ini membuat kode menjadi lebih ringkas dan sangat sering digunakan dalam React.

---

### Array Destructuring

Contoh:

```javascript
const numbers = [1, 2, 3];

const [num1, num2] = numbers;

console.log(num1);
console.log(num2);
```

Output:

```text
1
2
```

Nilai diambil berdasarkan posisi atau indeks.

---

### Object Destructuring

Object Destructuring digunakan untuk mengambil property dari Object.

```javascript
const person = {
  name: "Max",
  age: 28
};

const { name } = person;

console.log(name);
```

Output:

```text
Max
```

Berbeda dengan Array Destructuring, Object Destructuring menggunakan **nama property**, bukan posisi.

---

### Destructuring pada Parameter Function

Destructuring juga dapat digunakan langsung pada parameter function.

```javascript
const printName = ({ name }) => {
  console.log(name);
};

printName({
  name: "Max",
  age: 28
});
```

Output:

```text
Max
```

Function tersebut menerima satu Object sebagai argumen dan langsung mengambil property `name`.

Teknik ini sangat sering digunakan dalam React ketika menerima **props**.

Contoh:

```jsx
function User({ name, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{age}</p>
    </div>
  );
}
```

---

## Ringkasan JavaScript Modern

| Fitur | Kegunaan |
|-------|----------|
| `let` | Variabel yang dapat di-*reassign* |
| `const` | Variabel yang tidak di-*reassign* |
| Arrow Function | Menulis fungsi dengan sintaks ringkas |
| `import` | Menggunakan kode dari module lain |
| `export` | Membagikan kode dari sebuah module |
| Class | Blueprint untuk membuat Object |
| Spread `...` | Menyebarkan Array/Object |
| Rest `...` | Mengumpulkan beberapa nilai menjadi Array |
| Destructuring | Mengambil nilai dari Array/Object |

---

## Kesimpulan

JavaScript modern menyediakan berbagai fitur yang membuat kode menjadi lebih ringkas, terstruktur, dan mudah dipelihara.

Fitur seperti **Arrow Function, Modules, Spread Operator, Rest Operator, dan Destructuring** akan sering kita gunakan ketika membangun aplikasi React.

Karena itu, pastikan Anda memahami konsep-konsep tersebut sebelum melanjutkan ke materi React berikutnya.
