"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[4940],{95859:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>o,contentTitle:()=>d,default:()=>p,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var r=a(51022),i=a(74848),t=a(28453);const s={slug:"springboot-rest-api-minimal-h2",title:"Membuat REST API CRUD Spring Boot sederhana menggunakan Database H2",authors:"topekox",tags:["springboot","spring","rest","api","h2"]},d=void 0,o={authorsImageUrls:[void 0]},l=[{value:"\ud83d\udccc Apa itu H2 Database",id:"-apa-itu-h2-database",level:2},{value:"\ud83d\udd01 Alur Arsitektur Aplikasi",id:"-alur-arsitektur-aplikasi",level:2},{value:"\ud83d\udccc Client (Pengguna API)",id:"-client-pengguna-api",level:3},{value:"\u2705 Dependency",id:"-dependency",level:2},{value:"\u2705 Konfigurasi Properties",id:"-konfigurasi-properties",level:2},{value:"\u2705 Membuat Entity",id:"-membuat-entity",level:2},{value:"\u2705 Membuat Repository",id:"-membuat-repository",level:2},{value:"\u2705 Membuat Controller",id:"-membuat-controller",level:2},{value:"\ud83e\uddea Uji Coba API CRUD",id:"-uji-coba-api-crud",level:2},{value:"\ud83d\ude80 Run Spring Boot App",id:"-run-spring-boot-app",level:3},{value:"\ud83d\udee2\ufe0f H2 Database Console",id:"\ufe0f-h2-database-console",level:3},{value:"1\ufe0f\u20e3 Test Request GET All Product",id:"1\ufe0f\u20e3-test-request-get-all-product",level:3},{value:"\ud83d\udcdd API Detail:",id:"-api-detail",level:4},{value:"2\ufe0f\u20e3 Test Request GET Product by <code>id</code>",id:"2\ufe0f\u20e3-test-request-get-product-by-id",level:3},{value:"\ud83d\udcdd API Detail:",id:"-api-detail-1",level:4},{value:"cURL command",id:"curl-command",level:3},{value:"\u2705 Response yang diharapkan",id:"-response-yang-diharapkan",level:3},{value:"3\ufe0f\u20e3 Test Request POST Create",id:"3\ufe0f\u20e3-test-request-post-create",level:3},{value:"\ud83d\udcdd API Detail:",id:"-api-detail-2",level:4},{value:"\u2705 cURL command",id:"-curl-command",level:3},{value:"4\ufe0f\u20e3 Test Request PUT",id:"4\ufe0f\u20e3-test-request-put",level:3},{value:"\u2705 cURL command",id:"-curl-command-1",level:3},{value:"5\ufe0f\u20e3 Test Request DELETE",id:"5\ufe0f\u20e3-test-request-delete",level:3},{value:"\u2705 cURL command",id:"-curl-command-2",level:3},{value:"\ud83d\udc40 Check Database di H2 Console",id:"-check-database-di-h2-console",level:3},{value:"\ud83c\udfaf Kesimpulan",id:"-kesimpulan",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["\ud83d\udc4b Hi Guys.. pada tutorial kali ini kita akan membangun aplikasi Spring Boot sederhana, dengan fitur REST API sederhana dengan menggunakan database H2. Project yang akan dibuat sederhana saja, tidak menggunakan banyak layer cukup layer ",(0,i.jsx)(n.code,{children:"Controller -> Repository -> Database"}),". Jadi tutorial kali ini sebenarnya bukan best practice, tapi hanya untuk pembuatan project REST API sederhana \ud83d\udcaa."]}),"\n",(0,i.jsx)(n.h2,{id:"-apa-itu-h2-database",children:"\ud83d\udccc Apa itu H2 Database"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"https://h2database.com/",children:"H2 Database"})," adalah database ringan (lightweight), yang berjalan di atas memory RAM (in-memory database), dan sudah kompatibel dengan Spring Boot. Jadi kita tidak perlu melakukan instalasi database H2 decara manual, karena sudah embedded dengan Spring Boot, cukup memasukan dependency-nya ke dalam project Spring Boot \ud83d\ude80. Jadi sangat cocok untuk testing aplikasi sebelum menggunakan database yang lebih proper seperti MySQL, Postgres, Oracle, MsSQL atau sebagainya."]}),"\n",(0,i.jsx)(n.h2,{id:"-alur-arsitektur-aplikasi",children:"\ud83d\udd01 Alur Arsitektur Aplikasi"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"rest simple",src:a(13645).A+"",width:"750",height:"202"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsx)(n.p,{children:"Arsitektur yang digunakan bukan merupakan best practice tetapi hanya untuk education purpose/proses pembelajaran dan tidak direkomendasikan untuk digunakan di production."})}),"\n",(0,i.jsx)(n.h3,{id:"-client-pengguna-api",children:"\ud83d\udccc Client (Pengguna API)"}),"\n",(0,i.jsx)(n.p,{children:"Client adalah layer yang akan berinteraksi dengan API di antaranya seperti browser, mobile, Postman, frontend app dan sebagainya. Client akan:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u2714\ufe0f Akan mengirim HTTP Request (GET, POST, PUT, DELETE)"}),"\n",(0,i.jsx)(n.li,{children:"\u2714\ufe0f Akan menerima API Response (Json format)"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Contoh client:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u2611\ufe0f API Testing tools (Postman, Curl)"}),"\n",(0,i.jsx)(n.li,{children:"\u2611\ufe0f Frontend App (React, Angular, Vue.js)"}),"\n",(0,i.jsx)(n.li,{children:"\u2611\ufe0f Mobile App (Iphone, Android)"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"-dependency",children:"\u2705 Dependency"}),"\n",(0,i.jsxs)(n.p,{children:["Tambahkan dependency yang dibutuhkan pada ",(0,i.jsx)(n.code,{children:"pom.xml"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-xml",children:"\x3c!-- Spring Boot Data JPA --\x3e\r\n<dependency>\r\n    <groupId>org.springframework.boot</groupId>\r\n    <artifactId>spring-boot-starter-data-jpa</artifactId>\r\n</dependency>\r\n\r\n\x3c!-- Spring Boot Web --\x3e\r\n<dependency>\r\n    <groupId>org.springframework.boot</groupId>\r\n    <artifactId>spring-boot-starter-web</artifactId>\r\n</dependency>\r\n\r\n\x3c!-- Spring Boot H2 Database--\x3e\r\n<dependency>\r\n    <groupId>com.h2database</groupId>\r\n    <artifactId>h2</artifactId>\r\n    <scope>runtime</scope>\r\n</dependency>\n"})}),"\n",(0,i.jsx)(n.h2,{id:"-konfigurasi-properties",children:"\u2705 Konfigurasi Properties"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"spring.datasource.url=jdbc:h2:mem:belajar\r\nspring.datasource.driverClassName=org.h2.Driver\r\nspring.datasource.username=sa\r\nspring.datasource.password=\r\nspring.jpa.database-platform=org.hibernate.dialect.H2Dialect\r\nspring.jpa.show-sql=true\r\nspring.jpa.hibernate.ddl-auto=update\r\n\r\nspring.h2.console.enabled=true\r\nspring.h2.console.path=/h2\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Konfigurasi di atas adalah konfigurasi minimal untuk terhubung ke database H2. Beberapa variable yang dimasukan adalah nama database adalah ",(0,i.jsx)(n.code,{children:"belajar"})," dengan url",(0,i.jsx)(n.code,{children:"jdbc:h2:mem:belajar"})," , ",(0,i.jsx)(n.code,{children:"username"})," adalah ",(0,i.jsx)(n.code,{children:"sa"})," dan tanpa password. Konfigurasi adalah kita mengaktifkan console database H2 ketika dijalankan dengan nilai ",(0,i.jsx)(n.code,{children:"true"}),", serta url path akses consolenya adalah ",(0,i.jsx)(n.code,{children:"/h2"}),". Konfigurasi sisanya adalah konfigurasi JPA dan Hibernate."]}),"\n",(0,i.jsx)(n.h2,{id:"-membuat-entity",children:"\u2705 Membuat Entity"}),"\n",(0,i.jsx)(n.p,{children:"Membuat Entity sebagai table mapping ke database, dalam contoh kali ini kita akan membuat entity Product yang akan di mapping menjadi tabel ke dalama database:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:'import jakarta.persistence.*;\r\n\r\n@Entity\r\n@Table(name = "product")\r\npublic class Product {\r\n\r\n    @Id\r\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\r\n    private Integer id;\r\n\r\n    private String name;\r\n\r\n    private String description;\r\n\r\n    private Double price;\r\n\r\n    public Product() {\r\n    }\r\n\r\n    public Product(Integer id, String name, String description, Double price) {\r\n        this.id = id;\r\n        this.name = name;\r\n        this.description = description;\r\n        this.price = price;\r\n    }\r\n\r\n    public Integer getId() {\r\n        return id;\r\n    }\r\n\r\n    public void setId(Integer id) {\r\n        this.id = id;\r\n    }\r\n\r\n    public String getName() {\r\n        return name;\r\n    }\r\n\r\n    public void setName(String name) {\r\n        this.name = name;\r\n    }\r\n\r\n    public String getDescription() {\r\n        return description;\r\n    }\r\n\r\n    public void setDescription(String description) {\r\n        this.description = description;\r\n    }\r\n\r\n    public Double getPrice() {\r\n        return price;\r\n    }\r\n\r\n    public void setPrice(Double price) {\r\n        this.price = price;\r\n    }\r\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"-membuat-repository",children:"\u2705 Membuat Repository"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:"import com.timposulabs.belajar_springboot_h2.model.Product;\r\nimport org.springframework.data.jpa.repository.JpaRepository;\r\n\r\npublic interface ProductRepository extends JpaRepository<Product, Integer> {\r\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\ud83d\ude80 Menggunakan ",(0,i.jsx)(n.code,{children:"JpaRepository"})," untuk standar CRUD, dibanding menbuatnya secara manual \ud83d\ude35\u200d\ud83d\udcab."]}),"\n",(0,i.jsx)(n.h2,{id:"-membuat-controller",children:"\u2705 Membuat Controller"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:'import com.timposulabs.belajar_springboot_h2.model.Product;\r\nimport com.timposulabs.belajar_springboot_h2.repository.ProductRepository;\r\nimport org.springframework.beans.factory.annotation.Autowired;\r\nimport org.springframework.http.HttpStatus;\r\nimport org.springframework.http.ResponseEntity;\r\nimport org.springframework.web.bind.annotation.*;\r\n\r\nimport java.util.List;\r\nimport java.util.Optional;\r\n\r\n@RestController\r\n@RequestMapping("/api/products")\r\npublic class ProductController {\r\n\r\n    @Autowired\r\n    private final ProductRepository repository;\r\n\r\n    public ProductController(ProductRepository repository) {\r\n        this.repository = repository;\r\n    }\r\n\r\n    // \u2705 GET: Get All Product (200 OK / 204 No Content)\r\n    @GetMapping\r\n    ResponseEntity<List<Product>> getAll() {\r\n        List<Product> list = repository.findAll();\r\n\r\n        if (list.isEmpty()) {\r\n            return new ResponseEntity<>(HttpStatus.NO_CONTENT);\r\n        }\r\n        return new ResponseEntity<>(list, HttpStatus.OK);\r\n    }\r\n\r\n    // \u2705 GET: Get by Id Product (200 OK / 404 Not Found)\r\n    @GetMapping("/{id}")\r\n    ResponseEntity<Product> getById(@PathVariable Integer id) {\r\n        Optional<Product> product = repository.findById(id);\r\n        return product.map(value -> new ResponseEntity<>(value, HttpStatus.OK))\r\n                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));\r\n    }\r\n\r\n    // \u2705 POST: Create Book\r\n    @PostMapping("/add")\r\n    ResponseEntity<Product> add(@RequestBody Product product) {\r\n        Product p = repository.save(product);\r\n        return new ResponseEntity<>(p, HttpStatus.OK);\r\n    }\r\n\r\n    // \u2705 PUT: Update Book (200 OK / 404 Not Found)\r\n    @PutMapping("/{id}")\r\n    ResponseEntity<Product> update(@PathVariable Integer id, @RequestBody Product product) {\r\n        Optional<Product> p = repository.findById(id);\r\n\r\n        if (p.isPresent()) {\r\n            Product updateProduct = p.get();\r\n            updateProduct.setName(product.getName());\r\n            updateProduct.setDescription(product.getDescription());\r\n            updateProduct.setPrice(product.getPrice());\r\n\r\n            return new ResponseEntity<>(repository.save(updateProduct), HttpStatus.OK);\r\n        }\r\n        return new ResponseEntity<>(HttpStatus.NOT_FOUND);\r\n    }\r\n\r\n    // \u2705 DELETE: Delete Book (200 OK)\r\n    @DeleteMapping("/delete/{id}")\r\n    ResponseEntity<Product> delete(@PathVariable Integer id) {\r\n        repository.deleteById(id);\r\n        return new ResponseEntity<>(HttpStatus.OK);\r\n    }\r\n\r\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Membuat ",(0,i.jsx)(n.code,{children:"Controller"})," yang akan mengatur request yang masuk dan memberikan response kepada User dimana dalam kasus ini, menjadikan ",(0,i.jsx)(n.code,{children:"Controller"})," juga sebagai business logic dari aplikasi ini."]}),"\n",(0,i.jsx)(n.h2,{id:"-uji-coba-api-crud",children:"\ud83e\uddea Uji Coba API CRUD"}),"\n",(0,i.jsxs)(n.p,{children:["Sekarang waktunya untuk testing REST API yang telah dibuat, menggunakan testing tools dengan menggunakan Postman atau cURL. Pada contoh testing kali ini saya menggunakan ",(0,i.jsx)(n.a,{href:"https://curl.se/docs/manpage.html",children:"cURL"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Testing yang akan kita coba berdasarkan ",(0,i.jsx)(n.code,{children:"Controller"})," yang telah dibuat adalah:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u2714\ufe0f ",(0,i.jsx)(n.strong,{children:"Mengirim HTTP Request"})," (GET, POST, PUT, DELETE)"]}),"\n",(0,i.jsxs)(n.li,{children:["\u2714\ufe0f ",(0,i.jsx)(n.strong,{children:"Validasi Response"})," dengan format JSON yang diberikan"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"-run-spring-boot-app",children:"\ud83d\ude80 Run Spring Boot App"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"mvn spring-boot:run\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Setelah Spring Boot sukses berjalan, maka secara otomatis akan dibuatkan table ",(0,i.jsx)(n.code,{children:"product"})," sesuai entity model yang telah dibuat."]}),"\n",(0,i.jsx)(n.h3,{id:"\ufe0f-h2-database-console",children:"\ud83d\udee2\ufe0f H2 Database Console"}),"\n",(0,i.jsxs)(n.p,{children:["Setelah Spring Boot berjalan, kita dapat mengakses H2 Console dengan path ",(0,i.jsx)(n.code,{children:"/h2"})," (sesuaikan dengan konfigurasi di file properties) melalui browser sesuai url dan port Spring Boot yang aktif, yang secara default adalah ",(0,i.jsx)(n.code,{children:"hhttp://localhost:8080/h2"}),", maka kita kita akan di arahkan halaman console H2, masukan sesuai konfigurasi di file properties:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Masukan user ",(0,i.jsx)(n.code,{children:"sa"})," dan password kosong  (sesuaikan dengan konfigurasi di file properties)."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"H2 Console",src:a(49525).A+"",width:"778",height:"588"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Jika sukses akan masuk ke dalam H2 Console."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"H2 Console",src:a(20437).A+"",width:"652",height:"444"})}),"\n",(0,i.jsx)(n.h3,{id:"1\ufe0f\u20e3-test-request-get-all-product",children:"1\ufe0f\u20e3 Test Request GET All Product"}),"\n",(0,i.jsx)(n.h4,{id:"-api-detail",children:"\ud83d\udcdd API Detail:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"HTTP Method:"})," ",(0,i.jsx)(n.code,{children:"GET"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Endpoint:"})," ",(0,i.jsx)(n.code,{children:"http://localhost:8080/api/products"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Target:"})," Mendapatkan semua data product."]}),"\n"]}),"\n",(0,i.jsxs)(n.h3,{id:"2\ufe0f\u20e3-test-request-get-product-by-id",children:["2\ufe0f\u20e3 Test Request GET Product by ",(0,i.jsx)(n.code,{children:"id"})]}),"\n",(0,i.jsx)(n.h4,{id:"-api-detail-1",children:"\ud83d\udcdd API Detail:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"HTTP Method:"})," ",(0,i.jsx)(n.code,{children:"GET"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Endpoint:"})," ",(0,i.jsx)(n.code,{children:"http://localhost:8080/api/products/{id}"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Target:"})," Mendapatkan data product berdasarkan ",(0,i.jsx)(n.code,{children:"id"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"curl-command",children:"cURL command"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"curl -v http://localhost:8080/api/products\n"})}),"\n",(0,i.jsxs)(n.p,{children:["atau jika hanya langsung menggunakan http method ",(0,i.jsx)(n.code,{children:"GET"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"curl -X GET http://localhost:8080/api/products\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-response-yang-diharapkan",children:"\u2705 Response yang diharapkan"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u2611\ufe0f Jika Data dalam Tabel Kosong"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"[]\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u2611\ufe0f Jika Ada Data dalam Tabel (contoh dengan sample data)"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'[\r\n    {\r\n        "id":1,\r\n        "name":"iphone 16",\r\n        "description":"The New Generation Iphone Generation",\r\n        "price":200000.0\r\n    },\r\n    {\r\n        "id":2,\r\n        "name":"Asus ROG",\r\n        "description":"Gamin Laptop Powerfull",\r\n        "price":500000.0\r\n    }\r\n]\n'})}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsx)(n.p,{children:"\ud83d\udccc Data payload yang digunakan adalah JSON."})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u2611\ufe0f Jika Ada Data berdasarkan Id:"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Perintah cURL:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"curl -X GET http://localhost:8080/api/products/2\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u2611\ufe0f Response yang diinginkan:"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\r\n    "id":2,\r\n    "name":"Asus ROG",\r\n    "description":"Gamin Laptop Powerfull",\r\n    "price":500000.0\r\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"3\ufe0f\u20e3-test-request-post-create",children:"3\ufe0f\u20e3 Test Request POST Create"}),"\n",(0,i.jsx)(n.h4,{id:"-api-detail-2",children:"\ud83d\udcdd API Detail:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"HTTP Method:"})," ",(0,i.jsx)(n.code,{children:"POST"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Endpoint:"})," ",(0,i.jsx)(n.code,{children:"http://localhost:8080/api/products/add"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Content-Type:"})," ",(0,i.jsx)(n.code,{children:"application/json"})]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"Request Body:"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\r\n    "name":"Macbook Pro",\r\n    "description":"Macbook Laptop for Professional",\r\n    "price":400000\r\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"-curl-command",children:"\u2705 cURL command"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'curl -d \'{"name":"Macbook Pro","description":"Macbook Laptop for Professional","price":400000}\' -H \'Content-Type: application/json\' http://localhost:8080/api/products/add\n'})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u2611\ufe0f Response yang diinginkan"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\r\n    "id":3,\r\n    "name":"Macbook Pro",\r\n    "description":"Macbook Laptop for Professional",\r\n    "price":400000.0\r\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["\ud83d\udcad Response API akan mengembalikan product yang telah dibuat dengan ",(0,i.jsx)(n.code,{children:"id"})," yang digenerate secara automatis."]}),"\n",(0,i.jsx)(n.h3,{id:"4\ufe0f\u20e3-test-request-put",children:"4\ufe0f\u20e3 Test Request PUT"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"HTTP Method:"})," ",(0,i.jsx)(n.code,{children:"PUT"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Endpoint:"})," ",(0,i.jsx)(n.code,{children:"http://localhost:8080/api/products/{id}"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Content-Type:"})," ",(0,i.jsx)(n.code,{children:"application/json"})]}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"Request Body:"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\r\n    "name":"Thinkpad X1",\r\n    "description":"Laptop for Professional",\r\n    "price":350000\r\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"-curl-command-1",children:"\u2705 cURL command"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'curl -d \'{"name":"Thinkpad X1","description":"Laptop for Professional","price":350000}\' -H \'Content-Type: application/json\' -X PUT http://localhost:8080/api/products/3\n'})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u2611\ufe0f Response yang diinginkan"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\r\n    "id":3,\r\n    "name":"Thinkpad X1",\r\n    "description":"Laptop for Professional",\r\n    "price":350000.0\r\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"5\ufe0f\u20e3-test-request-delete",children:"5\ufe0f\u20e3 Test Request DELETE"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"HTTP Method:"})," ",(0,i.jsx)(n.code,{children:"POST"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Endpoint:"})," ",(0,i.jsx)(n.code,{children:"http://localhost:8080/api/products/delete/{id}"})]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"-curl-command-2",children:"\u2705 cURL command"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"curl -X DELETE http://localhost:8080/api/products/delete/3\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-check-database-di-h2-console",children:"\ud83d\udc40 Check Database di H2 Console"}),"\n",(0,i.jsx)(n.p,{children:"Kita bisa melihat data tabel dalam database H2 melalui console web H2:"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"H2 Console",src:a(56227).A+"",width:"462",height:"316"})}),"\n",(0,i.jsx)(n.h2,{id:"-kesimpulan",children:"\ud83c\udfaf Kesimpulan"}),"\n",(0,i.jsx)(n.p,{children:"Kita sudah dapat membuat:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u2705 REST API sederhana."}),"\n",(0,i.jsx)(n.li,{children:"\u2705 Implementasi CRUD."}),"\n",(0,i.jsx)(n.li,{children:"\u2705 Melakukan testing API dari client."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Project ini masih sangat sederhana, kita dapat improve lagi misalnya dengan menambahkan layer service agar businness logic tidak menumpuk di controller."})]})}function p(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},20437:(e,n,a)=>{a.d(n,{A:()=>r});const r=a.p+"assets/images/h2-console-3cd3a347592a3c790946c6a2bd2acb13.png"},56227:(e,n,a)=>{a.d(n,{A:()=>r});const r=a.p+"assets/images/h2-console2-2b8d2cb08bd04ddc5cfafc42eab8a86f.png"},49525:(e,n,a)=>{a.d(n,{A:()=>r});const r=a.p+"assets/images/h2-60d73b69070705b6dc329a70547e8304.png"},13645:(e,n,a)=>{a.d(n,{A:()=>r});const r=a.p+"assets/images/spring-boot-rest-simple-0a8cd75c65f8ea24f60b92f573e61549.jpg"},28453:(e,n,a)=>{a.d(n,{R:()=>s,x:()=>d});var r=a(96540);const i={},t=r.createContext(i);function s(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),r.createElement(t.Provider,{value:n},e.children)}},51022:e=>{e.exports=JSON.parse('{"permalink":"/blog/springboot-rest-api-minimal-h2","source":"@site/blog/2025-03-07-springboot-rest-minimal-h2.md","title":"Membuat REST API CRUD Spring Boot sederhana menggunakan Database H2","description":"\ud83d\udc4b Hi Guys.. pada tutorial kali ini kita akan membangun aplikasi Spring Boot sederhana, dengan fitur REST API sederhana dengan menggunakan database H2. Project yang akan dibuat sederhana saja, tidak menggunakan banyak layer cukup layer Controller -> Repository -> Database. Jadi tutorial kali ini sebenarnya bukan best practice, tapi hanya untuk pembuatan project REST API sederhana \ud83d\udcaa.","date":"2025-03-07T00:00:00.000Z","tags":[{"inline":true,"label":"springboot","permalink":"/blog/tags/springboot"},{"inline":true,"label":"spring","permalink":"/blog/tags/spring"},{"inline":true,"label":"rest","permalink":"/blog/tags/rest"},{"inline":true,"label":"api","permalink":"/blog/tags/api"},{"inline":true,"label":"h2","permalink":"/blog/tags/h-2"}],"readingTime":6.43,"hasTruncateMarker":true,"authors":[{"name":"Ucup TopekoX","title":"TimposuLabs creator","imageURL":"https://topekox.github.io/assets/images/avatar.jpeg","key":"topekox","page":null}],"frontMatter":{"slug":"springboot-rest-api-minimal-h2","title":"Membuat REST API CRUD Spring Boot sederhana menggunakan Database H2","authors":"topekox","tags":["springboot","spring","rest","api","h2"]},"unlisted":false,"prevItem":{"title":"Arsitektur Spring Boot - Controller, Service, Repository dan Database","permalink":"/blog/spring-boot-arsitektur-controller-service-repository-database-flow"},"nextItem":{"title":"Perintah Dasar Git Tag","permalink":"/blog/perintah-dasar-git-tag"}}')}}]);