---
sidebar_position: 2
title: 'Request Query Param'
---

Request juga bisa digunakan untuk mengambil data `Query Parameter`. Secara otomatis, semua query parameter akan disimpan dalam bentuk object di `req.query`.

Contoh:

```js
const express = require('express');
const request = require('supertest');

const app = express();

app.get('/person', (req, res) => {
    res.send(`Hello, ${req.query.firstName} ${req.query.lastName}!`);
});

// Unit test
test('GET /person with query parameters', async () => {
    const response = await request(app)
        .get('/person')
        .query({ firstName: 'Ucup', lastName: 'Topekox' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, Ucup Topekox!');
});
```
