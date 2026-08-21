---
sidebar_position: 20
title: "Conditional Rendering"
---

**Conditional Rendering** adalah teknik untuk menampilkan atau menyembunyikan bagian tertentu dari UI berdasarkan kondisi tertentu.

Dalam React, kondisi biasanya bergantung pada:

- State.
- Props.
- Nilai variabel.
- Hasil perhitungan atau ekspresi JavaScript.

Contohnya, sebuah aplikasi tab dapat menampilkan:

```text
Belum memilih topik
        ↓
Pengguna memilih "Components"
        ↓
Menampilkan detail Components
```

React menyediakan beberapa pendekatan untuk melakukan conditional rendering.

---

## 1. Ternary Operator

**Ternary Operator** digunakan ketika kita ingin memilih salah satu dari **dua kemungkinan tampilan**.

Sintaks dasarnya:

```javascript
condition ? valueIfTrue : valueIfFalse
```

Dalam JSX:

```jsx
{condition ? (
  <p>Kondisi benar</p>
) : (
  <p>Kondisi salah</p>
)}
```

---

## 2. Contoh Ternary Operator

Misalnya kita memiliki State:

```jsx
const [selectedTopic, setSelectedTopic] = useState();
```

Jika `selectedTopic` belum memiliki nilai, tampilkan pesan:

```text
Silakan pilih topik.
```

Jika sudah memiliki nilai, tampilkan detail topik.

```jsx
function App() {
  const [selectedTopic, setSelectedTopic] = useState();

  return (
    <div>
      {!selectedTopic ? (
        <p>Silakan pilih topik.</p>
      ) : (
        <div id="tab-content">
          <h3>{EXAMPLES[selectedTopic].title}</h3>

          <p>
            {EXAMPLES[selectedTopic].description}
          </p>
        </div>
      )}
    </div>
  );
}
```

Pada contoh tersebut:

```jsx
!selectedTopic
```

digunakan sebagai kondisi.

Jika kondisinya `true`:

```jsx
<p>Silakan pilih topik.</p>
```

akan ditampilkan.

Jika kondisinya `false`:

```jsx
<div id="tab-content">
  ...
</div>
```

yang ditampilkan.

---

## 3. Logical AND Operator `&&`

Operator `&&` dapat digunakan ketika kita hanya ingin menampilkan sesuatu jika kondisi bernilai `true`.

Sintaks dasarnya:

```jsx
{condition && <Element />}
```

Jika kondisi:

```text
true
```

maka elemen akan ditampilkan.

Jika kondisi:

```text
false
```

maka elemen tidak ditampilkan.

---

## 4. Contoh Logical AND

```jsx
function App() {
  const [selectedTopic, setSelectedTopic] = useState();

  return (
    <div>
      {!selectedTopic && (
        <p>Silakan pilih topik.</p>
      )}

      {selectedTopic && (
        <div id="tab-content">
          <h3>{EXAMPLES[selectedTopic].title}</h3>

          <p>
            {EXAMPLES[selectedTopic].description}
          </p>
        </div>
      )}
    </div>
  );
}
```

Ketika `selectedTopic` belum memiliki nilai:

```jsx
!selectedTopic
```

bernilai `true`, sehingga:

```jsx
<p>Silakan pilih topik.</p>
```

ditampilkan.

Setelah pengguna memilih topik:

```text
selectedTopic = "components"
```

maka:

```jsx
selectedTopic && (...)
```

bernilai `true` sehingga detail topik ditampilkan.

---

## 5. Perbedaan Ternary dan `&&`

Ternary:

```jsx
{condition ? (
  <ComponentA />
) : (
  <ComponentB />
)}
```

digunakan ketika terdapat **dua kemungkinan**.

Sedangkan `&&`:

```jsx
{condition && <Component />}
```

digunakan ketika kita hanya membutuhkan:

```text
Jika benar → tampilkan
Jika salah → jangan tampilkan
```

Contoh:

```jsx
{isLoggedIn && <UserProfile />}
```

Artinya:

```text
isLoggedIn true
    ↓
UserProfile ditampilkan
```

