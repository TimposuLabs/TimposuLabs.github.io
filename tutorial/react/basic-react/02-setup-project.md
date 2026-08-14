---
sidebar_position: 2
title: "Setup Project"
---

## Menyiapkan Starting Project React

Sebelum mulai menulis kode React, kita perlu menyiapkan **starting project** atau proyek awal.

Starting project merupakan proyek React yang sudah memiliki struktur dasar dan konfigurasi yang diperlukan sehingga kita dapat langsung fokus mempelajari React tanpa harus melakukan konfigurasi dari awal.

Ada dua pilihan utama untuk menjalankan proyek React:

1. **CodeSandbox** - berjalan langsung melalui browser.
2. **Local Development** - berjalan di komputer sendiri.

---

## 1. Menggunakan CodeSandbox

**CodeSandbox** merupakan lingkungan pengembangan berbasis browser yang memungkinkan kita menjalankan proyek React tanpa harus melakukan instalasi secara lokal.

Jika materi menyediakan proyek CodeSandbox, biasanya kita cukup membuka tautan proyek tersebut.

### Kelebihan CodeSandbox

- Tidak perlu menginstal Node.js secara lokal.
- Tidak perlu menjalankan `npm install` secara manual.
- Tidak perlu menjalankan `npm run dev` secara manual.
- Proyek dapat langsung dijalankan melalui browser.
- Cocok untuk belajar dan mencoba kode dengan cepat.

Secara sederhana:

```text
Browser
   │
   ▼
CodeSandbox
   │
   ├── React
   ├── Dependencies
   └── Development Server
```

Semua kebutuhan dasar proyek sudah disediakan oleh lingkungan CodeSandbox.

---

## 2. Menjalankan React Secara Lokal

Selain CodeSandbox, kita juga dapat menjalankan proyek React langsung di komputer.

Keuntungan menggunakan lingkungan lokal adalah kita memiliki kontrol penuh terhadap proyek dan dapat menggunakan code editor seperti **Visual Studio Code**.

Sebelum memulai, pastikan **Node.js** sudah terinstal.

Untuk memeriksa instalasi Node.js:

```bash
node --version
```

Untuk memeriksa `npm`:

```bash
npm --version
```

Jika kedua perintah tersebut menampilkan nomor versi, berarti Node.js dan npm sudah tersedia.

---

## 3. Menyiapkan Starting Project

