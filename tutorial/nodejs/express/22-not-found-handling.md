---
sidebar_position: 22
title: 'Not Found Handling'
---

Saat pengguna melakukan permintaan ke URL yang tidak ada, maka secara default Express.js akan menampilkan halaman 404. Kita dapat membuat halaman 404 kita sendiri, dengan menambahkan middleware di posisi terakhir. Middleware ini akan diaktifkan jika tidak ada rute yang ditemukan untuk jalur rute yang diakses.

```js
const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.status(404).send('Halaman tidak ditemukan');
});
```

Untuk full code dengan unit test sebagai berikut:

```js
const request = require('supertest');
const express = require('express');

const app = express();

// endpoint yang ada
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.use((req, res, next) => {
    res.status(404).send('Halaman tidak ditemukan');
});

// Unit Test
test('Test Response /hello endpoint', async () => {
    const response = await request(app).get('/hello'); // endpoint ada
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
});

test('Test Response Not Found', async () => {
    const response = await request(app).get('/halaman-ini-harusnya-tidak-ada'); // endpoint ini tidak ada
    expect(response.status).toBe(404);
    expect(response.text).toBe('Halaman tidak ditemukan');
});
```
