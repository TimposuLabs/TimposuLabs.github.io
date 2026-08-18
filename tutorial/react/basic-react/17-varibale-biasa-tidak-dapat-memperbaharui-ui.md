---
sidebar_position: 17
title: "Sifat Variabel Biasa di UI React"
---

## Mengapa Variabel Biasa Tidak Dapat Memperbarui UI?

Dalam aplikasi React, kita mungkin mengira bahwa mengubah nilai sebuah variabel JavaScript biasa akan otomatis mengubah tampilan di layar.

Namun, hal tersebut **tidak berlaku di React**.

React perlu mengetahui bahwa terdapat perubahan data yang harus menyebabkan component dirender kembali. Untuk kebutuhan tersebut, React menyediakan konsep **State**.

---

## 1. Contoh Menggunakan Variabel Biasa

Perhatikan contoh berikut:

```jsx
function App() {
  let tabContent = "Please click a button";

  function handleSelect(selectedButton) {
    tabContent = selectedButton;

    console.log(tabContent);
  }

  return (
    <div>
      <button onClick={() => handleSelect("components")}>
        Components
      </button>

      <p>{tabContent}</p>
    </div>
  );
}
```

Ketika tombol diklik:

```text
User klik tombol
       ↓
handleSelect()
       ↓
tabContent berubah
       ↓
      UI ?
```

Nilai `tabContent` memang berubah di JavaScript.

Namun, teks yang ditampilkan pada halaman **tidak berubah**.

---

## 2. Mengapa UI Tidak Berubah?

Masalahnya bukan karena JavaScript gagal mengubah variabel.

JavaScript sebenarnya berhasil melakukan:

```javascript
tabContent = selectedButton;
```

Masalahnya adalah **React tidak diberi tahu bahwa nilai tersebut berubah**.

React tidak secara otomatis mengawasi setiap variabel JavaScript yang dibuat di dalam component.

Dengan kata lain:

```text
Variabel berubah
      ≠
React melakukan re-render
```

---

## 3. Component React pada Initial Render

Ketika React pertama kali menjalankan sebuah component, fungsi component dieksekusi.

Contohnya:

```jsx
function App() {
  let tabContent = "Please click a button";

  return (
    <p>{tabContent}</p>
  );
}
```

Pada saat initial render, React menjalankan:

```text
App()
```

Kemudian:

```text
tabContent
     ↓
"Please click a button"
     ↓
    JSX
     ↓
    React
     ↓
    DOM
```

Hasilnya ditampilkan di browser.

---

## 4. Apa yang Terjadi Ketika Tombol Diklik?

Ketika pengguna mengklik tombol:

```jsx
<button onClick={handleSelect}>
  Components
</button>
```

React menjalankan event handler:

```javascript
handleSelect();
```

Kemudian:

```javascript
tabContent = "components";
```

Nilai variabel memang berubah.

Tetapi React tidak otomatis menjalankan kembali:

```javascript
App();
```

Akibatnya JSX berikut:

```jsx
<p>{tabContent}</p>
```

tidak dievaluasi ulang berdasarkan nilai baru tersebut.

---

## 5. Perubahan Variabel Tidak Sama dengan Re-render

Ini merupakan konsep yang sangat penting.

Misalnya:

```javascript
let count = 0;

count = 1;
```

JavaScript mengetahui bahwa:

```text
count = 1
```

Tetapi React tidak otomatis mengetahui bahwa perubahan tersebut harus menyebabkan UI diperbarui.

Secara sederhana:

```text
JavaScript Variable
        │
        │ berubah
        ▼
Nilai berubah
        │
        X
        │
        ▼
React tidak otomatis re-render
```

---

## 6. Bagaimana React Memperbarui UI?

React perlu melakukan proses **re-rendering** agar perubahan data dapat ditampilkan.

Secara sederhana, prosesnya:

```text
Data berubah
    ↓
React mengetahui perubahan
    ↓
Component dijalankan kembali
    ↓
JSX baru dihasilkan
    ↓
React membandingkan hasilnya
    ↓
DOM diperbarui jika diperlukan
    ↓
UI berubah
```

Jadi, kunci utamanya adalah:

> *React harus mengetahui bahwa terdapat perubahan yang perlu menyebabkan component di-render kembali.*

---

## 7. Mengapa React Tidak Mengawasi Semua Variabel?

Bayangkan sebuah component memiliki banyak variabel:

```jsx
function App() {
  let name = "Budi";
  let age = 20;
  let address = "Palu";
  let score = 90;
  let status = "active";

  // ...
}
```

Jika React harus mengawasi setiap perubahan pada semua variabel JavaScript, mekanisme tersebut akan menjadi tidak efisien dan tidak jelas kapan sebuah perubahan memang harus menyebabkan UI diperbarui.

Karena itu, React menggunakan mekanisme khusus untuk data yang perlu memicu re-render, yaitu **State**.

---

## 8. Solusi: Menggunakan State

Untuk data yang perubahan nilainya harus menyebabkan UI diperbarui, gunakan **State**.

React menyediakan Hook bernama:

```javascript
useState
```

Contoh:

```jsx
import { useState } from "react";

function App() {
  const [tabContent, setTabContent] = useState(
    "Please click a button"
  );

  function handleSelect(selectedButton) {
    setTabContent(selectedButton);
  }

  return (
    <div>
      <button onClick={() => handleSelect("components")}>
        Components
      </button>

      <p>{tabContent}</p>
    </div>
  );
}
```

Sekarang ketika tombol diklik:

