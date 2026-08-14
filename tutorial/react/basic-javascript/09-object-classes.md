---
sidebar_position: 11
title: "Object & Classes"
---


JavaScript menyediakan **Object** dan **Class** untuk membantu mengelola data serta perilaku (fungsi) yang saling berkaitan.

Konsep ini sangat penting karena React banyak menggunakan **Object** untuk menyimpan data seperti **props**, **state**, dan konfigurasi aplikasi.

---

## Object

Object adalah struktur data yang digunakan untuk menyimpan kumpulan data dalam bentuk **pasangan key-value (property)**.

Selain menyimpan data, object juga dapat menyimpan fungsi yang disebut **method**.

---

## Membuat Object

Object dapat dibuat menggunakan **Object Literal**.

```javascript
const user = {
  name: "Max",
  age: 30
};
```

Pada contoh di atas:

- `name` disebut **property**
- `age` disebut **property**

---

## Mengakses Property

Property dapat diakses menggunakan **dot notation**.

```javascript
const user = {
  name: "Max",
  age: 30
};

console.log(user.name);
console.log(user.age);
```

Output:

```text
Max
30
```

---

## Method pada Object

Selain menyimpan data, object juga dapat memiliki fungsi (*method*).

```javascript
const user = {
  name: "Max",

  greet() {
    console.log("Halo, nama saya " + this.name);
  }
};
```

Kemudian jalankan method tersebut.

```javascript
user.greet();
```

Output:

```text
Halo, nama saya Max
```

---

## Keyword `this`

Di dalam object, kita dapat menggunakan keyword `this`.

`this` mengacu pada object yang sedang digunakan.

Contoh:

```javascript
const user = {
  name: "Max",

  greet() {
    console.log(this.name);
  }
};

user.greet();
```

Output:

```text
Max
```

Pada contoh di atas:

```javascript
this.name
```

memiliki arti yang sama dengan:

```javascript
user.name
```

Namun penggunaan `this` lebih fleksibel karena tetap mengacu pada object yang sedang aktif.

---

## Apa Itu Class?

Jika Object digunakan untuk menyimpan data, maka **Class** digunakan sebagai **cetak biru (blueprint)** untuk membuat banyak object dengan struktur yang sama.

Tanpa class, kita harus membuat object satu per satu.

Contoh:

```javascript
const user1 = {
  name: "Max",
  age: 30
};

const user2 = {
  name: "Manuel",
  age: 32
};
```

Jika jumlah object semakin banyak, penulisan kode akan menjadi berulang.

Untuk mengatasinya, JavaScript menyediakan **Class**.

---

## Membuat Class

Contoh class sederhana:

```javascript
class User {

}
```

Class belum menghasilkan object.

Kita harus membuat object menggunakan keyword `new`.

---

## Constructor

Class memiliki method khusus bernama `constructor()`.

Method ini akan dijalankan secara otomatis ketika object baru dibuat.

Contoh:

```javascript
class User {

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

}
```

Parameter pada constructor digunakan untuk mengisi data object.

---

## Membuat Object dari Class

Gunakan keyword `new`.

```javascript
const user1 = new User("Max", 30);
const user2 = new User("Manuel", 32);
```

Sekarang kedua object memiliki struktur yang sama.

---

## Menambahkan Method

Class juga dapat memiliki method.

```javascript
class User {

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(
      "Halo, saya " + this.name + " berumur " + this.age + " tahun."
    );
  }

}
```

Kemudian:

```javascript
const user = new User("Max", 30);

user.greet();
```

Output:

```text
Halo, saya Max berumur 30 tahun.
```

---

## Peran Keyword `this`

Di dalam class, `this` mengacu pada **instance object** yang sedang aktif.

Contoh:

```javascript
class User {

  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(this.name);
  }

}

const user = new User("Max");

user.greet();
```

Output:

```text
Max
```

Pada contoh tersebut:

```javascript
this.name
```

mengacu pada property milik object `user`.

---

## Mengapa Menggunakan Class?

Class memberikan beberapa keuntungan, di antaranya:

- Mengurangi penulisan kode yang berulang.
- Memudahkan pembuatan banyak object dengan struktur yang sama.
- Membuat kode lebih rapi dan mudah dipelihara.
- Mempermudah pengembangan aplikasi yang lebih besar.

---

## Penggunaan Object dan Class di React

Pada React modern, **Functional Component** lebih banyak digunakan dibandingkan **Class Component**.

Namun, konsep **Object** tetap menjadi bagian yang sangat penting.

Beberapa contoh penggunaannya antara lain:

- Props

```javascript
const user = {
  name: "Max",
  age: 30
};
```

- State

```javascript
const [user, setUser] = useState({
  name: "Max",
  age: 30
});
```

- Data API

```javascript
const product = {
  id: 1,
  title: "Laptop",
  price: 12000000
};
```

Sementara itu, **Class** masih dapat dijumpai pada proyek React lama yang menggunakan **Class Component**, meskipun saat ini sebagian besar aplikasi React modern menggunakan Functional Component dan Hooks.

---

## Perbedaan Object dan Class

| Object | Class |
|--------|--------|
| Menyimpan data secara langsung | Cetak biru untuk membuat object |
| Dibuat menggunakan object literal | Dibuat menggunakan keyword `class` |
| Cocok untuk satu object | Cocok untuk membuat banyak object |
| Tidak memerlukan keyword `new` | Menggunakan keyword `new` untuk membuat instance |

---

# Kesimpulan

Object digunakan untuk menyimpan data dan fungsi dalam satu struktur yang terorganisir, sedangkan Class digunakan sebagai cetak biru untuk membuat banyak object dengan struktur yang sama.

Meskipun React modern jarang menggunakan **Class Component**, pemahaman tentang **Object** dan **Class** tetap penting karena hampir seluruh data dalam React, seperti **props**, **state**, dan hasil dari API, direpresentasikan dalam bentuk object JavaScript.
