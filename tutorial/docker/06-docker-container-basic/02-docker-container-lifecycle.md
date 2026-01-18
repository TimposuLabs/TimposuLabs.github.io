---
sidebar_position: 2
title: 'Docker Container Lifecycle'
---

![Docker Container Lifecycle](https://camo.githubusercontent.com/0fd99fe01f38b4b91f2309bb180880b8dabc65fabf615eb04d6704003412d5fb/68747470733a2f2f626c6f672e7465636869657363616d702e636f6d2f636f6e74656e742f696d616765732f323032342f30352f646f636b65726c6966656379636c652d322e676966)

Docker Container memiliki alur hidup dari mulai "dibuat" hingga "dihancurkan". Memahami status kontainer membantu kita tahu kapan sebuah aplikasi benar-benar berjalan atau sedang mengalami kegagalan.

## 🔁 Alur Siklus Hidup Docker Container

Secara garis besar, alurnya adalah:

**Created → Running → Paused** (opsional) **→ Stopped → Deleted**.

1. **Created**: Kontainer sudah dibuat dari Image, tapi belum dinyalakan.
2. **Running**: Kontainer sedang aktif dan proses di dalamnya sedang berjalan.
3. **Paused**: Kontainer dihentikan sementara (prosesnya "tidur").
4. **Exited/Stopped**: Kontainer berhenti (bisa karena selesai tugasnya atau karena error).
5. **Deleted**: Kontainer dihapus dari sistem.

## 🔠 Tabel Ringkasan Perintah & Status

| Perintah	| Status Akhir |	Penjelasan |
| --- | --- | --- |
| `docker create` |	**Created** |	Menyiapkan kontainer tanpa menyalakannya. |
| `docker start` |	**Running** |	Menyalakan kontainer yang sedang Stopped/Created. |
| `docker run`	| **Running**	| Membuat dan menyalakan kontainer baru. |
| `docker stop` |	**Exited** |	Mematikan aplikasi di dalam kontainer secara halus, atau  `docker container kill` (mati paksa). |
| `docker pause` |	**Paused**	| Membekukan proses kontainer sementara. |
| `docker rm`	| **-**	| Menghapus record kontainer dari sistem. |

## 👍 Mengapa Memahami Lifecycle itu Penting?

1. **Troubleshooting**: Jika kita mengetik `docker ps` dan kontainer tidak muncul, cek dengan docker `ps -a`. Jika statusnya **Exited (1)**, berarti aplikasi kita crash. Jika **Exited (0)**, berarti aplikasi selesai berjalan dengan normal.
2. **Manajemen Data**: Ingatlah bahwa data di dalam kontainer hanya akan bertahan selama kontainer belum mencapai status **Deleted** (kecuali pakai Volume).
3. **Otomatisasi**: Kita sering menggunakan flag `--rm` saat docker run. Ini berarti saat kontainer mencapai status Exited, ia akan langsung Deleted secara otomatis.

    *Contoh: `docker run --rm alpine echo "Cek Saja"`.*