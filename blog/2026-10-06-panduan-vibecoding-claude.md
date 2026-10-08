---
slug: panduan-vibecoding-claude
title: "Panduan Vibe Coding dengan Claude Code"
authors: topekox
tags: [vibe coding, claude]
---

![Claude Code](https://images.unsplash.com/photo-1775994121064-e75fa6f3e84c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

Dunia pengembangan perangkat lunak sedang mengalami perubahan besar dengan semakin berkembangnya **Artificial Intelligence (AI)**. Developer kini tidak hanya menulis kode secara manual, tetapi juga dapat bekerja bersama AI untuk membuat, memahami, memperbaiki, dan mengembangkan aplikasi.

Salah satu pendekatan yang semakin populer adalah **Vibe Coding**.

Vibe Coding secara sederhana menggambarkan pendekatan pengembangan perangkat lunak di mana developer memberikan instruksi menggunakan bahasa natural kepada AI, kemudian AI membantu menghasilkan atau memodifikasi kode.

<!-- truncate -->

Namun, menggunakan AI coding assistant tidak cukup hanya dengan mengetahui cara memberikan prompt.

Developer juga perlu memahami istilah dan konsep yang berada di balik sistem tersebut.

Dalam penggunaan **Claude Code**, terdapat sejumlah istilah penting seperti *model*, *token*, *context window*, *tool*, *agent*, *harness*, *MCP*, dan *skill*.

Artikel ini membahas **9 istilah penting yang perlu dipahami developer sebelum bekerja lebih jauh dengan AI coding tools**.

## 1. Model

**Model** adalah "otak" dari AI.

Model bertanggung jawab untuk memahami input yang diberikan developer dan menghasilkan output berdasarkan konteks yang tersedia.

Dalam ekosistem AI, terdapat berbagai jenis model dengan karakteristik yang berbeda.

Misalnya:

- Model yang lebih cepat untuk tugas sederhana.
- Model yang lebih kuat untuk reasoning.
- Model yang lebih cocok untuk coding.
- Model dengan kemampuan memahami konteks yang lebih panjang.

Pada Claude Code, developer dapat memilih model sesuai kebutuhan pekerjaan.

### Perintah `/model`

Perintah:

```text
/model
```

digunakan untuk melihat atau mengganti model yang digunakan.

Secara umum, pemilihan model dapat disesuaikan dengan jenis pekerjaan.

| Jenis pekerjaan | Model yang dibutuhkan |
|---|---|
| Pertanyaan sederhana | Model ringan/cepat |
| Refactoring kode | Model yang lebih kuat |
| Debugging kompleks | Model reasoning |
| Analisis arsitektur | Model dengan kemampuan reasoning tinggi |
| Perubahan kode sederhana | Model cepat |

### Mengapa model penting?

Kesalahan umum ketika menggunakan AI coding assistant adalah menganggap semua model memiliki kemampuan yang sama.

Padahal, kualitas hasil dapat dipengaruhi oleh model yang digunakan.

Contohnya, permintaan:

```text
Buatkan fungsi untuk menghitung luas lingkaran.
```

merupakan tugas sederhana.

Namun, permintaan seperti:

```text
Analisis arsitektur aplikasi ini, identifikasi bottleneck,
kemudian refactor bagian authentication tanpa mengubah API
yang sudah digunakan oleh client.
```

membutuhkan kemampuan reasoning yang jauh lebih tinggi.

## 2. Token

**Token** adalah satuan yang digunakan model AI untuk memproses teks.

Token tidak selalu sama dengan satu kata.

Sebuah kata dapat terdiri dari satu atau beberapa token, tergantung bahasa dan bagaimana tokenizer model memecah teks.

Sebagai contoh sederhana:

```text
Hello world
```

dapat dipecah menjadi beberapa token.

Token digunakan untuk merepresentasikan:

- Prompt developer.
- Source code.
- Percakapan.
- Output AI.
- Informasi dari file.
- Informasi tambahan yang dimasukkan ke context.

### Mengapa developer perlu memahami token?

Karena penggunaan AI tidak hanya berkaitan dengan kemampuan model, tetapi juga dengan jumlah informasi yang diproses.

Semakin banyak file dan percakapan yang diberikan kepada AI, semakin besar pula jumlah token yang dapat digunakan.

### Perintah `/usage`

Pada Claude Code, perintah:

```text
/usage
```

dapat digunakan untuk melihat informasi penggunaan.

Pemahaman terhadap token membantu developer memahami mengapa sebuah sesi AI dapat menjadi semakin besar dan mengapa pengelolaan context menjadi penting.



## 3. Context Window

**Context Window** adalah jumlah informasi yang dapat dipertimbangkan oleh model dalam satu konteks pemrosesan.

Context dapat berisi:

- Percakapan sebelumnya.
- Source code.
- File konfigurasi.
- Instruksi developer.
- Hasil command.
- Informasi dari tools.
- Informasi lain yang dimasukkan ke sesi.

Bayangkan context window seperti **meja kerja AI**.

Semakin besar mejanya, semakin banyak informasi yang dapat diletakkan di atasnya.

### Contoh

Misalnya developer sedang mengembangkan aplikasi:

```text
project/
├── src/
│   ├── auth/
│   ├── users/
│   └── api/
├── tests/
├── package.json
└── README.md
```

Jika AI membaca terlalu banyak file sekaligus, context yang digunakan akan semakin besar.

Karena itu, developer perlu memahami bagaimana context dikelola.

### Perintah `/context`

Perintah:

```text
/context
```

dapat digunakan untuk melihat informasi mengenai context yang sedang digunakan.

### Perintah `/clear`

Jika context sudah terlalu penuh atau percakapan sebelumnya tidak lagi relevan, developer dapat menggunakan:

```text
/clear
```

Tujuannya adalah memulai konteks baru sehingga informasi lama tidak terus terbawa ke sesi berikutnya.

### Context bukan sekadar "memory"

Penting untuk membedakan **context window** dengan memory.

Context adalah informasi yang tersedia bagi model dalam konteks pemrosesan saat ini.

Memory dapat merujuk pada mekanisme yang lebih luas untuk mempertahankan informasi tertentu di luar konteks percakapan saat ini.



## 4. Hallucination

**Hallucination** atau halusinasi adalah kondisi ketika AI menghasilkan informasi yang terdengar masuk akal tetapi sebenarnya salah, tidak akurat, atau bahkan tidak ada.

Halusinasi merupakan salah satu risiko terbesar ketika developer terlalu percaya kepada AI.

### Contoh hallucination

Misalnya developer bertanya:

```text
Apakah library XYZ memiliki fungsi authenticateUser()?
```

AI mungkin menjawab:

```text
Ya, gunakan XYZ.authenticateUser().
```

Namun setelah diperiksa, fungsi tersebut ternyata tidak pernah ada.

AI dapat menghasilkan kode yang:

- Tidak terdapat pada library.
- Menggunakan API yang sudah deprecated.
- Salah memahami dokumentasi.
- Menggunakan konfigurasi yang tidak valid.
- Menghasilkan solusi yang tampak benar tetapi memiliki bug.

### Jangan langsung percaya pada kode AI

Developer tetap harus melakukan verifikasi.

Beberapa hal yang dapat diperiksa:

1. Dokumentasi resmi.
2. Source code.
3. Unit test.
4. Integration test.
5. Hasil eksekusi program.
6. Log aplikasi.
7. Security implications.

Prinsip pentingnya adalah:

> AI membantu developer menulis kode, tetapi developer tetap bertanggung jawab terhadap kode tersebut.

## 5. Tool

**Tool** adalah kemampuan yang memungkinkan AI berinteraksi dengan lingkungan di luar sekadar menghasilkan teks.

Contohnya, AI dapat menggunakan tool untuk:

- Membaca file.
- Membuat file.
- Mengubah source code.
- Menjalankan command.
- Membaca hasil command.
- Berinteraksi dengan sistem tertentu.
- Mengakses layanan eksternal melalui mekanisme yang tersedia.

Dengan tool, AI tidak lagi hanya menjadi chatbot.

AI dapat melakukan pekerjaan secara langsung terhadap lingkungan development.

### Contoh

Tanpa tool:

```text
Developer:
Periksa file app.py.

AI:
Silakan kirim isi file app.py.
```

Dengan kemampuan tool:

```text
Developer:
Periksa app.py dan cari kemungkinan bug.
```

AI dapat membaca file tersebut apabila memiliki permission untuk melakukannya.

### Permission dan keamanan

Kemampuan menggunakan tool harus disertai dengan kontrol akses.

Developer harus memahami:

- File apa yang boleh dibaca AI.
- File apa yang boleh diubah.
- Command apa yang boleh dijalankan.
- Apakah AI boleh mengakses internet.
- Credential apa yang tersedia.
- Apakah AI dapat menghapus file.

Dalam Claude Code, developer dapat menggunakan shortcut:

```text
Shift + Tab
```

untuk mengubah mode permission yang tersedia sesuai konfigurasi dan alur penggunaan.

## 6. Agent

**Agent** adalah kemampuan AI untuk menjalankan serangkaian langkah untuk mencapai sebuah tujuan.

Chatbot tradisional biasanya bekerja dengan pola:

```text
Pertanyaan
    ↓
Jawaban
```

Sedangkan agent dapat bekerja dengan pola:

```text
Tujuan
  ↓
Analisis
  ↓
Memilih tindakan
  ↓
Menggunakan tool
  ↓
Melihat hasil
  ↓
Mengevaluasi
  ↓
Mengambil tindakan berikutnya
  ↓
Selesai
```

### Contoh agent dalam software development

Developer memberikan instruksi:

```text
Perbaiki bug authentication pada aplikasi ini dan pastikan test tetap berjalan.
```

Agent dapat melakukan beberapa langkah:

1. Membaca struktur project.
2. Mencari file authentication.
3. Membaca implementasi.
4. Menemukan kemungkinan bug.
5. Mengubah kode.
6. Menjalankan test.
7. Membaca hasil test.
8. Memperbaiki error jika test gagal.
9. Menjalankan test kembali.
10. Memberikan hasil kepada developer.

Ini berbeda dari sekadar memberikan potongan kode.

### Menghentikan agent

Karena agent dapat melakukan banyak tindakan secara berurutan, developer harus tetap mengawasi prosesnya.

Jika AI mulai mengambil tindakan yang tidak sesuai, proses dapat dihentikan menggunakan:

```text
Escape
```

Prinsipnya:

> Autonomous bukan berarti tanpa pengawasan.

## 7. Harness

Istilah **Harness** mungkin terdengar asing bagi developer yang baru mengenal AI coding tools.

Secara sederhana, harness dapat dipahami sebagai **lingkungan atau sistem yang menyediakan berbagai komponen agar model AI dapat bekerja sebagai sebuah sistem yang lebih lengkap**.

Model AI sendiri hanyalah salah satu komponen.

Sebagai ilustrasi:

```text
┌─────────────────────────────┐
│           Harness           │
│                             │
│  ┌─────────┐   ┌─────────┐  │
│  │ Model   │   │ Context │  │
│  └─────────┘   └─────────┘  │
│                             │
│  ┌─────────┐   ┌─────────┐  │
│  │ Tools   │   │ Agent   │  │
│  └─────────┘   └─────────┘  │
│                             │
│  ┌────────────────────────┐ │
│  │ Permission / Execution │ │
│  └────────────────────────┘ │
└─────────────────────────────┘
```

Dalam konteks AI coding, **Claude Code** dapat dipahami sebagai lingkungan yang mengorkestrasi model, context, tools, permission, dan kemampuan agent untuk membantu developer bekerja pada project.

### Model vs Harness

Perbedaan sederhananya:

| Komponen | Peran |
|---|---|
| Model | Menghasilkan reasoning dan output |
| Tool | Memberikan kemampuan melakukan tindakan |
| Context | Menyediakan informasi untuk model |
| Agent | Mengatur proses menuju tujuan |
| Harness | Menyatukan komponen tersebut menjadi lingkungan kerja |

Dengan memahami perbedaan ini, developer tidak lagi menganggap AI coding tool sebagai "model AI saja".

## 8. MCP -Model Context Protocol

**MCP (Model Context Protocol)** adalah sebuah protokol yang memungkinkan model atau aplikasi AI berinteraksi dengan sumber daya dan layanan eksternal melalui struktur yang terstandarisasi.

Sederhananya, MCP dapat dibayangkan sebagai **jembatan antara AI dengan aplikasi atau sistem eksternal**.

Contohnya dapat digunakan untuk menghubungkan AI dengan layanan seperti:

- Design tools.
- Database.
- File system.
- API.
- Development tools.
- Project management tools.
- Layanan internal perusahaan.

### Gambaran MCP

```text
              AI Coding Assistant
                       │
                       ▼
                ┌─────────────┐
                │     MCP     │
                └──────┬──────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Database      Figma         API
```

Tanpa mekanisme integrasi yang terstruktur, setiap aplikasi dapat membutuhkan cara integrasi yang berbeda.

MCP menyediakan pendekatan yang lebih terstandarisasi untuk menghubungkan AI dengan berbagai sumber daya.

### Perintah `/mcp`

Pada Claude Code, perintah:

```text
/mcp
```

dapat digunakan untuk melihat informasi mengenai MCP server atau integrasi MCP yang tersedia dalam environment tersebut.

### Mengapa MCP penting?

MCP memperluas kemampuan AI.

AI tidak hanya bekerja dengan informasi yang diberikan melalui percakapan, tetapi dapat berinteraksi dengan sumber daya eksternal sesuai integrasi dan permission yang diberikan.

Namun, semakin banyak akses yang diberikan, semakin penting pula aspek keamanan.



## 9. Skill

**Skill** adalah kumpulan instruksi atau panduan yang membantu AI melakukan pekerjaan tertentu dengan cara yang lebih konsisten.

Bayangkan skill sebagai **SOP untuk AI**.

Tanpa skill:

```text
AI:
Bagaimana saya harus mengerjakan tugas ini?
```

Dengan skill:

```text
Skill:
Untuk tugas ini gunakan langkah berikut:
1. Periksa struktur project.
2. Analisis konfigurasi.
3. Jalankan test.
4. Perbaiki kode.
5. Jalankan test kembali.
6. Dokumentasikan perubahan.
```

Skill dapat membantu AI mengikuti pola kerja tertentu.

### Contoh penggunaan skill

Misalnya sebuah tim memiliki aturan:

```text
Setiap perubahan kode harus:
1. Mengikuti coding standard.
2. Memiliki test.
3. Tidak mengubah public API tanpa persetujuan.
4. Menjalankan linting.
5. Menjalankan unit test.
```

Instruksi tersebut dapat digunakan sebagai panduan kerja AI.

### Perintah `/skills`

Pada environment yang mendukung skill, perintah:

```text
/skills
```

dapat digunakan untuk melihat skill yang tersedia.

Dengan demikian, developer dapat mengetahui panduan atau kemampuan khusus yang dapat digunakan AI.

## Hubungan 9 Istilah

Kesembilan istilah tersebut sebenarnya saling berhubungan.

Gambaran sederhananya:

```text
                         DEVELOPER
                             │
                             ▼
                         PROMPT / GOAL
                             │
                             ▼
                    ┌─────────────────┐
                    │     HARNESS     │
                    │                 │
                    │  ┌───────────┐  │
                    │  │   AGENT   │  │
                    │  └─────┬─────┘  │
                    │        │        │
                    │        ▼        │
                    │     MODEL       │
                    │        │        │
                    │        ▼        │
                    │    CONTEXT      │
                    │        │        │
                    │   ┌────┴────┐   │
                    │   ▼         ▼   │
                    │ TOOLS      SKILL│
                    │   │             │
                    │   ▼             │
                    │  MCP            │
                    └─────────────────┘
                             │
                             ▼
                         HASIL KERJA
```

Dari diagram tersebut kita dapat melihat bahwa model bukan satu-satunya komponen dalam AI coding assistant.

Ada banyak komponen lain yang bekerja bersama.

## Ringkasan 9 Istilah

| No. | Istilah | Penjelasan Singkat | Contoh |
|---|---|---|---|
| 1 | Model | Otak AI yang menghasilkan output | Sonnet, Opus |
| 2 | Token | Unit informasi yang diproses model | Teks, kode |
| 3 | Context Window | Kapasitas informasi dalam konteks | Percakapan + source code |
| 4 | Hallucination | Informasi atau kode yang dibuat AI tetapi salah | API yang sebenarnya tidak ada |
| 5 | Tool | Kemampuan AI melakukan tindakan | Read file, execute command |
| 6 | Agent | Kemampuan AI menjalankan rangkaian tindakan | Debug → edit → test |
| 7 | Harness | Lingkungan yang mengorkestrasi AI | Claude Code |
| 8 | MCP | Protokol untuk menghubungkan AI dengan sistem eksternal | Database, Figma, API |
| 9 | Skill | Instruksi khusus untuk mengatur cara AI bekerja | Coding workflow |



## Perintah yang Perlu Diingat

Berikut beberapa perintah yang dibahas dalam konteks Claude Code:

| Command | Fungsi Umum |
|---|---|
| `/model` | Melihat atau mengganti model |
| `/usage` | Melihat penggunaan |
| `/context` | Melihat informasi context |
| `/clear` | Membersihkan atau mereset context |
| `/mcp` | Melihat konfigurasi MCP |
| `/skills` | Melihat skill yang tersedia |

Selain command tersebut, terdapat beberapa shortcut yang penting:

| Shortcut | Fungsi |
| --- | --- |
| `Shift + Tab` | Mengubah mode permission tertentu |
| `Escape` | Menghentikan proses AI |

> Perintah dan shortcut dapat berubah mengikuti versi dan konfigurasi tool yang digunakan. Selalu periksa dokumentasi versi yang sedang digunakan.

## Vibe Coding Bukan Berarti "Membiarkan AI Menulis Semuanya"

Salah satu kesalahpahaman mengenai Vibe Coding adalah anggapan bahwa developer cukup memberikan prompt kemudian membiarkan AI mengerjakan semuanya.

Pendekatan tersebut berisiko.

Developer tetap perlu memahami:

- Arsitektur aplikasi.
- Source code.
- Dependency.
- Security.
- Testing.
- Git.
- Database.
- API.
- Deployment.
- Performance.
- Debugging.

AI sebaiknya diposisikan sebagai **development partner**, bukan sebagai pengganti kemampuan teknis developer.

## Workflow Vibe Coding yang Lebih Aman

Developer dapat menggunakan workflow seperti berikut:

```text
1. Define Goal
       │
       ▼
2. Give Context
       │
       ▼
3. Ask AI to Analyze
       │
       ▼
4. Review Proposed Solution
       │
       ▼
5. Allow AI to Modify Code
       │
       ▼
6. Run Tests
       │
       ▼
7. Review Diff
       │
       ▼
8. Verify Manually
       │
       ▼
9. Commit Changes
```

Jangan langsung menggunakan:

```text
"Perbaiki semua aplikasi saya."
```

Lebih baik memberikan tujuan yang spesifik.

Contohnya:

```text
Analisis terlebih dahulu masalah authentication pada project ini.
Jangan mengubah file apa pun.

Identifikasi:
1. kemungkinan penyebab bug,
2. file yang terlibat,
3. risiko perubahan,
4. solusi yang direkomendasikan.

Setelah analisis selesai, tunggu persetujuan saya
sebelum melakukan perubahan.
```

Pendekatan tersebut memberikan developer **kontrol lebih besar terhadap agent**.

## Vibe Coding dan Developer Modern

Perkembangan AI coding tools mengubah cara developer bekerja.

Dahulu workflow dapat terlihat seperti:

```text
Requirement
    ↓
Menulis kode
    ↓
Debugging
    ↓
Testing
    ↓
Deployment
```

Dengan AI coding assistant:

```text
Requirement
    ↓
Developer + AI
    ↓
AI membaca context
    ↓
AI menggunakan tools
    ↓
AI membuat perubahan
    ↓
Developer melakukan review
    ↓
Testing
    ↓
Deployment
```

Perubahan terbesar bukan hanya pada kecepatan menulis kode.

Developer sekarang perlu memiliki kemampuan tambahan:

- Menulis instruksi yang jelas.
- Memahami context.
- Mengawasi agent.
- Memverifikasi output AI.
- Mengelola permission.
- Memahami integrasi MCP.
- Mendesain workflow AI.
- Melakukan code review.
- Memastikan keamanan.

## Kesimpulan

**Vibe Coding** bukan sekadar aktivitas memberikan prompt kepada AI untuk menghasilkan kode.

Di balik AI coding assistant terdapat berbagai komponen yang saling berhubungan.

Sembilan istilah yang penting untuk dipahami adalah:

1. **Model** - otak AI.
2. **Token** - unit informasi yang diproses AI.
3. **Context Window** - kapasitas informasi yang tersedia dalam konteks.
4. **Hallucination** - kesalahan AI ketika menghasilkan informasi yang tidak benar.
5. **Tool** - kemampuan AI berinteraksi dengan environment.
6. **Agent** - kemampuan AI menjalankan rangkaian tindakan secara mandiri.
7. **Harness** - lingkungan yang mengorkestrasi model dan berbagai komponen AI.
8. **MCP** - protokol untuk menghubungkan AI dengan sistem eksternal.
9. **Skill** - instruksi khusus yang membantu AI menjalankan tugas secara konsisten.

Pemahaman terhadap istilah-istilah tersebut membuat developer tidak hanya menjadi **pengguna AI**, tetapi juga mampu memahami bagaimana AI digunakan sebagai bagian dari workflow software development.

Pada akhirnya, tujuan Vibe Coding bukan menggantikan developer.

Tujuannya adalah membuat developer menjadi **lebih produktif, lebih cepat melakukan eksperimen, dan lebih fokus pada problem solving**, sambil tetap mempertahankan kontrol manusia terhadap kode dan keputusan teknis.

> **AI dapat menulis kode, tetapi developer tetap harus memahami, memverifikasi, dan bertanggung jawab terhadap kode tersebut.**

## Referensi

* https://www.youtube.com/watch?v=OVY4e0qB4hk
