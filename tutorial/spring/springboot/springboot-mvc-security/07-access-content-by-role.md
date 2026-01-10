---
sidebar_position: 7
title: 'Akses Konten Berdasarkan Role'
---


Materi ini akan membahas cara membatasi akses konten, baik di tingkat tampilan (**UI/View**) maupun di tingkat keamanan server (**Endpoint**). Kontrol akses berbasis peran (*Role-Based Access Control)* adalah standar keamanan untuk memastikan pengguna/user hanya dapat melihat dan melakukan apa yang menjadi hak mereka.

Pada [materi sebelumnya](/spring/springboot/springboot-mvc-security/access-url-by-role) ketika setiap user **login**, halaman **home** akan menampilkan link ke **Admin page** dan **User page**, tentu cara ini bukan merupakan praktik terbaik, karena user yang memiliki role `GUEST` pun tetap bisa melihat dan mengklik link tersebut, walaupun nantinya di arahkan ke `/access-denied`.

![Spring Security](/img/spring/spring-security16.png)

Dengan membatasi akses konten, nantinya pengguna/user hanya dapat melihat dan melakukan apa yang menjadi hak akses mereka berdasarkan ROLE-nya.

:::info
Materi ini masih berhubungan dengan [materi sebelumnya](/spring/springboot/springboot-mvc-security/access-url-by-role).
:::

## 1️⃣ Konfigurasi pada Sisi Server (`SecurityFilterChain`)

* Langkah pertama dan paling penting adalah mengunci pintu di sisi server. Walaupun tombol/link di HTML disembunyikan, pengguna yang pintar tetap bisa mengetikkan URL secara manual. Kita harus mengamankannya di class `SecurityConfig`.

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
	
	httpSecurity.authorizeHttpRequests(configurer -> 
				configurer
					.requestMatchers("/").hasRole("GUEST")		// Dapat diakses Aco, Ade, Ucup
					.requestMatchers("/user/**").hasAnyRole("USERS", "ADMIN")	// Hanya Ade dan Ucup
					.requestMatchers("/admin/**").hasRole("ADMIN")	// Hanya Ucup
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
```

## 2️⃣ Keamanan Sisi Tampilan (Thymeleaf Security)

Untuk menyembunyikan elemen menu yang tidak bisa diakses oleh user yang memiliki ROLE tidak sesuai, pada `home.html`, gunakan atribut **`sec:authorize`**.


```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org"
	  xmlns:sec="http://www.thymeleaf.org/extras/spring-security">
<head>
		<title>Belajar Spring CRUD Security</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	</head>
	<body>
		<h2>TimposuLabs Company</h2>
		<hr />
		Welcome to our company homepage.
		<hr />
		<p>
			Logged in as: <span sec:authentication="principal.username"></span>
			<br>
			Roles: <span sec:authentication="principal.authorities"></span>
		</p>
		<hr />
		<p>
			<a th:href="@{/user}" sec:authorize="hasAnyRole('USERS', 'ADMIN')">User Page</a>
			<br>
			<a th:href="@{/admin}" sec:authorize="hasRole('ADMIN')">Admin Page</a>			
		</p>
		<hr>	
		<form th:action="@{/logout}" method="post">
			<button type="submit">Logout</button>	
		</form>
	</body>
</html>
```

* Gunakan `hasAnyRole` untuk lebih dari satu ROLE.
* Gunakan `hasRole` kalau cuma satu ROLE.

## 🚀 Uji Coba

### 👑 User dengan Role Admin 

* User "ucup" melakukan login

![Spring Security](/img/spring/spring-security12.png)

* User "ucup" dapat melihat dan mengakses page `/admin` dan `/user`:

![Spring Security](/img/spring/spring-security13.png)

![Spring Security](/img/spring/spring-security14.png)

### 👤 User dengan Role Guest

* User "aco" melakukan login dan tidak dapat melihat link `/admin` dan `/user`:

![Spring Security](/img/spring/spring-security17.png)

* User "aco" ketika mencoba mengakses link `/admin` dan `/user`:

![Spring Security](/img/spring/spring-security15.png)

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-mvc-security/tree/main/08-belajar-springboot-security-display-content-by-roles
:::
