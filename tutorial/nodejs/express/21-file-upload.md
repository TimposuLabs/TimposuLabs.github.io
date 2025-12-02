---
sidebar_position: 21
title: 'Upload File'
---

Sebelumnya kita belum membahas bagaimana jika Request Body yang dikirim adalah _File Upload_ atau _Multipart Form Data_. Secara default Express.js, tidak menyediakan fitur untuk mengakses Unggah Berkas File. Namun, kita dapat memanfaatkan Middleware pihak ketiga untuk mengakses Upload File.

## ⬆️ Express Fileupload

`express-fileupload` adalah sebuah middleware sederhana untuk framework Express.js yang dirancang untuk menangani unggahan berkas (file upload).

Berikut function yang disediakan `express-fileupload`:

| Function | Keterangan |
| --- | --- |
| `req.files.foo.name` | mengembalikan nama file contoh "car.jpg" |
| `req.files.foo.mv` | Fungsi untuk memindahkan file ke tempat lain di server Anda. Dapat menerima callback atau return a promise. |
| `req.files.foo.mimetype` | Jenis file mimetype |
| `req.files.foo.data` | Representasi buffer file Anda, mengembalikan buffer kosong jika opsi `useTempFiles` diatur ke `true`. |
| `req.files.foo.tempFilePath` | Path file sementara jika opsi `useTempFiles` diatur ke true. |
| `req.files.foo.truncated` | Nilai boolean yang mewakili jika file melebihi batas ukuran |
| `req.files.foo.size` | Ukuran file yang diupload dalam _bytes_ |
| `req.files.foo.md5` | MD5 checksum file yang diupload |

:::tip
* https://github.com/richardgirges/express-fileupload#readme
:::

### ⚙️ Install Express Fileupload

```
npm i express-fileupload
```

### ✅ Menggunakan Express Fileupload

Buat folder `upload`, untuk menyimpan lokasi file yang akan diupload:

```
mkdir upload
```

Menggunakan `express-fileupload`:

```js
const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.json()); // menambahkan middleware untuk parsing JSON
app.use(express.urlencoded({ extended: false })); // menambahkan middleware untuk parsing form data dengan extended: false, yang berarti hanya mendukung tipe data sederhana
app.use(fileUpload()); // menambahkan middleware untuk handling file upload 

app.post('/file-upload', async (req, res) => {
    const textFile = req.files.textFile;
    await textFile.mv(__dirname + "/upload/" + textFile.name);

    res.send(`Hello ${req.body.name} File ${textFile.name} uploaded!`);
});
```

### 🔥 Fullcode dengan Unit Test

Berikut contoh kode di atas dengan unit test:

```js
const request = require('supertest');
const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.json()); // menambahkan middleware untuk parsing JSON
app.use(express.urlencoded({ extended: false })); // menambahkan middleware untuk parsing form data dengan extended: false, yang berarti hanya mendukung tipe data sederhana
app.use(fileUpload()); // menambahkan middleware untuk handling file upload 

app.post('/file-upload', async (req, res) => {
    const textFile = req.files.textFile;
    await textFile.mv(__dirname + "/upload/" + textFile.name);

    res.send(`Hello ${req.body.name} File ${textFile.name} uploaded!`);
});

// Unit Test
test('Test Request File Upload /file-upload endpoint', async () => {
    const response = await request(app)
        .post('/file-upload')
        .set('Content-Type', 'multipart/form-data')
        .field('name', 'Ucup')
        .attach('textFile', __dirname + '/hello.txt');

    expect(response.text).toBe('Hello Ucup File hello.txt uploaded!');
});
```
