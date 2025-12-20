---
sidebar_position: 6
title: 'Data dan Model'
---

![Spring Boot MVC](/img/spring/springboot-mvc4.png)

_image source: https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/mvc.html_

Seperti yang sudah kita bahas pada materi sebelumnya kita sudah menggunakan Model dalam Spring Boot MVC, berikut beberapa poin penting dari Model:

* Model adalah wadah untuk data aplikasi kita.
* Di dalam Controller, kita bisa memasukkan apa saja ke dalam model tersebut, misalnya String, Object, info dari database, dsb.
* Di halaman View Page kita dapat mengakses data dari model.

## 1️⃣ Controller

Membuat Controller untuk menampilkan form dan proses form. Dalam Controller ini kita dapat memodifikasi data dari Model yang dikirim ke Controller. Misal dalam contoh di bawah ini kita mengambil nilai String, terus mengubahnya menjadi uppercase dan mengirim ke view.

```java
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HelloWorldController {

	@RequestMapping("/show-form")
	public String showForm() {
		return "helloworld-form";				
	}
	
	@RequestMapping("/sayHelloVersionTwo")
	public String processForm(HttpServletRequest request, Model model) {
		// mengambil data nilai parameter names
		String name = request.getParameter("names");
		// mengubah data
		String nameUpper = name.toUpperCase();
		// membuat pesan
		String message = "Hallo bro " + nameUpper;
		
		// menambahkan message ke model
		model.addAttribute("message", message);
		
		return "hello";
	}
}
```

## 2️⃣ View

* Halaman form `helloworld-form.html`.

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
	<head>
		<title>Belajar Spring MVC Form</title>
	</head>
	<body>
		<form th:action="@{/sayHelloVersionTwo}" method="get">
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
		<br />
		<br />
		The Message: <span th:text="${message}" />
	</body>
</html>
```

## 3️⃣ Jalankan Aplikasi

* Buka terminal di root project.
* Jalankan dengan perintah Maven: `mvn spring-boot:run`.
* Buka browser dan akses http://localhost:8080/show-form untuk membuka halaman form.

![Spring Boot MVC](/img/spring/springboot-mvc2.png)

* Halaman response.

![Spring Boot MVC](/img/spring/springboot-mvc5.png)

:::info
Source Code: https://github.com/TimposuLabs/belajar-springboot-mvc/tree/main/04-belajar-spring-mvc-data
:::
