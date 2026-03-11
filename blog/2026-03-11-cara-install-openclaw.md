---
slug: cara-install-openclaw
title: Cara Install OpenClaw
authors: topekox
tags: [ai, openclaw]
---

Ingin punya asisten AI yang bisa diakses via WhatsApp atau Telegram tapi tetap berjalan di server sendiri? [OpenClaw](https://openclaw.ai/) adalah jawabannya. Sebagai runtime asisten AI yang ringan dan modular, OpenClaw memberikan kebebasan bagi kita untuk memilih model LLM sendiri, mulai dari Anthropic, Google, OpenAI hingga model lokal.

![OpenClaw logo](https://miro.medium.com/v2/resize:fit:1358/format:webp/0*6QRkqLwiamoq4pM_.png)

<!-- truncate -->

## Cara kerja OpenClaw

[OpenClaw](https://openclaw.ai/) adalah Gateway (jembatan) yang menghubungkan model kecerdasan buatan / AI Agent (seperti Claude, OpenAI, Gemini atau model lokal via Ollama) dengan berbagai platform pesan yang biasa kita gunakan setiap hari (seperti Telegram, Whatsapp, Discord dll).

![Assitant AI Flow](https://www.exhibit.tech/wp-content/uploads/2026/02/openclaw-flow-chart.png)

### Dukungan AI Model

OpenClaw mendukung banyak jenis AI Model (Anthropic, OpenAI, Google, dll), untuk daftar lengkapnya silahkan kunjungi link ini: https://docs.openclaw.ai/providers.

### Dukungan Chat Channel

OpenClaw mendukung banya jenis Chat Tool (WhatsApp, Telegram, Discord, dll), untuk daftar lengkapnya silahkan kunjungi link ini: https://docs.openclaw.ai/channels

## Keunggulan OpenClaw

* Bisa menjalankan perintah terminal dan mengelola file lokal yang ada di komputer (mengoperasikan komputer, cek email, browsing dll).
* Kendali penuh karena diinstal di server sendiri (Self-hosted).
* Bebas Vendor, bisa berganti model AI kapan saja tanpa mengubah konfigurasi chat.
* Multi-Platform, satu asisten untuk berbagai aplikasi pesan sekaligus.
* Otomatisasi, cocok untuk monitoring server atau manajemen proyek via chat.
* Bisa kustom persona dari model AI nya.

## Setup Telegram

Untuk Chat Channel di sini saya menggunakan Telegram karena konfigurasinya relatif lebih gampang.

1. Buka aplikasi Telegram dan cari `@BotFather`.
2. Ketik perintah `/newbot`.
3. Ikuti instruksi: beri nama untuk `bot` Anda dan username (harus diakhiri dengan kata `bot`, contoh: `Ucup_bot`).
4. Simpan HTTP API Token yang diberikan oleh `BotFather`. **Token ini sangat rahasia**.

![Telegram](/img/general/telegram1.png)

## Install OpenClaw

Sebelum instal OpenClaw pastikan sudah memenuhi prasyarat sistem yang dibutuhkan:

* **Node.js**: Versi 20 atau lebih baru (LTS sangat disarankan).
* **pnpm**: OpenClaw menggunakan **pnpm** untuk manajemen paket yang lebih efisien.
* **Git**: Untuk menduplikasi repository.
* **Python & Build Tools**: Diperlukan untuk kompilasi beberapa modul native (terutama jika Anda di Linux/macOS).

:::info
Pada tutorial ini menggunakan sistem operasi Linux Debian, untuk sistem operasi lain silahkan menyesuaikan.

https://docs.openclaw.ai/install
:::

1. Buka terminal jalankan script:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

Ikuti petunjuknya untuk konfigurasi OpenClaw step by step.

2. Pilih model AI yang diinginkan.
3. Pada bagian Select Channel masukan token Telegram yang sudah dibuat sebelumnya.

## Menggunakan OpenClaw

* Untuk melihat status OpenClaw jalankan perintah:

```bash
openclaw status
```

* Pairing Telegram dengan OpenClaw: Buka Telegram kemudian chat ke bot yang sudah dibuat `t.me/<nama_bot>`, jalankan perintah `/start` nanti akan akan diberikan kode pairing, contoh kode `7KTWLWDE`, kemudian jalankan di terminal OpenClaw:

```bash
openclaw pairing approve telegram 7KTWLWDE
```

* Biasanya diawal OpenClaw gateway belum terinstal:

```bash
openclaw gateway install
```

* Menjalankan dan menghentikan OpenClaw

```bash
openclaw gateway start

openclaw gateway stop
```

* Membuka menu konfigurasi interaktif:

```bash
openclaw configure
```

* Melihat log:

```bash
openclaw logs --follow
```

## Konfigurasi melalui Chat Bot Telegram

Setelah sukses pairing kita bisa menggunakan Chat Bot di Telegram, selanjutnya kita bisa menggunakan beberapa konfigurasi, misalkan mengatur nama, perilaku atau persona-nya.

## Agen Workspace

Workspace merupakan tempat dimana file-file yang digunakan oleh OpenClaw mislanya menyimpan konfigurasi, kredensial, dan sesi disimpan di `~/.openclaw/`. Kita bisa melakukan backup terhadap Workspace ini.  

https://docs.openclaw.ai/concepts/agent-workspace#agent-workspace

## Fitur OpenClaw

Berikut adalah fitur-fitur utama OpenClaw:
* **Eksekusi Tugas Otonom**: Tidak hanya memberikan saran teks, OpenClaw dapat melakukan tindakan nyata seperti mengoperasikan komputer, membaca dan menulis file, serta menggunakan aplikasi secara langsung.
* **Navigasi Web & Interaksi Sistem**: Agen ini mampu menjelajahi situs web menggunakan protokol seperti Chrome DevTools, mengakses sumber daya lokal, dan menjalankan skrip sistem.
* **Memori Persisten & Ringkasan Konteks**: Memiliki kemampuan untuk menyimpan riwayat interaksi dan membuat ringkasan agar tetap relevan dengan konteks tugas yang sedang dikerjakan.
* **Integrasi Platform Chat**: Dapat dihubungkan dengan antarmuka pihak ketiga seperti Telegram atau WhatsApp untuk memberikan instruksi melalui chat.
* **Ekosistem Ekstensi**: Mendukung lebih dari 50 integrasi resmi untuk mengotomatiskan alur kerja di GitHub, kontrol perangkat smart home, hingga pembaruan teknis.
* **Keamanan & Izin Pengguna**: Menyediakan fitur kontrol di mana agen akan meminta izin pengguna sebelum menjalankan perintah yang dianggap sensitif.
* **Fleksibilitas Model AI**: Mendukung penggunaan berbagai model bahasa besar (LLM) seperti ChatGPT atau Claude dari Anthropic sebagai otak penggeraknya.
* **Opsi Deployment**: Dapat diinstal secara lokal pada komputer (seperti Mac Mini) atau di server cloud melalui penyedia seperti Hostinger VPS, AWS, atau DigitalOcean
