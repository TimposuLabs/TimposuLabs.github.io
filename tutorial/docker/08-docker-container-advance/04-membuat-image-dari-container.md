---
sidebar_position: 4
title: 'Membuat Image dari Container'
---

## 1️⃣ Konsep Dasar

Biasanya, kita membuat image menggunakan Dockerfile (pendekatan deklaratif). Namun, Docker juga menyediakan perintah `docker commit` (pendekatan imperatif). Perintah ini mengambil kontainer yang sedang berjalan, lalu membekukan seluruh perubahannya menjadi sebuah Image baru.

**Analogi:**
* **Dockerfile**: Seperti memasak menggunakan resep tertulis dari awal.
* **Docker Commit**: Seperti memotret (snapshot) masakan yang sedang diolah, lalu menjadikannya makanan kaleng instan.

## 2️⃣ Mengapa Menggunakan Docker Commit?

Meskipun Dockerfile adalah best practice, `docker commit` sangat berguna dalam situasi berikut:

* **Debugging**: kita masuk ke kontainer, menginstal banyak dependency, mengubah konfigurasi hingga aplikasi jalan, lalu kita ingin menyimpan hasil "perbaikan" tersebut.
* **Forensik**: mengambil status terakhir kontainer yang error untuk dianalisis lebih lanjut di komputer lain.
* **Kustomisasi Cepat**: kita menjalankan image dasar (misal Ubuntu), melakukan banyak instalasi manual secara interaktif, dan ingin menyimpannya tanpa menulis Dockerfile.

## 3️⃣ Cara Melakukan Commit

**Langkah 1: Jalankan Kontainer Dasar**

```bash
docker run -it --name kontainer-latihan alpine sh
```

**Langkah 2: Lakukan Perubahan di Dalamnya**

Misalnya, kita instal sebuah aplikasi dan buat file:

```bash
apk add curl
echo "Data Penting" > /data.txt
exit
```

**Langkah 3: Ubah Kontainer Menjadi Image**

Gunakan perintah commit untuk menyimpannya:

```bash
# Sintaks: docker commit [NAMA_KONTAINER] [NAMA_IMAGE_BARU]:[TAG]
docker commit kontainer-latihan ucup/alpine-custom:v1.0
```

**Langkah 4: Verifikasi**

Cek daftar image, sekarang `ucup/alpine-custom` sudah siap digunakan:

```bash
docker image ls
```

## 4️⃣ Menambahkan Metadata saat Commit

Kita bisa menambahkan pesan penjelasan (seperti commit pada Git) agar orang lain tahu perubahan apa yang kita lakukan:

```bash
docker commit --author "Ucup Dev" --message "Sudah instal curl dan file data" kontainer-latihan alpine-v2
```

## 5️⃣ Bahaya Menggunakan `docker commit` ⚠️

Kita harus tahu mengapa cara ini **tidak disarankan** untuk lingkungan produksi utama:

1. **Black Box**: Orang lain tidak tahu apa saja yang kita lakukan di dalam kontainer tersebut. Tidak ada resep (Dockerfile) yang bisa dibaca.
2. **Ukuran Membengkak**: Setiap commit menciptakan layer baru yang seringkali tidak efisien dan membuat ukuran image menjadi sangat besar.
3. **Tidak Bisa Direplikasi**: Jika image tersebut rusak atau hilang, kita tidak bisa membuatnya lagi secara otomatis karena kita tidak punya catatan langkah-langkahnya.

## 6️⃣ Tips

Gunakan `docker commit` hanya untuk **keadaan darurat** atau **eksperimen**. Jika kita sudah menemukan konfigurasi yang pas melalui `commit`, segera pindahkan langkah-langkah tersebut ke dalam sebuah **Dockerfile** yang rapi agar aplikasi kita tetap memenuhi standar *Cloud-Native* yang transparan dan dapat diproduksi ulang kapan saja.
