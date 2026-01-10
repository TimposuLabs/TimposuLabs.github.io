---
sidebar_position: 10
title: 'JDBC Auth Custom Tables'
---

Materi ini akan membahas cara mengonfigurasi **Spring Security JDBC** jika kita memiliki struktur tabel database sendiri yang berbeda dari standar default Spring.

Di dunia nyata, seringkali kita harus bekerja dengan desain database kustom. Contoh kasus tabel bernama `accounts` dan `roles`.

## 1️⃣ Mengapa Menggunakan Custom Tables?

Secara default, Spring Security mencari tabel bernama `users` dan `authorities`. Namun, kita mungkin ingin menggunakan nama lain, misalnya:

* Tabel `accounts` bukan `users`.
* Kolom `user_id` bukan `username`.
* Kolom `user_password` bukan `password`.
* Kolom `active` bukan `enabled`.
* Tabel `roles` bukan `authorities`.
* Kolom `user_id` bukan `username`.
* Kolom `user_role` bukan `authority`.

## 2️⃣ Contoh Skema Database Kustom

* Misalkan kita memiliki tabel SQL sebagai berikut:

```sql   
CREATE TABLE `accounts` (
  `user_id` varchar(50) NOT NULL,
  `user_password` char(68) NOT NULL,
  `active` tinyint NOT NULL,
  PRIMARY KEY (`user_id`)
);

CREATE TABLE `roles` (
  `user_id` varchar(50) NOT NULL,
  `user_role` varchar(50) NOT NULL,
  UNIQUE KEY `authorities5_idx_1` (`user_id`,`user_role`),
  CONSTRAINT `authorities5_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `accounts` (`user_id`)
);
```

* Insert data:

```sql
INSERT INTO `accounts` 
VALUES 
-- Password = test123 --
('aco','$2a$12$J5TR1bl3yRrUJ5LHAezNH.r8Bs9zCOuTsop2PAmUxmUEP7j7V5Mke',1), 
('ade','$2a$12$J5TR1bl3yRrUJ5LHAezNH.r8Bs9zCOuTsop2PAmUxmUEP7j7V5Mke',1),
('ucup','$2a$12$J5TR1bl3yRrUJ5LHAezNH.r8Bs9zCOuTsop2PAmUxmUEP7j7V5Mke',1);

INSERT INTO `roles` 
VALUES 
('aco','ROLE_GUEST'),
('ade','ROLE_GUEST'),
('ade','ROLE_USERS'),
('ucup','ROLE_GUEST'),
('ucup','ROLE_USERS'),
('ucup','ROLE_ADMIN');
```

## 3️⃣ Konfigurasi: Menggunakan Custom Query

```java
@Configuration
public class SecurityConfig {

	// membuat user konfigurasi dari database
	@Bean
	public UserDetailsManager userDetailsManager(DataSource dataSource) {
		JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);
		
		// set query untuk mendapatkan user berdasarkan username
		jdbcUserDetailsManager.setUsersByUsernameQuery(
				"SELECT user_id, user_password, active FROM members WHERE user_id=?");
		
		// set query untuk mendapatkan role berdasarkan username
		jdbcUserDetailsManager.setAuthoritiesByUsernameQuery(
				"SELECT user_id, user_role FROM roles WHERE user_id=?");
		
		return jdbcUserDetailsManager;		
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

## 4️⃣ Hal Penting yang Harus Diperhatikan
Saat menulis kueri kustom, pastikan urutan kolom yang dipilih sesuai dengan harapan Spring Security:

* **Users Query**: Harus mengembalikan 3 kolom dengan urutan: `username`, `password`, dan `enabled` (boolean/tinyint).
* **Authorities Query**: Harus mengembalikan 2 kolom dengan urutan: `username` dan `authority`.
* **Integrasi dengan BCrypt**: Meskipun tabelnya kustom, pastikan kolom  `user_password` tetap berisi hash BCrypt

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-mvc-security/tree/main/12-belajar-springboot-security-jdbc-custom-tables
:::
