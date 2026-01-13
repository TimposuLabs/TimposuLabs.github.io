---
slug: springboot-mvc-crud
title: Tutorial Spring Boot MVC CRUD
authors: topekox
tags: [spring, springboot, springmvc, mysql]
---

Pada artikel kali ini kita akan membangun aplikasi CRUD (Create, Read, Update, Delete) menggunakan arsitektur **Spring Boot MVC** dengan menggunakan database MySQL.

<img src="/img/general/Spring-boot-diagram1.svg"/>

<!-- truncate -->

## 1️⃣ Arsitektur Spring MVC

Spring MVC memisahkan aplikasi menjadi tiga komponen utama untuk mempermudah pengelolaan:

* **Model**: Representasi data (Entity) dan logika bisnis.
* **View**: Antarmuka pengguna (User Interface), disini kita menggunakan template engine Thymeleaf untuk merender HTML di sisi server.
* **Controller**: Pemroses permintaan (HTTP Request) yang menghubungkan Model dan View.

## 2️⃣ Persiapan

Gunakan [Spring Initializr](https://start.spring.io/) untuk membuat proyek dengan dependensi berikut:

* **Spring Web**: Untuk membangun web MVC.
* **Spring Data JPA**: Untuk memudahkan operasi database tanpa menulis query SQL manual.
* **MySQL Driver**: Untuk koneksi ke database MySQL.
* **Thymeleaf**: Sebagai template engine untuk tampilan (UI).
* **Spring Boot Dev Tools (Optional)**: Untuk mempermudah proses Development.

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-thymeleaf</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webmvc</artifactId>
    </dependency>

    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-thymeleaf-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-webmvc-test</artifactId>
        <scope>test</scope>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

## 3️⃣ Proses Development (Step-by-Step)

### A. Konfigurasi Database (`application.properties`)

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nama_db
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

### B. Membuat Entity (Model)

Kita akan menggunakan Entity `Person` untuk mapping ke database:

```java
@Table(name = "person")
@Entity
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    public Person() {
    }

    public Person(Long id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
```

### C. Membuat Repository

```java
@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    boolean existsByEmail(String email);
    
    boolean existsByEmailAndIdNot(String email, Long id);

     Page<Person> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
        String firstName, String lastName, String email, Pageable pageable
    );
}
```

### C. Membuat Service

* Interface `PersonService` :

```java
public interface PersonService {
    Page<PersonDTO> getAllPersons(Pageable pageable);
    PersonDTO getPersonById(Long id);
    PersonDTO createPerson(PersonDTO personDTO);
    PersonDTO updatePerson(Long id, PersonDTO personDTO);
    void deletePerson(Long id);
    boolean isEmailUnique(String email, Long id); // handle email unique
    Page<PersonDTO> search(String keyword, Pageable pageable);
}
```

* Implementasi `PersonService`:

```java
@Service
public class PersonServiceImpl implements PersonService {

    PersonRepository personRepository;    

    public PersonServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public Page<PersonDTO> getAllPersons(Pageable pageable) {
        return personRepository.findAll(pageable)
                .map(this::toDTO);
    }

    @Override
    public PersonDTO getPersonById(Long id) {
        return personRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Person not found with id: " + id));
    }

    @Override
    @Transactional
    public PersonDTO createPerson(PersonDTO personDTO) {
        return toDTO(personRepository.save(toEntity(personDTO)));
    }

    @Override
    public PersonDTO updatePerson(Long id, PersonDTO personDTO) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Person not found with id: " + id));
        person.setFirstName(personDTO.getFirstName());
        person.setLastName(personDTO.getLastName());
        person.setEmail(personDTO.getEmail());
        return toDTO(personRepository.save(person));
    }

    @Override
    public void deletePerson(Long id) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Person not found with id: " + id));
        personRepository.delete(person);
    }

    @Override
    public Page<PersonDTO> search(String keyword, Pageable pageable) {
        Page<Person> persons;
        if (keyword != null && !keyword.isBlank()) {
            // Kita kirim keyword yang sama untuk ketiga parameter (firstName, lastName, email)
            persons = personRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                keyword, keyword, keyword, pageable
            );
        } else {
            persons = personRepository.findAll(pageable);
        }
        return persons.map(this::toDTO);
    }

    // handle email unique constraint for validation
    @Override
    public boolean isEmailUnique(String email, Long id) {
        if (id == null) {
            // Mode Create: tidak boleh ada email sama sekali
            return !personRepository.existsByEmail(email);
        } else {
            // Mode Update: tidak boleh ada email yang sama milik ORANG LAIN
            return !personRepository.existsByEmailAndIdNot(email, id);
        }
    }

    // Helper for convert between dto and entity
    private PersonDTO toDTO(Person person) {
        return new PersonDTO(
            person.getId(), 
            person.getFirstName(), 
            person.getLastName(), 
            person.getEmail());
    }

    private Person toEntity(PersonDTO personDTO) {
        return new Person(
            personDTO.getId(),
            personDTO.getFirstName(), 
            personDTO.getLastName(), 
            personDTO.getEmail());
    }
}
```

### D. Membuat Controller

```java
@Controller
@RequestMapping("/person")
public class PersonController {

    private PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/list")
    public String listPerson(
        Model model, @PageableDefault(size = 5) Pageable pageable) {
        Page<PersonDTO> persons = personService.getAllPersons(pageable);
        model.addAttribute("persons", persons);
        return "person/person-list";
    }

    @GetMapping("/form")
    public String formPerson(Model model) {
        model.addAttribute("person", new PersonDTO());
        return "person/person-form";
    }

    @PostMapping("/save")
	public String saveProduct(
            @Valid @ModelAttribute("person") PersonDTO personDTO,
			BindingResult bindingResult) {
          
    
        System.out.println("Data Person: " + personDTO.toString());
        
        // cek validasi anotasi standard
		if (bindingResult.hasErrors()) {
			return "person/person-form";
		}
        
        // cek validasi email unik
		if (!personService.isEmailUnique(personDTO.getEmail(), personDTO.getId())) {
            bindingResult.rejectValue("email", "error.person", "Email already exist!!!"); // custom validation error
        	return "person/person-form";
		}	

		personService.createPerson(personDTO);
		return "redirect:/person/list";
	}

    @GetMapping("/update")
    public String updatePerson(@RequestParam("id") Long id, Model model) {
        PersonDTO personDTO = personService.getPersonById(id);
        model.addAttribute("person", personDTO);
        return "person/person-form";
    }

    @GetMapping("/delete")
    public String deletePerson(@RequestParam("id") Long id) {
        personService.deletePerson(id);
        return "redirect:/person/list";
    }
    
    @GetMapping("/search")
    public String searchPersons(
            Model model,
            @PageableDefault(size = 5, sort = "firstName") Pageable pageable,
            @RequestParam(name = "keyword", required = false) String keyword) {
        
        Page<PersonDTO> personPage = personService.search(keyword, pageable);
        
        model.addAttribute("persons", personPage);
        model.addAttribute("keyword", keyword); // Dikembalikan ke view untuk mengisi kotak input
        return "person/person-list";
    }
}
```

### E. Membuat View (Thymeleaf)

Buat file HTML di dalam folder `src/main/resources/templates`. Disini kita akan menggunakan Bootstrap untuk mempercantik tampilan.

* `person-list.html` :

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<head>
	<title>Person Management System</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
</head>

<body>
	<div class="container">
		<div class="mt-5">
			<h3>Person List</h3>
			<hr />
			<!-- Container Flexbox untuk tombol dan dropdown -->
			<div class="d-flex justify-content-between align-items-center mb-3">

				<!-- Tombol Add Person di sisi Kiri -->
				<a th:href="@{/person/form}" class="btn btn-primary">Add Person</a>

				<!-- Bagian Kanan: Gabungan Search dan Dropdown -->
				<div class="d-flex align-items-center gap-3">

					<!-- Form Search -->
					<form th:action="@{/person/search}" method="get" class="d-flex">
						<div class="input-group input-group-sm">
							<input type="text" name="keyword" class="form-control" placeholder="Search..."
								th:value="${keyword}">
							<button class="btn btn-outline-secondary" type="submit">
								<i class="bi bi-search"></i> Cari
							</button>
						</div>
						<!-- Bawa info size agar tidak reset saat search -->
						<input type="hidden" name="size" th:value="${persons.size}" />
					</form>

					<!-- Form Dropdown size page di sisi Kanan -->
					<form th:action="@{/person/list}" method="get" class="d-flex align-items-center">
						<span class="me-2 text-secondary">Show:</span>
						<select name="size" class="form-select form-select-sm w-auto" onchange="this.form.submit()">
							<option th:value="5" th:selected="${persons.size == 5}">5</option>
							<option th:value="10" th:selected="${persons.size == 10}">10</option>
							<option th:value="20" th:selected="${persons.size == 20}">20</option>
						</select>
						<!-- Reset ke halaman 0 saat ganti size -->
						<input type="hidden" name="page" value="0" />
					</form>
				</div>
			</div>

			<table class="table table-bordered table-striped">
				<thead>
					<tr>
						<th scope="col">ID</th>
						<th scope="col">First Name</th>
						<th scope="col">Last Name</th>
						<th scope="col">Email</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					<tr th:each="person : ${persons}">
						<th scope="row" th:text="${person.id}"></th>
						<td th:text="${person.firstName}"></td>
						<td th:text="${person.lastName}"></td>
						<td th:text="${person.email}"></td>
						<td>
							<a th:href="@{/person/update(id=${person.id})}" class="btn btn-info btn-sm">
								Update
							</a>
							<a th:href="@{/person/delete(id=${person.id})}" class="btn btn-danger btn-sm"
								onclick="if (!(confirm('Are You Sure for Delete?'))) return false">
								Delete
							</a>
						</td>
					</tr>
				</tbody>
			</table>

			<!-- Navigasi Halaman -->
			<nav>
				<ul class="pagination">
					<li class="page-item" th:classappend="${!persons.hasPrevious()} ? 'disabled'">
						<a class="page-link"
							th:href="@{/person/list(page=${persons.number - 1}, size=${persons.size})}">Prev</a>
					</li>
					<li class="page-item" th:each="i : ${#numbers.sequence(0, persons.totalPages - 1)}"
						th:classappend="${persons.number == i} ? 'active'">
						<a class="page-link" th:href="@{/person/list(page=${i}, size=${persons.size})}"
							th:text="${i + 1}"></a>
					</li>
					<li class="page-item" th:classappend="${!persons.hasNext()} ? 'disabled'">
						<a class="page-link"
							th:href="@{/person/list(page=${persons.number + 1}, size=${persons.size})}">Next</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
		crossorigin="anonymous"></script>
</body>

</html>
```

* `person-form.html`:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<head>
	<title>Person Form</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
</head>

<body>
	<div class="container">
		<p class="h4 mb-3 mt-5">Save Person</p>
		<form th:action="@{/person/save}" th:object="${person}" method="post" class="needs-validation">
			<input type="hidden" th:field="*{id}" />

			<div class="mb-3">
				<label class="form-label">First Name</label>
				<input type="text" th:field="*{firstName}"
					th:classappend="${#fields.hasErrors('firstName')} ? 'is-invalid' : ''" class="form-control w-50"
					placeholder="Enter first name" />
				<div th:if="${#fields.hasErrors('firstName')}" th:errors="*{firstName}" class="invalid-feedback"></div>
			</div>

			<div class="mb-3">
				<label class="form-label">Last Name</label>
				<input type="text" th:field="*{lastName}"
					th:classappend="${#fields.hasErrors('lastName')} ? 'is-invalid' : ''" class="form-control w-50"
					placeholder="Enter last name" />
				<div class="invalid-feedback" th:if="${#fields.hasErrors('lastName')}" th:errors="*{lastName}"></div>
			</div>

			<div class="mb-3">
				<label class="form-label">Email Address</label>
				<input type="email" th:field="*{email}"
					th:classappend="${#fields.hasErrors('email')} ? 'is-invalid' : ''" class="form-control w-50"
					placeholder="name@example.com" />
				<div class="invalid-feedback" th:if="${#fields.hasErrors('email')}" th:errors="*{email}"></div>
			</div>

			<hr class="w-50">
			<button type="submit" class="btn btn-primary px-4">
				Save Person
			</button>
			<a th:href="@{/person/list}" class="btn btn-secondary px-4">Cancel</a>
		</form>
	</div>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
		crossorigin="anonymous"></script>
</body>
</html>
```

## 🔥 Testing

* Buka terminal di root project.
* Jalankan dengan perintah Maven: `mvn spring-boot:run`.
* Buka browser dan akses `http://localhost:8080/person/list`.

![Spring MVC CRUD](/img/spring/springboot-mvc39.png)

![Spring MVC CRUD](/img/spring/springboot-mvc38.png)

![Spring MVC CRUD](/img/spring/springboot-mvc40.png)

:::info
Source Code: https://github.com/TimposuLabs/tutorial-spring-from-blog/tree/main/springboot-mvc-crud
:::
