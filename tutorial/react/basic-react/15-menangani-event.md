---
sidebar_position: 15
title: "Menangani Event"
---

Aplikasi web tidak hanya menampilkan informasi, tetapi juga harus dapat merespons tindakan pengguna.

Misalnya:

- Pengguna mengklik tombol.
- Pengguna mengetik pada input.
- Pengguna mengarahkan mouse ke suatu elemen.
- Pengguna mengirimkan form.

React menyediakan mekanisme **Event Handling** untuk menangani berbagai interaksi tersebut.

---

## 1. Mengapa Perlu Menangani Event?

Event memungkinkan aplikasi merespons tindakan yang dilakukan oleh pengguna.

Contohnya, ketika pengguna mengklik tombol:

```text
User klik tombol
       │
       ▼
    Event
       │
       ▼
 Event Handler
       │
       ▼
Menjalankan Logic
       │
       ▼
 UI diperbarui
```

Dalam aplikasi React, event sering digunakan untuk:

- Membuka atau menutup menu.
- Mengubah data yang ditampilkan.
- Menampilkan tab tertentu.
- Mengubah state.
- Memvalidasi input.
- Mengirim form.
- Menjalankan aksi tertentu ketika tombol diklik.

---

## 2. Pendekatan Imperatif vs Deklaratif

Salah satu perbedaan penting antara JavaScript biasa dan React adalah cara kita menangani interaksi dengan DOM.

### Vanilla JavaScript: Imperatif

Dalam JavaScript biasa, kita dapat mengambil elemen DOM secara langsung kemudian memasang event listener.

```javascript
const button = document.querySelector("button");

button.addEventListener("click", function () {
  console.log("Button clicked!");
});
```

Kita secara langsung memberi tahu browser **bagaimana cara melakukan sesuatu** terhadap DOM.

Pendekatan ini disebut **imperatif**.

---

## 3. React: Deklaratif

Dalam React, kita biasanya tidak perlu mengambil elemen DOM secara manual.

Kita cukup mendeklarasikan event pada JSX:

```jsx
<button onClick={handleClick}>
  Click Me
</button>
```

React kemudian menangani proses event tersebut di belakang layar.

Pendekatan ini disebut **deklaratif** karena kita mendeskripsikan apa yang harus dilakukan ketika event terjadi.

---

## 4. Event Props di React

React menyediakan berbagai event props yang dapat digunakan pada elemen JSX.

Beberapa yang umum digunakan:

| Event Prop | Kegunaan |
| --- | --- |
| `onClick` | Menangani klik |
| `onChange` | Menangani perubahan nilai input |
| `onSubmit` | Menangani pengiriman form |
| `onMouseEnter` | Ketika mouse masuk ke elemen |
| `onMouseLeave` | Ketika mouse meninggalkan elemen |
| `onFocus` | Ketika elemen mendapatkan fokus |
| `onBlur` | Ketika elemen kehilangan fokus |
| `onKeyDown` | Ketika tombol keyboard ditekan |

Nama event di React menggunakan **camelCase**.

Contoh:

```jsx
onClick
```

bukan:

```jsx
onclick
```

---

## 5. Membuat Event Handler

Event handler adalah fungsi yang akan dijalankan ketika event tertentu terjadi.

Contoh:

```jsx
function handleClick() {
  console.log("Button clicked!");
}
```

Kemudian fungsi tersebut diberikan kepada `onClick`:

```jsx
<button onClick={handleClick}>
  Click Me
</button>
```

Ketika pengguna mengklik tombol, React akan menjalankan:

```javascript
handleClick
```

---

## 6. Konvensi Penamaan Event Handler

Sebaiknya gunakan nama fungsi yang menjelaskan tindakan yang dilakukan.

Konvensi yang umum digunakan adalah:

```text
handle + nama event
```

Contoh:

```javascript
handleClick
handleChange
handleSubmit
handleMouseEnter
handleKeyDown
```

Contoh:

```jsx
function handleClick() {
  console.log("Button clicked!");
}
```

atau:

```jsx
function handleSubmit() {
  console.log("Form submitted!");
}
```

Penamaan yang jelas membuat kode lebih mudah dibaca.

---

## 7. Jangan Gunakan Tanda Kurung `()`

Ini merupakan salah satu konsep penting dalam event handling React.

