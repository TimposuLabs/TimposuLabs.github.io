---
sidebar_position: 14
title: 'Validation Required'
---

Validation Required (Validasi Wajib) merujuk pada rules yang memastikan bahwa suatu kolom input atau properti tidak boleh dibiarkan kosong oleh pengguna.

#### 3 Anotasi yang sering digunakan:

**1. `@NotNull`**: Anotasi ini hanya mengecek apakah nilai objek tersebut adalah `null`.
    * __Gunakan untuk__: Tipe data objek seperti `Integer`, `Double`, `Date`, atau objek custom.
    * __Kelemahan__: Jika digunakan pada `String`, nilai kosong (`""`) atau spasi (`" "`) akan tetap dianggap valid karena secara teknis bukan `null`.

**2. `@NotEmpty`**: Anotasi ini memastikan nilai tidak `null` dan panjangnya (length/size) lebih dari nol.
    * __Gunakan untuk__: `String`, `List`, `Map`, atau `Array`.
    * __Kelemahan__: Pada `String`, input yang hanya berisi spasi (`" "`) masih dianggap valid.

**3. `@NotBlank`**: (Paling Direkomendasikan untuk Text) Anotasi ini adalah yang paling ketat dan paling sering digunakan untuk Text Field. Memastikan nilai tidak `null`, panjangnya bukan nol, dan bukan berisi spasi saja.
    * __Gunakan untuk__: `String` (seperti nama, alamat, username).
    * __Contoh__: Input `" "` akan dianggap **TIDAK VALID** oleh `@NotBlank`.

Contoh:

```java
@NotBlank(message = "Is Required")
private String firstName;

@NotNull(message = "Is Required")
@Size(min = 1, message = "Min 1 char")
private String lastName;
```

### 1️⃣ Membuat Class Object

* Membuat Class Model POJO `Person.java`, dan menambahkan anotation validation pada field-nya:

```java
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class Person {
	
	@NotBlank(message = "Is Required")
	private String firstName;
	
	@NotNull(message = "Is Required")
	@Size(min = 1, message = "Min 1 char")
	private String lastName;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
}
```

* Class model di atas akan di mapping dan properties-nya akan di-binding ke dalam element HTML.


### 2️⃣ Membuat Controller

* Membuat Controller `PersonController.java`:

```java
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.timposulabs.model.Person;

import jakarta.validation.Valid;

@Controller
public class PersonController {

	@GetMapping("/")
	public String showForm(Model model) {
		model.addAttribute("person", new Person());
		return "person-form";
	}
	
	@PostMapping("/process")
	public String processForm(
			@Valid @ModelAttribute("person") Person person,
			BindingResult bindingResult) {
		
		if (bindingResult.hasErrors()) {
			return "person-form";
		} else {
			return "person-confirm";
		}
	}
}
```

* `@Valid`: Memberitahu Spring: "Tolong validasi objek person ini berdasarkan aturan yang saya tulis di kelas Person sebelum menjalankan isi method ini."
* `@ModelAttribute("person")`: Mengambil data dari form HTML dan memasukkannya (binding) ke objek Java person.
* `BindingResult bindingResult`:
	* **Aturan Penting**: Parameter ini harus diletakkan tepat setelah objek yang divalidasi (`Person`).
	* **`bindingResult.hasErrors()`**: Jika data yang diinput user melanggar aturan (misal: nama dikosongkan padahal ada `@NotBlank`), maka method ini akan bernilai `true`.
	* **Alur Error**: Jika ada error, user dikembalikan ke file `person-form.html` agar bisa melihat pesan kesalahan dan memperbaiki inputnya.
	* **Alur Sukses**: Jika data valid, user diarahkan ke `person-confirm.html`.

### 3️⃣ Membuat View

1. View form `person-form.html`.

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
	<head>
		<title>Belajar Spring MVC</title>
		<style>
			.error {color: red;}
		</style>
	</head>
	<body>
		<h3>Person Data</h3>
		<form th:action="@{/process}" th:object="${person}" method="post">
			First Name (*): <input type="text" th:field="*{firstName}" />
			
			<span th:if="${#fields.hasErrors('firstName')}" 
				  th:errors="*{firstName}"
				  class="error"></span>
			<br />
			<br />
			Last Name (*): <input type="text" th:field="*{lastName}" />
			
			<span th:if="${#fields.hasErrors('lastName')}" 
				  th:errors="*{lastName}"
				  class="error"></span>
			<br />
			<br />
			<input type="submit" value="Submit" />
		</form>
	</body>
</html>
```

* `${#fields.hasErrors('firstName')}`: Fungsi pembantu (utility) dari Thymeleaf untuk mengecek apakah ada kesalahan validasi pada kolom `firstName` setelah form dikirim.
* `th:errors="*{firstName}"`: Jika ada error, atribut ini akan otomatis mengambil pesan kesalahan (misalnya dari pesan kustom di Java seperti "Nama tidak boleh kosong") dan menampilkannya di dalam tag `<span>`.

![Spring Boot MVC](/img/spring/springboot-mvc17.png)

2. View `person-confirm.html`.

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
	<head>
		<title>Belajar Spring MVC</title>
	</head>
	<body>
		<h3>Person Confirmation</h3>
		The person is: <span th:text="${person.firstName} + ' ' + ${person.lastName}"></span>
	</body>
</html>
```

:::info
Source Code: https://github.com/TimposuLabs/belajar-springboot-mvc/tree/main/11-belajar-spring-mvc-validation
:::
