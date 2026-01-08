---
sidebar_position: 3
title: 'Custom Login Page'
---

Materi ini akan membahas cara mengganti halaman login default Spring Security buatan sendiri menggunakan Thymeleaf.

Step by step membuat custom login Spring Security:

1. Update SecurityConfig.
2. Membuat Controller.
3. Membuat View untuk custom Login Page.

## 1️⃣ Update Security Config

Kita harus memberi tahu Spring Security bahwa kita akan menggunakan URL sendiri untuk halaman login.

```java
@Configuration
public class SecurityConfig {

	// membuat user yang hanya running di memory
	@Bean
	public InMemoryUserDetailsManager userDetailsManager() {
		
		UserDetails aco = User.builder()
				.username("aco")
				.password("{noop}test123")
				.roles("GUEST")
				.build();
		
		UserDetails ade = User.builder()
				.username("ade")
				.password("{noop}test123")
				.roles("GUEST", "USERS")
				.build();
		
		UserDetails ucup = User.builder()
				.username("ucup")
				.password("{noop}test123")
				.roles("GUEST", "USERS", "ADMIN")
				.build();				
		
		return new InMemoryUserDetailsManager(aco, ade, ucup);
	}
	
	// konfigurasi custom login page
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
		
		httpSecurity.authorizeHttpRequests(configurer -> 
					configurer
						.anyRequest().authenticated() // Semua request wajib login
				).formLogin(form ->
					form
						.loginPage("/loginPage") // URL yang akan dipanggil (Controller)
						.loginProcessingUrl("/authentication") // URL POST yang ditangani Spring Security
						.permitAll() // Izinkan semua orang mengakses halaman login
				);
		
		return httpSecurity.build();
	}
}
```

* `loginPage`: URL yang akan kita buat di Controller.
* `loginProcessingUrl`: Kita tidak perlu membuat Controller untuk ini. Spring Security secara otomatis akan memproses data POST dari form ke URL ini.

## 2️⃣ Membuat Controller

Buatlah controller sederhana untuk menampilkan file HTML login kita.

```java
@Controller
public class LoginController {

	@GetMapping("/loginPage")
	public String login() {
		return "login-page";
	}
}
```

## 3️⃣ Membuat View untuk custom Login Page

Gunakan Thymeleaf untuk membuat form. Spring Security secara otomatis mencari parameter `username` dan `password`. Buat file `login-page.html` di `src/main/resources/templates/`:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
	<head>
		<title>Login Page</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<style>
			.error {
				color: orangered;
			}
		</style>
	</head>
	<body>
		<h2>Login</h2>
		
		<form th:action="@{/authentication}" method="post">
			<!-- Check login error -->
			<div th:if="${param.error}">
				<i class="error">Upps!!! your username / password invalid</i>
			</div>
			
			<p>Username: <input type="text" name="username" /></p> 
			<p>Password: <input type="password" name="password" /></p> 
			<input type="submit" value="Login" />
		</form>
	</body>
</html>
```

* Halaman Login.

![Spring Security](/img/spring/spring-security4.png)

* Halaman Login jika autentikasi gagal.

![Spring Security](/img/spring/spring-security5.png)

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-mvc-security/tree/main/03-belajar-springboot-security-custom-login-form
:::

---

## ✨ Menggunakan Bootstrap

Untuk mempercantik tampilan, kita bisa mengintegrasikan framework CSS seperti [Bootstrap](https://getbootstrap.com/) melalui CDN di dalam file HTML tersebut. 

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">

<head>
	<title>Login Page</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
		integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
	<style>
		body {
			background-color: #f8f9fa;
		}

		.login-container {
			min-height: 100vh;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.card-login {
			width: 100%;
			max-width: 400px;
			padding: 20px;
			border-radius: 15px;
			border: none;
		}
	</style>
</head>

<body>
	<div class="container login-container">
		<div class="card card-login shadow">
			<div class="card-body">
				<h3 class="text-center mb-4 fw-bold">Selamat Datang</h3>
				<p class="text-muted text-center mb-4">Silakan masuk ke akun Anda</p>

				<form th:action="@{/authentication}" method="post">
					<!-- Pesan Error -->
					<div th:if="${param.error}">
						<div class="alert alert-danger py-2" role="alert">
							<small>Upps!!! username atau kata sandi Anda salah.</small>
						</div>
					</div>

					<!-- Input Email -->
					<div class="form-floating mb-3">
						<input type="text" class="form-control" id="floatingInput" name="username" placeholder="Username"
							required>
						<label for="floatingInput">Username</label>
					</div>

					<!-- Input Password -->
					<div class="form-floating mb-3">
						<input type="password" class="form-control" id="floatingPassword" name="password" placeholder="Password"
							required>
						<label for="floatingPassword">Kata Sandi</label>
					</div>

					<!-- Tombol Login -->
					<button class="btn btn-primary w-100 py-2 fw-bold" type="submit">Masuk</button>
				</form>
			</div>
		</div>
	</div>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
		crossorigin="anonymous"></script>
</body>

</html>
```

* Halaman Login.

![Spring Security](/img/spring/spring-security6.png)

* Halaman Login jika autentikasi gagal.

![Spring Security](/img/spring/spring-security7.png)

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-mvc-security/tree/main/04-belajar-springboot-security-custom-login-form-bootstrap
:::
