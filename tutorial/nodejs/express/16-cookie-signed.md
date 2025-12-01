---
sidebar_position: 16
title: 'Signed Cookie'
---

Salah satu kekurangan dalam menyimpan informasi di Cookie adalah bahwa Cookie dapat diubah oleh Klien, contohnya kita dapat mengubah Cookie di Browser yang kita gunakan. Untuk mencegah pemodifikasian Cookie, salah satu metode yang bisa diterapkan adalah dengan menambahkan Tanda Tangan / Signature pada Cookie yang kita miliki. Setiap nilai Cookie akan disertai dengan Signature, di mana jika nilai Cookie tersebut diubah, maka Signature otomatis tidak akan sesuai lagi, dan nilai Cookie tersebut tidak akan dianggap sah. Fitur ini sudah tersedia dalam Cookie Parser yang disebut sebagai Signed Cookie. Kita perlu menentukan Cookie mana yang akan diberi Signature saat membuat Cookie dalam response. Di samping itu, kita juga harus menyertakan **Secret Key** yang akan digunakan saat proses pembuatan Signature, pastikan Secret Key tersebut aman dan sulit untuk ditebak.

## ✍️ Membuat Signed Cookie

```js
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser('secret1234567890')); // menambahkan middleware cookie-parser dengan secret untuk signed cookie

// Endpoint membuat cookie ke client
app.post('/login', (req, res) => {
    const username = req.body.username;
    res.cookie("Username", username, {path: '/', signed: true}); // set signed true agar cookie ditandatangani
    res.send(`Hello ${username}, kamu sudah login.`);
});
```

Contoh Signed Cookie yang dihasilkan:

```
Username=s%3AUcup.9HsB3mkjxHhOsL7tIBNSbu%2BNdXH0CYUmnXw0zR%2Fu0xo
```

## 📖 Membaca Signed Cookie

Jika kita membuat Cookie dalam bentuk Signed Cookie, maka untuk mengaksesnya, jangan memakai `req.cookies()` ❌, tetapi harus menggunakan `req.signedCookies()` ✅.

:::tip
* https://expressjs.com/en/5x/api.html#req.signedCookies
:::

```js
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser('secret1234567890')); // menambahkan middleware cookie-parser dengan secret untuk signed cookie

// Endpoint membaca cookie yang dikirimkan oleh client
app.get('/', (req, res) => {
    const username = req.signedCookies["Username"];
    res.send(`Hello ${username}!`);
});
```

## ✊ Full Code dengan Unit Test

```js
const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser('secret1234567890')); // menambahkan middleware cookie-parser dengan secret untuk signed cookie

// Endpoint membaca cookie yang dikirimkan oleh client
app.get('/', (req, res) => {
    const username = req.signedCookies["Username"];
    res.send(`Hello ${username}!`);
});

// Endpoint mengirim cookie ke client
app.post('/login', (req, res) => {
    const username = req.body.username;
    res.cookie("Username", username, {path: '/', signed: true}); // set signed true agar cookie ditandatangani
    res.send(`Hello ${username}, kamu sudah login.`);
});

// Unit Test
test('Test Membaca(Read) Cookie / endpoint', async () => {
    const response = await request(app).get('/')
    .set('Cookie', ['Username=s%3AUcup.9HsB3mkjxHhOsL7tIBNSbu%2BNdXH0CYUmnXw0zR%2Fu0xo; Path=/']); // cookie signed diambil dari hasil response sebelumnya console.info(response.get('set-cookie'));
    
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello Ucup!');
});

test('Test Membuat(Write) Cookie /login endpoint', async () => {
    const response = await request(app).post('/login')
    .send({username: 'Ucup'});
    console.info(response.get('set-cookie')); // log untuk melihat nilai cookie yang dihasilkan

    expect(response.status).toBe(200);
    expect(response.get('set-cookie').toString()).toContain('Ucup'); // memastikan cookie terkirim dengan benar, menggunakan toContain() karena cookie signed akan memiliki nilai yang berbeda setiap kali dibuat
    expect(response.text).toBe('Hello Ucup, kamu sudah login.');
});
```
