---
slug: mengatasi-masalah-time-dualboot-windows-linux
title: Mengatasi konflik waktu / time yang berubah di Windows setelah boot dari Linux
authors: topekox
tags: [linux, windows]
---

Masalah konflik waktu 🕥 yang berubah di Windows setelah boot dari Linux dalam konfigurasi dual boot terjadi karena cara berbeda kedua sistem operasi tersebut menangani waktu yang tersimpan di jam perangkat keras (hardware clock atau RTC/BIOS).

<!--truncate-->

* Linux secara default menganggap waktu yang tersimpan di jam perangkat keras (RTC) adalah UTC (Coordinated Universal Time) atau Waktu Universal. Saat Linux berjalan, ia akan mengambil waktu UTC ini dan menambahkan offset zona waktu lokal Anda untuk menampilkan waktu yang benar.

* Windows secara default menganggap waktu yang tersimpan di jam perangkat keras (RTC) adalah waktu lokal Anda (Local Time).

Ketika boot ke Linux, ia membaca waktu dari RTC (misalnya pukul 08:00 UTC) dan menambah offset zona waktu lokal Anda (misalnya +7 jam untuk WIB), sehingga sistem menampilkan pukul 15:00. Sebelum shutdown, Linux mungkin memperbarui RTC kembali ke waktu UTC yang benar (pukul 08:00 UTC).

Namun, saat Anda boot kembali ke Windows, Windows membaca waktu 08:00 dari RTC tersebut dan menganggapnya sebagai waktu lokal (misalnya WIB), sehingga Windows akan menampilkan pukul 08:00, padahal waktu lokal yang sebenarnya adalah pukul 15:00, membuat waktu di Windows menjadi salah.

## Solusi

Untuk mengatasi konflik ini, Anda perlu membuat kedua sistem operasi menggunakan standar yang sama. Ada dua cara utama:

1. Mengubah konfigurasi Linux agar menggunakan Waktu Lokal (Local Time): Ini biasanya dapat dilakukan dengan menjalankan perintah di Terminal Linux (pada distro berbasis `systemd` seperti Ubuntu):

```bash
timedatectl set-local-rtc 1
```

Perintah ini akan memberitahu Linux untuk menggunakan waktu lokal alih-alih UTC di RTC.

2. Mengubah konfigurasi Windows agar menggunakan UTC (Universal Time): Ini melibatkan pengeditan Registry Windows. **Lakukan dengan hati-hati**.

* Buka Registry Editor (`regedit.exe`) sebagai Administrator.
* Navigasi ke kunci berikut: `HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\TimeZoneInformation`
* Buat entri **DWORD (32-bit) Value** baru bernama `RealTimeIsUniversal`.
* Klik dua kali pada entri baru tersebut dan atur nilainya (Value data) menjadi 1.

Pilih salah satu metode saja. Metode pertama (mengubah Linux) sering dianggap paling mudah.

## Referensi

* https://www.youtube.com/watch?v=xO0lPxrtFCw