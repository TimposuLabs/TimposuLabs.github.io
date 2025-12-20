---
sidebar_position: 18
title: 'Validation Integer Required'
---

Ketika membuat field dengan tipe Integer terdapat permasalahan, ketika input yang dimasukan adalah type data yang tidak sesuai, misalnya String.

![Spring Boot MVC](/img/spring/springboot-mvc24.png)

Untuk mengatasi hal ini kita perlu melakukan beberapa langkah.

### 1️⃣ Ubah type datanya menjadi Objek `Integer`

Jika kita menggunakan tipe data primitif `int`, kita tidak dapat memastikan field angka wajib diisi, menggunakan annotation `@NotNull` karena tipe primitif bukan Object. Selain itu Java akan memberikan nilai default 0 jika form dikosongkan. Akibatnya, validasi "Wajib Isi" tidak akan pernah terdeteksi karena sistem menganggap pengguna memasukkan angka 0. Untuk itu kita perlu mengubahnya menjadi objek `Integer`.

::tip
Selalu gunakan tipe data objek `Integer` (dengan huruf kapital I) karena tipe ini bisa bernilai `null` jika tidak diisi.
:::

```java
@NotNull(message = "Is Required") // harus menggunakan Integer object bukan primitive
@Min(value = 1, message = "must greater than or equal to 1")
@Max(value = 60, message = "must less than or equal to 60")
private Integer age;
```

### 2️⃣ Menambahkan file `messages.properties`

Buat file `messages.properties` pada path `src/main/resources`, dan isi parameter di bawah ini.

```properties
typeMismatch.person.age=Invalid Number
```

Pesan di atas akan menjadi custom message ketika error terjadi. Dari mana nama parameter properti ini berasal? nanti akan di bahas di materi selanjutnya.

Ketika melakukan pengujian kembali maka pesan error yang ditampilkan adalah yang custum.

![Spring Boot MVC](/img/spring/springboot-mvc25.png)

:::info
Source Code: https://github.com/TimposuLabs/belajar-springboot-mvc/tree/main/15-belajar-spring-mvc-validation-integer-required
:::
