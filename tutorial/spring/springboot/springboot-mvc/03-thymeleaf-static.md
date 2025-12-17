---
sidebar_position: 4
title: 'Thymeleaf Static Path'
---

Secara default Spring Boot akan mencari resources statis di direktori `src/main/resources/static`. Misalnya kita dapat menambahkan file CSS pada halaman web kita sebelumnya.

### 1️⃣ Tambahkan File CSS

Misalnya kita membuat file `style.css` pada direktori `css` dalama `src/main/resources/static`, sehingga full path file-nya `src/main/resources/static/css/style.css`

```css
.funny {
	font-style: italic;
	color: aquamarine;
}
```

### 2️⃣ Update View

Update file `hello.html` di `src/main/resources/templates/`:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
	<head>
		<title>Demo Spring MVC</title>
		<link rel="stylesheet" th:href="@{/css/style.css}" />
	</head>
	<body>
		<p th:text="'Time is: ' + ${theDate}" class="funny" />
	</body>
</html>
```

### 3️⃣ Jalankan Aplikasi

* Buka terminal di root project.
* Jalankan dengan perintah Maven: `mvn spring-boot:run`.
* Buka browser dan akses http://localhost:8080/hello. 
