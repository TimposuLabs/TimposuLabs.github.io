---
sidebar_position: 16
title: 'Validation Number Range'
---

Validation Number Range digunakan untuk membatasi nilai numerik (angka) agar berada dalam rentang tertentu. Validasi ini memastikan data seperti umur, harga, atau jumlah stok tidak bernilai tidak masuk akal (seperti umur negatif).

### 😎 Anotasi Utama untuk Range

Terdapat dua pasang anotasi yang paling sering digunakan dalam kelas Model (POJO):

* `@Min(value)`: Menetapkan nilai minimum yang diperbolehkan.
	* Contoh: `@Min(1)` berarti angka harus 1 atau lebih besar.
* `@Max(value)`: Menetapkan nilai maksimum yang diperbolehkan.
	* Contoh: `@Max(100)` berarti angka tidak boleh lebih dari 100.
* `@Range(min, max)`: (Dari Hibernate Validator) Anotasi praktis yang menggabungkan batas bawah dan atas sekaligus.
	* Contoh: `@Range(min=1, max=10)` berarti angka harus di antara 1 sampai 10

Contoh:

```java
@Min(value = 1, message = "must greater than or equal to 1")
@Max(value = 60, message = "must less than or equal to 60")
private int age;
```

### 1️⃣ Membuat Class Object

* Membuat Class Model POJO `Person.java`, dan menambahkan anotation validation pada field-nya:

```java
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class Person {
	
	@NotBlank(message = "Is Required")
	private String firstName;
	
	@NotNull(message = "Is Required")
	@Size(min = 1, message = "Min 1 char")
	private String lastName;
	
	@Min(value = 1, message = "must greater than or equal to 1")
	@Max(value = 60, message = "must less than or equal to 60")
	private int age;

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

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
}
```

* Class model di atas akan di mapping dan properties-nya akan di-binding ke dalam element HTML.

:::tip
**Disarankan** Menggunakan Tipe Objek `Integer` daripada tipe primitif `int` saat melakukan validasi range. 

**Alasannya**:
Jika menggunakan `int`, nilai defaultnya adalah 0. Jika user mengosongkan form, angka 0 akan terkirim dan mungkin lolos validasi jika batas bawah Anda adalah 0.
Jika menggunakan `Integer`, nilainya bisa `null`. Anda bisa menggunakan `@NotNull` untuk memastikan field tidak kosong sebelum mengecek range-nya.
:::


### 2️⃣ Membuat Controller

* Membuat Controller `PersonController.java`:

```java
import java.beans.PropertyEditorSupport;

import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.timposulabs.model.Person;

import jakarta.validation.Valid;

@Controller
public class PersonController {
	
	// menambahkan initbinder, method ini akan selalu dieksekusi sebelum controller dipanggil
	// method ini akan convert trim input string dan menghapus setiap spasi / string kosong 
	@InitBinder
	public void initBinder(WebDataBinder dataBinder) {
		StringTrimmerEditor trimmerEditor = new StringTrimmerEditor(true);
		dataBinder.registerCustomEditor(String.class, trimmerEditor);
	}
	
	// initbinder mengubah string menjadi uppercase
	@InitBinder
	public void initBinderUpper(WebDataBinder dataBinder) {
		dataBinder.registerCustomEditor(String.class, new PropertyEditorSupport() {
			@Override
			public void setAsText(String text) throws IllegalArgumentException {
				setValue(text != null ? text.toUpperCase() : null);
			}
		});
	}

	@GetMapping("/")
	public String showForm(Model model) {
		model.addAttribute("person", new Person());
		return "person-form";
	}
	
	@PostMapping("/process")
	public String processForm(
			@Valid @ModelAttribute("person") Person person,
			BindingResult bindingResult) {
		
		System.out.println("Lastname: " + person.getLastName());
		
		if (bindingResult.hasErrors()) {
			return "person-form";
		} else {
			return "person-confirm";
		}
	}
}
```

#### Penjelasan:

Method `@InitBinder` adalah mekanisme **pre-processing** yang memanipulasi data String dari form sebelum data tersebut masuk ke dalam objek `Person`.

**1. InitBinder Pertama: Trimming (Pembersihan Spasi)**

```java
@InitBinder
public void initBinder(WebDataBinder dataBinder) {
    StringTrimmerEditor trimmerEditor = new StringTrimmerEditor(true);
    dataBinder.registerCustomEditor(String.class, trimmerEditor);
}
```

	* **Fungsi**: Menghapus spasi di awal dan di akhir input teks secara otomatis.
	* **`StringTrimmerEditor(true)`**: Parameter true berarti jika pengguna hanya menginput spasi (misal: `" "`), maka Spring akan mengubahnya menjadi `null`.
	* **Kegunaan**: Sangat penting jika Anda menggunakan validasi `@NotNull` atau `@NotBlank`, agar input yang hanya berisi spasi tetap dianggap kosong dan memicu pesan error.

**2. InitBinder Kedua: Uppercase (Konversi Huruf Kapital)**

```java
@InitBinder
public void initBinderUpper(WebDataBinder dataBinder) {
    dataBinder.registerCustomEditor(String.class, new PropertyEditorSupport() {
        @Override
        public void setAsText(String text) throws IllegalArgumentException {
            setValue(text != null ? text.toUpperCase() : null);
        }
    });
}
```

	* **Fungsi**: Mengubah semua input teks yang masuk menjadi HURUF KAPITAL.
	* **`PropertyEditorSupport`**: Digunakan untuk membuat aturan konversi kustom.
	* **`setAsText`**: Method ini mencegat teks yang diketik user, lalu `text.toUpperCase()` mengubahnya menjadi kapital sebelum disimpan ke dalam variabel objek Java melalui `setValue()`.

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
			Age : <input type="text" th:field="*{age}" />
			<span th:if="${#fields.hasErrors('age')}" 
				  th:errors="*{age}"
				  class="error"></span>
			<br />
			<br />
			<input type="submit" value="Submit" />
		</form>
	</body>
</html>
```

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
		<br />
		<br />
		Your age : <span th:text="${person.age}"></span>
	</body>
</html>
```

![Spring Boot MVC](/img/spring/springboot-mvc20.png)

![Spring Boot MVC](/img/spring/springboot-mvc21.png)

:::info
Source Code: https://github.com/TimposuLabs/belajar-springboot-mvc/tree/main/13-belajar-spring-mvc-validate-number
:::
