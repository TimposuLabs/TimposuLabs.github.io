---
slug: otomatisasi-github-issue-merge-pull-request
title: "Otomatisasi GitHub: Cara Menutup Issue Secara Otomatis Saat Merge Pull Request (Cara Web & CLI)"
authors: topekox
tags: [git, github]
---

![Github](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQXT_Yu-7cXHy5k5_cGQpxLPx2X2FpVuwA5ClFQtistjPpSSmJjQnodTwy&s=10)

Pernahkah Anda lupa menutup *issue* di GitHub setelah fitur selesai dikerjakan? Manajemen proyek secara manual seperti ini sering kali menyita waktu, terutama saat proyek Anda mulai berkembang. 

Kabar baiknya, GitHub memiliki fitur bawaan bernama **Closing Keywords**. Dengan fitur ini, Anda cukup menghubungkan *Pull Request* (PR) ke *issue* terkait, dan GitHub akan **otomatis menutup issue tersebut begitu kode Anda di-merge ke branch utama (`main`)**.

Artikel ini akan membahas langkah konkret alur kerja (*workflow*) ini melalui dua cara: **lewat antarmuka Web GitHub** dan **lewat terminal menggunakan GitHub CLI**.

<!-- truncate -->

## Apa itu Closing Keywords?
GitHub mendeteksi kata-kata kunci tertentu di dalam deskripsi Pull Request atau pesan commit untuk memicu otomatisasi ini. Beberapa kata kunci yang didukung antara lain:
* `closes`, `close`, `closed`
* `fixes`, `fix`, `fixed`
* `resolves`, `resolve`, `resolved`

Format penulisannya sangat sederhana: **[Kata Kunci] #[Nomor Issue]**. Contohnya: `Closes #12`.

## Metode 1: Menggunakan Web GitHub & Git Lokal
Cara ini adalah metode standar yang paling sering digunakan melalui kombinasi terminal lokal dan *browser*.

### Langkah 1: Buat Issue Baru di GitHub
1. Masuk ke repositori Anda di [GitHub](https://github.com/).
2. Klik tab **Issues** > tombol **New Issue**.
3. Isi judul dan deskripsinya (misal: `Fitur Halaman Login`), lalu klik **Submit new issue**.
4. Catat **Nomor Issue** yang muncul di sebelah judul (contoh: `#12`).

### Langkah 2: Buat Branch Baru di Komputer Anda
Buka terminal proyek Anda, pastikan branch utama Anda sudah yang paling update, lalu buat branch baru khusus untuk fitur tersebut:
```bash
git checkout main
git pull origin main
git checkout -b feature/issue-12-login
```

### Langkah 3: Coding, Commit, dan Push
Setelah selesai menulis kode untuk fitur baru tersebut, simpan perubahan Anda dan kirim branch ke GitHub:
```bash
git add .
git commit -m "Mengembangkan desain dan logika halaman login"
git push origin feature/issue-12-login
```

### Langkah 4: Buat Pull Request dengan Closing Keyword
1. Buka repositori Anda di web GitHub, klik tombol **Compare & pull request** yang muncul di bilah kuning.
2. Di kolom **Description**, ketik kata kunci otomatisasinya:
   ```text
   Mengimplementasikan halaman login dengan validasi email.
   
   Closes #12
   ```
3. Klik **Create pull request**.

:::tip
Kata kunci lain yang didukung: `closes`, `close`, `closed`, `fixes`, `fix`, `fixed`, `resolves`, `resolve`, `resolved`.
:::

### Langkah 5: Merge Pull Request
Klik tombol hijau **Merge pull request** lalu konfirmasi. Begitu proses *merge* selesai, silakan cek kembali tab **Issues**. Anda akan melihat bahwa **Issue #12 telah otomatis berubah status menjadi Closed** dengan keterangan bahwa issue tersebut ditutup melalui PR Anda.

## Metode 2: Lebih Cepat Menggunakan GitHub CLI (`gh`)
Jika Anda lebih suka bekerja tanpa berpindah dari terminal ke *browser*, **GitHub CLI (`gh`)** adalah solusi terbaik. Alur kerjanya menjadi jauh lebih ringkas.

### Langkah 1: Buat Issue Langsung dari Terminal
Jalankan perintah berikut untuk membuat issue baru:
```bash
gh issue create --title "Fitur Halaman Login" --body "Implementasi validasi email."
```
GitHub CLI akan menampilkan nomor issue yang berhasil dibuat (misal: `#12`).

### Langkah 2: Buat Branch dan Selesaikan Fitur
Sama seperti metode pertama, buat branch baru dan lakukan commit setelah coding selesai:
```bash
# Buat branch
git checkout -b feature/issue-12-login

# (Proses Coding)

# Commit perubahan
git commit -am "Selesai mengembangkan logika halaman login"
```

### Langkah 3: Buat Pull Request Lewat CLI
Unggah branch sekaligus buat PR langsung dengan menyisipkan parameter `--body` yang berisi kata kunci penutup:
```bash
gh pr create --title "Fitur Halaman Login" --body "Closes #12" --base main
```

### Langkah 4: Merge PR untuk Menutup Issue Otomatis
Terakhir, lakukan *merge* PR langsung dari branch aktif Anda saat ini dengan perintah:
```bash
gh pr merge --merge --delete-branch
```
*Tips: Flag `--delete-branch` di atas berfungsi untuk langsung menghapus branch fitur di GitHub setelah sukses di-merge agar repositori Anda tetap bersih.*

## Kesimpulan
Otomatisasi ini tidak hanya menghemat waktu, tetapi juga menjaga riwayat manajemen proyek (*project management history*) Anda tetap rapi karena setiap fitur yang digabungkan akan langsung terdokumentasi terikat dengan *issue* yang mendasarinya. 

Bagi Anda yang menyukai efisiensi, menggunakan **GitHub CLI** akan memotong banyak langkah manual. Namun, baik cara Web maupun CLI, keduanya menggunakan prinsip dasar yang sama: memanfaatkan kekuatan **Closing Keywords**.
