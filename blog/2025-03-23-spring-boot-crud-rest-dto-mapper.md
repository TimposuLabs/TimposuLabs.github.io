---
slug: spring-boot-crud-rest-dto-mapstruct
title: Spring Boot CRUD REST API Java Record DTO + Mapper dengan Mapstruct
authors: topekox
tags: [springboot, spring, rest, api, mysql]
---

Pada tutorial ini, kita akan membuat aplikasi Spring Boot CRUD (Create, Read, Update, Delete) seperti pada [tutorial sebelumnya](/blog/spring-boot-crud-rest-mysql-java-record-dto). Jika pada tutorial sebelumnya kita melakukan mapping untuk konversi DTO ke Entity atau sebaliknya masih menggunakan cara manual, tutorial kita menggunakan generator mapper [Mapstruct](https://mapstruct.org/).

<!--truncate-->


> __Baca Juga:__ 
> * [Arsitektur Spring Boot - Controller, Service, Repository dan Database](/blog/spring-boot-arsitektur-controller-service-repository-database-flow)
> * [Implementasi Spring Boot CRUD REST API dengan MySQL dan Java Record DTO](/blog/spring-boot-crud-rest-mysql-java-record-dto)

<img src="/img/general/Spring-boot-diagram2.svg"/>

## 🌎 Mapstruct

[Mapstruct](https://mapstruct.org/) adalah Java Annotation Processor yang menghasilkan kode mapping pada waktu kompilasi.  Dengan kata lain mapstruct sebagai generator mapper  yang dapat digunakan untuk mengonversi antar model di program Java. Mapstruct sangat berguna terutama saat berhadapan dengan REST API, Microservices, atau pada layer businness logic yang kompleks. 

### ❓Kenapa menggunakan Mapstruct

* ✅ **Lebih cepat**: Karena mapping terjadi pada waktu kompilasi, tidak ada overhead waktu proses.
* ✅ **Lebih clean**: Menghilangkan resource kode manual (Boilerplate code).
* ✅ **Aman terhadap tipe**: Kompiler memvalidasi mapping, mengurangi runtime errors.

### ⚠️ Cara Tradisional

Sebagian besar programmer Java masih masih menggunakan mapping secara manual atau menggunakan library berbasis reflection yang tidak efisien, yang mengarah kepada:

* 💀 Kode berantakan dan berulang yang susah untuk di-maintain.
* 🐢 Overhead performa karena runtime reflection.
* 🤯 Mapping rawan error yang dapat menyebabkan bug.

Contoh misalnya kita membuat aplikasi Spring Boot berbasis REST API dengan memiliki:

* `Person` sebagai Entity untuk representasi dengan database model.
* `PersonDTO` untuk mentransfer data ke client/frontend.

Tanpa Mapstruct kita mungkin akan membuat class mapper untuk konversi antar model seperti berikut:

```java
public class PersonMapper {

    public static PersonDTO toDto(Person person) {
        return new PersonDTO(
            person.getId(), 
            person.getFirstName(), 
            person.getLastName(), 
            person.getEmail());
    }

    public static Person toEntity(PersonDTO personDTO) {
        return new Person(
            personDTO.id(), 
            personDTO.firstName(), 
            personDTO.lastName(), 
            personDTO.email());
    }
}
```

Kode di atas terlihat berulang-ulang dan verbose.

* 💀 Kita perlu mapping setiap bidang secara manual.
* 😵‍💫 Dengan model yang kompleks, logic mapping menjadi berantakan.
* 🤯 Setiap menambahkan field baru, kita perlu memperbarui mapper, yang rawan kesalahan.

Dan ketika `PersonMapper` digunakan, misalnya pada layer Service sebagai berikut:

```java
public List<PersonDTO> getAll() {
    return personRepository.findAll().stream()
            .map(PersonMapper::toDto)
            .collect(Collectors.toList());
}

public PersonDTO findById(Long id) {
    return personRepository.findById(id)
            .map(PersonMapper::toDto)
            .orElseThrow(() -> new NotFoundException("ID_NOT_FOUND"));
}

public PersonDTO create(PersonDTO personDTO) {
    return PersonMapper.toDto(personRepository.save(PersonMapper.toEntity(personDTO)));
}

public PersonDTO update(Long id, PersonDTO personDTO) {
    Person person = personRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("ID_NOT_FOUND"));
    person.setFirstName(personDTO.firstName());
    person.setLastName(personDTO.lastName());
    person.setEmail(personDTO.email());
    return PersonMapper.toDto(personRepository.save(person));
}

public void delete(Long id) {
    Person person = personRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("ID_NOT_FOUND"));
    personRepository.delete(person);
}
```

🔥Kita akan mengganti mapper manual di atas menggunakan Mapstruct, sehingga dapat diimplementasikan lebih mudah (contohnya pada layer Service).

---

## 🧑‍💻 Tools

Pada tutorial kali ini kita menggunakan:

* ✔️ Java Development Kit (JDK) 21 atau yang terbaru.
* ✔️ Apache Maven (Project Manajemen).
* ✔️ H2 Database (Database Embedded / in-memory database).
* ✔️ IDE (Intellij IDEA, Eclipse, Netbeans atau VS Code).
* ✔️ Mapstruct.
* ✔️ Postman atau cURL (test API).

## 1️⃣ Dependency

Dependency pada `pom.xml`:

```xml
<!-- Spring Boot JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Spring Boot Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- H2 Database -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>

<!-- Mapstruct -->
<dependency>
    <groupId>org.mapstruct</groupId>
    <artifactId>mapstruct</artifactId>
    <version>1.6.3</version>
</dependency>
<dependency>
    <groupId>org.mapstruct</groupId>
    <artifactId>mapstruct-processor</artifactId>
    <version>1.6.3</version>
</dependency>
```

## 2️⃣ Konfigurasi `application.properties`

Pada file `src/main/resources/application.properties` kita perlu melakukan konfigurasi agar Spring Boot terhubung ke database MySQL:

```
spring.datasource.url=jdbc:h2:mem:springapp
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update

spring.h2.console.enabled=true
spring.h2.console.path=/h2
```

Konfigurasi di atas adalah konfigurasi minimal untuk terhubung ke database H2. Beberapa variable yang dimasukan adalah nama database adalah `springapp` dengan `urljdbc:h2:mem:springapp` , `username` adalah `sa` dan tanpa password. Konfigurasi adalah kita mengaktifkan console database H2 ketika dijalankan dengan nilai `true`, serta url path akses consolenya adalah `/h2`. Konfigurasi sisanya adalah konfigurasi JPA dan Hibernate.

## 3️⃣ Membuat Entity / Model

Membuat Entity `Person` dalam format POJO, untuk mewakili tabel `person` dalam database:

```java
package com.timposulabs.spring.mvc.model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "person")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    public Person() {
    }

    public Person(Long id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return Objects.equals(id, person.id) && Objects.equals(firstName, person.firstName) && Objects.equals(lastName, person.lastName) && Objects.equals(email, person.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, email);
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
```

Class entity yang dibuat adalah representasi `person`, dengan field `id`, `firsName`, `lastName` dan `email`.

## 4️⃣ Membuat Repository

Membuat interface Person Repository:

```java
package com.timposulabs.spring.mvc.repository;

import com.timposulabs.spring.mvc.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
}
```

`JpaRepository` Menyediakan semua operasi CRUD yang diperlukan seperti `save()`, `findAll()`, `findById()`, `deleteById()` dan tanpa perlu menulisnya sendiri.

## 5️⃣ Membuat Java Record untuk DTO

Java Record adalah class khusus di Java yang berguna untuk mengurangi kode boilerplate, dengan secara otomatis menghasilkan constructor, getter, setter. Ini ideal untuk DTO yang bertugas untuk membawa data antara server dan client.

```java
package com.timposulabs.spring.mvc.dto;

public record PersonDTO(Long id, String firstName, String lastName, String email) {
}
```

## 6️⃣ Membuat Mapstruct Mapper

🚀 Menggunakan MapStruct untuk menghindari mapping secara manual untuk konversi antara DTO dan Entity.

```java
package com.timposulabs.spring.mvc.util;

import com.timposulabs.spring.mvc.dto.PersonDTO;
import com.timposulabs.spring.mvc.model.Person;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PersonMapper {

    PersonMapper INSTANCE = Mappers.getMapper(PersonMapper.class);

    PersonDTO toDto(Person person);

    Person toEntity(PersonDTO personDTO);
}
```

## 7️⃣ Handle Exception

Dari aplikasi ini biar seru kita diperlu menambahkan handle Exception. Dimana kita akan membuat `NotFoundException` yang akan ditrigger ketika `id` tidak ditemukan.

### ✅ Membuat API Error

Kita akan membuat standard response API seperti berikut:

```json
{
  "error": "ID Not Found",
  "path": "/api/person/1",
  "status": 404,
  "timestamp": "2025-03-16T12:40:42.311569409"
}
```

Penjelasan:

* `error` : Keterangan Error.
* `path` : URL Request API penyebab error.
* `status` : Kode HTTP status.
* `timestamp` : Keterangan waktu error dalam format timestamp.

Kita akan mengikuti format response API di atas dengan membuat Java Record:

```java
import java.time.LocalDateTime;

public record ApiError(
        String error,
        String path,
        int status,
        LocalDateTime timestamp) {
}
```

### 2️⃣ Membuat Class NotFoundException

Selanjutnya membuat custom class `NotFoundException` extends dari `RuntimeException`:

```java
package com.timposulabs.spring.mvc.exception;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}
```

### 3️⃣ Membuat Exception Handler

Selanjutnya membuat Exception Handler yang menggunakan annotation `@ControllerAdvice`, yang mana Spring akan menjalankan Advice terlebih dahulu untuk menangkap exception yang ada. Maka dari itu semua class exception yang ada pada `ExceptionHandler` akan dihandle dalam class ini, dalam kasus ini exception `NotFoundException` yang telah kita buat sebelumnya akan dihandle disini.

```java
package com.timposulabs.spring.mvc.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiError> notFoundException(NotFoundException ex, HttpServletRequest request) {
        ApiError apiError = new ApiError(
                ex.getMessage(),
                request.getRequestURI(),
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiError);
    }
}
```

## 8️⃣ Membuat Service Layer

Dalam layer service, kita akan menggunakan `PersonMapper` yang sudah dibuat untuk melakukan konversi antara `Person` (entity) dan `PersonDTO` (DTO):

```java
package com.timposulabs.spring.mvc.service;

import com.timposulabs.spring.mvc.dto.PersonDTO;
import com.timposulabs.spring.mvc.exception.NotFoundException;
import com.timposulabs.spring.mvc.model.Person;
import com.timposulabs.spring.mvc.repository.PersonRepository;
import com.timposulabs.spring.mvc.util.PersonMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonService {

    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<PersonDTO> getAll() {
        return personRepository.findAll().stream()
                .map(PersonMapper.INSTANCE::toDto)
                .collect(Collectors.toList());
    }

    public PersonDTO findById(Long id) {
        return personRepository.findById(id)
                .map(PersonMapper.INSTANCE::toDto)
                .orElseThrow(() -> new NotFoundException("ID_NOT_FOUND"));
    }

    public PersonDTO create(PersonDTO personDTO) {
        return PersonMapper.INSTANCE.toDto(personRepository.save(PersonMapper.INSTANCE.toEntity(personDTO)));
    }

    public PersonDTO update(Long id, PersonDTO personDTO) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ID_NOT_FOUND"));
        person.setFirstName(personDTO.firstName());
        person.setLastName(personDTO.lastName());
        person.setEmail(personDTO.email());
        return PersonMapper.INSTANCE.toDto(personRepository.save(person));
    }

    public void delete(Long id) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ID_NOT_FOUND"));
        personRepository.delete(person);
    }
}
```

* Konversi logic (antara Entitas dan DTO) disimpan di layer service untuk menjaga controller tetap bersih dan hanya berfokus pada penanganan request HTTP.
* `PersonMapper` akan mengonversi entity __Person__ menjadi __PersonDTO__, begitupun sebaliknya.

## 9️⃣ Membuat Controller 

Dalam layer ini, kita akan membuat Controller untuk REST API:

```java
package com.timposulabs.spring.mvc.controller;

import com.timposulabs.spring.mvc.dto.PersonDTO;
import com.timposulabs.spring.mvc.service.PersonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/person")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    // ✅ GET all Person (200 OK)
    @GetMapping
    public ResponseEntity<List<PersonDTO>> getAll() {
        return ResponseEntity.ok(personService.getAll());
    }

    // ✅ GET Person by ID (200 OK / 404 Not Found)
    @GetMapping("/{id}")
    public ResponseEntity<PersonDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(personService.findById(id));
    }

    // ✅ POST Create new Person (201 Created)
    @PostMapping
    public ResponseEntity<PersonDTO> create(@RequestBody PersonDTO personDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(personService.create(personDTO));
    }

    // ✅ PUT Update Person (200 OK / 404 Not Found)
    @PutMapping("/{id}")
    public ResponseEntity<PersonDTO> update(@PathVariable Long id, @RequestBody PersonDTO personDTO) {
        return ResponseEntity.ok(personService.update(id, personDTO));
    }

    // ✅ DELETE Person (204 No Content / 404 Not Found)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        personService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

* __GET, POST, PUT, dan DELETE__ HTTP adalah method yang digunakan untuk CRUD operations.
* Controller tidak memiliki bussines logic. Dia hanya berfungsi untuk mengatur request ke layer Service dan memberikan response ke Client. Ini membuat kode lebih clean dan menjadi mudah untuk dimaintain.


## 8️⃣ Running dan Testing API

Jalankan aplikasi dan lakukan pengujian dari client bisa menggunakan Postman atau cURL.

### 🔥 Testing

✅ __GET__ all person:

* URL: `http://localhost:8080/person`

✅ __GET__ product by ID:

* URL: `http://localhost:8080/person/{id}`

✅ __POST__ membuat product baru:

* URL: `http://localhost:8080/person`
* Body: 

```json
{
  "firstName":"Ucup",
  "lastName":"Topekox",
  "email":"ucup@gmail.com"
}
```

✅ __PUT__ update person by ID:

* URL: `http://localhost:8080/person/{id}`
* Body: 

```json
{
  "firstName": "Ade",
  "lastName": "Agustian",
  "email": "ade@gmail.com"
}
```

✅ __DELETE__ menghapus data person by ID:

* URL: `http://localhost:8080/api/product/{id}`

✅ __NOT FOUND (GET, PUT, DELETE)__ Response API ketika ID tidak ditemukan:

* URL: `http://localhost:8080/person/0`
* Response: 

```json
{
  "error": "ID_NOT_FOUND",
  "path": "/person/0",
  "status": 404,
  "localDateTime": "2025-03-23T12:08:43.4502233"
}
```

## 🔖 Kesimpulan

Kita sudah membangun aplikasi Spring Boot CRUD REST API. Kita mengikuti best practice dengan menggunakan Java Record sebagai DTO dan menjaga logic konversi antara Entity dan DTO di layer Service menggunakan Mapstruct. Dengan memisahkan logic konversi ke dalam layer Service, kita mempertahankan basis kode yang clean dan terstruktur dengan baik yang akan lebih mudah dimaintain dan diperluas/scalability di masa mendatang. Selain itu kita juga sudah mengimplementasikan Exception Handle yang mana kita mengkustom sendiri exception sesuai kebutuhan.

## 🌐 Baca Juga

* https://medium.com/@vikrantdheer/is-mapstruct-dead-the-ultimate-solution-to-stop-writing-boilerplate-code-in-java-83d42bb44af6