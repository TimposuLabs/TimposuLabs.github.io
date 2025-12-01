---
sidebar_position: 14
title: 'Request Body'
---

Dalam Express.js, secara default Router Callback tidak dapat mengakses data dari HTTP Request Body, karena jenis data dalam Request Body dapat bervariasi tergantung pada tipe data yang dikirim. Oleh karena itu, di dalam Express.js terdapat Middleware bawaan / Built-in Middleware yang berfungsi untuk membaca Request Body dan kemudian mengkonversinya ke tipe data yang diperlukan.

Beberapa Built-in Middleware yang bisa digunakan:

| Function | Keterangan |
| --- | --- |
| `express.json()` | yaitu middleware yang melakukan parsing request body menjadi JavaScript object |
| `express.text()` | yaitu middleware yang melakukan parsing request body menjadi string |
| `express.raw()` | yaitu middleware yang melakukan parsing request body menjadi Buffer |
| `express.urlencoded()` | yaitu middleware yang melakukan parsing request body form menjadi object |
| `express.static()` | yaitu middleware yang digunakan untuk melayani file static |

:::tip
* Baca juga [Middleware](/nodejs/express/middleware).
:::

Contoh:

```js
const app = express();
app.use(express.json()); // menambahkan middleware untuk parsing JSON
app.use(express.urlencoded({ extended: false })); // menambahkan middleware untuk parsing form data dengan extended: false, yang berarti hanya mendukung tipe data sederhana

app.post('/student/json', (req, res) => {
    const name = req.body.name;
    res.json({ 
        message: `Student ${name} created` 
    });
});

app.post('/student/form', (req, res) => {
    const name = req.body.name;
    res.json({ 
        message: `Student ${name} created` 
    });
});
```

Contoh Full Code dengan Unit Test:

```js
const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json()); // menambahkan middleware untuk parsing JSON
app.use(express.urlencoded({ extended: false })); // menambahkan middleware untuk parsing form data dengan extended: false, yang berarti hanya mendukung tipe data sederhana


app.post('/student/json', (req, res) => {
    const name = req.body.name;
    res.json({ 
        message: `Student ${name} created` 
    });
});

app.post('/student/form', (req, res) => {
    const name = req.body.name;
    res.json({ 
        message: `Student ${name} created` 
    });
});

// Unit Test
test('Test Request POST /student/json endpoint', async () => {
    const response = await request(app)
        .post('/student/json')
        .set('Content-Type', 'application/json')
        .send({ name: 'Ucup' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Student Ucup created');
});

test('Test Request POST /student/form endpoint', async () => {
    const response = await request(app)
        .post('/student/form')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('name=Ade');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Student Ade created' });
});
```
