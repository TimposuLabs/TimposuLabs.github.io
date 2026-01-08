---
sidebar_position: 2
title: 'Basic Configuration'
---

Pada materi ini kita akan menggunakan **Basic Configuration** dengan **In-Memory Authentication** yang menyimpan data pengguna/user di dalam memori (RAM). Konfigurasi ini cara tercepat untuk melakukan simulasi user/pengguna tanpa perlu menggunakan database.

## 🦸 User

Kita akan membuat konfigurasi user dengan akses level:

| User ID | Password | Roles |
| --- | --- | --- |
| `aco` | `test123` | (**GUEST**): Level terendah. |
| `ade` | `test123`	| (**GUEST, USERS**): Memiliki akses tamu dan akses pengguna reguler.|
| `ucup` | `test123` | (**GUEST, USERS, ADMIN**): Level tertinggi (Super User). |

## 🔐 Spring Security Password Storage

* Format standar penyimpanan password di Spring Security adalah:

```
{id}encodedPassword
```

* Contoh beberapa algoritma yang bisa digunakan:

| ID | Description |
| --- | --- |
| `{noop}test123` | Menggunakan **No-Op** (Teks biasa/plain text, tidak direkomendasikan untuk production).|
| `{bcrypt}$2a$10$dXJ... ` | Menggunakan **BCrypt** (Standar industri saat ini). |
| `{argon2}$argon2id$...`  | Menggunakan **Argon2** (Sangat kuat, tahan terhadap serangan GPU). |

:::info
Selain algoritma di atas masih banyak algoritma lain yang bisa digunakan pada Spring Security.
:::

## 🚀 Implementasi Spring Security Configuration

### 1️⃣ Membuat Spring Security Configuration (`@Configuration`)

* Buat Class Configuration untuk Spring Security contoh dengan nama `SecurityConfig.java`, dengan membuat user dan password plain `test123`:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

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
}
```

### 3️⃣ Controller

* Buat class Java contoh `DemoController` di `src/main/java/...`
* Gunakan anotasi `@Controller` dan `@GetMapping` untuk memetakan URL ke method:

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DemoController {

	@GetMapping("/")
	public String home() {
		return "home";
	}
}
```

### 4️⃣ View

Buat file `home.html` di `src/main/resources/templates/` (untuk Thymeleaf):

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
	<head>
		<title>Belajar Spring CRUD Security</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	</head>
	<body>
		<h2>TimposuLabs Company</h2>
		<hr />
		Welcome to our company homepage.
	</body>
</html>
```

### 5️⃣ Jalankan Aplikasi

* Buka terminal di root project.
* Jalankan dengan perintah Maven: `mvn spring-boot:run`.
* Buka browser dan akses http://localhost:8080/. Masukan username dan password sesuai dengan konfigurasi yang dibuat.

![Spring Security](/img/spring/spring-security3.png)

* Jika otentikasi sukses maka akan di arahkan ke halaman `home`.

![Spring Security](/img/spring/spring-security2.png)

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-mvc-security/tree/main/01-belajar-springboot-security
:::

---

## 🔑 Implementasi BCrypt

Untuk meningkatkan keamanan dari kode `InMemoryUserDetailsManager` kita sebelumnya, kita bisa menggunakan `BCryptPasswordEncoder`.

### Langkah 1: Daftarkan Bean Password Encoder

Tambahkan ini di dalam class `SecurityConfig`:

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

### Langkah 2: Gunakan Encoder pada User Details

Ubah `{noop}`, gunakan objek `encoder` untuk mengamankan password:

```java
@Bean
public InMemoryUserDetailsManager userDetailsManager(PasswordEncoder encoder) {
    
    UserDetails ucup = User.builder()
            .username("ucup")
            .password(encoder.encode("test123")) // Hasilnya akan otomatis diawali {bcrypt}
            .roles("ADMIN")
            .build();
            
    return new InMemoryUserDetailsManager(ucup);
}
```

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-mvc-security/tree/main/02-belajar-springboot-security-basic-configuration
:::
