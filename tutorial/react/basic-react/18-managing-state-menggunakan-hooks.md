---
sidebar_position: 18
title: "Managing State & Menggunakan Hooks"
---

Dalam React, **State** digunakan untuk menyimpan data yang dapat berubah dan perubahan tersebut perlu ditampilkan pada UI.

Berbeda dengan variabel JavaScript biasa, perubahan State akan memberi tahu React bahwa component perlu melakukan **re-render**.

---

## 1. Memahami State dalam React

Misalnya kita memiliki data:

```jsx
let selectedTopic = "Please click a button";
```

Kemudian kita mengubah nilainya:

```jsx
selectedTopic = "components";
```

Nilainya memang berubah di JavaScript, tetapi React tidak otomatis mengetahui bahwa UI perlu diperbarui.

Karena itu, React menyediakan mekanisme khusus bernama **State**.

Secara sederhana:

```text
Data berubah
    ↓
State diperbarui
    ↓
React mengetahui perubahan
    ↓
Component di-render kembali
    ↓
UI diperbarui
```

---

## 2. Apa Itu State?

**State** adalah data yang dikelola oleh React dan dapat berubah selama component digunakan.

Contoh data yang cocok disimpan sebagai State:

- Tab yang sedang dipilih.
- Nilai input.
- Status modal terbuka atau tertutup.
- Counter.
- Data hasil interaksi pengguna.
- Status loading.
- Pilihan pengguna.

Contohnya:

```jsx
const [selectedTopic, setSelectedTopic] = useState(
  "Please click a button"
);
```

Di sini:

```text
selectedTopic
```

adalah nilai State saat ini.

Sedangkan:

```text
setSelectedTopic
```

adalah function yang digunakan untuk memperbarui State.

---

## 3. Mengenal React Hooks

React menyediakan berbagai **Hooks** untuk menggunakan fitur React di dalam function component.

Salah satu Hook yang paling penting adalah:

```javascript
useState
```

`useState` digunakan untuk membuat dan mengelola State.

Hooks memungkinkan function component menggunakan berbagai kemampuan React tanpa harus menggunakan class component.

---

## 4. Mengimpor `useState`

Sebelum menggunakan `useState`, import Hook tersebut dari package `react`.

```jsx
import { useState } from "react";
```

`useState` merupakan **named export**, sehingga digunakan dengan destructuring import:

```jsx
import { useState } from "react";
```

---

## 5. Membuat State dengan `useState`

Sintaks dasar:

```jsx
const [value, setValue] = useState(initialValue);
```

Contohnya:

```jsx
const [selectedTopic, setSelectedTopic] = useState(
  "Please click a button"
);
```

`useState()` menerima nilai awal:

```text
"Please click a button"
```

dan mengembalikan array yang berisi dua elemen.

---

## 6. Dua Nilai yang Dikembalikan `useState`

`useState` selalu mengembalikan array dengan **dua elemen**:

```text
[
  currentValue,
  updaterFunction
]
```

Contohnya:

```jsx
const [selectedTopic, setSelectedTopic] = useState(
  "Please click a button"
);
```

Nilainya dapat dipahami sebagai:

```text
selectedTopic
    ↓
Nilai State saat ini

setSelectedTopic
    ↓
Function untuk memperbarui State
```

---

## 7. Mengapa Menggunakan Array Destructuring?

Karena `useState` mengembalikan array:

```jsx
[
  "Please click a button",
  function
]
```

kita dapat menggunakan **Array Destructuring**:

```jsx
const [selectedTopic, setSelectedTopic] = useState(
  "Please click a button"
);
```

Daripada menulis:

```jsx
const state = useState("Please click a button");
```

kemudian:

```jsx
state[0];
state[1];
```

Array destructuring membuat kode lebih mudah dibaca.

---

## 8. Mengubah State

Untuk mengubah State, gunakan updater function.

Misalnya:

```jsx
const [selectedTopic, setSelectedTopic] = useState(
  "Please click a button"
);
```

Kemudian:

```jsx
setSelectedTopic("components");
```

React akan mengetahui bahwa State berubah dan dapat melakukan re-render terhadap component.

---

## 9. Jangan Mengubah State Secara Langsung

Jangan melakukan:

```jsx
selectedTopic = "components";
```

Gunakan:

```jsx
setSelectedTopic("components");
```

Perbedaannya:

```text
selectedTopic = "components"
        ↓
Nilai JavaScript berubah
        ↓
React tidak diberi tahu
```

Sedangkan:

```text
setSelectedTopic("components")
        ↓
React mengetahui perubahan
        ↓
Re-render
        ↓
UI diperbarui
```

---

## 10. Contoh State pada Tab

Misalnya kita memiliki beberapa tab:

```jsx
<TabButton>
  Components
</TabButton>

<TabButton>
  JSX
</TabButton>

<TabButton>
  Props
</TabButton>

<TabButton>
  State
</TabButton>
```

