---
sidebar_position: 2
title: 'Response Header'
---

Kita bisa mengubah HTTP Response Header dengan menggunakan method `res.set(name, value)` atau `res.header(name, value)`. Atau jika ingin langsung beberapa `name`, kita bisa masukkan dalam bentuk object ke dalam parameter name nya.

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    res.set({
        'X-Custom-Header': 'TimposuLabs',
        'X-Author': 'Ucup'
    });
    res.send('Hello Response!');
    });    

// Unit test
test('Test Response Header /hello endpoint', async () => {
    const response = await request(app).get('/hello');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello Response!');
    expect(response.get('X-Custom-Header')).toBe('TimposuLabs');
    expect(response.get('X-Author')).toBe('Ucup');
});
```