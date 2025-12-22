---
sidebar_position: 12
title: 'Data Binding Check Box'
---

Data Binding pada Spring Boot MVC adalah proses mapping/pemetaan otomatis antara data yang dimasukkan pengguna dalam elemen form HTML ke dalam properti sebuah object Java (biasanya disebut **Form Backing Object** atau **Command Object**).

Komponen utama:

* **Model/POJO**: Sebuah kelas Java (misal Person) dengan atribut yang namanya harus sesuai dengan atribut name pada input HTML atau atribut `th:field` di Thymeleaf.
* **View (Thymeleaf/JSP)**: Menggunakan atribut khusus untuk menghubungkan field dengan objek model.
* **Controller**: Menggunakan anotasi `@ModelAttribute` untuk menangkap objek yang telah terisi data dari form. 

### 1️⃣ Membuat Object Java

* Membuat Class Model POJO `Person.java`

```java
import java.util.List;

public class Person {
	
	private String firstName;
	
	private String lastName;
	
	private String city;
	
	private String gender;
	
	private List<String> skills;
	
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

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public List<String> getSkills() {
		return skills;
	}

	public void setSkills(List<String> skills) {
		this.skills = skills;
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
	List<String> gender = List.of("Male", "Female", "Non Binary");
	List<String> skills = List.of("Java", "Go", "Python", "Rust", "Javascript", "PHP");

	@GetMapping("/form")
	public String showForm(Model model) {
		Person thePerson = new Person();
		model.addAttribute("person", thePerson);
		model.addAttribute("city", city);
		model.addAttribute("gender", gender);
		model.addAttribute("skills", skills);
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
			Gender: 
			<!-- Hard Code
			<input type="radio" th:field="*{gender}" th:value="male">Male</input>
			<input type="radio" th:field="*{gender}" th:value="female">Female</input>
			<input type="radio" th:field="*{gender}" th:value="nonbinary">Non Binary</input>
			-->
			<input type="radio" th:field="*{gender}" th:each="g : ${gender}" th:value="${g}" th:text="${g}" />
			<br />
			<br />
			Skills:
			<!-- Hard Code
			<input type="checkbox" th:field="*{skills}" th:value="PHP">PHP</input>
			<input type="checkbox" th:field="*{skills}" th:value="Java">Java</input>
			<input type="checkbox" th:field="*{skills}" th:value="Go">Go</input>
			<input type="checkbox" th:field="*{skills}" th:value="Javascript">Javascript</input>
			<input type="checkbox" th:field="*{skills}" th:value="Python">Python</input>
			-->
			<input type="checkbox" th:field="*{skills}" th:each="s : ${skills}" th:value="${s}" th:text="${s}" />
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
* `th:field="*{gender}"`: Data Binding, dalam hal ini data field `gender` dari object `Person`, dan melakukan perulangan elemen datanya melalui `th:each="g : ${gender}" th:value="${g}" th:text="${g}"`.
* `th:field="*{skills}"`: Data Binding, dalam hal ini data field `skills` dari object `Person`, dan melakukan perulangan elemen datanya melalui `th:each="s : ${skills}" th:value="${s}" th:text="${s}"`.

![Spring Boot MVC](/img/spring/springboot-mvc15.png)

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
		<br />
		<br />
		Gender <span th:text="${person.gender}" />
		<br />
		<br />
		Skills: <!--<span th:text="${person.skills}" />-->		
		<br />
		<ul>
			<li th:each="s : ${person.skills}" th:text="${s}" />
		</ul>
	</body>
</html>
```

![Spring Boot MVC](/img/spring/springboot-mvc16.png)

:::info
Source Code: https://github.com/TimposuLabs/belajar-springboot-mvc/tree/main/10-belajar-spring-mvc-form-data-binding-check-box
:::
