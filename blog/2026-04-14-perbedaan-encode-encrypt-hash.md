---
slug: perbedaan-encode-encrypt-hash
title: Perbedaan Encode, Encrypt dan Hash
authors: topekox
tags: [kriptografi, security, cybersecurity]
---

Pernah nggak sih kalian lagi ngoding atau denger istilah keamanan data, terus muncul istilah **Encode**, **Encrypt**, dan **Hash**? Buat yang baru terjun ke dunia IT, tiga istilah ini sering banget dianggap sama. Padahal, fungsinya beda jauh banget, lho!

Salah pilih metode bisa berakibat fatal buat keamanan aplikasi kalian. Nah, biar nggak ketuker lagi, yuk kita bedah satu-satu pakai bahasa yang santai dan analogi sehari-hari!

<!-- truncate -->

## 1️⃣ Encoding

**Encoding** itu tujuannya **BUKAN** buat nyembunyiin rahasia. Tujuannya adalah mengubah format data supaya bisa dibaca atau dikirim lewat sistem yang berbeda tanpa rusak.

💡 **Analogi ELI5:**
Bayangkan kamu punya koper besar yang isinya baju berantakan. Biar muat masuk ke bagasi pesawat yang sempit, kamu melipat baju-baju itu dengan rapi (di-encode). Petugas bandara mana pun tahu cara buka lipatan itu (di-decode) tanpa perlu kunci rahasia.

* **Sifat:** Dua arah (bisa diubah balik dengan mudah).
* **Keamanan:** Nol. Siapa pun bisa melakukan *decode*.
* **Contoh:** Base64, ASCII, URL Encoding.


## 2️⃣ Encryption

**Encryption** fokus utamanya adalah **KEAMANAN**. Data diacak-acak sedemikian rupa supaya orang yang nggak punya "kunci" nggak bakal bisa baca isinya. Ini adalah standar emas kalau kita mau kirim data rahasia lewat internet.

💡 **Analogi ELI5:**
Kamu mau kirim surat cinta ke gebetan, tapi takut dibaca orang rumah. Akhirnya kamu masukkan surat itu ke dalam brankas kecil dan kamu gembok. Cuma kamu dan gebetanmu yang pegang kuncinya. Orang lain cuma bisa lihat kotak besi yang nggak jelas isinya apa.

* **Sifat:** Dua arah (bisa dibalikkan/decrypt ASAL punya kuncinya).
* **Keamanan:** Tinggi. Bergantung pada kekuatan kunci.
* **Contoh:** AES (dipakai di WhatsApp), RSA, HTTPS.

## 3️⃣ Hashing

**Hashing** tujuannya adalah untuk **INTEGRITAS** atau memastikan data nggak berubah. Bedanya sama yang lain, Hash itu satu arah. Sekali data diubah jadi Hash, dia nggak bisa dikembalikan lagi ke bentuk aslinya.

💡 **Analogi ELI5:**
Bayangkan kamu memasukkan buah apel, jeruk, dan pisang ke dalam blender. Setelah diputar, hasilnya adalah **Jus Smoothies**. Nah, pertanyaannya: Bisa nggak kamu balikin jus itu jadi buah apel, jeruk, dan pisang yang utuh lagi? Nggak bisa, kan? Itulah Hash! Tapi, kalau ada orang lain pakai buah yang persis sama, hasil jusnya bakal punya rasa dan warna yang identik.

* **Sifat:** Satu arah (Nggak bisa dibalikin ke bentuk asli).
* **Keamanan:** Sangat aman untuk simpan password di database.
* **Contoh:** SHA-256, MD5, bcrypt.

## ✅ Ringkasan Biar Nggak Lupa

| Fitur | Encode | Encrypt | Hash |
| :--- | :--- | :--- | :--- |
| **Tujuan Utama** | Kompatibilitas data | Kerahasiaan (Privacy) | Keaslian (Integrity) |
| **Bisa Dibalik?** | Ya, gampang banget | Ya, asal punya kuncinya | Nggak bisa (Satu arah) |
| **Butuh Kunci?** | Nggak butuh | Ya, butuh banget | Nggak butuh |
| **Contoh Pakai** | Kirim file gambar | Chatting di WA | Simpan password user |

## 🔥 Kesimpulan

Jadi, kalau kamu mau simpan password user di database, jangan pakai **Encode** (bahaya!), jangan pakai **Encrypt** (karena kalau kuncinya ilang, repot), tapi pakailah **Hash**. 

Gimana Sobat Timposu? Sudah nggak bingung lagi kan bedanya? 
