---
sidebar_position: 19
title: 'Custom Error Names'
---

Pada [materi sebelumnya](/spring/springboot/springboot-mvc/validation-integer-required) kita sudah melakukan *Custom Error Names*. *Custom Error Names* (juga dikenal sebagai *Message Keys*) adalah mekanisme untuk mengganti pesan error default dari Spring yang kaku (seperti `typeMismatch`) dengan pesan yang lebih ramah pengguna dan terorganisir.

Untuk mengetahui Error Names pada validation kita dapat melakukan debugging dengan cara mencetak `BindingResult`.

```java
// Untuk mendapatkan pesan error validation kita bisa memanggil binding result
System.out.println("Binding Result : " + bindingResult.toString());
```

Contoh:

```java
@PostMapping("/process")
public String processForm(
        @Valid @ModelAttribute("person") Person person,
        BindingResult bindingResult) {
    
    System.out.println("Lastname: " + person.getLastName());
    
    // Untuk mendapatkan pesan error validation kita bisa memanggil binding result
    System.out.println("Binding Result : " + bindingResult.toString());
    
    if (bindingResult.hasErrors()) {
        return "person-form";
    } else {
        return "person-confirm";
    }
}
```

Misalnya ketika menjalankan validation:

![Spring Boot MVC](/img/spring/springboot-mvc25.png)

Maka pada output console:

```
Binding Result : org.springframework.validation.BeanPropertyBindingResult: 1 errors
Field error in object 'person' on field 'age': rejected value [q]; codes [typeMismatch.person.age,typeMismatch.age,typeMismatch.java.lang.Integer,typeMismatch]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [person.age,age]; arguments []; default message [age]]; default message [Failed to convert property value of type 'java.lang.String' to required type 'java.lang.Integer' for property 'age'; For input string: "q"]
```

Dari sini kita dapat melihat error names-nya adalah `typeMismatch.person.age`.

### Kesimpulan

Dari sini kita dapat melihat Error Names dengan cara debugging `BindingResult` untuk mengetahui Error Names-nya. Selanjutnya untuk melakukan messages costum error namesnya dapat mengikuti langkah pada [materi sebelumnya](/spring/springboot/springboot-mvc/validation-integer-required).

:::info
Source Code: https://github.com/TimposuLabs/belajar-springboot-mvc/tree/main/16-belajar-spring-mvc-validation-debugging-error-name
:::
