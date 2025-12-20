---
sidebar_position: 1
---

# Spring Boot MVC

**Spring Boot MVC** adalah kombinasi antara **Spring Boot** (yang menyederhanakan konfigurasi dan pengembangan aplikasi Spring secara umum) dengan **Spring MVC** (framework web bawaan Spring untuk membangun aplikasi berbasis pola Model-View-Controller) untuk membuat aplikasi web Java yang siap produksi dengan cepat, tanpa konfigurasi manual yang rumit, karena Spring Boot sudah menyediakan *autoconfiguration* dan server tertanam/embedded (seperti Tomcat). Secara singkat, Spring MVC adalah cara membangun aplikasi web di dalam Spring, sementara Spring Boot adalah cara yang lebih mudah untuk membangun aplikasi Spring (termasuk yang menggunakan Spring MVC).

## Spring MVC

* **Apa itu**: Sebuah modul dalam Spring Framework untuk membangun aplikasi web dengan pola arsitektur Model-View-Controller (MVC).
* **Fungsi**: Memisahkan logika aplikasi menjadi tiga bagian: Model (data), View (tampilan), dan Controller (pengatur alur permintaan/respons HTTP).
* **Inti**: Menggunakan `DispatcherServlet` sebagai front controller untuk mengarahkan permintaan ke Controller yang tepat. 

## Spring Boot

* **Apa itu**: Sebuah proyek yang dibangun di atas Spring untuk mempercepat pengembangan aplikasi Spring.
* **Fungsi**: Menghilangkan konfigurasi boilerplate (pengaturan otomatis), menyediakan embedded server (Tomcat, Jetty), dan menyederhanakan manajemen dependensi.
* **Kelebihan**: Pengembang bisa langsung fokus pada logika bisnis tanpa pusing konfigurasi server atau XML/Java Config yang panjang. 

## Hubungan

* Spring MVC adalah bagian dari Spring, sementara Spring Boot adalah cara untuk membangun aplikasi Spring (termasuk yang memakai Spring MVC) dengan lebih mudah.
* Saat Anda membangun aplikasi web dengan Spring Boot, Anda tetap menggunakan Spring MVC untuk logika web, tetapi Spring Boot secara otomatis mengonfigurasinya untuk Anda. 

## Kapan Menggunakan yang Mana?

* **Spring Boot + Spring MVC**: Paling umum digunakan untuk project baru karena pengembangan cepat dan mudah di-deploy (siap produksi).
* **Spring MVC (tanpa Spring Boot)**: Lebih cocok untuk skenario yang membutuhkan kontrol konfigurasi sangat spesifik atau project legacy/jadul yang tidak menggunakan Spring Boot. 