Jika:

```text
isLoggedIn false
    ↓
UserProfile tidak ditampilkan
```

---

## 6. Conditional Rendering dengan `if`

Untuk kondisi yang lebih kompleks, kita dapat menggunakan statement `if` sebelum `return`.

Contohnya:

```jsx
function App() {
  const [selectedTopic, setSelectedTopic] = useState();

  let tabContent = (
    <p>Silakan pilih topik.</p>
  );

  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>

        <p>
          {EXAMPLES[selectedTopic].description}
        </p>
      </div>
    );
  }

  return (
    <div>
      {tabContent}
    </div>
  );
}
```

Pada contoh tersebut, kita membuat variabel:

```jsx
let tabContent = (
  <p>Silakan pilih topik.</p>
);
```

Nilai awalnya adalah tampilan ketika belum ada topik yang dipilih.

Kemudian kita memeriksa:

```jsx
if (selectedTopic) {
  tabContent = (
    <div id="tab-content">
      ...
    </div>
  );
}
```

Jika `selectedTopic` memiliki nilai, isi `tabContent` diganti dengan tampilan detail topik.

Kemudian pada JSX utama:

```jsx
{tabContent}
```

kita hanya perlu menampilkan variabel tersebut.

---

## 7. Mengapa Menggunakan Variabel dengan `if`?

Pendekatan ini sangat berguna ketika JSX yang ditampilkan cukup kompleks.

Daripada membuat JSX utama seperti:

```jsx
return (
  <div>
    {selectedTopic ? (
      ...
    ) : (
      ...
    )}
  </div>
);
```

kita dapat memisahkan logikanya:

```jsx
let tabContent = <p>Silakan pilih topik.</p>;

if (selectedTopic) {
  tabContent = (
    <div>
      ...
    </div>
  );
}

return (
  <div>
    {tabContent}
  </div>
);
```

Dengan demikian, bagian `return` tetap sederhana dan mudah dibaca.

---

## 8. Conditional Rendering Menggunakan State

Conditional rendering sangat sering digunakan bersama `useState`.

Contohnya:

```jsx
const [isVisible, setIsVisible] = useState(false);
```

Kemudian:

```jsx
{isVisible && (
  <p>Konten sedang ditampilkan.</p>
)}
```

Ketika State berubah:

```jsx
setIsVisible(true);
```

React melakukan re-render dan konten akan muncul.

---

## 9. Conditional Rendering Berdasarkan Props

Conditional rendering tidak hanya dapat menggunakan State.

Props juga dapat digunakan sebagai kondisi.

Contohnya:

```jsx
function UserStatus({ isLoggedIn }) {
  if (isLoggedIn) {
    return <p>Selamat datang!</p>;
  }

  return <p>Silakan login.</p>;
}
```

Component dapat digunakan:

```jsx
<UserStatus isLoggedIn={true} />
```

atau:

```jsx
<UserStatus isLoggedIn={false} />
```

Hasil UI akan berbeda berdasarkan nilai props.

---

## 10. Conditional Rendering dengan Beberapa Kondisi

Jika terdapat beberapa kondisi, kita dapat menggunakan `if` dan `else if`.

Contohnya:

```jsx
function Status({ status }) {
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "success") {
    return <p>Data berhasil dimuat.</p>;
  }

  if (status === "error") {
    return <p>Terjadi kesalahan.</p>;
  }

  return <p>Status tidak diketahui.</p>;
}
```

Pendekatan seperti ini sering digunakan untuk menangani status aplikasi.

---

## 11. Conditional Rendering dengan Early Return

Pada kondisi tertentu, kita dapat langsung melakukan `return` dari component.

Contohnya:

