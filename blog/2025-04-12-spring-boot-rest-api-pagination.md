---
slug: spring-boot-rest-api-pagination
title: Cara membuat Pagination di Spring Boot
authors: topekox
tags: [springboot, rest, spring]
---

Pada project-project Springboot sebelumnya, ketika melakukan Respose REST API find all untuk menampilkan semua data, biasanya kita menggunakan return Collection misalnya `List`. Cara ini tidak salah tapi bukan merupakan best practice apabila data yang dipanggil dalam jumlah yang banyak, misal datanya ada 1 juta, maka data tersebut akan dipanggil semua. Tentunya cara ini tidak efisien dan akan membuat aplikasi kita menjadi lambat.

<!--truncate-->

Untuk mengatasi Overload Data tersebut maka kita dapat menggunakan pagination. Dengan menggunakan pagination akan memungkinkan untuk menampilkan data secara bertahap, sehingga mengurangi beban memori dan meningkatkan kinerja aplikasi.

## Collection vs Pagination

* Collection

```json
[
  {
    "id": 1,
    "name": "Iphone 16",
    "description": "The new generation Iphone",
    "price": 20000000
  },
  {
    "id": 2,
    "name": "Asus ROG",
    "description": "The best laptop for gaming",
    "price": 30000000
  }
]
```

* Pagination

```json
{
  "content": [
    {
      "id": 1,
      "name": "Iphone 16",
      "description": "The new Iphone Generation",
      "price": 15000000
    },
    {
    "id": 2,
    "name": "Asus ROG",
    "description": "The best laptop for gaming",
    "price": 30000000
  }
  ],
  "page": {
    "size": 20,
    "number": 0,
    "totalElements": 2,
    "totalPages": 1
  }
}
```

Dengan menggunakan Collection data akan ditampilkan sesuai result dari operasi select all, sedangkan menggunakan pagination akan lebih terfilter karna data yang ditampilkan dapat dicustom jumlahnya.

## Menambahkan Pagination di Aplikasi Spring Boot

Untuk menambahkan pagination pada aplikasi Spring Boot application, kita cukup melakukan masuk ke dalam layer Controller dengan menambahkan parameter dengan type `Pageable`.

```java
@RestController
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getAll(
            @SortDefault(sort = "id") @PageableDefault(size = 20) final Pageable pageable) {
        return ResponseEntity.ok(productService.findAll(pageable));
    }

    // ...
}
```

Pada contoh di atas kita set default data yang ditampilkan adalah 20 dan sorting data berdasarkan `id` secara ascending. Parameter query dari `page`, `size` dan `sort` akan secara otomatis dibuat oleh Spring Boot.

Untuk layer Service akan memanggil data Page yang berasal dari Repository yang di mapping ke DTO.

```java
@Service
public class ProductService {

    // ...

    public Page<ProductDTO> findAll(final Pageable pageable) {
        final Page<Product> page = productRepository.findAll(pageable);
        return new PageImpl<>(page.getContent()
                .stream()
                .map(productMapper::toDTO)
                .collect(Collectors.toList()),
                pageable, page.getTotalElements());
    }
}
```

Sedangkan untuk layer Repository dengan meng-extends `JpaRepository`, kita dapat memanggil object data dari database menggunakan `findAll()`.

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
}
```

## Konfigurasi menggunakan PagedModel

Namun ketika aplikasi dijalankan tanpa konfigurasi tambahan maka akan menghasilkan log warning seperti ini:

```
Serializing PageImpl instances as-is is not supported, meaning that there is no guarantee about the stability of the resulting JSON structure!
For a stable JSON structure, please use Spring Data's PagedModel or Spring HATEOAS and Spring Data's PagedResourcesAssembler.
```

Hal ini terjadi class `PageImpl` tidak diserialkan untuk dikembalikan menjadi REST API.

Untuk menghapus peringatan tersebut, kita hanya perlu menambahkan anotasi berikut ke salah satu class konfigurasi yang ada atau membuat class konfigurasi baru:

```java
@Configuration
@EnableSpringDataWebSupport(
        pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO
)
public class JacsonConfig {
}
```

Konfigurasi di atas digunakan untuk secara otomatis mentransform `PageImpl` menjadi `PagedModel`.

## 🌐 Baca Juga

* https://bootify.io/spring-boot/pagination-in-spring-boot-rest-api.html