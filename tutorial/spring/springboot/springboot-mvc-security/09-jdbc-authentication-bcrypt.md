---
sidebar_position: 9
title: 'JDBC Authentication BCrypt'
---

Materi ini akan membahas cara menerapkan **BCrypt**, standar enkripsi kata sandi terkuat dan paling banyak digunakan di ekosistem **Spring Security** pada saat ini.

## 📌 Apa itu BCrypt?

BCrypt adalah fungsi hashing kata sandi yang dirancang oleh Niels Provos dan David Mazières. Saat ini, BCrypt tetap menjadi pilihan utama karena:

* **Salting Otomatis**: Setiap password akan memiliki salt unik (teks acak tambahan), sehingga dua user dengan password sama akan memiliki hasil enkripsi yang berbeda di database. Ini mencegah serangan Rainbow Table.
* **Work Factor (Cost)**: Kita bisa mengatur seberapa "berat" proses enkripsi dilakukan. Semakin tinggi nilainya, semakin sulit bagi penyerang untuk melakukan *brute-force*.

:::tip
Kita bisa menggunakan BCrypt Generator online untuk melakukan Generate dan Verify Hash. Contoh https://bcrypt-generator.com/.
:::

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
* Pastikan kolom `enabled` bernilai `1` agar user bisa login.
* Selalu pastikan kolom password di database memiliki panjang minimal **68 karakter** (disarankan 100) untuk menampung hasil hash BCrypt.
:::

* Insert data `users` dan `authorities`:

```sql
INSERT INTO `users` 
VALUES 
-- Password = rahasia123 --
('aco','{bcrypt}$2a$12$v8mHo6OSrm/ReDDydgFUneA2n1YIu.j8SFwzFvCjTGuDcTtoewB5W',1), 
('ade','{bcrypt}$2a$12$v8mHo6OSrm/ReDDydgFUneA2n1YIu.j8SFwzFvCjTGuDcTtoewB5W',1),
('ucup','{bcrypt}$2a$12$v8mHo6OSrm/ReDDydgFUneA2n1YIu.j8SFwzFvCjTGuDcTtoewB5W',1);

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

Pada `SecurityConfig`, kita menggunakan `JdbcUserDetailsManager` yang membutuhkan sebuah `DataSource`:

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

:::info
TIdak ada perbedaan konfigurasi dengan materi [**JDBC Authentication**](/spring/springboot/springboot-mvc-security/jdbc-authentication) sebelumnya, yang menmbedakan hanya isi data pada kolom `password` tabel `users`.
:::

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-mvc-security/tree/main/10-belajar-springboot-security-jdbc-authentication-bcrypt-encryption
:::

---

## 🔒 Best Practice: Menggunakan Password Encoder

Pada materi di atas kita masih menggunakan format `{bcrypt}$2a$10$dXJ...` pada data kolom `password` tabel `users`. Kita bisa menggunakan `PasswordEncoder` untuk menggunakan data hash `bcrypt` langsung tanpa menggunakan format `{bcrypt}$2a$10$dXJ...`.

### 1️⃣ Persiapan Database

```sql
INSERT INTO `users` 
VALUES 
-- Password = rahasia123 --
('aco','$2a$12$v8mHo6OSrm/ReDDydgFUneA2n1YIu.j8SFwzFvCjTGuDcTtoewB5W',1), 
('ade','$2a$12$v8mHo6OSrm/ReDDydgFUneA2n1YIu.j8SFwzFvCjTGuDcTtoewB5W',1),
('ucup','$2a$12$v8mHo6OSrm/ReDDydgFUneA2n1YIu.j8SFwzFvCjTGuDcTtoewB5W',1);
```

* Contoh Hasil Enkripsi di Database dengan password *`rahasia123`*.

```
+----------+--------------------------------------------------------------+---------+
| username | password                                                     | enabled |
+----------+--------------------------------------------------------------+---------+
| aco      | $2a$12$v8mHo6OSrm/ReDDydgFUneA2n1YIu.j8SFwzFvCjTGuDcTtoewB5W |       1 |
| ade      | $2a$12$v8mHo6OSrm/ReDDydgFUneA2n1YIu.j8SFwzFvCjTGuDcTtoewB5W |       1 |
| ucup     | $2a$12$v8mHo6OSrm/ReDDydgFUneA2n1YIu.j8SFwzFvCjTGuDcTtoewB5W |       1 |
+----------+--------------------------------------------------------------+---------+
```

### 2️⃣ Konfigurasi Password Encoder

Langkah pertama adalah mendaftarkan `BCryptPasswordEncoder` sebagai sebuah **Bean** di dalam kelas `SecurityConfig` agar bisa digunakan oleh Spring Security secara global. Contoh konfigurasi lengkap:

```java
@Configuration
public class SecurityConfig {

	// membuat user konfigurasi dari database
	@Bean
	public UserDetailsManager userDetailsManager(DataSource dataSource) {
		return new JdbcUserDetailsManager(dataSource);		
	}
	
	// Bean untuk Password Encoder BCrypt
	@Bean
	public PasswordEncoder passwordEncoder() {
		// Angka 12 adalah 'High security' (log rounds) cocok production. Standar adalah 10-12.
		return new BCryptPasswordEncoder(12);
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

:::tip
Jika aplikasi anda nantinya berkembang sangat besar (jutaan user), *cost factor / log rounds* 12 mungkin akan terasa sedikit lambat pada hardware server yang pas-pasan (proses hashing bisa memakan waktu >200ms), kita bisa menggunakan *cost factor* 10 (strength) sebagai alternatif. Namun, untuk standar keamanan, angka 12 adalah pilihan yang sangat **solid dan aman** dari serangan *brute-force*.
:::

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-mvc-security/tree/main/11-belajar-springboot-security-jdbc-authentication-bcrypt-password-encoder
:::

### 3️⃣ BONUS: Cara Membuat Password Terenkripsi Secara Manual

Saat mendaftarkan user baru atau memasukkan data awal ke database, kita harus mengenkripsi password tersebut terlebih dahulu. Jangan pernah memasukkan teks biasa ke database.

Contoh Test Code untuk Generate Hash:

```java
public class PasswordGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "rahasia123";
        String encodedPassword = encoder.encode(rawPassword);
        
        System.out.println("Hasil Enkripsi: " + encodedPassword);
    }
}
```
