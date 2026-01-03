---
sidebar_position: 1
title: 'Membuat Project'
---

:::info
Materi ini dibuat pada tahun 2025, jika dikemudian hari ada perubahan/update silahkan menyesuaikan.
:::

### 1️⃣ Inisialisasi Proyek

Gunakan [Spring Initializr](https://start.spring.io/) untuk membuat struktur proyek dengan cepat. Pilih pengaturan berikut:

* **Project**: Maven (atau Gradle).
* **Language**: Java (Versi 17 atau 21).
* **Spring Boot Version**: 4.x.x.
* **Dependencies**:
    * **Spring Data JPA**: Untuk akses database melalui Hibernate.
    * **MySQL Driver**: Driver JDBC untuk koneksi ke MySQL.

### 2️⃣ Konfigurasi Database

Setelah proyek diunduh dan dibuka di IDE (seperti IntelliJ IDEA, Eclipse, VSCode atau Netbeans), buka file `src/main/resources/application.properties` dan tambahkan konfigurasi berikut:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nama_databases
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.username=user_mysql
spring.datasource.password=password_user_mysql
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# turn off spring boot banner (optional)
spring.main.banner-mode=off

logging.level.root=warn
```

### 3️⃣ Membuat Model / Entity

Buat kelas Java dan tandai dengan anotasi `@Entity` agar Hibernate memetakannya ke tabel database.

Kita akan membuat entity `Student` yang nantinya akan dimapping / dipetakan ke dalam database dengan nama table `student`:

```java
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "student")
public class Student {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email")
	private String email;

	public Student() {
	}

	public Student(String firstName, String lastName, String email) {
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
	public String toString() {
		return "Student [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + "]";
	}
}
```

### 4️⃣ Membuat Main App

Disini kita akan membuat main application yang nantinya akan kita jalankan di Command Line. Update Main Application Spring Boot seperti

```java
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	// Method ini akan mencetak di command line
	@Bean
	public CommandLineRunner commandLineRunner(String... args) {
		return runner -> {
			System.out.println("Hello World");
		};
	}
}
```

### 5️⃣ Verifikasi Koneksi

Jalankan aplikasi melalui kelas utama (Main Class). Jika konfigurasi benar, Hibernate akan mencetak log pembuatan tabel di konsol, dan aplikasi akan terhubung ke MySQL.

```
Hibernate: create table student (id bigint not null auto_increment, email varchar(255), first_name varchar(255), last_name varchar(255), primary key (id)) engine=InnoDB
Hello World
```

Cek ke dalam database:

```
mysql> show tables;
+------------------+
| Tables_in_school |
+------------------+
| student          |
+------------------+
1 row in set (0.00 sec)

mysql> describe student;
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| id         | bigint       | NO   | PRI | NULL    | auto_increment |
| email      | varchar(255) | YES  |     | NULL    |                |
| first_name | varchar(255) | YES  |     | NULL    |                |
| last_name  | varchar(255) | YES  |     | NULL    |                |
+------------+--------------+------+-----+---------+----------------+
4 rows in set (0.00 sec)
```