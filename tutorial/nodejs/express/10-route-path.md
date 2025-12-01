---
sidebar_position: 10
title: 'Route Path'
---

Pada materi [Basic Routing](/nodejs/express/routing), kita belajar bagaimana cara melakukan routing dengan HTTP Method sesuai yang kita mau. Sebelumnya, route path yang kita gunakan tidak dinamis. ExpressJS mendukung route path yang dinamis, dengan cara menggunakan route path `string patterns` atau `regex`.

## :arrow_up_down: Path to Regexp

Express.js menggunakan library _Path to Regexp_ untuk melakukan routing berupa __regex__. Kita bisa lihat detail cara melakukan regex nya pada halaman dokumentasi library nya.

:::tip
* https://www.npmjs.com/package/path-to-regexp 
* https://github.com/pillarjs/path-to-regexp
:::

Contoh penggunaan:

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/student/:name.json', (req, res) => {
    res.send(req.originalUrl);
});

// Using regex to match /class/*(number).json
// pattern untuk path-to-regexp v8 harus menggunakan regex secara full match
app.get(/^\/class\/(\d+)\.json$/, (req, res) => {
    res.send(req.originalUrl);
});
```

Full code dengan unit test:

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/student/:name.json', (req, res) => {
    res.send(req.originalUrl);
});

// Using regex to match /class/*(number).json
// pattern untuk path-to-regexp v8 harus menggunakan regex secara full match
app.get(/^\/class\/(\d+)\.json$/, (req, res) => {
    res.send(req.originalUrl);
});

test('Test Response Route Path /student/:name.json endpoint', async () => {
    const response = await request(app).get('/student/budi.json');
    expect(response.status).toBe(200);
    expect(response.text).toBe('/student/budi.json');
});

test('Test Response Route Path /student/:name.json endpoint', async () => {
    const response = await request(app).get('/student/aco.json');
    expect(response.status).toBe(200);
    expect(response.text).toBe('/student/aco.json');
});

test('Test Response Route Path /class/*(number).json endpoint', async () => {
    const response = await request(app).get('/class/111.json');
    expect(response.status).toBe(200);
    expect(response.text).toBe('/class/111.json');
});

test('Test Response Route Path /class/*(number).json endpoint', async () => {
    const response = await request(app).get('/class/tiga.json'); // route path bukan angka, harusnya 404
    expect(response.status).toBe(404);
});
```

## ✅ Update untuk Express v5 + Path-to-Regexp v8

Di Path-to-Regexp v8, tidak boleh lagi membuat regex setelah nama parameter. Sekarang ada 3 cara yang valid:

### ✔ 1. Gunakan REGEX FULL ROUTE (cara paling aman / rekomendasi)

Dengan route berbasis regex penuh:

```js
app.get(/^\/class\/(\d+)\.json$/, (req, res) => {
  res.send(req.originalUrl);
});
```

Dan ambil param-nya:

```js
const number = req.params[0]; // karena regex group pertama
```

Test endpoint →

```js
/class/111.json ✔ sukses
/class/abc.json ✘ tidak match
```

### ✔ 2. Gunakan Middleware untuk filter angka

Karena Express v5 + v8 TIDAK support _parameter-regex inline_, Anda bisa lakukan:

```js
app.get('/class/:number.json', (req, res, next) => {
  if (!/^\d+$/.test(req.params.number)) {
    return res.status(400).send("Invalid number");
  }
  res.send(req.originalUrl);
});
```

Test endpoint →

```js
/class/123.json ✔
/class/abc.json → 400
```

### ✔ 3. Gunakan Route Parameter Validator (Express v5)

Express v5 mendukung `.param()`:

```js
app.param("number", (req, res, next, value) => {
  if (!/^\d+$/.test(value)) return res.status(400).send("Invalid number");
  next();
});

app.get('/class/:number.json', (req, res) => {
  res.send(req.originalUrl);
});
```

❌ Format yang TIDAK bisa digunakan di Path-to-Regexp v8

Semua ini akan error:

```js
'/class/:number(\d+).json'
'/class/:number<\d+>.json'
'/class/:number(\\d+).json'
```

Karena v8 sudah TIDAK mendukung regex inline setelah parameter.
