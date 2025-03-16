---
slug: spring-boot-crud-rest-mysql-java-record-dto
title: Step-by-Step Membangun Spring Boot CRUD REST API dengan MySQL dan Java Record DTO
authors: topekox
tags: [springboot, spring, rest, api, mysql]
---

Pada tutorial ini, kita akan membuat aplikasi Spring Boot CRUD (Create, Read, Update, Delete) menggunakan MySQL sebagai database. Kita akan menggunakan Java record sebagai DTO (Data Transfer Object) untuk mentransfer data antara client dan server.

<!--truncate-->


> __Baca Juga: [Arsitektur Spring Boot - Controller, Service, Repository dan Database](/blog/spring-boot-arsitektur-controller-service-repository-database-flow)__

<img src="/img/general/Spring-boot-diagram1.svg"/>

## 💪 Syarat

Pada tutorial kali ini kita menggunakan:

* ✔️ Java Development Kit (JDK) 21 atau yang terbaru.
* ✔️ Apache Maven (Project Manajemen).
* ✔️ MySQL (Database).
* ✔️ IDE (Intellij IDEA, Eclipse, Netbeans atau VS Code).
* ✔️ Postman atau cURL (test API).

## 1️⃣ Setting Project

Buat project Spring Boot di [Spring Initializr](https://start.spring.io/) dengan dependency:

* ✔️ __Spring Web__: untuk membangun RESTful web service.
* ✔️ __Spring Data JPA__: untuk berinteraksi dengan database menggunakan JPA (Java Persistence API).
* ✔️ __MySQL Driver__: untuk menghubungkan Spring Boot dengan database MySQL.

 ### 📌 Dependency

Dependency pada `pom.xml`:

```xml
<!-- Spring Data JPA-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Spring Web-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- MySQL Driver-->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

## 2️⃣ Konfigurasi MySQL

### ✅ Membuat Database

Buat database:

```sql
CREATE DATABASE spring_boot_app;
```

### ✅ Konfigurasi `application.properties`

Pada file `src/main/resources/application.properties` kita perlu melakukan konfigurasi agar Spring Boot terhubung ke database MySQL:

```
spring.datasource.url=jdbc:mysql://localhost:3306/spring_boot_app
spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
```

* `spring.datasource.url`: URL JDBC untuk menghubungkan ke database MySQL.
* `spring.datasource.driverClassName=com.mysql.cj.jdbc.Driver`: Class driver MySQL.
* `spring.datasource.username` dan `password`: Kredensial yang digunakan untuk terhubung ke database.
* `spring.jpa.hibernate.ddl-auto=update`: Memastikan Hibernate secara otomatis membuat atau memperbarui schema database berdasarkan mapping entity yang dibuat.
* `spring.jpa.show-sql=true`: Mengaktifkan pencatatan queri SQL ke console log, berguna untuk debugging.

## 3️⃣ Membuat Entity / Model

Membuat Entity `Product` dalam fotmat POJO, untuk mewakili tabel `product` dalam database:

```java
package com.timposulabs.demo_spring_boot_rest_api.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private BigDecimal price;

    public Product() {
    }

    public Product(Long id, String name, String description, BigDecimal price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}

```

Class entity yang dibuat adalah representasi product, dengan field `id`, `name`, `description` dan `price`.

## 4️⃣ Membuat Repository

Membuat interface Product Repository:

```java
package com.timposulabs.demo_spring_boot_rest_api.repository;

import com.timposulabs.demo_spring_boot_rest_api.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
```

`JpaRepository` Menyediakan semua operasi CRUD yang diperlukan seperti `save()`, `findAll()`, `findById()`, `deleteById()` dan tanpa perlu menulisnya sendiri.

## 5️⃣ Membuat Java Record untuk DTO

Java Record adalah class khusus di Java yang berguna untuk mengurangi kode boilerplate, dengan secara otomatis menghasilkan constructor, getter, setter. Ini ideal untuk DTO yang bertugas untuk membawa data antara server dan client.

```java
package com.timposulabs.demo_spring_boot_rest_api.dto;

import java.math.BigDecimal;

public record ProductDTO(Long id, String name, String description, BigDecimal price) {
}
```

## 6️⃣ Membuat Service Layer

### ✅ Membuat Interface Service

```java
package com.timposulabs.demo_spring_boot_rest_api.service;

import com.timposulabs.demo_spring_boot_rest_api.dto.ProductDTO;

import java.util.List;

public interface ProductService {
    List<ProductDTO> findAll();
    ProductDTO findById(Long id);
    ProductDTO save(ProductDTO productDTO);
    ProductDTO update(Long id, ProductDTO productDTO);
    void delete(Long id);
}
```

### ✅ Mengimplementasikan Product Service

Dalam implementasi service, kita akan menambahkan logic konversi antara Product (entity) dan EntityDTO (DTO):

```java
package com.timposulabs.demo_spring_boot_rest_api.service;

import com.timposulabs.demo_spring_boot_rest_api.dto.ProductDTO;
import com.timposulabs.demo_spring_boot_rest_api.model.Product;
import com.timposulabs.demo_spring_boot_rest_api.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductDTO> findAll() {
        return productRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO findById(Long id) {
        return productRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("ID Not Found"));
    }

    @Override
    public ProductDTO save(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        return convertToDTO(productRepository.save(product));
    }

    @Override
    public ProductDTO update(Long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ID Not Found"));
        product.setName(productDTO.name());
        product.setDescription(productDTO.description());
        product.setPrice(productDTO.price());
        return convertToDTO(productRepository.save(product));
    }

    @Override
    public void delete(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ID Not Found"));
        productRepository.delete(product);
    }

    // Conversion between DTO to Entity
    private ProductDTO convertToDTO(Product product) {
        return new ProductDTO(product.getId(), product.getName(), product.getDescription(), product.getPrice());
    }

    private Product convertToEntity(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.name());
        product.setDescription(productDTO.description());
        product.setPrice(productDTO.price());
        return product;
    }
}
```

* Konversi logic (antara Entitas dan DTO) disimpan di layer service untuk menjaga controller tetap bersih dan hanya berfokus pada penanganan request HTTP.
* Method ini mengonversi entity __Product__ menjadi __ProductDTO__, begitupun sebaliknya.

## 7️⃣ Membuat Controller 

Dalam layer ini, kita akan membuat Controller untuk REST API:

```java
package com.timposulabs.demo_spring_boot_rest_api.controller;

