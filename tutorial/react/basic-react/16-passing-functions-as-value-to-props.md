---
sidebar_position: 16
title: "Passing Functions as Values"
---

## Meneruskan Fungsi sebagai Nilai ke Props

Dalam React, **fungsi juga dapat dikirim sebagai nilai melalui Props**. Teknik ini sangat penting ketika sebuah component anak perlu memberi tahu component induknya bahwa suatu event telah terjadi.

Pola ini sering digunakan untuk menangani interaksi pengguna seperti:

- Klik tombol.
- Pemilihan tab.
- Pengiriman form.
- Perubahan input.
- Interaksi lainnya yang membutuhkan komunikasi antara component.

---

## 1. Mengapa Fungsi Perlu Diteruskan melalui Props?

Misalnya kita memiliki dua component:

```text
App
 │
 ├── TabButton
 ├── TabButton
 ├── TabButton
 └── TabButton
```

`App` merupakan **parent component**, sedangkan `TabButton` merupakan **child component**.

Misalnya kita ingin ketika salah satu `TabButton` diklik, konten yang berada di `App` berubah.

Masalahnya, `TabButton` tidak memiliki akses langsung ke data atau logic yang berada di dalam `App`.

Karena itu, kita dapat membuat fungsi di `App`, kemudian mengirimkan fungsi tersebut ke `TabButton` melalui Props.

---

## 2. Konsep Passing Function

React memungkinkan fungsi JavaScript dikirim sebagai nilai melalui Props.

Contohnya:

```jsx
<TabButton onSelect={handleSelect}>
  Components
</TabButton>
```

Pada kode tersebut:

```text
handleSelect
```

merupakan fungsi yang dibuat di component `App`.

Fungsi tersebut dikirim ke:

```text
TabButton
```

melalui prop:

```text
onSelect
```

---

## 3. Pola Parent ke Child

Alur dasarnya adalah:

```text
Parent Component
      │
      │ function melalui Props
      ▼
Child Component
      │
      │ event terjadi
      ▼
Menjalankan function
      │
      ▼
Logic di Parent dijalankan
```

Dengan demikian, component anak dapat memicu logic yang berada di component induk.

---

## 4. Membuat Function di Parent

Misalnya kita memiliki component `App`.

```jsx
function App() {
  function handleSelect() {
    console.log("Tab selected!");
  }

  return (
    <div>
      {/* Component */}
    </div>
  );
}
```

Fungsi:

```javascript
handleSelect
```

merupakan event handler yang berada di `App`.

---

## 5. Mengirim Function melalui Props

Function tersebut dapat diteruskan ke `TabButton`:

```jsx
<TabButton onSelect={handleSelect}>
  Components
</TabButton>
```

Perhatikan bahwa kita menggunakan:

```jsx
onSelect={handleSelect}
```

bukan:

```jsx
onSelect={handleSelect()}
```

Kita ingin memberikan **referensi fungsi**, bukan langsung menjalankannya.

---

## 6. Menerima Function di Child Component

`TabButton` dapat menerima fungsi tersebut melalui Props.

```jsx
export default function TabButton({ children, onSelect }) {
  return (
    <li>
      <button onClick={onSelect}>
        {children}
      </button>
    </li>
  );
}
```

Sekarang `onSelect` berisi referensi terhadap fungsi:

```javascript
handleSelect
```

yang dibuat di `App`.

---

## 7. Menghubungkan Prop dengan `onClick`

Perhatikan bagian berikut:

```jsx
<button onClick={onSelect}>
```

`onSelect` merupakan **custom prop** yang diterima oleh `TabButton`.

Sedangkan:

```jsx
onClick
```

merupakan event prop bawaan React.

Alurnya:

```text
App
 │
 │ handleSelect
 ▼
TabButton
 │
 │ onSelect
 ▼
<button onClick={onSelect}>
```

Ketika tombol diklik, React akan menjalankan fungsi yang disimpan di `onSelect`.

---

## 8. Contoh Lengkap `TabButton.jsx`

File:

```text
src/components/TabButton.jsx
```

```jsx
export default function TabButton({ children, onSelect }) {
  return (
    <li>
      <button onClick={onSelect}>
        {children}
      </button>
    </li>
  );
}
```

