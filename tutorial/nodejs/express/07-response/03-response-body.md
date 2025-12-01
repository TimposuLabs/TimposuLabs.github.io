---
sidebar_position: 3
title: 'Response Body'
---

Untuk mengubah Response Body, kita bisa menggunakan method `res.send(body)`. Dimana parameter body bisa kita kirim dalam bentuk `buffer` atau `string`, baik itu text, html, json dan lain-lain.

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    res.set({'Content-Type': 'text/html'});
    res.send(`
        <html>
        <head>
        <title>Hello Page</title>
        </head>
        <body>
        <h1>Hello World!</h1>
        </body>
        </html>`);
});

// Unit test
test('Test Response Body /hello endpoint', async () => {
    const response = await request(app).get('/hello');
    expect(response.get('Content-Type')).toContain('text/html'); // jika menggunakan toBe('text/html'), bisa gagal karena otomatis menambahkan charset juga
    expect(response.status).toBe(200);
    expect(response.text).toBe(`
        <html>
        <head>
        <title>Hello Page</title>
        </head>
        <body>
        <h1>Hello World!</h1>
        </body>
        </html>`);
});
// Pastikan spasi dan enter karakter pada toBe() sesuai dengan send()
```
