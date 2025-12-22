---
sidebar_position: 20
title: 'Custom Validation'
---

Dalam Spring Boot MVC kita dapat membuat Custom Validation yaitu membuat aturan validasi sendiri jika anotasi standar (seperti `@NotNull` atau `@Min`) tidak cukup untuk memenuhi logika bisnis yang kompleks.

Misalnya kita ingin membuat validation `@DiscountCode` yang harus memiliki kode awalan sesuai keinginan kita misalnya default `PROMO`:

```java
@DiscountCode // default PROMO
@NotNull(message = "Is Required")
private String discountCode;
```

Tapi nantinya value dari `@DiscountCode` dapat diubah misalnya `@DiscountCode(value = "NEWYEAR", message = "Must start with NEWYEAR")`.

Berikut langkahnya:

### 1️⃣ Membuat Custom Annotation

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Constraint(validatedBy = DiscountCodeConstraintValidator.class) // Menghubungkan ke class logic
@Target({ElementType.FIELD, ElementType.METHOD}) // Bisa dipakai di field atau method
@Retention(RetentionPolicy.RUNTIME) // Tetap ada saat aplikasi berjalan
public @interface DiscountCode {

	// default discount code dengan value 'PROMO` jika tidak didefinisikan
	public String value() default "PROMO";
	
	// dafault error message
	public String message() default "must start with PROMO";
	
	// default group dari Bean Validation (wajib ada)
	public Class<?>[] groups() default {};
	
	// default payloads dari Bean Validation (wajib ada)
	public Class<? extends Payload>[] payload() default {};
}
```

### 2️⃣ Membuat Class Validator

Class ini berisi logika untuk mengecek apakah data yang diinput pengguna valid atau tidak. Kelas ini harus mengimplementasikan `ConstraintValidator`.

```java
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DiscountCodeConstraintValidator implements ConstraintValidator<DiscountCode, String> {

	private String prefix;
	
	@Override
	public void initialize(DiscountCode discountCode) {
		prefix = discountCode.value();
	}
	
	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		
		boolean result; 
		
		if (value != null) {
			result = value.startsWith(prefix); // mencocokan prefix awalan value discount code
		} else {
			result = true;
		}
		
		return result;
	}
}
```

### 3️⃣ Menggunakan Anotasi di Model

Setelah dibuat, kita bisa menggunakannya semudah menggunakan anotasi yang lain.

```java
@DiscountCode
@NotNull(message = "Is Required")
private String discountCode;
```

### 4️⃣ Controller

Sama seperti validasi standar, Anda hanya perlu menambahkan `@Valid` di Controller.

```java
@PostMapping("/process")
public String processForm(
        @Valid @ModelAttribute("person") Person person,
        BindingResult bindingResult) {
    
    if (bindingResult.hasErrors()) {
        return "person-form";
    } else {
        return "person-confirm";
    }
}
```

![Spring Boot MVC](/img/spring/springboot-mvc26.png)

Untuk mengubah default value dari `@DiscountCode`, bisa dilakukan dengan cara biasa seperti validation lainnya, misalnya mengganti code `PROMO` dengan `NEWYEAR`:

```java
@DiscountCode(value = "NEWYEAR", message = "Must start with NEWYEAR")
@NotNull(message = "Is Required")
private String discountCode;
```

:::info
Source Code: https://github.com/TimposuLabs/belajar-springboot-mvc/tree/main/17-belajar-spring-mvc-custom-validation
:::
