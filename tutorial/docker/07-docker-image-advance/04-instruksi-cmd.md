---
sidebar_position: 4
title: 'Dockerfile CMD'
---

## 1️⃣ Apa itu CMD?

**`CMD`** (Command) adalah instruksi dalam Dockerfile yang menentukan perintah yang akan dijalankan secara otomatis saat kontainer dimulai. Jika sebuah Dockerfile tidak memiliki `CMD`, kontainer akan langsung berhenti setelah dinyalakan karena tidak ada proses yang berjalan.

* **Tujuan**: Menentukan "tugas utama" kontainer (misal: menjalankan web server atau script).
* **Aturan**: Hanya boleh ada **satu** instruksi `CMD` dalam sebuah Dockerfile. Jika kita menulis lebih dari satu, hanya **yang terakhir** yang akan dieksekusi.

## 2️⃣ Format Penulisan (Syntax)

Terdapat dua cara menulis `CMD`, namun para profesional hampir selalu menggunakan **Exec Form**.

### A. Exec Form (Sangat Disarankan)

Formatnya menggunakan kurung siku `[]` dan tanda kutip ganda `"`.

```
CMD ["executable", "parameter1", "parameter2"]
```

Contoh:

```
CMD ["/usr/bin/echo", "Halo Bro"]
```

```
CMD ["java", "-jar", "app.jar"]
```

**Kelebihan**: Docker menjalankan proses secara langsung sebagai PID 1, sehingga kontainer bisa menerima sinyal *shutdown* (seperti `SIGTERM`) dengan benar (bersih/graceful).

### B. Shell Form (Kurang Disarankan)

Formatnya seperti mengetik di terminal biasa.

```
CMD java -jar app.jar
```

**Kekurangan**: Docker akan membungkus perintah ini di dalam `/bin/sh -c`. Akibatnya, aplikasi kita tidak menjadi PID 1 dan akan sulit dihentikan secara halus oleh Docker.

## 3️⃣ Karakteristik "Overridable"

Salah satu ciri khas `CMD` adalah nilainya bisa ditimpa (diganti) dengan mudah saat kita menjalankan perintah `docker run`.

**Contoh:**

Jika di Dockerfile tertulis: `CMD ["echo", "Halo Dunia"]`

* Jalan biasa: `docker run my-app` → Output: **Halo Dunia**
* Ditimpa: `docker run my-app ls` → Output: (**Daftar file**) 

    *Perintah `echo` akan diabaikan sama sekali dan digantikan oleh `ls`.*

## 4️⃣ Best Practice

* **Gunakan Exec Form**: Selalu gunakan format `["perintah", "argumen"]`.
* **Satu Tugas Utama**: Pastikan `CMD` menjalankan proses yang tetap aktif (seperti web server atau loop). Jika proses di `CMD` selesai/berhenti, maka kontainer juga akan otomatis berhenti.
* **Gunakan untuk Argumen Default**: Jika kita menggunakan `ENTRYPOINT`, gunakan `CMD` untuk menyimpan parameter yang mungkin ingin diubah oleh pengguna.
