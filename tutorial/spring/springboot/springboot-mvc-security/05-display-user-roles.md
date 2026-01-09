---
sidebar_position: 5
title: 'Display User ID & Roles'
---

Materi ini akan membahas cara menampilkan informasi pengguna/user yang sedang masuk (*logged-in user*), seperti **Username** dan **Roles**, langsung pada halaman web menggunakan T**hymeleaf Extras Spring Security**.

Kita perlu melakukan integrasi antara Spring Security dan Thymeleaf.

## 1️⃣ Persiapan Dependensi

Untuk mengakses data security di dalam HTML, kita memerlukan library tambahan. Pastikan dependensi berikut ada di file `pom.xml` anda:

```xml
<dependency>
    <groupId>org.thymeleaf.extras</groupId>
    <artifactId>thymeleaf-extras-springsecurity6</artifactId>
</dependency>
```

## 2️⃣ Menghubungkan Namespace di HTML

Agar tag khusus keamanan dapat digunakan, kita harus menambahkan *namespace* `sec` pada tag `<html>` di file View Anda (misalnya `home.html`):

```html
<html xmlns:th="http://www.thymeleaf.org"
      xmlns:sec="www.thymeleaf.org">
```

## 3️⃣ Cara Menampilkan User ID (Username) dan Roles (Otoritas)

* Untuk menampilkan nama pengguna yang sedang aktif, gunakan atribut `sec:authentication="name"`. Spring Security secara otomatis mengambil informasi ini dari objek `UserDetails`. 

```html
Logged in as: <span sec:authentication="principal.username"></span>
```

*Jika Anda login sebagai "ucup", maka teks akan menjadi "ucup".*

* Menampilkan Role sedikit berbeda karena satu pengguna bisa memiliki banyak Role. Kita bisa menggunakan objek `principal.authorities`.

```html
Roles: <span sec:authentication="principal.authorities"></span>
```

*Hasilnya akan muncul seperti: `[ROLE_GUEST, ROLE_USERS, ROLE_ADMIN]`.*

* Contoh kode lengkapnya pada `home.html`:

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
		<form th:action="@{/logout}" method="post">
			<button type="submit">Logout</button>	
		</form>
	</body>
</html>
```

* Contoh login dengan user yang memiliki role **GUEST, USERS, ADMIN**:

![Spring Security](/img/spring/spring-security10.png)

* Contoh login dengan user yang hanya memiliki role **GUEST**:

![Spring Security](/img/spring/spring-security11.png)

:::info
**Source Code**: https://github.com/TimposuLabs/belajar-springboot-mvc-security/tree/main/06-belajar-springboot-security-display-user-roles
:::
