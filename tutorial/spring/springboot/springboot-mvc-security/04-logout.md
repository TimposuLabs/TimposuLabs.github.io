---
sidebar_position: 4
title: 'Logout'
---

Materi ini akan membahas cara mengimplementasikan fitur **Logout** yang aman pada Spring Boot MVC Security. Proses logout tidak hanya sekadar menghapus session, tetapi juga memastikan perlindungan terhadap serangan pembajakan session.

## 🤔 Apa yang Terjadi Saat Logout?

Ketika proses logout dipicu, Spring Security secara otomatis melakukan beberapa hal berikut:

1. Menghapus (membatalkan) **HTTP Session**.
2. Menghapus **SecurityContextHolder** (membersihkan identitas pengguna yang sedang login).
3. Menghapus **Remember-Me Authentication** (jika dikonfigurasi).
4. Mengarahkan pengguna kembali ke halaman login atau halaman utama.

## 🚀 Implementasi Logout

Step by step membuat logout:

1. Menambahkan konfigurasi logout pada Spring Security Configuration.
2. Membuat logout button di home page.
3. Update login page dengan menambahkan logout message.

### 1️⃣ Konfigurasi pada Security Configuration

Secara default, Spring Security sudah mengaktifkan fitur logout pada URL `/logout`.

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
	
	// konfig custom login page
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
		
		httpSecurity.authorizeHttpRequests(configurer -> 
					configurer
						.anyRequest().authenticated()
				).formLogin(form ->
					form
						.loginPage("/loginPage")
						.loginProcessingUrl("/authentication")
						.permitAll()
				).logout(logout -> 
					logout.permitAll() // menambahkan aksi logout
				);
		
		return httpSecurity.build();
	}
}
```

:::tip
Kita dapat melakukan customise logout untuk *best practice*, dengan beberapa konfigurasi tambahan:

```java
.logout(logout -> 
            logout
                .logoutUrl("/perform_logout") // Opsional: Ubah URL logout default
                .logoutSuccessUrl("/loginPage?logout") // Arahkan ke sini setelah sukses
                .invalidateHttpSession(true) // Hapus session dari server
                .deleteCookies("JSESSIONID") // Hapus cookie di browser
                .permitAll()
    );
```
:::

## 3️⃣ Menambahkan Tombol Logout pada View (Thymeleaf)

Untuk membuat tombol logout, sangat disarankan menggunakan metode **POST** untuk alasan keamanan (mencegah serangan CSRF).
Berikut adalah contoh implementasi pada file HTML (misalnya `home.html`):

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
		<hr>

		<form th:action="@{/logout}" method="post">
			<button type="submit">Logout</button>	
		</form>
	</body>
</html>
```

* **`th:action="@{/logout}"`**: Thymeleaf akan otomatis menyisipkan token CSRF tersembunyi ke dalam form ini. Tanpa token ini, permintaan logout akan ditolak demi keamanan.

![Spring Security](/img/spring/spring-security8.png)

## 4️⃣ Menangani Pesan Logout Sukses

Kita akan memperbaharui `login-page.html` untuk menangkap parameter `logout`, jika user berhasil keluar, URL akan berubah menjadi `/loginPage?logout`, dan pesan sukses akan muncul:

```html
<!-- Pesan Logout yang muncul di halaman login setelah sukses logout -->
<div th:if="${param.logout}">
    <div class="alert alert-success py-2" role="alert">
        <small>Anda telah berhasil logout.</small>
    </div>
</div>
```

![Spring Security](/img/spring/spring-security9.png)

## 👌 Best Practice Logout

* **Gunakan POST**: Hindari menggunakan link `<a>` (GET) untuk logout karena dapat dipicu secara tidak sengaja oleh *crawler* atau serangan CSRF.
* **Hapus Cookies**: Selalu pastikan `JSESSIONID` dihapus agar sesi benar-benar bersih di sisi klien.
* **Invalidasi Sesi**: Pastikan `invalidateHttpSession(true)` tetap aktif (default) untuk mencegah penggunaan kembali ID sesi yang lama.

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-mvc-security/tree/main/05-belajar-springboot-security-logout
:::
