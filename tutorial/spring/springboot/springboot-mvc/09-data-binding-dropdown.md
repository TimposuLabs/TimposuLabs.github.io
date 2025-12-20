---
sidebar_position: 10
title: 'Data Binding Drop Down'
---

Data Binding pada Spring Boot MVC adalah proses mapping/pemetaan otomatis antara data yang dimasukkan pengguna dalam elemen form HTML ke dalam properti sebuah object Java (biasanya disebut **Form Backing Object** atau **Command Object**).

Komponen utama:

* **Model/POJO**: Sebuah kelas Java (misal Person) dengan atribut yang namanya harus sesuai dengan atribut name pada input HTML atau atribut `th:field` di Thymeleaf.
* **View (Thymeleaf/JSP)**: Menggunakan atribut khusus untuk menghubungkan field dengan objek model.
* **Controller**: Menggunakan anotasi `@ModelAttribute` untuk menangkap objek yang telah terisi data dari form. 

### 1️⃣ Membuat Object Java

* Membuat Class Model POJO `Person.java`

```java
public class Person {
	
	private String firstName;
	
	private String lastName;
	
	private String city;
	
	public Person() {
	}

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

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}
}
```

* Class model di atas akan di mapping dan properties-nya akan di-binding ke dalam element HTML.

### 2️⃣ Membuat Controller

* Membuat Controller `PersonController.java`:

```java
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.timposulabs.model.Person;

@Controller
public class PersonController {
	
	List<String> city = List.of("Semarang", "Makassar", "Pekanbaru", "Kupang", "Bengkulu", "Pekanbaru");

	@GetMapping("/form")
	public String showForm(Model model) {
		Person thePerson = new Person();
		model.addAttribute("person", thePerson);
		model.addAttribute("city", city);
		return "person-form";
	}
	
	@PostMapping("/action")
	public String process(@ModelAttribute("person") Person person) {
		return "person-confirm";
	}
}
```

* Pada method `process` kita menggunakan anotasi `@ModelAttribute` untuk menangkap objek `Person` yang telah terisi data dari form. 

## 3️⃣ Membuat View

* View form `person-form.html`.

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
	<head>
		<title>Belajar Spring MVC</title>
	</head>
	<body>
		<h3>Person Data</h3>
		<form th:action="@{/action}" th:object="${person}" method="post">
			First Name: <input type="text" th:field="*{firstName}" />
			<br />
			<br />
			Last Name: <input type="text" th:field="*{lastName}" />
			<br />
			<br />
			City: 
			<select th:field="*{city}">
				<!-- Hard Code
				<option th:value="Makassar">Makassar</option>
				<option th:value="Surabaya">Surabaya</option>
				<option th:value="Mataram">Mataram</option>
				<option th:value="Pekanbaru">Pekanbaru</option>
				-->
				<option th:each="c : ${city}" th:value="${c}" th:text="${c}" />
			</select>
			<br />
			<br />
			<input type="submit" value="Submit" />
		</form>
	</body>
</html>
```

* `th:object="${person}"`: Menghubungkan form ini dengan object Java bernama `person` yang sebelumnya dikirim oleh Controller melalui `model.addAttribute("person", ...)`. Semua input di dalam form ini akan merujuk pada atribut milik object ini.
* `th:field="*{firstName}"`: Data Binding, dalam hal ini data field `firstName` dari object `Person`.
* `th:field="*{city}"`: Data Binding, dalam hal ini data field `city` dari object `Person`, dan melakukan perulangan elemen datanya melalui `<option th:each="c : ${city}" th:value="${c}" th:text="${c}" />`.

![Spring Boot MVC](/img/spring/springboot-mvc11.png)

* View `person-confirm.html`.

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
	<head>
		<title>Belajar Spring MVC</title>
	</head>
	<body>
		<h3>Person Confirmation</h3>
		Hallo <span th:text="${person.firstName} + ' ' + ${person.lastName}" />
		<br />
		<br />
		Your City <span th:text="${person.city}" />
	</body>
</html>
```

![Spring Boot MVC](/img/spring/springboot-mvc12.png)

:::info
Source Code: https://github.com/TimposuLabs/belajar-springboot-mvc/tree/main/08-belajar-spring-mvc-form-data-binding-dropdown
:::
