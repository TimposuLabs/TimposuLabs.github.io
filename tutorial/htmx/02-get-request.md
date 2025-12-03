---
sidebar_position: 3
title: 'HTMX GET Request'
---

`hx-get` adalah salah satu atribut inti dan paling sering digunakan dalam library HTMX. Atribut ini memungkinkan Anda melakukan permintaan HTTP GET asinkron (AJAX) ke server dan memasukkan response yang diterima kembali ke dalam DOM halaman web Anda, semuanya tanpa menulis satu baris JavaScript pun. Dengan kata lain, `hx-get` mengambil konten baru dari URL tertentu saat terjadi  interaksi pengguna (misalnya, klik pada tombol atau perubahan pada dropdown).

## 🧑‍💻 Cara Kerja Dasar

Ketika Anda menambahkan atribut hx-get ke elemen HTML (seperti `<button>`, `<a>`, atau `<div>`), HTMX akan:

1. **Mencegat** peristiwa pemicu (_trigger event_).
2. **Mengirim** permintaan GET ke URL yang ditentukan dalam nilai atribut.
3. **Menerima** respons HTML parsial dari server.
4. **Menargetkan** dan **Menukar** respons tersebut ke dalam bagian yang ditentukan di halaman Anda (menggunakan atribut `hx-target` dan `hx-swap`).

### Syntaks

```html
<button hx-get="/url-dari-server"></button>
```

## Atribut tambahan

`hx-get` jarang digunakan sendirian. Atribut berikut sering ditambahkan:

| Atribut	| Deskripsi |
| --- | --- |
| `hx-target`	| **KE MANA** respons akan diletakkan (misalnya, `#hasil-pencarian`). |
| `hx-swap` |	**BAGAIMANA** respons akan diletakkan (misalnya, `innerHTML`, `afterend`, `outerHTML`). |
| `hx-trigger` |	**KAPAN** permintaan harus dilakukan (misalnya, `click`, `mouseenter`, `load`, `submit`). |
| `hx-indicator` |	Menampilkan atau menyembunyikan elemen loading spinner saat permintaan sedang berlangsung. |

## 1️⃣ Contoh A: Memuat Konten ke dalam Div

Ini adalah contoh di mana sebuah button diklik untuk memuat data profil pengguna dari server.

```html
<button hx-get="/api/profil/1" hx-target="#profil-detail" hx-swap="innerHTML">
    Muat Detail Profil Pengguna
</button>

<div id="profil-detail">
    <!-- Konten awal di sini. -->
    <p>Silakan klik tombol di atas untuk memuat data profil.</p>
</div>
```

**Penjelasan:**

* `hx-get="/api/profil/1"`: Ketika tombol diklik, HTMX melakukan GET ke URL tersebut.
* `hx-target="#profil-detail"`: Respons dari server akan dimasukkan ke dalam elemen dengan ID `profil-detail`.
* `hx-swap="innerHTML"`: Konten yang ada di dalam `#profil-detail` akan diganti dengan respons baru.

Misalkan server merespons dengan potongan HTML berikut:

```html
<!-- Respons dari server (/api/profil/1) -->
<div>
    <h3>Nama: Ucup Topekox</h3>
    <p>Email: ucup@gmail.com</p>
</div>
```

## 2️⃣ Contoh B: Memuat Halaman Saat Halaman Dimuat (Load)

Kita dapat menggunakan atribut `hx-trigger="load"` bersama `hx-get` untuk memuat konten segera setelah halaman HTML selesai dimuat di browser. Ini berguna untuk memuat data awal secara dinamis.

```html
<div hx-get="/api/daftar-produk-terbaru" hx-trigger="load" hx-swap="innerHTML">
    <!-- Pesan loading sementara -->
    <p>Memuat daftar produk terbaru...</p>
</div>
```

**Penjelasan:**

`hx-trigger="load"`: Memicu permintaan `hx-get` secara otomatis saat elemen `div` muncul di halaman.

## 3️⃣ Contoh C: Memuat Konten Saat Scroll (Infinite Scroll)

HTMX unggul dalam interaksi yang kompleks seperti _infinite scroll_. Anda bisa memuat halaman berikutnya saat pengguna mencapai bagian bawah halaman.

Kode HTML (di bagian bawah daftar Anda):

```html
<div hx-get="/api/halaman?page=2" 
     hx-trigger="intersect" 
     hx-swap="outerHTML"
     hx-target="#footer-loader">
    <!-- Elemen ini akan hilang dan diganti dengan konten baru + loader halaman 3 -->
</div>

<div id="footer-loader"></div>
```

**Penjelasan:**

* `hx-trigger="intersect"`: Memicu permintaan `hx-get` segera setelah elemen ini terlihat di viewport pengguna (saat pengguna scroll ke bawah dan "menyentuh" elemen ini).
* `hx-swap="outerHTML"`: Seluruh elemen `div` loader ini akan diganti oleh konten baru yang datang dari server. Konten baru tersebut idealnya berisi item daftar baru dan elemen loader berikutnya untuk halaman 3.

## 4️⃣ Contoh D: Memuat data dari Server

Contoh kasus menggunakan Express.js kita mempunyai data array:

```js
export const DATA_PROVINSI = [
    "Aceh",
    "Sumatera Utara",
    "Sumatera Barat",
    "Riau",
    "Jambi",
    "Sumatera Selatan",
    "Bengkulu",
    "Lampung",
    "Kepulauan Bangka Belitung",
    "Kepulauan Riau",
    "DKI Jakarta",
    "Jawa Barat",
    "Jawa Tengah",
    "DI Yogyakarta",
    "Jawa Timur",
    "Banten",
    "Bali",
    "Nusa Tenggara Barat",
    "Nusa Tenggara Timur",
    "Kalimantan Barat",
    "Kalimantan Tengah",
    "Kalimantan Selatan",
    "Kalimantan Timur",
    "Kalimantan Utara",
    "Sulawesi Utara",
    "Sulawesi Tengah",
    "Sulawesi Selatan",
    "Sulawesi Tenggara",
    "Gorontalo",
    "Sulawesi Barat",
    "Maluku",
    "Maluku Utara",
    "Papua Barat",
    "Papua",
    "Papua Selatan",
    "Papua Tengah",
    "Papua Pegunungan",
    "Papua Barat Daya"
];
```

Kemudian untuk backend servernya:

```js
const { DATA_PROVINSI } = require('./data/data-provinsi');

/*
 * More code here...
*/

app.get('/provinsi', (req, res) => {
  res.send(`
    <ul>
      ${DATA_PROVINSI.map(provinsi => `<li>${provinsi}</li>`).join('')}
    </ul>   
  `);
});
```

Untuk kode htmxnya:

```html
<main>
    <p>Berikut adalah data yang berisi daftar 38 provinsi di Indonesia</p>
    <button hx-get="/provinsi" hx-target="main" hx-swap="beforeend">Selengkapnya</button>
</main>
```

**Penjelasan**:

* **Client (Browser)**: HTMX mencegat klik dan mengirimkan permintaan HTTP GET ke `/provinsi`.
* **Server**: Server menerima permintaan `/provinsi` dan merespons dengan fragment HTML. Server merespons dengan daftar provinsi dalam bentuk `<ul>`.
* **Client (HTMX)**: HTMX mengambil respons tersebut. Karena `hx-target="main"` dan `hx-swap="beforeend"`, HTMX akan menyuntikkan (inject) HTML respons tersebut setelah tombol `"Selengkapnya"` tetapi sebelum tag penutup `</main>`.
