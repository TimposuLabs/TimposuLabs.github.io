---
slug: spring-boot-arsitektur-controller-service-repository-database-flow
title: Arsitektur Spring Boot - Controller, Service, Repository dan Database 
authors: topekox
tags: [springboot, spring, rest, api]
---

Spring Boot 🍃 adalah salah satu framework paling populer untuk membangun API RESTful dan Microservices di Java. Spring Boot menyederhanakan pengembangan aplikasi Java dengan menyediakan environtment yang telah dikonfigurasi sebelumnya, menyederhanakan penulisan kode, dan memastikan scalability dan maintainability.

<!--truncate-->

## 📌 Arsitektur Spring Boot

Pada tutorial ini kita akan meng-eksplore __Spring Boot Layered Architecture__, dan bagaimana data mengalir di antara masing-masing komponen layer tersebut. Sebelumnya, kenapa kita harus menggunakan arsitektur tersebut:

* ☑️ **Struktur kode program lebih terorganisasi**.
* ☑️ **Scalability**: Membuat aplikasi lebih mudah dikembangkan/diperluas.
* ☑️ **Maintainability**: Masing-masing layer memiliki tugasnya masing-masing.
* ☑️ **Faster Development**: Menyederhanakan interaksi API dan database.

## 🔁 Spring Boot Layered Architecture

Arsitektur Spring Boot didasarkan pada pendekatan berlapis/layered, di mana setiap lapisan/layer bertanggung jawab atas bagian tertentu dari aplikasi.

![ Spring Boot Architecture](/img/general/SpringBootArsitekturFlow.png)


### 1️⃣ Client Layer (Pengguna API)

Client Layer adalah entitas eksternal dari aplikasi Spring Boot (browser, aplikasi seluler, Postman, aplikasi frontend) yang berinteraksi dengan API.

Client akan:

* ✔️ Mengirim HTTP Requests (GET, POST, PUT, DELETE)
* ✔️ Menerima API Responses (JSON format)

Contoh client:

* ✔️ Frontend apps (React, Angular, Vue.js)
* ✔️ Mobile apps (Android, iOS)
* ✔️ API testing tools (Postman, cURL)

### 2️⃣ Controller Layer (Menangani HTTP Requests & Responses)

Controller Layer bertindak sebagai pintu masuk untuk permintaan API. Dia bertanggung jawab untuk memproses permintaan HTTP yang masuk/request dan mengembalikan response yang sesuai.

#### 📌 Tugas Controller Layer

* ✔️ Menerima requests dari client (`@GetMapping`, `@PostMapping`, dsb.).
* ✔️ Melakukan validasi dari data yang diinput.
* ✔️ Memanggil Service Layer untuk business logic.
* ✔️ Mengembalikan response HTTP yang sesuai.

#### 📌 Contoh Controller

```java
@RestController
@RequestMapping("/api/person")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    // ✅ GET: get all person (200 OK)
    @GetMapping
    public ResponseEntity<List<PersonDTO>> getAll() {
        return ResponseEntity.ok(personService.getAll());
    }
}
```

🚀 Controller bukan untuk bussines logic. Dia hanya mengatur permintaan ke method pada layer service yang sesuai.

### 3️⃣ Service Layer (Business Logic Processing)

Service Layer bertanggung jawab untuk menerapkan bussines logic dan memproses data sebelum mengirimkannya ke client.

#### 📌 Tugas Service Layer

* ✔️ Mengimplementasikan business rules dan logic.
* ✔️ Menangani transactions.
* ✔️ Memanggil Layer Repositori untuk interaksi ke database.
* ✔️ Menggunakan DTO (Data Transfer Objek) untuk struktur data.

#### 📌 Contoh Service

```java
@Service
public class PersonService {

    private final PersonRepository personRepository;
    private final PersonMapper personMapper;

    public PersonService(PersonRepository personRepository, PersonMapper personMapper) {
        this.personRepository = personRepository;
        this.personMapper = personMapper;
    }

    public List<PersonDTO> getAll() {
        return personRepository.findAll().stream()
                .map(personMapper::toPersonDTO)
                .toList();
    }
}
```

