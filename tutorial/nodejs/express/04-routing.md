---
sidebar_position: 4
title: 'Basic Routing'
---

Saat kita membuat web, biasanya kita akan membuat banyak sekali URL Path. Routing merupakan teknik yang digunakan untuk meneruskan request dari URL Path ke callback yang kita tuju. Routing di ExpressJS bisa menggunakan object Application, dan menggunakan method sesuai dengan nama HTTP Method nya.

Dalam Express.js, routing mengacu pada bagaimana aplikasi menentukan fungsi handler yang harus dijalankan ketika menerima permintaan HTTP tertentu.

## Routing Method

|       Method      |   Keterangan   |
|       ---         |       ---      |
| `app.connect(path, callback)` | HTTP Method `CONNECT` |
| `app.get(path, callback)` | HTTP Method `GET` |
| `app.post(path, callback)` | HTTP Method `POST` | 
| `app.put(path, callback)` | HTTP Method `PUT` |
| `app.delete(path, callback)` | HTTP Method `DELETE` |
| `app.options(path, callback)` | HTTP Method `OPTIONS` |
| `app.trace(path, callback)` | HTTP Method `TRACE` |
| `app.head(path, callback)` | HTTP Method `HEAD` |
| `app.patch(path, callback)` | HTTP Method `PATCH` |
| `app.all(path, callback)` | Semua HTTP Method |


Contoh untuk menampilkan view dengan tulisan "Hello World" menggunakan method `GET` untuk endpoint `/hello`:

```js
import express from 'express';

const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000 , () => {
    console.log('Server is running on port 3000');
});
```