import com.timposulabs.demo_spring_boot_rest_api.dto.ProductDTO;
import com.timposulabs.demo_spring_boot_rest_api.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProduct() {
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.save(productDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(productService.update(id, productDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

* __GET, POST, PUT, dan DELETE__ HTTP adalah method yang digunakan untuk CRUD operations.
* Controller tidak memiliki bussines logic. Dia hanya berfungsi untuk mengatur request ke layer Service dan memberikan response ke Client. Ini membuat kode lebih clean dan menjadi mudah untuk dimaintain.


## 8️⃣ Running dan Testing API

Jalankan aplikasi dan lakukan pengujian dari client bisa menggunakan Postman atau cURL.

### 🔥 Testing

✅ __GET__ all product:

* URL: `http://localhost:8080/api/product`

✅ __GET__ product by ID:

* URL: `http://localhost:8080/api/product/{id}`

✅ __POST__ membuat product baru:

* URL: `http://localhost:8080/api/product`
* Body: 

```json
{
  "name" : "Macbook Pro",
  "description" : "New Macbook 2025",
  "price" : 2500000
}
```

✅ __PUT__ update product by ID:

* URL: `http://localhost:8080/api/product/{id}`
* Body: 

```json
{
  "name" : "Macbook Air",
  "description" : "New Macbook Air 2025",
  "price" : 1500000
}
```

✅ __DELETE__ menghapus data product by ID:

* URL: `http://localhost:8080/api/product/{id}`

---

## ⚡ Handle Exception

Dari aplikasi di atas yang sudah dibuat, yang diperlu ditambakan adalah handle Exception. Dimana pada aplikasi di atas masih terdapat Runtime Exception apabila kita mencari data yang tidak terdapat ID nya, yang mana akan menghasilkan HTTP status `500` atau Internal Server Error yang merupakan pesan error yang keliru karena harusnya HTTP status yang benar adalah `NOT_FOUND`.

### 1️⃣ Membuat API Error

Kita akan membuat standard response API seperti berikut:

```json
{
  "error": "ID Not Found",
  "path": "/api/product/1",
  "status": 404,
  "timestamp": "2025-03-16T12:40:42.311569409"
}
```

Penjelasan:

* `error` : Keterangan Error.
* `path` : URL Request API penyebab error.
* `status` : Kode HTTP status.
* `timestamp` : Keterangan waktu error dalam format timestamp.

Kita akan mengikuti format response API di atas dengan membuat Java Record:

```java
package com.timposulabs.demo_spring_boot_rest_api.exception;

import java.time.LocalDateTime;

public record ApiError(
        String error,
        String path,
        int status,
        LocalDateTime timestamp) {
}
```

### 2️⃣ Membuat Class NotFoundException

Selanjutnya membuat custom class `NotFoundException` extends dari `RuntimeException`:

```java
package com.timposulabs.demo_spring_boot_rest_api.exception;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}
```

### 3️⃣ Membuat Exception Handler

Selanjutnya membuat Exception Handler yang menggunakan annotation `@ControllerAdvice`, yang mana Spring akan menjalankan Advice terlebih dahulu untuk menangkap exception yang ada. Maka dari itu semua class exception yang ada pada `ExceptionHandler` akan dihandle dalam class ini, dalam kasus ini exception `NotFoundException` yang telah kita buat sebelumnya akan dihandle disini.

```java
package com.timposulabs.demo_spring_boot_rest_api.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiError> handleNotFoundException(NotFoundException ex, HttpServletRequest request) {
        ApiError apiError = new ApiError(
                ex.getMessage(),
                request.getRequestURI(),
                HttpStatus.NOT_FOUND.value(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }
}
```

💡 Kita dapat menambahkan class Exception lain dalam class ini untuk meng-handle exception-exception lainnya.

### 4️⃣ Update Service Layer

Selanjutnya kita akan mengupdate Service dengan mengubah `RuntimeException` menjadi `NotFoundException`:

```java
@Override
public ProductDTO findById(Long id) {
    return productRepository.findById(id)
            .map(this::convertToDTO)
            .orElseThrow(() -> new NotFoundException("ID Not Found"));
}

@Override
public ProductDTO update(Long id, ProductDTO productDTO) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("ID Not Found"));
    product.setName(productDTO.name());
    product.setDescription(productDTO.description());
    product.setPrice(productDTO.price());
    return convertToDTO(productRepository.save(product));
}

 @Override
public void delete(Long id) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("ID Not Found"));
    productRepository.delete(product);
}
```

## 🔖 Kesimpulan

Kita sudah membangun aplikasi Spring Boot CRUD REST API dengan MySQL. Kita mengikuti best practice dengan menggunakan Java Record sebagai DTO dan menjaga logic konversi antara Entity dan DTO di layer Service. Dengan memisahkan logic konversi ke dalam layer Service, kita mempertahankan basis kode yang clean dan terstruktur dengan baik yang akan lebih mudah dimaintain dan diperluas/scalability di masa mendatang.

Selain itu kita juga sudah mengimplementasikan Exception Handle yang mana kita mengkustom sendiri exception sesuai kebutuhan.