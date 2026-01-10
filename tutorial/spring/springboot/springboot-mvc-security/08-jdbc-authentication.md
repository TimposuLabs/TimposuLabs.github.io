---
sidebar_position: 8
title: 'JDBC Authentication'
---

Pada materi-materi sebelumnya, kita telah mempelajari penyimpanan data pengguna/user dari memori (**In-Memory Authentication**) metode yang sangat baik untuk tahap pengembangan awal. Namun, aplikasi tingkat production tidak mungkin menyimpan kredensial pengguna/user langsung di dalam kode program. Di sinilah kita menggunakan **JDBC (Java Database Connectivity) Authentication**.

| User ID | Password | Roles |
| --- | --- | --- |
| `aco` | `test123` | (**GUEST**): Level terendah. |
| `ade` | `test123`	| (**GUEST, USERS**): Memiliki akses tamu dan akses pengguna reguler.|
| `ucup` | `test123` | (**GUEST, USERS, ADMIN**): Level tertinggi (Super User). |

Materi ini akan membahas cara mengalihkan penyimpanan data pengguna/user dari memori (**In-Memory**) ke database relasional menggunakan **JDBC Authentication**.

## 1️⃣ Persiapan Database

* Spring Security secara default menggunakan struktur tabel tertentu agar dapat bekerja secara otomatis tanpa query tambahan.

```sql
CREATE TABLE users (
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    enabled TINYINT NOT NULL
);

CREATE TABLE authorities (
    username VARCHAR(50) NOT NULL,
    authority VARCHAR(50) NOT NULL,
    CONSTRAINT fk_authorities_users FOREIGN KEY(username) REFERENCES users(username)
);
```

:::warning
Pastikan kolom `enabled` bernilai `1` agar user bisa login.
:::

* Insert data `users` dan `authorities`:

```sql
INSERT INTO `users`
VALUES 
('aco','{noop}test123',1),
('ade','{noop}test123',1),
('ucup','{noop}test123',1);

INSERT INTO `authorities` 
VALUES 
('aco','ROLE_GUEST'),
('ade','ROLE_GUEST'),
('ade','ROLE_USERS'),
('ucup','ROLE_GUEST'),
('ucup','ROLE_USERS'),
('ucup','ROLE_ADMIN');
```

## 2️⃣ Dependency

Tambahkan driver database (contoh: MySQL) dan Spring Data JPA ke dalam `pom.xml` Anda:

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
	<groupId>com.mysql</groupId>
	<artifactId>mysql-connector-j</artifactId>
	<scope>runtime</scope>
</dependency>
```

## 3️⃣ Konfigurasi Application Properties

Hubungkan aplikasi ke database melalui file `application.properties`: 

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/nama_db_anda
spring.datasource.username=root
spring.datasource.password=password_anda
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

## 4️⃣ Implementasi JDBC Authentication

Pada `SecurityConfig`, kita sekarang menggunakan `JdbcUserDetailsManager` yang membutuhkan sebuah `DataSource`:

```java
@Configuration
public class SecurityConfig {

	// membuat user konfigurasi dari database
	@Bean
	public UserDetailsManager userDetailsManager(DataSource dataSource) {
		return new JdbcUserDetailsManager(dataSource);		
	}
	
	// konfig custom login page
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
		
		httpSecurity.authorizeHttpRequests(configurer -> 
					configurer
						.requestMatchers("/").hasRole("GUEST")
						.requestMatchers("/user/**").hasAnyRole("USERS", "ADMIN")
						.requestMatchers("/admin/**").hasRole("ADMIN")
						.anyRequest().authenticated()
				).formLogin(form ->
					form
						.loginPage("/loginPage")
						.loginProcessingUrl("/authentication")
						.permitAll()
				).logout(logout -> 
					logout.permitAll()
				).exceptionHandling(configurer ->
					configurer.accessDeniedPage("/access-denied")
				);
		
		return httpSecurity.build();
	}
}
```

## 🚀 Uji Coba

### 👑 User dengan Role Admin 

* User "ucup" melakukan login

![Spring Security](/img/spring/spring-security12.png)

* User "ucup" dapat mengakses page `/admin` dan `/user`:

![Spring Security](/img/spring/spring-security13.png)

![Spring Security](/img/spring/spring-security14.png)

### 👤 User dengan Role Guest

* User "aco" melakukan login

![Spring Security](/img/spring/spring-security16.png)

* User "aco" ketika mengakses page `/admin` dan `/user`:

![Spring Security](/img/spring/spring-security15.png)

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-mvc-security/tree/main/09-belajar-springboot-security-jdbc-authentication
:::
