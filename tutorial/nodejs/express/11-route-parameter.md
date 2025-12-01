---
sidebar_position: 11
title: 'Route Parameter'
---

Saat kita membuat aplikasi Web API atau RESTful API, kadang kita sering menyimpan parameter dalam URL Path, misal `/student/{id}`, atau `/categories/{idCategory}`, dan lain-lain. Express.js mendukung penambahan parameter dalam route path, dengan menggunakan prefix `:` (titik dua). Semua data parameter itu bisa kita tambahkan __regex__ jika kita mau, misal `/student/:id`, artinya kita menambah parameter `id`. Data route parameter secara otomatis bisa kita ambil sebagai attribute di `req.params`.

Pada parametenya kita juga bisa langsung memasukan regex pattern, contohnya memasukan data hanya berupa angka kedalam parameter endpoint `/class/` yaitu dengan pattern `/^\/class\/(\d+)$/`. Dengan demikian parameter yang dimasukan ke endpoint tersebut hanya berupa angka dan kemudian bisa diambil melalui ` req.params[0];`, karena mengakses parameter dari regex dari group pertama.

Contoh:

```js
app.get('/student/:id', (req, res) => {
    const idStudent = req.params.id;
    res.send("Student ID: " + idStudent);
});

// Menggunakan regex untuk pattern /class/(number)
app.get(/^\/class\/(\d+)$/, (req, res) => {
    const idClass = req.params[0]; // Mengakses parameter dari regex capture group, dan regex dari group pertama
    res.send("Class ID: " + idClass);
});

// Menggunakan parameter lebih dari satu
app.get('/class/:id/students/:studentId', (req, res) => {
    const idClass = req.params.id;
    const idStudent = req.params.studentId;
    res.send(`Class ID: ${idClass}, Student ID: ${idStudent}`);
});
```

Contoh Full Code dengan Unit Test:

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/student/:id', (req, res) => {
    const idStudent = req.params.id;
    res.send("Student ID: " + idStudent);
});

// Menggunakan regex untuk pattern /class/(number)
app.get(/^\/class\/(\d+)$/, (req, res) => {
    const idClass = req.params[0]; // Mengakses parameter dari regex capture group, dan regex dari group pertama
    res.send("Class ID: " + idClass);
});

// Menggunakan parameter lebih dari satu
app.get('/class/:id/students/:studentId', (req, res) => {
    const idClass = req.params.id;
    const idStudent = req.params.studentId;
    res.send(`Class ID: ${idClass}, Student ID: ${idStudent}`);
});

// Unit test
test('Test Response Route Path /student/:id endpoint', async () => {
    const response = await request(app).get('/student/111');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Student ID: 111');
});

test('Test Response Route Path /student/:id endpoint', async () => {
    const response = await request(app).get('/student/222');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Student ID: 222');
});

test('Test Response Route Path /class/:id endpoint', async () => {
    const response = await request(app).get('/class/12');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Class ID: 12');
});

test('Test Response Route Path /class/:id endpoint', async () => {
    const response = await request(app).get('/class/tigabelas');
    expect(response.status).toBe(404);
});

test('Test Response Route Path /class/:id/students/:studentId endpoint', async () => {
    const response = await request(app).get('/class/12/students/34');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Class ID: 12, Student ID: 34');
});
```
