---
sidebar_position: 8
title: 'Middleware'
---

Middleware adalah function yang bisa digunakan untuk mengakses `request object`, `response object` dan `next function` dalam siklus aplikasi Express.js. Jika Middleware memanggil `next` function, artinya akan dilankutkan ke function Middleware selanjutnya atau Router akan dieksekusi.

## 📚 Middleware Stack

![Middleware Stack](/img/nodejs/middleware.png)

_Source: [developer.okta.com](https://developer.okta.com/blog/2018/09/13/build-and-understand-express-middleware-through-examples)_

## ✍️ Fungsi Middleware

1. Eksekusi kode sebelum sebelum router di eksekusi (misalnya, logging, autentikasi).
2. Mengubah Request atau Response object sebelum router di eksekusi (misalnya, menambahkan properti ke `req`, mengatur header).
3. Mengakhiri response tanpa harus mengeksekusi router (misalnya, jika otorisasi gagal, middleware dapat mengirimkan response _error 403_).
4. Memanggil fungsi middleware berikutnya dalam stack dengan memanggil `next()`. Jika `next()` tidak dipanggil, siklus akan terhenti di middleware tersebut.

## 💡 Penggunaan Umum Middleware

Middleware sering digunakan untuk:

1. **Logging** (Pencatatan): Mencatat setiap permintaan yang masuk.
2. **Otentikasi/Otorisasi**: Memeriksa apakah pengguna sudah login atau memiliki izin yang tepat sebelum mengizinkan akses ke rute.
3. **Validasi Data**: Memastikan data dalam `req.body` valid sebelum data diproses oleh router.
4. **Kompresi**: Mengompres response sebelum dikirim ke klien (menggunakan library seperti compression).


## 📊 Ilustrasi Siklus Request dan Middleware

![Middleware Stack](/img/nodejs/middleware2.png)

_Source: https://dev.to/ghvstcode/understanding-express-middleware-a-beginners-guide-g73_

### ☝️ Penjelasan Siklus Middleware (Alur Request)

Berikut penjelasan alur siklus Middleware pada contoh kasus di atas pada aplikasi Express.js.

1. Klien (Browser/Aplikasi) mengirimkan Request HTTP ke server Express.js.
2. Middleware 1 __Logging__: Request diterima dan melewati middleware pertama (melakukan logging).
    * Jika Middleware 1 memanggil `next()` dan permintaan berlanjut ke tahap berikutnya.
    * Jika Middleware 1 mengirimkan response (misalnya, `res.send()`), siklus berakhir dan response dikirim kembali ke Klien.
3. Middleware 2 __User Auth__: Permintaan melewati middleware kedua (melakukan autentikasi)
    * Jika autentikasi berhasil Middleware 2, yang mungkin akan menambahkan informasi pengguna ke object `req` (misalnya, `req.user = user_data`) sebelum memanggil `next()`.
    * Jika autentikasi gagal Middleware 2 mengirim response error dan siklus berakhir (misalnya, `res.status(401).send('Unauthorized')` atau `res.end()`).
4. Middleware 3 __JSON Parsing__: Permintaan melewati middleware ketiga (melakukan _body-parser_ untuk memproses data JSON).
    * Permintaan bergerak ke Middleware 3 JSON Parsing (biasanya menggunakan `express.json()`), middleware ini akan menguraikan string JSON tersebut dan mengubahnya menjadi objek JavaScript, menyimpannya di `req.body`.
    * Selanjutnya akan memanggil `next()`.
5. Middleware 4 __Static Files__: Permintaan mencapai middleware Static Files (biasanya menggunakan `express.static()`). Middleware ini memeriksa apakah URL permintaan sesuai dengan file statis (seperti gambar, CSS, atau JavaScript) di folder statis aplikasi.
    * Jika ditemukan file yang cocok, middleware ini akan mengakhiri siklus dengan segera mengirimkan HTTP Response yang berisi file tersebut.
    * Jika tidak ada file statis yang cocok, panggil `next()`.
6. Handler Rute (__App Routing__): Jika permintaan telah melewati semua middleware dan belum diakhiri, permintaan mencapai App Routing (Penentuan Rute Aplikasi), yaitu handler rute yang sesuai dengan URL permintaan (`app.get('/users', ...)`).
    * Ini adalah tujuan akhir dari permintaan untuk logika bisnis. Handler rute akan memproses permintaan (misalnya, mengambil data dari database).
    * Fungsi ini WAJIB mengakhiri siklus dengan mengirimkan HTTP Response (misalnya, `res.send()`, `res.json()`, atau `res.render()`).
7. Mengembalikan __HTTP Response__: Setelah salah satu fungsi (baik itu middleware statis, handler otentikasi, atau handler rute) mengirimkan response, siklus berakhir, dan HTTP Response dikirim kembali ke klien.

## ⚙️ Function Middleware

Semua fungsi middleware di Express.js memiliki format dasar:

```js
(req, res, next) => {
    // Jalankan kode di sini
    console.log('Permintaan masuk pada:', Date.now());

    // Panggil next() untuk melanjutkan ke middleware berikutnya atau handler rute
    next();
}
```

* `req` (request): Objek permintaan HTTP.
* `res` (response): Objek respons HTTP.
* `next` : Fungsi yang dipanggil untuk melanjutkan eksekusi ke fungsi middleware berikutnya. Memanggil `next()` sangat penting kecuali middleware tersebut mengakhiri siklus permintaan-response (misalnya, dengan memanggil `res.send()`).

## 🧩 Jenis-Jenis Middleware

Middleware dapat digunakan dalam berbagai cara:

### 1. Middleware Tingkat Aplikasi (Application-level)

Diterapkan ke seluruh aplikasi menggunakan `app.use()` atau `app.METHOD()`.

```js
const express = require('express');
const app = express();

// Middleware ini akan dijalankan untuk SETIAP permintaan ke aplikasi
app.use((req, res, next) => {
    console.log(`URL yang diminta: ${req.originalUrl}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Selamat datang!');
});
```

### 2. Middleware Tingkat Router (Router-level)

Diterapkan ke instance `express.Router()`, membatasi fungsinya pada sekumpulan rute tertentu.

```js
const router = express.Router();