Component ini menerima dua Props:

```text
children
onSelect
```

`children` digunakan untuk menampilkan teks atau konten tombol.

`onSelect` digunakan untuk menerima fungsi dari parent component.

---

## 9. Contoh Lengkap `App.jsx`

```jsx
import TabButton from "./components/TabButton.jsx";

function App() {
  function handleSelect() {
    console.log("Hello World - Selected!");
  }

  return (
    <div>
      <section id="examples">
        <h2>Examples</h2>

        <menu>
          <TabButton onSelect={handleSelect}>
            Components
          </TabButton>

          <TabButton onSelect={handleSelect}>
            JSX
          </TabButton>

          <TabButton onSelect={handleSelect}>
            Props
          </TabButton>

          <TabButton onSelect={handleSelect}>
            State
          </TabButton>
        </menu>
      </section>
    </div>
  );
}

export default App;
```

Keempat `TabButton` menggunakan fungsi:

```javascript
handleSelect
```

yang sama.

---

## 10. Alur Eksekusi

Ketika pengguna mengklik tombol:

```text
User
 │
 │ klik
 ▼
<button>
 │
 │ onClick
 ▼
onSelect
 │
 │ referensi fungsi
 ▼
handleSelect()
 │
 ▼
Logic di App.jsx
```

Dengan kata lain:

```text
Klik Button
    ↓
onClick
    ↓
onSelect
    ↓
handleSelect()
```

---

## 11. Mengapa Tidak Langsung Membuat Function di Child?

Kita sebenarnya dapat membuat handler langsung di `TabButton`:

```jsx
function TabButton() {
  function handleClick() {
    console.log("Clicked!");
  }

  return (
    <button onClick={handleClick}>
      Click
    </button>
  );
}
```

Namun, function tersebut hanya memiliki akses terhadap logic dan data yang berada di dalam `TabButton`.

Jika data yang ingin diubah berada di `App`, maka kita membutuhkan cara untuk menjalankan function yang berada di `App`.

Di sinilah **passing function melalui Props** menjadi penting.

---

## 12. Komunikasi dari Child ke Parent

Secara konsep, data biasanya mengalir dari parent ke child melalui Props:

```text
Parent
  │
  │ Props
  ▼
Child
```

Ketika child perlu memicu suatu tindakan di parent, parent dapat mengirimkan function:

```text
Parent
  │
  │ Function via Props
  ▼
Child
  │
  │ menjalankan function
  ▼
Parent Logic
```

Ini sering disebut sebagai pola komunikasi **child-to-parent**.

Sebenarnya child tidak secara langsung mengubah parent. Child hanya menjalankan function yang diberikan oleh parent.

---

## 13. Konvensi Penamaan Function dan Props

Dalam React, terdapat konvensi penamaan yang umum digunakan.

### Function Handler

Gunakan awalan:

```text
handle
```

Contoh:

```javascript
handleSelect
handleClick
handleSubmit
handleChange
```

Function tersebut biasanya berada di component yang memiliki logic atau data.

### Function Props

Gunakan awalan:

```text
on
```

Contoh:

```text
onSelect
onClick
onSubmit
onChange
```

Contohnya:

```jsx
<TabButton onSelect={handleSelect}>
  Components
</TabButton>
```

Kombinasi tersebut membuat tujuan kode lebih mudah dipahami.

---

## 14. Mengapa Prop Menggunakan Awalan `on`?

Penamaan:

```jsx
onSelect
```

memberikan petunjuk bahwa prop tersebut kemungkinan berisi sebuah function yang akan dipanggil ketika sesuatu terjadi.

Misalnya:

```jsx
onSelect
onDelete
onSave
onSubmit
```

Sedangkan:

```javascript
handleSelect
handleDelete
handleSave
handleSubmit
```

biasanya merupakan nama function handler yang sebenarnya.

Pola sederhananya:

```text
onSelect
   │
   ▼
handleSelect
```

---

## 15. Passing Function Berbeda dengan Memanggil Function

Perhatikan perbedaan berikut.

### Memberikan Function

