---
sidebar_position: 20
title: 'Template Engine'
---

Saat kita mengembangkan web dengan Express.js, mengirimkan string HTML melalui response sangat merepotkan. Untuk menyederhanakan proses ini, menggunakan Template Engine menjadi solusi yang tepat. Template Engine adalah library yang memungkinkan kita merancang template dan memudahkan dalam menampilkan informasi dalam format template tersebut. Umumnya, template tersebut berupa HTML, sementara datanya dapat disesuaikan dengan informasi yang ingin kita tampilkan di dalam HTML tersebut.

Ada banyak sekali library Template Engine yang bisa digunakan pada Node.js, di antaranya:

* Mustache : https://github.com/janl/mustache.js/
* Pug : https://github.com/pugjs/pug
* EJS : https://github.com/mde/ejs 
* Marko : https://github.com/marko-js/marko
* dll.

## 🚀 Mustache Express

![mustache-express](https://raw.githubusercontent.com/bryanburgers/node-mustache-express/HEAD/img/logo.svg)

[Mustache Expres](https://www.npmjs.com/package/mustache-express) adalah template engine yang sangat mudah digunakan.

Install:

```
npm i mustache-express
```

Cek `package.json`:

```json
"dependencies": {
    // ...other dependency
    "mustache-express": "^1.3.2"
}
```

### 1️⃣ Registrasi Template Engine

```js
const express = require('express');
const mustache = require('mustache-express');

const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'html'); // setting file 'html' sebagai view engine
app.engine('html', mustache()); // daftarkan 'html' sebagai engine mustache
```

Kita membuat lokasi template engine di direktori `/views` dengan format file `html` dan medaftarkannya sebagai Engine Mustache Express.

### 2️⃣ Buat File Html

Buat file html `index.html` di dalam direktori  `views`:

```
mkdir views
touch views/index.html
```

Isi file `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
</head>
<body>
    {{message}}
</body>
</html>
```

Parameter `{{title}}` dan `{{message}}` nantinya bisa di isi data secara dinamis.

### 3️⃣ Setup Route

```js
app.get('/hello', (req, res) => {
    res.render('index', { 
        title: 'Hello', 
        message: 'Hello World!' 
    });
});
```
Memasukan data `title` dan `message` pada response ke `index.html`.


### 🔥 Fullcode dengan Unit Test

```js
const request = require('supertest');
const express = require('express');
const mustache = require('mustache-express');

const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'html'); // setting file 'html' sebagai view engine
app.engine('html', mustache()); // daftarkan 'html' sebagai engine mustache

app.get('/hello', (req, res) => {
    res.render('index', { 
        title: 'Hello', 
        message: 'Hello World!' 
    });
});

test('Test Response /hello endpoint', async () => {
    const response = await request(app).get('/hello');
    console.log(response.text);
    expect(response.status).toBe(200);
    expect(response.text).toContain('Hello');
    expect(response.text).toContain('Hello World!');
});
```

Hasil:

```html
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello</title>
</head>
<body>
    Hello World!
</body>
</html>
```
