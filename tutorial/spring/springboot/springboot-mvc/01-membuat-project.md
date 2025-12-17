---
sidebar_position: 2
title: 'Membuat Project'
---

Untuk membuat proyek Spring Boot MVC, cara termudah adalah menggunakan Spring Initializr https://start.spring.io/ secara online atau melalui IDE (seperti IntelliJ/Eclipse) untuk menghasilkan struktur dasar dengan dependensi Spring Web.

## 1️⃣ Inisialisasi Proyek (Melalui Spring Initializr)

* Kunjungi https://start.spring.io/.
* Pilih:
    * Project: Maven atau Gradle.
    * Language: Java.
    * Spring Boot: Versi terbaru.
    * Dependencies: Pilih Spring Web (ini sudah mencakup Spring MVC) dan Template Engine yang sering digunakan Thymeleaf.
* Klik: Tombol Generate untuk mengunduh file ZIP proyek. 

## 2️⃣ Import Project ke IDE

Import project ke **IntelliJ IDEA / Eclipse / NetBeans / VS Code**: Buka IDE Anda, lalu impor proyek yang baru diunduh sebagai proyek Maven atau Gradle yang sudah ada.

## 3️⃣ Tambahkan Dependency (Jika Belum Terpilih di Initializr)

* Jika Anda belum memilih Spring Web, tambahkan dependency ini di file `pom.xml` (untuk Maven):

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

* Tambahkan juga templating engine jika perlu, misalnya Thymeleaf:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

## 4️⃣ Buat Controller

* Buat class Java contoh `HomeController` di `src/main/java/...`
* Gunakan anotasi `@Controller` dan `@GetMapping` untuk memetakan URL ke method:

```java
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/") // Handle request ke root URL
    public String home(Model model) {
        model.addAttribute("message", "Halo dari Spring Boot MVC!");
        return "home"; // Akan mencari file home.html (atau home.jsp)
    }
}

```

## 5️⃣ Buat View (Contoh: Thymeleaf)

Buat file `home.html` di `src/main/resources/templates/` (untuk Thymeleaf):

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Spring Boot MVC</title>
</head>
<body>
    <h1 th:text="${message}"></h1>
</body>
</html>
```

## 6️⃣ Jalankan Aplikasi

* Buka terminal di root project.
* Jalankan dengan perintah Maven: `mvn spring-boot:run`.
* Buka browser dan akses http://localhost:8080/. 

Dengan langkah-langkah ini, kita sudah memiliki project Spring Boot MVC yang berfungsi untuk menampilkan halaman web sederhana.