---
slug: springboot-rest-api-minimal-h2
title: Membuat REST API Spring Boot sederhana menggunakan database H2 
authors: topekox
tags: [springboot, spring, rest, api, h2]
---

👋 Hi Guys.. pada tutorial kali ini kita akan membangun aplikasi Spring Boot sederhana, dengan fitur REST API sederhana dengan menggunakan database H2. Apa itu H2 Database❓, [H2 Database](https://h2database.com/) adalah database ringan (lightweight), yang berjalan di atas memory RAM (in-memory database), dan sudah kompatibel dengan Spring Boot. Jadi kita tidak perlu melakukan instalasi database H2, karena sudah embedded dengan Spring Boot, cukup memasukan dependency-nya ke dalam project Spring Boot 🚀. Jadi sangat cocok untuk testing aplikasi sebelum menggunakan database yang lebih proper seperti MySQL, Postgres, Oracle, MsSQL atau sebagainya 😄.

<!--truncate-->

Project yang akan dibuat sederhana saja, tidak menggunakan banyak layer cukup layer `Controller -> Repository -> Database`. Jadi tutorial kali ini sebenarnya bukan best practice, tapi hanya untuk pembuatan project REST API sederhana 💪.

## ➡️ Alur Arsitektur Aplikasi

```
                   ┌────────────┐       ┌────────────┐      ┌────────────┐
          request  │            │       │            │      │            │
        ──────────►│            ├─────► │            ├─────►│            │
CLIENT             │ Controller │       │ Repository │      │ H2 Database│
        ◄──────────┤            │◄──────┤            │◄─────┤            │
          response │            │       │            │      │            │
                   └────────────┘       └────────────┘      └────────────┘
                                                                                                       
```


## ✅ Dependency pada `pom.xml`

```xml
<!-- Spring Boot Data JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Spring Boot Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Spring Boot H2 Database-->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

## ✅ Konfigurasi Properties

```
spring.datasource.url=jdbc:h2:mem:belajar
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update

spring.h2.console.enabled=true
spring.h2.console.path=/h2
```

## ✅ Membuat Model

```java
import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String description;

    private Double price;

    public Product() {
    }

    public Product(Integer id, String name, String description, Double price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
```

## ✅ Membuat Repository

```java
import com.timposulabs.belajar_springboot_h2.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
```

# ✅ Membuat Controller

```java
import com.timposulabs.belajar_springboot_h2.model.Product;
import com.timposulabs.belajar_springboot_h2.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private final ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    // ✅ GET: Get All Product (200 OK / 204 No Content)
    @GetMapping
    ResponseEntity<List<Product>> getAll() {
        List<Product> list = repository.findAll();

        if (list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // ✅ GET: Get by Id Product (200 OK / 404 Not Found)
    @GetMapping("/{id}")
    ResponseEntity<Product> getById(@PathVariable Integer id) {
        Optional<Product> product = repository.findById(id);
        return product.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // ✅ POST: Create Book
    @PostMapping("/add")
    ResponseEntity<Product> add(@RequestBody Product product) {
        Product p = repository.save(product);
        return new ResponseEntity<>(p, HttpStatus.OK);
    }

    // ✅ PUT: Update Book (200 OK / 404 Not Found)
    @PutMapping("/{id}")
    ResponseEntity<Product> update(@PathVariable Integer id, @RequestBody Product product) {
        Optional<Product> p = repository.findById(id);

        if (p.isPresent()) {
            Product updateProduct = p.get();
            updateProduct.setName(product.getName());
            updateProduct.setDescription(product.getDescription());
            updateProduct.setPrice(product.getPrice());

            return new ResponseEntity<>(repository.save(updateProduct), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // ✅ DELETE: Delete Book (200 OK)
    @DeleteMapping("/delete/{id}")
    ResponseEntity<Product> delete(@PathVariable Integer id) {
        repository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
```