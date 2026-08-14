---
sidebar_position: 6
title: "Import & Export"
---

## Import dan Export di JavaScript

Pada proyek React, kode biasanya dibagi menjadi beberapa file agar lebih terstruktur, mudah dibaca, dan mudah dipelihara.

Agar sebuah file dapat menggunakan variabel, fungsi, atau komponen dari file lain, JavaScript menyediakan fitur **Module**, yaitu **`export`** dan **`import`**.

- **`export`** digunakan untuk membagikan data dari sebuah file.
- **`import`** digunakan untuk menggunakan data tersebut pada file lain.

---

## Mengapa Menggunakan Import dan Export?

Misalkan kita memiliki struktur proyek berikut.

```text
project/
│
├── app.js
└── util.js
```

File `util.js` berisi fungsi atau data yang dapat digunakan kembali.

```javascript
// util.js

export const apiKey = "xyz123";
```

Kemudian pada file `app.js`, kita dapat menggunakannya.

```javascript
// app.js

import { apiKey } from "./util.js";

console.log(apiKey);
```

Dengan cara ini, kode menjadi lebih modular dan mudah dikelola.

---

## Named Export

**Named Export** digunakan ketika sebuah file ingin mengekspor **lebih dari satu variabel, fungsi, atau class**.

### Contoh Export

```javascript
// util.js

export const apiKey = "xyz123";
export const username = "admin";
export const version = "1.0";
```

Karena terdapat beberapa data yang diekspor, masing-masing diberi nama.

---

### Contoh Import

```javascript
// app.js

import { apiKey, username, version } from "./util.js";

console.log(apiKey);
console.log(username);
console.log(version);
```

Saat menggunakan **Named Export**, nama yang diimpor **harus sama** dengan nama yang diekspor.

---

## Default Export

**Default Export** digunakan ketika sebuah file hanya memiliki **satu nilai utama** yang ingin dibagikan.

Jenis export ini paling sering digunakan pada **React Component**.

### Contoh Export

```javascript
// util.js

export default "xyz123";
```

---

### Contoh Import

```javascript
// app.js

import myKey from "./util.js";

console.log(myKey);
```

Berbeda dengan Named Export, pada **Default Export** kita bebas menentukan nama variabel saat melakukan import.

Misalnya:

```javascript
import api from "./util.js";
```

atau

```javascript
import secretKey from "./util.js";
```

Keduanya tetap menghasilkan nilai yang sama.

---

## Menggunakan Alias (`as`)

Kadang kita ingin mengganti nama variabel saat proses import agar lebih mudah dipahami atau menghindari benturan nama.

Misalnya:

```javascript
// util.js

export const apiKey = "xyz123";
export const abc = "abc123";
```

Kemudian pada file lain:

```javascript
import { abc as content } from "./util.js";

console.log(content);
```

Pada contoh di atas:

- Nama asli adalah `abc`.
- Saat diimpor diubah menjadi `content`.

---

## Mengimpor Semua Export Sekaligus

JavaScript juga menyediakan cara untuk mengimpor seluruh **Named Export** sebagai satu objek.

Misalnya:

```javascript
// util.js

export const apiKey = "xyz123";
export const username = "admin";
```

Kemudian:

```javascript
import * as util from "./util.js";

console.log(util.apiKey);
console.log(util.username);
```

Semua data dari `util.js` akan berada di dalam objek `util`.

Teknik ini berguna jika sebuah file memiliki banyak export.

---

## Perbedaan Named Export dan Default Export

| Fitur | Named Export | Default Export |
|-------|--------------|----------------|
| Menggunakan keyword `default` | ❌ Tidak | ✅ Ya |
| Jumlah export dalam satu file | Tidak terbatas | Hanya satu |
| Menggunakan `{ }` saat import | ✅ Ya | ❌ Tidak |
| Nama saat import | Harus sama | Bebas |

---

## Kapan Menggunakan Masing-Masing?

Gunakan **Named Export** jika:

- Mengekspor beberapa fungsi.
- Mengekspor beberapa variabel.
- Mengekspor utility atau helper.

Gunakan **Default Export** jika:

- File hanya memiliki satu komponen utama.
- Mengekspor satu class.
- Mengekspor satu fungsi utama.

Dalam React, hampir semua file komponen menggunakan **Default Export**, sedangkan utility atau helper biasanya menggunakan **Named Export**.

---

## Kesimpulan

Fitur **`import`** dan **`export`** memungkinkan kita membagi kode ke dalam beberapa file sehingga proyek menjadi lebih rapi dan mudah dikelola.

Secara umum terdapat dua jenis export:

- **Named Export**, digunakan ketika satu file memiliki banyak data yang ingin dibagikan.
- **Default Export**, digunakan ketika satu file hanya memiliki satu data utama yang ingin diekspor.

Memahami konsep ini sangat penting karena hampir seluruh proyek React menggunakan JavaScript Module untuk menghubungkan komponen, fungsi, dan berbagai berkas lainnya.
