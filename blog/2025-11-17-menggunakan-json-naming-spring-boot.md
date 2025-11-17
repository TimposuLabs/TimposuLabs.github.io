---
slug: menggunakan-json-naming-spring-boot
title: Menggunakan @JsonNaming di Spring Boot REST API
authors: topekox
tags: [spring, springboot, json]
---

Menggunakan `@JsonNaming` di Spring Boot (tepatnya pada kelas model yang digunakan untuk serialisasi dan deserialisasi JSON oleh Jackson, yang merupakan default di Spring Boot) sangat penting untuk mengatur bagaimana nama properti Java (misalnya, `firstName`) dipetakan ke nama field dalam payload JSON (misalnya, `first_name`).

<!--truncate-->

## 🫤 Tujuan Utama

Tujuan utamanya adalah untuk memastikan konsistensi dan kompatibilitas antara konvensi penamaan Java dan standar penamaan JSON yang umum digunakan.

1. Konsistensi Penamaan (Naming Convention)
    * Java Standard: Konvensi di Java umumnya menggunakan __Camel Case__ (misalnya, `userAddress`, `userId`).

    * JSON/Web Standard: Dalam pengembangan web, terutama dengan API REST, konvensi penamaan seperti __Snake Case__ (misalnya, `user_address`, `user_id`) atau __Kebab Case__ sering menjadi standar yang diharapkan oleh client (seperti frontend JavaScript atau aplikasi mobile).

Dengan `@JsonNaming`, Anda dapat secara otomatis mengubah penamaan properti Java ke format JSON yang diinginkan tanpa harus menambahkan anotasi `@JsonProperty` ke setiap properti secara manual.

2. Memudahkan Pengembang
    * __Kode Lebih Bersih:__ Daripada menulis:

```java
// Tanpa @JsonNaming
@JsonProperty("user_name")
private String userName;

@JsonProperty("last_login")
private LocalDateTime lastLogin;
```

Kita cukup menggunakan `@JsonNaming` di tingkat Class:

```java
// Dengan @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
private String userName;  // Akan menjadi "user_name"
private LocalDateTime lastLogin; // Akan menjadi "last_login"
```

Ini sangat mengurangi boilerplate code (kode berulang) pada kelas model Anda.

3. Kompatibilitas dengan Ekosistem Lain

Banyak bahasa pemrograman dan framework lain (seperti Python/Django, Ruby on Rails) secara default menggunakan __Snake Case__ untuk field JSON. Menggunakan `@JsonNaming` membantu API Spring Boot Anda lebih mudah diintegrasikan dan dipahami oleh client yang dibangun dengan ekosistem tersebut.

## 🛠️ Contoh Penggunaan

Anotasi ini biasanya menggunakan salah satu strategy dari `PropertyNamingStrategies` milik Jackson:

| Strategi (`PropertyNamingStrategies`) |	Format Properti Java | Format JSON yang Dihasilkan	| Kapan Digunakan |
| --- | --- | --- | ---|
| `SnakeCaseStrategy` |	`firstName` | 	`first_name` |	Paling umum untuk API REST. |
| `KebabCaseStrategy` | `productName` |	`product-name` |	Terkadang digunakan, tapi kurang umum. |
| `LowerCamelCaseStrategy` |	`userAddress` |	`userAddress` |	Default Jackson, tidak perlu anotasi jika ini yang diinginkan. |
| `UpperCaseStrategy`	| `itemName` |	`ITEM_NAME` |	Jarang digunakan untuk API, lebih ke konstanta. |

__Contoh Implementasi :__

```java
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class User {
    private Long userId; // Serialisasi: "user_id"
    private String firstName; // Serialisasi: "first_name"

    // Getters and Setters...
}
```

## ⚙️ Cara Mengatur Penamaan Global di Spring Boot

1. __Menggunakan `application.properties`__

* File `application.properties`

```properties
# Mengatur semua properti JSON menjadi snake_case
spring.jackson.property-naming-strategy=SNAKE_CASE
```

* File `application.yml`

```yml
spring:
  jackson:
    property-naming-strategy: SNAKE_CASE
```

__Hasil:__ Semua field dalam respons JSON akan diubah dari Camel Case (e.g., `userName`) menjadi Snake Case (e.g., `user_name`).

2. __Menggunakan Konfigurasi Java (Cara Fleksibel)__

Jika Anda membutuhkan konfigurasi yang lebih kompleks atau ingin memiliki kontrol penuh atas `ObjectMapper`, Anda bisa membuatnya sebagai Bean konfigurasi:

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        
        // 1. Mengatur strategi penamaan (misalnya ke Snake Case)
        mapper.setPropertyNamingStrategy(
            PropertyNamingStrategies.SNAKE_CASE
        );
        
        // 2. Tambahkan konfigurasi lain yang mungkin Anda butuhkan,
        //    misalnya untuk menangani tipe data waktu (LocalDateTime, dll.)
        
        return mapper;
    }
}
```

Dengan cara ini, Bean `ObjectMapper` yang Anda definisikan akan menimpa default yang dibuat oleh Spring Boot, dan semua controller Anda akan menggunakannya.
