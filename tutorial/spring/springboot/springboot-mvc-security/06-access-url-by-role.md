---
sidebar_position: 6
title: 'Akses URL Berdasarkan Role'
---

Materi ini akan membahas cara memberikan akses URL berdasarkan Role pengguna. Praktik terbaik adalah menggunakan pendekatan **Least Privilege** (hak akses minimal), di mana semua URL dikunci secara default, dan hanya dibuka sesuai peran masing-masing.

## 💡 Struktur Akses (Skenario Kasus)

Berdasarkan user yang kita buat sebelumnya (Aco, Ade, Ucup), kita akan membagi hak akses sebagai berikut:

* **Public/Guest (`/`)**: Bisa diakses semua orang yang sudah login.
* **User Area (`/user/**`)**: Hanya untuk Role **USERS** ke atas (Ade dan Ucup).
* **Admin Area (`/admin/**`)**: Eksklusif hanya untuk Role **ADMIN** (Ucup saja).

## 👨🏻‍💻 Contoh Kasus

Mari kita hubungkan dengan user **Aco**, **Ade**, dan **Ucup** yang kita buat pada materi [Basic Configuration](/spring/springboot/springboot-mvc-security/basic-configuration) (*In-Memory Authentication*):

### Kasus A: Aco (Role: GUEST)

* Membuka `/` → **BERHASIL**.
* Membuka `/user/profile` → **DITOLAK** (Diarahkan ke `/access-denied`).
* Membuka `/admin/dashboard` → **DITOLAK**.

### Kasus B: Ade (Role: GUEST, USERS)

* Membuka `/` → **BERHASIL** (Karena Ade punya role GUEST).
* Membuka `/user/profile` → **BERHASIL** (Karena Ade punya role USERS).
* Membuka `/admin/dashboard` → **DITOLAK** (Diarahkan ke `/access-denied`).

### Kasus C: Ucup (Role: GUEST, USERS, ADMIN)

* Membuka semua URL (`/`, `/user/**`, `/admin/**`) → **SEMUA BERHASIL**.

## 1️⃣ Konfigurasi pada Security Configuration (`SecurityFilterChain`)

* Gunakan method `.requestMatchers()` untuk menentukan pola URL dan peran yang diizinkan.

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
    
    httpSecurity.authorizeHttpRequests(configurer -> 
                configurer
                    .requestMatchers("/").hasRole("GUEST") // 1. URL '/' bisa diakses oleh siapa saja yang punya role GUEST
                    .requestMatchers("/user/**").hasAnyRole("USERS", "ADMIN") // 2. URL yang berawalan '/leaders/' wajib punya role USERS
                    .requestMatchers("/admin/**").hasRole("ADMIN") // 3. URL yang berawalan '/systems/' wajib punya role ADMIN
                    .anyRequest().authenticated() // 4. Semua request lainnya wajib autentikasi (login)
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

* Baris `.accessDeniedPage("/access-denied")` adalah kunci dari pengalaman pengguna yang baik.
Jika contohnya Ade mencoba mengakses `/admin/**`, ia tidak akan melihat error "Whitelabel Error Page (403)", melainkan akan diarahkan ke halaman kustom yang dibuat.

## 2️⃣ Update Controller

* Controller untuk Halaman Home setelah login.

```java
@Controller
public class DemoController {

	@GetMapping("/")
	public String home() {
		return "home";
	}

	@GetMapping("/admin")
	public String admin() {
		return "admin";
	}

	@GetMapping("/user")
	public String user() {
		return "user";
	}
}
```

* Controller untuk login page dan access denied page

```java
@Controller
public class LoginController {

	@GetMapping("/loginPage")
	public String login() {
		return "login-page";
	}

	@GetMapping("/access-denied")
	public String accessDenied() {
		return "access-denied";
	}
}
```

## 3️⃣ View Page

Buat file `home.html`, `login-page.html`, `admin.html`, `user.html` dan `access-denied.html` di `src/main/resources/templates/` (untuk Thymeleaf):

* Login Page `login-page.html`:

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

					<!-- Pesan Logout -->
					<div th:if="${param.logout}">
						<div class="alert alert-success py-2" role="alert">
							<small>Anda telah berhasil logout.</small>
						</div>
					</div>

					<!-- Input Username -->
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

* Home Page `home.html`:

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

* Admin Page `admin.html`:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
    <head>
        <title>Admin Page</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	</head>
	<body>
        <h2>Admin Page</h2>
		<hr />
		Welcome to the admin page.
        <hr>
        <p>
            <a th:href="@{/}">Home Page</a>
        </p>
	</body>
</html>
```


* User Page `user.html`:

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
    <head>
        <title>User Page</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	</head>
	<body>
        <h2>User Page</h2>
		<hr />
		Welcome to the user page.
        <hr>
        <p>
            <a th:href="@{/}">Home Page</a>
        </p>
	</body>
</html>
```

* Access Denied Page `access-denied.html`:

```html
<!DOCTYPE html>
<html  xmlns:th="http://www.thymeleaf.org">
    <head>
        <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Access Denied</title>
</head>
<body>
    <h2>Access Denied</h2>
    <p>You do not have permission to access this page.</p>
    <p><a th:href="@{/}">Return to Home Page</a></p>
</body>
</html>
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

* User "ucup" ketika mengakses page `/admin` dan `/user`:

![Spring Security](/img/spring/spring-security15.png)
