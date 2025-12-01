---
sidebar_position: 13
title: 'Router'
---

Ketika kita membangun Application Express.js, secara otomatis sudah tersedia objek Router. Namun, kita memiliki opsi untuk mengembangkan objek Router kita sendiri jika diinginkan, ini sangat berguna jika kita ingin mengelompokkan Router. Sebagai contoh, kita dapat memasukkan Router tersebut ke dalam Application layaknya Middleware. Pendekatan ini sangat tepat ketika kita ingin merancang fitur modular yang memungkinkan kita untuk menghidupkan atau mematikan router secara dinamis. Dengan menggunakan objek Router, kita dapat menjalankan Middleware dan Routing secara terpisah.

:::tip
* https://expressjs.com/en/5x/api.html#express.router
* https://expressjs.com/en/5x/api.html#app.router
:::

### :rocket: Membuat Router

```js
const express = require('express');
const app = express();

// Membuat Router
const router = express.Router();

router.use((req, res, next) => {
    console.info(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`);
    next();
});

router.get('/course/matematika', (req, res) => {
    res.send('Get Matematika Course');
});
```

Router belum bisa langsung digunakan, sebelum ditambahkan ke dalam Application Express.js:

```js
app.use(router);
```

Full Code dengan Unit Test:

```js
const request = require('supertest');
const express = require('express');

const app = express();

// Membuat Router
const router = express.Router();

router.use((req, res, next) => {
    console.info(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`);
    next();
});

router.get('/course/matematika', (req, res) => {
    res.send('Get Matematika Course');
});

// Unit Test
test('Test Route Disable /course/matematika endpoint', async () => {
    const response = await request(app).get('/course/matematika');
    expect(response.status).toBe(404); // karena route belum di daftarkan ke app
});

test('Test Route Enable /course/matematika endpoint', async () => {
    app.use(router); // mendaftarkan router ke app
    
    const response = await request(app).get('/course/matematika');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Get Matematika Course');
});
```

:::tip
Baca juga tentang [Middleware Tingkat Router](/nodejs/express/middleware).
:::
