"use strict";(self.webpackChunktimposu=self.webpackChunktimposu||[]).push([[5556],{21329:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>p,frontMatter:()=>t,metadata:()=>r,toc:()=>d});var r=a(54457),i=a(74848),s=a(28453);const t={slug:"spring-boot-arsitektur-controller-service-repository-database-flow",title:"Arsitektur Spring Boot - Controller, Service, Repository dan Database",authors:"topekox",tags:["springboot","spring","rest","api"]},l=void 0,o={authorsImageUrls:[void 0]},d=[{value:"\ud83d\udccc Arsitektur Spring Boot",id:"-arsitektur-spring-boot",level:2},{value:"\ud83d\udd01 Spring Boot Layered Architecture",id:"-spring-boot-layered-architecture",level:2},{value:"1\ufe0f\u20e3 Client Layer (Pengguna API)",id:"1\ufe0f\u20e3-client-layer-pengguna-api",level:3},{value:"2\ufe0f\u20e3 Controller Layer (Menangani HTTP Requests &amp; Responses)",id:"2\ufe0f\u20e3-controller-layer-menangani-http-requests--responses",level:3},{value:"\ud83d\udccc Tugas Controller Layer",id:"-tugas-controller-layer",level:4},{value:"\ud83d\udccc Contoh Controller",id:"-contoh-controller",level:4},{value:"3\ufe0f\u20e3 Service Layer (Business Logic Processing)",id:"3\ufe0f\u20e3-service-layer-business-logic-processing",level:3},{value:"\ud83d\udccc Tugas Service Layer",id:"-tugas-service-layer",level:4},{value:"\ud83d\udccc Contoh Service",id:"-contoh-service",level:4},{value:"4\ufe0f\u20e3 Repository Layer (Database Access Layer)",id:"4\ufe0f\u20e3-repository-layer-database-access-layer",level:3},{value:"\ud83d\udccc Contoh Repository",id:"-contoh-repository",level:4},{value:"5\ufe0f\u20e3 Model Layer (Entity &amp; DTO Representation)",id:"5\ufe0f\u20e3-model-layer-entity--dto-representation",level:3},{value:"\ud83d\udccc Contoh Entity",id:"-contoh-entity",level:4},{value:"\ud83d\udccc Contoh DTO menggunakan Java Record",id:"-contoh-dto-menggunakan-java-record",level:4},{value:"6\ufe0f\u20e3 Database Layer",id:"6\ufe0f\u20e3-database-layer",level:3},{value:"\ud83d\udccc Contoh Konfigurasi Database pada <code>application.properties</code>",id:"-contoh-konfigurasi-database-pada-applicationproperties",level:4},{value:"\u2705 Bagaimana Alur Data Mengalir?",id:"-bagaimana-alur-data-mengalir",level:2},{value:"\ud83c\udfaf Kesimpulan",id:"-kesimpulan",level:2},{value:"\ud83c\udf10 Referensi",id:"-referensi",level:2}];function c(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"Spring Boot \ud83c\udf43 adalah salah satu framework paling populer untuk membangun API RESTful dan Microservices di Java. Spring Boot menyederhanakan pengembangan aplikasi Java dengan menyediakan environtment yang telah dikonfigurasi sebelumnya, menyederhanakan penulisan kode, dan memastikan scalability dan maintainability."}),"\n",(0,i.jsx)(n.h2,{id:"-arsitektur-spring-boot",children:"\ud83d\udccc Arsitektur Spring Boot"}),"\n",(0,i.jsxs)(n.p,{children:["Pada tutorial ini kita akan meng-eksplore ",(0,i.jsx)(n.strong,{children:"Spring Boot Layered Architecture"}),", dan bagaimana data mengalir di antara masing-masing komponen layer tersebut. Sebelumnya, kenapa kita harus menggunakan arsitektur tersebut:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u2611\ufe0f ",(0,i.jsx)(n.strong,{children:"Struktur kode program lebih terorganisasi"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["\u2611\ufe0f ",(0,i.jsx)(n.strong,{children:"Scalability"}),": Membuat aplikasi lebih mudah dikembangkan/diperluas."]}),"\n",(0,i.jsxs)(n.li,{children:["\u2611\ufe0f ",(0,i.jsx)(n.strong,{children:"Maintainability"}),": Masing-masing layer memiliki tugasnya masing-masing."]}),"\n",(0,i.jsxs)(n.li,{children:["\u2611\ufe0f ",(0,i.jsx)(n.strong,{children:"Faster Development"}),": Menyederhanakan interaksi API dan database."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"-spring-boot-layered-architecture",children:"\ud83d\udd01 Spring Boot Layered Architecture"}),"\n",(0,i.jsx)(n.p,{children:"Arsitektur Spring Boot didasarkan pada pendekatan berlapis/layered, di mana setiap lapisan/layer bertanggung jawab atas bagian tertentu dari aplikasi."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:" Spring Boot Architecture",src:a(75380).A+"",width:"1226",height:"617"})}),"\n",(0,i.jsx)(n.h3,{id:"1\ufe0f\u20e3-client-layer-pengguna-api",children:"1\ufe0f\u20e3 Client Layer (Pengguna API)"}),"\n",(0,i.jsx)(n.p,{children:"Client Layer adalah entitas eksternal dari aplikasi Spring Boot (browser, aplikasi seluler, Postman, aplikasi frontend) yang berinteraksi dengan API."}),"\n",(0,i.jsx)(n.p,{children:"Client akan:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u2714\ufe0f Mengirim HTTP Requests (GET, POST, PUT, DELETE)"}),"\n",(0,i.jsx)(n.li,{children:"\u2714\ufe0f Menerima API Responses (JSON format)"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Contoh client:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u2714\ufe0f Frontend apps (React, Angular, Vue.js)"}),"\n",(0,i.jsx)(n.li,{children:"\u2714\ufe0f Mobile apps (Android, iOS)"}),"\n",(0,i.jsx)(n.li,{children:"\u2714\ufe0f API testing tools (Postman, cURL)"}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"2\ufe0f\u20e3-controller-layer-menangani-http-requests--responses",children:"2\ufe0f\u20e3 Controller Layer (Menangani HTTP Requests & Responses)"}),"\n",(0,i.jsx)(n.p,{children:"Controller Layer bertindak sebagai pintu masuk untuk permintaan API. Dia bertanggung jawab untuk memproses permintaan HTTP yang masuk/request dan mengembalikan response yang sesuai."}),"\n",(0,i.jsx)(n.h4,{id:"-tugas-controller-layer",children:"\ud83d\udccc Tugas Controller Layer"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u2714\ufe0f Menerima requests dari client (",(0,i.jsx)(n.code,{children:"@GetMapping"}),", ",(0,i.jsx)(n.code,{children:"@PostMapping"}),", dsb.)."]}),"\n",(0,i.jsx)(n.li,{children:"\u2714\ufe0f Melakukan validasi dari data yang diinput."}),"\n",(0,i.jsx)(n.li,{children:"\u2714\ufe0f Memanggil Service Layer untuk business logic."}),"\n",(0,i.jsx)(n.li,{children:"\u2714\ufe0f Mengembalikan response HTTP yang sesuai."}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"-contoh-controller",children:"\ud83d\udccc Contoh Controller"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:'@RestController\r\n@RequestMapping("/api/person")\r\npublic class PersonController {\r\n\r\n    private final PersonService personService;\r\n\r\n    public PersonController(PersonService personService) {\r\n        this.personService = personService;\r\n    }\r\n\r\n    // \u2705 GET: get all person (200 OK)\r\n    @GetMapping\r\n    public ResponseEntity<List<PersonDTO>> getAll() {\r\n        return ResponseEntity.ok(personService.getAll());\r\n    }\r\n}\n'})}),"\n",(0,i.jsx)(n.p,{children:"\ud83d\ude80 Controller bukan untuk bussines logic. Dia hanya mengatur permintaan ke method pada layer service yang sesuai."}),"\n",(0,i.jsx)(n.h3,{id:"3\ufe0f\u20e3-service-layer-business-logic-processing",children:"3\ufe0f\u20e3 Service Layer (Business Logic Processing)"}),"\n",(0,i.jsx)(n.p,{children:"Service Layer bertanggung jawab untuk menerapkan bussines logic dan memproses data sebelum mengirimkannya ke client."}),"\n",(0,i.jsx)(n.h4,{id:"-tugas-service-layer",children:"\ud83d\udccc Tugas Service Layer"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u2714\ufe0f Mengimplementasikan business rules dan logic."}),"\n",(0,i.jsx)(n.li,{children:"\u2714\ufe0f Menangani transactions."}),"\n",(0,i.jsx)(n.li,{children:"\u2714\ufe0f Memanggil Layer Repositori untuk interaksi ke database."}),"\n",(0,i.jsx)(n.li,{children:"\u2714\ufe0f Menggunakan DTO (Data Transfer Objek) untuk struktur data."}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"-contoh-service",children:"\ud83d\udccc Contoh Service"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:"@Service\r\npublic class PersonService {\r\n\r\n    private final PersonRepository personRepository;\r\n    private final PersonMapper personMapper;\r\n\r\n    public PersonService(PersonRepository personRepository, PersonMapper personMapper) {\r\n        this.personRepository = personRepository;\r\n        this.personMapper = personMapper;\r\n    }\r\n\r\n    public List<PersonDTO> getAll() {\r\n        return personRepository.findAll().stream()\r\n                .map(personMapper::toPersonDTO)\r\n                .toList();\r\n    }\r\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"\ud83d\ude80 Service layer memastikan bahwa Controller tidak mengandung bussines logic. Dia bertanggung jawab untuk menangani business operations pada aplikasi."}),"\n",(0,i.jsx)(n.h3,{id:"4\ufe0f\u20e3-repository-layer-database-access-layer",children:"4\ufe0f\u20e3 Repository Layer (Database Access Layer)"}),"\n",(0,i.jsx)(n.p,{children:"Repository Layer bertanggung jawab untuk berkomunikasi dengan database."}),"\n",(0,i.jsx)(n.p,{children:"Hal-hal yang perlu diperhatikan:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u2611\ufe0f Menggunakan Spring Data JPA untuk melakukan operasi CRUD."}),"\n",(0,i.jsxs)(n.li,{children:["\u2611\ufe0f Menggunakan ",(0,i.jsx)(n.code,{children:"@Repository"})," annotation untuk menandai bahwa dia adalah DAO (Data Access Object)."]}),"\n",(0,i.jsx)(n.li,{children:"\u2611\ufe0f Mengimplementasikan queri database menggunakan JPA, Hibernate, atau Native SQL."}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"-contoh-repository",children:"\ud83d\udccc Contoh Repository"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:"public interface PersonRepository extends JpaRepository<Person, Long> {\r\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\ud83d\ude80 Spring Data JPA mengurangi penggunaan kode CRUD boilerplate dengan menyediakan method yang telah dibuat oleh Spring Data JPA secara otomatis seperti ",(0,i.jsx)(n.code,{children:"findAll()"}),", ",(0,i.jsx)(n.code,{children:"save()"}),", ",(0,i.jsx)(n.code,{children:"deleteById()"})," dll."]}),"\n",(0,i.jsx)(n.h3,{id:"5\ufe0f\u20e3-model-layer-entity--dto-representation",children:"5\ufe0f\u20e3 Model Layer (Entity & DTO Representation)"}),"\n",(0,i.jsx)(n.p,{children:"Model Layer mewakili tabel yang ada dalam database dan memastikan enkapsulasi data."}),"\n",(0,i.jsx)(n.p,{children:"Hal-hal yang diperhatikan:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Entity dipetakan ke tabel database."}),"\n",(0,i.jsx)(n.li,{children:"DTO (Objek Transfer Data) hanya membantu mentransfer data yang diperlukan."}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"-contoh-entity",children:"\ud83d\udccc Contoh Entity"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:"@Entity\r\npublic class Person {\r\n\r\n    @Id\r\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\r\n    private Long id;\r\n\r\n    private String firstName;\r\n\r\n    private String lastName;\r\n\r\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"\ud83d\ude80 Entity tidak boleh diekspose secara langsung dalam response API. Sebagai gantinya, kita menggunakan DTO."}),"\n",(0,i.jsx)(n.h4,{id:"-contoh-dto-menggunakan-java-record",children:"\ud83d\udccc Contoh DTO menggunakan Java Record"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:"public record PersonDTO(Long id, String firstName, String lastName) {\r\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\ud83d\ude80 Menggunakan ",(0,i.jsx)(n.code,{children:"record"})," untuk DTO, akan membuat immutable dan kode lebih clean."]}),"\n",(0,i.jsx)(n.h3,{id:"6\ufe0f\u20e3-database-layer",children:"6\ufe0f\u20e3 Database Layer"}),"\n",(0,i.jsx)(n.p,{children:"Database Layer untuk menyimpan dan mengambil data menggunakan framework persistence Spring Boot."}),"\n",(0,i.jsx)(n.p,{children:"Hal-hal yang diperhatikan:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Menggunakan database relasional (MySQL, MariaDB, PostgreSQL, Oracle, Ms SQL, H2, dll.)."}),"\n",(0,i.jsx)(n.li,{children:"Menggunakan JPA dan Hibernate untuk mengelola entity mapping."}),"\n",(0,i.jsx)(n.li,{children:"Menjalankan query menggunakan operasi CRUD."}),"\n"]}),"\n",(0,i.jsxs)(n.h4,{id:"-contoh-konfigurasi-database-pada-applicationproperties",children:["\ud83d\udccc Contoh Konfigurasi Database pada ",(0,i.jsx)(n.code,{children:"application.properties"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"spring.datasource.url=jdbc:mariadb://localhost:3306/belajar\r\nspring.datasource.driverClassName=org.mariadb.jdbc.Driver\r\nspring.datasource.username=root\r\nspring.datasource.password=yourpassword\r\nspring.jpa.database-platform=org.hibernate.dialect.MariaDBDialect\r\nspring.jpa.show-sql=true\r\nspring.jpa.hibernate.ddl-auto=update\n"})}),"\n",(0,i.jsx)(n.p,{children:"\ud83d\ude80 Konfigurasi di atas menggunakan database MariaDB. Untuk database lain tentunya memiliki konfigurasi yang berbeda."}),"\n",(0,i.jsx)(n.h2,{id:"-bagaimana-alur-data-mengalir",children:"\u2705 Bagaimana Alur Data Mengalir?"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["1\ufe0f\u20e3 ",(0,i.jsx)(n.strong,{children:"Client"})," mengirim request HTTP ke layer ",(0,i.jsx)(n.strong,{children:"Controller"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["2\ufe0f\u20e3 Layer ",(0,i.jsx)(n.strong,{children:"Controller"})," melakukan validasi request dan meneruskan ke layer ",(0,i.jsx)(n.strong,{children:"Service"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["3\ufe0f\u20e3 Layer ",(0,i.jsx)(n.strong,{children:"Service"})," memproses bussines logic dan memanggil layer ",(0,i.jsx)(n.strong,{children:"Repository"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["4\ufe0f\u20e3 Layer ",(0,i.jsx)(n.strong,{children:"Repository"})," mengambil atau memperbaharui data yang ada di ",(0,i.jsx)(n.strong,{children:"Database"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["5\ufe0f\u20e3 Layer ",(0,i.jsx)(n.strong,{children:"Model"})," memetakan/mapping database record ke Java object."]}),"\n",(0,i.jsxs)(n.li,{children:["6\ufe0f\u20e3 Data yang sudah diproses dikirim kembali ke layer ",(0,i.jsx)(n.strong,{children:"Service"}),", lalu ke layer ",(0,i.jsx)(n.strong,{children:"Controller"}),", dan akhirnya dikembalikan ke ",(0,i.jsx)(n.strong,{children:"Client"})," sebagai response API."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"-kesimpulan",children:"\ud83c\udfaf Kesimpulan"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u2705 Memisahkan layer arsitektur berdasarkan fungsinya, sehingga penanganan permasalahan antar layer lebih baik."}),"\n",(0,i.jsx)(n.li,{children:"\u2705 Menggunakan Controller, Service, Repository, Model dan Database layer."}),"\n",(0,i.jsx)(n.li,{children:"\u2705 Memastikan kode program lebih clean, maintainability dan scalability."}),"\n",(0,i.jsx)(n.li,{children:"\u2705 Menggunakan Spring Data JPA untuk interaksi ke database."}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"-referensi",children:"\ud83c\udf10 Referensi"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://www.javaguides.net/2025/03/spring-boot-architecture.html",children:"https://www.javaguides.net/2025/03/spring-boot-architecture.html"})}),"\n"]})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},75380:(e,n,a)=>{a.d(n,{A:()=>r});const r=a.p+"assets/images/SpringBootArsitekturFlow-d8c7dbd56d4fe68acfbc02723e8ecfe2.png"},28453:(e,n,a)=>{a.d(n,{R:()=>t,x:()=>l});var r=a(96540);const i={},s=r.createContext(i);function t(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),r.createElement(s.Provider,{value:n},e.children)}},54457:e=>{e.exports=JSON.parse('{"permalink":"/blog/spring-boot-arsitektur-controller-service-repository-database-flow","source":"@site/blog/2025-03-15-spring-boot-arsitektur-controller-service-repository-database-flow.md","title":"Arsitektur Spring Boot - Controller, Service, Repository dan Database","description":"Spring Boot \ud83c\udf43 adalah salah satu framework paling populer untuk membangun API RESTful dan Microservices di Java. Spring Boot menyederhanakan pengembangan aplikasi Java dengan menyediakan environtment yang telah dikonfigurasi sebelumnya, menyederhanakan penulisan kode, dan memastikan scalability dan maintainability.","date":"2025-03-15T00:00:00.000Z","tags":[{"inline":true,"label":"springboot","permalink":"/blog/tags/springboot"},{"inline":true,"label":"spring","permalink":"/blog/tags/spring"},{"inline":true,"label":"rest","permalink":"/blog/tags/rest"},{"inline":true,"label":"api","permalink":"/blog/tags/api"}],"readingTime":4.29,"hasTruncateMarker":true,"authors":[{"name":"Ucup TopekoX","title":"TimposuLabs creator","imageURL":"https://topekox.github.io/assets/images/avatar.jpeg","key":"topekox","page":null}],"frontMatter":{"slug":"spring-boot-arsitektur-controller-service-repository-database-flow","title":"Arsitektur Spring Boot - Controller, Service, Repository dan Database","authors":"topekox","tags":["springboot","spring","rest","api"]},"unlisted":false,"prevItem":{"title":"Step-by-Step Membangun Spring Boot CRUD REST API dengan MySQL dan Java Record DTO","permalink":"/blog/spring-boot-crud-rest-mysql-java-record-dto"},"nextItem":{"title":"Membuat REST API CRUD Spring Boot sederhana menggunakan Database H2","permalink":"/blog/springboot-rest-api-minimal-h2"}}')}}]);