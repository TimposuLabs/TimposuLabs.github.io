---
sidebar_position: 7
title: 'Request URL'
---

Untuk mendapatkan URL saat ini, kita bisa menggunakan object Request untuk mendapatkan informasinya:

| Function | Keterangan |
| --- | --- |
| `req.originalUrl` | untuk mendapat url secara full beserta query param nya |
| `req.path` | untuk mendapatkan path url tanpa query param |
| `req.hostname` | untuk mendapatkan nama host atau domain dari web kita |
| `req.protocol` | untuk mendapatkan protocol dari url web |
| `req.secure` | untuk mengecek apakah url web nya https atau bukan |
| `req.subdomains` | untuk mendapatkan array subdomain dari url web kita |

Contoh:

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/hello/world', (req, res) => {
    res.json({ 
        path: req.path,
        originalUrl: req.originalUrl,
        hostname: req.hostname,
        protocol: req.protocol,
        secure: req.secure
    });
});

test('Test Request URL /hello/world endpoint', async () => {
    const response = await request(app).get('/hello/world').query({ name: 'Ucup' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        path: '/hello/world',
        originalUrl: '/hello/world?name=Ucup',
        hostname: '127.0.0.1',
        protocol: 'http',
        secure: false
    });
});
```