```text
User klik tombol
       ↓
handleSelect()
       ↓
setTabContent()
       ↓
State berubah
       ↓
React melakukan re-render
       ↓
App() dijalankan kembali
       ↓
JSX menghasilkan nilai baru
       ↓
UI diperbarui
```

---

## 9. Perbedaan Variabel Biasa dan State

### Variabel Biasa

```jsx
let tabContent = "Please click a button";

function handleSelect(selectedButton) {
  tabContent = selectedButton;
}
```

Perubahan nilai:

```text
tabContent berubah
        ↓
React tidak diberi tahu
        ↓
Tidak ada re-render
        ↓
UI tidak berubah
```

### State

```jsx
const [tabContent, setTabContent] = useState(
  "Please click a button"
);

function handleSelect(selectedButton) {
  setTabContent(selectedButton);
}
```

Perubahan nilai:

```text
setTabContent()
        ↓
React mengetahui perubahan
        ↓
Re-render
        ↓
UI diperbarui
```

---

## 10. State Bukan Sekadar Variabel Biasa

State memang menyimpan nilai seperti variabel biasa, tetapi State memiliki kemampuan tambahan.

State:

- Menyimpan data component.
- Dikelola oleh React.
- Perubahannya dapat memicu re-render.
- Memungkinkan UI merespons perubahan data.

Sedangkan variabel biasa:

- Hanya merupakan nilai JavaScript biasa.
- Tidak secara otomatis dipantau React.
- Perubahannya tidak menyebabkan re-render.

---

## 11. Jangan Mengubah State Secara Langsung

Setelah menggunakan `useState`, kita mendapatkan dua nilai:

```jsx
const [tabContent, setTabContent] = useState(
  "Please click a button"
);
```

Yaitu:

```text
tabContent
    ↓
Nilai State saat ini

setTabContent
    ↓
Function untuk mengubah State
```

Gunakan function setter untuk memperbarui State:

```jsx
setTabContent("components");
```

Jangan mengubah nilai State secara langsung:

```jsx
tabContent = "components";
```

Cara kedua tidak memberitahu React bahwa State perlu diperbarui.

---

## 12. State dan Re-render

Ketika setter State dipanggil:

```jsx
setTabContent("components");
```

React akan mengetahui bahwa State berubah.

Kemudian React dapat menjalankan kembali component:

```jsx
function App() {
  // Component dijalankan kembali
}
```

Pada render berikutnya:

```jsx
<p>{tabContent}</p>
```

akan menggunakan nilai State terbaru.

---

## 13. Contoh Alur Lengkap

Misalnya kondisi awal:

```text
tabContent = "Please click a button"
```

UI:

```text
Please click a button
```

Kemudian pengguna mengklik:

```text
Components
```

Event handler menjalankan:

```jsx
setTabContent("components");
```

React kemudian melakukan re-render.

Nilai terbaru:

```text
tabContent = "components"
```

JSX:

```jsx
<p>{tabContent}</p>
```

menghasilkan:

```text
components
```

Sehingga UI berubah.

---

## 14. Cara Berpikir yang Tepat tentang React

Saat menggunakan React, jangan berpikir:

> "Saya mengubah variabel, jadi tampilan harus berubah."

Lebih tepat untuk berpikir:

> "Saya mengubah State, sehingga React mengetahui bahwa component perlu di-render kembali."

Pola dasarnya adalah:

```text
User Interaction
       ↓
Event Handler
       ↓
Update State
       ↓
React Re-render
       ↓
UI diperbarui
```

---

## 15. Hubungan dengan Event Handling

Materi sebelumnya mengenai Event Handling dan materi State saling berhubungan.

Event handler:

```jsx
function handleSelect() {
  // ...
}
```

digunakan untuk merespons tindakan pengguna.

State:

```jsx
const [selectedTab, setSelectedTab] = useState();
```

digunakan untuk menyimpan data yang dapat berubah dan memengaruhi UI.

Keduanya kemudian bekerja bersama:

```text
User
 │
 │ Click
 ▼
Event Handler
 │
 │ setState()
 ▼
State berubah
 │
 ▼
Re-render
 │
 ▼
UI berubah
```

---

## 16. Poin Penting

Beberapa konsep yang perlu diingat:

- Mengubah variabel JavaScript biasa tidak otomatis memperbarui UI React.
- React tidak mengawasi setiap variabel biasa yang dibuat di dalam component.
- React perlu melakukan **re-render** agar JSX dievaluasi kembali.
- **State** digunakan untuk menyimpan data yang perubahan nilainya perlu memengaruhi UI.
- `useState` digunakan untuk membuat State.
- Gunakan function setter seperti `setTabContent()` untuk mengubah State.
- Jangan mengubah State secara langsung.
- Event handler sering digunakan untuk memicu perubahan State.
- Perubahan State dapat menyebabkan component di-render kembali.

---

## Kesimpulan

Variabel JavaScript biasa tidak cukup untuk mengelola data yang harus memperbarui UI React.

Contoh berikut tidak akan membuat UI diperbarui:

```jsx
let tabContent = "Please click a button";

function handleSelect() {
  tabContent = "Components";
}
```

Untuk data yang memengaruhi tampilan, gunakan State:

```jsx
const [tabContent, setTabContent] = useState(
  "Please click a button"
);

function handleSelect() {
  setTabContent("Components");
}
```

Perbedaan utamanya adalah **React mengetahui perubahan yang dilakukan melalui State**.

Pola dasar yang perlu diingat:

```text
Event
  ↓
Event Handler
  ↓
State Update
  ↓
Re-render
  ↓
UI Update
```

Konsep ini merupakan fondasi penting dalam React karena hampir semua aplikasi React yang interaktif menggunakan pola **State → Re-render → UI**.