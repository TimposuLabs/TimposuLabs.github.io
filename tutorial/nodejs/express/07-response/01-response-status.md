---
sidebar_position: 1
title: 'Response Status'
---

Untuk mengubah HTTP Status dari HTTP Response yang kita buat, kita bisa menggunakan method `res.status(code)`:

```js
const request = require('supertest');
const express = require('express');
const e = require('express');

const app = express();

app.get('/hello', (req, res) => {
    if (req.query.name) {
        res.status(200);
        res.send(`Hello World! ${req.query.name}`);        
    } else {
        res.status(400);
        // res.send('Bad Request');
        res.end();
    }
});

test('Test Response Status /hello endpoint', async () => {
    let response = await request(app).get('/hello').query({ name: 'Ucup' });
    expect(response.status).toBe(200); // expected status 200
    expect(response.text).toBe('Hello World! Ucup');

    response = await request(app).get('/hello');
    expect(response.status).toBe(400); // expected status 400, if name query is not provided
    expect(response.text).toBe(''); // expected empty response body
});
```
