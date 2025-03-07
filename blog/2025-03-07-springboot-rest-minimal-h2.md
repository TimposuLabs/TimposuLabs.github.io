---
slug: springboot-rest-api-minimal-h2
title: Membuat REST API CRUD Spring Boot sederhana menggunakan Database H2 
authors: topekox
tags: [springboot, spring, rest, api, h2]
---

👋 Hi Guys.. pada tutorial kali ini kita akan membangun aplikasi Spring Boot sederhana, dengan fitur REST API sederhana dengan menggunakan database H2. Project yang akan dibuat sederhana saja, tidak menggunakan banyak layer cukup layer `Controller -> Repository -> Database`. Jadi tutorial kali ini sebenarnya bukan best practice, tapi hanya untuk pembuatan project REST API sederhana 💪.

<!--truncate-->

## 📌 Apa itu H2 Database

[H2 Database](https://h2database.com/) adalah database ringan (lightweight), yang berjalan di atas memory RAM (in-memory database), dan sudah kompatibel dengan Spring Boot. Jadi kita tidak perlu melakukan instalasi database H2 decara manual, karena sudah embedded dengan Spring Boot, cukup memasukan dependency-nya ke dalam project Spring Boot 🚀. Jadi sangat cocok untuk testing aplikasi sebelum menggunakan database yang lebih proper seperti MySQL, Postgres, Oracle, MsSQL atau sebagainya.


## 🔁 Alur Arsitektur Aplikasi

```
                   ┌────────────┐       ┌────────────┐      ┌────────────┐
          request  │            │       │            │      │            │
        ──────────►│            ├─────► │            ├─────►│            │
CLIENT             │ Controller │       │ Repository │      │ H2 Database│
        ◄──────────┤            │◄──────┤            │◄─────┤            │
          response │            │       │            │      │            │
                   └────────────┘       └────────────┘      └────────────┘
                                                                                                       
```

### 📌 Client (Pengguna API)

Client adalah layer yang akan berinteraksi dengan API di antaranya seperti browser, mobile, Postman, frontend app dan sebagainya. Client akan:

* ✔️ Akan mengirim HTTP Request (GET, POST, PUT, DELETE)
* ✔️ Akan menerima API Response (Json format)

Contoh client:

* ☑️ API Testing tools (Postman, Curl)
* ☑️ Frontend App (React, Angular, Vue.js)
* ☑️ Mobile App (Iphone, Android)

## ✅ Dependency

Tambahkan dependency yang dibutuhkan pada `pom.xml`

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

Konfigurasi di atas adalah konfigurasi minimal untuk terhubung ke database H2. Beberapa variable yang dimasukan adalah nama database adalah `belajar` dengan url`jdbc:h2:mem:belajar` , `username` adalah `sa` dan tanpa password. Konfigurasi adalah kita mengaktifkan console database H2 ketika dijalankan dengan nilai `true`, serta url path akses consolenya adalah `/h2`. Konfigurasi sisanya adalah konfigurasi JPA dan Hibernate.

## ✅ Membuat Entity

Membuat Entity sebagai table mapping ke database, dalam contoh kali ini kita akan membuat entity Product yang akan di mapping menjadi tabel ke dalama database:

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

🚀 Menggunakan `JpaRepository` untuk standar CRUD, dibanding menbuatnya secara manual 😵‍💫.

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

Membuat `Controller` yang akan mengatur request yang masuk dan memberikan response kepada User dimana dalam kasus ini, menjadikan `Controller` juga sebagai business logic dari aplikasi ini.

## 🧪 Uji Coba API CRUD

Sekarang waktunya untuk testing REST API yang telah dibuat, menggunakan testing tools dengan menggunakan Postman atau cURL. Pada contoh testing kali ini saya menggunakan [cURL](https://curl.se/docs/manpage.html).

Testing yang akan kita coba berdasarkan `Controller` yang telah dibuat adalah:

* ✔️ __Mengirim HTTP Request__ (GET, POST, PUT, DELETE)
* ✔️ __Validasi Response__ dengan format JSON yang diberikan

### 🚀 Run Spring Boot App

```
mvn spring-boot:run
```

Setelah Spring Boot sukses berjalan, maka secara otomatis akan dibuatkan table `product` sesuai entity model yang telah dibuat.

### 🛢️ H2 Database Console

Setelah Spring Boot berjalan, kita dapat mengakses H2 Console dengan path `/h2` (sesuaikan dengan konfigurasi di file properties) melalui browser sesuai url dan port Spring Boot yang aktif, yang secara default adalah `hhttp://localhost:8080/h2`, maka kita kita akan di arahkan halaman console H2, masukan sesuai konfigurasi di file properties:

* Masukan user `sa` dan password kosong  (sesuaikan dengan konfigurasi di file properties).

![H2 Console](/img/general/h2.png)

* Jika sukses akan masuk ke dalam H2 Console.

![H2 Console](/img/general/h2-console.png)

### 1️⃣ Test Request GET All Product

#### 📝 API Detail:

* **HTTP Method:** `GET`
* **Endpoint:** `http://localhost:8080/api/products`
* **Target:** Mendapatkan semua data product. 

### 2️⃣ Test Request GET Product by `id`

#### 📝 API Detail:

* **HTTP Method:** `GET`
* **Endpoint:** `http://localhost:8080/api/products/{id}`
* **Target:** Mendapatkan data product berdasarkan `id`. 

### cURL command

```
curl -v http://localhost:8080/api/products
```

atau jika hanya langsung menggunakan http method `GET`:

```
curl -X GET http://localhost:8080/api/products
```

### ✅ Response yang diharapkan

* ☑️ Jika Data dalam Tabel Kosong
```
[]
```

* ☑️ Jika Ada Data dalam Tabel (contoh dengan sample data)

```json
[
    {
        "id":1,
        "name":"iphone 16",
        "description":"The New Generation Iphone Generation",
        "price":200000.0
    },
    {
        "id":2,
        "name":"Asus ROG",
        "description":"Gamin Laptop Powerfull",
        "price":500000.0
    }
]
```

:::info
📌 Data payload yang digunakan adalah JSON.
:::

* ☑️ Jika Ada Data berdasarkan Id:

Perintah cURL:

```
curl -X GET http://localhost:8080/api/products/2
```

* ☑️ Response yang diinginkan:

```json
{
    "id":2,
    "name":"Asus ROG",
    "description":"Gamin Laptop Powerfull",
    "price":500000.0
}
```

### 3️⃣ Test Request POST Create

#### 📝 API Detail:

* **HTTP Method:** `POST`
* **Endpoint:** `http://localhost:8080/api/products/add`
* **Content-Type:** `application/json`
* **Request Body:**

```json
{
    "name":"Macbook Pro",
    "description":"Macbook Laptop for Professional",
    "price":400000
}
```

### ✅ cURL command

```
curl -d '{"name":"Macbook Pro","description":"Macbook Laptop for Professional","price":400000}' -H 'Content-Type: application/json' http://localhost:8080/api/products/add
```

* ☑️ Response yang diinginkan

```json
{
    "id":3,
    "name":"Macbook Pro",
    "description":"Macbook Laptop for Professional",
    "price":400000.0
}
```

💭 Response API akan mengembalikan product yang telah dibuat dengan `id` yang digenerate secara automatis.

### 4️⃣ Test Request PUT

* **HTTP Method:** `PUT`
* **Endpoint:** `http://localhost:8080/api/products/{id}`
* **Content-Type:** `application/json`
* **Request Body:**

```json
{
    "name":"Thinkpad X1",
    "description":"Laptop for Professional",
    "price":350000
}
```

### ✅ cURL command

```
curl -d '{"name":"Thinkpad X1","description":"Laptop for Professional","price":350000}' -H 'Content-Type: application/json' -X PUT http://localhost:8080/api/products/3
```

* ☑️ Response yang diinginkan

```json
{
    "id":3,
    "name":"Thinkpad X1",
    "description":"Laptop for Professional",
    "price":350000.0
}
```

### 5️⃣ Test Request DELETE

* **HTTP Method:** `POST`
* **Endpoint:** `http://localhost:8080/api/products/delete/{id}`

### ✅ cURL command

```
curl -X DELETE http://localhost:8080/api/products/delete/3
```

### 👀 Check Database di H2 Console

Kita bisa melihat data tabel dalam database H2 melalui console web H2:

![H2 Console](/img/general/h2-console2.png)

## 🎯 Kesimpulan

Kita sudah dapat membuat:

* ✅ REST API sederhana.
* ✅ Implementasi CRUD.
* ✅ Melakukan testing API dari client.

Project ini masih sangat sederhana, kita dapat improve lagi misalnya dengan menambahkan layer service agar businness logic tidak menumpuk di controller.