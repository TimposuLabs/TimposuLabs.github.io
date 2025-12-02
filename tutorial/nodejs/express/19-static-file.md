---
sidebar_position: 19
title: 'Static File'
---

Untuk menampilkan file statis seperti html, css, javascript, gambar, atau jenis file lain di Express.js, kita bisa menggunakan middleware `express.static()` yang sudah disediakan oleh Express.js. Middleware ini akan secara otomatis mencari file, dan jika file tersebut ditemukan, maka file itu akan dikembalikan, tetapi jika tidak ditemukan, proses akan diteruskan ke middleware atau route berikutnya.

:::tip
* https://expressjs.com/en/5x/api.html#express.static
:::

## 📑 Static File

Misal kita membuat file di dalam direktori `static`:

```
mkdir static
touch static/hello.txt
```

Isi file `hello.txt`:

```
Hallo Bro!!!
```

Contoh kode dengan Unit Test:

```js
const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/static')); // Menggunakan folder 'static' untuk file statis

// Unit Tests
test('Test Static File /hello.txt endpoint', async () => {
    const response = await request(app).get('/hello.txt'); // load file statis 'hello.txt', yang berada dalam folder 'static'
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hallo Bro!!!');
});
```

## :bookmark_tabs:  Prefix Path

Kita dapat memberi prefix path pada static file, misal `/resources/namafile`. Maka kita bisa tambahkan route pada middleware nya, misal `app.use('/resources', express.static(...)`

```
touch static/demo.txt
```

Isi file `demo.txt`:

```
Siap ketua!!!
```

Contoh Kode dengan Unit Test:

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.use('/resources', express.static(__dirname + '/static')); // Menggunakan folder 'static' untuk file statis dengan prefix '/resources'

// Unit Tests
test('Test Static File /resources/demo.txt endpoint', async () => {
const response = await request(app).get('/resources/demo.txt'); // file harus diload dengan prefix '/resources'
    expect(response.status).toBe(200);
    expect(response.text).toBe('Siap ketua!!!');
});
```

## 🔥 Full Code dengan Unit Test

Berikut contoh full code dengan response, static dan prefix path:

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.use(express.static(__dirname + '/static')); // Menggunakan folder 'static' untuk file statis
app.use('/resources', express.static(__dirname + '/static')); // Menggunakan folder 'static' untuk file statis dengan prefix '/resources'

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/hello.txt', (req, res) => {
    res.send('Hello World!');
});

// Unit Tests
test('Test Response /hello endpoint', async () => {
    const response = await request(app).get('/hello');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
});

test('Test Static File /hello.txt endpoint', async () => {
    const response = await request(app).get('/hello.txt');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hallo Bro!!!');
});

test('Test Static File /resources/hello.txt endpoint', async () => {
    const response = await request(app).get('/resources/hello.txt'); // menggunakan prefix '/resources'
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hallo Bro!!!');
});

test('Test Static File /resources/demo.txt endpoint', async () => {
const response = await request(app).get('/resources/demo.txt'); // menggunakan prefix '/resources'
    expect(response.status).toBe(200);
    expect(response.text).toBe('Siap ketua!!!');
});
```
