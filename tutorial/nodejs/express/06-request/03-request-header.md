---
sidebar_position: 3
title: 'Request Header'
---

Object Request juga bisa kita gunakan untuk mendapatkan informasi dari HTTP Header dari Request. Kita bisa menggunakan method `req.get(name)` atau `req.header(name)` untuk mendapatkan header berdasarkan name, khusus untuk HTTP Header, name nya adalah ___Case Insensitive___.

:::tip
* https://expressjs.com/en/5x/api.html#req.get
:::

Contoh:

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    const type = req.get('accept'); // Mengambil header 'Accept', nama boleh kapital atau tidak (case-insensitive)
    res.send(`Hello ${type}`);
});

test('Test Header / endpoint', async () => {
    const response = await request(app).get('/')
        .set('Accept', 'text/plain');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello text/plain');
});
```