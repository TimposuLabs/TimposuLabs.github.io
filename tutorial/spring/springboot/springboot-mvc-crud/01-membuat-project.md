---
sidebar_position: 2
title: 'Membuat Project'
---

Untuk membuat proyek Spring Boot MVC CRUD, cara termudah adalah menggunakan Spring Initializr https://start.spring.io/ secara online atau melalui IDE (seperti IntelliJ/Eclipse) dengan menambahkan dependensi utama: `Spring Web`, `Spring Data JPA`, `Thymeleaf`, dan `MySQL Driver` (atau database pilihan lainnya).

## 💻 Prasyarat

Tutorial menggunakan teknologi:

* JDK 17 atau yang lebih baru.
* Maven 3.
* Database MySQL 8.
* Spring Boot 3.

## 1️⃣ Inisialisasi Proyek (Melalui Spring Initializr)

* Kunjungi https://start.spring.io/.
* Pilih:
    * Project: Maven atau Gradle.
    * Language: Java.
    * Spring Boot: Versi terbaru.
    * Dependencies: `Spring Web`, `Spring Data JPA`, `Thymeleaf`,`Validation` dan `MySQL Driver`.
* Klik: Tombol Generate untuk mengunduh file ZIP proyek. 

## 2️⃣ Import Project ke IDE

Import project ke **IntelliJ IDEA / Eclipse / NetBeans / VS Code**: Buka IDE Anda, lalu impor proyek yang baru diunduh sebagai proyek Maven atau Gradle yang sudah ada.

## 3️⃣ Dependency

Berikut dependency dalam `pom.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.5.9</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.timposulabs</groupId>
	<artifactId>01-spring-mvc-crud-list</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>01-spring-mvc-crud-list</name>
	<description>Demo project for Spring Boot</description>
	<url/>
	<licenses>
		<license/>
	</licenses>
	<developers>
		<developer/>
	</developers>
	<scm>
		<connection/>
		<developerConnection/>
		<tag/>
		<url/>
	</scm>
	<properties>
		<java.version>17</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-thymeleaf</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>com.mysql</groupId>
			<artifactId>mysql-connector-j</artifactId>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-validation</artifactId>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>
```

## 4️⃣ Buat Database

Membuat database dengan nama `spring_boot_app` di MySQL:

```sql
CREATE DATABASE spring_boot_app;
```

## 5️⃣ Konfigurasi `application.properties`

Pada file `src/main/resources/application.properties` kita perlu melakukan konfigurasi agar Spring Boot terhubung ke database MySQL:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/spring_boot_app
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=rahasia
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
```

## 6️⃣ Jalankan Aplikasi

* Buka terminal di root project.
* Jalankan dengan perintah Maven: `mvn spring-boot:run`.
* Buka browser dan akses http://localhost:8080/. 

Dengan langkah-langkah ini, kita sudah memiliki project Spring Boot MVC sederhana.
