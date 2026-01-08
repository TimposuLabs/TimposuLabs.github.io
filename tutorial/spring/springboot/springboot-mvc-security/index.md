---
sidebar_position: 3
---

# Spring Boot MVC Security

## 🤔 Apa itu Spring Boot MVC Security 👮🏻‍♂️?

[**Spring Security**](https://spring.io/projects/spring-security/) adalah standar industri untuk mengamankan aplikasi berbasis Java. Dalam konteks **MVC (Model-View-Controller)**, framework ini bertindak sebagai perisai 🛡️ yang melindungi alur data antara pengguna (View), logika bisnis (Controller), dan database (Model).

## 📌 Kenapa harus menggunakan Spring Boot MVC Security?

Keamanan bukan lagi fitur opsional, melainkan kebutuhan wajib untuk menjaga integritas data dan layanan. Spring Security memberikan perlindungan bawaan terhadap ancaman web modern seperti:

* **Cross-Site Request Forgery (CSRF)**: Mencegah eksekusi perintah ilegal atas nama pengguna.
* **Cross-Site Scripting (XSS)**: Menangkis injeksi skrip berbahaya ke dalam halaman web.

## ✍️ Konsep Utama yang akan Dipelajari

1. **Autentikasi (Authentication)**: Proses verifikasi identitas pengguna, misalnya melalui form login kustom yang terintegrasi dengan [Thymeleaf](https://www.thymeleaf.org/).
2. **Otorisasi (Authorization)**: Menentukan hak akses pengguna, seperti siapa yang boleh masuk ke halaman tertentu misalnya: `/admin` atau hanya `/dashboard`.
3. **UserDetailsService**: Komponen kunci untuk memuat data pengguna dari database dan mencocokkan kredensial.

## 🤝 Dependency Utama

Kita perlu menambahkan dua dependensi utama:

* `Spring Web` (untuk fitur MVC)
* `Spring Security` (untuk fitur keamanan)

Meskipun sering dianggap kompleks, memahami cara kerja internal Spring Security akan memudahkan kita membangun aplikasi yang aman dan tangguh.
