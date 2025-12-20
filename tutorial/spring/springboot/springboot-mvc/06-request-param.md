---
sidebar_position: 7
title: 'Request Params'
---

Dalam Spring Boot, **Request Parameters** digunakan untuk mengambil data dari query string di URL (biasanya setelah tanda tanya `?`), dengan menggunakan annotation `@RequestParam`.

Contoh kasus:

* Kita akan mengirim data `name` dari form melalui parameter `/sayHello?name=xxx` di teruskan ke Controller.
* Membaca data `name` dan melakukan convert menjadi uppercase.
* Mengirim data hasil uppercase ke model.

### Controller

Membuat handle terhadap `/show-form` untuk menampilkan form dan handle confirm page di `/sayHello`.

```java
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HelloWorldController {

	@RequestMapping("/show-form")
	public String showForm() {
		return "helloworld-form";				
	}
	
	@RequestMapping("/sayHello")
	public String processForm(@RequestParam("names") String names, Model model) {
		
		// mengubah data
		String nameUpper = names.toUpperCase();
		// membuat pesan
		String message = "Hallo mas bro " + nameUpper;
		
		// menambahkan message ke model
		model.addAttribute("message", message);
		
		return "hello";
	}
}
```

### View

* Form page `helloworld-form.html`

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

![Spring Boot MVC](/img/spring/springboot-mvc6.png)

* Confirm page `hello.html`

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

![Spring Boot MVC](/img/spring/springboot-mvc7.png)


:::info
Source Code: https://github.com/TimposuLabs/belajar-springboot-mvc/tree/main/05-belajar-spring-mvc-request-param
:::
