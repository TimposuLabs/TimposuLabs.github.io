---
sidebar_position: 21
title: "CSS Styling & Dynamic Styling"
---

Dalam React, CSS dapat digunakan untuk mengatur tampilan component seperti halnya pada HTML biasa.

Namun, React juga memungkinkan kita mengubah **class CSS secara dinamis** berdasarkan kondisi tertentu, misalnya State.

Contoh yang sering digunakan adalah memberikan class `active` pada tombol tab yang sedang dipilih.

---

## 1. `class` vs `className`

Pada HTML biasa, class CSS ditulis menggunakan atribut:

```html
<button class="active">Components</button>
```

Sedangkan pada JSX, gunakan:

```jsx
<button className="active">Components</button>
```

Jadi, dalam React:

```jsx
className
```

digunakan sebagai pengganti:

```html
class
```

### Contoh

```jsx
<button className="active">
  Components
</button>
```

---

## 2. Mengapa JSX Menggunakan `className`?

JSX menggunakan sintaks yang dekat dengan JavaScript.

Kata `class` memiliki makna khusus dalam JavaScript karena digunakan untuk mendefinisikan class.

Karena itu, React menggunakan:

```jsx
className
```

untuk menentukan class CSS pada elemen.

Contoh:

```jsx
<div className="container">
  <h1>Hello React</h1>
</div>
```

---

## 3. Apa Itu Dynamic Styling?

**Dynamic Styling** adalah teknik mengubah tampilan component berdasarkan kondisi tertentu.

Misalnya sebuah aplikasi memiliki beberapa tombol:

```text
Components
JSX
Props
State
```

Ketika pengguna memilih:

```text
Components
```

kita ingin tombol tersebut mendapatkan class:

```text
active
```

Sehingga CSS dapat memberikan tampilan berbeda, misalnya:

```css
.active {
  background-color: blue;
  color: white;
}
```

Ketika pengguna memilih tab lain, class `active` berpindah ke tombol tersebut.

---

## 4. Menggunakan State sebagai Dasar Dynamic Styling

Misalnya kita menyimpan tab yang sedang dipilih menggunakan State:

```jsx
const [selectedTopic, setSelectedTopic] =
  useState("components");
```

State tersebut berisi:

```text
components
```

Artinya tab `components` sedang aktif.

---

## 5. Membandingkan State dengan Identifier Tab

Untuk mengetahui apakah sebuah tombol sedang aktif, kita dapat membandingkan:

```jsx
selectedTopic === "components"
```

Hasilnya adalah nilai Boolean:

```text
true
```

atau:

```text
false
```

Contohnya:

```jsx
<TabButton
  isSelected={selectedTopic === "components"}
>
  Components
</TabButton>
```

Jika:

```text
selectedTopic = "components"
```

maka:

```jsx
selectedTopic === "components"
```

menghasilkan:

```text
true
```

---

## 6. Mengirim `isSelected` sebagai Props

Nilai hasil perbandingan tersebut dapat dikirim ke component `TabButton` melalui prop:

```jsx
isSelected={selectedTopic === "components"}
```

Contoh lengkap:

```jsx
<TabButton
  isSelected={selectedTopic === "components"}
  onSelect={() => handleSelect("components")}
>
  Components
</TabButton>
```

Untuk JSX:

```jsx
<TabButton
  isSelected={selectedTopic === "jsx"}
  onSelect={() => handleSelect("jsx")}
>
  JSX
</TabButton>
```

Dengan demikian, setiap tombol mengetahui apakah dirinya sedang dipilih.

---

## 7. Menerima Prop `isSelected`

Di component `TabButton`, kita dapat menerima prop tersebut menggunakan destructuring:

```jsx
export default function TabButton({
  children,
  onSelect,
  isSelected,
}) {
  // ...
}
```

Sekarang component memiliki tiga data:

```text
children
onSelect
isSelected
```

`isSelected` berisi:

```text
true
```

atau:

```text
false
```

---

## 8. Menggunakan Ternary untuk `className`

Kita dapat menggunakan ternary operator untuk menentukan nilai `className`:

```jsx
className={isSelected ? "active" : undefined}
```

Artinya:

```text
isSelected = true
        ↓
className = "active"
```

Sedangkan:

```text
isSelected = false
        ↓
className = undefined
```

---

## 9. Contoh `TabButton.jsx`

```jsx
export default function TabButton({
  children,
  onSelect,
  isSelected,
}) {
  return (
    <li>
      <button
        className={isSelected ? "active" : undefined}
        onClick={onSelect}
      >
        {children}
      </button>
    </li>
  );
}
```

Ketika `isSelected` bernilai `true`, hasil HTML yang dihasilkan React secara konsep akan memiliki:

```html
<button class="active">
  Components
</button>
```

Jika `isSelected` bernilai `false`, tidak ada class `active` yang ditambahkan.

---

## 10. Menggunakan CSS

Misalnya kita memiliki file CSS:

```css
.active {
  background-color: #2563eb;
  color: white;
}
```

Ketika tombol aktif:

```html
<button class="active">
  Components
</button>
```

CSS tersebut akan diterapkan.

Ketika tombol tidak aktif:

```html
<button>
  JSX
</button>
```

class `active` tidak digunakan.

---

## 11. Contoh `App.jsx` Lengkap

Berikut contoh sederhana implementasi dynamic styling:

```jsx
import { useState } from "react";
import TabButton from "./components/TabButton.jsx";

function App() {
  const [selectedTopic, setSelectedTopic] =
    useState("components");

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  return (
    <main>
      <menu>
        <TabButton
          isSelected={selectedTopic === "components"}
          onSelect={() => handleSelect("components")}
        >
          Components
        </TabButton>

        <TabButton
          isSelected={selectedTopic === "jsx"}
          onSelect={() => handleSelect("jsx")}
        >
          JSX
        </TabButton>

        <TabButton
          isSelected={selectedTopic === "props"}
          onSelect={() => handleSelect("props")}
        >
          Props
        </TabButton>

        <TabButton
          isSelected={selectedTopic === "state"}
          onSelect={() => handleSelect("state")}
        >
          State
        </TabButton>
      </menu>
    </main>
  );
}

export default App;
```

---

## 12. Alur Dynamic Styling

Ketika aplikasi pertama kali dijalankan:

```text
selectedTopic = "components"
```

Kemudian React mengevaluasi:

```jsx
selectedTopic === "components"
```

Hasilnya:

```text
true
```

Maka:

```jsx
isSelected={true}
```

dikirim ke `TabButton`.

Kemudian:

```jsx
className={isSelected ? "active" : undefined}
```

menghasilkan:

```jsx
className="active"
```

---

## 13. Ketika Pengguna Memilih Tab Lain

Misalnya pengguna memilih JSX:

```jsx
handleSelect("jsx");
```

State berubah:

```text
selectedTopic = "jsx"
```

React kemudian melakukan re-render.

Pada render berikutnya:

```jsx
selectedTopic === "components"
```

menghasilkan:

```text
false
```

Sedangkan:

```jsx
selectedTopic === "jsx"
```

menghasilkan:

```text
true
```

Akibatnya class `active` berpindah dari tombol Components ke tombol JSX.

---

## 14. Alur Lengkap

Prosesnya dapat digambarkan seperti berikut:

```text
User klik tombol JSX
        ↓
handleSelect("jsx")
        ↓
setSelectedTopic("jsx")
        ↓
State berubah
        ↓
React melakukan re-render
        ↓
selectedTopic === "jsx"
        ↓
isSelected = true
        ↓
className = "active"
        ↓
CSS .active diterapkan
```

---

## 15. Dynamic Styling dengan Ternary

Pola yang digunakan adalah:

```jsx
className={condition ? "active" : undefined}
```

Contoh lain:

```jsx
<div
  className={isActive ? "active" : undefined}
>
  Content
</div>
```

Jika `isActive` bernilai `true`:

```html
<div class="active">
  Content
</div>
```

Jika `isActive` bernilai `false`:

```html
<div>
  Content
</div>
```

---

## 16. Dynamic Styling dengan `&&`

Untuk kondisi sederhana, kita juga dapat menggunakan operator `&&`:

```jsx
className={isSelected && "active"}
```

Namun, penggunaan ternary:

```jsx
className={isSelected ? "active" : undefined}
```

sering lebih eksplisit karena kita secara jelas menentukan nilai ketika kondisi benar dan ketika kondisi salah.

---

## 17. Dynamic Styling dan Props

Contoh ini menunjukkan hubungan antara **State**, **Props**, dan **CSS**:

```text
State
  ↓
Perbandingan
  ↓
Boolean
  ↓
Props
  ↓
className
  ↓
CSS
```

Contohnya:

```jsx
isSelected={selectedTopic === "components"}
```

Kemudian di child:

```jsx
className={isSelected ? "active" : undefined}
```

---

## 18. Mengapa Dynamic Styling Sebaiknya Dikelola dari Parent?

Pada contoh tab, `App` memiliki informasi tentang:

```jsx
selectedTopic
```

Karena itu, `App` mengetahui tab mana yang sedang aktif.

`TabButton` tidak perlu mengetahui seluruh State tersebut.

`TabButton` cukup menerima informasi:

```jsx
isSelected
```

Dengan demikian terjadi pemisahan tanggung jawab:

```text
App
 ├── Mengelola State
 ├── Menentukan tab aktif
 └── Mengirim isSelected

TabButton
 └── Menampilkan tampilan berdasarkan isSelected
```

Pendekatan ini membuat component lebih **reusable**.

---

## 19. Poin Penting

Beberapa hal yang perlu diingat:

- Gunakan `className`, bukan `class`, di JSX.
- Dynamic styling dapat dibuat berdasarkan State atau Props.
- Nilai Boolean dapat digunakan untuk menentukan class CSS.
- Parent component dapat menentukan apakah sebuah child sedang aktif.
- Informasi tersebut dapat dikirim melalui prop seperti `isSelected`.
- Child component dapat menggunakan `isSelected` untuk menentukan `className`.
- Perubahan State menyebabkan React melakukan re-render.
- Setelah re-render, class CSS dapat berubah secara otomatis.

---

## Kesimpulan

**Dynamic Styling** memungkinkan tampilan component berubah berdasarkan kondisi aplikasi.

Dalam contoh tab, State:

```jsx
const [selectedTopic, setSelectedTopic] =
  useState("components");
```

digunakan untuk menentukan tombol yang aktif:

```jsx
isSelected={selectedTopic === "components"}
```

Kemudian `TabButton` menggunakan nilai tersebut:

```jsx
className={isSelected ? "active" : undefined}
```

Sehingga perubahan State secara otomatis memengaruhi class CSS:

```text
State berubah
     ↓
React re-render
     ↓
isSelected diperbarui
     ↓
className diperbarui
     ↓
CSS berubah
     ↓
Tampilan UI berubah
```

Konsep ini sangat penting dalam React karena banyak komponen membutuhkan **tampilan yang berubah berdasarkan State atau Props**, seperti tab aktif, menu navigasi, tombol terpilih, modal, form, dan berbagai elemen interaktif lainnya.