### ❌ Salah

```jsx
<button onClick={handleClick()}>
  Click Me
</button>
```

### ✅ Benar

```jsx
<button onClick={handleClick}>
  Click Me
</button>
```

Perbedaannya terletak pada cara JavaScript memperlakukan fungsi tersebut.

---

## 8. Mengapa `handleClick()` Salah?

Ketika kita menulis:

```jsx
onClick={handleClick()}
```

tanda `()` berarti **memanggil fungsi**.

Dengan kata lain, fungsi akan dijalankan ketika JSX dievaluasi saat component dirender.

Contoh:

```jsx
function handleClick() {
  console.log("Button clicked!");
}

<button onClick={handleClick()}>
  Click Me
</button>
```

`handleClick()` akan langsung dieksekusi, bukan menunggu pengguna mengklik tombol.

---

## 9. Mengapa `handleClick` Benar?

Ketika kita menulis:

```jsx
<button onClick={handleClick}>
  Click Me
</button>
```

kita tidak menjalankan fungsi tersebut.

Kita memberikan **referensi fungsi** kepada React.

React kemudian akan menjalankannya ketika event `click` terjadi.

Secara sederhana:

```text
onClick={handleClick}
        │
        ▼
Kirim referensi fungsi
        │
        ▼
React menunggu event
        │
        ▼
User klik tombol
        │
        ▼
handleClick()
```

---

## 10. Contoh Component Sederhana

Berikut contoh lengkap component `TabButton`:

```jsx
export default function TabButton({ children }) {
  function handleClick() {
    console.log("Hello World!");
  }

  return (
    <li>
      <button onClick={handleClick}>
        {children}
      </button>
    </li>
  );
}
```

Ketika tombol diklik:

```text
User klik button
       │
       ▼
    onClick
       │
       ▼
 handleClick
       │
       ▼
"Hello World!"
```

---

## 11. Event Handler dengan Arrow Function

Event handler juga dapat dibuat menggunakan arrow function.

```jsx
export default function TabButton({ children }) {
  const handleClick = () => {
    console.log("Hello World!");
  };

  return (
    <li>
      <button onClick={handleClick}>
        {children}
      </button>
    </li>
  );
}
```

Perilakunya sama dengan menggunakan function declaration.

---

## 12. Event Handler untuk Input

Event handling tidak hanya digunakan untuk tombol.

Contohnya pada input:

```jsx
function handleChange() {
  console.log("Input berubah");
}

return (
  <input onChange={handleChange} />
);
```

Setiap kali nilai input berubah, React akan menjalankan:

```javascript
handleChange
```

---

## 13. Event Handler untuk Form

Untuk form, kita dapat menggunakan `onSubmit`.

```jsx
function handleSubmit() {
  console.log("Form submitted!");
}

return (
  <form onSubmit={handleSubmit}>
    <button type="submit">
      Submit
    </button>
  </form>
);
```

Ketika form dikirim, React akan menjalankan `handleSubmit`.

---

## 14. Menggunakan Event Object

React akan meneruskan object event kepada event handler.

Contoh:

```jsx
function handleClick(event) {
  console.log(event);
}
```

Kemudian:

```jsx
<button onClick={handleClick}>
  Click Me
</button>
```

Object tersebut berisi informasi mengenai event yang terjadi.

Kita dapat menggunakannya untuk mendapatkan informasi seperti:

- Elemen yang memicu event.
- Jenis event.
- Informasi keyboard.
- Informasi mouse.
- Nilai input.

---

## 15. Contoh Menggunakan `event.target`

Misalnya:

```jsx
function handleClick(event) {
  console.log(event.target);
}
```

Ketika tombol diklik, `event.target` merujuk pada elemen yang memicu event tersebut.

Contoh:

```jsx
<button onClick={handleClick}>
  Click Me
</button>
```

---

## 16. Event Handler dengan Parameter

Terkadang kita ingin mengirim data tambahan ke event handler.

Kita dapat menggunakan arrow function:

```jsx
function handleClick(name) {
  console.log("Hello " + name);
}

return (
  <button onClick={() => handleClick("Budi")}>
    Say Hello
  </button>
);
```

Ketika tombol diklik:

```text
User klik
   │
   ▼
Arrow function dijalankan
   │
   ▼
handleClick("Budi")
   │
   ▼
Hello Budi
```