// Middleware ini hanya akan dijalankan untuk rute yang menggunakan 'router'
router.use((req, res, next) => {
    console.log('Middleware Router berjalan');
    next();
});

router.get('/users', (req, res) => {
    res.send('Daftar Pengguna');
});
```

### 3. Middleware untuk Penanganan Error (Error-handling)

Fungsi khusus yang memiliki empat argumen (`err`, `req`, `res`, `next`)`. Digunakan untuk menangani kesalahan yang terjadi di middleware sebelumnya atau handler rute.

```js
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Ada yang salah!');
});
```

## 💡 Contoh Penggunaan

1. Membuat function Middleware.

```js
// Middleware untuk logging request
const loggerMiddleware = (req, res, next) => {
    console.log(`Menerima Request method: ${req.method} ${req.url}`);
    next(); // PENTING: Memanggil next() untuk melanjutkan ke handler berikutnya
};

// Middleware untuk menambahkan header X-Powered-By
const poweredHeaderMiddleware = (req, res, next) => {
    res.setHeader('X-Powered-By', 'Express Middleware');
    next(); // PENTING: Memanggil next() untuk melanjutkan ke handler berikutnya
};
```

2. Menggunakan Middleware.

```js
const app = express();

// Pemanggilan middleware dengan app.use harus sesuai urutan function middleware yang diinginkan
// dan ditempatkan sebelum route handler
app.use(loggerMiddleware);
app.use(poweredHeaderMiddleware);

// Route handler untuk endpoint /hello
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});
```

3. Output console log:

```
Menerima Request method: GET /hello
```

Jika kita menambahkan route baru, misal dengan endpoint `/ucup`, maka akan menghasilan log yang sama:

```js
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/ucup', (req, res) => {
    res.send('Hello Ucup!');
});
```

Output:

```
Menerima Request method: GET /hello

Menerima Request method: GET /ucup
```

### 🔐 Menambahkan Middleware Query Api Key

```js
// Middleware untuk logging request
const loggerMiddleware = (req, res, next) => {
    console.log(`Menerima Request method: ${req.method} ${req.url}`);
    next(); // PENTING: Memanggil next() untuk melanjutkan ke handler berikutnya
};

// Middleware untuk menambahkan header X-Powered-By
const poweredHeaderMiddleware = (req, res, next) => {
    res.setHeader('X-Powered-By', 'Express Middleware');
    next(); // PENTING: Memanggil next() untuk melanjutkan ke handler berikutnya
};

// Middleware untuk validasi API Key
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.query.apiKey;
    if (apiKey && apiKey === 'test123') {
        next(); // API key valid, lanjutkan ke handler berikutnya
    } else {
        res.status(403).end();
    }
};
```

