---
sidebar_position: 2
title: 'Install HTMX'
---

Proses instalasi HTMX sangatlah mudah karena tidak memerlukan build tools (seperti Webpack atau Vite) secara default. Terdapat tiga metode utama untuk menginstal HTMX. Metode CDN adalah yang paling disarankan untuk pemula.

## 1️⃣ Menggunakan CDN (Content Delivery Network)

Ini adalah cara termudah. Kita cukup menambahkan HTMX ke halaman html kita dengan menautkan langsung ke file yang di-host secara eksternal.
 
Tambahkan tag `<script>` berikut ini di bagian `<head>` atau tepat sebelum tag penutup `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.8/dist/htmx.min.js" integrity="sha384-/TgkGk7p307TH7EXJDuUlgG3Ce1UVolAOFopFekQkkXihi5u/6OCvVKyz1W+idaz" crossorigin="anonymous"></script>
```

Untuk versi yang tidak diperkecil (unminified version):

```html
<script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.8/dist/htmx.js" integrity="sha384-ezjq8118wdwdRMj+nX4bevEi+cDLTbhLAeFF688VK8tPDGeLUe0WoY2MZtSla72F" crossorigin="anonymous"></script>
```

## 2️⃣ Download dan Copy secara manual

Jika kita bekerja secara offline, ingin menghindari ketergantungan eksternal, atau perlu mengontrol versi library secara ketat, kita dapat mengunduh file HTMX secara manual.

1. Download file `htmx.min.js` [di jsDelivr ](https://cdn.jsdelivr.net/npm/htmx.org@2.0.8/dist/htmx.min.js).
2. Simpan file tersebut di dalam folder project kita (contoh di dalam folder `js/`).
3. Tautkan file tersebut di file HTML ke dalam tag `<script>`:

```html
<script src="/path/to/htmx.min.js"></script>
```

## 3️⃣ Menggunakan Package Manager (npm/yarn)

Metode ini ditujukan untuk project JavaScript yang lebih kompleks yang menggunakan ekosistem Node.js dan bundler (seperti Webpack, Vite, atau Parcel).

1. Install melalui terminal atau command prompt di direktori project kita:

```
npm install htmx.org
# atau
yarn add htmx.org
```

2. Impor HTMX ke dalam file JavaScript utama Anda (misalnya `main.js`):

```js
import 'htmx.org';
```
