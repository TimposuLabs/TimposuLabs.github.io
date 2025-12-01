---
sidebar_position: 12
title: 'Route Function'
---

Kita dapat membuat Route Path yang sama untuk beberapa tipe HTTP Method, misalnya `GET`, `POST`, `PUT`, `PATCH` atau `DELETE`. Kita bisa memanfaatkan `route(path)` function sehingga tidak perlu mendeklarasikan nama path sama untuk beberapa route.

:::tip
* https://expressjs.com/en/5x/api.html#app.route
:::

Contoh:

```js
const app = express();

app.route('/student')
    .get((req, res) => {
        res.send("Get Student");
    })
    .post((req, res) => {
        res.send("Create Student");
    })
    .put((req, res) => {
        res.send("Update Student");
    })
    .delete((req, res) => {
        res.send("Delete Student");
    })
    .patch((req, res) => {
        res.send("Patch Student");
    });
```

Full Code dengan Unit Test:

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.route('/student')
    .get((req, res) => {
        res.send("Get Student");
    })
    .post((req, res) => {
        res.send("Create Student");
    })
    .put((req, res) => {
        res.send("Update Student");
    })
    .delete((req, res) => {
        res.send("Delete Student");
    })
    .patch((req, res) => {
        res.send("Patch Student");
    });

// Unit Test
test('Test Route Function GET /student endpoint', async () => {
    const response = await request(app).get('/student');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Get Student');
});

test('Test Route Function POST /student endpoint', async () => {
    const response = await request(app).post('/student');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Create Student');
});

test('Test Route Function PUT /student endpoint', async () => {
    const response = await request(app).put('/student');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Update Student');
});

test('Test Route Function DELETE /student endpoint', async () => {
    const response = await request(app).delete('/student');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Delete Student');
});

test('Test Route Function PATCH /student endpoint', async () => {
    const response = await request(app).patch('/student');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Patch Student');
});
```
