---
slug: dynamic-layout-thymeleaf
title: Tutorial membuat Dynamic Templating di Thymeleaf
authors: topekox
tags: [spring, springboot, springmvc]
---

Pada tutorial ini, kita akan membuat **Dynamic Layout** menggunakan Spring Boot MVC dan Thymeleaf. Teknik ini memungkinkan kita memiliki satu kerangka (layout) utama (seperti Header, Footer, Sidebar dll.) dan hanya mengganti bagian kontennya saja untuk setiap halaman berbeda.

<!--truncate-->

Contohnya kita memiliki struktur elemen HTML, terdiri dari:

* Header.
* Navigasi (Beranda, Layanan dan Kontak).
* Content.
* Footer.

Nantinya elemen Content akan berganti-ganti untuk setiap halaman yang berbeda. 

![Dynamic Layout](/img/spring/springboot-mvc35.png)

Kita akan menggunakan fitur **Layout Dialect** atau **Fragment Expressions**.

## 1️⃣ Persiapan Dependensi

Pastikan dependensi berikut ada di `pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

## 2️⃣ Membuat Fragment (Komponen Reusable)

Buat file bernama `fragments.html` di dalam folder `src/main/resources/templates/`. File ini berisi potongan kode yang akan digunakan berulang kali.

```html
<!-- Membuat Fragment (Komponen yang bisa di Reusable) -->
<!-- src/main/resources/templates/fragments.html -->
<!DOCTYPE html>
<html lang="id" xmlns:th="http://www.thymeleaf.org">
<head th:fragment="header_common">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Dynamic Layout</title>
   	<link rel="stylesheet" th:href="@{style.css}"/>
</head>
<body>

    <header th:fragment="header">
        <h1 style="margin:0;">MyWebsite</h1>
    </header>

    <div class="container">
        <nav th:fragment="navbar">
            <h3>Navigasi</h3>
            <ul>
                <li><a th:href="@{/}">Beranda</a></li>
                <li><a th:href="@{/service}">Layanan</a></li>
                <li><a th:href="@{/contact}">Kontak</a></li>
            </ul>
        </nav>

        <main>
            <h2>Konten Utama</h2>
            <p>Selamat datang! di Website Kami.</p>
        </main>
        
    </div>

    <footer th:fragment="copyright">
        <p>&copy; 2026 Hak Cipta MyWebsite.</p>
    </footer>

</body>
</html>
```

## 3️⃣ Membuat Layout Utama (Parent Template)

Buat file `layout.html`. Ini adalah kerangka besar aplikasi kita. Kita menggunakan `th:replace` untuk mengambil konten dinamis dari halaman child.

```html
<!-- Layout Utama (Parent Template) -->
<!-- src/main/resources/templates/layout.html -->
<!doctype html>
<html xmlns:th="http://www.thymeleaf.org">

<head th:replace="~{fragments :: header_common}">
</head>

<body>

	<!-- header di ambil dari fragment -->
	<div th:replace="~{fragments :: header}"></div>

	<div class="container">
		
		<!-- navbar di ambil dari fragment -->
		<div th:replace="~{fragments :: navbar}"></div>

		<!-- Area Konten Dinamis -->
		<main th:insert="~{__${content}__}"></main>

	</div>	

	<!-- Footer diambil dari fragment -->
	<div th:replace="~{fragments :: copyright}"></div>

</body>
</html>
```

## 4️⃣ Membuat Halaman Konten (Child Template)

Halaman ini hanya berisi konten spesifik.

* `home.html`:

```html
<!-- src/main/resources/templates/home.html -->
<div th:fragment="home_content">
    <h2>Beranda</h2>
    <p>Selamat datang! di Website Kami.</p>
</div>
```

* `service.html`:

```html
<!-- src/main/resources/templates/service.html -->
<div th:fragment="service_content">
    <h2>Service</h2>
    <p>Layanan Unggulan Kami:</p>
	<ol>
	    <li>Transformasi Digital & Automasi.</li>
	    <li>Konsultasi Strategi Bisnis Modern.</li>
	    <li>Pengembangan Ekosistem Digital.</li>
	</ol>
</div>
```

* `contact.html`:

```html
<div th:fragment="contact_content">
    <h2>Contact</h2>
    <p>Hubungi Kami di email perusahaan@email.com.</p>
</div>
```

## 5️⃣ Controller (Menghubungkan Semuanya)

Di Spring Boot Controller, kita memanggil `layout` sebagai view utama, lalu mengirimkan nama fragment konten sebagai variabel.

```java
@Controller
public class DynamicLayoutController {

	@GetMapping("/")
	public String home(Model model) {
		model.addAttribute("content", "home :: home_content");
		return "layout";
	}
	
	@GetMapping("/service")
	public String service(Model model) {
		model.addAttribute("content", "service :: service_content");
		return "layout";
	}
	
	@GetMapping("/contact")
	public String contact(Model model) {
		model.addAttribute("content", "contact :: contact_content");
		return "layout";
	}
}
```
---

## 6️⃣ BONUS: Setup CSS Navigasi

Untuk membuat menu navigasi menjadi "aktif" (misalnya berubah warna atau tebal) secara dinamis di Thymeleaf, kita perlu membandingkan **URL halaman saat ini dengan URL menu**.

###  1. Tambahkan CSS untuk Class Aktif

Pertama, pastikan kita memiliki class CSS untuk menandai menu yang sedang aktif.

Contoh: 

```css
/* style.css */
.nav-link.active {
    background-color: #3498db;
    color: white;
	transition: 0.3s;
}
```

### 2. Update Fragment Navbar (`fragments.html`)

Pada Spring Boot 3 ke atas ⬆️, kita harus mengirimkan nama halaman aktif dari **Controller**.

* Di **Controller**:

```java
@GetMapping("/")
public String home(Model model) {
    model.addAttribute("page", "home"); // Kirim identitas halaman
    model.addAttribute("content", "home :: home_content");
    return "layout";
}

@GetMapping("/service")
public String service(Model model) {
    model.addAttribute("page", "service"); // Kirim identitas halaman
    model.addAttribute("content", "service :: service_content");
    return "layout";
}

@GetMapping("/contact")
public String contact(Model model) {
    model.addAttribute("page", "contact"); // Kirim identitas halaman
    model.addAttribute("content", "contact :: contact_content");
    return "layout";
}
```

* **Di Navbar (`fragments.html`)**:

```html
<ul>
    <li><a th:href="@{/}" 
            th:classappend="${page == 'home'} ? 'active' : ''">Beranda</a></li>
    <li><a th:href="@{/service}"
            th:classappend="${page == 'service'} ? 'active' : ''">Layanan</a></li>
    <li><a th:href="@{/contact}"
            th:classappend="${page == 'contact'} ? 'active' : ''" >Kontak</a></li>
</ul>
```

![Dynamic Layout](/img/spring/springboot-mvc35.png)

![Dynamic Layout](/img/spring/springboot-mvc37.png)

![Dynamic Layout](/img/spring/springboot-mvc36.png)


## 🤑 Keuntungan Metode Ini

1. **DRY (Don't Repeat Yourself)**: Kita tidak perlu menulis ulang kode Navbar atau Footer di setiap file HTML.
2. **Pemeliharaan Mudah:** Jika ingin mengubah desain menu, kita cukup mengedit satu file `fragments.html`.
3. **Clean Code**: File HTML kita tetap rapi karena dipisah berdasarkan fungsinya

:::info
**Source Code**: https://github.com/TimposuLabs/tutorial-spring-from-blog/tree/main/springboot-mvc-dynamic-layout
:::
