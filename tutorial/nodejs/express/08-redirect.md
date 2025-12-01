---
sidebar_position: 8
title: 'Redirect'
---

Untuk melakukan Redirect dari sebuah web ke halaman lain, kita hanya cukup menggunakan HTTP Header Location. Di Express.js, kita bisa lakukan manual dengan menggunakan HTTP Header Location, atau bisa dengan bantuan method `res.redirect(to)`.

:::tip
https://expressjs.com/en/5x/api.html#res.redirect
:::

Jika redirect ke URL, yang menggunakan `status` code, harus sesuai dengan [HTTP status code](https://www.rfc-editor.org/rfc/rfc9110.html#name-status-codes). Jika tidak ditentukan, `status` defaultnya `302`.

```js
res.redirect('/foo/bar')
res.redirect('http://example.com')
res.redirect(301, 'http://example.com')
res.redirect('../login')
```

Contoh:

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.redirect('/next-page');
});

// Unit test
test('Test Response Redirect / endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(302);
    expect(response.get('location')).toBe('/next-page');
});
```