Jika starting project diberikan dalam bentuk file ZIP, langkah pertama adalah [mengunduh file](https://github.com/academind/react-complete-guide-course-resources/blob/main/attachments/03%20React%20Essentials/01-starting-project.zip) tersebut.

Setelah selesai:

1. Ekstrak file ZIP.
2. Buka folder hasil ekstraksi.
3. Buka folder tersebut menggunakan code editor.

Contohnya menggunakan Visual Studio Code:

```text
File
└── Open Folder
```

Pilih folder proyek React yang telah diekstrak.

Struktur proyek biasanya terlihat seperti:

```text
my-react-app/
├── node_modules/
├── public/
├── src/
├── package.json
├── package-lock.json
└── ...
```

> Folder `node_modules` mungkin belum tersedia sebelum menjalankan `npm install`.

:::tip
Kita juga bisa membuat project lokal React menggunakan Vite:

```bash
npm create vite@latest nama-project-anda -- --template react
```
:::

---

## 4. Mengenal `package.json`

Salah satu file penting dalam proyek Node.js dan React adalah:

```text
package.json
```

File ini berisi informasi dan konfigurasi proyek, termasuk:

- Nama proyek.
- Versi proyek.
- Dependencies.
- Development dependencies.
- Script yang dapat dijalankan menggunakan npm.

Contoh sederhana:

```json
{
  "name": "my-react-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "react": "...",
    "react-dom": "..."
  }
}
```

Bagian `scripts` memungkinkan kita menjalankan perintah seperti:

```bash
npm run dev
```

---

## 5. Menjalankan `npm install`

Setelah membuka folder proyek, buka terminal di dalam folder tersebut.

Pastikan posisi terminal berada di direktori proyek.

Contoh:

```bash
cd my-react-app
```

Kemudian jalankan:

```bash
npm install
```

Perintah ini akan membaca `package.json` dan mengunduh dependencies yang dibutuhkan proyek.

Misalnya:

```text
React
React DOM
Vite
dan dependencies lainnya
```

Setelah selesai, npm akan membuat folder:

```text
node_modules/
```

Folder tersebut berisi berbagai package yang dibutuhkan proyek.

---

## 6. Apa Fungsi `node_modules`?

`node_modules` merupakan folder tempat npm menyimpan package yang digunakan oleh proyek.

Misalnya proyek membutuhkan:

```text
React
React DOM
Vite
```

package tersebut akan tersedia di dalam `node_modules`.

Kita biasanya **tidak perlu mengedit isi folder `node_modules` secara manual**.

Folder ini juga biasanya tidak disertakan ketika proyek dibagikan melalui repository karena ukurannya dapat sangat besar.

Jika `node_modules` tidak tersedia, kita cukup menjalankan:

```bash
npm install
```

---

## 7. Menjalankan Development Server

Setelah proses instalasi selesai, jalankan:

```bash
npm run dev
```

Perintah tersebut menjalankan **development server** yang digunakan selama proses pengembangan aplikasi.

Jika menggunakan Vite, terminal biasanya menampilkan informasi seperti:

```text
VITE ready

Local: http://localhost:5173/
```

Alamat tersebut kemudian dapat dibuka melalui browser.

Contoh:

```text
http://localhost:5173/
```

---

## 8. Apa Itu Development Server?

Development server merupakan server yang digunakan selama proses pengembangan aplikasi.

Server ini membantu kita:

- Menjalankan aplikasi React.
- Memproses kode sumber.
- Mengubah JSX menjadi kode yang dapat dipahami browser.
- Memantau perubahan file.
- Memperbarui tampilan aplikasi secara otomatis.

Alur sederhananya:

```text
Kode React
    │
    ▼
Development Server
    │
    ├── Transform JSX
    ├── Process Modules
    └── Watch File Changes
    │
    ▼
Browser
```

---

## 9. Live Reload / Hot Module Replacement

Saat development server berjalan, kita dapat mengubah kode React dan melihat perubahan pada browser secara otomatis.

Misalnya kita mengubah:

```jsx
<h1>Hello World</h1>
```

menjadi:

```jsx
<h1>Hello React!</h1>
```

Setelah file disimpan, browser akan memperbarui tampilan tanpa harus menjalankan ulang server.

Pada tooling modern seperti Vite, mekanisme ini dikenal sebagai **Hot Module Replacement (HMR)**.

Fitur ini membuat proses development menjadi jauh lebih cepat.

---

## 10. Jangan Menutup Development Server

Selama sedang melakukan coding, biarkan proses berikut tetap berjalan:

```bash
npm run dev
```

Terminal tersebut akan terus menjalankan development server.

Contoh:

```text
Terminal 1
└── npm run dev
    └── Development Server
```

Kemudian gunakan code editor untuk mengubah kode React.

```text
Visual Studio Code
        │
        ▼
     Edit Code
        │
        ▼
Development Server
        │
        ▼
     Browser
```

---

## 11. Menghentikan Development Server

Jika sudah selesai bekerja, development server dapat dihentikan dengan:

```text
Ctrl + C
```

Terminal akan kembali ke command prompt.

Untuk menjalankan kembali server di kemudian hari, cukup gunakan:

```bash
npm run dev
```

---

## 12. Alur Kerja Pengembangan React

Secara umum, workflow React lokal dapat diringkas sebagai berikut:

```text
1. Download Starting Project
          │
          ▼
2. Extract Project
          │
          ▼
3. Open Project di Code Editor
          │
          ▼
4. Buka Terminal
          │
          ▼
5. npm install
          │
          ▼
6. npm run dev
          │
          ▼
7. Buka localhost di Browser
          │
          ▼
8. Mulai Coding React
          │
          ▼
9. Simpan File
          │
          ▼
10. Browser Otomatis Memperbarui
```

---

## 13. `npm install` vs `npm run dev`

Kedua perintah ini memiliki fungsi yang berbeda.

| Perintah | Fungsi |
|----------|--------|
| `npm install` | Menginstal dependencies proyek |
| `npm run dev` | Menjalankan development server |

Biasanya:

```bash
npm install
```

cukup dilakukan ketika pertama kali menyiapkan proyek atau setelah dependencies berubah.

Sedangkan:

```bash
npm run dev
```

dijalankan setiap kali kita ingin memulai sesi development.

---

## 14. Jika Mendapat Error `npm`

Jika muncul pesan seperti:

```text
npm is not recognized
```

atau:

```text
npm: command not found
```

kemungkinan Node.js belum terinstal atau belum masuk ke PATH sistem.

Periksa terlebih dahulu:

```bash
node --version
```

dan:

```bash
npm --version
```

Jika keduanya tidak dikenali, instal Node.js terlebih dahulu.

---

## 15. Jika `node_modules` Hilang

Tidak perlu panik jika folder:

```text
node_modules/
```

tidak tersedia.

Selama file berikut masih ada:

```text
package.json
package-lock.json
```

kita dapat menginstal kembali dependencies dengan:

```bash
npm install
```

Setelah proses selesai, folder `node_modules` akan dibuat kembali.

---

## 16. Jika Ingin Menginstal Ulang Dependencies

Dalam kondisi tertentu, kita mungkin perlu menghapus `node_modules` dan melakukan instalasi ulang.

Setelah menghapus folder:

```text
node_modules/
```

jalankan:

```bash
npm install
```

Kemudian:

```bash
npm run dev
```

Namun, langkah ini **tidak perlu dilakukan secara rutin**. Gunakan hanya jika memang terdapat masalah pada dependencies atau instalasi proyek.

---

## CodeSandbox vs Local Development

Kedua pendekatan memiliki kelebihan masing-masing.

| CodeSandbox | Local Development |
|-------------|-------------------|
| Berbasis browser | Berjalan di komputer |
| Tidak perlu setup lokal | Membutuhkan Node.js |
| Cepat untuk belajar | Lebih fleksibel |
| Tidak perlu terminal secara manual | Menggunakan terminal |
| Cocok untuk eksperimen | Cocok untuk proyek nyata |
| Setup otomatis | Setup dilakukan sendiri |

Untuk mengikuti tutorial, keduanya dapat digunakan.

Namun, jika ingin membangun aplikasi React secara serius, **local development** sangat disarankan karena memberikan pengalaman yang lebih dekat dengan workflow pengembangan aplikasi sebenarnya.

---

## Poin Penting

Sebelum mulai belajar React, pastikan memahami beberapa hal berikut:

- **Node.js** digunakan sebagai fondasi environment development.
- **npm** digunakan untuk mengelola dependencies dan menjalankan script proyek.
- `package.json` menyimpan konfigurasi dan dependencies proyek.
- `npm install` digunakan untuk menginstal dependencies.
- `npm run dev` digunakan untuk menjalankan development server.
- Browser digunakan untuk melihat hasil aplikasi.
- Development server sebaiknya tetap berjalan selama coding.
- Perubahan kode biasanya dapat langsung terlihat melalui HMR.
- `Ctrl + C` digunakan untuk menghentikan development server.

---

## Kesimpulan

Menyiapkan proyek React sebenarnya cukup sederhana.

Jika menggunakan **CodeSandbox**, kita dapat langsung menggunakan starting project yang telah disediakan.

Jika menggunakan komputer sendiri, alurnya adalah:

```bash
npm install
```

kemudian:

```bash
npm run dev
```

Setelah development server berjalan, buka alamat `localhost` yang ditampilkan di terminal.

Mulai dari sini, kita sudah memiliki lingkungan yang siap digunakan untuk mempelajari berbagai konsep React seperti **JSX, Component, Props, State, Event Handling, Conditional Rendering, dan Hooks**.
