---
slug: cara-menggunakan-github-cli
title: Cara Menggunakan Github CLI
authors: topekox
tags: [github, github cli, git]
---

GitHub CLI (`gh`) memungkinkan kamu berinteraksi dengan GitHub langsung dari terminal tanpa harus membuka browser. Berikut adalah langkah-langkah dasar untuk menggunakannya: 

<!-- truncate -->

## 1️⃣ Instalasi

Kamu bisa mengunduh versi yang sesuai dengan sistem operasimu di situs resmi GitHub CLI. 

* macOS (Homebrew): `brew install gh`.
* Windows (Winget): `winget install --id GitHub.cli`.
* Linux: Tersedia di berbagai repositori distro (seperti `apt`, `dnf`, atau `pacman`). 

## 2️⃣ Autentikasi

Setelah terinstal, kamu harus menghubungkan `gh` dengan akun GitHub-mu:

* Jalankan perintah: `gh auth login`.
* Pilih opsi akun (github.com) dan metode koneksi (HTTPS atau SSH).
* Ikuti instruksi di layar untuk login via browser dengan menyalin kode aktivasi yang muncul. 

## 3️⃣ Perintah Dasar yang Sering Digunakan
Setelah login, kamu bisa menggunakan berbagai perintah gh untuk mengelola pekerjaanmu:

### Mengelola Repositori:

* `gh repo create`: Membuat repositori baru (bisa langsung dipublikasikan atau dibuat privat).
* `gh repo clone <user/repo>`: Mengkloning repositori ke komputer lokal.
* `gh repo view --web`: Membuka halaman repositori saat ini di browser.

### Pull Requests (PR):
* `gh pr create`: Membuat Pull Request baru.
* `gh pr list`: Menampilkan daftar PR yang sedang terbuka.
* `gh pr checkout <nomor-pr>`: Berpindah ke cabang PR tertentu untuk ditinjau.

### Issues:
* `gh issue list`: Melihat daftar issue di repositori.
* `gh issue create`: Membuat issue baru.

### Bantuan:
* `gh --help`: Menampilkan daftar semua perintah utama.
* `gh <command> --help`: Memberikan panduan spesifik untuk perintah tertentu (misal: `gh repo --help`). 

Secara teknis, GitHub CLI (`gh`) tidak melakukan push otomatis untuk perubahan kode rutin karena ia tidak menggantikan fungsi dasar dari Git. 

Berikut adalah poin-poin penting mengenai cara kerja "push" di GitHub CLI:

* Bukan Pengganti Git: Perintah untuk menyimpan perubahan kode tetap menggunakan perintah Git standar:` git add`, `git commit`, dan `git push`. GitHub CLI dirancang untuk mengelola fitur-fitur spesifik GitHub seperti Issues, Pull Requests, dan Releases.
* Otomatisasi saat Pembuatan Repo: Satu-satunya kondisi di mana gh melakukan push secara otomatis adalah saat kamu menggunakan perintah `gh repo create --source=. --push`. Perintah ini akan membuat repositori di GitHub sekaligus mengunggah (push) kode lokalmu ke sana untuk pertama kali.
* Interaksi dengan Pull Request: Saat menjalankan `gh pr create`, tool ini mungkin akan bertanya apakah kamu ingin melakukan push terhadap branch saat ini ke remote jika kamu belum melakukannya. Namun, ini tetap memerlukan konfirmasi darimu dan bukan proses yang berjalan otomatis di latar belakang setiap kali ada perubahan file. 