```jsx
<TabButton onSelect={handleSelect}>
```

Artinya kita memberikan referensi function.

### Memanggil Function

```jsx
<TabButton onSelect={handleSelect()}>
```

Artinya function langsung dijalankan ketika JSX diproses.

Karena kita ingin function dijalankan ketika event terjadi, gunakan:

```jsx
onSelect={handleSelect}
```

---

## 16. Passing Function dengan Arrow Function

Kita juga dapat menggunakan arrow function ketika meneruskan function.

Contoh:

```jsx
<TabButton
  onSelect={() => {
    console.log("Components selected!");
  }}
>
  Components
</TabButton>
```

Pendekatan ini berguna ketika kita ingin melakukan logic tambahan atau mengirim argument tertentu.

---

## 17. Mengirim Argument ke Function

Misalnya kita ingin mengetahui tab mana yang diklik.

Function di `App`:

```jsx
function handleSelect(tab) {
  console.log("Selected tab:", tab);
}
```

Kemudian:

```jsx
<TabButton
  onSelect={() => handleSelect("Components")}
>
  Components
</TabButton>
```

Dan:

```jsx
<TabButton
  onSelect={() => handleSelect("JSX")}
>
  JSX
</TabButton>
```

Ketika tombol diklik, function akan menerima nilai yang berbeda.

---

## 18. Menggunakan `children` dan Function Props Bersamaan

Konsep `children` yang telah dipelajari sebelumnya dapat digunakan bersama function Props.

```jsx
function TabButton({ children, onSelect }) {
  return (
    <li>
      <button onClick={onSelect}>
        {children}
      </button>
    </li>
  );
}
```

Penggunaannya:

```jsx
<TabButton onSelect={handleSelect}>
  Components
</TabButton>
```

Di sini terdapat dua jenis Props:

```text
children
    │
    └── Konten component

onSelect
    │
    └── Function yang dijalankan ketika button diklik
```

---

## 19. Hubungannya dengan State

Passing function melalui Props menjadi semakin penting ketika kita mulai menggunakan **State**.

Contohnya:

```text
App
 │
 ├── State
 │
 ├── handleSelect()
 │
 └── TabButton
       │
       └── onSelect
```

Ketika pengguna mengklik `TabButton`:

```text
User klik
    ↓
TabButton
    ↓
onSelect
    ↓
handleSelect()
    ↓
Update State
    ↓
React melakukan re-render
    ↓
UI berubah
```

Pola ini merupakan salah satu dasar penting dalam membangun aplikasi React interaktif.

---

## 20. Poin Penting

Beberapa hal yang perlu diingat:

- Function dapat dikirim melalui Props.
- Function dikirim sebagai **value** atau referensi.
- Parent component dapat mengirim function kepada child component.
- Child component dapat menjalankan function tersebut ketika event terjadi.
- Gunakan `onSelect={handleSelect}`, bukan `onSelect={handleSelect()}`.
- Function handler umumnya menggunakan nama `handle...`.
- Function Props umumnya menggunakan nama `on...`.
- `children` dapat digunakan bersama function Props.
- Passing function merupakan pola penting untuk komunikasi antara child dan parent.
- Konsep ini akan banyak digunakan ketika bekerja dengan **State**.

---

## Kesimpulan

Passing function melalui Props memungkinkan parent component memberikan kemampuan tertentu kepada child component.

Contoh sederhananya:

```jsx
<TabButton onSelect={handleSelect}>
  Components
</TabButton>
```

Parent menyediakan function:

```jsx
function handleSelect() {
  console.log("Selected!");
}
```

Child menerima function:

```jsx
function TabButton({ onSelect, children }) {
  return (
    <button onClick={onSelect}>
      {children}
    </button>
  );
}
```

Alur lengkapnya:

```text
App
 │
 │ handleSelect
 ▼
TabButton
 │
 │ onSelect
 ▼
button
 │
 │ onClick
 ▼
handleSelect()
```

**Inti konsepnya:** Props tidak hanya dapat digunakan untuk mengirim data seperti string, number, atau object. **Function juga dapat dikirim sebagai Props**, sehingga component anak dapat memicu logic yang berada di component induknya.
