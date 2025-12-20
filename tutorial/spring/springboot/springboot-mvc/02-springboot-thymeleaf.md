---
sidebar_position: 3
title: 'Template Engine Thymeleaf'
---

Spring Boot MVC mendukung Thymeleaf sebagai template engine yang populer digunakan untuk menyajikan tampilan (User Interface) pada halaman web Spring MVC. Selain itu Spring Boot mendukung beberapa template engine di antaranya:

* [FreeMarker](https://freemarker.apache.org/docs/)
* [Groovy](https://docs.groovy-lang.org/docs/next/html/documentation/template-engines.html#_the_markuptemplateengine)
* [Thymeleaf](https://www.thymeleaf.org/)
* [Mustache](https://mustache.github.io/)

### 1️⃣ Tambahkan Dependency

* Tambahkan juga templating engine Thymeleaf:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

### 2️⃣ Buat Controller

* Buat class Java contoh `HelloController` di `src/main/java/...`
* Gunakan anotasi `@Controller` dan `@GetMapping` untuk memetakan URL ke method:

```java
import java.time.LocalDateTime;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloController {

	@GetMapping("/hello")
	public String sayHello(Model model) {
		model.addAttribute("theDate", LocalDateTime.now());
		return "hello";
	}
}
```

### 3️⃣ Buat View

Buat file `hello.html` di `src/main/resources/templates/`:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
	<head>
		<title>Demo Spring MVC</title>
	</head>
	<body>
		<p th:text="'Time is: ' + ${theDate}"/>
	</body>
</html>
```

### 4️⃣ Jalankan Aplikasi

* Buka terminal di root project.
* Jalankan dengan perintah Maven: `mvn spring-boot:run`.
* Buka browser dan akses http://localhost:8080/hello. 

![Spring Boot MVC](/img/spring/springboot-mvc1.png)

Dengan langkah-langkah ini, kita sudah memiliki project Spring Boot MVC dengan template engine Thymeleaf.