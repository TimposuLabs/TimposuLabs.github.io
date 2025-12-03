---
sidebar_position: 1
---

# Intro

`htmx` adalah sebuah pustaka (library) Javascript yang dirancang untuk mengubah cara kita berinteraksi dengan browser. Jika Anda pernah merasa bahwa pengembangan web modern terlalu rumit dengan framework JavaScript yang besar, `htmx` menawarkan kesederhanaan HTML yang elegan.

## Apa Itu htmx?

Secara sederhana, `htmx` adalah sebuah ekstensi untuk HTML. Ini membuat kita bisa melakukan hal-hal yang sebelumnya memerlukan kode JavaScript yang rumit, seperti memperbarui bagian halaman web secara dinamis, mengirim data ke server tanpa me-reload ulang halaman web, dan menambahkan efek transisi hanya dengan menambahkan atribut khusus langsung ke dalam markup HTML.

Filosofi utamanya adalah: **HTML seharusnya menjadi "hypermedia" yang kuat**.

## Mengapa Menggunakan htmx?

Tujuan utama `htmx` adalah membuat programmer web (terutama backend engineer) untuk membangun user interface (UI) yang kaya dan interaktif tanpa harus menjadi ahli JavaScript frontend.

* __Mengurangi Kompleksitas__: Kita tidak perlu repot beralih/berpindah antara  backend, JavaScript frontend, dan manajemen status datanya. Semuanya hanya diurus dalam HTML.
* __Kecepatan Pengembangan__: Fungsionalitas interaktif dasar dapat diimplementasikan jauh lebih cepat.
* __Ukuran Minimal__: Library ini sangat kecil dan ringan, sehingga waktu loading halaman web lebih cepat.
* __Fokus pada Backend__: Server backend hanya bertanggung jawab untuk mengembalikan fragmen HTML yang siap ditampilkan, bukan data mentah (JSON). Ini menyederhanakan arsitektur aplikasi secara keseluruhan.

## Cara Kerjanya

Dengan pendekatan tradisional, ketika kita mengklik sesuatu yang interaktif, JavaScript mengambil alih, berbicara dengan server untuk mendapatkan data JSON, lalu secara manual membuat elemen HTML baru di browser.

Dengan `htmx`, prosesnya jauh lebih langsung:

1. Anda mempunyai elemen HTML (misalnya, sebuah `button`) dengan atribut `htmx` yang berfungsi: "Saat diklik, lakukan permintaan GET ke URL ini".
2. Browser melakukan request tersebut ke server.
3. Server Anda merespons dengan potongan HTML mentah yang baru.
4. `htmx` secara otomatis mengambil respons HTML tersebut dan menukarnya (misalnya, menggantikannya) ke bagian yang Anda tentukan di halaman web, tanpa reload seluruh halaman.

## Kesimpulan

`htmx` bukanlah framework frontend pengganti React atau Vue. Sebaliknya, `htmx` adalah pelengkap yang memungkinkan kita membuat banyak interaktivitas di web tanpa perlu meninggalkan paradigma web berbasis server tradisional. Ini mengembalikan kesederhanaan dalam membangun web dengan menempatkan kembali HTML sebagai pusat dari pengalaman interaktif.

:::info
**Dokumentasi HTMX**: 
* https://htmx.org/docs/
* https://htmx.org/reference/
:::