Kita dapat menyimpan tab yang dipilih menggunakan State:

```jsx
const [selectedTopic, setSelectedTopic] = useState(
  "Please click a button"
);
```

Ketika tombol Components diklik:

```jsx
setSelectedTopic("components");
```

Ketika JSX diklik:

```jsx
setSelectedTopic("jsx");
```

dan seterusnya.

---

## 11. Contoh Implementasi Lengkap

Berikut contoh sederhana penggunaan `useState`:

```jsx
import { useState } from "react";
import TabButton from "./components/TabButton.jsx";

function App() {
  const [selectedTopic, setSelectedTopic] = useState(
    "Please click a button"
  );

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  return (
    <div>
      <main>
        <section id="examples">
          <menu>
            <TabButton
              onSelect={() => handleSelect("components")}
            >
              Components
            </TabButton>

            <TabButton
              onSelect={() => handleSelect("jsx")}
            >
              JSX
            </TabButton>

            <TabButton
              onSelect={() => handleSelect("props")}
            >
              Props
            </TabButton>

            <TabButton
              onSelect={() => handleSelect("state")}
            >
              State
            </TabButton>
          </menu>

          <p>{selectedTopic}</p>
        </section>
      </main>
    </div>
  );
}

export default App;
```

---

## 12. Alur Kerja State

Ketika pengguna memilih tab:

```text
User klik "Components"
        ↓
onSelect
        ↓
handleSelect("components")
        ↓
setSelectedTopic("components")
        ↓
State diperbarui
        ↓
React melakukan re-render
        ↓
App() dijalankan kembali
        ↓
selectedTopic = "components"
        ↓
UI menampilkan "components"
```

---

## 13. State Memicu Re-render

Salah satu karakteristik penting State adalah perubahan State dapat menyebabkan component melakukan **re-render**.

Misalnya State awal:

```text
selectedTopic = "Please click a button"
```

UI:

```text
Please click a button
```

Kemudian:

```jsx
setSelectedTopic("components");
```

React melakukan re-render.

Pada render berikutnya:

```text
selectedTopic = "components"
```

UI kemudian menjadi:

```text
components
```

---

## 14. State dan Snapshot

Nilai State yang digunakan dalam sebuah eksekusi function component dapat dianggap sebagai **snapshot** dari State pada render tersebut.

Misalnya:

```jsx
function App() {
  const [selectedTopic, setSelectedTopic] = useState(
    "Please click a button"
  );

  function handleSelect() {
    setSelectedTopic("components");

    console.log(selectedTopic);
  }

  // ...
}
```

Jangan mengharapkan:

```javascript
console.log(selectedTopic);
```

langsung menampilkan:

```text
components
```

pada eksekusi handler yang sama.

Nilai `selectedTopic` yang digunakan oleh function tersebut masih merupakan nilai dari render saat itu.

---

## 15. Mengapa `console.log` Masih Menampilkan Nilai Lama?

Ketika kita menjalankan:

```jsx
setSelectedTopic("components");
```

React tidak mengganti nilai variabel `selectedTopic` yang sedang digunakan oleh eksekusi function saat itu.

React menjadwalkan pembaruan State dan kemudian melakukan render berikutnya.

Secara sederhana:

```text
Render saat ini
      ↓
selectedTopic = "Please click a button"
      ↓
User klik
      ↓
setSelectedTopic("components")
      ↓
React menjadwalkan update
      ↓
Render berikutnya
      ↓
selectedTopic = "components"
```

Jadi, nilai baru akan tersedia pada **render berikutnya**.

---

## 16. Contoh untuk Memahami Snapshot

Misalnya:

```jsx
function handleSelect() {
  setSelectedTopic("components");

  console.log(selectedTopic);
}
```

Jika State saat ini adalah:

```text
"Please click a button"
```

maka pada handler tersebut:

```javascript
setSelectedTopic("components");
```

meminta React memperbarui State.

Tetapi:

```javascript
console.log(selectedTopic);
```

masih mengacu pada nilai State dari render saat ini.

Setelah React melakukan render berikutnya, barulah:

```text
selectedTopic
```

memiliki nilai:

```text
"components"
```

---

## 17. State Update dan Re-render

Pola State dapat digambarkan sebagai berikut:

```text
Initial Render
      ↓
State memiliki nilai awal
      ↓
UI ditampilkan
      ↓
User melakukan interaksi
      ↓
Updater Function dipanggil
      ↓
React menjadwalkan State Update
      ↓
Re-render
      ↓
Component dijalankan kembali
      ↓
State terbaru tersedia
      ↓
UI diperbarui
```

---

## 18. Rules of Hooks

Hooks memiliki beberapa aturan penting yang harus diikuti.

Aturan ini dikenal sebagai **Rules of Hooks**.

### Hook Hanya di Function Component atau Custom Hook

Hook seperti:

```jsx
useState()
```

harus digunakan di dalam:

- Function component React.
- Custom Hook.

Contoh yang benar:

