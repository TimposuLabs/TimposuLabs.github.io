---
sidebar_position: 18
title: 'Parallel Stream'
---

Salah satu fitur yang menarik di Java Stream adalah, Stream bisa dijalankan secara **parallel**. Parallel Programming akan dibahas pada materi Java Thread. Secara garis besar, parallel artinya beberapa proses berjalan secara bersamaan. Secara default, Parallel Stream akan dijalankan di `ForkJoinPool`, dimana akan di running secara default menggunakan Thread sejumlah maksimal total CPU kita.

Parallel Stream adalah fitur dalam Java Stream API yang memungkinkan Anda memproses data secara paralel menggunakan beberapa thread. Ini bisa sangat meningkatkan performa untuk operasi yang intensif secara komputasi pada koleksi data yang besar.

## 🚀 Konsep Dasar

Secara default, semua operasi stream di Java berjalan secara serial (satu per satu) pada satu thread. Ketika Anda menggunakan parallel stream, Java secara otomatis membagi koleksi data menjadi beberapa sub-bagian. Masing-masing sub-bagian ini kemudian diproses secara independen dan simultan oleh thread yang berbeda.

### Bagaimana Implementasinya?

Java menggunakan thread pool bersama yang dikenal sebagai ForkJoinPool untuk menjalankan tugas-tugas dari parallel stream. Secara default, ForkJoinPool akan menggunakan jumlah thread yang setara dengan jumlah inti (core) pemrosesan yang tersedia di sistem Anda.

__Contoh Sequential non Parallel:__

```java
Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    .forEach(number ->{
        System.out.println(Thread.currentThread().getName() + " : " + number);
    });
```

Output:

```
main : 1
main : 2
main : 3
main : 4
main : 5
main : 6
main : 7
main : 8
main : 9
main : 10
```

Pada contoh di atas program akan dijalankan pada Thread yang sama.

__Berikut contoh menggunakan Stream Parallel:__

```java
Stream.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        .parallel()
        .forEach(number ->{
            System.out.println(Thread.currentThread().getName() + " : " + number);
        });
```

Output:

```
ForkJoinPool.commonPool-worker-5 : 4
ForkJoinPool.commonPool-worker-1 : 3
ForkJoinPool.commonPool-worker-8 : 1
ForkJoinPool.commonPool-worker-7 : 6
ForkJoinPool.commonPool-worker-6 : 8
main : 7
ForkJoinPool.commonPool-worker-4 : 9
ForkJoinPool.commonPool-worker-2 : 2
ForkJoinPool.commonPool-worker-3 : 5
ForkJoinPool.commonPool-worker-9 : 10
```

Program akan dieksekusi dengan Thread secara acak.

## :toolbox: Cara membuat Stream Parallel

Ada dua cara utama untuk mendapatkan parallel stream:

1. **Menggunakan `.parallelStream()`**

Ini adalah cara paling umum ketika Anda memulai dari sebuah koleksi (`Collection`):

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
numbers.parallelStream() // Stream berjalan secara paralel
       .filter(n -> n % 2 == 0)
       .forEach(System.out::println);
```

2. **Menggunakan `.parallel()`**

Jika sudah memiliki data Stream, kita  dapat mengubahnya menjadi parallel stream dengan memanggil metode `.parallel()`:

```java
Stream.of(1, 2, 3, 4, 5)
      .parallel() // Mengubah stream serial menjadi parallel
      .map(n -> n * 2)
      .forEach(System.out::println);
```

## ❓ Kapan harus menggunakan Stream Parallel

Parallel Stream tidak selalu lebih cepat daripada stream serial. overhead yang dikeluarkan untuk membagi data, mengelola thread, dan menggabungkan hasil bisa melebihi manfaat paralelisasi.

Gunakan parallel stream jika memenuhi kriteria berikut:

* __Data Set Besar:__ Koleksi data yang Anda proses harus cukup besar untuk membenarkan overhead dari paralelisasi.

* __Operasi yang Intensif:__ Operasi yang Anda lakukan (seperti `map`, `filter`, `reduce`) harus memakan waktu komputasi yang signifikan. Jika operasi terlalu sederhana (misalnya, hanya penambahan), stream serial mungkin lebih cepat.

* __Struktur Data Efisien:__ Struktur data sumber sebaiknya mudah untuk dibagi (seperti `ArrayList` atau array). `LinkedList` kurang cocok karena sulit dibagi secara efisien.

* __Operasi Tidak Memiliki State:__ Hindari operasi yang mengubah state bersama di luar stream (hindari side effects) karena dapat menyebabkan masalah __keamanan thread (thread-safety)__ dan hasil yang tidak terduga.

## ⚠️ Peringatan Penting (Thread-Safety)

Karena parallel stream melibatkan banyak thread yang beroperasi secara simultan, Anda harus berhati-hati terhadap __race conditions__ jika Anda mencoba memodifikasi sumber daya eksternal (variabel, field objek, atau koleksi) dari dalam operasi stream.

__Contoh Bahaya (Jangan lakukan ini):__

```java
List<Integer> result = new ArrayList<>();
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

numbers.parallelStream()
       .map(n -> n * 2)
       .forEach(result::add); // ❌ BERBAHAYA: result (ArrayList) tidak thread-safe!
```

Dalam kasus di atas, menggunakan `collect()` adalah cara yang aman dan idiomatik untuk mengumpulkan hasil:

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> result = numbers.parallelStream()
                               .map(n -> n * 2)
                               .collect(Collectors.toList()); // ✅ AMAN
```