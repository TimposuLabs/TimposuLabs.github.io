---
sidebar_position: 18
title: 'Parallel Stream'
---

Salah satu fitur yang menarik di Java Stream adalah, Stream bisa dijalankan secara parallel. Parallel Programming akan dibahas pada materi Java Thread.
Secara garis besar, parallel artinya beberapa proses berjalan secara bersamaan. Secara default, Parallel Stream akan dijalankan di `ForkJoinPool`, dimana akan di running secara default menggunakan Thread sejumlah maksimal total CPU kita.


