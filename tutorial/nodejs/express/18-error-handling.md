---
sidebar_position: 18
title: 'Error Handling'
---

Secara otomatis jika aplikasi Express.js mengalami Error, maka Error tersebut akan ditangkap oleh Express.js. Kemudian, rincian error akan ditampilkan dalam response secara otomatis. 

Berikut contoh pesan jika terjadi error ⚠️:

```
Error: Intentional Error
    at D:\Workspace\belajar\nodejs\express\belajar-express\src\hello.js:11:11
    at Layer.handleRequest (D:\Workspace\belajar\nodejs\express\belajar-express\node_modules\router\lib\layer.js:152:17)
    at next (D:\Workspace\belajar\nodejs\express\belajar-express\node_modules\router\lib\route.js:157:13)
    at Route.dispatch (D:\Workspace\belajar\nodejs\express\belajar-express\node_modules\router\lib\route.js:117:3)
    at handle (D:\Workspace\belajar\nodejs\express\belajar-express\node_modules\router\index.js:435:11)
    at Layer.handleRequest (D:\Workspace\belajar\nodejs\express\belajar-express\node_modules\router\lib\layer.js:152:17)
    at D:\Workspace\belajar\nodejs\express\belajar-express\node_modules\router\index.js:295:15
    at processParams (D:\Workspace\belajar\nodejs\express\belajar-express\node_modules\router\index.js:582:12)
    at next (D:\Workspace\belajar\nodejs\express\belajar-express\node_modules\router\index.js:291:5)
    at Function.handle (D:\Workspace\belajar\nodejs\express\belajar-express\node_modules\router\index.js:186:3)
```

Ada kondisi di mana kita ingin mengubah cara error ditampilkan, atau bahkan sengaja mengharapkan terjadinya error, seperti Error Validasi. Dalam situasi semacam ini, Express.js menyediakan fitur Middleware Error Handling, di mana kita bisa membuat Middleware dan itu akan dijalankan ketika kesalahan terjadi. Berbeda dengan Middleware biasa, pada Middleware Error Handling, dibutuhkan empat parameter, yaitu `(err, req, res, next)`.

Berikut cara membuat Middleware Error Handling ☑️:

```js
// Error handling middleware
const errorMiddleware = (err, req, res, next) => {
    res.status(500).send(`Something error: ${err.message}`);
};

app.get('/hello', (req, res) => {
    throw new Error('Intentional Error'); // Contoh error untuk diuji
});

app.use(errorMiddleware); // Ditempatkan paling akhir, setelah semua route
```

Full Code dengan Unit Test ✅:

```js
const request = require('supertest');
const express = require('express');

const app = express();

// Error handling middleware
const errorMiddleware = (err, req, res, next) => {
    res.status(500).send(`Something error: ${err.message}`);
};

app.get('/hello', (req, res) => {
    throw new Error('Intentional Error'); // Contoh error untuk diuji
});

app.use(errorMiddleware); // Ditempatkan paling akhir, setelah semua route

test('Test Response Error /hello endpoint', async () => {
    const response = await request(app).get('/hello');
    expect(response.status).toBe(500);
    expect(response.text).toBe('Something error: Intentional Error');
});
```

:::tip
* https://expressjs.com/en/guide/error-handling.html
:::
