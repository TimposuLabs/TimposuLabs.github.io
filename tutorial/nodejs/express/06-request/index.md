---
sidebar_position: 6
title: 'Request'
---

Saat kita membuat callback di router, parameter pertama adalah object `Request`, yang secara otomatis diisi oleh Express.js. Object `Request` akan berisikan informasi tentang HTTP Request yang masuk ke callback tersebut. Ada banyak sekali informasi HTTP Request yang bisa kita ambil dari object `Request`, seperti `Query Param`, `Header`, `Body` dan lain-lain.

:::tip
https://expressjs.com/en/5x/api.html#req.app
:::

Contoh Request dengan Query Params:

```js
const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    res.send(`Hello ${req.query.name}`);
});

app.listen(3000 , () => {
    console.log('Server is running on port 3000');
});
```

Menggunakan Unit Test:

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    res.send(`Hello ${req.query.name}`);
});

test('Test Query Parameter /hello endpoint', async () => {
    const response = await request(app).get('/hello').query({ name: 'Ucup' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello Ucup');
});
```