Perhatikan bahwa dalam kasus ini:

```jsx
onClick={() => handleClick("Budi")}
```

bukan:

```jsx
onClick={handleClick("Budi")}
```

Karena kita ingin `handleClick("Budi")` dijalankan **ketika event terjadi**, bukan ketika component dirender.

---

## 17. Perbedaan Referensi Fungsi dan Eksekusi Fungsi

Perhatikan dua kode berikut.

### Memberikan Referensi

```jsx
<button onClick={handleClick}>
  Click
</button>
```

Artinya:

```text
React menerima referensi fungsi
```

React akan menjalankannya ketika tombol diklik.

### Menjalankan Fungsi

```jsx
<button onClick={handleClick()}>
  Click
</button>
```

Artinya:

```text
handleClick() langsung dijalankan
```

Bukan ketika tombol diklik.

---

## 18. Contoh Praktik Event Handling

Misalnya kita memiliki beberapa tombol tab:

```jsx
function App() {
  function handleSelect() {
    console.log("Selected!");
  }

  return (
    <menu>
      <button onClick={handleSelect}>
        Components
      </button>

      <button onClick={handleSelect}>
        JSX
      </button>

      <button onClick={handleSelect}>
        Props
      </button>
    </menu>
  );
}
```

Ketiga tombol menggunakan event handler yang sama:

```javascript
handleSelect
```

Hal ini menunjukkan bahwa sebuah fungsi dapat digunakan kembali sebagai event handler.

---

## 19. Event Handling dan Component

Event handler biasanya didefinisikan di dalam component yang membutuhkan event tersebut.

Contoh:

```jsx
function TabButton() {
  function handleClick() {
    console.log("Tab clicked!");
  }

  return (
    <button onClick={handleClick}>
      Components
    </button>
  );
}
```

Fungsi `handleClick` berada di dalam component `TabButton`.

Dengan demikian, fungsi tersebut hanya digunakan oleh component tersebut.

---

## 20. Penerapan dalam React

Event handling merupakan konsep dasar yang sangat penting dalam React.

Event digunakan untuk membangun berbagai fitur seperti:

- Tombol interaktif.
- Tab navigation.
- Dropdown menu.
- Modal.
- Form.
- Search.
- Checkbox.
- Input validation.
- Toggle menu.
- Login dan registrasi.
- Interaksi dengan data.

Pada tahap berikutnya, event handler biasanya akan digunakan bersama **State**.

Contohnya:

```text
User klik tombol
       │
       ▼
Event Handler
       │
       ▼
Mengubah State
       │
       ▼
React melakukan re-render
       │
       ▼
UI berubah
```

Inilah salah satu pola dasar dalam membangun aplikasi React interaktif.

---

## 21. Poin Penting

Beberapa konsep yang perlu diingat:

- React menggunakan event props seperti `onClick`, `onChange`, dan `onSubmit`.
- Nama event menggunakan format **camelCase**.
- Event handler adalah fungsi yang dijalankan ketika event terjadi.
- Gunakan nama seperti `handleClick`, `handleChange`, dan `handleSubmit`.
- Berikan **referensi fungsi**, bukan hasil eksekusi fungsi.
- Gunakan `onClick={handleClick}`.
- Hindari `onClick={handleClick()}` kecuali memang sengaja ingin mengeksekusi fungsi saat render.
- Gunakan arrow function jika perlu memberikan argumen tambahan.
- React menangani event dan DOM di belakang layar sehingga kita tidak perlu memanipulasi DOM secara manual.

---

## Kesimpulan

React menggunakan pendekatan deklaratif dalam menangani event.

Daripada menulis:

```javascript
document
  .querySelector("button")
  .addEventListener("click", handleClick);
```

kita cukup menulis:

```jsx
<button onClick={handleClick}>
  Click Me
</button>
```

React kemudian menangani proses event tersebut.

Konsep paling penting yang harus diingat:

```jsx
onClick={handleClick}
```

berarti **memberikan referensi fungsi** kepada React.

Sedangkan:

```jsx
onClick={handleClick()}
```

berarti **langsung menjalankan fungsi**.

Memahami perbedaan ini sangat penting karena Event Handling akan menjadi dasar untuk mempelajari konsep React berikutnya, terutama **State dan User Interaction**.
