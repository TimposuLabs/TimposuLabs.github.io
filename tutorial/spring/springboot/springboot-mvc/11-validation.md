---
sidebar_position: 13
title: 'Validation'
---

Dalam pengembangan aplikasi Spring Boot, Validation (Validasi) bukan sekadar fitur tambahan, melainkan kebutuhan fundamental, yang dapat digunakan untuk menjaga Integritas Data (Data Integrity). Dalam pengembangan aplikasi Spring Boot, validasi data biasanya dilakukan menggunakan **Bean Validation (JSR 380)** melalui library **Hibernate Validator**.

### 🤔 Beberapa Fitur Validation:

* required
* validate length
* validate numbers
* validate with regular expressions
* custom validation

### 🔥 Validation Annotation yang sering digunakan

| Anotasi	| Fungsi |
| --- | --- |
| `@NotNull` |	Data tidak boleh `null`. |
| `@NotEmpty` |	Data tidak boleh `null` dan panjangnya harus > 0 (untuk String/Collection). |
| `@NotBlank` |	Hanya untuk String, tidak boleh `null` dan bukan spasi kosong. |
| `@Size(min=2, max=30)` |	Membatasi jumlah karakter atau ukuran list. |
| `@Min` / `@Max` |	Membatasi nilai numerik minimum atau maksimum. |
| `@Email` |	Memastikan format input adalah alamat email yang valid. |
| `@Pattern(regexp=...)` |	Validasi menggunakan Regular Expression (Regex).|
| `@Future` / `@Past` | Tanggal harus di masa depan (future) atau masa lalu (past) dari tanggal yang diberikan. |

### 😎 Dependency

Untuk menggunakan Validation dalam Spring Boot, pastikan memiliki dependecy berikut:

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```