```jsx
function App() {
  const [count, setCount] = useState(0);

  // ...
}
```

---

## 19. Hook Harus Dipanggil di Top-Level

Hook harus dipanggil langsung di bagian teratas function component.

Contoh yang benar:

```jsx
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {count}
    </div>
  );
}
```

Jangan memanggil Hook di dalam `if`:

```jsx
function App() {
  if (someCondition) {
    const [count, setCount] = useState(0);
  }

  // ...
}
```

Jangan memanggil Hook di dalam loop:

```jsx
function App() {
  for (let i = 0; i < 3; i++) {
    const [count, setCount] = useState(0);
  }

  // ...
}
```

Dan jangan memanggil Hook di dalam nested function:

```jsx
function App() {
  function handleClick() {
    const [count, setCount] = useState(0);
  }

  // ...
}
```

---

## 20. Mengapa Hooks Tidak Boleh Dipanggil Secara Kondisional?

React perlu menjaga urutan pemanggilan Hook agar dapat mengetahui State mana yang berkaitan dengan component tertentu.

Karena itu, jangan membuat urutan pemanggilan Hook berubah-ubah.

Hindari:

```jsx
if (condition) {
  useState();
}
```

Gunakan:

```jsx
const [value, setValue] = useState(initialValue);
```

di top-level component.

Kemudian kondisi dapat digunakan pada data atau JSX:

```jsx
if (condition) {
  // Gunakan value
}
```

---

## 21. Penamaan State

Tidak ada aturan bahwa State harus bernama tertentu, tetapi terdapat konvensi umum.

Misalnya:

```jsx
const [count, setCount] = useState(0);
```

```jsx
const [username, setUsername] = useState("");
```

```jsx
const [isOpen, setIsOpen] = useState(false);
```

```jsx
const [selectedTopic, setSelectedTopic] = useState(null);
```

Pola yang umum digunakan:

```text
[value, setValue]
```

Contohnya:

```text
[count, setCount]
[name, setName]
[isOpen, setIsOpen]
[selectedTopic, setSelectedTopic]
```

---

## 22. State Dapat Menyimpan Berbagai Jenis Data

State tidak hanya dapat menyimpan string.

### String

```jsx
const [name, setName] = useState("Budi");
```

### Number

```jsx
const [count, setCount] = useState(0);
```

### Boolean

```jsx
const [isOpen, setIsOpen] = useState(false);
```

### Array

```jsx
const [items, setItems] = useState([]);
```

### Object

```jsx
const [user, setUser] = useState({
  name: "Budi",
  age: 20,
});
```

Jenis State disesuaikan dengan kebutuhan aplikasi.

---

## 23. State Sebagai Sumber Data UI

Dalam React, UI biasanya merupakan hasil dari kombinasi:

```text
Props
  +
State
  +
JavaScript Logic
  ↓
JSX
  ↓
UI
```

Contohnya:

```jsx
<p>{selectedTopic}</p>
```

Nilai yang ditampilkan bergantung pada State:

```javascript
selectedTopic
```

Ketika State berubah, React dapat menghasilkan UI yang baru.

---

## 24. Poin Penting

Beberapa konsep yang perlu diingat:

- **State** adalah data yang dikelola oleh React.
- Gunakan `useState` untuk membuat State.
- `useState` mengembalikan dua nilai: State saat ini dan updater function.
- Gunakan array destructuring untuk mengambil kedua nilai tersebut.
- Gunakan updater function untuk memperbarui State.
- Jangan mengubah State secara langsung.
- Perubahan State dapat menyebabkan re-render.
- State terbaru tersedia pada render berikutnya.
- Jangan mengharapkan nilai State berubah langsung pada eksekusi function yang sama setelah setter dipanggil.
- Hooks hanya boleh digunakan di function component atau Custom Hook.
- Hooks harus dipanggil di top-level.
- Jangan memanggil Hooks di dalam kondisi, loop, atau nested function.

---

## Kesimpulan

**State merupakan salah satu konsep paling fundamental dalam React.**

Variabel biasa tidak cukup untuk data yang perubahan nilainya harus memperbarui UI.

Dengan `useState`:

```jsx
const [selectedTopic, setSelectedTopic] = useState(
  "Please click a button"
);
```

kita mendapatkan:

```text
selectedTopic
    ↓
State saat ini

setSelectedTopic
    ↓
Updater Function
```

Ketika State diperbarui:

```jsx
setSelectedTopic("components");
```

React mengetahui bahwa terdapat perubahan dan akan melakukan re-render terhadap component.

Pola dasarnya adalah:

```text
User Interaction
       ↓
Event Handler
       ↓
setState()
       ↓
State Update
       ↓
Re-render
       ↓
JSX dievaluasi kembali
       ↓
UI diperbarui
```

Memahami hubungan antara **State, Hooks, Event Handler, Re-render, dan UI** merupakan fondasi penting sebelum mempelajari konsep React yang lebih lanjut.