```jsx
function UserProfile({ user }) {
  if (!user) {
    return <p>Data user belum tersedia.</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

Jika `user` belum tersedia, component langsung mengembalikan:

```jsx
<p>Data user belum tersedia.</p>
```

Jika `user` tersedia, React akan mengembalikan informasi user.

Pendekatan ini disebut **early return** dan sangat berguna untuk membuat component lebih mudah dibaca.

---

## 12. Perbandingan Pendekatan

### Ternary Operator

```jsx
{condition ? <A /> : <B />}
```

**Cocok untuk:**

- Kondisi sederhana.
- Memilih antara dua tampilan.
- JSX yang relatif pendek.

---

### Logical AND `&&`

```jsx
{condition && <Component />}
```

**Cocok untuk:**

- Menampilkan sesuatu jika kondisi terpenuhi.
- Tidak membutuhkan bagian `else`.

---

### Variabel + `if`

```jsx
let content = <A />;

if (condition) {
  content = <B />;
}
```

**Cocok untuk:**

- JSX yang lebih panjang.
- Kondisi yang lebih kompleks.
- Menjaga bagian `return` tetap bersih.

---

### Early Return

```jsx
if (!data) {
  return <Loading />;
}

return <Content />;
```

**Cocok untuk:**

- Menangani kondisi khusus di awal component.
- Loading state.
- Error state.
- Data yang belum tersedia.

---

## 13. Contoh Implementasi Tab

Berikut contoh sederhana penerapan beberapa konsep tersebut:

```jsx
function App() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(topic) {
    setSelectedTopic(topic);
  }

  let tabContent = (
    <p>Silakan pilih topik.</p>
  );

  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>

        <p>
          {EXAMPLES[selectedTopic].description}
        </p>

        <pre>
          <code>
            {EXAMPLES[selectedTopic].code}
          </code>
        </pre>
      </div>
    );
  }

  return (
    <main>
      <menu>
        <button
          onClick={() => handleSelect("components")}
        >
          Components
        </button>

        <button
          onClick={() => handleSelect("jsx")}
        >
          JSX
        </button>

        <button
          onClick={() => handleSelect("props")}
        >
          Props
        </button>

        <button
          onClick={() => handleSelect("state")}
        >
          State
        </button>
      </menu>

      {tabContent}
    </main>
  );
}
```

---

## 14. Alur Conditional Rendering

Dalam contoh tab di atas, alurnya adalah:

```text
Component pertama kali dijalankan
        ↓
selectedTopic = undefined
        ↓
tabContent = "Silakan pilih topik"
        ↓
UI menampilkan pesan
```

Ketika pengguna memilih `Components`:

```text
User klik Components
        ↓
handleSelect("components")
        ↓
setSelectedTopic("components")
        ↓
React melakukan re-render
        ↓
selectedTopic memiliki nilai
        ↓
if (selectedTopic) terpenuhi
        ↓
tabContent diganti
        ↓
Detail Components ditampilkan
```

---

## 15. Poin Penting

Beberapa hal yang perlu diingat:

- **Conditional Rendering** digunakan untuk menampilkan UI berdasarkan kondisi.
- Kondisi dapat berasal dari State, Props, atau nilai JavaScript lainnya.
- **Ternary Operator** cocok untuk memilih antara dua tampilan.
- **`&&`** cocok untuk menampilkan elemen hanya ketika kondisi bernilai `true`.
- **`if` + variabel JSX** cocok untuk logika dan UI yang lebih kompleks.
- **Early return** dapat digunakan untuk menangani kondisi tertentu sebelum JSX utama dikembalikan.
- Conditional rendering merupakan bagian penting dalam pembuatan UI React yang dinamis.

---

## Kesimpulan

React menggunakan JavaScript untuk menentukan UI yang harus ditampilkan berdasarkan kondisi.

Tiga pendekatan utama yang perlu dikuasai adalah:

```jsx
// Ternary
{condition ? <A /> : <B />}
```

```jsx
// Logical AND
{condition && <A />}
```

```jsx
// Variable + if
let content = <A />;

if (condition) {
  content = <B />;
}

return <div>{content}</div>;
```

Pemilihan pendekatan bergantung pada kompleksitas kondisi dan kebutuhan component.

Untuk kondisi sederhana, **ternary** atau **`&&`** biasanya cukup. Untuk component yang lebih kompleks, menggunakan **`if`**, variabel JSX, atau **early return** sering membuat kode lebih mudah dibaca dan dipelihara.