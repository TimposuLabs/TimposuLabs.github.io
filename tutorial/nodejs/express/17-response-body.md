---
sidebar_position: 17
title: 'Response Body'
---

Sebelumnya, kita telah mengeksplorasi berbagai tipe Response Body di Express.js. Kita dapat memanfaatkan `res.send(data)` untuk mentransmisikan response dalam format teks misalnya, atau sebelumnya kita juga telah menggunakan `res.json(object)` untuk mengirimkan informasi dalam format JSON. Sebenarnya, ada lebih banyak variasi Response Body yang didukung oleh Express.js.

| Response Body Function | Keterangan |
| --- | --- |
| `res.send(data)` | Response berupa raw data |
| `res.download(path, filename, option)` | Response berupa file download |
| `res.json(body)` | Response berupa JSON |
| `res.redirect(url)` | Response redirect url |
| `res.sendFile(path, option)` | Response berupa file |

:::info
Perbedaan `res.sendFile()` dan `res.download()`, jika sama-sama meload file html maka `res.sendFile()` akan dirender oleh browser sedangkan `res.download()` maka file html akan dipaksa untuk didownload oleh browser.
:::

Contoh:

```js
const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    res.sendFile(__dirname + '/hello.txt'); // Response body dari file
});
```

Contoh Full Code dengan Unit Test:

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    res.sendFile(__dirname + '/hello.txt'); // Response body dari file
});

test('Test Response Send File /hello endpoint', async () => {
    const response = await request(app).get('/hello');
    expect(response.text).toBe('Hallo Bro!!!'); // Isi dari hello.txt
});
```
