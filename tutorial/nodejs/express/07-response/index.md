---
sidebar_position: 7
title: 'Response'
---

Pada Callback Routing ExpressJS, terdapat parameter kedua yaitu `response`. Response merupakan object representasi dari HTTP Response.Kita bisa mengubah data HTTP Response melalui object Response tersebut.

:::tip
* https://expressjs.com/en/5x/api.html#res
:::

Contoh:

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

// Unit test
test('Test Response /hello endpoint', async () => {
    const response = await request(app).get('/hello');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
});
```
