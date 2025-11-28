---
sidebar_position: 5
title: 'Unit Test'
---

Salah satu yang sulit ketika membuat aplikasi web yang harus berjalan yaitu melakukan automation test. Jika melakukan manual test, terlihat mudah tinggal kita buka melalui web browser. Namun dalam pekerjaan sehari-hari, lambat laun, hal ini akan menyulitkan kita ketika harus melakukan manual test jika terdapat perubahan di aplikasi kita. Oleh karena itu, sangat direkomendasikan menggunakan unit test, walaupun aplikasinya dalam bentuk web.

## Supertest

Supertest adalah salah satu library yang bisa digunakan untuk membantu melakukan pengetesan web Express.js. Dengan Supertest, kita bisa lebih mudah membuat unit testnya, dibading melakukan secara manual.

:::info
https://www.npmjs.com/package/supertest 
:::

### 1. ⚙️ Install Supertest dan Jest

Kita memerlukan `Mocha` atau `Jest` sebagai test framework utama, dan `SuperTest` untuk melakukan permintaan HTTP. Kita akan menggunakan `Jest` dalam contoh ini karena popularitasnya.


```
npm i supertest --save-dev
npm i jest --save-dev
```

Pastikan pada file `package.json` bagian `devDependencies` sudah terdapat dependencinya:

```json
 "devDependencies": {
    "jest": "^30.2.0",
    "supertest": "^7.1.4"
  }
```

Dan update `type` dan `script`:

```json
"type": "commonjs",
  "scripts": {
    "test": "jest"
  },
```

Sehingga `package.json` menjadi seperti ini:

```json
{
  "name": "belajar-express",
  "version": "1.0.0",
  "description": "Belajar Express JS",
  "main": "index.js",
  "type": "commonjs",
  "scripts": {
    "test": "jest"
  },
  "author": "Ucup Topekox",
  "license": "ISC",
  "dependencies": {
    "express": "^5.1.0"
  },
  "devDependencies": {
    "jest": "^30.2.0",
    "supertest": "^7.1.4"
  }
}
```

### 2. 💻 Buat file test

Buat file test contoh direktori `test`:

```
mkdir test
touch test/request.test.js
```

Isi dalam file `request.test.js`:

```js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

// melakukan test untuk endpoint /hello
test('Test Express /hello endpoint', async () => {
    const response = await request(app).get('/hello');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
});
```

### 3. 🚀 Jalankan Test

```
npm test
```

Output jika sukses

```bash
npm test

> belajar-express@1.0.0 test
> jest

 PASS  test/request.test.js
  √ Test Express /hello endpoint (46 ms)
                                                                                                                                                                                                
Test Suites: 1 passed, 1 total                                                                                                                                                                  
Tests:       1 passed, 1 total                                                                                                                                                                  
Snapshots:   0 total
Time:        1.036 s, estimated 2 s
Ran all test suites.
```
