---
sidebar_position: 5
title: 'Form dan Model'
---

Dalam Spring Boot MVC, Form digunakan untuk menangkap input pengguna, sedangkan Model (atau Form Backing Object) berfungsi sebagai wadah data yang menghubungkan tampilan HTML dengan logic di Java.

![Spring Boot MVC](/img/spring/springboot-mvc4.png)

_image source: https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/mvc.html_

## 1️⃣ Membuat Controller

Membuat Controller untuk menampilkan form dan proses form.

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HelloWorldController {

	// method untuk menampilkan form
	@RequestMapping("/show-form")
	public String showForm() {
		return "helloworld-form";				
	}
	
	// method untuk menampilkan response dari input user dari form
	@RequestMapping("/sayHello")
	public String processForm() {
		return "hello";
	}
}
```

## 2️⃣ Membuat View

* Halaman form `helloworld-form.html`.

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
	<head>
		<title>Belajar Spring MVC Form</title>
	</head>
	<body>
		<form th:action="@{/sayHello}" method="get">
			<input type="text" name="names" placeholder="Insert your name" />
			<input type="submit" />
		</form>
	</body>
</html>
```

* Halaman response `hello.html`.

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
	<head>
		<title>Belajar Spring MVC Form</title>
	</head>
	<body>
		Hello World!!!
		<br />
		Name: <span th:text="${param.names}" />
	</body>
</html>
```

## 3️⃣ Jalankan Aplikasi

* Buka terminal di root project.
* Jalankan dengan perintah Maven: `mvn spring-boot:run`.
* Buka browser dan akses http://localhost:8080/show-form untuk membuka halaman form.

![Spring Boot MVC](/img/spring/springboot-mvc2.png)

* Halaman response.

![Spring Boot MVC](/img/spring/springboot-mvc3.png)
