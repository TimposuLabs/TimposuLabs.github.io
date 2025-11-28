---
sidebar_position: 3
title: 'Application'
---

Saat kita membuat web menggunakan ExpressJS, kita akan membuat object __Application__. Application adalah object utama dalam library ExpressJS.

:::info
Baca Juga: https://expressjs.com/en/5x/api.html
:::

## 👨‍💻 Buat Aplikasi Hello World

1. Buat file javascript contoh `hello.js` di dalam direktori `src`.

```bash
mkdir src
touch src/hello.js
```

2. Buka `hello.js` dan masukkan kode berikut:

```js
import express from 'express';

const app = express();
```

3. Untuk menjalankannya ketikan perintah:

```bash
node src/hello.js 
```

Application secara default tidak berjalan, jika kita ingin menjalankan Application nya, kita perlu menggunakan method `listen(port)`. Dimana port adalah nomor port yang ingin kita gunakan untuk menjalankan web nya. Pastikan port yang kita pilih tidak bentrok dengan aplikasi lain.

```js
import express from 'express';

const app = express();

app.listen(3000 , () => {
    console.log('Server is running on port 3000');
});
```

Anda akan melihat output di terminal:

```
Server is running on port 3000
```

Dan url dengan page view kosong dapat diakses melalui browser dengan url `http://localhost:3000/`.
