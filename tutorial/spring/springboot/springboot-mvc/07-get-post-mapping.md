---
sidebar_position: 8
title: 'GetMapping & PostMapping'
---

Dalam Spring Boot MVC, `@GetMapping` dan `@PostMapping` adalah anotasi khusus yang digunakan untuk menangani permintaan HTTP ke endpoint tertentu. Keduanya merupakan bentuk singkat (shortcut) dari anotasi `@RequestMapping`. 

* Menggunakan `@RequestMapping` untuk handle request GET method HTTP Request.

```java
@RequestMapping(path="/process", method=RequestMethod.GET)
public String process(...) {
...
}
```

## Method HTTP yang sering digunakan

Selain `@GetMapping` dan `@PostMapping` terdapat juga method HTTP lain yang sering digunakan:

|Metode HTTP	| Anotasi Spring Boot	| Operasi CRUD	| Kegunaan Utama |
| --- | --- | --- | --- |
| **GET**	| `@GetMapping`	| Read (Membaca)	| Mengambil data dari server (misal: daftar user atau detail produk). |
| **POST**	| `@PostMapping`	| Create (Membuat) |	Mengirim data baru ke server untuk disimpan (misal: registrasi user baru). |
| **PUT**	| `@PutMapping`	| Update (Mengganti)	| Memperbarui data secara keseluruhan atau mengganti resource yang ada. |
| **PATCH** |	`@PatchMapping`	| Update (Parsial)	| Memperbarui data secara spesifik/sebagian saja (misal: hanya mengubah email). |
| **DELETE** |	`@DeleteMapping`	| Delete (Menghapus) |	Menghapus data atau sumber daya tertentu dari server. |

## Contoh `@GetMapping` dan `@PostMapping`

### Controller

```java
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HelloWorldController {

	@GetMapping("/show-form")
	public String showForm() {
		return "helloworld-form";				
	}
	
	@PostMapping("/sayHello")
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

* Form page `helloworld-form.html` menggunakan method `POST`.

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
	<head>
		<title>Belajar Spring MVC Form</title>
	</head>
	<body>
		<form th:action="@{/sayHello}" method="POST">
			<input type="text" name="names" placeholder="Insert your name" />
			<input type="submit" />
		</form>
	</body>
</html>
```

![Spring Boot MVC](/img/spring/springboot-mvc6.png)

* Confirm page `hello.html`.

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

![Spring Boot MVC](/img/spring/springboot-mvc8.png)

:::info
Source Code: https://github.com/TimposuLabs/belajar-springboot-mvc/tree/main/06-belajar-spring-mvc-getmapping-postmapping
:::