🚀 Service layer memastikan bahwa Controller tidak mengandung bussines logic. Dia bertanggung jawab untuk menangani business operations pada aplikasi.

### 4️⃣ Repository Layer (Database Access Layer)

Repository Layer bertanggung jawab untuk berkomunikasi dengan database.

Hal-hal yang perlu diperhatikan:

* ☑️ Menggunakan Spring Data JPA untuk melakukan operasi CRUD.
* ☑️ Menggunakan `@Repository` annotation untuk menandai bahwa dia adalah DAO (Data Access Object).
* ☑️ Mengimplementasikan queri database menggunakan JPA, Hibernate, atau Native SQL.

#### 📌 Contoh Repository

```java
public interface PersonRepository extends JpaRepository<Person, Long> {
}
```

🚀 Spring Data JPA mengurangi penggunaan kode CRUD boilerplate dengan menyediakan method yang telah dibuat oleh Spring Data JPA secara otomatis seperti `findAll()`, `save()`, `deleteById()` dll.

### 5️⃣ Model Layer (Entity & DTO Representation)

Model Layer mewakili tabel yang ada dalam database dan memastikan enkapsulasi data.

Hal-hal yang diperhatikan:

* Entity dipetakan ke tabel database.
* DTO (Objek Transfer Data) hanya membantu mentransfer data yang diperlukan.

#### 📌 Contoh Entity

```java
@Entity
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

}
```

🚀 Entity tidak boleh diekspose secara langsung dalam response API. Sebagai gantinya, kita menggunakan DTO.

#### 📌 Contoh DTO menggunakan Java Record

```java
public record PersonDTO(Long id, String firstName, String lastName) {
}
```

🚀 Menggunakan `record` untuk DTO, akan membuat immutable dan kode lebih clean.

### 6️⃣ Database Layer

Database Layer untuk menyimpan dan mengambil data menggunakan framework persistence Spring Boot.

Hal-hal yang diperhatikan:

* Menggunakan database relasional (MySQL, MariaDB, PostgreSQL, Oracle, Ms SQL, H2, dll.).
* Menggunakan JPA dan Hibernate untuk mengelola entity mapping.
* Menjalankan query menggunakan operasi CRUD.

#### 📌 Contoh Konfigurasi Database pada `application.properties`

```
spring.datasource.url=jdbc:mariadb://localhost:3306/belajar
spring.datasource.driverClassName=org.mariadb.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.database-platform=org.hibernate.dialect.MariaDBDialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
```

🚀 Konfigurasi di atas menggunakan database MariaDB. Untuk database lain tentunya memiliki konfigurasi yang berbeda.

## ✅ Bagaimana Alur Data Mengalir?

* 1️⃣ __Client__ mengirim request HTTP ke layer __Controller__.
* 2️⃣ Layer __Controller__ melakukan validasi request dan meneruskan ke layer __Service__.
* 3️⃣ Layer __Service__ memproses bussines logic dan memanggil layer __Repository__.
* 4️⃣ Layer __Repository__ mengambil atau memperbaharui data yang ada di __Database__.
* 5️⃣ Layer __Model__ memetakan/mapping database record ke Java object.
* 6️⃣ Data yang sudah diproses dikirim kembali ke layer __Service__, lalu ke layer __Controller__, dan akhirnya dikembalikan ke __Client__ sebagai response API.

## 🎯 Kesimpulan

* ✅ Memisahkan layer arsitektur berdasarkan fungsinya, sehingga penanganan permasalahan antar layer lebih baik.
* ✅ Menggunakan Controller, Service, Repository, Model dan Database layer.
* ✅ Memastikan kode program lebih clean, maintainability dan scalability.
* ✅ Menggunakan Spring Data JPA untuk interaksi ke database.

## 🌐 Referensi

* https://www.javaguides.net/2025/03/spring-boot-architecture.html