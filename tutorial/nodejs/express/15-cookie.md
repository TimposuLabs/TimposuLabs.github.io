---
sidebar_position: 15
title: 'Cookie'
---

Dalam protokol HTTP, salah satu elemen yang umum dipakai untuk pertukaran informasi antara Server dan Client adalah Cookie. Contohnya sejumlah pengguna memanfaatkan Cookie sebagai Session. Namun, Express.js secara default tidak menyediakan dukungan untuk Cookie, tetapi kita bisa memanfaatkan Middleware dari pihak ketiga untuk mengaktifkan penggunaan Cookie ini.

## 🍪 Cookie Parser

Cookie Parser adalah salah satu Third-Party Middleware yang bisa kita gunakan untuk mendukung fitur Cookie, dimana dengan Cookie Parser, kita secara otomatis menyimpan data ke Cookie, atau mengambil data ke Cookie.

:::info
* https://www.npmjs.com/package/cookie-parser
:::

Install dependency Cookie Parser:

```
npm i cookie-parser
```

## 📖 Membaca Cookie

Setelah mengistall Cookie Parser Middleware, kita bisa secara otomatis membaca Cookie yang dikirim dari Client melalui `req.cookies`.

:::tip
* https://expressjs.com/en/5x/api.html#req.cookies
:::

```js
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser()); // menambahkan middleware cookie-parser

// Endpoint membaca cookie yang dikirimkan oleh client
app.get('/', (req, res) => {
    const username = req.cookies["username"];
    res.send(`Hello ${username}!`);
});
```

## ✍️ Menulis Cookie

Untuk menulis Cookie, kita bisa tambahkan di `response` untuk dikirim ke client, dengan method `res.cookie(key, value, setting)`. Dan untuk menghapus/clear Cookie, kita bisa gunakan `res.clearCookie(key, setting)`.

:::tip
* https://expressjs.com/en/5x/api.html#res.cookie
* https://expressjs.com/en/5x/api.html#res.clearCookie
:::

```js
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser()); // menambahkan middleware cookie-parser

// Endpoint mengirim cookie ke client
app.post('/login', (req, res) => {
    const username = req.body.username;
    res.cookie("Username", username, {path: '/'}); // set path cookie menjadi / agar bisa diakses di semua endpoint, jika tidak diset maka defaultnya adalah path dari endpoint itu adalah /login
    res.send(`Hello ${username}, kamu sudah login.`);
});
```

## 🔥 Full Code dengan Unit

```js
const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser()); // menambahkan middleware cookie-parser

// Endpoint membaca cookie yang dikirimkan oleh client
app.get('/', (req, res) => {
    const username = req.cookies["username"];
    res.send(`Hello ${username}!`);
});

// Endpoint mengirim cookie ke client
app.post('/login', (req, res) => {
    const username = req.body.username;
    res.cookie("Username", username, {path: '/'}); // set path cookie menjadi / agar bisa diakses di semua endpoint, jika tidak diset maka defaultnya adalah path dari endpoint itu adalah /login
    res.send(`Hello ${username}, kamu sudah login.`);
});

// Unit Test
test('Test Membaca Cookie / endpoint', async () => {
    const response = await request(app).get('/')
    .set('Cookie', ['username=Ucup']);
    
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello Ucup!');
});

test('Test Membuat Cookie /login endpoint', async () => {
    const response = await request(app).post('/login')
    .send({username: 'Ucup'});

    expect(response.status).toBe(200);
    expect(response.get('set-cookie').toString()).toBe('Username=Ucup; Path=/'); // memastikan cookie terkirim dengan benar
    expect(response.text).toBe('Hello Ucup, kamu sudah login.');
});
```