Urutan pemanggilan Middleware diubah setelah logger:

```js
// Pemanggilan middleware dengan app.use harus sesuai urutan function middleware yang diinginkan
// dan ditempatkan sebelum route handler
app.use(loggerMiddleware);
app.use(apiKeyMiddleware); // Middleware untuk validasi API Key setelah logger
app.use(poweredHeaderMiddleware);

// Route handler untuk endpoint /hello
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/ucup', (req, res) => {
    res.send('Hello Ucup!');
});
```

### 📝 Manipulasi Request

Karena Request itu adalah JavaScript Object, kita juga bisa memanipulasi Request Object di Middleware. Misalnya mengubah attribute atau menambah attribute baru, agar bisa digunakan di Middleware selanjutnya, atau di Route.

```js
// Middleware untuk menambahkan waktu request
const timeMiddleware = (req, res, next) => {
    req.requestTime = Date.now();
    next();
}
```

Memanggil Middleware:

```js
// Pemanggilan middleware dengan app.use harus sesuai urutan function middleware yang diinginkan
// dan ditempatkan sebelum route handler
app.use(loggerMiddleware);
app.use(apiKeyMiddleware); // Middleware untuk validasi API Key setelah logger
app.use(poweredHeaderMiddleware);
app.use(timeMiddleware); // Middleware untuk menambahkan waktu request
```

Memanggil request di router:

```js
app.get('/time', (req, res) => {
    const currentTime = req.requestTime; // Mengambil waktu (requestTime) dari middleware dateTimeMiddleware
    res.send(`Request received at: ${currentTime}`);
});
```

## 🔥 Fullcode dengan Unit Test

```js
const request = require('supertest');
const express = require('express');

// Middleware untuk logging request
const loggerMiddleware = (req, res, next) => {
    console.log(`Menerima Request method: ${req.method} ${req.url}`);
    next(); // PENTING: Memanggil next() untuk melanjutkan ke handler berikutnya
};

// Middleware untuk menambahkan header X-Powered-By
const poweredHeaderMiddleware = (req, res, next) => {
    res.setHeader('X-Powered-By', 'Express Middleware');
    next(); // PENTING: Memanggil next() untuk melanjutkan ke handler berikutnya
};

// Middleware untuk validasi API Key
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.query.apiKey;
    if (apiKey && apiKey === 'test123') {
        next(); // API key valid, lanjutkan ke handler berikutnya
    } else {
        res.status(403).end();
    }
};

// Middleware untuk menambahkan waktu request
const timeMiddleware = (req, res, next) => {
    req.requestTime = Date.now();
    next();
}

const app = express();

// Pemanggilan middleware dengan app.use harus sesuai urutan function middleware yang diinginkan
// dan ditempatkan sebelum route handler
app.use(loggerMiddleware);
app.use(apiKeyMiddleware); // Middleware untuk validasi API Key setelah logger
app.use(poweredHeaderMiddleware);
app.use(timeMiddleware); // Middleware untuk menambahkan waktu request

// Route handler untuk endpoint /hello
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/ucup', (req, res) => {
    res.send('Hello Ucup!');
});

app.get('/time', (req, res) => {
    const currentTime = req.requestTime; // Mengambil waktu (requestTime) dari middleware dateTimeMiddleware
    res.send(`Request received at: ${currentTime}`);
});

// Test untuk middleware dan endpoint /hello
test('Test Response Middleware /hello endpoint', async () => {
    const response = await request(app).get('/hello').query({ apiKey: 'test123' });
    expect(response.headers['x-powered-by']).toBe('Express Middleware');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
});

test('Test Response Middleware /ucup endpoint', async () => {
    const response = await request(app).get('/ucup').query({ apiKey: 'test123' });
    expect(response.headers['x-powered-by']).toBe('Express Middleware');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello Ucup!');
});

test('Test Response Middleware Unauthorized /ucup endpoint', async () => {
    const response = await request(app).get('/ucup');
    expect(response.status).toBe(403);
});

test('Test Response Middleware Time /time endpoint', async () => {
    const response = await request(app).get('/time').query({ apiKey: 'test123' });
    expect(response.headers['x-powered-by']).toBe('Express Middleware');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Request received at:'); // Menggunakan toContain karena waktu akan berubah-ubah setiap request
});
```
